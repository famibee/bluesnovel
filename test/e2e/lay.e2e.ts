/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2026-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

// [lay]のレイヤ共通属性と[clear_lay]（シナリオ：test/e2e/app/prj_lay/main.sn）。
//	どのアクションを積むかは test/ScriptEngine_lay.test.ts が持っているので、
//	ここで見るのは「そのアクションが最終的に算出CSSへ落ちているか」だけ。

import {expect, test} from '@playwright/test';
import {gotoSn, mesStr, pressKey, snap, txtBoxStyle} from './snPage';

test.beforeEach(async ({page})=> {await gotoSn(page, 'lay')});

test('left/top/alpha/rotation/scale_*が文字レイヤの算出CSSになる', async ({page})=> {
	// [lay]で何も指定していない状態＝TxtLayerのCSS既定のまま（left/topはstyChild、topは48%）
	expect(await txtBoxStyle(page, 'left')).toBe('0px');
	expect(await txtBoxStyle(page, 'opacity')).toBe('1');
	expect((await snap(page)).aLay.find(l=> l.nm === 'mes')?.left).toBeUndefined();

	await pressKey(page, 'Space');
	expect(await mesStr(page)).toBe('うごいた');

	expect(await txtBoxStyle(page, 'left')).toBe('40px');
	expect(await txtBoxStyle(page, 'top')).toBe('80px');
	expect(await txtBoxStyle(page, 'opacity')).toBe('0.5');
	// rotation=30度・scale(2, 0.5) が1つのtransformにまとまる。
	//	算出値は行列（matrix）になるので、回転30度＋拡縮の成分で確かめる
	//	[a c e]   a= 2cos30= 1.732…  c= -0.5sin30= -0.25
	//	[b d f]   b= 2sin30= 1        d=  0.5cos30=  0.433…
	const m = (await txtBoxStyle(page, 'transform')).match(/matrix\(([^)]+)\)/)?.[1]?.split(', ').map(Number);
	expect(m?.[0]).toBeCloseTo(2 * Math.cos(Math.PI / 6), 3);
	expect(m?.[1]).toBeCloseTo(2 * Math.sin(Math.PI / 6), 3);
	expect(m?.[2]).toBeCloseTo(-0.5 * Math.sin(Math.PI / 6), 3);
	expect(m?.[3]).toBeCloseTo(0.5 * Math.cos(Math.PI / 6), 3);
	expect(await txtBoxStyle(page, 'transform-origin')).toBe('0px 0px');
});

test('b_colorが文字レイヤ背景色になる（b_alphaはそのアルファ）', async ({page})=> {
	await pressKey(page, 'Space');
	expect(await txtBoxStyle(page, 'background-color')).toBe('rgba(255, 128, 0, 0.6)');

	const {aLay} = await snap(page);
	expect(aLay.find(l=> l.nm === 'mes')?.b_alpha).toBe(0.6);
});

test('style属性は既定スタイルを上書きする', async ({page})=> {
	await pressKey(page, 'Space');
	expect(await txtBoxStyle(page, 'letter-spacing')).toBe('normal');

	await pressKey(page, 'Space');
	expect(await mesStr(page)).toBe('すたいる');
	expect(await txtBoxStyle(page, 'letter-spacing')).toBe('4px');
});

test('visible=falseでレイヤが消える', async ({page})=> {
	await pressKey(page, 'Space');
	await pressKey(page, 'Space');
	expect(await txtBoxStyle(page, 'display')).toBe('block');	// position:absoluteのspanなのでblock扱い

	await pressKey(page, 'Space');
	expect(await txtBoxStyle(page, 'display')).toBe('none');
});

test('[clear_lay]は見た目を初期値へ戻し中身も捨てるが、visibleは触らない', async ({page})=> {
	for (let i = 0; i < 4; ++i) await pressKey(page, 'Space');	// [clear_lay]まで進める

	// 見た目の指定が全て「未指定」へ戻る（＝TxtLayerのCSS既定に従う状態）
	const lay = (await snap(page)).aLay.find(l=> l.nm === 'mes');
	expect(lay?.left).toBeUndefined();
	expect(lay?.top).toBeUndefined();
	expect(lay?.alpha).toBeUndefined();
	expect(lay?.rotation).toBeUndefined();
	expect(lay?.scale_x).toBeUndefined();
	expect(lay?.b_color).toBeUndefined();
	expect(lay?.style).toBeUndefined();
	expect(await txtBoxStyle(page, 'opacity')).toBe('1');
	// b_color/styleも捨てられ、既定の背景色・字間へ戻る
	expect(await txtBoxStyle(page, 'background-color')).toBe('rgb(127, 255, 212)');
	expect(await txtBoxStyle(page, 'letter-spacing')).toBe('normal');
	// 中身（文字）も消える
	expect(await mesStr(page)).toBe('');

	// visibleだけは触らない（本家 Layer.clearLay() のコメントそのまま）。直前のvisible=falseが残る
	expect(await txtBoxStyle(page, 'display')).toBe('none');
});
