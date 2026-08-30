/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2026-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

// 文字消去演出（`[ch_out_style]`＋`[lay out_style=…]`）が**実際に文字を消しながら動かして**
//	いるか（シナリオ：test/e2e/app/prj_choutstyle/main.sn）。
//	属性の読み取り・値の翻訳は test/ChStyle.test.ts。ここで見るのは実際の見た目の側。
//
//	消えていく文字は React 管理外のゴースト span（`[data-erase]`。charsRef の兄弟、
//	`position:absolute` で本文位置に重ねる）へ移してアニメする（本家 TxtStage.#clearText()。
//	詳細 src/docs/text-rendering.md）。出現演出と同じく Web Animations API を凍結して
//	「動き始めの姿」を時間待ちに頼らず撮る（chstyle.e2e.ts と同じ手法）。

import {expect, test} from '@playwright/test';
import type {Page} from '@playwright/test';
import {SEL_FORE, gotoSn, mesStr, pressKey, waitIdle, waitTransDone, waitTransRunning} from './snPage';

test.beforeEach(async ({page})=> {await gotoSn(page, 'choutstyle')});

const freeze = (page: Page)=> page.evaluate(()=> {
	document.getAnimations().forEach(a=> a.pause());
});
const advance = (page: Page, sec: number)=> page.evaluate(sec=> {
	document.getAnimations().forEach(a=> {a.currentTime = (Number(a.currentTime) || 0) + sec * 1000});
}, sec);

// 消去中のゴースト span（`[data-lay="mes"]` 直下の `[data-erase]`）。無ければ null
const ghost = (page: Page)=> page.evaluate(sel=> {
	const g = document.querySelector(`${sel} span[data-lay="mes"] > span[data-erase]`);
	if (! g) return null;
	const clone = g.cloneNode(true) as HTMLElement;
	clone.querySelectorAll('rt').forEach(e=> {e.remove()});
	return {
		text: (clone.textContent ?? '').split(String.fromCharCode(160)).join(' '),
		opacities: Array.from(g.children).map(el=> Number(getComputedStyle(el).opacity)),
	};
}, SEL_FORE);
// 画面のどこかに消去中のゴーストが在るか（[trans] で表裏が入れ替わっても拾えるよう #skynovel 全体）
const anyGhost = (page: Page)=> page.evaluate(
	()=> document.querySelectorAll('#skynovel span[data-erase]').length);

// n 回進めてから、最後の1手を押した直後に凍結（凍結後は文字送りが終わらないので pressKey 不可）
async function toSceneFrozen(page: Page, nBefore: number, str: string) {
	for (let i = 0; i < nBefore; ++i) {await pressKey(page, 'Space'); await waitIdle(page)}
	await page.keyboard.press('Space');
	await freeze(page);
	await expect.poll(()=> mesStr(page)).toBe(str);
}


test('[er]で消える文字がゴーストへ移り、消去アニメが動く', async ({page})=> {
	// 場面1「きえるよ」→ 場面2「のこるぶん」。[er] の瞬間に旧文字がゴーストへ移る
	await toSceneFrozen(page, 0, 'のこるぶん');

	const g0 = await ghost(page);
	expect(g0).not.toBeNull();
	expect(g0!.text).toBe('きえるよ');
	expect(g0!.opacities).toHaveLength(4);
	for (const o of g0!.opacities) expect(o).toBeGreaterThan(0.9);	// 凍結直後はまだほぼ不透明

	// 600ms の fade の途中まで進めると透明へ向かう（join=false＝全文字同じ進度）
	await advance(page, 0.3);
	const g1 = await ghost(page);
	for (const o of g1!.opacities) {
		expect(o).toBeLessThan(1);
		expect(o).toBeGreaterThan(0);
	}
	expect(g1!.opacities[0]).toBeCloseTo(g1!.opacities.at(-1)!, 2);

	// 本文（charsRef 側）は新しい場面に入れ替わっている
	expect(await mesStr(page)).toBe('のこるぶん');
});

test('wait=0 の消去演出はゴーストを作らず即消える（現状維持）', async ({page})=> {
	// 場面3。[ch_out_style wait=0]＝本家 #clearText:745 と同じ即時 display:none
	await toSceneFrozen(page, 1, 'そくじ');

	expect(await ghost(page)).toBeNull();
	expect(await anyGhost(page)).toBe(0);
});

test('[trans]のクリックキャンセルで消えかけの文字も即終了する', async ({page})=> {
	// 場面4「とらんす」まで進める（初期停止＝場面1）
	await pressKey(page, 'Space');	// 場面1 → 場面2
	await pressKey(page, 'Space');	// 場面2 → 場面3
	await pressKey(page, 'Space');	// 場面3 → 場面4
	expect(await mesStr(page)).toBe('とらんす');

	// 次の手で [er]（fade 開始）→ [trans time=3000] → [wt]
	await page.keyboard.press('Space');
	await waitTransRunning(page);

	// クロスフェード中：消えかけの「とらんす」がゴーストとして生きている
	await expect.poll(()=> anyGhost(page)).toBeGreaterThan(0);

	// [wt] 中のクリック＝クロスフェードを畳む → #finishTrans が requestSkip を呼び、
	//	ゴーストの消去アニメも終端へ送られて即座に片づく
	await page.keyboard.press('Space');
	await expect.poll(()=> anyGhost(page)).toBe(0);

	await waitTransDone(page);
	expect(await mesStr(page)).toBe('おわり');
});
