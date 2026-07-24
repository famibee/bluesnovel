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

import {int, uint} from '../sn/CmnLib';

export type T_VAL = string | number | boolean | null;
// 「未定義」を含む値。本家Variableに合わせ、未定義変数の取得結果はundefined（nullではない）。
//	nullは「nullという値が入っている」ことを表す。この区別は本家PropParserが
//	「1 + 未定義変数 → NaN」で未定義を検出する仕組みに必要（ExprEval.ts参照）
export type T_VAL_D = T_VAL | undefined;

export const A_NS = ['tmp', 'game', 'sys', 'mp'] as const;
export type T_NS = typeof A_NS[number];
// 本家の名前空間名は tmp/save/sys/mp。bluesnovelは'save'を'game'という名前にしているが、
//	**本家シナリオはどれも`save:`と書く**ので、別名として受けて'game'へ寄せる
//	（両方が同じ入れ物を指す。片方だけ書き換えると変数を見失うため）
const H_NS_ALIAS: {[ns: string]: T_NS} = {save: 'game'};

// [let]/[let_ml]/「&計算」書式のcast指定（本家 Variable.ts:317 #let()）
export const A_CAST = ['num', 'int', 'uint', 'bool', 'str'] as const;
export type T_CAST = typeof A_CAST[number] | '';

export class VarStore {
	readonly #h		: {[key: string]: T_VAL_D} = Object.create(null);
	readonly #hBuiltin	: {[key: string]: ()=> T_VAL_D} = Object.create(null);
	// cast=strで代入された変数のキー。bluesnovelの自動キャストは読み出し時（get()）に
	//	効くため、「文字列のまま扱う」という書き込み側の指定はここに覚えておく
	//	（本家 setVal_Nochk(…, autocast) 相当）
	readonly #setNoCast	= new Set<string>();

	// 組み込み変数の登録（読み取り専用・遅延評価。本家 val.defTmp() 相当）
	//	name は"tmp:"を除いたキー（例：'const.sn.scriptFn'）。常にtmp:名前空間に属する
	defBuiltin(name: string, fnc: ()=> T_VAL_D) {
		this.#hBuiltin[name] = fnc;
	}

	// 変数名の分解（本家 PropParser.getValName() 相当）
	//	・「名前空間:」省略時は tmp
	//	・末尾「@str」指定時は取得時の自動キャストを行わない
	//	・「["キー"]」「['キー']」記法は「.キー」へ正規化する（本家 #getValName_B2D()）
	static readonly REG_NAME = /^(?:(tmp|game|save|sys|mp):)?([^\s:@]+)(@str)?$/;
	static parseName(name: string): {ns: T_NS; key: string; atStr: boolean} {
		const m = VarStore.REG_NAME.exec(name.trim());
		if (! m) throw `変数名が不正です：${name}`;
		const ns0 = m[1] ?? 'tmp';	// 省略時の既定は本家に合わせ"tmp"
		const ns = H_NS_ALIAS[ns0] ?? ns0 as T_NS;
		return {ns, key: VarStore.#bracket2dot(m[2]!), atStr: Boolean(m[3])};
	}
	static #bracket2dot(str: string): string {
		let i = 0, e = 0, s = str;
		for (;;) {
			i = s.indexOf('["');
			if (i < 0) {
				i = s.indexOf(`['`);
				if (i < 0) break;
				e = s.indexOf(`']`, i +2);
			}
			else e = s.indexOf('"]', i +2);
			if (e < 0) break;

			s = s.slice(0, i) +'.'+ s.slice(i +2, e) + s.slice(e +2);
		}
		return s;
	}

	// 変数の取得（本家 Variable.getVal() 相当）
	//	def   … 未定義時に返す既定値（既定はundefined。本家準拠）
	//	touch … trueなら、未定義だった場合にdefをストアへ書き込む
	get(name: string, def: T_VAL_D = undefined, touch = false): T_VAL_D {
		if (! name.trim()) throw '[変数参照] nameは必須です';
		const {ns, key, atStr} = VarStore.parseName(name);
		if (ns === 'tmp') {
			const fnc = this.#hBuiltin[key];
			if (fnc) return atStr ? fnc() : VarStore.castAuto(fnc());
		}

		const k = `${ns}.${key}`;
		if (k in this.#h) return atStr || this.#setNoCast.has(k)
			? this.#h[k]
			: VarStore.castAuto(this.#h[k]);

		if (touch) {
			this.#h[k] = def;
			return atStr ? def : VarStore.castAuto(def);
		}

		const val = this.#getFromJson(ns, key, def);
		return atStr ? val : VarStore.castAuto(val);
	}

	// 変数名そのものが未定義の場合、名前を「.」で刻んで前方一致で探し、
	//	見つかった値をJSONとして解釈できればその下の階層を辿る（本家 Variable.ts:557-599）。
	//	**格納変数(#h)だけでなく組み込み変数(#hBuiltin。tmp:のみ)も前方一致の起点にする**：
	//	`const.sn.lay`のように「JSONツリーを返す組み込み変数」の下位（`const.sn.lay.0`）を
	//	辿れるようにするため（本家の組み込み変数はJSON文字列で階層を持つ）。
	#getFromJson(ns: T_NS, key: string, def: T_VAL_D): T_VAL_D {
		const aNm = key.split('.');
		const len = aNm.length;
		let n = '';
		for (let i=0; i<len; ++i, n += '.') {
			n += aNm[i];
			const kk = `${ns}.${n}`;
			// 前方一致でヒットした「生の値」。格納変数を優先し、無ければ組み込み変数を評価する
			let raw: T_VAL_D;
			if (kk in this.#h) raw = this.#h[kk];
			else if (ns === 'tmp' && this.#hBuiltin[n]) raw = this.#hBuiltin[n]!();
			else continue;	// 未定義なら名前を延ばして探索続行

			let v: unknown;
			try {v = JSON.parse(String(raw))}
			catch {
				// JSONとして解釈できない値。本家はここで例外になるが、
				// bluesnovelでは「JSONではない値がヒットした」だけとみなし探索を続ける
				if (i +1 === len) return raw;
				continue;
			}
			if (Object.prototype.toString.call(v) !== '[object Object]') {
				if (i +1 === len) return <T_VAL_D>v;	// 最下層ならそのまま返す
				continue;
					// 短い名前でヒットしたが、JSONでもなく
					// 変数名にはまだ続きがあるので探索続行
			}

			let val: unknown = v;
			let j = i;	// JSONオブジェクトの階層を降りつつ探索
			while (++j < len) {
				const nj = aNm[j]!;
				if (! (nj in <object>val)) return def;

				val = (<{[k: string]: unknown}>val)[nj];
				if (Object.prototype.toString.call(val) !== '[object Object]'
					|| j +1 === len) break;	// 最下層ならそのまま返す
			}

			return val instanceof Object ? JSON.stringify(val) : <T_VAL_D>val;
		}
		return def;
	}

	// 値の自動キャスト（本家 Variable.#castAuto()）。
	//	'true'/'false'/'null'、及び数値リテラル文字列を、それぞれの型へ変換して返す
	//	（'undefined'はundefinedへ。本家 #castAuto() と同じ）
	static readonly REG_NUMERICLITERAL = /^-?[\d.]+$/;
	static castAuto(val: T_VAL_D): T_VAL_D {
		if (typeof val !== 'string') return val;
		if (val === 'true') return true;
		if (val === 'false') return false;
		if (val === 'null') return null;
		if (val === 'undefined') return undefined;
		if (VarStore.REG_NUMERICLITERAL.test(val)) return parseFloat(val);

		return val;
	}
	// 変数への代入。castは[let]/[let_ml]/「&計算」書式のcast指定（省略時は変換しない）
	set(name: string, val: T_VAL_D, cast: T_CAST = '') {
		const {ns, key} = VarStore.parseName(name);
		// 組み込み変数はget()と同様、tmp:名前空間の場合のみガードする
		//（game:/sys:で同名のキーを使うこと自体は許容する）
		if (ns === 'tmp' && key in this.#hBuiltin) throw `組み込み変数【${name}】へは代入できません`;

		const k = `${ns}.${key}`;
		if (cast === 'str') this.#setNoCast.add(k); else this.#setNoCast.delete(k);
		this.#h[k] = VarStore.castTo(val, cast);
	}

	// cast指定による値の変換（本家 Variable.ts:317 #let() のswitchに対応）。
	//	str は「値は文字列化するが、自動キャストの抑止はset()側で覚える」という分担にしている
	static castTo(val: T_VAL_D, cast: T_CAST): T_VAL_D {
		switch (cast) {
		case '':	return val;
		case 'num':	return VarStore.#toNum(val);
		case 'int':	return int(VarStore.#toNum(val));
		case 'uint':return uint(VarStore.#toNum(val));
		// 本家 argChk_Boolean() 準拠：nullは偽、文字列'false'も偽、空文字も偽、'0'は真
		case 'bool':return val === null || val === undefined
			? false
			: String(val) !== 'false' && Boolean(String(val));
		case 'str':	return val === null || val === undefined ? val : String(val);
		default:	throw `cast【${String(cast)}】は未定義です`;
		}
	}
	// 本家 argChk_Num() 準拠：0x始まりは16進、それ以外は浮動小数として読む
	static #toNum(val: T_VAL_D): number {
		const s = String(val);
		const n = s.startsWith('0x') ? parseInt(s, 16) : parseFloat(s);
		if (Number.isNaN(n)) throw `値【${s}】が数値ではありません`;
		return n;
	}

	// mp:名前空間のスナップショット・復元（マクロ呼び出し時の引数受け渡し・戻り時の復元用。
	// 本家 Variable.ts の cloneMp()/setMp() 簡略版。ScriptEngine.ts の#aCallStk[].hMp から使用）
	cloneMp(): {[key: string]: T_VAL_D} {
		const h: {[key: string]: T_VAL_D} = {};
		for (const k of Object.keys(this.#h)) if (k.startsWith('mp.')) h[k.slice(3)] = this.#h[k];
		return h;
	}
	setMp(h: {[key: string]: T_VAL_D}) {
		this.#delNs('mp.');
		for (const k of Object.keys(h)) this.#h[`mp.${k}`] = h[k];
	}

	// [clearvar]相当：gameのみクリア（本家準拠でsys/tmpは対象外）
	clearGame() {this.#delNs('game.')}
	// [clearsysvar]相当
	clearSys() {this.#delNs('sys.')}
	// 指定名前空間の変数を消す（cast=strの記録も一緒に消さないと、
	//	同名で入れ直したときに自動キャストが効かないままになる）
	#delNs(prefix: string) {
		for (const k of Object.keys(this.#h)) if (k.startsWith(prefix)) {
			delete this.#h[k];
			this.#setNoCast.delete(k);
		}
	}
}
