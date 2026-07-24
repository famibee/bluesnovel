/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2026-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import {focusMng} from '../ts/FocusMng';

import {css} from '@emotion/react';
import {type KeyboardEvent, type MouseEvent, useEffect, useRef} from 'react';


type T_BTNARG = {
	text	: string;
	label	: string;
	call	: boolean;
	fn		: string;
	onActivate: (label: string, call: boolean, fn: string)=> void;
};

// [button layer=... text=... label=*goal] タグに対応するボタン1件分の表示。
//	文字レイヤ（TxtLayer）がUIコンテナとなり、この中に複数個並べて描画される
//	（独立レイヤにはしない＝表示/非表示や移動をTxtLayerと一緒にまとめて扱える）。
//	ポイント：ボタンのクリックは「読み進め」（Main.tsxのnext()）扱いにしない。
//	Stage.tsxのルートdivにonClick={next}が付いているため、ここでstopPropagation()して
//	クリックイベントの伝播を止め、Caretaker/isReadBackなどの読み進め系状態には一切触れずに
//	ScriptMng.jumpToLabelAndGo()経由で直接ジャンプ・進行させる。
export default function BtnLayer({text, label, call, fn, onActivate}: T_BTNARG) {
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

	return <span css={styBtn} ref={ref} tabIndex={0} onClick={onClick} onKeyDown={onKeyDown}>{text}</span>;
}
