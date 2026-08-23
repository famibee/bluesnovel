/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2026-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

// GSAPの薄い代替（本家 CmnTween.ts:29-134 の Tw クラスを移植）。motionの import はこのファイルに
//	閉じ込める。GSAPのstandard licenseが非OSIで、本パッケージはMIT公開かつ`src/build.ts`が依存を
//	丸ごとdist/へバンドルするため不採用とし、MITのmotionへ移行した（本家と同じ理由・同じ結論。
//	2026-08-19 skynovel_esm commit d36e52c）。
//	bluesnovelでの用途は[tsy]/[tsy_frame]（ストアのレイヤ属性・FrameMngの見た目）と音声フェード
//	（GainNode.gain）で、本家と違い**最終値の畳み込み（本家のend()）は呼び出し側（ScriptMng）が
//	自前で持っている**ため、ここには持たせない（kill()＝黙った停止だけで足りる）
//
//	motion移行にあたっての要点（本家が踏んだ罠。ここでも同じ対策が要る）：
//	- motionにカスタムdriverや外部update(time)駆動は無いため、内部rAFに任せる
//	  （＝単一rAFループでの一括管理はできず、各アニメが自走する）
//	- motionの`ctrl.stop()`は同期的には止まらない（stop後もしばらくtargetへの書き込みが裏で
//	  続く）。targetへ直接animateさせず、ダミーのproxyを動かしてonUpdate側で`#finished`を見て
//	  「以後targetへ触らせない」を保証する
//	- motionの`onComplete`は、proxyが正確に最終値へ到達したonUpdateの後に来るとは限らない
//	  （丸め誤差や順序のズレ）ため、`#finished`を立てる前に目標値そのものをtargetへ代入して確定させる
//	- **motionはOSの「モーションを減らす」(prefers-reduced-motion)設定を、left/top/width/height/
//	  transform系（`positionalKeys`）の属性だけ勝手に汲み取り、その属性を動かす区間だけ
//	  瞬時完了（calculatedDuration=0）にする**（motion-dom animateTarget()。対象がDOM要素か
//	  どうかは関係なく、キー名だけで判定される）。alpha等の非positional属性はこの対象外なので
//	  影響を受けない。ここが揃わないと「同じ[fg2]呼び出し内でaphaは滑らかに動くのにxだけ瞬時移動
//	  する」という症状になる（実機ログで確認・2026-08-24）。[tsy]はUIの付随演出ではなく作者が
//	  明示的に指定する演出そのものなので、OSのアクセシビリティ設定を暗黙に継承すべきではない
//	  （継承したいなら別途 sn.* 側で明示のオプトインを用意すべき話）→ `reduceMotion: false`で
//	  明示的にOFFにする

import {animate, type AnimationPlaybackControls} from 'motion';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export class Tw {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	readonly #target: any;
	#hTo		: {[k: string]: number}	= {};
	#durationSec= 0;
	#delaySec	= 0;
	#ease		: (k: number)=> number	= k=> k;
	#repeatN	= 0;
	#yoyo		= false;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	#onUpdateFn	: ((d: any)=> void) | undefined;
	#onCompleteFn: (()=> void) | undefined;
	#nextInChain: Tw | undefined;
	#onStartFn	: (()=> void) | undefined;
	#ctrl		: AnimationPlaybackControls | undefined;
	#finished	= false;

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	constructor(target: any) {this.#target = target}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	to(hTo: any, time_ms: number): this {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		this.#hTo = hTo;
		this.#durationSec = Math.max(time_ms, 0) / 1000;
		return this;
	}
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	onUpdate(fn: (d: any)=> void): this {this.#onUpdateFn = fn; return this}
	onComplete(fn: ()=> void): this {this.#onCompleteFn = fn; return this}
	easing(fn: (k: number)=> number): this {this.#ease = fn; return this}
	delay(ms: number): this {this.#delaySec = ms / 1000; return this}
	repeat(n: number): this {this.#repeatN = n; return this}
	yoyo(b: boolean): this {this.#yoyo = b; return this}
	chain(next: Tw): this {this.#nextInChain = next; return this}
	// [tsy path=…]の区間切り替えをScriptMng側が追いたい（pause_tsy/resume_tsyが「今動いている
	//	区間」に効くように#hTwの参照を張り替える）ためのフック。start()の頭で同期的に呼ぶ
	onStart(fn: ()=> void): this {this.#onStartFn = fn; return this}

	start(): this {
		if (this.#ctrl) return this;	// 二重start対策
		this.#onStartFn?.();

		const proxy: {[k: string]: number} = {};
		for (const k of Object.keys(this.#hTo)) proxy[k] = <number>this.#target[k];

		// `<any>proxy`は本家 CmnTween.ts:75 のまま踏襲：`animate()`はオブジェクト対象の
		//	オーバーロードを持つが、インデックスシグネチャ型からの総称型推論に失敗し、
		//	`number | number[]`用の別オーバーロードへ誤って解決されてしまう（tsc実測）
		// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-argument
		this.#ctrl = animate(<any>proxy, this.#hTo, {
			duration	: this.#durationSec,
			delay		: this.#delaySec,
			ease		: this.#ease,
			repeat		: this.#repeatN,
			...this.#yoyo ? {repeatType: 'reverse' as const} : {},
			// 上のコメント参照：OSのreduce-motion設定でleft/top/width/height/scale_*等が
			//	勝手に瞬時完了にされるのを防ぐ
			reduceMotion: false,
			onUpdate	: ()=> {
				if (this.#finished) return;
				Object.assign(this.#target, proxy);
				this.#onUpdateFn?.(this.#target);
			},
			onComplete	: ()=> this.#fireComplete(),
		});
		return this;
	}
	#fireComplete() {
		if (this.#finished) return;
		Object.assign(this.#target, this.#hTo);
		this.#onUpdateFn?.(this.#target);
		this.#finished = true;
		this.#onCompleteFn?.();
		this.#nextInChain?.start();
	}
	// 同名トゥイーンの差し替え時（#runTsy/#beginFadeSnd）に使う、黙った停止（chain先まで辿る）
	kill(): void {
		let node: Tw | undefined = this;
		while (node) {
			node.#ctrl?.stop();
			node.#finished = true;
			node = node.#nextInChain;
		}
	}
	pause(): this {this.#ctrl?.pause(); return this}
	resume(): this {this.#ctrl?.play(); return this}
}
