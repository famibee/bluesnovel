/* ***** BEGIN LICENSE BLOCK *****
Copyright (c) 2026-2026 Famibee (famibee.blog38.fc2.com)

This software is released under the MIT License.
http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import {ScriptEngine} from '../src/ts/ScriptEngine';

import {expect, it} from 'bun:test';


// call系テストと同じ方針：停止タグを含まないスクリプトを最後まで実行し、'mes'レイヤの最終文字列で検証する
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


// ============ 基本：定義は読み飛ばされ、名前呼び出しでのみ実行される ============

it('macro_basic_definitionSkippedThenCalledByName', ()=> {
	expect(run(
		'[macro name=greet]HELLO[endmacro]'+
		'BEFORE[greet]AFTER'
	)).toBe('BEFOREHELLOAFTER');
});

it('macro_calledMultipleTimes', ()=> {
	expect(run(
		'[macro name=greet]HI[endmacro]'+
		'[greet]-[greet]-[greet]'
	)).toBe('HI-HI-HI');
});

it('macro_calls_anotherMacro_nested', ()=> {
	expect(run(
		'[macro name=inner]IN[endmacro]'+
		'[macro name=outer]OUT-[inner]-OUT[endmacro]'+
		'[outer]'
	)).toBe('OUT-IN-OUT');
});


// ============ mp: 名前空間（引数受け渡し・戻り時の復元） ============

it('macro_args_passedViaMpNamespace', ()=> {
	// マクロ呼び出し時のタグ属性がmp:名前空間経由で[if]から参照できること
	expect(run(
		`[macro name=say][if exp="mp:msg=='YO'"]MATCHED[endif][endmacro]`+
		'[say msg="YO"]'
	)).toBe('MATCHED');
});

it('macro_mp_restoredAfterReturn_nestedCallDoesNotLeak', ()=> {
	// 入れ子マクロ呼び出しから戻った後、外側のmp:値が復元されること
	// （本家 #callSub()/#return() のcsArg[':hMp']保存・復元と同じ仕組み）
	expect(run(
		`[macro name=inner][if exp="mp:v=='Y'"]INNER-Y[endif][endmacro]`+
		'[macro name=outer]'+
			`[if exp="mp:v=='X'"]OUTER-BEFORE-X|[endif]`+
			'[inner v="Y"]|'+
			`[if exp="mp:v=='X'"]OUTER-AFTER-X[endif]`+
		'[endmacro]'+
		'[outer v="X"]'
	)).toBe('OUTER-BEFORE-X|INNER-Y|OUTER-AFTER-X');
});


// ============ エラー系 ============

it('macro_missingName_throws', ()=> {
	expect(()=> new ScriptEngine('t1', '[macro]X[endmacro]').step()).toThrow();
});

it('macro_unclosed_throws', ()=> {
	expect(()=> new ScriptEngine('t1', '[macro name=x]X').step()).toThrow();
});

it('macro_duplicateName_throws', ()=> {
	expect(()=> new ScriptEngine('t1',
		'[macro name=x]A[endmacro][macro name=x]B[endmacro]'
	).step()).toThrow();
});

it('macro_reservedTagName_throws', ()=> {
	// 既存タグ名（if）と同名のマクロは定義できない（本家 if (name in this.hTag) throw と同じ意図）
	expect(()=> new ScriptEngine('t1', '[macro name=if]X[endmacro]').step()).toThrow();
});

it('endmacro_withoutMacroCall_throws', ()=> {
	// [call]も[マクロ呼び出し]もされていない状態で[endmacro]に到達するとthrow
	// （[macro]定義ブロックの読み飛ばし対象外の位置に単独で[endmacro]がある場合）
	expect(()=> new ScriptEngine('t1', '[endmacro]').step()).toThrow();
});