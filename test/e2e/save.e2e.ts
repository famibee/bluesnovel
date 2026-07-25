/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2026-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

// しおり（セーブ・ロード）（シナリオ：test/e2e/app/prj_save/main.sn）。
//	ブラウザが要る理由は3つ：保存先がlocalStorage、しおりの中身にストアの表裏ページが含まれる、
//	[load]がスクリプトの読み直し（fetch）を挟む。
//	エンジン側（属性の解釈・save:変数とifスタックの出し入れ）は test/ScriptEngine_save.test.ts、
//	SaveMng単体（しおり表・bookmark.json）は test/SaveMng.test.ts が見ている。

import {expect, test} from '@playwright/test';
import {gotoSn, mesStr, pressKeyToWaitMark} from './snPage';

const NS = 'bluesnovel_e2e_save';	// prj_save/prj.json の save_ns
const KEY_MARK = `skynovel.${NS} - mark`;

// localStorageを読む（保存されたか＝ブラウザでしか確かめられない部分）
const ls = (page: import('@playwright/test').Page, key: string)=>
	page.evaluate(k=> localStorage.getItem(k), key);

test.beforeEach(async ({page})=> {
	// 前のテストのしおりが残っていると[load]の結果が変わるので、毎回まっさらから
	await page.addInitScript(()=> {localStorage.clear()});
	await gotoSn(page, 'save');
});

test('[save]→[load]で変数・再開位置・画面が戻る', async ({page})=> {
	expect(await mesStr(page)).toBe('100');			// [record_place]の直後

	await pressKeyToWaitMark(page, 'Space');
	expect(await mesStr(page)).toBe('50');			// hpを書き換えた後

	await pressKeyToWaitMark(page, 'Space');
	expect(await mesStr(page)).toBe('ほぞん');		// [save place=1]

	await pressKeyToWaitMark(page, 'Space');
	expect(await mesStr(page)).toBe('かきだし');	// [export]

	// [load place=1]：[record_place]の位置（hp=100の直後）へ戻る
	await pressKeyToWaitMark(page, 'Space');
	expect(await mesStr(page)).toBe('100');
});

test('[save]と[copybookmark]がlocalStorageへ残る', async ({page})=> {
	expect(await ls(page, KEY_MARK)).toBe('{}');	// まだ何も保存していない

	await pressKeyToWaitMark(page, 'Space');
	await pressKeyToWaitMark(page, 'Space');	// [save place=1]＋[copybookmark from=1 to=2]

	// **書き込みは最短500ms間隔にまとめられる**（SaveMng.flush()。本家 SysBase.flush()と同じ）ので、
	//	直後に読むとまだ前回の内容のことがある
	await expect.poll(async ()=> Object.keys(JSON.parse((await ls(page, KEY_MARK))!) as object).sort())
		.toEqual(['1', '2']);

	const mark = JSON.parse((await ls(page, KEY_MARK))!) as {
		[place: string]: {json: {text: string}; hSave: {[k: string]: unknown}; sPages: string}};
	expect(mark['1']!.json.text).toBe('テスト');	// [save]の属性が見出しになる
	expect(mark['1']!.hSave.hp).toBe(100);		// [record_place]時点の値
	// 表裏ページも丸ごと入っている（[load]がstore.replace()へ渡すもの）
	expect(JSON.parse(mark['1']!.sPages)).toHaveProperty('foreIdx');
	// 複写は同じ中身
	expect(mark['2']!.json.text).toBe('テスト');
});

test('既読情報が停止点ごとにlocalStorageへ保存される', async ({page})=> {
	// 本家同様、停止点で吐き出す（毎トークンでは重すぎるため）。書き込みは500msにまとめられる
	await expect.poll(async ()=>
		Object.keys(JSON.parse((await ls(page, `skynovel.${NS} - kidoku`))!) as object))
		.toContain('main');
});

test('[export]がプレイデータ（.swpd）をダウンロードさせる', async ({page})=> {
	await pressKeyToWaitMark(page, 'Space');
	await pressKeyToWaitMark(page, 'Space');	// [save]

	const dl = page.waitForEvent('download');
	await pressKeyToWaitMark(page, 'Space');	// [export]

	const d = await dl;
	// 暗号化は未対応なので本家の非暗号化と同じ接頭辞が付く
	expect(d.suggestedFilename()).toMatch(new RegExp(`^no_crypto_${NS}[\\d_-]+\\.swpd$`));

	const {readFileSync} = await import('node:fs');
	const o = JSON.parse(readFileSync(await d.path(), 'utf8')) as {
		sys: {[k: string]: unknown}; mark: {[k: string]: unknown}; kidoku: {[k: string]: unknown}};
	expect(o.sys['const.sn.cfg.ns']).toBe(NS);	// [import]で別ゲームを弾くための目印
	expect(Object.keys(o.mark)).toContain('1');
	expect(Object.keys(o.kidoku)).toContain('main');
});
