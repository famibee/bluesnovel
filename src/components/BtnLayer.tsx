/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2026-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import {focusMng} from '../ts/FocusMng';

import type {T_BTN_STY} from './TxtLayer';

import {css} from '@emotion/react';
import {type CSSProperties, type KeyboardEvent, type MouseEvent, useEffect, useLayoutEffect, useRef, useState} from 'react';


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
//	試作のシナリオは座標指定なしで複数並べており、既定を(0,0)にすると全部重なるため。
//	fit は「文字を箱(width×height)ちょうどに収める倍率」。本家は pixi Text.width/height が
//	文字スプライトを拡縮して箱に合わせる（短い文字は広げ、長い文字は縮めて1行に収める）が、
//	CSSに相当機能が無いのでBtnLayer側で実測した倍率を transform:scale として合成する。
function styBtnArg(o: T_BTN_STY, fit: {x: number; y: number}): CSSProperties {
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
		sty.fontSize = `${String(o.height)}px`;	// 本家も fontSize:height（Button.ts:133）
		sty.lineHeight = 1;
		sty.padding = 0;	// 箱に文字をぴったり収めたいので、座標指定ボタンはpadding無し（fit実測の基準を素の文字寸法にする）
		sty.boxSizing = 'border-box';
	}
	if (o.alpha !== undefined) sty.opacity = o.alpha;

	// 変形：回転・拡縮に加え、上記フィット倍率(fit)を掛ける（fitはwidth指定時のみ1以外になる）。
	//	フィットは中央基準で効かせる（本家 align:'center' 相当）。fitを使わない時は本家pivot（既定左上）を原点に。
	const sx = (o.scale_x ?? 1) * fit.x;
	const sy = (o.scale_y ?? 1) * fit.y;
	const fitting = fit.x !== 1 || fit.y !== 1;
	if (o.rotation !== undefined || o.scale_x !== undefined || o.scale_y !== undefined
	 || o.pivot_x !== undefined || o.pivot_y !== undefined || fitting) {
		sty.transform = `rotate(${String(o.rotation ?? 0)}deg) scale(${String(sx)}, ${String(sy)})`;
		sty.transformOrigin = fitting
			? 'center'
			: `${String(o.pivot_x ?? 0)}px ${String(o.pivot_y ?? 0)}px`;
	}
	if (o.blendmode !== undefined) sty.mixBlendMode = o.blendmode as CSSProperties['mixBlendMode'];
	// enabled=false：本家は文字を灰色にしてイベントも受けない（Button.ts の fill と evtMng.button）
	if (o.enabled === false) {sty.color = 'gray'; sty.pointerEvents = 'none'}
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
	// 既定の見た目は**本家 Button.ts のデフォルト TextStyle**に寄せる（tag.html#button のデフォルトstyle）：
	//	fill:black / align:center / fontFamily:Hiragino系 / padding:5 /
	//	dropShadow:white・alpha0.7・blur7・distance0（＝CSSの text-shadow: 0 0 7px rgba(255,255,255,.7)）。
	//	本家は文字だけのボタン（枠・背景なし）なので、以前の丸枠ピル装飾は撤去した。
	//	hover は本家 style_hover.fill='white' に合わせて白へ。
	//	white-space:nowrap で1行を保ち、width指定時は上の fit（transform:scale）で箱幅に収める。
	const styBtn = css`
		position: relative;
		z-index: 2;

		display: inline-block;
		box-sizing: border-box;
		margin: 0.3em;
		padding: 5px;
		font-family: 'Hiragino Sans', 'Hiragino Kaku Gothic ProN', '游ゴシック Medium', meiryo, sans-serif;
		font-size: x-large;
		/* 本家 Button.ts の TextStyle は fontWeight を指定しない＝normal。boldにすると線が太く重く見え、
			渡されたjpg（本家の実描画）より太く・縦長に見えていた。normalへ戻して本家に合わせる */
		font-weight: normal;
		text-align: center;
		/* pre：スペースをそのまま保持する（nowrapだと連続スペース圧縮＋端のスペース除去で、
			本家 ext_lang.sn の ' ロード ' / ' 設 定 ' のような余白入りラベルが詰められてしまう）。
			preも折り返さないのでフィット（1行維持）は変わらない */
		white-space: pre;
		color: black;
		text-shadow: 0 0 7px rgba(255, 255, 255, 0.7);
		cursor: pointer;
		user-select: none;
		transition: color 0.3s;
		&:hover {color: white;}
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

	// [button width=（height=）]指定時、文字を箱ちょうどに収める倍率を**実測**する（本家 pixi
	//	Text.width/height 相当。CSSに文字フィットが無いための代替）。幅制約と変形を一時的に外して
	//	素の文字寸法(offsetWidth/Height＝変形非依存・CSS px)を測り、箱寸法との比を fit として scale へ渡す。
	//	useLayoutEffect なので描画前に確定し、未縮小の文字が一瞬はみ出すチラつきは出ない。
	const [fit, setFit] = useState({x: 1, y: 1});
	useLayoutEffect(()=> {
		const el = ref.current;
		if (! el || ! sty || sty.width === undefined) {setFit({x: 1, y: 1}); return}

		const {width: bw, height: bh} = sty;
		const pW = el.style.width, pT = el.style.transform, pWs = el.style.whiteSpace;
		el.style.width = 'auto'; el.style.transform = 'none'; el.style.whiteSpace = 'pre';
		const natW = el.offsetWidth, natH = el.offsetHeight;
		el.style.width = pW; el.style.transform = pT; el.style.whiteSpace = pWs;

		setFit({
			x: natW > 0 ? bw / natW : 1,
			y: (bh !== undefined && natH > 0) ? bh / natH : 1,
		});
	}, [text, sty?.width, sty?.height]);
	// フォーカス中のEnter／Spaceで押下扱い（キーボードだけで操作できるように）
	const onKeyDown = (e: KeyboardEvent)=> {
		if (e.key !== 'Enter' && e.key !== ' ') return;

		e.stopPropagation();
		e.preventDefault();
		onActivate(label, call ?? false, fn);
	};

	// [button]で書かれた配置・寸法は既定スタイルの後ろに置いて上書きさせる
	return <span css={styBtn} style={sty ? styBtnArg(sty, fit) : undefined} ref={ref}
		tabIndex={0} onClick={onClick} onKeyDown={onKeyDown}>{text}</span>;
}
