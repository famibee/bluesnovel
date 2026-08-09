/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2026-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

// 暗号化アセット用フィクスチャ（test/e2e/app/prj_crypto/）を作り直す。
//	`bun test/e2e/app/mkPrjCrypto.ts`
//
//	【実プロジェクトの鍵と資材は絶対に持ち込まない】使い捨ての鍵を固定値で持ち、
//	画像・音声は既存フィクスチャ（prj_pic/prj_anime/prj_snd）の実ファイルを暗号化して流用する
//	（本家 skynovel_esm/test/e2e/app/mkPrjCrypto.mjs と同じ発想）。
//
//	本家との違い：bluesnovelのdecABは{ext_num, ab}のような拡張子秘匿を行わず、復号した
//	ArrayBufferをそのまま返すだけでよい（拡張子→MIME判定はts/Crypto.ts側がURLから行うため）。
//	なので本家のような`.bin`への変換は不要——**元の拡張子のまま**中身だけ暗号化して置ける

import {webcrypto as crypto} from 'node:crypto';
import fs from 'node:fs';
import {fileURLToPath} from 'node:url';

const DIR = fileURLToPath(new URL('./prj_crypto/', import.meta.url));
const SRC = fileURLToPath(new URL('./', import.meta.url));

// 使い捨ての鍵。E2E専用で、何の資産も守っていない
const hPass = {
	pass	: '00000000-0000-4000-8000-000000000000',
	salt	: 'a1'.repeat(64),
	iv		: 'b2'.repeat(64),
	ite		: 100,	// 実物はもっと大きいはず。テストは速い方がよい
};

const hex2ab = (h: string)=> new Uint8Array((h.match(/../g) ?? []).map(x=> parseInt(x, 16))).buffer;

async function mkKey() {
	const base = await crypto.subtle.importKey('raw',
		await crypto.subtle.digest('SHA-512', new TextEncoder().encode(hPass.pass)),
		'PBKDF2', false, ['deriveKey']);
	return crypto.subtle.deriveKey(
		{name: 'PBKDF2', hash: 'SHA-512', iterations: hPass.ite, salt: hex2ab(hPass.salt)},
		base, {name: 'AES-GCM', length: 256}, false, ['encrypt', 'decrypt']);
}

const key = await mkKey();
const alg = {name: 'AES-GCM', iv: hex2ab(hPass.iv)};

async function encAB(buf: Uint8Array): Promise<Buffer> {
	// fs.readFileSync()の戻り値はUint8Array<ArrayBufferLike>（SharedArrayBufferもあり得る型）で
	//	subtle.encrypt()のBufferSource（ArrayBuffer限定）と噛み合わないため、コピーして型を安定させる
	return Buffer.from(await crypto.subtle.encrypt(alg, key, new Uint8Array(buf)));
}
async function encTx(tx: string): Promise<string> {
	return Buffer.from(await crypto.subtle.encrypt(alg, key, new TextEncoder().encode(tx))).toString('base64');
}

fs.mkdirSync(DIR, {recursive: true});

// --- 画像・音声（バイナリ暗号化。元の拡張子のまま。既存フィクスチャの実ファイルを流用）
fs.writeFileSync(`${DIR}pic.png`, await encAB(fs.readFileSync(`${SRC}prj_pic/bg.png`)));
fs.writeFileSync(`${DIR}clock.5x8.png`, await encAB(fs.readFileSync(`${SRC}prj_anime/anime.4x1.png`)));
fs.writeFileSync(`${DIR}snd.wav`, await encAB(fs.readFileSync(`${SRC}prj_snd/se.wav`)));
fs.writeFileSync(`${DIR}frame_pic.png`, await encAB(fs.readFileSync(`${SRC}prj_pic/face_a.png`)));

// --- アニメpngシート定義（.jsonはテキスト暗号化。中のmeta.imageはclock.5x8.pngに向け直す）
const animeJson = fs.readFileSync(`${SRC}prj_anime/anime.json`, 'utf-8').replace('anime.4x1.png', 'clock.5x8.png');
fs.writeFileSync(`${DIR}clock.json`, await encTx(animeJson));

// --- シナリオとフレーム（.sn/.htmは本文まるごと複号。ts/Crypto.ts・SndMng・Sprite.ts・
//	FrameMngの4経路を1本のシナリオで通す）
const SN = `; 暗号化アセット（sys.arg.crypto）のリソース検査用（crypto.e2e.ts が使用）
[add_lay layer=bg class=grp]
[add_lay layer=mes class=txt]
[current layer=mes]
はじめ。[p]

; 暗号化画像 → ts/Crypto.ts の decryptPicUrl が fetch→decAB→Blob URL 化する
[lay layer=bg fn=pic]
えいぞう。[p]

; 暗号化アニメpngシート → Sprite.ts の loadSheet が .json 本体は sys.dec で、
;	シート画像（meta.imageが指すpng）は decryptPicUrl で複号する
[lay layer=bg fn=clock]
あにめ。[p]

; 暗号化音声 → SndMng の #decode が decodeAudioData の直前で decAB を通す
[playbgm fn=snd join=false]
[stopbgm]
おと。[p]

; 暗号化HTMLフレーム。本体は FrameMng#add が sys.dec で複号し、中の<img data-src=…>は
;	sn_repRes フック経由で #srcOf が decryptPicUrl に通す
[add_frame id=frm src=frm]
ふれーむ。[s]
`;
// フレーム内の画像差し替え規約はprj_frame/yesno.htmlと同じ（sn_repRes(setImg)を受け取り、
//	各<img data-src>へ適用する）。frame_pic はpath.jsonに載る拡張子なしの論理名
const HTM = `<!DOCTYPE html><html><head><meta charset="utf-8"></head><body>
<img id="p" data-src="frame_pic" width="10" height="10">
<script>
	function sn_repRes(setImg) {
		Array.prototype.forEach.call(document.getElementsByTagName('img'), function(i) {setImg(i)});
	}
</script>
</body></html>
`;
fs.writeFileSync(`${DIR}main.sn`, await encTx(SN));
fs.writeFileSync(`${DIR}frm.htm`, await encTx(HTM));

const PRJ = {
	save_ns: 'bluesnovel_e2e_crypto',
	window: {width: 800, height: 600},
	book: {title: 'E2E crypto', creator: 'famibee', cre_url: '', publisher: 'famibee',
		pub_url: '', detail: '暗号化アセット（画像・音声・アニメpngシート・add_frame）の複号を検証するE2E用シナリオ', version: '1.0'},
	log: {max_len: 64},
	init: {bg_color: '#000000', tagch_msecwait: 10, auto_msecpagewait: 3500, escape: '\\'},
	debug: {devtool: false, dumpHtm: false, token: false, tag: false, putCh: false,
		debugLog: false, baseTx: false, masume: false, variable: false},
	code: {}, debuger_token: '',
};
// 暗号化しても**キーは元の拡張子のまま**、値も元のファイル名のまま（bluesnovelはpath.jsonが
//	持つ論理名自体を秘匿対象にしていないため。本家のような.binへの付け替えは不要）
const PATH = {
	main		: {':cnt': 1, sn: 'main.sn'},
	frm			: {':cnt': 1, htm: 'frm.htm'},
	pic			: {':cnt': 1, png: 'pic.png'},
	snd			: {':cnt': 1, wav: 'snd.wav'},
	clock		: {':cnt': 1, json: 'clock.json'},
	'clock.5x8'	: {':cnt': 1, png: 'clock.5x8.png'},
	frame_pic	: {':cnt': 1, png: 'frame_pic.png'},
};
fs.writeFileSync(`${DIR}prj.json`, await encTx(JSON.stringify(PRJ)));
fs.writeFileSync(`${DIR}path.json`, await encTx(JSON.stringify(PATH)));

// --- 使い捨ての鍵を複号プラグインへ書き出す。prj_crypto/（fetchで読まれるアセット置き場）
//	ではなくapp/直下（コード側）に置く——TypeScriptソースであってプロジェクトのアセットではないため
fs.writeFileSync(`${SRC}snsys_pre.ts`,
`/* このファイルは test/e2e/app/mkPrjCrypto.ts が生成する。直接編集しない */
// 複号は本家に無くsnsys_preプラグインが供給する（SysBase.loadedのsetDec/setDecAB/setEnc/getHash）。
//	これはその最小実装で、鍵は**E2E専用の使い捨て**。実プロジェクトの鍵ではない
import type {T_PluginInitArg} from '../../../src/web';

const hPass = ${JSON.stringify(hPass, null, '\t')};

const hex2ab = (h: string)=> new Uint8Array((h.match(/../g) ?? []).map(x=> parseInt(x, 16))).buffer;
const b642ab = (s: string)=> Uint8Array.from(atob(s), c=> c.charCodeAt(0)).buffer;

export async function init(arg: T_PluginInitArg) {
	const {subtle} = crypto;
	const base = await subtle.importKey('raw',
		await subtle.digest('SHA-512', new TextEncoder().encode(hPass.pass)),
		'PBKDF2', false, ['deriveKey']);
	const key = await subtle.deriveKey(
		{name: 'PBKDF2', hash: 'SHA-512', iterations: hPass.ite, salt: hex2ab(hPass.salt)},
		base, {name: 'AES-GCM', length: 256}, false, ['encrypt', 'decrypt']);
	const alg = {name: 'AES-GCM', iv: hex2ab(hPass.iv)};

	// .sn/.json/.htmlは本文まるごと（Base64）。復号できなければ（＝crypto対象外の平文が
	//	来た場合）そのまま返して起動を妨げない
	const REG = /(^|\\.)(ss?n|json|html?)$/;
	arg.setDec(async (ext: string, tx: string)=> {
		if (! REG.test(ext)) return tx;
		try {return new TextDecoder().decode(await subtle.decrypt(alg, key, b642ab(tx)))}
		catch {return tx}
	});

	// 画像・動画・音声は素のArrayBufferを暗号化しただけなので、復号してそのまま返す
	//	（本家のような{ext_num, ab}への分離は無い。ts/Crypto.ts参照）
	arg.setDecAB(async (ab: ArrayBuffer)=> subtle.decrypt(alg, key, ab));

	// このフィクスチャではセーブデータ暗号化・改竄検査は対象外（別途ユニットテストで検証済み）
	arg.setEnc(async (tx: string)=> tx);
	arg.getHash((s: string)=> s);
}
`);

console.log('prj_crypto/ を生成しました:', fs.readdirSync(DIR).join(' '));
