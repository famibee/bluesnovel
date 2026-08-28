/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2026-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

// ページ裏表・[trans]・[wt]（シナリオ：test/e2e/app/prj_trans/main.sn）。
//	この3つは「表示そのもの」なのでブラウザでしか確かめられない部分が多い：
//	・クロスフェード（表ページのopacityが下がり、裏ページが見えている）
//	・[wt]が演出の間シナリオを止めていること
//	・クリックで演出を飛ばすと、中途半端な見た目ではなく必ず終了状態になること
//	どのアクションを積むか（layer=の分解・time=0・page属性の既定）は
//	test/ScriptEngine_trans.test.ts が持っているので、ここでは重ねて確かめない

import {expect, test, type Page} from '@playwright/test';
import {SEL_FORE, gotoSn, mesStr, pageStyle, pressKeyToWaitMark, snap, txtBoxStyle, waitIdle, waitTransCleared, waitTransDone, waitTransRunning} from './snPage';
import {ruleMaskFunc} from '../../src/ts/Trans';

test.beforeEach(async ({page})=> {await gotoSn(page, 'trans')});

// **文字レイヤ背景の実際の不透明度は b_alpha × sys:TextLayer.Back.Alpha**（本家 TxtLayer.ts:388）。
//	sys:の既定は0.5（本家 creSYS_DATA()）なので、b_alpha=1でも見た目は0.5になる。
//	b_alpha_isfixed=true を指定したレイヤだけが掛け算を免れる
const BG_OPAQUE	= 'rgba(127, 255, 212, 0.5)';	// b_alpha=1 × 0.5

test('[lay page=back]で裏ページへ書いた内容が、[trans]で表に出る', async ({page})=> {
	// 開始時：表は既定の不透明（b_alpha=1）。裏にはまだ何も書いていない
	expect(await mesStr(page)).toBe('おもて');
	expect(await txtBoxStyle(page, 'background-color')).toBe(BG_OPAQUE);

	await page.keyboard.press('Space');
	await waitTransRunning(page);
	// 裏ページには[lay b_alpha=0.2 page=back]が入っている（まだ表には出ていない）
	const s1 = await snap(page);
	expect(s1.aLayBack.find(l=> l.nm === 'mes')?.b_alpha).toBe(0.2);
	expect(s1.aLay.find(l=> l.nm === 'mes')?.b_alpha).toBe(1);

	// 演出が終われば表裏が入れ替わり、裏に書いた不透明度が画面に効く
	await waitTransDone(page);
	expect(await mesStr(page)).toBe('うら');
	expect(await txtBoxStyle(page, 'background-color')).toBe('rgba(127, 255, 212, 0.1)');	// 0.2 × 0.5
	expect((await snap(page)).foreIdx).toBe(1);
});

test('演出中は表ページが透明になっていき、裏ページが見えている', async ({page})=> {
	await page.keyboard.press('Space');
	await waitTransRunning(page);

	// 裏ページは演出中だけ表示される（ふだんはvisibility:hidden）
	await expect.poll(async ()=> (await pageStyle(page)).back.visibility, {timeout: 5_000})
		.toBe('visible');
	// 表ページのopacityが1から下がっていく
	await expect.poll(async ()=> (await pageStyle(page)).fore.opacity, {timeout: 5_000})
		.toBeLessThan(1);

	// 完了後は元通り（透明にした側は裏へ回るのでopacityは1へ戻す）
	await waitTransDone(page);
	const st = await pageStyle(page);
	expect(st.fore.opacity).toBe(1);
	expect(st.fore.visibility).toBe('visible');
	expect(st.back.visibility).toBe('hidden');
});

test('[wt]は演出が終わるまでシナリオを止める', async ({page})=> {
	await page.keyboard.press('Space');
	await waitTransRunning(page);

	// [wt]で止まっているので、この間は次の文（うら）へ進んでいない
	expect(await mesStr(page)).toBe('おもて');
	expect((await snap(page)).foreIdx).toBe(0);

	await waitTransDone(page);
	expect(await mesStr(page)).toBe('うら');
});

test('[wt]中のクリックで演出を飛ばせる（中途半端な状態では止まらない）', async ({page})=> {
	await page.keyboard.press('Space');
	await waitTransRunning(page);

	// 演出（600ms）の途中で表ページをクリック。終了状態へ飛んで即座に続きが流れる
	const t0 = Date.now();
	await page.locator(`${SEL_FORE} span`).first().click();
	// **測るのは演出の終わりまで**。waitTransDone()だと続く本文の文字送り
	//	（[ch_in_style]の既定で500ms）まで込みになり、演出を飛ばせたかが見えなくなる
	await waitTransCleared(page);
	expect(Date.now() - t0).toBeLessThan(600);
	await waitIdle(page);

	// 「終了状態」なので、途中のopacityのまま止まったりはしない
	const st = await pageStyle(page);
	expect(st.fore.opacity).toBe(1);
	expect(st.back.visibility).toBe('hidden');
	expect(await mesStr(page)).toBe('うら');
	expect(await txtBoxStyle(page, 'background-color')).toBe('rgba(127, 255, 212, 0.1)');	// 0.2 × 0.5
});

test('[trans time=0]は演出なしで即交換され、[wt]も素通しになる', async ({page})=> {
	await page.keyboard.press('Space');	// 1回目の[trans time=600]
	await waitTransDone(page);
	expect(await mesStr(page)).toBe('うら');

	await page.keyboard.press('Space');	// 裏ページを組むだけの停止点
	await waitTransDone(page);
	await page.keyboard.press('Space');	// [trans time=0]
	await waitTransDone(page);
	await page.keyboard.press('Space');	// [er]の手前に置いた停止点を越える
	await waitTransDone(page);
	expect(await mesStr(page)).toBe('みっつめ');
	expect(await txtBoxStyle(page, 'background-color')).toBe('rgba(127, 255, 212, 0.45)');	// 0.9 × 0.5
	// 表裏が2回入れ替わったので、表は元の面（0）へ戻っている
	expect((await snap(page)).foreIdx).toBe(0);
});

test('[er]は表裏どちらの文字も消す', async ({page})=> {
	// [trans]の直後の[er]。交換前の表（＝今の裏）に残る「おもて」も消えていないと、
	//	次の[trans]で裏が表に出た瞬間に前の場面の文字が蘇る
	expect(await mesStr(page)).toBe('おもて');

	await page.keyboard.press('Space');
	await waitTransDone(page);

	const {aLay, aLayBack} = await snap(page);
	expect(aLay.find(l=> l.nm === 'mes')?.str).toBe('うら');
	expect(aLayBack.find(l=> l.nm === 'mes')?.str).toBe('');
});

test('[button page=back]は裏ページに乗り、[trans]で表に出る', async ({page})=> {
	await page.keyboard.press('Space');	// [trans time=600] → うら[l]
	await waitTransDone(page);
	await page.keyboard.press('Space');	// 裏ページへ[button page=back]を置く停止点
	await waitTransDone(page);

	// この時点ではボタンは裏だけ。表には無く、画面にも出ていない
	const s1 = await snap(page);
	expect(s1.aLay.find(l=> l.nm === 'mes')?.aBtn).toEqual([]);
	expect(s1.aLayBack.find(l=> l.nm === 'mes')?.aBtn?.[0]?.text).toBe('うらボタン');
	await expect(page.locator(SEL_FORE).getByText('うらボタン')).toHaveCount(0);

	// [trans]で裏が表になると、ボタンも一緒に出てくる
	await page.keyboard.press('Space');
	await waitTransDone(page);
	const s2 = await snap(page);
	expect(s2.aLay.find(l=> l.nm === 'mes')?.aBtn?.[0]?.text).toBe('うらボタン');
	await expect(page.locator(SEL_FORE).getByText('うらボタン')).toHaveCount(1);

	// そして[er]は本文だけでなく**ボタンも**消す（本家 TxtLayer.ts:855 clearLay）
	await page.keyboard.press('Space');
	await waitTransDone(page);
	const s3 = await snap(page);
	expect(s3.aLay.find(l=> l.nm === 'mes')?.aBtn).toEqual([]);
	expect(s3.aLayBack.find(l=> l.nm === 'mes')?.aBtn).toEqual([]);
	await expect(page.locator(SEL_FORE).getByText('うらボタン')).toHaveCount(0);
});

test('[finish_trans]は長い演出を待たずに終わらせ、表裏の交換まで済ませる', async ({page})=> {
	for (let i = 0; i < 4; ++i) {	// みっつめ（[trans time=0]の直後）まで進める
		await page.keyboard.press('Space');
		await waitTransDone(page);
	}
	expect(await mesStr(page)).toBe('みっつめ');

	// [trans time=9000]の直後に[finish_trans]。9秒待たずに交換まで済む
	const t0 = Date.now();
	await page.keyboard.press('Space');
	await waitTransDone(page);
	expect(await mesStr(page)).toBe('うちきった');
	expect(Date.now() - t0).toBeLessThan(5_000);

	expect((await snap(page)).foreIdx).toBe(1);	// 交換された
	expect(await txtBoxStyle(page, 'background-color')).toBe('rgba(127, 255, 212, 0.2)');	// 0.4 × 0.5
});

test('[er]を挟まない[trans]でも前の場面の文字が復活しない（回帰テスト）', async ({page})=> {
	// エンジン内部の本文蓄積（#hTxt/#hTxtBk）が[trans]の表裏交換に追随していないと、
	//	新しい表（＝元の裏）へ古い表の文が継ぎ足されて「まえつぎ」になってしまう
	for (let i = 0; i < 5; ++i) {	// みっつめ → うちきった まで
		await page.keyboard.press('Space');
		await waitTransDone(page);
	}
	expect(await mesStr(page)).toBe('うちきった');

	await page.keyboard.press('Space');	// [er]まえ[l]
	await waitTransDone(page);
	expect(await mesStr(page)).toBe('まえ');

	await page.keyboard.press('Space');	// [trans time=300][wt]つぎ[l]（[er]は挟まない）
	await waitTransDone(page);
	expect(await mesStr(page)).toBe('つぎ');
});

test('[trans glsl=mosaic/blur]（プリセット名）が解決・コンパイルされ、演出後に表裏交換される', async ({page})=> {
	const errs: string[] = [];
	page.on('console', m=> {if (m.type() === 'error') errs.push(m.text())});
	page.on('pageerror', e=> errs.push(String(e)));

	for (let i = 0; i < 7; ++i) {	// つぎ まで
		await pressKeyToWaitMark(page, 'Space');
		await waitTransDone(page);
	}
	expect(await mesStr(page)).toBe('つぎ');

	for (const [tag, mes] of [['mosaic', 'glsl_mosaic'], ['blur', 'glsl_blur']] as const) {
		await page.keyboard.press('Space');	// [er][lay page=back][trans time=400 glsl=<tag>][wt]
		await waitTransRunning(page);
		// glsl トランジション専用 canvas が出る＝transPresets の <tag> シェーダが link() を通った
		//	（コンパイル失敗なら setup() が canvas を appendChild する前に throw する）
		await expect(page.locator('#skynovel canvas')).toHaveCount(1);

		await waitTransDone(page);
		expect(await mesStr(page)).toBe(mes);
		expect((await snap(page)).foreIdx).toBe(tag === 'mosaic' ? 1 : 0);	// 交換のたび反転
	}
	expect(errs).toEqual([]);	// シェーダのコンパイル／リンクエラーが出ていない
});

// ============ ルール画像によるワイプ（[trans rule=…]） ============
//	**「時間を進める機構」と「進度→見た目」を切り離してある**（src/ts/Trans.ts のコメント）。
//	進度→係数の計算は単体テスト（test/Trans.test.ts）が全域を押さえているので、ここでは
//	rAFを止めて（__sn.freezeRaf()）任意の進度の係数を流し込み、**その進度で本当にその絵になるか**
//	だけを画素で見る。時間待ちに頼らないので、演出の途中という一番撮りにくい瞬間が決定的に検証できる

// 画面を撮って、指定座標の色を拾う。PNGのデコードはブラウザ（canvas）にやらせる＝依存を増やさない
async function pixels(page: Page, aPt: {x: number; y: number}[]) {
	const b64 = (await page.screenshot()).toString('base64');
	return page.evaluate(async ({b64, aPt})=> {
		const img = new Image;
		img.src = `data:image/png;base64,${b64}`;
		await img.decode();
		const cvs = document.createElement('canvas');
		cvs.width = img.naturalWidth;
		cvs.height = img.naturalHeight;
		const ctx = cvs.getContext('2d')!;
		ctx.drawImage(img, 0, 0);
		return aPt.map(({x, y})=> {
			const d = ctx.getImageData(Math.round(x), Math.round(y), 1, 1).data;
			return [d[0]!, d[1]!, d[2]!] as [number, number, number];
		});
	}, {b64, aPt});
}

// [trans rule=…]の場面まで進め、rAFを止める（＝進度をこちらで決められる状態にする）
async function toRuleScene(page: Page) {
	// **待ちマーカーで本物の停止点を確かめてから次を押す**。[trans]の演出中は
	//	「ストアもDOMも一致して文字送りも終わっている」瞬間があり、waitTransDone()だけだと
	//	そこで押したキーが進行に使われず失われる（Main.tsx next()）。5つとも[l]/[p]なので
	//	マーカーが立つ
	for (let i = 0; i < 9; ++i) {	// glsl_blur（rule 場面の手前）まで
		await pressKeyToWaitMark(page, 'Space');
		await waitTransDone(page);
	}
	await page.keyboard.press('Space');	// [trans time=9000 rule=rule_lr]
	await expect(page.locator('#sn_rule_msk')).toHaveCount(1);
	// freezeRaf()は差し替え時点で既に発行済みの実rAF（1回分）が走り終わるまで待ってから返る
	//	（そうしないと直後のsetTick()と競合し、実測tickで上書きされたまま返ることがある）
	await page.evaluate(()=> (globalThis as any).__sn.freezeRaf());
}
// 進度tickの係数をSVGフィルタへ流し込む（Stage側が毎フレームやっているのと同じ計算・同じ場所）
async function setTick(page: Page, tick: number) {
	const {slope, intercept} = ruleMaskFunc(tick);
	await page.locator('#sn_rule_flt feFuncA').evaluate((el, {slope, intercept})=> {
		el.setAttribute('slope', String(slope));
		el.setAttribute('intercept', String(intercept));
	}, {slope, intercept});
}

test('[trans rule=…]は進度に応じてルール画像の暗い所から表ページを消す', async ({page})=> {
	await toRuleScene(page);

	// 表ページの箱＝ステージそのもの。ここの左右5点をルール画像の位置（0.1〜0.9）で拾う
	const box = (await page.locator('#skynovel [data-page="fore"]').boundingBox())!;
	// 既定vague=0.04＝境界の前後0.04がぼけるので、そこを避けた位置で拾う（ぼけ自体は次のテスト）
	const aFrac = [0.1, 0.3, 0.45, 0.7, 0.9];
	const aPt = aFrac.map(f=> ({x: box.x + box.width * f, y: box.y + box.height * 0.8}));
	const RED = [255, 0, 0], BLUE = [0, 0, 255];

	// tick=0：まだ表（赤）が全面
	await setTick(page, 0);
	expect(await pixels(page, aPt)).toEqual([RED, RED, RED, RED, RED]);

	// tick=0.5：ルール画像の左半分（暗い側）が消え、裏（青）が出ている
	await setTick(page, 0.5);
	expect(await pixels(page, aPt)).toEqual([BLUE, BLUE, BLUE, RED, RED]);

	// tick=0.8：0.8より暗い所まで消える
	await setTick(page, 0.8);
	expect(await pixels(page, aPt)).toEqual([BLUE, BLUE, BLUE, BLUE, RED]);

	// tick=1：全部消えて裏だけ
	await setTick(page, 1);
	expect(await pixels(page, aPt)).toEqual([BLUE, BLUE, BLUE, BLUE, BLUE]);
});

test('境界はvague幅でぼける（中間色が出る）', async ({page})=> {
	await toRuleScene(page);
	await setTick(page, 0.5);

	const box = (await page.locator('#skynovel [data-page="fore"]').boundingBox())!;
	const y = box.y + box.height * 0.8;
	// 既定vague=0.04なので、境界（0.5）のちょうど上は赤と青の中間色になる
	const [c] = await pixels(page, [{x: box.x + box.width * 0.5, y}]);
	expect(c![0]).toBeGreaterThan(80);	// 赤成分が半分ほど残る
	expect(c![0]).toBeLessThan(180);
	expect(c![2]).toBeGreaterThan(80);	// 青も混ざる
});
