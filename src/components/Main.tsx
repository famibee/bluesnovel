/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2024-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import type {SysBase} from '../sn/SysBase';
import type {ScriptMng} from '../ts/ScriptMng';
import type {T_HTag} from '../sn/Grammar';

import {useStore} from '../store/store';
import {lazy, Suspense} from 'react';
import {useEffectOnce, useKey, useTitle} from 'react-use';
import type {Root} from 'react-dom/client';

const Stage = lazy(()=> import('./Stage'));
	// コンポーネント内で呼ぶと再レンダー毎に新しいコンポーネント型が生成され、
	// Stage以下が毎回アンマウント/再マウントされてちらつくので、必ずトップレベルで一度だけ生成する

export type T_ARG = {
	heStage	: HTMLElement;
	sys		: SysBase;
	scrMng	: ScriptMng;
};


export function initMain(root: Root, arg: T_ARG, inited: ()=> void) {
	root.render(<Main arg={arg} inited={inited} />);
}

export function Main({arg, inited}: {arg: T_ARG, inited: ()=> void}) {
	const {heStage, sys, scrMng} = arg;
	const title = useStore(s=> s.title);
	const addTitle = useStore(s=> s.addTitle);
	useTitle(title);

	const addLayer = useStore(s=> s.addLayer);
	const chgPic = useStore(s=> s.chgPic);
	const chgBAlpha = useStore(s=> s.chgBAlpha);
	const chgStr = useStore(s=> s.chgStr);
	const chgLay = useStore(s=> s.chgLay);
	const defChStyle = useStore(s=> s.defChStyle);	// [ch_in_style]/[ch_out_style]の定義
	const setChWait = useStore(s=> s.setChWait);	// 1文字あたりの待ち（sys:sn.tagCh.*＋既読状態）
	const setAutowc = useStore(s=> s.setAutowc);	// [autowc]の文字ごとウェイト表
	const getLaySty = useStore(s=> s.getLaySty);	// [tsy]がレイヤの現在値（＝トゥイーン開始値）を読むため
	const getPages = useStore(s=> s.getPages);	// [dump_lay]用
	const chgBPic = useStore(s=> s.chgBPic);	// [lay b_pic=…]（文字レイヤ背後の枠画像）
	const setBackAlpha = useStore(s=> s.setBackAlpha);	// sys:TextLayer.Back.Alpha（全文字レイヤ共通の掛け率）
	const setBtnFont = useStore(s=> s.setBtnFont);	// tmp:sn.button.fontFamily（[button]の文字フォント）
	const getPagesJson = useStore(s=> s.getPagesJson);	// しおり（[record_place]/[save]）用
	const replace = useStore(s=> s.replace);			// しおりからの復元（[load]/[reload_script]）用
	const toggleFullScr = useStore(s=> s.toggleFullScr);
	const clearLay = useStore(s=> s.clearLay);
	const clearTxtLay = useStore(s=> s.clearTxtLay);
	const moveLay = useStore(s=> s.moveLay);
	const chgFilter = useStore(s=> s.chgFilter);	// [lay float=/index=/dive=]のレイヤ重なり順
	const enableEvent = useStore(s=> s.enableEvent);
	const addBtn = useStore(s=> s.addBtn);
	const setReadBack = useStore(s=> s.setReadBack);
	const setStyPaging = useStore(s=> s.setStyPaging);	// [page style=…]（読み戻り中の本文の見た目）
	const isReadBack = useStore(s=> s.isReadBack);		// 読み戻り中か（PageLog.isPaging）
	const isTyping = useStore(s=> s.isTyping);
	const requestSkip = useStore(s=> s.requestSkip);
	const setWait = useStore(s=> s.setWait);
	const setSkipping = useStore(s=> s.setSkipping);
	const startTrans = useStore(s=> s.startTrans);
	const finishTrans = useStore(s=> s.finishTrans);
	const startQuake = useStore(s=> s.startQuake);
	const finishQuake = useStore(s=> s.finishQuake);
	function procNext() {scrMng.go()}
	useEffectOnce(()=> {
		addTitle(sys.cfg.oCfg.book.title);
		const hTag: T_HTag		= Object.create(null);	// タグ処理辞書
		scrMng.attachTsx(()=> heStage.dispatchEvent(new CustomEvent('ev_next', {})), {addLayer, chgPic, chgBAlpha, chgBPic, setBackAlpha, setBtnFont, chgStr, chgLay, defChStyle, setChWait, setAutowc, getLaySty, getPages, getPagesJson, replace, clearLay, clearTxtLay, moveLay, chgFilter, enableEvent, addBtn, addTitle, toggleFullScr, setWait, requestSkip, setSkipping, startTrans, finishTrans, startQuake, finishQuake, setReadBack, setStyPaging}, hTag);

		inited();

		heStage.addEventListener('ev_next', procNext as EventListenerOrEventListenerObject);
		return ()=> heStage.removeEventListener('ev_next', procNext);
	});

	// 組み込み変数 const.sn.key.*（修飾キー等の**今の**押下状態。本家 EventMng.ts:348 の #hDownKeys）。
	//	下の useKey は読み進め・[event]発火が本業で、離した所までは見ないので別に張る。
	//	blurで全部落とすのは、押したままウインドウを離れると「押しっぱなし」で残るため
	useEffectOnce(()=> {
		const down = (e: KeyboardEvent)=> scrMng.setKeyDown(e.key, true);
		const up = (e: KeyboardEvent)=> scrMng.setKeyDown(e.key, false);
		const blur = ()=> scrMng.clearKeyDown();
		document.addEventListener('keydown', down);
		document.addEventListener('keyup', up);
		globalThis.addEventListener('blur', blur);
		return ()=> {
			document.removeEventListener('keydown', down);
			document.removeEventListener('keyup', up);
			globalThis.removeEventListener('blur', blur);
		};
	});

	// 右クリック（本家 EventMng.ts:145）。**contextmenuイベントで拾う**のは、
	//	clickイベントでは右ボタンが来ないため。予約名は修飾キー＋'rightclick'で、
	//	テンプレはこれで枠（アルバム・設定・履歴・確認ダイアログ）を閉じる。
	//	documentに張るのは、フレーム内のcontextmenuをFrameMngがdocumentへ再dispatchするから
	//	（本家はcvsとフレームbodyの2箇所に張る。EventMng.resvFlameEvent）。
	//	予約が無くてもpreventDefault()する（本家と同じ。ブラウザのメニューが出ると
	//	ゲーム画面の上に居座って操作を邪魔する）
	useEffectOnce(()=> {
		const ctx = (e: MouseEvent)=> {
			e.preventDefault();
			if (isDesignMode) return;
			scrMng.cancelAuto();
			scrMng.fireEvent(modKeyName(e) + 'rightclick');
		};
		document.addEventListener('contextmenu', ctx);
		return ()=> {document.removeEventListener('contextmenu', ctx)};
	});

	// イベント
	// space/クリック = 既存の読み戻り範囲内なら読み進め、最新なら未読を進める
	// PageDown = 読み進め（next()と同じ扱い）／PageUp = 読み戻り
	//	読み戻り中（PageLog.isPaging）はTxtLayerで文字を[page style=…]の見た目にする。
	//	**戻る・進むはどちらも[page to=…]と同じ経路**（ScriptMng.page）＝しおりを戻して
	//	そのページを演じ直す。テンプレが[event key=pageup label=*page]で同じことをするので、
	//	組み込みのキーとシナリオからの指定が同じ動きになる
	function next() {
		if (isTyping) {requestSkip(); return}	// 文字送り演出中の1クリック目は瞬時完了のみ行い、進行はしない
		if (isReadBack) {scrMng.page('next'); return}
		procNext();
	}
	function prev() {scrMng.page('prev')}
	// [event]で予約したキー名は「KeyboardEvent.keyの小文字」、クリックは'click'という取り決め
	//	（本家 EventMng が 'enter'/'arrowdown'/'click' 等の小文字キーで引くのに合わせた）。
	//	予約があればそちらを発火し、読み進め・読み戻りは行わない
	useKey(()=> true, e=> {
		scrMng.cancelAuto();	// 手動操作が入ったらオート読み・既読スキップは止める（本家 cancelAutoSkip）
		scrMng.unlockAudio();	// ブラウザの自動再生ポリシー対策。ユーザー操作のたびに呼んでおけば十分軽い
		const key = keyName(e);
		// [toggle_full_screen key=…]は[event]とは別枠（ラベルへ飛ばず全画面を切り替えるだけ）なので先に見る
		if (scrMng.fireFullScrKey(key)) {e.stopPropagation(); e.preventDefault(); return}
		if (scrMng.fireEvent(key)) {e.stopPropagation(); e.preventDefault(); return}

		switch (e.code) {
			case 'Space':
			case 'ArrowDown':
			case 'PageDown':	e.stopPropagation(); e.preventDefault(); next();	break;
			case 'PageUp':		e.stopPropagation(); e.preventDefault(); prev();	break;
		}
	});

	function onClick() {
		if (isLong) {isLong = false; return}
		if (isDesignMode) return;
		scrMng.cancelAuto();	// 手動クリックでオート読み・既読スキップを止める
		scrMng.unlockAudio();	// ブラウザの自動再生ポリシー対策
		if (scrMng.fireEvent('click')) return;
		next();
	}

	return <Suspense fallback={<>Loading</>}>
		<Stage arg={arg} next={next} prev={prev} onClick={onClick} />
	</Suspense>;
};

// 押されたキーの名前（本家 SysBase.modKey() ＋ e.key.toLowerCase()）。
//	修飾キーは alt+ ctrl+ meta+ shift+ の順に前置する（本家と同じ並び順でないと引けない）。
//	本家サンプルの main.sn が [event key=alt+enter] や [event key=Meta+0] を使う。
//	修飾キー自身を押しただけの時に「alt+alt」等にならないよう、e.keyと同じものは前置しない
function keyName(e: KeyboardEvent): string {
	return	(e.altKey	&& e.key !== 'Alt'		? 'alt+'	: '')
		+	(e.ctrlKey	&& e.key !== 'Control'	? 'ctrl+'	: '')
		+	(e.metaKey	&& e.key !== 'Meta'		? 'meta+'	: '')
		+	(e.shiftKey	&& e.key !== 'Shift'	? 'shift+'	: '')
		+	e.key.toLowerCase();
}

// マウスイベントの修飾キー前置（本家 EventMng.ts:355 #modKey4MouseEvent）。
//	keyName()と違い「修飾キー自身か」の判定が要らない（押されたのはマウスなので）
function modKeyName(e: MouseEvent): string {
	return	(e.altKey	? 'alt+'	: '')
		+	(e.ctrlKey	? 'ctrl+'	: '')
		+	(e.metaKey	? 'meta+'	: '')
		+	(e.shiftKey	? 'shift+'	: '');
}

let isDesignMode = false;	// この形でないとちらつく
export const setDesignMode = (b: boolean)=> isDesignMode = b;

let isLong = false;
export function onLong() {isLong = true}
