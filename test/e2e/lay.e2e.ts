/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2026-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

// [lay]のレイヤ共通属性と[clear_lay]（シナリオ：test/e2e/app/prj_lay/main.sn）。
//	どのアクションを積むかは test/ScriptEngine_lay.test.ts が持っているので、
//	ここで見るのは「そのアクションが最終的に算出CSSへ落ちているか」だけ。

import {expect, test} from '@playwright/test';
import {gotoSn, grpBoxStyle, hasInlineStyle, mesStr, pressKey, snap, txtBoxStyle} from './snPage';

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
	// 見た目の不透明度は b_alpha × sys:TextLayer.Back.Alpha（本家 TxtLayer.ts:388。sys:の既定は0.5）
	expect(await txtBoxStyle(page, 'background-color')).toBe('rgba(255, 128, 0, 0.3)');

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

test('pivot_x/pivot_yが回転・拡縮の原点（transform-origin）になる', async ({page})=> {
	for (let i = 0; i < 4; ++i) await pressKey(page, 'Space');
	expect(await mesStr(page)).toBe('ぴぼっと');

	// 本家のpivot（pixiのDisplayObject.pivot）に当たるものはCSSのtransform-origin。
	//	未指定なら 0px 0px（＝左上）で、これは従来の指定と同じ
	expect(await txtBoxStyle(page, 'transform-origin')).toBe('50px 80px');
});

test('blendmodeがmix-blend-modeになる', async ({page})=> {
	for (let i = 0; i < 4; ++i) await pressKey(page, 'Space');
	expect(await txtBoxStyle(page, 'mix-blend-mode')).toBe('multiply');
});

test('[lay float=true]でレイヤが最前面（DOMの末尾）へ移る', async ({page})=> {
	// 配列・DOMの並びがそのまま描画順（後ろほど手前）。[add_lay]順は base -> mes。
	//	GrpLayerの根はdiv、TxtLayerの根はspanなので、タグ名の並びで見分けられる
	const domOrder = async ()=> page.evaluate(()=> [...document.querySelectorAll(
		'#skynovel [data-page="fore"] > *')].map(e=> e.tagName));
	expect((await snap(page)).aLay.map(l=> l.nm)).toEqual(['base', 'mes']);
	expect(await domOrder()).toEqual(['DIV', 'SPAN']);

	for (let i = 0; i < 5; ++i) await pressKey(page, 'Space');
	expect(await mesStr(page)).toBe('まえへ');

	// baseが最前面＝配列の末尾へ。裏ページも同じ並びに保たれる
	const s = await snap(page);
	expect(s.aLay.map(l=> l.nm)).toEqual(['mes', 'base']);
	expect(s.aLayBack.map(l=> l.nm)).toEqual(['mes', 'base']);
	// mesの直前でボタン（次テスト用に[button]を1つ乗せている）が加わり、mes自体は
	//	本文spanとボタン箱spanの2枚になる（TxtLayer.tsx参照）ので、SPANが1つ増える
	expect(await domOrder()).toEqual(['SPAN', 'SPAN', 'DIV']);
});

test('[lay float=true]はボタンを持つ層の上にも効く（BtnLayer.tsxのz-index:2に負けない）', async ({page})=> {
	// BtnLayer.tsxの各ボタンは`position: relative; z-index: 2`を持つ。TxtLayer側でその値を
	//	`isolation: isolate`で閉じ込めていないと、[lay float=]でDOM順を入れ替えても
	//	ボタンだけがz-indexでStageレベルの最前面に居座り、baseを前面へ動かしても覆えない
	//	（todo.md 2026-08-20：実テンプレのアルバム画面で【最初から】【ロード】ボタン文字が
	//	画像ビュアーの上に透けて見え続けていた不具合の再現）
	for (let i = 0; i < 5; ++i) await pressKey(page, 'Space');
	expect(await mesStr(page)).toBe('まえへ');

	const box = await page.getByText('ぼたん').boundingBox();
	if (! box) throw 'ボタン【ぼたん】の位置が取得できません';
	const topTag = await page.evaluate(([x, y])=> document.elementFromPoint(x, y)?.tagName,
		[box.x + box.width / 2, box.y + box.height / 2] as [number, number]);
	// baseが最前面へ移り、ボタン（span）の位置にはbase（GrpLayerの根=div）が来る
	expect(topTag).toBe('DIV');
});

test('[add_filter]が重なってCSSのfilterになり、[enable_filter]で個別に切れる', async ({page})=> {
	for (let i = 0; i < 6; ++i) await pressKey(page, 'Space');
	expect(await mesStr(page)).toBe('ふぃるた');

	// 重なり順＝[add_filter]の順。CSSのfilterは関数を空白区切りで並べる
	expect(await txtBoxStyle(page, 'filter')).toBe('sepia(1) blur(3px)');

	await pressKey(page, 'Space');
	expect(await mesStr(page)).toBe('きった');
	expect(await txtBoxStyle(page, 'filter')).toBe('sepia(1)');	// index=1（blur）だけ無効に
});

test('[clear_lay]は見た目を初期値へ戻し中身も捨てるが、visibleは触らない', async ({page})=> {
	for (let i = 0; i < 10; ++i) await pressKey(page, 'Space');	// [clear_lay]まで進める

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
	// b_color/styleも捨てられ、既定の見た目へ戻る。ただし**中身が空になった層は箱を描かない**ので
	//	背景は透明（既定色のaquamarineが出るのは文字がある層だけ。TxtLayer noBox）
	expect(await txtBoxStyle(page, 'background-color')).toBe('rgba(0, 0, 0, 0)');
	expect(await txtBoxStyle(page, 'border-style')).toBe('none');
	expect(await txtBoxStyle(page, 'letter-spacing')).toBe('normal');
	expect(await txtBoxStyle(page, 'filter')).toBe('none');	// フィルターも一緒に落ちる
	// 中身（文字）も消える
	expect(await mesStr(page)).toBe('');

	// visibleだけは触らない（本家 Layer.clearLay() のコメントそのまま）。直前のvisible=falseが残る
	expect(await txtBoxStyle(page, 'display')).toBe('none');
});

test('b_alpha=0の層は文字があっても箱（背景＋点線枠）を描かない', async ({page})=> {
	// 点線枠は「本来見えない文字層の位置と大きさ」を示す試作の目印だが、**CSSのborderなので
	//	b_alphaが効かない**。透過度0の指定だけでは点線矩形が残ってしまっていた
	//	（テンプレの[txt_lay_fullscreen b_alpha=0]は全画面なので画面いっぱいの点線として見えた）
	for (let i = 0; i < 11; ++i) await pressKey(page, 'Space');
	expect(await mesStr(page)).toBe('とうめい');

	expect(await txtBoxStyle(page, 'border-style')).toBe('none');
	expect(await txtBoxStyle(page, 'background-color')).toBe('rgba(0, 0, 0, 0)');
	// 文字そのものは見える（消えるのは箱だけ）
	expect(await txtBoxStyle(page, 'display')).toBe('block');
});

test('[lay back_clear=true]は背景を初期状態へ戻す', async ({page})=> {
	// b_color/b_alpha/b_alpha_isfixedを積んでから[lay back_clear=true]で消す
	for (let i = 0; i < 12; ++i) await pressKey(page, 'Space');
	expect(await mesStr(page)).toBe('はいけい');
	// アルファ1はブラウザがrgb()表記に丸める（noBoxのrgba(0,0,0,0)とは違う経路）
	expect(await txtBoxStyle(page, 'background-color')).toBe('rgb(0, 0, 255)');

	await pressKey(page, 'Space');
	expect(await mesStr(page)).toBe('けした');

	// b_alpha=0（透明）に戻るので、noBoxが立って箱（背景＋点線枠）ごと描かれなくなる
	//	（noBox = bAlpha===0 || ... なので、b_colorが消えたかどうかに関わらずtransparent）
	expect(await txtBoxStyle(page, 'background-color')).toBe('rgba(0, 0, 0, 0)');
	expect(await txtBoxStyle(page, 'border-style')).toBe('none');
	const lay = (await snap(page)).aLay.find(l=> l.nm === 'mes');
	expect(lay?.b_color).toBeUndefined();
	expect(lay?.b_alpha).toBe(0);
});

test('[er]は変形まわりだけを既定へ戻し、位置と見た目には触らない', async ({page})=> {
	// 本家 Layer.ts:420。[clear_lay]と違って位置（left/top）や style は残る
	//	——本家の #er() も clearLay(hArg) しか呼ばないため
	for (let i = 0; i < 9; ++i) await pressKey(page, 'Space');	// [er]の後まで
	expect(await mesStr(page)).toBe('もどった');

	const lay = (await snap(page)).aLay.find(l=> l.nm === 'mes');
	for (const k of ['alpha', 'rotation', 'scale_x', 'scale_y', 'pivot_x', 'pivot_y', 'blendmode'] as const) {
		expect(lay?.[k]).toBeUndefined();
	}
	// 位置と見た目は残る
	expect(lay?.left).toBe(40);
	expect(lay?.top).toBe(50);
	expect(await txtBoxStyle(page, 'letter-spacing')).toBe('3px');
	// 算出値でも変形が落ちている（[lay]が書いた分のインラインstyleごと消える）
	expect(await txtBoxStyle(page, 'opacity')).toBe('1');
	expect(await txtBoxStyle(page, 'mix-blend-mode')).toBe('normal');
});

test('[lay width=/height=]が画像レイヤの箱サイズ（div0のCSS width/height）になる', async ({page})=> {
	for (let i = 0; i < 14; ++i) await pressKey(page, 'Space');
	expect(await mesStr(page)).toBe('がぞうわく');

	expect(await grpBoxStyle(page, 'width', 'base')).toBe('120px');
	expect(await grpBoxStyle(page, 'height', 'base')).toBe('90px');
});

test('[lay width=]単独指定は本家と違い他方を潰さない（heightキー自体を持たない）', async ({page})=> {
	for (let i = 0; i < 15; ++i) await pressKey(page, 'Space');
	expect(await mesStr(page)).toBe('はばだけ');

	// base3は新規レイヤ（widthだけ指定）。本家GrpLayer.ts:88-91ならheightに0が入り
	//	縦潰れで消えるが、bluesnovelはwidth/heightを独立して扱うのでheightは未指定のまま
	expect(await grpBoxStyle(page, 'width', 'base3')).toBe('200px');
	expect(await hasInlineStyle(page, 'base3', 'height')).toBe(false);
});

test('[lay b_pic=…]は文字表示領域を枠画像の自然サイズへ自動調整する（[lay width=/height=]が無ければ）', async ({page})=> {
	for (let i = 0; i < 16; ++i) await pressKey(page, 'Space');
	expect(await mesStr(page)).toBe('わくじどう');

	// waku.pngの自然サイズは80x40（prj_btnpicと共有）
	await expect.poll(async ()=> txtBoxStyle(page, 'width', 'mes'), {timeout: 5_000}).toBe('80px');
	expect(await txtBoxStyle(page, 'height', 'mes')).toBe('40px');
});

test('[lay width=/height=]の明示はb_picの自動サイズより勝つ', async ({page})=> {
	for (let i = 0; i < 17; ++i) await pressKey(page, 'Space');
	expect(await mesStr(page)).toBe('わくめいじ');

	expect(await txtBoxStyle(page, 'width', 'mes')).toBe('200px');
	expect(await txtBoxStyle(page, 'height', 'mes')).toBe('100px');
});

test('[lay break_fixed=true]は[l]/[p]待ちマーカーを固定位置（padding＋break_fixed_left/top）へ絶対配置する', async ({page})=> {
	for (let i = 0; i < 18; ++i) await pressKey(page, 'Space');
	expect(await mesStr(page)).toBe('かたまり');

	// 待ちマーカーのプロキシ span（data-wait-focus）の算出スタイル。
	//	原点は文字表示領域の左上＝padding(16px 既定)＋指定値 → left:116px / top:76px
	const SEL = '#skynovel [data-page="fore"] span[data-lay="mes"] [data-wait-focus]';
	const st = await page.$eval(SEL,
		el=> {const c = getComputedStyle(el); return {position: c.position, left: c.left, top: c.top}});
	expect(st.position).toBe('absolute');
	expect(st.left).toBe('116px');	// padding 16（既定）＋ break_fixed_left 100
	expect(st.top).toBe('76px');	// padding 16（既定）＋ break_fixed_top 60

	// padding を style=（本家互換のCSS指定）で変えても、原点は getComputedStyle 実測で追従する
	//	（pl/pr/pt/pb 属性で指定したのと同じ結果。style= 経由でも 16px 決め打ちに戻らない）
	await pressKey(page, 'Space');
	expect(await mesStr(page)).toBe('ついか');
	const st2 = await page.$eval(SEL,
		el=> {const c = getComputedStyle(el); return {left: c.left, top: c.top}});
	expect(st2.left).toBe('130px');	// padding-left 30 ＋ break_fixed_left 100
	expect(st2.top).toBe('68px');	// padding-top 8 ＋ break_fixed_top 60
});
