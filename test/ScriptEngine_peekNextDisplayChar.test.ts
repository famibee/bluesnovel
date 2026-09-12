/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2026-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

// 禁則処理の番兵用先読み（ScriptEngine.ts peekNextDisplayChar()）の検証。
//	TxtLayer.tsxのapplyKinsoku()がダミー空白の代わりに使う「[l]直後に実際に表示される1文字」を
//	正しく拾えるか、拾えないケースでundefinedへ倒すかを見る（src/docs/text-rendering.md
//	「[l]境界をまたぐ禁則ズレ」参照）。peekUpcomingPicFnと同じ「実行を伴わない先読み」の
//	枠組みなので、test/ScriptEngine_preload.test.tsと同じ形式で書く

import {ScriptEngine} from '../src/ts/ScriptEngine';

import {expect, it} from 'bun:test';


const LAYS = '[add_lay layer=base class=grp][add_lay layer=mes class=txt]';

it('peekNextDisplayChar_plainTextAfterL', ()=> {
	const se = new ScriptEngine('t1', `${LAYS}あ[l]、そのあと`);
	se.step();	// [l]まで進む
	expect(se.peekNextDisplayChar()).toBe('、');
});

it('peekNextDisplayChar_skipsNewlineAndTab', ()=> {
	const se = new ScriptEngine('t1', `${LAYS}あ[l]\n\t、`);
	se.step();
	expect(se.peekNextDisplayChar()).toBe('、');
});

it('peekNextDisplayChar_undefinedAtTag', ()=> {
	// 次がタグ（[lay]等）：実行しないと文字に寄与するか分からないので諦める
	const se = new ScriptEngine('t1', `${LAYS}あ[l][lay layer=base fn=bg1]、`);
	se.step();
	expect(se.peekNextDisplayChar()).toBeUndefined();
});

it('peekNextDisplayChar_undefinedAtVarExpansion', ()=> {
	// 「&式&」は実行時評価まで文字が定まらない
	const se = new ScriptEngine('t1', `${LAYS}あ[l]&"、"&`);
	se.step();
	expect(se.peekNextDisplayChar()).toBeUndefined();
});

it('peekNextDisplayChar_undefinedAtComment', ()=> {
	// コメントは表示に寄与しないが、\n/\tと違って読み飛ばさず諦める（best-effortの簡略化。
	//	本来のコメント直後の実文字までは見に行かない）
	const se = new ScriptEngine('t1', `${LAYS}あ[l];コメント\n、`);
	se.step();
	expect(se.peekNextDisplayChar()).toBeUndefined();
});

it('peekNextDisplayChar_undefinedAtScriptEnd', ()=> {
	const se = new ScriptEngine('t1', `${LAYS}あ[l]`);
	se.step();
	expect(se.peekNextDisplayChar()).toBeUndefined();
});
