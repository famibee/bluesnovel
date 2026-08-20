/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2026-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

// 派生ファイル（fn+'@'。例：der.snに対するder@.sn）の差分マージをブラウザ実機で検証する
//	（シナリオ：test/e2e/app/prj_derive/main.sn ＋ der.sn（基底）＋ der@.sn（派生））。
//	基底・派生は1行目が差分／2行目が空行（＝基底からの継承）という構成で、
//	1行目は派生側、2行目は基底側の内容がそれぞれ実行されることを見る
//	（本家 ScriptIterator.ts:1055-1093 のマージロジックのfetch経路含めた検証。
//	ScriptEngine自体はfetchしないのでユニットテストでは押さえられない）

import {expect, test} from '@playwright/test';
import {gotoSn, mesStr, pressKey, snap, waitWaitMark} from './snPage';

test.beforeEach(async ({page})=> {await gotoSn(page, 'derive')});

test('[jump fn=…]の飛び先に派生ファイルがあると、差分行は派生・空行は基底の内容で実行される', async ({page})=> {
	// main.snはjumpを挟んですぐ止まる＝gotoSn()のwaitIdle()だけだと最初の[l]を追い越しうるので、
	//	待ちマーカーで確実に足止めしてから見る（snPage.ts waitWaitMark()のコメント参照）
	await waitWaitMark(page);
	// 1行目：der@.snの「DIFF1」（派生側が優先）
	expect(await mesStr(page)).toBe('DIFF1');

	await pressKey(page, 'Space');	// 2行目は[s]＝待ちマーカーが立たない
	// 2行目：der@.snは空行なのでder.snの「[er]BASE2」（基底から継承）
	expect(await mesStr(page)).toBe('BASE2');

	const {wait} = await snap(page);
	expect(wait).toBeNull();
});
