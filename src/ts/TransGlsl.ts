/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2026-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

// [trans glsl=]：本家サンプル glsl_slide のフラグメントシェーダ契約をそのまま受ける生WebGLパス。
//	Stage.tsx が store.trans.glslSrc を見て**このモジュールだけを lazy import** し、演出中だけ
//	動かして破棄する。コアには一切載らない（glsl= が使われた回にはじめて読まれる）。
//
//	本家（skynovel_esm LayerMng.ts:719 #trans()）は pixi の Filter として fore ページの
//	RenderTexture を uSampler に渡し、その出力を back ページのスプライトへ重ねる。ここでも同じ絵にする：
//	  1. [trans]開始時点の表ページ・裏ページを Snapshot.ts で1枚ずつ画像化（DOM→SVG→PNG）。
//	     エンドポイントは静的なのでフレームごとの再ラスタライズは不要（1回だけ）。
//	  2. 全画面クワッドで裏ページ画像をそのまま描く（下地。ブレンド無し）
//	  3. 同じクワッドを user シェーダ経由で表ページ画像から描き、アルファ合成で上へ重ねる
//	  4. rAF で tick を 0→1。**終了は待たず**、最終フレームを残したまま Stage 側の後始末で canvas を
//	     消す。表裏の確定（foreIdx 反転）は ScriptMng #finishTrans が別途行う——「見た目は Stage、
//	     終了宣言は ScriptMng」という [trans] 全体の役割分担どおり（store.tsx trans のコメント）。
//
//	シェーダに渡すもの（本家 #trans() が Filter へ渡す uniform / varying と同じ名前）：
//	  uniform sampler2D uSampler      … 表ページ画像（テクスチャ単位0）
//	  uniform float     tick          … 進度 0.0〜1.0
//	  uniform sampler2D rule          … rule= 併用時のルール画像（未指定は 1x1 透明。単位1）
//	  uniform float     vague         … 境界のぼかし幅（本家既定 0.04）
//	  varying vec2      vTextureCoord … 画面左上=(0,0) の UV（頂点シェーダが供給）
//	本家の pixi 由来グローバル（inputPixel / outputFrame / getUV()）は供給しない。あれは本家の
//	既定ルールシェーダ専用で、ユーザーシェーダ・サンプル glsl_slide のどれも使っていない。
//
//	制約（いずれも [snapshot] の既知の穴をそのまま継承。ANIMATION_RESEARCH.md §7）：
//	  ・iframe（[add_frame]）は写らない（本家 web 版の [trans] も同じ）
//	  ・再生中の <video>（動画 fg）は snapshot 時に落ちる
//	  ・部分レイヤ trans（layer= 指定）+ glsl は全画面合成の近似（Stage.tsx が back div へ
//	    「交換対象は裏・その他は表」を組んだ結果を撮る）。全画面クロスフェード置換が主用途。

import {CmnLib} from '../sn/CmnLib';
import {snapshotToPng, type T_SNAP_ARG} from './Snapshot';


export type T_GLSL_TRANS = {
	stageEl	: HTMLElement;		// Stage.tsx の内箱（stageRef）＝[snapshot]と同じ撮影対象
	holder	: HTMLElement;		// canvas を置く空div（Stage.tsx の glslHolderRef）
	glslSrc	: string;			// フラグメントシェーダソース（&変数展開済み）
	time	: number;			// ミリ秒
	vague	: number;			// 境界のぼかし幅
	ruleSrc?: string;			// rule= 併用時のルール画像URL（解決済み）
	t0		: number;			// performance.now()（[trans]開始時刻。ScriptMng の終了タイマーと歩調を合わせる）
	backSrcs: string[];			// 裏（遷移先）ページに出るはずの画像 src（store 由来）。
		//	GrpLayer は `useLoadedImg` で decode 完了まで <img> を DOM へ出さないため、[trans] 直後に
		//	素で撮ると遷移先が空になる。これらが DOM に現れ complete になるまで待ってから撮る
};

// 裏ページの <img> が出そろう（＝ backSrcs すべてが complete）まで rAF で待つ。
//	deadline を過ぎたら諦めて撮る（重い画像で演出が固まらないように。本家がテクスチャの
//	現在の中身をそのまま焼くのと同じ割り切り）
function waitBackImgs(pageDiv: Element | null, backSrcs: string[], deadlineMs: number): Promise<void> {
	if (! pageDiv || backSrcs.length === 0) return Promise.resolve();
	const t0 = performance.now();
	return new Promise(resolve=> {
		const check = ()=> {
			const have = new Set([...pageDiv.querySelectorAll('img')]
				.filter(im=> im.complete && im.naturalWidth > 0)
				.map(im=> im.getAttribute('src')));	// getAttribute＝store の src と同じ表記で比べる
			if (backSrcs.every(s=> have.has(s)) || performance.now() - t0 > deadlineMs) resolve();
			else requestAnimationFrame(check);
		};
		check();
	});
}

// 全画面クワッドの頂点シェーダ。vTextureCoord は**画面左上=(0,0)**（pixi と同じ向き）。
//	texImage2D(image) は画像の先頭行（＝上端）を t=0 へ載せるので、UV.y を反転して合わせる
const V_SRC = `
attribute vec2 aPos;
varying vec2 vTextureCoord;
void main() {
	vTextureCoord = vec2((aPos.x + 1.0) * 0.5, 1.0 - (aPos.y + 1.0) * 0.5);
	gl_Position = vec4(aPos, 0.0, 1.0);
}`;

// 下地（裏ページ画像）をそのまま描くだけのフラグメントシェーダ
const BACKDROP_SRC = `
precision mediump float;
varying vec2 vTextureCoord;
uniform sampler2D uSampler;
void main() { gl_FragColor = texture2D(uSampler, vTextureCoord); }`;


function loadImg(src: string): Promise<HTMLImageElement> {
	return new Promise((re, rj)=> {
		const im = new Image;
		im.onload = ()=> re(im);
		im.onerror = ()=> rj(new Error(`画像が読めません: ${src.slice(0, 64)}`));
		im.src = src;
	});
}

function compile(gl: WebGLRenderingContext, type: number, src: string): WebGLShader {
	const sh = gl.createShader(type)!;
	gl.shaderSource(sh, src);
	gl.compileShader(sh);
	if (! gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
		const log = gl.getShaderInfoLog(sh);
		gl.deleteShader(sh);
		throw new Error(`シェーダのコンパイルに失敗: ${log ?? ''}`);
	}
	return sh;
}

function link(gl: WebGLRenderingContext, vs: WebGLShader, fsSrc: string): WebGLProgram {
	const fs = compile(gl, gl.FRAGMENT_SHADER, fsSrc);
	const pg = gl.createProgram()!;
	gl.attachShader(pg, vs);
	gl.attachShader(pg, fs);
	gl.bindAttribLocation(pg, 0, 'aPos');	// 両プログラムで attrib 0 を共有（頂点設定は1回で済む）
	gl.linkProgram(pg);
	gl.detachShader(pg, fs);
	gl.deleteShader(fs);
	if (! gl.getProgramParameter(pg, gl.LINK_STATUS)) {
		const log = gl.getProgramInfoLog(pg);
		gl.deleteProgram(pg);
		throw new Error(`シェーダのリンクに失敗: ${log ?? ''}`);
	}
	return pg;
}

// stageW/H は 2 の冪とは限らない（1280x720 等）ので NPOT 安全な設定にする
function mkTex(gl: WebGLRenderingContext, img: TexImageSource | null): WebGLTexture {
	const tx = gl.createTexture()!;
	gl.bindTexture(gl.TEXTURE_2D, tx);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
	if (img) gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
	else gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE,
		new Uint8Array([0, 0, 0, 0]));	// rule 未指定時のダミー（シェーダが rule を宣言していても安全）
	return tx;
}


// 演出を開始し、**後始末の関数を返す**（Stage.tsx が store.trans の変化で呼ぶ）。
//	snapshot（DOM→SVG→PNG）が非同期なので、開始直後は表ページがそのまま見えている数十msがある
//	（本家もルール画像の読み込み待ちで同様）。t0 起点で進度を計算するので、遅れて始まっても
//	ScriptMng の終了タイマーと帳尻は合う
export async function runGlslTrans(o: T_GLSL_TRANS): Promise<()=> void> {
	const {stageW, stageH, bgColor} = CmnLib;

	const snap = (page: T_SNAP_ARG['page'])=> snapshotToPng({
		el: o.stageEl, sw: stageW, sh: stageH, width: stageW, height: stageH,
		// 表裏とも不透明な bg_color で撮る（本家も #fore/#back 両方に bg_color を敷く）。
		//	下地が不透明なので canvas がページを完全に隠す＝下の DOM がちらつかない
		bgColor, page, aLayNm: null, mime: 'image/png', smoothing: true,
	});
	// 遷移先ページの画像が出そろうまで待ってから撮る（表ページは今まさに表示中＝待ち不要）
	await waitBackImgs(o.stageEl.querySelector('[data-page="back"]'), o.backSrcs, 800);

	const [foreUrl, backUrl] = await Promise.all([snap('fore'), snap('back')]);
	const [foreImg, backImg, ruleImg] = await Promise.all([
		loadImg(foreUrl), loadImg(backUrl),
		o.ruleSrc ? loadImg(o.ruleSrc).catch(()=> null) : Promise.resolve(null),
	]);

	const cvs = document.createElement('canvas');
	cvs.width = stageW;
	cvs.height = stageH;
	cvs.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;pointer-events:none';
	// premultipliedAlpha:false ＝ストレートアルファ（下の blendFunc と対）。
	//	preserveDrawingBuffer:true は演出中の [snapshot]（Snapshot.ts の canvas→toDataURL 差し替え）
	//	対策で、3d_layer / live2d_layer と同じ理由
	const gl = cvs.getContext('webgl', {
		premultipliedAlpha: false, preserveDrawingBuffer: true, alpha: true,
	});
	if (! gl) throw new Error('WebGLコンテキストが取得できません');

	// ここから先のセットアップ（特に user シェーダの compile / link）は文法エラーで投げうる。
	//	投げたら生成済みリソースごとコンテキストを捨ててから rethrow する（Stage.tsx が myTrace で表示）
	try {
		return setup(gl, cvs, o, {foreImg, backImg, ruleImg});
	}
	catch (e) {
		gl.getExtension('WEBGL_lose_context')?.loseContext();
		cvs.remove();
		throw e;
	}
}

function setup(
	gl		: WebGLRenderingContext,
	cvs		: HTMLCanvasElement,
	o		: T_GLSL_TRANS,
	img		: {foreImg: HTMLImageElement; backImg: HTMLImageElement; ruleImg: HTMLImageElement | null},
): ()=> void {
	const {stageW, stageH} = CmnLib;
	const {foreImg, backImg, ruleImg} = img;

	const vs = compile(gl, gl.VERTEX_SHADER, V_SRC);
	const pgBack = link(gl, vs, BACKDROP_SRC);
	const pgUser = link(gl, vs, o.glslSrc);	// ← user シェーダの文法エラーはここで throw
	gl.deleteShader(vs);

	const buf = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, buf);
	gl.bufferData(gl.ARRAY_BUFFER,
		new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);	// TRIANGLE_STRIP で全画面
	gl.enableVertexAttribArray(0);
	gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);

	const texFore = mkTex(gl, foreImg);
	const texBack = mkTex(gl, backImg);
	const texRule = mkTex(gl, ruleImg);

	gl.viewport(0, 0, stageW, stageH);
	gl.disable(gl.DEPTH_TEST);

	const uBackSampler = gl.getUniformLocation(pgBack, 'uSampler');
	const uUser = {
		uSampler: gl.getUniformLocation(pgUser, 'uSampler'),
		tick	: gl.getUniformLocation(pgUser, 'tick'),
		rule	: gl.getUniformLocation(pgUser, 'rule'),
		vague	: gl.getUniformLocation(pgUser, 'vague'),
	};

	const draw = (tick: number)=> {
		gl.clearColor(0, 0, 0, 0);
		gl.clear(gl.COLOR_BUFFER_BIT);

		// 下地：裏ページ画像をそのまま（ブレンド無し＝不透明で塗りつぶす）
		gl.disable(gl.BLEND);
		gl.useProgram(pgBack);
		gl.activeTexture(gl.TEXTURE0);
		gl.bindTexture(gl.TEXTURE_2D, texBack);
		gl.uniform1i(uBackSampler, 0);
		gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

		// 上：user シェーダ経由の表ページ画像をアルファ合成（本家は fore を裏スプライトへ重ねる）
		gl.enable(gl.BLEND);
		gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
		gl.useProgram(pgUser);
		gl.activeTexture(gl.TEXTURE0);
		gl.bindTexture(gl.TEXTURE_2D, texFore);
		if (uUser.uSampler) gl.uniform1i(uUser.uSampler, 0);
		gl.activeTexture(gl.TEXTURE1);
		gl.bindTexture(gl.TEXTURE_2D, texRule);
		if (uUser.rule) gl.uniform1i(uUser.rule, 1);
		if (uUser.tick) gl.uniform1f(uUser.tick, tick);
		if (uUser.vague) gl.uniform1f(uUser.vague, o.vague);
		gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
	};

	let raf = 0;
	let live = true;
	const step = ()=> {
		if (! live) return;
		const tick = o.time <= 0 ? 1 : Math.min((performance.now() - o.t0) / o.time, 1);
		draw(tick);
		if (tick < 1) raf = requestAnimationFrame(step);
	};
	draw(0);
	o.holder.appendChild(cvs);
	raf = requestAnimationFrame(step);

	return ()=> {
		if (! live) return;
		live = false;
		cancelAnimationFrame(raf);
		gl.deleteTexture(texFore);
		gl.deleteTexture(texBack);
		gl.deleteTexture(texRule);
		gl.deleteBuffer(buf);
		gl.deleteProgram(pgBack);
		gl.deleteProgram(pgUser);
		// WebGL コンテキスト数には上限があるので明示的に解放する（3d_layer と同じ配慮）
		gl.getExtension('WEBGL_lose_context')?.loseContext();
		cvs.remove();
	};
}
