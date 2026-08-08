/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2026-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

// ＢＧＭ・効果音のうち、エンジンが担当する部分（属性の解釈・実効音量の計算・
//	save:/sys:の帳簿付け）。実際にAudioContext/GainNodeを操作するのはScriptMng/SndMngの担当
//	なのでE2E側（snd.e2e.ts）。本家：SoundMng.ts・SndBuf.ts。
//	bluesnovelはhowlerを積まず自前のWeb Audio層にした経緯・状態機械を持たない設計判断は
//	.claude/docs/PITFALLS.md、attribute defaultsはdocs/tag.html参照。

import {ScriptEngine, type T_ENGINE_ACTION} from '../src/ts/ScriptEngine';

import {expect, it} from 'bun:test';


function acts(src: string): T_ENGINE_ACTION[] {return new ScriptEngine('t1', src).step()}
// [playse]/[playbgm]（join=true既定）・[ws]/[wl]・[wf]/[wb]は自分自身が'stop'でstep()を
//	打ち切るので、末尾に足した[s]まで届かない＝そのアクションが素直に配列末尾になる
function last(src: string) {return acts(`${src}[s]`).at(-1)}
// [volume]・[fadese]系・[stopse]系は'skip'で継続する（[s]まで進む）ので、
//	目的のアクションを型で探す
function find<T extends T_ENGINE_ACTION['t']>(src: string, t: T) {
	return acts(`${src}[s]`).find((v): v is Extract<T_ENGINE_ACTION, {t: T}> => v.t === t);
}


// ============ [playse]/[playbgm] ============

it('playse_defaults', ()=> {
	expect(last('[playse fn=a]')).toEqual({
		t: 'playSnd', buf: 'SE', fn: 'a', loop: false, volume: 1, speed: 1, pan: 0,
		start_ms: 0, end_ms: 999000, ret_ms: 0, join: true, canskip: true,
	});
});

it('playse_fnRequired', ()=> {
	expect(()=> acts('[playse][s]')).toThrow('[playse] fnは必須です');
});

it('playse_join_stopsStepUntilResumed', ()=> {
	// join=true（既定）：ロード完了を待つのでstep()はここで一旦返る（実際に待つのはScriptMng側）
	const a = acts('[playse fn=a]あ[s]');
	expect(a.at(-1)?.t).toBe('playSnd');
	expect(a.some(v=> v.t === 'chgStr')).toBe(false);
});

it('playse_joinFalse_doesNotStopStep', ()=> {
	const a = acts('[playse fn=a join=false]あ[s]');
	expect(a.some(v=> v.t === 'playSnd')).toBe(true);
	expect(a.some(v=> v.t === 'chgStr' && v.str === 'あ')).toBe(true);
});

it('playbgm_forcesBufLoopCanskip', ()=> {
	// buf=BGM・loop=true・canskip=falseを強制する（本家 SoundMng.ts:109-111）。
	//	属性で上書きを試みても無効
	expect(last('[playbgm fn=a buf=SE loop=false canskip=true]')).toEqual({
		t: 'playSnd', buf: 'BGM', fn: 'a', loop: true, volume: 1, speed: 1, pan: 0,
		start_ms: 0, end_ms: 999000, ret_ms: 0, join: true, canskip: false,
	});
});

it('playse_volumeIsEffective_saveTimesSys', ()=> {
	// アクションのvolumeは実効音量（save:目標 × sys:基準）。sys:基準を先に設定しておく
	const se = new ScriptEngine('t1', '[volume buf=SE volume=0.5][playse fn=a volume=0.8][s]');
	const a = se.step();
	const act = a.find(v=> v.t === 'playSnd');
	expect(act).toMatchObject({volume: 0.4});
});

it('playse_volumeClamped', ()=> {
	expect(last('[playse fn=a volume=2]')).toMatchObject({volume: 1});
	expect(last('[playse fn=a volume=-1]')).toMatchObject({volume: 0});
});

it('playse_writesSaveTargetVolume', ()=> {
	const se = new ScriptEngine('t1', '[playse fn=a volume=0.6][s]');
	se.step();
	expect(se.getVal('save:const.sn.sound.SE.volume')).toBe(0.6);
	expect(se.getVal('save:const.sn.sound.SE.fn')).toBe('a');
});

it('playse_start_ms_negative_throws', ()=> {
	expect(()=> acts('[playse fn=a start_ms=-1][s]')).toThrow('start_ms:-1 が負の値です');
});
it('playse_ret_ms_negative_throws', ()=> {
	expect(()=> acts('[playse fn=a ret_ms=-1][s]')).toThrow('ret_ms:-1 が負の値です');
});
it('playse_end_ms_lteStart_throws', ()=> {
	expect(()=> acts('[playse fn=a start_ms=100 end_ms=100][s]')).toThrow('は異常値です');
});
it('playse_end_ms_lteRet_throws', ()=> {
	expect(()=> acts('[playse fn=a ret_ms=100 end_ms=50][s]')).toThrow('は異常値です');
});

it('playse_skippedWhileSkipping_canskipTrue', ()=> {
	// 既読スキップ中はcanskip=true（既定）の[playse]は鳴らさない。本家と違い直前の音を
	//	止める副作用も持たせない（指摘済みの不具合を踏襲しないため、stopSndも出ない）
	const a = acts('&sn.skip.all = true\n&sn.skip.enabled = true\n[playse fn=a][s]');
	expect(a.some(v=> v.t === 'playSnd' || v.t === 'stopSnd')).toBe(false);
});

it('playbgm_playsEvenWhileSkipping', ()=> {
	// [playbgm]はcanskip=false固定なので、既読スキップ中でも必ず鳴る
	const a = acts('&sn.skip.all = true\n&sn.skip.enabled = true\n[playbgm fn=a][s]');
	expect(a.some(v=> v.t === 'playSnd')).toBe(true);
});

it('playse_loop_registersLoopPlaying', ()=> {
	const se = new ScriptEngine('t1', '[playse fn=a loop=true][s]');
	se.step();
	expect(JSON.parse(String(se.getVal('save:const.sn.loopPlaying')))).toEqual({SE: 'a'});
});

it('playse_nonLoop_doesNotRegisterLoopPlaying', ()=> {
	const se = new ScriptEngine('t1', '[playse fn=a loop=false][s]');
	se.step();
	expect(JSON.parse(String(se.getVal('save:const.sn.loopPlaying')))).toEqual({});
});


// ============ [stopse]/[stopbgm]/[stop_allse] ============

it('stopse_defaultBuf', ()=> {
	expect(find('[stopse]', 'stopSnd')).toEqual({t: 'stopSnd', buf: 'SE'});
});
it('stopbgm_forcesBufBGM', ()=> {
	expect(find('[stopbgm]', 'stopSnd')).toEqual({t: 'stopSnd', buf: 'BGM'});
});
it('stopse_clearsLoopPlaying', ()=> {
	// join=false：[playse]自体はjoin=true（既定）だとstep()を打ち切ってしまい、
	//	続く[stopse]が同じstep()内で実行されないため
	const se = new ScriptEngine('t1', '[playse fn=a loop=true join=false][stopse][s]');
	se.step();
	expect(JSON.parse(String(se.getVal('save:const.sn.loopPlaying')))).toEqual({});
	expect(se.getVal('save:const.sn.sound.SE.fn')).toBe('');
});
it('stop_allse_pushesAction', ()=> {
	expect(find('[stop_allse]', 'stopAllSnd')).toEqual({t: 'stopAllSnd'});
});
it('stop_allse_clearsAllLoopPlaying', ()=> {
	const se = new ScriptEngine('t1', '[playse fn=a loop=true join=false][playse buf=BGM fn=b loop=true join=false][stop_allse][s]');
	se.step();
	expect(JSON.parse(String(se.getVal('save:const.sn.loopPlaying')))).toEqual({});
});


// ============ [volume] ============

it('volume_defaults', ()=> {
	expect(find('[volume]', 'volumeSnd')).toEqual({t: 'volumeSnd', buf: 'SE', volume: 1});
});
it('volume_writesSysBase', ()=> {
	const se = new ScriptEngine('t1', '[volume buf=BGM volume=0.3][s]');
	se.step();
	expect(se.getVal('sys:const.sn.sound.BGM.volume')).toBe(0.3);
});
it('volume_effectiveCombinesSaveTarget', ()=> {
	expect(find('[playse fn=a volume=0.5 join=false][volume buf=SE volume=0.4]', 'volumeSnd'))
		.toEqual({t: 'volumeSnd', buf: 'SE', volume: 0.2});
});


// ============ [fadese]/[fadebgm]/[fadeoutse]/[fadeoutbgm] ============

it('fadese_requiresVolumeAndTime', ()=> {
	expect(()=> acts('[fadese time=100][s]')).toThrow('[fadese] volumeの値が不正です');
	expect(()=> acts('[fadese volume=0.5][s]')).toThrow('[fadese] timeの値が不正です');
});

it('fadese_defaultStopFalse_unlessVolumeZero', ()=> {
	expect(find('[fadese volume=0.5 time=100]', 'fadeSnd')).toMatchObject({stop: false});
	expect(find('[fadese volume=0 time=100]', 'fadeSnd')).toMatchObject({stop: true});
});

it('fadebgm_forcesBufBGM', ()=> {
	expect(find('[fadebgm buf=SE volume=0.5 time=100]', 'fadeSnd')).toMatchObject({buf: 'BGM'});
});

it('fadeoutse_forcesVolumeZeroAndStopTrue', ()=> {
	// [fadeoutse]はvolume属性を受け付けず常に0、stopは既定true
	expect(find('[fadeoutse time=100]', 'fadeSnd')).toEqual({t: 'fadeSnd', buf: 'SE', volume: 0, msec: 100, delay: 0, stop: true});
});
it('fadeoutbgm_forcesBufBGM', ()=> {
	expect(find('[fadeoutbgm time=100]', 'fadeSnd')).toMatchObject({buf: 'BGM', volume: 0, stop: true});
});
it('fadeoutse_requiresTime', ()=> {
	expect(()=> acts('[fadeoutse][s]')).toThrow('[fadeoutse] timeの値が不正です');
});

it('fadese_stopOverridable', ()=> {
	expect(find('[fadese volume=0 time=100 stop=false]', 'fadeSnd')).toMatchObject({stop: false});
});

it('fadese_volumeIsEffective', ()=> {
	const se = new ScriptEngine('t1', '[volume buf=SE volume=0.5][fadese volume=0.4 time=100][s]');
	const a = se.step();
	expect(a.find(v=> v.t === 'fadeSnd')).toMatchObject({volume: 0.2});
});

it('fadese_doesNotWait', ()=> {
	// フェード自体は待たない。[s]まで一気に進む
	const a = acts('[fadese volume=0.5 time=100]あ[s]');
	expect(a.some(v=> v.t === 'chgStr' && v.str === 'あ')).toBe(true);
});

it('fadese_skippedWhileSkipping_msecAndDelayZero', ()=> {
	const a = acts('&sn.skip.all = true\n&sn.skip.enabled = true\n[fadese volume=0.5 time=9000 delay=500][s]');
	expect(a.find(v=> v.t === 'fadeSnd')).toMatchObject({msec: 0, delay: 0});
});

it('stopfadese_noop', ()=> {
	// 本家で既に廃止済みの空実装。受けても何もアクションを積まない
	const a = acts('[stopfadese]あ[s]');
	expect(a.some(v=> v.t === 'chgStr' && v.str === 'あ')).toBe(true);
	expect(a.some(v=> v.t.toString().toLowerCase().includes('fade'))).toBe(false);
});


// ============ [ws]/[wl]/[wf]/[wb] ============

it('ws_defaults_canskipFalse', ()=> {
	// 待ち系のcanskip既定はfalse（[wt]/[wq]/[wait_tsy]/[wait]とは逆）
	expect(last('[ws]')).toEqual({t: 'waitSnd', buf: 'SE', canskip: false, stop: true});
});
it('wl_forcesBufBGM', ()=> {
	expect(last('[wl]')).toEqual({t: 'waitSnd', buf: 'BGM', canskip: false, stop: true});
});
it('ws_stopFalse', ()=> {
	expect(last('[ws stop=false]')).toMatchObject({stop: false});
});
it('ws_stopsStepUntilResumed', ()=> {
	const a = acts('[ws]あ[s]');
	expect(a.at(-1)).toMatchObject({t: 'waitSnd'});
	expect(a.some(v=> v.t === 'chgStr')).toBe(false);
});
it('ws_resumesAfterStep', ()=> {
	const se = new ScriptEngine('t1', '[ws]あ[s]');
	se.step();
	expect(se.step().some(v=> v.t === 'chgStr' && v.str === 'あ')).toBe(true);
});

it('wf_defaults_canskipFalse', ()=> {
	expect(last('[wf]')).toEqual({t: 'waitFade', buf: 'SE', canskip: false});
});
it('wb_forcesBufBGM', ()=> {
	expect(last('[wb]')).toEqual({t: 'waitFade', buf: 'BGM', canskip: false});
});
it('wf_canskipTrue', ()=> {
	expect(last('[wf canskip=true]')).toMatchObject({canskip: true});
});
