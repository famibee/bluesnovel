/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2026-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

// アニメpng（APNGではなく**独自のスプライトシート**）。
//	1枚のpngに全コマを格子状に並べ、同名の.jsonがコマの矩形と再生速度を持つ形式で、
//	path.jsonでは「論理名→.json」「論理名.列x行→.png」の2件に分かれて載る
//	（例：`clock`→`mat/clock.json`、`clock.5x8`→`mat/clock.5x8.png`）。
//	つまり`[lay fn=clock]`のパス解決結果は**.jsonのURL**になり、そこからpngへ辿る。
//
//	本家はpixiの`AnimatedSprite`（テクスチャを差し替えて再生）だが、こちらはDOMなので
//	**CSSのstepsアニメ**で背景位置をコマ送りする。JSは1回もフレームを跨がない。

import {decryptPicUrl} from './Crypto';

// 1コマぶんの位置情報。x/yはシート画像内の実座標（TexturePackerが不規則パッキングするため、
//	格子仮定では求まらない）。ox/oyはtrim分のオフセット（トリム無しなら0,0）
export type T_FRAME = {x: number; y: number; w: number; h: number; ox: number; oy: number};

// シート全体。CSSアニメを組むのに要るだけの情報へ畳んである
export type T_SHEET = {
	img		: string;	// シート画像（png）の解決済みURL
	boxW	: number;	// 表示box幅（トリム前の共通サイズ＝TexturePackerのsourceSize。トリム無しはframeのw）
	boxH	: number;	// 表示box高さ
	frames	: T_FRAME[];	// 各コマ（定義順）
	cnt		: number;	// 実際のコマ数（=frames.length）
	sec		: number;	// 一巡の秒数
};

// TexturePacker形式（本家がpixiのSpritesheetへ食わせているのと同じjson）の必要部分
type T_SHEET_JSON = {
	frames	: {[nm: string]: {
		frame			: {x: number; y: number; w: number; h: number};
		spriteSourceSize?: {x: number; y: number};	// trimmed時のオフセット
		sourceSize?		: {w: number; h: number};	// トリム前の共通サイズ
	}};
	meta	: {image?: string; size?: {w: number; h: number}; animationSpeed?: number};
};

// jsonからCSSアニメ用の情報を作る（純粋）。imgはシート画像の解決済みURL。
//	**各コマの実座標をそのまま使う**（以前は「フレーム数とシートサイズから均等グリッドと仮定」
//	していたが、TexturePackerは省スペース化のため不規則にパッキングするため、この仮定はほぼ
//	必ず外れて無関係な矩形を表示していた＝todo.md 2026-08-23記載の[graph]/[fg]表示不具合の原因）
export function parseSheet(json: unknown, img: string): T_SHEET | undefined {
	const {frames, meta} = json as T_SHEET_JSON;
	const aFr = Object.values(frames ?? {});
	const f0 = aFr[0];
	if (! f0 || ! meta.size) return undefined;

	const {w: boxW, h: boxH} = f0.sourceSize ?? f0.frame;
	if (boxW <= 0 || boxH <= 0) return undefined;

	// 本家（pixi AnimatedSprite）のanimationSpeedは「1tickあたりに進むコマ数」で、
	//	tickは60fps。つまり 0.2 なら毎秒12コマ＝一巡は コマ数 /(60*0.2) 秒
	const spd = meta.animationSpeed ?? 1;
	return {
		img, boxW, boxH,
		frames: aFr.map(({frame, spriteSourceSize}): T_FRAME=> ({
			x: frame.x, y: frame.y, w: frame.w, h: frame.h,
			ox: spriteSourceSize?.x ?? 0, oy: spriteSourceSize?.y ?? 0,
		})),
		cnt	: aFr.length,
		sec	: aFr.length / (60 * (spd > 0 ? spd : 1)),
	};
}

// GrpLayer/TxtLayerはsysを持たない（Reactコンポーネント）ので、SysBase.loaded()から
//	一度だけ注入する。既定は素のfetch・恒等関数・crypto:false（テストや未注入時のフォールバック）
let snFetch: (url: string, init?: RequestInit)=> Promise<Response> = (url, init)=> fetch(url, init);
let snDec: (ext: string, tx: string)=> Promise<string> = (_ext, tx)=> Promise.resolve(tx);
let snDecAB: (ab: ArrayBuffer)=> Promise<ArrayBuffer> = ab=> Promise.resolve(ab);
let snCrypto = false;
export function setFetch(f: typeof snFetch) {snFetch = f}
// crypto:true構成での複号関数。jsonは本家と同じくテキストとしてsys.decへ（ScriptMng #fetchScript
//	と同じ扱い）、シート画像はts/Crypto.tsのdecryptPicUrlで他の画像・動画と同じ経路へ通す。
//	**cryptoも一緒に渡す**——decryptPicUrl自身がcrypto:false時に素通しする作りなので、ここは
//	sys.cryptoをそのまま伝えるだけでよい（渡し忘れるとcrypto:false構成でも無駄にBlob URL化される）
export function setDecFncs(dec: typeof snDec, decAB: typeof snDecAB, crypto: boolean) {snDec = dec; snDecAB = decAB; snCrypto = crypto}

// .jsonのURLからシートを読む。**同じシートを何度も取りに行かないようここで覚える**
//	（表裏ページ・複数レイヤが同じ画像を使う。モジュールレベルに置くのは FocusMng と同じ形）
const hSheet: {[jsonSrc: string]: Promise<T_SHEET | undefined>} = Object.create(null);

export function loadSheet(jsonSrc: string): Promise<T_SHEET | undefined> {
	return hSheet[jsonSrc] ??= snFetch(jsonSrc)
		.then(async r=> {
			if (! r.ok) throw `${String(r.status)} ${r.statusText}`;
			return snDec('json', decodeText(await r.arrayBuffer()));
		})
		.then(tx=> JSON.parse(tx) as unknown)
		.then(async json=> parseSheet(json, await decryptPicUrl(sheetImgSrc(jsonSrc, json), snCrypto, snFetch, snDecAB)))
		.catch(()=> undefined);	// 読めなければただの静止画として扱う（表示は止めない）
}

// BOMを見てUTF-8/UTF-16LE/UTF-16BEを判定しデコードする。`fetch().text()`は常にUTF-8決め打ちで
//	BOMをsniffingしないため（本家はpixiのLoaderがXHR responseText経由で読み、ブラウザがBOMを見て
//	自動デコードするので暗黙に通っていた）、TexturePacker系ツール（Adobe Flash CS6等）が書き出す
//	UTF-16LE BOM付きjsonだとJSON.parseが文字化けで失敗し、シートが静かに読めなくなっていた
function decodeText(buf: ArrayBuffer): string {
	const b = new Uint8Array(buf);
	if (b[0] === 0xFF && b[1] === 0xFE) return new TextDecoder('utf-16le').decode(buf.slice(2));
	if (b[0] === 0xFE && b[1] === 0xFF) return new TextDecoder('utf-16be').decode(buf.slice(2));
	return new TextDecoder('utf-8').decode(buf);	// UTF-8 BOMもTextDecoderが読み飛ばす
}

// シート画像のURL。json内の`meta.image`を**jsonと同じ場所**から引く（本家も同じ扱い）
export function sheetImgSrc(jsonSrc: string, json: unknown): string {
	const img = (json as T_SHEET_JSON).meta.image ?? '';
	return jsonSrc.replace(/[^/]*$/, '') + img;
}


// 画像/動画/アニメpngシートの自然サイズ。`[lay width=/height=]`未指定時の
//	`const.sn.lay[N].<fore|back>.width/.height`（本家 GrpLayer.ts:88-108相当）に使う。
//	srcキーで覚えるのは上のhSheetと同じ形（表裏ページ・複数レイヤが同じ画像を使うため）。
//	書き込みはGrpLayer.tsx側（img onLoad/video onLoadedMetadata/シートロード完了）が行う
const hNatSize: {[src: string]: {w: number; h: number}} = Object.create(null);
export function setNatSize(src: string, w: number, h: number) {hNatSize[src] = {w, h}}
export function getNatSize(src: string): {w: number; h: number} | undefined {return hNatSize[src]}

// 再生用CSSを<head>へ入れ、当てるクラス名を返す。**シートごとに1回だけ**作って使い回す。
//	emotionのcssではなく素のクラスにしてあるのは、Reactの外で組み立てるDOM
//	（TxtLayerの本文＝[graph]や[l]/[p]の待ちマーク）からも同じ物を当てたいため。
//	JSは1コマも跨がない：実コマ（cnt個）ぶんのbackground-positionを@keyframesへ
//	直接列挙し、animation-timing-function: step-endでコマ間をジャンプさせる
//	（本家はpixiのAnimatedSprite）。cols*rows（物理格子）ではなくcnt基準なので、
//	格子が埋まりきらないシートでも余りマス（透明領域）を踏まない
const hCls: {[img: string]: string} = Object.create(null);
let cntCls = 0;

export function aniSpriteClass(sh: T_SHEET, doc: Document = document): string {
	const known = hCls[sh.img];
	if (known) return known;

	const cls = hCls[sh.img] = `sn_ani${String(++cntCls)}`;
	const st = doc.createElement('style');
	st.dataset['sn'] = 'sprite';
	st.textContent = aniSpriteCss(sh, cls);
	doc.head.appendChild(st);
	return cls;
}

// 上のCSS本体（純粋）。テストしたいのはこちら
export function aniSpriteCss({img, boxW, boxH, frames, cnt, sec}: T_SHEET, cls: string): string {
	// コマ番号iのbackground-position＋clip-path。boxはtrim前の共通サイズで固定し、
	//	その中の(ox,oy)〜(ox+w,oy+h)だけをclip-pathで残す（trim分の余白に背景画像の
	//	無関係な隣コマが透けて見えるのを防ぐ。trim無し＝ox=oy=0, w=boxW, h=boxHなら
	//	insetは全辺0で実質クリップ無し）
	const declOf = ({x, y, w, h, ox, oy}: T_FRAME): string =>
		`background-position: ${String(-x + ox)}px ${String(-y + oy)}px; `
		+`clip-path: inset(${String(oy)}px ${String(boxW - ox - w)}px ${String(boxH - oy - h)}px ${String(ox)}px);`;
	const aStep = frames.map((f, i)=>
		`\t${String(Math.round(i / cnt * 1e6) / 1e4)}% {${declOf(f)} animation-timing-function: step-end;}`
	).join('\n');
	return `@keyframes ${cls}_f {
${aStep}
	100% {${declOf(frames[0]!)}}
}
.${cls} {
	display: inline-block;
	width: ${String(boxW)}px;
	height: ${String(boxH)}px;
	background-image: url(${JSON.stringify(img)});
	background-repeat: no-repeat;
	background-position: 0 0;
	animation: ${cls}_f ${String(sec)}s infinite;
}`;
}
