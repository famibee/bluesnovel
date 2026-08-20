/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2018-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

// 本家 skynovel_esm/src/sn/Layer.ts のスタブ。bluesnovel本体はレイヤー管理をReact/DOM側で
//	持つためこのクラスを一切使わない（hFactoryCls等の実際のレイヤー生成経路には未接続）。
//	3D/Live2D等pixi.js前提のプラグイン（sn_gallery の3d_layer/cubism3_layer/emote_layer）が
//	`class Foo extends Layer`と型的に継承できるようにするためだけに存在するスタブで、
//	tscのコンパイルを通す以上の意味はない（todo.md「sn_galleryをbluesnovel駆動にする」参照）。
//	ctn等はpixi.jsへ依存させないよう意図的にanyへ緩めている

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

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	readonly	ctn: any = {};

	destroy() { /* empty */ }

	lay(_hArg: TArg): boolean {return false}
	clearLay(_hArg: TArg): void { /* empty */ }
	record(): T_RecordPlayBack_lay {return {name: this.layname, idx: 0}}
	playback(_hLay: T_RecordPlayBack_lay, _aPrm: Promise<void>[]): void { /* empty */ }
	dump(): string {return ''}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	static setXY(_base: any, _hArg: TArg, _ret: any, _isGrp = false, _isButton = false): void { /* empty */ }
}
