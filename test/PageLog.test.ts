/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2026-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

// ページログ（読み戻り）の純粋部分。本家 Reading.ts:207 recodePage() ／ :526 page()。
//	しおりの復元・スクリプトのfetchはScriptMngの担当なのでE2E（page.e2e.ts）で、
//	ここで見るのは「どのページへ動くか」の勘定だけ。

import {PageLog, type T_PAGE_TO} from '../src/ts/PageLog';
import type {T_MARK} from '../src/ts/SaveMng';

import {expect, it} from 'bun:test';


const mark = (s: string): T_MARK => ({hSave: {}, sPages: s, aIfStk: [], json: {}});
// 'a','b','c' の3ページを積んだログ（位置は最新＝2）
function lg3(max = 100) {
	const lg = new PageLog(()=> max);
	for (const [i, c] of ['a', 'b', 'c'].entries()) lg.push('main', i * 10, mark(c), false);
	return lg;
}
// 動いた先の目印（sPagesへ入れた文字）
const to = (lg: PageLog, t: T_PAGE_TO)=> lg.move(t)?.mark.sPages;


it('push_積むたび最新ページを指す', ()=> {
	const lg = lg3();
	expect(lg.len).toBe(3);
	expect(lg.pos).toBe(2);
	expect(lg.isPaging).toBe(false);	// 最新を見ている＝読み戻り中ではない
});

it('push_同じ位置は積み直さない', ()=> {
	// 本家 recodePage() の findIndex 判定。[page]で戻って演じ直しても増えないための仕掛け
	const lg = lg3();
	lg.push('main', 10, mark('b2'), false);
	expect(lg.len).toBe(3);
});

it('push_max_lenを超えたら古い方から捨てる', ()=> {
	const lg = lg3(2);
	expect(lg.len).toBe(2);
	expect(to(lg, 'oldest')).toBe('b');	// 'a'は落ちている
});

it('move_prev_next', ()=> {
	const lg = lg3();
	expect(to(lg, 'prev')).toBe('b');
	expect(lg.isPaging).toBe(true);
	expect(to(lg, 'prev')).toBe('a');

	expect(to(lg, 'next')).toBe('b');
	expect(to(lg, 'next')).toBe('c');
	expect(lg.isPaging).toBe(false);
});

it('move_端では動かないが、今のページは返す', ()=> {
	// **返すのは「演じ直すページ」**。位置が動かなくても今のページを返すのは、
	//	[page]へ来た時点で（[p]の直後なら）本文がすでに消えているため（PageLog.tsのコメント）
	const lg = lg3();
	expect(to(lg, 'next')).toBe('c');	// すでに最新
	expect(lg.pos).toBe(2);

	lg.move('oldest');
	expect(to(lg, 'prev')).toBe('a');	// すでに先頭
	expect(lg.pos).toBe(0);
});

it('move_oldest_newest_exit', ()=> {
	const lg = lg3();
	expect(to(lg, 'oldest')).toBe('a');
	expect(to(lg, 'newest')).toBe('c');

	lg.move('oldest');
	expect(to(lg, 'exit')).toBe('c');	// exitも最新へ戻る（そこで読み戻りが終わる）
	expect(lg.isPaging).toBe(false);
});

it('move_loadは見ているページより後を捨てる', ()=> {
	// 「ここから再開」。本家も aPage を切り詰めてページ移動状態を抜ける
	const lg = lg3();
	lg.move('prev');
	expect(to(lg, 'load')).toBe('b');
	expect(lg.len).toBe(2);
	expect(lg.pos).toBe(1);
	expect(lg.isPaging).toBe(false);	// 最新＝見ていたページになった
});

it('clear_空にすると何もできない', ()=> {
	// [page clear=true]。本編を始める前などに呼び、タイトル画面まで戻れてしまうのを防ぐ
	const lg = lg3();
	lg.clear();
	expect(lg.len).toBe(0);
	expect(lg.isPaging).toBe(false);
	for (const t of ['prev', 'next', 'oldest', 'newest', 'exit', 'load'] as const) {
		expect(lg.move(t)).toBeUndefined();
	}
});

it('json_位置だけを出す', ()=> {
	// sys:const.sn.aPageLog。しおりの中身は巨大なので載せない
	expect(JSON.parse(lg3().json())).toEqual([
		{fn: 'main', idx: 0, place: 0},
		{fn: 'main', idx: 10, place: 1},
		{fn: 'main', idx: 20, place: 2},
	]);
});
