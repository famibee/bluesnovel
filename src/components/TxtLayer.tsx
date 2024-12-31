/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2024-2025 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import {type T_LAY_IDX, type T_LAY_CMN, noticeDrag} from './Stage';

import {css} from '@emotion/react';
import {useEffect, useRef, useState} from 'react';
import Moveable from 'react-moveable';


type T_TXTARG = T_LAY_CMN & {
	str		: string;
	b_color?: number;
};
export type T_TXTLAY = T_LAY_IDX & {cls: 'TXT'} & T_TXTARG;


export default function TxtLayer({cmn: {styChild, isDesignMode, sty4Moveable}, str}: T_TXTARG) {
	const styTxt = css`
		padding: 1em 1.5em;
		margin: 2em 0;
		background-color: aquamarine;
		border: dotted 6px #ffa500;

		font-size: xxx-large;
		top: 48%;
		width: 70%;
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
	const [inp, setInp] = useState('');
	useEffect(()=> setInp(str), [str]);

	const mes = useRef<HTMLSpanElement>(null);
	const txa = useRef<HTMLLabelElement>(null);
	const evt = (style: CSSStyleDeclaration, transform: string)=> {
		noticeDrag();
		style.transform = transform;
	}
	return <>
		<span css={[styChild, styTxt]} ref={mes} style={sty4Moveable}>{inp}</span>
		{isDesignMode && <Moveable target={mes}
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
