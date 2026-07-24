/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2026-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

// イベント系タグ（シナリオ：test/e2e/app/prj_wait/main.sn）。
//	どのアクションを積むかは test/ScriptEngine_wait.test.ts が持っているので、
//	ここで見るのは「ユーザー操作にどう反応するか」だけ：
//	・[enable_event enabled=false]でボタンがクリックを受けなくなる
//	・[wait]がその間シナリオを止め、クリックで打ち切れる
//	・[waitclick]はクリックで進み、[s]はクリックでは進まない

import {expect, test} from '@playwright/test';
import {gotoSn, mesStr, snap, waitIdle} from './snPage';

test.beforeEach(async ({page})=> {await gotoSn(page, 'wait')});

test('[enable_event enabled=false]の間はボタンがクリックを受けない', async ({page})=> {
	expect(await mesStr(page)).toBe('むこう');
	expect((await snap(page)).aLay.find(l=> l.nm === 'mes')?.enabled).toBe(false);

	// ボタン自体は見えているが、pointer-events: noneなのでクリックを受けない。
	//	Playwrightの通常のclick()は「他要素がイベントを横取りする」と判断して待ち続けるので、
	//	force指定で実際にその位置をクリックする＝クリックはステージへ抜けて「読み進め」になる
	await page.getByText('ボタン').click({force: true});
	await waitIdle(page);
	expect(await mesStr(page)).toBe('ゆうこう');	// *btnの「おされた」ではない
});

test('[enable_event enabled=true]に戻すとボタンが効く', async ({page})=> {
	await page.keyboard.press('Space');
	await waitIdle(page);
	expect((await snap(page)).aLay.find(l=> l.nm === 'mes')?.enabled).toBe(true);

	await page.getByText('ボタン').click();
	await waitIdle(page);
	expect(await mesStr(page)).toBe('おされた');
});

test('[wait time=…]はその間シナリオを止め、時間が経てば進む', async ({page})=> {
	await page.keyboard.press('Space');
	await waitIdle(page);	// 「ゆうこう」で[l]待ち

	const t0 = Date.now();
	await page.keyboard.press('Space');	// [wait time=1500]へ入る
	// 待っている間は次の文（まった）へ進んでいない
	//	（直前が[p]なので、再開時に文字が消えて空になったところで止まっている）
	expect(await mesStr(page)).toBe('');

	await expect.poll(async ()=> mesStr(page), {timeout: 5_000}).toBe('まった');
	expect(Date.now() - t0).toBeGreaterThanOrEqual(1_400);
});

test('[wait]中のクリックで待ちを打ち切れる（canskipの既定はtrue）', async ({page})=> {
	await page.keyboard.press('Space');
	await waitIdle(page);

	const t0 = Date.now();
	await page.keyboard.press('Space');	// [wait time=1500]へ入る
	expect(await mesStr(page)).toBe('');

	await page.keyboard.press('Space');	// 待ちを打ち切る
	await waitIdle(page);
	expect(await mesStr(page)).toBe('まった');
	expect(Date.now() - t0).toBeLessThan(1_500);
});

test('[waitclick]はクリックで進み、[s]はクリックでは進まない', async ({page})=> {
	await page.keyboard.press('Space');
	await waitIdle(page);
	await page.keyboard.press('Space');	// [wait]
	await expect.poll(async ()=> mesStr(page), {timeout: 5_000}).toBe('まった');

	// [waitclick]：待ちマーカーは出ないが、クリックで進む
	expect((await snap(page)).wait).toBeNull();
	await page.keyboard.press('Space');
	await waitIdle(page);
	expect(await mesStr(page)).toBe('まったとまった');

	// [s]：ここから先はクリックしても進まない（本家 ReadingState_wait4Tag の's'）
	for (let i = 0; i < 3; ++i) {
		await page.keyboard.press('Space');
		await waitIdle(page);
	}
	expect(await mesStr(page)).toBe('まったとまった');
});

test('[s]で止まっていても[button]の予約は動かせる', async ({page})=> {
	await page.keyboard.press('Space');
	await waitIdle(page);
	await page.keyboard.press('Space');
	await expect.poll(async ()=> mesStr(page), {timeout: 5_000}).toBe('まった');
	await page.keyboard.press('Space');	// [waitclick]を越えて[s]まで
	await waitIdle(page);
	expect(await mesStr(page)).toBe('まったとまった');

	// [s]の停止中でも、ボタン（＝予約）だけは受ける
	await page.getByText('ボタン').click();
	await waitIdle(page);
	expect(await mesStr(page)).toBe('おされた');
});
