/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2026-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

// セーブ層（しおり・システム変数・既読の永続化）。
//	本家では SysBase.data（{sys, mark, kidoku}）＋ SysWeb.flushSub()／initVal() が持つ役割で、
//	保存先は localStorage、キーは prj.json の save_ns で分ける。ここも同じ形にしてある。
//
//	bluesnovelでの置き場所：**エンジンでもストアでもなくここ**。
//	・エンジン（ScriptEngine）はDOMもlocalStorageも触らない決まりなので持てない。
//	・ストア（zustand）は「今の画面」であって履歴や保存データの器ではない。
//	そこでScriptMngがこれを1つ抱え、しおりの中身は「エンジンから貰う分」（save:変数・ifスタック）と
//	「ストアから貰う分」（表裏ページのJSON）を合わせて組み立てる（ScriptMng #mkMark()）。

import type {T_H_Areas} from '../sn/Areas';
import type {T_VAL_D} from './VarStore';
import store from '../sn/localStore';


// しおり1件（本家 T_Mark）。本家は hPages にpixiのレイヤ状態を入れるが、
//	こちらはストアの{aPage, foreIdx}をJSON文字列にしたもの（store.replace()へそのまま渡せる形）
export type T_MARK = {
	hSave	: {[k: string]: T_VAL_D};	// save:（＝game:）名前空間まるごと
	sPages	: string;					// ストアの{aPage, foreIdx}のJSON
	aIfStk	: number[];					// ifスタック
	json	: {[k: string]: string};	// [save]タグの属性（タイトル・サムネイル等）。const.sn.bookmark.jsonが返す中身
};

// 保存されるデータ全体（本家 T_Data4Vari）
export type T_DATA4VARI = {
	sys		: {[k: string]: T_VAL_D};
	mark	: {[place: string]: T_MARK};
	kidoku	: {[fn: string]: T_H_Areas};
};
function creData(): T_DATA4VARI {return {sys: {}, mark: {}, kidoku: {}}}

const EXT = '.swpd';	// 本家と同じ拡張子（SKYNovel Web Play Data）


export class SaveMng {
	#data = creData();
	get data() {return this.#data}

	// ns は prj.json の save_ns。本家 SysWeb と同じ「skynovel.《ns》 - 《種別》」形式にしてあるので、
	//	同じプロジェクトなら本家が書いたデータをそのまま読める
	constructor(private readonly ns: string) {}
	#key(kind: 'sys' | 'mark' | 'kidoku') {return `skynovel.${this.ns} - ${kind}`}

	// 起動時の読み込み。**戻り値は「初回起動か」**（本家 SysWeb.initVal() の const.sn.isFirstBoot）。
	//	壊れていたら初期状態から始める（読めないデータのせいでゲームが起動しないのが一番困る）
	load(): boolean {
		const sys = store.get(this.#key('sys'));
		if (sys === undefined) {this.#data = creData(); return true}

		this.#data = {
			sys		: sys as T_DATA4VARI['sys'],
			mark	: (store.get(this.#key('mark')) ?? {}) as T_DATA4VARI['mark'],
			kidoku	: (store.get(this.#key('kidoku')) ?? {}) as T_DATA4VARI['kidoku'],
		};
		return false;
	}

	// 保存。**立て続けの呼び出しをまとめる**（本家 SysBase.flush()：即時に1回書き、
	//	500ms以内の追加要求は次のタイマーでまとめて1回にする）。
	//	既読は停止点ごとに更新されるので、これが無いと1文字進むたびにlocalStorageへ書くことになる
	flush() {
		if (this.#tid) {this.#rsv = true; return}

		this.#write();
		this.#tid = setTimeout(()=> {
			this.#tid = undefined;
			if (! this.#rsv) return;

			this.#rsv = false;
			this.flush();
		}, 500);
	}
	#tid: ReturnType<typeof setTimeout> | undefined;
	#rsv = false;
	#write() {
		store.set(this.#key('sys'), this.#data.sys);
		store.set(this.#key('mark'), this.#data.mark);
		store.set(this.#key('kidoku'), this.#data.kidoku);
	}

	// ===== しおり =====
	getMark(place: number): T_MARK | undefined {return this.#data.mark[String(place)]}
	setMark(place: number, mark: T_MARK) {
		this.#data.mark[String(place)] = mark;
		this.flush();
	}
	eraseMark(place: number) {
		delete this.#data.mark[String(place)];	// eslint-disable-line @typescript-eslint/no-dynamic-delete
		this.flush();
	}
	// 本家 #copybookmark()。中身は同じ参照でよい（しおりは書き換えず作り直す運用）
	copyMark(from: number, to: number) {
		const f = this.getMark(from);
		if (! f) throw `from:${String(from)} のセーブデータは存在しません`;

		this.setMark(to, {...f});
	}

	// 組み込み変数 const.sn.bookmark.json の中身（本家 Variable.ts:59 defTmp）。
	//	[save]の属性に place を足した配列。しおり画面（テンプレの frames/_archive.sn）が読む
	bookmarkJson(): string {
		return JSON.stringify(Object.entries(this.#data.mark)
			.map(([place, mk])=> ({...mk.json, place: Number(place)})));
	}

	// ===== プレイデータの書き出し・読み込み（本家 SysWeb _export/_import） =====
	//	暗号化（本家の arg.crypto）は未対応なので、常に平文のJSON
	export() {
		const blob = new Blob([JSON.stringify(this.#data)], {type: 'text/json'});
		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = `no_crypto_${this.ns}${dateStr()}${EXT}`;	// 本家も非暗号化には接頭辞を付ける
		a.click();
		URL.revokeObjectURL(url);
	}

	// ファイル選択ダイアログを開いて読み込む。**別プロジェクトのデータは弾く**（本家と同じ）。
	//	選択がキャンセルされた場合はresolveされないまま（本家も同じで、待っているのはPromiseだけ）
	async import(): Promise<T_DATA4VARI> {
		const blob = await new Promise<Blob>((re, rj)=> {
			const inp = document.createElement('input');
			inp.type = 'file';
			inp.accept = `${EXT}, text/plain`;
			inp.onchange = ()=> {
				const f = inp.files?.[0];
				if (f) re(f); else rj(new Error('ファイル選択に失敗しました'));
			};
			inp.click();
		});
		const o = JSON.parse(await blob.text()) as T_DATA4VARI;
		const ns = o.sys['const.sn.cfg.ns'];
		if (ns !== this.ns) throw `別のゲーム【プロジェクト名=${String(ns)}】のプレイデータです`;

		this.#data = o;
		this.flush();
		return o;
	}
}

// 本家 getDateStr('-', '_', '') 相当：2026-07-25_06-38-57
function dateStr(): string {
	const d = new Date;
	const p = (n: number)=> String(n).padStart(2, '0');
	return `${String(d.getFullYear())}-${p(d.getMonth() +1)}-${p(d.getDate())}`
		+ `_${p(d.getHours())}-${p(d.getMinutes())}-${p(d.getSeconds())}`;
}
