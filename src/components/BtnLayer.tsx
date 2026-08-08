/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2026-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import {focusMng} from '../ts/FocusMng';
import {hintMng} from '../ts/Hint';
import {useStore} from '../store/store';

import type {T_BTN_STY} from './TxtLayer';
import {BTN_DEF_H, BTN_DEF_W} from './Lay';

import {css} from '@emotion/react';
import {type CSSProperties, type KeyboardEvent, type MouseEvent, useEffect, useLayoutEffect, useRef, useState} from 'react';


type T_BTNARG = {
	text	: string;
	label	: string;
	call	: boolean;
	fn		: string;
	sty?	: T_BTN_STY | undefined;
	onActivate: (label: string, call: boolean, fn: string)=> void;
	onSe: (fn: string, buf: string)=> void;	// [button clickse=/enterse=/leavese=]
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
// 箱の実際の大きさ。画像ボタン（pic）・背景画像ボタン（b_pic）は絵の実寸が箱の大きさになる
//	（本家 Button.ts:280／249）。width/heightが書かれていればそちらが勝つ（本家も同様）。
//	どちらの絵も未読込のうちは0（呼び出し側が0pxで置かないようガードする）
function btnBoxSize(o: T_BTN_STY | undefined, natPic: {w: number; h: number} | null, natBPic: {w: number; h: number} | null): {w: number; h: number} {
	if (! o) return {w: BTN_DEF_W, h: BTN_DEF_H};
	const natSrc = o.pic ? natPic : o.b_pic ? natBPic : null;
	return (o.pic || o.b_pic)
		? {w: o.width ?? natSrc?.w ?? 0, h: o.height ?? natSrc?.h ?? 0}
		: btnSize(o);
}
function styBtnArg(o: T_BTN_STY, fit: {x: number; y: number}, natPic: {w: number; h: number} | null, natBPic: {w: number; h: number} | null): CSSProperties {
	const sty: CSSProperties = {};
	if (o.left !== undefined || o.top !== undefined || o.s_right !== undefined || o.s_bottom !== undefined) {
		sty.position = 'absolute';
		sty.margin = 0;
		// 横位置：left（＋center/rightの寄せ）か、ステージ右端からのs_rightか（本家も else if で排他。[lay]と同じ）
		if (o.s_right !== undefined) sty.right = `${String(o.s_right)}px`;
		else sty.left = `${String(o.left ?? 0)}px`;
		if (o.s_bottom !== undefined) sty.bottom = `${String(o.s_bottom)}px`;
		else sty.top = `${String(o.top ?? 0)}px`;
	}
	// 中央寄せ・右端合わせ（本家「表示物の幅を引く」）は独立translateプロパティで表現する。
	//	transformとは別プロパティなので、下のrotation/scale（fit含む）と衝突しない。
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
		const {w, h} = btnBoxSize(o, natPic, natBPic);
		if (w > 0) sty.width = `${String(w)}px`;
		if (h > 0) sty.height = `${String(h)}px`;
		if (! o.pic) {
			sty.fontSize = `${String(h)}px`;	// 本家も fontSize:height（Button.ts:133）
			sty.lineHeight = 1;
			sty.padding = 0;	// 箱に文字をぴったり収めたいので padding 無し（fit実測の基準を素の文字寸法にする）
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
		sty.backgroundSize = '300% 100%';
		sty.backgroundRepeat = 'no-repeat';
		// **どのコマを見せるかはインラインで書かない**。インラインstyleは`:hover`/`:active`の
		//	ルールより強く、状態で切り替えられなくなるため（切り替えはstyBtn側が持つ）
	}
	// 背景画像（[button b_pic=…]）。本家は文字スプライトの背後へ絵を**中央合わせ**で置く
	//	（Button.ts:249）。箱の大きさは上で絵の実寸に広げてあるので、こちらは中央に敷くだけでよい
	else if (o.b_pic && o.b_src) {
		sty.backgroundImage = `url("${o.b_src}")`;
		sty.backgroundPosition = 'center';
		sty.backgroundRepeat = 'no-repeat';
	}
	if (o.alpha !== undefined) sty.opacity = o.alpha;

	// 変形：回転・拡縮に加え、上記フィット倍率(fit)を掛ける（fitはwidth指定時のみ1以外になる）。
	//	フィットは中央基準で効かせる（本家 align:'center' 相当）。fitを使わない時は本家pivot（既定左上）を原点に。
	const sx = (o.scale_x ?? 1) * fit.x;
	const sy = (o.scale_y ?? 1) * fit.y;
	const fitting = fit.x !== 1 || fit.y !== 1;
	if (o.rotation !== undefined || o.scale_x !== undefined || o.scale_y !== undefined
	 || o.pivot_x !== undefined || o.pivot_y !== undefined || fitting) {
		sty.transform = `rotate(${String(o.rotation ?? 0)}deg) scale(${String(sx)}, ${String(sy)})`;
		sty.transformOrigin = fitting
			? 'center'
			: `${String(o.pivot_x ?? 0)}px ${String(o.pivot_y ?? 0)}px`;
	}
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
export default function BtnLayer({text, label, call, fn, sty, onActivate, onSe}: T_BTNARG) {
	// 文字フォントは組み込み変数 tmp:sn.button.fontFamily（本家 LayerMng.ts:209）。
	//	ストアへ写しているのはScriptMngで、ステージ既定フォント（Stage.tsx）とは別に差し替えられる
	const btnFont = useStore(s=> s.btnFont);

	// 既定の見た目は**本家 Button.ts のデフォルト TextStyle**に寄せる（tag.html#button のデフォルトstyle）：
	//	fill:black / align:center / fontFamily:Hiragino系 / padding:5 /
	//	dropShadow:white・alpha0.7・blur7・distance0（＝CSSの text-shadow: 0 0 7px rgba(255,255,255,.7)）。
	//	本家は文字だけのボタン（枠・背景なし）なので、以前の丸枠ピル装飾は撤去した。
	//	hover は本家 style_hover.fill='white' に合わせて白へ。
	//	white-space:nowrap で1行を保ち、width指定時は上の fit（transform:scale）で箱幅に収める。
	const styBtn = css`
		position: relative;
		z-index: 2;

		display: inline-block;
		box-sizing: border-box;
		margin: 0.3em;
		padding: 5px;
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
		/* フォーカス時もホバーと同じ見た目にする（本家 EventMng.ts:435 は FocusMng へ
			hv()／nr() を渡し、フォーカスの出入りでホバー状態を切り替える）。
			既定のフォーカスリングは画面に合わないので消す。
			既定のホバーは本家 style_hover の fill:'white' 相当 */
		&:hover, &:focus {${sty?.style_hover ?? 'color: white;'}}
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
	`;

	// 効果音（本家 EventMng.ts:465-491）。enabled=falseのボタンは効果音も鳴らない
	//	（本家 Button.ts:101 の `if (this.#o.enabled) evtMng.button(...)` でリスナー自体が張られない
	//	のと同じ結果を、こちらは呼び出しの手前でガードして揃えている）
	const playSe = (fnKey: 'clickse' | 'enterse' | 'leavese', bufKey: 'clicksebuf' | 'entersebuf' | 'leavesebuf')=> {
		if (sty?.enabled === false) return;
		const se = sty?.[fnKey];
		if (se) onSe(se, sty?.[bufKey] ?? 'SYS');
	};

	const onClick = (e: MouseEvent)=> {
		e.stopPropagation();	// 親(Stage)のonClick(=読み進め)へ伝播させないのがポイント
		hintMng.hide();			// 本家もpointerdownで消す（EventMng.ts:424）
		playSe('clickse', 'clicksebuf');
		onActivate(label, call ?? false, fn);
	};

	// ツールチップ（[button hint=…]）。本家 EventMng.ts:418 も pointerover/out と
	//	フォーカスの出入りで出し入れする。吹き出しは画面に1つを使い回す（Hint.ts）
	const showHint = ()=> {
		if (sty?.hint) hintMng.show(ref.current!, sty.hint, sty.hint_style, sty.hint_opt);
	};
	// マウスの乗り降り（本家 pointerover/pointerout）。フォーカス（onFocus/onBlur）は
	//	キーボード操作でのヒント表示のためのbluesnovel独自拡張なので、本家に無いenterse/leavese
	//	までは鳴らさない（マウスでの乗り降りだけに揃える）
	const onMouseEnter = ()=> {showHint(); playSe('enterse', 'entersebuf')};
	const onMouseLeave = ()=> {hintMng.hide(); playSe('leavese', 'leavesebuf')};

	// [set_focus to=next/prev]で巡回する対象として登録する（本家 EventMng.ts:435 で
	//	ゲーム内ボタンをFocusMngへ入れているのに対応）。表示されている間だけ輪に居ればよいので、
	//	マウント／アンマウントで出し入れする。spanなのでtabIndexを付けないとfocus()が効かない
	const ref = useRef<HTMLSpanElement>(null);
	useEffect(()=> {
		const el = ref.current;
		if (! el) return;

		focusMng.add(el);
		return ()=> focusMng.remove(el);
	}, []);

	// [button width=（height=）]指定時、文字を箱ちょうどに収める倍率を**実測**する（本家 pixi
	//	Text.width/height 相当。CSSに文字フィットが無いための代替）。幅制約と変形を一時的に外して
	//	素の文字寸法(offsetWidth/Height＝変形非依存・CSS px)を測り、箱寸法との比を fit として scale へ渡す。
	//	useLayoutEffect なので描画前に確定し、未縮小の文字が一瞬はみ出すチラつきは出ない。
	const [fit, setFit] = useState({x: 1, y: 1});
	// 画像ボタンの箱の大きさ＝**絵の実寸**（横は3コマ並びなので1/3）。本家 Button.ts:280 に対応。
	//	実寸を知れるのはDOM側だけなので、ここで読み込んで測る。
	//	width/heightが書かれていればそちらが勝つ（本家も `'width' in hArg` を優先する）
	const picSrc = sty?.pic ? sty.src ?? '' : '';
	const [natPic, setNatPic] = useState<{w: number; h: number} | null>(null);
	useEffect(()=> {
		if (! picSrc) {setNatPic(null); return}

		let alive = true;
		const img = new Image;
		img.onload = ()=> {
			if (alive) setNatPic({w: img.naturalWidth / 3, h: img.naturalHeight});
		};
		img.src = picSrc;
		return ()=> {alive = false};
	}, [picSrc]);
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
	useLayoutEffect(()=> {
		const el = ref.current;
		if (! el) {setFit({x: 1, y: 1}); return}
		if (sty?.pic) {setFit({x: 1, y: 1}); return}	// 画像ボタンに文字は無いのでフィットも要らない

		const {w: bw, h: bh} = btnBoxSize(sty, natPic, natBPic);
		const pW = el.style.width, pT = el.style.transform, pWs = el.style.whiteSpace;
		el.style.width = 'auto'; el.style.transform = 'none'; el.style.whiteSpace = 'pre';
		const natW = el.offsetWidth, natH = el.offsetHeight;
		el.style.width = pW; el.style.transform = pT; el.style.whiteSpace = pWs;

		setFit({
			x: natW > 0 ? bw / natW : 1,
			y: natH > 0 ? bh / natH : 1,
		});
	}, [text, sty?.width, sty?.height, sty?.pic, natBPic]);

	// フォーカス中のEnter／Spaceで押下扱い（キーボードだけで操作できるように）。
	//	マウスクリックと同じ「押された」動作なのでclickseも鳴らす
	const onKeyDown = (e: KeyboardEvent)=> {
		if (e.key !== 'Enter' && e.key !== ' ') return;

		e.stopPropagation();
		e.preventDefault();
		playSe('clickse', 'clicksebuf');
		onActivate(label, call ?? false, fn);
	};

	// [button]で書かれた配置・寸法は既定スタイルの後ろに置いて上書きさせる
	return <span css={styBtn} style={sty ? styBtnArg(sty, fit, natPic, natBPic) : undefined} ref={ref}
		tabIndex={0} onClick={onClick} onKeyDown={onKeyDown}
		onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}
		onFocus={showHint} onBlur={()=> hintMng.hide()}>{text}</span>;
}
