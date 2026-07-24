/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2026-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

// フィルター（[add_filter]/[clear_filter]/[enable_filter]・[lay filter=…]）のうち、
//	DOMを触らない部分。本家 Layer.ts:101 bldFilters() ＋ hBldFilter に対応する。
//	エンジンから呼べるようにここへ分けてある（filter名の書き間違いをその場で例外にできる）。
//
//	**ここが表示アーキテクチャ変更の影響を一番受けている場所**。本家のフィルターは
//	pixiのBlurFilter/NoiseFilter/ColorMatrixFilterで、22種のうち大半はColorMatrixFilterの
//	プリセット（browni・kodachrome・lsd…）だが、bluesnovelはDOM＝CSSのfilterプロパティなので
//	素で書けるのはCSSにある9種だけ。残りは未対応（対応させるならSVGのfeColorMatrixへ
//	pixiと同じ5x4行列を流し込む形になる。todo.md参照）

// フィルター1件。CSSのfilterプロパティに並べる関数1つぶんと、[enable_filter]用の有効フラグ
export type T_FLT = {css: string; enabled: boolean};

// 数値属性（本家 argChk_Num 相当。ここは省略値ありのみ）
function num(args: {[k: string]: string}, nm: string, def: number): number {
	const v = args[nm];
	if (v === undefined) return def;

	const n = v.startsWith('0x') ? parseInt(v.slice(2), 16) : Number(v);
	if (! Number.isFinite(n)) throw `[add_filter] ${nm}の値が不正です：${v}`;
	return n;
}

// filter名 -> CSSのfilter関数。既定値は本家（Layer.ts hBldFilter）に合わせてある
const H_BLD: {[nm: string]: (args: {[k: string]: string})=> string} = {
	// CSSのblurは1つの半径しか持てないので、本家のblur_x/blur_y（軸別強度）は表現できない。
	//	strength（本家の既定8）をそのまま半径pxとして使う
	blur			: a=> `blur(${String(num(a, 'strength', 8))}px)`,
	brightness		: a=> `brightness(${String(num(a, 'b', 0.5))})`,
	contrast		: a=> `contrast(${String(num(a, 'amount', 0.5))})`,
	grayscale		: a=> `grayscale(${String(num(a, 'scale', 0.5))})`,
	black_and_white	: ()=> 'grayscale(1)',
	negative		: ()=> 'invert(1)',
	// pixiのsaturate(amount)は「1を基準にamountぶん増やす」。CSSも1が等倍なので足して渡す
	saturate		: a=> `saturate(${String(1 + num(a, 'amount', 0.5))})`,
	hue				: a=> `hue-rotate(${String(num(a, 'rotation', 0))}deg)`,
	sepia			: ()=> 'sepia(1)',
};

// 本家にはあるがCSSでは素で書けないもの。名前を知らないのか未対応なのかを区別して知らせる
const A_FLT_NOT_YET = [
	'noise', 'color_matrix', 'browni', 'color_tone', 'kodachrome', 'lsd', 'night',
	'polaroid', 'predator', 'technicolor', 'tint', 'to_bgr', 'vintage',
];

export function bldFilter(args: {[k: string]: string}): T_FLT {
	const {filter = ''} = args;
	const fnc = H_BLD[filter];
	if (! fnc) {
		if (A_FLT_NOT_YET.includes(filter)) {
			throw `filter【${filter}】はbluesnovelでは未対応です（CSSのfilterで表現できないため。対応可能なのは ${Object.keys(H_BLD).join('/')}）`;
		}
		throw 'filter が異常です';	// 本家と同じ文言
	}

	// enable_filter属性で「足すけれど最初は効かせない」ができる（本家 bldFilters()）
	return {css: fnc(args), enabled: (args.enable_filter ?? 'true') !== 'false'};
}

// レイヤの持つフィルター一覧をCSSのfilterプロパティ値へ。
//	有効なものだけを並べる（空ならプロパティ自体を出さない）
export function styFilter(aFlt: T_FLT[]): string {
	return aFlt.filter(f=> f.enabled).map(f=> f.css).join(' ');
}
