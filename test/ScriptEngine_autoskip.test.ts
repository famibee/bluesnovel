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
import {Script} from '../src/ts/Script';

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


// ============ スキップモード（sys:sn.skip.mode） ============

it('skipMode_default_s_skipsThroughPageBreak', ()=> {
	// 既定（未設定）は's'＝改ページ[p]も飛ばす
	const se = new ScriptEngine('t1', '&sn.skip.all = true\n&sn.skip.enabled = true\nA[p]B[s]');
	expect(resumeOf(se.step())).toEqual({mode: 'skip', msec: 0});	// [p]も飛ばす
});

it('skipMode_p_stopsAtPageBreakButSkipsLines', ()=> {
	// 'p'＝行[l]は飛ばすが、改ページ[p]では止まる（本家 Reading p() は mode==='s' のみ飛ばす）
	const se = new ScriptEngine('t1',
		`[let name=sys:sn.skip.mode val='"p"']&sn.skip.all = true\n&sn.skip.enabled = true\nA[l]B[p]C[s]`
	);
	expect(resumeOf(se.step())).toEqual({mode: 'skip', msec: 0});	// [l]は飛ばす
	expect(resumeOf(se.step())).toBeUndefined();					// [p]では止まる
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

it('isNextKidoku_insideSubroutine_looksAtCaller', ()=> {
	// サブルーチン内の停止点では、呼び出し元の続き（戻り先）が既読かを見る。
	//	戻り先を既読のまま残すため[call count=true]を使う（既定の[call]は戻り先を未読へ戻すため）
	const se = new ScriptEngine('t1',
		'*top\n[call count=true label=*sub]既読になる続き[l][jump label=*top]'+
		'\n*sub\n[l][return]'
	);
	se.step();	// サブルーチン内の[l]（1周目）：呼び出し元の戻り先はまだ未読
	expect(se.isNextKidoku).toBe(false);
	se.step();	// [return]→呼び出し元の続きを読んで既読化→[l]
	se.step();	// [jump]→[call]→2周目のサブルーチン内の[l]
	expect(se.isNextKidoku).toBe(true);	// 呼び出し元の戻り先は前周で既読化済み
});

it('isNextKidoku_crossFile_usesCallerScriptLength', ()=> {
	// 別ファイルのサブルーチンから、呼び出し元ファイルの続きの既読状態を正しく見る。
	//	loadScriptプロトコルを手で回す（ScriptMng.#runStepと同じ手順）
	const main = new Script('main', '*top\n[call fn=sub count=true label=*s]つづき[l][jump label=*top]');
	const sub = new Script('sub', '*s\n[l][return]');
	const se = new ScriptEngine(main);

	// 1周目：main→subへ。subの[l]で止まる
	expect(se.step().at(-1)).toMatchObject({t: 'loadScript', fn: 'sub'});
	se.switchScript(sub, '*s');
	se.step();	// subの[l]
	expect(se.isNextKidoku).toBe(false);	// mainの戻り先「つづき」はまだ未読

	// subから戻り、mainの続き「つづき」を読んで[l]で止まる（ここで戻り先が既読化）
	const ret = se.step().at(-1) as {t: string; fn: string; idx: number};
	expect(ret).toMatchObject({t: 'loadScript', fn: 'main'});
	se.switchScript(main, '', ret.idx);
	se.step();	// mainの[l]（「つづき」読了）

	// mainの続き→[jump]→[call fn=sub]で再びsubへ。2周目のsubの[l]
	expect(se.step().at(-1)).toMatchObject({t: 'loadScript', fn: 'sub'});
	se.switchScript(sub, '*s');
	se.step();
	expect(se.isNextKidoku).toBe(true);	// mainの戻り先は前周で既読化済み（別ファイルの長さも正しく参照）
});
