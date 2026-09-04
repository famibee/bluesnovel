/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2026-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

// 立ち絵シェーダエフェクト（[add_fx]/[clear_fx]。分家独自の試作。ANIMATION_RESEARCH.md §7）。
//	ここは純粋部分だけ：bldFx() の検査・既定値と、エンジンが出すアクション。
//	<img>→<canvas> 差し替えの seam・aFx の [clear_lay]／page=both 追随は test/e2e/fx.e2e.ts。
//	Filter.ts に対する test/ScriptEngine_filter.test.ts と同じ役割分担。

import {ScriptEngine, type T_ENGINE_ACTION} from '../src/ts/ScriptEngine';
import {bldFx} from '../src/ts/Fx';

import {expect, it} from 'bun:test';


const LAYS = '[add_lay layer=base class=grp][add_lay layer=mes class=txt]';
function acts(src: string): T_ENGINE_ACTION[] {return new ScriptEngine('t1', `${LAYS}${src}[s]`).step()}


// ============ Fx.ts（純粋部分） ============

it('bldFx_プリセットの既定値（既定は H_FX_DEF の1箇所）', ()=> {
	expect(bldFx({fx: 'wave'})).toEqual({
		name: '', fx: 'wave', time: 0, speed: 1, enabled: true, params: {amp: 6, freq: 2}});
	expect(bldFx({fx: 'rgbShift'})).toEqual({
		name: '', fx: 'rgbShift', time: 0, speed: 1, enabled: true, params: {shift: 4}});
	// 天候プリセット（背景向け）。snow: amp=落下速度 / freq=層数。
	//	rain: amp=落下速度（既定 2）/ freq=密度（弱雨 2〜豪雨 8+）/ shift=雨脚の長さ
	expect(bldFx({fx: 'snow'}).params).toEqual({amp: 1, freq: 3});
	expect(bldFx({fx: 'rain'}).params).toEqual({amp: 2, freq: 2, shift: 6});
	expect(bldFx({fx: 'rain', amp: '3', freq: '8'}).params).toEqual({amp: 3, freq: 8, shift: 6});
	// fireworks（冠菊花火。背景向け）: amp=明るさ / freq=頭の数 / p1=打ち上げ周期の速さ / p2=横位置（画面比率）
	expect(bldFx({fx: 'fireworks'}).params).toEqual({amp: 1, freq: 1, p1: 0.25, p2: 0});
	expect(bldFx({fx: 'fireworks', freq: '1.4', p2: '-0.3', color: '0x66ccff'}))
		.toMatchObject({fx: 'fireworks', params: {amp: 1, freq: 1.4, p1: 0.25, p2: -0.3}, color: [102 / 255, 204 / 255, 1]});
});

it('bldFx_fireworks は組み込みで loop=false の尺を持つ（[def_fx duration=] 不要）', ()=> {
	// 組み込み H_FX_BUILTIN_DURATION により hDefFx 無しでも単発が通る（約4秒周期）
	expect(bldFx({fx: 'fireworks', loop: 'false'}).time).toBe(4000);
	// time= 明示はそちらが勝つ（p1 で周期を変えたときの上書き）
	expect(bldFx({fx: 'fireworks', loop: 'false', p1: '0.5', time: '2000'}).time).toBe(2000);
	// loop 省略は従来どおり無限
	expect(bldFx({fx: 'fireworks'}).time).toBe(0);
});

it('bldFx_属性で既定を上書き（拾うのは A_FX_PARAM の範囲だけ）', ()=> {
	const f = bldFx({fx: 'wave', amp: '10', freq: '3', name: 'w', time: '1500', speed: '0.8'});
	expect(f).toMatchObject({name: 'w', fx: 'wave', time: 1500, speed: 0.8});
	expect(f.params).toEqual({amp: 10, freq: 3});
	// A_FX_PARAM（amp/freq/shift）はプリセット横断の白名簿。wave が読まない shift も
	//	書けば記録はされる（シェーダ側が対応 uniform を持たないので無害＝[add_filter] が
	//	未知属性を黙殺するのと同じ緩さ）
	expect(bldFx({fx: 'wave', shift: '9'}).params).toEqual({amp: 6, freq: 2, shift: 9});
	// 属性を書かなければ増えない
	expect(bldFx({fx: 'wave'}).params).toEqual({amp: 6, freq: 2});
});

it('bldFx_fx= が無ければ throw（生 glsl= は [add_fx] では受けない＝[def_fx] へ分離）', ()=> {
	expect(()=> bldFx({})).toThrow('fx=（プリセット名）が必要です');
	expect(()=> bldFx({glsl: 'void main(){}'})).toThrow('fx=（プリセット名）が必要です');
});

it('bldFx_未知のプリセット名は throw（組み込み一覧つき）', ()=> {
	expect(()=> bldFx({fx: 'glitch'})).toThrow('fx【glitch】は未対応です');
});

it('bldFx_[def_fx] で定義済みの名前は受ける（hDefFx を渡す）', ()=> {
	expect(()=> bldFx({fx: 'mySnow'})).toThrow('fx【mySnow】は未対応です');	// 台帳なし
	const f = bldFx({fx: 'mySnow', amp: '3'}, {mySnow: 0});
	expect(f).toEqual({name: '', fx: 'mySnow', time: 0, speed: 1, enabled: true, params: {amp: 3}});
	// ユーザープリセットは固有既定値を持たない（H_FX_DEF に無い）＝属性で渡した分だけ
	expect(bldFx({fx: 'mySnow'}, {mySnow: 0}).params).toEqual({});
});

it('bldFx_数値でないパラメータは throw', ()=> {
	expect(()=> bldFx({fx: 'wave', amp: 'もじ'})).toThrow('[add_fx] amp の値が不正です：もじ');
});

it('bldFx_汎用スカラポート p1〜p4（[def_fx] 作者向け。組み込みは使わない）', ()=> {
	const f = bldFx({fx: 'u', p1: '0.5', p2: '-3', p4: '10'}, {u: 0});
	expect(f.params).toEqual({p1: 0.5, p2: -3, p4: 10});	// p3 は書いてないので入らない
	expect(()=> bldFx({fx: 'u', p1: 'x'}, {u: 0})).toThrow('[add_fx] p1 の値が不正です：x');
});

it('bldFx_color= を uniform vec3 color（0..1 RGB）へ', ()=> {
	expect(bldFx({fx: 'u', color: '0xff8000'}, {u: 0}).color)
		.toEqual([1, 128 / 255, 0]);
	expect(bldFx({fx: 'u', color: '#00ff00'}, {u: 0}).color).toEqual([0, 1, 0]);
	expect(bldFx({fx: 'u', color: '0.1, 0.2, 0.3'}, {u: 0}).color).toEqual([0.1, 0.2, 0.3]);
	expect(bldFx({fx: 'u'}, {u: 0}).color).toBeUndefined();	// 未指定は持たない
	expect(()=> bldFx({fx: 'u', color: 'red'}, {u: 0})).toThrow('[add_fx] color= の値が不正です：red');
	expect(()=> bldFx({fx: 'u', color: '1,2'}, {u: 0})).toThrow('[add_fx] color= の値が不正です：1,2');
});

// ---- loop=false（単発再生。[def_fx duration=] が time= として解決される。2026-09-02） ----

it('bldFx_loop=false は [def_fx duration=] を time= として解決する', ()=> {
	const f = bldFx({fx: 'hanabi', loop: 'false'}, {hanabi: 3000});
	expect(f).toMatchObject({fx: 'hanabi', time: 3000});
});

it('bldFx_loop=false でも time= の明示指定が勝つ（個別上書き）', ()=> {
	const f = bldFx({fx: 'hanabi', loop: 'false', time: '1200'}, {hanabi: 3000});
	expect(f.time).toBe(1200);
});

it('bldFx_loop=false かつ duration 未宣言（尺を持たない組み込み含む）は time= 無しだと throw', ()=> {
	expect(()=> bldFx({fx: 'hanabi', loop: 'false'}, {hanabi: 0}))
		.toThrow('[add_fx] loop=false を使うには [def_fx name=hanabi duration=…]（ms）の宣言が必要です');
	// wave/rgbShift/snow/rain は H_FX_BUILTIN_DURATION に無い＝尺を持たない
	expect(()=> bldFx({fx: 'wave', loop: 'false'})).toThrow('loop=false を使うには');
	// time= を伴えば duration 未宣言でも通る（time= は個別上書きなので）
	expect(bldFx({fx: 'wave', loop: 'false', time: '800'}).time).toBe(800);
});

it('bldFx_loop 省略／true は従来どおり time=0（無限）', ()=> {
	expect(bldFx({fx: 'hanabi'}, {hanabi: 3000}).time).toBe(0);
	expect(bldFx({fx: 'hanabi', loop: 'true'}, {hanabi: 3000}).time).toBe(0);
});


// ---- blur（初のランプ型プリセット。progress 0→1・keep 既定 true・reverse=） ----

it('bldFx_blur の既定（amp=8／組み込みで loop=false の尺 800／keep 既定 true）', ()=> {
	expect(bldFx({fx: 'blur'})).toEqual({
		name: '', fx: 'blur', time: 0, speed: 1, enabled: true, params: {amp: 8}, keep: true,
	});
	// loop=false は H_FX_BUILTIN_DURATION.blur を time= として解決
	expect(bldFx({fx: 'blur', loop: 'false'})).toMatchObject({time: 800, keep: true});
	// time= 明示が勝つ／amp= 上書き
	expect(bldFx({fx: 'blur', loop: 'false', time: '1500', amp: '14'}))
		.toMatchObject({time: 1500, params: {amp: 14}});
});

it('bldFx_keep=false 明示は組み込み既定（blur=true）に勝つ', ()=> {
	expect(bldFx({fx: 'blur', keep: 'false'}).keep).toBeUndefined();	// 真のときだけキーを持つ
	// keep= を持たない従来プリセットは既定どおりキー無し
	expect(bldFx({fx: 'wave'}).keep).toBeUndefined();
	expect(bldFx({fx: 'fireworks', loop: 'false'}).keep).toBeUndefined();	// 既存挙動の非回帰
});

it('bldFx_reverse=true（未指定はキーを持たない）', ()=> {
	expect(bldFx({fx: 'blur', reverse: 'true'}).reverse).toBe(true);
	expect(bldFx({fx: 'blur'}).reverse).toBeUndefined();
	expect(bldFx({fx: 'wave', reverse: 'true'}).reverse).toBe(true);	// 汎用（[def_fx] 作者向け）
});

it('bldFx_[def_fx keep=true] はユーザープリセットの keep 既定になる', ()=> {
	expect(bldFx({fx: 'myRamp'}, {myRamp: {duration: 600, keep: true}}))
		.toMatchObject({fx: 'myRamp', keep: true});
	expect(bldFx({fx: 'myRamp', keep: 'false'}, {myRamp: {duration: 600, keep: true}}).keep)
		.toBeUndefined();	// 個別 [add_fx keep=false] が勝つ
	expect(bldFx({fx: 'myRamp'}, {myRamp: {duration: 600}}).keep).toBeUndefined();	// 宣言なし＝false
});

it('bldFx_done は bldFx が絶対に付けない（[load] 復元専用。ScriptMng.#markFxDone が焼く）', ()=> {
	expect(bldFx({fx: 'blur', loop: 'false'}).done).toBeUndefined();
	expect(bldFx({fx: 'blur', done: 'true'}).done).toBeUndefined();	// done= 属性は無視
});

it('bldFx_grayscale / sepia も blur と同じランプ型（amp=1／尺 800／keep 既定 true）', ()=> {
	for (const fx of ['grayscale', 'sepia'] as const) {
		expect(bldFx({fx})).toEqual({
			name: '', fx, time: 0, speed: 1, enabled: true, params: {amp: 1}, keep: true,
		});
		expect(bldFx({fx, loop: 'false'})).toMatchObject({time: 800, keep: true});
		expect(bldFx({fx, loop: 'false', reverse: 'true', amp: '0.7'}))
			.toMatchObject({time: 800, reverse: true, params: {amp: 0.7}});
		expect(bldFx({fx, keep: 'false'}).keep).toBeUndefined();
	}
});


// ============ [def_fx]（ユーザープリセットGLSLの事前定義。[add_face] と同じ思想） ============

const RAW = 'void main(){gl_FragColor=texture2D(uSampler,vTextureCoord);}';

it('defFx_pushes（storeは触らず本体をレジストリへ流すアクション）', ()=> {
	expect(acts(`[def_fx name=mySnow glsl="${RAW}"]`).find(v=> v.t === 'defFx'))
		.toEqual({t: 'defFx', name: 'mySnow', glsl: RAW});
});

it('defFx_name / glsl は必須', ()=> {
	expect(()=> acts(`[def_fx glsl="${RAW}"]`)).toThrow('[def_fx] nameは必須です');
	expect(()=> acts('[def_fx name=x]')).toThrow('[def_fx] glsl=（フラグメントシェーダ）は必須です');
});

it('defFx_組み込みプリセット名・既定義名はエラー', ()=> {
	expect(()=> acts(`[def_fx name=wave glsl="${RAW}"]`)).toThrow('name【wave】は組み込みプリセット名');
	expect(()=> acts(`[def_fx name=a glsl="${RAW}"][def_fx name=a glsl="${RAW}"]`))
		.toThrow('name【a】は既に定義済みです');
});

it('defFx_定義後は [add_fx fx=その名前] が通る', ()=> {
	const a = acts(`[def_fx name=mySnow glsl="${RAW}"][add_fx layer=base fx=mySnow amp=2]`);
	expect(a.find(v=> v.t === 'addFx')).toEqual({t: 'addFx', aLayNm: ['base'], page: 'fore',
		fx: {name: '', fx: 'mySnow', time: 0, speed: 1, enabled: true, params: {amp: 2}}});
	// 未定義の名前はこれまで通りエラー
	expect(()=> acts('[add_fx layer=base fx=noDef]')).toThrow('fx【noDef】は未対応です');
});

it('defFx_duration=（loop=false 用の尺）を宣言でき、[add_fx loop=false] が time= へ解決する', ()=> {
	const a = acts(`[def_fx name=hanabi glsl="${RAW}" duration=3000][add_fx layer=base fx=hanabi loop=false]`);
	expect(a.find(v=> v.t === 'addFx')).toMatchObject({fx: {fx: 'hanabi', time: 3000}});
});

it('defFx_duration= は0以上（負数は throw）', ()=> {
	expect(()=> acts(`[def_fx name=x glsl="${RAW}" duration=-1]`)).toThrow('durationは0以上にしてください');
});

it('defFx_duration=未指定（既定0）でも既定義判定は効く（0はtruthyでないがキーはある）', ()=> {
	// duration未宣言＝#hDefFxの値が0でも、2回目のdef_fxはキーの有無（in）で弾かれることの回帰確認
	expect(()=> acts(`[def_fx name=a glsl="${RAW}"][def_fx name=a glsl="${RAW}" duration=1000]`))
		.toThrow('name【a】は既に定義済みです');
});

it('defFx_pad=／pad_b=（基本画像高さ比の余白）を宣言でき、[add_fx] が T_FX へ乗せる', ()=> {
	// pad=（上左右）／pad_b=（下端）。宣言ぶんが [add_fx] 時に T_FX.pad／padB へ解決される
	const a = acts(`[def_fx name=aura glsl="${RAW}" pad=0.28 pad_b=0.1][add_fx layer=base fx=aura amp=2]`);
	expect(a.find(v=> v.t === 'addFx')).toMatchObject({fx: {fx: 'aura', pad: 0.28, padB: 0.1, params: {amp: 2}}});
	// pad_b 省略は下端 0（＝T_FX に padB を持たせない。立ち絵は grp 下端接地で足元が画面外）
	const b = acts(`[def_fx name=aura2 glsl="${RAW}" pad=0.2][add_fx layer=base fx=aura2]`);
	const fb = b.find(v=> v.t === 'addFx');
	expect(fb).toMatchObject({fx: {fx: 'aura2', pad: 0.2}});
	expect((fb as {fx: {padB?: number}}).fx.padB).toBeUndefined();
	// pad 未宣言は従来どおり pad/padB を持たない（既存 fx の T_FX 形を変えない）
	expect(bldFx({fx: 'nopad'}, {nopad: {}})).not.toHaveProperty('pad');
});

it('defFx_pad=／pad_b= は0以上（負数は throw）', ()=> {
	expect(()=> acts(`[def_fx name=x glsl="${RAW}" pad=-0.1]`)).toThrow('padは0以上にしてください');
	expect(()=> acts(`[def_fx name=x glsl="${RAW}" pad_b=-1]`)).toThrow('pad_bは0以上にしてください');
});


// ============ [add_fx] ============

it('addFx_pushes（[add_filter] と同じ #argLayNames / #argPageBoth）', ()=> {
	expect(acts('[add_fx layer=base fx=wave amp=10 freq=3]').find(v=> v.t === 'addFx'))
		.toEqual({t: 'addFx', aLayNm: ['base'], page: 'fore',
			fx: {name: '', fx: 'wave', time: 0, speed: 1, enabled: true, params: {amp: 10, freq: 3}}});
});

it('addFx_layer省略は全レイヤ・page=bothで両面', ()=> {
	expect(acts('[add_fx page=both fx=rgbShift]').find(v=> v.t === 'addFx'))
		.toMatchObject({aLayNm: null, page: 'both'});
});

it('addFx_不正な page は throw', ()=> {
	expect(()=> acts('[add_fx layer=base fx=wave page=all]'))
		.toThrow('[add_fx] 属性 page【all】が不正です');
});

it('addFx_自体は待たない（[tsy] と同じく skip を返す）', ()=> {
	// step() が [s] まで一気に到達している＝[add_fx] で止まっていない
	expect(acts('[add_fx layer=base fx=wave]').some(v=> v.t === 'addFx')).toBe(true);
});

// ============ [clear_fx] ============

it('clearFx_name はカンマ区切りで複数可（省略はそのレイヤの fx 全部＝null）', ()=> {
	expect(acts('[clear_fx layer=base name=a,b]').find(v=> v.t === 'clearFx'))
		.toEqual({t: 'clearFx', aLayNm: ['base'], page: 'fore', names: ['a', 'b']});
	expect(acts('[clear_fx layer=base]').find(v=> v.t === 'clearFx'))
		.toEqual({t: 'clearFx', aLayNm: ['base'], page: 'fore', names: null});
});

it('fxTags_はマクロ名に使えない', ()=> {
	expect(()=> acts('[macro name=add_fx]'))
		.toThrow('[add_fx]はタグ名のため、マクロ名として使用できません');
	expect(()=> acts('[macro name=def_fx]'))
		.toThrow('[def_fx]はタグ名のため、マクロ名として使用できません');
	expect(()=> acts('[macro name=wait_fx]'))
		.toThrow('[wait_fx]はタグ名のため、マクロ名として使用できません');
});


// ============ [wait_fx]（実際に待つのは ScriptMng。ここはアクションの形だけ） ============

it('waitFx_layer= / name= を受ける（[wait_tsy] と同形。page= は受けない）', ()=> {
	// name= はカンマ区切り複数可（#argLayNames 流用）。canskip 既定 true
	expect(acts('[wait_fx layer=base]').at(-1))
		.toEqual({t: 'waitFx', aLayNm: ['base'], names: null, canskip: true});
	expect(acts('[wait_fx name=a,b]').at(-1))
		.toEqual({t: 'waitFx', aLayNm: null, names: ['a', 'b'], canskip: true});
	expect(acts('[wait_fx layer=base name=g canskip=false]').at(-1))
		.toEqual({t: 'waitFx', aLayNm: ['base'], names: ['g'], canskip: false});
});

it('waitFx_layer= も name= も無ければ throw（最低一方必須）', ()=> {
	expect(()=> acts('[wait_fx]')).toThrow('[wait_fx] layer= か name= のどちらかが必要です');
});

it('waitFx_自体で step() が止まる（[s] まで進まない＝stop を返す）', ()=> {
	const a = acts('[add_fx layer=base fx=wave time=500][wait_fx layer=base]');
	expect(a.at(-1)!.t).toBe('waitFx');	// [s] の stop アクションはここには来ない
	expect(a.some(v=> v.t === 'addFx')).toBe(true);
});


// ============ [pause_fx]/[resume_fx]（[pause_tsy]/[resume_tsy] と同型） ============

it('pauseFx/resumeFx_enabled を差し替えるアクション（page= は受けない）', ()=> {
	expect(acts('[pause_fx layer=base]').find(v=> v.t === 'enableFx'))
		.toEqual({t: 'enableFx', aLayNm: ['base'], names: null, index: null, enabled: false});
	expect(acts('[resume_fx name=w]').find(v=> v.t === 'enableFx'))
		.toEqual({t: 'enableFx', aLayNm: null, names: ['w'], index: null, enabled: true});
	expect(acts('[pause_fx layer=base index=1]').find(v=> v.t === 'enableFx'))
		.toEqual({t: 'enableFx', aLayNm: ['base'], names: null, index: 1, enabled: false});
});

it('pauseFx_layer= も name= も無ければ throw', ()=> {
	expect(()=> acts('[pause_fx]')).toThrow('[pause_fx] layer= か name= のどちらかが必要です');
	expect(()=> acts('[resume_fx]')).toThrow('[resume_fx] layer= か name= のどちらかが必要です');
});

it('pauseFx_index= は layer= 併用が要る', ()=> {
	expect(()=> acts('[pause_fx name=w index=0]')).toThrow('[pause_fx] index= は layer= と併用してください');
});

it('pauseFx_自体は待たない（skip＝[s] まで到達）', ()=> {
	expect(acts('[pause_fx layer=base]').at(-1)!.t).toBe('stop');
});
