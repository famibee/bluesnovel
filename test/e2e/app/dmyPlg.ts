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

class DmyLayer extends Layer {
	constructor() {
		super();
		this.ctn.dataset.dmy = 'ctn';	// attachBox()でPlgLayer.tsxの箱へ入った後、E2E側がこれで検出する
	}
	override lay(hArg: TArg): boolean {
		// 受け取った属性ハッシュ丸ごとをtextContentへ（layPlgが本当に「属性ハッシュそのもの」を
		//	渡しているかをE2E側から検証できるように）
		this.ctn.textContent = JSON.stringify(hArg);
		return false;
	}
	override clearLay(): void {
		this.ctn.textContent = '';
		this.ctn.dataset.cleared = 'true';
	}
}

// hPlg.dmyPlg = await import('./dmyPlg') とそのままT_Pluginとして使う（snsys_pre.tsと同じ形）
export async function init(pia: T_PluginInitArg) {
	pia.addLayCls('dmy', ()=> new DmyLayer());

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
