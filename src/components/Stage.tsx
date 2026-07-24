/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2024-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import {CmnLib, uint} from '../sn/CmnLib';
import GrpLayer from './GrpLayer';
import TxtLayer from './TxtLayer';
import {clearDrag, isDragging, styLay, type T_LAY_CMN} from './Lay';
import {onLong, setDesignMode, type T_ARG} from './Main';
import {useStore} from '../store/store';
import {BaseMemento} from '../ts/Memento';

import {RefObject, useEffect, useLayoutEffect, useRef, useState} from 'react';
import {useFullscreen, useLongPress, useMount, useToggle} from 'react-use';
import {css} from '@emotion/react';
import gsap from 'gsap';

export default function Stage({
	arg: {heStage, sys, scrMng}, onClick, prev, next,
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

	// ステージ（＝ノベルゲームの表示範囲そのもの）の寸法は prj.json の window.width/height 固定。
	//	Config.generate() が CmnLib.stageW/stageH へ入れている
	const {stageW, stageH} = CmnLib;

	// 外側の <div id="skynovel"> にも、拡縮後の実寸を持たせる。
	//	transform: scale() はレイアウト上のサイズを変えないので、これをやらないと
	//	ページ側は等倍ぶんの領域を確保したまま（＝余白や不要なスクロールバーが出る）。
	//	overflow:hidden は内側にも掛けるが、拡縮の丸め誤差でのはみ出しを止めるため両方に置く
	useLayoutEffect(()=> {
		heStage.style.width		= `${String(stageW * cvsScale)}px`;
		heStage.style.height	= `${String(stageH * cvsScale)}px`;
		heStage.style.overflow	= 'hidden';
	}, [cvsScale, stageW, stageH]);

	// css
	//	ステージ本体。ここが座標系の原点かつ表示範囲で、はみ出したレイヤは切り取られる。
	//	背景は黒（画像を置いていない領域＝素通しの黒。[trans]中も同じ）
	const styStage = css`
		position: relative;
		width: ${stageW}px;
		height: ${stageH}px;
		overflow: hidden;
		background-color: black;

		transform-origin: left top;
		transform: scale(${cvsScale});
	`;
	const styChild = css`position: absolute; top: 0; left: 0;`;
	// HTMLフレーム（[add_frame]）の置き場所。**JSXでは子を持たない空div**にしてあり、
	//	FrameMng（DOM側）がここへiframeを足す。Reactは自分が作った子しか触らないので衝突しない。
	//	ステージ（拡縮される内側の箱）の中に置くので、位置・寸法はステージ座標のまま書けばよく、
	//	ウインドウリサイズ追従も勝手に効く（本家は毎回cvsScaleを掛けて書き直していた）。
	//	箱自体はクリックを通し（pointer-events: none）、iframe側だけが受ける
	const styFrames = css`
		position: absolute; top: 0; left: 0;
		width: 100%; height: 100%;
		z-index: 2;
		pointer-events: none;
	`;
	// 表裏それぞれのページを包むコンテナ。[trans]はこの「ステージ大の板」2枚をクロスフェードさせる
	//	（本家がページごとに板テクスチャを作って重ねるのと同じ絵）。
	//	不透明な黒地にしておくことで、画像の無い部分は黒く塗り潰される
	const styPage = css`
		position: absolute; top: 0; left: 0;
		width: 100%;
		height: 100%;
		overflow: hidden;
		background-color: black;
	`;

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
	const stageRef = useRef<HTMLDivElement>(null) as RefObject<HTMLDivElement>;
	// HTMLフレームの置き場所をFrameMng（DOM側）へ渡す
	const frmRef = useRef<HTMLDivElement>(null);
	useMount(()=> {scrMng.attachFrameBox(frmRef.current!)});

	useMount(()=> {
		const div = stageRef.current!;
		div.addEventListener('mousedown', ()=> clearDrag());

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

		if (isDragging()) return;
		tglDesignMode();
		setDesignMode(! isDesignMode);	// React のくせで取れないので
	}, {isPreventDefault: true, delay: 300,});

	// 全画面表示。[toggle_full_screen]（＝ストアのfullScr）が「こうしたい」を持ち、
	//	実際にそうなったかはuseFullscreenの戻り値。Escでの解除などブラウザ都合の変化もあるので、
	//	実状態をエンジンの組み込み変数const.sn.displayStateへ書き戻す
	//	（本家もSysWebがfullscreenchangeを拾ってisFullScrを直している）
	const fullScr = useStore(s=> s.fullScr);
	const setFullScr = useStore(s=> s.setFullScr);
	const tglFlScr = useStore(s=> s.toggleFullScr);
	const isFullscreen = useFullscreen(stageRef, fullScr, {onClose: ()=> setFullScr(false)});
	useEffect(()=> {scrMng.setFullScr(isFullscreen)}, [isFullscreen]);

	const c: T_LAY_CMN = {cmn: {sys, styChild, isDesignMode, sty4Moveable: {
		maxWidth	: 'auto',
		maxHeight	: 'auto',
		minWidth	: 'auto',
		minHeight	: 'auto',
		transform	: 'translate(0px, 0px) rotate(0deg)',
	}}};
	return <div css={styStage} onClick={onClick} {...longPressEvent} ref={stageRef}>
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
				// [lay]で指定したレイヤ共通の見た目。デザインモードのMoveableが直接styleを触るので、
				//	そちらの値（sty4Moveable）より後ろに置いて優先させる
				const sty = {...c.cmn.sty4Moveable, ...styLay(l)};
				if (l.cls === 'grp') return <GrpLayer key={l.nm} cmn={c.cmn} sty={sty} fn={l.fn} src={l.src} aFace={l.aFace}/>;
				// 文字レイヤ自体をUIコンテナとし、[button]で乗せたボタン群（l.aBtn）をTxtLayer内で一緒に描画する（独立レイヤにしない）。
				return <TxtLayer key={l.nm} cmn={c.cmn} sty={sty} nm={l.nm} isFore={i === foreIdx} str={l.str} b_color={l.b_color} b_alpha={l.b_alpha} styTxt={l.style} enabled={l.enabled} aBtn={l.aBtn} onActivate={(label, call, fn)=> scrMng.jumpToLabelAndGo(label, call, fn)}/>;
			})}
		</div>)}
		<div ref={frmRef} css={styFrames}/>
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
