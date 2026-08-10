/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2026-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

// prj_uc/ 用の画像アセットを作り直す。`bun test/e2e/app/mkPrjUc.ts`
//
//	prj_uc は実テンプレ（tmp_blues/tmp_esm_uc）の script/ss_000.sn をエッセンス化した
//	フィクスチャ（uc.e2e.ts が使用）。[lay pos=]の座標計算は画像の実寸に依存するため、
//	絵柄は不要でも**寸法だけは実テンプレの画像と合わせる**必要がある。外部ライブラリを
//	増やしたくないので、単色PNGを最小のPNGエンコーダで直接組み立てる
//	（IHDR+IDAT+IENDのみ。zlib.deflateSyncでPNG仕様どおりのzlibストリームが作れる）

import zlib from 'node:zlib';
import fs from 'node:fs';
import {fileURLToPath} from 'node:url';

const DIR = fileURLToPath(new URL('./prj_uc/', import.meta.url));

const CRC_TABLE = (()=> {
	const t = new Uint32Array(256);
	for (let n = 0; n < 256; ++n) {
		let c = n;
		for (let k = 0; k < 8; ++k) c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
		t[n] = c >>> 0;
	}
	return t;
})();
function crc32(buf: Uint8Array): number {
	let c = 0xFFFFFFFF;
	for (const b of buf) c = CRC_TABLE[(c ^ b) & 0xFF]! ^ (c >>> 8);
	return (c ^ 0xFFFFFFFF) >>> 0;
}

function chunk(type: string, data: Buffer): Buffer {
	const len = Buffer.alloc(4);
	len.writeUInt32BE(data.length);
	const typeData = Buffer.concat([Buffer.from(type, 'ascii'), data]);
	const crc = Buffer.alloc(4);
	crc.writeUInt32BE(crc32(typeData));
	return Buffer.concat([len, typeData, crc]);
}

// 単色・8bit RGB（color type 2）・非インタレースのPNGを組み立てる。絵柄は不要、寸法だけが要る
function solidPng(w: number, h: number, [r, g, b]: [number, number, number]): Buffer {
	const row = Buffer.alloc(1 + w * 3);	// 先頭1byteはフィルタタイプ（0=None）
	for (let x = 0; x < w; ++x) row.set([r, g, b], 1 + x * 3);
	const raw = Buffer.concat(Array.from({length: h}, ()=> row));

	const ihdr = Buffer.alloc(13);
	ihdr.writeUInt32BE(w, 0);
	ihdr.writeUInt32BE(h, 4);
	ihdr[8] = 8; ihdr[9] = 2; ihdr[10] = 0; ihdr[11] = 0; ihdr[12] = 0;

	const sig = Buffer.from([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A]);
	return Buffer.concat([
		sig, chunk('IHDR', ihdr), chunk('IDAT', zlib.deflateSync(raw)), chunk('IEND', Buffer.alloc(0)),
	]);
}

fs.mkdirSync(`${DIR}image/`, {recursive: true});
fs.mkdirSync(`${DIR}bg/`, {recursive: true});
fs.mkdirSync(`${DIR}rule/`, {recursive: true});

// 寸法は実テンプレ（tmp_blues/tmp_esm_uc）doc/prj/の同名画像と揃える（色は任意）
const IMAGES: {[fn: string]: [number, number, [number, number, number]]} = {
	'image/F_1024aFull.png'	: [834, 1165, [200, 120, 80]],	// 立ち絵（全身）★[lay pos=]回帰の主役
	'image/F_1024a.png'		: [834, 768,  [200, 120, 80]],
	'image/F_1024b.png'		: [834, 768,  [180, 100, 70]],
	'image/F_kuchimoto.png'	: [1024, 768, [150, 90, 60]],
	'image/kagero.png'			: [640, 400,  [220, 220, 150]],
	'bg/white.png'				: [1024, 768, [255, 255, 255]],
	'bg/black.png'				: [1024, 768, [0, 0, 0]],
	'bg/yun_a.png'				: [1024, 768, [90, 130, 90]],
	'rule/r_uzumaki.png'		: [1024, 768, [128, 128, 128]],
};
for (const [fn, [w, h, rgb]] of Object.entries(IMAGES)) fs.writeFileSync(DIR + fn, solidPng(w, h, rgb));

console.log('prj_uc/ の画像を生成しました:', Object.keys(IMAGES).join(' '));
