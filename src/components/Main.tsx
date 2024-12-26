/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2024-2024 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import type {SysBase} from '../ts/SysBase';
import type {T_LAY} from './Stage';
import {useStore, type T_CHGPIC, type T_CHGSTR} from '../store/store';

import {lazy, Suspense} from 'react';
import {useEffectOnce, useKey, useTitle} from 'react-use';
import {extensions, ExtensionType} from '@pixi/extensions';

export type T_ARG = {
	heStage	: HTMLElement;
	sys		: SysBase;
};


export async function opening({heStage, sys}: T_ARG) {
	const {createRoot} = await import('react-dom/client');
	createRoot(heStage).render(<Main heStage={heStage} sys={sys} />);

	await Promise.all([
		import('@pixi/assets'),
		import('../ts/ScriptMng'),
	]).then(async ([{Assets}, {ScriptMng}])=> {
		await Assets.init({basePath: location.origin});
		extensions.add({
			extension: {
				type: ExtensionType.LoadParser,
				name: 'sn-loader',
				//priority: LoaderParserPriority.High,
			},
			test: (url: string)=> url.endsWith('.sn'),
			load: (url: string)=> new Promise(async (re, rj)=> {
				const res = await sys.fetch(url);
				if (! res.ok) {rj(`sn-loader fetch err:`+ res.statusText); return}
	
				try {
					re(await sys.dec('sn', await res.text()));
				} catch (e) {rj(`sn-loader err url:${url} ${e}`)}
			}),
		});



		const scrMng = new ScriptMng(sys, Assets);
		await scrMng.load('main');
	});
}


function Main({heStage, sys}: T_ARG) {
	useTitle(sys.cfg.oCfg.book.title);

	const addLayer = useStore(s=> s.addLayer);
	const chgPic = useStore(s=> s.chgPic);
	const chgStr = useStore(s=> s.chgStr);
	function next() {
console.log(`fn:Main.tsx == next ==`);
		while (true) {
			const {done, value: o} = gen.next();
			if (done) break;

			sys.caretaker.key = 'main' + ':'+ ++idxDummy;
			if ('cls' in o) addLayer(o); else
			if ('fn' in o) chgPic(o); else chgStr(o);
			break;
		}
	}
	useEffectOnce(()=> next());

	// イベント
	function after() {if (! sys.caretaker.afterKey()) next()}
	useKey('ArrowDown', e=> {e.stopPropagation(); e.preventDefault(); after()});
	function before() {sys.caretaker.beforeKey()}
	useKey('ArrowUp', e=> {e.stopPropagation(); e.preventDefault(); before()});

	function onClick() {
		if (isLong) {isLong = false; return}
		if (isDesignMode) return;

		after();
	}

	const Stage = lazy(()=> import('./Stage'));
	return <Suspense fallback={<>Loading</>}>
		<Stage arg={{heStage, sys}} onClick={onClick}
		after={after} before={before} />
	</Suspense>;
};
	let idxDummy = 0;
	const gen = generator();
	// NOTE: TS最新のジェネレーターみたいなので仮組み。詳細なスクリプトアナライザーなどは後に。
	function* generator(): Generator<T_LAY | T_CHGPIC | T_CHGSTR> {
		yield {cls: 'GRP', nm: 'base', fn: 'yun_1184'};
		yield {cls: 'TXT', nm: 'mes', str: 'あいうえお'};
		yield {nm: 'mes', str: 'かきくけこ'};
		yield {cls: 'GRP', nm: 'fg0', fn: 'F_1024a'};
		yield {nm: 'base', fn: 'yun_1317'};
	}

let isDesignMode = false;	// この形でないとちらつく
export const setDesignMode = (b: boolean)=> isDesignMode = b;

let isLong = false;
export function onLong() {isLong = true}
