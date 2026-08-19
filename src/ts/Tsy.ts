/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2026-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

// トゥイーン（[tsy]系タグ）のうち、GSAPもDOMも触らない部分。
//	本家 CmnTween.ts の cnvTweenArg()（属性値→目標値）と ease()（イージング名の解決）に対応する。
//	エンジン（ScriptEngine）から呼べるようにここへ分けてある：
//	実際にアニメーションを回すのはScriptMng（GSAP）だが、属性の解釈と検査は
//	シナリオ実行時＝エンジン側でやりたいため（書き間違いをその場で例外にできる）


// トゥイーンできるレイヤ属性。本家 CmnTween.aLayerPrpNm はpixiのプロパティ名で
//	x/y/width/height/pivot_x/pivot_y/alpha/rotation/scale_x/scale_y。
//	x/yはleft/topの別名として受ける（本家 ext_fg.sn が[tsy]にleft/topと書き、
//	ext_fg2.sn がx/yと書いていて揺れているため。**本家では[tsy left=…]は
//	aLayerPrpNmに無いので黙って無視される**が、こちらは両方効くようにした）。
//	width/heightは[lay width=/height=]で数値を持たせたレイヤに限り動かせる
//	（CSSの既定=auto＝画像の自然サイズ／文字レイヤの70%には対応する現在値が無いため。
//	H_TSY_DEFに無いキーはScriptMng.#beginTsy()が「[lay width=…]で寸法を明示したレイヤにしか
//	使えない」という文言で例外にする）
export const A_TSY_PRP = ['alpha', 'left', 'top', 'width', 'height', 'rotation', 'scale_x', 'scale_y', 'pivot_x', 'pivot_y'] as const;
export type T_TSY_PRP = typeof A_TSY_PRP[number];

// [tsy_frame]（HTMLフレームのトゥイーン）が動かせる属性。本家 FrameMng.ts:373 #tsy_frame() が読む分。
//	フレームはレイヤと座標系の呼び名が違う（left/topではなくx/y、rotationではなくrotate）ので別表にする
export const A_TSY_FRM_PRP = ['alpha', 'x', 'y', 'width', 'height', 'scale_x', 'scale_y', 'rotate'] as const;
export type T_TSY_FRM_PRP = typeof A_TSY_FRM_PRP[number];

// 目標値。relがtrueなら「現在値からの相対」。現在値はレイヤのストア（フレームならFrameMng）が
//	持っているので、最終的な数値を決めるのはScriptMng側（＝ここでは相対のままにしておく）
export type T_TSY_TO = {[prp: string]: {v: number; rel: boolean} | undefined};

// 属性値が未指定のときに現在値として使う既定（＝T_LAY_STYが未指定＝各レイヤのCSS既定の値）。
//	width/heightはCSSの既定（auto）に対応する数値が無いため、キーを持たせない
//	（未指定＝そのレイヤに[lay width=/height=]の明示が無い、とScriptMng側が区別する）
export const H_TSY_DEF: {[K in T_TSY_PRP]?: number} = {
	alpha: 1, left: 0, top: 0, rotation: 0, scale_x: 1, scale_y: 1, pivot_x: 0, pivot_y: 0,
};


// 属性値の書式（本家 CmnTween.cnvTweenArg() のコメントそのまま）：
//	 500		その値へ
//	'=500'		現在値に+500した値へ
//	'250,500'	250〜500のランダムな値へ
//	'=250,500'	現在値に250〜500のランダムな値を加算した値へ
export function cnvTweenArg(tag: string, args: {[k: string]: string}, aPrp: readonly string[] = A_TSY_PRP): T_TSY_TO {
	const hTo: T_TSY_TO = {};
	const put = (prp: string, arg: string | undefined)=> {
		if (! arg) return;	// 本家同様、空文字・未指定は「その属性は動かさない」

		const rel = arg.startsWith('=');
		const vx = rel ? arg.slice(1) : arg;
		if (! vx) return;

		const [s0 = '0', s1] = vx.split(',');
		let v = parseFloat(s0);
		if (! Number.isFinite(v)) throw `[${tag}] ${prp}の値が不正です：${arg}`;
		if (s1) {
			const v1 = parseFloat(s1);
			if (! Number.isFinite(v1)) throw `[${tag}] ${prp}の値が不正です：${arg}`;
			v += Math.round(Math.random() * (v1 - v + 1));
		}
		hTo[prp] = {v, rel};
	};
	for (const prp of aPrp) put(prp, args[prp]);
	// x/yはleft/topの別名。明示のleft/topがあればそちらが勝つ
	//	（フレーム側＝A_TSY_FRM_PRPはx/yが実名なので、この読み替えは要らない）
	if (aPrp.includes('left')) {
		if (args.left === undefined) put('left', args.x);
		if (args.top === undefined) put('top', args.y);
	}

	return hTo;
}


// [tsy path=…]：複数区間の経路（本家 CmnTween.ts:167 と #REG_TSY_PATH）。
//	`(x,y,alpha)` を並べるか、`{…}`のJSONで書く。値の書式は上のcnvTweenArg()と同じ。
//	**相対（先頭`=`）はどの区間も「トゥイーン開始時の値」が基準**なので、
//	`(,=50) (,=0)` が「50下げてから元へ戻す」になる（本家も区間ごとに開始値へ足す形）。
//	区間を繋ぐのはScriptMng（GSAPのtimeline。本家はtween.jsのchain()）
const REG_TSY_PATH = /\(\s*(?:(?<x>[-=\d.]+)|(['"])(?<x2>.*?)\2)?(?:\s*,\s*(?:(?<y>[-=\d.]+)|(['"])(?<y2>.*?)\5)?(?:\s*,\s*(?:(?<o>[-=\d.]+)|(['"])(?<o2>.*?)\8))?)?|(?<json>\{[^{}]*})/g;

export function parseTsyPath(tag: string, path: string, aPrp: readonly string[] = A_TSY_PRP): T_TSY_TO[] {
	const aTo: T_TSY_TO[] = [];
	for (const {groups} of path.matchAll(REG_TSY_PATH)) {
		const {x, x2, y, y2, o, o2, json} = groups!;
		const args: {[k: string]: string} = {};
		if (json) {
			let h: {[k: string]: unknown};
			// 本家はJSONの誤りをconsole.errorで流してその区間を捨てるが、
			//	こちらは書き間違いをその場で知らせる（他の属性の扱いと揃える）
			try {h = JSON.parse(json) as {[k: string]: unknown}}
			catch (e) {throw `[${tag}] path内のJSONが不正です：${json} ${String(e)}`}
			for (const [k, v] of Object.entries(h)) args[k] = String(v);
		}
		else {
			const xx = x ?? x2;	if (xx) args.x = xx;
			const yy = y ?? y2;	if (yy) args.y = yy;
			const oo = o ?? o2;	if (oo) args.alpha = oo;
		}
		aTo.push(cnvTweenArg(tag, args, aPrp));
	}
	return aTo;
}


// イージング名（本家 tween.js の書式。CmnTween.ts:184-262 #hEase の移植）を実関数へ。
//	tween.jsはMITなので式そのものを流用可（本家コメントと同じ根拠）。GSAP時代は名前を
//	GSAPの書式へ機械変換していたが、motion（Tw.ts）は`ease`に関数をそのまま渡せるため、
//	ここで直接31種の実装を持つ（副次的に、GSAPのpower1〜4/back/elasticとtween.jsの
//	数値差が消えて本家と完全一致するようになった）
function bounceOut(k: number): number {
	if (k < 1 / 2.75) return 7.5625 * k * k;
	if (k < 2 / 2.75) return 7.5625 * (k -= 1.5 / 2.75) * k + 0.75;
	if (k < 2.5 / 2.75) return 7.5625 * (k -= 2.25 / 2.75) * k + 0.9375;
	return 7.5625 * (k -= 2.625 / 2.75) * k + 0.984375;
}
const H_EASE: {[name: string]: (k: number)=> number} = {
	'Back.In'			: k=> {
		const s = 1.70158;
		return k === 1 ? 1 : k*k*((s+1)*k -s);
	},
	'Back.InOut'		: k=> {
		const s = 1.70158 * 1.525;
		if ((k *= 2) < 1) return 0.5 * (k*k*((s+1)*k -s));
		return 0.5 * ((k -= 2) *k*((s+1)*k +s) +2);
	},
	'Back.Out'			: k=> {
		const s = 1.70158;
		return k === 0 ? 0 : --k*k*((s+1)*k +s) +1;
	},
	'Bounce.In'			: k=> 1 -bounceOut(1 -k),
	'Bounce.InOut'		: k=> k < 0.5
		? (1 -bounceOut(1 -k*2)) * 0.5
		: bounceOut(k*2 -1) * 0.5 +0.5,
	'Bounce.Out'		: k=> bounceOut(k),
	'Circular.In'		: k=> 1 -Math.sqrt(1 -k*k),
	'Circular.InOut'	: k=> {
		if ((k *= 2) < 1) return -0.5 * (Math.sqrt(1 -k*k) -1);
		return 0.5 * (Math.sqrt(1 -(k -= 2) *k) +1);
	},
	'Circular.Out'		: k=> Math.sqrt(1 - --k * k),
	'Cubic.In'			: k=> k*k*k,
	'Cubic.InOut'		: k=> {
		if ((k *= 2) < 1) return 0.5 * k*k*k;
		return 0.5 * ((k -= 2) *k*k +2);
	},
	'Cubic.Out'			: k=> --k*k*k +1,
	'Elastic.In'		: k=> {
		if (k === 0) return 0;
		if (k === 1) return 1;
		return -Math.pow(2, 10 * (k -1)) * Math.sin((k -1.1) *5 *Math.PI);
	},
	'Elastic.InOut'		: k=> {
		if (k === 0) return 0;
		if (k === 1) return 1;
		k *= 2;
		if (k < 1) return -0.5 * Math.pow(2, 10 * (k -1)) * Math.sin((k -1.1) *5 *Math.PI);
		return 0.5 * Math.pow(2, -10 * (k -1)) * Math.sin((k -1.1) *5 *Math.PI) +1;
	},
	'Elastic.Out'		: k=> {
		if (k === 0) return 0;
		if (k === 1) return 1;
		return Math.pow(2, -10 *k) * Math.sin((k -0.1) *5 *Math.PI) +1;
	},
	'Exponential.In'	: k=> k === 0 ? 0 : Math.pow(1024, k -1),
	'Exponential.InOut'	: k=> {
		if (k === 0) return 0;
		if (k === 1) return 1;
		if ((k *= 2) < 1) return 0.5 * Math.pow(1024, k -1);
		return 0.5 * (-Math.pow(2, -10 * (k -1)) +2);
	},
	'Exponential.Out'	: k=> k === 1 ? 1 : 1 -Math.pow(2, -10 *k),
	'Linear.None'		: k=> k,
	'Quadratic.In'		: k=> k*k,
	'Quadratic.InOut'	: k=> {
		if ((k *= 2) < 1) return 0.5 * k*k;
		return -0.5 * (--k * (k -2) -1);
	},
	'Quadratic.Out'		: k=> k * (2 -k),
	'Quartic.In'		: k=> k*k*k*k,
	'Quartic.InOut'		: k=> {
		if ((k *= 2) < 1) return 0.5 * k*k*k*k;
		return -0.5 * ((k -= 2) *k*k*k -2);
	},
	'Quartic.Out'		: k=> 1 - --k * k * k * k,
	'Quintic.In'		: k=> k*k*k*k*k,
	'Quintic.InOut'		: k=> {
		if ((k *= 2) < 1) return 0.5 * k*k*k*k*k;
		return 0.5 * ((k -= 2) *k*k*k*k +2);
	},
	'Quintic.Out'		: k=> --k*k*k*k*k +1,
	'Sinusoidal.In'		: k=> 1 -Math.sin(((1.0 -k) *Math.PI) /2),
	'Sinusoidal.InOut'	: k=> 0.5 * (1 -Math.sin(Math.PI * (0.5 -k))),
	'Sinusoidal.Out'	: k=> Math.sin((k *Math.PI) /2),
};

// 名前の妥当性検査（本家 CmnTween.ease() と同じ扱い）。ScriptEngine がシナリオ実行時に
//	呼び、書き間違いをその場で例外にする。戻り値は正規化した名前（未指定は既定の'Linear.None'）
export function chkEase(nm: string | undefined): string {
	if (! nm) return 'Linear.None';
	if (! H_EASE[nm]) throw `異常なease指定です：${nm}`;
	return nm;
}

// 名前→実関数。ScriptMng がトゥイーンを組み立てる際に呼ぶ
export function easeFn(nm: string | undefined): (k: number)=> number {
	return H_EASE[chkEase(nm)]!;
}


// トゥイーン名（本家 CmnTween.#tw_nm()）。name省略時はレイヤ名がそのまま名前になる。
//	フレーム（[tsy_frame]）は id から `frm\nID` を作る（改行入りでレイヤ名と絶対にぶつからない）
export function tsyName(tag: string, args: {[k: string]: string}): string {
	if (args.id) return `frm\n${args.id}`;

	const nm = args.name ?? args.layer ?? '';
	if (! nm) throw `[${tag}] トゥイーンが指定されていません（name／layerのどちらも無し）`;

	return nm;
}
