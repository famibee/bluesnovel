/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2026-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

// 色成分フィルター（本家のColorMatrixFilterのプリセット）が**実際に色を変えている**か
//	（シナリオ：test/e2e/app/prj_filter/main.sn）。
//	行列の値そのものは test/ScriptEngine_filter.test.ts。
//
//	**ここは画素で見るしかない**。CSSのfilter関数と違い、算出値は`url(#sn_cm_…)`としか
//	言わないので、算出CSSを見ても効いたかどうかは分からない。
//	そこで色の分かっている矩形（文字レイヤの背景＝b_color）を撮って中身を数える。
//	CSS側の9種（sepia/blurなど）は算出値で足りるので lay.e2e.ts が見ている。

import {expect, test} from '@playwright/test';
import type {Page} from '@playwright/test';
import {SEL_FORE, gotoSn, mesStr, pressKey} from './snPage';

test.beforeEach(async ({page})=> {await gotoSn(page, 'filter')});

// 文字レイヤの背景の中心1点の色。画面を撮ってその座標を数える
async function bgColor(page: Page): Promise<[number, number, number]> {
	const box = (await page.locator(`${SEL_FORE} span[data-lay="mes"]`).boundingBox())!;
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
// 画素の比較。文字が乗っていない場所を撮っているとはいえ、拡縮やアンチエイリアスで
//	数値はぴったりにならないので幅を持たせる
function near(a: [number, number, number], b: [number, number, number]) {
	for (let i = 0; i < 3; ++i) expect(Math.abs(a[i]! - b[i]!)).toBeLessThan(24);
}

// 文字レイヤ背景の中央付近を格子状に拾い、R チャンネルの分散を返す（ノイズの検出用）
async function bgVariance(page: Page): Promise<number> {
	const box = (await page.locator(`${SEL_FORE} span[data-lay="mes"]`).boundingBox())!;
	const b64 = (await page.screenshot()).toString('base64');
	return page.evaluate(async ({b64, box})=> {
		const img = new Image;
		img.src = `data:image/png;base64,${b64}`;
		await img.decode();
		const cvs = document.createElement('canvas');
		cvs.width = img.naturalWidth;
		cvs.height = img.naturalHeight;
		const ctx = cvs.getContext('2d')!;
		ctx.drawImage(img, 0, 0);
		const x0 = Math.round(box.x + box.width * 0.25);
		const y0 = Math.round(box.y + box.height * 0.25);
		const d = ctx.getImageData(x0, y0, Math.round(box.width * 0.5), Math.round(box.height * 0.5)).data;
		const rs: number[] = [];
		for (let i = 0; i < d.length; i += 4 * 7) rs.push(d[i]!);	// 適当に間引く
		const m = rs.reduce((s, v)=> s + v, 0) / rs.length;
		return rs.reduce((s, v)=> s + (v - m) ** 2, 0) / rs.length;
	}, {b64, box});
}


test('フィルター無しなら指定した色そのまま', async ({page})=> {
	expect(await mesStr(page)).toBe('あか');
	near(await bgColor(page), [255, 0, 0]);
});

test('[add_filter filter=to_bgr]で赤が青になる', async ({page})=> {
	// pixiのtoBGR（赤→青・青→赤）と同じ5x4行列をSVGのfeColorMatrixへ流している。
	//	**算出CSSはurl(#…)としか言わない**ので、効いたことは画素でしか確かめられない
	await pressKey(page, 'Space');
	expect(await mesStr(page)).toBe('あお');
	near(await bgColor(page), [0, 0, 255]);

	// CSS側は<filter>要素を指しているだけ。要素が同一文書内に出ていることも見る
	expect(await page.locator(`${SEL_FORE} span[data-lay="mes"]`)
		.evaluate(el=> getComputedStyle(el).filter)).toMatch(/^url\(.*#sn_cm_/);
	expect(await page.locator('filter[id^="sn_cm_"]').count()).toBe(1);
});

test('[enable_filter enabled=false]で元の色へ戻る', async ({page})=> {
	for (let i = 0; i < 2; ++i) await pressKey(page, 'Space');
	expect(await mesStr(page)).toBe('もどる');
	near(await bgColor(page), [255, 0, 0]);
});

test('[add_filter filter=noise]で単色の背景がザラつく（画素の分散が出る）', async ({page})=> {
	// pixiのNoiseFilterをSVGのfeTurbulenceで近似したもの。ピクセル一致はしないので
	//	「効いているか」は単色矩形の画素分散で見る（フィルタ無しなら分散≒0）
	await pressKey(page, 'Space');	// あお
	await pressKey(page, 'Space');	// もどる（フィルタ無効）
	const flat = await bgVariance(page);
	await pressKey(page, 'Space');	// のいず
	expect(await mesStr(page)).toBe('のいず');
	const noisy = await bgVariance(page);
	expect(flat).toBeLessThan(15);			// もとは単色（AA分の揺れだけ）
	expect(noisy).toBeGreaterThan(flat + 40);	// ノイズで明確にザラつく

	expect(await page.locator(`${SEL_FORE} span[data-lay="mes"]`)
		.evaluate(el=> getComputedStyle(el).filter)).toMatch(/^url\(.*#sn_nz_/);
	expect(await page.locator('filter[id^="sn_nz_"]').count()).toBe(1);
});

test('[add_filter filter=color_matrix]は書いた行列どおりに色を落とす', async ({page})=> {
	// 緑成分だけを残す行列。緑の背景はそのまま緑で出る
	for (let i = 0; i < 4; ++i) await pressKey(page, 'Space');
	expect(await mesStr(page)).toBe('みどり');
	near(await bgColor(page), [0, 255, 0]);
});
