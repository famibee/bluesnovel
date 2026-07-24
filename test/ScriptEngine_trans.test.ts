/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2026-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

// ページ裏表（[lay page=…]）・[trans]（裏表の交換）・[wt]（演出終了待ち）のうち、
//	エンジンが担当する「どのアクションを積むか」の部分。
//	実際に画面をクロスフェードさせる・演出の終了を待つのはScriptMng/Stageの担当なのでE2E側（trans.e2e.ts）。
//	本家：LayerMng.ts:603 #trans() / CmnTween.ts:249 wt() / Pages.ts:65 argChk_page()

import {ScriptEngine, type T_ENGINE_ACTION} from '../src/ts/ScriptEngine';

import {expect, it} from 'bun:test';


function acts(src: string): T_ENGINE_ACTION[] {return new ScriptEngine('t1', src).step()}
const LAYS = '[add_lay layer=base class=grp][add_lay layer=0 class=grp][add_lay layer=mes class=txt]';


// ============ [lay]のpage属性 ============

it('layPage_defaultsToFore', ()=> {
	// 本家 Pages.argChk_page(hArg, 'fore')。[lay]の既定は表ページ
	expect(acts(`${LAYS}[lay layer=base fn=bg][s]`).find(v=> v.t === 'chgPic'))
		.toEqual({t: 'chgPic', nm: 'base', page: 'fore', fn: 'bg', aFace: []});
});

it('layPage_back', ()=> {
	expect(acts(`${LAYS}[lay layer=base fn=bg page=back][s]`).find(v=> v.t === 'chgPic'))
		.toEqual({t: 'chgPic', nm: 'base', page: 'back', fn: 'bg', aFace: []});
});

it('layPage_appliesToBAlphaToo', ()=> {
	expect(acts(`${LAYS}[lay layer=mes b_alpha=0.4 page=back][s]`).find(v=> v.t === 'chgBAlpha'))
		.toEqual({t: 'chgBAlpha', nm: 'mes', page: 'back', b_alpha: 0.4});
});

it('layPage_invalidThrows', ()=> {
	expect(()=> acts(`${LAYS}[lay layer=base fn=bg page=both][s]`)).toThrow('属性 page【both】が不正です');
});


// ============ [trans] ============

it('trans_defaultsToAllLayersAndZeroTime', ()=> {
	// layer省略＝全レイヤ対象（aLayNm=null）、time省略＝0（演出無しで即交換）
	expect(acts(`${LAYS}[trans][s]`).find(v=> v.t === 'trans'))
		.toEqual({t: 'trans', aLayNm: null, time: 0});
});

it('trans_time', ()=> {
	expect(acts(`${LAYS}[trans time=800][s]`).find(v=> v.t === 'trans'))
		.toEqual({t: 'trans', aLayNm: null, time: 800});
});

it('trans_layerListIsSplitAndTrimmed', ()=> {
	// 本家シナリオの [trans layer=&dsp_lays] は 'base,0,1,2,mes' のようなカンマ区切り文字列
	expect(acts(`${LAYS}[trans layer="base, 0 ,mes" time=100][s]`).find(v=> v.t === 'trans'))
		.toEqual({t: 'trans', aLayNm: ['base', '0', 'mes'], time: 100});
});

it('trans_doesNotStop', ()=> {
	// [trans]自体は待たない（本家 #trans() もfalseを返す＝待ちに入らない）。
	//	待ちたければスクリプト側で[wt]を書く
	const a = acts(`${LAYS}[trans time=500]あ[s]`);
	expect(a.at(-1)).toMatchObject({t: 'stop', kind: 's'});
	expect(a.some(v=> v.t === 'chgStr' && v.str === 'あ')).toBe(true);
});

it('trans_invalidTimeThrows', ()=> {
	expect(()=> acts(`${LAYS}[trans time=abc][s]`)).toThrow('[trans] timeの値が不正です');
	expect(()=> acts(`${LAYS}[trans time=-1][s]`)).toThrow('[trans] timeの値が不正です');
});

it('trans_emptyLayerThrows', ()=> {
	expect(()=> acts(`${LAYS}[trans layer="," time=1][s]`)).toThrow('[trans] layer属性が空です');
});

it('trans_skipMakesItInstant', ()=> {
	// 既読スキップ中は演出せず即交換（本家 #trans() の `time === 0 || this.#evtMng.isSkipping`）
	expect(acts(`&sn.skip.all = true\n&sn.skip.enabled = true\n${LAYS}[trans time=900][s]`)
		.find(v=> v.t === 'trans')).toEqual({t: 'trans', aLayNm: null, time: 0});
});


// ============ [wt] ============

it('wt_stopsAndAsksToWait', ()=> {
	// [wt]は停止点（[l]/[p]/[s]）ではないが、待ちの主体がScriptMngなのでstep()は一旦返る
	const a = acts(`${LAYS}[trans time=500][wt]あ[s]`);
	expect(a.at(-1)).toEqual({t: 'waitTrans', canskip: true});
	expect(a.some(v=> v.t === 'chgStr')).toBe(false);	// [wt]より後ろはまだ実行されていない
});

it('wt_canskipFalse', ()=> {
	expect(acts(`${LAYS}[trans time=500][wt canskip=false][s]`).at(-1))
		.toEqual({t: 'waitTrans', canskip: false});
});

it('wt_resumesAfterWait', ()=> {
	// 2回目のstep()で[wt]の続きが流れる（ScriptMngが待ち終えてgo()を呼ぶのに相当）
	const se = new ScriptEngine('t1', `${LAYS}[trans time=500][wt]あ[s]`);
	se.step();
	const a = se.step();
	expect(a.some(v=> v.t === 'chgStr' && v.str === 'あ')).toBe(true);
	expect(a.at(-1)).toMatchObject({t: 'stop', kind: 's'});
});

it('wt_withoutTransIsStillYielded', ()=> {
	// [trans]が無くても[wt]は一旦返す。「待つものが無い」の判定はScriptMng側
	//	（本家 CmnTween.wt() も、動いているトゥイーンが無ければ待たずに済ませる）
	expect(acts(`${LAYS}[wt][s]`).at(-1)).toEqual({t: 'waitTrans', canskip: true});
});


// ============ 実シナリオでの並び ============

it('scenario_titleSnLikeSequence', ()=> {
	// tmp_esm_uc/doc/prj/theme/title.sn と同じ流れ：裏ページを組んで[trans]→[wt]
	const a = acts(
		`${LAYS}[lay layer=base fn=title page=back][lay layer=0 fn=logo page=back]`+
		'[trans layer="base,0,mes" time=0][wt][s]'
	);
	expect(a).toEqual([
		{t: 'addLay', cls: 'grp', nm: 'base'},
		{t: 'addLay', cls: 'grp', nm: '0'},
		{t: 'addLay', cls: 'txt', nm: 'mes'},
		{t: 'chgPic', nm: 'base', page: 'back', fn: 'title', aFace: []},
		{t: 'chgPic', nm: '0', page: 'back', fn: 'logo', aFace: []},
		{t: 'trans', aLayNm: ['base', '0', 'mes'], time: 0},
		{t: 'waitTrans', canskip: true},
	]);
});
