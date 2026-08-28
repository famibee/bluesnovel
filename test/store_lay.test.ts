/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2026-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

// ストア側でしか解けないレイヤ操作＝「現在の並び」が要るもの。
//	[lay float=/index=/dive=]の重なり順と、[clear_lay]のlayer省略（＝全レイヤ）。
//	zustandのcreate()はDOMを要らないので、ここはユニットテストで直接触れる
//	（描画順がDOMの並びに落ちるところはE2E側＝lay.e2e.ts）。
//	本家：LayerMng.ts:489 #lay() の float/index/dive

import {useStore} from '../src/store/store';
import {isGrpLay, isTxtLay} from '../src/components/Lay';
import {bldFx} from '../src/ts/Fx';

import {beforeEach, expect, it} from 'bun:test';


const S = ()=> useStore.getState();
// レイヤを3枚。配列の並びがそのまま描画順（後ろほど手前）
beforeEach(()=> {
	useStore.setState({aPage: [[], []], foreIdx: 0});
	for (const nm of ['a', 'b', 'c']) S().addLayer({cls: 'grp', nm, fn: '', src: '', isSheet: false, isMovie: false, aFace: []});
});
// 表裏それぞれの並び。**両面が常に同じ順**であることが他の処理の前提
const order = ()=> useStore.getState().aPage.map(a=> a.map(e=> e.nm).join(''));


it('moveLay_float', ()=> {
	S().moveLay({nm: 'a', mode: 'float'});
	expect(order()).toEqual(['bca', 'bca']);	// 最前面＝配列の末尾へ
});

it('moveLay_floatOnTopIsNoop', ()=> {
	S().moveLay({nm: 'c', mode: 'float'});
	expect(order()).toEqual(['abc', 'abc']);
});

it('moveLay_index', ()=> {
	S().moveLay({nm: 'c', mode: 'index', index: 1});
	expect(order()).toEqual(['acb', 'acb']);
});

it('moveLay_indexClamped', ()=> {
	// 範囲外は端へ丸める（本家はpixiのsetChildIndexが例外を投げるが、
	//	シナリオを止めるほどではないので丸める側にした）
	S().moveLay({nm: 'a', mode: 'index', index: 99});
	expect(order()).toEqual(['bca', 'bca']);
});

it('moveLay_diveBelowLater', ()=> {
	// aを「cのすぐ下」へ。aが抜けた分cは1つ下がるので、行き先は index 1
	S().moveLay({nm: 'a', mode: 'dive', dive: 'c'});
	expect(order()).toEqual(['bac', 'bac']);
});

it('moveLay_diveBelowEarlier', ()=> {
	// cを「aのすぐ下」へ＝最背面
	S().moveLay({nm: 'c', mode: 'dive', dive: 'a'});
	expect(order()).toEqual(['cab', 'cab']);
});

it('moveLay_diveSameThrows', ()=> {
	expect(()=> S().moveLay({nm: 'a', mode: 'dive', dive: 'a'}))
		.toThrow('[lay] 属性 layerとdiveが同じ【a】です');
});

it('moveLay_diveUnknownThrows', ()=> {
	expect(()=> S().moveLay({nm: 'a', mode: 'dive', dive: 'zz'}))
		.toThrow('[lay] 属性 dive【zz】が不正です');
});

it('moveLay_unknownLayerThrows', ()=> {
	expect(()=> S().moveLay({nm: 'zz', mode: 'float'})).toThrow('存在しないレイヤ zz です');
});


it('chgLay_leftAloneClearsStaleAlignX', ()=> {
	// [lay pos=]等でalign_x='center'を立てた後、align_xを伴わずleftだけ更新する呼び出し
	//	（[tsy left=]が代表例）が来たら、古いalign_xは消えるべき（left/align_xは排他）。
	//	消え残ると新しいleftへ古い-50%translateが二重に乗って表示位置がずれる
	S().chgLay({nm: 'a', page: 'fore', sty: {left: 375, align_x: 'center'}});
	S().chgLay({nm: 'a', page: 'fore', sty: {left: 87}});

	const e = useStore.getState().aPage[0].find(e=> e.nm === 'a');
	expect(e?.left).toBe(87);
	expect(e?.align_x).toBeUndefined();
});

it('chgLay_leftWithAlignXOverwrites', ()=> {
	// align_xを伴う呼び出し（[lay center=/right=]相当）は普通に上書きする
	S().chgLay({nm: 'a', page: 'fore', sty: {left: 375, align_x: 'center'}});
	S().chgLay({nm: 'a', page: 'fore', sty: {left: 100, align_x: 'right'}});

	const e = useStore.getState().aPage[0].find(e=> e.nm === 'a');
	expect(e?.left).toBe(100);
	expect(e?.align_x).toBe('right');
});

it('chgLay_topAloneClearsStaleAlignY', ()=> {
	S().chgLay({nm: 'a', page: 'fore', sty: {top: 480, align_y: 'bottom'}});
	S().chgLay({nm: 'a', page: 'fore', sty: {top: 50}});

	const e = useStore.getState().aPage[0].find(e=> e.nm === 'a');
	expect(e?.top).toBe(50);
	expect(e?.align_y).toBeUndefined();
});


it('clearLay_allLayers', ()=> {
	S().chgPic({nm: 'a', page: 'fore', fn: 'pa', src: '/pa.png', isSheet: false, isMovie: false, aFace: []});
	S().chgPic({nm: 'c', page: 'fore', fn: 'pc', src: '/pc.png', isSheet: false, isMovie: false, aFace: []});
	S().chgLay({nm: 'a', page: 'fore', sty: {left: 10, visible: false}});

	S().clearLay({aLayNm: null, page: 'fore'});	// layer省略＝全レイヤ

	const fore = useStore.getState().aPage[0];
	expect(fore.map(e=> isGrpLay(e) ? e.fn : '')).toEqual(['', '', '']);
	// 見た目は「未指定」へ戻すが、**visibleだけは触らない**（本家 Layer.clearLay()）
	expect(fore[0]!.left).toBeUndefined();
	expect(fore[0]!.visible).toBe(false);
});

it('clearLay_dropsWidthHeight', ()=> {
	// [lay width=/height=]もA_LAY_STY_KEY経由でclearLayが消す対象（visible以外の見た目の一部）
	S().chgLay({nm: 'a', page: 'fore', sty: {width: 320, height: 240}});

	S().clearLay({aLayNm: ['a'], page: 'fore'});

	const e = useStore.getState().aPage[0].find(e=> e.nm === 'a');
	expect(e?.width).toBeUndefined();
	expect(e?.height).toBeUndefined();
});

it('clearLay_someLayers', ()=> {
	S().chgPic({nm: 'a', page: 'fore', fn: 'pa', src: '/pa.png', isSheet: false, isMovie: false, aFace: []});
	S().chgPic({nm: 'c', page: 'fore', fn: 'pc', src: '/pc.png', isSheet: false, isMovie: false, aFace: []});

	S().clearLay({aLayNm: ['a'], page: 'fore'});

	const fore = useStore.getState().aPage[0];
	expect(fore.map(e=> isGrpLay(e) ? e.fn : '')).toEqual(['', '', 'pc']);
});

it('clearLay_unknownLayerThrows', ()=> {
	expect(()=> S().clearLay({aLayNm: ['zz'], page: 'fore'})).toThrow('存在しないレイヤ zz です');
});


// ============ フィルター（[add_filter]系） ============

const FLT1 = {css: 'sepia(1)', enabled: true};
const FLT2 = {css: 'blur(2px)', enabled: true};
const aFltOf = (nm: string, page: 0 | 1 = 0)=>
	useStore.getState().aPage[page].find(e=> e.nm === nm)?.aFlt;

it('chgFilter_addStacks', ()=> {
	S().chgFilter({aLayNm: ['a'], page: 'fore', mode: 'add', flt: FLT1});
	S().chgFilter({aLayNm: ['a'], page: 'fore', mode: 'add', flt: FLT2});
	expect(aFltOf('a')).toEqual([FLT1, FLT2]);	// 重ねる（重なり順＝配列順）
	expect(aFltOf('b')).toBeUndefined();
});

it('chgFilter_replaceIsOne', ()=> {
	// [lay filter=…]は置き換え（本家 Layer.lay()）
	S().chgFilter({aLayNm: ['a'], page: 'fore', mode: 'add', flt: FLT1});
	S().chgFilter({aLayNm: ['a'], page: 'fore', mode: 'replace', flt: FLT2});
	expect(aFltOf('a')).toEqual([FLT2]);
});

it('chgFilter_clear', ()=> {
	S().chgFilter({aLayNm: ['a'], page: 'fore', mode: 'add', flt: FLT1});
	S().chgFilter({aLayNm: ['a'], page: 'fore', mode: 'clear'});
	expect(aFltOf('a')).toBeUndefined();
});

it('chgFilter_bothPages', ()=> {
	// 本家 ext_fg2.sn の [add_filter layer=… page=both filter=…] と同じ形
	S().chgFilter({aLayNm: ['a'], page: 'both', mode: 'add', flt: FLT1});
	expect(aFltOf('a', 0)).toEqual([FLT1]);
	expect(aFltOf('a', 1)).toEqual([FLT1]);
});

it('chgFilter_allLayers', ()=> {
	S().chgFilter({aLayNm: null, page: 'fore', mode: 'add', flt: FLT1});
	expect(useStore.getState().aPage[0].map(e=> e.aFlt)).toEqual([[FLT1], [FLT1], [FLT1]]);
});

it('chgFilter_enable', ()=> {
	S().chgFilter({aLayNm: ['a'], page: 'fore', mode: 'add', flt: FLT1});
	S().chgFilter({aLayNm: ['a'], page: 'fore', mode: 'add', flt: FLT2});
	S().chgFilter({aLayNm: ['a'], page: 'fore', mode: 'enable', index: 1, enabled: false});
	expect(aFltOf('a')).toEqual([FLT1, {...FLT2, enabled: false}]);
});

it('chgFilter_enableChecks', ()=> {
	// 本家 #enable_filter2() と同じ検査
	expect(()=> S().chgFilter({aLayNm: ['a'], page: 'fore', mode: 'enable', index: 0}))
		.toThrow('a にフィルターがありません');

	S().chgFilter({aLayNm: ['a'], page: 'fore', mode: 'add', flt: FLT1});
	expect(()=> S().chgFilter({aLayNm: ['a'], page: 'fore', mode: 'enable', index: 3}))
		.toThrow('a のフィルターの個数（1）を越えています');
});

it('chgFilter_clearLayDropsFilters', ()=> {
	// [clear_lay]は見た目を「未指定」へ戻すので、フィルターも一緒に落ちる
	S().chgFilter({aLayNm: ['a'], page: 'fore', mode: 'add', flt: FLT1});
	S().clearLay({aLayNm: ['a'], page: 'fore'});
	expect(aFltOf('a')).toBeUndefined();
});


// ============ 立ち絵シェーダエフェクト（[add_fx]/[clear_fx]。分家独自の試作） ============
//	bldFx() の検査・既定値は test/ScriptEngine_fx.test.ts。ここは「現在の並び」が要るもの＝
//	無名 fx の #fxN 採番（レイヤスコープ）と、しおり(getPagesJson/replace)の round-trip。

const fxOf = (nm: string, page: 0 | 1 = 0)=>
	useStore.getState().aPage[page].find(e=> e.nm === nm)?.aFx;
const addFx = (nm: string, args: {[k: string]: string}, page: 'fore' | 'both' = 'fore')=>
	S().chgFx({aLayNm: [nm], page, mode: 'add', fx: bldFx(args)});

it('chgFx_無名はレイヤスコープで #fxN を採番', ()=> {
	addFx('a', {fx: 'wave'});
	addFx('a', {fx: 'rgbShift'});
	expect(fxOf('a')!.map(f=> f.name)).toEqual(['#fx1', '#fx2']);
	// 別レイヤは独立採番（同定は「どのレイヤの aFx か」＋ name）
	addFx('b', {fx: 'wave'});
	expect(fxOf('b')!.map(f=> f.name)).toEqual(['#fx1']);
});

it('chgFx_名前つきは同名置換・無名と混在できる', ()=> {
	addFx('a', {fx: 'wave', name: 'w'});
	addFx('a', {fx: 'rgbShift'});				// → #fx1
	addFx('a', {fx: 'wave', name: 'w', amp: '20'});	// 'w' を置換
	expect(fxOf('a')!.map(f=> f.name)).toEqual(['w', '#fx1']);
	expect(fxOf('a')![0]).toMatchObject({params: {amp: 20}});
});

it('chgFx_採番は既存 #fxN の最大+1（クリアで空けた番号は詰めない）', ()=> {
	addFx('a', {fx: 'wave'});		// #fx1
	addFx('a', {fx: 'wave'});		// #fx2
	S().chgFx({aLayNm: ['a'], page: 'fore', mode: 'clear', names: ['#fx1']});
	addFx('a', {fx: 'wave'});		// 最大(2)+1 = #fx3
	expect(fxOf('a')!.map(f=> f.name)).toEqual(['#fx2', '#fx3']);
});

it('chgFx_clear name= は #fxN を実質狙えない（layer 単位でのみ落ちる）', ()=> {
	addFx('a', {fx: 'wave'});			// #fx1（無名）
	addFx('a', {fx: 'wave', name: 'w'});
	S().chgFx({aLayNm: ['a'], page: 'fore', mode: 'clear', names: ['w']});
	expect(fxOf('a')!.map(f=> f.name)).toEqual(['#fx1']);	// 無名は残る
	S().chgFx({aLayNm: ['a'], page: 'fore', mode: 'clear', names: null});
	expect(fxOf('a')).toBeUndefined();					// layer 単位なら全部
});

it('chgFx_しおり round-trip で #fxN が復元される（別カウンタを持たない）', ()=> {
	addFx('a', {fx: 'wave'});
	addFx('a', {fx: 'rgbShift', name: 'rs'});
	const json = S().getPagesJson();
	useStore.setState({aPage: [[], []], foreIdx: 0});
	S().replace(json);
	expect(fxOf('a')).toEqual([
		{name: '#fx1', fx: 'wave', glsl: '', time: 0, speed: 1, enabled: true, params: {amp: 6, freq: 2}},
		{name: 'rs', fx: 'rgbShift', glsl: '', time: 0, speed: 1, enabled: true, params: {shift: 4}},
	]);
	// round-trip 後も採番が続く（#fx1 の次は #fx2）
	addFx('a', {fx: 'wave'});
	expect(fxOf('a')!.map(f=> f.name)).toEqual(['#fx1', 'rs', '#fx2']);
});

it('chgFx_page=both は表裏に同名の #fxN を複製', ()=> {
	addFx('a', {fx: 'wave'}, 'both');
	expect(fxOf('a', 0)!.map(f=> f.name)).toEqual(['#fx1']);
	expect(fxOf('a', 1)!.map(f=> f.name)).toEqual(['#fx1']);
});

it('chgFx_enable モード（[pause_fx]/[resume_fx]）は enabled だけ差し替える', ()=> {
	addFx('a', {fx: 'wave', name: 'w'});
	addFx('a', {fx: 'rgbShift'});		// #fx1
	// name= 指定：一致名だけ
	S().chgFx({aLayNm: ['a'], page: 'fore', mode: 'enable', names: ['w'], enabled: false});
	expect(fxOf('a')!.map(f=> f.enabled)).toEqual([false, true]);
	// index= 指定：そのレイヤの N 番目
	S().chgFx({aLayNm: ['a'], page: 'fore', mode: 'enable', index: 1, enabled: false});
	expect(fxOf('a')!.map(f=> f.enabled)).toEqual([false, false]);
	// name/index 省略：全部
	S().chgFx({aLayNm: ['a'], page: 'fore', mode: 'enable', enabled: true});
	expect(fxOf('a')!.map(f=> f.enabled)).toEqual([true, true]);
	// index 範囲外は throw（[enable_filter] と同じ文言）
	expect(()=> S().chgFx({aLayNm: ['a'], page: 'fore', mode: 'enable', index: 5, enabled: false}))
		.toThrow('の fx の個数（2）を越えています');
});

it('chgFx_[clear_lay] で aFx が落ちる（A_LAY_STY_KEY 経由）', ()=> {
	addFx('a', {fx: 'wave'});
	S().clearLay({aLayNm: ['a'], page: 'fore'});
	expect(fxOf('a')).toBeUndefined();
});


// ============ 文字レイヤ背後の枠画像・背景の不透明度 ============
//	[lay b_pic=…]／[lay b_alpha=/b_alpha_isfixed=]。描画（どちらを優先するか、掛け算するか）は
//	TxtLayer側だが、値の持ち方はここ。[clear_lay]で捨てられることも見る

it('chgBPic_setsAndClears', ()=> {
	useStore.setState({aPage: [[], []], foreIdx: 0});
	S().addLayer({cls: 'txt', nm: 'mes', str: '', aCh: [], b_alpha: 1, enabled: true, aBtn: []});

	S().chgBPic({nm: 'mes', page: 'fore', fn: 'wafuu1', src: '/theme/wafuu1.png'});
	const lay = ()=> useStore.getState().aPage[0].find(e=> e.nm === 'mes')!;
	expect(lay()).toMatchObject({b_pic: 'wafuu1', b_src: '/theme/wafuu1.png'});

	S().chgBPic({nm: 'mes', page: 'fore', fn: '', src: ''});
	expect(lay()).toMatchObject({b_pic: '', b_src: ''});
});

it('chgBAlpha_writesOnlyWhatWasGiven', ()=> {
	useStore.setState({aPage: [[], []], foreIdx: 0});
	S().addLayer({cls: 'txt', nm: 'mes', str: '', aCh: [], b_alpha: 1, enabled: true, aBtn: []});
	const lay = ()=> useStore.getState().aPage[0].find(e=> e.nm === 'mes')!;

	S().chgBAlpha({nm: 'mes', page: 'fore', isFixed: true});	// b_alphaは触らない
	expect(lay()).toMatchObject({b_alpha: 1, b_alpha_isfixed: true});

	S().chgBAlpha({nm: 'mes', page: 'fore', b_alpha: 0.4});	// isFixedは触らない
	expect(lay()).toMatchObject({b_alpha: 0.4, b_alpha_isfixed: true});
});

it('clearLay_dropsBackPicAndFixedFlag', ()=> {
	useStore.setState({aPage: [[], []], foreIdx: 0});
	S().addLayer({cls: 'txt', nm: 'mes', str: '', aCh: [], b_alpha: 1, enabled: true, aBtn: []});
	S().chgBPic({nm: 'mes', page: 'fore', fn: 'wafuu1', src: '/theme/wafuu1.png'});
	S().chgBAlpha({nm: 'mes', page: 'fore', b_alpha: 0.4, isFixed: true});

	S().clearLay({aLayNm: null, page: 'fore'});
	const lay = useStore.getState().aPage[0].find(e=> e.nm === 'mes')!;
	if (! isTxtLay(lay)) throw '文字レイヤのはず';
	expect(lay.b_pic).toBeUndefined();
	expect(lay.b_src).toBeUndefined();
	expect(lay.b_alpha_isfixed).toBeUndefined();
	expect(lay.b_alpha).toBe(1);
});

it('chgBackClear_resetsBackground', ()=> {
	// [lay back_clear=true]：b_color/b_pic/b_srcは消え、b_alphaは0（透明）、
	//	b_alpha_isfixedはfalseになる（本家 TxtLayer.ts:376-385）
	useStore.setState({aPage: [[], []], foreIdx: 0});
	S().addLayer({cls: 'txt', nm: 'mes', str: '', aCh: [], b_alpha: 1, enabled: true, aBtn: []});
	S().chgBPic({nm: 'mes', page: 'fore', fn: 'wafuu1', src: '/theme/wafuu1.png'});
	S().chgBAlpha({nm: 'mes', page: 'fore', b_alpha: 0.4, isFixed: true});
	S().chgLay({nm: 'mes', page: 'fore', sty: {b_color: 0xffffff}});

	S().chgBackClear({nm: 'mes', page: 'fore'});
	const lay = useStore.getState().aPage[0].find(e=> e.nm === 'mes')!;
	if (! isTxtLay(lay)) throw '文字レイヤのはず';
	expect(lay.b_color).toBeUndefined();
	expect(lay.b_pic).toBeUndefined();
	expect(lay.b_src).toBeUndefined();
	expect(lay.b_alpha_isfixed).toBe(false);
	expect(lay.b_alpha).toBe(0);
});

// ===== [button]のnm（Reactのkey）＝ストア側で振る通し番号 =====
//	本家にボタン名の概念は無い。ここのnmはStage.tsxのkeyのためだけの物なので、
//	省略時に何を使うかはストアの都合＝ストア側でしか決められない
const addMes = ()=> {
	useStore.setState({aPage: [[], []], foreIdx: 0});
	S().addLayer({cls: 'txt', nm: 'mes', str: '', aCh: [], b_alpha: 1, enabled: true, aBtn: []});
};
const aBtnNm = ()=> {
	const lay = useStore.getState().aPage[0].find(e=> e.nm === 'mes')!;
	if (! isTxtLay(lay)) throw '文字レイヤのはず';
	return lay.aBtn.map(b=> b.nm);
};

it('addBtn_autoNm_allowsSameLabelTwice', ()=> {
	// 実テンプレ tmp_blues の[sys_menu]は fn 違い・label=*main のボタンを3つ並べる。
	//	nm省略時にlabelを流用していた頃は、ここが「ボタン名の重複」で落ちていた
	addMes();
	S().addBtn({layerNm: 'mes', page: 'fore', text: '字を隠す', label: '*main', fn: '_hidetext'});
	S().addBtn({layerNm: 'mes', page: 'fore', text: '履歴', label: '*main', fn: '_log'});
	S().addBtn({layerNm: 'mes', page: 'fore', text: '設定', label: '*main', fn: '_config'});
	expect(aBtnNm()).toEqual(['*main#0', '*main#1', '*main#2']);
});

it('addBtn_explicitNm_throwsOnDuplicate', ()=> {
	// [button nm=…]と明示した名前の重複はシナリオ側の誤り（Reactのkeyが衝突する）
	addMes();
	S().addBtn({layerNm: 'mes', page: 'fore', nm: 'b1', text: 'x', label: '*a'});
	expect(()=> S().addBtn({layerNm: 'mes', page: 'fore', nm: 'b1', text: 'y', label: '*b'})).toThrow();
});

it('addBtn_autoNm_restartsAfterClearLay', ()=> {
	// [clear_lay]でaBtnが空になるので通し番号も振り直し（添字が一意であれば足りる）
	addMes();
	S().addBtn({layerNm: 'mes', page: 'fore', text: 'x', label: '*a'});
	S().clearLay({aLayNm: null, page: 'fore'});
	S().addBtn({layerNm: 'mes', page: 'fore', text: 'y', label: '*a'});
	expect(aBtnNm()).toEqual(['*a#0']);
});

// ===== 文字組み（[lay ffs=/noffs=/bura=]）は文字レイヤ専用 =====

it('chgLay_ffsOnGrpLayerThrows', ()=> {
	// b_color/styleと同じ扱い。画像レイヤへ来たら黙って無視せず知らせる
	expect(()=> S().chgLay({nm: 'a', page: 'fore', sty: {ffs: '"palt"'}})).toThrow();
	expect(()=> S().chgLay({nm: 'a', page: 'fore', sty: {bura: true}})).toThrow();
	expect(()=> S().chgLay({nm: 'a', page: 'fore', sty: {kinsoku_sol: '、'}})).toThrow();
	expect(()=> S().chgLay({nm: 'a', page: 'fore', sty: {kinsoku_eol: '「'}})).toThrow();
	expect(()=> S().chgLay({nm: 'a', page: 'fore', sty: {kinsoku_dns: '…'}})).toThrow();
	expect(()=> S().chgLay({nm: 'a', page: 'fore', sty: {kinsoku_bura: '、'}})).toThrow();
});

it('chgLay_paddingOnGrpLayerThrows', ()=> {
	// pl/pr/pt/pbもb_color/styleと同じく文字レイヤ専用
	expect(()=> S().chgLay({nm: 'a', page: 'fore', sty: {pl: 10}})).toThrow();
	expect(()=> S().chgLay({nm: 'a', page: 'fore', sty: {pr: 10}})).toThrow();
	expect(()=> S().chgLay({nm: 'a', page: 'fore', sty: {pt: 10}})).toThrow();
	expect(()=> S().chgLay({nm: 'a', page: 'fore', sty: {pb: 10}})).toThrow();
});

it('clearLay_dropsPadding', ()=> {
	// pl/pr/pt/pbはb_color/style等と同じ「見た目」扱いなので[clear_lay]で既定へ戻る
	addMes();
	S().chgLay({nm: 'mes', page: 'fore', sty: {pl: 10, pr: 20, pt: 30, pb: 40}});
	S().clearLay({aLayNm: null, page: 'fore'});

	const lay = useStore.getState().aPage[0].find(e=> e.nm === 'mes')!;
	if (! isTxtLay(lay)) throw '文字レイヤのはず';
	expect(lay.pl).toBeUndefined();
	expect(lay.pr).toBeUndefined();
	expect(lay.pt).toBeUndefined();
	expect(lay.pb).toBeUndefined();
});

it('clearLay_dropsFfsButKeepsBuraAndKinsoku', ()=> {
	// ffs/noffsは[clear_lay]で消えるが、bura/kinsoku_*は現在値のまま引き継ぐ
	//	（本家 TxtLayer.ts:857 #clearLay()もHyphenationに触らない）
	addMes();
	S().chgLay({nm: 'mes', page: 'fore', sty: {ffs: '"palt"', noffs: '・', bura: true, kinsoku_eol: '「'}});
	S().clearLay({aLayNm: null, page: 'fore'});

	const lay = useStore.getState().aPage[0].find(e=> e.nm === 'mes')!;
	if (! isTxtLay(lay)) throw '文字レイヤのはず';
	expect(lay.ffs).toBeUndefined();
	expect(lay.noffs).toBeUndefined();
	expect(lay.bura).toBe(true);
	expect(lay.kinsoku_eol).toBe('「');
});

it('chgLay_kinsokuMergesAndPersists', ()=> {
	// 書かれた属性だけが上書きされ、未指定は現在値のまま
	addMes();
	S().chgLay({nm: 'mes', page: 'fore', sty: {kinsoku_sol: '、。', kinsoku_bura: '、'}});
	S().chgLay({nm: 'mes', page: 'fore', sty: {kinsoku_eol: '「'}});

	const lay = useStore.getState().aPage[0].find(e=> e.nm === 'mes')!;
	if (! isTxtLay(lay)) throw '文字レイヤのはず';
	expect(lay.kinsoku_sol).toBe('、。');
	expect(lay.kinsoku_bura).toBe('、');
	expect(lay.kinsoku_eol).toBe('「');
});

it('chgLay_kinsokuConflictThrows', ()=> {
	// ぶら下げ と 行末禁則／分割禁止 の重複はエラー（本家 Hyphenation.ts の競合チェックと同じ文言）。
	//	'】'はぶら下げの既定集合（行頭禁則の既定と同じ）に含まれる文字
	addMes();
	expect(()=> S().chgLay({nm: 'mes', page: 'fore', sty: {kinsoku_eol: '】'}}))
		.toThrow('禁則の競合があります。文字 】 がぶら下げ と 行末禁則 の両方に含まれます');
	expect(()=> S().chgLay({nm: 'mes', page: 'fore', sty: {kinsoku_dns: '】'}}))
		.toThrow('禁則の競合があります。文字 】 がぶら下げ と 分割禁止 の両方に含まれます');
});

it('chgLay_kinsokuConflictAgainstCurrentValue', ()=> {
	// 新規指定どうしでなく「新規指定 × そのレイヤの現在値」でも競合を検出する
	addMes();
	S().chgLay({nm: 'mes', page: 'fore', sty: {kinsoku_eol: '【'}});	// '【'は行末禁則の既定集合の文字。この時点では衝突なし
	expect(()=> S().chgLay({nm: 'mes', page: 'fore', sty: {kinsoku_bura: '【'}}))
		.toThrow('禁則の競合があります。文字 【 がぶら下げ と 行末禁則 の両方に含まれます');
});

it('chgLay_kinsokuSurvivesJsonRoundtrip', ()=> {
	// レイヤデータはgetPagesJson()→replaceでセーブ復元される。RegExpを持たせていないので
	//	文字列のまま生き残ることの確認（PITFALLS.md：storeへ入れる値はJSON化可能なプレーン値に限る）
	addMes();
	S().chgLay({nm: 'mes', page: 'fore', sty: {kinsoku_eol: '「', kinsoku_bura: '、'}});

	const json = S().getPagesJson();
	S().replace(json);

	const lay = useStore.getState().aPage[0].find(e=> e.nm === 'mes')!;
	if (! isTxtLay(lay)) throw '文字レイヤのはず';
	expect(lay.kinsoku_eol).toBe('「');
	expect(lay.kinsoku_bura).toBe('、');
});


// ============ [er]（clearTxtLay）============
//	本家 TxtLayer.clearLay()（TxtLayer.ts:857）＋ Layer.clearLay()（:420）。
//	**戻すのは変形まわりだけ**で、visibleと位置・見た目には触らない

it('clearTxtLay_変形まわりを既定へ戻す', ()=> {
	useStore.setState({aPage: [[], []], foreIdx: 0});
	S().addLayer({cls: 'txt', nm: 'mes', str: '', aCh: [], b_alpha: 1, enabled: true, aBtn: []});
	S().chgLay({nm: 'mes', page: 'fore', sty: {
		alpha: 0.5, blendmode: 'screen', pivot_x: 3, pivot_y: 4,
		rotation: 30, scale_x: 2, scale_y: 2,
		// 触ってほしくない分
		visible: false, left: 10, top: 20, b_color: 0xFF0000, style: 'color: red;',
	}});
	S().clearTxtLay({nm: 'mes', page: 'both', clearFilter: false});

	const e = useStore.getState().aPage[0].find(v=> v.nm === 'mes')!;
	for (const k of ['alpha', 'blendmode', 'pivot_x', 'pivot_y', 'rotation', 'scale_x', 'scale_y'] as const) {
		expect(e[k]).toBeUndefined();
	}
	// **visibleと位置・見た目は残る**（位置まで戻すのは[clear_lay]の仕事）
	expect(e.visible).toBe(false);
	expect(e.left).toBe(10);
	expect(e.top).toBe(20);
	expect(isTxtLay(e) && e.b_color).toBe(0xFF0000);
	expect(isTxtLay(e) && e.style).toBe('color: red;');
});

it('clearTxtLay_フィルターはclear_filter=trueのときだけ落とす', ()=> {
	useStore.setState({aPage: [[], []], foreIdx: 0});
	S().addLayer({cls: 'txt', nm: 'mes', str: '', aCh: [], b_alpha: 1, enabled: true, aBtn: []});
	const flt = {css: 'sepia(1)', enabled: true};

	S().chgFilter({aLayNm: ['mes'], page: 'fore', mode: 'add', flt});
	S().clearTxtLay({nm: 'mes', page: 'both', clearFilter: false});
	expect(useStore.getState().aPage[0].find(v=> v.nm === 'mes')!.aFlt).toEqual([flt]);

	S().clearTxtLay({nm: 'mes', page: 'both', clearFilter: true});
	expect(useStore.getState().aPage[0].find(v=> v.nm === 'mes')!.aFlt).toBeUndefined();
});

it('clearTxtLay_ボタンも消す', ()=> {
	useStore.setState({aPage: [[], []], foreIdx: 0});
	S().addLayer({cls: 'txt', nm: 'mes', str: '', aCh: [], b_alpha: 1, enabled: true, aBtn: []});
	S().addBtn({layerNm: 'mes', page: 'fore', text: 'x', label: '*a'});
	S().clearTxtLay({nm: 'mes', page: 'both', clearFilter: false});

	const e = useStore.getState().aPage[0].find(v=> v.nm === 'mes')!;
	expect(isTxtLay(e) && e.aBtn).toEqual([]);
});


// ============ chgPic：aFace省略時は直前の値を維持（本家 GrpLayer.ts:76-85） ============

it('chgPic_aFaceOmitted_keepsPreviousFace', ()=> {
	const face = [{fn: 'f1', src: '/f1.png', isSheet: false, dx: 1, dy: 2, blendmode: 'normal'}];
	S().chgPic({nm: 'a', page: 'fore', fn: 'pa', src: '/pa.png', isSheet: false, isMovie: false, aFace: face});

	// fnを再指定してもaFace省略なら、直前のfaceがそのまま残る（本家：fnは毎回明示、faceは省略可）
	S().chgPic({nm: 'a', page: 'fore', fn: 'pa2', src: '/pa2.png', isSheet: false, isMovie: false});

	const e = useStore.getState().aPage[0].find(v=> v.nm === 'a');
	expect(e && isGrpLay(e) ? e.fn : undefined).toBe('pa2');
	expect(e && isGrpLay(e) ? e.aFace : undefined).toEqual(face);
});

it('chgPic_aFaceEmptyArray_clearsFaceExplicitly', ()=> {
	const face = [{fn: 'f1', src: '/f1.png', isSheet: false, dx: 1, dy: 2, blendmode: 'normal'}];
	S().chgPic({nm: 'a', page: 'fore', fn: 'pa', src: '/pa.png', isSheet: false, isMovie: false, aFace: face});

	// aFace: []（face=""相当）は明示的なクリアなので、省略時とは違い実際に消える
	S().chgPic({nm: 'a', page: 'fore', fn: 'pa', src: '/pa.png', isSheet: false, isMovie: false, aFace: []});

	const e = useStore.getState().aPage[0].find(v=> v.nm === 'a');
	expect(e && isGrpLay(e) ? e.aFace : undefined).toEqual([]);
});
