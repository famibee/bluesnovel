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
import {H_TSY_DEF, type T_TSY_PRP} from './Tsy';
import type {T_LAY_STY_ARG} from '../store/store';

import gsap from 'gsap';

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

	// [toggle_full_screen key=…]で予約したキー。押されたらその場で全画面を切り替える。
	//	[event]の予約（ラベルへ飛ぶ）とは別枠なので、Main.tsxはこちらを先に問い合わせる
	readonly #hFullScrKey = new Set<string>();
	fireFullScrKey(key: string): boolean {
		if (! this.#hFullScrKey.has(key)) return false;

		this.$fncs.toggleFullScr();
		return true;
	}
	// 実際の全画面状態をエンジンへ書き戻す（組み込み変数 const.sn.displayState）。
	//	Escでの解除などブラウザ都合の変化もあるので、Stage.tsxが実状態を見て呼ぶ
	setFullScr(b: boolean) {this.#engine?.setFullScr(b)}

	// [event]で予約したキー・クリックが押された時にMain.tsxから呼ばれる。
	//	戻り値true＝予約イベントとして処理した（＝呼び出し側は通常の読み進めを行わない）。
	//	移動そのものは[button]クリックと全く同じ経路を通す
	fireEvent(key: string): boolean {
		const engine = this.#engine;
		if (! engine) return false;

		const ev = engine.beginEvent(key);
		if (! ev) return false;

		this.jumpToLabelAndGo(ev.label, ev.call, ev.fn);
		return true;
	}

	async #jumpToLabelAndGo(label: string, call: boolean, fn: string) {
		const engine = this.#engine;
		if (! engine) return;

		this.#stopped = false;	// [event]/[button]の予約は[s]の停止を越えて動かせる（本家も予約イベントだけは受ける）
		try {
			// label省略（＝そのファイルの先頭へ）の場合は、同一ファイルでもロード経由で切り替える
			//	（jumpToLabel('')はラベル未定義でthrowになるため）
			if (fn && (fn !== engine.fn || ! label)) {
				const scr = await this.#getScript(fn);
				if (call) engine.callToScript(scr, label);
				else engine.switchScript(scr, label);
			}
			else if (call) engine.callToLabel(label);
			else engine.jumpToLabel(label);
		} catch (e) {
			this.myTrace(`[button]/[event] ジャンプ先エラー fn:${fn || engine.fn} ${String(e)}`, 'ET');
			return;
		}
		this.#goSafe();
	}

	// #runStep()は非同期になったので、投げっぱなしにせずここで握る。
	//	myTrace(…, 'ET')は表示後にthrowする仕様なので、そのままだと未処理のPromise拒否になる
	//	（同期だった頃はDOMイベントハンドラまで抜けていた）。表示は済んでいるので握って良い
	#goSafe() {
		// [s]で停止中は、クリック・キーでは進まない（進めるのは[event]/[button]の予約だけ）。
		//	本家 ReadingState_wait4Tag も、タグ名が's'のときだけonUserActを付けずに待つ。
		//	[waitclick]は同じ停止でもクリックで進む（＝ここを通らない）
		if (this.#stopped) return;

		// [wt]で[trans]の演出待ち中、または[wait]のウェイト中は、
		//	読み進め要求を「今すぐ待ちを打ち切って続行」に読み替える。
		//	canskip=falseなら何も起きない（＝クリックでは飛ばせない）
		if (this.#transWaiting) {
			if (this.#transWaiting.canskip) this.#finishTrans();
			return;
		}
		if (this.#waiting) {
			if (this.#waiting.canskip) this.#endWait();
			return;
		}
		if (this.#tsyWaiting) {
			if (this.#tsyWaiting.canskip) this.#endTsy(this.#tsyWaiting.tw_nm);
			return;
		}
		this.#runStep().catch(()=> {/* myTraceで表示済み */});
	}
	#stopped = false;	// [s]で停止中か

	// オート読み・既読スキップの自動進行タイマー。停止点でresume指示が来たら仕込み、
	//	次のgo()を自分で呼ぶ。手動操作（Main.tsx）や[s]到達で止める
	#resumeTimer: ReturnType<typeof setTimeout> | undefined;
	#scheduleResume(mode: 'auto' | 'skip', msec: number) {
		clearTimeout(this.#resumeTimer);
		// スキップ中は文字送り演出を省く合図をストアへ立てておく（TxtLayerが瞬時表示にする）
		this.$fncs.setSkipping(mode === 'skip');
		this.#resumeTimer = setTimeout(()=> {
			if (mode === 'skip') this.$fncs.requestSkip();	// 進行前に現在の演出を瞬時完了させる
			this.#goSafe();
		}, msec);
	}
	// オート読み・既読スキップの中断（本家 ReadingState.cancelAutoSkip 相当）。
	//	仕込んだタイマーを解除し、エンジン側の3フラグも倒す。手動操作から呼ばれる
	cancelAuto() {
		clearTimeout(this.#resumeTimer);
		this.#resumeTimer = undefined;
		this.$fncs?.setSkipping(false);
		this.#engine?.cancelAutoSkip();
	}

	// ===== [trans]の演出と、その終了待ち（[wt]） =====
	//	**演出の終了を宣言するのはここ**（時間切れ／[wt]中のクリック）。
	//	Stage側のGSAPは見た目を動かすだけにしてあり、その完了コールバックに表裏の交換をやらせない。
	//	そうしないと「交換」と「シナリオの再開」の前後が保証されず、
	//	交換前のページへ次の文が書かれてしまう（＝画面が空のまま進む）
	#transTimer		: ReturnType<typeof setTimeout> | undefined;
	#transRunning	= false;	// 演出中か（time=0は即交換済みなのでfalseのまま）
	#transWaiting	: {canskip: boolean} | undefined;	// [wt]で待っている最中か

	// [trans]適用時：演出時間ぶんのタイマーを仕込む。[wt]の有無に関わらず必ず終わらせる
	#beginTrans(time: number) {
		clearTimeout(this.#transTimer);
		this.#transRunning = time > 0;
		this.#transTimer = this.#transRunning
			? setTimeout(()=> this.#finishTrans(), time)
			: undefined;
	}
	// 演出終了：表裏を交換し、[wt]で待っていたなら続きを回す。
	//	演出が途中でも必ず終了状態へ送るので、中途半端な見た目のまま止まることはない
	#finishTrans() {
		clearTimeout(this.#transTimer);
		this.#transTimer = undefined;
		this.#transRunning = false;
		this.$fncs.finishTrans();	// zustandのsetは同期＝この行の後は書き込み先が新しい表ページになる

		if (! this.#transWaiting) return;
		this.#transWaiting = undefined;
		this.#goSafe();
	}
	// [wt]：演出中なら待ちに入る。待つものが無ければそのまま続きへ
	//	（本家 CmnTween.wt() も、動いているトゥイーンが無ければ待たずに済ませる）
	#waitTrans(canskip: boolean) {
		if (this.#transRunning) {this.#transWaiting = {canskip}; return}

		// ここは#runStep()の中なので、同期で続きを回すと#busyが下りる前に再入してしまう
		setTimeout(()=> this.#goSafe(), 0);
	}

	// ===== [wait time=…]のウェイト =====
	//	[wt]と同じ形（時間切れ、またはcanskipならクリックで打ち切って続行）。
	//	違いは「終わったときに片付けるものが無い」ことだけ
	#waiting: {timer: ReturnType<typeof setTimeout>; canskip: boolean} | undefined;

	#beginWait(msec: number, canskip: boolean) {
		this.#waiting = {canskip, timer: setTimeout(()=> this.#endWait(), Math.max(0, msec))};
	}
	#endWait() {
		if (! this.#waiting) return;
		clearTimeout(this.#waiting.timer);
		this.#waiting = undefined;
		this.#goSafe();
	}

	// ===== トゥイーンアニメ（[tsy]/[wait_tsy]/[stop_tsy]/[pause_tsy]/[resume_tsy]） =====
	//	本家（CmnTween.ts）は@tweenjs/tween.jsでpixiのDisplayObjectを直接動かすが、
	//	こちらはGSAPで**ストアのレイヤ属性を**動かす。つまり画面の現在値は常にストアが持つ。
	//	見た目だけをDOMへ書く手もある（[trans]はそうしている）が、それだとMemento（読み戻り）や
	//	[trans]のレイヤ複製が演出前の古い値を拾ってしまうため、こちらはストア経由にした。
	//	副作用として本家のarrive属性（終了時に目標値を確実に入れる）は常時ONと同じ挙動になる。
	//	トゥイーン名（tw_nm）はname省略時レイヤ名（本家 CmnTween.#tw_nm()）
	readonly #hTw: {[tw_nm: string]: {tw: gsap.core.Tween; end: ()=> void}} = Object.create(null);
	#tsyWaiting	: {tw_nm: string; canskip: boolean} | undefined;	// [wait_tsy]で待っている最中か

	#beginTsy(act: Extract<T_ENGINE_ACTION, {t: 'tsy'}>) {
		// 同名のトゥイーンが動いていたら畳んでから始める。本家は#hTwInfを上書きするだけで
		//	古いトゥイーンはGroupに残ったまま動き続けてしまうので、そこだけ変えている
		this.#hTw[act.tw_nm]?.tw.kill();
		// eslint-disable-next-line @typescript-eslint/no-dynamic-delete
		delete this.#hTw[act.tw_nm];

		const cur = this.$fncs.getLaySty(act.nm, act.page);
		// GSAPに渡すのは素のオブジェクト。fromが動かされ、onUpdateでストアへ書き戻す。
		//	相対指定（left='=100'）と、未指定属性の開始値（＝各レイヤのCSS既定＝H_TSY_DEF）を
		//	ここで解決する。エンジン側は現在値を知らないので相対のまま渡してくる
		const aPrp = Object.keys(act.hTo) as T_TSY_PRP[];
		const from: {[k: string]: number} = {};
		const to	: {[k: string]: number} = {};
		for (const k of aPrp) {
			const t = act.hTo[k]!;
			const now = cur[k] ?? H_TSY_DEF[k];
			from[k] = now;
			to[k] = t.rel ? now + t.v : t.v;
		}
		// **fromをそのまま（スプレッドで）ストアへ渡してはいけない**：GSAPは対象オブジェクトへ
		//	自分用のキャッシュ（_gsap。中からtargetを指し返す）を生やすので、レイヤが循環参照になり、
		//	structuredClone（addLayer/[trans]）もJSON化（Memento）も落ちる。
		//	動かす属性名は分かっているので、その分だけ拾って新しいオブジェクトにする
		const apply = ()=> {
			const sty: T_LAY_STY_ARG = {};
			for (const k of aPrp) Object.assign(sty, {[k]: from[k]});
			this.$fncs.chgLay({nm: act.nm, page: act.page, sty});
		};
		// 終了状態の確定。時間切れでも[stop_tsy]でも[wait_tsy]中のクリックでも必ずここを通すので、
		//	中途半端な見た目のまま止まることはない（本家 stop().end() と同じ考え方）
		const end = ()=> {Object.assign(from, to); apply()};

		// time=0（既読スキップ中もここ）は演出せず即座に終了状態へ
		if (act.msec <= 0 && act.delay <= 0) {end(); this.#onTsyEnd(act.tw_nm); return}

		this.#hTw[act.tw_nm] = {end, tw: gsap.to(from, {
			...to,
			duration	: act.msec / 1000,	// GSAPは秒、シナリオはミリ秒
			delay		: act.delay / 1000,
			ease		: act.ease,
			repeat		: act.repeat,
			yoyo		: act.yoyo,
			onUpdate	: apply,
			onComplete	: ()=> {end(); this.#onTsyEnd(act.tw_nm)},
		})};
	}

	// トゥイーン1件の後片付け。[wait_tsy]で待っていたなら続きを回す
	#onTsyEnd(tw_nm: string) {
		// eslint-disable-next-line @typescript-eslint/no-dynamic-delete
		delete this.#hTw[tw_nm];
		if (this.#tsyWaiting?.tw_nm !== tw_nm) return;

		this.#tsyWaiting = undefined;
		// #runStep()の中から呼ばれる場合がある（[tsy time=0]直後の[wait_tsy]等）ので、
		//	#busyが下りるのを待ってから回す
		setTimeout(()=> this.#goSafe(), 0);
	}
	// 終了状態へ送って止める（[stop_tsy]、[wait_tsy]中のクリック）
	#endTsy(tw_nm: string) {
		const ti = this.#hTw[tw_nm];
		if (ti) {ti.tw.kill(); ti.end()}
		this.#onTsyEnd(tw_nm);
	}
	// [wait_tsy]：動いているトゥイーンが無ければ待たずに続きへ（本家 wait_tsy() も false を返す）
	#waitTsy(tw_nm: string, canskip: boolean) {
		if (! this.#hTw[tw_nm]) {setTimeout(()=> this.#goSafe(), 0); return}

		this.#tsyWaiting = {tw_nm, canskip};
	}

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

				// 'loadScript'/'waitTrans'/'wait'は必ず最後の要素（step()がそこで打ち切って返すため）
				const last = aAct.at(-1);
				if (last?.t === 'waitTrans') {this.#waitTrans(last.canskip); return}
				if (last?.t === 'wait') {this.#beginWait(last.msec, last.canskip); return}
				if (last?.t === 'waitTsy') {this.#waitTsy(last.tw_nm, last.canskip); return}
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
			// [lay]で変えられる見た目（visible/alpha/left/top/rotation/scale_*）は初期値を持たせない。
			//	未指定＝各レイヤのCSS既定に従う（Stage.tsx T_LAY_STY のコメント参照）
			this.$fncs.addLayer(act.cls === 'grp'
				? {cls: 'grp', nm: act.nm, fn: '', aFace: []}	// aFaceは[lay face=...]で後から入る（初期は差分合成なし）
				: {cls: 'txt', nm: act.nm, str: '', aBtn: [], b_alpha: 1, enabled: true});	// 文字レイヤはUIコンテナとしてaBtnを初期化。b_alphaは[lay b_alpha=...]未指定時は不透明（1）が既定
			break;
		case 'chgPic':
			this.$fncs.chgPic({nm: act.nm, page: act.page, fn: act.fn, aFace: act.aFace});
			break;
		case 'chgBAlpha':
			this.$fncs.chgBAlpha({nm: act.nm, page: act.page, b_alpha: act.b_alpha});
			break;
		case 'trans':
			// time=0ならstartTrans()の中で即交換される（演出無し＝待つものも残らない）
			this.$fncs.startTrans({aLayNm: act.aLayNm, time: act.time});
			this.#beginTrans(act.time);
			break;
		case 'waitTrans':
			// 実処理は#runStep()側（#waitTrans()）。表示への影響は無い
			break;
		case 'chgStr':
			this.$fncs.chgStr({nm: act.nm, page: act.page, str: act.str});
			break;
		case 'addBtn':
			// 文字レイヤ（UIコンテナ）のaBtnに追加する（独立レイヤにはしない）
			this.$fncs.addBtn({layerNm: act.layerNm, page: act.page, nm: act.nm, text: act.text, label: act.label, ...(act.call !== undefined ? {call: act.call} : {}), ...(act.fn !== undefined ? {fn: act.fn} : {})});
			break;
		case 'chgLay':
			this.$fncs.chgLay({nm: act.nm, page: act.page, sty: act.sty});
			break;
		case 'clearLay':
			this.$fncs.clearLay({nm: act.nm, page: act.page});
			break;
		case 'enableEvent':
			this.$fncs.enableEvent({nm: act.nm, enabled: act.enabled});
			break;
		case 'wait':
			// 実処理は#runStep()側（#beginWait()）。表示への影響は無い
			break;
		case 'tsy':
			this.#beginTsy(act);
			break;
		case 'waitTsy':
			// 実処理は#runStep()側（#waitTsy()）。表示への影響は無い
			break;
		case 'stopTsy':
			this.#endTsy(act.tw_nm);
			break;
		case 'pauseTsy':
			this.#hTw[act.tw_nm]?.tw.paused(act.paused);
			break;
		case 'title':
			this.$fncs.addTitle(act.text);
			break;
		case 'toggleFullScr':
			this.$fncs.toggleFullScr();
			break;
		case 'fullScrKey':
			// [toggle_full_screen key=…]：以降そのキーで全画面を切り替えられるようにする常駐予約。
			//	本家もdocumentへリスナを足しっぱなしにする（消す手段は無い）
			this.#hFullScrKey.add(act.key);
			break;
		case 'dumpLay': {
			// [dump_lay]：本家（LayerMng.ts:1068）と同じく表裏まとめてデバッグ表示へ出す
			const {fore, back} = this.$fncs.getPages();
			const pick = (a: typeof fore)=> act.aLayNm ? a.filter(l=> act.aLayNm!.includes(l.nm)) : a;
			this.myTrace(`[dump_lay] ${JSON.stringify({fore: pick(fore), back: pick(back)})}`, 'D');
			break;
		}
		case 'clearPageLog':
			// [page clear=true]：読み戻り履歴の消去。以降の停止点から積み直しになる
			this.sys.caretaker.clear();
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
			// [l]/[p]待ち中マーカー表示（[s]/[waitclick]はマーカーなし＝上のsetWait(null)のままにする）
			if (act.kind === 'l' || act.kind === 'p') this.$fncs.setWait({nm: act.nm, kind: act.kind});
			// [s]はここで完全停止。以降クリック・キーでは進まず、[event]/[button]の予約だけが動かせる
			//	（[waitclick]は同じ「マーカー無しの停止」だがクリックで進む）
			this.#stopped = act.kind === 's';
			// オート読み・既読スキップ指示があれば、クリックを待たず自分で次へ進むタイマーを仕込む。
			//	無ければ手動待ち＝スキップ表示も解除する（この停止点でスキップが尽きた場合）
			if (act.resume) this.#scheduleResume(act.resume.mode, act.resume.msec);
			else this.$fncs.setSkipping(false);
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
