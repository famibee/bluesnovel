/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2026-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

// [set_focus]（シナリオ：test/e2e/app/prj_frame/main.sn の後半）。
//	どのアクションを積むかは test/ScriptEngine_focus.test.ts が持っているので、
//	ここで見るのは「本当にフォーカスが動くか」だけ。
//	フォーカスの輪に入る経路は3つ（FocusMng.ts参照）で、このシナリオはその全部を使う：
//	・[event key='dom=…'] の最初の1件（#ok / #close）
//	・[set_focus add='dom=…']（#close。既に居るので重複登録されない）
//	・[button]（表示中ずっと。ボタン1 / ボタン2）

import {expect, test, type Page} from '@playwright/test';
import {gotoSn, mesStr, waitIdle} from './snPage';

test.beforeEach(async ({page})=> {await gotoSn(page, 'frame')});

const seeText = async (page: Page, s: string)=> {
	await expect.poll(async ()=> mesStr(page), {timeout: 10_000}).toBe(s);
};
const advance = async (page: Page, to: string)=> {
	await waitIdle(page);
	await page.keyboard.press('Space');
	await seeText(page, to);
};
// 今フォーカスされているものの見分け（フレーム内ならそのid、ステージ上のボタンならその文字）
const focused = (page: Page)=> page.evaluate(()=> {
	const a = document.activeElement;
	if (a instanceof HTMLIFrameElement) {
		const b = a.contentDocument?.activeElement;
		return b && b !== a.contentDocument?.body ? `frm:${b.id}` : '(frame)';
	}
	return a && a !== document.body ? `btn:${a.textContent ?? ''}` : '(none)';
});

// [set_focus]の並ぶところまで進める
const toFocusScene = async (page: Page)=> {
	await seeText(page, 'よみこんだ');
	await advance(page, 'ひょうじ');
	await advance(page, 'とれた');
	await advance(page, 'ふぉーかす');
	await waitIdle(page);
};


test('[set_focus to=next]が輪を順に巡る', async ({page})=> {
	await toFocusScene(page);
	expect(await focused(page)).toBe('(none)');

	// 登録順：[event]の#ok → [event]の#close → [button]ボタン1 → ボタン2
	await page.keyboard.press('ArrowRight');
	await expect.poll(async ()=> focused(page), {timeout: 5_000}).toBe('frm:ok');

	await page.keyboard.press('ArrowRight');
	await expect.poll(async ()=> focused(page), {timeout: 5_000}).toBe('frm:close');

	await page.keyboard.press('ArrowRight');
	await expect.poll(async ()=> focused(page), {timeout: 5_000}).toBe('btn:ボタン1');

	await page.keyboard.press('ArrowRight');
	await expect.poll(async ()=> focused(page), {timeout: 5_000}).toBe('btn:ボタン2');

	// 一周して先頭へ戻る
	await page.keyboard.press('ArrowRight');
	await expect.poll(async ()=> focused(page), {timeout: 5_000}).toBe('frm:ok');
});

test('[set_focus to=prev]は逆順に巡る', async ({page})=> {
	await toFocusScene(page);

	// 誰も選んでいない状態からのprevは末尾へ
	await page.keyboard.press('ArrowLeft');
	await expect.poll(async ()=> focused(page), {timeout: 5_000}).toBe('btn:ボタン2');

	await page.keyboard.press('ArrowLeft');
	await expect.poll(async ()=> focused(page), {timeout: 5_000}).toBe('btn:ボタン1');
});

test('[set_focus to=null]でフォーカスが外れる', async ({page})=> {
	await toFocusScene(page);
	await page.keyboard.press('ArrowRight');
	await expect.poll(async ()=> focused(page), {timeout: 5_000}).toBe('frm:ok');

	await page.keyboard.press('Escape');
	await expect.poll(async ()=> focused(page), {timeout: 5_000}).toBe('(none)');
});

test('フォーカス中の[button]はEnterで押せる', async ({page})=> {
	await toFocusScene(page);
	for (let i = 0; i < 3; ++i) {
		await page.keyboard.press('ArrowRight');
		await page.waitForTimeout(50);
	}
	await expect.poll(async ()=> focused(page), {timeout: 5_000}).toBe('btn:ボタン1');

	await page.keyboard.press('Enter');
	await seeText(page, 'ぼたん1');
});
