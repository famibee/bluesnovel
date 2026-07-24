/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2026-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

// フィルター（[add_filter]/[clear_filter]/[enable_filter]・[lay filter=…]）。
//	本家 LayerMng.ts:836 #add_filter() ＋ Layer.ts:101 bldFilters()。
//	**表示アーキテクチャ変更の影響が一番大きい所**：本家はpixiのフィルター22種だが、
//	bluesnovelはCSSのfilterプロパティなので素で書ける9種のみ（src/ts/Filter.ts参照）

import {ScriptEngine, type T_ENGINE_ACTION} from '../src/ts/ScriptEngine';
import {bldFilter, styFilter} from '../src/ts/Filter';

import {expect, it} from 'bun:test';


const LAYS = '[add_lay layer=base class=grp][add_lay layer=mes class=txt]';
function acts(src: string): T_ENGINE_ACTION[] {return new ScriptEngine('t1', `${LAYS}${src}[s]`).step()}


// ============ Filter.ts（純粋部分） ============

it('bldFilter_cssNative', ()=> {
	// 既定値は本家（Layer.ts hBldFilter）に合わせてある
	expect(bldFilter({filter: 'blur'}).css).toBe('blur(8px)');
	expect(bldFilter({filter: 'blur', strength: '3'}).css).toBe('blur(3px)');
	expect(bldFilter({filter: 'brightness'}).css).toBe('brightness(0.5)');
	expect(bldFilter({filter: 'brightness', b: '0.2'}).css).toBe('brightness(0.2)');
	expect(bldFilter({filter: 'contrast', amount: '0.8'}).css).toBe('contrast(0.8)');
	expect(bldFilter({filter: 'grayscale', scale: '1'}).css).toBe('grayscale(1)');
	expect(bldFilter({filter: 'black_and_white'}).css).toBe('grayscale(1)');
	expect(bldFilter({filter: 'negative'}).css).toBe('invert(1)');
	expect(bldFilter({filter: 'hue', rotation: '90'}).css).toBe('hue-rotate(90deg)');
	expect(bldFilter({filter: 'sepia'}).css).toBe('sepia(1)');
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

it('bldFilter_notYetSupported', ()=> {
	// 本家にはあるがCSSでは素で書けないもの。名前を知らないのか未対応なのかを区別して知らせる
	expect(()=> bldFilter({filter: 'kodachrome'})).toThrow('未対応です');
	expect(()=> bldFilter({filter: 'color_matrix'})).toThrow('未対応です');
	expect(()=> bldFilter({filter: 'noise'})).toThrow('未対応です');
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
