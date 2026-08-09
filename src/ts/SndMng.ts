/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2026-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

// 音声層（本家 skynovel_esm/src/sn/SoundMng.ts の簡略版）。DOM/WebAudioを直接触るのはここと
//	SndBuf.tsだけ（ScriptEngine.tsは属性の解釈と変数の帳簿付けだけを行い、実際に鳴らすのはこちら）。
//	AudioContextは1つだけ生成し、[stop_allse]でも本家のように作り直さない
//	（本家 SoundMng.ts:142 `Howler.unload()` はAudioContextをcloseして毎回作り直すため、
//	iOS/Safariでは新しいctxが必ずsuspendedで始まり次のタップまで無音になるリスクがある。
//	こちらはGainNode側で個々のバッファを畳むだけで済ませ、ctxそのものは使い回す）
import {SndBuf, type T_SND_OPT} from './SndBuf';

// 拡張子ごとの再生可否判定に使うMIMEタイプ（本家 Howler.codecs() が内部で使う判定と同じ狙い。
//	howlerのソース同梱表を参考にしたおおまかな対応。tmp:const.sn.sound.codecsとして公開するだけの
//	情報用途で、現状どのテンプレも参照していないため厳密一致より「妥当な近似」を優先している）
const H_CODEC_MIME: {[ext: string]: string} = {
	mp3: 'audio/mpeg', mpeg: 'audio/mpeg', opus: 'audio/ogg; codecs="opus"',
	ogg: 'audio/ogg; codecs="vorbis"', oga: 'audio/ogg; codecs="vorbis"',
	wav: 'audio/wav; codecs="1"', aac: 'audio/aac', caf: 'audio/x-caf',
	m4a: 'audio/mp4; codecs="mp4a.40.2"', mp4: 'audio/mp4; codecs="mp4a.40.2"',
	weba: 'audio/webm; codecs="vorbis"', webm: 'audio/webm; codecs="vorbis"',
	dolby: 'audio/mp4; codecs="ec-3"', flac: 'audio/flac',
};

export class SndMng {
	constructor(
		private readonly trace: (txt: string, lvl?: 'D' | 'W' | 'F' | 'E' | 'I' | 'ET') => void,
		private readonly fetch: (url: string, init?: RequestInit)=> Promise<Response>,
	) {}

	#ctx?: AudioContext;
	#gnMaster?: GainNode;
	// AudioContextは初回アクセス時に遅延生成する（constructor時点でnewすると、
	//	ユーザー操作より前にnewされたcontextはブラウザによってはsuspended扱いが強制される）
	#getCtx(): {ctx: AudioContext; gn: GainNode} {
		if (this.#ctx && this.#gnMaster) return {ctx: this.#ctx, gn: this.#gnMaster};

		const ctx = this.#ctx = new AudioContext();
		const gn = this.#gnMaster = ctx.createGain();
		gn.connect(ctx.destination);
		return {ctx, gn};
	}

	// ブラウザの自動再生ポリシー対策。初回のクリック・キー入力から呼ぶ（Main.tsx参照）。
	//	本家はCmnLib.needClick2Play()が判定専用に**別のAudioContextを新しく作って**
	//	closeせず放置するが（CmnLib.ts:197-207）、こちらは実際に使うctxをそのまま見るので
	//	無駄なcontextが増えない
	unlock() {
		const {ctx} = this.#getCtx();
		if (ctx.state === 'suspended') void ctx.resume();
	}
	needClick2Play(): boolean {return this.#getCtx().ctx.state === 'suspended'}
	setGlobalVol(v: number) {this.#getCtx().gn.gain.value = v < 0 ? 0 : v}

	codecs(): string {
		const a = document.createElement('audio');
		const h: {[ext: string]: boolean} = {};
		for (const [ext, mime] of Object.entries(H_CODEC_MIME)) h[ext] = a.canPlayType(mime) !== '';
		return JSON.stringify(h);
	}

	// fn -> デコード済みAudioBufferのキャッシュ。同じSEの連打で毎回fetch/decodeし直さない
	//	（本家に無い改善。AudioBufferは複数のAudioBufferSourceNodeから同時に参照して安全なので、
	//	キャッシュした1個を使い回せる）。デコード失敗時はキャッシュに残さず、次回また取りに行く
	readonly #hAB = new Map<string, Promise<AudioBuffer>>();
	#decode(src: string): Promise<AudioBuffer> {
		let p = this.#hAB.get(src);
		if (! p) {
			const {ctx} = this.#getCtx();
			p = this.fetch(src)
				.then(r => {
					if (! r.ok) throw `fetch失敗 ${String(r.status)} ${r.statusText}`;
					return r.arrayBuffer();
				})
				.then(ab => ctx.decodeAudioData(ab));
			p.catch(() => this.#hAB.delete(src));
			this.#hAB.set(src, p);
		}
		return p;
	}

	readonly #hBuf: {[buf: string]: SndBuf} = Object.create(null);
	// [ws]/[wl]の待ち合わせ。バッファごとに1件だけ（本家のReading.beginProcと違い多重登録は想定しない。
	//	ScriptMng側が同時に複数の[ws]を同じbufへ発行しない前提＝待ち中は#runStep()がstopで止まる）
	readonly #hWaitCb: {[buf: string]: () => void} = Object.create(null);

	// 再生開始。onStopは明示停止・自然終了どちらでも必ず1回呼ばれる後始末フック
	//	（ScriptMng側がtmp:const.sn.sound.<buf>.playingを倒すのに使う。
	//	この変数は非同期な自然終了でも倒す必要があり、ScriptEngine.step()の外から
	//	engine.setValNochk()で書くしかないため、ここを起点にする設計にした）
	//	onStopには**その時点のバッファ名**（sb.buf）を渡す。[xchgbuf]でバッファ名が
	//	入れ替わった後に自然終了した場合、tmp:playingを倒すべきは呼び出し時のbufではなく
	//	今そのSndBufが属しているbufのため
	async play(buf: string, src: string, opt: T_SND_OPT, onStop?: (buf: string) => void): Promise<void> {
		// 同じバッファで同じファイルが既に再生中（デコード待ちも含む）なら、頭から鳴り直さず何もしない。
		//	新規SndBufを作らず今のインスタンスをそのまま使い続けるので、進行中のフェード（GainNodeを
		//	直接掴んでいる）や[ws]/[wf]の待ち合わせ（このインスタンスを対象にしている）も壊れない
		const cur = this.#hBuf[buf];
		if (cur && ! cur.destroyed && cur.src === src) return;

		this.stop(buf);	// buf名が同じでもファイルが違うなら差し替える（本家も1buf=1SndBuf。SoundMng.ts:117）

		const {ctx, gn} = this.#getCtx();
		const sb = new SndBuf(ctx, gn, buf, src, opt);
		this.#hBuf[buf] = sb;
		// buf名は[xchgbuf]で書き換わりうるので、クロージャ捕捉のbufでなく**その時点のsb.buf**を見る。
		//	さもないと交換後の自然終了で、交換前のバッファ名の#hBuf/#hWaitCbを触ってしまう
		sb.onEnd = () => {
			const nowBuf = sb.buf;
			if (this.#hBuf[nowBuf] === sb) delete this.#hBuf[nowBuf];	// eslint-disable-line @typescript-eslint/no-dynamic-delete
			const cb = this.#hWaitCb[nowBuf];
			delete this.#hWaitCb[nowBuf];	// eslint-disable-line @typescript-eslint/no-dynamic-delete
			onStop?.(nowBuf);
			cb?.();
		};

		let ab: AudioBuffer;
		try {ab = await this.#decode(src)}
		catch (e) {
			if (! sb.destroyed) {	// ロード中に別途stopされていたら、既にonEnd経由で後始末は済んでいる
				this.trace(`[playse] 音声のデコードに失敗しました src:${src} ${String(e)}`, 'E');
				sb.stop();
			}
			return;
		}
		sb.start(ab, this.needClick2Play());
	}

	stop(buf: string) {this.#hBuf[buf]?.stop()}
	stopAll() {for (const sb of Object.values(this.#hBuf)) sb.stop()}
	// 今何か鳴っているバッファ名の一覧（[load]の音声復元が「復元表に無いバッファは止める」
	//	判定に使う。本家 SoundMng.playLoopFromSaveObj() の#hSndBuf走査に相当）
	bufs(): string[] {return Object.keys(this.#hBuf)}

	// [xchgbuf]。再生中インスタンスを入れ替える（本家 SoundMng.ts:174-187）。save:/loopPlayingの
	//	帳簿はScriptEngine側で済んでいるので、ここでは実体（#hBuf）だけを動かす。片方だけ再生中でも
	//	もう片方をdeleteし忘れないよう、両者いっぺんに読んでから書き戻す（noUncheckedIndexedAccess対策）。
	//	[ws]/[wf]の待ち合わせ（#hWaitCb）は**交換しない**——「バッファ名SEの音が終わるまで」という
	//	待ちの意味は交換後も変わらないため、交換後にSEへ来た音の終了で解決するのが正しい
	xchgBuf(buf: string, buf2: string) {
		const a = this.#hBuf[buf];
		const b = this.#hBuf[buf2];
		if (b) {this.#hBuf[buf] = b; b.buf = buf} else delete this.#hBuf[buf];	// eslint-disable-line @typescript-eslint/no-dynamic-delete
		if (a) {this.#hBuf[buf2] = a; a.buf = buf2} else delete this.#hBuf[buf2];	// eslint-disable-line @typescript-eslint/no-dynamic-delete
	}

	setVol(buf: string, v: number) {
		const sb = this.#hBuf[buf];
		if (sb) sb.volume = v < 0 ? 0 : v > 1 ? 1 : v;
	}
	gainNode(buf: string): GainNode | undefined {return this.#hBuf[buf]?.gn}

	// [ws]/[wl]の待ち合わせ登録。ループ再生中・既に鳴っていない場合は待たず false を返す
	//	（本家 tag.html の「loop=trueなら待たない」通り。呼び出し側はfalseならすぐ続行する）
	waitEnd(buf: string, fnc: () => void): boolean {
		const sb = this.#hBuf[buf];
		if (! sb || sb.loop) return false;

		this.#hWaitCb[buf] = fnc;
		return true;
	}
	cancelWaitEnd(buf: string) {delete this.#hWaitCb[buf]}	// eslint-disable-line @typescript-eslint/no-dynamic-delete
}
