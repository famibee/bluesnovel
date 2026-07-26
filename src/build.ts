/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2022-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

const [, , ...aCmd] = process.argv;
const watch = aCmd.includes('--watch') ?{} :null;

import {build, type BuildEnvironmentOptions} from 'vite';
import {builtinModules} from 'node:module';
import {spawnSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';

// リポジトリルート（末尾に /）。`import.meta.dir` は Bun 拡張なので標準の ESM で書く
const ROOT = fileURLToPath(new URL('../', import.meta.url));

const oBuild: BuildEnvironmentOptions = {
	target		: 'esnext',

	sourcemap	: true,
	emptyOutDir	: false,
//	minify		: 'terser',
	reportCompressedSize	: false,
	watch,
};
const output = { // entry chunk assets それぞれの書き出し名の指定
	entryFileNames: '[name].js',
	chunkFileNames: '[name].js',
	assetFileNames: '[name].[ext]',
};

const aP = [];

// === ブラウザ用 ===
aP.push(build({
	build: {
		...oBuild,
		lib: {
			entry	: './src/web',
			fileName: _=> 'web.js',
			formats	: ['es'],
		},
		rolldownOptions: {output},
	},
}));

// === アプリ用 ===
aP.push(build({
	build: {
		...oBuild,
		lib: {
			entry	: './src/app',
			fileName: _=> 'app.js',
			formats	: ['es'],
		},
		outDir	: 'dist_app',
		rolldownOptions: {
			external: builtinModules.flatMap(p=> [p, `node:${p}`]),
			output,
		},
	},
}));

aP.push(build({
	build: {
		...oBuild,
		lib: {
			entry	: './src/appMain',
			fileName: _=> 'appMain.js',
			formats	: ['es'],
		},
		outDir	: 'dist_app',
		rolldownOptions: {
			external: [
				'electron',
				'electron-devtools-installer',
				...builtinModules.flatMap(p=> [p, `node:${p}`]),
			],
			output,
		},
	},
}));

aP.push(build({
	build: {
		...oBuild,
		lib: {
			entry	: './src/preload',
			fileName: _=> 'preload.js',
			formats	: ['es'],
		},
		outDir	: 'dist_app',
		rolldownOptions: {
			external: [
				'electron',
				...builtinModules.flatMap(p=> [p, `node:${p}`]),
			],
			output,
		},
	},
}));

void Promise.allSettled(aP).then(()=> {
	if (watch) return;	// watch 中は毎回の全ファイル型解析が重いので出さない（従来通り）

	// === 型定義（.d.ts）===
	// 本家 skynovel_esm は同じ位置で `vite-plugin-dts` を使う（そちらは動いている）が、
	//	ここは **tsc に直接出させる**。プラグインは vite の build 単位で走るので:
	//	- 4本すべてに付くため、**dist_app/ にも同じ木が出る**。共有モジュール（src/ts/…,
	//	  src/sn/…）の型が2組でき、`bluesnovel` と `bluesnovel/app` の両方を import した
	//	  利用者から見て**別の型**になってしまう
	//	- 出力範囲が tsconfig の include なりなので、**test/**.d.ts と build.d.ts まで
	//	  公開物に混じる**（実測 79 ファイル。tsc 側は src だけの40ファイル）
	//	- ビルド1本につき8秒以上かかる
	//	なので出力先は dist/ 一箇所にし、dist_app/*.js の型は package.json の exports の
	//	types 条件で dist/ 側を指す。ここは status を見て終了コードに反映する
	//	（この Promise.allSettled は例外を握り潰すので、プラグイン方式だと失敗が無言になる）
	const {status} = spawnSync(
		`${ROOT}node_modules/.bin/tsc${process.platform === 'win32' ?'.cmd' :''}`,
		['-p', `${ROOT}tsconfig.dts.json`],
		{stdio: 'inherit'},
	);
	if (status) process.exitCode = status;
});
