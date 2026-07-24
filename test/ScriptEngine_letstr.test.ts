/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2026-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

// 文字列・数値操作タグ（本家 Variable.ts:347-432 の移植）。
//	[let_abs] [let_round] [let_length] [let_char_at] [let_index_of]
//	[let_substr] [let_replace] [let_search]
//	どれもDOMを触らずエンジン内で完結するのでユニットテストのみ。
//	併せて[let]のtext属性（本家書式）も、ここが導入箇所なのでこのファイルで見る

import {ScriptEngine} from '../src/ts/ScriptEngine';

import {expect, it} from 'bun:test';


// 1回step()して変数を読む。停止点は[s]
function val(src: string, name: string) {
	const se = new ScriptEngine('t1', `${src}[s]`);
	se.step();
	return se.getVal(name);
}


// ============ [let]のtext属性（本家書式） ============

it('let_text_asIs', ()=> {
	// 本家の[let]はtext＝「値そのもの」。式にしたければ text=&式（＝共通の属性前処理が評価する）
	expect(val('[let name=a text=もじ]', 'a')).toBe('もじ');
});

it('let_text_autoCastOnRead', ()=> {
	// 読み出し側の自動キャストが効く（本家シナリオの [let name=isGameState text=true] 相当）
	expect(val('[let name=isGameState text=true]', 'isGameState')).toBe(true);
	expect(val('[let name=n text=1.20]', 'n')).toBe(1.2);
});

it('let_text_ampersand', ()=> {
	expect(val('[let name=a text=2][let name=b text="&a * 3"]', 'b')).toBe(6);
});

it('let_text_cast', ()=> {
	expect(val('[let name=a text=0123 cast=str]', 'a')).toBe('0123');
	expect(val('[let name=a text=3.9 cast=int]', 'a')).toBe(3);
});

it('let_text_winsOverVal', ()=> {
	// bluesnovel独自のval（常に式評価）は残してあるが、本家書式のtextがあればそちらが優先
	expect(val('[let name=a text=99 val=1+1]', 'a')).toBe(99);
});

it('let_text_nameRequired', ()=> {
	expect(()=> val('[let text=1]', 'a')).toThrow('[let] nameは必須です');
});


// ============ [let_abs] / [let_round] ============

it('letAbs_negative', ()=> {
	expect(val('[let_abs name=a text=-12.5]', 'a')).toBe(12.5);
});

it('letAbs_positiveAndDefault', ()=> {
	expect(val('[let_abs name=a text=12.5]', 'a')).toBe(12.5);
	expect(val('[let_abs name=a]', 'a')).toBe(0);	// textの省略値は0（本家）
});

it('letAbs_notNumber', ()=> {
	expect(()=> val('[let_abs name=a text=もじ]', 'a')).toThrow('[let_abs] textの値が不正です');
});

it('letRound', ()=> {
	expect(val('[let_round name=a text=1.5]', 'a')).toBe(2);
	expect(val('[let_round name=a text=1.4]', 'a')).toBe(1);
	expect(val('[let_round name=a text=-1.5]', 'a')).toBe(-1);	// Math.round()そのまま
});


// ============ [let_length] ============

it('letLength', ()=> {
	expect(val('[let_length name=a text=あいうえお]', 'a')).toBe(5);
	expect(val('[let_length name=a]', 'a')).toBe(0);	// text省略は空文字あつかい
});

it('letLength_ofVar', ()=> {
	// 本家 ext_fg2.sn の [let_length name=cnt text=&save:sn.fg2.lays@str] と同じ形。
	//	@strを付けるのは「数字だけの文字列を数値にされない」ため
	expect(val('[let name=game:s text=ABC cast=str][let_length name=cnt text=&game:s@str]', 'cnt'))
		.toBe(3);
});


// ============ [let_char_at] ============

it('letCharAt', ()=> {
	expect(val('[let_char_at name=a text=ABCDE pos=2]', 'a')).toBe('C');
	expect(val('[let_char_at name=a text=ABCDE]', 'a')).toBe('A');	// posの省略値は0
	expect(val('[let_char_at name=a text=ABCDE pos=9 cast=str]', 'a')).toBe('');	// 範囲外は空文字
});


// ============ [let_index_of] ============

it('letIndexOf', ()=> {
	expect(val('[let_index_of name=a text=ABCDE val=CD]', 'a')).toBe(2);
	expect(val('[let_index_of name=a text=ABCDE val=ZZ]', 'a')).toBe(-1);
});

it('letIndexOf_start', ()=> {
	expect(val('[let_index_of name=a text=ABCABC val=B start=2]', 'a')).toBe(4);
});

it('letIndexOf_valRequired', ()=> {
	expect(()=> val('[let_index_of name=a text=ABC]', 'a')).toThrow('[let_index_of] valは必須です');
});


// ============ [let_substr] ============

it('letSubstr_posLen', ()=> {
	expect(val('[let_substr name=a text=ABCDE pos=1 len=3 cast=str]', 'a')).toBe('BCD');
	expect(val('[let_substr name=a text=ABCDE pos=1 cast=str]', 'a')).toBe('B');	// lenの省略値は1
});

it('letSubstr_all', ()=> {
	expect(val('[let_substr name=a text=ABCDE pos=2 len=all cast=str]', 'a')).toBe('CDE');
});

it('letSubstr_negativePos', ()=> {
	// 本家 ext_voice.sn の [let_substr name=cnt text="&'000'+ c" pos=-3 len=all cast=str]
	//	＝ゼロ詰め3桁。String.slice()の負値そのままの挙動に頼っている
	expect(val(`[let_substr name=a text="&'000'+ 7" pos=-3 len=all cast=str]`, 'a')).toBe('007');
});

it('letSubstr_lang', ()=> {
	// 本家 ext_lang.sn:6 [let_substr name=lang text=&lang_co pos=0 len=2]
	expect(val('[let name=lang_co text=ja-JP cast=str][let_substr name=lang text=&lang_co pos=0 len=2]', 'lang'))
		.toBe('ja');
});


// ============ [let_replace] ============

it('letReplace', ()=> {
	expect(val(`[let_replace name=a text=A_1_B reg='_.+' val='' cast=str]`, 'a')).toBe('A');
});

it('letReplace_flags', ()=> {
	// flagsが無ければ最初の1つだけ、g付きで全部
	expect(val(`[let_replace name=a text=aXaXa reg=X val=- cast=str]`, 'a')).toBe('a-aXa');
	expect(val(`[let_replace name=a text=aXaXa reg=X val=- flags=g cast=str]`, 'a')).toBe('a-a-a');
});

it('letReplace_regRequired', ()=> {
	expect(()=> val(`[let_replace name=a text=ABC val='']`, 'a')).toThrow('[let_replace] regは必須です');
});


// ============ [let_search] ============

it('letSearch', ()=> {
	expect(val(`[let_search name=a text=ABC123 reg='[0-9]']`, 'a')).toBe(3);
	expect(val(`[let_search name=a text=ABC reg='[0-9]']`, 'a')).toBe(-1);
});

it('letSearch_regRequired', ()=> {
	expect(()=> val('[let_search name=a text=ABC]', 'a')).toThrow('[let_search] regは必須です');
});


// ============ その他 ============

it('letStr_reservedAsMacroName', ()=> {
	// タグ名なのでマクロ名には使えない
	expect(()=> val('[macro name=let_substr]', 'a'))
		.toThrow('[let_substr]はタグ名のため、マクロ名として使用できません');
});

it('letStr_cond', ()=> {
	// 共通の属性前処理（cond）はこれらのタグにも当然効く
	expect(val('[let name=a text=元 cast=str][let_length name=a text=ABC cond="1==2"]', 'a'))
		.toBe('元');
});
