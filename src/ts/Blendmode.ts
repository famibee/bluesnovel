/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2026-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

// blendmodeをCSSのmix-blend-mode値へ。本家（Layer.getBlendmodeNum()）が受け付けるのは
//	pixiのBLEND_MODESへ引ける4種だけなので、同じ名前だけを通す。
//	addはCSSに同名が無いので plus-lighter（加算合成）を当てる。
//	[lay]・[add_face]・[button]・[add_filter]の4タグとも**ここを通す**（受ける名前と例外の文言を揃えるため。
//	ScriptEngine.tsとFilter.tsの両方から使うのでここへ独立させてある）
const H_BLENDMODE: {[nm: string]: string} = {
	normal: 'normal', add: 'plus-lighter', multiply: 'multiply', screen: 'screen',
};
export function argBlendmode(v: string): string {
	const s = H_BLENDMODE[v];
	if (! s) throw `${v} はサポートされない blendmode です`;	// 本家と同じ文言
	return s;
}
