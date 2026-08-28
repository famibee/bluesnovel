/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2026-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

// [add_fx]（立ち絵シェーダエフェクトの試作。ANIMATION_RESEARCH.md §7 の「C 方式」最小スパイク）。
//	GrpLayer.tsx の <FxImg> が **このモジュールだけを lazy import** し、レイヤ実寸の <canvas>
//	（WebGL）へ基本画像＋シェーダを描く。コアのバンドルには載らない（[add_fx] が使われた回に
//	はじめて読まれる）。TransGlsl.ts と同じ生 WebGL の骨格。
//
//	・aFx[] のスタックは順にパスとして適用（2 枚のフレームバッファで ping-pong）。
//	・fx.time>0（one-shot）は経過後そのパスを素通しに切り替え、全パスが素通し／無効になったら
//	  rAF を止めて凍結（＝基本画像そのまま）。記述子の撤去は [clear_fx]／[clear_lay] が行う。
//	・[pause_fx]/[resume_fx]（fx.enabled）は canvas を作り直さず update() でホットスワップ
//	  （key 再生成すると tick=0 へ戻ってしまう）。無効パスは自分の tick を凍結して描画は続ける
//	  （前段パスの出力が動いていれば入力は変わるため）。全パス無効なら rAF ごと止める。
//	・face 差分合成（aFace）は通さない＝基本画像だけにかかる（試作の割り切り）。
//	・preserveDrawingBuffer:true は [snapshot]（Snapshot.ts の canvas→toDataURL 差し替え）対策で
//	  3d_layer / live2d_layer と同じ理由。

import type {T_FX} from './Fx';
import {V_SRC, PASSTHRU_SRC, H_FX_FRAG} from './fxPresets';


type T_ARG = {canvas: HTMLCanvasElement; src: string; aFx: T_FX[]};

// <FxImg>（GrpLayer.tsx）が握る制御ハンドル。シェーダ構成（fx 名/glsl/パス数）が変わらない限り
//	canvas は作り直さず、enabled・プリセットパラメータ・speed・time は update() で差し替える
export type T_FX_HANDLE = {
	update(aFx: T_FX[]): void;	// 同じ長さ・同じ fx 構成の aFx（パラメータ・enabled だけ差分）
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
	const img = await loadImg(o.src);
	const w = Math.max(1, img.naturalWidth);
	const h = Math.max(1, img.naturalHeight);
	const cvs = o.canvas;
	cvs.width = w;
	cvs.height = h;

	const gl = cvs.getContext('webgl', {
		premultipliedAlpha: false, preserveDrawingBuffer: true, alpha: true,
	});
	if (! gl) throw new Error('WebGLコンテキストが取得できません');

	try {
		return setup(gl, o.aFx, img, w, h);
	}
	catch (e) {
		gl.getExtension('WEBGL_lose_context')?.loseContext();
		throw e;
	}
}

type T_PASS = {
	pg		: WebGLProgram;
	uSrc	: WebGLUniformLocation | null;
	uTime	: WebGLUniformLocation | null;
	uRes	: WebGLUniformLocation | null;
	uAmp	: WebGLUniformLocation | null;
	uFreq	: WebGLUniformLocation | null;
	uShift	: WebGLUniformLocation | null;
	fx		: T_FX;
	pausedAccMs	: number;	// [pause_fx] で止まっていた合計時間（この分だけ tick を巻き戻す）
	pausedAt	: number;	// 現在の一時停止の開始時刻（performance.now()。0＝停止していない）
};

function setup(gl: WebGLRenderingContext, aFx: T_FX[], img: HTMLImageElement, w: number, h: number): T_FX_HANDLE {
	const vs = compile(gl, gl.VERTEX_SHADER, V_SRC);
	const mkPass = (fsSrc: string, fx: T_FX): T_PASS => {
		const pg = link(gl, vs, fsSrc);
		return {
			pg, fx, pausedAccMs: 0, pausedAt: 0,
			uSrc	: gl.getUniformLocation(pg, 'src'),
			uTime	: gl.getUniformLocation(pg, 'time'),
			uRes	: gl.getUniformLocation(pg, 'resolution'),
			uAmp	: gl.getUniformLocation(pg, 'amp'),
			uFreq	: gl.getUniformLocation(pg, 'freq'),
			uShift	: gl.getUniformLocation(pg, 'shift'),
		};
	};
	const aPass = aFx.map(fx=> {
		const fsSrc = H_FX_FRAG[fx.fx];
		if (! fsSrc) throw new Error(`未知の fx: ${fx.fx}`);
		return mkPass(fsSrc, fx);
	});
	const pgPass = mkPass(PASSTHRU_SRC, {} as T_FX);	// 素通し（one-shot 経過後・最終ブリット用）
	gl.deleteShader(vs);

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
		if (p.uSrc) gl.uniform1i(p.uSrc, 0);
		if (p.uTime) gl.uniform1f(p.uTime, timeSec);
		if (p.uRes) gl.uniform2f(p.uRes, w, h);
		if (p.uAmp) gl.uniform1f(p.uAmp, p.fx.params?.amp ?? 0);
		if (p.uFreq) gl.uniform1f(p.uFreq, p.fx.params?.freq ?? 0);
		if (p.uShift) gl.uniform1f(p.uShift, p.fx.params?.shift ?? 0);
		gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
	};

	const t0 = performance.now();
	let raf = 0;
	let live = true;

	const render = ()=> {
		const now = performance.now();
		const elapsedMs = now - t0;
		let anyActive = false;

		// n パス（aPass 順）→ 最後に画面へ素通しブリット
		for (let i = 0; i < aPass.length; ++i) {
			const p = aPass[i]!;
			// [pause_fx]/[resume_fx]：無効化されている間の経過を pausedAccMs に貯め、tick から差し引く
			if (! p.fx.enabled && p.pausedAt === 0) p.pausedAt = now;
			else if (p.fx.enabled && p.pausedAt !== 0) {p.pausedAccMs += now - p.pausedAt; p.pausedAt = 0}
			const effMs = elapsedMs - p.pausedAccMs - (p.pausedAt !== 0 ? now - p.pausedAt : 0);

			const expired = p.fx.time > 0 && effMs >= p.fx.time;
			if (! expired && p.fx.enabled) anyActive = true;	// 無効パス・経過パスは rAF を回さない
			const inTex = i === 0 ? texSrc : ping[(i - 1) % 2]!.tex;
			const timeSec = effMs / 1000 * (p.fx.speed || 1);
			drawPass(expired ? pgPass : p, inTex, ping[i % 2]!.fb, timeSec);
		}
		drawPass(pgPass, ping[(aPass.length - 1) % 2]!.tex, null, 0);
		return anyActive;
	};

	const step = ()=> {
		if (! live) return;
		raf = render() ? requestAnimationFrame(step) : 0;
		// 全 one-shot 経過／全パス無効 → 最後の render() は凍結された絵。raf=0 にして停止（update() で再開できる）
	};
	render();
	raf = requestAnimationFrame(step);

	return {
		update(newAFx: T_FX[]) {
			if (! live) return;
			for (let i = 0; i < aPass.length; ++i) {const f = newAFx[i]; if (f) aPass[i]!.fx = f}
			if (raf === 0) raf = requestAnimationFrame(step);	// 止まっていた rAF を動かし直す（enabled が戻った等）
		},
		dispose() {
			if (! live) return;
			live = false;
			cancelAnimationFrame(raf);
			gl.deleteTexture(texSrc);
			for (const {tex, fb} of ping) {gl.deleteTexture(tex); gl.deleteFramebuffer(fb)}
			gl.deleteBuffer(buf);
			for (const p of aPass) gl.deleteProgram(p.pg);
			gl.deleteProgram(pgPass.pg);
			gl.getExtension('WEBGL_lose_context')?.loseContext();
		},
	};
}
