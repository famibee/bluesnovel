/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2026-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

// **タグ属性の「省略時の既定値」が本家と食い違っていないかの検査**。
//	本家は各タグの入口で `argChk_Num(hArg, 'width', 100)` のように既定を書く。
//	bluesnovelも同じ流儀（`#argNumDef(tag, nm, v, def)`）だが、**書き忘れても誰も気付かない**。
//	実際 [button] の width/height（本家 100/30）が抜けており、テンプレのシステムメニューが
//	文字量なりの幅になって隣と重なっていた（実機で発覚。CHANGELOG参照）。
//
//	ここでやることは2つ。
//	(1) 本家のソースから `argChk_*` の既定値を機械的に抜き出して**そのまま固定**する。
//	    本家が既定を変えた／新しい属性を足したら落ちる＝人間が見直す合図になる。
//	(2) こちらが「どう扱うと決めたか」を表で持ち、実際にその既定が出ることを
//	    **エンジンを走らせて**確かめる（属性を1つも書かないタグを実行し、積まれたアクションを見る）。
//
//	**ソースの文字列照合で「既定の書き忘れ」を自動検出するのは諦めた**。同じ属性名でも既定は
//	タグごとに違うのでタグ単位に切る必要があるが、[button]のように属性を総称ループ（#A_BTN_NUM）で
//	読む書き方だと `args.width` という字面が現れず追えない。逆に緩くすると誤検出だらけになる
//	（試作では9件中ほぼ全部が誤検出だった）。実際に走らせて出た値を見る方が確実で読みやすい。
//
//	**この検査ではCSS側のズレは見つからない**。「CSSに既定を任せる」と決めた属性は下の
//	A_CSS_DEF に理由付きで並べ、実際の値が本家と一致しているかは E2E が算出値で見張る。
//
//	`../skynovel_esm` が無い環境では丸ごとスキップする（このリポジトリの外にある参照用サンプル）。

import {ScriptEngine} from '../src/ts/ScriptEngine';

import {existsSync, readdirSync, readFileSync} from 'node:fs';
import {expect, it} from 'bun:test';


const DIR = `${import.meta.dir}/../../skynovel_esm/src/sn/`;
const EXISTS = existsSync(`${DIR}LayerMng.ts`);

// 本家の argChk_Num/Boolean(hArg, '属性', 既定) から「既定がリテラルのもの」を集める。
//	既定が `this.#b_alpha` や `this.scale.x`（＝現在値）のものは静的に比較できないので対象外
function upstreamDefaults(): {[attr: string]: Set<string>} {
	const h: {[attr: string]: Set<string>} = {};
	for (const fn of readdirSync(DIR)) {
		if (! fn.endsWith('.ts')) continue;
		const src = readFileSync(DIR + fn, 'utf8');
		const reg = /argChk_(?:Num|Boolean)\(hArg, '([a-z_0-9]+)', ([^,()]+?)\)/g;
		let m;
		while ((m = reg.exec(src))) {
			const [, attr = '', def = ''] = m;
			if (! /^(?:-?[\d.]+|0x[0-9A-Fa-f]+|true|false)$/.test(def)) continue;
			(h[attr] ??= new Set()).add(def);
		}
	}
	return h;
}

// **CSSに既定を任せると決めた属性**。ここに並ぶものは「エンジンで埋めない」のが正解で、
//	下流（各コンポーネントのCSS）の既定が本家と一致していることが前提になる。
//	その一致は test/e2e/argdef.e2e.ts が算出値で確かめる。
//	埋めてしまうと毎renderで全属性のインラインスタイルが出て、コンポーネント自身のCSSを
//	黙って上書きしてしまう（CLAUDE.md「表示属性はシナリオが書いたときだけ格納する」）
const A_CSS_DEF: {[attr: string]: string} = {
	alpha	: 'CSSのopacity既定=1（本家 Layer/Button/TxtStageとも1）',
	left	: 'CSSのleft=0（絶対配置の静的位置）',
	top		: 'CSSのtop=0',
	rotation: 'transformを出さない＝回転なし=0',
	scale_x	: 'transformを出さない＝等倍=1',
	scale_y	: 'transformを出さない＝等倍=1',
	rotate	: '[add_frame]/[frame]。FrameMngが既定を持つ（rotate:0）',
};

// **本家に既定はあるが、bluesnovelでは別の場所・別の形で持っているもの**。
//	理由を書いておかないと、次に見た人が「書き忘れ」と区別できない
const A_ELSEWHERE: {[attr: string]: string} = {
	vague	: '[trans]。既定は src/ts/Trans.ts の VAGUE_DEF（0.04）が持つ（純粋関数側に置いたため）',
	count	: '[jump]/[call]の既読カウント。#argBool相当を使わず、タグごとに既定を分けて解釈している',
};

// **本家にはあるが、そのタグ・その属性が未対応のもの**。docs/tag.html・todo.md と重複するが、
//	ここに書くのは「エンジンが同名の属性を別用途で触っている」ため検査に引っかかる分だけ
const A_NOT_YET: {[attr: string]: string} = {
	b			: 'Layer.ts のフィルター（ColorMatrix系）。フィルター13種は未対応',
	pa			: '同上',
	scale		: '同上（bulge_pinch等）',
	multiply	: '同上',
	clear_filter: '[lay clear_filter=]/[add_face clear_filter=]。未対応',
	dx			: 'SpritesMng（アニメpngのコマ位置）。未対応',
	dy			: '同上',
	er			: 'Reading.ts（読み戻り時の消去）。読み戻りは別の作り（Caretaker）',
	stop		: 'SndBuf/SpritesMng。音声・アニメpngの停止。未対応',
	wait		: 'LayerMng/TxtStage（文字表示ウェイト・文字出現演出）。[ch_in_style]系と一緒に',
};


// **属性を1つも書かないタグを実行して、積まれたアクションに既定が出ることを確かめる**。
//	本家の該当箇所を添えてあるので、食い違ったらどちらが正しいかをすぐ引ける
const LAYS = '[add_lay layer=base class=grp][add_lay layer=mes class=txt][current layer=mes]';
function actOf(src: string, t: string): Record<string, unknown> | undefined {
	return new ScriptEngine('t1', `${LAYS}${src}[s]`).step()
		.find(v=> v.t === t) as Record<string, unknown> | undefined;
}

it('省略時の既定が本家と同じ値で積まれる', ()=> {
	// [button]：**寸法だけは埋める**（本家 Button.ts:123 height=30 / :152 width=100）。
	//	pixiのTextは width/height の代入で文字スプライトそのものを拡縮するので、
	//	本家のボタンは文字数に関わらずこの大きさに揃う。CSSの既定（文字なりの幅）とは
	//	食い違うので、埋めないとテンプレのシステムメニューが隣と重なる
	expect(actOf('[button text=x label=*a]', 'addBtn')?.sty).toEqual({width: 100, height: 30});

	// [quake]：揺れ幅（本家 LayerMng.ts hmax/vmax とも10）。
	//	timeは本家も既定NaN＝実質必須なので、こちらが例外にするのは相違ではない
	expect(actOf('[quake time=100]', 'quake')).toMatchObject({hmax: 10, vmax: 10});

	// [trans]：time（本家 LayerMng.ts:640 argChk_Num(hArg,'time',0)）。
	//	vagueは値を持たせず、既定は純粋関数側（src/ts/Trans.ts の VAGUE_DEF=0.04）が持つ
	expect(actOf('[trans]', 'trans')).toMatchObject({time: 0});
	expect(actOf('[trans]', 'trans')?.vague).toBeUndefined();

	// [wt]：canskip（本家 CmnTween.ts:249 の既定 true）
	expect(actOf('[trans time=100][wt]', 'waitTrans')).toMatchObject({canskip: true});

	// [lay]：**配置・変形は埋めない**（下流のCSSが本家と同じ既定を持つため。A_CSS_DEF参照）。
	//	埋めると毎renderで全属性のインラインスタイルが出てコンポーネントのCSSを上書きしてしまう
	expect(actOf('[lay layer=base visible=true]', 'chgLay')?.sty).toEqual({visible: true});
});

it.skipIf(! EXISTS)('扱いを決めた表に、本家から消えた属性が残っていない', ()=> {
	// 本家が既定をやめた／属性名を変えたら、こちらの表も直す合図にする
	const hUp = upstreamDefaults();
	const aStale = [...Object.keys(A_CSS_DEF), ...Object.keys(A_ELSEWHERE), ...Object.keys(A_NOT_YET)]
		.filter(attr=> ! (attr in hUp));
	expect(aStale).toEqual([]);
});

it.skipIf(! EXISTS)('[button]の寸法は本家と同じ既定である', ()=> {
	// 今回の事故そのもの。表の外で個別に釘を打っておく（本家 Button.ts:123 / :152）
	const src = readFileSync(`${DIR}Button.ts`, 'utf8');
	expect(src).toContain(`argChk_Num(hArg, 'height', 30)`);
	expect(src).toContain(`argChk_Num(hArg, 'width', 100)`);
});
