/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2024-2024 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import {type T_LAY_IDX, type T_LAY_CMN, noticeDrag} from './Stage';
import {SEARCH_PATH_ARG_EXT} from '../ts/ConfigBase';

import {MouseEvent, useRef} from 'react';
import Moveable from 'react-moveable';


type T_GRPARG = T_LAY_CMN & {
	fn		: string;
};
export type T_GRPLAY = T_LAY_IDX & {cls: 'GRP'} & T_GRPARG;


export default function GrpLayer({cmn: {styChild, sys, isDesignMode, sty4Moveable}, fn}: T_GRPARG) {
	const search = (fn: string)=> sys.cfg.searchPath(fn, SEARCH_PATH_ARG_EXT.SP_GSM);

	const onMouseDown = (e: MouseEvent)=> {	// left, middle, right
		if (e.button != 1) {
			return
		}
console.log(`fn:GrpLayer.tsx line:28 MIDDLE:`);
	};

	const img0 = useRef<HTMLImageElement>(null);
	const evt = (style: CSSStyleDeclaration, transform: string)=> {
		noticeDrag();
		style.transform = transform;
	}
	return <>
		<img css={styChild} src={search(fn)} ref={img0} style={sty4Moveable} onMouseDown={e=> onMouseDown(e)}/>
		{isDesignMode && <Moveable
			target={img0}

			/* draggable */
			draggable={true}
			throttleDrag={1}
			onDrag={({target: {style}, transform})=> evt(style, transform)}

			/* resizable*/
			resizable={true}
			keepRatio={true}
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
	</>;
}
