/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2024-2024 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import type {T_SEARCHPATH} from '../ts/ConfigBase';
import {styChild, type T_LAY_IDX, type T_LAY_CMN} from './Stage';

type T_GRPARG = T_LAY_CMN & {
	search	: T_SEARCHPATH,
	fn		: string,
};
export type T_GRPLAY = T_LAY_IDX & {cls: 'GRP'} & T_GRPARG;


export default function GrpLayer({search, fn}: T_GRPARG) {
	return <div css={styChild}>
		<img src={search(fn)}/>
	</div>;
}
