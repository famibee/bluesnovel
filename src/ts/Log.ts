/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2026-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

// 本文履歴（ログ）。本家 Log.ts の移植だが、**溜めるものが違う**。
//
//	本家はTxtLayerが組み立てた**表示用HTMLそのもの**（`#aSpan`）を記録し、正規表現で
//	アニメ用のstyleやdata-*属性を削り落として履歴テキストにする（TxtLayer.ts:604）。
//	こちらは表示単位（T_CH）へ割る**前の生の本文文字列**を溜め、読み出し時にHTMLへ起こす。
//	理由は2つ:
//	・エンジンはDOMを持たないので「表示されたHTML」というものが存在しない
//	・`splitCh()`が既にルビ記法と埋め込み命令を解釈できる＝削り落とすのではなく組み立てられる
//
//	帰結として本家との相違が2つある。どちらも履歴表示の用途では困らないと判断した:
//	・`[link]`のリンクは落とす（履歴でクリックできても飛び先の文脈が無い）
//	・`[graph]`のインライン画像は本文と同じ全角空白1つになる（画像のパス解決はScriptMngの
//	  仕事で、エンジン側が持つ生文字列にはURLが入っていないため）

import {rubyTxt, splitCh, type T_CH} from './Txt';


export type T_LOG_ENTRY = {text: string};

// prj.jsonの`log.max_len`（ConfigBase.tsの既定と同じ値）。
//	設定を読む前でも動くよう、この場でも既定値を持つ
const MAX_LEN_DEF = 64;

const esc = (s: string)=> s
	.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
const escAttr = (s: string)=> esc(s).replaceAll(`'`, '&#39;');

// 生の本文文字列 → 履歴用HTML。フレーム側（テンプレの`frames/_log.htm`）が
//	`innerHTML`へ入れるので、本家と同じくHTMLを返す
export function htmlOf(raw: string): string {return htmlOfCh(splitCh(raw))}
export function htmlOfCh(aCh: readonly T_CH[]): string {
	let ret = '';
	for (const v of aCh) {
		if (v.c === '\n') {ret += '<br/>'; continue}

		const c = esc(v.c);
		const body = v.r
			? `<ruby>${c}<rt${v.rs ?` style='${escAttr(v.rs)}'` :''}>${esc(rubyTxt(v.r))}</rt></ruby>`
			: c;
		// 縦中横は履歴でも縦中横のまま出す（本家もTxtLayer.ts:690で
		//	`text-combine-upright: all`を残したHTMLを記録する）
		const sty = (v.s ?? '') + (v.tcy ?'text-combine-upright: all;' :'');
		ret += sty ?`<span style='${escAttr(sty)}'>${body}</span>` :body;
	}
	return ret;
}


// ログ本体。**確定した過去ページはHTML、書きかけの現ページは生文字列**という持ち方。
//	過去ページを生のまま持たないのは、`[reset_rec text=…]`や`playback()`で外から
//	HTMLが入ってくる経路があり、そこだけ形が違うと読み出しの分岐が増えるため
export class Log {
	#aLog	: T_LOG_ENTRY[]	= [];	// 確定した過去ページ（本家 #aLog）
	#last	= '';					// 書きかけの現ページ（本家 #LastLog）

	// max_lenは遅延で読む。prj.jsonを読み込む前にエンジンが立つため
	constructor(private readonly maxLen: ()=> number = ()=> MAX_LEN_DEF) {}

	// 本文の追記（地の文・`[r]`・`[rec_ch]`・`[rec_r]`）
	add(txt: string) {this.#last += txt}

	// 改ページ。**空ページは積まない**（本家 Log.ts:105）ので、
	//	`[er]`が続いたりUI画面を出入りしただけでは履歴が増えない
	pagebreak() {
		const text = htmlOf(this.#last);
		this.#last = '';
		if (! text) return;

		const max = this.maxLen();
		if (this.#aLog.push({text}) > max) this.#aLog = this.#aLog.slice(-max);
	}

	// `[reset_rec]`。textで置き換え値を設定できる（本家 Log.ts:90）
	reset(text = '') {this.#aLog = []; this.#last = text}

	// 組み込み変数 `const.sn.log.json`（本家 Log.ts:39 defTmp）。
	//	本家と同じく**書きかけの現ページも末尾に含める**（履歴画面は「今読んでいる文」まで見せる）
	json(): string {return JSON.stringify([...this.#aLog, {text: htmlOf(this.#last)}])}

	// `save:const.sn.sLog`からの復帰（本家 Log.ts:113 playback()）。
	//	本家と同じく書きかけページは捨て、保存時点の全ページを確定ページとして読み直す
	playback(json: string) {
		try {
			const a: unknown = JSON.parse(json);
			this.#aLog = Array.isArray(a) ?a as T_LOG_ENTRY[] :[];
		}
		catch {this.#aLog = []}	// 壊れていても履歴が消えるだけ。進行は止めない
		this.#last = '';
	}
}
