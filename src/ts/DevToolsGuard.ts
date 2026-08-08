/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2026-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

// web版のDevTools検知（本家は`devtools-detect`を使うが、2026-05-12にsindresorhus自身が
//	リポジトリをアーカイブ済みで、README冒頭に「多くの欠陥がある」と作者が明記しているため
//	移植せず自前実装した。todo.md参照。
//	原理は同ライブラリと同じ「window外寸と内寸の差」ヒューリスティック（DevToolsを
//	ドッキング表示すると内寸だけ縮む。別ウインドウ切り離しやモバイルでは検知できない等、
//	この方式自体の限界は変わらない）。
//	Electronアプリ版は appMain_cmn.ts が `webContents.on('devtools-opened')` で
//	ネイティブに検知・強制終了まで行うのでこの関数は呼ばない。こちらはアプリを
//	終了させる手段が無いため、**警告オーバーレイを出すだけ**に留める
const THRESHOLD = 160;	// devtools-detectと同じ既定しきい値(px)
const CHECK_MSEC = 500;

export function initDevToolsGuard() {
	const el = document.createElement('div');
	el.textContent = 'DevToolは禁止されています';
	el.style.cssText = `
		position: fixed; inset: 0; z-index: 2147483647;
		display: none; align-items: center; justify-content: center;
		background: rgba(0, 0, 0, 0.85); color: white; font-size: 2em;
		text-align: center; pointer-events: none;
	`;
	document.body.appendChild(el);

	let opened = false;
	const check = ()=> {
		const isOpen = window.outerWidth - window.innerWidth > THRESHOLD
			|| window.outerHeight - window.innerHeight > THRESHOLD;
		if (isOpen === opened) return;

		opened = isOpen;
		el.style.display = isOpen ? 'flex' : 'none';
	};
	globalThis.addEventListener('resize', check);
	setInterval(check, CHECK_MSEC);
	check();
}
