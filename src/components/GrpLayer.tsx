/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2024-2024 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import type {SysBase} from '../SysBase';
import type {T_LAY_IDX, T_LAY_CMN} from './Stage';
import {SEARCH_PATH_ARG_EXT} from '../ts/ConfigBase';


type T_GRPARG = T_LAY_CMN & {
	sys		: SysBase;
	fn		: string;
};
export type T_GRPLAY = T_LAY_IDX & {cls: 'GRP'} & T_GRPARG;


export default function GrpLayer({styChild, sys, fn}: T_GRPARG) {
	const search = (fn: string)=> sys.cfg.searchPath(fn, SEARCH_PATH_ARG_EXT.SP_GSM);

	return <>
		<img css={styChild} src={search(fn)}/>
	</>;
}
