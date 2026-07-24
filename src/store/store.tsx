/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2024-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import {A_LAY_STY_KEY, type T_LAY, type T_LAY_STY} from '../components/Lay';
import type {T_FLT} from '../ts/Filter';
import type {T_FACE} from '../components/GrpLayer';
import type {T_BTN_STY} from '../components/TxtLayer';

import {create} from 'zustand';

type T_STATE = {
	txt		: string;
	addTxt	: (t: string)=> void;
	clearTxt: ()=> void;

	// ページ裏表（本家 Pages.ts）。レイヤ配列を2枚持ち、どちらが表かはforeIdxで示す。
	//	**配列の中身は入れ替えず、foreIdxだけを切り替える**のが要点。中身を入れ替えると
	//	Reactから見て2つのコンテナの子が丸ごと差し替わり、TxtLayerが文字送り演出をやり直して
	//	トランジション完了と同時に画面がちらつくため（レイヤ側のDOMキャッシュも作り直しになる）
	aPage	: [T_LAY[], T_LAY[]];
	foreIdx	: 0 | 1;
	replace	: (arg: string)=> void;
	addLayer: (arg: T_LAY)=> void,
	chgPic	: (arg: T_CHGPIC)=> void,
	chgBAlpha	: (arg: T_CHGBALPHA)=> void,
	chgLay	: (arg: T_CHGLAY)=> void,
	getLaySty: (nm: string, page: T_PAGE)=> T_LAY_STY,
	getPages: ()=> {fore: T_LAY[]; back: T_LAY[]},	// [dump_lay]用。表裏まとめて覗く
	enableEvent: (arg: T_ENABLEEVENT)=> void,
	clearLay: (arg: T_CLEARLAY)=> void,
	moveLay	: (arg: T_MOVELAY)=> void,
	chgFilter: (arg: T_CHGFILTER)=> void,
	chgStr	: (arg: T_CHGSTR)=> void,
	addBtn	: (arg: T_ADDBTN)=> void,

	// [trans]の進行状態。startTrans()で開始し、finishTrans()で表裏を入れ替えて終了する。
	//	**終了を宣言するのは必ずScriptMng**（時間切れ／[wt]中のクリック）で、
	//	Stage側のGSAPは見た目を動かすだけ。完了コールバックに交換をやらせると、
	//	シナリオの再開（ScriptMng）との前後が保証されず、交換前のページへ次の文が書かれてしまう
	trans		: T_TRANS;
	startTrans	: (arg: T_STARTTRANS)=> void,
	finishTrans	: ()=> void,

	title	: string;
	addTitle	: (t: string)=> void;

	// [toggle_full_screen]。**ここは「こうしたい」という要求で、実際の状態ではない**。
	//	Stage.tsxがreact-useのuseFullscreenへ渡し、Escでの解除などブラウザ都合の変化は
	//	setFullScr()で書き戻される（本家もSysWebがfullscreenchangeを拾ってisFullScrを直す）
	fullScr		: boolean;
	setFullScr	: (b: boolean)=> void;
	toggleFullScr	: ()=> void;

	isReadBack	: boolean;		// 読み戻り中か（PageUp等でCaretaker.isLast()===falseの間）
	setReadBack	: (b: boolean)=> void;

	isTyping	: boolean;		// 文字送り演出（GSAP）実行中か。trueの間はクリックで進行せずスキップ要求のみ行う
	setIsTyping	: (b: boolean)=> void;
	skipReq		: number;		// TxtLayer側へ「今のアニメを瞬時完了させろ」と伝える合図（インクリメントで通知）
	requestSkip	: ()=> void;
	skipping	: boolean;		// 既読スキップ実行中か。trueの間はTxtLayerが文字送り演出を省いて瞬時表示する
	setSkipping	: (b: boolean)=> void;

	wait		: T_WAIT;		// 現在[l]/[p]待ち中のレイヤと種別（[s]はマーカーなし=null）
	setWait		: (w: T_WAIT)=> void;
}
export type T_WAIT = {nm: string; kind: 'l' | 'p'} | null;
export type T_PAGE = 'fore' | 'back';
export type T_PAGE_BOTH = T_PAGE | 'both';
// 進行中の[trans]。seqは「新しい[trans]が来た」ことをStage側のuseEffectへ伝えるための通し番号
//	（timeが同じ値だと参照が変わってもeffectを撃ち直せないため）
export type T_TRANS = {seq: number; time: number} | null;
export type T_STARTTRANS = {
	aLayNm	: string[] | null;	// 交換するレイヤ名。nullは全レイヤ
	time	: number;			// ミリ秒。0なら演出せず即交換
}
export type T_CHGPIC = {
	nm	: string;
	page: T_PAGE;
	fn	: string;
	aFace	: T_FACE[];	// [lay face=...]で重ねる差分絵（重なり順＝配列順）
}
// [lay b_alpha=...]：文字レイヤ背景の不透明度。値域は0.0（透明）～1.0（不透過）。背景のみを透過させ、文字は透過しない（レイヤ全体の透過度ではない）
export type T_CHGBALPHA = {
	nm		: string;
	page	: T_PAGE;
	b_alpha	: number;
}
// [lay]で指定できるレイヤの見た目。書かれた属性だけを持つ（未指定の属性は現状維持）
export type T_LAY_STY_ARG = Partial<T_LAY_STY> & {
	b_color?: number;	// 文字レイヤ背景色（0xRRGGBB）
	style?	: string;	// 文字レイヤへそのまま足すCSS
};
export type T_CHGLAY = {
	nm	: string;
	page: T_PAGE;
	sty	: T_LAY_STY_ARG;
}
// [enable_event]：文字レイヤのボタン等を有効／無効にする。無効の間はクリックを受けない
export type T_ENABLEEVENT = {
	nm		: string;
	enabled	: boolean;
}
// [clear_lay]：レイヤの見た目を初期値へ戻し、中身（画像／文字＋ボタン）も捨てる。
//	aLayNm=nullは全レイヤ（layer属性の省略）
export type T_CLEARLAY = {
	aLayNm	: string[] | null;
	page	: T_PAGE_BOTH;
}
// [add_filter]/[clear_filter]/[enable_filter]と[lay filter=…]。
//	3タグを1つのアクションにまとめてあるのは、対象レイヤの選び方（aLayNm=nullは全レイヤ）と
//	ページの扱い（both可）が全く同じで、違うのは配列をどういじるかだけのため
export type T_CHGFILTER = {
	aLayNm	: string[] | null;
	page	: T_PAGE_BOTH;
	mode	: 'add' | 'replace' | 'clear' | 'enable';
	flt?	: T_FLT;		// add/replace用
	index?	: number;		// enable用
	enabled?: boolean;		// enable用
}
// [lay float=/index=/dive=]：レイヤの重なり順。**表裏とも同じ順に動かす**ので、page指定は無い
//	（本家 LayerMng.ts:489 も#fore/#backの両方をsetChildIndexする）
export type T_MOVELAY = {
	nm		: string;
	mode	: 'float' | 'index' | 'dive';
	index?	: number;
	dive?	: string;
}
export type T_CHGSTR = {
	nm	: string;
	page: T_PAGE_BOTH;	// [er]（ページ両面の文字消去）だけが'both'を使う
	str	: string;
}
// [button]タグで文字レイヤ（UIコンテナ）にボタンを乗せる（独立レイヤにはしない）
export type T_ADDBTN = {
	layerNm	: string;	// 乗せ先の文字レイヤnm
	page	: T_PAGE;
	nm		: string;	// ボタン自身の識別名（同一layer内で一意）
	text	: string;
	label	: string;
	call?	: boolean;	// [button call=true]指定時：クリックでjumpではなくcall（サブルーチンコール）する
	fn?		: string;	// [button fn=...]指定時：別スクリプトのラベルへ飛ぶ（label省略時はそのファイルの先頭）
	sty?	: T_BTN_STY;	// 配置・寸法・変形（書かれた属性だけ）
}

export type T_INIT_FNCS = Readonly<Pick<T_STATE, 'addLayer'|'chgPic'|'chgBAlpha'|'chgStr'|'chgLay'|'getLaySty'|'getPages'|'clearLay'|'moveLay'|'chgFilter'|'enableEvent'|'addBtn'|'addTitle'|'toggleFullScr'|'setWait'|'requestSkip'|'setSkipping'|'startTrans'|'finishTrans'>>;


// 指定ページのレイヤ配列を差し替えるための下ごしらえ。
//	aPageは[0]と[1]で同じ順・同じレイヤ名が並んでいる前提（addLayerが必ず両面へ足すため）
function pickPage(s: T_STATE, page: T_PAGE): {idx: 0 | 1; aLay: T_LAY[]} {
	const idx = page === 'fore' ? s.foreIdx : (1 - s.foreIdx) as 0 | 1;
	return {idx, aLay: [...s.aPage[idx]]};
}
function putPage(s: T_STATE, idx: 0 | 1, aLay: T_LAY[]): {aPage: [T_LAY[], T_LAY[]]} {
	const aPage: [T_LAY[], T_LAY[]] = [s.aPage[0], s.aPage[1]];
	aPage[idx] = aLay;
	return {aPage};
}
// レイヤ1件を探す（見つからない・種別違いは例外）
function findLay<C extends 'grp' | 'txt'>(aLay: T_LAY[], nm: string, cls: C) {
	const e = aLay.find(e=> e.nm === nm);
	if (! e) throw `存在しないレイヤ ${nm} です`;
	if (e.cls !== cls) throw `${nm} は${cls === 'grp' ? '画像' : '文字'}レイヤではありません`;
	return e as Extract<T_LAY, {cls: C}>;
}


export const useStore = create<T_STATE>()((set, get)=> ({	// わざとカーリー化
	txt		: '',
	addTxt	: t=> set(s=> ({txt: s.txt + t})),
	clearTxt: ()=> set(()=> ({txt: ''})),

	aPage	: [[], []],
	foreIdx	: 0,
	replace	: (arg: string)=> set(()=> JSON.parse(arg) as {aPage: [T_LAY[], T_LAY[]]; foreIdx: 0 | 1}),
	addLayer: (arg: T_LAY)=> set(s=> {
		// レイヤ名（nm）はcls（grp/txt）をまたいで全体で一意である前提
		//	（chgPic/chgStrがcls不問でnmだけを検索キーにしているため）。
		//	重複したまま追加するとStage.tsxのkey={l.nm}が衝突し、Reactの
		//	「Encountered two children with the same key」警告や表示不具合の原因になる。
		if (s.aPage[0].some(e=> e.nm === arg.nm)) throw `レイヤ名 ${arg.nm} は既に使用されています（既存の${s.aPage[0].find(e=> e.nm === arg.nm)!.cls}レイヤと重複）`;

		// レイヤは必ず表裏の両面に作る（本家 Pages も1レイヤにつきfore/backの2枚を持つ）。
		//	両面で同じ順に並ぶので、以降はnm検索でも添字でも対応が取れる
		return {aPage: [
			[...s.aPage[0], structuredClone(arg)],
			[...s.aPage[1], structuredClone(arg)],
		] as [T_LAY[], T_LAY[]]};
	}),
	// [button]タグ：指定した文字レイヤ（UIコンテナ）のaBtnにボタンを1件追加する。
	//	独立レイヤ（cls:'btn'）としてはscopedしないことで、文字レイヤごと表示/非表示を一括で切り替えられる
	addBtn	: ({layerNm, page, nm, text, label, call, fn, sty}: T_ADDBTN)=> set(s=> {
		const {idx, aLay} = pickPage(s, page);
		const e = findLay(aLay, layerNm, 'txt');
		if (e.aBtn.some(b=> b.nm === nm)) throw `ボタン名 ${nm} はレイヤ ${layerNm} 内で既に使用されています`;

		e.aBtn = [...e.aBtn, {nm, text, label, ...(call !== undefined ? {call} : {}), ...(fn !== undefined ? {fn} : {}), ...(sty !== undefined ? {sty} : {})}];
		return putPage(s, idx, aLay);
	}),
	chgPic	: ({nm, page, fn, aFace}: T_CHGPIC)=> set(s=> {
		const {idx, aLay} = pickPage(s, page);
		const e = findLay(aLay, nm, 'grp');

		e.fn = fn;
		e.aFace = aFace;	// [lay face=...]の差分合成情報も同時に更新（未指定時は空配列）
		return putPage(s, idx, aLay);
	}),
	chgBAlpha	: ({nm, page, b_alpha}: T_CHGBALPHA)=> set(s=> {
		const {idx, aLay} = pickPage(s, page);
		const e = findLay(aLay, nm, 'txt');

		e.b_alpha = b_alpha;	// レイヤ全体ではなく文字レイヤ背景の不透明度のみ（TxtLayer.tsxでbackground-colorのrgbaのアルファとして反映）
		return putPage(s, idx, aLay);
	}),
	// [lay]のレイヤ共通属性。書かれた属性だけを上書きする（本家 Layer.lay() も `'x' in hArg` で判定）
	chgLay	: ({nm, page, sty}: T_CHGLAY)=> set(s=> {
		const {idx, aLay} = pickPage(s, page);
		const e = aLay.find(e=> e.nm === nm);
		if (! e) throw `存在しないレイヤ ${nm} です`;
		// b_color/styleは文字レイヤ専用。画像レイヤへ来たら黙って無視せず知らせる
		if (e.cls !== 'txt' && (sty.b_color !== undefined || sty.style !== undefined))
			throw `${nm} は文字レイヤではありません（b_color/styleは文字レイヤ専用）`;

		Object.assign(e, sty);
		return putPage(s, idx, aLay);
	}),
	// [tsy]（トゥイーン）の開始値を読むための唯一の読み出し口。setterではないのでgetを使う。
	//	「現在値からの相対」（[tsy left='=100']）と、GSAPへ渡す開始値のために要る。
	//	未指定の属性は値を持たない（＝各レイヤのCSS既定）ので、ここではundefinedのまま返し、
	//	既定値の穴埋めは呼ぶ側（ScriptMngのH_TSY_DEF）に任せる
	getLaySty: (nm: string, page: T_PAGE)=> {
		const s = get();
		const aLay = s.aPage[page === 'fore' ? s.foreIdx : (1 - s.foreIdx) as 0 | 1];
		const e = aLay.find(e=> e.nm === nm);
		if (! e) throw `存在しないレイヤ ${nm} です`;

		const sty: T_LAY_STY = {};
		for (const k of A_LAY_STY_KEY) if (e[k] !== undefined) Object.assign(sty, {[k]: e[k]});
		return sty;
	},
	getPages: ()=> {
		const s = get();
		return {fore: s.aPage[s.foreIdx], back: s.aPage[(1 - s.foreIdx) as 0 | 1]};
	},
	// [enable_event]：表裏どちらのページにも同じ値を入れる。
	//	本家はレイヤ（Pagesの片面ではなくレイヤ自体）が持つ状態なので、[trans]で入れ替わっても揺れないようにする
	enableEvent: ({nm, enabled}: T_ENABLEEVENT)=> set(s=> ({aPage: s.aPage.map(a=> {
		const aLay = [...a];
		findLay(aLay, nm, 'txt').enabled = enabled;
		return aLay;
	}) as [T_LAY[], T_LAY[]]})),
	// [clear_lay]：見た目を初期値へ戻し、中身も捨てる（本家 Layer.clearLay()＋各レイヤのoverride）。
	//	**visibleだけは触らない**（本家のコメント「visibleは触らない」そのまま）
	clearLay: ({aLayNm, page}: T_CLEARLAY)=> set(s=> {
		const clr1 = (e: T_LAY)=> {
			// 見た目は「未指定」へ戻す（＝各レイヤのCSS既定に従う）。
			//	**visibleだけは触らない**（本家 Layer.clearLay() のコメントそのまま）
			for (const k of A_LAY_STY_KEY) if (k !== 'visible') delete e[k];
			if (e.cls === 'grp') {e.fn = ''; e.aFace = []}
			else {e.str = ''; e.aBtn = []; delete e.b_color; delete e.style; e.b_alpha = 1}
		};
		// aLayNm=nullはlayer属性の省略＝全レイヤ（本家 LayerMng.#getLayers()）
		const clr = (aLay: T_LAY[])=> {
			if (! aLayNm) {aLay.forEach(clr1); return}

			for (const nm of aLayNm) {
				const e = aLay.find(e=> e.nm === nm);
				if (! e) throw `存在しないレイヤ ${nm} です`;
				clr1(e);
			}
		};
		if (page === 'both') return {aPage: s.aPage.map(a=> {
			const aLay = [...a]; clr(aLay); return aLay;
		}) as [T_LAY[], T_LAY[]]};

		const {idx, aLay} = pickPage(s, page);
		clr(aLay);
		return putPage(s, idx, aLay);
	}),
	// [lay float=/index=/dive=]：レイヤの重なり順。配列の並びがそのまま描画順（後ろほど手前）。
	//	**表裏を必ず同じ並びに保つ**：addLayerが両面へ同順で足す前提を、他の処理
	//	（pickPage/putPage・[trans]のレイヤ複製）が当てにしているため、片面だけ動かせない
	moveLay	: ({nm, mode, index, dive}: T_MOVELAY)=> set(s=> {
		const a0 = s.aPage[0];
		const from = a0.findIndex(e=> e.nm === nm);
		if (from < 0) throw `存在しないレイヤ ${nm} です`;

		let to: number;
		switch (mode) {
		case 'float':	// 最前面へ（本家は setChildIndex(children.length -1)）
			to = a0.length - 1;
			break;
		case 'index':
			to = Math.min(Math.max(0, index ?? 0), a0.length - 1);
			break;
		case 'dive': {	// 指定レイヤのすぐ下へ潜り込む
			if (nm === dive) throw `[lay] 属性 layerとdiveが同じ【${String(dive)}】です`;
			const d = a0.findIndex(e=> e.nm === dive);
			if (d < 0) throw `[lay] 属性 dive【${String(dive)}】が不正です。レイヤーがありません`;
			to = d > from ? d - 1 : d;	// 自分が抜けた分だけ下がる（本家 --idx_dive と同じ）
			break;
		}
		}
		if (to === from) return {};

		return {aPage: s.aPage.map(a=> {
			const b = [...a];
			b.splice(to, 0, ...b.splice(from, 1));
			return b;
		}) as [T_LAY[], T_LAY[]]};
	}),
	// フィルター（本家 LayerMng.ts:836 #add_filter() 他）。対象レイヤの選び方とページの扱いは
	//	[clear_lay]と同じ（aLayNm=nullは全レイヤ、page=bothで両面）
	chgFilter: ({aLayNm, page, mode, flt, index, enabled}: T_CHGFILTER)=> set(s=> {
		const chg1 = (e: T_LAY)=> {
			switch (mode) {
			case 'add':		e.aFlt = [...e.aFlt ?? [], flt!];	break;
			case 'replace':	e.aFlt = [flt!];	break;	// [lay filter=…]は置き換え
			case 'clear':	delete e.aFlt;		break;
			case 'enable': {
				const a = [...e.aFlt ?? []];
				const i = index ?? 0;
				// 本家 #enable_filter2() と同じ検査（フィルターが無い／個数を越えている）
				if (a.length === 0) throw `${e.nm} にフィルターがありません`;
				if (a.length <= i) throw `${e.nm} のフィルターの個数（${String(a.length)}）を越えています`;
				a[i] = {...a[i]!, enabled: enabled ?? true};
				e.aFlt = a;
				break;
			}
			}
		};
		const chg = (aLay: T_LAY[])=> {
			if (! aLayNm) {aLay.forEach(chg1); return}

			for (const nm of aLayNm) {
				const e = aLay.find(e=> e.nm === nm);
				if (! e) throw `存在しないレイヤ ${nm} です`;
				chg1(e);
			}
		};
		if (page === 'both') return {aPage: s.aPage.map(a=> {
			const aLay = [...a]; chg(aLay); return aLay;
		}) as [T_LAY[], T_LAY[]]};

		const {idx, aLay} = pickPage(s, page);
		chg(aLay);
		return putPage(s, idx, aLay);
	}),
	chgStr	: ({nm, page, str}: T_CHGSTR)=> set(s=> {
		// [er]だけが'both'＝両面の文字を消す。片面だけだと[trans]で裏が表に出たときに
		//	前の場面の文字が蘇ってしまう（本家 hTag.er「ページ両面の文字消去」）
		if (page === 'both') return {aPage: s.aPage.map(a=> {
			const aLay = [...a];
			findLay(aLay, nm, 'txt').str = str;
			return aLay;
		}) as [T_LAY[], T_LAY[]]};

		const {idx, aLay} = pickPage(s, page);
		findLay(aLay, nm, 'txt').str = str;
		return putPage(s, idx, aLay);
	}),

	trans		: null,
	// [trans]開始。演出の主役は「表ページを次第に透明にし、下から裏ページを出す」こと（Stage.tsx）。
	//	ここでやるのは下ごしらえだけ：交換対象外のレイヤは、裏へ表の内容を写しておく。
	//	こうしておけば裏ページ＝トランジション後のあるべき画面そのものになり、
	//	最後にforeIdxを反転するだけで完了できる（本家 #trans() の「transしないために交換する」相当）
	startTrans	: ({aLayNm, time}: T_STARTTRANS)=> set(s=> {
		const bi = (1 - s.foreIdx) as 0 | 1;
		const fore = s.aPage[s.foreIdx];
		const back = s.aPage[bi].map(e=> aLayNm && ! aLayNm.includes(e.nm)
			? structuredClone(fore.find(f=> f.nm === e.nm) ?? e)
			: e
		);
		const st = putPage(s, bi, back);

		// time=0（または既読スキップ中）は演出せず即交換。transはnullのままなのでStageは何もしない
		if (time <= 0) return {...st, foreIdx: bi};

		return {...st, trans: {seq: (s.trans?.seq ?? 0) + 1, time}};
	}),
	// 演出終了。表裏を入れ替える（配列の中身ではなく、どちらを表とみなすかを反転するだけ）。
	//	zustandのsetは同期なので、これを呼んだ時点で以降の書き込み先は新しい表ページになる。
	//	演出が途中でも呼んでよい（Stage側が見た目を終了状態へ確定させる）
	finishTrans	: ()=> set(s=> s.trans
		? {foreIdx: (1 - s.foreIdx) as 0 | 1, trans: null}
		: {}	// 演出していない（time=0で交換済み等）なら何もしない
	),

	title		: '',
	addTitle	: title=> set(()=> ({title})),

	fullScr		: false,
	setFullScr	: b=> set(()=> ({fullScr: b})),
	toggleFullScr	: ()=> set(s=> ({fullScr: ! s.fullScr})),

	isReadBack	: false,
	setReadBack	: b=> set(()=> ({isReadBack: b})),

	isTyping	: false,
	setIsTyping	: b=> set(()=> ({isTyping: b})),
	skipReq		: 0,
	requestSkip	: ()=> set(s=> ({skipReq: s.skipReq + 1})),
	skipping	: false,
	setSkipping	: b=> set(()=> ({skipping: b})),

	wait		: null,
	setWait		: w=> set(()=> ({wait: w})),
}))
