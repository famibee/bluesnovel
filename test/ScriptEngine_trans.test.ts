/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2026-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

// ページ裏表（[lay page=…]）・[trans]（裏表の交換）・[wt]（演出終了待ち）のうち、
//	エンジンが担当する「どのアクションを積むか」の部分。
//	実際に画面をクロスフェードさせる・演出の終了を待つのはScriptMng/Stageの担当なのでE2E側（trans.e2e.ts）。
//	本家：LayerMng.ts:603 #trans() / CmnTween.ts:249 wt() / Pages.ts:65 argChk_page()

import {ScriptEngine, type T_ENGINE_ACTION} from '../src/ts/ScriptEngine';
import {splitCh} from '../src/ts/Txt';

import {expect, it} from 'bun:test';


function acts(src: string): T_ENGINE_ACTION[] {return new ScriptEngine('t1', src).step()}
const LAYS = '[add_lay layer=base class=grp][add_lay layer=0 class=grp][add_lay layer=mes class=txt]';


// ============ [lay]のpage属性 ============

it('layPage_defaultsToFore', ()=> {
	// 本家 Pages.argChk_page(hArg, 'fore')。[lay]の既定は表ページ
	expect(acts(`${LAYS}[lay layer=base fn=bg][s]`).find(v=> v.t === 'chgPic'))
		.toEqual({t: 'chgPic', nm: 'base', page: 'fore', fn: 'bg'});
});

it('layPage_back', ()=> {
	expect(acts(`${LAYS}[lay layer=base fn=bg page=back][s]`).find(v=> v.t === 'chgPic'))
		.toEqual({t: 'chgPic', nm: 'base', page: 'back', fn: 'bg'});
});

it('layPage_appliesToBAlphaToo', ()=> {
	expect(acts(`${LAYS}[lay layer=mes b_alpha=0.4 page=back][s]`).find(v=> v.t === 'chgBAlpha'))
		.toEqual({t: 'chgBAlpha', nm: 'mes', page: 'back', b_alpha: 0.4});
});

it('layPage_invalidThrows', ()=> {
	expect(()=> acts(`${LAYS}[lay layer=base fn=bg page=both][s]`)).toThrow('属性 page【both】が不正です');
});


// ============ [trans] ============

it('trans_defaultsToAllLayersAndZeroTime', ()=> {
	// layer省略＝全レイヤ対象（aLayNm=null）、time省略＝0（演出無しで即交換）
	expect(acts(`${LAYS}[trans][s]`).find(v=> v.t === 'trans'))
		.toEqual({t: 'trans', aLayNm: null, time: 0});
});

it('trans_time', ()=> {
	expect(acts(`${LAYS}[trans time=800][s]`).find(v=> v.t === 'trans'))
		.toEqual({t: 'trans', aLayNm: null, time: 800});
});

it('trans_layerListIsSplitAndTrimmed', ()=> {
	// 本家シナリオの [trans layer=&dsp_lays] は 'base,0,1,2,mes' のようなカンマ区切り文字列
	expect(acts(`${LAYS}[trans layer="base, 0 ,mes" time=100][s]`).find(v=> v.t === 'trans'))
		.toEqual({t: 'trans', aLayNm: ['base', '0', 'mes'], time: 100});
});

it('trans_doesNotStop', ()=> {
	// [trans]自体は待たない（本家 #trans() もfalseを返す＝待ちに入らない）。
	//	待ちたければスクリプト側で[wt]を書く
	const a = acts(`${LAYS}[trans time=500]あ[s]`);
	expect(a.at(-1)).toMatchObject({t: 'stop', kind: 's'});
	expect(a.some(v=> v.t === 'chgStr' && v.str === 'あ')).toBe(true);
});

it('trans_invalidTimeThrows', ()=> {
	expect(()=> acts(`${LAYS}[trans time=abc][s]`)).toThrow('[trans] timeの値が不正です');
	expect(()=> acts(`${LAYS}[trans time=-1][s]`)).toThrow('[trans] timeの値が不正です');
});

it('trans_emptyLayerThrows', ()=> {
	expect(()=> acts(`${LAYS}[trans layer="," time=1][s]`)).toThrow('[trans] layer属性が空です');
});

it('trans_skipMakesItInstant', ()=> {
	// 既読スキップ中は演出せず即交換（本家 #trans() の `time === 0 || this.#evtMng.isSkipping`）
	expect(acts(`&sn.skip.all = true\n&sn.skip.enabled = true\n${LAYS}[trans time=900][s]`)
		.find(v=> v.t === 'trans')).toEqual({t: 'trans', aLayNm: null, time: 0});
});


// ============ [wt] ============

it('wt_stopsAndAsksToWait', ()=> {
	// [wt]は停止点（[l]/[p]/[s]）ではないが、待ちの主体がScriptMngなのでstep()は一旦返る
	const a = acts(`${LAYS}[trans time=500][wt]あ[s]`);
	expect(a.at(-1)).toEqual({t: 'waitTrans', canskip: true});
	expect(a.some(v=> v.t === 'chgStr')).toBe(false);	// [wt]より後ろはまだ実行されていない
});

it('wt_canskipFalse', ()=> {
	expect(acts(`${LAYS}[trans time=500][wt canskip=false][s]`).at(-1))
		.toEqual({t: 'waitTrans', canskip: false});
});

it('wt_resumesAfterWait', ()=> {
	// 2回目のstep()で[wt]の続きが流れる（ScriptMngが待ち終えてgo()を呼ぶのに相当）
	const se = new ScriptEngine('t1', `${LAYS}[trans time=500][wt]あ[s]`);
	se.step();
	const a = se.step();
	expect(a.some(v=> v.t === 'chgStr' && v.str === 'あ')).toBe(true);
	expect(a.at(-1)).toMatchObject({t: 'stop', kind: 's'});
});

it('wt_withoutTransIsStillYielded', ()=> {
	// [trans]が無くても[wt]は一旦返す。「待つものが無い」の判定はScriptMng側
	//	（本家 CmnTween.wt() も、動いているトゥイーンが無ければ待たずに済ませる）
	expect(acts(`${LAYS}[wt][s]`).at(-1)).toEqual({t: 'waitTrans', canskip: true});
});


// ============ 文字・ボタンのページ指定 ============

it('text_goesToForeOnly', ()=> {
	// 地の文には属性を書けないので常に表ページ（本家 [ch] の既定も'fore'）
	expect(acts(`${LAYS}あ[s]`).find(v=> v.t === 'chgStr'))
		.toEqual({t: 'chgStr', nm: 'mes', page: 'fore', str: 'あ'});
});

it('er_clearsBothPages', ()=> {
	// タグ名のとおり「ページ両面の文字消去」（本家 hTag.er）。
	//	片面だけだと、[trans]で裏が表に出たときに前の場面の文字が蘇る
	expect(acts(`${LAYS}あ[er][s]`).find(v=> v.t === 'chgStr' && v.str === ''))
		.toEqual({t: 'chgStr', nm: 'mes', page: 'both', str: ''});
});

it('button_defaultsToBack', ()=> {
	// **本家と同じく既定はback**（LayerMng.ts:1100）。本家サンプルの title.sn が
	//	「mesを裏で組んで[trans]で表へ」流儀で、実テンプレ tmp_blues を通すため本家へ揃えた。
	//	[trans]を挟まずその場で見せたいボタンは page=fore と明示する
	expect(acts(`${LAYS}[button text=OK label=*x][s]`).find(v=> v.t === 'addBtn'))
		.toMatchObject({t: 'addBtn', layerNm: 'mes', page: 'back', text: 'OK', label: '*x'});
});
it('button_page_fore', ()=> {
	// page=foreと明示すれば、[trans]を挟まずその場のページへ置ける（E2Eフィクスチャの流儀）
	expect(acts(`${LAYS}[button page=fore text=OK label=*x][s]`).find(v=> v.t === 'addBtn'))
		.toMatchObject({page: 'fore'});
});

it('button_page_back', ()=> {
	// page=backと明示すれば本家と同じ「裏に組んで[trans]で見せる」書き方ができる
	expect(acts(`${LAYS}[button page=back text=OK label=*x][s]`).find(v=> v.t === 'addBtn'))
		.toMatchObject({page: 'back'});
});


// ============ [page]（読み戻り用のページログ） ============

it('page_clearAsksToClearLog', ()=> {
	// 本家の[page]は裏表ではなくページログ（読み戻り履歴）のタグ。
	//	sub.snのsys_title_startが[page clear=true key=…]で本編開始時に履歴を捨てている
	expect(acts(`${LAYS}[page clear=true key="pageup,pagedown"][s]`).find(v=> v.t === 'clearPageLog'))
		.toEqual({t: 'clearPageLog'});
});

it('page_clearFalseDoesNothing', ()=> {
	expect(acts(`${LAYS}[page clear=false][s]`).some(v=> v.t === 'clearPageLog')).toBe(false);
});

it('page_noAttrThrows', ()=> {
	expect(()=> acts(`${LAYS}[page][s]`)).toThrow('[page] clear,style,to いずれかは必須です');
});

it('page_keyは移動中に効くキーの限定', ()=> {
	// 本家も style/clear/to より前に見る（＝同時指定できる）
	expect(acts(`${LAYS}[page clear=true key="pageup,pagedown"][s]`).find(v=> v.t === 'pageKeys'))
		.toEqual({t: 'pageKeys', aKey: ['pageup', 'pagedown']});
	// 空指定は制限なしへ戻す
	expect(acts(`${LAYS}[page clear=true key=""][s]`).find(v=> v.t === 'pageKeys'))
		.toEqual({t: 'pageKeys', aKey: []});
});

it('page_styleは読み戻り中の本文の見た目', ()=> {
	expect(acts(`${LAYS}[page style="color: lime;"][s]`).find(v=> v.t === 'pageStyle'))
		.toEqual({t: 'pageStyle', style: 'color: lime;'});
	// styleを書いたらそれだけ（本家も指定時はそこで戻る）
	expect(acts(`${LAYS}[page style="color: lime;" to=prev][s]`).some(v=> v.t === 'pageTo')).toBe(false);
});

it('page_toでページ移動を頼み、そこで停止する', ()=> {
	// 移動先は「しおりを戻してそのページを演じ直す」＝スクリプトのfetchが要るのでScriptMng待ち。
	//	演じ直しはコールスタックごと入れ替わるので、テンプレの`*page [page to=…][return]`の
	//	[return]は実行されない（本家 loadFromMark() も同じ）
	const a = acts(`${LAYS}[page to=prev][s]`);
	expect(a.find(v=> v.t === 'pageTo')).toEqual({t: 'pageTo', to: 'prev'});
	expect(a.some(v=> v.t === 'stop')).toBe(false);	// [s]まで進んでいない
});

it('page_toの値域', ()=> {
	for (const to of ['oldest', 'prev', 'next', 'newest', 'exit', 'load'] as const) {
		expect(acts(`${LAYS}[page to=${to}][s]`).find(v=> v.t === 'pageTo')).toEqual({t: 'pageTo', to});
	}
	expect(()=> acts(`${LAYS}[page to=よそ][s]`)).toThrow('[page] 属性to「よそ」は異常です');
});


// ============ 実シナリオでの並び ============

it('scenario_titleSnLikeSequence', ()=> {
	// tmp_esm_uc/doc/prj/theme/title.sn と同じ流れ：裏ページを組んで[trans]→[wt]
	const a = acts(
		`${LAYS}[lay layer=base fn=title page=back][lay layer=0 fn=logo page=back]`+
		'[trans layer="base,0,mes" time=0][wt][s]'
	);
	expect(a).toEqual([
		{t: 'addLay', cls: 'grp', nm: 'base'},
		{t: 'addLay', cls: 'grp', nm: '0'},
		{t: 'addLay', cls: 'txt', nm: 'mes'},
		{t: 'chgPic', nm: 'base', page: 'back', fn: 'title'},
		{t: 'chgPic', nm: '0', page: 'back', fn: 'logo'},
		{t: 'trans', aLayNm: ['base', '0', 'mes'], time: 0},
		{t: 'waitTrans', canskip: true},
	]);
});


// ============ [finish_trans] / [set_cancel_skip] ============

it('finishTrans_pushesAction', ()=> {
	// 本家のタグ本体は空（LayerMng.ts:102）で、実処理は「一部タグの直前に演出を畳む」
	//	共通処理（ScriptIterator.ts:504）。こちらはそれをScriptMngへ持たせ、このタグを引き金にした
	const a = acts(`${LAYS}[trans time=500][finish_trans]あ[s]`);
	expect(a.find(v=> v.t === 'finishTrans')).toEqual({t: 'finishTrans'});
	expect(a.some(v=> v.t === 'chgStr' && v.str === 'あ')).toBe(true);	// 待たない
});

it('setCancelSkip_isNoOp', ()=> {
	// 本家も2023/05/27に廃止済みで中身は空（EventMng.ts:55）。上流の記述を通すためだけに受ける
	const a = acts(`${LAYS}[set_cancel_skip]あ[s]`);
	expect(a.some(v=> v.t === 'chgStr' && v.str === 'あ')).toBe(true);
});

it('finishTrans_reservedAsMacroName', ()=> {
	expect(()=> acts('[macro name=finish_trans][s]'))
		.toThrow('[finish_trans]はタグ名のため、マクロ名として使用できません');
});


// ============ [trans rule=…]（ルール画像によるワイプ） ============

it('trans_rule', ()=> {
	// ruleは論理名のまま積む（パス解決はScriptMng）。vagueは省略時**積まない**＝Trans.tsの既定へ落ちる
	expect(acts(`${LAYS}[trans time=500 rule=wipe_l][s]`).find(v=> v.t === 'trans'))
		.toEqual({t: 'trans', aLayNm: null, time: 500, rule: 'wipe_l'});
	expect(acts(`${LAYS}[trans time=500 rule=wipe_l vague=0.2][s]`).find(v=> v.t === 'trans'))
		.toEqual({t: 'trans', aLayNm: null, time: 500, rule: 'wipe_l', vague: 0.2});
});

it('trans_ruleVagueNotNumber', ()=> {
	expect(()=> acts(`${LAYS}[trans time=500 rule=w vague=もじ][s]`))
		.toThrow('[trans] vagueの値が不正です');
});

it('trans_glslThrows', ()=> {
	// 自前シェーダの差し替えはWebGLを使わないこちらでは実現しようがない。
	//	黙って無視すると「指定したのに違う絵が出る」ので、フィルターと同じくその場で知らせる
	expect(()=> acts(`${LAYS}[trans time=500 glsl=xxx][s]`))
		.toThrow('[trans] glsl=はサポートされません');
});


// ============ 本文蓄積の[trans]追随（transDone） ============
//	store側のfinTrans()（store.tsx）は交換対象レイヤの表裏を入れ替えるが、エンジンが持つ
//	本文の蓄積（#hTxt/#hTxtBk）は自動では追随しない。追随させないと、[er]を挟まず[trans]した
//	とき前の場面の文がエンジン内部の蓄積として残り、次の本文がそこへ継ぎ足されて復活する
//	（bluesnovelが#hTxtを表専用にしていた頃の潜在バグ）。呼ぶのはScriptMng（演出完了時）

it('transDone_表の蓄積が裏の内容になり、続く本文がそこへ継ぎ足される', ()=> {
	const se = new ScriptEngine('t1', `${LAYS}あ[ch page=back text=う][l]い[s]`);
	se.step();	// [l]まで（表='あ'、裏='う'）
	se.transDone(['mes']);
	const a = se.step();	// 'い'を表へ追記
	const act = a.find(v=> v.t === 'chgStr' && v.nm === 'mes' && v.page === 'fore');
	expect(act && act.t === 'chgStr' && splitCh(act.str)).toEqual([{c: 'う'}, {c: 'い'}]);
});

it('transDone_対象外レイヤは触らない', ()=> {
	const se = new ScriptEngine('t1', `${LAYS}あ[l]い[s]`);
	se.step();	// [l]まで（表='あ'）
	se.transDone(['other']);	// 'mes'は対象外
	const a = se.step();
	const act = a.find(v=> v.t === 'chgStr' && v.nm === 'mes' && v.page === 'fore');
	expect(act && act.t === 'chgStr' && splitCh(act.str)).toEqual([{c: 'あ'}, {c: 'い'}]);
});

it('transDone_nullで全レイヤ対象', ()=> {
	const se = new ScriptEngine('t1', `${LAYS}あ[ch page=back text=う][l]い[s]`);
	se.step();
	se.transDone(null);
	const a = se.step();
	const act = a.find(v=> v.t === 'chgStr' && v.nm === 'mes' && v.page === 'fore');
	expect(act && act.t === 'chgStr' && splitCh(act.str)).toEqual([{c: 'う'}, {c: 'い'}]);
});
