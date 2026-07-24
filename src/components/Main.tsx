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

const Stage = lazy(()=> import('./Stage'));
	// コンポーネント内で呼ぶと再レンダー毎に新しいコンポーネント型が生成され、
	// Stage以下が毎回アンマウント/再マウントされてちらつくので、必ずトップレベルで一度だけ生成する

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
	const chgBAlpha = useStore(s=> s.chgBAlpha);
	const chgStr = useStore(s=> s.chgStr);
	const chgLay = useStore(s=> s.chgLay);
	const clearLay = useStore(s=> s.clearLay);
	const enableEvent = useStore(s=> s.enableEvent);
	const addBtn = useStore(s=> s.addBtn);
	const setReadBack = useStore(s=> s.setReadBack);
	const isTyping = useStore(s=> s.isTyping);
	const requestSkip = useStore(s=> s.requestSkip);
	const setWait = useStore(s=> s.setWait);
	const setSkipping = useStore(s=> s.setSkipping);
	const startTrans = useStore(s=> s.startTrans);
	const finishTrans = useStore(s=> s.finishTrans);
	function procNext() {scrMng.go()}
	useEffectOnce(()=> {
		addTitle(sys.cfg.oCfg.book.title);
		const hTag: T_HTag		= Object.create(null);	// タグ処理辞書
		scrMng.attachTsx(()=> heStage.dispatchEvent(new CustomEvent('ev_next', {})), {addLayer, chgPic, chgBAlpha, chgStr, chgLay, clearLay, enableEvent, addBtn, addTitle, setWait, requestSkip, setSkipping, startTrans, finishTrans}, hTag);

		inited();

		heStage.addEventListener('ev_next', procNext as EventListenerOrEventListenerObject);
		return ()=> heStage.removeEventListener('ev_next', procNext);
	});

	// イベント
	// space/クリック = 既存の読み戻り範囲内なら読み進め、最新なら未読を進める
	// PageDown = 読み進め（next()と同じ扱い）／PageUp = 読み戻り
	//	読み戻り中（Caretaker.isLast()===false）はTxtLayerで文字を黄色く表示する
	function next() {
		if (isTyping) {requestSkip(); return}	// 文字送り演出中の1クリック目は瞬時完了のみ行い、進行はしない
		if (sys.caretaker.nextKey()) {setReadBack(! sys.caretaker.isLast()); return}
		setReadBack(false);
		procNext();
	}
	function prev() {
		if (sys.caretaker.prevKey()) setReadBack(! sys.caretaker.isLast());
	}
	// [event]で予約したキー名は「KeyboardEvent.keyの小文字」、クリックは'click'という取り決め
	//	（本家 EventMng が 'enter'/'arrowdown'/'click' 等の小文字キーで引くのに合わせた）。
	//	予約があればそちらを発火し、読み進め・読み戻りは行わない
	useKey(()=> true, e=> {
		scrMng.cancelAuto();	// 手動操作が入ったらオート読み・既読スキップは止める（本家 cancelAutoSkip）
		if (scrMng.fireEvent(e.key.toLowerCase())) {e.stopPropagation(); e.preventDefault(); return}

		switch (e.code) {
			case 'Space':
			case 'ArrowDown':
			case 'PageDown':	e.stopPropagation(); e.preventDefault(); next();	break;
			case 'PageUp':		e.stopPropagation(); e.preventDefault(); prev();	break;
		}
	});

	function onClick() {
		if (isLong) {isLong = false; return}
		if (isDesignMode) return;
		scrMng.cancelAuto();	// 手動クリックでオート読み・既読スキップを止める
		if (scrMng.fireEvent('click')) return;
		next();
	}

	return <Suspense fallback={<>Loading</>}>
		<Stage arg={arg} next={next} prev={prev} onClick={onClick} />
	</Suspense>;
};

let isDesignMode = false;	// この形でないとちらつく
export const setDesignMode = (b: boolean)=> isDesignMode = b;

let isLong = false;
export function onLong() {isLong = true}
