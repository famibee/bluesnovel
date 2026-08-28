/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2026-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

// [trans glsl=] のプリセット・トランジションシェーダ（分家独自）。src/ts/TransGlsl.ts だけが使う。
//	`[trans glsl=blur]` のように**名前**を書くとここのシェーダが使われ、GLSL ソースを直に書けば
//	それがそのまま使われる（`[add_fx]` の fx= / glsl= 分岐と同じノリだが、[trans] は属性 1 つで兼ねる）。
//
//	契約（TransGlsl.ts が供給する uniform / varying。生 glsl= も同じ）：
//	  uniform sampler2D uSampler      … 表ページ画像
//	  uniform float     tick          … 進度 0.0〜1.0
//	  uniform vec2      resolution    … ステージの実ピクセルサイズ
//	  uniform sampler2D rule / float vague … rule= 併用時のみ（blur/mosaic は使わない）
//	  varying vec2      vTextureCoord … 画面左上=(0,0) の UV
//	出力 gl_FragColor は「表ページ色 .rgb ＋ 表を残す度合い .a」。裏ページの上へアルファ合成される
//	（tick=0 で .a≈1＝表そのまま、tick=1 で .a≈0＝裏が出きる）。

const HEAD = `
precision mediump float;
varying vec2 vTextureCoord;
uniform sampler2D uSampler;
uniform float tick;
uniform vec2 resolution;`;

// プリセット名 → フラグメントシェーダ
const H_TRANS_FRAG: {readonly [name: string]: string} = {
	// ぼかし：進度とともに表ページがぼけながら消える（9-tap。重み和 1）
	blur: `${HEAD}
void main() {
	float r = tick * 0.04;	// ぼかし半径（画面比。最大 4%）
	vec2 uv = vTextureCoord;
	vec4 c = texture2D(uSampler, uv) * 0.25;
	c += texture2D(uSampler, uv + vec2( r, 0.0)) * 0.125;
	c += texture2D(uSampler, uv + vec2(-r, 0.0)) * 0.125;
	c += texture2D(uSampler, uv + vec2(0.0,  r)) * 0.125;
	c += texture2D(uSampler, uv + vec2(0.0, -r)) * 0.125;
	c += texture2D(uSampler, uv + vec2( r,  r)) * 0.0625;
	c += texture2D(uSampler, uv + vec2(-r,  r)) * 0.0625;
	c += texture2D(uSampler, uv + vec2( r, -r)) * 0.0625;
	c += texture2D(uSampler, uv + vec2(-r, -r)) * 0.0625;
	c.a *= 1.0 - tick;
	gl_FragColor = c;
}`,

	// モザイク：進度とともにブロックが粗くなりながら消える。resolution でブロックを正方に保つ
	mosaic: `${HEAD}
void main() {
	float blocks = mix(160.0, 8.0, tick);	// 縦方向のブロック数：細かい→粗い
	vec2 grid = vec2(blocks * resolution.x / max(resolution.y, 1.0), blocks);
	vec2 uv = (floor(vTextureCoord * grid) + 0.5) / grid;
	vec4 c = texture2D(uSampler, uv);
	c.a *= 1.0 - tick * tick;	// 消え際を少し後ろへ
	gl_FragColor = c;
}`,
};

export const A_TRANS_PRESET = Object.keys(H_TRANS_FRAG);

// glsl= の値がプリセット名ならそのシェーダを、そうでなければソースそのものを返す
export function resolveTransGlsl(glsl: string): string {
	return H_TRANS_FRAG[glsl] ?? glsl;
}
