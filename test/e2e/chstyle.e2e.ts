/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2026-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

// 文字出現演出（`[ch_in_style]`＋`[lay in_style=…]`）が**実際に文字を動かしている**か
//	（シナリオ：test/e2e/app/prj_chstyle/main.sn）。
//	属性の読み取りと値の翻訳は test/ChStyle.test.ts。ここで見るのは算出値だけ。
//
//	**「その場面の直前まで進めてからGSAPを止め、1手だけ進める」**という形で書いてある。
//	止めた後に積まれたtweenは開始値を当てたところで固まる（GSAPのfromToは即座にfromを描く）ので、
//	時間待ちに頼らず**動き始めの姿**を確かめられる。
//	逆に止める前に終わってしまった演出は終端の姿しか残らないため、順序が重要。
//	本家はCSSの`@keyframes`なのでanimation-nameを見れば済むが、こちらはGSAPが
//	インラインstyleへ書く値を見る。
//
//	なお止めた後は文字送りが終わらない＝`waitIdle()`が返らないので、
//	**凍結後に押すキーは1回だけ**にし、待ちは本文の文字数で見る。

import {expect, test} from '@playwright/test';
import type {Page} from '@playwright/test';
import {SEL_FORE, gotoSn, mesStr, pressKey, waitIdle} from './snPage';

test.beforeEach(async ({page})=> {await gotoSn(page, 'chstyle')});

// GSAPの時間を止める。以降、文字は「アニメ開始直後の姿」で固まる
const freeze = (page: Page)=> page.evaluate(()=> {
	(globalThis as any).__sn.gsap.globalTimeline.pause();
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
// 「変形なし」の算出値（argdef.e2e.ts と同じ理由で2通りある）
const IDENTITY = ['none', 'matrix(1, 0, 0, 1, 0, 0)'];
// 止めた時間を指定秒だけ手で進める。**staggerの効き（文字ごとの遅れ）は時刻0では見えない**
//	——全文字がまだ開始値に居るため——ので、狙った時刻の姿を撮るのに要る
const advance = (page: Page, sec: number)=> page.evaluate(sec=> {
	const {globalTimeline} = (globalThis as any).__sn.gsap;
	globalTimeline.time(globalTimeline.time() + sec);
}, sec);

// 停止点をn回越えてから凍結し、**最後の1手だけ凍結状態で**進める。
//	どの場面に居るかは本文で確かめる（数え違えても黙って通らないように）
async function toSceneFrozen(page: Page, nBefore: number, str: string) {
	for (let i = 0; i < nBefore; ++i) {await pressKey(page, 'Space'); await waitIdle(page)}
	await freeze(page);
	// **凍結後はpressKey()（＝waitIdle付き）を使わない**。文字送りが終わらないので返らなくなる
	await page.keyboard.press('Space');
	// 凍結中はisTypingが下りない＝waitIdle()が返らないので、本文の入れ替わりで到着を判定する
	await expect.poll(()=> mesStr(page)).toBe(str);
}


test('既定（組み込みdefault）は透明・ずれた状態から始まる', async ({page})=> {
	// 本家 TxtLayer.ts:120 の default は alpha=0・x='=0.3'（＝文字の幅の30%）。
	//	最後の場面は**定義していない名前**（in_style=nothing）なので、ここが同時に
	//	「未定義名は組み込みのdefaultへ落ちる」の確認にもなっている
	await toSceneFrozen(page, 2, 'おち');
	// **時刻をこちらから進めてから見る**。止めた直後はGSAPがまだ1度も描いていないことがあり
	//	（tweenの初回描画は親タイムラインのtickで起きる＝止めていると来ない）、
	//	前の場面の姿が残っていることがある。1度進めれば必ずその時刻の姿になる
	await advance(page, 0.06);

	const a = await chStyles(page);
	expect(a.length).toBeGreaterThan(0);
	expect(a[0]!.opacity).toBeLessThan(1);	// 500msのうち60msぶんしか進んでいない
	expect(IDENTITY).not.toContain(a[0]!.transform);	// translateが効いている
});

test('[ch_in_style wait=0]はアニメせず終端状態で出る', async ({page})=> {
	// 時間を止めてあるのに終端＝そもそもtweenを積んでいない（gsap.setで確定させている）
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
