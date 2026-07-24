/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2026-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

// ステージ（<div id="skynovel">）そのものの寸法と表示範囲。
//	・prj.jsonの window.width/height で固定される
//	・その範囲外へはみ出したレイヤは切り取られる
//	・画像を置いていない領域は黒
//	一度この寸法が0に潰れて全レイヤがステージ外へはみ出す不具合を出しているので、回帰用に固定する
//	（transform: scale() はレイアウト上のサイズを変えないため、外側の実寸を別途与える必要がある）

import {expect, test} from '@playwright/test';
import {gotoSn, stageBox} from './snPage';

// test/e2e/app/prj_basic/prj.json の window
const PRJ_W = 800;
const PRJ_H = 600;

test.beforeEach(async ({page})=> {
	await page.setViewportSize({width: 1280, height: 900});	// ステージより広く＝等倍
	await gotoSn(page, 'basic');
});

test('ステージはprj.jsonのwindowサイズになり、はみ出しを切り取る', async ({page})=> {
	const {stage, inner} = await stageBox(page);

	// 外側（#skynovel）にも実寸が要る。ここが0だとレイヤが全部ステージ外へこぼれる
	expect(stage.w).toBe(PRJ_W);
	expect(stage.h).toBe(PRJ_H);
	expect(stage.overflow).toBe('hidden');

	// 内側（座標系の原点になるステージ本体）も同寸で、はみ出しを切り取る
	expect(inner.w).toBe(PRJ_W);
	expect(inner.h).toBe(PRJ_H);
	expect(inner.overflow).toBe('hidden');
});

test('画像を置いていない領域は黒', async ({page})=> {
	const {inner, fore} = await stageBox(page);
	expect(inner.bg).toBe('rgb(0, 0, 0)');

	// [trans]でクロスフェードさせる「ステージ大の板」もステージ全面の黒地
	expect(fore.w).toBe(PRJ_W);
	expect(fore.h).toBe(PRJ_H);
	expect(fore.bg).toBe('rgb(0, 0, 0)');
});

test('ウインドウがステージより狭ければ、縦横比を保って縮小される', async ({page})=> {
	await page.setViewportSize({width: PRJ_W / 2, height: PRJ_H / 2});
	// 縮小はtransform: scale()。外側の実寸もその倍率で追随する（ページ側に余白を作らないため）
	await expect.poll(async ()=> (await stageBox(page)).stage.w, {timeout: 5_000}).toBe(PRJ_W / 2);
	const {stage} = await stageBox(page);
	expect(stage.h).toBe(PRJ_H / 2);
});
