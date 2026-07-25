/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2026-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

// アニメpng（独自スプライトシート）の定義jsonの読み取り（src/ts/Sprite.ts）。
//	jsonの形はTexturePacker形式＝本家がpixiのSpritesheetへ食わせているものと同じ。
//	ここで見るのは「CSSアニメを組むのに要る情報へ畳む」ところだけで、DOMは要らない。
//	値はギャラリーの anime_png サンプル（SKYNovel_gallery/public/prj/anime_png）から取った。

import {parseSheet, sheetImgSrc} from '../src/ts/Sprite';

import {expect, it} from 'bun:test';


// 縦優先（2コマ目が真下）。ギャラリーの clock.5x8：150x150のコマが5列8行＝40コマ
const CLOCK = {
	frames: {
		'clock0001.png': {frame: {x: 0, y: 0, w: 150, h: 150}},
		'clock0002.png': {frame: {x: 0, y: 150, w: 150, h: 150}},
		'clock0003.png': {frame: {x: 0, y: 300, w: 150, h: 150}},
	},
	meta: {image: 'clock.5x8.png', size: {w: 750, h: 1200}, animationSpeed: 0.2},
};
// 横優先（2コマ目が右隣）。ギャラリーの blink.4x1：200x200のコマが4列1行
const BLINK = {
	frames: {
		'blink0001.png': {frame: {x: 0, y: 0, w: 200, h: 200}},
		'blink0002.png': {frame: {x: 200, y: 0, w: 200, h: 200}},
	},
	meta: {image: 'blink.4x1.png', size: {w: 800, h: 200}, animationSpeed: 0.2},
};

it('parseSheet_grid', ()=> {
	const o = parseSheet(CLOCK, '/prj/mat/clock.5x8.png')!;
	expect(o).toMatchObject({img: '/prj/mat/clock.5x8.png', fw: 150, fh: 150, cols: 5, rows: 8});
});

it('parseSheet_colMajorOrder', ()=> {
	// 2コマ目が真下なら縦優先（列ごとに下へ進む）
	expect(parseSheet(CLOCK, 'x.png')!.isCol).toBe(true);
	expect(parseSheet(BLINK, 'x.png')!.isCol).toBe(false);
});

it('parseSheet_secFromAnimationSpeed', ()=> {
	// 本家（pixi AnimatedSprite）のanimationSpeedは「1tick=1/60秒あたりに進むコマ数」。
	//	0.2なら毎秒12コマ＝ここのコマ数3つで 3/12 = 0.25秒
	expect(parseSheet(CLOCK, 'x.png')!.sec).toBeCloseTo(3 / 12);
	// 未指定は1.0＝毎秒60コマ
	expect(parseSheet({...CLOCK, meta: {...CLOCK.meta, animationSpeed: undefined}}, 'x.png')!.sec)
		.toBeCloseTo(3 / 60);
});

it('parseSheet_cntIsActualFrames', ()=> {
	// 格子（5x8=40）ではなく**実際に定義されているコマ数**
	expect(parseSheet(CLOCK, 'x.png')!.cnt).toBe(3);
});

it('parseSheet_undefinedOnBrokenJson', ()=> {
	// 壊れた定義なら「ただの静止画」に落とす（表示ごと止めない）
	expect(parseSheet({frames: {}, meta: {}}, 'x.png')).toBeUndefined();
	expect(parseSheet({frames: {a: {frame: {x: 0, y: 0, w: 0, h: 0}}}, meta: {size: {w: 8, h: 2}}}, 'x.png'))
		.toBeUndefined();
});

it('sheetImgSrc_resolvesBesideJson', ()=> {
	// meta.imageはjsonと同じ場所から引く（path.jsonでは`論理名.列x行`が別項目になっている）
	expect(sheetImgSrc('/prj/mat/clock.json', CLOCK)).toBe('/prj/mat/clock.5x8.png');
	expect(sheetImgSrc('clock.json', CLOCK)).toBe('clock.5x8.png');
});
