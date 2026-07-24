/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2026-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

// しおり・システム系タグ（シナリオ：test/e2e/app/prj_sys/main.sn）。
//	どのアクションを積むかは test/ScriptEngine_sys.test.ts が受け持つので、
//	ここで見るのはブラウザ側の結び付きだけ：
//	・[title]がdocument.titleになること
//	・[toggle_full_screen key=…]の予約キーが全画面要求を切り替えること
//	・修飾キー付きのキー名（alt+enter）で[event]が引けること

import {expect, test} from '@playwright/test';
import {gotoSn, mesStr, pressKey, waitIdle} from './snPage';

test.beforeEach(async ({page})=> {await gotoSn(page, 'sys')});

test('[title]がブラウザタブのタイトルになる', async ({page})=> {
	// prj.jsonのbook.title（"E2E sys"）で始まり、[title]で上書きされる
	await expect.poll(async ()=> page.title(), {timeout: 5_000}).toBe('さいしょ');

	await pressKey(page, 'Space');
	expect(await mesStr(page)).toBe('はじめかえた');
	await expect.poll(async ()=> page.title(), {timeout: 5_000}).toBe('あとから');
});

test('[toggle_full_screen key=…]で予約したキーが全画面要求を切り替える', async ({page})=> {
	// store.fullScrは「全画面にしたい」という要求（実際にそうなったかはブラウザ次第）。
	//	実フルスクリーンAPIはヘッドレスで当てにならないので、ここでは要求が立つことだけを見る
	const fullScr = async ()=> page.evaluate(
		()=> (globalThis as any).__sn.store.getState().fullScr as boolean);
	expect(await fullScr()).toBe(false);

	await page.keyboard.press('w');
	await expect.poll(fullScr, {timeout: 5_000}).toBe(true);

	await page.keyboard.press('w');
	await expect.poll(fullScr, {timeout: 5_000}).toBe(false);

	// 予約キーは読み進めには使われない（[event]と同じくそこで打ち止め）
	expect(await mesStr(page)).toBe('はじめ');
});

test('修飾キー無しのEnterでは[event key=alt+enter]は引けない', async ({page})=> {
	// キー名が'enter'にしかならないので予約に当たらない。
	//	Enterは読み進めキー（Space/ArrowDown/PageDown）でもないので、何も起きない
	await page.keyboard.press('Enter');
	await waitIdle(page);
	expect(await mesStr(page)).toBe('はじめ');
});

test('alt+enterは[event]の予約を発火する', async ({page})=> {
	await page.keyboard.press('Alt+Enter');
	await waitIdle(page);
	expect(await mesStr(page)).toBe('しゅうしょくキー');
});
