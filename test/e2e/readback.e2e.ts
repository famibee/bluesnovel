/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2026-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

// PageUp/PageDownによる読み戻り・復帰の検証（シナリオ：e2e/app/prj_basic/main.sn）
//	Caretaker（src/ts/Memento.ts）が各停止点で記録したスナップショットを辿る

import {expect, test, type Page} from '@playwright/test';
import {gotoSn, mesStr, pressKey, snap, txtBoxStyle} from './snPage';

const YELLOW = 'rgb(255, 255, 0)';

// [s]（最終停止点）まで読み進める
async function readToEnd(page: Page) {
	await pressKey(page, 'Space');	// -> [p]
	await pressKey(page, 'Space');	// -> [l]
	await pressKey(page, 'Space');	// -> [s]
}

test.beforeEach(async ({page})=> {await gotoSn(page, 'basic')});

test('PageUpで直前の停止点まで読み戻れる', async ({page})=> {
	await readToEnd(page);
	expect(await mesStr(page)).toBe('二ページ目のいち。おしまい。');

	await pressKey(page, 'PageUp');
	expect(await mesStr(page)).toBe('二ページ目のいち。');
	expect((await snap(page)).isReadBack).toBe(true);

	await pressKey(page, 'PageUp');	// ページを跨いで戻る
	expect(await mesStr(page)).toBe('一ページ目のいち。二番目のぶん。');
	expect((await snap(page)).isReadBack).toBe(true);
});

test('読み戻り中は文字が黄色くなる', async ({page})=> {
	await readToEnd(page);
	const normal = await txtBoxStyle(page, 'color');
	expect(normal).not.toBe(YELLOW);

	await pressKey(page, 'PageUp');
	expect(await txtBoxStyle(page, 'color')).toBe(YELLOW);
});

test('PageDownで最新まで戻ると読み戻り状態が解除される', async ({page})=> {
	await readToEnd(page);
	await pressKey(page, 'PageUp');
	await pressKey(page, 'PageUp');

	await pressKey(page, 'PageDown');
	expect(await mesStr(page)).toBe('二ページ目のいち。');
	expect((await snap(page)).isReadBack).toBe(true);

	await pressKey(page, 'PageDown');	// 最新（Caretaker.isLast()）へ復帰
	expect(await mesStr(page)).toBe('二ページ目のいち。おしまい。');
	expect((await snap(page)).isReadBack).toBe(false);
	expect(await txtBoxStyle(page, 'color')).not.toBe(YELLOW);
});

test('PageDownで最新へ戻った直後、既読部分は瞬時表示される（文字送り演出をやり直さない）', async ({page})=> {
	await readToEnd(page);
	await pressKey(page, 'PageUp');
	await pressKey(page, 'PageUp');

	await pressKey(page, 'PageDown');	// まだ読み戻り中の中間ページ
	const t0 = Date.now();
	await pressKey(page, 'PageDown');	// 最新（既読の末尾）へ復帰。ここでisPagingがfalseになる
	// 本文「二ページ目のいち。おしまい。」（14文字）。文字送り演出が走ると
	//	[autowc]既定chWait(10ms)×13＋[ch_in_style]既定500msだけでも600ms超かかる。
	//	既読ページの再表示は瞬時（アニメ無し）のはずなので、それより十分短いはず
	//	（回帰させると、isPagingがfalseになった直後の演じ直しがisReadBack=falseのまま
	//	走ってしまい、既読のはずの本文が通常の文字送りでもう一度アニメし直す）
	expect(Date.now() - t0).toBeLessThan(300);
	expect(await mesStr(page)).toBe('二ページ目のいち。おしまい。');
	expect((await snap(page)).isReadBack).toBe(false);
});

test('先頭より前へは戻れない', async ({page})=> {
	// 最初の停止点にいる状態でPageUpしても何も起きない
	const before = await mesStr(page);
	await pressKey(page, 'PageUp');

	expect(await mesStr(page)).toBe(before);
	expect((await snap(page)).isReadBack).toBe(false);
});
