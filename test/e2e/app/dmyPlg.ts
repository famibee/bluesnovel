/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2026-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

// SysBase.#initPlg()の実行時配線（本家互換のaddLayCls/addTag）が実際に機能するかを確かめるための
//	ダミープラグイン。E2E専用（plg.e2e.ts）。本家3D/Live2D系プラグイン（sn_gallery）の
//	移植先を占う最小例として、Layer.ctn（素のdiv）へDOMで確認できる目印を書き込むだけにする

import type {T_PluginInitArg, TArg} from '../../../src/web';
import {Layer} from '../../../src/web';
import type {T_RecordPlayBack_lay} from '../../../src/sn/Layer';

class DmyLayer extends Layer {
	constructor(private readonly pia: T_PluginInitArg) {
		super();
		this.ctn.dataset.dmy = 'ctn';	// attachBox()でPlgLayer.tsxの箱へ入った後、E2E側がこれで検出する
	}

	// 本家 3d_layer / live2d_layer が持つ「自前 rAF ループ + #running ゲート」の最小再現。
	//	不可視 back ページで空回しを止められるか（PlgLayMng.setPageState→Layer.setActive）を
	//	E2E から確かめる（backpage-perf.md）。#tick は data-frames を増やし、data-active に
	//	いまの可視状態を映す
	#running = false;
	#active = true;
	#frames = 0;
	#tick = ()=> {
		if (! this.#running || ! this.#active) return;
		this.ctn.dataset.frames = String(++this.#frames);
		requestAnimationFrame(this.#tick);
	};
	#startLoop(): void {
		if (this.#running) return;
		this.#running = true;
		requestAnimationFrame(this.#tick);
	}
	override setActive(active: boolean): void {
		this.#active = active;
		this.ctn.dataset.active = active ? '1' : '0';
		if (active && this.#running) requestAnimationFrame(this.#tick);	// 止まっていたループを再開
	}
	override lay(hArg: TArg): boolean {
		// dmy_wait=true：[lay]のisWait対応（本家 Pages.lay()の戻り値相当。glTFロード待ち等の
		//	最小例）。50ms後にpia.resume()で再開する。addTag側のdmy_tag_asyncと同じ形。
		//	属性名はwaitにしない：TArg.waitは既に汎用の待ち時間(msec)属性として予約済みのため。
		//	TArgはT_HTagの定義済み属性しか型で持たないので、独自属性の参照は生ハッシュへキャストする
		if ((hArg as unknown as {[k: string]: string}).dmy_wait === 'true') {
			this.ctn.dataset.layWait = 'waiting';
			setTimeout(()=> {
				this.ctn.textContent = JSON.stringify(hArg);
				this.ctn.dataset.layWait = 'done';
				this.pia.resume();
			}, 50);
			return true;
		}
		// dmy_loop=true：本家プラグイン同様、初回[lay]で自前rAFループを起動する
		if ((hArg as unknown as {[k: string]: string}).dmy_loop === 'true') this.#startLoop();
		// 受け取った属性ハッシュ丸ごとをtextContentへ（layPlgが本当に「属性ハッシュそのもの」を
		//	渡しているかをE2E側から検証できるように）
		this.ctn.textContent = JSON.stringify(hArg);
		return false;
	}
	override clearLay(): void {
		this.ctn.textContent = '';
		this.ctn.dataset.cleared = 'true';
		this.#running = false;	// 自前rAFループの停止（本家プラグインの clearLay 相当）
	}
	// [trans]でLayer.copy()（record/playback経由）が実際に中身を複製するかをE2E側から
	//	確かめるためのoverride（plg.e2e.ts参照）。しおり（save/load）でも同じ経路を通る
	override record(): T_RecordPlayBack_lay {
		return {...super.record(), mark: this.ctn.textContent};
	}
	override playback(hLay: T_RecordPlayBack_lay, aPrm: Promise<void>[]): void {
		super.playback(hLay, aPrm);
		this.ctn.textContent = (hLay.mark as string | undefined) ?? '';
	}
}

// hPlg.dmyPlg = await import('./dmyPlg') とそのままT_Pluginとして使う（snsys_pre.tsと同じ形）
export async function init(pia: T_PluginInitArg) {
	pia.addLayCls('dmy', ()=> new DmyLayer(pia));

	// addTagの疎通確認：即座に完了するタグ（isWait=false）。属性ハッシュが丸ごと渡ることを
	//	DOMへ書き込んでE2E側から検証する
	pia.addTag('dmy_tag', hArg=> {
		document.body.dataset.dmyTag = JSON.stringify(hArg);
		return false;
	});

	// isWait=true→pia.resume()で再開するパターン（本家 Pages.lay()のisWait相当。
	//	glTFロード待ち等、非同期処理が絡むプラグインタグの最小例）
	pia.addTag('dmy_tag_async', ()=> {
		document.body.dataset.dmyTagAsync = 'waiting';
		setTimeout(()=> {
			document.body.dataset.dmyTagAsync = 'done';
			pia.resume();
		}, 50);
		return true;
	});
}
