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
	get aLNum(): readonly number[] {return this.#scr.aLNum}

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

	// 無名ラベル（`**`/`***`…+`before`/`after`）判定。本家 ScriptIterator.ts:1137 と同じ正規表現
	static readonly #REG_NONAME_LABEL = /(\*{2,})([^|]*)/;
	// マクロ定義の境界トークン判定。本家 ScriptIterator.ts:1136-1137 と同じ正規表現
	static readonly #REG_TOKEN_MACRO_BEGIN = /^\[macro\s/;
	static readonly #REG_TOKEN_MACRO_END = /^\[endmacro[\s\]]/;

	// ラベル名（*付き）から「その次のトークンの索引」を得る。未定義ならundefined。
	//	`**after`/`**before`等の無名ラベルは事前登録された表を引かず、fromIdxを起点に前後どちらかへ
	//	トークンを線形走査し、`**`（*が2個以上連続）と完全一致する行を探す（本家 ScriptIterator.ts:1164
	//	#seekScript()の無名ラベルジャンプ分岐を移植。名前付きラベルと違い**現在の実行位置に応じて
	//	行き先が変わる**ため、呼び出し側は必ず現在のトークン位置をfromIdxへ渡すこと）。
	//	inMacro：呼び出し元がマクロ本体を実行中か（呼び出し側が`mp:const.sn.macro`の有無で判定して渡す）。
	//	マクロ実行中の探索が定義済みマクロの境界（[macro]/[endmacro]）を越えて無関係な`**`マーカーへ
	//	誤ヒットしないよう、越えた時点で打ち切りundefinedを返す（本家 ScriptIterator.ts:1173-1183）。
	//	beforeはinMacro時のみ[macro]境界をチェックし、afterはinMacro不問で[endmacro]境界をチェック
	//	するという非対称も本家のまま踏襲する（afterは実行時に読み飛ばされるマクロ本体を横切ったこと
	//	自体が常に不正、beforeは定義済みマクロの中身を単に通過するだけなら不正ではないため）
	label2idx(label: string, fromIdx: number, inMacro = false): number | undefined {
		const m = label.match(Script.#REG_NONAME_LABEL);
		if (! m) return this.#hLabel[label];

		const marker = m[1]!;
		if (m[2] === 'before') {
			for (let i = fromIdx - 1; i >= 0; --i) {
				if (inMacro && Script.#REG_TOKEN_MACRO_BEGIN.test(this.aToken[i]!)) return undefined;
				if (this.aToken[i] === marker) return i + 1;
			}
			return undefined;
		}
		if (m[2] === 'after') {
			for (let i = fromIdx + 1; i < this.len; ++i) {
				if (Script.#REG_TOKEN_MACRO_END.test(this.aToken[i]!)) return undefined;
				if (this.aToken[i] === marker) return i + 1;
			}
			return undefined;
		}
		return undefined;
	}

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
