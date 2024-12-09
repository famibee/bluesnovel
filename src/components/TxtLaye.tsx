/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2024-2024 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import type {SysBase} from '../SysBase';
import type {T_LAY_IDX, T_LAY_CMN} from './Stage';


type T_TXTARG = T_LAY_CMN & {
	sys		: SysBase;
	str		: string;
	b_color?: number;
};
export type T_TXTLAY = T_LAY_IDX & {cls: 'TXT'} & T_TXTARG;


export default function TxtLayer({styChild}: T_TXTARG) {
	return <div css={styChild}>
		<span></span>
	</div>;
}
