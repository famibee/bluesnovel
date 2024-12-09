/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2024-2024 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import type {SysBase} from '../SysBase';
import {CmnLib, uint} from '../ts/CmnLib';
import GrpLayer, {type T_GRPLAY} from './GrpLayer';
import TxtLayer, {type T_TXTLAY} from './TxtLaye';
import {T_CHGPIC, useStore} from '../store/store';
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


export const Stage = ()=> {
console.log(`fn:Stage.tsx line:60 Stage 0`);
	const aLay = useStore(s=> s.aLay);

	// 外部からの呼び出し
	const addLayer = useStore(s=> s.addLayer);
	const chgPic = useStore(s=> s.chgPic);
	const replace = useStore(s=> s.replace);
	useEffect(()=> {
		heStage.addEventListener('ev_addLayer', ((e: CustomEvent<T_LAY>)=> addLayer(e.detail)) as EventListenerOrEventListenerObject);
		heStage.addEventListener('ev_chgPic', ((e: CustomEvent<T_CHGPIC>)=> chgPic(e.detail)) as EventListenerOrEventListenerObject);
		// Stage更新処理
		heStage.addEventListener('ev_replace', ((e: CustomEvent<string>)=> replace(e.detail)) as EventListenerOrEventListenerObject);
	}, []);

	// ウインドウサイズ追従
	const [wh, setWH] = useState<T_WH>(innWH());
	useEffect(()=> {
		function onResize() {setWH(innWH())}
		globalThis.addEventListener('resize', onResize);
		return ()=> globalThis.removeEventListener('resize', onResize);
	}, []);
	const {cvsScale} = calcScale(wh);

	// 状態ＤＢ更新
	useEffect(()=> mmt.onUpdate(JSON.stringify(aLay)), [aLay]);

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

	return <div css={styParent}>
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


/*
export class Stage0 implements IMemento {
	getState(): string {return 'yun_1184,F_1024a'}
	setState(state: string) {
console.log(`fn:Stage.tsx line:40 state:${state}`);
		//TODO: setState
		;
	}

}
*/


export async function opening($heStage: HTMLElement, $sys: SysBase) {
	heStage = $heStage;
	sys = $sys;

	const {createRoot} = await import('react-dom/client');
	createRoot(heStage).render(<Stage />);

	sys.caretaker.add(mmt);
}
	let heStage: HTMLElement;
	let sys: SysBase;

export function addLayer(detail: T_LAY) {
	heStage.dispatchEvent(new CustomEvent('ev_addLayer', {detail}));
}

export function chgPic(detail: T_CHGPIC) {
	heStage.dispatchEvent(new CustomEvent('ev_chgPic', {detail}));
}

export class Memento extends BaseMemento {
	readonly	nm = 'Stage';
	protected override	stt = '[]';

	protected replace() {	// stt から 置換処理を
		heStage.dispatchEvent(new CustomEvent('ev_replace', {detail: this.stt}));
	}
}
const mmt = new Memento;
