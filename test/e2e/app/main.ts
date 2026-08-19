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
//	差し替えの前に既に発行済みの実rAFが1回分だけ走ってから止まる点も、既存の
//	`document.getAnimations().forEach(a=>a.pause())`方式（chstyle.e2e.ts）と同じ精度の話
function freezeRaf() {
	globalThis.requestAnimationFrame = ()=> 0;
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
