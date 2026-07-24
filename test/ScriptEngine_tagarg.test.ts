/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2026-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

// 全タグ共通の属性前処理（本家 ScriptIterator.ts:418 タグ解析() の前半）の検証。
//	cond属性・「%属性名」＋「|省略値」・「*」全引数展開・「&式」の4つ。
//	個別タグの実装ではなくその手前の層なので、確認は[trace]/[let]など既存タグ経由で行う。
//	参考：tmp_esm_uc/doc/prj/ のシナリオ（cond=85箇所・%=111箇所・*=39箇所と多用されている）

import {ScriptEngine, type T_ENGINE_ACTION} from '../src/ts/ScriptEngine';

import {expect, it} from 'bun:test';


// [trace]の出力を順に集める（属性が正しく解決されたかの確認窓として使う）
function traces(src: string): string[] {
	const a: T_ENGINE_ACTION[] = new ScriptEngine('t1', src).step();
	return a.filter(v=> v.t === 'trace').map(v=> v.text);
}
// 最後の文字表示
function mesOf(src: string): string {
	const a = new ScriptEngine('t1', src).step().filter(v=> v.t === 'chgStr');
	return a.at(-1)?.str ?? '';
}


// ============ cond属性 ============

it('cond_trueExecutesTag', ()=> {
	expect(traces('[trace text=A cond="1==1"][s]')).toEqual(['A']);
});

it('cond_falseSkipsTag', ()=> {
	expect(traces('[trace text=A cond="1==2"][s]')).toEqual([]);
});

it('cond_readsVariable', ()=> {
	expect(traces('&game:f = true\n[trace text=A cond=game:f][s]')).toEqual(['A']);
	expect(traces('&game:f = false\n[trace text=A cond=game:f][s]')).toEqual([]);
});

it('cond_undefinedVarIsFalse', ()=> {
	// 未定義変数の参照はundefined。本家は String(値)==='undefined' も偽とする
	expect(traces('[trace text=A cond=game:未定義][s]')).toEqual([]);
});

it('cond_stringFalseIsFalse', ()=> {
	// 文字列'false'も偽（bluesnovelの[if]（ExprEval.evalBool）と揃えた規約）
	expect(traces(`[trace text=A cond='"false"'][s]`)).toEqual([]);
});

it('cond_ampPrefixThrows', ()=> {
	// expと同じく、condに「&」は不要（付けると二重評価になる）
	expect(()=> traces('[trace text=A cond=&game:f][s]')).toThrow('属性condは「&」が不要です');
});

it('cond_appliesToAnyTag_letIsNotExecuted', ()=> {
	// 個別タグではなく共通層なので、[let]のような処理系タグにも効く
	expect(traces('[let name=game:n val=9 cond="1==2"][trace text=&game:n|"未設定"][s]'))
		.toEqual(['未設定']);
});

it('cond_falseOnJumpDoesNotJump', ()=> {
	// 制御系タグでも同じ。condが偽なら[jump]自体が無かったことになり、そのまま読み進む
	expect(traces('[jump label=*skip cond="1==2"][trace text=A]\n*skip\n[trace text=B][s]'))
		.toEqual(['A', 'B']);
});


// ============ 「&式」＝属性値の式評価 ============

it('amp_evaluatesAttrValue', ()=> {
	expect(traces('&game:n = 1+2\n[trace text=&game:n][s]')).toEqual(['3']);
});

it('amp_withoutPrefixIsLiteral', ()=> {
	expect(traces('[trace text=game:n][s]')).toEqual(['game:n']);
});

it('amp_undefinedDropsAttrThenUsesDef', ()=> {
	// 評価結果がundefinedの属性は「渡さない」。省略値があればそちらを評価して使う
	expect(traces('[trace text=&game:未定義|"既定"][s]')).toEqual(['既定']);
});


// ============ 「%属性名」＝マクロ引数の参照 ============

it('kome_percent_readsMacroArg', ()=> {
	expect(traces('[macro name=m][trace text=%v][endmacro][m v=あ][s]')).toEqual(['あ']);
});

it('percent_usesDefaultWhenArgOmitted', ()=> {
	expect(traces('[macro name=m][trace text=%v|既定][endmacro][m][s]')).toEqual(['既定']);
});

it('percent_defaultIsAlsoAmpersandEvaluated', ()=> {
	// 省略値も「&式」書式が使える（本家 getValAmpersand(def)）
	expect(traces('&game:d = 7\n[macro name=m][trace text=%v|&game:d][endmacro][m][s]'))
		.toEqual(['7']);
});

it('percent_defNullDropsAttr', ()=> {
	// 省略値に'null'と書くと、引数が無い場合その属性自体を渡さない（本家の規約）。
	//	[trace]はtext未指定を空文字とするので、結果は空文字になる
	expect(traces('[macro name=m][trace text=%v|null][endmacro][m][s]')).toEqual(['']);
});

it('percent_noDefaultDropsAttr', ()=> {
	// 省略値そのものが無い場合も同じく属性を渡さない
	expect(traces('[macro name=m][trace text=%v][endmacro][m][s]')).toEqual(['']);
});

it('percent_outsideMacroThrows', ()=> {
	expect(()=> traces('[trace text=%v][s]'))
		.toThrow('属性「%」はマクロ定義内でのみ使用できます（そのマクロの引数を示す簡略文法であるため）');
});

it('percent_alsoWorksForCallArgs', ()=> {
	// 本家は[call]の属性もコールスタックへ積むので、サブルーチンからも「%」で引ける
	expect(traces('[call label=*sub v=X][s]\n*sub\n[trace text=%v][return]')).toEqual(['X']);
});

it('percent_rawStringIsPassed_notAutoCast', ()=> {
	// mp:経由だと読み出し時に自動キャストが掛かり '1.20'→1.2 になってしまうため、
	//	「%」は積んでおいた生の属性文字列を返す
	expect(traces('[macro name=m][trace text=%v][endmacro][m v=1.20][s]')).toEqual(['1.20']);
});


// ============ 「*」＝マクロ引数の全展開 ============

it('kome_passesAllArgsThrough', ()=> {
	// [m text=あ]の属性がそのまま[trace]へ渡る
	expect(traces('[macro name=m][trace *][endmacro][m text=あ][s]')).toEqual(['あ']);
});

it('kome_explicitAttrOverridesInherited', ()=> {
	// 「*」で引き継いだ後に個別指定が上書きする（属性の記述順ではなく、*が先に効く）
	expect(traces('[macro name=m][trace * text=個別][endmacro][m text=あ][s]')).toEqual(['個別']);
});

it('kome_outsideMacroThrows', ()=> {
	expect(()=> traces('[trace * text=A][s]')).toThrow('属性「*」はマクロのみ有効です');
});

it('kome_nestedMacroPassesOwnArgsOnly', ()=> {
	// 入れ子マクロの「*」が引き継ぐのは、その内側マクロが受け取った属性
	expect(traces(
		'[macro name=inner][trace *][endmacro]'+
		'[macro name=outer][inner text=内][endmacro]'+
		'[outer text=外][s]'
	)).toEqual(['内']);
});


// ============ 組み合わせ（実シナリオでの使われ方） ============

it('combo_condWithPercent_insideMacro', ()=> {
	// tmp_esm_uc の ext_fg.sn にある [wait_tsy cond='! mp:no_wait'] と同じ形。
	//	condはmp:を直に読む（本家もcondは「%」解決の前に評価する）
	expect(traces(
		`[macro name=m][trace text=出た cond='! mp:no_wait'][endmacro]`+
		'[m no_wait=true][m][s]'
	)).toEqual(['出た']);	// 1回目はno_wait=trueで抑止、2回目だけ出る
});

it('combo_layerTagViaMacro', ()=> {
	// [lay * b_alpha=%b_alpha|1] のような、実シナリオで頻出する書き方が通ること
	const a = new ScriptEngine('t1',
		'[add_lay layer=mes class=txt][macro name=t][lay * b_alpha=%b_alpha|1][endmacro]'+
		'[t layer=mes b_alpha=0.4][s]'
	).step();
	expect(a.filter(v=> v.t === 'chgBAlpha').at(-1)).toEqual({t: 'chgBAlpha', nm: 'mes', page: 'fore', b_alpha: 0.4});
});

it('combo_textDisplayUnaffected', ()=> {
	// 地の文（タグ以外）はこの層を通らないので今まで通り
	expect(mesOf('ふつうの文[s]')).toBe('ふつうの文');
});
