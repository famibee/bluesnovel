/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2026-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

// ＢＧＭ・効果音（シナリオ：test/e2e/app/prj_snd/main.sn）。
//	属性→アクションの写像は test/ScriptEngine_snd.test.ts が持っているので、ここで見るのは
//	「実際にAudioContextでデコード・再生でき、待ち合わせが本物の時間経過で解決するか」だけ：
//	・[playse]（join=true既定）がデコード完了まで、[ws]が再生終了まで進行を止めること
//	・[playse join=false]は投げっぱなしで即座に進むこと
//	・[fadebgm]は待たず、[wb]がフェード完了まで進行を止めること
//	・デコード完了前に[stopse]してもハングしない・エラーにならないこと（回帰：
//	　skynovel_esm調査で見つかった状態機械の不備と同族の「待ちが解決されず詰む」系のバグを
//	　この設計（1バッファ=1インスタンス、停止=破棄）が構造的に防げているかの確認）
//	・鳴っていない／ループ中のバッファへの[ws]/[wl]/[wf]は待たずに進むこと（tag.htmlの明記通り）
//	・同じバッファに同じファイルの再生要求が重なったら、頭から鳴り直さないこと（回帰）
//	・↑の対象がフェード中でも、フェードを壊さず継続すること（回帰）
//	・[button clickse=/enterse=/leavese=]が実際にクリック・ホバー・ホバー解除で効果音を鳴らすこと
//	・[button enabled=false]は効果音も鳴らさないこと（不具合2：tmp_blues theme/title.sn:11
//	　[button clickse=&sysse_ok2_long]が鳴らなかった件の回帰）

import {expect, test} from '@playwright/test';
import {gainNodeCount, gotoSn, mesStr, pressKey, traceText, waitIdle} from './snPage';

test.beforeEach(async ({page})=> {await gotoSn(page, 'snd')});

test('[playse]はデコード完了まで、[ws]は再生終了まで進行を止める', async ({page})=> {
	// ページを開いた直後はまだ[ws]で待っている（クリック無しで自然終了を待つ）
	expect(await mesStr(page)).toBe('');

	await expect.poll(async ()=> mesStr(page), {timeout: 5_000}).toBe('さいせいしゅうりょう');
});

test('[playse join=false]は投げっぱなしで即座に進む', async ({page})=> {
	await expect.poll(async ()=> mesStr(page), {timeout: 5_000}).toBe('さいせいしゅうりょう');
	await waitIdle(page);

	await pressKey(page, 'Space');	// [playse join=false]は待たないので即座に次の[p]まで進む
	expect(await mesStr(page)).toBe('すぐすすむ');
});

test('[fadebgm]は待たず、[wb]がフェード完了（0.6秒）まで進行を止める', async ({page})=> {
	await expect.poll(async ()=> mesStr(page), {timeout: 5_000}).toBe('さいせいしゅうりょう');
	await waitIdle(page);
	await pressKey(page, 'Space');
	expect(await mesStr(page)).toBe('すぐすすむ');

	const t0 = Date.now();
	await page.keyboard.press('Space');	// [playbgm][fadebgm][wb]。クリックはこの1回だけ
	// [p]で前ページの文字がクリアされるので、届くまでは空のまま
	expect(await mesStr(page)).toBe('');

	await expect.poll(async ()=> mesStr(page), {timeout: 5_000}).toBe('ふぇーどしゅうりょう');
	// 0.6秒のフェードなので、それより十分短い時間では終わらない（=本当に待っていたことの確認）
	expect(Date.now() - t0).toBeGreaterThanOrEqual(500);
});

// 前3シーンを1回の操作列で通過する（以降のテストの前提合わせ）
async function toStoppedScene(page: import('@playwright/test').Page) {
	await expect.poll(async ()=> mesStr(page), {timeout: 5_000}).toBe('さいせいしゅうりょう');
	await waitIdle(page);
	await pressKey(page, 'Space');
	await page.keyboard.press('Space');
	await expect.poll(async ()=> mesStr(page), {timeout: 5_000}).toBe('ふぇーどしゅうりょう');
	await waitIdle(page);
}

test('デコード完了前に[stopse]してもハングせずエラーにもならない（回帰）', async ({page})=> {
	await toStoppedScene(page);

	await pressKey(page, 'Space');	// [playse buf=BGM loop=true join=false][stopse buf=BGM]
	expect(await mesStr(page)).toBe('とめた');
	expect(await traceText(page)).toBe('');	// エラー表示（myTrace 'E'/'ET'）が出ていない
});

test('鳴っていないバッファへの[ws]/[wf]は待たずに進む', async ({page})=> {
	await toStoppedScene(page);
	await pressKey(page, 'Space');
	expect(await mesStr(page)).toBe('とめた');

	await pressKey(page, 'Space');	// [ws]（buf=SE。もう何も鳴っていない）
	expect(await mesStr(page)).toBe('またない');

	await pressKey(page, 'Space');	// [wf]（buf=SE。フェードも動いていない）
	expect(await mesStr(page)).toBe('またないふぇーど');
});

test('ループ中バッファへの[wl]は待たずに進む', async ({page})=> {
	await toStoppedScene(page);
	await pressKey(page, 'Space');
	await pressKey(page, 'Space');
	await pressKey(page, 'Space');
	expect(await mesStr(page)).toBe('またないふぇーど');

	// [playbgm fn=bgm][wl]。ループ再生中はws/wlが待たない（tag.html「loop=trueなら待たない」）ので、
	//	クリック1回でデコード完了・[wl]通過の両方が済み、次の[p]まで届く
	await page.keyboard.press('Space');
	await expect.poll(async ()=> mesStr(page), {timeout: 5_000}).toBe('るーぷはまたない');
});

// 「るーぷはまたない」まで進める（以降2テストの前提合わせ）
async function toDupScene(page: import('@playwright/test').Page) {
	await toStoppedScene(page);
	await pressKey(page, 'Space');
	await pressKey(page, 'Space');
	await pressKey(page, 'Space');
	await page.keyboard.press('Space');
	await expect.poll(async ()=> mesStr(page), {timeout: 5_000}).toBe('るーぷはまたない');
	await waitIdle(page);
}

test('同じバッファに同じファイルの再生要求が重なっても、頭から鳴り直さない（回帰）', async ({page})=> {
	await toDupScene(page);

	// [playse fn=se join=false][wait time=200][playse fn=se join=false][ws]。
	//	鳴り直さなければ最初の再生開始（クリックの直後）から約0.3秒、
	//	鳴り直せば2回目の要求（クリックから約0.2秒後）からさらに0.3秒＝約0.5秒かかる
	const t0 = Date.now();
	await page.keyboard.press('Space');
	await expect.poll(async ()=> mesStr(page), {timeout: 5_000}).toBe('じゅうふくむし');
	expect(Date.now() - t0).toBeLessThan(420);
});

test('フェード中に同じファイルの再生要求が重なっても、フェードを壊さず継続する（回帰）', async ({page})=> {
	await toDupScene(page);
	await page.keyboard.press('Space');
	await expect.poll(async ()=> mesStr(page), {timeout: 5_000}).toBe('じゅうふくむし');
	await waitIdle(page);

	// [playbgm fn=bgm][fadebgm volume=0.05 time=600][playbgm fn=bgm][wb]。
	//	時間切れ・[wb]の解決だけを見ても「頭から鳴り直したか」は分からない——[wb]はbuf名だけで
	//	フェードの終了を待つので、鳴り直して新しいGainNodeにフェードが効かなくなっていても、
	//	古いGainNode上のフェード自体は時間通り終わり[wb]は普通に解決してしまう（実際に検証済み）。
	//	そこでSndBuf生成のたびに必ず1つ増えるGainNode数を実測する：このシーンには[playbgm]が2回
	//	書かれているが、2回目は同じ音がまだ鳴っている（フェード中）ので新しいGainNodeを作らないはず
	const before = await gainNodeCount(page);
	const t0 = Date.now();
	await page.keyboard.press('Space');
	await expect.poll(async ()=> mesStr(page), {timeout: 5_000}).toBe('ふぇーどをこわさない');
	expect(Date.now() - t0).toBeGreaterThanOrEqual(500);
	expect(await gainNodeCount(page) - before).toBe(1);	// 1回目の[playbgm]の分だけ。2回目は増えない
});

// 「ぼたんてすと」（[l]）まで進める。GainNodeの増減で効果音の有無を見るテスト用に、
//	ボタンごとに違うbufを明示しておく（前段の「重複要求は鳴り直さない」仕様と干渉しないため）
async function toButtonScene(page: import('@playwright/test').Page) {
	await toDupScene(page);
	await page.keyboard.press('Space');
	await expect.poll(async ()=> mesStr(page), {timeout: 5_000}).toBe('じゅうふくむし');
	await waitIdle(page);
	await page.keyboard.press('Space');
	await expect.poll(async ()=> mesStr(page), {timeout: 5_000}).toBe('ふぇーどをこわさない');
	await waitIdle(page);

	await pressKey(page, 'Space');	// [stopbgm] + [add_lay]/[button]×4を経て[l]で停止
	// [current layer=btnmes]で切り替えた先のレイヤに書く（本文レイヤ'mes'は[p]でクリア済みのまま）
	expect(await mesStr(page, 'btnmes')).toBe('ぼたんてすと');
}

test('[button clickse=]は実際にクリック時効果音を鳴らす', async ({page})=> {
	await toButtonScene(page);

	const before = await gainNodeCount(page);
	await page.getByText('クリック').click();	// clickse再生 と *btnendへのジャンプが同時に起きる
	// [l]は改ページを伴わないので、飛び先の文字は「ぼたんてすと」に追記される（[p]と違いクリアされない）
	await expect.poll(async ()=> mesStr(page, 'btnmes'), {timeout: 5_000}).toBe('ぼたんてすとおわり');
	expect(await gainNodeCount(page)).toBeGreaterThan(before);
});

test('[button enterse=]は実際にマウスオーバー時効果音を鳴らす', async ({page})=> {
	await toButtonScene(page);

	const before = await gainNodeCount(page);
	await page.getByText('ホバー').hover();
	await expect.poll(async ()=> gainNodeCount(page), {timeout: 2_000}).toBeGreaterThan(before);
});

test('[button leavese=]は実際にマウスアウト時効果音を鳴らす', async ({page})=> {
	await toButtonScene(page);

	await page.getByText('はなれる').hover();	// enterse未設定なので、ここではまだ鳴らない
	const before = await gainNodeCount(page);
	await page.mouse.move(0, 0);	// ボタンの外へ動かしmouseleaveを発火させる
	await expect.poll(async ()=> gainNodeCount(page), {timeout: 2_000}).toBeGreaterThan(before);
});

test('[button enabled=false]はクリックしても効果音を鳴らさない', async ({page})=> {
	await toButtonScene(page);

	// pointer-events:none（本家 Button.ts:101相当）なので、forceしてもクリックはボタンへ
	//	届かずステージへ抜ける（button.e2e.tsの既存パターンと同じ）
	const before = await gainNodeCount(page);
	await page.getByText('むこう').click({force: true});
	await waitIdle(page);
	expect(await gainNodeCount(page)).toBe(before);
});

test('[button enabled=false]はホバーしても効果音を鳴らさない', async ({page})=> {
	await toButtonScene(page);

	const before = await gainNodeCount(page);
	await page.getByText('むこう').hover({force: true});
	// 「何も起きないこと」の確認なので、一定時間の経過を待つほかない
	await page.waitForTimeout(300);
	expect(await gainNodeCount(page)).toBe(before);
});
