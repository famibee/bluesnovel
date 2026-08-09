/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2026-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

// セーブ層（SaveMng.ts）のうち、ブラウザが要らない部分。
//	永続化の輸送層（storeLoad/storeFlush）は**その場で作る最小の偽物**を挿す（SysBase/SysAppの
//	実装は問わない＝SaveMng自身の振る舞い（キャッシュ・しおり出し入れ・flushの間引き）だけを見る）。
//	localStorageの実キー形式（SysBaseの既定実装）はブラウザが要るのでsave.e2e.ts/sys.e2e.ts側。
//	[export]/[import]はダウンロード・ファイル選択ダイアログが要るのでE2E（save.e2e.ts）側。
//	本家：SysBase.data / SysWeb.flushSub()・initVal()、Variable.ts の setMark/getMark/#copybookmark

import {SaveMng, type T_DATA4VARI, type T_MARK, type T_SaveStore} from '../src/ts/SaveMng';

import {beforeEach, expect, it} from 'bun:test';


// storeLoad/storeFlushの偽物。ns別のインメモリ置き場
const hStore: {[ns: string]: T_DATA4VARI} = {};
const fakeSys: T_SaveStore = {
	storeLoad: async (ns)=> hStore[ns] ? structuredClone(hStore[ns]) : undefined,
	storeFlush: (ns, data)=> {hStore[ns] = structuredClone(data)},
};

beforeEach(()=> {for (const k of Object.keys(hStore)) delete hStore[k]});	// eslint-disable-line @typescript-eslint/no-dynamic-delete

function mark(text: string): T_MARK {
	return {hSave: {hp: 80}, sPages: '{"aPage":[[],[]],"foreIdx":0}', aIfStk: [-1], json: {text}};
}


it('load_firstBootWhenEmpty', async ()=> {
	// 保存データが無ければ初回起動（本家 SysWeb.ts:90 の const.sn.isFirstBoot と同じ判定）
	expect(await new SaveMng(fakeSys, 'prj').load()).toBe(true);
});

it('load_notFirstBootAfterFlush', async ()=> {
	const sm = new SaveMng(fakeSys, 'prj');
	await sm.load();
	sm.data.sys = {'const.sn.cfg.ns': 'prj'};
	sm.flush();

	const sm2 = new SaveMng(fakeSys, 'prj');
	expect(await sm2.load()).toBe(false);
	expect(sm2.data.sys['const.sn.cfg.ns']).toBe('prj');
});

it('load_isPerProject', async ()=> {
	// キーはprj.jsonのsave_nsで分ける＝別プロジェクトのデータは見えない
	const sm = new SaveMng(fakeSys, 'prj');
	await sm.load();
	sm.data.sys = {a: 1};
	sm.flush();

	expect(await new SaveMng(fakeSys, '別プロジェクト').load()).toBe(true);
});

it('file_userdataへ置いて読み返せる', async ()=> {
	// [snapshot fn='userdata:/…']の置き場。値はdata URLのまま持つ
	const sm = new SaveMng(fakeSys, 'prj');
	await sm.load();
	expect(sm.getFile('userdata:/777.png')).toBeUndefined();

	sm.putFile('userdata:/777.png', 'data:image/png;base64,AAAA');
	expect(sm.getFile('userdata:/777.png')).toBe('data:image/png;base64,AAAA');

	// 保存され、次の起動でも読める
	const sm2 = new SaveMng(fakeSys, 'prj');
	await sm2.load();
	expect(sm2.getFile('userdata:/777.png')).toBe('data:image/png;base64,AAAA');
});

it('mark_setGetErase', async ()=> {
	const sm = new SaveMng(fakeSys, 'prj');
	await sm.load();
	expect(sm.getMark(1)).toBeUndefined();

	sm.setMark(1, mark('第一章'));
	expect(sm.getMark(1)?.json.text).toBe('第一章');

	sm.eraseMark(1);
	expect(sm.getMark(1)).toBeUndefined();
});

it('mark_copy', async ()=> {
	const sm = new SaveMng(fakeSys, 'prj');
	await sm.load();
	sm.setMark(1, mark('第一章'));
	sm.copyMark(1, 2);
	expect(sm.getMark(2)?.json.text).toBe('第一章');
	expect(sm.getMark(1)?.json.text).toBe('第一章');	// 元は残る
});

it('mark_copyFromMissingThrows', async ()=> {
	const sm = new SaveMng(fakeSys, 'prj');
	await sm.load();
	expect(()=> sm.copyMark(9, 2)).toThrow('のセーブデータは存在しません');
});

it('mark_survivesReload', async ()=> {
	const sm = new SaveMng(fakeSys, 'prj');
	await sm.load();
	sm.setMark(2, mark('第二章'));

	const sm2 = new SaveMng(fakeSys, 'prj');
	await sm2.load();
	expect(sm2.getMark(2)?.hSave.hp).toBe(80);
	expect(sm2.getMark(2)?.sPages).toBe('{"aPage":[[],[]],"foreIdx":0}');
});

it('bookmarkJson_isSaveAttrsPlusPlace', async ()=> {
	// 組み込み変数 const.sn.bookmark.json の中身（本家 Variable.ts:59 defTmp）。
	//	ロード画面（テンプレの frames/_archive.sn）がこれを読んで枠を並べる
	const sm = new SaveMng(fakeSys, 'prj');
	await sm.load();
	expect(sm.bookmarkJson()).toBe('[]');

	sm.setMark(0, mark('序章'));
	sm.setMark(3, mark('第三章'));
	expect(JSON.parse(sm.bookmarkJson())).toEqual([
		{text: '序章', place: 0},
		{text: '第三章', place: 3},
	]);
});

it('bookmarkJson_carriesArbitraryAttrsLikePic', async ()=> {
	// [save pic=…]のサムネイル保存：[save]は本家同様json（=[save]属性）を丸ごと持たせるだけ
	//	（ScriptEngine.ts case 'save'）なので、pic属性名に特別な処理は要らない。
	//	テンプレのframes/_archive.snは[snapshot fn='userdata:/…']で撮った絵のパスをpic属性に
	//	渡し、しおり画面が[lay fn=&pic]で読み返す（#searchPic()のuserdata:分岐、snap.e2e.ts参照）
	const sm = new SaveMng(fakeSys, 'prj');
	await sm.load();
	sm.setMark(1, {hSave: {}, sPages: '{"aPage":[[],[]],"foreIdx":0}', aIfStk: [-1],
		json: {text: '一章', pic: 'userdata:/1/pic.jpg'}});
	expect(JSON.parse(sm.bookmarkJson())).toEqual([
		{text: '一章', pic: 'userdata:/1/pic.jpg', place: 1},
	]);
});
