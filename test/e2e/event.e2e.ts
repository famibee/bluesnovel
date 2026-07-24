/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2026-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

// [event]（イベント予約）が実際のキー入力・クリックと結びつくかの検証
//	（シナリオ：test/e2e/app/prj_event/main.sn）。
//	予約表そのもの（ローカル/グローバル・[call]をまたぐ退避と復元・[clear_event]）は
//	ユニットテスト（test/ScriptEngine_event.test.ts）が持っているので、ここでは重ねない。
//	ここで見るのはMain.tsxの取り決めだけ＝KeyboardEvent.keyの小文字で予約を引くこと、
//	クリックは'click'で引くこと、そして予約が無いキーは従来どおり読み進めになること

import {expect, test} from '@playwright/test';
import {gotoSn, mesStr, pressKey, pressKeyToWaitMark, snap} from './snPage';

test.beforeEach(async ({page})=> {await gotoSn(page, 'event')});

test('予約したキーは読み進めではなく、予約先のラベルへ飛ぶ', async ({page})=> {
	expect(await mesStr(page)).toBe('はじめ');

	await pressKey(page, 'Enter');	// [event key=enter label=*jumped]

	expect(await mesStr(page)).toBe('はじめとんだ');
	expect((await snap(page)).wait).toBeNull();	// 飛び先は[s]
});

test('予約が無いキーは従来どおり読み進める', async ({page})=> {
	await pressKey(page, 'Space');	// 予約していない＝[l]の次へ

	expect(await mesStr(page)).toBe('はじめすすんだ');
});

test('予約したクリックは読み進めではなく、予約先のラベルへ飛ぶ', async ({page})=> {
	// 文字レイヤをクリック＝Stageのdiv onClick（＝読み進め）へ伝播する経路。
	//	予約があるので読み進めではなく予約先へ飛ぶ
	await page.getByText('はじめ').click();

	await expect.poll(async ()=> mesStr(page)).toBe('はじめおした');
});

test('call=trueの予約は、[return]で元の[l]待ちへ戻る', async ({page})=> {
	await pressKeyToWaitMark(page, 'Escape');	// [event key=escape label=*called call=true]

	expect(await mesStr(page)).toBe('はじめよばれた');
	expect((await snap(page)).wait).toEqual({nm: 'mes', kind: 'l'});
});
