/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2026-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

// 文字レイヤの外形＝**box-sizing: border-box**（本家 TxtLayer.ts:112 準拠）の検証。
//	（シナリオ：test/e2e/app/prj_txtbox/main.sn）
//
//	本家サンプル由来のテンプレ（桜の樹の下には）の sysmenu 縦書き設定マクロは
//	`[lay style="width: 310px; height: 768px; padding-left: 26px; …"]` を **本家と同じ
//	border-box 前提**で書く。以前 bluesnovel は content-box にしていたため、箱が padding
//	ぶん膨らんで縦書き本文がステージ右／下へはみ出していた（2026-09-07、tmp_blues 実機で発覚）。

import {expect, test} from '@playwright/test';
import {gotoSn, pressKey} from './snPage';

// [data-lay=nm] の1つめの span（＝文字レイヤ本体。2つめ以降はボタンの箱）の外形と算出 padding。
//	transform: scale されるステージの中なので、offsetWidth/Height（論理 px）で見る
const box = (page: import('@playwright/test').Page, nm: string)=> page.evaluate(nm=> {
	const el = document.querySelector(`#skynovel [data-page="fore"] span[data-lay="${nm}"]`) as HTMLElement | null;
	if (! el) return null;
	const cs = getComputedStyle(el);
	return {
		w: el.offsetWidth, h: el.offsetHeight,	// border-box 外形（padding・border 込み）
		boxSizing: cs.boxSizing,
		pad: [cs.paddingTop, cs.paddingRight, cs.paddingBottom, cs.paddingLeft].join(' '),
		// 文字表示領域（padding の内側）＝clientWidth/Height − padding
		innerW: el.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight),
		innerH: el.clientHeight - parseFloat(cs.paddingTop) - parseFloat(cs.paddingBottom),
	};
}, nm);

test.beforeEach(async ({page})=> {await gotoSn(page, 'txtbox')});

test('[lay style="width/height/padding"]（本家サンプルの書き方）は border-box＝外形が指定どおり', async ({page})=> {
	await pressKey(page, 'Space');	// きほん → すたいる

	const b = await box(page, 'mes');
	expect(b).not.toBeNull();
	expect(b!.boxSizing).toBe('border-box');
	// style="width: 310px; height: 400px; padding: 30px 36px 22px 26px;"
	expect(b!.w).toBe(310);		// content-box なら 310+26+36=372（＝旧不具合）
	expect(b!.h).toBe(400);		// content-box なら 400+30+22=452
	expect(b!.pad).toBe('30px 36px 22px 26px');
	// 文字表示領域は外形から padding を引いたぶん
	expect(b!.innerW).toBe(310 - 26 - 36);
	expect(b!.innerH).toBe(400 - 30 - 22);
});

test('[lay width=/height=] 属性も border-box＝外形。pl/pr/pt/pb はその内側の余白', async ({page})=> {
	await pressKey(page, 'Space');	// すたいる
	await pressKey(page, 'Space');	// ぞくせい（layer=attr）

	const b = await box(page, 'attr');
	expect(b).not.toBeNull();
	// [lay width=300 height=200 pl=10 pr=20 pt=30 pb=40]
	expect(b!.w).toBe(300);		// 本家 TxtStage の $width（＝外形）と一致
	expect(b!.h).toBe(200);
	expect(b!.pad).toBe('30px 20px 40px 10px');
	expect(b!.innerW).toBe(300 - 10 - 20);
	expect(b!.innerH).toBe(200 - 30 - 40);
});
