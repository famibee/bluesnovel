/* ***** BEGIN LICENSE BLOCK *****
Copyright (c) 2026-2026 Famibee (famibee.blog38.fc2.com)

This software is released under the MIT License.
http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import {VarStore} from '../src/ts/VarStore';

import {expect, it} from 'bun:test';


it('get_default_null', ()=> {
	const vs = new VarStore;
	expect(vs.get('foo')).toBeNull();
});

it('set_get_default_ns_is_tmp', ()=> {
	// 名前空間省略時は本家準拠で"tmp:"扱い（VarStore.ts:33のコメント参照）
	const vs = new VarStore;
	vs.set('foo', 123);
	expect(vs.get('foo')).toBe(123);
	expect(vs.get('tmp:foo')).toBe(123);
});

it('set_get_ns_game_is_independent', ()=> {
	const vs = new VarStore;
	vs.set('game:hp', 100);
	expect(vs.get('game:hp')).toBe(100);
	expect(vs.get('hp')).toBeNull();		// 名前空間が違うので別変数扱い（tmp:hp）
	expect(vs.get('tmp:hp')).toBeNull();
});

it('set_get_ns_sys', ()=> {
	const vs = new VarStore;
	vs.set('sys:volume', 80);
	expect(vs.get('sys:volume')).toBe(80);
});

it('supports_string_and_boolean_values', ()=> {
	const vs = new VarStore;
	vs.set('game:name', 'ゆかり');
	vs.set('game:flag', true);
	expect(vs.get('game:name')).toBe('ゆかり');
	expect(vs.get('game:flag')).toBe(true);
});

it('builtin_is_readonly_and_lazy', ()=> {
	const vs = new VarStore;
	let n = 0;
	vs.defBuiltin('counter', ()=> ++n);
	expect(vs.get('tmp:counter')).toBe(1);
	expect(vs.get('tmp:counter')).toBe(2);	// 呼ぶたびに再評価（遅延評価）
	expect(()=> vs.set('tmp:counter', 999)).toThrow();
});

it('clearGame_leaves_sys_and_tmp_untouched', ()=> {
	const vs = new VarStore;
	vs.set('game:hp', 100);
	vs.set('sys:volume', 80);
	vs.set('foo', 1);	// tmp:foo
	vs.clearGame();
	expect(vs.get('game:hp')).toBeNull();
	expect(vs.get('sys:volume')).toBe(80);
	expect(vs.get('foo')).toBe(1);
});

it('clearSys_leaves_game_and_tmp_untouched', ()=> {
	const vs = new VarStore;
	vs.set('game:hp', 100);
	vs.set('sys:volume', 80);
	vs.clearSys();
	expect(vs.get('sys:volume')).toBeNull();
	expect(vs.get('game:hp')).toBe(100);
});

it('invalid_name_throws', ()=> {
	const vs = new VarStore;
	expect(()=> vs.get('   ')).toThrow();
});
