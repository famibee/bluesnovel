/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2024-2024 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import type {T_LAY_IDX, T_LAY_CMN} from './Stage';

import {css} from '@emotion/react';


type T_TXTARG = T_LAY_CMN & {
	str		: string;
	b_color?: number;
};
export type T_TXTLAY = T_LAY_IDX & {cls: 'TXT'} & T_TXTARG;


export default function TxtLayer({cmn: {styChild}, str}: T_TXTARG) {
	const styTxt = css`
		padding: 1em 1.5em;
		margin: 2em 0;
		background-color: aquamarine;
		border: dotted 6px #ffa500;

		font-size: xxx-large;
		top: 48%;
		width: 70%;
	`;

	return <>
		<span css={[styChild, styTxt]}>{str}</span>
	</>;
}
