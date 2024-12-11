/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2024-2024 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import type {SysBase} from '../SysBase';
import {CmnLib, uint} from '../ts/CmnLib';
import GrpLayer, {type T_GRPLAY} from './GrpLayer';
import TxtLayer, {type T_TXTLAY} from './TxtLayer';
import type {T_ARG} from './Main';
import {useStore} from '../store/store';
import {BaseMemento} from '../ts/Memento';

import {useEffect, useState} from 'react';
import {css, type SerializedStyles} from '@emotion/react';

export type T_LAY_IDX = {
	cls		: 'GRP'|'TXT';
	nm		: string;
};
export type T_LAY_CMN = {
	cmn: {
		sys			: SysBase;
		styChild	: SerializedStyles;
		visible?	: boolean;
	};
};
export type T_LAY = T_GRPLAY | T_TXTLAY;


export default function Stage({arg: {sys}, onClick}: {arg: T_ARG, onClick: ()=> void}) {
// console.log(`fn:Stage.tsx 0`);
	const aLay = useStore(s=> s.aLay);

	const replace = useStore(s=> s.replace);
	class Memento extends BaseMemento {
		readonly	nm = 'Stage';
		restore() {replace(this.stt)}	// this.stt から
	}
	sys.caretaker.update(()=> new Memento(JSON.stringify(aLay)));

	// ウインドウサイズ追従
	const [wh, setWH] = useState<T_WH>(innWH());
	useEffect(()=> {	// 初回処理
		function onResize() {setWH(innWH())}
		globalThis.addEventListener('resize', onResize);
		return ()=> globalThis.removeEventListener('resize', onResize);
	}, []);
	const {cvsScale} = calcScale(wh);

	// css
	const styParent = css`
		position: relative;

		transform-origin: left top;
		transform: scale(${cvsScale});
		width	: calc(${CmnLib.stageW}px / ${cvsScale});
		height	: calc(${CmnLib.stageH}px / ${cvsScale});
`;
	const styChild = css`position: absolute; top: 0; left: 0;`;
	const styBtn = css`
position: relative; z-index: 1;

display: inline-block;
text-align: center;
vertical-align: middle;
text-decoration: none;
width: 120px;
margin: auto;
padding: 1rem 4rem;
font-weight: bold;
border: 2px solid #27acd9;
color: #27acd9;
border-radius: 100vh;
transition: 0.5s;
&:hover {
	color: #fff;
	background: #27acd9;
}`;

	return <div css={styParent} onClick={()=> onClick()}>
		<button onClick={()=> {}} css={styBtn}>Click</button>
		<button onClick={()=> {}} css={styBtn}>Back</button>
		<button onClick={()=> {}} css={styBtn}>Prev</button>
		{aLay.map(l=> l.cls === 'GRP'
			? <GrpLayer key={l.nm} cmn={{sys, styChild}} fn={l.fn}/>
			: <TxtLayer key={l.nm} cmn={{sys, styChild}} str={'てすと'}/>)}
	</div>;
};
	type T_WH = {
		width	: number;
		height	: number;
	};
	function calcScale({width: w, height: h}: T_WH) {
		let cvsWidth = 0;
		let cvsHeight = 0;
		let cvsScale = 1;

		// const cr = heStage.getBoundingClientRect();
		// if (argChk_Boolean(CmnLib.hDip, 'expanding', true) || isGallery
		if (CmnLib.stageW > w
			|| CmnLib.stageH > h) {
			if (CmnLib.stageW / CmnLib.stageH <= w / h) {
				cvsHeight = h;
				cvsWidth = uint(CmnLib.stageW / CmnLib.stageH * h);
				// cvsWidth  = CmnLib.stageW /CmnLib.stageH *h;
			}
			else {
				cvsWidth = w;
				cvsHeight = uint(CmnLib.stageH / CmnLib.stageW * w);
				// cvsHeight = CmnLib.stageH /CmnLib.stageW *w;
			}
			cvsScale = cvsWidth / CmnLib.stageW;
			// if (isGallery) {
			// 	ofsPadLeft_Dom2PIXI	= 0;
			// 	ofsPadTop_Dom2PIXI	= 0;
			// }
			// else {
			// const sc = 1 -cvsScale;
			// if (CmnLib.isMobile) {
			// 	ofsPadLeft_Dom2PIXI = (w -cvsWidth) /2 *sc;
			// 	ofsPadTop_Dom2PIXI  = (h -cvsHeight)/2 *sc;
			// }
			// else {
			// 	ofsPadLeft_Dom2PIXI = cr.left*sc;
			// 	ofsPadTop_Dom2PIXI  = cr.top *sc;
			// }
			// [left] /cvsScale -[left]
			// PaddingLeft を DOMで引いてPIXIで足すイメージ
			// }
		}
		else {
			cvsWidth = CmnLib.stageW;
			cvsHeight = CmnLib.stageH;
			cvsScale = 1;
			// ofsPadLeft_Dom2PIXI	= 0;
			// ofsPadTop_Dom2PIXI	= 0;
		}
		return {cvsScale, cvsWidth, cvsHeight};
	}
	function innWH(): T_WH {
		const {innerWidth: width, innerHeight: height} = globalThis;
		return {width, height};
	}
