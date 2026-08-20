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
import {decryptPicUrl} from './Crypto';

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
	constructor(
		private readonly searchPath: T_SEARCHPATH,
		private readonly fetch: (url: string, init?: RequestInit)=> Promise<Response>,
		// crypto:true時のみ意味を持つ（既定は恒等関数。SysBase.dec/decAB参照）。
		//	HTML本体はテキストなのでdec、フレーム内<img>はdecryptPicUrl経由でdecABを使う（本家
		//	FrameMng.ts:107-118／200-220と同じ2箇所）。cryptoはdecryptPicUrlのcrypto:false
		//	素通し判定に使う（渡し忘れるとcrypto:false構成でも無駄にBlob URL化されるため必須）
		private readonly dec: (ext: string, tx: string)=> Promise<string>,
		private readonly decAB: (ab: ArrayBuffer)=> Promise<ArrayBuffer>,
		private readonly crypto: boolean,
	) { /* empty */ }

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
	// 各フレームの**今の**見た目。[add_frame]で既定値ごと埋め、[frame]/[tsy_frame]で更新する。
	//	個別に持たないと、scale_xだけ指定した[frame]がscale_y・rotateを既定値へ戻してしまう
	//	（transformは3つで1つの値なので、書き換えには残り2つの現在値が要る）。
	//	[tsy_frame]の開始値もここから取る（本家は組み込み変数 const.sn.frm.<id>.* を読み直している）
	readonly #hSty		: {[id: string]: T_FRM_STY} = Object.create(null);
	#zIdx = 1;

	getDisabled(id: string): boolean {return this.#hDisabled[id] ?? false}
	getSty(id: string): T_FRM_STY {this.#get('tsy_frame', id); return this.#hSty[id] ?? {}}

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
		const res = await this.fetch(url);
		if (! res.ok) throw `[add_frame] HTMLの読込に失敗しました src:${src} ${res.statusText}`;
		// crypto:false時はdecが恒等関数なのでそのまま通る（ScriptMng #fetchScriptと同じ形）
		const html = FrameMng.#resolveUrls(await this.dec(url, await res.text()), url);

		const f = document.createElement('iframe');
		f.id = id;
		f.style.cssText = 'position: absolute; border: 0; overflow: hidden; pointer-events: auto;';
		box.appendChild(f);
		this.#hIfrm[id] = f;
		this.#hDisabled[id] = false;

		// 既定値は本家と同じ（位置0,0・ステージ全面・不透明・等倍・無回転・表示）
		this.#apply(f, this.#hSty[id] = {
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

		// 本家 sn_repRes フック：フレーム内の画像ロード関数を差し替える（関数名は本家仕様で変更不可）。
		//	フレームの既定は `data-src` をそのまま `src` へ入れるが、srcdocでは相対srcが親ドキュメントの
		//	URL基準になり見つからない（アルバムのサムネイル `_album_miken.jpg` が404）。ここで
		//	**フレームHTMLのディレクトリを前置**して解決する（静的src/hrefと同じ流儀）。グリッド構築より前
		//	（[let_frame init]の前）に差し替わるので、構築時の setImg 呼び出しから効く。
		//	絶対URL・data:・ルート絶対はそのまま通す
		const dir = FrameMng.#dirOf(url);
		(f.contentWindow as unknown as {sn_repRes?: (fnc: (i: HTMLImageElement)=> void)=> void})
			.sn_repRes?.((i: HTMLImageElement)=> {void this.#srcOf(dir, i.dataset.src ?? '').then(src=> {i.src = src})});

		// フレーム内にフォーカスがある間、キー入力は**親のdocumentまで飛んでこない**。
		//	そのままだと[set_focus to=next]で一度フレームへ入ったら最後、矢印キーが効かなくなる。
		//	本家も同じ事情で各フレームのbodyへイベントを張っている（EventMng.resvFlameEvent()）。
		//	こちらは同じ内容のイベントを親のdocumentへ投げ直して、Main.tsxの1本の経路へ合流させる
		f.contentDocument?.addEventListener('keydown', e=> {
			document.dispatchEvent(new KeyboardEvent('keydown', {
				key: e.key, code: e.code, bubbles: true,
				altKey: e.altKey, ctrlKey: e.ctrlKey, metaKey: e.metaKey, shiftKey: e.shiftKey,
			}));
		});
		// 右クリックも同じ事情で投げ直す（本家も resvFlameEvent() でフレームbodyへ張る）。
		//	テンプレの枠（アルバム・設定・履歴）は[event key=rightclick]で自分を閉じるので、
		//	これが無いと枠の上で右クリックしても閉じられない
		f.contentDocument?.addEventListener('contextmenu', e=> {
			e.preventDefault();
			document.dispatchEvent(new MouseEvent('contextmenu', {
				bubbles: true,
				altKey: e.altKey, ctrlKey: e.ctrlKey, metaKey: e.metaKey, shiftKey: e.shiftKey,
			}));
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
		// 書かれた分だけを現在の見た目へ重ね、まとめて反映する（transformの取りこぼし対策。#hSty参照）
		this.#apply(f, Object.assign(this.#hSty[id] ??= {}, sty));

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
			// button要素も対象（[frame disabled=true]でフォーカスの輪から外すため。FocusMng.#canFocus()
			//	参照。inputだけだと[button]相当のUI（右クリックメニュー等）が無効化されずフォーカスに残る）
			if (b) for (const e of b.querySelectorAll('input, select, button')) {
				(e as HTMLInputElement | HTMLSelectElement | HTMLButtonElement).disabled = disabled;
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

	// key='dom=フレームid:セレクタ' の対象要素（本家 Reading.ts:79 getHtmlElmList()）。
	//	コロンが無い場合（'dom=セレクタ'）はフレームでなくメイン文書が対象（本家Reading.ts:95）
	//	**セレクタは大小文字を区別する**ので、呼ぶ側は小文字化前の文字列を渡すこと
	elms(rawKey: string): {id: string; sel: string; aEl: HTMLElement[]} {
		const body = rawKey.slice(4);	// 'dom=' を外す
		const i = body.indexOf(':');
		if (i < 0) return {id: '', sel: body, aEl: [...document.querySelectorAll<HTMLElement>(body)]};

		const id = body.slice(0, i);
		const sel = body.slice(i + 1);
		const doc = this.#hIfrm[id]?.contentDocument;
		if (! doc) throw `[event] frame【${id}】が読み込まれていません`;

		return {id, sel, aEl: sel ? [...doc.querySelectorAll<HTMLElement>(sel)] : [doc.body]};
	}

	// dom=予約の付け外し。本家はinput種別でイベント名を変える（EventMng.ts:571）ので合わせる
	readonly #hDomLsn: {[key: string]: {el: HTMLElement; ev: string; fnc: EventListener}[]} = Object.create(null);
	resvDom(rawKey: string, key: string, del: boolean, needErr: boolean, fire: (el: HTMLElement)=> void): HTMLElement[] {
		for (const {el, ev, fnc} of this.#hDomLsn[key] ?? []) el.removeEventListener(ev, fnc);
		// eslint-disable-next-line @typescript-eslint/no-dynamic-delete
		delete this.#hDomLsn[key];
		if (del) return [];

		const {id, sel, aEl} = this.elms(rawKey);
		if (aEl.length === 0) {
			if (needErr) throw `[event] HTML内にセレクタ（${sel}）に対応する要素が見つかりません。存在しない場合を許容するなら、need_err=false と指定してください`;
			return [];
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
				// stopImmediatePropagation()にする理由は2つ。ScriptMng#applyAction 'resvDomEvent'は
				//	この関数（el.addEventListener）の後にfocusMng.add(el)する順序なので、同じelの
				//	同じ'keydown'に対してこちらが先に呼ばれる：
				//	1. stopPropagationだけだと、ここで処理したEnterがフレームdocument内をbubbleし
				//	   続け、上のkeydown中継（フレーム内keydownを親documentへ再dispatchする箇所）
				//	   経由で親Main.tsxのuseKeyまで届く。届いた側は「フォーカス中の要素は自前で
				//	   処理しstopPropagation()する」前提（Main.tsx参照）で読み進めのnext()を呼ぶ
				//	2. 同一要素の他リスナはstopPropagationでは止まらない。FocusMng.#keyHandlerOf は
				//	   button/a要素かつe.isTrusted===false（ゲームパッド由来の合成イベント）の時、
				//	   「本物のEnterなら自動で起きるclick」を模倣してelへ合成clickを**再dispatch**
				//	   する。これがこの関数のclickリスナに拾われ、fire(el)がもう一度走ってしまう
				//	   （実キーボードのEnterはisTrusted:trueなのでFocusMng側が早期returnし影響しない。
				//	   ゲームパッド実機でのみ「メニューを閉じる処理が2回走る」形で表面化していた）
				if (ev === 'keydown') {e.stopImmediatePropagation(); e.preventDefault()}
				fire(el);	// 発火した要素を渡す（本家 EventMng.ts:591 の data-* 取り出しのため）
			};
			el.addEventListener(ev, fnc);
			a.push({el, ev, fnc});
		}
		this.#hDomLsn[key] = a;
		return aEl;
	}

	// [set_focus add=/del='dom=…'] 用。イベントは張らず、対象要素を返すだけ
	resolveDom(rawKey: string, needErr: boolean): HTMLElement[] {
		const {sel, aEl} = this.elms(rawKey);
		if (aEl.length === 0 && needErr) {
			throw `[set_focus] HTML内にセレクタ（${sel}）に対応する要素が見つかりません。存在しない場合を許容するなら、need_err=false と指定してください`;
		}
		return aEl;
	}


	// フレームHTMLのディレクトリ（例 `prj/frames/`）。相対URLはこれを前置して解決する。
	//	srcdocの相対URLはドキュメント自身ではなく親ドキュメントのURL基準になるため、前置した相対パスが
	//	結果的に親URL基準で正しい場所を指す。動的に付く画像src（#repImg）でも同じdirを使う
	static #dirOf(url: string): string {return url.slice(0, url.lastIndexOf('/') + 1)}

	// フレーム内の<img data-src=…>を実URLへ（本家 FrameMng.ts:154 → #loadPic2Img()）。
	//	**まずプロジェクトのパス解決（path.json）に通す**のが本家。テンプレのアルバムは
	//	解放済み項目のdata-srcに`F_kuchimoto`のような**拡張子なしのアセット名**を書くので、
	//	フレームのディレクトリを前置するだけでは`frames/F_kuchimoto`になって404になる
	//	（＝アルバムで絵がリンク切れになっていた）。
	//	`./_album_miken.jpg`のような枠自身の相対ファイルもsearchPathが拾える
	//	（ファイル名＋拡張子で引ける形なので）。
	//	絶対URL（任意スキーム。app:/file:含む）・ルート絶対・data:はそのまま通し、サーチパスに
	//	無ければ従来どおりディレクトリ前置へ落とす（枠に同梱しただけでpath.jsonに載らない画像のため）
	async #srcOf(dir: string, ds: string): Promise<string> {
		if (! ds) return '';
		if (/^(?:[a-z][a-z\d+\-.]*:|\/)/i.test(ds)) return ds;
		try {
			// searchPathで解決できたものだけcrypto対象（本家 #loadPic2Img も同様）。
			//	解決できずディレクトリ前置へ落ちるものは枠に同梱しただけの画像で暗号化対象外
			const url = this.searchPath(ds, SEARCH_PATH_ARG_EXT.SP_GSM);
			return await decryptPicUrl(url, this.crypto, this.fetch, this.decAB);
		}
		catch {return dir + ds.replace(/^\.\//, '')}
	}

	// srcdocへ入れる前に、HTML内の**静的な**相対パス（src/href）をHTMLの置き場所からの相対へ直す
	//	（本家 FrameMng.ts:122）。【\s】が大事：data-src を巻き込まないため。
	//	なお`<base>`を1つ置けば静的・動的まとめて解決できるが、`<base>`はdefer付き`<script src>`に
	//	効かず bootstrap 等が404になるため採らない（動的画像は#repImg＝本家sn_repResフックで別途解決する）
	static readonly #REG_URL = /\s(?:src|href)=(["'])(\S+?)\1/g;
	static #resolveUrls(html: string, url: string): string {
		const dir = FrameMng.#dirOf(url);
		return html.replaceAll(FrameMng.#REG_URL, (m, br: string, v: string)=> v.startsWith('../')
			? dir + m.slice(3)
			: m.replace('./', '').replace(br, br + dir)
		);
	}

}
