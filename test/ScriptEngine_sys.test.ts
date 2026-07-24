/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2026-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

// しおり・システム系タグのうち、エンジンが担当する部分。
//	[title]・[toggle_full_screen]・[dump_lay]・[pop_stack]。
//	本家：SysBase.ts:448 title / :462 #tglFlscr()、LayerMng.ts:1068 #dump_lay()、
//	ScriptIterator.ts:984 #pop_stack()

import {ScriptEngine, type T_ENGINE_ACTION} from '../src/ts/ScriptEngine';

import {expect, it} from 'bun:test';


const LAYS = '[add_lay layer=base class=grp][add_lay layer=mes class=txt]';
function acts(src: string): T_ENGINE_ACTION[] {return new ScriptEngine('t1', src).step()}


// ============ [title] ============

it('title_pushesAction', ()=> {
	expect(acts('[title text=ゲーム名][s]').find(v=> v.t === 'title'))
		.toEqual({t: 'title', text: 'ゲーム名'});
});

it('title_textRequired', ()=> {
	expect(()=> acts('[title][s]')).toThrow('[title] textは必須です');
});

it('title_expression', ()=> {
	// 本家サンプル setting.sn:50 の形：[title text=#&…+' 体験版'# cond=…]
	expect(acts(`[let name=nm text=ゲーム cast=str][title text="&nm +'体験版'"][s]`).find(v=> v.t === 'title'))
		.toEqual({t: 'title', text: 'ゲーム体験版'});
});


// ============ [toggle_full_screen] ============

it('toggleFullScr_noKey', ()=> {
	// key省略時はその場で切り替える
	expect(acts('[toggle_full_screen][s]').find(v=> v.t === 'toggleFullScr'))
		.toEqual({t: 'toggleFullScr'});
});

it('toggleFullScr_key', ()=> {
	// key指定時は「そのキーで切り替えられるようにする」常駐予約。キー名は小文字化（本家と同じ）
	expect(acts('[toggle_full_screen key=W][s]').find(v=> v.t === 'fullScrKey'))
		.toEqual({t: 'fullScrKey', key: 'w'});
});

it('displayState_isBuiltin', ()=> {
	// 全画面かどうかの組み込み変数。**エンジンは自分では倒さない**（Escでの解除もあるので、
	//	実状態はDOM側からsetFullScr()で教えてもらう）
	const se = new ScriptEngine('t1', '[toggle_full_screen][s]');
	se.step();
	expect(se.getVal('const.sn.displayState')).toBe(false);	// [toggle_full_screen]では変わらない

	se.setFullScr(true);
	expect(se.getVal('const.sn.displayState')).toBe(true);
});

it('displayState_readOnly', ()=> {
	expect(()=> acts('[let name=const.sn.displayState text=true][s]')).toThrow();
});


// ============ [dump_lay] ============

it('dumpLay_allLayers', ()=> {
	expect(acts(`${LAYS}[dump_lay][s]`).find(v=> v.t === 'dumpLay'))
		.toEqual({t: 'dumpLay', aLayNm: null});	// layer省略は全レイヤ
});

it('dumpLay_someLayers', ()=> {
	expect(acts(`${LAYS}[dump_lay layer='base, mes'][s]`).find(v=> v.t === 'dumpLay'))
		.toEqual({t: 'dumpLay', aLayNm: ['base', 'mes']});
});


// ============ [pop_stack] ============

it('popStack_popsOne', ()=> {
	// [call]で積んだ枠を[return]せずに捨てる。捨てた後は現在位置のまま進む
	const se = new ScriptEngine('t1', `[call label=*sub]もどった[s]
*sub
[pop_stack]ぬけた[s]`);
	const a = se.step();
	expect(a.some(v=> v.t === 'chgStr' && v.str === 'ぬけた')).toBe(true);
	expect(a.some(v=> v.t === 'chgStr' && v.str === 'もどった')).toBe(false);
});

it('popStack_returnAfterPopThrows', ()=> {
	// 枠を捨てたので[return]する相手がいない
	expect(()=> acts(`[call label=*sub]A[s]
*sub
[pop_stack][return]`)).toThrow('[return] 呼び出し元がありません');
});

it('popStack_emptyThrows', ()=> {
	expect(()=> acts('[pop_stack][s]')).toThrow('[pop_stack] スタックが空です');
});

it('popStack_clearEmptiesAll', ()=> {
	// clear=trueは全部捨てる。空でも例外にならない（本家も clear 時は pop しない）
	expect(()=> acts('[pop_stack clear=true][s]')).not.toThrow();
});

it('popStack_clearFromNested', ()=> {
	const se = new ScriptEngine('t1', `[call label=*a]だめ1[s]
*a
[call label=*b]だめ2[s]
*b
[pop_stack clear=true]ぬけた[s]`);
	const a = se.step();
	expect(a.some(v=> v.t === 'chgStr' && v.str === 'ぬけた')).toBe(true);
	expect(a.filter(v=> v.t === 'chgStr').map(v=> v.str)).not.toContain('だめ1');
});

it('popStack_clearsMp', ()=> {
	// 本家同様、マクロ引数（mp:）を捨てる（[return]と違い、呼び出し前の値へ戻すのではなく空にする）
	const se = new ScriptEngine('t1', `[macro name=mac][pop_stack]ぬけた[s][endmacro]
[mac arg=1]`);
	se.step();
	expect(se.getVal('mp:arg')).toBeUndefined();
});

it('popStack_resetsIfStackToWall', ()=> {
	// ifスタックは「壁」(-1)だけに戻る＝途中の[if]は無かったことになる。
	//	なので[pop_stack]の後に残った[endif]へ辿り着くとエラーになる。
	//	これは本家と同じ挙動（本家 #endif() も t === -1 なら 'ifブロック内ではありません' を投げる）
	expect(()=> acts(`[call label=*sub]
*sub
[if exp=true][pop_stack][endif]ぬけた[s]`)).toThrow('[elsif]/[else]/[endif]');
});
