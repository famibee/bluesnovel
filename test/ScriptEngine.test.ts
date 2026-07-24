/* ***** BEGIN LICENSE BLOCK *****
Copyright (c) 2024-2026 Famibee (famibee.blog38.fc2.com)

This software is released under the MIT License.
http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import {ScriptEngine} from '../src/ts/ScriptEngine';

import {expect, it} from 'bun:test';


// 字句解析は本家Grammar（src/sn/Grammar.ts）へ委譲済み。網羅的な検証はtest/Grammar.test.tsにあるので、
//	ここでは「Grammarを使うことで初めて通るようになった書き方」だけを確認する
it('grammar_multilineTag', ()=> {	// タグを複数行に分けて書ける
	const se = new ScriptEngine('t1', '[add_lay\n\tlayer=mes\n\tclass=txt\n]あ[s]');
	expect(se.step()).toEqual([
		{t: 'addLay', cls: 'txt', nm: 'mes'},
		{t: 'chgStr', nm: 'mes', page: 'fore', str: 'あ'},
		{t: 'stop', kind: 's', key: 't1:3', nm: 'mes'},
	]);
});
it('grammar_tagInStringLiteral', ()=> {	// 属性値の文字列リテラル中の「]」でタグが切れない
	const se = new ScriptEngine('t1', '[trace text="a]b"][s]');
	expect(se.step()[0]).toEqual({t: 'trace', text: 'a]b'});
});
it('grammar_commentInMultilineTag', ()=> {	// タグ内に「;」コメントを書ける
	const se = new ScriptEngine('t1', '[add_lay\t;これはコメント\n\tlayer=mes\t;これも\nclass=txt\n]あ[s]');
	expect(se.step()).toEqual([
		{t: 'addLay', cls: 'txt', nm: 'mes'},
		{t: 'chgStr', nm: 'mes', page: 'fore', str: 'あ'},
		{t: 'stop', kind: 's', key: 't1:3', nm: 'mes'},
	]);
});
it('grammar_leadingTabIsNotText', ()=> {	// 行頭のタブは独立トークンになり、地の文には含まれない
	const se = new ScriptEngine('t1', '\tあ\n\tい[s]');
	expect(se.step()).toEqual([
		{t: 'chgStr', nm: 'mes', page: 'fore', str: 'あ'},
		{t: 'chgStr', nm: 'mes', page: 'fore', str: 'あい'},
		{t: 'stop', kind: 's', key: 't1:6', nm: 'mes'},
	]);
});

it('parseTag_basic', ()=> {
	expect(ScriptEngine.parseTag('[lay layer=base pic=yun_1184]'))
		.toEqual({name: 'lay', args: {layer: 'base', pic: 'yun_1184'}});
});
it('parseTag_quoted', ()=> {
	expect(ScriptEngine.parseTag(`[add_lay layer="my layer" class='GRP']`))
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
		{t: 'chgStr', nm: 'mes', page: 'fore', str: 'あいうえお'},
		{t: 'stop', kind: 'l', key: 't1:3', nm: 'mes'},
	]);
	expect(se.atEnd).toBe(false);

	const a2 = se.step();
	expect(a2).toEqual([
		{t: 'chgStr', nm: 'mes', page: 'fore', str: 'あいうえおかきくけこ'},	// [l]は文字を消さないため、行が積み上がる
		{t: 'stop', kind: 's', key: 't1:5', nm: 'mes'},
	]);
	expect(se.atEnd).toBe(true);
});

it('step_chgPic', ()=> {
	// stop.nmは「待ち中の文字レイヤ（#curTxtLayer）」であり、[add_lay]でgrpレイヤを追加しても
	// [current]しない限り既定値'mes'のまま変わらない仕様（ScriptEngine.ts:57, #curTxtLayer）。
	// face未指定時はaFaceは空配列になる。
	const se = new ScriptEngine('t1', '[add_lay layer=base class=GRP][lay layer=base pic=yun_1184][s]');
	const a = se.step();
	expect(a).toEqual([
		{t: 'addLay', cls: 'grp', nm: 'base'},
		{t: 'chgPic', nm: 'base', page: 'fore', fn: 'yun_1184', aFace: []},
		{t: 'stop', kind: 's', key: 't1:3', nm: 'mes'},
	]);
});

it('step_addFace_definesFace', ()=> {
	// [add_face]は表示変化を伴わない（アクションを積まない）。dx/dyは数値に変換され、blendmode未指定時は'normal'
	const se = new ScriptEngine('t1', '[add_face name=minoura_me_futsu dx=171 dy=159]あ[s]');
	const a = se.step();
	expect(a).toEqual([
		{t: 'chgStr', nm: 'mes', page: 'fore', str: 'あ'},
		{t: 'stop', kind: 's', key: 't1:3', nm: 'mes'},
	]);
});

it('step_addFace_duplicateNameThrows', ()=> {
	expect(()=> new ScriptEngine('t1', '[add_face name=a dx=1 dy=1][add_face name=a dx=2 dy=2][s]').step()).toThrow();
});

it('step_lay_faceComposesMultipleImages', ()=> {
	// [lay fn=... face=A,B,C] で、[add_face]済みの差分絵を重ねてchgPicアクションが積まれる。
	// 重なり順はface=の記述順（配列の並び順＝後の要素ほど上に重なる、本家 csvFn = fn+','+face と同じ）
	const sn = [
		'[add_lay layer=0 class=grp]',
		'[add_face name=minoura_kuchi_futsu dx=200 dy=239 blendmode=multiply]',
		'[add_face name=minoura_me_futsu dx=171 dy=159]',
		'[add_face name=minoura_mayu_futsu dx=167 dy=146 blendmode=multiply]',
		'[lay layer=0 fn=minoura_wasou face=minoura_kuchi_futsu,minoura_me_futsu,minoura_mayu_futsu]',
		'[s]',
	].join('');
	const se = new ScriptEngine('t1', sn);
	const a = se.step();
	expect(a).toEqual([
		{t: 'addLay', cls: 'grp', nm: '0'},
		{t: 'chgPic', nm: '0', page: 'fore', fn: 'minoura_wasou', aFace: [
			{fn: 'minoura_kuchi_futsu', dx: 200, dy: 239, blendmode: 'multiply'},
			{fn: 'minoura_me_futsu', dx: 171, dy: 159, blendmode: 'normal'},
			{fn: 'minoura_mayu_futsu', dx: 167, dy: 146, blendmode: 'multiply'},
		]},
		{t: 'stop', kind: 's', key: 't1:6', nm: 'mes'},
	]);
});

it('step_lay_faceWithFnOmitted_usesNameAsFn', ()=> {
	// [add_face]でfn省略時はnameをファイル名として使う（本家 SpritesMng.add_face()と同様）
	const se = new ScriptEngine('t1', '[add_lay layer=0 class=grp][add_face name=minoura_me_futsu dx=1 dy=2][lay layer=0 fn=base face=minoura_me_futsu][s]');
	const a = se.step();
	expect(a).toEqual([
		{t: 'addLay', cls: 'grp', nm: '0'},
		{t: 'chgPic', nm: '0', page: 'fore', fn: 'base', aFace: [
			{fn: 'minoura_me_futsu', dx: 1, dy: 2, blendmode: 'normal'},
		]},
		{t: 'stop', kind: 's', key: 't1:4', nm: 'mes'},
	]);
});

it('step_lay_faceUndefinedNameThrows', ()=> {
	expect(()=> new ScriptEngine('t1', '[lay fn=base face=nothing][s]').step()).toThrow();
});

it('step_lay_bAlpha', ()=> {
	// [lay layer=mes b_alpha=0.8] で文字レイヤ背景の不透明度を指定できる。pic/fnとは無関係に単独でもchgBAlphaアクションが積まれる
	const se = new ScriptEngine('t1', '[lay layer=mes b_alpha=0.8][s]');
	const a = se.step();
	expect(a).toEqual([
		{t: 'chgBAlpha', nm: 'mes', page: 'fore', b_alpha: 0.8},
		{t: 'stop', kind: 's', key: 't1:2', nm: 'mes'},
	]);
});

it('step_lay_bAlpha_withPic_bothActionsPushed', ()=> {
	// pic（またはfn）とb_alphaを同一[lay]タグ内で併用した場合、両方のアクションが記述順で積まれる
	const se = new ScriptEngine('t1', '[add_lay layer=base class=grp][lay layer=base pic=yun_1184 b_alpha=0.5][s]');
	const a = se.step();
	expect(a).toEqual([
		{t: 'addLay', cls: 'grp', nm: 'base'},
		{t: 'chgPic', nm: 'base', page: 'fore', fn: 'yun_1184', aFace: []},
		{t: 'chgBAlpha', nm: 'base', page: 'fore', b_alpha: 0.5},
		{t: 'stop', kind: 's', key: 't1:3', nm: 'mes'},
	]);
});

it('step_lay_bAlpha_invalidValueThrows', ()=> {
	expect(()=> new ScriptEngine('t1', '[lay layer=mes b_alpha=abc][s]').step()).toThrow();
});

// b_alphaの値域（0.0〜1.0）。範囲外は例外にせずクランプする。
//	本家（TxtLayer.ts:387 argChk_Num）はクランプせず素通しし、CSSのrgba()が描画時に丸めるだけなので、
//	ストア（Memento・デザインモードが読む状態）に範囲外の値が残ってしまう。それを防ぐための正規化。
//	例外にしないのは、本家が通すスクリプトをbluesnovelだけが弾かないようにするため
function bAlphaOf(src: string): number {
	const a = new ScriptEngine('t1', src).step();
	const act = a.find(v=> v.t === 'chgBAlpha');
	if (act?.t !== 'chgBAlpha') throw 'chgBAlphaアクションがありません';
	return act.b_alpha;
}

it('step_lay_bAlpha_clampsOverOne', ()=> {
	expect(bAlphaOf('[lay layer=mes b_alpha=1.5][s]')).toBe(1);
	expect(bAlphaOf('[lay layer=mes b_alpha=40][s]')).toBe(1);	// 0.4のつもりの打ち間違い等
});

it('step_lay_bAlpha_clampsBelowZero', ()=> {
	expect(bAlphaOf('[lay layer=mes b_alpha=-0.5][s]')).toBe(0);
});

it('step_lay_bAlpha_keepsInRangeValues', ()=> {	// 範囲内はそのまま（境界含む）
	expect(bAlphaOf('[lay layer=mes b_alpha=0][s]')).toBe(0);
	expect(bAlphaOf('[lay layer=mes b_alpha=1][s]')).toBe(1);
	expect(bAlphaOf('[lay layer=mes b_alpha=0.4][s]')).toBe(0.4);
});

it('step_lay_bAlpha_clampsInfinity', ()=> {
	// Number('Infinity')はNaNではないので上のNaN判定を素通りする。クランプ側で受け止める
	expect(bAlphaOf('[lay layer=mes b_alpha=Infinity][s]')).toBe(1);
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
		{t: 'chgStr', nm: 'mes', page: 'fore', str: 'あ'},
		{t: 'stop', kind: 's', key: 't1:3', nm: 'mes'},
	]);
});

it('step_trace_emitsTraceAction', ()=> {
	// [trace text=@] は表示に影響を与えず、traceアクションを積むだけ（実処理はScriptMng.ts #trace()側）
	const se = new ScriptEngine('t1', '[trace text=@]あ[s]');
	const a = se.step();
	expect(a).toEqual([
		{t: 'trace', text: '@'},
		{t: 'chgStr', nm: 'mes', page: 'fore', str: 'あ'},
		{t: 'stop', kind: 's', key: 't1:3', nm: 'mes'},
	]);
});
it('step_trace_missingText_emitsEmptyString', ()=> {
	// text省略時は空文字を積む（ScriptMng側の#trace()で「(text is )」的なフォールバック表示になる）
	const se = new ScriptEngine('t1', '[trace]あ[s]');
	expect(se.step()[0]).toEqual({t: 'trace', text: ''});
});

it('step_trace_ampPrefix_evaluatesExprAndStringifies', ()=> {
	// textが'&'で始まる場合は式として評価する（mp:などの変数値を[trace]で確認できるようにするための動作確認用対応）
	// val属性は常に式として評価されるため、文字列リテラルを渡すにはタグ属性の引用符とは別に式側の引用符も必要（let_stringValueと同じ規約）
	const se = new ScriptEngine('t1', `[let name=mp:t val='"YO"'][trace text=&mp:t][s]`);
	expect(se.step()[0]).toEqual({t: 'trace', text: 'YO'});
});
it('step_trace_ampPrefix_numberIsStringified', ()=> {
	const se = new ScriptEngine('t1', '[let name=mp:n val=1+2][trace text=&mp:n][s]');
	expect(se.step()[0]).toEqual({t: 'trace', text: '3'});
});
it('step_trace_ampPrefix_undefinedVar_dropsAttr', ()=> {
	// 未定義変数を参照した属性は「渡されなかった」ことになる（本家 タグ解析() の
	// 「存在しない値の場合、属性を渡さない」規約。省略値『|…』があればそちらが使われる）。
	// よってtextは未指定扱いとなり、[trace]側の既定＝空文字になる
	const se = new ScriptEngine('t1', '[trace text=&mp:undef][s]');
	expect(se.step()[0]).toEqual({t: 'trace', text: ''});
});
it('step_trace_ampPrefix_undefinedVar_fallsBackToDef', ()=> {
	// 上と同じ状況で省略値を書いておくと、そちらが採用される
	const se = new ScriptEngine('t1', '[trace text=&mp:undef|"なし"][s]');
	expect(se.step()[0]).toEqual({t: 'trace', text: 'なし'});
});
it('step_trace_withoutAmp_isLiteral', ()=> {
	// '&'がなければ今まで通りリテラル文字列のまま（式評価しない）
	const se = new ScriptEngine('t1', '[trace text=mp:t][s]');
	expect(se.step()[0]).toEqual({t: 'trace', text: 'mp:t'});
});

// ============ 「&」書式（Grammarが独立トークンとして切り出すようになったので対応した） ============

it('amp_let', ()=> {	// ＆代入：&名前 = 式
	const se = new ScriptEngine('t1', '&game:hp = 10 + 5\n[s]');
	se.step();
	expect(se.getVal('game:hp')).toBe(15);
});
it('amp_let_nameIsAlsoExpression', ()=> {	// 「&&」なら変数名の側も式として評価される
	const se = new ScriptEngine('t1', "&&'game:'+'hp' = 7\n[s]");
	se.step();
	expect(se.getVal('game:hp')).toBe(7);
});
it('amp_show', ()=> {	// ＆表示＆：式の評価結果を地の文として表示
	const se = new ScriptEngine('t1', '[let name=game:hp val=80]&game:hp&[s]');
	expect(se.step()).toEqual([
		{t: 'chgStr', nm: 'mes', page: 'fore', str: '80'},
		{t: 'stop', kind: 's', key: 't1:3', nm: 'mes'},
	]);
});
it('amp_show_afterPlainTextIsNotSpecial', ()=> {
	// 本家と同じ制約：地の文の途中に書いた「&〜&」は独立トークンにならないため、そのまま表示される
	//	（＆表示＆として効くのは、行頭やタグ直後など「&」でトークンが始まる位置のみ）
	const se = new ScriptEngine('t1', '[let name=game:hp val=80]HP=&game:hp&[s]');
	expect(se.step()[0]).toEqual({t: 'chgStr', nm: 'mes', page: 'fore', str: 'HP=&game:hp&'});
});
it('amp_show_undefinedVarIsEmpty', ()=> {
	const se = new ScriptEngine('t1', '&未定義変数&[s]');
	expect(se.step()).toEqual([
		{t: 'chgStr', nm: 'mes', page: 'fore', str: ''},
		{t: 'stop', kind: 's', key: 't1:2', nm: 'mes'},
	]);
});

it('step_comment_ignored', ()=> {
	const se = new ScriptEngine('t1', ';これはコメント\nあ[s]');
	const a = se.step();
	expect(a).toEqual([
		{t: 'chgStr', nm: 'mes', page: 'fore', str: 'あ'},
		{t: 'stop', kind: 's', key: 't1:4', nm: 'mes'},
	]);
});

it('step_comment_ignored_leadingWhitespace', ()=> {
	// 行頭にタブ/空白が入っていてもコメントとして無視されること（本番のscriptの慣習に合わせる）
	const se = new ScriptEngine('t1', '\t; これはコメント\nあ[s]');
	const a = se.step();
	expect(a).toEqual([
		{t: 'chgStr', nm: 'mes', page: 'fore', str: 'あ'},
		{t: 'stop', kind: 's', key: 't1:5', nm: 'mes'},	// 行頭タブが独立トークンになる分、旧実装より1つ後ろ
	]);
});

it('step_comment_ignoresEmbeddedTagOnSameLine', ()=> {
	// 「;」コメントは行末までで1トークン（Grammarの字句解析がそう切る）。
	// 旧実装は'['で別トークンに割れてしまい、コメント行中の[button]が実行されていた
	const se = new ScriptEngine('t1', ';これはコメント[button layer=btn1 text=x label=*goal]\nあ[s]');
	const a = se.step();
	expect(a).toEqual([
		{t: 'chgStr', nm: 'mes', page: 'fore', str: 'あ'},
		{t: 'stop', kind: 's', key: 't1:4', nm: 'mes'},
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
		{t: 'chgStr', nm: 'mes', page: 'fore', str: 'あいうえお'},
		{t: 'stop', kind: 'p', key: 't1:3', nm: 'mes'},
	]);

	const a2 = se.step();
	expect(a2).toEqual([
		{t: 'chgStr', nm: 'mes', page: 'fore', str: ''},			// [p]の次の進行でまずクリアされる
		{t: 'chgStr', nm: 'mes', page: 'fore', str: 'かきくけこ'},
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
		{t: 'addBtn', layerNm: 'mes', page: 'back', nm: 'btn1', text: 'つづき', label: '*goal', call: false},
		{t: 'chgStr', nm: 'mes', page: 'fore', str: 'あ'},
		{t: 'stop', kind: 's', key: 't1:3', nm: 'mes'},
	]);
});

it('step_button_layerDefaultsToCurrentTxtLayer', ()=> {
	// layerを省略すると現在の文字レイヤ（#curTxtLayer、既定'mes'）が乗せ先になる。
	// nmも省略した場合はlabelを流用する（試作の割り切り）。
	const se = new ScriptEngine('t1', '[button text=x label=*goal]あ[s]');
	const a = se.step();
	expect(a[0]).toEqual({t: 'addBtn', layerNm: 'mes', page: 'back', nm: '*goal', text: 'x', label: '*goal', call: false});
});

it('step_button_requiresLabelOrFn', ()=> {
	// layerは省略可能（現在の文字レイヤにフォールバック）だが、labelかfnのどちらかは必須
	expect(()=> new ScriptEngine('t1', '[button layer=mes text=x]あ[s]').step()).toThrow();
});

it('step_button_fn_isPassedThrough', ()=> {
	// [button fn=…] は別スクリプトへ飛ぶボタン。エンジンはfnをアクションに載せるだけで、
	// 実際のロードと切替はクリック時にScriptMng側が行う
	const se = new ScriptEngine('t1', '[button text=x fn=other label=*goal]あ[s]');
	expect(se.step()[0]).toEqual(
		{t: 'addBtn', layerNm: 'mes', page: 'back', nm: '*goal', text: 'x', label: '*goal', call: false, fn: 'other'});
});
it('step_button_fnOnly_nmFallsBackToFn', ()=> {
	// label省略時はそのファイルの先頭へ。nm省略時はlabelが無いのでfnを流用する
	const se = new ScriptEngine('t1', '[button text=x fn=other]あ[s]');
	expect(se.step()[0]).toEqual(
		{t: 'addBtn', layerNm: 'mes', page: 'back', nm: 'other', text: 'x', label: '', call: false, fn: 'other'});
});

it('step_button_callTrue_setsCallFlag', ()=> {
	// [button call=true] は addBtn アクションのcallフラグをtrueにする
	// （ScriptMng.ts/jumpToLabelAndGo 経由で callToLabel() が呼ばれる）
	const se = new ScriptEngine('t1', '[button layer=mes nm=btn1 text=つづき label=*goal call=true]あ[s]\n*goal\ni[s]');
	const a = se.step();
	expect(a).toEqual([
		{t: 'addBtn', layerNm: 'mes', page: 'back', nm: 'btn1', text: 'つづき', label: '*goal', call: true},
		{t: 'chgStr', nm: 'mes', page: 'fore', str: 'あ'},
		{t: 'stop', kind: 's', key: 't1:3', nm: 'mes'},
	]);
});

it('callToLabel_movesIdxToLabel', ()=> {
	// [button call=true]クリック時に呼ばれる想定のAPI：ラベルへサブルーチンコールする。
	// callToLabel()は[l]/[s]の「停止点で待っている間」に呼ばれるため、そのときの#idxは
	// 「停止点の次のトークン」を指している。[return]の戻り先は停止点の"次"ではなく
	// 「停止点そのもの」にして、戻った直後に[l]/[s]を再実行しイベント待ちへ戻す
	// （本家skynovelと同じ挙動。停止点の次へ戻すと、[l]待ちだったはずが勝手に読み進んでしまう）。
	// #aCallStk＋ifスタックの壁(-1)を積む点は[call]タグと同じ。
	// jumpToLabel()は#hTxtをクリアしないため、[s]前の'あ'が#hTxt['mes']に残り、
	// サブルーチン内の'い'が積み上がり'あい'になる。[return]後はコール元の[s](t1:2)へ戻って
	// 再び停止するので、次の'こんにちは'へは進まない。
	const se = new ScriptEngine('t1', 'あ[s]\nこんにちは[s]\n*goal\nい[return]');
	se.step();	// 最初の[s]まで進める（読み進めの体で消費）

	se.callToLabel('*goal');
	const a = se.step();
	expect(a).toEqual([
		{t: 'chgStr', nm: 'mes', page: 'fore', str: 'あい'},
		{t: 'stop', kind: 's', key: 't1:2', nm: 'mes'},
	]);
});

it('callToLabel_returnsToWaitingStop_notNext', ()=> {
	// 回帰テスト：[l]でイベント待ち中に[button call=true]でサブルーチンへ飛び、[return]で
	// 戻ったとき、コール元の[l]を再実行して「イベント待ちに戻る」こと（勝手に次へ読み進まない）。
	// 本家skynovelと同じ挙動。ScriptEngine.ts callToLabel()の returnIdx: --this.#idx がこれを保証する。
	const se = new ScriptEngine('t1', 'あ[l]\n*goal\nい[return]');
	se.step();	// 最初の[l]まで進める（'あ'表示→t1:2で停止）

	se.callToLabel('*goal');
	const a = se.step();
	expect(a).toEqual([
		{t: 'chgStr', nm: 'mes', page: 'fore', str: 'あい'},
		{t: 'stop', kind: 'l', key: 't1:2', nm: 'mes'},	// 次(こんにちは相当)へ進まず、同じ[l]待ちへ戻る
	]);
});

it('callToLabel_unknownLabelThrows', ()=> {
	const se = new ScriptEngine('t1', 'あ[s]');
	expect(()=> se.callToLabel('*nothing')).toThrow();
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
		{t: 'chgStr', nm: 'mes', page: 'fore', str: 'あい'},
		{t: 'stop', kind: 's', key: 't1:7', nm: 'mes'},
	]);
});

it('jumpToLabel_unknownLabelThrows', ()=> {
	const se = new ScriptEngine('t1', 'あ[s]');
	expect(()=> se.jumpToLabel('*nothing')).toThrow();
});


// ============ 変数代入（[let]）・組み込み変数 ============

it('let_simpleAssign_noAction', ()=> {
	// [let]はT_ENGINE_ACTIONを何も積まない（画面表示には関与しない内部状態のみの変更）
	const se = new ScriptEngine('t1', '[let name=game:hp val=100][s]');
	const a = se.step();
	expect(a).toEqual([
		{t: 'stop', kind: 's', key: 't1:2', nm: 'mes'},
	]);
	expect(se.getVal('game:hp')).toBe(100);
});

it('let_defaultNamespaceIsTmp', ()=> {
	// nameに名前空間を付けない場合、本家準拠でtmp:扱い（VarStore.ts:33参照）
	const se = new ScriptEngine('t1', '[let name=foo val=1][s]');
	se.step();
	expect(se.getVal('foo')).toBe(1);
	expect(se.getVal('tmp:foo')).toBe(1);
	expect(se.getVal('game:foo')).toBeUndefined();	// 名前空間が違うので別変数
});

it('let_expressionReferencesPreviousValue', ()=> {
	// val属性は式として評価されるため、自分自身を参照して更新できる
	const se = new ScriptEngine('t1', '[let name=game:hp val=100][let name=game:hp val="game:hp-30"][s]');
	se.step();
	expect(se.getVal('game:hp')).toBe(70);
});

it('let_stringValue', ()=> {
	// val属性は常に式として評価される（ifのexp属性と同じ規約）。
	// そのため文字列リテラルを渡す場合は、タグ属性の引用符とは別に
	// 式側の引用符も必要（ここでは属性を'で囲み、式側は"で囲む）。
	// 引用符の二重化を不要にする構文糖（&付与方式等）の導入はTODO（ExprEval.tsコメント参照）
	const se = new ScriptEngine('t1', `[let name=game:name val='"ゆかり"'][s]`);
	se.step();
	expect(se.getVal('game:name')).toBe('ゆかり');
});

it('let_requiresName', ()=> {
	expect(()=> new ScriptEngine('t1', '[let val=1][s]').step()).toThrow();
});

it('let_invalidExpressionThrows', ()=> {
	expect(()=> new ScriptEngine('t1', '[let name=foo val="1+"][s]').step()).toThrow();
});

// ============ cast指定（[let]・「&計算」書式） ============

it('let_cast_num', ()=> {
	const se = new ScriptEngine('t1', `[let name=a val='"3.5"' cast=num][s]`);
	se.step();
	expect(se.getVal('a')).toBe(3.5);
});
it('let_cast_int', ()=> {
	const se = new ScriptEngine('t1', '[let name=a val=3.9 cast=int][s]');
	se.step();
	expect(se.getVal('a')).toBe(3);
});
it('let_cast_uint', ()=> {	// 本家uint()は負数の符号を反転する（絶対値）
	const se = new ScriptEngine('t1', '[let name=a val=-3.9 cast=uint][s]');
	se.step();
	expect(se.getVal('a')).toBe(3);
});
it('let_cast_num_hex', ()=> {	// 本家argChk_Num()同様、0x始まりは16進として読む
	const se = new ScriptEngine('t1', `[let name=a val='"0xff"' cast=num][s]`);
	se.step();
	expect(se.getVal('a')).toBe(255);
});
it('let_cast_bool', ()=> {
	// 本家argChk_Boolean()準拠：文字列'false'と空文字は偽、'0'は真
	const se = new ScriptEngine('t1',
		`[let name=a val='"false"' cast=bool][let name=b val='"0"' cast=bool][let name=c val='""' cast=bool][s]`);
	se.step();
	expect(se.getVal('a')).toBe(false);
	expect(se.getVal('b')).toBe(true);
	expect(se.getVal('c')).toBe(false);
});
it('let_cast_str_suppressesAutoCast', ()=> {
	// cast=strは「読み出し時の自動キャストもしない」指定。'0123'が数値123にならない
	const se = new ScriptEngine('t1', `[let name=a val='"0123"' cast=str][let name=b val='"0123"'][s]`);
	se.step();
	expect(se.getVal('a')).toBe('0123');
	expect(se.getVal('b')).toBe(123);	// cast無しは読み出し時に数値へ自動キャスト
});
it('let_cast_str_isClearedByPlainAssign', ()=> {
	const se = new ScriptEngine('t1',
		`[let name=a val='"0123"' cast=str][let name=a val='"0123"'][s]`);
	se.step();
	expect(se.getVal('a')).toBe(123);
});
it('let_cast_unknownThrows', ()=> {
	expect(()=> new ScriptEngine('t1', '[let name=a val=1 cast=もじ][s]').step()).toThrow();
});
it('let_cast_num_notNumericThrows', ()=> {
	expect(()=> new ScriptEngine('t1', `[let name=a val='"もじ"' cast=num][s]`).step()).toThrow();
});

it('amp_let_cast', ()=> {	// 「&名前 = 式 = キャスト」書式
	const se = new ScriptEngine('t1', '&game:hp = 10 / 4 = int\n[s]');
	se.step();
	expect(se.getVal('game:hp')).toBe(2);
});
it('amp_let_cast_str', ()=> {
	const se = new ScriptEngine('t1', `&game:s = '0123' = str\n[s]`);
	se.step();
	expect(se.getVal('game:s')).toBe('0123');
});


// ============ [let_ml]〜[endlet_ml]（インラインテキスト代入） ============

it('let_ml_basic', ()=> {
	// 本文は式評価も改行の解釈もせず、そのままの文字列として変数へ入る
	const se = new ScriptEngine('t1', '[let_ml name=ml]\nabc\ndef\n[endlet_ml][s]');
	const a = se.step();
	expect(se.getVal('ml')).toBe('\nabc\ndef\n');
	expect(a.filter(v=> v.t === 'chgStr')).toEqual([]);	// 本文は画面表示されない
});

it('let_ml_json', ()=> {	// 主用途：JSONを埋め込み、VarStoreのJSON探索で下位階層を引く
	const se = new ScriptEngine('t1',
		'[let_ml name=const.db]\n{"紀子": {"fn": "nori", "col": "lightskyblue"}}\n[endlet_ml][s]');
	se.step();
	expect(se.getVal('const.db.紀子.fn')).toBe('nori');
	expect(se.getVal('const.db.紀子.col')).toBe('lightskyblue');
});

it('let_ml_keepsBracketsAndSemicolons', ()=> {
	// 本文中の「[」「]」「;」はタグにもコメントにもならない（Grammarが本文まるごと1トークンにする）
	const se = new ScriptEngine('t1',
		'[let_ml name=ml]\nvoid main(void) {\n\tgl_FragColor = v[0];\t; これもただの本文\n}\n[endlet_ml][s]');
	se.step();
	expect(se.getVal('ml')).toBe('\nvoid main(void) {\n\tgl_FragColor = v[0];\t; これもただの本文\n}\n');
});

it('let_ml_keepsNumericBodyAsString', ()=> {
	// 本家同様cast=str扱いなので、数値だけの本文でも文字列のまま
	const se = new ScriptEngine('t1', '[let_ml name=ml]0123[endlet_ml][s]');
	se.step();
	expect(se.getVal('ml')).toBe('0123');
});

it('let_ml_emptyBody', ()=> {
	const se = new ScriptEngine('t1', '[let_ml name=ml][endlet_ml]あ[s]');
	const a = se.step();
	expect(se.getVal('ml')).toBe('');
	expect(a[0]).toEqual({t: 'chgStr', nm: 'mes', page: 'fore', str: 'あ'});	// [endlet_ml]の次から続行できている
});

it('let_ml_insideIf', ()=> {
	const se = new ScriptEngine('t1', '[if exp=true][let_ml name=ml]\nX\n[endlet_ml][endif][s]');
	se.step();
	expect(se.getVal('ml')).toBe('\nX\n');
});

it('let_ml_labelInBodyIsNotALabel', ()=> {
	// 本文中の「*〜」をラベルとして拾ってしまわないこと。
	//	本文トークンの先頭が「*」になる書き方（[let_ml …]直後に*を置く）でないと再現しない
	const se = new ScriptEngine('t1', '[let_ml name=ml]*inner\n[endlet_ml][jump label=*inner][s]');
	expect(()=> se.step()).toThrow();
	expect(se.getVal('ml')).toBe('*inner\n');
});

it('let_ml_requiresName', ()=> {
	expect(()=> new ScriptEngine('t1', '[let_ml]\nX\n[endlet_ml][s]').step()).toThrow();
});

it('let_ml_requiresEndTag', ()=> {
	expect(()=> new ScriptEngine('t1', '[let_ml name=ml]\nX\n[s]').step()).toThrow();
});

it('let_ml_cannotBeUsedAsMacroName', ()=> {
	expect(()=> new ScriptEngine('t1', '[macro name=let_ml][endmacro][s]').step()).toThrow();
	expect(()=> new ScriptEngine('t1', '[macro name=endlet_ml][endmacro][s]').step()).toThrow();
});

it('builtinVar_scriptFn', ()=> {
	// 組み込み変数の例：tmp:const.sn.scriptFnは常に現在のScriptEngineのfnを返す（遅延評価）
	const se = new ScriptEngine('myFile', '[s]');
	expect(se.getVal('const.sn.scriptFn')).toBe('myFile');
	expect(se.getVal('tmp:const.sn.scriptFn')).toBe('myFile');
});

it('builtinVar_cannotBeOverwritten', ()=> {
	expect(()=> new ScriptEngine('t1', '[let name=const.sn.scriptFn val=1][s]').step()).toThrow();
});
