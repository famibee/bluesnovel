/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2026-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

// 文字出現演出（`[ch_in_style]`＋`[lay in_style=…]`）が**実際に文字を動かしている**か
//	（シナリオ：test/e2e/app/prj_chstyle/main.sn）。
//	属性の読み取りと値の翻訳は test/ChStyle.test.ts。ここで見るのは算出値だけ。
//
//	**「その場面へ進めた直後にWeb Animations APIのAnimationを凍結し、1手だけ進める」**という形で
//	書いてある。凍結後に手で時刻を進めれば、時間待ちに頼らず**動き始めの姿**を確かめられる。
//	本家はCSSの`@keyframes`なのでanimation-nameを見れば済むが、こちらはWeb Animations APIが
//	インラインstyleへ反映する算出値（getComputedStyle）を見る。
//
//	**GSAP時代との違い**：GSAPは「グローバルなアニメ時計」を先に止めておけば、その後に作られる
//	トゥイーンも含めてまとめて凍結できたが、Web Animations APIにはそれに相当するAPIが無い
//	（`document.getAnimations()`は呼び出し時点で存在するAnimationしか返さない）。そのため
//	**凍結はキー押下の直後**（Animationが生成された後）に行う必要がある。ReactのuseLayoutEffectは
//	DOM更新と同じ同期区間でコミットされるため、`page.keyboard.press()`の返り値がresolveする時点で
//	Animationは生成済みのはずだが、`page.evaluate()`の往復ぶん数msは既に進行してしまう
//	（既存のアサーションは数十ms単位の余裕を持つ緩い比較なので実害は無い見込み）。
//
//	なお止めた後は文字送りが終わらない＝`waitIdle()`が返らないので、
//	**凍結後に押すキーは1回だけ**にし、待ちは本文の文字数で見る。

import {expect, test} from '@playwright/test';
import type {Page} from '@playwright/test';
import {SEL_FORE, gotoSn, mesStr, pressKey, waitIdle} from './snPage';

test.beforeEach(async ({page})=> {await gotoSn(page, 'chstyle')});

// 今存在するWeb Animations APIのAnimationを全部止める。以降、文字は「止めた瞬間の姿」で固まる
const freeze = (page: Page)=> page.evaluate(()=> {
	document.getAnimations().forEach(a=> a.pause());
});
// 本文の1文字＝1spanの算出値（charsRef直下に表示単位ごとに積まれる）
const chStyles = (page: Page)=> page.evaluate(sel=> {
	const mes = document.querySelector(`${sel} span[data-lay="mes"]`);
	const box = mes?.firstElementChild;
	if (! box) return [];
	return Array.from(box.children).map(el=> {
		const cs = getComputedStyle(el);
		return {opacity: Number(cs.opacity), transform: cs.transform};
	});
}, SEL_FORE);
// 「変形なし」の算出値。`chStyleAnim()`のtoは常にCSSの初期値と一致するので、恒等行列ではなく
//	厳密に'none'になる（ChStyle.ts参照）。この配列自体が「アニメ完了後にtransformを残さない」
//	ことの回帰検知になる
const IDENTITY = ['none'];
// 止めた時間を指定秒だけ手で進める。**staggerの効き（文字ごとの遅れ）は時刻0では見えない**
//	——全文字がまだ開始値に居るため——ので、狙った時刻の姿を撮るのに要る
const advance = (page: Page, sec: number)=> page.evaluate(sec=> {
	document.getAnimations().forEach(a=> {a.currentTime = (Number(a.currentTime) || 0) + sec * 1000});
}, sec);

// 停止点をn回越えてから、**最後の1手を押した直後に凍結**して進める。
//	どの場面に居るかは本文で確かめる（数え違えても黙って通らないように）
async function toSceneFrozen(page: Page, nBefore: number, str: string) {
	for (let i = 0; i < nBefore; ++i) {await pressKey(page, 'Space'); await waitIdle(page)}
	// **凍結後はpressKey()（＝waitIdle付き）を使わない**。文字送りが終わらないので返らなくなる
	await page.keyboard.press('Space');
	await freeze(page);
	// 凍結中はisTypingが下りない＝waitIdle()が返らないので、本文の入れ替わりで到着を判定する
	await expect.poll(()=> mesStr(page)).toBe(str);
}


test('既定（組み込みdefault）は透明・ずれた状態から始まる', async ({page})=> {
	// 本家 TxtLayer.ts:120 の default は alpha=0・x='=0.3'（＝文字の幅の30%）。
	//	最後の場面は**定義していない名前**（in_style=nothing）なので、ここが同時に
	//	「未定義名は組み込みのdefaultへ落ちる」の確認にもなっている
	await toSceneFrozen(page, 2, 'おち');
	// **時刻をこちらから進めてから見る**。凍結（pause）した瞬間の`currentTime`は、
	//	キー押下からfreeze()までのCDP往復ぶんだけ既に進んでいて厳密に0とは限らないため、
	//	そこからさらに一定量進めることで、経過時間に依存しない狙った時刻の姿を安定して撮れる
	await advance(page, 0.06);

	const a = await chStyles(page);
	expect(a.length).toBeGreaterThan(0);
	expect(a[0]!.opacity).toBeLessThan(1);	// 500msのうち60msぶんしか進んでいない
	expect(IDENTITY).not.toContain(a[0]!.transform);	// translateが効いている
});

test('[ch_in_style wait=0]はアニメせず終端状態で出る', async ({page})=> {
	// 時間を止めてあるのに終端＝そもそもAnimationを作っていない
	//	（素のDOM既定値がそのまま演出の終端と一致するため、何もしなくてよい。ChStyle.ts参照）
	await toSceneFrozen(page, 0, 'すぐ');

	const a = await chStyles(page);
	expect(a.length).toBeGreaterThan(0);
	for (const v of a) {
		expect(v.opacity).toBe(1);
		expect(IDENTITY).toContain(v.transform);
	}
});

test('join=falseは全文字が同時に動く', async ({page})=> {
	// 本家は animation-delay を 0ms に潰す。こちらは stagger を 0 にする
	await toSceneFrozen(page, 1, 'どうじ');
	await advance(page, 0.06);	// 時刻0だと「全部同じ」は当たり前なので、少し進めてから見る

	const a = await chStyles(page);
	expect(a.length).toBeGreaterThan(1);
	// 進度が同じ＝不透明度も変形も同じ
	for (const v of a) {
		expect(v.opacity).toBeCloseTo(a[0]!.opacity, 3);
		expect(v.transform).toBe(a[0]!.transform);
	}
});

test('既定（join=true）は文字ごとに進度がずれる', async ({page})=> {
	// join=falseとの対。時間を少しだけ進めると、1文字目の方が先に進んでいる
	//	（staggerで後ろの文字ほど遅れて動き出す）
	await toSceneFrozen(page, 2, 'おち');
	await advance(page, 0.06);	// stagger 0.035秒の1文字分より少し先まで

	const a = await chStyles(page);
	expect(a.length).toBeGreaterThan(1);
	expect(a[0]!.opacity).toBeGreaterThan(a.at(-1)!.opacity);
});

test('[span ch_in_style=…]は文字ごとに演出を変える', async ({page})=> {
	// レイヤ単位の指定（[lay in_style=default]）より、文字ごとの指定が勝つ。
	//	1文字目だけ instant（wait=0）なので、そこだけ最初から終端の姿
	await toSceneFrozen(page, 3, 'まざり');
	await advance(page, 0.06);

	const a = await chStyles(page);
	expect(a.length).toBe(3);
	expect(a[0]!.opacity).toBe(1);			// ま：instant＝アニメしない
	expect(IDENTITY).toContain(a[0]!.transform);
	expect(a[1]!.opacity).toBeLessThan(1);	// ざり：default＝まだ動いている途中
	expect(a[2]!.opacity).toBeLessThan(1);
});

test('[autowc]は表に載せた文字の手前で長く待つ', async ({page})=> {
	// **待ちはその文字が出る前に入る**（本家 TxtLayer.ts:762 が cumDelay に足してから
	//	その文字の animation-delay に書くのと同じ）。「、」に500msなので、
	//	「、」自身とそれ以降が丸ごと後ろへずれる。
	//	また**表に無い文字の待ちは0**（本家も `hAutoWc[ch] ?? 0`）なので、
	//	[autowc]が効いている間は表に載せた文字までが一気に出る
	await toSceneFrozen(page, 4, 'あ、い');
	await advance(page, 0.06);

	const a = await chStyles(page);
	expect(a.length).toBe(3);
	expect(a[0]!.opacity).toBeGreaterThan(0);	// あ：待ち0なので即動き出す
	expect(a[1]!.opacity).toBe(0);				// 、：500msの待ちを挟むのでまだ開始値のまま
	expect(a[2]!.opacity).toBe(0);				// い：その後ろなので同じく
});

test('sys:sn.tagCh.msecWaitを変えると既定演出の間隔もその値に追随する', async ({page})=> {
	// 実機で「大きな数字にしても一文字ずつ表示されているように見えない」という報告があり、
	//	ここまでのテストは相対比較（stagger自体があるか）しか見ておらずsys:からの伝播そのものは
	//	未検証だったための追加（本文はTxtLayer.tsx:292 の w = ch.w ?? chWait 経路）。
	//	msecWait=500・既定演出（wait=500・join=true）で2文字「まち」を出すと、
	//	1文字目はdelay=500ms・2文字目はdelay=1000msになる想定（本文はpos計算のコメント参照）。
	//	実時間のsleep+スクリーンショットで100msごとに確かめると、CIの負荷でその都度ずれて
	//	アサーションを緩めるしかなくなる。freeze()済みのAnimationはcurrentTimeを手で進められる
	//	ので、1msも待たずに「100ms刻みで見た時の姿」を正確に再現できる
	await toSceneFrozen(page, 5, 'まち');

	let prev = 0;
	const opacityAt = async (sec: number)=> {
		await advance(page, sec - prev);
		prev = sec;
		return chStyles(page);
	};

	// 0.1〜0.4秒：1文字目のdelay（500ms）にすら届かないので、2文字とも動いていない
	for (const sec of [0.1, 0.2, 0.3, 0.4]) {
		const a = await opacityAt(sec);
		expect(a.length).toBe(2);
		expect(a[0]!.opacity).toBe(0);
		expect(a[1]!.opacity).toBe(0);
	}
	// 0.6秒：1文字目（delay=500ms）だけ動き出している。2文字目（delay=1000ms）はまだ
	{
		const a = await opacityAt(0.6);
		expect(a[0]!.opacity).toBeGreaterThan(0);
		expect(a[0]!.opacity).toBeLessThan(1);
		expect(a[1]!.opacity).toBe(0);
	}
	// 1.1秒：1文字目は出現アニメ完了（delay500+wait500=1000ms）。2文字目（delay=1000ms）が動き出す
	{
		const a = await opacityAt(1.1);
		expect(a[0]!.opacity).toBe(1);
		expect(a[1]!.opacity).toBeGreaterThan(0);
		expect(a[1]!.opacity).toBeLessThan(1);
	}
	// 1.6秒：2文字とも出現アニメ完了（delay1000+wait500=1500ms）
	{
		const a = await opacityAt(1.6);
		expect(a[0]!.opacity).toBe(1);
		expect(a[1]!.opacity).toBe(1);
	}
});
