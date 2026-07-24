/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2026-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

// [set_focus]（キーボードフォーカスの順番管理）。本家 EventMng.ts:640 #set_focus()。
//	実際にフォーカスを動かすのはFocusMng（DOM側）なのでE2E（focus.e2e.ts）。
//	ここで見るのは積むアクションだけ

import {ScriptEngine, type T_ENGINE_ACTION} from '../src/ts/ScriptEngine';

import {expect, it} from 'bun:test';


function acts(src: string): T_ENGINE_ACTION[] {return new ScriptEngine('t1', src).step()}
function focus(src: string) {return acts(`${src}[s]`).find(v=> v.t === 'setFocus')}


it('setFocus_to', ()=> {
	expect(focus('[set_focus to=null]')).toEqual({t: 'setFocus', mode: 'null'});
	expect(focus('[set_focus to=next]')).toEqual({t: 'setFocus', mode: 'next'});
	expect(focus('[set_focus to=prev]')).toEqual({t: 'setFocus', mode: 'prev'});
});

it('setFocus_toFromEventArg', ()=> {
	// 本家サンプル main.sn の形：[event key=ArrowRight label=*set_focus arg=next] を受けて
	//	*set_focus 側が [set_focus to=&sn.eventArg] する
	const se = new ScriptEngine('t1',
		'[add_lay layer=mes class=txt][event key=arrowright label=*x arg=next][l][set_focus to=&sn.eventArg][s]');
	se.step();						// [event]の予約まで実行して[l]で停止
	se.beginEvent('arrowright');	// これで tmp:sn.eventArg = 'next' が入る
	expect(se.step().find(v=> v.t === 'setFocus')).toEqual({t: 'setFocus', mode: 'next'});
});

it('setFocus_toInvalid', ()=> {
	expect(()=> focus('[set_focus to=yoko]')).toThrow('[set_focus] to【yoko】が不正です');
});

it('setFocus_required', ()=> {
	expect(()=> focus('[set_focus]')).toThrow('[set_focus] add か to は必須です');
});

it('setFocus_addDel', ()=> {
	expect(focus(`[set_focus add='dom=cfg:input']`))
		.toEqual({t: 'setFocus', mode: 'add', rawKey: 'dom=cfg:input', needErr: true});
	expect(focus(`[set_focus del='dom=cfg:input' need_err=false]`))
		.toEqual({t: 'setFocus', mode: 'del', rawKey: 'dom=cfg:input', needErr: false});
});

it('setFocus_addKeepsSelectorCase', ()=> {
	// **CSSセレクタは大小文字を区別する**ので小文字化しない（[event key='dom=…']と同じ）
	expect(focus(`[set_focus add='dom=cfg:#okBtn']`)).toMatchObject({rawKey: 'dom=cfg:#okBtn'});
});

it('setFocus_addMustBeDom', ()=> {
	// 本家はdom=以外を黙って無視してtoの処理へ落ちるが、書き間違いを見逃さないよう例外にする
	expect(()=> focus('[set_focus add=btn1]')).toThrow(`[set_focus] add/delは'dom=…'書式のみです`);
});

it('setFocus_reservedAsMacroName', ()=> {
	expect(()=> acts('[macro name=set_focus][s]'))
		.toThrow('[set_focus]はタグ名のため、マクロ名として使用できません');
});
