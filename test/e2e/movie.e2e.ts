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
import {gotoSn, mesStr, pressKey, waitIdle} from './snPage';

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
