/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2026-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

// 文字出現・消去演出の定義（`[ch_in_style]`／`[ch_out_style]`）の純粋部分。
//	本家 TxtStage.ts:610/643（属性の読み取り）と TxtLayer.ts:148/173（CSSの組み立て）。
//
//	**本家はCSSの`@keyframes`を文字列で組み立ててスタイルシートへ挿す**。bluesnovelは
//	文字送りを既にGSAPで回している（TxtLayer.tsx）ので、同じ値をGSAPのtweenへ翻訳する。
//	2つの仕組みを併走させるとスキップ（`progress(1)`で終端へ飛ばす）が効かなくなるため。
//	`Tsy.ts`が`[tsy]`に対してやっているのと同じ立ち位置。

export type T_CH_STYLE = {
	wait	: number;	// アニメ時間（ミリ秒）。0で瞬時
	alpha	: number;	// 変化の初期値（出現）／目標値（消去）
	x		: string;	// '=0.3'なら文字の幅の30%ぶん相対。'30'なら30px絶対（本家と同じ書式）
	y		: string;
	scale_x	: number;
	scale_y	: number;
	rotate	: number;	// deg（正の値が時計回り）
	join	: boolean;	// 文字を順番に出すか（true）同時か（false）
	ease	: string;	// CSSのanimation-timing-function名
};

// 組み込みの`default`（本家 TxtLayer.ts:120/133）。
//	**出現と消去で`join`と`wait`の既定が違う**のは本家どおり
export const CH_IN_DEF: T_CH_STYLE = {
	wait: 500, alpha: 0, x: '=0.3', y: '=0',
	scale_x: 1, scale_y: 1, rotate: 0, join: true, ease: 'ease-out',
};
export const CH_OUT_DEF: T_CH_STYLE = {
	wait: 0, alpha: 0, x: '=0', y: '=0',
	scale_x: 1, scale_y: 1, rotate: 0, join: false, ease: 'ease-out',
};

// 演出名に使えない文字（本家 TxtStage.ts:601 #REG_NG_CHSTYLE_NAME_CHR）。
//	本家はCSSのクラス名・keyframes名にそのまま埋めるので制限がある。こちらはGSAPなので
//	技術的には何でも通るが、シナリオの互換のために同じ検査を残す
const REG_NG_CH_STYLE_NM = /[{\s.,*]/;

const num = (tag: string, nm: string, v: string | undefined, def: number): number=> {
	if (v === undefined) return def;
	const n = Number(v);
	if (! Number.isFinite(n)) throw `[${tag}] ${nm}【${v}】は数値ではありません`;
	return n;
};

// タグ属性 → 定義。`joinDef`は出現true／消去false（本家の既定の違い）
export function parseChStyle(tag: string, args: {[k: string]: string}, joinDef: boolean): {name: string; sty: T_CH_STYLE} {
	const name = args.name ?? '';
	if (! name) throw `[${tag}] nameは必須です`;
	if (REG_NG_CH_STYLE_NM.test(name)) throw `[${tag}] name【${name}】に使えない文字が含まれます`;

	return {name, sty: {
		wait	: num(tag, 'wait', args.wait, 500),
		alpha	: num(tag, 'alpha', args.alpha, 0),
		x		: args.x ?? '=0',
		y		: args.y ?? '=0',
		scale_x	: num(tag, 'scale_x', args.scale_x, 1),
		scale_y	: num(tag, 'scale_y', args.scale_y, 1),
		rotate	: num(tag, 'rotate', args.rotate, 0),
		join	: (args.join ?? String(joinDef)) !== 'false',
		ease	: args.ease ?? 'ease-out',
	}};
}

// 位置指定 → CSSの長さ。`'=0.3'`は**文字の大きさに対する割合**、`'0.3'`なら絶対値の0.3px。
//
//	**本家は`${nx * 100}%`（TxtLayer.ts:151）だが、こちらは`em`にする**。パーセントは
//	要素自身の箱を基準にするため、本家は`.sn_ch`へ`display: inline-block`を敷いて箱を作っている。
//	bluesnovelの文字spanはinlineのまま（inline-blockにすると行分割・ルビ・禁則の扱いが変わり、
//	行分割をブラウザに任せている前提が崩れる）ので、幅が0＝パーセントが効かない。
//	`em`ならフォントサイズ基準なので箱に依らず、**全角文字では本家と同じ値**になる
//	（全角の箱＝フォントサイズなので 30% == 0.3em）。半角文字だけずれる
export function chStylePos(v: string): string {
	const rel = v.startsWith('=');
	const n = parseFloat(rel ? v.slice(1) : v);
	if (! Number.isFinite(n)) return '0px';
	return rel ? `${n}em` : `${n}px`;
}

// CSSのanimation-timing-function → GSAPのease名。
//	**厳密には曲線が一致しない**（CSSの`ease-out`は cubic-bezier(0,0,.58,1)、
//	GSAPの`power1.out`は二次のイージング）が、文字送りの数百ミリ秒では見分けが付かない。
//	`cubic-bezier()`や`steps()`はGSAPの追加プラグインが要るので既定へ倒す
export function chStyleEase(ease: string): string {
	switch (ease.trim()) {
		case 'linear':		return 'none';
		case 'ease-in':		return 'power1.in';
		case 'ease-in-out':	return 'power1.inOut';
		case 'ease':		return 'power1.inOut';
		case 'ease-out':	return 'power1.out';
		default:			return 'power1.out';
	}
}

// 出現演出 → GSAPの`fromTo`の引数。**fromが定義の値、toが素の表示状態**
//	（本家のkeyframesも`from`に定義値・`to`に`opacity:1; transform:none`を置く）
export function chInTween(sty: T_CH_STYLE): {
	from: {opacity: number; x: string; y: string; scaleX: number; scaleY: number; rotation: number};
	to	: {opacity: number; x: number; y: number; scaleX: number; scaleY: number; rotation: number;
		duration: number; ease: string};
} {
	return {
		from: {
			opacity	: sty.alpha,
			x		: chStylePos(sty.x),
			y		: chStylePos(sty.y),
			scaleX	: sty.scale_x,
			scaleY	: sty.scale_y,
			rotation: sty.rotate,
		},
		to: {
			opacity: 1, x: 0, y: 0, scaleX: 1, scaleY: 1, rotation: 0,
			duration: sty.wait / 1000,
			ease	: chStyleEase(sty.ease),
		},
	};
}
