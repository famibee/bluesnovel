/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2024-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import {type T_LAY_IDX, type T_LAY_CMN} from './Lay';
import Layer from './Layer';
import {aniSpriteClass, loadSheet, setNatSize, type T_SHEET, type T_FRAME} from '../ts/Sprite';

import type {T_FX} from '../ts/Fx';

import {type CSSProperties, MouseEvent, useEffect, useRef, useState} from 'react';


// [add_face]で定義した差分絵1件分。dx/dyは親画像（fn）の左上を原点(0,0)とした相対座標
//	（本家 skynovel_esm の Sprite.x/y 相当。blendmodeはCSSのmix-blend-modeにそのまま渡す）
export type T_FACE = {
	fn			: string;
	dx			: number;
	dy			: number;
	blendmode	: string;
};
// ストアが持つのは上に解決済みURL（src）を足したもの。
//	パス解決（path.json）はScriptMngが行う＝renderの中でsearchPath()を呼ばない
//	（サーチパスに無いと例外を投げるので、renderで投げるとReactごと落ちる）。
//	isSheetは基本画像（fn）と同じくScriptMngがBlob URL化前のsrc拡張子で判定済み
//	（本家 SpritesMng.#csv2Sprites はcsvの各要素を等しくロードし、拡張子.jsonなら
//	差分絵でもAnimatedSpriteにする＝先頭だけの特別扱いではない）
export type T_FACE_SRC = T_FACE & {src: string; isSheet: boolean};
type T_GRPARG = T_LAY_CMN & {
	sty		: CSSProperties;	// [lay]のvisible/alpha/left/top/rotation/scale_*（Stage.tsx styLay()）
	nm		: string;	// レイヤ名。data-lay属性としてDOMへ出す（[snapshot layer=…]の絞り込み用）
	fn		: string;	// [lay fn=...]で指定された論理名（[dump_lay]・デバッグ用。動画時は<video data-fn=…>
		//	としても出し、[wv fn=…]（本家 SpritesMng.wv()）がここを引いて終了を待つ）
	src		: string;	// 解決済みURL。空なら描かない
	isSheet	: boolean;	// アニメpngシートか（ScriptMngがBlob URL化前のsrc拡張子で判定済み。下記参照）
	// 動画（[lay fn=movie.mp4/.webm]）か（ScriptMngがBlob URL化前のsrc拡張子で判定済み）。
	//	本家に[playvideo]系タグは無く、画像レイヤにそのまま貼る方式（Phase 4。todo.md参照）。
	//	getVideoVol/needClick2PlayはSndMngの状態を読むだけの関数なので、都度呼ぶ関数として渡す
	//	（onSeと同じ流儀。値そのものはReactの状態に持たない）
	isMovie			: boolean;
	aFace	: T_FACE_SRC[];	// [lay face=...]による差分合成。重なり順＝配列順（後の要素ほど上に重なる）
	aFx		: T_FX[];	// [add_fx]で重ねたシェーダエフェクト（分家独自の試作）。非空なら<img>を<canvas>へ差し替える
	fxActive: boolean;	// このページが可視か（表ページ or [trans]中）。不可視なら[add_fx]のrAF/WebGLを凍結
	getVideoVol		: ()=> number;	// sys:sn.sound.movie_volume × global_volume（ScriptMng.getMovieVolume()）
	needClick2Play	: ()=> boolean;	// 自動再生ブロック中なら初期muted（本家 SpritesMng.ts:288-296）
};
// ストア（zustand）に保存するデータだけの型（cmnはrender時のPropsのみなので不要）
export type T_GRPLAY_DATA = T_LAY_IDX & {cls: 'grp'; fn: string; src: string; isSheet: boolean; isMovie: boolean; aFace: T_FACE_SRC[]};
export type T_GRPLAY = T_GRPLAY_DATA & T_LAY_CMN;


// srcが指すアニメpngシートを読み、`aniSpriteClass()`で再生用CSSクラス名を得る（純粋にsrc/isSheet
//	依存。基本画像・差分絵（face）どちらも同じ形で使う——本家がcsvの各要素を等しくロードするのと同じ）
function useSheet(src: string, isSheet: boolean): T_SHEET | undefined {
	const [sheet, setSheet] = useState<T_SHEET | undefined>(undefined);
	useEffect(()=> {
		// crypto構成では復号中の一瞬src=''になる（ScriptMng #decryptPic）。空のままfetchしない
		if (! isSheet || ! src) {setSheet(undefined); return}

		let alive = true;
		void loadSheet(src).then(v=> {
			if (! alive) return;
			setSheet(v);
			if (v) setNatSize(src, v.boxW, v.boxH);	// const.sn.lay[N].…width/height用（本家GrpLayer.ts相当）
		});
		return ()=> {alive = false};
	}, [src, isSheet]);
	return sheet;
}

// srcが指す画像をImage()で事前ロードし、decode()完了を待ってからのみ返す（本家がpixiの
//	テクスチャとしてロードするのと同じ待ち方）。<img>をDOMへ即挿入してブラウザのネイティブ
//	非同期デコードへ任せると、ダウンロード／デコードが終わる前の途中経過（画像の一部だけ
//	描画された状態）がそのまま画面に出てしまう（2026-08-23、sn_galleryの実機比較で発覚。
//	todo.md参照）。srcが変わってもロード完了までは前回ロード済みのsrcを返し続けるため、
//	新しい絵に完全に差し替わるまで古い絵のまま止まる（＝pixiテクスチャと同じ「前の絵のまま」）
function useLoadedImg(src: string): string {
	const [loadedSrc, setLoadedSrc] = useState('');
	useEffect(()=> {
		if (! src) {setLoadedSrc(''); return}

		let alive = true;
		const img = new Image;
		img.src = src;
		img.decode().then(()=> {
			if (! alive) return;
			setNatSize(src, img.naturalWidth, img.naturalHeight);
			setLoadedSrc(src);
		}).catch(()=> {/* デコード失敗（壊れた画像等）は前の絵のまま留める */});
		return ()=> {alive = false};
	}, [src]);
	return loadedSrc;
}

// 差分絵（face）1枚分。基本画像と同じくisSheetならCSSアニメ再生のdiv、そうでなければimgで描く。
//	dx,dyでdiv0基準の絶対配置、blendmodeはmix-blend-modeへそのまま渡す
function FaceImg({fn: faceFn, src: faceSrc, isSheet, dx, dy, blendmode}: T_FACE_SRC) {
	const sheet = useSheet(faceSrc, isSheet);
	const loadedSrc = useLoadedImg(isSheet ? '' : faceSrc);
	if (! faceSrc) return null;

	const styPos: CSSProperties = {position: 'absolute', left: dx, top: dy, mixBlendMode: blendmode as CSSProperties['mixBlendMode']};
	if (sheet) return <div className={aniSpriteClass(sheet)} style={styPos} data-fn={faceFn}/>;
	if (isSheet) return null;	// シート読み込み中はまだ描かない（基本画像と同じ挙動）
	if (! loadedSrc) return null;	// デコード完了まで描かない
	return <img src={loadedSrc} data-fn={faceFn} style={styPos}/>;
}

// 画像1枚をロード（decodeまで待たずonloadで十分＝直後にcanvasへdrawImageするだけ）。
//	FxRunner.ts の同名関数と同じ（あちらはlazyモジュール側なので共有せず各々持つ）
function loadImg(src: string): Promise<HTMLImageElement> {
	return new Promise((re, rj)=> {
		const im = new Image;
		im.onload = ()=> re(im);
		im.onerror = ()=> rj(new Error(`画像が読めません: ${src.slice(0, 64)}`));
		im.src = src;
	});
}

// blendmode（CSSのmix-blend-mode値。Blendmode.ts）→ 2D canvas の globalCompositeOperation。
//	face が取りうるのは normal/plus-lighter/multiply/screen の4種だけ（Blendmode.ts H_BLENDMODE）
const H_GCO: {readonly [css: string]: GlobalCompositeOperation} = {
	'plus-lighter': 'lighter', multiply: 'multiply', screen: 'screen',
};

// sheet face の現在フレーム（elapsedMs から一巡内の位置を出す。CSS アニメと同じ算式）
function sheetFrame(sh: T_SHEET, elapsedMs: number): T_FRAME {
	const k = sh.sec > 0 ? Math.floor(elapsedMs / 1000 / sh.sec * sh.cnt) % sh.cnt : 0;
	return sh.frames[k] ?? sh.frames[0]!;
}

// 基本画像＋face を1枚のoffscreen 2D canvasへ合成した「fx のテクスチャ源」を作る（ANIMATION_RESEARCH.md §7 step 4）。
//	・sheet face が無ければ**一度きり合成した <canvas>** を返す（従来。差分が変わった時だけ呼ばれる）
//	・sheet face があれば**毎フレーム描き直す関数**を返す（FxRunner が rAF ごとに texImage2D で吸い上げる）
//	dx,dy＝基本画像の左上原点（DOM版FaceImgと同じ）。canvas外へはみ出す分は切れる
async function makeFxSource(baseSrc: string, aFace: readonly T_FACE_SRC[]): Promise<HTMLCanvasElement | (()=> HTMLCanvasElement)> {
	const stat = aFace.filter(f=> ! f.isSheet);
	const anim = aFace.filter(f=> f.isSheet);
	const [base, ...statImgs] = await Promise.all([loadImg(baseSrc), ...stat.map(f=> loadImg(f.src))]);

	const cvs = document.createElement('canvas');
	cvs.width = Math.max(1, base.naturalWidth);
	cvs.height = Math.max(1, base.naturalHeight);
	const ctx = cvs.getContext('2d');
	if (! ctx) throw new Error('2Dコンテキストが取得できません');

	const drawStatic = ()=> {
		ctx.globalCompositeOperation = 'source-over';
		ctx.drawImage(base, 0, 0);
		stat.forEach((f, i)=> {
			ctx.globalCompositeOperation = H_GCO[f.blendmode] ?? 'source-over';
			ctx.drawImage(statImgs[i]!, f.dx, f.dy);
		});
	};

	if (anim.length === 0) {drawStatic(); return cvs}

	const sheets = await Promise.all(anim.map(async f=> {
		const sh = await loadSheet(f.src);
		if (! sh) throw new Error(`シート定義が読めません: ${f.src.slice(0, 64)}`);
		return {sh, img: await loadImg(sh.img)};
	}));
	const t0 = performance.now();
	return ()=> {
		ctx.clearRect(0, 0, cvs.width, cvs.height);
		drawStatic();
		const elapsed = performance.now() - t0;
		anim.forEach((f, i)=> {
			const {sh, img} = sheets[i]!;
			const fr = sheetFrame(sh, elapsed);
			ctx.globalCompositeOperation = H_GCO[f.blendmode] ?? 'source-over';
			ctx.drawImage(img, fr.x, fr.y, fr.w, fr.h, f.dx + fr.ox, f.dy + fr.oy, fr.w, fr.h);
		});
		return cvs;
	};
}

// [add_fx]（立ち絵・背景シェーダエフェクト。ANIMATION_RESEARCH.md §7 の「C 方式」）。
//	基本画像の<img>（呼び出し側が常に敷く）へレイヤ実寸の<canvas>（WebGL）を絶対配置で重ねる。
//	styLay()が与えるtransform/opacity/z順/blendmodeは親div0経由でどちらにも効く。
//	重い部分（WebGLランナー・プリセットGLSL）はlazy importで、[add_fx]が使われた回にはじめて
//	src/ts/FxRunner.ts が読まれる（コアのバンドルに載らない）。
//	face（静止・sheet とも）は基本画像へ合成してシェーダに通す（sheet は毎フレーム再合成）。
//	初回フレーム描画までは onReady(false)＝下の<img>が見える（構成切替時に一瞬消えない）
function FxImg({src, aFace, aFx, active, onReady}: {src: string; aFace: T_FACE_SRC[]; aFx: T_FX[]; active: boolean; onReady: (b: boolean)=> void}) {
	const ref = useRef<HTMLCanvasElement>(null);
	const handle = useRef<{update(a: T_FX[], active: boolean): void; dispose(): void} | null>(null);
	// canvasを作り直すのは**テクスチャ源が変わったとき**だけ（基本画像・静止 face）：
	//	WEBGL_lose_context.loseContext()後の同一canvasからは生きたコンテキストを取り直せないため
	//	使い捨てにして開き直す。**シェーダ構成（fx名/glsl/パス数）が変わっても作り直さない**——
	//	handle.update() が同じコンテキスト上でプログラムを組み直す（＝切替時に空白が出ない。
	//	以前は structKey で canvas ごと張り替えていて runFx 完了まで一瞬消えていた）。
	//	パラメータ・speed・time・enabled（[pause_fx]/[resume_fx]）も update() でホットスワップ
	//	（再生成すると tick=0 へ戻る。ANIMATION_RESEARCH.md §7 step 2）
	const faceKey = aFace.map(f=> `${f.src}@${String(f.dx)},${String(f.dy)},${f.blendmode},${String(f.isSheet)}`).join(';');
	const sourceKey = `${src}\n${faceKey}`;
	const contentKey = JSON.stringify(aFx);
	// sourceKeyのuseEffectを回さない値はmount時だけrefで拾う（activeとaFx。以後は下のupdate effect）
	const activeRef = useRef(active);
	activeRef.current = active;
	const aFxRef = useRef(aFx);
	aFxRef.current = aFx;
	useEffect(()=> {
		const cvs = ref.current;
		if (! cvs || ! src) return;

		let alive = true;
		void (async ()=> {
			const source = aFace.length > 0 ? await makeFxSource(src, aFace) : src;
			if (! alive) return;
			const {runFx} = await import('../ts/FxRunner');
			const h = await runFx({canvas: cvs, source, aFx: aFxRef.current, active: activeRef.current});
			if (alive) {handle.current = h; onReady(true)}	// 初回フレーム描画済み＝下の<img>を隠してよい
			else h.dispose();
		})().catch((e: unknown)=> {console.error(`[add_fx] ${String(e)}`)});
		return ()=> {alive = false; onReady(false); handle.current?.dispose(); handle.current = null};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [sourceKey]);
	// シェーダ構成／パラメータ／enabled（[pause_fx]）／active（不可視ページ）の変化は
	//	canvasを保ったまま handle.update() で反映（構成変化はプログラムだけ組み直す）
	useEffect(()=> {
		handle.current?.update(aFx, active);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [contentKey, active]);

	// 基本<img>の上に敷く（div0はposition:absolute＝これの包含ブロック。inset:0で<img>の箱いっぱいに）
	return <canvas key={sourceKey} ref={ref} style={{position: 'absolute', inset: 0}}/>;
}

export default function GrpLayer({cmn: {styChild, isDesignMode}, sty, nm, fn, src, isSheet, isMovie, aFace, aFx, fxActive, getVideoVol, needClick2Play}: T_GRPARG) {
	const onMouseDown = (e: MouseEvent)=> {	// left, middle, right
		if (e.button != 1) {
			return
		}
console.log(`fn:GrpLayer.tsx line:28 MIDDLE:`);
	};

	// 差分合成（face）の重ね方針：
	//	・div0（ラッパー）を Stage 上の配置単位（Moveableの対象）とし、styChild/sty4Moveableはここに適用する
	//	・基本画像（fn）は通常フローで配置し、その自然サイズでdiv0をサイズ確定させる
	//	　（position:absoluteにするとサイズが親のサイズ計算に反映されなくなるため）
	//	・差分絵（face）は div0 を基準に position:absolute で dx,dy に配置し、blendmodeをmix-blend-modeへそのまま渡す
	//	・重なり順は aFace の配列順（[lay face=A,B,C]の記述順）＝DOM順で自然に実現される
	// アニメpng（スプライトシート）。`[lay fn=…]`のパス解決結果が.jsonなら**シートの定義**で、
	//	そこからコマの格子と再生速度を読んでCSSアニメで再生する（Sprite.ts / Lay.ts styAniSprite）。
	//	読み込みが非同期なのでここで待つ：ストアはURLまでを持ち、
	//	**アセットの中身（コマ割り）は画面側の関心事**という切り分け（画像の自然サイズと同じ扱い）。
	//	**isSheetはpropsで受け取る**（ScriptMngがBlob URL化前のsrcで判定してストアへ渡す）。
	//	fn（論理名。例："anime"）は拡張子を持たないためここでは判定できず、
	//	crypto構成ではsrcもBlob URLに化けて拡張子情報を失う
	const sheet = useSheet(src, isSheet);

	// 基本画像もアニメpngシートと同じくuseLoadedImgでdecode完了を待ってから描く
	//	（isSheet/isMovie時はここでロード不要なので''を渡してスキップ）
	const loadedSrc = useLoadedImg(isSheet || isMovie ? '' : src);

	// [add_fx] の canvas が初回フレームを描いたか（FxImg が onReady で上げ下げ）。false の間は
	//	基本 <img> を見せる＝構成切替・[clear_fx]直後に一瞬消えない。[clear_fx]で fx が無くなったら戻す
	const [fxReady, setFxReady] = useState(false);
	useEffect(()=> {if (aFx.length === 0) setFxReady(false)}, [aFx.length]);

	// 動画（[lay fn=movie.mp4/.webm]）はisMovie propsで判定（上記isSheetと同じ理由でfnからは
	//	判定できない。`ConfigBase.SEARCH_PATH_ARG_EXT.SP_GSM`にmp4|webmが登録済みなのでパス解決自体は既に通る）。
	// マウント時点の値だけ当てる（ref callback。本家 SpritesMng.ts:288-296 #charmVideoElm()と同じ
	//	タイミング）。以後の変化（音量スライダ操作）はScriptMng.#applyMovieVolume()がステージ配下の
	//	<video>を直接書き換える側で追随させる
	const onVideoRef = (ve: HTMLVideoElement | null)=> {
		if (! ve) return;
		ve.volume = getVideoVol();
		ve.muted = needClick2Play();
	};

	// [lay width=/height=]（本家 GrpLayer.ts:88-91 sp.width/height 相当）。div0（親）は
	//	styLay()がpxで箱のサイズを決めるので、中身は**指定された軸だけ**100%を当てて箱に合わせる
	//	（本家pixiのSprite.width/heightと同じくアスペクト比は無視。片方だけ指定時は他方auto＝
	//	自然サイズのまま、というTxtLayer.tsx:502-504の待ちマーク画像と同じパターン）。
	//	差分絵（aFace）は対象外（本家 SpritesMng.#csv2Sprites の fncFirstComp はcsvの先頭要素＝
	//	基本画像にしかwidth/heightを適用しないため常に自然サイズ。スプライトシート対応の可否とは
	//	別の話——各要素は等しくアニメpngシート判定される。下のFaceImg参照）
	const styFit: CSSProperties = {display: 'block',
		...('width' in sty ? {width: '100%'} : {}), ...('height' in sty ? {height: '100%'} : {})};

	// div0はposition:absoluteかつwidth未指定（[lay width=]の明示が無い）とき、CSSのshrink-to-fit
	//	計算に落ちる。available width（containing blockの右端までの残り幅）が画像の自然幅より
	//	狭いと、そこまで縮小されてしまう——[lay center=/right=/pos=]でステージ幅の半分を超える
	//	立ち絵をcontaining blockの端寄りへ配置すると顕在化する（例：pos=&pos.l1cでF_1024aFullが
	//	1/3程度に縮んで表示された）。max-contentで常に内容の自然幅を使わせ、sty.widthの明示
	//	（後勝ち）があればそちらを優先する
	const styDiv0: CSSProperties = {width: 'max-content', ...sty};
	return <Layer styChild={styChild} isDesignMode={isDesignMode} nm={nm} sty={styDiv0} keepRatio={true} onMouseDown={onMouseDown}>
		{/* srcが空（未指定・解決失敗）のときは<img src="">を描画しない
			（Reactがページ全体再ダウンロードの可能性を警告するため）。
			アニメpngは<img>ではなく背景画像を送るdivで描く（読み込み前は何も描かない）。
			基本画像はuseLoadedImgでdecode完了を待ってから描く（読み込み中は前の絵のまま） */}
		{sheet && <div className={aniSpriteClass(sheet)}/>}
		{src && isMovie && <video ref={onVideoRef} src={src} autoPlay playsInline data-fn={fn} style={styFit}
			onLoadedMetadata={e=> {setNatSize(src, e.currentTarget.videoWidth, e.currentTarget.videoHeight)}}/>}
		{/* 基本画像は fx の有無に関わらず常に敷く（＝div0 のサイズも決める）。fx 有効かつ canvas が
			初回フレームを描くまで（fxReady=false）は見せ、描いたら隠す＝構成切替で一瞬消えない・
			立ち絵の縁が二重に出ない。fx canvas は下の <FxImg> が absolute でこの上へ重ねる */}
		{loadedSrc && ! isSheet && ! isMovie
			&& <img src={loadedSrc} style={aFx.length > 0 && fxReady ? {...styFit, visibility: 'hidden'} : styFit}/>}
		{loadedSrc && ! isSheet && ! isMovie && aFx.length > 0
			&& <FxImg src={loadedSrc} aFace={aFace} aFx={aFx} active={fxActive} onReady={setFxReady}/>}
		{/* fx有効時（基本画像が静止画）は face（静止・sheet とも）を FxImg が合成済み＝DOM には出さない。
			それ以外（fx無効／基本画像が sheet・動画）は全 face を従来どおり DOM オーバーレイで重ねる */}
		{(aFx.length > 0 && loadedSrc && ! isSheet && ! isMovie ? [] : aFace)
			.map((face, i)=> <FaceImg key={`${face.fn}_${String(i)}`} {...face}/>)}
	</Layer>;
}
