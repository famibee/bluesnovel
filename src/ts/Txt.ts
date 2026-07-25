/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2026-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

// 本文の文字組み（純粋部分）。ルビ記法を割るのは本家から丸移植した RubySpliter で、
//	ここはそれを「表示単位の配列」に受け直すだけの薄い層。
//	**本家も文字組みはGrammar（字句解析）ではなく表示側で行う**ので、シナリオが書いた
//	生の文字列はエンジンとストアをそのまま通り、割るのはここ（ScriptMngの翻訳時）。

import {RubySpliter} from '../sn/RubySpliter';


// エスケープ文字（prj.jsonのinit.escape）。**RubySpliterは正規表現をここで組み立てるので、
//	splitCh()より前に必ず一度は呼ばれていなければならない**（本家 ScriptIterator.ts:122 が
//	Grammarと同じ値を配る）。プロジェクト設定を読む前でも動くよう、この場で既定値を入れておく
export function setEscape(ce: string) {RubySpliter.setEscape(ce)}
setEscape('');

// [link]〜[endlink]の区間。クリックで[button]と同じ経路（ScriptMng.jumpToLabelAndGo）へ流す
export type T_LNK = {
	label	: string;
	fn		: string;
	call	: boolean;
	arg		: string;	// 飛び先で &sn.eventArg として受け取れる（本家と同じ）
	sh?		: string;	// style_hover。マウスが乗っている間だけ当てるCSS
};
// 表示単位1つ。ルビ付きなら c が親文字（複数文字のこともある）、r がルビ文字。
//	s / rs は[span]・[ch]・[link]で指定されたインラインCSS（本文側／ルビ側）
export type T_CH = {c: string; r?: string; s?: string; rs?: string; tcy?: true; lnk?: T_LNK};

// 本文ストリームに埋め込まれた命令（本家 LayerMng.ts:315 #cmdTxt）。
//	`｜&emsp;《コマンド名｜URIエンコードしたJSON》`の形でルビ側に載っており、
//	RubySpliterが復号して`コマンド名｜{…}`という「ルビ」として渡してくる。
//	**ルビの位置指定（`center｜ヽ`）と形が同じ**なので、コマンド名で見分ける（本家も同じ）
const A_CMD = ['span', 'add', 'add_close', 'grp', 'tcy', 'link', 'endlink', 'del', 'gotxt'];
type T_CMD_ARG = {
	style?: string; r_style?: string; style_hover?: string;
	t?: string; r?: string;			// [tcy]
	label?: string; fn?: string; call?: string; arg?: string;	// [link]
};
function parseCmd(r: string): {cmd: string; o: T_CMD_ARG} | undefined {
	const i = r.indexOf('｜');
	if (i < 1) return undefined;

	const cmd = r.slice(0, i);
	if (! A_CMD.includes(cmd)) return undefined;

	const a1 = r.slice(i + 1);
	try {return {cmd, o: (a1 ? JSON.parse(a1) : {}) as T_CMD_ARG}}
	catch {return {cmd, o: {}}}	// 壊れたJSONでも本文表示は続ける（命令として捨てる）
}

// 本文の生文字列 → 表示単位の並び。
//	`｜親文字《ルビ》`・`漢字《ルビ》`・傍点`《*》`（本家 RubySpliter.test.ts が仕様）と、
//	上記の埋め込み命令を解釈する。命令は単位を生まず、以降の単位のスタイルを変えるだけ
export function splitCh(raw: string): T_CH[] {
	const aCh: T_CH[] = [];
	let sty = '';	// [span style=…]。次の[span]まで効く
	let rSty = '';	// [span r_style=…]
	let add: T_CMD_ARG | undefined;	// [ch]／[ruby2]のstyle・r_style。add_closeまでの間だけ効く

	let lnk: T_LNK | undefined;	// [link]〜[endlink]の区間
	const stkLnk: {sty: string; rSty: string}[] = [];	// [link]開始時の指定（[endlink]で戻す）

	// 表示単位1つを積む。スタイルは [span] → [link] → [ch] の順に重ねる（後ろが勝つ）
	const put = (c: string, r?: string, o?: T_CMD_ARG, tcy?: true)=> {
		const s = sty + (add?.style ?? '') + (o?.style ?? '');
		const rst = rSty + (add?.r_style ?? '') + (o?.r_style ?? '');
		aCh.push({c,
			...(r ? {r} : {}),
			...(s ? {s} : {}),
			...(rst ? {rs: rst} : {}),
			...(tcy ? {tcy} : {}),
			...(lnk ? {lnk} : {}),
		});
	};

	const rs = new RubySpliter;
	rs.init((c, r)=> {
		const cmd = r ? parseCmd(r) : undefined;
		if (! cmd) {put(c, r); return}

		const {o} = cmd;
		switch (cmd.cmd) {
			// 属性なしの[span]は指定の解除（本家 TxtLayer.ts:804 #mergePushSpan の
			//	「どちらも指定されてなければクリア」）
			case 'span':	sty = o.style ?? ''; rSty = o.r_style ?? '';	break;
			case 'add':		add = o;	break;
			case 'add_close':	add = undefined;	break;

			// [link]の区間。styleは区間の間だけ足す（[endlink]で元へ戻す）。
			//	本家は入れ子を許さない仕様だが、こちらはスタックで戻すので入れ子でも壊れない
			case 'link':
				stkLnk.push({sty, rSty});
				sty += o.style ?? '';
				rSty += o.r_style ?? '';
				lnk = {
					label	: o.label ?? '',
					fn		: o.fn ?? '',
					call	: o.call === 'true',
					arg		: o.arg ?? '',
					...(o.style_hover ? {sh: o.style_hover} : {}),
				};
				break;
			case 'endlink': {
				const stk = stkLnk.pop();
				if (stk) {sty = stk.sty; rSty = stk.rSty}
				lnk = undefined;
				break;
			}

			// 縦中横。**これだけは命令だが表示単位を作る**（tに書かれた文字がそのまま出る）
			case 'tcy':	put(o.t ?? '', o.r, o, true);	break;

			default:	break;	// [graph]は未実装。命令ごと落とす
		}
	});
	rs.putTxt(raw);
	return aCh;
}

// 表示単位の並び → 平文（ルビを除いた本文）。
//	ストアの str と組み込み変数 const.sn.last_page_plain_text はこちら
export function plainOf(aCh: readonly T_CH[]): string {
	return aCh.map(v=> v.c).join('');
}
export function plainTxt(raw: string): string {return plainOf(splitCh(raw))}

// ルビ文字は `位置指定｜ルビ` の形を取れる（本家 TxtStage の r_align。傍点は`center｜ヽ`）。
//	**位置指定はまだ未対応**なので、指定が付いていたら落としてルビ文字だけを返す
export function rubyTxt(r: string): string {
	const i = r.indexOf('｜');
	return i > 0 && /^[0-9a-z]+$/.test(r.slice(0, i)) ? r.slice(i + 1) : r;
}
