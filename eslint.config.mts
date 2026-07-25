import {defineConfig, globalIgnores} from 'eslint/config'
import js from '@eslint/js'
import jest from 'eslint-plugin-jest'
import {configs, parser, plugin} from 'typescript-eslint'
import globals from 'globals'
import plgImport from 'eslint-plugin-import'

// ※現状このリポジトリのESLintは動かない（塩漬け）。typescript-eslintが
//	TypeScript 7 非対応と明示的にthrowするため（issue #10940）。TS 7.1対応待ち。
//	それでもこのファイルを置いておくのは、VSCode拡張のエラーが
//	「設定ファイルが見つからない」から「typescript-eslintがTS 7非対応」へ変わり、
//	本当の原因が出るようになるから。詳細は todo.md
//
// 本家 skynovel_esm/eslint.config.mts をほぼそのまま。相違は下記のみ
//	・.tsx（React + @emotion/react のJSX）を対象に含める
//	・ビルド成果物（dist/・dist_app/）とdocs/を globalIgnores する
//		（本家と違いこちらは成果物をコミットしているので、放っておくと生成jsを延々と検査する）
//	・テストランナはbun。`bun:test`からimportして使うのでjestのグローバルは要らないが、
//		eslint-plugin-jest 自体は外せない。本家から無改変で持ってきた test/Grammar.test.ts に
//		`eslint-disable-next-line jest/no-conditional-expect` が残っており、
//		プラグイン未ロードだと「そんなルールは無い」と怒られるため

export default defineConfig([
	globalIgnores([
		'eslint.config.mts',	// このファイル自身はチェックせず
		'dist/**', 'dist_app/**',	// ビルド成果物
		'docs/**',	// 資料（プレイグラウンド）
	]),
	js.configs.recommended,
	configs.recommendedTypeChecked,
	configs.strictTypeChecked,		// バグも検出できる、より独自のルールを含むスーパーセット
	configs.stylisticTypeChecked, {// バグを大幅に検出したりロジックを変更したりすることなく、一貫したスタイルを適用する追加ルール。
		languageOptions: {
			parser,
			parserOptions: {
				projectService: true,
					// test/e2e/ はルートtsconfigのexclude対象だが、
					// projectService が test/e2e/tsconfig.json を自力で見つける
				tsconfigRootDir: import.meta.dirname,
			},
			globals: {
				...globals.browser,	// Webブラウザ(Client)環境の場合
				...globals.node,	// Node.js(Server)環境の場合
				...jest.environments.globals.globals,
				NodeJS : true,
			},
		},
		settings: {
			jest: {version: 'latest'},
		},
		plugins: {
			js,
			jest,
			'@typescript-eslint': plugin,
		},
		extends: [],
	},
	jest.configs['flat/recommended'],
	plgImport.flatConfigs.recommended,
	plgImport.flatConfigs.typescript,
	{
		name: 'ほぼすべての ts / tsx',
		files: ['{src,test}/**/*.{ts,tsx}'],
		rules: {
			// 未使用変数チェックの回避 _
			'no-unused-vars': 'off',	// VSC がやるので
			'no-unused-private-class-members': 'off',
			'@typescript-eslint/no-unused-vars': 'off',
			'no-extra-semi': 'warn',	// セミコロン ; の重複
			'quotes': ['warn', 'single', {allowTemplateLiterals: true}],
				// 本家と違い allowTemplateLiterals を足す。
				// 「文字列リテラルにエスケープを書かない」規約でテンプレートリテラルを多用するため
			// awaitを忘れないように
			'@typescript-eslint/no-floating-promises': ['error', {
				ignoreIIFE: true,	// IIFEでは怒られないように
			}],
			// async/awaitを使うべきではない書き方を怒ってくれる
			'@typescript-eslint/no-misused-promises': 'error',

			'@typescript-eslint/consistent-type-definitions': ['error', 'type'],
			'@typescript-eslint/consistent-indexed-object-style': ['error', 'index-signature'],
			'@typescript-eslint/no-confusing-void-expression': 'off',
			'no-throw-literal': 'off',	// できれば有効にした方がいい
			'@typescript-eslint/only-throw-error': 'off',
			'@typescript-eslint/consistent-type-assertions': ['error', {
				arrayLiteralTypeAssertions: 'allow',
				assertionStyle: 'angle-bracket',
				objectLiteralTypeAssertions: 'allow',
			}],
			'@typescript-eslint/no-unused-private-class-members': 'error',
			'@typescript-eslint/no-useless-default-assignment': 'error',

			'import/no-unresolved': 'off',

			// ESLintのエラールール。日本語ざっくり解説[可能性があるエラー編] https://qiita.com/M-ISO/items/f9097a75b362206c2a99
			'no-control-regex': 'error',
			'no-extra-parens': 'warn',
			'no-regex-spaces': 'error',

			// ESLintのエラールール。日本語ざっくり解説[ES6編] https://qiita.com/M-ISO/items/f0c2f0e669db32cf4efb
			'object-shorthand': 'error',

			// ESLintのエラールール。日本語ざっくり解説[スタイル編] https://qiita.com/M-ISO/items/113ddd448bdc496af783
			'no-trailing-spaces': 'error',
			'no-unneeded-ternary': 'error',
			'operator-assignment': 'error',
			'semi-spacing': ['error', {before: false, after: true}],
			'space-before-function-paren': ['error', {
				anonymous: 'never',
				named: 'never',
				asyncArrow: 'always'
			}],
			'space-unary-ops': ['error', {
				overrides: {'!': true, '~': true},
			}],

			// ESLintのエラールール。日本語ざっくり解説[ベストプラクティス編] https://qiita.com/M-ISO/items/4cd183e2496c2937a53e
			'eqeqeq': 'error',
			'no-alert': 'error',
			'no-else-return': 'error',
			'no-eval': 'error',
			'no-extend-native': 'error',
			'no-invalid-this': 'error',
			'no-labels': 'error',
			'no-loop-func': 'error',
			'no-multi-str': 'error',
			'no-new-wrappers': 'error',
			'no-param-reassign': 'error',
			'no-process-env': 'error',
			'no-return-assign': 'error',
			'no-script-url': 'error',
			'no-unused-expressions': 'error',
			'no-useless-call': 'error',
			'no-useless-concat': 'error',
		},
	},
]);
