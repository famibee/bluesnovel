/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2026-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

// 本文履歴（ログ）フレーム（シナリオ：test/e2e/app/prj_log/main.sn）。
//	記録した本文が組み込み変数 const.sn.log.json 経由でHTMLフレームへ渡り、フレーム側のJSが
//	描画するところは本物のiframeが要るのでブラウザでしか確かめられない（履歴の積み方自体は
//	test/Log.test.ts、[add_frame]/[set_frame]/[let_frame]の基本挙動は test/e2e/frame.e2e.ts が持つ）

import {expect, test, type Page} from '@playwright/test';
import {gotoSn, mesStr, traceText, waitIdle} from './snPage';

test.beforeEach(async ({page})=> {await gotoSn(page, 'log')});

const seeText = async (page: Page, s: string)=> {
	await expect.poll(async ()=> mesStr(page), {timeout: 10_000}).toBe(s);
};
// [add_frame]はDOMを触った結果を組み込み変数へ書き戻してから続けるので、押す前のwaitIdle()が要る
//	（frame.e2e.tsと同じ事情。frameの読込中は「ストアとDOMが一致し文字送りも終わっている」ように
//	見えてwaitIdle()だけでは停止点と区別できないため、表示文字列が変わるまでpollする）
const advance = async (page: Page, to: string)=> {
	await waitIdle(page);
	await page.keyboard.press('Space');
	await seeText(page, to);
};

test('記録した本文がconst.sn.log.json経由でフレームへ渡り描画される', async ({page})=> {
	await seeText(page, 'いちぎょうめ');
	await advance(page, 'にぎょうめ');
	await advance(page, 'よみこんだ');	// [add_frame]の読み込み完了後
	await advance(page, 'ひょうじした');

	// [let_frame function=true]の戻り値（記録件数）が組み込み変数へ入る。
	//	確定した3ページ（いちぎょうめ／にぎょうめ／よみこんだ）＋書きかけの現ページ（空文字列）で4件
	//	（Log.json()は本家同様、末尾に「今読んでいる文」まで含める。Log.ts:93参照）
	expect(await traceText(page)).toContain('ret:4');

	// フレーム側のJSがJSON.parseして描画した結果
	const html = await page.frameLocator('#log').locator('#log').innerHTML();
	expect(html).toContain('いちぎょうめ');
	expect(html).toContain('にぎょうめ');
});

test('[frame visible=true]で本文履歴フレームが表示される', async ({page})=> {
	const display = ()=> page.evaluate(
		()=> (document.getElementById('log') as HTMLIFrameElement | null)?.style.display ?? '(no frame)');

	await seeText(page, 'いちぎょうめ');
	await advance(page, 'にぎょうめ');
	await advance(page, 'よみこんだ');
	expect(await display()).toBe('none');	// visible=falseで読み込んだ直後

	await advance(page, 'ひょうじした');
	expect(await display()).toBe('inline');
});
