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
import {gotoSn, mesStr, pressKey, traceText, waitIdle} from './snPage';

const NS = 'bluesnovel_e2e_sys';	// prj_sys/prj.json の save_ns

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

test('修飾キー無しのEnterでは[event key=alt+enter]は引けず、読み進めキーとして働く', async ({page})=> {
	// キー名が'enter'にしかならないので[event key=alt+enter]の予約には当たらない。
	//	Enterは何もフォーカスしていない間はSpace/ArrowDown/PageDownと同じ読み進めキーとして働く
	//	（本家 Reading.fire() の`em instanceof Container`→クリック相当と同じ動き。ゲームパッドの
	//	OKボタンがフォーカス無しの状態で読み進められるようにするため。Main.tsx参照）
	await page.keyboard.press('Enter');
	await waitIdle(page);
	expect(await mesStr(page)).toBe('はじめかえた');
});

test('alt+enterは[event]の予約を発火する', async ({page})=> {
	await page.keyboard.press('Alt+Enter');
	await waitIdle(page);
	expect(await mesStr(page)).toBe('しゅうしょくキー');
});

test('全画面のときステージは画面の中央へ寄る', async ({page})=> {
	// 本家 SysBase.cvsResize() 相当。ステージは実寸固定＋transform:scaleで拡縮する作りなので、
	//	全画面要素になっても画面いっぱいには広がらない。放っておくと左上に寄るため中央へ移す。
	//	requestFullscreen()はユーザー操作が要る＝予約キーの押下（本物のキーイベント）から呼ぶ
	await page.keyboard.press('w');
	await expect.poll(async ()=> page.evaluate(()=> document.fullscreenElement !== null),
		{timeout: 5_000}).toBe(true);

	const o = await page.evaluate(()=> {
		const el = document.fullscreenElement!;
		const r = el.getBoundingClientRect();
		return {
			cx: r.left + r.width / 2, cy: r.top + r.height / 2,
			w: innerWidth, h: innerHeight,
			pos: getComputedStyle(el).position,
		};
	});
	expect(o.pos).toBe('fixed');
	expect(o.cx).toBeCloseTo(o.w / 2, 0);	// 画面の中央
	expect(o.cy).toBeCloseTo(o.h / 2, 0);

	await page.keyboard.press('w');
});

test('const.sn.key.*は修飾キーの「今の」押下状態を映す', async ({page})=> {
	// 押下表を持てるのはDOM側だけなので、Main.tsxのkeydown/keyupがエンジンへ教える。
	//	Ctrlを押したままSpaceで読み進め、その瞬間の値を[trace]で見る
	await page.keyboard.down('Control');
	await page.keyboard.press('Space');
	await expect.poll(async ()=> mesStr(page), {timeout: 5_000}).toBe('はじめかえた');
	// altは押していないのでfalse、ctrlはtrue
	expect(await traceText(page)).toContain('key:false/true');
	await page.keyboard.up('Control');
});

test('ウインドウ移動・リサイズ通知（sn_win_inf）がsys:const.sn.nativeWindow.*へ残る', async ({page})=> {
	// アプリ版はappMain_cmn #window()→IPC 'save_win_inf'→app.tsがdocumentへ中継する
	// （本テストはブラウザ版なのでElectronは無く、その中継の受け側だけを直接叩く）
	await page.evaluate(()=> document.dispatchEvent(
		new CustomEvent('sn_win_inf', {detail: {x: 12, y: 34, w: 800, h: 600}})));

	// 書き込みは最短500ms間隔にまとめられる（SaveMng.flush()）ので、pollで待つ
	await expect.poll(async ()=> {
		const raw = await page.evaluate(k=> localStorage.getItem(k), `skynovel.${NS} - sys`);
		return raw && (JSON.parse(raw) as {[k: string]: unknown})['const.sn.nativeWindow.x'];
	}).toBe(12);

	const sys = JSON.parse((await page.evaluate(k=> localStorage.getItem(k),
		`skynovel.${NS} - sys`))!) as {[k: string]: unknown};
	expect(sys['const.sn.nativeWindow.y']).toBe(34);
	expect(sys['const.sn.nativeWindow.w']).toBe(800);
	expect(sys['const.sn.nativeWindow.h']).toBe(600);
});
