/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2024-2024 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import type {SysBase} from '../SysBase';
import {CmnLib} from '../ts/CmnLib';
import {SEARCH_PATH_ARG_EXT} from '../ts/ConfigBase';
import GrpLayer, {type T_GRPLAY} from './GrpLayer';
import TxtLayer, {type T_TXTLAY} from './TxtLaye';
import {useStore} from '../store/store';

import {createRoot} from 'react-dom/client';
import {useState} from 'react';
import {css} from '@emotion/react';


export type T_LAY_IDX = {
	cls		: 'GRP'|'TXT',
	nm		: string,
};
export type T_LAY_CMN = {
	visible?	: boolean,
};
export type T_LAY = T_GRPLAY | T_TXTLAY;

const styStage = css`
`;
const styParent = css`
	position: relative;
	width	: ${CmnLib.stageW}px;
	height	: ${CmnLib.stageH}px;
`;
export const styChild = css`
	position: absolute;
	top		: 0;
	left	: 0;
`;


export const Stage = ({sys}: {sys: SysBase})=> {
console.log(`fn:Stage.tsx line:60 Stage 0`);
	const aLay = useStore(s=> s.aLay);

	const addLayer = useStore(s=> s.addLayer);
	heStage.addEventListener('ev_addLayer', ((e: CustomEvent<T_LAY>)=> addLayer(e.detail)) as EventListenerOrEventListenerObject);


const happys = useStore(s=> s.happys);
const happysUp = useStore(s=> s.happysUp);

const [cnt, setCnt] = useState<number[]>([]);


	const search = (fn: string)=> sys.cfg.searchPath(fn, SEARCH_PATH_ARG_EXT.SP_GSM);
	// const 桜 = searchPath('yun_2352');

	return <div css={[styStage, css`
		background-color: ${sys.cfg.oCfg.init.bg_color};
	`]}>
		<button onClick={()=> setCnt([...cnt, 0])}>{cnt.length}</button>
		<button onClick={()=> happysUp()}>{happys}</button>
		<div css={styParent}>{
			aLay.map(l=> l.cls === 'GRP'
				? <GrpLayer key={l.nm} search={search} fn={l.fn}/>
				: <TxtLayer key={l.nm} search={search} str={'てすと'}/>)
		}</div>
	</div>
	;
};

export function opening(sys: SysBase) {
	const SN_ID = 'skynovel';
	document.body.innerHTML = `<div id="${SN_ID}"></div>`;
	heStage = document.getElementById(SN_ID)!;

	createRoot(heStage).render(<Stage sys={sys} />);
}
	let heStage: HTMLElement;

export function addLayer(l: T_LAY) {
	heStage.dispatchEvent(new CustomEvent('ev_addLayer', {detail: l}));
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
