/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2026-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

// HTMLフレーム（シナリオ：test/e2e/app/prj_frame/main.sn）。
//	どのアクションを積むかは test/ScriptEngine_frame.test.ts が持っているので、
//	ここで見るのは「本物のiframeを読み込んで中のvar変数を読み書きできるか」——
//	つまりブラウザでしか確かめられない部分だけ。
//
//	このシナリオは[add_frame]と[let_frame]でstep()の途中から一旦返る（DOMを触った結果を
//	組み込み変数へ書き戻してから続けるため）。その隙間は「ストアもDOMも一致していて
//	文字送りも終わっている」状態に見えるので、waitIdle()だけでは停止点と区別できない。
//	複数ファイル（multi.e2e.ts）と同じ事情なので、表示の確定はexpect.pollで待つ

import {expect, test, type Page} from '@playwright/test';
import {gotoSn, mesStr, traceText, waitIdle} from './snPage';

test.beforeEach(async ({page})=> {await gotoSn(page, 'frame')});

// フレーム内のvar変数を覗く（srcdocで作るiframeは同一オリジンなので触れる）
const frmVar = (page: Page, nm: string)=> page.evaluate(
	nm=> ((document.getElementById('yesno') as HTMLIFrameElement)
		.contentWindow as unknown as Record<string, unknown>)[nm], nm);
// iframeのstyle.display。position:absoluteなので算出値はinlineでもblockになる（CSSのblockification）。
//	本家が書くのは'inline'なので、書かれた値そのものを見る
const frmDisplay = (page: Page)=> page.evaluate(
	()=> (document.getElementById('yesno') as HTMLIFrameElement | null)?.style.display ?? '(no frame)');

const seeText = async (page: Page, s: string)=> {
	await expect.poll(async ()=> mesStr(page), {timeout: 10_000}).toBe(s);
};
// 読み進めて、その表示に落ち着くまで待つ。**押す前のwaitIdle()が要る**：
//	文字送り演出の最中に押すと「瞬時完了」として消費され、進行1回ぶんが失われる（Main.tsx next()）
const advance = async (page: Page, to: string)=> {
	await waitIdle(page);
	await page.keyboard.press('Space');
	await seeText(page, to);
};


test('[add_frame]は読み込み終えてから進み、組み込み変数が立つ', async ({page})=> {
	await seeText(page, 'よみこんだ');

	// 読み込みを待たずに進んでいたら、この時点でiframeがまだ無い
	const box = await page.locator('#yesno').evaluate(e=> {
		const s = getComputedStyle(e);
		return {w: s.width, h: s.height};
	});
	expect(box).toEqual({w: '400px', h: '200px'});
	expect(await frmDisplay(page)).toBe('none');	// visible=false

	// 本家と同じ組み込み変数一式（エンジンの変数はストアに無いので、シナリオ側で[trace]して見る）
	expect(await traceText(page)).toContain('frm:true/400/false');
});

test('[set_frame]がフレーム内のvar変数へ入り、[let_frame function=true]が関数を呼ぶ', async ({page})=> {
	await seeText(page, 'よみこんだ');
	expect(await frmVar(page, 'val_dic')).toBe('');
	expect(await frmVar(page, 'val_cnt')).toBe(0);

	await advance(page, 'ひょうじ');

	expect(await frmVar(page, 'val_dic')).toBe('こんにちは');
	expect(await frmVar(page, 'val_cnt')).toBe(1);	// val2ctrl()が呼ばれた
	// フレーム側のJSが描画した結果
	expect(await page.frameLocator('#yesno').locator('#mes').textContent()).toBe('こんにちは');
});

test('[frame visible=true]で表示される', async ({page})=> {
	await seeText(page, 'よみこんだ');
	expect(await frmDisplay(page)).toBe('none');

	await advance(page, 'ひょうじ');
	expect(await frmDisplay(page)).toBe('inline');
});

test('[let_frame]の戻り値は同じ停止点までの間に読める', async ({page})=> {
	// アクションの適用はstep()が返った後なので、[let_frame]では一旦返って組み込み変数へ
	//	書き戻してから続ける。そうしないと同じstep内では古い値のままになる
	await seeText(page, 'よみこんだ');
	await advance(page, 'ひょうじ');
	await advance(page, 'とれた');

	expect(await traceText(page)).toContain('ret:ctrl:こんにちは');
});

test(`[event key='dom=…']でフレーム内のボタンがラベルへ飛ばせる`, async ({page})=> {
	await seeText(page, 'よみこんだ');
	await advance(page, 'ひょうじ');	// フレームが表示された
	await waitIdle(page);

	await page.frameLocator('#yesno').locator('#ok').click();
	// 発火した要素の data-* が sn.event.domdata.* へ入る（本家 EventMng.ts:591）
	await seeText(page, 'おっけー:yes7');
});

test('[tsy_frame]がフレームの見た目を時間をかけて動かす', async ({page})=> {
	await seeText(page, 'よみこんだ');
	await advance(page, 'ひょうじ');
	await advance(page, 'とれた');
	await waitIdle(page);

	// フレームの現在値はストアではなくFrameMngが持つので、iframeのstyleを直接見る
	const sty = ()=> page.locator('#yesno').evaluate(e=> {
		const s = (e as HTMLIFrameElement).style;
		return {left: parseFloat(s.left), opacity: parseFloat(s.opacity)};
	});
	expect(await sty()).toEqual({left: 0, opacity: 1});

	// [tsy_frame time=400 x='=100' alpha=0.5] → [wait_tsy id=yesno]
	await page.keyboard.press('Space');
	await expect.poll(async ()=> (await sty()).opacity, {timeout: 5_000}).toBeLessThan(1);
	expect(await mesStr(page)).toBe('');	// [wait_tsy]中なので次の文へ進んでいない

	await seeText(page, 'うごかした');
	expect(await sty()).toEqual({left: 100, opacity: 0.5});	// 相対指定は現在値(0)に+100
});

test(`[event key='dom=…']はセレクタの大小文字を保つ（#close）`, async ({page})=> {
	await seeText(page, 'よみこんだ');
	await advance(page, 'ひょうじ');
	await waitIdle(page);

	await page.frameLocator('#yesno').locator('#close').click();
	await seeText(page, 'きゃんせる');
});

test('[frame disabled=true]で<button>もdisabledになる', async ({page})=> {
	await seeText(page, 'よみこんだ');
	for (const t of ['ひょうじ', 'とれた', 'うごかした', 'ふぉーかす', 'ふぉーかすぱっど', 'ふぉーかすぱっどえをだした']) {
		await advance(page, t);
	}

	const closeDisabled = ()=> page.frameLocator('#yesno').locator('#close').isDisabled();
	expect(await closeDisabled()).toBe(false);

	await advance(page, 'むこうにした');
	expect(await closeDisabled()).toBe(true);

	await advance(page, 'もどした');
	expect(await closeDisabled()).toBe(false);
});

test('別フレームに前面から覆われている間、[frame disabled=]無しでも自動でフォーカスの輪から外れる', async ({page})=> {
	await seeText(page, 'よみこんだ');
	for (const t of ['ひょうじ', 'とれた', 'うごかした', 'ふぉーかす', 'ふぉーかすぱっど',
	'ふぉーかすぱっどえをだした', 'むこうにした', 'もどした']) {
		await advance(page, t);
	}

	const frmActiveId = ()=> page.evaluate(
		()=> (document.getElementById('yesno') as HTMLIFrameElement)
			.contentDocument?.activeElement?.id || null);
	const activeText = ()=> page.evaluate(()=> document.activeElement?.textContent ?? null);

	await waitIdle(page);

	// 覆われる前：輪はyesnoフレーム内の要素にも届く
	let reached = false;
	for (let i = 0; i < 8 && ! reached; ++i) {
		await page.keyboard.press('ArrowRight');
		if (await frmActiveId() === 'close') reached = true;
	}
	expect(reached).toBe(true);
	await page.keyboard.press('Escape');	// フォーカスを外す：残したままSpaceを押すとボタンの
		// ネイティブなクリック（keyup発火）に食われ、読み進めのSpaceとして働かない

	await advance(page, 'おおった');	// coverフレームがyesnoの手前(float=true)に重なる
	await waitIdle(page);

	// 覆われている間：8回動かしてもyesnoフレーム内には一度も入らず、b1/b2と
	//	現在の[p]待ちマーカー自身（bluesnovel独自の4経路目。todo.md対応。breakline/breakpage
	//	画像が無いこのシナリオでは絵文字✅）だけを回る
	for (let i = 0; i < 8; ++i) {
		await page.keyboard.press('ArrowRight');
		expect(await frmActiveId()).toBeNull();
		expect(await activeText()).toMatch(/^(ボタン[12]|✅)$/);
	}
	await page.keyboard.press('Escape');

	await advance(page, 'はずした');	// coverを隠すと再びyesno側へ届くようになる
	await waitIdle(page);
	reached = false;
	for (let i = 0; i < 8 && ! reached; ++i) {
		await page.keyboard.press('ArrowRight');
		if (await frmActiveId() === 'close') reached = true;
	}
	expect(reached).toBe(true);
});

test('フレーム内の<img data-src=…>はプロジェクトのパス解決を通る', async ({page})=> {
	// 本家 FrameMng.ts:154 →#loadPic2Img() は data-src を searchPath() へ通す。
	//	テンプレのアルバムは解放済み項目に`F_kuchimoto`のような**拡張子なしのアセット名**を
	//	書くので、枠のディレクトリを前置するだけでは`frames/F_kuchimoto`になって
	//	リンク切れになる（実機のアルバムで露見）
	await seeText(page, 'よみこんだ');
	// 'ふぉーかす'は[l]（改ページしない）なので、次の文はその後ろに続く
	for (const t of ['ひょうじ', 'とれた', 'うごかした', 'ふぉーかす', 'ふぉーかすぱっど', 'ふぉーかすぱっどえをだした']) {
		await advance(page, t);
	}

	// **絵の読み込みを待つ**：srcが入った直後はnaturalWidthがまだ0
	const readPics = ()=> page.evaluate(()=> {
		const d = (document.getElementById('yesno') as HTMLIFrameElement).contentDocument!;
		const get = (id: string)=> {
			const i = d.getElementById(id) as HTMLImageElement;
			return {src: i.getAttribute('src') ?? '', w: i.naturalWidth};
		};
		return {asset: get('pic_asset'), local: get('pic_local')};
	});
	await expect.poll(async ()=> (await readPics()).asset.w + (await readPics()).local.w,
		{timeout: 10_000}).toBeGreaterThan(0);
	const pics = await readPics();
	// path.jsonに載る名前は解決されたURLになり、実際に絵が出る（naturalWidth>0）
	expect(pics.asset.src).toContain('asset_pic.png');
	expect(pics.asset.w).toBeGreaterThan(0);
	// サーチパスに無い枠同梱ファイルは、従来どおり枠のディレクトリ前置で拾える
	expect(pics.local.src).toContain('frame_local.png');
	expect(pics.local.w).toBeGreaterThan(0);
});

