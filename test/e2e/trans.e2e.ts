/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2026-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

// ページ裏表・[trans]・[wt]（シナリオ：test/e2e/app/prj_trans/main.sn）。
//	この3つは「表示そのもの」なのでブラウザでしか確かめられない部分が多い：
//	・クロスフェード（表ページのopacityが下がり、裏ページが見えている）
//	・[wt]が演出の間シナリオを止めていること
//	・クリックで演出を飛ばすと、中途半端な見た目ではなく必ず終了状態になること
//	どのアクションを積むか（layer=の分解・time=0・page属性の既定）は
//	test/ScriptEngine_trans.test.ts が持っているので、ここでは重ねて確かめない

import {expect, test} from '@playwright/test';
import {SEL_FORE, gotoSn, mesStr, pageStyle, snap, txtBoxStyle, waitTransDone, waitTransRunning} from './snPage';

test.beforeEach(async ({page})=> {await gotoSn(page, 'trans')});

// b_alpha=1（既定）はブラウザがrgb()へ正規化する
const BG_OPAQUE	= 'rgb(127, 255, 212)';

test('[lay page=back]で裏ページへ書いた内容が、[trans]で表に出る', async ({page})=> {
	// 開始時：表は既定の不透明（b_alpha=1）。裏にはまだ何も書いていない
	expect(await mesStr(page)).toBe('おもて');
	expect(await txtBoxStyle(page, 'background-color')).toBe(BG_OPAQUE);

	await page.keyboard.press('Space');
	await waitTransRunning(page);
	// 裏ページには[lay b_alpha=0.2 page=back]が入っている（まだ表には出ていない）
	const s1 = await snap(page);
	expect(s1.aLayBack.find(l=> l.nm === 'mes')?.b_alpha).toBe(0.2);
	expect(s1.aLay.find(l=> l.nm === 'mes')?.b_alpha).toBe(1);

	// 演出が終われば表裏が入れ替わり、裏に書いた不透明度が画面に効く
	await waitTransDone(page);
	expect(await mesStr(page)).toBe('うら');
	expect(await txtBoxStyle(page, 'background-color')).toBe('rgba(127, 255, 212, 0.2)');
	expect((await snap(page)).foreIdx).toBe(1);
});

test('演出中は表ページが透明になっていき、裏ページが見えている', async ({page})=> {
	await page.keyboard.press('Space');
	await waitTransRunning(page);

	// 裏ページは演出中だけ表示される（ふだんはvisibility:hidden）
	await expect.poll(async ()=> (await pageStyle(page)).back.visibility, {timeout: 5_000})
		.toBe('visible');
	// 表ページのopacityが1から下がっていく
	await expect.poll(async ()=> (await pageStyle(page)).fore.opacity, {timeout: 5_000})
		.toBeLessThan(1);

	// 完了後は元通り（透明にした側は裏へ回るのでopacityは1へ戻す）
	await waitTransDone(page);
	const st = await pageStyle(page);
	expect(st.fore.opacity).toBe(1);
	expect(st.fore.visibility).toBe('visible');
	expect(st.back.visibility).toBe('hidden');
});

test('[wt]は演出が終わるまでシナリオを止める', async ({page})=> {
	await page.keyboard.press('Space');
	await waitTransRunning(page);

	// [wt]で止まっているので、この間は次の文（うら）へ進んでいない
	expect(await mesStr(page)).toBe('おもて');
	expect((await snap(page)).foreIdx).toBe(0);

	await waitTransDone(page);
	expect(await mesStr(page)).toBe('うら');
});

test('[wt]中のクリックで演出を飛ばせる（中途半端な状態では止まらない）', async ({page})=> {
	await page.keyboard.press('Space');
	await waitTransRunning(page);

	// 演出（600ms）の途中で表ページをクリック。終了状態へ飛んで即座に続きが流れる
	const t0 = Date.now();
	await page.locator(`${SEL_FORE} span`).first().click();
	await waitTransDone(page);
	expect(Date.now() - t0).toBeLessThan(600);

	// 「終了状態」なので、途中のopacityのまま止まったりはしない
	const st = await pageStyle(page);
	expect(st.fore.opacity).toBe(1);
	expect(st.back.visibility).toBe('hidden');
	expect(await mesStr(page)).toBe('うら');
	expect(await txtBoxStyle(page, 'background-color')).toBe('rgba(127, 255, 212, 0.2)');
});

test('[trans time=0]は演出なしで即交換され、[wt]も素通しになる', async ({page})=> {
	await page.keyboard.press('Space');	// 1回目の[trans time=600]
	await waitTransDone(page);
	expect(await mesStr(page)).toBe('うら');

	await page.keyboard.press('Space');	// 2回目は[trans time=0]
	await waitTransDone(page);
	expect(await mesStr(page)).toBe('みっつめ');
	expect(await txtBoxStyle(page, 'background-color')).toBe('rgba(127, 255, 212, 0.9)');
	// 表裏が2回入れ替わったので、表は元の面（0）へ戻っている
	expect((await snap(page)).foreIdx).toBe(0);
});
