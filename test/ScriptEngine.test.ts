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
	// face未指定時はaFaceは空配列になる。
	const se = new ScriptEngine('t1', '[add_lay layer=base class=GRP][lay layer=base pic=yun_1184][s]');
	const a = se.step();
	expect(a).toEqual([
		{t: 'addLay', cls: 'grp', nm: 'base'},
		{t: 'chgPic', nm: 'base', fn: 'yun_1184', aFace: []},
		{t: 'stop', kind: 's', key: 't1:3', nm: 'mes'},
	]);
});

it('step_addFace_definesFace', ()=> {
	// [add_face]は表示変化を伴わない（アクションを積まない）。dx/dyは数値に変換され、blendmode未指定時は'normal'
	const se = new ScriptEngine('t1', '[add_face name=minoura_me_futsu dx=171 dy=159]あ[s]');
	const a = se.step();
	expect(a).toEqual([
		{t: 'chgStr', nm: 'mes', str: 'あ'},
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
		{t: 'chgPic', nm: '0', fn: 'minoura_wasou', aFace: [
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
		{t: 'chgPic', nm: '0', fn: 'base', aFace: [
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
		{t: 'chgBAlpha', nm: 'mes', b_alpha: 0.8},
		{t: 'stop', kind: 's', key: 't1:2', nm: 'mes'},
	]);
});

it('step_lay_bAlpha_withPic_bothActionsPushed', ()=> {
	// pic（またはfn）とb_alphaを同一[lay]タグ内で併用した場合、両方のアクションが記述順で積まれる
	const se = new ScriptEngine('t1', '[add_lay layer=base class=grp][lay layer=base pic=yun_1184 b_alpha=0.5][s]');
	const a = se.step();
	expect(a).toEqual([
		{t: 'addLay', cls: 'grp', nm: 'base'},
		{t: 'chgPic', nm: 'base', fn: 'yun_1184', aFace: []},
		{t: 'chgBAlpha', nm: 'base', b_alpha: 0.5},
		{t: 'stop', kind: 's', key: 't1:3', nm: 'mes'},
	]);
});

it('step_lay_bAlpha_invalidValueThrows', ()=> {
	expect(()=> new ScriptEngine('t1', '[lay layer=mes b_alpha=abc][s]').step()).toThrow();
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

it('step_trace_emitsTraceAction', ()=> {
	// [trace text=@] は表示に影響を与えず、traceアクションを積むだけ（実処理はScriptMng.ts #trace()側）
	const se = new ScriptEngine('t1', '[trace text=@]あ[s]');
	const a = se.step();
	expect(a).toEqual([
		{t: 'trace', text: '@'},
		{t: 'chgStr', nm: 'mes', str: 'あ'},
		{t: 'stop', kind: 's', key: 't1:3', nm: 'mes'},
	]);
});
it('step_trace_missingText_emitsEmptyString', ()=> {
	// text省略時は空文字を積む（ScriptMng側の#trace()で「(text is )」的なフォールバック表示になる）
	const se = new ScriptEngine('t1', '[trace]あ[s]');
	expect(se.step()[0]).toEqual({t: 'trace', text: ''});
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
	expect(se.getVal('game:foo')).toBeNull();	// 名前空間が違うので別変数
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
	const se = new ScriptEngine('t1', '[let name=game:name val=\'"ゆかり"\'][s]');
	se.step();
	expect(se.getVal('game:name')).toBe('ゆかり');
});

it('let_requiresName', ()=> {
	expect(()=> new ScriptEngine('t1', '[let val=1][s]').step()).toThrow();
});

it('let_invalidExpressionThrows', ()=> {
	expect(()=> new ScriptEngine('t1', '[let name=foo val="1+"][s]').step()).toThrow();
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
