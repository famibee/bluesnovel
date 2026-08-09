/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2018-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import type {T_HPlugin, T_SysBase, T_SysBaseLoadedParams} from './CmnInterface';
import { T_Config, T_SysRoots } from './ConfigBase';
import type {T_DATA4VARI_TRANSPORT} from '../ts/SaveMng';
import store from './localStore';


// React Developer Toolsのインストールを推されるコンソールメッセージを消す
(window as any).__REACT_DEVTOOLS_GLOBAL_HOOK__ = {isDisabled: true};

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

		await Promise.all([
			import('react-dom/client'),
			import('../components/Main'),
			import('./Config'),
			import('../ts/ScriptMng'),
			import('../ts/Sprite'),
		]).then(async ([{createRoot}, {initMain}, {Config}, {ScriptMng}, {setFetch}])=> {
			// GrpLayer/TxtLayer（Reactコンポーネント）はsysを持たないので、アニメpngシートの
			//	.json取得だけモジュールレベルで注入する（Sprite.ts参照）
			setFetch((url, init)=> this.fetch(url, init));

			// React 初期表示
			const cfg = await Config.generate(this);
			this.setMain(cfg);
			document.body.style.backgroundColor = String(cfg.oCfg.init.bg_color);

			let he = <HTMLDivElement>document.getElementById(SN_ID);
			if (he) {
				const clone_cvs = <HTMLDivElement>he.cloneNode(true);
				clone_cvs.id = SN_ID;
			}
			else {	// 自動的に作ってくれるが、どうも appendChild に遅延があるので
				he = document.createElement('div');
				he.id = SN_ID;
				document.body.appendChild(he);
			}
			const scrMng = new ScriptMng(this);
			initMain(createRoot(he), {heStage: he, sys: this, scrMng}, ()=> queueMicrotask(()=> scrMng.load('main')));
		});
	}


	cfg: T_Config;
	setMain(cfg: T_Config) {
		this.cfg = cfg;
	}
	protected async run() {}


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
