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
		{t: 'stop', kind: 'l', key: 't1:3', nm: 'mes'},
	]);
	expect(se.atEnd).toBe(false);

	const a2 = se.step();
	expect(a2).toEqual([
		{t: 'chgStr', nm: 'mes', str: 'あいうえおかきくけこ'},	// [l]は文字を消さないため、行が積み上がる
		{t: 'stop', kind: 's', key: 't1:5', nm: 'mes'},
	]);
	expect(se.atEnd).toBe(true);
});

it('step_chgPic', ()=> {
	// stop.nmは「待ち中の文字レイヤ（#curTxtLayer）」であり、[add_lay]でgrpレイヤを追加しても
	// [current]しない限り既定値'mes'のまま変わらない仕様（ScriptEngine.ts:57, #curTxtLayer）。
	const se = new ScriptEngine('t1', '[add_lay layer=base class=GRP][lay layer=base pic=yun_1184][s]');
	const a = se.step();
	expect(a).toEqual([
		{t: 'addLay', cls: 'grp', nm: 'base'},
		{t: 'chgPic', nm: 'base', fn: 'yun_1184'},
		{t: 'stop', kind: 's', key: 't1:3', nm: 'mes'},
	]);
});

it('step_jumpLabel', ()=> {
	const se = new ScriptEngine('t1', '[jump label=*goal]むし[s]\n*goal\nあ[s]');
	const a = se.step();
	expect(a.at(-1)).toEqual({t: 'stop', kind: 's', key: 't1:8', nm: 'mes'});
	// jump先の「あ」だけが表示され、「むし」はスキップされる
	expect(a.some(v=> v.t === 'chgStr' && v.str.includes('むし'))).toBe(false);
	expect(a.some(v=> v.t === 'chgStr' && v.str === 'あ')).toBe(true);
});

it('step_unknownTagIgnored', ()=> {
	const se = new ScriptEngine('t1', '[playbgm buf=BGM fn=a]あ[s]');
	const a = se.step();
	expect(a).toEqual([
		{t: 'chgStr', nm: 'mes', str: 'あ'},
		{t: 'stop', kind: 's', key: 't1:3', nm: 'mes'},
	]);
});

it('step_comment_ignored', ()=> {
	const se = new ScriptEngine('t1', ';これはコメント\nあ[s]');
	const a = se.step();
	expect(a).toEqual([
		{t: 'chgStr', nm: 'mes', str: 'あ'},
		{t: 'stop', kind: 's', key: 't1:4', nm: 'mes'},
	]);
});

it('step_comment_ignored_leadingWhitespace', ()=> {
	// 行頭にタブ/空白が入っていてもコメントとして無視されること（本番のscriptの慣習に合わせる）
	const se = new ScriptEngine('t1', '\t; これはコメント\nあ[s]');
	const a = se.step();
	expect(a).toEqual([
		{t: 'chgStr', nm: 'mes', str: 'あ'},
		{t: 'stop', kind: 's', key: 't1:4', nm: 'mes'},
	]);
});

it('step_comment_ignoresEmbeddedTagOnSameLine', ()=> {
	// バグ修正: 「;」コメントはトークン単位ではなく行末までを丸ごと無視する必要がある。
	// コメント行中に[tag]が書かれていた場合、トークナイザは'['で別トークンに分割するため、
	// 旧実装（コメント判定されたトークンだけをcontinueでスキップ）では[button]部分が
	// 実行されてしまっていた。
	const se = new ScriptEngine('t1', ';これはコメント[button layer=btn1 text=x label=*goal]\nあ[s]');
	const a = se.step();
	expect(a).toEqual([
		{t: 'chgStr', nm: 'mes', str: 'あ'},
		{t: 'stop', kind: 's', key: 't1:5', nm: 'mes'},
	]);
	// addBtnアクションが積まれていない（＝[button]タグがコメントとして無視された）ことを確認
	expect(a.some(v=> v.t === 'addBtn')).toBe(false);
});

it('step_p_clearsOnResume', ()=> {
	// [p]で停止した直後の次のstep()開始時に、現在レイヤがクリアされてから続く（改ページ挙動）
	const se = new ScriptEngine('t1', '[add_lay layer=mes class=TXT]あいうえお[p]かきくけこ[s]');
	const a1 = se.step();
	expect(a1).toEqual([
		{t: 'addLay', cls: 'txt', nm: 'mes'},
		{t: 'chgStr', nm: 'mes', str: 'あいうえお'},
		{t: 'stop', kind: 'p', key: 't1:3', nm: 'mes'},
	]);

	const a2 = se.step();
	expect(a2).toEqual([
		{t: 'chgStr', nm: 'mes', str: ''},			// [p]の次の進行でまずクリアされる
		{t: 'chgStr', nm: 'mes', str: 'かきくけこ'},
		{t: 'stop', kind: 's', key: 't1:5', nm: 'mes'},
	]);
});

it('step_button_addsBtnAction', ()=> {
	// [button] は addBtn アクションを積むだけで、停止点にはならない（[s]まで続く）。
	// 文字レイヤをUIコンテナとする設計：
	// layer=ボタンを乗せる既存の文字レイヤのnm、nm=ボタン自身の識別名（同一layer内で一意）。
	const se = new ScriptEngine('t1', '[button layer=mes nm=btn1 text=つづき label=*goal]あ[s]\n*goal\ni[s]');
	const a = se.step();
	expect(a).toEqual([
		{t: 'addBtn', layerNm: 'mes', nm: 'btn1', text: 'つづき', label: '*goal'},
		{t: 'chgStr', nm: 'mes', str: 'あ'},
		{t: 'stop', kind: 's', key: 't1:3', nm: 'mes'},
	]);
});

it('step_button_layerDefaultsToCurrentTxtLayer', ()=> {
	// layerを省略すると現在の文字レイヤ（#curTxtLayer、既定'mes'）が乗せ先になる。
	// nmも省略した場合はlabelを流用する（試作の割り切り）。
	const se = new ScriptEngine('t1', '[button text=x label=*goal]あ[s]');
	const a = se.step();
	expect(a[0]).toEqual({t: 'addBtn', layerNm: 'mes', nm: '*goal', text: 'x', label: '*goal'});
});

it('step_button_requiresLabel', ()=> {
	// layerは省略可能（現在の文字レイヤにフォールバック）だが、labelは必須
	expect(()=> new ScriptEngine('t1', '[button layer=mes text=x]あ[s]').step()).toThrow();
});

it('jumpToLabel_movesIdxToLabel', ()=> {
	// [button]クリック時に呼ばれる想定のAPI：ラベルへ直接ジャンプしてからstep()を呼ぶと、
	// そのラベル以降が実行される（jumpタグと同じ移動先計算を使う）。
	// jumpToLabel()は#hTxtをクリアしないため（ScriptEngine.ts jumpToLabel実装参照）、
	// [s]前の'あ'が既に#hTxt['mes']に入っている状態に'い'が積み上がり'あい'になる。
	const se = new ScriptEngine('t1', 'あ[s]\n*goal\nい[s]');
	se.step();	// 最初の[s]まで進める（読み進めの体で消費）

	se.jumpToLabel('*goal');
	const a = se.step();
	expect(a).toEqual([
		{t: 'chgStr', nm: 'mes', str: 'あい'},
		{t: 'stop', kind: 's', key: 't1:7', nm: 'mes'},
	]);
});

it('jumpToLabel_unknownLabelThrows', ()=> {
	const se = new ScriptEngine('t1', 'あ[s]');
	expect(()=> se.jumpToLabel('*nothing')).toThrow();
});
