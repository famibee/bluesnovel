/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2026-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

// [def_fx name= glsl=] で定義したユーザープリセット GLSL の置き場（分家独自）。
//	・エンジン（ScriptEngine.#hDefFx）は名前だけを純粋に台帳管理し、GLSL 本体は defFx
//	  アクション経由でここへ入る。lazy な FxRunner.ts が fx 名で getDefFx() する。
//	・[add_face] の #hFace と同じ思想で **セーブファイルには焼かない**。定義は「テンプレ起動時に
//	  必ず通る処理（[call fn=ext_*] など）で [def_fx] を再実行して毎回埋め直す」運用にすることで、
//	  aFx（＝[save] 対象）からは fx 名だけで済み、1 シェーダ ~1K のセーブ肥大を避ける
//	  （ANIMATION_RESEARCH.md §7「セーブ・ロード」）。
//	・格納するのは作者が書いた本体のみ。共通ヘッダ（precision／uSampler／tick／resolution／
//	  vTextureCoord）は組み込みプリセットと同じく FxRunner が HEAD を前置する。
//	・core バンドルに乗るが、Map 1 個と関数 2 個だけ（GLSL 文字列は実行時にシナリオから来る）。

const h = new Map<string, string>();

// [def_fx] 実行時に ScriptMng.#applyAction() から。同名再定義の弾きは ScriptEngine 側（#hDefFx）で済み
export function defFx(name: string, glsl: string) {h.set(name, glsl)}

// FxRunner.fsOf() から。未定義は undefined（呼び出し側で例外文言を作る）
export function getDefFx(name: string): string | undefined {return h.get(name)}
