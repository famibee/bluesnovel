/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2024-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

// [update_check]の実処理（本家 SysApp.ts:306 update_check〜:437 #dl_comp()）。
//	IPC呼び出し（fetch/fetchAb/writeFile/showMessageBox）を依存として受け取る形にし、
//	app.ts（electron専用・windowを参照するため bun test から読めない）と切り離してテスト可能にした
//	（Crypto.tsのdecryptPicUrlと同じ流儀）

export type T_UpdateCheckDeps = {
	fetchText	: (url: string)=> Promise<{ok: boolean; txt: string}>;
	fetchAb		: (url: string)=> Promise<{ok: boolean; ab: ArrayBuffer}>;
	writeFile	: (path: string, data: NodeJS.ArrayBufferView)=> Promise<void>;
	showMessageBox	: (o: T_MessageBoxOptions)=> Promise<{response: number}>;
	downloadsDir	: string;	// 末尾スラッシュ無し
	appVersion	: string;
	platform	: string;
	arch		: string;
	iconPath	: string;
	bookTitle	: string;
	isMac		: boolean;
	debugLog	: boolean;
};

// electron/rendererのMessageBoxOptionsは今回使うフィールドだけの最小型に絞る
//	（web版ビルドへelectron型を持ち込まないため。app.ts側で実型と互換）
export type T_MessageBoxOptions = {
	title		: string;
	icon		: string;
	buttons		: string[];
	defaultId	: number;
	cancelId	: number;
	message		: string;
	detail?		: string;
};

type T_UpdIdxPkg = {
	path	: string;
	size	: number;
	sha512	: string;
	cn		: string;
};
type T_UpdIdxJson = {
	[key: string]	: T_UpdIdxPkg | string;
	version			: string;
	name			: string;
};

// sha512（_index.json／.ymlどちらにもある）は本家SysApp.tsも取得はするがどこにも渡しておらず、
//	実際には改竄検査を行っていない（コメントアウトされた分岐の痕跡のみ）。bluesnovelも本家の
//	実装のまま（未検証）で移植する。ダウンロード実行ファイル自体の署名検証はOS側（Gatekeeper／
//	Windows SmartScreen）の領分という判断は本家から変えていない

export async function updateCheck(url: string, deps: T_UpdateCheckDeps): Promise<void> {
	const o = await deps.fetchText(url +'_index.json');
	const mbo: T_MessageBoxOptions = {
		title		: 'アプリ更新',
		icon		: deps.iconPath,
		buttons		: ['OK', 'Cancel'],
		defaultId	: 0,
		cancelId	: 1,
		message		: `アプリ【${deps.bookTitle}】に更新があります。\nダウンロードしますか？`,
	};
	if (o.ok) await idxjsFound(o.txt, url, mbo, deps);
	else await idxjsNotFound(url, mbo, deps);
}

async function idxjsFound(txt: string, url: string, mbo: T_MessageBoxOptions, deps: T_UpdateCheckDeps) {
	const oIdx = <T_UpdIdxJson>JSON.parse(txt);
	if (! await dlStart(oIdx.version, mbo, deps)) return;

	const key = deps.platform +'_'+ deps.arch;
	const k = oIdx[key];
	if (k && typeof k === 'object') {
		const {cn, path} = k;
		await dlApp(url, key +'-'+ cn, path, deps);
		await dlComp(mbo, deps);
		return;
	}

	let d = '';
	const regOldSameKey = new RegExp('^'+ deps.platform +'_');
	const a: Promise<void>[] = Object.entries(oIdx).flatMap(([nm, v])=> {
		if (typeof v !== 'object' || ! regOldSameKey.test(nm)) return [];
		const {path, cn} = v;
		d += '\n- '+ path;
		return [dlApp(url, nm +'-'+ cn, path, deps)];
	});

	mbo.message = `CPU = ${deps.arch}\nに対応するファイルが見つかりません。同じOSのファイルをすべてダウンロードしますか？`;
	mbo.detail = `${String(a.length)} 個ファイルがあります`+ d;
	const {response} = await deps.showMessageBox(mbo);
	if (response > 0) return;

	await Promise.allSettled(a);
	await dlComp(mbo, deps);
}

async function idxjsNotFound(url: string, mbo: T_MessageBoxOptions, deps: T_UpdateCheckDeps) {
	const o = await deps.fetchText(url +`latest${deps.isMac ?'-mac' :''}.yml`);
	if (! o.ok) {
		if (deps.debugLog) throw '[update_check] .ymlが見つかりません';
		return;
	}
	const sYml = o.txt;
	const mv2 = /version: (.+)/.exec(sYml)?.[1];
	if (! mv2) throw '[update_check] .yml に version が見つかりません';
	if (! await dlStart(mv2, mbo, deps)) return;

	const mp = /path: (.+)/.exec(sYml);
	if (! mp) throw '[update_check] path が見つかりません';
	const [,path] = mp;
	if (! path) throw '[update_check] path が見つかりません.';

	// (id)-1.0.0-arm64.dmg
	const [,id, ext] = /(.+)(\.\w+)/.exec(path) ?? ['', '', ''];
	await dlApp(url, id +'-'+ deps.arch + ext, path, deps);
	await dlComp(mbo, deps);
}

async function dlStart(netver: string, mbo: T_MessageBoxOptions, deps: T_UpdateCheckDeps): Promise<boolean> {
	if (netver === deps.appVersion) return false;	// バージョン更新なし

	mbo.detail = `現在 NOW ver ${deps.appVersion}\n新規 NEW ver ${netver}`;
	const {response} = await deps.showMessageBox(mbo);
	return response === 0;
}

async function dlApp(url: string, urlApp: string, fn: string, deps: T_UpdateCheckDeps) {
	const o = await deps.fetchAb(url + urlApp);
	if (! o.ok) return;	// このOS向けのファイルが見つからないだけなので黙って諦める（本家と同じ）

	await deps.writeFile(deps.downloadsDir +'/'+ fn, new DataView(o.ab));
}

async function dlComp(mbo: T_MessageBoxOptions, deps: T_UpdateCheckDeps) {
	mbo.buttons.pop();	// 完了報告はCancelを持たない
	mbo.message = `アプリ【${deps.bookTitle}】の更新パッケージを\nダウンロードしました`;
	await deps.showMessageBox(mbo);
}
