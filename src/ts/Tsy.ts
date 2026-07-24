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
//	x/y/width/height/pivot_x/pivot_y/alpha/rotation/scale_x/scale_y だが、
//	bluesnovelのレイヤ属性はCSS寄りのleft/topで、width/height/pivotはまだ持っていない。
//	x/yはleft/topの別名として受ける（本家 ext_fg.sn が[tsy]にleft/topと書き、
//	ext_fg2.sn がx/yと書いていて揺れているため。**本家では[tsy left=…]は
//	aLayerPrpNmに無いので黙って無視される**が、こちらは両方効くようにした）
export const A_TSY_PRP = ['alpha', 'left', 'top', 'rotation', 'scale_x', 'scale_y'] as const;
export type T_TSY_PRP = typeof A_TSY_PRP[number];

// 目標値。relがtrueなら「現在値からの相対」。現在値はレイヤのストアが持っているので、
//	最終的な数値を決めるのはScriptMng側（＝ここでは相対のままにしておく）
export type T_TSY_TO = {[K in T_TSY_PRP]?: {v: number; rel: boolean}};

// 属性値が未指定のときに現在値として使う既定（＝T_LAY_STYが未指定＝各レイヤのCSS既定の値）
export const H_TSY_DEF: {[K in T_TSY_PRP]: number} = {
	alpha: 1, left: 0, top: 0, rotation: 0, scale_x: 1, scale_y: 1,
};


// 属性値の書式（本家 CmnTween.cnvTweenArg() のコメントそのまま）：
//	 500		その値へ
//	'=500'		現在値に+500した値へ
//	'250,500'	250〜500のランダムな値へ
//	'=250,500'	現在値に250〜500のランダムな値を加算した値へ
export function cnvTweenArg(tag: string, args: {[k: string]: string}): T_TSY_TO {
	const hTo: T_TSY_TO = {};
	const put = (prp: T_TSY_PRP, arg: string | undefined)=> {
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
	for (const prp of A_TSY_PRP) put(prp, args[prp]);
	// x/yはleft/topの別名。明示のleft/topがあればそちらが勝つ
	if (args.left === undefined) put('left', args.x);
	if (args.top === undefined) put('top', args.y);

	return hTo;
}


// イージング名を本家（tween.js）の書式からGSAPの書式へ。
//	本家は31種を名前で持つが、対応関係が付くので機械的に変換する。
//	tween.jsのQuadratic/Cubic/Quartic/QuinticはGSAPのpower1〜4に一対一で対応する
const H_EASE_FAMILY: {[name: string]: string} = {
	Quadratic	: 'power1',
	Cubic		: 'power2',
	Quartic		: 'power3',
	Quintic		: 'power4',
	Sinusoidal	: 'sine',
	Exponential	: 'expo',
	Circular	: 'circ',
	Elastic		: 'elastic',
	Back		: 'back',
	Bounce		: 'bounce',
};
const H_EASE_DIR: {[name: string]: string} = {In: 'in', Out: 'out', InOut: 'inOut'};

export function easeToGsap(nm: string | undefined): string {
	if (! nm) return 'none';		// 本家の既定も Linear.None（＝等速）
	const [fam = '', dir = ''] = nm.split('.');
	if (fam === 'Linear') return 'none';

	const f = H_EASE_FAMILY[fam];
	const d = H_EASE_DIR[dir];
	if (! f || ! d) throw `異常なease指定です：${nm}`;	// 本家 CmnTween.ease() と同じ扱い

	return `${f}.${d}`;
}


// トゥイーン名（本家 CmnTween.#tw_nm()）。name省略時はレイヤ名がそのまま名前になる。
//	本家はフレーム（[tsy_frame]）用に id から `frm\nID` を作る枝があるが、
//	フレーム自体が未対応なのでここでは省く
export function tsyName(tag: string, args: {[k: string]: string}): string {
	const nm = args.name ?? args.layer ?? '';
	if (! nm) throw `[${tag}] トゥイーンが指定されていません（name／layerのどちらも無し）`;

	return nm;
}
