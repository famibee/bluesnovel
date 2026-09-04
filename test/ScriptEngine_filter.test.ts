/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2026-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

// フィルター（[add_filter]/[clear_filter]/[enable_filter]・[lay filter=…]）。
//	本家 LayerMng.ts:836 #add_filter() ＋ Layer.ts:101 bldFilters()。
//	**表示アーキテクチャ変更の影響が一番大きい所**：本家はpixiのフィルター22種だが、
//	bluesnovelはCSSのfilterプロパティなので、CSSの同名関数とpixiで数式が一致するものだけ
//	素で書く（blur/brightness/black_and_white/negative/saturate/sepia）。hue/contrast/
//	grayscaleはCSSと数式が違うため他のプリセットと同じくfeColorMatrix行き（src/ts/Filter.ts参照）

import {ScriptEngine, type T_ENGINE_ACTION} from '../src/ts/ScriptEngine';
import {bldFilter, fltId, matsOf, styFilter, blurId, blurValues, blursOf, blendmodeOf, noiseId, noisesOf} from '../src/ts/Filter';

import {expect, it} from 'bun:test';


const LAYS = '[add_lay layer=base class=grp][add_lay layer=mes class=txt]';
function acts(src: string): T_ENGINE_ACTION[] {return new ScriptEngine('t1', `${LAYS}${src}[s]`).step()}


// ============ Filter.ts（純粋部分） ============

it('bldFilter_cssNative', ()=> {
	// 既定値は本家（Layer.ts hBldFilter）に合わせてある。CSSの同名関数と数式が一致するものだけ
	expect(bldFilter({filter: 'blur'}).css).toBe('blur(8px)');
	expect(bldFilter({filter: 'blur', strength: '3'}).css).toBe('blur(3px)');
	expect(bldFilter({filter: 'brightness'}).css).toBe('brightness(0.5)');
	expect(bldFilter({filter: 'brightness', b: '0.2'}).css).toBe('brightness(0.2)');
	expect(bldFilter({filter: 'black_and_white'}).css).toBe('grayscale(1)');
	expect(bldFilter({filter: 'negative'}).css).toBe('invert(1)');
	expect(bldFilter({filter: 'sepia'}).css).toBe('sepia(1)');
});

it('bldFilter_grayscaleはCSSと数式が違うのでfeColorMatrix行き', ()=> {
	// pixi greyscale(scale)は(R+G+B)*scaleを全チャンネルへ＝常に無彩色になる行列
	expect(bldFilter({filter: 'grayscale', scale: '1'}).mat).toEqual([
		1, 1, 1, 0, 0,
		1, 1, 1, 0, 0,
		1, 1, 1, 0, 0,
		0, 0, 0, 1, 0]);
	// 既定値は本家どおり0.5
	expect(bldFilter({filter: 'grayscale'}).mat).toEqual([
		0.5, 0.5, 0.5, 0, 0,
		0.5, 0.5, 0.5, 0, 0,
		0.5, 0.5, 0.5, 0, 0,
		0, 0, 0, 1, 0]);
});

it('bldFilter_contrastはCSSと数式が違うのでfeColorMatrix行き', ()=> {
	// pixi contrast(amount)は v=amount+1・o=-0.5*(v-1)。既定amount=0.5→v=1.5
	const m = bldFilter({filter: 'contrast'}).mat!;
	expect(m[0]).toBe(1.5);
	expect(m[4]).toBeCloseTo(-0.25, 10);
});

it('bldFilter_hueは属性名f_rotation（本家どおり）で既定90度', ()=> {
	// f_rotation=0なら恒等行列（回転なし）
	expect(bldFilter({filter: 'hue', f_rotation: '0'}).mat).toEqual([
		1, 0, 0, 0, 0,
		0, 1, 0, 0, 0,
		0, 0, 1, 0, 0,
		0, 0, 0, 1, 0]);
	// 既定は90度（0だと変化が分かりづらいため。本家Layer.ts:235）。恒等行列にならない
	expect(bldFilter({filter: 'hue'}).mat).not.toEqual([
		1, 0, 0, 0, 0,
		0, 1, 0, 0, 0,
		0, 0, 1, 0, 0,
		0, 0, 0, 1, 0]);
	// rotation（誤った旧属性名）は無視され、既定のf_rotation=90が使われる
	expect(bldFilter({filter: 'hue', rotation: '45'}).mat).toEqual(bldFilter({filter: 'hue'}).mat);
});

it('bldFilter_saturate', ()=> {
	// pixiのsaturate(amount)は「1を基準にamountぶん増やす」。CSSも1が等倍なので足して渡す
	expect(bldFilter({filter: 'saturate'}).css).toBe('saturate(1.5)');
	expect(bldFilter({filter: 'saturate', amount: '1'}).css).toBe('saturate(2)');
});

it('bldFilter_enableFilterAttr', ()=> {
	// 「足すけれど最初は効かせない」（本家 bldFilters() の enable_filter 属性）
	expect(bldFilter({filter: 'sepia'}).enabled).toBe(true);
	expect(bldFilter({filter: 'sepia', enable_filter: 'false'}).enabled).toBe(false);
});

it('bldFilter_noiseはfeTurbulence行き（[amount, seed]）', ()=> {
	// pixiのNoiseFilter＝ピクセルごとの加算モノクロ白色ノイズ。CSSにもfeColorMatrixにも
	//	相当が無いのでSVGのfeTurbulenceで近似する（Stage.tsx）。既定は本家どおりnoise=0.5、
	//	seedは本家と違い固定0（Math.random()だと再レンダーのたびに<filter>が作り直される）
	expect(bldFilter({filter: 'noise'}).noise).toEqual([0.5, 0]);
	expect(bldFilter({filter: 'noise', noise: '0.2'}).noise).toEqual([0.2, 0]);
	expect(bldFilter({filter: 'noise', seed: '7'}).noise).toEqual([0.5, 7]);
	expect(bldFilter({filter: 'noise', seed: '3.9'}).noise).toEqual([0.5, 3]);	// 整数へ切り捨て
	const f = bldFilter({filter: 'noise'});
	expect(f.css).toBe(`url(#${noiseId(f.noise!)})`);
});

it('noiseId_同じ(amount,seed)は同じid・違えば違うid', ()=> {
	expect(noiseId([0.5, 0])).toBe(noiseId([0.5, 0]));
	expect(noiseId([0.5, 0])).not.toBe(noiseId([0.5, 1]));
	expect(noiseId([0.5, 0])).not.toBe(noiseId([0.4, 0]));
});

it('noisesOf_有効なnoiseだけを集める', ()=> {
	const a = bldFilter({filter: 'noise'});
	const b = bldFilter({filter: 'noise', noise: '0.3', enable_filter: 'false'});
	expect(noisesOf([a, b, {css: 'sepia(1)', enabled: true}])).toEqual([a.noise!]);
});

it('bldFilter_unknown', ()=> {
	expect(()=> bldFilter({filter: 'nazo'})).toThrow('filter が異常です');	// 本家と同じ文言
	expect(()=> bldFilter({})).toThrow('filter が異常です');
});

it('bldFilter_notNumber', ()=> {
	expect(()=> bldFilter({filter: 'blur', strength: 'もじ'})).toThrow('[add_filter] strengthの値が不正です');
});

it('styFilter_joinsEnabledOnly', ()=> {
	expect(styFilter([])).toBe('');
	expect(styFilter([{css: 'sepia(1)', enabled: true}, {css: 'blur(2px)', enabled: true}]))
		.toBe('sepia(1) blur(2px)');
	expect(styFilter([{css: 'sepia(1)', enabled: false}, {css: 'blur(2px)', enabled: true}]))
		.toBe('blur(2px)');
});


// ============ [add_filter] ============

it('addFilter_pushes', ()=> {
	expect(acts('[add_filter layer=base filter=sepia]').find(v=> v.t === 'addFilter'))
		.toEqual({t: 'addFilter', aLayNm: ['base'], page: 'fore',
			flt: {css: 'sepia(1)', enabled: true}, replace: false});
});

it('addFilter_allLayersAndBothPages', ()=> {
	// layer省略は全レイヤ（[clear_lay]と同じ）。page=bothで両面（本家 ext_fg2.sn がこの形）
	expect(acts('[add_filter page=both filter=brightness]').find(v=> v.t === 'addFilter'))
		.toMatchObject({aLayNm: null, page: 'both'});
});

it('addFilter_invalidPage', ()=> {
	expect(()=> acts('[add_filter layer=base filter=sepia page=all]'))
		.toThrow('[add_filter] 属性 page【all】が不正です');
});


// ============ [lay filter=…] ============

it('layFilter_replaces', ()=> {
	// [lay filter=…]は置き換え（本家 Layer.lay() の `c.filters = [bldFilters(hArg)]`）。
	//	重ねたいなら[add_filter]
	expect(acts('[lay layer=base filter=negative]').find(v=> v.t === 'addFilter'))
		.toEqual({t: 'addFilter', aLayNm: ['base'], page: 'fore',
			flt: {css: 'invert(1)', enabled: true}, replace: true});
});

it('layFilter_withOtherAttrs', ()=> {
	// 見た目の変更とフィルターは同じ[lay]で同時に書ける
	const a = acts('[lay layer=base alpha=0.5 filter=sepia]');
	expect(a.filter(v=> v.t === 'chgLay' || v.t === 'addFilter').map(v=> v.t))
		.toEqual(['chgLay', 'addFilter']);
});


// ============ [clear_filter] / [enable_filter] ============

it('clearFilter', ()=> {
	expect(acts('[clear_filter layer=base page=both]').find(v=> v.t === 'clearFilter'))
		.toEqual({t: 'clearFilter', aLayNm: ['base'], page: 'both'});
});

it('enableFilter', ()=> {
	expect(acts('[enable_filter layer=base index=1 enabled=false]').find(v=> v.t === 'enableFilter'))
		.toEqual({t: 'enableFilter', aLayNm: ['base'], page: 'fore', index: 1, enabled: false});
	// 省略値はindex=0・enabled=true（本家 #enable_filter2()）
	expect(acts('[enable_filter layer=base]').find(v=> v.t === 'enableFilter'))
		.toEqual({t: 'enableFilter', aLayNm: ['base'], page: 'fore', index: 0, enabled: true});
});

it('filterTags_reservedAsMacroName', ()=> {
	expect(()=> acts('[macro name=add_filter]'))
		.toThrow('[add_filter]はタグ名のため、マクロ名として使用できません');
});


// ============ 色成分フィルター（SVGのfeColorMatrix行き）============
//	pixiのColorMatrixFilterのプリセットと同じ5x4行列を出す。**pixiの m[0..19] と
//	SVGの values は並びが同じ**なのでそのまま写せる。実際に絵が変わることはE2E側で見る

it('bldFilter_行列のものはurl(#…)を返す', ()=> {
	const f = bldFilter({filter: 'to_bgr'});
	expect(f.css).toBe(`url(#${fltId(f.mat!)})`);
	// 赤→青・青→赤（pixi toBGR）
	expect(f.mat).toEqual([
		0, 0, 1, 0, 0,
		0, 1, 0, 0, 0,
		1, 0, 0, 0, 0,
		0, 0, 0, 1, 0]);
});

it('bldFilter_オフセットは0〜1に揃える', ()=> {
	// **pixiはmultiply=trueのときだけ255で割る**（_colorMatrix()）＝同じプリセットでも
	//	multiplyの指定で明るさが変わる。こちらは最初からSVGの流儀で書き、その揺れを持ち込まない
	const m = bldFilter({filter: 'kodachrome'}).mat!;
	expect(m[4]).toBeCloseTo(63.72958762196502 / 255, 10);
	expect(m[9]).toBeCloseTo(24.732407896706203 / 255, 10);
	expect(m[14]).toBeCloseTo(35.62982807460946 / 255, 10);
});

it('bldFilter_tintは色を対角に置く', ()=> {
	// 本家の既定は 0x888888
	expect(bldFilter({filter: 'tint'}).mat).toEqual([
		0x88 / 255, 0, 0, 0, 0,
		0, 0x88 / 255, 0, 0, 0,
		0, 0, 0x88 / 255, 0, 0,
		0, 0, 0, 1, 0]);
	expect(bldFilter({filter: 'tint', f_color: '0xFF0000'}).mat?.[0]).toBe(1);
});

it('bldFilter_nightはintensityで強さが変わる', ()=> {
	expect(bldFilter({filter: 'night', intensity: '0.25'}).mat).toEqual([
		-0.5, -0.25, 0, 0, 0,
		-0.25, 0, 0.25, 0, 0,
		0, 0.25, 0.5, 0, 0,
		0, 0, 0, 1, 0]);
});

it('bldFilter_color_matrixはmatrixを20個そのまま受ける', ()=> {
	const a = Array.from({length: 20}, (_, i)=> i);
	expect(bldFilter({filter: 'color_matrix', matrix: a.join(',')}).mat).toEqual(a);
});

it('bldFilter_color_matrixの個数が20でなければthrow（本家と同じ文言）', ()=> {
	expect(()=> bldFilter({filter: 'color_matrix', matrix: '1,2,3'})).toThrow('が 20 ではありません');
});

it('bldFilter_color_matrixは成分ごとの属性でも書ける（既定は恒等行列）', ()=> {
	expect(bldFilter({filter: 'color_matrix'}).mat).toEqual([
		1, 0, 0, 0, 0,
		0, 1, 0, 0, 0,
		0, 0, 1, 0, 0,
		0, 0, 0, 1, 0]);
	expect(bldFilter({filter: 'color_matrix', gtor: '0.5'}).mat?.[1]).toBe(0.5);
});

it('fltId_同じ行列は同じid・違えば違うid', ()=> {
	// idは中身から決まるので、同じ効果は1つの<filter>要素を共有できる
	expect(fltId([1, 2, 3])).toBe(fltId([1, 2, 3]));
	expect(fltId([1, 2, 3])).not.toBe(fltId([1, 2, 4]));
});

it('matsOf_有効な行列だけを集める', ()=> {
	// Stage.tsxが<filter>要素を出すのに使う。無効化中（[enable_filter]）の分は要らない
	const a = bldFilter({filter: 'lsd'});
	const b = bldFilter({filter: 'browni', enable_filter: 'false'});
	expect(matsOf([a, b, {css: 'sepia(1)', enabled: true}])).toEqual([a.mat!]);
});


// ============ blendmode（[add_filter blendmode=…]。フィルター単位のブレンド）============
//	CSSは要素につきmix-blend-modeを1つしか持てないので、実際に効くのは
//	Lay.ts styLay()が[lay blendmode=]の枠へ合流させた先。ここではFilter.ts側の純粋部分だけ見る

it('bldFilter_blendmodeは4種のみ受ける（[lay]/[button]と同じ表）', ()=> {
	expect(bldFilter({filter: 'sepia', blendmode: 'screen'}).blendmode).toBe('screen');
	expect(bldFilter({filter: 'sepia', blendmode: 'add'}).blendmode).toBe('plus-lighter');	// CSSに同名が無いので加算合成へ
	expect(bldFilter({filter: 'sepia'}).blendmode).toBeUndefined();	// 省略時は持たない
	expect(()=> bldFilter({filter: 'sepia', blendmode: 'なぞ'})).toThrow('はサポートされない blendmode です');
});

it('blendmodeOf_有効なものの中で最後の指定が勝つ', ()=> {
	expect(blendmodeOf([])).toBeUndefined();
	expect(blendmodeOf([{css: '', enabled: true}])).toBeUndefined();
	expect(blendmodeOf([
		{css: '', enabled: true, blendmode: 'multiply'},
		{css: '', enabled: false, blendmode: 'screen'},	// 無効化中は無視
		{css: '', enabled: true, blendmode: 'add'},
	])).toBe('add');
});


// ============ blur_x/blur_y（CSSのblur()は半径1つなのでSVGのfeGaussianBlur行き）============

it('bldFilter_blur_x_y無指定なら従来どおりCSSのblur()', ()=> {
	const f = bldFilter({filter: 'blur'});
	expect(f.css).toBe('blur(8px)');
	expect(f.blurXY).toBeUndefined();
});

it('bldFilter_blur_xかblur_yのどちらかでもSVG行きに切り替わる', ()=> {
	// 本家Layer.ts:122-123と同じく既定は2（strengthは効かなくなる）
	const f = bldFilter({filter: 'blur', blur_x: '5'});
	expect(f.blurXY).toEqual([5, 2]);
	expect(f.css).toBe(`url(#${blurId(f.blurXY!)})`);
});

it('bldFilter_blur_x_y両方指定', ()=> {
	expect(bldFilter({filter: 'blur', blur_x: '5', blur_y: '9'}).blurXY).toEqual([5, 9]);
});

it('blurId_同じXYは同じid・違えば違うid', ()=> {
	expect(blurId([5, 9])).toBe(blurId([5, 9]));
	expect(blurId([5, 9])).not.toBe(blurId([5, 8]));
});

it('blurValues_feGaussianBlurのstdDeviationへ', ()=> {
	expect(blurValues([5, 9])).toBe('5 9');
});

it('blursOf_有効なblurXYだけを集める', ()=> {
	const a = bldFilter({filter: 'blur', blur_x: '3'});
	const b = bldFilter({filter: 'blur', blur_x: '4', enable_filter: 'false'});
	expect(blursOf([a, b, {css: 'sepia(1)', enabled: true}])).toEqual([a.blurXY!]);
});
