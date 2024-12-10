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


export type T_SAVE_MEMENTO = ()=> BaseMemento;

export class Caretaker {
	#aSave	: T_SAVE_MEMENTO[] = [];	// Memento対象
	add(save: T_SAVE_MEMENTO) {this.#aSave.push(save)}

	#key = '';
	set key(key: string) {
		this.#key = key;
		this.#aKeyHistory.push(key);
		++this.#idxHistory;
	}

	#hScr2AState: {[key: string]: BaseMemento[]}	= {};
	update() {
		const a: BaseMemento[] = [];
		for (const save of this.#aSave) a.push(save());
		this.#hScr2AState[this.#key] = a;
console.log(`fn:Memento.ts line:30 -- key(${this.#key}) STT:%o`, this.#hScr2AState[this.#key]);
	}

	undo(key: string) {
console.log(`fn:Memento.ts line:38 = undo key=(${key})`);
		const a = this.#hScr2AState[key];
		if (! a) throw `undo Err key:${key}`;

console.log(`fn:Memento.ts line:41 = undo == do`);
		for (const meme of a) {
console.log(`fn:Memento.ts line:44 == nm:${meme.nm}`);
			meme.restore();
		}
	}

	#aKeyHistory: string[]	= [];
	#idxHistory	= -1;
	// 前のキーへ移動
	beforeKey(): boolean {
		if (this.#idxHistory <= 0) return false;
console.log(`fn:Memento.ts line:53 -- beforeKey --`);
		this.undo(this.#aKeyHistory[--this.#idxHistory]!);

		return true;
	}
	// 後のキーへ移動
	afterKey(): boolean {
		if (this.#aKeyHistory.length -1 <= this.#idxHistory) return false;
console.log(`fn:Memento.ts line:61 -- afterKey --`);
		this.undo(this.#aKeyHistory[++this.#idxHistory]!);

		return true;
	}
	isLast() {return this.#aKeyHistory.length -1 === this.#idxHistory}
}
