/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2026-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

// ルール画像による[trans]の「進度→見た目」（src/ts/Trans.ts）。
//	比較相手は本家のフラグメントシェーダ（LayerMng.ts:548）をそのままTSへ書き写したもの。
//	SVGフィルタのfeFuncA（A' = slope*A + intercept、結果は0〜1へクランプ）に載せた式が
//	シェーダと同じ値を返すか——を全域で突き合わせる。
//	実際にマスクが掛かるか（SVG＋CSSの結線）はE2E（trans.e2e.ts）

import {ruleMaskFunc, VAGUE_DEF} from '../src/ts/Trans';

import {expect, it} from 'bun:test';


// 本家シェーダの transcription。三項演算子に潰す前の形（LayerMng.ts:574 のコメント）で書く
function glslAlpha(r: number, tick: number, vague: number): number {
	const v = r - tick;
	if (Math.abs(v) < vague) return 0.5 + v / vague * 0.5;
	return v >= 0 ? 1 : 0;
}
// こちらの実装（SVGフィルタが行う計算）
function svgAlpha(r: number, tick: number, vague?: number): number {
	const {slope, intercept} = ruleMaskFunc(tick, vague);
	return Math.min(1, Math.max(0, slope * r + intercept));
}


it('ruleMask_matchesGlslOverWholeRange', ()=> {
	// 赤チャンネルR・進度tick・vagueの全組み合わせでシェーダと一致すること
	for (const vague of [0.04, 0.01, 0.2, 0.5]) {
		for (let t = 0; t <= 1.0001; t += 0.05) {
			for (let r = 0; r <= 1.0001; r += 0.02) {
				expect(svgAlpha(r, t, vague)).toBeCloseTo(glslAlpha(r, t, vague), 6);
			}
		}
	}
});

it('ruleMask_defaultVague', ()=> {
	// 省略時は本家と同じ0.04
	expect(ruleMaskFunc(0.5)).toEqual(ruleMaskFunc(0.5, VAGUE_DEF));
	expect(VAGUE_DEF).toBe(0.04);
	expect(ruleMaskFunc(0.5).slope).toBe(12.5);	// 1/(2*0.04)
});

it('ruleMask_darkFadesFirst', ()=> {
	// **Rが大きい（明るい）ところほど後まで残る**＝暗い所から先に表ページが消える
	const t = 0.5;
	expect(svgAlpha(0.2, t)).toBe(0);	// 暗い＝もう消えた
	expect(svgAlpha(0.5, t)).toBeCloseTo(0.5, 6);	// 境界のちょうど中間
	expect(svgAlpha(0.8, t)).toBe(1);	// 明るい＝まだ残っている
});

it('ruleMask_boundaryIsVagueWide', ()=> {
	// ぼかし幅はvagueの前後（＝合計2*vague）で、その外は0か1で頭打ち
	const t = 0.5, vague = 0.1;
	expect(svgAlpha(0.5 - vague, t, vague)).toBeCloseTo(0, 6);
	expect(svgAlpha(0.5 + vague, t, vague)).toBeCloseTo(1, 6);
	expect(svgAlpha(0.5 - vague - 0.01, t, vague)).toBe(0);
	expect(svgAlpha(0.5 + vague + 0.01, t, vague)).toBe(1);
});

it('ruleMask_vagueZeroIsHardEdge', ()=> {
	// vague=0は上式が0除算になるので階段関数にする（本家も `abs(v) < vague` が常に偽＝階段）
	expect(svgAlpha(0.499, 0.5, 0)).toBe(0);
	expect(svgAlpha(0.501, 0.5, 0)).toBe(1);
});

it('ruleMask_bothEnds', ()=> {
	// tick=0では（ぼかし幅の外は）まだ全部見えていて、tick=1では全部消えている。
	//	**両端はvague幅ぶんだけ完全ではない**（本家シェーダも同じ。境界がRの端に掛かるため）
	expect(svgAlpha(0.5, 0)).toBe(1);
	expect(svgAlpha(0.5, 1)).toBe(0);
	expect(svgAlpha(0, 0)).toBe(0.5);	// 真っ黒の画素は開始時点で既に半分消えている
	expect(svgAlpha(1, 1)).toBe(0.5);	// 真っ白の画素は終了時点でまだ半分残っている
});
