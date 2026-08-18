/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2026-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

// 演出ありの[trans]を[wt]を挟んで連続で打つ経路（シナリオ：test/e2e/app/prj_transflash/main.sn）の
//	回帰テスト。ScriptMng#runStep()は同期のforループの中でfinishTrans()（trans→null）と
//	続くstartTrans()（null→次のtrans）を続けて呼ぶため、Reactが両方を1回のレンダリングへ
//	バッチしてtrans:nullの中間状態が一度もコミットされないことがある。Stage.tsxの
//	クロスフェード用useEffectが「演出終了時だけ」opacityを1へリセットしていた頃は、この経路で
//	リセットが一度も走らず、1本目の演出でopacity 0まで下がった板がそのまま2本目の演出の
//	下地になって一瞬真っ黒に見えていた（実機 tmp_blues の[grp]場面転換、本家
//	doc/prj/script/sub.sn の[trans * layer=…]直後に別レイヤの[trans]を打つ箇所で確認）

import {expect, test} from '@playwright/test';
import {gotoSn, pageStyle, waitWaitMark} from './snPage';

test.beforeEach(async ({page})=> {await gotoSn(page, 'transflash')});

test('連続する[trans]の演出間で、下地の板のopacityが1へリセットされてから次の演出が始まる（回帰テスト）', async ({page})=> {
	await waitWaitMark(page);	// はじめ

	await page.keyboard.press('Space');	// 1本目のtrans（layer=base time=1000）開始
	await page.waitForFunction(
		()=> (globalThis as any).__sn.store.getState().trans?.aLayNm?.join(',') === 'base',
		undefined, {timeout: 15_000},
	);

	// 2本目のtrans（layer=base,mes time=1000）へ切り替わるのを待つ。
	//	[wt]を経ての切り替わりなのでtrans自体は常にnon-nullのまま＝対象レイヤの変化で検知する
	//	（seqはtrans:null経由の有無に関わらずnullから毎回1で始まるカウントなので使えない）
	await page.waitForFunction(
		()=> (globalThis as any).__sn.store.getState().trans?.aLayNm?.join(',') === 'base,mes',
		undefined, {timeout: 15_000},
	);

	// 切り替わった直後：1本目の演出で下がりきったはずのopacityが引き継がれていないか確認。
	//	バグ再現時はここが1本目の演出終了時の値（0付近）のまま残り、0.9を大きく割り込む
	const {fore, back} = await pageStyle(page);
	expect(fore.opacity).toBeGreaterThan(0.9);
	expect(back.opacity).toBeGreaterThan(0.9);
});
