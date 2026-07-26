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
import {SEL_FORE, gotoSn, mesStr, pressKeyToWaitMark, snap} from './snPage';


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

test('[graph]は本文中に画像を置く（アニメpngも同じ仕組み）', async ({page})=> {
	await pressKeyToWaitMark(page, 'Space');

	// 本文としては全角空白1つぶん。平文（ストアのstr）にもその1文字が残る
	expect(await mesStr(page)).toBe('本文中に　置く');

	// 画像はシートなので<img>ではなくクラス付きのspan（GrpLayerと同じ再生CSS）
	const el = page.locator(`${SEL_FORE} span[data-lay="mes"] span[class^="sn_ani"]`);
	await expect(el).toHaveCount(1);
	expect(await el.evaluate(e=> getComputedStyle(e).backgroundImage)).toMatch(/anime\.4x1\.png/);
});

test('[l]/[p]の待ちマークはbreakline/breakpageの画像になる', async ({page})=> {
	// [l]：breakline はアニメpng（.json）なので、読み終わるとクラス付きのspanが出る
	const mark = page.locator(`${SEL_FORE} span[data-lay="mes"] > span:nth-child(2)`);
	await expect(mark.locator('span[class^="sn_ani"]')).toHaveCount(1);
	expect(await mark.textContent()).toBe('');	// 🩷は出ない

	// [p]：breakpage は静止画なので<img>
	await pressKeyToWaitMark(page, 'Space');
	await expect(mark.locator('img')).toHaveCount(1);
	expect(await mark.locator('img').getAttribute('src')).toMatch(/anime\.4x1\.png$/);
});

test('[graph]の寸法・ずらしが効く', async ({page})=> {
	// 本家 TxtStage.ts:685-688。**書いた時だけ**当てる（省略時は本文と同じ全角空白1つぶんの枠）。
	//	ずらしは translate ——行の高さや隣の文字の位置を動かさないため
	for (let i = 0; i < 2; ++i) await pressKeyToWaitMark(page, 'Space');
	expect(await mesStr(page)).toBe('すんぽう　あり');

	// **本文の中だけ**を見る（待ちマークのbreaklineも同じsn_aniクラスを持つため、
	//	レイヤ全体で拾うと2つになる）。本文は data-lay の1つめの子（charsRef）
	const el = page.locator(`${SEL_FORE} span[data-lay="mes"] > span:nth-child(1) span[class^="sn_ani"]`);
	await expect(el).toHaveCount(1);
	const sty = await el.evaluate(e=> {
		const cs = getComputedStyle(e);
		return {w: cs.width, h: cs.height, t: cs.translate, d: cs.display};
	});
	expect(sty.w).toBe('48px');
	expect(sty.h).toBe('24px');
	expect(sty.t).toBe('3px -5px');
	expect(sty.d).toBe('inline-block');
});

test('[l]の待ちマークの位置・寸法が効く', async ({page})=> {
	for (let i = 0; i < 3; ++i) await pressKeyToWaitMark(page, 'Space');
	expect(await mesStr(page)).toBe('おわり');

	const mark = page.locator(`${SEL_FORE} span[data-lay="mes"] > span:nth-child(2)`);
	const sty = await mark.evaluate(e=> {
		const cs = getComputedStyle(e);
		return {w: cs.width, h: cs.height, t: cs.translate};
	});
	expect(sty.w).toBe('32px');
	expect(sty.h).toBe('16px');
	expect(sty.t).toBe('4px -2px');
});

test('縦書きでは待ちマークを-90°回す', async ({page})=> {
	// 背景画像も<img>も writing-mode では回らないので、横書き用に描かれた絵（▼＝次の行の方向を
	//	指す）が縦書きでも下を向いたままになる。本家は待ちマークを本文とは別のpixiコンテナへ
	//	固定位置で置くのでこの問題が出ない
	const mark = page.locator(`${SEL_FORE} span[data-lay="mes"] > span:nth-child(2)`);
	expect(await mark.evaluate(e=> getComputedStyle(e).rotate)).toBe('none');	// 横書きでは回さない

	for (let i = 0; i < 4; ++i) await pressKeyToWaitMark(page, 'Space');
	expect(await mesStr(page)).toBe('たて');

	expect(await mark.evaluate(e=> getComputedStyle(e).rotate)).toBe('-90deg');
	// 本文自体が縦書きになっていることも確かめる（レイヤのstyleが効いていなければ意味がない）
	expect(await page.locator(`${SEL_FORE} span[data-lay="mes"]`)
		.evaluate(e=> getComputedStyle(e).writingMode)).toBe('vertical-rl');
});
