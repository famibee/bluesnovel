/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2026-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

// ルビ記法（`漢字《かんじ》`・`｜親文字《ルビ》`・傍点`《*》`）が<ruby>/<rt>として組まれるか。
//	**どう割るか**は本家から丸移植した RubySpliter が決め、test/RubySpliter.test.ts（本家の
//	テストを無改変で移植）が仕様を押さえている。ここで見るのはユニットでは届かない部分だけ：
//	割った結果がDOMのルビとして出ること、ストアのstr（＝平文）にはルビが混ざらないこと、
//	そして文字送り演出のDOMキャッシュがルビ付きでも壊れないこと。

import {expect, test} from '@playwright/test';
import {SEL_FORE, gotoSn, mesStr, pressKey, snap, waitIdle} from './snPage';

// 表ページの文字レイヤに組まれたルビを「親文字:ルビ」の並びで拾う
const aRuby = (page: import('@playwright/test').Page)=> page.$$eval(
	`${SEL_FORE} span[data-lay="mes"] ruby`,
	aEl=> aEl.map(el=> {
		const rt = el.querySelector('rt');
		const rb = el.textContent?.slice(0, el.textContent.length - (rt?.textContent?.length ?? 0));
		return `${rb ?? ''}:${rt?.textContent ?? ''}`;
	}),
);

test.beforeEach(async ({page})=> {await gotoSn(page, 'ruby')});

test('`漢字《かんじ》`が<ruby>で組まれ、平文にはルビが入らない', async ({page})=> {
	expect(await mesStr(page)).toBe('漢字は');	// ストアのstrはルビを除いた平文
	expect(await aRuby(page)).toEqual(['漢字:かんじ']);
});

test('`｜親文字《ルビ》`も同じく組まれる（親文字の範囲を明示する記法）', async ({page})=> {
	await pressKey(page, 'Space');

	expect(await mesStr(page)).toBe('漢字は親文字と');
	expect(await aRuby(page)).toEqual(['漢字:かんじ', '親文字:おやもじ']);
});

test('傍点`《*》`は1文字ずつに圏点（既定ヽ）が付く', async ({page})=> {
	await pressKey(page, 'Space');
	await pressKey(page, 'Space');

	expect(await mesStr(page)).toBe('漢字は親文字と傍点');
	// 傍点は親文字1つごとに1ルビ。位置指定（center｜）はr_alignとして分離されるが、
	//	rtの文字自体（textContent）には出ないのでこの見え方は変わらない
	expect(await aRuby(page)).toEqual(['漢字:かんじ', '親文字:おやもじ', '傍:ヽ', '点:ヽ']);
});

test('[er]で消えたら<ruby>も残らない（表示単位のキャッシュが作り直される）', async ({page})=> {
	await pressKey(page, 'Space');
	await pressKey(page, 'Space');
	await pressKey(page, 'Space');

	expect(await mesStr(page)).toBe('消えた');
	expect(await aRuby(page)).toEqual([]);
});

// 表示単位ごとの「文字と実際の色」。[span]/[ch]のstyleが当たっているかを見る
const aColor = (page: import('@playwright/test').Page)=> page.$$eval(
	`${SEL_FORE} span[data-lay="mes"] > span:first-child > span`,
	aEl=> aEl.map(el=> {
		const inner = el.firstElementChild ?? el;	// スタイル付きは内側のspan/ruby
		const rt = inner.querySelector('rt');
		const t = (inner.textContent ?? '').slice(0, (inner.textContent ?? '').length - (rt?.textContent ?? '').length);
		return `${t}:${getComputedStyle(inner).color}${rt ? `/${rt.textContent ?? ''}:${getComputedStyle(rt).color}` : ''}`;
	}),
);

test('[span]/[ch]/[ruby2]のstyle・r_styleが実際の色になる', async ({page})=> {
	for (let i = 0; i < 4; ++i) await pressKey(page, 'Space');

	// 平文はスタイルもルビも含まない
	expect(await mesStr(page)).toBe('赤黒緑蜊');
	expect(await aColor(page)).toEqual([
		'赤:rgb(255, 0, 0)',	// [span style=…]から
		'黒:rgb(0, 0, 0)',		// 属性なしの[span]で解除された
		'緑:rgb(0, 128, 0)',	// [ch style=…]はそのtextの間だけ
		'蜊:rgb(0, 0, 0)/あさり:rgb(0, 0, 255)',	// [ruby2 r_style=…]はルビ側だけ
	]);
	expect((await snap(page)).wait).toEqual({nm: 'mes', kind: 'l'});
});

test('[link]はクリックでジャンプし、argを飛び先へ渡す', async ({page})=> {
	for (let i = 0; i < 5; ++i) await pressKey(page, 'Space');

	expect(await mesStr(page)).toBe('リンクと628');
	// リンク区間の文字だけがクリックできる（[link style=…]も当たっている）
	expect(await aColor(page)).toEqual([
		'リ:rgb(0, 0, 255)', 'ン:rgb(0, 0, 255)', 'ク:rgb(0, 0, 255)',
		'と:rgb(0, 0, 0)',
		'628:rgb(0, 0, 0)/炎:rgb(0, 0, 0)',	// [tcy]はルビ付きで1単位
	]);
	// 縦中横はCSSのtext-combine-uprightで組む（横書きなので見た目は変わらないが指定はされる）
	expect(await page.$eval(`${SEL_FORE} span[data-lay="mes"] ruby > span`,
		el=> getComputedStyle(el).textCombineUpright)).toBe('all');

	await page.getByText('リ', {exact: true}).click();
	await waitIdle(page);
	// [link arg=…]は飛び先で &sn.eventArg として受け取れる（本家と同じ）
	expect(await mesStr(page)).toBe('飛んだ:あるぐ');
});

test('[lay ffs=/noffs=]は1文字ずつ文字詰めを当てる', async ({page})=> {
	// このページは[link]の飛び先（*goal）の続きにある＝リンクを踏まないと辿り着けない
	for (let i = 0; i < 5; ++i) await pressKey(page, 'Space');
	await page.getByText('リ', {exact: true}).click();
	await waitIdle(page);
	await pressKey(page, 'Space');

	expect(await mesStr(page)).toBe('あ・い');
	// noffsに挙げた文字だけ font-feature-settings が外れる（本家 TxtLayer.ts:480 #fncFFSStyle）
	expect(await page.$$eval(`${SEL_FORE} span[data-lay="mes"] > span:first-child > span`,
		aEl=> aEl.map(el=> `${el.textContent ?? ''}:${getComputedStyle(el.firstElementChild ?? el).fontFeatureSettings}`)))
		.toEqual(['あ:"palt"', '・:normal', 'い:"palt"']);

	// 文字spanはブラウザ標準の行分割・禁則を無効化するためinline-block（禁則処理は
	//	Hyphenation.tsの自前計算に一本化した。[lay bura=]の実効検証はkinsoku.e2e.ts）
	expect(await page.$eval(`${SEL_FORE} span[data-lay="mes"] > span:first-child > span`,
		el=> getComputedStyle(el).display)).toBe('inline-block');
});

test('[link url=…]はジャンプせずURLを開く', async ({page})=> {
	// このページも[link]の飛び先（*goal）の続きにある
	for (let i = 0; i < 5; ++i) await pressKey(page, 'Space');
	await page.getByText('リ', {exact: true}).click();
	await waitIdle(page);
	await pressKey(page, 'Space');
	await pressKey(page, 'Space');
	expect(await mesStr(page)).toBe('そと');

	// 本家と同じく別タブで開く（location.hrefだとゲームごと終わってしまう）
	const [popup] = await Promise.all([
		page.waitForEvent('popup'),
		page.getByText('そ', {exact: true}).click(),
	]);
	expect(popup.url()).toBe('https://example.com/');
	await popup.close();
	expect(await mesStr(page)).toBe('そと');	// シナリオは止まったまま（ジャンプしない）
});

// 上の[link url=…]のシーンから続けて進む共通手順
const gotoSesame = async (page: import('@playwright/test').Page)=> {
	for (let i = 0; i < 5; ++i) await pressKey(page, 'Space');
	await page.getByText('リ', {exact: true}).click();
	await waitIdle(page);
	for (let i = 0; i < 3; ++i) await pressKey(page, 'Space');	// あ・い→そと→傍点
	await page.mouse.move(0, 0);	// 直前のクリックでマウスが残った位置に次のシーンの要素が来て、
		//	意図せずhover扱いになるのを防ぐ
};

test('[lay sesame=…]で傍点の文字を変更できる', async ({page})=> {
	await gotoSesame(page);

	expect(await mesStr(page)).toBe('傍点');
	expect(await aRuby(page)).toEqual(['傍:★', '点:★']);
});

test('[lay r_align=…]はレイヤ既定のルビ位置になり、記法内指定（`位置｜ルビ`）が優先される', async ({page})=> {
	await gotoSesame(page);
	await pressKey(page, 'Space');	// r_alignのシーンへ

	expect(await mesStr(page)).toBe('永蜊');
	const aAlign = await page.$$eval(`${SEL_FORE} span[data-lay="mes"] ruby rt`,
		aEl=> aEl.map(el=> getComputedStyle(el).textAlign));
	// 永＝レイヤ既定（[lay r_align=center]）、蜊＝ルビ記法内指定（left）が優先される
	expect(aAlign).toEqual(['center', 'left']);
});

test('[link]のstyle_hover/style_clicked/r_style_hover/r_style_clickedが実際の色になる', async ({page})=> {
	await gotoSesame(page);
	await pressKey(page, 'Space');	// r_alignのシーンへ
	await pressKey(page, 'Space');	// linkのシーンへ

	expect(await mesStr(page)).toBe('蜊');
	const el = page.locator(`${SEL_FORE} span[data-lay="mes"] ruby`);
	const rt = page.locator(`${SEL_FORE} span[data-lay="mes"] ruby rt`);

	// 素の状態：style／r_style
	expect(await el.evaluate(e=> getComputedStyle(e).color)).toBe('rgb(0, 0, 255)');
	expect(await rt.evaluate(e=> getComputedStyle(e).color)).toBe('rgb(0, 0, 128)');

	// ホバー：style_hover／r_style_hover（r_style_hoverは省略なのでstyle_hoverの値へ落ちる）
	await el.hover();
	expect(await el.evaluate(e=> getComputedStyle(e).color)).toBe('rgb(0, 255, 0)');
	expect(await rt.evaluate(e=> getComputedStyle(e).color)).toBe('rgb(0, 255, 0)');

	// 押し下げ：style_clicked／r_style_clicked（本文DOMをReactの外で直接組むため:activeが
	//	使えず、mousedown〜mouseupの間だけ乗せる実装。本家 #mkStyle_r_align() 相当）
	await page.mouse.down();
	expect(await el.evaluate(e=> getComputedStyle(e).color)).toBe('rgb(255, 0, 0)');
	expect(await rt.evaluate(e=> getComputedStyle(e).color)).toBe('rgb(128, 0, 0)');

	await page.mouse.up();
	await waitIdle(page);
	expect(await mesStr(page)).toBe('とどいた');	// クリックとして扱われジャンプする
});

test('プロジェクト同梱フォントが@font-faceとして登録される', async ({page})=> {
	// path.jsonにあるフォントは全部、拡張子を除いたファイル名がそのままfont-family名になる
	//	（本家 TxtLayer.ts:97。シナリオ側に読み込みタグは無い）。
	// **フォント本体はわざと置いていない**：ここで確かめるのは「path.jsonから@font-faceを
	//	組み立てて<head>へ挿す」配線だけで、実ファイルの中身は要らないため
	//	（このシナリオはこのフォントを使わないので、ブラウザは取りにも行かない）。
	//	CSSの中身そのものは test/Font.test.ts が持つ
	const css = await page.$eval('head style[data-sn="font"]', el=> el.textContent ?? '');
	expect(css).toContain('font-family: "E2E Test Font";');
	expect(css).toMatch(/src: url\(".*E2E.?Test.?Font\.woff2"\);/);	// 解決済みURL
});
