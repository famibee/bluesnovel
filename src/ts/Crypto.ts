/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2026-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

// 暗号化アセット（crypto:true時）の画像・動画バイナリをBlob URLへ差し替える共通ヘルパ。
//	ScriptMng（[lay fn=]/[add_face]）・Sprite（アニメpngシートのシート画像）・FrameMng
//	（[add_frame]のフレーム内<img>）の3箇所が使う（本家はSpritesMng/FrameMngそれぞれが
//	個別にsys.decABを呼ぶが、こちらは判定ロジックを1箇所へ集約した）

import type {SysBase} from '../sn/SysBase';

// 画像・動画の拡張子→MIME（ConfigBase.SEARCH_PATH_ARG_EXT.SP_GSMのうち#decryptPicが対象にするもの）
const H_PIC_EXT2MIME: {[ext: string]: string} = {
	png: 'image/png', jpg: 'image/jpeg', jpeg: 'image/jpeg',
	webp: 'image/webp', svg: 'image/svg+xml',
	mp4: 'video/mp4', webm: 'video/webm',
};
// crypto:true時だけfetch→decAB→Blob URL化する。crypto:falseなら即座に元のURLを返す
//	（**呼び出し側の判断に任せず、ここで必ず弾く**——crypto:false時にBlob URL化してしまうと、
//	無駄なfetch/Blob生成が走るだけでなく、元URLに依存するテスト・キャッシュキーが壊れる。
//	Sprite.ts/FrameMng.tsはsys.cryptoを直接読めないモジュールなので、ここで一元的に判定する）。
//	アニメpngシート本体（.json）はここを通さない——jsonはテキストなのでsys.decで別途複号する
//	（`.json`＝シート、はScriptMngのclassifyAssetも見るが、あちらは「種別」・ここは「復号可否」で
//	たまたま同じ拡張子判定になっているだけ＝共通化しない）。
//	`userdata:/…`由来（data URL）・既にBlob URL化済みのものもそのまま素通し。
export async function decryptPicUrl(url: string, crypto: boolean, sysFetch: SysBase['fetch'], sysDecAB: SysBase['decAB']): Promise<string> {
	if (! crypto || ! url || url.startsWith('data:') || url.startsWith('blob:') || url.endsWith('.json')) return url;
	const ext = /\.([a-z0-9]+)$/i.exec(url)?.[1]?.toLowerCase() ?? '';
	const type = H_PIC_EXT2MIME[ext];
	if (! type) return url;	// 知らない拡張子はそのまま（今のところ画像・動画以外はここに来ない）

	const res = await sysFetch(url);
	const ab = await sysDecAB(await res.arrayBuffer());
	return URL.createObjectURL(new Blob([ab], {type}));
	// revokeしない。本家 SysBase.ts #genImage も同じ判断（onload契機でrevokeすると
	//	暗号化構成でフレーム内画像が出なくなった実績があるため）
}
