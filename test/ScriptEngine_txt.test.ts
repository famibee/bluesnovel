/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2026-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

// 文字装飾タグ（[span]/[ch]/[ruby2]）。本家と同じく**本文ストリームへ命令を埋め込む**方式
//	（本家 LayerMng.ts:315 #cmdTxt）なので、エンジンが積むのは相変わらず文字列だけ。
//	そのため確かめるべきは「その文字列をScriptMngと同じ手順（Txt.ts splitCh）で割ったとき、
//	意図した表示単位になるか」。命令の形そのものは実装の内部事情なので直接は見ない。

import {ScriptEngine} from '../src/ts/ScriptEngine';
import {splitCh, plainTxt} from '../src/ts/Txt';

import {expect, it} from 'bun:test';


// シナリオを[s]まで走らせ、最後にchgStrが積んだ本文を表示単位へ割る
function units(src: string) {
	const a = new ScriptEngine('t1', `[add_lay layer=mes class=txt][current layer=mes]${src}[s]`).step();
	const last = a.filter(v=> v.t === 'chgStr').at(-1);
	return splitCh(last?.t === 'chgStr' ? last.str : '');
}

it('span_stylesFollowingText', ()=> {
	expect(units('あ[span style="color: red;"]い')).toEqual([
		{c: 'あ'}, {c: 'い', s: 'color: red;'},
	]);
});

it('span_withoutArgClears', ()=> {
	// 属性なしの[span]で解除（本家 TxtLayer.ts:804 #mergePushSpan）
	expect(units('[span style="color: red;"]あ[span]い')).toEqual([
		{c: 'あ', s: 'color: red;'}, {c: 'い'},
	]);
});

it('span_rubyStyle', ()=> {
	expect(units('[span r_style="color: lime;"]漢字《かんじ》')).toEqual([
		{c: '漢字', r: 'かんじ', rs: 'color: lime;'},
	]);
});

it('ch_appendsTextWithItsOwnStyle', ()=> {
	// [ch]のstyleはそのtextの間だけ効く
	expect(units('あ[ch text=いう style="color: lime;"]え')).toEqual([
		{c: 'あ'}, {c: 'い', s: 'color: lime;'}, {c: 'う', s: 'color: lime;'}, {c: 'え'},
	]);
});

it('ch_textCanContainRuby', ()=> {
	expect(units('[ch text=漢字《かんじ》]')).toEqual([{c: '漢字', r: 'かんじ'}]);
});

it('ch_rTagInTextBecomesNewline', ()=> {
	// [ch text=…]に改行を含める書き方（本家 LayerMng.ts:922）
	expect(units('[ch text="あ[r]い"]')).toEqual([{c: 'あ'}, {c: '\n'}, {c: 'い'}]);
});

it('ch_requiresText', ()=> {
	expect(()=> units('[ch style="color: red;"]')).toThrow('[ch] textは必須です');
});

it('ruby2_putsOneRubyUnit', ()=> {
	// [ruby2]は本家同様[ch]へ書き換えられる（t/rはURIエンコードして渡すので、
	//	空白や《》が入ってもルビ記法として壊れない）
	expect(units('[ruby2 t=蜊 r=あさり]')).toEqual([{c: '蜊', r: 'あさり'}]);
});

it('ruby2_rubyCanContainSpace', ()=> {
	// 空白はルビの区切り指定（本家 RubySpliter putTxtRb）。エンコードされるので1つのルビのまま
	expect(units('[ruby2 t=蜊 r="あさ り"]')).toEqual([{c: '蜊', r: 'あさ り'}]);
});

it('ruby2_withStyle', ()=> {
	expect(units('[ruby2 t=蜊 r=あさり style="color: purple;" r_style="color: lime;"]')).toEqual([
		{c: '蜊', r: 'あさり', s: 'color: purple;', rs: 'color: lime;'},
	]);
});

it('ruby2_requiresTandR', ()=> {
	expect(()=> units('[ruby2 r=あさり]')).toThrow('[ruby2] tは必須です');
	expect(()=> units('[ruby2 t=蜊]')).toThrow('[ruby2] rは必須です');
});

it('lastPagePlainText_dropsCmdAndRuby', ()=> {
	// 埋め込み命令は表示単位を作らないので、平文にも残らない
	const se = new ScriptEngine('t1',
		'[add_lay layer=mes class=txt][current layer=mes][span style="color: red;"]漢字《かんじ》[ch text=です][s]');
	se.step();
	expect(se.getVal('tmp:const.sn.last_page_plain_text')).toBe('漢字です');
	// 生の本文（const.sn.last_page_text）は命令込みなので、割り直せば同じ平文になる
	expect(plainTxt(String(se.getVal('tmp:const.sn.last_page_text')))).toBe('漢字です');
});
