/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2024-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import {type T_LAY_IDX, type T_LAY_CMN, noticeDrag} from './Lay';
import {useStore} from '../store/store';
import {type T_CH, type T_LNK, rubyTxt} from '../ts/Txt';
import BtnLayer from './BtnLayer';

import {css} from '@emotion/react';
import {type CSSProperties, useEffect, useLayoutEffect, useRef, useState} from 'react';
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
	b_color?: number | undefined;	// [lay b_color=0xRRGGBB]。文字レイヤ背景色。未指定は試作の既定色
	b_alpha	: number;	// [lay b_alpha=...]。文字レイヤ背景の不透明度（0.0～1.0）。背景のアルファとしてのみ反映し、文字自体は常に不透明
	b_alpha_isfixed?: boolean | undefined;	// [lay b_alpha_isfixed=true]。sys:TextLayer.Back.Alphaとの掛け算をせず、b_alphaをそのまま使う
	b_src?	: string | undefined;	// [lay b_pic=…]の解決済みURL。**あればb_colorより優先**（本家 TxtLayer.ts:393）
	styTxt?	: string | undefined;	// [lay style="..."]。文字レイヤへそのまま足すCSS（試作の既定スタイルを上書きする）
	enabled	: boolean;	// [enable_event]。falseの間はこのレイヤのボタンがクリックを受けない
	aBtn	: T_BTN[];
	onActivate: (label: string, call: boolean, fn: string, arg?: string)=> void;
};
// [link]区間のクリック（本文DOMはReactの外で組み立てるので、コールバックを渡して繋ぐ）
export type T_ON_LINK = (lnk: T_LNK)=> void;
// ストア（zustand）に保存するデータだけの型（cmnはrender時のPropsのみなので不要）
export type T_TXTLAY_DATA = T_LAY_IDX & {cls: 'txt'; str: string; aCh: T_CH[]; b_color?: number; b_alpha: number; b_alpha_isfixed?: boolean; b_pic?: string; b_src?: string; style?: string; enabled: boolean; aBtn: T_BTN[]};
export type T_TXTLAY = T_TXTLAY_DATA & T_LAY_CMN;


export default function TxtLayer({cmn: {styChild, isDesignMode}, sty, nm, isFore, str, aCh, b_color, b_alpha, b_alpha_isfixed, b_src, styTxt: sCss, enabled, aBtn, onActivate}: T_TXTARG) {
	// 読み戻り中（PageUp等でCaretakerが最新位置にいない間）は文字を黄色くする
	const isReadBack = useStore(s=> s.isReadBack);
	const isTyping = useStore(s=> s.isTyping);
	const setIsTyping = useStore(s=> s.setIsTyping);
	const skipReq = useStore(s=> s.skipReq);
	const skipping = useStore(s=> s.skipping);	// 既読スキップ中は文字送り演出を省いて瞬時表示する
	const wait = useStore(s=> s.wait);

	// 1文字ずつの文字送り演出（GSAP stagger）
	//	・aCh は「そのページの累積全文字」を表示単位へ割ったもの（ルビ付きは親文字＋ルビで1単位）。
	//	  前回からの差分（新規追加分）だけをspan化してアニメする
	//	・isReadBack中（履歴を辿っている間）はstaggerを使わず瞬時に確定表示（要件：パフォーマンス優先、一度アニメ済みの部分は読み戻りから戻っても瞬時表示）
	//	・文字はboxRef直下のcharsRefに収め、待ちマーカー（下記）はReactが別途管理する兄弟スパンとして共存させる
	const boxRef = useRef<HTMLSpanElement>(null);
	const charsRef = useRef<HTMLSpanElement>(null);
	// [link]のクリック。[button]と同じ経路（ScriptMng.jumpToLabelAndGo）へ流す
	const onLink: T_ON_LINK = l=> {onActivate(l.label, l.call, l.fn, l.arg)};
	// 1表示単位＝1spanのキャッシュ。読み戻り（PageUp）で短くなってもここからは消さず、
	// DOM上の表示/非表示だけを切り替える。これにより読み戻りから戻った際に
	// 既にアニメ表示済みの文字を再アニメせず瞬時表示できる（バグ修正: 2026-07-20）。
	const spansRef = useRef<HTMLSpanElement[]>([]);
	const chRef = useRef<T_CH[]>([]);	// 上のspanに対応する表示単位（前方一致の判定用）
	const tlRef = useRef<gsap.core.Timeline | null>(null);

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

		const cache = spansRef.current;
		const target = Math.min(aCh.length, cache.length);

		// 表示DOMをキャッシュ済み範囲まで合わせる
		//	・読み戻り（aChが短い）：末尾を非表示化（キャッシュからは消さない）
		//	・読み戻りから戻る（aChがキャッシュ済み長へ復帰）：非表示にしていた分を瞬時に復帰
		while (el.childNodes.length > target) el.removeChild(el.lastChild!);
		while (el.childNodes.length < target) el.appendChild(cache[el.childNodes.length]!);
		if (target > 0) gsap.set(cache.slice(0, target), {opacity: 1, y: 0});	// キル時の中途半端な状態を確定させる

		if (aCh.length <= cache.length) {
			// 既知の範囲内（読み戻り、または既知長への復帰）：新規アニメ不要
			setIsTyping(false);
			return;
		}

		// キャッシュを超える分だけが本当に新規表示すべき文字
		const added = aCh.slice(cache.length);
		const frag = document.createDocumentFragment();
		const newSpans = added.map(ch=> {
			const s = document.createElement('span');
			s.appendChild(elCh(ch, onLink));
			frag.appendChild(s);
			return s;
		});
		chRef.current = [...chRef.current, ...added];
		cache.push(...newSpans);
		el.appendChild(frag);

		if (isReadBack || skipping) {
			// 読み戻り中／既読スキップ中：staggerを使わず瞬時にアニメ終端状態へ
			gsap.set(newSpans, {opacity: 1, y: 0});
			setIsTyping(false);
			return;
		}

		setIsTyping(true);
		tlRef.current = gsap.timeline({onComplete: ()=> setIsTyping(false)}).fromTo(newSpans, {opacity: 0, y: '0.3em'}, {
			opacity: 1, y: 0, duration: 0.25, ease: 'power1.out', stagger: 0.035,
		});
	}, [aCh, isReadBack]);

	// タイプ演出中にMain.tsxのnext()からスキップ要求（requestSkip）が来たら、即終端まで進める
	//	（progress(1)によりtimelineのonCompleteが発火し、setIsTyping(false)も自動で呼ばれる）
	useEffect(()=> {
		if (tlRef.current && tlRef.current.progress() < 1) tlRef.current.progress(1);
	}, [skipReq]);

	// [l]/[p]待ち中マーカー（🩷/✅）。[s]はマーカーなし。読み戻り中は非表示
	//	isTypingを含めてガード：タイプ演出開始時は表示せず、最後の文字のアニメが終了（isTypingがfalseに）した同時/以降に表示する
	//	表裏2ページとも常にマウントされており同名レイヤが両方に居るので、裏側には出さない
	const showWait = isFore && ! isReadBack && ! isTyping && wait !== null && wait.nm === nm;
	const styWaitMark = css`
		display: inline-block;
		margin-left: 0.15em;
	`;
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
	//	ただし[lay b_color=…]で色を明示した層は「意図して置いた板」なので描く
	const noBox = str.length === 0 && b_color === undefined && ! b_src;
	const styTxt = css`
		padding: 1em 1.5em;
		margin: 2em 0;
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
		top: 48%;
		width: 70%;
		white-space: pre-wrap;
		color: ${isReadBack ? 'yellow' : 'inherit'};

		/* [lay style="..."]。上の既定を後から上書きできるよう最後に置く */
		${sCss ?? ''}
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
		<span css={[styChild, styTxt]} ref={boxRef} data-lay={nm} style={sty}>
			<span ref={charsRef}></span>
			{showWait && <span css={styWaitMark}>{wait!.kind === 'l' ? '🩷' : '✅'}</span>}
		</span>
		{aBtnFlow.length > 0 && <span css={[styChild, styBtnBox]} data-lay={nm}>
			{aBtnFlow.map(b=> <BtnLayer key={b.nm} text={b.text} label={b.label} call={b.call ?? false} fn={b.fn ?? ''} sty={b.sty} onActivate={onActivate}/>)}
		</span>}
		{aBtnPos.length > 0 && <span css={[styChild, styBtnPosBox]} data-lay={nm}>
			{aBtnPos.map(b=> <BtnLayer key={b.nm} text={b.text} label={b.label} call={b.call ?? false} fn={b.fn ?? ''} sty={b.sty} onActivate={onActivate}/>)}
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

// 表示単位1つ分のDOM。ルビ付きは<ruby>親文字<rt>ルビ</rt></ruby>（本家もHTMLのrubyで組む）。
//	半角空白はそのままだと連続分が詰まるのでノーブレークスペースにする（従来どおり）
function elCh({c, r, s, rs, tcy, lnk}: T_CH, onLink: T_ON_LINK): Node {
	const txt = (t: string)=> document.createTextNode(t === ' ' ? '\u00A0' : t);
	if (r === undefined && ! s && ! tcy && ! lnk) return txt(c);

	// [span]/[ch]/[link]のstyleは本文側の要素へ。ルビが無くても入れ物が要るのでspanで包む
	const el = document.createElement(r === undefined ? 'span' : 'ruby');
	if (s) el.style.cssText = s;
	// 縦中横（本家 TxtLayer.ts:672 も同じCSS）。横書き中は効かないので見た目は変わらない
	const base = tcy ? document.createElement('span') : el;
	if (tcy) {
		base.style.textCombineUpright = 'all';
		el.appendChild(base);
	}
	base.appendChild(txt(c));

	if (r !== undefined) {
		const rt = document.createElement('rt');
		if (rs) rt.style.cssText = rs;
		rt.textContent = rubyTxt(r);
		el.appendChild(rt);
	}
	if (lnk) mkLink(el, lnk, s ?? '', onLink);
	return el;
}

// [link]区間の1単位をクリックできるようにする。
//	**Reactの外で作るDOM**（文字送り演出のためTxtLayerが直接組み立てている）なので、
//	BtnLayerのようなJSXではなくここでリスナを付ける。読み進めへ伝播させない点は同じ
function mkLink(el: HTMLElement, lnk: T_LNK, sty: string, onLink: T_ON_LINK) {
	el.style.cursor = 'pointer';
	el.addEventListener('click', e=> {
		e.stopPropagation();	// クリックで本文も進む、の二重反応を防ぐ（BtnLayerと同じ）
		onLink(lnk);
	});
	if (! lnk.sh) return;

	// style_hover：乗っている間だけ足し、外れたら元のstyleへ戻す
	el.addEventListener('mouseenter', ()=> {el.style.cssText = sty + lnk.sh});
	el.addEventListener('mouseleave', ()=> {el.style.cssText = sty; el.style.cursor = 'pointer'});
}

// [lay b_color=0xRRGGBB]を8bit成分へ。未指定時は試作の既定色（aquamarine相当）
function rgbOf(b_color?: number): {r: number; g: number; b: number} {
	if (b_color === undefined) return {r: 127, g: 255, b: 212};
	return {r: (b_color >> 16) & 0xFF, g: (b_color >> 8) & 0xFF, b: b_color & 0xFF};
}
