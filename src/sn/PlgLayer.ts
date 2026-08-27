/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2018-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

// 本家 skynovel_esm が導入した「DOMオーバーレイを持つプラグインレイヤ基底クラス」
//	（skynovel_esm/src/sn/PlgLayer.ts）のbluesnovel版シム。
//
//	本家では `Layer.ctn` が pixi.js の Sprite なので、見た目を担う素の <div>（`htm`）を
//	別に持たせ appPixi.ticker で毎フレーム位置・回転・拡縮・不透明度を同期する。
//	bluesnovel は `Layer.ctn` 自体が素の <div> で、位置・回転・拡縮は「箱」
//	（components/Layer.tsx + components/Lay.ts styLay()）が既に担うため：
//	  - `htm` は `ctn` のエイリアスで足りる
//	  - `setup()` / `cvsResize()` 相当は不要（何もしない）
//
//	これにより sn_gallery の live2d_layer / 3d_layer は `extends PlgLayer` のまま
//	本家（skynovel_esm）とbluesnovelの両方で動く。

import {Layer} from './Layer';

export class PlgLayer extends Layer {
	// 本家 LayerMng が appPixi.ticker 同期の配線に使う静的口。bluesnovel では箱が
	//	位置を担うので呼ばれても何もしない（シグネチャは可変長で緩く受ける）
	static setup(..._a: unknown[]): void { /* empty */ }

	// プラグインが canvas 等を appendChild する先。bluesnovel では ctn がそのまま素div
	get htm(): HTMLDivElement {return this.ctn}

	// 本家 Layer が持つ [snapshot] フック（bluesnovel Layer には無いので、
	//	プラグイン側の `override snapshot()` が型エラーにならないようここで受ける）。
	//	bluesnovel の [snapshot] は canvas を個別フックでなく Snapshot.ts が DOM 走査で
	//	toDataURL()→<img> 差し替えして取り込むため、ここは何もしなくてよい
	//	（3d/live2d プラグインの WebGL canvas が撮れることは実機確認済み。要 preserveDrawingBuffer）
	snapshot(_rnd: unknown, re: ()=> void): void {re()}
	snapshot_end(): void { /* empty */ }
	snapshotByCanvas(_cvs: HTMLCanvasElement, _rnd: unknown, re: ()=> void): void {re()}
}
