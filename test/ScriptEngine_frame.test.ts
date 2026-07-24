/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2026-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

// HTMLフレーム（[add_frame]/[frame]/[set_frame]/[let_frame]）のうち、エンジンが担当する部分。
//	本家 FrameMng.ts の移植。iframeを実際に読み込むのはFrameMng（DOM側）なのでE2E（frame.e2e.ts）。
//	ここで見るのは積むアクションと、組み込み変数 const.sn.frm.<id> による前提チェックだけ。
//	[event key='dom=…']のDOM側予約もここに含める（本家 EventMng.ts:564）

import {ScriptEngine, type T_ENGINE_ACTION} from '../src/ts/ScriptEngine';

import {expect, it} from 'bun:test';


function acts(src: string): T_ENGINE_ACTION[] {return new ScriptEngine('t1', src).step()}
// [add_frame]は読込待ちで止まるので、その先を試すには「読み込み済み」に見せる必要がある。
//	FrameMngがやること（組み込み変数の書き戻し）をエンジンの外から直接与える
function loaded(src: string, id = 'yesno'): ScriptEngine {
	const se = new ScriptEngine('t1', src);
	se.setValNochk(`const.sn.frm.${id}`, true);
	return se;
}


// ============ [add_frame] ============

it('addFrame_pushesAndStops', ()=> {
	// HTMLの読込が要るのでstep()はここで一旦返る（本家も Reading.beginProc で止める）
	const a = acts('[add_frame id=yesno src=_yesno]あ[s]');
	expect(a.at(-1)).toEqual({t: 'addFrame', id: 'yesno', src: '_yesno', sty: {}});
	expect(a.some(v=> v.t === 'chgStr')).toBe(false);	// この先はまだ実行されていない
});

it('addFrame_sty', ()=> {
	// 書かれた属性だけを持つ（[lay]と同じ流儀）。既定値の穴埋めはFrameMng側
	const a = acts('[add_frame id=f src=s visible=false x=10 y=20 width=400 height=200 alpha=0.5][s]')
		.find(v=> v.t === 'addFrame') as Extract<T_ENGINE_ACTION, {t: 'addFrame'}>;
	expect(a.sty).toEqual({visible: false, x: 10, y: 20, width: 400, height: 200, alpha: 0.5});
});

it('addFrame_bColorIsRawCss', ()=> {
	// b_colorは本家同様CSSの色をそのまま渡す（レイヤのb_colorが0xRRGGBBなのとは別物）
	const a = acts(`[add_frame id=f src=s b_color='#fff']` + '[s]')
		.find(v=> v.t === 'addFrame') as Extract<T_ENGINE_ACTION, {t: 'addFrame'}>;
	expect(a.sty).toEqual({b_color: '#fff'});
});

it('addFrame_idAndSrcRequired', ()=> {
	expect(()=> acts('[add_frame src=s][s]')).toThrow('[add_frame] idは必須です');
	expect(()=> acts('[add_frame id=f][s]')).toThrow('[add_frame] srcは必須です');
});

it('addFrame_duplicateThrows', ()=> {
	// 本家サンプル _yesno.sn は [return cond=const.sn.frm.yesno] で二重読込を避けている
	const se = loaded('[add_frame id=yesno src=_yesno][s]');
	expect(()=> se.step()).toThrow('[add_frame] frame【yesno】はすでにあります');
});

it('addFrame_notNumber', ()=> {
	expect(()=> acts('[add_frame id=f src=s width=もじ][s]')).toThrow('[add_frame] widthの値が不正です');
});


// ============ [frame] ============

it('frame_sty', ()=> {
	const a = loaded('[frame id=yesno visible=true alpha=0.8][s]').step().find(v=> v.t === 'frame');
	expect(a).toEqual({t: 'frame', id: 'yesno', sty: {visible: true, alpha: 0.8}});
});

it('frame_order', ()=> {
	// 判定順は本家と同じ float → index → dive。
	//	diveは「最背面へ」の意味しかない（指定idの下へ潜るのではなくz-indexを負にするだけ）
	expect(loaded('[frame id=yesno float=true][s]').step().find(v=> v.t === 'frame'))
		.toEqual({t: 'frame', id: 'yesno', sty: {}, order: {mode: 'float'}});
	expect(loaded('[frame id=yesno index=3][s]').step().find(v=> v.t === 'frame'))
		.toEqual({t: 'frame', id: 'yesno', sty: {}, order: {mode: 'index', index: 3}});
	expect(loaded('[frame id=yesno dive=x][s]').step().find(v=> v.t === 'frame'))
		.toEqual({t: 'frame', id: 'yesno', sty: {}, order: {mode: 'dive'}});
	expect(loaded('[frame id=yesno float=true index=3][s]').step().find(v=> v.t === 'frame'))
		.toEqual({t: 'frame', id: 'yesno', sty: {}, order: {mode: 'float'}});
});

it('frame_disabled', ()=> {
	expect(loaded('[frame id=yesno disabled=true][s]').step().find(v=> v.t === 'frame'))
		.toEqual({t: 'frame', id: 'yesno', sty: {}, disabled: true});
});

it('frame_notLoadedThrows', ()=> {
	expect(()=> acts('[frame id=yesno visible=true][s]'))
		.toThrow('[frame] frame【yesno】が読み込まれていません');
});

it('frame_doesNotStop', ()=> {
	expect(loaded('[frame id=yesno visible=true]あ[s]').step()
		.some(v=> v.t === 'chgStr' && v.str === 'あ')).toBe(true);
});


// ============ [set_frame] ============

it('setFrame_pushesAndRemembers', ()=> {
	const se = loaded('[set_frame id=yesno var_name=val_ui text=もじ][s]');
	expect(se.step().find(v=> v.t === 'setFrame'))
		.toEqual({t: 'setFrame', id: 'yesno', var_name: 'val_ui', text: 'もじ'});
	// 本家同様、組み込み変数にも同じ値を控える
	expect(se.getVal('const.sn.frm.yesno.val_ui')).toBe('もじ');
});

it('setFrame_required', ()=> {
	expect(()=> loaded('[set_frame var_name=v text=t][s]').step()).toThrow('[set_frame] idは必須です');
	expect(()=> loaded('[set_frame id=yesno text=t][s]').step()).toThrow('[set_frame] var_nameは必須です');
	expect(()=> loaded('[set_frame id=yesno var_name=v][s]').step()).toThrow('[set_frame] textは必須です');
});


// ============ [let_frame] ============

it('letFrame_pushesAndStops', ()=> {
	// 読み取った値を組み込み変数へ書き戻してから続けたいので一旦返る。
	//	アクションの適用はstep()が返った後なので、返さないと同じstep内では古い値のまま
	const a = loaded('[let_frame id=yesno var_name=val2ctrl function=true]あ[s]').step();
	expect(a.at(-1)).toEqual({t: 'letFrame', id: 'yesno', var_name: 'val2ctrl', fnc: true});
	expect(a.some(v=> v.t === 'chgStr')).toBe(false);
});

it('letFrame_functionDefaultsFalse', ()=> {
	expect(loaded('[let_frame id=yesno var_name=v][s]').step().at(-1))
		.toEqual({t: 'letFrame', id: 'yesno', var_name: 'v', fnc: false});
});

it('letFrame_notLoadedThrows', ()=> {
	expect(()=> acts('[let_frame id=yesno var_name=v][s]'))
		.toThrow('[let_frame] frame【yesno】が読み込まれていません');
});


// ============ [event key='dom=…'] ============

it('domEvent_pushesResv', ()=> {
	// **CSSセレクタは大小文字を区別する**ので、表の索引は小文字化しつつ元の文字列も渡す（本家 rawKeY）
	const a = acts(`[event key='dom=yesno:#Ok' label=*y global=true][s]`).find(v=> v.t === 'resvDomEvent');
	expect(a).toEqual({t: 'resvDomEvent', rawKey: 'dom=yesno:#Ok', key: 'dom=yesno:#ok', del: false, needErr: true});
});

it('domEvent_needErr', ()=> {
	const a = acts(`[event key='dom=f:#x' label=*y need_err=false][s]`).find(v=> v.t === 'resvDomEvent');
	expect(a).toMatchObject({needErr: false});
});

it('domEvent_del', ()=> {
	expect(acts(`[event key='dom=f:#x' del=true][s]`).find(v=> v.t === 'resvDomEvent'))
		.toEqual({t: 'resvDomEvent', rawKey: 'dom=f:#x', key: 'dom=f:#x', del: true, needErr: false});
});

it('domEvent_normalKeyPushesNothing', ()=> {
	expect(acts('[event key=enter label=*y][s]').some(v=> v.t === 'resvDomEvent')).toBe(false);
});

it('domEvent_isStillATableEntry', ()=> {
	// 予約表そのものは通常のキーと同じ扱い（発火はDOM側からfireEvent経由）
	const se = new ScriptEngine('t1', `[event key='dom=yesno:#ok' label=*y global=true][s]`);
	se.step();
	expect(se.getEvent('dom=yesno:#ok')).toMatchObject({label: '*y'});
});


// ============ その他 ============

it('frameTags_reservedAsMacroName', ()=> {
	expect(()=> acts('[macro name=set_frame][s]'))
		.toThrow('[set_frame]はタグ名のため、マクロ名として使用できません');
});
