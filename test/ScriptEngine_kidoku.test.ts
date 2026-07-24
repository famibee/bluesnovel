/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2026-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

// 既読処理の検証。
//	「どのスクリプトのどのトークンまで読んだか」をAreas（本家から移植済み）で覚え、
//	組み込み変数 const.sn.isKidoku で参照できる。
//	同じ位置を2周させて、1周目=未読／2周目=既読になることで確かめる。
//	参考：SKYNovel_gallery の kidoku サンプル
//	https://github.com/famibee/SKYNovel_gallery/tree/master/public/prj/kidoku

import {ScriptEngine, type T_ENGINE_ACTION} from '../src/ts/ScriptEngine';
import {Script} from '../src/ts/Script';

import {expect, it} from 'bun:test';


// [trace]の出力だけを取り出す。既読かどうかは「そのトークンを読んだ時点」の値なので、
//	停止後にgetterで見るのではなく、見たい位置に[trace]を置いて記録させる
function traces(aAct: T_ENGINE_ACTION[]): string[] {
	return aAct.filter(v=> v.t === 'trace').map(v=> v.text);
}
const TRACE_KIDOKU = '[trace text=&const.sn.isKidoku]';


// ============ 基本：2周目は既読 ============

it('kidoku_secondPassIsRead', ()=> {
	const se = new ScriptEngine('t1', `*top\nA[l][jump label=*top]`);
	se.step();
	expect(se.isKidoku).toBe(false);

	se.step();	// [jump]で*topへ戻る＝同じトークンをもう一度読む
	expect(se.isKidoku).toBe(true);
});

it('kidoku_isKidokuIsAvailableAsBuiltinVar', ()=> {
	const se = new ScriptEngine('t1', `*top\n${TRACE_KIDOKU}[l][jump label=*top]`);
	expect(traces(se.step())).toEqual(['false']);
	expect(traces(se.step())).toEqual(['true']);
});

it('kidoku_branchByIsKidoku', ()=> {
	// [if exp="const.sn.isKidoku"]で既読・未読を分岐できる（既読スキップ等の土台）
	const se = new ScriptEngine('t1',
		`*top\n[if exp="const.sn.isKidoku"]既読[else]未読[endif][l][jump label=*top]`
	);
	expect(se.step().filter(v=> v.t === 'chgStr').at(-1)?.str).toBe('未読');
	expect(se.step().filter(v=> v.t === 'chgStr').at(-1)?.str).toBe('未読既読');
});

it('kidoku_unreadBranchStaysUnread', ()=> {
	// 通らなかった分岐は記録されない（[if]の読み飛ばし走査はトークンを「読んで」いないため）。
	//	トークンは 0:[if] 1:NG 2:[endif] 3:A 4:[s] で、実行されるのは0と3〜4
	const se = new ScriptEngine('t1', '[if exp=false]NG[endif]A[s]');
	se.step();
	expect(se.getKidoku().t1).toEqual({0: 0, 3: 4});
});


// ============ サブルーチン・マクロ内では既読フラグを変えない ============

it('kidoku_notChangedInsideSubroutine', ()=> {
	// 同じサブルーチンが未読・既読どちらの文脈からも呼ばれるため、
	//	本家はコールスタックがある間はisKidokuを更新しない（記録だけ行う）。
	//	2周目のサブルーチン内で「初めて読むトークン」に出会っても、falseへ落ちない
	const src =
		`*top\n[call count=true label=*sub]&game:n = 1\n[l][jump label=*top]`+
		`\n*sub\n[if exp="game:n==1"]初回は通らない[endif]${TRACE_KIDOKU}[return]`;
	const se = new ScriptEngine('t1', src);

	expect(traces(se.step())).toEqual(['false']);	// 1周目：コール位置は未読
	expect(traces(se.step())).toEqual(['true']);	// 2周目：未読のトークンを読んでもコール元の値のまま
});


// ============ [call]／[jump]のcount属性 ============

it('call_defaultErasesKidokuAtReturnPoint', ()=> {
	// [call]は既定で「タグの次のトークン位置」＝戻り先を未読へ戻す（本家 #call() のcount既定はfalse）。
	//	同じサブルーチンを何度も呼ぶ書き方が普通なので、コール位置を既読に数えない
	const src =
		`*top\n[call label=*sub]${TRACE_KIDOKU}[l][jump label=*top]`+
		`\n*sub\n[return]`;
	const se = new ScriptEngine('t1', src);

	expect(traces(se.step())).toEqual(['false']);
	expect(traces(se.step())).toEqual(['false']);	// 2周目でも未読へ戻されている
});

it('call_count_true_keepsKidoku', ()=> {
	const src =
		`*top\n[call count=true label=*sub]${TRACE_KIDOKU}[l][jump label=*top]`+
		`\n*sub\n[return]`;
	const se = new ScriptEngine('t1', src);

	expect(traces(se.step())).toEqual(['false']);
	expect(traces(se.step())).toEqual(['true']);	// count=trueなら消さない
});

it('jump_defaultCountsAsRead', ()=> {
	// [jump]のcount既定はtrue＝既読のまま（[call]と既定が逆）
	const se = new ScriptEngine('t1', `*top\n${TRACE_KIDOKU}[l][jump label=*top]`);
	expect(traces(se.step())).toEqual(['false']);
	expect(traces(se.step())).toEqual(['true']);
});

it('jump_count_false_isAccepted', ()=> {
	// 本家同様、消すのは「[jump]タグの次のトークン位置」。[jump]の直後は通常そのまま
	//	読み進める先ではないので、実際には効かないことがほとんど（本家の実装をそのまま移した）
	const se = new ScriptEngine('t1', `*top\n${TRACE_KIDOKU}[l][jump count=false label=*top]`);
	expect(traces(se.step())).toEqual(['false']);
	expect(traces(se.step())).toEqual(['true']);
});


// ============ [clearvar]／[clearsysvar] ============

it('clearsysvar_clearsKidoku', ()=> {
	// SKYNovel_gallery の kidoku サンプルが「既読情報クリア」ボタンで使っているのがこれ
	const se = new ScriptEngine('t1',
		`*top\n${TRACE_KIDOKU}[l][clearsysvar][jump label=*top]`
	);
	expect(traces(se.step())).toEqual(['false']);
	expect(traces(se.step())).toEqual(['false']);	// 既読情報が消えたので未読に戻る
});

it('clearsysvar_clearsSysVarsOnly', ()=> {
	const se = new ScriptEngine('t1',
		'[let name=sys:a val=1][let name=game:b val=2][clearsysvar][s]'
	);
	se.step();
	expect(se.getVal('sys:a')).toBeUndefined();
	expect(se.getVal('game:b')).toBe(2);
});

it('clearvar_clearsGameVarsOnly', ()=> {
	const se = new ScriptEngine('t1',
		'[let name=sys:a val=1][let name=game:b val=2][clearvar][s]'
	);
	se.step();
	expect(se.getVal('sys:a')).toBe(1);
	expect(se.getVal('game:b')).toBeUndefined();
});

it('clearvar_doesNotClearKidoku', ()=> {
	const se = new ScriptEngine('t1',
		`*top\n${TRACE_KIDOKU}[l][clearvar][jump label=*top]`
	);
	expect(traces(se.step())).toEqual(['false']);
	expect(traces(se.step())).toEqual(['true']);
});

it('clearvar_isReservedAsTagName', ()=> {
	expect(()=> new ScriptEngine('t1', '[macro name=clearvar]X[endmacro]').step()).toThrow();
	expect(()=> new ScriptEngine('t1', '[macro name=clearsysvar]X[endmacro]').step()).toThrow();
});


// ============ ファイル別・セーブ層向けの出し入れ ============

it('kidoku_isPerScriptFile', ()=> {
	const se = new ScriptEngine(new Script('main', 'A[l]'));
	se.step();
	expect(Object.keys(se.getKidoku())).toEqual(['main']);

	se.switchScript(new Script('other', 'B[l]'));
	se.step();
	expect(Object.keys(se.getKidoku()).sort()).toEqual(['main', 'other']);
});

it('kidoku_getAndSetRoundTrip', ()=> {
	// セーブ層（本家 Variable.saveKidoku() / SysBase.data.kidoku）が付いた時の受け渡し用
	const src = `*top\n${TRACE_KIDOKU}[l][jump label=*top]`;
	const se = new ScriptEngine('t1', src);
	se.step();

	const se2 = new ScriptEngine('t1', src);
	se2.setKidoku(se.getKidoku());
	expect(traces(se2.step())).toEqual(['true']);	// 別インスタンスでも「読んだことがある」
});

it('kidoku_setKidokuReplacesAll', ()=> {
	const se = new ScriptEngine('t1', 'A[l]');
	se.step();
	se.setKidoku({});
	expect(se.getKidoku()).toEqual({});
});
