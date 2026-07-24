/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2026-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

// オート読み・既読スキップの「判断」部分（エンジンの純粋ロジック）の検証。
//	停止点でクリック待ちにするか自動進行するかを、stopアクションのresumeで返す。
//	実際にタイマーを回す・ユーザー入力で止めるのはScriptMngの担当（そこはE2Eで見る）。
//	参考：SKYNovel_gallery の kidoku サンプル

import {ScriptEngine, type T_ENGINE_ACTION, type T_RESUME} from '../src/ts/ScriptEngine';

import {expect, it} from 'bun:test';


function stopOf(a: T_ENGINE_ACTION[]) {
	const s = a.at(-1);
	if (s?.t !== 'stop') throw '最後のアクションがstopではありません';
	return s;
}
function resumeOf(a: T_ENGINE_ACTION[]): T_RESUME | undefined {
	return stopOf(a).resume;
}


// ============ 通常（フラグ無し）はクリック待ち ============

it('noFlag_stopWaitsForClick', ()=> {
	expect(resumeOf(new ScriptEngine('t1', 'A[l]B[s]').step())).toBeUndefined();
});


// ============ オート読み ============

it('auto_lResumesAfterLineWait', ()=> {
	const se = new ScriptEngine('t1',
		'[let name=sys:sn.auto.msecLineWait val=800]&sn.auto.enabled = true\nA[l]B[s]'
	);
	expect(resumeOf(se.step())).toEqual({mode: 'auto', msec: 800});
});

it('auto_pUsesPageWait', ()=> {
	const se = new ScriptEngine('t1',
		'[let name=sys:sn.auto.msecPageWait val=2000]&sn.auto.enabled = true\nA[p]B[s]'
	);
	expect(resumeOf(se.step())).toEqual({mode: 'auto', msec: 2000});
});

it('auto_defaultWaitsWhenSysVarUnset', ()=> {
	// sys変数未設定でも既定値で動く（行=500／改ページ=3500）
	const se = new ScriptEngine('t1', '&sn.auto.enabled = true\nA[l]B[p]C[s]');
	expect(resumeOf(se.step())).toEqual({mode: 'auto', msec: 500});
	expect(resumeOf(se.step())).toEqual({mode: 'auto', msec: 3500});
});

it('auto_kidokuUsesKidokuWait', ()=> {
	// 2周目（既読）は_Kidoku側の待ち時間を使う
	const se = new ScriptEngine('t1',
		'[let name=sys:sn.auto.msecLineWait val=800]'+
		'[let name=sys:sn.auto.msecLineWait_Kidoku val=100]'+
		'&sn.auto.enabled = true\n*top\nA[l][jump label=*top]'
	);
	expect(resumeOf(se.step())).toEqual({mode: 'auto', msec: 800});	// 1周目=未読
	expect(resumeOf(se.step())).toEqual({mode: 'auto', msec: 100});	// 2周目=既読
});

it('auto_sAlwaysStopsAndCancels', ()=> {
	const se = new ScriptEngine('t1', '&sn.auto.enabled = true\nA[s]');
	expect(resumeOf(se.step())).toBeUndefined();	// [s]は自動進行しない
	expect(se.autoEnabled).toBe(false);				// かつ解除される
});


// ============ 既読スキップ ============

it('skip_allSkipsEvenUnread', ()=> {
	// skip.all=trueなら未読でも即進行
	const se = new ScriptEngine('t1', '&sn.skip.all = true\n&sn.skip.enabled = true\nA[l]B[s]');
	expect(resumeOf(se.step())).toEqual({mode: 'skip', msec: 0});
});

it('skip_stopsAtUnread', ()=> {
	// skip.all=falseなら、未読に来た時点で止まりスキップ解除（本家 Reading l()）
	const se = new ScriptEngine('t1', '&sn.skip.enabled = true\nA[l]B[s]');
	expect(resumeOf(se.step())).toBeUndefined();
	expect(se.skipEnabled).toBe(false);
});

it('skip_continuesThroughRead', ()=> {
	// 1周目は未読で止まる。既読になった2周目は素早く飛ばす
	const se = new ScriptEngine('t1', '*top\nA[l]&sn.skip.enabled = true\n[jump label=*top]');
	expect(resumeOf(se.step())).toBeUndefined();				// 1周目：未読で普通に待つ
	expect(resumeOf(se.step())).toEqual({mode: 'skip', msec: 0});	// 2周目：既読なのでスキップ
});

it('skip_sStopsAndCancels', ()=> {
	const se = new ScriptEngine('t1', '&sn.skip.all = true\n&sn.skip.enabled = true\nA[s]');
	expect(resumeOf(se.step())).toBeUndefined();
	expect(se.skipEnabled).toBe(false);
	expect(se.skipAll).toBe(false);
});


// ============ フラグ変数・cancelAutoSkip ============

it('flags_readableAsTmpVars', ()=> {
	// [l]で止める（オート有効時は[l]でスキップ側を触らない＝両フラグが残る。[s]だと解除される）
	const se = new ScriptEngine('t1', '&sn.auto.enabled = true\n&sn.skip.enabled = true\nA[l]');
	se.step();
	expect(se.autoEnabled).toBe(true);
	expect(se.skipEnabled).toBe(true);
	expect(se.getVal('tmp:sn.auto.enabled')).toBe(true);
});

it('cancelAutoSkip_clearsAllThree', ()=> {
	const se = new ScriptEngine('t1',
		'&sn.auto.enabled = true\n&sn.skip.enabled = true\n&sn.skip.all = true\n[s]'
	);
	se.step();	// [s]で自動解除される
	expect(se.autoEnabled).toBe(false);
	expect(se.skipEnabled).toBe(false);
	expect(se.skipAll).toBe(false);
});

it('branchable_byFlagVar', ()=> {
	// [if exp="sn.auto.enabled"]でモードによる分岐もできる
	const se = new ScriptEngine('t1',
		'&sn.auto.enabled = true\n[if exp="sn.auto.enabled"]オート[else]手動[endif][s]'
	);
	expect(se.step().filter(v=> v.t === 'chgStr').at(-1)?.str).toBe('オート');
});


// ============ isNextKidoku ============

it('isNextKidoku_falseOnFirstPass_trueOnSecond', ()=> {
	const se = new ScriptEngine('t1', '*top\nA[l][jump label=*top]');
	se.step();
	expect(se.isNextKidoku).toBe(false);	// [l]の次（*top方向の続き）はまだ未読
	se.step();
	expect(se.isNextKidoku).toBe(true);
});
