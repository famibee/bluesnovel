/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2026-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

// HTMLフレーム（シナリオ：test/e2e/app/prj_frame/main.sn）。
//	どのアクションを積むかは test/ScriptEngine_frame.test.ts が持っているので、
//	ここで見るのは「本物のiframeを読み込んで中のvar変数を読み書きできるか」——
//	つまりブラウザでしか確かめられない部分だけ。
//
//	このシナリオは[add_frame]と[let_frame]でstep()の途中から一旦返る（DOMを触った結果を
//	組み込み変数へ書き戻してから続けるため）。その隙間は「ストアもDOMも一致していて
//	文字送りも終わっている」状態に見えるので、waitIdle()だけでは停止点と区別できない。
//	複数ファイル（multi.e2e.ts）と同じ事情なので、表示の確定はexpect.pollで待つ

import {expect, test, type Page} from '@playwright/test';
import {gotoSn, mesStr, traceText, waitIdle} from './snPage';

test.beforeEach(async ({page})=> {await gotoSn(page, 'frame')});

// フレーム内のvar変数を覗く（srcdocで作るiframeは同一オリジンなので触れる）
const frmVar = (page: Page, nm: string)=> page.evaluate(
	nm=> ((document.getElementById('yesno') as HTMLIFrameElement)
		.contentWindow as unknown as Record<string, unknown>)[nm], nm);
// iframeのstyle.display。position:absoluteなので算出値はinlineでもblockになる（CSSのblockification）。
//	本家が書くのは'inline'なので、書かれた値そのものを見る
const frmDisplay = (page: Page)=> page.evaluate(
	()=> (document.getElementById('yesno') as HTMLIFrameElement | null)?.style.display ?? '(no frame)');

const seeText = async (page: Page, s: string)=> {
	await expect.poll(async ()=> mesStr(page), {timeout: 10_000}).toBe(s);
};
// 読み進めて、その表示に落ち着くまで待つ。**押す前のwaitIdle()が要る**：
//	文字送り演出の最中に押すと「瞬時完了」として消費され、進行1回ぶんが失われる（Main.tsx next()）
const advance = async (page: Page, to: string)=> {
	await waitIdle(page);
	await page.keyboard.press('Space');
	await seeText(page, to);
};


test('[add_frame]は読み込み終えてから進み、組み込み変数が立つ', async ({page})=> {
	await seeText(page, 'よみこんだ');

	// 読み込みを待たずに進んでいたら、この時点でiframeがまだ無い
	const box = await page.locator('#yesno').evaluate(e=> {
		const s = getComputedStyle(e);
		return {w: s.width, h: s.height};
	});
	expect(box).toEqual({w: '400px', h: '200px'});
	expect(await frmDisplay(page)).toBe('none');	// visible=false

	// 本家と同じ組み込み変数一式（エンジンの変数はストアに無いので、シナリオ側で[trace]して見る）
	expect(await traceText(page)).toContain('frm:true/400/false');
});

test('[set_frame]がフレーム内のvar変数へ入り、[let_frame function=true]が関数を呼ぶ', async ({page})=> {
	await seeText(page, 'よみこんだ');
	expect(await frmVar(page, 'val_dic')).toBe('');
	expect(await frmVar(page, 'val_cnt')).toBe(0);

	await advance(page, 'ひょうじ');

	expect(await frmVar(page, 'val_dic')).toBe('こんにちは');
	expect(await frmVar(page, 'val_cnt')).toBe(1);	// val2ctrl()が呼ばれた
	// フレーム側のJSが描画した結果
	expect(await page.frameLocator('#yesno').locator('#mes').textContent()).toBe('こんにちは');
});

test('[frame visible=true]で表示される', async ({page})=> {
	await seeText(page, 'よみこんだ');
	expect(await frmDisplay(page)).toBe('none');

	await advance(page, 'ひょうじ');
	expect(await frmDisplay(page)).toBe('inline');
});

test('[let_frame]の戻り値は同じ停止点までの間に読める', async ({page})=> {
	// アクションの適用はstep()が返った後なので、[let_frame]では一旦返って組み込み変数へ
	//	書き戻してから続ける。そうしないと同じstep内では古い値のままになる
	await seeText(page, 'よみこんだ');
	await advance(page, 'ひょうじ');
	await advance(page, 'とれた');

	expect(await traceText(page)).toContain('ret:ctrl:こんにちは');
});

test(`[event key='dom=…']でフレーム内のボタンがラベルへ飛ばせる`, async ({page})=> {
	await seeText(page, 'よみこんだ');
	await advance(page, 'ひょうじ');	// フレームが表示された
	await waitIdle(page);

	await page.frameLocator('#yesno').locator('#ok').click();
	await seeText(page, 'おっけー');
});

test(`[event key='dom=…']はセレクタの大小文字を保つ（#close）`, async ({page})=> {
	await seeText(page, 'よみこんだ');
	await advance(page, 'ひょうじ');
	await waitIdle(page);

	await page.frameLocator('#yesno').locator('#close').click();
	await seeText(page, 'きゃんせる');
});
