/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2026-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

// しおり（セーブ・ロード）系タグのうち、エンジンが担当する部分。
//	[record_place]・[save]・[load]・[reload_script]・[copybookmark]・[erasebookmark]・
//	[export]・[import]。
//	本家：ScriptIterator.ts:1516 #record_place() / :1552 #save() / :1415 #load() /
//	:1488 #reload_script()、Variable.ts:282 #copybookmark() / :298 #erasebookmark()、
//	SysWeb.ts:179 _export / :204 _import
//
//	**しおり1件の中身はエンジンだけでは決まらない**（表裏ページはストアが持つ）ので、
//	組み立て・保存・復元はScriptMngの担当。ここで見るのは
//	・エンジンが持つ分（save:変数・ifスタック・再開位置）の出し入れ
//	・属性の解釈と、そのタグが停止点かどうか

import {ScriptEngine, type T_ENGINE_ACTION} from '../src/ts/ScriptEngine';

import {expect, it} from 'bun:test';


function acts(src: string): T_ENGINE_ACTION[] {return new ScriptEngine('t1', src).step()}


// ============ [record_place] ============

it('recordPlace_writesResumePoint', ()=> {
	// 再開位置（save:const.sn.scriptFn / scriptIdx）をsave:へ書く。しおりのhSaveに含まれる
	const se = new ScriptEngine('t1', 'あ[record_place]い[s]');
	const a = se.step();
	expect(a.find(v=> v.t === 'recordPlace')).toEqual({t: 'recordPlace'});
	expect(se.getVal('save:const.sn.scriptFn')).toBe('t1');
	expect(typeof se.getVal('save:const.sn.scriptIdx')).toBe('number');
});

it('recordPlace_insideSubroutineRecordsCaller', ()=> {
	// サブルーチンの中なら**最上位の呼び元**の位置を記録する（本家 nowScrIdx()）。
	//	中身から再開しても呼び元のスタックが無くて[return]できないため
	const se = new ScriptEngine('t1', `[call label=*sub]あ[s]
*sub
	[record_place]
[return]`);
	se.step();
	const idxCaller = Number(se.getVal('save:const.sn.scriptIdx'));
	// [call]の次のトークン（＝戻り先）を指す＝サブルーチン内の位置ではない
	expect(idxCaller).toBeLessThan(5);
});

it('nowMarkPart_savesGameVarsAndIfStack', ()=> {
	const se = new ScriptEngine('t1', '[let name=game:hp text=80][if exp=true][record_place][s][endif]');
	se.step();
	const mk = se.nowMarkPart();
	expect(mk.hSave['hp']).toBe('80');
	expect(mk.aIfStk.length).toBe(1);	// [if]で1つ積まれている
});

it('restoreMarkPart_restoresGameVarsAndClearsStacks', ()=> {
	const se = new ScriptEngine('t1', '[let name=game:hp text=80][let name=mp:m text=1][s]');
	se.step();
	se.restoreMarkPart({hSave: {hp: 10, name: 'ゆかり'}, aIfStk: [-1]});
	expect(se.getVal('game:hp')).toBe(10);
	expect(se.getVal('game:name')).toBe('ゆかり');
	expect(se.getVal('mp:m')).toBeUndefined();	// マクロ引数は捨てる
});

it('restoreMarkPart_restoresLoopPlayBookkeeping', ()=> {
	// save:const.sn.loopPlayingから内部の#hLoopPlayを復元する（[load]後の[xchgbuf]/[stop_allse]が
	//	正しく動くように。実際に鳴らし直す・止めるのはScriptMng側の責務＝本家SoundMng.playLoopFromSaveObj()）
	const se = new ScriptEngine('t1', '[s][xchgbuf buf=BGM buf2=SE][s]');
	se.step();	// 最初の[s]まで
	se.restoreMarkPart({hSave: {'const.sn.loopPlaying': '{"BGM":"town"}'}, aIfStk: []});
	expect(JSON.parse(String(se.getVal('save:const.sn.loopPlaying')))).toEqual({BGM: 'town'});

	// 復元直後に[xchgbuf]を実行すると、内部#hLoopPlayが正しく引き継がれていれば
	//	loopPlayingのキーがBGMからSEへ入れ替わる（内部帳簿がsave:と食い違っていれば入れ替わらない）
	se.step();
	expect(JSON.parse(String(se.getVal('save:const.sn.loopPlaying')))).toEqual({SE: 'town'});
});

it('restoreMarkPart_brokenLoopPlayingJsonBecomesEmpty', ()=> {
	const se = new ScriptEngine('t1', '[s]');
	se.step();
	se.restoreMarkPart({hSave: {'const.sn.loopPlaying': '{broken'}, aIfStk: []});
	// 壊れたJSONは空扱い（本家の全停止スタートに相当）。例外で[load]全体を巻き込まない
	expect(se.getVal('save:const.sn.loopPlaying')).toBe('{broken');
});

it('cloneSys_setSys_roundTrip', ()=> {
	// sys:の永続化用。cast=strの記録も一緒に運ぶ（でないと'0123'が復元後に123になる）
	const se = new ScriptEngine('t1', '[let name=sys:a text=0123 cast=str][let name=sys:n text=5][s]');
	se.step();
	const h = se.cloneSys();

	const se2 = new ScriptEngine('t2', '[s]');
	se2.setSys(h);
	expect(se2.getVal('sys:a')).toBe('0123');
	expect(se2.getVal('sys:n')).toBe(5);
});


// ============ [save] ============

it('save_pushesActionWithAttrs', ()=> {
	// place以外の属性がそのまましおりの見出し（const.sn.bookmark.json）になる
	const a = acts('[save place=3 text=第一章 thumb=t.png][s]');
	expect(a.find(v=> v.t === 'save'))
		.toEqual({t: 'save', place: 3, json: {text: '第一章', thumb: 't.png'}});
});

it('save_placeRequired', ()=> {
	expect(()=> acts('[save][s]')).toThrow('[save] placeは必須です');
});

it('save_bumpsNextPlaceOnlyWhenCurrent', ()=> {
	// 「次に保存する枠」は、今書いた枠が現在値のときだけ進む（本家と同じ）
	const se = new ScriptEngine('t1', '[save place=1][s]');
	se.step();
	expect(se.getVal('sys:const.sn.save.place')).toBe(2);

	const se2 = new ScriptEngine('t2', '[save place=5][s]');
	se2.step();
	expect(se2.getVal('sys:const.sn.save.place')).toBe(1);	// 既定値のまま
});

it('save_defaultTextIsEmpty', ()=> {
	// text無指定でも見出しにtextキーは入る（本家 hArg.text = hArg.text ?? ''）
	const a = acts('[save place=0][s]');
	expect(a.find(v=> v.t === 'save')).toEqual({t: 'save', place: 0, json: {text: ''}});
});


// ============ [load] ============

it('load_defaultsAndStops', ()=> {
	const a = acts('[load][s]');
	expect(a.at(-1)).toEqual({t: 'load', place: 0, fn: '', label: ''});
	expect(a.some(v=> v.t === 'stop')).toBe(false);	// 復元が済むまで待つ＝停止する
});

it('load_fnAndLabelMustBePaired', ()=> {
	expect(()=> acts('[load place=1 fn=other][s]')).toThrow('fnとlabelはセットで');
	expect(()=> acts('[load place=1 label=*a][s]')).toThrow('fnとlabelはセットで');
	expect(acts('[load place=1 fn=other label=*a][s]').at(-1))
		.toEqual({t: 'load', place: 1, fn: 'other', label: '*a'});
});

it('load_indexAllowsFnAlone', ()=> {
	// index指定時（本家「ページ移動用」）はlabelが要らない（fnだけでもよい）
	expect(acts('[load place=1 fn=other index=5][s]').at(-1))
		.toEqual({t: 'load', place: 1, fn: 'other', label: '', index: 5});
	// fn省略でも通る（現在のスクリプトのままindex位置へ）
	expect(acts('[load place=1 index=5][s]').at(-1))
		.toEqual({t: 'load', place: 1, fn: '', label: '', index: 5});
});

it('load_doRec', ()=> {
	// do_rec（既定true）：省略時はアクションに含めない（既定はScriptMng側が持つ）
	expect(acts('[load place=1][s]').at(-1)).toEqual({t: 'load', place: 1, fn: '', label: ''});
	expect(acts('[load place=1 do_rec=false][s]').at(-1))
		.toEqual({t: 'load', place: 1, fn: '', label: '', doRec: false});
	expect(acts('[load place=1 do_rec=true][s]').at(-1))
		.toEqual({t: 'load', place: 1, fn: '', label: '', doRec: true});
});


// ============ [reload_script] ============

it('reloadScript_stops', ()=> {
	const a = acts('[reload_script][s]');
	expect(a.at(-1)).toEqual({t: 'reloadScript'});
	expect(a.some(v=> v.t === 'stop')).toBe(false);
});


// ============ [copybookmark] / [erasebookmark] ============

it('copybookmark_pushesAction', ()=> {
	expect(acts('[copybookmark from=1 to=2][s]').find(v=> v.t === 'copyBookmark'))
		.toEqual({t: 'copyBookmark', from: 1, to: 2});
});

it('copybookmark_sameIsNoop', ()=> {
	// from===toは本家同様なにもしない
	expect(acts('[copybookmark from=1 to=1][s]').some(v=> v.t === 'copyBookmark')).toBe(false);
});

it('erasebookmark_pushesAction', ()=> {
	expect(acts('[erasebookmark place=4][s]').find(v=> v.t === 'eraseBookmark'))
		.toEqual({t: 'eraseBookmark', place: 4});
});


// ============ [export] / [import] ============

it('export_import_pushActionsWithoutStopping', ()=> {
	// どちらも停止点ではない（[import]のファイル選択はユーザー任せで、
	//	終わったら[event key=sn:imported]が発火する。本家と同じ）
	const a = acts('[export][import][s]');
	expect(a.find(v=> v.t === 'exportData')).toEqual({t: 'exportData'});
	expect(a.find(v=> v.t === 'importData')).toEqual({t: 'importData'});
	expect(a.at(-1)?.t).toBe('stop');
});


// ============ 予約タグ名 ============

it('saveTags_areReservedForMacroNames', ()=> {
	// タグ名はマクロ名に使えない（本家 REG_NG4MAC_NM ＋ タグ名一覧）
	for (const nm of ['save', 'load', 'record_place', 'reload_script',
		'copybookmark', 'erasebookmark', 'export', 'import']) {
		expect(ScriptEngine.RESERVED_TAGS.has(nm)).toBe(true);
	}
});


// ============ しおりが使う組み込み変数 ============
//	テンプレの frames/_archive.sn が
//	[save place=… dt=&const.Date.getDateStr text=&const.sn.last_page_plain_text]
//	と書くので、これらが無いと枠の日付・本文が空になる（&式がundefinedだと属性ごと落ちるため）

it('builtin_dateStr', ()=> {
	// 本家 CmnInterface.ts:288 defTmp('const.Date.getDateStr') と同じ書式（2026/07/25 15:00）
	const se = new ScriptEngine('t1', '[s]');
	expect(String(se.getVal('const.Date.getDateStr'))).toMatch(/^\d{4}\/\d{2}\/\d{2} \d{2}:\d{2}$/);
	expect(Number(se.getVal('const.Date.getTime'))).toBeGreaterThan(0);
});

it('builtin_lastPagePlainText', ()=> {
	// 本家 LayerMng.ts:213 と同じ「今のページの本文」。既定文字レイヤの蓄積文字列
	const se = new ScriptEngine('t1', 'あいう[s]');
	se.step();
	expect(se.getVal('const.sn.last_page_plain_text')).toBe('あいう');
});

it('builtin_lastPagePlainText_followsCurrentLayer', ()=> {
	// [current]で既定文字レイヤを切り替えたら、そちらの本文を返す
	const se = new ScriptEngine('t1',
		'[add_lay layer=mes class=txt][add_lay layer=sub class=txt]おもて[current layer=sub]うら[s]');
	se.step();
	expect(se.getVal('const.sn.last_page_plain_text')).toBe('うら');
});

it('builtin_lastPagePlainText_clearedByEr', ()=> {
	const se = new ScriptEngine('t1', 'あいう[er]かきく[s]');
	se.step();
	expect(se.getVal('const.sn.last_page_plain_text')).toBe('かきく');
});
