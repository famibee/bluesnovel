/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2024-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import {CmnLib, argChk_Boolean, uint} from '../sn/CmnLib';
import GrpLayer from './GrpLayer';
import TxtLayer from './TxtLayer';
import {clearDrag, isDragging, styLay, type T_LAY_CMN} from './Lay';
import {onLong, setDesignMode, type T_ARG} from './Main';
import {useStore} from '../store/store';
import {ruleMaskFunc} from '../ts/Trans';
import {fltId, fltValues, matsOf, blurId, blurValues, blursOf} from '../ts/Filter';

import {RefObject, useEffect, useLayoutEffect, useRef, useState} from 'react';
import {useFullscreen, useLongPress, useMount, useToggle} from 'react-use';
import {css} from '@emotion/react';
import gsap from 'gsap';

// **デザインモード（長押しで入る）の有効・無効**。詳細は下の useLongPress のTODO参照
const ENA_DESIGN_MODE = false;

export default function Stage({
	arg: {heStage, sys, scrMng}, onClick, prev, next,
}: {
	arg: T_ARG, onClick: ()=> void, prev: ()=> void, next: ()=> void,
}) {
// console.log(`fn:Stage.tsx 0`);
	const aPage = useStore(s=> s.aPage);
	const foreIdx = useStore(s=> s.foreIdx);
	const trans = useStore(s=> s.trans);

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
	// ルール画像ワイプ（[trans rule=…]）で毎フレーム書き換えるSVGフィルタの係数。
	//	本家はWebGLのフラグメントシェーダだが、こちらは
	//	「ルール画像の赤チャンネル→不透明度」の一次変換1つで書ける（src/ts/Trans.ts）ので、
	//	feFuncAのslope/interceptだけを動かせば同じ絵になる
	const funcRef = useRef<SVGFEFuncAElement>(null);
	useEffect(()=> {
		twRef.current?.kill();
		twRef.current = null;
		if (! trans) {	// 終了（またはそもそも演出なし）
			gsap.set([pgRef0.current, pgRef1.current].filter(e=> e !== null), {opacity: 1});
			return;
		}

		const el = aPgRef[foreIdx]!.current;
		if (! el) return;

		if (! trans.ruleSrc) {	// 既定＝クロスフェード
			twRef.current = gsap.to(el, {opacity: 0, duration: trans.time / 1000, ease: 'none'});
			return;
		}
		// ルール画像ワイプ。**動かすのは進度（tick）だけ**で、tick→見た目はTrans.tsの純粋関数。
		//	この切り分けにより、進度の計算は単体テストで、絵はE2Eから任意の進度を流し込んで確かめられる
		const setTick = (tick: number)=> {
			const fn = funcRef.current;
			if (! fn) return;

			const {slope, intercept} = ruleMaskFunc(tick, trans.vague);
			fn.setAttribute('slope', String(slope));
			fn.setAttribute('intercept', String(intercept));
		};
		setTick(0);
		const o = {tick: 0};
		twRef.current = gsap.to(o, {
			tick: 1, duration: trans.time / 1000, ease: 'none',
			onUpdate: ()=> setTick(o.tick),
		});
	}, [trans]);

	// [quake]の画面揺らし。[trans]と同じ役割分担で、**ここは見た目を動かすだけ**。
	//	終了を宣言するのはScriptMng（時間切れ／[wq]中のクリック／[stop_quake]）で、
	//	store.quakeがnullに戻ったらずれを0へ戻す＝途中で止められても中途半端な位置に残らない。
	//	本家（LayerMng.ts:754）はレイヤを板テクスチャへ描いてそのスプライトを揺らすが、
	//	こちらは表裏のページ箱そのものを動かす。ステージ側のoverflow:hiddenが端を切るのも同じ絵。
	//	**毎フレーム [-hmax,+hmax]／[-vmax,+vmax] のランダム位置へ跳ばす**（補間しない）のも本家どおり
	const quake = useStore(s=> s.quake);
	const qkRef = useRef<gsap.core.Tween | null>(null);
	useEffect(()=> {
		qkRef.current?.kill();
		qkRef.current = null;
		const aEl = [pgRef0.current, pgRef1.current].filter(e=> e !== null);
		if (! quake) {gsap.set(aEl, {x: 0, y: 0}); return}

		const {hmax: h, vmax: v} = quake;
		// GSAPは「時間を刻む係」でしかない（動かす値は自前のランダム）ので、
		//	ダミーの数値をtweenして onUpdate だけ使う。長さは終了宣言側が決めるので余裕をみて長め
		qkRef.current = gsap.to({v: 0}, {v: 1, duration: 3600, ease: 'none', onUpdate: ()=> {
			gsap.set(aEl, {
				x: h === 0 ? 0 : Math.round(Math.random() * h * 2) - h,
				y: v === 0 ? 0 : Math.round(Math.random() * v * 2) - v,
			});
		}});
	}, [quake]);

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

	// ステージの内箱（等倍の座標系そのもの）。全画面要素・[snapshot]の撮影対象を兼ねる
	const stageRef = useRef<HTMLDivElement>(null) as RefObject<HTMLDivElement>;

	// 全画面表示。[toggle_full_screen]（＝ストアのfullScr）が「こうしたい」を持ち、
	//	実際にそうなったかはuseFullscreenの戻り値。Escでの解除などブラウザ都合の変化もあるので、
	//	実状態をエンジンの組み込み変数const.sn.displayStateへ書き戻す
	//	（本家もSysWebがfullscreenchangeを拾ってisFullScrを直している）
	const fullScr = useStore(s=> s.fullScr);
	const setFullScr = useStore(s=> s.setFullScr);
	const tglFlScr = useStore(s=> s.toggleFullScr);
	// **全画面にするのは外側（#skynovel）**で、内箱ではない。ブラウザのUAスタイルは全画面要素へ
	//	`width/height: 100%` と **`transform: none`** を強制するので、拡縮している内箱を
	//	全画面にすると倍率が丸ごと消えて等倍のまま画面いっぱいに引き伸ばされる（実測で確認）。
	//	外側を全画面にすれば、その中で内箱は普通にtransform:scaleできる
	const outerRef = useRef<HTMLElement>(heStage);
	const isFullscreen = useFullscreen(outerRef, fullScr, {onClose: ()=> setFullScr(false)});
	useEffect(()=> {scrMng.setFullScr(isFullscreen)}, [isFullscreen]);

	// 外側の <div id="skynovel"> にも、拡縮後の実寸を持たせる。
	//	transform: scale() はレイアウト上のサイズを変えないので、これをやらないと
	//	ページ側は等倍ぶんの領域を確保したまま（＝余白や不要なスクロールバーが出る）。
	//	overflow:hidden は内側にも掛けるが、拡縮の丸め誤差でのはみ出しを止めるため両方に置く
	useLayoutEffect(()=> {
		if (isFullscreen) {
			// 全画面中は**ブラウザのUAスタイルが全画面要素を画面いっぱい（100%）にする**ので、
			//	こちらで実寸を書かない。内箱をflexで中央へ寄せるだけにする
			//	（本家 SysBase.cvsResize() の「中央へ寄せる」と同じ絵）
			heStage.style.width		= '';
			heStage.style.height	= '';
			heStage.style.display	= 'flex';
			heStage.style.alignItems	= 'center';
			heStage.style.justifyContent= 'center';
			heStage.style.backgroundColor= 'black';	// 余白（レターボックス）を黒に
		}
		else {
			heStage.style.width		= `${String(stageW * cvsScale)}px`;
			heStage.style.height	= `${String(stageH * cvsScale)}px`;
			heStage.style.display	= '';
			heStage.style.alignItems	= '';
			heStage.style.justifyContent= '';
			heStage.style.backgroundColor= '';
		}
		heStage.style.overflow	= 'hidden';
	}, [cvsScale, stageW, stageH, isFullscreen]);


	// css
	//	ステージ本体。ここが座標系の原点かつ表示範囲で、はみ出したレイヤは切り取られる。
	//	背景は黒（画像を置いていない領域＝素通しの黒。[trans]中も同じ）
	const styStage = css`
		position: relative;
		width: ${stageW}px;
		height: ${stageH}px;
		overflow: hidden;
		background-color: black;

		/* ステージ既定フォント。本家 TxtLayer.ts:272 のメッセージ層デフォルトと同じ Hiragino 系スタック。
			ここへ置けば各レイヤ（文字メッセージ等）が継承する。ボタンは本家 sn.button.fontFamily 相当を
			BtnLayer側で明示指定しているのでそちらが優先される（＝別途フォントを差し替え可能） */
		font-family: 'Hiragino Sans', 'Hiragino Kaku Gothic ProN', '游ゴシック Medium', meiryo, sans-serif;

		/* 全画面（[toggle_full_screen]）のときは**画面の中央へ寄せる**（本家 SysBase.cvsResize()）。
			中央寄せは外側（#skynovel）のflexに任せ、ここは拡縮だけを持つ。
			原点を中心にするのは、flexが**拡縮前の実寸**で中央に置くため（左上原点だと右下へ伸びる） */
		transform-origin: ${isFullscreen ? 'center' : 'left top'};
		transform: scale(${String(cvsScale)});
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
	// HTMLフレームの置き場所をFrameMng（DOM側）へ渡す
	const frmRef = useRef<HTMLDivElement>(null);
	useMount(()=> {
		scrMng.attachFrameBox(frmRef.current!);
		scrMng.attachStageBox(stageRef.current);	// [snapshot]の撮影対象（等倍の内箱）
	});

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

	//TODO: デザインモードは本家機能の大部分が揃うまで**無効**（ENA_DESIGN_MODE=falseで長押しを
	//	受け付けない）。今のままだと通常プレイ中の長押しで入れてしまうが、中で触れるのは
	//	レイヤの位置・サイズだけで、しかも触った結果をシナリオへ書き戻す先が無い。
	//	音声・履歴・文字演出などが揃い、「デザインモードで調整→保存」の行き先を決めてから戻す。
	//	フック自体は残す（呼び出し順を変えるとReactのフック規則に触れるため）
	const longPressEvent = useLongPress(e=> {
		e.stopPropagation();	// でも止まらない
		onLong();			// これで止める

		if (isDragging()) return;
		tglDesignMode();
		setDesignMode(! isDesignMode);	// React のくせで取れないので
	}, {isPreventDefault: true, delay: 300,});


	// 今どちらかのページで使われている色成分行列（重複はidで畳む）
	const aMat = (()=> {
		const h = new Map<string, number[]>();
		for (const aLay of aPage) for (const l of aLay) {
			if (l.aFlt) for (const m of matsOf(l.aFlt)) h.set(fltId(m), m);
		}
		return [...h.values()];
	})();
	// 今どちらかのページで使われているblur_x/blur_y（[add_filter filter=blur blur_x=/blur_y=]。
	//	重複はidで畳む。CSSのblur()は半径1つしか持てないのでSVGのfeGaussianBlurへ回した分）
	const aBlur = (()=> {
		const h = new Map<string, readonly [number, number]>();
		for (const aLay of aPage) for (const l of aLay) {
			if (l.aFlt) for (const b of blursOf(l.aFlt)) h.set(blurId(b), b);
		}
		return [...h.values()];
	})();

	const c: T_LAY_CMN = {cmn: {sys, styChild, isDesignMode, sty4Moveable: {
		maxWidth	: 'auto',
		maxHeight	: 'auto',
		minWidth	: 'auto',
		minHeight	: 'auto',
		transform	: 'translate(0px, 0px) rotate(0deg)',
	}}};
	return <div css={styStage} onClick={onClick} {...ENA_DESIGN_MODE ?longPressEvent :{}} ref={stageRef}>
		{/* ルール画像ワイプ（[trans rule=…]）のマスク。本家のフラグメントシェーダの置き換えで、
			・feColorMatrix：ルール画像の**赤チャンネル**をアルファへ移し、RGBは白に固定する
			　（本家シェーダも ru.r を読む。RGB白＋輝度マスクなので mask-type の指定に頼らない）
			・feFuncA：Trans.tsが出すslope/interceptで「R→不透明度」の一次変換（結果は0〜1へクランプ）
			色空間はsRGB固定。既定のlinearRGBだと赤チャンネルの値が変換されてしまい、
			テクスチャを素で読む本家シェーダと合わなくなる */}
		{trans?.ruleSrc && <svg width="0" height="0" style={{position: 'absolute'}} aria-hidden>
			<defs>
				<filter id="sn_rule_flt" colorInterpolationFilters="sRGB">
					<feColorMatrix type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  1 0 0 0 0"/>
					<feComponentTransfer><feFuncA ref={funcRef} type="linear" slope="1" intercept="0"/></feComponentTransfer>
				</filter>
				<mask id="sn_rule_msk" maskUnits="userSpaceOnUse" x="0" y="0" width={stageW} height={stageH}>
					{/* ルール画像はステージ全面へ引き伸ばす（本家もステージ大のテクスチャとして扱う） */}
					<image href={trans.ruleSrc} x="0" y="0" width={stageW} height={stageH}
						preserveAspectRatio="none" filter="url(#sn_rule_flt)"/>
				</mask>
			</defs>
		</svg>}
		{/* 色成分フィルター（[add_filter filter=browni]など）。CSSのfilter関数に相当が無いので、
			pixiのColorMatrixFilterと同じ5x4行列をSVGのfeColorMatrixへ流す（src/ts/Filter.ts）。
			**要素は同一文書内に無いとCSSの`filter: url(#…)`から指せない**（data:URLは不可）ので、
			今どちらかのページで使われている行列を集めてここへ出す。idは行列の中身から決まるため
			同じ効果は1つの要素を共有する。
			色空間はsRGB固定：既定のlinearRGBだと変換が入り、テクスチャの値をそのまま扱う
			pixiのシェーダと合わなくなる（ルール画像ワイプのフィルタと同じ理由） */}
		{aMat.length > 0 && <svg width="0" height="0" style={{position: 'absolute'}} aria-hidden>
			<defs>
				{aMat.map(m=> <filter key={fltId(m)} id={fltId(m)} colorInterpolationFilters="sRGB"
					x="0" y="0" width="100%" height="100%">
					<feColorMatrix type="matrix" values={fltValues(m)}/>
				</filter>)}
			</defs>
		</svg>}
		{/* blur_x/blur_y指定ありの[add_filter filter=blur]。CSSのblur()は半径1つしか持てないので
			SVGのfeGaussianBlur（stdDeviationがX/Y別々）へ回した分（src/ts/Filter.ts）。
			上のfeColorMatrixと違い**x/y/width/heightは既定のまま**にする：ぼかしは見た目の箱を
			はみ出すので、100%に絞ると縁が切れる */}
		{aBlur.length > 0 && <svg width="0" height="0" style={{position: 'absolute'}} aria-hidden>
			<defs>
				{aBlur.map(b=> <filter key={blurId(b)} id={blurId(b)}>
					<feGaussianBlur stdDeviation={blurValues(b)}/>
				</filter>)}
			</defs>
		</svg>}
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
		{aPage.map((aLay0, i)=> {
			// 演出中の裏ページは「**交換対象のレイヤは裏・それ以外は表**」の合成で描く
			//	（本家 LayerMng.ts:648 `const lay = sDoTrans.has(ln) ? back : fore`）。
			//	ストアの中身は触らない：交換対象外レイヤの裏には次の場面の組み立て途中が
			//	載っていることがあり、先に見せると場面転換のたびに一瞬前の状態がちらつく
			const aLay = trans?.aLayNm && i !== foreIdx
				? aLay0.map(e=> trans.aLayNm!.includes(e.nm)
					? e : aPage[foreIdx].find(f=> f.nm === e.nm) ?? e)
				: aLay0;
			return <div key={i} ref={aPgRef[i]} data-page={i === foreIdx ? 'fore' : 'back'} css={styPage} style={{
			zIndex			: i === foreIdx ? 1 : 0,
			visibility		: i === foreIdx || trans ? 'visible' : 'hidden',
			pointerEvents	: i === foreIdx ? 'auto' : 'none',
			// ルール画像ワイプは**表ページを部分的に消していく**（下から裏が出る）。
			//	クロスフェードがopacityでやることを、画素ごとの不透明度に置き換えたもの
			...trans?.ruleSrc && i === foreIdx ? {mask: 'url(#sn_rule_msk)'} : {},
		}}>
			{aLay.map(l=> {
				// [lay]で指定したレイヤ共通の見た目。デザインモードのMoveableが直接styleを触るので、
				//	そちらの値（sty4Moveable）より後ろに置いて優先させる
				const sty = {...c.cmn.sty4Moveable, ...styLay(l)};
				if (l.cls === 'grp') return <GrpLayer key={l.nm} cmn={c.cmn} sty={sty} nm={l.nm} fn={l.fn} src={l.src} isSheet={l.isSheet} isMovie={l.isMovie} aFace={l.aFace} getVideoVol={()=> scrMng.getMovieVolume()} needClick2Play={()=> scrMng.needClick2Play()}/>;
				// 文字レイヤ自体をUIコンテナとし、[button]で乗せたボタン群（l.aBtn）をTxtLayer内で一緒に描画する（独立レイヤにしない）。
				return <TxtLayer key={l.nm} cmn={c.cmn} sty={sty} nm={l.nm} isFore={i === foreIdx} str={l.str} aCh={l.aCh} ffs={l.ffs} noffs={l.noffs} bura={l.bura} kinsoku_sol={l.kinsoku_sol} kinsoku_eol={l.kinsoku_eol} kinsoku_dns={l.kinsoku_dns} kinsoku_bura={l.kinsoku_bura} r_align={l.r_align} b_color={l.b_color} b_alpha={l.b_alpha} b_alpha_isfixed={l.b_alpha_isfixed} b_src={l.b_src} styTxt={l.style} pl={l.pl} pr={l.pr} pt={l.pt} pb={l.pb} enabled={l.enabled} aBtn={l.aBtn} in_style={l.in_style} onActivate={(label, call, fn, arg)=> scrMng.jumpToLabelAndGo(label, call, fn, arg)} onNavigate={url=> scrMng.navigateTo(url)} onSe={(fn, buf)=> scrMng.playButtonSe(fn, buf)}/>;
			})}
		</div>;
		})}
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

		// **拡大もする**（本家 SysBase.cvsResize()）。本家は `expanding` の既定が true で、
		//	ステージが窓より小さいときも窓いっぱいまで引き伸ばす。ここを落としていたため、
		//	窓が広いと右に黒帯が残り、[toggle_full_screen]でも等倍のままだった。
		//	expanding=false（拡大しない）はprj.jsonの`dip`次第だが、こちらは未対応なので常に拡大する
		if (argChk_Boolean(CmnLib.hDip, 'expanding', true)
			|| CmnLib.stageW > w
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
