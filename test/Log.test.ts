/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2026-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

// 本文履歴（ログ）。純粋部分（src/ts/Log.ts）と、エンジンへの繋ぎこみの両方。
//	本家：Log.ts（履歴本体）・TxtLayer.ts:604（記録の呼び出し）・
//	LayerMng.ts:956/995/1006（改ページ地点）・Variable.ts:645（doRecLog）
//
//	**履歴に積むのは表示側のHTMLではなく、シナリオが書いた本文そのもの**なので、
//	ここは丸ごとブラウザ抜きで見られる。実際の履歴画面（フレーム）はE2E側。

import {Log, htmlOf} from '../src/ts/Log';
import {ScriptEngine} from '../src/ts/ScriptEngine';

import {expect, it} from 'bun:test';


const LAYS = '[add_lay layer=mes class=txt][add_lay layer=sub class=txt][current layer=mes]';
const REC = '[let name=save:sn.doRecLog text=true]';

// シナリオを走らせて const.sn.log.json を読む
function logOf(src: string): {text: string}[] {
	const se = new ScriptEngine('t1', `${LAYS}${REC}${src}[s]`);
	se.step();
	return JSON.parse(String(se.getVal('tmp:const.sn.log.json'))) as {text: string}[];
}
// 書きかけの現ページを落とした、確定ページだけの本文
const fixed = (a: {text: string}[])=> a.slice(0, -1).map(v=> v.text);


// ============ htmlOf（生の本文 → 履歴用HTML）============

it('htmlOf_平文はそのまま、改行は<br/>', ()=> {
	expect(htmlOf('あい\nうえ')).toBe('あい<br/>うえ');
});

it('htmlOf_ルビ記法を<ruby>へ起こす', ()=> {
	// 本家は表示済みHTMLから削り出すが、こちらは splitCh() の結果から組み立てる
	expect(htmlOf('蜊《あさり》')).toBe('<ruby>蜊<rt>あさり</rt></ruby>');
});

it('htmlOf_ルビの位置指定は落としてルビ文字だけ残す', ()=> {
	// 位置指定（r_align）自体が未対応。Txt.ts rubyTxt() と同じ扱いに揃える
	expect(htmlOf('｜文字《center｜るび》')).toBe('<ruby>文字<rt>るび</rt></ruby>');
});

it('htmlOf_HTMLに見える文字はエスケープする', ()=> {
	// 履歴はフレーム側で innerHTML に入るので、本文の<>&がタグとして効いてはいけない
	expect(htmlOf('a<b>&c')).toBe('a&lt;b&gt;&amp;c');
});

it('htmlOf_空文字は空文字', ()=> {
	expect(htmlOf('')).toBe('');
});


// ============ Log（純粋部分）============

it('Log_改ページで確定し、書きかけは末尾に残る', ()=> {
	const lg = new Log;
	lg.add('いち');
	lg.pagebreak();
	lg.add('に');
	expect(JSON.parse(lg.json())).toEqual([{text: 'いち'}, {text: 'に'}]);
});

it('Log_空ページは積まない', ()=> {
	// 本家 Log.ts:105。[er]が続いたりUI画面を出入りしただけで履歴が増えては困る
	const lg = new Log;
	lg.pagebreak();
	lg.pagebreak();
	expect(JSON.parse(lg.json())).toEqual([{text: ''}]);
});

it('Log_max_lenを超えたら古い方から捨てる', ()=> {
	const lg = new Log(()=> 2);
	for (const c of ['あ', 'い', 'う']) {lg.add(c); lg.pagebreak()}
	expect(fixed(JSON.parse(lg.json()) as {text: string}[])).toEqual(['い', 'う']);
});

it('Log_resetは全消去、textで置き換えられる', ()=> {
	const lg = new Log;
	lg.add('いち'); lg.pagebreak(); lg.add('に');
	lg.reset('さん');
	expect(JSON.parse(lg.json())).toEqual([{text: 'さん'}]);
});

it('Log_playbackは確定ページを読み直し、書きかけは捨てる', ()=> {
	// 本家 Log.ts:113 と同じ。ロード直後は「まだ何も読んでいない」状態から始まる
	const lg = new Log;
	lg.add('捨てられる');
	lg.playback(`[{"text":"いち"},{"text":"に"}]`);
	expect(JSON.parse(lg.json())).toEqual([{text: 'いち'}, {text: 'に'}, {text: ''}]);
});

it('Log_playbackは壊れたJSONでも例外にしない', ()=> {
	const lg = new Log;
	lg.playback('{壊れている');
	expect(JSON.parse(lg.json())).toEqual([{text: ''}]);
});


// ============ エンジンへの繋ぎこみ ============

it('log_本文が履歴に積まれる', ()=> {
	expect(logOf('あいう')).toEqual([{text: 'あいう'}]);
});

it('log_doRecLogがfalseの間は積まない', ()=> {
	// テンプレは設定・履歴などのUI画面へ出入りする間だけfalseへ倒す。
	//	**本家は記録を止めるのでなく`<span class="offrec">`で包んで履歴側で隠す**が、
	//	こちらは履歴の蓄積が表示と別物なので単に積まない
	const se = new ScriptEngine('t1', `${LAYS}見える${REC}[p]`);
	se.step();
	expect(JSON.parse(String(se.getVal('tmp:const.sn.log.json')))).toEqual([{text: ''}]);
});

it('log_既定はfalse（何も書かなければ記録しない）', ()=> {
	// 本家 CmnInterface.ts:149 の 'sn.doRecLog': false と同じ
	const se = new ScriptEngine('t1', `${LAYS}あいう[s]`);
	se.step();
	expect(JSON.parse(String(se.getVal('tmp:const.sn.log.json')))).toEqual([{text: ''}]);
});

it('log_[p]がページ区切りになる', ()=> {
	// [p]は「次に進んだとき」に本文を消す作りなので、履歴もそこで確定する
	const se = new ScriptEngine('t1', `${LAYS}${REC}いち[p]に[s]`);
	se.step();	// [p]まで
	se.step();	// 再開＝ここで改ページ
	expect(JSON.parse(String(se.getVal('tmp:const.sn.log.json'))))
		.toEqual([{text: 'いち'}, {text: 'に'}]);
});

it('log_[er]は履歴を消さずに1ページとして確定させる', ()=> {
	expect(fixed(logOf('いち[er]に'))).toEqual(['いち']);
});

it('log_[clear_text]も表ページなら区切りになる', ()=> {
	expect(fixed(logOf('いち[clear_text]に'))).toEqual(['いち']);
});

it('log_[clear_text page=back]は履歴に触らない', ()=> {
	// 履歴は既定文字レイヤの表ページだけが対象（本家 LayerMng.ts:995 も同じ条件）
	expect(logOf('いち[clear_text page=back]に')).toEqual([{text: 'いちに'}]);
});

it('log_[current]の切替前に確定させる', ()=> {
	// 本家 LayerMng.ts:956「カレント変更前に現在の履歴を保存」。
	//	でないと前のレイヤの書きかけが次のレイヤの本文と地続きになる
	expect(fixed(logOf('いち[current layer=sub]に'))).toEqual(['いち']);
});

it('log_[current]が同じレイヤなら区切らない', ()=> {
	expect(logOf('いち[current layer=mes]に')).toEqual([{text: 'いちに'}]);
});

it('log_[clear_lay]は既定文字レイヤの表を消すときだけ確定させる', ()=> {
	expect(fixed(logOf('いち[clear_lay layer=mes page=fore]に'))).toEqual(['いち']);
	expect(logOf('いち[clear_lay layer=sub page=fore]に')).toEqual([{text: 'いちに'}]);
	// [clear_lay]のpage既定は'back'（裏を組む用途が主）なので、素で書いても履歴には触らない
	expect(logOf('いち[clear_lay layer=mes]に')).toEqual([{text: 'いちに'}]);
});

it('log_[ch record=false]は履歴に残さない', ()=> {
	// 本家 LayerMng.ts:920。表示はされるが履歴には出ない
	expect(logOf('[ch text=みえる record=false]')).toEqual([{text: ''}]);
});

it('log_[rec_ch]は表示せず履歴にだけ積む', ()=> {
	const se = new ScriptEngine('t1', `${LAYS}${REC}[rec_ch text=ひみつ][s]`);
	const aAct = se.step();
	expect(JSON.parse(String(se.getVal('tmp:const.sn.log.json')))).toEqual([{text: 'ひみつ'}]);
	expect(aAct.find(v=> v.t === 'chgStr')).toBeUndefined();	// 画面には出ない
});

it('log_[rec_ch]はdoRecLogがfalseでも積む（明示的な書き込みなので）', ()=> {
	const se = new ScriptEngine('t1', `${LAYS}[rec_ch text=ひみつ][s]`);
	se.step();
	expect(JSON.parse(String(se.getVal('tmp:const.sn.log.json')))).toEqual([{text: 'ひみつ'}]);
});

it('log_[rec_r]は履歴改行', ()=> {
	expect(logOf('[rec_ch text=あ][rec_r][rec_ch text=い]'))
		.toEqual([{text: 'あ<br/>い'}]);
});

it('log_[reset_rec]は全消去、textで置き換えられる', ()=> {
	expect(logOf('いち[er]に[reset_rec text=さん]')).toEqual([{text: 'さん'}]);
});

it('log_しおりの保存でsave:const.sn.sLogへ焼き付き、復元で戻る', ()=> {
	// **本家は本文を1トークン追記するたびにsLogを書き直す**が、この値を読むのは
	//	しおりの保存と復元だけなので、こちらはスナップショットの直前に1回だけ書く
	const se = new ScriptEngine('t1', `${LAYS}${REC}いち[er]に[s]`);
	se.step();
	const mark = se.nowMarkPart();
	expect(String(se.getVal('save:const.sn.sLog')))
		.toBe(`[{"text":"いち"},{"text":"に"}]`);

	se.restoreMarkPart(mark);
	// 書きかけページは捨てられ、保存時点の全ページが確定ページになる（本家 playback()）
	expect(JSON.parse(String(se.getVal('tmp:const.sn.log.json'))))
		.toEqual([{text: 'いち'}, {text: 'に'}, {text: ''}]);
});
