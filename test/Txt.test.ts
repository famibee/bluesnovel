/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2026-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

// 本文の文字組み（src/ts/Txt.ts）。ルビの割り方そのものは本家から丸移植した RubySpliter が
//	決め、test/RubySpliter.test.ts（本家のテストを無改変で移植）が仕様を押さえている。
//	ここで見るのは移植先の都合＝「表示単位の配列にどう受け直すか」と、
//	[span]/[ch]が本文ストリームへ埋め込んだ命令の解釈（本家 LayerMng.ts:315 #cmdTxt 相当）。

import {plainTxt, rubyTxt, splitCh} from '../src/ts/Txt';

import {expect, it} from 'bun:test';


// 埋め込み命令（本家と同じ`｜&emsp;《コマンド名｜URIエンコードしたJSON》`の形）
const cmd = (nm: string, o: object)=> `｜&emsp;《${nm}｜${encodeURIComponent(JSON.stringify(o))}》`;

it('splitCh_plainText', ()=> {
	expect(splitCh('あい')).toEqual([{c: 'あ'}, {c: 'い'}]);
});

it('splitCh_ruby', ()=> {
	// 漢字への自動ルビと、｜で親文字の範囲を明示する記法
	expect(splitCh('漢字《かんじ》')).toEqual([{c: '漢字', r: 'かんじ'}]);
	expect(splitCh('｜親文字《おやもじ》')).toEqual([{c: '親文字', r: 'おやもじ'}]);
});

it('splitCh_sesame', ()=> {
	// 傍点は1文字ずつに付く。位置指定`center｜`が付いた形で来る
	expect(splitCh('｜傍点《*》')).toEqual([
		{c: '傍', r: 'center｜ヽ'}, {c: '点', r: 'center｜ヽ'},
	]);
});

it('plainTxt_dropsRuby', ()=> {
	// 組み込み変数 const.sn.last_page_plain_text はこれ
	expect(plainTxt('｜奇天烈《きてれつ》大百科')).toBe('奇天烈大百科');
});

it('rubyTxt_dropsAlign', ()=> {
	// ルビの位置指定は未対応なので落とす（ルビ文字だけを返す）
	expect(rubyTxt('center｜ヽ')).toBe('ヽ');
	expect(rubyTxt('あさり')).toBe('あさり');
	expect(rubyTxt('｜あさり')).toBe('｜あさり');	// 位置指定の形でなければそのまま
});

// ===== 埋め込み命令 =====

it('splitCh_spanStylesFollowingText', ()=> {
	// [span style=…]は次の[span]まで効く
	expect(splitCh(`あ${cmd('span', {style: 'color: red;'})}い`)).toEqual([
		{c: 'あ'}, {c: 'い', s: 'color: red;'},
	]);
});

it('splitCh_spanWithoutArgClears', ()=> {
	// 属性なしの[span]は指定の解除（本家 TxtLayer.ts:804 #mergePushSpan）
	expect(splitCh(`${cmd('span', {style: 'color: red;'})}あ${cmd('span', {})}い`)).toEqual([
		{c: 'あ', s: 'color: red;'}, {c: 'い'},
	]);
});

it('splitCh_spanRubyStyle', ()=> {
	expect(splitCh(`${cmd('span', {r_style: 'color: lime;'})}漢字《かんじ》`)).toEqual([
		{c: '漢字', r: 'かんじ', rs: 'color: lime;'},
	]);
});

it('splitCh_chStyleAppliesOnlyInside', ()=> {
	// [ch]のstyleはadd｜〜add_close｜の間だけ＝そのtextにだけ効く
	const src = `あ${cmd('add', {style: 'color: lime;'})}い${cmd('add_close', {})}う`;
	expect(splitCh(src)).toEqual([{c: 'あ'}, {c: 'い', s: 'color: lime;'}, {c: 'う'}]);
});

it('splitCh_chStyleStacksOnSpan', ()=> {
	// [span]の指定と[ch]の指定は重ねて当てる（後ろに置くので[ch]側が勝つ）
	const src = `${cmd('span', {style: 'color: red;'})}${cmd('add', {style: 'color: lime;'})}あ${cmd('add_close', {})}い`;
	expect(splitCh(src)).toEqual([
		{c: 'あ', s: 'color: red;color: lime;'}, {c: 'い', s: 'color: red;'},
	]);
});

it('splitCh_unknownCmdIsDropped', ()=> {
	// 未対応の命令（[ch_in_style]等）は命令ごと落として本文表示は続ける
	expect(splitCh(`あ${cmd('del', {})}い`)).toEqual([{c: 'あ'}, {c: 'い'}]);
});

it('splitCh_graphMakesOneUnit', ()=> {
	// [graph]のインライン画像。本文としては全角空白1つぶんの場所を占める（本家も`&emsp;`を置く）。
	//	picは論理名のままで、解決済みURL（src）を入れるのはScriptMngの仕事
	expect(splitCh(`あ${cmd('grp', {pic: 'breakline', r: 'るび'})}い`)).toEqual([
		{c: 'あ'}, {c: '　', r: 'るび', pic: 'breakline'}, {c: 'い'},
	]);
	expect(plainTxt(cmd('grp', {pic: 'breakline'}))).toBe('　');
});

// ===== [tcy]（縦中横）・[link]（ハイパーリンク） =====

it('splitCh_tcyMakesOneUnit', ()=> {
	// 命令だが表示単位を作る。tがそのまま1単位になり、rはルビ
	expect(splitCh(`あ${cmd('tcy', {t: '628', r: '炎'})}い`)).toEqual([
		{c: 'あ'}, {c: '628', r: '炎', tcy: true}, {c: 'い'},
	]);
});

it('splitCh_linkMarksUnitsUntilEndlink', ()=> {
	const lnk = {label: '*goal', fn: '', call: false, arg: ''};
	expect(splitCh(`あ${cmd('link', {label: '*goal'})}い${cmd('endlink', {})}う`)).toEqual([
		{c: 'あ'}, {c: 'い', lnk}, {c: 'う'},
	]);
});

it('splitCh_linkStyleIsDroppedAtEndlink', ()=> {
	// [link style=…]は区間の間だけ。[endlink]で[span]の指定へ戻る
	const src = `${cmd('span', {style: 'color: red;'})}あ${cmd('link', {label: '*g', style: 'color: blue;'})}い${cmd('endlink', {})}う`;
	expect(splitCh(src)).toEqual([
		{c: 'あ', s: 'color: red;'},
		{c: 'い', s: 'color: red;color: blue;', lnk: {label: '*g', fn: '', call: false, arg: ''}},
		{c: 'う', s: 'color: red;'},
	]);
});

it('splitCh_linkCallAndArg', ()=> {
	expect(splitCh(`${cmd('link', {fn: 'sub', label: '*g', call: 'true', arg: 'x', style_hover: 'color: lime;'})}あ${cmd('endlink', {})}`))
		.toEqual([{c: 'あ', lnk: {label: '*g', fn: 'sub', call: true, arg: 'x', sh: 'color: lime;'}}]);
});

it('splitCh_cmdIsNotCountedAsPlainText', ()=> {
	// 命令は表示単位を作らない＝平文にも入らない
	expect(plainTxt(`あ${cmd('span', {style: 'color: red;'})}い`)).toBe('あい');
});

it('splitCh_rubyAlignIsNotACmd', ()=> {
	// ルビの位置指定は命令と同じ`名前｜値`の形。コマンド名でないのでルビのまま
	expect(splitCh('｜蜊《left｜あさり》')).toEqual([{c: '蜊', r: 'left｜あさり'}]);
});
