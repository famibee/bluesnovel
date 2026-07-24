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
	for (const nm of ['a', 'b', 'c']) S().addLayer({cls: 'grp', nm, fn: '', aFace: []});
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
	S().chgPic({nm: 'a', page: 'fore', fn: 'pa', aFace: []});
	S().chgPic({nm: 'c', page: 'fore', fn: 'pc', aFace: []});
	S().chgLay({nm: 'a', page: 'fore', sty: {left: 10, visible: false}});

	S().clearLay({aLayNm: null, page: 'fore'});	// layer省略＝全レイヤ

	const fore = useStore.getState().aPage[0];
	expect(fore.map(e=> e.cls === 'grp' ? e.fn : '')).toEqual(['', '', '']);
	// 見た目は「未指定」へ戻すが、**visibleだけは触らない**（本家 Layer.clearLay()）
	expect(fore[0]!.left).toBeUndefined();
	expect(fore[0]!.visible).toBe(false);
});

it('clearLay_someLayers', ()=> {
	S().chgPic({nm: 'a', page: 'fore', fn: 'pa', aFace: []});
	S().chgPic({nm: 'c', page: 'fore', fn: 'pc', aFace: []});

	S().clearLay({aLayNm: ['a'], page: 'fore'});

	const fore = useStore.getState().aPage[0];
	expect(fore.map(e=> e.cls === 'grp' ? e.fn : '')).toEqual(['', '', 'pc']);
});

it('clearLay_unknownLayerThrows', ()=> {
	expect(()=> S().clearLay({aLayNm: ['zz'], page: 'fore'})).toThrow('存在しないレイヤ zz です');
});
