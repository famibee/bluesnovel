/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2026-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

// [button]/[link] の onenter/onleave（本家 EventMng.ts:427-442）。シナリオ：e2e/app/prj_btnhover/main.sn
//	ホバー中だけラベルをサブルーチンコールし [return] で [l] 待ちへ戻ること、
//	その割り込みが「読み進め」扱いにならない（wait は [l] のまま）ことをブラウザ上で確かめる。

import {expect, test} from '@playwright/test';
import {gotoSn, mesStr, snap, waitIdle} from './snPage';

test.beforeEach(async ({page})=> {await gotoSn(page, 'btnhover')});

const foreMes = (page: import('@playwright/test').Page)=>
	page.locator('#skynovel [data-page="fore"] [data-lay="mes"]');

test('[button onenter=/onleave=] がホバーでラベルをコールし、[l] 待ちのまま戻る', async ({page})=> {
	expect(await mesStr(page)).toBe('リンクどうぞ');

	// マウスを乗せる → *benter がコールされ [return]
	await page.getByText('ホバーで反応').hover();
	await waitIdle(page);
	expect(await mesStr(page)).toBe('リンクどうぞ／B乗った');
	// 割り込みであって読み進めではない（[l] 待ちのまま）
	expect((await snap(page)).wait).toEqual({nm: 'mes', kind: 'l'});
	expect((await snap(page)).isReadBack).toBe(false);

	// マウスを外す（リンクの1文字へ移す） → *bleave
	await foreMes(page).locator(':text-is("リ")').hover();
	await waitIdle(page);
	expect(await mesStr(page)).toContain('／B外れた');

	// クリック（読み進めとは別経路＝jumpToLabelAndGo）も従来どおり動く
	await page.getByText('ホバーで反応').click();
	await waitIdle(page);
	expect(await mesStr(page)).toContain('／Bクリック');
	expect((await snap(page)).wait).toEqual({nm: 'mes', kind: 'l'});
});

test('[link onenter=/onleave=] も区間の乗り降りでコールされる', async ({page})=> {
	await foreMes(page).locator(':text-is("ン")').hover();
	await waitIdle(page);
	expect(await mesStr(page)).toContain('／L乗った');

	await page.getByText('ホバーで反応').hover();
	await waitIdle(page);
	expect(await mesStr(page)).toContain('／L外れた');
});
