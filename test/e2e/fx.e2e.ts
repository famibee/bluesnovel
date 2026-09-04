/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2026-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

// 立ち絵シェーダエフェクト（[add_fx]/[clear_fx]。分家独自の試作。ANIMATION_RESEARCH.md §7）。
//	シナリオ：test/e2e/app/prj_fx/main.sn。
//
//	**ブラウザが要る理由**：aFx が非空になった瞬間に GrpLayer が基本画像の <img> を
//	レイヤ実寸の <canvas>（WebGL）へ差し替える——この React 描画の分岐は store を読むだけでは
//	確かめられない。記述子の中身（fx 名・パラメータ・既定値）は bldFx() の単体テスト
//	（test/ScriptEngine_fx.test.ts）が見る。
//
//	**WebGL の描画結果そのもの（波形・ずれ量）は見ない**：ヘッドレス Chromium の GL 実装
//	（SwiftShader）と実機で差が大きく、画素で回帰を縛ると脆い。canvas 要素が出ること・
//	aFx が A_LAY_STY_KEY 経由で [clear_lay]／page=both 複製へ追随することに絞る。絵の確認は
//	playwright-cli スキルで手動。

import {expect, test} from '@playwright/test';
import type {Page} from '@playwright/test';
import {SEL_FORE, gotoSn, mesStr, pressKey, pressKeyToWaitMark, snap} from './snPage';

test.beforeEach(async ({page})=> {await gotoSn(page, 'fx')});

const LAY = `${SEL_FORE} div[data-lay="base"]`;

// grp レイヤ base の中身が <img>（基本画像）か <canvas>（fx）か
async function draw(page: Page): Promise<'img' | 'canvas' | 'none'> {
	return page.evaluate(sel=> {
		const el = document.querySelector(sel);
		if (! el) return 'none';
		if (el.querySelector('canvas')) return 'canvas';
		if (el.querySelector('img')) return 'img';
		return 'none';
	}, LAY);
}

// base レイヤの aFx（表 or 裏ページ）
async function afx(page: Page, back = false) {
	const s = await snap(page);
	return (back ? s.aLayBack : s.aLay).find(l=> l.nm === 'base')?.aFx;
}


test('[add_fx] で <img> が WebGL <canvas> に替わり、[clear_fx] で戻る', async ({page})=> {
	// fx 無し：基本画像そのまま
	expect(await mesStr(page)).toBe('そのまま');
	await expect.poll(async ()=> draw(page)).toBe('img');
	expect(await afx(page)).toBeUndefined();

	// [add_fx layer=base fx=wave amp=10 freq=3]
	await pressKeyToWaitMark(page, 'Space');
	expect(await mesStr(page)).toBe('wave');
	await expect.poll(async ()=> draw(page)).toBe('canvas');
	const a1 = (await afx(page))!;
	expect(a1).toHaveLength(1);
	// 無名 [add_fx] は store の chgFx が #fxN をレイヤスコープで採番（ANIMATION_RESEARCH.md §7）
	expect(a1[0]).toMatchObject({name: '#fx1', fx: 'wave', time: 0, speed: 1});
	// プリセット固有パラメータ（既定は H_FX_DEF、上書きは属性どおり）
	expect(a1[0]!.params).toMatchObject({amp: 10, freq: 3});

	// [add_fx layer=base name=rgb fx=rgbShift shift=12]：同レイヤの aFx へ積む
	await pressKeyToWaitMark(page, 'Space');
	expect(await mesStr(page)).toBe('wave+rgb');
	const a2 = (await afx(page))!;
	expect(a2).toHaveLength(2);
	expect(a2[1]).toMatchObject({name: 'rgb', fx: 'rgbShift'});
	expect(a2[1]!.params).toMatchObject({shift: 12});
	await expect.poll(async ()=> draw(page)).toBe('canvas');

	// [clear_fx layer=base name=rgb]：name 指定は同名だけ剥がす
	await pressKeyToWaitMark(page, 'Space');
	expect(await mesStr(page)).toBe('waveのみ');
	const a3 = (await afx(page))!;
	expect(a3).toHaveLength(1);
	expect(a3[0]).toMatchObject({fx: 'wave'});
	await expect.poll(async ()=> draw(page)).toBe('canvas');	// 無名 wave が残るので canvas のまま
});

test('構成切替で fx canvas を作り直さない＝一瞬消えない（バグの回帰）', async ({page})=> {
	// そのまま（fx 無し）→ wave（1 パス）→ wave+rgb（2 パス）→ waveのみ（1 パス）。
	//	fx canvas は absolute で <img> の上に重なるだけ＋シェーダ構成が変わっても同じ canvas 上で
	//	プログラムだけ組み直す。data-fn 付きは face なので除外
	const baseImg = page.locator(`${LAY} img:not([data-fn])`);
	await expect.poll(()=> baseImg.count()).toBe(1);

	await pressKeyToWaitMark(page, 'Space');	// wave（fx canvas 出現）
	expect(await mesStr(page)).toBe('wave');
	await expect.poll(async ()=> draw(page)).toBe('canvas');
	// この canvas 要素に印を付ける。構成が変わっても作り直されなければ印は残る
	await page.locator(`${LAY} canvas`).evaluate((c: any)=> {c.__fxMark = 1});

	for (const mes of ['wave+rgb', 'waveのみ']) {
		await pressKeyToWaitMark(page, 'Space');
		expect(await mesStr(page)).toBe(mes);
		expect(await baseImg.count()).toBe(1);			// 基本 <img> は在り続ける
		expect(await page.locator(`${LAY} canvas`).evaluate((c: any)=> c.__fxMark)).toBe(1);	// 同じ canvas 要素
	}
});

test('[add_fx page=both] は表裏どちらの base にも積まれる', async ({page})=> {
	for (let i = 0; i < 4; ++i) await pressKeyToWaitMark(page, 'Space');	// 「both」まで
	expect(await mesStr(page)).toBe('both');

	// 表：直前までの無名 wave（#fx1）＋ page=both の both
	const fore = (await afx(page))!;
	expect(fore.map(f=> f.name)).toEqual(['#fx1', 'both']);

	// 裏：page=both で複製された both だけ（表だけに積んだ無名 wave は来ない）
	const back = (await afx(page, true))!;
	expect(back).toHaveLength(1);
	expect(back[0]).toMatchObject({name: 'both', fx: 'wave'});
	expect(back[0]!.params).toMatchObject({amp: 4});
});

test('[clear_lay] は aFx も落とす（A_LAY_STY_KEY 経由）', async ({page})=> {
	for (let i = 0; i < 5; ++i) await pressKeyToWaitMark(page, 'Space');	// 「clear_lay後」まで
	expect(await mesStr(page)).toBe('clear_lay後');

	// [clear_lay layer=base]（既定 page=fore）→ 直後に [lay fn=pic] で絵だけ戻す
	expect(await afx(page)).toBeUndefined();
	await expect.poll(async ()=> draw(page)).toBe('img');

	// 裏ページ（page=fore の [clear_lay] は触らない）には both が残っている
	const back = (await afx(page, true))!;
	expect(back.map(f=> f.name)).toEqual(['both']);
});

test('[add_fx time=] の one-shot 記述子も aFx に載る（撤去は [clear_fx]）', async ({page})=> {
	for (let i = 0; i < 6; ++i) await pressKeyToWaitMark(page, 'Space');	// 「oneshot」まで
	expect(await mesStr(page)).toBe('oneshot');

	const a = (await afx(page))!;
	expect(a).toHaveLength(1);
	expect(a[0]).toMatchObject({fx: 'rgbShift', time: 1500});
	await expect.poll(async ()=> draw(page)).toBe('canvas');

	// [clear_fx layer=base]（name 無し）→ そのレイヤの fx 全部
	await pressKeyToWaitMark(page, 'Space');
	expect(await mesStr(page)).toBe('ぜんぶクリア');
	expect(await afx(page)).toBeUndefined();
	await expect.poll(async ()=> draw(page)).toBe('img');
});

test('[wait_fx] は [add_fx time>0] の経過を待ってから続きへ', async ({page})=> {
	for (let i = 0; i < 7; ++i) await pressKeyToWaitMark(page, 'Space');	// 「ぜんぶクリア」まで
	expect(await mesStr(page)).toBe('ぜんぶクリア');

	// [add_fx time=400] → [wait_fx] → 本文。実際に待つのは ScriptMng のタイマー（[wait_tsy] と同型。
	//	WebGL ランナーからの終了通知は作らない。ANIMATION_RESEARCH.md §7 step 2）
	const t0 = Date.now();
	await pressKeyToWaitMark(page, 'Space');
	expect(await mesStr(page)).toBe('wait_fx完了');
	expect(Date.now() - t0).toBeGreaterThanOrEqual(300);	// time=400 のタイマー分は待った（余裕をみて 300）
});

test('[pause_fx]/[resume_fx] は記述子の enabled を反転する', async ({page})=> {
	for (let i = 0; i < 9; ++i) await pressKeyToWaitMark(page, 'Space');	// 「pause_fx」まで（途中 wait_fx で 400ms 待つ）
	expect(await mesStr(page)).toBe('pause_fx');
	// [add_fx name=p] のあと [pause_fx layer=base name=p]
	expect((await afx(page))!.find(f=> f.name === 'p')).toMatchObject({fx: 'wave', enabled: false});
	await expect.poll(async ()=> draw(page)).toBe('canvas');	// enabled=false でも <canvas> のまま（記述子は残る）

	await pressKeyToWaitMark(page, 'Space');	// [resume_fx layer=base]
	expect(await mesStr(page)).toBe('resume_fx');
	expect((await afx(page))!.find(f=> f.name === 'p')).toMatchObject({enabled: true});
});

test('[def_fx] で定義した GLSL を [add_fx fx=] で描く（本体は aFx に焼かれない）', async ({page})=> {
	for (let i = 0; i < 10; ++i) await pressKeyToWaitMark(page, 'Space');	// 「resume_fx」まで
	expect(await mesStr(page)).toBe('resume_fx');

	// [clear_fx] → [def_fx name=pulse glsl="…"] → [add_fx name=g fx=pulse] → [er]def_fx[l]
	await pressKeyToWaitMark(page, 'Space');
	expect(await mesStr(page)).toBe('def_fx');
	const g = (await afx(page))!.find(f=> f.name === 'g')!;
	expect(g).toMatchObject({fx: 'pulse', enabled: true});
	expect(g).not.toHaveProperty('glsl');	// GLSL 本体は記述子（＝[save] 対象）に載らない
	await expect.poll(async ()=> draw(page)).toBe('canvas');	// コンパイル成功で <canvas>（失敗なら console.error だけ出て絵は出ない）
});

test('[add_fx] + 静止 face は 2D canvas で合成してシェーダに通す（face の <img> は DOM から消える）', async ({page})=> {
	for (let i = 0; i < 11; ++i) await pressKeyToWaitMark(page, 'Space');	// 「def_fx」まで
	expect(await mesStr(page)).toBe('def_fx');
	// この時点では face 無し
	expect(await page.locator(`${LAY} img[data-fn]`).count()).toBe(0);

	// [add_face f] → [lay face=f] → [add_fx fx=wave]
	await pressKeyToWaitMark(page, 'Space');
	expect(await mesStr(page)).toBe('face合成');
	await expect.poll(async ()=> draw(page)).toBe('canvas');
	// 静止 face は FxImg が基本画像へ合成済み＝レイヤ内に face の <img data-fn> は無い
	expect(await page.locator(`${LAY} img[data-fn]`).count()).toBe(0);
});

const canvasRunning = (sel: string)=> (page: Page)=>
	page.locator(`${sel} div[data-lay="base"] canvas`).getAttribute('data-fx-running');

test('fx 合成が間に合うまで（canvas 未 ready）は DOM face を残す＝表情が一瞬消えない（回帰）', async ({page})=> {
	// GrpLayer は fx on になった瞬間に DOM face を外していた（`fxOn ? []`）。初回適用時は
	//	FxRunner の lazy import や合成が非同期で、その窓の間だけ基本画像だけ見え「表情差分が
	//	一瞬消える」（アニメ png シート face を持つ立ち絵に [add_fx] した初回。2 回目以降は
	//	キャッシュで顕在化しない）。ゲートを基本 <img> と同じ hideForFx（fxOn かつ canvas ready）へ。
	//	ここでは FxRunner チャンクの応答を遅らせて「合成中」の窓を確実に開く
	let release = ()=> {};
	const gate = new Promise<void>(r=> {release = r});	// 全マッチ要求がこの1つを待つ
	await page.route(/FxRunner|fxPresets/, async route=> {
		await gate;
		await route.continue();
	});

	// このシナリオは 12 歩目「face合成」より前（wave/both_fx/oneshot/pause_fx）で既に [add_fx] する。
	//	＝2 歩目で FxRunner チャンクが要求され、以降はその応答待ちで足止め（＝チャンク未ロードのまま進む）
	for (let i = 0; i < 11; ++i) await pressKeyToWaitMark(page, 'Space');	// 「def_fx」まで

	await pressKeyToWaitMark(page, 'Space');	// [add_face f]→[lay face=f]→[add_fx fx=wave]→[er]face合成[l]
	expect(await mesStr(page)).toBe('face合成');
	// fx は on（<canvas> は DOM に居る）が FxRunner ロード待ちで未初期化＝data-fx-running が付かない。
	//	この窓で基本 <img> は visible のまま、face の <img data-fn> も**在る**（表情が消えない）
	await expect.poll(()=> canvasRunning(SEL_FORE)(page)).toBe(null);	// まだ rAF 属性が無い＝未 ready
	expect(await page.locator(`${LAY} img:not([data-fn])`).evaluate((el: HTMLElement)=> getComputedStyle(el).visibility)).toBe('visible');
	expect(await page.locator(`${LAY} img[data-fn]`).count()).toBeGreaterThan(0);

	release();	// 足止め中の FxRunner／続く fxPresets をまとめて解放（以後の要求も素通し）
	// canvas が初回フレームを描いたら基本 <img>・DOM face とも隠れる（従来どおりの最終状態）
	await expect.poll(()=> canvasRunning(SEL_FORE)(page)).toBe('1');
	await expect.poll(async ()=> page.locator(`${LAY} img[data-fn]`).count()).toBe(0);
});

test('[trans] 後の不可視 back ページでは fx の rAF が止まる（data-fx-running=0）', async ({page})=> {
	for (let i = 0; i < 13; ++i) await pressKeyToWaitMark(page, 'Space');	// 「trans前」まで
	expect(await mesStr(page)).toBe('trans前');
	// trans 前：表ページの fx canvas は回っている
	await expect.poll(()=> canvasRunning(SEL_FORE)(page)).toBe('1');

	await pressKeyToWaitMark(page, 'Space');	// [trans time=300][wt] → [er]trans後[l]
	expect(await mesStr(page)).toBe('trans後');
	// trans 後：foreIdx 反転。新しい表ページは回り、旧表＝いまの裏ページは止まる（rAF 凍結）
	await expect.poll(()=> canvasRunning(SEL_FORE)(page)).toBe('1');
	await expect.poll(()=> canvasRunning('#skynovel [data-page="back"]')(page)).toBe('0');
});

test('天候・花火プリセット snow / rain / fireworks が 3 本重ねてコンパイル・描画できる', async ({page})=> {
	for (let i = 0; i < 14; ++i) await pressKeyToWaitMark(page, 'Space');	// 「trans後」まで
	await pressKey(page, 'Space');	// [clear_fx]→[add_fx snow]→[add_fx rain]→[add_fx fireworks]→[er]天候[s]
	await expect.poll(async ()=> mesStr(page)).toBe('天候');
	const a = (await afx(page))!;
	expect(a.map(f=> f.fx)).toEqual(['snow', 'rain', 'fireworks']);
	expect(a[1]!.params).toMatchObject({amp: 2});
	expect(a[2]!.params).toMatchObject({amp: 1, freq: 1, p1: 0.25, p2: -0.35});	// 組み込み既定＋p2=横位置
	await expect.poll(async ()=> draw(page)).toBe('canvas');	// 3 パスとも compile 成功で <canvas>（失敗なら絵が出ない。color の uniform vec3・p2 の横バイアスも含む）
	await expect.poll(()=> canvasRunning(SEL_FORE)(page)).toBe('1');	// 常時ゆらぎ＝回り続ける
});

test('アニメ png シートの face も fx のテクスチャへ通す（DOM オーバーレイは出ない）', async ({page})=> {
	for (let i = 0; i < 15; ++i) await pressKeyToWaitMark(page, 'Space');	// 「天候」まで
	await pressKeyToWaitMark(page, 'Space');	// [add_face fn=anime]→[lay face=af]→[add_fx fx=wave]→[er]sheet_face[l]
	expect(await mesStr(page)).toBe('sheet_face');

	await expect.poll(async ()=> draw(page)).toBe('canvas');
	// sheet face は makeFxSource が毎フレーム合成＝レイヤ内に face の DOM（div[data-fn]／img[data-fn]）は無い
	expect(await page.locator(`${LAY} [data-fn]`).count()).toBe(0);
	// アニメが動いている＝毎フレーム転写のため rAF は回り続ける
	await expect.poll(()=> canvasRunning(SEL_FORE)(page)).toBe('1');
});

test('動画レイヤを基本画像に持つレイヤへも fx が乗る（<video> は DOM に残り canvas が重なる）', async ({page})=> {
	for (let i = 0; i < 16; ++i) await pressKeyToWaitMark(page, 'Space');	// 「sheet_face」まで
	await pressKeyToWaitMark(page, 'Space');	// [lay fn=movie]→[add_fx fx=wave]→[er]movie_base[l]
	expect(await mesStr(page)).toBe('movie_base');

	await expect.poll(async ()=> draw(page)).toBe('canvas');
	// <video data-fn> は [wv]・音量制御の担当なので DOM に残る（makeFxSource の毎フレーム転写元）
	await expect(page.locator(`${LAY} video[data-fn="movie"]`)).toHaveCount(1);
	// 毎フレーム転写のため rAF は回り続ける
	await expect.poll(()=> canvasRunning(SEL_FORE)(page)).toBe('1');
});

test('動画 face を fx のテクスチャへ合成（DOM オーバーレイは出ない）', async ({page})=> {
	for (let i = 0; i < 17; ++i) await pressKeyToWaitMark(page, 'Space');	// 「movie_base」まで
	await pressKeyToWaitMark(page, 'Space');	// [add_face fn=movie]→[lay face=mf]→[add_fx fx=wave]→[er]movie_face[l]
	expect(await mesStr(page)).toBe('movie_face');

	await expect.poll(async ()=> draw(page)).toBe('canvas');
	// 動画 face は makeFxSource が detached な <video> で合成＝レイヤ内に face の DOM（video 等）は無い
	expect(await page.locator(`${LAY} [data-fn]`).count()).toBe(0);
	expect(await page.locator(`${LAY} video`).count()).toBe(0);
	await expect.poll(()=> canvasRunning(SEL_FORE)(page)).toBe('1');
});

test('アニメ png シート基本画像のレイヤへ fx（従来は FxImg を出さなかった条件を緩めた）', async ({page})=> {
	for (let i = 0; i < 18; ++i) await pressKeyToWaitMark(page, 'Space');	// 「movie_face」まで
	await pressKeyToWaitMark(page, 'Space');	// [lay fn=anime]→[add_fx fx=wave]→[er]sheet_base[l]
	expect(await mesStr(page)).toBe('sheet_base');

	await expect.poll(async ()=> draw(page)).toBe('canvas');
	// シート div は div0 のサイズ担当として残るが animation-play-state:paused
	await expect.poll(()=> canvasRunning(SEL_FORE)(page)).toBe('1');	// 毎フレーム転写
});

test('同じ内容の単発 fx を [clear_fx]→[add_fx] で連続再トリガーすると毎回発火する（バグの回帰）', async ({page})=> {
	// GrpLayer.tsx の FxImg は以前、update() を呼ぶ useEffect の依存を JSON.stringify(aFx)
	//	（内容の文字列）にしていた。[clear_fx] は #fxN の採番を #fx1 へ戻すので、同じ
	//	fx=／time= で [clear_fx]→[add_fx] を連続実行すると前回と一字一句同じ T_FX ができ、
	//	「変化なし」と誤判定されて update() が呼ばれず＝2回目の単発が発火しなかった
	//	（[add_fx loop=false] で単発を撃ち直す操作で実機で確認。2026-09-02）
	for (let i = 0; i < 19; ++i) await pressKeyToWaitMark(page, 'Space');	// 「sheet_base」まで

	// 1回目：[clear_fx]→[add_fx fx=rgbShift time=1500]→[er]単発再発火1[l]
	await pressKeyToWaitMark(page, 'Space');
	expect(await mesStr(page)).toBe('単発再発火1');
	await expect.poll(()=> canvasRunning(SEL_FORE)(page)).toBe('1');	// 発火直後は rAF が回っている
	// time=1500 の経過で凍結（素通しに切り替わり rAF が止まる）のを待つ
	await expect.poll(()=> canvasRunning(SEL_FORE)(page), {timeout: 3000}).toBe('0');

	// 2回目：1回目と一字一句同じ内容で [clear_fx]→[add_fx]→[er]単発再発火2[s]
	await pressKey(page, 'Space');
	await expect.poll(async ()=> mesStr(page)).toBe('単発再発火2');
	// 修正前はここが '0' に固まったまま（update() が呼ばれないので rAF が再開しない）
	await expect.poll(()=> canvasRunning(SEL_FORE)(page)).toBe('1');
});

test('[add_fx fx=blur loop=false] は keep 既定 true・one-shot 自然経過で done が焼かれる', async ({page})=> {
	for (let i = 0; i < 21; ++i) await pressKeyToWaitMark(page, 'Space');	// 「単発再発火2」まで

	await pressKey(page, 'Space');	// [clear_fx]→[lay]→[add_fx name=bl fx=blur loop=false time=300]→[er]blur[l]
	await expect.poll(async ()=> mesStr(page)).toBe('blur');

	const bl0 = (await afx(page))!.find(f=> f.name === 'bl')!;
	//	組み込みで loop=false の尺（H_FX_BUILTIN_DURATION.blur=800）は time= 明示が上書き。keep は既定 true
	expect(bl0).toMatchObject({fx: 'blur', time: 300, speed: 1, keep: true});
	expect(bl0.params).toMatchObject({amp: 8});
	await expect.poll(async ()=> draw(page)).toBe('canvas');

	//	time=300 経過：keep なので素通しへ戻さず canvas を保持するが rAF は止まる（data-fx-running=0）。
	//	あわせて ScriptMng.#markFxDone が記述子へ done を焼く（[load] 復元を最終フレームにするため）
	await expect.poll(()=> canvasRunning(SEL_FORE)(page), {timeout: 3000}).toBe('0');
	await expect.poll(async ()=> (await afx(page))?.find(f=> f.name === 'bl')?.done).toBe(true);
	await expect.poll(async ()=> draw(page)).toBe('canvas');
});

test('[add_fx fx=blur reverse=true] は完了済み blur の後でも「今から」ランプし直す（一瞬で戻らない）', async ({page})=> {
	for (let i = 0; i < 22; ++i) await pressKeyToWaitMark(page, 'Space');	// 「blur」まで（直前の blur は done 済み）

	await pressKey(page, 'Space');	// [clear_fx]→[add_fx name=blr fx=blur loop=false time=2000 reverse=true]→[er]blur_reverse[l]
	await expect.poll(async ()=> mesStr(page)).toBe('blur_reverse');

	const blr = (await afx(page))!.find(f=> f.name === 'blr')!;
	expect(blr).toMatchObject({fx: 'blur', time: 2000, reverse: true, keep: true});
	expect(blr).not.toHaveProperty('done');	// 直前の完了済み blur のタイムラインを引き継いでいない
	await expect.poll(async ()=> draw(page)).toBe('canvas');
	// 修正前はここが即 '0'（前回の経過時間 ≫ time= で初回描画から凍結）。今は time=2000 のランプ中＝rAF が回る
	await expect.poll(()=> canvasRunning(SEL_FORE)(page)).toBe('1');
	// 経過後は素通しへ戻さず（keep）rAF だけ止まる
	await expect.poll(()=> canvasRunning(SEL_FORE)(page), {timeout: 4000}).toBe('0');
});

test('grayscale / sepia（blur と同じランプ型）が 2 本重ねてコンパイル・描画できる', async ({page})=> {
	for (let i = 0; i < 23; ++i) await pressKeyToWaitMark(page, 'Space');	// 「blur_reverse」まで

	await pressKey(page, 'Space');	// [clear_fx]→[add_fx gs fx=grayscale]→[add_fx sp fx=sepia amp=0.7]→[er]color_fx[s]
	await expect.poll(async ()=> mesStr(page)).toBe('color_fx');

	const a = (await afx(page))!;
	expect(a.map(f=> f.fx)).toEqual(['grayscale', 'sepia']);
	expect(a[0]).toMatchObject({fx: 'grayscale', time: 300, keep: true, params: {amp: 1}});
	expect(a[1]).toMatchObject({fx: 'sepia', time: 300, keep: true, params: {amp: 0.7}});
	await expect.poll(async ()=> draw(page)).toBe('canvas');	// 2 パスとも compile 成功で <canvas>
	// keep なので経過後も canvas は残るが rAF は止まる
	await expect.poll(()=> canvasRunning(SEL_FORE)(page), {timeout: 3000}).toBe('0');
});
