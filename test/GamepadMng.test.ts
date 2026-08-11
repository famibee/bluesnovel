/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2026-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

// ゲームパッドのスティック軸→矢印キー名の変換（本家 EventMng.ts:282-286 の3x3表と同じ）。
//	実際のGamepad API・rAFループはブラウザが要るのでE2E化できない（focus.e2e.tsは
//	合成KeyboardEventで駆動する側＝FocusMngの検証で、この純関数の入口は通らない）

import {axisToKey, keyEventInit} from '../src/ts/GamepadMng';

import {expect, it} from 'bun:test';


it('deadZone未満は無反応', ()=> {
	expect(axisToKey(0, 0)).toBe('');
	expect(axisToKey(0.29, 0)).toBe('');
	expect(axisToKey(0, -0.29)).toBe('');
});

it('軸の値を4方向へ量子化する', ()=> {
	expect(axisToKey(0, -1)).toBe('ArrowUp');
	expect(axisToKey(0, 1)).toBe('ArrowDown');
	expect(axisToKey(-1, 0)).toBe('ArrowLeft');
	expect(axisToKey(1, 0)).toBe('ArrowRight');
});

it('しきい値ちょうどで反応する境界', ()=> {
	expect(axisToKey(0, -0.3)).toBe('ArrowUp');
	expect(axisToKey(0.3, 0)).toBe('ArrowRight');
});

it('斜め入力は無視する（本家と同じ）', ()=> {
	expect(axisToKey(1, -1)).toBe('');
	expect(axisToKey(-1, 1)).toBe('');
	expect(axisToKey(1, 1)).toBe('');
	expect(axisToKey(-1, -1)).toBe('');
});

// 合成KeyboardEventのcodeもkeyと同じ値にする（回帰テスト）。
//	`new KeyboardEvent(…, {key})`だけだとcodeは空文字のままで、Main.tsxの読み進め判定
//	（switch (e.code)）が拾えず、フォーカス無し状態でのゲームパッドOKボタンが
//	読み進めに繋がらなかった（実機報告を受けて発覚）
it('keyEventInit()はcodeもkeyと同じ値にする', ()=> {
	expect(keyEventInit('Enter')).toEqual({key: 'Enter', code: 'Enter', bubbles: true});
	expect(keyEventInit('ArrowDown')).toEqual({key: 'ArrowDown', code: 'ArrowDown', bubbles: true});
});
