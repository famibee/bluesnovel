/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2026-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

// 文字出現・消去演出の定義（`[ch_in_style]`／`[ch_out_style]`）。
//	本家：TxtStage.ts:610/643（属性の読み取り）・TxtLayer.ts:120/133（組み込みのdefault）・
//	TxtLayer.ts:148/173（CSSの組み立て）。
//
//	**本家はCSSの`@keyframes`を組み立ててスタイルシートへ挿す**が、こちらは同じ値を
//	GSAPのtweenへ翻訳する（src/ts/ChStyle.ts）。実際に文字が動く様子はE2E側。

import {CH_IN_DEF, CH_OUT_DEF, chInTween, chStyleEase, chStylePos, parseChStyle} from '../src/ts/ChStyle';
import {ScriptEngine, type T_ENGINE_ACTION} from '../src/ts/ScriptEngine';

import {expect, it} from 'bun:test';


const LAYS = '[add_lay layer=mes class=txt][current layer=mes]';
function acts(src: string): T_ENGINE_ACTION[] {return new ScriptEngine('t1', `${LAYS}${src}[s]`).step()}
const def = (src: string)=> acts(src).find(v=> v.t === 'defChStyle');


// ============ 属性の読み取り ============

it('chStyle_省略時の既定が本家と同じ', ()=> {
	// 本家 TxtStage.ts:618-635。**joinの既定だけ出現true／消去false**で違う
	expect(parseChStyle('ch_in_style', {name: 'a'}, true).sty).toEqual({
		wait: 500, alpha: 0, x: '=0', y: '=0',
		scale_x: 1, scale_y: 1, rotate: 0, join: true, ease: 'ease-out',
	});
	expect(parseChStyle('ch_out_style', {name: 'a'}, false).sty.join).toBe(false);
});

it('chStyle_nameは必須', ()=> {
	expect(()=> parseChStyle('ch_in_style', {}, true)).toThrow();
});

it('chStyle_nameに使えない文字を弾く', ()=> {
	// 本家 TxtStage.ts:601 #REG_NG_CHSTYLE_NAME_CHR。本家はCSSのクラス名へ埋めるための制限だが、
	//	シナリオの互換のため同じ検査を残している
	for (const nm of ['a b', 'a.b', 'a,b', 'a*b', 'a{b']) {
		expect(()=> parseChStyle('ch_in_style', {name: nm}, true)).toThrow();
	}
});

it('chStyle_数値でない属性はthrow', ()=> {
	expect(()=> parseChStyle('ch_in_style', {name: 'a', wait: 'いち'}, true)).toThrow();
});


// ============ 値の翻訳 ============

it('chStylePos_「=」始まりは文字の大きさに対する割合（emで表す）', ()=> {
	// **本家は`${nx * 100}%`（TxtLayer.ts:151）だがこちらはem**。パーセントは要素自身の箱を
	//	基準にするので、本家は`.sn_ch`へ`display: inline-block`を敷いて箱を作っている。
	//	bluesnovelの文字spanはinlineのまま（行分割をブラウザに任せている前提を崩さないため）で
	//	幅が0＝パーセントが効かない。emなら箱に依らず、全角文字では本家と同じ値になる
	expect(chStylePos('=0.3')).toBe('0.3em');
	expect(chStylePos('=-0.5')).toBe('-0.5em');
	expect(chStylePos('30')).toBe('30px');
	expect(chStylePos('')).toBe('0px');	// 壊れた指定でも動きを止めない
});

it('chStyleEase_CSSのanimation-timing-function名をGSAPのeaseへ', ()=> {
	expect(chStyleEase('linear')).toBe('none');
	expect(chStyleEase('ease-in')).toBe('power1.in');
	expect(chStyleEase('ease-out')).toBe('power1.out');
	// cubic-bezier()やsteps()はGSAPの追加プラグインが要るので既定へ倒す
	expect(chStyleEase('cubic-bezier(.1,.2,.3,.4)')).toBe('power1.out');
});

it('chInTween_fromが定義の値・toが素の表示状態', ()=> {
	// 本家のkeyframesも`from`に定義値・`to`に`opacity:1; transform:none`を置く
	const {from, to} = chInTween(CH_IN_DEF);
	expect(from).toEqual({opacity: 0, x: '0.3em', y: '0em', scaleX: 1, scaleY: 1, rotation: 0});
	expect(to).toEqual({opacity: 1, x: 0, y: 0, scaleX: 1, scaleY: 1, rotation: 0,
		duration: 0.5, ease: 'power1.out'});
});

it('chInTween_waitはミリ秒→秒', ()=> {
	expect(chInTween({...CH_OUT_DEF, wait: 250}).to.duration).toBe(0.25);
});


// ============ タグ ============

it('chInStyle_定義がアクションになる', ()=> {
	expect(def('[ch_in_style name=fast wait=100 alpha=0.5 y="=1" join=false ease=linear]'))
		.toEqual({t: 'defChStyle', kind: 'in', nm: 'fast', sty: {
			wait: 100, alpha: 0.5, x: '=0', y: '=1',
			scale_x: 1, scale_y: 1, rotate: 0, join: false, ease: 'linear',
		}});
});

it('chOutStyle_kindがoutで積まれる', ()=> {
	expect(def('[ch_out_style name=fade wait=200]')).toMatchObject({kind: 'out', nm: 'fade'});
});

it('chStyle_同じ名前の二度定義はthrow（本家 TxtStage.ts:614）', ()=> {
	expect(()=> acts('[ch_in_style name=a][ch_in_style name=a]')).toThrow();
	// 出現と消去は別の表なので、同じ名前でも衝突しない
	expect(()=> acts('[ch_in_style name=a][ch_out_style name=a]')).not.toThrow();
});

it('chStyle_組み込みのdefaultは再定義できない', ()=> {
	// 本家も起動時に`default`を定義済みなので、同じ名前は「すでにあります」になる
	expect(()=> acts('[ch_in_style name=default]')).toThrow();
});

it('lay_in_style/out_styleがレイヤ属性として渡る', ()=> {
	expect(acts('[ch_in_style name=fast][lay layer=mes in_style=fast out_style=default]')
		.find(v=> v.t === 'chgLay'))
		.toMatchObject({sty: {in_style: 'fast', out_style: 'default'}});
});
