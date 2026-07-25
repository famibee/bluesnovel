/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2026-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

// プロジェクト同梱フォントの`@font-face`（src/ts/Font.ts）。
//	シナリオ側に読み込みタグは無く、path.jsonにあるフォントが全部そのままfont-family名になる
//	（本家 TxtLayer.ts:97）。ここで見るのは組み立てたCSSの中身だけ＝DOMは要らない。

import {fontFaceCss} from '../src/ts/Font';
import {SEARCH_PATH_ARG_EXT, type T_Config, type T_Exts} from '../src/sn/ConfigBase';

import {expect, it} from 'bun:test';


// path.jsonを模したcfg（本家テストの CfgTest と同じ発想で、要る2メソッドだけ持つ）
//	（`:cnt`のような数値の項目が混じるので、型はpath.jsonそのままの緩い形で受ける）
function cfgOf(hPath: {[fn: string]: {[ext: string]: string | number}}): T_Config {
	return {
		matchPath: (fnptn: string, extptn = SEARCH_PATH_ARG_EXT.DEFAULT)=> {
			const regPtn = new RegExp(fnptn);
			const regExt = new RegExp(extptn);
			const aRet: T_Exts[] = [];
			for (const [fn, h] of Object.entries(hPath)) {
				if (fn.search(regPtn) === -1) continue;

				const o: T_Exts = {};
				let isa = false;
				for (const ext of Object.keys(h)) {
					if (ext.search(regExt) === -1) continue;
					o[ext] = fn;
					isa = true;
				}
				if (isa) aRet.push(o);
			}
			return aRet;
		},
		searchPath: (fn: string)=> `/prj/${String(Object.values(hPath[fn] ?? {}).find(v=> typeof v === 'string') ?? '')}`,
	} as unknown as T_Config;
}

it('fontFaceCss_makesRulePerFont', ()=> {
	const css = fontFaceCss(cfgOf({
		ipamjm	: {':cnt': 1, ttf: 'script/ipamjm.ttf'},
		title	: {':cnt': 1, jpg: 'bg/title.jpg'},	// フォント以外は対象外
	}));
	expect(css).toBe(`@font-face {
	font-family: "ipamjm";
	src: url("/prj/script/ipamjm.ttf");
}`);
});

it('fontFaceCss_quotesNameWithSpace', ()=> {
	// 実テンプレ tmp_blues の`Source Han Sans CN`。引用符が無いとCSSとして壊れる
	const css = fontFaceCss(cfgOf({'Source Han Sans CN': {':cnt': 1, otf: 'script/Source Han Sans CN.otf'}}));
	expect(css).toContain('font-family: "Source Han Sans CN";');
	expect(css).toContain('src: url("/prj/script/Source Han Sans CN.otf");');
});

it('fontFaceCss_allExtensions', ()=> {
	// 本家 ConfigBase の SEARCH_PATH_ARG_EXT.FONT と同じ4種
	const css = fontFaceCss(cfgOf({
		a: {woff2: 'a.woff2'}, b: {woff: 'b.woff'}, c: {otf: 'c.otf'}, d: {ttf: 'd.ttf'},
	}));
	expect(css.match(/@font-face/g)?.length).toBe(4);
});

it('fontFaceCss_emptyWhenNoFont', ()=> {
	// フォントが無いプロジェクトでは<style>自体を挿さない（addFontFacesが空で抜ける）
	expect(fontFaceCss(cfgOf({title: {jpg: 'bg/title.jpg'}}))).toBe('');
});
