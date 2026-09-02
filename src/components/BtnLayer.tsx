/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2026-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import {focusMng} from '../ts/FocusMng';
import {hintMng} from '../ts/Hint';
import {useStore} from '../store/store';
import {CmnLib} from '../sn/CmnLib';

import type {T_BTN_STY} from './TxtLayer';
import {applyTransform, BTN_DEF_H, BTN_DEF_W} from './Lay';

import {css} from '@emotion/react';
import {type CSSProperties, type KeyboardEvent, type MouseEvent, useEffect, useLayoutEffect, useRef, useState} from 'react';


type T_BTNARG = {
	text	: string;
	label	: string;
	call	: boolean;
	fn		: string;
	arg?	: string | undefined;	// [button arg=...]。クリック時に&sn.eventArgとして受け取れる
	url?	: string | undefined;	// [button url=...]。指定時はラベルへ飛ばず別タブでURLを開く（fn・labelより優先）
	sty?	: T_BTN_STY | undefined;
	enabled	: boolean;	// 親の文字レイヤの[enable_event enabled=]。falseの間はクリックもキー操作も受けない
	onActivate: (label: string, call: boolean, fn: string, arg?: string)=> void;
	onNavigate: (url: string)=> void;	// [button url=…]（[link url=…]と同じ経路＝ScriptMng.navigateTo）
	onSe: (fn: string, buf: string)=> void;	// [button clickse=/enterse=/leavese=]
	onHoverCall: (label: string, fn: string)=> void;	// [button onenter=/onleave=]（ScriptMng.hoverCall）
};

// [button]の配置・寸法・変形をCSSへ（本家 Button.ts のコンストラクタ相当）。
//	**left/topが書かれた時だけ絶対配置**にする。本家は常に絶対配置（省略時0,0）だが、
//	試作のシナリオは座標指定なしで複数並べており、既定を(0,0)にすると全部重なるため。
//	fit は「文字を箱(width×height)ちょうどに収める倍率」。本家は pixi Text.width/height が
//	文字スプライトを拡縮して箱に合わせる（短い文字は広げ、長い文字は縮めて1行に収める）が、
//	CSSに相当機能が無いのでBtnLayer側で実測した倍率を transform:scale として合成する。
// 箱の大きさ。**エンジンの[button]入口で必ず埋まっている**（本家 Button.ts と同じ既定）ので、
//	ここでの ?? は古いセーブから復元した取りこぼし用の保険
function btnSize(o: T_BTN_STY | undefined): {w: number; h: number} {
	return {w: o?.width ?? BTN_DEF_W, h: o?.height ?? BTN_DEF_H};
}
// 箱の実際の大きさ。**画像ボタン（pic）だけ**絵の実寸が箱の大きさになる（本家 Button.ts:280）。
//	width/heightが書かれていればそちらが勝つ（本家も同様）。絵が未読込のうちは0（呼び出し側が
//	0pxで置かないようガードする）。
//	b_picは対象外：left/topが位置決めするのは**文字の箱**（本家もcontainer.x/y＝txt原点で、
//	sp（背景画像）はtxtを基準に中央合わせで後付けされるだけ。Button.ts:80-81,249-257）。
//	ここをpic同様に絵の実寸へ広げると、left/topの基準点が「文字位置」から「背景画像位置」へ
//	すり替わってしまう（sn_gallery ch_button #19 で発覚：本家で文字位置だった座標が分家では
//	背景画像の左上になっていた）
function btnBoxSize(o: T_BTN_STY | undefined, natPic: {w: number; h: number} | null): {w: number; h: number} {
	if (! o) return {w: BTN_DEF_W, h: BTN_DEF_H};
	return o.pic
		? {w: o.width ?? natPic?.w ?? 0, h: o.height ?? natPic?.h ?? 0}
		: btnSize(o);
}
function styBtnArg(o: T_BTN_STY, natPic: {w: number; h: number} | null): CSSProperties {
	const sty: CSSProperties = {};
	if (o.left !== undefined || o.top !== undefined || o.s_right !== undefined || o.s_bottom !== undefined) {
		sty.position = 'absolute';
		sty.margin = 0;
		// 横位置：left（＋center/rightの寄せ）か、ステージ右端からのs_rightか（本家も else if で排他。[lay]と同じ）
		//	left/topはpivot分を引いて箱の左上へ変換する（本家ButtonもContainerでpivotがx/yの
		//	基準点を兼ねるため。下のtransformOrigin＝pivotとセットでpixiの動きに一致する。Lay.ts styLay()と同じ理由）
		if (o.s_right !== undefined) sty.right = `${String(o.s_right)}px`;
		else sty.left = `${String((o.left ?? 0) - (o.pivot_x ?? 0))}px`;
		if (o.s_bottom !== undefined) sty.bottom = `${String(o.s_bottom)}px`;
		else sty.top = `${String((o.top ?? 0) - (o.pivot_y ?? 0))}px`;
	}
	// 中央寄せ・右端合わせ（本家「表示物の幅を引く」）は独立translateプロパティで表現する。
	//	transformとは別プロパティなので、下のrotation/scaleと衝突しない。
	//	画像ボタンの箱幅は既に3コマ分の1（natPic.w = naturalWidth/3）なので、-50%がそのまま
	//	本家のb_width/3計算と一致する
	if (o.align_x !== undefined || o.align_y !== undefined) {
		const tx = o.align_x === 'center' ? '-50%' : o.align_x === 'right' ? '-100%' : '0';
		const ty = o.align_y === 'middle' ? '-50%' : o.align_y === 'bottom' ? '-100%' : '0';
		sty.translate = `${tx} ${ty}`;
	}
	{
		// 画像ボタンは絵の実寸が箱の大きさ。読み込むまでは値を書かない
		//	——0pxで置くと一瞬潰れて見えるため
		const {w, h} = btnBoxSize(o, natPic);
		if (w > 0) sty.width = `${String(w)}px`;
		if (h > 0) sty.height = `${String(h)}px`;
		if (! o.pic) {
			// フォントサイズは**文字自身の箱**（width/height省略時BTN_DEF）から取る。b_pic指定時も
			//	本家は文字スプライトをwidth=100/height=30（既定）へ拡縮するだけで、b_pic画像の実寸には
			//	連動しない（Button.ts:123,152。#o.width/heightが実寸へ広がるのは#loaded_b_pic後の
			//	コンテナ寸法の話で、文字そのものの拡縮とは別）。上のwは背景画像を敷く箱の大きさなので
			//	ここで使うとb_pic枠いっぱいに文字が引き伸ばされてしまう
			sty.fontSize = `${String(btnSize(o).h)}px`;	// 本家も fontSize:height（Button.ts:133）
			sty.lineHeight = 1;
			// padding:5pxは基本CSS（styBtnTxt、下のtxtRef側）まかせ（本家 Button.ts:126
			//	TextStyle.padding:5と同じ値）。本家はpixi Text.widthセット時、canvas全体
			//	（文字+padding*2）を基準にスケールするため（@pixi/text text.mjs updateText()）、
			//	fit実測もpadding込みのoffsetWidth/Heightで揃える必要がある（だからpaddingは
			//	fitのtransformと同じtxtRef側に置く。箱側styBtnに残すとfit計算に含まれず本家と
			//	比率がずれる）
		}
		sty.boxSizing = 'border-box';
	}
	// 画像ボタン（[button pic=…]）。**絵は「通常｜押下｜ホバー」を横に3コマ並べた1枚**
	//	（本家 Button.ts:269 が幅を3等分して張り替える）。CSSでは背景を3倍幅に敷き、
	//	background-position-x を 0%／50%／100% と動かせば同じ3コマになる
	//	（背景が要素の3倍幅のとき、この3つがちょうど各コマの左端に当たる）。
	//	状態ごとの切り替えは styBtn 側の &:hover / &:active が持つ
	if (o.pic && o.src) {
		sty.backgroundImage = `url("${o.src}")`;
		// enabled=falseは3コマ分割しない（本家 Button.ts:270。上のnatPic参照）ので、
		//	箱＝絵の実寸ちょうどに敷くだけでよい。100%を書かなくても既定のautoで実寸表示になるが、
		//	明示しておく方が「コマ分割しない」意図が読み取りやすい
		sty.backgroundSize = o.enabled === false ? '100% 100%' : '300% 100%';
		sty.backgroundRepeat = 'no-repeat';
		// **どのコマを見せるかはインラインで書かない**。インラインstyleは`:hover`/`:active`の
		//	ルールより強く、状態で切り替えられなくなるため（切り替えはstyBtn側が持つ）
	}
	// 背景画像（[button b_pic=…]）は下のstyBtnの`&::before`が敷く。ここ（インラインstyle）に
	//	置かないのは、この関数が返す値は下のtransform（fit込み）を丸ごと受ける要素そのものの
	//	styleだから——同じ要素に置くと背景まで一緒にfitで縮んでしまう（sn_gallery ch_button で発覚）
	if (o.alpha !== undefined) sty.opacity = o.alpha;

	// 変形：回転・拡縮（[button rotation=/scale_x=/scale_y=]、本家指定分のみ）。
	//	文字を箱ちょうどに収めるフィット倍率(fit)は**ここに含めない**：この関数が返すsty(width/height
	//	込み)はボタンの箱そのもの（ref側）に当たり、箱自身のCSS width/heightを固定した上に
	//	目標/自然比のscaleまで重ねると二重にスケールされてしまう（下のtxtRef側コメント参照）。
	//	原点は常に本家pivot（既定左上）。本家はrotation/scale_x/scale_yをボタンコンテナ（背景画像
	//	込みの箱全体）へ、fit相当のText.width/heightはText自身のローカル原点基準で別々に掛けており、
	//	ここでも箱側はfit抜きの本来のpivot基準のままでよい（Button.ts:85,123-153）
	applyTransform(o, sty);
	if (o.blendmode !== undefined) sty.mixBlendMode = o.blendmode as CSSProperties['mixBlendMode'];
	// enabled=false：本家は文字を灰色にしてイベントも受けない（Button.ts の fill と evtMng.button）
	if (o.enabled === false) {sty.color = 'gray'; sty.pointerEvents = 'none'}
	return sty;
}

// [button layer=... text=... label=*goal] タグに対応するボタン1件分の表示。
//	文字レイヤ（TxtLayer）がUIコンテナとなり、この中に複数個並べて描画される
//	（独立レイヤにはしない＝表示/非表示や移動をTxtLayerと一緒にまとめて扱える）。
//	ポイント：ボタンのクリックは「読み進め」（Main.tsxのnext()）扱いにしない。
//	Stage.tsxのルートdivにonClick={next}が付いているため、ここでstopPropagation()して
//	クリックイベントの伝播を止め、Caretaker/isReadBackなどの読み進め系状態には一切触れずに
//	ScriptMng.jumpToLabelAndGo()経由で直接ジャンプ・進行させる。
export default function BtnLayer({text, label, call, fn, arg, url, sty, enabled, onActivate, onNavigate, onSe, onHoverCall}: T_BTNARG) {
	// 実効的な有効・無効：層側（[enable_event]）とボタン自身（[button enabled=]）のANDを取る
	const isEnabled = enabled && sty?.enabled !== false;
	// 文字フォントは組み込み変数 tmp:sn.button.fontFamily（本家 LayerMng.ts:209）。
	//	ストアへ写しているのはScriptMngで、ステージ既定フォント（Stage.tsx）とは別に差し替えられる
	const btnFont = useStore(s=> s.btnFont);

	// [set_focus to=next/prev]で巡回する対象として登録する（本家 EventMng.ts:435 で
	//	ゲーム内ボタンをFocusMngへ入れているのに対応）。表示されている間だけ輪に居ればよいので、
	//	マウント／アンマウントで出し入れする。spanなのでtabIndexを付けないとfocus()が効かない。
	//	isEnabledの変化でも出し入れする：[enable_event enabled=false]の間はクリックを受けない
	//	（TxtLayer.tsxのpointer-events:none）のに、フォーカスの輪には残ったままだと
	//	ゲームパッド・キーボードのEnterだけは素通りしてしまうため（実例：タイトル画面の
	//	クリック待ちオーバーレイ表示中でもタイトルボタンにフォーカスできてしまう不具合）
	const ref = useRef<HTMLSpanElement>(null);
	useEffect(()=> {
		const el = ref.current;
		if (! el || ! isEnabled) return;

		focusMng.add(el);
		return ()=> focusMng.remove(el);
	}, [isEnabled]);

	// fit倍率を測る対象（下のtxtRef＝文字だけを包む内側要素。常に自然サイズなので
	//	measure()側でwidth等を一時的にいじる必要が無い。理由は下のuseLayoutEffect参照
	const txtRef = useRef<HTMLSpanElement>(null);

	// 画像ボタンの箱の大きさ＝**絵の実寸**（横は3コマ並びなので1/3）。本家 Button.ts:280 に対応。
	//	実寸を知れるのはDOM側だけなので、ここで読み込んで測る。
	//	width/heightが書かれていればそちらが勝つ（本家も `'width' in hArg` を優先する）。
	//	**enabled=falseは3コマ分割しない**——本家 Button.ts:270 `w = enabled ? w_3 : sp.width` と
	//	同じで、クリックを受けないボタンは通常｜押下｜ホバーの状態を持たないため、絵をそのまま
	//	1枚の飾り画像として使う（ch_gallery/ch_button の非ボタン用途。main.sn:31）
	const picSrc = sty?.pic ? sty.src ?? '' : '';
	const picEnabled = sty?.enabled !== false;
	const [natPic, setNatPic] = useState<{w: number; h: number} | null>(null);
	useEffect(()=> {
		if (! picSrc) {setNatPic(null); return}

		let alive = true;
		const img = new Image;
		img.onload = ()=> {
			if (alive) setNatPic({w: picEnabled ? img.naturalWidth / 3 : img.naturalWidth, h: img.naturalHeight});
		};
		img.src = picSrc;
		return ()=> {alive = false};
	}, [picSrc, picEnabled]);
	// b_pic（背景画像）の実寸。picと違い3コマ分割は無いので、そのままの寸法を使う
	const bPicSrc = sty?.b_pic ? sty.b_src ?? '' : '';
	const [natBPic, setNatBPic] = useState<{w: number; h: number} | null>(null);
	useEffect(()=> {
		if (! bPicSrc) {setNatBPic(null); return}

		let alive = true;
		const img = new Image;
		img.onload = ()=> {
			if (alive) setNatBPic({w: img.naturalWidth, h: img.naturalHeight});
		};
		img.src = bPicSrc;
		return ()=> {alive = false};
	}, [bPicSrc]);

	// [button width=（height=）]指定時、文字を箱ちょうどに収める倍率を**実測**する（本家 pixi
	//	Text.width/height 相当。CSSに文字フィットが無いための代替）。txtRef（文字だけを包む内側
	//	要素、常にwidth/height無指定＝自然サイズ）のoffsetWidth/Heightと箱寸法との比をfitとする。
	//	**fitは箱（ref側）ではなくtxtRef側のtransformへ渡す**：以前は同じ要素にCSSのwidth:100px
	//	（目標サイズ）とtransform:scale(目標/自然)を両方掛けており、100×(100/自然)と二重に
	//	スケールされて箱からはみ出す/縮みすぎるバグになっていた（palt/pwidが箱の1.5倍・1.3倍に
	//	膨張、デフォルトは0.6倍に縮小、というsn_gallery実機比較で発覚。2026-08-24）。
	//	txtRef側は常に自然サイズのままなので、測定前にwidth/transformを一時的に戻す必要も無い。
	//	useLayoutEffect なので描画前に確定し、未縮小の文字が一瞬はみ出すチラつきは出ない。
	const [fit, setFit] = useState({x: 1, y: 1});
	useLayoutEffect(()=> {
		const el = txtRef.current;
		if (! el) {setFit({x: 1, y: 1}); return}
		if (sty?.pic) {setFit({x: 1, y: 1}); return}	// 画像ボタンに文字は無いのでフィットも要らない

		const measure = ()=> {
			// fitは**文字自身の箱**（btnSize＝width/height省略時BTN_DEF）に合わせる。b_pic指定でも
			//	絵の実寸には連動しない（styBtnArgのfontSize・下の`&::before`コメント参照）
			const {w: bw, h: bh} = btnSize(sty);
			const natW = el.offsetWidth, natH = el.offsetHeight;
			// 親の文字レイヤが[sys_menu visible=false]等でdisplay:noneの間に測ると0のまま
			//	（display:noneの要素はレイアウトされずoffsetWidth/Heightが常に0）。
			//	一度でも実測できたらそれで確定してよいので監視を打ち切る
			if (natW > 0 && natH > 0) ro.disconnect();
			setFit({
				x: natW > 0 ? bw / natW : 1,
				y: natH > 0 ? bh / natH : 1,
			});
		};
		const ro = new ResizeObserver(measure);
		ro.observe(el);
		measure();
		return ()=> ro.disconnect();
	}, [text, sty?.width, sty?.height, sty?.pic]);

	// 既定の見た目は**本家 Button.ts のデフォルト TextStyle**に寄せる（tag.html#button のデフォルトstyle）：
	//	fill:black / align:center / fontFamily:Hiragino系 / padding:5 /
	//	dropShadow:white・alpha0.7・blur7・distance0（＝CSSの text-shadow: 0 0 7px rgba(255,255,255,.7)）。
	//	本家は文字だけのボタン（枠・背景なし）なので、以前の丸枠ピル装飾は撤去した。
	//	hover は本家 style_hover.fill='white' に合わせて白へ。
	//	white-space:nowrap で1行を保ち、width指定時は上の fit（transform:scale）で箱幅に収める。
	const styBtn = css`
		position: relative;
		z-index: 2;

		/* inline-flexで文字を縦横中央に置く。b_pic指定時は箱の高さ（=枠画像の実寸）が
			文字の行の高さよりずっと大きくなるが、display:inline-blockのままだと文字は
			既定で箱の上端に流れるだけで縦方向は中央に来ない。下の疑似要素::before（背景）は
			箱の中心を基準に置いているので、文字も箱の中心に来ないと互いにズレて見える
			（sn_gallery ch_button で発覚） */
		display: inline-flex;
		align-items: center;
		justify-content: center;
		box-sizing: border-box;
		margin: 0.3em;
		font-family: ${btnFont};
		font-size: x-large;
		/* 本家 Button.ts の TextStyle は fontWeight を指定しない＝normal。boldにすると線が太く重く見え、
			渡されたjpg（本家の実描画）より太く・縦長に見えていた。normalへ戻して本家に合わせる */
		font-weight: normal;
		text-align: center;
		/* pre：スペースをそのまま保持する（nowrapだと連続スペース圧縮＋端のスペース除去で、
			本家 ext_lang.sn の ' ロード ' / ' 設 定 ' のような余白入りラベルが詰められてしまう）。
			preも折り返さないのでフィット（1行維持）は変わらない */
		white-space: pre;
		color: black;
		text-shadow: 0 0 7px rgba(255, 255, 255, 0.7);
		cursor: pointer;
		user-select: none;
		transition: color 0.3s;
		/* [button style=…]。**bluesnovelはCSSで書ける**（本家はpixiのTextStyle JSON。
			波括弧で始まる値だけエンジンがCSSへ読み替える）。既定の後ろに置いて上書きさせる */
		${sty?.style ?? ''}
		/* フォーカス時もホバーと同じ見た目にする（本家 EventMng.ts:384 は pointerout で
			isFocus(ctnBtn) ? hv() : nr() と、フォーカスが残っている間だけホバー色を保つ）。
			ただし本家のisFocusはキー操作（Tab/ゲームパッド）でしか立たない——マウスクリックは
			pointerdownでhv()を呼ぶだけでフォーカスの輪には乗せない。一方bluesnovelはspan自身が
			DOM上でtabIndexを持つため、クリックしただけでネイティブのfocusが乗ってしまい、
			素の:focusで判定すると「クリック後マウスを離しても色が戻らない」ことになる
			（sn_gallery ch_buttonで発覚）。キー操作由来かどうかはFocusMng.tsがmodalityを見て
			付け外しするdata-focus-ringで判別できる（TxtLayer.tsxの待ちマーカーと同じ仕組み）ので、
			ここでも:focus単体でなく[data-focus-ring]:focusに絞る。
			既定のフォーカスリングは画面に合わないので消す。
			既定のホバーは本家 style_hover の fill:'white' 相当 */
		&:hover, &[data-focus-ring]:focus {${sty?.style_hover ?? 'color: white;'}}
		&:focus {outline: none;}
		/* 押下中。本家の既定は style_hover ＋ dropShadow:false ＝影を消す */
		&:active {${sty?.style_clicked ?? 'text-shadow: none;'}}
		/* 画像ボタンのコマ送り。絵は「通常｜押下｜ホバー」を横に3コマ並べた1枚で
			（本家 Button.ts:269 が幅を3等分して張り替える）、背景を3倍幅に敷いてあるので
			background-position-x の 0%／50%／100% がちょうど各コマの左端に当たる。
			**上の状態別ルールより後ろに置く**（同じ強さなら後勝ち） */
		${sty?.pic ? `
			background-position-x: 0%;
			&:hover, &:focus {background-position-x: 100%;}
			&:active {background-position-x: 50%;}
		` : ''}
		/* 背景画像（[button b_pic=…]）。本家は文字スプライトの背後へ絵を**中央合わせ**で置く
			（Button.ts:249-257：sp位置はtxtの原点基準、pivotに(sp-txt)/2を使うことでtxt中心に
			絵を揃える）。**要素本体ではなく疑似要素::beforeに置く**のがポイント：fit倍率
			（scale）は本体（箱）ではなく文字だけを包むtxtRef側に掛けているので、背景をtxtRefの
			中ではなく箱側の::beforeに置くことで、fitに引きずられず絵の実寸のまま中央に留まる
			（逆倍率で打ち消す必要は無い。以前はfitが箱側にもあったため打ち消しが要ったが、
			2026-08-24のfit二重スケール修正で箱側から抜いた）。
			ow/ohは**箱＝文字の既定サイズ**（btnBoxSizeはb_picでは広げない、上のコメント参照）。
			本家のtxt.width/heightに当たる */
		${sty?.b_pic && sty.b_src ? (()=> {
			const bw = natBPic?.w ?? 0, bh = natBPic?.h ?? 0;
			const {w: ow, h: oh} = btnBoxSize(sty, natPic);
			const left = (ow - bw) / 2, top = (oh - bh) / 2;
			return `
				&::before {
					content: '';
					position: absolute;
					left: ${String(left)}px;
					top: ${String(top)}px;
					width: ${String(bw)}px;
					height: ${String(bh)}px;
					background-image: url("${sty.b_src}");
					background-repeat: no-repeat;
					z-index: -1;
					pointer-events: none;
				}
			`;
		})() : ''}
	`;

	// 文字だけを包む内側要素。fit倍率（scale）は**必ずここ**（自然サイズのまま／width・height
	//	無指定）に掛ける。箱（styBtn）側にwidth:100pxのような固定サイズを持たせた状態で同じ倍率を
	//	重ねると「箱(100px)×(目標/自然)」と二重にスケールされてしまうため（上のfit計算コメント参照）。
	//	padding:5pxも本家同様ここに含める（本家Text.width/heightはpadding込みの寸法を100/30へ
	//	拡縮するため。fit計算のoffsetWidth/Heightもこの要素から測っており対応が取れている）。
	//	transformが効くにはdisplay:inline-block（無変形のinlineには効かない）が必要
	const styBtnTxt = css`
		display: inline-block;
		padding: 5px;
	`;

	// 効果音（本家 EventMng.ts:465-491）。enabled=falseのボタンは効果音も鳴らない
	//	（本家 Button.ts:101 の `if (this.#o.enabled) evtMng.button(...)` でリスナー自体が張られない
	//	のと同じ結果を、こちらは呼び出しの手前でガードして揃えている）
	const playSe = (fnKey: 'clickse' | 'enterse' | 'leavese', bufKey: 'clicksebuf' | 'entersebuf' | 'leavesebuf')=> {
		if (! isEnabled) return;
		const se = sty?.[fnKey];
		if (se) onSe(se, sty?.[bufKey] ?? 'SYS');
	};

	// 決定（マウスクリック／フォーカス中Enter・Space）。url指定なら[navigate_to]と同じ経路で
	//	URLを開き、ラベルへは飛ばない（本家 Main.ts:179 resumeByJumpOrCall。[link url=]と同じ扱い）
	const activate = ()=> {
		if (url) {onNavigate(url); return}
		onActivate(label, call ?? false, fn, arg);
	};

	const onClick = (e: MouseEvent)=> {
		e.stopPropagation();	// 親(Stage)のonClick(=読み進め)へ伝播させないのがポイント
		if (! isEnabled) return;
		hintMng.hide();			// 本家もpointerdownで消す（EventMng.ts:424）
		playSe('clickse', 'clicksebuf');
		activate();
	};

	// ツールチップ（[button hint=…]）。本家 EventMng.ts:418 も pointerover/out と
	//	フォーカスの出入りで出し入れする。吹き出しは画面に1つを使い回す（Hint.ts）
	const showHint = ()=> {
		if (sty?.hint) hintMng.show(ref.current!, sty.hint, sty.hint_style, sty.hint_opt);
	};
	// マウスの乗り降り（本家 pointerover/pointerout）。フォーカス（onFocus/onBlur）は
	//	キーボード操作でのヒント表示のためのbluesnovel独自拡張なので、本家に無いenterse/leavese
	//	までは鳴らさない（マウスでの乗り降りだけに揃える）
	// [button onenter=/onleave=]（本家 EventMng.ts:427-442）。enabled=falseのボタンは本家も
	//	リスナ自体を張らない（EventMng.button()が`if (this.#o.enabled)`の中）ので乗り降りとも撃たない
	const onMouseEnter = ()=> {
		showHint(); playSe('enterse', 'entersebuf');
		if (isEnabled && sty?.onenter) onHoverCall(sty.onenter, fn);
	};
	const onMouseLeave = ()=> {
		hintMng.hide(); playSe('leavese', 'leavesebuf');
		if (isEnabled && sty?.onleave) onHoverCall(sty.onleave, fn);
	};

	// フォーカス中のEnter／Spaceで押下扱い（キーボードだけで操作できるように）。
	//	マウスクリックと同じ「押された」動作なのでclickseも鳴らす
	const onKeyDown = (e: KeyboardEvent)=> {
		if (e.key !== 'Enter' && e.key !== ' ') return;

		e.stopPropagation();
		e.preventDefault();
		if (! isEnabled) return;
		hintMng.hide();			// onClickと同様、決定と同時にヒントも消す（ゲームパッドOKはここを通る）
		playSe('clickse', 'clicksebuf');
		activate();
	};

	// [button]で書かれた配置・寸法は既定スタイルの後ろに置いて上書きさせる。
	//	role="button"：文字はtxtRef側（1階層下）へ包んだため、page.getByText(...)は
	//	（Playwrightは文字を直接持つ最も内側の要素を返す仕様のため）txtRef側を返してしまい、
	//	この要素が持つ position/width/rotation/tabIndex 等を読むE2Eテストが失敗するようになった
	//	（2026-08-24発覚）。role="button"を付けてpage.getByRole('button', {name:…})で
	//	名指しできるようにし、内部のtxtRef分割に関わらずクリック可能な本体を一意に取れるようにする
	return <span css={styBtn} style={sty ? styBtnArg(sty, natPic) : undefined} ref={ref}
		role="button" tabIndex={isEnabled ? 0 : -1} onClick={onClick} onKeyDown={onKeyDown}
		onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}
		onFocus={showHint} onBlur={()=> hintMng.hide()}>
		<span css={styBtnTxt} ref={txtRef}
			style={fit.x !== 1 || fit.y !== 1 ? {transform: `scale(${String(fit.x)}, ${String(fit.y)})`} : undefined}
		>{text}</span>
		{/* masumeガイド枠（本家 Button.ts:21-39 #procMasume4txt/#procMasume4pic相当）。箱
			（この要素自身）のCSS width/heightが既にbtnBoxSize()と一致しているので、inset:0の
			1枚で文字・画像どちらのボタンも覆える。CmnLib.masume===falseなら要素ごと描画しない */}
		{CmnLib.masume && <span style={{position: 'absolute', inset: 0, boxSizing: 'border-box',
			background: 'rgba(136, 51, 136, 0.2)', border: '1px solid rgb(136, 51, 136)', pointerEvents: 'none'}}/>}
	</span>;
}
