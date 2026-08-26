/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2026-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

// PlgLayMng.record()/playback()（しおりへのプラグインレイヤー配線。todo.md
//	「しおり（save/load）にプラグインレイヤーの中身が乗らない」対応）。
//	実Layer（document.createElement()を持つ）はbun testにDOMが無いため使えないので、
//	ScriptEngine_layplg.test.tsと同じくLayer形の偽物をaddLayClsへ登録して検証する

import {addLayCls, clearPlgLayCls} from '../src/sn/LayCls';
import type {Layer, T_RecordPlayBack_lay} from '../src/sn/Layer';
import {PlgLayMng, type T_RecordPlayBack_plgLay} from '../src/ts/PlgLayMng';

import {afterEach, beforeEach, expect, it} from 'bun:test';


// record()/playback()が実際に中身をやり取りできているかを見るため、layname以外に
//	任意の状態（extra）を1つ持たせる
class DmyLayer {
	layname = '';
	name = '';
	extra = 'init';
	destroyed = false;
	lay(): boolean {return false}
	clearLay(): void { /* empty */ }
	record(): T_RecordPlayBack_lay {return {name: this.layname, idx: 0, extra: this.extra}}
	playback(h: T_RecordPlayBack_lay): void {this.extra = h.extra as string}
	dump(): string {return ''}
	destroy(): void {this.destroyed = true}
}

beforeEach(()=> {
	addLayCls('dmy', ()=> new DmyLayer() as unknown as Layer);
});
afterEach(()=> {
	clearPlgLayCls();
});


it('record_aggregatesForeAndBackPerLayerName', ()=> {
	const mng = new PlgLayMng();
	mng.add('x', 'dmy');

	const h = mng.record();
	expect(Object.keys(h)).toEqual(['x']);
	expect(h.x).toEqual({
		cls		: 'dmy',
		fore	: {name: 'x', idx: 0, extra: 'init'},
		back	: {name: 'x', idx: 0, extra: 'init'},
	});
});

it('playback_restoresContentIntoExistingLayer', ()=> {
	const mng = new PlgLayMng();
	mng.add('x', 'dmy');
	const h = mng.record();
	h.x!.fore.extra = 'restored-fore';
	h.x!.back.extra = 'restored-back';

	mng.playback(h, []);

	const h2 = mng.record();
	expect(h2.x!.fore.extra).toBe('restored-fore');
	expect(h2.x!.back.extra).toBe('restored-back');
});

it('playback_reAddsLayerMissingFromCurrentState', ()=> {
	// [load]で「今は無いが、しおり側にはあるプラグインレイヤー」を復元するケース
	const mng = new PlgLayMng();
	const h: T_RecordPlayBack_plgLay = {
		x: {cls: 'dmy', fore: {name: 'x', idx: 0, extra: 'a'}, back: {name: 'x', idx: 0, extra: 'b'}},
	};

	mng.playback(h, []);

	const h2 = mng.record();
	expect(h2.x!.cls).toBe('dmy');
	expect(h2.x!.fore.extra).toBe('a');
	expect(h2.x!.back.extra).toBe('b');
});

it('playback_destroysLayerAbsentFromTargetMark', ()=> {
	// [load]で「今はあるが、しおり側には無いプラグインレイヤー」は消える（store側のaPage丸ごと
	//	置換で消えるのと同じ結果にする）
	const mng = new PlgLayMng();
	mng.add('x', 'dmy');

	mng.playback({}, []);

	expect(mng.record()).toEqual({});
});

it('playback_undefinedMarkTreatedAsEmpty', ()=> {
	// hPlgLayが無い古いしおりを読んだ場合（optionalフィールド）
	const mng = new PlgLayMng();
	mng.add('x', 'dmy');

	mng.playback(undefined, []);

	expect(mng.record()).toEqual({});
});
