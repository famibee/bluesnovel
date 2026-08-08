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
	url?	: string;	// [link url=…]。指定時はラベルへ飛ばずURLを開く（[navigate_to]と同じ経路）
	sh?		: string;	// style_hover。マウスが乗っている間だけ当てるCSS
	sc?		: string;	// style_clicked。押し下げている間だけ当てるCSS（未指定ならshのまま）
	rsh?	: string;	// r_style_hover。ルビ側のホバーCSS（未指定ならrsのまま）
	rsc?	: string;	// r_style_clicked。ルビ側の押し下げCSS（未指定ならrshかrsに落ちる）
	hint?	: string;	// ツールチップ（[link hint=…]）
	hs?		: string;	// hint_style（吹き出しのCSS）
	ho?		: string;	// hint_opt（本家popperのオプションJSON。placementだけ見る）
	// 効果音（[link clickse=/enterse=/leavese=]。本家 EventMng.ts:465-491、[button]と同じ形）。
	//	bufの既定'SYS'はScriptEngine側で確定済みなのでここでは受けるだけ
	clickse?	: string;
	clicksebuf?	: string;
	enterse?	: string;
	entersebuf?	: string;
	leavese?	: string;
	leavesebuf?	: string;
};
// 表示単位1つ。ルビ付きなら c が親文字（複数文字のこともある）、r がルビ文字。
//	s / rs は[span]・[ch]・[link]で指定されたインラインCSS（本文側／ルビ側）
export type T_CH = {
	c	: string;
	r?	: string;
	ra?	: T_R_ALIGN;	// ルビ記法内の位置指定（`位置｜ルビ`。無指定なら[lay r_align=]へ落ちる）
	s?	: string;
	rs?	: string;
	tcy?: true;
	lnk?: T_LNK;
	// [graph]のインライン画像。picは論理名で、srcは解決済みURL（**埋めるのはScriptMng**。
	//	splitCh()は純粋なままにしたいので、パス解決は割った後に上から流し込む）
	pic?: string;
	src?: string;
	// [graph]の寸法・ずらし（本家 TxtStage.ts:685-688 が sp.x/y/width/height に入れる分）。
	//	省略時は本文と同じ全角空白1つぶんの枠に収める
	gw?	: number;
	gh?	: number;
	gx?	: number;
	gy?	: number;
	// 文字出現・消去演出（[span]/[ch]の ch_in_style / ch_out_style）。レイヤ単位の指定
	//	（[lay in_style=]）より優先される。定義そのものはストアの hChIn/hChOut
	cis?: string;
	cos?: string;
	// この文字ぶんの待ち時間（ミリ秒。[span]/[ch]の wait）。**次の文字までの遅れ**で、
	//	省略時は[autowc]の表→sys:sn.tagCh.msecWait の順に落ちる（決めるのはTxtLayer）
	w?	: number;
};

// 本文ストリームに埋め込まれた命令（本家 LayerMng.ts:315 #cmdTxt）。
//	`｜&emsp;《コマンド名｜URIエンコードしたJSON》`の形でルビ側に載っており、
//	RubySpliterが復号して`コマンド名｜{…}`という「ルビ」として渡してくる。
//	**ルビの位置指定（`center｜ヽ`）と形が同じ**なので、コマンド名で見分ける（本家も同じ）
const A_CMD = ['span', 'add', 'add_close', 'grp', 'tcy', 'link', 'endlink', 'del', 'gotxt'];
type T_CMD_ARG = {
	style?: string; r_style?: string; style_hover?: string;
	style_clicked?: string; r_style_hover?: string; r_style_clicked?: string;	// [link]
	t?: string; r?: string;			// [tcy]
	pic?: string; width?: string; height?: string; x?: string; y?: string;	// [graph]
	label?: string; fn?: string; call?: string; arg?: string; url?: string;	// [link]
	hint?: string; hint_style?: string; hint_opt?: string;	// ツールチップ
	clickse?: string; clicksebuf?: string; enterse?: string; entersebuf?: string;
	leavese?: string; leavesebuf?: string;	// [link]の効果音
	ch_in_style?: string; ch_out_style?: string;	// 文字出現・消去演出（ChStyle.ts）
	wait?: string;	// この文字ぶんの待ち時間（ミリ秒）
};
// 属性の数値化。**壊れた値は「指定なし」として捨てる**（本文の表示を止めないため。
//	タグ側の検査を抜けてくる値ではないので、ここは寛容でよい）
function num(v: string | undefined): number | undefined {
	if (v === undefined) return undefined;
	const n = Number(v);
	return Number.isFinite(n) ? n : undefined;
}
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
	// [span]で指定した文字出現・消去演出と待ち時間。styleと同じく次の[span]まで効く
	let cis: string | undefined;
	let cos: string | undefined;
	let wait: number | undefined;
	let add: T_CMD_ARG | undefined;	// [ch]／[ruby2]のstyle・r_style。add_closeまでの間だけ効く

	let lnk: T_LNK | undefined;	// [link]〜[endlink]の区間
	const stkLnk: {sty: string; rSty: string}[] = [];	// [link]開始時の指定（[endlink]で戻す）

	// 表示単位1つを積む。スタイルは [span] → [link] → [ch] の順に重ねる（後ろが勝つ）
	const put = (c: string, r?: string, o?: T_CMD_ARG, tcy?: true)=> {
		const s = sty + (add?.style ?? '') + (o?.style ?? '');
		const rst = rSty + (add?.r_style ?? '') + (o?.r_style ?? '');
		// **スタイルは重ねるが、演出名と待ち時間は「後の指定が勝つ」**（本家も
		//	#o2domArg() が [ch]の値 → 親[span]の値 → 既定 の順に `??` で落とす）
		const ci = o?.ch_in_style ?? add?.ch_in_style ?? cis;
		const co = o?.ch_out_style ?? add?.ch_out_style ?? cos;
		const w = num(o?.wait) ?? num(add?.wait) ?? wait;
		const {ra, ruby} = r ? splitRubyAlign(r) : {ra: undefined, ruby: undefined};
		aCh.push({c,
			...(ruby ? {r: ruby} : {}),
			...(ra ? {ra} : {}),
			...(s ? {s} : {}),
			...(rst ? {rs: rst} : {}),
			...(tcy ? {tcy} : {}),
			...(lnk ? {lnk} : {}),
			...(ci !== undefined ? {cis: ci} : {}),
			...(co !== undefined ? {cos: co} : {}),
			...(w !== undefined ? {w} : {}),
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
			case 'span':
				sty = o.style ?? ''; rSty = o.r_style ?? '';
				cis = o.ch_in_style; cos = o.ch_out_style; wait = num(o.wait);
				break;
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
					...(o.url ? {url: o.url} : {}),
					...(o.style_hover ? {sh: o.style_hover} : {}),
					// style_clicked省略時は「styleの値」＝クリック中も追加CSSなし（tag.html仕様）。
					//	r_style_hover/r_style_clickedも同様に、本文側の対応値へ落ちる
					...(o.style_clicked ? {sc: o.style_clicked} : {}),
					...((o.r_style_hover ?? o.style_hover) ? {rsh: o.r_style_hover ?? o.style_hover} : {}),
					...((o.r_style_clicked ?? o.r_style) ? {rsc: o.r_style_clicked ?? o.r_style} : {}),
					...(o.hint ? {hint: o.hint} : {}),
					...(o.hint_style ? {hs: o.hint_style} : {}),
					...(o.hint_opt ? {ho: o.hint_opt} : {}),
					...(o.clickse ? {clickse: o.clickse, clicksebuf: o.clicksebuf} : {}),
					...(o.enterse ? {enterse: o.enterse, entersebuf: o.entersebuf} : {}),
					...(o.leavese ? {leavese: o.leavese, leavesebuf: o.leavesebuf} : {}),
				};
				break;
			case 'endlink': {
				const stk = stkLnk.pop();
				if (stk) {sty = stk.sty; rSty = stk.rSty}
				lnk = undefined;
				break;
			}

			// 縦中横。命令だが表示単位を作る（tに書かれた文字がそのまま出る）
			case 'tcy':	put(o.t ?? '', o.r, o, true);	break;

			// インライン画像。これも表示単位を作る。**本文としては全角空白1つ**の扱いで
			//	（本家も`&emsp;`を置いてそこへ画像を重ねる）、平文にもその1文字が残る
			case 'grp':	if (o.pic) {
				put('　', o.r, o);
				Object.assign(aCh.at(-1)!, {pic: o.pic,
					...(num(o.width) !== undefined ? {gw: num(o.width)} : {}),
					...(num(o.height) !== undefined ? {gh: num(o.height)} : {}),
					...(num(o.x) !== undefined ? {gx: num(o.x)} : {}),
					...(num(o.y) !== undefined ? {gy: num(o.y)} : {}),
				});
			}	break;

			default:	break;	// 未対応の命令は落とす
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

// ルビ文字は `位置指定｜ルビ` の形を取れる（本家 TxtLayer.ts:587-599 の #putCh() switch。
//	傍点は`center｜ヽ`で同じ形）。位置指定はレイヤ既定[lay r_align=]を1文字だけ上書きする
export const A_R_ALIGN = ['start', 'left', 'center', 'right', 'justify', '121', 'even', '1ruby'] as const;
export type T_R_ALIGN = typeof A_R_ALIGN[number];
export function splitRubyAlign(r: string): {ra?: T_R_ALIGN; ruby: string} {
	const i = r.indexOf('｜');
	if (i > 0) {
		const a0 = r.slice(0, i);
		if ((A_R_ALIGN as readonly string[]).includes(a0)) return {ra: a0 as T_R_ALIGN, ruby: r.slice(i + 1)};
	}
	return {ruby: r};
}
