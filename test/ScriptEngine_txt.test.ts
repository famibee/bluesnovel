/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2026-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

// 文字装飾タグ（[span]/[ch]/[ruby2]）。本家と同じく**本文ストリームへ命令を埋め込む**方式
//	（本家 LayerMng.ts:315 #cmdTxt）なので、エンジンが積むのは相変わらず文字列だけ。
//	そのため確かめるべきは「その文字列をScriptMngと同じ手順（Txt.ts splitCh）で割ったとき、
//	意図した表示単位になるか」。命令の形そのものは実装の内部事情なので直接は見ない。

import {ScriptEngine} from '../src/ts/ScriptEngine';
import {splitCh, plainTxt} from '../src/ts/Txt';

import {expect, it} from 'bun:test';


// シナリオを[s]まで走らせ、最後にchgStrが積んだ本文を表示単位へ割る
function units(src: string) {
	const a = new ScriptEngine('t1', `[add_lay layer=mes class=txt][current layer=mes]${src}[s]`).step();
	const last = a.filter(v=> v.t === 'chgStr').at(-1);
	return splitCh(last?.t === 'chgStr' ? last.str : '');
}

it('span_stylesFollowingText', ()=> {
	expect(units('あ[span style="color: red;"]い')).toEqual([
		{c: 'あ'}, {c: 'い', s: 'color: red;'},
	]);
});

it('span_withoutArgClears', ()=> {
	// 属性なしの[span]で解除（本家 TxtLayer.ts:804 #mergePushSpan）
	expect(units('[span style="color: red;"]あ[span]い')).toEqual([
		{c: 'あ', s: 'color: red;'}, {c: 'い'},
	]);
});

it('span_rubyStyle', ()=> {
	expect(units('[span r_style="color: lime;"]漢字《かんじ》')).toEqual([
		{c: '漢字', r: 'かんじ', rs: 'color: lime;'},
	]);
});

it('ch_appendsTextWithItsOwnStyle', ()=> {
	// [ch]のstyleはそのtextの間だけ効く
	expect(units('あ[ch text=いう style="color: lime;"]え')).toEqual([
		{c: 'あ'}, {c: 'い', s: 'color: lime;'}, {c: 'う', s: 'color: lime;'}, {c: 'え'},
	]);
});

it('ch_textCanContainRuby', ()=> {
	expect(units('[ch text=漢字《かんじ》]')).toEqual([{c: '漢字', r: 'かんじ'}]);
});

it('ch_rTagInTextBecomesNewline', ()=> {
	// [ch text=…]に改行を含める書き方（本家 LayerMng.ts:922）
	expect(units('[ch text="あ[r]い"]')).toEqual([{c: 'あ'}, {c: '\n'}, {c: 'い'}]);
});

it('ch_requiresText', ()=> {
	expect(()=> units('[ch style="color: red;"]')).toThrow('[ch] textは必須です');
});

it('ruby2_putsOneRubyUnit', ()=> {
	// [ruby2]は本家同様[ch]へ書き換えられる（t/rはURIエンコードして渡すので、
	//	空白や《》が入ってもルビ記法として壊れない）
	expect(units('[ruby2 t=蜊 r=あさり]')).toEqual([{c: '蜊', r: 'あさり'}]);
});

it('ruby2_rubyCanContainSpace', ()=> {
	// 空白はルビの区切り指定（本家 RubySpliter putTxtRb）。エンコードされるので1つのルビのまま
	expect(units('[ruby2 t=蜊 r="あさ り"]')).toEqual([{c: '蜊', r: 'あさ り'}]);
});

it('ruby2_withStyle', ()=> {
	expect(units('[ruby2 t=蜊 r=あさり style="color: purple;" r_style="color: lime;"]')).toEqual([
		{c: '蜊', r: 'あさり', s: 'color: purple;', rs: 'color: lime;'},
	]);
});

it('ruby2_requiresTandR', ()=> {
	expect(()=> units('[ruby2 r=あさり]')).toThrow('[ruby2] tは必須です');
	expect(()=> units('[ruby2 t=蜊]')).toThrow('[ruby2] rは必須です');
});

it('lastPagePlainText_dropsCmdAndRuby', ()=> {
	// 埋め込み命令は表示単位を作らないので、平文にも残らない
	const se = new ScriptEngine('t1',
		'[add_lay layer=mes class=txt][current layer=mes][span style="color: red;"]漢字《かんじ》[ch text=です][s]');
	se.step();
	expect(se.getVal('tmp:const.sn.last_page_plain_text')).toBe('漢字です');
	// 生の本文（const.sn.last_page_text）は命令込みなので、割り直せば同じ平文になる
	expect(plainTxt(String(se.getVal('tmp:const.sn.last_page_text')))).toBe('漢字です');
});

// ===== [tcy]（縦中横）・[link]〜[endlink]（ハイパーリンク） =====

it('tcy_makesOneUnitWithRuby', ()=> {
	expect(units('あ[tcy t=628 r=炎]い')).toEqual([
		{c: 'あ'}, {c: '628', r: '炎', tcy: true}, {c: 'い'},
	]);
});

it('tcy_requiresT', ()=> {
	expect(()=> units('[tcy r=炎]')).toThrow('[tcy] tは必須です');
});

// [link]は既定で赤背景が付く（本家 LayerMng.ts:1029-1031。style/style_hover/style_clickedの
//	既定値で、リンクだと分かる見た目にする）。以下のテストで毎回書くのを避けるため定数化
const LNK_DEFAULT_STYLE = 'background-color: rgba(255,0,0,0.5);';
const LNK_DEFAULT_S = {s: LNK_DEFAULT_STYLE};
const LNK_DEFAULT_HOVER_CLICK = {
	sh: 'background-color: rgba(255,0,0,0.9);',
	sc: LNK_DEFAULT_STYLE,
	rsh: 'background-color: rgba(255,0,0,0.9);',
};

it('link_marksUnitsUntilEndlink', ()=> {
	expect(units('あ[link label=*goal]いう[endlink]え')).toEqual([
		{c: 'あ'},
		{...LNK_DEFAULT_S, c: 'い', lnk: {label: '*goal', fn: '', call: false, arg: '', ...LNK_DEFAULT_HOVER_CLICK}},
		{...LNK_DEFAULT_S, c: 'う', lnk: {label: '*goal', fn: '', call: false, arg: '', ...LNK_DEFAULT_HOVER_CLICK}},
		{c: 'え'},
	]);
});

it('link_callFnArg', ()=> {
	expect(units('[link fn=sub label=*g call=true arg=x]あ[endlink]')).toEqual([
		{...LNK_DEFAULT_S, c: 'あ', lnk: {label: '*g', fn: 'sub', call: true, arg: 'x', ...LNK_DEFAULT_HOVER_CLICK}},
	]);
});

it('link_requiresLabelOrFnOrUrl', ()=> {
	expect(()=> units('[link]あ[endlink]')).toThrow('[link] fn・label・urlのいずれかは必須です');
});

it('link_url', ()=> {
	// [link url=…]はラベルへ飛ばずURLを開く（本家も「指定時は fn・label を無視する」）。
	//	開くのはDOM側＝[navigate_to]と同じ経路（ScriptMng.navigateTo）
	expect(units(`[link url='https://example.com/']あ[endlink]`)).toEqual([
		{...LNK_DEFAULT_S, c: 'あ', lnk: {label: '', fn: '', call: false, arg: '', url: 'https://example.com/', ...LNK_DEFAULT_HOVER_CLICK}},
	]);
});

// ===== [graph]（本文中のインライン画像。アニメpngも置ける） =====

it('graph_makesOneUnitWithPic', ()=> {
	// 本文としては全角空白1つぶんの場所を占める（本家も`&emsp;`を置いてそこへ画像を重ねる）。
	//	picは論理名のままで、解決済みURLを入れるのはScriptMngの仕事
	expect(units('あ[graph pic=breakline]い')).toEqual([
		{c: 'あ'}, {c: '　', pic: 'breakline'}, {c: 'い'},
	]);
});

it('graph_withRubyAndStyle', ()=> {
	expect(units('[graph pic=clock r=るび style="color: red;"]')).toEqual([
		{c: '　', r: 'るび', s: 'color: red;', pic: 'clock'},
	]);
});

it('graph_requiresPic', ()=> {
	expect(()=> units('[graph]')).toThrow('[graph] picは必須です');
});

it('link_hint', ()=> {
	// [link hint=…]も[button]と同じ吹き出し（Hint.ts）。表示単位に運ぶだけ
	expect(units(`[link label=*g hint=ヒント hint_style="color: red;" hint_opt='{"placement": "bottom"}']あ[endlink]`))
		.toEqual([{...LNK_DEFAULT_S, c: 'あ', lnk: {label: '*g', fn: '', call: false, arg: '', ...LNK_DEFAULT_HOVER_CLICK,
			hint: 'ヒント', hs: 'color: red;', ho: `{"placement": "bottom"}`}}]);
});

// ===== [link]の効果音（clickse/enterse/leavese）=====
//	本家 EventMng.ts:465-491。[button]と同じ形（属性の既定値は1箇所ルールに従いScriptEngineで確定）。
//	実際に鳴らす（TxtLayer.tsx mkLink()経由）のはE2E側なので、ここでは表示単位に正しく運ばれることだけ見る

it('linkSe_clickse', ()=> {
	expect(units('[link label=*g clickse=ok]あ[endlink]')).toEqual([
		{...LNK_DEFAULT_S, c: 'あ', lnk: {label: '*g', fn: '', call: false, arg: '', ...LNK_DEFAULT_HOVER_CLICK, clickse: 'ok', clicksebuf: 'SYS'}},
	]);
});

it('linkSe_bufDefaultsToSYS', ()=> {
	// bufの既定は'SYS'（本家 EventMng.ts:466,475,484）。[playse]自体の既定'SE'とは別
	expect(units('[link label=*g enterse=hover]あ[endlink]')).toEqual([
		{...LNK_DEFAULT_S, c: 'あ', lnk: {label: '*g', fn: '', call: false, arg: '', ...LNK_DEFAULT_HOVER_CLICK, enterse: 'hover', entersebuf: 'SYS'}},
	]);
	expect(units('[link label=*g leavese=bye]あ[endlink]')).toEqual([
		{...LNK_DEFAULT_S, c: 'あ', lnk: {label: '*g', fn: '', call: false, arg: '', ...LNK_DEFAULT_HOVER_CLICK, leavese: 'bye', leavesebuf: 'SYS'}},
	]);
});

it('linkSe_bufOverridable', ()=> {
	expect(units('[link label=*g clickse=ok clicksebuf=BGM]あ[endlink]')).toEqual([
		{...LNK_DEFAULT_S, c: 'あ', lnk: {label: '*g', fn: '', call: false, arg: '', ...LNK_DEFAULT_HOVER_CLICK, clickse: 'ok', clicksebuf: 'BGM'}},
	]);
});

it('linkSe_omittedWhenNoFile', ()=> {
	// clickse等を書かなければ、対応するbuf属性（既定値含め）も一切積まない
	const v = units('[link label=*g]あ[endlink]').at(0)!;
	expect(v.lnk && 'clickse' in v.lnk).toBe(false);
	expect(v.lnk && 'clicksebuf' in v.lnk).toBe(false);
});


// ============ [graph]の寸法・ずらし ============
//	本家 TxtStage.ts:685-688 が sp.x/y/width/height に入れる分。**書かれた属性だけ**を持たせ、
//	省略時は本文と同じ全角空白1つぶんの枠に収まる（本家の既定もフォントサイズなので同じ絵）

it('graph_寸法とずらしが表示単位へ乗る', ()=> {
	const a = units('[graph pic=e width=48 height=24 x=3 y=-5]');
	expect(a.at(-1)).toMatchObject({pic: 'e', gw: 48, gh: 24, gx: 3, gy: -5});
});

it('graph_書かなければ持たない', ()=> {
	const v = units('[graph pic=e]').at(-1)!;
	expect(v.gw).toBeUndefined();
	expect(v.gh).toBeUndefined();
	expect(v.gx).toBeUndefined();
	expect(v.gy).toBeUndefined();
});

it('graph_本文としては全角空白1つ', ()=> {
	// 本家も`&emsp;`を置いてそこへ画像を重ねる。平文とも食い違わない
	expect(units('[graph pic=e width=48]').at(-1)?.c).toBe('　');
});


// ============ [l]/[p]の待ちマークの位置・寸法 ============

const markOf = (src: string)=> {
	const a = new ScriptEngine('t1', `[add_lay layer=mes class=txt][current layer=mes]${src}`)
		.step().find(v=> v.t === 'stop');
	return a?.t === 'stop' ? a.mark : undefined;
};

it('waitMark_位置と寸法がstopアクションへ乗る', ()=> {
	expect(markOf('[l x=4 y=-2 width=20 height=20]')).toEqual({x: 4, y: -2, width: 20, height: 20});
});

it('waitMark_書かなければ持たない', ()=> {
	expect(markOf('[l]')).toBeUndefined();
	expect(markOf('[p]')).toBeUndefined();
});

it('waitMark_数値でなければthrow', ()=> {
	expect(()=> markOf('[l x=もじ]')).toThrow();
});


// ============ layer=/page= 対応 ============
//	本家 LayerMng.ts:935 #getTxtLayer()。省略時は現在の文字レイヤの表ページ（従来どおり）

const LAYS2 = '[add_lay layer=mes class=txt][current layer=mes][add_lay layer=sub class=txt]';
function chgStrOf(src: string, nm: string, page: 'fore' | 'back') {
	const acts = new ScriptEngine('t1', `${LAYS2}${src}[s]`).step()
		.filter(v=> v.t === 'chgStr')
		.filter(v=> v.nm === nm && v.page === page);
	return acts.at(-1);
}

it('ch_layer_別レイヤへ書け、現在レイヤは触らない', ()=> {
	const sub = chgStrOf('[ch layer=sub text=あ]', 'sub', 'fore');
	expect(sub && splitCh(sub.str)).toEqual([{c: 'あ'}]);
	expect(chgStrOf('[ch layer=sub text=あ]', 'mes', 'fore')).toBeUndefined();
});

it('ch_page=back_裏ページへ書け、表の蓄積は汚さない', ()=> {
	const back = chgStrOf('あ[ch page=back text=う]い', 'mes', 'back');
	expect(back && splitCh(back.str)).toEqual([{c: 'う'}]);
	const fore = chgStrOf('あ[ch page=back text=う]い', 'mes', 'fore');
	expect(fore && splitCh(fore.str)).toEqual([{c: 'あ'}, {c: 'い'}]);
});

it('span/link/endlink/tcy/graph/ruby2/rもlayer=/page=を受け付ける', ()=> {
	expect(chgStrOf('[span layer=sub style="color: red;"]あ', 'sub', 'fore')).toBeDefined();
	expect(chgStrOf('[link layer=sub page=back label=*g]あ[endlink layer=sub page=back]', 'sub', 'back')).toBeDefined();
	expect(chgStrOf('[tcy layer=sub t=1 r=r]', 'sub', 'fore')).toBeDefined();
	expect(chgStrOf('[graph layer=sub pic=e]', 'sub', 'fore')).toBeDefined();
	expect(chgStrOf('[ruby2 layer=sub t=蜊 r=あさり]', 'sub', 'fore')).toBeDefined();
	expect(chgStrOf('[r layer=sub]', 'sub', 'fore')).toBeDefined();
});

it('埋め込み命令のJSONにlayer/pageが乗らない', ()=> {
	// #cmdTxt()へ渡す前にlayer/pageを落としている（JSON.stringifyはundefinedの項目を落とす）
	const act = chgStrOf('[span layer=sub page=back style="color: red;"]あ', 'sub', 'back');
	expect(act?.str).not.toContain('layer');
	expect(act?.str).not.toContain('page');
});

it('clear_text_page=backは裏だけ消し、表の蓄積は残る', ()=> {
	const src = 'あ[ch page=back text=う][clear_text page=back]い';
	expect(chgStrOf(src, 'mes', 'fore') && splitCh(chgStrOf(src, 'mes', 'fore')!.str))
		.toEqual([{c: 'あ'}, {c: 'い'}]);
	// クリア後は裏に書いたものが無いので、直後のchgStr(back)は空文字
	const back = chgStrOf(src, 'mes', 'back');
	expect(back && splitCh(back.str)).toEqual([]);
});

it('clear_lay_page=bothは表裏とも蓄積をクリアする', ()=> {
	// [clear_lay]自体はchgStrを積まないので、クリア後に追記した内容で確かめる
	//	（前の内容が残っていれば継ぎ足されて見える）
	const src = 'あ[ch page=back text=う][clear_lay layer=mes page=both]い[ch page=back text=え]';
	const fore = chgStrOf(src, 'mes', 'fore');
	expect(fore && splitCh(fore.str)).toEqual([{c: 'い'}]);
	const back = chgStrOf(src, 'mes', 'back');
	expect(back && splitCh(back.str)).toEqual([{c: 'え'}]);
});
