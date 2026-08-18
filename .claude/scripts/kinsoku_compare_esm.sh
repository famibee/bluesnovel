#!/bin/bash
# kinsoku_compare.sh の本家（skynovel_esm / tmp_esm_uc）版。
# ss_000.sn:24（「安全剃刀の刃なんぞが…」の段落）を本家tmp_esm_ucで同じチェックポイントまで
# 進め、縦書き列ごとの文字列をダンプする。bluesnovel側との突き合わせはtodo.md「引き継ぎ」参照。
#
# 前提：tmp_esm_uc（localhost:5174）のdevサーバーが起動済みであること。
#   起動していなければ:
#     (cd <tmp_esm_ucのパス> && npx vite --port 5174) &
#   で起動できる（このリポジトリの外側にあるプロジェクトなので絶対パスで指定すること）。
#
# 使い方：
#   bash .claude/scripts/kinsoku_compare_esm.sh
#   → 各列（x座標でグループ化）のテキストをJSON配列で標準出力に返す
#
# 判明している注意点：
#   - 本家はタイトル画面までpixi.js(canvas)描画でDOM操作不可。headless Chromiumだと
#     canvasが常に真っ黒になる既知の制限があるため playwright-cli は必ず --headed で開くこと
#   - 文字レイアウトは本家自身の禁則計測用の隠しDOM（.sn_ch、TxtLayer.tsのhyph()が使うのと
#     同じ要素）から getBoundingClientRect() で読み取れる（画面には見えないが実座標を持つ）
#   - 本家には[l]待ちのタイミングがbluesnovelと異なる箇所があり、1クリックで複数文が
#     一気に流れることがある。stable待ち（.sn_chのtextContent結合が変化しなくなるまで
#     ポーリング）で吸収する
#   - 列はDOMの<br>でなく、.sn_ch要素のgetBoundingClientRect().left（縦書きなのでx座標）を
#     基準にグループ化して復元する。複数文字ルビの親文字はサブピクセル差で近い別x値に
#     分裂することがあるため、隣接するxはまとめて読むこと（本スクリプトは分裂したまま出力する
#     ので、目視でまとめて判断する）
#   - このスクリプトはセッション名 `esm`（playwright-cli -s=esm）を使う。tmp_blues側の
#     既定セッションとは独立して同時に開いておける

set -euo pipefail

wait_stable() {
	local prev="__init__" cur=""
	for _ in $(seq 1 20); do
		cur=$(playwright-cli -s=esm --raw eval "[...document.querySelectorAll('.sn_ch')].map(e=>e.textContent).join('')" 2>/dev/null)
		if [ "$cur" == "$prev" ] && [ -n "$cur" ]; then break; fi
		prev="$cur"
		sleep 0.15
	done
	echo "$cur"
}

if ! lsof -i :5174 >/dev/null 2>&1; then
	echo "ERROR: tmp_esm_uc (localhost:5174) が起動していません。" >&2
	echo "  (cd <tmp_esm_ucのパス> && npx vite --port 5174) & で起動してから再実行してください" >&2
	exit 1
fi

playwright-cli -s=esm open --headed http://localhost:5174 >/dev/null 2>&1
playwright-cli -s=esm localstorage-clear >/dev/null 2>&1
playwright-cli -s=esm reload >/dev/null 2>&1
sleep 1.5

# タイトル画面はpixi描画でDOM要素が無いため座標クリック（ウインドウ実測値。ずれる場合は
# screenshotで「最初から」の位置を確認し直すこと）
playwright-cli -s=esm mousemove 340 480 >/dev/null 2>&1
playwright-cli -s=esm mousedown >/dev/null 2>&1
playwright-cli -s=esm mouseup >/dev/null 2>&1
sleep 1.5

# #skynovel_act を5回クリックで ss_000.sn:24 冒頭の[l]待ちチェックポイント
# （「…のか──」で止まる）へ到達。段落全体（「…ちがひない。」まで）を見たい場合は
# さらに3回追加でクリックする
for _ in 1 2 3 4 5; do
	playwright-cli -s=esm click "#skynovel_act" >/dev/null 2>&1
	wait_stable >/dev/null
done

playwright-cli -s=esm --raw eval "
	(() => {
		const chs = [...document.querySelectorAll('.sn_ch')];
		const rects = chs.map(e => {
			const r = e.getBoundingClientRect();
			return {t: e.textContent, x: Math.round(r.left), y: Math.round(r.top)};
		});
		const byX = {};
		for (const r of rects) {
			if (!byX[r.x]) byX[r.x] = [];
			byX[r.x].push(r);
		}
		const xs = Object.keys(byX).map(Number).sort((a, b) => b - a);
		return JSON.stringify(xs.map(x => ({
			x, count: byX[x].length,
			text: byX[x].sort((a, b) => a.y - b.y).map(r => r.t).join(''),
		})), null, 1);
	})()
" 2>&1
