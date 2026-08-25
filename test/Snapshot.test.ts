/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2026-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

// [snapshot]の純粋部分（src/ts/Snapshot.ts）。撮影そのものはDOMが要るのでE2E（snap.e2e.ts）で、
//	ここで見るのは「ファイル名・フォーマット・背景色をどう決めるか」だけ。
//	本家 LayerMng.ts:338 #snapshot() の前半に当たる。

import {dlFn, mimeOfFn, rgbaOf} from '../src/ts/Snapshot';

import {expect, it} from 'bun:test';


it('mimeOfFn_拡張子でフォーマットが決まる', ()=> {
	expect(mimeOfFn('a.png')).toBe('image/png');
	expect(mimeOfFn('a.jpg')).toBe('image/jpeg');
	expect(mimeOfFn('a.JPEG')).toBe('image/jpeg');
	// 知らない拡張子・拡張子なしはpng扱い（撮影ごと失敗させない）
	expect(mimeOfFn('a.webp')).toBe('image/png');
	expect(mimeOfFn('a')).toBe('image/png');
});

it('dlFn_日時は拡張子の前に入る', ()=> {
	// 本家は `fn + 日時 + '.png'` 固定なのでダウンロード名は常にpngになっていた
	expect(dlFn('shot.jpg')).toMatch(/^shot[\d_-]+\.jpg$/);
	expect(dlFn('shot')).toMatch(/^shot[\d_-]+\.png$/);
	// 日時は本家 getDateStr('-', '_', '', '_') と同じ並び（2026-07-26_1830_190）。ミリ秒まで
	//	含むのは連投（短時間に複数回撮る）で同名上書きにならないようにするため
	expect(dlFn('x.png')).toMatch(/^x\d{4}-\d{2}-\d{2}_\d{4}_\d{1,3}\.png$/);
});

it('rgbaOf_高2桁がアルファ', ()=> {
	// [lay b_color=]の0xRRGGBBとは別物（tag.html#snapshot「透過2桁＋赤2桁＋緑2桁＋青2桁」）
	expect(rgbaOf(0xFF000000)).toBe('rgba(0, 0, 0, 1)');			// 不透明な黒
	expect(rgbaOf(0x0)).toBe('rgba(0, 0, 0, 0)');					// 完全透過
	expect(rgbaOf(0xFFFF8000)).toBe('rgba(255, 128, 0, 1)');
	// 6桁で書くとアルファ0＝透過。**本家web版はここが逆**（LayerMng.ts:383 が透過2桁アリの
	//	ときにbackgroundAlphaを0にする）だが、tag.htmlの記述に合わせた
	expect(rgbaOf(0xFF0000)).toBe('rgba(255, 0, 0, 0)');
});
