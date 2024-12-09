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
	set key(key: string) {
		this.#key = key;
		this.#idxHistory = this.#aKeyHistory.push(key) -1;
		this.#hScr2AState[key] = {};
	}

	#hScr2AState: {[key: string]: {[nm: string]: BaseMemento}}	= {};
	update(genMeMe: ()=> BaseMemento) {
		if (this.#idxHistory < this.#aKeyHistory.length -1) return;

		const m = genMeMe();
		this.#hScr2AState[this.#key]![m.nm] = m;
console.log(`fn:Memento.ts line:30 update -- key(${this.#key}) MeMe:%o`, m);
	}

	undo(key: string) {
console.log(`fn:Memento.ts line:34 = undo key=(${key})`);
		const h = this.#hScr2AState[key];
		if (! h) throw `undo Err key:${key}`;

		for (const meme of Object.values(h)) meme.restore();
	}

	#aKeyHistory: string[]	= [];
	#idxHistory	= -1;
	// 前のキーへ移動
	beforeKey(): boolean {
		if (this.#idxHistory <= 0) return false;
console.log(`fn:Memento.ts line:46 -- beforeKey --`);
		this.undo(this.#aKeyHistory[--this.#idxHistory]!);
		return true;
	}
	// 後のキーへ移動
	afterKey(): boolean {
		if (this.#aKeyHistory.length -1 <= this.#idxHistory) return false;
console.log(`fn:Memento.ts line:53 -- afterKey --`);
		this.undo(this.#aKeyHistory[++this.#idxHistory]!);
		return true;
	}
	isLast() {return this.#aKeyHistory.length -1 === this.#idxHistory}
}
