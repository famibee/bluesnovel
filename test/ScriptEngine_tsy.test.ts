/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2026-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

// トゥイーンアニメ（[tsy]/[wait_tsy]/[stop_tsy]/[pause_tsy]/[resume_tsy]）の、
//	エンジンが担当する部分＝属性の解釈と検査。本家 LayerMng.ts:798 #tsy() ＋ CmnTween.ts。
//	実際にアニメを回すのはScriptMng（GSAP）なので、動きそのものはE2E（tsy.e2e.ts）。
//	相対指定（'=100'）はレイヤの現在値が要るためScriptMng側で解決する＝ここではrelフラグまで

import {ScriptEngine, type T_ENGINE_ACTION} from '../src/ts/ScriptEngine';
import {cnvTweenArg, easeToGsap, tsyName} from '../src/ts/Tsy';

import {expect, it} from 'bun:test';


const LAYS = '[add_lay layer=base class=grp][add_lay layer=mes class=txt]';
function acts(src: string): T_ENGINE_ACTION[] {return new ScriptEngine('t1', src).step()}
function tsy(src: string) {
	return acts(`${LAYS}${src}[s]`).find(v=> v.t === 'tsy') as Extract<T_ENGINE_ACTION, {t: 'tsy'}>;
}


// ============ Tsy.ts（純粋部分） ============

it('cnvTweenArg_absolute', ()=> {
	expect(cnvTweenArg('tsy', {left: '500', alpha: '0.5'}))
		.toEqual({left: {v: 500, rel: false}, alpha: {v: 0.5, rel: false}});
});

it('cnvTweenArg_relative', ()=> {
	// '=500'は「現在値に+500」。現在値はここでは解決しない
	expect(cnvTweenArg('tsy', {left: '=500'})).toEqual({left: {v: 500, rel: true}});
	expect(cnvTweenArg('tsy', {left: '=-500'})).toEqual({left: {v: -500, rel: true}});
});

it('cnvTweenArg_random', ()=> {
	// '250,500'は250〜500のランダム
	for (let i = 0; i < 20; ++i) {
		const v = cnvTweenArg('tsy', {top: '250,500'}).top!.v;
		expect(v).toBeGreaterThanOrEqual(250);
		expect(v).toBeLessThanOrEqual(501);	// 本家の式（Math.round(rnd*(v1-v0+1))）そのまま
	}
});

it('cnvTweenArg_xyAlias', ()=> {
	// 本家 aLayerPrpNm はx/yで、bluesnovelのレイヤ属性はleft/top。x/yも別名として受ける
	expect(cnvTweenArg('tsy', {x: '10', y: '20'}))
		.toEqual({left: {v: 10, rel: false}, top: {v: 20, rel: false}});
	// 明示のleft/topがあればそちらが勝つ
	expect(cnvTweenArg('tsy', {left: '1', x: '10'})).toEqual({left: {v: 1, rel: false}});
});

it('cnvTweenArg_ignoresEmptyAndUnknown', ()=> {
	// 未指定・空文字は「その属性は動かさない」（本家 `if (! arg) continue`）。
	//	トゥイーン対象外の属性（visibleやpic）はそもそも見ない
	expect(cnvTweenArg('tsy', {left: '', visible: 'false', pic: 'a'})).toEqual({});
});

it('cnvTweenArg_notNumber', ()=> {
	expect(()=> cnvTweenArg('tsy', {left: 'もじ'})).toThrow('[tsy] leftの値が不正です');
});

it('easeToGsap_maps', ()=> {
	// tween.jsのQuadratic/Cubic/Quartic/QuinticはGSAPのpower1〜4に一対一で対応する
	expect(easeToGsap(undefined)).toBe('none');
	expect(easeToGsap('Linear.None')).toBe('none');
	expect(easeToGsap('Quadratic.Out')).toBe('power1.out');
	expect(easeToGsap('Quintic.InOut')).toBe('power4.inOut');
	expect(easeToGsap('Sinusoidal.In')).toBe('sine.in');
	expect(easeToGsap('Exponential.Out')).toBe('expo.out');
	expect(easeToGsap('Circular.In')).toBe('circ.in');
	expect(easeToGsap('Back.Out')).toBe('back.out');	// 本家 ext_fg.sn が使う
	expect(easeToGsap('Bounce.InOut')).toBe('bounce.inOut');
	expect(easeToGsap('Elastic.In')).toBe('elastic.in');
});

it('easeToGsap_throws', ()=> {
	expect(()=> easeToGsap('Nazo.Out')).toThrow('異常なease指定です');
	expect(()=> easeToGsap('Back')).toThrow('異常なease指定です');
});

it('tsyName_defaultsToLayer', ()=> {
	expect(tsyName('tsy', {layer: 'base'})).toBe('base');
	expect(tsyName('tsy', {layer: 'base', name: 'tw1'})).toBe('tw1');
	expect(()=> tsyName('wait_tsy', {})).toThrow('[wait_tsy] トゥイーンが指定されていません');
});


// ============ [tsy] ============

it('tsy_pushesAction', ()=> {
	expect(tsy('[tsy layer=base time=500 left=100 alpha=0]')).toEqual({
		t: 'tsy', tw_nm: 'base', nm: 'base', page: 'fore',
		msec: 500, delay: 0, ease: 'none', repeat: 0, yoyo: false,
		hTo: {alpha: {v: 0, rel: false}, left: {v: 100, rel: false}},
	});
});

it('tsy_doesNotStop', ()=> {
	// [tsy]自体は待たない（本家も false を返す）。待つのは[wait_tsy]
	const a = acts(`${LAYS}[tsy layer=base time=500 left=100]あ[s]`);
	expect(a.some(v=> v.t === 'chgStr' && v.str === 'あ')).toBe(true);
});

it('tsy_layerRequired', ()=> {
	expect(()=> tsy('[tsy time=500 left=100]')).toThrow('[tsy] layerは必須です');
});

it('tsy_timeRequired', ()=> {
	expect(()=> tsy('[tsy layer=base left=100]')).toThrow('[tsy] timeの値が不正です');
});

it('tsy_name', ()=> {
	// name指定時はトゥイーン名がそちらになる（1レイヤに複数トゥイーンを名前で使い分ける）
	expect(tsy('[tsy layer=base name=tw1 time=500 left=100]').tw_nm).toBe('tw1');
});

it('tsy_page', ()=> {
	// 本家は表ページ固定（pg.fore）だが、bluesnovelはpage指定も受ける
	expect(tsy('[tsy layer=base time=500 left=100]').page).toBe('fore');
	expect(tsy('[tsy layer=base page=back time=500 left=100]').page).toBe('back');
});

it('tsy_repeatAndYoyo', ()=> {
	// 本家は「repeat=1で計1回」なのでtween.jsへrepeat-1を渡す。GSAPも同じ規約
	expect(tsy('[tsy layer=base time=500 left=100]').repeat).toBe(0);		// 省略値1 → 0
	expect(tsy('[tsy layer=base time=500 left=100 repeat=3]').repeat).toBe(2);
	expect(tsy('[tsy layer=base time=500 left=100 repeat=0]').repeat).toBe(-1);	// 0以下は無限
	expect(tsy('[tsy layer=base time=500 left=100 yoyo=true]').yoyo).toBe(true);
});

it('tsy_delayAndEase', ()=> {
	const a = tsy('[tsy layer=base time=500 left=100 delay=200 ease=Back.Out]');
	expect(a.delay).toBe(200);
	expect(a.ease).toBe('back.out');
});

it('tsy_skippingMakesItInstant', ()=> {
	// 既読スキップ中は演出時間0＝即座に終了状態へ（本家 CmnTween.tween() の isSkipping 判定）
	const a = acts(`&sn.skip.all = true\n&sn.skip.enabled = true\n${LAYS}[tsy layer=base time=9000 delay=9000 left=100][s]`)
		.find(v=> v.t === 'tsy') as Extract<T_ENGINE_ACTION, {t: 'tsy'}>;
	expect(a.msec).toBe(0);
	expect(a.delay).toBe(0);
	expect(a.hTo).toEqual({left: {v: 100, rel: false}});	// 目標値そのものは変わらない
});


// ============ [wait_tsy] / [stop_tsy] / [pause_tsy] / [resume_tsy] ============

it('waitTsy_stops', ()=> {
	// [wt]と同じく、実際に待つのはScriptMngなのでstep()はここで一旦返る
	const a = acts(`${LAYS}[tsy layer=base time=500 left=100][wait_tsy layer=base]あ[s]`);
	expect(a.at(-1)).toEqual({t: 'waitTsy', tw_nm: 'base', canskip: true});
	expect(a.some(v=> v.t === 'chgStr' && v.str === 'あ')).toBe(false);
});

it('waitTsy_canskipFalse', ()=> {
	expect(acts(`${LAYS}[wait_tsy layer=base canskip=false][s]`).at(-1))
		.toEqual({t: 'waitTsy', tw_nm: 'base', canskip: false});
});

it('waitTsy_resumes', ()=> {
	const se = new ScriptEngine('t1', `${LAYS}[wait_tsy layer=base]あ[s]`);
	se.step();
	expect(se.step().some(v=> v.t === 'chgStr' && v.str === 'あ')).toBe(true);
});

it('stopTsy', ()=> {
	// [stop_tsy]は待たない（本家も false を返す）
	const a = acts(`${LAYS}[stop_tsy layer=base]あ[s]`);
	expect(a.find(v=> v.t === 'stopTsy')).toEqual({t: 'stopTsy', tw_nm: 'base'});
	expect(a.some(v=> v.t === 'chgStr' && v.str === 'あ')).toBe(true);
});

it('pauseAndResumeTsy', ()=> {
	const a = acts(`${LAYS}[pause_tsy name=tw1][resume_tsy name=tw1][s]`);
	expect(a.filter(v=> v.t === 'pauseTsy')).toEqual([
		{t: 'pauseTsy', tw_nm: 'tw1', paused: true},
		{t: 'pauseTsy', tw_nm: 'tw1', paused: false},
	]);
});

it('tsy_reservedAsMacroName', ()=> {
	expect(()=> acts('[macro name=wait_tsy][s]'))
		.toThrow('[wait_tsy]はタグ名のため、マクロ名として使用できません');
});
