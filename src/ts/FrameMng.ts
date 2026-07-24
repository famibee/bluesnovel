/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2026-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

// HTMLフレーム（[add_frame]/[frame]/[set_frame]/[let_frame]）のDOM側。
//	本家 FrameMng.ts の移植。**レイヤ（aPage）とは別物**で、ストアには入れない：
//	中身は自分のJS状態を持つ生きたHTML文書なので、JSONへ写し取っても復元できない
//	（本家もiframeをcanvasの隣へ挿すだけで、レイヤ・ページの仕組みには載せていない）。
//	その代わり[set_frame]/[let_frame]でiframeのwindow変数を直接読み書きする。
//
//	本家との違い：本家はステージの拡縮ぶんを毎回自分で掛けてiframeへ書いていたが、
//	こちらは**拡縮済みのステージ箱の中**（Stage.tsxが用意するframe置き場）へ挿すので、
//	位置・寸法はステージ座標のまま書けばよく、ウインドウリサイズ追従も勝手に効く

import type {T_SEARCHPATH} from '../sn/ConfigBase';
import {SEARCH_PATH_ARG_EXT} from '../sn/ConfigBase';
import {CmnLib} from '../sn/CmnLib';

// [add_frame]/[frame]で指定できる見た目。**書かれた属性だけ**を持つ
export type T_FRM_STY = {
	visible?	: boolean;
	alpha?		: number;
	x?			: number;
	y?			: number;
	width?		: number;
	height?		: number;
	scale_x?	: number;
	scale_y?	: number;
	rotate?		: number;
	b_color?	: string;	// CSSの色をそのまま（本家も文字列をbackground-colorへ素通し）
};
export type T_FRM_ORDER = {mode: 'float' | 'index' | 'dive'; index?: number};

// [add_frame]完了時にエンジンへ書き戻す組み込み変数（本家 val.setVal_Nochk('tmp', 'const.sn.frm.…')）
export type T_FRM_VALS = {[name: string]: string | number | boolean};


export class FrameMng {
	constructor(private readonly searchPath: T_SEARCHPATH) { /* empty */ }

	// フレームを載せる箱。Stage.tsxがステージ（拡縮される内側の箱）の中に置いてくれる。
	//	Reactは「自分が作った子」しか面倒を見ないので、JSXで子を持たない空divへ
	//	こちらがiframeを足す形なら衝突しない
	//	**Stageはlazy()ロードなので、箱はシナリオ開始より後に届くことがある**
	//	（[add_frame]がスクリプトの1行目にあると確実にそうなる）。待てば必ず来るので、
	//	無ければ例外にせず届くまで待つ
	#box?: HTMLElement;
	#resBox?: (el: HTMLElement)=> void;
	readonly #pBox = new Promise<HTMLElement>(re=> {this.#resBox = re});
	attachBox(el: HTMLElement) {this.#box = el; this.#resBox?.(el)}

	readonly #hIfrm		: {[id: string]: HTMLIFrameElement} = Object.create(null);
	readonly #hDisabled	: {[id: string]: boolean} = Object.create(null);
	#zIdx = 1;

	getDisabled(id: string): boolean {return this.#hDisabled[id] ?? false}

	#get(tag: string, id: string): HTMLIFrameElement {
		const f = this.#hIfrm[id];
		if (! f) throw `[${tag}] frame【${id}】が読み込まれていません`;
		return f;
	}
	// iframeのwindow。srcdocで作るので同一オリジン＝中のvar変数・関数へ手が届く
	#win(tag: string, id: string): Record<string, unknown> {
		const w = this.#get(tag, id).contentWindow;
		if (! w) throw `[${tag}] frame【${id}】の中身がありません`;
		return w as unknown as Record<string, unknown>;
	}


	// フレーム追加（本家 FrameMng.ts:69 #add_frame()）。
	//	HTMLを取ってきてsrcdocへ入れ、読み込み完了まで待つ（＝呼び出し側はここでシナリオを止める）
	async add(id: string, src: string, sty: T_FRM_STY): Promise<T_FRM_VALS> {
		if (this.#hIfrm[id]) throw `[add_frame] frame【${id}】はすでにあります`;
		const box = this.#box ?? await this.#pBox;

		const url = this.searchPath(src, SEARCH_PATH_ARG_EXT.HTML);
		const res = await fetch(url);
		if (! res.ok) throw `[add_frame] HTMLの読込に失敗しました src:${src} ${res.statusText}`;
		const html = FrameMng.#resolveUrls(await res.text(), url);

		const f = document.createElement('iframe');
		f.id = id;
		f.style.cssText = 'position: absolute; border: 0; overflow: hidden; pointer-events: auto;';
		box.appendChild(f);
		this.#hIfrm[id] = f;
		this.#hDisabled[id] = false;

		// 既定値は本家と同じ（位置0,0・ステージ全面・不透明・等倍・無回転・表示）
		this.#apply(f, {
			visible: true, alpha: 1, x: 0, y: 0,
			width: CmnLib.stageW, height: CmnLib.stageH,
			scale_x: 1, scale_y: 1, rotate: 0,
			...sty,
		});

		// srcではなくsrcdocに入れる（同一オリジンになり、中のvar変数へ手が届く）。
		//	Firefoxはonloadが二度呼ばれることがあるが、Promiseの解決は一度きりなので問題にならない
		await new Promise<void>((re, rj)=> {
			f.onload = ()=> re();
			f.onerror = ()=> rj(new Error(`[add_frame] frame【${id}】の表示に失敗しました`));
			f.srcdoc = html;
		});

		// 本家と同じ組み込み変数一式。以降[frame]で変えたぶんもここへ書き戻す
		const vn = `const.sn.frm.${id}`;
		return {
			[vn]			: true,
			[`${vn}.alpha`]	: sty.alpha ?? 1,
			[`${vn}.x`]		: sty.x ?? 0,
			[`${vn}.y`]		: sty.y ?? 0,
			[`${vn}.width`]	: sty.width ?? CmnLib.stageW,
			[`${vn}.height`]: sty.height ?? CmnLib.stageH,
			[`${vn}.scale_x`]: sty.scale_x ?? 1,
			[`${vn}.scale_y`]: sty.scale_y ?? 1,
			[`${vn}.rotate`]: sty.rotate ?? 0,
			[`${vn}.visible`]: sty.visible ?? true,
		};
	}

	// フレームに設定（本家 FrameMng.ts:307 #frame()）。書かれた属性だけを変える
	frame(id: string, sty: T_FRM_STY, order?: T_FRM_ORDER, disabled?: boolean): T_FRM_VALS {
		const f = this.#get('frame', id);
		this.#apply(f, sty);

		if (order) {
			// 本家は前面へ出すたびz-indexを増やしていく方式。diveは負にして最背面へ
			const {style} = f;
			if (order.mode === 'float') style.zIndex = String(++this.#zIdx);
			else if (order.mode === 'index') style.zIndex = String(order.index ?? 0);
			else style.zIndex = String(-++this.#zIdx);
		}
		if (disabled !== undefined) {
			this.#hDisabled[id] = disabled;
			const b = f.contentDocument?.body;
			if (b) for (const e of [...b.querySelectorAll('input'), ...b.querySelectorAll('select')]) {
				e.disabled = disabled;
			}
		}

		const vn = `const.sn.frm.${id}`;
		const h: T_FRM_VALS = {};
		for (const [k, v] of Object.entries(sty)) h[`${vn}.${k}`] = v as string | number | boolean;
		return h;
	}

	// 見た目をiframeへ。位置・寸法はステージ座標のまま（箱ごと拡縮されるため）
	#apply(f: HTMLIFrameElement, sty: T_FRM_STY) {
		const s = f.style;
		if (sty.alpha !== undefined) s.opacity = String(sty.alpha);
		if (sty.x !== undefined) s.left = `${String(sty.x)}px`;
		if (sty.y !== undefined) s.top = `${String(sty.y)}px`;
		if (sty.width !== undefined) s.width = `${String(sty.width)}px`;
		if (sty.height !== undefined) s.height = `${String(sty.height)}px`;
		if (sty.scale_x !== undefined || sty.scale_y !== undefined || sty.rotate !== undefined) {
			s.transform = `scale(${String(sty.scale_x ?? 1)}, ${String(sty.scale_y ?? 1)}) rotate(${String(sty.rotate ?? 0)}deg)`;
		}
		if (sty.b_color !== undefined) s.backgroundColor = sty.b_color;
		if (sty.visible !== undefined) s.display = sty.visible ? 'inline' : 'none';
	}

	// フレーム変数に設定（本家 FrameMng.ts:277 #set_frame()）。
	//	iframe内のvar変数へそのまま入れる（フレーム側のJSがこれを読んで描画する作り）
	set(id: string, var_name: string, text: string) {
		this.#win('set_frame', id)[var_name] = text;
	}

	// フレーム変数を取得（本家 FrameMng.ts:250 #let_frame()）。
	//	function=trueならその名前の関数を呼び、戻り値を取る
	get(id: string, var_name: string, fnc: boolean): unknown {
		const win = this.#win('let_frame', id);
		if (! (var_name in win)) {
			throw `[let_frame] frame【${id}】に変数/関数【${var_name}】がありません。変数は var付きにして下さい`;
		}
		const v = win[var_name];
		return fnc ? (v as ()=> unknown)() : v;
	}

	// key='dom=フレームid:セレクタ' の対象要素（本家 ReadingState.getHtmlElmList()）。
	//	**セレクタは大小文字を区別する**ので、呼ぶ側は小文字化前の文字列を渡すこと
	elms(rawKey: string): {id: string; sel: string; aEl: HTMLElement[]} {
		const body = rawKey.slice(4);	// 'dom=' を外す
		const i = body.indexOf(':');
		const id = i < 0 ? body : body.slice(0, i);
		const sel = i < 0 ? '' : body.slice(i + 1);
		const doc = this.#hIfrm[id]?.contentDocument;
		if (! doc) throw `[event] frame【${id}】が読み込まれていません`;

		return {id, sel, aEl: sel ? [...doc.querySelectorAll<HTMLElement>(sel)] : [doc.body]};
	}

	// dom=予約の付け外し。本家はinput種別でイベント名を変える（EventMng.ts:571）ので合わせる
	readonly #hDomLsn: {[key: string]: {el: HTMLElement; ev: string; fnc: EventListener}[]} = Object.create(null);
	resvDom(rawKey: string, key: string, del: boolean, needErr: boolean, fire: ()=> void) {
		for (const {el, ev, fnc} of this.#hDomLsn[key] ?? []) el.removeEventListener(ev, fnc);
		// eslint-disable-next-line @typescript-eslint/no-dynamic-delete
		delete this.#hDomLsn[key];
		if (del) return;

		const {id, sel, aEl} = this.elms(rawKey);
		if (aEl.length === 0) {
			if (needErr) throw `[event] HTML内にセレクタ（${sel}）に対応する要素が見つかりません。存在しない場合を許容するなら、need_err=false と指定してください`;
			return;
		}

		// チェックボックス・スライダ・テキストは変更イベントで拾う（本家と同じ振り分け）
		const type = (aEl[0] as HTMLInputElement).type || '';
		const aEv = type === 'checkbox' || type === 'range' ? ['input']
			: type === 'text' || type === 'textarea' ? ['input', 'change']
			: ['click', 'keydown'];

		const a: {el: HTMLElement; ev: string; fnc: EventListener}[] = [];
		for (const el of aEl) for (const ev of aEv) {
			const fnc: EventListener = e=> {
				if (this.getDisabled(id)) return;	// [frame disabled=true]の間は反応しない
				if (ev === 'keydown' && (e as KeyboardEvent).key !== 'Enter') return;
				fire();
			};
			el.addEventListener(ev, fnc);
			a.push({el, ev, fnc});
		}
		this.#hDomLsn[key] = a;
	}


	// srcdocへ入れる前に、HTML内の相対パスをそのHTMLの置き場所からの相対へ直す
	//	（srcdocの中では相対パスの基準がドキュメント自身ではなくなるため。本家 FrameMng.ts:122）。
	//	【\s】が大事：data-src を巻き込まないため
	static readonly #REG_URL = /\s(?:src|href)=(["'])(\S+?)\1/g;
	static #resolveUrls(html: string, url: string): string {
		const dir = url.slice(0, url.lastIndexOf('/') + 1);
		return html.replaceAll(FrameMng.#REG_URL, (m, br: string, v: string)=> v.startsWith('../')
			? dir + m.slice(3)
			: m.replace('./', '').replace(br, br + dir)
		);
	}

}
