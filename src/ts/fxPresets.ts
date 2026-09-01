/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2026-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

// [add_fx]（立ち絵・背景シェーダエフェクト。分家独自）のプリセット GLSL。
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

// 組み込みプリセットと [def_fx]（ユーザープリセット）に FxRunner が前置する共通ヘッダ。
//	作者はこれらを再宣言せず main() と固有 uniform（amp/freq/shift…）だけ書く。
//	（生の [trans glsl=] は自前で書く流儀だが、[def_fx] は「プリセット追加」なので組み込みと統一）
export const HEAD = `
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

	// 降雪（背景向け）。amp=落下速度の倍率, freq=重ねる層の数（＝密度。0〜7、既定 3。端数はフェード）。
	//	技法：glslsandbox.com e#36547.0（glsl-sandbox は MIT）を要点だけ移植。スケール違いの
	//	  セルグリッドを層で重ね、各セルのハッシュ位置に smoothstep で雪片を落とす。手前（小さい
	//	  scale）ほど大きく明るい。透明部にも雪が乗るので bg（不透明）レイヤ想定。alpha は max で持ち上げる
	snow: `${HEAD}
uniform float amp;
uniform float freq;
// 1 層ぶんの降雪。戻り値は雪片の明るさ（0..1）。scale が大きいほど遠い（細かく淡い）層
float snowLayer(vec2 uv, float scale) {
	float w = smoothstep(1.0, 0.0, -uv.y * (scale / 10.0));	// 画面下ほど濃く
	if (w < 0.1) return 0.0;

	uv   += tick * amp / scale;				// amp＝落下速度の倍率
	uv.y += tick * amp * 2.0 / scale;
	uv.x += sin(uv.y + tick * 0.5) / scale;	// 横ゆらぎ（位相は基準速度）

	uv *= scale;
	vec2 s = floor(uv);
	vec2 f = fract(uv);
	vec2 p = vec2(0.0);	// 元シェーダは未初期化 p を右辺で参照（＝実質 0）。挙動を固定するため明示
	float k = 3.0;

	p = 0.5 + 0.35 * sin(11.0 * fract(sin((s + p + scale) * mat2(7, 3, 6, 5)) * 5.0)) - f;
	float d = length(p);
	k = min(d, k);

	k = smoothstep(0.0, k, sin(f.x + f.y) * 0.01);
	return k * w;
}
void main() {
	vec2 uv = (gl_FragCoord.xy * 2.0 - resolution.xy) / min(resolution.x, resolution.y);

	// 手前（小さい scale・強い）から freq 個ぶんの層を積む
	float n = clamp(freq, 0.0, 7.0);
	float acc = 0.0;
	acc += snowLayer(uv,  5.0)       * clamp(n - 0.0, 0.0, 1.0);
	acc += snowLayer(uv,  6.0)       * clamp(n - 1.0, 0.0, 1.0);
	acc += snowLayer(uv,  8.0)       * clamp(n - 2.0, 0.0, 1.0);
	acc += snowLayer(uv, 10.0)       * clamp(n - 3.0, 0.0, 1.0);
	acc += snowLayer(uv, 15.0) * 0.8 * clamp(n - 4.0, 0.0, 1.0);
	acc += snowLayer(uv, 20.0) * 0.5 * clamp(n - 5.0, 0.0, 1.0);
	acc += snowLayer(uv, 30.0) * 0.3 * clamp(n - 6.0, 0.0, 1.0);

	float a = clamp(acc, 0.0, 1.0);
	vec4 src = texture2D(uSampler, vTextureCoord);
	gl_FragColor = vec4(mix(src.rgb, vec3(1.0), a), max(src.a, a));
}`,

	// 雨（背景向け）。amp=落下速度（既定 2）, freq=密度（弱雨 2 〜 豪雨 8+。曇天・雨幕・シア角も連動）,
	//	shift=雨脚の長さ。縦帯ハッシュの雨脚を奥/中/手前の 3 層＋風のシアで重ねる定番手法の再実装
	//	（特定コードの写しではない＝MIT 相当。y-up＝tick を「＋」で下へ流す）。
	//	2026-08-31 に旧・単層版から差し替え（freq で弱雨↔豪雨を切り替えられるように）
	rain: `${HEAD}
uniform float amp;
uniform float freq;
uniform float shift;
float hash(vec2 p) { return fract(sin(dot(p, vec2(41.3, 289.1))) * 43758.5453); }	// snow と同じ流儀
float rainLayer(vec2 uv, float density, float speed, float tail, float seed) {
	float aspect = resolution.x / max(resolution.y, 1.0);
	float cols = floor(18.0 + density * 10.0);
	float gx = uv.x * cols * aspect;
	float id = floor(gx);
	float lane = fract(gx) - 0.5;
	float h0 = hash(vec2(id, seed));
	float h1 = hash(vec2(id, seed + 7.0));
	float on = step(h0, clamp(0.08 + density * 0.06, 0.0, 0.9));	// 一部の帯だけ雨脚
	float segs = 1.5 + h1 * 2.5;
	float y = fract(uv.y * segs + tick * speed * (0.7 + h1) + h0 * 6.2831);	// y-up＝+tick で下へ
	float body = smoothstep(tail, 0.0, y) * smoothstep(0.0, 0.02, y);		// 先端が明・上へ尾
	float thin = smoothstep(0.5, 0.0, abs(lane) * (2.4 + density * 0.15));
	return on * body * thin * (0.4 + 0.6 * h0);
}
void main() {
	vec4 src = texture2D(uSampler, vTextureCoord);
	float heavy = clamp((freq - 2.0) / 6.0, 0.0, 1.0);	// 0=弱雨 … 1=豪雨（freq 2→8）
	float tail = clamp(0.05 + shift * 0.02, 0.06, 0.6);
	vec2 uv = vTextureCoord;
	uv.x += uv.y * mix(0.06, 0.16, heavy);				// 風のシア（豪雨ほど寝かせる）
	float r = rainLayer(uv, freq * 0.6, amp * 0.8, tail * 1.4, 11.0)		// 奥
		+ rainLayer(uv, freq, amp * 1.2, tail, 23.0)						// 中
		+ rainLayer(uv, freq * 0.5, amp * 1.7, tail * 0.7, 41.0) * mix(0.6, 1.1, heavy);	// 手前
	r = clamp(r, 0.0, 1.0);
	vec3 col = mix(src.rgb, src.rgb * 0.80, heavy);		// 曇天で暗く
	col += vec3(0.03, 0.04, 0.05) * heavy;				// うっすら雨幕
	col += vec3(0.80, 0.86, 1.0) * r * mix(0.5, 0.85, heavy);	// 雨脚のハイライト
	gl_FragColor = vec4(col, src.a);
}`,
};
