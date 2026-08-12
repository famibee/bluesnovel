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

// 直近の入力がキーボード（ゲームパッド含む）かマウスか。輪の要素へfocusイベントが飛んで来た瞬間に
//	これを見て、キー操作由来のときだけ`data-focus-ring`を立てる（todo.md「マウスクリックでも
//	待ちマーカーにフォーカス矩形が出て格好悪い」対応。ゲームパワードはブラウザ既定の
//	フォーカスリングと同じ扱いのままでよい、という要望）。マウスのネイティブなtabIndexフォーカス
//	（JSから`.focus()`を呼ばない、クリックしただけで乗る分）はここで弾く。
//	ゲームパッドはGamepadMng.tsが`isTrusted:false`の合成KeyboardEventを飛ばすため`isTrusted`
//	では判別できず、keydown/pointerdownという**イベント種別**で見分ける。
//	`globalThis`のcapture段で拾うのは、GamepadMng.tsがフォーカス中要素が無い時`globalThis`へ
//	dispatchすることがあり（`window`はdocumentの祖先だが逆はなく、documentで張ると取りこぼす）
let modality: 'mouse' | 'keyboard' = 'mouse';
globalThis.addEventListener('keydown', ()=> {modality = 'keyboard'}, {capture: true});
globalThis.addEventListener('pointerdown', ()=> {modality = 'mouse'}, {capture: true});

export class FocusMng {
	#aEl	: HTMLElement[] = [];
	#idx	= -1;

	// 実際にフォーカスできるか。非表示（[frame visible=false]の中や裏ページ）や
	//	無効化（[frame disabled=true]）された要素は飛ばす（本家 #canFocus()）
	static #canFocus(el: HTMLElement): boolean {
		if ((el as HTMLInputElement).disabled) return false;
		if (el.getClientRects().length === 0) return false;
		// **`getClientRects()`は`visibility: hidden`でも非0を返す**（レイアウト自体はされているため）。
		//	裏ページ（`aPage`のもう片面。[trans]前後で表と入れ替わる）は`visibility: hidden`で隠しており、
		//	表と同じボタンが同じ位置に重なって存在するため、これが無いと表裏で二重にフォーカスの輪へ
		//	入ってしまう（実機で「ボタン4つのはずが8箇所フォーカスできる」不具合として発覚）。
		//	**`checkVisibility()`は既定では`visibility`プロパティを見ない**（`checkVisibilityCSS`が
		//	既定false）ため明示的に指定する
		if (! el.checkVisibility({checkVisibilityCSS: true})) return false;

		// **フレーム（iframe）の中の要素は、外側が隠れていても中は見えているつもりになる**。
		//	その文書は自分が入れ子になっていることを知らないので、getClientRects()が普通に返る。
		//	[frame visible=false]で隠したフレームへフォーカスが落ちないよう、親側まで遡って確かめる
		//	（同一originのsrcdocなのでframeElementを辿れる。念のため例外は握る）
		try {
			for (let w = el.ownerDocument.defaultView; w && w !== w.parent;) {
				const fe = w.frameElement as HTMLElement | null;
				if (! fe) break;
				if (fe.getClientRects().length === 0) return false;
				// 別のフレームがz-indexで前面に重なって表示されている（[ask_ync]等のモーダル的な
				//	フレーム）間は、裏のフレームへフォーカスが漏れないようにする。[frame disabled=]を
				//	シナリオ側が明示的に呼ばなくても、前面のフレームを出しただけで自動的に効く
				if (FocusMng.#isOccluded(fe)) return false;

				w = fe.ownerDocument.defaultView;
			}
		}
		catch {/* 別originのフレームは辿れない。その時は中の要素の見え方だけで判断する */}
		return true;
	}
	// フレーム要素feの中心点で最前面に表示されているのが自分自身か（＝他のフレーム等に
	//	覆われていないか）。elementFromPointは要素を貫通せず、iframeはそれ自身が1つの要素として
	//	当たり判定を持つため、z-indexで上に重なる別要素があればそれが返る
	static #isOccluded(fe: HTMLElement): boolean {
		const r = fe.getBoundingClientRect();
		if (r.width === 0 || r.height === 0) return false;
		const top = fe.ownerDocument.elementFromPoint(
			r.left + r.width / 2, r.top + r.height / 2);
		return top !== null && top !== fe;
	}

	// add()で張った'focus'リスナの解除関数。
	//	外さないと、輪を出入りするたびに同じ要素へリスナが積み上がる：
	//	重複チェックは #aEl しか見ないので、remove()の後の add()は素通りする。
	//	BtnLayerはReactが要素ごと作り直すので無害だが、[set_focus add/del='dom=…']が
	//	相手にするフレーム内の要素は生き続けるため、往復した回数だけ増える
	//	（本家 skynovel_esm/src/sn/FocusMng.ts の add/remove 非対称と同じ問題。
	//	 ただし本家は EventListenerCtn が解除関数を保持し続けるので要素ごと掴んだままになる）
	readonly #hOff = new Map<HTMLElement, ()=> void>();
	#off(el: HTMLElement) {
		this.#hOff.get(el)?.();
		this.#hOff.delete(el);
	}

	add(el: HTMLElement) {
		if (this.#aEl.includes(el)) return;	// 重複チェック（本家と同じ）

		// 輪の外から（クリックやTabで）フォーカスが移った時も現在位置を合わせておく。
		//	`data-focus-ring`はキー操作由来のフォーカスだけ立てる目印（TxtLayer.tsxのstyWaitMarkが見る）
		const fnc = ()=> {
			this.#idx = this.#aEl.indexOf(el);
			if (modality === 'keyboard') el.dataset.focusRing = 'true';
			else delete el.dataset.focusRing;
		};
		el.addEventListener('focus', fnc);
		let off = ()=> {el.removeEventListener('focus', fnc)};

		// 要素の種類ごとの矢印キー操作（本家 FocusMng.ts:64-101 の移植）。
		//	該当しない要素（[button]/[l][p]待ちマーカーのspanなど）にはリスナを張らない。
		//	bluesnovelの[button]は既にReactのonKeyDownでEnter/Spaceを処理しており、
		//	ここで全要素にkeydownを張ってstopImmediatePropagation()すると
		//	Reactのイベント委譲より先に止めて壊してしまうため（本家との相違点）
		const fncKey = FocusMng.#keyHandlerOf(el);
		if (fncKey) {
			const offKey = FocusMng.#addKey(el, fncKey);
			off = ()=> {el.removeEventListener('focus', fnc); offKey()};
		}

		this.#hOff.set(el, off);
		this.#aEl.push(el);
	}
	// 要素に応じた矢印キーハンドラを返す。対象外ならundefined
	static #keyHandlerOf(el: HTMLElement): ((e: KeyboardEvent)=> void) | undefined {
		const inp = el as HTMLInputElement;
		switch (inp.type ?? '') {
		case 'checkbox':
			return ()=> {inp.checked = ! inp.checked};
		case '':
			// 子にinput[type]を複数持つ要素はラジオ群として扱う
			if (el.querySelectorAll('input[type]').length > 0) {
				return e=> FocusMng.#radioNext(el, e.key);
			}
			break;
		case 'range':
			return e=> {
				if (e.isTrusted) return;	// ゲームパッド（合成イベント）のみ処理
				if (e.key === 'ArrowUp') inp.stepUp(); else inp.stepDown();
				inp.dispatchEvent(new InputEvent('input', {bubbles: true}));
			};
		case 'text':
		case 'textarea':
			return e=> {
				if (e.isTrusted) return;	// ゲームパッド（合成イベント）のみ処理
				let cur = (inp.selectionStart ?? 0) + (e.key === 'ArrowUp' ? -1 : 1);
				if (cur < 0) cur = 0;
				inp.setSelectionRange(cur, cur);
			};
		}
		if (el.localName === 'button' || el.localName === 'a') {
			return e=> {
				if (e.isTrusted || e.key !== 'Enter') return;	// ゲームパッド（合成イベント）のみ処理。実キーボードはブラウザ既定で自動click
				el.dispatchEvent(new MouseEvent('click', {bubbles: true}));
			};
		}
		// **フレーム（iframe）内の任意タグ**（`[event key='dom=…']`/`[set_focus add='dom=…']`で
		//	束ねた、作者のHTML任せの要素。上のswitchで拾えなかった時点でinput/textarea等ではない
		//	ので「クリックで何か起きる」前提の要素とみなせる）もEnter→click変換の対象にする。
		//	button/aと違い、div等はブラウザがEnterで自動clickしてくれない（tabindexを付けても
		//	native挙動にはならない）ため、実キーボード（isTrusted:true）も変換が要る
		//	（本家との相違点：本家は本編領域全体が唯一のHTML文書でpixiのボタン中心のため、
		//	この「作者のHTML内の任意タグ」というケース自体が無かった）。
		//	[button]/待ちマーカーのspanはmain document側にいるのでここでは対象にならない
		//	（Reactが自前でEnter/Spaceを処理するため、当たると二重処理になる）
		if (el.ownerDocument !== document) {
			return e=> {
				if (e.key !== 'Enter') return;
				el.dispatchEvent(new MouseEvent('click', {bubbles: true}));
			};
		}
		return undefined;
	}
	static #addKey(el: HTMLElement, fnc: (e: KeyboardEvent)=> void) {
		const onKey = (e: KeyboardEvent)=> {
			if (e.key !== 'ArrowUp' && e.key !== 'ArrowDown' && e.key !== 'Enter') return;

			// フレーム内で押した矢印キーがFrameMngの中継経由で親へ抜け、
			//	読み進めに使われてしまわないよう止める（本家のstopImmediatePropagation()相当）
			e.stopPropagation();
			fnc(e);
		};
		el.addEventListener('keydown', onKey);
		return ()=> {el.removeEventListener('keydown', onKey)};
	}
	// ラジオ群の選択を前後に回す（本家 FocusMng.ts:117-126 の #radio_next）
	static #radioNext(el: HTMLElement, key: string) {
		const op = el.querySelectorAll('input[type]');
		const len = op.length;
		for (let i = 0; i < len; ++i) {
			if (! (op[i] as HTMLInputElement).checked) continue;

			(op[(i + len + (key === 'ArrowUp' ? -1 : 1)) % len] as HTMLInputElement).checked = true;
			break;
		}
	}
	remove(el: HTMLElement) {
		const i = this.#aEl.indexOf(el);
		if (i < 0) return;

		this.#off(el);
		this.#aEl.splice(i, 1);
		if (this.#aEl.length === 0) this.#idx = -1;
		else if (i <= this.#idx) --this.#idx;	// -1 でもOK（本家のコメントそのまま）
	}
	clear() {
		for (const el of this.#aEl) this.#off(el);
		this.#aEl = []; this.#idx = -1;
	}

	isFocus(el: HTMLElement) {return this.#idx >= 0 && this.#aEl[this.#idx] === el}
	get length() {return this.#aEl.length}
	get idx() {return this.#idx}
	// 今フォーカスしている要素（GamepadMngが合成イベントのdispatch先を選ぶのに使う。本家 getFocus()）
	getFocus(): HTMLElement | null {
		if (this.#idx < 0) return null;
		const el = this.#aEl[this.#idx]!;
		return FocusMng.#canFocus(el) ? el : null;
	}

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
