/* ***** BEGIN LICENSE BLOCK *****
Copyright (c) 2026-2026 Famibee (famibee.blog38.fc2.com)

This software is released under the MIT License.
http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import {ScriptEngine} from '../src/ts/ScriptEngine';

import {expect, it} from 'bun:test';


// if系テストと同じ方針：停止タグを含まないスクリプトを最後まで実行し、'mes'レイヤの最終文字列で検証する
function finalMes(se: ScriptEngine): string {
	const a = se.step();
	expect(se.atEnd).toBe(true);
	let last = '';
	for (const act of a) if (act.t === 'chgStr' && act.nm === 'mes') last = act.str;
	return last;
}
function run(src: string): string {
	return finalMes(new ScriptEngine('t1', src));
}


// ============ 基本 ============

it('call_return_basic', ()=> {
	// [jump]で*subブロック自体は読み飛ばし、[call]経由でのみ実行されることを確認
	expect(run(
		'[jump label=*main]\n*sub\nSUB[return]\n*main\nMAIN[call label=*sub]AFTER'
	)).toBe('MAINSUBAFTER');
});

it('call_return_nested', ()=> {
	// subA から subB を呼び、両方から戻ってくる（LIFOの確認）
	expect(run(
		'[jump label=*main]\n'+
		'*subA\nA1[call label=*subB]A2[return]\n'+
		'*subB\nB[return]\n'+
		'*main\nMAIN[call label=*subA]AFTER'
	)).toBe('MAINA1BA2AFTER');
});

it('call_return_multipleTimes_sameLabel', ()=> {
	// 同じラベルを2回callして、その都度正しい戻り先へ戻ること
	expect(run(
		'[jump label=*main]\n*sub\nS[return]\n*main\n1[call label=*sub]2[call label=*sub]3'
	)).toBe('1S2S3');
});


// ============ if との共存（壁 -1 の確認） ============

it('call_wall_isolatesCallerIfStack_afterUnclosedInnerIf', ()=> {
	// サブルーチン内で[if]を開いたまま[endif]に辿り着く前に[return]しても、
	// コール元のifスタックが壊れず、コール元の[endif]が正しく機能すること
	// （本家 ScriptIterator.ts:999 aIfStk.slice(-lenIfStk) 相当の復元）
	expect(run(
		'[jump label=*main]\n'+
		'*sub\nSUB[if exp=0==0]INNER[return]TAILSUB[endif]\n'+
		'*main\n'+
		'[if exp=0==0]OUTER[call label=*sub]TAIL[endif]'
	)).toBe('OUTERSUBINNERTAIL');
});

it('call_wall_blocksSubroutineEndifFromReachingCallerIf', ()=> {
	// コール元がifブロックを開いたまま[call]し、サブルーチン側に対応する[if]がない
	// [endif]が来た場合、壁(-1)により「対応するifがない」としてthrowする
	// （壁がないとコール元のif枠を誤って終端させてしまう）
	expect(()=> new ScriptEngine('t1',
		'[jump label=*main]\n'+
		'*sub\nSUB[endif]\n'+	// 対応する[if]がサブルーチン内にない
		'*main\n'+
		'[if exp=0==0]OUTER[call label=*sub]TAIL[endif]'
	).step()).toThrow();
});


// ============ [return]のlabel指定（戻り先変更。本家 #return() の {fn, label} 相当） ============

it('return_label_jumpsElsewhereInsteadOfCaller', ()=> {
	// [call]元（TAIL）へは戻らず、label指定した*otherへ進む
	expect(run(
		'[call label=*sub]TAIL[jump label=*end]\n'+
		'*sub\nSUB[return label=*other]\n'+
		'*other\nOTHER[jump label=*end]\n'+
		'*end\n'
	)).toBe('SUBOTHER');
});

it('return_label_stillPopsCallStack', ()=> {
	// 戻り先を変えても、コールスタックは通常どおり1段外れる。
	// そのため*otherで再度[return]するとスタックが空でthrow
	expect(()=> new ScriptEngine('t1',
		'[call label=*sub]TAIL[jump label=*end]\n'+
		'*sub\nSUB[return label=*other]\n'+
		'*other\nOTHER[return]\n'+
		'*end\n'
	).step()).toThrow();
});

it('return_label_restoresCallerIfStack', ()=> {
	// label指定で戻っても[call]が積んだ壁(-1)は外れるので、
	// 戻り先で出会う[endif]はコール元の[if]に対応する（＝コール元の[endif]の次へ進む）
	expect(run(
		'[if exp=0==0]OUTER[call label=*sub]NG[endif]DONE[jump label=*fin]\n'+
		'*sub\nSUB[return label=*back]\n'+
		'*back\nBACK[endif]AFTER[jump label=*fin]\n'+
		'*fin\n'
	)).toBe('OUTERSUBBACKDONE');
});

it('return_label_worksFromMacro', ()=> {	// マクロ本体からでも同じ
	expect(run(
		'[macro name=m]M[return label=*other][endmacro]'+
		'[m]TAIL[jump label=*end]\n'+
		'*other\nOTHER[jump label=*end]\n'+
		'*end\n'
	)).toBe('MOTHER');
});

it('return_undefinedLabel_throws', ()=> {
	expect(()=> new ScriptEngine('t1',
		'[call label=*sub]\n*sub\n[return label=*nope]'
	).step()).toThrow();
});

it('return_fn_requestsScriptLoad', ()=> {
	// fn指定は別スクリプトへの移動要求。ロードは呼び出し側の責務なので
	// step()は{t:'loadScript'}を返して一旦止まる（test/ScriptEngine_multifile.test.ts 参照）
	const a = new ScriptEngine('t1', '[call label=*sub]\n*sub\n[return fn=other]').step();
	expect(a.at(-1)).toEqual({t: 'loadScript', fn: 'other', label: '', idx: 0});
});


// ============ エラー系 ============

it('return_withoutCall_throws', ()=> {
	expect(()=> new ScriptEngine('t1', '[return]').step()).toThrow();
});
it('call_missingLabel_throws', ()=> {
	expect(()=> new ScriptEngine('t1', '[call]x').step()).toThrow();
});
it('call_undefinedLabel_throws', ()=> {
	expect(()=> new ScriptEngine('t1', '[call label=*nope]x').step()).toThrow();
});
