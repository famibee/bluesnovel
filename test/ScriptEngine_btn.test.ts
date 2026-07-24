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

import {expect, it} from 'bun:test';


const LAYS = '[add_lay layer=mes class=txt][current layer=mes]';
function acts(src: string): T_ENGINE_ACTION[] {return new ScriptEngine('t1', `${LAYS}${src}[s]`).step()}
// [button]が積んだ見た目の属性だけを取り出す
function styOf(src: string): T_BTN_STY | undefined {
	const a = acts(src).find(v=> v.t === 'addBtn');
	return a?.t === 'addBtn' ? a.sty : undefined;
}


it('btnSty_noneWhenUnwritten', ()=> {
	// 見た目の属性が1つも無ければstyは持たせない（[lay]と同じ流儀）
	expect(styOf('[button text=x label=*a]')).toBeUndefined();
});

it('btnSty_titleSnLike', ()=> {
	// 本家 theme/title.sn のタイトルボタンと同じ書き方
	expect(styOf('[button text=Start left=250 top=360 width=90 height=30 rotation=0 pivot_x=0 pivot_y=0 label=*start]'))
		.toEqual({left: 250, top: 360, width: 90, height: 30, rotation: 0, pivot_x: 0, pivot_y: 0});
});

it('btnSty_scaleAndAlpha', ()=> {
	expect(styOf('[button text=x label=*a scale_x=2 scale_y=0.5 alpha=0.3]'))
		.toEqual({scale_x: 2, scale_y: 0.5, alpha: 0.3});
});

it('btnSty_enabled', ()=> {
	expect(styOf('[button text=x label=*a enabled=false]')).toEqual({enabled: false});
	expect(styOf('[button text=x label=*a enabled=true]')).toEqual({enabled: true});
});

it('btnSty_blendmode', ()=> {
	// [lay blendmode=…]と同じ変換（本家の4種だけを受けてCSSのmix-blend-mode値へ）
	expect(styOf('[button text=x label=*a blendmode=add]')).toEqual({blendmode: 'plus-lighter'});
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
			label: '*a', call: true, sty: {left: 10}});
});
