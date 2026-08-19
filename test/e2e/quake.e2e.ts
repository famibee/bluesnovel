/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2026-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

// 画面揺らし（シナリオ：test/e2e/app/prj_quake/main.sn）。
//	どんなアクションを積むかは test/ScriptEngine_quake.test.ts が持っているので、
//	ここで見るのは「実際にページ箱がずれるか」だけ。
//	揺れ幅はストアに入れない（毎フレームのランダム値なので重すぎる／読み戻しにも要らない）ので、
//	検証はDOMのtransformを直接読む

import {expect, test, type Page} from '@playwright/test';
import {gotoSn, mesStr, waitIdle} from './snPage';

test.beforeEach(async ({page})=> {await gotoSn(page, 'quake')});

// 表ページの箱に付いたずれ（Stageの素のrAFループがtransform: translate(…)で書く）。揺れていなければ0,0
const ofs = (page: Page)=> page.locator('#skynovel [data-page="fore"]').evaluate(e=> {
	const t = getComputedStyle(e).transform;
	if (t === 'none') return {x: 0, y: 0};	// まだrAFループが一度も書いていない

	const m = new DOMMatrixReadOnly(t);
	return {x: m.m41, y: m.m42};
});
// 少しの間ずっと見張って、ずれの絶対値の最大を拾う（ランダムなので一瞬0のこともある）
async function maxOfs(page: Page, msec: number) {
	let x = 0, y = 0;
	for (const t0 = Date.now(); Date.now() - t0 < msec;) {
		const o = await ofs(page);
		x = Math.max(x, Math.abs(o.x));
		y = Math.max(y, Math.abs(o.y));
	}
	return {x, y};
}

test('[quake]中はページ箱がずれ、[wq]がその間シナリオを止める', async ({page})=> {
	expect(await mesStr(page)).toBe('はじめ');
	expect(await ofs(page)).toEqual({x: 0, y: 0});

	await page.keyboard.press('Space');	// [quake time=1200 hmax=8 vmax=8] → [wq]

	// 縦横とも揺れている（毎フレーム [-8,+8] のランダム位置なので、絶対値は8以下）
	const mx = await maxOfs(page, 500);
	expect(mx.x).toBeGreaterThan(0);
	expect(mx.y).toBeGreaterThan(0);
	expect(mx.x).toBeLessThanOrEqual(8);
	expect(mx.y).toBeLessThanOrEqual(8);
	expect(await mesStr(page)).toBe('');	// [wq]中なので次の文へ進んでいない

	// 終われば続きへ進み、ずれは0へ戻る
	await expect.poll(async ()=> mesStr(page), {timeout: 5_000}).toBe('ゆれた');
	expect(await ofs(page)).toEqual({x: 0, y: 0});
});

test('[quake vmax=0]は横だけ揺れる', async ({page})=> {
	await page.keyboard.press('Space');
	await expect.poll(async ()=> mesStr(page), {timeout: 5_000}).toBe('ゆれた');
	await waitIdle(page);

	// [quake time=9000 vmax=0]。[wq]しないのでそのまま[l]で止まり、揺れ続けている
	await page.keyboard.press('Space');
	await expect.poll(async ()=> mesStr(page), {timeout: 5_000}).toBe('よこゆれ');

	const mx = await maxOfs(page, 500);
	expect(mx.x).toBeGreaterThan(0);
	expect(mx.y).toBe(0);
});

test('[stop_quake]は即座に揺れを止め、ずれ0へ戻す', async ({page})=> {
	for (const s of ['ゆれた', 'よこゆれ']) {
		await page.keyboard.press('Space');
		await expect.poll(async ()=> mesStr(page), {timeout: 5_000}).toBe(s);
		await waitIdle(page);
	}

	// 9秒の揺れの直後に[stop_quake]。9秒待たずに止まる
	const t0 = Date.now();
	await page.keyboard.press('Space');
	await expect.poll(async ()=> mesStr(page), {timeout: 5_000}).toBe('よこゆれとめた');
	expect(await ofs(page)).toEqual({x: 0, y: 0});
	expect(Date.now() - t0).toBeLessThan(5_000);
});

test('[wq]中のクリックで打ち切れ、その場合もずれ0へ戻る', async ({page})=> {
	for (const s of ['ゆれた', 'よこゆれ', 'よこゆれとめた']) {
		await page.keyboard.press('Space');
		await expect.poll(async ()=> mesStr(page), {timeout: 5_000}).toBe(s);
		await waitIdle(page);
	}

	// [quake time=9000] → [wq]。9秒待たずにクリックで打ち切る
	const t0 = Date.now();
	await page.keyboard.press('Space');
	expect((await maxOfs(page, 300)).x).toBeGreaterThan(0);
	expect(await mesStr(page)).toBe('');	// まだ[wq]中

	await page.keyboard.press('Space');	// 打ち切り
	await expect.poll(async ()=> mesStr(page), {timeout: 5_000}).toBe('うちきり');
	expect(await ofs(page)).toEqual({x: 0, y: 0});	// 中途半端なずれのまま残らない
	expect(Date.now() - t0).toBeLessThan(9_000);
});
