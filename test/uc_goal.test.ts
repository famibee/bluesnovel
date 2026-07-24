/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2026-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

// **目標そのものを測るテスト**：本家サンプル（`../tmp_esm_uc/doc/prj/`）の実行経路
//	`script/main.sn` →`[call]` `theme/setting.sn` / `theme/ext_*.sn` / `script/sub.sn` /
//	`frames/_yesno.sn` →`[jump]` `theme/title.sn` を、**エンジンだけで**`[s]`まで走らせる。
//
//	DOMもfetchも要らないのが要点：ScriptMngがDOM側でやること（スクリプトのfetch、
//	HTMLフレームの読込、環境の組み込み変数）だけを最小限まねれば、シナリオ解釈は
//	そのまま通る。画像・音声アセットも要らない（[lay fn=…]は解決をScriptMngへ委ねているため）。
//
//	`../tmp_esm_uc` が無い環境では丸ごとスキップする（このリポジトリの外にある参照用サンプル）。

import {ScriptEngine, type T_ENGINE_ACTION} from '../src/ts/ScriptEngine';
import {Script} from '../src/ts/Script';
import {Grammar} from '../src/sn/Grammar';
import type {T_Config} from '../src/sn/ConfigBase';

import {existsSync, readFileSync} from 'node:fs';
import {expect, it} from 'bun:test';


const DIR = `${import.meta.dir}/../../tmp_esm_uc/doc/prj/`;
const EXISTS = existsSync(`${DIR}path.json`);

type T_Exts = {[ext: string]: string};

// ScriptMngがDOM側で担う部分だけを最小限まねて、[s]に着くまで回す
type T_ADDBTN_ACT = Extract<T_ENGINE_ACTION, {t: 'addBtn'}>;
function runToStop(): {fn: string; stops: number; hCnt: {[t: string]: number}; aBtn: T_ADDBTN_ACT[]} {
	const hPath = JSON.parse(readFileSync(`${DIR}path.json`, 'utf8')) as {[fn: string]: T_Exts};

	// Grammarが[call fn=ext_*]のワイルドカードを展開するのに使う（Config.matchPath相当）
	const cfg = {
		matchPath: (fnptn: string, extptn: string)=> {
			const reg = new RegExp(fnptn);
			const aRet: T_Exts[] = [];
			for (const [fn, h] of Object.entries(hPath)) {
				if (fn.search(reg) === -1) continue;
				for (const ext of Object.keys(h)) {
					if (`|${extptn}|`.includes(`|${ext}|`)) aRet.push({[ext]: fn});
				}
			}
			return aRet;
		},
	} as unknown as T_Config;

	const grm = new Grammar(cfg);
	const hScr: {[fn: string]: Script} = {};
	const getScript = (fn: string)=> {
		if (hScr[fn]) return hScr[fn];

		const p = hPath[fn]?.sn;
		if (! p) throw `スクリプトが見つかりません fn:${fn}`;
		return hScr[fn] = new Script(fn, readFileSync(DIR + p, 'utf8'), grm);
	};

	const se = new ScriptEngine(getScript('main'));
	// ScriptMng#defEnvBuiltins()相当。DOMが無いので固定値でよい
	for (const [nm, v] of Object.entries({
		'const.sn.config.window.width': 1024, 'const.sn.config.window.height': 768,
		'const.sn.config.book.title': 'uc', 'const.sn.config.book.version': '1',
		'const.sn.navigator.language': 'ja-JP',
		'const.sn.screenResolutionX': 1920, 'const.sn.screenResolutionY': 1080,
		'const.sn.isApp': false, 'const.sn.isDbg': false, 'const.sn.isDebugger': false,
		'const.sn.isPackaged': false, 'const.sn.isFirstBoot': false,
		'const.sn.needClick2Play': false,
	})) se.defBuiltin(nm, ()=> v);

	const hCnt: {[t: string]: number} = {};
	const aBtn: T_ADDBTN_ACT[] = [];
	let stops = 0;
	for (let i = 0; i < 4000; ++i) {
		const aAct: T_ENGINE_ACTION[] = se.step();
		for (const a of aAct) {
			hCnt[a.t] = (hCnt[a.t] ?? 0) + 1;
			if (a.t === 'addBtn') aBtn.push(a);
		}

		const last = aAct.at(-1);
		// HTMLフレームはDOM側の担当。読み込めた体にして組み込み変数だけ入れる
		if (last?.t === 'addFrame') {se.setValNochk(`const.sn.frm.${last.id}`, true); continue}
		if (last?.t === 'letFrame') {se.setValNochk(`const.sn.frm.${last.id}.${last.var_name}`, ''); continue}
		if (last?.t === 'loadScript') {se.switchScript(getScript(last.fn), last.label, last.idx); continue}
		if (last?.t === 'stop') {
			++stops;
			if (last.kind === 's') return {fn: se.fn, stops, hCnt, aBtn};
		}
		if (se.atEnd) break;
	}
	throw `[s]に到達しませんでした（停止点 ${String(stops)} 個）`;
}


it.skipIf(! EXISTS)('本家サンプルの main.sn から title.sn の [s] まで走り切る', ()=> {
	const {fn, hCnt} = runToStop();

	expect(fn).toBe('title');	// [jump fn=title]の先で止まった
	// 経路の途中で実際に起きたこと。数が変わるのは構わないが、0になったら何かが壊れている
	expect(hCnt.loadScript).toBeGreaterThan(30);	// [call fn=ext_*]の展開を含むファイル横断
	expect(hCnt.addLay).toBeGreaterThan(5);
	expect(hCnt.addFrame).toBe(1);		// _yesno.snのHTMLフレーム
	expect(hCnt.trans).toBe(1);			// title.snの[trans]
	expect(hCnt.addBtn).toBe(4);		// タイトルのボタン4つ（Start/Load/Album/Config）
});

it.skipIf(! EXISTS)('タイトルのボタン4つが本家どおりの座標・ページで並ぶ', ()=> {
	// [button]の配置属性が実シナリオでも効いていることを確かめる。
	//	theme/title.sn は [clear_lay layer=mes page=back] の後に4つ置く。**page省略なので裏ページ**へ
	//	（本家＝bluesnovelとも既定back）。[trans]で表へ出る流儀。
	const {aBtn} = runToStop();

	expect(aBtn.map(b=> b.sty?.left)).toEqual([250, 350, 550, 650]);
	for (const b of aBtn) {
		expect(b.sty).toMatchObject({top: 360, width: 90, height: 30});
		expect(b.layerNm).toBe('mes');
		expect(b.page).toBe('back');	// 既定back（[trans]前提の裏組み）
	}
	// [button call=true]はStart以外の3つ（Load/Album/Config）
	expect(aBtn.map(b=> b.call)).toEqual([false, true, true, true]);
});
