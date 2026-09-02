/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2026-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

// 禁則処理（TxtLayer applyKinsoku）の長文・追記ケース。
//	kinsoku.e2e.ts は 16 文字までの決定的ケース専用。ここは
//	・多数の <br> を挿す長文
//	・[l] をまたいで少しずつ伸びるページ
//	で「行頭に行頭禁則文字（既定の「。」）が来ない」不変条件を見る。
//	applyKinsoku の「i 以降だけ測り直す」差分計測最適化（2026-09-03）の回帰ガードを兼ねる。

import {expect, test} from '@playwright/test';
import {SEL_FORE, gotoSn, pressKey} from './snPage';

// 表示単位spanのうち「その視覚行の先頭」に来ているものの文字を集める。
//	先頭＝左端が最小（横書き）。inline-block化してあるので矩形は原子的で信頼できる。
const lineHeads = (page: import('@playwright/test').Page)=> page.$eval(
	`${SEL_FORE} span[data-lay="mes"] > span:first-child`,
	el=> {
		const spans = Array.from(el.children).filter(c=> c.nodeName === 'SPAN') as HTMLElement[];
		if (spans.length === 0) return [];
		const minLeft = Math.min(...spans.map(s=> Math.round(s.getBoundingClientRect().left)));
		return spans
			.filter(s=> Math.round(s.getBoundingClientRect().left) === minLeft)
			.map(s=> s.textContent ?? '');
	},
);

test('長文ページ：多数の<br>が挿さっても行頭に「。」が来ない', async ({page})=> {
	await gotoSn(page, 'kinperf');

	const heads = await lineHeads(page);
	expect(heads.length).toBeGreaterThan(3);				// 実際に複数行へ折り返している
	expect(heads.some(c=> c === '。')).toBe(false);			// 行頭禁則が効いている
});

test('[l]をまたいで伸びるページ：追記のたびに行頭禁則の不変条件を保つ', async ({page})=> {
	await gotoSn(page, 'kinperf');
	await pressKey(page, 'Space');	// [er] → ページ2 追記1

	for (let n = 2; n <= 4; ++n) {
		await pressKey(page, 'Space');	// 追記 n
		const heads = await lineHeads(page);
		expect(heads.some(c=> c === '。'), `追記${n}: 行頭に「。」`).toBe(false);
	}
	// 最終的に十分な行数まで伸びている
	expect((await lineHeads(page)).length).toBeGreaterThan(4);
});
