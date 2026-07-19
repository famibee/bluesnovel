/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2024-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import type {SysBase} from '../sn/SysBase';
import type {ScriptMng} from '../ts/ScriptMng';
import type {T_HTag} from '../sn/Grammar';

import {useStore} from '../store/store';
import {lazy, Suspense} from 'react';
import {useEffectOnce, useKey, useTitle} from 'react-use';
import type {Root} from 'react-dom/client';

export type T_ARG = {
	heStage	: HTMLElement;
	sys		: SysBase;
	scrMng	: ScriptMng;
};


export function initMain(root: Root, arg: T_ARG, inited: ()=> void) {
	root.render(<Main arg={arg} inited={inited} />);
}

export function Main({arg, inited}: {arg: T_ARG, inited: ()=> void}) {
	const {heStage, sys, scrMng} = arg;
	const title = useStore(s=> s.title);
	const addTitle = useStore(s=> s.addTitle);
	useTitle(title);

	const addLayer = useStore(s=> s.addLayer);
	const chgPic = useStore(s=> s.chgPic);
	const chgStr = useStore(s=> s.chgStr);
	const setReadBack = useStore(s=> s.setReadBack);
	function procNext() {scrMng.go()}
	useEffectOnce(()=> {
		addTitle(sys.cfg.oCfg.book.title);
		const hTag: T_HTag		= Object.create(null);	// タグ処理辞書
		scrMng.attachTsx(()=> heStage.dispatchEvent(new CustomEvent('ev_next', {})), {addLayer, chgPic, chgStr, addTitle}, hTag);

		inited();

		heStage.addEventListener('ev_next', procNext as EventListenerOrEventListenerObject);
		return ()=> heStage.removeEventListener('ev_next', procNext);
	});

	// イベント
	// space/クリック = 既存の読み戻り範囲内なら読み進め、最新なら未読を進める
	// PageDown = 読み進め（next()と同じ扱い）／PageUp = 読み戻り
	//	読み戻り中（Caretaker.isLast()===false）はTxtLayerで文字を黄色く表示する
	function next() {
		if (sys.caretaker.nextKey()) {setReadBack(! sys.caretaker.isLast()); return}
		setReadBack(false);
		procNext();
	}
	function prev() {
		if (sys.caretaker.prevKey()) setReadBack(! sys.caretaker.isLast());
	}
	useKey(e=> e.code === 'Space', e=> {e.stopPropagation(); e.preventDefault(); next()});
	useKey(e=> e.code === 'PageDown', e=> {e.stopPropagation(); e.preventDefault(); next()});
	useKey(e=> e.code === 'PageUp', e=> {e.stopPropagation(); e.preventDefault(); prev()});

	function onClick() {
		if (isLong) {isLong = false; return}
		if (isDesignMode) return;
		next();
	}

	const Stage = lazy(()=> import('./Stage'));
	return <Suspense fallback={<>Loading</>}>
		<Stage arg={arg} next={next} prev={prev} onClick={onClick} />
	</Suspense>;
};

let isDesignMode = false;	// この形でないとちらつく
export const setDesignMode = (b: boolean)=> isDesignMode = b;

let isLong = false;
export function onLong() {isLong = true}
