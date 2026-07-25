/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2026-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

// プロジェクト内のフォントファイル（woff2/woff/otf/ttf）を`@font-face`で使えるようにする。
//	**シナリオ側に読み込みタグは無い**：path.jsonに載っているフォントは全部、
//	拡張子を除いたファイル名がそのまま`font-family`名になる（本家 TxtLayer.ts:97）。
//	だからシナリオは `[lay style='font-family: ipamjm;']` と書くだけで良い
//	（実テンプレ tmp_blues の `&def_fonts = 'ipamjm, "Source Han Sans CN"'` がまさにこれ）。
//	WebフォントのCSSを読む方は[loadplugin]の担当で、こちらはプロジェクト同梱ぶん。

import {SEARCH_PATH_ARG_EXT, type T_Config} from '../sn/ConfigBase';


// path.jsonから`@font-face`のCSSを組み立てる（純粋部分）。
//	フォント名に空白を含むものがある（tmp_bluesの`Source Han Sans CN`）ので、
//	font-familyもurlも引用符で囲む
export function fontFaceCss(cfg: T_Config): string {
	return cfg.matchPath('.+', SEARCH_PATH_ARG_EXT.FONT)
		// T_Extsは`{拡張子: 論理ファイル名}`。`:cnt`のような数値の項目が混じるので文字列だけ拾う
		.flatMap(h=> Object.values(h))
		.filter(fn=> typeof fn === 'string')
		.map(fn=> `@font-face {
	font-family: ${JSON.stringify(fn)};
	src: url(${JSON.stringify(cfg.searchPath(fn, SEARCH_PATH_ARG_EXT.FONT))});
}`)
		.join('\n');
}

// 上記を<head>へ挿す。プロジェクト起動時に1回だけ呼ぶ
export function addFontFaces(cfg: T_Config, doc: Document = document) {
	const css = fontFaceCss(cfg);
	if (! css) return;

	const st = doc.createElement('style');
	st.dataset['sn'] = 'font';	// 何者か分かるように（[loadplugin]が挿すlinkと区別）
	st.textContent = css;
	doc.head.appendChild(st);
}
