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

// ---- 負荷メモ（1 パス＝フルスクリーンクワッド。実効ワーク W ≒ FBO 画素数 × 下記の1画素コスト） ----
//	FBO 画素数はレイヤの基本画像の naturalWidth×naturalHeight（FxRunner。ウィンドウ幅でも DPR でもない）。
//	計測は各自の環境で：EXT_disjoint_timer_query（draw を挟んで GPU ナノ秒）／DevTools > Performance の
//	GPU トラック／fx on-off の rAF 間隔差。詳しい量りかたは sn_gallery ext_fx_tst.sn の「負荷」節。
//	  wave      … tex 1 + sin 1。ほぼ下限。amp/resolution.x の div 1 が per-fragment だが誤差。
//	  rgbShift  … tex 3（色収差の芯コスト＝これ以上削れない）+ sin 1。sin(tick*…) はフレーム定数だが
//	              GLSL からは畳めない（JS 側 uniform 化は FxRunner に非 A_FX_PARAM uniform を通す配線が
//	              要る＝tex 3 に対して割に合わず見送り）。
//	  snow      … 層数 × snowLayer（1 層 ≒ sin 3 + length 1 + smoothstep 3）。**層数 = ceil(freq)、1〜7**。
//	              freq を超える層は snowLayer を呼ばない（下記 main。uniform 分岐＝ワープ分岐なし）。
//	  rain      … 3 層固定 × rainLayer（1 層 ≒ hash 3〈=sin 3〉 + smoothstep 3 + step 1）。freq は層数に
//	              効かず密度のみ＝雨は freq を下げても軽くならない（構造上の下限。層を可変にすると
//	              近/中/遠の重なりが崩れるので固定のまま）。
//	  fireworks … resolution LOD 内蔵（広いほど頭・火の粉を減らして粒を大きく）。詳細は下の block と
//	              ext_fx_tst.sn。エンジン側で FBO 解像度を上限クランプする案は、生成系（snow/rain/
//	              fireworks）に限れば有効だが「ウィンドウ超の背景画像を置いた時だけ効く」狭い最適化で、
//	              per-preset テーブル＋全パス opt-in＋snapshot 低解像度化の常時コストに見合わず見送り
//	              （2026-09-03 検討）。実際に 4K 背景で 60fps 割れの報告が出たら H_FX_MAX_MPX 方式で後付け。

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

	// 元シェーダは未初期化 p を右辺（s + p + scale）で参照＝実質 s + scale。ここは明示。
	vec2 p = 0.5 + 0.35 * sin(11.0 * fract(sin((s + scale) * mat2(7, 3, 6, 5)) * 5.0)) - f;
	// 旧版の k = min(length(p), 3.0) の 3.0 クランプは、p 各成分が [0.15,0.85]-f ∈ (-0.85,0.85]
	//	＝ length(p) ≤ 1.2 で常に効かない死にコード。外した（層数ぶんの min を節約）。
	float k = smoothstep(0.0, length(p), sin(f.x + f.y) * 0.01);
	return k * w;
}
void main() {
	vec2 uv = (gl_FragCoord.xy * 2.0 - resolution.xy) / min(resolution.x, resolution.y);

	// 手前（小さい scale・強い）から freq 個ぶんの層を積む。**freq を超える層は snowLayer を
	//	呼ばない**：freq は uniform ＝全フラグメント同一分岐でワープ分岐が無く丸ごと省ける。
	//	旧版は 7 層を常に計算してから 0 を掛けて捨てていた（freq=3〈既定〉でも 7 層ぶん回っていた）。
	//	freq=3 で 4/7、freq=1 で 1/7 の実効ワークに。端数の層はフェード（min(n-i, 1.0)）。
	float n = clamp(freq, 0.0, 7.0);
	float acc = 0.0;
	if (n > 0.0) acc += snowLayer(uv,  5.0)       * min(n,       1.0);
	if (n > 1.0) acc += snowLayer(uv,  6.0)       * min(n - 1.0, 1.0);
	if (n > 2.0) acc += snowLayer(uv,  8.0)       * min(n - 2.0, 1.0);
	if (n > 3.0) acc += snowLayer(uv, 10.0)       * min(n - 3.0, 1.0);
	if (n > 4.0) acc += snowLayer(uv, 15.0) * 0.8 * min(n - 4.0, 1.0);
	if (n > 5.0) acc += snowLayer(uv, 20.0) * 0.5 * min(n - 5.0, 1.0);
	if (n > 6.0) acc += snowLayer(uv, 30.0) * 0.3 * min(n - 6.0, 1.0);

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
// aspect は 3 層で共通なので呼び出し側で 1 回だけ出して渡す（層内で毎回 div するのをやめた）
float rainLayer(vec2 uv, float aspect, float density, float speed, float tail, float seed) {
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
	float aspect = resolution.x / max(resolution.y, 1.0);
	vec2 uv = vTextureCoord;
	uv.x += uv.y * mix(0.06, 0.16, heavy);				// 風のシア（豪雨ほど寝かせる）
	float r = rainLayer(uv, aspect, freq * 0.6, amp * 0.8, tail * 1.4, 11.0)		// 奥
		+ rainLayer(uv, aspect, freq, amp * 1.2, tail, 23.0)						// 中
		+ rainLayer(uv, aspect, freq * 0.5, amp * 1.7, tail * 0.7, 41.0) * mix(0.6, 1.1, heavy);	// 手前
	r = clamp(r, 0.0, 1.0);
	vec3 col = mix(src.rgb, src.rgb * 0.80, heavy);		// 曇天で暗く
	col += vec3(0.03, 0.04, 0.05) * heavy;				// うっすら雨幕
	col += vec3(0.80, 0.86, 1.0) * r * mix(0.5, 0.85, heavy);	// 雨脚のハイライト
	gl_FragColor = vec4(col, src.a);
}`,

	// 冠菊（かむろ）花火。全部の頭（●）が同時に飛び出し、寿命を等分した固定時刻ごとに、その瞬間の
	//	頭の位置へ火の粉（∴）を落とす。火の粉は落とした場所に置いて行かれ、軽い重力でゆっくり沈み
	//	各自の寿命で橙→赤へ冷えて消える。amp=明るさ / freq=頭の数（1.0＝32個・上限 1.4）/ p1=打ち上げ
	//	周期の速さ（0.25＝約4秒周期）/ color=光の色（既定は橙金）。loop=false は約4秒で1発ぶん
	//	（Fx.ts H_FX_BUILTIN_DURATION）。背景（bg。不透明）レイヤ向け＝base へ加算合成。
	//	元は sn_gallery prj/add_fx/mat/ext_fx_tst.sn の [def_fx name=花火2]（MIT）。参考にした
	//	公開シェーダ https://www.shadertoy.com/view/tfXSWr（物理の下敷きのみ。コードの写しではない）。
	//	resolution が広いほど頭・火の粉を段階的に減らして粒を大きく明るくする解像度 LOD 入り。
	fireworks: `${HEAD}
uniform float amp;		// 明るさ（未指定=0→標準1.0）
uniform float freq;		// 頭（＝火の粉を撒く親）の数（未指定=0→標準1.0＝32個。上限44個）
uniform float p1;		// 広がり＝落下＝周期の速さ（未指定=0→標準0.25＝約4秒周期）。
						//	"speed"はエンジン予約語（tick倍率。docs/tag.html [add_fx]）なのでここでは使わない
uniform vec3  color;	// 光の色づけ（未指定=vec3(0)→既定の橙金）

const int MAX_STARS = 44;	// 頭の上限（火の粉の落下地点18×2粒と掛けて最大 44×(2+36) ループ＝アンロール量の頭打ち）
const int EMBER_N   = 18;	// 頭が寿命の間に火の粉を落とす回数（1回につき2粒。等分＝1/EMBER_N life ごと）

// --- ハッシュ乱数（rain_window.sn と同じ流儀。mediump 前提。テクスチャ不要） ---
vec3  h13(float p) {
	// 枝ごと・ノードごとの疑似乱数（元シェーダの iChannel1 の1テクセル分に相当）
	vec3 p3 = fract(vec3(p) * vec3(0.1031, 0.1030, 0.0973));
	p3 += dot(p3, p3.yzx + 33.33);
	return fract((p3.xxy + p3.yzz) * p3.zyx);
}

// 角度→角距離² を mediump でも精度よく出す小道具。d も dir も単位ベクトルなので
//	|d - dir|² = 2(1 - cosθ) ≒ θ²。1 - ct*ct 方式のような ct≈1 での桁落ちが無い。
float ang2(vec3 o, vec3 d, vec3 c) {
	vec3 e = d - normalize(c - o);
	return dot(e, e);
}

// 頭＝燃える先端。芯＋ゆるいハロー（逆二乗グロー）。ハローは残像に見えない程度に絞る。
float headGlow(vec3 o, vec3 d, float s, vec3 c) {
	return s / max(ang2(o, d, c), 3.5e-4);
}

// 火の粉／頭の1粒。放物線の緊密サポート（exp を使わない＝安い。外側は完全に0＝ヘイズが溜まらない）。
//	tight ＝ 1/サポート半径²。大きいほど小さいドット。
float mote(vec3 o, vec3 d, float s, vec3 c, float tight) {
	float q = 1.0 - min(ang2(o, d, c) * tight, 4.0);
	return q <= 0.0 ? 0.0 : s * q * q;
}

// 頭（燃える先端）の、炸裂からの経過 tau（0..1）における位置。
//	点ごとの乱数ベクトル v で放射状に飛び（pop で一気に開く）、あとは重力で落ちる。重い＝速く落ちる。
//	exp／pow は使わず有理式＋放物線で近似（1粒＋火の粉18〜36回/頭 呼ばれるので効く）。
vec3 headPos(vec3 bc, vec3 v, float tau, vec3 r) {
	float x    = max(tau, 0.0);
	float pop  = x / (x + 0.05);								// 一瞬で開く（1-exp の代用・div 1回）
	float rad  = pop * 0.58 * (0.70 + r.x * 0.6);			// 頭ごとに到達半径をばらす
	float fall = x * x * (0.65 + r.z * 1.0);					// 重力＝放物線（pow を排除・落下速度をばらす）
	return bc + v * rad - vec3(0.0, fall, 0.0);
}

// 花火本体。全部の頭（●）が同時に飛び出し、寿命を EMBER_N 等分した固定時刻ごとに、
//	その瞬間の頭の位置へ火の粉（∴∴）を落とす。火の粉の産まれ時刻 tb は life に一切依存しない
//	＝落とした場所に本当に置いて行かれ、頭より“ずっと軽い重力”でゆっくり沈み、各自の寿命で冷えて消える。
vec3 starField(vec3 o, vec3 d, float t, float dens, float spd) {
	float phase = t * spd;
	float life  = fract(phase);					// 0→1 で1発ぶんの寿命
	float seed  = floor(phase);					// 何発目か（発ごとに乱数を変える種）

	// --- 解像度 LOD：背景画像（＝この GLSL の resolution）が広いほど品を落として粒を大きく・明るく ---
	//	実効ワーク ≒ resolution画素数 × nHeads × emberPts × (two?2:1)。ここを一定予算に寄せる。
	float mpx  = (resolution.x * 0.001) * (resolution.y * 0.001);	// メガピクセル（x*y は mediump 桁溢れするので 0.001 ずつ）
	float lod  = clamp((mpx - 0.5) / 3.0, 0.0, 1.0);				// 0.5Mpx(≈XGA)→0 … 3.5Mpx(≈WQHD超)→1
	int   nLod = int(mix(32.0, 12.0, lod) * dens);				// 頭の数
	int   eLod = int(mix(18.0,  8.0, lod));						// 火の粉の落下地点の数
	bool  two  = lod < 0.5;										// 1地点あたり 2粒→1粒
	float gain = mix(1.0, 3.4, lod);							// 減らした分は明るく
	float tK   = mix(1.0, 0.42, lod);							// tight を下げる＝粒を大きく（総発光量を保つ）

	int   n         = int(clamp(float(nLod), 8.0, float(MAX_STARS)));
	float dt        = 1.0 / float(EMBER_N);				// 火の粉を落とす間隔（寿命全体を EMBER_N 等分）
	float emberLife = 0.62;							// 火の粉が産まれてから冷え切るまで（life 単位＝長寿命）
	float GSPARK    = 0.20;							// 火の粉の重力（頭の 0.6〜1.55 よりずっと軽い）
	float lifeFade  = 1.0 - smoothstep(0.66, 1.0, life);	// 発全体の終わりで消える（余韻の締め）
	float burstFl   = max(0.0, 1.0 - life * 22.0);		// 炸裂の一瞬だけの中心閃光（exp の代用）
	vec3  bc = vec3(0.0, 0.30, 0.0);					// 炸裂点（画面やや上）

	vec3 sum = vec3(0.0);
	for (int i = 0; i < MAX_STARS; i++) {
		if (i >= n) break;
		vec3  r  = h13(float(i) + seed * 1.37);
		vec3  v  = normalize(r * 2.0 - 1.0);
		float br = 0.55 + 0.9 * r.y;						// 頭ごとの明るさばらつき

		// --- 頭（●）＝現在位置。火の粉より大きく明るい粒 ---
		vec3  hp = headPos(bc, v, life, r);
		float hw = 0.6 + 0.4 * sin(t * 14.0 + r.x * 40.0);	// 頭もちらつく
		sum += mote(o, d, 0.9 * br * hw * lifeFade * mix(1.0, 1.6, lod), hp, 6000.0 * tK) * vec3(1.2, 1.05, 0.72);
		sum += headGlow(o, d, 3.0e-6 * br * lifeFade, hp) * vec3(1.15, 1.0, 0.6);	// ごく淡い芯グロー

		// --- 火の粉（∴）＝固定時刻 tb に落とした細かいドット。tb は life 非依存＝置いて行かれる ---
		for (int j = 0; j < EMBER_N; j++) {
			if (j >= eLod) break;
			vec3  hh  = h13(float(i) * 2.3 + float(j) * 7.9 + seed * 3.0);
			float tb  = (float(j) + 0.15 + hh.z * 0.7) * dt;	// 産まれた固定時刻（life では動かない）
			if (tb > life) break;							// まだ落としていない
			float age = life - tb;							// 産まれてからの経過（増える一方・リセットしない）
			float el  = age / emberLife;					// 0=産まれたて 1=冷え切り
			if (el > 1.0) continue;							// この地点は消えた（後続はまだ生きている）

			vec3  E    = headPos(bc, v, tb, r);				// 落とした場所（固定）＝ここに取り残される
			float sink = GSPARK * age * age + 0.05 * age;	// 火の粉自身の弾道（頭よりずっと緩い落下）
			vec3  base = E - vec3(0.0, sink, 0.0);

			vec3  hh2 = fract(hh * vec3(13.13, 7.77, 19.31) + 0.317);
			vec2  twf = vec2(fract(hh.x * 19.0), fract(hh2.y * 11.0));
			vec2  sn  = 0.5 + 0.5 * sin(t * 36.0 + twf * 100.0);
			vec2  twk = 0.2 + 0.8 * sn * sn;					// 細かい明滅（pow を排除）
			float fb  = (1.0 - el) * (1.0 - el) * lifeFade * 0.22 * br * gain;	// 寿命いっぱいで減光
			float tight = mix(34000.0, 64000.0, el) * tK;	// ピンポイント（LOD で緩める）
			vec3  col   = mix(vec3(1.1, 0.85, 0.4), vec3(0.8, 0.25, 0.06), el);	// 橙→赤へ冷える
			float sp = 0.02 + 0.10 * age;					// 落ちてから少しずつ散る
			sum += mote(o, d, fb * twk.x, base + (hh  - 0.5) * sp, tight) * col;
			if (two) sum += mote(o, d, fb * twk.y, base + (hh2 - 0.5) * sp, tight) * col;
		}
	}

	// 炸裂の中心閃光（全体を一瞬フラッシュ）
	sum += vec3(headGlow(o, d, 1.6e-5 * burstFl, bc)) * vec3(1.2, 1.1, 0.9);
	return sum;
}

void main() {
	vec2 uv = vTextureCoord;
	vec4 base = texture2D(uSampler, uv);

	float bright = amp == 0.0 ? 1.0 : amp;
	float dens   = freq <= 0.0 ? 1.0 : freq;
	float spd    = p1   <= 0.0 ? 0.25 : p1;
	vec3  tint   = dot(color, color) > 0.0001 ? color : vec3(1.25, 1.05, 0.55);	// 既定は橙金

	vec3 o = vec3(0.0, -0.3, -2.0);
	vec2 fragPx = uv * resolution;
	vec3 d = normalize(vec3(fragPx * 2.0 - resolution.xy, resolution.y * 2.0));

	vec3 g = starField(o, d, tick, dens, spd) * bright;
	vec3 glow = sqrt(clamp(g * tint, 0.0, 4.0));	// ガンマ補正（≒2.0。pow(x,1/2.2) の代用で sqrt 1回）

	// 背景透過：既存レイヤ（base）に加算合成。アルファは背景のものをそのまま使う
	gl_FragColor = vec4(clamp(base.rgb + glow, 0.0, 1.0), base.a);
}`,
};
