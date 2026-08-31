/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2026-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

// [add_fx]/[clear_fx]/[wait_fx]/[pause_fx]/[resume_fx]：立ち絵・背景（grp レイヤ）へシェーダ
//	エフェクトを重ねる**分家独自機能**（2026-08-28 正式化）。ANIMATION_RESEARCH.md §7。
//	・対象指定（layer=/page=）は [add_filter] に、記述子スタック（aFx[]）も [add_filter] の aFlt に倣う
//	・fx= はプリセット名のみ。組み込み（wave|rgbShift|snow|rain）か、[def_fx name= glsl=] で
//	  事前定義したユーザープリセット名。生 glsl= は [add_fx] では受けない（2026-08-31 に分離）。
//	  → セーブファイル（aFx）には fx 名しか載らず、GLSL 本体は起動スクリプトの [def_fx] 再実行で
//	    埋め直す運用（[add_face] と同じ思想。src/ts/fxRegistry.ts、ANIMATION_RESEARCH.md §7）
//	・基本画像（静止画・アニメ png シート・動画）＋ face 差分合成（aFace）を GrpLayer の
//	  makeFxSource() が 2D canvas へ合成してからシェーダへ通す（sheet/動画は毎フレーム）
//
//	ここは DOM も WebGL も触らない純粋部分（本家 Filter.ts の bldFilter() と同じ役回り）。
//	エンジンから呼べるので fx 名・パラメータの書き間違いをその場で例外にできる。
//	GLSL 本体（プリセットのフラグメントシェーダ）と WebGL ランナーは lazy import の
//	src/ts/fxPresets.ts / src/ts/FxRunner.ts 側にあり、[add_fx] が使われるまで読まれない。
//
//	[def_fx glsl=] の契約は [trans glsl=]（TransGlsl.ts、本家サンプル glsl_slide 準拠）と名前を揃える
//	＝分家内で 1 回学べば両方書ける：
//	  uniform sampler2D uSampler      … 入力画像（前パスの結果 or 基本画像）
//	  varying vec2      vTextureCoord … 正規化 UV（0..1、y-up。※[trans] 側は y-down）
//	  uniform float     tick          … 経過秒 × speed=（0 起点）
//	  uniform vec2      resolution    … canvas 実ピクセルサイズ
//	  ＋ プリセット固有 uniform（amp/freq/shift。作者が uniform 宣言し [add_fx] で値を渡す）
//	[def_fx] は組み込みプリセットと同じく **HEAD（precision／上記共通 uniform／varying の宣言）を
//	FxRunner が前置する**（[trans glsl=] は自前で書くが、[def_fx] は「プリセット追加」なので統一）。
//	作者が書くのは main() と固有 uniform だけ（共通分を再宣言するとコンパイルエラー）。
//	Shadertoy（iTime/iChannel0…）は開発時に手変換（マッピングは docs/tag.html）。

// プリセット名。GLSL 実体は fxPresets.ts（lazy）が持つ。ここは名前の台帳だけ
export const A_FX_PRESET = ['wave', 'rgbShift', 'snow', 'rain'] as const;

// プリセット固有パラメータの既定値（**属性の既定値は 1 箇所**：ここがエンジン入口）。
//	amp/freq/shift はプリセットごとに意味が違う（tag.html 参照）：
//	  wave  … amp=px 振幅 / freq=縦の波の本数
//	  rgbShift … shift=px ずらし量
//	  snow … amp=落下速度倍率 / freq=密度（層数）。背景（bg）レイヤ向け
//	  rain … amp=落下速度 / freq=密度（弱雨 2 〜 豪雨 8+。曇天・雨幕・シア角も連動）/ shift=雨脚の長さ
const H_FX_DEF: {readonly [fx: string]: {readonly [k: string]: number}} = {
	wave		: {amp: 6, freq: 2},
	rgbShift	: {shift: 4},
	snow		: {amp: 1, freq: 3},
	rain		: {amp: 2, freq: 2, shift: 6},
};
// プリセットが読むスカラパラメータ名（この範囲だけ args から拾う）。
//	amp/freq/shift … 組み込みプリセットが意味を持って使う（tag.html 参照）
//	p1〜p4 … [def_fx] 作者向けの汎用入力ポート（意味は作者が決める。未指定は 0）
//	増やすときはここへ 1 語足すだけ（FxRunner.ts は A_FX_PARAM を import して総なめする）
export const A_FX_PARAM = ['amp', 'freq', 'shift', 'p1', 'p2', 'p3', 'p4'] as const;

// color= を uniform vec3 color（0..1 RGB）へ。'#rrggbb' / '0xrrggbb' / 'r,g,b'（各 0..1）を受ける
function parseRGB(v: string): readonly [number, number, number] {
	const s = v.trim();
	if (s.includes(',')) {
		const a = s.split(',').map(t=> Number(t.trim()));
		if (a.length === 3 && a.every(n=> Number.isFinite(n))) {
			return [a[0]!, a[1]!, a[2]!].map(n=> Math.min(1, Math.max(0, n))) as unknown as [number, number, number];
		}
		throw `[add_fx] color= の値が不正です：${v}`;
	}
	const hex = s.startsWith('#') ? s.slice(1) : s.startsWith('0x') ? s.slice(2) : s;
	const n = parseInt(hex, 16);
	if (hex.length !== 6 || ! Number.isFinite(n)) throw `[add_fx] color= の値が不正です：${v}`;
	return [(n >> 16 & 255) / 255, (n >> 8 & 255) / 255, (n & 255) / 255];
}

// エフェクト記述子 1 件。plain data だけ（structuredClone／JSON 化を通すため。aFlt と同じ）
export type T_FX = {
	name	: string;	// そのレイヤの aFx 内で一意な識別子。''＝無名で、store の chgFx が
						//	`#fxN`（レイヤスコープ採番）を振る。#fxN はシナリオから書けない＝[clear_fx name=]
						//	では実質狙えず、layer= 単位のクリアでのみ落ちる
	fx		: string;	// プリセット名（組み込み A_FX_PRESET か [def_fx] で定義したユーザー名）。
						//	GLSL 本体は焼かない＝[save] には fx 名しか載らない（fxRegistry.ts）
	time	: number;	// ms。0 で無限（常時ゆらぎ）。>0 で time 経過後は素通し（試作では記述子の自動撤去はしない）
	speed	: number;	// 速度倍率
	enabled	: boolean;	// [pause_fx]/[resume_fx]。false でそのパスの rAF を止める（記述子は残す。tick は凍結）
	params	: {[k: string]: number};	// スカラ入力ポート（amp/freq/shift/p1〜p4。A_FX_PARAM の範囲）
	color?	: readonly [number, number, number];	// color=（uniform vec3 color。0..1 RGB）。未指定は uniform へ vec3(0)
};

function num(args: {[k: string]: string}, k: string, def: number): number {
	const v = args[k];
	if (v === undefined) return def;
	const n = Number(v);
	if (! Number.isFinite(n)) throw `[add_fx] ${k} の値が不正です：${v}`;
	return n;
}

// hDefFx＝[def_fx] で定義済みのユーザープリセット名の台帳（ScriptEngine.#hDefFx）。
//	純粋部分なので Set でなく「キーの有無」だけ見る緩い型で受ける（テストからは省略可）
export function bldFx(args: {[k: string]: string}, hDefFx?: {readonly [name: string]: unknown}): T_FX {
	const fx = args.fx ?? '';
	if (! fx) throw '[add_fx] fx=（プリセット名）が必要です';
	if (! (A_FX_PRESET as readonly string[]).includes(fx) && ! (hDefFx && fx in hDefFx)) {
		throw `[add_fx] fx【${fx}】は未対応です（組み込み：${A_FX_PRESET.join(' / ')}／または [def_fx] で定義した名前）`;
	}

	// ユーザープリセット（[def_fx]）は固有既定値を持たない（H_FX_DEF[それ] は undefined ＝ params は {}）
	const params: {[k: string]: number} = {...H_FX_DEF[fx]};
	for (const k of A_FX_PARAM) if (args[k] !== undefined) params[k] = num(args, k, 0);

	return {
		name	: args.name ?? '',
		fx,
		time	: num(args, 'time', 0),
		speed	: num(args, 'speed', 1),
		enabled	: (args.enabled ?? 'true') !== 'false',	// [add_fx enabled=false] で止まった状態から始めることも一応可
		params,
		...(args.color !== undefined ? {color: parseRGB(args.color)} : {}),
	};
}
