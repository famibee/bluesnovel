/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2026-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

// 画面揺らし（[quake]/[stop_quake]/[wq]）のうち、エンジンが担当する「どのアクションを積むか」。
//	実際に揺らすのはStage（素のrAFループ）、終了を決めるのはScriptMngなのでE2E側（quake.e2e.ts）。
//	本家 LayerMng.ts:754 #quake()。本家は[trans]と同じトゥイーン枠を使い回すので
//	[wq]＝[wt]、[stop_quake]＝[finish_trans]だが、こちらは同じ形の**別の**待ち行列にしてある

import {ScriptEngine, type T_ENGINE_ACTION} from '../src/ts/ScriptEngine';

import {expect, it} from 'bun:test';


function acts(src: string): T_ENGINE_ACTION[] {return new ScriptEngine('t1', src).step()}


it('quake_pushesAction', ()=> {
	expect(acts('[quake time=2000 hmax=8 vmax=8][s]').find(v=> v.t === 'quake'))
		.toEqual({t: 'quake', msec: 2000, hmax: 8, vmax: 8});
});

it('quake_defaultsTo10px', ()=> {
	// 本家 argChk_Num(hArg, 'hmax', 10) / 'vmax', 10
	expect(acts('[quake time=500][s]').find(v=> v.t === 'quake'))
		.toEqual({t: 'quake', msec: 500, hmax: 10, vmax: 10});
});

it('quake_oneAxis', ()=> {
	// ギャラリーの tag_quake が書く形。0を指定した向きには揺れない
	expect(acts('[quake time=500 hmax=0][s]').find(v=> v.t === 'quake'))
		.toEqual({t: 'quake', msec: 500, hmax: 0, vmax: 10});
	expect(acts('[quake time=500 vmax=0][s]').find(v=> v.t === 'quake'))
		.toEqual({t: 'quake', msec: 500, hmax: 10, vmax: 0});
});

it('quake_doesNotStop', ()=> {
	// [quake]自体は待たない（本家も false を返す）。待つのは[wq]
	const a = acts('[add_lay layer=mes class=txt][quake time=500]あ[s]');
	expect(a.some(v=> v.t === 'chgStr' && v.str === 'あ')).toBe(true);
});

it('quake_timeRequired', ()=> {
	expect(()=> acts('[quake hmax=8][s]')).toThrow('[quake] timeの値が不正です');
});

it('quake_timeZeroDoesNothing', ()=> {
	// 本家も time=0 は即 return（揺らす対象を組み立てない）
	expect(acts('[quake time=0][s]').some(v=> v.t === 'quake')).toBe(false);
});

it('quake_skippingDoesNothing', ()=> {
	// 既読スキップ中は揺らさない（本家も #hTag2SkipBypass で素通しする）
	expect(acts('&sn.skip.all = true\n&sn.skip.enabled = true\n[quake time=2000][s]')
		.some(v=> v.t === 'quake')).toBe(false);
});

it('stopQuake', ()=> {
	const a = acts('[add_lay layer=mes class=txt][stop_quake]あ[s]');
	expect(a.find(v=> v.t === 'stopQuake')).toEqual({t: 'stopQuake'});
	expect(a.some(v=> v.t === 'chgStr' && v.str === 'あ')).toBe(true);	// 待たない
});

it('wq_stops', ()=> {
	// [wt]と同じ形。実際に待つのはScriptMngなのでstep()はここで一旦返る
	const a = acts('[add_lay layer=mes class=txt][quake time=500][wq]あ[s]');
	expect(a.at(-1)).toEqual({t: 'waitQuake', canskip: true});
	expect(a.some(v=> v.t === 'chgStr' && v.str === 'あ')).toBe(false);
});

it('wq_canskipFalse', ()=> {
	expect(acts('[wq canskip=false][s]').at(-1)).toEqual({t: 'waitQuake', canskip: false});
});

it('wq_resumes', ()=> {
	const se = new ScriptEngine('t1', '[add_lay layer=mes class=txt][wq]あ[s]');
	se.step();
	expect(se.step().some(v=> v.t === 'chgStr' && v.str === 'あ')).toBe(true);
});

it('quake_reservedAsMacroName', ()=> {
	expect(()=> acts('[macro name=quake][s]'))
		.toThrow('[quake]はタグ名のため、マクロ名として使用できません');
});
