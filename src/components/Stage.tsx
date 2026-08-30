/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2024-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import {CmnLib, argChk_Boolean, uint} from '../sn/CmnLib';
import GrpLayer from './GrpLayer';
import TxtLayer from './TxtLayer';
import PlgLayer from './PlgLayer';
import {clearDrag, isDragging, isGrpLay, isTxtLay, styLay, type T_LAY, type T_LAY_CMN} from './Lay';
import {modKeyName, suppressClick, setDesignMode, type T_ARG} from './Main';
import {useStore, type T_TRANS} from '../store/store';
import {ruleMaskFunc, VAGUE_DEF} from '../ts/Trans';
import {fltId, fltValues, matsOf, blurId, blurValues, blursOf} from '../ts/Filter';
import {detectSwipe} from '../ts/Swipe';

import {type CSSProperties, memo, type PointerEvent, RefObject, useEffect, useLayoutEffect, useMemo, useRef, useState} from 'react';
import {useFullscreen, useLongPress, useMount, useToggle} from 'react-use';
import {css} from '@emotion/react';

// **デザインモード（長押しで入る）の有効・無効**。詳細は下の useLongPress のTODO参照
const ENA_DESIGN_MODE = false;

// 各レイヤ（GrpLayer/TxtLayer/PlgLayer）の絶対配置の下地。完全に静的なので
//	モジュール定数にして毎 render の再生成を避ける（下の <Page> の memo が効くための前提の一つ。
//	Stage の useMemo した cmn 経由で全レイヤへ配られる）
const styChild = css`position: absolute; top: 0; left: 0;`;
// 表裏それぞれのページを包むコンテナ。[trans]はこの「ステージ大の板」2枚をクロスフェードさせる
//	（本家がページごとに板テクスチャを作って重ねるのと同じ絵）。
//	不透明にしておくことで、画像の無い部分はbg_colorで塗り潰される（本家は#fore/#back
//	両方に同じbg_color塗りを敷く。LayerMng.ts:172-180）。**背景色だけは <Page> の inline style で
//	与える**（CmnLib.bgColor はモジュール評価時にはまだ既定値のことがあるため）
const styPage = css`
	position: absolute; top: 0; left: 0;
	width: 100%;
	height: 100%;
	overflow: hidden;
`;

type T_PAGE_PROPS = {
	idx		: 0 | 1;			// ストアのページ添字（PlgLayMng が 'fore'/'back' へ解決するのに要る）
	isFore	: boolean;			// このページが現在の表か（i === foreIdx）
	trans	: T_TRANS;			// 進行中の[trans]（無ければ null）
	aLay	: T_LAY[];			// このページに描くレイヤ配列（trans 中の合成は <Page> の外で解決済み）
	cmn		: T_LAY_CMN['cmn'];	// 全レイヤ共通の render props（Stage 側で useMemo 済み）
	scrMng	: T_ARG['scrMng'];
	pgRef	: RefObject<HTMLDivElement | null>;
};

// 表裏1ページぶんの描画（[trans]では中身でなく「どちらを表とみなすか」だけを切り替えるため、
//	どちらも常時マウントしたまま）。**React.memo でくるむのが要点**（backpage-perf.md
//	「[tsy] 無限トゥイーンの結論」）：無限 [tsy]（page=fore）の毎フレーム set() で Stage は
//	再 render されるが、その時の back Page の props（aLay = aPage[backIdx]／isFore／trans=null）は
//	store の putPage が非対象ページの配列参照を保つおかげで全て参照安定 → 浅い比較が通り
//	back サブツリー（レイヤコンポーネント）の再 render を丸ごとスキップできる。fore Page だけ
//	再 render（正しい）。trans 中は back の aLay が毎 render 変わる＝再 render される想定でよい
//	（可視なので正しい）。
const Page = memo(function Page({idx, isFore, trans, aLay, cmn, scrMng, pgRef}: T_PAGE_PROPS) {
	// 裏ページはトランジション中だけ見せる（本家の板テクスチャ2枚のクロスフェードと同じ）
	const visible = isFore || !! trans;
	return <div ref={pgRef} data-page={isFore ? 'fore' : 'back'} css={styPage} style={{
		backgroundColor	: CmnLib.bgColor,
		zIndex			: isFore ? 1 : 0,
		visibility		: visible ? 'visible' : 'hidden',
		pointerEvents	: isFore ? 'auto' : 'none',
		// 不可視 back ページ（trans 中は見えているので除く）ではアニメ png シートの CSS animation を
		//	止める（backpage-perf.md）。子孫の全シートクラスが読む CSS 変数（Sprite.ts aniSpriteCss）
		...({'--sn-ani-play': visible ? 'running' : 'paused'} as CSSProperties),
		// ルール画像ワイプは**表ページを部分的に消していく**（下から裏が出る）。
		//	クロスフェードがopacityでやることを、画素ごとの不透明度に置き換えたもの
		...trans?.ruleSrc && ! trans.glslSrc && isFore ? {mask: 'url(#sn_rule_msk)'} : {},
	}}>
		{aLay.map(l=> {
			// [lay]で指定したレイヤ共通の見た目。デザインモードのMoveableが直接styleを触るので、
			//	そちらの値（sty4Moveable）より後ろに置いて優先させる
			const sty = {...cmn.sty4Moveable, ...styLay(l)};
			if (isGrpLay(l)) return <GrpLayer key={l.nm} cmn={cmn} sty={sty} nm={l.nm} fn={l.fn} src={l.src} isSheet={l.isSheet} isMovie={l.isMovie} aFace={l.aFace} aFx={l.aFx ?? []} fxActive={visible} getVideoVol={()=> scrMng.getMovieVolume()} needClick2Play={()=> scrMng.needClick2Play()}/>;
			// 文字レイヤ自体をUIコンテナとし、[button]で乗せたボタン群（l.aBtn）をTxtLayer内で一緒に描画する（独立レイヤにしない）。
			if (isTxtLay(l)) return <TxtLayer key={l.nm} cmn={cmn} sty={sty} nm={l.nm} isFore={isFore} str={l.str} aCh={l.aCh} ffs={l.ffs} noffs={l.noffs} bura={l.bura} kinsoku_sol={l.kinsoku_sol} kinsoku_eol={l.kinsoku_eol} kinsoku_dns={l.kinsoku_dns} kinsoku_bura={l.kinsoku_bura} r_align={l.r_align} break_fixed={l.break_fixed} break_fixed_left={l.break_fixed_left} break_fixed_top={l.break_fixed_top} b_color={l.b_color} b_alpha={l.b_alpha} b_alpha_isfixed={l.b_alpha_isfixed} b_src={l.b_src} styTxt={l.style} pl={l.pl} pr={l.pr} pt={l.pt} pb={l.pb} enabled={l.enabled} aBtn={l.aBtn} in_style={l.in_style} out_style={l.out_style} onActivate={(label, call, fn, arg)=> scrMng.jumpToLabelAndGo(label, call, fn, arg)} onNavigate={url=> scrMng.navigateTo(url)} onSe={(fn, buf)=> scrMng.playButtonSe(fn, buf)}/>;
			// プラグインレイヤー（[add_lay class=3d]等）。中身（3Dシーン等）はDOM側
			//	（scrMng.attachPlgBox→PlgLayMng）が持つので、ここは箱と置き場所のdivだけ出す。
			//	既知の制限：[trans]中の「交換対象外レイヤは表ページの中身で描く」合成
			//	（下の Stage 側 aLay 生成部）はプラグインレイヤーには効かない（DOM実体はページ添字に
			//	固定されており、storeのデータ差し替えでは動かないため）
			return <PlgLayer key={l.nm} cmn={cmn} sty={sty} nm={l.nm}
				attach={el=> {scrMng.attachPlgBox(l.nm, idx, el)}}/>;
		})}
	</div>;
});

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
	// [trans glsl=]のWebGL canvas 置き場（下の JSX の空div）。実体は TransGlsl.ts（lazy import）が足す
	const glslHolderRef = useRef<HTMLDivElement>(null);
	// ルール画像ワイプ（[trans rule=…]）の進度を刻むrAFの後始末用。クロスフェード側は
	//	WAAPI（Element.animate()）任せなので専用のrefは要らない（下のgetAnimations()参照）
	const transRafRef = useRef<number | null>(null);
	// ルール画像ワイプ（[trans rule=…]）で毎フレーム書き換えるSVGフィルタの係数。
	//	本家はWebGLのフラグメントシェーダだが、こちらは
	//	「ルール画像の赤チャンネル→不透明度」の一次変換1つで書ける（src/ts/Trans.ts）ので、
	//	feFuncAのslope/interceptだけを動かせば同じ絵になる
	const funcRef = useRef<SVGFEFuncAElement>(null);
	useEffect(()=> {
		if (transRafRef.current !== null) cancelAnimationFrame(transRafRef.current);
		transRafRef.current = null;
		// **trans:nullを経由せず次のtransへ直接切り替わることがある**：[wt]の直後に別レイヤの
		//	[trans]を連続で打つと、#runStep()が同期forループの中でfinishTrans()（trans→null）と
		//	startTrans()（null→次のtrans）を続けて呼び、Reactが両方を1回のレンダリングへ
		//	バッチしてしまう。そうなると「終了時だけ」のopacityリセット（旧・下のif分岐）が
		//	一度も走らないまま次の演出が始まり、前の演出でopacity 0まで下がった板がそのまま
		//	次の演出の下地になって一瞬真っ黒に見える（実機バグ：場面転換の[trans]連続でちらつく）。
		//	なので「終了時」に限らず**演出開始のたびに必ず**両方の板を不透明へ戻してから動かす。
		//	`fill:'forwards'`のWAAPIアニメは終了後も**inline styleでなく効果として**opacityを
		//	保持し続けるので、素のopacity書き換えだけでは消えない。cancel()で確実に外す
		for (const el of [pgRef0.current, pgRef1.current]) {
			if (! el) continue;
			el.getAnimations().forEach(a=> a.cancel());
			el.style.opacity = '';
		}
		if (! trans) return;	// 終了（またはそもそも演出なし）

		const el = aPgRef[foreIdx]!.current;
		if (! el) return;

		// [trans glsl=]：フラグメントシェーダ合成。重い WebGL 一式は**使われた時だけ** lazy import
		//	（src/ts/TransGlsl.ts。未使用時のバンドル影響ゼロ）。ここは演出の駆動だけで、表裏の確定は
		//	ScriptMng #finishTrans が別途行う（[trans]全体の役割分担どおり）。rule 画像ワイプ（下の分岐）
		//	とは排他——glsl 指定時は rule= もシェーダの uniform（sampler2D rule）として渡す。
		//	シェーダの文法エラーは runGlslTrans が infoLog 付きで throw → .catch で myTrace 表示
		if (trans.glslSrc) {
			const {glslSrc, time, vague, ruleSrc, aLayNm} = trans;
			const t0 = performance.now();
			const holder = glslHolderRef.current;
			const stageEl = stageRef.current;
			// 遷移先（裏ページ）に出るはずの画像 src。部分 trans は「交換対象だけ裏・他は表」の合成
			//	（上の aLay 生成と同じ規則）。runGlslTrans がこれらの <img> が出そろうのを待ってから撮る
			const backIdx = (1 - foreIdx) as 0 | 1;
			const destLays = aLayNm
				? aPage[backIdx].map(e=> aLayNm.includes(e.nm)
					? e : aPage[foreIdx].find(f=> f.nm === e.nm) ?? e)
				: aPage[backIdx];
			const backSrcs = destLays.filter(isGrpLay)
				.flatMap(l=> [l.src, ...l.aFace.map(f=> f.src)].filter(s=> s !== ''));
			let dispose: (()=> void) | null = null;
			let cancelled = false;
			if (holder && stageEl) {
				import('../ts/TransGlsl').then(async ({runGlslTrans})=> {
					const d = await runGlslTrans({stageEl, holder, glslSrc, time, backSrcs,
						vague: vague ?? VAGUE_DEF, ...ruleSrc ? {ruleSrc} : {}, t0});
					if (cancelled) d(); else dispose = d;
				}).catch((e: unknown)=> scrMng.myTrace(
					`[trans glsl=] ${e instanceof Error ? e.message : String(e)}`, 'E'));
			}
			return ()=> {cancelled = true; dispose?.()};
		}

		if (! trans.ruleSrc) {	// 既定＝クロスフェード
			el.animate([{opacity: 1}, {opacity: 0}], {duration: trans.time, easing: 'linear', fill: 'forwards'});
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
		const t0 = performance.now();
		const step = (now: number)=> {
			const tick = trans.time <= 0 ? 1 : Math.min((now - t0) / trans.time, 1);
			setTick(tick);
			if (tick < 1) transRafRef.current = requestAnimationFrame(step);
		};
		transRafRef.current = requestAnimationFrame(step);
		return;	// glsl 分岐だけ後始末関数を返すので、他の経路も明示的に return（noImplicitReturns）
	}, [trans]);

	// [quake]の画面揺らし。[trans]と同じ役割分担で、**ここは見た目を動かすだけ**。
	//	終了を宣言するのはScriptMng（時間切れ／[wq]中のクリック／[stop_quake]）で、
	//	store.quakeがnullに戻ったらずれを0へ戻す＝途中で止められても中途半端な位置に残らない。
	//	本家（LayerMng.ts:754）はレイヤを板テクスチャへ描いてそのスプライトを揺らすが、
	//	こちらは表裏のページ箱そのものを動かす。ステージ側のoverflow:hiddenが端を切るのも同じ絵。
	//	**毎フレーム [-hmax,+hmax]／[-vmax,+vmax] のランダム位置へ跳ばす**（補間しない）のも本家どおり
	const quake = useStore(s=> s.quake);
	const quakeRafRef = useRef<number | null>(null);
	useEffect(()=> {
		if (quakeRafRef.current !== null) cancelAnimationFrame(quakeRafRef.current);
		quakeRafRef.current = null;
		const aEl = [pgRef0.current, pgRef1.current].filter(e=> e !== null);
		if (! quake) {
			// translate(0,0)も「恒等transform」としてスタッキングコンテキストを作ってしまう
			//	（.claude/docs/PITFALLS.md参照）ので、0へ戻すのでなく明示的に外す
			for (const el of aEl) el.style.transform = '';
			return;
		}

		const {hmax: h, vmax: v} = quake;
		// 素のrAFループ。動かす値は毎フレームの乱数そのものなので、時間駆動のライブラリは要らない。
		//	止めるのは終了宣言側（ScriptMng）がstore.quakeをnullへ戻したとき＝このeffectの再実行
		const step = ()=> {
			const x = h === 0 ? 0 : Math.round(Math.random() * h * 2) - h;
			const y = v === 0 ? 0 : Math.round(Math.random() * v * 2) - v;
			for (const el of aEl) el.style.transform = `translate(${String(x)}px, ${String(y)}px)`;
			quakeRafRef.current = requestAnimationFrame(step);
		};
		quakeRafRef.current = requestAnimationFrame(step);
	}, [quake]);

	// ウインドウサイズ追従。**埋め込み時（sn_galleryのような左メニュー付きレイアウト）は
	//	windowでなく親要素の実サイズを基準にする**（本家 SysBase.cvsResize():231-237の isGallery
	//	分岐。isGallery＝マウント先#skynovelがdocument.bodyの直下に無い＝ホストHTML側に
	//	既存のレイアウトが敷かれている状態。sn_gallery/index.htmlでは`#skynovel`自身に
	//	Bootstrapの`mw-100 mh-100`が付き、その実サイズは親要素`.container-fluid.p-0`基準で決まる）
	const isGallery = heStage.parentElement !== document.body;
	const [wh, setWH] = useState<T_WH>(innWH(heStage, isGallery));
	useMount(()=> {
		function onResize() {setWH(innWH(heStage, isGallery))}
		globalThis.addEventListener('resize', onResize);
		return ()=> globalThis.removeEventListener('resize', onResize);
	});
	const {cvsScale} = calcScale(wh, isGallery);

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
	useFullscreen(outerRef, fullScr, {onClose: ()=> setFullScr(false)});	// リクエストの発行・Escでの解除検知に使うだけで、戻り値（＝実際に切り替わったか）は使わない
	// react-useのuseFullscreenは screenfull.request() の成否を待たずに即trueを返す。
	//	[toggle_full_screen]はページ読込直後（main.snの起動時、ウインドウ設定が画面解像度より
	//	大きい場合）にユーザー操作なしで自動発火することがあり、そのrequestFullscreen()はブラウザに
	//	拒否される（"API can only be initiated by a user gesture"）。それでもuseFullscreenの戻り値は
	//	trueのままになり、実際は全画面になっていないのにレイアウトだけ全画面用（中央寄せ）へ
	//	切り替わってレターボックス位置が本家とズレる事故になっていた。実際に切り替わったかは
	//	document.fullscreenElement の変化でしか確定しないので、そちらを別途見る
	//	（本家 SysWeb.ts:138 の fullscreenchange 監視と同じ判定基準）
	const [isFullscreen, setIsFullscreenActual] = useState(()=> Boolean(document.fullscreenElement));
	useEffect(()=> {
		const onChange = ()=> setIsFullscreenActual(Boolean(document.fullscreenElement));
		document.addEventListener('fullscreenchange', onChange);
		return ()=> document.removeEventListener('fullscreenchange', onChange);
	}, []);
	useEffect(()=> {scrMng.setFullScr(isFullscreen)}, [isFullscreen]);

	// 外側の <div id="skynovel"> にも、拡縮後の実寸を持たせる。
	//	transform: scale() はレイアウト上のサイズを変えないので、これをやらないと
	//	ページ側は等倍ぶんの領域を確保したまま（＝余白や不要なスクロールバーが出る）。
	//	overflow:hidden は内側にも掛けるが、拡縮の丸め誤差でのはみ出しを止めるため両方に置く
	useLayoutEffect(()=> {
		if (isFullscreen) {
			// 本家 SysBase.cvsResize() は「中央へ寄せる」ロジックを持たず、fullscreen化しても
			//	内箱は左上固定のまま（ofsLeft4elm += (w-cvsWidth)/2 はマウス座標変換用の
			//	オフセットで、見た目のDOM配置には反映されない）。合わせて中央寄せをやめる
			heStage.style.width		= '';
			heStage.style.height	= '';
			heStage.style.display	= '';
			heStage.style.alignItems	= '';
			heStage.style.justifyContent= '';
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
	//	背景は[prj.json init.bg_color]（本家 LayerMng.ts:172-178。画像を置いていない領域に
	//	素通しで出る色。[trans]中も同じ）
	const styStage = css`
		position: relative;
		width: ${stageW}px;
		height: ${stageH}px;
		overflow: hidden;
		background-color: ${CmnLib.bgColor};

		/* ステージ既定フォント。本家 TxtLayer.ts:272 のメッセージ層デフォルトと同じ Hiragino 系スタック。
			ここへ置けば各レイヤ（文字メッセージ等）が継承する。ボタンは本家 sn.button.fontFamily 相当を
			BtnLayer側で明示指定しているのでそちらが優先される（＝別途フォントを差し替え可能） */
		font-family: 'Hiragino Sans', 'Hiragino Kaku Gothic ProN', '游ゴシック Medium', meiryo, sans-serif;

		/* 全画面（[toggle_full_screen]）でも本家同様に**左上固定**（中央寄せはしない。
			上のuseLayoutEffectのコメント参照） */
		transform-origin: left top;
		transform: scale(${String(cvsScale)});
	`;
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
	// [trans glsl=]のWebGL canvas 置き場（styFrames と同じ「空div」方式）。canvas 自身が
	//	position:absolute/inset:0/100% を持つので、この div は座標を与えるだけ
	const styTransGlsl = css`
		position: absolute; top: 0; left: 0;
		width: 100%; height: 100%;
		z-index: 1;
		pointer-events: none;
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
		suppressClick();	// これで止める

		if (isDragging()) return;
		tglDesignMode();
		setDesignMode(! isDesignMode);	// React のくせで取れないので
	}, {isPreventDefault: true, delay: 300,});

	// swipeleft/right/up/down（本家 EventMng.ts:164-219 相当）。tinygestureは使わず
	//	pointerdown〜pointerupの移動量だけで判定する自作（判定式は src/ts/Swipe.ts 参照）。
	//	デザインモード中はレイヤのドラッグ操作と衝突するため判定しない
	const swipeStart = useRef<{x: number, y: number} | null>(null);
	function onPointerDown(e: PointerEvent) {
		swipeStart.current = {x: e.clientX, y: e.clientY};
	}
	function onPointerUp(e: PointerEvent) {
		const st = swipeStart.current;
		swipeStart.current = null;
		if (! st || isDesignMode) return;

		const rect = stageRef.current!.getBoundingClientRect();
		const dir = detectSwipe(e.clientX -st.x, e.clientY -st.y, rect.width, rect.height);
		if (! dir) return;

		suppressClick();	// スワイプ直後に発生するクリックで読み進めてしまわないよう抑止
		// 修飾キー前置は本家同様マウス操作時のみ（EventMng.ts:212-219 #modKey4MouseEvent）。
		//	modKeyName()はネイティブMouseEvent型（DOMのPointerEventはこれを継承）を取るので
		//	Reactの合成イベントでなくnativeEventを渡す
		scrMng.fireEvent((e.pointerType === 'mouse' ?modKeyName(e.nativeEvent) :'') +dir);
	}


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

	// isDesignMode=falseの間は空にする。Moveable自体もisDesignMode時だけ条件レンダーなので
	//	（GrpLayer.tsx/TxtLayer.tsx）、無効中はこの下地が要らない。恒等transformを常時全レイヤへ
	//	書いていると、ステージのscale(cvsScale)（非整数）の下で余分なペイントレイヤを持ち続けることになり、
	//	縦書き＋Webフォントの環境でグリフのラスタライズ欠落に繋がりうる（ENA_DESIGN_MODE=falseの現状は
	//	デザインモードへ入れないため、これは常時無駄になっていた）
	//	**useMemo で安定参照にする**：下の <Page> の memo が効くには cmn が毎 render 変わらない
	//	ことが要る（無限 [tsy] 中の再 render で back Page をスキップさせる。backpage-perf.md）。
	//	依存は sys（Stage の寿命で不変）と isDesignMode だけ
	const cmn = useMemo<T_LAY_CMN['cmn']>(()=> ({sys, styChild, isDesignMode, sty4Moveable: isDesignMode ? {
		maxWidth	: 'auto',
		maxHeight	: 'auto',
		minWidth	: 'auto',
		minHeight	: 'auto',
		transform	: 'translate(0px, 0px) rotate(0deg)',
	} : {}}), [sys, isDesignMode]);
	return <div css={styStage} onClick={onClick} onPointerDown={onPointerDown} onPointerUp={onPointerUp} {...ENA_DESIGN_MODE ?longPressEvent :{}} ref={stageRef}>
		{/* ルール画像ワイプ（[trans rule=…]）のマスク。本家のフラグメントシェーダの置き換えで、
			・feColorMatrix：ルール画像の**赤チャンネル**をアルファへ移し、RGBは白に固定する
			　（本家シェーダも ru.r を読む。RGB白＋輝度マスクなので mask-type の指定に頼らない）
			・feFuncA：Trans.tsが出すslope/interceptで「R→不透明度」の一次変換（結果は0〜1へクランプ）
			色空間はsRGB固定。既定のlinearRGBだと赤チャンネルの値が変換されてしまい、
			テクスチャを素で読む本家シェーダと合わなくなる */}
		{trans?.ruleSrc && ! trans.glslSrc && <svg width="0" height="0" style={{position: 'absolute'}} aria-hidden>
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
			//	載っていることがあり、先に見せると場面転換のたびに一瞬前の状態がちらつく。
			//	**<Page> の外で解決する**：trans が無ければ aLay0（＝aPage[i]）をそのまま渡す＝
			//	参照が変わらず <Page> の memo が効く（backpage-perf.md）
			const aLay = trans?.aLayNm && i !== foreIdx
				? aLay0.map(e=> trans.aLayNm!.includes(e.nm)
					? e : aPage[foreIdx].find(f=> f.nm === e.nm) ?? e)
				: aLay0;
			return <Page key={i} idx={i as 0 | 1} isFore={i === foreIdx} trans={trans}
				aLay={aLay} cmn={cmn} scrMng={scrMng} pgRef={aPgRef[i]!}/>;
		})}
		{/* [trans glsl=]のWebGL canvas 置き場。FrameMng（[add_frame]）と同じく「JSXでは子を持たない
			空div、実体（canvas）は Stage 側 useEffect が lazy import した src/ts/TransGlsl.ts 経由で
			appendChild」。Reactは自分が作った子しか触らないので衝突しない。z-index は表ページ（1）と
			同値かつ DOM 上で後ろ＝表の上に乗り、HTMLフレーム（2）より下 */}
		<div ref={glslHolderRef} css={styTransGlsl}/>
		<div ref={frmRef} css={styFrames}/>
	</div>;
};
	type T_WH = {
		width	: number;
		height	: number;
	};
	function calcScale({width: w, height: h}: T_WH, isGallery: boolean) {
		let cvsWidth = 0;
		let cvsHeight = 0;
		let cvsScale = 1;

		// **拡大もする**（本家 SysBase.cvsResize()）。本家は `expanding` の既定が true で、
		//	ステージが窓より小さいときも窓いっぱいまで引き伸ばす。ここを落としていたため、
		//	窓が広いと右に黒帯が残り、[toggle_full_screen]でも等倍のままだった。
		//	expanding=false（拡大しない）はprj.jsonの`dip`次第だが、こちらは未対応なので常に拡大する。
		//	なお本家が持つ ofsPadLeft/Top_Dom2PIXI（DOM座標→PIXI座標の変換オフセット）は、
		//	bluesnovelにPIXI座標系そのものが無い（マウス位置は素のDOM座標のまま扱う）ため移植不要
		if (isGallery) {
			// 埋め込み時（sn_galleryのような左メニュー付きレイアウト）は**幅だけ**を基準に、
			//	**縮小のみ・拡大はしない**（本家 SysBase.cvsResize():248, 234-236, 289）。本家は
			//	isGallery時、canvasへJSでwidth/heightを一切設定しない（cvsResize():289
			//	`if (! isGallery) {ps.width=...}` で分岐、isGalleryはここを素通りする）ため、
			//	canvasは`mw-100`（max-width:100%）とHTML width/height属性＝intrinsicサイズ
			//	（stageW/stageH）だけで表示サイズが決まる。max-width:100%は「はみ出るときだけ
			//	縮小」で拡大はしないCSSの通常挙動なので、親要素が広くてもstageW/stageHを超えない。
			//	`mh-100`（max-height:100%）は親の高さがCSS上`height: auto`のため不定な高さに
			//	対しては効かない（CSS 2.1 §10.7）ので高さ方向の制約は無い。
			//	bluesnovelの#skynovelはcanvasと違いintrinsicサイズを持たない素のdivなので、
			//	親要素の高さ（=#skynovel自身の直前の高さがそのまま返るだけの循環値）を読んでは
			//	いけない（実際に読んで試すと、前回セット分がフィードバックして値がドリフトする
			//	不具合になった）。幅（`w`＝親要素の`clientWidth`。こちらは祖先から決まる非循環値）
			//	をstageWと比較し、狭いときだけそれに合わせて縮小、広いときはstageWのまま
			cvsWidth = Math.min(w, CmnLib.stageW);
			cvsHeight = uint(CmnLib.stageH / CmnLib.stageW * cvsWidth);
			cvsScale = cvsWidth / CmnLib.stageW;
		}
		else if (argChk_Boolean(CmnLib.hDip, 'expanding', true)
			|| CmnLib.stageW > w
			|| CmnLib.stageH > h) {
			if (CmnLib.stageW / CmnLib.stageH <= w / h) {
				cvsHeight = h;
				cvsWidth = uint(CmnLib.stageW / CmnLib.stageH * h);
			}
			else {
				cvsWidth = w;
				cvsHeight = uint(CmnLib.stageH / CmnLib.stageW * w);
			}
			cvsScale = cvsWidth / CmnLib.stageW;
		}
		else {
			cvsWidth = CmnLib.stageW;
			cvsHeight = CmnLib.stageH;
			cvsScale = 1;
		}
		return {cvsScale, cvsWidth, cvsHeight};
	}
	function innWH(heStage: HTMLElement, isGallery: boolean): T_WH {
		// isGallery時はwindow全体でなく、埋め込み先（#skynovelの親要素）の幅を基準にする
		//	（本家 SysBase.cvsResize():234-236）。heightは上のcalcScale()のisGallery分岐が
		//	使わないので0のまま返す（親要素のclientHeightは#skynovel自身に追随する循環値の
		//	ため読んでも意味が無い。詳細はcalcScale()のコメント参照）
		if (isGallery && heStage.parentElement) {
			return {width: heStage.parentElement.clientWidth, height: 0};
		}
		const {innerWidth: width, innerHeight: height} = globalThis;
		return {width, height};
	}
