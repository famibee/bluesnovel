/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2024-2024 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

export interface IMemento {
	getState(): string;
	setState(state: string): void;
};


export class Caretaker {
	#aMemento	: IMemento[] = [];		// Memento対象
	#hScr2AState: {[key: string]: string[]}	= {};
	#aKey	: string[]	= [];

	add(m: IMemento) {this.#aMemento.push(m)}

	backup(key: string) {
		this.#aKey.push(key);
		this.#hScr2AState[key] = this.#aMemento.map(m=> m.getState());
	}

	undo(key: string) {
		const a = this.#hScr2AState[key];
		if (! a) throw `undo Err key:${key}`;

		const len = this.#aMemento.length;
		for (let i=0; i<len; ++i) {
			const m = this.#aMemento[i]!;
			m.setState(a[i] ?? '');
		}
	}

	beforeKey() {}	// 前のキーへ移動
	afterKey() {}
	gotoKey() {}	// scr + idx? で指定して移動
}
