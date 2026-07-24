/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2026-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

// 画像アセットの経路（シナリオ：test/e2e/app/prj_pic/main.sn）。
//	path.json → Config.searchPath() → <img> まで、本物の画像ファイルで通す。
//	**パス解決はScriptMngが行い**（renderの中でsearchPath()を呼ぶと、
//	サーチパスに無いときに投げる例外でReactごと落ちるため）、GrpLayerは
//	出来上がったURLを描くだけ。ここではその結果と、解決失敗時の振る舞いを見る。

import {expect, test} from '@playwright/test';
import {gotoSn, mesStr, pressKey, snap, traceText} from './snPage';

test.beforeEach(async ({page})=> {await gotoSn(page, 'pic')});

// 表ページの画像レイヤが実際に読み込んだ<img>（表示サイズ＝自然サイズ）
const imgs = (page: import('@playwright/test').Page)=> page.evaluate(
	()=> [...document.querySelectorAll<HTMLImageElement>('#skynovel [data-page="fore"] img')]
		.map(e=> ({src: e.getAttribute('src') ?? '', w: e.naturalWidth, h: e.naturalHeight,
			left: e.style.left, top: e.style.top})));

test('[lay fn=…]がpath.json経由で解決され、画像が表示される', async ({page})=> {
	expect(await mesStr(page)).toBe('はいけい');

	const a = await imgs(page);
	expect(a).toHaveLength(1);
	expect(a[0]!.src).toContain('bg.png');
	expect(a[0]!.w).toBe(40);	// 実際に読めている（読めなければ0）
	expect(a[0]!.h).toBe(30);

	// ストアは論理名と解決済みURLの両方を持つ（前者は[dump_lay]・デバッグ用）
	const lay = (await snap(page)).aLay.find(l=> l.nm === 'base');
	expect(lay?.fn).toBe('bg');
	expect(lay?.src).toContain('bg.png');
});

test('[add_face]の差分絵が親画像の上に重なる', async ({page})=> {
	await pressKey(page, 'Space');
	expect(await mesStr(page)).toBe('さぶん');

	const a = await imgs(page);
	expect(a).toHaveLength(2);	// 親＋差分。重なり順＝記述順
	expect(a[1]!.src).toContain('face_a.png');
	expect(a[1]!.w).toBe(10);
	// dx/dyは親画像の左上を原点とした相対座標
	expect(a[1]!.left).toBe('5px');
	expect(a[1]!.top).toBe('6px');
});

test('サーチパスに無い画像はエラーを出すが、画面は落ちない', async ({page})=> {
	await pressKey(page, 'Space');
	await pressKey(page, 'Space');
	expect(await mesStr(page)).toBe('みつからない');	// シナリオは進んでいる

	expect(await traceText(page)).toContain('[lay] 画像が見つかりません fn:nai_gazou');
	// 解決できなかったので<img>は出さない（src=""はページ全体の再取得を招くため）
	expect(await imgs(page)).toHaveLength(0);
});
