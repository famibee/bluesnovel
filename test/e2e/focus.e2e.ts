/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2026-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

// [set_focus]（シナリオ：test/e2e/app/prj_frame/main.sn の後半）。
//	どのアクションを積むかは test/ScriptEngine_focus.test.ts が持っているので、
//	ここで見るのは「本当にフォーカスが動くか」だけ。
//	フォーカスの輪に入る経路は3つ（FocusMng.ts参照）で、このシナリオはその全部を使う：
//	・[event key='dom=…'] の最初の1件（#ok / #close）
//	・[set_focus add='dom=…']（#close。既に居るので重複登録されない）
//	・[button]（表示中ずっと。ボタン1 / ボタン2）
//	これに加え、bluesnovel独自の4経路目として[l]待ちマーカー自身も輪に入る（todo.md「本文で
//	左右キーでシステムボタンにフォーカスが移った後、本文に戻れず読み進められなくなる」対策）。
//	'ふぉーかす[l]'の停止中はこのシナリオに breakline/breakpage 画像が無いので絵文字🩷になり、
//	focused()の表示は`btn:🩷`（iframe/HTML要素ではないのでbtn:分岐に落ちる）

import {expect, test, type Page} from '@playwright/test';
import {gotoSn, mesStr, pressKey, waitIdle} from './snPage';

test.beforeEach(async ({page})=> {await gotoSn(page, 'frame')});

const seeText = async (page: Page, s: string)=> {
	await expect.poll(async ()=> mesStr(page), {timeout: 10_000}).toBe(s);
};
const advance = async (page: Page, to: string)=> {
	await waitIdle(page);
	await page.keyboard.press('Space');
	await seeText(page, to);
};
// 今フォーカスされているものの見分け（フレーム内ならそのid、ステージ上のボタンならその文字）
const focused = (page: Page)=> page.evaluate(()=> {
	const a = document.activeElement;
	if (a instanceof HTMLIFrameElement) {
		const b = a.contentDocument?.activeElement;
		return b && b !== a.contentDocument?.body ? `frm:${b.id}` : '(frame)';
	}
	return a && a !== document.body ? `btn:${a.textContent ?? ''}` : '(none)';
});

// [set_focus]の並ぶところまで進める
const toFocusScene = async (page: Page)=> {
	await seeText(page, 'よみこんだ');
	await advance(page, 'ひょうじ');
	await advance(page, 'とれた');
	await advance(page, 'うごかした');	// [tsy_frame]。終わるまで[wait_tsy]で止まる
	await advance(page, 'ふぉーかす');
	await waitIdle(page);
};


test('[set_focus to=next]が輪を順に巡る', async ({page})=> {
	await toFocusScene(page);
	expect(await focused(page)).toBe('(none)');

	// 登録順：[event]の#ok → [event]の#close → [button]ボタン1 → ボタン2 → [l]待ちマーカー自身
	await page.keyboard.press('ArrowRight');
	await expect.poll(async ()=> focused(page), {timeout: 5_000}).toBe('frm:ok');

	await page.keyboard.press('ArrowRight');
	await expect.poll(async ()=> focused(page), {timeout: 5_000}).toBe('frm:close');

	await page.keyboard.press('ArrowRight');
	await expect.poll(async ()=> focused(page), {timeout: 5_000}).toBe('btn:ボタン1');

	await page.keyboard.press('ArrowRight');
	await expect.poll(async ()=> focused(page), {timeout: 5_000}).toBe('btn:ボタン2');

	await page.keyboard.press('ArrowRight');
	await expect.poll(async ()=> focused(page), {timeout: 5_000}).toBe('btn:🩷');

	// 一周して先頭へ戻る
	await page.keyboard.press('ArrowRight');
	await expect.poll(async ()=> focused(page), {timeout: 5_000}).toBe('frm:ok');
});

test('[set_focus to=prev]は逆順に巡る', async ({page})=> {
	await toFocusScene(page);

	// 誰も選んでいない状態からのprevは末尾（[l]待ちマーカー）へ
	await page.keyboard.press('ArrowLeft');
	await expect.poll(async ()=> focused(page), {timeout: 5_000}).toBe('btn:🩷');

	await page.keyboard.press('ArrowLeft');
	await expect.poll(async ()=> focused(page), {timeout: 5_000}).toBe('btn:ボタン2');

	await page.keyboard.press('ArrowLeft');
	await expect.poll(async ()=> focused(page), {timeout: 5_000}).toBe('btn:ボタン1');
});

// todo.md「本文で左右キーでシステムボタンにフォーカスが移った後、本文に戻れず読み進められなく
//	なる」不具合の再現・解消確認。ボタン群を通り越して[l]待ちマーカー自身へフォーカスし、
//	そこでEnterを押すと（本文クリックと同じ経路で）読み進められることを確かめる
test('[l]待ちマーカーへフォーカスしてEnterで読み進められる', async ({page})=> {
	await toFocusScene(page);

	// 末尾（[l]待ちマーカー）へ一手で移動
	await page.keyboard.press('ArrowLeft');
	await expect.poll(async ()=> focused(page), {timeout: 5_000}).toBe('btn:🩷');

	await page.keyboard.press('Enter');
	// [l]なのでクリアされず積み増し。次の[l]（'ぱっど'）まで進む
	await seeText(page, 'ふぉーかすぱっど');
	// フォーカスが外れ、Enterでの読み進めが二重処理されていない（1行分だけ進んでいる）ことも兼ねて確認
	expect(await focused(page)).toBe('(none)');
});

// todo.md「ArrowRight（focusMng.next()）が起点位置によって稀にフォーカスを見失う」不具合の
//	再現・解消確認。[l]待ちマーカーへフォーカスした状態は、輪の外から見ると「本文がまだ読み進め
//	可能」という状態のままなので、[event key=ArrowLeft/Right]（call予約）を押すたびに同じ[l]が
//	#runStep()で再処理され、store.waitがnull→再設定されてマーカー自身のDOM要素が作り直される
//	（TxtLayer.tsx参照）。この時マーカーへフォーカスしたまま別要素へ移動→戻ってくると、
//	作り直された新しい要素へフォーカスが追随できず(none)へ落ちていた
test('[l]待ちマーカーから移動して戻ってきてもフォーカスを見失わない', async ({page})=> {
	await toFocusScene(page);

	// 末尾（[l]待ちマーカー）へ一手で移動
	await page.keyboard.press('ArrowLeft');
	await expect.poll(async ()=> focused(page), {timeout: 5_000}).toBe('btn:🩷');

	// 隣（ボタン2）へ離れて、また戻る
	await page.keyboard.press('ArrowLeft');
	await expect.poll(async ()=> focused(page), {timeout: 5_000}).toBe('btn:ボタン2');
	await page.keyboard.press('ArrowRight');
	await expect.poll(async ()=> focused(page), {timeout: 5_000}).toBe('btn:🩷');

	// マーカー上での足踏み（前後移動を挟まず同じ場所への再訪）でも見失わない
	await page.keyboard.press('ArrowLeft');
	await page.keyboard.press('ArrowRight');
	await expect.poll(async ()=> focused(page), {timeout: 5_000}).toBe('btn:🩷');
});

test('[set_focus to=null]でフォーカスが外れる', async ({page})=> {
	await toFocusScene(page);
	await page.keyboard.press('ArrowRight');
	await expect.poll(async ()=> focused(page), {timeout: 5_000}).toBe('frm:ok');

	await page.keyboard.press('Escape');
	await expect.poll(async ()=> focused(page), {timeout: 5_000}).toBe('(none)');
});

test('フォーカス中の[button]はEnterで押せる', async ({page})=> {
	await toFocusScene(page);
	for (let i = 0; i < 3; ++i) {
		await page.keyboard.press('ArrowRight');
		await page.waitForTimeout(50);
	}
	await expect.poll(async ()=> focused(page), {timeout: 5_000}).toBe('btn:ボタン1');

	await page.keyboard.press('Enter');
	await seeText(page, 'ぼたん1');
});

// ゲームパッド対応（FocusMng種別ごとのキー処理）。range/text/radio/checkboxを輪へ追加した
//	専用の停止点（main.snの「ぱっど[l]」）まで進める。[let_frame draw_pics]の[p]より
//	**前**にあるのがポイント：[p]の「次の進行時にレイヤをクリア」が[set_focus to=…]を呼ぶ
//	[event]（ArrowRight等）でも発動してテキストが消えてしまうため
const toPadScene = async (page: Page)=> {
	await toFocusScene(page);
	await advance(page, 'ふぉーかすぱっど');	// [l]なので本文は続けて出る
	await waitIdle(page);
};
// 合成keydown（isTrusted:false）をフォーカス中の要素へ送る。ゲームパッド由来のイベントに相当
// フレーム内要素にフォーカスがある間は document.activeElement が親から見た iframe 自身になるので、
//	contentDocument側のactiveElementまで降りてdispatchする
const dispatchKey = (page: Page, key: string)=> page.evaluate(key=> {
	const a = document.activeElement;
	const target = a instanceof HTMLIFrameElement ? a.contentDocument?.activeElement : a;
	target?.dispatchEvent(new KeyboardEvent('keydown', {key, bubbles: true}));
}, key);
const frameInputValue = (page: Page, id: string)=> page.evaluate(id=> {
	const f = document.querySelector('iframe') as HTMLIFrameElement | null;
	return (f?.contentDocument?.getElementById(id) as HTMLInputElement | null)?.value ?? '';
}, id);

test('range操作：実キーボードは二重処理されず、合成イベント（ゲームパッド由来）でもstepUp/Downする', async ({page})=> {
	await toPadScene(page);
	// 登録順：#ok, #close, ボタン1, ボタン2, range1, text1, radio_grp, chk1
	for (let i = 0; i < 5; ++i) await page.keyboard.press('ArrowRight');
	await expect.poll(async ()=> focused(page), {timeout: 5_000}).toBe('frm:range1');

	// 実キーボード（isTrusted:true）はブラウザ標準の1回分だけ動く。FocusMng側も同時に
	//	stepUpすると2重に加算されてしまうので、そうなっていないこと（+1のみ）を確かめる
	await page.keyboard.press('ArrowUp');
	await page.waitForTimeout(100);
	expect(await frameInputValue(page, 'range1')).toBe('6');

	// 合成イベント（ゲームパッド由来）はブラウザ標準動作が働かないので、FocusMng側がstepUpする
	await dispatchKey(page, 'ArrowUp');
	await expect.poll(async ()=> frameInputValue(page, 'range1'), {timeout: 5_000}).toBe('7');
	await dispatchKey(page, 'ArrowDown');
	await dispatchKey(page, 'ArrowDown');
	await expect.poll(async ()=> frameInputValue(page, 'range1'), {timeout: 5_000}).toBe('5');

	// 矢印キーを押しても本文は読み進まない（stopPropagationの確認）
	expect(await mesStr(page)).toBe('ふぉーかすぱっど');
});

test('ゲームパッド由来のtext操作でカーソルが動く', async ({page})=> {
	await toPadScene(page);
	for (let i = 0; i < 6; ++i) await page.keyboard.press('ArrowRight');
	await expect.poll(async ()=> focused(page), {timeout: 5_000}).toBe('frm:text1');

	const selStart = ()=> page.evaluate(()=> {
		const f = document.querySelector('iframe') as HTMLIFrameElement | null;
		return (f?.contentDocument?.getElementById('text1') as HTMLInputElement | null)?.selectionStart;
	});
	// フォーカス直後のカーソル位置はブラウザ依存（全選択等）なので、明示的に中間位置へ置いてから確かめる
	await page.evaluate(()=> {
		const f = document.querySelector('iframe') as HTMLIFrameElement | null;
		(f?.contentDocument?.getElementById('text1') as HTMLInputElement | null)?.setSelectionRange(3, 3);
	});
	await dispatchKey(page, 'ArrowUp');
	await expect.poll(selStart, {timeout: 5_000}).toBe(2);
	await dispatchKey(page, 'ArrowDown');
	await expect.poll(selStart, {timeout: 5_000}).toBe(3);
});

test('ゲームパッド由来のEnterでラジオ・チェックボックスが動く', async ({page})=> {
	await toPadScene(page);
	for (let i = 0; i < 7; ++i) await page.keyboard.press('ArrowRight');
	await expect.poll(async ()=> focused(page), {timeout: 5_000}).toBe('frm:radio_grp');

	const radioChecked = (id: string)=> page.evaluate(id=> {
		const f = document.querySelector('iframe') as HTMLIFrameElement | null;
		return (f?.contentDocument?.getElementById(id) as HTMLInputElement | null)?.checked;
	}, id);
	expect(await radioChecked('radio1')).toBe(true);
	await dispatchKey(page, 'ArrowDown');
	await expect.poll(()=> radioChecked('radio2'), {timeout: 5_000}).toBe(true);

	await page.keyboard.press('ArrowRight');
	await expect.poll(async ()=> focused(page), {timeout: 5_000}).toBe('frm:chk1');
	expect(await radioChecked('chk1')).toBe(false);
	await dispatchKey(page, 'Enter');
	await expect.poll(()=> radioChecked('chk1'), {timeout: 5_000}).toBe(true);
});

// todo.md「ゲームパッドでセーブ画面には行けるが、未使用サムネイルを押してセーブができない」の
//	再現・解消確認。セーブ／ロード画面のサムネイルはbutton/aでなくclickリスナ付きのdivなので、
//	FocusMng.#keyHandlerOf()がbutton/a限定だった間はEnter→click変換が効かなかった
//	（フレーム内div = #thumb1 で再現。実キーボードも同様に効かなかったため両方確認する）
test('フレーム内div（button/aでない要素）もEnterでクリック相当が起きる', async ({page})=> {
	await toPadScene(page);
	// 登録順：#ok, #close, ボタン1, ボタン2, range1, text1, radio_grp, chk1, thumb1
	for (let i = 0; i < 9; ++i) await page.keyboard.press('ArrowRight');
	await expect.poll(async ()=> focused(page), {timeout: 5_000}).toBe('frm:thumb1');

	const thumbText = ()=> page.evaluate(()=> {
		const f = document.querySelector('iframe') as HTMLIFrameElement | null;
		return f?.contentDocument?.getElementById('thumb1')?.textContent ?? '';
	});
	expect(await thumbText()).toBe('THUMB');

	// 実キーボード（isTrusted:true）。button/aと違いブラウザがEnterで自動clickしてくれないため、
	//	button/a向けの`isTrusted`早期returnとは別枠でFocusMng側が変換する
	await page.keyboard.press('Enter');
	await expect.poll(thumbText, {timeout: 5_000}).toBe('clicked');

	// リセットしてゲームパッド由来（合成イベント）も確認
	await page.evaluate(()=> {
		const f = document.querySelector('iframe') as HTMLIFrameElement | null;
		const el = f?.contentDocument?.getElementById('thumb1');
		if (el) el.textContent = 'THUMB';
	});
	await dispatchKey(page, 'Enter');
	await expect.poll(thumbText, {timeout: 5_000}).toBe('clicked');
});

test('隠したフレームの中の要素はフォーカスの輪から飛ばされる', async ({page})=> {
	await toPadScene(page);	// [set_focus add=…]でrange1等も輪へ足された状態
	await pressKey(page, 'Space');	// 画像の解決を確かめるページ（[let_frame draw_pics]）
	await seeText(page, 'ふぉーかすぱっどえをだした');	// [l]なので本文は続けて出る
	// [frame disabled=…]／別フレームで覆うテスト用のページを素通りして[frame visible=false]へ
	for (const t of ['むこうにした', 'もどした', 'おおった', 'はずした']) {
		await pressKey(page, 'Space');
		await seeText(page, t);
	}
	await pressKey(page, 'Space');	// [frame visible=false]のページへ（[p]でレイヤがクリアされる）
	await seeText(page, 'かくした');

	// フレーム内の#ok・#closeは飛ばされ、[button]だけを巡る。
	//	**フレームの中の文書は自分が隠れていることを知らない**（getClientRectsは普通に返る）ので、
	//	FocusMngが親側のiframeまで遡って確かめている
	await page.keyboard.press('ArrowRight');
	await expect.poll(async ()=> focused(page), {timeout: 5_000}).toBe('btn:ボタン1');

	await page.keyboard.press('ArrowRight');
	await expect.poll(async ()=> focused(page), {timeout: 5_000}).toBe('btn:ボタン2');

	await page.keyboard.press('ArrowRight');
	await expect.poll(async ()=> focused(page), {timeout: 5_000}).toBe('btn:ボタン1');
});
