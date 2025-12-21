/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2019-2025 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */


export type TArg = {
	':タグ名'?	: string;
	canskip?	: boolean;

	layer?	: string;	// レイヤ系
	class?	: string;
	index?	: number;
	dive?	: string;
	page?	: string;
	alpha?	: number;
	pivot_x?: number;
	pivot_y?: number;
	rotation?	: number;
	scale_x?: number;
	scale_y?: number;
	visible?: boolean;
	blendmode?	: string;

	left?	: number;
	top?	: number;
	width?	: number;
	height?	: number;
	pl?		: number;
	pr?		: number;
	pt?		: number;
	pb?		: number;

	rotate?	: number;
	in_style?	: string;
	out_style?	: string;
	ffs?	: string;
	noffs?	: string;
	kinsoku_sol?	: string;
	kinsoku_eol?	: string;
	kinsoku_dns?	: string;
	kinsoku_bura?	: string;
	bura?	: boolean;
	break_fixed?		: boolean;
	break_fixed_left?	: number;
	break_fixed_top?	: number;

	time?	: number;
	rule?	: string;
	glsl?	: string;
	render?	: boolean;

	pos?	: string;
	text?	: string;
	wait?	: number;
	record?	: boolean;
	pic?	: string;
	enabled?: boolean;
	hint?		: string;
	hint_style?	: string;
	hint_opt?	: string;
	clickse?	: string;
	enterse?	: string;
	leavese?	: string;
	clicksebuf?	: string;
	entersebuf?	: string;
	leavesebuf?	: string;
	onenter?	: string;
	onleave?	: string;

	t?	: string;
	r?	: string;
	exp?	: string;
	char?	: string;
	sesame?	: string;
	cast?	: string;
	val?	: string;
	flags?	: string;
	reg?	: string;
	len?	: string;
	url?	: string;
	format?	: string;
	chain?	: string;
	path?	: string;

	fn?		: string;
	face?	: string;
	label?	: string;
	call?	: boolean;
	global?	: boolean;
	name?	: string;
	clear_local_event?	: boolean;

	style?			: string;
	style_hover?	: string;
	style_clicked?	: string;
	r_style?		: string;
	r_style_hover?	: string;
	r_style_clicked?: string;
	r_align?	: string;

	b_width?	: string;
	b_height?	: string;
	b_color?	: string;
	b_alpha?	: number;
	b_alpha_isfixed?	: boolean;
	b_pic?		: string;
	back_clear?	: string;

	max_col?	: string;
	max_row?	: string;
	bura_col?	: string;
	chk_overrow?	: string;

	dx?	: number;
	dy?	: number;

	key?	: string;
	type?	: string;	// 3Dレイヤで使用
	camera_target?	: string;

	arg?	: TArg;
	fnc?	: ()=> void;

	filter?	: string;
	matrix?	: string;
	clear_filter?	: boolean;
	enable_filter?	: boolean;

	ease?	: string;

	centering?	:boolean;
	x?		: number | string;
	y?		: number | string;

	id?			: string;
	src?		: string;
	var_name?	: string;
	set_fnc?	: string;
	break_fnc?	: string;

	from?	: number;
	to?		: number | string;
	place?	: number;
	add?	: string;
	del?	: string;

	buf?	: string;	// 音系
	buf2?	: string;
	loop?	: boolean;
	volume?	: number;
	ret_ms?	: number;
	end_ms?	: number;
	join?	: boolean;
	do_rec?	: boolean;
	pan?	: number;
	stop?	: boolean;

	clear?	: boolean;

	// デザインモード
	':id_dc'?	: string;
	':id_tag'?	: string;
	':path'?	: string;
	':ln'?		: number;
	':col_s'?	: number;
	':col_e'?	: number;
	':idx_tkn'?	: number;
	':token'?	: string;
	':redraw'?	: boolean;
	design_unit?: boolean;	// デザインモードでこのマクロへの引数変更とするか（内部をサーチさせない）

//	stepin?		: boolean;		// 拡張機能のみ使用：false指定でステップインしない
//	nowarn_unused?	: boolean;	// 拡張機能のみ使用：未使用警告を出さない
}
export type TTag = (hArg: TArg) => boolean;
export type T_HTag = {
// 変数操作
	clearsysvar			: TTag;	// システム変数の全消去
	clearvar			: TTag;	// ゲーム変数の全消去
	let_abs				: TTag;	// 絶対値
	let_char_at			: TTag;	// 文字列から一字取りだし
	let_index_of		: TTag;	// 文字列で検索
	let_length			: TTag;	// 文字列の長さ
	let_ml				: TTag;	// インラインテキスト代入
	let_replace			: TTag;	// 正規表現で置換
	let_round			: TTag;	// 四捨五入
	let_search			: TTag;	// 正規表現で検索
	let_substr			: TTag;	// 文字列から抜きだし
	let					: TTag;	// 変数代入・演算

// レイヤ共通
	add_lay				: TTag;	// レイヤを追加する
	clear_lay			: TTag;	// レイヤ設定の消去
	finish_trans		: TTag;	// トランス強制終了
	lay					: TTag;	// レイヤ設定
	trans				: TTag;	// ページ裏表を交換
	wt					: TTag;	// トランス終了待ち
	add_filter			: TTag;	// フィルター追加
	clear_filter		: TTag;	// フィルター全削除
	enable_filter		: TTag;	// フィルター個別切替

// トゥイーンアニメ
	pause_tsy			: TTag;	// 一時停止
	resume_tsy			: TTag;	// 一時停止再開
	stop_tsy			: TTag;	// トゥイーン中断
	tsy					: TTag;	// トゥイーン開始
	wait_tsy			: TTag;	// トゥイーン終了待ち

// 文字・文字レイヤ
	autowc				: TTag;	// 文字ごとのウェイト
	ch					: TTag;	// 文字を追加する
	ch_in_style			: TTag;	// 文字出現演出定義
	ch_out_style		: TTag;	// 文字消去演出定義
	clear_text			: TTag;	// 文字消去
	current				: TTag;	// デフォルト文字レイヤ設定
	endlet_ml			: TTag;	// インラインテキスト代入の終端
	endlink				: TTag;	// ハイパーリンクの終了
	er					: TTag;	// ページ両面の文字消去
	graph				: TTag;	// インライン画像表示
	link				: TTag;	// ハイパーリンク
	r					: TTag;	// 改行
	rec_ch				: TTag;	// 履歴書き込み
	rec_r				: TTag;	// 履歴改行
	reset_rec			: TTag;	// 履歴リセット
	ruby2				: TTag;	// 文字列と複数ルビの追加
	set_focus			: TTag;	// フォーカス移動
	span				: TTag;	// インラインスタイル設定
	tcy					: TTag;	// 縦中横を表示する

// 画像・画像レイヤ
	add_face			: TTag;	// 差分名称の定義
	wv					: TTag;	// 動画再生終了待ち

// HTMLフレーム
	add_frame			: TTag;	// フレーム追加
	frame				: TTag;	// フレームに設定
	let_frame			: TTag;	// フレーム変数を取得
	set_frame			: TTag;	// フレーム変数に設定
	tsy_frame			: TTag;	// フレームをトゥイーン開始

// イベント
	clear_event			: TTag;	// イベントを全消去
	enable_event		: TTag;	// イベント有無の切替
	event				: TTag;	// イベントを予約
	l					: TTag;	// 行末クリック待ち
	p					: TTag;	// 改ページクリック待ち
	s					: TTag;	// 停止する
	set_cancel_skip		: TTag;	// スキップ中断予約
	wait				: TTag;	// ウェイトを入れる
	waitclick			: TTag;	// クリックを待つ

// ＢＧＭ・効果音
	fadebgm				: TTag;	// BGMのフェード
	fadeoutbgm			: TTag;	// BGMのフェードアウト
	fadeoutse			: TTag;	// 効果音のフェードアウト
	fadese				: TTag;	// 効果音のフェード
	playbgm				: TTag;	// BGM の演奏
	playse				: TTag;	// 効果音の再生
	stop_allse			: TTag;	// 全効果音再生の停止
	stopbgm				: TTag;	// BGM 演奏の停止
	stopfadese			: TTag;	// 音声フェードの停止
	stopse				: TTag;	// 効果音再生の停止
	volume				: TTag;	// BGMや効果音の音量を指定
	wb					: TTag;	// BGM フェードの終了待ち
	wf					: TTag;	// 効果音フェードの終了待ち
	wl					: TTag;	// BGM 再生の終了待ち
	ws					: TTag;	// 効果音再生の終了待ち
	xchgbuf				: TTag;		// サウンドバッファの交換

// 条件分岐
	else				: TTag;	// その他ifブロック開始
	elsif				: TTag;	// 別条件のifブロック開始
	endif				: TTag;	// ifブロックの終端
	if					: TTag;	// ifブロックの開始

// ラベル・ジャンプ
	button				: TTag;	// ボタンを表示
	call				: TTag;	// サブルーチンコール
	jump				: TTag;	// シナリオジャンプ
	page				: TTag;	// ページ移動
	pop_stack			: TTag;	// コールスタック破棄
	return				: TTag;	// サブルーチンから戻る

// マクロ
	bracket2macro		: TTag;	// 括弧マクロの定義
	char2macro			: TTag;	// 一文字マクロの定義
	endmacro			: TTag;	// マクロ定義の終了
	macro				: TTag;	// マクロ定義の開始

// しおり
	copybookmark		: TTag;	// しおりの複写
	erasebookmark		: TTag;	// しおりの消去
	load				: TTag;	// しおりの読込
	record_place		: TTag;	// セーブポイント指定
	reload_script		: TTag;	// スクリプト再読込
	save				: TTag;	// しおりの保存

// 画面揺らし
	quake				: TTag;	// 画面を揺らす
	stop_quake			: TTag;	// 画面揺らし中断
	wq					: TTag;	// 画面揺らし終了待ち

// システム
	close				: TTag;	// アプリの終了
	export				: TTag;	// プレイデータをエクスポート
	import				: TTag;	// プレイデータをインポート
	loadplugin			: TTag;	// プラグインの読み込み
	navigate_to			: TTag;	// ＵＲＬを開く
	snapshot			: TTag;	// スナップショット
	title				: TTag;	// タイトル指定
	toggle_full_screen	: TTag;	// 全画面状態切替
	update_check		: TTag;	// 更新チェック機能
	window				: TTag;	// アプリウインドウ設定

// デバッグ・その他
	dump_lay			: TTag;	// レイヤのダンプ
	dump_script			: TTag;	// 外部へスクリプトを表示
	dump_stack			: TTag;	// スタックのダンプ
	dump_val			: TTag;	// 変数のダンプ
	log					: TTag;	// ログ出力
	trace				: TTag;	// デバッグ表示へ出力
}
