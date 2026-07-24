/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2026-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

// 複数ファイル（[jump fn=…]／[call fn=…]／[return fn=…]／別ファイル定義のマクロ）の検証。
//	ScriptEngineはfetchしない（＝DOM非依存を保つ）ので、別ファイルが必要になると
//	{t:'loadScript'} アクションを返して一旦止まる。実際のロードは呼び出し側（ScriptMng）の責務。
//	ここではそのプロトコルを、テスト内の擬似ファイル表で肩代わりして回す

import {ScriptEngine, type T_ENGINE_ACTION} from '../src/ts/ScriptEngine';
import {Script} from '../src/ts/Script';

import {expect, it} from 'bun:test';


// 擬似的な複数ファイル環境でエンジンを最後まで回し、'mes'レイヤの最終文字列を返す。
//	loadScriptが来たら hSrc から引いて switchScript() する＝ScriptMng.#runStep() と同じ手順
function runFiles(hSrc: {[fn: string]: string}, fnFirst = 'main'): string {
	const hScr: {[fn: string]: Script} = {};
	const getScr = (fn: string)=> {
		const src = hSrc[fn];
		if (src === undefined) throw `テスト用スクリプト【${fn}】がありません`;
		return hScr[fn] ??= new Script(fn, src);
	};

	const se = new ScriptEngine(getScr(fnFirst));
	let last = '';
	for (let guard=0; guard<100; ++guard) {
		const aAct: T_ENGINE_ACTION[] = se.step();
		for (const act of aAct) if (act.t === 'chgStr' && act.nm === 'mes') last = act.str;

		const tail = aAct.at(-1);
		if (tail?.t !== 'loadScript') return last;

		se.switchScript(getScr(tail.fn), tail.label, tail.idx);
	}
	throw 'ファイル切替が100回を超えた（無限ループ？）';
}


it('jump_fn_movesToAnotherFile', ()=> {
	expect(runFiles({
		main: 'A[jump fn=other]NG',
		other: 'B',
	})).toBe('AB');
});

it('jump_fn_withLabel', ()=> {
	expect(runFiles({
		main: 'A[jump fn=other label=*here]',
		other: 'NG[jump label=*end]\n*here\nB\n*end\n',
	})).toBe('AB');
});

it('jump_fn_sameFileIsPlainJump', ()=> {	// fnが現在のファイルなら通常のラベルジャンプ
	expect(runFiles({
		main: 'A[jump fn=main label=*here]NG\n*here\nB',
	})).toBe('AB');
});

it('call_fn_returnsToCaller', ()=> {
	// 別ファイルのサブルーチンを呼び、[return]で「呼び出し元のファイルの続き」へ戻る
	expect(runFiles({
		main: 'A[call fn=sub label=*s]C',
		sub: 'NG[jump label=*end]\n*s\nB[return]\n*end\n',
	})).toBe('ABC');
});

it('call_fn_withoutLabel_startsAtHead', ()=> {	// label省略時は先頭から
	expect(runFiles({
		main: 'A[call fn=sub]C',
		sub: 'B[return]',
	})).toBe('ABC');
});

it('return_fn_movesToAnotherFile', ()=> {
	// [return fn=…]は「コール元ではなく指定先へ進む」（本家 #return() の {fn,label}）
	expect(runFiles({
		main: 'A[call label=*s]NG[jump label=*end]\n*s\nB[return fn=other]\n*end\n',
		other: 'C',
	})).toBe('ABC');
});

it('macro_definedInAnotherFile_isCallable', ()=> {
	// マクロは定義元のファイル名も覚えているので、別ファイルからでも呼べる
	expect(runFiles({
		main: '[call fn=lib]A[m]C',
		lib: '[macro name=m]B[endmacro][return]',
	})).toBe('ABC');
});

it('variables_surviveFileSwitch', ()=> {
	// 変数はエンジン側が持つ＝ファイルを跨いでも消えない（複数ファイル対応の主目的）
	const hScr = {
		main: '[let name=game:hp val=100][jump fn=other]',
		other: '&game:hp&',
	};
	expect(runFiles(hScr)).toBe('100');
});

it('loadScript_actionIsEmittedOnce', ()=> {
	// step()は別ファイルが必要になった時点で打ち切り、loadScriptを最後の要素として返す
	const se = new ScriptEngine(new Script('main', 'A[jump fn=other]'));
	const a = se.step();
	expect(a.at(-1)).toEqual({t: 'loadScript', fn: 'other', label: '', idx: 0});
	expect(a.filter(v=> v.t === 'loadScript')).toHaveLength(1);
});

it('switchScript_undefinedLabel_throws', ()=> {
	const se = new ScriptEngine(new Script('main', 'A'));
	expect(()=> se.switchScript(new Script('other', 'B'), '*nope')).toThrow();
});

it('fn_reflectsCurrentScript', ()=> {
	const se = new ScriptEngine(new Script('main', '[s]'));
	expect(se.fn).toBe('main');
	expect(se.getVal('const.sn.scriptFn')).toBe('main');

	se.switchScript(new Script('other', '[s]'));
	expect(se.fn).toBe('other');
	expect(se.getVal('const.sn.scriptFn')).toBe('other');	// 組み込み変数は遅延評価なので追随する
});

it('callToScript_pushesCallStackThenSwitches', ()=> {
	// [button fn=… call=true]クリック相当。停止点で別ファイルをコールし、[return]でその停止点へ戻る
	//	（＝[l]が再実行されてイベント待ちに戻る。callToLabel()と同じ規約）
	const scrMain = new Script('main', 'A[l]B[s]');
	const se = new ScriptEngine(scrMain);
	expect(se.step().at(-1)).toEqual({t: 'stop', kind: 'l', key: 'main:2', nm: 'mes'});

	se.callToScript(new Script('sub', 'S[return]'), '');
	const a = se.step();
	expect(a.filter(v=> v.t === 'chgStr').at(-1)).toEqual({t: 'chgStr', nm: 'mes', str: 'AS'});
	// 別ファイルからの[return]なので、呼び出し元ファイルの読み直し要求が返る
	expect(a.at(-1)).toEqual({t: 'loadScript', fn: 'main', label: '', idx: 1});

	se.switchScript(scrMain, '', 1);
	// 戻り先は[l]そのもの＝再びイベント待ちの停止点になる（読み進めてしまわない）
	expect(se.step().at(-1)).toEqual({t: 'stop', kind: 'l', key: 'main:2', nm: 'mes'});
	expect(se.fn).toBe('main');
});
