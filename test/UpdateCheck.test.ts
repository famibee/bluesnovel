/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2026-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

// [update_check]の実処理（本家 SysApp.ts:306）。IPC呼び出しを依存注入にしたUpdateCheck.tsを
//	単体で叩く。app.ts（electron専用でwindowを参照するためbun testから読めない）は結線するだけ

import {updateCheck, type T_UpdateCheckDeps, type T_MessageBoxOptions} from '../src/UpdateCheck';

import {expect, it} from 'bun:test';


function mkDeps(over: Partial<T_UpdateCheckDeps> = {}): T_UpdateCheckDeps & {
	aFetchText	: string[];
	aFetchAb	: string[];
	aWriteFile	: {path: string; len: number}[];
	aMbo		: T_MessageBoxOptions[];
} {
	const aFetchText: string[] = [];
	const aFetchAb: string[] = [];
	const aWriteFile: {path: string; len: number}[] = [];
	const aMbo: T_MessageBoxOptions[] = [];
	const {
		fetchText	: fetchTextImpl	= async ()=> ({ok: false, txt: ''}),
		fetchAb		: fetchAbImpl	= async ()=> ({ok: true, ab: new ArrayBuffer(4)}),
		showMessageBox	: showMessageBoxImpl	= async ()=> ({response: 0}),
		...restOver
	} = over;
	return {
		aFetchText, aFetchAb, aWriteFile, aMbo,
		fetchText	: async u=> {aFetchText.push(u); return fetchTextImpl(u)},
		fetchAb		: async u=> {aFetchAb.push(u); return fetchAbImpl(u)},
		writeFile	: async (path, data)=> {aWriteFile.push({path, len: data.byteLength})},
		showMessageBox	: async o=> {aMbo.push(structuredClone(o)); return showMessageBoxImpl(o)},
		downloadsDir	: '/downloads',
		appVersion	: '1.0.0',
		platform	: 'darwin',
		arch		: 'arm64',
		iconPath	: '/app/doc/icon.png',
		bookTitle	: 'テスト作品',
		isMac		: true,
		debugLog	: false,
		...restOver,
	};
}

const IDX_JSON_MATCH = JSON.stringify({
	version	: '2.0.0',
	name	: 'test',
	darwin_arm64	: {path: 'app-2.0.0-arm64.dmg', size: 123, sha512: 'abc', cn: 'CN=abc'},
});

it('_index.jsonが取れて自機種向けファイルがあれば、確認→ダウンロード→完了の順に進む', async ()=> {
	const deps = mkDeps({
		fetchText: async _u=> ({ok: true, txt: IDX_JSON_MATCH}),
	});
	await updateCheck('https://example.com/upd/', deps);

	expect(deps.aFetchText).toEqual(['https://example.com/upd/_index.json']);
	expect(deps.aFetchAb).toEqual(['https://example.com/upd/darwin_arm64-CN=abc']);
	expect(deps.aWriteFile).toEqual([{path: '/downloads/app-2.0.0-arm64.dmg', len: 4}]);
	// 1回目：更新確認ダイアログ（OK/Cancel）、2回目：完了ダイアログ（OKのみ）
	expect(deps.aMbo.length).toBe(2);
	expect(deps.aMbo[0]?.buttons).toEqual(['OK', 'Cancel']);
	expect(deps.aMbo[1]?.buttons).toEqual(['OK']);
});

it('バージョンが同じなら何もしない', async ()=> {
	const deps = mkDeps({
		appVersion	: '2.0.0',
		fetchText	: async _u=> ({ok: true, txt: IDX_JSON_MATCH}),
	});
	await updateCheck('https://example.com/upd/', deps);

	expect(deps.aFetchAb).toEqual([]);
	expect(deps.aWriteFile).toEqual([]);
	expect(deps.aMbo).toEqual([]);
});

it('確認ダイアログでCancelされたらダウンロードしない', async ()=> {
	const deps = mkDeps({
		fetchText		: async _u=> ({ok: true, txt: IDX_JSON_MATCH}),
		showMessageBox	: async _o=> ({response: 1}),	// Cancel
	});
	await updateCheck('https://example.com/upd/', deps);

	expect(deps.aFetchAb).toEqual([]);
	expect(deps.aWriteFile).toEqual([]);
});

it('自機種向けファイルが無ければ同OSの全ファイルをまとめてダウンロード確認する', async ()=> {
	const idx = JSON.stringify({
		version	: '2.0.0',
		name	: 'test',
		darwin_x64	: {path: 'app-2.0.0-x64.dmg', size: 1, sha512: 'a', cn: 'CN=a'},
		win32_x64	: {path: 'app-2.0.0-win.exe', size: 1, sha512: 'b', cn: 'CN=b'},
	});
	const deps = mkDeps({
		fetchText: async _u=> ({ok: true, txt: idx}),
	});
	await updateCheck('https://example.com/upd/', deps);

	// darwin_x64だけが同OS対象（win32_x64は除外）
	expect(deps.aFetchAb).toEqual(['https://example.com/upd/darwin_x64-CN=a']);
	expect(deps.aWriteFile).toEqual([{path: '/downloads/app-2.0.0-x64.dmg', len: 4}]);
	// 1回目：更新確認、2回目：機種不一致の一覧確認、3回目：完了
	expect(deps.aMbo.length).toBe(3);
});

it('_index.jsonが無ければ.ymlへフォールバックする（Mac版はlatest-mac.yml）', async ()=> {
	const yml = 'version: 3.0.0\npath: app-3.0.0-arm64.dmg\nsha512: xyz\n';
	const deps = mkDeps({
		fetchText: async u=> u.endsWith('_index.json')
			? {ok: false, txt: ''}
			: {ok: true, txt: yml},
	});
	await updateCheck('https://example.com/upd/', deps);

	expect(deps.aFetchText).toEqual([
		'https://example.com/upd/_index.json',
		'https://example.com/upd/latest-mac.yml',
	]);
	expect(deps.aFetchAb).toEqual(['https://example.com/upd/app-3.0.0-arm64-arm64.dmg']);
});

it('.ymlもMac以外ならlatest.ymlを見る', async ()=> {
	const yml = 'version: 3.0.0\npath: app-3.0.0.exe\nsha512: xyz\n';
	const deps = mkDeps({
		isMac		: false,
		platform	: 'win32',
		arch		: 'x64',
		fetchText	: async u=> u.endsWith('_index.json')
			? {ok: false, txt: ''}
			: {ok: true, txt: yml},
	});
	await updateCheck('https://example.com/upd/', deps);

	expect(deps.aFetchText).toContain('https://example.com/upd/latest.yml');
});

it('.ymlも無ければdebugLogがfalseなら黙って終わる', async ()=> {
	const deps = mkDeps({
		fetchText: async ()=> ({ok: false, txt: ''}),
	});
	await updateCheck('https://example.com/upd/', deps);	// throwしない
	expect(deps.aMbo).toEqual([]);
});

it('.ymlも無くdebugLogがtrueならthrowする', async ()=> {
	const deps = mkDeps({
		debugLog	: true,
		fetchText	: async ()=> ({ok: false, txt: ''}),
	});
	await expect(updateCheck('https://example.com/upd/', deps)).rejects.toBe('[update_check] .ymlが見つかりません');
});

it('ダウンロード先のファイルが見つからなければ黙って諦める（機種不一致時）', async ()=> {
	const idx = JSON.stringify({
		version	: '2.0.0',
		name	: 'test',
		darwin_x64	: {path: 'app-2.0.0-x64.dmg', size: 1, sha512: 'a', cn: 'CN=a'},
	});
	const deps = mkDeps({
		platform	: 'darwin',
		arch		: 'arm64',	// key(darwin_arm64)には無い＝一覧経路
		fetchText	: async _u=> ({ok: true, txt: idx}),
		fetchAb		: async _u=> ({ok: false, ab: new ArrayBuffer(0)}),
	});
	await updateCheck('https://example.com/upd/', deps);

	expect(deps.aWriteFile).toEqual([]);
	// 更新確認→一覧確認→完了、の3回（例外にならず完了扱いまで進む）
	expect(deps.aMbo.length).toBe(3);
});
