/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2026-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

// 禁則処理（`[lay kinsoku_sol=/kinsoku_eol=/kinsoku_dns=/kinsoku_bura=]`）の純粋部分。
//	本家 skynovel_esm/src/sn/Hyphenation.ts の移植。DOM（`document`）を一切参照しない。
//
//	移植しないもの:
//	・break_fixed/break_fixed_left/break_fixed_top（本家 :27-29,60-90）: [l]/[p]待ちマーカーの
//	  位置決め用（本家 TxtStage.ts:348-359,501-502）。bluesnovelは待ちマーカーをReactの兄弟span
//	  で別管理しているので用途が無い
//	・record()/playback()/reNew()（本家 :128-182）: T_TXTLAY_DATAへ載せればセーブ復元
//	  （store.tsxのgetPagesJson()→replace）が自動で面倒を見るので専用コードは不要
//	・#getChRects()（本家 :299-323）: Range一文字ずつの計測はしない。DOM側（TxtLayer.tsx）が
//	  表示単位spanの矩形で折り返しを検出する
//
//	**bluesnovelのT_CH（Txt.ts）は「1表示単位」が1要素**で、ルビ付きなら親文字＋ルビをまとめて
//	1要素に持つ（本家は親文字・ルビが別々の1文字ずつDOM要素として並ぶ）。そのため本家の
//	#i2pi()（ルビ・縦中横の文字数ぶんスキップする処理）は、bluesnovel側でDOM計測用に
//	`T_KIN_CH[]`を組み立てる際（TxtLayer.tsx側）に「親文字1要素＋ルビ1要素」の2要素へ展開する
//	ことで、常に1つ戻ればよい形に単純化できる（縦中横は複数文字でも1要素のまま＝戻る必要が
//	そもそも無い）

export const DEF_KINSOKU_SOL	= '、。，．）］｝〉」』】〕”〟ぁぃぅぇぉっゃゅょゎァィゥェォッャュョヮヵヶ！？!?‼⁉・ーゝゞヽヾ々';
export const DEF_KINSOKU_EOL	= '［（｛〈「『【〔“〝';
export const DEF_KINSOKU_DNS	= '─‥…';
export const DEF_KINSOKU_BURA	= DEF_KINSOKU_SOL;

export const DEF_KINSOKU = {
	sol		: DEF_KINSOKU_SOL,
	eol		: DEF_KINSOKU_EOL,
	dns		: DEF_KINSOKU_DNS,
	bura	: DEF_KINSOKU_BURA,
} as const;

export type T_KINSOKU = {sol?: string | undefined; eol?: string | undefined; dns?: string | undefined; bura?: string | undefined};

// 1判定単位。rt はルビ要素（本家 elm.tagName==='RT'）で、禁則判定・改行検出の対象外。
//	afterBr は直前が[r]由来の改行（本家 hyph() の `previousElementSibling…includes('<br>')` 判定に相当）
export type T_KIN_CH = {ch: string; rt?: true; afterBr?: true};

const reCache = new Map<string, RegExp>();
function regOf(chars: string): RegExp {
	let re = reCache.get(chars);
	if (! re) {re = new RegExp(`[${chars}]`); reCache.set(chars, re)}
	return re;
}

// 禁則の競合チェック（本家 #chk禁則の競合_ぶら行末 / #chk禁則の競合_ぶら分禁）。
//	ぶら下げ と 行末禁則／分割禁止 に同じ文字があってはならない。
//	**行頭禁則との重複は本家もチェックしない**（ぶら下げの既定は行頭禁則と同じ集合なので、
//	両者の重複は「衝突」として扱わない設計）
export function chkKinsoku(eol: string, dns: string, bura: string): void {
	for (const c of bura) {
		if (eol.includes(c)) throw `禁則の競合があります。文字 ${c} がぶら下げ と 行末禁則 の両方に含まれます`;
	}
	for (const c of bura) {
		if (dns.includes(c)) throw `禁則の競合があります。文字 ${c} がぶら下げ と 分割禁止 の両方に含まれます`;
	}
}

// 本家 Hyphenation クラスの純粋部分（禁則文字集合の保持と判定アルゴリズム）
export class Kinsoku {
	readonly #regSol	: RegExp;
	readonly #regEol	: RegExp;
	readonly #regDns	: RegExp;
	readonly #regBura	: RegExp;

	constructor(k?: T_KINSOKU) {
		this.#regSol	= regOf(k?.sol ?? DEF_KINSOKU.sol);
		this.#regEol	= regOf(k?.eol ?? DEF_KINSOKU.eol);
		this.#regDns	= regOf(k?.dns ?? DEF_KINSOKU.dns);
		this.#regBura	= regOf(k?.bura ?? DEF_KINSOKU.bura);
	}

	// 一つ前の判定対象要素の添字（本家 #i2pi。ルビ要素はスキップして親文字要素へ戻る）
	i2pi(a: readonly T_KIN_CH[], i: number): number {
		const p_i = i -1;
		return a[p_i]?.rt ? p_i -1 : p_i;
	}

	/**
	 * 抽象化した禁則処理アルゴリズム（本家 hyph_alg、ぶら下げ無し）
	 * @param a - 文章の抽象化配列
	 * @param p_i - 処理要素の一つ前の添字
	 * @param p_ch - 処理要素の一つ前の文字
	 * @param ii - 処理要素の添字（i >= 2）
	 * @param ch - 処理要素の文字
	 * @return cont - true: 呼び元で改行挿入せず continue
	 * @return ins - 手前に改行を挿入すべき要素の添字
	 */
	hyphAlg(a: readonly T_KIN_CH[], p_i: number, p_ch: string, ii: number, ch: string): {cont: boolean; ins: number} {
		let i = ii;
		if (this.#regEol.test(p_ch)) { /* empty */ }	// 一つ前
		else if (this.#regSol.test(ch)) {	//（現在地 -> 前方走査）
			while ((i = this.i2pi(a, i)) >= 0) {
				if (! this.#regSol.test(a[i]!.ch)) break;	// 行頭禁則はスキップ
			}
		}
		else if (p_ch === ch && this.#regDns.test(p_ch)) { /* empty */ }	// 一つ前＆現在地
		else return {cont: true, ins: i +1};	// 追い出しなし

		// 追い出しによる新行末二次判定（一つ前 -> 前方走査）
		i = p_i;
		while ((i = this.i2pi(a, i)) >= 0) {
			if (! this.#regEol.test(a[i]!.ch)) break;	// 行末禁則はスキップ
		}
		return {cont: false, ins: i +1};
	}

	/**
	 * 抽象化した禁則処理アルゴリズム（本家 hyph_alg_bura、ぶら下げ有り）
	 * @param a - 文章の抽象化配列
	 * @param p_i - 処理要素の一つ前の添字
	 * @param p_ch - 処理要素の一つ前の文字
	 * @param i - 処理要素の添字（i >= 2）
	 * @return cont - true: 呼び元で改行挿入せず continue
	 * @return ins - 手前に改行を挿入すべき要素の添字
	 */
	hyphAlgBura(a: readonly T_KIN_CH[], p_i: number, p_ch: string, i: number): {cont: boolean; ins: number} {
		const pp_i = this.i2pi(a, p_i);	// 改行後のルビで追い出し発生
		const {ch: pp_ch} = a[pp_i]!;
		// 改行前二個目に「ぶら下げ」がある
		if (this.#regBura.test(pp_ch) || this.#regSol.test(pp_ch)) {
			let j = p_i;
			// 改行前にも「ぶら下げ」がある
			if (this.#regBura.test(p_ch) || this.#regSol.test(p_ch)) ++j;

			// ぶら下げ後……追い出し走査
			const p_j = this.i2pi(a, j);	// pp_i ではない
			const {ch: last_ch} = a[p_j]!;	// 行末
			const {ch: head_ch} = a[j]!;		// 行頭
			// 分割禁止
			if (last_ch === head_ch && this.#regDns.test(head_ch)) return {cont: false, ins: p_j};

			if (! this.#regEol.test(last_ch)) return {cont: false, ins: j};
			// 行末禁則
			j = p_j;
			do {
				if (! this.#regEol.test(a[j]!.ch)) break;	// 行禁はスキップ
			} while ((j = this.i2pi(a, j)) >= 0);
			return {cont: false, ins: j +1};	// 行末禁則
		}

		// 改行前二個目に「ぶら下げ」がない
		const ppp_i = this.i2pi(a, pp_i);
		if (i >= 3) {
			const {ch: ppp_ch} = a[ppp_i]!;
			// 改行前二個目に「分割禁止」
			if (this.#regDns.test(pp_ch)) {	// 分割禁止
				if (ppp_ch === pp_ch) return {cont: false, ins: ppp_i};
			}
			// 改行前三個目に「行末禁則」
			if (this.#regEol.test(ppp_ch)) {	// 行末禁則
				let j = ppp_i;
				while ((j = this.i2pi(a, j)) >= 0) {
					if (! this.#regEol.test(a[j]!.ch)) break;	// 行禁はスキップ
				}
				return {cont: false, ins: j +1};	// 行末禁則
			}
		}

		return {cont: false, ins: pp_i};
	}

	/**
	 * 表示単位の並びを先頭から1回走査し、最初に見つかった禁則違反の挿入位置を返す
	 * （本家 hyph() のfor部分。DOM計測・`<br>`挿入・再走査ループはDOM側（TxtLayer.tsx）が持つ）。
	 * @param a - 文章の抽象化配列
	 * @param xy - 各要素の主軸座標（横書きはx、縦書きはy。表示単位spanの矩形から作る）
	 * @param bura - ぶら下げ禁則を使うか
	 * @param from - 走査開始位置（前回`<br>`を挿した直後から再開する。呼び元は2から始める）
	 * @return null なら違反なし。ins は`<br>`を挿すべき手前の添字、resumeAt は次回の走査開始位置
	 */
	scan(a: readonly T_KIN_CH[], xy: readonly number[], bura: boolean, from: number): {ins: number; resumeAt: number} | null {
		let sl_xy = -Infinity;	// 前回のxy
		for (let i = from; i < a.length; ++i) {
			if (a[i]!.rt) continue;	// ルビはスキップ

			const x = xy[i]!;
			// 【 < 】では[tcy]二文字目を誤判定する。[r]による改行後は追い出し処理をしないように
			if (sl_xy <= x || a[i]!.afterBr) {
				sl_xy = x;
				continue;
			}

			// 折り返し発見
			const p_i = this.i2pi(a, i);
			const p_ch = a[p_i]!.ch;
			const oldI = i;
			const {cont, ins} = bura
				? this.hyphAlgBura(a, p_i, p_ch, i)
				: this.hyphAlg(a, p_i, p_ch, i, a[i]!.ch);
			if (cont) {i = ins -1; continue}	// forの++iで+1されるのでins-1

			let resumeAt = ins +2;
			if (resumeAt < oldI) resumeAt = oldI;	// 永久ループ防御
			return {ins, resumeAt};
		}
		return null;
	}
}
