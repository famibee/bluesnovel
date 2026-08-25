/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2026-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

// [button]の配置・寸法・変形属性（本家 Button.ts のコンストラクタ相当）。
//	[button]の基本（layer/nm/text/label/call/fn/page）は test/ScriptEngine.test.ts と
//	ScriptEngine_trans.test.ts が持っているので、ここは見た目の属性だけ。
//	実際にCSSへ落ちるところはBtnLayerの担当なのでE2E側（button.e2e.ts）。
//	本家サンプル theme/title.sn のタイトルボタン4つがこの形で座標指定している

import {ScriptEngine, type T_ENGINE_ACTION} from '../src/ts/ScriptEngine';
import type {T_BTN_STY} from '../src/components/TxtLayer';
import {BTN_DEF_H, BTN_DEF_W} from '../src/components/Lay';

import {expect, it} from 'bun:test';


const LAYS = '[add_lay layer=mes class=txt][current layer=mes]';
function acts(src: string): T_ENGINE_ACTION[] {return new ScriptEngine('t1', `${LAYS}${src}[s]`).step()}
// [button]が積んだ見た目の属性。**width/heightは省略時も既定が入る**（本家 Button.ts:123/:152）ので、
//	以下の比較はその2つを含む前提で書く（含まないと「何が起きているか」が見えなくなるため素で持つ）
function styOf(src: string): T_BTN_STY | undefined {
	const a = acts(src).find(v=> v.t === 'addBtn');
	return a?.t === 'addBtn' ? a.sty : undefined;
}
const DEF = {width: BTN_DEF_W, height: BTN_DEF_H};
// addBtnアクションそのもの（text も見たいとき用）
function btn(src: string) {
	const a = acts(src).find(v=> v.t === 'addBtn');
	return a?.t === 'addBtn' ? a : undefined;
}


it('btnSty_sizeDefaults', ()=> {
	// **寸法だけは省略時も既定値が入る**（本家 Button.ts:123 height=30 / :152 width=100）。
	//	本家のpixi Textは width/height の代入で文字スプライトそのものを拡縮するので、
	//	文字数に関わらず必ずこの大きさに揃う。CSSの既定（文字なりの幅）とは食い違うため、
	//	埋めないとテンプレのシステムメニュー（width/height省略）が隣と重なる。
	//	**他の配置・変形属性は埋めない**：下流のCSSが本家と同じ既定を持っているから
	//	（left/top=0・rotation=0・scale=1・alpha=1）。ボタンの寸法にはその受け皿が無い
	expect(styOf('[button text=x label=*a]')).toEqual(DEF);
	// 書かれていればそちらが勝つ
	expect(styOf('[button text=x label=*a width=90 height=24]')).toEqual({width: 90, height: 24});
});

it('btnSty_titleSnLike', ()=> {
	// 本家 theme/title.sn のタイトルボタンと同じ書き方
	expect(styOf('[button text=Start left=250 top=360 width=90 height=30 rotation=0 pivot_x=0 pivot_y=0 label=*start]'))
		.toEqual({left: 250, top: 360, width: 90, height: 30, rotation: 0, pivot_x: 0, pivot_y: 0});
});

it('btnSty_scaleAndAlpha', ()=> {
	expect(styOf('[button text=x label=*a scale_x=2 scale_y=0.5 alpha=0.3]'))
		.toEqual({...DEF, scale_x: 2, scale_y: 0.5, alpha: 0.3});
});

it('btnSty_enabled', ()=> {
	expect(styOf('[button text=x label=*a enabled=false]')).toEqual({...DEF, enabled: false});
	expect(styOf('[button text=x label=*a enabled=true]')).toEqual({...DEF, enabled: true});
});

it('btnSty_blendmode', ()=> {
	// [lay blendmode=…]と同じ変換（本家の4種だけを受けてCSSのmix-blend-mode値へ）
	expect(styOf('[button text=x label=*a blendmode=add]')).toEqual({...DEF, blendmode: 'plus-lighter'});
	expect(()=> styOf('[button text=x label=*a blendmode=overlay]'))
		.toThrow('overlay はサポートされない blendmode です');
});

it('btnSty_notNumber', ()=> {
	expect(()=> styOf('[button text=x label=*a left=もじ]')).toThrow('[button] leftの値が不正です');
});

it('btnSty_keepsOtherAttrs', ()=> {
	// 見た目を足しても既存の属性はそのまま
	expect(acts('[button nm=b1 text=x label=*a call=true left=10]').find(v=> v.t === 'addBtn'))
		.toEqual({t: 'addBtn', layerNm: 'mes', page: 'back', nm: 'b1', text: 'x',
			label: '*a', call: true, fn: 't1', sty: {...DEF, left: 10}});
});

it('btnSty_hint', ()=> {
	// ツールチップ（本家 EventMng.ts:418 #dispHint()）。エンジンは属性を運ぶだけで、
	//	出すのはDOM側（Hint.ts）。hint_optは本家popperのオプションJSONをそのまま渡す
	expect(styOf(`[button text=x label=*a hint=ほんぶん hint_style="color: red;" hint_opt='{"placement": "bottom"}']`))
		.toEqual({...DEF, hint: 'ほんぶん', hint_style: 'color: red;', hint_opt: `{"placement": "bottom"}`});
});

it('btnSty_styleIsCss', ()=> {
	// **bluesnovelはCSSで書ける**（本家はpixiのTextStyle JSON）。CSSはそのまま通す
	expect(styOf(`[button text=x label=*a style="color: red;" style_hover="color: lime;" style_clicked="color: blue;"]`))
		.toEqual({...DEF, style: 'color: red;', style_hover: 'color: lime;', style_clicked: 'color: blue;'});
});

it('btnSty_pixiTextStyleJsonIsConverted', ()=> {
	// ギャラリーのサンプルは`{"fill": "plum"}`のようにJSONで書くので、主要キーはCSSへ読み替える
	expect(styOf(`[button text=x label=*a style='{"fill": "plum"}']`)).toEqual({...DEF, style: 'color: plum;'});
	expect(styOf(`[button text=x label=*a style='{"fontSize": 24, "align": "center"}']`))
		.toEqual({...DEF, style: 'font-size: 24px;text-align: center;'});
	// 未対応キー（dropShadow等）は落とす
	expect(styOf(`[button text=x label=*a style='{"fill": "red", "dropShadow": true}']`))
		.toEqual({...DEF, style: 'color: red;'});
});

it('btnSty_brokenJsonPassesThrough', ()=> {
	// JSONのつもりで壊れていてもCSSとして渡す（表示ごと止めない）
	expect(styOf(`[button text=x label=*a style='{こわれ']`)).toEqual({...DEF, style: '{こわれ'});
});


// ============ [er]でのボタン消去 ============

it('erClearsButtons', ()=> {
	// 本家の[er]は TxtLayer.clearLay()（TxtLayer.ts:857）を表裏に呼び、本文とボタンを両方捨てる。
	//	これが無いと、テンプレでタイトル画面のボタンが本編に入っても残り続ける
	//	（[grp]の場面転換は[er]しか打たないため）
	const a = acts(`[button text=x label=*a][er]`);
	expect(a.filter(v=> v.t === 'clearTxtLay'))
		.toEqual([{t: 'clearTxtLay', nm: 'mes', page: 'both', clearFilter: false}]);
	// 本文の消去（chgStr）と両輪。[er]は表裏どちらも消す
	expect(a.find(v=> v.t === 'chgStr' && v.page === 'both')).toBeDefined();
});

it('erClearFilterAttr', ()=> {
	// フィルターは clear_filter=true のときだけ落とす（本家 Layer.ts:427。既定はfalse）
	const a = acts(`[er clear_filter=true]`).find(v=> v.t === 'clearTxtLay');
	expect(a).toMatchObject({clearFilter: true});
});

it('erDoesNotClearLayStyle', ()=> {
	// [clear_lay]と違い、[er]はレイヤの見た目（style/left/top/b_pic…）を残す。
	//	本家も TxtLayer.clearLay() でCSSまでは戻さない（戻すのは変形系だけ）
	expect(acts(`[lay layer=mes style="writing-mode: vertical-rl;"][er]`)
		.some(v=> v.t === 'clearLay')).toBe(false);
});


// ============ 画像ボタン（[button pic=] / [button b_pic=]）============
//	本家 Button.ts:104（pic）と :168（b_pic）。picは「通常｜押下｜ホバー」を横に3コマ並べた1枚で、
//	実際の見え方（コマ送り・箱の大きさ）はDOM側なのでE2E（button.e2e.ts）

it('btn_picIsPassedAsLogicalName', ()=> {
	// 画像は論理名のまま積む（解決済みURLを入れるのはScriptMng。[lay fn=]と同じ関係）
	expect(btn('[button pic=btn_ok label=*a]')?.sty).toMatchObject({pic: 'btn_ok'});
});

it('btn_picHasNoText', ()=> {
	// 本家もpic側の分岐で早期returnし、文字の組み立てへ進まない
	expect(btn('[button pic=btn_ok text=むし label=*a]')?.text).toBe('');
});

it('btn_picDoesNotGetDefaultSize', ()=> {
	// 箱の大きさは絵の実寸（横は3コマ分の1/3）。実寸を知れるのはDOM側だけなので埋めない
	const sty = btn('[button pic=btn_ok label=*a]')?.sty as {width?: number; height?: number};
	expect(sty.width).toBeUndefined();
	expect(sty.height).toBeUndefined();
	// 明示指定があればそちらが勝つ（本家も `'width' in hArg` を優先）
	expect((btn('[button pic=btn_ok width=60 label=*a]')?.sty as {width?: number}).width).toBe(60);
});

it('btn_textOrPicIsRequired', ()=> {
	expect(()=> acts('[button label=*a]')).toThrow('textまたはpic属性は必須です');	// 本家と同じ文言
	expect(()=> acts('[button pic=btn_ok label=*a]')).not.toThrow();
});

// ============ 効果音（[button clickse=/enterse=/leavese=]）============
//	本家 EventMng.ts:465-491。実際に鳴らす（ScriptMng.playButtonSe()経由）のはBtnLayer.tsxの
//	クリック・マウスの乗り降りなのでE2E側（button.e2e.ts）。エンジンは論理ファイル名を運ぶだけ

it('btnSe_clickse', ()=> {
	expect(styOf('[button text=x label=*a clickse=ok]')).toEqual({...DEF, clickse: 'ok', clicksebuf: 'SYS'});
});
it('btnSe_bufDefaultsToSYS', ()=> {
	// bufの既定は'SYS'（本家 EventMng.ts:466,475,484）。[playse]自体の既定'SE'とは別
	expect(styOf('[button text=x label=*a enterse=hover]')).toMatchObject({entersebuf: 'SYS'});
	expect(styOf('[button text=x label=*a leavese=bye]')).toMatchObject({leavesebuf: 'SYS'});
});
it('btnSe_bufOverridable', ()=> {
	expect(styOf('[button text=x label=*a clickse=ok clicksebuf=BGM]')).toMatchObject({clicksebuf: 'BGM'});
});
it('btnSe_omittedWhenNoFile', ()=> {
	// clickse等を書かなければ、対応するbuf属性（既定値含め）も一切積まない
	//	（sty自体に余計なキーを持たせない。[lay]と同じ「書かれた属性だけ」の流儀）
	const sty = styOf('[button text=x label=*a]') as Record<string, unknown>;
	expect('clickse' in sty).toBe(false);
	expect('clicksebuf' in sty).toBe(false);
});
it('btnSe_allThree', ()=> {
	expect(styOf('[button text=x label=*a clickse=c enterse=e leavese=l]')).toEqual({
		...DEF, clickse: 'c', clicksebuf: 'SYS', enterse: 'e', entersebuf: 'SYS', leavese: 'l', leavesebuf: 'SYS',
	});
});

it('btn_bPicKeepsText', ()=> {
	// b_picは文字の背後に敷く絵（本家 Button.ts:249）。文字は消えない
	const a = btn('[button b_pic=waku text=おす label=*a]');
	expect(a?.text).toBe('おす');
	// b_picはpicと違い、left/topの基準点である**文字の箱**を絵の実寸へ広げない（本家 Button.ts:
	//	80-81,249-257。left/top＝container.x/yはtxtの原点で、spはtxt基準に中央合わせで後付け
	//	されるだけ）。よってpic無しの通常ボタンと同じくここで既定値(100x30)が埋まる。
	//	埋めなかった頃はBtnLayerのbtnBoxSizeが箱をb_picの実寸へ広げてしまい、left/topの基準点が
	//	「文字位置」から「背景画像位置」へすり替わる不具合があった（sn_gallery ch_button #19 で発覚）
	expect(a?.sty).toMatchObject({...DEF, b_pic: 'waku'});
});
