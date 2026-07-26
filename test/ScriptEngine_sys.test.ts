/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2026-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

// しおり・システム系タグのうち、エンジンが担当する部分。
//	[title]・[toggle_full_screen]・[dump_lay]・[pop_stack]・
//	[navigate_to]・[loadplugin]・[snapshot]と、アプリ版のタグ（[close]/[update_check]/[window]）。
//	本家：SysBase.ts:448 title / :462 #tglFlscr()、LayerMng.ts:1068 #dump_lay()、
//	ScriptIterator.ts:984 #pop_stack()、SysWeb.ts:239 navigate_to、
//	LayerMng.ts:416 #loadplugin() / :338 #snapshot()

import {ScriptEngine, type T_ENGINE_ACTION} from '../src/ts/ScriptEngine';

import {expect, it} from 'bun:test';


const LAYS = '[add_lay layer=base class=grp][add_lay layer=mes class=txt]';
function acts(src: string): T_ENGINE_ACTION[] {return new ScriptEngine('t1', src).step()}


// ============ [title] ============

it('title_pushesAction', ()=> {
	expect(acts('[title text=ゲーム名][s]').find(v=> v.t === 'title'))
		.toEqual({t: 'title', text: 'ゲーム名'});
});

it('title_textRequired', ()=> {
	expect(()=> acts('[title][s]')).toThrow('[title] textは必須です');
});

it('title_expression', ()=> {
	// 本家サンプル setting.sn:50 の形：[title text=#&…+' 体験版'# cond=…]
	expect(acts(`[let name=nm text=ゲーム cast=str][title text="&nm +'体験版'"][s]`).find(v=> v.t === 'title'))
		.toEqual({t: 'title', text: 'ゲーム体験版'});
});


// ============ [toggle_full_screen] ============

it('toggleFullScr_noKey', ()=> {
	// key省略時はその場で切り替える
	expect(acts('[toggle_full_screen][s]').find(v=> v.t === 'toggleFullScr'))
		.toEqual({t: 'toggleFullScr'});
});

it('toggleFullScr_key', ()=> {
	// key指定時は「そのキーで切り替えられるようにする」常駐予約。キー名は小文字化（本家と同じ）
	expect(acts('[toggle_full_screen key=W][s]').find(v=> v.t === 'fullScrKey'))
		.toEqual({t: 'fullScrKey', key: 'w'});
});

it('displayState_isBuiltin', ()=> {
	// 全画面かどうかの組み込み変数。**エンジンは自分では倒さない**（Escでの解除もあるので、
	//	実状態はDOM側からsetFullScr()で教えてもらう）
	const se = new ScriptEngine('t1', '[toggle_full_screen][s]');
	se.step();
	expect(se.getVal('const.sn.displayState')).toBe(false);	// [toggle_full_screen]では変わらない

	se.setFullScr(true);
	expect(se.getVal('const.sn.displayState')).toBe(true);
});

it('displayState_readOnly', ()=> {
	expect(()=> acts('[let name=const.sn.displayState text=true][s]')).toThrow();
});


// ============ [dump_lay] ============

it('dumpLay_allLayers', ()=> {
	expect(acts(`${LAYS}[dump_lay][s]`).find(v=> v.t === 'dumpLay'))
		.toEqual({t: 'dumpLay', aLayNm: null});	// layer省略は全レイヤ
});

it('dumpLay_someLayers', ()=> {
	expect(acts(`${LAYS}[dump_lay layer='base, mes'][s]`).find(v=> v.t === 'dumpLay'))
		.toEqual({t: 'dumpLay', aLayNm: ['base', 'mes']});
});


// ============ [pop_stack] ============

it('popStack_popsOne', ()=> {
	// [call]で積んだ枠を[return]せずに捨てる。捨てた後は現在位置のまま進む
	const se = new ScriptEngine('t1', `[call label=*sub]もどった[s]
*sub
[pop_stack]ぬけた[s]`);
	const a = se.step();
	expect(a.some(v=> v.t === 'chgStr' && v.str === 'ぬけた')).toBe(true);
	expect(a.some(v=> v.t === 'chgStr' && v.str === 'もどった')).toBe(false);
});

it('popStack_returnAfterPopThrows', ()=> {
	// 枠を捨てたので[return]する相手がいない
	expect(()=> acts(`[call label=*sub]A[s]
*sub
[pop_stack][return]`)).toThrow('[return] 呼び出し元がありません');
});

it('popStack_emptyThrows', ()=> {
	expect(()=> acts('[pop_stack][s]')).toThrow('[pop_stack] スタックが空です');
});

it('popStack_clearEmptiesAll', ()=> {
	// clear=trueは全部捨てる。空でも例外にならない（本家も clear 時は pop しない）
	expect(()=> acts('[pop_stack clear=true][s]')).not.toThrow();
});

it('popStack_clearFromNested', ()=> {
	const se = new ScriptEngine('t1', `[call label=*a]だめ1[s]
*a
[call label=*b]だめ2[s]
*b
[pop_stack clear=true]ぬけた[s]`);
	const a = se.step();
	expect(a.some(v=> v.t === 'chgStr' && v.str === 'ぬけた')).toBe(true);
	expect(a.filter(v=> v.t === 'chgStr').map(v=> v.str)).not.toContain('だめ1');
});

it('popStack_clearsMp', ()=> {
	// 本家同様、マクロ引数（mp:）を捨てる（[return]と違い、呼び出し前の値へ戻すのではなく空にする）
	const se = new ScriptEngine('t1', `[macro name=mac][pop_stack]ぬけた[s][endmacro]
[mac arg=1]`);
	se.step();
	expect(se.getVal('mp:arg')).toBeUndefined();
});

it('popStack_resetsIfStackToWall', ()=> {
	// ifスタックは「壁」(-1)だけに戻る＝途中の[if]は無かったことになる。
	//	なので[pop_stack]の後に残った[endif]へ辿り着くとエラーになる。
	//	これは本家と同じ挙動（本家 #endif() も t === -1 なら 'ifブロック内ではありません' を投げる）
	expect(()=> acts(`[call label=*sub]
*sub
[if exp=true][pop_stack][endif]ぬけた[s]`)).toThrow('[elsif]/[else]/[endif]');
});


// ============ [navigate_to] ============
//	本家 SysWeb.ts:239 navigate_to。実際にタブを開くのはScriptMngの担当で、
//	エンジンはURLをアクションに載せるだけ

it('navigateTo_pushesAction', ()=> {
	expect(acts('[navigate_to url=https://example.com/][s]').find(v=> v.t === 'navigateTo'))
		.toEqual({t: 'navigateTo', url: 'https://example.com/'});
});

it('navigateTo_urlRequired', ()=> {
	expect(()=> acts('[navigate_to][s]')).toThrow('[navigate_to] urlは必須です');
});

it('navigateTo_doesNotStop', ()=> {
	// 停止点ではない＝同じstep()の中で[s]まで進む
	expect(acts('[navigate_to url=https://example.com/][s]').at(-1)?.t).toBe('stop');
});


// ============ [loadplugin] ============
//	本家 LayerMng.ts:416 #loadplugin()。読めるのはcssだけ

it('loadplugin_pushesAction', ()=> {
	expect(acts('[loadplugin fn=plugin/style.css][s]').find(v=> v.t === 'loadPlugin'))
		.toEqual({t: 'loadPlugin', fn: 'plugin/style.css', join: true});
});

it('loadplugin_fnRequired', ()=> {
	expect(()=> acts('[loadplugin][s]')).toThrow('[loadplugin] fnは必須です');
});

it('loadplugin_onlyCss', ()=> {
	// 本家も拡張子で弾く（JSのプラグインはビルド時に取り込まれるので実行時には読まない）
	expect(()=> acts('[loadplugin fn=plugin/humane.js][s]'))
		.toThrow('[loadplugin] サポートされない拡張子です');
});

it('loadplugin_joinStopsUntilLoaded', ()=> {
	// join=true（既定）は読み込み完了まで待つ＝ここでstep()が返る（[s]までは進まない）
	const a = acts('[loadplugin fn=a.css][s]');
	expect(a.at(-1)).toEqual({t: 'loadPlugin', fn: 'a.css', join: true});
	expect(a.some(v=> v.t === 'stop')).toBe(false);
});

it('loadplugin_joinFalseContinues', ()=> {
	// join=falseは投げっぱなし＝そのまま[s]まで進む
	const a = acts('[loadplugin fn=a.css join=false][s]');
	expect(a.find(v=> v.t === 'loadPlugin')).toEqual({t: 'loadPlugin', fn: 'a.css', join: false});
	expect(a.at(-1)?.t).toBe('stop');
});


// ============ [snapshot] ============
//	本家 LayerMng.ts:338 #snapshot()。画像化そのものはScriptMng（Snapshot.ts）の担当

it('snapshot_defaults', ()=> {
	const a = acts('[snapshot][s]');
	expect(a.at(-1)).toEqual({
		t: 'snapshot', fn: '', aLayNm: null, page: 'fore', width: 0, height: 0, smoothing: false,
	});	// width/heightの0は「ステージ実寸」の意
	expect(a.some(v=> v.t === 'stop')).toBe(false);	// 撮り終わるまで待つ＝停止する
});

it('snapshot_args', ()=> {
	expect(acts(`${LAYS}[snapshot fn=shot layer=base,mes page=back width=640 height=480 smoothing=true b_color=0xFF000000][s]`)
		.find(v=> v.t === 'snapshot'))
		.toEqual({
			t: 'snapshot', fn: 'shot', aLayNm: ['base', 'mes'], page: 'back',
			width: 640, height: 480, smoothing: true, b_color: 0xFF000000,
		});
});

it('snapshot_b_colorは0xAARRGGBB', ()=> {
	// **[lay b_color=]の0xRRGGBBとは違う**（tag.html#snapshot「透過2桁＋赤2桁＋緑2桁＋青2桁」）。
	//	エンジンは数値のまま運び、CSSの色文字列にするのはScriptMng（rgbaOf）
	const b = (src: string)=> acts(`[snapshot ${src}][s]`).find(v=> v.t === 'snapshot')?.b_color;
	expect(b('b_color=0x0')).toBe(0);				// 完全透過
	expect(b('b_color=0xFF000000')).toBe(0xFF000000);	// 不透明な黒
	expect(b('')).toBeUndefined();					// 未指定はステージと同じ背景色
});


// ============ [dump_val] / [dump_stack] ============
//	本家 Variable.ts:623 #dump_val() / ScriptIterator.ts:739 #dump_stack()。
//	本家はconsoleへ出すが、こちらは[dump_lay]と同じくデバッグ表示（myTrace）へ流す

it('dumpVal_listsStoredVarsByNamespace', ()=> {
	const a = acts('[let name=game:hp text=80][let name=sys:v text=1][dump_val][s]');
	const t = a.find(v=> v.t === 'trace');
	expect(t?.text).toStartWith('[dump_val] ');
	const o = JSON.parse(t!.text.slice('[dump_val] '.length)) as {[ns: string]: {[k: string]: unknown}};
	expect(o.game?.hp).toBe('80');
	expect(o.sys?.v).toBe('1');
	// 組み込み変数（遅延評価）は本家同様含めない
	expect(o.tmp?.['const.sn.scriptFn']).toBeUndefined();
});

it('dumpStack_showsPositionAndStacks', ()=> {
	const se = new ScriptEngine('t1', `[call label=*sub]おわり[s]
*sub
	[dump_stack]
[return]`);
	const t = se.step().find(v=> v.t === 'trace');
	const o = JSON.parse(t!.text.slice('[dump_stack] '.length)) as {
		now: {fn: string}; aCallStk: {fn: string}[]; aIfStk: number[]};
	expect(o.now.fn).toBe('t1');
	expect(o.aCallStk).toHaveLength(1);	// [call]で1段積まれている
	expect(o.aIfStk).toEqual([-1]);		// [call]が積む「壁」
});


// ============ [clear_text] ============
//	本家 LayerMng.ts:993 #clear_text()。[er]が表裏どちらも消すのに対し、こちらは片面だけ

it('clearText_clearsOnePageOfCurrentLayer', ()=> {
	const a = acts('あいう[clear_text][s]');
	expect(a.filter(v=> v.t === 'chgStr').at(-1))
		.toEqual({t: 'chgStr', nm: 'mes', page: 'fore', str: ''});
});

it('clearText_layerAndPage', ()=> {
	const a = acts(`${LAYS}[clear_text layer=mes page=back][s]`);
	expect(a.find(v=> v.t === 'chgStr'))
		.toEqual({t: 'chgStr', nm: 'mes', page: 'back', str: ''});
});

it('clearText_resetsAccumulatedText', ()=> {
	// 消した後に書いた文字は「続き」ではなく最初から積み直しになる
	const a = acts('あいう[clear_text]かき[s]');
	expect(a.filter(v=> v.t === 'chgStr').at(-1)?.str).toBe('かき');
});


// ============ 組み込み変数（雑多） ============

it('builtin_mathPiAndStackLengths', ()=> {
	const se = new ScriptEngine('t1', '[s]');
	expect(se.getVal('const.sn.Math.PI')).toBe(Math.PI);
	expect(se.getVal('const.sn.aIfStk.length')).toBe(0);
	expect(se.getVal('const.sn.vctCallStk.length')).toBe(0);

	const se2 = new ScriptEngine('t2', `[call label=*sub]
*sub
	[if exp=true][s][endif]`);
	se2.step();
	expect(se2.getVal('const.sn.vctCallStk.length')).toBe(1);
	expect(Number(se2.getVal('const.sn.aIfStk.length'))).toBeGreaterThan(1);	// 壁(-1)＋[if]
});

it('builtin_mesLayerFollowsCurrent', ()=> {
	// [current]はsave:へも書く（本家 LayerMng.ts:958）。しおりに含まれるので[load]で戻る
	const se = new ScriptEngine('t1', `${LAYS}[add_lay layer=sub class=txt][current layer=sub][s]`);
	se.step();
	expect(se.getVal('save:const.sn.mesLayer')).toBe('sub');
});

it('builtin_lastPageText', ()=> {
	// 文字装飾がまだ無いので last_page_plain_text と同じ値
	const se = new ScriptEngine('t1', 'あいう[s]');
	se.step();
	expect(se.getVal('const.sn.last_page_text')).toBe('あいう');
});


// ============ アプリ（Electron）版のタグ ============
//	本家 SysApp.ts:234 close / :306 update_check / :440 window。
//	**ブラウザ版では何もしない**（本家も SysBase 側の既定が no-op）ので、
//	エンジンが受け持つのは属性の検査と sys: への焼き付けまで

it('close_pushesAction', ()=> {
	expect(acts('[close][s]').find(v=> v.t === 'close')).toEqual({t: 'close'});
});

it('updateCheck_urlは必須で末尾は/', ()=> {
	expect(acts(`[update_check url='https://example.com/x/'][s]`).find(v=> v.t === 'updateCheck'))
		.toEqual({t: 'updateCheck', url: 'https://example.com/x/'});
	expect(()=> acts('[update_check][s]')).toThrow('[update_check] urlは必須です');
	expect(()=> acts(`[update_check url='https://example.com/x'][s]`))
		.toThrow('[update_check] urlの末尾は/にして下さい');
});

it('window_属性をsys:へ焼き付ける', ()=> {
	const se = new ScriptEngine('t1', '[window x=10 y=20 width=640 height=480 centering=true][s]');
	const a = se.step();
	expect(a.find(v=> v.t === 'window'))
		.toEqual({t: 'window', centering: true, x: 10, y: 20, w: 640, h: 480});
	// 設定として残る（次の起動でも同じ位置・大きさ）
	expect(se.getVal('sys:const.sn.nativeWindow.x')).toBe(10);
	expect(se.getVal('sys:const.sn.nativeWindow.w')).toBe(640);
});

it('window_寸法はwidth/heightでもw/hでも受ける', ()=> {
	// **本家はタグリファレンスがwidth/height、実装（SysApp.ts:443）が読むのはw/h**という
	//	食い違いがあり、テンプレ（tmp_blues main.sn:86）はwidth/heightで書いている
	expect(acts('[window w=800 h=600][s]').find(v=> v.t === 'window'))
		.toMatchObject({w: 800, h: 600});
});

it('window_省略時は現在値', ()=> {
	const se = new ScriptEngine('t1', '[window x=10 y=20 width=640 height=480][window x=99][s]');
	const a = se.step().filter(v=> v.t === 'window');
	expect(a.at(-1)).toEqual({t: 'window', centering: false, x: 99, y: 20, w: 640, h: 480});
});
