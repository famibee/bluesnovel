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

// 1コマの大きさと格子。CSSアニメを組むのに要るだけの情報へ畳んである
export type T_SHEET = {
	img		: string;	// シート画像（png）の解決済みURL
	fw		: number;	// 1コマの幅
	fh		: number;	// 1コマの高さ
	cols	: number;
	rows	: number;
	cnt		: number;	// 実際のコマ数（格子が埋まりきらないこともある）
	sec		: number;	// 一巡の秒数
	isCol	: boolean;	// コマの並び順が縦優先（列ごとに下へ進む）か
};

// TexturePacker形式（本家がpixiのSpritesheetへ食わせているのと同じjson）の必要部分
type T_SHEET_JSON = {
	frames	: {[nm: string]: {frame: {x: number; y: number; w: number; h: number}}};
	meta	: {image?: string; size?: {w: number; h: number}; animationSpeed?: number};
};

// jsonからCSSアニメ用の情報を作る（純粋）。imgはシート画像の解決済みURL
export function parseSheet(json: unknown, img: string): T_SHEET | undefined {
	const {frames, meta} = json as T_SHEET_JSON;
	const aFr = Object.values(frames ?? {}).map(v=> v.frame);
	const f0 = aFr[0];
	if (! f0 || ! meta.size) return undefined;

	const {w: fw, h: fh} = f0;
	if (fw <= 0 || fh <= 0) return undefined;

	// コマの並び順。2コマ目が真下なら縦優先（本家サンプルのclock/breaklineがこれ）
	const isCol = (aFr[1]?.x ?? -1) === f0.x && (aFr[1]?.y ?? -1) !== f0.y;
	// 本家（pixi AnimatedSprite）のanimationSpeedは「1tickあたりに進むコマ数」で、
	//	tickは60fps。つまり 0.2 なら毎秒12コマ＝一巡は コマ数 /(60*0.2) 秒
	const spd = meta.animationSpeed ?? 1;
	return {
		img, fw, fh,
		cols: Math.max(1, Math.round(meta.size.w / fw)),
		rows: Math.max(1, Math.round(meta.size.h / fh)),
		cnt	: aFr.length,
		sec	: aFr.length / (60 * (spd > 0 ? spd : 1)),
		isCol,
	};
}

// .jsonのURLからシートを読む。**同じシートを何度も取りに行かないようここで覚える**
//	（表裏ページ・複数レイヤが同じ画像を使う。モジュールレベルに置くのは FocusMng と同じ形）
const hSheet: {[jsonSrc: string]: Promise<T_SHEET | undefined>} = Object.create(null);

export function loadSheet(jsonSrc: string): Promise<T_SHEET | undefined> {
	return hSheet[jsonSrc] ??= fetch(jsonSrc)
		.then(async r=> {
			if (! r.ok) throw `${String(r.status)} ${r.statusText}`;
			return r.json() as Promise<unknown>;
		})
		.then(json=> parseSheet(json, sheetImgSrc(jsonSrc, json)))
		.catch(()=> undefined);	// 読めなければただの静止画として扱う（表示は止めない）
}

// シート画像のURL。json内の`meta.image`を**jsonと同じ場所**から引く（本家も同じ扱い）
export function sheetImgSrc(jsonSrc: string, json: unknown): string {
	const img = (json as T_SHEET_JSON).meta.image ?? '';
	return jsonSrc.replace(/[^/]*$/, '') + img;
}


// 再生用CSSを<head>へ入れ、当てるクラス名を返す。**シートごとに1回だけ**作って使い回す。
//	emotionのcssではなく素のクラスにしてあるのは、Reactの外で組み立てるDOM
//	（TxtLayerの本文＝[graph]や[l]/[p]の待ちマーク）からも同じ物を当てたいため。
//	・JSは1コマも跨がない：背景位置をCSSのstepsアニメで送る（本家はpixiのAnimatedSprite）
//	・速い軸／遅い軸の2本を重ねて格子を走査する。並びが縦優先（isCol）なら速い軸は縦
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
export function aniSpriteCss({img, fw, fh, cols, rows, sec, isCol}: T_SHEET, cls: string): string {
	// 一巡の時間。速い軸は「遅い軸1コマぶん」の間に一巡する
	const secX = isCol ? sec : sec / rows;
	const secY = isCol ? sec / cols : sec;
	return `@keyframes ${cls}_x {to {background-position-x: ${String(-cols * fw)}px}}
@keyframes ${cls}_y {to {background-position-y: ${String(-rows * fh)}px}}
.${cls} {
	display: inline-block;
	width: ${String(fw)}px;
	height: ${String(fh)}px;
	background-image: url(${JSON.stringify(img)});
	background-repeat: no-repeat;
	background-position: 0 0;
	animation: ${cls}_x ${String(secX)}s steps(${String(cols)}) infinite, ${cls}_y ${String(secY)}s steps(${String(rows)}) infinite;
}`;
}
