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

import {SaveMng, type T_DATA4VARI_TRANSPORT, type T_MARK, type T_SaveStore} from '../src/ts/SaveMng';

import {beforeEach, expect, it} from 'bun:test';


// storeLoad/storeFlushの偽物。ns別のインメモリ置き場（crypto有無で分ける。SysBaseの
//	実キー分けと同じ意図で、平文と暗号文を取り違えて読む事故を偽物側でも起こさないため）
const hStore: {[ns: string]: T_DATA4VARI_TRANSPORT} = {};
const fakeSys: T_SaveStore = {
	crypto: false,
	enc: async tx=> tx,
	dec: async (_ext, tx)=> tx,
	storeLoad: async (ns)=> hStore[ns] ? structuredClone(hStore[ns]) : undefined,
	storeFlush: async (ns, data)=> {hStore[ns] = structuredClone(data)},
};

// crypto:true版。暗号強度はプラグインの責任なので、ここではbase64程度の可逆変換で配線だけ見る。
//	btoa/atobはlatin1専用で日本語（しおりのjson.text等）を扱えないため、UTF-8を通せるBufferで代用
const hStoreCrypto: {[ns: string]: T_DATA4VARI_TRANSPORT} = {};
const fakeSysCrypto: T_SaveStore = {
	crypto: true,
	enc: async tx=> Buffer.from(tx, 'utf-8').toString('base64'),
	dec: async (_ext, tx)=> Buffer.from(tx, 'base64').toString('utf-8'),
	storeLoad: async (ns)=> hStoreCrypto[ns] ? structuredClone(hStoreCrypto[ns]) : undefined,
	storeFlush: async (ns, data)=> {hStoreCrypto[ns] = structuredClone(data)},
};

beforeEach(()=> {
	for (const k of Object.keys(hStore)) delete hStore[k];	// eslint-disable-line @typescript-eslint/no-dynamic-delete
	for (const k of Object.keys(hStoreCrypto)) delete hStoreCrypto[k];	// eslint-disable-line @typescript-eslint/no-dynamic-delete
});

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
	await sm.flushed();	// storeFlushは非同期（enc()を挟むため）。着地を待ってから読み戻す

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
	await sm.flushed();

	expect(await new SaveMng(fakeSys, '別プロジェクト').load()).toBe(true);
});

it('file_userdataへ置いて読み返せる', async ()=> {
	// [snapshot fn='userdata:/…']の置き場。値はdata URLのまま持つ
	const sm = new SaveMng(fakeSys, 'prj');
	await sm.load();
	expect(sm.getFile('userdata:/777.png')).toBeUndefined();

	sm.putFile('userdata:/777.png', 'data:image/png;base64,AAAA');
	expect(sm.getFile('userdata:/777.png')).toBe('data:image/png;base64,AAAA');
	await sm.flushed();

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
	await sm.flushed();

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


// ===== crypto:true（プラグイン注入方式の暗号化） =====
//	暗号強度はプラグイン（本家でいうsnsys_pre）の責任なので、ここではbase64程度の可逆変換で
//	「配線・順序・往復」だけを見る。実アルゴリズムでの検証はE2E側（第4段階、todo.md）

it('crypto_flushEncryptsEachFieldThenLoadDecrypts', async ()=> {
	const sm = new SaveMng(fakeSysCrypto, 'prj');
	await sm.load();
	sm.data.sys = {'const.sn.cfg.ns': 'prj'};
	sm.setMark(1, mark('第一章'));
	await sm.flushed();

	// 輸送層に渡る値は種別ごとに暗号化された文字列（本家 SysWeb.ts:79-88 と同じく丸ごと1本にしない）
	const raw = hStoreCrypto['prj'];
	expect(typeof raw?.sys).toBe('string');
	expect(typeof raw?.mark).toBe('string');
	expect(raw?.sys).not.toContain('const.sn.cfg.ns');	// 平文のキー名が漏れていない

	const sm2 = new SaveMng(fakeSysCrypto, 'prj');
	expect(await sm2.load()).toBe(false);
	expect(sm2.data.sys['const.sn.cfg.ns']).toBe('prj');
	expect(sm2.getMark(1)?.json.text).toBe('第一章');
});

it('crypto_offKeepsPlainObjectPayload', async ()=> {
	// crypto:false時は現状どおりオブジェクトのまま（本家データ互換の維持）
	const sm = new SaveMng(fakeSys, 'prj');
	await sm.load();
	sm.data.sys = {'const.sn.cfg.ns': 'prj'};
	sm.flush();
	await sm.flushed();

	expect(typeof hStore['prj']?.sys).toBe('object');
});

it('crypto_flushesLandInOrder', async ()=> {
	// flush()は500ms以内の連続呼び出しを1回にまとめる（デバウンス、SaveMng.ts:104-115）ため、
	//	2回目以降を反映させるにはタイマー発火を待つ必要がある。直列化（#pWriteのFIFO）が無いと
	//	enc()を挟んだ複数回の書き込みが入れ替わりうるので、最終的に一番新しい値が着地することを見る
	const sm = new SaveMng(fakeSysCrypto, 'prj');
	await sm.load();

	sm.data.sys = {v: 1}; sm.flush();
	sm.data.sys = {v: 2}; sm.flush();
	sm.data.sys = {v: 3}; sm.flush();
	await new Promise(re=> setTimeout(re, 600));
	await sm.flushed();

	const sm2 = new SaveMng(fakeSysCrypto, 'prj');
	await sm2.load();
	expect(sm2.data.sys['v']).toBe(3);
}, 2000);

// export()/import()自体（ダウンロード・ファイル選択ダイアログ）はブラウザが要るのでE2E側
//	（save.e2e.ts、todo.mdの第4段階）。ここではSaveMng内の分岐（crypto有無・接頭辞）までを見る
