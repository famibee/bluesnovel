/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2024-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import type {SysBase} from '../sn/SysBase';
import type {TArg, T_HTag} from '../sn/Grammar';
import {Grammar} from '../sn/Grammar';
import type {T_INIT_FNCS} from '../store/store';
import {CmnLib, getDateStr} from '../sn/CmnLib';
import {PROTOCOL_USERDATA} from '../sn/Config';
import {SEARCH_PATH_ARG_EXT} from '../sn/ConfigBase';
import {ScriptEngine, type T_ENGINE_ACTION, type T_PAGE, type T_PAGE_BOTH} from './ScriptEngine';
import {Script} from './Script';
import {easeFn, H_TSY_DEF, type T_TSY_PRP} from './Tsy';
import {FrameMng, type T_FRM_STY} from './FrameMng';
import {PlgLayMng} from './PlgLayMng';
import {getPlgTag} from '../sn/PlgTag';
import {focusMng} from './FocusMng';
import {dlFn, mimeOfFn, rgbaOf, savePic, snapshotToPng} from './Snapshot';
import {SaveMng, type T_MARK} from './SaveMng';
import {INI_STYPAGE, PageLog, type T_PAGE_TO} from './PageLog';
import {plainOf, setEscape, splitCh} from './Txt';
import {addFontFaces} from './Font';
import {DEF_BTN_FONT, type T_LAY_STY_ARG} from '../store/store';
import {isGrpLay, isTxtLay} from '../components/Lay';
import {SndMng} from './SndMng';
import {MAX_END_MS} from './SndBuf';
import {decryptPicUrl} from './Crypto';
import {getNatSize} from './Sprite';
import {Tw} from './Tw';

type T_TRACE = (txt: string, lvl?: 'D'|'W'|'F'|'E'|'I'|'ET')=> void;

// 文字レイヤの[lay style="width: …px; height: …px;"]からpx数値を拾う
//	（本家 TxtStage.ts:259-260 の `parseFloat(s.width)` 相当。CSSStyleDeclarationは持ち出さず
//	正規表現で軽量に済ませる。%等px以外の単位は対象外＝undefinedのまま）
function styNum(style: string | undefined, prop: 'width' | 'height'): number | undefined {
	const m = style?.match(new RegExp(`(?:^|;)\\s*${prop}\\s*:\\s*([\\d.]+)px`, 'i'));
	return m ? Number(m[1]) : undefined;
}


export class ScriptMng {
	readonly	#spnDbg	: HTMLSpanElement;

	constructor(private readonly sys: SysBase) {
		this.#saveMng = new SaveMng(sys, '');	// sys（parameter property）を参照するのでフィールド初期化子には書けない
		this.#frmMng = new FrameMng((fn, ext)=> sys.cfg.searchPath(fn, ext), (u, init)=> sys.fetch(u, init),
			(ext, tx)=> sys.dec(ext, tx), ab=> sys.decAB(ab), sys.crypto);
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
		this.#hTag.log		= o=> this.#log(o, this.#engine?.fn ?? '', this.#engine?.lineNum ?? NaN);	// ログ出力
	}

	// SysBase.stop()/run()から、プロジェクト切替・エンジン全停止のときに呼ばれる（本家 main.destroy()に相当。
	//	本家は破棄するオブジェクトを画面ごと一撃で消せるが、こちらはScriptMngが直接タイマー・トゥイーン・
	//	音声・DOM要素を抱えているので、ここでまとめて畳まないと次のプロジェクトへ古いコールバックが
	//	紛れ込む（#finishTrans等は$fncs＝旧Main.tsxのstoreセッターを直接叩くため、
	//	unmount後に発火するとリセット直後のストアを壊しうる）
	destroy() {
		this.cancelAuto();
		clearTimeout(this.#transTimer);
		clearTimeout(this.#quakeTimer);
		clearTimeout(this.#waiting?.timer);
		for (const {tw} of Object.values(this.#hTw)) tw.kill();
		for (const {tw} of Object.values(this.#hSndTw)) tw.kill();
		this.#sndMng.stopAll();
		this.#spnDbg.remove();
		this.#plgLayMng.destroy();	// プロジェクト切替で古いWebGLコンテキスト等を持ち越さない
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
	//	[l][p][s] での状態は PageLog（PageLog.ts）が記録する（読み戻り用）。
	//	エンジンは**1つだけ**持つ。変数・スタック等の実行状態はエンジンが一手に握っており、
	//	ファイル切替はパース結果（Script）の差し替えで行う（複数ファイル対応の要）。
	//	ここ（ScriptMng）はfetchとキャッシュだけを受け持つ
	readonly #hScript: {[fn: string]: Script} = Object.create(null);
	#engine?: ScriptEngine;

	// 非同期の投げっぱなし呼び出しを握る共通ハンドラ。
	//	myTrace(…, 'ET')が投げた物だけは表示済みなので黙って捨て、それ以外は必ず表示する。
	//	**握り潰すとシナリオが無言で止まる**（#applyAction()の例外はstep()を包むtryの外側にあり、
	//	実際にストアのボタン名重複エラーをここで見失っていた）
	readonly #catchErr = (e: unknown)=> {
		if (e === this.#tracedErr) return;	// myTraceで表示済み
		this.myTrace(`内部エラー ${e instanceof Error ? e.stack ?? e.message : String(e)}`, 'E');
	}
	#tracedErr: unknown;	// 直近にmyTrace(…, 'ET')が投げた値（上記の判別用）

	// SysBase.loaded()から投げっぱなしで呼ばれるので、ここで握ってデバッグ表示へ出す
	//	（握らないと未処理のPromise拒否になり、何が起きたか分からないまま画面が空になる）
	load(fn: string) {void this.#load(fn).catch(this.#catchErr)}
	async #load(fn: string) {
		const scr = await this.#getScript(fn);
		if (this.#engine) this.#engine.switchScript(scr);
		else {
			const engine = this.#engine = new ScriptEngine(scr);
			this.#defEnvBuiltins(engine);
			// 音量スライダ（設定画面）等、[volume]タグを経由しない直接代入にも即座に反応させる
			//	（本家 SoundMng.ts:58 setNoticeChgVolume() 相当）
			engine.defSetTrigger('sys:sn.sound.global_volume', v=> {
				this.#sndMng.setGlobalVol(Number(v));
				this.#applyMovieVolume();	// <video>はWebAudioのGainNodeを通らないので自前で追随させる
			});
			// buf別の基準音量（例：&sys:const.sn.sound.VOICE.volume=…）。実効音量はsave:の目標音量
			//	（[playse]系が書く）との掛け算なので、[volume]タグと同じ計算をここでも行う
			engine.defSetTriggerSoundVol((buf, v)=> {
				const savevol = Number(engine.getVal(`save:const.sn.sound.${buf}.volume`) ?? 1);
				this.#sndMng.setVol(buf, savevol * Number(v));
			});
			engine.defSetTrigger('sys:sn.sound.movie_volume', ()=> this.#applyMovieVolume());
			// ユーザー別ファイル差替タグ（本家 Variable.ts:693-697）。[let]から直接反映
			//	（searchPath()側の参照は sys.cfg.userFnTail → ConfigBase.ts:219）
			engine.defSetTrigger('save:sn.userFnTail', v=> {
				const val = String(v);
				if (val.includes('@')) throw 'この変数では文字「@」は禁止です';
				this.sys.cfg.userFnTail = val;
			});
			await this.#loadSaveData(engine);
			// プロジェクト同梱フォントを`@font-face`で使えるようにする（本家 TxtLayer.ts:97）。
			//	シナリオ側に読み込みタグは無く、path.jsonにあるフォントは全部登録される
			addFontFaces(this.sys.cfg);
		}

		this.go = ()=> this.#goSafe();

		this.$trgNext();	// -> ev_next -> Main.tsx procNext() -> this.go()
	}

	// 本家の組み込み変数のうち、**エンジンが知りようのないもの**＝prj.jsonの設定と
	//	ブラウザの情報（本家 SysBase.init() の val.defTmp(…) 群）。
	//	エンジンをDOM非依存に保ったまま値を渡すため、ここから登録する。
	//	レイヤの状態（const.sn.lay.*）はストアが要るので未対応
	#defEnvBuiltins(engine: ScriptEngine) {
		const {oCfg} = this.sys.cfg;
		const h: {[name: string]: ()=> string | number | boolean} = {
			'const.sn.config.window.width'	: ()=> CmnLib.stageW,
			'const.sn.config.window.height'	: ()=> CmnLib.stageH,
			'const.sn.config.book.title'	: ()=> oCfg.book.title,
			'const.sn.config.book.version'	: ()=> oCfg.book.version,
			// 本文履歴の上限ページ数。エンジン側のLogが遅延で読む
			//	（本家の`const.sn.config.（略）`はprj.jsonの中身をそのまま返す仕様なので、
			//	この名前で引けるのは本家と同じ）
			'const.sn.config.log.max_len'	: ()=> oCfg.log.max_len,
			'const.sn.navigator.language'	: ()=> globalThis.navigator.language,
			'const.sn.screenResolutionX'	: ()=> globalThis.screen.width,
			'const.sn.screenResolutionY'	: ()=> globalThis.screen.height,
			// ブラウザ版では常にfalse。Electron版（dist_app）を整えるときに繋ぐ
			'const.sn.isApp'		: ()=> false,
			'const.sn.isDbg'		: ()=> false,
			'const.sn.isDebugger'	: ()=> false,
			'const.sn.isPackaged'	: ()=> false,
			// 本家（SysWeb.ts:90）と同じく「sys:の保存データが空だったか」で決める。
			//	テンプレの theme/setting.sn は [if exp=const.sn.isFirstBoot] の中で
			//	sys:TextLayer.Back.Alpha などの初期値を入れるので、ここが正しくないと設定画面が狂う
			'const.sn.isFirstBoot'	: ()=> this.#isFirstBoot,
			// ブラウザは音を鳴らす前にユーザー操作を要求する（AudioContextがsuspended状態）
			'const.sn.needClick2Play'	: ()=> this.#sndMng.needClick2Play(),
			// 実行環境がどの拡張子を再生できるか（本家 Howler.codecs() 相当。JSON文字列）
			'const.sn.sound.codecs'	: ()=> this.#sndMng.codecs(),
			// しおり一覧（本家 Variable.ts:59 defTmp）。ロード画面（テンプレの frames/_archive）が
			//	[set_frame … text=&const.sn.bookmark.json] で読む
			'const.sn.bookmark.json'	: ()=> this.#saveMng.bookmarkJson(),
			// OSのダークモード（本家 EventMng.ts:222 の matchMedia 監視）。
			//	遅延評価なので、切り替わっても次の参照で新しい値になる＝監視リスナは要らない
			'const.sn.isDarkMode'	: ()=> globalThis.matchMedia('(prefers-color-scheme: dark)').matches,
			// 実行環境（本家は platform パッケージの説明文字列。こちらはUA文字列で代用）
			'const.sn.platform'		: ()=> globalThis.navigator.userAgent,
			// 読み戻り中か（本家 ReadingState_page が tmp:へ立てる）。テンプレの*escapeが
			//	[if exp=const.sn.isPaging]で「移動中なら[page to=…]、そうでなければメニュー」を分ける
			'const.sn.isPaging'		: ()=> this.#pageLog.isPaging,
			// ページログ（本家 sys:const.sn.aPageLog）
			'const.sn.aPageLog'		: ()=> this.#pageLog.json(),
		};
		for (const [nm, fnc] of Object.entries(h)) engine.defBuiltin(nm, fnc);

		// レイヤの状態（本家 const.sn.lay.*）。ストアの表裏ページから毎回**レイヤ木のJSON**を作る。
		//	VarStore.get()のJSON潜り込みが組み込み変数にも効くので、`const.sn.lay.0`（存在判定・truthy）も
		//	`const.sn.lay[N].fore.visible`（詳細）も同じ木を辿って解決できる。
		//	・存在判定：`const.sn.lay.<名前>`はオブジェクト（＝truthy）を返し、未定義レイヤはundefined（falsy）。
		//	  `[add_lay layer=0 cond=!const.sn.lay.0]`の重複防止や`*max_lay_lp`が効く。
		//	・詳細：`const.sn.lay[N].<fore|back>.visible/.alpha/.x/.y/.width`。立ち絵[fg2]のGCが使う。
		//	  visible/alpha/x/y は T_LAY_STY の実値（本家の座標名は x/y。left/top の別名で両方返す）。
		//	  **width/heightは[lay width=/height=]で明示していればその値**。未指定時：
		//	  画像レイヤ（grp）は`Sprite.ts`のsrcキー自然サイズキャッシュ（本家GrpLayer.ts:88-108相当。
		//	  GrpLayer.tsxのimg onLoad/video onLoadedMetadata/シートロードで書く。ロード前は0＝本家と同じ）、
		//	  文字レイヤ（txt）は[lay style="width:/height:"]の明示値（本家TxtStage.ts:259-260相当。
		//	  styNum参照）、それも無ければ本家の既定（stageW/stageH）に倣う。bluesnovelの実際のCSSは
		//	  width/heightを指定せずright:0/bottom:0（TxtLayer.tsx）で自動算出しており実測しないと
		//	  求まらないため、ここはその近似としてstageW/stageHをそのまま採用する
		engine.defBuiltin('const.sn.lay', ()=> {
			const {fore, back} = this.$fncs.getPages();
			const attrs = (l: (typeof fore)[number] | undefined)=> {
				if (! l) return undefined;
				const x = l.left ?? 0, y = l.top ?? 0;
				// 実寸（width/height未指定時）の既定はレイヤ種別ごとに違う：
				//	画像（grp）はSprite.tsの自然サイズキャッシュ、文字（txt）は[lay style=]の明示値。
				//	プラグインレイヤーは実寸をエンジンが知らない（DOM側 PlgLayMng が持つ）ので0を返す
				//	（本家GrpLayerの未ロード時と同じ扱い）
				const wh = isGrpLay(l) ? (()=> {const n = getNatSize(l.src); return {w: n?.w ?? 0, h: n?.h ?? 0}})()
					: isTxtLay(l) ? {w: styNum(l.style, 'width') ?? CmnLib.stageW, h: styNum(l.style, 'height') ?? CmnLib.stageH}
					: {w: 0, h: 0};
				return {
					visible	: l.visible !== false,	// 未指定は表示（本家もdefault visible）
					alpha	: l.alpha ?? 1,
					x, y, left: x, top: y,	// 本家は x/y。left/top の別名としても引けるように両方持たせる
					width	: l.width ?? wh.w,
					height	: l.height ?? wh.h,
				};
			};
			const hLay: {[nm: string]: {fore: unknown; back: unknown}} = {};
			for (const l of fore) hLay[l.nm] = {fore: attrs(l), back: attrs(back.find(b=> b.nm === l.nm))};
			return JSON.stringify(hLay);
		});
	}

	// ===== ページログ（読み戻り。PageLog.ts） =====
	//	停止点ごとに「そのページを演じ直すのに要るもの」を積み、[page to=…]で戻る。
	//	**画面のスナップショットではなくシナリオを演じ直す**（本家 loadFromMark()）ので、
	//	戻ったページからそのまま読み進められる（[page to=load]）
	readonly #pageLog = new PageLog(()=> this.sys.cfg.oCfg.log.max_len);
	// 今演じている「ページの先頭」。停止点で積むときに使う。**ページの本文が出る前**の
	//	位置としおりでなければならないので、停止点から次の停止点までの間は取り直さない
	#pageStart: {fn: string; idx: number; mark: T_MARK; clearOnResume: boolean} | undefined;
	// [page key=…]（[page style=…]は save:const.sn.styPaging に置く＝しおりに乗る。本家も同じ）
	#aKeysAtPaging: string[] = [];
	// [page to=…]でページを演じ直している最中か。**最新ページ（isPaging=false）へ戻り着く
	//	移動の最中もtrue**にする必要がある：#procPageは移動先を決めた直後にisReadBackを
	//	確定させるが、実際に本文を再生成する（engine.switchScript以降のchgStr群）のはその後で、
	//	最新ページへ戻る場合はその時点でisPagingが既にfalseになっている。isReadBackだけで
	//	瞬時表示を判定するTxtLayerに任せると、既読のはずの本文が通常の文字送り演出で
	//	もう一度アニメしてしまう（実機確認バグ：読み戻りから戻ると既読部分が瞬時表示されない）
	#pageReplaying = false;

	// 読み戻り状態を画面へ反映（本文の色。本家 setAllStyle2TxtLay(styPaging)）
	#applyPaging() {
		this.$fncs.setReadBack(this.#pageLog.isPaging || this.#pageReplaying);
		this.$fncs.setStyPaging(
			String(this.#engine?.getVal('save:const.sn.styPaging') ?? '') || INI_STYPAGE);
	}

	// [page to=…]。Main.tsx（PageUp/PageDown）からも呼ぶ
	page(to: T_PAGE_TO) {
		if (this.#procing) return;

		this.#procing = true;
		this.#procPage(to).catch(this.#catchErr);
	}
	// 移動先のページを演じ直す。しおりの復元は[load]と同じ手順（#procLoad参照）
	async #procPage(to: T_PAGE_TO) {
		const engine = this.#engine;
		if (! engine) {this.#procing = false; return}

		try {
			const ent = this.#pageLog.move(to);
			if (! ent) {
				// 動かなかった（端まで来ている／to=load）。to=loadはここから読み進めるだけ
				this.#applyPaging();
				this.#procing = false;
				return;
			}

			this.#pageReplaying = true;	// 演じ直しの間は（最新ページに戻り着く移動でも）瞬時表示にする
			this.#applyPaging();

			engine.restoreMarkPart(ent.mark);
			engine.clearOnResume = ent.clearOnResume;
			this.#stopTsyByLayer(null, 'both');	// 演じ直しでレイヤ配列ごと差し替わる＝[clear_lay]同様に走行中[tsy]を畳む
			this.#dropFxTimers(()=> true);	// [add_fx time>0] の [wait_fx] タイマーも全部落とす（aFxはreplace()で差し替わる）
			this.$fncs.replace(ent.mark.sPages);
			this.#plgLayMng.setPageState(this.$fncs.getForeIdx(), false);	// 演じ直し後の foreIdx を先に伝える
			this.#plgLayMng.playback(ent.mark.hPlgLay, []);
			this.#stopped = false;
			this.#pageStart = undefined;	// 演じ直しの先頭は積んだときの位置のまま
			engine.switchScript(await this.#getScript(ent.fn), '', ent.idx);
		} catch (e) {
			this.#pageReplaying = false;
			this.#procing = false;
			this.myTrace(`[page] ${String(e)}`, 'ET');
			return;
		}
		this.#procing = false;
		this.#goSafe();
	}

	// ===== セーブ層（しおり・sys:・既読の永続化。SaveMng.ts） =====
	//	保存先はブラウザ版がlocalStorage、アプリ版がelectron-store（sys.storeLoad/storeFlush）。
	//	キーはprj.jsonのsave_nsで分ける。**器はSaveMngが持ち、中身の出し入れはここが仲介する**
	//	（エンジンは永続化の手段を知らない決まりのため）
	#saveMng	: SaveMng;
	#isFirstBoot= true;

	// 起動時：保存済みのsys:と既読をエンジンへ流し込む（本家 SysWeb.initVal()）
	async #loadSaveData(engine: ScriptEngine) {
		this.#saveMng = new SaveMng(this.sys, this.sys.cfg.oCfg.save_ns);
		try {this.#isFirstBoot = await this.#saveMng.load()}
		catch (e) {
			// 壊れたデータで起動できなくなるのが一番困るので、知らせて初期状態から始める
			this.myTrace(`セーブデータが壊れています。初期状態で起動します ${String(e)}`, 'E');
			this.#isFirstBoot = true;
		}
		if (! this.#isFirstBoot) {
			engine.setSys(this.#saveMng.data.sys);
			engine.setKidoku(this.#saveMng.data.kidoku);
			// setSys()はVarStore.setNs()で直書きするだけで代入トリガを通らないため、
			//	全体音量（SndMngのマスターGainNode）はここで明示的に同期しないと
			//	既定値1のまま残ってしまう（buf別音量は再生時にgetValし直すので自己修復する）
			this.#sndMng.setGlobalVol(Number(engine.getVal('sys:sn.sound.global_volume') ?? 1));
			this.#applyMovieVolume();
		}
		// 本家 SysBase.init() と同じく**毎回**入れ直す（SysBase.ts:152）。
		//	[import]で「別のゲームのデータ」を弾く目印なので、[clearsysvar]で消えたままだと困る
		engine.setValNochk('sys:const.sn.cfg.ns', this.sys.cfg.oCfg.save_ns);
		this.#flushSys();
	}
	// ウインドウの移動・リサイズが確定した通知（appMain_cmn #window()→app.tsのIPC経由）。
	//	停止点まで待つとその前に閉じられた場合に失われるので、ここは即flushする
	setWinInf(x: number, y: number, w: number, h: number) {
		const engine = this.#engine;
		if (! engine) return;

		engine.setValNochk('sys:const.sn.nativeWindow.x', x);
		engine.setValNochk('sys:const.sn.nativeWindow.y', y);
		engine.setValNochk('sys:const.sn.nativeWindow.w', w);
		engine.setValNochk('sys:const.sn.nativeWindow.h', h);
		this.#flushSys();
	}
	// sys:と既読を書き戻して保存（SaveMng側で500msにまとめられる）。
	//	sys:は「設定画面で変えたら即保存」が本家の挙動なので、停止点ごとに丸ごと写して良い
	#flushSys() {
		const engine = this.#engine;
		if (! engine) return;

		this.#saveMng.data.sys = engine.cloneSys();
		this.#saveMng.data.kidoku = engine.getKidoku();
		this.#saveMng.flush();
	}

	// しおり1件を組み立てる（本家 ScriptIterator #record_place() の後半）。
	//	エンジン側（save:変数・ifスタック）とストア側（表裏ページ）の合成
	#mkMark(json: {[k: string]: string} = {}): T_MARK {
		return {
			...this.#engine!.nowMarkPart(),
			sPages	: this.$fncs.getPagesJson(),
			hPlgLay	: this.#plgLayMng.record(),
			json,
		};
	}
	// 直近の[record_place]で覚えたしおり。[save]はこれを保存する（本家 #mark）
	#mark?: T_MARK;

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
		// エスケープ文字は字句解析（Grammar）と本文の文字組み（RubySpliter）の両方が見る
		//	（本家 ScriptIterator.ts:120-122 も同じ2箇所へ同じ値を配る）
		grm.setEscape(this.sys.cfg.oCfg.init.escape);
		setEscape(this.sys.cfg.oCfg.init.escape);
		return grm;
	}

	// 現在の実行位置から次の停止点（[l][p][s]、またはスクリプト終端）まで進める
	go() { /* attachTsx/load 完了後、上でthis.goとして差し替えられる */ }

	// addTagで登録したタグ関数、または[lay]/[add_lay]のプラグインレイヤーがisWait=trueを
	//	返した後、プラグインが処理完了を知らせるために呼ぶ再開口（T_PluginInitArg.resume。
	//	本家 Pages.lay()のisWait/pia.resume()相当）。#procingを下ろしてからgoSafe()する点が
	//	ただのgo()と違う（#procPlgTag()/#procPlgLay()がisWait=trueの間は#procing=trueの
	//	ままにしてあるので、下ろさずgoSafe()だけ呼んでも「DOM絡みの非同期処理中」判定
	//	（#goSafe()の#procingチェック）に引っかかって無視されてしまう）
	resumePlg() {
		this.#procing = false;
		this.#goSafe();
	}

	// [button]クリック時のJSX側から呼ばれる：指定ラベルへ直接ジャンプしてそのまま進行する。
	//	Main.tsxのnext()（クリックでの読み進め）とは別系統。CaretakerのprevKey/nextKeyや
	//	isReadBackには一切触れないため、ボタンクリックは「読み進め」扱いにはならない（今回の要件）。
	//	call=true指定時はjumpではなくcall（サブルーチンコール）する。
	//	fn指定時は別スクリプトへ飛ぶ。ロードが要るのでここだけ非同期になる
	//	（クリックハンドラ側は投げっぱなしで良いよう、例外はここで握る）
	// ＵＲＬを開く（本家 SysWeb.ts:239 navigate_to）。[navigate_to]・[link url=…]・[event url=…]の共通口。
	//	本家と同じく**別タブ**で開く：location.hrefだとゲームごと終わってしまい、
	//	引数なしのopen()は近年のブラウザで効かない。'_blank'はポップアップブロックの対象になり得る
	navigateTo(url: string) {globalThis.open(url, '_blank')}

	//	argは[link arg=…]用。予約イベント（[event]）と同じく飛び先で&sn.eventArgとして受け取れる。
	//	本家 Main.ts resumeByJumpOrCall() はargの有無に関わらず毎回両方を代入する（省略時は空文字列）。
	//	argが渡ったときだけに絞っていたのは誤りで、arg省略の[button]/[link]では&sn.eventLabelが
	//	常にundefinedのままになっていた
	jumpToLabelAndGo(label: string, call: boolean, fn = '', arg?: string) {
		this.#engine?.setValNochk('tmp:sn.eventArg', arg ?? '');
		this.#engine?.setValNochk('tmp:sn.eventLabel', label);
		void this.#jumpToLabelAndGo(label, call, fn).catch(this.#catchErr);
	}

	// HTMLフレーム（[add_frame]系）。レイヤと違いストアには載せず、ここが抱える（FrameMng.ts参照）。
	//	置き場所（ステージ座標系の箱）はStage.tsxがマウント時に渡してくる。
	//	this.sys.cryptoを値として渡す都合上sysの初期化後でないと組み立てられない（TS2729）ので、
	//	#saveMngと同じくフィールド初期化子ではなくコンストラクタ本体で代入する
	readonly #frmMng: FrameMng;
	attachFrameBox(el: HTMLElement) {this.#frmMng.attachBox(el)}

	// プラグインレイヤー（[add_lay class=…]）のDOM側。FrameMngと同じく中身をストアに載せない
	//	（src/ts/PlgLayMng.ts冒頭コメント参照）。依存を注入する必要が無いためフィールド初期化子でよい
	readonly #plgLayMng = new PlgLayMng();
	attachPlgBox(nm: string, pageIdx: 0 | 1, el: HTMLElement | null) {this.#plgLayMng.attachBox(nm, pageIdx, el)}
	// T_PluginInitArg.getVal の実体。プラグインが「今の変数値」を読むためのAPI
	getVal(nm: string, def?: number | string) {return this.#engine?.getVal(nm) ?? def}
	// 'fore'/'back' → ストアページ添字（0|1）。プラグインレイヤーのDOM実体は
	//	（[trans]でforeIdxが反転しても動かない）ストアページ添字に固定して持つため必要
	#pageIdx(page: T_PAGE): 0 | 1 {
		const fi = this.$fncs.getForeIdx();
		return page === 'fore' ? fi : (1 - fi) as 0 | 1;
	}

	// 音声層（ts/SndMng.ts）。DOM/WebAudioを直接触るのはScriptMngから見てここだけ。
	//	myTraceはクラスフィールドとしてこれより後ろで定義されている（フィールド初期化は宣言順）ので、
	//	直接渡さず呼び出し時に引くラッパーにする（束縛時点ではまだ未初期化のため）
	readonly #sndMng = new SndMng((txt, lvl)=> this.myTrace(txt, lvl), (u, init)=> this.sys.fetch(u, init), ab=> this.sys.decAB(ab));
	// ブラウザの自動再生ポリシー対策。初回のクリック・キー入力から呼ぶ（Main.tsx参照）
	unlockAudio() {this.#sndMng.unlock()}
	// 自動再生ブロック中か（GrpLayerが[lay fn=movie]の<video>を初期muted状態にするかの判定に使う。
	//	本家 SpritesMng.ts:288-296 #charmVideoElm() 相当）
	needClick2Play(): boolean {return this.#sndMng.needClick2Play()}

	// [button clickse=/enterse=/leavese=]。本家 EventMng.ts:465-491 と同じくクリック/ホバー/
	//	ホバー解除のたびに都度呼ばれる（事前生成キャッシュではない）投げっぱなし再生。
	//	シナリオの読み進めとは無関係なUIイベントなので join は常に false（待つ意味が無い）。
	//	目標音量（save:の概念）は無く、基準音量（sys:）だけが効く——本家もhArg.volume省略=1.0固定
	playButtonSe(fn: string, buf: string) {
		if (! fn) return;
		const src = this.#searchSnd('button', fn);
		if (! src) return;

		const sysvol = Number(this.#engine?.getVal(`sys:const.sn.sound.${buf}.volume`) ?? 1);
		void this.#sndMng.play(buf, src, {
			loop: false, volume: sysvol, speed: 1, pan: 0, start_ms: 0, end_ms: MAX_END_MS, ret_ms: 0,
		}).catch(this.#catchErr);
	}

	// ステージの内箱（等倍の座標系そのもの）。[snapshot]がここを複製して画像化する。
	//	外側の#skynovelではなく内箱なのは、拡縮（transform: scale）が掛かる前の論理サイズで撮るため
	#heStageBox?: HTMLElement;
	attachStageBox(el: HTMLElement) {this.#heStageBox = el}

	// sys:sn.sound.movie_volume × sys:sn.sound.global_volume（本家 docs/dev.html「バッファの実際の
	//	音量はこの『ムービー音量』×『全体的な音量』」）。<video>（[lay fn=movie]）はWebAudioの
	//	GainNodeを通らないDOM要素なので、音声バッファと違い自前で両方を掛け合わせる必要がある
	getMovieVolume(): number {
		const mv = Number(this.#engine?.getVal('sys:sn.sound.movie_volume') ?? 1);
		const gv = Number(this.#engine?.getVal('sys:sn.sound.global_volume') ?? 1);
		const v = mv * gv;
		return v < 0 ? 0 : v > 1 ? 1 : v;
	}
	// 今ステージに乗っている<video>全部へ反映（本家 SpritesMng.ts:57-65 も同様に全hveへ直書き）。
	//	新規にマウントされる<video>にはGrpLayer側がマウント時にgetMovieVolume()を読んで反映する
	#applyMovieVolume() {
		const box = this.#heStageBox;
		if (! box) return;

		const vol = this.getMovieVolume();
		for (const ve of box.querySelectorAll('video')) ve.volume = vol;
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

	// 修飾キー等の押下状態（組み込み変数 const.sn.key.*）をエンジンへ。Main.tsxのkeydown/keyupから
	setKeyDown(key: string, down: boolean) {this.#engine?.setKeyDown(key, down)}
	clearKeyDown() {this.#engine?.clearKeyDown()}

	// [event]で予約したキー・クリックが押された時にMain.tsxから呼ばれる。
	//	戻り値true＝予約イベントとして処理した（＝呼び出し側は通常の読み進めを行わない）。
	//	移動そのものは[button]クリックと全く同じ経路を通す
	fireEvent(key: string): boolean {
		const engine = this.#engine;
		if (! engine) return false;

		// 読み戻り中は[page key=…]で挙げたキーだけを通す（本家 waitRsvEvent4Paging()）。
		//	テンプレはこれで「移動中はページ移動と決定・取消だけ効く」状態を作る
		if (this.#pageLog.isPaging && this.#aKeysAtPaging.length > 0
			&& ! this.#aKeysAtPaging.includes(key)) return false;

		const ev = engine.beginEvent(key);
		if (! ev) return false;

		// url指定の予約はラベルへ飛ばずURLを開く（本家も fn・label より優先）
		if (ev.url) {this.navigateTo(ev.url); return true}

		// ev.argはengine.beginEvent()が既にtmp:sn.eventArgへ設定済みだが、jumpToLabelAndGo()は
		//	「argが渡らなければ空文字列で上書きする」作りなので、ここで渡し忘れると
		//	[event key=… arg=…]のargが常に空文字列へ潰されてしまう（[button]/[link]は
		//	Stage.tsxのonActivateが直接argを渡しており影響なし）
		this.jumpToLabelAndGo(ev.label, ev.call, ev.fn, ev.arg);
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
		this.#goSafe(true);
	}

	// #runStep()は非同期になったので、投げっぱなしにせずここで握る。
	//	myTrace(…, 'ET')は表示後にthrowする仕様なので、そのままだと未処理のPromise拒否になる
	//	（同期だった頃はDOMイベントハンドラまで抜けていた）。表示は済んでいるので握って良い
	// viaCall＝[button]/[event]のcall/jump予約（jumpToLabelAndGo経由）からの呼び出しか。
	//	通常のクリック読み進めと違い、callToLabel()が積んだ戻り先は「割り込まれた待ちタグ自身」
	//	（--idxで1つ戻して積むため、[return]はそのタグを再実行する。本家 #doReturn()のコメント
	//	参照）なので、[wait_tsy]待ち中でも安全に今すぐ実行してよい：[pause_tsy]等を含む呼び先を
	//	[return]まで走らせても、戻った先で同じ[wait_tsy]が再実行され、動いているトゥイーンが
	//	あれば（#waitTsy()参照。存在チェックだけの副作用無い実装）そのまま待ちに戻るだけで済む。
	//	tag_tsyのpause/resumeボタン（[button call=true label=*pause]）が、canskip=false指定の
	//	[wait_tsy]中はクリックしても#runStep()が一切呼ばれず待ちが自然終了するまで無視され続ける
	//	不具合として発見（2026-08-21）。[trans]/[wait]/[quake]等の他の待ちタグは再実行すると
	//	演出そのものが再発火してしまう（[wait_tsy]のような存在チェックの冪等実装が無い）ため、
	//	同じ理屈でのバイパスはできず対象外のまま
	#goSafe(viaCall = false) {
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
		if (this.#tsyWaiting && ! viaCall) {
			if (this.#tsyWaiting.canskip) this.#endTsy(this.#tsyWaiting.tw_nm);
			return;
		}
		if (this.#fxWaiting && ! viaCall) {	// viaCall（[button call=]/[event]）は[wait_tsy]と同じく素通し
			if (this.#fxWaiting.canskip) this.#skipFxWait();		//	（#waitFx は存在チェックだけの冪等実装なので[return]後に再実行されても待ちに戻るだけ）
			return;
		}
		if (this.#quakeWaiting) {
			if (this.#quakeWaiting.canskip) this.#finishQuake();
			return;
		}
		if (this.#sndWaiting) {
			if (this.#sndWaiting.canskip) this.#skipSndWait();
			return;
		}
		if (this.#sndFadeWaiting) {
			if (this.#sndFadeWaiting.canskip) this.#skipSndFadeWait();
			return;
		}
		if (this.#videoWaiting) {
			if (this.#videoWaiting.canskip) this.#skipVideoWait();
			return;
		}
		// DOM絡みの非同期処理中（[add_frame]/[let_frame]/[loadplugin]/[snapshot]/[load]）は
		//	**クリックを捨てる**。#busyは#runStep()を抜けた時点で下りるので、これが無いと
		//	処理の完了を待たずにシナリオが再開してしまう（フレーム読み込み中に画面をクリックすると
		//	[add_frame]の次の[set_frame]が「まだ読み込まれていません」で落ちた）。
		//	本家も Reading.beginProc()〜endProc() の間は進行を受け付けない
		if (this.#procing) {return}

		this.#runStep().catch(this.#catchErr);
	}
	#stopped = false;	// [s]で停止中か
	#procing = false;	// DOM絡みの非同期処理中か（上記）

	// オート読み・既読スキップの自動進行タイマー。停止点でresume指示が来たら仕込み、
	//	次のgo()を自分で呼ぶ。手動操作（Main.tsx）や[s]到達で止める
	#resumeTimer: ReturnType<typeof setTimeout> | undefined;
	// 文字送り演出（Web Animations API）が終わるまで足止め中のresume指示（本家 Reading.ts はl()/p()の
	//	待ち時間カウントを文字送り完了後に開始する。ここで同じ挙動にする。演出が待ち時間より
	//	長いと、演出の途中でオート/スキップが次へ進んでしまう問題への対応）
	#pendingResume: {mode: 'auto' | 'skip'; msec: number} | undefined;
	#scheduleResume(mode: 'auto' | 'skip', msec: number) {
		clearTimeout(this.#resumeTimer);
		this.#pendingResume = undefined;
		// スキップ中は文字送り演出を省く合図をストアへ立てておく（TxtLayerが瞬時表示にする）
		this.$fncs.setSkipping(mode === 'skip');
		if (this.$fncs.isTyping()) {this.#pendingResume = {mode, msec}; return}
		this.#startResumeTimer(mode, msec);
	}
	#startResumeTimer(mode: 'auto' | 'skip', msec: number) {
		this.#resumeTimer = setTimeout(()=> {
			this.#resumeTimer = undefined;	// isAutoPending用。発火後もIDが残ると足止め判定が終わらない
			if (mode === 'skip') this.$fncs.requestSkip();	// 進行前に現在の演出を瞬時完了させる
			this.#goSafe();
		}, msec);
	}
	// 文字送り演出の完了通知（Main.tsxがisTypingのfalse化を検知して呼ぶ）。
	//	足止め中のresume指示があれば、ここでようやくタイマーを仕込む
	onTypingDone() {
		if (! this.#pendingResume) return;
		const {mode, msec} = this.#pendingResume;
		this.#pendingResume = undefined;
		this.#startResumeTimer(mode, msec);
	}
	// オート読み・既読スキップの自動進行が「まだ確定していない」か（文字送り演出の完了待ち、
	//	またはresumeタイマーが動いている間）。E2Eがクリック操作の前に、次の停止点へ本当に
	//	落ち着いたことを確認するために覗く（window.__sn経由。本体のロジックからは使わない）
	get isAutoPending(): boolean {
		return this.#pendingResume !== undefined || this.#resumeTimer !== undefined;
	}
	// オート読み・既読スキップの中断（本家 ReadingState.cancelAutoSkip 相当）。
	//	仕込んだタイマーを解除し、エンジン側の3フラグも倒す。手動操作から呼ばれる
	cancelAuto() {
		clearTimeout(this.#resumeTimer);
		this.#resumeTimer = undefined;
		this.#pendingResume = undefined;
		this.$fncs?.setSkipping(false);
		this.#engine?.cancelAutoSkip();
	}

	// ===== [trans]の演出と、その終了待ち（[wt]） =====
	//	**演出の終了を宣言するのはここ**（時間切れ／[wt]中のクリック）。
	//	Stage側（WAAPI）は見た目を動かすだけにしてあり、その完了コールバックに表裏の交換をやらせない。
	//	そうしないと「交換」と「シナリオの再開」の前後が保証されず、
	//	交換前のページへ次の文が書かれてしまう（＝画面が空のまま進む）
	#transTimer		: ReturnType<typeof setTimeout> | undefined;
	#transRunning	= false;	// 演出中か（time=0は即交換済みなのでfalseのまま）
	#transWaiting	: {canskip: boolean} | undefined;	// [wt]で待っている最中か
	#transALayNm	: string[] | null = null;	// 演出中の[trans]が交換するレイヤ名（本文蓄積の追随用）

	// [trans]適用時：演出時間ぶんのタイマーを仕込む。[wt]の有無に関わらず必ず終わらせる
	#beginTrans(time: number, aLayNm: string[] | null) {
		clearTimeout(this.#transTimer);
		this.#transRunning = time > 0;
		this.#transALayNm = aLayNm;
		this.#transTimer = this.#transRunning
			? setTimeout(()=> this.#finishTrans(), time)
			: undefined;
		// time<=0はstore側のstartTrans()がその場でfinTrans()する（#finishTrans()を経由しない）ので、
		//	エンジンの本文蓄積もここで揃える（ScriptEngine#transDone参照）
		if (! this.#transRunning) this.#engine?.transDone(aLayNm);
		// 演出中は裏ページも見えている＝両ページのプラグインレイヤーを可視扱いにする
		//	（演出終了時に PlgLayMng.finishTrans() が新しい不可視 back を止め直す）。backpage-perf.md
		else this.#plgLayMng.setPageState(this.$fncs.getForeIdx(), true);
	}
	// 演出終了：表裏を交換し、[wt]で待っていたなら続きを回す。
	//	演出が途中でも必ず終了状態へ送るので、中途半端な見た目のまま止まることはない
	#finishTrans() {
		clearTimeout(this.#transTimer);
		this.#transTimer = undefined;
		const wasRunning = this.#transRunning;
		this.#transRunning = false;
		const oldForeIdx = this.$fncs.getForeIdx();	// flip前に読む（PlgLayMng.finishTrans()の引数）
		this.$fncs.finishTrans();	// zustandのsetは同期＝この行の後は書き込み先が新しい表ページになる
		// 演出中だった分だけエンジンの本文蓄積も追随させる（動いている演出が無ければ何もしない。
		//	store側のfinishTransが s.trans が無ければ何もしないのと同じ理屈）
		if (wasRunning) {
			this.#engine?.transDone(this.#transALayNm);
			this.#plgLayMng.finishTrans(this.#transALayNm, oldForeIdx, []);
		}

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

	// ===== [quake]の画面揺らしと、その終了待ち（[wq]／[stop_quake]） =====
	//	[trans]とまったく同じ形。揺らすのはStage側のrAFループで、**終わりを決めるのはここ**
	#quakeTimer		: ReturnType<typeof setTimeout> | undefined;
	#quakeRunning	= false;
	#quakeWaiting	: {canskip: boolean} | undefined;

	#beginQuake(act: Extract<T_ENGINE_ACTION, {t: 'quake'}>) {
		clearTimeout(this.#quakeTimer);
		this.#quakeRunning = true;
		this.#quakeTimer = setTimeout(()=> this.#finishQuake(), act.msec);
		this.$fncs.startQuake({hmax: act.hmax, vmax: act.vmax});
	}
	#finishQuake() {
		clearTimeout(this.#quakeTimer);
		this.#quakeTimer = undefined;
		this.#quakeRunning = false;
		this.$fncs.finishQuake();	// Stage側が揺れを止め、ずれを0へ戻す

		if (! this.#quakeWaiting) return;
		this.#quakeWaiting = undefined;
		this.#goSafe();
	}
	#waitQuake(canskip: boolean) {
		if (this.#quakeRunning) {this.#quakeWaiting = {canskip}; return}

		setTimeout(()=> this.#goSafe(), 0);	// #waitTrans()と同じ事情
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
	//	本家（CmnTween.ts）はmotion（Tw）でpixiのDisplayObjectを直接動かすが、
	//	こちらは同じmotion（Tw、src/ts/Tw.ts）で**ストアのレイヤ属性を**動かす。
	//	つまり画面の現在値は常にストアが持つ。
	//	見た目だけをDOMへ書く手もある（[trans]はそうしている）が、それだとMemento（読み戻り）や
	//	[trans]のレイヤ複製が演出前の古い値を拾ってしまうため、こちらはストア経由にした。
	//	副作用として本家のarrive属性（終了時に目標値を確実に入れる）は常時ONと同じ挙動になる。
	//	トゥイーン名（tw_nm）はname省略時レイヤ名（本家 CmnTween.#tw_nm()）
	//	nm/pageは[er]/[clear_lay]でそのレイヤのトゥイーンを畳むための紐付け（[tsy_frame]はnm無し）
	readonly #hTw: {[tw_nm: string]: {tw: Tw; end: ()=> void; next?: ()=> void; nm?: string; page?: T_PAGE}} = Object.create(null);
	#tsyWaiting	: {tw_nm: string; canskip: boolean} | undefined;	// [wait_tsy]で待っている最中か

	#beginTsy(act: Extract<T_ENGINE_ACTION, {t: 'tsy'}>) {
		const cur = this.$fncs.getLaySty(act.nm, act.page);
		// Twに渡すのは素のオブジェクト。fromが動かされ、onUpdateでストアへ書き戻す。
		//	未指定属性の開始値は各レイヤのCSS既定（H_TSY_DEF）。
		//	エンジン側は現在値を知らないので相対指定（left='=100'）のまま渡してくる。
		//	width/heightはH_TSY_DEFにキーが無い（CSSの既定=autoに対応する数値が無いため）。
		//	[lay width=/height=]で数値を明示していないレイヤを動かそうとしたら、0から伸びる
		//	驚きの挙動にせずその場で例外にする（Tsy.ts参照）
		const {from, aTo, aPrp} = ScriptMng.#tsyVals(act, k=> {
			const v = cur[k as T_TSY_PRP] ?? H_TSY_DEF[k as T_TSY_PRP];
			if (v === undefined) throw `[tsy] ${k} は [lay ${k}=…] で寸法を明示したレイヤにしか使えません`;
			return v;
		});
		// fromをそのまま（スプレッドで）ストアへ渡さず、動かす属性名（aPrp）だけ拾って新しい
		//	オブジェクトにする。GSAP時代はこれを省くと対象オブジェクトへ自分用のキャッシュ
		//	（_gsap。中からtargetを指し返す）が生え、レイヤが循環参照になってstructuredClone
		//	（addLayer/[trans]）もJSON化（しおり）も落ちていた。motion（Tw）は対象へそうした
		//	痕跡を残さないが、fromはpath区間ごとに使い回す作業用オブジェクトでもあるので、
		//	ストアに載せる値は引き続きこの形で明示的に切り出す
		//
		// left/topを動かす区間が**全て相対指定（'='付き）**なら、寄せ（align_x/align_y）を
		//	現在値のままsty へも含める。store.chgLay()はleft/topが来てalign_x/align_yが
		//	伴わないと「もう寸法込みの絶対位置」とみなして古い寄せを消す（[fg2]がキャラを
		//	絶対x座標へ再配置する[tsy left=x-width/2]のための仕様。ARCHITECTURE.md参照）。
		//	だが[fg_squat]/[fg_shake]/[fg_sidestep]のように現在位置から相対に揺らすだけの
		//	[tsy path='(,=50) (,=0)']等はその「絶対位置」ではないので、寄せまで消えると
		//	bottom寄せ（立ち絵の設置基準）を失って画面外へずれ落ちる（本Issue: [fg2_squat]等で
		//	立ち絵が消える）。絶対指定（'='無し）が1区間でもあれば従来通り寄せを道連れにしない
		const aHTo = [act.hTo, ...act.aPath ?? []];
		const relOnly = (k: string)=> aHTo.every(h=> ! h[k] || h[k]!.rel);
		const withAlign = (sty: T_LAY_STY_ARG)=> {
			if (aPrp.includes('left') && relOnly('left') && cur.align_x !== undefined) sty.align_x = cur.align_x;
			if (aPrp.includes('top') && relOnly('top') && cur.align_y !== undefined) sty.align_y = cur.align_y;
			return sty;
		};
		this.#runTsy(act, from, aTo, ()=> {
			const sty: T_LAY_STY_ARG = {};
			for (const k of aPrp) Object.assign(sty, {[k]: from[k]});
			this.$fncs.chgLay({nm: act.nm, page: act.page, sty: withAlign(sty)});
		}, act.backlay ? ()=> {
			// [tsy backlay=true]：終了時の最終値を反対側のページにも反映する（本家 CmnTween.ts backlay）
			const sty: T_LAY_STY_ARG = {};
			for (const k of aPrp) Object.assign(sty, {[k]: from[k]});
			this.$fncs.chgLay({nm: act.nm, page: act.page === 'fore' ? 'back' : 'fore', sty: withAlign(sty)});
		} : undefined);
	}

	// [tsy_frame]：動かす先がストアのレイヤではなくFrameMngが持つiframeの見た目。
	//	開始値はFrameMngが抱える現在の見た目（本家は組み込み変数を読み直す）、
	//	反映も[frame]と同じ経路を通す＝組み込み変数への書き戻しも本家同様毎フレーム走る
	#beginTsyFrame(act: Extract<T_ENGINE_ACTION, {t: 'tsyFrame'}>) {
		const cur = this.#frmMng.getSty(act.id) as {[k: string]: number | undefined};
		const {from, aTo, aPrp} = ScriptMng.#tsyVals(act, k=> cur[k] ?? 0);
		this.#runTsy(act, from, aTo, ()=> {
			const sty: T_FRM_STY = {};
			for (const k of aPrp) Object.assign(sty, {[k]: from[k]});
			this.#setVals(this.#frmMng.frame(act.id, sty));
		});
	}

	// 開始値（from）と、区間ごとの目標値（aTo）の解決。**相対指定はどの区間も開始値が基準**で、
	//	本家（CmnTween.tween()）のpathも同じ＝`(,=50) (,=0)`が「50下げて元へ戻す」になる
	static #tsyVals(act: Extract<T_ENGINE_ACTION, {t: 'tsy' | 'tsyFrame'}>, now: (prp: string)=> number) {
		const aHTo = [act.hTo, ...act.aPath ?? []];
		const aPrp = [...new Set(aHTo.flatMap(h=> Object.keys(h)))];
		const from: {[k: string]: number} = {};
		for (const k of aPrp) from[k] = now(k);

		const aTo = aHTo.map(hTo=> {
			const to: {[k: string]: number} = {};
			for (const [k, t] of Object.entries(hTo)) if (t) to[k] = t.rel ? from[k]! + t.v : t.v;
			return to;
		});
		return {from, aTo, aPrp};
	}

	// トゥイーン本体の組み立て（[tsy]/[tsy_frame]共通）。fromを動かし、毎フレームapply()で反映する
	#runTsy(act: Extract<T_ENGINE_ACTION, {t: 'tsy' | 'tsyFrame'}>, from: {[k: string]: number}, aTo: {[k: string]: number}[], apply: ()=> void, onEnd?: ()=> void) {
		// [tsy]はレイヤ名／ページを控える（[er]/[clear_lay]での畳み込み用）。[tsy_frame]は紐付け無し
		const lay = act.t === 'tsy' ? {nm: act.nm, page: act.page} : {};

		// 同名のトゥイーンが動いていたら畳んでから始める。本家は#hTwInfを上書きするだけで
		//	古いトゥイーンはGroupに残ったまま動き続けてしまうので、そこだけ変えている
		this.#hTw[act.tw_nm]?.tw.kill();
		// eslint-disable-next-line @typescript-eslint/no-dynamic-delete
		delete this.#hTw[act.tw_nm];

		// 終了状態の確定。時間切れでも[stop_tsy]でも[wait_tsy]中のクリックでも必ずここを通すので、
		//	中途半端な見た目のまま止まることはない（本家 stop().end() と同じ考え方）。
		//	path指定時の終着点は「各属性を最後に書いた区間の値」＝畳み込み
		const fin: {[k: string]: number} = {};
		for (const to of aTo) Object.assign(fin, to);
		const end = ()=> {Object.assign(from, fin); apply(); onEnd?.()};

		// time=0（既読スキップ中もここ）は演出せず即座に終了状態へ
		if (act.msec <= 0 && act.delay <= 0) {end(); this.#onTsyEnd(act.tw_nm); return}

		// 区間ごとにTwを作りchain()で連結する（[tsy path=…]。本家はtween.jsのchain()、
		//	こちらはTw.chain()で同じ形にする）。delay/repeat/yoyoは元のGSAPタイムラインと同じく
		//	**区間ごと**に効く（区間の間にも同じdelayの間が空く）。
		//	pause_tsy/resume_tsyが「今動いている区間」に効くよう、区間が切り替わるたびに
		//	#hTwの参照をonStart()で張り替える
		const ease = easeFn(act.ease);
		const aSeg = aTo.map(to=> {
			const seg = new Tw(from)
			.to(to, act.msec)
			.delay(act.delay)
			.easing(ease)
			.repeat(act.repeat)
			.yoyo(act.yoyo)
			.onUpdate(apply);
			seg.onStart(()=> {this.#hTw[act.tw_nm] = {end, tw: seg, ...lay}});
			return seg;
		});
		for (let i = 0; i < aSeg.length; ++i) {
			const seg = aSeg[i]!;
			const nxt = aSeg[i + 1];
			if (nxt) seg.chain(nxt);
		}
		const tw = aSeg[0]!;
		aSeg[aSeg.length - 1]!.onComplete(()=> {end(); this.#onTsyEnd(act.tw_nm)});

		this.#hTw[act.tw_nm] = {end, tw, ...lay};
		// chain指定時は始めず、繋ぎ元の終了時に動かし始める（本家 CmnTween.ts:219）
		if (! act.chain) {tw.start(); return}

		const src = this.#hTw[act.chain];
		if (! src) throw `${act.chain}は存在しない・または終了したトゥイーンです`;	// 本家と同じ文言
		src.next = ()=> tw.start();
	}

	// トゥイーン1件の後片付け。[wait_tsy]で待っていたなら続きを回す
	#onTsyEnd(tw_nm: string) {
		const {next} = this.#hTw[tw_nm] ?? {};
		// eslint-disable-next-line @typescript-eslint/no-dynamic-delete
		delete this.#hTw[tw_nm];
		next?.();	// [tsy chain=…]で後ろに繋がれたトゥイーンを開始する
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
	// [er]/[clear_lay]でレイヤが片付くとき、そのレイヤを動かしている[tsy]も畳む。
	//	本家（LayerMng.#er()／#clear_lay() → Layer.clearLay()）はこれをせず、クリアで初期化した
	//	見た目をトゥイーンが上書きし続ける（本家 TODO.md に既知不具合として記載。分家で先に対処）。
	//	[stop_tsy]と違い最終値の畳み込み（end()）は呼ばない——レイヤは既定へ戻される最中なので、
	//	トゥイーンの最終値を入れ直すと打ち消し合う。chain先も道連れ（kill()が辿る／nextは発火しない）。
	//	[wait_tsy]待機中は#runStep()が止まり[er]/[clear_lay]が来ないので#tsyWaitingは触らなくてよい
	#stopTsyByLayer(aLayNm: readonly string[] | null, page: T_PAGE_BOTH) {
		for (const [tw_nm, ti] of Object.entries(this.#hTw)) {
			if (ti.nm === undefined) continue;	// [tsy_frame]はレイヤに紐付かない
			if (aLayNm && ! aLayNm.includes(ti.nm)) continue;
			if (page !== 'both' && ti.page !== page) continue;
			ti.tw.kill();
			// eslint-disable-next-line @typescript-eslint/no-dynamic-delete
			delete this.#hTw[tw_nm];
		}
	}
	// [wait_tsy]：動いているトゥイーンが無ければ待たずに続きへ（本家 wait_tsy() も false を返す）
	#waitTsy(tw_nm: string, canskip: boolean) {
		if (! this.#hTw[tw_nm]) {setTimeout(()=> this.#goSafe(), 0); return}

		this.#tsyWaiting = {tw_nm, canskip};
	}

	// ===== fx one-shot 終了待ち（[wait_fx]。[add_fx time>0] のタイマー） =====
	//	分家独自の試作（ANIMATION_RESEARCH.md §7 step 2）。WebGL ランナー（FxRunner）からの
	//	終了通知は作らず、ScriptMng が [add_fx time=…] の time= をそのままタイマーにする（[quake]
	//	と同型）。ランナーの実際の凍結との数 ms のズレは許容（[add_fx] は通常 [lay] 直後で画像
	//	ロード済み）。fx は store 経由なので撤去（[clear_fx]/[clear_lay]/ページ演じ直し）で
	//	<canvas> が unmount → rAF ごと片付く。ここが持つのは「待ち合わせ」だけ（[wait_tsy] と同じ役回り）。
	//
	//	name は名前付き fx のみ（無名の #fxN は store 内で採番されエンジンからは見えない＝'' 扱い。
	//	無名 fx は [wait_fx layer=…] でまとめて待つ）。レイヤ照合は具体レイヤ名へ解決せず、
	//	[add_fx] 側の layer= セレクタ（省略=全レイヤ=null）同士の交差で判定する（試作の割り切り。
	//	[add_fx layer=省略] のあと [wait_fx layer=me] は「me にも載っている」とみなして待つ）
	#aFxTimer: {id: number; timer: ReturnType<typeof setTimeout>; endAt: number; paused: {remainMs: number} | null; aLayNm: readonly string[] | null; page: T_PAGE_BOTH; name: string}[] = [];
	#fxTimerSeq = 0;
	#fxWaiting: {ids: Set<number>; canskip: boolean} | undefined;	// [wait_fx]で待っている最中か（[wait_tsy]の複数版）

	// [add_fx time>0] で1件張る。time=0（無限＝常時ゆらぎ）は終わりが無いので [wait_fx] の対象外
	#addFxTimer(act: Extract<T_ENGINE_ACTION, {t: 'addFx'}>) {
		if (act.fx.time <= 0) return;
		const id = ++this.#fxTimerSeq;
		const timer = setTimeout(()=> this.#endFxTimer(id), act.fx.time);
		this.#aFxTimer.push({id, timer, endAt: Date.now() + act.fx.time, paused: null,
			aLayNm: act.aLayNm, page: act.page, name: act.fx.name});
	}
	// [pause_fx]/[resume_fx]：一致タイマーを止める/戻す（残時間を保持。FxRunner の rAF 凍結と対）
	#pauseFxTimers(match: (t: {aLayNm: readonly string[] | null; name: string})=> boolean, paused: boolean) {
		const now = Date.now();
		for (const t of this.#aFxTimer) {
			if (! match(t)) continue;
			if (paused) {
				if (t.paused) continue;
				clearTimeout(t.timer);
				t.paused = {remainMs: Math.max(0, t.endAt - now)};
			}
			else {
				if (! t.paused) continue;
				const {remainMs} = t.paused;
				t.paused = null;
				t.endAt = now + remainMs;
				t.timer = setTimeout(()=> this.#endFxTimer(t.id), remainMs);
			}
		}
	}
	#endFxTimer(id: number) {
		const i = this.#aFxTimer.findIndex(t=> t.id === id);
		if (i >= 0) {clearTimeout(this.#aFxTimer[i]!.timer); this.#aFxTimer.splice(i, 1)}

		if (! this.#fxWaiting) return;
		this.#fxWaiting.ids.delete(id);
		if (this.#fxWaiting.ids.size > 0) return;
		this.#fxWaiting = undefined;
		setTimeout(()=> this.#goSafe(), 0);	// #onTsyEnd() と同じく #busy が下りてから回す
	}
	// [clear_fx]/[clear_lay]/ページ演じ直しの replace() でタイマーも落とす。
	//	[wait_fx]待機中は #runStep() が止まり [clear_fx] 等は来ないので #fxWaiting は触らない
	//	（[tsy] の #stopTsyByLayer と同じ前提。ANIMATION_RESEARCH.md §7）
	#dropFxTimers(match: (t: {aLayNm: readonly string[] | null; page: T_PAGE_BOTH; name: string})=> boolean) {
		for (let i = this.#aFxTimer.length; --i >= 0;) {
			const t = this.#aFxTimer[i]!;
			if (! match(t)) continue;
			clearTimeout(t.timer);
			this.#aFxTimer.splice(i, 1);
		}
	}
	// [wait_fx]：セレクタ一致の未経過タイマーが無ければ待たずに続きへ（[wait_tsy] と同じ）
	#waitFx(aLayNm: readonly string[] | null, names: readonly string[] | null, canskip: boolean) {
		const hit = this.#aFxTimer.filter(t=> ScriptMng.#fxMatch(t, aLayNm, names));
		if (hit.length === 0) {setTimeout(()=> this.#goSafe(), 0); return}

		this.#fxWaiting = {ids: new Set(hit.map(t=> t.id)), canskip};
	}
	// [wait_fx]/[clear_fx] のセレクタ照合。qNames/qLayNm は null で「全部」
	static #fxMatch(t: {aLayNm: readonly string[] | null; name: string}, qLayNm: readonly string[] | null, qNames: readonly string[] | null): boolean {
		if (qNames && (! t.name || ! qNames.includes(t.name))) return false;	// name=指定時は名前付きの一致だけ
		if (qLayNm && t.aLayNm && ! t.aLayNm.some(n=> qLayNm.includes(n))) return false;	// 両方具体ならレイヤ名の交差
		return true;
	}
	// [wait_fx canskip=true]中のクリック：残りタイマーを全部畳んで続行（#endWait と同じ考え方）
	#skipFxWait() {
		if (! this.#fxWaiting) return;
		for (const id of this.#fxWaiting.ids) {
			const i = this.#aFxTimer.findIndex(t=> t.id === id);
			if (i >= 0) {clearTimeout(this.#aFxTimer[i]!.timer); this.#aFxTimer.splice(i, 1)}
		}
		this.#fxWaiting = undefined;
		this.#goSafe();
	}

	// ===== ＢＧＭ・効果音（[playse]/[playbgm]・[ws]/[wl]・[fadese]系・[wf]/[wb]） =====
	//	実際にAudioContext/GainNodeを操作するのはSndMng（ts/SndMng.ts）。ここは[trans]/[tsy]と同じ
	//	「待ち合わせを持つのはScriptMngで、ScriptEngineは属性の解釈と変数の帳簿付けだけ」という
	//	既存の設計に揃えてある

	// [playse]/[playbgm]の本体。パス解決してSndMngへ渡す。onStopは自然終了・明示停止どちらでも
	//	必ず1回呼ばれるので、非同期にしか倒せないtmp:playingの後始末をここで行う
	async #playSnd(act: Extract<T_ENGINE_ACTION, {t: 'playSnd'}>) {
		// buf==='BGM'は[playbgm]強制（本家 SoundMng.ts:109-111）。エラー表示のタグ名を
		//	見分ける手掛かりはこれしか残っていないので、ここでは近似で構わない（表示用途のみ）
		const tag = act.buf === 'BGM' ? 'playbgm' : 'playse';
		const src = this.#searchSnd(tag, act.fn);
		if (! src) return;	// 見つからない場合は#searchSndが既にmyTraceで知らせている

		// falseは自然終了/明示停止のonStopで倒すが、trueはここでしか書ける場所が無い
		//	（[bgm]マクロ等が「同じ曲が再生中なら鳴らし直さない」判定に使うsub.sn参照）。
		//	欠けていたため、フレーム画面から戻るたびBGMが頭出しされ直す不具合になっていた
		this.#engine?.setValNochk(`tmp:const.sn.sound.${act.buf}.playing`, true);

		// onStopには**終了時点のバッファ名**が渡される（[xchgbuf]で入れ替わっていることがあるため、
		//	呼び出し時のact.bufをそのまま使わない。SndMng.play()参照）
		await this.#sndMng.play(act.buf, src, act, nowBuf=> {
			this.#engine?.setValNochk(`tmp:const.sn.sound.${nowBuf}.playing`, false);
			// VOICE停止時にBGM音量を素の実効音量へ戻す（本家 SndBuf.ts:505-512 StStopのコンストラクタ。
			//	自然終了・[stopse]・[stop_allse]のどれでもSndBuf.stop()経由でここへ来るので、
			//	発生源ごとに個別対応する必要が無い）
			if (nowBuf === 'VOICE') this.#restoreBgmDuck();
		});
	}
	// VOICE停止時のBGM音量復元（本家 SndBuf.ts:505-512）。vol_mul_talkingは次のBGM開始時の
	//	計算にも使うのでエンジン側の内部値も1へ戻す（resetVolMulTalking()）
	#restoreBgmDuck() {
		const engine = this.#engine;
		if (! engine) return;

		engine.resetVolMulTalking();
		const vn = 'const.sn.sound.BGM.';
		const savevol = Number(engine.getVal(`save:${vn}volume`) ?? 1);
		const sysvol = Number(engine.getVal(`sys:${vn}volume`) ?? 1);
		this.#sndMng.setVol('BGM', savevol * sysvol);
	}
	// [load]/[reload_script]でのBGM/ループ音声復元（本家 SoundMng.playLoopFromSaveObj()）。
	//	save:const.sn.loopPlayingに無いバッファは止め、有るバッファはsave:の帳簿（volume/start_ms/
	//	end_ms/ret_ms）を読んでloop=trueで鳴らし直す。SndMng.play()が既に「同一fnが鳴っていれば
	//	鳴らし直さない」判定を持つので（同じ位置への[reload_script]等）、たまたま一致していれば
	//	実質何もしない
	#restoreLoopSnd(engine: ScriptEngine) {
		let hLP: {[buf: string]: string};
		try {hLP = JSON.parse(String(engine.getVal('save:const.sn.loopPlaying') ?? '{}')) as {[buf: string]: string}}
		catch {hLP = {}}

		// 復元表に無いバッファは止める（本家 playLoopFromSaveObj() の[1]）
		for (const buf of this.#sndMng.bufs()) if (! (buf in hLP)) this.#sndMng.stop(buf);

		// 復元表にあるバッファは鳴らし直す（[2]）。join=falseで投げっぱなし
		//	（#procLoad()自体がスクリプトのfetchで既に非同期なので、ここで待たせる理由が無い）
		for (const [buf, fn] of Object.entries(hLP)) {
			if (! fn) continue;

			const vn = `const.sn.sound.${buf}.`;
			const savevol = Number(engine.getVal(`save:${vn}volume`) ?? 1);
			const sysvol = Number(engine.getVal(`sys:${vn}volume`) ?? 1);
			void this.#playSnd({
				t: 'playSnd', buf, fn, loop: true, volume: savevol * sysvol, speed: 1, pan: 0,
				start_ms: Number(engine.getVal(`save:${vn}start_ms`) ?? 0),
				end_ms: Number(engine.getVal(`save:${vn}end_ms`) ?? MAX_END_MS),
				ret_ms: Number(engine.getVal(`save:${vn}ret_ms`) ?? 0),
				join: false, canskip: false,
			}).catch(this.#catchErr);
		}
	}
	// join=true（既定）経由。デコード完了（＝再生開始）まで#runStep()を待たせる
	async #procSnd(act: Extract<T_ENGINE_ACTION, {t: 'playSnd'}>) {
		try {await this.#playSnd(act)}
		catch (e) {
			this.#procing = false;
			this.myTrace(`[playse] エラー fn:${act.fn} ${String(e)}`, 'E');
			return;
		}
		this.#procing = false;
		this.#goSafe();
	}

	// [ws]/[wl]：再生終了待ち。既に鳴っていない・ループ中なら待たずに続きへ
	//	（本家 tag.html の「loop=trueなら待たない」通り。SndMng.waitEnd()がその判定を持つ）
	#sndWaiting: {buf: string; canskip: boolean; stop: boolean} | undefined;
	#waitSndPlay(buf: string, canskip: boolean, stop: boolean) {
		const done = ()=> {
			if (this.#sndWaiting?.buf !== buf) return;	// [stopse]等で既に打ち切り済み
			this.#sndWaiting = undefined;
			this.#goSafe();
		};
		if (! this.#sndMng.waitEnd(buf, done)) {setTimeout(()=> this.#goSafe(), 0); return}

		this.#sndWaiting = {buf, canskip, stop};
	}
	// [ws]/[wl]待機中のクリックで打ち切る。stop属性がtrueなら鳴っている音も止める
	#skipSndWait() {
		const w = this.#sndWaiting;
		if (! w) return;
		this.#sndWaiting = undefined;
		this.#sndMng.cancelWaitEnd(w.buf);	// 自然終了時のdone()はもう要らない
		if (w.stop) this.#sndMng.stop(w.buf);
		this.#goSafe();
	}

	// [fadese]/[fadebgm]/[fadeoutse]/[fadeoutbgm]の本体（TwでGainNode.gainを動かす。
	//	本家 SndBuf.ts の StPlaying.fade()/StFade と同じ役割だが、状態機械ではなくバッファ名ごとの
	//	レジストリにした。#hTwとは別枠にしてあるのは、[stop_tsy]等の名前空間と混ざらないようにするため）
	readonly #hSndTw: {[buf: string]: {tw: Tw; end: ()=> void}} = Object.create(null);
	#beginFadeSnd(act: Extract<T_ENGINE_ACTION, {t: 'fadeSnd'}>) {
		// 同じバッファへの再フェードは、前のフェードを畳んでから始める（本家は黙って無視するだけだが、
		//	それは指摘済みの不備＝ロード中・フェード中の音量変更が消える。こちらは追随させる）
		this.#hSndTw[act.buf]?.tw.kill();
		// eslint-disable-next-line @typescript-eslint/no-dynamic-delete
		delete this.#hSndTw[act.buf];

		// 終了状態の確定：時間切れでも[wf]/[wb]中のクリックでも必ずここを通すので、
		//	中途半端な音量のまま止まることはない（#runTsy()のend()と同じ考え方）
		const end = ()=> {
			this.#sndMng.setVol(act.buf, act.volume);
			if (act.stop) this.#sndMng.stop(act.buf);
		};

		const gn = this.#sndMng.gainNode(act.buf);
		if (! gn || act.msec <= 0 && act.delay <= 0) {end(); this.#onSndFadeEnd(act.buf); return}

		const onComplete = ()=> {end(); this.#onSndFadeEnd(act.buf)};
		// 既定easeは等速（Twの既定＝GSAP時代のpower1.outから変更）。本家（howlerのfade()）も
		//	線形なので、こちらを本家に揃える形で正とする
		const tw = new Tw(gn.gain).to({value: act.volume}, act.msec).delay(act.delay).onComplete(onComplete).start();
		this.#hSndTw[act.buf] = {tw, end};
	}
	#onSndFadeEnd(buf: string) {
		// eslint-disable-next-line @typescript-eslint/no-dynamic-delete
		delete this.#hSndTw[buf];
		if (this.#sndFadeWaiting?.buf !== buf) return;

		this.#sndFadeWaiting = undefined;
		// #runStep()の中から呼ばれる場合がある（[fadese time=0]直後の[wf]等）ので、
		//	#busyが下りるのを待ってから回す
		setTimeout(()=> this.#goSafe(), 0);
	}
	// [wf]/[wb]：フェード終了待ち。動いているフェードが無ければ待たずに続きへ
	#sndFadeWaiting: {buf: string; canskip: boolean} | undefined;
	#waitFadeSnd(buf: string, canskip: boolean) {
		if (! this.#hSndTw[buf]) {setTimeout(()=> this.#goSafe(), 0); return}

		this.#sndFadeWaiting = {buf, canskip};
	}
	// [wf]/[wb]待機中のクリックで打ち切る。終了状態へ送ってから続行する
	#skipSndFadeWait() {
		const w = this.#sndFadeWaiting;
		if (! w) return;

		this.#killSndFade(w.buf);
	}
	// 走行中のフェードを即座に終了状態へ送って畳む（フェードが無ければ何もしない）。
	//	[wf]/[wb]待機中のクリック打ち切りと、[xchgbuf]が実体を動かす前の下ごしらえの両方から使う
	//	（後者は#hSndTwのend()がact.buf/act.buf2をクロージャ捕捉したままなので、
	//	交換を跨がせると別バッファへ音量が当たってしまうため先に確定させておく）
	#killSndFade(buf: string) {
		const ti = this.#hSndTw[buf];
		if (ti) {ti.tw.kill(); ti.end()}
		this.#onSndFadeEnd(buf);
	}

	// [wv]：動画再生終了待ち（本家 SpritesMng.wv()）。**レイヤ名でなくファイル名（fn）**で
	//	<video>を探す（GrpLayerがdata-fn属性に論理名を出している）。無い・ループ中・
	//	既に終わっていれば待たず、stop指定なら（本家 stopVideo()相当で）その場で確定させる
	#videoWaiting: {fn: string; canskip: boolean; stop: boolean} | undefined;
	#findVideo(fn: string): HTMLVideoElement | undefined {
		return this.#heStageBox?.querySelector<HTMLVideoElement>(`video[data-fn="${CSS.escape(fn)}"]`) ?? undefined;
	}
	// tries：直前の[lay fn=…]が同じstep()内でストアを更新しただけの場合、Reactの描画コミット
	//	（GrpLayerが実際に<video>をマウントする。特にStage.tsx初回マウント直後は
	//	lazy()チャンク読込待ちで遅れうる）がまだ済んでいないことがある。
	//	見つからない間はrAFで数フレームだけ待ち直し、それでも見つからなければ
	//	「そのfnは置かれていない」とみなして待たない（本家 tag.htmlの「無ければ待たない」通り）
	#waitVideoPlay(fn: string, canskip: boolean, stop: boolean, tries = 30) {
		const ve = this.#findVideo(fn);
		if (! ve) {
			if (tries > 0) {requestAnimationFrame(()=> this.#waitVideoPlay(fn, canskip, stop, tries - 1)); return}
			this.#goSafe();
			return;
		}
		if (ve.loop || ve.ended) {
			if (ve.ended && stop) this.#stopVideo(ve);
			this.#goSafe();
			return;
		}

		// 'ended'イベント購読ではなくrAFでの毎フレームポーリングにする。理由：
		//	[trans layer=]は対象外レイヤ（動画含む）をback側divにも複製表示する
		//	（Stage.tsx #trans対象外レイヤの合成、本家 LayerMng.ts:648相当）ため、
		//	同じ論理名(nm)のGrpLayerがfore/back両divに一時的に2つ存在し、videoタグも
		//	複製される。本家はpixi.jsのSpriteがHTMLVideoElementを直接参照し続けるため
		//	同一要素のままだが、こちらはReactでDOM要素そのものを描画するため、trans完了時に
		//	どちらかがアンマウントされると、最初に見つけたvideo要素へ張った'ended'リスナーが
		//	消えて二度と発火しない（動画が終わっても[wv]が永久に進まなくなる不具合の原因だった）。
		//	`#findVideo()`を毎フレーム呼び直せば、要素が差し替わっても常に最新のものを見られる
		this.#videoWaiting = {fn, canskip, stop};
		const poll = ()=> {
			if (this.#videoWaiting?.fn !== fn) return;	// [wv]待機中のクリックで既に打ち切り済み
			const cur = this.#findVideo(fn);
			if (! cur || cur.loop || cur.ended) {
				this.#videoWaiting = undefined;
				if (cur?.ended && stop) this.#stopVideo(cur);
				this.#goSafe();
				return;
			}
			requestAnimationFrame(poll);
		};
		requestAnimationFrame(poll);
	}
	// [wv]待機中のクリックで打ち切る。'ended'は{once:true}なので、まだ発火していなければ
	//	そのまま残っても無害（done()の#videoWaiting?.fn!==fnガードが二重発火を防ぐ）
	#skipVideoWait() {
		const w = this.#videoWaiting;
		if (! w) return;

		this.#videoWaiting = undefined;
		if (w.stop) {
			const ve = this.#findVideo(w.fn);
			if (ve) this.#stopVideo(ve);
		}
		this.#goSafe();
	}
	// 本家 SpritesMng.stopVideo()相当。#hFn2hveからの先削除によるリークは移植しない（todo.md参照）
	#stopVideo(ve: HTMLVideoElement) {
		ve.pause();
		ve.currentTime = ve.duration;
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
		// **ページの先頭**（本文がまだ出ていない状態）を控える。停止点でページログへ積む。
		//	??= なのは、1ページの途中で一旦返る経路（[add_frame]・[snapshot]・スクリプト切替）から
		//	戻ってきたときに取り直さないため
		this.#pageStart ??= {...engine.nowScrIdx(), mark: this.#mkMark(), clearOnResume: engine.clearOnResume};
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
				if (last?.t === 'waitFx') {this.#waitFx(last.aLayNm, last.names, last.canskip); return}
				if (last?.t === 'waitQuake') {this.#waitQuake(last.canskip); return}
				if (last?.t === 'waitSnd') {this.#waitSndPlay(last.buf, last.canskip, last.stop); return}
				if (last?.t === 'waitFade') {this.#waitFadeSnd(last.buf, last.canskip); return}
				if (last?.t === 'waitVideo') {this.#waitVideoPlay(last.fn, last.canskip, last.stop); return}
				// [playse join=true]（既定）：ロード（デコード）完了まで待ってから続きを回す
				if (last?.t === 'playSnd' && last.join) {
					this.#procing = true;
					this.#procSnd(last).catch(this.#catchErr);
					return;
				}
				// HTMLフレーム：DOMを触った結果を組み込み変数へ書き戻してから続きを回す。
				//	[add_frame]はHTMLのfetchが要るので非同期、[let_frame]は同期だが、
				//	どちらも「書き戻し→再開」の順を守りたいのでここで一旦返る
				if (last?.t === 'addFrame' || last?.t === 'letFrame') {
					this.#procing = true;
					this.#procFrame(last).catch(this.#catchErr);
					return;
				}
				// [loadplugin join=true]（既定）・[snapshot]も同じ形：DOM絡みの非同期が終わってから続きを回す
				if (last?.t === 'loadPlugin' || last?.t === 'snapshot') {
					this.#procing = true;
					this.#procDom(last).catch(this.#catchErr);
					return;
				}
				// しおりからの復元。スクリプトの読み直し（fetch）が要るのでここで一旦返る
				if (last?.t === 'load' || last?.t === 'reloadScript') {
					this.#procing = true;
					this.#procLoad(last).catch(this.#catchErr);
					return;
				}
				// [page to=…]も同じ形（移動先のページをしおりから演じ直す）
				if (last?.t === 'pageTo') {
					this.#procing = true;
					this.#procPage(last.to).catch(this.#catchErr);
					return;
				}
				// プラグインが addTag で登録したタグ。同期で完了するかisWait（要resume）かは
				//	呼んでみないと分からないので、#procPlgTag()内で判定する
				if (last?.t === 'plgTag') {this.#procPlgTag(last); return}
				// [lay]/[add_lay]がプラグインレイヤーの時のisWait対応（本家 Pages.lay()の戻り値、
				//	plgTagと同じ枠組み）。[add_lay]は表裏2個分のlayPlgが積まれ、かつ#applyLayOrder()が
				//	moveLayをlayPlgの後に積むことがあるため、lastではなくaAct全体にlayPlgが
				//	含まれるかで見る（'stop'を返すのは[lay]/[add_lay]がisPlgの時だけなので、
				//	この判定は他の'stop'要因と衝突しない）
				if (aAct.some(a=> a.t === 'layPlg')) {this.#procPlgLay(aAct); return}
				if (last?.t !== 'loadScript') {
					if (engine.atEnd) this.myTrace(`スクリプト終端です fn:${engine.fn}`, 'I');
					// 停止点で読んでいる間に、次に必要になりそうな画像を先に温めておく
					else this.#preloadUpcomingPics();
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

	// addTagで登録されたタグの実行（本家 hTag[name](hArg) 相当の唯一の呼び出し口。
	//	ScriptEngine.step()はhasPlgTag()で名前の存在だけ見て純粋なままplgTagアクションを
	//	返すので、実際の関数呼び出し＝副作用が起きうる場所はここに閉じ込める）。
	//	戻り値isWait（本家 Pages.lay()の戻り値、[lay]のisWait対応と同じ枠組み）がtrueなら
	//	#procing=trueのまま待ち、プラグインが後でresumePlg()を呼ぶまで進めない
	#procPlgTag(act: Extract<T_ENGINE_ACTION, {t: 'plgTag'}>) {
		const fnc = getPlgTag(act.name);
		if (! fnc) {this.#goSafe(); return}	// 想定外（テスト間でレジストリをクリアした等）。無言で止まるのを避ける

		this.#procing = true;
		let isWait: boolean;
		try {
			isWait = fnc(act.hArg as unknown as TArg);
		} catch (e) {
			this.#procing = false;
			this.myTrace(`[${act.name}] エラー ${String(e)}`, 'ET');
			return;
		}
		if (! isWait) {this.#procing = false; this.#goSafe()}
	}

	// [lay]/[add_lay]がプラグインレイヤーの時の実行（本家 Pages.lay()の f.lay(hArg)||b.lay(hArg) 相当。
	//	唯一の呼び出し口＝#applyAction()の'layPlg'は表示に関する副作用を持たない）。
	//	[add_lay]は表裏2個分のlayPlgがaActに積まれうるので、含まれる分すべてを呼びORで合成する
	//	（[lay]は常に1個）。戻り値isWaitがtrueなら#procing=trueのまま待ち、
	//	プラグインが後でresumePlg()を呼ぶまで進めない
	#procPlgLay(aAct: T_ENGINE_ACTION[]) {
		this.#procing = true;
		let isWait = false;
		try {
			for (const act of aAct) {
				if (act.t !== 'layPlg') continue;
				isWait = this.#plgLayMng.lay(act.nm, this.#pageIdx(act.page), act.hArg) || isWait;
			}
		} catch (e) {
			this.#procing = false;
			this.myTrace(`[lay] エラー ${String(e)}`, 'ET');
			return;
		}
		if (! isWait) {this.#procing = false; this.#goSafe()}
	}

	// [add_frame]/[let_frame]：DOMを触り、その結果を組み込み変数へ書き戻してから続きを回す。
	//	#runStep()の外（#busyが下りた後）から呼ばれるので、そのままgo()して良い
	async #procFrame(act: Extract<T_ENGINE_ACTION, {t: 'addFrame' | 'letFrame'}>) {
		try {
			if (act.t === 'addFrame') this.#setVals(await this.#frmMng.add(act.id, act.src, act.sty));
			else this.#setVals({[`const.sn.frm.${act.id}.${act.var_name}`]:
				this.#frmMng.get(act.id, act.var_name, act.fnc) as string});
		} catch (e) {
			this.#procing = false;
			this.myTrace(`[${act.t === 'addFrame' ? 'add_frame' : 'let_frame'}] エラー id:${act.id} ${String(e)}`, 'ET');
			return;
		}
		this.#procing = false;
		this.#goSafe();
	}
	// [load]／[reload_script]：しおりから復元して、その位置のスクリプトを読み直してから続きを回す
	//	（本家 ScriptIterator loadFromMark()）。#procFrame()と同じく#busyが下りた後に呼ばれる
	async #procLoad(act: Extract<T_ENGINE_ACTION, {t: 'load' | 'reloadScript'}>) {
		const engine = this.#engine;
		if (! engine) {this.#procing = false; return}

		try {
			// [reload_script]は「最後の[record_place]位置」＝#mark。[load]は保存済みのしおり
			const mark = act.t === 'reloadScript' ? this.#mark : this.#saveMng.getMark(act.place);
			if (! mark) throw act.t === 'reloadScript'
				? '[record_place]がまだ実行されていません'
				: `place=${String(act.place)} は存在しません`;

			engine.restoreMarkPart(mark);
			this.#restoreLoopSnd(engine);		// BGM等の復元（本家 SoundMng.playLoopFromSaveObj()）
			this.$fncs.replace(mark.sPages);	// 表裏ページを丸ごと戻す
			this.#plgLayMng.setPageState(this.$fncs.getForeIdx(), false);	// 復元後の foreIdx を先に伝える
			this.#plgLayMng.playback(mark.hPlgLay, []);
			this.#pageLog.clear();				// 読み戻し履歴は繋がらないので捨てる
			this.#pageStart = undefined;
			this.#stopped = false;

			// do_rec（既定true）：ロードした状態を次の[record_place]代わりの#markとして持たせる。
			//	[record_place]を挟まず[save]しても、ロード直後の状態が保存されるように
			//	（本家 ScriptIterator.ts:1434）。[reload_script]は対象外（本家もdo_rec=falseで呼ぶ）
			if (act.t === 'load' && act.doRec !== false) this.#mark = {...mark};

			// index指定時：保存時点の再開位置ではなく、fn（省略時は現在のスクリプト）のindex位置
			//	（トークン番号）へ直接ジャンプする（本家 ScriptIterator.ts:1454「ページ移動用」）。
			//	labelは無視される。**通常の再開位置（save:const.sn.scriptFn/scriptIdx）は見ない**
			if (act.t === 'load' && act.index !== undefined) {
				const scr2 = await this.#getScript(act.fn || engine.fn);
				engine.switchScript(scr2, '', act.index);
				this.#procing = false;
				this.#goSafe();
				return;
			}

			// 再開位置。**スクリプトは必ず読み直す**（本家も「吉里吉里に動作を合わせる」ため
			//	キャッシュを捨てる。[reload_script]はファイルが編集された後の読み直しが目的なので必須。
			//	本家 ScriptIterator.ts:1487-1507 は派生ファイルの有無を都度判定して該当分だけ
			//	キャッシュ破棄する専用処理を持つが、bluesnovelは元々ここで無条件に全キャッシュを
			//	都度破棄するので、その専用処理は不要＝派生ファイルも自然に読み直される）
			const fn = String(engine.getVal('save:const.sn.scriptFn') ?? '');
			const idx = Number(engine.getVal('save:const.sn.scriptIdx') ?? 0);
			if (! fn) throw '再開位置（save:const.sn.scriptFn）が空です';

			delete this.#hScript[fn];	// eslint-disable-line @typescript-eslint/no-dynamic-delete
			const scr = await this.#getScript(fn);

			// [load fn=… label=…]はセットで指定する決まり（エンジン側で検査済み）。
			//	指定時は「復元した状態のまま、そのラベルをサブルーチンコールする」（本家と同じ）
			if (act.t === 'load' && act.label) {
				engine.switchScript(scr, '', idx);
				const scrCall = act.fn && act.fn !== fn ? await this.#getScript(act.fn) : scr;
				engine.callToScript(scrCall, act.label, false);	// 通常のcallと同じ挙動が要る（[event]/[button]のcall予約とは違い一時的な割り込みではない）
			}
			else engine.switchScript(scr, '', idx);
		} catch (e) {
			this.#procing = false;
			this.myTrace(`[${act.t === 'reloadScript' ? 'reload_script' : 'load'}] ${String(e)}`, 'ET');
			return;
		}
		this.#procing = false;
		this.#goSafe();
	}

	// [loadplugin join=true]／[snapshot]：DOM絡みの非同期処理を終えてから続きを回す。
	//	#procFrame()と同じく#runStep()の外（#busyが下りた後）から呼ばれる
	async #procDom(act: Extract<T_ENGINE_ACTION, {t: 'loadPlugin' | 'snapshot'}>) {
		try {
			if (act.t === 'loadPlugin') await this.#loadPlugin(act.fn);
			else await this.#snapshot(act);
		} catch (e) {
			// 撮影・css読込が失敗してもゲームは続ける（'ET'ではなく'E'）
			this.myTrace(`[${act.t === 'loadPlugin' ? 'loadplugin' : 'snapshot'}] ${String(e)}`, 'E');
		}
		this.#procing = false;
		this.#goSafe();
	}

	// [loadplugin]：cssを読んで<style>としてページへ足す（本家 LayerMng.ts:416 #loadplugin()）。
	//	本家同様パス解決（path.json）は通さず、書かれたURLをそのままfetchする
	async #loadPlugin(fn: string) {
		const res = await this.sys.fetch(fn);
		if (! res.ok) throw `cssが取得できません fn:${fn}`;

		const st = document.createElement('style');
		st.textContent = await res.text();
		document.head.appendChild(st);
	}

	// [snapshot]：ステージを画像にして保存する（本家 LayerMng.ts:338 #snapshot()）。
	//	画像化の中身は Snapshot.ts（DOM→SVG→canvas）。
	//
	//	**行き先はfnの書き方で2つ**（本家 LayerMng.ts:340-344 の組み立てそのまま）：
	//	・`userdata:/…`	→ セーブデータと同じ置き場（SaveMng）。**日時も拡張子も足さない**ので、
	//					  シナリオが決めた名前で後から読み返せる（しおりのサムネイル用途）
	//	・それ以外		→ ダウンロード（本家の`downloads:/`＝ダウンロードフォルダ。
	//					  ブラウザではDLという形でユーザーに渡る）。名前の後ろに日時が付く
	async #snapshot(act: Extract<T_ENGINE_ACTION, {t: 'snapshot'}>) {
		const el = this.#heStageBox;
		if (! el) throw 'ステージがまだ表示されていません';

		const toUD = act.fn.startsWith(PROTOCOL_USERDATA);
		const fn = toUD ? act.fn : dlFn(act.fn || 'snapshot');
		const mime = mimeOfFn(fn);

		const {stageW, stageH} = CmnLib;
		const width		= act.width || stageW;
		const height	= act.height || stageH;

		// 素朴な撮影（全レイヤ・表ページ・背景色未指定）に限り、アプリ版はネイティブ撮影
		//	（SysBase.capturePage＝Electronのcapturepage。HTMLフレームの中身も写る）を試す。
		//	レイヤ絞り込み・裏ページ・背景色指定はDOM要素の選別が要るためcapturePageでは
		//	実現できない（画素をそのまま撮るだけ）ので、その場合と非対応（web版）はDOM→SVG方式へ
		const dataUrl = act.aLayNm === null && act.page === 'fore' && act.b_color === undefined
			? await this.sys.capturePage(this.#rectOfStageBox(el), width, height, mime)
			: '';
		const dataUrl2 = dataUrl || await snapshotToPng({
			el,
			sw		: stageW,
			sh		: stageH,
			width,
			height,
			// 未指定はステージと同じ黒（本家も背景色の既定はステージの背景色）。
			//	指定時は0xAARRGGBB＝高2桁がアルファ（0x0で完全透過）。**本家web版はここが逆**
			//	（LayerMng.ts:383 が透過2桁アリのときbackgroundAlphaを0にする）だが、
			//	tag.htmlの記述（0x0で透過・0xFF000000が不透明な黒）に合わせた
			bgColor	: act.b_color === undefined ? 'black' : rgbaOf(act.b_color),
			page	: act.page,
			aLayNm	: act.aLayNm,
			mime,
			smoothing: act.smoothing,
		});
		if (toUD) this.#saveMng.putFile(fn, dataUrl2); else savePic(fn, dataUrl2);
	}

	// capturePage（Electron主処理）へ渡す撮影範囲。stageRef自体がtransform: scaleを持つ要素
	//	（Stage.tsx styStage）なので、getBoundingClientRect()が拡縮後の実際の画面上矩形になる
	#rectOfStageBox(el: HTMLElement) {
		const r = el.getBoundingClientRect();
		return {x: Math.round(r.x), y: Math.round(r.y), width: Math.round(r.width), height: Math.round(r.height)};
	}

	#setVals(h: {[name: string]: unknown}) {
		for (const [k, v] of Object.entries(h)) this.#engine?.setValNochk(k, v as string);
	}

	// [l]/[p]の待ちマークの画像（本家 LayerMng.ts:159 と ConfigBase.existsBreakline）。
	//	`breakline`/`breakpage`という名の画像・アニメpngがプロジェクトにあればそれを出す
	//	（無ければ試作の絵文字のまま）。**停止点ごとに引くので結果を覚えておく**
	#hBreak: {[kind: string]: string} = Object.create(null);
	#srcBreak(kind: 'l' | 'p'): string {
		const fn = kind === 'l' ? 'breakline' : 'breakpage';
		// matchPathで「有るか」を先に見る（searchPathは無いと例外を投げるため）
		return this.#hBreak[kind] ??= this.sys.cfg.matchPath(`^${fn}$`, SEARCH_PATH_ARG_EXT.SP_GSM).length > 0
			? this.sys.cfg.searchPath(fn, SEARCH_PATH_ARG_EXT.SP_GSM)
			: '';
	}

	// 画像のパス解決（path.json）。見つからなければ知らせて空を返す。
	//	1枚の画像が無いだけでゲームごと止めるのはやり過ぎなので、'ET'ではなく'E'（表示のみ）
	#searchPic(tag: string, fn: string): string {
		if (! fn) return '';
		// `userdata:/…`は path.json ではなくセーブ層から引く（[snapshot fn='userdata:/…']が
		//	置いた絵。しおり画面が[lay fn='userdata:/…']でサムネイルを出す形）。
		//	**中身はdata URLなのでそのまま<img src=>にできる**
		if (fn.startsWith(PROTOCOL_USERDATA)) {
			const src = this.#saveMng.getFile(fn);
			if (src) return src;

			this.myTrace(`[${tag}] 保存された画像がありません fn:${fn}`, 'E');
			return '';
		}
		try {return this.sys.cfg.searchPath(fn, SEARCH_PATH_ARG_EXT.SP_GSM)}
		catch (e) {
			this.myTrace(`[${tag}] 画像が見つかりません fn:${fn} ${String(e)}`, 'E');
			return '';
		}
	}

	// 音声ファイルのパス解決（#searchPicと同型）。見つからなくても'ET'ではなく'E'
	//	（効果音1つが無いだけでゲームごと止めるのはやり過ぎ）
	#searchSnd(tag: string, fn: string): string {
		if (! fn) return '';
		try {return this.sys.cfg.searchPath(fn, SEARCH_PATH_ARG_EXT.SOUND)}
		catch (e) {
			this.myTrace(`[${tag}] 音声ファイルが見つかりません fn:${fn} ${String(e)}`, 'E');
			return '';
		}
	}

	// crypto:true時のみ呼ぶ（呼び出し元のchgPicケースが既に分岐済み）。
	//	fetchしたバイナリをsys.decAB()へ通し、Blob URLへ差し替える
	#decryptPic(url: string): Promise<string> {
		return decryptPicUrl(url, this.sys.crypto, this.sys.fetch, (ab: ArrayBuffer)=> this.sys.decAB(ab));
	}
	// chgPicの非同期解決が追い越されたとき、古い方でstoreを上書きしないための世代カウンタ
	//	（key: `${nm}:${page}`）
	readonly #picReqSeq = new Map<string, number>();

	// 画像の先読み（本家SpritesMngのロード済みキャッシュ相当。todo.md参照）。crypto:true構成は
	//	fetch→復号→Blob URL化に時間がかかり、[lay fn=]を跨いで一瞬空白が出ていた
	//	（chgPicケースの#decryptPic呼び出し箇所のコメント参照）。次の停止点までに出てきそうな
	//	画像を停止直後（＝ユーザーがクリックする前）に先に温めておくことで、実際にchgPicが
	//	来たときには既に解決済み（or 解決中）のPromiseを使い回せるようにする。
	//	non-crypto構成はブラウザの標準HTTPキャッシュに任せる（new Imageで先にリクエストするだけ）
	readonly #picPreloadCache = new Map<string, Promise<string>>();
	#preloadUpcomingPics() {
		const engine = this.#engine;
		if (! engine) return;

		for (const fn of new Set(engine.peekUpcomingPicFn())) {
			let url: string;
			try {url = this.sys.cfg.searchPath(fn, SEARCH_PATH_ARG_EXT.SP_GSM)}
			catch {continue}	// 先読みでは黙って諦める（実際に使われる時にあらためてエラーを出す）

			if (! this.sys.crypto) {new Image().src = url; continue}
			if (! this.#picPreloadCache.has(url)) this.#picPreloadCache.set(url, this.#decryptPic(url));
		}
	}

	#applyAction(act: T_ENGINE_ACTION) {
		switch (act.t) {
		case 'addLay':
			// [lay]で変えられる見た目（visible/alpha/left/top/rotation/scale_*）は初期値を持たせない。
			//	未指定＝各レイヤのCSS既定に従う（Stage.tsx T_LAY_STY のコメント参照）
			switch (act.cls) {
			case 'grp':
				this.$fncs.addLayer({cls: 'grp', nm: act.nm, fn: '', src: '', isSheet: false, isMovie: false, aFace: []});	// aFaceは[lay face=...]で後から入る（初期は差分合成なし）
				break;
			case 'txt':
				this.$fncs.addLayer({cls: 'txt', nm: act.nm, str: '', aCh: [], aBtn: [], b_alpha: 1, enabled: true});	// 文字レイヤはUIコンテナとしてaBtnを初期化。b_alphaは[lay b_alpha=...]未指定時は不透明（1）が既定
				break;
			default:
				// プラグインレイヤー。storeには「在ること」と共通の見た目だけを置き、
				//	中身（3Dシーン等）はDOM側（#plgLayMng）が本家Pages同様fore/back 2個の
				//	Layerインスタンスとして抱える
				this.$fncs.addLayer({cls: act.cls, nm: act.nm, plg: true});
				this.#plgLayMng.add(act.nm, act.cls);
				break;
			}
			break;
		case 'layPlg':
			// 実処理は#runStep()側（#procPlgLay()）。表示への影響は無い
			break;
		case 'chgPic': {
			// **画像パスの解決はここ**（描画時ではなく）。searchPath()はサーチパスに無ければ
			//	例外を投げるが、renderの中で投げるとReactごと落ちるので、
			//	シナリオ実行時に解決してエラーはデバッグ表示へ出す。GrpLayerは出来上がったURLを描くだけ
			const src = this.#searchPic('lay', act.fn);
			// アニメpngシート／動画判定は**Blob URL化前のここで確定**させ、ストアへ渡す（GrpLayer.tsx参照）。
			//	fn（論理名）はアニメpngシートでは拡張子を持たず（例："anime"）、crypto構成ではsrcも
			//	Blob URLに化けて拡張子情報を失うため、どちらでも判定できるのはこのタイミングだけ
			const isSheet = src.endsWith('.json');
			const isMovie = /\.(?:mp4|webm)$/i.test(src);
			// act.aFaceがundefined＝[lay face=...]省略。ストア側でも省略扱いとし、
			//	パス解決自体をスキップして直前のfaceをそのまま残す。
			//	isSheetは基本画像（isSheet変数）と同じ判定：各要素は等しくアニメpngシート候補
			//	（本家 SpritesMng.#csv2Sprites はcsvの各要素を拡張子で個別判定する。先頭限定ではない）
			const aFace = act.aFace?.map(f=> {
				const faceSrc = this.#searchPic('add_face', f.fn);
				return {...f, src: faceSrc, isSheet: faceSrc.endsWith('.json'), isMovie: /\.(?:mp4|webm)$/i.test(faceSrc)};
			});
			// exactOptionalPropertyTypes: true のため、undefinedの時はaFaceキー自体を省略する
			//	（chgPicはaFaceキー無しなら直前の値を維持する）
			if (! this.sys.crypto) {
				this.$fncs.chgPic({nm: act.nm, page: act.page, fn: act.fn, src, isSheet, isMovie, ...(aFace && {aFace})});
				break;
			}

			// crypto時：復号にfetchを挟むため同期では返せない。まず空で確定させ、
			//	Blob URL化でき次第差し替える（#preloadUpcomingPics()が事前に温めていれば、
			//	ここでは新規fetchせず解決済み・解決中のPromiseを使い回すだけで済み、空白が縮む）。
			//	連続して同じレイヤへ[lay fn=]が来た場合、後発を追い越して古い方が
			//	上書きしないよう世代カウンタで捨てる
			const key = `${act.nm}:${act.page}`;
			const seq = (this.#picReqSeq.get(key) ?? 0) + 1;
			this.#picReqSeq.set(key, seq);
			this.$fncs.chgPic({nm: act.nm, page: act.page, fn: act.fn, src: '', isSheet, isMovie,
				...(aFace && {aFace: aFace.map(f=> ({...f, src: ''}))})});
			const takePreloaded = (u: string)=> {
				const p = this.#picPreloadCache.get(u);
				if (p) this.#picPreloadCache.delete(u);	// 使い終わったら捨てる（無制限に溜めない）
				return p ?? this.#decryptPic(u);
			};
			void Promise.all([takePreloaded(src), ...(aFace?.map(f=> takePreloaded(f.src)) ?? [])])
			.then(([dSrc, ...aFaceSrc])=> {
				if (this.#picReqSeq.get(key) !== seq) return;	// 追い越された
				this.$fncs.chgPic({nm: act.nm, page: act.page, fn: act.fn, src: dSrc, isSheet, isMovie,
					...(aFace && {aFace: aFace.map((f, i)=> ({...f, src: aFaceSrc[i] ?? ''}))})});
			});
			break;
		}
		case 'chgBAlpha':
			this.$fncs.chgBAlpha({nm: act.nm, page: act.page,
				...(act.b_alpha === undefined ? {} : {b_alpha: act.b_alpha}),
				...(act.isFixed === undefined ? {} : {isFixed: act.isFixed}),
			});
			break;
		case 'chgBPic':
			// 文字レイヤ背後の枠画像。画像レイヤ（chgPic）と同じくここでパスを解決する
			this.$fncs.chgBPic({nm: act.nm, page: act.page, fn: act.fn,
				src: act.fn ? this.#searchPic('lay b_pic', act.fn) : ''});
			break;
		case 'chgBackClear':
			this.$fncs.chgBackClear({nm: act.nm, page: act.page});
			break;
		case 'finishTrans':
			// [finish_trans]。動いている演出が無ければ何も起きない
			this.#finishTrans();
			break;
		case 'trans': {
			// 前の[trans]がまだ演出中なら、まず終わらせて表裏を確定させる（本家 ScriptIterator.ts:504
			//	#setTag2FinishTrans）。そうしないと交換されないまま次の[trans]が同じ裏ページを
			//	書き換え、前のシーンが表に出ないまま消える。
			//	**本家はこの畳み込みを[quake]/[stop_quake]/[add_filter]でも行う**が、それは
			//	[quake]が[trans]と同じトゥイーン枠を使い回す都合であって意図ではないので、
			//	枠を分けたこちらでは[trans]自身と[finish_trans]だけに掛ける
			this.#finishTrans();
			const oldForeIdx = this.$fncs.getForeIdx();	// flip前に読む（PlgLayMng.finishTrans()の引数）
			// time=0ならstartTrans()の中で即交換される（演出無し＝待つものも残らない）。
			//	ルール画像のパス解決はここ（[lay fn=]等と同じ。見つからなければ知らせてクロスフェードへ落ちる）
			this.$fncs.startTrans({aLayNm: act.aLayNm, time: act.time,
				...act.rule ? {ruleSrc: this.#searchPic('trans', act.rule)} : {},
				...act.vague !== undefined ? {vague: act.vague} : {},
				...act.glsl !== undefined ? {glslSrc: act.glsl} : {},
			});
			// time<=0はstartTrans()の中で即finTrans()される（#finishTrans()を経由しない）ので、
			//	プラグインレイヤーのコピーもここで揃える（#beginTrans()がengine.transDone()を
			//	直接呼ぶのと同じ理屈）
			if (act.time <= 0) this.#plgLayMng.finishTrans(act.aLayNm, oldForeIdx, []);
			this.#beginTrans(act.time, act.aLayNm);
			break;
		}
		case 'waitTrans':
			// 実処理は#runStep()側（#waitTrans()）。表示への影響は無い
			break;
		case 'plgTag':
			// 実処理は#runStep()側（#procPlgTag()）。表示への影響は無い
			break;
		case 'chgStr':
			{	// シナリオが書いた生の文字列をここで表示単位へ割る（ルビ記法。Txt.ts）。
				//	ストアには平文（str）と表示単位（aCh）の両方を入れる＝chgPicのfnとsrcと同じ関係
				const aCh = splitCh(act.str);
				// [graph]のインライン画像だけはパス解決が要る。**splitCh()を純粋なままにしたい**ので
				//	割った後にここで流し込む（画像レイヤのfn→srcと同じ扱い）
				for (const ch of aCh) if (ch.pic) ch.src = this.#searchPic('graph', ch.pic);
				this.$fncs.chgStr({nm: act.nm, page: act.page, str: plainOf(aCh), aCh});
			}
			break;
		case 'addBtn': {
			// 文字レイヤ（UIコンテナ）のaBtnに追加する（独立レイヤにはしない）。
			//	画像（pic/b_pic）は論理名で来るので、ここで解決済みURLを足す（[lay fn=]と同じ）
			const sty = act.sty && {...act.sty,
				...(act.sty.pic ? {src: this.#searchPic('button pic', act.sty.pic)} : {}),
				...(act.sty.b_pic ? {b_src: this.#searchPic('button b_pic', act.sty.b_pic)} : {}),
			};
			this.$fncs.addBtn({layerNm: act.layerNm, page: act.page, ...(act.nm !== undefined ? {nm: act.nm} : {}), text: act.text, label: act.label, ...(act.call !== undefined ? {call: act.call} : {}), ...(act.fn !== undefined ? {fn: act.fn} : {}), ...(act.arg !== undefined ? {arg: act.arg} : {}), ...(sty !== undefined ? {sty} : {})});
			break;
		}
		case 'chgLay':
			this.$fncs.chgLay({nm: act.nm, page: act.page, sty: act.sty});
			break;
		case 'defChStyle':
			this.$fncs.defChStyle({kind: act.kind, nm: act.nm, sty: act.sty});
			break;
		case 'autowc':
			this.$fncs.setAutowc({enabled: act.enabled, h: act.hWait});
			break;
		case 'clearLay':
			this.#stopTsyByLayer(act.aLayNm, act.page);
			this.#dropFxTimers(t=> (act.page === 'both' || t.page === 'both' || t.page === act.page)
				&& ScriptMng.#fxMatch(t, act.aLayNm, null));	// aFxは A_LAY_STY_KEY 経由で消えるので[wait_fx]タイマーも畳む
			this.$fncs.clearLay({aLayNm: act.aLayNm, page: act.page});
			this.#plgLayMng.clearLay(act.aLayNm, act.page, this.$fncs.getForeIdx());
			break;
		case 'clearTxtLay':
			this.#stopTsyByLayer([act.nm], act.page);
			this.$fncs.clearTxtLay({nm: act.nm, page: act.page, clearFilter: act.clearFilter});
			break;
		case 'addFilter':
			this.$fncs.chgFilter({aLayNm: act.aLayNm, page: act.page, mode: act.replace ? 'replace' : 'add', flt: act.flt});
			break;
		case 'clearFilter':
			this.$fncs.chgFilter({aLayNm: act.aLayNm, page: act.page, mode: 'clear'});
			break;
		case 'enableFilter':
			this.$fncs.chgFilter({aLayNm: act.aLayNm, page: act.page, mode: 'enable', index: act.index, enabled: act.enabled});
			break;
		// 立ち絵シェーダエフェクトの試作（分家独自。ANIMATION_RESEARCH.md §7）。
		//	後始末（WebGLコンテキスト/rAF破棄）は記述子がaFxから消える→GrpLayerの<canvas>が
		//	unmountする→useEffect cleanupが担うので、[tsy]の#stopTsyByLayerのような帳簿は不要
		case 'addFx':
			this.$fncs.chgFx({aLayNm: act.aLayNm, page: act.page, mode: 'add', fx: act.fx});
			this.#addFxTimer(act);	// time>0 のone-shotは[wait_fx]用にタイマーを張る
			break;
		case 'clearFx':
			this.$fncs.chgFx({aLayNm: act.aLayNm, page: act.page, mode: 'clear', names: act.names});
			this.#dropFxTimers(t=> (act.page === 'both' || t.page === 'both' || t.page === act.page)
				&& ScriptMng.#fxMatch(t, act.aLayNm, act.names));
			break;
		case 'enableFx':
			// [pause_fx]/[resume_fx]：記述子は残しenabledだけ差し替える（page=は受けないのでbothで両面）。
			//	描画（rAF）を止める/戻すのは FxRunner の制御ハンドル（GrpLayer.tsx の FxImg 経由）
			this.$fncs.chgFx({aLayNm: act.aLayNm, page: 'both', mode: 'enable', names: act.names,
				...(act.index !== null ? {index: act.index} : {}), enabled: act.enabled});
			this.#pauseFxTimers(t=> ScriptMng.#fxMatch(t, act.aLayNm, act.names), ! act.enabled);
			break;
		case 'moveLay':
			this.$fncs.moveLay({nm: act.nm, mode: act.mode, ...(act.index !== undefined ? {index: act.index} : {}), ...(act.dive !== undefined ? {dive: act.dive} : {})});
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
		case 'tsyFrame':
			this.#beginTsyFrame(act);
			break;
		case 'quake':
			this.#beginQuake(act);
			break;
		case 'stopQuake':
			this.#finishQuake();
			break;
		case 'waitQuake':
			// 実処理は#runStep()側（#waitQuake()）。表示への影響は無い
			break;
		case 'waitTsy':
			// 実処理は#runStep()側（#waitTsy()）。表示への影響は無い
			break;
		case 'waitFx':
			// 実処理は#runStep()側（#waitFx()）。表示への影響は無い
			break;
		case 'stopTsy':
			this.#endTsy(act.tw_nm);
			break;
		case 'pauseTsy': {
			const tw = this.#hTw[act.tw_nm]?.tw;
			if (act.paused) tw?.pause(); else tw?.resume();
			break;
		}

		// ---- ＢＧＭ・効果音（ts/SndMng.ts・ts/SndBuf.ts） ----
		case 'playSnd':
			// join=true（既定）なら#runStep()側で読み終わるまで待つ。ここへ来るのはjoin=falseのときだけ＝投げっぱなし
			if (! act.join) void this.#playSnd(act).catch(this.#catchErr);
			break;
		case 'stopSnd':
			this.#sndMng.stop(act.buf);
			break;
		case 'stopAllSnd':
			this.#sndMng.stopAll();
			break;
		case 'xchgBufSnd':
			// save:/loopPlayingの帳簿はScriptEngine側で入れ替え済み。ここでは実体を動かす前に、
			//	両バッファの走行中フェード（#hSndTw）を先に畳む——end()がact.buf（旧バッファ名）を
			//	捕捉したままなので、交換を跨がせると別バッファへ音量が当たってしまう
			this.#killSndFade(act.buf);
			this.#killSndFade(act.buf2);
			this.#sndMng.xchgBuf(act.buf, act.buf2);
			break;
		case 'duckBgm':
			// VOICE再生開始時のBGM絞り込み（本家 SndBuf.ts:143-157）。save:へは触れない一時的な上書き
			this.#sndMng.setVol('BGM', act.volume);
			break;
		case 'volumeSnd':
			this.#sndMng.setVol(act.buf, act.volume);
			break;
		case 'fadeSnd':
			this.#beginFadeSnd(act);
			break;
		case 'waitSnd':
			// 実処理は#runStep()側（#waitSndPlay()）。表示への影響は無い
			break;
		case 'waitFade':
			// 実処理は#runStep()側（#waitFadeSnd()）。表示への影響は無い
			break;
		case 'waitVideo':
			// 実処理は#runStep()側（#waitVideoPlay()）。表示への影響は無い
			break;

		case 'title':
			this.$fncs.addTitle(act.text);
			break;
		case 'toggleFullScr':
			this.$fncs.toggleFullScr();
			break;
		case 'navigateTo':
			this.navigateTo(act.url);
			break;
		case 'loadPlugin':
			// join=true（既定）なら#runStep()側で読み終わるまで待つ。ここへ来るのはjoin=falseのときだけ＝投げっぱなし
			if (! act.join) void this.#loadPlugin(act.fn).catch(this.#catchErr);
			break;
		case 'snapshot':
			// 実処理は#runStep()側（撮り終わってから続きを回す）
			break;

		// ---- しおり（セーブ・ロード）系 ----
		case 'recordPlace':
			// 今の状態をしおり1件ぶんに組み立てて覚えるだけ。保存するのは[save]
			this.#mark = this.#mkMark();
			break;
		case 'save':
			// [record_place]をまだ通っていなければ今の状態で代用する（本家は空の初期値を持つが、
			//	それだと「保存したのに真っ白」になるので、ここは今の画面を保存する方が親切）
			this.#saveMng.setMark(act.place, {...this.#mark ?? this.#mkMark(), json: act.json});
			this.#flushSys();	// sys:const.sn.save.place（次の保存枠）が[save]で進むので一緒に
			break;
		case 'load':
		case 'reloadScript':
			// 実処理は#runStep()側（復元とスクリプト読み直しが済んでから続きを回す）
			break;
		case 'copyBookmark':
			this.#saveMng.copyMark(act.from, act.to);
			break;
		case 'eraseBookmark':
			this.#saveMng.eraseMark(act.place);
			break;
		case 'exportData':
			this.#flushSys();	// 書き出す前に今のsys:・既読を反映しておく
			this.#saveMng.export();
			// 本家同様、終わったら[event key=sn:exported]を発火する（テンプレの _config.sn が拾う）
			setTimeout(()=> this.fireEvent('sn:exported'), 10);
			break;
		case 'importData':
			// ファイル選択はユーザー任せなのでシナリオは止めない（本家も同じ）
			void this.#saveMng.import().then(o=> {
				const engine = this.#engine;
				if (! engine) return;

				engine.setSys(o.sys);
				engine.setKidoku(o.kidoku);
				this.fireEvent('sn:imported');
			}).catch((e: unknown)=> this.myTrace(`[import] ${String(e)}`, 'E'));
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
		case 'frame':
			// 変えた分は組み込み変数へも書き戻す（本家 #frame() と同じ）
			this.#setVals(this.#frmMng.frame(act.id, act.sty, act.order, act.disabled));
			break;
		case 'setFrame':
			this.#frmMng.set(act.id, act.var_name, act.text);
			break;
		case 'resvDomEvent': {
			// DOM要素のクリック等を、[event]の予約と同じ経路（fireEvent）へ流し込む
			const aEl = this.#frmMng.resvDom(act.rawKey, act.key, act.del, act.needErr, el=> {
				this.cancelAuto();
				// 発火した要素の data-* を組み込み変数へ（本家 EventMng.ts:591）。
				//	何に使うかはシナリオ側の自由で、フレーム内の「どの項目が押されたか」を渡す口になる
				for (const [k, v] of Object.entries(el.dataset)) {
					this.#engine?.setValNochk(`sn.event.domdata.${k}`, v ?? '');
				}
				this.fireEvent(act.key);
			});
			// 本家は**最初の1件だけ**をフォーカス対象にも登録する（EventMng.ts:596 の `if (i === 0)`）
			if (! act.del && aEl[0]) focusMng.add(aEl[0]);
			break;
		}
		case 'setFocus':
			switch (act.mode) {
			case 'add':	for (const el of this.#frmMng.resolveDom(act.rawKey!, act.needErr ?? true)) focusMng.add(el);	break;
			case 'del':	for (const el of this.#frmMng.resolveDom(act.rawKey!, act.needErr ?? true)) focusMng.remove(el);	break;
			case 'null':	focusMng.blur();	break;
			case 'next':	focusMng.next();	break;
			case 'prev':	focusMng.prev();	break;
			}
			break;
		case 'addFrame':
		case 'letFrame':
			// 実処理は#runStep()側（DOMを触った結果を組み込み変数へ書き戻してから続ける）
			break;
		// アプリ（Electron）版のタグ。**ブラウザ版では何もしない**（SysBaseの既定がno-op）
		case 'close':
			this.sys.close();
			break;
		case 'window':
			this.sys.window(act);
			break;
		case 'updateCheck':
			this.sys.updateCheck(act.url);
			break;
		case 'clearPageLog':
			// [page clear=true]：ページログの消去。以降の停止点から積み直しになる。
			//	本家同様、読み戻り中の見た目（styPaging）も既定へ戻す
			this.#pageLog.clear();
			this.#pageStart = undefined;
			this.#engine?.setValNochk('save:const.sn.styPaging', INI_STYPAGE);
			this.#applyPaging();
			break;
		case 'pageStyle':
			// [page style=…]：読み戻り中の本文の見た目（本家 setAllStyle2TxtLay で全文字レイヤへ当てる分）。
			//	**save:へ置く**ので、しおりの保存・復元にそのまま乗る（本家 Reading.ts:352 も同じ）
			this.#engine?.setValNochk('save:const.sn.styPaging', act.style);
			this.#applyPaging();
			break;
		case 'pageKeys':
			// [page key=…]：読み戻り中に効くイベントキーの限定（空なら制限なし）
			this.#aKeysAtPaging = act.aKey;
			break;
		case 'pageTo':
			// 実処理は#runStep()側（しおりを戻して演じ直す。#procPage）
			break;
		case 'trace':
			// 実処理は既存の#trace()（myTrace経由）へそのまま委譲
			this.#trace({text: act.text});
			break;
		case 'log':
			// 実処理は既存の#log()へそのまま委譲
			this.#log({text: act.text}, act.fn, act.lineNum);
			break;
		case 'loadScript':
			// 実処理は#runStep()側（fetch→switchScript）。表示への影響は無い
			break;
		case 'stop': {
			// ページログへ積む（本家 Reading.ts:207 recodePage()）。積むのは**このページの先頭**＝
			//	前の停止点を抜けた位置としおりで、ここから演じ直せば同じページが再現される。
			//	同じ位置は積み直さないので、[page]で戻って演じ直しても増えない
			const ps = this.#pageStart;
			this.#pageStart = undefined;
			if (ps) this.#pageLog.push(ps.fn, ps.idx, ps.mark, ps.clearOnResume);
			this.#pageReplaying = false;	// 演じ直しはここで完了。以降はisPagingの実値どおりに戻す
			this.#applyPaging();
			// [l]/[p]待ち中マーカー表示（[s]はマーカーなし＝上のsetWait(null)のままにする）。
			//	[waitclick]もマーカーは出さないが、setWaitは呼ぶ：TxtLayerがwait.nm===nmで
			//	「今読み進め可能な停止中か」を判定し、本文へのフォーカス対象（見た目には出ない
			//	プロキシ要素）を輪へ登録する入り口として使い回すため（todo.md「本文にフォーカスが
			//	戻らず読み進められなくなる」不具合対応）
			if (act.kind === 'l' || act.kind === 'p' || act.kind === 'waitclick') {
				const src = act.kind === 'waitclick' ? undefined : this.#srcBreak(act.kind);
				this.$fncs.setWait({nm: act.nm, kind: act.kind, ...(src ? {src} : {}), ...act.mark});
			}
			// [s]はここで完全停止。以降クリック・キーでは進まず、[event]/[button]の予約だけが動かせる
			//	（[waitclick]は同じ「マーカー無しの停止」だがクリックで進む）
			this.#stopped = act.kind === 's';
			// オート読み・既読スキップ指示があれば、クリックを待たず自分で次へ進むタイマーを仕込む。
			//	無ければ手動待ち＝スキップ表示も解除する（この停止点でスキップが尽きた場合）
			if (act.resume) this.#scheduleResume(act.resume.mode, act.resume.msec);
			else this.$fncs.setSkipping(false);
			// 既読情報とsys:の保存。本家も停止点で吐き出す（毎トークンでは重すぎるため）。
			//	立て続けの呼び出しはSaveMng側で500msにまとめられる
			this.#flushSys();
			// 設定画面で変わりうる「バック不透明度」をストアへ写す（本家 LayerMng.ts:205 の
			//	val.defValTrg('sys:TextLayer.Back.Alpha', …) 相当。全文字レイヤの背景に掛かる）
			this.$fncs.setBackAlpha(Number(this.#engine?.getVal('sys:TextLayer.Back.Alpha') ?? 1));
			// [button]の文字フォント（本家 LayerMng.ts:209 の val.defValTrg('tmp:sn.button.fontFamily', …)）も同様に
			this.$fncs.setBtnFont(String(this.#engine?.getVal('tmp:sn.button.fontFamily') ?? '') || DEF_BTN_FONT);
			// 1文字あたりの待ち（本家 ScriptIterator.normalWait）。設定画面のsys:sn.tagCh.*と
			//	既読状態から決まる。**本家はトークンごとに読むが、こちらは停止点ごとに1回**
			//	——Reactが描くのは停止点の後なので、1停止点の間で値が変わっても絵には出ない
			if (this.#engine) this.$fncs.setChWait(this.#engine.chWait);
			break;
		}
		}	// switch
	}

	async #fetchScript(fn: string): Promise<string> {
		try {
			const path = this.sys.cfg.searchPath(fn, SEARCH_PATH_ARG_EXT.SCRIPT);

			// 派生ファイル（fn+'@'。searchPath()内部でuserFnTailと合成されると
			//	fn+'@@@'+tailになる）があれば、基底とマージする（本家 ScriptIterator.ts:1055-1093）。
			//	searchPath()は無ければ例外を投げる仕様なので、それを「無し」の判定に使う
			let path_diff = '';
			try {path_diff = this.sys.cfg.searchPath(fn +'@', SEARCH_PATH_ARG_EXT.SCRIPT)}
			catch {/* 派生ファイルはない */}

			if (! path_diff) {
				const res = await this.sys.fetch(path);
				if (! res.ok) throw Error(res.statusText);
				return await this.sys.dec(path, await res.text());
			}

			const [resBase, resDiff] = await Promise.all([this.sys.fetch(path), this.sys.fetch(path_diff)]);
			if (! resBase.ok) throw Error(resBase.statusText);
			if (! resDiff.ok) throw Error(resDiff.statusText);
			const [scrBase, scrDiff] = await Promise.all([
				this.sys.dec(path, await resBase.text()),
				this.sys.dec(path_diff, await resDiff.text()),
			]);

			// 【派生スクリプト】の空行へ【基底スクリプト】の同じ行の内容をコピー（継承）
			const aBase = scrBase.split('\n');
			const aDiff = scrDiff.split('\n');
			for (let i=0; i<aDiff.length && i<aBase.length; ++i) aDiff[i] ||= aBase[i] ?? '';
			return aDiff.join('\n');
		} catch (e) {
			// path.jsonに載っていない・取得できない＝シナリオが続けられないので、
			//	ここは黙って代替せず止める（'ET'は表示してからthrowする）
			this.myTrace(`[load] スクリプト読込に失敗しました fn:${fn} ${String(e)}`, 'ET');
			throw e;	// myTraceが投げるので到達しないが、戻り値の型を締めるため
		}
	}


	#trace(hArg: TArg) {
		this.myTrace(hArg.text || `(text is ${hArg.text})`, 'I');

		return false;
	}

	// [log]：downloads/log.txtへの追記（本家 DebugMng.ts:57）。履歴（Log.ts）とは別物で、
	//	作者がシナリオデバッグ中に手元へ書き出すためのタグ
	#firstLog = true;
	#log(hArg: TArg, fn: string, lineNum: number) {
		let dat = '';
		if (this.#firstLog) {
			this.#firstLog = false;
			dat = `== ${CmnLib.plat_desc} ==\n`;
		}
		void this.sys.appendFile(
			this.sys.path_downloads +'log.txt',
			`${dat}--- ${getDateStr('-', '_', '')
			} [fn:${fn} line:${String(lineNum)
			}] prj:${this.sys.arg.cur
			}\n${hArg.text || `(text is ${String(hArg.text)})`}\n`,
		);

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

				if (lvl === 'ET') throw this.#tracedErr = mes;
				break;
			default:	sty = '';
		}
		console.info('%c '+ mes, sty);
	}

}

