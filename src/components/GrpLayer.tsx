/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2024-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import {type T_LAY_IDX, type T_LAY_CMN, noticeDrag} from './Lay';
import {aniSpriteClass, loadSheet, type T_SHEET} from '../ts/Sprite';

import {type CSSProperties, MouseEvent, useEffect, useRef, useState} from 'react';
import Moveable from 'react-moveable';


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
//	（サーチパスに無いと例外を投げるので、renderで投げるとReactごと落ちる）
export type T_FACE_SRC = T_FACE & {src: string};
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
	getVideoVol		: ()=> number;	// sys:sn.sound.movie_volume × global_volume（ScriptMng.getMovieVolume()）
	needClick2Play	: ()=> boolean;	// 自動再生ブロック中なら初期muted（本家 SpritesMng.ts:288-296）
};
// ストア（zustand）に保存するデータだけの型（cmnはrender時のPropsのみなので不要）
export type T_GRPLAY_DATA = T_LAY_IDX & {cls: 'grp'; fn: string; src: string; isSheet: boolean; isMovie: boolean; aFace: T_FACE_SRC[]};
export type T_GRPLAY = T_GRPLAY_DATA & T_LAY_CMN;


export default function GrpLayer({cmn: {styChild, isDesignMode}, sty, nm, fn, src, isSheet, isMovie, aFace, getVideoVol, needClick2Play}: T_GRPARG) {
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
	const [sheet, setSheet] = useState<T_SHEET | undefined>(undefined);
	useEffect(()=> {
		// crypto構成では復号中の一瞬src=''になる（ScriptMng #decryptPic）。空のままfetchしない
		if (! isSheet || ! src) {setSheet(undefined); return}

		let alive = true;
		void loadSheet(src).then(v=> {if (alive) setSheet(v)});
		return ()=> {alive = false};
	}, [src, isSheet]);

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
	//	差分絵（aFace）は対象外（本家もcsvの先頭スプライトにしか適用しないため常に自然サイズ）
	const styFit: CSSProperties = {display: 'block',
		...('width' in sty ? {width: '100%'} : {}), ...('height' in sty ? {height: '100%'} : {})};

	const div0 = useRef<HTMLDivElement>(null);
	const evt = (style: CSSStyleDeclaration, transform: string)=> {
		noticeDrag();
		style.transform = transform;
	}
	return <>
		<div css={styChild} ref={div0} data-lay={nm} style={sty} onMouseDown={e=> onMouseDown(e)}>
			{/* srcが空（未指定・解決失敗）のときは<img src="">を描画しない
				（Reactがページ全体再ダウンロードの可能性を警告するため）。
				アニメpngは<img>ではなく背景画像を送るdivで描く（読み込み前は何も描かない） */}
			{sheet && <div className={aniSpriteClass(sheet)}/>}
			{src && isMovie && <video ref={onVideoRef} src={src} autoPlay playsInline data-fn={fn} style={styFit}/>}
			{src && ! isSheet && ! isMovie && <img src={src} style={styFit}/>}
			{aFace.map(({fn: faceFn, src: faceSrc, dx, dy, blendmode}, i)=> {
				if (! faceSrc) return null;
				return <img
					key={`${faceFn}_${String(i)}`}
					src={faceSrc}
					style={{position: 'absolute', left: dx, top: dy, mixBlendMode: blendmode as CSSProperties['mixBlendMode']}}
				/>;
			})}
		</div>
		{isDesignMode && <Moveable
			target={div0}

			/* draggable */
			draggable={true}
			throttleDrag={1}
			onDrag={({target: {style}, transform})=> evt(style, transform)}

			/* resizable*/
			resizable={true}
			keepRatio={true}
			onResize={({target: {style}, width, height, drag: {transform}})=> {
				evt(style, transform);
				style.width = `${width}px`;
				style.height = `${height}px`;
			}}

			/* rotatable */
			rotatable={true}
			throttleRotate={0}
			startDragRotate={0}
			throttleDragRotate={0}
			rotationPosition={'top'}
			onRotate={({target: {style}, drag: {transform}})=> evt(style, transform)}

			originDraggable={true}
			onDragOrigin={({target: {style}, transformOrigin, drag: {transform}})=> {
				evt(style, transform);
				style.transformOrigin = transformOrigin;
			}}
		/>}
	</>;
}
