/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2026-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

// アニメpng（独自スプライトシート）の定義jsonの読み取り（src/ts/Sprite.ts）。
//	jsonの形はTexturePacker形式＝本家がpixiのSpritesheetへ食わせているものと同じ。
//	ここで見るのは「CSSアニメを組むのに要る情報へ畳む」ところだけで、DOMは要らない。
//	値はギャラリーの anime_png サンプル（SKYNovel_gallery/public/prj/anime_png）から取った。

import {aniSpriteCss, loadSheet, parseSheet, setDecFncs, setFetch, sheetImgSrc} from '../src/ts/Sprite';

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

it('aniSpriteCss_stepCountMatchesCntNotGrid', ()=> {
	// CLOCKは格子5x8=40マスだが実コマは3つ。余りマス（37個）の位置を踏んではいけない
	const sh = parseSheet(CLOCK, 'x.png')!;
	const css = aniSpriteCss(sh, 'sn_ani1');
	// 各コマの位置（列優先：1コマ目=(0,0), 2コマ目=(0,-150px), 3コマ目=(0,-300px)）
	expect(css).toContain('background-position: 0px 0px; animation-timing-function: step-end;');
	expect(css).toContain('background-position: 0px -150px; animation-timing-function: step-end;');
	expect(css).toContain('background-position: 0px -300px; animation-timing-function: step-end;');
	// 4コマ目（格子上は存在するが実コマではない位置）は出てこない
	expect(css).not.toContain('-450px');
	// steps()による格子丸ごと走査（cols=5/rows=8）はもう使わない
	expect(css).not.toContain('steps(');
});

it('aniSpriteCss_wrapsToFirstFrameAt100Percent', ()=> {
	// 一巡の終わりは次周期の1コマ目位置へ（stepsのラップ挙動を模倣）
	const sh = parseSheet(BLINK, 'x.png')!;
	const css = aniSpriteCss(sh, 'sn_ani2');
	expect(css).toContain('100% {background-position: 0px 0px;}');
	expect(css).toContain('50% {background-position: -200px 0px; animation-timing-function: step-end;}');
});

// crypto:true構成でのアニメpngシート読込（.jsonはsys.decでテキスト複号、シート画像は
//	ts/Crypto.tsのdecryptPicUrl経由でsys.decABしBlob URL化）。setFetch/setDecFncsで
//	SysBase丸ごと・DOMの<img>無しに注入関数の呼ばれ方だけを見る
it('loadSheet_decryptsJsonAndSheetImageThroughInjectedFncs', async ()=> {
	const json = {frames: {a: {frame: {x: 0, y: 0, w: 10, h: 10}}}, meta: {image: 'clock.5x8.png', size: {w: 10, h: 10}}};
	const encJson = `ENC:${JSON.stringify(json)}`;

	setFetch((async (url: string)=> {
		if (url === '/prj/mat/clock.json') return new Response(encJson);
		if (url === '/prj/mat/clock.5x8.png') return new Response(new Uint8Array([1, 2, 3]).buffer);
		throw `想定外のURL ${url}`;
	}) as typeof fetch);

	const called = {dec: false, decAB: false};
	setDecFncs(
		async (ext, tx)=> {called.dec = true; expect(ext).toBe('json'); return tx.replace(/^ENC:/, '')},
		async ab=> {called.decAB = true; return ab},
		true,	// crypto:true
	);

	const sh = await loadSheet('/prj/mat/clock.json');
	expect(called.dec).toBe(true);
	expect(called.decAB).toBe(true);
	expect(sh?.img.startsWith('blob:')).toBe(true);

	// 後続テストへ影響しないよう、既定（恒等関数・crypto:false）へ戻す
	setFetch((url, init)=> fetch(url, init));
	setDecFncs((_ext, tx)=> Promise.resolve(tx), ab=> Promise.resolve(ab), false);
});

// crypto:falseならシート画像はBlob URL化せず元のURLのまま（anime.e2e.tsが実際に確認する回帰。
//	decryptPicUrlへcryptoを渡し忘れると、crypto:false構成でも無駄にBlob URL化してしまっていた）
it('loadSheet_keepsOriginalImageUrlWhenCryptoFalse', async ()=> {
	const json = {frames: {a: {frame: {x: 0, y: 0, w: 10, h: 10}}}, meta: {image: 'walk.4x1.png', size: {w: 10, h: 10}}};

	setFetch((async (url: string)=> {
		if (url === '/prj/mat/walk.json') return new Response(JSON.stringify(json));
		throw `想定外のURL ${url}`;	// crypto:falseならシート画像へのfetchは発生しない
	}) as typeof fetch);

	const sh = await loadSheet('/prj/mat/walk.json');
	expect(sh?.img).toBe('/prj/mat/walk.4x1.png');

	setFetch((url, init)=> fetch(url, init));
});
