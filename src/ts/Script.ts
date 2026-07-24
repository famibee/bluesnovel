/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2026-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

// .sn 1ファイル分のパース結果（トークン列とラベル表）。読み取り専用。
//	複数ファイル対応にあたり、ScriptEngineから「ファイルごとに変わるもの」だけを切り出した。
//	ScriptEngineは実行状態（現在位置・スタック・変数）だけを持ち、
//	どのScriptを実行中かを差し替えることでファイルを跨ぐ（本家 ScriptIterator の #script 相当）。

import {Grammar} from '../sn/Grammar';

export class Script {
	readonly aToken	: readonly string[];
	readonly #hLabel: {[label: string]: number} = Object.create(null);	// *label -> トークン索引

	// grmはプロジェクト単位で共有するもの（エスケープ文字・[char2macro]/[bracket2macro]の
	//	定義はGrammarインスタンスが保持するため、ファイルごとに別だと設定が行き渡らない）。
	//	実行時は ScriptMng が1つ作って全Scriptへ渡す。省略時は単体テスト用の既定インスタンス
	constructor(readonly fn: string, src: string, readonly grm = new Grammar) {
		this.aToken = grm.resolveScript(src).aToken;

		// ラベル定義を記録。Grammarのトークンは行頭のタブが別トークンに分かれるため、
		//	ラベルトークンは必ず「*」始まり（本家 Main.ts:262 の uc===42 && length>1 と同じ判定）。
		//	末尾に半角空白が残ることはあるのでtrim()する。
		//	[let_ml]〜[endlet_ml]の本文は「ただのテキスト」なので、中に「*〜」の行があっても
		//	ラベルとして拾わない（本家 ScriptIterator.ts:1196 の in_let_ml と同じ）
		let inLetMl = false;
		this.aToken.forEach((tkn, i)=> {
			if (inLetMl) {
				if (grm.testTagEndLetml(tkn)) inLetMl = false;
				return;
			}
			if (tkn.charCodeAt(0) === 42 && tkn.length > 1) {this.#hLabel[tkn.trim()] = i + 1; return}
			if (grm.testTagLetml(tkn)) inLetMl = true;
		});
	}

	get len() {return this.aToken.length}

	// ラベル名（*付き）から「その次のトークンの索引」を得る。未定義ならundefined
	label2idx(label: string): number | undefined {return this.#hLabel[label]}
}
