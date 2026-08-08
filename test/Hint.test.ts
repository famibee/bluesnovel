/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2026-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

// ツールチップ（[button hint=…]・[link hint=…]）の位置決め（src/ts/Hint.ts）。
//	本家はpopper.jsに任せているが、こちらは依存を増やさず自前で置く。
//	置き場所の計算とhint_optの読み取りは純粋なのでここで、実際の出し入れはE2Eで見る。

import {clampPos, hintFlip, hintPlace, hintPos} from '../src/ts/Hint';

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

// hintFlip：画面端はみ出し対応（本家popperのflipモディファイア相当の簡易版）
const VP = {width: 400, height: 300};

it('hintFlip_keepsPlaceWhenItFits', ()=> {
	// 上に十分な余白があればそのまま
	expect(hintFlip(TRG, BOX, 'top', 8, VP)).toBe('top');
});

it('hintFlip_flipsToOppositeWhenOverflowing', ()=> {
	// 画面最上部に近いボタンでは上に置くと収まらないので下へ反転
	const trgNearTop = {left: 100, top: 5, width: 60, height: 20};
	expect(hintFlip(trgNearTop, BOX, 'top', 8, VP)).toBe('bottom');
	// 画面最下部に近いボタンでは下に置くと収まらないので上へ反転
	const trgNearBottom = {left: 100, top: 285, width: 60, height: 10};
	expect(hintFlip(trgNearBottom, BOX, 'bottom', 8, VP)).toBe('top');
	// 左右も同様
	const trgNearLeft = {left: 2, top: 100, width: 20, height: 20};
	expect(hintFlip(trgNearLeft, BOX, 'left', 8, VP)).toBe('right');
	const trgNearRight = {left: 390, top: 100, width: 5, height: 20};
	expect(hintFlip(trgNearRight, BOX, 'right', 8, VP)).toBe('left');
});

it('hintFlip_keepsOriginalWhenBothSidesOverflow', ()=> {
	// 上下どちらに置いても収まらない（縦に極端に狭いビューポート）なら元の向きのまま
	//	——最終位置はclampPosが画面内に収める
	const shortVp = {width: 400, height: 20};
	const trg = {left: 100, top: 10, width: 60, height: 5};
	expect(hintFlip(trg, BOX, 'bottom', 8, shortVp)).toBe('bottom');
});

it('clampPos_keepsWithinViewport', ()=> {
	// 中央揃えのずれで画面外に出る分だけ画面内へ収める
	expect(clampPos({left: -10, top: 50}, BOX, VP)).toEqual({left: 0, top: 50});
	expect(clampPos({left: 350, top: 50}, BOX, VP)).toEqual({left: VP.width - BOX.width, top: 50});
	expect(clampPos({left: 50, top: -10}, BOX, VP)).toEqual({left: 50, top: 0});
	expect(clampPos({left: 50, top: 280}, BOX, VP)).toEqual({left: 50, top: VP.height - BOX.height});
});

it('clampPos_noOverflowLeavesPositionUnchanged', ()=> {
	expect(clampPos({left: 90, top: 162}, BOX, VP)).toEqual({left: 90, top: 162});
});
