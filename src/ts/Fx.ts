/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2026-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

// [add_fx]/[clear_fx]/[wait_fx]/[pause_fx]/[resume_fx]：立ち絵・背景（grp レイヤ）へシェーダ
//	エフェクトを重ねる**分家独自機能**（2026-08-28 正式化）。ANIMATION_RESEARCH.md §7。
//	・対象指定（layer=/page=）は [add_filter] に、記述子スタック（aFx[]）も [add_filter] の aFlt に倣う
//	・fx= はプリセット名のみ。組み込み（wave|rgbShift|snow|rain|fireworks）か、[def_fx name= glsl=] で
//	  事前定義したユーザープリセット名。生 glsl= は [add_fx] では受けない（2026-08-31 に分離）。
//	  → セーブファイル（aFx）には fx 名しか載らず、GLSL 本体は起動スクリプトの [def_fx] 再実行で
//	    埋め直す運用（[add_face] と同じ思想。src/ts/fxRegistry.ts、ANIMATION_RESEARCH.md §7）
//	・基本画像（静止画・アニメ png シート・動画）＋ face 差分合成（aFace）を GrpLayer の
//	  makeFxSource() が 2D canvas へ合成してからシェーダへ通す（sheet/動画は毎フレーム）
//	・[add_fx loop=false]：花火の爆発のような「始まりと終わりがある単発」再生（2026-09-02）。
//	  tick は雨/雪と同じくラップしない生の経過秒のままなので（FxRunner.ts）、シェーダ自身が
//	  fract() 等で無限ループする代わりに time の経過とともに 1 回だけ変化して終わるよう書く。
//	  「何 ms で終わるか」は呼び出し側ではなく [def_fx duration=] でプリセット作者が宣言する
//	  （[tsy]/[trans] の time= は進行度そのものの分母だが、[add_fx] の time= は tick と無関係な
//	  外側からの締切なので、両者を一致させるにはどちらかを権威にする必要があり、シェーダの
//	  中身を知っているプリセット作者側に権威を置いた）。bldFx() が loop=false を
//	  「duration の値を time= として渡したのと同じ T_FX」へその場で解決するので、
//	  FxRunner.ts 以降は一切変更が要らない（＝time>0 の one-shot 経路をそのまま流用）
//
//	ここは DOM も WebGL も触らない純粋部分（本家 Filter.ts の bldFilter() と同じ役回り）。
//	エンジンから呼べるので fx 名・パラメータの書き間違いをその場で例外にできる。
//	GLSL 本体（プリセットのフラグメントシェーダ）と WebGL ランナーは lazy import の
//	src/ts/fxPresets.ts / src/ts/FxRunner.ts 側にあり、[add_fx] が使われるまで読まれない。
//
//	[def_fx glsl=] の契約は [trans glsl=]（TransGlsl.ts、本家サンプル glsl_slide 準拠）と名前を揃える
//	＝分家内で 1 回学べば両方書ける：
//	  uniform sampler2D uSampler      … 入力画像（前パスの結果 or 基本画像）
//	  varying vec2      vTextureCoord … 正規化 UV（0..1、y-up。※[trans] 側は y-down）
//	  uniform float     tick          … 経過秒 × speed=（0 起点）
//	  uniform vec2      resolution    … canvas 実ピクセルサイズ
//	  ＋ プリセット固有 uniform（amp/freq/shift。作者が uniform 宣言し [add_fx] で値を渡す）
//	[def_fx] は組み込みプリセットと同じく **HEAD（precision／上記共通 uniform／varying の宣言）を
//	FxRunner が前置する**（[trans glsl=] は自前で書くが、[def_fx] は「プリセット追加」なので統一）。
//	作者が書くのは main() と固有 uniform だけ（共通分を再宣言するとコンパイルエラー）。
//	Shadertoy（iTime/iChannel0…）は開発時に手変換（マッピングは docs/tag.html）。

// プリセット名。GLSL 実体は fxPresets.ts（lazy）が持つ。ここは名前の台帳だけ
export const A_FX_PRESET = ['wave', 'rgbShift', 'snow', 'rain', 'fireworks', 'blur', 'grayscale', 'sepia', 'negative', 'tint'] as const;

// プリセット固有パラメータの既定値（**属性の既定値は 1 箇所**：ここがエンジン入口）。
//	amp/freq/shift/p1 はプリセットごとに意味が違う（tag.html 参照）：
//	  wave  … amp=px 振幅 / freq=縦の波の本数
//	  rgbShift … shift=px ずらし量
//	  snow … amp=落下速度倍率 / freq=密度（層数）。背景（bg）レイヤ向け
//	  rain … amp=落下速度 / freq=密度（弱雨 2 〜 豪雨 8+。曇天・雨幕・シア角も連動）/ shift=雨脚の長さ
//	  fireworks … amp=明るさ / freq=頭（火の粉の親）の数（1.0＝32個・上限 1.4）/ p1=打ち上げ周期の速さ
//	              （0.25＝約4秒周期）/ p2=横位置（0=中央・±1=フレーム端）。color= で光の色（既定は橙金）。
//	              背景（bg）レイヤ向け。元は sn_gallery prj/add_fx/mat/ext_fx_tst.sn の [def_fx name=花火2]（冠菊）。MIT
//	  blur  … amp=最大ぼかし半径（px。CSS blur(Npx) と同義。既定 8）。初の「ランプ型」プリセット
//	          ＝time= の尺いっぱいかけて 元絵→ブラー（progress 0→1）に変化してそこで終わる。
//	          keep=true（blur の既定）で最終フレームのまま保持、reverse=true で ブラー→元絵。
//	  grayscale / sepia / negative … amp=最終的な効き（0..1。既定 1）。blur と同じランプ型（keep 既定 true）。
//	          元絵→モノクロ／セピア／色反転（reverse=true で戻る）。式は [add_filter] の同名フィルタと同じ
//	          （grayscale=Rec.601／sepia=CSS sepia(1)／negative=1-c）＝「fx で演出 → 落ち着いたら
//	          [add_filter] へ差し替えて [clear_fx]」が自然。1 タップだけ（追加コストほぼ 0）。
//	          ※ black_and_white は grayscale（既定 amp=1）と同一なので別 preset にしない。
//	  tint … amp=効き（0..1。既定 1）／color=色合い（未指定は 0x888888＝[add_filter] tint の既定）。
//	          元絵→チャンネル別乗算（c.rgb *= color）へ寄せるランプ型（keep 既定 true）。1 タップ。
//
//	p2（横位置）は px でなく**画面幅に対する割合**にした：FBO 解像度はレイヤ基本画像の naturalWidth/Height
//	（プロジェクトごとに違う／解像度 LOD で動きうる）で「画面のドット数」に安定した意味が無く、fireworks の
//	座標系自体が world/角度ベースで px の概念を持たない。割合なら同じ .sn がどのウィンドウ・背景素材でも
//	炸裂位置が「フレームに対して同じ場所」に来る（wave amp / rgbShift shift の px 指定は解像度で見た目量が
//	変わる脆さがあり、配置系では踏襲しない）。
const H_FX_DEF: {readonly [fx: string]: {readonly [k: string]: number}} = {
	wave		: {amp: 6, freq: 2},
	rgbShift	: {shift: 4},
	snow		: {amp: 1, freq: 3},
	rain		: {amp: 2, freq: 2, shift: 6},
	fireworks	: {amp: 1, freq: 1, p1: 0.25, p2: 0},
	blur		: {amp: 8},
	grayscale	: {amp: 1},
	sepia		: {amp: 1},
	negative	: {amp: 1},
	tint		: {amp: 1},
};

// 組み込みプリセットの「単発の尺」（[add_fx loop=false] が time= として解決する ms）。
//	[def_fx duration=] のユーザープリセット版に対応する組み込み版。ここに無いプリセット
//	（wave/rgbShift/snow/rain）へ loop=false を time= 無しで指定すると bldFx() が例外にする
const H_FX_BUILTIN_DURATION: {readonly [fx: string]: number} = {
	fireworks	: 4000,	// p1 未指定＝標準の約4秒周期（fxPresets.ts fireworks のコメント）
	blur		: 800,	// ぼかし込みの標準的な尺（time= 明示で上書き可）
	grayscale	: 800,	// blur と揃える（脱色フェードの標準的な尺）
	sepia		: 800,
	negative	: 800,
	tint		: 800,
};
// 組み込みプリセットの keep=（最終フレーム保持）の既定。ここに無ければ false（＝time= 経過で素通し）。
//	[def_fx] のユーザープリセットは [def_fx keep=]（T_DEF_FX_META.keep）で宣言する。
//	blur のようなランプ型は「変化しきった絵」を保つのが自然なので既定 true（keep=false 明示で解除）
const H_FX_BUILTIN_KEEP: {readonly [fx: string]: boolean} = {
	blur		: true,
	grayscale	: true,
	sepia		: true,
	negative	: true,
	tint		: true,
};
// プリセットが読むスカラパラメータ名（この範囲だけ args から拾う）。
//	amp/freq/shift … 組み込みプリセットが意味を持って使う（tag.html 参照）
//	p1〜p4 … [def_fx] 作者向けの汎用入力ポート（意味は作者が決める。未指定は 0）
//	増やすときはここへ 1 語足すだけ（FxRunner.ts は A_FX_PARAM を import して総なめする）
export const A_FX_PARAM = ['amp', 'freq', 'shift', 'p1', 'p2', 'p3', 'p4'] as const;

// color= を uniform vec3 color（0..1 RGB）へ。'#rrggbb' / '0xrrggbb' / 'r,g,b'（各 0..1）を受ける
function parseRGB(v: string): readonly [number, number, number] {
	const s = v.trim();
	if (s.includes(',')) {
		const a = s.split(',').map(t=> Number(t.trim()));
		if (a.length === 3 && a.every(n=> Number.isFinite(n))) {
			return [a[0]!, a[1]!, a[2]!].map(n=> Math.min(1, Math.max(0, n))) as unknown as [number, number, number];
		}
		throw `[add_fx] color= の値が不正です：${v}`;
	}
	const hex = s.startsWith('#') ? s.slice(1) : s.startsWith('0x') ? s.slice(2) : s;
	const n = parseInt(hex, 16);
	if (hex.length !== 6 || ! Number.isFinite(n)) throw `[add_fx] color= の値が不正です：${v}`;
	return [(n >> 16 & 255) / 255, (n >> 8 & 255) / 255, (n & 255) / 255];
}

// エフェクト記述子 1 件。plain data だけ（structuredClone／JSON 化を通すため。aFlt と同じ）
//	loop=false（単発再生）は T_FX に専用フィールドを持たない：bldFx() がスクリプト解析時点で
//	「[def_fx duration=] の宣言値」を time へ解決してしまうので、ここから先（FxRunner.ts・
//	セーブファイル）は「time>0 の one-shot」と完全に同じ扱いで済む（下記 bldFx() 参照）
export type T_FX = {
	name	: string;	// そのレイヤの aFx 内で一意な識別子。''＝無名で、store の chgFx が
						//	`#fxN`（レイヤスコープ採番）を振る。#fxN はシナリオから書けない＝[clear_fx name=]
						//	では実質狙えず、layer= 単位のクリアでのみ落ちる
	fx		: string;	// プリセット名（組み込み A_FX_PRESET か [def_fx] で定義したユーザー名）。
						//	GLSL 本体は焼かない＝[save] には fx 名しか載らない（fxRegistry.ts）
	time	: number;	// ms。0 で無限（常時ゆらぎ）。>0 で time 経過後は素通し（試作では記述子の自動撤去はしない）
	speed	: number;	// 速度倍率
	enabled	: boolean;	// [pause_fx]/[resume_fx]。false でそのパスの rAF を止める（記述子は残す。tick は凍結）
	params	: {[k: string]: number};	// スカラ入力ポート（amp/freq/shift/p1〜p4。A_FX_PARAM の範囲）
	color?	: readonly [number, number, number];	// color=（uniform vec3 color。0..1 RGB）。未指定は uniform へ vec3(0)
	// [def_fx pad=]／[def_fx pad_b=]（基本画像**高さ**に対する比率）。fx キャンバスを
	//	naturalW/H の外側へ広げ、立ち絵レイヤをそのまま（別レイヤや余白 png 無しで）
	//	画像の枠外までシェーダ出力できるようにする（オーラ等）。上左右は pad、下端は padB。
	//	宣言が 0／未宣言なら持たない（既存 fx の T_FX 形を変えない＝color と同じ流儀）。
	//	GrpLayer.makeFxSource() が px へ換算し、はみ出し分は div0 の外へ絶対配置で描く
	//	（div0 の箱は基本画像サイズのまま＝[tsy]／Moveable のピボットは不変）
	pad?	: number;
	padB?	: number;
	// [add_fx reverse=true]：ランプ型プリセットの progress を 1→0 で流す（ブラー→元絵 等）。
	//	反転は FxRunner が progress を作るとき 1 箇所で行う＝各シェーダは素直に progress 0→1 で書けばよい
	reverse?: true;
	// [add_fx keep=true]：time= 経過後に素通し（＝元絵）へ切り替えず、最終フレームのまま凍結する
	//	（rAF は従来どおり止まるので保持中の GPU コストは 0）。blur は既定 true（H_FX_BUILTIN_KEEP）
	keep?	: true;
	// one-shot が自然経過したことの記録（ScriptMng.#endFxTimer が chgFx mode:'done' で焼く）。
	//	[save] に載り、[load] で復元された記述子は「セットアップ直後から経過済み」扱いになる
	//	＝keep なら即・最終フレーム、非 keep なら即・素通し（ロードで頭から再生し直さない）。
	//	新規 [add_fx]（同ページのタグ再実行）は bldFx が絶対に付けない＝常に頭から
	done?	: true;
};

// [def_fx] 宣言メタ（ScriptEngine.#hDefFx の値）。duration＝loop=false の尺（ms）、
//	pad／padB＝上記 T_FX.pad／padB のもと値、keep＝上記 T_FX.keep の既定。
//	テスト等が数値だけ渡す旧形（＝duration）も受ける
export type T_DEF_FX_META = {duration?: number; pad?: number; padB?: number; keep?: boolean};
function metaOf(v: number | T_DEF_FX_META | undefined): T_DEF_FX_META {
	return typeof v === 'number' ? {duration: v} : v ?? {};
}

function num(args: {[k: string]: string}, k: string, def: number): number {
	const v = args[k];
	if (v === undefined) return def;
	const n = Number(v);
	if (! Number.isFinite(n)) throw `[add_fx] ${k} の値が不正です：${v}`;
	return n;
}

// hDefFx＝[def_fx] で定義済みのユーザープリセット名の台帳（ScriptEngine.#hDefFx）。
//	値は [def_fx duration=]（ms。未指定は0＝単発の尺を持たないプリセット）。
//	純粋部分なので Map でなく「キーの有無＋値」だけ見る緩い型で受ける（テストからは省略可）
export function bldFx(args: {[k: string]: string}, hDefFx?: {readonly [name: string]: number | T_DEF_FX_META}): T_FX {
	const fx = args.fx ?? '';
	if (! fx) throw '[add_fx] fx=（プリセット名）が必要です';
	if (! (A_FX_PRESET as readonly string[]).includes(fx) && ! (hDefFx && fx in hDefFx)) {
		throw `[add_fx] fx【${fx}】は未対応です（組み込み：${A_FX_PRESET.join(' / ')}／または [def_fx] で定義した名前）`;
	}
	const meta = metaOf(hDefFx?.[fx]);

	// ユーザープリセット（[def_fx]）は固有既定値を持たない（H_FX_DEF[それ] は undefined ＝ params は {}）
	const params: {[k: string]: number} = {...H_FX_DEF[fx]};
	for (const k of A_FX_PARAM) if (args[k] !== undefined) params[k] = num(args, k, 0);

	// loop=false（単発再生）：宣言済みの尺を time へ解決する。組み込みは H_FX_BUILTIN_DURATION、
	//	[def_fx] のユーザープリセットは [def_fx duration=]（hDefFx）。
	//	time= が明示されていればそちらが勝つ（個別上書き）。[tsy]/[trans] の time=（アニメの尺
	//	そのもの＝進行度の分母）と違い、[add_fx] の time は tick とは無関係な外側からの締切
	//	（FxRunner.ts 参照）なので、「シェーダの1サイクルの長さ」と「締切」を一致させるには
	//	どちらか一方を権威にする必要がある＝ここでは尺の宣言側を権威にする。
	//	尺を持たないプリセット（組み込み wave/rgbShift/snow/rain、duration 未宣言の [def_fx]）へ
	//	loop=false だけ（time= を伴わず）指定するとその場でエラーにする（書き間違いをその場で例外にする方針）
	const loop = (args.loop ?? 'true') !== 'false';
	let time = num(args, 'time', 0);
	if (! loop && time <= 0) {
		const duration = H_FX_BUILTIN_DURATION[fx] ?? meta.duration;
		if (! duration) throw `[add_fx] loop=false を使うには [def_fx name=${fx} duration=…]（ms）の宣言が必要です`;
		time = duration;
	}

	// reverse=（ランプ型の progress を 1→0 で流す）／keep=（time= 経過後も最終フレームを保持）。
	//	keep の既定は組み込み表（H_FX_BUILTIN_KEEP）→ [def_fx keep=]（meta.keep）→ false の順。
	//	どちらも真のときだけ T_FX にキーを載せる（color/pad と同じ流儀＝既存 fx の形を変えない）
	const reverse = (args.reverse ?? 'false') !== 'false';
	const keep = (args.keep ?? String(H_FX_BUILTIN_KEEP[fx] ?? meta.keep ?? false)) !== 'false';

	return {
		name	: args.name ?? '',
		fx,
		time,
		speed	: num(args, 'speed', 1),
		enabled	: (args.enabled ?? 'true') !== 'false',	// [add_fx enabled=false] で止まった状態から始めることも一応可
		params,
		...(args.color !== undefined ? {color: parseRGB(args.color)} : {}),
		// [def_fx pad=／pad_b=] 宣言ぶんの余白（基本画像高さ比）。0／未宣言は持たない
		...(meta.pad ? {pad: meta.pad} : {}),
		...(meta.padB ? {padB: meta.padB} : {}),
		...(reverse ? {reverse: true as const} : {}),
		...(keep ? {keep: true as const} : {}),
	};
}
