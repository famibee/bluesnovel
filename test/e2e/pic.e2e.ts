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
import {SEL_FORE, gotoSn, grpBoxStyle, mesStr, pressKey, snap, traceText} from './snPage';

test.beforeEach(async ({page})=> {await gotoSn(page, 'pic')});

// 表ページの画像レイヤが実際に読み込んだ<img>（表示サイズ＝自然サイズ）。
//	waitIdle()は文字送りの完了しか見ておらず<img>のネットワーク読み込み完了までは
//	保証しないため（GrpLayerはonLoadを待たずsrcを張るだけ）、ここでロード完了を
//	待ってからnaturalWidth/Heightを読む（さもないと稀に0のまま読んでflakyになる）
const imgs = (page: import('@playwright/test').Page)=> page.evaluate(
	async ()=> {
		const els = [...document.querySelectorAll<HTMLImageElement>('#skynovel [data-page="fore"] img')];
		await Promise.all(els.map(e=> e.complete ? Promise.resolve() : new Promise<void>(re=> {
			e.addEventListener('load', ()=> {re()}, {once: true});
			e.addEventListener('error', ()=> {re()}, {once: true});
		})));
		return els.map(e=> ({src: e.getAttribute('src') ?? '', w: e.naturalWidth, h: e.naturalHeight,
			left: e.style.left, top: e.style.top}));
	});

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

test('blendmodeは[lay]・[add_face]・[button]のどれもmix-blend-modeになる', async ({page})=> {
	for (let i = 0; i < 3; ++i) await pressKey(page, 'Space');
	expect(await mesStr(page)).toBe('ごうせい');

	const mbm = (sel: string)=> page.$eval(sel, el=> getComputedStyle(el).mixBlendMode);
	// [lay blendmode=screen]は画像レイヤの箱へ
	expect(await mbm(`${SEL_FORE} div[data-lay="base"]`)).toBe('screen');
	// [add_face blendmode=multiply]は差分絵の<img>へ（本家の4種以外は弾くようになった）
	expect(await mbm(`${SEL_FORE} div[data-lay="base"] img:nth-of-type(2)`)).toBe('multiply');
	// [button blendmode=add]はCSSに同名が無いのでplus-lighter（加算合成）。
	//	[l]/[p]/[waitclick]待ちマーカーのフォーカス用プロキシ（TxtLayer.tsx。todo.md対応）も
	//	同じtabindexを持つので`data-wait-focus`で除く
	expect(await mbm(`${SEL_FORE} span[data-lay="mes"] span[tabindex]:not([data-wait-focus])`)).toBe('plus-lighter');
});

test('[lay width=/height=]で画像の表示サイズが拡縮される（本家pixiのSprite.width/height相当）', async ({page})=> {
	for (let i = 0; i < 4; ++i) await pressKey(page, 'Space');
	expect(await mesStr(page)).toBe('かくだい');

	const a = await imgs(page);
	expect(a).toHaveLength(1);
	expect(a[0]!.w).toBe(40);	// naturalWidth/Heightは元のまま（拡縮は表示サイズだけ）
	expect(a[0]!.h).toBe(30);

	const box = await page.$eval(`${SEL_FORE} div[data-lay="base"] img`,
		el=> ({w: getComputedStyle(el).width, h: getComputedStyle(el).height}));
	expect(box.w).toBe('80px');
	expect(box.h).toBe('60px');
});

test('[lay pos=r]で大きな画像をcontaining block右端へ寄せても自然サイズのまま表示される', async ({page})=> {
	// 実プロジェクト（tmp_blues等）のindex.htmlが持つ「モダンCSSリセット」
	//	（img,picture{max-width:100%}）を再現：div0（画像レイヤの箱）が
	//	position:absolute×width autoのまま**containing block右端に寄る**と、
	//	CSSのshrink-to-fit計算で「そこから右端までの残り幅」に幅が制限されてしまい、
	//	中のimgもmax-width:100%でそれに追随して縮んで見えるバグがあった
	//	（GrpLayer.tsx div0にwidth:max-contentを足して解消。実機tmp_blues/tmp_esm_ucの
	//	比較で発見：[fg pos=&pos.l1c]の立ち絵が本家は顔まで見えるのに、こちらは
	//	体の一部しか見えていなかった）
	await page.addStyleTag({content: 'img,picture{max-width:100%;display:block}'});

	for (let i = 0; i < 5; ++i) await pressKey(page, 'Space');
	expect(await mesStr(page)).toBe('はばひろ');

	// wide.pngは600x400、ステージは800x600。pos=rはleft=800(stageW)・align_x='right'になり、
	//	containing block右端までの残り幅は0——修正前はここまで縮んでいた
	expect(await grpBoxStyle(page, 'width', 'base2')).toBe('600px');
	expect(await grpBoxStyle(page, 'height', 'base2')).toBe('400px');
});
