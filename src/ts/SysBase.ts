/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2018-2025 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import type {HPlugin, IData4Vari, IFncHook, ISysBase, T_SysBaseLoadedParams} from './CmnInterface';
import type {IConfig, IFn2Path, ISysRoots} from './ConfigBase';
import type {IHTag} from './Grammar';
import {Caretaker} from './Memento';


// React Developer Toolsのインストールを推されるコンソールメッセージを消す
(window as any).__REACT_DEVTOOLS_GLOBAL_HOOK__ = {isDisabled: true};

type HSysBaseArg = {
	cur		: string;
	crypto	: boolean;
	dip		: string;
}

const	SN_ID	= 'skynovel';


export class SysBase implements ISysRoots, ISysBase {
	constructor(readonly hPlg: HPlugin = {}, readonly arg: HSysBaseArg) {}
	protected async loaded(...[_hPlg,]: T_SysBaseLoadedParams) {
		document.head.insertAdjacentHTML('beforeend',
`<style type="text/css">
	body {
		background-color: black;
	}
	:-webkit-full-screen canvas#skynovel {width: 100%; height: 100%; object-fit: contain;}
	:-moz-full-screen canvas#skynovel {width: 100%; height: 100%; object-fit: contain;}
	:full-screen canvas#skynovel {width: 100%; height: 100%; object-fit: contain;}
</style>`);

		Promise.all([
			import('react-dom/client'),
			import('../components/Main'),
			import('./Config'),
		]).then(async ([{createRoot}, {initMain}, {Config}])=> {
			// React 初期表示
			const cfg = await Config.generate(this);
			const {oCfg: {init: {bg_color, escape}}} = cfg;
			document.body.style.backgroundColor = bg_color;

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

			let	hTag: IHTag	= Object.create(null);	// タグ処理辞書
			let procNext	= ()=> {};
			initMain(createRoot(he), {heStage: he, sys: this, hTag, procNext: ()=> procNext(), attachTsx: (trgNext, fncs)=> {
				// Main.tsx からの初期化
				hTag.title = ({text})=> {
					if (! text) throw '[title] textは必須です';

					// this.#main_title = text;	//TODO: 
					// this.titleSub(this.#main_title + this.#info_title);
					fncs.addTitle(text);

					return false;
				}

				Promise.all([
					import('@pixi/assets'),
					import('@pixi/extensions'),
					import('./ScriptMng'),
					import('./Variable'),
					import('./PropParser'),
				]).then(async ([{Assets}, {extensions, ExtensionType}, {ScriptMng}, {Variable}, {PropParser}])=> {
					await Assets.init({basePath: location.origin});
					extensions.add({
						extension: {
							type: ExtensionType.LoadParser,
							name: 'sn-loader',
							//priority: LoaderParserPriority.High,
						},
						test: (url: string)=> url.endsWith('.sn'),
						load: (url: string)=> new Promise(async (re, rj)=> {
							const res = await this.fetch(url);
							if (! res.ok) {rj(`sn-loader fetch err:`+ res.statusText); return}

							try {
								re(await this.dec('sn', await res.text()));
							} catch (e) {rj(`sn-loader err url:${url} ${e}`)}
						}),
					});
					this.load = url=> Assets.load(url);

					// 変数
					const val = new Variable(cfg, hTag);
					const prpPrs = new PropParser(val, escape ?? '\\');

					// ＢＧＭ・効果音
					// const sndMng = new SoundMng(cfg, this.#hTag, val, this(Main), this);	//TODO: 

					const scrMng = new ScriptMng(this, hTag, trgNext, fncs, val, prpPrs);
					procNext = ()=> scrMng.go();

					await scrMng.load('title');	// TODO: [jump]実装までの仮
					// await scrMng.load('main');	// SKYNovel 開始
					// this.run = async ()=> {
					// 	const heStage = await runSub();
					// 	initMain(createRoot(heStage), {heStage, sys: this});

					// 	const scrMng = new ScriptMng(this);
					// 	await start(scrMng);
					// };
				});
			}});
		});
	}
	load = async (_url: string)=> '';

	fetch = (url: string, init?: RequestInit)=> fetch(url, init);

	readonly	#ct	= new Caretaker;
	get caretaker() {return this.#ct}


	cfg: IConfig;
	async loadPath(hPathFn2Exts: IFn2Path, cfg: IConfig) {
		this.cfg = cfg;

		const fn = this.arg.cur +'path.json';
		const res = await this.fetch(fn);
		if (! res.ok) throw Error(res.statusText);

		const src = await res.text();
		const oJs = JSON.parse(await this.dec(fn, src));
		for (const [nm, v] of Object.entries(oJs)) {
			const h = hPathFn2Exts[nm] = <any>v;
			for (const [ext, w] of Object.entries(h)) {
				if (ext !== ':cnt') h[ext] = this.arg.cur + w;
			}
		}
	}

	protected	readonly	data	= {sys:{}, mark:{}, kidoku:{}};
	async	initVal(_data: IData4Vari, _hTmp: any, _comp: (data: IData4Vari)=> void) {}
	flush() {
		// 立て続きの保存を回避し最短 500ms の間隔を開ける
		if (this.#tidFlush) {this.#rsvFlush = true; return}	// 次の Timeout 時に予約

		this.flushSub();	// ひとまず即時
		this.#tidFlush = setTimeout(()=> {
			this.#tidFlush = undefined;
			if (! this.#rsvFlush) return;	// 予約もないのでなにもせず通常状態に

			this.#rsvFlush = false;			// 次の予約を待つためリセット
			this.flush();	// 次の Timeout 後に
		}, 500);
	}
	#tidFlush	: NodeJS.Timeout | undefined = undefined;
	#rsvFlush	: boolean = false;
	protected	flushSub() {}	//TODO: 


	protected async run() {}


	#aFncHook: IFncHook[]	= [];
	addHook(fnc: IFncHook) {this.#aFncHook.push(fnc)}
	callHook: IFncHook = (_type, _o)=> {};

	send2Dbg: IFncHook = (_type, _o)=> {
//console.log(`fn:SysBase.ts 新SND isBuf:${!(this.sk)} type:${type} o:${JSON.stringify(o)}`);
		// this.#sk?.emit('data', type, o);	//TODO: 
	}


	copyBMFolder = (_from: number, _to: number)=> {};	//TODO: 
	eraseBMFolder = (_place: number)=> {};	//TODO: 


	protected $path_downloads	= '';
	get path_downloads() {return this.$path_downloads}
	protected $path_userdata	= '';
	get path_userdata() {return this.$path_userdata}

	readonly dec = (_ext: string, tx: string)=> Promise.resolve(tx);
	readonly hash = (_str: string)=> '';

}
