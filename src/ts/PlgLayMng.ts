/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2026-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

// プラグインレイヤー（[add_lay class=…]。本家3D/Live2D系プラグイン等）のDOM側。
//	**レイヤ（aPage）とは別物**で、ストアには入れない：3Dシーン等の重い可変状態は
//	structuredClone（addLayer/finishTrans）を通せず、storeの再描画のたびに作り直す
//	羽目になるため（src/ts/FrameMng.ts冒頭のコメントと同じ理由）。
//	本家Pagesと同じく1レイヤ名につきLayerインスタンスを表裏2個持ち、
//	`[add_lay]`時点でDOM未接続のまま生成してよい（[add_lay][lay]は同一step内で連続するため、
//	Reactが箱（PlgLayer.tsx）をマウントする前に[lay]が来ても取りこぼさない）。
//	箱（位置・回転・拡縮・Moveable）はcomponents/Layer.tsxが持つので、
//	ここが持つLayer.ctnは「中身を入れるための素のdiv」だけでよい

import type {TArg} from '../sn/Grammar';
import {getLayCls} from '../sn/LayCls';
import type {Layer} from '../sn/Layer';
import type {T_PAGE_BOTH} from '../store/store';


export class PlgLayMng {
	// key = `${nm}:${pageIdx}`。本家Pagesが1レイヤにつきfore/back 2個のLayerを持つのと同じ
	readonly #hLay: {[key: string]: Layer} = Object.create(null);
	readonly #hCls: {[nm: string]: string} = Object.create(null);

	// [add_lay class=cls]。ScriptEngine側で既にhasLayCls()検査済みだが、二重に守る
	//	（未登録ならレジストリ経由以外の呼び出し元があることになるため、本家同様throw）
	add(nm: string, cls: string): void {
		const f = getLayCls(cls);
		if (! f) throw `[add_lay] 属性 class【${cls}】が不正です`;
		for (const i of [0, 1] as const) {
			const l = f();
			l.layname = nm;
			// 本家 Pages.ts:29-31（f.ctn.name = f.name = nm +'A'/'B'）相当。デバッグ表示・dump用の名前
			l.name = `layer:${nm} cls:${cls} page:${i === 0 ? 'A' : 'B'}`;
			this.#hLay[`${nm}:${String(i)}`] = l;
		}
		this.#hCls[nm] = cls;
	}

	// [lay layer=nm ...]。属性ハッシュを丸ごとLayer.lay()へ渡す（本家 Pages.lay()と同じ）
	lay(nm: string, pageIdx: 0 | 1, hArg: {[k: string]: string}): boolean {
		const l = this.#hLay[`${nm}:${String(pageIdx)}`];
		if (! l) throw `[lay] 存在しないプラグインレイヤー ${nm} です`;
		return l.lay(hArg as unknown as TArg);
	}

	// [clear_lay]。aLayNm=nullは全プラグインレイヤー対象（本家 LayerMng.#getLayers()と同じ既定）。
	//	pageは'both'なら表裏両方、'fore'/'back'はforeIdxから解決した片方だけ
	clearLay(aLayNm: string[] | null, page: T_PAGE_BOTH, foreIdx: 0 | 1): void {
		const aNm = aLayNm ?? Object.keys(this.#hCls);
		const aIdx: (0 | 1)[] = page === 'both' ? [0, 1] : [page === 'fore' ? foreIdx : (1 - foreIdx) as 0 | 1];
		for (const nm of aNm) {
			if (! (nm in this.#hCls)) continue;	// grp/txtレイヤはここの管轄外
			for (const idx of aIdx) this.#hLay[`${nm}:${String(idx)}`]?.clearLay({} as TArg);
		}
	}

	// PlgLayer.tsx（React側の箱）がマウント/アンマウントするたびに呼ばれる。
	//	Reactが自分で作った子（箱のdiv）にプラグインのctnを出し入れするだけで、
	//	ctn自体の生成・破棄タイミングとは独立（[add_frame]のFrameMng.attachBoxと同じ考え方）
	attachBox(nm: string, pageIdx: 0 | 1, el: HTMLElement | null): void {
		const l = this.#hLay[`${nm}:${String(pageIdx)}`];
		if (! l) return;	// クリア後・アンマウント後のタイミングは無視してよい
		if (el) el.appendChild(l.ctn);
		else l.ctn.remove();
	}

	dump(nm: string, pageIdx: 0 | 1): string {
		return this.#hLay[`${nm}:${String(pageIdx)}`]?.dump() ?? '';
	}

	// SysBase.stop()/run()からのプロジェクト切替時（ScriptMng.destroy()経由）。
	//	全Layerインスタンスを破棄し、次のプロジェクトへ古いWebGLコンテキスト等を持ち越さない
	destroy(): void {
		for (const l of Object.values(this.#hLay)) l.destroy();
		for (const k of Object.keys(this.#hLay)) delete this.#hLay[k];
		for (const k of Object.keys(this.#hCls)) delete this.#hCls[k];
	}
}
