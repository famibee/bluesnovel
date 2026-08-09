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

it('lay_widthHeight', ()=> {
	expect(styOf('[lay layer=base width=320 height=240]')).toEqual({width: 320, height: 240});
});

it('lay_widthOnly_doesNotZeroHeight', ()=> {
	// 本家GrpLayer.ts:88-91の「width単独指定でheightに0が入り縦潰れする」バグは踏襲しない。
	//	独立したif（ScriptEngine.ts）なので、width単独ならheightキー自体が無い
	const sty = styOf('[lay layer=base width=320]');
	expect(sty).toEqual({width: 320});
	expect(sty?.height).toBeUndefined();
});

it('lay_heightOnly_doesNotZeroWidth', ()=> {
	const sty = styOf('[lay layer=base height=240]');
	expect(sty).toEqual({height: 240});
	expect(sty?.width).toBeUndefined();
});

it('lay_widthHeight_notScreenRatio', ()=> {
	// left/topと違い#argPos()を通さない：0.0〜1.0を画面比率として拡大しない（素のargChk_Num）
	expect(styOf('[lay layer=base width=0.5 height=0.25]')).toEqual({width: 0.5, height: 0.25});
});

it('lay_widthHeight_throwsOnNonNumeric', ()=> {
	expect(()=> styOf('[lay layer=base width=abc]')).toThrow();
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

it('lay_padding', ()=> {
	// 文字表示領域の内側余白。片方だけの指定でも成立する（width/heightと同じ独立if）
	expect(styOf('[lay layer=mes pl=10 pr=20 pt=30 pb=40]')).toEqual({pl: 10, pr: 20, pt: 30, pb: 40});
	expect(styOf('[lay layer=mes pl=10]')).toEqual({pl: 10});
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

it('lay_kinsoku', ()=> {
	// 禁則文字集合の指定。値は文字列のまま素通し（正規表現化は描画側）
	expect(styOf(`[lay layer=mes kinsoku_sol='、。' kinsoku_eol='「' kinsoku_dns='…' kinsoku_bura='、']`))
		.toEqual({kinsoku_sol: '、。', kinsoku_eol: '「', kinsoku_dns: '…', kinsoku_bura: '、'});
});

it('lay_kinsokuIsNotPushedWhenUnspecified', ()=> {
	// 書かれた属性だけを積む（未指定は現在値維持。既定値はここに書かない）
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

it('lay_backClear_pushesAction', ()=> {
	// [lay back_clear=true]：背景（b_color/b_alpha/b_alpha_isfixed/b_pic）を初期状態へ戻す
	//	（本家 TxtLayer.ts:376-385）
	expect(acts('[lay layer=mes back_clear=true][s]').find(v=> v.t === 'chgBackClear'))
		.toEqual({t: 'chgBackClear', nm: 'mes', page: 'fore'});
});

it('lay_backClear_falseDoesNothing', ()=> {
	// back_clear=falseは本家も何もしない（argChk_Boolean(hArg,'back_clear',false)がtrueの時だけ実行）
	const a = acts('[lay layer=mes back_clear=false][s]');
	expect(a.find(v=> v.t === 'chgBackClear')).toBeUndefined();
});

it('lay_backClear_skipsOtherBAttrs', ()=> {
	// back_clear指定時は他のb_*属性（b_alpha/b_pic/b_color）を本家同様に無視する
	//	（#drawBack()が早期returnするのと同じ排他）
	const a = acts('[lay layer=mes back_clear=true b_alpha=0.5 b_pic=wafuu1 b_color=0xffffff][s]');
	expect(a.find(v=> v.t === 'chgBackClear')).toEqual({t: 'chgBackClear', nm: 'mes', page: 'fore'});
	expect(a.some(v=> v.t === 'chgBAlpha')).toBe(false);
	expect(a.some(v=> v.t === 'chgBPic')).toBe(false);
	expect(a.find(v=> v.t === 'chgLay')?.sty.b_color).toBeUndefined();
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
	expect(chg?.t === 'chgPic' ? chg.aFace?.[0]?.blendmode : '').toBe('plus-lighter');
});

it('blendmode_addFaceUnsupportedThrows', ()=> {
	expect(()=> acts('[add_face name=f1 blendmode=overlay][s]'))
		.toThrow('overlay はサポートされない blendmode です');
});


// ============ 位置属性の割合解釈（本家 Layer.ts:513） ============

// ステージ寸法はScriptMngが組み込み変数で入れる。単体テストでは自前で入れる
function seWin(src: string, w = 1024, h = 768): T_ENGINE_ACTION[] {
	const se = new ScriptEngine('t1', `${LAYS}${src}[s]`);
	se.defBuiltin('const.sn.config.window.width', ()=> w);
	se.defBuiltin('const.sn.config.window.height', ()=> h);
	return se.step();
}
function styOfWin(src: string, nm = 'base') {
	const a = seWin(src).find(v=> v.t === 'chgLay' && v.nm === nm);
	return a?.t === 'chgLay' ? a.sty : undefined;
}

it('layPos_ratioIsStageSize', ()=> {
	// **-1〜1 はステージ幅・高さに対する割合**（本家 `if (x > -1 && x < 1) x *= CmnLib.stageW`）。
	//	テンプレやギャラリーは[lay left=0.5]で画面中央を指すので、pxとして扱うと0.5pxになる
	expect(styOfWin('[lay layer=base left=0.5 top=0.25]')).toMatchObject({left: 512, top: 192});
	// 負の割合も同じ
	expect(styOfWin('[lay layer=base left=-0.5]')).toMatchObject({left: -512});
});

it('layPos_outOfRatioRangeIsPx', ()=> {
	// 境界は本家と同じ**開区間**。1・-1 ちょうどはpxのまま
	expect(styOfWin('[lay layer=base left=1 top=-1]')).toMatchObject({left: 1, top: -1});
	expect(styOfWin('[lay layer=base left=250 top=360]')).toMatchObject({left: 250, top: 360});
	// 0は割合として掛けても0なので、どちらの解釈でも同じ
	expect(styOfWin('[lay layer=base left=0]')).toMatchObject({left: 0});
});

it('btnPos_ratioIsStageSizeToo', ()=> {
	// ボタンも同じ #argChkPos を通る（本家 Layer.ts:513 の isButton 分岐は幅の引き算だけ）
	const a = seWin('[button text=x label=*a left=0.5 top=0.25]').find(v=> v.t === 'addBtn');
	expect(a?.t === 'addBtn' ? a.sty : undefined).toMatchObject({left: 512, top: 192});
	// width/heightは割合解釈しない（寸法であって位置ではない）
	const b = seWin('[button text=x label=*a width=0.5]').find(v=> v.t === 'addBtn');
	expect(b?.t === 'addBtn' ? b.sty : undefined).toMatchObject({width: 0.5});
});


// ============ 中央寄せ・右端合わせ（本家 Layer.ts:513-552） ============

it('layAlign_centerAndMiddle', ()=> {
	// 本家は「指定値から表示物の幅・高さを引く」。エンジンは実寸を知らないので
	//	**寄せの種類だけ**を渡し、実際のずらしはCSSのtranslateがやる（Lay.ts styLay）
	expect(styOfWin('[lay layer=base center=0.5 middle=0.5]'))
		.toMatchObject({left: 512, align_x: 'center', top: 384, align_y: 'middle'});
});

it('layAlign_rightAndBottom', ()=> {
	// right/bottomは「指定値に表示物の右端・下端を合わせる」＝-100%
	expect(styOfWin('[lay layer=base right=800 bottom=600]'))
		.toMatchObject({left: 800, align_x: 'right', top: 600, align_y: 'bottom'});
});

it('layAlign_stageEdge', ()=> {
	// s_right/s_bottomはステージの右端・下端からの距離。CSSのright/bottomがそのまま同義なので
	//	left/topは持たせない（本家も else if で排他）
	const sty = styOfWin('[lay layer=base s_right=20 s_bottom=30]');
	expect(sty).toMatchObject({s_right: 20, s_bottom: 30});
	expect(sty?.left).toBeUndefined();
	expect(sty?.top).toBeUndefined();
});

it('layAlign_leftWins', ()=> {
	// 本家は else if の並び順で left > center > right > s_right。左が書かれていればそれが勝つ
	const sty = styOfWin('[lay layer=base left=10 center=500 right=900 s_right=20]');
	expect(sty).toMatchObject({left: 10});
	expect(sty?.align_x).toBeUndefined();
	expect(sty?.s_right).toBeUndefined();
});

it('layAlign_ratioWorksToo', ()=> {
	// 寄せの指定値も-1〜1は割合（本家も同じ #argChkPos を通す）
	expect(styOfWin('[lay layer=base center=0.5]')).toMatchObject({left: 512, align_x: 'center'});
});


// ============ [button]の中央寄せ・右端合わせ（本家 Layer.ts:513-552 の isButton 分岐。
//	実際は3箇所とも isButton=false 固定で未配線だったデッドコードだが、仕様として掘り起こした） ============

function btnStyOfWin(src: string) {
	const a = seWin(src).find(v=> v.t === 'addBtn');
	return a?.t === 'addBtn' ? a.sty : undefined;
}

it('btnAlign_centerAndMiddle', ()=> {
	// [lay]と同じ設計：寄せの種類だけを渡し、実際のずらしはCSSのtranslateが行う（BtnLayer.tsx styBtnArg）
	expect(btnStyOfWin('[button text=x label=*a center=0.5 middle=0.5]'))
		.toMatchObject({left: 512, align_x: 'center', top: 384, align_y: 'middle'});
});

it('btnAlign_rightAndBottom', ()=> {
	expect(btnStyOfWin('[button text=x label=*a right=800 bottom=600]'))
		.toMatchObject({left: 800, align_x: 'right', top: 600, align_y: 'bottom'});
});

it('btnAlign_stageEdge', ()=> {
	// s_right/s_bottomはステージの右端・下端からの距離。left/topとは排他（本家も else if）
	const sty = btnStyOfWin('[button text=x label=*a s_right=20 s_bottom=30]');
	expect(sty).toMatchObject({s_right: 20, s_bottom: 30});
	expect(sty?.left).toBeUndefined();
	expect(sty?.top).toBeUndefined();
});

it('btnAlign_leftWins', ()=> {
	// 本家は else if の並び順で left > center > right > s_right
	const sty = btnStyOfWin('[button text=x label=*a left=10 center=500 right=900 s_right=20]');
	expect(sty).toMatchObject({left: 10});
	expect(sty?.align_x).toBeUndefined();
	expect(sty?.s_right).toBeUndefined();
});
