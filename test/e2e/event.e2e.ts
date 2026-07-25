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
import {SEL_FORE, gotoSn, mesStr, pressKey, pressKeyToWaitMark, snap, waitIdle} from './snPage';

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

test('[event key=rightclick]は右クリック（contextmenu）で発火する', async ({page})=> {
	// 本家 EventMng.ts:145。右ボタンはclickイベントに来ないのでcontextmenuで拾う。
	//	テンプレの枠（アルバム・設定・履歴・確認ダイアログ）はこれで自分を閉じる
	expect(await mesStr(page)).toBe('はじめ');

	await page.locator(SEL_FORE).click({button: 'right'});
	await waitIdle(page);
	expect(await mesStr(page)).toBe('はじめみぎおした');
});

test('右クリックにも修飾キーが前置される', async ({page})=> {
	// 本家 EventMng.ts:355 #modKey4MouseEvent。alt+ ctrl+ meta+ shift+ の順
	await page.locator(SEL_FORE).click({button: 'right', modifiers: ['Shift']});
	await waitIdle(page);
	expect(await mesStr(page)).toBe('はじめシフトみぎおした');
});

test('右クリックはブラウザのメニューを出さない（予約が無くても）', async ({page})=> {
	// 本家も preventDefault() する。メニューが出るとゲーム画面の上に居座って操作を邪魔する
	const defaultPrevented = await page.evaluate(()=> new Promise<boolean>(re=> {
		document.addEventListener('contextmenu', e=> re(e.defaultPrevented), {once: false});
		document.querySelector('#skynovel')!.dispatchEvent(
			new MouseEvent('contextmenu', {bubbles: true, cancelable: true}));
	}));
	expect(defaultPrevented).toBe(true);
});

