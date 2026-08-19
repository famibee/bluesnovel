/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2024-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

export type T_SWIPE_DIR = 'swipeleft' | 'swiperight' | 'swipeup' | 'swipedown';

// 本家 EventMng.ts:164-219 は tinygesture の swipeleft/right/up/down を使うが、bluesnovel は
//	tap/longpressをReact標準イベント＋react-useのuseLongPressで代替済み（tinygesture不使用）
//	なので、スワイプ判定だけをこの純粋関数として自作する（2026-08-19、todo.md旧43行目）。
//	判定式は本家の設定（EventMng.ts:164-167: velocityThreshold=0で速度条件を実質無効化、
//	disregardVelocityThresholdは距離条件のOR先）を反映した、tinygesture既定のthreshold
//	（辺の15%、最小25px。tinygesture/src/TinyGesture.ts:336-346のdefaults.threshold）による
//	距離のみの判定に整理したもの。速度・対角スワイプ（diagonalSwipes既定false）は本家も
//	未使用のため持ち込まない
export function detectSwipe(dx: number, dy: number, w: number, h: number): T_SWIPE_DIR | undefined {
	const absX = Math.abs(dx);
	const absY = Math.abs(dy);
	const thX = Math.max(25, Math.floor(0.15 *w));
	const thY = Math.max(25, Math.floor(0.15 *h));

	if (absX > thX && absX >= absY) return dx < 0 ?'swipeleft' :'swiperight';
	if (absY > thY && absY > absX) return dy < 0 ?'swipeup' :'swipedown';
	return undefined;
}
