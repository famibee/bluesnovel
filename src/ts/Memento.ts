/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2024-2024 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

export abstract class BaseMemento {
	abstract readonly	nm: string;		// 適当な名を付けて
	constructor(protected readonly stt = '') {}

	abstract	restore(): void;	// this.stt から
};


export class Caretaker {
	#key = '';
	push(key: string) {
		this.update = this.#update;

		this.push = (key: string)=> {
			this.#key = key;
			this.#idxHistory = this.#aKeyHistory.push(key) -1;
			this.#hScr2AState[key] = {};
		};
		this.push(key);
	}

	#hScr2AState: {[key: string]: {[nm: string]: BaseMemento}}	= {};
	update(_genMeMe: ()=> BaseMemento) {return}
	#update(genMeMe: ()=> BaseMemento) {
		if (this.#idxHistory < this.#aKeyHistory.length -1) return;

		// clear()直後（[page clear=true]・[load]）はまだ何も積んでいないのに、
		//	Stageの再描画だけは走る。ここで書き込もうとすると落ちるので何もしない
		//	（次のpush()＝次の停止点から積み直しになる）
		const h = this.#hScr2AState[this.#key];
		if (! h) return;

		const m = genMeMe();
		h[m.nm] = m;
console.log(`fn:Memento.ts update -- key(${this.#key}) MeMe:%o`, m);
	}

	undo(key: string) {
console.log(`fn:Memento.ts = undo key=(${key})`);
		const h = this.#hScr2AState[key];
		if (! h) throw `undo Err key:${key}`;

		for (const meme of Object.values(h)) meme.restore();
	}

	// 履歴を全消去（[page clear=true]。本家 Reading.ts:356 page()のclear相当）。
	//	本編を始める前などに呼び、タイトル画面まで読み戻れてしまうのを防ぐ。
	//	push()が差し替えた#update/#pushはそのまま活かす（次のpush()から積み直しになる）
	clear() {
		this.#key = '';
		this.#hScr2AState = {};
		this.#aKeyHistory = [];
		this.#idxHistory = -1;	// 空の履歴と辻褄が合う値（isLast()がtrue、prev/nextは動かない）
	}

	#aKeyHistory: string[]	= [];
	#idxHistory	= 0;
	// 前のキーへ移動
	prevKey(): boolean {
console.log(`fn:Memento.ts -- beforeKey --`);
		if (this.#idxHistory <= 0) return false;

		this.undo(this.#aKeyHistory[--this.#idxHistory]!);
		return true;
	}
	// 後のキーへ移動
	nextKey(): boolean {
console.log(`fn:Memento.ts -- afterKey --`);
		if (this.#aKeyHistory.length -1 <= this.#idxHistory) return false;

		this.undo(this.#aKeyHistory[++this.#idxHistory]!);
		return true;
	}
	isLast() {return this.#aKeyHistory.length -1 === this.#idxHistory}
}
