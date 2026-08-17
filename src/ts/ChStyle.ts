/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2026-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

// 文字出現・消去演出の定義（`[ch_in_style]`／`[ch_out_style]`）の純粋部分。
//	本家 TxtStage.ts:610/643（属性の読み取り）と TxtLayer.ts:148/173（CSSの組み立て）。
//
//	**本家はCSSの`@keyframes`を文字列で組み立ててスタイルシートへ挿す**。bluesnovelは
//	Web Animations API（`Element.animate()`）で同じ値をキーフレームへ翻訳する（TxtLayer.tsx）。
//	以前はGSAPを使っていたが、GSAPの既定`force3D:"auto"`がアニメ中だけ`transform: matrix3d(...)`
//	を書き込み、Chromiumのレイヤ昇格/降格をアニメのたびに引き起こしていたことが、縦書き＋Webフォント
//	環境でのグリフ描画欠落（todo.md「縦書きで禁則により送られた文字の2文字目グリフが描画されない
//	ことがある不具合」）の最有力容疑と判明。GSAPを採用する技術的必然性も無かった（本家のスキップ
//	`skynovel_esm/src/sn/TxtStage.ts:590-597 skipChIn()`はクラスの一括差し替えのみで完結しており
//	JSトゥイーンエンジンを要していない）ため、ブラウザ標準のWeb Animations APIへ置き換えた。
//	`Tsy.ts`が`[tsy]`に対してやっているのとは違い、こちらはGSAP自体を経由しない
//	（`[tsy]`/`[trans]`/`[quake]`はレイヤ単位の変形でGSAPを引き続き使う）。

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
//	本家はCSSのクラス名・keyframes名にそのまま埋めるので制限がある。こちらは名前をCSSへ
//	埋め込まない（値をJSオブジェクトとして持つだけ）ので技術的には何でも通るが、
//	シナリオの互換のために同じ検査を残す
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
//	bluesnovelの文字spanも禁則処理（Hyphenation.ts）の移植でinline-block化した（[r]由来の
//	改行spanだけ例外でinlineのまま）ので、`%`にしても箱は取れる。それでも`em`のまま据え置くのは、
//	`em`ならフォントサイズ基準なので箱の実寸に依らず**全角文字では本家と同じ値**になるため
//	（全角の箱＝フォントサイズなので 30% == 0.3em）。半角文字だけずれるが、`%`へ変えるのは
//	見た目がさらに動く別タスクとして切り離す
export function chStylePos(v: string): string {
	const rel = v.startsWith('=');
	const n = parseFloat(rel ? v.slice(1) : v);
	if (! Number.isFinite(n)) return '0px';
	return rel ? `${n}em` : `${n}px`;
}

// CSSのanimation-timing-function → Web Animations APIの`easing`（CSSの<easing-function>構文を
//	そのまま受け取れる。GSAP版と違い`cubic-bezier()`/`steps()`も素通しできる）。
//	`el.animate()`は構文的に無効な値を渡すと同期的にTypeErrorを投げる（CSSの`var()`のように
//	無効値を初期値へ黙って落とす寛容さが無い）ため、シナリオ作者が壊れた値を書いても
//	throwさせないよう、ここで妥当なCSS easing構文かを検査してから通す。
//	`CSS.supports()`は使わない——`bun test`にDOM/CSSグローバルが無く単体テストできなくなるため
//	（Hyphenation.ts:9の「DOM非参照が契約」と同じ考え方）
const REG_CSS_EASE = /^(?:linear|ease|ease-in|ease-out|ease-in-out|cubic-bezier\([^()]+\)|steps\([^()]+\))$/;
export function chStyleEase(ease: string): string {
	const v = ease.trim();
	return REG_CSS_EASE.test(v) ? v : 'ease-out';
}

// 出現演出 → Web Animations APIの`el.animate(keyframes, options)`の引数。
//	**fromキーフレームが定義の値、toが素の表示状態**（本家のkeyframesも`from`に定義値・
//	`to`に`opacity:1; transform:none`を置く）。toはCSSの初期値と完全に一致するので、
//	`options.fill: 'backwards'`と組み合わせると後始末が要らない（TxtLayer.tsx参照）：
//	delay中/実行中はfromの見た目を保ち、自然終了時・.cancel()時は効果が外れて素のDOM既定値
//	（=to）へ自動的に戻る
export function chStyleAnim(sty: T_CH_STYLE): {keyframes: Keyframe[]; options: KeyframeAnimationOptions} {
	return {
		keyframes: [
			{
				opacity: sty.alpha,
				transform: `translate(${chStylePos(sty.x)}, ${chStylePos(sty.y)}) `
					+ `scale(${String(sty.scale_x)}, ${String(sty.scale_y)}) rotate(${String(sty.rotate)}deg)`,
			},
			{opacity: 1, transform: 'none'},
		],
		// durationはWeb Animations APIの慣例どおりミリ秒（GSAP版は秒への変換が要ったが不要になった）
		options: {duration: sty.wait, easing: chStyleEase(sty.ease), fill: 'backwards'},
	};
}
