/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2026-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

// swipeleft/right/up/down判定（src/ts/Swipe.ts）。本家tinygestureの既定閾値
//	（辺の15%、最小25px）を距離条件だけに整理した式なので、その境界値を確認する

import {detectSwipe} from '../src/ts/Swipe';

import {expect, it} from 'bun:test';


const W = 1000, H = 800;	// thX=150, thY=120

it('横移動が閾値を超えたらswipeleft/right', ()=> {
	expect(detectSwipe(-151, 0, W, H)).toBe('swipeleft');
	expect(detectSwipe(151, 0, W, H)).toBe('swiperight');
});

it('縦移動が閾値を超えたらswipeup/down', ()=> {
	expect(detectSwipe(0, -121, W, H)).toBe('swipeup');
	expect(detectSwipe(0, 121, W, H)).toBe('swipedown');
});

it('閾値ちょうどでは不発火（超過が条件）', ()=> {
	expect(detectSwipe(150, 0, W, H)).toBeUndefined();
	expect(detectSwipe(0, 120, W, H)).toBeUndefined();
});

it('移動量が小さいと不発火', ()=> {
	expect(detectSwipe(10, 10, W, H)).toBeUndefined();
});

it('斜め移動は絶対値の大きい軸だけ判定（対角スワイプ非対応）', ()=> {
	expect(detectSwipe(200, 50, W, H)).toBe('swiperight');	// 横が優勢
	expect(detectSwipe(50, 200, W, H)).toBe('swipedown');	// 縦が優勢
});

it('最小閾値25pxが下限になる（極小画面）', ()=> {
	expect(detectSwipe(20, 0, 10, 10)).toBeUndefined();
	expect(detectSwipe(26, 0, 10, 10)).toBe('swiperight');
});
