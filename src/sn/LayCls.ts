/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2018-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

// レイヤcls（[add_lay class=…]の値）→ 生成関数のレジストリ。
//	本家 skynovel_esm/src/sn/SysBase.ts の `hFactoryCls`（グリッドの実体はSysBaseの
//	インスタンスフィールド）に相当するが、bluesnovelでは
//	・ScriptEngine（sysを持たない純粋エンジン）が[add_lay]の妥当性検査に引く
//	・Stage.tsx/PlgLayMngが実体生成に引く
//	・SysBase.#initPlg()がプラグインのaddLayCls呼び出し先として渡す
//	の3者から見える必要があるため、SysBaseのインスタンスでなくモジュールレベルのMapに置く
//	（todo.md「sn_galleryをbluesnovel駆動にする」参照）。
//	組み込み2種（grp/txt）はReactコンポーネント（GrpLayer/TxtLayer）で実装されており
//	Layer工場の形に乗らないため、ここには「予約済みのキー」としてのみ登録し工場は持たない

import type {Layer} from './Layer';

export type T_LayerFactory = ()=> Layer;
export const A_BUILTIN_LAY_CLS = ['grp', 'txt'] as const;

const hFactoryCls = new Map<string, T_LayerFactory | null>(
	A_BUILTIN_LAY_CLS.map(c=> [c, null]));

// プラグイン（3D/Live2D等）がcls名を登録する。本家 SysBase.ts の addLayCls と同じ役割
export function addLayCls(cls: string, fnc: T_LayerFactory): void {
	if (hFactoryCls.has(cls)) throw `すでに定義済みのレイヤcls【${cls}】です`;
	hFactoryCls.set(cls, fnc);
}
// 組み込み2種（grp/txt）はundefinedを返す（Layer工場を持たないため）。
//	呼び出し側（PlgLayMng.add）はプラグインclsだけを対象にするのでこれで足りる
export function getLayCls(cls: string): T_LayerFactory | undefined {
	return hFactoryCls.get(cls) ?? undefined;
}
// grp/txt含め、[add_lay class=]に指定可能なclsかどうか
export function hasLayCls(cls: string): boolean {
	return hFactoryCls.has(cls);
}
// テスト用リセット（プラグイン登録分だけ消し、組み込み2件へ戻す）。
//	addLayClsは重複登録をthrowするため、テスト間でこれを呼ばないと2回目のregisterで落ちる
export function clearPlgLayCls(): void {
	hFactoryCls.clear();
	for (const c of A_BUILTIN_LAY_CLS) hFactoryCls.set(c, null);
}
