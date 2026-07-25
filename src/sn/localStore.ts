/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2026-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

// store.js互換の薄いlocalStorageラッパー（本家 skynovel_esm/src/sn/localStore.ts をそのまま移植）。
//	本家のコメントいわく、store.jsは9年更新なし＋json2.js内でevalを使うためeval警告が出るので置き換えたもの。
//	単純なget/setのみ対応。**これがあるのでnpmの`store`パッケージは要らない**

export default {
	get(key: string): unknown {
		const raw = localStorage.getItem(key);
		if (raw == null) return undefined;
		try {return JSON.parse(raw)}
		catch {return undefined}
	},
	set(key: string, value: unknown): void {
		localStorage.setItem(key, JSON.stringify(value));
	},
	remove(key: string): void {
		localStorage.removeItem(key);
	},
};
