/* ***** BEGIN LICENSE BLOCK *****
Copyright (c) 2026-2026 Famibee (famibee.blog38.fc2.com)

This software is released under the MIT License.
http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import {ScriptEngine} from '../src/ts/ScriptEngine';

import {expect, it} from 'bun:test';


// [s]等の停止タグを含まないifだけのスクリプトを最後まで実行し、'mes'レイヤの最終文字列を返す。
// stop等の内部インデックスを直接見るのではなく、最終的に表示された文字列だけで
// 分岐選択の正しさを検証する方針（過剰な内部状態への依存を避けるため）
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


// ============ elsif・else なし ============

it('if_true_noElse', ()=> {
	expect(run('[if exp=0==0]o[endif]')).toBe('o');
});
it('if_false_noElse', ()=> {
	// どちらの分岐も採用されない場合、何も表示されない（chgStrすら発生しない）
	expect(run('[if exp=0==1]x[endif]')).toBe('');
});

// ============ else のみ ============

it('if_true_withElse', ()=> {
	expect(run('[if exp=0==0]o[else]x[endif]')).toBe('o');
});
it('if_false_withElse', ()=> {
	expect(run('[if exp=0==1]x[else]o[endif]')).toBe('o');
});

// ============ elsif 1つ、else なし ============

it('elsif1_ifTrue', ()=> {
	expect(run('[if exp=0==0]o[elsif exp=0==1]x[endif]')).toBe('o');
});
it('elsif1_ifTrue_elsifAlsoTrue_ifWins', ()=> {
	// ifが真なら、elsifの条件も真であってもifが優先される（elsifは評価すらされない）
	expect(run('[if exp=0==0]o[elsif exp=0==0]x[endif]')).toBe('o');
});
it('elsif1_elsifTrue', ()=> {
	expect(run('[if exp=0==1]x[elsif exp=0==0]o[endif]')).toBe('o');
});
it('elsif1_noneTrue', ()=> {
	expect(run('[if exp=0==1]x[elsif exp=0==2]x[endif]')).toBe('');
});

// ============ elsif 1つ、else あり ============

it('elsif1_else_ifTrue', ()=> {
	expect(run('[if exp=0==0]o[elsif exp=0==1]x[else]x[endif]')).toBe('o');
});
it('elsif1_else_ifTrue_elsifAlsoTrue', ()=> {
	expect(run('[if exp=0==0]o[elsif exp=0==0]x[else]x[endif]')).toBe('o');
});
it('elsif1_else_elsifTrue', ()=> {
	expect(run('[if exp=0==1]x[elsif exp=0==0]o[else]x[endif]')).toBe('o');
});
it('elsif1_else_noneTrue_elseWins', ()=> {
	expect(run('[if exp=0==1]x[elsif exp=0==2]x[else]o[endif]')).toBe('o');
});

// ============ elsif 2つ、else なし ============

it('elsif2_ifTrue', ()=> {
	expect(run('[if exp=0==0]o[elsif exp=0==1]x[elsif exp=0==2]x[endif]')).toBe('o');
});
it('elsif2_ifTrue_othersAlsoTrue', ()=> {
	expect(run('[if exp=0==0]o[elsif exp=0==0]x[elsif exp=0==2]x[endif]')).toBe('o');
});
it('elsif2_firstElsifTrue', ()=> {
	expect(run('[if exp=0==1]x[elsif exp=0==0]o[elsif exp=0==2]x[endif]')).toBe('o');
});
it('elsif2_secondElsifTrue', ()=> {
	expect(run('[if exp=0==1]x[elsif exp=0==2]x[elsif exp=0==0]o[endif]')).toBe('o');
});
it('elsif2_noneTrue', ()=> {
	expect(run('[if exp=0==1]x[elsif exp=0==2]x[elsif exp=0==3]x[endif]')).toBe('');
});

// ============ elsif 2つ、else あり ============

it('elsif2_else_ifTrue', ()=> {
	expect(run('[if exp=0==0]o[elsif exp=0==1]x[elsif exp=0==2]x[else]x[endif]')).toBe('o');
});
it('elsif2_else_ifTrue_othersAlsoTrue', ()=> {
	expect(run('[if exp=0==0]o[elsif exp=0==0]x[elsif exp=0==2]x[else]x[endif]')).toBe('o');
});
it('elsif2_else_firstElsifTrue', ()=> {
	expect(run('[if exp=0==1]x[elsif exp=0==0]o[elsif exp=0==2]x[else]x[endif]')).toBe('o');
});
it('elsif2_else_secondElsifTrue', ()=> {
	expect(run('[if exp=0==1]x[elsif exp=0==2]x[elsif exp=0==0]o[else]x[endif]')).toBe('o');
});
it('elsif2_else_noneTrue_elseWins', ()=> {
	expect(run('[if exp=0==1]x[elsif exp=0==2]x[elsif exp=0==3]x[else]o[endif]')).toBe('o');
});


// ============ 入れ子if ============

it('nested_if_insideTrueBranch_bothTrue', ()=> {
	expect(run('[if exp=0==0]outer[if exp=0==0]inner[endif]tail[endif]')).toBe('outerinnertail');
});
it('nested_if_insideTrueBranch_innerFalse', ()=> {
	expect(run('[if exp=0==0]outer[if exp=0==1]x[endif]tail[endif]')).toBe('outertail');
});
it('nested_if_insideElseBranch', ()=> {
	expect(run('[if exp=0==1]x[else]outer[if exp=0==0]inner[endif][endif]')).toBe('outerinner');
});
it('nested_if_insideSkippedBranch_depthCountedCorrectly', ()=> {
	// 外側ifが偽で読み飛ばされる本文の中に入れ子if/endifがあっても、
	// 深度カウントにより外側チェーンのelsifを誤って呑み込まない
	expect(run('[if exp=0==1]x[if exp=1==1]x2[endif]x3[elsif exp=0==0]o[endif]')).toBe('o');
});
it('nested_if_twoLevelsDeep', ()=> {
	expect(run(
		'[if exp=0==0]a[if exp=0==0]b[if exp=0==0]c[endif]d[endif]e[endif]'
	)).toBe('abcde');
});
it('nested_if_siblingChains_independentStacks', ()=> {
	// 入れ子ではなく「隣り合う」2つのifチェーンが、互いの#aIfStkに干渉しないこと
	expect(run('[if exp=0==0]A[endif][if exp=0==1]x[else]B[endif]')).toBe('AB');
});


// ============ エラー系 ============

it('if_missingExp_throws', ()=> {
	expect(()=> new ScriptEngine('t1', '[if]o[endif]').step()).toThrow();
});
it('if_missingEndif_throws', ()=> {
	expect(()=> new ScriptEngine('t1', '[if exp=0==0]o').step()).toThrow();
});
it('elsif_alone_throws', ()=> {
	// 対応する[if]がない状態で[elsif]に出会うとthrow（#aIfStkが空）
	expect(()=> new ScriptEngine('t1', '[elsif exp=0==0]o[endif]').step()).toThrow();
});
it('endif_alone_throws', ()=> {
	expect(()=> new ScriptEngine('t1', '[endif]').step()).toThrow();
});
it('elsif_missingExp_notEvaluated_whenAlreadyMatched_noThrow', ()=> {
	// ifが既に真の場合、以降のelsifは短絡評価されるためexp省略でもthrowしない
	expect(run('[if exp=0==0]o[elsif]x[endif]')).toBe('o');
});
it('elsif_missingExp_throws_whenReached', ()=> {
	// ifが偽で実際にelsifへ到達する場合は、exp省略はthrowする
	expect(()=> new ScriptEngine('t1', '[if exp=0==1]x[elsif]x[endif]').step()).toThrow();
});
