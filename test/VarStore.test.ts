/* ***** BEGIN LICENSE BLOCK *****
Copyright (c) 2026-2026 Famibee (famibee.blog38.fc2.com)

This software is released under the MIT License.
http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import {VarStore} from '../src/ts/VarStore';

import {expect, it} from 'bun:test';


it('get_default_undefined', ()=> {
	const vs = new VarStore;
	expect(vs.get('foo')).toBeUndefined();	// 未定義変数はundefined（本家準拠。nullは「nullが入っている」の意）
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
	expect(vs.get('hp')).toBeUndefined();		// 名前空間が違うので別変数扱い（tmp:hp）
	expect(vs.get('tmp:hp')).toBeUndefined();
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
	expect(vs.get('game:hp')).toBeUndefined();
	expect(vs.get('sys:volume')).toBe(80);
	expect(vs.get('foo')).toBe(1);
});

it('clearSys_leaves_game_and_tmp_untouched', ()=> {
	const vs = new VarStore;
	vs.set('game:hp', 100);
	vs.set('sys:volume', 80);
	vs.clearSys();
	expect(vs.get('sys:volume')).toBeUndefined();
	expect(vs.get('game:hp')).toBe(100);
});

// ===== ここから下は 本家 skynovel_esm/test/Variable.test.ts の移植 =====
//	本家Variableとの主な差異（意図的なもの）：
//	・名前空間 save: は bluesnovel では game:
//	・本家 val.getVal(name, def, touch) → vs.get(name, def, touch)
//	・本家 val.setVal_Nochk(scope, nm, v) → vs.set(`${scope}:${nm}`, v)
//	・本家 val.defTmp(name, fnc) → vs.defBuiltin(name, fnc)

it('getVal_-1', ()=> {
	const vs = new VarStore;
	expect(vs.get('mp:fn')).toBeUndefined();
});

it('getVal_0', ()=> {
	const vs = new VarStore;
	expect(vs.get('mp:fn', 'def')).toBe('def');
});
it('getVal_1', ()=> {
	const vs = new VarStore;
	vs.set('mp:fn', 'うひひ');
	expect(vs.get('mp:fn', 'def')).toBe('うひひ');
});
it('getVal_2', ()=> {
	const vs = new VarStore;
	vs.set('tmp:ぎょへー', 'もきゅ');
	expect(vs.get('tmp:ぎょへー', 'def')).toBe('もきゅ');
});
it('getVal_3', ()=> {	// 数値リテラル文字列は取得時に数値へ自動キャスト
	const vs = new VarStore;
	vs.set('tmp:hD.数値', '1.20');
	expect(vs.get('tmp:hD.数値', 'def')).toBe(1.20);
});
it('getVal_4', ()=> {
	const vs = new VarStore;
	vs.set('tmp:one_n', 1);
	expect(vs.get('tmp:one_n', 'def')).toBe(1);
});
it('getVal_5', ()=> {
	const vs = new VarStore;
	vs.set('sys:_album.img.渡り廊下・桜昼', true);
	expect(vs.get('sys:_album.img.渡り廊下・桜昼', 'def')).toBe(true);
});

it('getVal_6_touch', ()=> {	// touch=trueの時だけ、既定値をストアへ書き込む
	const vs = new VarStore;
	expect(vs.get('sys:存在しない')).toBeUndefined();

	expect(vs.get('sys:存在しない', '♨')).toBe('♨');
	expect(vs.get('sys:存在しない')).toBeUndefined();

	expect(vs.get('sys:存在しない', '♨', true)).toBe('♨');
	expect(vs.get('sys:存在しない')).toBe('♨');
});

it('getVal_10_fnc', ()=> {
	const vs = new VarStore;
	let c = 0;
	vs.defBuiltin('counter', ()=> ++c);

	expect(vs.get('counter', 'def')).toBe(1);
	expect(vs.get('counter', 'def')).toBe(2);
	expect(vs.get('counter', 'def')).toBe(3);
});

it('getVal_20_json', ()=> {	// 値がJSON文字列なら、その下の階層を「.」で辿れる
	const vs = new VarStore;
	vs.set('mp:const.sn.sound.codecs', '{"aac": true, "flac": false}');

	expect(vs.get('mp:const.sn.sound.codecs', 'def')).toBe('{"aac": true, "flac": false}');
	expect(vs.get('mp:const.sn.sound.codecs.aac', 'def')).toBe(true);
	expect(vs.get('mp:const.sn.sound.codecs.aac0', 'def')).toBe('def');
});
it('getVal_21_json', ()=> {
	const vs = new VarStore;
	vs.set('tmp:const.db', `
{
	"紀子": {
		"fn"	: "nori",
		"col"	: "lightskyblue"
	},
	"晶": {
		"fn"	: "akir",
		"col"	: "gold"
	}
}
`);

	expect(vs.get('tmp:const.db', 'def')).toBe(`
{
	"紀子": {
		"fn"	: "nori",
		"col"	: "lightskyblue"
	},
	"晶": {
		"fn"	: "akir",
		"col"	: "gold"
	}
}
`);
	expect(vs.get('tmp:const.db.紀子', 'def')).toBe('{"fn":"nori","col":"lightskyblue"}');
	expect(vs.get('tmp:const.db["紀子"]', 'def')).toBe('{"fn":"nori","col":"lightskyblue"}');
	expect(vs.get('tmp:const.db.紀子0', 'def')).toBe('def');
	expect(vs.get('tmp:const.db.梨香', 'def')).toBe('def');
	expect(vs.get('tmp:const.db.紀子.fn', 'def')).toBe('nori');
	expect(vs.get('tmp:const.db.紀子.fn0', 'def')).toBe('def');
});
it('getVal_22_json 不具合2021/01/18', ()=> {
	// 短い名前が「JSONではない値」でヒットしても、探索を打ち切らず名前を延ばして探す
	const vs = new VarStore;
	vs.set('mp:const.sn.sound', 'true');
	vs.set('mp:const.sn.sound.codecs', '{"aac": true, "flac": false}');

	expect(vs.get('mp:const.sn.sound.codecs', 'def')).toBe('{"aac": true, "flac": false}');
	expect(vs.get('mp:const.sn.sound.codecs.aac', 'def')).toBe(true);
	expect(vs.get('mp:const.sn.sound.codecs.aac0', 'def')).toBe('def');

	expect(vs.get('mp:const.sn.sound', 'def')).toBe(true);
		// TypeError: Cannot use 'in' operator to search for 'codecs' in true
});

// 以下は本家Variable.test.tsには無いが、移植に伴い実装した仕様の確認
it('getVal_30_autocast', ()=> {
	const vs = new VarStore;
	vs.set('tmp:t', 'true');
	vs.set('tmp:f', 'false');
	vs.set('tmp:n', 'null');
	vs.set('tmp:i', '-12');
	vs.set('tmp:s', 'もじ');
	expect(vs.get('tmp:t')).toBe(true);
	expect(vs.get('tmp:f')).toBe(false);
	expect(vs.get('tmp:n')).toBeNull();
	expect(vs.get('tmp:i')).toBe(-12);
	expect(vs.get('tmp:s')).toBe('もじ');
});
it('getVal_31_atStr', ()=> {	// 「@str」接尾辞を付けると自動キャストしない
	const vs = new VarStore;
	vs.set('tmp:t', 'true');
	vs.set('tmp:i', '-12');
	expect(vs.get('tmp:t@str')).toBe('true');
	expect(vs.get('tmp:i@str')).toBe('-12');
});
it('getVal_32_json_notJson', ()=> {
	// JSONとして解釈できない値の下位階層を要求されても、例外にせず既定値を返す
	const vs = new VarStore;
	vs.set('tmp:ぎょへー', 'もきゅ');
	expect(vs.get('tmp:ぎょへー.x', 'def')).toBe('def');
});

// cast指定（本家 Variable.ts:317 #let() 相当）
it('set_cast_numeric', ()=> {
	const vs = new VarStore;
	vs.set('a', '3.9', 'num');
	vs.set('b', '3.9', 'int');
	vs.set('c', '-3.9', 'uint');
	vs.set('d', '0xff', 'num');
	expect(vs.get('a')).toBe(3.9);
	expect(vs.get('b')).toBe(3);
	expect(vs.get('c')).toBe(3);
	expect(vs.get('d')).toBe(255);
});
it('set_cast_bool', ()=> {
	const vs = new VarStore;
	vs.set('a', 'false', 'bool');
	vs.set('b', '0', 'bool');
	vs.set('c', '', 'bool');
	vs.set('d', null, 'bool');
	expect(vs.get('a')).toBe(false);
	expect(vs.get('b')).toBe(true);
	expect(vs.get('c')).toBe(false);
	expect(vs.get('d')).toBe(false);
});
it('set_cast_str_suppressesAutoCast', ()=> {
	const vs = new VarStore;
	vs.set('a', 123, 'str');
	expect(vs.get('a')).toBe('123');	// 値も文字列化される
	vs.set('b', '0123', 'str');
	expect(vs.get('b')).toBe('0123');	// 読み出し時の自動キャストもされない
	vs.set('b', '0123');				// cast無しで入れ直すと記録も解除される
	expect(vs.get('b')).toBe(123);
});
it('set_cast_str_isForgottenOnClear', ()=> {
	const vs = new VarStore;
	vs.set('game:a', '0123', 'str');
	expect(vs.get('game:a')).toBe('0123');
	vs.clearGame();
	vs.set('game:a', '0123');
	expect(vs.get('game:a')).toBe(123);
});
it('set_cast_errors', ()=> {
	const vs = new VarStore;
	expect(()=> vs.set('a', 'もじ', 'num')).toThrow();
	// @ts-expect-error 未定義のcast名は型でも弾く（実行時も例外）
	expect(()=> vs.set('a', 1, 'もじ')).toThrow();
});

it('invalid_name_throws', ()=> {
	const vs = new VarStore;
	expect(()=> vs.get('   ')).toThrow();
});
