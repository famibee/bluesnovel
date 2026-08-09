/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2026-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

// 画像・動画アセット暗号化のうち、ブラウザが要らない部分。
//	decryptPicUrl（ts/Crypto.tsの共通モジュール関数。ScriptMng/Sprite/FrameMngが共有）は
//	fetch/decABを引数で受けるので、SysBase丸ごとや`<img>`無しでテストできる。
//	実際の画像・動画を暗号化構成で読み切る確認はE2E側（test/e2e/crypto.e2e.ts）

import {decryptPicUrl} from '../src/ts/Crypto';

import {expect, it} from 'bun:test';


// 呼ばれたらtrue、中身は元のArrayBufferにマーカーバイトを1つ足すだけ（本家プラグインの代わり）
function fakeDecAB(calledFlag: {called: boolean}) {
	return (ab: ArrayBuffer): Promise<ArrayBuffer> => {
		calledFlag.called = true;
		const src = new Uint8Array(ab);
		const dst = new Uint8Array(src.length + 1);
		dst.set(src);
		dst[src.length] = 0xFF;
		return Promise.resolve(dst.buffer);
	};
}

it('emptyUrlPassesThrough', async ()=> {
	const fetchCalled = {called: false};
	const fetch = (async (_u: string)=> {fetchCalled.called = true; return new Response()}) as typeof globalThis.fetch;
	expect(await decryptPicUrl('', true, fetch, fakeDecAB({called: false}))).toBe('');
	expect(fetchCalled.called).toBe(false);
});

it('dataAndBlobAndJsonUrlsPassThroughWithoutFetch', async ()=> {
	const fetchCalled = {called: false};
	const fetch = (async (_u: string)=> {fetchCalled.called = true; return new Response()}) as typeof globalThis.fetch;
	const decAB = fakeDecAB({called: false});

	expect(await decryptPicUrl('data:image/png;base64,AAAA', true, fetch, decAB)).toBe('data:image/png;base64,AAAA');
	expect(await decryptPicUrl('blob:http://localhost/xxx', true, fetch, decAB)).toBe('blob:http://localhost/xxx');
	expect(await decryptPicUrl('/prj/sheet/walk.json', true, fetch, decAB)).toBe('/prj/sheet/walk.json');
	expect(fetchCalled.called).toBe(false);
});

it('unknownExtPassesThroughWithoutFetch', async ()=> {
	const fetchCalled = {called: false};
	const fetch = (async (_u: string)=> {fetchCalled.called = true; return new Response()}) as typeof globalThis.fetch;
	expect(await decryptPicUrl('/prj/data.bin', true, fetch, fakeDecAB({called: false}))).toBe('/prj/data.bin');
	expect(fetchCalled.called).toBe(false);
});

it('imageAndMovieExtGoThroughFetchAndDecABToBlobUrl', async ()=> {
	for (const url of [
		'/prj/img/chara.png', '/prj/img/chara.JPG', '/prj/img/chara.webp',
		'/prj/movie/op.mp4', '/prj/movie/op.webm',
	]) {
		const src = new Uint8Array([1, 2, 3]).buffer;
		const fetch = (async (u: string)=> {
			expect(u).toBe(url);
			return new Response(src);
		}) as typeof globalThis.fetch;
		const called = {called: false};
		const decAB = fakeDecAB(called);

		const blobUrl = await decryptPicUrl(url, true, fetch, decAB);
		expect(called.called).toBe(true);	// decABを通っている（複合前後でバイト長+1）ことの間接確認
		expect(blobUrl.startsWith('blob:')).toBe(true);
		expect(blobUrl).not.toBe(url);
	}
});

// crypto:falseは画像・動画拡張子でも即座に素通しする（fetch/decABを一切呼ばない）。
//	Sprite.ts/FrameMng.tsがsys.cryptoを直接読めずここへ委ねているため、この分岐が要（本文参照）
it('cryptoFalse_passesThroughEvenForImageExt', async ()=> {
	const fetchCalled = {called: false};
	const fetch = (async (_u: string)=> {fetchCalled.called = true; return new Response()}) as typeof globalThis.fetch;
	const called = {called: false};
	const decAB = fakeDecAB(called);

	const url = '/prj/img/chara.png';
	expect(await decryptPicUrl(url, false, fetch, decAB)).toBe(url);
	expect(fetchCalled.called).toBe(false);
	expect(called.called).toBe(false);
});
