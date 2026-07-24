/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2024-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import type {SysBase} from '../sn/SysBase';
import type {TArg, T_HTag} from '../sn/Grammar';
import {Grammar} from '../sn/Grammar';
import type {T_INIT_FNCS} from '../store/store';
import {CmnLib} from '../sn/CmnLib';
import {SEARCH_PATH_ARG_EXT} from '../sn/ConfigBase';
import {ScriptEngine, type T_ENGINE_ACTION} from './ScriptEngine';
import {Script} from './Script';

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
	//	エンジンは**1つだけ**持つ。変数・スタック等の実行状態はエンジンが一手に握っており、
	//	ファイル切替はパース結果（Script）の差し替えで行う（複数ファイル対応の要）。
	//	ここ（ScriptMng）はfetchとキャッシュだけを受け持つ
	readonly #hScript: {[fn: string]: Script} = Object.create(null);
	#engine?: ScriptEngine;

	async load(fn: string) {
		const scr = await this.#getScript(fn);
		if (this.#engine) this.#engine.switchScript(scr);
		else this.#engine = new ScriptEngine(scr);

		this.go = ()=> this.#goSafe();

		this.$trgNext();	// -> ev_next -> Main.tsx procNext() -> this.go()
	}

	async #getScript(fn: string): Promise<Script> {
		return this.#hScript[fn] ??= new Script(fn, await this.#fetchScript(fn), this.#getGrm());
	}

	// 字句解析器はプロジェクトで1つだけ作って全スクリプトで共有する。
	//	エスケープ文字（prj.jsonのinit.escape）や[char2macro]/[bracket2macro]の定義は
	//	Grammarインスタンスが抱えるので、ファイルごとに別インスタンスだと設定が行き渡らない。
	//	cfgを渡すので[call fn=…*]/[loadplugin fn=…*]のワイルドカード展開も効く。
	//	sys.cfgはConfig.generate()後にしか読めないため、初回アクセス時に作る
	#grm?: Grammar;
	#getGrm(): Grammar {
		if (this.#grm) return this.#grm;

		const grm = this.#grm = new Grammar(this.sys.cfg);
		grm.setEscape(this.sys.cfg.oCfg.init.escape);
		return grm;
	}

	// 現在の実行位置から次の停止点（[l][p][s]、またはスクリプト終端）まで進める
	go() { /* attachTsx/load 完了後、上でthis.goとして差し替えられる */ }

	// [button]クリック時のJSX側から呼ばれる：指定ラベルへ直接ジャンプしてそのまま進行する。
	//	Main.tsxのnext()（クリックでの読み進め）とは別系統。CaretakerのprevKey/nextKeyや
	//	isReadBackには一切触れないため、ボタンクリックは「読み進め」扱いにはならない（今回の要件）。
	//	call=true指定時はjumpではなくcall（サブルーチンコール）する。
	//	fn指定時は別スクリプトへ飛ぶ。ロードが要るのでここだけ非同期になる
	//	（クリックハンドラ側は投げっぱなしで良いよう、例外はここで握る）
	jumpToLabelAndGo(label: string, call: boolean, fn = '') {
		void this.#jumpToLabelAndGo(label, call, fn).catch(()=> {/* myTraceで表示済み */});
	}
	async #jumpToLabelAndGo(label: string, call: boolean, fn: string) {
		const engine = this.#engine;
		if (! engine) return;

		try {
			if (fn && fn !== engine.fn) {
				const scr = await this.#getScript(fn);
				if (call) engine.callToScript(scr, label);
				else engine.switchScript(scr, label);
			}
			else if (call) engine.callToLabel(label);
			else engine.jumpToLabel(label);
		} catch (e) {
			this.myTrace(`[button] ジャンプ先エラー fn:${fn || engine.fn} ${String(e)}`, 'ET');
			return;
		}
		this.#goSafe();
	}

	// #runStep()は非同期になったので、投げっぱなしにせずここで握る。
	//	myTrace(…, 'ET')は表示後にthrowする仕様なので、そのままだと未処理のPromise拒否になる
	//	（同期だった頃はDOMイベントハンドラまで抜けていた）。表示は済んでいるので握って良い
	#goSafe() {this.#runStep().catch(()=> {/* myTraceで表示済み */})}

	// 停止点（[l][p][s]）かスクリプト終端まで進める。
	//	途中で'loadScript'（別スクリプトへの移動要求）が返ったら、fetchしてから続きを回す。
	//	engine.step()自体は同期のまま（DOM/fetch非依存でユニットテストできる設計を保つ）
	#busy		= false;
	#cntResv	= 0;
	async #runStep() {
		const engine = this.#engine;
		if (! engine) return;
		// スクリプトのロード待ち中に来た進行要求。多重に走らせるわけにはいかないが、
		//	捨てるとクリックが無かったことになるので、回数を数えておいて後で消化する
		//	（ロードを挟まない場合はクリック1回＝1停止点ぶん進むので、それに合わせる）
		if (this.#busy) {++this.#cntResv; return}

		this.#busy = true;
		try {
			for (;;) {
				this.$fncs.setWait(null);	// 前回の[l]/[p]待ちマーカーをまずクリア（クリックで削除して次の文字表示へ）

				let aAct: T_ENGINE_ACTION[];
				try {
					aAct = engine.step();
				} catch (e) {
					this.myTrace(`シナリオ解析エラー fn:${engine.fn} ${String(e)}`, 'ET');
					return;
				}
				for (const act of aAct) this.#applyAction(act);

				// 'loadScript'は必ず最後の要素（step()がそこで打ち切って返すため）
				const last = aAct.at(-1);
				if (last?.t !== 'loadScript') {
					if (engine.atEnd) this.myTrace(`スクリプト終端です fn:${engine.fn}`, 'I');
					return;
				}

				try {
					engine.switchScript(await this.#getScript(last.fn), last.label, last.idx);
				} catch (e) {
					this.myTrace(`[jump系] スクリプト切替エラー fn:${last.fn} ${String(e)}`, 'ET');
					return;
				}
			}
		}
		finally {
			this.#busy = false;
			if (this.#cntResv > 0) {--this.#cntResv; this.#goSafe()}
		}
	}

	#applyAction(act: T_ENGINE_ACTION) {
		switch (act.t) {
		case 'addLay':
			this.$fncs.addLayer(act.cls === 'grp'
				? {cls: 'grp', nm: act.nm, fn: '', aFace: []}	// aFaceは[lay face=...]で後から入る（初期は差分合成なし）
				: {cls: 'txt', nm: act.nm, str: '', aBtn: [], b_alpha: 1});	// 文字レイヤはUIコンテナとしてaBtnを初期化。b_alphaは[lay b_alpha=...]未指定時は不透明（1）が既定
			break;
		case 'chgPic':
			this.$fncs.chgPic({nm: act.nm, fn: act.fn, aFace: act.aFace});
			break;
		case 'chgBAlpha':
			this.$fncs.chgBAlpha({nm: act.nm, b_alpha: act.b_alpha});
			break;
		case 'chgStr':
			this.$fncs.chgStr({nm: act.nm, str: act.str});
			break;
		case 'addBtn':
			// 文字レイヤ（UIコンテナ）のaBtnに追加する（独立レイヤにはしない）
			this.$fncs.addBtn({layerNm: act.layerNm, nm: act.nm, text: act.text, label: act.label, ...(act.call !== undefined ? {call: act.call} : {}), ...(act.fn !== undefined ? {fn: act.fn} : {})});
			break;
		case 'trace':
			// 実処理は既存の#trace()（myTrace経由）へそのまま委譲
			this.#trace({text: act.text});
			break;
		case 'loadScript':
			// 実処理は#runStep()側（fetch→switchScript）。表示への影響は無い
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
