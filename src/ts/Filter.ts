/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2026-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import {uint} from '../sn/CmnLib';
import {argBlendmode} from './Blendmode';

// フィルター（[add_filter]/[clear_filter]/[enable_filter]・[lay filter=…]）のうち、
//	DOMを触らない部分。本家 Layer.ts:101 bldFilters() ＋ hBldFilter に対応する。
//	エンジンから呼べるようにここへ分けてある（filter名の書き間違いをその場で例外にできる）。
//
//	**ここが表示アーキテクチャ変更の影響を一番受けている場所**。本家のフィルターは
//	pixiのBlurFilter/NoiseFilter/ColorMatrixFilterで、22種のうち大半はColorMatrixFilterの
//	プリセット（browni・kodachrome・lsd…）だが、bluesnovelはDOM＝CSSのfilterプロパティなので
//	素で書けるのはCSSにある関数のうち**pixiと数式が一致するもの**（blur/brightness/
//	black_and_white/negative/sepia。既定値だけでなく式そのものが同じかを個別に確認済み）。
//	**hue/contrast/grayscaleはCSSの同名関数とパラメータの意味が違う**（後述）ため、
//	他のプリセットと同じくSVGの`feColorMatrix`へ回す。
//	pixiと同じ5x4行列をSVGの`feColorMatrix`へ流し込めば同じ絵が出せる
//	（pixiの`m[0..19]`とSVGの`values`は**並びが同じ**＝そのまま写せる）。
//	`<filter>`要素そのものはStage.tsxが出す（DOMを触るのはあちらの仕事）。
//
//	hue/contrast/grayscaleをCSSの同名関数に**素で渡してはいけない**理由（2026-08-10、本家
//	galleryとの実機比較で発覚）：
//	・`contrast`：pixiは`v=amount+1`（既定`amount=0.5`→1.5倍・強調方向）。CSSの`contrast()`は
//	  引数がそのまま強度倍率（既定0.5→0.5倍・減衰方向）で**正反対の効き**になる
//	・`grayscale`：pixiの`greyscale(scale)`は`(R+G+B)*scale`を全チャンネルへ書く行列＝常に
//	  完全な無彩色になる。CSSの`grayscale(scale)`は元色とグレースケールをscale比率でブレンド
//	  するだけで色が残る。**別のパラメータ**として扱われている
//	・`hue`：数式自体（回転行列の重み）が違ったうえ、**属性名も違った**（本家は`f_rotation`、
//	  こちらは`rotation`を見ていたため本家シナリオの指定が黙って無視されていた）
//
//	pixi側との相違が2つ:
//	・**`multiply`属性は無視する**。pixiでは「今の行列に掛ける」意味だが、こちらはフィルターを
//	  CSSのfilterプロパティに並べる＝前の結果に順に掛かるので、掛け合わせは並べた時点で起きている
//	・pixiは**`multiply=true`のときだけ**オフセット列を255で割る（`_colorMatrix()`）。
//	  つまり同じプリセットでもmultiplyの指定で明るさが変わる。こちらは行列を最初から
//	  SVGの流儀（オフセットは0〜1）で書き、その揺れを持ち込まない

//	blur_x/blur_yも同じ理由でSVG行き：CSSの`blur()`は半径1つしか持てないが、SVGの
//	`feGaussianBlur`は`stdDeviation="X Y"`でXY別々に持てるので、指定があるときだけそちらへ回す
//	（本家Layer.ts:122-123は常にblur_x/blur_y＝既定2でblurX/blurYを上書きするので、
//	strengthは事実上見た目に効かない。ここは互換性のため無指定時のみ従来のstrength=半径のままにする）

// フィルター1件。CSSのfilterプロパティに並べる1つぶんと、[enable_filter]用の有効フラグ。
//	matがあるものはSVGのfeColorMatrix行き、blurXYがあるものはSVGのfeGaussianBlur行きで、
//	どちらもcssは`url(#…)`になる。blendmodeは[add_filter blendmode=]（Lay.tsがレイヤの
//	mix-blend-modeへ合流させる。CSSは要素につき1つしか持てないため、フィルター単位の合成は
//	表現できない）
export type T_FLT = {css: string; enabled: boolean; blendmode?: string; mat?: number[]; blurXY?: readonly [number, number]};

// 数値属性（本家 argChk_Num 相当。ここは省略値ありのみ）
function num(args: {[k: string]: string}, nm: string, def: number): number {
	const v = args[nm];
	if (v === undefined) return def;

	const n = v.startsWith('0x') ? parseInt(v.slice(2), 16) : Number(v);
	if (! Number.isFinite(n)) throw `[add_filter] ${nm}の値が不正です：${v}`;
	return n;
}
// 0xRRGGBB → 0..1 の [r,g,b]（feColorMatrix の対角・行に置く）
const rgb01 = (n: number): [number, number, number]=> [(n >> 16 & 0xFF) / 255, (n >> 8 & 0xFF) / 255, (n & 0xFF) / 255];

// filter名 -> CSSのfilter関数。既定値は本家（Layer.ts hBldFilter）に合わせてある
const H_BLD: {[nm: string]: (args: {[k: string]: string})=> string} = {
	// blur_x/blur_yが指定された場合はbldFilter()側でSVGのfeGaussianBlurへ回す（この関数は
	//	無指定時のみ通る）。strength（本家の既定8）をそのまま半径pxとして使う
	blur			: a=> `blur(${String(num(a, 'strength', 8))}px)`,
	brightness		: a=> `brightness(${String(num(a, 'b', 0.5))})`,
	black_and_white	: ()=> 'grayscale(1)',
	negative		: ()=> 'invert(1)',
	// pixiのsaturate(amount)は「1を基準にamountぶん増やす」。CSSも1が等倍なので足して渡す
	saturate		: a=> `saturate(${String(1 + num(a, 'amount', 0.5))})`,
	sepia			: ()=> 'sepia(1)',
};

// 本家にはあるがまだ対応できないもの。名前を知らないのか未対応なのかを区別して知らせる
const A_FLT_NOT_YET = ['noise'];

// 色成分の5x4行列（pixi ColorMatrixFilter のプリセット。数値は pixi 6.5.10 の
//	@pixi/filter-color-matrix から写した）。**オフセット列（5列目）は0〜1に揃えてある**
//	＝pixiが0〜255で書いているもの（technicolor/kodachrome/browni/vintage）は255で割った値
const H_MAT: {[nm: string]: (args: {[k: string]: string})=> number[]} = {
	// グレースケール。CSSの同名関数とは意味が違う（ファイル冒頭コメント参照）。
	//	本家の属性名・既定値どおり scale
	grayscale	: a=> {
		const s = num(a, 'scale', 0.5);
		return [
			s, s, s, 0, 0,
			s, s, s, 0, 0,
			s, s, s, 0, 0,
			0, 0, 0, 1, 0];
	},
	// コントラスト。CSSの同名関数とは意味が違う（ファイル冒頭コメント参照）。
	//	本家の属性名・既定値どおり amount
	contrast	: a=> {
		const v = num(a, 'amount', 0.5) + 1;
		const o = -0.5 * (v - 1);
		return [
			v, 0, 0, 0, o,
			0, v, 0, 0, o,
			0, 0, v, 0, o,
			0, 0, 0, 1, 0];
	},
	// 色相回転。属性名は本家どおり f_rotation（度単位、既定90＝0だと変化が分かりづらいため）。
	//	pixiの近似行列（重み1/3のRGBキューブ回転）をそのまま組む
	hue			: a=> {
		const rot = num(a, 'f_rotation', 90) / 180 * Math.PI;
		const cosR = Math.cos(rot), sinR = Math.sin(rot);
		const w = 1 / 3, sqrW = Math.sqrt(w);
		const a00 = cosR + (1 - cosR) * w;
		const a01 = w * (1 - cosR) - sqrW * sinR;
		const a02 = w * (1 - cosR) + sqrW * sinR;
		const a10 = w * (1 - cosR) + sqrW * sinR;
		const a11 = cosR + w * (1 - cosR);
		const a12 = w * (1 - cosR) - sqrW * sinR;
		const a20 = w * (1 - cosR) - sqrW * sinR;
		const a21 = w * (1 - cosR) + sqrW * sinR;
		const a22 = cosR + w * (1 - cosR);
		return [
			a00, a01, a02, 0, 0,
			a10, a11, a12, 0, 0,
			a20, a21, a22, 0, 0,
			0, 0, 0, 1, 0];
	},
	// 赤→青・青→赤
	to_bgr		: ()=> [
		0, 0, 1, 0, 0,
		0, 1, 0, 0, 0,
		1, 0, 0, 0, 0,
		0, 0, 0, 1, 0],
	// LSD効果
	lsd			: ()=> [
		2, -0.4, 0.5, 0, 0,
		-0.5, 2, -0.4, 0, 0,
		-0.4, -0.5, 3, 0, 0,
		0, 0, 0, 1, 0],
	// ポラロイド
	polaroid	: ()=> [
		1.438, -0.062, -0.062, 0, 0,
		-0.122, 1.378, -0.122, 0, 0,
		-0.016, -0.016, 1.483, 0, 0,
		0, 0, 0, 1, 0],
	// テクニカラー（1916年のカラー動画プロセス）
	technicolor	: ()=> [
		1.9125277891456083, -0.8545344976951645, -0.09155508482755585, 0, 11.793603434377337 / 255,
		-0.3087833385928097, 1.7658908555458428, -0.10601743074722245, 0, -70.35205161461398 / 255,
		-0.231103377548616, -0.7501899197440212, 1.847597816108189, 0, 30.950940869491138 / 255,
		0, 0, 0, 1, 0],
	// コダクローム（1935年のカラーリバーサルフィルム）
	kodachrome	: ()=> [
		1.1285582396593525, -0.3967382283601348, -0.03992559172921793, 0, 63.72958762196502 / 255,
		-0.16404339962244616, 1.0835251566291304, -0.05498805115633132, 0, 24.732407896706203 / 255,
		-0.16786010706155763, -0.5603416277695248, 1.6014850761964943, 0, 35.62982807460946 / 255,
		0, 0, 0, 1, 0],
	// ブラウニー
	browni		: ()=> [
		0.5997023498159715, 0.34553243048391263, -0.2708298674538042, 0, 47.43192855600873 / 255,
		-0.037703249837783157, 0.8609577587992641, 0.15059552388459913, 0, -36.96841498319127 / 255,
		0.24113635128153335, -0.07441037908422492, 0.44972182064877153, 0, -7.562075277591283 / 255,
		0, 0, 0, 1, 0],
	// ビンテージ
	vintage		: ()=> [
		0.6279345635605994, 0.3202183420819367, -0.03965408211312453, 0, 9.651285835294123 / 255,
		0.02578397704808868, 0.6441188644374771, 0.03259127616149294, 0, 7.462829176470591 / 255,
		0.0466055556782719, -0.0851232987247891, 0.5241648018700465, 0, 5.159190588235296 / 255,
		0, 0, 0, 1, 0],
	// 色合い（対角に色成分を置く）。本家の既定は 0x888888
	tint		: a=> {
		const [r, g, b] = rgb01(num(a, 'f_color', 0x888888));
		return [
			r, 0, 0, 0, 0,
			0, g, 0, 0, 0,
			0, 0, b, 0, 0,
			0, 0, 0, 1, 0];
	},
	// ナイトエフェクト
	night		: a=> {
		const i = num(a, 'intensity', 0.5);
		return [
			i * -2, -i, 0, 0, 0,
			-i, 0, i, 0, 0,
			0, i, i * 2, 0, 0,
			0, 0, 0, 1, 0];
	},
	// 捕食者効果
	predator	: a=> {
		const m = num(a, 'amount', 0.5);
		return [
			11.224130630493164 * m, -4.794486999511719 * m, -2.8746118545532227 * m, 0, 0.40342438220977783 * m,
			-3.6330697536468506 * m, 9.193157196044922 * m, -2.951810836791992 * m, 0, -1.316135048866272 * m,
			-3.2184197902679443 * m, -4.2375030517578125 * m, 7.476448059082031 * m, 0, 0.8044459223747253 * m,
			0, 0, 0, 1, 0];
	},
	// カラートーン（グラデーションマップのようなもの）
	color_tone	: a=> {
		const des = num(a, 'desaturation', 0.5);
		const tnd = num(a, 'toned', 0.5);
		const lc = num(a, 'light_color', 0xFFE580);
		const dc = num(a, 'dark_color', 0xFFE580);
		const [lR, lG, lB] = rgb01(lc);
		const [dR, dG, dB] = rgb01(dc);
		return [
			0.3, 0.59, 0.11, 0, 0,
			lR, lG, lB, des, 0,
			dR, dG, dB, tnd, 0,
			lR - dR, lG - dG, lB - dB, 0, 0];
	},
	// 汎用のカラーマトリックス。matrixに20個並べるか、成分ごとの属性で指定する
	color_matrix: a=> {
		const {matrix = ''} = a;
		if (matrix) {
			const m = matrix.split(',').map(v=> Number(v));
			if (m.length !== 20) throw `matrix の個数（${String(m.length)}）が 20 ではありません`;	// 本家と同じ文言
			if (m.some(v=> ! Number.isFinite(v))) throw '[add_filter] matrix に数値でない値があります';
			return m;
		}
		// 本家 Layer.ts:151 の並び（rtor…pa）。既定は恒等行列
		return [
			num(a, 'rtor', 1), num(a, 'gtor', 0), num(a, 'btor', 0), num(a, 'ator', 0), num(a, 'pr', 0),
			num(a, 'rtog', 0), num(a, 'gtog', 1), num(a, 'btog', 0), num(a, 'atog', 0), num(a, 'pg', 0),
			num(a, 'rtob', 0), num(a, 'gtob', 0), num(a, 'btob', 1), num(a, 'atob', 0), num(a, 'pb', 0),
			num(a, 'rtoa', 0), num(a, 'gtoa', 0), num(a, 'btoa', 0), num(a, 'atoa', 1), num(a, 'pa', 0)];
	},
};

// 行列 → SVGの`<filter>`のid。**中身から決める**ので、同じ行列なら1つの要素を使い回せる。
//	CSSの`filter: url(#…)`は同一文書内の要素しか指せない（data:URLは不可）ため、
//	Stage.tsxが「今使われている行列」を集めて`<filter>`を出す作りになっている
export function fltId(mat: readonly number[]): string {
	let h = 0;
	const s = mat.join(',');
	for (let i = 0; i < s.length; ++i) h = (Math.imul(h, 31) + s.charCodeAt(i)) | 0;
	return `sn_cm_${(h >>> 0).toString(36)}`;
}
// feColorMatrixのvalues属性。pixiの`m[0..19]`と**並びが同じ**なのでそのまま並べる
export const fltValues = (mat: readonly number[])=> mat.join(' ');

// blur_x/blur_y → SVGの`<filter>`のid。行列と同じく中身（X,Y）から決めて使い回す
export function blurId([x, y]: readonly [number, number]): string {
	return `sn_gb_${String(x)}_${String(y)}`;
}
// feGaussianBlurのstdDeviation属性。X/Yを空白区切りで並べる
export const blurValues = ([x, y]: readonly [number, number])=> `${String(x)} ${String(y)}`;

export function bldFilter(args: {[k: string]: string}): T_FLT {
	const {filter = ''} = args;
	const blendmode = args.blendmode !== undefined ? argBlendmode(args.blendmode) : undefined;
	const enabled = (args.enable_filter ?? 'true') !== 'false';	// 本家 bldFilters()

	// blur_x/blur_yが書かれていればCSSのblur()（半径1つ）を諦め、SVGのfeGaussianBlurへ回す
	//	（本家Layer.ts:122-123と同じくblur_x/blur_yの既定は2。uint()も本家のcast関数をそのまま使う）
	if (filter === 'blur' && (args.blur_x !== undefined || args.blur_y !== undefined)) {
		const blurXY: [number, number] = [uint(num(args, 'blur_x', 2)), uint(num(args, 'blur_y', 2))];
		return {css: `url(#${blurId(blurXY)})`, enabled, blurXY, ...blendmode !== undefined ? {blendmode} : {}};
	}

	// 色成分の行列で描くもの（CSSのfilter関数には無い）はSVGのfeColorMatrixへ回す
	const fncMat = H_MAT[filter];
	if (fncMat) {
		const mat = fncMat(args);
		return {css: `url(#${fltId(mat)})`, enabled, mat, ...blendmode !== undefined ? {blendmode} : {}};
	}

	const fnc = H_BLD[filter];
	if (! fnc) {
		if (A_FLT_NOT_YET.includes(filter)) {
			throw `filter【${filter}】はbluesnovelでは未対応です（CSSのfilterにもSVGのfeColorMatrixにも相当が無いため）`;
		}
		throw 'filter が異常です';	// 本家と同じ文言
	}

	return {css: fnc(args), enabled, ...blendmode !== undefined ? {blendmode} : {}};
}

// レイヤの持つフィルターのうち、SVGのfeColorMatrixで描くもの（Stage.tsxが要素を出すため）
export function matsOf(aFlt: readonly T_FLT[]): number[][] {
	return aFlt.filter(f=> f.enabled && f.mat).map(f=> f.mat!);
}

// レイヤの持つフィルターのうち、SVGのfeGaussianBlurで描くもの（Stage.tsxが要素を出すため）
export function blursOf(aFlt: readonly T_FLT[]): (readonly [number, number])[] {
	return aFlt.filter(f=> f.enabled && f.blurXY).map(f=> f.blurXY!);
}

// レイヤが持つフィルターのうち、有効かつblendmode指定があるものの**最後の1つ**。
//	CSSは要素につきmix-blend-modeを1つしか持てないため、[lay blendmode=]と同じ枠を取り合う
//	（Lay.tsのstyLay()が[lay blendmode=]優先でこちらへフォールバックする）
export function blendmodeOf(aFlt: readonly T_FLT[]): string | undefined {
	let ret: string | undefined;
	for (const f of aFlt) if (f.enabled && f.blendmode !== undefined) ret = f.blendmode;
	return ret;
}

// レイヤの持つフィルター一覧をCSSのfilterプロパティ値へ。
//	有効なものだけを並べる（空ならプロパティ自体を出さない）
export function styFilter(aFlt: T_FLT[]): string {
	return aFlt.filter(f=> f.enabled).map(f=> f.css).join(' ');
}
