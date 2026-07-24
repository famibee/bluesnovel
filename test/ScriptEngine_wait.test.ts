/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2026-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

// イベント系タグのうち、エンジンが担当する部分。
//	[enable_event]・[wait]・[waitclick]（と、それに伴う[s]との違い）。
//	実際に待つ・クリックを受け付けるのはScriptMng/Main.tsxの担当なのでE2E側（wait.e2e.ts）。
//	本家：LayerMng.ts:1088 #enable_event()、Reading.ts:320 wait()、
//	Reading.ts:712 hTag.waitclick = o=> rs.s(o)（[s]と同じ関数を通る）

import {ScriptEngine, type T_ENGINE_ACTION} from '../src/ts/ScriptEngine';

import {expect, it} from 'bun:test';


const LAYS = '[add_lay layer=mes class=txt][add_lay layer=sysmenu class=txt]';
function acts(src: string): T_ENGINE_ACTION[] {return new ScriptEngine('t1', src).step()}


// ============ [enable_event] ============

it('enableEvent_defaultsToCurrentTxtLayerAndTrue', ()=> {
	// layer省略時は現在の文字レイヤ、enabled省略時はtrue（本家 #argChk_layer(hArg, #curTxtlay)）
	expect(acts(`${LAYS}[current layer=mes][enable_event][s]`).find(v=> v.t === 'enableEvent'))
		.toEqual({t: 'enableEvent', nm: 'mes', enabled: true});
});

it('enableEvent_false', ()=> {
	expect(acts(`${LAYS}[enable_event enabled=false][s]`).find(v=> v.t === 'enableEvent'))
		.toEqual({t: 'enableEvent', nm: 'mes', enabled: false});
});

it('enableEvent_layer', ()=> {
	expect(acts(`${LAYS}[enable_event layer=sysmenu enabled=false][s]`).find(v=> v.t === 'enableEvent'))
		.toEqual({t: 'enableEvent', nm: 'sysmenu', enabled: false});
});

it('enableEvent_readableAsVar', ()=> {
	// 本家は save:const.sn.layer.<レイヤ名>.enabled へ入れる（bluesnovelは game: 名前空間）。
	//	シナリオ側から[if]で分岐できる
	const se = new ScriptEngine('t1', `${LAYS}[enable_event layer=sysmenu enabled=false][s]`);
	se.step();
	expect(se.getVal('game:const.sn.layer.sysmenu.enabled')).toBe(false);
});


// ============ [wait] ============

it('wait_pushesWaitAndYields', ()=> {
	// 待つのはScriptMngの担当なので、step()はここで一旦返る
	const a = acts(`${LAYS}[wait time=500]あ[s]`);
	expect(a.at(-1)).toEqual({t: 'wait', msec: 500, canskip: true});
	expect(a.some(v=> v.t === 'chgStr')).toBe(false);	// [wait]より後ろはまだ実行されていない
});

it('wait_canskipFalse', ()=> {
	expect(acts(`${LAYS}[wait time=500 canskip=false][s]`).at(-1))
		.toEqual({t: 'wait', msec: 500, canskip: false});
});

it('wait_resumesAfterWait', ()=> {
	const se = new ScriptEngine('t1', `${LAYS}[wait time=500]あ[s]`);
	se.step();
	const a = se.step();
	expect(a.some(v=> v.t === 'chgStr' && v.str === 'あ')).toBe(true);
});

it('wait_timeRequired', ()=> {
	// skip中でもエラーは出したい、と本家がコメントしている必須属性
	expect(()=> acts(`${LAYS}[wait][s]`)).toThrow('[wait] timeの値が不正です');
});

it('wait_skippedWhileSkipping', ()=> {
	// 既読スキップ中は待たない（本家 wait() の冒頭）。[wait]を素通りしてそのまま[s]まで進む
	const a = acts(`&sn.skip.all = true\n&sn.skip.enabled = true\n${LAYS}[wait time=9000]あ[s]`);
	expect(a.some(v=> v.t === 'wait')).toBe(false);
	expect(a.some(v=> v.t === 'chgStr' && v.str === 'あ')).toBe(true);
});

it('wait_unreadCancelsSkip', ()=> {
	// skip.all=falseで未読に来ていたら、そこでスキップ解除（本家と同じ）
	const se = new ScriptEngine('t1', `&sn.skip.enabled = true\n${LAYS}[wait time=9000][s]`);
	se.step();
	expect(se.skipEnabled).toBe(false);
});


// ============ [waitclick]と[s]の違い ============

it('waitclick_stopsWithoutMarker', ()=> {
	// 本家は[waitclick]も[s]と同じ関数を通る（Reading.ts:712）。
	//	違いはReadingState_wait4Tagがタグ名で振り分けるところ：'s'はユーザー操作に反応しない
	const a = acts(`${LAYS}[waitclick]あ[s]`);
	expect(a.at(-1)).toMatchObject({t: 'stop', kind: 'waitclick'});
});

it('waitclick_resumes', ()=> {
	const se = new ScriptEngine('t1', `${LAYS}[waitclick]あ[s]`);
	se.step();
	expect(se.step().some(v=> v.t === 'chgStr' && v.str === 'あ')).toBe(true);
});

it('waitclick_cancelsAutoSkip', ()=> {
	// [s]と同じくオート読み・既読スキップを解除する（本家 s() の cancelAutoSkip()）
	const se = new ScriptEngine('t1', `&sn.auto.enabled = true\n${LAYS}[waitclick]`);
	const a = se.step();
	expect(a.at(-1)).toMatchObject({t: 'stop', kind: 'waitclick'});
	expect((a.at(-1) as {resume?: unknown}).resume).toBeUndefined();	// 自動進行しない
	expect(se.autoEnabled).toBe(false);
});
