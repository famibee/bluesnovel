/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2026-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

// .sn 1ファイル分のパース結果（トークン列とラベル表）。読み取り専用。
//	複数ファイル対応にあたり、ScriptEngineから「ファイルごとに変わるもの」だけを切り出した。
//	ScriptEngineは実行状態（現在位置・スタック・変数）だけを持ち、
//	どのScriptを実行中かを差し替えることでファイルを跨ぐ（本家 ScriptIterator の #script 相当）。

import {Grammar, type TArg, type T_HTag, type Script as T_TOKENS} from '../sn/Grammar';

export class Script {
	// Grammarのトークン列。[char2macro]/[bracket2macro]は定義位置より後ろのトークンを
	//	書き換える（＝トークンが増減する）ので、配列だけでなくGrammarのScript構造ごと保持する
	readonly #scr	: T_TOKENS;
	get aToken(): readonly string[] {return this.#scr.aToken}

	#hLabel: {[label: string]: number} = Object.create(null);	// *label -> トークン索引

	// grmはプロジェクト単位で共有するもの（エスケープ文字・[char2macro]/[bracket2macro]の
	//	定義はGrammarインスタンスが保持するため、ファイルごとに別だと設定が行き渡らない）。
	//	実行時は ScriptMng が1つ作って全Scriptへ渡す。省略時は単体テスト用の既定インスタンス
	constructor(readonly fn: string, src: string, readonly grm = new Grammar) {
		this.#scr = grm.resolveScript(src);
		this.#makeLabel();
	}

	// ラベル定義を記録。Grammarのトークンは行頭のタブが別トークンに分かれるため、
	//	ラベルトークンは必ず「*」始まり（本家 Main.ts:262 の uc===42 && length>1 と同じ判定）。
	//	末尾に半角空白が残ることはあるのでtrim()する。
	//	[let_ml]〜[endlet_ml]の本文は「ただのテキスト」なので、中に「*〜」の行があっても
	//	ラベルとして拾わない（本家 ScriptIterator.ts:1196 の in_let_ml と同じ）
	#makeLabel() {
		const h: {[label: string]: number} = Object.create(null);
		let inLetMl = false;
		this.aToken.forEach((tkn, i)=> {
			if (inLetMl) {
				if (this.grm.testTagEndLetml(tkn)) inLetMl = false;
				return;
			}
			if (tkn.charCodeAt(0) === 42 && tkn.length > 1) {h[tkn.trim()] = i + 1; return}
			if (this.grm.testTagLetml(tkn)) inLetMl = true;
		});
		this.#hLabel = h;
	}

	get len() {return this.#scr.aToken.length}

	// ラベル名（*付き）から「その次のトークンの索引」を得る。未定義ならundefined
	label2idx(label: string): number | undefined {return this.#hLabel[label]}

	// [char2macro]/[bracket2macro]＝一文字／括弧をタグ・マクロ呼び出しへ読み替える定義
	//	（本家 ScriptIterator.ts:1347/1354 が Grammar へ丸投げしているのと同じ）。
	//	・定義そのものはGrammar（＝プロジェクト共有インスタンス）が抱えるので、これ以降に
	//	  パースされるファイルは resolveScript() の時点で置換済みになる。
	//	  既にパース済みの他ファイルには及ばない（本家も同じ）
	//	・start_idx（＝定義タグの次のトークン）以降だけが置換対象。1トークンが複数へ割れて
	//	  索引がずれるため、ラベル表を作り直す
	defC2M(tag: 'char2macro' | 'bracket2macro', args: {[k: string]: string}, hTag: {[nm: string]: boolean}, start_idx: number) {
		// 本家のTArg/T_HTagは属性名・タグ名を列挙した固定型なので、試作の「名前->値」表からは
		//	unknown経由で渡す（本家から移植したtest/Grammar.test.tsと同じ流儀）
		this.grm[tag](<TArg><unknown>args, <T_HTag><unknown>hTag, this.#scr, start_idx);
		this.#makeLabel();
	}
}
