/* ***** BEGIN LICENSE BLOCK *****
Copyright (c) 2026-2026 Famibee (famibee.blog38.fc2.com)

This software is released under the MIT License.
http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import {VarStore} from '../src/ts/VarStore';
import {ExprEval} from '../src/ts/ExprEval';

import {expect, it} from 'bun:test';


function newEval() {
	const vs = new VarStore;
	return {vs, ev: new ExprEval(vs)};
}

it('literal_number', ()=> {
	const {ev} = newEval();
	expect(ev.parse('12')).toBe(12);
	expect(ev.parse('-3.5')).toBe(-3.5);
});

it('literal_string', ()=> {
	const {ev} = newEval();
	expect(ev.parse('"あいう"')).toBe('あいう');
	expect(ev.parse("'えお'")).toBe('えお');
});

it('literal_boolean_and_null', ()=> {
	const {ev} = newEval();
	expect(ev.parse('true')).toBe(true);
	expect(ev.parse('false')).toBe(false);
	expect(ev.parse('null')).toBeNull();
});

it('arithmetic_precedence', ()=> {
	const {ev} = newEval();
	expect(ev.parse('1+2*3')).toBe(7);
	expect(ev.parse('(1+2)*3')).toBe(9);
	expect(ev.parse('10%3')).toBe(1);
	expect(ev.parse('2**3**2')).toBe(512);		// べき乗は右結合：2**(3**2)
	expect(ev.parse('10-3-2')).toBe(5);		// 減算は左結合：(10-3)-2
});

it('unary_operators', ()=> {
	const {ev} = newEval();
	expect(ev.parse('-5+10')).toBe(5);
	expect(ev.parse('!true')).toBe(false);
	expect(ev.parse('!false')).toBe(true);
});

it('string_concat', ()=> {
	const {ev} = newEval();
	expect(ev.parse('"x="+1')).toBe('x=1');
	expect(ev.parse('"あ"+"い"')).toBe('あい');
});

it('comparison_operators', ()=> {
	const {ev} = newEval();
	expect(ev.parse('1<2')).toBe(true);
	expect(ev.parse('2<=2')).toBe(true);
	expect(ev.parse('3>2')).toBe(true);
	expect(ev.parse('"a"=="a"')).toBe(true);
	expect(ev.parse('1==="1"')).toBe(false);	// 厳密等価は型まで見る
	expect(ev.parse('1=="1"')).toBe(true);		// 通常の等価は文字列化して比較
});

it('logical_operators', ()=> {
	const {ev} = newEval();
	expect(ev.parse('true&&false')).toBe(false);
	expect(ev.parse('1<2||1>2')).toBe(true);
	expect(ev.parse('!(1<2)')).toBe(false);
});

it('variable_reference', ()=> {
	const {vs, ev} = newEval();
	vs.set('game:hp', 80);
	expect(ev.parse('game:hp')).toBe(80);
	expect(ev.parse('game:hp>=80')).toBe(true);
	expect(ev.parse('game:hp+20')).toBe(100);
});

it('undefined_variable_is_null', ()=> {
	const {ev} = newEval();
	expect(ev.parse('nothing==null')).toBe(true);
	expect(ev.parse('nothing===null')).toBe(true);
});

it('syntax_error_throws', ()=> {
	const {ev} = newEval();
	expect(()=> ev.parse('1+*2')).toThrow();
});

it('non_numeric_arithmetic_throws', ()=> {
	const {ev} = newEval();
	expect(()=> ev.parse('"abc"-1')).toThrow();
});
