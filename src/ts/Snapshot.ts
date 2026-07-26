/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2026-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

// [snapshot]の画像化（本家 LayerMng.ts:338 #snapshot() のDOM版）。
//	本家はpixiのレンダラでステージをもう一度描いてピクセルを取り出すが、こちらの表示はDOMなので
//	同じ手が使えない。代わりにブラウザ標準の道具だけで済ませる：
//		DOMを複製 → SVGの<foreignObject>に入れる → data URLの<img>にする → <canvas>へ描く → PNG
//	外部ライブラリ（html2canvas等）を足さずに済むかわり、SVG化には以下の制約がある。
//	どれもブラウザ側の仕様なので回避策ではなく前提として扱う：
//	・<img>としてロードされたSVGは**外部リソースを一切取りにいけない**。よって画像は
//	  data URIへ埋め込んでから入れる（inlineImgs）。
//	・CSSも同じ理由で外から読めないので、ページ側のスタイルシートを文字列にして中へ入れる
//	  （collectCss）。emotionが挿す<style>もここで拾える。
//	・iframe（[add_frame]のHTMLフレーム）の中身は描かれない。本家もweb版はpixiのステージだけを
//	  撮る＝フレームは写らないので、結果としては同じ絵になる。

import {getDateStr} from '../sn/CmnLib';


// 撮影対象からiframeを外すためのタグ名（中身が描かれず白い矩形になるだけなので落とす）
const A_DROP_TAG = new Set(['IFRAME', 'SCRIPT', 'CANVAS', 'VIDEO']);

export type T_SNAP_ARG = {
	el		: HTMLElement;	// 撮る元。ステージの内箱（等倍。transform: scaleが掛かる前の寸法で読む）
	sw		: number;		// 元の論理サイズ（ステージ実寸）
	sh		: number;
	width	: number;		// 出力サイズ。元と違えば拡縮される
	height	: number;
	bgColor	: string;		// 背景色。CSSの色文字列（rgba()なら透過）
	page	: 'fore' | 'back';	// どちらのページを撮るか
	aLayNm	: string[] | null;	// 撮るレイヤ名。nullは全レイヤ
	mime	: string;		// 出力フォーマット。'image/png' か 'image/jpeg'
	smoothing: boolean;		// 拡大・縮小時に補間するか
};

// 拡張子から出力フォーマットを決める（本家 tag.html#snapshot「保存する画像フォーマットは拡張子で指定」）。
//	知らない拡張子はpng扱い＝ファイル名だけ違う同じ絵になる（撮影ごと失敗させない）
export function mimeOfFn(fn: string): string {
	return /\.jpe?g$/i.test(fn) ? 'image/jpeg' : 'image/png';
}

// ダウンロードするときのファイル名。本家は `fn + 日時 + '.png'`（LayerMng.ts:343）で**常にpng**、
//	拡張子でフォーマットを選べるのは userdata:/ 側だけになっていた。こちらは**日時を拡張子の前**へ
//	入れて、どちらの行き先でも tag.html どおり拡張子でフォーマットが決まるようにする
export function dlFn(fn: string): string {
	const dt = getDateStr('-', '_', '');	// 本家 LayerMng.ts:339 と同じ並び（2026-07-26_1830）
	const m = /\.\w+$/.exec(fn);
	return m ? fn.slice(0, m.index) + dt + m[0] : `${fn}${dt}.png`;
}

// [snapshot b_color=]の 0xAARRGGBB をCSSの色文字列へ。**高2桁がアルファ**で、
//	[lay b_color=]の0xRRGGBBとは別物（tag.html#snapshot「透過2桁＋赤2桁＋緑2桁＋青2桁」）。
//	0x0で完全透過、不透明な黒は0xFF000000
export function rgbaOf(c: number): string {
	const a = (c >>> 24) / 255;
	return `rgba(${String(c >> 16 & 0xFF)}, ${String(c >> 8 & 0xFF)}, ${String(c & 0xFF)}, ${String(a)})`;
}

// 撮影して data URL（image/png）を返す
export async function snapshotToPng(o: T_SNAP_ARG): Promise<string> {
	const clone = o.el.cloneNode(true) as HTMLElement;

	// 拡縮（transform: scale）は撮影には邪魔なので外し、論理サイズで固定する。
	//	出力サイズへの拡縮は最後にcanvasへ描くときにまとめて行う
	clone.style.transform = 'none';
	clone.style.width	= `${String(o.sw)}px`;
	clone.style.height	= `${String(o.sh)}px`;

	prune(clone, o.page, o.aLayNm);
	await inlineImgs(clone);

	// <foreignObject>の中はXHTML。属性値のエスケープはXMLSerializerに任せる
	const body = new XMLSerializer().serializeToString(clone);
	const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${String(o.sw)}" height="${String(o.sh)}">`
		+ `<foreignObject x="0" y="0" width="100%" height="100%">`
		+ `<div xmlns="http://www.w3.org/1999/xhtml">`
		+ `<style>${collectCss()}</style>${body}`
		+ `</div></foreignObject></svg>`;

	const img = await loadImg(
		`data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`);

	const cvs = document.createElement('canvas');
	cvs.width	= o.width;
	cvs.height	= o.height;
	const ctx = cvs.getContext('2d');
	if (! ctx) throw 'canvasの2Dコンテキストが取れません';
	// 拡大・縮小の補間（本家の smoothing 属性＝pixiの antialias）。**既定はfalse**なので
	//	canvasの既定（true）から明示的に倒す
	ctx.imageSmoothingEnabled = o.smoothing;
	// 背景。**アルファ0なら塗っても透明のまま**（canvasは元から透明）なので、
	//	[snapshot b_color=0x0]の透過pngはこれだけで出る。jpgに透過は無いので黒く潰れる（本家も同じ）
	ctx.fillStyle = o.bgColor;
	ctx.fillRect(0, 0, o.width, o.height);
	ctx.drawImage(img, 0, 0, o.width, o.height);

	return cvs.toDataURL(o.mime);
}

// 撮らない要素を落とす。ページ（data-page）とレイヤ（data-lay）はStage.tsx/各Layerが出している
function prune(root: HTMLElement, page: 'fore' | 'back', aLayNm: string[] | null) {
	for (const e of [...root.querySelectorAll<HTMLElement>('*')]) {
		if (A_DROP_TAG.has(e.tagName)) {e.remove(); continue}

		const p = e.dataset.page;
		if (p !== undefined && p !== page) {e.remove(); continue}

		// 裏ページは普段 visibility:hidden なので、撮るページは必ず見えるようにする
		if (p === page) {e.style.visibility = 'visible'; e.style.opacity = '1'}

		const l = e.dataset.lay;
		if (l !== undefined && aLayNm && ! aLayNm.includes(l)) e.remove();
	}
}

// <img>のsrcをdata URIへ差し替える（SVG内から外部URLを取りにいけないため）。
//	取得に失敗した画像は黙って落とす（1枚のせいで撮影ごと失敗させない）
async function inlineImgs(root: HTMLElement) {
	const aImg = [...root.querySelectorAll('img')];
	await Promise.all(aImg.map(async im=> {
		const {src} = im;
		if (! src || src.startsWith('data:')) return;
		try {im.setAttribute('src', await toDataUri(src))}
		catch {im.remove()}
	}));
}
async function toDataUri(url: string): Promise<string> {
	const res = await fetch(url);
	if (! res.ok) throw `画像が取得できません url:${url}`;

	const blob = await res.blob();
	return new Promise<string>((re, rj)=> {
		const fr = new FileReader;
		fr.onload = ()=> re(String(fr.result));
		fr.onerror = ()=> rj(new Error(`画像が読めません url:${url}`));
		fr.readAsDataURL(blob);
	});
}

// ページのCSSを1つの文字列に集める。emotionは<style>要素へ規則を挿すので、
//	document.styleSheetsを辿れば component 側のcssも含めて拾える。
//	他オリジンのシートは cssRules を読むと例外になるので黙って飛ばす
function collectCss(): string {
	const a: string[] = [];
	for (const ss of [...document.styleSheets]) {
		try {for (const r of [...ss.cssRules]) a.push(r.cssText)}
		catch {/* 他オリジンのシートは読めない。撮影を止めるほどのことではない */}
	}
	return a.join('\n');
}

function loadImg(src: string): Promise<HTMLImageElement> {
	return new Promise((re, rj)=> {
		const im = new Image;
		im.onload = ()=> re(im);
		im.onerror = ()=> rj(new Error('スナップショットの画像化に失敗しました'));
		im.src = src;
	});
}

// ダウンロードさせる（本家 SysWeb.ts:256 savePic()）
export function savePic(fn: string, dataUrl: string) {
	const a = document.createElement('a');
	a.href = dataUrl;
	a.download = fn;
	a.click();
}
