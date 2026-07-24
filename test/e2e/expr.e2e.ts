/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2026-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

// [let]/[if]/&計算/マクロ/[let_ml]/[trace]/[lay b_alpha=…] をブラウザ実機で検証する
//	（シナリオ：test/e2e/app/prj_expr/main.sn）。
//	ユニットテスト（ScriptEngine単体）では ScriptMng→zustand→React の経路を通らないので、
//	「エンジンの計算結果が実際に画面まで届くか」をここで押さえる

import {expect, test} from '@playwright/test';
import {gotoSn, mesStr, pressKey, snap, traceText, txtBoxStyle} from './snPage';

test.beforeEach(async ({page})=> {await gotoSn(page, 'expr')});

test('[let]と「&計算」書式の結果が「&式&」で表示される', async ({page})=> {
	// hp=100（cast=int）に対し &game:hp = game:hp - 30 で70
	expect(await mesStr(page)).toBe('70');

	const {wait} = await snap(page);
	expect(wait).toEqual({nm: 'mes', kind: 'l'});
});

test('[trace]がデバッグ表示へ出力される', async ({page})=> {
	// [trace text=&game:name] は式として評価され、値（ゆかり）が出る
	expect(await traceText(page)).toContain('{I} ゆかり');
});

test('[lay b_alpha=…]が文字レイヤ背景の不透明度へ反映される', async ({page})=> {
	// TxtLayer.tsx が背景色 rgba(127, 255, 212, b_alpha) として描く
	expect(await txtBoxStyle(page, 'background-color')).toBe('rgba(127, 255, 212, 0.4)');

	const {aLay} = await snap(page);
	expect(aLay.find(l=> l.nm === 'mes')?.b_alpha).toBe(0.4);
});

test('[if]/[elsif]/[else]が変数値で分岐する', async ({page})=> {
	await pressKey(page, 'Space');

	// hpは70なので、[if hp>=80]でも[else]でもなく[elsif hp>=50]の枝が選ばれる
	expect(await mesStr(page)).toBe('ふつう');
});

test('マクロ呼び出しのタグ属性がmp:名前空間で受け取れる', async ({page})=> {
	await pressKey(page, 'Space');
	await pressKey(page, 'Space');

	// [macro name=よぶ]&mp:誰&[endmacro] を [よぶ 誰=ゆかり] で呼ぶ
	expect(await mesStr(page)).toBe('ゆかり');
});

test('[let_ml]で埋め込んだJSONの下位階層を参照できる', async ({page})=> {
	await pressKey(page, 'Space');
	await pressKey(page, 'Space');
	await pressKey(page, 'Space');

	expect(await mesStr(page)).toBe('gold');

	// [s]なので待ちマーカーは出ない＝ここで停止
	const {wait} = await snap(page);
	expect(wait).toBeNull();
});
