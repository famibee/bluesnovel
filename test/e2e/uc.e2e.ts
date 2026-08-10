/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2026-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

// tmp_blues（bluesnovelエンジン）とtmp_esm_uc（本家）の表示差異の網羅確認をテスト化したもの
//	（シナリオ：test/e2e/app/prj_uc/main.sn）。2026-08-10のセッションで両者を実機比較し、
//	`ss_000.sn`（「桜の樹の下には」本編・[grp]場面転換10箇所）を通しで見比べて
//	「[lay pos=]未実装」と「GrpLayerの画像縮小バグ」の2件を発見・修正し、それ以外は
//	本家と一致することを確認できた（CHANGELOG.md 2026-08-10参照）。この確認は完全に手作業
//	だったため、以後の変更で同じ場所が壊れても気付けない。その状態をゴールデンとして固定する。
//
//	本家は起動しない（ゴールデン方式）：本家はpixiのcanvas描画、bluesnovelはDOM描画で
//	フォントラスタライズが原理的に異なりピクセル比較が破綻するうえ、本家にはwindow.__sn相当の
//	状態公開が無くレイヤ状態を外から読む手段も無い。実テンプレも直接は使わない
//	（65MB・フォント52MB込み・兄弟チェックアウト依存で環境ごとに結果が揺れるため）。
//	代わりに`ss_000.sn`の表示に効く要素だけを最小フィクスチャへエッセンス化した
//	（画像は実テンプレと同じ寸法の単色PNG。test/e2e/app/mkPrjUc.ts生成）

import {expect, test} from '@playwright/test';
import {gotoSn, grpBoxStyle, mesStr, pressKey, pressKeyToWaitMark, snap, traceText, txtBoxStyle, waitWaitMark} from './snPage';

test.beforeEach(async ({page})=> {await gotoSn(page, 'uc')});

test('ss_000.sn相当の場面転換を通しで進め、[grp]/[fg]の座標・画像切替が実機比較の結果と一致し続ける', async ({page})=> {
	// タイトル画面は[s]で停止（gotoSn()のwaitIdle()で確認済み）。[s]は本家同様、
	//	クリック／Space等の汎用「読み進め」には反応しない完全停止で、ボタン（＝[jump]相当）
	//	でのみ抜けられる。ボタンはこのフィクスチャの対象外（*noopへjumpするだけ）なので、
	//	ここでは本編相当へ入るためだけにクリックする
	await page.getByText('最初から').click();
	await waitWaitMark(page);

	// --- [txt_lay_v_center]+[grp bg=white]相当 ---
	expect(await mesStr(page)).toBe('いち。');
	{
		const {aLay} = await snap(page);
		expect(aLay.find(l=> l.nm === 'base')?.fn).toBe('white');
		expect(aLay.find(l=> l.nm === 'mes')?.b_alpha).toBe(0);
		expect(aLay.find(l=> l.nm === 'mes')?.left).toBe(366);	// txt_lay_v_center：l=366
	}
	expect(await txtBoxStyle(page, 'writing-mode')).toBe('vertical-rl');

	// --- [txt_lay_v_left]+[grp l0=F_kuchimoto rule=r_uzumaki]相当（bg省略＝白背景のまま） ---
	await pressKeyToWaitMark(page, 'Space');
	expect(await mesStr(page)).toBe('に。');
	{
		const {aLay} = await snap(page);
		expect(aLay.find(l=> l.nm === 'base')?.fn).toBe('white');
		expect(aLay.find(l=> l.nm === '0')?.fn).toBe('F_kuchimoto');
		expect(aLay.find(l=> l.nm === 'mes')?.left).toBe(40);	// txt_lay_v_left既定
	}
	expect(await txtBoxStyle(page, 'width')).toBe('310px');

	// --- [fg fn=F_1024aFull pos=&pos.l1c]相当。★[lay pos=]未実装バグの回帰点。
	//	pos.l1c = (40+280) + (1024-320)*(1/2) = 672。エンジンは画像の実寸を知らないので
	//	left=672・align_x='center'（CSSのtranslateX(-50%)で寄せは実寸ぶん引かれる）で持つ。
	//	Yは常にステージ下端接地＝top=768（stageH）・align_y='bottom'
	await pressKeyToWaitMark(page, 'Space');
	// [fg]は[er]を挟まないので本文は「に。」に続けて積まれる（[er]を打つのは[grp]の方）
	expect(await mesStr(page)).toBe('に。さん。');
	{
		const lay0 = (await snap(page)).aLay.find(l=> l.nm === '0');
		expect(lay0?.fn).toBe('F_1024aFull');
		expect(lay0?.left).toBe(672);
		expect(lay0?.align_x).toBe('center');
		expect(lay0?.top).toBe(768);
		expect(lay0?.align_y).toBe('bottom');
	}

	// --- [grp bg=black l0=F_1024a pos0=&pos.l1c]相当 ---
	await pressKeyToWaitMark(page, 'Space');
	expect(await mesStr(page)).toBe('よん。');
	{
		const {aLay} = await snap(page);
		expect(aLay.find(l=> l.nm === 'base')?.fn).toBe('black');
		const lay0 = aLay.find(l=> l.nm === '0');
		expect(lay0?.fn).toBe('F_1024a');
		expect(lay0?.left).toBe(672);
		expect(lay0?.align_x).toBe('center');
	}

	// --- [txt_lay_v_center_wide]+[grp bg=yun_a]相当（l0省略＝layer0はクリアされる） ---
	await pressKeyToWaitMark(page, 'Space');
	expect(await mesStr(page)).toBe('ご。');
	{
		const {aLay} = await snap(page);
		expect(aLay.find(l=> l.nm === 'base')?.fn).toBe('yun_a');
		expect(aLay.find(l=> l.nm === 'mes')?.left).toBe(180);
	}
	expect(await txtBoxStyle(page, 'width')).toBe('664px');

	// --- [fg fn=kagero left=… top=…]相当。posでなくleft/top式評価の経路
	//	（[lay]の属性内&式評価はpos=とは別コード経路なので、align_x/align_yは立たない）。
	//	left=(1024-640)/2=192、top=(768-400)/2=184。ここは[s]なので待ちマーカーは立たない
	await pressKey(page, 'Space');
	// [fg]は[er]を挟まないので本文は「ご。」に続けて積まれる
	await expect.poll(()=> mesStr(page), {timeout: 10_000}).toBe('ご。ろく。');
	{
		const lay0 = (await snap(page)).aLay.find(l=> l.nm === '0');
		expect(lay0?.fn).toBe('kagero');
		expect(lay0?.left).toBe(192);
		expect(lay0?.top).toBe(184);
		expect(lay0?.align_x).toBeUndefined();
		expect(lay0?.align_y).toBeUndefined();
	}

	// ここまで[trace]にエラーが出ていないこと（デバッグ表示は本文表示と無関係にbody直下へ出る）
	expect(await traceText(page)).toBe('');
});

test('[fg pos=]で本家より画像が縮んで見えないこと（GrpLayerのshrink-to-fit回帰）', async ({page})=> {
	// 実プロジェクト（tmp_blues等）のindex.htmlが持つ「モダンCSSリセット」を再現する。
	//	pic.e2e.tsの同種テストと同じ理由：GrpLayerのdiv0（画像レイヤの箱）が
	//	position:absolute×width未指定でshrink-to-fitに落ちる不具合は、この
	//	img,picture{max-width:100%}リセットと組み合わさって初めて「画像が縮む」形で
	//	表面化する（reset無しでは症状が出ないため、pic.e2e.tsに倣って明示的に足す）
	await page.addStyleTag({content: 'img,picture{max-width:100%;display:block}'});

	await page.getByText('最初から').click();	// タイトルの[s]はボタンでしか抜けられない
	await waitWaitMark(page);	// いち。
	await pressKeyToWaitMark(page, 'Space');	// に。
	await pressKeyToWaitMark(page, 'Space');	// さん。[fg fn=F_1024aFull pos=&pos.l1c]
	expect(await mesStr(page)).toBe('に。さん。');

	// containing block（1024px）右端までの残りは 1024-672=352px で、画像本来の幅834pxより狭い。
	//	修正前はここまで幅が縮んでいた（GrpLayer.tsxのdiv0にwidth:max-contentを足して解消。
	//	実機tmp_blues/tmp_esm_ucの比較で発見：本家は顔まで見えるのに、こちらは体の一部しか
	//	見えていなかった）
	expect(await grpBoxStyle(page, 'width', '0')).toBe('834px');
});
