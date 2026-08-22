/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2026-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

// 本家 sn_gallery mul_ev（複数イベント待ち）のうち、todo.mdに残っていた
//	「pで始まる7パターン」の検証（シナリオ：test/e2e/app/prj_mulev/main.sn）。
//	本家はpixi.js canvas描画のため、スクリーンショット目視では
//	「[p]クリック直後に効果（quake/tsy等）がまだ続く状態で、後続の待ちタグが正しく
//	待てているか」のタイミングが確証できなかった。bluesnovelはReact+storeなので、
//	zustandストアとDOM文字列を直接読める＝目視に頼らず「本当に待ったか」を実測できる。
//	各ブロックは main.sn 側で「[効果開始][p]」が**同じ1クリックの中**（同期処理）で
//	一気に処理される＝効果はこの1クリックの瞬間に始まる。そこでt0はこのクリックの
//	直前で取る（page.keyboard.press自体のIPC分だけしかズレない）。
//	その次のクリックで[p]を通過させ、後続の待ちタグ（[wq]等）が効果終了まで
//	「おわったX」へ進まないこと・進んだ時点でt0からmsec以上経っていることを検証する

import {expect, test, type Page} from '@playwright/test';
import {mesStr, pressKeyToWaitMark, waitWaitMark} from './snPage';

// index番目のブロック（A=0,B=1,…,G=6）の「p.」へ到達するクリックの直前まで進める
//	（それより手前の各ブロックは2クリックぶんずつ＝到達＋通過で消費するので2*index回）
async function advanceTo(page: Page, index: number) {
	await page.goto('/test/e2e/app/index.html?prj=mulev');
	await waitWaitMark(page);	// じゅんび[p]（ページロード分の待ち時間はここで吸収する）
	for (let i = 0; i < 2 * index; ++i) await pressKeyToWaitMark(page, 'Space');
}

// 「p.」に到達するクリックの直前でt0を取り、効果（msec）の長さぶん経たないと
//	「おわったX」へ進まないことを検証する
async function chkPattern(page: Page, label: string, msec: number) {
	const t0 = Date.now();
	await pressKeyToWaitMark(page, 'Space');	// このクリックの中で効果が始まり「p.」に着く
	expect(await mesStr(page)).toBe('p.');
	expect((await page.evaluate(()=> (globalThis as any).__sn.store.getState().wait))?.kind).toBe('p');

	await pressKeyToWaitMark(page, 'Space');	// [p]を通過。[wq]等の待ちタグが効果終了まで止める

	// 待ち合わせが効いていなければ、ここへ来るまでの時間が効果の長さ未満になる
	//	（本家[p]勝手に進んでしまう、と同種の不具合）
	expect(await mesStr(page)).toBe(`おわった${label}`);
	expect(Date.now() - t0).toBeGreaterThanOrEqual(msec - 150);	// rAF等の粒度分だけ許容
}

test('[quake]中の[p]は必ずクリックが要り、[wq]は揺れの終了まで正しく待つ', async ({page})=> {
	await advanceTo(page, 0);
	await chkPattern(page, 'A', 1200);
});

test('[fadese]中の[p]は必ずクリックが要り、[wf]はフェード完了まで正しく待つ', async ({page})=> {
	await advanceTo(page, 1);	// Aブロックを通過
	await chkPattern(page, 'B', 1200);
});

test('[playse]中の[p]は必ずクリックが要り、[ws]は再生終了まで正しく待つ', async ({page})=> {
	await advanceTo(page, 2);	// A,Bを通過
	await chkPattern(page, 'C', 300);	// se.wavの長さ
});

test('[tsy]中の[p]は必ずクリックが要り、[wait_tsy]は動作終了まで正しく待つ', async ({page})=> {
	await advanceTo(page, 3);	// A,B,Cを通過
	await chkPattern(page, 'D', 1200);
});

test('[tsy_frame]中の[p]は必ずクリックが要り、[wait_tsy id=]は動作終了まで正しく待つ', async ({page})=> {
	await advanceTo(page, 4);	// A,B,C,Dを通過
	await chkPattern(page, 'E', 1200);
});

test('[trans]中の[p]は必ずクリックが要り、[wt]は演出完了まで正しく待つ', async ({page})=> {
	await advanceTo(page, 5);	// A,B,C,D,Eを通過
	await chkPattern(page, 'F', 1200);
});

test('動画（[lay fn=]）再生中の[p]は必ずクリックが要り、[wv]は動画終了まで正しく待つ', async ({page})=> {
	await advanceTo(page, 6);	// A,B,C,D,E,Fを通過

	const t0 = Date.now();
	await pressKeyToWaitMark(page, 'Space');	// このクリックの中で動画再生が始まり「p.」に着く
	expect(await mesStr(page)).toBe('p.');

	// Gブロックの終端は[s]（マーカー無しの完全停止）なので、waitWaitMarkでは検知できない。
	//	動画終了まで[wv]が止めるので、「おわったG」への到達をポーリングで見る
	await page.keyboard.press('Space');	// [p]を通過
	await expect.poll(async ()=> mesStr(page), {timeout: 10_000}).toBe('おわったG');
	expect(Date.now() - t0).toBeGreaterThanOrEqual(2_000 - 150);	// movie.mp4は2秒
});
