/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2024-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import {type T_LAY_IDX, type T_LAY_CMN, noticeDrag} from './Lay';
import {useStore} from '../store/store';
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
	str		: string;
	b_color?: number | undefined;	// [lay b_color=0xRRGGBB]。文字レイヤ背景色。未指定は試作の既定色
	b_alpha	: number;	// [lay b_alpha=...]。文字レイヤ背景の不透明度（0.0～1.0）。背景色のrgbaアルファとしてのみ反映し、文字自体は常に不透明
	styTxt?	: string | undefined;	// [lay style="..."]。文字レイヤへそのまま足すCSS（試作の既定スタイルを上書きする）
	enabled	: boolean;	// [enable_event]。falseの間はこのレイヤのボタンがクリックを受けない
	aBtn	: T_BTN[];
	onActivate: (label: string, call: boolean, fn: string)=> void;
};
// ストア（zustand）に保存するデータだけの型（cmnはrender時のPropsのみなので不要）
export type T_TXTLAY_DATA = T_LAY_IDX & {cls: 'txt'; str: string; b_color?: number; b_alpha: number; style?: string; enabled: boolean; aBtn: T_BTN[]};
export type T_TXTLAY = T_TXTLAY_DATA & T_LAY_CMN;


export default function TxtLayer({cmn: {styChild, isDesignMode}, sty, nm, isFore, str, b_color, b_alpha, styTxt: sCss, enabled, aBtn, onActivate}: T_TXTARG) {
	// 読み戻り中（PageUp等でCaretakerが最新位置にいない間）は文字を黄色くする
	const isReadBack = useStore(s=> s.isReadBack);
	const isTyping = useStore(s=> s.isTyping);
	const setIsTyping = useStore(s=> s.setIsTyping);
	const skipReq = useStore(s=> s.skipReq);
	const skipping = useStore(s=> s.skipping);	// 既読スキップ中は文字送り演出を省いて瞬時表示する
	const wait = useStore(s=> s.wait);

	// 1文字ずつの文字送り演出（GSAP stagger）
	//	・str は「そのページの累積全文字列」なので、前回からの差分（新規追加分）だけをspan化してアニメする
	//	・isReadBack中（履歴を辿っている間）はstaggerを使わず瞬時に確定表示（要件：パフォーマンス優先、一度アニメ済みの部分は読み戻りから戻っても瞬時表示）
	//	・文字はboxRef直下のcharsRefに収め、待ちマーカー（下記）はReactが別途管理する兄弟スパンとして共存させる
	const boxRef = useRef<HTMLSpanElement>(null);
	const charsRef = useRef<HTMLSpanElement>(null);
	// 1文字＝1spanのキャッシュ。読み戻り（PageUp）で短くなってもここからは消さず、
	// DOM上の表示/非表示だけを切り替える。これにより読み戻りから戻った際に
	// 既にアニメ表示済みの文字を再アニメせず瞬時表示できる（バグ修正: 2026-07-20）。
	const spansRef = useRef<HTMLSpanElement[]>([]);
	const tlRef = useRef<gsap.core.Timeline | null>(null);

	useLayoutEffect(()=> {
		const el = charsRef.current;
		if (! el) return;

		tlRef.current?.kill();

		const cachedText = spansRef.current.map(s=> s.textContent === '\u00A0' ? ' ' : s.textContent).join('');

		// 本当のページクリア（strとキャッシュが互いに前方一致しない＝別内容）の場合のみ作り直す
		if (! cachedText.startsWith(str) && ! str.startsWith(cachedText)) {
			spansRef.current = [];
			el.textContent = '';
		}

		const cache = spansRef.current;
		const target = Math.min(str.length, cache.length);

		// 表示DOMをキャッシュ済み範囲まで合わせる
		//	・読み戻り（strが短い）：末尾を非表示化（キャッシュからは消さない）
		//	・読み戻りから戻る（strがキャッシュ済み長へ復帰）：非表示にしていた分を瞬時に復帰
		while (el.childNodes.length > target) el.removeChild(el.lastChild!);
		while (el.childNodes.length < target) el.appendChild(cache[el.childNodes.length]!);
		if (target > 0) gsap.set(cache.slice(0, target), {opacity: 1, y: 0});	// キル時の中途半端な状態を確定させる

		if (str.length <= cache.length) {
			// 既知の範囲内（読み戻り、または既知長への復帰）：新規アニメ不要
			setIsTyping(false);
			return;
		}

		// キャッシュを超える分だけが本当に新規表示すべき文字
		const added = str.slice(cache.length);
		const frag = document.createDocumentFragment();
		const newSpans = [...added].map(ch=> {
			const s = document.createElement('span');
			s.textContent = ch === ' ' ? '\u00A0' : ch;
			frag.appendChild(s);
			return s;
		});
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
	}, [str, isReadBack]);

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
	const styTxt = css`
		padding: 1em 1.5em;
		margin: 2em 0;
		/* 背景色に[lay b_alpha=...]をアルファチャンネルで反映。
			要素全体のopacityではなく背景色のアルファのみを下げるので、子要素（文字）の透過度には影響しない
			（レイヤ全体を透かしたい場合は[lay alpha=...]） */
		background-color: rgba(${r}, ${g}, ${b}, ${b_alpha});
		border: dotted 6px #ffa500;

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
		<span css={[styChild, styTxt]} ref={boxRef} style={sty}>
			<span ref={charsRef}></span>
			{showWait && <span css={styWaitMark}>{wait!.kind === 'l' ? '🩷' : '✅'}</span>}
		</span>
		{aBtnFlow.length > 0 && <span css={[styChild, styBtnBox]}>
			{aBtnFlow.map(b=> <BtnLayer key={b.nm} text={b.text} label={b.label} call={b.call ?? false} fn={b.fn ?? ''} sty={b.sty} onActivate={onActivate}/>)}
		</span>}
		{aBtnPos.length > 0 && <span css={[styChild, styBtnPosBox]}>
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

// [lay b_color=0xRRGGBB]を8bit成分へ。未指定時は試作の既定色（aquamarine相当）
function rgbOf(b_color?: number): {r: number; g: number; b: number} {
	if (b_color === undefined) return {r: 127, g: 255, b: 212};
	return {r: (b_color >> 16) & 0xFF, g: (b_color >> 8) & 0xFF, b: b_color & 0xFF};
}
