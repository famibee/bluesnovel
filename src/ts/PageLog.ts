/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2026-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

// ページログ（読み戻り）。本家 Reading.ts:207 recodePage() ／ :526 ReadingState_page.page()。
//
//	**1件＝「そのページを最初から演じ直すのに要るもの」**：ページの本文が出る前の位置（fn/idx）と、
//	そのときのしおり（変数・表裏ページ）。戻るときはそのしおりを復元してその位置から動かし直す。
//	画面のスナップショットを撮って貼り直すのではなく、**シナリオを演じ直す**のが本家の作りで、
//	そうでないと[page to=load]（見ているページから再開）でエンジンの位置が繋がらない。
//	（試作の当初は Memento でスナップショットを貼り直していたが、その方式では
//	 「戻ったページから再開する」が作れないので本家の作りへ寄せた）
//
//	ここは配列と位置の管理だけ＝ブラウザもエンジンも要らない純粋な部分で、
//	復元そのもの（しおりの適用・スクリプトのfetch）は ScriptMng が持つ。

import type {T_MARK} from './SaveMng';


// ページログ1件
export type T_PAGE_ENT = {
	key		: string;	// 位置（`${idx}:${fn}`）。同じ位置を二重に積まないための目印
	fn		: string;	// このページを演じ直す位置
	idx		: number;
	mark	: T_MARK;	// そのときのしおり
	// 改ページ待ちだったか（[p]の直後か）。**改ページはトークンではなくエンジンのフラグで起きる**ので、
	//	これを戻さないと演じ直したページに前ページの本文が残ったままになる
	clearOnResume: boolean;
};

// [page to=…]。本家 tag.html#page と同じ6種
export type T_PAGE_TO = 'oldest' | 'prev' | 'next' | 'newest' | 'exit' | 'load';
export const A_PAGE_TO: T_PAGE_TO[] = ['oldest', 'prev', 'next', 'newest', 'exit', 'load'];

// [page style=…]の既定（本家 ReadingState.INI_STYPAGE）。読み戻り中の本文の見た目
export const INI_STYPAGE = 'color: yellow; text-shadow: 1px 1px 0 #000, -1px 1px 0 #000, 1px -1px 0 #000, -1px -1px 0 #000;';


export class PageLog {
	// maxLenは prj.json の log.max_len（履歴と同じ上限。本家 recodePage() も同じ値を使う）
	constructor(private readonly maxLen: ()=> number) {}

	#a: T_PAGE_ENT[] = [];
	#pos = -1;			// 今見ているページ。-1は「まだ1件も無い」
	get len() {return this.#a.length}
	get pos() {return this.#pos}
	// 読み戻り中か（＝最新ページを見ていない）。本家 const.sn.isPaging
	get isPaging() {return this.#pos >= 0 && this.#pos < this.#a.length -1}

	// 停止点ごとに積む。**同じ位置は積み直さない**（本家 recodePage() の findIndex 判定）ので、
	//	演じ直しで同じ停止点を通っても増えない
	push(fn: string, idx: number, mark: T_MARK, clearOnResume: boolean) {
		const key = `${String(idx)}:${fn}`;
		if (this.#a.some(v=> v.key === key)) return;

		this.#a.push({key, fn, idx, mark, clearOnResume});
		const max = this.maxLen();
		if (this.#a.length > max) this.#a = this.#a.slice(-max);
		this.#pos = this.#a.length -1;
	}

	// [page clear=true]。本編を始める前などに呼び、タイトル画面まで戻れてしまうのを防ぐ
	clear() {this.#a = []; this.#pos = -1}

	// [page to=…]。**戻り値は「演じ直すページ」**（ログが空のときだけundefined）。
	//	端まで来ていて位置が動かない場合も**今のページを返す**：本家は「動かないなら何もしない」
	//	だが、こちらは[page]へ来た時点で（[p]の直後なら）本文がすでに消されているので、
	//	演じ直さないと画面が空のまま残る
	move(to: T_PAGE_TO): T_PAGE_ENT | undefined {
		const last = this.#a.length -1;
		if (last < 0) return undefined;

		switch (to) {
		case 'oldest':	this.#pos = 0;								break;
		case 'prev':	if (this.#pos > 0) --this.#pos;				break;
		case 'next':	if (this.#pos < last) ++this.#pos;			break;
		case 'newest':
		case 'exit':	this.#pos = last;							break;
		case 'load':
			// 見ているページから再開する。後ろのページは「無かったこと」にする（本家も切り捨てる）
			this.#a = this.#a.slice(0, this.#pos +1);				break;
		}
		return this.#a[this.#pos];
	}

	// 組み込み変数 sys:const.sn.aPageLog。しおりの中身は巨大なので位置だけ出す
	//	（本家はmarkごと出すが、読む用途が「何ページ分あるか」しかないため）
	json(): string {
		return JSON.stringify(this.#a.map(({fn, idx}, i)=> ({fn, idx, place: i})));
	}
}
