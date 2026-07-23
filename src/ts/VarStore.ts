/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2026-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

// 変数ストア（本家 skynovel_esm/src/sn/Variable.ts の簡略版）
//	・tmp:  一時変数（試作割り切り：ページ・スクリプトをまたいでも消えない。本来はページ等で消える）
//	・game: セーブ・ロード対象のゲーム変数（名前空間省略時は本家に合わせ"tmp:"を既定とする）
//	・sys:  ゲームシステム設定（試作ではgame同様、通常の変数として扱う）
//	・mp:   マクロ引数（マクロ呼び出し時にsetMp()で設定し、[return]/[endmacro]でcloneMp()の値へ復元）
//TODO: 本家の save: 名前空間、自動セーブ、ダーティフラグ管理はスコープ外

export type T_VAL = string | number | boolean | null;

export const A_NS = ['tmp', 'game', 'sys', 'mp'] as const;
export type T_NS = typeof A_NS[number];

export class VarStore {
	readonly #h		: {[key: string]: T_VAL} = Object.create(null);
	readonly #hBuiltin	: {[key: string]: ()=> T_VAL} = Object.create(null);

	// 組み込み変数の登録（読み取り専用・遅延評価。本家 val.defTmp() 相当）
	//	name は"tmp:"を除いたキー（例：'const.sn.scriptFn'）。常にtmp:名前空間に属する
	defBuiltin(name: string, fnc: ()=> T_VAL) {
		this.#hBuiltin[name] = fnc;
	}

	static readonly REG_NAME = /^(?:(tmp|game|sys|mp):)?(.+)$/;
	static parseName(name: string): {ns: T_NS; key: string} {
		const m = VarStore.REG_NAME.exec(name.trim());
		if (! m) throw `変数名が不正です：${name}`;
		const ns = (m[1] ?? 'tmp') as T_NS;	// 省略時の既定は本家に合わせ"tmp"
		return {ns, key: m[2]!};
	}

	get(name: string): T_VAL {
		const {ns, key} = VarStore.parseName(name);
		if (ns === 'tmp') {
			const fnc = this.#hBuiltin[key];
			if (fnc) return fnc();
		}
		const k = `${ns}.${key}`;
		return k in this.#h ? this.#h[k]! : null;	// 未定義変数の既定値はnull（本家準拠）
	}
	set(name: string, val: T_VAL) {
		const {ns, key} = VarStore.parseName(name);
		// 組み込み変数はget()と同様、tmp:名前空間の場合のみガードする
		//（game:/sys:で同名のキーを使うこと自体は許容する）
		if (ns === 'tmp' && key in this.#hBuiltin) throw `組み込み変数【${name}】へは代入できません`;
		this.#h[`${ns}.${key}`] = val;
	}

	// mp:名前空間のスナップショット・復元（マクロ呼び出し時の引数受け渡し・戻り時の復元用。
	// 本家 Variable.ts の cloneMp()/setMp() 簡略版。ScriptEngine.ts の#aCallStk[].hMp から使用）
	cloneMp(): {[key: string]: T_VAL} {
		const h: {[key: string]: T_VAL} = {};
		for (const k of Object.keys(this.#h)) if (k.startsWith('mp.')) h[k.slice(3)] = this.#h[k]!;
		return h;
	}
	setMp(h: {[key: string]: T_VAL}) {
		for (const k of Object.keys(this.#h)) if (k.startsWith('mp.')) delete this.#h[k];
		for (const k of Object.keys(h)) this.#h[`mp.${k}`] = h[k]!;
	}

	// [clearvar]相当：gameのみクリア（本家準拠でsys/tmpは対象外）
	clearGame() {
		for (const k of Object.keys(this.#h)) if (k.startsWith('game.')) delete this.#h[k];
	}
	// [clearsysvar]相当
	clearSys() {
		for (const k of Object.keys(this.#h)) if (k.startsWith('sys.')) delete this.#h[k];
	}
}
