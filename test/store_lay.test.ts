/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2026-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

// ストア側でしか解けないレイヤ操作＝「現在の並び」が要るもの。
//	[lay float=/index=/dive=]の重なり順と、[clear_lay]のlayer省略（＝全レイヤ）。
//	zustandのcreate()はDOMを要らないので、ここはユニットテストで直接触れる
//	（描画順がDOMの並びに落ちるところはE2E側＝lay.e2e.ts）。
//	本家：LayerMng.ts:489 #lay() の float/index/dive

import {useStore} from '../src/store/store';

import {beforeEach, expect, it} from 'bun:test';


const S = ()=> useStore.getState();
// レイヤを3枚。配列の並びがそのまま描画順（後ろほど手前）
beforeEach(()=> {
	useStore.setState({aPage: [[], []], foreIdx: 0});
	for (const nm of ['a', 'b', 'c']) S().addLayer({cls: 'grp', nm, fn: '', src: '', aFace: []});
});
// 表裏それぞれの並び。**両面が常に同じ順**であることが他の処理の前提
const order = ()=> useStore.getState().aPage.map(a=> a.map(e=> e.nm).join(''));


it('moveLay_float', ()=> {
	S().moveLay({nm: 'a', mode: 'float'});
	expect(order()).toEqual(['bca', 'bca']);	// 最前面＝配列の末尾へ
});

it('moveLay_floatOnTopIsNoop', ()=> {
	S().moveLay({nm: 'c', mode: 'float'});
	expect(order()).toEqual(['abc', 'abc']);
});

it('moveLay_index', ()=> {
	S().moveLay({nm: 'c', mode: 'index', index: 1});
	expect(order()).toEqual(['acb', 'acb']);
});

it('moveLay_indexClamped', ()=> {
	// 範囲外は端へ丸める（本家はpixiのsetChildIndexが例外を投げるが、
	//	シナリオを止めるほどではないので丸める側にした）
	S().moveLay({nm: 'a', mode: 'index', index: 99});
	expect(order()).toEqual(['bca', 'bca']);
});

it('moveLay_diveBelowLater', ()=> {
	// aを「cのすぐ下」へ。aが抜けた分cは1つ下がるので、行き先は index 1
	S().moveLay({nm: 'a', mode: 'dive', dive: 'c'});
	expect(order()).toEqual(['bac', 'bac']);
});

it('moveLay_diveBelowEarlier', ()=> {
	// cを「aのすぐ下」へ＝最背面
	S().moveLay({nm: 'c', mode: 'dive', dive: 'a'});
	expect(order()).toEqual(['cab', 'cab']);
});

it('moveLay_diveSameThrows', ()=> {
	expect(()=> S().moveLay({nm: 'a', mode: 'dive', dive: 'a'}))
		.toThrow('[lay] 属性 layerとdiveが同じ【a】です');
});

it('moveLay_diveUnknownThrows', ()=> {
	expect(()=> S().moveLay({nm: 'a', mode: 'dive', dive: 'zz'}))
		.toThrow('[lay] 属性 dive【zz】が不正です');
});

it('moveLay_unknownLayerThrows', ()=> {
	expect(()=> S().moveLay({nm: 'zz', mode: 'float'})).toThrow('存在しないレイヤ zz です');
});


it('clearLay_allLayers', ()=> {
	S().chgPic({nm: 'a', page: 'fore', fn: 'pa', src: '/pa.png', aFace: []});
	S().chgPic({nm: 'c', page: 'fore', fn: 'pc', src: '/pc.png', aFace: []});
	S().chgLay({nm: 'a', page: 'fore', sty: {left: 10, visible: false}});

	S().clearLay({aLayNm: null, page: 'fore'});	// layer省略＝全レイヤ

	const fore = useStore.getState().aPage[0];
	expect(fore.map(e=> e.cls === 'grp' ? e.fn : '')).toEqual(['', '', '']);
	// 見た目は「未指定」へ戻すが、**visibleだけは触らない**（本家 Layer.clearLay()）
	expect(fore[0]!.left).toBeUndefined();
	expect(fore[0]!.visible).toBe(false);
});

it('clearLay_someLayers', ()=> {
	S().chgPic({nm: 'a', page: 'fore', fn: 'pa', src: '/pa.png', aFace: []});
	S().chgPic({nm: 'c', page: 'fore', fn: 'pc', src: '/pc.png', aFace: []});

	S().clearLay({aLayNm: ['a'], page: 'fore'});

	const fore = useStore.getState().aPage[0];
	expect(fore.map(e=> e.cls === 'grp' ? e.fn : '')).toEqual(['', '', 'pc']);
});

it('clearLay_unknownLayerThrows', ()=> {
	expect(()=> S().clearLay({aLayNm: ['zz'], page: 'fore'})).toThrow('存在しないレイヤ zz です');
});


// ============ フィルター（[add_filter]系） ============

const FLT1 = {css: 'sepia(1)', enabled: true};
const FLT2 = {css: 'blur(2px)', enabled: true};
const aFltOf = (nm: string, page: 0 | 1 = 0)=>
	useStore.getState().aPage[page].find(e=> e.nm === nm)?.aFlt;

it('chgFilter_addStacks', ()=> {
	S().chgFilter({aLayNm: ['a'], page: 'fore', mode: 'add', flt: FLT1});
	S().chgFilter({aLayNm: ['a'], page: 'fore', mode: 'add', flt: FLT2});
	expect(aFltOf('a')).toEqual([FLT1, FLT2]);	// 重ねる（重なり順＝配列順）
	expect(aFltOf('b')).toBeUndefined();
});

it('chgFilter_replaceIsOne', ()=> {
	// [lay filter=…]は置き換え（本家 Layer.lay()）
	S().chgFilter({aLayNm: ['a'], page: 'fore', mode: 'add', flt: FLT1});
	S().chgFilter({aLayNm: ['a'], page: 'fore', mode: 'replace', flt: FLT2});
	expect(aFltOf('a')).toEqual([FLT2]);
});

it('chgFilter_clear', ()=> {
	S().chgFilter({aLayNm: ['a'], page: 'fore', mode: 'add', flt: FLT1});
	S().chgFilter({aLayNm: ['a'], page: 'fore', mode: 'clear'});
	expect(aFltOf('a')).toBeUndefined();
});

it('chgFilter_bothPages', ()=> {
	// 本家 ext_fg2.sn の [add_filter layer=… page=both filter=…] と同じ形
	S().chgFilter({aLayNm: ['a'], page: 'both', mode: 'add', flt: FLT1});
	expect(aFltOf('a', 0)).toEqual([FLT1]);
	expect(aFltOf('a', 1)).toEqual([FLT1]);
});

it('chgFilter_allLayers', ()=> {
	S().chgFilter({aLayNm: null, page: 'fore', mode: 'add', flt: FLT1});
	expect(useStore.getState().aPage[0].map(e=> e.aFlt)).toEqual([[FLT1], [FLT1], [FLT1]]);
});

it('chgFilter_enable', ()=> {
	S().chgFilter({aLayNm: ['a'], page: 'fore', mode: 'add', flt: FLT1});
	S().chgFilter({aLayNm: ['a'], page: 'fore', mode: 'add', flt: FLT2});
	S().chgFilter({aLayNm: ['a'], page: 'fore', mode: 'enable', index: 1, enabled: false});
	expect(aFltOf('a')).toEqual([FLT1, {...FLT2, enabled: false}]);
});

it('chgFilter_enableChecks', ()=> {
	// 本家 #enable_filter2() と同じ検査
	expect(()=> S().chgFilter({aLayNm: ['a'], page: 'fore', mode: 'enable', index: 0}))
		.toThrow('a にフィルターがありません');

	S().chgFilter({aLayNm: ['a'], page: 'fore', mode: 'add', flt: FLT1});
	expect(()=> S().chgFilter({aLayNm: ['a'], page: 'fore', mode: 'enable', index: 3}))
		.toThrow('a のフィルターの個数（1）を越えています');
});

it('chgFilter_clearLayDropsFilters', ()=> {
	// [clear_lay]は見た目を「未指定」へ戻すので、フィルターも一緒に落ちる
	S().chgFilter({aLayNm: ['a'], page: 'fore', mode: 'add', flt: FLT1});
	S().clearLay({aLayNm: ['a'], page: 'fore'});
	expect(aFltOf('a')).toBeUndefined();
});
