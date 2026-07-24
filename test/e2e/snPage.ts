/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2026-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

// E2E共通ヘルパ。
//	検証は「画面の文字列をDOMからかき集める」のではなく、zustandストア（唯一の真実）を
//	test/e2e/app/main.ts が公開した window.__sn 経由で直接読む方針とする
//	（文字送り演出のspan分割やCSSクラス名に依存しない＝壊れにくい）。

import type {Page} from '@playwright/test';

export type T_WAIT = {nm: string; kind: 'l' | 'p'} | null;
export type T_BTN_SNAP = {nm: string; text: string; label: string; call?: boolean; fn?: string};
export type T_LAY_SNAP = {
	cls		: 'grp' | 'txt';
	nm		: string;
	str?	: string;
	aBtn?	: T_BTN_SNAP[];
	b_alpha?: number;
};
export type T_SNAP = {
	aLay		: T_LAY_SNAP[];
	wait		: T_WAIT;
	isReadBack	: boolean;
	title		: string;
};

export type T_PRJ = 'basic' | 'button' | 'expr' | 'multi';


// テスト用ページを開き、最初の停止点で落ち着くまで待つ
export async function gotoSn(page: Page, prj: T_PRJ) {
	await page.goto(`/test/e2e/app/index.html?prj=${prj}`);
	await waitIdle(page);
}

// 進行が停止点で落ち着く（文字送り演出が終わる）まで待つ。
//	演出中（isTyping）のクリックは「読み進め」ではなく「瞬時完了要求」として消費されるため
//	（Main.tsx next()）、クリック/キー操作の前には必ずこれを挟む。
export async function waitIdle(page: Page) {
	// ストアだけを見て次の操作へ進むのは不可。Stage.tsxは lazy() ロードのため、
	//	特にvite dev初回はチャンク読込に時間がかかり、Suspenseのfallback（Loading）表示のまま
	//	シナリオだけが先に進む。その間はStageがrenderされない＝Caretaker.update()も呼ばれず、
	//	読み戻し用のMementoが記録されないまま次の停止点へ行ってしまう
	//	（人間の操作ではまず起こらないが、E2Eだと簡単に追い越せる）。
	//	そこで「表示がストアの内容に追いついたか」をDOM側でも確かめる。
	await page.waitForFunction(()=> {
		const g = (globalThis as any).__sn;
		if (! g) return false;
		const lay = g.store.getState().aLay.find((l: any)=> l.cls === 'txt');
		if (! lay) return false;

		// 文字レイヤ本体＝点線枠のspan（TxtLayer styTxt）。その先頭の子spanに1文字=1spanで文字が入る
		const box = [...document.querySelectorAll('#skynovel span')]
			.find(e=> getComputedStyle(e).borderStyle === 'dotted');
		if (! box) return false;	// Stage未マウント（Loading表示中）

		const shown = (box.firstElementChild?.textContent ?? '').replace(/\u00A0/g, ' ');
		return shown === lay.str;
	}, undefined, {timeout: 30_000});
	// isTyping は TxtLayer の useLayoutEffect で立つので、Reactのコミットとレイアウトエフェクトの
	// 実行を確実に跨ぐためrAF2回分待ってから判定する（sleepによる当て推量を避ける）
	await page.evaluate(()=> new Promise<void>(re=> requestAnimationFrame(()=> requestAnimationFrame(()=> re()))));
	await page.waitForFunction(
		()=> ! (globalThis as any).__sn.store.getState().isTyping,
		undefined, {timeout: 15_000},
	);
}

// ストアの現在状態を取得（関数プロパティを含めるとシリアライズできないので必要な値だけ抜く）
export async function snap(page: Page): Promise<T_SNAP> {
	return page.evaluate(()=> {
		const s = (globalThis as any).__sn.store.getState();
		return {
			aLay		: JSON.parse(JSON.stringify(s.aLay)),
			wait		: s.wait,
			isReadBack	: s.isReadBack,
			title		: s.title,
		} as T_SNAP;
	});
}

// 文字レイヤの「そのページの全文字列」を取得
export async function mesStr(page: Page, nm = 'mes'): Promise<string> {
	const {aLay} = await snap(page);
	return aLay.find(l=> l.nm === nm)?.str ?? '';
}

// キー操作（読み進め／読み戻り）。操作後は停止点で落ち着くまで待つ
export async function pressKey(page: Page, code: 'Space' | 'PageDown' | 'PageUp') {
	await page.keyboard.press(code);
	await waitIdle(page);
}

// [l]/[p]の停止点まで進める。ファイル切替（[jump fn=…]等）を挟むシナリオではこちらを使う。
//	fetchの待ち時間中は「ストアもDOMも一致し、文字送りも終わっている」状態が一瞬できるため、
//	waitIdle()だけではそこを停止点と誤認して次のキーを早く打ちすぎる。
//	その早すぎるキーは、ロード完了後に始まった文字送り演出の「瞬時完了」として
//	消費されてしまい（Main.tsx next()）、進行が1回分まるごと失われる。
//	待ちマーカー（store.wait）は#runStep()の各反復の頭でnullに戻り[l]/[p]でだけ立つので、
//	これを見れば「本物の停止点」だと確実に分かる（[s]では立たないので、その場合はpressKey）
export async function pressKeyToWaitMark(page: Page, code: 'Space' | 'PageDown' | 'PageUp') {
	await page.keyboard.press(code);
	await page.waitForFunction(
		()=> (globalThis as any).__sn.store.getState().wait !== null,
		undefined, {timeout: 15_000},
	);
	await waitIdle(page);
}

// [trace]等のデバッグ表示（ScriptMng が document.body 直下へ挿す span）の内容を取得。
//	画面（#skynovel）の外に置かれるので、body直下のspanという位置だけで特定できる
//	（src/にテスト用のid等を足さずに済ませるため）
export async function traceText(page: Page): Promise<string> {
	return page.evaluate(()=> document.querySelector('body > span')?.textContent ?? '');
}

// 文字レイヤ本体（[lay b_alpha=...]を反映する、点線枠のspan）の算出スタイルを読む。
//	読み戻り中の文字色（黄色）など、ストアだけでは確かめられない見た目の検証用
export async function txtBoxStyle(page: Page, prop: 'color' | 'background-color'): Promise<string> {
	return page.evaluate(p=> {
		const el = [...document.querySelectorAll('#skynovel span')]
			.find(e=> getComputedStyle(e).borderStyle === 'dotted');
		return el ? getComputedStyle(el).getPropertyValue(p) : '';
	}, prop);
}
