/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2026-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

// [add_fx]（立ち絵シェーダエフェクトの試作）のプリセット GLSL。
//	src/ts/FxRunner.ts からのみ lazy import される（[add_fx] が使われるまで読まれない）。
//	シェーダの契約は [trans glsl=]（TransGlsl.ts、本家サンプル glsl_slide 準拠）と名前を揃える：
//	  varying  vec2      vTextureCoord … 正規化 UV（0..1）。**左下=(0,0)／上=1**（素の GL 向き。
//	                                     基本画像を UNPACK_FLIP_Y で上げて FBO と揃えているため。
//	                                     ※[trans] 側は画面左上=(0,0) の y-down。向きだけ流儀が違う）
//	  uniform  sampler2D uSampler     … 入力画像（前パスの結果 or 基本画像）
//	  uniform  float     tick         … 経過秒 × speed=（0 起点）
//	  uniform  vec2      resolution   … canvas の実ピクセルサイズ
//	  ＋ プリセット固有 uniform（amp / freq / shift。既定は src/ts/Fx.ts の H_FX_DEF）
//	GLSL は vfx-js（MIT）の wave / rgbShift 相当を要点だけ書き直したもの。パッケージ非依存。
//	Shadertoy（iTime / iChannel0 …）は開発時に手変換（マッピングは docs/tag.html）。

// 全画像クワッドの頂点シェーダ。**UV.y は反転しない**（クリップ座標→UV 直結）。
//	TransGlsl.ts は単一パスで頂点側で反転しているが、FxRunner は 2 枚 FBO の ping-pong を
//	重ねるので頂点反転だと**パス数が奇数のとき上下が逆さ**になる。代わりに基本画像を
//	UNPACK_FLIP_Y_WEBGL で上げて FBO と同じ y-up に揃え、どのパス数でも向きが崩れないようにする
export const V_SRC = `
attribute vec2 aPos;
varying vec2 vTextureCoord;
void main() {
	vTextureCoord = (aPos + 1.0) * 0.5;
	gl_Position = vec4(aPos, 0.0, 1.0);
}`;

// 素通し（one-shot の time= 経過後・パス無しスロット用）
export const PASSTHRU_SRC = `
precision mediump float;
varying vec2 vTextureCoord;
uniform sampler2D uSampler;
void main() { gl_FragColor = texture2D(uSampler, vTextureCoord); }`;

const HEAD = `
precision mediump float;
varying vec2 vTextureCoord;
uniform sampler2D uSampler;
uniform float tick;
uniform vec2 resolution;`;

// プリセット名 → フラグメントシェーダ。src/ts/Fx.ts の A_FX_PRESET と対応
export const H_FX_FRAG: {readonly [fx: string]: string} = {
	// 横方向の正弦波でゆらす（水面／陽炎）。amp=px, freq=縦の波の本数の目安
	wave: `${HEAD}
uniform float amp;
uniform float freq;
void main() {
	vec2 uv = vTextureCoord;
	uv.x += sin(uv.y * freq * 6.2831853 + tick * 3.0) * (amp / resolution.x);
	gl_FragColor = texture2D(uSampler, uv);
}`,

	// RGB を左右にずらす（グリッチ／色収差）。shift=px を tick で脈動させる
	rgbShift: `${HEAD}
uniform float shift;
void main() {
	float d = shift / resolution.x * (0.35 + 0.65 * abs(sin(tick * 2.0)));
	float r = texture2D(uSampler, vTextureCoord + vec2(d, 0.0)).r;
	vec4  g = texture2D(uSampler, vTextureCoord);
	float b = texture2D(uSampler, vTextureCoord - vec2(d, 0.0)).b;
	gl_FragColor = vec4(r, g.g, b, g.a);
}`,

	// 降雪（背景向け）。amp=落下速度, freq=層の数の目安（＝密度）。
	//	技法：ハッシュ乱数のセルグリッドを層で重ねる定番手法を再実装（特定コードの写しではない）。
	//	透明部にも雪が乗るので bg（不透明）レイヤ想定。alpha は max で持ち上げる
	snow: `${HEAD}
uniform float amp;
uniform float freq;
float hash(vec2 p) { return fract(sin(dot(p, vec2(41.3, 289.1))) * 43758.5453); }
void main() {
	vec4 src = texture2D(uSampler, vTextureCoord);
	vec2 uv = vTextureCoord;
	uv.x *= resolution.x / max(resolution.y, 1.0);	// 正方セルにするアスペクト補正
	float layers = clamp(freq, 1.0, 6.0);
	float snow = 0.0;
	for (float i = 0.0; i < 6.0; i++) {
		if (i >= layers) break;
		float scale = 8.0 + i * 6.0;
		vec2 gv = uv * scale;
		gv.y += tick * (0.3 + 0.15 * i) * amp * scale;	// 下へ流す
		gv.x += sin((gv.y + i) * 0.5) * 0.5;				// 横ゆらぎ
		vec2 id = floor(gv);
		float rnd = hash(id + i * 13.0);
		vec2 c = fract(gv) - 0.5 - (vec2(rnd, fract(rnd * 7.0)) - 0.5) * 0.6;
		float flake = smoothstep(0.09 + 0.02 * i, 0.0, length(c)) * (0.4 + 0.6 * rnd);
		snow += flake * (1.0 - i / 8.0);
	}
	snow = clamp(snow, 0.0, 1.0);
	gl_FragColor = vec4(mix(src.rgb, vec3(1.0), snow), max(src.a, snow));
}`,

	// 雨（背景向け）。amp=落下速度, freq=本数の目安（＝密度）。
	//	技法：画面を縦帯に割り、帯ごとにハッシュで位相・速度を変えた縦スジを描く定番手法の再実装
	rain: `${HEAD}
uniform float amp;
uniform float freq;
float hash(float x) { return fract(sin(x * 41.3) * 43758.5453); }
void main() {
	vec4 src = texture2D(uSampler, vTextureCoord);
	vec2 uv = vTextureCoord;
	uv.x *= resolution.x / max(resolution.y, 1.0);
	float bands = 40.0 + freq * 20.0;
	float col_id = floor(uv.x * bands);
	float x = fract(uv.x * bands) - 0.5;
	float rnd = hash(col_id);
	float y = fract(uv.y * (2.0 + rnd) - tick * (1.2 + rnd) * amp);
	float streak = smoothstep(1.0, 0.0, abs(x) * 12.0)
		* smoothstep(0.0, 0.15, y) * smoothstep(0.9, 0.35, y);
	gl_FragColor = vec4(mix(src.rgb, vec3(0.75, 0.80, 0.92), streak * 0.5), src.a);
}`,
};
