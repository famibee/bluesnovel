/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2026-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

// 画像ボタン（`[button pic=…]`／`[button b_pic=…]`）
//	（シナリオ：test/e2e/app/prj_btnpic/main.sn）。
//	属性がどう積まれるかは test/ScriptEngine_btn.test.ts。ここで見るのは
//	**絵が実際に出ているか・箱の大きさ・状態でコマが変わるか**の3つで、どれもDOMが要る。
//
//	フィクスチャの btn3.png は「通常｜押下｜ホバー」を横に3コマ並べた1枚（本家 Button.ts:269）。
//	1コマ60x40・全体180x40で、**コマごとに色を変えてある**（通常=赤／押下=緑／ホバー=青）ので、
//	今どのコマが出ているかを画素で数えられる。

import {expect, test} from '@playwright/test';
import type {Locator, Page} from '@playwright/test';
import {SEL_FORE, gotoSn, pressKey, waitIdle} from './snPage';

test.beforeEach(async ({page})=> {await gotoSn(page, 'btnpic')});

// 画像ボタンの中心1点の色。画面を撮ってその座標を数える
async function centerColor(page: Page, loc: Locator): Promise<[number, number, number]> {
	const box = (await loc.boundingBox())!;
	const pt = {x: box.x + box.width / 2, y: box.y + box.height / 2};
	const b64 = (await page.screenshot()).toString('base64');
	return page.evaluate(async ({b64, pt})=> {
		const img = new Image;
		img.src = `data:image/png;base64,${b64}`;
		await img.decode();
		const cvs = document.createElement('canvas');
		cvs.width = img.naturalWidth;
		cvs.height = img.naturalHeight;
		const ctx = cvs.getContext('2d')!;
		ctx.drawImage(img, 0, 0);
		const d = ctx.getImageData(Math.round(pt.x), Math.round(pt.y), 1, 1).data;
		return [d[0]!, d[1]!, d[2]!] as [number, number, number];
	}, {b64, pt});
}
function near(a: [number, number, number], b: [number, number, number]) {
	for (let i = 0; i < 3; ++i) expect(Math.abs(a[i]! - b[i]!)).toBeLessThan(24);
}
// 表ページのボタン（span）をn番目で拾う。[l]/[p]/[waitclick]待ちマーカーもフォーカス対応の
//	プロキシとして同じtabindex="0"を持つ（TxtLayer.tsx。todo.md対応）ため、
//	`data-wait-focus`で除いて[button]だけに絞る
const btn = (page: Page, i: number)=> page.locator(`${SEL_FORE} span[tabindex="0"]:not([data-wait-focus])`).nth(i);
// 箱の大きさは**ステージ座標で**測る。boundingBox()はステージのtransform:scaleが掛かった
//	画面上の実寸を返すので、シナリオに書いた数値と直接は比べられない。
//	**絵の実寸が入るのは画像を読み終えてから**（BtnLayerがImageで測る）なので、
//	一度きりの計測ではなく落ち着くまで待つ
const boxSize = (loc: Locator)=> loc.evaluate(el=> ({
	w: (el as HTMLElement).offsetWidth, h: (el as HTMLElement).offsetHeight}));
const expectBoxSize = (loc: Locator, w: number, h: number)=>
	expect.poll(()=> boxSize(loc)).toEqual({w, h});


test('箱の大きさは絵の実寸（横は3コマ分の1/3）', async ({page})=> {
	// 本家 Button.ts:280。絵は180x40の3コマ並びなので、1コマ＝60x40が箱になる
	await expectBoxSize(btn(page, 0), 60, 40);
});

test('寸法の明示指定は絵の実寸より優先される', async ({page})=> {
	// 本家も `'width' in hArg` を優先する
	await pressKey(page, 'Space');
	await waitIdle(page);
	await expectBoxSize(btn(page, 1), 120, 80);
});

test('通常は1コマ目・ホバーで3コマ目・押下で2コマ目', async ({page})=> {
	// **どのコマを見せるかはインラインstyleに書けない**（インラインは:hover/:activeより強い）。
	//	背景を3倍幅に敷き、background-position-x を 0%／50%／100% と動かして切り替えている
	const b = btn(page, 0);
	await expectBoxSize(b, 60, 40);	// 絵を読み終える（＝箱に実寸が入る）まで待ってから撮る
	near(await centerColor(page, b), [255, 0, 0]);	// 通常＝1コマ目（赤）

	await b.hover();
	near(await centerColor(page, b), [0, 0, 255]);	// ホバー＝3コマ目（青）

	// 押下中（:active）。マウスを離すとラベルへ飛んでしまうので、押したままで撮る
	const box = (await b.boundingBox())!;
	await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
	await page.mouse.down();
	near(await centerColor(page, b), [0, 255, 0]);	// 押下＝2コマ目（緑）
	await page.mouse.up();
});

test('[button pic=…]に文字は出ない', async ({page})=> {
	// 本家もpic側の分岐で早期returnし、文字の組み立てへ進まない
	await expectBoxSize(btn(page, 0), 60, 40);
	expect(await btn(page, 0).textContent()).toBe('');
});

test('[button b_pic=…]は文字を残して背後に絵を敷く', async ({page})=> {
	for (let i = 0; i < 2; ++i) {await pressKey(page, 'Space'); await waitIdle(page)}
	const b = btn(page, 2);
	expect(await b.textContent()).toBe('もじ');

	// 背景は要素本体ではなく`::before`疑似要素に敷く（本体は文字を箱へ収めるfit倍率の
	//	transform:scaleを持つため、同じ要素に置くとb_pic枠まで一緒に縮んでしまう）
	const sty = await b.evaluate(el=> {
		const cs = getComputedStyle(el, '::before');
		return {img: cs.backgroundImage, rep: cs.backgroundRepeat};
	});
	expect(sty.img).toMatch(/waku\.png/);
	expect(sty.rep).toBe('no-repeat');
});

test('[button pic=… enabled=false]は3コマ分割せず絵全体を表示する', async ({page})=> {
	// 本家 Button.ts:270 `w = enabled ? w_3 : sp.width` と同じ（ch_gallery/ch_button の
	//	非ボタン用途）。enabled=falseはtabindexが立たないのでbtn()（tabindex="0"限定）では
	//	拾えず、背景画像のURLで探す
	for (let i = 0; i < 3; ++i) {await pressKey(page, 'Space'); await waitIdle(page)}
	const b = page.locator(`${SEL_FORE} span[style*="btn3.png"][style*="pointer-events: none"]`);

	await expectBoxSize(b, 180, 40);	// 3コマ分の1（60x40）ではなく絵の実寸そのまま
	expect(await b.evaluate(el=> getComputedStyle(el).backgroundSize)).toBe('100% 100%');
});
