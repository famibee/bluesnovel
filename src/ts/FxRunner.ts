/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2026-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

// [add_fx]（立ち絵・背景シェーダエフェクト。分家独自。ANIMATION_RESEARCH.md §7 の「C 方式」）。
//	GrpLayer.tsx の <FxImg> が **このモジュールだけを lazy import** し、レイヤ実寸の <canvas>
//	（WebGL）へ基本画像＋シェーダを描く。コアのバンドルには載らない（[add_fx] が使われた回に
//	はじめて読まれる）。TransGlsl.ts と同じ生 WebGL の骨格。
//
//	・aFx[] のスタックは順にパスとして適用（2 枚のフレームバッファで ping-pong）。各パスは
//	  組み込みプリセット（fxPresets.ts H_FX_FRAG）か [def_fx] のユーザープリセット（fxRegistry。
//	  HEAD を前置して使う）。契約 uniform／varying は [trans glsl=] と統一
//	  （uSampler / tick / vTextureCoord / resolution。詳細は Fx.ts ヘッダ）。
//	・fx.time>0（one-shot）は経過後そのパスを素通しに切り替え、全パスが素通し／無効になったら
//	  rAF を止めて凍結（＝基本画像そのまま）。記述子の撤去は [clear_fx]／[clear_lay] が行う。
//	・update() は canvas/コンテキストを作り直さない。パラメータ・enabled（[pause_fx]/[resume_fx]）・
//	  可視判定（active）はそのまま差し替え、**シェーダ構成（fx 名/パス数）が変わった時は
//	  同じコンテキスト上でプログラムだけ組み直す**（旧フレームが残っているので切替時に空白が出ない）。
//	  凍結パスは自分の tick を止めて描画は続ける（前段パスが動けば入力は変わるため）。全パス凍結／
//	  不可視なら rAF ごと止め、凍結が解けたら続きから（[trans] 後の不可視 back ページの空回しを止める）。
//	・source は基本画像 URL／GrpLayer.tsx が基本画像＋静止 face を合成した offscreen 2D canvas
//	  （差分が変わった時だけ作り直す）／基本画像か face が動的（アニメ png シート／動画レイヤ／動画 face）
//	  なら「毎フレーム描き直す関数」で、rAF ごとに texImage2D で吸い上げる。関数は dispose() を
//	  持てる（動画 face 用の detached な <video> の解放）。外部ドメインの画像・動画は 2D canvas を
//	  汚染し texImage2D が失敗する（[snapshot] と同じ制約）。
//	・preserveDrawingBuffer:true は [snapshot]（Snapshot.ts の canvas→toDataURL 差し替え）対策で
//	  3d_layer / live2d_layer と同じ理由。

import {A_FX_PARAM, type T_FX} from './Fx';
import {V_SRC, PASSTHRU_SRC, HEAD, H_FX_FRAG} from './fxPresets';
import {getDefFx} from './fxRegistry';	// [def_fx] で定義したユーザープリセット GLSL（本体のみ。HEAD は下で前置）


//	source が関数のときは「毎フレーム描き直される 2D canvas」＝rAF ごとに texImage2D で吸い上げる
//	（アニメ png シート・動画レイヤ・動画 face を fx に通す。GrpLayer.tsx makeFxSource）。
//	dispose() は内部リソース（動画 face 用の detached な <video>）の解放（あれば）
type T_DYN_SOURCE = (()=> TexImageSource) & {dispose?: ()=> void};
type T_SOURCE = string | HTMLCanvasElement | HTMLImageElement | T_DYN_SOURCE;
type T_ARG = {canvas: HTMLCanvasElement; source: T_SOURCE; aFx: T_FX[]; active: boolean};

// <FxImg>（GrpLayer.tsx）が握る制御ハンドル。シェーダ構成（fx 名/パス数）が変わらない限り
//	canvas は作り直さず、enabled・プリセットパラメータ・speed・time・active は update() で差し替える
export type T_FX_HANDLE = {
	// aFx＝同じ長さ・同じ fx 構成（パラメータ・enabled だけ差分）。
	// active＝可視ページか（[trans] 後の不可視 back ページでは false＝全パス凍結＋rAF 停止）
	update(aFx: T_FX[], active: boolean): void;
	dispose(): void;
};

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
	gl.bindAttribLocation(pg, 0, 'aPos');
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

// NPOT 安全なテクスチャ（立ち絵は 2 の冪とは限らない）
function mkTex(gl: WebGLRenderingContext, img: TexImageSource | null, w: number, h: number): WebGLTexture {
	const tx = gl.createTexture()!;
	gl.bindTexture(gl.TEXTURE_2D, tx);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
	if (img) {
		// 基本画像は y-up にして上げる（FBO と同じ向き）。頂点シェーダで反転しない代わり
		//	＝ping-pong のパス数が奇数でも偶数でも上下が崩れない（fxPresets.ts V_SRC のコメント）
		gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
		gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
	}
	else gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, w, h, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
	return tx;
}


// 演出を開始し、**制御ハンドルを返す**（<FxImg> が update()／useEffect cleanup で dispose() を呼ぶ）
export async function runFx(o: T_ARG): Promise<T_FX_HANDLE> {
	const s = o.source;
	let img: TexImageSource;
	if (typeof s === 'function') img = s();
	else if (typeof s === 'string') img = await loadImg(s);
	else img = s;
	const dyn: T_DYN_SOURCE | null = typeof s === 'function' ? s : null;	// 毎フレーム転写する動的ソース
	// 呼び出し元は必ず HTMLImageElement か HTMLCanvasElement を渡す（GrpLayer.tsx）
	const w = Math.max(1, img instanceof HTMLImageElement ? img.naturalWidth : (img as HTMLCanvasElement).width);
	const h = Math.max(1, img instanceof HTMLImageElement ? img.naturalHeight : (img as HTMLCanvasElement).height);
	const cvs = o.canvas;
	cvs.width = w;
	cvs.height = h;

	const gl = cvs.getContext('webgl', {
		premultipliedAlpha: false, preserveDrawingBuffer: true, alpha: true,
	});
	if (! gl) throw new Error('WebGLコンテキストが取得できません');

	try {
		return setup(gl, cvs, o.aFx, img, w, h, o.active, dyn);
	}
	catch (e) {
		gl.getExtension('WEBGL_lose_context')?.loseContext();
		throw e;
	}
}

type T_PASS = {
	pg		: WebGLProgram;
	uSampler: WebGLUniformLocation | null;	// 契約名は [trans glsl=] と統一（src→uSampler / time→tick / vUv→vTextureCoord）
	uTick	: WebGLUniformLocation | null;
	uRes	: WebGLUniformLocation | null;
	// スカラ入力ポート（amp/freq/shift/p1〜p4）。名前は Fx.ts の A_FX_PARAM が唯一の台帳
	uParam	: {readonly [k: string]: WebGLUniformLocation | null};
	uColor	: WebGLUniformLocation | null;	// color=（uniform vec3 color。0..1 RGB）
	fx		: T_FX;
	pausedAccMs	: number;	// [pause_fx] で止まっていた合計時間（この分だけ tick を巻き戻す）
	pausedAt	: number;	// 現在の一時停止の開始時刻（performance.now()。0＝停止していない）
};

function setup(gl: WebGLRenderingContext, cvs: HTMLCanvasElement, aFx: T_FX[], img: TexImageSource, w: number, h: number, active0: boolean, dyn: T_DYN_SOURCE | null): T_FX_HANDLE {
	const vs = compile(gl, gl.VERTEX_SHADER, V_SRC);
	const mkPass = (fsSrc: string, fx: T_FX): T_PASS => {
		const pg = link(gl, vs, fsSrc);
		return {
			pg, fx, pausedAccMs: 0, pausedAt: 0,
			uSampler: gl.getUniformLocation(pg, 'uSampler'),
			uTick	: gl.getUniformLocation(pg, 'tick'),
			uRes	: gl.getUniformLocation(pg, 'resolution'),
			uParam	: Object.fromEntries(A_FX_PARAM.map(k=> [k, gl.getUniformLocation(pg, k)])),
			uColor	: gl.getUniformLocation(pg, 'color'),
		};
	};
	// 組み込みプリセット（HEAD 込みで H_FX_FRAG が持つ）か、[def_fx] のユーザープリセット
	//	（本体だけレジストリに登録されているので HEAD を前置）。fx 名は Fx.bldFx() で検査済み
	const fsOf = (fx: T_FX)=> {
		const preset = H_FX_FRAG[fx.fx];
		if (preset) return preset;
		const user = getDefFx(fx.fx);
		if (user !== undefined) return `${HEAD}\n${user}`;
		throw new Error(`未知の fx: ${fx.fx}（[def_fx] 未定義？）`);
	};
	// シェーダ構成（fx 名／パス数）の署名。これが変わらない限り update() でパスを作り直さない
	const structSig = (a: readonly T_FX[])=> a.map(f=> f.fx).join('');

	let aPass = aFx.map(fx=> mkPass(fsOf(fx), fx));
	let sig = structSig(aFx);
	const pgPass = mkPass(PASSTHRU_SRC, {} as T_FX);	// 素通し（one-shot 経過後・最終ブリット用。作り直さない）

	const buf = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, buf);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
	gl.enableVertexAttribArray(0);
	gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);

	const texSrc = mkTex(gl, img, w, h);
	// ping-pong 用のオフスクリーン 2 枚（w×h）
	const ping = [0, 1].map(()=> {
		const tex = mkTex(gl, null, w, h);
		const fb = gl.createFramebuffer()!;
		gl.bindFramebuffer(gl.FRAMEBUFFER, fb);
		gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, tex, 0);
		return {tex, fb};
	});
	gl.bindFramebuffer(gl.FRAMEBUFFER, null);

	gl.viewport(0, 0, w, h);
	gl.disable(gl.DEPTH_TEST);
	gl.disable(gl.BLEND);

	// 1 パス分の描画。inTex を読み、target（null=画面）へ書く
	const drawPass = (p: T_PASS, inTex: WebGLTexture, target: WebGLFramebuffer | null, timeSec: number)=> {
		gl.bindFramebuffer(gl.FRAMEBUFFER, target);
		gl.clearColor(0, 0, 0, 0);
		gl.clear(gl.COLOR_BUFFER_BIT);
		gl.useProgram(p.pg);
		gl.activeTexture(gl.TEXTURE0);
		gl.bindTexture(gl.TEXTURE_2D, inTex);
		if (p.uSampler) gl.uniform1i(p.uSampler, 0);
		if (p.uTick) gl.uniform1f(p.uTick, timeSec);
		if (p.uRes) gl.uniform2f(p.uRes, w, h);
		for (const k of A_FX_PARAM) {
			const loc = p.uParam[k];
			if (loc) gl.uniform1f(loc, p.fx.params?.[k] ?? 0);
		}
		if (p.uColor) {const c = p.fx.color ?? [0, 0, 0]; gl.uniform3f(p.uColor, c[0], c[1], c[2])}
		gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
	};

	const t0 = performance.now();
	let raf = 0;
	let live = true;
	let active = active0;	// 可視ページか（[trans] 後の不可視 back ページでは false）

	// rAF が回っているか（0/1）を canvas 属性に映す。devtools でのデバッグと E2E（fx.e2e.ts の
	//	不可視 back ページ凍結テスト）用。状態が変わった時だけ書く＝毎フレーム書かない
	const setRaf = (id: number)=> {
		if ((raf === 0) !== (id === 0)) cvs.dataset.fxRunning = id === 0 ? '0' : '1';
		raf = id;
	};

	const render = ()=> {
		const now = performance.now();
		const elapsedMs = now - t0;
		let anyActive = false;

		// 動的ソース（アニメ png シート face）は毎フレーム texSrc へ吸い上げる。可視ページのみ
		//	（不可視 back ページでは転写もしない＝空回しにならない）。face が動いている限り rAF を回す
		if (dyn && active) {
			gl.bindTexture(gl.TEXTURE_2D, texSrc);
			gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
			gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, dyn());
			gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
			anyActive = true;
		}

		// n パス（aPass 順）→ 最後に画面へ素通しブリット
		for (let i = 0; i < aPass.length; ++i) {
			const p = aPass[i]!;
			// 凍結するのは [pause_fx] で無効化されたパス、または不可視ページ全体。
			//	凍結中の経過を pausedAccMs に貯め、tick から差し引く（＝可視に戻ったら続きから）
			const frozen = ! p.fx.enabled || ! active;
			if (frozen && p.pausedAt === 0) p.pausedAt = now;
			else if (! frozen && p.pausedAt !== 0) {p.pausedAccMs += now - p.pausedAt; p.pausedAt = 0}
			const effMs = elapsedMs - p.pausedAccMs - (p.pausedAt !== 0 ? now - p.pausedAt : 0);

			const expired = p.fx.time > 0 && effMs >= p.fx.time;
			if (! expired && ! frozen) anyActive = true;	// 凍結パス・経過パスは rAF を回さない
			const inTex = i === 0 ? texSrc : ping[(i - 1) % 2]!.tex;
			const timeSec = effMs / 1000 * (p.fx.speed || 1);
			drawPass(expired ? pgPass : p, inTex, ping[i % 2]!.fb, timeSec);
		}
		drawPass(pgPass, ping[(aPass.length - 1) % 2]!.tex, null, 0);
		return anyActive;
	};

	const step = ()=> {
		if (! live) return;
		setRaf(render() ? requestAnimationFrame(step) : 0);
		// 全 one-shot 経過／全パス凍結／不可視 → 最後の render() は凍結された絵。raf=0 で停止（update() で再開）
	};
	render();
	setRaf(requestAnimationFrame(step));

	return {
		update(newAFx: T_FX[], newActive: boolean) {
			if (! live) return;
			active = newActive;
			const nextSig = structSig(newAFx);
			if (nextSig !== sig) {
				// シェーダ構成が変わった＝canvas は作り直さず**同じコンテキスト上でプログラムだけ組み直す**
				//	（key 再生成による空白を無くす。ANIMATION_RESEARCH.md §7）。文法エラーは握って
				//	旧構成のまま続ける（[add_fx] は Fx.bldFx() で検査済みなので通常起きない）
				try {
					const built = newAFx.map(fx=> mkPass(fsOf(fx), fx));
					for (const p of aPass) gl.deleteProgram(p.pg);
					const nowMs = performance.now() - t0;
					for (const p of built) p.pausedAccMs = nowMs;	// 新しい効果の tick は 0 から
					aPass = built;
					sig = nextSig;
				}
				catch (e) {console.error(`[add_fx] ${String(e)}`)}
			}
			// プリセット構成（fx名の並び）が変わらない＝プログラムは作り直さず.fxだけ差し替える経路。
			//	無限ループ系（time=0）はここで tick を巻き戻さない：[add_fx amp=…] のようなその場の
			//	パラメータ調整でアニメの位相を保つのが目的（wave/rain等の想定挙動）。
			//	単発（time>0）は逆に、同じ preset 名のまま（[clear_fx] を挟まず）[add_fx name=同名
			//	fx=同名 loop=false] 等で再トリガーする場合、ここで tick を巻き戻さないと、前回の
			//	経過時間を引き継いだまま新しい time= と比較されてしまい、再生し直したいのに
			//	初回描画から「経過済み」＝素通しになりかねない。単発は毎回「今から」が自然な
			//	挙動なので、そのパスだけ pausedAccMs をリセットする（2026-09-02）
			else for (let i = 0; i < aPass.length; ++i) {
				const f = newAFx[i];
				if (! f) continue;
				const p = aPass[i]!;
				if (f.time > 0) {p.pausedAccMs = performance.now() - t0; p.pausedAt = 0}
				p.fx = f;
			}

			// 止まっていた rAF を動かし直す（enabled／active／構成が変わった等）。凍結のままなら
			//	step() が 1 フレームで raf=0 に戻すだけ（不可視ページで無駄回しにはならない）
			if (raf === 0) setRaf(requestAnimationFrame(step));
		},
		dispose() {
			if (! live) return;
			live = false;
			cancelAnimationFrame(raf);
			gl.deleteShader(vs);
			gl.deleteTexture(texSrc);
			for (const {tex, fb} of ping) {gl.deleteTexture(tex); gl.deleteFramebuffer(fb)}
			gl.deleteBuffer(buf);
			for (const p of aPass) gl.deleteProgram(p.pg);
			gl.deleteProgram(pgPass.pg);
			gl.getExtension('WEBGL_lose_context')?.loseContext();
			dyn?.dispose?.();	// 動画 face 用の detached な <video> を解放（あれば）
		},
	};
}
