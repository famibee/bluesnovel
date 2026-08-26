/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2018-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import type {T_HPlugin, T_Plugin, T_PluginInitArg} from './sn/CmnInterface';
export type {T_HPlugin, T_Plugin, T_PluginInitArg};
import type {TArg, TTag} from './sn/Grammar';
export type {TArg, TTag};

import {SysBase} from './sn/SysBase';
import type {T_SysBaseParams, T_SysBaseLoadedParams} from './sn/CmnInterface';
import {argChk_Num, argChk_Boolean} from './sn/CmnLib';
import {Layer} from './sn/Layer';
import type {T_RecordPlayBack_lay} from './sn/Layer';
export {argChk_Num, argChk_Boolean, Layer};
export type {T_RecordPlayBack_lay};

// 仮置きでここに
export class SysWeb extends SysBase {
	// ギャラリー等、複数プロジェクトを1ページ内で切替える利用者向け（本家 SysWeb.ts:18-27）。
	//	runSN(prj)は「baseから見た相対名」を受け取る想定なので、最初のarg.curから
	//	末尾2階層（プロジェクト名＋空要素）を除いたものをbaseとして覚えておく
	readonly #path_base: string;
	constructor(...[hPlg = {}, arg = {cur: 'prj/', crypto: false, dip: ''}]: T_SysBaseParams) {	// DOMContentLoaded は呼び出し側でやる
		super(hPlg, arg);
		const a = arg.cur.split('/');
		this.#path_base = a.length > 2 ? a.slice(0, -2).join('/') + '/' : '';
		queueMicrotask(async ()=> this.loaded(hPlg, arg));
	}

	protected override async loaded(...[hPlg, arg]: T_SysBaseLoadedParams) {
		// ギャラリー等、URLの?cur=…で起動プロジェクトを直接指定する導線（本家 SysWeb.ts:44,55-56）。
		//	本家はSysBase.loaded()がrun()を呼ばず、SysWeb.loaded()の最後で自分で呼ぶ（そのため
		//	cur書き換えをrun()の前に挟める）。こちらのSysBase.loaded()はrun()まで呼び切る作りなので、
		//	super.loaded()より前にarg.curを書き換えておかないと初回起動に間に合わない
		const cur = new URLSearchParams(location.search).get('cur');
		if (cur) arg.cur = this.#path_base + cur + '/';

		await super.loaded(hPlg, arg);	// cfg.oCfgはこの後で使える

		// ギャラリーのプロジェクト切替導線（本家 SysWeb.ts:31-41）。data-prjはページ遷移なしで
		//	別プロジェクトへ切替え、data-reloadは今のプロジェクトを最初からやり直す。
		//	loaded()は初回しか呼ばれないので、ここで一度だけ登録すれば足りる
		document.querySelectorAll('[data-prj]').forEach(v=> {
			const elm = v.attributes.getNamedItem('data-prj');
			if (elm) v.addEventListener('click', ()=> {void this.runSN(elm.value)}, {passive: true});
		});
		document.querySelectorAll('[data-reload]').forEach(v=>
			v.addEventListener('click', ()=> {void this.run()}, {passive: true})
		);

		// debug.devtool=falseの時だけ警告オーバーレイのガードを有効化（本家 devtools-detect相当。
		//	理由・仕組みは DevToolsGuard.ts 参照。Electronアプリ版は appMain_cmn.ts が別途対応済み）
		if (! this.cfg.oCfg.debug.devtool) {
			const {initDevToolsGuard} = await import('./ts/DevToolsGuard');
			initDevToolsGuard();
		}
	}

	// プロジェクト切替（本家 SysWeb.ts:60-67）。#now_prjは同じリンクの連打で二重に
	//	作り直さないための重複防止で、`&& this.scrMng`は本家に無い分岐——本家はstop()を
	//	挟まない前提の導線しか無いが、こちらはElectron版ギャラリー（index_app.html）が
	//	モーダルの開閉ごとにstop()→runSN()を呼ぶため、「stop済みなら同じprjでも作り直す」を
	//	付け足さないと閉じて同じサンプルを開き直したときに再生されない
	#now_prj = ':';
	async runSN(prj: string) {
		this.arg.cur = this.#path_base + prj + '/';
		if (this.#now_prj === this.arg.cur && this.scrMng) return;

		this.#now_prj = this.arg.cur;
		await this.run();
	}

	// [log]用（本家 SysWeb.ts:264 appendFile/outputFile）。ブラウザにファイル追記の手段は無いので、
	//	呼ばれるたびパス単位で全文をメモリに溜め直し、都度ダウンロードで置き換える形で代用する
	//	（本家はoutputFile()を別メソッドに分けて[save pic=]等とも共有するが、こちらは[log]専用なので
	//	1メソッドにまとめる）
	readonly #hAppendFile: {[path: string]: string} = {};
	override async appendFile(path: string, data: string) {
		const txt = (this.#hAppendFile[path] ?? '') + data;
		this.#hAppendFile[path] = txt;

		const blob = new Blob([txt], {type: 'text/plain'});
		const a = document.createElement('a');
		a.href = URL.createObjectURL(blob);
		a.download = path;
		a.click();
		URL.revokeObjectURL(a.href);
	}

}
