/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2026-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

// [add_fx]/[clear_fx]：立ち絵（grp レイヤ）へシェーダエフェクトを重ねる**分家独自の試作**。
//	ANIMATION_RESEARCH.md §7 の「C 方式」の最小スパイク版。
//	・対象指定（layer=/page=）は [add_filter] に、記述子スタック（aFx[]）も [add_filter] の aFlt に倣う
//	・ライフサイクルは [add_fx]（開始）／[clear_fx]（撤去）の 2 タグだけ（enable/wait は後回し）
//	・face 差分合成（aFace）はまだ通さない＝基本画像（fn）だけにかかる
//
//	ここは DOM も WebGL も触らない純粋部分（本家 Filter.ts の bldFilter() と同じ役回り）。
//	エンジンから呼べるので fx 名・パラメータの書き間違いをその場で例外にできる。
//	GLSL 本体（プリセットのフラグメントシェーダ）と WebGL ランナーは lazy import の
//	src/ts/fxPresets.ts / src/ts/FxRunner.ts 側にあり、[add_fx] が使われるまで読まれない。

// プリセット名。GLSL 実体は fxPresets.ts（lazy）が持つ。ここは名前の台帳だけ
export const A_FX_PRESET = ['wave', 'rgbShift'] as const;

// プリセット固有パラメータの既定値（**属性の既定値は 1 箇所**：ここがエンジン入口）。
//	amp/shift は「px 相当」でランナーが解像度で割る。freq は縦方向の波の本数の目安
const H_FX_DEF: {readonly [fx: string]: {readonly [k: string]: number}} = {
	wave		: {amp: 6, freq: 2},
	rgbShift	: {shift: 4},
};
// プリセットが読むパラメータ名（この範囲だけ args から拾う）
const A_FX_PARAM = ['amp', 'freq', 'shift'] as const;

// エフェクト記述子 1 件。plain data だけ（structuredClone／JSON 化を通すため。aFlt と同じ）
export type T_FX = {
	name	: string;	// そのレイヤの aFx 内で一意な識別子。''＝無名で、store の chgFx が
						//	`#fxN`（レイヤスコープ採番）を振る。#fxN はシナリオから書けない＝[clear_fx name=]
						//	では実質狙えず、layer= 単位のクリアでのみ落ちる
	fx		: string;	// プリセット名。glsl 指定時は ''
	glsl	: string;	// 生フラグメントシェーダ（fx='' のとき）。本家サンプル準拠の契約は未対応（試作）＝現状は空のみ
	time	: number;	// ms。0 で無限（常時ゆらぎ）。>0 で time 経過後は素通し（試作では記述子の自動撤去はしない）
	speed	: number;	// 速度倍率
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
	if (glsl) throw '[add_fx] glsl= は未対応です（試作。プリセット fx= のみ）';
	if (! (A_FX_PRESET as readonly string[]).includes(fx)) {
		throw `[add_fx] fx【${fx}】は未対応です（対応：${A_FX_PRESET.join(' / ')}）`;
	}

	const params: {[k: string]: number} = {...H_FX_DEF[fx]};
	for (const k of A_FX_PARAM) if (args[k] !== undefined) params[k] = num(args, k, 0);

	return {
		name	: args.name ?? '',
		fx, glsl,
		time	: num(args, 'time', 0),
		speed	: num(args, 'speed', 1),
		params,
	};
}
