/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2026-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

// E2E（Playwright）専用の起動エントリ。src/ 配下には一切手を入れず、
//	ここだけでテスト用のフック（window.__sn）を生やす。
//	vite dev が src/ をそのままトランスパイルして配信するため、
//	Main.tsx が動的 import する store と同一モジュール実体を掴める
//	（＝ここで公開した useStore で本番同様の状態がそのまま覗ける）。

import {SysWeb} from '../../../src/web';
import {useStore} from '../../../src/store/store';

// ?prj=basic / ?prj=button でシナリオ（プロジェクトフォルダ）を切り替える。
//	SysBase.loaded() が読むのは常に main（ScriptMng.load('main') 固定）なので、
//	シナリオごとにプロジェクトフォルダ自体を分ける方式にした。
const prj = new URLSearchParams(location.search).get('prj') ?? 'basic';
// ?prj=crypto だけ crypto:true で起動し、複号プラグイン（test/e2e/app/mkPrjCrypto.ts が
//	生成した使い捨ての鍵）を注入する。他のプロジェクトはcrypto:false固定のまま
const isCrypto = prj === 'crypto';

// freezeRaf()：**演出の「時間を進める機構」をテスト側から止めるため**で、止めてしまえば進度
//	（[trans rule=…]ならSVGフィルタの係数）をこちらで任意の値に置ける＝時間待ちに頼らず、
//	狙った進度ちょうどの絵を撮れる。GSAP時代は`gsap.globalTimeline.pause()`で「以後作られる分も
//	含めて全部凍結」できたが、motionにはその代替が無い。ここは`requestAnimationFrame`自体を
//	ブラウザAPIごと差し替える方式にした（`AudioContext.prototype.createGain`の計装と同じ発想。
//	src/側は一切変更しない）。**[trans rule=]／[quake]（Stage.tsxが素のrAFで回している）だけ**
//	止まる。[tsy]系・音声フェード（ScriptMng、motion＝src/ts/Tw.ts）はモジュール読み込み時に
//	`requestAnimationFrame`を捕まえて自走するため、この差し替えの影響を受けない（＝進行し続ける）。
//	差し替え時点で既に発行済みの実rAFは、`requestAnimationFrame`を差し替えても取り消せず1回分だけ
//	必ず走る（Stage.tsxのstep()がその中でsetTick(実経過時間)してから次のrAFを予約し直す＝
//	予約し直す時にはもう差し替え後なのでそこで止まる）。この1回分がPlaywright側の後続コード
//	（setTick()での上書き）と非同期に競合すると、まれに直前の実測tickで上書きされたまま返ってしまう
//	（trans.e2e.ts「境界はvague幅でぼける」がflakyだった原因）。なので**その1回分の実行を
//	ここで待ってから返す**：差し替え前の本物のrequestAnimationFrameで「番兵」を登録すれば、
//	同じフレームの中で先に登録済みのstep()より後に呼ばれる＝番兵が解決した時点でstep()の
//	上書きは確実に終わっている
function freezeRaf() {
	const raf = requestAnimationFrame;
	return new Promise<void>(resolve=> {
		globalThis.requestAnimationFrame = ()=> 0;
		raf(()=> resolve());
	});
}

// snd.e2e.ts用：AudioContext.createGain()の呼び出し回数を数える。SndBuf（src/ts/SndBuf.ts）は
//	生成のたびに必ず1回createGain()するので、「同じファイルの重複再生要求で頭から鳴り直して
//	いないか（＝新しいSndBufを作っていないか）」をブラウザの外から確認する手段になる。
//	src/側は一切変更せず、ブラウザAPIそのものを計装して覗く方式
let gainNodeCount = 0;
const origCreateGain = AudioContext.prototype.createGain;
AudioContext.prototype.createGain = function(this: AudioContext) {
	++gainNodeCount;
	return origCreateGain.call(this);
};

const hPlg = isCrypto ? {snsys_pre: await import('./snsys_pre')} : {};
const sys = new SysWeb(hPlg, {cur: `/test/e2e/app/prj_${prj}/`, crypto: isCrypto, dip: ''});

// isAutoPending: オート読み・既読スキップが次の停止点へ本当に落ち着いたか（waitIdle参照）。
//	scrMngはloaded()完了後にしか生えないので都度sys.scrMngを引き直す（キャッシュしない）
(globalThis as any).__sn = {store: useStore, freezeRaf, gainNodeCount: ()=> gainNodeCount,
	isAutoPending: ()=> sys.scrMng?.isAutoPending ?? false};
