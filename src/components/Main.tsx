/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2024-2024 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import type {SysBase} from '../ts/SysBase';
import type {T_LAY} from './Stage';
import type {ScriptMng} from '../ts/ScriptMng';

import {useStore, type T_CHGPIC, type T_CHGSTR} from '../store/store';
import {lazy, Suspense, useEffect} from 'react';
import {useKey, useTitle} from 'react-use';
import type {Root} from 'react-dom/client';

export type T_ARG = {
	heStage	: HTMLElement;
	sys		: SysBase;
};

type T_GEN = Generator<T_LAY | T_CHGPIC | T_CHGSTR>;


export function initMain(root: Root, {heStage, sys}: T_ARG) {
	$heStage = heStage;
	// $sys = sys;

	root.render(<Main heStage={heStage} sys={sys} />);
}
	let $heStage: HTMLElement;
	// let $sys: SysBase;

export async function start(scrMng: ScriptMng) {
	function* gene(): T_GEN {
		yield {cls: 'GRP', nm: 'base', fn: 'yun_1184'};
		yield {cls: 'TXT', nm: 'mes', str: 'あいうえお'};
		yield {nm: 'mes', str: 'かきくけこ'};
		yield {cls: 'GRP', nm: 'fg0', fn: 'F_1024a'};
		yield {nm: 'base', fn: 'yun_1317'};
	}
	gen = gene();

	await scrMng.load('main');

	trgNext();
}
function trgNext() {$heStage.dispatchEvent(new CustomEvent('ev_next', {}));}


export function Main({heStage, sys}: T_ARG) {
	useTitle(sys.cfg.oCfg.book.title);

	const addLayer = useStore(s=> s.addLayer);
	const chgPic = useStore(s=> s.chgPic);
	const chgStr = useStore(s=> s.chgStr);
	function procNext() {
console.log(`fn:Main.tsx == next ==`);
		while (true) {
			const {done, value: o} = gen.next();
			if (done) break;

			sys.caretaker.push('main' + ':'+ ++idxDummy);
			if ('cls' in o) addLayer(o); else
			if ('fn' in o) chgPic(o); else chgStr(o);
			break;
		}
	}
	useEffect(()=> {
		heStage.addEventListener('ev_next', procNext as EventListenerOrEventListenerObject);
		return ()=> heStage.removeEventListener('ev_next', procNext);
	}, []);

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
		<Stage arg={{heStage, sys}} next={next} prev={prev} onClick={onClick} />
	</Suspense>;
};
	let idxDummy = 0;
	function* generator(): T_GEN {}
	let gen = generator();

let isDesignMode = false;	// この形でないとちらつく
export const setDesignMode = (b: boolean)=> isDesignMode = b;

let isLong = false;
export function onLong() {isLong = true}
