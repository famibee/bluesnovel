/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2024-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import {type T_LAY_IDX, type T_LAY_CMN, noticeDrag} from './Lay';
import {useStore} from '../store/store';
import {CH_IN_DEF, chInTween} from '../ts/ChStyle';
import {Kinsoku, type T_KIN_CH} from '../ts/Hyphenation';
import {type T_CH, type T_LNK, type T_R_ALIGN} from '../ts/Txt';
import {aniSpriteClass, loadSheet, type T_SHEET} from '../ts/Sprite';
import {hintMng} from '../ts/Hint';
import {CmnLib} from '../sn/CmnLib';
import {focusMng} from '../ts/FocusMng';
import BtnLayer from './BtnLayer';

import {css} from '@emotion/react';
import {type CSSProperties, type KeyboardEvent, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState} from 'react';
import Moveable from 'react-moveable';
import gsap from 'gsap';


// [button]タグで文字レイヤ（UIコンテナ）に乗せるボタンで1件分のデータ
//	skynovel_esmのTxtLayerが#cntBtnで複数のButtonを抱えるのと同じ発想：
//	文字レイヤ自体を「UIコンテナ」とし、ボタンは独立レイヤにしない（表示/非表示を一緒に切り替えやすくするため）。
// [button]で指定できる配置・寸法・変形（本家 Button.ts のコンストラクタ相当）。
//	**書かれた属性だけ**を持つ（[lay]と同じ流儀）。left/topが無ければ流し込み配置のまま
export type T_BTN_STY = {
	left?		: number;
	top?		: number;
	// 中央寄せ・右端合わせ・画面端からのオフセット（本家 Layer.ts:513-558 の center/right/middle/bottom/
	//	s_right/s_bottom。実際は未配線のデッドコードだったが仕様として掘り起こした。[lay]と同じ設計 → Lay.ts styLay()）
	align_x?	: 'center' | 'right';
	align_y?	: 'middle' | 'bottom';
	s_right?	: number;
	s_bottom?	: number;
	width?		: number;
	height?		: number;	// 本家は文字の高さ＝フォントサイズでもある
	rotation?	: number;
	pivot_x?	: number;
	pivot_y?	: number;
	scale_x?	: number;
	scale_y?	: number;
	alpha?		: number;
	enabled?	: boolean;
	blendmode?	: string;	// CSSのmix-blend-mode値へ変換済み
	// 見た目（**bluesnovelはCSS**。本家はpixiのTextStyle JSONで、`{`始まりの値だけ読み替える）。
	//	通常・ホバー／フォーカス中・押下中の3状態
	style?		: string;
	style_hover?: string;
	style_clicked?: string;
	// ツールチップ（本家 EventMng.ts:418 #dispHint()）。Hint.ts が画面に1つの吹き出しで出す
	hint?		: string;
	hint_style?	: string;	// 吹き出しのCSS
	hint_opt?	: string;	// 本家popperのオプションJSON（placementだけ見る）
	// 画像ボタン（[button pic=…]）と背景画像（[button b_pic=…]）。
	//	picは論理名で、srcは解決済みURL（埋めるのはScriptMng。[lay fn=]と同じ関係）
	pic?		: string;
	src?		: string;
	b_pic?		: string;
	b_src?		: string;
	// 効果音（本家 EventMng.ts:465-491）。値は論理ファイル名のまま（パス解決は鳴らす瞬間に
	//	ScriptMng側で行う。[lay fn=]と違い事前解決してsrcを持たせない——押されるかどうか
	//	分からない音を先読みしても仕方ないため）。bufの既定は'SYS'（[playse]自体の既定'SE'とは別）
	clickse?	: string;
	enterse?	: string;
	leavese?	: string;
	clicksebuf?	: string;
	entersebuf?	: string;
	leavesebuf?	: string;
};
export type T_BTN = {
	nm		: string;
	text	: string;
	label	: string;
	call?	: boolean;	// [button call=true]指定時：クリックでjumpではなくcall（サブルーチンコール）する
	fn?		: string;	// [button fn=...]指定時：別スクリプトのラベルへ飛ぶ
	sty?	: T_BTN_STY;
};
type T_TXTARG = T_LAY_CMN & {
	sty		: CSSProperties;	// [lay]のvisible/alpha/left/top/rotation/scale_*（Stage.tsx styLay()）
	nm		: string;
	isFore	: boolean;	// 表ページ側か。[l]/[p]の待ちマーカーは表にだけ出す（裏ページにも同名レイヤがあるため）
	str		: string;	// ルビを除いた平文（見た目の判定用。実際に描くのはaCh）
	aCh		: T_CH[];	// 表示単位の並び（ルビ記法を割った結果。Txt.ts splitCh）
	ffs?	: string | undefined;	// [lay ffs=…]。文字詰め（font-feature-settingsの値）
	noffs?	: string | undefined;	// [lay noffs=…]。ffsを効かせない文字の並び
	bura?	: boolean | undefined;	// [lay bura=…]。ぶら下げ禁則
	// [lay kinsoku_sol=/kinsoku_eol=/kinsoku_dns=/kinsoku_bura=]。禁則文字集合の指定
	kinsoku_sol?	: string | undefined;
	kinsoku_eol?	: string | undefined;
	kinsoku_dns?	: string | undefined;
	kinsoku_bura?	: string | undefined;
	r_align?: T_R_ALIGN | undefined;	// [lay r_align=…]。ルビ位置の既定（記法内指定があればそちらが勝つ）
	b_color?: number | undefined;	// [lay b_color=0xRRGGBB]。文字レイヤ背景色。未指定は試作の既定色
	b_alpha	: number;	// [lay b_alpha=...]。文字レイヤ背景の不透明度（0.0～1.0）。背景のアルファとしてのみ反映し、文字自体は常に不透明
	b_alpha_isfixed?: boolean | undefined;	// [lay b_alpha_isfixed=true]。sys:TextLayer.Back.Alphaとの掛け算をせず、b_alphaをそのまま使う
	b_src?	: string | undefined;	// [lay b_pic=…]の解決済みURL。**あればb_colorより優先**（本家 TxtLayer.ts:393）
	styTxt?	: string | undefined;	// [lay style="..."]。文字レイヤへそのまま足すCSS（試作の既定スタイルを上書きする）
	// [lay pl=/pr=/pt=/pb=]。文字表示領域の内側余白（px）。未指定は既定のCSS値（1em/1.5em）のまま
	pl?		: number | undefined;
	pr?		: number | undefined;
	pt?		: number | undefined;
	pb?		: number | undefined;
	enabled	: boolean;	// [enable_event]。falseの間はこのレイヤのボタンと[link]がクリックを受けない
	aBtn	: T_BTN[];
	in_style?: string | undefined;	// [lay in_style=…]。[ch_in_style]で定義した文字出現演出名
	onActivate: (label: string, call: boolean, fn: string, arg?: string)=> void;
	onNavigate: (url: string)=> void;	// [link url=…]
	onSe: (fn: string, buf: string)=> void;	// [button clickse=/enterse=/leavese=]
};
// 文字出現演出のアニメ終端＝**素の表示状態**。[ch_in_style]がどんな値から始めても必ずここへ落とす。
//	キル時の中途半端な状態を確定させるのにも使う（本家のkeyframesの`to`が`transform: none`なのと同じ）
const CH_END = {opacity: 1, x: 0, y: 0, scaleX: 1, scaleY: 1, rotation: 0};
// [link]区間のクリック（本文DOMはReactの外で組み立てるので、コールバックを渡して繋ぐ）
export type T_ON_LINK = (lnk: T_LNK)=> void;
// ストア（zustand）に保存するデータだけの型（cmnはrender時のPropsのみなので不要）
export type T_TXTLAY_DATA = T_LAY_IDX & {cls: 'txt'; str: string; aCh: T_CH[]; ffs?: string; noffs?: string; bura?: boolean;
	kinsoku_sol?: string; kinsoku_eol?: string; kinsoku_dns?: string; kinsoku_bura?: string;
	r_align?: T_R_ALIGN; b_color?: number; b_alpha: number; b_alpha_isfixed?: boolean; b_pic?: string; b_src?: string; style?: string; enabled: boolean; aBtn: T_BTN[];
	pl?: number; pr?: number; pt?: number; pb?: number;
	// 文字出現・消去演出の名前（[lay in_style=/out_style=]）。定義そのものはストアの hChIn/hChOut
	in_style?: string; out_style?: string};
export type T_TXTLAY = T_TXTLAY_DATA & T_LAY_CMN;


export default function TxtLayer({cmn: {styChild, isDesignMode}, sty, nm, isFore, str, aCh, ffs, noffs, bura,
	kinsoku_sol, kinsoku_eol, kinsoku_dns, kinsoku_bura,
	r_align, b_color, b_alpha, b_alpha_isfixed, b_src, styTxt: sCss, pl, pr, pt, pb, enabled, aBtn, in_style, onActivate, onNavigate, onSe}: T_TXTARG) {
	// 読み戻り中（PageLogが最新ページを指していない間）は本文を[page style=…]の見た目にする
	const isReadBack = useStore(s=> s.isReadBack);
	const styPaging = useStore(s=> s.styPaging);	// [page style=…]（読み戻り中の本文の見た目）
	const isTyping = useStore(s=> s.isTyping);
	const setIsTyping = useStore(s=> s.setIsTyping);
	const skipReq = useStore(s=> s.skipReq);
	const skipping = useStore(s=> s.skipping);	// 既読スキップ中は文字送り演出を省いて瞬時表示する
	const wait = useStore(s=> s.wait);
	const hChIn = useStore(s=> s.hChIn);	// [ch_in_style]の定義表（画面ぜんぶで1つ）
	const chWait = useStore(s=> s.chWait);	// 1文字あたりの待ち（sys:sn.tagCh.*＋既読状態）
	const autowc = useStore(s=> s.autowc);	// [autowc]の文字ごとウェイト表

	// b_pic（文字レイヤ背後の枠画像）の自動サイズ調整（本家 TxtLayer.ts:396-414
	//	setMySize(sp.width, sp.height) 相当）。**[lay width=/height=]の明示があればそちらが勝つ**
	//	（本家は#txs.lay()の後に#drawBack()が走るのでb_picが勝つが、順序に同じb_pic再指定だと
	//	setMySize()が呼ばれず明示指定が生き残るという罠がある。bluesnovelはBtnLayer.tsxの
	//	btnBoxSize()＝「明示(o.width)が絵の実寸(natSrc?.w)に優先」と同じ形に揃え、順序依存を持ち込まない）。
	//	実測はBtnLayer.tsx:245-258のnatBPicと同じ流儀（new Image + onload + aliveフラグでキャンセル）
	const [natBPic, setNatBPic] = useState<{w: number; h: number} | null>(null);
	useEffect(()=> {
		if (! b_src) {setNatBPic(null); return}

		let alive = true;
		const img = new Image;
		img.onload = ()=> {if (alive) setNatBPic({w: img.naturalWidth, h: img.naturalHeight})};
		img.src = b_src;
		return ()=> {alive = false};
	}, [b_src]);
	const styBox: CSSProperties = {
		...(natBPic && (! ('width' in sty) || ! ('height' in sty))
			? {...sty, ...('width' in sty ? {} : {width: `${String(natBPic.w)}px`}),
				...('height' in sty ? {} : {height: `${String(natBPic.h)}px`})}
			: sty),
		// [lay pl=/pr=/pt=/pb=]。指定された辺だけ既定のCSS padding（1em/1.5em）を上書きする
		...(pl !== undefined ? {paddingLeft: `${String(pl)}px`} : {}),
		...(pr !== undefined ? {paddingRight: `${String(pr)}px`} : {}),
		...(pt !== undefined ? {paddingTop: `${String(pt)}px`} : {}),
		...(pb !== undefined ? {paddingBottom: `${String(pb)}px`} : {}),
	};

	// 1文字ずつの文字送り演出（GSAP stagger）
	//	・aCh は「そのページの累積全文字」を表示単位へ割ったもの（ルビ付きは親文字＋ルビで1単位）。
	//	  前回からの差分（新規追加分）だけをspan化してアニメする
	//	・isReadBack中（読み戻りで前のページを演じ直している間）は文字送り演出をせず瞬時に確定表示
	//	・文字はboxRef直下のcharsRefに収め、待ちマーカー（下記）はReactが別途管理する兄弟スパンとして共存させる
	const boxRef = useRef<HTMLSpanElement>(null);
	const charsRef = useRef<HTMLSpanElement>(null);
	// [link]のクリック。[button]と同じ経路（ScriptMng.jumpToLabelAndGo）へ流す
	//	url指定なら[navigate_to]と同じ経路でURLを開く（ラベルへは飛ばない）
	const onLink: T_ON_LINK = l=> {
		if (l.url) {onNavigate(l.url); return}
		onActivate(l.label, l.call, l.fn, l.arg);
	};
	// 1表示単位＝1spanのキャッシュ。読み戻りで短くなってもここからは消さず、
	// DOM上の表示/非表示だけを切り替える。これにより読み戻りから戻った際に
	// 既にアニメ表示済みの文字を再アニメせず瞬時表示できる（バグ修正: 2026-07-20）。
	const spansRef = useRef<HTMLSpanElement[]>([]);
	const chRef = useRef<T_CH[]>([]);	// 上のspanに対応する表示単位（前方一致の判定用）
	const tlRef = useRef<gsap.core.Timeline | null>(null);

	// 文字詰め（本家 TxtLayer.ts:480 #fncFFSStyle）。**1文字ずつ当てる**必要があるのは
	//	noffsで「この文字だけ詰めない」と外せる仕様のため（全角空白は本家も常に除く）
	const fncFfs = useCallback((c: string)=> {
		if (! ffs) return '';
		return new RegExp(`[　${noffs ?? ''}]`).test(c) ? '' : ffs;
	}, [ffs, noffs]);

	// 禁則文字集合（[lay kinsoku_sol=/eol=/dns=/bura=]）。競合チェックはstore.tsxのchgLayが
	//	済ませている（マージ後のそのレイヤ全体の値が要るため、エンジン単体では判定できない）
	const kin = useMemo(()=> new Kinsoku({sol: kinsoku_sol, eol: kinsoku_eol, dns: kinsoku_dns, bura: kinsoku_bura}),
		[kinsoku_sol, kinsoku_eol, kinsoku_dns, kinsoku_bura]);
	// 縦書きか（本家 TxtStage.ts:263 も算出スタイルで見る）。isTateステートは別のuseLayoutEffectで
	//	styの変化時にしか更新されないので、禁則計算の直前は都度読み直す
	const isTategaki = ()=> !! boxRef.current && globalThis.getComputedStyle(boxRef.current).writingMode.startsWith('vertical');

	useLayoutEffect(()=> {
		const el = charsRef.current;
		if (! el) return;

		tlRef.current?.kill();

		// 本当のページクリア（aChとキャッシュが互いに前方一致しない＝別内容）の場合のみ作り直す
		const cacheCh = chRef.current;
		const min = Math.min(cacheCh.length, aCh.length);
		let same = 0;
		while (same < min && cacheCh[same]!.c === aCh[same]!.c && cacheCh[same]!.r === aCh[same]!.r
			&& cacheCh[same]!.s === aCh[same]!.s && cacheCh[same]!.rs === aCh[same]!.rs) ++same;
		if (same < min) {
			spansRef.current = [];
			chRef.current = [];
			el.textContent = '';
		}
		// 前回の禁則処理で挿した<br>を一度削除（本家 TxtStage.ts:369）。文字が増えるたびに
		//	`el.childNodes.length === span数`の前提でDOM同期する下のwhile2本より前に置く必要がある
		el.querySelectorAll(':scope > br').forEach(e=> e.remove());

		const cache = spansRef.current;
		const target = Math.min(aCh.length, cache.length);

		// 表示DOMをキャッシュ済み範囲まで合わせる
		//	・読み戻り（aChが短い）：末尾を非表示化（キャッシュからは消さない）
		//	・読み戻りから戻る（aChがキャッシュ済み長へ復帰）：非表示にしていた分を瞬時に復帰
		while (el.childNodes.length > target) el.removeChild(el.lastChild!);
		while (el.childNodes.length < target) el.appendChild(cache[el.childNodes.length]!);
		if (target > 0) gsap.set(cache.slice(0, target), CH_END);	// キル時の中途半端な状態を確定させる

		if (aCh.length <= cache.length) {
			// 既知の範囲内（読み戻り、または既知長への復帰）：新規アニメ不要。
			//	ただしbura/kinsoku_*だけが変わってこの効果が再実行された場合もあるので禁則は掛け直す
			applyKinsoku(el, cache, chRef.current, kin, bura ?? false, isTategaki());
			setIsTyping(false);
			return;
		}

		// キャッシュを超える分だけが本当に新規表示すべき文字
		const added = aCh.slice(cache.length);
		const frag = document.createDocumentFragment();
		const newSpans = added.map(ch=> {
			const s = document.createElement('span');
			// ブラウザ標準の行分割・禁則を無効化して自前計算に一本化する（本家 TxtLayer.ts:114-117
			//	の.sn_ch同様inline-block化。[r]由来の改行だけは箱の中で完結させず行を割らせたいのでinlineのまま）
			s.style.display = ch.c === '\n' ? 'inline' : 'inline-block';
			s.appendChild(elCh(ch, r_align, onLink, fncFfs, onSe));
			frag.appendChild(s);
			return s;
		});
		chRef.current = [...chRef.current, ...added];
		cache.push(...newSpans);
		el.appendChild(frag);

		// ルビの<rt>はline box計算の外側に固定量ではみ出し、詰めて表示すると1つ前の行と
		//	重なりうる（CSSの<ruby>任せの制約。本家TxtStage.tsも同じHTML/<ruby>で組むが対応なし）。
		//	margin-block-startではみ出し分を占有領域に含め、隣の行を侵食しないようにする
		//	（block-startは横書きで上端・縦書きvertical-rlで右端になり、どちらの書字方向でも
		//	「1つ前の行」側を指す）
		newSpans.forEach(s=> {
			const rt = s.querySelector('rt');
			if (! rt) return;
			s.style.marginBlockStart = `${String(rt.getBoundingClientRect().height)}px`;
		});

		// GSAPが変形を当てる前（＝計測が祖先transformで汚染されない唯一の安全点）に禁則を掛ける
		applyKinsoku(el, cache, chRef.current, kin, bura ?? false, isTategaki());

		if (isReadBack || skipping) {
			// 読み戻り中／既読スキップ中：staggerを使わず瞬時にアニメ終端状態へ
			gsap.set(newSpans, CH_END);
			setIsTyping(false);
			return;
		}

		// 文字出現演出。**1文字ずつ別のtweenを積む**（本家が文字ごとに`animation-delay`を
		//	書くのと同じ形）。1本のtweenへstaggerを掛ける書き方では、
		//	・文字ごとに演出が違う（[span ch_in_style=…]）
		//	・文字ごとに待ちが違う（[autowc]、[ch wait=…]）
		//	のどちらも表せない。timelineの位置（秒）でその2つを表現する
		const tl = gsap.timeline({onComplete: ()=> setIsTyping(false)});
		let pos = 0;	// 本家の #cumDelay（TxtLayer.ts:775）。ここまでに積んだ待ちの合計
		let n = 0;		// 実際に積んだtweenの数
		newSpans.forEach((el, i)=> {
			const ch = added[i]!;
			// 演出は [span]/[ch] の指定 → レイヤの指定 → 組み込みの`default` の順に落ちる
			const chSty = hChIn[ch.cis ?? in_style ?? 'default'] ?? CH_IN_DEF;
			// この文字ぶんの待ちも同じ順（本家 TxtLayer.ts:756 #o2domArg）。
			//	[autowc]の表に無い文字は0（本家も `?? 0`＝表に載せた文字だけが待つ）
			const w = ch.w ?? (autowc.enabled ? autowc.h[ch.c.at(0) ?? ''] ?? 0 : chWait);
			if (chSty.join) pos += w / 1000;	// 本家も使う前に足す

			if (chSty.wait <= 0) {gsap.set(el, CH_END); return}	// wait=0は瞬時

			const {from, to} = chInTween(chSty);
			// join=falseの文字は待たずに動き出す（本家は animation-delay を 0ms に潰す）
			tl.fromTo(el, from, to, chSty.join ? pos : 0);
			++n;
		});
		if (n === 0) {	// 全部が瞬時＝待つものが無い（空のtimelineはonCompleteの時期が読めない）
			tl.kill();
			setIsTyping(false);
			return;
		}

		setIsTyping(true);
		tlRef.current = tl;
	}, [aCh, isReadBack, fncFfs, in_style, hChIn, chWait, autowc, bura, kin, r_align]);

	// タイプ演出中にMain.tsxのnext()からスキップ要求（requestSkip）が来たら、即終端まで進める
	//	（progress(1)によりtimelineのonCompleteが発火し、setIsTyping(false)も自動で呼ばれる）
	useEffect(()=> {
		if (tlRef.current && tlRef.current.progress() < 1) tlRef.current.progress(1);
	}, [skipReq]);

	// [l]/[p]待ち中マーカーの画像（`breakline`/`breakpage`がプロジェクトにあるとき。ScriptMngが解決）。
	//	アニメpng（.json）なら読み終わってからクラスを当てる＝GrpLayerと同じ待ち方
	const waitSrc = wait?.src ?? '';
	const isWaitSheet = waitSrc.endsWith('.json');
	const [waitSheet, setWaitSheet] = useState<T_SHEET | undefined>(undefined);
	useEffect(()=> {
		if (! isWaitSheet) {setWaitSheet(undefined); return}

		let alive = true;
		void loadSheet(waitSrc).then(v=> {if (alive) setWaitSheet(v)});
		return ()=> {alive = false};
	}, [waitSrc, isWaitSheet]);

	// [l]/[p]/[waitclick]待ち中（🩷/✅、または見た目に出ないフォーカス専用のプロキシ）。
	//	[s]は対象外（wait自体がnullのまま＝完全停止でユーザー操作では進めない）。読み戻り中は非表示
	//	isTypingを含めてガード：タイプ演出開始時は表示せず、最後の文字のアニメが終了（isTypingがfalseに）した同時/以降に表示する
	//	表裏2ページとも常にマウントされており同名レイヤが両方に居るので、裏側には出さない
	const wantWaitEl = isFore && ! isReadBack && ! isTyping && wait !== null && wait.nm === nm;
	// マーカー画像/絵文字を実際に描くのは[l]/[p]だけ（[waitclick]は本家どおりマーカーなし）
	const showWaitMark = wantWaitEl && wait!.kind !== 'waitclick';
	// フォーカスの輪へ登録するか（todo.md「本文で左右キーでシステムボタンにフォーカスが移った後、
	//	本文に戻れず読み進められなくなる」不具合対応）。[enable_event enabled=false]の間は
	//	クリックも受けないレイヤなので、BtnLayer.tsxと同じ理由でフォーカス対象からも外す
	const canFocusWait = wantWaitEl && enabled;
	// 縦書きか（本家 TxtStage.ts:263 も算出スタイルで見る）。[lay style=…]でしか変わらないので
	//	そのCSS文字列とインラインstyleが変わったときだけ測り直す
	const [isTate, setIsTate] = useState(false);
	useLayoutEffect(()=> {
		const el = boxRef.current;
		setIsTate(!! el && globalThis.getComputedStyle(el).writingMode.startsWith('vertical'));
	}, [sCss, sty]);
	const styWaitMark = css`
		display: inline-block;
		/* **論理プロパティで書く**。縦書き（writing-mode: vertical-rl）では margin-left が
			「次の行の方向」＝横へのずらしになってしまい、マークだけ本文から離れて隣の列へ寄る。
			margin-inline-start なら横書きでは左、縦書きでは上——どちらでも「直前の文字の次」になる */
		margin-inline-start: 0.15em;
		/* **縦書きでは書字方向に合わせてマークも回す**（-90°）。背景画像も<img>も
			writing-modeでは回らないので、横書き用に描かれた▼（次の行の方向を指す絵）が
			縦書きでもそのまま下を向いてしまう。本家は待ちマークを本文とは別のpixiコンテナへ
			固定位置で置くのでこの問題が出ないが、こちらは本文の流れの中（ぶら下げ位置）に
			置いているため、向きが本文と食い違うと目立つ */
		${isTate ? 'rotate: -90deg;' : ''}
		/* [waitclick]用プロキシは中身が空（マーカーなし）。中身が無いinline-blockは0x0になり
			FocusMng.#canFocus()のgetClientRects()判定に落ちてフォーカスできなくなるため、
			widthやheightが明示されていない時だけ最小の当たり判定を確保する（見た目には出さない） */
		${! showWaitMark && wait?.width === undefined && wait?.height === undefined
			? 'min-inline-size: 1em; min-block-size: 1em;' : ''}
	`;
	// [l]/[p]/[waitclick]待ち中のプロキシ要素をフォーカスの輪へ出し入れする（todo.md対応）。
	//	BtnLayer.tsxの登録パターン（focusMng.add/remove）を踏襲。矢印キーでシステムボタン側から
	//	ここへ戻って来られるようにするのが目的で、輪から出ている間（本文が進む・裏へ回る等）は
	//	自動的に外れる。
	//	`data-wait-focus`は[button]（BtnLayer.tsx）のspanと見分けるための目印：
	//	E2Eの一部が`span[tabindex]`だけで[button]を拾っており、このプロキシも同じ
	//	`tabIndex={0}`を持つため、区別が要る場所は`:not([data-wait-focus])`で除く
	//	（test/e2e/btnpic.e2e.ts・pic.e2e.ts参照）
	const waitRef = useRef<HTMLSpanElement>(null);
	// [event key=ArrowLeft/Right]（[set_focus to=prev/next]）はcall予約のため、[return]後に
	//	同じ[l]/[p]待ちが#runStep()で再処理され、store.waitが一旦null→再設定される
	//	（ScriptMng.ts #runStep()の「前回の待ちマーカーをまずクリア」処理）。これにより
	//	このプロキシspan自体が unmount→remount され、フォーカスしていたDOM要素が消えて
	//	document.bodyへフォーカスが抜けてしまう（todo.md「ArrowRightが起点位置によって
	//	稀にフォーカスを見失う」不具合の実体）。unmount直前に自分がフォーカス中だったかを
	//	覚えておき、remountされた新しい要素へフォーカスを引き継ぐ
	const wasFocusedRef = useRef(false);
	useEffect(()=> {
		const el = waitRef.current;
		if (! el || ! canFocusWait) return;

		focusMng.add(el);
		if (wasFocusedRef.current) {
			wasFocusedRef.current = false;
			el.focus();
		}
		return ()=> {
			wasFocusedRef.current = focusMng.isFocus(el);
			focusMng.remove(el);
		};
	}, [canFocusWait]);
	// Enter/Spaceでの決定＝本文クリックと同じ扱いにする。BtnLayer.tsxのonKeyDownと同じ理由で
	//	stopPropagation()が要る：しないとMain.tsxのdocument直下Enterハンドラ（「何もフォーカスして
	//	いない」前提で読み進める経路）まで二重に届き、1回のEnterで2行分進んでしまう。
	//	clickイベントを合成発火して[link]と同じ経路（Stage.tsxルートdivのonClick）へ委譲することで、
	//	読み進めロジック自体は本文クリックのものをそのまま再利用する
	const onWaitKeyDown = (e: KeyboardEvent<HTMLSpanElement>)=> {
		if (e.key !== 'Enter' && e.key !== ' ') return;

		e.stopPropagation();
		e.preventDefault();
		waitRef.current?.dispatchEvent(new MouseEvent('click', {bubbles: true}));
	};
	// [l]/[p]に書かれた待ちマークの位置・寸法（本家 TxtStage.ts:685-688）。**書かれた時だけ**当てる。
	//	省略時は本文の流れの中の位置・文字サイズなり（本家の既定もフォントサイズなので同じ絵）。
	//	x/yは**ずらし**なので translate で表す——行の高さや隣の文字の位置を動かさないため
	const styWaitPos: CSSProperties = {
		...wait?.width !== undefined ? {width: `${String(wait.width)}px`} : {},
		...wait?.height !== undefined ? {height: `${String(wait.height)}px`} : {},
		...wait?.x !== undefined || wait?.y !== undefined
			? {translate: `${String(wait?.x ?? 0)}px ${String(wait?.y ?? 0)}px`} : {},
	};
	// [button]タグでこの文字レイヤ（UIコンテナ）に乗せたボタン群のボックス。
	//	独立レイヤにしないことで、この文字レイヤごと表示/非表示を一括に切り替えられる。
	//	[enable_event enabled=false]の間はクリックを受けない（本家 TxtLayer.enabled 相当）
	const styBtnBox = css`
		display: flex;
		flex-wrap: wrap;
		top: 70%;
		${enabled ? '' : 'pointer-events: none;'}
	`;
	// [button left=/top=]で座標指定されたボタンは**ステージ原点基準**の絶対配置にする
	//	（本家 Button.ts はステージ左上からの絶対配置）。上の流し込み用の箱（top:70%）へ
	//	入れると、その箱の位置を基準にleft/topが効いてしまい画面外へずれる（タイトル画面のボタンで露見）。
	//	原点の箱（styChild＝top:0/left:0）へ分けて置けば、書いたleft/topがそのままステージ座標になる
	// [lay]のうち**位置・変形以外**（visible→display / alpha→opacity / blendmode / filter）は
	//	ボタンの箱にも効かせる。本家はボタンが文字レイヤのコンテナ（Layer.ctn）の子なので、
	//	コンテナへ掛けた分がそのままボタンにも乗る。こちらはボタンの箱を本文spanの**兄弟**に
	//	している（本文側のwidth/writing-mode/paddingをボタンの座標計算へ持ち込まないため）ので、
	//	その差をここで埋める。left/top/transform/transformOriginは持ち込まない
	//	（ボタンはステージ原点基準に置くという上のとおり）。
	//	これが無いと[sys_menu visible=false]でシステムボタンが消えない
	const {display, opacity, mixBlendMode, filter} = sty;
	const styBtnCmn: CSSProperties = {
		...display !== undefined ? {display} : {},
		...opacity !== undefined ? {opacity} : {},
		...mixBlendMode !== undefined ? {mixBlendMode} : {},
		...filter !== undefined ? {filter} : {},
	};
	const isPosBtn = (b: T_BTN)=> b.sty?.left !== undefined || b.sty?.top !== undefined;
	const aBtnFlow = aBtn.filter(b=> ! isPosBtn(b));
	const aBtnPos = aBtn.filter(isPosBtn);
	const styBtnPosBox = css`
		${enabled ? '' : 'pointer-events: none;'}
	`;
	// 背景色は[lay b_color=0xRRGGBB]。未指定時は試作の既定色（aquamarine相当）
	const {r, g, b} = rgbOf(b_color);
	// 背景の不透明度は b_alpha × sys:TextLayer.Back.Alpha（本家 TxtLayer.ts:388）。
	//	b_alpha_isfixed=true のレイヤだけは掛けずにb_alphaそのもの（クリック待ち画面など、
	//	設定の「バック不透明度」に影響されたくない層のための指定）
	const backAlpha = useStore(s=> s.backAlpha);
	const bAlpha = b_alpha * (b_alpha_isfixed ? 1 : backAlpha);
	// **文字が1つも無い層には箱（背景＋枠）を描かない**。
	//	既定のaquamarine背景＋点線枠は試作の*目印*（本来見えない文字層の位置と大きさを分かるようにする
	//	もの）であって、テンプレが期待する見た目ではない。文字が無いのは
	//	・ボタン置き場として使っている層（テンプレのタイトル画面のmes層がこれ）
	//	・まだ何も書いていない／[er]・[clear_lay]で空にした層
	//	のどちらかで、どちらも本家では何も見えない。とくに後者は[trans]の最中に裏ページが
	//	見えるので、空のメッセージ窓が水色の帯として一瞬現れてしまっていた。
	//	ただし[lay b_color=…]で色を明示した層は「意図して置いた板」なので描く。
	//	**背景が完全に透明なら箱も描かない**：枠はCSSのborderでb_alphaが効かないため、
	//	これが無いと「透明な板」に点線だけが残る。テンプレの[txt_lay_fullscreen b_alpha=0]が
	//	まさにその形（b_colorは書くが透過度0）で、全画面の文字レイヤが点線矩形として見えていた
	const noBox = bAlpha === 0 || (str.length === 0 && b_color === undefined && ! b_src);
	const styTxt = css`
		padding: 1em 1.5em;
		/* 背景色に[lay b_alpha=...]をアルファチャンネルで反映。
			要素全体のopacityではなく背景色のアルファのみを下げるので、子要素（文字）の透過度には影響しない
			（レイヤ全体を透かしたい場合は[lay alpha=...]） */
		/* [lay b_pic=…]があればそれを背景画像にし、**b_colorは無視する**（本家と同じ規約）。
			枠画像は左上を原点にそのままの大きさで置く（本家もレイヤ左上に等倍で置き、
			文字表示領域のサイズを画像に合わせる）。b_alphaは画像・単色どちらにも効かせたいので、
			画像のときは要素のopacityではなく擬似要素で敷いて透過させる */
		background-color: ${noBox || b_src ? 'transparent' : `rgba(${r}, ${g}, ${b}, ${bAlpha})`};
		border: ${noBox || b_src ? 'none' : 'dotted 6px #ffa500'};
		${b_src ? `
		&::before {
			content: '';
			position: absolute;
			left: 0; top: 0; right: 0; bottom: 0;
			background-image: url(${JSON.stringify(b_src)});
			background-repeat: no-repeat;
			background-position: left top;
			opacity: ${bAlpha};
			pointer-events: none;
			z-index: -1;
		}` : ''}

		font-size: xxx-large;
		/* top/leftの省略時既定はCSSの0（test/argdef_parity.test.ts A_CSS_DEF、本家 Layer.ts:512,538の
			x/y初期値と同じ）。実際の本文レイヤは[txt_lay_fullscreen]等が必ずtop=を明示するため
			この既定が表に出る場面は無いはずだったが、[lay b_pic=…]だけを指定するレイヤ（例：
			タイトル画面のクリック待ちオーバーレイ mes_c2p）はtopを指定しないため、
			ここが48%のままだと画面下寄りにずれて表示される不具合になっていた。
			上のmarginを消したのも同じ理由：margin: 2em 0が残っていると、top:0を明示しても
			上下96px（2em、font-size: xxx-largeぶん）ぶん箱がステージからはみ出し、b_picが
			ステージ全体を覆いきれなかった（この既定margin自体、pl/pr/pt/pb同様の上書き手段が無く、
			本家にも対応する概念が無い試作期の置き土産だった） */
		top: 0;
		width: 70%;
		white-space: pre-wrap;
		color: inherit;
		/* [enable_event enabled=false]：**本文中の[link]もクリックを受けなくする**
			（本家は文字レイヤのコンテナごと ctn.interactiveChildren=false にするので、
			ボタンもリンクもまとめて効かなくなる。TxtLayer.ts:838）。
			クリックはステージへ抜けるので、読み進め自体は止まらない */
		${enabled ? '' : 'pointer-events: none;'}

		/* [lay style="..."]。上の既定を後から上書きできるよう最後に置く */
		${sCss ?? ''}

		/* 読み戻り中の見た目（[page style=…]。既定は本家 INI_STYPAGE と同じ黄色＋黒フチ）。
			**[lay style=…]よりさらに後**に置く：本家は読み戻り中だけ全文字レイヤへこのCSSを
			当て直す（setAllStyle2TxtLay）ので、レイヤ自身が色を書いていても勝つ必要がある */
		${isReadBack ? styPaging : ''}
	`;

	const styInp = css`
		position: absolute;
		z-index: 1;
		display: inline-block;
		left: 20%;
		top: 20%;

		margin-bottom: 20px;
		padding: 8px;
		border: 2px solid #000000;
		border-radius: 28px;
		background-color: #e2feff;
		text-align: left;
		font-size: 16px;
		font-weight: 400;
		line-height: 1.5;
		color: #000000;

		&:before {
			content: "";
			position: absolute;
			bottom: 0;
			left: 25%;
			border-style: solid;
			border-width: 20px 20px 0 0;
			border-color: #000000 transparent transparent;
			translate: -50% 100%;
			transform: skew(-25deg);
			transform-origin: top;
		}
		&:after {
			content: "";
			position: absolute;
			bottom: 0;
			left: 25%;
			border-style: solid;
			border-width: 15.2px 15.2px 0 0;
			border-color: #e2feff transparent transparent;
			translate: calc(-50% - 0.4px) 100%;
			transform: skew(-25deg);
			transform-origin: top;
		}

		textarea {
			display: block;
			border-radius: 20px;
			border: 2px solid gray;
			outline: none;
			padding: 0 0.3em;
			font-size: xxx-large;
			line-height: 1.2;
			&:focus {
				border-color: #ff9900;
			}
		}
	`;
	// デザインモードの手入力欄用（実表示は boxRef 側のDOM直接操作で行う）
	const [inp, setInp] = useState('');
	useEffect(()=> setInp(str), [str]);

	const txa = useRef<HTMLLabelElement>(null);
	const evt = (style: CSSStyleDeclaration, transform: string)=> {
		noticeDrag();
		style.transform = transform;
	}
	return <>
		<span css={[styChild, styTxt]} ref={boxRef} data-lay={nm} style={styBox}>
			<span ref={charsRef}></span>
			{wantWaitEl && <span ref={waitRef} css={styWaitMark} style={styWaitPos}
				{...canFocusWait ? {tabIndex: 0, onKeyDown: onWaitKeyDown, 'data-wait-focus': true} : {}}>{
				! showWaitMark ? null
				// プロジェクトに`breakline`/`breakpage`があればそれを、無ければ試作の絵文字を出す
				: waitSheet ? <span className={aniSpriteClass(waitSheet)}/>
				: waitSrc && ! isWaitSheet ? <img src={waitSrc} style={{verticalAlign: 'text-bottom',
					...wait!.width !== undefined || wait!.height !== undefined
						? {width: '100%', height: '100%'} : {}}}/>
				: wait!.kind === 'l' ? '🩷' : '✅'
			}</span>}
		</span>
		{aBtnFlow.length > 0 && <span css={[styChild, styBtnBox]} data-lay={nm} style={styBtnCmn}>
			{aBtnFlow.map(b=> <BtnLayer key={b.nm} text={b.text} label={b.label} call={b.call ?? false} fn={b.fn ?? ''} sty={b.sty} enabled={enabled} onActivate={onActivate} onSe={onSe}/>)}
		</span>}
		{aBtnPos.length > 0 && <span css={[styChild, styBtnPosBox]} data-lay={nm} style={styBtnCmn}>
			{aBtnPos.map(b=> <BtnLayer key={b.nm} text={b.text} label={b.label} call={b.call ?? false} fn={b.fn ?? ''} sty={b.sty} enabled={enabled} onActivate={onActivate} onSe={onSe}/>)}
		</span>}
		{isDesignMode && <Moveable target={boxRef}
			/* draggable */
			draggable={true}
			throttleDrag={1}
			onDrag={({target: {style}, transform})=> evt(style, transform)}

			/* resizable*/
			resizable={true}
			keepRatio={false}
			onResize={({target: {style}, width, height, drag: {transform}})=> {
				evt(style, transform);
				style.width = `${width}px`;
				style.height = `${height}px`;
			}}

			/* rotatable */
			rotatable={true}
			throttleRotate={0}
			startDragRotate={0}
			throttleDragRotate={0}
			rotationPosition={'top'}
			onRotate={({target: {style}, drag: {transform}})=> evt(style, transform)}

			originDraggable={true}
			onDragOrigin={({target: {style}, transformOrigin, drag: {transform}})=> {
				evt(style, transform);
				style.transformOrigin = transformOrigin;
			}}
		/>}

		{isDesignMode && <>
			<label css={styInp} ref={txa}>テキスト入力
				<textarea rows={3} value={inp} onChange={e=> setInp(e.target.value)} />
			</label>
			<Moveable target={txa} origin={false}
				/* draggable */
				draggable={true}
				throttleDrag={1}
				onDrag={({target: {style}, transform})=> evt(style, transform)}
				preventDefault={false}
			/>
		</>}
	</>;
}

// T_CH（表示単位。ルビ付きは親文字＋ルビで1要素）→ 禁則処理用の判定単位列。
//	本家は親文字・ルビが別々の1文字ずつDOM要素として並ぶが、bluesnovelは1要素にまとまっているので、
//	ここで「親文字1要素＋ルビ1要素」の2要素へ展開する（Hyphenation.ts冒頭コメント参照）。
//	idxはkc[j]が対応するaCh（＝spansRef.current）の添字。ルビはその親文字と同じ外側spanを指す
function mkKinCh(aCh: readonly T_CH[]): {kc: T_KIN_CH[]; idx: number[]} {
	const kc: T_KIN_CH[] = [];
	const idx: number[] = [];
	aCh.forEach((ch, i)=> {
		const afterBr = i > 0 && aCh[i -1]!.c === '\n';
		kc.push({ch: ch.c.at(0) ?? '', ...(afterBr ? {afterBr: true as const} : {})});
		idx.push(i);
		if (ch.r !== undefined) {
			kc.push({ch: ch.r.at(0) ?? '', rt: true});
			idx.push(i);
		}
	});
	return {kc, idx};
}

// 禁則処理（本家 TxtStage.ts:184-283 hyph() のDOM計測・`<br>`挿入ループ）。
//	表示単位spanの矩形で折り返しを検出する（inline-block化により表示単位は内部で
//	折り返さない原子的な箱になるため、本家のRange一文字ずつの計測は不要）。
//	1つ`<br>`を挿すたびに後続文字の位置が変わるので、違反が無くなるまで測り直しながら繰り返す
function applyKinsoku(el: HTMLSpanElement, cache: readonly HTMLSpanElement[], aCh: readonly T_CH[],
	kin: Kinsoku, bura: boolean, tategaki: boolean): void {
	const {kc, idx} = mkKinCh(aCh);
	if (kc.length < 2) return;

	let i = 2;
	for (let guard = 0; guard <= kc.length; ++guard) {
		const xy = kc.map((_, j)=> {
			const r = cache[idx[j]!]!.getBoundingClientRect();
			return tategaki ? r.top : r.left;
		});

		const found = kin.scan(kc, xy, bura, i);
		if (! found) break;

		el.insertBefore(document.createElement('br'), cache[idx[found.ins]!]!);
		i = found.resumeAt;
	}
}

// 表示単位1つ分のDOM。ルビ付きは<ruby>親文字<rt>ルビ</rt></ruby>（本家もHTMLのrubyで組む）。
//	半角空白はそのままだと連続分が詰まるのでノーブレークスペースにする（従来どおり）
function styRAlign(ch: string, rb: string, r_align: T_R_ALIGN): string {
	const len = ch.length * 2;
	if (len - rb.length < 0) return `text-align: ${r_align};`;

	if (CmnLib.isFirefox) switch (r_align) {
	case 'left':	return 'ruby-align: start;';
	case 'center':	return 'ruby-align: center;';
	case 'right':	return 'ruby-align: start;';	// 本家同様エレガントにサポートできていない
	case 'justify':	return 'ruby-align: space-between;';
	case '121':		return 'ruby-align: space-around;';
	case 'even':	return `ruby-align: space-between; padding-inline: ${
		String((len - rb.length) / (rb.length + 1))}em;`;
	case '1ruby':	return 'ruby-align: space-between; padding-inline: 1em;';
	default:		return `text-align: ${r_align};`;
	}

	const pd = (v: string)=> CmnLib.isSafari
		? `text-align: start; inline-size: ${String(len)}em; padding-inline: ${v};`
		: `text-align: justify; text-align-last: justify; padding-inline: ${v};`;
	switch (r_align) {
	case 'justify':	return pd('0');
	case '121':		return pd(`calc(${String((len - rb.length) / (rb.length * 2))}em)`);
	case 'even':	return pd(`calc(${String((len - rb.length) / (rb.length + 1))}em)`);
	case '1ruby':	return pd('1em');
	default:		return `text-align: ${r_align};`;
	}
}

// 表示単位1つ分のDOM。ルビ付きは<ruby>親文字<rt>ルビ</rt></ruby>（本家もHTMLのrubyで組む）。
//	半角空白はそのままだと連続分が詰まるのでノーブレークスペースにする（従来どおり）。
//	r_alignは[lay r_align=]の既定値（記法内指定chのraがあればそちらが勝つ。本家も同じ優先順位）
function elCh({c, r, ra, s, rs, tcy, lnk, src, gw, gh, gx, gy}: T_CH, r_align: T_R_ALIGN | undefined,
	onLink: T_ON_LINK, fncFfs: (c: string)=> string, onSe: (fn: string, buf: string)=> void): Node {
	const txt = (t: string)=> document.createTextNode(t === ' ' ? '\u00A0' : t);
	const ffs = fncFfs(c);
	if (r === undefined && ! s && ! tcy && ! lnk && ! ffs && ! src) return txt(c);

	// [span]/[ch]/[link]のstyleは本文側の要素へ。ルビが無くても入れ物が要るのでspanで包む
	const el = document.createElement(r === undefined ? 'span' : 'ruby');
	if (s) el.style.cssText = s;
	if (ffs) el.style.fontFeatureSettings = ffs;
	// 縦中横（本家 TxtLayer.ts:672 も同じCSS）。横書き中は効かないので見た目は変わらない
	const base = tcy ? document.createElement('span') : el;
	if (tcy) {
		base.style.textCombineUpright = 'all';
		el.appendChild(base);
	}
	base.appendChild(txt(c));
	// [graph]のインライン画像。**全角空白1つぶんの場所を占め、そこへ画像を敷く**
	//	（本家も`&emsp;`を置いてそこへ画像を重ねる）。文字を残すので平文とも食い違わない
	if (src) {
		elGraph(base, src, {...gw !== undefined ? {gw} : {}, ...gh !== undefined ? {gh} : {},
			...gx !== undefined ? {gx} : {}, ...gy !== undefined ? {gy} : {}});
		if (base !== el) el.appendChild(base);
	}

	let rt: HTMLElement | undefined;
	if (r !== undefined) {
		rt = document.createElement('rt');
		const align = ra ?? r_align;
		// 位置指定由来のCSSが先、r_styleが後（後勝ち。本家 #mkStyle_r_align() の引数順と同じ）
		rt.style.cssText = (align ? styRAlign(c, r, align) : '') + (rs ?? '');
		rt.textContent = r;
		el.appendChild(rt);
	}
	if (lnk) mkLink(el, lnk, s ?? '', rt, rs ?? '', onLink, onSe);
	return el;
}

// [graph]の画像1つ。スプライトシート（.json）なら**読み終わってから**中身を差し替える。
//	ここはReactの外（文字送り演出のためTxtLayerが直接DOMを組む）なので、
//	Suspenseではなくその場の書き換えで待つ。読めなければ何も置かない（本文は進む）
function elGraph(box: HTMLElement, src: string, o: Pick<T_CH, 'gw' | 'gh' | 'gx' | 'gy'>) {
	// 寸法・ずらし（本家 TxtStage.ts:685-688）。**書かれた時だけ**当てる：
	//	省略時は本文と同じ全角空白1つぶんの枠に収まる（本家の既定はフォントサイズなので同じ絵）。
	//	x/yは「本文の流れの中での位置からのずらし」（本家も待ちマーク用コンテナの中の相対座標）。
	//	ずらしにtranslateを使うのは、行の高さや隣の文字の位置を動かさないため
	if (o.gw !== undefined || o.gh !== undefined) {
		box.style.display = 'inline-block';
		box.style.verticalAlign = 'text-bottom';
		if (o.gw !== undefined) box.style.width = `${String(o.gw)}px`;
		if (o.gh !== undefined) box.style.height = `${String(o.gh)}px`;
	}
	if (o.gx !== undefined || o.gy !== undefined) {
		box.style.translate = `${String(o.gx ?? 0)}px ${String(o.gy ?? 0)}px`;
	}

	if (! src.endsWith('.json')) {
		box.style.backgroundImage = `url(${JSON.stringify(src)})`;
		box.style.backgroundRepeat = 'no-repeat';
		box.style.backgroundSize = 'contain';
		return;
	}

	void loadSheet(src).then(sh=> {if (sh) box.classList.add(aniSpriteClass(sh))});
}

// [link]区間の1単位をクリックできるようにする。
//	**Reactの外で作るDOM**（文字送り演出のためTxtLayerが直接組み立てている）なので、
//	BtnLayerのようなJSXではなくここでリスナを付ける。読み進めへ伝播させない点は同じ
function mkLink(el: HTMLElement, lnk: T_LNK, sty: string, rt: HTMLElement | undefined, rSty: string,
	onLink: T_ON_LINK, onSe: (fn: string, buf: string)=> void) {
	el.style.cursor = 'pointer';
	el.addEventListener('click', e=> {
		e.stopPropagation();	// クリックで本文も進む、の二重反応を防ぐ（BtnLayerと同じ）
		hintMng.hide();
		if (lnk.clickse) onSe(lnk.clickse, lnk.clicksebuf ?? 'SYS');
		onLink(lnk);
	});
	// ツールチップ（[link hint=…]）とstyle_hover。どちらも乗っている間だけ
	//	効果音（本家 EventMng.ts:465-491、[button]と同じ形。enabled=falseの間は
	//	CSSのpointer-events:noneでイベント自体が来ないので、ここでの判定は不要）
	el.addEventListener('mouseenter', ()=> {
		if (lnk.sh) el.style.cssText = sty + lnk.sh;
		if (rt && lnk.rsh) rt.style.cssText = rSty + lnk.rsh;
		if (lnk.hint) hintMng.show(el, lnk.hint, lnk.hs, lnk.ho);
		if (lnk.enterse) onSe(lnk.enterse, lnk.entersebuf ?? 'SYS');
	});
	el.addEventListener('mouseleave', ()=> {
		if (lnk.sh) {el.style.cssText = sty; el.style.cursor = 'pointer'}
		if (rt && lnk.rsh) rt.style.cssText = rSty;
		hintMng.hide();
		if (lnk.leavese) onSe(lnk.leavese, lnk.leavesebuf ?? 'SYS');
	});
	// 押し下げ中（style_clicked/r_style_clicked）。CSSの:activeが素直に使えない
	//	（本文DOMをReactの外で直接組むため、BtnLayerのようなemotionの&:activeが書けない）ので、
	//	mousedownで乗せ、mouseup／mouseleaveでホバー状態（乗っていればsh、居なければsty）へ戻す
	if (lnk.sc || lnk.rsc) {
		const restore = ()=> {
			if (lnk.sc) {el.style.cssText = lnk.sh ? sty + lnk.sh : sty; el.style.cursor = 'pointer'}
			if (rt && lnk.rsc) rt.style.cssText = lnk.rsh ? rSty + lnk.rsh : rSty;
		};
		el.addEventListener('mousedown', ()=> {
			if (lnk.sc) el.style.cssText = sty + lnk.sc;
			if (rt && lnk.rsc) rt.style.cssText = rSty + lnk.rsc;
		});
		el.addEventListener('mouseup', restore);
		el.addEventListener('mouseleave', restore);
	}
}

// [lay b_color=0xRRGGBB]を8bit成分へ。未指定時は試作の既定色（aquamarine相当）
function rgbOf(b_color?: number): {r: number; g: number; b: number} {
	if (b_color === undefined) return {r: 127, g: 255, b: 212};
	return {r: (b_color >> 16) & 0xFF, g: (b_color >> 8) & 0xFF, b: b_color & 0xFF};
}
