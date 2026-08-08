/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2026-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

// サウンドバッファ1本（本家 skynovel_esm/src/sn/SndBuf.ts の簡略版）。
//	本家はhowler（Howl）を積み、ロード中/再生中/フェード中/終了待ち…の6状態を
//	`sb.stt = new XXX(…)`という代入だけで渡り歩く状態機械（StLoading〜StStop）を持つが、
//	退場処理（exit action）が無いまま終端のStStopだけが副作用の塊になっており、
//	「[wf]待機中に音が自然終了すると誰もnotifyEndProcを呼ばずスクリプトが永久停止する」
//	「フェード停止時にStStopが2回構築される」等の不備の温床になっていた
//	（2026-08 のskynovel_esm調査で判明。SndBuf.ts:478,486／:429-430 等）。
//
//	bluesnovelはhowlerを積まず、Web Audio APIを直接使う自前の薄い層にした
//	（依存追加コストと、howlerが2023-09のv2.2.4を最後に更新が止まっていることを踏まえた判断。
//	本家が使うhowlerのAPIはHowl/volume/fade/stereo/duration/play(sprite)/unload/once/
//	Howler.codecs|volume|unloadのみで、しかも`html5:false`固定＝常にWeb Audioなので、
//	素のWeb Audio APIで書いても失うものは少ない）。
//	設計は「1バッファ＝1インスタンス、停止＝破棄」に単純化し、状態機械は持たない。
//	待ち合わせ（[ws]/[wf]）はこのクラスではなくScriptMng側が持つ（[trans]/[quake]/[tsy]と同じ形。
//	「終わりを宣言するのはScriptMng」という既存の設計に揃えてある）。
//	stop()は冪等で、明示停止でも自然終了でも#onEndが必ず1回だけ発火するため、
//	本家の「[wf]待機中の自然終了で待ちが解決されない」という不備は構造的に起こらない。

// end_ms省略時の「音声ファイルの末端」を表す番兵値（本家 SndBuf.ts:23 MAX_END_MS）。
//	ScriptEngine.ts側にも同じ値を重複定義してある（ズレないよう変更時は両方直すこと。
//	ScriptEngine.tsは属性検証だけを行い、実際の長さ解決＝AudioBufferが要るのはこちら側のため、
//	インポートで結合させずあえて別々に持たせている＝ScriptEngineをDOM/WebAudio非依存に保つ設計）。
//	ScriptMng.ts（DOM層。SndMng/SndBufに依存してよい）はここからimportして使う
export const MAX_END_MS = 999000;

export type T_SND_OPT = {
	loop		: boolean;
	volume		: number;	// 実効音量（save:目標 × sys:基準。0.0〜1.0）
	speed		: number;
	pan			: number;	// -1.0（左）〜1.0（右）
	start_ms	: number;
	end_ms		: number;	// MAX_END_MSは「末端まで」、負値は「末尾からのオフセット」
	ret_ms		: number;	// ループ時、2周目以降の再開位置
};

export class SndBuf {
	buf: string;	// [xchgbuf]でSndMng.xchgBuf()が書き換える（可変。コンストラクタでも同名引数から入れる）
	constructor(
		private readonly ctx: AudioContext,
		dst: AudioNode,
		buf: string,
		readonly src: string,	// 同一ファイル判定用（SndMng.play()が「既に同じ音が鳴っているか」を見る）
		private readonly opt: T_SND_OPT,
	) {
		this.buf = buf;
		const gn = this.gn = ctx.createGain();
		gn.gain.value = opt.volume;
		if (opt.pan !== 0 && typeof ctx.createStereoPanner === 'function') {
			const pn = ctx.createStereoPanner();
			pn.pan.value = opt.pan < -1 ? -1 : opt.pan > 1 ? 1 : opt.pan;
			gn.connect(pn);
			pn.connect(dst);
		}
		else gn.connect(dst);
	}

	readonly gn: GainNode;	// フェードのターゲット（ScriptMngがgn.gainをGSAPで動かす）
	get loop() {return this.opt.loop}

	#src: AudioBufferSourceNode | undefined;
	#destroyed = false;
	get destroyed() {return this.#destroyed}
	#tidFakeEnd: ReturnType<typeof setTimeout> | undefined;

	// 停止でも自然終了でも必ず1回だけ呼ばれる（本家の「join待ちの通知は成否・停止済みを
	//	問わず必ず一度出す事」という教訓＝todo.md記載の引き継ぎをそのまま踏襲）
	#onEnd: (() => void) | undefined;
	set onEnd(fnc: (() => void) | undefined) {this.#onEnd = fnc}

	// デコード済みバッファを実際に鳴らす。needClick2Playは自動再生ブロック中（AudioContextが
	//	suspended）の対策：本来鳴らないので'ended'イベントも来ず、[ws]/[wl]が待ちっぱなしになる
	//	（本家 SndBuf.ts:329-348 #tidFakeEnd と同じ問題への同じ対策）
	start(ab: AudioBuffer, needClick2Play: boolean) {
		if (this.#destroyed) return;	// デコード完了前にstopされていた

		const {loop, speed, start_ms, ret_ms} = this.opt;
		let {end_ms} = this.opt;
		const durMs = ab.duration * 1000;
		if (end_ms === MAX_END_MS) end_ms = durMs;
		else if (end_ms < 0) end_ms = durMs + end_ms;

		const src = this.#src = this.ctx.createBufferSource();
		src.buffer = ab;
		src.playbackRate.value = speed;
		src.loop = loop;
		if (loop) {
			// ネイティブのloopStart/loopEndで1周目start_ms〜end_ms、2周目以降ret_ms〜end_msを表現できる。
			//	本家はhowlerにこの機能が無いため sprite（一周目／二周目）＋自作onendで模した力技をしていた
			//	（SndBuf.ts:223-266）が、Web Audio APIならそのまま渡すだけで済む
			src.loopStart = ret_ms / 1000;
			src.loopEnd = Math.max(end_ms, ret_ms + 1) / 1000;
		}
		else src.onended = () => {
			this.#src = undefined;	// stop()からの二重src.stop()呼び出しを避ける
			this.stop();
		};
		src.connect(this.gn);

		const off = start_ms / 1000;
		if (loop) src.start(0, off);
		else {
			src.start(0, off, Math.max(0, end_ms - start_ms) / 1000);
			if (needClick2Play) this.#tidFakeEnd = setTimeout(() => this.stop(), Math.max(0, end_ms - start_ms));
		}
	}

	// 冪等。明示停止・[stop_allse]・自然終了（start()内のonended）のいずれからも呼ばれる
	stop() {
		if (this.#destroyed) return;
		this.#destroyed = true;
		if (this.#tidFakeEnd) {clearTimeout(this.#tidFakeEnd); this.#tidFakeEnd = undefined}
		if (this.#src) {
			try {this.#src.stop()}
			catch {/* 既に停止済み等。ブラウザ差異に対する保険 */}
			this.#src.disconnect();
			this.#src = undefined;
		}
		this.gn.disconnect();

		const onEnd = this.#onEnd;
		this.#onEnd = undefined;
		onEnd?.();
	}

	get volume() {return this.gn.gain.value}
	set volume(v: number) {this.gn.gain.value = v}
}
