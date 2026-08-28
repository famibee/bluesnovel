/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2026-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

// 動画（シナリオ：test/e2e/app/prj_movie/main.sn）。
//	動画は本家に専用の再生タグが無く、[lay fn=movie]で画像レイヤにそのまま貼る方式（Phase 4）。
//	属性→アクションの写像はtest/ScriptEngine_snd.test.tsが持っているので、ここで見るのは
//	・[lay fn=movie]でGrpLayerが<img>でなく実際に<video>を描画すること
//	・[wv]が動画の自然終了（'ended'）まで進行を止めること
//	・[wv]待機中のクリックで打ち切れること（canskip既定=true。[ws]/[wf]とは逆）

import {expect, test} from '@playwright/test';
import type {Page} from '@playwright/test';
import {gotoSn, mesStr, pressKey, pressKeyToWaitMark, waitIdle} from './snPage';

test.beforeEach(async ({page})=> {await gotoSn(page, 'movie')});

test('[lay fn=movie]は<img>でなく<video>を描画する', async ({page})=> {
	const video = page.locator('#skynovel [data-page="fore"] [data-lay="base"] video');
	await expect(video).toHaveCount(1);
	await expect(video).toHaveAttribute('src', /movie\.mp4$/);
});

test('[wv]は動画の自然終了（ended）まで進行を止める', async ({page})=> {
	// ページを開いた直後はまだ[wv]で待っている（動画は2秒、クリック無しで自然終了を待つ）
	expect(await mesStr(page)).toBe('');

	await expect.poll(async ()=> mesStr(page), {timeout: 6_000}).toBe('どうがしゅうりょう');
});

test('[wv]待機中のクリックで打ち切れる', async ({page})=> {
	await expect.poll(async ()=> mesStr(page), {timeout: 6_000}).toBe('どうがしゅうりょう');
	await waitIdle(page);

	// 1回目のSpaceで[lay fn=movie2][wv fn=movie2]まで進み、待ちに入る
	await pressKey(page, 'Space');
	expect(await mesStr(page)).toBe('');

	// 2回目のSpaceが「[wv]待機中のクリック」として扱われ、自然終了（2秒）を待たず
	//	打ち切れることを見る（canskip既定=true。[ws]/[wf]の既定falseとは逆）
	const t0 = Date.now();
	await pressKey(page, 'Space');
	expect(await mesStr(page)).toBe('うちきり');
	expect(Date.now() - t0).toBeLessThan(1_500);	// 自然終了（2秒）より十分速い
});

// backpage-perf.md「不可視 back ページで <video> がデコードを続ける」対応。
//	GrpLayer が fxActive（＝ページ可視）で video.pause()／play() する。[wv] は挟まない
const vidTime = (page: Page, pg: 'fore' | 'back')=> page
	.locator(`#skynovel [data-page="${pg}"] [data-lay="base"] video`)
	.evaluate((v: HTMLVideoElement)=> ({paused: v.paused, t: v.currentTime, ended: v.ended}));

test('[trans]後の不可視 back ページで <video> が pause され、戻すと再開する', async ({page})=> {
	await expect.poll(async ()=> mesStr(page), {timeout: 6_000}).toBe('どうがしゅうりょう');
	await waitIdle(page);
	await pressKey(page, 'Space');				// [lay fn=movie2][wv fn=movie2] → 待ちに入る
	await pressKey(page, 'Space');				// [wv]打ち切り → 「うちきり」
	expect(await mesStr(page)).toBe('うちきり');
	await pressKeyToWaitMark(page, 'Space');		// [lay fn=movie]×2 → 「さいせいちゅう」
	expect(await mesStr(page)).toBe('さいせいちゅう');

	await pressKeyToWaitMark(page, 'Space');		// [trans time=100][wt] → 「うら停止」
	expect(await mesStr(page)).toBe('うら停止');

	// trans 後：foreIdx 反転。旧表＝いまの裏の <video> は pause され currentTime が凍結
	const b1 = await vidTime(page, 'back');
	expect(b1.paused).toBe(true);
	expect(b1.ended).toBe(false);
	await page.waitForTimeout(250);
	const b2 = await vidTime(page, 'back');
	expect(b2.t).toBe(b1.t);						// 凍結（デコードが進んでいない）
	// 新しい表の <video> は再生中
	expect((await vidTime(page, 'fore')).paused).toBe(false);

	await pressKeyToWaitMark(page, 'Space');		// もう一度 [trans] → 「おもて再開」
	expect(await mesStr(page)).toBe('おもて再開');

	// 元の <video>（いま表）は pause 点から再開（頭出しされない）
	const f1 = await vidTime(page, 'fore');
	expect(f1.paused).toBe(false);
	expect(f1.t).toBeGreaterThanOrEqual(b1.t);	// 止まった位置以上（巻き戻っていない）
	await page.waitForTimeout(250);
	expect((await vidTime(page, 'fore')).t).toBeGreaterThan(f1.t);	// 進んでいる
});
