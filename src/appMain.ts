/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2021-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import {appMain_cmn} from './appMain_cmn';
import type {SAVE_WIN_INF, T_IpcEvents, T_IpcRendererEvent} from './preload';

import {BrowserWindow, net, protocol} from 'electron';	// ギャラリーでエラーになる【error TS2503: Cannot find namespace 'Electron'.】ので const ではなく import の形に
import {pathToFileURL} from 'node:url';
import {resolve as resolvePath} from 'node:path';
import {IpcListener, IpcEmitter} from './IpcMain'


	// console.log はテンプレの VSCode に出る
export class appMain extends appMain_cmn {
	// パッケージ版（file://）だとfetch()がスキームを受け付けずprj.json等が読めないので、
	//	httpと同じ扱いのカスタムスキームでrendererを開く。app のready前にしか登録できない
	//	（Electronの制約）ので、テンプレのトップレベルで呼ぶ前提。本家に無いbluesnovel独自対応
	static	registerScheme(scheme = 'app') {
		protocol.registerSchemesAsPrivileged([{
			scheme,
			privileges: {standard: true, secure: true, supportFetchAPI: true, stream: true},
		}]);
	}

	// ready後、BrowserWindow生成前後どちらでも呼べる。dirRendererはビルド済みrendererの
	//	ディレクトリ（テンプレの `out/renderer`）
	static	handleScheme(dirRenderer: string, scheme = 'app') {
		protocol.handle(scheme, req=> {
			const {pathname} = new URL(req.url);
			const p = resolvePath(dirRenderer, decodeURIComponent(pathname).replace(/^\/+/, ''));
			if (p !== dirRenderer && ! p.startsWith(dirRenderer + '/')) return new Response('Forbidden', {status: 403});

			return net.fetch(pathToFileURL(p).toString());
		});
	}

	static	initRenderer(preload: string, version: string): BrowserWindow {
		let bw: BrowserWindow;
		let opLocalDevTools = ()=> { /* empty */ };
		try {
			appMain_cmn.init(new IpcListener<T_IpcEvents>);

			bw = new BrowserWindow({
			//	...o,
				// 以下で上書き
				show		: false,	// ウインドウ位置（とサイズ）決定時に表示
				minWidth	: 300,
				minHeight	: 300,
				acceptFirstMouse: true,
				maximizable		: false,// Macで最大化ボタンでフルスクリーンにしない
				webPreferences	: {
					// XSS対策としてnodeモジュールをレンダラープロセスで使えなくする
					// nodeIntegration		: false,
					// レンダラープロセスに公開するAPIのファイル
					// contextIsolation	: true,
					preload,
					sandbox: false,
				},
			});
			// 以下コメントアウトなら【プロジェクト】のターミナルに出る
			// console.log = (_arg: unknown)=> {};
			// console.log = (arg: unknown)=> bw.webContents.send('log', arg);
				// 有効にするとエラーにもならず終了

			const am = new appMain(bw, version);
			opLocalDevTools = ()=> am.openDevTools();
		}
		catch (e) {
			console.error(`early err:${String(e)}`);
			opLocalDevTools();
			throw 'initRenderer error';
		}

		return bw;
	}

	readonly	#em = new IpcEmitter<T_IpcRendererEvent>;
	protected override	sendShutdown() {
		this.#em.send(this.bw.webContents, 'shutdown');
	}

	protected override	sendSaveWinInf(arg: SAVE_WIN_INF) {
		this.#em.send(this.bw.webContents, 'save_win_inf', arg);
	}

}
