/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2026-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

// 本文の文字組み（純粋部分）。ルビ記法を割るのは本家から丸移植した RubySpliter で、
//	ここはそれを「表示単位の配列」に受け直すだけの薄い層。
//	**本家も文字組みはGrammar（字句解析）ではなく表示側で行う**ので、シナリオが書いた
//	生の文字列はエンジンとストアをそのまま通り、割るのはここ（ScriptMngの翻訳時）。

import {RubySpliter} from '../sn/RubySpliter';


// エスケープ文字（prj.jsonのinit.escape）。**RubySpliterは正規表現をここで組み立てるので、
//	splitCh()より前に必ず一度は呼ばれていなければならない**（本家 ScriptIterator.ts:122 が
//	Grammarと同じ値を配る）。プロジェクト設定を読む前でも動くよう、この場で既定値を入れておく
export function setEscape(ce: string) {RubySpliter.setEscape(ce)}
setEscape('');

// 表示単位1つ。ルビ付きなら c が親文字（複数文字のこともある）、r がルビ文字
export type T_CH = {c: string; r?: string};

// 本文の生文字列 → 表示単位の並び。
//	`｜親文字《ルビ》`・`漢字《ルビ》`・傍点`《*》`（本家 RubySpliter.test.ts が仕様）
export function splitCh(raw: string): T_CH[] {
	const aCh: T_CH[] = [];
	const rs = new RubySpliter;
	rs.init((c, r)=> {aCh.push(r ? {c, r} : {c})});
	rs.putTxt(raw);
	return aCh;
}

// 表示単位の並び → 平文（ルビを除いた本文）。
//	ストアの str と組み込み変数 const.sn.last_page_plain_text はこちら
export function plainOf(aCh: readonly T_CH[]): string {
	return aCh.map(v=> v.c).join('');
}
export function plainTxt(raw: string): string {return plainOf(splitCh(raw))}

// ルビ文字は `位置指定｜ルビ` の形を取れる（本家 TxtStage の r_align。傍点は`center｜ヽ`）。
//	**位置指定はまだ未対応**なので、指定が付いていたら落としてルビ文字だけを返す
export function rubyTxt(r: string): string {
	const i = r.indexOf('｜');
	return i > 0 && /^[0-9a-z]+$/.test(r.slice(0, i)) ? r.slice(i + 1) : r;
}
