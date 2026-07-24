/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2026-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

// [button]のjump／call=trueの検証（シナリオ：e2e/app/prj_button/main.sn）
//	ユニットテスト（test/ScriptEngine*.test.ts）では追えない、
//	「クリックイベントがStageの読み進めへ伝播しないこと」までブラウザ上で確かめるのが目的。

import {expect, test} from '@playwright/test';
import {gotoSn, mesStr, pressKey, snap, waitIdle} from './snPage';

test.beforeEach(async ({page})=> {await gotoSn(page, 'button')});

test('[button]が文字レイヤ上に並ぶ', async ({page})=> {
	expect(await mesStr(page)).toBe('選んでください。');

	const {aLay} = await snap(page);
	const mes = aLay.find(l=> l.nm === 'mes');
	expect(mes?.aBtn).toEqual([
		{nm: 'btn_call', text: 'サブルーチンを呼ぶ', label: '*sub', call: true},
		{nm: 'btn_jump', text: 'ジャンプする', label: '*goal', call: false},
		{nm: 'btn_fcall', text: '別ファイルを呼ぶ', label: '*fcall', call: true, fn: 'sub2'},
		{nm: 'btn_fjump', text: '別ファイルへ飛ぶ', label: '*fjump', call: false, fn: 'sub2'},
	]);
	await expect(page.getByText('サブルーチンを呼ぶ')).toBeVisible();
	await expect(page.getByText('ジャンプする')).toBeVisible();
});

test('[button call=true]→[return]で、[l]のイベント待ち状態へ戻る', async ({page})=> {
	// 回帰テスト（2026-07-23修正）：[return]の戻り先を停止点そのものにしたことで、
	//	サブルーチンから戻ったあと「次へ進んでしまう」のではなく[l]待ちが再開する
	await page.getByText('サブルーチンを呼ぶ').click();
	await waitIdle(page);

	expect(await mesStr(page)).toBe('選んでください。＋サブ実行');

	const {wait, isReadBack} = await snap(page);
	expect(wait).toEqual({nm: 'mes', kind: 'l'});	// [l]待ちへ戻っている
	expect(isReadBack).toBe(false);					// ボタンは「読み進め」扱いにしない
	await expect(page.getByText('🩷')).toBeVisible();
});

test('[button]クリックで1回しか進まない（Stageの読み進めへ伝播しない）', async ({page})=> {
	// BtnLayerのstopPropagation()が効かないと、Stageのdiv onClick（＝next()）も
	//	同時に発火して二重に進んでしまう。文字列の完全一致で検出する。
	await page.getByText('サブルーチンを呼ぶ').click();
	await waitIdle(page);
	expect(await mesStr(page)).toBe('選んでください。＋サブ実行');

	// [l]待ちへ戻っているので、押すたびに1回分ずつ積み上がる
	await page.getByText('サブルーチンを呼ぶ').click();
	await waitIdle(page);
	expect(await mesStr(page)).toBe('選んでください。＋サブ実行＋サブ実行');
});

test('[button]（call指定なし）はジャンプし、戻ってこない', async ({page})=> {
	await page.getByText('ジャンプする').click();
	await waitIdle(page);

	expect(await mesStr(page)).toBe('選んでください。＋ジャンプ先');

	const {wait} = await snap(page);
	expect(wait).toBeNull();	// ジャンプ先の[s]で停止（マーカーなし）
});

test('ボタンを押さずキーで進めた場合は、ボタンと無関係に次の停止点へ進む', async ({page})=> {
	await pressKey(page, 'Space');	// [l]の次＝[s]まで

	expect(await mesStr(page)).toBe('選んでください。＋そのまま進んだ。');
	expect((await snap(page)).wait).toBeNull();
});

// ============ [button fn=…]（別ファイルのラベルへ飛ぶボタン） ============

test('[button fn=… call=true]で別ファイルのサブルーチンを呼び、[l]のイベント待ちへ戻る', async ({page})=> {
	await page.getByText('別ファイルを呼ぶ').click();

	// sub2.snの*fcallを実行してから、mainの[l]へ戻る（読み進めてしまわない）
	await expect.poll(async ()=> mesStr(page)).toBe('選んでください。＋別ファイルのサブ');

	const {wait, isReadBack} = await snap(page);
	expect(wait).toEqual({nm: 'mes', kind: 'l'});
	expect(isReadBack).toBe(false);
});

test('[button fn=…]で別ファイルのラベルへジャンプする', async ({page})=> {
	await page.getByText('別ファイルへ飛ぶ').click();

	await expect.poll(async ()=> mesStr(page)).toBe('選んでください。＋別ファイルへジャンプ');

	const {wait} = await snap(page);
	expect(wait).toBeNull();	// 飛び先は[s]
});
