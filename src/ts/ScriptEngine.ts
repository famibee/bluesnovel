/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2026-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

// 試作版：シナリオ解析エンジン（超簡略版）
//	skynovel_esm/src/sn/ScriptIterator.ts, Main.ts#main() の基本ループを参考に、
//	試作に必要な最小限のタグのみサポートする。
//	・DOM / fetch に依存しないため bun test で直接検証できる。
//	・[l][p][s] で停止し、そこまでに生じた表示変化を T_ENGINE_ACTION[] として返す。
//	・戻り値をどう画面へ反映するかは呼び出し側（ScriptMng.ts）の責務とする。

export type T_ENGINE_ACTION =
	| {t: 'addLay'; cls: 'grp' | 'txt'; nm: string}
	| {t: 'chgPic'; nm: string; fn: string}
	| {t: 'chgStr'; nm: string; str: string}		// そのレイヤの「そのページでの全文字列」
	| {t: 'stop'; kind: 'l' | 'p' | 's'; key: string; nm: string}	// 状態確定ポイント（Caretakerキー、nmは待ち中の文字レイヤ）
;

export type T_TAG_PARSED = {
	name: string;
	args: {[k: string]: string};
};


export class ScriptEngine {
	// 本家 Grammar.ts 同様、「[tag ...]」「改行」「地の文」の3種でトークン化する
	//	（本家ほど厳密ではない。属性値の"["文字などは非対応 = 試作の割り切り）
	static readonly RE_TOKEN = /\[[^\]]*\]|\r\n|\n|[^\[\r\n]+/g;
	static tokenize(src: string): string[] {
		return src.match(this.RE_TOKEN) ?? [];
	}

	static readonly RE_ARG = /(\w+)\s*=\s*(?:"([^"]*)"|'([^']*)'|(\S+))/g;
	static parseTag(token: string): T_TAG_PARSED {
		const inner = token.slice(1, -1).trim();
		const sp = inner.search(/\s/);
		const name = sp === -1 ? inner : inner.slice(0, sp);
		const args: {[k: string]: string} = {};
		if (sp !== -1) {
			const rest = inner.slice(sp + 1);
			this.RE_ARG.lastIndex = 0;
			let m: RegExpExecArray | null;
			// eslint-disable-next-line no-cond-assign
			while (m = this.RE_ARG.exec(rest)) args[m[1]!] = m[2] ?? m[3] ?? m[4] ?? '';
		}
		return {name, args};
	}


	readonly #aToken: string[];
	#idx = 0;
	readonly #hLabel: {[label: string]: number} = {};	// *label -> トークン索引
	#curTxtLayer = 'mes';
	readonly #hTxt: {[nm: string]: string} = {};		// レイヤ名 -> そのページの蓄積文字列
	#clearOnResume = false;	// 前回[p]で停止した後、次のstep()開始時に現在レイヤをクリアするか

	constructor(readonly fn: string, src: string) {
		this.#aToken = ScriptEngine.tokenize(src);
		this.#aToken.forEach((tkn, i) => {
			// * ラベル（本家同様、先頭が'*'かつ1文字超のトークン。行頭のタブ/空白は無視する）
			const t = tkn.trimStart();
			if (t.charCodeAt(0) === 42 && t.length > 1) this.#hLabel[t.trim()] = i + 1;
		});
	}

	get idx() {return this.#idx}
	get atEnd() {return this.#idx >= this.#aToken.length}

	// 次の[l][p][s]（またはスクリプト終端）まで進め、その間に生じた表示変化を返す
	step(): T_ENGINE_ACTION[] {
		const aAct: T_ENGINE_ACTION[] = [];
		if (this.#clearOnResume) {	// 前回[p]で停止した後の再開なので、現在レイヤを先にクリア
			this.#clearOnResume = false;
			this.#hTxt[this.#curTxtLayer] = '';
			aAct.push({t: 'chgStr', nm: this.#curTxtLayer, str: ''});
		}
		const len = this.#aToken.length;
		while (this.#idx < len) {
			const token = this.#aToken[this.#idx++]!;
			if (token === '' || token === '\n' || token === '\r\n') continue;

			const uc = token.trimStart().charCodeAt(0);	// TokenTopUnicode（本家命名に合わせる。行頭のタブ/空白は無視）
			if (uc === 59) continue;				// ; コメント
			if (uc === 42 && token.trimStart().length > 1) continue;	// *ラベル定義（実行時はスキップ）

			if (uc === 91) {	// [ タグ開始
				const {name, args} = ScriptEngine.parseTag(token);
				switch (name) {
				case 'add_lay': {
					const nm = args.layer ?? args.nm ?? '';
					if (! nm) throw '[add_lay] layerは必須です（試作仕様）';
					const cls = (args.class ?? 'txt').toLowerCase() === 'grp' ? 'grp' : 'txt';
					this.#hTxt[nm] = '';
					aAct.push({t: 'addLay', cls, nm});
					continue;
				}
				case 'current':	// デフォルト文字レイヤ切替（試作簡略：layer属性のみ）
					this.#curTxtLayer = args.layer ?? args.nm ?? this.#curTxtLayer;
					continue;

				case 'lay':		// 試作簡略：画像レイヤの絵（pic属性）変更のみ対応
					if (args.pic) aAct.push({t: 'chgPic', nm: args.layer ?? '', fn: args.pic});
					continue;

				case 'r':		// 改行
					this.#appendTxt(aAct, '\n');
					continue;
				case 'er':		// ページ両面の文字消去（試作簡略：現在レイヤのみ）
					this.#hTxt[this.#curTxtLayer] = '';
					aAct.push({t: 'chgStr', nm: this.#curTxtLayer, str: ''});
					continue;

				case 'jump': {	// シナリオジャンプ（試作簡略：同一スクリプト内ラベルのみ）
					const label = args.label ?? '';
					const to = this.#hLabel[label];
					if (to === undefined) throw `[jump] ラベル【${label}】が見つかりません（試作は同一ファイル内のみ対応）`;
					this.#idx = to;
					continue;
				}

				case 'l': case 'p': case 's':	// 行末クリック待ち／改ページ／停止
					if (name === 'p') this.#clearOnResume = true;	// [p]の次の進行時に現在レイヤをクリア（試作の改ページ挙動）
					aAct.push({t: 'stop', kind: name, key: `${this.fn}:${String(this.#idx)}`, nm: this.#curTxtLayer});
					return aAct;

				default:
					continue;	// 試作では未対応タグは無視（後の本実装で拡充）
				}
			}

			// 文字表示（プレーンテキスト＝地の文）
			this.#appendTxt(aAct, token);
		}
		return aAct;	// スクリプト終端まで到達
	}
	#appendTxt(aAct: T_ENGINE_ACTION[], add: string) {
		const nm = this.#curTxtLayer;
		const str = (this.#hTxt[nm] ?? '') + add;
		this.#hTxt[nm] = str;
		aAct.push({t: 'chgStr', nm, str});
	}

}
