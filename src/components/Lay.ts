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
import {styFilter, blendmodeOf, type T_FLT} from '../ts/Filter';
import type {T_GRPLAY_DATA} from './GrpLayer';
import type {T_TXTLAY_DATA} from './TxtLayer';

import type {CSSProperties, ReactNode} from 'react';
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
	// 中央寄せ・右端合わせ（本家 Layer.ts:513-552 の center/right/middle/bottom）。
	//	本家は「指定値から**表示物の幅・高さを引く**」で実現するが、エンジンは表示物の実寸を
	//	知らない（知るにはDOMを見るしかない）。そこでCSSの独立`translate`プロパティで表す：
	//	center→-50%・right→-100%。**transformとは別プロパティ**なので、
	//	rotation/scale_*（transformで組む）と衝突せず、適用もtransformより前＝
	//	「位置を決めてから回す」という本家の順序と同じになる
	align_x?	: 'center' | 'right';
	align_y?	: 'middle' | 'bottom';
	// ステージの右端・下端からの距離（本家 s_right/s_bottom）。CSSのright/bottomがそのまま同義。
	//	left/topとは排他（本家も else if で分岐する）
	s_right?	: number;
	s_bottom?	: number;
	// レイヤの寸法（本家 GrpLayer.ts / TxtStage.ts の width/height）。**本家と違い独立して扱う**：
	//	本家の画像レイヤはwidth単独指定だとheightに0が入り絵が縦潰れで消えるバグを持つ
	//	（argChk_Numが未指定時に0を返すため）。bluesnovelは本家[button]と同じ「未指定は
	//	自然サイズ維持」の形に揃える（ScriptEngine.ts #execTag 'lay' 参照）
	width?		: number;
	height?		: number;
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
	aFlt?		: T_FLT[];	// [add_filter]で重ねたフィルター（重なり順＝配列順）
};
// 文字ボタンの箱の大きさの既定（本家 Button.ts:123 height=30 / :152 width=100）。
//	pixiの Text.width/height は文字スプライトそのものを拡縮するので、本家のボタンは
//	文字数に関わらず必ずこの大きさに揃う。**CSSの既定（文字なりの幅）とは食い違う**ので、
//	エンジンの[button]入口で埋める（ScriptEngine）。ここに置くのは、
//	表示側（BtnLayer）も古いセーブの取りこぼし用に同じ値を要るため
export const BTN_DEF_W = 100;
export const BTN_DEF_H = 30;

export const A_LAY_STY_KEY = ['visible', 'alpha', 'left', 'top', 'align_x', 'align_y', 's_right', 's_bottom', 'width', 'height', 'rotation', 'scale_x', 'scale_y', 'pivot_x', 'pivot_y', 'blendmode', 'aFlt'] as const;

export type T_LAY_IDX = T_LAY_STY & {
	cls		: 'grp'|'txt';
	nm		: string;
};

// 上のT_LAY_STYをCSSへ。**指定された属性だけ**を出す。
//	位置はstyChild（絶対配置）のleft/topを上書きし、回転・拡縮はtransformでまとめる
//	（原点は左上＝本家pixiのpivot既定と揃える）
export function styLay(l: T_LAY_STY): CSSProperties {
	const sty: CSSProperties = {};
	// 横位置：left（＋center/rightの寄せ）か、ステージ右端からのs_rightか（本家も else if で排他）。
	//	styChild（Stage.tsx）がクラスCSSで left: 0; top: 0; を固定しているため、s_right/s_bottom側では
	//	leftを明示的に'auto'で打ち消す必要がある。さもないと left:0（クラス）と right:20px（インライン）
	//	が両方効いてしまい、絶対配置はleft+widthを優先してrightを無視する（＝s_rightが効かなくなる）
	if (l.s_right !== undefined) {
		sty.right = `${String(l.s_right)}px`;
		sty.left = 'auto';
	} else if (l.left !== undefined) sty.left = `${String(l.left)}px`;
	if (l.s_bottom !== undefined) {
		sty.bottom = `${String(l.s_bottom)}px`;
		sty.top = 'auto';
	} else if (l.top !== undefined) sty.top = `${String(l.top)}px`;
	// 寄せは独立translateプロパティで。transformと別なので回転・拡縮と混ざらない
	if (l.align_x !== undefined || l.align_y !== undefined) {
		const tx = l.align_x === 'center' ? '-50%' : l.align_x === 'right' ? '-100%' : '0';
		const ty = l.align_y === 'middle' ? '-50%' : l.align_y === 'bottom' ? '-100%' : '0';
		sty.translate = `${tx} ${ty}`;
	}
	// opacity<1はCSS仕様上それ自体が新しいスタッキングコンテキストを作り、子孫（GrpLayerなら
	//	face差分合成の各<img>）を先にグループとして不透明合成してから、まとめて透過を適用する。
	//	本家の[tsy render=]（子要素群をRenderTextureへ焼いてから透過し、差分画像の境界が
	//	二重に透けるのを防ぐ）と同じ効果がここで自然に得られるため、isolation: isolateの追加は
	//	不要と実機のピクセル値比較で確認済み（2026-08-17。alpha=0.5でのbg/face重なり色が
	//	isolationの有無で一致した）
	if (l.alpha !== undefined) sty.opacity = l.alpha;
	// レイヤの寸法。**独立した2つのif**（片方だけの指定でも成立）。GrpLayerは箱の大きさとして、
	//	TxtLayerは文字表示領域の大きさとして使う（styChild/styTxtのwidth既定=70%を上書きする）
	if (l.width !== undefined) sty.width = `${String(l.width)}px`;
	if (l.height !== undefined) sty.height = `${String(l.height)}px`;
	if (l.rotation !== undefined || l.scale_x !== undefined || l.scale_y !== undefined
	 || l.pivot_x !== undefined || l.pivot_y !== undefined) {
		sty.transform = `rotate(${String(l.rotation ?? 0)}deg) scale(${String(l.scale_x ?? 1)}, ${String(l.scale_y ?? 1)})`;
		// pivot未指定なら 0 0 ＝ 従来の left top と同じ
		sty.transformOrigin = `${String(l.pivot_x ?? 0)}px ${String(l.pivot_y ?? 0)}px`;
	}
	// [lay blendmode=]優先、無指定なら[add_filter blendmode=]（フィルター単位のブレンド）に
	//	フォールバック。CSSはmix-blend-modeを要素につき1つしか持てないため両者は同じ枠を取り合う
	const bm = l.blendmode ?? (l.aFlt !== undefined ? blendmodeOf(l.aFlt) : undefined);
	if (bm !== undefined) sty.mixBlendMode = bm as CSSProperties['mixBlendMode'];
	// [add_filter]で重ねたぶんを1つのfilterプロパティへ。全部無効／空なら出さない
	if (l.aFlt !== undefined) {
		const f = styFilter(l.aFlt);
		if (f) sty.filter = f;
	}
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

// 画像系レイヤー（cls: 'grp'）の「中身の描き方」を差し替えるプラグイン拡張点。
//	**大分類（cls: grp/txt）自体は増やさない**：store.tsx（chgLay/clearLay等）が随所で
//	`e.cls === 'grp'`の判別ユニオン絞り込みに依存しており、clsに3つ目の値を足すと
//	（`(string & {})`等でリテラル外を許す形にすると）その絞り込みが軒並み壊れる（実測済み）。
//	そこで「'grp'の中のさらに細かい表示方式」という1段下の軸（[lay type=…]→`kind`）を用意し、
//	本家の`[lay type=gltf]`（Pixiへプラグインで3Dを合成）に相当する拡張はここで受ける。
//	共通の箱（位置・回転・拡縮・Moveable）は`Layer.tsx`が持つので、
//	rendererは中身（Layer.tsxのchildren）だけを返せばよい
export type T_LAY_PLUGIN_ARG = {nm: string; ext: Record<string, unknown>};
export type T_LAY_PLUGIN_RENDERER = (arg: T_LAY_PLUGIN_ARG, cmn: T_LAY_CMN['cmn'])=> ReactNode;
const hPluginLayer = new Map<string, T_LAY_PLUGIN_RENDERER>();
export function registerLayerKind(kind: string, renderer: T_LAY_PLUGIN_RENDERER) {
	if (hPluginLayer.has(kind)) throw new Error(`registerLayerKind: '${kind}' は既に登録済みです`);
	hPluginLayer.set(kind, renderer);
}
export function getLayerRenderer(kind: string): T_LAY_PLUGIN_RENDERER | undefined {
	return hPluginLayer.get(kind);
}


// デザインモードのMoveableでドラッグしたか。ドラッグ終わりのクリックを
//	「読み進め」と取り違えないよう、各レイヤが動かした時に知らせてくる
let isDrag = false;
export const noticeDrag = ()=> {isDrag = true};
export const clearDrag = ()=> {isDrag = false};
export const isDragging = ()=> isDrag;

