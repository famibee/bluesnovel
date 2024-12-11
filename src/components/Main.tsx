/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2024-2024 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import type {SysBase} from '../SysBase';
import type {T_LAY} from './Stage';
import {useStore, type T_CHGPIC, type T_CHGSTR} from '../store/store';

import {lazy, Suspense, useEffect} from 'react';
import {useKey} from 'react-use';
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
				const res = await fetch(url);
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
	const addLayer = useStore(s=> s.addLayer);
	const chgPic = useStore(s=> s.chgPic);
	const chgStr = useStore(s=> s.chgStr);
	function onClick() {
		if (sys.caretaker.afterKey()) return;

console.log(`fn:Main.tsx == next ==`);
		while (true) {
			const {done, value: o} = gen.next();
			if (done) break;

			// const key =
			sys.caretaker.key = 'main' + ':'+ ++idxDummy;
// console.log(`fn:Main.tsx == key(${key}) CMD:%o`, o);
			if ('cls' in o) addLayer(o); else
			if ('fn' in o) chgPic(o); else chgStr(o);
			break;
		}
	}
	// 初回処理
	useEffect(()=> onClick(), []);

	// イベント
	useKey('ArrowDown', e=> {
		e.stopPropagation();
		e.preventDefault();
		onClick();
	});
	useKey('ArrowUp', e=> {
		e.stopPropagation();
		e.preventDefault();
		sys.caretaker.beforeKey();
	});
// 	const mouseWheel = useMouseWheel();		//TODO: なぜかちらつく
// 	useEffect(()=> {
// // 		const isDown = yyy > mouseWheel ?'downwheel' :'upwheel';
// // console.log(`fn:Main.tsx line:88 ${isDown}`);
// 		if (deltaY_wheel > mouseWheel) onClick(); else sys.caretaker.beforeKey();
// 		deltaY_wheel = mouseWheel;
// 	}, [mouseWheel]);

	const Stage = lazy(()=> import('./Stage'));
	return <Suspense fallback={<>Loading</>}>
		<Stage arg={{heStage, sys}} onClick={onClick} />
	</Suspense>;
};
	let idxDummy = 0;
	// let deltaY_wheel = 0;
	const gen = generator();
	// NOTE: TS最新のジェネレーターみたいなので仮組み。詳細なスクリプトアナライザーなどは後に。
	function* generator(): Generator<T_LAY | T_CHGPIC | T_CHGSTR> {
		yield {cls: 'GRP', nm: 'base', fn: 'yun_1184'};
		yield {cls: 'TXT', nm: 'mes', str: 'あいうえお'};
		yield {nm: 'mes', str: 'かきくけこ'};
		yield {cls: 'GRP', nm: 'fg0', fn: 'F_1024a'};
		yield {nm: 'base', fn: 'yun_1317'};
	}
