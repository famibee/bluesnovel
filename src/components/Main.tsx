/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2024-2024 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import type {SysBase} from '../ts/SysBase';
import type {ScriptMng} from '../ts/ScriptMng';
import type {IHTag} from '../ts/Grammar';

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
	function procNext() {scrMng.go()}
	useEffectOnce(()=> {
		addTitle(sys.cfg.oCfg.book.title)
		const hTag: IHTag		= Object.create(null);	// タグ処理辞書
		scrMng.attachTsx(()=> heStage.dispatchEvent(new CustomEvent('ev_next', {})), {addLayer, chgPic, chgStr, addTitle}, hTag);

		inited();

		heStage.addEventListener('ev_next', procNext as EventListenerOrEventListenerObject);
		return ()=> heStage.removeEventListener('ev_next', procNext);
	});

	// イベント
	function next() {if (! sys.caretaker.nextKey()) procNext()}
	useKey('ArrowDown', e=> {e.stopPropagation(); e.preventDefault(); next()});
	function prev() {sys.caretaker.prevKey()}
	useKey('ArrowUp', e=> {e.stopPropagation(); e.preventDefault(); prev()});

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
