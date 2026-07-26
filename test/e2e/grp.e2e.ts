/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2026-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

// 場面転換＝[trans]を続けて打つ経路（シナリオ：test/e2e/app/prj_grp/main.sn）。
//	テンプレ（tmp_blues）の[grp]マクロがこの形で、1回の場面転換で[trans]を3回打つ。
//	「文字レイヤの設定（縦書き指定など）が場面転換をまたいで生き残る」ことを見る。
//	ストア単体（配列の中身）ではなく**算出CSS**で見るのは、実機での症状が
//	「縦書き指定が消える」という見た目の形で現れたため。
//	なお実機（tmp_blues）ではまだ横書きに戻る症状が残っており、この最小形では再現しない。
//	間の画像[trans]（mesを対象に含まない）がstartTrans()で表のmesを裏へ写し直すため、
//	3回目までに設定が復活する経路になっているのが理由。実機との差分は追跡中

import {expect, test} from '@playwright/test';
import {SEL_FORE, gotoSn, mesStr, pressKey, pressKeyToWaitMark, txtBoxStyle, waitTransRunning, waitWaitMark} from './snPage';

test.beforeEach(async ({page})=> {await gotoSn(page, 'grp')});

test('場面転換（[trans]3連）をまたいでも文字レイヤの設定が生き残る', async ({page})=> {
	// 場面転換その1を抜けた直後。styleを丸ごと書き直した方（font-family）が効いている
	// **[trans]を挟むので待ちマーカーで停止点を確かめてから進む**。waitIdle()だけだと
	//	演出の途中に「落ち着いて見える」瞬間があり、そこで押したキーが進行に使われず失われる
	await waitWaitMark(page);
	expect(await mesStr(page)).toContain('はじめ');
	expect(await txtBoxStyle(page, 'writing-mode')).toBe('horizontal-tb');

	// 裏ページへ縦書き設定を書く。まだ表に出ていないので見た目は横書きのまま
	await pressKeyToWaitMark(page, 'Space');
	expect(await mesStr(page)).toContain('ふたつめ');
	expect(await txtBoxStyle(page, 'writing-mode')).toBe('horizontal-tb');

	// 場面転換その2を通す。ここで裏が「1つ前の表」のまま残っていると横書きへ巻き戻る
	//	（この先は[s]なので待ちマーカーは立たない。表示が落ち着くのをpollで待つ）
	await pressKey(page, 'Space');
	await expect.poll(()=> mesStr(page), {timeout: 10_000}).toContain('てんかんご');
	// 場面転換の[trans]が全部終わってからでないと、途中の表ページを見てしまう
	await expect.poll(()=> txtBoxStyle(page, 'writing-mode'), {timeout: 10_000}).toBe('vertical-rl');
});

test('場面転換の[er]で、前の場面のボタンが消える', async ({page})=> {
	// テンプレでタイトル画面のボタンが本編に入っても残っていた。[grp]の場面転換は[er]しか
	//	打たないので、[er]がボタンを捨てないと消える機会が無い
	await waitWaitMark(page);
	expect(await mesStr(page)).toContain('はじめ');
	await expect(page.locator(SEL_FORE).getByText('まえのボタン')).toHaveCount(0);

	await pressKeyToWaitMark(page, 'Space');
	await pressKey(page, 'Space');
	await expect.poll(()=> mesStr(page), {timeout: 10_000}).toContain('てんかんご');
	await expect(page.locator(SEL_FORE).getByText('まえのボタン')).toHaveCount(0);
});

test('[trans layer=…]の演出中、交換対象外のレイヤは表の内容を見せ続ける', async ({page})=> {
	// 本家 LayerMng.ts:648 `const lay = sDoTrans.has(ln) ? back : fore`。
	//	裏に組みかけの状態が先に見えると、場面転換のたびに背景が一瞬消える
	//	（実機テンプレの「二度の[trans]終了時に一瞬真っ黒画面になってちらつく」）
	await waitWaitMark(page);
	await pressKeyToWaitMark(page, 'Space');
	await pressKey(page, 'Space');	// 場面転換その2を抜けて てんかんご へ
	await expect.poll(()=> mesStr(page), {timeout: 10_000}).toContain('てんかんご');

	// [trans layer=mes time=3000] を開始させ、演出の**最中**を見る。
	//	押す前に本物の停止点（[l]の待ちマーカー）へ着かせないと、文字送りの瞬時完了に食われる
	await waitWaitMark(page);
	await page.keyboard.press('Space');
	await waitTransRunning(page);
	const shown = await page.evaluate(()=> {
		const q = (sel: string)=> document.querySelector(sel) as HTMLElement | null;
		const fore = q('#skynovel [data-page="fore"] [data-lay="base"]');
		const back = q('#skynovel [data-page="back"] [data-lay="base"]');
		const vis = (e: HTMLElement | null)=> e ? getComputedStyle(e).display !== 'none' : null;
		return {fore: vis(fore), back: vis(back)};
	});
	// 交換対象は mes だけ。base は表・裏とも「今の表の内容」＝表示のまま見えていなければならない
	expect(shown).toEqual({fore: true, back: true});
});

