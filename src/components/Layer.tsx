/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2024-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

// レイヤー共通の「箱」。div0（位置・回転・拡縮を持つラッパー）とデザインモードのMoveableを
//	ここへ集約し、各レイヤー実装（GrpLayer、および本家[loadplugin]相当のプラグイン側レイヤー）は
//	中身（children）だけを持てばよいようにする。GrpLayer.tsxから切り出した（2026-08-24）。
//	**TxtLayerはここに乗せていない**：span要素・2つのMoveableインスタンス（本文＋デザインモードの
//	テキスト入力欄）・ボタンオーバーレイを抱え、GrpLayerと箱の形が違いすぎるため、無理に共通化すると
//	この共通コンポーネント側にオプションが増えるだけで見合わない

import {noticeDrag} from './Lay';

import {type CSSProperties, type ReactNode, useRef} from 'react';
import type {SerializedStyles} from '@emotion/react';
import Moveable from 'react-moveable';


export type T_LAYER_PROPS = {
	styChild		: SerializedStyles;
	isDesignMode	: boolean;
	nm				: string;
	sty				: CSSProperties;	// styLay()適用済み（呼び出し側でmax-content等を足してもよい）
	keepRatio?		: boolean;	// resize時に縦横比を固定するか（画像＝true、既定false）
	children		: ReactNode;
};

export default function Layer({styChild, isDesignMode, nm, sty, keepRatio = false, children}: T_LAYER_PROPS) {
	const div0 = useRef<HTMLDivElement>(null);
	const evt = (style: CSSStyleDeclaration, transform: string)=> {
		noticeDrag();
		style.transform = transform;
	};
	return <>
		<div css={styChild} ref={div0} data-lay={nm} style={sty}>
			{children}
		</div>
		{isDesignMode && <Moveable
			target={div0}

			/* draggable */
			draggable={true}
			throttleDrag={1}
			onDrag={({target: {style}, transform})=> evt(style, transform)}

			/* resizable*/
			resizable={true}
			keepRatio={keepRatio}
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
