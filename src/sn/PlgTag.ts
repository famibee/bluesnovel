/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2018-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

// プラグイン（3D/Live2D等）が追加するタグ名→処理関数のレジストリ。本家 SysBase.ts の
//	`hTag`（`addTag`が `hTag[name] = tag_fnc` するだけの単純な辞書）に相当するが、bluesnovelは
//	ScriptEngine.step()がタグ名をswitchで捌く構造のため、hTagのような「呼べば済む辞書」に
//	乗せられない。そこでLayCls.ts（addLayCls）と同じ形でモジュールレベルのMapに置き、
//	・ScriptEngine（sysを持たない純粋エンジン）がタグ名の妥当性検査（登録済みか）に引く
//	・ScriptMngが実際のタグ関数の呼び出しに引く（副作用はScriptMng側でのみ起こす。
//	  ScriptEngine.step()の純粋性を保つため、関数自体はここではなくScriptMngからしか呼ばない）
//	・SysBase.#initPlg()がプラグインのaddTag呼び出し先として渡す
//	の3者から見える必要がある（todo.md「addTag」参照）

import type {TTag} from './Grammar';
// TTagの戻り値は本家同様isWait（[lay]のisWait対応と同じ枠組み）。true返却時、プラグインは
//	処理完了後にT_PluginInitArg.resume()（ScriptMng.resumePlg()）を呼んで再開させる

const hPlgTag = new Map<string, TTag>();

// プラグインがタグ名を登録する。既存タグ名との衝突検査はScriptEngine.registerPlgTag()側
//	（RESERVED_TAGSを持つのがScriptEngineのため）で行う
export function addPlgTag(name: string, fnc: TTag): void {
	if (hPlgTag.has(name)) throw `すでに定義済みのタグ[${name}]です`;
	hPlgTag.set(name, fnc);
}
export function getPlgTag(name: string): TTag | undefined {
	return hPlgTag.get(name);
}
export function hasPlgTag(name: string): boolean {
	return hPlgTag.has(name);
}
// [char2macro]/[bracket2macro]のname属性検査（マクロ名として使用不可な名前の一覧作り）用
export function getPlgTagNames(): string[] {
	return [...hPlgTag.keys()];
}
// テスト用リセット（addPlgTagは重複登録をthrowするため、テスト間でこれを呼ばないと2回目のregisterで落ちる）
export function clearPlgTag(): void {
	hPlgTag.clear();
}
