/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2026-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

// トゥイーンアニメ（シナリオ：test/e2e/app/prj_tsy/main.sn）。
//	どんなアクションを積むかは test/ScriptEngine_tsy.test.ts が持っているので、
//	ここで見るのは「実際に時間をかけて値が動くか」だけ：
//	・[tsy]の途中経過がストアへ書き戻され、[wait_tsy]がその間シナリオを止めること
//	・相対指定が現在値に足されること
//	・[stop_tsy]／[wait_tsy]中のクリックが、必ず終了状態へ送ること

import {expect, test} from '@playwright/test';
import {gotoSn, layNum, mesStr, waitIdle} from './snPage';

test.beforeEach(async ({page})=> {await gotoSn(page, 'tsy')});

test('[tsy]が時間をかけて値を動かし、[wait_tsy]がその間シナリオを止める', async ({page})=> {
	expect(await mesStr(page)).toBe('はじめ');
	expect(await layNum(page, 'base', 'left')).toBe(0);

	await page.keyboard.press('Space');	// [tsy time=1200 left=200] → [wait_tsy]

	// 途中経過がストアへ書き戻されている（GSAPのonUpdate→chgLay）
	await expect.poll(async ()=> layNum(page, 'base', 'left'), {timeout: 5_000})
		.toBeGreaterThan(0);
	expect(await layNum(page, 'base', 'left')).toBeLessThan(200);
	expect(await mesStr(page)).toBe('');	// [wait_tsy]中なので次の文へ進んでいない

	// 終わればそのまま続きへ
	await expect.poll(async ()=> mesStr(page), {timeout: 5_000}).toBe('うごいた');
	expect(await layNum(page, 'base', 'left')).toBe(200);
});

test('相対指定（=100）は現在値に足される', async ({page})=> {
	await page.keyboard.press('Space');
	await expect.poll(async ()=> mesStr(page), {timeout: 5_000}).toBe('うごいた');
	await waitIdle(page);

	await page.keyboard.press('Space');	// [tsy time=300 left='=100']
	await expect.poll(async ()=> mesStr(page), {timeout: 5_000}).toBe('そうたい');
	expect(await layNum(page, 'base', 'left')).toBe(300);	// 200 + 100
});

test('[stop_tsy]は即座に終了状態へ送る', async ({page})=> {
	await page.keyboard.press('Space');
	await expect.poll(async ()=> mesStr(page), {timeout: 5_000}).toBe('うごいた');
	await waitIdle(page);
	await page.keyboard.press('Space');
	await expect.poll(async ()=> mesStr(page), {timeout: 5_000}).toBe('そうたい');
	await waitIdle(page);

	// [tsy time=9000 top=400]の直後に[stop_tsy]。9秒待たずに終了状態(400)になる
	const t0 = Date.now();
	await page.keyboard.press('Space');
	await expect.poll(async ()=> mesStr(page), {timeout: 5_000}).toBe('とめた');
	expect(await layNum(page, 'base', 'top')).toBe(400);
	expect(Date.now() - t0).toBeLessThan(5_000);
});

test('[wait_tsy]中のクリックで打ち切れ、その場合も終了状態になる', async ({page})=> {
	for (const s of ['うごいた', 'そうたい', 'とめた']) {
		await page.keyboard.press('Space');
		await expect.poll(async ()=> mesStr(page), {timeout: 5_000}).toBe(s);
		await waitIdle(page);
	}

	// [tsy time=9000 alpha=0] → [wait_tsy]。9秒待たずにクリックで打ち切る
	const t0 = Date.now();
	await page.keyboard.press('Space');
	await expect.poll(async ()=> layNum(page, 'base', 'alpha'), {timeout: 5_000})
		.toBeLessThan(1);
	expect(await mesStr(page)).toBe('');	// まだ[wait_tsy]中

	await page.keyboard.press('Space');	// 打ち切り
	await expect.poll(async ()=> mesStr(page), {timeout: 5_000}).toBe('うちきり');
	expect(await layNum(page, 'base', 'alpha')).toBe(0);	// 中途半端な値では止まらない
	expect(Date.now() - t0).toBeLessThan(9_000);
});
