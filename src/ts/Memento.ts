/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2024-2024 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

export abstract class BaseMemento {
	#onUpdate: ()=> void;
	init(onUpdate: ()=> void) {this.#onUpdate = onUpdate}

	protected stt = '';
	onUpdate($stt: string) {this.stt = $stt; this.#onUpdate()}

	abstract readonly	nm: string;		// 適当な名を付けて
	get state() {return this.stt}

	setState(state: string) {this.stt = state; this.replace()}
	protected abstract	replace(): void;	 // stt から 置換処理を
};


export class Caretaker {
	#aMemento	: BaseMemento[] = [];		// Memento対象
	#hScr2AState: {[key: string]: string[]}	= {};
	#aKey	: string[]	= [];

	add(m: BaseMemento) {m.init(()=> this.backup()); this.#aMemento.push(m)}

	#key = '';
	set key($key: string) {this.#key = $key}
	backup(key = this.#key) {
		this.#aKey.push(key);
		this.#hScr2AState[key] = this.#aMemento.map(m=> m.state);
console.log(`fn:Memento.ts key:${key} STT:%o`, this.#hScr2AState[key]);

		//x const aLay = useStore(s=> s.aLay);

	}

	undo(key: string) {
		const a = this.#hScr2AState[key];
		if (! a) throw `undo Err key:${key}`;

		const len = this.#aMemento.length;
		for (let i=0; i<len; ++i) {
			const m = this.#aMemento[i]!;
			m.onUpdate(a[i] ?? '');
		}
	}

	beforeKey() {}	// 前のキーへ移動
	afterKey() {}
	gotoKey() {}	// scr + idx? で指定して移動
}
