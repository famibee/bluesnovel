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

import {expect, test, type Page} from '@playwright/test';
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

// 'うちきり'までシナリオを進める（前半4段はどれもトゥイーンの終了かクリック打ち切りで進む）
async function toPathScene(page: Page) {
	for (const s of ['うごいた', 'そうたい', 'とめた']) {
		await page.keyboard.press('Space');
		await expect.poll(async ()=> mesStr(page), {timeout: 5_000}).toBe(s);
		await waitIdle(page);
	}
	await page.keyboard.press('Space');	// [tsy time=9000 alpha=0]の[wait_tsy]へ
	await expect.poll(async ()=> layNum(page, 'base', 'alpha'), {timeout: 5_000}).toBeLessThan(1);
	await page.keyboard.press('Space');	// 打ち切り
	await expect.poll(async ()=> mesStr(page), {timeout: 5_000}).toBe('うちきり');
	await waitIdle(page);
}

test('[tsy path=…]は区間を順に辿り、相対値はどの区間も開始値が基準', async ({page})=> {
	await toPathScene(page);
	expect(await layNum(page, 'base', 'top')).toBe(400);	// 前段の[stop_tsy]の終了状態のまま

	// 進めると[lay top=50]で開始値を置いてから path='(,=100) (,=0)'。
	//	50から150まで下がって、また50へ戻る。区間ごとの相対（＝前の区間からの相対）なら
	//	終着点が150になるので、最後の値で見分けられる
	await page.keyboard.press('Space');
	await expect.poll(async ()=> {
		const v = await layNum(page, 'base', 'top');
		return v > 50 && v < 200;	// 1区間目で50から150へ向かっている途中
	}, {timeout: 5_000}).toBe(true);

	await expect.poll(async ()=> mesStr(page), {timeout: 5_000}).toBe('けいろ');
	expect(await layNum(page, 'base', 'top')).toBe(50);
});

test('[tsy chain=…]は繋いだ元の終了まで動き出さない', async ({page})=> {
	await toPathScene(page);
	await page.keyboard.press('Space');
	await expect.poll(async ()=> mesStr(page), {timeout: 5_000}).toBe('けいろ');
	await waitIdle(page);

	// tw_a（base.top → 300、400ms）の終了に tw_b（base2.left → 100）を繋いである
	await page.keyboard.press('Space');
	await expect.poll(async ()=> layNum(page, 'base', 'top'), {timeout: 5_000}).toBeGreaterThan(50);
	expect(await layNum(page, 'base2', 'left')).toBe(0);	// 繋いだ側はまだ動かない

	await expect.poll(async ()=> mesStr(page), {timeout: 5_000}).toBe('つなげた');
	expect(await layNum(page, 'base', 'top')).toBe(300);
	expect(await layNum(page, 'base2', 'left')).toBe(100);
});
