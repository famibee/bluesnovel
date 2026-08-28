/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2026-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

// [add_fx]/[clear_fx]/[wait_fx]/[pause_fx]/[resume_fx]：立ち絵・背景（grp レイヤ）へシェーダ
//	エフェクトを重ねる**分家独自機能**（2026-08-28 正式化）。ANIMATION_RESEARCH.md §7。
//	・対象指定（layer=/page=）は [add_filter] に、記述子スタック（aFx[]）も [add_filter] の aFlt に倣う
//	・fx=wave|rgbShift（プリセット）か、glsl=（生フラグメントシェーダ）のどちらか
//	・face 差分合成（aFace）はまだ通さない＝基本画像（fn）だけにかかる
//
//	ここは DOM も WebGL も触らない純粋部分（本家 Filter.ts の bldFilter() と同じ役回り）。
//	エンジンから呼べるので fx 名・パラメータの書き間違いをその場で例外にできる。
//	GLSL 本体（プリセットのフラグメントシェーダ）と WebGL ランナーは lazy import の
//	src/ts/fxPresets.ts / src/ts/FxRunner.ts 側にあり、[add_fx] が使われるまで読まれない。
//
//	生 glsl= の契約は [trans glsl=]（TransGlsl.ts、本家サンプル glsl_slide 準拠）と名前を揃える
//	＝分家内で 1 回学べば両方書ける：
//	  uniform sampler2D uSampler      … 入力画像（前パスの結果 or 基本画像）
//	  varying vec2      vTextureCoord … 正規化 UV（0..1、y-up。※[trans] 側は y-down）
//	  uniform float     tick          … 経過秒 × speed=（0 起点）
//	  uniform vec2      resolution    … canvas 実ピクセルサイズ
//	  ＋ プリセット固有 uniform（amp/freq/shift）
//	シェーダは precision 宣言・varying/uniform 宣言まで自前で書く（[trans glsl=] と同じ。HEAD 注入はしない）。
//	Shadertoy（iTime/iChannel0…）は開発時に手変換（マッピングは docs/tag.html）。

// プリセット名。GLSL 実体は fxPresets.ts（lazy）が持つ。ここは名前の台帳だけ
export const A_FX_PRESET = ['wave', 'rgbShift', 'snow', 'rain'] as const;

// プリセット固有パラメータの既定値（**属性の既定値は 1 箇所**：ここがエンジン入口）。
//	amp/freq/shift はプリセットごとに意味が違う（tag.html 参照）：
//	  wave  … amp=px 振幅 / freq=縦の波の本数
//	  rgbShift … shift=px ずらし量
//	  snow/rain … amp=落下速度倍率 / freq=密度（層数・帯数の目安）。背景（bg）レイヤ向け
const H_FX_DEF: {readonly [fx: string]: {readonly [k: string]: number}} = {
	wave		: {amp: 6, freq: 2},
	rgbShift	: {shift: 4},
	snow		: {amp: 1, freq: 3},
	rain		: {amp: 1, freq: 2},
};
// プリセットが読むパラメータ名（この範囲だけ args から拾う）
const A_FX_PARAM = ['amp', 'freq', 'shift'] as const;

// エフェクト記述子 1 件。plain data だけ（structuredClone／JSON 化を通すため。aFlt と同じ）
export type T_FX = {
	name	: string;	// そのレイヤの aFx 内で一意な識別子。''＝無名で、store の chgFx が
						//	`#fxN`（レイヤスコープ採番）を振る。#fxN はシナリオから書けない＝[clear_fx name=]
						//	では実質狙えず、layer= 単位のクリアでのみ落ちる
	fx		: string;	// プリセット名。glsl 指定時は ''
	glsl	: string;	// 生フラグメントシェーダ（fx='' のとき。契約は [trans glsl=] と同じ＝上のヘッダ参照）。
						//	[add_filter] と同じ「消すまで永続」なので解決済み文字列をそのまま焼く（[save] にも載る）
	time	: number;	// ms。0 で無限（常時ゆらぎ）。>0 で time 経過後は素通し（試作では記述子の自動撤去はしない）
	speed	: number;	// 速度倍率
	enabled	: boolean;	// [pause_fx]/[resume_fx]。false でそのパスの rAF を止める（記述子は残す。tick は凍結）
	params	: {[k: string]: number};	// プリセット固有（amp/freq/shift…）
};

function num(args: {[k: string]: string}, k: string, def: number): number {
	const v = args[k];
	if (v === undefined) return def;
	const n = Number(v);
	if (! Number.isFinite(n)) throw `[add_fx] ${k} の値が不正です：${v}`;
	return n;
}

export function bldFx(args: {[k: string]: string}): T_FX {
	const fx = args.fx ?? '';
	const glsl = args.glsl ?? '';
	if (! fx && ! glsl) throw '[add_fx] fx= か glsl= のどちらかが必要です';
	if (fx && glsl) throw '[add_fx] fx= と glsl= は同時に指定できません';
	if (fx && ! (A_FX_PRESET as readonly string[]).includes(fx)) {
		throw `[add_fx] fx【${fx}】は未対応です（対応：${A_FX_PRESET.join(' / ')}／または glsl=）`;
	}

	// 生 glsl= はプリセット固有の既定値を持たない（H_FX_DEF[''] は undefined ＝ params は {}）
	const params: {[k: string]: number} = {...H_FX_DEF[fx]};
	for (const k of A_FX_PARAM) if (args[k] !== undefined) params[k] = num(args, k, 0);

	return {
		name	: args.name ?? '',
		fx, glsl,
		time	: num(args, 'time', 0),
		speed	: num(args, 'speed', 1),
		enabled	: (args.enabled ?? 'true') !== 'false',	// [add_fx enabled=false] で止まった状態から始めることも一応可
		params,
	};
}
