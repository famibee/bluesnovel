/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2026-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

// キーボードフォーカスの順番管理（[set_focus]）。本家 FocusMng.ts の移植。
//	本家はpixiのContainer（ゲーム内ボタン）とHTML要素（フレーム内の部品）を混ぜて並べるが、
//	bluesnovelはどちらもDOM要素なのでHTMLElementだけの一本の輪になる。
//
//	輪へ入る経路は3つ、いずれも本家と同じ：
//	・[button]（BtnLayer）が表示されている間（本家 EventMng.ts:435）
//	・[event key='dom=…'] の**最初の1件**（本家 EventMng.ts:596 の `if (i === 0)`）
//	・[set_focus add='dom=…']（本家 EventMng.ts:646）
//
//	モジュール直下の単一インスタンス（focusMng）で持つ。画面全体で1つしかない状態で、
//	Reactのツリーからも（BtnLayer）DOM側からも（ScriptMng）触るため。
//	Lay.tsのドラッグ通知と同じ流儀

export class FocusMng {
	#aEl	: HTMLElement[] = [];
	#idx	= -1;

	// 実際にフォーカスできるか。非表示（[frame visible=false]の中や裏ページ）や
	//	無効化（[frame disabled=true]）された要素は飛ばす（本家 #canFocus()）
	static #canFocus(el: HTMLElement): boolean {
		if ((el as HTMLInputElement).disabled) return false;
		return el.getClientRects().length > 0;
	}

	add(el: HTMLElement) {
		if (this.#aEl.includes(el)) return;	// 重複チェック（本家と同じ）

		// 輪の外から（クリックやTabで）フォーカスが移った時も現在位置を合わせておく
		el.addEventListener('focus', ()=> {this.#idx = this.#aEl.indexOf(el)});
		this.#aEl.push(el);
	}
	remove(el: HTMLElement) {
		const i = this.#aEl.indexOf(el);
		if (i < 0) return;

		this.#aEl.splice(i, 1);
		if (this.#aEl.length === 0) this.#idx = -1;
		else if (i <= this.#idx) --this.#idx;	// -1 でもOK（本家のコメントそのまま）
	}
	clear() {this.#aEl = []; this.#idx = -1}

	isFocus(el: HTMLElement) {return this.#idx >= 0 && this.#aEl[this.#idx] === el}
	get length() {return this.#aEl.length}
	get idx() {return this.#idx}

	next() {this.#move(1)}
	prev() {this.#move(-1)}
	// 次（前）へ動かす。フォーカスできない要素は飛ばし、一周して誰も居なければ外す
	#move(d: 1 | -1) {
		const len = this.#aEl.length;
		if (len === 0) return;

		let i = this.#idx + d;
		if (i >= len) i = 0; else if (i < 0) i = len - 1;
		for (let n = 0; n < len; ++n) {
			const j = ((i + d * n) % len + len) % len;
			const el = this.#aEl[j]!;
			if (! FocusMng.#canFocus(el)) continue;

			this.#idx = j;
			el.focus();
			return;
		}
		this.#idx = -1;
	}

	// [set_focus to=null]：フォーカスを外す（本家 blur()）
	blur() {
		this.#aEl[this.#idx]?.blur();
		this.#idx = -1;
		// フレーム内の要素を外した場合、**親から見るとiframe自身がフォーカスされたまま**になる
		//	（キー入力もそちらへ行く）ので、親側のフォーカスも外す。
		//	本家も blurSub() で globalThis.focus() を呼んで画面へ戻している
		(document.activeElement as HTMLElement | null)?.blur();
		globalThis.focus();
	}

}

export const focusMng = new FocusMng;
