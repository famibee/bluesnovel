/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2026-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

// [dump_script]（シナリオ：test/e2e/app/prj_dumpscript/main.sn）。
//	エンジンが dumpScript アクションを積むところは test/ScriptEngine_sys.test.ts が持つ。
//	ここは ScriptMng が globalThis 上のコールバック（set_ed / break_ed）を実際に解決して
//	停止・再開のたびに呼ぶところ——ブラウザ（globalThis）が要る部分だけ——を見る。
//	set_ed / break_ed のスパイは test/e2e/app/main.ts が生やし、__sn.dumpSet()/dumpBreak() で覗く。
//	sn_gallery/index.html の埋め込み ACE エディタ連携がこれと同じ関数名・同じ役割。

import {expect, test, type Page} from '@playwright/test';
import {gotoSn, mesStr, pressKey} from './snPage';

test.beforeEach(async ({page})=> {await gotoSn(page, 'dumpscript')});

const dumpSet = (page: Page)=> page.evaluate(()=> (globalThis as any).__sn.dumpSet() as string[]);
const dumpBreak = (page: Page)=> page.evaluate(
	()=> (globalThis as any).__sn.dumpBreak() as {ln: number; goto: boolean}[]);

const seeText = async (page: Page, s: string)=> {
	await expect.poll(async ()=> mesStr(page), {timeout: 10_000}).toBe(s);
};

test('set_fnc へスクリプト全文が1回だけ渡る', async ({page})=> {
	await seeText(page, 'いちぎょうめ');

	const set0 = await dumpSet(page);
	expect(set0).toHaveLength(1);
	expect(set0[0]).toContain('さんぎょうめ[s]');	// トークン列から復元した全文

	// 同じスクリプト内で読み進めても set_fnc は再送されない（本家 #fnLastBreak 相当）
	await pressKey(page, 'Space');
	await seeText(page, 'にぎょうめ');
	await pressKey(page, 'Space');
	await seeText(page, 'さんぎょうめ');
	expect(await dumpSet(page)).toHaveLength(1);
});

test('停止のたびに break_fnc(行, goto=true)、再開で goto=false が来る', async ({page})=> {
	await seeText(page, 'いちぎょうめ');

	// 初回：[dump_script]登録時＋[p]停止（本家 Main.ts:212）。どちらも goto=true で
	//	いちぎょうめ[p] の行（3行目）を指す
	const b0 = await dumpBreak(page);
	expect(b0.length).toBeGreaterThan(0);
	expect(b0.at(-1)).toEqual({ln: 3, goto: true});
	expect(b0.every(v=> v.goto)).toBe(true);	// まだ再開していない
	// ワイルドカード[call fn=ext_*]展開直後（aLNum=NaN）に登録時通知が走っても、
	//	NaN 行は渡さない（次の実停止点で正しい行が来る）
	expect(b0.every(v=> Number.isFinite(v.ln))).toBe(true);

	await pressKey(page, 'Space');
	await seeText(page, 'にぎょうめ');
	const b1 = await dumpBreak(page);
	expect(b1.some(v=> ! v.goto)).toBe(true);	// 再開通知（本家 Main.ts:205）が入った
	expect(b1.at(-1)).toEqual({ln: 4, goto: true});	// にぎょうめ[p] の行

	await pressKey(page, 'Space');
	await seeText(page, 'さんぎょうめ');
	expect((await dumpBreak(page)).at(-1)).toEqual({ln: 5, goto: true});	// さんぎょうめ[s] の行
});
