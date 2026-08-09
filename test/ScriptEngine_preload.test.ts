/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2026-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

// 画像の先読み（ScriptMng.ts #preloadUpcomingPics()）が使う、次の停止点までに出てきそうな
//	画像の論理名fnを集めるpure関数の検証。実際にfetch/Imageで温める側はDOM依存なのでE2E
//	（test/e2e/pic.e2e.ts）の担当、ここは「何を集めるか」だけを見る

import {ScriptEngine} from '../src/ts/ScriptEngine';

import {expect, it} from 'bun:test';


const LAYS = '[add_lay layer=base class=grp][add_lay layer=mes class=txt]';

it('peekUpcomingPicFn_collectsFnUntilNextStop', ()=> {
	const se = new ScriptEngine('t1', `${LAYS}[lay layer=base fn=bg1]あ[l][lay layer=base fn=bg2]い[l]`);
	// 開始直後（[l]も[p]も未到達）：最初の[l]までのfnだけを拾う
	expect(se.peekUpcomingPicFn()).toEqual(['bg1']);

	se.step();	// 最初の[l]まで進む
	expect(se.peekUpcomingPicFn()).toEqual(['bg2']);
});

it('peekUpcomingPicFn_picIsAliasOfFn', ()=> {
	// picはfnの旧仕様互換名。両方指定時はfnを優先（ScriptEngine.ts #execTag 'lay'と同じ規約）
	const se = new ScriptEngine('t1', `${LAYS}[lay layer=base pic=bg1]あ[l]`);
	expect(se.peekUpcomingPicFn()).toEqual(['bg1']);
});

it('peekUpcomingPicFn_stopsAtL_P_S_Waitclick', ()=> {
	for (const stop of ['l', 'p', 's', 'waitclick']) {
		const se = new ScriptEngine('t1', `${LAYS}[${stop}][lay layer=base fn=after]あ`);
		expect(se.peekUpcomingPicFn()).toEqual([]);
	}
});

it('peekUpcomingPicFn_resolvesFace', ()=> {
	// [add_face]で定義したface名は、実体のfnへ解決してから返す
	const se = new ScriptEngine('t1', `${LAYS}[add_face layer=base name=smile fn=face_smile]`
		+ `[lay layer=base fn=body face=smile]あ[l]`);
	expect(se.peekUpcomingPicFn()).toEqual(['body', 'face_smile']);
});

it('peekUpcomingPicFn_ignoresDynamicValues', ()=> {
	// 「&式」「%マクロ引数」は実行しないと解決できないので、そのまま無視する（best-effort）
	const se = new ScriptEngine('t1', `${LAYS}[lay layer=base fn=&"bg" +"1"&]あ[l]`);
	expect(se.peekUpcomingPicFn()).toEqual([]);
});

it('peekUpcomingPicFn_collectsBothIfBranches', ()=> {
	// 実際にどちらへ進むかは実行しないと分からないので、[if]の両分岐とも拾う（多めに拾って安全側に振る）
	const se = new ScriptEngine('t1', `${LAYS}[if exp="1==1"][lay layer=base fn=a][else][lay layer=base fn=b][endif]あ[l]`);
	expect(se.peekUpcomingPicFn()).toEqual(['a', 'b']);
});

it('peekUpcomingPicFn_emptyAtScriptEnd', ()=> {
	const se = new ScriptEngine('t1', `${LAYS}[lay layer=base fn=bg1]あ[s]`);
	se.step();	// [s]（スクリプト終端相当）まで進む
	expect(se.peekUpcomingPicFn()).toEqual([]);
});
