/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2026-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

// `@electron-toolkit/typed-ipc`（renderer側）の自前実装。理由は`IpcMain.ts`参照。
//	`window.electron.ipcRenderer`はpreload側（テンプレでは`@electron-toolkit/preload`の
//	`exposeElectronAPI()`）がcontextBridge経由で公開する契約で、そちらは変えていない。
//	ここは呼び出し側の型付けだけを自前化する
import type {IpcRendererEvent} from 'electron/renderer';

type IpcListenEventMap = {[key: string]: unknown[]};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type IpcHandleEventMap = {[key: string]: (...args: any[])=> any};
type IpcEventMap = IpcListenEventMap | IpcHandleEventMap;
type ExtractArgs<T> = T extends IpcListenEventMap ? T : never;
type ExtractHandler<T> = T extends IpcHandleEventMap ? T : never;

type T_IPC_RENDERER = {
	send(channel: string, ...args: unknown[]): void;
	invoke(channel: string, ...args: unknown[]): Promise<unknown>;
	on(channel: string, listener: (e: IpcRendererEvent, ...args: unknown[])=> void): ()=> void;
	once(channel: string, listener: (e: IpcRendererEvent, ...args: unknown[])=> void): ()=> void;
};
declare global {
	interface Window {electron?: {ipcRenderer: T_IPC_RENDERER}}
}

// preload（テンプレの `preload.mjs`＝ESM preload）の `contextBridge.exposeInMainWorld('electron', …)`
//	が終わるまで待つ。ESM preload はモジュール解決が非同期なぶん、renderer の
//	`DOMContentLoaded`→`new SysApp()`→`SysApp.loaded()` の方が先に走ることがある（非決定的）。
//	その状態で下の `send`/`invoke`/`on` に入ると `window.electron` が `undefined` で
//	`TypeError: Cannot read properties of undefined (reading 'ipcRenderer')` になり、
//	`loaded()` が丸ごと落ちて Config が生成されず、`CmnLib.stageW/H` が 0 のまま
//	＝座標計算が全崩壊する（本文が寄る／システムメニューのボタンが左上で重なる／
//	フレーム入力が効かない）。呼び出し側（`SysApp.loaded()` の先頭）でこれを await する。
//	最大 timeout ms（既定3秒）待って現れなければ諦めて進む（従来どおり TypeError に
//	なるが、原因が分かるようログを残す）。
export async function waitElectronBridge(timeout = 3000): Promise<void> {
	if (window.electron?.ipcRenderer) return;
	const t0 = performance.now();
	while (! window.electron?.ipcRenderer) {
		if (performance.now() - t0 > timeout) {
			console.error(`[SysApp] preload の window.electron が ${String(timeout)}ms 待っても現れませんでした。以降の IPC は失敗します`);
			return;
		}
		await new Promise(r=> setTimeout(r, 16));
	}
}

// 以下の `window.electron!` の `!`：呼び出しは全て `SysApp.loaded()` 経由で、その先頭が
//	`waitElectronBridge()` を await 済み（＝preload の contextBridge 公開が完了している）。
//	タイムアウトして無いまま進んだ場合は従来どおり TypeError になる（それはログ済みの異常系）。
export class IpcEmitter<T extends IpcEventMap> {
	send<E extends keyof ExtractArgs<T>>(channel: Extract<E, string>, ...args: ExtractArgs<T>[E]) {
		window.electron!.ipcRenderer.send(channel, ...args);
	}

	invoke<E extends keyof ExtractHandler<T>>(channel: Extract<E, string>, ...args: Parameters<ExtractHandler<T>[E]>) {
		return window.electron!.ipcRenderer.invoke(channel, ...args) as Promise<ReturnType<ExtractHandler<T>[E]>>;
	}
}

export class IpcListener<T extends IpcListenEventMap> {
	on<E extends keyof T>(channel: Extract<E, string>, listener: (e: IpcRendererEvent, ...args: T[E])=> void) {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		return window.electron!.ipcRenderer.on(channel, listener as any);
	}

	once<E extends keyof T>(channel: Extract<E, string>, listener: (e: IpcRendererEvent, ...args: T[E])=> void | Promise<void>) {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		return window.electron!.ipcRenderer.once(channel, listener as any);
	}
}
