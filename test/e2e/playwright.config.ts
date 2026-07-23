/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2026-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

// ブラウザUIテスト（E2E）設定。ユニットテスト（bun test）とは完全に分離する。
//	webServerオプションでvite devサーバーの起動・待受・終了までPlaywrightに任せるため、
//	開発者が事前にサーバーを起動しておく必要はない（バックグラウンド起動でハングする事故も避けられる）。

import {defineConfig, devices} from '@playwright/test';
import {fileURLToPath} from 'node:url';

// E2E専用ポート。viteの既定(5173)やその繰り上がり(5174…)は、
//	別プロジェクト（tmp_blues等）のdevサーバーが居座っていることがあり、
//	そちらを掴むと「別のアプリを叩いて全部落ちる」ため意図的に離す
const PORT = 5199;
const BASE = `http://localhost:${PORT}`;

// リポジトリルート。viteのルート（＝配信の基点）をここへ固定する
const ROOT = fileURLToPath(new URL('../../', import.meta.url));

export default defineConfig({
	testDir	: '.',	// この設定ファイルと同じ階層（test/e2e/）
	// bun test は *.spec.ts / *.test.ts を自動で拾ってしまうため、E2Eは *.e2e.ts 命名で棲み分ける
	testMatch	: '**/*.e2e.ts',
	// 失敗時のスクショ等の出力先。明示しないとカレント（＝リポジトリルート）に
	// test-results/ が出来てルートが散らかる
	outputDir	: fileURLToPath(new URL('./test-results/', import.meta.url)),

	fullyParallel	: true,
	forbidOnly		: Boolean(process.env.CI),
	retries			: process.env.CI ? 2 : 0,
	reporter		: process.env.CI ? 'github' : 'list',

	use	: {
		baseURL	: BASE,
		trace	: 'on-first-retry',
	},

	projects	: [{name: 'chromium', use: {...devices['Desktop Chrome']}}],

	webServer	: {
		// viteのルートはリポジトリルート、テストページは /test/e2e/app/index.html。
		//	cwdの既定は「設定ファイルのあるディレクトリ」なので、明示的にルートへ寄せる
		command				: `bunx vite --port ${String(PORT)} --strictPort`,
		cwd					: ROOT,
		url					: `${BASE}/test/e2e/app/index.html`,
		// 既存サーバーの再利用はしない：他プロジェクトのdevサーバーを掴む事故を防ぐ。
		//	ポートが塞がっていれば --strictPort が即エラーで知らせてくれる
		reuseExistingServer	: false,
		stdout				: 'pipe',
		stderr				: 'pipe',
		timeout				: 120_000,
	},
});
