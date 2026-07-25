/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2026-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

// レイヤ操作タグのうち、エンジンが担当する「どのアクションを積むか」の部分。
//	[lay]のレイヤ共通属性（visible/alpha/left/top/rotation/scale_*/b_color/style）と[clear_lay]。
//	実際にCSSへ落ちるところはStage.tsx/GrpLayer/TxtLayerの担当なのでE2E側（lay.e2e.ts）。
//	本家：Layer.ts lay()/clearLay()、LayerMng.ts:528 #clear_lay()

import {ScriptEngine, type T_ENGINE_ACTION, type T_LAY_STY_ARG} from '../src/ts/ScriptEngine';

import {expect, it} from 'bun:test';


const LAYS = '[add_lay layer=base class=grp][add_lay layer=mes class=txt]';
function acts(src: string): T_ENGINE_ACTION[] {return new ScriptEngine('t1', src).step()}
// [lay]が積んだレイヤ共通属性だけを取り出す
function styOf(src: string): T_LAY_STY_ARG | undefined {
	const a = acts(`${LAYS}${src}[s]`).find(v=> v.t === 'chgLay');
	return a?.t === 'chgLay' ? a.sty : undefined;
}


// ============ [lay]のレイヤ共通属性 ============

it('lay_noStyAttr_pushesNothing', ()=> {
	// 見た目の属性が1つも無ければchgLayは積まない（fn/b_alphaだけの[lay]は従来どおり）
	expect(styOf('[lay layer=base fn=bg]')).toBeUndefined();
});

it('lay_visible', ()=> {
	expect(styOf('[lay layer=base visible=true]')).toEqual({visible: true});
	expect(styOf('[lay layer=base visible=false]')).toEqual({visible: false});
});

it('lay_alpha', ()=> {
	// レイヤ全体の不透明度。文字レイヤ背景だけを透かすb_alphaとは別物
	expect(styOf('[lay layer=base alpha=0.5]')).toEqual({alpha: 0.5});
});

it('lay_leftTop', ()=> {
	expect(styOf('[lay layer=base left=100 top=-20]')).toEqual({left: 100, top: -20});
});

it('lay_rotationIsDegrees', ()=> {
	// 本家もflash由来で「度」（pixiのradianではない）
	expect(styOf('[lay layer=base rotation=90]')).toEqual({rotation: 90});
});

it('lay_scale', ()=> {
	expect(styOf('[lay layer=base scale_x=2 scale_y=0.5]')).toEqual({scale_x: 2, scale_y: 0.5});
});

it('lay_onlyWrittenAttrsArePushed', ()=> {
	// 書かれた属性だけ（未指定は現状維持）。本家 Layer.lay() の `'alpha' in hArg` 判定と同じ
	expect(styOf('[lay layer=base alpha=1]')).toEqual({alpha: 1});
});

it('lay_bColorAcceptsHex', ()=> {
	// 0x始まりは16進（本家 argChk_Num と同じ）
	expect(styOf('[lay layer=mes b_color=0xFF8000]')).toEqual({b_color: 0xFF8000});
});

it('lay_style', ()=> {
	expect(styOf(`[lay layer=mes style="color: red; font-size: 20px;"]`))
		.toEqual({style: 'color: red; font-size: 20px;'});
});

it('lay_invalidNumThrows', ()=> {
	expect(()=> styOf('[lay layer=base alpha=abc]')).toThrow('[lay] alphaの値が不正です');
	expect(()=> styOf('[lay layer=base rotation=xyz]')).toThrow('[lay] rotationの値が不正です');
});

it('lay_styAttrsGoToSpecifiedPage', ()=> {
	const a = acts(`${LAYS}[lay layer=base alpha=0.3 page=back][s]`).find(v=> v.t === 'chgLay');
	expect(a).toEqual({t: 'chgLay', nm: 'base', page: 'back', sty: {alpha: 0.3}});
});

it('lay_picAndStyPushedTogether', ()=> {
	// 本家同様[lay]は複数の役割を同時に受けるので、絵の変更と見た目の変更が両方積まれる
	const a = acts(`${LAYS}[lay layer=base fn=bg alpha=0.5][s]`);
	expect(a.filter(v=> v.t === 'chgPic' || v.t === 'chgLay').map(v=> v.t))
		.toEqual(['chgPic', 'chgLay']);
});


// ============ [lay]の回転原点・合成モード ============

it('lay_pivot', ()=> {
	// 回転・拡縮の原点（本家のpivot＝pixiのDisplayObject.pivot。CSSではtransform-origin）。
	//	既定は左上＝0 0 なので、未指定なら従来どおり
	expect(styOf('[lay layer=base pivot_x=50 pivot_y=80]')).toEqual({pivot_x: 50, pivot_y: 80});
	expect(styOf('[lay layer=base rotation=30]')).toEqual({rotation: 30});	// pivotは足されない
});

it('lay_pivot_notNumber', ()=> {
	expect(()=> styOf('[lay layer=base pivot_x=もじ]')).toThrow('[lay] pivot_xの値が不正です');
});

it('lay_blendmode', ()=> {
	// 本家（Layer.getBlendmodeNum()）が受け付ける4種だけを通し、CSSのmix-blend-mode値へ変換する。
	//	addはCSSに同名が無いのでplus-lighter（加算合成）
	expect(styOf('[lay layer=base blendmode=normal]')).toEqual({blendmode: 'normal'});
	expect(styOf('[lay layer=base blendmode=multiply]')).toEqual({blendmode: 'multiply'});
	expect(styOf('[lay layer=base blendmode=screen]')).toEqual({blendmode: 'screen'});
	expect(styOf('[lay layer=base blendmode=add]')).toEqual({blendmode: 'plus-lighter'});
});

it('lay_blendmode_unsupported', ()=> {
	// 本家と同じ文言で弾く（CSSにはあるがpixiの表に無い値も同様）
	expect(()=> styOf('[lay layer=base blendmode=overlay]'))
		.toThrow('overlay はサポートされない blendmode です');
});


// ============ [lay]のレイヤ重なり順（float/index/dive） ============

// 並び替えは現在の並びが要るのでストア側で解決する。ここで見るのは積むアクションだけ
function moveOf(src: string) {
	return acts(`${LAYS}${src}[s]`).find(v=> v.t === 'moveLay');
}

it('layMove_float', ()=> {
	// 最前面へ（本家 LayerMng.ts:489）
	expect(moveOf('[lay layer=base float=true]')).toEqual({t: 'moveLay', nm: 'base', mode: 'float'});
	expect(moveOf('[lay layer=base float=false]')).toBeUndefined();
});

it('layMove_index', ()=> {
	expect(moveOf('[lay layer=base index=2]')).toEqual({t: 'moveLay', nm: 'base', mode: 'index', index: 2});
});

it('layMove_indexZeroDoesNothing', ()=> {
	// 本家は `if (hArg.index)` の内側でさらに数値の真偽を見るので、**index=0は何も起きない**
	//	（最背面へ送る指定にはならない）。そのまま移植してある
	expect(moveOf('[lay layer=base index=0]')).toBeUndefined();
});

it('layMove_dive', ()=> {
	expect(moveOf('[lay layer=base dive=mes]')).toEqual({t: 'moveLay', nm: 'base', mode: 'dive', dive: 'mes'});
});

it('layMove_floatWinsOverIndex', ()=> {
	// 本家の判定順は float → index → dive
	expect(moveOf('[lay layer=base float=true index=2 dive=mes]'))
		.toEqual({t: 'moveLay', nm: 'base', mode: 'float'});
});

it('layMove_withOtherAttrs', ()=> {
	// 見た目の変更と重なり順の変更は同じ[lay]で同時に書ける（本家も同様）
	const a = acts(`${LAYS}[lay layer=base alpha=0.5 float=true][s]`);
	expect(a.filter(v=> v.t === 'chgLay' || v.t === 'moveLay').map(v=> v.t))
		.toEqual(['chgLay', 'moveLay']);
});


// ============ 文字組み（[lay ffs=/noffs=/bura=]） ============

it('lay_ffsAndNoffs', ()=> {
	// 文字詰め。値はCSSのfont-feature-settingsそのままで、エンジンは解釈しない
	expect(styOf(`[lay layer=mes ffs='"palt"' noffs='・']`))
		.toEqual({ffs: '"palt"', noffs: '・'});
});

it('lay_bura', ()=> {
	// ぶら下げ禁則。本家 Hyphenation.ts:85 と同じく真偽値
	expect(styOf('[lay layer=mes bura=true]')).toEqual({bura: true});
	expect(styOf('[lay layer=mes bura=false]')).toEqual({bura: false});
});

it('lay_ffsIsNotPushedWhenUnspecified', ()=> {
	// 書かれた属性だけを積む（他の[lay]属性と同じ流儀）
	expect(styOf('[lay layer=mes alpha=0.5]')).toEqual({alpha: 0.5});
});


// ============ [clear_lay] ============

it('clearLay_defaultsToBackPage', ()=> {
	// 既定は'back'（本家 LayerMng.ts:1100。裏を組む用途が主なため）
	expect(acts(`${LAYS}[clear_lay layer=mes][s]`).find(v=> v.t === 'clearLay'))
		.toEqual({t: 'clearLay', aLayNm: ['mes'], page: 'back'});
});

it('clearLay_page', ()=> {
	expect(acts(`${LAYS}[clear_lay layer=mes page=fore][s]`).find(v=> v.t === 'clearLay'))
		.toEqual({t: 'clearLay', aLayNm: ['mes'], page: 'fore'});
	expect(acts(`${LAYS}[clear_lay layer=mes page=both][s]`).find(v=> v.t === 'clearLay'))
		.toEqual({t: 'clearLay', aLayNm: ['mes'], page: 'both'});
});

it('clearLay_multipleLayers', ()=> {
	expect(acts(`${LAYS}[clear_lay layer="base,mes"][s]`).find(v=> v.t === 'clearLay'))
		.toEqual({t: 'clearLay', aLayNm: ['base', 'mes'], page: 'back'});
});

it('clearLay_layerOmittedIsAllLayers', ()=> {
	// layer省略＝全レイヤ（本家 LayerMng.#getLayers()）。エンジンはレイヤ一覧を持たないので、
	//	[trans]/[dump_lay]と同じくnullのまま渡し、「全部」の解決はストア側
	expect(acts(`${LAYS}[clear_lay][s]`).find(v=> v.t === 'clearLay'))
		.toEqual({t: 'clearLay', aLayNm: null, page: 'back'});
});

it('clearLay_emptyLayerThrows', ()=> {
	// 省略（＝全部）と、書いたのに空（＝書き間違い）は区別する
	expect(()=> acts(`${LAYS}[clear_lay layer=""][s]`)).toThrow('[clear_lay] layer属性が空です');
});

it('clearLay_invalidPageThrows', ()=> {
	expect(()=> acts(`${LAYS}[clear_lay layer=mes page=all][s]`)).toThrow('属性 page【all】が不正です');
});

it('clearLay_alsoClearsAccumulatedText', ()=> {
	// chgStrは「そのレイヤの全文字列」を毎回送るので、[clear_lay]はエンジン側の蓄積も
	//	捨てなければならない（消し忘れると、消した後の本文に前の文がぶら下がって復活する）。
	//	本家も TxtLayer.clearLay() が中身を捨てる
	const a = acts(`${LAYS}[current layer=mes]あ[clear_lay layer=mes page=both]い[s]`);
	expect(a.filter(v=> v.t === 'chgStr').map(v=> v.str)).toEqual(['あ', 'い']);
});

it('clearLay_backOnlyKeepsAccumulatedText', ()=> {
	// 蓄積文字列が指すのは表ページ（本文の表示はfore固定）なので、裏だけ消すときは触らない
	const a = acts(`${LAYS}[current layer=mes]あ[clear_lay layer=mes page=back]い[s]`);
	expect(a.filter(v=> v.t === 'chgStr').map(v=> v.str)).toEqual(['あ', 'あい']);
});


// ============ 実シナリオでの並び ============

it('scenario_titleSnLikeSequence', ()=> {
	// tmp_esm_uc/doc/prj/theme/title.sn の冒頭と同じ流れ：
	//	裏ページをクリアしてボタンを置き、[trans]で見せる
	const a = acts(
		`${LAYS}[clear_lay layer=mes page=back][button page=back text=Start label=*start]`+
		'[trans layer="base,mes" time=0][wt][s]'
	);
	expect(a.map(v=> v.t)).toEqual([
		'addLay', 'addLay', 'clearLay', 'addBtn', 'trans', 'waitTrans',
	]);
});


// ============ 文字レイヤ背後の枠画像（[lay b_pic=…]） ============
//	本家 TxtLayer.ts:393 #drawBack()。**b_picを指定するとb_colorは無視される**のが本家の規約で、
//	テンプレのメッセージ窓（wafuu1）がこれ。未対応だと「白地に白文字」で本文が読めなくなる

it('lay_bPic_pushesAction', ()=> {
	expect(acts('[lay layer=mes b_pic=wafuu1][s]').find(v=> v.t === 'chgBPic'))
		.toEqual({t: 'chgBPic', nm: 'mes', page: 'fore', fn: 'wafuu1'});
});

it('lay_bPic_emptyClearsBack', ()=> {
	// b_pic=''は「枠画像をやめて単色塗りへ戻す」（本家も hArg.b_pic の真偽で分岐）
	expect(acts(`[lay layer=mes b_pic=''][s]`).find(v=> v.t === 'chgBPic'))
		.toEqual({t: 'chgBPic', nm: 'mes', page: 'fore', fn: ''});
});

it('lay_bAlphaIsfixed', ()=> {
	// b_alpha_isfixed=trueは「sys:TextLayer.Back.Alphaと掛け算しない」指定
	expect(acts('[lay layer=mes b_alpha=1 b_alpha_isfixed=true][s]').find(v=> v.t === 'chgBAlpha'))
		.toEqual({t: 'chgBAlpha', nm: 'mes', page: 'fore', b_alpha: 1, isFixed: true});
	// 片方だけでも積む（書かれた属性だけを運ぶ）
	expect(acts('[lay layer=mes b_alpha_isfixed=false][s]').find(v=> v.t === 'chgBAlpha'))
		.toEqual({t: 'chgBAlpha', nm: 'mes', page: 'fore', isFixed: false});
	expect(acts('[lay layer=mes b_alpha=0.5][s]').find(v=> v.t === 'chgBAlpha'))
		.toEqual({t: 'chgBAlpha', nm: 'mes', page: 'fore', b_alpha: 0.5});
});

it('lay_bPic_isSeparateFromBColor', ()=> {
	// 両方書かれたらどちらのアクションも出る（優先の判断は描画側＝TxtLayer）
	const a = acts('[lay layer=mes b_pic=wafuu1 b_color=0xffffff][s]');
	expect(a.some(v=> v.t === 'chgBPic')).toBe(true);
	expect(a.find(v=> v.t === 'chgLay')?.sty.b_color).toBe(0xffffff);
});

// ============ blendmode（[lay]／[add_face]／[button]で同じ扱い） ============

it('blendmode_convertsToCss', ()=> {
	// 本家（Layer.getBlendmodeNum()）が受けるのはpixiのBLEND_MODESへ引ける4種だけ。
	//	addはCSSに同名が無いのでplus-lighter（加算合成）を当てる
	expect(styOf('[lay layer=base blendmode=normal]')).toEqual({blendmode: 'normal'});
	expect(styOf('[lay layer=base blendmode=add]')).toEqual({blendmode: 'plus-lighter'});
	expect(styOf('[lay layer=base blendmode=multiply]')).toEqual({blendmode: 'multiply'});
	expect(styOf('[lay layer=base blendmode=screen]')).toEqual({blendmode: 'screen'});
});

it('blendmode_unsupportedThrows', ()=> {
	// CSSにはあるが本家が受けない値（overlay等）は弾く。文言も本家に合わせてある
	expect(()=> styOf('[lay layer=base blendmode=overlay]'))
		.toThrow('overlay はサポートされない blendmode です');
});

it('blendmode_addFaceUsesSameTable', ()=> {
	// [add_face]も同じ変換を通す（以前はCSSの値を素通ししていた）
	const a = acts(`${LAYS}[add_face name=f1 fn=f1 blendmode=add][lay layer=base fn=bg face=f1][s]`);
	const chg = a.find(v=> v.t === 'chgPic');
	expect(chg?.t === 'chgPic' ? chg.aFace[0]?.blendmode : '').toBe('plus-lighter');
});

it('blendmode_addFaceUnsupportedThrows', ()=> {
	expect(()=> acts('[add_face name=f1 blendmode=overlay][s]'))
		.toThrow('overlay はサポートされない blendmode です');
});
