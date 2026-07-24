/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2026-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

// [event]／[clear_event]（イベント予約）の検証。
//	エンジンはDOMに触れないので「予約表」と「発火時に何が起きるか」だけを受け持つ。
//	キー入力・クリックとの結び付け（'click'／KeyboardEvent.keyの小文字）はMain.tsxの担当で、
//	そこはE2E（event.e2e.ts）で見る

import {ScriptEngine} from '../src/ts/ScriptEngine';

import {expect, it} from 'bun:test';


function run(src: string): ScriptEngine {
	const se = new ScriptEngine('t1', src);
	se.step();
	return se;
}


// ============ 予約と参照 ============

it('event_reserve', ()=> {
	const se = run('[event key=enter label=*a]');
	expect(se.getEvent('enter')).toEqual({fn: 't1', label: '*a', call: false, arg: ''});
});

it('event_keyIsCaseInsensitive', ()=> {
	// 予約時も参照時も小文字化する（本家 EventMng #event() の key.toLowerCase()）
	const se = run('[event key=Enter label=*a]');
	expect(se.getEvent('ENTER')?.label).toBe('*a');
});

it('event_fnDefaultsToCurrentScript', ()=> {
	// fn省略時は現在のスクリプト（本家 hArg.fn ??= scrItr.scriptFn）
	expect(run('[event key=click label=*a]').getEvent('click')?.fn).toBe('t1');
});

it('event_callAndArgAreKept', ()=> {
	const se = run('[event key=click fn=other label=*a call=true arg=xyz]');
	expect(se.getEvent('click')).toEqual({fn: 'other', label: '*a', call: true, arg: 'xyz'});
});

it('event_labelCanBeOmittedWithFn', ()=> {	// fnのみ＝そのファイルの先頭へ
	expect(run('[event key=click fn=other]').getEvent('click')?.label).toBe('');
});

it('event_unreservedKey_isUndefined', ()=> {
	expect(run('[event key=enter label=*a]').getEvent('click')).toBeUndefined();
});

it('event_del_removesReservation', ()=> {
	expect(run(
		'[event key=enter label=*a][event key=enter del=true]'
	).getEvent('enter')).toBeUndefined();
});

it('event_ngArgs_throw', ()=> {
	expect(()=> run('[event label=*a]')).toThrow();			// keyが無い
	expect(()=> run('[event key=enter]')).toThrow();			// fnもlabelも無い
	expect(()=> run('[event key=enter del=true label=*a]')).toThrow();	// delと同時指定
});

it('event_isReservedAsTagName', ()=> {
	expect(()=> run('[macro name=event]X[endmacro]')).toThrow();
	expect(()=> run('[macro name=clear_event]X[endmacro]')).toThrow();
});


// ============ ローカルとグローバル ============

it('clear_event_clearsLocalOnly', ()=> {
	const se = run(
		'[event key=enter label=*a]'+
		'[event key=click label=*b global=true]'+
		'[clear_event]'
	);
	expect(se.getEvent('enter')).toBeUndefined();
	expect(se.getEvent('click')?.label).toBe('*b');
});

it('clear_event_global_clearsGlobalOnly', ()=> {
	const se = run(
		'[event key=enter label=*a]'+
		'[event key=click label=*b global=true]'+
		'[clear_event global=true]'
	);
	expect(se.getEvent('enter')?.label).toBe('*a');
	expect(se.getEvent('click')).toBeUndefined();
});

it('event_localTakesPrecedenceOverGlobal', ()=> {
	// 同じキーならローカル優先（本家 ReadingState.getEvt2Fnc()）
	const se = run(
		'[event key=click label=*グローバル global=true]'+
		'[event key=click label=*ローカル]'
	);
	expect(se.getEvent('click')?.label).toBe('*ローカル');
});


// ============ 発火（beginEvent） ============

it('beginEvent_setsTmpVarsAndClearsLocal', ()=> {
	const se = run('[event key=click label=*a arg=あい]');
	expect(se.beginEvent('click')?.label).toBe('*a');
	expect(se.getVal('tmp:sn.eventLabel')).toBe('*a');
	expect(se.getVal('tmp:sn.eventArg')).toBe('あい');
	// jump系の予約は一回きり（本家 Main.ts resumeByJumpOrCall() の clear_event({})）
	expect(se.getEvent('click')).toBeUndefined();
});

it('beginEvent_call_keepsReservation', ()=> {
	// call系は消さない（コール時に#pushCallStkが退避し、[return]で書き戻すため）
	const se = run('[event key=click label=*a call=true]');
	expect(se.beginEvent('click')?.call).toBe(true);
	expect(se.getEvent('click')?.label).toBe('*a');
});

it('beginEvent_unreserved_returnsUndefined', ()=> {
	// 予約が無ければundefined＝呼び出し側は通常の読み進めを行う
	const se = run('[event key=enter label=*a]');
	expect(se.beginEvent('click')).toBeUndefined();
	expect(se.getEvent('enter')?.label).toBe('*a');	// 巻き添えで消えない
});

it('beginEvent_global_isNotClearedByJump', ()=> {
	const se = run('[event key=click label=*a global=true]');
	expect(se.beginEvent('click')?.label).toBe('*a');
	expect(se.getEvent('click')?.label).toBe('*a');	// グローバルはclear_event()の対象外
});


// ============ [call]／[return] をまたぐ退避・復元 ============

it('event_localIsHiddenInsideCallAndRestoredOnReturn', ()=> {
	// [call]はコール時点のローカル予約を退避し、サブルーチンへは持ち込まない
	//	（本家 ScriptIterator #call() の popLocalEvts() → #return() の pushLocalEvts()）
	const se = new ScriptEngine('t1',
		'[event key=enter label=*a]'+
		'[call label=*sub]'+
		'[l]'+
		'[jump label=*fin]'+
		'\n*sub\n[l][return]'+
		'\n*fin\n'
	);
	se.step();	// サブルーチン内の[l]で停止
	expect(se.getEvent('enter')).toBeUndefined();

	se.step();	// [return]でコール元の[l]まで戻って停止
	expect(se.getEvent('enter')?.label).toBe('*a');
});

it('event_reservedInsideCall_isDiscardedOnReturn', ()=> {
	// サブルーチン内での予約は、退避してあったコール元の表で上書きされて消える
	const se = new ScriptEngine('t1',
		'[call label=*sub][l][jump label=*fin]'+
		'\n*sub\n[event key=enter label=*a][l][return]'+
		'\n*fin\n'
	);
	se.step();
	expect(se.getEvent('enter')?.label).toBe('*a');	// サブルーチン内では有効

	se.step();
	expect(se.getEvent('enter')).toBeUndefined();
});

it('event_globalSurvivesCall', ()=> {
	const se = new ScriptEngine('t1',
		'[event key=click label=*a global=true][call label=*sub][l][jump label=*fin]'+
		'\n*sub\n[l][return]'+
		'\n*fin\n'
	);
	se.step();
	expect(se.getEvent('click')?.label).toBe('*a');
});

it('event_macroCallDoesNotHideLocal', ()=> {
	// マクロ呼び出しだけはローカル予約を退避しない
	//	（本家 ScriptIterator.ts:957「':hEvt1Time'の扱いだけは[macro]と異なる」）
	const se = new ScriptEngine('t1',
		'[macro name=m][l][endmacro]'+
		'[event key=enter label=*a][m]'
	);
	se.step();	// マクロ本体の[l]で停止
	expect(se.getEvent('enter')?.label).toBe('*a');
});

it('event_reservedInsideMacro_leaksToCaller', ()=> {
	// 退避していない＝マクロ内で予約したものは戻った後も残る（本家と同じ）
	const se = new ScriptEngine('t1',
		'[macro name=m][event key=enter label=*a][endmacro]'+
		'[m][l]'
	);
	se.step();
	expect(se.getEvent('enter')?.label).toBe('*a');
});


// ============ 発火から実際の移動まで ============

it('event_fireThenJump_movesExecution', ()=> {
	// 移動そのものは[button]クリックと同じ経路（jumpToLabel/callToLabel）を使う
	const se = new ScriptEngine('t1',
		'[event key=click label=*a]A[l]NG[jump label=*fin]'+
		'\n*a\nB[s]'+
		'\n*fin\n'
	);
	expect(se.step().filter(v=> v.t === 'chgStr').at(-1)).toEqual({t: 'chgStr', nm: 'mes', page: 'fore', str: 'A'});

	const ev = se.beginEvent('click');
	expect(ev).toBeDefined();
	se.jumpToLabel(ev!.label);
	expect(se.step().filter(v=> v.t === 'chgStr').at(-1)).toEqual({t: 'chgStr', nm: 'mes', page: 'fore', str: 'AB'});
});

it('event_fireThenCall_returnsToStopPoint', ()=> {
	// call=trueの予約：[return]で「その停止点」へ戻る＝再びイベント待ちになる
	const se = new ScriptEngine('t1',
		'[event key=click label=*a call=true]A[l]B[s]'+
		'\n*a\nS[return]'
	);
	expect(se.step().at(-1)).toEqual({t: 'stop', kind: 'l', key: 't1:3', nm: 'mes'});

	const ev = se.beginEvent('click');
	se.callToLabel(ev!.label);
	expect(se.step().at(-1)).toEqual({t: 'stop', kind: 'l', key: 't1:3', nm: 'mes'});
	expect(se.getVal('tmp:sn.eventLabel')).toBe('*a');
	// [return]でコール元の予約表が書き戻される＝もう一度クリックできる
	expect(se.getEvent('click')?.label).toBe('*a');
});
