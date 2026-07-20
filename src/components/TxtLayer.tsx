/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2024-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import {type T_LAY_IDX, type T_LAY_CMN, noticeDrag} from './Stage';
import {useStore} from '../store/store';

import {css} from '@emotion/react';
import {useEffect, useLayoutEffect, useRef, useState} from 'react';
import Moveable from 'react-moveable';
import gsap from 'gsap';


type T_TXTARG = T_LAY_CMN & {
	nm		: string;
	str		: string;
	b_color?: number;
};
// ストア（zustand）に保存するデータだけの型（cmnはrender時のPropsのみなので不要）
export type T_TXTLAY_DATA = T_LAY_IDX & {cls: 'txt'; str: string; b_color?: number};
export type T_TXTLAY = T_TXTLAY_DATA & T_LAY_CMN;


export default function TxtLayer({cmn: {styChild, isDesignMode, sty4Moveable}, nm, str}: T_TXTARG) {
	// 読み戻り中（PageUp等でCaretakerが最新位置にいない間）は文字を黄色くする
	const isReadBack = useStore(s=> s.isReadBack);
	const isTyping = useStore(s=> s.isTyping);
	const setIsTyping = useStore(s=> s.setIsTyping);
	const skipReq = useStore(s=> s.skipReq);
	const wait = useStore(s=> s.wait);

	// 1文字ずつの文字送り演出（GSAP stagger）
	//	・str は「そのページの累積全文字列」なので、前回からの差分（新規追加分）だけをspan化してアニメする
	//	・isReadBack中（履歴を辿っている間）はstaggerを使わず瞬時に確定表示（要件：パフォーマンス優先、一度アニメ済みの部分は読み戻りから戻っても瞬時表示）
	//	・文字はboxRef直下のcharsRefに収め、待ちマーカー（下記）はReactが別途管理する兄弟スパンとして共存させる
	const boxRef = useRef<HTMLSpanElement>(null);
	const charsRef = useRef<HTMLSpanElement>(null);
	const prevLenRef = useRef(0);
	const tlRef = useRef<gsap.core.Timeline | null>(null);

	useLayoutEffect(()=> {
		const el = charsRef.current;
		if (! el) return;

		// ページクリア（[p]等でstrが短くなった／前方一致しなくなった）場合は作り直し
		const cur = el.textContent ?? '';
		if (str.length < prevLenRef.current || ! str.startsWith(cur)) {
			tlRef.current?.kill();
			el.textContent = '';
			prevLenRef.current = 0;
		}

		const added = str.slice(prevLenRef.current);
		prevLenRef.current = str.length;
		if (! added) return;

		const frag = document.createDocumentFragment();
		const spans = [...added].map(ch=> {
			const s = document.createElement('span');
			s.textContent = ch === ' ' ? '\u00A0' : ch;
			frag.appendChild(s);
			return s;
		});
		el.appendChild(frag);

		if (isReadBack) {
			// 読み戻り中：staggerを使わず瞬時にアニメ終端状態へ
			tlRef.current?.kill();
			gsap.set(spans, {opacity: 1, y: 0});
			setIsTyping(false);
			return;
		}

		tlRef.current?.kill();
		setIsTyping(true);
		tlRef.current = gsap.timeline({onComplete: ()=> setIsTyping(false)}).fromTo(spans, {opacity: 0, y: '0.3em'}, {
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
	const showWait = ! isReadBack && ! isTyping && wait !== null && wait.nm === nm;
	const styWaitMark = css`
		display: inline-block;
		margin-left: 0.15em;
	`;
	const styTxt = css`
		padding: 1em 1.5em;
		margin: 2em 0;
		background-color: aquamarine;
		border: dotted 6px #ffa500;

		font-size: xxx-large;
		top: 48%;
		width: 70%;
		white-space: pre-wrap;
		color: ${isReadBack ? 'yellow' : 'inherit'};
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
		<span css={[styChild, styTxt]} ref={boxRef} style={sty4Moveable}>
			<span ref={charsRef}></span>
			{showWait && <span css={styWaitMark}>{wait!.kind === 'l' ? '🩷' : '✅'}</span>}
		</span>
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
