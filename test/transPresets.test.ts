/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2026-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

// [trans glsl=] のプリセット・トランジションシェーダ（分家独自。ANIMATION_RESEARCH.md §7）。
//	ここは純粋部分だけ：名前→シェーダの解決。GLSL のコンパイル・見た目は test/e2e/trans.e2e.ts。

import {A_TRANS_PRESET, resolveTransGlsl} from '../src/ts/transPresets';

import {expect, it} from 'bun:test';


it('resolveTransGlsl_プリセット名はシェーダ本体に化ける', ()=> {
	expect(A_TRANS_PRESET).toEqual(['blur', 'mosaic']);
	for (const name of A_TRANS_PRESET) {
		const src = resolveTransGlsl(name);
		expect(src).not.toBe(name);
		expect(src).toContain('void main');
		expect(src).toContain('gl_FragColor');
		expect(src).toContain('uniform float tick');
	}
});

it('resolveTransGlsl_プリセット名でなければソースをそのまま返す', ()=> {
	const raw = 'precision mediump float;void main(){gl_FragColor=vec4(1.0);}';
	expect(resolveTransGlsl(raw)).toBe(raw);
	// 空文字・未知名もそのまま（TransGlsl.ts 側で link 時にコンパイルエラーになる）
	expect(resolveTransGlsl('')).toBe('');
	expect(resolveTransGlsl('slide')).toBe('slide');
});
