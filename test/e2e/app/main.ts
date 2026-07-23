/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2026-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

// E2E（Playwright）専用の起動エントリ。src/ 配下には一切手を入れず、
//	ここだけでテスト用のフック（window.__sn）を生やす。
//	vite dev が src/ をそのままトランスパイルして配信するため、
//	Main.tsx が動的 import する store と同一モジュール実体を掴める
//	（＝ここで公開した useStore で本番同様の状態がそのまま覗ける）。

import {SysWeb} from '../../../src/web';
import {useStore} from '../../../src/store/store';

// ?prj=basic / ?prj=button でシナリオ（プロジェクトフォルダ）を切り替える。
//	SysBase.loaded() が読むのは常に main（ScriptMng.load('main') 固定）なので、
//	シナリオごとにプロジェクトフォルダ自体を分ける方式にした。
const prj = new URLSearchParams(location.search).get('prj') ?? 'basic';

(globalThis as any).__sn = {store: useStore};

new SysWeb({}, {cur: `/test/e2e/app/prj_${prj}/`, crypto: false, dip: ''});
