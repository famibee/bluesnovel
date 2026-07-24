/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2024-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import {type T_LAY_IDX, type T_LAY_CMN, noticeDrag} from './Lay';

import {type CSSProperties, MouseEvent, useRef} from 'react';
import Moveable from 'react-moveable';


// [add_face]で定義した差分絵1件分。dx/dyは親画像（fn）の左上を原点(0,0)とした相対座標
//	（本家 skynovel_esm の Sprite.x/y 相当。blendmodeはCSSのmix-blend-modeにそのまま渡す）
export type T_FACE = {
	fn			: string;
	dx			: number;
	dy			: number;
	blendmode	: string;
};
// ストアが持つのは上に解決済みURL（src）を足したもの。
//	パス解決（path.json）はScriptMngが行う＝renderの中でsearchPath()を呼ばない
//	（サーチパスに無いと例外を投げるので、renderで投げるとReactごと落ちる）
export type T_FACE_SRC = T_FACE & {src: string};
type T_GRPARG = T_LAY_CMN & {
	sty		: CSSProperties;	// [lay]のvisible/alpha/left/top/rotation/scale_*（Stage.tsx styLay()）
	fn		: string;	// [lay fn=...]で指定された論理名（[dump_lay]・デバッグ用）
	src		: string;	// 解決済みURL。空なら描かない
	aFace	: T_FACE_SRC[];	// [lay face=...]による差分合成。重なり順＝配列順（後の要素ほど上に重なる）
};
// ストア（zustand）に保存するデータだけの型（cmnはrender時のPropsのみなので不要）
export type T_GRPLAY_DATA = T_LAY_IDX & {cls: 'grp'; fn: string; src: string; aFace: T_FACE_SRC[]};
export type T_GRPLAY = T_GRPLAY_DATA & T_LAY_CMN;


export default function GrpLayer({cmn: {styChild, isDesignMode}, sty, src, aFace}: T_GRPARG) {
	const onMouseDown = (e: MouseEvent)=> {	// left, middle, right
		if (e.button != 1) {
			return
		}
console.log(`fn:GrpLayer.tsx line:28 MIDDLE:`);
	};

	// 差分合成（face）の重ね方針：
	//	・div0（ラッパー）を Stage 上の配置単位（Moveableの対象）とし、styChild/sty4Moveableはここに適用する
	//	・基本画像（fn）は通常フローで配置し、その自然サイズでdiv0をサイズ確定させる
	//	　（position:absoluteにするとサイズが親のサイズ計算に反映されなくなるため）
	//	・差分絵（face）は div0 を基準に position:absolute で dx,dy に配置し、blendmodeをmix-blend-modeへそのまま渡す
	//	・重なり順は aFace の配列順（[lay face=A,B,C]の記述順）＝DOM順で自然に実現される
	const div0 = useRef<HTMLDivElement>(null);
	const evt = (style: CSSStyleDeclaration, transform: string)=> {
		noticeDrag();
		style.transform = transform;
	}
	return <>
		<div css={styChild} ref={div0} style={sty} onMouseDown={e=> onMouseDown(e)}>
			{/* srcが空（未指定・解決失敗）のときは<img src="">を描画しない
				（Reactがページ全体再ダウンロードの可能性を警告するため） */}
			{src && <img src={src} style={{display: 'block'}}/>}
			{aFace.map(({fn: faceFn, src: faceSrc, dx, dy, blendmode}, i)=> {
				if (! faceSrc) return null;
				return <img
					key={`${faceFn}_${String(i)}`}
					src={faceSrc}
					style={{position: 'absolute', left: dx, top: dy, mixBlendMode: blendmode as CSSProperties['mixBlendMode']}}
				/>;
			})}
		</div>
		{isDesignMode && <Moveable
			target={div0}

			/* draggable */
			draggable={true}
			throttleDrag={1}
			onDrag={({target: {style}, transform})=> evt(style, transform)}

			/* resizable*/
			resizable={true}
			keepRatio={true}
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
