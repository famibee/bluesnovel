/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2026-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

// 試作版：シナリオ解析エンジン（超簡略版）
//	skynovel_esm/src/sn/ScriptIterator.ts, Main.ts#main() の基本ループを参考に、
//	試作に必要な最小限のタグのみサポートする。
//	・DOM / fetch に依存しないため bun test で直接検証できる。
//	・[l][p][s] で停止し、そこまでに生じた表示変化を T_ENGINE_ACTION[] として返す。
//	・戻り値をどう画面へ反映するかは呼び出し側（ScriptMng.ts）の責務とする。

import {VarStore, type T_CAST, type T_VAL_D} from './VarStore';
import {ExprEval} from './ExprEval';
import {splitAmpersand, tagToken2Name_Args} from '../sn/Grammar';
import {Script} from './Script';
import {AnalyzeTagArg} from '../sn/AnalyzeTagArg';
import {RubySpliter} from '../sn/RubySpliter';
import {Areas, type T_H_Areas} from '../sn/Areas';
import {getDateStr, int, uint} from '../sn/CmnLib';
import {A_TSY_FRM_PRP, chkEase, cnvTweenArg, parseTsyPath, tsyName, type T_TSY_TO} from './Tsy';
import type {T_FRM_ORDER, T_FRM_STY} from './FrameMng';
import {bldFilter, type T_FLT} from './Filter';
import {argBlendmode} from './Blendmode';
import {plainTxt, A_R_ALIGN, type T_R_ALIGN} from './Txt';
import {Log} from './Log';
import {parseChStyle, type T_CH_STYLE} from './ChStyle';
import {A_PAGE_TO, type T_PAGE_TO} from './PageLog';
import type {T_BTN_STY} from '../components/TxtLayer';
import {BTN_DEF_H, BTN_DEF_W} from '../components/Lay';
import {hasLayCls} from '../sn/LayCls';

// [add_face]で定義した差分絵1件分。dx/dyは親画像(fn)の左上を原点(0,0)とした相対座標
//	（本家 skynovel_esm/src/sn/SpritesMng.ts の Iface 型に対応。blendmodeはCSSのmix-blend-modeへそのまま渡す想定）
export type T_FACE = {
	fn			: string;
	dx			: number;
	dy			: number;
	blendmode	: string;
};

// ページ裏表（本家 Pages.ts）。表(fore)＝今画面に見えている面、裏(back)＝次の場面を組み立てる面。
//	[trans]で入れ替えることで場面転換する。属性pageの既定は本家同様'fore'（Pages.argChk_page(hArg,'fore')）
export type T_PAGE = 'fore' | 'back';
// 消去系は両面まとめて指定できる（本家 LayerMng.ts:535 の page='both'）
export type T_PAGE_BOTH = T_PAGE | 'both';

// [lay]で指定できるレイヤ共通の見た目。**書かれた属性だけ**を持つ（未指定は現状維持。
//	本家 Layer.lay() も `'alpha' in hArg` のように書かれたかどうかで判定している）。
//	rotationは度（本家も flash 由来で度。pixiのradianではない）
export type T_LAY_STY_ARG = {
	visible?	: boolean;
	alpha?		: number;	// レイヤ全体の不透明度。文字レイヤ背景だけを透かすb_alphaとは別物
	left?		: number;
	top?		: number;
	// 中央寄せ・右端合わせ（本家の center/right/middle/bottom）。エンジンは表示物の実寸を
	//	知らないので「寄せの種類」だけを渡し、実際のずらしはCSSのtranslateが受け持つ（Lay.ts styLay）
	align_x?	: 'center' | 'right';
	align_y?	: 'middle' | 'bottom';
	s_right?	: number;	// ステージ右端からの距離（本家 s_right）。leftとは排他
	s_bottom?	: number;
	// レイヤの寸法（本家 GrpLayer.ts:88-91 / TxtStage.ts:219-220）。**本家と違い独立して扱う**：
	//	本家の画像レイヤは`'width' in hArg || 'height' in hArg`の単一ORブロックで両方に
	//	argChk_Num(hArg,'height',0)相当を代入するため、width単独指定だとheightに0が入り絵が
	//	縦潰れで消える（pixiのSprite.set heightがscale.y=0にするため）。bluesnovelは本家が
	//	[button]（Button.ts:287-296）で採っている「独立if＋未指定は自然サイズ維持」の形に揃える
	width?		: number;
	height?		: number;
	rotation?	: number;
	scale_x?	: number;
	scale_y?	: number;
	pivot_x?	: number;	// 回転・拡縮の原点（本家のpivot。CSSではtransform-origin）
	pivot_y?	: number;
	blendmode?	: string;	// CSSのmix-blend-mode値へ変換済み（argBlendmode()）
	b_color?	: number;	// 文字レイヤ背景色（0xRRGGBB）
	style?		: string;	// 文字レイヤへそのまま足すCSS
	// 文字表示領域の内側余白（本家 TxtStage.ts の pl/pr/pt/pb。px指定）。
	//	**未指定は既定のCSS値（1em/1.5em）のまま**（他の見た目属性と同じ「書かれた属性だけ」原則）
	pl?			: number;
	pr?			: number;
	pt?			: number;
	pb?			: number;
	// 文字組み（本家 TxtLayer.ts:470 #setFfs()、Hyphenation.ts:85）
	ffs?		: string;	// 文字詰め（CSSのfont-feature-settingsの値。'"palt"'等）
	noffs?		: string;	// ffsを効かせない文字の並び
	bura?		: boolean;	// ぶら下げ禁則
	// 禁則文字集合の指定（本家 Hyphenation.ts:64-84）。**未指定は現在値維持**
	//	（本家も`if (hArg.kinsoku_sol)`のtruthy判定＝既定値ではなく「変更しない」扱い）
	kinsoku_sol?: string;
	kinsoku_eol?: string;
	kinsoku_dns?: string;
	kinsoku_bura?: string;
	r_align?	: T_R_ALIGN;	// ルビ位置の既定（本家 TxtLayer.ts:307）
	// 文字出現・消去演出（本家 TxtLayer.ts:67 の in_style/out_style）。[ch_in_style]で定義した名前
	in_style?	: string;
	out_style?	: string;
};

// [l]/[p]の待ちマークの位置・寸法（本家 TxtStage.ts:685-688 が sp.x/y/width/height に入れる分）。
//	**書かれた属性だけ**を持つ（省略時は本文の流れの中の位置・文字サイズなり）
export type T_MARK_STY = {x?: number; y?: number; width?: number; height?: number};

export type T_ENGINE_ACTION =
	// clsは'grp'/'txt'固定ではなく、[add_lay class=…]に登録済みの任意のcls文字列を取る
	//	（本家[add_lay class=3d]相当。src/sn/LayCls.tsのレジストリ参照）
	| {t: 'addLay'; cls: string; nm: string}
	// プラグインレイヤー（cls!=='grp'&&cls!=='txt'）向け。属性ハッシュを丸ごと渡す
	//	（本家 Pages.lay() が hArg をそのまま Layer サブクラスの lay() へ流すのと同じ設計。
	//	中身の解釈はプラグインの責務で、エンジンは何も知らないでよい）
	| {t: 'layPlg'; nm: string; page: T_PAGE; hArg: {[k: string]: string}}
	| {t: 'chgPic'; nm: string; page: T_PAGE; fn: string; aFace?: T_FACE[]}	// aFaceは[lay face=...]で重ねる差分絵（重なり順＝配列順、後の要素ほど上）。face属性省略時はundefined＝直前のfaceを維持（本家 GrpLayer.ts:76-85）。face=""で明示的にクリア
	| {t: 'chgBAlpha'; nm: string; page: T_PAGE; b_alpha?: number; isFixed?: boolean}	// [lay b_alpha=/b_alpha_isfixed=]。文字レイヤ背景の不透明度（0.0～1.0）。背景のみを透過させ、文字は透過しない。isFixed=falseならsys:TextLayer.Back.Alphaとの掛け算になる（本家 TxtLayer.ts:388）
	| {t: 'chgBPic'; nm: string; page: T_PAGE; fn: string}	// [lay b_pic=…]。文字レイヤ背後の枠画像。指定するとb_colorは無視される（本家 TxtLayer.ts:393）。fn=''で画像をやめて単色塗りへ戻す
	| {t: 'chgBackClear'; nm: string; page: T_PAGE}	// [lay back_clear=true]。文字レイヤ背景（b_color/b_alpha/b_alpha_isfixed/b_pic）を初期状態へ戻す（本家 TxtLayer.ts:376-385）。他のb_*属性とは同時指定しない（本家も早期returnで排他）
	| {t: 'trans'; aLayNm: string[] | null; time: number; rule?: string; vague?: number}	// [trans]。ページ裏表を交換する。aLayNm=nullは全レイヤ対象（layer属性省略時）。timeはミリ秒で、0なら演出無しで即交換。rule指定時はクロスフェードでなくルール画像によるワイプ（vagueは境界のぼかし幅）
	| {t: 'waitTrans'; canskip: boolean}	// [wt]。[trans]の演出終了待ち。実際に待つのはScriptMngの担当なので、step()はここで一旦返る（canskip=falseならクリックで飛ばせない）
	| {t: 'finishTrans'}				// [finish_trans]。[trans]の演出を今すぐ終わらせる（表裏の交換まで済ませる）
	| {t: 'quake'; msec: number; hmax: number; vmax: number}	// [quake]。画面揺らし。揺れ幅はステージ座標のpx（0ならその向きには揺れない）。揺らすのも終了を決めるのもScriptMng側
	| {t: 'stopQuake'}					// [stop_quake]。揺れを即座に終わらせる（本家は[finish_trans]と同じ処理）
	| {t: 'waitQuake'; canskip: boolean}	// [wq]。揺れ終了待ち。[wt]と同じ形
	| {t: 'chgStr'; nm: string; page: T_PAGE_BOTH; str: string}		// そのレイヤの「そのページでの全文字列」。[er]だけは両面（'both'）を消す
	| {t: 'clearTxtLay'; nm: string; page: T_PAGE_BOTH; clearFilter: boolean}	// [er]。本文はchgStrが消すので、こちらはボタンの消去と変形まわりの属性の初期化（本家 Layer.ts:420）
	| {t: 'addBtn'; layerNm: string; page: T_PAGE; nm?: string; text: string; label: string; call?: boolean; fn?: string; arg?: string; sty?: T_BTN_STY}	// 文字レイヤ(layerNm)をUIコンテナとしてボタンを追加。クリックでlabelへジャンプ（読み進め扱いにはしない）。call=true指定時はjumpではなくcall（サブルーチンコール）する。fn指定時は別スクリプトのラベルへ。arg：クリック時に&sn.eventArgとして受け取れる
	| {t: 'chgLay'; nm: string; page: T_PAGE; sty: T_LAY_STY_ARG}	// [lay]のレイヤ共通属性（visible/alpha/left/top/rotation/scale_*/b_color/style）。書かれた属性だけを持つ
	| {t: 'defChStyle'; kind: 'in' | 'out'; nm: string; sty: T_CH_STYLE}	// [ch_in_style]/[ch_out_style]。文字出現・消去演出の定義。名前で引けるようストアが表に持つ
	| {t: 'autowc'; enabled: boolean; hWait: {[ch: string]: number}}	// [autowc]。文字ごとのウェイト表（ミリ秒）。enabled=falseなら表を使わずsys:sn.tagCh.msecWaitへ落ちる
	| {t: 'clearLay'; aLayNm: string[] | null; page: T_PAGE_BOTH}	// [clear_lay]。見た目を初期値へ戻し中身も捨てる（visibleは触らない）。aLayNm=nullは全レイヤ
	| {t: 'moveLay'; nm: string; mode: 'float' | 'index' | 'dive'; index?: number; dive?: string}	// [lay float=/index=/dive=]。レイヤの重なり順。現在の並びが要るので解決はストア側
	| {t: 'addFilter'; aLayNm: string[] | null; page: T_PAGE_BOTH; flt: T_FLT; replace: boolean}	// [add_filter]（replace=falseで重ねる）／[lay filter=…]（replace=trueで置き換え）
	| {t: 'clearFilter'; aLayNm: string[] | null; page: T_PAGE_BOTH}	// [clear_filter]
	| {t: 'enableFilter'; aLayNm: string[] | null; page: T_PAGE_BOTH; index: number; enabled: boolean}	// [enable_filter]。何番目のフィルターを効かせるか
	| {t: 'close'}	// [close]。アプリの終了（アプリ版のみ）
	| {t: 'updateCheck'; url: string}	// [update_check]。更新チェック（アプリ版のみ）
	| {t: 'window'; centering: boolean; x: number; y: number; w: number; h: number}	// [window]。アプリウインドウ設定（アプリ版のみ）
	| {t: 'clearPageLog'}	// [page clear=true]。ページログ（読み戻り履歴）の消去。実処理はScriptMng
	| {t: 'pageStyle'; style: string}	// [page style=…]。読み戻り中の本文の見た目
	| {t: 'pageKeys'; aKey: string[]}	// [page key=…]。読み戻り中に効くイベントキーの限定
	| {t: 'pageTo'; to: T_PAGE_TO}	// [page to=…]。ページ移動。演じ直しは非同期なのでstep()は一旦返る
	| {t: 'title'; text: string}	// [title text=…]。ウインドウ（ブラウザタブ）のタイトル
	| {t: 'toggleFullScr'}		// [toggle_full_screen]。全画面状態の切替
	| {t: 'navigateTo'; url: string}	// [navigate_to url=…]。別タブでURLを開く
	| {t: 'loadPlugin'; fn: string; join: boolean}	// [loadplugin fn=….css]。cssの読み込み。join=true（既定）は読み終わるまで待つのでstep()は一旦返る
	| {t: 'snapshot'; fn: string; aLayNm: string[] | null; page: T_PAGE; width: number; height: number; smoothing: boolean; b_color?: number}	// [snapshot]。画面を画像で保存（b_colorは0xAARRGGBB）。width/heightの0はステージ実寸、aLayNm=nullは全レイヤ。画像化は非同期なのでstep()は一旦返る
	| {t: 'recordPlace'}	// [record_place]。今の状態をしおり1件ぶんに組み立てて覚えておく（保存はしない）
	| {t: 'save'; place: number; json: {[k: string]: string}}	// [save]。覚えてあるしおりをplaceへ保存。jsonは見出し（[save]の属性そのまま）
	| {t: 'load'; place: number; fn: string; label: string; index?: number; doRec?: boolean}	// [load]。しおりから復元。スクリプトの読み直しが要るのでstep()は一旦返る。index指定時は保存時点の再開位置でなくfn（省略時は現在のスクリプト）のindex位置（トークン番号）へ直接ジャンプする（本家 ScriptIterator.ts:1454「ページ移動用」。labelは無視される）。doRec（既定true）はロードした状態を次の[record_place]代わりに持たせるかどうか
	| {t: 'reloadScript'}	// [reload_script]。最後の[record_place]位置からスクリプトを読み直して再開
	| {t: 'copyBookmark'; from: number; to: number}	// [copybookmark]
	| {t: 'eraseBookmark'; place: number}			// [erasebookmark]
	| {t: 'exportData'}	// [export]。プレイデータをファイルへ書き出す
	| {t: 'importData'}	// [import]。プレイデータをファイルから読み込む
	| {t: 'fullScrKey'; key: string}	// [toggle_full_screen key=…]。そのキーで全画面切替できるようにする常駐予約
	| {t: 'dumpLay'; aLayNm: string[] | null}	// [dump_lay]。レイヤの状態をデバッグ表示へ。nullは全レイヤ
	// HTMLフレーム（本家 FrameMng.ts）。中身は生きたHTML文書なのでストアには入れず、
	//	FrameMng（DOM側）が抱える。エンジンは組み込み変数 const.sn.frm.<id> だけを見る
	| {t: 'addFrame'; id: string; src: string; sty: T_FRM_STY}	// [add_frame]。HTMLの読込が要るのでstep()はここで一旦返る
	| {t: 'frame'; id: string; sty: T_FRM_STY; order?: T_FRM_ORDER; disabled?: boolean}	// [frame]
	| {t: 'setFrame'; id: string; var_name: string; text: string}	// [set_frame]。iframe内のvar変数へ設定
	| {t: 'letFrame'; id: string; var_name: string; fnc: boolean}	// [let_frame]。iframe内のvar変数／関数戻り値を組み込み変数へ。書き戻してから続けたいのでstep()は一旦返る
	| {t: 'resvDomEvent'; rawKey: string; key: string; del: boolean; needErr: boolean}	// [event key='dom=…']のDOM側予約
	| {t: 'setFocus'; mode: 'add' | 'del' | 'null' | 'next' | 'prev'; rawKey?: string; needErr?: boolean}	// [set_focus]。キーボードフォーカスの順番管理
	| {t: 'trace'; text: string}	// [trace text=...]。表示には影響しない。実処理はScriptMng.ts #trace()（myTrace経由でデバッグ表示へ出力）
	| {t: 'log'; text: string; fn: string; lineNum: number}	// [log text=...]。履歴（Log.ts）とは別物。実処理はScriptMng.ts #log()（downloads/log.txtへ追記）。fn/lineNumはpush時点のもの（同じstep()内で後続タグが進んだ後にActionを処理してもズレないよう、ここで確定させておく）
	| {t: 'stop'; kind: T_STOP_KIND; key: string; nm: string; resume?: T_RESUME; mark?: T_MARK_STY}	// 状態確定ポイント（Caretakerキー、nmは待ち中の文字レイヤ）。resume指定時はクリック待ちせず自動進行（オート読み／既読スキップ）。markは[l]/[p]の待ちマークの位置・寸法
	| {t: 'enableEvent'; nm: string; enabled: boolean}	// [enable_event]。文字レイヤのボタン等を有効／無効にする
	| {t: 'wait'; msec: number; canskip: boolean}	// [wait time=…]。実際に待つのはScriptMngの担当なので、step()はここで一旦返る
	| {t: 'tsy'; tw_nm: string; nm: string; page: T_PAGE; msec: number; delay: number; ease: string; repeat: number; yoyo: boolean; hTo: T_TSY_TO; aPath?: T_TSY_TO[]; chain?: string; backlay: boolean}	// [tsy]。トゥイーン開始。回すのはScriptMng（motion）で、ここは属性の解釈だけ。hToのrel（相対指定）はレイヤの現在値が要るのでScriptMng側で解決する。repeatはmotion規約（0=1回だけ、Infinity=無限）。aPathは[tsy path=…]の後続区間、chainは他トゥイーンの終了に繋ぐ指定。backlayはトゥイーン終了時に最終値を裏ページへも反映するか（本家 CmnTween.ts backlay）
	| {t: 'tsyFrame'; tw_nm: string; id: string; msec: number; delay: number; ease: string; repeat: number; yoyo: boolean; hTo: T_TSY_TO; aPath?: T_TSY_TO[]; chain?: string}	// [tsy_frame]。HTMLフレームのトゥイーン。[tsy]と同形だが、動かす先がストアのレイヤではなくFrameMngが持つiframeの見た目
	| {t: 'waitTsy'; tw_nm: string; canskip: boolean}	// [wait_tsy]。トゥイーン終了待ち。[wt]と同じくstep()はここで一旦返る
	| {t: 'stopTsy'; tw_nm: string}		// [stop_tsy]。トゥイーンを終了状態へ送って中断（本家 stop().end()）
	| {t: 'pauseTsy'; tw_nm: string; paused: boolean}	// [pause_tsy]/[resume_tsy]
	// ＢＧＭ・効果音（本家 SoundMng.ts/SndBuf.ts）。howlerを積む本家と違い、こちらはWeb Audio APIを
	//	直接使う自前の薄い層（ts/SndMng.ts・ts/SndBuf.ts）。volumeは常に**実効音量**
	//	（save:の目標音量 × sys:の基準音量。本家 SndBuf.ts の getVol() 合成をエンジン側で済ませた値）で、
	//	ScriptMng/SndMngはそれをそのままGainNodeへ渡すだけにしてある
	| {t: 'playSnd'; buf: string; fn: string; loop: boolean; volume: number; speed: number; pan: number; start_ms: number; end_ms: number; ret_ms: number; join: boolean; canskip: boolean}	// [playse]/[playbgm]。join=true（既定）はロード完了まで待つのでstep()は一旦返る
	| {t: 'stopSnd'; buf: string}		// [stopse]/[stopbgm]
	| {t: 'stopAllSnd'}					// [stop_allse]
	| {t: 'xchgBufSnd'; buf: string; buf2: string}	// [xchgbuf]。再生中インスタンスの入れ替え（save:/loopPlayingの帳簿はエンジン側で入れ替え済み）
	| {t: 'duckBgm'; volume: number}	// VOICE再生開始時のBGM絞り込み（本家 SndBuf.ts:143-157）。save:へは書かない一時的な上書き
	| {t: 'volumeSnd'; buf: string; volume: number}	// [volume]。基準音量（sys:）の変更を実効音量へ反映する
	| {t: 'fadeSnd'; buf: string; volume: number; msec: number; delay: number; stop: boolean}	// [fadese]/[fadebgm]/[fadeoutse]/[fadeoutbgm]。フェード自体は待たない（待ちたければ[wf]/[wb]）
	| {t: 'waitSnd'; buf: string; canskip: boolean; stop: boolean}	// [ws]/[wl]。再生終了待ち。canskipの既定はfalse（[wt]等とは逆）。実際に待つのはScriptMngの担当なのでstep()はここで一旦返る
	| {t: 'waitFade'; buf: string; canskip: boolean}	// [wf]/[wb]。フェード終了待ち。[ws]と同じ形
	| {t: 'waitVideo'; fn: string; stop: boolean; canskip: boolean}	// [wv]。動画再生終了待ち（本家 SpritesMng.wv()）。fnはレイヤ名でなくファイル名。実際に待つのはScriptMngの担当なのでstep()はここで一旦返る
	| {t: 'loadScript'; fn: string; label: string; idx: number}	// 別スクリプトへの移動要求。fetchはScriptMngの責務なのでstep()はここで一旦返る。ScriptMngはロード後 switchScript() を呼んで続行する（labelが空ならidxの位置へ）
;

export type T_TAG_PARSED = {
	name: string;
	args: {[k: string]: string};
};

// [event]で予約したイベント1件分の「飛び先」。
//	本家（ReadingState の T_HEvt2Fnc）はキー -> コールバック関数の表だが、
//	試作のエンジンはDOMに触れない＝関数を作れないので、素のデータとして持つ。
//	実際にキー入力・クリックと結びつけるのは呼び出し側（ScriptMng/Main.tsx）の責務
// url指定なら「ラベルへ飛ぶ代わりにURLを開く」予約（本家 [event url=…]／[link url=…]。
//	開くのはDOM側の仕事＝[navigate_to]と同じ経路（ScriptMng）へ渡す
export type T_EVENT_RSV = {fn: string; label: string; call: boolean; arg: string; url?: string};

// 停止点での自動進行の指示（本家 Reading.ts l()/p() のオート読み・既読スキップ相当）。
//	mode='auto'：msec待ってから自動で読み進める（オート読み）。
//	mode='skip'：即座に読み進める（既読スキップ。msecは基本0）。
//	実際にタイマーを回す・ユーザー入力で止めるのは呼び出し側（ScriptMng）の責務
export type T_RESUME = {mode: 'auto' | 'skip'; msec: number};

// 停止点の種類。本家は[waitclick]も[s]と同じ関数（Reading.ts:712 hTag.waitclick = o=> rs.s(o)）を通り、
//	ReadingState_wait4Tag がタグ名で振り分けている：
//	's'はユーザー操作に反応しない（予約イベントのみ）が、'waitclick'はクリックで進む
export type T_STOP_KIND = 'l' | 'p' | 's' | 'waitclick';


export class ScriptEngine {
	// タグトークン1件を「タグ名」と「属性の連想配列」へ分解する（値は書かれたまま＝未解決）。
	//	本家と同じ Grammar.tagToken2Name_Args() ＋ AnalyzeTagArg を使うので、
	//	複数行タグ・タグ内コメント（;〜）・"'#の引用符・非ASCIIの属性名まで正しく扱える。
	//	実行時は代わりに#resolveTag()を通すこと。こちらは「実行を伴わない走査」用
	//	（[if]ブロックのelsif/else/endif探し、[macro]の[endmacro]探し）で、
	//	本家もその2箇所では#alzTagArg.hPrmの生の値を直接見ている（ScriptIterator.ts:912）
	static readonly #alzTagArg = new AnalyzeTagArg;
	static parseTag(token: string): T_TAG_PARSED {
		const [name, sArgs] = tagToken2Name_Args(token);
		ScriptEngine.#alzTagArg.parse(sArgs);
		const args: {[k: string]: string} = {};
		for (const [k, prm] of Object.entries(ScriptEngine.#alzTagArg.hPrm)) args[k] = prm.val;
		return {name, args};
	}

	// タグトークン1件を「タグ名」と「解決済みの属性」へ。全タグ共通の属性前処理で、
	//	本家 ScriptIterator.ts:418 タグ解析() の前半をそのまま移植したもの。扱うのは4つ：
	//	・cond属性  … 偽ならそのタグ自体を実行しない（undefinedを返す）
	//	・「*」     … 呼び出し元がこのマクロへ渡した属性を丸ごと引き継ぐ（isKomeParam）
	//	・「%属性名」… 同じくマクロ引数の参照。「|省略値」と組で使う
	//	・「&式」   … 属性値を式として評価する
	//	戻り値がundefinedなら「cond偽につきこのタグは無かったことにする」
	#resolveTag(token: string): T_TAG_PARSED | undefined {
		const [name, sArgs] = tagToken2Name_Args(token);
		const alz = ScriptEngine.#alzTagArg;
		alz.parse(sArgs);
		const hPrm = alz.hPrm;

		// cond属性：条件が偽ならこのタグを実行しない。
		//	expと同じく「&」は不要（付いていたら二重評価になるので例外）。
		//	本家は String(値) が 'null'/'undefined' でも偽とするので、それも移植する。
		//	文字列'false'を偽とするのはbluesnovel側の規約（ExprEval.evalBool()と揃える）
		const cond = hPrm.cond?.val;
		if (cond !== undefined) {
			if (! cond || cond.startsWith('&')) throw '属性condは「&」が不要です';
			const v = this.#expr.parse(cond);
			const s = String(v);
			if (! v || s === 'null' || s === 'undefined' || s === 'false') return undefined;
		}

		// 「%」「*」が参照するのは、今いるサブルーチン／マクロを呼んだタグの属性
		//	（本家 #aCallStk.at(-1).csArg）。[call]で積んだ枠でも参照できるのは本家と同じ
		const cs = this.#aCallStk.at(-1);
		const args: {[k: string]: string} = Object.create(null);
		if (alz.isKomeParam) {	// 「*」：受け取った属性を全て引き継ぐ
			if (! cs) throw '属性「*」はマクロのみ有効です';
			Object.assign(args, cs.hArgs);
		}

		for (const [k, {val, def}] of Object.entries(hPrm)) {
			let v = val;
			if (v.startsWith('%')) {	// 「%属性名」：このマクロが受け取った属性値
				if (! cs) throw '属性「%」はマクロ定義内でのみ使用できます（そのマクロの引数を示す簡略文法であるため）';

				const mac = cs.hArgs[v.slice(1)];
				if (mac) {args[k] = mac; continue}	// 本家は真値判定（空文字は省略値へ回る）

				// 省略値が無い、または'null'指定なら属性そのものを渡さない（本家と同じ）
				if (def === undefined || def === 'null') continue;
				v = def;
			}

			// 「&式」なら評価する。値がundefinedになる場合は属性を渡さず、省略値があればそちらを試す
			v = this.#expr.getValAmpersand(v);
			if (v !== 'undefined') {args[k] = v; continue}
			if (def === undefined) continue;
			v = this.#expr.getValAmpersand(def);
			if (v !== 'undefined') args[k] = v;
		}
		return {name, args};
	}


	// 属性pageの検査（本家 Pages.ts:65 argChk_page()）。既定値は呼ぶ側のタグごとに違う
	//	（[lay]は'fore'、[clear_lay]は'back'）ので引数で受ける
	// 数値属性の検査（本家 CmnLib.argChk_Num() 相当。0x始まりは16進として読む）。
	//	空文字は弾く：JSの Number('') は 0 になってしまうため、属性の書き忘れを見逃さないようにする
	static #argNum(tag: string, nm: string, v: string): number {
		const n = v.trim() === '' ? NaN
			: v.startsWith('0x') ? parseInt(v.slice(2), 16) : Number(v);
		if (! Number.isFinite(n)) throw `[${tag}] ${nm}の値が不正です：${v}`;
		return n;
	}

	// 位置属性（left/top）。**-1〜1 はステージ幅・高さに対する割合**として解釈する
	//	（本家 Layer.ts:513 `if (x > -1 && x < 1) x *= CmnLib.stageW`）。
	//	テンプレやギャラリーは `[lay left=0.5]` で画面中央を指す書き方をするので、
	//	そのままpxとして扱うと0.5pxになって静かに違う絵になる。
	//	境界は本家と同じ**開区間**（left=1 は1px、left=-1 は-1px）。
	//	ステージ寸法はScriptMngが組み込み変数として入れる（DOMを見に行かない）
	#argPos(tag: string, nm: 'left' | 'top', v: string): number {
		const n = ScriptEngine.#argNum(tag, nm, v);
		if (n <= -1 || n >= 1) return n;
		const sz = Number(this.#val.get(
			nm === 'left' ? 'tmp:const.sn.config.window.width' : 'tmp:const.sn.config.window.height'));
		return Number.isFinite(sz) ? n * sz : n;	// 組み込み変数が無い環境（単体テスト等）はそのまま
	}

	// 省略可の数値属性（本家 argChk_Num() の「省略値あり」呼び出しに対応）。
	//	未指定なら既定値、指定ありなら#argNum()と同じ検査を通す
	static #argNumDef(tag: string, nm: string, v: string | undefined, def: number): number {
		return v === undefined ? def : ScriptEngine.#argNum(tag, nm, v);
	}

	// 音声の実効音量計算（本家 SndBuf.ts:43 getVol()）で使う0.0〜1.0クランプ
	static #clampVol(v: number): number {return v < 0 ? 0 : v > 1 ? 1 : v}
	// end_ms省略時の「音声ファイルの末端」を表す番兵値（本家 SndBuf.ts:23 MAX_END_MS）。
	//	実際の長さはAudioBufferが要る＝SndBuf.ts（DOM/WebAudio層）側でしか分からないので、
	//	この定数はそちらにも同じ値で重複定義してある（ズレないよう変更時は両方直すこと）
	static readonly #MAX_END_MS = 999000;

	// reg属性・flags属性から正規表現を作る（本家 Variable.ts:387 #let_replace() /
	//	:410 #let_search() が同じ処理を持つので切り出した）
	static #argReg(tag: string, args: {[k: string]: string}): RegExp {
		const {reg, flags} = args;
		if (! reg) throw `[${tag}] regは必須です`;
		return flags ? new RegExp(reg, flags) : new RegExp(reg);
	}

	// layer属性のカンマ区切りをレイヤ名の配列に。未指定（空）はnull＝全レイヤ
	//	（本家 LayerMng.#getLayers() の「省略時は全レイヤ」に対応）
	static #argLayNames(sLay: string | undefined): string[] | null {
		const a = (sLay ?? '').split(',').map(v=> v.trim()).filter(v=> v !== '');
		return a.length > 0 ? a : null;
	}

	// [button style=/style_hover=/style_clicked=]の値をCSSにする。
	//	**bluesnovelはCSSで書けるようにする**（本家はpixiのTextStyleのJSON）。
	//	ただしギャラリーのサンプルは`{"fill": "plum"}`のようにJSONで書くので、
	//	`{`で始まる値だけは主要キーをCSSへ読み替える（本家の見た目に寄せるための互換）
	static readonly #H_TXTSTY: {[k: string]: string} = {
		fill: 'color', fontSize: 'font-size', fontFamily: 'font-family',
		fontWeight: 'font-weight', fontStyle: 'font-style', align: 'text-align',
		letterSpacing: 'letter-spacing', lineHeight: 'line-height',
	};
	static #argBtnStyle(v: string): string {
		if (! v.trimStart().startsWith('{')) return v;	// CSSはそのまま

		let o: {[k: string]: unknown};
		try {o = JSON.parse(v) as {[k: string]: unknown}}
		catch {return v}	// JSONのつもりで壊れていたら、CSSとしてそのまま渡す（表示は止めない）

		return Object.entries(o)
			.map(([k, val])=> {
				const p = ScriptEngine.#H_TXTSTY[k];
				if (! p) return '';	// dropShadow等の未対応キーは落とす

				// pixiは数値＝px（fontSize: 24）。CSSでは単位が要る
				const sv = typeof val === 'number' && p !== 'line-height' && p !== 'font-weight'
					? `${String(val)}px` : String(val);
				return `${p}: ${sv};`;
			})
			.join('');
	}

	// [add_frame]/[frame]の見た目属性。**書かれた属性だけ**を拾う（[lay]と同じ流儀）
	static readonly #A_FRM_NUM = ['alpha', 'x', 'y', 'width', 'height', 'scale_x', 'scale_y', 'rotate'] as const;
	// [button]の配置・寸法・変形（本家 Button.ts）。left/topはcenter/right/middle/bottom/s_right/s_bottom
	//	と排他関係にあるため、このループでなく専用処理（[lay]と同じ else if）で扱う
	static readonly #A_BTN_NUM = ['width', 'height', 'rotation', 'pivot_x', 'pivot_y', 'scale_x', 'scale_y', 'alpha'] as const;
	static #argFrmSty(tag: string, args: {[k: string]: string}): T_FRM_STY {
		const sty: T_FRM_STY = {};
		if (args.visible !== undefined) sty.visible = args.visible !== 'false';
		for (const k of ScriptEngine.#A_FRM_NUM) {
			const v = args[k];
			if (v !== undefined) Object.assign(sty, {[k]: ScriptEngine.#argNum(tag, k, v)});
		}
		if (args.b_color !== undefined) sty.b_color = args.b_color;	// CSSの色をそのまま渡す（本家も同じ）
		return sty;
	}

	// [tsy]/[tsy_frame]共通の path=（経路）と chain=（他トゥイーンの後ろに繋ぐ）。
	//	どちらも省略されうるのでオブジェクトごと返す（exactOptionalPropertyTypesのため）
	static #argTsyPath(tag: string, args: {[k: string]: string}, aPrp?: readonly string[]): {aPath?: T_TSY_TO[]; chain?: string} {
		const aPath = args.path ? parseTsyPath(tag, args.path, aPrp) : undefined;
		return {
			...(aPath?.length ? {aPath} : {}),
			...(args.chain ? {chain: args.chain} : {}),
		};
	}

	static argPage(args: {[k: string]: string}, def: T_PAGE): T_PAGE {
		const v = args.page ?? def;
		if (v === 'fore' || v === 'back') return v;
		throw `属性 page【${v}】が不正です`;
	}
	// page=both も受ける版（消去系・フィルター系。本家 LayerMng.ts:535 の page='both'）
	static #argPageBoth(tag: string, args: {[k: string]: string}, def: T_PAGE_BOTH): T_PAGE_BOTH {
		const v = args.page ?? def;
		if (v === 'fore' || v === 'back' || v === 'both') return v;
		throw `[${tag}] 属性 page【${v}】が不正です`;
	}


	// 実行中のスクリプト（1ファイル分のパース結果）。switchScript()で差し替わる＝これがファイル切替。
	//	字句解析用のGrammarはScriptが持っているもの（＝プロジェクト共有インスタンス）を使う
	#script: Script;
	#idx = 0;
	// 連想配列はどれも Object.create(null) で作る。素の{}だと 'toString' 等の
	//	Object.prototype のキーが `in` や参照でヒットしてしまい、
	//	その名前のレイヤ・差分名・マクロを定義できなくなる
	#curTxtLayer = 'mes';
	#hTxt: {[nm: string]: string} = Object.create(null);	// レイヤ名 -> そのページの蓄積文字列（しおりに含む。nowMarkPart参照）
	#hTxtBk: {[nm: string]: string} = Object.create(null);	// 同上、裏ページ分（layer=/page=対応で追加）
	#hTxtOf(page: T_PAGE) {return page === 'back' ? this.#hTxtBk : this.#hTxt}
	// 前回[p]で停止した後、次のstep()開始時に現在レイヤをクリアするか。
	//	**ページログ（読み戻り）が覚えて戻す**：改ページはトークンではなくこのフラグで起きるので、
	//	これが無いと[p]の直後から演じ直したページに前ページの本文が残る（PageLog.ts参照）
	#clearOnResume = false;
	get clearOnResume() {return this.#clearOnResume}
	set clearOnResume(b: boolean) {this.#clearOnResume = b}
	readonly #hFace: {[name: string]: T_FACE} = Object.create(null);	// [add_face]で定義した差分名 -> {fn, dx, dy, blendmode}（本家 SpritesMng.#hFace 相当）
	// [add_lay]で作ったレイヤ名 -> クラス（grp/txt/プラグインcls）。#applyLayPage()の判定専用
	//	（本家 GrpLayer/TxtLayer はクラスごとに別インスタンスだが、こちらは単一の関数で両方を
	//	処理するため、判定材料をここに持たせる）
	readonly #hLayCls: {[nm: string]: string} = Object.create(null);

	// ループ再生中のサウンドバッファ表（本家 SndBuf.ts のモジュール変数hLPをインスタンスに閉じ込めた版。
	//	モジュール変数のままだとテストごとに新しいScriptEngineを作っても前のテストの値が残ってしまう）。
	//	[load]でのBGM復元（Phase 3）が読む save:const.sn.loopPlaying の実体
	readonly #hLoopPlay: {[buf: string]: string} = Object.create(null);
	#setLoopPlay(buf: string, fn: string) {
		this.#hLoopPlay[buf] = fn;
		this.#val.setNochk('save:const.sn.loopPlaying', JSON.stringify(this.#hLoopPlay));
	}
	#delLoopPlay(buf: string) {
		if (buf in this.#hLoopPlay) {
			// eslint-disable-next-line @typescript-eslint/no-dynamic-delete
			delete this.#hLoopPlay[buf];
			this.#val.setNochk(`save:const.sn.sound.${buf}.fn`, '');
		}
		// bufが未登録でも書く：save:const.sn.loopPlayingの既定値'{}'（CmnInterface.ts）を
		//	初回の[playse]/[stopse]の時点で確実に埋めておくため（本家はモジュール変数なので
		//	常に存在するが、こちらはインスタンスの初期状態が「未定義」になり得る）
		this.#val.setNochk('save:const.sn.loopPlaying', JSON.stringify(this.#hLoopPlay));
	}

	// VOICE再生中のBGM音量絞り込み（本家 SndBuf.ts:143-157 のモジュール変数vol_mul_talkingを
	//	インスタンスに閉じ込めた版。#hLoopPlayと同じ理由でモジュール変数にしない）。
	//	[playse buf=BGM]の実効音量計算に使うだけで、DOM操作（実際のGainNode書き換え）は
	//	ScriptMng側（ScriptMng.#restoreBgmDuck()）が持つ
	#volMulTalking = 1;
	// VOICE停止時にScriptMng側から呼ばれる（本家 SndBuf.ts:505-512 StStopのコンストラクタ相当。
	//	音量そのものの書き戻しはDOMを触るのでScriptMng側が行い、こちらは次のBGM開始時の
	//	計算に使う乗数だけを1へ戻す）
	resetVolMulTalking() {this.#volMulTalking = 1}

	// 変数ストア・式評価器（本家 Variable.ts/PropParser.ts の簡略版。VarStore.ts/ExprEval.ts参照）
	readonly #val = new VarStore;
	readonly #expr = new ExprEval(this.#val);

	// マクロ本体を実行中か（本家 ScriptIterator.ts:1109 の`mp:const.sn.macro.name`判定に相当）。
	//	マクロ呼び出し時にsetMpする'const.sn.macro'（mp:名前空間へ入る）の有無で判定する。
	//	Script#label2idx()の無名ラベル探索でマクロ境界チェックを行うかどうかに使う
	#isInMacro(): boolean {return Boolean(this.#val.get('mp:const.sn.macro'))}

	// 本文履歴（本家 LayerMng.ts:84 が持つ Log）。**エンジン側に置く**のは、
	//	記録するのが「シナリオが書いた本文」であってDOMの見た目ではないため。
	//	上限ページ数はprj.jsonの`log.max_len`（ScriptMngが組み込み変数として渡す）
	readonly #log = new Log(()=> {
		const n = Number(this.#val.get('tmp:const.sn.config.log.max_len'));
		return Number.isFinite(n) && n > 0 ?n :64;
	});
	// 履歴に記録するか（本家 Variable.doRecLog()）。既定はfalseで、シナリオが
	//	`&save:sn.doRecLog = true`で開ける。テンプレは設定・履歴などのUI画面へ出入りする間だけ
	//	falseへ倒し、その文が履歴に混ざらないようにしている。
	//	**本家は記録を止めるのでなく`<span class='offrec'>`で包んで履歴側で隠す**
	//	（TxtLayer.ts:494 chgDoRec）が、こちらは履歴の蓄積が表示と別物なので単に積まない
	get #doRecLog(): boolean {return this.#val.get('game:sn.doRecLog') === true}

	// 1文字あたりの基本の待ち時間（ミリ秒。本家 ScriptIterator.ts:1332 normalWait）。
	//	**既読と未読で別の設定**を見るのが本家の作りで、設定画面（テンプレの frames/_config.sn）が
	//	sys:sn.tagCh.* を書き換える。sys:が未設定のときは本家の初期値
	//	（CmnInterface.ts:220 doWait=true / msecWait=10）へ落とす
	get chWait(): number {
		const kidoku = this.#val.get('tmp:const.sn.isKidoku') === true;
		const doWait = this.#val.get(kidoku ?'sys:sn.tagCh.doWait_Kidoku' :'sys:sn.tagCh.doWait');
		if (doWait === false) return 0;

		const n = Number(this.#val.get(kidoku ?'sys:sn.tagCh.msecWait_Kidoku' :'sys:sn.tagCh.msecWait'));
		return Number.isFinite(n) && n >= 0 ?n :10;
	}

	// 定義済みの文字出現・消去演出名（本家 TxtStage.ts:600/640 の #hChInStyle/#hChOutStyle）。
	//	**同じ名前の二度定義は本家がthrowする**ので、その検査のために名前だけ覚えておく。
	//	定義の中身を持つのはストア（描くのはReact側なので）。`default`は組み込み済み
	readonly #hChStyleNm = {in: new Set(['default']), out: new Set(['default'])};

	// if/elsif/else/endifの再開位置スタック（本家 skynovel_esm/src/sn/ScriptIterator.ts:873 #aIfStk 相当）
	//	call/return実装に伴い、本家同様「壁」(-1)を積む方式を導入した（#call()参照）。
	//	壁を挟むことで、サブルーチン内の[elsif]/[else]/[endif]がコール元の（まだ閉じていない）
	//	ifブロックを誤って終端させることを防ぐ（本家 ScriptIterator.ts:972 aIfStk.unshift(-1) 相当）
	readonly #aIfStk: number[] = [];

	// callスタック（本家 skynovel_esm/src/sn/ScriptIterator.ts:66 #aCallStk 相当の簡略版）
	//	fnは呼び出し元のスクリプト名。別ファイルへ[call]した場合、[return]で
	//	そのファイルを読み直して戻る必要があるため保持する（本家 CallStack.fn 相当）。
	//	本家CallStack.ts（sn/CallStack.ts）のhEvt1Time等マクロ機構前提のフィールドは
	//	今回も流用せず、必要最小限の型を独自定義する。
	//	hMpは本家 #callSub()（ScriptIterator.ts:962）のcsArg[':hMp']相当：
	//	callSub時点のmp:値を保存し、returnで復元する（[call]/マクロ呼び出し共通の仕組み。
	//	本家は#callSub()を両者で共有するため常にmp:の保存・復元が行われる。ここでも合わせる）
	//	hEvtは[call]系（[call]・[button call=true]・イベントからのcall）のみに入る：
	//	コール時点のローカル予約イベントを退避し、[return]で書き戻す（本家 ScriptIterator.ts:955
	//	ReadingState.popLocalEvts() / :hEvt1Time / #return()のpushLocalEvts()）。
	//	マクロ呼び出しだけは退避しない（本家 ScriptIterator.ts:957「':hEvt1Time'の扱いだけは[macro]と異なる」）
	//	scrは呼び出し元のScript（＝呼び出し時点の#script）。isNextKidokuが別ファイルの
	//	呼び出し元の続きを見るために、そのトークン数（scr.len）を必要とする（本家 #hScript[cs.fn]）
	//	hArgsは「この枠を作った[call]/マクロ呼び出しタグの属性」（本家 csArg = {...hArg, …}）。
	//	マクロ本体の「%属性名」「*」がこれを参照する（#resolveTag()）。
	//	mp:変数でも同じ値が引けるが、mp:は読み出し時に自動キャストが掛かるので
	//	（'1.20'→1.2）、属性値をそのまま渡すために生の文字列を別途持っておく
	readonly #aCallStk: {fn: string; returnIdx: number; lenIfStk: number; hMp: {[key: string]: T_VAL_D}; hArgs: {[k: string]: string}; scr: Script; hEvt?: {[key: string]: T_EVENT_RSV}}[] = [];

	// 予約イベント表（本家 ReadingState.#hLocalEvt2Fnc / #hGlobalEvt2Fnc 相当）。
	//	ローカルは[call]で退避・[return]で復元、[jump]系のイベント発火で消去される「一回きり」の予約。
	//	グローバル（[event global=true]）はそれらに影響されず残り続ける
	#hLocalEvt: {[key: string]: T_EVENT_RSV} = Object.create(null);
	readonly #hGlobalEvt: {[key: string]: T_EVENT_RSV} = Object.create(null);

	// 既読領域（スクリプト名 -> 読んだトークン索引の集合。本家 Variable.#hAreaKidoku 相当）。
	//	本家はVariableが持つが、こちらはエンジンが抱えてgetKidoku()/setKidoku()で出し入れし、
	//	localStorageへの保存はScriptMng（SaveMng.ts）が停止点ごとに行う
	readonly #hAreaKidoku: {[fn: string]: Areas} = Object.create(null);
	#isKidoku = false;

	// マクロ定義：マクロ名 -> 本体開始位置（定義元のスクリプト名と、[macro name=...]の次のトークン索引）
	//	本家 ScriptIterator.ts:1363 #macro() と同じ「実行時定義」方式を採用。
	//	トークン列は一切変更せず、本体トークンはそのままの位置に残したまま、
	//	実行が[macro]に到達した時点で開始位置だけを記録し、[endmacro]まで読み飛ばす。
	//	呼び出し時は[call]と同じ枠組みでこの位置へジャンプし、[endmacro]は[return]と同じ処理で戻る
	//	（本家 ScriptIterator.ts:100 hTag.endmacro = ()=> this.#return(o) と同じ規約）
	readonly #hMacro: {[name: string]: {fn: string; idx: number}} = Object.create(null);

	// マクロ名に使えない文字（本家 ScriptIterator.ts:1362 #REG_NG4MAC_NM をそのまま移植）。
	//	" ' # ; \ ] と全角空白。タグ記述やタグ引数解析と衝突するため
	// eslint-disable-next-line no-irregular-whitespace
	static readonly REG_NG4MAC_NM = /["'#;\\\]　]+/;

	// マクロ名として使用不可（既存タグと同名は不可。本家 ScriptIterator.ts:1366
	// if (name in this.hTag) throw と同じ意図）
	static readonly RESERVED_TAGS = new Set([
		'add_lay', 'current', 'add_face', 'lay', 'clear_lay', 'trans', 'wt', 'finish_trans',
		'set_cancel_skip', 'let', 'let_ml', 'endlet_ml',
		'let_abs', 'let_char_at', 'let_index_of', 'let_length',
		'let_replace', 'let_round', 'let_search', 'let_substr',
		'tsy', 'tsy_frame', 'wait_tsy', 'stop_tsy', 'pause_tsy', 'resume_tsy',
		'quake', 'stop_quake', 'wq',
		'title', 'toggle_full_screen', 'dump_lay', 'dump_val', 'dump_stack', 'pop_stack',
		'clear_text', 'rec_ch', 'rec_r', 'reset_rec',
		'ch_in_style', 'ch_out_style', 'autowc',
		'navigate_to', 'loadplugin', 'snapshot',
		'close', 'update_check', 'window',	// アプリ（Electron）版のタグ。ブラウザ版では何もしない
		'record_place', 'save', 'load', 'reload_script',
		'copybookmark', 'erasebookmark', 'export', 'import',
		'add_frame', 'frame', 'set_frame', 'let_frame', 'set_focus',
		'add_filter', 'clear_filter', 'enable_filter',
		'if', 'elsif', 'else', 'endif',
		'r', 'er', 'trace', 'log',
		'jump', 'call', 'return', 'macro', 'endmacro', 'char2macro', 'bracket2macro',
		'button', 'event', 'clear_event', 'enable_event', 'clearvar', 'clearsysvar', 'page',
		'wait', 'waitclick', 'l', 'p', 's',
		'ch', 'endlink', 'graph', 'link', 'ruby2', 'span', 'tcy',
		// ＢＧＭ・効果音・動画
		'fadebgm', 'fadeoutbgm', 'fadeoutse', 'fadese', 'playbgm', 'playse',
		'stop_allse', 'stopbgm', 'stopfadese', 'stopse', 'volume', 'wb', 'wf', 'wl', 'ws', 'xchgbuf', 'wv',
	]);

	// 「定義済みのタグ・マクロ名」一覧。[char2macro]/[bracket2macro]のname属性検査に使う。
	//	本家はマクロもhTagへ動的登録するので `name in this.hTag` で済むが、
	//	試作はタグをswitch文で捌いているため、予約語表とマクロ表から都度組み立てる
	#hTagNames(): {[nm: string]: boolean} {
		const h: {[nm: string]: boolean} = Object.create(null);
		for (const nm of ScriptEngine.RESERVED_TAGS) h[nm] = true;
		for (const nm in this.#hMacro) h[nm] = true;
		return h;
	}

	// 第一引数はスクリプト名＋ソース、またはパース済みScript。
	//	変数・スタック等の実行状態はエンジン側が一手に持つので、
	//	ファイルを跨いでもこのインスタンスは作り直さない（switchScript()で切り替える）
	constructor(fn: string | Script, src = '') {
		this.#script = fn instanceof Script ? fn : new Script(fn, src);

		// 組み込み変数：常に「実行中の」スクリプト名を返す
		//	（本家 val.defTmp('const.sn.scriptFn', ...) 相当。遅延評価なので切替に自動追随する）
		this.#val.defBuiltin('const.sn.scriptFn', ()=> this.fn);

		// 組み込み変数：今いる位置が既読か。
		//	本家はトークンを読むたびtmp:へ代入するが（ScriptIterator.ts:1299）、
		//	こちらは他の組み込み変数と同じ遅延評価にした（参照時点の値は同じ）
		this.#val.defBuiltin('const.sn.isKidoku', ()=> this.#isKidoku);

		// 組み込み変数：全画面表示中か（本家 val.defTmp('const.sn.displayState', ()=> this.isFullScr)）。
		//	**エンジンは自分では倒さない**。Escキーでの解除などブラウザ都合の変化もあるので、
		//	実際の状態はDOM側（Stage.tsxのfullscreenchange）からsetFullScr()で教えてもらう
		//	（本家もSysWebがfullscreenchangeを拾ってisFullScrへ書いている）
		this.#val.defBuiltin('const.sn.displayState', ()=> this.#isFullScr);

		// 組み込み変数：参照時の日時（本家 CmnInterface.ts:288 の defTmp と同じ書式）。
		//	テンプレの frames/_archive.sn が [save dt=&const.Date.getDateStr] でしおりの日付に使う
		this.#val.defBuiltin('const.Date.getDateStr', ()=> getDateStr());
		this.#val.defBuiltin('const.Date.getTime', ()=> (new Date).getTime());

		// 組み込み変数：今のページの本文（本家 LayerMng.ts:213
		//	val.defTmp('const.sn.last_page_plain_text', ()=> currentTxtlayFore?.pagePlainText)）。
		//	既定文字レイヤの蓄積文字列そのもの。テンプレの frames/_archive.sn が
		//	[save text=&const.sn.last_page_plain_text] でしおりの見出し文に使う。
		//	本家と同じく**ルビ記法を除いた平文**（`蜊《あさり》`→`蜊`）を返す
		this.#val.defBuiltin('const.sn.last_page_plain_text',
			()=> plainTxt(this.#hTxt[this.#curTxtLayer] ?? ''));
		// 本家（LayerMng.ts:212）は《》やルビ記法を含む生のページ本文＝蓄積文字列そのもの
		this.#val.defBuiltin('const.sn.last_page_text',
			()=> this.#hTxt[this.#curTxtLayer] ?? '');

		// 組み込み変数：本文履歴のJSON（本家 Log.ts:39 defTmp）。
		//	`[{"text":"…HTML…"}, …]`の配列で、末尾が書きかけの現ページ。
		//	テンプレの frames/_log.sn が [set_frame … text=&const.sn.log.json] で履歴画面へ渡し、
		//	frames/_log.htm が各 text を innerHTML に入れる＝**値はHTML**
		this.#val.defBuiltin('const.sn.log.json', ()=> this.#log.json());

		// 組み込み変数：修飾キー等の**今の押下状態**（本家 EventMng.ts:318 の defTmp 一式）。
		//	押下表を持てるのはDOM側だけなので、Main.tsxのkeydown/keyupがsetKeyDown()で教えてくる。
		//	`back`はAndroidのBackキー（本家 #hDownKeys の'GoBack'）で、ブラウザには相当する
		//	キーイベントが無いため常にfalse。変数自体は本家に揃えて用意しておく
		this.#val.defBuiltin('const.sn.key.alternate',	()=> this.#hDownKey.Alt === true);
		this.#val.defBuiltin('const.sn.key.command',	()=> this.#hDownKey.Meta === true);
		this.#val.defBuiltin('const.sn.key.control',	()=> this.#hDownKey.Control === true);
		this.#val.defBuiltin('const.sn.key.end',		()=> this.#hDownKey.End === true);
		this.#val.defBuiltin('const.sn.key.escape',	()=> this.#hDownKey.Escape === true);
		this.#val.defBuiltin('const.sn.key.back',		()=> false);

		// 円周率（本家 CmnInterface.ts:334）
		this.#val.defBuiltin('const.sn.Math.PI', ()=> Math.PI);
		// スタックの深さ（本家 CmnInterface.ts:346-347）。デバッグ・入れ子の見張り用
		this.#val.defBuiltin('const.sn.aIfStk.length', ()=> this.#aIfStk.length);
		this.#val.defBuiltin('const.sn.vctCallStk.length', ()=> this.#aCallStk.length);

		// save:const.sn.mesLayerの初期値を#curTxtLayerに合わせておく。[current]タグ（1084行目）が
		//	一度も実行されないうちにシナリオが`&save:const.sn.mesLayer`を参照すると
		//	（例：本家準拠の[hidetext]相当が既定文字レイヤを掴む処理）、変数が未定義のまま
		//	式評価が'undefined'を返し、[lay layer=&save:const.sn.mesLayer]のlayer属性が
		//	丸ごと消えて「存在しないレイヤ」例外になる事故があったため
		this.#val.setNochk('save:const.sn.mesLayer', this.#curTxtLayer);
	}
	#isFullScr = false;
	setFullScr(b: boolean) {this.#isFullScr = b}

	// 修飾キー等の押下状態（const.sn.key.*）。DOM側（Main.tsx）が押した・離したを教えてくる。
	//	キー名はKeyboardEvent.keyそのまま（本家 #hDownKeys と同じ綴り）
	#hDownKey: {[key: string]: boolean} = Object.create(null);
	setKeyDown(key: string, down: boolean) {this.#hDownKey[key] = down}
	// ウインドウのフォーカスが外れた時。押したまま離れたキーが「押しっぱなし」で残らないように
	clearKeyDown() {this.#hDownKey = Object.create(null)}

	// 実行中スクリプトの差し替え＝ファイル切替。
	//	ScriptMngが'loadScript'アクションを受けてfetch・パースした結果を渡してくる。
	//	labelが空ならidx（既定0）の位置から実行する
	switchScript(scr: Script, label = '', idx = 0) {
		this.#script = scr;
		if (! label) {this.#idx = idx; return}

		const to = scr.label2idx(label, idx, this.#isInMacro());
		if (to === undefined) throw `ラベル【${label}】がスクリプト【${scr.fn}】に見つかりません`;
		this.#idx = to;
	}

	// テスト・呼び出し側（ScriptMngのしおり処理等）から変数値を読むためのアクセサ
	getVal(name: string): T_VAL_D {return this.#val.get(name)}

	// ScriptMng（DOM側）が「DOMを触った結果」を組み込み変数へ書き戻すための口。
	//	[add_frame]の読込完了や[let_frame]の取得値がこれを通る（本家 val.setVal_Nochk('tmp', …) 相当）
	setValNochk(name: string, v: T_VAL_D) {this.#val.setNochk(name, v)}

	// sys:への代入に即座に反応させたい副作用の登録口（本家の「代入トリガ関数」T_fncSetVal相当）。
	//	専用タグを経由しない直接代入（[let]・&=・設定画面）にも反応させたい値のためのフック。
	//	音量スライダ（sys:sn.sound.global_volume）がこれを使う（ScriptMng参照）
	defSetTrigger(name: string, fnc: (v: T_VAL_D)=> void) {this.#val.defSetTrigger(name, fnc)}
	// sys:const.sn.sound.<buf>.volume専用（buf動的なのでdefSetTrigger()のキー完全一致では表せない）
	defSetTriggerSoundVol(fnc: (buf: string, v: T_VAL_D)=> void) {this.#val.defSetTriggerSoundVol(fnc)}

	// 組み込み変数（読み取り専用・遅延評価）の登録口。
	//	エンジン自身が知りようのない値——prj.jsonの設定やブラウザの情報——を
	//	ScriptMng（DOM側）から入れてもらうために開けてある（本家 val.defTmp() 相当）
	defBuiltin(name: string, fnc: ()=> T_VAL_D) {this.#val.defBuiltin(name, fnc)}

	get fn() {return this.#script.fn}
	get idx() {return this.#idx}
	// [log]の表示用（本家 ScriptIterator.lineNum 相当）。#idxが末尾ちょうど（atEnd）の時は
	// 1つ前のトークンの行番号を返す（末尾に対応する行番号そのものが無いため）
	get lineNum() {return this.#script.aLNum[Math.min(this.#idx, this.#script.len -1)] ?? NaN}
	get atEnd() {return this.#idx >= this.#script.len}

	// 画像の先読み用：現在位置から次の停止点（[l]/[p]/[s]/[waitclick]）またはスクリプト終端までに
	//	出てきそうな画像の論理名fnを集める（本家SpritesMngにあたる専用先読みタグは無いが、
	//	todo.mdの設計方針どおりpure関数として切り出した）。**実行を伴わない走査**なので、
	//	[if]の両分岐とも拾う（実際にどちらへ進むかは実行しないと分からないため多めに拾う）し、
	//	「&式」「%マクロ引数」で書かれた値は解決できずそのまま無視する（best-effort）
	peekUpcomingPicFn(): string[] {
		const aFn: string[] = [];
		// 既に実行済みの[add_face]（this.#hFace）に加え、走査中に見つかった[add_face]も
		//	その場で足す（宣言直後に使う書き方が普通なので、まだ実行していなくても拾えたほうがよい）
		const hFace = new Map(Object.entries(this.#hFace).map(([nm, f])=> [nm, f.fn]));
		for (let i = this.#idx; i < this.#script.len; ++i) {
			const token = this.#script.aToken[i]!;
			if (token.charCodeAt(0) !== 91) continue;	// [ タグ開始以外は無視

			const {name, args} = ScriptEngine.parseTag(token);
			if (name === 'l' || name === 'p' || name === 's' || name === 'waitclick') break;
			if (name === 'add_face') {
				if (args.name) hFace.set(args.name, args.fn || args.name);
				continue;
			}
			if (name !== 'lay') continue;

			const picFn = args.fn || args.pic;
			if (picFn && ! picFn.startsWith('&') && ! picFn.startsWith('%')) aFn.push(picFn);
			if (args.face) for (const nm of args.face.split(',')) {
				if (nm.startsWith('&') || nm.startsWith('%')) continue;
				// [add_face]未定義の名前はファイル名そのものとして扱う（本家 SpritesMng.ts:150 の ?? フォールバックに合わせる）
				aFn.push(hFace.get(nm) ?? nm);
			}
		}
		return aFn;
	}

	// [button]クリック時に呼ばれる：指定ラベルへ直接ジャンプする（読み進め＝Caretaker等には触れない。呼び出し側の責務）
	jumpToLabel(label: string) {
		const to = this.#script.label2idx(label, this.#idx, this.#isInMacro());
		if (to === undefined) throw `[button] ラベル【${label}】が見つかりません`;
		this.#idx = to;
	}

	// [button call=true]クリック時に呼ばれる：指定ラベルへサブルーチンコールする（[call]タグと同じ仕組み）。
	//	呼び出し後、[return]でコール元へ戻れる（#aCallStk＋ifスタックの壁(-1)を積む）。
	//	this.#idxは既に現在の停止点（[l]/[p]/[s]）の次のトークンを指しているため、
	//	それをreturnIdxとして記録し、step()再開時にそこへ戻る。
	//	freezeClearOnResume（既定true）：[button]/[event]のcall予約は[l]/[p]待ち中への一時的な
	//	割り込みでありうるので、呼び出し中はclearOnResumeをfalseに凍結し、誤って本文が消去されない
	//	ようにする。[return]で[p]の位置まで戻ればタグ自体の再実行で自然にtrueへ戻る（意図的に
	//	[return]側では復元しない。理由は#doReturn()のコメント参照）。[load fn= label=]（本家と
	//	同じ「復元後そのラベルをコール」）だけは通常のcallと同じ挙動でよいためfalseで呼ぶ
	callToLabel(label: string, freezeClearOnResume = true) {
		const to = this.#script.label2idx(label, this.#idx, this.#isInMacro());
		if (to === undefined) throw `[button] ラベル【${label}】が見つかりません`;
		// this.#idxは既に停止点の次のトークンを指している（#returnで戻る先）
		// hMp：[call]/マクロ呼び出しと同じく、呼び出し時点のmp:値を保存する（#doReturn()で復元）
		this.#pushCallStk(--this.#idx);
		if (freezeClearOnResume) this.#clearOnResume = false;
		this.#idx = to;
	}

	// [button fn=… call=true]クリック時：別ファイルのラベルへサブルーチンコールする。
	//	スクリプトのロードは呼び出し側（ScriptMng）が済ませてからScriptを渡してくる。
	//	freezeClearOnResumeの意味はcallToLabel()と同じ（既定true。[load fn= label=]だけfalseで呼ぶ）
	callToScript(scr: Script, label = '', freezeClearOnResume = true) {
		this.#pushCallStk(--this.#idx);	// callToLabel()と同じく、戻り先は今いる停止点そのもの
		if (freezeClearOnResume) this.#clearOnResume = false;
		this.switchScript(scr, label);
	}

	// ===== しおり（セーブ・ロード）でエンジンが受け持つ分 =====
	//	ページ（表裏の見た目）はストアが持つので、合成はScriptMngの担当（SaveMng.ts参照）

	// 再開位置（本家 ScriptIterator.nowScrIdx()）。サブルーチン／マクロの中なら
	//	**最上位の呼び元**を返す。中身から再開しても呼び元のスタックが無くて戻れないため
	nowScrIdx(): {fn: string; idx: number} {
		const cs = this.#aCallStk[0];
		return cs ? {fn: cs.fn, idx: cs.returnIdx} : {fn: this.fn, idx: this.#idx};
	}
	// [record_place]：再開位置をsave:へ書く（本家 #record_place() の前半）。
	//	この2つは復元時にどこへ戻るかそのものなので、しおりのhSaveに含まれる必要がある
	recordPlace() {
		const {fn, idx} = this.nowScrIdx();
		this.#val.setNochk('save:const.sn.scriptFn', fn);
		this.#val.setNochk('save:const.sn.scriptIdx', idx);
	}
	// しおりのエンジン側の中身。ifスタックはコールスタックぶんを切り落とす
	//	（本家 #aIfStk.slice(#aCallStk.length)。復元時はコールスタックが空になるため）
	nowMarkPart(): {hSave: {[k: string]: T_VAL_D}; aIfStk: number[]; hTxt: {[nm: string]: string}; hTxtBk: {[nm: string]: string}} {
		// 履歴をsave:へ焼き付ける（本家 Log.ts:59 の`save:const.sn.sLog`）。
		//	**本家は本文を1トークン追記するたびにこれを書き直す**が、この値を読むのは
		//	しおりの保存と復元だけなので、ここ＝スナップショットを取る直前の1回で足りる。
		//	（本家がそうしているのは、あちらのLogがしおり処理から見えない場所に居るため）
		this.#val.setNochk('save:const.sn.sLog', this.#log.json());
		return {
			hSave	: this.#val.cloneNs('game'),
			aIfStk	: this.#aIfStk.slice(this.#aCallStk.length),
			// **本文はエンジン側にも積んである**（chgStrはこの累積を丸ごと送る形なので）。
			//	ストアのページを戻すだけではここが古いままで、復元後に1文字足しただけで
			//	前の本文が丸ごと戻ってくる。読み戻り（PageLog）で露見した
			hTxt	: {...this.#hTxt},
			hTxtBk	: {...this.#hTxtBk},
		};
	}
	// [load]／[reload_script]での復元（本家 loadFromMark()）。
	//	コールスタックとマクロ引数は捨てる＝しおりは常に最上位の位置を指しているため
	restoreMarkPart(o: {hSave: {[k: string]: T_VAL_D}; aIfStk: number[]; hTxt?: {[nm: string]: string}; hTxtBk?: {[nm: string]: string}}) {
		this.#val.setNs('game', o.hSave);
		this.#hTxt = {...o.hTxt};	// 古いしおり（hTxt導入前）は空＝次の本文から積み直しになる
		this.#hTxtBk = {...o.hTxtBk};	// 更に古いしおり（hTxtBk導入前）も同様
		// 既定文字レイヤも戻す（[current]はsave:へ書いてあるので、そこから引く）
		this.#curTxtLayer = String(this.#val.get('save:const.sn.mesLayer') ?? this.#curTxtLayer);
		// 履歴の復帰（本家 Log.ts:113 playback()）。保存時点の全ページを確定ページとして読み直し、
		//	書きかけページは捨てる（本家も同じ。ロード直後は「まだ何も読んでいない」状態から始まる）
		this.#log.playback(String(this.#val.get('save:const.sn.sLog') ?? '[]'));
		this.#val.setMp({});
		this.#aIfStk.length = 0;
		this.#aIfStk.push(...o.aIfStk);
		this.#aCallStk.length = 0;
		// 予約イベントも本家同様に消す（loadFromMark冒頭の clear_event({})＝ローカルのみ。
		//	global=trueの予約は「ゲーム中ずっと有効」の意味なのでロードでも残す）
		this.clearEvent();

		// 音声のループ帳簿（本家 SoundMng.playLoopFromSaveObj() の起点）。#hLoopPlayは
		//	save:const.sn.loopPlayingの内部キャッシュなので、しおり復元（上のsetNs('game', …)で
		//	save:namespaceも書き戻り済み）後はそこから読み直す。実際に鳴らし直す・止めるのは
		//	DOM/WebAudioに触れないエンジンではなくScriptMng側の責務（#procLoad()参照）
		for (const k of Object.keys(this.#hLoopPlay)) delete this.#hLoopPlay[k];	// eslint-disable-line @typescript-eslint/no-dynamic-delete
		try {
			const hLP = JSON.parse(String(this.#val.get('save:const.sn.loopPlaying', '{}'))) as {[buf: string]: string};
			Object.assign(this.#hLoopPlay, hLP);
		} catch { /* 壊れたJSONは空のまま（本家も#stop_allse()相当で無音スタート） */ }
	}
	// sys:名前空間の出し入れ（永続化用。本家 SysBase.data.sys ↔ Variable の sys スコープ）
	cloneSys(): {[k: string]: T_VAL_D} {return this.#val.cloneNs('sys')}
	setSys(h: {[k: string]: T_VAL_D}) {this.#val.setNs('sys', h)}

	// [trans]の演出完了時、交換対象レイヤの本文蓄積を表裏入れ替える（本家 Pages.transPage 相当）。
	//	store側のfinTrans()（store.tsx）は交換対象レイヤについて「新しい表＝古い裏」「新しい裏＝
	//	新しい表の複製」にするが、値としては新しい裏＝古い裏のまま＝表だけ古い裏の値にすれば足りる。
	//	これを呼ばずに[er]を挟まず[trans]すると、エンジンの蓄積（＝表専用だった名残）が
	//	古い表のまま残り、次の本文が前の場面の文へ継ぎ足されてしまう（読み進めて実際に踏んだ不具合）。
	//	タグ実行時ではなく演出完了時に呼ぶこと（ScriptMng#finishTrans()）。[trans]自体は
	//	'skip'で読み進めが続くので、タグ実行時に写すと演出中に書いた本文が古い裏へ紛れ込む
	transDone(aLayNm: string[] | null) {
		for (const nm of Object.keys(this.#hTxt)) {
			if (aLayNm && ! aLayNm.includes(nm)) continue;
			this.#hTxt[nm] = this.#hTxtBk[nm] ?? '';
		}
	}


	// ===== 既読処理 =====
	//	「どのスクリプトのどのトークンまで読んだか」を領域集合（Areas）で覚える。
	//	用途は既読スキップ・オート読みの待ち時間切替・[if exp="const.sn.isKidoku"]による分岐

	// 今いる位置が既読か（本家 ScriptIterator.isKidoku）
	get isKidoku() {return this.#isKidoku}

	// 現在位置（これから読むトークン）の既読判定と記録（本家 ScriptIterator.ts:1292 #recordKidoku()）。
	//	本家同様、保存（saveKidoku相当）はここでは行わない＝毎トークンでは重すぎるので、
	//	停止点（[l]/[p]/[s]）でScriptMngがまとめて吐き出す
	#recordKidoku() {
		const ar = this.#hAreaKidoku[this.fn] ??= new Areas;

		// マクロ内やサブルーチンではisKidokuを変更させない（本家のコメントそのまま）。
		//	同じサブルーチンが未読・既読どちらの文脈からも呼ばれるため
		if (this.#aCallStk.length > 0) {ar.record(this.#idx); return}

		this.#isKidoku = ar.search(this.#idx);
		if (this.#isKidoku) return;
		ar.record(this.#idx);
	}
	// 現在位置を未読へ戻す（本家 #eraseKidoku()）。[jump count=false]／[call]（count=true以外）から呼ばれる
	#eraseKidoku() {
		this.#hAreaKidoku[this.fn]?.erase(this.#idx);
		this.#isKidoku = false;
	}

	// 既読情報の出し入れ（本家 Variable.saveKidoku() / SysBase.data.kidoku 相当）。ScriptMngが使う
	getKidoku(): {[fn: string]: T_H_Areas} {
		const h: {[fn: string]: T_H_Areas} = {};
		for (const [fn, ar] of Object.entries(this.#hAreaKidoku)) h[fn] = ar.val();
		return h;
	}
	setKidoku(h: {[fn: string]: T_H_Areas}) {	// ロード＝丸ごと置き換え
		for (const fn in this.#hAreaKidoku) delete this.#hAreaKidoku[fn];	// eslint-disable-line @typescript-eslint/no-dynamic-delete
		this.#isKidoku = false;
		for (const [fn, v] of Object.entries(h)) this.#hAreaKidoku[fn] = Areas.from(v);
	}
	// [clearsysvar]から呼ばれる既読情報の全消去（本家 Variable #clearsysvar() の ar.clear()）
	clearKidoku() {
		for (const ar of Object.values(this.#hAreaKidoku)) ar.clear();
		this.#isKidoku = false;
	}


	// ===== オート読み・既読スキップ =====
	//	3つのフラグはただのtmp変数（`&sn.auto.enabled = true`等で設定）。本家は静的フィールドに
	//	ミラーして高速参照するが、試作は停止点でのみ参照するので毎回変数を読むだけにした。
	//	判断はエンジン（純粋ロジック）、タイマーとユーザー入力での中断はScriptMngが持つ

	get autoEnabled() {return this.#flag('sn.auto.enabled')}	// オート読み（一定時間で自動進行）
	get skipEnabled() {return this.#flag('sn.skip.enabled')}	// 既読スキップ（既読部分を素早く進行）
	get skipAll()     {return this.#flag('sn.skip.all')}	// falseなら既読のみスキップ、trueなら未読も含め全部
	#flag(name: string): boolean {return this.#val.get(`tmp:${name}`) === true}

	// [l]で止まるか（本家 Reading.tagL_enabled）。**こちらだけ既定がtrue**なので、
	//	未設定＝trueとして読む。falseにすると[l]を素通りして頁末（[p]/[s]）まで一気に進む。
	//	ギャラリーの tag_quake が「既読スキップの永久ループ対策」に使う書き方
	get tagLEnabled() {return this.#val.get('tmp:sn.tagL.enabled') !== false}

	// オート・スキップの解除（本家 ReadingState.cancelAutoSkip()）。3フラグを倒す。
	//	[s]到達・未読での停止・ユーザーの手動操作から呼ばれる
	cancelAutoSkip() {
		this.#val.set('tmp:sn.skip.enabled', false);
		this.#val.set('tmp:sn.skip.all', false);
		this.#val.set('tmp:sn.auto.enabled', false);
		// [l]無視も一緒に戻す（本家 cancelAutoSkip() の先頭）。
		//	既にtrueなら触らない＝未設定のまま（[dump_val]に要らない変数を生やさない）
		if (! this.tagLEnabled) this.#val.set('tmp:sn.tagL.enabled', true);
	}

	// 次に読むトークン（現在位置）が既読か（本家 ScriptIterator.isNextKidoku）。
	//	既読スキップを「未読に来たら止める」ために使う。
	//	サブルーチン内（コールスタックあり）では、本家同様「呼び出し元の続き」を見る
	//	（サブルーチンを抜けた後に読む位置＝呼び出し元の戻り先。別ファイルでも可）
	get isNextKidoku(): boolean {
		let fn = this.fn;
		let idx = this.#idx;
		let len = this.#script.len;
		const cs = this.#aCallStk.at(-1);
		if (cs) {fn = cs.fn; idx = cs.returnIdx; len = cs.scr.len}

		if (idx >= len) return false;	// スクリプト終端＝この先に読むものが無い
		return this.#hAreaKidoku[fn]?.search(idx) ?? false;
	}

	// 停止点（[l]/[p]/[s]）での自動進行指示を決める（本家 Reading.ts l()/p()/s() のオート・スキップ分岐）
	#calcResume(kind: T_STOP_KIND): T_RESUME | undefined {
		// [s]/[waitclick]は必ず止まる＝オート・スキップ解除（本家 Reading s() の cancelAutoSkip()。
		//	[waitclick]も同じ関数を通るので同じ扱いになる）
		if (kind === 's' || kind === 'waitclick') {this.cancelAutoSkip(); return undefined}

		if (this.autoEnabled) return {mode: 'auto', msec: this.#autoMsec(kind === 'p')};

		if (this.skipEnabled) {
			// 未読に来たら止める（skip.all時は未読も飛ばす）。本家 Reading l()/p() と同じ
			if (! this.skipAll && ! this.isNextKidoku) {this.cancelAutoSkip(); return undefined}
			// スキップモード（本家 sys:sn.skip.mode。既定's'）。
			//	's'：行[l]も改ページ[p]も飛ばす。'p'：行は飛ばすが改ページ[p]では止まる。
			//	（本家 Reading p() は mode==='s' のときだけ改ページを飛ばす）
			if (kind === 'p' && this.#skipMode() !== 's') return undefined;
			return {mode: 'skip', msec: 0};
		}
		return undefined;	// 通常のクリック待ち
	}
	#skipMode(): string {
		const v = this.#val.get('sys:sn.skip.mode');
		return v === undefined || v === null ? 's' : String(v);	// 未設定時の既定は本家に合わせ's'
	}
	// オート読みの待ち時間。既読なら_Kidoku側の設定を使う（本家 sys:sn.auto.msec*Wait[_Kidoku]）。
	//	sys変数が未設定でも動くよう既定値を持つ（行=500ms／改ページ=3500ms）
	#autoMsec(isPage: boolean): number {
		const base = isPage ? 'sn.auto.msecPageWait' : 'sn.auto.msecLineWait';
		const v = Number(this.#val.get(`sys:${base}${this.isKidoku ? '_Kidoku' : ''}`));
		return Number.isFinite(v) && v > 0 ? v : isPage ? 3500 : 500;
	}


	// ===== 予約イベント（[event]） =====
	//	キー入力・クリックそのものはDOM側の話なので、エンジンは「予約表」と
	//	「発火時に実行位置をどう動かすか」だけを受け持つ。
	//	どのキー名で引くか（'click'やe.keyの小文字化）は呼び出し側（Main.tsx）の取り決め

	// 予約を引く。ローカル優先（本家 ReadingState.getEvt2Fnc()）
	getEvent(key: string): T_EVENT_RSV | undefined {
		const k = key.toLowerCase();
		return this.#hLocalEvt[k] ?? this.#hGlobalEvt[k];
	}
	clearEvent(global = false) {
		if (! global) {this.#hLocalEvt = Object.create(null); return}
		for (const k in this.#hGlobalEvt) delete this.#hGlobalEvt[k];	// eslint-disable-line @typescript-eslint/no-dynamic-delete
	}
	#popLocalEvt(): {[key: string]: T_EVENT_RSV} {
		const h = this.#hLocalEvt;
		this.#hLocalEvt = Object.create(null);
		return h;
	}

	// 予約イベントの発火（本家 Main.ts:167 resumeByJumpOrCall() 相当。url指定は試作では非対応）。
	//	予約が無ければundefinedを返す＝呼び出し側は通常の読み進めを行う。
	//	予約があればtmp:変数をセットし、jump系ならローカル予約イベントを消して（本家も同じ）
	//	飛び先を返す。実際の移動（ラベルジャンプ／サブルーチンコール／別ファイルのロード）は
	//	[button]クリックと同じ経路＝ScriptMng.jumpToLabelAndGo()に任せる
	beginEvent(key: string): T_EVENT_RSV | undefined {
		const ev = this.getEvent(key);
		if (! ev) return undefined;

		this.#val.set('tmp:sn.eventArg', ev.arg);
		this.#val.set('tmp:sn.eventLabel', ev.label);
		if (! ev.call) this.clearEvent();	// jump系：一回きりの予約なので消す（callは#pushCallStkが退避する）
		return ev;
	}

	// コールスタックへ1段積む（[call]・マクロ呼び出し・[button call=true]で共通）。
	//	popLocalEvt=trueならローカル予約イベントをここへ退避し、現在の表を空にする
	//	（＝サブルーチンへは持ち込まない。[return]で書き戻す）。マクロ呼び出しだけはfalse。
	//	hArgsは呼び出したタグの属性（マクロ本体の「%属性名」「*」が参照する）
	#pushCallStk(returnIdx: number, popLocalEvt = true, hArgs: {[k: string]: string} = {}) {
		this.#aCallStk.push({
			fn			: this.fn,
			returnIdx,
			lenIfStk	: this.#aIfStk.length,
			hMp			: this.#val.cloneMp(),
			hArgs,
			scr			: this.#script,	// 呼び出し元（=今の）Script。isNextKidokuで別ファイルのトークン数を引く
			...popLocalEvt ?{hEvt: this.#popLocalEvt()} :{},
		});
		this.#aIfStk.push(-1);	// 壁：このサブルーチン内のelsif/else/endifがコール元のifへ抜けるのを防ぐ
	}

	// 次の[l][p][s]（またはスクリプト終端）まで進め、その間に生じた表示変化を返す
	step(): T_ENGINE_ACTION[] {
		const aAct: T_ENGINE_ACTION[] = [];
		if (this.#clearOnResume) {	// 前回[p]で停止した後の再開なので、現在レイヤを先にクリア
			this.#clearOnResume = false;
			this.#recPagebreak();	// 履歴の1ページ＝[p]区切り（本家も改ページ前に積む）
			this.#hTxt[this.#curTxtLayer] = '';
			aAct.push({t: 'chgStr', nm: this.#curTxtLayer, page: 'fore', str: ''});
		}
		// トークン数は毎回読み直す。[char2macro]/[bracket2macro]は定義位置より後ろの
		//	トークンをその場で置換する＝実行中にトークン数が増減しうるため、キャッシュできない
		while (this.#idx < this.#script.len) {
			this.#recordKidoku();	// 読む直前の位置で既読判定・記録する（本家 #nextToken_Proc() と同じ場所）
			const token = this.#script.aToken[this.#idx++]!;

			// トークン先頭一文字での振り分け。本家 Main.ts:221 #main() と同じ並び
			//	（Grammarのトークンは行頭のタブ・改行・コメントが必ず独立するので、
			//	trimStart()の必要が無くなった）
			const uc = token.charCodeAt(0);	// TokenTopUnicode
			if (uc === 9 || uc === 10) continue;	// \t タブ / \n 改行（連続分がまとめて1トークン）

			if (uc === 91) {	// [ タグ開始
				const rt = this.#resolveTag(token);
				if (! rt) continue;	// cond属性が偽：このタグは実行しない（本家 タグ解析() と同じく丸ごと無視）
				const {name, args} = rt;
				// タグ処理は#execTag()へ分離した（switch内を全てcontinueで終端する書き方だと、
				// 一部のlinter/tscの「フォールスルー」検知が誤検知しやすいため、
				// 呼び出し元へreturn値で明示的に結果を伝える方式にした。挙動は従来と同じ）
				if (this.#execTag(name, args, aAct) === 'stop') return aAct;
				continue;
			}

			let txt = token;
			const ce = this.#script.grm.ce;	// エスケープ文字（prj.jsonのinit.escape。未設定なら空文字）
			// エスケープシーケンス（\[ など）。Grammarが2文字で1トークンにしているので、
			//	&/;/*等の後続分岐（変数操作・コメント・ラベル定義）には渡さず素通りする。
			//	**ここでは1文字目を落とさない**：落とした残り1文字（例えば\｜→｜）が
			//	プレーンな特殊記号としてstrへ混ざると、その後Txt.ts側のRubySpliterが
			//	ルビ記法として再解釈してしまう（\｜の直後に《…》があると意図せずルビが付く）。
			//	本家 RubySpliter.putTxt() と同じく、エスケープシーケンスは2文字のまま運び、
			//	表示直前（splitCh）で初めて1文字目を落とす設計に統一する
			const isEsc = !! ce && token.length > 1 && token.startsWith(ce);
			if (! isEsc && uc === 38) {	// & 変数操作・変数表示（本家 Main.ts:243）
				if (! token.endsWith('&')) {this.#letAmpersand(token); continue}	// ＆代入

				// ＆表示＆：式の評価結果をそのまま文字表示へ回す
				if (token.charAt(1) === '&') throw '「&表示&」書式では「&」指定が不要です';
				const v = this.#expr.parse(token.slice(1, -1));
				txt = v === null || v === undefined ? '' : String(v);
			}
			else if (! isEsc && uc === 59) continue;	// ; コメント（行末までで1トークン）
			else if (! isEsc && uc === 42 && token.length > 1) continue;	// * ラベル定義（実行時はスキップ）

			// 文字表示（プレーンテキスト＝地の文）
			this.#appendTxt(aAct, txt);
		}
		return aAct;	// スクリプト終端まで到達
	}

	// 「&名前 = 式 [= キャスト]」書式による変数代入（本家 Main.ts:246、[let]タグ相当）。
	//	「&&式 = 式」と書くと、変数名の側も式として評価される（本家 #getValAmpersand()）
	#letAmpersand(token: string) {
		const {name, text, cast} = splitAmpersand(token.slice(1));
		this.#val.set(
			this.#expr.getValAmpersand(name.trim()),
			this.#expr.parse(text),
			<T_CAST>(cast ?? ''),
		);
	}

	// [lay]属性のうち特定ページ（fore/back片方）に効くもの（[add_lay]から表裏それぞれへ2回呼ばれる想定）。
	//	picまたはfn属性変更、face属性による差分合成、文字レイヤ背景の不透明度（b_alpha）、
	//	レイヤ共通の見た目（visible/alpha/位置/寸法/blendmode/…）、フィルターに対応（試作簡略）
	#applyLayPage(args: {[k: string]: string}, aAct: T_ENGINE_ACTION[], page: T_PAGE): void {
		const nmLay = args.layer ?? '';
		// プラグインレイヤー（cls!=='grp'&&cls!=='txt'）かどうか。未登録（#hLayClsに無い＝
		//	通常は起きない。[add_lay]は必ず先に#hLayClsへ登録する）は'txt'扱いで従来どおり
		const cls = this.#hLayCls[nmLay] ?? 'txt';
		const isPlg = cls !== 'grp' && cls !== 'txt';

		if (! isPlg) {
			// picは旧仕様との互換用、fnは本家と同じ属性名（faceと併用する場合はfnを使う）。両方指定時はfnを優先
			const picFn = args.fn || args.pic;
			if (picFn) {
				const o: Extract<T_ENGINE_ACTION, {t: 'chgPic'}> = {t: 'chgPic', nm: nmLay, page, fn: picFn};
				// face属性省略時はaFaceを積まない＝直前のfaceを維持（本家：fnは毎回明示、faceは省略可）。
				//	face=""は明示的なクリア指定なので空配列を積む
				if (args.face !== undefined) {
					const aFace: T_FACE[] = [];
					if (args.face) {
						// 本家の csvFn = fn + ','+ face と同様、カンマ区切りで複数指定。重なり順＝記述順（後の要素ほど上）
						for (const nm of args.face.split(',')) {
							if (! nm) throw '[lay] face属性に空要素が含まれています';
							// [add_face]未定義の名前はファイル名そのものとして扱う（本家 SpritesMng.ts:150 の ?? フォールバック）
							aFace.push(this.#hFace[nm] ?? {fn: nm, dx: 0, dy: 0, blendmode: argBlendmode('normal')});
						}
					}
					o.aFace = aFace;
				}
				aAct.push(o);
			}

			// back_clear：文字レイヤ背景（b_color/b_alpha/b_alpha_isfixed/b_pic）を初期状態へ戻す
			//	（本家 TxtLayer.ts:376-385）。**指定時は他のb_*属性処理を素通りする**のが本家の規約
			//	（#drawBack()が早期returnする）。false指定時は何もしない
			if (args.back_clear !== undefined) {
				if (args.back_clear === 'true') aAct.push({t: 'chgBackClear', nm: nmLay, page});
			}
			else {
				// b_alpha / b_alpha_isfixed：文字レイヤ背景の不透明度と、その掛け算の有無。
				//	pic/fnとは無関係に単独でも併用でも指定可（本家同様、[lay]は複数属性を同時に受け付ける）
				if (args.b_alpha !== undefined || args.b_alpha_isfixed !== undefined) {
					const o: Extract<T_ENGINE_ACTION, {t: 'chgBAlpha'}> = {t: 'chgBAlpha', nm: nmLay, page};
					if (args.b_alpha !== undefined) {
						const v = Number(args.b_alpha);
						if (Number.isNaN(v)) throw `[lay] b_alphaの値が不正です：${args.b_alpha}`;
						// 値域0.0〜1.0に収める。本家（TxtLayer.ts:387 argChk_Num）はクランプせず素通しするが、
						//	CSSのrgba()が描画時に丸めるだけで、ストア（＝Memento・デザインモードが読む状態）には
						//	範囲外の値が残ってしまうため、ここで正規化する。
						//	例外にはしない：本家が通すスクリプトをbluesnovelだけが弾くことのないようにする
						o.b_alpha = Math.min(1, Math.max(0, v));
					}
					if (args.b_alpha_isfixed !== undefined) o.isFixed = args.b_alpha_isfixed !== 'false';
					aAct.push(o);
				}

				// b_pic：文字レイヤ背後の枠画像（本家 TxtLayer.ts:393 #drawBack()）。
				//	**指定するとb_colorは無視される**のが本家の規約。テンプレのメッセージ窓（wafuu1）が
				//	これで、未対応だと「白地に白文字」になって本文が読めなくなる
				if (args.b_pic !== undefined) {
					aAct.push({t: 'chgBPic', nm: nmLay, page, fn: args.b_pic});
				}
			}
		}

		// レイヤ共通の見た目。書かれた属性だけを拾う（本家 Layer.lay() の `'x' in hArg` 判定と同じ）。
		//	**プラグインレイヤーにも適用する**：位置・回転・拡縮・Moveableの「箱」
		//	（components/Layer.tsx）は本家Layer.ctnと同じくレイヤー種別によらず共通のため
		const sty: T_LAY_STY_ARG = {};
		if (args.visible !== undefined) sty.visible = args.visible !== 'false';
		if (args.alpha !== undefined) sty.alpha = ScriptEngine.#argNum('lay', 'alpha', args.alpha);
		// pos：立ち絵配置のショートカット（本家 Layer.setXYByPos()）。left/center/right/…系より
		//	優先する（本家は`if (hArg.pos) {setXYByPos(); return}`と早期returnし他の位置属性を
		//	見ない）。c/l/r/数値でX中心を指定し、Yは常に画像下端をステージ下端へ接地させる
		//	（本家は`ret.y = stageH - b_height`で計算するが、実寸を知らないこちらは
		//	bottom=stageH・align_y='bottom'の組で同じ絵にする）。pos=stayは位置を変えない
		if (args.pos === 'stay') { /* 位置は変えない */ }
		else if (args.pos !== undefined) {
			const p = args.pos;
			const stageW = Number(this.#val.get('tmp:const.sn.config.window.width'));
			const stageH = Number(this.#val.get('tmp:const.sn.config.window.height'));
			if (p === '' || p === 'c') {sty.left = stageW /2; sty.align_x = 'center'}
			else if (p === 'l') sty.left = 0;
			else if (p === 'r') {sty.left = stageW; sty.align_x = 'right'}
			else {sty.left = ScriptEngine.#argNum('lay', 'pos', p); sty.align_x = 'center'}
			sty.top = stageH;
			sty.align_y = 'bottom';
		}
		else {
			// 横位置は left / center / right / s_right の**排他**（本家 Layer.ts:513-532 の else if）。
			//	center・rightは「指定値から表示物の幅を引く」＝寄せ。実寸はエンジンが知らないので
			//	寄せの種類だけを渡し、CSSの独立translateプロパティで表現する（Lay.ts styLay）
			if (args.left !== undefined) sty.left = this.#argPos('lay', 'left', args.left);
			else if (args.center !== undefined) {
				sty.left = this.#argPos('lay', 'left', args.center);
				sty.align_x = 'center';
			}
			else if (args.right !== undefined) {
				sty.left = this.#argPos('lay', 'left', args.right);
				sty.align_x = 'right';
			}
			else if (args.s_right !== undefined) sty.s_right = this.#argPos('lay', 'left', args.s_right);
			// 縦位置も同じ並び（top / middle / bottom / s_bottom）
			if (args.top !== undefined) sty.top = this.#argPos('lay', 'top', args.top);
			else if (args.middle !== undefined) {
				sty.top = this.#argPos('lay', 'top', args.middle);
				sty.align_y = 'middle';
			}
			else if (args.bottom !== undefined) {
				sty.top = this.#argPos('lay', 'top', args.bottom);
				sty.align_y = 'bottom';
			}
			else if (args.s_bottom !== undefined) sty.s_bottom = this.#argPos('lay', 'top', args.s_bottom);

			// 画像レイヤ（class=grp）へfn/faceで画像を出す時、位置属性が一つも書かれていなければ
			//	下端中央へ落とす（本家 Layer.setXY() の isGrp 専用フォールバック。iPhone6など
			//	中途半端な画面サイズで縦位置が異常になるのを防ぐための分岐だが、bluesnovelでは
			//	単に「位置未指定の画像レイヤはステージ左上(0,0)基準」になってしまっており、[fg]等の
			//	初回表示が左上に出る不具合の原因だった＝todo.md 2026-08-23記載）。
			//	本家はfn指定時のみsetXYを呼ぶ（fn省略時はSpritesMngが差し替わらないため、既に
			//	表示済みの位置をそのまま保つ）ので、fn/face無指定の[lay layer=0 alpha=…]的な
			//	呼び出しでは発動させない
			if ((args.fn !== undefined || args.pic !== undefined || args.face !== undefined)
			&& ! ('left' in sty) && ! ('s_right' in sty) && ! ('top' in sty) && ! ('s_bottom' in sty)
			&& cls === 'grp') {
				const stageW = Number(this.#val.get('tmp:const.sn.config.window.width'));
				const stageH = Number(this.#val.get('tmp:const.sn.config.window.height'));
				sty.left = stageW /2; sty.align_x = 'center';
				sty.top = stageH; sty.align_y = 'bottom';
			}
		}
		// レイヤの寸法。0.0〜1.0を画面比率とする#argPos()は使わない（本家もwidth/heightは
		//	素のargChk_Numで、比率変換は位置属性left/center/right/s_right/top/…だけの仕様）。
		//	**独立した2つのif**：片方だけの指定でも成立させる（本家の潰れバグは踏襲しない）
		if (args.width !== undefined) sty.width = ScriptEngine.#argNum('lay', 'width', args.width);
		if (args.height !== undefined) sty.height = ScriptEngine.#argNum('lay', 'height', args.height);
		if (args.rotation !== undefined) sty.rotation = ScriptEngine.#argNum('lay', 'rotation', args.rotation);
		if (args.scale_x !== undefined) sty.scale_x = ScriptEngine.#argNum('lay', 'scale_x', args.scale_x);
		if (args.scale_y !== undefined) sty.scale_y = ScriptEngine.#argNum('lay', 'scale_y', args.scale_y);
		if (args.pivot_x !== undefined) sty.pivot_x = ScriptEngine.#argNum('lay', 'pivot_x', args.pivot_x);
		if (args.pivot_y !== undefined) sty.pivot_y = ScriptEngine.#argNum('lay', 'pivot_y', args.pivot_y);
		if (args.blendmode !== undefined) sty.blendmode = argBlendmode(args.blendmode);
		if (! isPlg) {
			// back_clear指定時はb_colorも本家同様に無視する（#drawBack()の同じ早期returnに含まれる）
			if (args.b_color !== undefined && args.back_clear !== 'true') sty.b_color = ScriptEngine.#argNum('lay', 'b_color', args.b_color);
			if (args.style !== undefined) sty.style = args.style;
			// 文字表示領域の内側余白（本家 TxtStage.ts の pl/pr/pt/pb）
			if (args.pl !== undefined) sty.pl = ScriptEngine.#argNum('lay', 'pl', args.pl);
			if (args.pr !== undefined) sty.pr = ScriptEngine.#argNum('lay', 'pr', args.pr);
			if (args.pt !== undefined) sty.pt = ScriptEngine.#argNum('lay', 'pt', args.pt);
			if (args.pb !== undefined) sty.pb = ScriptEngine.#argNum('lay', 'pb', args.pb);
			// 文字組み（本家 TxtLayer.ts:470 #setFfs()、Hyphenation.ts:64-90）。
			//	ffsは文字詰め（CSSのfont-feature-settingsの値をそのまま）、noffsはffsを効かせない文字の並び、
			//	buraはぶら下げ禁則。kinsoku_*は禁則文字集合の差し替え。**未指定は現在値維持**
			//	（既定値はここに書かない。本家もtruthy判定＝現在値維持で、既定はKinsokuクラスが持つ）
			if (args.ffs !== undefined) sty.ffs = args.ffs;
			if (args.noffs !== undefined) sty.noffs = args.noffs;
			if (args.bura !== undefined) sty.bura = args.bura !== 'false';
			if (args.kinsoku_sol !== undefined) sty.kinsoku_sol = args.kinsoku_sol;
			if (args.kinsoku_eol !== undefined) sty.kinsoku_eol = args.kinsoku_eol;
			if (args.kinsoku_dns !== undefined) sty.kinsoku_dns = args.kinsoku_dns;
			if (args.kinsoku_bura !== undefined) sty.kinsoku_bura = args.kinsoku_bura;
			// 傍点の文字（本家 TxtLayer.ts:303）。RubySpliterが静的に持つ設定なのでアクション化は不要。
			//	プラグインの[lay]が傍点設定を巻き込まないよう文字レイヤ専用属性群の内側にする
			RubySpliter.setting(args);
			// ルビ位置の既定（本家 TxtLayer.ts:307）。記法内指定（`位置｜ルビ`）があればそちらが勝つ
			if (args.r_align !== undefined) {
				if (! (A_R_ALIGN as readonly string[]).includes(args.r_align))
					throw `[lay] r_alignの値が不正です：${args.r_align}`;
				sty.r_align = args.r_align as T_R_ALIGN;
			}
			// 文字出現・消去演出の指定（本家 TxtLayer.ts:67）。定義済みかはストア側で引く
			if (args.in_style !== undefined) sty.in_style = args.in_style;
			if (args.out_style !== undefined) sty.out_style = args.out_style;
		}
		if (Object.keys(sty).length > 0) aAct.push({t: 'chgLay', nm: nmLay, page, sty});

		// [lay filter=…]はフィルターを**置き換える**（本家 Layer.lay() の
		//	`c.filters = [bldFilters(hArg)]`。重ねたいなら[add_filter]）。プラグインの箱にも効く
		if (args.filter !== undefined) {
			aAct.push({t: 'addFilter', aLayNm: [nmLay], page, flt: bldFilter(args), replace: true});
		}

		// プラグインレイヤー（本家 Pages.lay() の f.lay(hArg)/b.lay(hArg) 相当）。
		//	属性ハッシュを丸ごと渡す＝中身の解釈はプラグインの責務
		if (isPlg) aAct.push({t: 'layPlg', nm: nmLay, page, hArg: {...args}});
	}

	// [lay]属性のうちページに依存しないもの（本家 LayerMng.ts:489 #lay() の float/index/dive。
	//	**表裏とも同じ順に動かす**＝本家も#fore/#backの両方をsetChildIndexする）。
	//	並び替えは現在の並びが要るのでストア側で解決する
	#applyLayOrder(args: {[k: string]: string}, aAct: T_ENGINE_ACTION[]): void {
		const nmLay = args.layer ?? '';
		if ((args.float ?? 'false') !== 'false') aAct.push({t: 'moveLay', nm: nmLay, mode: 'float'});
		else if (args.index) {
			// 本家は `if (hArg.index)` の内側でさらに `if (argChk_Num(...))` と数値の真偽を見るので、
			//	**index=0は何も起きない**（最背面へ送る指定にはならない）。そのまま移植する
			const i = ScriptEngine.#argNum('lay', 'index', args.index);
			if (i) aAct.push({t: 'moveLay', nm: nmLay, mode: 'index', index: i});
		}
		else if (args.dive) aAct.push({t: 'moveLay', nm: nmLay, mode: 'dive', dive: args.dive});
	}

	// [ タグ ]トークン1件分の処理。戻り値：
	//	'skip' … このタグの処理を終え、通常どおり次のトークンへ進む
	//	'stop' … [l]/[p]/[s]による停止点。呼び出し元（step()）はaActをそのまま返す
	#execTag(name: string, args: {[k: string]: string}, aAct: T_ENGINE_ACTION[]): 'skip' | 'stop' {
		const len = this.#script.len;
		switch (name) {
		case 'add_lay': {
			const nm = args.layer ?? args.nm ?? '';
			if (! nm) throw '[add_lay] layerは必須です（試作仕様）';
			// 大文字小文字は区別しない（既存テスト・シナリオが class=GRP/TXT のように書くことがあるため）
			const cls = (args.class ?? 'txt').toLowerCase();
			// 本家 Pages.ts:22 `if (! fncF) throw 属性 class【…】が不正です` と同じ位置での検査。
			//	以前はgrp以外を黙ってtxtに落としていた（class=hogeがエラーにならなかった）が、
			//	プラグインcls（[add_lay class=3d]等）を受け付けるにはタイポと未登録プラグインを
			//	見分ける必要があるため、ここで検査する
			if (! hasLayCls(cls)) throw `[add_lay] 属性 class【${cls}】が不正です。レイヤクラスが登録されていません`;
			this.#hLayCls[nm] = cls;
			this.#hTxt[nm] = '';
			this.#hTxtBk[nm] = '';
			// 文字レイヤは作った時点で「イベントを受ける」（本家 LayerMng.ts:465）。
			//	[enable_event]がこれを書き換える。**シナリオから読むための値**なので、
			//	これを書き換えても効かない（有効・無効を変えるのは[enable_event]）
			if (cls === 'txt') this.#val.setNochk(`save:const.sn.layer.${nm}.enabled`, true);
			aAct.push({t: 'addLay', cls, nm});
			// 本家 Pages コンストラクタ（Pages.ts:35 `ret.isWait = f.lay(hArg) || b.lay(hArg)`）は、
			//	新規レイヤ作成時に[add_lay]自身のhArgへ[lay]と同じ属性処理を表裏両方へ適用する。
			//	fn/blendmode/visible等を[add_lay]自身に書ける（例：sn_galleryのblendmodeプロジェクトの
			//	`[add_lay layer=bg class=grp fn=…]`）のはこのため。並び順（float/index/dive）は
			//	page非依存なので1回だけ
			const argsL = args.layer !== undefined ? args : {...args, layer: nm};
			this.#applyLayPage(argsL, aAct, 'fore');
			this.#applyLayPage(argsL, aAct, 'back');
			this.#applyLayOrder(argsL, aAct);
			return 'skip';
		}
		case 'current': {	// デフォルト文字レイヤ切替（試作簡略：layer属性のみ）
			// 切替**前**に履歴を確定させる（本家 LayerMng.ts:956「カレント変更前に現在の履歴を保存」）。
			//	でないと前のレイヤの書きかけが次のレイヤの本文と地続きになる
			const nmCur = args.layer ?? args.nm ?? this.#curTxtLayer;
			if (nmCur !== this.#curTxtLayer) this.#recPagebreak();
			this.#curTxtLayer = nmCur;
			// 本家（LayerMng.ts:958）と同じくsave:へも書く。しおりに含まれるので[load]で戻る
			this.#val.setNochk('save:const.sn.mesLayer', this.#curTxtLayer);
			return 'skip';
		}

		case 'add_face': {	// 差分名称の定義（本家 SpritesMng.add_face() 相当。dx/dyは親画像基準の相対座標）
			const faceName = args.name ?? '';
			if (! faceName) throw '[add_face] nameは必須です（試作仕様）';
			if (this.#hFace[faceName]) throw `[add_face] 同一のname（${faceName}）に対して複数の画像を割り当てられません`;
			this.#hFace[faceName] = {
				fn			: args.fn || faceName,		// fn省略時はnameをファイル名として使用（本家と同様）
				dx			: Number(args.dx || '0'),
				dy			: Number(args.dy || '0'),
				//	[lay]・[button]と同じ4種だけを受けてCSSの値へ直す（以前はCSSの値を素通ししていた）
				blendmode	: argBlendmode(args.blendmode || 'normal'),
			};
			return 'skip';
		}

		case 'lay': {		// 試作簡略：画像レイヤの絵（picまたはfn属性）変更、face属性による差分合成、及び文字レイヤ背景の不透明度（b_alpha）に対応
			const page = ScriptEngine.argPage(args, 'fore');	// 書き込み先のページ（本家 Pages.argChk_page(hArg, 'fore')）
			this.#applyLayPage(args, aAct, page);
			this.#applyLayOrder(args, aAct);
			return 'skip';
		}

		// ---- フィルター（本家 LayerMng.ts:836 #add_filter() 他） ----
		case 'add_filter':
			aAct.push({t: 'addFilter', aLayNm: ScriptEngine.#argLayNames(args.layer),
				page: ScriptEngine.#argPageBoth('add_filter', args, 'fore'),
				flt: bldFilter(args), replace: false});
			return 'skip';

		case 'clear_filter':
			aAct.push({t: 'clearFilter', aLayNm: ScriptEngine.#argLayNames(args.layer),
				page: ScriptEngine.#argPageBoth('clear_filter', args, 'fore')});
			return 'skip';

		case 'enable_filter':	// 何番目のフィルターを効かせるか（本家 LayerMng.ts:894 #enable_filter2()）
			aAct.push({t: 'enableFilter', aLayNm: ScriptEngine.#argLayNames(args.layer),
				page: ScriptEngine.#argPageBoth('enable_filter', args, 'fore'),
				index: ScriptEngine.#argNumDef('enable_filter', 'index', args.index, 0),
				enabled: (args.enabled ?? 'true') !== 'false'});
			return 'skip';

		case 'clear_lay': {	// レイヤ設定の消去（本家 LayerMng.ts:528 #clear_lay()）
			// pageの既定は本家同様'back'（LayerMng.ts:1100 の[button]と同じく、裏を組む用途が主なため）。
			//	page=bothで両面まとめて消せる（本家 LayerMng.ts:535）
			const sPage = args.page ?? 'back';
			if (sPage !== 'fore' && sPage !== 'back' && sPage !== 'both') throw `属性 page【${sPage}】が不正です`;
			// layerはカンマ区切りで複数可。省略時は全レイヤ（＝null）。
			//	エンジンはレイヤ一覧を持たないので、[trans]/[dump_lay]と同じくnullのまま渡して
			//	「全部」の解決はストア側に任せる
			const aLayNm = ScriptEngine.#argLayNames(args.layer);
			if (args.layer !== undefined && aLayNm === null) throw '[clear_lay] layer属性が空です';

			// エンジン側が持つ蓄積文字列も捨てる（本家 TxtLayer.clearLay() が中身を捨てるのと同じ）。
			//	chgStrは「そのレイヤの全文字列」を毎回送る作りなので、ここを消し忘れると
			//	ストアのstrを空にしても次の本文がその蓄積へ追記され、消したはずの文が復活する。
			//	sPageで指定された面だけ触る（表裏それぞれ独立した蓄積を持つため）
			if (sPage !== 'back') {
				// 履歴は既定文字レイヤの分だけ確定させる（消す対象に入っていれば）
				if (! aLayNm || aLayNm.includes(this.#curTxtLayer)) this.#recPagebreak();
				if (aLayNm) for (const nm of aLayNm) this.#hTxt[nm] = '';
				else for (const nm of Object.keys(this.#hTxt)) this.#hTxt[nm] = '';
			}
			if (sPage !== 'fore') {
				if (aLayNm) for (const nm of aLayNm) this.#hTxtBk[nm] = '';
				else for (const nm of Object.keys(this.#hTxtBk)) this.#hTxtBk[nm] = '';
			}

			aAct.push({t: 'clearLay', aLayNm, page: sPage});
			return 'skip';
		}

		case 'trans': {	// ページ裏表を交換（本家 LayerMng.ts:603 #trans()）
			// layer属性は交換するレイヤ名のカンマ区切り。省略時は全レイヤ（＝null）。
			//	指定外のレイヤは交換されず、画面上そのまま残る（本家の「transしないために交換する」相当）
			const sLay = args.layer ?? '';
			const aLayNm = sLay ? sLay.split(',').map(v=> v.trim()).filter(v=> v !== '') : null;
			if (aLayNm?.length === 0) throw '[trans] layer属性が空です';

			const time = Number(args.time ?? '0');
			if (! Number.isFinite(time) || time < 0) throw `[trans] timeの値が不正です：${args.time ?? ''}`;
			// ルール画像によるワイプ（本家はWebGLのフラグメントシェーダ、こちらはSVGフィルタ＋CSSマスク）。
			//	glsl=は自前シェーダの差し替えなので、WebGLを使わないこちらでは実現しようがない。
			//	黙って無視すると「指定したのに違う絵が出る」ので、フィルターと同じくその場で知らせる
			if (args.glsl !== undefined) throw '[trans] glsl=はサポートされません（WebGLシェーダを使わないため）';
			// 既読スキップ中は演出せず即座に交換する（本家 #trans() の `time === 0 || isSkipping`）
			aAct.push({t: 'trans', aLayNm, time: this.skipEnabled ? 0 : time,
				...args.rule !== undefined ? {rule: args.rule} : {},
				...args.vague !== undefined
					? {vague: ScriptEngine.#argNum('trans', 'vague', args.vague)} : {},
			});
			return 'skip';
			// [trans]自体は待たない（本家 #trans() も false を返す＝待ちに入らない）。
			//	演出の終了を待ちたい場合はスクリプト側で[wt]を書く
		}

		case 'wt': {	// [trans]の演出終了待ち（本家 CmnTween.ts:249 wt()）
			// canskipの既定はtrue＝クリックで飛ばせる。飛ばす際は必ず「演出の終了状態」へ進めるので、
			//	中途半端な見た目で止まることはない（本家 stopEndTrans() の stop().end() と同じ考え方）。
			//	実際に待つのはScriptMng（＝演出を動かすDOM側）の担当なので、step()はここで一旦返す
			aAct.push({t: 'waitTrans', canskip: (args.canskip ?? 'true') !== 'false'});
			return 'stop';
		}

		case 'finish_trans':	// [trans]の演出を今すぐ終わらせる（＝表裏の交換まで済ませる）
			// 本家のタグ本体は空（LayerMng.ts:102）で、実処理は「一部タグの直前に演出を畳む」
			//	共通処理（ScriptIterator.ts:504 #setTag2FinishTrans）が受け持つ。
			//	こちらはその共通処理をScriptMng側に持たせ、このタグはその引き金にした
			aAct.push({t: 'finishTrans'});
			return 'skip';

		case 'set_cancel_skip':	// スキップ中断予約
			// 本家も2023/05/27に廃止済みで中身は空（EventMng.ts:55）。
			//	上流シナリオに残っている記述を通すためだけに受ける
			return 'skip';

		// ---- 画面揺らし（本家 LayerMng.ts:754 #quake()） ----
		// 本家は[trans]と同じトゥイーン枠（TW_NM_TRANS）を使い回すので[wq]＝[wt]、
		//	[stop_quake]＝[finish_trans]だが、こちらの[trans]は表裏の交換を伴う別処理なので、
		//	同じ形の**別の**待ち行列にしてある（揺らしながらの[trans]が破綻しないという副産物つき）
		case 'quake': {
			// 既読スキップ中は揺らさない（本家も #hTag2SkipBypass で素通しする）。
			//	time=0も同じく何もしない（本家 `if (…time…=== 0) return false`）
			const msec = this.skipEnabled ? 0 : ScriptEngine.#argNum('quake', 'time', args.time ?? '');
			if (msec <= 0) return 'skip';

			aAct.push({t: 'quake', msec,
				hmax: uint(ScriptEngine.#argNumDef('quake', 'hmax', args.hmax, 10)),
				vmax: uint(ScriptEngine.#argNumDef('quake', 'vmax', args.vmax, 10)),
			});
			return 'skip';	// [quake]自体は待たない（本家も false を返す）。待ちたければ[wq]
		}

		case 'stop_quake':	// 揺れを即座に終わらせる
			aAct.push({t: 'stopQuake'});
			return 'skip';

		case 'wq':	// 揺れ終了待ち（[wt]と同じ形。実際に待つのはScriptMng）
			aAct.push({t: 'waitQuake', canskip: (args.canskip ?? 'true') !== 'false'});
			return 'stop';

		// ---- トゥイーンアニメ（本家 LayerMng.ts:798 #tsy()＋CmnTween.ts） ----
		// 本家は@tweenjs/tween.jsでpixiのDisplayObjectを直接動かすが、bluesnovelは
		//	motionでストアのレイヤ属性（T_LAY_STY）を動かす＝**必ずストアが現在値を持つ**形にした。
		//	見た目だけをDOMへ書くとMemento（読み戻し）や[trans]の複製が演出前の値を拾ってしまう。
		//	結果、本家のarrive属性（終了時に目標値を確実に入れる）は常時ONと同じ挙動になる
		case 'tsy': {
			const {layer} = args;
			if (! layer) throw '[tsy] layerは必須です';

			// 既読スキップ中は演出時間0＝即座に終了状態へ（本家 CmnTween.tween() の isSkipping 判定）
			const skip = this.skipEnabled;
			const msec = skip ? 0 : ScriptEngine.#argNum('tsy', 'time', args.time ?? '');
			const delay = skip ? 0 : ScriptEngine.#argNumDef('tsy', 'delay', args.delay, 0);
			// 本家は「repeat=1で計1回」なのでtween.jsへは repeat-1 を渡す。motionも同じ規約
			//	（0で1回だけ）だが、無限はmotionの流儀でInfinityとする（GSAP時代は-1だった）
			const rep = ScriptEngine.#argNumDef('tsy', 'repeat', args.repeat, 1);
			const page = ScriptEngine.argPage(args, 'fore');	// 本家は表ページ固定（pg.fore）だが、page指定も受ける
			// [tsy filter=…]は本家同様、トゥイーン開始と同時に一度だけフィルターを差し替える副作用
			//	（値自体をアニメーションさせるわけではない。[lay filter=]と同じ処理を流用する）
			if (args.filter !== undefined) {
				aAct.push({t: 'addFilter', aLayNm: [layer], page, flt: bldFilter(args), replace: true});
			}
			aAct.push({
				t: 'tsy', tw_nm: tsyName('tsy', args), nm: layer, page,
				msec, delay, ease: chkEase(args.ease),
				repeat: rep > 0 ? rep - 1 : Infinity, yoyo: (args.yoyo ?? 'false') !== 'false',
				hTo: cnvTweenArg('tsy', args),
				backlay: (args.backlay ?? 'false') !== 'false',
				...ScriptEngine.#argTsyPath('tsy', args),
			});
			return 'skip';	// [tsy]自体は待たない（本家も false を返す）。待ちたければ[wait_tsy]
		}

		case 'tsy_frame': {	// HTMLフレームのトゥイーン（本家 FrameMng.ts:373 #tsy_frame()）
			const {id} = args;
			if (! id) throw '[tsy_frame] idは必須です';
			this.#chkFrm('tsy_frame', id);

			const skip = this.skipEnabled;
			const rep = ScriptEngine.#argNumDef('tsy_frame', 'repeat', args.repeat, 1);
			aAct.push({
				t: 'tsyFrame', tw_nm: tsyName('tsy_frame', args), id,
				msec: skip ? 0 : ScriptEngine.#argNum('tsy_frame', 'time', args.time ?? ''),
				delay: skip ? 0 : ScriptEngine.#argNumDef('tsy_frame', 'delay', args.delay, 0),
				ease: chkEase(args.ease),
				repeat: rep > 0 ? rep - 1 : Infinity, yoyo: (args.yoyo ?? 'false') !== 'false',
				// フレームはx/y/rotateが実名（レイヤのleft/top/rotationに当たる）ので属性表を分ける
				hTo: cnvTweenArg('tsy_frame', args, A_TSY_FRM_PRP),
				...ScriptEngine.#argTsyPath('tsy_frame', args, A_TSY_FRM_PRP),
			});
			return 'skip';	// [tsy]同様それ自体は待たない。待つなら[wait_tsy id=…]
		}

		case 'wait_tsy':	// トゥイーン終了待ち（本家 CmnTween.ts:265 wait_tsy()）
			// [wt]と同じ形。動いているトゥイーンが無ければ待たずに済ませるのもScriptMng側で本家同様
			aAct.push({t: 'waitTsy', tw_nm: tsyName('wait_tsy', args), canskip: (args.canskip ?? 'true') !== 'false'});
			return 'stop';

		case 'stop_tsy':	// トゥイーン中断（本家 CmnTween.ts:284。stop()とend()は別＝終了状態へ送ってから止める）
			aAct.push({t: 'stopTsy', tw_nm: tsyName('stop_tsy', args)});
			return 'skip';

		case 'pause_tsy':	// 一時停止（本家 CmnTween.ts:291）
			aAct.push({t: 'pauseTsy', tw_nm: tsyName('pause_tsy', args), paused: true});
			return 'skip';

		case 'resume_tsy':	// 一時停止再開（本家 CmnTween.ts:298）
			aAct.push({t: 'pauseTsy', tw_nm: tsyName('resume_tsy', args), paused: false});
			return 'skip';

		case 'let':		// 変数代入（本家 Variable.ts:313 #let()）
			// 書式はtext属性＝「値そのもの」。式にしたい場合は text=&式 と書く
			//	（＝共通の属性前処理#resolveTag()が評価する）
			if (args.text === undefined) {
				// 値が渡っていない。**「text=&式」の評価がundefinedになって属性ごと落ちた**
				//	場合もここに来るので、式の書き間違いを空文字の代入で握りつぶさず知らせる
				//	（本家はtext省略を許すが、こちらは属性が落ちる仕組みがあるぶん実害が大きい）
				throw `[let] textは必須です（name:${args.name ?? ''}）`;
			}
			this.#letText('let', args, args.text);
			return 'skip';

		// ---- 文字列・数値操作タグ（本家 Variable.ts:347-432 を移植） ----
		// どれも「text属性を加工して、[let]と同じ規則でname変数へ代入する」形。
		//	本家は加工結果をhArg.textへ書き戻してから#let()を呼ぶが、
		//	ここは代入部分を#letText()へ切り出し、加工結果の文字列を直接渡している。
		//	textの中身を式にしたい場合は共通の属性前処理まかせ（text=&式）なので、
		//	個々のタグは評価済みの文字列だけを見ればよい
		case 'let_abs': {		// 絶対値（本家 Variable.ts:347）
			// Math.abs()を使わないのは本家に合わせたもの
			//	（数値以外を渡した時にbooleanが0/1になる等、紛れの元になるため）
			const n = ScriptEngine.#argNumDef('let_abs', 'text', args.text, 0);
			this.#letText('let_abs', args, String(n < 0 ? -n : n));
			return 'skip';
		}

		case 'let_round': {		// 四捨五入（本家 Variable.ts:401）
			const n = ScriptEngine.#argNumDef('let_round', 'text', args.text, 0);
			this.#letText('let_round', args, String(Math.round(n)));
			return 'skip';
		}

		case 'let_length':		// 文字列の長さ（本家 Variable.ts:379）
			this.#letText('let_length', args, String((args.text ?? '').length));
			return 'skip';

		case 'let_char_at': {	// 文字列から一字取りだし（本家 Variable.ts:359）
			const pos = ScriptEngine.#argNumDef('let_char_at', 'pos', args.pos, 0);
			this.#letText('let_char_at', args, (args.text ?? '').charAt(pos));
			return 'skip';
		}

		case 'let_index_of': {	// 文字列で検索（本家 Variable.ts:367）
			const {val} = args;
			if (! val) throw '[let_index_of] valは必須です';
			const start = ScriptEngine.#argNumDef('let_index_of', 'start', args.start, 0);
			this.#letText('let_index_of', args, String((args.text ?? '').indexOf(val, start)));
			return 'skip';
		}

		case 'let_substr': {	// 文字列から抜きだし（本家 Variable.ts:424）
			// len='all'でposから末尾まで。posが負なら末尾から数える（String.slice()そのまま）
			const pos = ScriptEngine.#argNumDef('let_substr', 'pos', args.pos, 0);
			const s = args.text ?? '';
			this.#letText('let_substr', args, args.len === 'all'
				? s.slice(pos)
				: s.slice(pos, pos + int(ScriptEngine.#argNumDef('let_substr', 'len', args.len, 1))));
			return 'skip';
		}

		case 'let_replace':		// 正規表現で置換（本家 Variable.ts:387）
			// val省略時が文字列'undefined'での置換になるのは本家そのまま（String(hArg.val)）。
			//	消したい場合は本家シナリオ同様 val='' と明示する
			this.#letText('let_replace', args, (args.text ?? '')
				.replace(ScriptEngine.#argReg('let_replace', args), String(args.val)));
			return 'skip';

		case 'let_search':		// 正規表現で検索（本家 Variable.ts:410）
			this.#letText('let_search', args, String((args.text ?? '')
				.search(ScriptEngine.#argReg('let_search', args))));
			return 'skip';

		case 'let_ml': {	// インラインテキスト代入（本家 ScriptIterator.ts:718 #let_ml()）
			// Grammarが「[let_ml …]」と「その本文」を別トークンに割ってくれているので、
			//	次のトークンをそのまま（式評価も改行の解釈もせず）変数へ入れるだけでよい。
			//	用途はシェーダーのソースやJSONの埋め込みなど「そのままの複数行テキスト」
			const varName = args.name ?? '';
			if (! varName) throw '[let_ml] nameは必須です';

			let ml = '';
			for (; this.#idx < len; ++this.#idx) {	// 空トークンは読み飛ばす（本家踏襲）
				ml = this.#script.aToken[this.#idx]!;
				if (ml !== '') break;
			}
			if (this.#script.grm.testTagEndLetml(ml)) {	// 本文が空（[let_ml …][endlet_ml]）
				//	この場合Grammarのlet_mlルール（本文が1文字以上必要）にマッチせず、
				//	[let_ml …]は普通のタグトークンになるため、次は[endlet_ml]そのもの
				this.#val.set(varName, '', 'str');
				++this.#idx;
				return 'skip';
			}
			if (! this.#script.grm.testTagEndLetml(this.#script.aToken[this.#idx +1] ?? '')) {
				throw `[let_ml] 変数【${varName}】の終端・[endlet_ml]がありません`;
			}
			// 本家同様 cast='str'（数値だけの本文でも文字列のまま保持する）
			this.#val.set(varName, ml, 'str');
			this.#idx += 2;	// 本文 → [endlet_ml] → その次
			return 'skip';
		}
		case 'endlet_ml':	// [let_ml]が本文ごと読み飛ばすので通常は到達しない。
			// 本家も no-op（ScriptIterator.ts:76。[if]ブロック内で未定義タグ扱いにしないため）
			return 'skip';

		case 'if':	// ifブロック開始（本家 ScriptIterator.ts:886 #if() のアルゴリズムを移植）
			this.#if(args);
			return 'skip';

		// elsif/else/endifは「選ばれた分岐の実行が終わってこれらに辿り着いた」場合の処理で、
		// 3つとも全く同じ（本家 ScriptIterator.ts:84-86 hTag.else=hTag.elsif=hTag.endif=#endif() と同じ規約）
		case 'elsif': case 'else': case 'endif':
			this.#endif();
			return 'skip';

		case 'r': {		// 改行（本家 LayerMng.ts:1037 #r(hArg) => #ch({...hArg, text:'\n'})）
			const {nm, page} = this.#txtTarget(args);
			this.#appendTxt(aAct, '\n', true, nm, page);
			return 'skip';
		}
		case 'er':		// ページ両面の文字消去（試作簡略：現在レイヤのみ）
			//	タグ名のとおり表裏どちらの文字も消す（本家 LayerMng.ts hTag.er「ページ両面の文字消去」）。
			//	これが片面だけだと、[trans]で裏が表に出たときに前の場面の文字が蘇る
			// 履歴は消さずに1ページとして確定させる。rec_page_break=falseで抑えられる
			//	（本家 LayerMng.ts:1006。既定true）
			if ((args.rec_page_break ?? 'true') !== 'false') this.#recPagebreak();
			this.#hTxt[this.#curTxtLayer] = '';
			this.#hTxtBk[this.#curTxtLayer] = '';
			aAct.push({t: 'chgStr', nm: this.#curTxtLayer, page: 'both', str: ''});
			// **ボタンを消し、変形まわりの属性を既定へ戻す**。本家の[er]は
			//	TxtLayer.clearLay()（TxtLayer.ts:857）を表裏に呼び、本文とボタンを捨てたうえで
			//	Layer.clearLay()（:420）が alpha/blendmode/pivot/角度/拡縮 を初期値へ戻す。
			//	ボタンを消さないと、テンプレでタイトル画面のボタンが本編に入っても残り続ける
			//	（[grp]の場面転換は[er]しか打たないため）。
			//	フィルターは clear_filter=true のときだけ落とす（本家の既定はfalse）
			aAct.push({t: 'clearTxtLay', nm: this.#curTxtLayer, page: 'both',
				clearFilter: args.clear_filter === 'true'});
			return 'skip';

		// ===== 文字装飾（本家 LayerMng.ts:124-141 hTag.ch/span/ruby2） =====
		//	本家はこれらを**本文ストリームに埋め込む命令**として流す（LayerMng.ts:315
		//	`#cmdTxt = cmd=> tl.tagCh('｜&emsp;《'+ cmd +'》')`）。ルビ記法の親文字＋ルビの形を
		//	借りて、ルビ側にURIエンコードしたJSONを載せる仕組みで、RubySpliterがそのまま
		//	1単位として通してくれる。ここでも同じ形で#hTxtへ積み、解釈はTxt.ts splitCh()が行う
		//	（エンジンは相変わらず「文字列を貯める」だけで済み、chgStrの形も変わらない）
		case 'span': {	// インラインスタイル設定（本家 LayerMng.ts:1053 #span()）
			//	属性なしの[span]は指定の解除（本家 #mergePushSpan の「どちらも指定されてなければクリア」）
			const {nm, page} = this.#txtTarget(args);
			this.#appendTxt(aAct, ScriptEngine.#cmdTxt('span', {...args, layer: undefined, page: undefined}), true, nm, page);
			return 'skip';
		}

		case 'link': {	// ハイパーリンク開始（本家 LayerMng.ts:1024 #link()）
			//	url指定時はラベルへ飛ばずURLを開く（本家も「指定時は fn・label を無視する」）
			if (! args.url && ! args.label && ! args.fn) throw '[link] fn・label・urlのいずれかは必須です';
			// 効果音（本家 EventMng.ts:465-491。[button]と同じ形——ext_voice.snのvoice系マクロも
			//	[link]をラップしているのでここへ相乗りする）。bufの既定'SYS'は[playse]自体の既定'SE'
			//	とは別のボタン・リンク共通の既定値なので、属性の既定値は1箇所ルールに従いここで確定する
			//	（Txt.ts/TxtLayer.tsxではフォールバックしない）
			if (args.clickse !== undefined) args.clicksebuf = args.clicksebuf || 'SYS';
			if (args.enterse !== undefined) args.entersebuf = args.entersebuf || 'SYS';
			if (args.leavese !== undefined) args.leavesebuf = args.leavesebuf || 'SYS';
			// リンクだと分かる既定の赤背景（本家 LayerMng.ts:1029-1031）。styleは属性の既定値は
			//	1箇所ルールにより必ずここで確定させる（Txt.ts/TxtLayer.tsxではフォールバックしない）
			args.style ??= 'background-color: rgba(255,0,0,0.5);';
			args.style_hover ??= 'background-color: rgba(255,0,0,0.9);';
			args.style_clicked ??= args.style;
			const {nm, page} = this.#txtTarget(args);
			this.#appendTxt(aAct, ScriptEngine.#cmdTxt('link', {...args, layer: undefined, page: undefined}), true, nm, page);
			return 'skip';
		}

		case 'endlink': {	// ハイパーリンク終了（本家 LayerMng.ts:1002 #endlink()）
			const {nm, page} = this.#txtTarget(args);
			this.#appendTxt(aAct, ScriptEngine.#cmdTxt('endlink', {}), true, nm, page);
			return 'skip';
		}

		case 'graph': {	// 本文中のインライン画像（本家 LayerMng.ts:1015 #graph()）。アニメpngも置ける
			if (! args.pic) throw '[graph] picは必須です';
			const {nm, page} = this.#txtTarget(args);
			this.#appendTxt(aAct, ScriptEngine.#cmdTxt('grp', {...args, layer: undefined, page: undefined}), true, nm, page);
			return 'skip';
		}

		case 'tcy': {	// 縦中横（本家 LayerMng.ts:1059 #tcy()）
			if (! args.t) throw '[tcy] tは必須です';
			const {nm, page} = this.#txtTarget(args);
			this.#appendTxt(aAct, ScriptEngine.#cmdTxt('tcy', {...args, layer: undefined, page: undefined}), true, nm, page);
			return 'skip';
		}

		case 'ruby2':	// 文字列と複数ルビの追加（本家 LayerMng.ts:1040 #ruby2()）
		case 'ch': {	// 文字を追加する（本家 LayerMng.ts:906 #ch()）
			if (name === 'ruby2') {
				// 本家と同じく[ch]の形へ書き換えてから同じ処理へ流す（本家 #ruby2() は最後に #ch() を呼ぶ）。
				//	t/rをURIエンコードするのは、中に`《`や空白があってもルビ記法として壊れないため
				//	（RubySpliterが復号する。空白はルビの区切り指定として解釈されてしまう）
				if (! args.t) throw '[ruby2] tは必須です';
				if (! args.r) throw '[ruby2] rは必須です';
				args.text = `｜${encodeURIComponent(args.t)}《${encodeURIComponent(args.r)}》`;
				delete args.t;
				delete args.r;
			}
			const {text} = args;
			if (! text) throw `[${name}] textは必須です`;

			// style/r_styleは**このtextの間だけ**効く（本家は add｜…／add_close｜ で挟む）。
			//	[r]を改行にするのは本家 LayerMng.ts:922（[ch text=…]に改行を含める書き方）
			const {nm, page} = this.#txtTarget(args);
			this.#appendTxt(aAct, ScriptEngine.#cmdTxt('add', {...args, text: undefined, layer: undefined, page: undefined})
				+ text.replaceAll('[r]', '\n')
				+ ScriptEngine.#cmdTxt('add_close', {}),
				args.record !== 'false', nm, page);	// record=falseなら履歴に残さない（本家 LayerMng.ts:920）
			return 'skip';
		}

		// ---- 文字ごとのウェイト（本家 TxtLayer.ts:210 #autowc()）----
		case 'autowc': {
			// 「この文字の後だけ長く待つ」表。`text`の1文字目に`time`の1つ目…と対応させる。
			//	本家と同じく**enabledは省略時に現在値を保つ**（表だけ差し替える書き方ができる）
			const ena = args.enabled === undefined
				? this.#val.get('game:const.sn.autowc.enabled') === true
				: args.enabled !== 'false';
			this.#val.setNochk('save:const.sn.autowc.enabled', ena);

			const {text} = args;
			if (('text' in args) !== ('time' in args)) throw '[autowc] textとtimeは同時指定必須です';
			this.#val.setNochk('save:const.sn.autowc.text', text ?? '');
			if (! text) {	// 表を空にするだけ（enabledは上で反映済み）
				this.#val.setNochk('save:const.sn.autowc.time', '');
				aAct.push({t: 'autowc', enabled: ena, hWait: {}});
				return 'skip';
			}

			const aCh = Array.from(text);	// サロゲートペアを1文字として数える
			const aTm = String(args.time ?? '').split(',');
			if (aTm.length !== aCh.length) throw '[autowc] text文字数とtimeに記述された待ち時間（コンマ区切り）は同数にして下さい';

			const hWait: {[ch: string]: number} = {};
			aCh.forEach((c, i)=> {hWait[c] = uint(ScriptEngine.#argNum('autowc', 'time', aTm[i] ?? ''))});
			this.#val.setNochk('save:const.sn.autowc.time', args.time ?? '');
			aAct.push({t: 'autowc', enabled: ena, hWait});
			return 'skip';
		}

		// ---- 文字出現・消去演出（本家 TxtStage.ts:610/643）----
		case 'ch_in_style':
		case 'ch_out_style': {
			const kind = name === 'ch_in_style' ?'in' :'out';
			// joinの既定は出現true／消去false（本家 TxtStage.ts:632/665）
			const {name: nmSty, sty} = parseChStyle(name, args, kind === 'in');
			if (this.#hChStyleNm[kind].has(nmSty)) throw `[${name}] name【${nmSty}】はすでにあります`;
			this.#hChStyleNm[kind].add(nmSty);

			aAct.push({t: 'defChStyle', kind, nm: nmSty, sty});
			return 'skip';
		}

		// ---- 本文履歴（本家 Log.ts）----
		case 'rec_ch': {	// 履歴書き込み（画面には出さない）
			// 本家は`display: none;`を付けた[ch]として流し、履歴側でだけ見せる。
			//	こちらは履歴の蓄積が表示と別物なので、履歴にだけ積めば済む。
			const {text, ...rest} = args;

			// style/r_styleは[ch]と同じ「本文ストリームに埋め込む命令」（#cmdTxt）経由で流し、
			//	htmlOf()のsplitCh解釈にそのまま乗せる。text以外の属性は、本家同様ページ単位の
			//	任意メタデータとしてconst.sn.log.jsonへそのまま載る（本家 Log.ts:67
			//	`#LastLog = {...hArg, text}`。フレーム側JSが読む想定）。
			//	**textが無くても属性だけは必ず反映する**（本家 Log.ts:66-67は`text`の有無に
			//	関わらず`#LastLog = {...hArg, ...}`を先に行い、69行目のreturnはその後）。
			//	以前はtext省略時に丸ごと無視しており、sn_galleryのlog_and_playで
			//	`[rec_ch name=… col=… v=…]`（textを持たない、名前表示専用の呼び出し）の
			//	属性が履歴へ載らず「人」列がundefinedになる不具合があった
			if (Object.keys(rest).length) this.#log.setAttr(rest);
			if (! text) return 'skip';	// textが無ければ本文追記はしない（本家 Log.ts:68も同じ）

			this.#log.add(ScriptEngine.#cmdTxt('add', {...args, text: undefined})
				+ text.replaceAll('[r]', '\n')
				+ ScriptEngine.#cmdTxt('add_close', {}));
			return 'skip';
		}
		case 'rec_r':		// 履歴改行（本家 Log.ts:83 は [rec_ch text='[r]'] と同義）
			this.#log.add('\n');
			return 'skip';
		case 'reset_rec':	// 履歴リセット。textで置き換え値を設定できる（本家 Log.ts:90）
			this.#log.reset(args.text ?? '');
			return 'skip';

		case 'trace':	// デバッグ表示へ出力（実処理はScriptMng.ts #trace()。textが未指定でも空文字で積む）
			// 「text=&式」の評価は#resolveTag()が全タグ共通で済ませているので、ここでは受け取るだけ
			aAct.push({t: 'trace', text: args.text ?? ''});
			return 'skip';

		case 'log':	// downloads/log.txtへの追記（実処理はScriptMng.ts #log()。履歴＝Log.ts/[rec_ch]とは別物）
			aAct.push({t: 'log', text: args.text ?? '', fn: this.fn, lineNum: this.lineNum});
			return 'skip';

		case 'jump': {	// シナリオジャンプ（本家 ScriptIterator.ts:1039 #jumpWork() 相当）
			// count=falseなら、この位置を未読へ戻す（本家 #jump() は既定true＝既読のまま）
			if (args.count === 'false') this.#eraseKidoku();
			const label = args.label ?? '';
			const fn = args.fn ?? '';
			if (! label && ! fn) throw '[jump] fnまたはlabelは必須です';
			if (fn && fn !== this.fn) {	// 別ファイルへ：ロードはScriptMngの責務なのでここで一旦返る
				aAct.push({t: 'loadScript', fn, label, idx: 0});
				return 'stop';
			}

			const to = this.#script.label2idx(label, this.#idx, this.#isInMacro());
			if (to === undefined) throw `[jump] ラベル【${label}】がスクリプト【${this.fn}】に見つかりません`;
			this.#idx = to;
			return 'skip';
		}

		case 'call': {	// サブルーチンコール（本家 ScriptIterator.ts:951 #call() 参照）
			// [jump]と既定が逆で、count=trueと明示しない限りこの位置を未読へ戻す（本家 #call()）。
			//	同じサブルーチンを何度も呼ぶ書き方が普通なので、コール位置は既読に数えない
			if (args.count !== 'true') this.#eraseKidoku();
			const label = args.label ?? '';
			const fn = args.fn ?? '';
			if (! label && ! fn) throw '[call] fnまたはlabelは必須です';
			// this.#idxは既に[call ...]の次のトークンを指している（#doReturn()で戻る先）。
			// hMp：呼び出し時点のmp:値を保存（本家 #callSub() は[call]/マクロ呼び出し共通でこれを行う。
			// 通常の[call]ではmp:を変更しないため実質no-opの保存・復元だが、
			// サブルーチン内でmp:へ直接代入した場合に呼び出し元へ影響しないようにする効果がある）
			// hArgs：[call]の属性もマクロ同様に積む。サブルーチン側から「%属性名」で引ける
			//	（本家 #callSub({...hArg}) がcsArgへそのまま入れるのと同じ）
			if (fn && fn !== this.fn) {	// 別ファイルのサブルーチンを呼ぶ
				this.#pushCallStk(this.#idx, true, args);
				aAct.push({t: 'loadScript', fn, label, idx: 0});
				return 'stop';
			}

			const to = this.#script.label2idx(label, this.#idx, this.#isInMacro());
			if (to === undefined) throw `[call] ラベル【${label}】がスクリプト【${this.fn}】に見つかりません`;
			this.#pushCallStk(this.#idx, true, args);	// 飛び先が確定してから積む（例外時にスタックを汚さない）
			this.#idx = to;
			return 'skip';
		}

		case 'return':	// サブルーチンから戻る（fn/label指定で戻り先を変えられる）
			return this.#doReturn(aAct, args);

		case 'macro': {	// マクロ定義の開始（本家 ScriptIterator.ts:1363 #macro() と同じ「実行時定義」方式）
			const macroName = args.name ?? '';
			if (! macroName) throw '[macro] nameは必須です（試作仕様）';
			if (ScriptEngine.RESERVED_TAGS.has(macroName)) throw `[${macroName}]はタグ名のため、マクロ名として使用できません`;
			if (ScriptEngine.REG_NG4MAC_NM.test(macroName)) throw `[${macroName}]はマクロ名として異常です`;
			if (macroName in this.#hMacro) throw `[macro] マクロ【${macroName}】は既に定義済みです`;
			// 本体開始位置（[macro ...]の次のトークン。呼び出し時のジャンプ先）。
			//	別ファイルから呼ばれてもよいよう、定義元のスクリプト名も覚えておく
			this.#hMacro[macroName] = {fn: this.fn, idx: this.#idx};

			// [endmacro]まで読み飛ばす（本家同様、マクロ本体は定義時には実行しない）。
			//	本家は最初に見つけた[endmacro]で終端とみなす（＝入れ子の[macro]定義は壊れる）が、
			//	ここでは深度を数えて入れ子の定義も書けるようにした。
			//	また[let_ml]の本文は「ただのテキスト」なので、中に[endmacro]と読める行があっても反応しない
			let found = false;
			let depth = 0;
			let inLetMl = false;
			for (; this.#idx < len; ++this.#idx) {
				const tkn2 = this.#script.aToken[this.#idx]!;
				if (inLetMl) {
					if (this.#script.grm.testTagEndLetml(tkn2)) inLetMl = false;
					continue;
				}
				if (tkn2.charCodeAt(0) !== 91) continue;	// [ タグ開始以外は読み飛ばす
				if (this.#script.grm.testTagLetml(tkn2)) {inLetMl = true; continue}

				const {name: nm2} = ScriptEngine.parseTag(tkn2);
				if (nm2 === 'macro') {++depth; continue}
				if (nm2 !== 'endmacro') continue;
				if (depth > 0) {--depth; continue}
				++this.#idx; found = true; break;
			}
			if (! found) throw `[macro] マクロ【${macroName}】が[endmacro]で閉じられていません（試作仕様）`;
			return 'skip';
		}

		case 'char2macro':		// 一文字マクロの定義（本家 ScriptIterator.ts:1354 #char2macro()）
		case 'bracket2macro':	// 括弧マクロの定義（本家 ScriptIterator.ts:1347 #bracket2macro()）
			// 「♡」→[ハート]、「〔梨香〕」→[セリフ text='梨香'] のように、地の文の中の
			//	一文字／括弧をタグ・マクロ呼び出しへ読み替える定義。実処理はGrammar側にある。
			//	this.#idxは既に定義タグの次のトークンを指しており、そこから後ろだけが置換される
			//	（＝定義より前に書いた文字はただの地の文のまま。本家と同じ）
			this.#script.defC2M(name, args, this.#hTagNames(), this.#idx);
			return 'skip';

		case 'endmacro':	// マクロ本体の終端。[return]と全く同じ処理
			// （本家 ScriptIterator.ts:100 hTag.endmacro = ()=> this.#return(o) と同じ規約）
			return this.#doReturn(aAct);

		case 'button': {	// ボタン表示（試作簡略：layer/nm/text/label/callに対応）
			// クリック後のjump先はjumpToLabel()で別途処理する（読み進め扱いにはしないため）
			// layer: ボタンを乗せる「UIコンテナ」＝既存の文字レイヤのnm（省略時は現在の文字レイヤ）
			const layerNm = args.layer || this.#curTxtLayer;
			if (! layerNm) throw '[button] layerは必須です（試作仕様）';
			const label = args.label ?? '';
			// fn指定時は別スクリプトのラベルへ飛ぶ（label省略ならそのファイルの先頭）。
			//	本家 LayerMng.ts:1101 hArg.fn ??= this.scrItr.scriptFn と同じく、
			//	fn省略時は常にカレントスクリプトを既定にする。**label・fnとも省略時**は
			//	クリック先を持たない「画像表示専用ボタン」（[button pic=... enabled=false]。
			//	ch_gallery/ch_button の非ボタン用途）として許容する
			const fn = args.fn ?? this.fn;
			// 画像ボタン（本家 Button.ts:104）。**picがあれば文字は出さない**（本家も
			//	pic側の分岐で早期returnし、文字の組み立てへ進まない）
			const {pic} = args;
			if (! pic && ! args.text) throw '[button] textまたはpic属性は必須です';	// 本家と同じ文言
			// nm: ボタン自身の識別名（同一layer内で一意）。**省略時はストア側で通し番号を振る**。
			//	本家にボタン名の概念は無く、ここのnmはReactのkeyのためだけの物なので、
			//	labelを流用すると同じ飛び先のボタンを並べられない（テンプレの[sys_menu]がまさにそれ）
			const nm = args.nm;
			// call=true指定時：クリックでjumpではなくcall（サブルーチンコール）する
			const call = args.call === 'true';
			// 書き込み先のページ。**既定は本家（LayerMng.ts:1100 argChk_page(hArg,'back')）と同じ'back'**。
			//	本家のシナリオは「裏ページを組んでから[trans]で見せる」流儀（本家サンプルの title.sn が
			//	まさにこれ：mesを裏で組み[trans]で表へ）。以前は[trans]を挟まない試作シナリオに合わせ'fore'に
			//	していたが、実テンプレ tmp_blues のタイトルを通すため本家へ揃えた。
			//	[trans]を挟まずにその場で見せたいボタンは page=fore と明示する（E2Eフィクスチャはそうしている）
			const page = ScriptEngine.argPage(args, 'back');

			// 配置・寸法・変形（本家 Button.ts のコンストラクタ）。**書かれた属性だけ**を拾う。
			//	本家は left/top を必ず持たせる（省略時0）が、こちらは未指定なら流し込み配置のまま。
			//	試作のシナリオは複数ボタンを座標指定なしで並べており、既定を(0,0)にすると全部重なるため
			const sty: T_BTN_STY = {};
			// 横位置：left / center / right / s_right の排他（本家 Layer.ts:513-532。実際は未配線の
			//	デッドコードだったが仕様として掘り起こした）。center・rightは表示物の実寸をエンジンが
			//	知らないため、寄せの種類だけを渡してCSSのtranslateで表現する（[lay]と同じ → Lay.ts styLay()）
			if (args.left !== undefined) sty.left = this.#argPos('button', 'left', args.left);
			else if (args.center !== undefined) {
				sty.left = this.#argPos('button', 'left', args.center);
				sty.align_x = 'center';
			}
			else if (args.right !== undefined) {
				sty.left = this.#argPos('button', 'left', args.right);
				sty.align_x = 'right';
			}
			else if (args.s_right !== undefined) sty.s_right = this.#argPos('button', 'left', args.s_right);
			// 縦位置も同じ並び（top / middle / bottom / s_bottom）
			if (args.top !== undefined) sty.top = this.#argPos('button', 'top', args.top);
			else if (args.middle !== undefined) {
				sty.top = this.#argPos('button', 'top', args.middle);
				sty.align_y = 'middle';
			}
			else if (args.bottom !== undefined) {
				sty.top = this.#argPos('button', 'top', args.bottom);
				sty.align_y = 'bottom';
			}
			else if (args.s_bottom !== undefined) sty.s_bottom = this.#argPos('button', 'top', args.s_bottom);
			for (const k of ScriptEngine.#A_BTN_NUM) {
				const v = args[k];
				if (v === undefined) continue;
				Object.assign(sty, {[k]: ScriptEngine.#argNum('button', k, v)});
			}
			// **寸法だけは省略時も既定値を入れる**（本家 Button.ts:123 height=30 / :152 width=100）。
			//	本家のpixi Textは width/height の代入で文字スプライトそのものを拡縮するので、
			//	文字数に関わらず必ずこの大きさに揃う。CSSの既定（文字なりの幅）とは食い違うため、
			//	ここで埋めないとテンプレのシステムメニュー（width/height省略）が隣と重なる。
			//	他の配置・変形属性を埋めないのは、下流のCSSが本家と同じ既定を持っているから
			//	（left/top=0・rotation=0・scale=1・alpha=1）。ボタンにはその受け皿が無い。
			//	本家も #o へ確定値を記録する（dump・セーブに乗る）ので、ストアにも実寸で載せる
			//	**画像ボタン（pic）・背景画像ボタン（b_pic）は別**：本家も pic 側の分岐では埋めず、
			//	絵の実寸（pic は横3コマ分の1/3）をそのまま箱の大きさにする（Button.ts:280）。
			//	b_picも同様——本家はテキストのcontainerへ絵をSpriteとして足す（#loaded_b_pic）ため、
			//	絵がテキストより大きければcontainerのwidth/height（#o.width/height）は絵の実寸へ
			//	広がる（Button.ts:174-176）。ここでwidth/heightを埋めてしまうとBtnLayerが持つ
			//	「読み込み後に絵の実寸で測る」ロジック（btnBoxSize）がo.widthの?? に阻まれて働かず、
			//	b_pic枠が100x30に切り詰められて縁が見えなくなる（sn_gallery ch_button で発覚）。
			//	実寸を知れるのはDOM側だけなのでBtnLayerが読み込み後に測る
			if (! pic && ! args.b_pic) {
				sty.width ??= BTN_DEF_W;
				sty.height ??= BTN_DEF_H;
			}
			if (args.enabled !== undefined) sty.enabled = args.enabled !== 'false';
			if (args.blendmode !== undefined) sty.blendmode = argBlendmode(args.blendmode);
			// ツールチップ（本家 EventMng.ts:418 #dispHint()）。hint_styleは吹き出しのCSS、
			//	hint_optは本家popperのオプションJSON（こちらはplacementだけ見る）
			// 見た目（bluesnovelはCSSで指定する。本家はpixiのTextStyle JSON）。
			//	通常・ホバー／フォーカス中・押下中の3状態
			if (args.style !== undefined) sty.style = ScriptEngine.#argBtnStyle(args.style);
			if (args.style_hover !== undefined) sty.style_hover = ScriptEngine.#argBtnStyle(args.style_hover);
			if (args.style_clicked !== undefined) sty.style_clicked = ScriptEngine.#argBtnStyle(args.style_clicked);
			if (args.hint !== undefined) sty.hint = args.hint;
			if (args.hint_style !== undefined) sty.hint_style = args.hint_style;
			if (args.hint_opt !== undefined) sty.hint_opt = args.hint_opt;
			// 画像は論理名のまま積む。解決済みURLを入れるのはScriptMng（[lay fn=]と同じ）
			if (pic !== undefined) sty.pic = pic;
			if (args.b_pic !== undefined) sty.b_pic = args.b_pic;

			// 効果音（本家 EventMng.ts:465-491）。パス解決は押される/乗る/外れるかどうか分からない
			//	時点で先読みしても仕方ないので、鳴らす瞬間にScriptMng側で行う（論理名のまま積む）。
			//	bufの既定'SYS'は[playse]自体の既定'SE'とは別の、ボタン専用の既定値なのでここで確定する
			//	（属性の既定値は1箇所というルールに従い、BtnLayer側ではフォールバックしない）
			if (args.clickse !== undefined) {sty.clickse = args.clickse; sty.clicksebuf = args.clicksebuf || 'SYS'}
			if (args.enterse !== undefined) {sty.enterse = args.enterse; sty.entersebuf = args.entersebuf || 'SYS'}
			if (args.leavese !== undefined) {sty.leavese = args.leavese; sty.leavesebuf = args.leavesebuf || 'SYS'}

			aAct.push({t: 'addBtn', layerNm, page, text: pic ?'' :args.text ?? '', label, call,
				...(nm === undefined ? {} : {nm}),
				...(fn ? {fn} : {}),
				// arg：クリック時に&sn.eventArgとして受け取れる（本家 Main.ts:174、[event]/[link]と同じ仕組み）
				...(args.arg === undefined ? {} : {arg: args.arg}),
				...(Object.keys(sty).length > 0 ? {sty} : {})});
			return 'skip';
		}

		case 'page': {	// ページ移動（本家 Reading.ts:343 page()）
			// 本家の[page]は「裏表（レイヤページ）」ではなく**読み戻り用のページログ**を操作するタグ。
			//	CLAUDE.md「『ページ』が2つの別物を指す」の後者
			if (! ('clear' in args || 'to' in args || 'style' in args)) throw '[page] clear,style,to いずれかは必須です';

			// key=は移動中に効くイベントキーの限定。単独では何もしないので他と同時指定できる
			//	（本家も style/clear/to の判定より前に見る）
			if (args.key !== undefined) aAct.push({t: 'pageKeys', aKey: args.key ? args.key.split(',') : []});
			// style=・clear=は本家も「指定されていたらそれだけやって戻る」（to=とは同時に効かない）
			if (args.style !== undefined) {aAct.push({t: 'pageStyle', style: args.style}); return 'skip'}
			if (args.clear === 'true') {aAct.push({t: 'clearPageLog'}); return 'skip'}
			if (args.to === undefined) return 'skip';

			const to = args.to as T_PAGE_TO;
			if (! A_PAGE_TO.includes(to)) throw `[page] 属性to「${args.to}」は異常です`;

			aAct.push({t: 'pageTo', to});
			// **ここで停止する**。移動先のページは「しおりを戻してその位置から演じ直す」ので、
			//	スクリプトのfetchが要る＝ScriptMng待ち（本家 loadFromMark() も同じ）。
			//	演じ直しはコールスタックごと入れ替わるので、[page]の後ろ（テンプレの[return]）は実行されない
			return 'stop';
		}

		// ---- しおり・システム系 ----
		case 'title': {	// ウインドウ（ブラウザタブ）のタイトル指定（本家 SysBase.ts:448 title）
			// 本家サンプルの setting.sn:50 が体験版表記に使っている：
			//	[title text=#&const.sn.config.book.title +' 体験版'# cond=const.体験版]
			const {text} = args;
			if (! text) throw '[title] textは必須です';

			aAct.push({t: 'title', text});
			return 'skip';
		}

		case 'toggle_full_screen':	// 全画面状態切替（本家 SysBase.ts:462 #tglFlscr()）
			// key指定時は「そのキーで全画面を切り替えられるようにする」常駐予約（本家もdocumentへ
			//	リスナを足しっぱなしにする）。key省略時はその場で切り替える。
			//	[event]の予約とは別枠：ラベルへ飛ぶのではなく全画面を切り替えるだけなので
			aAct.push(args.key
				? {t: 'fullScrKey', key: args.key.toLowerCase()}
				: {t: 'toggleFullScr'});
			return 'skip';

		case 'navigate_to': {	// ＵＲＬを開く（本家 SysWeb.ts:239 navigate_to）
			const {url} = args;
			if (! url) throw '[navigate_to] urlは必須です';

			aAct.push({t: 'navigateTo', url});
			return 'skip';
		}

		// ---- アプリ（Electron）版のタグ ----
		//	ブラウザ版では**何もしない**（本家も SysBase 側の既定が no-op で、SysApp だけが上書きする。
		//	SysBase.ts:446/:495/:496）。エンジンは属性の検査までを受け持ち、
		//	実際にウインドウを触るのはScriptMng経由の`sys`（アプリ版で上書きされる）

		case 'close':	// アプリの終了（本家 SysApp.ts:234）
			aAct.push({t: 'close'});
			return 'skip';

		case 'update_check': {	// 更新チェック（本家 SysApp.ts:306）
			const {url} = args;
			if (! url) throw '[update_check] urlは必須です';
			if (! url.endsWith('/')) throw '[update_check] urlの末尾は/にして下さい';

			aAct.push({t: 'updateCheck', url});
			return 'skip';
		}

		case 'window': {	// アプリウインドウ設定（本家 SysApp.ts:440）
			// 省略時は現在値（sys:const.sn.nativeWindow.*）。初回はステージ実寸に落とす。
			//	**寸法は width/height でも w/h でも受ける**：本家のタグリファレンスは width/height、
			//	実装（SysApp.ts:443）が読むのは w/h という食い違いがあり、テンプレ（tmp_blues
			//	main.sn:86）は width/height で書いているため
			const now = (nm: string, def: number)=> {
				const v = this.#val.get(`sys:const.sn.nativeWindow.${nm}`);
				return v === undefined || v === null ? def : Number(v);
			};
			const cfg = (nm: string)=> Number(this.#val.get(`tmp:const.sn.config.window.${nm}`) ?? 0);
			const num = (nm: string, alt: string, def: number)=>
				args[nm] !== undefined ? ScriptEngine.#argNum('window', nm, args[nm])
				: args[alt] !== undefined ? ScriptEngine.#argNum('window', alt, args[alt])
				: def;
			const o = {
				centering	: args.centering === 'true',
				x	: num('x', 'x', now('x', 0)),
				y	: num('y', 'y', now('y', 0)),
				w	: num('width', 'w', now('w', cfg('width'))),
				h	: num('height', 'h', now('h', cfg('height'))),
			};
			// 本家同様sys:へ焼き付ける（設定として残る＝次の起動でも同じ位置・大きさ）
			this.#val.setNochk('sys:const.sn.nativeWindow.x', o.x);
			this.#val.setNochk('sys:const.sn.nativeWindow.y', o.y);
			this.#val.setNochk('sys:const.sn.nativeWindow.w', o.w);
			this.#val.setNochk('sys:const.sn.nativeWindow.h', o.h);
			aAct.push({t: 'window', ...o});
			return 'skip';
		}

		case 'loadplugin': {	// プラグインの読み込み（本家 LayerMng.ts:416 #loadplugin()）
			// 本家も**cssだけ**（JSのプラグインはビルド時に取り込まれるので、実行時に読むのはcss）
			const {fn} = args;
			if (! fn) throw '[loadplugin] fnは必須です';
			if (! fn.endsWith('.css')) throw '[loadplugin] サポートされない拡張子です';

			const join = (args.join ?? 'true') !== 'false';
			aAct.push({t: 'loadPlugin', fn, join});
			// join=true（既定）なら読み込み完了まで待つ＝ScriptMng待ち（本家も Reading.beginProc で止める）。
			//	join=falseは投げっぱなしにしてそのまま進む
			return join ? 'stop' : 'skip';
		}

		case 'snapshot': {	// スナップショット（本家 LayerMng.ts:338 #snapshot()）
			// 本家はpixiのレンダラで描き直すが、こちらはDOMなので撮るのはScriptMngの仕事。
			//	ここは属性の解釈だけ（layer/pageの絞り込み、出力サイズ、背景色、ファイル名）
			aAct.push({
				t: 'snapshot',
				fn: args.fn ?? '',
				aLayNm: ScriptEngine.#argLayNames(args.layer),
				page: ScriptEngine.argPage(args, 'fore'),
				width: ScriptEngine.#argNumDef('snapshot', 'width', args.width, 0),
				height: ScriptEngine.#argNumDef('snapshot', 'height', args.height, 0),
				smoothing: args.smoothing === 'true',	// 既定false（本家 LayerMng.ts:386 の antialias）
				// **b_colorだけは 0xAARRGGBB**（[lay b_color=]の0xRRGGBBと違う。tag.html#snapshot
				//	「透過2桁＋赤2桁＋緑2桁＋青2桁」）。0x0で完全透過、不透明な黒は0xFF000000
				...(args.b_color === undefined ? {} : {b_color: ScriptEngine.#argNum('snapshot', 'b_color', args.b_color)}),
			});
			return 'stop';	// 画像化は非同期＝ScriptMng待ち（本家も撮り終わるまで進めない）
		}

		case 'clear_text': {	// 文字消去（本家 LayerMng.ts:993 #clear_text()）
			// [er]が「そのレイヤの表裏どちらも消す」のに対し、こちらは**片面だけ**。
			//	対象レイヤ省略時は既定文字レイヤ（[current]）
			const nm = args.layer || this.#curTxtLayer;
			const pg = ScriptEngine.argPage(args, 'fore');
			// 履歴は既定文字レイヤの表ページだけが対象（本家 LayerMng.ts:995 も同じ条件）
			if (nm === this.#curTxtLayer && pg === 'fore') this.#recPagebreak();
			this.#hTxtOf(pg)[nm] = '';
			aAct.push({t: 'chgStr', nm, page: pg, str: ''});
			return 'skip';
		}

		case 'dump_val':	// 変数のダンプ（本家 Variable.ts:623 #dump_val()）
			aAct.push({t: 'trace', text: `[dump_val] ${JSON.stringify(this.#val.dump())}`});
			return 'skip';

		case 'dump_stack':	// スタックのダンプ（本家 ScriptIterator.ts:739 #dump_stack()）
			aAct.push({t: 'trace', text: `[dump_stack] ${JSON.stringify({
				now		: {fn: this.fn, idx: this.#idx},
				aCallStk: this.#aCallStk.map(cs=> ({fn: cs.fn, returnIdx: cs.returnIdx})),
				aIfStk	: [...this.#aIfStk],
			})}`});
			return 'skip';

		case 'dump_lay':	// レイヤのダンプ（本家 LayerMng.ts:1068 #dump_lay()）
			aAct.push({t: 'dumpLay', aLayNm: ScriptEngine.#argLayNames(args.layer)});
			return 'skip';

		case 'pop_stack': {	// コールスタック破棄（本家 ScriptIterator.ts:984 #pop_stack()）
			// [return]で戻らずにサブルーチンを抜ける時に使う（本家サンプルでは
			//	_submenu.sn/sub.sn が「タイトルへ戻る」等の脱出で[pop_stack clear=true]する）
			if ((args.clear ?? 'false') !== 'false') this.#aCallStk.length = 0;
			else if (! this.#aCallStk.pop()) throw '[pop_stack] スタックが空です';

			// 本家同様、ifスタックは「壁」だけに戻し、マクロ引数（mp:）も捨てる。
			//	どこまで積まれていたか分からない状態から抜けるので、途中の[if]も無かったことにする
			this.#aIfStk.length = 0;
			this.#aIfStk.push(-1);
			this.#val.setMp({});
			return 'skip';
		}

		case 'clearvar':	// ゲーム変数の全消去（本家 Variable.ts:48 hTag.clearvar）
			this.#val.clearGame();
			return 'skip';

		case 'clearsysvar':	// システム変数の全消去。本家同様、既読情報もここで消える
			// （本家 Variable #clearsysvar()。SKYNovel_gallery の kidoku サンプルが
			// 「既読情報クリア」ボタンでこのタグを使っている）
			this.#val.clearSys();
			this.clearKidoku();
			return 'skip';

		// ---- しおり（セーブ・ロード）系 ----
		//	しおり1件の中身は「エンジンが持つ分（save:変数・ifスタック・再開位置）」と
		//	「ストアが持つ分（表裏ページ）」の合成なので、組み立てはScriptMngが行う。
		//	ここは再開位置を save: へ記録し、あとは意図をアクションに載せるだけ

		case 'record_place':	// セーブポイント指定（本家 ScriptIterator.ts:1516 #record_place()）
			this.recordPlace();
			aAct.push({t: 'recordPlace'});
			return 'skip';

		case 'save': {	// しおりの保存（本家 ScriptIterator.ts:1552 #save()）
			if (args.place === undefined) throw '[save] placeは必須です';
			const place = ScriptEngine.#argNum('save', 'place', args.place);

			// place以外の属性がそのまましおりの見出し（const.sn.bookmark.json）になる。
			//	本家もタグ名とplaceだけ落として丸ごと持たせる
			const json: {[k: string]: string} = {text: '', ...args};
			delete json.place;
			aAct.push({t: 'save', place, json});

			// 「次に保存する枠」を1つ進める（本家と同じ、今書いた枠が現在値のときだけ）
			const now = Number(this.#val.get('sys:const.sn.save.place'));
			if (place === now) this.#val.setNochk('sys:const.sn.save.place', now +1);
			return 'skip';
		}

		case 'load': {	// しおりの読込（本家 ScriptIterator.ts:1415 #load()）
			// index指定時は「ページ移動用」で、fn単独でよい（labelは無視される。本家1454行目）。
			//	それ以外は従来どおりfn/labelをセットで要求する
			if (args.index === undefined && ('fn' in args) !== ('label' in args)) throw '[load] fnとlabelはセットで指定して下さい';

			aAct.push({
				t		: 'load',
				place	: ScriptEngine.#argNumDef('load', 'place', args.place, 0),
				fn		: args.fn ?? '',
				label	: args.label ?? '',
				...(args.index === undefined ? {} : {index: ScriptEngine.#argNum('load', 'index', args.index)}),
				// do_rec（既定true）：ロードした状態を次の[record_place]代わりに持たせるか（本家1434行目）
				...(args.do_rec === undefined ? {} : {doRec: args.do_rec !== 'false'}),
			});
			return 'stop';	// 復元とスクリプトの読み直しが要る＝ScriptMng待ち
		}

		case 'reload_script':	// スクリプト再読込（本家 ScriptIterator.ts:1488 #reload_script()）
			// 最後の[record_place]位置から、スクリプトを読み直して再開する。
			//	テンプレの ext_lang.sn が「表示言語を変えたら本文を読み直す」のに使う
			aAct.push({t: 'reloadScript'});
			return 'stop';

		case 'copybookmark': {	// しおりの複写（本家 Variable.ts:282 #copybookmark()）
			const from = ScriptEngine.#argNum('copybookmark', 'from', args.from ?? '');
			const to = ScriptEngine.#argNum('copybookmark', 'to', args.to ?? '');
			if (from === to) return 'skip';

			aAct.push({t: 'copyBookmark', from, to});
			return 'skip';
		}

		case 'erasebookmark':	// しおりの消去（本家 Variable.ts:298 #erasebookmark()）
			aAct.push({t: 'eraseBookmark',
				place: ScriptEngine.#argNum('erasebookmark', 'place', args.place ?? '')});
			return 'skip';

		case 'export':	// プレイデータをエクスポート（本家 SysWeb.ts:179 _export）
			aAct.push({t: 'exportData'});
			return 'skip';

		case 'import':	// プレイデータをインポート（本家 SysWeb.ts:204 _import）
			// 本家同様その場では止めない（ファイル選択はユーザー任せで、
			//	終わったら[event key=sn:imported]が発火する）
			aAct.push({t: 'importData'});
			return 'skip';

		case 'event': {	// イベント予約（本家 EventMng.ts:543 #event() の、フォーカス処理を除いた核）
			const rawKey = args.key ?? '';
			const key = rawKey.toLowerCase();
			if (! key) throw '[event] keyは必須です';
			// key='dom=フレームid:セレクタ' はHTMLフレーム内の要素へイベントを張る。
			//	**CSSセレクタは大小文字を区別する**ので、表の索引には小文字化した値を使いつつ、
			//	DOM側へは元の文字列（本家のrawKeY）をそのまま渡す
			const isDom = key.startsWith('dom=');
			const h = args.global === 'true' ? this.#hGlobalEvt : this.#hLocalEvt;

			if (args.del === 'true') {	// 予約の取り消し
				if (args.fn || args.label || args.call) throw '[event] fn/label/callとdelは同時指定できません';
				delete h[key];	// eslint-disable-line @typescript-eslint/no-dynamic-delete
				if (isDom) aAct.push({t: 'resvDomEvent', rawKey, key, del: true, needErr: false});
				return 'skip';
			}

			const label = args.label ?? '';
			const fn = args.fn ?? this.fn;	// 省略時は現在のスクリプト（本家 hArg.fn ??= scriptFn）
			// url指定時はラベルへ飛ばずURLを開く（本家も fn・label より優先）
			const {url} = args;
			if (! url && ! label && ! args.fn) throw '[event] fn,label いずれかは必須です';
			h[key] = {fn, label, call: args.call === 'true', arg: args.arg ?? '', ...(url ? {url} : {})};
			if (isDom) aAct.push({t: 'resvDomEvent', rawKey, key, del: false,
				needErr: (args.need_err ?? 'true') !== 'false'});
			return 'skip';
		}

		case 'set_focus': {	// フォーカス移動（本家 EventMng.ts:640 #set_focus()）
			// add/delは対象要素の指定なので'dom=…'書式。toは移動先（null/next/prev）
			const {add, del, to} = args;
			const needErr = (args.need_err ?? 'true') !== 'false';
			if (add !== undefined || del !== undefined) {
				const rawKey = add ?? del ?? '';
				if (! rawKey.startsWith('dom=')) throw `[set_focus] add/delは'dom=…'書式のみです：${rawKey}`;
				aAct.push({t: 'setFocus', mode: add !== undefined ? 'add' : 'del', rawKey, needErr});
				return 'skip';
			}

			if (! to) throw '[set_focus] add か to は必須です';
			if (to !== 'null' && to !== 'next' && to !== 'prev') throw `[set_focus] to【${to}】が不正です`;
			aAct.push({t: 'setFocus', mode: to});
			return 'skip';
		}

		// ---- HTMLフレーム（本家 FrameMng.ts） ----
		// 中身は自分のJS状態を持つ生きたHTML文書なので、レイヤ（aPage）には載せずFrameMngが抱える。
		//	エンジンが見るのは組み込み変数 const.sn.frm.<id>（＝読み込み済みかどうか）だけ
		case 'add_frame': {	// フレーム追加（本家 FrameMng.ts:69 #add_frame()）
			const {id, src} = args;
			if (! id) throw '[add_frame] idは必須です';
			if (! src) throw '[add_frame] srcは必須です';
			if (this.#val.get(`const.sn.frm.${id}`)) throw `[add_frame] frame【${id}】はすでにあります`;

			aAct.push({t: 'addFrame', id, src, sty: ScriptEngine.#argFrmSty('add_frame', args)});
			return 'stop';	// HTMLの読込が要る＝ScriptMng待ち（本家も Reading.beginProc で止める）
		}

		case 'frame': {	// フレームに設定（本家 FrameMng.ts:307 #frame()）
			const {id} = args;
			if (! id) throw '[frame] idは必須です';
			this.#chkFrm('frame', id);

			// 重なり順。本家は判定順が float → index → dive で、diveは「最背面へ」の意味しかない
			//	（指定したidの下へ潜るのではなく、z-indexを負にするだけ）
			const order: T_FRM_ORDER | undefined
				= (args.float ?? 'false') !== 'false' ? {mode: 'float'}
				: args.index !== undefined ? {mode: 'index', index: ScriptEngine.#argNum('frame', 'index', args.index)}
				: args.dive ? {mode: 'dive'}
				: undefined;
			aAct.push({
				t: 'frame', id, sty: ScriptEngine.#argFrmSty('frame', args),
				...(order ? {order} : {}),
				...(args.disabled !== undefined ? {disabled: args.disabled !== 'false'} : {}),
			});
			return 'skip';
		}

		case 'set_frame': {	// フレーム変数に設定（本家 FrameMng.ts:277 #set_frame()）
			const {id, var_name, text} = args;
			if (! id) throw '[set_frame] idは必須です';
			if (! var_name) throw '[set_frame] var_nameは必須です';
			if (! text) throw '[set_frame] textは必須です';
			this.#chkFrm('set_frame', id);

			// 本家同様、組み込み変数にも同じ値を控える（フレーム側と食い違わないように）
			this.#val.setNochk(`const.sn.frm.${id}.${var_name}`, text);
			aAct.push({t: 'setFrame', id, var_name, text});
			return 'skip';
		}

		case 'let_frame': {	// フレーム変数を取得（本家 FrameMng.ts:250 #let_frame()）
			const {id, var_name} = args;
			if (! id) throw '[let_frame] idは必須です';
			if (! var_name) throw '[let_frame] var_nameは必須です';
			this.#chkFrm('let_frame', id);

			aAct.push({t: 'letFrame', id, var_name, fnc: (args.function ?? 'false') !== 'false'});
			// 読み取った値をエンジンへ書き戻してから続ける。アクションの適用はstep()が返った後なので、
			//	ここで返しておかないと**同じstep内では古い値のまま**になってしまう
			return 'stop';
		}

		case 'clear_event':	// 予約イベントを全消去（本家 Reading.ts:69 ReadingState.clear_event()）
			this.clearEvent(args.global === 'true');
			return 'skip';

		case 'enable_event': {	// イベント有無の切替（本家 LayerMng.ts:1088 #enable_event()）
			// 対象は文字レイヤ。省略時は現在の文字レイヤ（本家 #argChk_layer(hArg, #curTxtlay)）
			const nm = args.layer || this.#curTxtLayer;
			const enabled = (args.enabled ?? 'true') !== 'false';
			// シナリオから今の状態を読めるようにする（本家 LayerMng.ts:1092 と同じ save: 名前空間）。
			//	**読む専用**：ここへ代入しても有効・無効は変わらない（変えるのはこのタグ）
			this.#val.setNochk(`save:const.sn.layer.${nm}.enabled`, enabled);
			aAct.push({t: 'enableEvent', nm, enabled});
			return 'skip';
		}

		case 'wait': {	// ウェイトを入れる（本家 Reading.ts:320 wait()）
			const msec = ScriptEngine.#argNum('wait', 'time', args.time ?? '');
			// 既読スキップ中は待たない。未読に来ていたらそこでスキップ解除（本家と同じ）
			if (this.skipEnabled) {
				if (! this.skipAll && ! this.isNextKidoku) this.cancelAutoSkip();
				return 'skip';
			}
			// [wt]と同じく、実際に待つのはScriptMngの担当なのでstep()はここで一旦返す。
			//	canskipの既定はtrue＝クリックで待ちを打ち切れる
			aAct.push({t: 'wait', msec, canskip: (args.canskip ?? 'true') !== 'false'});
			return 'stop';
		}

		case 'l': case 'p': case 's': case 'waitclick': {	// 行末クリック待ち／改ページ／停止／クリック待ち
			// &sn.tagL.enabled = false の間は[l]で止まらない（本家 Reading l() の先頭）。
			//	止まらないので既読判定もオート・スキップの計算もしない
			if (name === 'l' && ! this.tagLEnabled) return 'skip';

			if (name === 'p') this.#clearOnResume = true;	// [p]の次の進行時に現在レイヤをクリア（試作の改ページ挙動）
			const resume = this.#calcResume(name);	// オート読み／既読スキップの自動進行指示（該当しなければundefined）
			// 待ちマークの位置・寸法（本家 LayerMng.ts:159 の breakLine/breakPage が
			//	そのままタグ属性を画像へ渡す）。**書かれた属性だけ**を拾う
			const mark: T_MARK_STY = {};
			for (const k of ['x', 'y', 'width', 'height'] as const) {
				const v = args[k];
				if (v !== undefined) mark[k] = ScriptEngine.#argNum(name, k, v);
			}
			aAct.push({t: 'stop', kind: name, key: `${this.fn}:${String(this.#idx)}`, nm: this.#curTxtLayer,
				...resume ? {resume} : {}, ...Object.keys(mark).length > 0 ? {mark} : {}});
			return 'stop';
		}

		// ---- ＢＧＭ・効果音（本家 SoundMng.ts/SndBuf.ts）----
		//	howlerを積む本家と違い、こちらはWeb Audio APIを直接使う自前の薄い層（ts/SndMng.ts・ts/SndBuf.ts）。
		//	**1バッファ＝1インスタンス、停止＝破棄**という単純な作りにしたので、本家の状態機械
		//	（StLoading〜StStopの6クラス）は無い。実際にAudioContext/GainNodeを触るのはScriptMng側で、
		//	ここ（エンジン）は属性の解釈・実効音量の計算・save:/loopPlayingの帳簿付けだけを行う。
		//	tmp:const.sn.sound.<buf>.playingは自然終了（非同期）でも倒す必要があるため、
		//	ここでは書かない（ScriptMngが実際に停止した時にengine.setValNochk()で倒す）
		case 'playse': case 'playbgm': {
			const isBgm = name === 'playbgm';
			// [playbgm]はキー押下スキップ中でも必ず再生する（本家 SoundMng.ts:109-111 canskip=false固定）
			const canskip = isBgm ? false : (args.canskip ?? 'true') !== 'false';
			// 既読スキップ中はcanskip指定分だけ鳴らさない。本家は直前の音を#stopse()する副作用を持つが
			//	（SoundMng.ts:118）、それは指摘済みの不具合なのでこちらは踏襲せず何もしない
			if (this.skipEnabled && canskip) return 'skip';

			const buf = isBgm ? 'BGM' : (args.buf || 'SE');
			const fn = args.fn ?? '';
			if (! fn) throw `[${name}] fnは必須です`;

			const loop = isBgm ? true : (args.loop ?? 'false') !== 'false';
			const join = (args.join ?? 'true') !== 'false';
			const speed = ScriptEngine.#argNumDef(name, 'speed', args.speed, 1);
			const pan = ScriptEngine.#argNumDef(name, 'pan', args.pan, 0);
			const start_ms = ScriptEngine.#argNumDef(name, 'start_ms', args.start_ms, 0);
			if (start_ms < 0) throw `[${name}] start_ms:${String(start_ms)} が負の値です`;
			const ret_ms = ScriptEngine.#argNumDef(name, 'ret_ms', args.ret_ms, 0);
			if (ret_ms < 0) throw `[${name}] ret_ms:${String(ret_ms)} が負の値です`;
			const end_ms = ScriptEngine.#argNumDef(name, 'end_ms', args.end_ms, ScriptEngine.#MAX_END_MS);
			if (end_ms > 0) {	// 既定値(MAX_END_MS)も正なので常に通る検査（本家 SndBuf.ts:130 と同じ形）
				if (end_ms <= start_ms) throw `[${name}] start_ms:${String(start_ms)} >= end_ms:${String(end_ms)} は異常値です`;
				if (end_ms <= ret_ms) throw `[${name}] ret_ms:${String(ret_ms)} >= end_ms:${String(end_ms)} は異常値です`;
			}

			// 目標音量（save:）と基準音量（sys:。バッファごとに無ければ1で作る）の合成が実効音量
			const vn = `const.sn.sound.${buf}.`;
			const savevol = ScriptEngine.#clampVol(ScriptEngine.#argNumDef(name, 'volume', args.volume, 1));
			this.#val.setNochk(`save:${vn}volume`, savevol);
			this.#val.setNochk(`save:${vn}fn`, fn);
			this.#val.setNochk(`save:${vn}start_ms`, start_ms);
			this.#val.setNochk(`save:${vn}end_ms`, end_ms);
			this.#val.setNochk(`save:${vn}ret_ms`, ret_ms);
			const sysvol = Number(this.#val.get(`sys:${vn}volume`, 1, true));
			let volume = savevol * sysvol;

			// VOICE再生中はBGM音量を絞る（本家 SndBuf.ts:143-157）。BGM側は今の乗数をそのまま
			//	掛け、VOICE側は乗数を読み直して**今鳴っているBGM**の実効音量へ直接反映する
			//	（save:へは書かない＝目標音量そのものは変えていない一時的な上書きのため）
			if (buf === 'BGM') volume *= this.#volMulTalking;
			else if (buf === 'VOICE') {
				const mul = Number(this.#val.get('sys:sn.sound.BGM.vol_mul_talking') ?? 1);	// 本家同様??
				this.#volMulTalking = mul;
				if (mul !== 1) {
					const vnBgm = 'const.sn.sound.BGM.';
					const bgmVol = Number(this.#val.get(`save:${vnBgm}volume`, 1, true))
						* Number(this.#val.get(`sys:${vnBgm}volume`, 1, true)) * mul;
					aAct.push({t: 'duckBgm', volume: bgmVol});
				}
			}

			if (loop) this.#setLoopPlay(buf, fn); else this.#delLoopPlay(buf);

			aAct.push({t: 'playSnd', buf, fn, loop, volume, speed, pan,
				start_ms, end_ms, ret_ms, join, canskip});
			if (! join) return 'skip';

			// join=true（既定）：ロード完了を待ってから次のタグへ進む（本家のjoin待ちと同じ意味）
			return 'stop';
		}

		case 'stopse': case 'stopbgm': {
			const buf = name === 'stopbgm' ? 'BGM' : (args.buf || 'SE');
			this.#delLoopPlay(buf);
			aAct.push({t: 'stopSnd', buf});
			return 'skip';
		}

		case 'stop_allse': {
			// 個々のtmp:playingはScriptMng側が実際に止めた時に倒す。ここではループ帳簿だけ畳む
			for (const buf of Object.keys(this.#hLoopPlay)) this.#delLoopPlay(buf);
			aAct.push({t: 'stopAllSnd'});
			return 'skip';
		}

		case 'xchgbuf': {	// サウンドバッファの交換（本家 SoundMng.ts:174-188 + SndBuf.ts:50-79）
			const buf = args.buf || 'SE';
			const buf2 = args.buf2 || 'SE';
			if (buf === buf2) return 'skip';	// 本家も同一指定は何もしない

			// save:の帳簿（[playse]系が書く5項目）を丸ごと入れ替える。本家はvolume/fnの2つだけ
			//	入れ替えるが（SndBuf.ts:50-79）、こちらは[playse]がstart_ms/end_ms/ret_msも
			//	save:へ書く設計なので、揃えないと[load]の音声復元（Phase 3）で食い違う
			const D: {[k: string]: number | string} = {
				volume: 1, fn: '', start_ms: 0, end_ms: ScriptEngine.#MAX_END_MS, ret_ms: 0,
			};
			const vn = `const.sn.sound.${buf}.`;
			const vn2 = `const.sn.sound.${buf2}.`;
			for (const k of Object.keys(D)) {
				const v = this.#val.get(`save:${vn}${k}`, D[k]);
				const v2 = this.#val.get(`save:${vn2}${k}`, D[k]);
				this.#val.setNochk(`save:${vn}${k}`, v2);
				this.#val.setNochk(`save:${vn2}${k}`, v);
			}

			// ループ帳簿（save:const.sn.loopPlaying）も両方向に入れ替える。本家 SndBuf.ts:64 の
			//	修正コメント（片方だけがループ中の時しか更新しておらず、両方ループ中だとhLPが
			//	交換前のまま取り残される不備）を踏襲しない＝常に両方入れ替える
			const lp = this.#hLoopPlay[buf];
			const lp2 = this.#hLoopPlay[buf2];
			if (lp2 === undefined) delete this.#hLoopPlay[buf]; else this.#hLoopPlay[buf] = lp2;
			if (lp === undefined) delete this.#hLoopPlay[buf2]; else this.#hLoopPlay[buf2] = lp;
			this.#val.setNochk('save:const.sn.loopPlaying', JSON.stringify(this.#hLoopPlay));

			aAct.push({t: 'xchgBufSnd', buf, buf2});
			return 'skip';
		}

		case 'volume': {	// バッファの基準音量（sys:）設定（本家 SoundMng.ts:72 #volume()）
			const buf = args.buf || 'SE';
			const vn = `const.sn.sound.${buf}.`;
			const sysvol = ScriptEngine.#clampVol(ScriptEngine.#argNumDef('volume', 'volume', args.volume, 1));
			this.#val.setNochk(`sys:${vn}volume`, sysvol);
			const savevol = Number(this.#val.get(`save:${vn}volume`, 1, true));
			aAct.push({t: 'volumeSnd', buf, volume: savevol * sysvol});
			return 'skip';
		}

		// ---- フェード（本家 SndBuf.ts の StPlaying.fade()/StFade 相当） ----
		case 'fadese': case 'fadebgm': case 'fadeoutse': case 'fadeoutbgm': {
			const isBgm = name === 'fadebgm' || name === 'fadeoutbgm';
			const isOut = name === 'fadeoutse' || name === 'fadeoutbgm';
			const buf = isBgm ? 'BGM' : (args.buf || 'SE');
			const vn = `const.sn.sound.${buf}.`;

			// [fadeoutse]/[fadeoutbgm]はvolume=0固定（属性そのものを受け付けない。本家tag.html準拠）
			const savevol = isOut ? 0 : ScriptEngine.#clampVol(ScriptEngine.#argNum(name, 'volume', args.volume ?? ''));
			this.#val.setNochk(`save:${vn}volume`, savevol);
			const sysvol = Number(this.#val.get(`sys:${vn}volume`, 1, true));
			// stopの既定：fadeoutは常にtrue、fadeはvolume=0を指定した時だけtrue（本家 SndBuf.ts:413）
			const stop = (args.stop ?? (savevol === 0 ? 'true' : 'false')) !== 'false';
			if (stop) this.#delLoopPlay(buf);

			// 既読スキップ中は即座に終端の値へ（time=0扱い。本家 tsy と同じ作法）
			const skip = this.skipEnabled;
			const msec = skip ? 0 : ScriptEngine.#argNum(name, 'time', args.time ?? '');
			const delay = skip ? 0 : ScriptEngine.#argNumDef(name, 'delay', args.delay, 0);
			aAct.push({t: 'fadeSnd', buf, volume: savevol * sysvol, msec, delay, stop});
			return 'skip';	// フェード自体は待たない（本家も false を返す）。待ちたければ[wf]/[wb]
		}

		case 'stopfadese':
			// 本家で既に廃止済みの空実装（SoundMng.ts:38 `()=> false`）。
			//	上流シナリオに残っている記述をエラーにしないためだけに受ける
			return 'skip';

		// ---- 再生・フェードの終了待ち ----
		//	global属性は本家の「ローカル／グローバル予約イベント」の区別に由来するが、
		//	こちらの待ち合わせにその区別が無いため受けても意味を持たない
		case 'ws': case 'wl': {
			const buf = name === 'wl' ? 'BGM' : (args.buf || 'SE');
			// 待ち系のcanskip既定はfalse（[wt]/[wq]/[wait_tsy]/[wait]とは逆。本家 tag.html の通り）
			const canskip = (args.canskip ?? 'false') !== 'false';
			const stop = (args.stop ?? 'true') !== 'false';
			aAct.push({t: 'waitSnd', buf, canskip, stop});
			return 'stop';
		}

		case 'wf': case 'wb': {
			const buf = name === 'wb' ? 'BGM' : (args.buf || 'SE');
			const canskip = (args.canskip ?? 'false') !== 'false';
			aAct.push({t: 'waitFade', buf, canskip});
			return 'stop';
		}

		// ---- 動画再生終了待ち（本家 SpritesMng.wv()。動画は[lay fn=movie.mp4/.webm]で画像レイヤに
		//	貼る方式なので、専用の再生タグは無く待ちタグ[wv]だけがある） ----
		case 'wv': {
			const fn = args.fn ?? '';	// レイヤ名でなく**ファイル名**指定（本家と同じ）
			if (! fn) throw '[wv] fnは必須です';
			const stop = (args.stop ?? 'true') !== 'false';
			// canskipの既定は**true**（[ws]/[wf]の既定falseとは逆。本家 ScriptIterator.ts:686-700
			//	#hTag2CanSkipの表で wv:true）
			const canskip = (args.canskip ?? 'true') !== 'false';
			aAct.push({t: 'waitVideo', fn, stop, canskip});
			return 'stop';
		}

		default: {	// 未対応タグは無視するが、マクロ名として登録されていれば呼び出す
			// （本家はマクロ名をhTagへ動的登録して呼び出すが、試作はswitch文のため、
			// ここでマクロ登録テーブル#hMacroを直接参照する形にしている）
			const to = this.#hMacro[name];
			if (to === undefined) return 'skip';	// 試作では未対応タグは無視（後の本実装で拡充）

			// [call]と同じ枠組みでジャンプし、タグ属性をそのままmp:名前空間へ渡す
			// （本家 ScriptIterator.ts:1374-1392 のマクロ呼び出しハンドラを簡略化したもの）。
			// マクロ呼び出しはローカル予約イベントを退避しない（本家と同じ）。
			//	属性はmp:名前空間と、マクロ本体の「%属性名」「*」用にhArgsの両方へ渡す
			this.#pushCallStk(this.#idx, false, args);
			this.#val.setMp({
				...args,
				// **マクロを呼んだ側のスクリプト名**（本家 ScriptIterator.ts:1384）。
				//	マクロ本体は定義元ファイルの中にあるので、そのままではラベルの
				//	探索先が定義元になってしまう。呼び元のラベルを見に行きたいマクロが
				//	`fn=%fn|&mp:const.sn.me_call_scriptFn` と書いて使う
				//	（本家サンプルの[for_call]がまさにこれ）
				'const.sn.me_call_scriptFn'	: this.fn,
				'const.sn.macro'			: JSON.stringify({name}),
			});
			if (to.fn !== this.fn) {	// 別ファイルで定義されたマクロ
				aAct.push({t: 'loadScript', fn: to.fn, label: '', idx: to.idx});
				return 'stop';
			}
			this.#idx = to.idx;
			return 'skip';
		}
		}
	}

	// フレームが読み込み済みか（本家も各タグの頭で tmp:const.sn.frm.<id> を見ている）
	#chkFrm(tag: string, id: string) {
		if (! this.#val.get(`const.sn.frm.${id}`)) throw `[${tag}] frame【${id}】が読み込まれていません`;
	}

	// [let]系タグ共通の代入部分（本家 Variable.ts:313 #let()）。
	//	本家は「castで型変換して代入、cast=strなら自動キャストを止める」という作りだが、
	//	bluesnovelは自動キャストが読み出し側なので、cast=strの記憶もVarStore.set()が持つ
	#letText(tag: string, args: {[k: string]: string}, text: string) {
		const varName = args.name ?? '';
		if (! varName) throw `[${tag}] nameは必須です`;
		this.#val.set(varName, text, <T_CAST>(args.cast ?? ''));
	}

	// [if]の開始処理。呼び出し時点でthis.#idxは既に[if ...]の次のトークンを指している
	//	（本家のidxTokenと同じ前提。本家 ScriptIterator.ts:886 #if() を移植）
	#if(args: {[k: string]: string}) {
		const exp = args.exp ?? '';
		if (! exp) throw '[if] expは必須です（試作仕様）';
		// 本家 ScriptIterator.ts:890：expは既に式なので先頭に「&」は不要（誤入力の検出）
		if (exp.startsWith('&')) throw '[if] 属性expは「&」が不要です';

		let idxGo = this.#expr.evalBool(exp) ? this.#idx : -1;
		let cntDepth = 0;	// 入れ子ifの深度カウンター（elsif/elseは深度を跨がないためifとendifのみ数える）
		let inLetMl = false;	// [let_ml]の本文は「ただのテキスト」なので、[endif]等と読めても反応しない
		const len = this.#script.len;
		for (; this.#idx < len; ++this.#idx) {
			const tkn = this.#script.aToken[this.#idx]!;
			if (inLetMl) {
				if (this.#script.grm.testTagEndLetml(tkn)) inLetMl = false;
				continue;
			}
			const uc = tkn.charCodeAt(0);
			if (uc !== 91) continue;	// [ タグ開始以外（地の文・改行）はこの時点ではまだ実行せず読み飛ばすだけ
			if (this.#script.grm.testTagLetml(tkn)) {inLetMl = true; continue}

			const {name, args: a2} = ScriptEngine.parseTag(tkn);
			switch (name) {
			case 'if':
				++cntDepth;	// 入れ子のifは深度だけ数える。中の条件は今は評価しない（後で通常実行時に評価される）
				continue;

			case 'elsif': {
				if (cntDepth > 0) continue;	// 入れ子if内のelsifはこのチェーンとは無関係
				if (idxGo > -1) continue;		// 既に確定済みなら以降の条件式は評価すらしない（本家と同じ短絡）

				const e = a2.exp ?? '';
				if (! e) throw '[elsif] expは必須です（試作仕様）';
				// 本家 ScriptIterator.ts:920：expは既に式なので先頭に「&」は不要（誤入力の検出）
				if (e.startsWith('&')) throw '[elsif] 属性expは「&」が不要です';
				if (this.#expr.evalBool(e)) idxGo = this.#idx + 1;
				continue;
			}
			case 'else':
				if (cntDepth > 0) continue;
				if (idxGo === -1) idxGo = this.#idx + 1;
				continue;

			case 'endif':
				if (cntDepth > 0) {--cntDepth; continue}
				if (idxGo === -1) {
					++this.#idx;	// どの分岐も採用されなかった（elseもない）： [endif]の次からそのまま再開
				}
				else {
					// 選ばれた分岐を実行後、次に出会うelsif/else/endif（このifチェーン由来のもの）で
					// ここ（本当の[endif]の次）へ戻れるように記録してから、選ばれた分岐へジャンプする
					this.#aIfStk.push(this.#idx + 1);
					this.#idx = idxGo;
				}
				return;

			default:
				continue;
			}
		}
		throw '[if] に対応する [endif] が見つかりません（試作仕様）';
	}

	// [elsif]/[else]/[endif] に、選ばれた分岐の実行が「通常のトークン処理として」辿り着いた場合の処理
	#endif() {
		const t = this.#aIfStk.pop();
		// undefined: スタックが空（対応する[if]がそもそもない）
		// -1: [call]が積んだ壁（このサブルーチン内に対応する[if]がない。コール元のif枠を誤って終端させない）
		if (t === undefined || t === -1) throw '[if] に対応していない [elsif]/[else]/[endif] です';
		this.#idx = t;
	}

	// [return]/[endmacro]共通の「呼び出し元へ戻る」処理
	//	（本家 ScriptIterator.ts:994 #return()、及び hTag.endmacro = ()=> this.#return(o) と同じ規約）
	//	label指定時は、コール元ではなくそのラベルへ戻る。
	//	コールスタックとifスタック・mp:の巻き戻しは指定の有無にかかわらず行う（本家も同じ順序）
	#doReturn(aAct: T_ENGINE_ACTION[], args: {[k: string]: string} = {}): 'skip' | 'stop' {
		const cs = this.#aCallStk.pop();
		if (! cs) throw '[return] 呼び出し元がありません（[call]/マクロ呼び出しされていないか、既に戻っています）';
		// 呼び出し先で[if]が閉じきっていなくても、コール元のifスタックだけを確実に復元する
		// （本家 ScriptIterator.ts:999 aIfStk.slice(-lenIfStk) と同じ意図。押した側から詰め直す）
		this.#aIfStk.length = cs.lenIfStk;
		// mp:もコール元の値へ復元する（本家 #return() の csa[':hMp'] 復元と同じ。
		// 通常の[call]から戻る場合は元々変化していないため実質no-op）
		this.#val.setMp(cs.hMp);
		// ローカル予約イベントもコール元のものへ戻す（本家 #return() の pushLocalEvts()）。
		//	マクロ呼び出し（[endmacro]で戻る場合）は退避していないので、
		//	マクロ内で予約したイベントはそのまま呼び出し元へ残る（本家と同じ）
		if (cs.hEvt) this.#hLocalEvt = cs.hEvt;
		// clearOnResumeはここで復元しない（callToLabel/callToScriptがfalseへ凍結した分）。
		//	[p]の位置へ戻る場合は[p]タグ自体が再実行されて自然にtrueへ戻る（本家と同じ「タグの
		//	再実行で状態を作り直す」設計）。別ファイルをまたぐ[return]（loadScript経由）だと
		//	switchScript後の次のstep()呼び出しの冒頭でこのtrueが[p]再実行より先にチェックされ、
		//	本文を誤って消去してしまうため、復元自体をしないのが正しい

		const label = args.label ?? '';
		const fn = args.fn ?? '';
		if (fn || label) {	// 戻り先の指定あり：コール元ではなくそこへ進む
			if (fn && fn !== this.fn) {
				aAct.push({t: 'loadScript', fn, label, idx: 0});
				return 'stop';
			}
			const to = this.#script.label2idx(label, this.#idx, this.#isInMacro());
			if (to === undefined) throw `[return] ラベル【${label}】がスクリプト【${this.fn}】に見つかりません`;
			this.#idx = to;
			return 'skip';
		}

		if (cs.fn !== this.fn) {	// 別ファイルから呼ばれていた：そのファイルを読み直して戻る
			aAct.push({t: 'loadScript', fn: cs.fn, label: '', idx: cs.returnIdx});
			return 'stop';
		}
		this.#idx = cs.returnIdx;
		return 'skip';
	}

	// 文字装飾タグを「本文ストリームに埋め込む命令」の文字列にする（本家 LayerMng.ts:315 #cmdTxt）。
	//	`｜&emsp;《コマンド名｜URIエンコードしたJSON》`。ルビ記法の形なのでRubySpliterが
	//	1単位として通し、ルビ側を復号して`コマンド名｜{…}`にしてくれる
	static #cmdTxt(cmd: string, args: {[nm: string]: string | undefined}): string {
		// JSON.stringifyはundefinedの項目を落とすので、除きたい属性はundefinedを入れて渡せば良い
		return `｜&emsp;《${cmd}｜${encodeURIComponent(JSON.stringify(args))}》`;
	}

	// 対象の文字レイヤとページを決める（本家 LayerMng.ts:935 #$getTxtLayer()）。
	//	地の文・&式&はこれを通さず常に現在レイヤの表ページ（属性を書けないため）
	#txtTarget(args: {[k: string]: string}): {nm: string; page: T_PAGE} {
		return {nm: args.layer || this.#curTxtLayer, page: ScriptEngine.argPage(args, 'fore')};
	}

	// 文字表示（地の文・[r]・[span]/[ch]/[link]/[tcy]/[graph]/[ruby2]）。
	//	nm/pageの省略時は現在の文字レイヤの表ページ
	#appendTxt(aAct: T_ENGINE_ACTION[], add: string, rec = true, nm = this.#curTxtLayer, page: T_PAGE = 'fore') {
		const hTxt = this.#hTxtOf(page);
		const str = (hTxt[nm] ?? '') + add;
		hTxt[nm] = str;
		// 履歴に残るのは現在レイヤの表ページだけ（本家 TxtLayer.ts:604 `if (this.isCur)`に対応。
		//	本家はisCurが同名レイヤの表裏どちらにも立つが、こちらは表だけに絞る——
		//	[clear_text]の改ページ判定（nm===#curTxtLayer && pg==='fore'）と条件を揃えるため）
		if (rec && this.#doRecLog && nm === this.#curTxtLayer && page === 'fore') this.#log.add(add);	// 履歴（本家 TxtLayer.ts:604 recText）
		aAct.push({t: 'chgStr', nm, page, str});
	}

	// 履歴の改ページ（本家 Log.pagebreak()）。**既定文字レイヤの表ページの本文が
	//	捨てられる箇所すべて**で呼ぶ＝本家が TxtLayer.clearText()／LayerMng の
	//	`#clear_text`・`[page]`・[current]切替 で呼ぶのと同じ地点。
	//	`#hTxt`を空にするのと対で書くこと（片方だけだと履歴が繋がったまま／消えたままになる）
	#recPagebreak() {this.#log.pagebreak()}

}
