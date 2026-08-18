#!/bin/bash
# ss_000.sn:24（「安全剃刀の刃なんぞが…」の段落）の縦書き改行位置を、
# tmp_blues実機（playwright-cli）で自動的にチェックポイントまで進めて
# 列ごとの文字列をダンプするツール。
#
# 背景：この段落の折り返し位置が本家（skynovel_esm/tmp_esm_uc）とズレる不具合を
# 追いかけているが、毎回手作業でplaywright-cliのタイミング合わせをやり直していたため
# スクリプト化した（2026-08-18）。詳細な調査経緯・本家側の比較手順はtodo.md「引き継ぎ」参照。
#
# 前提：tmp_blues（localhost:5173）のdevサーバーが起動済みであること。
#
# 使い方：
#   bash .claude/scripts/kinsoku_compare.sh
#   → 各列（<br>区切り）のテキストをJSON配列で標準出力に返す（[l]待ちの瞬間なので最終列は
#     まだ1文字のことがある。次のクリックで続きが流れ込む見た目になるのは仕様どおり）
#
# 判明している注意点：
#   - playwright-cliは必ず --headed で開くこと（headlessだと挙動が変わる可能性がある、との
#     指摘あり。理由未特定）
#   - タイトル画面の「最初から」は同一テキストの要素が2つ完全に重なって存在し、
#     通常のロケータクリック（getByText等）は「element is not visible」で失敗するため
#     座標クリックで押す
#   - 文字送り（タイピング）完了前に次をクリックすると次の文が割り込み、狙った待機状態
#     （[l]待ち）に正確に止まれない。各クリック後はdocument.body.innerTextが変化しなくなる
#     までポーリングして待つ（wait_stable）

set -euo pipefail

wait_stable() {
	local prev="__init__" cur=""
	for _ in $(seq 1 20); do
		cur=$(playwright-cli --raw eval "document.body.innerText" 2>/dev/null)
		if [ "$cur" == "$prev" ] && [ -n "$cur" ] && [ "$cur" != '""' ]; then break; fi
		prev="$cur"
		sleep 0.15
	done
	echo "$cur"
}

if ! lsof -i :5173 >/dev/null 2>&1; then
	echo "ERROR: tmp_blues (localhost:5173) が起動していません。先にdevサーバーを起動してください" >&2
	exit 1
fi

playwright-cli open --headed http://localhost:5173 >/dev/null 2>&1
playwright-cli localstorage-clear >/dev/null 2>&1
playwright-cli reload >/dev/null 2>&1
sleep 0.6

# タイトル画面「最初から」は重複要素のため座標クリック（要素の中心座標を都度取得）
x=$(playwright-cli --raw eval "
	(() => {
		const el = [...document.querySelectorAll('*')].find(e => e.children.length===0 && e.textContent.trim()==='最初から');
		if (!el) return -1;
		const r = el.getBoundingClientRect();
		return r.x + r.width/2;
	})()
" 2>/dev/null | tr -d '"')
y=$(playwright-cli --raw eval "
	(() => {
		const el = [...document.querySelectorAll('*')].find(e => e.children.length===0 && e.textContent.trim()==='最初から');
		if (!el) return -1;
		const r = el.getBoundingClientRect();
		return r.y + r.height/2;
	})()
" 2>/dev/null | tr -d '"')

if [ "$x" == "-1" ]; then
	echo "ERROR: タイトル画面の「最初から」ボタンが見つかりません" >&2
	exit 1
fi
playwright-cli mousemove "$x" "$y" >/dev/null 2>&1
playwright-cli mousedown >/dev/null 2>&1
playwright-cli mouseup >/dev/null 2>&1
wait_stable >/dev/null

# 「最初から」→ #skynovel を4回クリックで ss_000.sn:24 の[l]待ちチェックポイントへ到達
for _ in 1 2 3 4; do
	playwright-cli click "#skynovel" >/dev/null 2>&1
	wait_stable >/dev/null
done

playwright-cli --raw eval "
	(() => {
		const el = [...document.querySelectorAll('span')].find(e => e.children.length > 50 && e.textContent.includes('剃刀'));
		if (!el) return 'NOTFOUND:' + document.body.innerText.slice(0, 60);
		const cols = []; let cur = [];
		for (const child of el.children) {
			if (child.tagName === 'BR') { cols.push(cur.join('')); cur = []; }
			else cur.push(child.textContent);
		}
		cols.push(cur.join(''));
		return JSON.stringify(cols, null, 1);
	})()
" 2>&1
