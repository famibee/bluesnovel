/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2026-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import {focusMng} from '../ts/FocusMng';

import type {T_BTN_STY} from './TxtLayer';

import {css} from '@emotion/react';
import {type CSSProperties, type KeyboardEvent, type MouseEvent, useEffect, useRef} from 'react';


type T_BTNARG = {
	text	: string;
	label	: string;
	call	: boolean;
	fn		: string;
	sty?	: T_BTN_STY | undefined;
	onActivate: (label: string, call: boolean, fn: string)=> void;
};

// [button]の配置・寸法・変形をCSSへ（本家 Button.ts のコンストラクタ相当）。
//	**left/topが書かれた時だけ絶対配置**にする。本家は常に絶対配置（省略時0,0）だが、
//	試作のシナリオは複数ボタンを座標指定なしで並べており、既定を(0,0)にすると全部重なるため。
//	本家は width/height で文字そのものを引き伸ばす（pixiのText.width/heightは拡縮）。
//	こちらは箱の大きさとして扱い、文字は height をフォントサイズの基準にして収める
function styBtnArg(o: T_BTN_STY): CSSProperties {
	const sty: CSSProperties = {};
	if (o.left !== undefined || o.top !== undefined) {
		sty.position = 'absolute';
		sty.left = `${String(o.left ?? 0)}px`;
		sty.top = `${String(o.top ?? 0)}px`;
		sty.margin = 0;
	}
	if (o.width !== undefined) sty.width = `${String(o.width)}px`;
	if (o.height !== undefined) {
		sty.height = `${String(o.height)}px`;
		sty.fontSize = `${String(o.height)}px`;
		sty.lineHeight = 1;
		sty.padding = 0;
		sty.boxSizing = 'border-box';
	}
	if (o.alpha !== undefined) sty.opacity = o.alpha;
	if (o.rotation !== undefined || o.scale_x !== undefined || o.scale_y !== undefined
	 || o.pivot_x !== undefined || o.pivot_y !== undefined) {
		sty.transform = `rotate(${String(o.rotation ?? 0)}deg) scale(${String(o.scale_x ?? 1)}, ${String(o.scale_y ?? 1)})`;
		sty.transformOrigin = `${String(o.pivot_x ?? 0)}px ${String(o.pivot_y ?? 0)}px`;
	}
	if (o.blendmode !== undefined) sty.mixBlendMode = o.blendmode as CSSProperties['mixBlendMode'];
	// enabled=false：本家は文字を灰色にしてイベントも受けない（Button.ts の fill と evtMng.button）
	if (o.enabled === false) {sty.color = 'gray'; sty.borderColor = 'gray'; sty.pointerEvents = 'none'}
	return sty;
}

// [button layer=... text=... label=*goal] タグに対応するボタン1件分の表示。
//	文字レイヤ（TxtLayer）がUIコンテナとなり、この中に複数個並べて描画される
//	（独立レイヤにはしない＝表示/非表示や移動をTxtLayerと一緒にまとめて扱える）。
//	ポイント：ボタンのクリックは「読み進め」（Main.tsxのnext()）扱いにしない。
//	Stage.tsxのルートdivにonClick={next}が付いているため、ここでstopPropagation()して
//	クリックイベントの伝播を止め、Caretaker/isReadBackなどの読み進め系状態には一切触れずに
//	ScriptMng.jumpToLabelAndGo()経由で直接ジャンプ・進行させる。
export default function BtnLayer({text, label, call, fn, sty, onActivate}: T_BTNARG) {
	const styBtn = css`
		position: relative;
		z-index: 2;

		display: inline-block;
		padding: 0.6em 1.6em;
		margin: 0.5em;
		font-size: x-large;
		font-weight: bold;
		text-align: center;
		white-space: pre-wrap;
		color: #27acd9;
		border: 2px solid #27acd9;
		border-radius: 100vh;
		background-color: white;
		cursor: pointer;
		user-select: none;
		transition: 0.3s;
		&:hover {
			color: #fff;
			background-color: #27acd9;
		}
	`;

	const onClick = (e: MouseEvent)=> {
		e.stopPropagation();	// 親(Stage)のonClick(=読み進め)へ伝播させないのがポイント
		onActivate(label, call ?? false, fn);
	};

	// [set_focus to=next/prev]で巡回する対象として登録する（本家 EventMng.ts:435 で
	//	ゲーム内ボタンをFocusMngへ入れているのに対応）。表示されている間だけ輪に居ればよいので、
	//	マウント／アンマウントで出し入れする。spanなのでtabIndexを付けないとfocus()が効かない
	const ref = useRef<HTMLSpanElement>(null);
	useEffect(()=> {
		const el = ref.current;
		if (! el) return;

		focusMng.add(el);
		return ()=> focusMng.remove(el);
	}, []);
	// フォーカス中のEnter／Spaceで押下扱い（キーボードだけで操作できるように）
	const onKeyDown = (e: KeyboardEvent)=> {
		if (e.key !== 'Enter' && e.key !== ' ') return;

		e.stopPropagation();
		e.preventDefault();
		onActivate(label, call ?? false, fn);
	};

	// [button]で書かれた配置・寸法は既定スタイルの後ろに置いて上書きさせる
	return <span css={styBtn} style={sty ? styBtnArg(sty) : undefined} ref={ref}
		tabIndex={0} onClick={onClick} onKeyDown={onKeyDown}>{text}</span>;
}
