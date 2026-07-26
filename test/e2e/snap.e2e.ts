/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2026-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

// システム系のDOM絡みタグ（シナリオ：test/e2e/app/prj_snap/main.sn）。
//	[loadplugin]（cssの読込）・[snapshot]（画面のpng保存）・[navigate_to]（別タブでURL）は
//	どれもブラウザが無いと確かめようがない＝ここでしか見られない：
//	・[loadplugin]は<style>がページへ足され、その規則が実際に効いているか
//	・[snapshot]はダウンロードが実際に発生し、中身がPNGで指定サイズか
//	・[navigate_to]はpopupが開き、そのURLが指定どおりか
//	エンジン側（属性の解釈・停止するかどうか）は test/ScriptEngine_sys.test.ts が見ている。
//
//	3タグとも**非同期の停止点**（読み込み・画像化が終わってから続きが動く）なので、進めるときは
//	pressKey()ではなくpressKeyToWaitMark()を使う。waitIdle()だけだと処理中の一瞬（ストアもDOMも
//	落ち着いて見える）を停止点と誤認して、キーが「文字送りの瞬時完了」に食われる。

import {expect, test} from '@playwright/test';
import {gotoSn, mesStr, pressKey, pressKeyToWaitMark, waitWaitMark} from './snPage';

import {readFileSync} from 'node:fs';

test.beforeEach(async ({page})=> {
	// **viteのdevサーバはcssをJSモジュールへ変換して返す**ので、素のcssを返すよう差し替える。
	//	[loadplugin]は本番（ビルド済みの配信）でそうであるように、cssの中身が返る前提で書かれている
	await page.route('**/plugin.css', route=> route.fulfill({
		contentType: 'text/css', body: '.sn_e2e_plugin {color: rgb(1, 2, 3);}',
	}));
	await gotoSn(page, 'snap');
	await waitWaitMark(page);	// [loadplugin]の読込を挟むので、本物の[p]に着くまで待つ
});

test('[loadplugin]が読んだcssがページに効く', async ({page})=> {
	// join=true（既定）なので、[loadplugin]の次の文が出ている＝読み込みは終わっている
	expect(await mesStr(page)).toBe('よみこんだ');

	// 実際に規則が効くか。<style>が足されただけでは意味がないので、要素に当てて計算値で見る
	const color = await page.evaluate(()=> {
		const d = document.createElement('div');
		d.className = 'sn_e2e_plugin';
		document.body.appendChild(d);
		const c = getComputedStyle(d).color;
		d.remove();
		return c;
	});
	expect(color).toBe('rgb(1, 2, 3)');
});

test('[snapshot]がPNGをダウンロードさせる', async ({page})=> {
	const dl = page.waitForEvent('download');
	await pressKeyToWaitMark(page, 'Space');	// [snapshot]を通って とった[p] へ

	const d = await dl;
	// ファイル名は fn属性＋日時＋.png（本家 LayerMng.ts:339 と同じ組み立て）
	expect(d.suggestedFilename()).toMatch(/^e2e_shot[\d_-]+\.png$/);

	// 中身がPNGか。先頭8バイトがPNGのシグネチャ
	const buf = readFileSync(await d.path());
	expect([...buf.subarray(0, 8)]).toEqual([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A]);

	// IHDRの幅・高さはprj.jsonのwindow.width/height＝ステージ実寸（width/height属性の省略時）
	expect(buf.readUInt32BE(16)).toBe(800);
	expect(buf.readUInt32BE(20)).toBe(600);

	// 撮り終わってからシナリオが続く
	expect(await mesStr(page)).toBe('とった');
});

test(`[snapshot fn='userdata:/…']はDLせずセーブ層へ入り、[lay fn=]で読み返せる`, async ({page})=> {
	// 本家はセーブデータと同じフォルダへ実ファイルを書くが、ブラウザにフォルダは無いので
	//	localStorageへdata URLのまま置く（SaveMng.putFile）。しおりのサムネイル用途
	await pressKeyToWaitMark(page, 'Space');	// [snapshot fn=e2e_shot] → とった[p]

	let dl = false;
	page.on('download', ()=> {dl = true});
	await pressKeyToWaitMark(page, 'Space');	// userdata:/へ撮る → しまった[p]
	expect(await mesStr(page)).toBe('しまった');
	expect(dl).toBe(false);	// ダウンロードは起きない

	// [lay fn='userdata:/thumb.png']が同じ絵を引ける。撮影サイズ（80x60）で入っている
	const im = await page.evaluate(()=> {
		const e = document.querySelector<HTMLImageElement>(`#skynovel [data-page="fore"] img`);
		return e ? {src: e.getAttribute('src') ?? '', w: e.naturalWidth, h: e.naturalHeight} : undefined;
	});
	expect(im?.src).toMatch(/^data:image\/png;base64,/);
	expect(im).toMatchObject({w: 80, h: 60});
});

test('出力フォーマットは拡張子で決まる', async ({page})=> {
	// 本家のダウンロード側は常にpng（LayerMng.ts:343 が日時の後ろへ.pngを足す）。
	//	こちらは日時を拡張子の前へ入れるので、どちらの行き先でも拡張子どおりになる
	for (let i = 0; i < 2; ++i) await pressKeyToWaitMark(page, 'Space');

	const dl = page.waitForEvent('download');
	await pressKeyToWaitMark(page, 'Space');	// [snapshot fn=e2e_shot.jpg] → じぇいぺぐ[p]

	const d = await dl;
	expect(d.suggestedFilename()).toMatch(/^e2e_shot[\d_-]+\.jpg$/);
	// 中身がJPEGか（先頭3バイト＝SOIマーカ）
	expect([...readFileSync(await d.path()).subarray(0, 3)]).toEqual([0xFF, 0xD8, 0xFF]);
});

test('[navigate_to]が別タブでURLを開く', async ({page})=> {
	for (let i = 0; i < 3; ++i) await pressKeyToWaitMark(page, 'Space');	// [snapshot]3つを通る

	const pop = page.waitForEvent('popup');
	await pressKey(page, 'Space');	// [navigate_to] → ひらいた[s]（[s]は待ちマーカーを立てない）

	expect((await pop).url()).toBe('https://example.com/');
	await expect.poll(()=> mesStr(page)).toBe('ひらいた');
});
