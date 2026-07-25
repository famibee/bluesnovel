/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2026-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

// ルビ記法（`漢字《かんじ》`・`｜親文字《ルビ》`・傍点`《*》`）が<ruby>/<rt>として組まれるか。
//	**どう割るか**は本家から丸移植した RubySpliter が決め、test/RubySpliter.test.ts（本家の
//	テストを無改変で移植）が仕様を押さえている。ここで見るのはユニットでは届かない部分だけ：
//	割った結果がDOMのルビとして出ること、ストアのstr（＝平文）にはルビが混ざらないこと、
//	そして文字送り演出のDOMキャッシュがルビ付きでも壊れないこと。

import {expect, test} from '@playwright/test';
import {SEL_FORE, gotoSn, mesStr, pressKey, snap} from './snPage';

// 表ページの文字レイヤに組まれたルビを「親文字:ルビ」の並びで拾う
const aRuby = (page: import('@playwright/test').Page)=> page.$$eval(
	`${SEL_FORE} span[data-lay="mes"] ruby`,
	aEl=> aEl.map(el=> {
		const rt = el.querySelector('rt');
		const rb = el.textContent?.slice(0, el.textContent.length - (rt?.textContent?.length ?? 0));
		return `${rb ?? ''}:${rt?.textContent ?? ''}`;
	}),
);

test.beforeEach(async ({page})=> {await gotoSn(page, 'ruby')});

test('`漢字《かんじ》`が<ruby>で組まれ、平文にはルビが入らない', async ({page})=> {
	expect(await mesStr(page)).toBe('漢字は');	// ストアのstrはルビを除いた平文
	expect(await aRuby(page)).toEqual(['漢字:かんじ']);
});

test('`｜親文字《ルビ》`も同じく組まれる（親文字の範囲を明示する記法）', async ({page})=> {
	await pressKey(page, 'Space');

	expect(await mesStr(page)).toBe('漢字は親文字と');
	expect(await aRuby(page)).toEqual(['漢字:かんじ', '親文字:おやもじ']);
});

test('傍点`《*》`は1文字ずつに圏点（既定ヽ）が付く', async ({page})=> {
	await pressKey(page, 'Space');
	await pressKey(page, 'Space');

	expect(await mesStr(page)).toBe('漢字は親文字と傍点');
	// 傍点は親文字1つごとに1ルビ。位置指定（center｜）は落として文字だけを出す
	expect(await aRuby(page)).toEqual(['漢字:かんじ', '親文字:おやもじ', '傍:ヽ', '点:ヽ']);
});

test('[er]で消えたら<ruby>も残らない（表示単位のキャッシュが作り直される）', async ({page})=> {
	await pressKey(page, 'Space');
	await pressKey(page, 'Space');
	await pressKey(page, 'Space');

	expect(await mesStr(page)).toBe('消えた');
	expect(await aRuby(page)).toEqual([]);
	expect((await snap(page)).wait).toBeNull();	// [s]で停止
});
