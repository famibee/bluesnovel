/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2024-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import {type T_LAY_IDX, type T_LAY_CMN, noticeDrag} from './Lay';
import {useStore} from '../store/store';
import {CH_DEF_NM, CH_IN_DEF, CH_OUT_DEF, chStyleAnim, chStyleAnimOut} from '../ts/ChStyle';
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
	// [button onenter=/onleave=]。マウスが乗った／外れた間だけ指定ラベルをサブルーチンコールする
	//	（本家 EventMng.ts:427-442。必ず[return]で戻ること）。飛び先ファイルはクリック先と共通
	//	（本家 o.fn = hArg.fn）。読み進めない専用経路を通すのは ScriptMng.hoverCall()
	onenter?	: string;
	onleave?	: string;
};
export type T_BTN = {
	nm		: string;
	text	: string;
	label	: string;
	call?	: boolean;	// [button call=true]指定時：クリックでjumpではなくcall（サブルーチンコール）する
	fn?		: string;	// [button fn=...]指定時：別スクリプトのラベルへ飛ぶ
	arg?	: string;	// [button arg=...]。クリック時に&sn.eventArgとして受け取れる
	url?	: string;	// [button url=...]指定時：ラベルへ飛ばず別タブでURLを開く（fn・labelより優先）
	sty?	: T_BTN_STY;
};
type T_TXTARG = T_LAY_CMN & {
	sty		: CSSProperties;	// [lay]のvisible/alpha/left/top/rotation/scale_*（Stage.tsx styLay()）
	nm		: string;
	isFore	: boolean;	// 表ページ側か。[l]/[p]の待ちマーカーは表にだけ出す（裏ページにも同名レイヤがあるため）
	str		: string;	// ルビを除いた平文（見た目の判定用。実際に描くのはaCh）
	aCh		: T_CH[];	// 表示単位の並び（ルビ記法を割った結果。Txt.ts splitCh）
	// 文字消去の世代（[clear_text]/[er]/[clear_lay]/[p]再開クリアで +1）。**本文が同じ内容で
	//	消去→再表示された場合の再アニメ用**：`chgStr('')` の中間状態は React がまとめて捨てるので
	//	aCh の差分だけでは「消えて出直した」を検知できない。詳細 src/docs/text-rendering.md
	clrGen?	: number | undefined;
	ffs?	: string | undefined;	// [lay ffs=…]。文字詰め（font-feature-settingsの値）
	noffs?	: string | undefined;	// [lay noffs=…]。ffsを効かせない文字の並び
	bura?	: boolean | undefined;	// [lay bura=…]。ぶら下げ禁則
	// [lay kinsoku_sol=/kinsoku_eol=/kinsoku_dns=/kinsoku_bura=]。禁則文字集合の指定
	kinsoku_sol?	: string | undefined;
	kinsoku_eol?	: string | undefined;
	kinsoku_dns?	: string | undefined;
	kinsoku_bura?	: string | undefined;
	r_align?: T_R_ALIGN | undefined;	// [lay r_align=…]。ルビ位置の既定（記法内指定があればそちらが勝つ）
	// [lay break_fixed=/break_fixed_left=/break_fixed_top=]。[l]/[p]待ちマーカーの置き方。
	//	true：break_fixed_left/top の固定位置（文字表示領域の左上が原点）。false（既定）：最後の文字の次
	break_fixed?	: boolean | undefined;
	break_fixed_left?: number | undefined;
	break_fixed_top?	: number | undefined;
	b_color?: number | undefined;	// [lay b_color=0xRRGGBB]。文字レイヤ背景色。未指定時は背景・枠を描かない（本家準拠）
	b_alpha	: number;	// [lay b_alpha=...]。文字レイヤ背景の不透明度（0.0～1.0）。背景のアルファとしてのみ反映し、文字自体は常に不透明
	b_alpha_isfixed?: boolean | undefined;	// [lay b_alpha_isfixed=true]。sys:TextLayer.Back.Alphaとの掛け算をせず、b_alphaをそのまま使う
	b_src?	: string | undefined;	// [lay b_pic=…]の解決済みURL。**あればb_colorより優先**（本家 TxtLayer.ts:393）
	styTxt?	: string | undefined;	// [lay style="..."]。文字レイヤへそのまま足すCSS（既定スタイルを上書きする）
	// [lay pl=/pr=/pt=/pb=]。文字表示領域の内側余白（px）。未指定は既定のCSS値（16px）のまま
	pl?		: number | undefined;
	pr?		: number | undefined;
	pt?		: number | undefined;
	pb?		: number | undefined;
	enabled	: boolean;	// [enable_event]。falseの間はこのレイヤのボタンと[link]がクリックを受けない
	aBtn	: T_BTN[];
	in_style?: string | undefined;	// [lay in_style=…]。[ch_in_style]で定義した文字出現演出名
	out_style?: string | undefined;	// [lay out_style=…]。[ch_out_style]で定義した文字消去演出名
	onActivate: (label: string, call: boolean, fn: string, arg?: string)=> void;
	onNavigate: (url: string)=> void;	// [link url=…]
	onSe: (fn: string, buf: string)=> void;	// [button clickse=/enterse=/leavese=]
	onHoverCall: (label: string, fn: string)=> void;	// [button/link onenter=/onleave=]（ScriptMng.hoverCall）
};
// [link]区間のクリック（本文DOMはReactの外で組み立てるので、コールバックを渡して繋ぐ）
export type T_ON_LINK = (lnk: T_LNK)=> void;
// ストア（zustand）に保存するデータだけの型（cmnはrender時のPropsのみなので不要）
export type T_TXTLAY_DATA = T_LAY_IDX & {cls: 'txt'; str: string; aCh: T_CH[]; clrGen?: number; ffs?: string; noffs?: string; bura?: boolean;
	kinsoku_sol?: string; kinsoku_eol?: string; kinsoku_dns?: string; kinsoku_bura?: string;
	r_align?: T_R_ALIGN; b_color?: number; b_alpha: number; b_alpha_isfixed?: boolean; b_pic?: string; b_src?: string; style?: string; enabled: boolean; aBtn: T_BTN[];
	break_fixed?: boolean; break_fixed_left?: number; break_fixed_top?: number;	// [lay break_fixed*=]。[l]/[p]待ちマーカーの固定位置
	pl?: number; pr?: number; pt?: number; pb?: number;
	// 文字出現・消去演出の名前（[lay in_style=/out_style=]）。定義そのものはストアの hChIn/hChOut
	in_style?: string; out_style?: string};
export type T_TXTLAY = T_TXTLAY_DATA & T_LAY_CMN;


export default function TxtLayer({cmn: {styChild, isDesignMode}, sty, nm, isFore, str, aCh, clrGen, ffs, noffs, bura,
	kinsoku_sol, kinsoku_eol, kinsoku_dns, kinsoku_bura,
	r_align, break_fixed, break_fixed_left, break_fixed_top, b_color, b_alpha, b_alpha_isfixed, b_src, styTxt: sCss, pl, pr, pt, pb, enabled, aBtn, in_style, out_style, onActivate, onNavigate, onSe, onHoverCall}: T_TXTARG) {
	// 読み戻り中（PageLogが最新ページを指していない間）は本文を[page style=…]の見た目にする
	const isReadBack = useStore(s=> s.isReadBack);
	const styPaging = useStore(s=> s.styPaging);	// [page style=…]（読み戻り中の本文の見た目）
	const isTyping = useStore(s=> s.isTyping);
	const setIsTyping = useStore(s=> s.setIsTyping);
	const skipReq = useStore(s=> s.skipReq);
	const skipping = useStore(s=> s.skipping);	// 既読スキップ中は文字送り演出を省いて瞬時表示する
	const wait = useStore(s=> s.wait);
	const hChIn = useStore(s=> s.hChIn);	// [ch_in_style]の定義表（画面ぜんぶで1つ）
	const hChOut = useStore(s=> s.hChOut);	// [ch_out_style]の定義表（消去演出）
	// 文字演出スタイルの解決順：[span/ch ch_*_style=]（ch 側）→ [lay in/out_style=] → 組み込み default
	//	（本家と同じ）。hChIn/hChOut には常に default が居る（ChStyle.CH_DEF_NM のコメント）が、
	//	保険で生定数 CH_*_DEF も最終フォールバックに置く
	const chStyIn = (chName?: string)=> hChIn[chName ?? in_style ?? CH_DEF_NM] ?? CH_IN_DEF;
	const chStyOut = (chName?: string)=> hChOut[chName ?? out_style ?? CH_DEF_NM] ?? CH_OUT_DEF;
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
		// [lay pl=/pr=/pt=/pb=]。指定された辺だけ既定のCSS padding（16px）を上書きする
		...(pl !== undefined ? {paddingLeft: `${String(pl)}px`} : {}),
		...(pr !== undefined ? {paddingRight: `${String(pr)}px`} : {}),
		...(pt !== undefined ? {paddingTop: `${String(pt)}px`} : {}),
		...(pb !== undefined ? {paddingBottom: `${String(pb)}px`} : {}),
	};

	// 1文字ずつの文字送り演出（Web Animations API、文字ごとにdelayをずらして順に再生）
	//	・aCh は「そのページの累積全文字」を表示単位へ割ったもの（ルビ付きは親文字＋ルビで1単位）。
	//	  前回からの差分（新規追加分）だけをspan化してアニメする
	//	・isReadBack中（読み戻りで前のページを演じ直している間）は文字送り演出をせず瞬時に確定表示
	//	・文字はboxRef直下のcharsRefに収め、待ちマーカー（下記）はReactが別途管理する兄弟スパンとして共存させる
	const boxRef = useRef<HTMLSpanElement>(null);
	const charsRef = useRef<HTMLSpanElement>(null);
	// masumeガイド枠（内側＝padding込みを除いた表示領域。外側の枠はCSSだけで足りるのでrefは
	//	これだけでよい）。CmnLib.masume===falseの間は下のuseLayoutEffectが早期returnし、
	//	JSX側もこのrefを持つ要素自体をレンダーしない（ref単体はnullを持つだけで実コスト無し）
	const masumeInnerRef = useRef<HTMLSpanElement>(null);
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
	const animsRef = useRef<Animation[]>([]);
	// バッチ世代。.cancel()されたAnimationの.finishedはrejectするが、Promise.allSettledで
	//	拾うと（未処理rejectionにはならないが）resolve自体はしてしまう。「古いバッチをキャンセルした
	//	直後の完了ハンドラ」が「新しいバッチが動き出した後」に呼ばれてisTypingを誤って下ろす競合を
	//	防ぐため、実行のたびに世代を進め、完了ハンドラは自分の世代がまだ最新かを確認する
	const genRef = useRef(0);
	// 直近に見た消去世代（clrGen）。本文 effect でこれと違えば「消えて出直した」と判断する
	const clrGenRef = useRef(clrGen);
	// 各spanの「出現時の累積ディレイ（ms）」。spansRef と並走。消去演出の join:true で
	//	本家 #clearText と同じ順送りにするために控える（本家はタイプ時に付けた inline
	//	animation-delay をそのまま消去アニメへ流用する。TxtLayer.ts:748）
	const delaysRef = useRef<number[]>([]);
	// 文字消去演出（[ch_out_style]）で「消えていく間だけ生かす」ゴーストspan。
	//	本家 TxtStage.#clearText() が旧コンテナを live DOM に残して animate するのと同じ
	//	（詳細 src/docs/text-rendering.md）。React 管理外の素の DOM ノード
	const ghostRef = useRef<{el: HTMLSpanElement; anims: Animation[]} | null>(null);
	const dropGhost = useCallback(()=> {
		const g = ghostRef.current;
		if (! g) return;
		ghostRef.current = null;
		for (const a of g.anims) a.cancel();
		g.el.remove();
	}, []);
	// charsRef の現在の中身（禁則<br>ごと）をゴーストspanへ move して消去アニメを流す。
	//	oldSpans/oldCh/oldDelays は move 前に控えたスナップショット（呼び出し側でリセットされる前の値）
	const startErase = useCallback((oldSpans: HTMLSpanElement[], oldCh: T_CH[], oldDelays: number[])=> {
		const box = boxRef.current, chars = charsRef.current;
		if (! box || ! chars || oldSpans.length === 0) return;

		dropGhost();	// 直前の消去が終わっていなければ畳む（pileup 回避。本家は積むがこちらは捨てる）

		const ghost = document.createElement('span');
		ghost.dataset.erase = '1';	// E2E の目印（charsRef・masume枠・待ちマーカーと見分ける）
		ghost.style.position = 'absolute';
		// 本文と同じ位置に重ねる（boxRef は position:absolute なので子の inset は padding-box 起点。
		//	masume 内枠の useLayoutEffect と同じく getComputedStyle で実測）
		const cs = globalThis.getComputedStyle(box);
		ghost.style.inset = `${cs.paddingTop} ${cs.paddingRight} ${cs.paddingBottom} ${cs.paddingLeft}`;
		ghost.style.pointerEvents = 'none';
		while (chars.firstChild) ghost.appendChild(chars.firstChild);
		box.appendChild(ghost);

		const anims: Animation[] = [];
		oldSpans.forEach((sp, i)=> {
			const chSty = chStyOut(oldCh[i]?.cos);
			if (chSty.wait <= 0) {sp.style.display = 'none'; return}	// 本家 #clearText:745 と同じ即時
			const {keyframes, options} = chStyleAnimOut(chSty);
			// join:false は待たずに一斉、join:true は出現時と同じ順送り（本家 #clearText:748）
			anims.push(sp.animate(keyframes, {...options, delay: chSty.join ? (oldDelays[i] ?? 0) : 0}));
		});
		if (anims.length === 0) {ghost.remove(); return}	// 全部 wait=0＝待つものが無い

		ghostRef.current = {el: ghost, anims};
		void Promise.allSettled(anims.map(a=> a.finished)).then(()=> {
			if (ghostRef.current?.el === ghost) dropGhost();
		});
	}, [hChOut, out_style, dropGhost]);
	// アンマウント時にゴーストを片づける
	useEffect(()=> dropGhost, [dropGhost]);

	// 文字詰め（本家 TxtLayer.ts:480 #fncFFSStyle）。**1文字ずつ当てる**必要があるのは
	//	noffsで「この文字だけ詰めない」と外せる仕様のため（全角空白は本家も常に除く）
	const reNoffs = useMemo(()=> new RegExp(`[　${noffs ?? ''}]`), [noffs]);	// 「詰めない文字」集合（全角空白＋noffs）。文字ごとの再コンパイルを避ける
	const fncFfs = useCallback((c: string)=> {
		if (! ffs) return '';
		return reNoffs.test(c) ? '' : ffs;
	}, [ffs, reNoffs]);

	// 禁則文字集合（[lay kinsoku_sol=/eol=/dns=/bura=]）。競合チェックはstore.tsxのchgLayが
	//	済ませている（マージ後のそのレイヤ全体の値が要るため、エンジン単体では判定できない）
	const kin = useMemo(()=> new Kinsoku({sol: kinsoku_sol, eol: kinsoku_eol, dns: kinsoku_dns, bura: kinsoku_bura}),
		[kinsoku_sol, kinsoku_eol, kinsoku_dns, kinsoku_bura]);
	// 縦書きか（本家 TxtStage.ts:263 も算出スタイルで見る）。禁則計算の直前に都度読み直す
	const isTategaki = ()=> !! boxRef.current && globalThis.getComputedStyle(boxRef.current).writingMode.startsWith('vertical');

	// masumeガイド枠の内側（padding込みを除いた表示領域＝本家 TxtStage.ts:336-341
	//	cntInsidePadding相当）。bluesnovelはpaddingをboxRef自身のCSS paddingで直接持つ
	//	（本家のような入れ子コンテナが無い）ので、算出paddingぶんだけ絶対配置のinsetを開けて描く。
	//	pl/pr/pt/pbが未指定（既定の16px）でも狂わないよう、propの生値でなくgetComputedStyle
	//	で実測する
	useLayoutEffect(()=> {
		if (! CmnLib.masume) return;	// offなら測定・DOM書き込みとも一切行わない
		const box = boxRef.current, inner = masumeInnerRef.current;
		if (! box || ! inner) return;
		const cs = globalThis.getComputedStyle(box);
		inner.style.inset = `${cs.paddingTop} ${cs.paddingRight} ${cs.paddingBottom} ${cs.paddingLeft}`;
	}, [pl, pr, pt, pb, sCss]);

	// [lay break_fixed=true] の待ちマーカー原点＝文字表示領域の左上（padding の内側）。
	//	絶対配置の子は padding-box 起点なので padding ぶん内側へ寄せる。**pl/pr/pt/pb 属性でも
	//	[lay style="padding-*"]（本家互換のCSS指定）でも同じ結果になるよう**、prop の生値でなく
	//	getComputedStyle で実測する（本家 TxtStage #lay_sub が parseFloat(s.paddingLeft) で
	//	padding を回収するのと同じ考え方。masume 内枠・消去ゴーストと同じ実測ポリシー）
	const [padIn, setPadIn] = useState({l: 16, t: 16});	// 既定は styTxt の padding: 16px
	useLayoutEffect(()=> {
		if (! break_fixed) return;	// 固定配置のときだけ要る値
		const box = boxRef.current;
		if (! box) return;
		const cs = globalThis.getComputedStyle(box);
		const l = parseFloat(cs.paddingLeft) || 0, t = parseFloat(cs.paddingTop) || 0;
		setPadIn(p=> p.l === l && p.t === t ? p : {l, t});
	}, [break_fixed, pl, pt, sCss]);

	useLayoutEffect(()=> {
		const el = charsRef.current;
		if (! el) return;

		++genRef.current;
		for (const a of animsRef.current) a.cancel();
		animsRef.current = [];

		// [clear_text]等で消去世代が進んだ＝「消えて出直した」。本文が前と同じ内容でも
		//	（`chgStr('')` の中間状態は React がまとめて捨てるので aCh 差分では検知できない）
		//	キャッシュを捨てて全文字を新規表示扱いにし、出現演出を撃ち直す。詳細 text-rendering.md
		const hardClear = clrGenRef.current !== clrGen;
		clrGenRef.current = clrGen;

		// 本当のページクリア（aChとキャッシュが互いに前方一致しない＝別内容）の場合のみ作り直す
		const cacheCh = chRef.current;
		const min = Math.min(cacheCh.length, aCh.length);
		let same = 0;
		if (! hardClear) while (same < min && cacheCh[same]!.c === aCh[same]!.c && cacheCh[same]!.r === aCh[same]!.r
			&& cacheCh[same]!.s === aCh[same]!.s && cacheCh[same]!.rs === aCh[same]!.rs) ++same;
		// 文字消去演出（[ch_out_style]）：本文が丸ごと／別内容に置き換わる＝消える文字がある。
		//	消えていく文字をゴーストspanへ移して animate してから、以下は素のクリアを続行
		//	（本家 TxtStage.#clearText()。読み戻し・既読スキップ中は演出せず捨てるだけ）
		if (spansRef.current.length > 0 && same < spansRef.current.length && ! isReadBack && ! skipping) {
			startErase(spansRef.current, chRef.current, delaysRef.current);
			spansRef.current = [];
			chRef.current = [];
			delaysRef.current = [];
			el.textContent = '';
		}
		if (same < min) {
			spansRef.current = [];
			chRef.current = [];
			delaysRef.current = [];
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
		// キル時の中途半端な状態の確定は不要：上でcancel()した時点で素のDOM既定値
		//	（opacity:1, transform:none）へ戻っており、それが演出の終端そのものと一致するため
		//	（ChStyle.ts chStyleAnim()のコメント参照）

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
			// masumeガイド枠（本家 TxtStage.ts:145-149 #fncMasumeの1文字ぶん相当）。
			//	**outlineを使う**：borderだと箱が太る分だけこの下のapplyKinsoku()（getBoundingClientRect
			//	で列幅を測る禁則処理）が実寸より広く見積もり、折返し位置が実際とズレてしまうため
			if (CmnLib.masume) {
				s.style.outline = '1px solid rgb(255, 51, 0)';
				s.style.backgroundColor = 'rgba(102, 204, 255, 0.5)';
			}
			s.appendChild(elCh(ch, r_align, onLink, fncFfs, onSe, onHoverCall));
			frag.appendChild(s);
			return s;
		});
		chRef.current = [...chRef.current, ...added];
		cache.push(...newSpans);
		el.appendChild(frag);

		// 各文字の出現ディレイ（ms）を spansRef と並走で控える（消去 join:true の順送り用。
		//	下の出現演出ループと同じ積み方＝本家 #cumDelay。読み戻し・スキップ経路でも
		//	spansRef と長さがずれないよう、演出ループより前・ガードより前で必ず積む）
		{
			let d = 0;
			for (const ch of added) {
				const cs = chStyIn(ch.cis);
				const w = ch.w ?? (autowc.enabled ? autowc.h[ch.c.at(0) ?? ''] ?? 0 : chWait);
				if (cs.join) d += w;	// 本家も使う前に足す
				delaysRef.current.push(cs.join ? d : 0);
			}
		}

		// 計測が祖先/自身のtransformで汚染されないうちに禁則を掛ける（Web Animations APIの
		//	Animationはまだ1つも作っていない＝この時点でnewSpansは全て素のDOM既定値のまま）
		applyKinsoku(el, cache, chRef.current, kin, bura ?? false, isTategaki());

		if (isReadBack || skipping) {
			// 読み戻り中／既読スキップ中：新規spanは最初から素の表示状態（＝演出の終端と同じ）
			//	なので、staggerを使わず瞬時に見せるのにAnimationを作る必要すら無い
			setIsTyping(false);
			return;
		}

		// 文字出現演出。**1文字ずつ別のAnimationを作る**（本家が文字ごとに`animation-delay`を
		//	書くのと同じ形）。1本のAnimationへstaggerを掛ける書き方では、
		//	・文字ごとに演出が違う（[span ch_in_style=…]）
		//	・文字ごとに待ちが違う（[autowc]、[ch wait=…]）
		//	のどちらも表せない。個々のAnimationのdelay（秒→ms）でその2つを表現する
		const gen = genRef.current;
		let pos = 0;	// 本家の #cumDelay（TxtLayer.ts:775）。ここまでに積んだ待ちの合計
		const anims: Animation[] = [];
		newSpans.forEach((el, i)=> {
			const ch = added[i]!;
			const chSty = chStyIn(ch.cis);
			// この文字ぶんの待ちも同じ順（本家 TxtLayer.ts:756 #o2domArg）。
			//	[autowc]の表に無い文字は0（本家も `?? 0`＝表に載せた文字だけが待つ）
			const w = ch.w ?? (autowc.enabled ? autowc.h[ch.c.at(0) ?? ''] ?? 0 : chWait);
			if (chSty.join) pos += w / 1000;	// 本家も使う前に足す

			// wait=0は瞬時：Animationを作らなくても素のDOM既定値がそのまま演出の終端と一致する
			if (chSty.wait <= 0) return;

			const {keyframes, options} = chStyleAnim(chSty);
			// join=falseの文字は待たずに動き出す（本家は animation-delay を 0ms に潰す）
			anims.push(el.animate(keyframes, {...options, delay: (chSty.join ? pos : 0) * 1000}));
		});
		if (anims.length === 0) {	// 全部が瞬時＝待つものが無い
			setIsTyping(false);
			return;
		}

		animsRef.current = anims;
		setIsTyping(true);
		void Promise.allSettled(anims.map(a=> a.finished)).then(()=> {
			// 自分より新しいバッチが動き出していたら、この完了通知は無視する（上のgenRefのコメント参照）
			if (genRef.current === gen) setIsTyping(false);
		});
	}, [aCh, clrGen, isReadBack, fncFfs, in_style, hChIn, chWait, autowc, bura, kin, r_align]);

	// タイプ演出中にMain.tsxのnext()からスキップ要求（requestSkip）が来たら、即終端まで進める
	//	（.finish()でPromise.allSettledが解決し、setIsTyping(false)も自動で呼ばれる）。
	//	消去演出のゴーストも同時に終端へ送る：本文表示を最終状態へスナップさせたいのは
	//	出現・消去どちらも同じ。[trans]のクリックキャンセル（ScriptMng #finishTrans が
	//	requestSkip を呼ぶ）で、クロスフェード中に消えかけの文字が残らないようにする
	useEffect(()=> {
		for (const a of animsRef.current) if (a.playState !== 'finished') a.finish();
		const g = ghostRef.current;
		if (g) for (const a of g.anims) if (a.playState !== 'finished') a.finish();
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

	// [l]/[p]/[waitclick]待ち中（breakline/breakpage素材、または見た目に出ないフォーカス専用のプロキシ）。
	//	[s]は対象外（wait自体がnullのまま＝完全停止でユーザー操作では進めない）。読み戻り中は非表示
	//	isTypingを含めてガード：タイプ演出開始時は表示せず、最後の文字のアニメが終了（isTypingがfalseに）した同時/以降に表示する
	//	表裏2ページとも常にマウントされており同名レイヤが両方に居るので、裏側には出さない
	const wantWaitEl = isFore && ! isReadBack && ! isTyping && wait !== null && wait.nm === nm;
	// マーカー画像を実際に描くのは[l]/[p]だけ（[waitclick]は本家どおりマーカーなし）
	const showWaitMark = wantWaitEl && wait!.kind !== 'waitclick';
	// 実際に見た目のマークを描くか。本家はbreakline/breakpage素材がプロジェクトに無ければ
	//	breakLine/breakPageを空実装のまま（本家 LayerMng.ts:159-168,318-319）にする＝何も描かない。
	//	素材未指定時に絵文字で代替していた旧表示は本家の見た目と食い違うため廃止（2026-08-23）
	const hasVisibleMark = showWaitMark && (!! waitSheet || (!! waitSrc && ! isWaitSheet));
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
			margin-inline-start なら横書きでは左、縦書きでは上——どちらでも「直前の文字の次」になる。
			**[lay break_fixed=true]（固定位置）のときは足さない**——絶対配置で座標を直に置くので
			流れの中のアキは不要（本家も #cntBreak を position.set で置くだけ。Hyphenation.ts:223-225） */
		${break_fixed ? '' : 'margin-inline-start: 0.15em;'}
		/* **縦書きでは書字方向に合わせてマークも回す**（-90°）。背景画像も<img>も
			writing-modeでは回らないので、横書き用に描かれた▼（次の行の方向を指す絵）が
			縦書きでもそのまま下を向いてしまう。本家は待ちマークを本文とは別のpixiコンテナへ
			固定位置で置くのでこの問題が出ないが、こちらは本文の流れの中（ぶら下げ位置）に
			置いているため、向きが本文と食い違うと目立つ。
			**一度「writing-modeの継承だけで自動的に回って見える」と誤認してrotateを外したことが
			あるが、実機検証で回転していないことを確認済み（inline-blockの中身は横書きのまま描画
			される。orthogonal flowが効くのは子要素自身がwriting-modeを持つ場合で、この要素は
			継承しているだけなので該当しない）。2026-08-26 復元 */
		${isTate ? 'rotate: -90deg;' : ''}
		/* [waitclick]用プロキシ、および[l]/[p]でbreakline/breakpage未指定のときは中身が空
			（マーカーなし、本家準拠）。中身が無いinline-blockは0x0になりFocusMng.#canFocus()の
			getClientRects()判定に落ちてフォーカスできなくなるため、widthやheightが明示されて
			いない時だけ最小の当たり判定を確保する（見た目には出さない） */
		${! hasVisibleMark && wait?.width === undefined && wait?.height === undefined
			? 'min-inline-size: 1em; min-block-size: 1em;' : ''}
		/* マウスクリックのネイティブなtabIndexフォーカスではブラウザ既定の矩形を出さない
			（todo.md「格好悪い」対応）。ゲームパッド／矢印キーでの移動は分かりやすさのため出したい
			ので、キー操作由来のときだけ立つdata-focus-ring（FocusMng.ts）がある時に限り出す */
		outline: none;
		&[data-focus-ring]:focus {
			outline: 2px solid Highlight;
			outline-offset: 2px;
		}
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
	// [lay break_fixed=true]：流れの中でなく break_fixed_left/top の固定位置に置く（本家 Hyphenation.ts:
	//	87-89 ＋ TxtStage.ts:507-509 #cntBreak.position.set()）。座標の原点は**文字表示領域の左上**
	//	（padding の内側）。boxRef は position:absolute（styChild）なので子の absolute は padding-box 起点
	//	＝padding ぶん足して content-box 起点に合わせる。その padding は上の useLayoutEffect が
	//	getComputedStyle で実測した padIn（pl/pr/pt/pb 属性でも style="padding-*" でも同じ値になる）
	const styWaitPos: CSSProperties = {
		...wait?.width !== undefined ? {width: `${String(wait.width)}px`} : {},
		...wait?.height !== undefined ? {height: `${String(wait.height)}px`} : {},
		...break_fixed ? {
			position: 'absolute',
			left: `${String(padIn.l + (break_fixed_left ?? 0))}px`,
			top: `${String(padIn.t + (break_fixed_top ?? 0))}px`,
		} : {},
		...wait?.x !== undefined || wait?.y !== undefined
			? {translate: `${String(wait?.x ?? 0)}px ${String(wait?.y ?? 0)}px`} : {},
	};
	// [button]タグでこの文字レイヤ（UIコンテナ）に乗せたボタン群のボックス。
	//	独立レイヤにしないことで、この文字レイヤごと表示/非表示を一括に切り替えられる。
	//	[enable_event enabled=false]の間はクリックを受けない（本家 TxtLayer.enabled 相当）
	//	isolation: isolate は本文箱（styTxt）と同じ理由：BtnLayer.tsx の各ボタンが
	//	`position: relative; z-index: 2`を持つため、これが無いとその2がStageレベルの
	//	スタッキングコンテキストまで漏れ、[lay float=/index=/dive=]で他レイヤをどれだけ
	//	前面へ動かしてもボタンだけは常に最前面に居座ってしまう（DOM順で並べたはずが
	//	z-indexありの要素だけが順序を無視するため）。閉じ込めることで、ボタンを持つ層自体は
	//	他のGrpLayer/TxtLayerと同じくDOM順（＝float等の並び替え）で前後関係が決まるようにする
	const styBtnBox = css`
		display: flex;
		flex-wrap: wrap;
		top: 70%;
		isolation: isolate;
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
		isolation: isolate;
		${enabled ? '' : 'pointer-events: none;'}
	`;
	// 背景色は[lay b_color=0xRRGGBB]。未指定時は本家準拠で背景・枠を描かない（後述noBox）
	const {r, g, b} = rgbOf(b_color);
	// 背景の不透明度は b_alpha × sys:TextLayer.Back.Alpha（本家 TxtLayer.ts:388）。
	//	b_alpha_isfixed=true のレイヤだけは掛けずにb_alphaそのもの（クリック待ち画面など、
	//	設定の「バック不透明度」に影響されたくない層のための指定）
	const backAlpha = useStore(s=> s.backAlpha);
	const bAlpha = b_alpha * (b_alpha_isfixed ? 1 : backAlpha);
	// **[lay b_color=…]が無い層には箱（背景＋枠）を描かない**（本家準拠。文字の有無は問わない）。
	//	以前は文字が無い層だけを対象にaquamarine背景＋点線枠を*目印*として出していたが
	//	（本来見えない文字層の位置・大きさをテンプレ作者へ伝える暫定的な可視化）、通常の文字レイヤにも
	//	本家に無い色が付いて見た目が食い違うため廃止（2026-08-23）。位置・大きさの可視化は
	//	デザインモード側（todo.md）の課題として分離する。
	//	ただし[lay b_color=…]で色を明示した層は「意図して置いた板」なので描く。
	//	**背景が完全に透明なら箱も描かない**：枠はCSSのborderでb_alphaが効かないため、
	//	これが無いと「透明な板」に点線だけが残る。テンプレの[txt_lay_fullscreen b_alpha=0]が
	//	まさにその形（b_colorは書くが透過度0）で、全画面の文字レイヤが点線矩形として見えていた
	const noBox = bAlpha === 0 || b_color === undefined;
	const styTxt = css`
		/* z-index:-1の::before（下記b_src分岐）を確実にこの要素の子として背面に留めるための
			スタッキングコンテキスト。以前はStage.tsxのsty4Moveableが全レイヤへ恒等transformを
			常時書いており、それが偶然スタッキングコンテキストを作っていたため気付かれていなかった。
			sty4Moveableをデザインモード時のみに限定した際にこれが失われ、b_picの背景画像が
			立ち絵レイヤの背後（コンテキストの外）へ回り込んで見えなくなる回帰を引き起こした。
			transformの副作用に頼らず、目的（背面固定）に合ったisolation: isolateで明示的に持たせる */
		isolation: isolate;
		/* **明示が要る**：sn_galleryなどBootstrapを読み込むホストは全称セレクタで
			box-sizing: border-box をグローバルに敷いており、何も書かなければこちらが
			それをそのまま継承してしまう（E2Eの自前テストアプリにはBootstrapが無いため
			気付かれなかった）。[lay width=/height=]は常に「中身の寸法」という設計
			（test/e2e/argdef.e2e.ts「pl/pr/pt/pbは文字表示領域の内側余白」参照）なので、
			border-boxのままだと明示指定時にpx値の意味が変わってしまう（2026-08-25発覚） */
		box-sizing: content-box;
		/* 本家 TxtLayer.ts:271-272（const padding = 16;）に合わせ4辺均一の16px。
			以前は1em 1.5em（上下24px・左右36px、非対称）だったが、本家と数値が食い違っており、
			masumeガイド枠（CmnLib.masume）の見え方が本家（緑と青がほぼ重なり太い青一色に
			見える）とbluesnovel（緑と青の間に明確な余白がある）で違って見える一因になっていた
			（2026-08-25、実機比較で発覚） */
		padding: 16px;
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

		/* [add_lay class=txt]直後、[lay style=…]を一度も受けていない状態の既定フォントサイズ。
			本家 TxtLayer.ts:272 のコンストラクタ既定（24px）に合わせる。xxx-large（≒48px）のままだと
			下のwidthとの組み合わせで本文が箱から大きくはみ出す（sn_galleryのtopプロジェクトで発覚） */
		font-size: 24px;
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
		/* width/heightの既定は本家 TxtLayer.ts:272 のコンストラクタ既定に合わせステージいっぱい。
			widthは以前意図的に70%へ違えていたが、ch_button/sound/importでリンクがクリック不能になる
			実害や縦書き（line_breaking_rules）で本文がステージ左寄りに見える不具合の原因だったため、
			本家準拠へ戻した（2026-08-25）。heightは元々CSS既定のauto（＝内容量ぶんだけの高さ）の
			ままで、widthだけ直した直後の実機比較でmasumeガイド枠がステージ下端に届かない食い違いが
			見つかったため同時に揃えた。
			**widthプロパティ自体は指定せず、right: 0（下のheightも同様にbottom: 0）で表す**：
			bluesnovelのwidth/heightは常に「中身（文字表示領域）の寸法」で、paddingはその外側に
			足す設計（test/e2e/argdef.e2e.ts「pl/pr/pt/pbは文字表示領域の内側余白」参照）。
			width: calc(100% - 3em)のようにpaddingを差し引く固定値でも一度試したが、
			[lay style="padding-bottom: …px;"]でpaddingを個別変更するプロジェクト
			（sn_galleryのline_breaking_rules）でズレて逆にステージをはみ出した。
			right: 0ならtop/left:0と合わせて要素の外形が常にcontaining block（ステージ）
			いっぱいになり、paddingがどんな値でもbox-sizingに関わらず内側に自動で確保される
			（box-sizing: border-boxでpadding込み外形をステージに合わせる案も試したが、
			[lay width=/height=]やb_picの自然サイズ調整の「常に中身の寸法」という意味が
			壊れるため撤回した）。
			[lay width=/height=]明示時はLay.tsのstyLay()がインラインでpx指定するので、
			left+width+rightが揃うCSSの規則でrightは自動的に無視される（衝突しない） */
		right: 0;
		bottom: 0;
		white-space: pre-wrap;
		/* 文字色の既定は白（本家 TxtLayer.ts:272 のコンストラクタ既定styleがcolor: white）。
			inheritのままだと親の色（未指定なら黒）を継承してしまい、暗い背景画像に文字が
			埋もれて読めなくなる */
		color: white;
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
			{/* masumeガイド枠（本家 TxtStage.ts:329-341相当）。外側＝レイヤ全体（padding込み。
				絶対配置のinset:0はboxRef自身のpadding-boxまでなので、これでちょうど全体を覆う）、
				内側＝paddingを除いた実表示領域（上のuseLayoutEffectがinsetを実測して書く）。
				CmnLib.masume===falseならこのブロック自体を描画しない＝要素もエフェクトの仕事も増えない */}
			{CmnLib.masume && <>
				<span style={{position: 'absolute', inset: 0, boxSizing: 'border-box',
					background: 'rgba(51, 255, 0, 0.2)', border: '1px solid rgb(51, 255, 0)', pointerEvents: 'none'}}/>
				<span ref={masumeInnerRef} style={{position: 'absolute', boxSizing: 'border-box',
					background: 'rgba(0, 51, 255, 0.2)', border: '2px solid rgb(0, 51, 255)', pointerEvents: 'none'}}/>
			</>}
			{wantWaitEl && <span ref={waitRef} css={styWaitMark} style={styWaitPos}
				{...canFocusWait ? {tabIndex: 0, onKeyDown: onWaitKeyDown, 'data-wait-focus': true} : {}}>{
				! showWaitMark ? null
				// プロジェクトに`breakline`/`breakpage`があればそれを描画。無ければ本家準拠で
				// 何も出さない（本家 LayerMng.ts breakLine/breakPageはexistsBreakline/
				// existsBreakpageが無ければ空実装のまま＝呼ばれても何も描かれない）
				: waitSheet ? <span className={aniSpriteClass(waitSheet)}/>
				: waitSrc && ! isWaitSheet ? <img src={waitSrc} style={{verticalAlign: 'text-bottom',
					...wait!.width !== undefined || wait!.height !== undefined
						? {width: '100%', height: '100%'} : {}}}/>
				: null
			}</span>}
		</span>
		{aBtnFlow.length > 0 && <span css={[styChild, styBtnBox]} data-lay={nm} style={styBtnCmn}>
			{aBtnFlow.map(b=> <BtnLayer key={b.nm} text={b.text} label={b.label} call={b.call ?? false} fn={b.fn ?? ''} arg={b.arg} url={b.url} sty={b.sty} enabled={enabled} onActivate={onActivate} onNavigate={onNavigate} onSe={onSe} onHoverCall={onHoverCall}/>)}
		</span>}
		{aBtnPos.length > 0 && <span css={[styChild, styBtnPosBox]} data-lay={nm} style={styBtnCmn}>
			{aBtnPos.map(b=> <BtnLayer key={b.nm} text={b.text} label={b.label} call={b.call ?? false} fn={b.fn ?? ''} arg={b.arg} url={b.url} sty={b.sty} enabled={enabled} onActivate={onActivate} onNavigate={onNavigate} onSe={onSe} onHoverCall={onHoverCall}/>)}
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
//	ここで「親文字N要素＋ルビ1要素」（Nは親文字の文字数。通常1、複数文字ルビの親文字のみN）へ
//	展開する（Hyphenation.ts冒頭コメント参照）。親文字を1文字に丸めると、複数文字ルビ
//	（例：安全｜剃刀《かみそり》）の2文字目以降が禁則判定から丸ごと抜け落ち、本家と折返し位置が
//	ズレる不具合になっていた（2026-08-17調査）
//	idxは通常kc[j]が対応するaCh（＝spansRef.current）の添字。ルビはその親文字と同じ外側spanを
//	指す。末尾の番兵要素（下記）だけは-1＝cacheでなくapplyKinsoku側が渡すsentinel要素そのものを
//	測れという印を兼ねる。subは複数文字ルビの親文字内での文字位置（0開始）。単一文字（親文字・
//	ルビとも常にこちら）と番兵は-1＝外側spanそのものを測ればよい印
function mkKinCh(aCh: readonly T_CH[]): {kc: T_KIN_CH[]; idx: number[]; sub: number[]} {
	const kc: T_KIN_CH[] = [];
	const idx: number[] = [];
	const sub: number[] = [];
	aCh.forEach((ch, i)=> {
		const afterBr = i > 0 && aCh[i -1]!.c === '\n';
		const chars = Array.from(ch.c);
		chars.forEach((c1, ci)=> {
			kc.push({ch: c1, ...(afterBr && ci === 0 ? {afterBr: true as const} : {})});
			idx.push(i);
			sub.push(chars.length > 1 ? ci : -1);
		});
		if (ch.r !== undefined) {
			kc.push({ch: ch.r.at(0) ?? '', rt: true});
			idx.push(i);
			sub.push(-1);
		}
	});
	// 末尾の番兵（本家 TxtStage.ts:313 #SPAN_LAST の移植）。表示中の最後の1文字は「次に何か
	//	置いたら列からはみ出すか」を測る後続要素がまだ無く、はみ出す側の判定（scan()の
	//	sl_xy <= x）に一度もかからないままになる。そのため複数文字ルビ等で禁則の巻き戻しが
	//	要らなかった列（本ケースの安全｜剃刀《かみそり》を含む列）で、本来ならまだ入るはずの
	//	無い最後の1〜2文字が押し出されず、本家より詰め込みすぎる不具合になっていた
	//	（2026-08-18 ss_000.sn:24 縦書き改行位置ズレ調査で特定）。
	//	本家は&emsp;の実DOM要素を毎回末尾へ足して測るので、こちらも同じ役を持つ要素を
	//	applyKinsoku側で用意し、ここではそれを指す番兵エントリだけ足す（idx=-1で識別）
	if (kc.length > 0) {
		kc.push({ch: ' '});
		idx.push(-1);
		sub.push(-1);
	}
	return {kc, idx, sub};
}

// 禁則処理（本家 TxtStage.ts:184-283 hyph() のDOM計測・`<br>`挿入ループ）。
//	表示単位spanの矩形で折り返しを検出する（inline-block化により表示単位は内部で
//	折り返さない原子的な箱になるため、本家のRange一文字ずつの計測は不要。ただし複数文字ルビの
//	親文字だけはelCh()が内部に1文字ずつのspanを作るので、そちらを測る＝subで判別）。
//	1つ`<br>`を挿すたびに後続文字の位置が変わるので、違反が無くなるまで測り直しながら繰り返す
function applyKinsoku(el: HTMLSpanElement, cache: readonly HTMLSpanElement[], aCh: readonly T_CH[],
	kin: Kinsoku, bura: boolean, tategaki: boolean): void {
	const {kc, idx, sub} = mkKinCh(aCh);
	if (kc.length < 2) return;

	// mkKinCh()の末尾番兵（idx=-1）を測るための使い捨てDOM要素。本家 #SPAN_LAST と同じ役割
	//	（最後の1文字にも「次に置いたらはみ出すか」の判定材料を与える）。測定後は必ず取り除き、
	//	文字出現演出やcache/childNodes数の前提（呼び出し元）には一切関与させない
	const sentinel = document.createElement('span');
	sentinel.style.display = 'inline-block';
	sentinel.textContent = ' ';
	el.appendChild(sentinel);

	try {
		let i = 2;
		for (let guard = 0; guard <= kc.length; ++guard) {
			const xy = kc.map((_, j)=> {
				const ix = idx[j]!;
				const outer = ix < 0 ? sentinel : cache[ix]!;
				const si = sub[j]!;
				const target = si < 0 ? outer : (outer.firstElementChild?.children[si] as HTMLElement | undefined) ?? outer;
				const r = target.getBoundingClientRect();
				return tategaki ? r.top : r.left;
			});

			const found = kin.scan(kc, xy, bura, i);
			if (! found) break;

			el.insertBefore(document.createElement('br'), cache[idx[found.ins]!]!);
			i = found.resumeAt;
		}
	} finally {
		sentinel.remove();
	}

	// ルビの<rt>はline box計算の外側に固定量ではみ出し、詰めて表示すると1つ前の列と
	//	重なりうる（CSSの<ruby>任せの制約。本家TxtStage.tsも同じHTML/<ruby>で組むが対応なし）。
	//	margin-block-startではみ出し分を占有領域に含め、隣の列を侵食しないようにする
	//	（block-startは横書きで上端・縦書きvertical-rlで右端になり、どちらの書字方向でも
	//	「1つ前の列」側を指す）。**列の先頭（＝直前に<br>がある表示単位）にだけ**付けること。
	//	先頭でない表示単位に付けると、その文字自身の右側に無意味な余白ができて列全体が
	//	前の列側へ押し出され、`<br>`を跨いだだけの見た目の大穴になる（2026-08-18発覚。
	//	どの表示単位がどの列の先頭になるかは禁則計算の結果次第で呼び出しのたびに変わるため、
	//	新規追加時点で先付けすると古い判定のまま残る／新しく先頭になった側に付け忘れる、
	//	の両方が起きていた）。禁則処理（上のtry節）はtop（縦書きの列内位置）だけを見ており
	//	marginの影響を受けないので、折返し結果が確定した後にここでまとめて設定し直せる
	cache.forEach(outer=> outer.style.marginBlockStart = '');
	el.querySelectorAll(':scope > br').forEach(br=> {
		const outer = br.nextElementSibling as HTMLElement | null;
		const rt = outer?.querySelector('rt');
		if (! rt) return;
		// offsetHeightは要素自身にも祖先にもtransformの影響を受けないレイアウト値。
		//	getBoundingClientRect().heightだと祖先のtransform: scale(cvsScale)（Stage.tsx）を
		//	含んだ値になり、cvsScale!==1（ウインドウ実寸依存の非整数）のときmarginがcvsScale倍
		//	ズレる実バグだった（リサイズ時に再計算もされないため一度ズレると直らない）
		outer!.style.marginBlockStart = `${String(rt.offsetHeight)}px`;
	});
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
	onLink: T_ON_LINK, fncFfs: (c: string)=> string, onSe: (fn: string, buf: string)=> void,
	onHoverCall: (label: string, fn: string)=> void): Node {
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
	// ルビの親文字が複数文字にまたがる場合（例：安全｜剃刀《かみそり》）、禁則処理
	//	（Hyphenation側）が文字ごとに位置を測れるよう、1文字ずつ個別spanへ分ける
	//	（本家 TxtLayer.ts:742-746 #tagCh_sub()と同じ発想。表示・文字送り演出は
	//	表示単位＝elCh呼び出し元のouter span単位のまま変えない＝ここは禁則計測専用の追加構造）
	const chars = Array.from(c);
	if (r !== undefined && ! tcy && ! src && chars.length > 1) {
		for (const c1 of chars) {
			const sp = document.createElement('span');
			sp.appendChild(txt(c1));
			base.appendChild(sp);
		}
	}
	else base.appendChild(txt(c));
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
	if (lnk) mkLink(el, lnk, s ?? '', rt, rs ?? '', onLink, onSe, onHoverCall);
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

	void loadSheet(src).then(sh=> {
		if (! sh) return;
		// gw/gh省略時、シート用CSSクラスはbox実寸(boxW×boxH)をpx固定で持つため、
		//	つけただけだと文字サイズをはみ出す（本家はDOM実測でsp.width/heightへ強制する
		//	＝TxtStage.ts:560）。background-positionがkeyframesにpx直書きのため
		//	background-sizeでは縮小できず、実寸のまま描くinner要素をtransform:scaleで
		//	縮小し、box側はoverflow:hiddenで縮小後のぶんだけ場所を取る（占有スペースに
		//	transformを混ぜるとscaleが二重に掛かってしまうため、占有と描画を要素で分離）。
		//	box自身がまだフラグメント内で未接続なことがある呼び出し元と違い、
		//	loadSheet()はfetchを挟むので、このthen内では既にDOM接続済み
		if (o.gw === undefined && o.gh === undefined) {
			const {width: natW, height: natH} = box.getBoundingClientRect();
			if (natW > 0 && natH > 0) {
				box.style.display = 'inline-block';
				box.style.position = 'relative';
				box.style.overflow = 'hidden';
				box.style.width = `${String(natW)}px`;
				box.style.height = `${String(natH)}px`;
				box.style.verticalAlign = 'text-bottom';
				// 絶対配置で通常のインラインフローから外す（そうしないとinner本来の実寸
				//	(boxW×boxH)がインラインフローの占有幅として扱われ、box幅を超えた分が
				//	上下左右どちらへクリップされるか不定になる）
				const inner = document.createElement('span');
				inner.classList.add(aniSpriteClass(sh));
				inner.style.position = 'absolute';
				inner.style.left = '0';
				inner.style.top = '0';
				inner.style.transformOrigin = 'top left';
				inner.style.transform = `scale(${String(natW / sh.boxW)}, ${String(natH / sh.boxH)})`;
				box.appendChild(inner);
			}
			else box.classList.add(aniSpriteClass(sh));
		}
		else box.classList.add(aniSpriteClass(sh));
	});
}

// [link]区間全体を1つの当たり判定・1つの見た目として扱うためのグルーピング。
//	禁則処理のため文字ごとに個別のspanへ分けている（elCh呼び出し元）ので、素朴に
//	文字単位でmouseenter/mouseleaveを掛けると本家と違い1文字ずつ独立にホバー・
//	押下してしまう（本家はTextクラス1個＝[link]区間全体が1つの当たり判定）。
//	同じlnk参照（[link]〜[endlink]の間は同一オブジェクト。Txt.ts splitCh()参照）を
//	共有する文字をここへ集約し、状態は区間全体へ同期して効かせる（sn_galleryで
//	「1文字ずつ色が変わる」と指摘され発覚。2026-08-25）。
//	文字は文字送り演出で後から1文字ずつ追加されるため、membersは「今後も増える」
//	前提で都度pushし、クロージャは配列参照を持つことで後から増えた分にも自動対応する
type T_LNK_MEMBER = {el: HTMLElement; sty: string; rt?: HTMLElement; rSty: string};
type T_LNK_GROUP = {members: T_LNK_MEMBER[]; hoverCnt: number};
const hLnkGroup = new WeakMap<T_LNK, T_LNK_GROUP>();

// [link]区間の1文字ぶんをクリックできるようにする。
//	**Reactの外で作るDOM**（文字送り演出のためTxtLayerが直接組み立てている）なので、
//	BtnLayerのようなJSXではなくここでリスナを付ける。読み進めへ伝播させない点は同じ
function mkLink(el: HTMLElement, lnk: T_LNK, sty: string, rt: HTMLElement | undefined, rSty: string,
	onLink: T_ON_LINK, onSe: (fn: string, buf: string)=> void,
	onHoverCall: (label: string, fn: string)=> void) {
	el.style.cursor = 'pointer';
	el.addEventListener('click', e=> {
		e.stopPropagation();	// クリックで本文も進む、の二重反応を防ぐ（BtnLayerと同じ）
		hintMng.hide();
		if (lnk.clickse) onSe(lnk.clickse, lnk.clicksebuf ?? 'SYS');
		onLink(lnk);
	});

	let group = hLnkGroup.get(lnk);
	if (! group) {group = {members: [], hoverCnt: 0}; hLnkGroup.set(lnk, group)}
	const g = group;
	g.members.push({el, sty, rSty, ...(rt !== undefined ? {rt} : {})});

	// ツールチップ（[link hint=…]）とstyle_hover。どちらも「区間のどこかに」乗っている間だけ
	//	効果音（本家 EventMng.ts:465-491、[button]と同じ形。enabled=falseの間は
	//	CSSのpointer-events:noneでイベント自体が来ないので、ここでの判定は不要）
	el.addEventListener('mouseenter', ()=> {
		g.hoverCnt++;
		if (g.hoverCnt > 1) return;	// 既に区間内の隣接文字がホバー中：跨いだだけなので何もしない
		for (const m of g.members) {
			if (lnk.sh) m.el.style.cssText = m.sty + lnk.sh;
			if (m.rt && lnk.rsh) m.rt.style.cssText = m.rSty + lnk.rsh;
		}
		if (lnk.hint) hintMng.show(el, lnk.hint, lnk.hs, lnk.ho);
		if (lnk.enterse) onSe(lnk.enterse, lnk.entersebuf ?? 'SYS');
		// [link onenter=…]（本家 EventMng.ts:427-434）。区間へ入った瞬間（hoverCnt 0→1）だけ撃つ。
		//	enabled=falseの間はCSSのpointer-events:noneでそもそもイベントが来ない
		if (lnk.onenter) onHoverCall(lnk.onenter, lnk.fn);
	});
	el.addEventListener('mouseleave', ()=> {
		g.hoverCnt--;
		// 区間内の隣接文字へ跨いだだけなら、そちらのmouseenterが同じタスク内で
		//	先に走ってhoverCntを戻しているはず。マイクロタスクへ回して確定させる
		//	（本当に区間の外へ出た時だけhoverCntが0のまま残る）
		queueMicrotask(()=> {
			if (g.hoverCnt > 0) return;
			for (const m of g.members) {
				if (lnk.sh) {m.el.style.cssText = m.sty; m.el.style.cursor = 'pointer'}
				if (m.rt && lnk.rsh) m.rt.style.cssText = m.rSty;
			}
			hintMng.hide();
			if (lnk.leavese) onSe(lnk.leavese, lnk.leavesebuf ?? 'SYS');
			// [link onleave=…]（本家 EventMng.ts:435-441）。区間の外へ本当に出た時だけ
			if (lnk.onleave) onHoverCall(lnk.onleave, lnk.fn);
		});
	});
	// 押し下げ中（style_clicked/r_style_clicked）。CSSの:activeが素直に使えない
	//	（本文DOMをReactの外で直接組むため、BtnLayerのようなemotionの&:activeが書けない）ので、
	//	mousedownで区間全体へ乗せ、mouseup／mouseleaveで戻す。**style_clickedは省略時
	//	`args.style`がデフォルトで入る**（ScriptEngine.ts:1743 `args.style_clicked ??= args.style`）
	//	ため、style_hoverだけ指定したリンクでも`lnk.sc`は常にtruthyになる。戻す先は
	//	`g.hoverCnt`（実際のホバー状態）で判定する——「lnk.shの有無だけでホバー色へ」戻す
	//	実装だと、実際のホバー状態を見ずに常にホバー色を再適用してしまい、外れても
	//	色が戻らないバグになる（sn_gallery ch_button で発覚）
	if (lnk.sc || lnk.rsc) {
		el.addEventListener('mousedown', ()=> {
			for (const m of g.members) {
				if (lnk.sc) m.el.style.cssText = m.sty + lnk.sc;
				if (m.rt && lnk.rsc) m.rt.style.cssText = m.rSty + lnk.rsc;
			}
		});
		const release = ()=> {
			for (const m of g.members) {
				if (lnk.sc) {
					m.el.style.cssText = g.hoverCnt > 0 && lnk.sh ? m.sty + lnk.sh : m.sty;
					m.el.style.cursor = 'pointer';
				}
				if (m.rt && lnk.rsc) m.rt.style.cssText = g.hoverCnt > 0 && lnk.rsh ? m.rSty + lnk.rsh : m.rSty;
			}
		};
		el.addEventListener('mouseup', release);
		el.addEventListener('mouseleave', ()=> queueMicrotask(release));
	}
}

// [lay b_color=0xRRGGBB]を8bit成分へ。未指定時（noBox=trueで背景自体を描かないため実際には
//	使われない）のフォールバック
function rgbOf(b_color?: number): {r: number; g: number; b: number} {
	if (b_color === undefined) return {r: 127, g: 255, b: 212};
	return {r: (b_color >> 16) & 0xFF, g: (b_color >> 8) & 0xFF, b: b_color & 0xFF};
}
