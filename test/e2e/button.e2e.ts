/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2026-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

// [button]のjump／call=trueの検証（シナリオ：e2e/app/prj_button/main.sn）
//	ユニットテスト（test/ScriptEngine*.test.ts）では追えない、
//	「クリックイベントがStageの読み進めへ伝播しないこと」までブラウザ上で確かめるのが目的。

import {expect, test} from '@playwright/test';
import {gotoSn, mesStr, pressKey, snap, waitIdle} from './snPage';

test.beforeEach(async ({page})=> {await gotoSn(page, 'button')});

test('[button]が文字レイヤ上に並ぶ', async ({page})=> {
	expect(await mesStr(page)).toBe('選んでください。');

	const {aLay} = await snap(page);
	const mes = aLay.find(l=> l.nm === 'mes');
	expect(mes?.aBtn).toEqual([
		{nm: 'btn_call', text: 'サブルーチンを呼ぶ', label: '*sub', call: true},
		{nm: 'btn_jump', text: 'ジャンプする', label: '*goal', call: false},
		{nm: 'btn_fcall', text: '別ファイルを呼ぶ', label: '*fcall', call: true, fn: 'sub2'},
		{nm: 'btn_fjump', text: '別ファイルへ飛ぶ', label: '*fjump', call: false, fn: 'sub2'},
		// 見た目の属性は**書かれた分だけ**styへ入る（[lay]と同じ流儀）
		{nm: 'btn_pos', text: '座標指定', label: '*goal', call: false,
			sty: {left: 250, top: 360, width: 90, height: 30, rotation: 15}},
		{nm: 'btn_off', text: '無効', label: '*goal', call: false, sty: {enabled: false}},
		{nm: 'btn_hint', text: 'ヒント付き', label: '*goal', call: false, sty: {
			hint: 'せつめい', hint_style: 'color: rgb(0, 255, 0);', hint_opt: '{"placement": "bottom"}'}},
		{nm: 'btn_sty', text: '見た目', label: '*goal', call: false, sty: {
			style: 'color: rgb(255, 0, 0);', style_hover: 'color: rgb(0, 128, 0);', style_clicked: 'color: rgb(0, 0, 255);'}},
		// JSON指定はエンジンがCSSへ読み替えるので、ストアに入る時点でCSS
		{nm: 'btn_sty2', text: 'JSON指定', label: '*goal', call: false, sty: {style: 'color: rgb(255, 0, 255);'}},
	]);
	await expect(page.getByText('サブルーチンを呼ぶ')).toBeVisible();
	await expect(page.getByText('ジャンプする')).toBeVisible();
});

test('[button call=true]→[return]で、[l]のイベント待ち状態へ戻る', async ({page})=> {
	// 回帰テスト（2026-07-23修正）：[return]の戻り先を停止点そのものにしたことで、
	//	サブルーチンから戻ったあと「次へ進んでしまう」のではなく[l]待ちが再開する
	await page.getByText('サブルーチンを呼ぶ').click();
	await waitIdle(page);

	expect(await mesStr(page)).toBe('選んでください。＋サブ実行');

	const {wait, isReadBack} = await snap(page);
	expect(wait).toEqual({nm: 'mes', kind: 'l'});	// [l]待ちへ戻っている
	expect(isReadBack).toBe(false);					// ボタンは「読み進め」扱いにしない
	await expect(page.getByText('🩷')).toBeVisible();
});

test('[button]クリックで1回しか進まない（Stageの読み進めへ伝播しない）', async ({page})=> {
	// BtnLayerのstopPropagation()が効かないと、Stageのdiv onClick（＝next()）も
	//	同時に発火して二重に進んでしまう。文字列の完全一致で検出する。
	await page.getByText('サブルーチンを呼ぶ').click();
	await waitIdle(page);
	expect(await mesStr(page)).toBe('選んでください。＋サブ実行');

	// [l]待ちへ戻っているので、押すたびに1回分ずつ積み上がる
	await page.getByText('サブルーチンを呼ぶ').click();
	await waitIdle(page);
	expect(await mesStr(page)).toBe('選んでください。＋サブ実行＋サブ実行');
});

test('[button]（call指定なし）はジャンプし、戻ってこない', async ({page})=> {
	await page.getByText('ジャンプする').click();
	await waitIdle(page);

	expect(await mesStr(page)).toBe('選んでください。＋ジャンプ先');

	const {wait} = await snap(page);
	expect(wait).toBeNull();	// ジャンプ先の[s]で停止（マーカーなし）
});

test('ボタンを押さずキーで進めた場合は、ボタンと無関係に次の停止点へ進む', async ({page})=> {
	await pressKey(page, 'Space');	// [l]の次＝[s]まで

	expect(await mesStr(page)).toBe('選んでください。＋そのまま進んだ。');
	expect((await snap(page)).wait).toBeNull();
});

// ============ [button fn=…]（別ファイルのラベルへ飛ぶボタン） ============

test('[button fn=… call=true]で別ファイルのサブルーチンを呼び、[l]のイベント待ちへ戻る', async ({page})=> {
	await page.getByText('別ファイルを呼ぶ').click();

	// sub2.snの*fcallを実行してから、mainの[l]へ戻る（読み進めてしまわない）
	await expect.poll(async ()=> mesStr(page)).toBe('選んでください。＋別ファイルのサブ');

	const {wait, isReadBack} = await snap(page);
	expect(wait).toEqual({nm: 'mes', kind: 'l'});
	expect(isReadBack).toBe(false);
});

test('[button fn=…]で別ファイルのラベルへジャンプする', async ({page})=> {
	await page.getByText('別ファイルへ飛ぶ').click();

	await expect.poll(async ()=> mesStr(page)).toBe('選んでください。＋別ファイルへジャンプ');

	const {wait} = await snap(page);
	expect(wait).toBeNull();	// 飛び先は[s]
});

test('[button left=/top=]は絶対配置になり、width/height/rotationもCSSへ落ちる', async ({page})=> {
	// 本家 theme/title.sn のタイトルボタンと同じ書き方。
	//	**left/topを書いた時だけ**絶対配置（本家は常に絶対配置で省略時0,0だが、
	//	座標指定なしで複数並べる試作シナリオが全部重なってしまうため）
	const box = await page.getByText('座標指定').evaluate(e=> {
		const s = getComputedStyle(e);
		return {pos: s.position, left: s.left, top: s.top, w: s.width, h: s.height, fs: s.fontSize};
	});
	expect(box).toEqual({pos: 'absolute', left: '250px', top: '360px',
		w: '90px', h: '30px', fs: '30px'});

	// rotation=15度。transformには文字を箱幅に収めるfit倍率(scale)も合成されるので、
	//	行列成分の生値ではなく、そこから復元した回転角で確かめる（atan2(m1,m0)＝θ。スケールは相殺される）
	const m = (await page.getByText('座標指定').evaluate(e=> getComputedStyle(e).transform))
		.match(/matrix\(([^)]+)\)/)?.[1]?.split(', ').map(Number);
	const deg = Math.atan2(m![1]!, m![0]!) * 180 / Math.PI;
	expect(deg).toBeCloseTo(15, 1);
});

test('座標指定していないボタンは流し込み配置のまま', async ({page})=> {
	expect(await page.getByText('ジャンプする').evaluate(e=> getComputedStyle(e).position))
		.toBe('relative');
});

test('[button enabled=false]は灰色でクリックを受けない', async ({page})=> {
	const st = await page.getByText('無効').evaluate(e=> {
		const s = getComputedStyle(e);
		return {color: s.color, pe: s.pointerEvents};
	});
	expect(st).toEqual({color: 'rgb(128, 128, 128)', pe: 'none'});

	// pointer-events: none なので、その位置のクリックはステージへ抜けて「読み進め」になる
	await page.getByText('無効').click({force: true});
	await waitIdle(page);
	expect(await mesStr(page)).toBe('選んでください。＋そのまま進んだ。');
});

test('[button hint=…]はマウスを乗せると吹き出しを出す', async ({page})=> {
	// 吹き出しは画面に1つを使い回す（Hint.ts）。位置決めは test/Hint.test.ts が持つので、
	//	ここで見るのは「乗せたら出て、外したら消える」ことと hint_style／hint_opt の反映
	const hint = page.locator('body > div.sn_hint');
	await expect(hint).toHaveCount(0);	// まだ作られてもいない

	await page.getByText('ヒント付き').hover();
	await expect(hint).toBeVisible();
	expect(await hint.textContent()).toBe('せつめい');
	expect(await hint.evaluate(el=> getComputedStyle(el).color)).toBe('rgb(0, 255, 0)');

	// hint_optのplacement=bottomなので、ボタンより下に出る
	const rb = (await page.getByText('ヒント付き').boundingBox())!;
	const rh = (await hint.boundingBox())!;
	expect(rh.y).toBeGreaterThan(rb.y + rb.height);

	// 外したら消える（本家もpointerout/pointerdownで消す）
	await page.mouse.move(0, 0);
	await expect(hint).toBeHidden();
});

test('hint未指定のボタンでは吹き出しを出さない', async ({page})=> {
	await page.getByText('ジャンプする').hover();
	await expect(page.locator('body > div.sn_hint')).toBeHidden();
});

test('[button style=/style_hover=]はCSSとして当たる（ホバー・フォーカスも）', async ({page})=> {
	const btn = page.getByText('見た目');
	// 色は transition: color 0.3s で変わるので、落ち着くまで待って比べる
	const color = ()=> btn.evaluate(el=> getComputedStyle(el).color);
	const seeColor = async (c: string)=> {
		await expect.poll(async ()=> color(), {timeout: 5_000}).toBe(c);
	};

	await seeColor('rgb(255, 0, 0)');		// style
	await btn.hover();
	await seeColor('rgb(0, 128, 0)');		// style_hover
	await page.mouse.move(0, 0);
	await seeColor('rgb(255, 0, 0)');

	// フォーカスでもホバーと同じ見た目（本家 EventMng.ts:435 の hv／nr 相当）
	await btn.focus();
	await seeColor('rgb(0, 128, 0)');
	expect(await btn.evaluate(el=> getComputedStyle(el).outlineStyle)).toBe('none');
});

test('pixiのTextStyle JSON指定もCSSへ読み替える', async ({page})=> {
	// ギャラリーのサンプルが`{"fill": "…"}`で書くための互換（主要キーのみ）
	expect(await page.getByText('JSON指定').evaluate(el=> getComputedStyle(el).color))
		.toBe('rgb(255, 0, 255)');
});
