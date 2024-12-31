/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2022-2025 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

const [, , ...aCmd] = process.argv;
const watch = aCmd.includes('--watch') ?{} :null;
const web = aCmd.includes('--web') ?{} :null;

import {build} from 'vite';
import dts, {PluginOptions} from 'vite-plugin-dts';
import {builtinModules} from 'node:module';

const oDts: PluginOptions = {
	beforeWriteFile: pathOut=> ({
		filePath: pathOut.replace('/src/', '/'),
	}),
};

// === ブラウザ用 ===
build({
	build: {
		target		: 'esnext',
		lib: {
			entry	: './src/web',
			fileName: _=> 'web.js',
			formats	: ['es'],
		},
		sourcemap	: true,
		emptyOutDir	: false,
//		minify		: 'terser',
		reportCompressedSize	: false,
		watch,
		rollupOptions: {
			output: { // entry chunk assets それぞれの書き出し名の指定
				entryFileNames: `[name].js`,
				chunkFileNames: `[name].js`,
				assetFileNames: `[name].[ext]`,
			},
		},
	},
	plugins: [dts(oDts)],
});
if (! web) {

// === アプリ用 ===
build({
	build: {
		target		: 'esnext',
		lib: {
			entry	: './src/app',
			fileName: _=> 'app.js',
			formats	: ['es'],
		},
		sourcemap	: true,
		emptyOutDir	: false,
//		minify		: 'terser',
		reportCompressedSize	: false,
		watch,
		rollupOptions: {
			external: [
				...builtinModules.flatMap(p=> [p, `node:${p}`]),
			],
			output: { // entry chunk assets それぞれの書き出し名の指定
				entryFileNames: `[name].js`,
				chunkFileNames: `[name].js`,
				assetFileNames: `[name].[ext]`,
			},
		},
	},
	plugins: [dts(oDts)],
});

build({
	build: {
		target		: 'esnext',
		lib: {
			entry	: './src/appMain',
			fileName: _=> 'appMain.js',
			formats	: ['es'],
		},
		sourcemap	: true,
		emptyOutDir	: false,
//		minify		: 'terser',
		reportCompressedSize	: false,
		watch,
		rollupOptions: {
			external: [
				'electron',
				'electron-devtools-installer',
				...builtinModules.flatMap(p=> [p, `node:${p}`]),
			],
			output: { // entry chunk assets それぞれの書き出し名の指定
				entryFileNames: `[name].js`,
				chunkFileNames: `[name].js`,
				assetFileNames: `[name].[ext]`,
			},
		},
	},
	plugins: [dts(oDts)],
});

build({
	build: {
		target		: 'esnext',
		lib: {
			entry	: './src/preload',
			fileName: _=> 'preload.js',
			formats	: ['es'],
		},
		sourcemap	: true,
		emptyOutDir	: false,
//		minify		: 'terser',
		reportCompressedSize	: false,
		watch,
		rollupOptions: {
			external: [
				'electron',
				...builtinModules.flatMap(p=> [p, `node:${p}`]),
			],
			output: { // entry chunk assets それぞれの書き出し名の指定
				entryFileNames: `[name].js`,
				chunkFileNames: `[name].js`,
				assetFileNames: `[name].[ext]`,
			},
		},
	},
	plugins: [dts(oDts)],
});

}
