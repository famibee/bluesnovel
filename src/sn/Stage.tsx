/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2024-2024 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import {SysBase} from './SysBase';
import {CmnLib} from './CmnLib';
import {SEARCH_PATH_ARG_EXT} from './ConfigBase';

import {createRoot} from 'react-dom/client';
import {useState} from 'react';
import {css} from '@emotion/react';

const	SN_ID	= 'skynovel';


export class Stage {
	readonly #styParent;
	readonly #styChild;

	constructor(private readonly sys: SysBase) {
		this.#styParent = css`
	position: relative;
	width: ${CmnLib.stageW}px;
	height: ${CmnLib.stageH}px;
`;
		this.#styChild = css`
	position: absolute;
	top: 0;
	left: 0;
`;
	}

	init__() {

		const searchPath = (fn: string)=> this.sys.cfg.searchPath(fn, SEARCH_PATH_ARG_EXT.SP_GSM);
		const 森 = searchPath('yun_1184');
		const 桜 = searchPath('yun_2352');
		const fg = searchPath('F_1024a');
		try {
// console.log(`fn:Stage.tsx 森:${森}: 桜:${桜}:`);
		} catch (e) {console.error(e)}

		const Layer = ({fn}: {fn: string})=>
			<div css={this.#styChild}>
				<img src={fn}/>
			</div>;
		const NavigationBar = ()=> {
			const [bg, setBg] = useState(森);
			return <>
				<button onClick={()=> setBg(森)}>森</button>
				<button onClick={()=> setBg(桜)}>桜</button>

				<div css={this.#styParent}>
					<Layer fn={bg}/>
					<Layer fn={fg}/>
				</div>
			</>;
		}

		document.body.innerHTML = `<div id="${SN_ID}"></div>`;
		const domNode = document.getElementById(SN_ID)!;
		const root = createRoot(domNode);
		root.render(<NavigationBar />);
	}
}
