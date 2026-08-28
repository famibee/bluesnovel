/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2026-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

// 本家互換プラグイン機構（[add_lay class=…]→addLayCls、addTag）の疎通確認
//	（シナリオ：prj_plg/main.sn）。エンジン側の振る舞い（cls検査・layPlg/plgTagアクション）は
//	test/ScriptEngine_layplg.test.ts・test/ScriptEngine_plgtag.test.tsが持つので、ここで見るのは
//	「SysBase.#initPlg()が本当にプラグインのinit()を呼び、addLayCls/addTag経由で登録した
//	Layer工場・タグ関数が実DOMへ現れ、属性やisWait/resumeが機能するか」——
//	つまりブラウザでしか確かめられない部分だけ

import {expect, test} from '@playwright/test';
import {gotoSn, pressKey, pressKeyToWaitMark, waitIdle, waitTransDone, waitTransRunning} from './snPage';

test.beforeEach(async ({page})=> {await gotoSn(page, 'plg')});

// PlgLayer.tsx（箱）の子に、DmyLayer.ctn（中身）がattachBox()経由で入っているか
const dmyCtn = () => '#skynovel [data-page="fore"] [data-lay="x"] [data-dmy="ctn"]';
// レイヤyの表/裏それぞれのDOM実体（[trans]の複製確認用。dmyCtn()と違い表裏どちらも見る）
const dmyCtnY = (page: 'fore' | 'back') => `#skynovel [data-page="${page}"] [data-lay="y"] [data-dmy="ctn"]`;

test('addLayClsで登録したプラグインレイヤーが実DOMへ現れ、[lay]の属性を受け取る', async ({page})=> {
	await waitIdle(page);

	// [add_lay class=dmy]でDmyLayerが生成され、そのctnがLayer.tsx（箱）の中に現れている
	const ctn = page.locator(dmyCtn());
	await expect(ctn).toHaveCount(1);

	// [lay layer=x foo=bar left=10]の属性ハッシュが丸ごとlayPlgとしてLayer.lay()へ渡っている
	//	（class/pageはlayPlgのhArgに含まれない：classは[add_lay]時点の属性、pageはchgLay/layPlg
	//	の振り分け先であってhArg自体のキーではないため）
	await expect.poll(async ()=> ctn.textContent()).toBe(JSON.stringify({layer: 'x', foo: 'bar', left: '10'}));

	// 共通の見た目（[lay left=10]）は箱（components/Layer.tsx）にも効く
	const left = await page.locator('#skynovel [data-page="fore"] [data-lay="x"]').evaluate(e=> (e as HTMLElement).style.left);
	expect(left).toBe('10px');

	// [lay layer=x dmy_wait=true]：[lay]のisWait対応。DmyLayer.lay()がtrueを返した直後は
	//	まだ待機中（#procing=true）で、その間のクリックは#goSafe()に捨てられるため、
	//	50ms後にpia.resume()が呼ばれ「待った。[l]」の本物の停止点へ着くまでpressKeyToWaitMark()で待つ
	await pressKeyToWaitMark(page, 'Space');
	await expect.poll(async ()=> ctn.getAttribute('data-lay-wait')).toBe('done');
	await expect.poll(async ()=> ctn.textContent()).toBe(JSON.stringify({layer: 'x', dmy_wait: 'true'}));

	// [clear_lay layer=x page=both]でLayer.clearLay()が呼ばれ、中身が消える
	await pressKey(page, 'Space');	// [l]から[s]まで進める
	await expect.poll(async ()=> page.locator(dmyCtn()).getAttribute('data-cleared')).toBe('true');
});

test('addTagで登録したタグが実行され、属性ハッシュとisWait/resumeが機能する', async ({page})=> {
	await waitIdle(page);

	// [l]から[s]までの間に[dmy_tag foo=1 bar=2][dmy_tag_async]が挟まる（main.sn参照）。
	//	間に挟まる[lay layer=x dmy_wait=true]のisWait（#procing中はクリックが捨てられる）を
	//	pressKeyToWaitMark()で安全に越えてから「待った。[l]」に着く
	await pressKeyToWaitMark(page, 'Space');
	// dmy_tagは即座に完了（isWait=false）、dmy_tag_asyncは50ms後にpia.resume()で再開する
	//	（isWait=true）ので、[s]（本当のシナリオ終端。[s]の停止はクリックでは越えられない）へ
	//	着く前に両方が実行されているはず
	await pressKey(page, 'Space');
	const body = page.locator('body');
	await expect.poll(()=> body.getAttribute('data-dmy-tag')).toBe(JSON.stringify({foo: '1', bar: '2'}));
	await expect.poll(()=> body.getAttribute('data-dmy-tag-async')).toBe('done');
});

// todo.md「[trans]でプラグインレイヤーの中身が裏へコピーされない」の回帰テスト。
//	storeのfinTrans()（store.tsx）はaPage（位置等のメタ情報）しか交換せず、DOM実体
//	（PlgLayMngが抱えるLayer.ctn配下）はstore外のため関知しない。表裏で別の値を仕込んでおき、
//	[trans]後に「新しい裏（＝元の表）」が「新しい表」の値へ複製されているかを見る
//	（本家 Pages.transPage() の back.copy(fore) 相当。PlgLayMng.finishTrans()の役目）
test('[trans]でプラグインレイヤーの中身が新しい裏へ複製される（演出なし・time=0）', async ({page})=> {
	await pressKeyToWaitMark(page, 'Space');	// [l]から「待った。[l]」（[lay dmy_wait=true]のisWait）まで進める
	// 「消した。[l]」まで進める。この間の[dmy_tag_async]もisWaitで#procing中はクリックが
	//	捨てられるため、続けてもう一度押す以上pressKeyToWaitMark()で本物の停止点を確認する
	await pressKeyToWaitMark(page, 'Space');
	// [lay layer=y val=A]（表）／[lay layer=y val=B page=back]（裏）→[trans layer=y time=0]
	await pressKey(page, 'Space');

	const fore = page.locator(dmyCtnY('fore'));
	const back = page.locator(dmyCtnY('back'));
	// 新しい表＝元の裏（val=B）。新しい裏＝元の表（val=A）だが、新しい表の値へ複製済みのはず
	await expect(fore).toHaveText(JSON.stringify({layer: 'y', val: 'B', page: 'back'}));
	await expect(back).toHaveText(JSON.stringify({layer: 'y', val: 'B', page: 'back'}));
});

test('[trans]でプラグインレイヤーの中身が新しい裏へ複製される（演出あり・タイマー駆動の#finishTrans経由）', async ({page})=> {
	await pressKeyToWaitMark(page, 'Space');	// 待った。[l]（[lay dmy_wait=true]のisWait）
	await pressKeyToWaitMark(page, 'Space');	// 消した。[l]（[dmy_tag_async]のisWait）
	await pressKey(page, 'Space');	// 1回目の[trans layer=y time=0]

	// [lay layer=y val=C page=back]→[trans layer=y time=100][wt]
	await page.keyboard.press('Space');
	await waitTransRunning(page);
	await waitTransDone(page);
	await waitIdle(page);

	const fore = page.locator(dmyCtnY('fore'));
	const back = page.locator(dmyCtnY('back'));
	await expect(fore).toHaveText(JSON.stringify({layer: 'y', val: 'C', page: 'back'}));
	await expect(back).toHaveText(JSON.stringify({layer: 'y', val: 'C', page: 'back'}));
});

// backpage-perf.md「プラグイン拡張レイヤの自前 rAF が不可視 back ページで回り続ける」対応。
//	PlgLayMng が foreIdx／trans 状態から各 Layer の可視を算出し setActive() で通知、
//	プラグイン（ここでは DmyLayer）が自前 rAF を止める。3d_layer / live2d_layer も同型の override
test('[trans]後の不可視 back ページでプラグインの自前 rAF が止まる（data-active=0・data-frames 凍結）', async ({page})=> {
	await pressKeyToWaitMark(page, 'Space');	// 待った。[l]
	await pressKeyToWaitMark(page, 'Space');	// 消した。[l]
	await pressKey(page, 'Space');			// [trans layer=y time=0] → 停止
	await page.keyboard.press('Space');		// [lay y val=C page=back][trans layer=y time=100][wt]
	await waitTransRunning(page);
	await waitTransDone(page);
	await waitIdle(page);
	await pressKey(page, 'Space');			// [add_lay z][lay z dmy_loop=true] → 「loop開始」

	const ctnZ = (pg: 'fore' | 'back')=>
		page.locator(`#skynovel [data-page="${pg}"] [data-lay="z"] [data-dmy="ctn"]`);

	// loop 稼働中：fore の z は可視でフレームが進む
	await expect(ctnZ('fore')).toHaveAttribute('data-active', '1');
	await expect.poll(async ()=> Number(await ctnZ('fore').getAttribute('data-frames') ?? 0))
		.toBeGreaterThan(2);

	// [trans time=0] で foreIdx 反転 → いま loop していた物理インスタンスは back へ回る
	await pressKey(page, 'Space');			// 「trans後」
	const backZ = ctnZ('back');
	await expect(backZ).toHaveAttribute('data-active', '0');

	await page.waitForTimeout(60);			// 実行中だった rAF が 1 フレームで止まるのを待つ
	const g1 = Number(await backZ.getAttribute('data-frames') ?? 0);
	await page.waitForTimeout(150);
	expect(Number(await backZ.getAttribute('data-frames') ?? 0)).toBe(g1);	// 凍結している
});
