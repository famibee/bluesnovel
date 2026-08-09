/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2024-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

// アプリ（Electron）版のレンダラ入口。web.ts（ブラウザ版）と同じ位置づけで、
//	違いは**主処理（appMain）とのやりとりが要る**ぶんだけ。本家 SysApp.ts:47。
//
//	**ウインドウは`inited`を送るまで出てこない**（appMain_cmn がそこで bw.show() する。
//	BrowserWindowは`show: false`で作られる＝位置と大きさが決まるまで見せない作り）。
//	なので loaded() の最後で必ず送る。

import type {T_HPlugin, T_Plugin, T_PluginInitArg} from './sn/CmnInterface';
export type {T_HPlugin, T_Plugin, T_PluginInitArg};
import type {TArg} from './sn/Grammar';
export type {TArg};

import {SysBase} from './sn/SysBase';
import type {T_SysBaseParams, T_SysBaseLoadedParams} from './sn/CmnInterface';
import type {TAG_WINDOW, T_CAPTURE_RECT, T_IpcEvents, T_IpcRendererEvent} from './preload';
import {decTransportField, type T_DATA4VARI, type T_DATA4VARI_TRANSPORT} from './ts/SaveMng';

import {IpcEmitter, IpcListener} from './IpcRenderer';


export class SysApp extends SysBase {
	constructor(...[hPlg = {}, arg = {cur: 'prj/', crypto: false, dip: ''}]: T_SysBaseParams) {	// DOMContentLoaded は呼び出し側でやる
		super(hPlg, arg);
		queueMicrotask(async ()=> this.loaded(hPlg, arg));
	}

	readonly #em	= new IpcEmitter<T_IpcEvents>;
	readonly #ipc	= new IpcListener<T_IpcRendererEvent>;

	protected override async loaded(...[hPlg, arg]: T_SysBaseLoadedParams) {
		// 主処理からアプリの情報を貰う。**Configより先**：`userdata:/`・`downloads:/`の
		//	解決先（Config.searchPath）がこれで決まるため
		const hInfo = await this.#em.invoke('getInfo');
		this.$path_downloads	= hInfo.downloads.replaceAll('\\', '/') +'/';
		this.$path_userdata		= hInfo.userData.replaceAll('\\', '/') +'/';

		// 主処理側のconsole出力をこちらへ流す（本家 SysApp.ts:63）
		this.#ipc.on('log', (_e, a)=> console.info('main: %o', a));
		// メニューからのキー操作（テンプレの main.ts が wc.send('fire', …)）。
		//	ブラウザ版に無い経路なので、documentへ流し直してMain.tsxの予約と同じ扱いにする
		this.#ipc.on('fire', (_e, key)=> document.dispatchEvent(
			new KeyboardEvent('keydown', {key, bubbles: true})));
		// ウインドウの移動・リサイズが確定した通知（appMain_cmn #window()）。
		//	同じくdocumentへ流し直し、Main.tsxがscrMng.setWinInf()でsys:へ書き戻す
		this.#ipc.on('save_win_inf', (_e, inf)=> document.dispatchEvent(
			new CustomEvent('sn_win_inf', {detail: inf})));

		await super.loaded(hPlg, arg);	// Config生成・React初期表示（cfg.oCfgはこの後で使える）

		// **ここでウインドウが出る**。位置・大きさは前回終了時のsys:（無ければ prj.json の
		//	window＝ステージ実寸で中央）。ScriptMng（SaveMng）はまだ通していないので、
		//	storeLoad()を直接呼んで覗く。壊れていても既定（中央）へ逃げるだけでよい
		const {width, height} = this.cfg.oCfg.window;
		let tagW: TAG_WINDOW = {c: true, x: 0, y: 0, w: width, h: height};
		try {
			const d = await this.storeLoad(this.cfg.oCfg.save_ns);
			// SaveMngがまだ無いので、crypto有効時に備え自前で1フィールドだけ復号する
			const sys = await decTransportField<T_DATA4VARI['sys']>(this.dec, d?.sys);
			const x = sys?.['const.sn.nativeWindow.x'];
			const y = sys?.['const.sn.nativeWindow.y'];
			const w = sys?.['const.sn.nativeWindow.w'];
			const h = sys?.['const.sn.nativeWindow.h'];
			if (typeof x === 'number' && typeof y === 'number' && typeof w === 'number' && typeof h === 'number')
				tagW = {c: false, x, y, w, h};
		} catch { /* 読めなければ既定（中央）のまま */ }
		await this.#em.invoke('inited', this.cfg.oCfg, tagW);
	}

	// ===== アプリ版だけが持つ振る舞い（SysBaseの既定＝no-opを上書き）=====

	override readonly appendFile = (path: string, data: string)=> this.#em.invoke('appendFile', path, data);

	override close() {void this.#em.invoke('win_close')}

	override window(o: {centering: boolean; x: number; y: number; w: number; h: number}) {
		void this.#em.invoke('window', o.centering, o.x, o.y, o.w, o.h);
	}

	override capturePage(rect: T_CAPTURE_RECT, outW: number, outH: number, mime: string) {
		return this.#em.invoke('capturePage', rect, outW, outH, mime);
	}

	// しおり・sys:の永続化先をelectron-store（userDataフォルダのJSON）へ。SysBaseの既定は
	//	localStorageで、アプリを消すと消えてしまうため（todo.md）。sys/mark/kidoku/storageを
	//	分けず**1つのJSONブロックとしてまるごと**保存する（appMain_cmn.tsの`flush`ハンドラが
	//	store全体を置き換える作りに合わせた。ブラウザ版の4キー分割はSysWeb側の互換用途なので触らない）
	override async storeLoad(ns: string): Promise<T_DATA4VARI_TRANSPORT | undefined> {
		await this.#em.invoke('Store', {name: ns});
		if (await this.#em.invoke('Store_isEmpty')) return undefined;

		const d = await this.#em.invoke('Store_get');
		return {sys: d.sys ?? {}, mark: d.mark ?? {}, kidoku: d.kidoku ?? {}, storage: d.storage ?? {}};
	}
	override async storeFlush(_ns: string, data: T_DATA4VARI_TRANSPORT): Promise<void> {
		await this.#em.invoke('flush', data);
	}

}
