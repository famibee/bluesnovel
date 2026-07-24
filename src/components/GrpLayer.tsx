/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2024-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import {type T_LAY_IDX, type T_LAY_CMN, noticeDrag} from './Lay';
import {SEARCH_PATH_ARG_EXT} from '../sn/ConfigBase';

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
type T_GRPARG = T_LAY_CMN & {
	sty		: CSSProperties;	// [lay]のvisible/alpha/left/top/rotation/scale_*（Stage.tsx styLay()）
	fn		: string;
	aFace	: T_FACE[];	// [lay face=...]による差分合成。重なり順＝配列順（後の要素ほど上に重なる）
};
// ストア（zustand）に保存するデータだけの型（cmnはrender時のPropsのみなので不要）
export type T_GRPLAY_DATA = T_LAY_IDX & {cls: 'grp'; fn: string; aFace: T_FACE[]};
export type T_GRPLAY = T_GRPLAY_DATA & T_LAY_CMN;


export default function GrpLayer({cmn: {styChild, sys, isDesignMode}, sty, fn, aFace}: T_GRPARG) {
	// 試作注意：アセット一式（path.json等）未整備の状態でも画面ごと落ちないようにする
	//	本実装ではアセット未登録をロードエラーとして扱う方針へ戻すこと
	const search = (fn: string)=> {
		if (! fn) return '';
		try {return sys.cfg.searchPath(fn, SEARCH_PATH_ARG_EXT.SP_GSM)}
		catch (e) {console.warn('GrpLayer search failed (試作：アセット未整備の可能性)', e); return ''}
	};

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
			{/* fn未設定やアセット未整備でsearch()が''を返す間は<img src="">を描画しない（Reactがページ全体再ダウンロードの可能性を警告するため） */}
			{fn && search(fn) && <img src={search(fn)} style={{display: 'block'}}/>}
			{aFace.map(({fn: faceFn, dx, dy, blendmode}, i)=> {
				const src = faceFn && search(faceFn);
				if (! src) return null;
				return <img
					key={`${faceFn}_${String(i)}`}
					src={src}
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
