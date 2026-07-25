/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2026-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

// ルール画像による[trans]（ワイプ）のうち、DOMもGSAPも触らない部分。
//	本家 LayerMng.ts:548 のフラグメントシェーダ #srcRuleTransFragment を、
//	WebGLを使わずSVGフィルタ＋CSSマスクへ置き換えるための計算だけをここへ分ける。
//
//	**「時間を進める機構」と「進度→見た目」を切り離すのが目的**：
//	進度（tick）を受け取って見た目を決めるのがこのファイルの純粋関数、
//	tickを0→1へ動かすのがStage側のGSAP。こうしておくと
//	・進度の計算は単体テストで全域を確かめられる（test/Trans.test.ts）
//	・E2Eは任意の進度を流し込んで画を撮れる（時間待ちに頼らない）
//	という切り分けになる。


// 本家シェーダの意味（rule画像の赤チャンネルを R、進度を tick とする）：
//	v = R - tick
//	|v| < vague なら 透明度 = 0.5 + v/vague*0.5 （＝-vagueで0、+vagueで1の直線）
//	そうでなければ v >= 0 で不透明、v < 0 で透明
//	つまり全域が「Rの一次関数を0〜1で頭打ちにしたもの」で書ける：
//		alpha = clamp(R/(2*vague) + (vague - tick)/(2*vague), 0, 1)
//	SVGフィルタの feFuncA type="linear"（A' = slope*A + intercept。結果は0〜1へクランプされる）が
//	そのままこの形なので、tickとvagueからslope/interceptを出せば同じ絵になる。
//
//	**Rが大きい（明るい）ところほど後まで残る**：tickが上がると R < tick の領域から順に
//	表ページが消えて裏ページが現れる

export const VAGUE_DEF = 0.04;	// 本家 argChk_Num(hArg, 'vague', 0.04)

// vague=0（境界をぼかさない）は上式が0除算になるので、十分大きい傾き＝事実上の階段関数にする。
//	本家は `abs(v) < vague` が常に偽になり、R >= tick で不透明・未満で透明の階段になる
const SLOPE_MAX = 1e6;

export type T_RULE_MASK = {
	slope		: number;	// feFuncA の slope
	intercept	: number;	// feFuncA の intercept
};

export function ruleMaskFunc(tick: number, vague = VAGUE_DEF): T_RULE_MASK {
	const slope = vague > 0 ? Math.min(1 / (2 * vague), SLOPE_MAX) : SLOPE_MAX;
	return {slope, intercept: 0.5 - slope * tick};
}
