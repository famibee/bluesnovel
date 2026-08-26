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
import type {Layer, T_RecordPlayBack_lay} from '../sn/Layer';
import type {T_PAGE_BOTH} from '../store/store';

// しおり（T_MARK.hPlgLay）1件分の形。1レイヤ名につきfore/back 2個分のrecord()結果を持つ
//	（本家 LayerMng.record()の戻り値相当）
export type T_RecordPlayBack_plgLay = {
	[nm: string]: {cls: string; fore: T_RecordPlayBack_lay; back: T_RecordPlayBack_lay};
};


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

	// [record_place]／[save]。本家 LayerMng.record()相当。管理下の全プラグインレイヤーの
	//	fore/back分をLayer.record()で読み取って集約する（store外の状態なのでしおりへは別経路で運ぶ）
	record(): T_RecordPlayBack_plgLay {
		const h: T_RecordPlayBack_plgLay = {};
		for (const nm of Object.keys(this.#hCls)) {
			h[nm] = {
				cls		: this.#hCls[nm]!,
				fore	: this.#hLay[`${nm}:0`]!.record(),
				back	: this.#hLay[`${nm}:1`]!.record(),
			};
		}
		return h;
	}

	// [load]／ページ移動の演じ直し。本家 LayerMng.playback()相当。
	//	hに無い（＝しおり側で消えている）プラグインレイヤーは破棄し、hにあるものは無ければadd()して
	//	から書き戻す（store側のaPage丸ごと置換で消える/現れるのと同じ結果にする）
	playback(h: T_RecordPlayBack_plgLay | undefined, aPrm: Promise<void>[]): void {
		const hh = h ?? {};
		for (const nm of Object.keys(this.#hCls)) {
			if (nm in hh) continue;
			this.#hLay[`${nm}:0`]?.destroy();
			this.#hLay[`${nm}:1`]?.destroy();
			delete this.#hLay[`${nm}:0`];
			delete this.#hLay[`${nm}:1`];
			delete this.#hCls[nm];
		}
		for (const nm of Object.keys(hh)) {
			const {cls, fore, back} = hh[nm]!;
			if (! (nm in this.#hCls)) this.add(nm, cls);
			this.#hLay[`${nm}:0`]!.playback(fore, aPrm);
			this.#hLay[`${nm}:1`]!.playback(back, aPrm);
		}
	}

	// [trans]完了時、交換対象のプラグインレイヤーについて新しい裏へ新しい表を写す
	//	（本家 Pages.transPage() の back.copy(fore) 相当）。storeのfinTrans()（store.tsx）は
	//	aPageのT_LAY（位置・スタイル等のメタ情報）を交換するだけで、3Dシーン等の実体（Layer.ctn配下）は
	//	store外のためここまで手が届かない。oldForeIdxは反転前のforeIdx
	//	（呼び出し側がstore側のfinishTrans()/startTrans()を呼ぶ**前**に読んでおくこと）
	finishTrans(aLayNm: string[] | null, oldForeIdx: 0 | 1, aPrm: Promise<void>[]): void {
		const bi = (1 - oldForeIdx) as 0 | 1;	// 新しい表の物理index（store側finTransのbiと同じ）
		for (const nm of Object.keys(this.#hCls)) {
			if (aLayNm && ! aLayNm.includes(nm)) continue;	// 交換対象外はここでは何もしない
			this.#hLay[`${nm}:${String(oldForeIdx)}`]?.copy(this.#hLay[`${nm}:${String(bi)}`]!, aPrm);
		}
	}

	// SysBase.stop()/run()からのプロジェクト切替時（ScriptMng.destroy()経由）。
	//	全Layerインスタンスを破棄し、次のプロジェクトへ古いWebGLコンテキスト等を持ち越さない
	destroy(): void {
		for (const l of Object.values(this.#hLay)) l.destroy();
		for (const k of Object.keys(this.#hLay)) delete this.#hLay[k];
		for (const k of Object.keys(this.#hCls)) delete this.#hCls[k];
	}
}
