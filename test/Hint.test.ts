/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2026-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

// ツールチップ（[button hint=…]・[link hint=…]）の位置決め（src/ts/Hint.ts）。
//	本家はpopper.jsに任せているが、こちらは依存を増やさず自前で置く。
//	置き場所の計算とhint_optの読み取りは純粋なのでここで、実際の出し入れはE2Eで見る。

import {hintPlace, hintPos} from '../src/ts/Hint';

import {expect, it} from 'bun:test';


const TRG = {left: 100, top: 200, width: 60, height: 20};	// 対象（ボタン等）の矩形
const BOX = {width: 80, height: 30};						// 吹き出しの大きさ

it('hintPos_topIsDefault', ()=> {
	// 既定は上。横は中央揃え、縦は対象の上端から吹き出しの高さ＋隙間ぶん上
	expect(hintPos(TRG, BOX, 'top', 8)).toEqual({left: 90, top: 162});
});

it('hintPos_bottom', ()=> {
	expect(hintPos(TRG, BOX, 'bottom', 8)).toEqual({left: 90, top: 228});
});

it('hintPos_leftRight', ()=> {
	// 縦は中央揃え、横は対象の外側へ隙間ぶん
	expect(hintPos(TRG, BOX, 'left', 8)).toEqual({left: 12, top: 195});
	expect(hintPos(TRG, BOX, 'right', 8)).toEqual({left: 168, top: 195});
});

it('hintPlace_fromHintOpt', ()=> {
	// hint_optは本家popperのオプションJSON。こちらはplacementだけ見る
	expect(hintPlace(`{"placement": "bottom"}`)).toBe('bottom');
	expect(hintPlace(`{"placement": "left"}`)).toBe('left');
});

it('hintPlace_stripsModifier', ()=> {
	// popperの'bottom-start'のような修飾付きも本体だけ拾う
	expect(hintPlace(`{"placement": "bottom-start"}`)).toBe('bottom');
});

it('hintPlace_defaultsToTop', ()=> {
	// 未指定・未知の値・壊れたJSONはpopperの既定と同じ'top'（ヒント自体は出す）
	expect(hintPlace(undefined)).toBe('top');
	expect(hintPlace('{}')).toBe('top');
	expect(hintPlace(`{"placement": "ななめ"}`)).toBe('top');
	expect(hintPlace('{壊れ')).toBe('top');
});
