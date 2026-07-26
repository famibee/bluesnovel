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
import {splitCh} from '../src/ts/Txt';

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


// ============ 文字ごとの指定（[span]/[ch]の ch_in_style / wait）============

// 本文の生文字列を割った結果（ScriptMngがやるのと同じ）
const chs = (src: string)=> splitCh(
	(acts(src).findLast(v=> v.t === 'chgStr') as {str: string} | undefined)?.str ?? '');

it('span_ch_in_styleは次の[span]まで効く', ()=> {
	const a = chs('[span ch_in_style=fast]あ[span]い');
	expect(a[0]?.cis).toBe('fast');
	expect(a[1]?.cis).toBeUndefined();	// 属性なしの[span]は指定の解除（本家 #mergePushSpan）
});

it('ch_ch_in_styleはそのtextの間だけ効く', ()=> {
	const a = chs('[ch text=あ ch_in_style=fast]い');
	expect(a[0]?.cis).toBe('fast');
	expect(a[1]?.cis).toBeUndefined();
});

it('ch_の指定が[span]の指定に勝つ', ()=> {
	// 本家 #o2domArg() も [ch]の値 → 親[span]の値 → 既定 の順に `??` で落とす
	expect(chs('[span ch_in_style=s]|[ch text=あ ch_in_style=c]')[1]?.cis).toBe('c');
});

it('ch_out_styleとwaitも同じ経路で文字へ乗る', ()=> {
	const a = chs('[span ch_out_style=fade wait=120]あ');
	expect(a[0]?.cos).toBe('fade');
	expect(a[0]?.w).toBe(120);
});

it('waitが数値でなければ「指定なし」として捨てる', ()=> {
	// 本文の表示を止めないため。タグ側の検査を抜けてくる値ではないので寛容でよい
	expect(chs('[span wait=いち]あ')[0]?.w).toBeUndefined();
});


// ============ [autowc]（文字ごとのウェイト）============

const autowc = (src: string)=> acts(src).find(v=> v.t === 'autowc');

it('autowc_文字と時間の対応表を積む', ()=> {
	expect(autowc('[autowc enabled=true text="、。" time=100,200]'))
		.toEqual({t: 'autowc', enabled: true, hWait: {'、': 100, '。': 200}});
});

it('autowc_textとtimeは同時指定必須（本家 TxtLayer.ts:216）', ()=> {
	expect(()=> acts('[autowc text="、"]')).toThrow();
	expect(()=> acts('[autowc time=100]')).toThrow();
});

it('autowc_文字数と時間の数が合わなければthrow', ()=> {
	expect(()=> acts('[autowc text="、。" time=100]')).toThrow();
});

it('autowc_enabled省略時は現在値を保つ（本家と同じ）', ()=> {
	// 表だけ差し替える書き方ができるように
	expect(autowc('[autowc enabled=true text="、" time=100][autowc text="。" time=200]')
		?.enabled).toBe(true);
});

it('autowc_textが空なら表を空にする', ()=> {
	expect(autowc('[autowc enabled=false text="" time=""]'))
		.toEqual({t: 'autowc', enabled: false, hWait: {}});
});

it('autowc_save:const.sn.autowc.*へ書く（本家 TxtLayer.ts:212）', ()=> {
	const se = new ScriptEngine('t1', `${LAYS}[autowc enabled=true text="、。" time=100,200][s]`);
	se.step();
	expect(se.getVal('save:const.sn.autowc.enabled')).toBe(true);
	expect(se.getVal('save:const.sn.autowc.text')).toBe('、。');
	expect(String(se.getVal('save:const.sn.autowc.time'))).toBe('100,200');
});


// ============ 1文字あたりの基本の待ち（本家 ScriptIterator.normalWait）============

function chWaitOf(src: string): number {
	const se = new ScriptEngine('t1', `${LAYS}${src}[s]`);
	se.step();
	return se.chWait;
}

it('chWait_sys:未設定なら本家の初期値10ms', ()=> {
	// 本家 CmnInterface.ts:223 の 'sn.tagCh.msecWait': 10
	expect(chWaitOf('あ')).toBe(10);
});

it('chWait_sys:sn.tagCh.msecWaitを見る', ()=> {
	expect(chWaitOf('[let name=sys:sn.tagCh.msecWait text=40]あ')).toBe(40);
});

it('chWait_doWait=falseなら0（ウェイトを掛けない設定）', ()=> {
	expect(chWaitOf('[let name=sys:sn.tagCh.doWait text=false]あ')).toBe(0);
});

it('chWait_既読なら_Kidoku側の設定を見る', ()=> {
	// 本家 ScriptIterator.ts:1332 normalWait。設定画面が既読・未読で別の値を持てる。
	//	同じ位置を2周させて 1周目=未読／2周目=既読 を作る（test/ScriptEngine_kidoku.test.ts と同じ形）
	const se = new ScriptEngine('t1', `${LAYS}[let name=sys:sn.tagCh.msecWait text=40]`
		+ `[let name=sys:sn.tagCh.msecWait_Kidoku text=5]*top\nあ[l][jump label=*top]`);
	se.step();
	expect(se.chWait).toBe(40);	// 1周目は未読
	se.step();
	expect(se.chWait).toBe(5);	// 2周目は既読
});
