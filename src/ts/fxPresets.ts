/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2026-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

// [add_fx]（立ち絵シェーダエフェクトの試作）のプリセット GLSL。
//	src/ts/FxRunner.ts からのみ lazy import される（[add_fx] が使われるまで読まれない）。
//	シェーダの契約（FxRunner が供給する uniform / varying）：
//	  varying  vec2      vUv         … 正規化 UV（0..1）。**左下=(0,0)／上=1**（素の GL 向き。
//	                                   基本画像を UNPACK_FLIP_Y で上げて FBO と揃えているため）
//	  uniform  sampler2D src         … 入力画像（前パスの結果 or 基本画像）
//	  uniform  float     time        … 経過秒 × speed=（0 起点）
//	  uniform  vec2      resolution  … canvas の実ピクセルサイズ
//	  ＋ プリセット固有 uniform（amp / freq / shift。既定は src/ts/Fx.ts の H_FX_DEF）
//	GLSL は vfx-js（MIT）の wave / rgbShift 相当を要点だけ書き直したもの。パッケージ非依存。

// 全画像クワッドの頂点シェーダ。**UV.y は反転しない**（クリップ座標→UV 直結）。
//	TransGlsl.ts は単一パスで頂点側で反転しているが、FxRunner は 2 枚 FBO の ping-pong を
//	重ねるので頂点反転だと**パス数が奇数のとき上下が逆さ**になる。代わりに基本画像を
//	UNPACK_FLIP_Y_WEBGL で上げて FBO と同じ y-up に揃え、どのパス数でも向きが崩れないようにする
export const V_SRC = `
attribute vec2 aPos;
varying vec2 vUv;
void main() {
	vUv = (aPos + 1.0) * 0.5;
	gl_Position = vec4(aPos, 0.0, 1.0);
}`;

// 素通し（one-shot の time= 経過後・パス無しスロット用）
export const PASSTHRU_SRC = `
precision mediump float;
varying vec2 vUv;
uniform sampler2D src;
void main() { gl_FragColor = texture2D(src, vUv); }`;

const HEAD = `
precision mediump float;
varying vec2 vUv;
uniform sampler2D src;
uniform float time;
uniform vec2 resolution;`;

// プリセット名 → フラグメントシェーダ。src/ts/Fx.ts の A_FX_PRESET と対応
export const H_FX_FRAG: {readonly [fx: string]: string} = {
	// 横方向の正弦波でゆらす（水面／陽炎）。amp=px, freq=縦の波の本数の目安
	wave: `${HEAD}
uniform float amp;
uniform float freq;
void main() {
	vec2 uv = vUv;
	uv.x += sin(uv.y * freq * 6.2831853 + time * 3.0) * (amp / resolution.x);
	gl_FragColor = texture2D(src, uv);
}`,

	// RGB を左右にずらす（グリッチ／色収差）。shift=px を time で脈動させる
	rgbShift: `${HEAD}
uniform float shift;
void main() {
	float d = shift / resolution.x * (0.35 + 0.65 * abs(sin(time * 2.0)));
	float r = texture2D(src, vUv + vec2(d, 0.0)).r;
	vec4  g = texture2D(src, vUv);
	float b = texture2D(src, vUv - vec2(d, 0.0)).b;
	gl_FragColor = vec4(r, g.g, b, g.a);
}`,
};
