/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2026-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

// 本家 skynovel_esm/test/HyphTest.test.ts の移植。禁則処理アルゴリズムは本家と完全に
//	同じであることを保証したいので、テストケースごと丸移植して全て通す方針。
//
//	相違は入力データの形だけ：本家 IChRect は「1文字＝1DOM要素」の Range 計測結果
//	（elm/rect）を持つが、bluesnovelの T_KIN_CH は DOM も座標も持たない
//	（hyphAlg/hyphAlgBura は rect を一度も読まないため）。ルビ要素は elm:eRp/eRt の
//	区別を `rt: true` の有無に、通常文字（elm）は `{ch}` に対応させている
//	（詳細は src/ts/Hyphenation.ts 冒頭コメント）

import {chkKinsoku, DEF_KINSOKU, Kinsoku, type T_KIN_CH} from '../src/ts/Hyphenation';

import {expect, it} from 'bun:test';

let	kin	: Kinsoku;
kin = new Kinsoku;


//MARK: ぶら下げなし
it.each(<{
	a	: T_KIN_CH[];
	p_i	: number;
	p_ch: string;
	i	: number;	// i >= 2
	ch	: string;
	ret	: {cont: boolean; ins: number};}[]>[

	// 改行なし
	{a: [
		{ch: '㍿'}, {ch: 'こ'}, {ch: 'の'}, {ch: '春'},
	], p_i: 2, p_ch: 'の', i: 3, ch: '春', ret: {cont: true, ins: 3 +1}},
	// testFnc行末禁則_warning_0_7_8n
	{a: [
		{ch: '【'}, {ch: 'こ'}, {ch: 'の'}, {ch: '【'},
	], p_i: 2, p_ch: 'の', i: 3, ch: '【', ret: {cont: true, ins: 3 +1}},
	{a: [
		{ch: '【'}, {ch: 'こ'}, {ch: 'の'}, {ch: '【'},
	], p_i: 1, p_ch: 'こ', i: 2, ch: 'の', ret: {cont: true, ins: 2 +1}},
	{a: [
		{ch: '【'}, {ch: 'こ'}, {ch: '【'}, {ch: 'の'},
	], p_i: 1, p_ch: 'こ', i: 2, ch: '【', ret: {cont: true, ins: 2 +1}},

	// 文字領域限界折り返し・自動改行
	{a: [
		{ch: '㍿'}, {ch: 'こ'}, {ch: 'の'}, {ch: '春'},
	], p_i: 2, p_ch: 'の', i: 3, ch: '春', ret: {cont: true, ins: 3 +1}},

	// 追い出し（分割禁止）
	{a: [
		{ch: '㍿'}, {ch: 'こ'}, {ch: '…'}, {ch: '…'},
	], p_i: 2, p_ch: '…', i: 3, ch: '…', ret: {cont: false, ins: 1 +1}},
	// 追い出し（分割禁止）＋末尾行末禁則
	{a: [
		{ch: '㍿'}, {ch: '〈'}, {ch: '…'}, {ch: '…'},
	], p_i: 2, p_ch: '…', i: 3, ch: '…', ret: {cont: false, ins: 0 +1}},
	// 追い出し（分割禁止）＋ルビ
	{a: [
		{ch: '㍿'}, {ch: 'ル'}, {ch: 'ル', rt: true}, {ch: '…'}, {ch: '…'},
	], p_i: 3, p_ch: '…', i: 4, ch: '…', ret: {cont: false, ins: 1 +1}},

	// 追い出し（行末禁則）
	{a: [
		{ch: '㍿'}, {ch: 'こ'}, {ch: '〈'}, {ch: '春'},
	], p_i: 2, p_ch: '〈', i: 3, ch: '春', ret: {cont: false, ins: 1 +1}},
	{a: [
		{ch: '㍿'}, {ch: 'こ'}, {ch: '〈'}, {ch: '〉'},
	], p_i: 2, p_ch: '〈', i: 3, ch: '〉', ret: {cont: false, ins: 1 +1}},
	// 追い出し（行末禁則）＋末尾行末禁則
	{a: [
		{ch: '㍿'}, {ch: '〈'}, {ch: '〈'}, {ch: '春'},
	], p_i: 2, p_ch: '〈', i: 3, ch: '春', ret: {cont: false, ins: 0 +1}},
	// 追い出し（行末禁則）＋ルビ
	{a: [
		{ch: '㍿'}, {ch: 'ル'}, {ch: 'ル', rt: true}, {ch: '〈'}, {ch: '春'},
	], p_i: 3, p_ch: '〈', i: 4, ch: '春', ret: {cont: false, ins: 1 +1}},

	// 追い出し（行頭禁則）
	{a: [
		{ch: '㍿'}, {ch: 'こ'}, {ch: 'の'}, {ch: '〉'},
	], p_i: 2, p_ch: 'の', i: 3, ch: '〉', ret: {cont: false, ins: 1 +1}},
	// 追い出し（行頭禁則）x2
	{a: [
		{ch: '㍿'}, {ch: 'こ'}, {ch: '〉'}, {ch: '〉'},
	], p_i: 2, p_ch: '〉', i: 3, ch: '〉', ret: {cont: false, ins: 1 +1}},
	// 追い出し（行頭禁則）＋末尾行末禁則
	{a: [
		{ch: '㍿'}, {ch: 'こ'}, {ch: '〈'}, {ch: '〉'},
	], p_i: 2, p_ch: 'こ', i: 3, ch: '〉', ret: {cont: false, ins: 1 +1}},
	// 追い出し（行頭禁則）＋ルビ
	{a: [
		{ch: '㍿'}, {ch: 'こ'}, {ch: 'ル'}, {ch: 'ル', rt: true}, {ch: '〉'},
	], p_i: 2, p_ch: 'ル', i: 4, ch: '〉', ret: {cont: false, ins: 1 +1}},

])('$ret', ({a, i, ch, p_i, p_ch, ret})=> {
	expect(kin.hyphAlg(a, p_i, p_ch, i, ch)).toStrictEqual(ret);
});

//MARK: ぶら下げあり
it.each(<{
	a	: T_KIN_CH[];
	p_i	: number;
	p_ch: string;
	i	: number;	// i >= 2
	ch	: string;
	ret	: {cont: boolean; ins: number};}[]>[
	// 改行なし
	{a: [
		{ch: '㍿'}, {ch: 'こ'}, {ch: 'の'}, {ch: '春'}, {ch: 'か'},
		// (仮改行)
		{ch: 'ら'}, {ch: '一'}, {ch: '年'}, {ch: 'に'},
	], p_i: 4, p_ch: 'か', i: 5, ch: 'ら', ret: {cont: false, ins: 2 +1}},

	// ぶら下げx1 と (仮改行) の組み合わせ
	{a: [
		{ch: '㍿'}, {ch: 'こ'}, {ch: 'の'}, {ch: '春'}, {ch: 'か'}, {ch: 'ら'},
		// (仮改行)
		{ch: '。'},//ぶら
		{ch: '一'}, {ch: '年'},
	], p_i: 5, p_ch: 'ら', i: 6, ch: '。', ret: {cont: false, ins: 3 +1}},
	{a: [
		{ch: '㍿'}, {ch: 'こ'}, {ch: 'の'}, {ch: '春'}, {ch: 'か'},
		{ch: '。'},//ぶら
		// (仮改行)
		{ch: 'ら'}, {ch: '一'}, {ch: '年'},
	], p_i: 5, p_ch: '。', i: 6, ch: 'ら', ret: {cont: false, ins: 3 +1}},
	{a: [
		{ch: '㍿'}, {ch: 'こ'}, {ch: 'の'}, {ch: '春'},
		{ch: '。'},//ぶら
		{ch: 'か'},
		// (仮改行)
		{ch: 'ら'}, {ch: '一'}, {ch: '年'},
	], p_i: 5, p_ch: 'か', i: 6, ch: 'ら', ret: {cont: false, ins: 4 +1}},

	// ぶら下げx2 と (仮改行) の組み合わせ
	{a: [
		{ch: '㍿'}, {ch: 'こ'}, {ch: 'の'}, {ch: '春'}, {ch: 'か'}, {ch: 'ら'},
		// (仮改行)
		{ch: 'ぁ'},//ぶら
		{ch: 'ぃ'},//ぶら2
		{ch: '　'},
	], p_i: 5, p_ch: 'ら', i: 6, ch: 'ぁ', ret: {cont: false, ins: 3 +1}},
	{a: [
		{ch: '㍿'}, {ch: 'こ'}, {ch: 'の'}, {ch: '春'}, {ch: 'か'}, {ch: 'ら'},
		{ch: 'ぁ'},//ぶら
		// (仮改行)
		{ch: 'ぃ'},//ぶら2
		{ch: '　'},
	], p_i: 6, p_ch: 'ぁ', i: 7, ch: 'ぃ', ret: {cont: false, ins: 4 +1}},
	{a: [
		{ch: '㍿'}, {ch: 'こ'}, {ch: 'の'}, {ch: '春'}, {ch: 'か'}, {ch: 'ら'},
		{ch: 'ぁ'},//ぶら
		{ch: 'ぃ'},//ぶら2
		// (仮改行)
		{ch: '　'},
	], p_i: 7, p_ch: 'ぃ', i: 8, ch: '　', ret: {cont: false, ins: 7 +1}},

	// ぶら下げx1 と (仮改行) と ぶら下げx1 の組み合わせ
	{a: [
		{ch: '㍿'}, {ch: 'こ'}, {ch: 'の'}, {ch: '春'}, {ch: 'か'}, {ch: 'ら'},
		// (仮改行)
		{ch: 'ぁ'},//ぶら
		{ch: 'は'},//非ぶら
		{ch: 'ぃ'},//ぶら2
	], p_i: 5, p_ch: 'ら', i: 6, ch: 'ぁ', ret: {cont: false, ins: 3 +1}},
	{a: [
		{ch: '㍿'}, {ch: 'こ'}, {ch: 'の'}, {ch: '春'}, {ch: 'か'}, {ch: 'ら'},
		{ch: 'ぁ'},//ぶら
		// (仮改行)
		{ch: 'は'},//非ぶら
		{ch: 'ぃ'},//ぶら2
	], p_i: 6, p_ch: 'ぁ', i: 7, ch: 'は', ret: {cont: false, ins: 4 +1}},
	{a: [
		{ch: '㍿'}, {ch: 'こ'}, {ch: 'の'}, {ch: '春'}, {ch: 'か'}, {ch: 'ら'},
		{ch: 'ぁ'},//ぶら
		{ch: 'は'},//非ぶら
		// (仮改行)
		{ch: 'ぃ'},//ぶら2
	], p_i: 7, p_ch: 'は', i: 8, ch: 'ぃ', ret: {cont: false, ins: 6 +1}},
	{a: [
		{ch: '㍿'}, {ch: 'こ'}, {ch: 'の'}, {ch: '春'}, {ch: 'か'}, {ch: 'ら'},
		{ch: 'ぁ'},//ぶら
		{ch: 'は'},//非ぶら
		{ch: 'ぃ'},//ぶら2
		// (仮改行)
		{ch: '一'},
	], p_i: 8, p_ch: 'ぃ', i: 9, ch: '一', ret: {cont: false, ins: 6 +1}},


	// ぶら下げx3
	//ぶら3 は三つめ以降、ぶら下げ・行頭禁則諦める
	{a: [
		{ch: '㍿'}, {ch: 'こ'}, {ch: 'の'}, {ch: '春'}, {ch: 'か'}, {ch: 'ら'},
		// (仮改行)
		{ch: 'ぁ'},//ぶら
		{ch: 'ぃ'},//ぶら2
		{ch: 'ぅ'},//ぶら3
		{ch: '一'}, {ch: '年'},
	], p_i: 5, p_ch: 'ら', i: 6, ch: 'ぁ', ret: {cont: false, ins: 3 +1}},
	{a: [
		{ch: '㍿'}, {ch: 'こ'}, {ch: 'の'}, {ch: '春'}, {ch: 'か'}, {ch: 'ら'},
		{ch: 'ぁ'},//ぶら
		// (仮改行)
		{ch: 'ぃ'},//ぶら2
		{ch: 'ぅ'},//ぶら3
		{ch: '一'}, {ch: '年'},
	], p_i: 6, p_ch: 'ぁ', i: 7, ch: 'ぃ', ret: {cont: false, ins: 4 +1}},
	{a: [
		{ch: '㍿'}, {ch: 'こ'}, {ch: 'の'}, {ch: '春'}, {ch: 'か'}, {ch: 'ら'},
		{ch: 'ぁ'},//ぶら
		{ch: 'ぃ'},//ぶら2
		// (仮改行)
		{ch: 'ぅ'},//ぶら3
		{ch: '一'}, {ch: '年'},
	], p_i: 7, p_ch: 'ぃ', i: 8, ch: 'ぅ', ret: {cont: false, ins: 7 +1}},
	{a: [
		{ch: '㍿'}, {ch: 'こ'}, {ch: 'の'}, {ch: '春'}, {ch: 'か'}, {ch: 'ら'},
		{ch: 'ぁ'},//ぶら
		{ch: 'ぃ'},//ぶら2
		{ch: 'ぅ'},//ぶら3
		// (仮改行)
		{ch: '一'}, {ch: '年'},
	], p_i: 8, p_ch: 'ぅ', i: 9, ch: '一', ret: {cont: false, ins: 8 +1}},


	// 追い出し（分割禁止）
		// 分割禁止文字 != ぶら下げ文字、ぽい。厳守すれば普通に追い出される
	{a: [
		{ch: '…'}, {ch: '…'}, {ch: '☀'}, {ch: '☂'},
		{ch: '春'}, {ch: 'か'},
	], p_i: 3, p_ch: '☂', i: 4, ch: '春', ret: {cont: false, ins: 1 +1}},
	{a: [	// 分割禁止
		{ch: '㍿'}, {ch: '…'}, {ch: '…'}, {ch: '☂'},
		{ch: '春'}, {ch: 'か'},
	], p_i: 3, p_ch: '☂', i: 4, ch: '春', ret: {cont: false, ins: 0 +1}},
	{a: [
		{ch: '㍿'}, {ch: '☀'}, {ch: '…'}, {ch: '…'},
		{ch: '春'}, {ch: 'か'},
	], p_i: 3, p_ch: '…', i: 4, ch: '春', ret: {cont: false, ins: 1 +1}},
	{a: [
		{ch: '㍿'}, {ch: '☀'}, {ch: 'こ'}, {ch: '…'},
		{ch: '…'}, {ch: 'か'},
	], p_i: 3, p_ch: '…', i: 4, ch: '…', ret: {cont: false, ins: 1 +1}},
	{a: [
		{ch: '㍿'}, {ch: '☀'}, {ch: 'こ'}, {ch: 'の'},
		{ch: '…'}, {ch: 'か'},
	], p_i: 3, p_ch: 'の', i: 4, ch: '…', ret: {cont: false, ins: 1 +1}},
	{a: [
		{ch: '㍿'}, {ch: '☀'}, {ch: 'こ'}, {ch: 'の'},
		{ch: '…'}, {ch: '…'},
	], p_i: 3, p_ch: 'の', i: 4, ch: '…', ret: {cont: false, ins: 1 +1}},

	// ぶら下げ＋末尾行末禁則は、行末禁則文字 != ぶら下げ文字、なので問題なし

	// 非ぶら下げ＋末尾行末禁則
	{a: [
		{ch: '㍿'}, {ch: '☀'}, {ch: '〈'}, {ch: 'こ'}, {ch: 'の'},
		{ch: '春'}, {ch: 'か'},
	], p_i: 4, p_ch: 'の', i: 5, ch: '春', ret: {cont: false, ins: 1 +1}},
	{a: [	// 末尾行末禁則が続く場合
		{ch: '㍿'}, {ch: '『'}, {ch: '〈'}, {ch: 'こ'}, {ch: 'の'},
		{ch: '春'}, {ch: 'か'},
	], p_i: 4, p_ch: 'の', i: 5, ch: '春', ret: {cont: false, ins: 0 +1}},
	{a: [	// 末尾行末禁則が続く場合＋ルビ
		{ch: '㍿'}, {ch: '『'}, {ch: 'ル'}, {ch: 'ル', rt: true}, {ch: '〈'}, {ch: 'こ'}, {ch: 'の'},
		{ch: '春'}, {ch: 'か'},
	], p_i: 6, p_ch: 'の', i: 7, ch: '春', ret: {cont: false, ins: 2 +1}},

])('p_i:$p_i:$p_ch i:$i:$ch $ret', ({a, i, ch: _, p_i, p_ch, ret})=> {
	expect(kin.hyphAlgBura(a, p_i, p_ch, i)).toStrictEqual(ret);
});

//MARK: ルビ文字と改行
it.each(<{
	a	: T_KIN_CH[];
	p_i	: number;
	p_ch: string;
	i	: number;	// i >= 2
	ch	: string;
	ret	: {cont: boolean; ins: number};}[]>[
	//	字字（仮改行）ル（ル がルビ）
	{a: [
		{ch: '㍿'}, {ch: 'こ'}, {ch: 'の'}, {ch: '春'},
		{ch: 'ル'}, {ch: 'ル', rt: true},
	], p_i: 3, p_ch: '春', i: 4, ch: 'ル', ret: {cont: false, ins: 1 +1}},
	{a: [
		{ch: '㍿'}, {ch: '〈'},//末禁
		{ch: 'の'}, {ch: '春'},
		{ch: 'ル'}, {ch: 'ル', rt: true},
	], p_i: 3, p_ch: '春', i: 4, ch: 'ル', ret: {cont: false, ins: 0 +1}},
	//	字ル（仮改行）字（ル がルビ）
	{a: [
		{ch: '㍿'}, {ch: 'こ'}, {ch: 'の'},
		{ch: 'ビ'}, {ch: 'ビ', rt: true},
		{ch: '〉'},
	], p_i: 3, p_ch: 'ビ', i: 5, ch: '〉', ret: {cont: false, ins: 1 +1}},
	{a: [
		{ch: '㍿'}, {ch: '〈'},//末禁
		{ch: 'の'},
		{ch: 'ビ'}, {ch: 'ビ', rt: true},
		{ch: '〉'},
	], p_i: 3, p_ch: 'ビ', i: 5, ch: '〉', ret: {cont: false, ins: 0 +1}},
	//	字ル（仮改行）ル（ル がルビ）
	{a: [
		{ch: '㍿'}, {ch: 'こ'}, {ch: 'の'},
		{ch: 'ビ'}, {ch: 'ビ', rt: true},
		{ch: 'ル'}, {ch: 'ル', rt: true},
	], p_i: 3, p_ch: 'ビ', i: 5, ch: 'ル', ret: {cont: false, ins: 1 +1}},
	{a: [
		{ch: '㍿'}, {ch: '〈'},//末禁
		{ch: 'の'},
		{ch: 'ビ'}, {ch: 'ビ', rt: true},
		{ch: 'ル'}, {ch: 'ル', rt: true},
	], p_i: 3, p_ch: 'ビ', i: 5, ch: 'ル', ret: {cont: false, ins: 0 +1}},
	//	ル字（仮改行）字（ル がルビ）
	{a: [
		{ch: '㍿'}, {ch: 'こ'},
		{ch: 'コ'}, {ch: 'コ', rt: true},
		{ch: '末'}, {ch: '頭'},
	], p_i: 4, p_ch: '末', i: 5, ch: '頭', ret: {cont: false, ins: 1 +1}},
	{a: [
		{ch: '㍿'}, {ch: '〈'},//末禁
		{ch: 'コ'}, {ch: 'コ', rt: true},
		{ch: '末'}, {ch: '頭'},
	], p_i: 4, p_ch: '末', i: 5, ch: '頭', ret: {cont: false, ins: 0 +1}},
	//	ル字（仮改行）ル（ル がルビ）
	{a: [
		{ch: '㍿'}, {ch: 'こ'},
		{ch: 'コ'}, {ch: 'コ', rt: true},
		{ch: '末'},
		{ch: 'ル'}, {ch: 'ル', rt: true},
	], p_i: 4, p_ch: '末', i: 5, ch: 'ル', ret: {cont: false, ins: 1 +1}},
	{a: [
		{ch: '㍿'}, {ch: '〈'},//末禁
		{ch: 'コ'}, {ch: 'コ', rt: true},
		{ch: '末'},
		{ch: 'ル'}, {ch: 'ル', rt: true},
	], p_i: 4, p_ch: '末', i: 5, ch: 'ル', ret: {cont: false, ins: 0 +1}},
	//	ルル（仮改行）字（ル がルビ）
	{a: [
		{ch: '㍿'}, {ch: 'こ'},
		{ch: 'コ'}, {ch: 'コ', rt: true},
		{ch: 'ビ'}, {ch: 'ビ', rt: true},
		{ch: '頭'},
	], p_i: 4, p_ch: 'ビ', i: 6, ch: '頭', ret: {cont: false, ins: 1 +1}},
	{a: [
		{ch: '㍿'}, {ch: '〈'},//末禁
		{ch: 'コ'}, {ch: 'コ', rt: true},
		{ch: 'ビ'}, {ch: 'ビ', rt: true},
		{ch: '頭'},
	], p_i: 4, p_ch: 'ビ', i: 6, ch: '頭', ret: {cont: false, ins: 0 +1}},
	//	ルル（仮改行）ル（ル がルビ）
	{a: [
		{ch: '㍿'}, {ch: 'こ'},
		{ch: 'コ'}, {ch: 'コ', rt: true},
		{ch: 'ビ'}, {ch: 'ビ', rt: true},
		{ch: 'ル'}, {ch: 'ル', rt: true},
	], p_i: 4, p_ch: 'ビ', i: 6, ch: 'ル', ret: {cont: false, ins: 1 +1}},
	{a: [
		{ch: '㍿'}, {ch: '〈'},//末禁
		{ch: 'コ'}, {ch: 'コ', rt: true},
		{ch: 'ビ'}, {ch: 'ビ', rt: true},
		{ch: 'ル'}, {ch: 'ル', rt: true},
	], p_i: 4, p_ch: 'ビ', i: 6, ch: 'ル', ret: {cont: false, ins: 0 +1}},

])('p_i:$p_i:$p_ch i:$i:$ch $ret', ({a, i, ch: _, p_i, p_ch, ret})=> {
	expect(kin.hyphAlgBura(a, p_i, p_ch, i)).toStrictEqual(ret);
});

//MARK: ぶら下げ&設定変更
// def行頭禁則 == defぶら下げ なので、初期値ではテストにならない。少し変えてテスト
it.each(<{
	a	: T_KIN_CH[];
	p_i	: number;
	p_ch: string;
	i	: number;	// i >= 2
	ch	: string;
	ret	: {cont: boolean; ins: number};}[]>[
	// ぶら下げ＋行頭禁則（ぶら下げ）
	{a: [
		{ch: '☀'}, {ch: 'こ'}, {ch: 'の'}, {ch: '春'},
		// (仮改行)
		{ch: 'ぁ'},//ぶら
		{ch: '』'},//頭禁
		{ch: '　'}, {ch: 'か'}, {ch: 'ら'},
	], p_i: 3, p_ch: '春', i: 4, ch: 'ぁ', ret: {cont: false, ins: 1 +1}},

	// ぶら下げx2 ＋(仮改行)＋ 行頭禁則 ＋ ぶら下げ -> 行頭あきらめる
	{a: [
		{ch: '☀'}, {ch: 'こ'}, {ch: 'の'}, {ch: '春'},
		{ch: 'ぁ'},//ぶら
		{ch: 'ぃ'},//ぶら2
		// (仮改行)
		{ch: '』'},//頭禁
		{ch: 'か'}, {ch: 'ら'},
	], p_i: 5, p_ch: 'ぃ', i: 6, ch: '』', ret: {cont: false, ins: 5 +1}},

	// 非ぶら下げ ＋ ぶら下げ ＋(仮改行)＋ ぶら下げ ＋ 行頭禁則
	{a: [
		{ch: '☀'}, {ch: 'こ'}, {ch: 'の'}, {ch: '春'},
		{ch: 'ぁ'},//ぶら
		// (仮改行)
		{ch: 'ぃ'},//ぶら2
		{ch: '』'},//頭禁
		{ch: 'か'}, {ch: 'ら'},
	], p_i: 4, p_ch: 'ぁ', i: 5, ch: 'ぃ', ret: {cont: false, ins: 2 +1}},

	// 非ぶら下げx2 ＋(仮改行)＋ ぶら下げx2 ＋ 行頭禁則
	{a: [
		{ch: '☀'}, {ch: 'こ'}, {ch: 'の'}, {ch: '春'},
		// (仮改行)
		{ch: 'ぁ'},//ぶら
		{ch: 'ぃ'},//ぶら2
		{ch: '』'},//頭禁
		{ch: 'か'}, {ch: 'ら'},
	], p_i: 3, p_ch: '春', i: 4, ch: 'ぁ', ret: {cont: false, ins: 1 +1}},

	// ぶら下げ ＋ 非ぶら下げ ＋(仮改行)
	{a: [
		{ch: '☀'}, {ch: 'こ'}, {ch: 'の'},
		{ch: 'ぁ'},//ぶら
		{ch: '春'},
		// (仮改行)
		{ch: 'か'},
	], p_i: 4, p_ch: '春', i: 5, ch: 'か', ret: {cont: false, ins: 3 +1}},
	// ぶら下げ ＋(仮改行)
	{a: [
		{ch: '☀'}, {ch: 'こ'}, {ch: 'の'},
		{ch: 'ぁ'},//ぶら
		// (仮改行)
		{ch: '春'}, {ch: 'か'},
	], p_i: 3, p_ch: 'ぁ', i: 4, ch: '春', ret: {cont: false, ins: 1 +1}},
	// (仮改行)＋ ぶら下げ
	{a: [
		{ch: '☀'}, {ch: 'こ'}, {ch: 'の'},
		// (仮改行)
		{ch: 'ぁ'},//ぶら
		{ch: '春'}, {ch: 'か'},
	], p_i: 2, p_ch: 'の', i: 3, ch: 'ぁ', ret: {cont: false, ins: 0 +1}},

	// 非ぶら下げx2 ＋(仮改行)＋ 行頭禁則（ぶら下げ）
	{a: [
		{ch: '☀'}, {ch: 'こ'}, {ch: 'の'},//非ぶ
		{ch: '春'},//非ぶ
		// (仮改行)
		{ch: 'ゞ'},//頭禁
		{ch: 'か'}, {ch: 'ら'}, {ch: '☀'},
	], p_i: 3, p_ch: '春', i: 4, ch: 'ゞ', ret: {cont: false, ins: 1 +1}},

])('p_i:$p_i:$p_ch i:$i:$ch $ret', ({a, i, ch: _, p_i, p_ch, ret})=> {
	const kinBura = new Kinsoku({bura: 'ぁぃぅぇぉ'});
	expect(kinBura.hyphAlgBura(a, p_i, p_ch, i)).toStrictEqual(ret);
});

//MARK: scan（DOM計測ループの抽象化。TxtLayer.tsxのapplyKinsoku()が繰り返し呼ぶ1回ぶんの走査）
it('scan_noBreak', ()=> {
	const a: T_KIN_CH[] = [{ch: '㍿'}, {ch: 'こ'}, {ch: 'の'}, {ch: '春'}];
	expect(kin.scan(a, [0, 1, 2, 3], false, 2)).toBeNull();
});

it('scan_findsEolViolationAndComputesResumeAt', ()=> {
	// 本家テスト「追い出し（行末禁則）」と同じ入力（p_i:2 p_ch:'〈' i:3 ch:'春' → ins:2）
	const a: T_KIN_CH[] = [{ch: '㍿'}, {ch: 'こ'}, {ch: '〈'}, {ch: '春'}];
	expect(kin.scan(a, [0, 1, 2, -1], false, 2)).toEqual({ins: 2, resumeAt: 4});	// i=3で折り返し（xyが減る）
});

it('scan_afterBrSkipsKinsokuCheck', ()=> {
	// [r]由来の改行直後は追い出し判定をしない
	const a: T_KIN_CH[] = [{ch: '㍿'}, {ch: 'こ'}, {ch: '〈'}, {ch: '春', afterBr: true}];
	expect(kin.scan(a, [0, 1, 2, -1], false, 2)).toBeNull();
});

it('scan_skipsRtElements', ()=> {
	// ルビ要素は改行検出そのものの対象外（座標がどんな値でも無視される）
	const a: T_KIN_CH[] = [{ch: '㍿'}, {ch: 'ル'}, {ch: 'ル', rt: true}, {ch: '〈'}];
	expect(kin.scan(a, [0, 1, 999, 2], false, 2)).toBeNull();
});

it('scan_resumesFromGivenIndex', ()=> {
	// 前回<br>を挿した続きから走査する（fromより手前は見ない）
	const a: T_KIN_CH[] = [{ch: '㍿'}, {ch: 'こ'}, {ch: '〈'}, {ch: '春'}];
	expect(kin.scan(a, [0, 1, 2, -1], false, 4)).toBeNull();	// i=3の違反地点より後ろから始める
});

it('scan_自然折返し受理後は新しい行を基準に測る', ()=> {
	// 実測 add_fx「無名 fx はレイヤスコープで…」の再現。1行目末が禁則でない折返し
	//	（cont=true で受理）のあと、同じ行の途中に行頭禁則「ー」（コープの長音符）がある。
	//	折返し受理時に sl_xy を更新しないと「ー」を新行頭と誤認して「コ」の手前へ
	//	<br> を誤挿入し、「…レイヤス」で大きく余った改行になっていた
	const a: T_KIN_CH[] = [
		{ch: 'あ'}, {ch: 'い'}, {ch: 'う'}, {ch: 'え'}, {ch: 'お'},	// 1行目 x=0,10,20,30,40
		{ch: 'X'}, {ch: 'コ'}, {ch: 'ー'}, {ch: 'プ'},				// 2行目 x=0,10,20,30
	];
	const xy = [0, 10, 20, 30, 40, 0, 10, 20, 30];
	expect(kin.scan(a, xy, false, 2)).toBeNull();	// 2行目は収まっている＝<br>不要
});

//MARK: 禁則の競合
it('ぶら下げと行末禁則の重複1', ()=> {	// 禁則の競合（ぶら下げ と 行末禁則 の両方に含まれる文字があってはならない）
	expect(()=> chkKinsoku('】', DEF_KINSOKU.dns, DEF_KINSOKU.bura))
	.toThrow('禁則の競合があります。文字 】 がぶら下げ と 行末禁則 の両方に含まれます');
});
it('ぶら下げと行末禁則の重複2', ()=> {	// 禁則の競合（ぶら下げ と 行末禁則 の両方に含まれる文字があってはならない）
	expect(()=> chkKinsoku(DEF_KINSOKU.eol, DEF_KINSOKU.dns, '【'))
	.toThrow('禁則の競合があります。文字 【 がぶら下げ と 行末禁則 の両方に含まれます');
});

it('ぶら下げと分割禁止の重複1', ()=> {	// 禁則の競合（ぶら下げ と 分割禁止 の両方に含まれる文字があってはならない）
	expect(()=> chkKinsoku(DEF_KINSOKU.eol, '】', DEF_KINSOKU.bura))
	.toThrow('禁則の競合があります。文字 】 がぶら下げ と 分割禁止 の両方に含まれます');
});
it('ぶら下げと分割禁止の重複2', ()=> {	// 禁則の競合（ぶら下げ と 分割禁止 の両方に含まれる文字があってはならない）
	expect(()=> chkKinsoku(DEF_KINSOKU.eol, DEF_KINSOKU.dns, '─'))
	.toThrow('禁則の競合があります。文字 ─ がぶら下げ と 分割禁止 の両方に含まれます');
});
