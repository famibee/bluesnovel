// import {GamepadListener} from 'gamepad.js';
// 警告消し用ファイル
//	gamepad.js（型を同梱していない）は今のところ未使用なので依存から外してある。
//	本家 EventMng.ts:249 の移植でゲームパッドを実装するときに `bun add gamepad.js` すること。
//
//	移植時の注意（本家で解放漏れになっていた点）：
//	・GamepadListener は内部で rAF ループを回し続ける。破棄時に必ず stop()を呼ぶ事。
//	  呼ばないと画面を作り直すたびに多重に走る（本家 EventMng.ts の destroy()を参照）
//	・コンストラクタが window に 'error' リスナ（bind済みの stop 自身）を張り、
//	  自分では外さない。破棄時に removeEventListener('error', gamepad.stop)する事
declare module 'gamepad.js';
