/* ***** BEGIN LICENSE BLOCK *****
Copyright (c) 2026-2026 Famibee (famibee.blog38.fc2.com)

This software is released under the MIT License.
http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

// プラグインレイヤー（[add_lay class=…]に本家互換のaddLayClsで登録された任意cls）の
//	ScriptEngine側の扱い。中身（3Dシーン等）はDOM側（PlgLayMng）が持つのでエンジンは関知しない。
//	ここではエンジンだけで完結する部分＝class検査・属性ハッシュの丸ごと転送（layPlg）・
//	grp/txt専用属性を巻き込まないことを確認する

import {ScriptEngine} from '../src/ts/ScriptEngine';
import {addLayCls, clearPlgLayCls} from '../src/sn/LayCls';
import type {Layer} from '../src/sn/Layer';

import {afterEach, beforeEach, expect, it} from 'bun:test';


beforeEach(()=> {
	// ScriptEngineはaddLayCls()の登録有無（hasLayCls）しか見ないので、
	//	工場関数はダミーでよい（DOM/documentに触れない）
	addLayCls('dmy', ()=> ({}) as unknown as Layer);
});
afterEach(()=> {
	clearPlgLayCls();
});


it('add_lay_pluginClsRegistersAndEmitsLayPlgTwice', ()=> {
	// [add_lay]は本家 Pages コンストラクタ（f.lay/b.lay）と同じく表裏2回ぶんlayPlgを積む。
	//	位置・寸法系属性を一つも書いていないので、プラグインレイヤーの既定（箱をステージ全体へ
	//	フィット）のchgLayも表裏それぞれに挟まる（window.width/heightはテスト環境に無いのでNaN）。
	//	isPlgの[add_lay]はisWait対応のためstep()をここで打ち切る（'stop'）ので、[s]は
	//	次のstep()呼び出しに回る
	const se = new ScriptEngine('t1', '[add_lay layer=x class=dmy][s]');
	const a = se.step();
	expect(a).toEqual([
		{t: 'addLay', cls: 'dmy', nm: 'x'},
		{t: 'chgLay', nm: 'x', page: 'fore', sty: {left: 0, top: 0, width: NaN, height: NaN}},
		{t: 'layPlg', nm: 'x', page: 'fore', hArg: {layer: 'x', class: 'dmy'}},
		{t: 'chgLay', nm: 'x', page: 'back', sty: {left: 0, top: 0, width: NaN, height: NaN}},
		{t: 'layPlg', nm: 'x', page: 'back', hArg: {layer: 'x', class: 'dmy'}},
	]);
	expect(se.step()).toEqual([{t: 'stop', kind: 's', key: 't1:2', nm: 'mes'}]);
});

it('add_lay_unknownClsThrows', ()=> {
	const se = new ScriptEngine('t1', '[add_lay layer=x class=unknown][s]');
	expect(()=> se.step()).toThrow('[add_lay] 属性 class【unknown】が不正です。レイヤクラスが登録されていません');
});

it('lay_pluginLayer_emitsLayPlgWithRawAttrs_notChgPic', ()=> {
	// [lay layer=x foo=1 fn=model.gltf]：fn=はプラグイン独自解釈（本家[lay type=gltf fn=…]相当）
	//	なので、grp専用のchgPicを積んではいけない（積むとstore側でfindLay(…,'grp')が例外になる）。
	//	isPlgの[add_lay]/[lay]はそれぞれstep()を打ち切るので、[lay]の分は2回目のstep()に出る
	const se = new ScriptEngine('t1', '[add_lay layer=x class=dmy][lay layer=x foo=1 fn=model.gltf][s]');
	const a1 = se.step();
	const a2 = se.step();
	const aLayPlg = [...a1, ...a2].filter(v=> v.t === 'layPlg');
	expect(aLayPlg).toEqual([
		{t: 'layPlg', nm: 'x', page: 'fore', hArg: {layer: 'x', class: 'dmy'}},
		{t: 'layPlg', nm: 'x', page: 'back', hArg: {layer: 'x', class: 'dmy'}},
		{t: 'layPlg', nm: 'x', page: 'fore', hArg: {layer: 'x', foo: '1', fn: 'model.gltf'}},
	]);
	expect(a1.some(v=> v.t === 'chgPic')).toBe(false);
	expect(a2.some(v=> v.t === 'chgPic')).toBe(false);
});

it('lay_pluginLayer_commonStyStillApplies', ()=> {
	// 共通の見た目（left/alpha等）は「箱」（components/Layer.tsx）が持つのでプラグインにも効く。
	//	[add_lay]で1回step()を消費するので、[lay]の結果は2回目のstep()を見る
	const se = new ScriptEngine('t1', '[add_lay layer=x class=dmy][lay layer=x left=10 alpha=0.5][s]');
	se.step();
	const a = se.step();
	expect(a).toContainEqual({t: 'chgLay', nm: 'x', page: 'fore', sty: {left: 10, alpha: 0.5}});
	expect(a).toContainEqual({t: 'layPlg', nm: 'x', page: 'fore', hArg: {layer: 'x', left: '10', alpha: '0.5'}});
});

it('lay_pluginLayer_txtOnlyAttrsIgnoredNotThrown', ()=> {
	// b_color等の文字レイヤ専用属性は、プラグインレイヤーへ来てもエンジン側では無視する
	//	（store.chgLayが `! isTxtLay(e)` で弾くのはgrp/txtへの誤指定を知らせるためで、
	//	 プラグイン向けはそもそもchgLayのstyに積まない設計）。
	//	[add_lay]自身が積む既定サイズのchgLay（表裏2つ）はb_colorと無関係なので対象外
	const se = new ScriptEngine('t1', '[add_lay layer=x class=dmy][lay layer=x b_color=0xffffff][s]');
	const a1 = se.step();
	const a2 = se.step();
	const aChgLay = [...a1, ...a2].filter(v=> v.t === 'chgLay');
	expect(aChgLay).toHaveLength(2);	// [add_lay]の表裏ぶんのみ
	expect(aChgLay.every(v=> ! ('b_color' in v.sty))).toBe(true);
});
