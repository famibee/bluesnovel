/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2024-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

// レイヤまわりの「コンポーネントではない部分」＝型・CSS変換・ドラッグ通知。
//	**Stage.tsxから切り出してあるのが要点**。Main.tsxはStageを lazy()（＝動的import）で
//	読み込んで初回表示を軽くしているが、GrpLayer/TxtLayer/storeがStage.tsxを静的importすると
//	Stageが同じチャンクへ引き戻されて動的importが効かなくなる
//	（rolldownのINEFFECTIVE_DYNAMIC_IMPORT警告）。共有物をここへ置けば、
//	Stage.tsxを静的importするモジュールが無くなり、Stageは自分のチャンクに残る。
//	型だけの参照（import type）は消えるので、下のGrpLayer/TxtLayerからの読み込みは影響しない

import type {SysBase} from '../sn/SysBase';
import type {T_GRPLAY_DATA} from './GrpLayer';
import type {T_TXTLAY_DATA} from './TxtLayer';

import type {CSSProperties} from 'react';
import type {SerializedStyles} from '@emotion/react';


// レイヤ共通の見た目（本家 Layer.ts lay() が扱う分のうち、試作で対応したもの）。
//	rotationは度（本家も flash 由来で度。pixiのradianではない）。
//	**全て省略可**にしてあるのが要点で、[lay]で書かれた属性だけが値を持つ。
//	既定値を入れて常に持たせると、指定していない属性まで毎回インラインstyleへ書き出してしまい、
//	各レイヤのCSS（TxtLayerのtop: 48%など）を潰してしまう
//	（本家 Layer.lay() も `'left' in hArg` で書かれたかどうかを見ている）
export type T_LAY_STY = {
	visible?	: boolean;
	alpha?		: number;	// レイヤ全体の不透明度。文字レイヤ背景だけを透かすb_alphaとは別物
	left?		: number;
	top?		: number;
	rotation?	: number;
	scale_x?	: number;
	scale_y?	: number;
	// 回転・拡縮の原点（本家 Layer.lay() のpivot_x/pivot_y＝pixiのDisplayObject.pivot）。
	//	既定は左上＝CSSの transform-origin: 0 0 と同じなので、そのまま対応が付く。
	//	**pixiのpivotは表示位置そのものもずらす**が、こちらはCSSのtransform-originなので
	//	原点を変えるだけ。回転・拡縮の中心を動かす用途では同じ絵になる
	pivot_x?	: number;
	pivot_y?	: number;
	blendmode?	: string;	// CSSのmix-blend-mode値（[lay blendmode=…]がここへ変換して入れる）
};
export const A_LAY_STY_KEY = ['visible', 'alpha', 'left', 'top', 'rotation', 'scale_x', 'scale_y', 'pivot_x', 'pivot_y', 'blendmode'] as const;

export type T_LAY_IDX = T_LAY_STY & {
	cls		: 'grp'|'txt';
	nm		: string;
};

// 上のT_LAY_STYをCSSへ。**指定された属性だけ**を出す。
//	位置はstyChild（絶対配置）のleft/topを上書きし、回転・拡縮はtransformでまとめる
//	（原点は左上＝本家pixiのpivot既定と揃える）
export function styLay(l: T_LAY_STY): CSSProperties {
	const sty: CSSProperties = {};
	if (l.left !== undefined) sty.left = `${String(l.left)}px`;
	if (l.top !== undefined) sty.top = `${String(l.top)}px`;
	if (l.alpha !== undefined) sty.opacity = l.alpha;
	if (l.rotation !== undefined || l.scale_x !== undefined || l.scale_y !== undefined
	 || l.pivot_x !== undefined || l.pivot_y !== undefined) {
		sty.transform = `rotate(${String(l.rotation ?? 0)}deg) scale(${String(l.scale_x ?? 1)}, ${String(l.scale_y ?? 1)})`;
		// pivot未指定なら 0 0 ＝ 従来の left top と同じ
		sty.transformOrigin = `${String(l.pivot_x ?? 0)}px ${String(l.pivot_y ?? 0)}px`;
	}
	if (l.blendmode !== undefined) sty.mixBlendMode = l.blendmode as CSSProperties['mixBlendMode'];
	// visible=falseは領域ごと消す（display:none）。visibility:hiddenだと
	//	表裏ページのvisibility制御（Stageのpage単位）と混ざって分かりにくい
	if (l.visible === false) sty.display = 'none';
	return sty;
}

export type T_LAY_CMN = {
	cmn: {
		sys			: SysBase;
		styChild	: SerializedStyles;
		isDesignMode: boolean;
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		sty4Moveable: any;
		visible?	: boolean;
	};
};
export type T_LAY = T_GRPLAY_DATA | T_TXTLAY_DATA;


// デザインモードのMoveableでドラッグしたか。ドラッグ終わりのクリックを
//	「読み進め」と取り違えないよう、各レイヤが動かした時に知らせてくる
let isDrag = false;
export const noticeDrag = ()=> {isDrag = true};
export const clearDrag = ()=> {isDrag = false};
export const isDragging = ()=> isDrag;
