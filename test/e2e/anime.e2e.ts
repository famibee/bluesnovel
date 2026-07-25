/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2026-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

// アニメpng（APNGではなく独自のスプライトシート）。
//	定義jsonの読み取りは純粋な処理なので test/Sprite.test.ts が持つ。ここで見るのは
//	ブラウザでしか確かめられない部分＝**非同期に読んだシートがCSSアニメとして組まれること**と、
//	シートの.jsonが<img>として描かれてしまわないこと。

import {expect, test} from '@playwright/test';
import {SEL_FORE, gotoSn, snap} from './snPage';


test.beforeEach(async ({page})=> {await gotoSn(page, 'anime')});

test('[lay fn=…]の解決結果が.jsonならスプライトシートとして再生する', async ({page})=> {
	// ストアが持つのはURLまで（＝.jsonのまま）。コマ割りは画面側が読む
	const {aLay} = await snap(page);
	expect(aLay.find(l=> l.nm === 'bg')?.src).toMatch(/anime\.json$/);

	// シートは<img>ではなく背景画像を送るdivで描く
	expect(await page.locator(`${SEL_FORE} div[data-lay="bg"] img`).count()).toBe(0);

	const box = page.locator(`${SEL_FORE} div[data-lay="bg"] > div`);
	await expect(box).toHaveCount(1);
	const o = await box.evaluate(el=> {
		const s = getComputedStyle(el);
		return {
			w: s.width, h: s.height,
			img: s.backgroundImage,
			dur: s.animationDuration,
			fnc: s.animationTimingFunction,
			cnt: s.animationIterationCount,
		};
	});
	// 1コマぶんの大きさ（20x20）に切り出して、シート画像を背景に敷く
	expect(o.w).toBe('20px');
	expect(o.h).toBe('20px');
	expect(o.img).toMatch(/anime\.4x1\.png/);
	// 4コマ・animationSpeed=0.2（毎秒12コマ）＝一巡 4/12 秒。
	//	横並び（1行）なので、速い軸（横）が一巡ぶん、遅い軸（縦）も同じ長さになる
	expect(o.dur).toBe('0.333333s, 0.333333s');
	expect(o.fnc).toBe('steps(4), steps(1)');
	expect(o.cnt).toBe('infinite, infinite');	// 速い軸・遅い軸の2本とも回し続ける
});

test('シート画像は実際に読み込まれる（404にならない）', async ({page})=> {
	// path.jsonの`論理名.列x行`ではなく、json内のmeta.imageからjsonと同じ場所を引く
	// シートの読み込みは非同期（waitIdleはそこまで待たない）ので、locator側の自動待ちに任せる
	const a = await page.locator(`${SEL_FORE} div[data-lay="bg"] > div`).evaluate(async el=> {
		const url = getComputedStyle(el).backgroundImage.replace(/^url\(["']?|["']?\)$/g, '');
		const r = await fetch(url);
		return {ok: r.ok, type: r.headers.get('content-type') ?? ''};
	});
	expect(a.ok).toBe(true);
	expect(a.type).toContain('image/png');
});

test('コマが実際に進む（背景位置が変わる）', async ({page})=> {
	// CSSのstepsアニメなので、時間が経つと背景位置が1コマ（20px）ずつずれていく。
	//	一巡0.333秒＝1コマ約83ms。取りこぼしを避けるため何度か覗いて種類を数える
	const box = page.locator(`${SEL_FORE} div[data-lay="bg"] > div`);
	const aPos = new Set<string>();
	for (let i = 0; i < 8; ++i) {
		aPos.add(await box.evaluate(el=> getComputedStyle(el).backgroundPositionX));
		await page.waitForTimeout(60);
	}
	expect(aPos.size).toBeGreaterThan(1);
});
