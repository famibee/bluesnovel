/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2026-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

// 立ち絵シェーダエフェクト（[add_fx]/[clear_fx]。分家独自の試作。ANIMATION_RESEARCH.md §7）。
//	ここは純粋部分だけ：bldFx() の検査・既定値と、エンジンが出すアクション。
//	<img>→<canvas> 差し替えの seam・aFx の [clear_lay]／page=both 追随は test/e2e/fx.e2e.ts。
//	Filter.ts に対する test/ScriptEngine_filter.test.ts と同じ役割分担。

import {ScriptEngine, type T_ENGINE_ACTION} from '../src/ts/ScriptEngine';
import {bldFx} from '../src/ts/Fx';

import {expect, it} from 'bun:test';


const LAYS = '[add_lay layer=base class=grp][add_lay layer=mes class=txt]';
function acts(src: string): T_ENGINE_ACTION[] {return new ScriptEngine('t1', `${LAYS}${src}[s]`).step()}


// ============ Fx.ts（純粋部分） ============

it('bldFx_プリセットの既定値（既定は H_FX_DEF の1箇所）', ()=> {
	expect(bldFx({fx: 'wave'})).toEqual({
		name: '', fx: 'wave', glsl: '', time: 0, speed: 1, params: {amp: 6, freq: 2}});
	expect(bldFx({fx: 'rgbShift'})).toEqual({
		name: '', fx: 'rgbShift', glsl: '', time: 0, speed: 1, params: {shift: 4}});
});

it('bldFx_属性で既定を上書き（拾うのは A_FX_PARAM の範囲だけ）', ()=> {
	const f = bldFx({fx: 'wave', amp: '10', freq: '3', name: 'w', time: '1500', speed: '0.8'});
	expect(f).toMatchObject({name: 'w', fx: 'wave', time: 1500, speed: 0.8});
	expect(f.params).toEqual({amp: 10, freq: 3});
	// A_FX_PARAM（amp/freq/shift）はプリセット横断の白名簿。wave が読まない shift も
	//	書けば記録はされる（シェーダ側が対応 uniform を持たないので無害＝[add_filter] が
	//	未知属性を黙殺するのと同じ緩さ）
	expect(bldFx({fx: 'wave', shift: '9'}).params).toEqual({amp: 6, freq: 2, shift: 9});
	// 属性を書かなければ増えない
	expect(bldFx({fx: 'wave'}).params).toEqual({amp: 6, freq: 2});
});

it('bldFx_fx も glsl も無ければ throw', ()=> {
	expect(()=> bldFx({})).toThrow('fx= か glsl= のどちらかが必要です');
});

it('bldFx_生 glsl は試作では未対応', ()=> {
	expect(()=> bldFx({glsl: 'void main(){}'})).toThrow('glsl= は未対応です');
});

it('bldFx_未知のプリセット名は対応一覧つきで throw', ()=> {
	expect(()=> bldFx({fx: 'glitch'})).toThrow('fx【glitch】は未対応です');
});

it('bldFx_数値でないパラメータは throw', ()=> {
	expect(()=> bldFx({fx: 'wave', amp: 'もじ'})).toThrow('[add_fx] amp の値が不正です：もじ');
});


// ============ [add_fx] ============

it('addFx_pushes（[add_filter] と同じ #argLayNames / #argPageBoth）', ()=> {
	expect(acts('[add_fx layer=base fx=wave amp=10 freq=3]').find(v=> v.t === 'addFx'))
		.toEqual({t: 'addFx', aLayNm: ['base'], page: 'fore',
			fx: {name: '', fx: 'wave', glsl: '', time: 0, speed: 1, params: {amp: 10, freq: 3}}});
});

it('addFx_layer省略は全レイヤ・page=bothで両面', ()=> {
	expect(acts('[add_fx page=both fx=rgbShift]').find(v=> v.t === 'addFx'))
		.toMatchObject({aLayNm: null, page: 'both'});
});

it('addFx_不正な page は throw', ()=> {
	expect(()=> acts('[add_fx layer=base fx=wave page=all]'))
		.toThrow('[add_fx] 属性 page【all】が不正です');
});

it('addFx_自体は待たない（[tsy] と同じく skip を返す）', ()=> {
	// step() が [s] まで一気に到達している＝[add_fx] で止まっていない
	expect(acts('[add_fx layer=base fx=wave]').some(v=> v.t === 'addFx')).toBe(true);
});


// ============ [clear_fx] ============

it('clearFx_name はカンマ区切りで複数可（省略はそのレイヤの fx 全部＝null）', ()=> {
	expect(acts('[clear_fx layer=base name=a,b]').find(v=> v.t === 'clearFx'))
		.toEqual({t: 'clearFx', aLayNm: ['base'], page: 'fore', names: ['a', 'b']});
	expect(acts('[clear_fx layer=base]').find(v=> v.t === 'clearFx'))
		.toEqual({t: 'clearFx', aLayNm: ['base'], page: 'fore', names: null});
});

it('fxTags_はマクロ名に使えない', ()=> {
	expect(()=> acts('[macro name=add_fx]'))
		.toThrow('[add_fx]はタグ名のため、マクロ名として使用できません');
	expect(()=> acts('[macro name=wait_fx]'))
		.toThrow('[wait_fx]はタグ名のため、マクロ名として使用できません');
});


// ============ [wait_fx]（実際に待つのは ScriptMng。ここはアクションの形だけ） ============

it('waitFx_layer= / name= を受ける（[wait_tsy] と同形。page= は受けない）', ()=> {
	// name= はカンマ区切り複数可（#argLayNames 流用）。canskip 既定 true
	expect(acts('[wait_fx layer=base]').at(-1))
		.toEqual({t: 'waitFx', aLayNm: ['base'], names: null, canskip: true});
	expect(acts('[wait_fx name=a,b]').at(-1))
		.toEqual({t: 'waitFx', aLayNm: null, names: ['a', 'b'], canskip: true});
	expect(acts('[wait_fx layer=base name=g canskip=false]').at(-1))
		.toEqual({t: 'waitFx', aLayNm: ['base'], names: ['g'], canskip: false});
});

it('waitFx_layer= も name= も無ければ throw（最低一方必須）', ()=> {
	expect(()=> acts('[wait_fx]')).toThrow('[wait_fx] layer= か name= のどちらかが必要です');
});

it('waitFx_自体で step() が止まる（[s] まで進まない＝stop を返す）', ()=> {
	const a = acts('[add_fx layer=base fx=wave time=500][wait_fx layer=base]');
	expect(a.at(-1)!.t).toBe('waitFx');	// [s] の stop アクションはここには来ない
	expect(a.some(v=> v.t === 'addFx')).toBe(true);
});
