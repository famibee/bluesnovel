/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2024-2024 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import type {T_LAY_IDX, T_LAY_CMN} from './Stage';
import {SEARCH_PATH_ARG_EXT} from '../ts/ConfigBase';

import {useRef} from 'react';
import Moveable from 'react-moveable';


type T_GRPARG = T_LAY_CMN & {
	fn		: string;
};
export type T_GRPLAY = T_LAY_IDX & {cls: 'GRP'} & T_GRPARG;


export default function GrpLayer({cmn: {styChild, sys, sty4Moveable}, fn}: T_GRPARG) {
	const search = (fn: string)=> sys.cfg.searchPath(fn, SEARCH_PATH_ARG_EXT.SP_GSM);

	const img0 = useRef<HTMLImageElement>(null);
	return <>
		<img css={styChild} src={search(fn)} ref={img0} style={sty4Moveable}/>
		<Moveable
			target={img0}

			/* draggable */
			draggable={true}
			throttleDrag={1}
			onDrag={({target: {style}, transform})=> {
				style.transform = transform;
			}}

			/* resizable*/
			resizable={true}
			keepRatio={true}
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
