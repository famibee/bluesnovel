/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2026-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

// ブラウザでしか確かめられない配線だけを見る（シナリオ：test/e2e/app/prj_expr/main.sn）。
//	・[trace]  → ScriptMngがbody直下へ挿すデバッグ表示（DOM）
//	・b_alpha  → store→TxtLayerの算出CSS
//	・escape   → prj.jsonのinit.escapeがConfig→ScriptMng→Grammarまで届いているか
//	式評価・[if]分岐・マクロ引数・[let_ml]などエンジン側のロジックは
//	test/ScriptEngine*.test.ts が持っているので、ここでは重ねて確かめない

import {expect, test} from '@playwright/test';
import {gotoSn, mesStr, snap, traceText, txtBoxStyle} from './snPage';

test.beforeEach(async ({page})=> {await gotoSn(page, 'expr')});

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

test('prj.jsonのinit.escapeがGrammarまで配線されている', async ({page})=> {
	// エスケープ設定が効いていれば「\[esc\]」はタグにならず、「\」が落ちて表示される。
	// 効いていなければ[esc]は未対応タグとして無視され、表示は空になる
	expect(await mesStr(page)).toBe('[esc]');
});
