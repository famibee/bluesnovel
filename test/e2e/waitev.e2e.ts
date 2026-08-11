/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2026-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

// イベント系タグ（シナリオ：test/e2e/app/prj_wait/main.sn）。
//	どのアクションを積むかは test/ScriptEngine_wait.test.ts が持っているので、
//	ここで見るのは「ユーザー操作にどう反応するか」だけ：
//	・[enable_event enabled=false]でボタンと[link]がクリックを受けなくなる
//	・[wait]がその間シナリオを止め、クリックで打ち切れる
//	・[waitclick]はクリックで進み、[s]はクリックでは進まない

import {expect, test, type Page} from '@playwright/test';
import {gotoSn, mesStr, snap, waitIdle} from './snPage';

test.beforeEach(async ({page})=> {await gotoSn(page, 'wait')});

// 今フォーカスされているボタンの文字（focus.e2e.tsのfocused()と同じ流儀。フレームは使わないシナリオなので単純化）
const focused = (page: Page)=> page.evaluate(()=> {
	const a = document.activeElement;
	return a && a !== document.body ? `btn:${a.textContent ?? ''}` : '(none)';
});

test('[enable_event enabled=false]の間はボタンがクリックを受けない', async ({page})=> {
	expect(await mesStr(page)).toBe('むこうりんく');
	expect((await snap(page)).aLay.find(l=> l.nm === 'mes')?.enabled).toBe(false);

	// ボタン自体は見えているが、pointer-events: noneなのでクリックを受けない。
	//	Playwrightの通常のclick()は「他要素がイベントを横取りする」と判断して待ち続けるので、
	//	force指定で実際にその位置をクリックする＝クリックはステージへ抜けて「読み進め」になる
	await page.getByText('ボタン').click({force: true});
	await waitIdle(page);
	expect(await mesStr(page)).toBe('ゆうこう');	// *btnの「おされた」ではない
});

test('[enable_event enabled=false]の間は本文中の[link]も効かない', async ({page})=> {
	// 本家は文字レイヤのコンテナごと ctn.interactiveChildren=false にする（TxtLayer.ts:838）ので、
	//	ボタンだけでなくリンクもまとめて効かなくなる。「まとめてイベントを操作する」ためのタグ
	expect(await mesStr(page)).toBe('むこうりんく');

	await page.getByText('りんく').click({force: true});
	await waitIdle(page);
	expect(await mesStr(page)).toBe('ゆうこう');	// リンク先（*btn）の「おされた」ではない
});

test('[enable_event enabled=true]に戻すとボタンが効く', async ({page})=> {
	await page.keyboard.press('Space');
	await waitIdle(page);
	expect((await snap(page)).aLay.find(l=> l.nm === 'mes')?.enabled).toBe(true);

	await page.getByText('ボタン').click();
	await waitIdle(page);
	expect(await mesStr(page)).toBe('おされた');
});

// [set_focus]の輪。[enable_event enabled=false]の間はクリックだけでなく
//	ゲームパッド／キーボードのフォーカスも受けないことの確認（実例：タイトル画面の
//	クリック待ちオーバーレイ表示中でもタイトルボタンにフォーカスできてしまっていた不具合）
test('[enable_event enabled=false]の間はボタンがフォーカスの輪から外れる', async ({page})=> {
	expect(await mesStr(page)).toBe('むこうりんく');

	await page.keyboard.press('ArrowRight');
	await page.waitForTimeout(100);
	expect(await focused(page)).toBe('(none)');	// 輪に居るのはボタン1つだけなので、外れていれば誰も選ばれない
});

test('[enable_event enabled=true]に戻すとフォーカスの輪へ戻り、Enterで押せる', async ({page})=> {
	await page.keyboard.press('Space');
	await waitIdle(page);
	expect(await mesStr(page)).toBe('ゆうこう');

	await page.keyboard.press('ArrowRight');
	await expect.poll(async ()=> focused(page), {timeout: 5_000}).toBe('btn:ボタン');

	await page.keyboard.press('Enter');
	await waitIdle(page);
	expect(await mesStr(page)).toBe('おされた');
});

test('[wait time=…]はその間シナリオを止め、時間が経てば進む', async ({page})=> {
	await page.keyboard.press('Space');
	await waitIdle(page);	// 「ゆうこう」で[l]待ち

	const t0 = Date.now();
	await page.keyboard.press('Space');	// [wait time=1500]へ入る
	// 待っている間は次の文（まった）へ進んでいない
	//	（直前が[p]なので、再開時に文字が消えて空になったところで止まっている）
	expect(await mesStr(page)).toBe('');

	await expect.poll(async ()=> mesStr(page), {timeout: 5_000}).toBe('まった');
	expect(Date.now() - t0).toBeGreaterThanOrEqual(1_400);
});

test('[wait]中のクリックで待ちを打ち切れる（canskipの既定はtrue）', async ({page})=> {
	await page.keyboard.press('Space');
	await waitIdle(page);

	const t0 = Date.now();
	await page.keyboard.press('Space');	// [wait time=1500]へ入る
	expect(await mesStr(page)).toBe('');

	await page.keyboard.press('Space');	// 待ちを打ち切る
	await waitIdle(page);
	expect(await mesStr(page)).toBe('まった');
	expect(Date.now() - t0).toBeLessThan(1_500);
});

test('[waitclick]はクリックで進み、[s]はクリックでは進まない', async ({page})=> {
	await page.keyboard.press('Space');
	await waitIdle(page);
	await page.keyboard.press('Space');	// [wait]
	await expect.poll(async ()=> mesStr(page), {timeout: 5_000}).toBe('まった');
	await waitIdle(page);	// **本文が出揃っても文字送りは続いている**。ここで待たないと次のキーが瞬時完了に食われる

	// [waitclick]：待ちマーカー（見た目）は出ないが、クリックで進む。
	//	store.waitはnullではない：[l]/[p]と同じくTxtLayerが「本文へフォーカスで戻れる
	//	見えないプロキシ要素」を輪へ登録する入り口として使い回している（todo.md対応）
	expect((await snap(page)).wait).toEqual({nm: 'mes', kind: 'waitclick'});
	await page.keyboard.press('Space');
	await waitIdle(page);
	expect(await mesStr(page)).toBe('まったとまった');

	// [s]：ここから先はクリックしても進まない（本家 ReadingState_wait4Tag の's'）
	for (let i = 0; i < 3; ++i) {
		await page.keyboard.press('Space');
		await waitIdle(page);
	}
	expect(await mesStr(page)).toBe('まったとまった');
});

test('[s]で止まっていても[button]の予約は動かせる', async ({page})=> {
	await page.keyboard.press('Space');
	await waitIdle(page);
	await page.keyboard.press('Space');
	await expect.poll(async ()=> mesStr(page), {timeout: 5_000}).toBe('まった');
	await waitIdle(page);	// 同上。文字送りの完了まで待ってから次のキー
	await page.keyboard.press('Space');	// [waitclick]を越えて[s]まで
	await waitIdle(page);
	expect(await mesStr(page)).toBe('まったとまった');

	// [s]の停止中でも、ボタン（＝予約）だけは受ける
	await page.getByText('ボタン').click();
	await waitIdle(page);
	expect(await mesStr(page)).toBe('おされた');
});

// title.snの*c2p（クリック待ちオーバーレイ）と同じ形：[enable_event enabled=false]の最中に
//	[waitclick]で止まる。クリックで進めなくなっていないか（実際の不具合報告を受けた確認）
test('[enable_event enabled=false]の最中の[waitclick]もクリックで進む', async ({page})=> {
	await page.keyboard.press('x');
	await waitIdle(page);
	expect(await mesStr(page)).toBe('くりっくまち');
	expect((await snap(page)).aLay.find(l=> l.nm === 'mes')?.enabled).toBe(false);

	await page.mouse.click(400, 300);	// ボタンの外＝ステージの地の部分をクリック
	await waitIdle(page);
	expect(await mesStr(page)).toBe('かいじょ');
});

test('[enable_event enabled=false]の最中でも、何もフォーカスしていなければ実キーボードのEnterで進む', async ({page})=> {
	await page.keyboard.press('x');
	await waitIdle(page);
	expect(await mesStr(page)).toBe('くりっくまち');

	await page.keyboard.press('Enter');
	await waitIdle(page);
	expect(await mesStr(page)).toBe('かいじょ');
});

// ゲームパッドのOKボタン（GamepadMng#dispatchKeyが送る合成KeyboardEvent）を直接模して確認。
//	実際の不具合報告：クリック待ち画面をゲームパッドで進められない。原因は`new KeyboardEvent(…,
//	{key: 'Enter'})`だけでは`code`が空文字のままで、Main.tsxの読み進め判定（switch (e.code)）が
//	拾えなかったこと（`page.keyboard.press()`はOS相当の実イベントなので`code`が自動で正しく付き、
//	この不具合を検出できない＝上のテストとは別に、GamepadMngと同じ形の合成イベントで確認が要る）
test('[enable_event enabled=false]の最中でも、何もフォーカスしていなければ合成KeyboardEvent（ゲームパッド由来）のEnterで進む', async ({page})=> {
	await page.keyboard.press('x');
	await waitIdle(page);
	expect(await mesStr(page)).toBe('くりっくまち');

	await page.evaluate(()=> {
		globalThis.dispatchEvent(new KeyboardEvent('keydown', {key: 'Enter', code: 'Enter', bubbles: true}));
	});
	await waitIdle(page);
	expect(await mesStr(page)).toBe('かいじょ');
});
