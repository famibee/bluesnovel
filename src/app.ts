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
import type {T_IpcEvents, T_IpcRendererEvent} from './preload';

import {IpcEmitter, IpcListener} from '@electron-toolkit/typed-ipc/renderer';


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

		await super.loaded(hPlg, arg);	// Config生成・React初期表示（cfg.oCfgはこの後で使える）

		// **ここでウインドウが出る**。位置・大きさは prj.json の window（＝ステージ実寸）で、
		//	c=trueは「デスクトップ中央へ」。本家は保存済みのsys:から復元するが、
		//	こちらのsys:はScriptMng（SaveMng）の中なのでこの時点ではまだ読めない
		const {width, height} = this.cfg.oCfg.window;
		await this.#em.invoke('inited', this.cfg.oCfg, {c: true, x: 0, y: 0, w: width, h: height});
	}

	// ===== アプリ版だけが持つ振る舞い（SysBaseの既定＝no-opを上書き）=====

	override close() {void this.#em.invoke('win_close')}

	override window(o: {centering: boolean; x: number; y: number; w: number; h: number}) {
		void this.#em.invoke('window', o.centering, o.x, o.y, o.w, o.h);
	}

}
