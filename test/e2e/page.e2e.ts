/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2026-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

// [page to=…]による読み戻り（シナリオ：test/e2e/app/prj_page/main.sn）。
//	どのページへ動くかの勘定は test/PageLog.test.ts が持つので、ここで見るのは
//	**しおりを戻してそのページを演じ直す経路**が本当に繋がっているか＝
//	スクリプトのfetchと非同期の復元を通した結果で、ブラウザが要る部分。
//
//	テンプレと同じく[event]で予約したキーから *page ラベルを呼ぶ形にしてある。
//	組み込みのPageUp/PageDown（Main.tsx）は readback.e2e.ts が見ている。

import {expect, test} from '@playwright/test';
import {gotoSn, mesStr, pressKey, snap, txtBoxStyle, waitIdle} from './snPage';

test.beforeEach(async ({page})=> {await gotoSn(page, 'page')});

// [s]（最終停止点）まで読み進める
async function readToEnd(page: import('@playwright/test').Page) {
	for (let i = 0; i < 3; ++i) await pressKey(page, 'Space');
	expect(await mesStr(page)).toBe('よん');
}

test('[page to=prev/next]で前後のページへ動く', async ({page})=> {
	await readToEnd(page);

	await pressKey(page, 'PageUp');		// *page → [page to=prev]
	expect(await mesStr(page)).toBe('さん');
	expect((await snap(page)).isReadBack).toBe(true);

	await pressKey(page, 'PageUp');
	expect(await mesStr(page)).toBe('に');

	await pressKey(page, 'PageDown');	// [page to=next]
	expect(await mesStr(page)).toBe('さん');
	expect((await snap(page)).isReadBack).toBe(true);
});

test('[page to=oldest]で先頭、[page to=exit]で最新へ戻る', async ({page})=> {
	await readToEnd(page);

	await pressKey(page, 'Home');	// [page to=oldest]
	expect(await mesStr(page)).toBe('いち');
	expect((await snap(page)).isReadBack).toBe(true);

	await pressKey(page, 'End');	// [page to=exit]
	expect(await mesStr(page)).toBe('よん');
	expect((await snap(page)).isReadBack).toBe(false);	// 最新＝読み戻り終了
});

test('[page style=…]が読み戻り中の本文の見た目になる', async ({page})=> {
	// 本家 setAllStyle2TxtLay(styPaging)。既定は黄色＋黒フチだが、
	//	シナリオが[page style=…]で変えられる（**[lay style=…]より後に当てる**）
	await readToEnd(page);
	expect(await txtBoxStyle(page, 'color')).not.toBe('rgb(0, 128, 0)');

	await pressKey(page, 'PageUp');
	expect(await txtBoxStyle(page, 'color')).toBe('rgb(0, 128, 0)');

	await pressKey(page, 'End');
	expect(await txtBoxStyle(page, 'color')).not.toBe('rgb(0, 128, 0)');
});

test('[page to=load]は見ているページから読み進められる', async ({page})=> {
	// **ここが「演じ直す」方式でなければ作れない**：エンジンの位置が戻ったページに
	//	繋がっているので、そのまま次の停止点へ進める（本家 loadFromMark()）
	await readToEnd(page);
	await pressKey(page, 'PageUp');
	await pressKey(page, 'PageUp');
	expect(await mesStr(page)).toBe('に');

	await pressKey(page, 'Enter');	// [page to=load]
	expect((await snap(page)).isReadBack).toBe(false);	// 読み戻りは終わっている

	await pressKey(page, 'Space');	// ここから読み進められる
	expect(await mesStr(page)).toBe('さん');
});

test('端まで来たら動かない', async ({page})=> {
	// 最初の停止点でPageUpしても何も起きない（本家も pos===0 なら false を返して終わり）
	expect(await mesStr(page)).toBe('いち');
	await pressKey(page, 'PageUp');
	await waitIdle(page);

	expect(await mesStr(page)).toBe('いち');
	expect((await snap(page)).isReadBack).toBe(false);
});
