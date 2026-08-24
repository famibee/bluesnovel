/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2018-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import type {T_HPlugin, T_SysBase, T_SysBaseLoadedParams} from './CmnInterface';
import { T_Config, T_SysRoots } from './ConfigBase';
import {CmnLib} from './CmnLib';
import type {T_DATA4VARI_TRANSPORT} from '../ts/SaveMng';
import type {ScriptMng} from '../ts/ScriptMng';
import type {Root} from 'react-dom/client';
import store from './localStore';


// React Developer Toolsのインストールを推されるコンソールメッセージを消す
// React Developer Tools拡張機能自体が入っている環境では、__REACT_DEVTOOLS_GLOBAL_HOOK__を
// 拡張機能側がgetterのみで定義済みのことがあり、その場合ここでの代入がTypeErrorになり
// モジュール初期化全体が止まって画面が真っ白になる。拡張機能がフック済みならこの代入は
// 不要なので、失敗は無視してよい。
try {
	(window as any).__REACT_DEVTOOLS_GLOBAL_HOOK__ = {isDisabled: true};
} catch {/* React Developer Tools拡張機能がフック済み */}

type HSysBaseArg = {
	cur		: string;
	crypto	: boolean;
	dip		: string;
}

const	SN_ID	= 'skynovel';


export class SysBase implements T_SysRoots, T_SysBase {
	constructor(readonly hPlg: T_HPlugin = {}, readonly arg: HSysBaseArg) {}
	protected async loaded(...[hPlg,]: T_SysBaseLoadedParams) {
		// 暗号化・改竄検査のロジックはコアに持たず、プラグイン（snsys_pre）から注入する
		//	（本家 SysBase.ts:49-50 と同じ扱い。秘匿性のため）。prj.json/path.jsonの読込
		//	（Config.generate、直後）が既にdec()を通るので、それより前に済ませる必要がある
		const pre = hPlg.snsys_pre;
		delete hPlg.snsys_pre;	// eslint-disable-line @typescript-eslint/no-dynamic-delete
		await pre?.init({
			// 一般プラグイン向けのフック（addTag/addLayCls/…）はsnsys_preでは使わないため
			//	本家 SysBase.ts:51-64 と同じくno-opで埋める（一般プラグイン向けは#initPlg()で配線済み）
			getInfo		: ()=> ({window: {width: CmnLib.stageW, height: CmnLib.stageH}}),
			addTag		: ()=> { /* empty */ },
			addLayCls	: ()=> { /* empty */ },
			searchPath	: ()=> '',
			getVal		: ()=> undefined,
			resume		: ()=> { /* empty */ },
			render		: ()=> { /* empty */ },
			setDec: f=> {this.dec = f},
			setDecAB: f=> {this.decAB = f},
			setEnc: f=> {this.enc = f},
			getHash: f=> {this.hash = f},
		});

		document.head.insertAdjacentHTML('beforeend',
`<style type="text/css">
	body {
		background-color: black;
	}
	:-webkit-full-screen canvas#skynovel {width: 100%; height: 100%; object-fit: contain;}
	:-moz-full-screen canvas#skynovel {width: 100%; height: 100%; object-fit: contain;}
	:full-screen canvas#skynovel {width: 100%; height: 100%; object-fit: contain;}
</style>`);

		await this.run();
	}


	cfg: T_Config;
	setMain(cfg: T_Config) {
		this.cfg = cfg;
	}
	scrMng: ScriptMng | undefined;	// E2Eのwindow.__snから覗くためだけに保持（本体は使わない）

	// 起動、および SysWeb.runSN() によるプロジェクト切替の両方から呼ばれる（本家 SysBase.run()。
	//	skynovel_esm/src/sn/SysBase.ts:73-89）。2回目以降は前のプロジェクトを完全に畳んでから
	//	作り直す：Reactツリー（#root）・zustandストア・ScriptMngが個別に抱えるタイマー/トゥイーン/
	//	音声はどれもunmountだけでは戻らないため、3つとも明示的に片付ける
	//	（本家は main?.destroy(); main = await Main.generate(this) の一行で済むが、
	//	こちらは唯一のグローバルストアを使い回す都合上これだけの手当てが要る）
	#root: Root | undefined;
	#heStage?: HTMLDivElement;
	protected async run() {
		const [{createRoot}, {initMain}, {Config}, {ScriptMng}, {setFetch, setDecFncs}, {resetStore}] = await Promise.all([
			import('react-dom/client'),
			import('../components/Main'),
			import('./Config'),
			import('../ts/ScriptMng'),
			import('../ts/Sprite'),
			import('../store/store'),
		]);
		// GrpLayer/TxtLayer（Reactコンポーネント）はsysを持たないので、アニメpngシートの
		//	.json取得・複号だけモジュールレベルで注入する（Sprite.ts参照）
		setFetch((url, init)=> this.fetch(url, init));
		setDecFncs((ext, tx)=> this.dec(ext, tx), ab=> this.decAB(ab), this.arg.crypto);

		if (this.#root) {	// 2回目以降＝プロジェクト切替（前のプロジェクトを畳む）
			this.scrMng?.destroy();
			this.#root.unmount();
			resetStore();
		}

		// React 初期表示
		const cfg = await Config.generate(this);
		this.setMain(cfg);
		// bg_colorは生の数値/色名/#RRGGBBのいずれもありうる（T_CFG_RAW.init.bg_color）ので、
		//	String()だけでは数値（例:4231232）がCSSとして無効なまま素通りしてしまっていた
		//	（Config.tsのload()内でCmnLib.bgColorへ変換済み。cssColorOf()参照）
		document.body.style.backgroundColor = CmnLib.bgColor;

		// 初回だけ：ホストHTMLの既存要素があればそれをそのままマウント先にし、無ければdivを新設する。
		//	以後（プロジェクト切替）は同じ要素へ#rootを作り直すだけで、DOMは触らない
		const exist = document.getElementById(SN_ID);
		const he = this.#heStage ??= (
			exist instanceof HTMLCanvasElement
				? (()=> {	// sn_gallery index.htmlの<canvas id="skynovel">等、pixi.js時代の名残。
					//	canvasの子要素はHTML仕様上フォールバックコンテンツ扱いで描画されないため、
					//	classを引き継いだdivに差し替えてマウント先にする（本家からの乗り換え試用対応）
					const el = document.createElement('div');
					el.id = SN_ID;
					el.className = exist.className;
					exist.replaceWith(el);
					return el;
				})()
				: <HTMLDivElement>exist ?? (()=> {
					const el = document.createElement('div');
					el.id = SN_ID;
					document.body.appendChild(el);
					return el;
				})()
		);

		const scrMng = new ScriptMng(this);
		this.scrMng = scrMng;	// E2Eのwindow.__snから覗くためだけに保持（本体は使わない）
		await this.#initPlg(scrMng);
		this.#root = createRoot(he);
		initMain(this.#root, {heStage: he, sys: this, scrMng}, ()=> queueMicrotask(()=> scrMng.load('main')));
	}

	// 一般プラグイン（3D/Live2D系。sn_galleryの3d_layer/cubism3_layer/emote_layer等）の
	//	init()を実際に呼ぶ配線（本家 SysBase.init() 末尾の`hFactoryCls`組み込み登録後の一括実行に相当）。
	//	CmnLib.stageW/Hが確定済み（Config.generate()の後）かつmain.snが動き出す前（initMain()の前）
	//	でなければならない：getInfo()が正しい寸法を返せず、addLayCls登録もmain.sn実行前に済んでいる必要があるため
	#plgInited = false;
	async #initPlg(scrMng: ScriptMng) {
		// プロジェクト切替（run()の2回目以降）では再実行しない。addLayClsのレジストリ（LayCls.ts）は
		//	モジュールレベル＝ページのライフタイムで生きているため、再登録は「すでに定義済み」でthrowする
		if (this.#plgInited) return;
		this.#plgInited = true;
		const aPlg = Object.values(this.hPlg);
		if (aPlg.length === 0) return;

		const {addLayCls} = await import('./LayCls');
		await Promise.all(aPlg.map(v=> v.init({
			getInfo		: ()=> ({window: {width: CmnLib.stageW, height: CmnLib.stageH}}),
			// ScriptEngineがタグをswitchで捌く構造のため未対応（本家のように動的にhTagへ足す口が無い）。
			//	sn_galleryの3D/Live2D系プラグインはaddLayClsしか使わないため後回し
			addTag		: nm=> {throw `プラグインのaddTag('${nm}')は未対応です`},
			addLayCls,
			searchPath	: (fn, extptn)=> this.cfg.searchPath(fn, extptn),
			getVal		: (nm, def)=> scrMng.getVal(nm, def),
			resume		: ()=> {scrMng.go()},
			// pixi.js専用（DisplayObjectのRenderTexture焼き）。bluesnovelはDOMへ直接描くので不要
			render		: ()=> { /* empty */ },
			// snsys_pre専用のフック。一般プラグインからは使わない想定（本家 SysBase.ts:196-200も同じくno-op）
			setDec: ()=> { /* empty */ }, setDecAB: ()=> { /* empty */ },
			setEnc: ()=> { /* empty */ }, getHash: ()=> { /* empty */ },
		})));
	}

	// プロジェクトを止めるだけ（作り直さない。本家 SysBase.stop()：
	//	skynovel_esm/src/sn/SysBase.ts:90-93 main?.destroy(); main = undefined; に相当）。
	//	SysWeb.runSN()と同じ3点（ScriptMngの資源・Reactツリー・ストア）を畳む
	async stop() {
		if (! this.#root) return;

		this.scrMng?.destroy();
		this.#root.unmount();
		this.#root = undefined;
		this.scrMng = undefined;

		const {resetStore} = await import('../store/store');
		resetStore();
	}


	protected $path_downloads	= '';
	get path_downloads() {return this.$path_downloads}
	protected $path_userdata	= '';
	get path_userdata() {return this.$path_userdata}

	dec = (_ext: string, tx: string)=> Promise.resolve(tx);
	decAB = (ab: ArrayBuffer)=> Promise.resolve(ab);
	enc = (tx: string)=> Promise.resolve(tx);
	readonly fetch = (url: string, init?: RequestInit)=> fetch(url, init);
	hash = (_str: string)=> '';

	async appendFile(_path: string, _data: string) { /* SysApp/SysWebが上書き（本家 SysBase.ts:583） */ }


	// ===== しおり・sys:の永続化（SaveMng.tsが呼ぶ。本家 data/flush()/initVal() 相当） =====
	//	既定はlocalStorage（本家 SysWeb と同じ「skynovel.《ns》 - 《種別》」形式のキー4本。
	//	同じプロジェクトなら本家が書いたデータをそのまま読める）。SysAppがelectron-storeへ上書きする。
	//	暗号化そのものはSaveMng.tsが行う（crypto/enc/dec経由）ので、ここは保存先とキー名だけの責務
	get crypto() {return this.arg.crypto}
	async storeLoad(ns: string): Promise<T_DATA4VARI_TRANSPORT | undefined> {
		// crypto有無で別キーにする（開発中の切り替えで平文を暗号文として読む事故を防ぐ）
		const key = (kind: string)=> `skynovel.${ns} - ${kind}${this.arg.crypto ? '_enc' : ''}`;
		const sys = store.get(key('sys'));
		if (sys === undefined) return undefined;

		return {
			sys		: sys as T_DATA4VARI_TRANSPORT['sys'],
			mark	: (store.get(key('mark')) ?? {}) as T_DATA4VARI_TRANSPORT['mark'],
			kidoku	: (store.get(key('kidoku')) ?? {}) as T_DATA4VARI_TRANSPORT['kidoku'],
			storage	: (store.get(key('storage')) ?? {}) as T_DATA4VARI_TRANSPORT['storage'],
		};
	}
	storeFlush(ns: string, data: T_DATA4VARI_TRANSPORT): Promise<void> {
		const key = (kind: string)=> `skynovel.${ns} - ${kind}${this.arg.crypto ? '_enc' : ''}`;
		store.set(key('sys'), data.sys);
		store.set(key('mark'), data.mark);
		store.set(key('kidoku'), data.kidoku);
		store.set(key('storage'), data.storage);
		return Promise.resolve();
	}


	// ===== アプリ（Electron）版だけが持つ振る舞い =====
	//	**ブラウザ版では何もしない**のが既定（本家 SysBase.ts:446/:495/:496 も同じ形で、
	//	SysApp が上書きする）。ここを口にしておくことで、[close]/[window]/[update_check]は
	//	どちらの版でもシナリオを止めずに素通りする
	close() { /* アプリ版のみ。ブラウザにウインドウを閉じる手段は無い */ }
	window(_o: {centering: boolean; x: number; y: number; w: number; h: number}) { /* アプリ版のみ */ }
	updateCheck(_url: string) { /* アプリ版のみ */ }

	// [snapshot]のネイティブ撮影（本家に無いbluesnovel独自経路）。ScriptMngのDOM→SVG方式に対し、
	//	アプリ版はElectronのcapturePageでHTMLフレームの中身まで撮れる。空文字は「非対応」の意味で、
	//	呼び出し側（ScriptMng #snapshot）がDOM→SVG方式へフォールバックする
	async capturePage(_rect: {x: number; y: number; width: number; height: number}, _outW: number, _outH: number, _mime: string): Promise<string> {return ''}

}
