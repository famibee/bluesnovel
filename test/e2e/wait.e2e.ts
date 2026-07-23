/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2026-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

// [l]/[p]/[s]の停止と待ちマーカー表示の検証（シナリオ：e2e/app/prj_basic/main.sn）

import {expect, test} from '@playwright/test';
import {gotoSn, mesStr, pressKey, snap} from './snPage';

test.beforeEach(async ({page})=> {await gotoSn(page, 'basic')});

test('[l]で停止し、行末クリック待ちマーカー（🩷）を表示する', async ({page})=> {
	expect(await mesStr(page)).toBe('一ページ目のいち。');

	const {wait} = await snap(page);
	expect(wait).toEqual({nm: 'mes', kind: 'l'});
	await expect(page.getByText('🩷')).toBeVisible();
});

test('[p]で停止し、改ページ待ちマーカー（✅）を表示する', async ({page})=> {
	await pressKey(page, 'Space');

	// [p]までは同じページなので、文字は消えずに積み上がる
	expect(await mesStr(page)).toBe('一ページ目のいち。二番目のぶん。');

	const {wait} = await snap(page);
	expect(wait).toEqual({nm: 'mes', kind: 'p'});
	await expect(page.getByText('✅')).toBeVisible();
});

test('[p]の次の進行でページがクリアされる', async ({page})=> {
	await pressKey(page, 'Space');	// -> [p]
	await pressKey(page, 'Space');	// -> 次ページの[l]

	expect(await mesStr(page)).toBe('二ページ目のいち。');

	const {wait} = await snap(page);
	expect(wait).toEqual({nm: 'mes', kind: 'l'});
});

test('[s]で停止し、待ちマーカーは表示しない', async ({page})=> {
	await pressKey(page, 'Space');	// -> [p]
	await pressKey(page, 'Space');	// -> [l]
	await pressKey(page, 'Space');	// -> [s]

	expect(await mesStr(page)).toBe('二ページ目のいち。おしまい。');

	const {wait} = await snap(page);
	expect(wait).toBeNull();		// [s]はマーカーなし
	await expect(page.getByText('🩷')).toHaveCount(0);
	await expect(page.getByText('✅')).toHaveCount(0);
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
