/* ***** BEGIN LICENSE BLOCK *****
Copyright (c) 2026-2026 Famibee (famibee.blog38.fc2.com)

This software is released under the MIT License.
http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

// プラグイン（addTag）が追加したタグのScriptEngine側の扱い。実際のタグ関数呼び出しは
//	ScriptMng側（純粋性を保つため。src/sn/PlgTag.ts参照）なので、ここではエンジンだけで
//	完結する部分＝登録済み名かどうかの判定・plgTagアクションでの丸ごと転送・
//	既存タグ名との衝突検査を確認する

import {ScriptEngine} from '../src/ts/ScriptEngine';
import {clearPlgTag} from '../src/sn/PlgTag';

import {afterEach, expect, it} from 'bun:test';


afterEach(()=> {
	clearPlgTag();
});


it('addTag_registeredTagEmitsPlgTagAndStops', ()=> {
	ScriptEngine.registerPlgTag('dmy_tag', ()=> false);
	const se = new ScriptEngine('t1', '[dmy_tag foo=bar][s]');
	const a = se.step();
	// 未登録タグと違い黙って無視されず、属性ハッシュを丸ごとplgTagアクションへ積んでstep()を打ち切る
	//	（[s]は次のstep()呼び出しで処理される。layPlgと同じ「エンジンは中身を解釈しない」設計）
	expect(a).toEqual([{t: 'plgTag', name: 'dmy_tag', hArg: {foo: 'bar'}}]);
});

it('addTag_unregisteredTagIsIgnoredLikeBefore', ()=> {
	// 未登録タグは従来通り無視（マクロでもプラグインタグでもなければ黙ってskip）
	const se = new ScriptEngine('t1', '[unknown_tag foo=bar][s]');
	const a = se.step();
	expect(a).toEqual([{t: 'stop', kind: 's', key: 't1:2', nm: 'mes'}]);
});

it('addTag_reservedTagNameThrows', ()=> {
	// 既存タグ名との衝突は本家 `if (name in hTag) throw` と同じ意図で弾く
	expect(()=> ScriptEngine.registerPlgTag('lay', ()=> false))
		.toThrow('[lay]は既存タグ名のため、プラグインタグとして登録できません');
});

it('addTag_duplicateNameThrows', ()=> {
	ScriptEngine.registerPlgTag('dmy_tag', ()=> false);
	expect(()=> ScriptEngine.registerPlgTag('dmy_tag', ()=> false))
		.toThrow('すでに定義済みのタグ[dmy_tag]です');
});
