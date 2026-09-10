/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2026-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

// blendmodeをCSSのmix-blend-mode値へ。
//	本家（Layer.getBlendmodeNum()）はpixiのBLEND_MODESへ引ける4種（normal/add/multiply/
//	screen）しか受け付けないが、分家はレイヤ合成をCSSのmix-blend-modeで行うため、
//	CSS <blend-mode> 全種（overlay/hard-light/soft-light/color-dodge/color-burn/darken/
//	lighten/difference/exclusion/hue/saturation/color/luminosity）＋ plus-lighter/
//	plus-darker を通す。addはCSSに同名が無いので plus-lighter（加算合成）を当てる。
//	[lay]・[add_face]・[button]・[add_filter]の4タグとも**ここを通す**（受ける名前と例外の
//	文言を揃えるため。ScriptEngine.tsとFilter.tsの両方から使うのでここへ独立させてある）
const H_BLENDMODE: {[nm: string]: string} = {
	normal: 'normal',
	add: 'plus-lighter',	// 本家互換の別名
	'plus-lighter': 'plus-lighter',
	'plus-darker': 'plus-darker',
	multiply: 'multiply',
	screen: 'screen',
	overlay: 'overlay',
	darken: 'darken',
	lighten: 'lighten',
	'color-dodge': 'color-dodge',
	'color-burn': 'color-burn',
	'hard-light': 'hard-light',
	'soft-light': 'soft-light',
	difference: 'difference',
	exclusion: 'exclusion',
	hue: 'hue',
	saturation: 'saturation',
	color: 'color',
	luminosity: 'luminosity',
};
export function argBlendmode(v: string): string {
	const s = H_BLENDMODE[v];
	if (! s) throw `${v} はサポートされない blendmode です`;	// 本家と同じ文言
	return s;
}
