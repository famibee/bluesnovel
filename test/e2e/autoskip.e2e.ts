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
import {gotoSn, mesStr, pressKey, snap, waitIdle, waitWaitMark} from './snPage';

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

// ===== 本編完走（prj_autostory）=====
//	実テンプレ tmp_blues を最小化した「タイトル→本編→タイトル」の一周を、
//	オート読み／既読スキップだけで走らせる。ユニットでは届かないもの一式が一度に通る：
//	キー→[event]→ラベル呼び出しでのフラグ設定、停止点ごとのタイマー再開、
//	[button]でのファイル跨ぎ、[waitclick]での強制解除、[jump fn=]でのタイトル復帰

// タイトルへ入る（[s]で止まる）。ボタンは**同じ飛び先を2つ**並べてあり、
//	nm省略時のボタン名がlabel由来だった頃はここで重複エラーになっていた
async function gotoTitleAndStart(page: import('@playwright/test').Page) {
	await gotoSn(page, 'autostory');
	expect(await mesStr(page)).toBe('タイトル1');
	await expect(page.getByText('はじめから')).toBeVisible();
	await expect(page.getByText('つづきから')).toBeVisible();

	await page.getByText('はじめから').click();	// 本編スクリプト（story.sn）へ
	// ファイル切替（fetch）を挟むので、待ちマーカーが立つ＝本物の停止点まで待つ
	//	（waitIdle()だけだとロード中の「落ち着いて見える瞬間」で抜けてしまう）
	await waitWaitMark(page);
	expect(await mesStr(page)).toBe('　一行目');
}

test('オート読みで タイトル→本編→タイトル を完走する', async ({page})=> {
	await gotoTitleAndStart(page);

	await page.keyboard.press('a');	// [event key=a]→*auto_on（&sn.auto.enabled=true）
	// ここから[l]も[p]もクリック無しで越える（[p]の後は本文が消えるので「　三行目」だけになる）
	await expect.poll(async ()=> mesStr(page), {timeout: 10_000}).toBe('　三行目');

	// [waitclick]はオートを解除する（本家 Reading s() と同じ関数を通るため）ので、
	//	放っておいても先へ進まない
	await waitIdle(page);	// **本文が出揃っても文字送りは続いている**。次のキーが瞬時完了に食われないように
	await page.waitForTimeout(300);
	expect(await mesStr(page)).toBe('　三行目');

	await pressKey(page, 'Space');	// [waitclick]を越える
	// pressKey()はwaitIdle()を挟むが、[waitclick]は待ちマーカーを立てないので
	//	「越えた直後・文字送りの始まる前」で抜けうる。本文が出揃うのを待つ
	await expect.poll(async ()=> mesStr(page), {timeout: 10_000}).toBe('　三行目　四行目');

	await page.keyboard.press('a');	// オートを入れ直す
	// [jump fn=main label=*title]でタイトルへ戻る（2周目なので表示は「タイトル2」）
	await expect.poll(async ()=> mesStr(page), {timeout: 10_000}).toBe('タイトル2');
	expect((await snap(page)).wait).toBeNull();	// [s]で停止
	await expect(page.getByText('はじめから')).toBeVisible();	// ボタンも組み直されている
});

test('既読スキップ（skip.all）でも同じ経路を完走する', async ({page})=> {
	await gotoTitleAndStart(page);

	await page.keyboard.press('Control+f');	// [event key=ctrl+f]→*skipall_on
	// skip.all＝未読でも止まらない
	await expect.poll(async ()=> mesStr(page), {timeout: 10_000}).toBe('　三行目');

	await pressKey(page, 'Space');	// [waitclick]はスキップも解除するので1回だけクリック
	await page.keyboard.press('Control+f');
	await expect.poll(async ()=> mesStr(page), {timeout: 10_000}).toBe('タイトル2');
});

test('既読スキップは未読では止まり、2周目は既読部分を飛ばす', async ({page})=> {
	// 操作はギャラリーの kidoku サンプル（SKYNovel_gallery/public/prj/kidoku）と同じ
	//	（`f`＝既読スキップ）。「未読で止める／既読は飛ばす」の判断自体はエンジンの純粋ロジックで
	//	test/ScriptEngine_autoskip.test.ts が持つ。ここで見るのはユニットでは組み立てられない
	//	**1周目の実プレイで貯まった既読が、2周目のスキップに効くこと**
	await gotoTitleAndStart(page);

	// 1周目は未読なので、[l]に来た時点でスキップが解除されて進まない
	await page.keyboard.press('f');
	await page.waitForTimeout(300);
	expect(await mesStr(page)).toBe('　一行目');

	// 1周目はオートで最後まで（[waitclick]だけクリック）
	await page.keyboard.press('a');
	await expect.poll(async ()=> mesStr(page), {timeout: 10_000}).toBe('　三行目');
	await waitIdle(page);	// 文字送り演出中に押すと「瞬時完了」に食われて停止点を1つ失う
	await pressKey(page, 'Space');
	await page.keyboard.press('a');
	await expect.poll(async ()=> mesStr(page), {timeout: 10_000}).toBe('タイトル2');

	// 2周目：同じ本文が既読になったので、skip.all無しの`f`でも[waitclick]まで一気に進む
	await page.getByText('はじめから').click();
	await waitWaitMark(page);
	await page.keyboard.press('f');
	await expect.poll(async ()=> mesStr(page), {timeout: 10_000}).toBe('　三行目');
});
