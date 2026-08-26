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
import {gotoSn, pressKey, waitIdle} from './snPage';

test.beforeEach(async ({page})=> {await gotoSn(page, 'plg')});

// PlgLayer.tsx（箱）の子に、DmyLayer.ctn（中身）がattachBox()経由で入っているか
const dmyCtn = () => '#skynovel [data-page="fore"] [data-lay="x"] [data-dmy="ctn"]';

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

	// [clear_lay layer=x page=both]でLayer.clearLay()が呼ばれ、中身が消える
	await pressKey(page, 'Space');	// [l]から[s]まで進める
	await expect.poll(async ()=> page.locator(dmyCtn()).getAttribute('data-cleared')).toBe('true');
});

test('addTagで登録したタグが実行され、属性ハッシュとisWait/resumeが機能する', async ({page})=> {
	await waitIdle(page);

	// [l]から[s]までの間に[dmy_tag foo=1 bar=2][dmy_tag_async]が挟まる（main.sn参照）。
	//	dmy_tagは即座に完了（isWait=false）、dmy_tag_asyncは50ms後にpia.resume()で再開する
	//	（isWait=true）ので、[s]（本当のシナリオ終端。[s]の停止はクリックでは越えられない）へ
	//	着く前に両方が実行されているはず
	await pressKey(page, 'Space');
	const body = page.locator('body');
	await expect.poll(()=> body.getAttribute('data-dmy-tag')).toBe(JSON.stringify({foo: '1', bar: '2'}));
	await expect.poll(()=> body.getAttribute('data-dmy-tag-async')).toBe('done');
});
