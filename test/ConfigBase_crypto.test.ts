/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2026-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

// crypto:true時のファイル改竄チェック（ConfigBase.ts#load()末尾）のうち、ブラウザが要らない部分。
//	path.json内の`拡張子:任意文字列:id`キーが持つ値（ファイル名部分）と、対応する実ファイルを
//	fetchしてsys.hash()に通した結果を突き合わせる。ConfigBaseはprotected constructorなので、
//	実SysBase（windowを持ちbunでは読み込めない）ではなく最小のT_SysRoots偽物で直接インスタンス化する
//	（SaveMng.test.tsと同じ「その場で偽物を挿す」流儀）。
//	crypto:false経路（現状維持）は既存のE2Eが変更なく通ることで担保

import {ConfigBase, type T_CFG_RAW, type T_Fn2Path, type T_SysRoots} from '../src/sn/ConfigBase';

import {expect, it} from 'bun:test';


// protected constructor/loadを外から呼べるようにするだけの最小サブクラス（Config.tsは
//	SysBase丸ごとを要求し重いため、ConfigBase単体でロジックだけ見る）
class TestConfig extends ConfigBase {
	constructor(sys: T_SysRoots) {super(sys)}
	doLoad(oCfg: T_CFG_RAW) {return this.load(oCfg)}
}

function mkCfgRaw(): T_CFG_RAW {
	return {
		book: {title: '', creator: '', cre_url: '', publisher: '', pub_url: '', detail: '', version: ''},
		init: {bg_color: '', tagch_msecwait: 0, auto_msecpagewait: 0, escape: ''},
		debug: {devtool: false, dumpHtm: false, token: false, tag: false, putCh: false,
			debugLog: false, baseTx: false, masume: false, variable: false},
		code: {}, debuger_token: '',
	};
}

// pic.pngの中身と、path.jsonのハッシュキーが指す値が一致する最小フィクスチャ。
//	ConfigBase.ts側の実装は「`:`で始まり`:id`で終わるキー」だけを改竄チェック対象にし、
//	`ext.slice(0, -10)`（末尾10文字を除いた残り）を元の拡張子キーとして引き直す作り。
//	そのため拡張子キー自体も`:`始まり（`:png`）にし、ハッシュキーを`:png` + `_abcdef:id`
//	（ちょうど10文字の固定接尾辞）にすると、slice後にぴったり`:png`へ戻る
const PIC_CONTENT = 'PICDATA';
function mkPathJson(hashValue: string): T_Fn2Path {
	// T_Exts型は`:cnt`だけnumber・他はstringという実態を素のオブジェクトリテラルでは
	//	素直に表現できない（インデックスシグネチャとの整合性チェックに引っかかる）ため、
	//	path.jsonの実際の受け渡し経路（JSON.parse(...) as T_Fn2Path）と同じくキャストする
	return {pic: {':cnt': 1, ':png': 'pic.png', ':png_abcdef:id': `somedir/${hashValue}`}} as unknown as T_Fn2Path;
}

function mkSys(crypto: boolean, pathJson: T_Fn2Path, hash: (str: string)=> string): T_SysRoots {
	return {
		arg: {cur: '/prj/', crypto},
		dec: async (_ext, tx)=> tx,
		hash,
		fetch: (async (url: string)=> {
			if (url === '/prj/path.json') return new Response(JSON.stringify(pathJson));
			if (url === '/prj/pic.png') return new Response(PIC_CONTENT);
			throw `想定外のURL ${url}`;
		}) as typeof fetch,
	};
}

it('crypto_hashMatch_passesLoad', async ()=> {
	// 正しいハッシュ値を仕込めば改竄チェックを通過する
	const sys = mkSys(true, mkPathJson('HASH_OK'), str=> str === PIC_CONTENT ? 'HASH_OK' : 'WRONG');
	await expect(new TestConfig(sys).doLoad(mkCfgRaw())).resolves.toBeUndefined();
});

it('crypto_hashMismatch_throwsTamperError', async ()=> {
	// path.json側のハッシュ値と、実ファイルをsys.hash()した結果が食い違えば改竄エラーで止まる
	const sys = mkSys(true, mkPathJson('TAMPERED'), str=> str === PIC_CONTENT ? 'HASH_OK' : 'WRONG');
	await expect(new TestConfig(sys).doLoad(mkCfgRaw())).rejects.toBe('ファイル改竄エラーです fn:/prj/pic.png');
});

it('cryptoFalse_skipsHashCheckEvenIfMismatched', async ()=> {
	// crypto:falseなら改竄チェック自体をしない（`:id`キーがハッシュ不一致でも無視）
	const sys = mkSys(false, mkPathJson('TAMPERED'), ()=> 'WRONG');
	await expect(new TestConfig(sys).doLoad(mkCfgRaw())).resolves.toBeUndefined();
});
