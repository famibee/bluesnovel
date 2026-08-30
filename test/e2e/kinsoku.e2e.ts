/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2026-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

// 禁則処理（[lay kinsoku_sol=/kinsoku_eol=/kinsoku_dns=/kinsoku_bura=/bura=]）の実効検証。
//	アルゴリズムそのものの正しさは test/Hyphenation.test.ts（本家テストの丸移植）が保証する。
//	ここで見るのはユニットでは届かない部分だけ＝実際にブラウザ上で`<br>`が挿入され、
//	折り返し位置が変わること。main.snは幅・フォントを固定して折り返しを決定的にしている
//	（monospace指定でも実際の折り返しは1文字24px相当。border:noneで内側幅=100pxのとき
//	自然な折り返しは5文字/行になることを実機で確認して文字列を組んだ）。

import {expect, test} from '@playwright/test';
import {SEL_FORE, gotoSn, pressKey} from './snPage';

// charsRef（本文の流し込み先）直下の子ノードを「文字」と「<br>」の並びで拾う
const domRow = (page: import('@playwright/test').Page)=> page.$eval(
	`${SEL_FORE} span[data-lay="mes"] > span:first-child`,
	el=> Array.from(el.childNodes).map(n=> n.nodeName === 'BR' ? '<br>' : (n.textContent ?? '')),
);

test.beforeEach(async ({page})=> {await gotoSn(page, 'kinsoku')});

test('既定の行頭禁則：「。」が行頭に来ないよう前の行へ追い出される', async ({page})=> {
	// 自然な折り返しなら「あいうえお」|「。かきくけこ」|「さしすせそ」の5文字区切りだが、
	//	「。」が行頭禁則なので「あいうえ」|「お。かきくけこ」|「さしすせそ」になる
	expect(await domRow(page)).toEqual([
		'あ', 'い', 'う', 'え', '<br>', 'お', '。', 'か', 'き', 'く', 'け', 'こ', 'さ', 'し', 'す', 'せ', 'そ',
	]);
});

test('kinsoku_solでカスタム集合を指定すると対象文字が変わる', async ({page})=> {
	await pressKey(page, 'Space');
	// 既定の禁則には無い「か」をkinsoku_solに指定。「か」が2行目の先頭に来る位置なので、
	//	既定禁則の「。」のケースと同じ位置（'お'の前）で追い出しが発生する
	expect(await domRow(page)).toEqual([
		'あ', 'い', 'う', 'え', '<br>', 'お', 'か', 'き', 'く', 'け', 'こ', 'さ', 'し', 'す', 'せ', 'そ',
	]);
});

test('bura=trueでぶら下げ禁則の自前計算に切り替わり、既定の禁則（bura=false）と折り返し位置が変わる', async ({page})=> {
	// Chromiumはhanging-punctuation未対応なのでCSS任せでは効かなかった。自前計算なら効く
	await pressKey(page, 'Space');
	await pressKey(page, 'Space');
	const aRow = await domRow(page);
	expect(aRow).not.toEqual([	// 既定の禁則（bura=false、1つ目のケース）とは異なる位置になる
		'あ', 'い', 'う', 'え', '<br>', 'お', '。', 'か', 'き', 'く', 'け', 'こ', 'さ', 'し', 'す', 'せ', 'そ',
	]);
	expect(aRow.filter(v=> v === '<br>').length).toBeGreaterThan(0);	// 実際に<br>が挿入されている
});

test('[clear_lay]はkinsoku_*/buraを変更しない', async ({page})=> {
	// bura=true（前のケースで設定）が[clear_lay]後も効き続け、同じ折り返し結果になる
	await pressKey(page, 'Space');
	await pressKey(page, 'Space');
	const beforeClear = await domRow(page);

	await pressKey(page, 'Space');
	const afterClear = await domRow(page);
	expect(afterClear).toEqual(beforeClear);
});

test('実データ回帰：ss_000.sn:24の「──」対（分割禁止）が<br>で分断されない', async ({page})=> {
	// tmp_esm_uc doc/prj/script/ss_000.sn:24「…思ひ浮んで来るのか──お前はそれが…」の一部。
	//	本家dumpHtm（skynovel_esm TxtStage.ts debug.dumpHtm）の実出力で確認した禁則結果は
	//	分割禁止文字'─'の対を割らず必ず同じ行へ揃える、というもの。
	//	折り返し位置そのもの（monospaceでの実測px）は環境依存なので固定せず、
	//	「'─'の対の間に<br>が挟まらない」という禁則の不変条件だけを見る
	await pressKey(page, 'Space');
	await pressKey(page, 'Space');
	await pressKey(page, 'Space');
	await pressKey(page, 'Space');
	const row = await domRow(page);
	expect(row.filter(v=> v !== '<br>')).toEqual(['来', 'る', 'の', 'か', '─', '─', 'お', '前', 'は']);	// 文字の並び自体は保たれる
	const i = row.indexOf('─');
	expect(row[i + 1]).toBe('─');	// '─'の対が隣接（間に<br>が無い＝分断されていない）
});

test('実データ回帰：複数文字ルビの親文字2文字目も禁則判定に含まれる（2026-08-17修正）', async ({page})=> {
	// mkKinCh()が複数文字ルビの親文字を先頭1文字（.at(0)）に丸めていたため、2文字目以降が
	//	禁則判定から丸ごと欠落していた。「え─《てすと》」の2文字目'─'が、直後の単独'─'との
	//	分割禁止ペアとして正しく認識され、対が<br>で分断されないことを確認する
	await pressKey(page, 'Space');
	await pressKey(page, 'Space');
	await pressKey(page, 'Space');
	await pressKey(page, 'Space');
	await pressKey(page, 'Space');
	const row = await domRow(page);
	// 「え─《てすと》」は1つの表示単位（外側span）としてまとまるので、その1要素のtextContentが
	//	「え─てすと」になる（親文字＋ルビが連結される。domRowはouter span単位でしか見ないため）
	expect(row.filter(v=> v !== '<br>')).toEqual(['あ', 'い', 'う', 'え─てすと', '─', 'お', 'か', 'き', 'く', 'け', 'こ']);
	const i = row.indexOf('え─てすと');
	expect(row[i + 1]).toBe('─');	// 対が隣接（間に<br>が無い＝分断されていない）
});

test('回帰：自然折り返し受理後は新しい行を基準に測る（行途中の「ー」で誤って追い出さない）', async ({page})=> {
	// 実測 add_fx「無名 fx はレイヤスコープで…」の再現。1行目末が行頭禁則でない折り返しを
	//	cont=true で受理したあと sl_xy を更新しないと、2行目途中の行頭禁則「ー」（コープの
	//	長音符）を新行頭と誤認し、その手前へ<br>を誤挿入していた（「…かき」で大きく余った改行）。
	//	行頭禁則文字が本当の行頭に無いので、正しくは<br>は1つも挿さらない
	for (let i = 0; i < 6; ++i) await pressKey(page, 'Space');
	const row = await domRow(page);
	expect(row.filter(v=> v === '<br>')).toEqual([]);	// 誤挿入された<br>が無い
	expect(row.join('')).toBe('あいうえおかきーけこさ');	// 文字の並びは保たれる
});

test('文字spanは[r]以外すべてinline-block（ブラウザ標準の行分割・禁則を無効化するため）', async ({page})=> {
	expect(await page.$$eval(`${SEL_FORE} span[data-lay="mes"] > span:first-child > span`,
		aEl=> aEl.map(el=> getComputedStyle(el).display)))
		.toEqual(Array(16).fill('inline-block'));	// 「あいうえお。かきくけこさしすせそ」＝16文字
});
