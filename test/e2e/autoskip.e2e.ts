/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2026-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

// オート読み（自動進行）が、クリック無しで停止点をまたいで進むことをブラウザで検証する
//	（シナリオ：test/e2e/app/prj_autoskip/main.sn）。
//	「どの停止点で自動進行するか／待ち時間はいくつか」という判断はエンジンの純粋ロジックで、
//	test/ScriptEngine_autoskip.test.ts が受け持つ。ここで見るのはユニットでは届かない
//	「resume指示を受けたScriptMngが、実際にタイマーでgo()を呼んで画面を進めること」だけ。

import {expect, test} from '@playwright/test';
import {mesStr, snap} from './snPage';

test('オート読みはクリック無しで[l]を越えて進み、[s]で止まる', async ({page})=> {
	await page.goto('/test/e2e/app/index.html?prj=autoskip');

	// 一切キー・クリックせずに、[l]を2つ自動で越えて[s]まで到達する
	await expect.poll(async ()=> mesStr(page), {timeout: 10_000})
		.toBe('　一行目　二行目　三行目');

	const {wait} = await snap(page);
	expect(wait).toBeNull();	// [s]で停止（オート解除・マーカーなし）
});

test('[s]到達後は放置しても進まない（オート解除）', async ({page})=> {
	await page.goto('/test/e2e/app/index.html?prj=autoskip');
	await expect.poll(async ()=> mesStr(page), {timeout: 10_000})
		.toBe('　一行目　二行目　三行目');

	// [s]がcancelAutoSkip()を呼ぶので、そのまま放置しても勝手に進まない
	await page.waitForTimeout(300);
	expect(await mesStr(page)).toBe('　一行目　二行目　三行目');
});
