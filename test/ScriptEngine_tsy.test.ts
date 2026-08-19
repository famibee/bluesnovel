/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2026-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

// トゥイーンアニメ（[tsy]/[wait_tsy]/[stop_tsy]/[pause_tsy]/[resume_tsy]）の、
//	エンジンが担当する部分＝属性の解釈と検査。本家 LayerMng.ts:798 #tsy() ＋ CmnTween.ts。
//	実際にアニメを回すのはScriptMng（motion）なので、動きそのものはE2E（tsy.e2e.ts）。
//	相対指定（'=100'）はレイヤの現在値が要るためScriptMng側で解決する＝ここではrelフラグまで

import {ScriptEngine, type T_ENGINE_ACTION} from '../src/ts/ScriptEngine';
import {A_TSY_FRM_PRP, chkEase, cnvTweenArg, easeFn, parseTsyPath, tsyName} from '../src/ts/Tsy';

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

it('chkEase_normalizes', ()=> {
	expect(chkEase(undefined)).toBe('Linear.None');	// 本家の既定も Linear.None（＝等速）
	expect(chkEase('Back.Out')).toBe('Back.Out');	// 本家 ext_fg.sn が使う
});

it('chkEase_throws', ()=> {
	expect(()=> chkEase('Nazo.Out')).toThrow('異常なease指定です');
	expect(()=> chkEase('Back')).toThrow('異常なease指定です');
});

it('easeFn_maps', ()=> {
	// 本家 tween.js の Easing 実装をそのまま移植した式なので、代表値で数値一致を確認する
	expect(easeFn(undefined)(0.5)).toBe(0.5);	// 未指定＝Linear.None（等速）
	expect(easeFn('Linear.None')(0.3)).toBe(0.3);
	expect(easeFn('Quadratic.Out')(0.5)).toBeCloseTo(0.75);
	expect(easeFn('Quadratic.In')(0.5)).toBeCloseTo(0.25);
	expect(easeFn('Sinusoidal.In')(0)).toBeCloseTo(0);
	expect(easeFn('Circular.Out')(1)).toBeCloseTo(1);
	// 端点（0→0、1→1）はどのイージングも共通で成り立つ
	for (const nm of ['Back.InOut', 'Bounce.Out', 'Elastic.In', 'Exponential.InOut', 'Quintic.Out']) {
		expect(easeFn(nm)(0)).toBeCloseTo(0);
		expect(easeFn(nm)(1)).toBeCloseTo(1);
	}
});

it('easeFn_throws', ()=> {
	expect(()=> easeFn('Nazo.Out')).toThrow('異常なease指定です');
});

it('tsyName_defaultsToLayer', ()=> {
	expect(tsyName('tsy', {layer: 'base'})).toBe('base');
	expect(tsyName('tsy', {layer: 'base', name: 'tw1'})).toBe('tw1');
	expect(()=> tsyName('wait_tsy', {})).toThrow('[wait_tsy] トゥイーンが指定されていません');
});

it('tsyName_frame', ()=> {
	// フレームは id から `frm\nID`（改行入りでレイヤ名と絶対にぶつからない。本家 #tw_nm()）
	expect(tsyName('tsy_frame', {id: 'yesno'})).toBe('frm\nyesno');
	expect(tsyName('wait_tsy', {id: 'yesno', layer: 'base'})).toBe('frm\nyesno');	// idが優先
});


// ============ [tsy path=…]（経路。Tsy.ts parseTsyPath()） ============

it('parseTsyPath_xyAlpha', ()=> {
	// `(x,y,alpha)` を並べる書式。x/yはレイヤではleft/topの別名
	expect(parseTsyPath('tsy', '(100,200,0.5) (0,0)')).toEqual([
		{left: {v: 100, rel: false}, top: {v: 200, rel: false}, alpha: {v: 0.5, rel: false}},
		{left: {v: 0, rel: false}, top: {v: 0, rel: false}},
	]);
});

it('parseTsyPath_omittedAndRelative', ()=> {
	// テンプレの fg_squat が書く形：`(,=50) (,=0)`＝xを省いてyだけ動かす。
	//	相対はどの区間も**開始値**が基準なので、`(,=0)`が「元の位置へ戻る」になる
	expect(parseTsyPath('tsy', '(,=50) (,=0)')).toEqual([
		{top: {v: 50, rel: true}},
		{top: {v: 0, rel: true}},
	]);
});

it('parseTsyPath_quotedValue', ()=> {
	// テンプレの fg_shake が書く形：`("=-5,5")`＝引用符で括った相対＋ランダム
	const [seg] = parseTsyPath('tsy', `("=-5,5")`);
	expect(seg!.left!.rel).toBe(true);
	expect(seg!.left!.v).toBeGreaterThanOrEqual(-5);
	expect(seg!.left!.v).toBeLessThanOrEqual(6);	// 本家の式（Math.round(rnd*(v1-v0+1))）そのまま
});

it('parseTsyPath_json', ()=> {
	// `{…}`のJSON書式なら、x/y/alpha以外の属性も動かせる
	expect(parseTsyPath('tsy', '{"rotation": 90, "scale_x": "=1"}')).toEqual([
		{rotation: {v: 90, rel: false}, scale_x: {v: 1, rel: true}},
	]);
});

it('parseTsyPath_brokenJsonThrows', ()=> {
	// 本家はconsole.errorへ流してその区間を捨てるが、こちらは書き間違いをその場で知らせる
	expect(()=> parseTsyPath('tsy', '{"x": }')).toThrow('[tsy] path内のJSONが不正です');
});

it('parseTsyPath_framePrp', ()=> {
	// フレーム側はx/yが実名（left/topへの読み替えをしない）
	expect(parseTsyPath('tsy_frame', '(10,20)', A_TSY_FRM_PRP)).toEqual([
		{x: {v: 10, rel: false}, y: {v: 20, rel: false}},
	]);
});


// ============ [tsy] ============

it('tsy_pushesAction', ()=> {
	expect(tsy('[tsy layer=base time=500 left=100 alpha=0]')).toEqual({
		t: 'tsy', tw_nm: 'base', nm: 'base', page: 'fore',
		msec: 500, delay: 0, ease: 'Linear.None', repeat: 0, yoyo: false, backlay: false,
		hTo: {alpha: {v: 0, rel: false}, left: {v: 100, rel: false}},
	});
});

it('tsy_backlay', ()=> {
	// backlay省略時はfalse。trueを書けばそのまま渡る（実際に裏へ反映するのはScriptMng側）
	expect(tsy('[tsy layer=base time=500 left=100]').backlay).toBe(false);
	expect(tsy('[tsy layer=base time=500 left=100 backlay=true]').backlay).toBe(true);
});

it('tsy_filter', ()=> {
	// [tsy filter=…]は[lay filter=…]と同じaddFilterアクションを、トゥイーン本体より先に積む
	//	（本家同様、開始と同時に一度だけ差し替える副作用。値をアニメーションさせるわけではない）
	const a = acts(`${LAYS}[tsy layer=base time=500 left=100 filter=blur]あ[s]`);
	const i = a.findIndex(v=> v.t === 'addFilter');
	expect(i).toBeGreaterThanOrEqual(0);
	expect(a[a.findIndex(v=> v.t === 'tsy')]).toBeDefined();
	expect(i).toBeLessThan(a.findIndex(v=> v.t === 'tsy'));
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
	// 本家は「repeat=1で計1回」なのでtween.jsへrepeat-1を渡す。motionも同じ規約
	expect(tsy('[tsy layer=base time=500 left=100]').repeat).toBe(0);		// 省略値1 → 0
	expect(tsy('[tsy layer=base time=500 left=100 repeat=3]').repeat).toBe(2);
	expect(tsy('[tsy layer=base time=500 left=100 repeat=0]').repeat).toBe(Infinity);	// 0以下は無限
	expect(tsy('[tsy layer=base time=500 left=100 yoyo=true]').yoyo).toBe(true);
});

it('tsy_delayAndEase', ()=> {
	const a = tsy('[tsy layer=base time=500 left=100 delay=200 ease=Back.Out]');
	expect(a.delay).toBe(200);
	expect(a.ease).toBe('Back.Out');
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

it('tsy_pathAndChain', ()=> {
	const a = tsy(`[tsy layer=base time=500 left=100 path='(,=50) (,=0)' chain=other]`);
	expect(a.hTo).toEqual({left: {v: 100, rel: false}});	// 第1区間はタグ属性そのもの
	expect(a.aPath).toEqual([{top: {v: 50, rel: true}}, {top: {v: 0, rel: true}}]);
	expect(a.chain).toBe('other');
});

it('tsy_noPathNoChainKeysAbsent', ()=> {
	// 未指定なら**属性ごと**積まない（exactOptionalPropertyTypes。他タグの流儀と揃える）
	const a = tsy('[tsy layer=base time=500 left=100]');
	expect('aPath' in a).toBe(false);
	expect('chain' in a).toBe(false);
});


// ============ [tsy_frame] ============

// [tsy_frame]は読み込み済みのフレームにしか掛けられない。FrameMngがやること（組み込み変数の
//	書き戻し）をエンジンの外から与えて「読み込み済み」に見せる（ScriptEngine_frame.test.ts と同じ流儀）
function tsyFrm(src: string) {
	const se = new ScriptEngine('t1', `${src}[s]`);
	se.setValNochk('const.sn.frm.yesno', true);
	return se.step().find(v=> v.t === 'tsyFrame') as Extract<T_ENGINE_ACTION, {t: 'tsyFrame'}>;
}

it('tsyFrame_pushesAction', ()=> {
	expect(tsyFrm('[tsy_frame id=yesno time=500 x=100 alpha=0]')).toEqual({
		t: 'tsyFrame', tw_nm: 'frm\nyesno', id: 'yesno',
		msec: 500, delay: 0, ease: 'Linear.None', repeat: 0, yoyo: false,
		hTo: {x: {v: 100, rel: false}, alpha: {v: 0, rel: false}},
	});
});

it('tsyFrame_ownPrpNames', ()=> {
	// フレームはleft/topではなくx/y、rotationではなくrotate（本家 #tsy_frame()）
	expect(tsyFrm('[tsy_frame id=yesno time=500 y=20 rotate=90 scale_x=2 width=100 height=50]').hTo)
		.toEqual({
			y: {v: 20, rel: false}, rotate: {v: 90, rel: false},
			scale_x: {v: 2, rel: false}, width: {v: 100, rel: false}, height: {v: 50, rel: false},
		});
	// レイヤ側の名前は拾わない
	expect(tsyFrm('[tsy_frame id=yesno time=500 left=10 rotation=90]').hTo).toEqual({});
});

it('tsyFrame_requiresLoadedFrame', ()=> {
	expect(()=> new ScriptEngine('t1', '[tsy_frame id=nai time=500 x=1][s]').step())
		.toThrow('[tsy_frame] frame【nai】が読み込まれていません');
	expect(()=> new ScriptEngine('t1', '[tsy_frame time=500][s]').step())
		.toThrow('[tsy_frame] idは必須です');
});

it('tsy_reservedAsMacroName', ()=> {
	expect(()=> acts('[macro name=wait_tsy][s]'))
		.toThrow('[wait_tsy]はタグ名のため、マクロ名として使用できません');
});
