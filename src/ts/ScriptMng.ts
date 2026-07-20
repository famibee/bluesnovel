/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2024-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import type {SysBase} from '../sn/SysBase';
import type {TArg, T_HTag} from '../sn/Grammar';
import type {T_INIT_FNCS} from '../store/store';
import {CmnLib} from '../sn/CmnLib';
import {SEARCH_PATH_ARG_EXT} from '../sn/ConfigBase';
import {ScriptEngine, type T_ENGINE_ACTION} from './ScriptEngine';

type T_TRACE = (txt: string, lvl?: 'D'|'W'|'F'|'E'|'I'|'ET')=> void;


// 試作用：path.json 等のアセット一式が無くても動作確認できるダミーシナリオ
//	（本実装ではこのフォールバックは撤去する。詳細は docs_handover/ 参照）
const SAMPLE_SN = `[add_lay layer=base class=grp]
[add_lay layer=mes class=txt]
[current layer=mes]
[lay layer=base pic=yun_1184]
あいうえお、これはbluesnovelの試作画面です。[l]
クリックかスペースキーで読み進められます。[p]
[lay layer=base pic=yun_1317]
ページが変わり、背景が差し替わりました。[l]
PageUp/PageDownキーで読み戻り・読み進めができます。[s]
`;


export class ScriptMng {
	readonly	#spnDbg	: HTMLSpanElement;

	constructor(private readonly sys: SysBase) {
		this.#spnDbg = document.createElement('span');
		this.#spnDbg.hidden = true;
		this.#spnDbg.textContent = '';
		this.#spnDbg.style.cssText =
		`	z-index: ${Number.MAX_SAFE_INTEGER};
			position: absolute; left: 0; top: 0;
			color: black;
			background-color: rgba(255, 255, 255, 0.7);`
		document.body.appendChild(this.#spnDbg);

		this.#hTag.trace	= o=> this.#trace(o);	// デバッグ表示へ出力
	}

	// Main.tsx からの初期化
	attachTsx(trgNext: ()=> void, fncs: T_INIT_FNCS, hTag: T_HTag) {
		this.$trgNext = trgNext;
		this.$fncs = fncs;
		this.#hTag = hTag;

		this.#hTag.title = ({text})=> {
			if (! text) throw '[title] textは必須です';

			fncs.addTitle(text);

			return false;
		};
	}
		$trgNext	: ()=> void;
		$fncs		: T_INIT_FNCS;
		#hTag		: T_HTag		= Object.create(null);	// タグ処理辞書


	// シナリオ解析ループ・開始
	//	試作版：ScriptEngine（超簡略パーサ・実行器）に処理を委譲する。
	//	[l][p][s] での状態は Caretaker（Memento.ts）が Stage.tsx 経由で自動記録する。
	#hEngine: {[fn: string]: ScriptEngine} = {};
	#curEngine?: ScriptEngine;

	async load(fn: string) {
		let engine = this.#hEngine[fn];
		if (! engine) {
			const src = await this.#fetchScript(fn);
			engine = this.#hEngine[fn] = new ScriptEngine(fn, src);
		}
		this.#curEngine = engine;

		this.go = ()=> this.#runStep();

		this.$trgNext();	// -> ev_next -> Main.tsx procNext() -> this.go()
	}

	// 現在の実行位置から次の停止点（[l][p][s]、またはスクリプト終端）まで進める
	go() { /* attachTsx/load 完了後、上でthis.goとして差し替えられる */ }

	#runStep() {
		const engine = this.#curEngine;
		if (! engine) return;

		this.$fncs.setWait(null);	// 前回の[l]/[p]待ちマーカーをまずクリア（クリックで削除して次の文字表示へ）

		let aAct: T_ENGINE_ACTION[];
		try {
			aAct = engine.step();
		} catch (e) {
			this.myTrace(`シナリオ解析エラー fn:${engine.fn} ${String(e)}`, 'ET');
			return;
		}
		for (const act of aAct) this.#applyAction(act);

		if (engine.atEnd) this.myTrace(`スクリプト終端です fn:${engine.fn}`, 'I');
	}

	#applyAction(act: T_ENGINE_ACTION) {
		switch (act.t) {
		case 'addLay':
			this.$fncs.addLayer(act.cls === 'grp'
				? {cls: 'grp', nm: act.nm, fn: ''}
				: {cls: 'txt', nm: act.nm, str: ''});
			break;
		case 'chgPic':
			this.$fncs.chgPic({nm: act.nm, fn: act.fn});
			break;
		case 'chgStr':
			this.$fncs.chgStr({nm: act.nm, str: act.str});
			break;
		case 'stop':
			// このタイミングでの表示状態を Caretaker に記録する
			//	（Stage.tsx の再描画で自動的に Memento が生成される）
			this.sys.caretaker.push(act.key);
			// [l]/[p]待ち中マーカー表示（[s]はマーカーなし＝上のsetWait(null)のままにする）
			if (act.kind === 'l' || act.kind === 'p') this.$fncs.setWait({nm: act.nm, kind: act.kind});
			break;
		}
	}

	async #fetchScript(fn: string): Promise<string> {
		try {
			const path = this.sys.cfg.searchPath(fn, SEARCH_PATH_ARG_EXT.SCRIPT);
			const res = await fetch(path);
			if (! res.ok) throw Error(res.statusText);
			return await res.text();
		} catch (e) {
			// 試作：アセット未整備でも表示確認できるようダミーシナリオへ切替
			this.myTrace(`[load] スクリプト読込に失敗、試作サンプルで代替します fn:${fn} ${String(e)}`, 'W');
			return SAMPLE_SN;
		}
	}


	#trace(hArg: TArg) {
		this.myTrace(hArg.text || `(text is ${hArg.text})`, 'I');

		return false;
	}
	readonly	myTrace: T_TRACE = (txt, lvl = 'E')=> {
		let sty = '';
		switch (lvl) {
			case 'D':	sty = 'color:#05A;';	break;
			case 'W':	sty = 'color:#F80;';	break;
			case 'F':	sty = 'color:#B00;';	break;
			case 'ET':
			case 'E':	sty = 'color:#F30;';	break;
			default:	sty = '';
		}

		const mes = `{${lvl}} `+ txt;
		this.#spnDbg.innerHTML += `<span style='${sty}'>${mes}</span><br/>`;
		this.#spnDbg.hidden = false;

		switch (lvl) {
			case 'D':	if (CmnLib.isDarkMode) sty = `color:#49F;`;	break;
			case 'W':
			case 'F':	break;
			case 'ET':
			case 'E':
				this.#hTag.title!({text: txt});

				if (lvl === 'ET') throw mes;
				break;
			default:	sty = '';
		}
		console.info('%c '+ mes, sty);
	}

}
