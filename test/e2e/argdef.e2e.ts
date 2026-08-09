/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2026-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

// **「CSSに既定を任せる」と決めた属性が、本家と同じ値になっているかを算出値で見張る**
//	（シナリオ：test/e2e/app/prj_argdef/main.sn）。
//
//	bluesnovelは「シナリオが書いた属性だけを格納する」方針（CLAUDE.md）なので、書かなかった分の
//	既定は下流のCSSが供給する。埋めないのが正解——ただし**CSSの既定が本家の既定と一致している
//	ことが前提**で、その一致は誰も検査していなかった。実際 [button] の width/height は
//	CSSの既定（文字なりの幅）が本家の既定（100×30）と食い違っており、テンプレのシステムメニューが
//	隣と重なっていた（あちらはエンジンの入口で埋める側へ倒した）。
//
//	台帳は test/argdef_parity.test.ts の A_CSS_DEF。あちらはソースの照合なので**CSS側のズレは
//	見つけられない**。ここが対になる検査。

import {expect, test} from '@playwright/test';
import {SEL_FORE, gotoSn, pressKey} from './snPage';

test.beforeEach(async ({page})=> {await gotoSn(page, 'argdef')});

// 「変形なし」の算出値。デザインモードのMoveable用の下地（Stage.tsx sty4Moveable）が
//	恒等変換を書くので、未指定でも 'none' にはならない
const IDENTITY = ['none', 'matrix(1, 0, 0, 1, 0, 0)'];

// レイヤ1枚分の実寸とステージ枠。ステージは窓に合わせて transform: scale されるので、
//	距離を比べるときはその倍率で割る
async function layBox(page: import('@playwright/test').Page, nm: string) {
	return page.evaluate(nm=> {
		const el = document.querySelector(`#skynovel [data-page="fore"] [data-lay="${nm}"]`)!;
		const b = el.getBoundingClientRect();
		const st = document.querySelector('#skynovel [data-page="fore"]')!.getBoundingClientRect();
		const inner = document.getElementById('skynovel')!.firstElementChild!;
		const scale = st.width / (inner as HTMLElement).offsetWidth;
		return {
			stage: {left: st.left, top: st.top, right: st.right, bottom: st.bottom,
				width: st.width, height: st.height},
			box	: {right: b.right, bottom: b.bottom, cx: b.left + b.width / 2, cy: b.top + b.height / 2},
			scale,
		};
	}, nm);
}

// レイヤ1枚分の算出値。left/topはステージ内箱からの相対で見る
//	（ステージは窓に合わせて transform: scale されるので、絶対座標では比べられない）
const layStyle = (nm: string)=> async (page: import('@playwright/test').Page)=> page.evaluate(nm=> {
	const el = document.querySelector(`${'#skynovel [data-page="fore"]'} [data-lay="${nm}"]`);
	if (! el) return null;
	const cs = getComputedStyle(el);
	const box = el.getBoundingClientRect();
	const par = ((el as HTMLElement).offsetParent ?? el.parentElement)!.getBoundingClientRect();
	return {
		display		: cs.display,
		visibility	: cs.visibility,
		opacity		: cs.opacity,
		transform	: cs.transform,
		mixBlendMode: cs.mixBlendMode,
		filter		: cs.filter,
		dx			: Math.round(box.left - par.left),
		dy			: Math.round(box.top - par.top),
	};
}, nm);


test('画像レイヤ：書かなかった表示属性の既定が本家と同じ', async ({page})=> {
	const s = await layStyle('base')(page);
	expect(s).not.toBeNull();

	// visible=true（本家 Layer.ts の既定）。styLay()はvisible=falseの時だけdisplay:noneを出す
	expect(s!.display).not.toBe('none');
	expect(s!.visibility).toBe('visible');
	// alpha=1（本家 argChk_Num(hArg,'alpha',1)）
	expect(s!.opacity).toBe('1');
	// rotation=0・scale_x/y=1（本家とも）。styLay()はこれらが未指定ならtransformを出さないが、
	//	デザインモードのMoveable用の下地（Stage.tsx sty4Moveable）が恒等変換を書くので
	//	算出値は 'none' ではなく単位行列になる。**見た目は等倍・無回転**で本家と同じ
	expect(IDENTITY).toContain(s!.transform);
	// left=0・top=0（本家 Layer.ts:513 の x/y 初期値）
	expect(s!.dx).toBe(0);
	expect(s!.dy).toBe(0);
	// blendmode=normal・フィルタ無し（[add_filter]未使用）
	expect(s!.mixBlendMode).toBe('normal');
	expect(s!.filter).toBe('none');
});

test('文字レイヤ：書かなかった表示属性の既定が本家と同じ', async ({page})=> {
	// 文字レイヤは本文の箱（padding/marginを持つ試作の既定スタイル）が別にあるが、
	//	レイヤとしての表示属性はここで見る値が全て
	const s = await layStyle('mes')(page);
	expect(s).not.toBeNull();

	expect(s!.display).not.toBe('none');
	expect(s!.visibility).toBe('visible');
	expect(s!.opacity).toBe('1');
	expect(IDENTITY).toContain(s!.transform);
	expect(s!.mixBlendMode).toBe('normal');
});

test('表示属性を書かなければストアにも入らない（埋めていないことの確認）', async ({page})=> {
	// 上の算出値が「CSSの既定」であって「エンジンが埋めた値」ではないことを裏取りする。
	//	ここに値が入り始めたら、それはCSSに任せる方針から外れた合図
	const sty = await page.evaluate(()=> {
		const s = (globalThis as any).__sn.store.getState();
		const e = s.aPage[s.foreIdx].find((l: any)=> l.nm === 'base');
		const h: Record<string, unknown> = {};
		for (const k of ['visible', 'alpha', 'left', 'top', 'rotation', 'scale_x', 'scale_y', 'blendmode']) {
			if (e[k] !== undefined) h[k] = e[k];
		}
		return h;
	});
	expect(sty).toEqual({});
});

test('ステージ内に収まっている（原点がステージ左上）', async ({page})=> {
	// left/top=0 が「ステージの左上」を指していることまで見る。
	//	親がずれていると dx/dy=0 でも本家と違う位置に出る
	const ok = await page.locator(SEL_FORE).evaluate(el=> {
		const p = el.getBoundingClientRect();
		const s = document.getElementById('skynovel')!.getBoundingClientRect();
		return Math.round(p.left - s.left) === 0 && Math.round(p.top - s.top) === 0;
	});
	expect(ok).toBe(true);
});

test('center/middle は指定値に表示物の中心が来る', async ({page})=> {
	// 本家は「指定値から表示物の幅・高さの半分を引く」。こちらはCSSの独立translateで
	//	-50%ずらす（実寸を知らなくてよい）。**同じ絵になることを実測で確かめる**
	await pressKey(page, 'Space');
	const {stage, box} = await layBox(page, 'c');
	expect(Math.round(box.cx - stage.left)).toBe(Math.round(stage.width * 0.5));
	expect(Math.round(box.cy - stage.top)).toBe(Math.round(stage.height * 0.5));
});

test('right/bottom は指定値に表示物の右下端が来る', async ({page})=> {
	await pressKey(page, 'Space');
	const {stage, box} = await layBox(page, 'r');
	expect(Math.round(box.right - stage.left)).toBe(Math.round(stage.width * 0.5));
	expect(Math.round(box.bottom - stage.top)).toBe(Math.round(stage.height * 0.5));
});

test('s_right/s_bottom はステージの右端・下端からの距離', async ({page})=> {
	// CSSのright/bottomがそのまま同義。left/topは持たせない
	await pressKey(page, 'Space');
	const {stage, box, scale} = await layBox(page, 's');
	expect(Math.round((stage.right - box.right) / scale)).toBe(20);
	expect(Math.round((stage.bottom - box.bottom) / scale)).toBe(30);
});

test('縦書きでもクリック待ちマークは直前の文字の次（下）に出る', async ({page})=> {
	// 縦書きの「次」は下。マークが本文の流れから外れて隣の列へ行っていないことを見る。
	//	なお余白は論理プロパティ（margin-inline-start）で書いてある——物理方向の margin-left は
	//	縦書きだと「次の行の方向」を指してしまうため。ただし実測では両者の差は出ていない
	//	（マークの箱の幅が文字と違うぶんのズレの方が大きい）
	await pressKey(page, 'Space');	// よせた
	await pressKey(page, 'Space');	// たてがき（縦書き＋待ちマーク）

	const pos = await page.evaluate(()=> {
		const mes = document.querySelector('#skynovel [data-page="fore"] span[data-lay="mes"]')!;
		const mark = mes.lastElementChild!.getBoundingClientRect();
		// 本文の最後の文字＝マークの1つ前
		const ch = mes.lastElementChild!.previousElementSibling!.getBoundingClientRect();
		return {markX: mark.left, markY: mark.top, chX: ch.left, chY: ch.top};
	});
	// 縦書きなので「次」は**下**。列をまたいでいない（横方向のズレが1文字幅に収まる）ことも見る
	expect(pos.markY).toBeGreaterThan(pos.chY);
	expect(Math.abs(pos.markX - pos.chX)).toBeLessThan(24);
});

test('pl/pr/pt/pb は文字表示領域の内側余白（指定した辺だけ既定のCSS値を上書きする）', async ({page})=> {
	await pressKey(page, 'Space');	// よせた
	await pressKey(page, 'Space');	// たてがき
	await pressKey(page, 'Space');	// よこ
	await pressKey(page, 'Space');	// よはく（pレイヤ配置）

	const r = await page.evaluate(()=> {
		const el = document.querySelector('#skynovel [data-page="fore"] [data-lay="p"]')! as HTMLElement;
		const cs = getComputedStyle(el);
		return {
			pl: cs.paddingLeft, pr: cs.paddingRight, pt: cs.paddingTop, pb: cs.paddingBottom,
			w: el.offsetWidth,	// transformの拡縮に影響されない論理px
		};
	});
	expect(r.pl).toBe('10px');
	expect(r.pr).toBe('20px');
	expect(r.pt).toBe('30px');
	expect(r.pb).toBe('40px');
	// content-box（既定のまま）なので[lay width=300]は内側の文字表示領域の幅、
	//	paddingはその外側に足される（本家の画像レイヤ同様、bluesnovelのwidthは常に「中身」の寸法）
	expect(r.w).toBe(300 + 10 + 20);
});

