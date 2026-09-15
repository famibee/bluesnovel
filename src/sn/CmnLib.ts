/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2018-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

// import type {TArg} from './Grammar';
// import type {IHEvt2Fnc} from './CmnInterface';

// =============== Global
export function int(o: unknown): number {return parseInt(String(o), 10)}
export function uint(o: unknown): number {
	const v = parseInt(String(o), 10);
	return v < 0 ? -v : v;
}

export function getDateStr(spl_dd = '/', spl_dt = ' ', spl_tt = ':', spl_ms = ''): string {
	const now = new Date;
	return String(now.getFullYear())
		+ spl_dd+ String(100 +now.getMonth() +1).slice(1, 3)
		+ spl_dd+ String(100 +now.getDate()).slice(1, 3)
		+ spl_dt+ String(100 +now.getHours()).slice(1, 3)
		+ spl_tt+ String(100 +now.getMinutes()).slice(1, 3)
		+ (spl_ms === '' ?'' :spl_ms+ String(now.getMilliseconds()));
}


const	css_key4del	= '/* SKYNovel */';
export function initStyle() {
	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	const he = document.getElementsByTagName('head')[0]!;
	const len = he.children.length;
	for (let i=len -1; i>=0; --i) {
		const v = he.children[i];
		if (! (v instanceof HTMLStyleElement)) continue;
		if (! v.innerText.startsWith(css_key4del)) continue;
		he.removeChild(v);
	}
}
export function addStyle(style: string) {
	const gs = document.createElement('style');
	gs.innerHTML = css_key4del + style;
	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	document.getElementsByTagName('head')[0]!.appendChild(gs);
}



// // =============== EventMng
// import {Container} from 'pixi.js';
// export interface IEvtMng {
// 	button(hArg: HArg, ctnBtn: Container, normal: ()=> void, hover: ()=> boolean, clicked: ()=> void): void;
// 	unButton(em: Container): void;
// 	get	isSkipping(): boolean;
// 	popLocalEvts(): IHEvt2Fnc;
// 	pushLocalEvts(a: IHEvt2Fnc): void;
// 	waitEvent(evnm: string, hArg: HArg, onFire: ()=> void): boolean;
// 	breakEvent(evnm: string): void;
// 	hideHint(): void;
// 	cvsResize(): void;

// 	resvFlameEvent(body: HTMLBodyElement): void;
// }



type T_HASH_Arg = {
	':タグ名'?	: string;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	[name: string]: any;
};

export	function argChk_Num(hash: T_HASH_Arg, name: string, def: number): number {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
	const v = hash[name];
	if (! (name in hash)) {
		if (isNaN(def)) throw `[${hash[':タグ名'] ?? ''}]属性 ${name} は必須です`;

		hash[name] = def;
		return def;
	}

	const n = String(v).startsWith('0x')
		// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
		? parseInt(v)
		// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
		: parseFloat(v);
	if (isNaN(n)) throw `[${hash[':タグ名'] ?? ''}]属性 ${name} の値【${String(v)}】が数値ではありません`;

	hash[name] = n;
	return n;
}

// 「文字列 1 個 → 数値」の非破壊版（上の argChk_Num は hash を破壊的に更新し必須チェックも
//	持つ本家シグネチャ＝web.ts が公開 API として再 export。こちらは分家内の属性パース専用）。
//	0x 始まりは 16 進、他は 10 進。空文字・NaN・Infinity は例外（空文字を弾くのは Number('')→0 で
//	書き忘れを見逃さないため）。エラー文の主語（`[tag] 属性名`）は呼び出し側が errHead で渡す
export function parseArgNum(v: string, errHead: string): number {
	const n = v.trim() === '' ? NaN
		: v.startsWith('0x') ? parseInt(v.slice(2), 16) : Number(v);
	if (! Number.isFinite(n)) throw `${errHead}の値が不正です：${v}`;
	return n;
}

// CSS Named Colors（CSS Color Module Level 4。transparent/currentColor除く147色）。
//	本家 CmnLib.ts:131 parseColor()はCanvasのfillStyleへ代入し解決後の値を読み戻すトリックで
//	任意のCSS色表現（色名含む）を数値化するが、ScriptEngineはDOM非依存（単体テストがNode環境で
//	documentを持たない）なので使えない。[lay b_color=]は色名でも書けた本家との互換のため、
//	静的テーブルで色名だけ解決できるようにする（rgb()/hsl()等の関数記法までは対象外）
const H_CSS_COLOR_NAME: {readonly [name: string]: number} = {
	black: 0x000000, silver: 0xC0C0C0, gray: 0x808080, white: 0xFFFFFF,
	maroon: 0x800000, red: 0xFF0000, purple: 0x800080, fuchsia: 0xFF00FF,
	green: 0x008000, lime: 0x00FF00, olive: 0x808000, yellow: 0xFFFF00,
	navy: 0x000080, blue: 0x0000FF, teal: 0x008080, aqua: 0x00FFFF,
	aliceblue: 0xF0F8FF, antiquewhite: 0xFAEBD7, aquamarine: 0x7FFFD4, azure: 0xF0FFFF,
	beige: 0xF5F5DC, bisque: 0xFFE4C4, blanchedalmond: 0xFFEBCD, blueviolet: 0x8A2BE2,
	brown: 0xA52A2A, burlywood: 0xDEB887, cadetblue: 0x5F9EA0, chartreuse: 0x7FFF00,
	chocolate: 0xD2691E, coral: 0xFF7F50, cornflowerblue: 0x6495ED, cornsilk: 0xFFF8DC,
	crimson: 0xDC143C, cyan: 0x00FFFF, darkblue: 0x00008B, darkcyan: 0x008B8B,
	darkgoldenrod: 0xB8860B, darkgray: 0xA9A9A9, darkgreen: 0x006400, darkgrey: 0xA9A9A9,
	darkkhaki: 0xBDB76B, darkmagenta: 0x8B008B, darkolivegreen: 0x556B2F, darkorange: 0xFF8C00,
	darkorchid: 0x9932CC, darkred: 0x8B0000, darksalmon: 0xE9967A, darkseagreen: 0x8FBC8F,
	darkslateblue: 0x483D8B, darkslategray: 0x2F4F4F, darkslategrey: 0x2F4F4F, darkturquoise: 0x00CED1,
	darkviolet: 0x9400D3, deeppink: 0xFF1493, deepskyblue: 0x00BFFF, dimgray: 0x696969,
	dimgrey: 0x696969, dodgerblue: 0x1E90FF, firebrick: 0xB22222, floralwhite: 0xFFFAF0,
	forestgreen: 0x228B22, gainsboro: 0xDCDCDC, ghostwhite: 0xF8F8FF, gold: 0xFFD700,
	goldenrod: 0xDAA520, greenyellow: 0xADFF2F, grey: 0x808080, honeydew: 0xF0FFF0,
	hotpink: 0xFF69B4, indianred: 0xCD5C5C, indigo: 0x4B0082, ivory: 0xFFFFF0,
	khaki: 0xF0E68C, lavender: 0xE6E6FA, lavenderblush: 0xFFF0F5, lawngreen: 0x7CFC00,
	lemonchiffon: 0xFFFACD, lightblue: 0xADD8E6, lightcoral: 0xF08080, lightcyan: 0xE0FFFF,
	lightgoldenrodyellow: 0xFAFAD2, lightgray: 0xD3D3D3, lightgreen: 0x90EE90, lightgrey: 0xD3D3D3,
	lightpink: 0xFFB6C1, lightsalmon: 0xFFA07A, lightseagreen: 0x20B2AA, lightskyblue: 0x87CEFA,
	lightslategray: 0x778899, lightslategrey: 0x778899, lightsteelblue: 0xB0C4DE, lightyellow: 0xFFFFE0,
	limegreen: 0x32CD32, linen: 0xFAF0E6, magenta: 0xFF00FF, mediumaquamarine: 0x66CDAA,
	mediumblue: 0x0000CD, mediumorchid: 0xBA55D3, mediumpurple: 0x9370DB, mediumseagreen: 0x3CB371,
	mediumslateblue: 0x7B68EE, mediumspringgreen: 0x00FA9A, mediumturquoise: 0x48D1CC, mediumvioletred: 0xC71585,
	midnightblue: 0x191970, mintcream: 0xF5FFFA, mistyrose: 0xFFE4E1, moccasin: 0xFFE4B5,
	navajowhite: 0xFFDEAD, oldlace: 0xFDF5E6, olivedrab: 0x6B8E23, orange: 0xFFA500,
	orangered: 0xFF4500, orchid: 0xDA70D6, palegoldenrod: 0xEEE8AA, palegreen: 0x98FB98,
	paleturquoise: 0xAFEEEE, palevioletred: 0xDB7093, papayawhip: 0xFFEFD5, peachpuff: 0xFFDAB9,
	peru: 0xCD853F, pink: 0xFFC0CB, plum: 0xDDA0DD, powderblue: 0xB0E0E6,
	rebeccapurple: 0x663399, rosybrown: 0xBC8F8F, royalblue: 0x4169E1, saddlebrown: 0x8B4513,
	salmon: 0xFA8072, sandybrown: 0xF4A460, seagreen: 0x2E8B57, seashell: 0xFFF5EE,
	sienna: 0xA0522D, skyblue: 0x87CEEB, slateblue: 0x6A5ACD, slategray: 0x708090,
	slategrey: 0x708090, snow: 0xFFFAFA, springgreen: 0x00FF7F, steelblue: 0x4682B4,
	tan: 0xD2B48C, thistle: 0xD8BFD8, tomato: 0xFF6347, turquoise: 0x40E0D0,
	violet: 0xEE82EE, wheat: 0xF5DEB3, whitesmoke: 0xF5F5F5, yellowgreen: 0x9ACD32,
};
// 色属性の非破壊パース版（parseArgNumの色専用バリエーション）。0x/#始まりの16進、10進数値に
//	加えCSS色名（大文字小文字区別なし）を受け付ける。[lay b_color=]等、storeでは0xRRGGBBの
//	数値として持つ属性向け（cssColorOfとは逆に、こちらは常に数値へ寄せる）
export function parseArgColor(v: string, errHead: string): number {
	const s = v.trim();
	if (s === '') throw `${errHead}の値が不正です：${v}`;
	if (s.startsWith('#')) {
		const n = parseInt(s.slice(1), 16);
		if (Number.isFinite(n)) return n;
	}
	else {
		const n = s.startsWith('0x') ? parseInt(s.slice(2), 16) : Number(s);
		if (Number.isFinite(n)) return n;
		const c = H_CSS_COLOR_NAME[s.toLowerCase()];
		if (c !== undefined) return c;
	}
	throw `${errHead}の値が不正です：${v}`;
}

/*
	それぞれの型を Boolean 型に変換した場合の値は以下のようになります。

	Undefiend 	false
	Null 		false
	Boolean 	変換前のオブジェクトと同じ
	Number 		0 または NaN は false それ以外の値は true
	String 		空文字列は false  それ以外の値は true
	Object 		true
*/
export	function argChk_Boolean(hash: T_HASH_Arg, name: string, def: boolean): boolean {
	//	t-r-a-c-e(Boolean(null),Boolean(""),Boolean(undefined),Boolean("0"),Boolean("1"),Boolean("true"),Boolean("false"),Boolean("あい"));
	//	[exec] false false false true true true true true
	/*console.log('%o %o %o %o %o %o %o %o',
		Boolean(null), Boolean(""), Boolean(undefined), Boolean("0"), Boolean("1"),
		Boolean("true"), Boolean("false"), Boolean("あい"));
	*/

	//if (! hArg[name]) return hArg[name] = def;
	if (! (name in hash)) {hash[name] = def; return def;}

	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
	const v = hash[name];
	if (v === null) return false;

	const v2 = String(v);
	const ret = hash[name] = v2 === 'false'? false : Boolean(v2);
	return ret;
}


// [prj.json init.bg_color]をCSSにそのまま渡せる文字列へ。本家 CmnLib.ts:131 parseColor()は
//	pixiが要る数値(0xRRGGBB)へ変換するが、bluesnovelはCSSがそのまま色名・#RRGGBBを解釈できるので
//	**数値のときだけ**#RRGGBBへ変換すればよい（文字列は素通し）
export function cssColorOf(v: string | number): string {
	if (typeof v !== 'number') return v;
	return `#${v.toString(16).padStart(6, '0')}`;
}
// export function parseColor(v: string): number {
// 	if (v.startsWith('#')) return parseInt(v.slice(1), 16);
// 	const n = Number(v);
// 	if (! isNaN(n)) return n;	// 0, 0xffffff

// 	if (v === 'black') return 0;
// 	CmnLib.cc4ColorName.fillStyle = v;
// 	const cc = CmnLib.cc4ColorName.fillStyle;
// 	if (cc === '#000000') throw `色名前 ${v} が異常です`;

// 	return parseInt(cc.slice(1), 16);
// }
// export	function argChk_Color(hash: T_HASH_Arg, name: string, def: number): number {
// 	const v = hash[name];
// 	if (! v) return hash[name] = def;

// 	return hash[name] = parseColor(String(v));
// }


// const REG_ERRMES_JSON = /JSON at position (\d+)$/;
// 	// Unexpected number in JSON at position 
// export	function mesErrJSON(hArg: HArg, nm = '', mes = ''): string {
// 	const col = (mes.match(REG_ERRMES_JSON) ?? ['',''])[1];
// 	return `[${hArg[':タグ名']}] ${nm} 属性の解析エラー : ${mes}
// ${(hArg as any)[nm]}${col ?`
// ${'^'.padStart(Number(col))}` :''}`;
// }


const REG_FN	= /^[^/.]+$|[^/]+(?=\.)/;
	// https://regex101.com/r/8sltIm/1
export	function getFn(p: string) {return (REG_FN.exec(p) ?? [''])[0]}
const REG_EXT	= /\.([^\.]+)$/;
	// https://regex101.com/r/IULqII/3
export 	function getExt(p: string) {return (p.match(REG_EXT) ?? ['',''])[1]}

export type T_DIP = {[name: string]: string};

//import {isMobile} from 'pixi.js';		// 使い物にならないことを確認済み
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class CmnLib {
	// 実行環境の判別。**本家はplatform.jsを読むが、bluesnovelは入れない**
	//	（bestiejs/platform.js は Public archive ＝更新が止まっているため）。
	//	欲しいのは下の4つのフラグだけで、それはUA文字列から出せる。
	//	組み込み変数 const.sn.platform も本家のJSONではなくUA文字列そのものにする
	//	（下位を引く用途＝`const.sn.platform.os.family`のような使い方は今のところ無い）
	static	init() {
		const ua = globalThis.navigator.userAgent;
		this.platform	= ua;
		this.plat_desc	= ua;
		// Chrome系もUAに"Safari"を含むので、他ブラウザの名前が無いことまで見る
		this.isSafari	= /safari/i.test(ua) && ! /chrome|chromium|crios|edg|android|fxios/i.test(ua);
		this.isFirefox	= /firefox|fxios/i.test(ua);
		// 本家は os.family が'OS X'を含むか。iOSは別family（'iOS'）なのでMac扱いにしない
		this.isMac		= /macintosh|mac os x/i.test(ua) && ! /iphone|ipad|ipod/i.test(ua);
		// 本家は「WindowsでもOS Xでもない」＝携帯機扱い。同じ結果になる書き方にする
		this.isMobile	= ! /windows|macintosh|mac os x/i.test(ua) || /iphone|ipad|ipod|android/i.test(ua);
	}

	static	stageW		= 0;
	static	stageH		= 0;
	// ステージの既定背景色（[prj.json init.bg_color]、本家 LayerMng.ts:172-178 が#fore/#back両方に
	//	敷くステージ大の塗りと同じ役目）。CSSにそのまま渡せる形（cssColorOf()参照）で持つ
	static	bgColor		= '#000000';
	static	debugLog	= false;
	// テキストレイヤ：ガイドマス目を表示するか（本家 TxtStage.ts #fncMasume/Button.ts
	//	#procMasume4txt 相当）。offの間はTxtLayer/BtnLayerが判定を早期returnし、
	//	マス目用のDOM要素も文字ごとのoutline/background-colorも一切増やさない
	static	masume		= false;
	static	platform	: string;
	static	plat_desc	: string;
	static	isSafari	: boolean;
	static	isFirefox	: boolean;
	static	isMac		: boolean;
	static	isMobile	: boolean;
	static	hDip		: T_DIP	= {};
	static	isDbg		= false;
	static	isPackaged	= false;

	static	isDarkMode	= false;

	static	cc4ColorName: CanvasRenderingContext2D;

}
