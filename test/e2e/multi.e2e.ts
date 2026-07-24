/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2026-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

// 複数ファイル（[call fn=…]／[jump fn=…]）をブラウザ実機で検証する
//	（シナリオ：test/e2e/app/prj_multi/main.sn ＋ sub.sn）。
//	ScriptEngineはfetchしないので、実際のファイル読込と切替はScriptMngが担当する。
//	その非同期の往復が画面まで正しく繋がるかは、ユニットテストでは押さえられない

//	なお、このシナリオの停止点に着いたかの判定には expect.poll を使う。
//	ファイル切替はfetchを挟むため、進行の途中でも「ストアもDOMも一致していて文字送りも終わっている」
//	瞬間（[er]直後のロード待ちなど）が生まれる。waitIdle()はそれを停止点と区別できないので、
//	「その表示に落ち着くまで待つ」形にして取りこぼしを防ぐ

import {expect, test} from '@playwright/test';
import {gotoSn, mesStr, pressKey, snap} from './snPage';

test.beforeEach(async ({page})=> {await gotoSn(page, 'multi')});

test('[call fn=…]で別ファイルのサブルーチンを呼び、[return]で呼び出し元へ戻る', async ({page})=> {
	expect(await mesStr(page)).toBe('main1');

	await pressKey(page, 'Space');
	// sub.snの*greetを実行してからmain.snの続きへ戻る
	await expect.poll(async ()=> mesStr(page)).toBe('sub1main2');
});

test('別ファイルで定義したマクロが呼べる／変数はファイルを跨いで保持される', async ({page})=> {
	await pressKey(page, 'Space');
	await pressKey(page, 'Space');

	// [よぶ]はsub.sn側で定義したマクロ。100はmain.snで代入したgame:hp
	await expect.poll(async ()=> mesStr(page)).toBe('macro:100');
});

test('[jump fn=…]で別ファイルへ移動して停止する', async ({page})=> {
	await pressKey(page, 'Space');
	await pressKey(page, 'Space');
	await pressKey(page, 'Space');

	await expect.poll(async ()=> mesStr(page)).toBe('sub2');

	const {wait} = await snap(page);
	expect(wait).toBeNull();	// [s]なので待ちマーカーは出ない
});
