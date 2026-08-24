/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2024-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import {type T_LAY_IDX, type T_LAY_CMN} from './Lay';
import Layer from './Layer';
import {aniSpriteClass, loadSheet, setNatSize, type T_SHEET} from '../ts/Sprite';

import {type CSSProperties, MouseEvent, useEffect, useState} from 'react';


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

// 差分絵（face）1枚分。基本画像と同じくisSheetならCSSアニメ再生のdiv、そうでなければimgで描く。
//	dx,dyでdiv0基準の絶対配置、blendmodeはmix-blend-modeへそのまま渡す
function FaceImg({fn: faceFn, src: faceSrc, isSheet, dx, dy, blendmode}: T_FACE_SRC) {
	const sheet = useSheet(faceSrc, isSheet);
	if (! faceSrc) return null;

	const styPos: CSSProperties = {position: 'absolute', left: dx, top: dy, mixBlendMode: blendmode as CSSProperties['mixBlendMode']};
	if (sheet) return <div className={aniSpriteClass(sheet)} style={styPos} data-fn={faceFn}/>;
	if (isSheet) return null;	// シート読み込み中はまだ描かない（基本画像と同じ挙動）
	return <img src={faceSrc} data-fn={faceFn} style={styPos}/>;
}

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
	const sheet = useSheet(src, isSheet);

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
			アニメpngは<img>ではなく背景画像を送るdivで描く（読み込み前は何も描かない） */}
		{sheet && <div className={aniSpriteClass(sheet)}/>}
		{src && isMovie && <video ref={onVideoRef} src={src} autoPlay playsInline data-fn={fn} style={styFit}
			onLoadedMetadata={e=> {setNatSize(src, e.currentTarget.videoWidth, e.currentTarget.videoHeight)}}/>}
		{src && ! isSheet && ! isMovie && <img src={src} style={styFit}
			onLoad={e=> {setNatSize(src, e.currentTarget.naturalWidth, e.currentTarget.naturalHeight)}}/>}
		{aFace.map((face, i)=> <FaceImg key={`${face.fn}_${String(i)}`} {...face}/>)}
	</Layer>;
}
