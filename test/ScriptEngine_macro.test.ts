/* ***** BEGIN LICENSE BLOCK *****
Copyright (c) 2026-2026 Famibee (famibee.blog38.fc2.com)

This software is released under the MIT License.
http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import {ScriptEngine} from '../src/ts/ScriptEngine';

import {expect, it} from 'bun:test';


// call系テストと同じ方針：停止タグを含まないスクリプトを最後まで実行し、'mes'レイヤの最終文字列で検証する
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


// ============ 基本：定義は読み飛ばされ、名前呼び出しでのみ実行される ============

it('macro_basic_definitionSkippedThenCalledByName', ()=> {
	expect(run(
		'[macro name=greet]HELLO[endmacro]'+
		'BEFORE[greet]AFTER'
	)).toBe('BEFOREHELLOAFTER');
});

it('macro_calledMultipleTimes', ()=> {
	expect(run(
		'[macro name=greet]HI[endmacro]'+
		'[greet]-[greet]-[greet]'
	)).toBe('HI-HI-HI');
});

it('macro_calls_anotherMacro_nested', ()=> {
	expect(run(
		'[macro name=inner]IN[endmacro]'+
		'[macro name=outer]OUT-[inner]-OUT[endmacro]'+
		'[outer]'
	)).toBe('OUT-IN-OUT');
});


// ============ mp: 名前空間（引数受け渡し・戻り時の復元） ============

it('macro_args_passedViaMpNamespace', ()=> {
	// マクロ呼び出し時のタグ属性がmp:名前空間経由で[if]から参照できること
	expect(run(
		`[macro name=say][if exp="mp:msg=='YO'"]MATCHED[endif][endmacro]`+
		'[say msg="YO"]'
	)).toBe('MATCHED');
});

it('macro_mp_restoredAfterReturn_nestedCallDoesNotLeak', ()=> {
	// 入れ子マクロ呼び出しから戻った後、外側のmp:値が復元されること
	// （本家 #callSub()/#return() のcsArg[':hMp']保存・復元と同じ仕組み）
	expect(run(
		`[macro name=inner][if exp="mp:v=='Y'"]INNER-Y[endif][endmacro]`+
		'[macro name=outer]'+
			`[if exp="mp:v=='X'"]OUTER-BEFORE-X|[endif]`+
			'[inner v="Y"]|'+
			`[if exp="mp:v=='X'"]OUTER-AFTER-X[endif]`+
		'[endmacro]'+
		'[outer v="X"]'
	)).toBe('OUTER-BEFORE-X|INNER-Y|OUTER-AFTER-X');
});


// ============ エラー系 ============

it('macro_missingName_throws', ()=> {
	expect(()=> new ScriptEngine('t1', '[macro]X[endmacro]').step()).toThrow();
});

it('macro_unclosed_throws', ()=> {
	expect(()=> new ScriptEngine('t1', '[macro name=x]X').step()).toThrow();
});

it('macro_duplicateName_throws', ()=> {
	expect(()=> new ScriptEngine('t1',
		'[macro name=x]A[endmacro][macro name=x]B[endmacro]'
	).step()).toThrow();
});

it('macro_reservedTagName_throws', ()=> {
	// 既存タグ名（if）と同名のマクロは定義できない（本家 if (name in this.hTag) throw と同じ意図）
	expect(()=> new ScriptEngine('t1', '[macro name=if]X[endmacro]').step()).toThrow();
});

// ============ マクロ名の禁止文字（本家 ScriptIterator.ts:1362 #REG_NG4MAC_NM） ============

it('macro_ngNameChars_throw', ()=> {
	// " ' # ; \ ] と全角空白は、タグ記述やタグ引数解析と衝突するためマクロ名に使えない。
	//	名前自体に引用符が入るので、属性値を囲む引用符は名前に合わせて変える
	for (const src of [
		`[macro name='a"b']X[endmacro]`,
		`[macro name="a'b"]X[endmacro]`,
		`[macro name='a#b']X[endmacro]`,
		`[macro name='a;b']X[endmacro]`,
		`[macro name='a\\b']X[endmacro]`,
		`[macro name='a]b']X[endmacro]`,
		`[macro name='a　b']X[endmacro]`,
	]) expect(()=> new ScriptEngine('t1', src).step()).toThrow();
});
it('macro_nonAsciiNameIsOk', ()=> {	// 禁止文字を含まなければ日本語名も使える
	expect(run('[macro name=あいさつ]HELLO[endmacro][あいさつ]')).toBe('HELLO');
});


// ============ 入れ子の[macro]定義 ============

it('macro_nestedDefinition', ()=> {
	// 本家は最初の[endmacro]で終端とみなすので入れ子定義は壊れるが、
	// bluesnovelは深度を数えるので「outerを呼ぶとinnerが定義される」書き方ができる
	expect(run(
		'[macro name=outer]A[macro name=inner]B[endmacro]C[endmacro]'+
		'[outer]'+		// outerの実行時にinnerが定義される（B は出力されない）
		'[inner]'
	)).toBe('ACB');
});

it('macro_nestedDefinition_innerNotDefinedUntilOuterCalled', ()=> {
	// outerを呼ぶ前にinnerを呼んでも未定義タグ扱い（試作では無視）で何も起きない
	expect(run(
		'[macro name=outer][macro name=inner]B[endmacro][endmacro]'+
		'[inner]X'
	)).toBe('X');
});

it('macro_bodySkip_ignoresEndmacroInsideLetMl', ()=> {
	// [let_ml]の本文は「ただのテキスト」なので、中の[endmacro]で本体が切れてはいけない
	expect(run(
		'[macro name=m][let_ml name=doc][endmacro][endlet_ml]OK[endmacro]'+
		'[m]'
	)).toBe('OK');
});

it('endmacro_withoutMacroCall_throws', ()=> {
	// [call]も[マクロ呼び出し]もされていない状態で[endmacro]に到達するとthrow
	// （[macro]定義ブロックの読み飛ばし対象外の位置に単独で[endmacro]がある場合）
	expect(()=> new ScriptEngine('t1', '[endmacro]').step()).toThrow();
});

// ============ [char2macro]／[bracket2macro]（一文字マクロ・括弧マクロ） ============
//	地の文の中の「一文字」「括弧で囲んだ範囲」を、タグ・マクロ呼び出しへ読み替える仕組み。
//	置換処理そのものは本家から移植済みのGrammarが持っている（test/Grammar.test.ts）ので、
//	ここでは「ScriptEngineがタグとして受け付け、以降のトークンが実際に置き換わる」ことを見る

it('char2macro_replacesCharWithMacroCall', ()=> {
	expect(run(
		'[macro name=ハート]♡[endmacro]'+
		'[char2macro char=@ name=ハート]'+
		'a@b@@c'
	)).toBe('a♡b♡♡c');
});

it('char2macro_beforeDefinition_isPlainText', ()=> {
	// 置換対象は定義タグより後ろのトークンだけ（本家と同じ）。前に書いた「@」は地の文のまま
	expect(run(
		'[macro name=ハート]♡[endmacro]'+
		'a@b'+
		'[char2macro char=@ name=ハート]'+
		'c@d'
	)).toBe('a@bc♡d');
});

it('char2macro_undefinedName_throws', ()=> {
	expect(()=> run('[char2macro char=@ name=未定義]')).toThrow();
});

it('char2macro_duplicateChar_throws', ()=> {
	expect(()=> run(
		'[macro name=m]X[endmacro]'+
		'[char2macro char=@ name=m][char2macro char=@ name=m]'
	)).toThrow();
});

it('char2macro_ngChar_throws', ()=> {
	// 英数字や「[」「=」等はタグ記述と衝突するため一文字マクロに使えない（Grammar #REG_CANTC2M）
	expect(()=> run(
		'[macro name=m]X[endmacro][char2macro char=a name=m]'
	)).toThrow();
});

it('bracket2macro_passesInnerTextAsTextAttr', ()=> {
	// 「〔〜〕」が [セリフ text='〜'] へ置き換わる＝マクロ側はmp:textで受け取れる。
	//	マクロ本体を「&mp:text&」と書けないのは、地の文と地続きだと1トークンになり
	//	「&表示&」書式が発動しないため（トークン先頭が&のときだけ発動する。本家と同じ）
	expect(run(
		'[macro name=セリフ]&mp:text&[endmacro]'+
		'[bracket2macro text="〔〕" name=セリフ]'+
		'〔梨香〕と〔黒柳〕'
	)).toBe('梨香と黒柳');
});

it('bracket2macro_textMustBeTwoChars_throws', ()=> {
	expect(()=> run(
		'[macro name=m]X[endmacro][bracket2macro text="〔〕〕" name=m]'
	)).toThrow();
});

it('c2m_labelsAfterDefinitionStillResolve', ()=> {
	// 置換で1トークンが複数へ割れる＝以降の索引がずれるので、Script側でラベル表を作り直している。
	//	作り直さないと[jump]の飛び先が本文の途中へずれる
	expect(run(
		'[macro name=ハート]♡[endmacro]'+
		'[char2macro char=@ name=ハート]'+
		'a@b[jump label=*fin]NG\n*fin\nZ'
	)).toBe('a♡bZ');
});

it('c2m_nameIsReservedAsTagName', ()=> {
	// タグ名なのでマクロ名としては使えない
	expect(()=> run('[macro name=char2macro]X[endmacro]')).toThrow();
	expect(()=> run('[macro name=bracket2macro]X[endmacro]')).toThrow();
});
