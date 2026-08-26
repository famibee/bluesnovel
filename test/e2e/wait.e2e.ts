/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2026-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

// [l]/[p]/[s]の停止と待ちマーカー表示の検証（シナリオ：e2e/app/prj_basic/main.sn）

import {expect, test} from '@playwright/test';
import {SEL_FORE, gotoSn, mesStr, pressKey, snap} from './snPage';

test.beforeEach(async ({page})=> {await gotoSn(page, 'basic')});

// このプロジェクト（prj_basic）はbreakline/breakpage素材を持たないため、待ちマーク自体は
//	何も描かない（本家準拠。TxtLayer.tsx styWaitMark参照）。それでも、フォーカスの輪へ乗せる
//	ための当たり判定つきプロキシ要素（data-wait-focus）は常に居る——絵の有無に見た目は左右
//	されないので、ここではそのプロキシの有無で「待ち状態か」を見る
test('[l]で停止し、行末クリック待ち用のフォーカス可能なプロキシ要素を表示する', async ({page})=> {
	expect(await mesStr(page)).toBe('一ページ目のいち。');

	const {wait} = await snap(page);
	expect(wait).toEqual({nm: 'mes', kind: 'l'});
	await expect(page.locator(`${SEL_FORE} span[data-lay="mes"] [data-wait-focus]`)).toBeVisible();
});

test('[p]で停止し、改ページ待ち用のフォーカス可能なプロキシ要素を表示する', async ({page})=> {
	await pressKey(page, 'Space');

	// [p]までは同じページなので、文字は消えずに積み上がる
	expect(await mesStr(page)).toBe('一ページ目のいち。二番目のぶん。');

	const {wait} = await snap(page);
	expect(wait).toEqual({nm: 'mes', kind: 'p'});
	await expect(page.locator(`${SEL_FORE} span[data-lay="mes"] [data-wait-focus]`)).toBeVisible();
});

test('[s]で停止し、待ち用プロキシ要素は出ない', async ({page})=> {
	await pressKey(page, 'Space');	// -> [p]
	await pressKey(page, 'Space');	// -> [l]
	await pressKey(page, 'Space');	// -> [s]

	expect(await mesStr(page)).toBe('二ページ目のいち。おしまい。');

	const {wait} = await snap(page);
	expect(wait).toBeNull();		// [s]はマーカーなし
	await expect(page.locator(`${SEL_FORE} span[data-lay="mes"] [data-wait-focus]`)).toHaveCount(0);
});

test('[s]の後はクリックしても進まない', async ({page})=> {
	await pressKey(page, 'Space');
	await pressKey(page, 'Space');
	await pressKey(page, 'Space');	// -> [s]

	const before = await mesStr(page);
	await pressKey(page, 'Space');
	expect(await mesStr(page)).toBe(before);
});

test('[title]相当：prj.jsonのbook.titleがページタイトルになる', async ({page})=> {
	expect((await snap(page)).title).toBe('E2E basic');
	await expect(page).toHaveTitle('E2E basic');
});
