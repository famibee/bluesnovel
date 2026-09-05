/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2026-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

// 暗号化アセット（sys.arg.crypto）のリソース検査。
//	シナリオと資材は test/e2e/app/mkPrjCrypto.ts が生成する（鍵はE2E専用の使い捨て。
//	test/e2e/app/snsys_pre.ts が最小の複号プラグインとして最終形を持つ）。
//	画像・アニメpngシート・音声・[add_frame]（HTML本体＋フレーム内画像）の4経路を、
//	1本のシナリオで通しで見る。動画は対象外（todo.md「暗号化mp4はffmpeg依存が重い」）。
//	改竄検査（path.jsonの`:id`ハッシュ照合）はConfigBase.ts側のロジックを
//	test/ConfigBase_crypto.test.tsで別途検証済み

import {expect, test} from '@playwright/test';
import {gainNodeCount, gotoSn, mesStr, pressKey, traceText} from './snPage';

test.beforeEach(async ({page})=> {await gotoSn(page, 'crypto')});

const imgSrc = (page: import('@playwright/test').Page, sel: string)=>
	page.$eval(sel, el=> (el as HTMLImageElement).getAttribute('src') ?? '');
// [add_frame]はDOMを跨ぐ非同期処理でstep()の途中から一旦返るため、waitIdle()（pressKey内部）
//	だけでは「まだ手前の停止点」と区別できない（frame.e2e.tsと同じ事情）。表示の確定はpollで待つ
const seeText = async (page: import('@playwright/test').Page, s: string)=>
	expect.poll(()=> mesStr(page), {timeout: 10_000}).toBe(s);

test('暗号化画像が復号されてBlob URLで表示される', async ({page})=> {
	expect(await mesStr(page)).toBe('はじめ。');

	await pressKey(page, 'Space');
	expect(await mesStr(page)).toBe('えいぞう。');
	// decryptPicUrl（ts/Crypto.ts）がfetch→decAB→Blob URL化する。エラーが出ていれば
	//	<img>が出ずtraceにも残るので、両方を見て「復号を経て本当に表示できた」ことを確かめる
	const src = await imgSrc(page, '#skynovel [data-page="fore"] img');
	expect(src.startsWith('blob:')).toBe(true);
	expect(await traceText(page)).toBe('');
});

test('暗号化アニメpngシートが.json/シート画像とも復号されて再生される', async ({page})=> {
	await pressKey(page, 'Space');
	await pressKey(page, 'Space');
	expect(await mesStr(page)).toBe('あにめ。');

	// Sprite.tsのloadSheetは.json本体をsys.decで、meta.imageが指すシート画像は
	//	decryptPicUrl経由でdecABし、CSSのbackground-imageへBlob URLとして埋め込む
	//	（GrpLayer.tsx: sheet && <div className={aniSpriteClass(sheet)}/>）
	await expect.poll(()=> page.$eval(
		'#skynovel [data-page="fore"] div[class^="sn_ani"]',
		el=> getComputedStyle(el).backgroundImage,
	)).toContain('blob:');
	expect(await traceText(page)).toBe('');
});

test('暗号化文字レイヤ枠画像(b_pic)が復号されてBlob URLで表示される', async ({page})=> {
	await pressKey(page, 'Space');
	await pressKey(page, 'Space');
	await pressKey(page, 'Space');
	expect(await mesStr(page)).toBe('わくがぞう。');

	// ScriptMng#applyAction chgBPicケースがdecryptPicUrl経由でBlob URL化し、
	//	文字レイヤの::before（background-image）へ渡す（TxtLayer.tsx参照）。
	//	#refreshCryptoAssets()と違いライブ経路は元々#decryptPic()を通していなかった不具合の確認
	const bg = await page.$eval('#skynovel [data-page="fore"] [data-lay="mes"]',
		el=> getComputedStyle(el, '::before').backgroundImage);
	expect(bg).toContain('blob:');
	expect(await traceText(page)).toBe('');
});

test('暗号化音声が復号されてデコード・再生できる', async ({page})=> {
	await pressKey(page, 'Space');
	await pressKey(page, 'Space');
	await pressKey(page, 'Space');
	const before = await gainNodeCount(page);

	await pressKey(page, 'Space');
	expect(await mesStr(page)).toBe('おと。');
	// SndMngの#decodeがdecodeAudioDataの直前でdecABへ通す。復号に失敗すればdecodeAudioDataが
	//	例外を投げてtraceへ出る（[playbgm]エラー）ので、GainNodeが増えた（＝再生まで到達した）ことと
	//	エラーが出ていないことの両方で「暗号化wavを最後まで読み切れた」ことを確認する
	expect(await gainNodeCount(page)).toBe(before + 1);
	expect(await traceText(page)).toBe('');
});

test('暗号化HTMLフレームと、フレーム内の暗号化画像が復号される', async ({page})=> {
	await pressKey(page, 'Space');
	await pressKey(page, 'Space');
	await pressKey(page, 'Space');
	await pressKey(page, 'Space');
	await page.keyboard.press('Space');	// [add_frame]の非同期処理を跨ぐのでwaitIdle()は使わない
	await seeText(page, 'ふれーむ。');

	// FrameMng#addがHTML本体をsys.decで複号してsrcdocへ入れる。中の<img data-src=…>は
	//	sn_repResフック経由で#srcOfが非同期にdecryptPicUrlへ通すため、Blob URL化まで少し待つ
	const frame = page.frameLocator('#frm');
	await expect.poll(()=> frame.locator('#p').getAttribute('src')).toMatch(/^blob:/);
	expect(await traceText(page)).toBe('');
});
