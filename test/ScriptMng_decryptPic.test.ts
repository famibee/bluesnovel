/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2026-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

// 画像・動画アセット暗号化（第2段階）のうち、ブラウザが要らない部分。
//	decryptPicUrl（ScriptMng.tsから切り出したモジュール関数）は
//	fetch/decABを引数で受けるので、SysBase丸ごとや`<img>`無しでテストできる。
//	crypto:falseの経路（#applyAction chgPicがdecryptPicUrlを呼ばずsrcをそのまま渡す）は
//	既存のGrpLayer/ScriptEngine系テストが現状維持のまま通っていることで担保
//	（本テストはdecryptPicUrl単体の入出力のみ見る）。
//	実際の画像・動画を暗号化構成で読み切る確認はE2E側（todo.md「E2Eフィクスチャ生成」）

import {decryptPicUrl} from '../src/ts/ScriptMng';

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
	expect(await decryptPicUrl('', fetch, fakeDecAB({called: false}))).toBe('');
	expect(fetchCalled.called).toBe(false);
});

it('dataAndBlobAndJsonUrlsPassThroughWithoutFetch', async ()=> {
	const fetchCalled = {called: false};
	const fetch = (async (_u: string)=> {fetchCalled.called = true; return new Response()}) as typeof globalThis.fetch;
	const decAB = fakeDecAB({called: false});

	expect(await decryptPicUrl('data:image/png;base64,AAAA', fetch, decAB)).toBe('data:image/png;base64,AAAA');
	expect(await decryptPicUrl('blob:http://localhost/xxx', fetch, decAB)).toBe('blob:http://localhost/xxx');
	expect(await decryptPicUrl('/prj/sheet/walk.json', fetch, decAB)).toBe('/prj/sheet/walk.json');
	expect(fetchCalled.called).toBe(false);
});

it('unknownExtPassesThroughWithoutFetch', async ()=> {
	const fetchCalled = {called: false};
	const fetch = (async (_u: string)=> {fetchCalled.called = true; return new Response()}) as typeof globalThis.fetch;
	expect(await decryptPicUrl('/prj/data.bin', fetch, fakeDecAB({called: false}))).toBe('/prj/data.bin');
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

		const blobUrl = await decryptPicUrl(url, fetch, decAB);
		expect(called.called).toBe(true);	// decABを通っている（複合前後でバイト長+1）ことの間接確認
		expect(blobUrl.startsWith('blob:')).toBe(true);
		expect(blobUrl).not.toBe(url);
	}
});
