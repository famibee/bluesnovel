/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2021-2025 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import {appMain_cmn} from './appMain_cmn';
import type {SAVE_WIN_INF, T_IpcEvents, T_IpcRendererEvent} from './preload';

import {BrowserWindow} from 'electron';	// ギャラリーでエラーになる【error TS2503: Cannot find namespace 'Electron'.】ので const ではなく import の形に
import {IpcListener, IpcEmitter} from '@electron-toolkit/typed-ipc/main'


	// console.log はテンプレの VSCode に出る
export class appMain extends appMain_cmn {
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
