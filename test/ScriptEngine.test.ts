/* ***** BEGIN LICENSE BLOCK *****
Copyright (c) 2024-2026 Famibee (famibee.blog38.fc2.com)

This software is released under the MIT License.
http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import {ScriptEngine} from '../src/ts/ScriptEngine';

import {expect, it} from 'bun:test';


it('tokenize_basic', ()=> {
	expect(ScriptEngine.tokenize('あい[l]うえ\nお'))
		.toEqual(['あい', '[l]', 'うえ', '\n', 'お']);
});

it('parseTag_basic', ()=> {
	expect(ScriptEngine.parseTag('[lay layer=base pic=yun_1184]'))
		.toEqual({name: 'lay', args: {layer: 'base', pic: 'yun_1184'}});
});
it('parseTag_quoted', ()=> {
	expect(ScriptEngine.parseTag('[add_lay layer="my layer" class=\'GRP\']'))
		.toEqual({name: 'add_lay', args: {layer: 'my layer', class: 'GRP'}});
});
it('parseTag_noarg', ()=> {
	expect(ScriptEngine.parseTag('[s]')).toEqual({name: 's', args: {}});
});

// トークン列（参考）:
//	0:[add_lay ...] 1:あいうえお 2:[l] 3:かきくけこ 4:[s]
it('step_stopsAtL', ()=> {
	const se = new ScriptEngine('t1', '[add_lay layer=mes class=TXT]あいうえお[l]かきくけこ[s]');
	const a1 = se.step();
	expect(a1).toEqual([
		{t: 'addLay', cls: 'txt', nm: 'mes'},
		{t: 'chgStr', nm: 'mes', str: 'あいうえお'},
		{t: 'stop', kind: 'l', key: 't1:3'},
	]);
	expect(se.atEnd).toBe(false);

	const a2 = se.step();
	expect(a2).toEqual([
		{t: 'chgStr', nm: 'mes', str: 'あいうえおかきくけこ'},	// [l]は文字を消さないため、行が積み上がる
		{t: 'stop', kind: 's', key: 't1:5'},
	]);
	expect(se.atEnd).toBe(true);
});

it('step_chgPic', ()=> {
	const se = new ScriptEngine('t1', '[add_lay layer=base class=GRP][lay layer=base pic=yun_1184][s]');
	const a = se.step();
	expect(a).toEqual([
		{t: 'addLay', cls: 'grp', nm: 'base'},
		{t: 'chgPic', nm: 'base', fn: 'yun_1184'},
		{t: 'stop', kind: 's', key: 't1:3'},
	]);
});

it('step_jumpLabel', ()=> {
	const se = new ScriptEngine('t1', '[jump label=*goal]むし[s]\n*goal\nあ[s]');
	const a = se.step();
	expect(a.at(-1)).toEqual({t: 'stop', kind: 's', key: 't1:8'});
	// jump先の「あ」だけが表示され、「むし」はスキップされる
	expect(a.some(v=> v.t === 'chgStr' && v.str.includes('むし'))).toBe(false);
	expect(a.some(v=> v.t === 'chgStr' && v.str === 'あ')).toBe(true);
});

it('step_unknownTagIgnored', ()=> {
	const se = new ScriptEngine('t1', '[playbgm buf=BGM fn=a]あ[s]');
	const a = se.step();
	expect(a).toEqual([
		{t: 'chgStr', nm: 'mes', str: 'あ'},
		{t: 'stop', kind: 's', key: 't1:3'},
	]);
});

it('step_comment_ignored', ()=> {
	const se = new ScriptEngine('t1', ';これはコメント\nあ[s]');
	const a = se.step();
	expect(a).toEqual([
		{t: 'chgStr', nm: 'mes', str: 'あ'},
		{t: 'stop', kind: 's', key: 't1:4'},
	]);
});

it('step_comment_ignored_leadingWhitespace', ()=> {
	// 行頭にタブ/空白が入っていてもコメントとして無視されること（本番のscriptの慣習に合わせる）
	const se = new ScriptEngine('t1', '\t; これはコメント\nあ[s]');
	const a = se.step();
	expect(a).toEqual([
		{t: 'chgStr', nm: 'mes', str: 'あ'},
		{t: 'stop', kind: 's', key: 't1:4'},
	]);
});

it('step_p_clearsOnResume', ()=> {
	// [p]で停止した直後の次のstep()開始時に、現在レイヤがクリアされてから続く（改ページ挙動）
	const se = new ScriptEngine('t1', '[add_lay layer=mes class=TXT]あいうえお[p]かきくけこ[s]');
	const a1 = se.step();
	expect(a1).toEqual([
		{t: 'addLay', cls: 'txt', nm: 'mes'},
		{t: 'chgStr', nm: 'mes', str: 'あいうえお'},
		{t: 'stop', kind: 'p', key: 't1:3'},
	]);

	const a2 = se.step();
	expect(a2).toEqual([
		{t: 'chgStr', nm: 'mes', str: ''},			// [p]の次の進行でまずクリアされる
		{t: 'chgStr', nm: 'mes', str: 'かきくけこ'},
		{t: 'stop', kind: 's', key: 't1:5'},
	]);
});
