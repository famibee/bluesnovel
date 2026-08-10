/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2026-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

// ウインドウサイズ・全画面切替での見た目追従（シナリオ：test/e2e/app/prj_resize/main.sn）。
//	ステージ外枠の実寸だけを見る stage.e2e.ts とは別に、ここでは背景／前景／ボタン／ヒントの
//	「個々の要素」が Stage.tsx calcScale() の拡縮・全画面時の左上固定に正しく追従するかを見る。
//	ステージ内側の要素はすべて等倍の座標系にCSS絶対配置され、外側の#skynovelがまるごと
//	transform: scale()される作り（Stage.tsx参照）なので、ここでの確認は実質
//	「その前提が個々の要素にも本当に効いているか」の回帰用

import {expect, test, type Page} from '@playwright/test';
import {gotoSn, waitWaitMark} from './snPage';

// test/e2e/app/prj_resize/prj.json の window（実テンプレ tmp_blues/tmp_esm_uc と同寸の1024x768）
const PRJ_W = 1024;
const PRJ_H = 768;

// cvsScaleは浮動小数のままtransform: scale()へ渡るため丸め誤差はほぼ出ないはずだが、
//	ブラウザのサブピクセルレンダリングぶんの余裕は見ておく
function closePx(actual: number, expected: number, tol = 2) {
	expect(Math.abs(actual - expected), `${String(actual)} ≈ ${String(expected)} (±${String(tol)})`)
		.toBeLessThanOrEqual(tol);
}

// ステージ・背景・前景・ボタンの実寸（getBoundingClientRect）をまとめて取る。
//	scaleは「ステージの見かけの幅 ÷ 論理幅」で逆算する（Stage.tsxはcvsScaleをストアへ出さないため）
async function boxes(page: Page) {
	const stage = (await page.locator('#skynovel').boundingBox())!;
	const scale = stage.width / PRJ_W;
	const base = (await page.locator('#skynovel [data-page="fore"] div[data-lay="base"]').boundingBox())!;
	const fg = (await page.locator('#skynovel [data-page="fore"] div[data-lay="fg"]').boundingBox())!;
	const btnA = (await page.getByText('ボタンA').boundingBox())!;
	return {stage, scale, base, fg, btnA};
}

test.beforeEach(async ({page})=> {
	await page.setViewportSize({width: PRJ_W, height: PRJ_H});
	await gotoSn(page, 'resize');
});

test('実テンプレ同寸(1024x768)ちょうどの窓では、背景・前景・ボタンが論理座標そのままの実寸で出る', async ({page})=> {
	const {stage, scale, base, fg, btnA} = await boxes(page);
	closePx(scale, 1, 0.01);

	closePx(base.width, PRJ_W);
	closePx(base.height, PRJ_H);

	closePx(fg.x - stage.x, 200);
	closePx(fg.y - stage.y, 168);
	closePx(fg.width, 300);
	closePx(fg.height, 600);

	closePx(btnA.x - stage.x, 250);
	closePx(btnA.y - stage.y, 360);
	// widthはBtnLayerのfit倍率（文字を箱に収める自動scale。BtnLayer.tsx:104-114）が
	//	transformとして掛かるため、boundingBoxのwidth/heightはCSS指定値どおりにならない
	//	（本テストの主眼は位置追従なので、ボタンの箱サイズはCSS指定値の確認をbutton.e2e.ts側に譲る）
});

test('窓が広いとき（拡大）、背景・前景・ボタンも同じ倍率で拡大される', async ({page})=> {
	await page.setViewportSize({width: PRJ_W * 1.5, height: PRJ_H * 1.5});
	await expect.poll(async ()=> (await page.locator('#skynovel').boundingBox())!.width, {timeout: 5_000})
		.toBeCloseTo(PRJ_W * 1.5, -1);

	const {scale, stage, fg, btnA} = await boxes(page);
	closePx(scale, 1.5, 0.05);
	closePx(fg.x - stage.x, 200 * scale);
	closePx(fg.width, 300 * scale);
	closePx(btnA.x - stage.x, 250 * scale);
	closePx(btnA.y - stage.y, 360 * scale);
});

test('窓が狭いとき（縮小）、背景・前景・ボタンも同じ倍率で縮小される', async ({page})=> {
	await page.setViewportSize({width: Math.round(PRJ_W * 0.6), height: Math.round(PRJ_H * 0.6)});
	await expect.poll(async ()=> (await page.locator('#skynovel').boundingBox())!.width, {timeout: 5_000})
		.toBeCloseTo(PRJ_W * 0.6, -1);

	const {scale, stage, base, btnA} = await boxes(page);
	closePx(scale, 0.6, 0.05);
	closePx(base.width, PRJ_W * scale);
	closePx(btnA.x - stage.x, 250 * scale);
});

test('縦横比の違う窓（横広）では高さが上限になっても、ボタン位置は倍率どおり追従する', async ({page})=> {
	// stage.e2e.tsの「縦に余裕がない窓では高さ側が上限になる」と同じロジックのケース
	await page.setViewportSize({width: PRJ_W * 2, height: PRJ_H});
	await expect.poll(async ()=> (await page.locator('#skynovel').boundingBox())!.height, {timeout: 5_000})
		.toBeCloseTo(PRJ_H, -1);

	const {scale, stage, btnA} = await boxes(page);
	closePx(scale, 1, 0.05);	// 高さ基準なので窓を横に広げても倍率は変わらない
	closePx(btnA.x - stage.x, 250 * scale);
	closePx(btnA.y - stage.y, 360 * scale);
});

test('本文表示中（レイヤ変更後）にウインドウを変えても、表示中のレイヤが新しい倍率へ追従する', async ({page})=> {
	// タイトル相当の[s]をボタンで抜け、本編相当（[lay layer=fg left=524 …]で前景を動かした後）の
	//	[l]待ちまで進める
	await page.getByText('ボタンA').click();
	await waitWaitMark(page);	// 'すすんだ'（[l]待ち）

	await page.setViewportSize({width: Math.round(PRJ_W * 1.3), height: Math.round(PRJ_H * 1.3)});
	await expect.poll(async ()=> (await page.locator('#skynovel').boundingBox())!.width, {timeout: 5_000})
		.toBeCloseTo(PRJ_W * 1.3, -1);

	const {scale, stage, fg} = await boxes(page);
	closePx(scale, 1.3, 0.05);
	closePx(fg.x - stage.x, 524 * scale);	// [l]手前で動かした後の座標
	closePx(fg.y - stage.y, 168 * scale);
});

test('全画面にすると背景・前景・ボタンは画面の左上を基準に同じ倍率で描かれる', async ({page})=> {
	// 予約キー'w'で全画面要求→実際に切り替わるまで待つ（sys.e2e.tsと同じ手順。
	//	requestFullscreen()はユーザー操作が要るため本物のキーイベントから呼ぶ）
	await page.keyboard.press('w');
	await expect.poll(async ()=> page.evaluate(()=> document.fullscreenElement !== null),
		{timeout: 5_000}).toBe(true);

	// 全画面要素（#skynovel）は本家同様に左上固定（Stage.tsxのコメント参照。中央寄せはしない）
	const stage = (await page.locator('#skynovel').boundingBox())!;
	closePx(stage.x, 0);
	closePx(stage.y, 0);

	const {scale, base, fg, btnA} = await boxes(page);
	closePx(base.width, PRJ_W * scale);
	closePx(fg.x - stage.x, 200 * scale);
	closePx(btnA.x - stage.x, 250 * scale);
	closePx(btnA.y - stage.y, 360 * scale);

	await page.keyboard.press('w');	// 元へ戻す
});

test('全画面を解除すると、元のウインドウサイズに応じた表示へ戻る', async ({page})=> {
	await page.keyboard.press('w');
	await expect.poll(async ()=> page.evaluate(()=> document.fullscreenElement !== null),
		{timeout: 5_000}).toBe(true);

	await page.keyboard.press('w');
	await expect.poll(async ()=> page.evaluate(()=> document.fullscreenElement !== null),
		{timeout: 5_000}).toBe(false);

	// 解除後は元の窓（PRJ_W x PRJ_H＝等倍）に応じた表示に戻る
	const {scale, stage, btnA} = await boxes(page);
	closePx(scale, 1, 0.05);
	closePx(btnA.x - stage.x, 250);
	closePx(btnA.y - stage.y, 360);
});

test('[button hint=…]の吹き出しは、拡縮後もボタンの実寸位置から一定の隙間で出る', async ({page})=> {
	// 吹き出し自体の位置決めロジックはtest/Hint.test.tsの担当（hintPos/hintFlip）。
	//	ここでは「拡縮された後のボタンの実測位置」から正しく出ることだけを見る
	//	（button.e2e.tsの同種テストの拡縮版）。HintMng.show()はgetBoundingClientRect（実測px）を
	//	そのまま使うので、gap=8pxは画面拡縮の影響を受けない固定値のまま
	await page.setViewportSize({width: Math.round(PRJ_W * 1.4), height: Math.round(PRJ_H * 1.4)});
	await expect.poll(async ()=> (await page.locator('#skynovel').boundingBox())!.width, {timeout: 5_000})
		.toBeCloseTo(PRJ_W * 1.4, -1);

	const hint = page.locator('body > div.sn_hint');
	await page.getByText('ヒント').hover();
	await expect(hint).toBeVisible();

	const btn = (await page.getByText('ヒント').boundingBox())!;
	const hb = (await hint.boundingBox())!;
	// hint_opt未指定の既定placementは'top'（Hint.ts hintPlace()）：ボタン上端の8px上に出る
	closePx(hb.y + hb.height, btn.y - 8, 2);

	await page.mouse.move(0, 0);
	await expect(hint).toBeHidden();
});
