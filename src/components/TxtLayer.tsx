/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2024-2024 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import type {T_LAY_IDX, T_LAY_CMN} from './Stage';

import {css} from '@emotion/react';
import {useRef} from 'react';
import Moveable from 'react-moveable';


type T_TXTARG = T_LAY_CMN & {
	str		: string;
	b_color?: number;
};
export type T_TXTLAY = T_LAY_IDX & {cls: 'TXT'} & T_TXTARG;


export default function TxtLayer({cmn: {styChild, sty4Moveable}, str}: T_TXTARG) {
	const styTxt = css`
		padding: 1em 1.5em;
		margin: 2em 0;
		background-color: aquamarine;
		border: dotted 6px #ffa500;

		font-size: xxx-large;
		top: 48%;
		width: 70%;
	`;

	const mes = useRef<HTMLSpanElement>(null);
	return <>
		<span css={[styChild, styTxt]} ref={mes} style={sty4Moveable}>{str}</span>
		<Moveable
			target={mes}

			/* draggable */
			draggable={true}
			throttleDrag={1}
			onDrag={({target: {style}, transform})=> {
				style.transform = transform;
			}}

			/* resizable*/
			resizable={true}
			keepRatio={false}
			onResize={({target: {style}, width, height, drag})=> {
				style.width = `${width}px`;
				style.height = `${height}px`;
				style.transform = drag.transform;
			}}

			/* rotatable */
			rotatable={true}
			throttleRotate={0}
			startDragRotate={0}
			throttleDragRotate={0}
			rotationPosition={'top'}
			onRotate={({target: {style}, drag})=> {
				style.transform = drag.transform;
			}}

			originDraggable={true}
			onDragOrigin={({target: {style}, transformOrigin, drag})=> {
				style.transformOrigin = transformOrigin;
				style.transform = drag.transform;
			}}
		/>
	</>;
}
