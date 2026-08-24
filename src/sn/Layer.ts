/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2018-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

// 本家 skynovel_esm/src/sn/Layer.ts のbluesnovel版。本家の`ctn`はpixi.jsの`Sprite`で、
//	位置・alpha・回転・拡縮を委譲プロパティ（x/y/alpha/rotation/scale_x/scale_y）として
//	持っていたが、bluesnovelではその役割を「箱」（components/Layer.tsx の div0 +
//	components/Lay.ts の styLay()）が既に担うため、ここに委譲プロパティは持たない。
//	残るのは`ctn`（中身を入れるための素のdiv。本家が`this.ctn.addChild(sprite)`していた
//	箇所は、プラグインが`this.ctn.appendChild(canvas等)`する形に置き換わる）と、
//	サブクラスがoverrideする共通API（lay/clearLay/record/playback/dump）だけ。
//	3D/Live2D等pixi.js前提のプラグイン（sn_galleryの3d_layer/cubism3_layer/emote_layer）は
//	`class Foo extends Layer`として継承し、`this.ctn`のpixi固有操作
//	（addChild等）をDOM操作へ書き換えることで移植する（todo.md「sn_galleryをbluesnovel駆動に
//	する」参照）

import type {TArg} from './Grammar';

export type T_RecordPlayBack_lay = {
	name	: string;
	idx		: number;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	[key: string]: any;
}

export class Layer {
				layname	= '';
	protected	name_	= '';
	set name(nm: string) {this.name_ = nm}
	get name() {return this.name_}

	readonly	ctn: HTMLDivElement = document.createElement('div');

	destroy() {this.ctn.remove()}

	// 戻り値は本家の isWait（trueなら[lay]でシナリオを止め、pia.resume()での再開を待つ）。
	//	bluesnovel側の実配線は未対応（PITFALLS/todo.md参照）で、現状は常にfalse扱いで進む
	lay(_hArg: TArg): boolean {return false}
	clearLay(_hArg: TArg): void { /* empty */ }
	record(): T_RecordPlayBack_lay {return {name: this.layname, idx: 0}}
	playback(_hLay: T_RecordPlayBack_lay, _aPrm: Promise<void>[]): void { /* empty */ }
	dump(): string {return ''}
}
