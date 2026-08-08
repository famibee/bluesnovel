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
	interface Window {electron: {ipcRenderer: T_IPC_RENDERER}}
}

export class IpcEmitter<T extends IpcEventMap> {
	send<E extends keyof ExtractArgs<T>>(channel: Extract<E, string>, ...args: ExtractArgs<T>[E]) {
		window.electron.ipcRenderer.send(channel, ...args);
	}

	invoke<E extends keyof ExtractHandler<T>>(channel: Extract<E, string>, ...args: Parameters<ExtractHandler<T>[E]>) {
		return window.electron.ipcRenderer.invoke(channel, ...args) as Promise<ReturnType<ExtractHandler<T>[E]>>;
	}
}

export class IpcListener<T extends IpcListenEventMap> {
	on<E extends keyof T>(channel: Extract<E, string>, listener: (e: IpcRendererEvent, ...args: T[E])=> void) {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		return window.electron.ipcRenderer.on(channel, listener as any);
	}

	once<E extends keyof T>(channel: Extract<E, string>, listener: (e: IpcRendererEvent, ...args: T[E])=> void | Promise<void>) {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		return window.electron.ipcRenderer.once(channel, listener as any);
	}
}
