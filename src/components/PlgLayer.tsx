/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2026-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

// プラグインレイヤー（[add_lay class=…]。本家3D/Live2D系プラグイン等）のReact側の「箱」。
//	中身（3Dシーン等）はstoreに無く、DOM側（src/ts/PlgLayMng.ts）が本家Pages同様fore/back 2個の
//	Layerインスタンスとして抱えている。ここは[add_frame]のFrameMngと同じ「Reactが自分で作った
//	子（下のdiv）に、外部（PlgLayMng）が管理するDOM実体（Layer.ctn）を出し入れするための
//	置き場所」を提供するだけで、中身の内容自体には関知しない。
//	箱（位置・回転・拡縮・Moveable）はGrpLayerと共通のcomponents/Layer.tsxを使う

import type {T_LAY_CMN} from './Lay';
import Layer from './Layer';

import type {CSSProperties} from 'react';


export type T_PLGARG = T_LAY_CMN & {
	sty		: CSSProperties;	// [lay]のvisible/alpha/left/top/rotation/scale_*（Stage.tsx styLay()）
	nm		: string;	// レイヤ名。data-lay属性としてDOMへ出す（[snapshot layer=…]の絞り込み用）
	// マウント時に子div（PlgLayMngがLayer.ctnを流し込む置き場所）を渡し、アンマウント時にnullを渡す。
	// React 19のref callbackはクリーンアップ関数を返せるので、attach(null)はその中で行う
	attach	: (el: HTMLDivElement | null)=> void;
};

export default function PlgLayer({cmn: {styChild, isDesignMode}, sty, nm, attach}: T_PLGARG) {
	// keepRatio=false：拡縮は3D側のカメラ・レイアウトが決めるべきで、画像のような自然な縦横比を前提にしない
	return <Layer styChild={styChild} isDesignMode={isDesignMode} nm={nm} sty={sty} keepRatio={false}>
		<div ref={el=> {attach(el); return ()=> {attach(null)}}} style={{width: '100%', height: '100%'}}/>
	</Layer>;
}
