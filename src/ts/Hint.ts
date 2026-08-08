/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2026-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

// ツールチップ（[button hint=…]・[link hint=…]）。
//	**画面に1つだけ**の吹き出しを使い回す（本家 EventMng.ts:131 も`.sn_hint`を1つ作って
//	popper.jsで位置を決める）。こちらはpopperを持たないので、対象の矩形から自前で置く。
//	FocusMngと同じくモジュールレベルに1インスタンス：ボタン（React）からもリンク
//	（TxtLayerがReactの外で組むDOM）からも同じ吹き出しを触りたいため。

// 吹き出しの向き（本家はpopperのplacement。hint_optのJSONで指定される）
type T_PLACE = 'top' | 'bottom' | 'left' | 'right';

const A_PLACE: readonly string[] = ['top', 'bottom', 'left', 'right'];

// [button hint_opt=…]（本家はpopperのオプションJSON）。今は placement だけ見る
export function hintPlace(opt: string | undefined): T_PLACE {
	if (! opt) return 'top';	// popperの既定と同じ

	try {
		const {placement} = JSON.parse(opt) as {placement?: string};
		// 'bottom-start'のような修飾付きも本体だけ拾う
		const p = (placement ?? '').split('-')[0] ?? '';
		return A_PLACE.includes(p) ? p as T_PLACE : 'top';
	}
	catch {return 'top'}	// 壊れたJSONでもヒントは出す（本家もpopper任せで落ちない）
}

// 吹き出しの位置（純粋）。対象の矩形と吹き出しの大きさから左上座標を出す
export function hintPos(
	trg: {left: number; top: number; width: number; height: number},
	box: {width: number; height: number},
	place: T_PLACE,
	gap = 8,
): {left: number; top: number} {
	switch (place) {
		case 'bottom':	return {left: trg.left + (trg.width - box.width) / 2, top: trg.top + trg.height + gap};
		case 'left':	return {left: trg.left - box.width - gap, top: trg.top + (trg.height - box.height) / 2};
		case 'right':	return {left: trg.left + trg.width + gap, top: trg.top + (trg.height - box.height) / 2};
		default:		return {left: trg.left + (trg.width - box.width) / 2, top: trg.top - box.height - gap};
	}
}

const OPPOSITE: {[K in T_PLACE]: T_PLACE} = {top: 'bottom', bottom: 'top', left: 'right', right: 'left'};

// 主軸方向（hintPosの向き）にスペースが無ければ反対側へ切り替える
//	（本家popperの`flip`モディファイア相当の簡易版。依存を増やさないので上下左右の反転のみ）
export function hintFlip(
	trg: {left: number; top: number; width: number; height: number},
	box: {width: number; height: number},
	place: T_PLACE,
	gap: number,
	viewport: {width: number; height: number},
): T_PLACE {
	const fits = (p: T_PLACE): boolean => {
		switch (p) {
			case 'top':		return trg.top - box.height - gap >= 0;
			case 'bottom':	return trg.top + trg.height + gap + box.height <= viewport.height;
			case 'left':	return trg.left - box.width - gap >= 0;
			case 'right':	return trg.left + trg.width + gap + box.width <= viewport.width;
		}
	};
	if (fits(place)) return place;
	const opp = OPPOSITE[place];
	return fits(opp) ? opp : place;	// どちらもはみ出すなら元の向きのまま（clampPosが画面内に収める）
}

// 副軸方向（中央揃えのずれ）を画面内に収める
//	（本家popperの`preventOverflow`モディファイア相当の簡易版）
export function clampPos(
	pos: {left: number; top: number},
	box: {width: number; height: number},
	viewport: {width: number; height: number},
): {left: number; top: number} {
	return {
		left: Math.min(Math.max(pos.left, 0), Math.max(0, viewport.width - box.width)),
		top: Math.min(Math.max(pos.top, 0), Math.max(0, viewport.height - box.height)),
	};
}

// 既定の見た目（本家 EventMng.ts:98 `.sn_hint`と同じ値）。[button hint_style=…]で上書きできる
const STY_DEF = `position: fixed; background-color: #3c3225; color: white;`
	+ ` padding: 4px 8px; border-radius: 4px; font-size: 1.2em;`
	+ ` z-index: 10000; pointer-events: none; user-select: none; white-space: pre;`;

class HintMng {
	#el?: HTMLElement;

	#box(): HTMLElement {
		if (this.#el) return this.#el;

		const el = this.#el = document.createElement('div');
		el.className = 'sn_hint';
		el.setAttribute('role', 'tooltip');
		el.hidden = true;
		document.body.appendChild(el);
		return el;
	}

	// 対象要素のそばに出す。textが空なら何もしない（hint未指定のボタンから呼ばれるため）
	show(trg: Element, text: string, style = '', opt?: string) {
		if (! text) return;

		const el = this.#box();
		el.textContent = text;
		el.style.cssText = STY_DEF + style;
		el.hidden = false;
		// **表示してから測る**（大きさが決まらないと中央揃えの位置が出せない）。
		//	position:fixedなので、対象のビューポート座標（getBoundingClientRect）をそのまま使える
		const r = trg.getBoundingClientRect();
		const b = el.getBoundingClientRect();
		const vp = {width: window.innerWidth, height: window.innerHeight};
		const gap = 8;	// hintPosの既定と揃える
		const place = hintFlip(r, b, hintPlace(opt), gap, vp);
		const {left, top} = clampPos(hintPos(r, b, place, gap), b, vp);
		el.style.left = `${String(left)}px`;
		el.style.top = `${String(top)}px`;
	}

	hide() {if (this.#el) this.#el.hidden = true}
}

export const hintMng = new HintMng;
