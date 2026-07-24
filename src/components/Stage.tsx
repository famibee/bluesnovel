/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2024-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import type {SysBase} from '../sn/SysBase';
import {CmnLib, uint} from '../sn/CmnLib';
import GrpLayer, {type T_GRPLAY_DATA} from './GrpLayer';
import TxtLayer, {type T_TXTLAY_DATA} from './TxtLayer';
import {onLong, setDesignMode, type T_ARG} from './Main';
import {useStore} from '../store/store';
import {BaseMemento} from '../ts/Memento';

import {RefObject, useEffect, useRef, useState} from 'react';
import {useFullscreen, useLongPress, useMount, useToggle} from 'react-use';
import {css, type SerializedStyles} from '@emotion/react';
import gsap from 'gsap';

export type T_LAY_IDX = {
	cls		: 'grp'|'txt';
	nm		: string;
};
export type T_LAY_CMN = {
	cmn: {
		sys			: SysBase;
		styChild	: SerializedStyles;
		isDesignMode: boolean;
		sty4Moveable: any;
		visible?	: boolean;
	};
};
export type T_LAY = T_GRPLAY_DATA | T_TXTLAY_DATA;


export default function Stage({
	arg: {sys, scrMng}, onClick, prev, next,
}: {
	arg: T_ARG, onClick: ()=> void, prev: ()=> void, next: ()=> void,
}) {
// console.log(`fn:Stage.tsx 0`);
	const aPage = useStore(s=> s.aPage);
	const foreIdx = useStore(s=> s.foreIdx);
	const trans = useStore(s=> s.trans);

	const replace = useStore(s=> s.replace);
	class Memento extends BaseMemento {
		readonly	nm = 'Stage';
		restore() {replace(this.stt)}	// this.stt から
	}
	// 読み戻しでは表裏どちらのページも、どちらが表かも含めて丸ごと復元する
	sys.caretaker.update(()=> new Memento(JSON.stringify({aPage, foreIdx})));

	// [trans]のクロスフェード。**ここは見た目を動かすだけ**で、表裏の交換そのものは
	//	ScriptMngがstore.finishTrans()で宣言する（store.tsxのtransのコメント参照）。
	//	・表ページを`time`かけてopacity 1→0にし、下から裏ページを出す（＝本家の板テクスチャ2枚のクロスフェードと同じ絵）
	//	・「裏を前面に置いてopacity 0→1」でも枚数・負荷は同じだが、裏ページに絵の無い部分があると
	//	　そこから表ページが透けたまま最後に消える＝完了の瞬間にパッと消えるため採らない。
	//	　表を消す向きなら、演出中に見えている下の絵が最終状態そのものなので破綻しない
	//	・store.transがnullに戻ったら（＝終了宣言）演出を止め、透明度を元へ戻す。
	//	　途中で止められても必ずこの形に落ちるので、中途半端な見た目のまま残らない
	//	　（本家 CmnTween.stopEndTrans() の stop().end() と同じ考え方）
	const pgRef0 = useRef<HTMLDivElement>(null);
	const pgRef1 = useRef<HTMLDivElement>(null);
	const aPgRef = [pgRef0, pgRef1];
	const twRef = useRef<gsap.core.Tween | null>(null);
	useEffect(()=> {
		twRef.current?.kill();
		twRef.current = null;
		if (! trans) {	// 終了（またはそもそも演出なし）
			gsap.set([pgRef0.current, pgRef1.current].filter(e=> e !== null), {opacity: 1});
			return;
		}

		const el = aPgRef[foreIdx]!.current;
		if (! el) return;
		twRef.current = gsap.to(el, {opacity: 0, duration: trans.time / 1000, ease: 'none'});
	}, [trans]);

	// ウインドウサイズ追従
	const [wh, setWH] = useState<T_WH>(innWH());
	useMount(()=> {
		function onResize() {setWH(innWH())}
		globalThis.addEventListener('resize', onResize);
		return ()=> globalThis.removeEventListener('resize', onResize);
	});
	const {cvsScale} = calcScale(wh);

	// css
	const styParent = css`
		position: relative;

		transform-origin: left top;
		transform: scale(${cvsScale});
	`;
		// 有効にするとスケーラブルでなくなる、本番用か
		// width	: calc(${CmnLib.stageW}px / ${cvsScale});
		// height	: calc(${CmnLib.stageH}px / ${cvsScale});
	const styChild = css`position: absolute; top: 0; left: 0;`;
	// 表裏それぞれのページを包むコンテナ。z-index・opacityを効かせるためpositionを持たせる
	//	（子レイヤはstyChildで絶対配置されるので、この要素自体のサイズは0のままでよい）
	const styPage = css`position: absolute; top: 0; left: 0;`;

	const styBtn = css`
		position: relative; z-index: 1;

		display: inline-block;
		text-align: center;
		vertical-align: middle;
		text-decoration: none;
		width: 120px;
		margin: auto;
		padding: 1rem 4rem;
		font-weight: bold;
		border: 2px solid #27acd9;
		color: #27acd9;
		border-radius: 100vh;
		transition: 0.5s;
		top: 48%;
		&:hover {
			color: #fff;
			background: #27acd9;
		}
	`;

	// useMouseWheel だと preventDefault() できないので手作り
	const divRef = useRef<HTMLDivElement>(null) as RefObject<HTMLDivElement>;
	// const divRef = useRef<HTMLDivElement>(null);
	useMount(()=> {
		const div = divRef.current!;
		div.addEventListener('mousedown', ()=> isDrag = false);

		const fnc = (e: WheelEvent)=> {
			e.preventDefault();
			if (e.deltaY < 0) next(); else prev();
		}
		div.addEventListener('wheel', fnc, {passive: false});
		return ()=> div.removeEventListener('wheel', fnc);
	});

	const [isDesignMode, tglDesignMode] = useToggle(false);

	const longPressEvent = useLongPress(e=> {
		e.stopPropagation();	// でも止まらない
		onLong();			// これで止める

		if (isDrag) return;
		tglDesignMode();
		setDesignMode(! isDesignMode);	// React のくせで取れないので
	}, {isPreventDefault: true, delay: 300,});

	const [show, tglFlScr] = useToggle(false);
	const isFullscreen = useFullscreen(divRef, show, {onClose: ()=> tglFlScr(false)});

	const c: T_LAY_CMN = {cmn: {sys, styChild, isDesignMode, sty4Moveable: {
		maxWidth	: 'auto',
		maxHeight	: 'auto',
		minWidth	: 'auto',
		minHeight	: 'auto',
		transform	: 'translate(0px, 0px) rotate(0deg)',
	}}};
	return <div css={styParent} onClick={onClick} {...longPressEvent} ref={divRef}>
		{isDesignMode && <>
			<button onClick={()=> tglFlScr()} css={styBtn}>FullScr</button>
			<button onClick={()=> {}} css={styBtn}>Back</button>
			<button onClick={()=> {}} css={styBtn}>Prev</button>
		</>}
		{<span>{isFullscreen}</span>}
		{/* 表裏2枚のページ。**どちらも常にマウントしたまま**にし、[trans]では中身ではなく
			「どちらを表とみなすか」（foreIdx）だけを切り替える。中身を入れ替えるとTxtLayerが
			文字送り演出をやり直してしまうため（store.tsx aPage のコメント参照）。
			裏ページはトランジション中だけ見せる。クリックは常に表ページだけが受ける */}
		{aPage.map((aLay, i)=> <div key={i} ref={aPgRef[i]} data-page={i === foreIdx ? 'fore' : 'back'} css={styPage} style={{
			zIndex			: i === foreIdx ? 1 : 0,
			visibility		: i === foreIdx || trans ? 'visible' : 'hidden',
			pointerEvents	: i === foreIdx ? 'auto' : 'none',
		}}>
			{aLay.map(l=> {
				if (l.cls === 'grp') return <GrpLayer key={l.nm} cmn={c.cmn} fn={l.fn} aFace={l.aFace}/>;
				// 文字レイヤ自体をUIコンテナとし、[button]で乗せたボタン群（l.aBtn）をTxtLayer内で一緒に描画する（独立レイヤにしない）。
				return <TxtLayer key={l.nm} cmn={c.cmn} nm={l.nm} isFore={i === foreIdx} str={l.str} b_alpha={l.b_alpha} aBtn={l.aBtn} onActivate={(label, call, fn)=> scrMng.jumpToLabelAndGo(label, call, fn)}/>;
			})}
		</div>)}
	</div>;
};
	type T_WH = {
		width	: number;
		height	: number;
	};
	function calcScale({width: w, height: h}: T_WH) {
		let cvsWidth = 0;
		let cvsHeight = 0;
		let cvsScale = 1;

		// const cr = heStage.getBoundingClientRect();
		// if (argChk_Boolean(CmnLib.hDip, 'expanding', true) || isGallery
		if (CmnLib.stageW > w
			|| CmnLib.stageH > h) {
			if (CmnLib.stageW / CmnLib.stageH <= w / h) {
				cvsHeight = h;
				cvsWidth = uint(CmnLib.stageW / CmnLib.stageH * h);
				// cvsWidth  = CmnLib.stageW /CmnLib.stageH *h;
			}
			else {
				cvsWidth = w;
				cvsHeight = uint(CmnLib.stageH / CmnLib.stageW * w);
				// cvsHeight = CmnLib.stageH /CmnLib.stageW *w;
			}
			cvsScale = cvsWidth / CmnLib.stageW;
			// if (isGallery) {
			// 	ofsPadLeft_Dom2PIXI	= 0;
			// 	ofsPadTop_Dom2PIXI	= 0;
			// }
			// else {
			// const sc = 1 -cvsScale;
			// if (CmnLib.isMobile) {
			// 	ofsPadLeft_Dom2PIXI = (w -cvsWidth) /2 *sc;
			// 	ofsPadTop_Dom2PIXI  = (h -cvsHeight)/2 *sc;
			// }
			// else {
			// 	ofsPadLeft_Dom2PIXI = cr.left*sc;
			// 	ofsPadTop_Dom2PIXI  = cr.top *sc;
			// }
			// [left] /cvsScale -[left]
			// PaddingLeft を DOMで引いてPIXIで足すイメージ
			// }
		}
		else {
			cvsWidth = CmnLib.stageW;
			cvsHeight = CmnLib.stageH;
			cvsScale = 1;
			// ofsPadLeft_Dom2PIXI	= 0;
			// ofsPadTop_Dom2PIXI	= 0;
		}
		return {cvsScale, cvsWidth, cvsHeight};
	}
	function innWH(): T_WH {
		const {innerWidth: width, innerHeight: height} = globalThis;
		return {width, height};
	}

	let isDrag = false;
export const noticeDrag = ()=> {isDrag = true}