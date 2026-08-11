/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2026-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

// ゲームパッド入力（本家 EventMng.ts:255-321 の移植）。
//	新しい入力系統は作らず、スティック・ボタンを合成KeyboardEventへ変換して
//	既存のキーボード経路（フォーカス中の要素、無ければMain.tsxのuseKey）へ流し込む。
//	本家は`gamepad.js`ライブラリを使うが、型を同梱していない上に
//	rAFループの停止漏れ・windowの'error'リスナ解除漏れという落とし穴を引き継ぐことになるため、
//	素のGamepad API + requestAnimationFrameで自前実装する（音声をhowlerでなく自前Web Audio層に
//	したのと同じ判断。src/ts/SndMng.ts参照）

import {focusMng} from './FocusMng';
import type {ScriptMng} from './ScriptMng';

// スティック軸の量子化→矢印キー名（本家 EventMng.ts:282-286 の3x3表と同じ。斜めは無視）
const AXIS_KEY_TABLE: readonly string[] = [
	'',			'ArrowUp',		'',			// 左上・上・右上
	'ArrowLeft','',				'ArrowRight',	// 左・中央・右
	'',			'ArrowDown',	'',			// 左下・下・右下
];
const DEAD_ZONE = 0.3;
// 一度方向が確定した後、ニュートラルへ戻ったと判定するしきい値（DEAD_ZONEより緩める）。
//	アナログスティックの値はDEAD_ZONE境界ちょうどで微小に揺れることがあり、単一のしきい値だと
//	その揺れのたびに'ArrowRight'等が連続で再送され、[set_focus to=next]がフォーカスの輪を
//	コマ送りで巡回してしまう（todo.md「パッドの移動ではクリック待ち記号の後ろに一瞬なにかが
//	表示されちらつく」の原因。playwright-cliで合成keydownを間隔を詰めて連投し、フォーカス矩形が
//	輪を一周してしまうことを実機で確認済み）。ENTER/EXITの2段しきい値でヒステリシスを持たせ、
//	境界付近の揺れが同じキーの再送に繋がらないようにする
const EXIT_ZONE = 0.2;

export function axisToKey(x: number, y: number, zone = DEAD_ZONE): string {
	const qx = Math.abs(x) < zone ? 0 : Math.sign(x);
	const qy = Math.abs(y) < zone ? 0 : Math.sign(y);
	return AXIS_KEY_TABLE[(qy + 1) * 3 + (qx + 1)] ?? '';
}

// 合成KeyboardEvent用のinit。**`code`も`key`と同じ値にする**：`new KeyboardEvent(…, {key})`だけだと
//	`code`は空文字のまま（`key`から自動導出はされない）。Main.tsxの読み進め判定（Space/Enter等）は
//	`e.code`を見るため、`code`が空だとフォーカス無し状態でのゲームパッドOKボタンが読み進めに繋がらない
//	（このモジュールが送る'ArrowUp/Down/Left/Right'・'Enter'はどれも無修飾なら`key`と`code`が
//	同じ文字列になる規格なので、単純に同じ値を渡せばよい）
export function keyEventInit(key: string): KeyboardEventInit {
	return {key, code: key, bubbles: true};
}

export class GamepadMng {
	readonly #scrMng: ScriptMng;
	#raf = -1;
	// パッドindexごとの直前の軸キー・ボタン押下状態（変化検出＝立ち上がりのみ発火するため）
	readonly #hAxisKey = new Map<number, string>();
	readonly #hBtn = new Map<number, boolean[]>();

	constructor(scrMng: ScriptMng) {this.#scrMng = scrMng}

	start() {
		if (this.#raf >= 0) return;
		this.#raf = requestAnimationFrame(this.#loop);
	}
	stop() {
		if (this.#raf < 0) return;
		cancelAnimationFrame(this.#raf);
		this.#raf = -1;
		this.#hAxisKey.clear();
		this.#hBtn.clear();
	}

	readonly #loop = ()=> {
		this.#raf = requestAnimationFrame(this.#loop);
		if (! document.hasFocus()) return;

		for (const gp of navigator.getGamepads()) {
			if (! gp) continue;
			this.#pollAxis(gp);
			this.#pollButtons(gp);
		}
	};

	// フォーカス中の要素（無ければグローバル）へ合成KeyboardEventを送る（本家 EventMng.ts:297-299,312-313）
	#dispatchKey(key: string) {
		const el = focusMng.getFocus();
		(el ?? globalThis).dispatchEvent(new KeyboardEvent('keydown', keyEventInit(key)));
	}

	#pollAxis(gp: Gamepad) {
		const prev = this.#hAxisKey.get(gp.index) ?? '';
		// 既に方向が確定している間はEXIT_ZONE（緩め）で判定し、境界での揺れによる
		//	キー再送（＝フォーカスの輪を余計に進めてしまう）を防ぐ（上のEXIT_ZONE参照）
		const key = axisToKey(gp.axes[0] ?? 0, gp.axes[1] ?? 0, prev ? EXIT_ZONE : DEAD_ZONE);
		if (key === prev) return;
		this.#hAxisKey.set(gp.index, key);
		if (! key) return;

		this.#scrMng.cancelAuto();	// ユーザーアクションなので自動進行を止める（本家 cancelAutoSkip）
		this.#dispatchKey(key);
	}

	#pollButtons(gp: Gamepad) {
		const prev = this.#hBtn.get(gp.index) ?? [];
		const cur = gp.buttons.map(b=> b.pressed);
		this.#hBtn.set(gp.index, cur);

		for (let i = 0; i < cur.length; ++i) {
			if (cur[i] && ! prev[i]) this.#onButtonDown(i);
		}
	}
	// 偶数ボタン→Enter（OK）、奇数ボタン→rightclick（Cancel。本家 EventMng.ts:306-316は
	//	奇数ボタンをmiddleclickにするが、テンプレのメニュー・確認ダイアログの「閉じる」は
	//	いずれも[event key=rightclick]で予約されており、middleclickはどこからも予約されて
	//	いない。マウス右クリックのできない環境（十字+ABの最小I/Fでのプレイ等）でも
	//	キャンセル操作が効くよう、bluesnovelでは意図的にrightclickへ変更する）
	#onButtonDown(i: number) {
		this.#scrMng.cancelAuto();
		if (i % 2 === 0) this.#dispatchKey('Enter');
		else this.#scrMng.fireEvent('rightclick');
	}
}
