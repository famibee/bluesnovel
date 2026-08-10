## 知見
![alt text](<test/Claude Schedule.svg>)
- /compact はコンテキスト80～90%程度で実行が推奨
- brew upgrade -y && bun update && bun outdated


## 後ほど
- SKYNovel拡張機能( https://github.com/famibee/SKYNovel-vscode-extension )のLSP部分にmcpサーバー機能を追加したい。いずれはあなたに接続し、マクロ定義位置などわかるようにしたい
- 「MCPサーバーをVSCode拡張そのものに埋め込む」よりも、VSCode拡張とMCPをメッセージでつなぐ（IPC / stdio / WebSocket）構成で保守しやすく

- 【electron-vite を廃止し Vite + vite-plugin-electron 構成に移行するツール】
- 【ARINovelプロジェクトをSKYNovelに移行するツール】
とかを作らせるといいかも

- Web（claude.ai/code）: ブラウザから Claude Code を使える環境
- サブエージェント
	- Claude Code には Explore・Plan・general-purpose といった組み込みのサブエージェントが用意されています。自分でカスタムサブエージェントを作ることも可能


## 2026/08/02

- [x] **`skynovel_esm`（本家）から引き継いだリソースリーク調査への対応**（2026-07-30）
  - `src/ts/FocusMng.ts`：`add`/`remove`の非対称を修正。重複チェックが`#aEl`しか見ないため`remove()`→`add()`が素通りし、`'focus'`リスナが積み上がっていた。`BtnLayer`経由はReactが要素ごと作り直すので無害だが、`[set_focus add/del='dom=…']`が相手にするフレーム内要素は生き続けるため、往復した回数だけ増えていた。本家の同じ問題からの移植
  - `src/sn/gamepad.js.d.ts`にゲームパッド移植時の注意（`stop()`必須・`window`の`'error'`リスナを自分で外す）を追記。本家はどちらも漏れていて、画面を作り直すたびrAFループが増えていた
  - 本家へ確認していた3件、すべて「移植不要」の結論で決着：
    - `[jump count=false]`が実質効かない件 — `#nextToken_Proc()`は①`#recordKidoku()`（**今から返すトークンの位置**に既読記録）→②トークン取得→③`++#idxToken`の順で進むため、タグ実行中の`#idxToken`は常にそのタグの次を指す。`#eraseKidoku()`が消すのはこの`#idxToken`＝「`[jump]`の次のトークン」で、ジャンプ後には読まれない位置。**`[call]`では意味がある**（`count`の既定が`[jump]`は`true`・`[call]`は`false`という非対称で、`[call]`の「次のトークン」は戻り先そのものなので、2回目以降の`[call]`で戻り先を未読に戻す動きになる）。`#eraseKidoku()`は`[call]`を想定した作りを`[jump]`が使い回しているだけと判明
    - `[call clear_local_event]`が no-op な件 — `#call()`が`popLocalEvts()`でローカルイベントを先に空にしてから`clear_event({})`を呼ぶため、後者が見る`#hLocalEvt2Fnc`は既に空。属性の意図（`[return]`時に復元させない、が本来）に実装が追いついていない状態と判明
    - `[button]`の配置属性（`center`/`middle`/`right`/`bottom`等）と`Layer.setXY()`の`isButton`分岐 — `setXY()`の呼び出し3箇所（`GrpLayer.ts`/`TxtLayer.ts`）はどれも`isButton`を渡しておらず常に`false`、`Button.ts`も`setXY()`を通らず`left`/`top`を直読みするだけ。AIRNovel時代の名残の消し忘れで、意図的な保持ではないと判明
  - E2Eテスト基盤（`test/e2e/`）の構成が本家へ逆輸入された。本家は状態がクラスの私有フィールドに散っていてzustandのような単一ストアが無いため、fixture側でブラウザAPI（`addEventListener`/`requestAnimationFrame`/`URL.createObjectURL`）を計装し「同じ操作をN回繰り返しても生存数が増えないこと」を見る方式に変えて輸入（`test/e2e/app/probe.ts`）。`src/ts/FrameMng.ts`の`#hDomLsn`（キー単位の`removeEventListener`）も本家の`EventMng`に無かった仕組みとして輸入された

## 2026/08/08

- [x] **ＢＧＭ・効果音（Phase 1+2）の実装**：`[playse]`/`[playbgm]`/`[stopse]`/`[stopbgm]`/
  `[stop_allse]`/`[volume]`/`[fadese]`/`[fadebgm]`/`[fadeoutse]`/`[fadeoutbgm]`/`[stopfadese]`/
  `[ws]`/`[wl]`/`[wf]`/`[wb]`
  - 本家調査の結果、howlerは採用せず自前のWeb Audio層（新規`src/ts/SndMng.ts`/`SndBuf.ts`）にした。
    理由：howlerの最終リリースv2.2.4は2023-09で以降更新なし・open PR未マージ多数（2026-08時点）。
    本家が使うAPIはHowl/volume/fade/stereo/duration/play(sprite)/unload程度で代替が容易、かつ
    `html5:false`固定＝常にWeb Audioなので素のAPIで書ける
  - 設計は「1バッファ＝1インスタンス、停止＝破棄」。本家`SndBuf.ts`の状態機械（`StLoading`〜
    `StStop`の6クラス）は退場処理が無く不備の温床だったため踏襲しなかった：
    skynovel_esm側の調査で「`[wf]`待機中に音が自然終了すると誰も終了通知を出さずスクリプトが
    永久停止する」「VOICE終了時のBGM音量復帰がVOICEの変数を読んでいる」「`[xchgbuf]`後に旧
    バッファ名で変数を書く」「フェード停止時に`StStop`が2回構築される」等の不備を確認
    （本家側は別コミットで対応予定。CLAUDE.mdの方針でこちらでは触らない）
  - `[ws]`/`[wl]`/`[wf]`/`[wb]`の待ち合わせは`SndBuf`でなく`ScriptMng`が持つ（`[trans]`/`[tsy]`と
    同じ設計）。フェードはGSAPで`GainNode.gain`を動かす（`delay=`属性は本家が読むだけで未実装だが
    こちらはGSAPの`delay`にそのまま乗るので対応できた）
  - `sys:sn.sound.global_volume`は`VarStore.defSetTrigger()`（新設。代入トリガ）で専用タグを経由
    しない直接代入にも即時反応する
  - 単体テスト`test/ScriptEngine_snd.test.ts`（新規）、E2E `test/e2e/snd.e2e.ts`＋
    `test/e2e/app/prj_snd/`（新規。実wavファイルを持つ例外プロジェクト。`prj_pic`と同じ理由）
  - 残り（しおり復元・`[xchgbuf]`・ボタン効果音・VOICEダッキング・動画）は`todo.md`のPhase 3/4へ

- [x] **不具合修正：同じバッファへ同じファイルの再生要求が重なると頭から鳴り直していた**（`[playse]`/
  `[playbgm]`の連打・フェード中の再取得で毎回新しいSndBufを作っていたのが原因）
  - `SndMng.play()`の入口で「同じ`buf`に同じ`src`が既に生きている（デコード待ち含む）」場合は
    新規SndBufを作らず即returnするよう修正（`SndBuf`に`src`を追加してファイル判定に使用）
  - **検討：フェードへの影響**——新規SndBufを作らず今のインスタンスをそのまま使い続けるので、
    進行中の`[fadese]`系フェード（GainNodeを直接掴んでいる）や`[ws]`/`[wf]`の待ち合わせ
    （そのインスタンスを対象にしている）は壊れない。もし逆に「一旦stopしてから何もしない」と
    実装していたら、stop()がGainNodeをdisconnectするため壊れていたはず
  - E2Eで2件追加（`test/e2e/snd.e2e.ts`）。当初「`[wb]`の解決タイミングだけ」で検証していたが、
    修正前のコードでも通ってしまうことが判明——`[wb]`の待ち合わせは`buf`名だけで管理しているため、
    鳴り直して生まれた新しいGainNodeにフェードが効いていなくても、古いGainNode上のフェード自体は
    時間通り終わり待ち合わせは解決してしまう（気付きにくい不具合の典型）。そこで
    `AudioContext.createGain()`の呼び出し回数を計装して覗く`gainNodeCount()`を
    `test/e2e/app/main.ts`に追加し、GainNodeの生成数そのもので検証するよう直した
    （修正前のコードに戻して2件とも落ちることを確認済み）

- [x] **不具合修正2：`[button clickse=…]`等のボタン効果音が鳴らなかった**（tmp_blues
  `theme/title.sn:11` `[button clickse=&sysse_ok2_long]`。`Grammar.ts`の`TArg`に型はあったが
  `ScriptEngine.ts`の`[button]` caseで一切読んでおらず未実装だった）
  - 本家`EventMng.ts:465-491`を移植：`clickse`/`enterse`/`leavese`（クリック／マウスオーバー／
    マウスアウト時の効果音）と`clicksebuf`/`entersebuf`/`leavesebuf`（buf既定は`'SYS'`。
    `[playse]`自体の既定`'SE'`とは別）。パス解決は鳴らす瞬間（`ScriptMng.playButtonSe()`新設）に
    行う——本家はボタン生成時に存在チェックするが、こちらは押されるかどうか分からない音を
    先読みしても仕方ないので緩い方針（見つからなくてもデバッグ表示のみで画面は止めない）
  - `join`は常にfalse固定（クリック/ホバーはシナリオの読み進めと無関係なUIイベント）。
    `enabled=false`のボタンは効果音も鳴らない（CSSの`pointer-events:none`により、そもそも
    `onClick`/`onMouseEnter`等のイベント自体がボタンへ届かない。`playSe()`内にも同じ条件の
    ガードを二重に持たせてある）
  - キーボード操作（Enter/Space、`FocusMng`経由）でもクリックと同じ扱いで`clickse`を鳴らす
    （本家に無いbluesnovel独自のフォーカス操作拡張だが、一貫性のため）。フォーカスの出入り
    （`onFocus`/`onBlur`）はヒント表示のみで、`enterse`/`leavese`は鳴らさない（本家は
    `pointerover`/`pointerout`のみが対象のため、マウスの乗り降りだけに揃えた）
  - 単体テスト`test/ScriptEngine_btn.test.ts`に追加。E2Eは`test/e2e/app/prj_snd/main.sn`に
    ボタンシーンを追加し`test/e2e/snd.e2e.ts`で検証（`clickse`実装を一時的にno-op化して
    3件が期待通り落ちることを確認済み）。ボタンごとに違うbufを明示して、前段で実装した
    「同じバッファへの重複再生要求は鳴り直さない」仕様と干渉しないようにした
  - `[link]`にも同様の効果音属性を追加する余地があるが、今回のスコープは`[button]`のみ。
    `todo.md`のPhase 3に残した

- [x] **`@electron-toolkit/typed-ipc`・`devtools-detect`への依存を自前実装に置き換え**
  - `@electron-toolkit/typed-ipc`：実質1人メンテ（alex8088）で該当パッケージのpushが約1年
    止まっていたため、`IpcListener`/`IpcEmitter`（main側・renderer側）を`src/IpcMain.ts`・
    `src/IpcRenderer.ts`として自前実装。実体は`ipcMain.on/handle`・`window.electron.ipcRenderer`
    をチャンネル名→ペイロード型のマップでジェネリクスに包むだけの薄いラッパーで、npm配布物の
    `dist/main.mjs`・`dist/renderer.mjs`をそのままTypeScript化した。renderer側が前提とする
    `window.electron.ipcRenderer`の契約（`send`/`invoke`/`on`/`once`）はテンプレ側
    （`@electron-toolkit/preload`の`exposeElectronAPI()`）が変わらず提供するので、preload側は
    無改修。`appMain_cmn.ts`は元々`T_ipc_appMain_cmn`という最小限の自前interfaceで受けていた
    ため、影響は`appMain.ts`・`app.ts`のimport元切替のみ。`src/build.ts`の`A_APP_EXTERNAL`と
    `package.json`からパッケージ自体を除去
  - `devtools-detect`：2026-05-12にsindresorhus自身がリポジトリをアーカイブ済み（README
    「多くの欠陥がある」と作者が明記）で移植は避け、`src/ts/DevToolsGuard.ts`を新設。原理は
    同ライブラリと同じ「window外寸と内寸の差」ヒューリスティック。ただしElectronアプリ版は
    `appMain_cmn.ts`が`webContents.on('devtools-opened')`でネイティブに検知・強制終了まで
    行うので対象外（元々未使用importとして依存からは撤去済みだった）。**web版(`SysWeb`)にだけ
    新規適用**し、`debug.devtool=false`の時だけ警告オーバーレイを表示する（タブを閉じる・
    シャットダウンする等はブラウザでは再現できないため、ユーザー確認の上でオーバーレイ表示のみ
    に留めた）
  - `bunx tsc --noEmit`・`bun test`（1459件）とも成功。`todo.md`「アセット・基盤」の
    該当2項目はここへ移動

- [x] **ＢＧＭ・効果音（Phase 3）・動画（Phase 4）の実装**：`[xchgbuf]`・`[load]`の音声復元・
  `[link]`の効果音・VOICE再生中のBGM絞り込み（`sys:sn.sound.BGM.vol_mul_talking`）・buf別音量の
  代入トリガ・動画（`[lay fn=movie]`の`<video>`描画＋`[wv]`）
  - `[xchgbuf]`（本家`SoundMng.ts:174-188`＋`SndBuf.ts:50-78`）：`save:`の帳簿（`volume`/`fn`/
    `start_ms`/`end_ms`/`ret_ms`の5つ。本家は`volume`/`fn`のみ）とループ再生表を丸ごと入れ替え、
    走行中フェードは交換前に終了状態へ確定させてから実体を動かす。**副産物として`SndMng.play()`の
    不備を発見・修正**：`onEnd`コールバックが`buf`引数をクロージャ捕捉していたため、交換後に
    自然終了すると交換前のバッファ名で`#hBuf`/`#hWaitCb`を触ってしまい`[ws]`の待ちが永久に解決
    されない不具合があった（`SndBuf.buf`を可変にし、`onEnd`/`onStop`は都度`sb.buf`を読むよう修正。
    E2Eで実際に再現させてから直し、回帰確認済み）
  - `[load]`の音声復元（本家`playLoopFromSaveObj()`）：`ScriptEngine.restoreMarkPart()`が
    `save:const.sn.loopPlaying`から内部`#hLoopPlay`を復元し、`ScriptMng.#restoreLoopSnd()`が
    復元表に無いバッファを止め、有るバッファを`save:`の帳簿（`volume`/`start_ms`/`end_ms`/
    `ret_ms`）から鳴らし直す
  - `[link]`の効果音（`clickse`/`enterse`/`leavese`）：`[button]`と同じ経路（既定buf=`SYS`、
    `join=false`）。`[link]`は本文ストリームへ埋め込む命令なので、`Txt.ts`の`T_LNK`に属性を足し
    `TxtLayer.tsx`の`mkLink()`（クリック／マウス乗り降り）から鳴らす
  - VOICE再生中のBGM絞り込み（本家`SndBuf.ts:143-157`）：`[playse buf=VOICE]`開始時に
    `sys:sn.sound.BGM.vol_mul_talking`を読み、今鳴っているBGMの実効音量へ直接反映
    （`save:`は触らない一時的な上書き）。VOICE停止時（自然終了・`[stopse]`・`[stop_allse]`の
    どれでも`SndMng`の`onStop`経由で通る）にBGM音量を素の実効音量へ戻す
  - buf別音量の代入トリガ：`VarStore`に`defSetTriggerSoundVol()`を新設（`sys:const.sn.sound.<buf>.
    volume`はbufが動的なため、既存の`defSetTrigger()`のキー完全一致では表せない）
  - 動画：`GrpLayer.tsx`が拡張子（`.mp4`/`.webm`）で`<img>`/`<video>`を出し分ける。自動再生対策で
    未クリック状態（`SndMng.needClick2Play()`）なら初期`muted`（本家`SpritesMng.ts:288-296`相当）。
    `sys:sn.sound.movie_volume`×`global_volume`をステージ配下の`<video>`全部へ直接反映（WebAudioの
    GainNodeを通らないDOM要素なので自前で掛け合わせる必要がある）
  - `[wv]`（本家`SpritesMng.wv()`）：レイヤ名でなく**ファイル名**（`fn`）で`<video>`を探し
    `'ended'`まで待つ。**踏んだ穴**：`[lay fn=…][wv fn=…]`が同じ`step()`内で処理されると、Reactの
    描画コミット（`<video>`の実マウント）がまだ済んでいないことがあり、特にStage.tsx初回マウント
    直後（lazy chunkの読込待ち）は`#heStageBox`自体が未アタッチで「見つからない＝待たない」に
    誤判定し、2秒の動画が一瞬で終わった扱いになっていた。rAFで最大30フレームまでリトライしてから
    諦めるよう修正（E2Eでffmpeg生成の実動画を2秒再生させて検出・回帰確認済み）
  - `test/ScriptEngine_snd.test.ts`・`ScriptEngine_save.test.ts`・`ScriptEngine_txt.test.ts`・
    `VarStore.test.ts`・`argdef_parity.test.ts`に追加。E2Eは`test/e2e/snd.e2e.ts`を拡張
    （`[xchgbuf]`・`[link]`効果音。既存の`[button]`テストとリンクのラベル文字列が重複するように
    なったため`getByText`を`:text-is()`＋`data-lay`スコープに調整）、`test/e2e/movie.e2e.ts`＋
    `test/e2e/app/prj_movie/`（新規。ffmpeg生成の2秒無音動画2本）を新設。ユニット1483件・
    E2E 185件、いずれも全件成功
  - `[log]`（`downloads/log.txt`への追記が要るデバッグ専用タグ）は未実装のまま：ブラウザ版には
    「同じファイルへ追記し続ける」置き場が無いため、アプリ（Electron）版の整備と同時に対応する
    方針で`docs/tag.html`にも明記した（`todo.md`参照）

- [x] **`todo.md`の棚卸し：`[quake]`/`[trans]`を凍結整理、`[graph] id`・`[l]`/`[p] visible`は対応不要と判断**（2026-08-08）
  - `[quake] layer=`：コード側にパースの痕跡が無く（`ScriptEngine.ts`の`case 'quake'`は`time`/`hmax`/`vmax`のみ）、唯一の記述だった`docs/tag.html`の「未対応：layer」という一文も、`[tsy path=…]`で対象レイヤを絞った揺れを実現できる旨に書き換えた。`delay`/`repeat`/`ease`/`yoyo`は本家でも揺れ幅がランダムで効かないため引き続き凍結
  - `[trans] delay=`/`ease=`/`glsl=`も同様に凍結（未実装のまま、現状使用しないため）
  - `[graph] id`：bluesnovelは`[graph]`（`Txt.ts`の`grp`コマンド）と待ちマーク（`[l]`/`[p]`の`stop`アクション）が最初から別実装で、本家の`id='break'`が使う`grp`コマンド経路そのものを共有していない。`id`は渡しても無視されるだけなので実装不要と判断
  - `[l]`/`[p]`の`visible`：「スキップを止めずにクリック待ちを隠す」用途は`l`/`p`というタグ種別の選択自体（`waitclick`/`s`とは別扱い）で既に担保されており、`visible`の有無はスキップ継続可否（`#calcResume()`）に一切関与しない。本家も現在は入口で属性ごと破棄して常時表示にしているため、実装不要と判断
  - 4件ともサブエージェントで並行調査（コード・本家参照実装・過去のCHANGELOG記載を突き合わせ）した上で`todo.md`から削除

- [x] **`[tsy]`の`filter=`/`backlay=`、`[button]`の`b_pic=`箱拡大・`hint_opt`の画面端はみ出し対応**（2026-08-08）
  - `[tsy filter=/enable_filter=]`：本家同様「トゥイーン開始と同時に一度だけフィルターを差し替える」副作用として実装（値自体をアニメーションさせるわけではない）。`[lay filter=…]`と全く同じ`addFilter`アクションを`case 'tsy'`から積むだけで済んだ（`src/ts/Filter.ts`の`bldFilter()`をそのまま流用）
  - `[tsy backlay=]`：`#runTsy()`に`onEnd`コールバックを追加し、トゥイーン終了時（`time=0`即時終了・GSAPの`onComplete`の両方）の最終値を反対側のページへも`chgLay`する。本家 `CmnTween.ts` の`backlay`（表で動かした最終形を裏にも反映）に対応
  - `[button b_pic=…]`：本家 `Button.ts:249` と同様、箱の大きさを絵の実寸へ広げるようにした。`pic`用に既にあった自然サイズ計測（`natPic`）と同じパターンで`natBPic`を追加。`btnSize()`とサイズ決定ロジックが`styBtnArg`とフィット計算（`useLayoutEffect`）の2箇所に重複していたので`btnBoxSize()`へ共通化し、フィット計算もb_picの実寸を基準にするよう揃えた（揃えないと文字が箱に対して大小ズレて見える）
  - `[button hint_opt]`：`hintFlip()`（主軸方向のスペースが無ければ反対側へ反転）と`clampPos()`（副軸方向を画面内へクランプ）を追加。本家popperの`flip`/`preventOverflow`モディファイア相当の簡易版で、依存は増やさない方針を維持
  - `test/ScriptEngine_tsy.test.ts`に`tsy_backlay`・`tsy_filter`を追加（既存`tsy_pushesAction`は`backlay: false`込みに更新）。`test/Hint.test.ts`に`hintFlip`3件・`clampPos`3件を追加。ユニット1487件→1490件、全件成功。型チェック（`bunx tsc --noEmit --incremental false`・`-p test/e2e`）も通過
  - `docs/tag.html`の`[tsy]`・`[button]`エントリを実装済みへ更新、`todo.md`から該当項目を削除

- [x] **`[rec_ch]`の`style`/`r_style`・任意属性への対応**（2026-08-08）
  - これまで`text`しか見ておらず、`style`/`r_style`と`text`以外の属性はすべて無視していた。属性自体は`args`（タグの汎用連想配列）にランタイムでは既に届いていたので、パーサー側の変更は不要だった
  - `style`/`r_style`は[ch]と全く同じ「本文ストリームへ埋め込む命令」（`#cmdTxt('add', …)`）の形で`Log.add()`に渡すようにした。`Log.ts`の`splitCh`/`htmlOf`解釈がそのまま効き、`<span style=…>`／ルビの`<rt style=…>`として履歴HTMLに乗る
  - `text`以外の属性（`style`/`r_style`含む）は、本家 `Log.ts:67` の`#LastLog = {...hArg, text}`と同じく「現在のページ」のメタデータとして`const.sn.log.json`の各要素へそのまま乗せた。フレーム側JSが読める想定（同一ページ内で複数回`[rec_ch]`を呼んだ場合は直近の指定が丸ごと勝つ）。`Log`クラスに`#attr`とその差し替え口`setAttr()`を追加し、`pagebreak()`／`json()`／`reset()`／`playback()`のそれぞれでページ境界と揃えて持ち回した
  - `T_LOG_ENTRY`型を`{text: string}`から`{text: string; [k: string]: string}`へ拡張
  - `test/Log.test.ts`に5件追加（style／r_style／任意属性のJSON反映／同一ページ内での上書き／改ページを跨がないこと）。ユニット1490件→1495件、全件成功。型チェック（`bunx tsc --noEmit --incremental false`）も通過
  - `docs/tag.html`の`[rec_ch]`エントリを🟢実装済みへ更新、`todo.md`から該当項目を削除

- [x] **`[log]`タグ（downloads/log.txtへの追記）と、その`_log.sn`E2E**（2026-08-09）
  - 本家 `DebugMng.ts:57`。`[rec_ch]`系の履歴（`const.sn.log.json`）とは別物で、作者がシナリオデバッグ中に手元へ書き出すためのタグ。`sys.appendFile()`が両版とも未配線だったのがブロッカーで、そこから実装した
  - `SysBase.ts`に`appendFile()`の既定（no-op）を追加。`SysApp`（`app.ts`）は主処理側に既にあったIPC（`appMain_cmn.ts`の`appendFile`ハンドラ）を呼ぶだけ。`SysWeb`（`web.ts`）は本家同様、パスごとに全文をメモリで持ち直し、都度Blobダウンロードへ置き換える形で代用
  - 本家ログ書式の`[fn:… line:…]`のうち`line:`（行番号）は、試作エンジンのトークン列に行番号情報が無かったため`Grammar.ts`の`resolveScript()`へ追加した。本家`ScriptIterator`は実行時に遅延計算・キャッシュする作り（IF分岐やコールスタックの戻り先まで絡む）だが、こちらは`[log]`表示用途だけなので、トークン化の時点で各トークン内の改行数を積み上げて一括計算する簡略版にした（`Script.ts`に`aLNum`アクセサ、`ScriptEngine.ts`に`lineNum`ゲッターを追加）
  - タグの配線自体は`RESERVED_TAGS`と`#execTag()`のswitch文にケースが無かった（`hTag.log`はコンストラクタで登録されるだけで実行経路には乗らない、本家から踏襲した死んだ配線だった）。`trace`と同じ形で`T_ENGINE_ACTION`に`log`を追加し、`fn`/`lineNum`は**Action発行時点のスナップショット**として持たせた（`step()`は1呼び出しで複数タグを処理しうるため、`ScriptMng`側で処理する時点の`engine.idx`を見ると別タグ分だけ進んでしまってズレる）
  - `test/ScriptEngine.test.ts`の`step_unknownTagIgnored`が「宣言はあるが未実装なタグ」の実例として`[log]`を使っていたため、実装済みになった今は本当に未実装な`[dump_script]`（本家はVSCode拡張との連携で、対応する拡張が無い）へ差し替えた
  - E2Eは実テンプレの`frames/_log.sn`＋`_log.htm`をそのまま持ち込まず（bootstrap/smart-table-scroll依存で自己完結フィクスチャの方針に反する）、`test/e2e/app/prj_log/`に最小限のJSだけの`log.html`を新設。検証したのは「記録した本文が`const.sn.log.json`経由でフレームへ渡り、フレーム側のJSが描画する」経路（`test/e2e/log.e2e.ts`、新規2件）
  - `test/ScriptEngine.test.ts`に`[log]`のAction発行を検証する3件を追加。ユニット1495件→1498件、E2E新規2件。型チェック（`bunx tsc --noEmit --incremental false`・`-p test/e2e`）も通過
  - `docs/tag.html`の`[log]`エントリを🟢実装済みへ更新、`todo.md`から該当項目を削除

- [x] **傍点文字の変更（`[lay sesame=]`）・ルビ位置指定（`[lay r_align=]`）・`[link]`のクリック中スタイルを実装**（2026-08-09）
  - `[lay sesame=]`は`RubySpliter.setting()`が実装済みなのに配線されていなかっただけ（本家 `TxtLayer.ts:303`）。`ScriptEngine.ts`の`case 'lay'`から呼ぶだけで済んだ
  - `r_align`は本家`TxtLayer.ts:504-555`の`#mkStyle_r_align()`/`#mkStyle_r_align4ff()`を移植。8種（`left`/`center`/`right`/`start`/`justify`/`121`/`even`/`1ruby`）とSafari／Firefox分岐は忠実に踏襲したが、**縦書き判定はJS側で持たずCSS論理プロパティ（`padding-inline`等）へ寄せた**のが相違点：本家は物理プロパティ＋DOM実測の縦書きフラグで左右/上下を出し分けるが、こちらは`useLayoutEffect`が2本あるため実測結果が1レンダー遅れて反映される構造上の問題があり（縦書きレイヤの初回マウントで誤った向きのCSSがDOMに固まりうる）、論理プロパティにすれば判定自体が要らずこの問題を避けられる。ルビ記法内の位置指定（`｜蜊《left｜あさり》`）は`Txt.ts`の`splitRubyAlign()`で`T_CH.ra`へ分離し、`[lay r_align=]`（レイヤ既定）より優先させた。**`rubyTxt()`は`splitRubyAlign()`に統合して削除**（`Log.ts`・`TxtLayer.tsx`の呼び出し側も`v.r`を直接使う形に整理）
  - `[link]`の`style_clicked`/`r_style_hover`/`r_style_clicked`。本文DOMをReactの外で直接組む都合上CSSの`:active`が使えないため、`mousedown`で乗せ`mouseup`／`mouseleave`で戻す実装（`[button]`の`&:active`とは別のアプローチが要った）。省略時のフォールバックは`docs/tag.html`の仕様どおり：`style_clicked`省略時は追加CSSなし、`r_style_hover`省略時は`style_hover`の値、`r_style_clicked`省略時は`r_style`の値
  - `r_size`（ルビサイズ）は調べたところ**本家にも`docs/tag.html`にも存在しない属性**だった。`r_style="font-size:…"`で同じことができるため専用属性は追加せず、`todo.md`に代替手段を明記して整理
  - テスト：`test/Txt.test.ts`に`splitRubyAlign()`・傍点分離・`[link]`新属性のフォールバックを検証する追加（`rubyTxt_dropsAlign`は`splitRubyAlign`のテストへ差し替え）。E2Eは`test/e2e/app/prj_ruby/main.sn`にシーンを追加（末尾の`[s]`を`[l]`にしてクリックで先へ進めるよう変更）、`ruby.e2e.ts`に新規3件（`sesame`・`r_align`の優先順位・`[link]`4状態の実色）。ユニット1498件→1499件、E2E12件（同ファイル内、新規3件）。型チェック（`bunx tsc --noEmit --incremental false`・`-p test/e2e`）も通過
  - `docs/tag.html`の`[link]`エントリと`[lay]`の文字組み説明を更新、`todo.md`から該当3項目を削除

- [x] **`[button]`の配置属性（`center`/`middle`/`right`/`bottom`/`s_right`/`s_bottom`）を実装**（2026-08-09）
  - 本家調査の結果、`Layer.ts:499-558`の`setXY()`に`isButton`分岐そのものはあったが、呼び出し3箇所（`GrpLayer.ts`/`TxtLayer.ts`）はどれも`isButton`を渡さず常に`false`、`Button.ts`も`setXY()`自体を通らず`left`/`top`を直読みするだけで、**一度も配線されたことのないデッドコード**だった（AIRNovel時代の名残と判明、`CHANGELOG.md`2026/08/02のエントリ参照）。仕様はこの未配線コードから掘り起こした：`center`/`right`は「指定値から表示物の幅を引く」寄せ、`s_right`/`s_bottom`は画面右端・下端からのオフセット
  - bluesnovelは`[lay]`側で既に同じ仕様を実装済み（`align_x`/`align_y`/`s_right`/`s_bottom`＋CSSの独立`translate`プロパティで寄せを表現。表示物の実寸をエンジンが知らなくてよい設計）だったので、そのまま`[button]`へ移植した。画像ボタンは箱の幅が既に3コマ分割後の実寸（`natPic.w = naturalWidth/3`）になっているため、`translate: -50%`が本家の`b_width/3`計算と自然に一致する
  - `T_BTN_STY`（`TxtLayer.tsx`）に`align_x`/`align_y`/`s_right`/`s_bottom`を追加、`BtnLayer.tsx`の`styBtnArg()`へCSS変換を追加（`Lay.ts`の`styLay()`と同じ形）。`ScriptEngine.ts`の`case 'button'`は`left`/`center`/`right`/`s_right`・`top`/`middle`/`bottom`/`s_bottom`をそれぞれ排他（`else if`）で処理するよう変更、`#A_BTN_NUM`からは`left`/`top`を外した（排他関係にあるため単純ループに乗らない）
  - テスト：`test/ScriptEngine_lay.test.ts`に`btnAlign_*`を4件追加（中央寄せ・右端合わせ・画面端オフセット・`left`優先の排他順）。ユニット1499件→1503件。型チェック（`bunx tsc --noEmit --incremental false`）も通過
  - `docs/tag.html`の`[button]`エントリを更新（「未対応」から実装済みの説明へ差し替え、属性表に配置属性の行を追加）、`todo.md`から該当項目を削除

- [x] **`[lay back_clear=true]`を実装、`b_left`/`b_top`は本家調査の結果対応不要と判明**（2026-08-09）
  - 本家`TxtLayer.ts:376-385`の`#drawBack()`を調査。`back_clear=true`は`b_color`/`b_alpha`/`b_alpha_isfixed`/`b_pic`を初期状態（`0x000000`/`0`/`false`/`''`）へ戻し、**指定時は他のb_*属性処理を素通りする**（早期return）。`false`指定時は何もしない
  - `b_left`/`b_top`は`TxtLayer.ts`全体をgrepしても一切読まれておらず、**実質未配線**と判明。実プロジェクトのシナリオ（`tmp_esm_uc/doc/prj/theme/title.sn`）が`b_left=0 b_top=0`と指定していても本家上で効いていない値だったので、bluesnovel側でも対応不要と判断（`[button]`の配置属性のような「掘り起こせば仕様が分かる」デッドコードとは違い、こちらは手がかり自体が無い）
  - 自動サイズ調整（本家`setMySize()`。`b_pic`ロード後、文字表示領域を画像の実寸へ合わせる）は`[lay width=/height=]`属性自体が未実装なのが前提となるため見送り、`todo.md`に理由を明記して残した
  - 実装は`chgBAlpha`/`chgBPic`と同じ形の専用アクション`chgBackClear`（`ScriptEngine.ts`→`ScriptMng.ts`→`store.tsx`）。`ScriptEngine.ts`の`case 'lay'`は`back_clear`が指定されたら`b_alpha`/`b_alpha_isfixed`/`b_pic`/`b_color`の処理を丸ごとスキップする（本家の早期returnと同じ排他）
  - テスト：`test/ScriptEngine_lay.test.ts`に3件（アクション発行・`false`時のno-op・他のb_*属性の排他）、`test/store_lay.test.ts`に1件（ストアの実際のリセット内容）、`test/e2e/lay.e2e.ts`に1件（算出CSSの`background-color`がtransparentへ戻ることを確認）。ユニット1503件→1507件、E2E12件（同ファイル内、新規1件）。型チェック（`bunx tsc --noEmit --incremental false`・`-p test/e2e`）も通過
  - `docs/tag.html`の`[lay]`エントリを更新（`back_clear`対応済み・`b_left`/`b_top`が本家でも未配線である旨を明記）、`todo.md`の該当項目を更新（自動サイズ調整のみ残し、理由を明記）

- [x] **`[save pic=…]`のサムネイル保存は既に実装済みと判明、`todo.md`から棚卸し**（2026-08-09）
  - 「しおり・システム系の残り」の次の項目として調査したところ、必要な3パーツが既にそれぞれ独立して実装・テスト済みだった：`[save]`が`place`以外の属性を丸ごと`json`へ持たせる（`ScriptEngine.ts` `case 'save'`。本家`#save()`と同じ挙動）、`[snapshot fn='userdata:/…']`が`SaveMng.putFile()`でセーブ層へ画像を置く、`#searchPic()`が`userdata:`プレフィックスをセーブ層（`SaveMng.getFile()`）から引く分岐を持つ（`ScriptMng.ts:1189`）。テンプレの`frames/_archive.sn`はこの3つを`[let name=pic text="&'userdata:/'+place+'/pic.jpg'"]`→`[snapshot fn=&pic]`→`[save place=&place pic=&pic]`の順で繋いでいるだけなので、追加の実装は不要だった
  - 検証のため`test/SaveMng.test.ts`に`bookmarkJson_carriesArbitraryAttrsLikePic`を追加（`pic`属性に`userdata:`パスを持たせても`bookmarkJson()`がそのまま返すことを確認）。ユニット1507件→1508件
  - `docs/tag.html`の`[save]`エントリを更新（「未対応：サムネイル画像の保存」を対応済みの説明へ差し替え、残るのは暗号化のみに）、`todo.md`から該当項目を削除

- [x] **`[load]`の`index=`／`do_rec=`を実装**（2026-08-09）
  - 本家`ScriptIterator.ts:1415-1485`の`#load()`/`loadFromMark()`を調査した結果、`todo.md`の従来の理解（「本家は`index=`でしおりの中の何ページ目かを選べる」）は誤りと判明。本家tag.htmlにも`index`/`do_rec`の記載が無く未ドキュメント化の内部属性だが、コードを読むと`index`は**しおりのページログとは無関係**で、「保存時点の再開位置を無視し、`fn`（省略時は現在のスクリプト）の`index`位置（トークン番号）へ直接ジャンプする」ページ移動用の機能（本家コード中のコメントも「ページ移動用」）。`label`は無視され`fn`単独で書ける。ページログ（`PageLog.ts`）をしおりへ含める設計変更は不要だった
  - `do_rec`（既定true）は、ロードした状態を次の`[record_place]`代わりの`#mark`として持たせるかどうか。`[reload_script]`は対象外（本家も`do_rec=false`で呼ぶ）。実装は`chgBAlpha`等と同じ`ScriptEngine.ts`→`ScriptMng.ts`の流れで、`case 'load'`のバリデーション（`fn`/`label`はセット必須）は`index`指定時のみ免除するよう変更
  - `ScriptMng.ts`の`#procLoad()`に、`doRec !== false`なら`this.#mark = {...mark}`、`index`指定時は通常の再開位置取得を丸ごとスキップして`engine.switchScript()`で直接ジャンプする分岐を追加
  - テスト：`test/ScriptEngine_save.test.ts`に3件（`index`指定時のfn単独許可・`do_rec`の値の伝搬）、`test/e2e/save.e2e.ts`に2件追加・1件更新（`index`でsub.snへジャンプ→`[jump]`で`*reload`へ戻り通常の`[load]`も確認、`do_rec`でロード時点の値が保存されることを確認）。E2E用に`prj_save/sub.sn`を新設。**`[load]`は必ずジャンプするため直後のコードには到達しない**（record_place位置への巻き戻りで無限ループしかけた）ことに気づき、`[jump]`でmain.snの`*reload`ラベルへ戻す設計にした。ユニット1508件→1510件、E2E5件（同ファイル内）。型チェック（`bunx tsc --noEmit --incremental false`・`-p test/e2e`）も通過
  - `docs/tag.html`の`[load]`エントリを更新（`index`/`do_rec`の実際の仕様と対応済みである旨を明記、属性表に2行追加）、`todo.md`から該当項目を削除

- [x] **`[add_filter blendmode=]`（フィルター単位のブレンド）と`[lay blur_x=/blur_y=]`を実装**（2026-08-09）
  - `[link]`の`global`・`onenter`/`onleave`も併せて調査。`global`はbluesnovelのクリックが本家の予約イベント表を経由せずReactが直接ハンドラを付ける方式（表示中は常に本家の`global=true`相当）のため実装不能ではなく**効きようがない**属性と判明、受理はするが無視する扱いで決着し`docs/tag.html`にその理由を明記。`onenter`/`onleave`は素朴に`[button call=true]`と同じ経路（`callToLabel`→通常のstep実行継続）を流用するとマウスが乗っただけで本編が読み進んでしまうため、専用の「`[return]`まで走らせたらそこで止める」実行経路の新設が要ると分かり見送り、`todo.md`に理由を残した
  - `[add_filter blendmode=]`：CSSは要素につき`mix-blend-mode`を1つしか持てないため、`[lay blendmode=]`と同じ枠へ合流させる設計にした（有効なフィルターの中で最後に指定されたものが勝つ、`[lay blendmode=]`が明示されていればそちらが優先）。ブレンドモード名→CSS値の変換（`normal`/`add`/`multiply`/`screen`の4種、`add`は`plus-lighter`）は`ScriptEngine.ts`に`[lay]`/`[add_face]`/`[button]`用として private static であったものを`src/ts/Blendmode.ts`へ切り出し、`Filter.ts`と共有した（循環import回避のため）
  - `[lay blur_x=/blur_y=]`（実体は`[add_filter filter=blur blur_x=/blur_y=]`。`todo.md`の表記はやや不正確だった）：CSSの`blur()`は半径1つしか持てないため、指定があるときだけSVGの`feGaussianBlur`（`stdDeviation`がX/Y別々）へ切り替える。本家`Layer.ts:122-123`を読むと`blur_x`/`blur_y`は常に既定2で`blurX`/`blurY`を上書きし`strength`は見た目に事実上効かないと判明したため、指定時は本家の既定値2をそのまま使う。無指定時は従来どおり`strength`をCSSの`blur()`半径として使う既存動作を変えていない（回帰リスクを避けるため）
  - 実装は色成分フィルター（`feColorMatrix`）と同じ「行列/値の中身からidを決めて`<filter>`要素を使い回す」設計を踏襲：`Filter.ts`に`blurId`/`blurValues`/`blursOf`/`blendmodeOf`を追加、`Stage.tsx`が`aBlur`を集めて`<feGaussianBlur>`を出す（`feColorMatrix`と違い`x`/`y`/`width`/`height`は既定のまま＝ぼかしが箱をはみ出しても切れないように）。`Lay.ts`の`styLay()`は`l.blendmode`優先で`blendmodeOf(l.aFlt)`にフォールバックする1行を追加
  - テスト：`test/ScriptEngine_filter.test.ts`に8件追加（`blendmode`の4種変換・不正値のthrow・`blendmodeOf`の優先順位、`blur_x`/`blur_y`無指定時の既存動作維持・どちらか一方のみでも既定値2で補うこと・`blurId`/`blurValues`/`blursOf`）。ユニット1510件→1518件。型チェック（`bunx tsc --noEmit --incremental false`・`-p test/e2e`）も通過（E2Eは追加していない：見た目の確認は将来必要ならフィルターギャラリーサンプルで）
  - `docs/tag.html`のフィルターセクションを更新（未対応から対応済みの説明へ差し替え、`[add_filter]`属性表に`blendmode`行を追加）、`[link]`エントリの`global`欄と、内容が古いまま残っていた重複説明ブロック（`style_clicked`等を「未対応」と誤記していた）を削除。`todo.md`の該当項目を更新・削除

- [x] **アニメpng（スプライトシート）の「コマ数が格子に満たないシート」を修正**（2026-08-09）
  - 原因：`src/ts/Sprite.ts`の`aniSpriteCss()`は「速い軸／遅い軸の2本のCSS `steps()`を重ねて格子を走査する」トリックで再生していたが、これは常に物理格子（`cols*rows`）全マスを踏む実装で、実コマ数`cnt`が格子に満たない場合、png上に絵の無い余りマスも毎周期通過し一瞬空白になっていた。本家（`skynovel_esm/src/sn/SpritesMng.ts`）はpixiの`AnimatedSprite`に実フレーム数ぶんのTextureだけを渡すため、この問題自体が存在しない
  - 2軸トリックをやめ、実コマ（`cnt`個）ぶんの`background-position`を単一の`@keyframes`へ直接列挙し、各ステップに`animation-timing-function: step-end`を指定してコマ間をジャンプさせる方式に変更。余りマスという概念自体が無くなる
  - テスト：`test/Sprite.test.ts`に2件追加（余りマスの位置を踏まないこと／一巡の終わりが1コマ目へ戻ること）。既存の`test/e2e/anime.e2e.ts`は単一アニメーション形式に合わせて更新（速い軸／遅い軸2本のCSSプロパティを検証していた箇所を1本に修正）。ユニット1518件→1520件、E2Eは既存8件がそのままパス
  - `todo.md`の該当項目を削除（文字レイヤ枠画像でのシート再生は別項目として残る）

- [x] **スキップモード`'p'`の改ページ停止が手動停止と区別されない件を調査、「対応不要」と結論**（2026-08-09）
  - todo.mdは「本家は継続する」という前提で、`Main.tsx`が手動操作のたびに`cancelAuto()`を呼ぶせいでモード`'p'`の改ページ停止をクリックで越えるとスキップまで解除されてしまう、とbluesnovel固有のバグ扱いにしていた
  - 隣接チェックアウト`skynovel_esm`（`EventMng.ts`／`Reading.ts`）を読むと、クリック・キー・ホイールの全ハンドラが`Reading.fire(key, e, true)`を呼び、`fire()`は`cancelAutoSkip=true`のとき進行処理より前に無条件で`cancelAutoSkip()`を実行する。「モード`'p'`の改ページ停止だけ継続扱いする分岐」はソース上に存在しない
  - `tmp_esm_uc`（本家web版、`npm run web`）で実機検証。既読を作った上で`sn.skip.mode='p'`を一時的に仕込んで`toggle_skip_all`（`Ctrl+F`）を起動し、改ページのクリック待ちに到達したところでクリックすると、**本家でも自動送りが止まった**（テスト用の一時変更は確認後に元へ戻した）
  - つまりbluesnovelの`cancelAuto()`（`ScriptMng.ts`）とその呼び出し箇所（`Main.tsx`等）は本家`cancelAutoSkip()`／`EventMng`と同じ設計で、実装漏れではなく本家から受け継いだ仕様どおりの挙動と判明。`todo.md`の該当項目を削除
  - 「モード`'p'`の改ページ停止だけユーザー操作でスキップを切らせない」という体験向上は本家にもない改修になるため、要望があれば別途新規タスクとして起こす

- [x] **アプリ（Electron）版の`[snapshot]`を`capturePage`でネイティブ撮影に対応**（2026-08-09）
  - IPC（`appMain_cmn.ts`の`capturePage`ハンドラ・`preload.ts`の型）は用意済みだったが、レンダラ側（`ScriptMng`）から未接続だった
  - `capturePage`はElectronのウインドウ画素をそのまま撮るため、DOM→SVG方式（`Snapshot.ts`）が担っていたレイヤ絞り込み（`aLayNm`）・裏ページ（`page`）・背景色指定（`b_color`）は原理的に再現できない。そこで「全レイヤ・表ページ・背景色未指定」という素朴な撮影のときだけ`SysBase.capturePage()`（アプリ版のみオーバーライド、既定はブラウザ版も含め空文字＝非対応）を試し、それ以外・非対応時は従来のDOM→SVG方式へフォールバックする設計にした
  - `capturePage`ハンドラは`path`へ直接書き込む方式（未使用だった）からdata URLを返す方式へ変更。呼び出し元が無かったため既存動作への影響は無い。撮影範囲は`ScriptMng`側で`stageRef`（`transform: scale`を持つ要素そのもの）の`getBoundingClientRect()`から求め、拡縮後の実際の画面上矩形をIPCへ渡す
  - `[snapshot]`のtodo.md該当行を削除（HTMLフレームが写らない件は引き続きweb版側の制約として残る）
  - 型チェック（`tsc --noEmit`／`-p test/e2e`）・単体テスト（1520件）はいずれもパス。`tmp_blues`（`electron-vite build`→Playwright `_electron`で操作）での実機確認も実施：設定画面（`[add_frame]`のHTMLフレーム）を開いた状態で`[snapshot]`（`main.sn`の`P`キー割り当て）を実行し、保存されたPNGにフレームの中身が写ることを確認した

- [x] **アプリ（Electron）版：ウインドウ位置・大きさの復元**（2026-08-09）
  - 受け口（`appMain_cmn`の`#inited()`/`#window()`）は既に`{c, x, y, w, h}`を受けて動く作りだったので、主処理側は無改修。手を入れたのはレンダラ側の両端
  - **起動時の復元**：`app.ts`の`loaded()`は`inited`invokeより前の時点ではまだ`ScriptMng`（`SaveMng`）を通していない（`scrMng`はSysBase.loadedのクロージャの中）。そこで`app.ts`が直接`new SaveMng(cfg.oCfg.save_ns)`で同じlocalStorageを覗き、`sys:const.sn.nativeWindow.*`の4値が揃っていれば`{c: false, x, y, w, h}`で`inited`する。無い（初回起動・壊れている）ときは従来どおり`{c: true, …}`＝ステージ実寸で中央
  - **移動・リサイズ確定時の保存**：`appMain_cmn`は動きが止まるたび主処理からIPC`save_win_inf`を送るが、レンダラ側で受け手が無く捨てられていた。`app.ts`が受けて`document`へ`CustomEvent('sn_win_inf')`として中継し（`fire`＝メニューキーの中継と同じパターン）、`Main.tsx`がそれを拾って新設の`ScriptMng.setWinInf(x, y, w, h)`を呼ぶ。`sys:const.sn.nativeWindow.*`へ`setValNochk`で書いてから**即`#flushSys()`**する（停止点まで待つとその前に閉じられた場合に失われるため。`[save]`/`[export]`と同じ「即flush」枠）
  - `ScriptMng`と`Main.tsx`はブラウザ版・アプリ版共通のコードなので、この2つの変更はブラウザ版（`SysWeb`）でも読み込まれる。ただし`'sn_win_inf'`を実際に発火させるのは`app.ts`（Electron専用）だけなので、ブラウザ版では単に発火しないだけで挙動に影響は無い
  - テスト：`test/e2e/sys.e2e.ts`に1件追加。Electronの`BrowserWindow`実体はPlaywright（ブラウザ版）からは操作できないため、`document.dispatchEvent(new CustomEvent('sn_win_inf', …))`で中継の受け側だけを直接叩き、`localStorage`の`sys`キーへ4値とも反映されることを確認。型チェック（`tsc --noEmit`／`-p test/e2e`）・単体テスト1520件・E2E193件（前回比+1）はいずれもパス
  - `todo.md`の該当行（アプリ版の残り＞ウインドウ位置・大きさの復元）を削除

- [x] **アプリ（Electron）版：しおり・sys:の保存先をelectron-storeへ**（2026-08-09）
  - 今までブラウザ版と同じlocalStorage（`SaveMng`）のままで、アプリをアンインストールすると消えてしまっていた（`todo.md`）。`appMain_cmn.ts`に`Store`/`Store_isEmpty`/`Store_get`/`flush`のIPCハンドラは以前から用意されていたが、レンダラ側から一度も呼ばれていない死んだ配線だったので、今回それを繋いだ
  - **設計方針**：`SaveMng`が持つ「メモリキャッシュ＋500msデバウンスflush」という構造はそのまま活かし、**永続化の輸送層だけ差し替えられる**ようにした。`SaveMng`はもう`localStorage`も`electron-store`も知らない——`storeLoad(ns)`/`storeFlush(ns, data)`という2メソッドの新しい型`T_SaveStore`に委譲するだけになった（`SaveMng.ts`から`../sn/localStore`への依存を削除）
  - `SysBase`に`storeLoad`/`storeFlush`の**既定実装**（今までの4キーlocalStorage形式をそのまま移設。本家と互換のキー形式なので触っていない）を追加し、`close()`/`window()`/`capturePage()`と同じ「既定はno-op/ブラウザ動作、`SysApp`が上書き」パターンに揃えた。`SysApp`（`app.ts`）は`storeLoad`/`storeFlush`をIPC（`Store`/`Store_isEmpty`/`Store_get`/`flush`）経由のelectron-store実装で上書きする
  - electron-store側は`sys`/`mark`/`kidoku`/`storage`を分けず、**`T_DATA4VARI`を1つのJSONブロックとしてまるごと**保存する（`flush`ハンドラが`st.store = o`で丸ごと置き換える既存の作りに合わせた。ブラウザ版の4キー分割はSysWeb・本家互換用途なのでそのまま）。保存先はelectron-storeの既定（`userData`直下）で、`todo.md`が触れていた`userdata/storage/`という本家の実ファイル配置とは揃えていない（他に何もそのパスへ書いていないため、揃える実益が無いと判断）
  - **非同期化の影響範囲は最小限**：electron-store通信は必然的に非同期（IPC invoke）なので`SaveMng.load()`を`async`化したが、`flush()`（書き込み）はそれ以外の呼び出し元と同じく「待たずに投げる」ままにした——electron-storeへの書き込みIPCも待たずに`void`で投げるだけで、同期API（`getMark`/`setMark`/`getFile`/`putFile`等）は一切変えていない。`load()`のawaitが要る呼び出し元は`ScriptMng#loadSaveData`1箇所だけで、そこは元々`async #load()`の中なので影響が連鎖しなかった
  - `ScriptMng`のコンストラクタでは`#saveMng`フィールド初期化子が`this.sys`（コンストラクタのparameter property）を参照するとTS2729（使用前初期化）になったため、フィールド宣言から初期値を外しコンストラクタ本体でローカル引数`sys`を使って代入する形にした
  - テスト：`test/SaveMng.test.ts`を`storeLoad`/`storeFlush`の最小インメモリ偽物（`T_SaveStore`実装）に差し替え（実`SysBase`は`window`参照を持つ副作用がありbunテストでは読み込めないため）。localStorageの実キー形式を検証していた`flush_writesUpstreamCompatibleKeys`は削除——同じ内容は`save.e2e.ts`（`- mark`/`- kidoku`キー）と`sys.e2e.ts`（`- sys`キー、前項で追加）が実ブラウザ経由で既に見ている。単体テスト1520件→1519件（1件削除・全体は変わらず1件減）、型チェック（`tsc --noEmit`／`-p test/e2e`）・E2E193件はいずれもパス
  - **electron-store経由の実IPC往復は未検証**：`tmp_blues`を`electron-vite build`しPlaywrightの`_electron`で起動を試みたが、このサンドボックス環境にディスプレイが無くElectronのGUIプロセスが起動できず（`Process failed to launch!`）確認できなかった。ロジック自体は`appMain_cmn.ts`の既存ハンドラをそのまま呼ぶだけで新規処理は無いが、実機（`npm run app`等）での動作確認は別途必要
  - `todo.md`の該当行（アプリ版の残り＞electron-store化）を削除

- [x] **パッケージ版（Electron）のアセット読み込み**（2026-08-09）
  - テンプレ`tmp_blues`は本番時`w.loadFile(…)`でレンダラを開くため、ページのオリジンが`file://`（asar内）になる。Chromiumの`fetch()`は`file:`スキームを受け付けないので、**`prj.json`/`path.json`の読み込みが即座に失敗しパッケージ版は起動すらしない**状態だった。`electron-vite dev`（`http://localhost:5173`）でしか動作確認していなかったのはこのため
  - 既存の`appMain_cmn.ts`の`fetch`/`fetchAb` IPCハンドラ（`=== vite-electron 用コード ===`とコメントされたもの）は中身がNodeの`fetch`（undici）で、こちらも`file:`未対応のため目的に使えなかった
  - 対応は2層。**1. `app://`カスタムプロトコル**（根本解決）：`appMain`に`registerScheme()`（`app`の`ready`前、`protocol.registerSchemesAsPrivileged()`で`standard`/`secure`/`supportFetchAPI`を持つスキームとして登録）と`handleScheme(dirRenderer)`（`ready`後、`protocol.handle()`でリクエストパスを`dirRenderer`配下へ解決し`net.fetch()`で返す。パストラバーサル対策として解決後のパスが`dirRenderer`配下かを検証）を追加。オリジンがhttp相当になるので、`fetch`だけでなく`@font-face`・`<iframe srcdoc>`の相対解決・`index.html`のCSP `default-src 'self'`もdevと同じ挙動になる。テンプレ側（`tmp_blues/src/main/main.ts`）は`registerScheme()`をトップレベルで呼び、`loadFile`を`loadURL('app://bundle/index.html')`に変更
  - **2. `SysBase.fetch`フック**（土台）：本家`skynovel_esm/src/sn/SysBase.ts:96`と同じ形で`readonly fetch = (url, init)=> fetch(url, init)`を追加し、`T_SysRoots`にもシグネチャを追加。戻り値が生の`Response`なので、既存の`.text()`/`.json()`/`.arrayBuffer()`/`.statusText`がそのまま通り、直呼びしていた`Config.ts`/`ConfigBase.ts`（2箇所）/`ScriptMng.ts`（`[loadplugin]`・シナリオ読込）を`sys.fetch(…)`経由に、`FrameMng`/`SndMng`はコンストラクタへ第2引数で受け取る形に置換。`Sprite.ts`（アニメpngシートの`.json`）だけはReactコンポーネント3箇所から呼ばれ`sys`が届かないため、モジュールレベルの差し替え口（`setFetch()`）を`SysBase.loaded()`から一度だけ注入する形にした。`SysApp`では`fetch`をoverrideしない（`app://`で素の`fetch`が動くため、`T_FETCH`という`Response`でない型のIPCへ寄せる必要が無い）。今すぐの用途は無いが、`todo.md`の**暗号化アセット**対応時にここへ復号処理を差し込む土台になる
  - 通さなかった箇所：`Snapshot.ts`の`toDataUri()`は既に画面に出ている`<img>`のsrc（暗号化構成でも復号済みのBlob/data URL）を読むだけなので、二重復号を避けるため素の`fetch`のまま残した
  - ついでに`FrameMng.ts#srcOf()`の絶対URL判定（`/^(?:https?:|\/|data:)/`）に`app:`が無く、フレームHTML内の完全修飾URLが誤って`searchPath()`へ流れる穴があったので、任意スキームを見る形（`/^(?:[a-z][a-z\d+\-.]*:|\/)/i`）へ広げた
  - 型チェック（`tsc --noEmit`／`-p test/e2e`）・単体テスト1519件はいずれもパス。**実機（`tmp_blues`での`npm run app_bld`→`out/`起動、`npm run pkg:mac`）は未検証**（サンドボックスにディスプレイが無くGUI起動不可）。特に音声（`fetch`＋`decodeAudioData`）・`@font-face`・`[add_frame]`のiframeとその中の画像は要確認（`todo.md`へ）

- [x] **セーブデータの暗号化（第1段階：プラグイン注入機構の配線＋セーブ層の暗号化）**（2026-08-09）
  - `todo.md`「しおり・システム系の残り＞暗号化」に着手。本家は暗号アルゴリズムの実体をコアに持たず、外部プラグイン（`snsys_pre`）が`SysBase.loaded()`経由で`setDec`/`setDecAB`/`setEnc`/`getStK`/`getHash`を注入する設計（秘匿性のため）。bluesnovelもこの方式を踏襲するが、丸写しはせず**必要なものだけに絞った**：`setDec`/`setEnc`/`getHash`の3つだけを`T_PluginInitArg`（`src/sn/CmnInterface.ts`）に残し、一般プラグイン向け（`addTag`/`addLayCls`/`getInfo`/`getVal`/`resume`/`render`/`searchPath`）は`[loadplugin]`がCSS専用で受け皿が無いため削除（`todo.md`へ）。`getStK`も削除——本家はelectron-storeの`encryptionKey`に使うが、bluesnovelはElectron版もブラウザ版と同じ`enc()`経路に統一し**新規ライブラリなしで経路を1本にする**方針にしたため消費先が無い。重複していた`getInfo`/`addTag`の二重宣言、`setDecAB`の2オーバーロードも整理（第2段階＝アセット暗号化で入れ直す）
  - `SysBase.loaded()`（`src/sn/SysBase.ts`）が`hPlg`を捨てていて（`...[_hPlg,]`）プラグインの`init()`を一度も呼んでいなかったのを配線。`prj.json`/`path.json`の読込（`Config.generate`）より**前**に`snsys_pre`だけ先取りして`init()`をawaitする（本家`SysBase.ts:49-50`と同じ順序。これらの読込が既に`sys.dec()`を通るため）
  - ついでに見つかったバグ修正：**シナリオ（`.sn`）本体だけが`dec()`を通っていなかった**（`ScriptMng.ts#fetchScript()`が`res.text()`を素通し）。prj.json/path.jsonは元から通っていたのに、肝心のスクリプトが漏れていた
  - `SaveMng.ts`：`T_SaveStore`に`crypto`/`enc`/`dec`を追加し、**暗号化はSaveMng側に一括**（本家はSysWeb側に分散）。輸送層のペイロード型`T_DATA4VARI_TRANSPORT`（各フィールドが`元の型 | string`）を新設し、crypto時は`sys`/`mark`/`kidoku`/`storage`を種別ごとに`JSON.stringify`→`enc()`した文字列にする（本家`SysWeb.ts:79-88`と同じく丸ごと1本にまとめない）。localStorageのキーもcrypto有無で`_enc`サフィックスを分け、開発中の切り替えで平文を暗号文として読む事故を防ぐ（**crypto:false時のキー・形式は変更なし＝本家データ互換を維持**）
  - `storeFlush`を非同期化（`enc()`を挟むため。Electron版はIPCで元々非同期）。**立て続けの`flush()`が到着順に着地するよう`#pWrite`で直列化**——JSON化は同期部分で即座にスナップショットを取り、非同期チェーンへ積む。失敗を次の書き込みへ持ち越さない`.catch`も追加。テストのタイミング調整用に`flushed(): Promise<void>`（直近の書き込み完了を待つ）を追加
  - `[export]`/`[import]`：`export()`はcrypto時のみ`enc()`をかけ`no_crypto_`接頭辞を外す（本家`SysWeb.ts:191`と同じ判断基準）。`import()`はまず`JSON.parse`を試し、失敗したら`dec()`を通して再パース——crypto有効ビルドでも平文（`no_crypto_`付き）のプレイデータを読める、本家より寛容な設計
  - `src/app.ts`（`SysApp`）のウインドウ位置復元処理（`SaveMng`がまだ無い段階で`storeLoad()`を直接覗く箇所）も、crypto時に文字列で返ってくるフィールドを復号できるよう`decTransportField()`（`SaveMng.ts`からexport、`SaveMng`の`#decTransport`と共有）を通す形に修正。ここを見落とすとcrypto有効時にウインドウ位置復元だけ壊れるところだった
  - `preload.ts`/`appMain_cmn.ts`のIPC型（`flush`/`Store_get`、electron-storeの`Store<T>`）も`T_DATA4VARI_TRANSPORT`に追従
  - 改竄検査（`ConfigBase.ts:186-201`、`crypto`時の`path.json`ハッシュ照合）は`getHash`の配線で動くようになった。ついでに書くだけで読まれていなかったデッド変数`hFn2Ext`を削除
  - テスト：`test/SaveMng.test.ts`にcrypto:true版の偽物（`btoa`/`atob`は日本語を扱えないため`Buffer`のbase64で代用）を追加し、暗号化往復・デバウンス越しの順序保証・crypto:false時にオブジェクトのまま保存されることを検証。単体テスト1519件→1522件、型チェック（`tsc --noEmit`／`-p test/e2e`）・E2E193件はいずれもパス（**crypto:falseのまま経路が完全に現状維持であることの証明**）
  - **アセット暗号化（画像・動画・音声・アニメpngシート・`[add_frame]`）と、それを実証するE2Eフィクスチャ生成・改竄検査の実地確認は次段階**（`todo.md`へ）

- [x] **セーブデータの暗号化（第2段階：画像・動画アセットの暗号化）**（2026-08-09）
  - `todo.md`「暗号化の残り」のうち画像・動画（`[lay fn=]`の静止画・動画、`[add_face]`の差分絵）に着手。音声・アニメpngシート・`[add_frame]`のHTML/フレーム内画像は対象外（`todo.md`へ残す）
  - `T_PluginInitArg`（`src/sn/CmnInterface.ts`）に`setDecAB`を追加。**本家は`{ext_num, ab}`を返させ拡張子情報まで秘匿する**が、bluesnovelは`path.json`が持つ論理名（ファイル名）自体を秘匿対象にしていないので、プラグインは複号だけ担当すればよい形にした（拡張子→MIME判定は呼び出し側のURLから行う）。`T_SysBase`にも`decAB(ab): Promise<ArrayBuffer>`を追加し、`SysBase.ts`の`loaded()`で`setDecAB: f=> {this.decAB = f}`を配線。既定実装は恒等変換（`Promise.resolve(ab)`）＝プラグイン未注入時は何も変わらない
  - `ScriptMng.ts`：`#applyAction`の`chgPic`ケースを、`sys.crypto`が`true`のときだけ非同期のBlob URL化経路へ分岐。**画像は`[add_frame]`のような停止点にしていない**（先読み自体が元から未対応で、切替時の一瞬の空白は`todo.md`で既知・許容済みのため）。まず`src: ''`で確定させてから、`fetch→decAB→Blob URL`が終わり次第差し替える
  - 連続して同じレイヤへ`[lay fn=]`が来た場合、非同期解決が入れ替わって古い方が新しい方を上書きしてしまう競合があるため、`nm:page`単位の世代カウンタ（`#picReqSeq`）を新設。解決が終わった時点で世代が一致しなければ（＝後発に追い越されていれば）そのstore更新は捨てる
  - 復号本体は`decryptPicUrl(url, fetch, decAB)`としてモジュール関数へ切り出し（`ScriptMng`のメソッドのままだと`SysBase`丸ごと・DOMが要りユニットテストできないため）。`data:`／`blob:`／`.json`（アニメpngシート。中の画像URLは別途平文で解決される仕組みなので今回は対象外）と、拡張子不明なものはfetchせずそのまま素通し。**revokeはしない**——本家`SysBase.ts`の`#genImage`も同じ判断で、コメントに「`onload`契機で`revokeObjectURL`すると暗号化構成でフレーム内の画像が出なくなる」実績が残っている
  - `GrpLayer.tsx`：アニメpngシート判定（`.endsWith('.json')`）と動画判定（`/\.(?:mp4|webm)$/`）を**`src`（解決済みURL）から`fn`（論理名）ベースへ変更**。crypto構成では`src`がBlob URL（拡張子情報を持たない）に化けるため、`src`のままだと種別判定が壊れる。`fn`はpath.json解決前の論理名で暗号化されても平文のまま保たれるので、判定の土台として使える
  - テスト：`test/ScriptMng_decryptPic.test.ts`（新規4件）。`decryptPicUrl`単体を対象に、空/`data:`/`blob:`/`.json`/拡張子不明はfetchを呼ばず素通しすること、画像・動画の既知拡張子（png/jpg/webp/mp4/webm）は`fetch`→`decAB`を経て`blob:`で始まるURLになることを見る。crypto:false経路（現状維持）は既存のE2E（`pic.e2e.ts`等）が変更なく通ることで担保。単体テスト1522件→1526件、型チェック（`tsc --noEmit`／`-p test/e2e`）はパス
  - **`pic.e2e.ts`の1件（`[lay fn=…]がpath.json経由で解決され、画像が表示される`の`naturalWidth`検証）が今回の変更と無関係に不安定**なことに気づいた（`git stash`で変更前コードに戻しても同じ形で失敗する＝既存のflaky test。`beforeEach`直後に`naturalWidth`を読みに行くタイミング依存と見られる）。今回の作業では深追いせず`todo.md`へ記録した
  - 音声・アニメpngシート・`[add_frame]`のアセット暗号化と、E2Eフィクスチャ生成（本家`mkPrjCrypto.mjs`相当）＋改竄検査の実地確認は次段階（`todo.md`へ）

- [x] **セーブデータの暗号化（第3段階：音声・アニメpngシート・`[add_frame]`のアセット暗号化）**（2026-08-09）
  - `todo.md`「暗号化の残り」のうち画像・動画で対象外にしていた3種に着手し、これでアセット暗号化が一巡した
  - **共通化**：第2段階で`ScriptMng.ts`に置いた`decryptPicUrl`（fetch→decAB→Blob URL化）を、循環import（`FrameMng.ts`は元から`ScriptMng.ts`にimportされる側）を避けるため新規`src/ts/Crypto.ts`へ切り出し。`ScriptMng`/`Sprite`/`FrameMng`の3箇所が同じ判定ロジックを共有する
  - **音声**（`SndMng.ts`）：`#decode()`が`fetch`→`decodeAudioData`の間で素通りしていたのへ`decAB`を挟むだけ。本家`SpritesMng.ts:213`と同じ位置づけだが、decode先が`AudioBuffer`でBlob URL化が要らないためSndMng専用に持たせた（画像・動画とは別枠）。コンストラクタへ第3引数として追加
  - **アニメpngシート**（`Sprite.ts`）：本家（`SpritesMng.ts:207-208`）は`.json`もテキストとして`sys.dec()`で複号している——bluesnovel側は前段階で「`.json`は平文のまま」という誤った前提を置いていたが、本家を読み直して訂正した。`loadSheet()`を`fetch→sys.dec('json', …)→JSON.parse→シート画像をdecryptPicUrlで複号`の順に変更。`setFetch()`と対になる`setDecFncs(dec, decAB)`をモジュールレベルに新設し、`SysBase.loaded()`から注入する（GrpLayer/TxtLayerはReactコンポーネントで`sys`を持たないため、この手の注入は`setFetch`と同じ形に揃えた）
  - **`[add_frame]`**（`FrameMng.ts`）も本家（`FrameMng.ts:107-118`／`200-220`）に倣い2箇所：HTML本体は`res.text()`を`sys.dec(url, …)`に通してから`srcdoc`へ、フレーム内`<img>`（`sn_repRes`フック経由）は`#srcOf()`を非同期化し`decryptPicUrl`を通す。**`searchPath()`で解決できたものだけ**crypto対象（本家の`#loadPic2Img`も同じ判定基準）——解決できずディレクトリ前置へ落ちる方は「枠に同梱しただけでpath.jsonに載らない画像」なので暗号化対象外のまま
  - コンストラクタ引数が増えた`SndMng`/`FrameMng`と、モジュール関数`setDecFncs`は`SysBase.ts`（`setFetch`のすぐ隣）と`ScriptMng.ts`の生成箇所から配線
  - テスト：`test/Sprite.test.ts`に`loadSheet_decryptsJsonAndSheetImageThroughInjectedFncs`を追加（`setFetch`/`setDecFncs`で注入した偽関数が正しい引数・順序で呼ばれ、シート画像URLが`blob:`になることを確認）。`test/ScriptMng_decryptPic.test.ts`は移動先の`src/ts/Crypto.ts`を指すようimport元だけ変更（中身は無変更）。`SndMng`/`FrameMng`は`AudioContext`/DOM依存が強く単体テスト対象外——crypto:false経路（現状維持）は既存のE2E・単体テストが変更なく通ることで担保。単体テスト1526件→1527件、型チェック（`tsc --noEmit`／`-p test/e2e`）はパス
  - 残りは`todo.md`の「E2Eフィクスチャ生成＋改竄検査の実証」のみ（実際に暗号化した音声・アニメpngシート・フレームアセットで通し読みする確認は未実施）

- [x] **セーブデータの暗号化（第4段階：E2Eフィクスチャ生成＋改竄検査の実証）、および前段階で混入していたリグレッションの発見・修正**（2026-08-09）
  - `todo.md`「暗号化の残り」最後の項目に着手。本家`mkPrjCrypto.mjs`相当として`test/e2e/app/mkPrjCrypto.ts`（`bun test/e2e/app/mkPrjCrypto.ts`で実行）を新設し、`test/e2e/app/prj_crypto/`（画像・音声・アニメpngシート・`[add_frame]`＋フレーム内画像を暗号化したフィクスチャ一式）と、使い捨て鍵の複号プラグイン`test/e2e/app/snsys_pre.ts`を生成した。**実プロジェクトの鍵と資材は持ち込まない**方針は本家と同じ。bluesnovelはdecABが`{ext_num, ab}`のような拡張子秘匿を行わず復号済み`ArrayBuffer`をそのまま返す設計のため、本家のような`.bin`への付け替えは不要——元の拡張子のまま中身だけAES-GCMで暗号化して置ける
  - `test/e2e/app/main.ts`に`?prj=crypto`時だけ`crypto:true`＋`snsys_pre`を注入する分岐を追加。`test/e2e/crypto.e2e.ts`（新規4件）で画像・アニメpngシート・音声・`[add_frame]`（HTML本体＋フレーム内画像）の4経路を1本のシナリオで通し確認
  - **この過程で、前段階（第2〜3段階）に混入していた2件のリグレッションを発見・修正した**（いずれも`anime.e2e.ts`/`movie.e2e.ts`という**既存の**E2Eをフルセットで流して初めて表面化。ユニットテストだけでは検出できなかった）
    - **1. `decryptPicUrl`が`crypto:false`でもBlob URL化してしまっていた**：`Sprite.ts`（アニメpngシート画像）と`FrameMng.ts`（フレーム内画像）が`crypto`の真偽を問わず常に`decryptPicUrl`を呼んでいたため、暗号化を使っていない既存プロジェクトでも無駄な`fetch`＋Blob生成が走り、`anime.e2e.ts`の「シート画像は実際に読み込まれる」等が壊れていた（`ScriptMng.ts`側は`if (!this.sys.crypto)`で早期returnしていたので気づかなかった）。`decryptPicUrl`自体に`crypto: boolean`引数を追加し、falseなら即座に元のURLを返すよう修正——呼び出し側の判断任せにせず、共通関数の入口で必ず弾く形にした。`Sprite.ts`は`setDecFncs()`にcryptoも一緒に渡すよう拡張、`FrameMng.ts`はコンストラクタへ`crypto`を追加
    - **2. `GrpLayer.tsx`のアニメpngシート・動画判定が`fn`（論理名）ベースで、原理的に常にfalseになっていた**：第2段階で「crypto構成では`src`がBlob URLに化けて拡張子情報を失う」という理由で`src.endsWith('.json')`／`/\.(?:mp4|webm)$/.test(src)`を`fn`ベースへ変更していたが、**アニメpngシートの`fn`は`[lay fn=anime]`のような拡張子なしの論理名**（path.jsonで「論理名→.json」「論理名.列x行→.png」に分かれる仕組みのため）で、そもそも`.json`を含まない。動画も同様の想定違いだった。正しい判定情報は`ScriptMng.ts`の`chgPic`ケースが`searchPath()`直後（Blob URL化するより前）にしか持てないため、`isSheet`/`isMovie`をそこで確定させて`T_CHGPIC`／ストア（`T_GRPLAY_DATA`）経由で`GrpLayer.tsx`へ渡す形に直した（`fn`・`src`どちらからも判定できないcrypto構成でも成立する）
  - 改竄検査（`ConfigBase.ts`の`path.json`内`:id`ハッシュ照合）は`test/ConfigBase_crypto.test.ts`（新規3件）で検証。`ConfigBase`は`protected constructor`かつ`T_SysRoots`という軽量インターフェースしか要求しないため、実`SysBase`（`window`参照を持ちbunでは読めない）を使わずテスト用サブクラス＋最小の偽`sys`で直接ロジックを叩けた（`SaveMng.test.ts`と同じ「その場で偽物を挿す」流儀）。crypto:true×ハッシュ一致／不一致／crypto:falseでチェック自体をスキップ、の3パターンを確認
  - `test/ScriptMng_decryptPic.test.ts`は`test/Crypto.test.ts`へ改名し、`decryptPicUrl`の新しい`crypto`引数ぶん（false時は画像拡張子でも`fetch`/`decAB`を呼ばず素通しすること）のケースを追加
  - 型チェック（`tsc --noEmit`／`-p test/e2e`）・単体テスト1527件→1532件・**E2E全197件**（今回新設の4件込み。フルセットで流したのは本作業が初めて）はいずれもパス
  - `todo.md`「暗号化の残り」が全項目完了し、見出しごと削除

- [x] **棚卸し：暗号化アセット項目の消し忘れと`arg.dip`を調査**（2026-08-09）
  - `todo.md`「アセット・基盤」に残っていた「暗号化アセット」の行は、直前のエントリで既に実装・完了していた内容の消し忘れだったため削除
  - `arg.dip`（本家のディップスイッチ機構。`arg.dip`のJSON文字列 or URLクエリ`?dip=`で`CmnLib.hDip`を埋める）を調査。本家`SysWeb.ts`が実際に消費するのは4項目：`expanding`（拡大有無。`Stage.tsx`は既に`argChk_Boolean(CmnLib.hDip, 'expanding', true)`で読む配線があるが、`CmnLib.hDip`自体を埋める処理がbluesnovelに無く常に既定値`true`のまま＝本家の既定と同じ結果で実害なし）・`oninit_run`（初期化後の自動実行制御。対象のギャラリー機能＝`data-prj`クリックで実行開始、がbluesnovelに未移植）・`dbg`（デバッグ切替。`prj.json`の`debug.devtool`という別の仕組みで代替済み）・`port`（VSCode拡張連携ポート。`[dump_script]`と同じ理由で対象外）。`tmp_blues`/`tmp_esm_uc`とも`dip`を使っていないことも確認済み。**4項目とも配線する実益が無いと判断し、`arg.dip`機構自体は対応不要で決着**
  - `todo.md`の該当2行を削除

- [x] **調査：一般プラグイン機構（`addTag`/`addLayCls`等）の配線は対応不要と結論**（2026-08-09）
  - `todo.md`「しおり・システム系の残り」の次項目。`hPlg`（複数プラグイン注入の仕組み自体）はbluesnovelにも既にあり、テンプレ`tmp_blues/src/web.ts`が`plugin.json`から動的importして`new SysWeb(hPlg)`へ渡す配線まで揃っているが、`SysBase.loaded()`（`src/sn/SysBase.ts:32-39`）は`hPlg.snsys_pre`（暗号化プラグイン）だけを取り出して`init()`を呼び、**それ以外のプラグインは一度も`init()`されず捨てられている**
  - `tmp_blues`/`tmp_esm_uc`双方に実例（`src/plugin/humane/`）があり、これが一般プラグインフックの唯一の消費者。中身は`pia.addTag('notice', hArg=> {Humane.log(hArg.text); return false})`——**まさに`[notice]`用で、CLAUDE.mdに「`[notice]`はプロジェクト側プラグインなので対象外」と既に明記されている機能**。実プロジェクトが必要とする一般プラグイン機構の実例が、そもそも対応不要と決着済みの用途だった
  - 残る5フックのうち`render`/`resume`は本家がpixi.jsの`DisplayObject`/`RenderTexture`/Tickerを直接引数に取る設計で、React/DOMベースのbluesnovelには構造的に対応する概念が無い。`addLayCls`/`getInfo`/`getVal`/`searchPath`も実プロジェクト側に使用例なし
  - 以上より`T_PluginInitArg`を一般プラグイン向けに拡張する実益が現状無いと判断。`todo.md`の該当行を削除（`T_PluginInitArg`のコメントは元々この判断を先取りして書かれていたため、コード側の変更は無し）

- [x] **`[snapshot]`の残り（HTMLフレームが写らない件）：ドキュメント更新漏れを修正し、web版側の恒久的な制約として決着**（2026-08-09）
  - `todo.md`「しおり・システム系の残り」の次項目。`[add_frame]`の中身が写らない件自体は2026-08-09の別エントリ（アプリ版の`capturePage`対応）時点で「web版側の制約として残る」と既に結論が出ていたが、その`capturePage`対応（Electron版は`<img>`化SVGでなくウインドウ画素を直接撮るため、HTMLフレームの中身も写る）が`docs/tag.html`の`[snapshot]`セクションに未反映のままだった（CLAUDE.mdの「実装・変更したらマークを更新する」規約に反する状態）
  - `docs/tag.html`の`[snapshot]`セクションへ、アプリ版は`capturePage`で全レイヤ・表ページ・背景色未指定の素朴な撮影のときだけフレームの中身も写ること、それ以外（`layer`／裏ページ／`b_color`指定時）はDOM→SVG方式にフォールバックすること、web版はDOM→SVG方式の構造的制約（`<img>`化されたSVGはiframeを描画しない）でフレームの中身が写らないままであることを追記
  - web版の制約はブラウザの構造的な限界（本家web版も同じ結果）で、bluesnovel側の実装漏れではないため対応不能。`todo.md`の該当行を削除

- [x] **アプリ（Electron）版：`[update_check]`（更新チェック機能）を実装**（2026-08-09）
  - `todo.md`「しおり・システム系の残り」の次項目。本家`SysApp.ts:306`〜`:437`（`update_check`〜`#dl_comp()`）を移植。必要なIPC（`fetch`/`fetchAb`/`writeFile`/`showMessageBox`/`getInfo`）は既存の他機能から流用でき、新規のIPCハンドラ追加は不要だった
  - ロジック本体（`_index.json`/`.yml`の読み分け・バージョン比較・ダウンロード・ダイアログ文言）を新規`src/UpdateCheck.ts`へ切り出し、`fetch`/`fetchAb`/`writeFile`/`showMessageBox`を関数引数として受け取る形にした（`Crypto.ts`の`decryptPicUrl`と同じ流儀）。`app.ts`（`SysApp`）は`updateCheck(url)`のoverrideでIPC呼び出しを結線するだけの薄いラッパー
  - **本家の実装をそのまま移植し、追加実装はしなかった点**：`_index.json`/`.yml`はどちらも`sha512`フィールドを持つが、本家のコードを読むと取得はしていてもダウンロード後の検証には一切使われていない（コメントアウトされた分岐の痕跡のみ）。`todo.md`の従来の記述（「sha512検証」）は本家コードの実態と食い違っていたと判明。「移植時は本家<file>:<line>が仕様書」の方針に従い、bluesnovelも検証なしのまま移植した（ダウンロード実行ファイル自体の署名検証はOS側＝Gatekeeper／Windows SmartScreenの領分という判断はコメントに明記）
  - **本家との相違点はもう1つ**：アイコンパスの`doc`/`doc_crypto`切替（本家はセーブ暗号化構成によって配布フォルダを分ける）。bluesnovelはElectron版・ブラウザ版のセーブ暗号化を単一の`enc()`経路へ統一済みで配布フォルダ構成自体が本家と異なるため、`doc`固定にした
  - テスト：`test/UpdateCheck.test.ts`（新規9件）。IPC呼び出しをすべて偽関数に差し替え、`_index.json`が見つかる／自機種向けファイルが無く同OS一覧へ落ちる／`.yml`へフォールバック（Mac版は`latest-mac.yml`）／バージョン一致で何もしない／確認ダイアログでCancelされたら中断／`.yml`も無ければ`debugLog`次第でthrowするか黙って終わる、の各経路を検証。`app.ts`自体は`window`参照を持ちbunでは読めないため対象外（`SaveMng.test.ts`等と同じ事情）。単体テスト1532件→1541件、型チェック（`tsc --noEmit`／`-p test/e2e`）はいずれもパス
  - `docs/tag.html`の`[update_check]`エントリを🟡から🟢へ更新（未対応→対応済みの説明、本家との相違点を明記）。`todo.md`の該当項目（「アプリ（Electron）版の残り」の唯一の子項目だったため見出しごと）を削除
  - **実機（`npm run app`等でのダウンロード往復）は未検証**：サンドボックス環境にディスプレイが無くElectronのGUIプロセスを起動できないため。ロジック自体はIPC層の既存ハンドラ（`fetch`/`fetchAb`/`writeFile`/`showMessageBox`）をそのまま呼ぶだけで新規処理は無いが、実際の配信URL・ダイアログ表示・ダウンロード完了の確認は別途必要

- [x] **禁則処理（`[lay kinsoku_sol=/kinsoku_eol=/kinsoku_dns=/kinsoku_bura=]`、`bura`の全ブラウザ対応）を実装**（2026-08-09）
  - `todo.md`「文字組みの残り」の該当項目。従来は行分割そのものをブラウザ任せ（CSSの`line-break: strict`）にしており、禁則文字集合をカスタマイズする手段がCSSに存在しなかった。`bura`（ぶら下げ）も`hanging-punctuation: allow-end`任せでChromeでは効いていなかった
  - 本家`skynovel_esm/src/sn/Hyphenation.ts`を移植。純粋な判定アルゴリズム（`hyphAlg`/`hyphAlgBura`/`i2pi`、競合チェック）は`src/ts/Hyphenation.ts`へ、DOM計測・`<br>`挿入ループは`src/components/TxtLayer.tsx`（`mkKinCh`/`applyKinsoku`）へ分離した。**移植しなかったもの**：`break_fixed`系（`[l]`/`[p]`待ちマーカーの位置決め用。bluesnovelは待ちマーカーをReactの兄弟spanで別管理しているため用途が無い）、`record()`/`playback()`（`T_TXTLAY_DATA`へ載せればセーブ復元が自動で面倒を見るので専用コードは不要）、`#getChRects()`（Range一文字ずつの計測はしない）
  - **文字spanを`display: inline-block`化**してブラウザ標準の行分割・禁則（UAX #14）を無効化し、自前計算に一本化（本家`.sn_ch`と同じ手）。`[r]`由来の改行spanだけは`inline`のまま。副作用として、従来効いていなかった`[ch_in_style]`のtransform（x/y/scale/rotate）が効き始める（非置換インライン要素にtransformが適用されない仕様のため）ことと、英単語が本家同様に途中で分割されうることをPhase 0の実機確認で確認済み
  - **本家との計測方法の相違**：本家はRangeで1文字ずつ矩形を取るが、bluesnovelは表示単位spanの矩形で折り返しを検出する（inline-block化で表示単位が内部で折り返さない原子的な箱になるため、これで足りる）。bluesnovelのT_CH（`Txt.ts`）は「1表示単位」が1要素（ルビ付きは親文字＋ルビで1要素）なので、`mkKinCh()`で「親文字1要素＋ルビ1要素」の2要素へ展開してから本家アルゴリズムへ渡す
  - 禁則の競合チェック（ぶら下げと行末禁則／分割禁止の重複はエラー）は`store.tsx`の`chgLay`で行う。エンジンはレイヤの現在値を保持しない純粋層のため、マージ後の値が要るこの判定はエンジン単体ではできない
  - **付随修正2件**：(a) `[clear_lay]`が`bura`を削除していたのを修正（本家`TxtLayer.ts:857`はclearLayでHyphenationに触らず、`docs/tag.html`の`bura`欄も既定値「現在値」と明記済みだった、既存の食い違い）。(b) `TxtLayer.tsx`の文字送り`useLayoutEffect`の依存配列に`r_align`が抜けていたのを追加（`bura`/`kinsoku_*`を足す過程で発見）
  - テスト：`test/Hyphenation.test.ts`（新規。本家`test/HyphTest.test.ts`の丸移植66件＋`scan()`単体5件）、`test/ScriptEngine_lay.test.ts`・`test/store_lay.test.ts`・`test/argdef_parity.test.ts`に追加、`test/e2e/kinsoku.e2e.ts`（新規。折り返し・`<br>`挿入・`bura`の実効・`[clear_lay]`後の継続・inline-block化を実ブラウザで確認）、`test/e2e/ruby.e2e.ts`の`lineBreak`確認を`display`確認へ差し替え
  - `docs/tag.html`の`[lay]`段落を更新（自前計算への移植、`bura`が全ブラウザで効くこと、英単語の途中分割という相違点、`break_fixed`系が未対応であることを明記）。`todo.md`から`kinsoku_*`関連の記述を削り、`max_row`/`break_fixed`系だけ残した
  - ユニットテスト1613件→1633件、E2E 17ファイル（既存分は無回帰。`movie.e2e.ts`の1件失敗はフルスイート並列実行時の既存flakyで、単体実行では再現せず無関係と確認）

- [x] **文字装飾タグ（`[ch]`/`[span]`/`[link]`/`[endlink]`/`[tcy]`/`[graph]`/`[ruby2]`/`[r]`）の`layer`/`page`対応**（2026-08-09）
  - `todo.md`「文字組みの残り」の最後のタグ属性項目。本家`LayerMng.ts:935 #getTxtLayer()`相当を`ScriptEngine.ts`に`#txtTarget()`として追加し、既存の`ScriptEngine.argPage()`を再利用。埋め込み命令のJSON（`#cmdTxt`）からは`layer`/`page`を除いて渡す（`[ch]`が`text`を除くのと同じ手）
  - **調査で潜在バグが1つ見つかった**：エンジンが持つ本文の蓄積`#hTxt`（しおり・`[er]`/`[clear_lay]`/`[clear_text]`が共有する内部状態）が表ページ専用のまま`[trans]`の表裏交換に追随していなかった。`[er]`を挟まずに`[trans]`すると、古い表の蓄積が残ったまま次の本文が継ぎ足され、前の場面の文が復活する（`A[l]`→`[trans]`→`B`が`AB`になる）。実テンプレは場面転換のたびに`[er]`を打つため露見していなかった。`page=`対応のため`#hTxt`を表裏2面（`#hTxtBk`追加）にするのと同時に修正できたので合わせて直した
  - `[trans]`の演出**完了時**（`ScriptMng`の`#beginTrans`/`#finishTrans`。`time<=0`は演出を経ないのでその場で）に`ScriptEngine#transDone(aLayNm)`を呼び、交換対象レイヤの表の蓄積を裏の内容へ合わせる。タグ実行時に呼ぶと`[trans]`自体は`'skip'`で読み進めが続くため、演出中に書いた本文が古い裏へ紛れ込んでしまう
  - **履歴（本文ログ）は本家と1点だけ意図的に違える**：本家`TxtLayer.ts:604`の`isCur`は同名レイヤの表裏どちらにも立つため裏ページの本文も履歴に入るが、こちらは現在レイヤの**表ページだけ**に限定した。理由は(a)履歴は「プレイヤーが読んだもの」で裏ページはまだ見えていない、(b)`[clear_text]`の改ページ判定が既に`nm===#curTxtLayer && pg==='fore'`（本家`LayerMng.ts:995`も同条件）で、記録側だけ裏を含めると履歴の改ページと噛み合わなくなるため
  - `docs/tag.html`：`[ch]`/`[graph]`/`[link]`/`[endlink]`/`[ruby2]`/`[span]`/`[tcy]`の bluesnovel 欄から「`layer`/`page`は未対応」を外した（他の未対応属性が残るタグは一覧の🟡マークをそのまま維持）。`todo.md`の該当行を削除
  - テスト：`test/ScriptEngine_txt.test.ts`・`test/Log.test.ts`・`test/ScriptEngine_trans.test.ts`・`test/ScriptEngine_save.test.ts`に追加。E2Eは`test/e2e/ruby.e2e.ts`（別レイヤ・裏ページへ実際に描かれること）と`test/e2e/trans.e2e.ts`（`[er]`を挟まない`[trans]`で前の場面の文が復活しない回帰テスト。`test/e2e/app/prj_trans/main.sn`にシーン追加）に1件ずつ追加
  - ユニットテスト1618件→1632件

- [x] **ルビ付き文字が1つ前の行/列に食い込む問題への対応**（2026-08-09）
  - `todo.md`「文字組みの残り」の1件目。禁則処理のため各文字を`display: inline-block`の`<span>`で
    個別にラップしている（`TxtLayer.tsx`）ため、外側の`line-height`をいくら指定しても効かないと
    実機検証で判明した：`<ruby>`の`<rt>`はブラウザのline box計算で**line-heightの外側に固定量で
    追加される**仕様で、`inline-block`要素は自身の実高さ（`<rt>`込み）でしか行に寄与しない。
    本家`TxtLayer.ts:272`が既定に`line-height: 1.5;`を持つのを試したが無関係（bluesnovelへ足しても
    行間は1px も変わらなかった）
  - 本家`TxtStage.ts`もpixi.js上に同じ`<span class="sn_ch">`＋`<ruby>`のHTML DOM要素を重ねて
    `getBoundingClientRect()`で計測する方式（`#htmTxt`）で、`gjqy`（ディセンダーの深い文字）用の
    補正`#lh_half`はあるがルビ用の補正は無い＝**本家もこの問題を未対応のまま抱えている**と判明。
    「本家に揃える」対応ではなく、bluesnovel独自の追加対応と割り切った
  - 対応：ルビ付き文字のspanへ`margin-block-start`（実測した`<rt>`の高さ）を足す
    （`TxtLayer.tsx`、`el.appendChild(frag)`直後・`applyKinsoku()`より前）。`margin-block-start`は
    横書きで`margin-top`・縦書き`vertical-rl`で`margin-right`に対応し、どちらの書字方向でも
    「1つ前の行/列」側を指すため、縦書きでも列を跨いで正しい方向に効く（`test/e2e/app/prj_argdef/`
    の縦書きシーンで実機確認。禁則処理の折返し判定はインライン方向の座標だけを見るため無関係）
  - **行間そのものが揃うわけではない**（ルビ行だけ広がるのは変わらない）。ルビが上の行/列に
    重ならないよう安全マージンを確保する対応であり、`ruby-position`等の詰めは引き続き
    `todo.md`に残す
  - `test/e2e/ruby.e2e.ts`に1件追加（`marginBlockStart`が実測`<rt>`高さと一致することを確認）

- [x] **`[lay width=/height=]`を実装、todo.mdの棚卸し**（2026-08-10）
  - `todo.md`「タグ・変数の残り」の先頭2項目（`[lay b_pic=…]`の残り＝枠画像に合わせた文字表示領域の
    自動サイズ調整、トゥイーンのwidth/height）が揃って`[lay width=/height=]`自体の未実装を前提に
    ブロックされていたので、まずここへ着手した。組み込み変数`const.sn.lay[N].width/.height`が実寸
    でなく1/0で代用していた件も同時に解けた
  - **本家調査で、`width`単独指定は本家自身にバグがあると判明**：`GrpLayer.ts:88-91`が
    `if ('width' in hArg || 'height' in hArg)`という単一ORブロック内で両方に
    `argChk_Num(hArg, 'height', 0)`相当を代入するため、`height`未指定だと`0`が入り、pixiの
    `Sprite.set height`が`scale.y = 0`にして絵が縦潰れで消える（`CmnLib.ts:81-86`の
    `argChk_Num`は未指定時に`0`を返しつつ`hArg`にも書き込む）。一方`TxtStage.ts:219-220`
    （文字レイヤ側）は`'width' in hArg`／`'height' in hArg`を独立に見ており、この潰れは
    画像レイヤだけの現象。**bluesnovelは本家のこのバグを移植せず**、本家自身が`[button]`
    （`Button.ts:287-296`）で採っている「独立if＋未指定は自然サイズ維持」の形に揃えた
  - `ScriptEngine.ts`の`T_LAY_STY_ARG`・`Lay.ts`の`T_LAY_STY`/`A_LAY_STY_KEY`へ`width`/`height`を追加。
    `#argPos()`（0.0〜1.0を画面比率に変換する位置属性用の変換）は通さない：本家でも比率変換は
    left/center/right/s_right/top/…だけの仕様で、width/heightは素の`argChk_Num`のため
  - `GrpLayer.tsx`：`sty.width`/`sty.height`が指定された**軸だけ**`<img>`/`<video>`へ100%を当てて
    箱（div0）に合わせる。片方だけの指定なら他方はCSSの`auto`（自然サイズ）のまま。差分絵（`aFace`）
    は対象外（本家もcsvの先頭スプライトにしか適用しないため常に自然サイズ）
  - **`b_pic`の自動サイズ調整**（本家`TxtLayer.ts:396-414 setMySize()`相当）：`TxtLayer.tsx`が
    `BtnLayer.tsx`の`natBPic`と同じ流儀（`new Image`+`onload`+aliveフラグ）で枠画像の自然サイズを
    実測し、`[lay width=/height=]`が無い軸だけ箱のサイズに反映する。**明示指定が常に勝つ**よう
    揃えた：本家は`#txs.lay()`の後に`#drawBack()`が走るので同じ`b_pic`を再指定すると`setMySize()`
    が呼ばれず明示指定が生き残るという順序依存の罠があるが、`[button]`の`btnBoxSize()`
    （`o.width ?? natSrc?.w`）と同じ形にしてこの罠を持ち込まなかった
  - **`[tsy width=/height=]`**：`Tsy.ts`の`A_TSY_PRP`へ追加。CSSの既定（`auto`）に対応する数値が
    無いため、`H_TSY_DEF`の型を`{[K in T_TSY_PRP]?: number}`に変え、width/heightはキーを持たせない。
    `ScriptMng.#beginTsy()`で`cur[k] ?? H_TSY_DEF[k]`が`undefined`なら
    「`[lay width=…]`で寸法を明示したレイヤにしか使えません」と例外にする（0から伸びる驚きの
    挙動より、書き間違いをその場で知らせる既存の流儀に合わせた）
  - `ScriptMng.ts`の`const.sn.lay[N].<fore|back>.width/.height`：`[lay width=/height=]`で明示した
    レイヤはその値を返し、未指定レイヤは従来どおり表示物の有無を1/0で代用
  - テスト：`test/ScriptEngine_lay.test.ts`に6件、`test/store_lay.test.ts`に1件（`[clear_lay]`が
    width/heightも消すこと）、`test/argdef_parity.test.ts`の`A_CSS_DEF`へ理由付きで追加
    （本家の既定`0`はそのまま採らないことを明記）。E2Eは`test/e2e/lay.e2e.ts`
    （`prj_lay`に`waku.png`を追加。箱サイズ・単独指定で潰れないこと・b_pic自動サイズ・明示指定が
    勝つことの4件）、`test/e2e/pic.e2e.ts`（`prj_pic`のbg.pngを実際に拡縮。naturalサイズは
    変わらないことも確認）、`test/e2e/tsy.e2e.ts`（`prj_tsy`に`[lay width=]`済みレイヤを動かす
    シーンを追加）。`test/e2e/snPage.ts`に`grpBoxStyle`/`imgBoxStyle`/`hasInlineStyle`
    （インラインstyleの有無で「そもそも書いていない」ことを判定。算出値だと未指定でも
    `0px`等が返ってしまい判定できないため）を新設、`layNum`の対象に`width`/`height`を追加。
    単体テスト1638件、E2E全211件（フルセットで回帰なし確認済み）
  - `docs/tag.html`：`[lay]`共通属性表へ`width`/`height`の行を追加し、bluesnovel欄に対応した属性・
    本家との相違（潰さない）・`b_pic`自動サイズを追記。`[tsy]`欄の「未対応：width/height」を、
    対応と制約（`[lay width=]`を先に書いたレイヤ限定）の記述へ差し替え
  - `todo.md`から該当2項目を削除、組み込み変数の項目を現状に合わせて更新

- [x] **`[lay pl=/pr=/pt=/pb=]`（文字表示領域の内側余白）を実装**：`Grammar.ts`の`TArg`には
  以前から`pl?/pr?/pt?/pb?`の型定義だけがあり、`ScriptEngine.ts`の`case 'lay':`では一度も
  読まれていなかった（未配線のプレースホルダ）。`ScriptEngine.ts`（`T_LAY_STY_ARG`・`case 'lay':`）→
  `store.tsx`（`T_LAY_STY_ARG`・`chgLay`の文字レイヤ専用バリデーション・`clearLay`での既定復帰）→
  `TxtLayer.tsx`（`T_TXTARG`/`T_TXTLAY_DATA`・`styBox`で指定した辺だけ`paddingLeft`等を上書き）→
  `Stage.tsx`（props受け渡し）の順に、既存の`b_color`/`style`と同じ「文字レイヤ専用・書かれた
  属性だけ上書き」の流儀で配線した
  - **`box-sizing: border-box`化は見送った**：本家`TxtStage.ts`は`width/height`を外枠サイズ、
    `padding`をその内側と解釈する（border-box相当）が、bluesnovelの既定`padding: 1em 1.5em`は
    `font-size: xxx-large`基準で左右72px・上下48pxにもなり、`[lay b_pic=…]`の自然サイズ自動調整
    （`waku.png`の80×40）のように余白より小さい`width`を指定する既存機能で「content box幅が
    負にできず、padding分だけの大きさへ潰れる」というCSSの仕様に直撃した（実際にE2E
    `[lay b_pic=…]は文字表示領域を枠画像の自然サイズへ自動調整する`が80pxのはずが144pxで失敗する
    形で再現）。bluesnovelは元々「`width`はエンジンが実寸を知らない中身の寸法」という流儀（画像
    レイヤと同じ）なので、**`content-box`のまま`padding`は`width`の外側に足される**仕様で確定した。
    本家との完全一致（縦書き時の行数・余白）はこの解釈差が残るぶん未達だが、シナリオ側が
    `pl=/pr=/pt=/pb=`で明示すれば余白は制御できるようになった
  - テスト：`test/ScriptEngine_lay.test.ts`に`lay_padding`、`test/store_lay.test.ts`に
    `chgLay_paddingOnGrpLayerThrows`／`clearLay_dropsPadding`。E2Eは`test/e2e/argdef.e2e.ts`
    （`prj_argdef`に`p`レイヤを追加）で`pl/pr/pt/pb`の算出paddingと、content-boxのため
    `width`が中身の幅のまま保たれる（`offsetWidth === width + pl + pr`）ことを確認。単体テスト
    1641件、E2E全212件（フルセットで回帰なし確認済み）
  - `docs/tag.html`：`[lay]レイヤ設定(文字レイヤ)`の表へ`pl`/`pr`/`pt`/`pb`の4行を追加
  - `todo.md`の「文字組みの残り」から余白配線の分を整理。ルビ付き行の行間不揃い（前後で行送りが
    非対称になる問題）は、対称に配分するCSS調整では解消できず全行の行送りを最初から均一に確保する
    設計変更が要ると分かったため、`max_row`実装とセットで扱う方針を明記のうえ残す

- [x] **画像の先読み**を実装：`<img>`のsrcを差し替えるだけなので切替時に一瞬空白になりうる
  （crypto:true構成では`ScriptMng.ts`の`case 'chgPic':`が復号fetchの間`src: ''`を経由するぶん、
  空白がより目立っていた）。todo.mdに書かれていた設計方針案（列挙はpure関数、fetchはUI側）通りに
  2段構成で実装した
  - `ScriptEngine.ts`に`peekUpcomingPicFn()`を追加：現在位置から次の停止点
    （`[l]/[p]/[s]/[waitclick]`）またはスクリプト終端までの間に出てきそうな画像の論理名`fn`を
    集める**実行を伴わない走査**。本家`SpritesMng`に専用の先読みタグは無く、`Loader`の
    ロード済みキャッシュ＋「ロード完了まで差し替えない」制御が実体なので、そのまま移植できる
    仕組みは無かった。`[if]`の両分岐とも拾い（実際にどちらへ進むかは実行しないと分からないため
    多めに拾う）、`&式`／`%マクロ引数`で書かれた値は解決できずそのまま無視するbest-effort。
    `[lay face=…]`は走査中に見つけた`[add_face]`も含めて実体の`fn`へ解決する
  - `ScriptMng.ts`に`#preloadUpcomingPics()`を追加。`#runStep()`が停止点に達した直後
    （`last?.t !== 'loadScript'`かつ`! engine.atEnd`の分岐、従来からある「本当に止まった」判定
    そのまま）に呼ぶ。`Map<url, Promise<string>>`の`#picPreloadCache`を新設し、non-crypto構成は
    `new Image().src = url`でブラウザの標準HTTPキャッシュを温めるだけ、crypto構成は
    `#decryptPic(url)`（fetch→復号→Blob URL化）を前倒しでキャッシュに積む。`chgPic`ケース側は
    新設の`takePreloaded()`でキャッシュを先に引き（無ければ従来どおりその場で`#decryptPic`）、
    使ったエントリはその場で捨てる（無制限に溜めない）。`searchPath`の失敗（サーチパスに無い画像）は
    先読み側では黙って諦め、実際に使われる時にあらためて`myTrace`でエラーを出す（同じエラーの
    二重表示を避けるため）
  - テスト：`test/ScriptEngine_preload.test.ts`（新規、7件）で`peekUpcomingPicFn()`の列挙規則
    （次の停止点で打ち切る・`pic`は`fn`の別名・`face`解決・`&`/`%`無視・`[if]`両分岐・
    スクリプト終端で空）を検証。E2Eは既存の`test/e2e/crypto.e2e.ts`・`test/e2e/pic.e2e.ts`が
    無改変のまま通ることでキャッシュ経路に回帰が無いことを確認（新規のプリロード専用E2Eは、
    実際に空白が縮んだかの検証がタイミング依存で壊れやすいため見送り、todo.md含め本来
    「実機で要確認」としていた項目でもあるので実機確認に委ねる）。単体テスト1648件、
    E2E全212件（フルセットで回帰なし確認済み）

- [x] **`parsimmon`依存を除去**し、`src/ts/ExprEval.ts`を手書きのトークナイザ＋Pratt parser
  （優先順位登坂法）に置き換えた。README「UNMAINTAINED」明記・2021-12から更新停止のライブラリで、
  使用箇所はこの1ファイルのみだった（低優先度の技術的負債としてtodo.mdに積んであったもの）
  - **リスクを抑えるため、文法（各トークンの正規表現・変換ロジック）と評価器（`#calc`/`#hFnc`
    ディスパッチテーブル）は一切変更していない**。変えたのは「文字列→AST」の組み立て方だけ：
    parsimmonの`alt`/`seq`/`seqMap`/`lazy`/`of`によるコンビネータ合成を、`#tokenize()`
    （トークン列への分解）と`#parseToAst()`（優先順位登坂法によるAST構築）の2関数に置き換えた。
    生成するASTの形（`[opcode, ...operand]`の入れ子配列、リーフは`['!num!'|'!str!'|'!bool!', 値]`）は
    従来と完全に同一で、`#hFnc`のディスパッチキー（`'+'`/`'**'`/`UnaryNegate`/`PrefixInc`等）も
    そのまま流用できる形にした
  - 本家の優先順位表（PREFIX関数呼び出し→POSTFIX `++`/`--`→PREFIX `!`/`~`/`++`/`--`/単項`-`→
    `**`→`*`/`/`/`¥`/`%`→…→`||`→`:`→`?`の重なり順）を、`parseUnary()`の自己再帰チェーン
    （前置演算子の連続適用。「`- - -4`」等）と、`H_BINOP`優先順位表を引く`parseExpr(minBp)`の
    標準的な優先順位登坂ループへ対応させた。`:`/`?`は特別扱いせず**ただの右結合2項演算子**として
    扱う（単独の`"4 : 10"`が構文としては通り、評価時に`#hFnc[':']`が無条件に例外を出す、という
    元の設計をそのまま踏襲——`?`の直後に`:`があるかの整合性チェックは元から評価側の責務だった）
  - 数値・`null`・真偽値・文字列（`"..."`/`'...'`/`#...#`の3種、エスケープ文字`ce`）・変数参照
    （名前空間`tmp:`/`sys:`/`game:`/`save:`/`mp:`、`.`区切り・`[...]`添字の繰り返し、`@str`終端）・
    関数呼び出し（ASCII識別子の直後に空白無しで`(`が来た時だけ）の各正規表現・変換処理は
    本家`PropParser`のものをそのまま移植
  - **実装中に踏んだ罠**：整数除算`¥`（半角ではなく全角記号。非ASCII）は「空白・ASCII記号以外は
    全部許す」という変数名の文字クラスにも該当してしまい、演算子判定より変数判定を先に試すと
    `"10 ¥ 4"`が壊れる（`¥`を変数名として食ってしまう）。演算子・括弧の判定を変数参照より
    先に行うよう順序を直して解消した
  - テスト：本家`test/PropParser.test.ts`を丸ごと移植した`test/ExprEval.test.ts`（266件、
    数値計算・比較・変な文法・文字列・変数・連想配列・変数埋め込み・不具合修正の再現ケースまで
    網羅）が無改変のまま全件通過。加えて`test/uc_goal.test.ts`（フルサンプルシナリオを
    エンジンだけで走らせる到達目標テスト）と、単体テスト1648件・E2E全212件（フルセットで
    回帰なし確認済み）
  - `package.json`から`parsimmon`・`@types/parsimmon`を`bun remove`で除去

- [x] **オート読みの待ち時間カウントを文字送り演出の完了後から開始するよう修正**（2026-08-10）
  - 従来は`[l]`/`[p]`の停止点に達した時点（`ScriptMng#scheduleResume()`が呼ばれた瞬間）からタイマーを
    仕込んでいた。だが文字送り演出（GSAP、`TxtLayer.tsx`）は非同期に進んでいるため、演出が待ち時間
    より長い設定だと**演出の途中でオート読み・既読スキップが次へ進んでしまう**不具合があった
    （本家`Reading.ts`のl()/p()は演出完了後からカウントする）
  - `ScriptMng`に`#pendingResume`を新設。`#scheduleResume()`は`$fncs.isTyping()`が`true`なら
    タイマーを仕込まずここへ退避し、新設の`onTypingDone()`（文字送り完了の通知を受けて呼ばれる）で
    ようやく`#startResumeTimer()`する形に分けた。`cancelAuto()`でも一緒に破棄する
  - `T_INIT_FNCS`（`store.tsx`）へ`isTyping: ()=> boolean`を追加。ストアの`isTyping`はboolean値その
    ものなので、そのままPickすると`attachTsx`実行時点のスナップショットで固まってしまう。
    `Main.tsx`側で`isTypingRef`（useRefで都度更新）を挟み、関数越しに最新値を読ませることで解決
  - 完了通知は`Main.tsx`の`useEffect(()=> {if (! isTyping) scrMng.onTypingDone()}, [isTyping])`。
    `isTyping`は画面全体で1つのストア値（複数`TxtLayer`が共有）なので、この1本の監視で足りる
  - `todo.md`「挙動の詰め・実機確認」の当該項目を消化。単体テスト1648件・型チェックとも回帰なし

- [x] **読み戻り（PageUp/PageDown）から戻った際、既読部分が瞬時表示されない不具合を修正**（2026-08-10）
  - 原因：`ScriptMng#procPage()`は移動先を決めた直後に`#applyPaging()`で`isReadBack`を確定させて
    いたが、最新ページ（`PageLog.isPaging`が`false`になる位置）へ戻る移動では、その時点で既に
    `isReadBack=false`が立ってしまう。実際に本文を再生成する（`engine.switchScript`以降の
    `chgStr`群）のはその後なので、**既読のはずの最新ページの本文が、通常の文字送り演出
    （`isReadBack`で瞬時表示を切り替える`TxtLayer.tsx`）でもう一度アニメし直してしまっていた**
  - `ScriptMng`に`#pageReplaying`を新設。`page(to=…)`によるページの演じ直し中は（移動先が
    最新ページでisPagingがfalseになる場合も含めて）trueを保ち、`#applyPaging()`は
    `isPaging || pageReplaying`でストアの`isReadBack`を立てるようにした。演じ直しが停止点
    （`[l]`/`[p]`/`[s]`＝`'stop'`アクション）へ到達した時点で`#pageReplaying`を落としてから
    最後の`#applyPaging()`を呼び、以降は`isPaging`の実値どおりに戻す
  - E2E（`test/e2e/readback.e2e.ts`）に、最新ページへの復帰にかかった時間を計測するケースを追加。
    修正前は文字送り演出（既定値換算で600ms超）が走って558ms掛かっていたのに対し、修正後は
    瞬時表示になり閾値300ms未満に収まることを確認。既存の読み戻り系E2E（`readback`/`page`/`wait`/
    `autoskip`）・単体テスト1648件・型チェックとも回帰なし
  - `todo.md`「挙動の詰め・実機確認」の当該項目を消化

- [x] **`test/e2e/pic.e2e.ts`のflakyテストを修正**（2026-08-10）
  - 原因：`GrpLayer.tsx`は`<img src={src}>`を貼るだけで読み込み完了を待たず、`waitIdle()`も
    文字送り演出の完了しか見ておらず`<img>`のネットワーク読み込み完了は保証していなかった。
    そのため稀に`naturalWidth`をロード完了前に0で読んで落ちていた（`git stash`で戻しても
    再現する既存のflakyだった）
  - `pic.e2e.ts`の`imgs()`ヘルパーを、対象の`<img>`全部が`complete`になる（`load`/`error`
    イベント待ち）までasync待ってから値を返す形に修正。製品コード（`GrpLayer.tsx`）側は
    変更不要と判断した
  - 5回連続実行・E2E全体（213件）・単体テスト（1648件）・型チェックとも回帰なし
  - `todo.md`「挙動の詰め・実機確認」の当該項目を消化

- [x] **`[lay face=...]`省略時に直前のfaceを維持するよう修正**（2026-08-10）
  - todo.mdは「faceのみ指定して直前のfnを維持する」対応が要ると書いていたが、本家
    `skynovel_esm/docs/tag.html:682`・`GrpLayer.ts:59-91`を確認すると実態は逆で、
    **fnは毎回明示が前提（省略時は何もしない）、faceは省略すると直前の値を維持する**仕様
    だった。bluesnovelは`face`未指定時に常に`aFace: []`で上書きしており、`fn`を再指定する
    だけでfaceが消えていた
  - `T_ENGINE_ACTION`の`'chgPic'`・`T_CHGPIC`の`aFace`をoptionalにし、`[lay]`の`face`属性が
    未指定（`undefined`）ならアクション・ストア更新のどちらでも`aFace`キー自体を素通りさせて
    直前の値を残す形にした。`face=""`は「明示的なクリア」として区別し、これまで通り空配列で
    上書きする（`ScriptEngine.ts`の`'lay'`ケース、`store.tsx`の`chgPic`、`ScriptMng.ts`の
    `#applyAction`のcrypto分岐3箇所）
  - `exactOptionalPropertyTypes: true`のもとでは`{aFace: undefined}`は型エラーになるため、
    `...(aFace && {aFace})`の形でキーごと省略する必要があった
  - `test/e2e/app/prj_pic/main.sn`が旧仕様（face省略で自動クリア）を前提に書かれていたため、
    2箇所に`face=''`を追加して新仕様に合わせた（fnだけ差し替えて前のfaceを引きずらないように
    明示クリア）
  - 新規テスト：`ScriptEngine.test.ts`に2件（face省略でaFaceキーが出ないこと／face=""で
    明示クリアされること）、`store_lay.test.ts`に2件（chgPic側でも同じ振る舞い）。
    単体テスト1648件→1652件、E2E 213件は回帰なし、型チェックも通過
  - Moveableでのface位置調整（`todo.md`にあった「dx/dyが拡縮に追随しない」件）は、デザイン
    モード自体が無効化中（`ENA_DESIGN_MODE=false`）で調整結果の書き戻し先も無いため見送り、
    `todo.md`の「デザインモードは無効化中」項目の子タスクへ統合した
  - `todo.md`「挙動の詰め・実機確認」の当該項目を消化

- [x] **全画面時の見た目（中央寄せ）を確認**（2026-08-10）
  - `test/e2e/sys.e2e.ts`に自動テストは既にあった（`document.fullscreenElement`の`position:fixed`・
    中心座標一致を検証）が、todo.mdの項目は「実機で見た目を見る」ことが趣旨だったため、
    `playwright-cli`スキルでE2E用devサーバー（vite:5199、`test/e2e/app/index.html?prj=sys`）を
    立てて`[toggle_full_screen key=w]`を実際にキー押下で発火させ、スクリーンショットと
    `getBoundingClientRect()`の両方で見た。横長ビューポート（1600×900）ではステージ本体
    （1200×900）が左右200pxずつの余白で中央に、縦長ビューポート（900×1600）では
    （900×675）が上下462.5pxずつの余白で中央に来ており、`Stage.tsx:146-167`のflexレターボックス
    実装が両方向とも仕様通り対称に効いていることを確認できた
  - `todo.md`「挙動の詰め・実機確認」の当該項目を消化

- [x] **文字送りの速さを確認**（2026-08-10）
  - `sys:sn.tagCh.msecWait`（既定10ms、1文字あたりの出現開始の遅れ）と`[ch_in_style]`の
    組み込みdefault（`wait=500`・`x='=0.3'`・`ease-out`、`ChStyle.ts:28-33`）が実際のブラウザで
    仕様通り効いているかを、`test/e2e/chstyle.e2e.ts`と同じ手法（`gsap.globalTimeline.pause()`で
    凍結し`globalTimeline.time()`を手で進めて時刻ごとの`opacity`/`transform`を読む）で数値確認した
  - `test/e2e/app/prj_chstyle/main.sn`の「おち」（`in_style=nothing`→組み込みdefaultへフォール
    バックする場面）で0〜500msを100ms刻みに追うと、t=0でopacity 0・x=14.4pxから、t=500では
    opacity≈1・x≈0まで滑らかに収束し、立ち上がりが速く後半ほど緩やかになるease-outのカーブに
    なっていた。同時刻での1文字目・2文字目のopacity差（例：t=100で0.3276と0.2944）から
    `msecWait`によるわずかな出現タイミングのずれ（stagger）も機能していることを確認できた
  - **`tmp_blues`実機での体感確認はまだ**（今回見たのはE2Eフィクスチャ`prj_chstyle`）。
    `todo.md`の項目はそちらを残す

- [x] **`sys:`変数の未接続分を洗い出し、`docs/dev.html`のマーク不整合を修正**（2026-08-10）
  - `todo.md`の「sys:変数は読み書きも保存もできるが、その値を使う機能が無いものが多い」項目を
    実コードで確認した。`const.sn.nativeWindow.*`は`app.ts:67-78`（起動時のウインドウ位置復元）・
    `ScriptMng.ts:300-303`（IPC経由の位置確定→sys:への書き戻し）・`ScriptEngine.ts:1997-2025`
    （`[window]`タグ）で、`const.sn.aPageLog`も`PageLog.ts`で、それぞれ**既に接続済み**だった。
    `docs/dev.html`側のマークが🟡のまま更新されていなかっただけなので🟢へ修正した
    （ブラウザ版の`nativeWindow.*`がno-opなのは本家`SysWeb.ts`も同じ設計で、意図通り）
  - `sys:sn.tagCh.canskip`（クリック等でのテキストスキップ可否）だけは本家skynovel_esmを確認しても
    未接続だった：変数としては定義済み（`CmnInterface.ts`）だが、実際のクリックスキップ処理
    （`TxtLayer.ts:816-818`の`click()`）はこの値を見ずに無条件でスキップし、`msecWait`等の兄弟
    変数のような起動時キャッシュへの読み込み（`Variable.ts:126-132`）も本家に無い。**本家自体が
    未接続**なので、bluesnovel側だけ先行して繋ぐのは移植の範囲を超えると判断し見送り、`todo.md`の
    「凍結」セクションへ理由付きで記録した
  - `todo.md`「組み込み変数の残り」の`sys:`変数項目を解消（`const.sn.lay[N].width/.height`の
    実寸対応のみ残す）

- [x] **縦書きシステムメニュー（`[button rotation=90]`）が隣同士で重なる不具合と、`tmp_blues`実機で見つかった付随の2件を修正**（2026-08-10）
  - **本題（重なり）の原因は2つ重なっていた**：
    1. `BtnLayer.tsx`の`styBtnArg()`が、文字を箱サイズへ収める`fit`（実測スケール）が効く時だけ`transformOrigin`を`center`に強制していた。本家`Button.ts`は`fit`相当（pixiの`Text.width/height`セッター）もボタンコンテナの`rotation`も、どちらもpivot（既定0,0＝左上）基準で、原点を分ける理由が無い。`center`基準にしていたせいで縦書き（`rotation=90`）のボタン列全体が本家と違う位置へシフトし、上下のボタンが重なって見えていた。常にpivot基準（既定0,0）へ統一
    2. `fit`の実測（`useLayoutEffect`内で一時的に`width:auto`にして`offsetWidth`を測る処理）が、**文字レイヤが`[sys_menu visible=false]`等で`display:none`の間に実行されると`offsetWidth`が常に0を返し**、`fit`が`{x:1,y:1}`（＝無補正）のまま固定されていた。依存配列に表示状態が入っていないため、後で`visible=true`になっても再計算されない。結果、「クイックセーブ」等の長いラベルが箱（`width=100px`）に収まらず未縮小のまま隣のボタン領域へはみ出し、これが実際の「重なって読めない」の主因だった。`ResizeObserver`で要素を監視し、`display:none`が解けてレイアウトされた瞬間（`offsetWidth`が0から実測値に変わった瞬間）に測り直すよう修正。一度有効な値が取れたら`disconnect()`して余分な再計算は打ち切る
    - `tmp_blues`実機（`npm run web`、Playwright操作）で、修正前は`getBoundingClientRect()`上は隙間なく接する程度だったが実際には文字が長いボタンが隣へはみ出して見えており、修正後は`getComputedStyle().transform`に実測どおりのスケール成分（0.48〜1.11倍、ラベルの文字数に応じて）が入ることを確認
  - **付随して見つけた新規バグ（本題の実機確認中に遭遇）**：
    - `save:const.sn.mesLayer`が一度も初期化されておらず、本文中に**Space／Deleteキー（「字を隠す」のショートカット）を押すだけで即座に「内部エラー 存在しないレイヤ　です」で本文が完全停止する**不具合があった。`ScriptEngine.ts`の`#curTxtLayer`（既定`'mes'`）は`[current]`タグ実行時だけ`save:const.sn.mesLayer`へ書き込まれる作りで、新規プレイでは一度も書き込まれない。`theme/_hidetext.sn`（字を隠す機能）が`[lay layer=&save:const.sn.mesLayer …]`とこの変数を直接参照しており、未定義だと`&`式評価が`'undefined'`を返して**`layer`属性ごと丸ごと省略**され（`#resolveTag()`の仕様）、最終的に空文字列のレイヤ名で`store.tsx`の`chgLay`が例外を投げていた。コンストラクタで`save:const.sn.mesLayer`の初期値を`#curTxtLayer`に合わせておくよう修正
    - 直近コミットで`TxtLayer.tsx`のCSSコメント内（emotionの`css`テンプレートリテラルの中）にバッククォート（`` `margin: 2em 0` ``）が混入し、外側のテンプレートリテラルを途中終端させてビルド自体が失敗していた。`bun --watch src/build.ts --watch`が起動したまま何時間も再ビルドに失敗し続けていたと見られる（dist/が古いまま固定されていた）。バッククォートを除去して解消
  - 単体テスト1652件・E2E（`button.e2e.ts`16件・`btnpic.e2e.ts`5件）とも green

- [x] **`tmp_blues`と`tmp_esm_uc`（本家）を並べて実機比較し、ステージのレターボックス位置がズレる不具合を発見・修正**（2026-08-10）
  - タイトル画面・本文とも、本家は右側だけに黒帯（ステージ左寄せ）なのに対しbluesnovelは左右均等（中央寄せ）になっていた。原因は`Stage.tsx`が`react-use`の`useFullscreen`フックの戻り値をそのまま「実際に全画面になったか」として使っていたこと。このフックは内部で`screenfull.request()`（＝`element.requestFullscreen()`）を呼ぶが、**Promiseの成否を待たずに即座に`true`を返す**実装になっている
  - `main.sn`（`&s = const.sn.config.window.height > const.sn.screenResolutionY || … ; [toggle_full_screen cond='! const.sn.displayState && s']`）に「画面解像度よりプロジェクトのウインドウ設定が大きければ起動時に自動で全画面化する」仕様があり、これは**ページ読込直後のユーザー操作を伴わない自動発火**になる。ブラウザは`requestFullscreen()`をユーザー操作起因でない呼び出しとして拒否する（`NotAllowedError: API can only be initiated by a user gesture`）が、`useFullscreen`はこの失敗を見ておらず`isFullscreen`はtrueのまま固定され、`Stage.tsx`が全画面用のレイアウト（`display:flex; align-items:center; justify-content:center`で中央寄せ）へ切り替えてしまっていた
  - 本家`SysWeb.ts:138`は`document.addEventListener('fullscreenchange', …)`で**実際にブラウザが全画面になったかどうか**を見て`isFullScr`を判定しており、失敗時はfalseのまま＝通常のcvsResize()（左寄せ）を保つ。bluesnovel側も同じ判定基準に合わせ、`useFullscreen`はリクエストの発行・Escでの解除検知にだけ使い、実際にレイアウトへ反映する`isFullscreen`は`document.fullscreenElement`の`fullscreenchange`監視で別途持つよう`Stage.tsx`を修正
  - 実際の画面解像度（この開発機のブラウザで1280×720）がプロジェクト設定のウインドウ高さ（1024×768のtmp_blues/tmp_esm_uc、768>720）より大きい環境では**実プレイでも起動直後に同じ事故が起きる**ため、テスト用の特殊条件ではなく実害のあるバグだった
  - `bun test`1652件・E2E（`stage.e2e.ts`4件・`sys.e2e.ts`7件、うち「全画面のときステージは画面の中央へ寄る」はキーボード起因＝ユーザー操作扱いのrequestFullscreenなので引き続きgreen）で確認。起動時自動発火（ユーザー操作なし）のケース自体のE2E化は見送った（既存`prj_sys`フィクスチャへ影響なく追加する設計に手間がかかるため）

- [ ]






- 画像やスクリプト・htmlフレームなどの復号化対応（暗号化は拡張機能が担当）


todo.md で残っている大物は
- 音声・動画
- [page to=]（読み戻しの設計から）
  - todo.md: **`[page]`の残り**：`to=`（指定ページへ移動）・`style=`・`key=`。bluesnovelの読み戻りはPageUp/PageDown＋`Caretaker`で本家と別の作りなので、対応させるなら設計から
- 文字組みの残り









- 音系に着手。だがあなたはこちらのようなテスト可能か？
  - https://github.com/famibee/SKYNovel_gallery/tree/master/public/prj/sound

- イベント中に別のイベント https://github.com/famibee/SKYNovel_gallery/tree/master/public/prj/mul_ev









## 2026/07/26

- hint・ツールチップと[button]残件など
- [set_focus]残件。frameにもまたがるフォーカス移動

- [x] **ツールチップ（`hint`）と、`[set_focus]`のフレーム跨ぎまわり**。
	- **`hint`／`hint_style`／`hint_opt`**を`[button]`と`[link]`の両方に。吹き出しは**画面に1つ**を
	  使い回す（本家 EventMng.ts:131 も`.sn_hint`を1つ作る）。マウスを乗せた時とフォーカスが
	  入った時に出し、外れた時とクリック時に消す（本家 EventMng.ts:418〜424 と同じ出し入れ）。
	  **本家はpopper.jsで位置を決めるが、こちらは依存を増やさず自前で置く**ので、`hint_opt`は
	  `placement`（top／bottom／left／right。`bottom-start`のような修飾付きも本体だけ拾う）だけ見る。
	  `src/ts/Hint.ts`。位置計算とhint_optの読み取りは純粋なのでユニット（6件）、
	  実際の出し入れ・`hint_style`の反映・placementはE2E（2件）。
	- **`[button]`はフォーカス時もホバーと同じ見た目**になった（本家 EventMng.ts:435 が
	  FocusMngへ`hv()`/`nr()`を渡しているのに対応）。既定のフォーカスリングは画面に合わないので消す。
	- **`[set_focus]`のフレーム跨ぎ**：フレーム内の要素とステージ上のボタンが同じ輪に並ぶのは
	  元から動いていた（`focus.e2e.ts`が`frm:ok`→`frm:close`→`btn:ボタン1`→`btn:ボタン2`を確認済み）。
	  **抜けていたのは「隠したフレームの中へフォーカスが落ちる」こと**——フレームの文書は自分が
	  隠れていることを知らないので`getClientRects()`が普通に返ってしまう。`FocusMng.#canFocus()`が
	  `frameElement`を辿って**親側まで遡って確かめる**ようにした（同一originのsrcdocなので辿れる）。
	  E2E1件（`[frame visible=false]`の後は[button]だけを巡る）。
	- ユニット1242・E2E105 パス、`tsc` クリーン。
	- 残り：`[button]`の`style`/`style_hover`（**pixiのTextStyle JSON**なのでCSSへの読み替え設計から）・
	  `pic`/`b_pic`・効果音、`[link]`の`global`/`onenter`/`onleave`、`[set_focus]`のゲームパッド操作。


- [button]のフォーカス・ホバー状態などのcss指定
- [toggle_full_screen]の残り
- const.sn.platform について
  - Public archive の platform.js https://github.com/bestiejs/platform.js 由来なので、インストールしない方針
  - ただ src/sn/CmnLib.ts:175 で import('platform')し、isSafari, isFirefox, isMac, isMobile を設定したいのが本質。組み込み変数として公開しているが使う予定はない。UA文字列でもよい
- todo.md、tag.html、dev.html などの資料の整合性と🔴更新
  - たとえばtodo.mdの実績や「実装済み」記述の削除（他への移動）や軽量化。todoはカラになる運命

- [x] **`[button]`の見た目CSS・全画面の中央寄せ・platform.js廃止・資料の整理**（まとめて4件）。
	- **`[button style=/style_hover=/style_clicked=]`をCSSで書けるようにした**（通常・ホバー/フォーカス中・
	  押下中の3状態）。本家はpixiのTextStyle JSONだが、こちらはDOMなのでCSSをそのまま当てるほうが素直。
	  ただしギャラリーのサンプルは`{"fill": "plum"}`と書くので、**`{`で始まる値だけ主要キーをCSSへ読み替える**
	  （`fill`→`color`、`fontSize`は数値ならpx付与、等。`dropShadow`など未対応キーは落とす）。
	  既定はこれまでどおり本家寄り（ホバーは`fill:'white'`相当、押下中は影を消す）。
	- **全画面時にステージを画面の中央へ寄せる**（本家 SysBase.cvsResize() 相当）。ステージは実寸固定＋
	  `transform: scale()`で拡縮する作りなので、全画面要素になっても画面いっぱいには広がらず、
	  放っておくと左上に寄っていた。E2Eは**実際に全画面へ入って**中心座標を見る（予約キーの押下＝
	  本物のユーザー操作から`requestFullscreen()`を呼べるため、ヘッドレスでも通る）。
	- **platform.js への依存をやめた**（bestiejs/platform.js は Public archive）。本当に要るのは
	  `CmnLib`の`isSafari`/`isFirefox`/`isMac`/`isMobile`の4つだけなので、UA文字列から出すようにし、
	  `CmnLib.init()`は同期になった（動的importが消えた）。組み込み変数`const.sn.platform`はUA文字列
	  （本家はplatform.jsのJSONで`.os.family`のように引けるが、使う予定が無いので割り切り）。
	  判別は`test/CmnLib.test.ts`が代表的なUA5種で押さえる（Chrome系もUAに"Safari"を含む、
	  iOSのUAは"like Mac OS X"を含む、といった引っかかりどころ込み）。package.jsonからは外したので、
	  次の`bun install`で`platform`と`@types/platform`が落ちる。
	- **資料の整理**：`todo.md`を「これからやること」だけに絞った（120行→88行。実績・実装済みの記述は
	  CHANGELOG.mdとdocsへ寄せ、章立ても タグ／挙動の詰め／アセット基盤／本家へ確認 に整理）。
	  `docs/tag.html`は`[add_face]`を🟢へ、`[button]`・`[toggle_full_screen]`のメモを更新。
	  `docs/dev.html`は`const.sn.platform`を🟢＋方針の理由を明記。
	  現状のマーク集計は **🟢61／🟡20／🔴34**（🔴は音声・動画・画面揺らし・文字出現演出・履歴など、
	  層ごと未着手のものだけで、実装済みなのに🔴のまま残っている取りこぼしは無い）。
	- ユニット1251・E2E108 パス、`tsc` クリーン。


- 🟡 [tsy]残件、[tsy path=…]など？　と[tsy_frame]
- HTMLフレーム系タグの残り
- [event key='dom=…']
- もう実装できそうなタグ、組み込み変数を実装
- [quake][stop_quake][wq] https://github.com/famibee/SKYNovel_gallery/tree/master/public/prj/tag_quake

- [x] **`[tsy path=]`/`[tsy chain=]`・`[tsy_frame]`・`sn.event.domdata.*`**（トゥイーンとフレームの残り）。
	- **`[tsy path=…]`（複数区間の経路）**。本家の正規表現（`CmnTween.#REG_TSY_PATH`）をそのまま移植し、
	  `(x,y,alpha)` 並べ書きと `{…}` のJSON書式の両方を受ける。**相対値（先頭`=`）はどの区間も
	  「トゥイーン開始時の値」が基準**——だからテンプレの`fg_squat`が書く`(,=50) (,=0)`が
	  「50下げてから元へ戻す」になる（区間ごとの相対だと戻らない）。本家はtween.jsの`chain()`で
	  区間を繋ぐが、こちらはGSAPのtimeline。JSONの誤りは本家がconsole.errorで流してその区間を
	  捨てるのに対し、こちらはその場で例外にした（他の属性の扱いと揃えるため）。
	- **`[tsy chain=…]`**（他トゥイーンの終了に繋ぐ）。止めた状態で作り、繋ぎ元の終了時に動かし始める。
	  目標値・開始値は**タグ実行時**に解決する（本家も同じで、繋ぎ元が動かした後の値は見ない）。
	- **`[tsy_frame]`**。`[tsy]`と同じ組み立てを共有し、動かす先だけストアのレイヤ→`FrameMng`が抱える
	  iframeに差し替える形にした（`#tsyVals()`/`#runTsy()`を共通化）。フレームは`x`/`y`/`rotate`が実名
	  なので属性表を分けてある。トゥイーン名は本家同様`frm\nID`なので`[wait_tsy id=…]`等で指せる。
	  併せて**`FrameMng`が各フレームの現在の見た目を持つ**ようにした：`transform`は
	  scale_x/scale_y/rotateの3つで1つの値なので、現在値を持たないと`[frame scale_x=…]`だけの指定が
	  残り2つを既定値へ戻してしまう（`[tsy_frame]`の開始値も同じ場所から取る）。
	- **`sn.event.domdata.*`**：`[event key='dom=…']`の発火時、その要素の`data-*`を組み込み変数へ
	  （本家 EventMng.ts:591）。フレーム内の「どの項目が押されたか」をシナリオへ渡す口になる。
	- ユニット1263・E2E111 パス。`docs/tag.html`は`[tsy_frame]`を🟢へ、`[tsy]`と`[event]`のメモを更新、
	  `docs/dev.html`は`sn.event.domdata.*`を🟢へ。

- [x] **画面揺らし `[quake]`/`[stop_quake]`/`[wq]`**。
	- 本家（LayerMng.ts:754）はレイヤを板テクスチャへ描いてそのスプライトを揺らすが、こちらは
	  **表裏のページ箱そのもの**を動かす（ステージ側の`overflow: hidden`が端を切るので絵は同じ）。
	  **毎フレーム`[-hmax,+hmax]`／`[-vmax,+vmax]`のランダム位置へ跳ぶ**（補間しない）のも本家どおり。
	- **揺れ幅はストアに入れない**：毎フレームのランダム値なのでストア更新には重すぎ、かつ最後は
	  必ず0へ戻る一時的な見た目なので読み戻し（Memento）にも要らない。ストアが持つのは
	  「揺れているか・幅はいくつか」だけで、`[trans]`と同じ役割分担にした——揺らすのはStage側、
	  **終了を宣言するのはScriptMng**（時間切れ／`[wq]`中のクリック／`[stop_quake]`）。
	- 本家は`[trans]`と同じトゥイーン枠（`TW_NM_TRANS`）を使い回すので`[stop_quake]`＝`[finish_trans]`・
	  `[wq]`＝`[wt]`だが、**こちらの`[trans]`は表裏の交換を伴う別処理**なので、同じ形の別の待ち行列に
	  した（揺らしながらの`[trans]`が破綻しないという副産物つき）。
	- 未対応は`layer=`（揺らす対象の限定。常に画面全体）と`delay`/`repeat`/`ease`/`yoyo`
	  （本家でも揺れ幅がランダムなのでイージングは効かず、実質「揺らす長さ」しか変わらない）。
	- ユニット1275・E2E115 パス。E2Eは揺れ幅がストアに無いのでDOMの`transform`を直接読む。

- [x] **すぐ実装できるタグ・組み込み変数**（`[finish_trans]`・`[set_cancel_skip]`・`sn.tagL.enabled`・
  `const.sn.key.*`・`sn.button.fontFamily`）。docs の🔴を実装可能なものから消す回。
	- **`[finish_trans]`**：演出を終了状態へ送り、**表裏の交換まで**済ませる（`[wt]`中のクリックと同じ
	  着地点）。本家のタグ本体は空で、実処理は「一部タグの直前に演出を畳む」共通処理
	  （ScriptIterator.ts:504 `#setTag2FinishTrans`）。こちらはその畳み込みをScriptMng側に置き、
	  このタグと**`[trans]`自身**だけに掛けた——演出中に次の`[trans]`が来ると、交換されないまま
	  裏ページが書き換わって前の場面が表に出ないまま消えるため（これは実装漏れの修正でもある）。
	  本家は`[quake]`/`[stop_quake]`/`[add_filter]`にも掛けるが、それは`[quake]`が`[trans]`と同じ
	  トゥイーン枠を使う都合であって意図ではないので追随していない。
	- **`[set_cancel_skip]`**：本家同様**何もしない**（本家も2023/05/27に廃止済みで中身が空）。
	  上流シナリオに残る記述を通すためにタグ名だけ受ける。
	- **`sn.tagL.enabled`**：falseの間は`[l]`で止まらず頁末（`[p]`/`[s]`）まで一気に進む。
	  **3フラグと違い既定がtrue**なので「未設定＝true」として読む。手動操作・`[s]`到達での
	  `cancelAutoSkip()`でtrueへ戻すのも本家どおり。ギャラリーの`tag_quake`が既読スキップの
	  永久ループ対策に使う書き方。
	- **`const.sn.key.*`**（修飾キー等の今の押下状態）：押下表を持てるのはDOM側だけなので、
	  Main.tsxのkeydown/keyupが`setKeyDown()`でエンジンへ教え、変数側は他の組み込み変数と同じ
	  遅延評価にした。blurで全部落とす（押したままウインドウを離れると押しっぱなしで残るため）。
	  `back`はAndroidのBackキーで、ブラウザに相当するキーイベントが無いので常にfalse（🟡）。
	- **`sn.button.fontFamily`**：`sys:TextLayer.Back.Alpha`と同じく停止点ごとにストアへ写し、
	  BtnLayerが`font-family`として当てる（全ボタン共通）。
	- ユニット1285・E2E118 パス。


- ルール画像による[trans]
  - ゲーム中での[trans]によるトランジション中の様子はテストしづらい？ トゥイーンdt変化機構とdt値に対するトランジション進度を切り分けられれば、任意のdt値で出力->スナップショットを撮れると思うが

- [x] **ルール画像による`[trans]`（`rule=`／`vague=`）**。ご提案どおり「トゥイーンのdt変化機構」と
  「dt値→トランジション進度（＝見た目）」を切り分けた。
	- **WebGLを使わずSVGフィルタ＋CSSマスクで実装**。本家のフラグメントシェーダ（LayerMng.ts:548）を
	  読み解くと、結局は「ルール画像の赤チャンネル R → 表ページの不透明度」の一次関数
	  `clamp(R/(2*vague) + (vague - tick)/(2*vague))` でしかない。SVGの`feComponentTransfer`の
	  `feFuncA type="linear"`（`slope`/`intercept`、結果は0〜1へクランプ）がまさにこの形なので、
	  シェーダ相当の絵がそのまま出せる。マスクは`feColorMatrix`でRを不透明度へ移し（RGBは白固定）、
	  色空間は`sRGB`固定（既定のlinearRGBだと赤チャンネルが変換されて本家と合わない）。
	- **切り分け**：進度`tick`を0→1へ動かすのがStage側のGSAP、`tick`と`vague`から係数を出すのが
	  純粋関数 `src/ts/Trans.ts`。おかげで
	  ・進度の計算は単体テストで**全域**を確かめられる（`test/Trans.test.ts`は本家シェーダをTSへ
	  　書き写したものと、R・tick・vagueの全組み合わせで突き合わせる）
	  ・E2Eは`gsap.globalTimeline.pause()`で時間を止め、**任意の進度の係数を流し込んで画を撮れる**
	  という形になった。演出の途中という一番撮りにくい瞬間が、時間待ちに頼らず決定的に検証できる。
	- E2Eの画素検証は、表裏を単色の板で塗り分け→`page.screenshot()`→**PNGのデコードはブラウザの
	  canvasにやらせる**（依存を増やさない）。tick=0/0.5/0.8/1で境界が左から右へ動くこと、
	  境界のvague幅で中間色が出ることを見る。ルール画像は横グラデーションのPNGを生成して同梱。
	  gsapは`test/e2e/app/main.ts`から公開する（src/にテスト専用フックは足さない方針のまま）。
	- `glsl=`（自前シェーダの差し替え）はWebGLを使わないため実現しようがないので、
	  黙って無視せず**その場でエラー**にする（フィルターと同じ扱い）。`delay`/`ease`は未対応。
	- ユニット1291・E2E120 パス。

- [x] `package.json`の未使用依存を撤去、ESLintの設定不備を調査
	- 全依存をimportと突き合わせて撤去：`@tweenjs/tween.js`（GSAPへ置き換え済み）・`devtools-detect`・
	  `gamepad.js`（本家`EventMng.ts:249`で実使用だが移植前。`src/sn/gamepad.js.d.ts`のシムは
	  残し、実装時に`bun add`する旨をコメント）・`@happy-dom/global-registrator`・
	  `@types/electron-json-storage`（本体が依存に無い）・`@types/adm-zip`（adm-zip 0.6.0が
	  `types.d.ts`を同梱するので重複）。`skynovel_esm`からも`@types/electron-json-storage`を撤去
	- VSCodeのESLint拡張が出していた`Could not find config file.`は`eslint.config.mts`の欠落。
	  本家からdevDependenciesだけコピーされ設定ファイルが無かった。本家版をほぼそのまま移植
	  （相違は`.tsx`を対象に含める・`dist`/`dist_app`/`docs`を`globalIgnores`・
	  `quotes`に`allowTemplateLiterals`）。`eslint-plugin-jest`は外せない――本家から無改変で
	  持ってきた`test/Grammar.test.ts`に`eslint-disable-next-line jest/no-conditional-expect`が
	  残っており、プラグイン未ロードだと「そんなルールは無い」と怒られるため
	- ただし**ESLintは設定を置いても動かない**。`typescript-eslint`（8.65.0時点で最新）が
	  TypeScript 7 非対応と明示的にthrowする。TS 7の`typescript`パッケージはコンパイラのJS APIを
	  公開せず（`exports`が`version.cjs`と`unstable/*`のみ、`require('typescript')`の戻りは
	  `version`と`versionMajorMinor`の2個だけ）、パーサが無いと`.ts`を解析できないので回避策も無い。
	  `@typescript/typescript6`は`import ts6 from '@typescript/typescript6'`と明示的に書ける
	  ツールにしか効かず`require('typescript')`決め打ちには届かない（bunの`resolutions`による
	  ネスト解決も無視されることを実験で確認）。**TS 7のまま塩漬け**とし、TS 7.1対応を待つ。
	  設定ファイルを置いたままにするのは、拡張のエラーが「設定が無い」から本当の原因へ変わるため
	- 同じ原因で`vite-plugin-dts`も動けていないはず（`dist/`に`.d.ts`が1つも無い）。
	  `todo.md`に項目を追加

skynovel_esm方針、GSAP化は辞めtween.jsのまま触らないものとする


- tmp_bluesテンプレート操作時に気付いた点。本家テンプレtmp_esm_ucとの相違など
  - [toggle_full_screen]で最大化したさいにウインドウ内側いっぱいに拡大・センタリングしていない。タイトル画面で再現
    - 【<div data-page="fore" ...>】などが最大化を阻止しているのか。キャンバス外の追加要素があるのか。扱いに問題。それらごと含有する別要素の導入・操作・管理など、検討を
  - 「初めから」をクリックで
    - 暗転しホワイトアウトの[trans]するが、点々矩形の文字レイヤ枠が見え、システムボタンが見えている。
    - 二度の[trans]終了時に一瞬真っ黒画面になってちらつく
    - クリック待ち状態でも、点々矩形の文字レイヤ枠が見え、システムボタンが見えている。
      - 一度クリックした後のクリック待ち状態まで、システムボタンが見えてはいけない
    - 縦書きになっていない
  - 文字レイヤ、メッセージウインドウ（b_color テキスト背後の矩形）の位置とサイズの実装を。周囲に点々修飾も見える
  - 文字・クリック待ちアニメpngが縦書きになってない
  - システムボタン（doc/prj/script/sub.sn:111 マクロ [sysmenu_draw_v] による）は回転により縦になっているが、幅広い。タイトル画面ボタンのようにwidth幅（省略でデフォルト値）に収まっていないように見える
  - 右クリックメニューが開かない。イベントを処理しているか。Shiftキーで開く
  - システムボタンの「タイトル」を押し、「タイトルに戻りますか？」が出るが、
    - キャンセルすると本文が消えている
    - 戻るを選択すると、システムボタンが横書きになり[trans]する
  - アルバム画面で、本文で表示されたのに「語り手」 doc/prj/image/F_kuchimoto.jpg が表示されずリンク切れ

- [x] `[trans layer=…]`（一部レイヤだけの交換）が、交換対象外レイヤの**裏ページを破壊**していた
	- 症状：実テンプレ（`tmp_blues`）で本文が縦書きにならない・メッセージウインドウの枠画像が出ず
	  試作の点線枠のまま。`[txt_lay_v_center]`が組んだ設定が丸ごと消えていた
	- 原因：`startTrans()`が交換対象外レイヤについて**裏へ表をコピー**していた。本家
	  （`LayerMng.ts:617`「transしないために交換する」）がやっているのは**表と裏の入れ替え**で、
	  各レイヤ自身のfore/backの中身には触らない。裏には次の場面の組み立て途中が載っていることが
	  あるので、コピーだとそれを捨ててしまう。テンプレは
	  「文字レイヤの裏に次の設定を組む →`[sysmenu_draw_v]`が`[trans layer=mes_sysmenu]`を打つ」
	  という順なので、**別レイヤのtransが文字レイヤの組み立てを消す**という形で露見した
	- あわせて`finishTrans()`に`cpFore2Back()`を追加。本家`Pages.ts:74 transPage()`は
	  交換したレイヤについて交換後に`back.copy(fore)`をしており、こちらはそれが抜けていた
	  （＝新しい裏が1つ前の画面のまま残る）
	- 切り分けの経緯：エンジンは無実だった。`test/uc_goal.test.ts`の仕掛け（fetchとフレームだけ
	  偽装してエンジンを回す）を`tmp_blues`へ向けると、`writing-mode: vertical-rl`も`b_pic`も
	  正しくアクションに出ている。決め手は**実機のストアを購読して`mes`の変化を並べた**こと
	  （vite dev が配る`dist/store.js`のURLを`performance.getEntriesByType('resource')`から拾って
	  `import()`すれば同じインスタンスが取れる。`src/`にテスト用フックを足さずに済む）。
	  縦書きが裏に載った次の瞬間に表裏とも消えており、間にあるのが`[trans layer=mes_sysmenu]`だった
	- E2E `test/e2e/grp.e2e.ts` ＋ フィクスチャ`app/prj_grp/`を追加。テンプレの`[grp]`＝
	  1回の場面転換で`[trans]`を3回打つ並びを、上の`[trans layer=mes_sysmenu]`込みで最小再現する。
	  **旧挙動では`horizontal-tb`に巻き戻って落ちる**ことを確認済み

- 文字レイヤクリアでボタンをクリアしてほしいが、してない？

- [x] `[er]`が**ボタンを消していなかった**（文字だけ消していた）
	- 本家の`[er]`は`TxtLayer.clearLay()`（`TxtLayer.ts:855`）を表裏に呼び、本文と
	  **ボタンを両方**捨てる。こちらは`chgStr`で本文を空にするだけだったので、テンプレでは
	  タイトル画面のボタン4つが本編に入っても残り続けていた（`[grp]`の場面転換は`[er]`しか
	  打たないので、消える機会が他に無い）
	- `[clear_lay]`と同じにはできない。あちらはレイヤの見た目（`style`/`left`/`top`/`b_pic`…）まで
	  既定へ戻すが、本家の`[er]`はCSSを残す（戻すのはalpha/blendmode/pivot/angle/scaleだけ）。
	  そこで専用のアクション`clearBtn`＋ストアの`clearBtn()`を足し、ボタンだけを消す形にした
	- 本家が`[er]`で戻すalpha/blendmode/pivot/angle/scaleは**未対応**（todo.md）
	- `test/e2e/app/prj_trans/main.sn`に停止点を1つ足した。`[er]`の**手前**で
	  「裏のボタンが表へ出た」状態を見るため（通り過ぎるとボタンごと消えて確かめられない）

- [x] 文字レイヤの`[lay visible=false]`が**ボタンに効いていなかった**
	- テンプレの`[sys_menu visible=false]`でシステムボタンが消えず、`[trans]`中も
	  クリック待ち中も出っぱなしだった。ストアには`visible: false`が表裏とも正しく
	  入っており、届いていなかったのは描画側
	- 原因：本家はボタンが文字レイヤのコンテナ（`Layer.ctn`）の**子**なので、コンテナへ掛けた分が
	  そのままボタンにも乗る。こちらはボタンの箱を本文spanの**兄弟**にしているため
	  （本文側のwidth/writing-mode/paddingをボタンの座標計算へ持ち込まないための作り）、
	  `styLay()`が付けた`display: none`が本文にしか当たらなかった
	- 直し方：`[lay]`のうち**位置・変形以外**（visible→display / alpha→opacity / blendmode /
	  filter）をボタンの箱にも渡す。`left`/`top`/`transform`/`transformOrigin`は渡さない
	  （ボタンはステージ原点基準に置くという既存の作りを崩さないため）。
	  visibleだけでなくalpha・blendmode・filterも同時に効くようになった

- [x] 右クリック（`[event key=rightclick]`）が発火していなかった
	- テンプレは枠（アルバム・設定・履歴・確認ダイアログ）を`[event key=rightclick label=*exit]`で
	  閉じるが、どこでも開けず閉じられなかった。Shiftキーなど別の予約でしか出られない状態
	- 原因：右ボタンは`click`イベントに来ない。本家は`contextmenu`イベントで拾っている
	  （`EventMng.ts:145`）が、こちらは`click`しか見ていなかった
	- `Main.tsx`に`contextmenu`を追加。予約名は修飾キー＋`'rightclick'`で、修飾キーの前置は
	  `alt+` `ctrl+` `meta+` `shift+` の順（本家`EventMng.ts:355 #modKey4MouseEvent`）。
	  キー用の`keyName()`と違い「修飾キー自身か」の判定は要らない（押したのはマウスなので）
	- **予約が無くても`preventDefault()`する**（本家と同じ）。ブラウザのメニューが出ると
	  ゲーム画面の上に居座って操作を邪魔するため
	- フレーム内の右クリックも`FrameMng`が親の`document`へ投げ直す。キー入力と同じ事情で、
	  フレーム内のイベントは親まで飛んでこない（本家も`resvFlameEvent()`でフレームbodyへ張る）。
	  これが無いと枠の上で右クリックしても閉じられない（枠は画面全面なので実質どこでも閉じられない）
	- `document`に張るのは、ステージとフレーム再dispatchの両方を1本で受けられるため
	  （本家はcvsとフレームbodyの2箇所）
	- E2E 3件追加（`event.e2e.ts`）：右クリックで発火する・修飾キーが前置される・
	  予約が無くてもブラウザのメニューを出さない

- [x] アルバムの絵がリンク切れ（フレーム内の`<img data-src=…>`の解決先が違っていた）
	- テンプレのアルバムは解放済み項目の`data-src`に`F_kuchimoto`のような
	  **拡張子なしのアセット名**を書く。こちらは枠HTMLのディレクトリを前置していたので
	  `frames/F_kuchimoto`になって404。未解放のサムネ（`./_album_miken.jpg`＝枠と同じ
	  ディレクトリ）だけがたまたま当たっていた
	- 本家は`sn_repRes`で渡す関数の中で`cfg.searchPath()`に通している
	  （`FrameMng.ts:154`→`#loadPic2Img()`）。同じく**まずパス解決（path.json）へ通す**形に変更。
	  `./_album_miken.jpg`のような枠自身の相対ファイルもsearchPathが拾える（ファイル名＋拡張子で
	  引ける形なので）。絶対URL・ルート絶対・`data:`はそのまま通し、サーチパスに無ければ
	  従来どおりディレクトリ前置へ落とす（枠に同梱しただけでpath.jsonに載らない画像のため）
	- E2E追加（`frame.e2e.ts`）。フィクスチャの枠に画像2枚を置いた：
	  path.jsonに載る拡張子なしの名前と、載らない枠同梱ファイル。どちらも`naturalWidth > 0`まで見る
	  （`src`が入っただけでは絵が出たことにならないため）

- [x] `[button]`の`width`/`height`省略時に**既定寸法が入っていなかった**
	- テンプレのシステムメニューは`width`/`height`を書かずに並べるので、文字量なりの幅になって
	  隣と重なり、回転（`rotation=90`）と相まって「幅広い」状態だった
	- 本家は文字ボタンに**必ず既定値を当てる**（`Button.ts:122` height=30 /
	  `:151` width=100）。pixiの`Text.width`/`height`は文字スプライトそのものを拡縮するので、
	  文字数に関わらず必ずその大きさに揃う
	- こちらも同じ既定を入れ、`width`指定時だけ動いていた「文字を箱に収める倍率の実測」を
	  常に通すようにした（`btnSize()`を`styBtnArg()`と実測フックの両方から使う）。
	  実機のシステムメニューが100×30に揃い、縦一列に収まった
	- `todo.md`の「本家はwidth/heightで文字そのものを引き伸ばす。実機で見た目を要確認」を解消

- 割り込み作業。タグ属性において【bluesnovel は省略時に何も指定していませんでした】という衝撃的な文言があったが、他にもあり得るのか
  - 実装をする前にまず検討事項、タグ定義の省略時属性を、一箇所で定義できるか。そしてそれは効果的か。本家はタグ定義の入口メソッドでそれぞれ引数チェック・デフォルト値指定している

- [x] タグ属性の「省略時の既定値」を本家と突き合わせる仕組み（`[button]`の事故を受けて）
	- **既定を埋める場所をタグの入口（エンジン）へ**。`[button]`のwidth/heightは前回BtnLayer
	  （表示側）で埋めていたが、本家も`Button.ts`が`#o`へ確定値を記録する（dump・セーブに乗る）ので、
	  エンジンで埋める方が faithful。ブラウザ無しで単体テストできる利点も大きい。
	  定数は`src/components/Lay.ts`（共有部品）へ置き、表示側は古いセーブからの復元用に`??`で保険
	- **検査 `test/argdef_parity.test.ts` を追加**。本家の`argChk_Num/Boolean(hArg,'属性',既定)`を
	  機械的に抜き出し、(1)本家が既定を変えた/足したら落ちる (2)こちらが「どう扱うと決めたか」を
	  表で持ち、**属性を1つも書かないタグを実際に走らせて**既定が出ることを確かめる
	- 表は3つ。`A_CSS_DEF`（CSSに既定を任せると決めたもの＝埋めないのが正解）、
	  `A_ELSEWHERE`（別の場所で持つ。`vague`は`Trans.ts`のVAGUE_DEF）、
	  `A_NOT_YET`（同名の属性を別用途で触っているだけで未対応）。理由を書くのが要点で、
	  次に見た人が「書き忘れ」と区別できるようにする
	- **ソースの文字列照合による自動検出は諦めた**。同じ属性名でも既定はタグごとに違う
	  （本家のwidthは`[button]`=100／`[add_frame]`=ステージ幅／`[graph]`=0）のでタグ単位に
	  切る必要があるが、`[button]`のように属性を総称ループ（`#A_BTN_NUM`）で読む書き方だと
	  `args.width`という字面が現れず追えない。緩くすると誤検出だらけになる（試作では9件中ほぼ全部）。
	  **実際に走らせて出た値を見る**方が確実で読みやすい
	- 抜き出しの全体像：本家の既定は**120箇所・103属性**。うち相当数が「現在値」が既定
	  （`this.#b_alpha`・`this.scale.x`）で、静的な中央テーブルには原理的に書けない。
	  **本家と同じく入口で書くのが正しい**と裏付けられた

- 意見を。今回の「既定をエンジン入口へ移す」件は、React的にも正しいように思う。流し込まれる値・状態を内部で加工するのは、枝葉要素のあちこちで行うと収拾が付かなくなる。できれば入口付近の1箇所にすべきと考えるが

- [x] 「CSSに既定を任せる」と決めた属性を、**算出値**で見張るE2E（`test/e2e/argdef.e2e.ts`）
	- `test/argdef_parity.test.ts` はソースの照合なのでCSS側のズレを見つけられない。ここが対になる検査。
	  属性を1つも書かないレイヤ（画像・文字）を置き、`visibility`/`opacity`/`transform`/
	  `mix-blend-mode`/`filter`と、ステージ内箱からの相対位置が本家の既定と一致するかを見る
	- 「エンジンが埋めていない」ことの裏取りも入れた。ストア側に`visible`/`alpha`/`left`/`top`/
	  `rotation`/`scale_*`/`blendmode`が1つも入っていないことを確かめる。ここに値が入り始めたら
	  CSSに任せる方針から外れた合図
	- 分かったこと：未指定でも`transform`の算出値は`none`にならない。デザインモードのMoveable用の
	  下地（`Stage.tsx` の`sty4Moveable`）が恒等変換を書いているため。見た目は等倍・無回転で
	  本家と同じなので、単位行列も許す形にしてコメントで理由を残した
	- 台帳の誤りも1件修正。`visible`を「既定あり」に分類していたが、エンジンがやっているのは
	  `args.visible !== 'false'`という**パース**であって既定ではない。CSSの`visibility: visible`が
	  既定を供給しているので`A_CSS_DEF`へ移した

- [x] `[lay left=]`/`[top=]`（と`[button]`の同属性）の**-1〜1をステージ幅・高さの割合として解釈**
	- 本家 `Layer.ts:513` `if (x > -1 && x < 1) x *= CmnLib.stageW`。テンプレやギャラリーは
	  `[lay left=0.5]`で画面中央を指す書き方をするが、こちらはpxとして扱っていたので
	  **0.5px**になっていた。エラーも出ず静かに違う絵になる類のズレ
	- 境界は本家と同じ**開区間**（`left=1`は1px、`left=-1`は-1px）。0はどちらの解釈でも0
	- ステージ寸法は組み込み変数（`const.sn.config.window.width/height`）から読む。
	  エンジンはDOMを見ないという原則のまま。組み込み変数が無い環境（単体テスト等）では素通し
	- `[button]`も同じ経路を通る（本家も`#argChkPos`を共有）。ただし**width/heightは割合解釈しない**
	  （寸法であって位置ではない）
	- 見つかった経緯は「タグ属性の既定値」の棚卸し（`argChk_*`の抽出）。既定値そのものではなく、
	  **値の解釈**の相違だが、同じ抽出作業で目に入った


- [x] `[lay]`の配置属性 `center=`/`middle=`/`right=`/`bottom=`/`s_right=`/`s_bottom=`（本家 `Layer.ts:513-552`）
	- 本家は「指定値から**表示物の幅・高さを引く**」で寄せを実現するが、エンジンは表示物の実寸を
	  知らない（知るにはDOMを見るしかなく、`const.sn.lay[N].width/height`も今は有無の1/0で代用中）。
	  そこで**CSSの独立`translate`プロパティ**で表した：`center`→`-50%`・`right`→`-100%`。
	  実寸を知らなくても同じ絵になる
	- `translate`は`transform`とは**別プロパティ**なので、`rotation`/`scale_*`（`transform`で組む）と
	  衝突しない。しかも適用は`transform`より前＝「位置を決めてから回す」という本家の順序と同じ
	- `s_right`/`s_bottom`はステージ右端・下端からの距離で、CSSの`right`/`bottom`がそのまま同義。
	  `left`/`top`とは排他にする（本家も else if で分岐）
	- 優先順位も本家どおり `left > center > right > s_right`（縦も同様）
	- `T_LAY_STY`に`align_x`/`align_y`/`s_right`/`s_bottom`を追加し、`A_LAY_STY_KEY`にも入れた
	  （`[clear_lay]`で消える・`getLaySty()`から見える）
	- E2Eは**実測**で見る（`argdef.e2e.ts`）。中心・右下端がステージのどこに来るかを
	  `getBoundingClientRect()`で確かめる。ステージは窓に合わせて`transform: scale`されるので、
	  距離の比較はその倍率で割る
	- **未対応**：`[button]`側の同属性。本家は`isButton`のとき幅の**1/3**で計算する（pixiの文字寸法
	  まわりの都合に見える）ので、そのまま持ってくると別の絵になる。テンプレのボタンは
	  `left`/`top`だけなので実害は出ていない


- [x] 場面転換のたびに**一瞬まっ黒がちらつく**（`[trans layer=…]`の演出中に表の見た目が先に変わる）
	- 原因：交換対象**外**のレイヤの入れ替えを`startTrans()`＝演出の**開始時**にやっていた。
	  そのため`[trans layer=mes]`を打った瞬間、表ページの背景レイヤが「裏に組みかけの状態」
	  （テンプレでは`[grp]`が用意する非表示の背景）に化け、演出の間ずっと背景が消えていた
	- 本家は演出中はストアに当たるものを触らず、**描画時に合成**している
	  （`LayerMng.ts:648` `const lay = sDoTrans.has(ln) ? back : fore`）。入れ替えは完了時
	  （`comp()`のコンテナ差し替え）。同じ形へ寄せた：
	  - `startTrans()`は**中身を一切いじらない**（time<=0なら即完了）
	  - `Stage.tsx`が演出中の裏ページを「交換対象は裏・それ以外は表」で合成して描く
	  - `finishTrans()`（＝新設の`finTrans()`）が、交換対象外レイヤの表裏入れ替え・foreIdx反転・
	    交換対象レイヤの`back.copy(fore)`をまとめて行う（本家 `comp()`＋`Pages.transPage()`）
	- E2E追加（`grp.e2e.ts`）。`[trans layer=mes time=3000]`の**最中**に、交換対象外の
	  背景レイヤが表・裏とも見えていることを算出CSSで確かめる。修正前は表側が`display:none`
	- 実機（tmp_blues）で場面転換をまたいで**810回サンプリングして背景が消えた回数0**


- [x] `[toggle_full_screen]`で**画面いっぱいに拡大されず、中央にも寄らない**
	- 原因が2つ重なっていた
	- (1) **全画面にする要素が内箱だった**。ブラウザのUAスタイルは全画面要素へ
	  `width/height: 100%` と **`transform: none`** を強制するので、拡縮している内箱を
	  全画面にすると倍率が丸ごと消え、等倍のまま画面いっぱいに引き伸ばされる
	  （実測：内箱が1280×800・`transform: none`）。**外側（`#skynovel`）を全画面にする**形へ変更。
	  中央寄せは外側のflexに任せ、内箱は拡縮だけを持つ（原点は全画面時のみ`center`。
	  flexが拡縮**前**の実寸で中央に置くので、左上原点だと右下へ伸びてしまう）
	- (2) **拡大する条件が落ちていた**。本家 `SysBase.cvsResize()` は
	  `argChk_Boolean(CmnLib.hDip, 'expanding', true)`＝**既定で拡大する**が、こちらは
	  「ステージが窓より大きいとき」だけ＝縮小しかしなかった。窓が広いと右に黒帯が残り、
	  全画面でも等倍のままだったのはこれ。本家と同じ条件へ戻した
	- E2E追加（`stage.e2e.ts`）。窓がステージより広いとき縦横比を保って拡大されること、
	  縦に余裕がない窓では高さ側が上限になることを見る。既存2件は「ステージちょうどの窓＝等倍」で
	  実寸を比べる形に直した（拡大が入ると倍率が掛かって比較できないため）
	- 実機（1280×800）で確認：窓モードで1066×800へ拡大、全画面でも同倍率で中央（x=107）


- [x] クリック待ちマークの余白を論理プロパティへ（縦書き対応）＋テンプレ報告分の残りを実機確認
	- 待ちマークの余白が`margin-left`（物理方向）だった。縦書きでは左＝「次の行の方向」なので
	  `margin-inline-start`（横書きなら左・縦書きなら上）へ。**理屈としては正しい修正だが、
	  実測では見た目の差は出ていない**（マークと直前の文字の横位置のズレは前後とも14.4pxで、
	  主因はマークの箱の幅37pxが文字24pxと違うこと）。E2Eは「縦書きなら次は下」「列をまたがない」
	  という意味のある不変条件だけを見る形にした
	- マークの向きは、これまでの縦書き修正で**文字方向を向くようになった**（実機で確認・OK）
	- メッセージウインドウ（`b_color`／枠画像の矩形）の位置とサイズは**すでに解消済み**だった。
	  実機で箱が310×768px・`vertical-rl`・`padding: 30px 36px 24px 26px`＝マクロの指定どおりで、
	  枠画像`wafuu1`も`::before`で敷かれている。縦書きを直した時点で一緒に直っていた
	- 「タイトルへ」まわりの2件（キャンセルで本文が消える／戻ると横書きになる）も解消済みを確認。
	  `[trans]`と`[er]`の修正の副産物


- [x] `.d.ts`が出ていない（npmライブラリとして必要）
	- **壊れてはいなかった**。`aa8643e`（React製シナリオ解析ループの試作実装）で`dist/*.d.ts`が
	  まとめて削除され、以後は`watch`しか走っていなかっただけ。`src/build.ts`は元から
	  `plugins: watch ? [] : [dts(oDts)]`＝**watch中は`.d.ts`を出さない**ので、
	  再生成される機会が無かった。`bun run build`を一度回せば出る状態だった
	  （TypeScript 7で`vite-plugin-dts`が動かなくなった、という当初の見立ては誤り。
	  本家`skynovel_esm`は同じ構成のまま今日のビルドで`.d.ts`を出している）
	- そのうえで**方式はtscへ変えた**（`tsconfig.dts.json`を新設し、`src/build.ts`が
	  ビルド完了後に`tsc -p`を起動して終了コードを反映）。プラグインはviteのbuild単位で走るため:
		- 4本すべてに付くので**`dist_app/`にも同じ木が出る**。共有モジュール（`src/ts/…`,
		  `src/sn/…`）の型が2組でき、`bluesnovel`と`bluesnovel/app`の両方をimportした利用者から
		  見て**別の型**になる
		- 出力範囲がtsconfigの`include`なりなので、**`test/**.d.ts`と`build.d.ts`まで公開物に
		  混じる**（実測79ファイル。tsc側は`src`だけの40ファイル）
		- ビルド1本につき8秒以上かかる（`[PLUGIN_TIMINGS]`の警告も出る）
	- `dist_app/*.js`の型はpackage.jsonの`exports`に`types`条件を書いて`dist/`側を指す。
	  ついでにサブパスの型が引けるようになった（従来は`.`しか型が付かなかった）
	- 宣言マップ（`declarationMap`）は出さない。参照先の`src/*.ts`は公開物に含まれない
	  （`files`は`dist`と`dist_app`だけ）ので必ず切れたリンクになるため
	- `vite-plugin-dts`を依存から削除。これで`tsc --noEmit`から`unplugin-dts`由来のエラー
	  （`typescript`のルートexportに`ts.CompilerHost`が無いという内容。**型解決の話で、
	  実行時には動いている**）8件も消えた
	- `skipLibCheck: true`を追加。`react-moveable`（JSX名前空間）・`react-use`（React 19で消えた型を
	  参照）が素で9件エラーを出し、こちらでは直せない。**`.d.ts`出力の成否が終了コードで
	  分からなくなる**ため落とした
	- 40ファイル出力を確認。別プロジェクトから`@famibee/bluesnovel`と`@famibee/bluesnovel/app`を
	  importする疑似利用者で型解決も通した


- 長押しでデザインモードに入るが、本家機能大部分の完成まで無効化＆TODO記載
- todo.md: 【不使用かも・凍結】**`[quake]`の残り**：`layer=`（揺らす対象レイヤの限定）
  - 立ち絵を震わせる [fg_shake][fg2_shake] で使用しているかと思ったが、[tsy path=]で実現していた
  - sample https://github.com/famibee/SKYNovel_gallery/tree/master/public/prj/ext_fg2

- [x] デザインモード（長押しで入る）を無効化＋todo.mdの棚卸し
	- `Stage.tsx`に`ENA_DESIGN_MODE = false`を置き、長押しハンドラを要素へ**渡さない**形に。
	  フック（`useLongPress`）の呼び出し自体は残す——条件付きにするとReactのフック規則に触れるため。
	  `sty4Moveable`（恒等変換の下地）はそのままなので算出値まわりのE2Eに影響なし
	- 理由：通常プレイ中の長押しで入れてしまうのに、中で触れるのはレイヤの位置・サイズだけで、
	  **触った結果をシナリオへ書き戻す先が無い**。本家機能の大部分（音声・履歴・文字演出）が
	  揃い、「調整→保存」の行き先を決めてから戻す。todo.mdに戻す条件つきで記載
	- `[quake]`の`layer=`を【不使用かも・凍結】へ。立ち絵を震わせる`[fg_shake]`/`[fg2_shake]`が
	  使っていると思っていたが、**`[tsy path=]`で実現**していた（実装済み）ので実需が無い
	- サンプルの在り処をtodo.mdへ追記：`[quake]`関連（`ext_fg2`）・履歴（`log_and_play`）・
	  フィルター（`filter`）・画像ボタン（`ch_button`）。`noise`の参考として
	  <https://ics.media/entry/241122/> も
	- アニメpngの「文字レイヤ枠画像でのシート再生」に【現状不使用・優先順位低】を付記
	- 文字出現・消去演出（`[ch_in_style]`系）と`[page]`の残りは、既にtodo.mdにある記述のままで
	  追記なし（次の着手候補としての読み上げ）


- todo.md: **履歴（ログ）** `[log]`・`const.sn.log.json`・`save:sn.doRecLog`。テンプレの`frames/_log.sn`が使う
  - sample https://github.com/famibee/SKYNovel_gallery/tree/master/public/prj/log_and_play

- [x] **本文履歴（ログ）**：`const.sn.log.json`・`save:sn.doRecLog`・`save:const.sn.sLog`・
	`[rec_ch]`/`[rec_r]`/`[reset_rec]`（本家 `Log.ts`）
	- **溜めるものが本家と違う**。本家はTxtLayerが組み立てた表示用HTMLそのものを記録し、
	  正規表現でアニメ用のstyleやdata-*属性を削り落として履歴テキストにする（`TxtLayer.ts:604`）。
	  こちらは表示単位（`T_CH`）へ割る**前の生の本文文字列**を溜め、読み出し時にHTMLへ起こす
	  （`src/ts/Log.ts` の `htmlOf()`）。理由は2つ——エンジンはDOMを持たないので
	  「表示されたHTML」が存在しない／`splitCh()`が既にルビ記法と埋め込み命令を解釈できるので、
	  **削り落とすのではなく組み立てられる**
	- 帰結の相違2つ（履歴表示の用途では困らないと判断）：`[link]`のリンクは落とす、
	  `[graph]`のインライン画像は本文と同じ全角空白1つになる（画像のパス解決はScriptMngの仕事で、
	  エンジンが持つ生文字列にはURLが入っていないため）
	- ログはエンジン側に置いた（本家は`LayerMng`が持つ）。記録するのが「シナリオが書いた本文」で
	  あって見た目ではないため。おかげで**履歴の検査がブラウザ抜きで全部書ける**（`test/Log.test.ts`）
	- 1ページの区切りは`#hTxt`（既定文字レイヤの表ページ）が捨てられる地点すべて＝`[p]`の再開時・
	  `[er]`・`[clear_text]`・`[clear_lay page=fore]`・`[current]`の切替。本家が
	  `LayerMng.ts:956/995/1006` と `TxtLayer.clearText()` で `pagebreak()` を呼ぶのと同じ位置。
	  **空ページは積まない**（本家 `Log.ts:105`）のでUI画面を出入りしただけでは履歴が増えない
	- `save:const.sn.sLog`は**しおりを保存する直前に1回だけ書く**。本家は本文を1トークン
	  追記するたびに書き直すが、この値を読むのはしおりの保存と復元だけ。`nowMarkPart()`／
	  `restoreMarkPart()`という口がエンジンにあるので、そこに寄せれば足りる
	  （本家がそうしているのは、あちらのLogがしおり処理から見えない場所に居るため）
	- `save:sn.doRecLog`がfalseの間は**積まない**。本家は記録を止めるのでなく
	  `<span class='offrec'>`で包んで履歴側で隠す（`TxtLayer.ts:494`）が、こちらは履歴の蓄積が
	  表示と別物なので単に積まない。既定はfalse（本家 `CmnInterface.ts:149`）
	- `[rec_ch]`は`text`のみ対応（`style`/`r_style`/任意属性は未対応→todo.md）。本家は
	  `display: none;`を付けた`[ch]`として本文へ流すが、こちらは履歴にだけ積む。そのため
	  **`doRecLog`がfalseでも記録する**（明示的な書き込みなので）。`[ch record=false]`も対応
	- 上限ページ数は`prj.json`の`log.max_len`（既定64）。`const.sn.config.log.max_len`として
	  ScriptMngから渡す（本家の`const.sn.config.（略）`はprj.jsonの中身をそのまま返す仕様）
	- 検査27件（`test/Log.test.ts`）。docs/tag.htmlは`[rec_ch]`🟡・`[rec_r]`🟢・`[reset_rec]`🟢、
	  docs/dev.htmlは`save:sn.doRecLog`🟢・`save:const.sn.sLog`🟢・`const.sn.log.json`🟢へ


- todo.md: **文字出現・消去演出**

- [x] **文字出現演出**：`[ch_in_style]`／`[ch_out_style]`（定義）と`[lay in_style=/out_style=]`
	- **本家はCSSの`@keyframes`を文字列で組み立ててスタイルシートへ挿す**（`TxtLayer.ts:148`）が、
	  こちらは同じ値を**GSAPのtweenへ翻訳**する（`src/ts/ChStyle.ts`）。文字送りを既にGSAPで
	  回しているため——2つの仕組みを併走させると、クリックでの瞬時完了（`progress(1)`で終端へ
	  飛ばす）が効かなくなる。`Tsy.ts`が`[tsy]`に対してやっているのと同じ立ち位置
	- **既定の見た目が変わった**。これまでの文字送りは仮値（`duration: 0.25`・`y: '0.3em'`）だったが、
	  組み込みの`default`を本家の既定（`wait=500`・`alpha=0`・`x='=0.3'`・`join=true`・`ease-out`。
	  本家 `TxtLayer.ts:120`）に合わせたので、**1文字あたりの時間が倍**になり、ずれる向きも
	  縦から横になった。todo.mdの「仮値」項目はこれで解消
	- **相対位置は`%`でなく`em`にした**。本家は`${nx * 100}%`だが、パーセントは要素自身の箱を
	  基準にするので、本家は文字spanへ`display: inline-block`を敷いて箱を作っている。
	  bluesnovelの文字spanはinlineのまま（行分割をブラウザに任せている前提を崩さないため）で
	  **幅が0＝パーセントが効かない**（実際に算出値が単位行列になるのを確認）。
	  `em`ならフォントサイズ基準なので箱に依らず、**全角文字では本家と同じ値**になる
	- `ease`はCSSの`animation-timing-function`名をGSAPのeaseへ読み替える。厳密には曲線が
	  一致しない（`ease-out`は cubic-bezier(0,0,.58,1) と二次イージングの差）が、数百ミリ秒では
	  見分けが付かない。`cubic-bezier()`／`steps()`はプラグインが要るので既定へ倒す
	- `join=false`はstaggerを0にする（本家は`animation-delay`を0msに潰す）。`wait=0`は
	  tweenを積まず`gsap.set`で終端を確定させる
	- **`[ch_out_style]`は定義だけ**（消去のアニメは未適用＝本家の既定`wait=0`と同じ結果）。
	  文字が消えるのはReactが要素を捨てる場面なので、消えていく間だけ古い文字を生かす仕組みが
	  別途要る。docs/tag.htmlで🟡、todo.mdに条件つきで記載
	- 検査：`test/ChStyle.test.ts`13件（属性の読み取りと値の翻訳）＋`test/e2e/chstyle.e2e.ts`4件。
	  E2Eは**「その場面の直前まで進めてGSAPを止め、1手だけ進めてから時間を手で送る」**形。
	  止めた直後はtweenがまだ1度も描いていないことがある（初回描画は親タイムラインのtickで
	  起きる）ので、`globalTimeline.time()`を進めてから撮る
	- 既存E2E3件の**競合を直した**（本件で顕在化）。いずれも「本文が出揃ったこと」だけを見て
	  次のキーを押しており、文字送りが続いている間に押すと瞬時完了へ食われる（`Main.tsx next()`）。
	  既定時間が倍になって表面化した。`expect.poll(mesStr)`の後に`waitIdle()`を足して解消
	  （`waitev`×2・`autoskip`）。`trans`の1件は演出時間の計測に`waitTransDone()`を使っており、
	  そちらが続く本文の文字送りまで待つため、**演出の終わりだけを待つ`waitTransCleared()`**を
	  分けた。全体を3回連続で通して安定を確認

- [x] **文字ごとの指定**：`[span]`/`[ch]`の`ch_in_style`/`ch_out_style`/`wait`属性、
	`[autowc]`（文字ごとのウェイト）、`sys:sn.tagCh.*`の接続
	- **文字送りの組み立てを1本のtween＋staggerから「1文字＝1tween」へ変えた**。
	  staggerでは「文字ごとに演出が違う」「文字ごとに待ちが違う」のどちらも表せないため。
	  timelineの位置（秒）で両方を表す＝本家が文字ごとに`animation-delay`を書くのと同じ形
	- 属性は既存の埋め込み命令（`add｜`／`span｜`）にそのまま乗っているので、`splitCh()`側で
	  読むだけで済んだ。`T_CH`に`cis`/`cos`/`w`を足し、**スタイルは重ねるが演出名と待ちは
	  「後の指定が勝つ」**（本家 `#o2domArg()` も `[ch]`の値 → 親`[span]`の値 → 既定 の順に落とす）
	- `[autowc]`：`text`の1文字目と`time`の1つ目…を対応させる表。本家と同じ検査
	  （同時指定必須・個数一致・`enabled`省略時は現在値を保つ）と`save:const.sn.autowc.*`への書き出し。
	  **待ちはその文字が出る前に入る**ので、表に載せた文字自身とそれ以降が後ろへずれる
	  （本家 `TxtLayer.ts:762` が`cumDelay`へ足してからその文字の`animation-delay`に書くのと同じ）。
	  表に無い文字の待ちは0（本家も`?? 0`）なので、有効な間は表の文字までが一気に出る
	- `sys:sn.tagCh.*`を繋いだ（todo.mdの「未接続」が解消）。**既読と未読で別の設定**を見る
	  本家の作り（`ScriptIterator.ts:1332 normalWait`）をそのまま移植し、`doWait*`がfalseなら0。
	  sys:未設定なら本家の初期値10ms。**これも既定の見た目が変わる**：これまでの1文字あたりの
	  遅れは仮値の35msだったので、**3.5倍速くなった**
	- エンジンは`chWait`ゲッタで値を出し、ScriptMngが停止点ごとにストアへ写す
	  （`backAlpha`/`btnFont`と同じ形）。**本家はトークンごとに読むが、こちらは停止点ごとに1回**
	  ——Reactが描くのは停止点の後なので、1停止点の間で値が変わっても絵には出ない
	- 検査：`test/ChStyle.test.ts`に15件追加（文字ごとの属性・`[autowc]`の検査・`chWait`の
	  既読/未読分岐）＋`test/e2e/chstyle.e2e.ts`に2件（文字ごとの演出・`[autowc]`の遅れ）。
	  ユニット1362 / E2E143、全体を2回連続で通して安定を確認
	- **`[ch_out_style]`の適用は保留**（todo.mdへ）。定義と`[lay out_style=]`・
	  `[span ch_out_style=]`は受け付けるが、消去のアニメはまだ行なっていない


- todo.md: **フィルターの残り**
  - ノイズはひょっとしてこちらが参考になるか https://ics.media/entry/241122/
  - sample https://github.com/famibee/SKYNovel_gallery/tree/master/public/prj/filter

- [x] **フィルターの残り12種**：`ColorMatrixFilter`のプリセットをSVGの`feColorMatrix`へ
	（`color_matrix`・`browni`・`color_tone`・`kodachrome`・`lsd`・`night`・`polaroid`・
	`predator`・`technicolor`・`tint`・`to_bgr`・`vintage`）
	- **pixiの`m[0..19]`とSVGの`feColorMatrix`の`values`は並びが同じ**なので、行列をそのまま
	  写すだけで同じ絵になる。行列はpixi 6.5.10の`@pixi/filter-color-matrix`から取った
	- `<filter>`要素はStage.tsxが出す。**CSSの`filter: url(#…)`は同一文書内の要素しか指せない**
	  （`data:`URLは不可）ため、今どちらかのページで使われている行列を集めて出す形にした。
	  **idは行列の中身から決める**ので、同じ効果は1つの要素を共有する。
	  色空間はsRGB固定（既定のlinearRGBだと変換が入り、テクスチャの値をそのまま扱う
	  pixiのシェーダと合わなくなる。ルール画像ワイプのフィルタと同じ理由）
	- **`multiply`属性は無視する**ことにした。pixiでは「今の行列に掛ける」意味だが、こちらは
	  フィルターをCSSの`filter`プロパティに並べる＝前の結果に順に掛かるので、掛け合わせは
	  並べた時点で起きている
	- 併せて**オフセット列の揺れを持ち込まない**ことにした。pixiは`multiply=true`のときだけ
	  オフセットを255で割る（`_colorMatrix()`）ので、**同じプリセットでも`multiply`の指定で
	  明るさが変わる**。こちらは行列を最初からSVGの流儀（オフセットは0〜1）で書く。
	  影響するのは`technicolor`／`kodachrome`／`browni`／`vintage`の4つ
	- 残る未対応は`noise`だけ（CSSにもSVGの単純な組合せにも相当が無い）。
	  エラー文言も「CSSのfilterで表現できない」から実態に合わせて直した
	- 検査：`test/ScriptEngine_filter.test.ts`に8件追加（行列の値・オフセットの正規化・
	  `color_matrix`の2通りの書き方・idの一意性）＋`test/e2e/filter.e2e.ts`4件。
	  **E2Eは画素で見る**——CSSの算出値は`url(#sn_cm_…)`としか言わないので、
	  効いたかどうかは色の分かっている矩形を撮って数えるしかない


- todo.md: **`[button]`の残り**：画像ボタン
  - sample https://github.com/famibee/SKYNovel_gallery/tree/master/public/prj/ch_button

- [x] **画像ボタン**：`[button pic=…]`（3コマの絵）と`[button b_pic=…]`（背景画像）
	- `pic`は**「通常｜押下｜ホバー」を横に3コマ並べた1枚**（本家 `Button.ts:269` が幅を3等分して
	  テクスチャを張り替える）。こちらは背景を3倍幅に敷き、`background-position-x`を
	  0%／50%／100%と動かして同じ3コマにする（背景が要素の3倍幅のとき、この3つがちょうど
	  各コマの左端に当たる）
	- **どのコマを見せるかはインラインstyleに書けない**。インラインstyleは`:hover`／`:active`の
	  ルールより強く、状態で切り替えられなくなるため。絵と3倍幅の指定だけをインラインに置き、
	  位置は状態別ルール（emotionのcss）が持つ形にした
	- 箱の大きさは**絵の実寸**（横は3コマ分の1/3。本家 `Button.ts:280`）。実寸を知れるのは
	  DOM側だけなので、BtnLayerが`Image`で読み込んで測る。`width`/`height`を書けばそちらが勝つ
	  （本家も`'width' in hArg`を優先）。**エンジンの入口で寸法の既定（100×30）を埋めるのは
	  文字ボタンだけ**にした——画像ボタンで埋めると絵の実寸が使われなくなる
	- `pic`を書くと**文字は出ない**（本家もpic側の分岐で早期returnし、文字の組み立てへ進まない）。
	  `text`は`pic`が無いときだけ必須で、文言も本家に合わせた
	- `b_pic`は文字を残して背後へ絵を中央合わせで敷く（本家 `Button.ts:249`）。
	  **本家は絵の実寸ぶんに箱を広げるが、こちらは箱の大きさを変えない**（todo.mdへ）
	- 画像は論理名で積み、解決済みURLを入れるのはScriptMng（`[lay fn=]`と同じ関係）
	- 検査：`test/ScriptEngine_btn.test.ts`に5件＋`test/e2e/btnpic.e2e.ts`5件。
	  E2Eのフィクスチャは**コマごとに色を変えた3コマPNG**（通常=赤／押下=緑／ホバー=青）を
	  置き、今どのコマが出ているかを画素で数える。箱の大きさは`offsetWidth`で測る
	  ——`boundingBox()`はステージの`transform: scale`が掛かった画面上の実寸を返すので、
	  シナリオに書いた数値と直接は比べられない


- todo.md: **アニメpng（スプライトシート）の残り**
  - 【現状不使用・優先順位低】文字レイヤの枠画像でのシート再生
  - `[graph]`の`width`/`height`
  - `[l]`/`[p]`の待ちマークの位置指定

- [x] **インライン画像と待ちマークの位置・寸法**：`[graph]`の`width`/`height`/`x`/`y`と、
	`[l]`/`[p]`の待ちマークの同4属性（本家 `TxtStage.ts:685-688`）
	- どちらも**書いた時だけ当てる**。省略すれば全角空白1つぶんの枠／本文の直後に流し込む位置に
	  出る（本家の既定もフォントサイズなので同じ絵）。CLAUDE.mdの「属性の既定値は1箇所」に従い、
	  既定はCSS側に置いたまま
	- `x`/`y`は**ずらし**なので、CSSの独立`translate`で表す——行の高さや隣の文字の位置を
	  動かさないため。本家も待ちマークを専用コンテナへ入れ、その中の相対座標として扱っている
	  （`TxtStage.ts:500` がコンテナ自体を本文の終端位置へ置く）
	- 検査：`test/ScriptEngine_txt.test.ts`に6件＋`test/e2e/anime.e2e.ts`に2件。
	  E2Eで本文中の画像を拾うときは**`data-lay`の1つめの子（本文）に絞る**必要があった——
	  待ちマークの`breakline`も同じ`sn_ani`クラスを持つので、レイヤ全体で拾うと2つになる

- [x] **`[button]`の配置属性は「本家にも無い」と判断**（実装せずtodo.mdの項目を訂正）
	- `Button.ts:79-80`が読む位置属性は`left`/`top`だけで、`Layer.setXY()`を通らない。
	  本家のタグリファレンスも`[button]`には`left`/`top`しか載せていない
	- `Layer.setXY()`の`isButton`分岐（`center`等で幅を**1/3**にして計算する）は
	  **呼び出し元が無い死んだコード**（`isGrp=true`の2箇所と`TxtLayer`からしか呼ばれない）。
	  以前この分岐を見て「本家は対応している」と読み違え、todo.mdに実装項目として書いていた
	- ちなみに1/3の理由は今回の画像ボタンで分かった：本家の`pic`は3コマ並びなので
	  スプライトの幅が見た目の3倍ある。bluesnovelの箱は最初から見た目の幅なので、
	  仮に対応させても1/3は要らない。「本家へ確認したいこと」へ移した


- [x] **`[er]`が変形まわりの属性を既定へ戻す**＋`rec_page_break`／`clear_filter`
	- 本家の`[er]`は`TxtLayer.clearLay()`（`TxtLayer.ts:857`）を表裏に呼び、本文とボタンを
	  捨てたうえで`Layer.clearLay()`（`:420`）が`alpha`／`blendmode`／`pivot`／角度／拡縮を
	  初期値へ戻す。こちらは本文とボタンの消去だけで、後半が抜けていた
	- **位置（`left`/`top`）と`visible`・見た目（`style`/`b_color`/`b_pic`）には触らない**。
	  タグリファレンスの見出しは「[clear_lay]を行う」だが、本家の`#er()`が呼ぶのは
	  `clearLay(hArg)`＝**タグの処理ではなくレイヤの同名メソッド**で、そちらは位置を戻さない。
	  紛らわしいのでdocs/tag.htmlにその旨を書いた
	- 併せて`[er rec_page_break=false]`（履歴を改ページしない。本家 `LayerMng.ts:1006`）と
	  `[er clear_filter=true]`（フィルターも落とす。本家の既定はfalse）に対応
	- ストアの`clearBtn`は**やることが増えたので`clearTxtLay`へ改名**（本家 `TxtLayer.clearLay()`に対応）。
	  `[er]`専用の口なので呼び出し側は1箇所
	- 検査：`test/store_lay.test.ts`に3件（戻す範囲・フィルターの条件・ボタン）、
	  `test/ScriptEngine_btn.test.ts`に1件、`test/Log.test.ts`に1件、
	  `test/e2e/lay.e2e.ts`に1件（位置と`style`が残ることまで算出値で）
	- ついでに`[clear_text]`を🟢へ。履歴の改ページは先の作業で入っており、docs側が古かった
	- **画像ボタンのE2E2件がゆらいでいたのを直した**。絵の実寸が箱に入るのは画像を読み終えて
	  からなので、一度きりの計測では早すぎることがある（フルスイートだと負荷で顕在化）。
	  `expect.poll`で落ち着くまで待つ形にし、色を撮るテストも読み終えてから撮るようにした。
	  全体を3回連続で通して安定を確認


- tmp_blues: doc/prj/script/sub.sn:70 に[s]を置いた。オレンジ色の点々矩形が出る。恐らく文字レイヤ、これが表示されるのは不具合
- todo.md: しおり・システム系の残り
  - `[snapshot]`の結果は本家 src/sn/LayerMng.ts:338 での流れが参考に。
    - `userdata:/`なら参考資料-> https://famibee.github.io/skynovel_esm/tag.html#snapshot
    - `downloads:/`はいわゆるダウンロードフォルダ。ブラウザからでもDLという形でユーザーに渡せる

- [x] **`b_alpha=0`の文字レイヤに点線枠が残る不具合**（tmp_blues の全画面に出ていたオレンジの
	点々矩形）。点線枠は「本来見えない文字層の位置と大きさ」を示す試作の目印だが、**CSSの
	`border`なので`b_alpha`が効かない**。テンプレの`[txt_lay_fullscreen b_alpha=0]`は
	`b_color`を書く（＝箱を描く条件を満たす）ため、背景だけ透明になって枠が残っていた。
	背景の不透明度が0なら箱そのものを描かないようにした

- [x] **`[snapshot]`の残り**：`smoothing=`・拡張子によるフォーマット指定・`userdata:/`保存・
	`b_color`の透過2桁
	- **行き先が`fn`の書き方で2つに**（本家 `LayerMng.ts:340-344`）。`userdata:/…`なら
	  ダウンロードせず**セーブ層**（`SaveMng`）へ入り、日時も付かないので
	  `[lay fn='userdata:/…']`で読み返せる（しおりのサムネイル用途）。それ以外は従来どおり
	  ダウンロード。本家アプリ版はセーブデータと同じフォルダへ実ファイルを書くが、ブラウザに
	  フォルダの概念は無いので**localStorageへdata URLのまま**置き、`[export]`/`[import]`にも
	  一緒に乗せた（本家も「関連するデータファイルも含む」と書いている）
	- 画像パスの解決（`ScriptMng#searchPic()`）に`userdata:/`の分岐を足したので、
	  `[lay]`/`[graph]`/`[button pic=]`のどれからでも引ける
	- **ダウンロード名は日時を拡張子の前**に入れる。本家は`fn＋日時＋'.png'`固定で、
	  拡張子でフォーマットを選べるのが`userdata:/`側だけになっていたため
	- `b_color`は**0xAARRGGBB**として扱う（`[lay b_color=]`の0xRRGGBBとは別物）。
	  `0x0`で透過png・`0xFF000000`が不透明な黒＝tag.htmlの記述どおり。
	  **本家web版の実装はここが逆**（`LayerMng.ts:383`）


- tmp_blues: 縦書きでクリック待ち記号が左を向いている。下向きに
- tmp_blues: doc/prj/script/ss_000.sn:20 で[l]停止中、home,pageup,pagedown,endキー押下で doc/prj/frames/_submenu.sn:108 *pageから[page]を呼ぶが、ページ移動しない

- [x] **縦書きで待ちマークが左を向く**（tmp_blues）。待ちマークの絵は本文の中（ぶら下げ位置）に
	置いているが、**背景画像も`<img>`も`writing-mode`では回らない**ので、書字方向と食い違う。
	縦書きのときだけマークを-90°回すようにした。本家は待ちマークを本文とは別のpixiコンテナへ
	固定位置で置くのでこの問題が出ない。テンプレの`breakline`（◀）は▼に、`breakpage`（▼）は
	◀になる＝どちらも「次の行の方向」を指す形で揃う

- [x] **`[page]`の残り**：`to=`（指定ページへ移動）・`style=`・`key=`
	- **読み戻りを本家と同じ「演じ直す」方式へ作り直した**（`src/ts/PageLog.ts`）。停止点ごとに
	  「そのページの**本文が出る前**の位置＋しおり」を積んでおき、戻るときはしおりを復元して
	  その位置からシナリオを動かし直す（本家 `loadFromMark()`）。
	  **画面のスナップショットを貼り直す方式（`Memento.ts`）では作れない**のがこの形にした理由で、
	  `[page to=load]`（見ているページから再開）にはエンジンの位置が戻っている必要がある。
	  `Memento.ts`と`Stage.tsx`の記録呼び出しは削除
	- 組み込みのPageUp/PageDownも同じ経路（`to=prev`/`to=next`）にした。テンプレが
	  `[event key=pageup label=*page]`で同じことをするので、キー操作とシナリオ指定が同じ動きになる
	- **端まで来ていて位置が動かない場合も今のページを演じ直す**（本家は何もしない）。`[page]`へ
	  来た時点で（`[p]`の直後なら）本文がすでに消えているため、演じ直さないと画面が空のまま残る
	- `style=`は`save:const.sn.styPaging`へ置く（しおりに乗る。本家も同じ）。読み戻り中の本文へ
	  当てるのは**`[lay style=…]`より後**——レイヤ自身が色を書いていても勝つ必要があるため
	- `key=`は読み戻り中に効くイベントキーの限定（本家 `waitRsvEvent4Paging()`）
	- 途中で見つけた不具合：**しおりにエンジン側の本文（`#hTxt`）が入っていなかった**。
	  `chgStr`はページの累積本文を丸ごと送る作りなので、ストアのページを戻すだけではここが
	  古いまま残り、復元後に1文字足しただけで前の本文が丸ごと戻ってくる。`[load]`も同じ穴が
	  あったので`nowMarkPart()`/`restoreMarkPart()`に含めた（既定文字レイヤも戻すようにした）
	- 同じく、改ページ（`[p]`の次の進行で本文を消す）は**トークンではなくエンジンのフラグ**で
	  起きるので、ページログがそれも覚えて戻す


- 🔴 save:const.sn.layer.（文字レイヤ名）.enabled は実装できるように思う
    falseのとき、文字レイヤ上にボタンがあっても押せなくする。まとめてイベントを操作する用途の機能
- アプリ版を起動( bun run app )してみたがエラー
  > error during start dev server and electron app:
  > Error: Electron uninstall
- アプリ向けタグの実装 [snapshot][close][update_check][window]、しおり関係

- [x] **`save:const.sn.layer.（文字レイヤ名）.enabled`**。`[add_lay]`でtrue、`[enable_event]`で
	書き換わる（本家 `LayerMng.ts:465`/`:1092`）。**読む専用**で、ここへ代入しても有効・無効は
	変わらない（変えるのは`[enable_event]`）
	- 併せて`[enable_event enabled=false]`が**本文中の`[link]`も効かなくする**ようにした。本家は
	  文字レイヤのコンテナごと`ctn.interactiveChildren = false`にする（`TxtLayer.ts:838`）ので
	  ボタンとリンクがまとめて止まるが、こちらはボタンの箱にしか当てておらず漏れていた。
	  クリックはステージへ抜けるので読み進めは止まらない

- [x] **`bun run app`（テンプレのアプリ版）が起動しない**。原因が3つ重なっていた。
	最後まで通して**起動を確認済み**
	1. **electron本体のバイナリが無い**。bunはセキュリティのため既定でpostinstallを走らせないが、
	   electronはpostinstallで本体を落とす作り。`package.json`へ`trustedDependencies`を足した。
	   **ただし既に展開済みのnode_modulesでは`bun install`しても走り直さない**ので、一度だけ
	   `node node_modules/electron/install.js`が要る（両プロジェクトで実行済み）
	2. **テンプレ側のバンドルにelectron本体が取り込まれていた**（`tmp_blues/electron.vite.config.ts`）。
	   electron-viteのプリセットは`external: ['electron', …]`を持つのに、vite 8では効いておらず、
	   `node_modules/electron/index.js`（バイナリの場所を返すCJSシム）ごと`out/main`へ入る。
	   すると**シムが`out/main/`を基準に`path.txt`を探して見つからず**、
	   「Electron failed to install correctly」になる。同ファイルへ`external`を明示して解決
	3. **`dist_app/appMain.js`にブラウザ版の依存が混じっていた**（下記）

- [x] **`dist_app`（electronの主処理・preload）は依存をバンドルしない**ようにした
	（electron-viteの`externalizeDepsPlugin`と同じ考え）。
	- 取り込むと**browser条件で解決された版が混じる**。実際`electron-store`が使う`atomically`は
	  ブラウザ版が`window.addEventListener('beforeunload', …)`を**モジュール読み込み時に**呼ぶので、
	  主処理で読むと`ReferenceError: window is not defined`で落ちていた
	- 併せて`resolve.conditions: ['node']`も指定（挙げ漏れた依存への保険）
	- `dist_app/appMain.js`は456kB→6.2kB。利用側のバンドラも同じものを二重に取り込まずに済む
	- 外部化の副作用で`fs-extra`（CommonJS）の名前付きimportが**実行時に**通らなくなったので
	  （`SyntaxError: Named export 'appendFile' not found`）、デフォルトimportから展開する形へ。
	  バンドルしていた頃はバンドラがinteropしていたので気づけなかった

- [x] **アプリ版のレンダラ（`SysApp`）を最低限動くところまで**。`src/app.ts`は
	「コンストラクタでログを出すだけ」のスタブで、**ウインドウが永久に出てこなかった**。
	`BrowserWindow`は`show: false`で作られ、`appMain_cmn`が`inited`を受け取って初めて
	`bw.show()`する作りなのに、それを送る相手（レンダラ）が無かったため
	- `SysBase`を継承して`loaded()`を回し、主処理から`getInfo`（`userdata:/`・`downloads:/`の
	  解決先）を貰ってから Config を作り、最後に`inited`を送る
	- 主処理側の`console`出力の中継と、テンプレのメニューからの`fire`（キー操作の代行）も繋いだ
	- `[close]`／`[window]`をアプリ版の実処理へ接続。`[update_check]`・アプリ版の`[snapshot]`
	  （`capturePage`）・しおりのファイル保存はこれから（todo.md）

- [x] **アプリ（Electron）版のタグ**：`[close]`・`[update_check]`・`[window]`
	- エンジンは属性の検査と`sys:`への焼き付けまでを受け持ち、実処理は`SysBase`のメソッド
	  （既定はno-op）へ渡す。**ブラウザ版では何もしない**のは本家も同じ（`SysBase.ts:446`ほかが
	  no-opで、`SysApp`だけが上書きする）。これでテンプレの`[close]`/`[window]`を含む
	  シナリオがブラウザ版でも素通りする
	- `[window]`の寸法は**`width`/`height`でも`w`/`h`でも受ける**。本家はタグリファレンスが
	  前者、実装（`SysApp.ts:443`）が読むのは後者という食い違いがあり、テンプレ
	  （tmp_blues `main.sn:86`）は前者で書いているため
	- **残りはレンダラ側の`SysApp`**（`src/app.ts`は今のところ空のスタブ）。主処理側
	  （`src/appMain_cmn.ts`）はIPCハンドラまで移植済みなので、そこを繋ぐ作業になる。
	  アプリ版の`[snapshot]`（`capturePage`＝フレームの中身も写る）としおりのファイル保存も
	  そこで版が分かれる


## 2026/07/25

- skynovel_esm 版テンプレtmp_esm_uc( https://github.com/famibee/tmp_esm_uc/ ) のタイトル画面 snapshot20260724_tmp_esm_uc.jpg を渡す（pngもあるので必要なら伝えて）
- とりあえず tmp_esm_uc/doc/prj/bg/title.jpg の表示、文字ボタン表示（デザインが違ってもいい、場所だけ正確に）ができないか


ボタンの見た目をもう少し寄せられるか。すなわち

最初
から

ではなく　最初から　と横並びのままwidth=90に収め、https://famibee.github.io/SKYNovel/tag.html#button のデフォルト style(color: black;align: 'center';padding: 5;dropShadow: true;dropShadowAlpha: 0.7;dropShadowColor: white';などcss)


ok。ついでに「fontFamily: 'Hiragino Sans', 'Hiragino Kaku Gothic ProN', '游ゴシック Medium', meiryo, sans-serif;」も


ボタン文字は tmp_blues/doc/prj/theme/ext_lang.sn:331-334 のように
	Start = '最初から'
	Load = ' ロード '
	Album = 'アルバム'
	Config = ' 設 定 '
として。こちらでやってみたがtrimなしにできるか。


かなり近くなった。ちなみにボタン文字、渡したjpgよりやや縦長で線も太いが、寄せられるか。なるべくfont-familyはそのままで。他に手段がなければ「-light」的なfont-family重み指定を使って良い


見た目はok。さて実テンプレtmp_blues上でe2e実行して[s]停止し、この見た目の状態まで実行できるか。tmp_blues/doc/prj/script/main.snはこちらでtmp_esm_ucのものに置換した。

- [x] **タイトル画面をブラウザで描画：実背景＋本家準拠の文字ボタン**（2026-07-25 完了）
	- 確認用フィクスチャ `test/e2e/app/prj_uc/`（`?prj=uc`）。本家 `tmp_esm_uc` の `theme/title.sn` のタイトルを core タグだけで再現。実 `bg/title.jpg`（1024×768）を実体で同梱し、`path.json`→`searchPath`→`<img>` の経路で背景表示
	- **`[button left=/top=]` の絶対配置バグ修正**（`TxtLayer.tsx`）。座標指定ボタンが流し込み用の箱（`top:70%`）を基準に配置され、`top:360` が画面外（y≈841）へ落ちていた。座標指定ボタンを**ステージ原点基準の箱**（`styChild`＝`top:0/left:0`）へ分離し、書いた `left/top` がそのままステージ座標になるように（本家 `Button.ts` はステージ左上からの絶対配置）
	- **ボタン既定の見た目を本家 `Button.ts` の TextStyle に準拠**（`BtnLayer.tsx`）。`fill:black`（無効時 gray）/`align:center`/Hiragino系 `fontFamily`/`dropShadow`（white・α0.7・blur7・distance0）→ CSS `text-shadow: 0 0 7px rgba(255,255,255,.7)`。以前の丸枠ピル装飾は撤去。hover は本家 `style_hover.fill='white'` に合わせ白へ。`font-weight` は本家が未指定＝normal（bold を撤去し線を細く）
	- **文字を箱に収めるフィット**。本家 pixi `Text.width/height`（文字スプライトを箱ちょうどに拡縮）に相当する機能が CSS に無いので、BtnLayer が素の文字寸法を `useLayoutEffect` で実測し `transform:scale` として合成（短い文字は広げ、長い文字は縮めて1行に収める）。`white-space:pre` でスペースを保持し、本家 `ext_lang.sn` の `' ロード '`/`' 設 定 '` のような余白入りラベルが効く
	- ステージ既定フォント（`Stage.tsx`）に同じ Hiragino スタックを追加（本家 `TxtLayer.ts:272` のメッセージ層デフォルト準拠）。メッセージ文字レイヤが継承する
	- E2E：`button.e2e.ts` の回転検証を、transform に fit スケールが合成される前提で「行列成分の生値」から `atan2` による角度復元へ更新。**全 E2E 77 件パス**、`tsc` は src/test エラーなし
	- **実プロジェクト（`tmp_blues`）通しの調査で `const.sn.lay.*` 未実装がブロッカーと判明**。`[add_lay layer=0 cond=!const.sn.lay.0]` の存在ガードが効かず（常に真）、重複追加でストアが throw → title 手前で停止。engine テスト（`uc_goal`）が通るのは純エンジンでストアの重複検査を通らないため。対応は todo.md の `const.sn.lay.*` 項目へ

- [x] **実テンプレ `tmp_blues` がブラウザでタイトルの `[s]` まで到達（`const.sn.lay.*` 存在判定＋見た目調整）**（2026-07-25 完了）
	- **`const.sn.lay.*`**。`VarStore.#getFromJson`（JSON潜り込み）の前方一致の起点を、格納変数(`#h`)だけでなく**組み込み変数(`#hBuiltin`、tmp:のみ)**にも広げ、`const.sn.lay` のように「JSONツリーを返す組み込み変数」の下位（`const.sn.lay.0`）を辿れるようにした。`ScriptMng` が**ストアの表裏ページからレイヤ木の JSON を返す builtin `const.sn.lay`** を登録。これで `[add_lay cond=!const.sn.lay.N]` の重複防止ガードと `*max_lay_lp`（`const.sn.lay[N]`）が効き、実テンプレの `main.sn → setting → ext_* → sub → _yesno(frame) → title` が**ブラウザで title の `[s]` まで走り切る**（背景 `title.jpg`＋ボタン4つ描画）。
	- **`const.sn.lay` の詳細ツリー**も同じ木で提供：`const.sn.lay[N].<fore|back>.visible/.alpha/.left/.top/.width`（立ち絵 `[fg2]` のGCが `visible && alpha>0 && width>0` で使う）。visible/alpha/left/top は `T_LAY_STY` の実値、**width/height はストアに実寸が無いので「表示物があるか（grp=画像src／txt=文字orボタン）」を 1/0 で代用**。存在判定（中間ノードはオブジェクト＝truthy）と両立。ユニット `getVal_33_builtin_json_descend`・`getVal_34_builtin_json_tree` 追加
	- **`[button]` の既定ページを本家準拠の `back` へ**（`ScriptEngine.argPage(args,'back')`）。本家サンプルの `title.sn` は「mesを裏で組んで `[trans]` で表へ」流儀で、既定 `fore` のままだとボタンが裏に取り残され、表の空 mes が既定の箱を出してボタン帯に被っていた。`[trans]` を挟まずその場で見せる E2Eフィクスチャ（`prj_button`/`prj_frame`/`prj_wait`/`prj_uc`）は `page=fore` を明示。関連ユニットの既定期待値も `back` へ更新（`button_defaultsToBack`、`uc_goal` に `page:'back'` 検証追加）
	- **空のメッセージ窓の見た目**（`TxtLayer.tsx`）。**文字が無くボタンだけ乗る層（＝メッセージ窓ではなくUIコンテナ）** は既定の箱（aquamarine背景＋オレンジ点線枠）を描かない（`isBtnOnly`）。タイトルの mes がまさにこれ。`[clear_lay]` 直後などボタンの無い空メッセージ窓は従来どおり既定の箱を出す（`lay.e2e` 維持）
	- 検証：ユニット **909件パス**、E2E **77件パス**、`tsc` クリーン。実 `tmp_blues` のタイトルがリファレンス snapshot とほぼ一致


tmp_esm_ucをvite実行できるようなので、見比べながら実装できるか
まずはタイトルの「アルバム」ボタンをクリックし doc/prj/frames/_album.sn:100 の[s]で停止するまで

  ① サムネイル画像が壊れる（最重要・根本1つ）
  src="_album_miken.jpg" が natW:0＝404。srcdoc の iframe は相対URLを親ページ基準で解決するため localhost:5273/_album_miken.jpg を見に行く（正しくは .../prj/frames/_album_miken.jpg）。しかもこの img はフレーム内JSが動的生成するので、静的HTMLだけ書き換える FrameMng#resolveUrls() が拾えない。
  → 修正案：srcdoc に <base href="<framesディレクトリ>/"> を1つ挿入。これで静的・動的問わず相対URLが frames 基準で解決する。FrameMng はフレームHTMLの解決パスを持っているので、その dirname を base にできます。

  ② 列数・ページネーション（本家3列＋1/2ページ、bluesnovel 4列・ページ無し）
  おそらく ①の副作用。壊れた画像は寸法0でカードが縮み、1行に多く入って全10件が1ページに収まる。サムネが正しく載れば本家同様3列＋ページ送りになるはず（要再確認）。

  ③ now playing: (No BGM)（本家は free0509）
  音声層が未実装のため。todo の「音声」項目どおり一旦保留。

  提案
  まずは ①の <base> 挿入を入れれば、②も連動して本家にかなり近づく見込みです。これを実装しますか？（①だけで区切る／②③も含めて詰める、いずれでも）

- ①②系丸文字は見づらいので控えて
- 1と2のみ
- ルートに以前のpngが残っている。今後ssはtest下に生成


- [x] **HTMLフレームで、JSが動的に付ける画像src（アルバムのサムネイル）が解決されず404だったのを本家 `sn_repRes` フックで修正**（2026-07-25 完了）
	- タイトルの アルバム クリック →`[call fn=_album]`→ `frames/_album.sn` の `[s]` まで、既存タグ（`[add_frame]`/`[set_frame]`/`[let_frame]`/`[frame visible=]`/`[event]`/`[set_focus]`/`[let_ml]`/マクロ）だけで到達済み。残る不具合はサムネイル画像だけだった。
	- 原因：`srcdoc` の iframe は相対URLの基準が**親ドキュメントのURL**になる。静的な `src`/`href` は `FrameMng.#resolveUrls()` が書き換えるが、**フレーム内JSが後から付ける `data-src="_album_miken.jpg"` を `.src` へコピーする分**は拾えず、`localhost/_album_miken.jpg` として404になっていた。
	- 対処：`<base>` 注入も試したが `defer` 付き `<script src>`（bootstrap）に効かず別の404を招くため不採用。**本家の `sn_repRes`（画像ロード関数の差し替えフック。関数名は本家仕様で固定）** をフレーム読込直後に呼び、`data-src` をフレームHTMLのディレクトリ基準で解決する `setImg` を注入した（グリッド構築＝`[let_frame init]` より前に差し替わる）。静的URLは従来の書き換えのまま。結果、サムネイル全10枚＋bootstrap すべて読込・エラー0で、本家どおりのグレースケール配置になった。
	- 補足：フレームの列数（本家3列／こちら4列）は、フレーム内部幅（こちらはステージ単位の1024px、本家は表示スケールの約960px）に対する bootstrap の `row-cols` レスポンシブの差で、不具合ではない（同じ有効幅なら一致）。
	- 手動確認スクショの置き場所として `.gitignore` に `/test/.ss/` を追加。検証：ユニット **909件パス**、E2E **77件パス**（frame/focus 系含む）、`tsc` クリーン

pixi 版が動くようになった後のbluesnovel版機能追加で、React版frameの新機能もあるやもだが、それはまた後日検討。
さて、「ロード」ボタン（保存機能なし状態）へ。

- [x] **タイトルの「ロード」→ しおり画面 `frames/_archive.sn` の `[s]` まで到達（保存機能なし状態）**（2026-07-25 完了）
	- 原因：`*main` の `[set_frame … text=&sys:const.sn.save.place]` で停止していた。`sys:const.sn.save.place` が未定義→`&式`がundefinedだと属性が落ちる→`[set_frame]`の「textは必須です」で throw（本家 set_frame も同じ throw なので、違いは**既定値の有無**）。
	- 対処：本家のしおり層の初期値だけ用意（保存機能はまだ無いので**プレースホルダ**）。`sys:const.sn.save.place`=1（本家 CmnInterface.ts:197）、組み込み変数 `const.sn.bookmark.json`=`'[]'`（同 290。空のしおり）。`ScriptMng#defEnvBuiltins()` に追加。
	- 結果：ロードクリック→`[call fn=_archive]`→`*title_load`→`*main`→`[frame id=archive visible=true]`→`[s]` に到達。**空のセーブ枠を表示するロード画面が本家と完全一致**（ヘッダ「× / ロード / 削除」＋空ボディ）。ユニット **909件パス**、E2E **77件パス**、`tsc` クリーン。

ok.次は「設定」ボタンだが、その前に。
- TODO.mdやらあちこちに実装済/未済情報が分散しているので、以下に記載を集約し随時更新。ヒトだけでなくあなたも参考にしやすいように
  + タグの実装済/未済情報: docs/tag.html:127 付近の【タグ一覧】
    - BluesNovelならではのSKYNovelからの変更点、メモは #clearsysvar などジャンプ先の詳細部に記載
  + セーブ変数(save:)、システム変数(sys:)、雑用変数(tmp:)は docs/dev.html ジャンプ先の詳細部に
    - #reserve_value_save save:
    - #reserve_value_sys sys:
    - #reserve_value_tmp tmp:
  + この件で＜table＞列数は増やさず、名称部にぱっと見で分かる色マークを。🔴:未済, 🟡:実装中・機能未達, 🟢:実装済

- [x] **実装済/未済の状況を docs に集約（タグ・変数へ色マーク）**（2026-07-25 完了）
	- `docs/tag.html` のタグ一覧（サイドバー）の各タグ名先頭へ **🟢実装済／🟡実装中・機能未達／🔴未済** を付与（🟢51・🟡9・🔴55）。🟡は既知の欠落があるもの（`add_face`/`add_filter`/`button`/`lay`/`let`/`page`/`set_focus`/`trans`/`tsy`）。判定は `ScriptEngine.RESERVED_TAGS` と todo.md/CLAUDE.md の記述に基づく。
	- `docs/dev.html` の変数表（save:/sys:/tmp:）の名称セル先頭へ同じマーク（🟢37・🟡2・🔴54）。列は増やさず名称内に。保存・音声・履歴・キー状態・native window 系は🔴、環境(`const.sn.config`等)・`const.sn.frm.*`・`const.sn.lay.*`・auto/skip 系は🟢、`const.sn.lay.*.width/height`（実寸なし1/0代用）は🟡。
	- 各ドキュメントに凡例を追加。本家からの変更点・メモは**各タグの詳細部**に記載する方針とし、雛形として `#clearsysvar`（既読も消す）・`#button`（既定ページback・座標時のみ絶対・pic/style未対応）・`#page`（clearのみ）・`#let`（text=とval=）へメモを記入。以降は随時。
	- `todo.md` 冒頭と `CLAUDE.md` に「タグ／変数の実装状況の一次情報は docs/tag.html・docs/dev.html」と明記（todo.mdは作業計画に集中）。
	- あわせて `const.sn.lay[N].<fore|back>` の詳細ツリーに **`x`/`y`（本家の座標名。left/top の別名）** を追加（`ScriptMng`）。`tsc` クリーン、ユニット・E2E 影響なし。


## Claude 5

- まずCLAUDE.md、過度な制約を大幅に減らす。当たり前のことは書かない。ツール説明をシンプルに。Auto memoryに任せる
- 「設定」ボタンクリックから[s]停止まで通す

- [x] **CLAUDE.md を大幅に整理**（2026-07-25 完了）
	- 493行 → 約240行。当たり前のこと（応答は日本語・ビルドやコミットの担当）は auto memory に任せて削除、ツール説明（`playwright-cli`・ビルド4本の表・E2E周辺）は要点だけに圧縮、コードを読めば分かる説明は落とした。
	- 残したのは**コードから読み取れない事実**＝本家との相違、そうしてある理由、踏むと分からなくなる落とし穴。日本語化して密度を上げ、「落とし穴」節へ集約。
	- ついでに古くなっていた記述を修正：`[button]`の既定ページは`fore`ではなく本家同様`back`。

- [x] **タイトルの「設定」→ `frames/_config.sn` の `[s]` まで到達**（2026-07-25 完了）
	- 原因は**システム変数(sys:)の初期値が入っていなかった**こと。`_config.sn`の`*val2ctrl`が
	  `[set_frame text=&sys:sn.tagCh.msecWait]`のように sys: を読むが、未定義だと`&式`が`undefined`になり
	  属性ごと落ちて「[set_frame] textは必須です」で停止していた。
	- `VarStore`が生成時と`clearSys()`（[clearsysvar]）時に `creSYS_DATA()` の初期値を入れるようにした
	  （本家 `Variable.ts#clearsysvar()` 相当）。`creSYS_DATA()`は本家から移植済みだったが**どこからも呼ばれていなかった**。
	  `sn.sound.global_volume`/`movie_volume` は本家では代入トリガ関数の型だが、値としては本家も起動時に1を入れる（`SoundMng.ts:67`）ので数値1を置く。
	  これに伴い `ScriptMng` の `sys:const.sn.save.place = 1` の個別初期化は不要になり削除。
	- `const.sn.isFirstBoot` を **false → true** に。sys: をまだ保存しないので毎回が初回起動。テンプレの
	  `theme/setting.sn` は `[if exp=const.sn.isFirstBoot]` の中で `sys:TextLayer.Back.Alpha = 0.7` 等の
	  初期値を設定しており、false のままだとそこを丸ごと素通りして設定画面が既定値のままだった。
	  `test/uc_goal.test.ts` の疑似環境も本番に合わせて true に。
	- 結果、設定画面は**バック不透明度70%・各待ち時間・スキップ・システム欄まで本家(pixi版)と一致**。
	  ×ボタンでタイトルへ戻るところまで確認。残差は「ボイスのみ」音量（`sys:const.sn.sound.VOICE.volume`は
	  本家では`[volume]`＝音声層が触れて初めて入る）と、フレーム内幅が本家960に対しこちらは1024なため
	  bootstrap の`row-cols`が1列多くなる点（アルバムと同じ、不具合ではない）。
	- `docs/dev.html` の sys: 表を更新：初期値が入るようになった変数を🔴→🟡（読み書きと初期値はあるが、
	  その値を使う機能＝音声層・文字表示ウェイト等がまだ無い、の意）とし、節の冒頭にその旨を明記。
	  `const.sn.isFirstBoot` の初期値も true に。
	- `test/VarStore.test.ts` に `getVal_35_sys_defaults`（初期値と[clearsysvar]後の入れ直し）を追加。
	  ユニット910・E2E77 パス、`tsc` クリーン。


- タグ実装
  - 🟡[let] 変数代入・演算
  - 🔴[loadplugin] プラグインの読み込み
  - 🔴[navigate_to] ＵＲＬを開く
  - 🔴[snapshot] スナップショット

- [x] **タグ実装：`[let]`の仕上げと`[loadplugin]`・`[navigate_to]`・`[snapshot]`**（2026-07-25 完了）
	- **`[let]` 🟡→🟢**：bluesnovel独自の`val=`（常に式評価）を廃止し、本家書式の`text=`（値そのもの。
	  式にしたいときだけ`text=&式`）へ一本化した。テスト・E2Eシナリオの34箇所を機械的に置換。
	  本家との違いは1点だけ残る＝本家は`text`省略を許すがこちらは必須（`text=&式`の評価が`undefined`
	  だと属性ごと落ちる仕組みがあるので、黙って空文字が入ると原因追跡が難しい）。
	- **`[navigate_to]` 🔴→🟢**：本家（`SysWeb.ts:239`）と同じく`open(url, '_blank')`で別タブに開く。
	- **`[loadplugin]` 🔴→🟢**：本家同様cssのみ（JSプラグインは本家でもビルド時取り込み）。fetchした
	  内容を`<style>`として`<head>`へ足す。`join=true`（既定）は読み込み完了までシナリオを止める。
	- **`[snapshot]` 🔴→🟡**：本家はpixiのレンダラで描き直すが、こちらの表示はDOMなので
	  **DOMを複製 → SVGの`<foreignObject>` → canvas → PNG** で撮る（`src/ts/Snapshot.ts`。
	  html2canvas等の外部ライブラリは足さない）。`<img>`化したSVGは外部リソースを取りにいけないので、
	  画像はdata URIへ埋め込み、ページのスタイルシートも文字列にして中へ入れている。
	  `fn`/`layer`/`page`/`width`/`height`/`b_color`に対応。**HTMLフレームの中身は写らない**
	  （iframeは描画されないというブラウザ側の制約。本家web版もpixiステージだけを撮るので結果は同じ）。
	  `smoothing=`・拡張子によるフォーマット指定・`userdata:/`保存・`b_color`の透過2桁は未対応。
	- `[loadplugin]`/`[snapshot]`は**非同期の停止点**として`[add_frame]`と同じ形で実装（エンジンは
	  意図をアクションに載せて止まり、`ScriptMng`が終わってから続きを回す）。`[snapshot layer=…]`の
	  絞り込み用に、`GrpLayer`/`TxtLayer`のルート要素へ`data-lay`属性を出すようにした
	  （表裏の`data-page`と同じ役割）。
	- テスト：`test/ScriptEngine_sys.test.ts`に3タグ分（属性解釈・停止するかどうか）。ブラウザでしか
	  確かめられない部分は新規E2E `test/e2e/snap.e2e.ts`＋フィクスチャ`prj_snap`で、cssが実際に効くこと・
	  PNGがダウンロードされ中身がPNGでステージ実寸なこと・popupのURLを見る。
	  `snPage.ts`に`waitWaitMark()`を追加（非同期タグを挟むシナリオは、キーを押す前に本物の停止点を
	  待たないと`waitIdle()`が処理中の一瞬を停止点と誤認する）。
	  ユニット920・E2E80 パス、`tsc`クリーン。


- そろそろデータ系に着手。修正・タグ実装
  - TODO.md:`package.json`から`store`を除去、など
  - 🔴[copybookmark] しおりの複写
  - 🔴[erasebookmark] しおりの消去
  - 🔴[load] しおりの読込
  - 🔴[record_place] セーブポイント指定
  - 🔴[reload_script] スクリプト再読込
  - 🔴[save] しおりの保存
  - 🔴[export] プレイデータをエクスポート
  - 🔴[import] プレイデータをインポート

- [x] **データ系：セーブ層（しおり・sys:・既読の永続化）とタグ8つ**（2026-07-25 完了）
	- **`src/ts/SaveMng.ts` を新設**。本家 `SysBase.data`（`{sys, mark, kidoku}`）＋ `SysWeb.flushSub()`/
	  `initVal()` にあたる層で、保存先は localStorage、キーは本家と同じ `skynovel.《save_ns》 - 《種別》`
	  （同じプロジェクトなら本家が書いたデータをそのまま読める）。書き込みは本家 `SysBase.flush()` と同じく
	  **最短500ms間隔にまとめる**（既読は停止点ごとに更新されるので、まとめないと1文字進むたびに書く）。
	- 置き場所の判断：エンジンは DOM も localStorage も触らない決まりなので持てず、ストア（zustand）は
	  「今の画面」であって保存データの器ではない。そこで `ScriptMng` がこれを1つ抱え、しおりの中身は
	  **エンジンから貰う分（save:変数・ifスタック・再開位置）とストアから貰う分（表裏ページのJSON）の合成**
	  として組み立てる。復元は `store.replace()`（読み戻しの Memento と同じ形）。
	- **`src/sn/localStore.ts`** を本家から移植（eval を使う `store.js` の置き換え）。これで
	  `package.json` から **`store` / `@types/store` / `socket.io-client` を除去**できた（todo.md の積み残し）。
	- タグ8つ：**`[record_place]` 🟢**（サブルーチン内なら本家同様*最上位の呼び元*を記録）、
	  **`[save]` 🟡**、**`[load]` 🟡**、**`[reload_script]` 🟡**、
	  **`[copybookmark]` 🟢**、**`[erasebookmark]` 🟢**、**`[export]` 🟡**、**`[import]` 🟡**。
	  `[load]`/`[reload_script]` は `[add_frame]` と同じ非同期の停止点（スクリプトを読み直してから続きを回す。
	  本家同様キャッシュを必ず捨てる）。`[export]`/`[import]` は終わったら `sn:exported`/`sn:imported` を発火する。
	  🟡 の残りは主に音声の復元・サムネイル画像の保存・暗号化で、いずれも各層が無いため。
	- **既読情報とsys:が停止点ごとに保存されるように**なった（todo.md の「既読情報の永続化」）。あわせて
	  `const.sn.isFirstBoot` が本家どおり「sys:の保存データが空だったか」で決まるようになり、
	  `const.sn.bookmark.json` が実データを返すようになった（テンプレのロード画面が実際に枠を並べる）。
	- `VarStore` に名前空間まるごとの `cloneNs()`/`setNs()` を追加（`cast=str` の記録も一緒に運ぶ。
	  でないと復元後に `'0123'` が `123` へ自動キャストされる）。ストアに `getPagesJson()` を追加。
	- **`Caretaker` のバグ修正**：`clear()` の直後に `Stage` が再描画されると
	  `#hScr2AState[''] ` が無いまま書き込もうとして React ごと落ちていた（`[page clear=true]` でも起きる。
	  今回 `[load]` が履歴を捨てるようになって表面化した）。
	- テスト：`test/ScriptEngine_save.test.ts`（属性解釈・save:変数とifスタックの出し入れ・停止するかどうか）、
	  `test/SaveMng.test.ts`（しおり表・bookmark.json・プロジェクトごとのキー分け。localStorage だけ最小の偽物を挿す）、
	  E2E `test/e2e/save.e2e.ts`＋フィクスチャ `prj_save`（[save]→[load] の往復で変数・再開位置・画面が戻ること、
	  localStorage への保存、`.swpd` のダウンロード）。
	  ユニット946・E2E84 パス、`tsc` クリーン。実テンプレ `tmp_blues` のロード画面が、しおりを入れた状態で
	  日付・本文つきの枠を並べるところまで確認。


- web版リロード時にかつての水色横長長方形文字レイヤが見えるのはなぜか。テンプレにもないので、デフォルト表示か
- しおり・システム系未実装により、中途半端に止めていた実装を再開

- [x] **空の文字レイヤに水色の箱を描かないようにし、しおり用の組み込み変数を実装**（2026-07-25 完了）
	- **水色（aquamarine）の横長矩形の正体**：`TxtLayer` の既定の見た目（aquamarine背景＋橙の点線枠）。
	  テンプレ由来ではなく **bluesnovel の試作用の目印**（本来見えない文字層の位置と大きさを分かるように
	  するもの）だった。文字が空の層でもこれを描いていたため、`[trans]` で裏ページが見える一瞬に
	  「空のメッセージ窓」が水色の帯として現れていた（タイトル画面のリロードで露見）。
	  **文字が1つも無い層には箱を描かない**ようにした（`[lay b_color=…]` で色を明示した層は「意図して
	  置いた板」なので従来どおり描く）。これまでの「ボタンだけ乗った層は描かない」条件を一般化した形。
	- E2Eヘルパ（`waitIdle()`/`txtBoxStyle()`）が文字レイヤの箱を**点線枠という見た目で**探していたので、
	  `data-lay` 属性で引くように変更（そもそもこちらの方が壊れにくい）。
	- **しおりが使う組み込み変数を実装**（セーブ層が無くて止めていたもの）：
	  `const.Date.getDateStr` 🟢 / `const.Date.getTime` 🟢 / `const.sn.last_page_plain_text` 🟡。
	  テンプレの `frames/_archive.sn` が
	  `[save dt=&const.Date.getDateStr text=&const.sn.last_page_plain_text]` と書くので、無いと
	  しおり枠の日付・本文が空になっていた（`&式` が undefined だと属性ごと落ちるため）。
	  `last_page_plain_text` は既定文字レイヤの蓄積文字列そのもので、文字装飾がまだ無いので
	  《》やルビの除去はしていない（そのぶん🟡）。
	- `sys:const.sn.cfg.ns` を本家（`SysBase.ts:152`）と同じく**毎回**入れ直すように修正
	  （初回起動時だけだと、`[clearsysvar]` の後に `[import]` が自分のデータまで弾いてしまう）。
	- セーブ層ができたことで古くなっていたコメント（「まだセーブ層が無いので」「将来のセーブ層用」等）を更新。
	  ユニット950・E2E84 パス、`tsc` クリーン。


- ゲーム本編ともいえる「最初から」ボタンクリックからタイトルに戻るまで通す
  - DOM・画像切り替えがきちんと表示されているか

- [x] **「最初から」＝ゲーム本編を、クリック68回でタイトルへ戻るまで通した**（2026-07-25 完了）
	- 実テンプレ `tmp_blues` の `theme/title.sn` *start → `script/ss_000.sn` → `[jump fn=title]` を
	  ブラウザで完走。**背景（black/white/yun_*/title.jpg）と立ち絵（F_kuchimoto/F_1024a/F_1024aFull/
	  F_1024b/kagero）の切り替えはすべて実画像が読めており**（`naturalWidth > 0` を各停止点で確認）、
	  和風メッセージ窓の中に縦書き本文が出る。
	- **`[lay b_pic=…]`（文字レイヤ背後の枠画像）を実装**。これが最大の欠落だった：テンプレの
	  `txt_lay_v_*` マクロは `b_pic=wafuu1` を渡し `b_color` はコメントアウトしているので、
	  未対応だと以前 `txt_lay_h_*` が置いた白の `b_color` が残り、**白地に白文字で本文が
	  まったく読めなかった**。本家どおり `b_pic` があれば `b_color` は無視する
	  （CSSでは擬似要素に `background-image` を敷き、`b_alpha` はその `opacity` に反映）。
	- **`sys:TextLayer.Back.Alpha` を実際に効かせた**（本家 `TxtLayer.ts:388`）。文字レイヤ背景の
	  不透明度は **`b_alpha` × この値**で、`b_alpha_isfixed=true` のレイヤだけが掛け算を免れる。
	  設定画面の「バック不透明度」スライダーがこれで実際に画面へ反映されるようになった（dev.htmlで🟡→🟢）。
	  値はストア（`backAlpha`）へ停止点ごとに写す（本家の `defValTrg` 相当）。
	- **競合バグを修正**：`[add_frame]`/`[let_frame]`/`[loadplugin]`/`[snapshot]`/`[load]` のような
	  「DOM絡みの非同期の停止点」の最中にクリックすると、処理の完了を待たずにシナリオが再開していた
	  （`#busy` は `#runStep()` を抜けた時点で下りるため）。本編で
	  `[add_frame id=album]` の直後の `[set_frame]` が「frame【album】が読み込まれていません」で
	  落ちるのを再現。`#procing` フラグで、その間のクリックは本家（`Reading.beginProc()`）同様に捨てる。
	- テスト：`test/ScriptEngine_lay.test.ts`（`b_pic`／`b_alpha_isfixed` の属性解釈）、
	  `test/store_lay.test.ts`（値の持ち方と `[clear_lay]` での破棄）。既存E2Eの背景色の期待値は
	  `× sys:TextLayer.Back.Alpha` を反映して更新した（`expr`/`lay`/`trans`）。
	  ユニット957・E2E84 パス、`tsc` クリーン。
	- **残る見た目の欠落**：ルビ記法 `《…》`／`｜…《…》` が生のまま表示される（文字装飾が未実装）、
	  縦書きの行数・余白が本家と完全一致ではない（`max_row`／`bura` 未対応）、音声なし。


- 手軽に実装できそうなタグ・組み込み変数に着手

- [x] **手軽に実装できるタグ・組み込み変数をまとめて**（2026-07-25 完了）
	- タグ3つ：**`[clear_text]` 🟡**（対象レイヤの*片面だけ*の文字を消す。[er]は表裏どちらも消す。
	  本家がここで行う履歴ログの改ページだけ未対応）、**`[dump_val]` 🟢**（名前空間ごとの変数一覧）、
	  **`[dump_stack]` 🟡**（現在位置・コールスタック・ifスタック）。後2つは本家がconsoleへ出すところを、
	  `[dump_lay]` と同じくデバッグ表示へ流す。
	- 組み込み変数：**`const.sn.Math.PI`** / **`const.sn.aIfStk.length`** /
	  **`const.sn.vctCallStk.length`** / **`const.sn.last_page_text`**（文字装飾が無いので
	  `last_page_plain_text` と同値なので🟡）/ **`const.sn.isDarkMode`**（`matchMedia`。遅延評価なので
	  切り替えの監視リスナは要らない）/ **`const.sn.platform`**（Platform.js を持たないのでUA文字列で代用、🟡）。
	- **`save:const.sn.mesLayer`** を `[current]` が更新するようにした（本家 `LayerMng.ts:958`）。
	  save: なのでしおりに含まれ、`[load]` で既定文字レイヤも一緒に戻る。
	- `sn.eventArg` / `sn.eventLabel` は既に実装済みだったのに docs/dev.html が🔴のままだったので訂正。
	- `VarStore` に `dump()` を追加（組み込み変数＝遅延評価は本家同様含めない）。
	  ユニット965・E2E84 パス、`tsc` クリーン。


- オートリード機能で本編完走test。ギャラリーにも簡易テスト雛形あり
- 同じくskip機能
- 既読skipテストサンプル、参考まで https://github.com/famibee/SKYNovel_gallery/tree/master/public/prj/kidoku

- [x] **オート読み・既読スキップで本編を完走**（実テンプレ `tmp_blues` の「最初から」→本編→タイトル）。
	止まっていた原因は自動進行の側ではなく、その途中で出ていた**例外が握り潰されていた**こと。
	- **`[button]` の `nm` を `label` 流用にしていたのをやめた**。テンプレの `[sys_menu]` は
	  `fn` 違い・`label=*main` のボタンを3つ並べる（字を隠す／履歴／設定）ので、
	  ストアの「ボタン名は同一レイヤ内で一意」に引っかかって本編開始直後に落ちていた。
	  本家にボタン名の概念は無く、ここの `nm` はReactの `key` のためだけの物なので、
	  **省略時はストア側で追加順の通し番号を振る**（`*main#0`…）。`[button nm=]` と明示した
	  場合の重複だけは従来どおりthrow（シナリオ側の誤りなので）。
	- **`[clear_lay]` がエンジン側の蓄積文字列を捨てていなかった**。`chgStr` は「そのレイヤの
	  全文字列」を毎回送る作りなので、ストアの `str` を空にしても次の本文が古い蓄積へ追記され、
	  消したはずの文が復活していた（本家 `TxtLayer.clearLay()` は中身も捨てる）。
	  蓄積が指すのは表ページなので `page=back` のときは触らない。
	- **投げっぱなし非同期の `.catch(()=> {})` をやめ、`#catchErr` で必ず表示する**ようにした。
	  `myTrace(…, 'ET')` が投げた値だけを識別して捨てる（`#tracedErr` と同一性比較）。
	  `#applyAction()` の例外は `step()` を包む try の外側なので、これが無いと
	  **画面もログも無反応のままシナリオが止まる**（今回まさにこれで原因を見失った）。
	- 回帰テスト：E2E `prj_autostory`（タイトル→`[button fn=]`で本編→`[p]`/`[l]`/`[waitclick]`→
	  `[jump fn=]`でタイトル）をオートと `skip.all` の両方で完走させる2本。ボタンは
	  **同じ飛び先を2つ**並べてあり、上記のボタン名衝突の回帰になっている。
	  ユニットは `store_lay.test.ts` にボタン名3件、`ScriptEngine_lay.test.ts` に蓄積文字列2件。
	- `[waitclick]` での手動クリック1回だけは仕様どおり（本家 `Reading.ts:313` と同じく
	  `[s]`/`[waitclick]` は必ず `cancelAutoSkip()` する）。テンプレは `ss_000.sn:101` にこれがある。
	  ユニット970・E2E87 パス、`tsc` クリーン。


- 文字レイヤ関係に着手
  - 順番・後回しは任せる。ただしすべてを一気にやらず、タグ2・3個ぐらいずつでコミットしていきたい（AI使用制限対策）
  - ルビ記法
  - 関連タグ
  - 本編
  - 文字とルビ https://github.com/famibee/SKYNovel_gallery/tree/master/public/prj/ruby
  - 改行、max_row、bura、追い出し、ぶら下がり仕様が意図通りか https://github.com/famibee/SKYNovel_gallery/tree/master/public/prj/line_breaking_rules
    - 本家にあるdumpHtm機能はhtmlテキスト出力によるプログラマルな比較目的。ドットレベルの比較というより文字配置と改行の確認用。使えそうなら使って
  - フォント https://github.com/famibee/SKYNovel_gallery/tree/master/public/prj/font

- [x] **ルビ記法**（`漢字《かんじ》`・`｜親文字《ルビ》`・傍点`《*》`）。文字レイヤ関係の1回目。
	- **本家 `RubySpliter.ts` をそのまま移植**（`src/sn/RubySpliter.ts`。相違は`T_PutCh`の置き場だけ）。
	  `test/RubySpliter.test.ts` も本家のテストを無改変で持ってきて**204件すべてパス**。
	  漢字の正規表現やサロゲートペア、`《* 》`傍点、空白での区切り指定など、自前で書き直したら
	  まず合わない類の仕様なので、Grammar/ExprEvalと同じく「テストが契約」の方式に揃えた。
	- **本文は「表示単位の並び」（`T_CH[] = {c, r?}`）としてストアへ入るようにした**。
	  割るのは`ScriptMng`（`src/ts/Txt.ts` `splitCh()`）で、**エンジンは生の文字列のまま**
	  （本家も文字組みはGrammarではなく表示側の仕事）。ストアは平文`str`と表示単位`aCh`の
	  両方を持つ＝`chgPic`の`fn`と`src`と同じ関係で、`str`はルビを含まない。
	- `TxtLayer`は1表示単位＝1spanのまま、ルビ付きなら中身を`<ruby>親文字<rt>ルビ</rt></ruby>`に。
	  文字送り演出のDOMキャッシュ（前方一致で差分だけアニメ）も単位単位の比較へ移した。
	- `const.sn.last_page_plain_text` が本家同様**ルビを除いた平文**を返すようになった（docs/dev.html 🟢）。
	- エスケープ文字（`prj.json`の`init.escape`）は本家 `ScriptIterator.ts:120-122` と同じく
	  Grammarと`RubySpliter`の両方へ配る。**`RubySpliter`は正規表現を`setEscape()`で組み立てるので、
	  これを忘れると`matchAll`が名前付きグループ無しで回って落ちる**（実際に踏んだ）。
	- 実テンプレ `tmp_blues` の本編で確認（`選《よ》りに`・`安全｜剃刀《かみそり》`が縦書きでルビ付きに）。
	  E2Eは `prj_ruby` で4本（3記法＋`[er]`で消える）。ユニット1174・E2E91 パス、`tsc` クリーン。
	- 未対応：ルビの位置指定（`《center｜るび》`の`r_align`。今は指定を落としてルビ文字だけ出す）、
	  `[lay sesame=…]`、ルビ付き行の行間の詰め。`[ch]`/`[span]`/`[link]`/`[ruby2]`/`[tcy]`は次回以降。

- [x] **文字装飾タグ `[span]` / `[ch]` / `[ruby2]`**。文字レイヤ関係の2回目。
	- **本家の「本文ストリームへ命令を埋め込む」方式をそのまま採った**（本家 LayerMng.ts:315
	  `#cmdTxt = cmd=> tl.tagCh('｜&emsp;《'+ cmd +'》')`）。ルビ記法の親文字＋ルビの形を借りて、
	  ルビ側にURIエンコードしたJSONを載せる仕掛けで、**移植済みの`RubySpliter`がそのまま1単位として
	  通してくれる**（`putTxtRb`にその分岐が元からある）。おかげで**エンジンは相変わらず文字列を
	  貯めるだけ**で済み、`chgStr`アクションの形も既存テストも一切変わっていない。
	- 解釈は`Txt.ts` `splitCh()`の小さな状態機械：`span｜`で以降のスタイルを差し替え（属性なしの
	  `[span]`は解除。本家 TxtLayer.ts:804 `#mergePushSpan`の「どちらも指定されてなければクリア」）、
	  `add｜`〜`add_close｜`の間だけ`[ch]`のスタイルを重ねる。命令は表示単位を作らないので
	  平文（`const.sn.last_page_plain_text`）にも残らない。
	- `T_CH`に`s`（本文側CSS）と`rs`（ルビ側CSS）が増え、`TxtLayer`が`<span style>`／`<rt style>`に反映。
	  文字送り演出のDOMキャッシュの前方一致判定もスタイル込みで比べる。
	- `[ruby2]`は本家同様`[ch]`へ書き換える。`t`/`r`をURIエンコードするので、**ルビに空白があっても
	  区切り指定と誤解されない**（`[ruby2 t=蜊 r="あさ り"]`が1つのルビになる）。
	- テスト：`Txt.test.ts`（命令解釈13件）・`ScriptEngine_txt.test.ts`（タグ12件。エンジンが積んだ
	  文字列を`splitCh`で割って表示単位を確かめる＝ScriptMngと同じ手順）・E2E `prj_ruby`に
	  computed styleで色を見る1件。ユニット1199・E2E92 パス、`tsc` クリーン。
	  実テンプレ `tmp_blues` は`[span]`/`[ch]`をマクロの説明文でしか使っていないので影響なし（完走を再確認）。
	- 未対応：`[link]`/`[endlink]`・`[tcy]`・`[graph]`（`Txt.ts`の命令解釈に足す形。`[link]`は入れ子＝
	  スタックが要る）、`[span]`/`[ch]`の`layer`/`page`・`wait`・`r_align`・`ch_in_style`/`ch_out_style`・`record`。

- [x] **`[link]` / `[endlink]` / `[tcy]`**。文字レイヤ関係の3回目。前回と同じく本文ストリームへ
	命令を埋め込む方式（`Txt.ts`が解釈）なので、エンジンとストアの形はまた変えずに済んだ。
	- **`[link]`〜`[endlink]`のリンク区間**。区間内の表示単位に飛び先（`label`/`fn`/`call`/`arg`）が
	  付き、クリックで**[button]と同じ経路**（`ScriptMng.jumpToLabelAndGo`）へ流れる。
	  `arg`は飛び先で`&sn.eventArg`として受け取れる（本家 Main.ts `resumeByJumpOrCall()` と同じ代入）。
	  本文DOMは文字送り演出のため**Reactの外**で組み立てているので、`BtnLayer`のようなJSXではなく
	  `TxtLayer`が直接リスナを付ける。読み進めへ伝播させない（`stopPropagation`）のは`[button]`と同じ。
	  `style`は区間の間だけ足し、`[endlink]`で`[span]`の指定へ戻す（スタックなので**入れ子でも壊れない**。
	  本家は入れ子不可の仕様）。`style_hover`はマウスが乗っている間だけ足す。
	- **`[tcy]`（縦中横）**は命令だが**表示単位を作る**唯一の命令。CSSの`text-combine-upright: all`で組む。
	- テスト：`Txt.test.ts`＋4件、`ScriptEngine_txt.test.ts`＋5件、E2E `prj_ruby`に
	  「リンクをクリックしてジャンプし、`arg`が飛び先へ渡る」1件。
	  ユニット1208・E2E93 パス、`tsc` クリーン。実テンプレ `tmp_blues` はこの3タグを使っていない。
	- 未対応：`[graph]`（インライン画像。パス解決が要るのでアセット周りと一緒に）、`[link]`の
	  `url`・`global`・`onenter`/`onleave`・`style_clicked`系・効果音・`hint`、各タグ共通の
	  `layer`/`page`・`wait`・`r_align`・`ch_in_style`/`ch_out_style`。

- [x] **プロジェクト同梱フォントの`@font-face`自動登録**（ギャラリーの`font`サンプル相当）。
	- path.jsonにあるフォント（woff2／woff／otf／ttf）を起動時に全部登録する。**シナリオ側に
	  読み込みタグは無く**、拡張子を除いたファイル名がそのまま`font-family`名になる
	  （本家 TxtLayer.ts:97 と同じ規約）。`src/ts/Font.ts`。
	- **実テンプレ `tmp_blues` の本文フォントがようやく効いた**。`theme/setting.sn` の
	  `&def_fonts = 'ipamjm, "Source Han Sans CN"'` が指す2つがpath.jsonにあり、
	  今まで`@font-face`が無いので既定のゴシックで出ていた本文が、指定どおりの明朝になった。
	  フォント名に空白を含むものがあるので、`font-family`もurlも引用符で囲む。
	- Webフォント（ギャラリーの`[loadplugin fn='https://fonts.googleapis.com/…']`）は
	  実装済みの`[loadplugin]`がそのまま使えるので、こちらは追加不要だった。
	- テスト：`Font.test.ts`（CSSの組み立て4件。DOM不要の純粋部分）＋E2Eで`<style data-sn="font">`の
	  中身を1件。**E2Eのフォント本体はわざと置いていない**（確かめたいのはpath.jsonから
	  `@font-face`を組み立てて`<head>`へ挿す配線だけで、そのシナリオはそのフォントを使わない＝
	  ブラウザは取りにも行かないため）。ユニット1212・E2E94 パス、`tsc` クリーン。
	- 残り（ギャラリー`line_breaking_rules`の範囲）：`[lay bura=…]`（ぶら下げ禁則）・`ffs`/`noffs`
	  （文字詰め）・`max_row`・`r_size`。本家は`Hyphenation.ts`で自前の行分割をしているので、
	  CSSの`line-break`/`hanging-punctuation`でどこまで代替できるかの見極めから。

- [x] **文字詰め `[lay ffs=/noffs=]` とぶら下げ禁則 `[lay bura=]`**（ギャラリーの`line_breaking_rules`の範囲）。
	**まず方針を決めた：行分割そのものはブラウザ任せにする。** 本家は`Hyphenation.ts`（431行）で
	Rangeを使って文字位置を実測し、禁則にかかる文字を見つけて自分で改行位置を決めている。
	pixiのテキストでは自前でやるしかないが、こちらはDOMなので**ブラウザの行分割がそのまま使える**。
	同じものを移植し直すより、CSSへ読み替えられる範囲を素直に当てるほうが筋が良いと判断した。
	- `ffs`（文字詰め）は表示単位ごとに`font-feature-settings`を当てる。**1文字ずつ当てる必要がある**
	  のは`noffs`で「この文字だけ詰めない」と外せる仕様のため（本家 TxtLayer.ts:480 #fncFFSStyle）。
	  全角空白を常に除くのも本家と同じ。前回までに本文を表示単位へ割ってあるので素直に書けた。
	- `bura`（ぶら下げ禁則）は文字レイヤ本体へ`hanging-punctuation: allow-end`＋`line-break: strict`。
	  **ぶら下げが実際に効くかは閲覧ブラウザ次第**（Safariは対応、Chromeは`hanging-punctuation`未対応）。
	  この割り切りの帰結として、禁則文字の指定（`kinsoku_sol`/`kinsoku_eol`/`kinsoku_dns`/`kinsoku_bura`）は
	  受け付けない——ブラウザに渡す手段が無いため。docs/tag.htmlの[lay]にその旨を明記した。
	- テスト：エンジン3件・ストア2件（文字レイヤ専用の検査と[clear_lay]での消去）・E2E1件
	  （`noffs`に挙げた文字だけ`font-feature-settings`が`normal`になること、`line-break`が`strict`になること）。
	  ユニット1217・E2E95 パス、`tsc` クリーン。
	- 残り：`max_row`（最大行数を超えたら自動改ページ）・`r_size`（ルビサイズ）・`break_fixed`系。
	  ギャラリーの`line_breaking_rules`と実機で見比べて、ブラウザ任せで足りなければ自前計算へ寄せる。


- アニメpng（APNGではなく独自スプライトシート）をサポート
  - これは[l][p][graph]に関係ある機能
  - サンプル https://github.com/famibee/SKYNovel_gallery/tree/master/public/prj/anime_png

- [x] **アニメpng（APNGではなく独自スプライトシート）の再生**。まず画像レイヤ`[lay fn=…]`から。
	ギャラリーの`anime_png`（SKYNovel_gallery/public/prj/anime_png）が仕様。
	- path.jsonでは**「論理名→.json」「論理名.列x行→.png」の2件に分かれて載る**（`clock`→`mat/clock.json`、
	  `clock.5x8`→`mat/clock.5x8.png`）ので、`[lay fn=clock]`のパス解決結果は**.jsonのURL**になる。
	  そこからjsonの`meta.image`を同じ場所で引いてpngへ辿る。ストアはURLまでを持ち、
	  コマ割りの読み込み（fetch）は画面側＝画像の自然サイズと同じ「アセットの中身」の扱いにした。
	- **本家はpixiの`AnimatedSprite`（テクスチャ差し替え）だが、こちらはCSSのstepsアニメ**で
	  背景位置をコマ送りする＝JSは1コマも跨がない。速い軸・遅い軸の2本を重ねることで格子を走査し、
	  コマの並びが縦優先か横優先かは**2コマ目の位置**から判定する（ギャラリーのclock/breaklineは縦優先）。
	  `meta.animationSpeed`は本家（pixi）と同じ「1tick=1/60秒あたりに進むコマ数」として秒へ直す。
	- テスト：`Sprite.test.ts`（定義jsonの読み取り6件。値はギャラリーのサンプルから取った）＋
	  E2E3件（CSSアニメの組み立て・シート画像が404にならないこと・**実際にコマが進むこと**）。
	  E2E用に20x20×4コマの小さなpngをその場で生成して置いた（113バイト）。
	  ユニット1223・E2E98 パス、`tsc` クリーン。
	- 次：**`[l]`/`[p]`の待ちマーク**（`breakline`/`breakpage`があれば🩷/✅の代わりに出す。
	  本家 LayerMng.ts:159）と`[graph]`（本文中のインライン画像）。要望の本題はそちら。
	  `[lay b_pic=…]`（文字レイヤの枠画像）でのシート再生も未対応。

- [x] **`[graph]`（本文中のインライン画像）と、`[l]`/`[p]`の待ちマークの画像化**。前回のアニメpngの土台を
	要望の本題である`[l]`/`[p]`/`[graph]`へ繋げた。どちらもアニメpng（スプライトシート）で動く。
	- **`[graph]`**は本家と同じく本文ストリームへ`grp｜…`を埋め込む方式（前回までの`[span]`/`[ch]`と同じ道）。
	  本文としては**全角空白1つぶんの場所を占め、そこへ画像を敷く**（本家も`&emsp;`を置いて重ねる）。
	  文字を残すのが要点で、こうしないと平文（`str`）とDOMの文字が食い違う。
	  パス解決は`splitCh()`を純粋なままにしたいので、割った後に`ScriptMng`が上から流し込む。
	- **`[l]`/`[p]`の待ちマーク**は、`breakline`/`breakpage`という名の画像・アニメpngがプロジェクトに
	  あればそれを出す（本家 LayerMng.ts:159 と`ConfigBase.existsBreakline`の規約）。無ければ従来の🩷/✅。
	  **実テンプレ `tmp_blues` は両方持っている**ので、改ページ待ちが本来の▼マーク（`breakpage_b.png`）に
	  なることを実機で確認した。
	- 再生CSSは`Lay.ts`のemotion版をやめ、`Sprite.ts`が**<head>へクラスを1つ作って使い回す**形にした。
	  文字送り演出のため本文DOMはReactの外で組み立てており、そこからも同じ物を当てたいため。
	- テスト：`Txt.test.ts`＋1件、`ScriptEngine_txt.test.ts`＋3件、E2E＋2件
	  （`[graph]`が本文に1文字ぶん占めて画像が敷かれること、`[l]`はアニメ・`[p]`は静止画で出ること）。
	  ユニット1227・E2E100 パス、`tsc` クリーン。
	- 未対応：`[lay b_pic=…]`でのシート再生、`[graph]`の`width`/`height`（今は全角空白の枠に収める）、
	  待ちマークの位置指定（`x`/`y`/`visible`等。今は本文の直後に流し込む位置）。


- 🔴 [link][endlink]は[navigate_to]やジャンプ系なので実装できると思う
- blendModeサポート。[lay][add_face][button]

- [x] **`[link]`/`[event]`の`url`属性**と、**blendmodeの扱いを3タグで統一**。
	- まず状況の訂正：**`[link]`/`[endlink]`は前々回に実装済み**（`label`/`fn`/`call`/`arg`＋`style`系。
	  docs/tag.htmlでは[link]🟡・[endlink]🟢）。🔴で残っていたのは**`url`属性**で、
	  ご指摘のとおり[navigate_to]と同じ話だったので今回入れた。
	- `[link url=…]`：クリックでラベルへ飛ばず**別タブでURLを開く**（本家も「指定時は fn・label を無視する」）。
	  ついでに`[event url=…]`（ラベルへ飛ぶ代わりにURLを開く予約）も同時に対応。
	  開く口を`ScriptMng.navigateTo()`に一本化し、[navigate_to]・[link]・[event]の3つがそこを通る。
	- **blendmode**：`[add_face]`だけCSSの値を素通ししていたのを、[lay]・[button]と同じ
	  「本家の4種（normal／add／multiply／screen）だけを受けてCSSの値へ直す」へ揃えた
	  （`add`はCSSに同名が無いので`plus-lighter`＝加算合成）。`ScriptEngine.ts`の`//TODO:`を消化。
	  3タグとも`mix-blend-mode`へ落ちることをE2Eで確認（画像レイヤの箱・差分絵の`<img>`・ボタン）。
	- テスト：エンジン4件（blendmodeの変換と例外）＋`[link url]`1件＋`[event url]`2件、
	  E2E2件（blendmode 3タグぶん、`[link url=…]`が別タブを開いてシナリオは進まないこと）。
	  ユニット1234・E2E102 パス、`tsc` クリーン。


## 2026/07/24
- ts上にTODOを残す場合は【//TODO: 】形式でコメント。Todo+( https://github.com/fabiospampinato/vscode-todo-plus )で一覧できるため
- serena疎通確認
- ブラウザUIテスト（Claudeを経由しないE2E）の導入
- [x] **ブラウザUIテスト（Claudeを経由しないE2E）の導入**（2026-07-24 完了）
	- `@playwright/test` を devDependency 追加。`webServer` でvite起動/待受/終了を自動化
	- **一式を`test/e2e/`配下へ集約**（ルートを汚さないため）。設定も`test/e2e/playwright.config.ts`なので`playwright test -c test/e2e`で起動する
	- 専用ポート**5199**・`reuseExistingServer: false`。5173/5174は他プロジェクト（`tmp_blues`等）のdevサーバーが居座っており、掴むと別アプリを叩いてしまうため
	- spec名は`*.e2e.ts`（`*.spec.ts`だと`bun test`が拾ってしまうため）。`button` / `wait` / `readback` の15件
	- `test/e2e/app/`に自己完結したフィクスチャ（`prj_basic` / `prj_button`）。画像アセット不要。`src/`にはテスト用フックを入れず、`test/e2e/app/main.ts`が`window.__sn`でzustandストアを公開する
	- `package.json`に`test:e2e` / `test:e2e:ui`を追加。ユニット（`bun test`）とは完全分離
	- ルート`tsconfig.json`は`test/e2e`を`exclude`（`vite-plugin-dts`が`dist/`へE2Eの`.d.ts`を吐くため）。型チェックは`bunx tsc --noEmit -p test/e2e`
	- 判明した注意点：`Stage`は`lazy()`ロードのため、ストアだけ見て操作するとSuspenseの`Loading`表示中に追い越してしまい、`Caretaker.update()`が呼ばれず読み戻しMementoが記録されない。`test/e2e/snPage.ts`の`waitIdle()`でDOMの追随を待つこと
- 23%->comp->1%, 36%, 6%


- スクリプト解析を強化。skynovel_esmプロジェクトのtestを順にテスト駆動で実装したい
	- Grammar.test.ts
	- Variable.test.ts
	- PropParser.test.ts
- [x] **スクリプト解析の強化：本家testのテスト駆動移植**（2026-07-24 完了）
  - `Grammar.test.ts`（84件）：本家 `test/Grammar.test.ts` を無改変で移植。`src/sn/Grammar.ts`へ本家の字句解析部（`resolveScript`/`setEscape`/`char2macro`/`bracket2macro`/`splitAmpersand`/`tagToken2Name_Args`/ワイルドカード展開）を移植
  - `Variable.test.ts`（`test/VarStore.test.ts`後半へ統合）：JSON下位階層の参照、`["キー"]`記法、`@str`、`def`/`touch`、自動キャストを実装
  - `PropParser.test.ts`（261件 → `test/ExprEval.test.ts`）：`src/ts/ExprEval.ts`を本家PropParserの全面移植へ差し替え。三項演算子・ビット演算・`¥`（整数除算）・16進・`int/parseInt/Number/ceil/floor/round/isNaN`・`#〜#`文字列・`$変数`/`#{式}`埋め込み・`hA[春夏][ひきす]`添字解決に対応
  - **仕様変更**：未定義変数の取得結果が `null` → `undefined` になった（本家準拠。`null`は「nullが入っている」の意）。`1 + 未定義 → NaN` で未定義を検出する本家の流儀に必要
  - ユニット533件・E2E15件・`tsc --noEmit` すべてクリーン


- 徐々に試作から本番にスライドしていく方針
- こちらのスクリプトにだいたいの文法が入っているように思う。簡略化してテスト化＆テスト通しを
	https://github.com/famibee/tmp_esm_uc/blob/main/doc/prj/frames/_yesno.sn
- [x] **`ScriptEngine`の字句解析・タグ引数解析を本家実装へ差し替え**（2026-07-24 完了）
  - `ScriptEngine.tokenize()`/`RE_TOKEN`を廃止し、`Grammar.resolveScript()`へ委譲
  - `ScriptEngine.parseTag()`の`RE_ARG`も廃止し、本家`tagToken2Name_Args()`＋`AnalyzeTagArg`へ委譲
  - `step()`のトークン振り分けを本家`Main.ts#main()`と同じ「先頭一文字」方式へ（`\t`/`\n`読み飛ばし、`[`タグ、`&`変数操作、`;`コメント、`*`ラベル、それ以外は文字表示）。`trimStart()`は不要になったので全廃
  - `Grammar`の`cfg`を省略可にした（ワイルドカード展開にしか使わないため）
  - これにより新たに使えるようになったもの：複数行タグ、タグ内`;`コメント、文字列リテラル中の`[`/`]`/`;`、`&名前 = 式`代入（`&&式 = 式`で変数名側も式評価）、`&式&`表示
  - 注意：属性値に引用符を含む場合は値全体を引用符で囲む必要がある（`[if exp="mp:v=='X'"]`）。旧`RE_ARG`は`\S+`で雑に拾っていたが、`AnalyzeTagArg`（本家）は引用符の手前で値を切る
  - ユニット546件・E2E15件・`tsc --noEmit` すべてクリーン

- [x] **`[let_ml]`〜`[endlet_ml]`（複数行テキスト代入）の実行時対応**（2026-07-24 完了）
  - `ScriptEngine.#execTag()`に`let_ml`/`endlet_ml`を追加（本家`ScriptIterator.ts:718 #let_ml()`相当）。本文トークンをそのまま変数へ入れ、`[endlet_ml]`の次から実行を続ける
  - ラベル収集も本家`in_let_ml`と同様に本文を読み飛ばす（本文中の`*〜`をラベルとして拾わない）
  - 本家より厳しくした点：`[endlet_ml]`が無ければ例外。本文が空（`[let_ml …][endlet_ml]`）なら空文字を代入（本家はこの2ケースで本文位置がずれる）
  - 差異：本家は`cast='str'`を付けて`[let]`へ渡すが、bluesnovelの自動キャストは読み出し側（`VarStore.get()`）なので書き込み時の指定に相当するものが無い。数値だけの本文を文字列のまま読みたい場合は`名前@str`で参照する

- [x] **`cast`指定（`num`/`int`/`uint`/`bool`/`str`）の対応**（2026-07-24 完了）
  - `VarStore.set(name, val, cast)`＋`VarStore.castTo()`を追加（本家`Variable.ts:317 #let()`のswitch相当）。数値変換は本家`argChk_Num()`同様に`0x`始まりを16進として読み、数値でなければ例外
  - 適用先は`[let cast=…]`・`&名前 = 式 = キャスト`書式・`[let_ml]`（本家同様`str`固定）の3経路
  - `cast=str`は「読み出し時の自動キャストもしない」指定。bluesnovelの自動キャストは`get()`側にあるため、対象キーを`VarStore.#setNoCast`で覚える方式にした（cast無しで代入し直す／`clearvar`等で消すと解除）
  - これで`[let_ml]`に数値だけの本文を入れても文字列のまま保てるようになった（前回残していた差異を解消）
- [x] **`[trace]`の`&`評価を`ExprEval.getValAmpersand()`へ統合**（2026-07-24 完了）
  - `ScriptEngine.#evalAmpArg()`を廃止。未定義変数は空文字ではなく`undefined`と表示される（本家準拠。デバッグ用タグなので無言で消えるより分かりやすい）

- [x] **E2Eの拡充**（2026-07-24 完了）
  - フィクスチャ`test/e2e/app/prj_expr/`と`test/e2e/expr.e2e.ts`（6件）を追加。E2Eは計21件に
  - 検証内容：`[let]`＋`&計算`書式の結果が`&式&`で画面へ出る／`[trace]`がデバッグ表示へ出る／`[lay b_alpha=…]`が背景の不透明度になる／`[if]`/`[elsif]`/`[else]`の分岐／マクロ引数（`mp:`）／`[let_ml]`のJSON下位階層参照
  - `snPage.ts`に`traceText()`を追加（`ScriptMng`が`document.body`直下へ挿すspanを、`src/`にidを足さず「body直下のspan」という位置だけで特定）
  - シナリオを書く際の注意：`&代入`・`&式&`は「トークンの先頭が`&`」の位置（行頭かタグ直後）でしか効かない。地の文の途中に書くとそのまま表示される

- [x] **マクロ関連の残課題**（2026-07-24 完了）
  - マクロ名の禁止文字チェックを実装（`ScriptEngine.REG_NG4MAC_NM`。本家`ScriptIterator.ts:1362`をそのまま移植：`"` `'` `#` `;` `\` `]` と全角空白）
  - 入れ子の`[macro]`定義に対応。本家は最初に見つけた`[endmacro]`で終端とみなすため入れ子定義が壊れるが、こちらは深度を数えるので「outerを呼ぶとinnerが定義される」書き方ができる（＝本家より緩い。本家へ持っていくスクリプトでは使わないこと）
  - `[macro]`本体の読み飛ばしが`[let_ml]`本文を無視するようにした（本文中に`[endmacro]`と読める行があっても本体が切れない）
  - `#hLabel`/`#hTxt`/`#hFace`/`#hMacro`を`Object.create(null)`に。素の`{}`だと`toString`等の`Object.prototype`のキーが`in`や参照でヒットし、その名前のラベル・レイヤ・差分名・マクロが壊れていた
  - `ICallStackArg`統合：**不要と判断して見送り**。`src/sn/CallStack.ts`の`CallStack`クラスは本家から持ってきたものの一度も使っておらず、`CmnInterface.ts`が型`T_H_VAL_MP`をimportしているだけ。複数ファイル対応で戻り先に`fn`が要るようになった時点で改めて検討する

- [x] **`ScriptEngine.#if()`のトークン走査で`[let_ml]`本文を読み飛ばすように**（2026-07-24 完了）
  - 本文が`[endif]`/`[else]`等で始まると、ifブロックがそこで切れて本文を実行してしまっていた
  - これでラベル収集・`[macro]`本体の読み飛ばし・`[if]`走査の3箇所すべてが`[let_ml]`本文を無視するようになり、揃った
  - 回帰テスト2件を追加し、修正を外すと落ちることも確認済み

- [x] **`[return]`のlabel指定による戻り先変更**（2026-07-24 完了）
  - 本家`ScriptIterator.ts:994 #return()`の`{fn, label}`相当。`[return label=*x]`でコール元ではなく`*x`へ進む
  - 指定の有無にかかわらずコールスタックの巻き戻し・ifスタック復元・`mp:`復元は行う（本家と同じ順序）。壁(-1)も外れるので、戻り先で出会う`[endif]`はコール元の`[if]`に対応する
  - `[endmacro]`経由（マクロ本体からの`[return label=…]`）でも同じ
  - **`fn`指定（別スクリプトへ戻る）は例外にした**。複数ファイル対応待ちだが、黙って無視すると「戻ったつもりが元の位置」という分かりにくい挙動になるため
  - テスト6件追加（戻り先変更／スタックは通常どおり1段外れる／ifスタック復元／マクロから／未定義ラベル／fn指定）

- [x] **複数ファイル（`jump fn=…`/`call fn=…`）対応**（2026-07-24 完了）
  - `src/ts/Script.ts`を新設し、1ファイル分のパース結果（トークン列＋ラベル表）を`ScriptEngine`から分離。`ScriptEngine`は実行状態（`#idx`/`#aIfStk`/`#aCallStk`/`#hMacro`/変数）だけを持ち、`switchScript()`でファイルを切り替える
  - **`ScriptMng`が持つエンジンは1つだけに**（旧：ファイルごとに`ScriptEngine`を作っていたため、ファイルを跨ぐと変数もスタックも別物になっていた）。`ScriptMng`はfetchとパース結果のキャッシュだけを担当
  - 別ファイルが要るタイミングで`step()`は`{t:'loadScript', fn, label, idx}`を返して一旦止まる。`step()`自体は同期のまま＝DOM/fetch非依存でユニットテストできる設計を維持
  - 対応した経路：`[jump fn=…]`・`[call fn=…]`（`[return]`で呼び出し元のファイルへ戻る）・`[return fn=…]`・別ファイルで定義されたマクロの呼び出し
  - コールスタックに`fn`、マクロ表に定義元`fn`を追加。組み込み変数`const.sn.scriptFn`は遅延評価なので切替に自動追随する
  - `#runStep()`を非同期化。ロード待ち中に来た進行要求は**捨てずに回数を数えて後で消化**する（ロード無しならクリック1回＝1停止点ぶん進むのに合わせた）
  - テスト：ユニット`test/ScriptEngine_multifile.test.ts`（11件、擬似ファイル表でloadScriptプロトコルを回す）、E2E`test/e2e/multi.e2e.ts`（3件、`prj_multi/main.sn`＋`sub.sn`で実際のfetchを通す）
  - E2Eの注意：ファイル切替はfetchを挟むため、進行の途中でも「ストアもDOMも一致し文字送りも終わっている」瞬間（`[er]`直後のロード待ち等）が生まれる。`waitIdle()`はそれを停止点と区別できないので、`multi.e2e.ts`では`expect.poll`で「その表示に落ち着くまで待つ」形にしている

- [x] **`[button]`の`fn`指定（別ファイルのラベルへ飛ぶボタン）**（2026-07-24 完了）
  - `addBtn`アクション・store の`T_ADDBTN`/`T_BTN`・`TxtLayer`/`BtnLayer`/`Stage`の`onActivate`まで`fn`を通した
  - `ScriptMng.jumpToLabelAndGo()`を非同期化（ロード→`switchScript`／`callToScript`）。クリックハンドラ側は投げっぱなしで良いよう、例外はここで握る
  - `ScriptEngine.callToScript()`を追加。`[button fn=… call=true]`用で、戻り先は`callToLabel()`と同じく「今いる停止点そのもの」＝`[return]`で`[l]`のイベント待ちへ戻る
  - `[button]`の必須属性が「label」から「fnまたはlabel」に。`fn`のみ指定ならそのファイルの先頭へ飛ぶ（`nm`省略時は`label`、無ければ`fn`を流用）
  - テスト：ユニット3件（`fn`の受け渡し・`nm`のフォールバック・`callToScript`の往復）、E2E2件（`prj_button/sub2.sn`を追加）

- [x] **`Grammar`をプロジェクト単位で共有＋エスケープ文字の実装**（2026-07-24 完了）
  - `Script`が使った`Grammar`を公開し、`ScriptMng`が1つだけ作って全`Script`へ渡すようにした。エスケープ文字や`[char2macro]`/`[bracket2macro]`の定義は`Grammar`インスタンスが抱えるので、ファイルごとに別だと設定が行き渡らない
  - `ScriptEngine`も自前の`Grammar`をやめ、実行中`Script`のものを使う
  - `ScriptMng`が`Grammar`に`sys.cfg`を渡すようになったので、`[call fn=…*]`/`[loadplugin fn=…*]`のワイルドカード展開も効くようになった（従来はcfg無しで生成していて無効）
  - **prj.jsonの`init.escape`を実際に適用**。`Grammar.setEscape()`を呼ぶようにし、表示時にエスケープ文字1文字を落とす処理を`ScriptEngine.step()`へ追加した（本家は表示側`RubySpliter.putTxt()`が同じことをしている。bluesnovelにRubySpliterはまだ無いのでエンジン側で行う）。`Grammar`に`get ce()`を追加
  - テスト：ユニット3件（Grammar共有／`\[`等のエスケープ表示／未設定時は従来どおり）、E2E1件（`prj_expr`の`init.escape`を`\`にし、`\[esc\]`がタグにならず`[esc]`と表示されることを確認）

- [x] **E2E `multi.e2e.ts` のフレーク修正**（2026-07-24）
  - 症状：`[jump fn=…]で別ファイルへ移動して停止する`等が3回に1回ほど落ち、表示が停止点1つ手前で止まっていた
  - 原因：ファイル切替のfetch待ちの間に「ストアもDOMも一致し、文字送りも終わっている」瞬間ができる。`waitIdle()`はそれを停止点と区別できないため次のキーを早く打ちすぎ、そのキーがロード完了後に始まった文字送り演出の**「瞬時完了」として消費**されて（`Main.tsx` `next()`は`isTyping`中の入力を進行に使わない）、進行が1回分まるごと失われていた
  - 対処：`snPage.ts`に`pressKeyToWaitMark()`を追加。待ちマーカー（`store.wait`）は`#runStep()`の各反復の頭でnullに戻り`[l]`/`[p]`でだけ立つので、これを見れば「本物の停止点」だと確実に分かる。`[s]`では立たないため、そこだけ従来の`pressKey`＋`expect.poll`で受ける
  - `multi.e2e.ts`単体10回反復＋全E2E6回連続で緑を確認（修正前は約1/3で落ちていた）

- [x] **E2Eを「ブラウザでしか確かめられないもの」だけに整理**（2026-07-24）
  - 判定基準：DOM/算出CSS/`document.title`・入力イベント（クリック/キー）・React描画に依存する仕組み（Caretaker/Memento）・fetch/非同期・prj.json等の設定配線、のいずれかを含むものだけE2Eに残す
  - `mesStr()`/`snap()`はストアを読むだけなので、それしか見ていないテストは実質「エンジン＋ScriptMngのブリッジ」テスト。エンジン側のロジックがユニットで担保済みなら重複と判断した
  - 削除4件：`expr.e2e.ts`の「`[let]`と`&計算`」「`[if]`分岐」「マクロ引数`mp:`」（それぞれ`amp_*`／`ScriptEngine_if`36件／`macro_args_passedViaMpNamespace`が担保）、`wait.e2e.ts`の「`[p]`の次の進行でページがクリアされる」（`step_p_clearsOnResume`が担保）
  - `prj_expr`のシナリオも、残した3件（`[trace]`のDOM表示／`b_alpha`の算出CSS／`init.escape`の配線）だけを扱う最小構成へ縮小。停止点が1つになり押下操作も不要に
  - E2E 26件 → 22件。ユニット602件は変更なし

- [x] **`[char2macro]`/`[bracket2macro]`（一文字マクロ・括弧マクロ）に対応**（2026-07-24）
  - 地の文の中の「一文字」「括弧で囲んだ範囲」を、タグ・マクロ呼び出しへ読み替える仕組み。`[char2macro char=@ name=ハート]`以降の`@`は`[ハート]`に、`[bracket2macro text="〔〕" name=セリフ]`以降の`〔梨香〕`は`[セリフ text='梨香']`（＝マクロ側は`mp:text`で受け取れる）になる
  - 置換処理そのものは移植済みの`Grammar`が持っていた（`test/Grammar.test.ts`）ので、`ScriptEngine`にタグを足して繋いだ。`name`は「定義済みのタグかマクロ」でなければならず、本家は`hTag`を引くだけで済むが、試作はタグをswitch文で捌くため`#hTagNames()`（`RESERVED_TAGS`＋`#hMacro`）を都度組み立てて渡す
  - `Grammar`はトークン列を**その場で書き換える**（1トークンが複数へ割れる）ため、`Script`はトークン配列だけでなくGrammarの`Script`構造ごと保持する形へ変更し、置換のたびにラベル表を作り直すようにした（作り直さないと定義位置より後ろの`[jump label=…]`の飛び先がずれる）
  - 同じ理由で`step()`のループ条件も、先頭で1回読んだトークン数のキャッシュから`this.#script.len`の都度参照へ変更（実行中にトークン数が増減しうるため、キャッシュだと以降のトークンを取りこぼす）
  - 定義は共有`Grammar`が抱えるので、これ以降にパースされるファイルは`resolveScript()`の時点で置換済みになる。既にパース済みの他ファイルには及ばない（本家も同じ）
  - `char2macro`/`bracket2macro`を`RESERVED_TAGS`へ追加（マクロ名として使用不可に）
  - `test/ScriptEngine_macro.test.ts`に9件追加（定義前の文字は地の文のまま／未定義name・重複char・使用不可文字・2文字以外のtextはthrow／置換後もラベルが解決できる 等）。ユニット602件→611件

- [x] **`bunx tsc --noEmit -p test/e2e`が対象0件だったのを修正**（2026-07-24）
  - `extends`元（ルート`tsconfig.json`）の`exclude: ["test/e2e"]`は**extends元からの相対パス**として解決されるため、そのまま継承すると`test/e2e`自身が除外され、`error TS18003: No inputs were found`で1ファイルも型チェックされていなかった
  - `test/e2e/tsconfig.json`で`"exclude": []`と上書き。E2E側のソースは型エラー無しを確認

- [x] **ローカルイベント予約（`[event]`/`[clear_event]`）に対応**（2026-07-24）
  - `[event key=enter label=*x]`で「そのキーが押されたら読み進めではなく*xへ飛ぶ」予約ができる。`call=true`なら`[call]`扱い（`[return]`でその停止点へ戻る＝再びイベント待ちになる）、`fn=`で別ファイル、`del=true`で取り消し、`arg=`は`tmp:sn.eventArg`へ。発火時に`tmp:sn.eventLabel`/`tmp:sn.eventArg`をセットするのも本家（`Main.ts` `resumeByJumpOrCall()`）と同じ
  - **ローカルとグローバル**（本家 `ReadingState`の`#hLocalEvt2Fnc`/`#hGlobalEvt2Fnc`）：ローカル予約はjump系の発火で消える一回きりのもので、`[call]`時にコールスタックへ退避され`[return]`で書き戻される。**マクロ呼び出しだけは退避しない**（本家 `ScriptIterator.ts:957`「':hEvt1Time'の扱いだけは[macro]と異なる」）。`global=true`の予約はこれらの影響を受けない
  - エンジンはDOMに触れない方針を守り、予約は「飛び先の素データ」の表として持つ（本家はキー->コールバック関数の表）。キー名の取り決め（`KeyboardEvent.key`の小文字／クリックは`'click'`）と実際の入力との結び付けは`Main.tsx`の担当で、移動そのものは`[button]`クリックと同じ経路（`ScriptMng.jumpToLabelAndGo()`）を通す
  - `Main.tsx`のキー処理を、コード別の`useKey`4つから「まず予約を引き、無ければ従来の読み進め/読み戻り」の1つへ統合。クリックも同様に`fireEvent('click')`を先に見る
  - `ScriptMng.#jumpToLabelAndGo()`：`fn`指定かつ`label`省略（＝そのファイルの先頭へ）を、同一ファイルでもロード経由で扱うよう修正（`jumpToLabel('')`はラベル未定義でthrowになるため）
  - `test/ScriptEngine_event.test.ts`（新規23件）＋`test/e2e/event.e2e.ts`（新規4件・`prj_event`フィクスチャ）。ユニット611件→634件、E2E 22件→26件
  - E2Eに残したのは「ユニットでは届かないもの」だけ＝キー名の対応付け・クリック経路・予約が無いキーが従来どおり読み進めになること。予約表の挙動はすべてユニット側


- ok, 次の【既読処理】
- タグや機能のテスト・動作について参考になるかも
  - https://github.com/famibee/SKYNovel_gallery/blob/master/index.html
  - https://github.com/famibee/SKYNovel_gallery
  例えば既読処理は
    - https://github.com/famibee/SKYNovel_gallery/tree/master/public/prj/kidoku
    - https://github.com/famibee/SKYNovel_gallery/blob/master/public/prj/kidoku/mat/main.sn

- [x] **既読処理**（2026-07-24）
  - `step()`がトークンを読むたび、その位置をスクリプト別の`Areas`（本家から移植済みのクラス）へ記録する（本家 `ScriptIterator.ts:1292 #recordKidoku()`）。組み込み変数`const.sn.isKidoku`で参照でき、`[if exp="const.sn.isKidoku"]`で既読・未読を分岐できる
  - 本家の2つのルールをそのまま移植：**コールスタックがある間（サブルーチン・マクロ内）は既読フラグを更新しない**（同じサブルーチンが未読・既読どちらの文脈からも呼ばれるため、記録だけ行う）／**`[call]`は既定で戻り先の位置を未読へ戻す**（`count=true`で維持）。`[jump]`は既定が逆で既読のまま（`count=false`で消す）
  - `[clearvar]`/`[clearsysvar]`タグを追加。`VarStore`側の`clearGame()`/`clearSys()`は前からあったが、タグとしては未接続だった。既読情報が消えるのは`[clearsysvar]`（本家 `Variable #clearsysvar()`。gallery の kidoku サンプルが「既読情報クリア」ボタンでこのタグを使っている）
  - 保存は未実装。本家は`Variable.saveKidoku()`→`SysBase.data.kidoku`→localStorageだが、bluesnovelにはまだセーブ層が無いので当面エンジンが抱える。繋ぎ込み用に`getKidoku()`/`setKidoku()`を用意した
  - `test/ScriptEngine_kidoku.test.ts`（新規17件）。同じ位置を2周させ、1周目=未読／2周目=既読で確かめる形。ユニット634件→651件。E2Eは追加なし（ブラウザ側の配線が無い＝純粋なエンジンロジックのため）
  - 判明した点：`[jump count=false]`が消すのは「`[jump]`タグの次のトークン位置」で、そこは通常そのまま読み進める先ではないため実質効かない。本家の実装をそのまま移した状態なので`todo.md`へ確認事項として残した
  - `CLAUDE.md`に**SKYNovel_gallery**（<https://github.com/famibee/SKYNovel_gallery>）への参照を追加。機能ごとのサンプルシナリオがあり、タグ属性の実際の使われ方を確かめるのに使える

- [x] **オート読み・既読スキップ**（2026-07-24）
  - `&sn.auto.enabled = true`（一定時間で自動進行）／`&sn.skip.enabled = true`（既読部分を素早く飛ばす）／`&sn.skip.all = true`（未読も含め全部飛ばす）。3つはただのtmp変数で、`[if exp="sn.auto.enabled"]`でモード分岐もできる
  - **判断はエンジン（純粋ロジック）／タイマーはScriptMng**という分担にした。停止点`[l]`/`[p]`でエンジンが`#calcResume()`を評価し、`stop`アクションに`resume`（`{mode:'auto', msec}` か `{mode:'skip', msec:0}`）を付けて返す。既読スキップは`skip.all=false`なら未読に来た時点で止めて解除（本家 `Reading.ts` l()/p()）、`[s]`は必ず止まって`cancelAutoSkip()`（本家 s()）
  - `ScriptMng.#scheduleResume()`が`resume`を受けてタイマーで`go()`を自分で呼ぶ。`cancelAuto()`（`Main.tsx`が手動キー・クリックのたびに呼ぶ）でタイマー解除＋エンジンの3フラグを倒す。`[s]`到達・未読での停止でも自然に止まる（`resume`が返らない＝タイマーを仕込まない）
  - オート読みの待ち時間は`sys:sn.auto.msec{Line,Page}Wait`（既読時は`_Kidoku`側）。sys変数未設定でも既定値（行50…実際は500ms／改ページ3500ms）で動く。`isKidoku`（前回実装）と連動
  - 既読スキップ中は文字送り演出を省いて瞬時表示：`store.skipping`フラグを`ScriptMng`が立て、`TxtLayer`が読み戻り時と同じ経路（GSAPを使わず`gsap.set`で終端状態へ）で描く
  - `T_INIT_FNCS`に`requestSkip`/`setSkipping`を追加。`Main.tsx`のキー・クリック処理の先頭で`scrMng.cancelAuto()`を呼ぶ
  - `test/ScriptEngine_autoskip.test.ts`（新規14件、resume判断・待ち時間・`isNextKidoku`・`cancelAutoSkip`）＋`test/e2e/autoskip.e2e.ts`（新規2件・`prj_autoskip`フィクスチャ、クリック無しで`[l]`を越えて`[s]`まで進むこと）。ユニット651件→665件、E2E 26件→28件
  - E2Eに入れたのは「ブラウザでしか確かめられないもの」＝ScriptMngのタイマーが実際に画面を進めること。どの停止点で自動進行するかの判断は全部ユニット側
  - 残課題（`todo.md`へ）：`isNextKidoku`のクロスファイル対応、`sys:sn.skip.mode`、文字送りウェイト（`_Kidoku`）のGSAPパラメータへの接続、オート待ち時間の起点（本家は演出完了後）

- [x] **オート読み・既読スキップの残課題：`isNextKidoku`のクロスファイル対応とスキップモード**（2026-07-24）
  - `isNextKidoku`（既読スキップを「未読に来たら止める」判定）を、サブルーチン内では本家同様「呼び出し元の続き（戻り先）」を見るようにした。呼び出し元が別ファイルでもよいよう、コールスタックのエントリに呼び出し元の`Script`を持たせ、そのトークン数（`scr.len`＝スクリプト終端判定用）を引く（本家 `ScriptIterator.isNextKidoku`の`#hScript[cs.fn]`相当）
  - スキップモード`sys:sn.skip.mode`（既定`'s'`）に対応。`'s'`は行`[l]`も改ページ`[p]`も飛ばす、`'p'`は行は飛ばすが改ページで止まる（本家 `Reading.ts` p() は`mode==='s'`のときだけ改ページを飛ばす）
  - `test/ScriptEngine_autoskip.test.ts`に4件追加（同一ファイル・別ファイルでの`isNextKidoku`、スキップモード`'s'`/`'p'`）。ユニット665件→669件、E2E追加なし（純粋エンジンの判断ロジックで、タイマー配線は前回のまま）
  - 残課題（`todo.md`へ）：モード`'p'`の改ページ停止を`Main.tsx`の手動停止（`cancelAuto()`）と区別できておらず、その改ページをクリックで越えるとスキップも解除される（既定`'s'`は問題なし）

- [x] **`[lay b_alpha=…]`の値域（0.0〜1.0）クランプ**（2026-07-24）
  - 範囲外の指定を`Math.min(1, Math.max(0, v))`で正規化。`b_alpha=40`（0.4のつもりの打ち間違い）→1.0、`-0.5`→0.0、`Infinity`（`Number()`ではNaNにならず既存のNaN判定を素通りする）→1.0
  - **例外にはしない**方針とした：本家（`TxtLayer.ts:387` `argChk_Num`）はクランプせず素通しするため、例外にすると本家で動くスクリプトをbluesnovelだけが弾くことになる
  - クランプ先はエンジン（`chgBAlpha`アクションを積む時点）。本家はCSSの`rgba()`が描画時に丸めるだけなので、ストア（＝Memento・デザインモードが読む状態）には範囲外の値が残ってしまう。そこを正規化するのが目的
  - `test/ScriptEngine.test.ts`に4件追加（上限・下限・範囲内（境界含む）はそのまま・Infinity）。ユニット669件→673件、E2E 28件は変更なし


skynovel_esmプロジェクトのmain.snからたどり、callしているsetting.sn, ext_*.sn, sub.sn ... に登場するタグから優先で実装していきたい。
- tmp_esm_uc/doc/prj/script/main.sn at main · famibee/tmp_esm_uc https://github.com/famibee/tmp_esm_uc/blob/main/doc/prj/script/main.sn
- タグごとにtodo.mdに追加
- 最後に呼ばれるのはtitle.sn。いったん[s]までとする
- 表示アーキテクチャがpixijsからReactに変更になるのでタグの変更・追加・削除・いったん無視などがありうるが、それはまた別項
- たとえば動画・音声などは一旦無視でいい。スクリプト処理や画面表示に関わるモノのみ実装

- [x] **タグ属性の共通処理（`cond=` /「%属性名」/「*」/「&式」）**（2026-07-24）
  - 本家 `ScriptIterator.ts:418 タグ解析()` の前半を`ScriptEngine.#resolveTag()`として移植。個別タグの実装ではなく**全タグ横断の前処理**で、本家シナリオ（`tmp_esm_uc/doc/prj/`）では`cond=`85箇所・`%`111箇所・`*`39箇所と多用されるため、他のタグを足す前提として先に入れた
  - `cond=`：偽ならそのタグ自体を実行しない（`[jump]`や`[let]`のような処理系タグにも効く）。`exp`と同じく「&」は不要で、付いていたら例外。本家に合わせ`String(値)`が`'null'`/`'undefined'`でも偽、加えてbluesnovelの`[if]`（`ExprEval.evalBool()`）と揃えて文字列`'false'`も偽
  - `%属性名`：そのマクロが受け取った属性値を参照する。`|省略値`と組で使い、引数が無く省略値も無い（または`'null'`指定）なら**その属性自体を渡さない**（本家の規約）。マクロ外で使うと例外
  - `[タグ *]`：受け取った属性を丸ごと引き継ぐ。個別指定があればそちらが優先。マクロ外で使うと例外
  - `&式`：属性値を式として評価する。結果が`undefined`になる属性は渡さず、省略値があればそれを評価して使う。これまで`[trace text=]`だけが個別に`getValAmpersand()`を呼んでいたのを共通層へ移した
  - 参照元は**コールスタックへ積んだ生の属性文字列**（`#aCallStk[].hArgs`。本家の`csArg`相当）。`mp:`変数でも同じ値は引けるが、読み出し時に自動キャストが掛かり`'1.20'`→`1.2`になってしまうため別途持たせた。本家同様`[call]`の属性も積むので、マクロでないサブルーチンからも`%`で引ける
  - 実行を伴わない走査（`[if]`ブロックの`elsif`/`else`/`endif`探し、`[macro]`の`[endmacro]`探し）は従来どおり生の値を見る`ScriptEngine.parseTag()`のまま。本家もその2箇所では`#alzTagArg.hPrm`を直接参照している
  - 挙動変更が1件：`[trace text=&未定義変数]`はこれまで文字列`'undefined'`を表示していたが、本家準拠で「属性を渡さない」＝`[trace]`側の既定（空文字）になった。既存テスト`step_trace_ampPrefix_undefinedVar`を更新し、省略値へフォールバックする例を1件追加
  - `test/ScriptEngine_tagarg.test.ts`（新規26件）。ユニット673件→700件、E2E 28件は変更なし（属性解決は純粋なエンジンロジックでブラウザ要素が無いため）
  - `todo.md`の「本家サンプルの`main.sn`をたどってタグを実装」節を新設し、対象ファイル群のタグを棚卸しして優先順位付け（本項目はその1件目）。`CLAUDE.md`にタグリファレンス（<https://famibee.github.io/skynovel_esm/tag.html>、全タグ一覧は`skynovel_esm/src/sn/Grammar.ts`の`T_HTag`）とサンプルゲーム`tmp_esm_uc/doc/prj/`への参照を追加


ページ裏表（[lay]のpage属性）、[trans]、[wt]だけで大項目、実装
- [trans]: 裏表ページそれぞれ画像と動画を一枚の板テクスチャ？にし、属性timeの時間をかけて表ページを次第に透明にしていく。（裏ページを前面にして非透明にしていく手もある、負荷の軽そうな方で）
- [wt]: [trans]の終了を待つ。クリックで終了状態にskip、決して中途半端な状態で止めない
- 表示そのものなのでe2eテストも必要と思われる

- [x] **ページ裏表（`[lay page=…]`）・`[trans]`・`[wt]`**（2026-07-24）
  - **裏表2枚のページ**を導入（本家 `Pages.ts`）。ストアは`aPage: [T_LAY[], T_LAY[]]`と`foreIdx`を持ち、`[add_lay]`はレイヤを必ず両面へ作る。`[lay]`の`page`属性の既定は本家同様`'fore'`（`Pages.argChk_page(hArg, 'fore')`）
  - **配列の中身は決して入れ替えず、`foreIdx`だけを反転する**のが設計の要。中身を入れ替えるとReactから見て2つのコンテナの子が丸ごと差し替わり、`TxtLayer`が文字送り演出をやり直して交換の瞬間に画面がちらつく（レイヤ側のDOMキャッシュも作り直しになる）
  - `[trans]`のクロスフェードは**表ページを`time`かけて`opacity 1→0`にし、下から裏ページを出す**向き。「裏を前面に置いて`0→1`」でも枚数・負荷は同じだが、裏ページに絵の無い部分があるとそこから表が透けたまま最後に消える＝完了の瞬間にパッと消える。表を消す向きなら演出中に見えている下の絵が最終状態そのものなので破綻しない
  - `[trans layer=…]`（カンマ区切り、省略時は全レイヤ）に対応。交換対象外のレイヤは`startTrans()`で裏へ表の内容を写しておく（本家 `#trans()`の「transしないために交換する」相当）。こうすると裏ページ＝交換後のあるべき画面そのものになり、最後は`foreIdx`の反転だけで済む
  - `time=0`と既読スキップ中は演出せず即交換（本家 `#trans()`の`time === 0 || isSkipping`）
  - `[wt]`は`[trans]`の終了待ち。エンジンは`{t:'waitTrans', canskip}`を積んで一旦返り、待ちの主体は`ScriptMng`（`#waitTrans()`）。`canskip`の既定は`true`で、待ち中のクリック・キーは「読み進め」ではなく「演出を今すぐ終了状態へ」に読み替える（`#goSafe()`が横取りする）。飛ばしても必ず終了状態になるので、中途半端な見た目のまま止まることはない（本家 `CmnTween.stopEndTrans()`の`stop().end()`）
  - **設計上の要点：演出の終了を宣言するのは`ScriptMng`**（時間切れ or `[wt]`中のクリック）で、Stage側のGSAPは見た目を動かすだけ。実装途中でGSAPの`onComplete`に交換をやらせたところ、「交換」と「シナリオ再開」の前後が保証されず、**交換前のページへ次の文が書かれて画面が空のまま進む**不具合が出た（E2Eで検出）。zustandの`set`は同期なので、`finishTrans()`→`go()`の順で呼べば書き込み先は必ず新しい表ページになる
  - `[wt]`の有無に関わらず`[trans]`適用時に`time`ぶんのタイマーを仕込むので、`[wt]`を書かなくても演出はきちんと完了する
  - 待ちマーカー（🩷/✅）は表ページにだけ出す（`TxtLayer`に`isFore`を追加）。裏ページにも同名レイヤが常駐しているため、そのままだと二重に描画される
  - `test/ScriptEngine_trans.test.ts`（新規16件、page属性の既定・`layer=`の分解・`time`検査・スキップ時の即交換・`[wt]`の中断と再開）＋`test/e2e/trans.e2e.ts`（新規5件・`prj_trans`フィクスチャ）。ユニット700件→716件、E2E 28件→33件
  - E2Eに入れたのは見た目そのもの：演出中に表の`opacity`が下がり裏が`visible`になること、`[wt]`がその間シナリオを止めていること、クリックで飛ばしても終了状態に落ちること、`time=0`が即交換になること
  - E2Eヘルパ（`snPage.ts`）を裏表対応に更新。`snap()`は表・裏・`foreIdx`を返し、DOMを見る箇所は`[data-page="fore"]`配下に限定した。演出中は文字が変わらないため`waitIdle()`だけでは通過してしまうので、`waitTransRunning()`/`waitTransDone()`を追加


今回の更新でtmp_bluesの表示が崩れているので、以下の前提条件を徹底
- ノベルゲームシステムが表示を司る <div id="skynovel"></div>全体をstageと呼ぶ（skynovelと用語をあわせる）
- stageの縦横サイズをdoc/prj/prj.json から取得し、固定
"window": {
	"width": 1024,
	"height": 768
},
- 文字・画像レイヤなどはこの範囲内のみ表示とする
- [trans]はこのサイズで行い、画像がない部分は黒塗り潰しとする

- [x] **ステージ（`<div id="skynovel">`）の寸法固定・表示範囲の切り取り・黒地**（2026-07-24）
  - `tmp_blues`で表示が崩れていた件。実測すると`#skynovel`は**1280×0**、その中のステージ本体も**1200×0**で、レイヤは全部その外側へはみ出して描かれていた（`transform: scale()`はレイアウト上のサイズを変えないのに、幅・高さを与えていなかったため）
  - 用語を本家に合わせ、`<div id="skynovel">`＝**ステージ**と呼ぶことにした（`styParent`→`styStage`、`divRef`→`stageRef`）
  - ステージの寸法は`prj.json`の`window.width`/`height`固定（`Config.generate()`→`CmnLib.stageW`/`stageH`）。`overflow: hidden`で範囲外は表示しない
  - ブラウザウインドウに合わせた縮小（`transform: scale(cvsScale)`）は従来どおり。ただし`transform`はレイアウトサイズを変えないので、`useLayoutEffect`で`#skynovel`自身へ**拡縮後の実寸**も書く（これが無いと等倍ぶんの領域を確保したままになり、余白や不要なスクロールバーが出る）
  - 画像を置いていない領域は黒。ステージ本体と、`[trans]`でクロスフェードさせる表裏2枚の「ステージ大の板」の全部を不透明な黒地にした（本家がページごとに板テクスチャを作って重ねるのと同じ絵になる）
  - `test/e2e/stage.e2e.ts`（新規3件）で寸法・切り取り・黒地・縮小時の追随を固定。E2E 33件→36件。ユニット716件は変更なし（DOMのレイアウトなのでエンジン側に影響が無い）
  - 確認は`.claude/skills/playwright-cli/`で実際の`tmp_blues`（:5173）を開いて実測した

- [x] **ページ裏表の残り：`[button page=…]`・`[er]`の両面消去・`[page clear=true]`**（2026-07-24）
  - `[button]`に`page`属性を追加。裏ページへボタンを組んでおき`[trans]`で見せる、という本家の流儀（`title.sn`が`[clear_lay page=back]`→`[button]`→`[trans]`でやっていること）が書けるようになった
  - **既定は`fore`のままにした**。本家の既定は`back`（`LayerMng.ts:1100` の `argChk_page(hArg, 'back')`、コメントも「チェックしたいというよりデフォルトをbackに」）だが、bluesnovelの既存シナリオ（`tmp_blues`のmain.sn・E2Eフィクスチャ）は`[trans]`を挟まないものが多く、既定をbackにするとボタンが不可視の裏に置かれて消える。`ScriptEngine.ts`に`//TODO:`を残し、シナリオが`[trans]`前提になった時点で寄せる
  - `[er]`を**表裏どちらの文字も消す**ようにした（本家 `hTag.er`「ページ両面の文字消去」）。片面だけだと`[trans]`で裏が表に出た瞬間に前の場面の文字が蘇る。`chgStr`アクションに`page: 'fore'|'back'|'both'`を追加し、`'both'`は`[er]`だけが使う（本家 `LayerMng.ts:535` の `page='both'`相当）
  - `[page]`に対応（`clear`のみ）。**本家の`[page]`は裏表ではなく「読み戻り用のページログ」のタグ**で、`sub.sn`の`sys_title_start`が`[page clear=true key=…]`で本編開始時に履歴を捨てている。bluesnovelでは`Caretaker.clear()`を新設して繋いだ（タイトル画面まで読み戻れてしまうのを防ぐ用途）。`to=`/`style=`/`key=`は読み戻りの作りが本家と別なので未対応（`todo.md`へ）
  - 地の文・`[r]`は表ページ固定のまま。地の文には属性を書けない＝実質常に既定（本家`[ch]`も既定`fore`）なので、試作では表のみとする
  - `[trans layer=…]`の交換対象外レイヤを裏へ複製するコストを確認：`structuredClone`＋`nm`検索でレイヤ数ぶんのO(n²)だが、実シナリオのレイヤ数は5〜10程度（`tmp_esm_uc`の`dsp_lays`は5）なので問題なしと判断し、`todo.md`から落とした
  - `test/ScriptEngine_trans.test.ts`に7件追加（地の文のページ・`[er]`の両面・`[button]`の既定と`page=back`・`[page]`の3件）、`test/e2e/trans.e2e.ts`に2件追加（`[er]`が裏の文字も消すこと・`[button page=back]`が`[trans]`で表に出ること）。ユニット716件→723件、E2E 36件→38件

- [x] **レイヤ操作タグ：`[clear_lay]`と`[lay]`の属性拡充**（2026-07-24）
  - `[lay]`に`visible`/`alpha`/`left`/`top`/`rotation`/`scale_x`/`scale_y`/`b_color`/`style`を追加。`rotation`は度（本家もflash由来で度。pixiのradianではない）、`alpha`はレイヤ全体の不透明度で文字レイヤ背景だけを透かす`b_alpha`とは別物。数値は本家`argChk_Num`同様`0x`始まりを16進として読む
  - **未指定の属性は値を持たせない**のが要点。最初は初期値（`left: 0`等）を全レイヤに持たせたが、それだと指定していない属性まで毎回インラインstyleへ書き出してしまい、`TxtLayer`のCSS既定（`top: 48%`）を潰して**文字レイヤが画面上部へ飛ぶ**回帰が出た（`tmp_blues`を`playwright-cli`で実測して発見。y=436→90）。本家 `Layer.lay()` も `'left' in hArg` で書かれたかどうかを見ているので、そちらへ合わせた
  - `[clear_lay]`を実装（本家 `LayerMng.ts:528`）。見た目を「未指定」へ戻し、中身（画像／文字＋ボタン）も捨てる。**`visible`だけは触らない**（本家 `Layer.clearLay()` のコメントそのまま）。`page`の既定は`back`、`page=both`で両面、`layer`はカンマ区切りで複数可
  - `b_color`は`0xRRGGBB`を8bit成分へ分解し、`b_alpha`をアルファとして`rgba()`に落とす（未指定時は試作の既定色＝aquamarine相当のまま）。`style`は文字レイヤの既定CSSの後ろに置き、上書きできるようにした
  - `test/ScriptEngine_lay.test.ts`（新規18件）＋`test/e2e/lay.e2e.ts`（新規5件・`prj_lay`フィクスチャ）。ユニット723件→741件、E2E 38件→43件
  - E2Eに入れたのは「アクションが算出CSSへ落ちているか」だけ（`transform`の行列成分・`rgba()`・`display`・`letter-spacing`）。どのアクションを積むかはユニット側
  - `CLAUDE.md`に**「ページ」という語が2つの別物を指す**注意書きを追加：レイヤの裏表（`[lay page=…]`/`[trans]`）と、`[p]`で区切られる文章のページ（`[page]`＝読み戻りログ）。本家由来の用語衝突で、コード上も`aPage`/`foreIdx`と`Caretaker`で別物

- [x] **イベント系タグ：`[enable_event]`・`[wait]`・`[waitclick]`（と`[s]`の完全停止）**（2026-07-24）
  - `[enable_event]`（対象ファイル群で18箇所と単体最多）。文字レイヤ単位でクリックの可否を切り替える（本家 `LayerMng.ts:1088`）。`layer`省略時は現在の文字レイヤ、`enabled`省略時はtrue。`TxtLayer`のボタン群へ`pointer-events: none`を掛ける形で実装し、本家同様に変数からも読める（本家は`save:const.sn.layer.<レイヤ名>.enabled`、bluesnovelは`game:`名前空間）。表裏どちらのページにも同じ値を入れる（レイヤ自体の状態なので`[trans]`で揺れないように）
  - `[wait time=…]`（本家 `Reading.ts:320`）。`[wt]`と同じ形で、待つのは`ScriptMng`。`canskip`の既定はtrueでクリックで打ち切れる。**既読スキップ中は待たない**（未読に来ていたらそこでスキップ解除）のも本家どおり
  - `[waitclick]`。本家では`[s]`と**同じ関数**を通り（`Reading.ts:712` `hTag.waitclick = o=> rs.s(o)`）、`ReadingState_wait4Tag`がタグ名で振り分けている。`'s'`はユーザー操作に反応せず予約イベントだけを受け、`'waitclick'`はクリックで進む。停止点の種類に`'waitclick'`を足して同じ構造にした
  - **その過程で`[s]`が実は素通りしていたのを発見**。bluesnovelの`[s]`は「止まる」と言いながらクリックすれば次のトークンへ進んでしまう状態で、既存E2Eが通っていたのは`[s]`が全てファイル末尾にあったため。`ScriptMng`に`#stopped`を持たせ、`[s]`以降は`go()`を無視するようにした。`[event]`/`[button]`の予約だけは停止を越えて動かせる（本家も予約イベントだけは受ける）
  - `[set_focus]`は保留にした。キーボードフォーカスの管理役（本家 `FocusMng`）が要り、`add=`/`del=`が`dom=セレクタ`でHTML要素を対象に取るため、既に保留中の`[event]`の`key='dom=…'`と同時に設計するのが筋。`to=null`だけ実装しても意味が無い
  - 併せて数値属性の検査を厳しくした：`Number('')`が0になるJSの癖で、`[wait]`のように必須の数値属性を書き忘れても0として通ってしまっていた
  - `test/ScriptEngine_wait.test.ts`（新規13件）＋`test/e2e/waitev.e2e.ts`（新規6件・`prj_wait`フィクスチャ）。ユニット741件→754件、E2E 43件→49件
  - E2Eに入れたのは「ユーザー操作にどう反応するか」だけ。`pointer-events: none`のボタンはPlaywrightの通常の`click()`だと「他要素が横取りする」と判断されて待ち続けるので、`{force: true}`でその位置を実際にクリックし、読み進めへ抜けることを確かめている

- [x] **文字列・数値操作タグ：`[let_replace]`・`[let_substr]`・`[let_length]`・`[let_index_of]`・`[let_char_at]`・`[let_abs]`・`[let_round]`・`[let_search]`**（2026-07-24）
  - 本家 `Variable.ts:347-432` を移植。どれもDOMを触らずエンジン内で完結するので、テストはユニットのみ（E2Eは無し）
  - 本家と同じく「`text`属性を加工して`[let]`と同じ規則で`name`変数へ代入する」形。本家は加工結果を`hArg.text`へ書き戻してから`#let()`を呼ぶが、こちらは代入部分を`#letText()`へ切り出して加工結果の文字列を直接渡す
  - **`[let]`に本家書式の`text`属性を実装した**のが実質の要点。本家の`[let]`は`text`＝「値そのもの」で、式にしたい場合は`text=&式`と書く（＝共通の属性前処理`#resolveTag()`が評価する）。本家シナリオは`[let]`が計70箇所ほどあり全て`text=`なので、これが無いと`tmp_esm_uc`のシナリオは動かない。加えて`[let_replace]`/`[let_index_of]`は`val`を**別の意味**（置換文字列・検索文字列）で使うため、bluesnovel独自の`val`＝常に式評価という書式と衝突する
  - bluesnovel独自の`val`は既存テスト・E2Eシナリオが多数使っているので当面残し、`text`があればそちらを優先する。`val`の廃止は`todo.md`へ
  - `[let_abs]`が`Math.abs()`を使わないのは本家に合わせたもの（数値以外を渡した時にbooleanが0/1になる等、紛れの元になるため）。`[let_substr]`の`pos`負値（本家 `ext_voice.sn`のゼロ詰め3桁が使う）と`len=all`、`[let_replace]`/`[let_search]`の`flags`もそのまま移植
  - `[let_replace]`の`val`省略時が文字列`'undefined'`での置換になるのも本家そのまま（`String(hArg.val)`）。消したい場合は本家シナリオ同様`val=''`と明示する
  - 省略値つきの数値属性用に`#argNumDef()`を追加（本家 `argChk_Num()`の省略値あり呼び出しに対応）。`[let_char_at]`の`pos`、`[let_index_of]`の`start`、`[let_substr]`の`pos`/`len`など
  - `test/ScriptEngine_letstr.test.ts`（新規27件）。ユニット754件→781件、E2Eは変更なし

- [x] **トゥイーンアニメ：`[tsy]`・`[wait_tsy]`・`[stop_tsy]`・`[pause_tsy]`・`[resume_tsy]`**（2026-07-24）
  - 本家 `LayerMng.ts:798 #tsy()` ＋ `CmnTween.ts`。本家は`@tweenjs/tween.js`でpixiの`DisplayObject`を直接動かすが、bluesnovelは**GSAPでストアのレイヤ属性（`T_LAY_STY`）を動かす**形にした。つまり画面の現在値は常にストアが持つ
  - 見た目だけをDOMへ書く手もある（`[trans]`はそうしている）が、それだと**Memento（読み戻り）や`[trans]`のレイヤ複製が演出前の古い値を拾う**。副作用として、本家の`arrive`属性（終了時に目標値を確実に入れる）は常時ONと同じ挙動になる
  - **落とし穴**：GSAPは対象オブジェクトへ自分用のキャッシュ（`_gsap`。中から`target`を指し返す）を生やすので、トゥイーン対象をそのままストアへ渡すとレイヤが循環参照になり、`structuredClone`（`addLayer`/`[trans]`）も`JSON`化（Memento）も落ちる。動かす属性名は分かっているので、その分だけ拾って新しいオブジェクトを作る（E2Eが最初に踏んで発覚）
  - 純粋な部分（属性値→目標値、イージング名の解決、トゥイーン名）は`src/ts/Tsy.ts`へ分けた。GSAPもDOMも触らないのでエンジンから呼べる＝**書き間違いをシナリオ実行時にその場で例外にできる**（`[tsy ease=Nazo.Out]`等）
  - 属性値の書式は本家そのまま：`500`／`'=500'`（現在値からの相対）／`'250,500'`（ランダム）／`'=250,500'`。相対はレイヤの現在値が要るので、エンジンは`{v, rel}`のまま渡し、`ScriptMng`がストアの現在値（`getLaySty`を新設）と足し合わせる
  - イージングはtween.jsの31種をGSAPへ機械的に変換（`Quadratic`〜`Quintic`＝`power1`〜`power4`、`Sinusoidal`=`sine`、`Exponential`=`expo`、`Circular`=`circ`、`Linear.None`=`none`）
  - **本家の`[tsy]`は`x`/`y`しか見ない**（`CmnTween.aLayerPrpNm`）のに、`tmp_esm_uc`の`ext_fg.sn`は`[tsy left=… top=…]`と書いている＝本家では黙って無視されている。bluesnovelのレイヤ属性は`left`/`top`なので、`x`/`y`をその別名として受けて両方効くようにした
  - `[stop_tsy]`・`[wait_tsy]`中のクリックは、どちらも必ず「終了状態」へ送る（本家 `stop().end()` と同じ考え方）。中途半端な見た目のまま止まることはない
  - 既読スキップ中は`time`/`delay`を0にして即座に終了状態へ（本家 `CmnTween.tween()` の`isSkipping`判定）。`repeat`は本家が「`repeat=1`で計1回」なので`repeat-1`を渡す規約で、GSAPも同じ（0で1回、-1で無限）
  - 本家は同名トゥイーンの開始時に`#hTwInf`を上書きするだけで古いトゥイーンがGroupに残って動き続けるので、そこだけ変えて`kill()`している
  - `test/ScriptEngine_tsy.test.ts`（新規24件）＋`test/e2e/tsy.e2e.ts`（新規4件・`prj_tsy`フィクスチャ）。ユニット781件→805件、E2E 49件→53件
  - `path=`（複数区間の経路）・`chain=`・`render=`・`filter=`・`backlay=`・`width`/`height`/`pivot_*`は未対応（`todo.md`へ）

- [x] **システム系タグ：`[title]`・`[toggle_full_screen]`・`[dump_lay]`・`[pop_stack]`（＋修飾キー付きのキー名）**（2026-07-24）
  - `[title text=…]`（本家 `SysBase.ts:448`）。本家サンプルの`setting.sn:50`が体験版表記に使っていて、**`main.sn`から`title.sn`までの経路で実際に実行される数少ないシステム系タグ**。ストアの`title`→`useTitle`は既にあったのでタグを繋いだだけ
  - `[toggle_full_screen]`（本家 `SysBase.ts:462`）。ストアに「全画面にしたい」という**要求**（`fullScr`）を持たせ、`Stage.tsx`がreact-useの`useFullscreen`へ渡す。実際にそうなったかは戻り値で分かるので、それを組み込み変数`const.sn.displayState`へ書き戻す。**エンジンは自分ではこのフラグを倒さない**——Escでの解除などブラウザ都合の変化があるため（本家も`SysWeb`が`fullscreenchange`を拾って`isFullScr`を直している）
  - `[toggle_full_screen key=…]`は「そのキーで全画面を切り替えられるようにする」常駐予約。`[event]`の予約（ラベルへ飛ぶ）とは別枠なので`ScriptMng`が別表で持ち、`Main.tsx`が先に問い合わせる
  - **修飾キー付きのキー名に対応**（`Main.tsx` `keyName()`、本家 `SysBase.modKey()`の移植）。`alt+` `ctrl+` `meta+` `shift+`の順に前置する。本家サンプルの`main.sn`が`[event key=alt+enter]`や`[event key=Meta+0]`を使っており、それまでは`e.key.toLowerCase()`だけだったので引けなかった。修飾キー自身を押した時に`alt+alt`にならないよう、`e.key`と同じものは前置しない
  - `[pop_stack]`（本家 `ScriptIterator.ts:984`）。`[return]`せずにサブルーチンを抜ける。`clear=true`で全部捨てる。本家同様、ifスタックは「壁」(-1)だけに戻し、マクロ引数（`mp:`）も捨てる。**途中の`[if]`は無かったことになる**ので、抜けた先に残った`[endif]`へ辿り着くとエラーになる——これは本家と同じ挙動（本家 `#endif()` も `t === -1` なら投げる）
  - `[dump_lay]`（本家 `LayerMng.ts:1068`）。表裏まとめてデバッグ表示へ。ストアに`getPages`を追加
  - `test/ScriptEngine_sys.test.ts`（新規16件）＋`test/e2e/sys.e2e.ts`（新規4件・`prj_sys`フィクスチャ）。ユニット805件→821件、E2E 53件→57件
  - E2Eに入れたのはブラウザ側の結び付きだけ（`document.title`、予約キーが`fullScr`を切り替えること、`alt+enter`で`[event]`が引けること）。実フルスクリーンAPIはヘッドレスで当てにならないので、要求が立つところまでを見る
  - `[record_place]`/`[reload_script]`（セーブ層が要る）・`[window]`/`[close]`（Electron専用。本家もブラウザ版ではno-op）・`[snapshot]`（pixiのcanvas前提でDOM描画では取得手段から検討）は保留（`todo.md`へ）
- [x] **`Stage.tsx`の`lazy()`が効いていなかったのを修正（`INEFFECTIVE_DYNAMIC_IMPORT`）**（2026-07-24）
  - `Main.tsx`は`Stage`を`lazy()`（＝動的import）で読み込んでいるが、`GrpLayer`/`TxtLayer`が`noticeDrag`を、`store`が`A_LAY_STY_KEY`を`Stage.tsx`から**値として**静的importしていたため、`Stage`が同じチャンクへ引き戻されて分割が全く効いていなかった
  - 共有物（`T_LAY`・`T_LAY_STY`・`A_LAY_STY_KEY`・`T_LAY_IDX`・`T_LAY_CMN`・`styLay`・ドラッグ通知）を`src/components/Lay.ts`へ切り出し、`Stage.tsx`はコンポーネント本体だけにした。これで`Stage.tsx`を静的importするモジュールが無くなる
  - ドラッグ中フラグ（`isDrag`）は`Stage.tsx`が読み書きしていたので、`Lay.ts`側に置いて`noticeDrag()`/`clearDrag()`/`isDragging()`で触る形にした
  - `import type`だけなら型は消えるので警告の原因にならないが、区別が事故のもとなので参照先ごと`Lay.ts`へ寄せている。この制約は`CLAUDE.md`にも書いた
  - ユニット821件・E2E 57件とも変化なし（挙動は同じ）

- [x] **レイヤ操作タグの残り：`pivot_x`/`pivot_y`・`blendmode`・重なり順（`index`/`float`/`dive`）・`[clear_lay]`の`layer`省略**（2026-07-24）
  - `pivot_x`/`pivot_y`（本家 `Layer.lay()` のpivot＝pixiの`DisplayObject.pivot`）はCSSの`transform-origin`へ。既定の左上＝`0 0`なので、それまでの`transform-origin: left top`と互換。**pixiのpivotは表示位置そのものもずらす**が、こちらは原点を変えるだけ——回転・拡縮の中心を動かす用途では同じ絵になる
  - ついでに`[tsy]`のトゥイーン対象へも`pivot_x`/`pivot_y`を追加（本家 `CmnTween.aLayerPrpNm`にあった分）。残るは`width`/`height`だけ
  - `blendmode`はCSSの`mix-blend-mode`へ。本家（`Layer.getBlendmodeNum()`）が受け付けるのはpixiの`BLEND_MODES`へ引ける4種（`normal`/`add`/`multiply`/`screen`）だけなので、同じ名前だけを通して弾く文言も本家に合わせた。`add`はCSSに同名が無いので`plus-lighter`（加算合成）を当てる
  - 重なり順`float`（最前面へ）・`index`（指定位置へ）・`dive`（指定レイヤのすぐ下へ）。**表裏とも同じ順に動かす**（本家も`#fore`/`#back`の両方を`setChildIndex`する）ので`page`属性とは無関係。並び替えは現在の並びが要るので、エンジンは`{mode, index?, dive?}`を渡すだけにしてストア側で解決する（`[tsy]`の相対指定と同じ分担）
  - 本家の忠実な移植として**`index=0`は何も起きない**（`#lay()`が`if (hArg.index)`の内側でさらに数値の真偽を見るため、最背面へ送る指定にはならない）。`dive`が自分より後ろのレイヤなら、自分が抜けた分だけ行き先を1つ下げるのも本家どおり
  - `[clear_lay]`の`layer`省略（＝全レイヤ）に対応。エンジンはレイヤ一覧を持たないので、`[trans]`/`[dump_lay]`と同じく`aLayNm: null`のまま渡して「全部」の解決はストア側に任せる。**省略（＝全部）と、書いたのに空（＝書き間違い）は区別する**
  - **ストアのユニットテストを新設**（`test/store_lay.test.ts`）。並び替えの計算はストアにしか無く、E2Eで見るには細かすぎる。zustandの`create()`はDOMを要らないので`bun test`から直接触れる
  - `test/ScriptEngine_lay.test.ts`に11件追加・`test/store_lay.test.ts`（新規12件）＋`test/e2e/lay.e2e.ts`に3件追加。ユニット821件→844件、E2E 57件→60件

- [x] **HTMLフレーム：`[add_frame]`・`[frame]`・`[set_frame]`・`[let_frame]`と`[event key='dom=…']`**（2026-07-24）
  - 本家 `FrameMng.ts` の移植。`main.sn`が`[call fn=_yesno]`する先が全面的にこれを使うので、目標経路上の大物
  - **フレームはストア（`aPage`）には載せない**。中身は自分のJS状態を持つ生きたHTML文書で、JSONへ写し取っても復元できないため（本家もiframeをcanvasの隣へ挿すだけでレイヤ・ページの仕組みには載せていない）。代わりに`src/ts/FrameMng.ts`がDOM側で抱え、`[set_frame]`/`[let_frame]`はiframeの`window`変数を直接読み書きする。`srcdoc`で作るので同一オリジン＝中の`var`変数・関数へ手が届く
  - **本家より簡単になった点**：本家は位置・寸法にステージの拡縮（`cvsScale`）を毎回自分で掛けてiframeへ書き、リサイズのたびに全フレームを書き直していた。こちらは`Stage.tsx`が**拡縮される箱の中**にフレーム置き場（JSXでは子を持たない空div）を用意するので、ステージ座標のまま書けばよくリサイズ追従も勝手に効く。Reactは自分が作った子しか触らないので、そこへ`FrameMng`がiframeを足しても衝突しない
  - `[add_frame]`は**停止点**にした（HTMLのfetchが要る。本家も`Reading.beginProc`で止める）。読み込み完了後、本家と同じ組み込み変数一式（`const.sn.frm.<id>`とその`.alpha`/`.x`/`.width`/`.visible`…）をエンジンへ書き戻してから再開する
  - `[let_frame]`も停止点にした。**アクションの適用は`step()`が返った後**なので、そうしないと取得した値が同じstep内では古いまま読まれてしまう（本家はタグを1つずつ同期実行するので起きない問題）
  - `[event key='dom=フレームid:セレクタ']`。**CSSセレクタは大小文字を区別する**ので、予約表の索引には小文字化した値を使いつつ、DOM側へは元の文字列（本家の`rawKeY`）を渡す。要素の種別でイベント名を変える（checkbox/rangeは`input`、text/textareaは`input`+`change`、他は`click`+Enter）のも本家どおり。発火は既存の`fireEvent`経路へ流し込むので、ラベルジャンプの扱いは通常のキー予約と同じ
  - `srcdoc`に入れる前にHTML内の相対パスをそのHTMLの置き場所基準へ直す（本家 `FrameMng.ts:122`。`srcdoc`の中では相対パスの基準がドキュメント自身でなくなるため）
  - **`Stage`は`lazy()`ロードなので、フレーム置き場はシナリオ開始より後に届く**（`[add_frame]`がスクリプト冒頭にあると確実にそうなる）。最初は「置き場所がまだありません」と例外にしていたが、待てば必ず来るので届くまで待つ形にした
  - `test/ScriptEngine_frame.test.ts`（新規22件）＋`test/e2e/frame.e2e.ts`（新規6件・`prj_frame`フィクスチャ。自前の`yesno.html`が`var`変数と関数を持ち、それを読み書きする）。ユニット844件→866件、E2E 60件→66件
  - E2Eの注意：このシナリオは`[add_frame]`/`[let_frame]`でstep()の途中から一旦返るため、その隙間が`waitIdle()`からは停止点と区別できない（複数ファイルと同じ事情）。表示の確定は`expect.poll`で待つ
  - `[tsy_frame]`・フレーム内画像の差し替え（本家`sn_repRes()`）・`sn.event.domdata.*`は未対応（`todo.md`へ）

- [x] **`[set_focus]`（キーボードフォーカスの順番管理）**（2026-07-24）
  - 本家 `FocusMng.ts` ＋ `EventMng.ts:640 #set_focus()` の移植。`[event key='dom=…']`が入って前提が揃ったので保留を解いた。`main.sn`が矢印キーの予約から`[set_focus to=&sn.eventArg]`を呼ぶ形で使う
  - 本家はpixiのContainer（ゲーム内ボタン）とHTML要素（フレーム内の部品）を混ぜて並べるが、bluesnovelはどちらもDOM要素なので`HTMLElement`だけの一本の輪になる。輪へ入る経路は本家と同じ3つ：`[button]`（表示中ずっと）・`[event key='dom=…']`の**最初の1件だけ**（本家 `EventMng.ts:596` の `if (i === 0)`）・`[set_focus add='dom=…']`
  - `src/ts/FocusMng.ts`はモジュール直下の単一インスタンス。画面全体で1つしかない状態で、Reactのツリー（BtnLayer）からもDOM側（ScriptMng）からも触るため。`Lay.ts`のドラッグ通知と同じ流儀
  - `[button]`は`<span>`なので`tabIndex={0}`を付けないと`focus()`が効かない。ついでにフォーカス中のEnter／Spaceで押下できるようにした（キーボードだけで操作できる）
  - **踏んだ穴その1**：フレーム内にフォーカスがある間、キー入力は**親のdocumentまで飛んでこない**。そのままだと`to=next`で一度フレームへ入ったら最後、矢印キーが効かなくなる。本家も同じ事情で各フレームのbodyへイベントを張っている（`EventMng.resvFlameEvent()`）ので、こちらは同じ内容のイベントを親のdocumentへ投げ直して`Main.tsx`の1本の経路へ合流させた
  - **踏んだ穴その2**：フレーム内の要素からフォーカスを外しても、**親から見るとiframe自身がフォーカスされたまま**でキー入力もそちらへ行く。`to=null`では親側のフォーカスも外す（本家も`blurSub()`で`globalThis.focus()`を呼んで画面へ戻している）
  - `add`/`del`が`dom=`以外なら例外にした（本家は黙って無視して`to`の処理へ落ちるが、書き間違いを見逃さないため）
  - `test/ScriptEngine_focus.test.ts`（新規8件）＋`test/e2e/focus.e2e.ts`（新規4件・`prj_frame`フィクスチャを拡張）。ユニット866件→874件、E2E 66件→70件
  - ゲームパッド対応（`range`のstepUp/Down等）とフォーカス時の見た目は未対応（`todo.md`へ）

- [x] **フィルター：`[add_filter]`・`[clear_filter]`・`[enable_filter]`と`[lay filter=…]`**（2026-07-24）
  - 本家 `LayerMng.ts:836 #add_filter()` ＋ `Layer.ts:101 bldFilters()`。**表示アーキテクチャ変更（pixi→React/DOM）の影響が一番大きかった項目**
  - 本家のフィルターはpixiの`BlurFilter`/`NoiseFilter`/`ColorMatrixFilter`で22種あるが、bluesnovelはCSSの`filter`プロパティなので**素で書ける9種だけ対応**した（`blur`/`brightness`/`contrast`/`grayscale`/`black_and_white`/`negative`/`saturate`/`hue`/`sepia`）。既定値は本家に合わせてあり、`saturate`だけはpixiが「1を基準にamountぶん増やす」形なのでCSSへ渡す際に足している
  - 未対応のものは**「名前を知らない」のか「本家にはあるがCSSで書けない」のか**を区別して知らせる。前者は本家と同じ`filter が異常です`、後者は書ける9種を挙げた専用メッセージ。残り13種のうち`noise`以外はすべて`ColorMatrixFilter`のプリセットなので、SVGの`feColorMatrix`へpixiと同じ5x4行列を流し込めば同じ絵が出せる（`todo.md`へ）
  - 対象レイヤの選び方（`layer`省略＝全レイヤ）とページの扱い（`page=both`可）は`[clear_lay]`と全く同じで、違うのは配列をどういじるかだけなので、3タグ＋`[lay filter=]`をストアの1アクション（`chgFilter`）にまとめた
  - `[lay filter=…]`は**置き換え**（本家 `Layer.lay()` の `c.filters = [bldFilters(hArg)]`）。重ねたいなら`[add_filter]`。この違いは本家由来なので残した
  - 純粋な部分（filter名→CSS関数、有効なものだけ並べる）は`src/ts/Filter.ts`へ。GSAPもDOMも触らないのでエンジンから呼べる＝filter名の書き間違いをシナリオ実行時にその場で例外にできる（`Tsy.ts`と同じ流儀）
  - `test/ScriptEngine_filter.test.ts`（新規15件）＋`test/store_lay.test.ts`に8件追加＋`test/e2e/lay.e2e.ts`に1件追加。ユニット874件→897件、E2E 70件→71件
  - 本家サンプルが使うのは`[add_filter filter=brightness page=both]`（`ext_fg2.sn`の「最後に変化した立ち絵以外を暗くする」演出）だけなので、対応範囲としては足りている

- [x] **`[button]`の配置・寸法・変形属性と、目標経路の残タグ洗い出し**（2026-07-24）
  - まず**目標（`title.sn`の`[s]`まで）に何が残っているか**を調べた。実行経路のファイル群から使用タグを全部抜き出し、実装済み一覧・プロジェクト側マクロ・音声系と突き合わせた結果、**一番効いている穴が`[button]`の座標指定**だと分かった。`title.sn`のタイトルボタン4つは`left`/`top`/`width`/`height`/`rotation`/`pivot_x`/`pivot_y`で絶対配置しており、bluesnovelの`[button]`は`text`/`label`/`call`/`fn`しか見ていなかった
  - `left`/`top`/`width`/`height`/`rotation`/`pivot_x`/`pivot_y`/`scale_x`/`scale_y`/`alpha`/`enabled`/`blendmode`を実装（本家 `Button.ts` のコンストラクタ相当）。**書かれた属性だけ**を持つのは`[lay]`と同じ流儀
  - **`left`/`top`が書かれた時だけ絶対配置**にした。本家は常に絶対配置（省略時0,0）だが、試作のシナリオは複数ボタンを座標指定なしで並べており、既定を(0,0)にすると全部重なってしまうため。書かなければ従来どおり流し込み
  - 本家は`width`/`height`で**文字そのものを引き伸ばす**（pixiの`Text.width/height`は拡縮）。こちらは箱の大きさとして扱い、`height`をフォントサイズの基準にして収める。見た目の詰めは実機で（`todo.md`へ）
  - `enabled=false`は文字を灰色にし`pointer-events: none`（本家も`fill`を`gray`にしてイベントを張らない）
  - `test/ScriptEngine_btn.test.ts`（新規7件）＋`test/e2e/button.e2e.ts`に3件追加。ユニット897件→904件、E2E 71件→74件
  - **洗い出しの結論を`todo.md`の冒頭へ記録した**：目標経路で未対応なのは音声・画像アセット・文字装飾（`[ch]`/`[span]`/`[link]`）・しおり層だけになり、**タグ単体の実装はおおむね一巡**。残りの山はアセットパイプラインとしおり層

- [x] **試作用フォールバックの撤去と、画像アセット経路の通し**（2026-07-24）
  - `path.json`／`Config.searchPath()`の仕組み自体は最初から移植済みだったが、**本物の画像を一度も通していなかった**（E2Eフィクスチャは意図的に画像なしで作ってあった）。その状態を2つの試作用フォールバックが覆い隠していたので、両方外して経路を通した
  - `ScriptMng`の`SAMPLE_SN`（スクリプト読込に失敗したらダミーシナリオへ差し替える）を撤去。`path.json`に無い・取れないならシナリオは続けられないので黙って代替せず止める。併せて`load()`が投げっぱなしだったのを握るようにした（未処理のPromise拒否になり、何が起きたか分からないまま画面が空になっていた）
  - **画像のパス解決を描画時から`ScriptMng`へ移した**のが要点。`GrpLayer`は`render`の中で`searchPath()`を呼んでおり、サーチパスに無いと例外＝**Reactごと落ちる**。だから`try/catch`で握り潰すしかなかった。シナリオ実行時（`chgPic`適用時）に解決すればエラーをデバッグ表示へ出せるので、`GrpLayer`は出来上がったURLを描くだけの素直な部品になった
  - ストアは論理名（`fn`）と解決済みURL（`src`）の両方を持つ。前者は`[dump_lay]`・デバッグ用
  - 画像1枚が見つからないだけでゲームごと止めるのはやり過ぎなので、そこは`'ET'`（表示して停止）ではなく`'E'`（表示のみ）にした
  - `test/e2e/app/prj_pic/`を新設。**実体のPNGを2枚置いて**`path.json`→`searchPath()`→`<img>`まで通し、`naturalWidth`で本当に読めていることまで見る（読めなければ0になる）。`[add_face]`の差分合成の重なりと、解決失敗時に画面が落ちないことも同じフィクスチャで確認
  - `test/e2e/pic.e2e.ts`（新規3件）。E2E 74件→77件、ユニットは変更なし904件

- [x] **✅ 目標到達：本家サンプルの`main.sn`から`title.sn`の`[s]`まで走り切った**（2026-07-24）
  - 前回「次はアセットを実プロジェクトで通すのが最短」と書いたので、まず**エンジンだけで実シナリオ（`../tmp_esm_uc/doc/prj/`）を走らせて、どこで止まるかを測った**。ScriptMngがDOM側で担う部分（スクリプトのfetch、HTMLフレームの読込、環境の組み込み変数）だけを最小限まねれば、DOMもfetchも画像・音声アセットも要らずにシナリオ解釈を通せる
  - 止まるたびに直して4回進めた。見つかった穴は以下の4つ、いずれも**推測では出てこなかったもの**：
  - **1. `save:`名前空間が通らない**。bluesnovelは本家の`save:`を`game:`という名前にしていたが、**本家シナリオはどれも`save:`と書く**。`VarStore`だけでなく`ExprEval`にも効いていて、後者では「`save:`の`:`」を三項演算子と誤認して`三項演算子の文法エラーです`になっていた。両方で`save:`を`game:`の別名として受けるようにした（同じ入れ物を指す。片方だけ直すと変数を見失う）
  - **2. 環境の組み込み変数が無い**（`const.sn.config.window.width`・`navigator.language`・`screenResolutionX/Y`・`isApp`/`isDebugger`/`needClick2Play`等）。エンジンは`prj.json`もブラウザも知らないので、`ScriptMng#defEnvBuiltins()`から登録する形にした（エンジンに`defBuiltin()`の口を開けた。本家 `SysBase.init()` の`val.defTmp(…)`群に対応）
  - **3. `mp:const.sn.me_call_scriptFn`が無い**（マクロを呼んだ側のスクリプト名）。マクロ本体は定義元ファイルの中にあるので、そのままではラベルの探索先が定義元になる。本家サンプルの`[for_call]`が`fn=%fn|&mp:const.sn.me_call_scriptFn`と書いてまさにこれを使っており、**無いと「ラベルが見つかりません」で止まる**。マクロ呼び出し時に`const.sn.macro`とあわせて`mp:`へ入れるようにした（本家 `ScriptIterator.ts:1384`）
  - **4. `[let]`にtextもvalも無いときのエラーが不親切**だった。「`&式`の評価がundefinedになって属性ごと落ちた」場合もここに来るのに、空文字を式として評価して`(ExprEval)文法エラー【】`になっていた。原因の分かる文言にした
  - `test/uc_goal.test.ts`（新規2件）で**目標そのものを回帰テストにした**。`[s]`に到達すること、経路上で実際に起きたこと（ファイル横断39回・フレーム1つ・`[trans]`1回・ボタン4つ）、タイトルのボタン4つが本家どおりの座標（`left=250/350/550/650 top=360 width=90 height=30`）と`call`指定で積まれることを見る。`../tmp_esm_uc`が無い環境では丸ごとスキップ
  - ユニット904件→906件、E2Eは変更なし77件
  - **これはシナリオ解釈が通ることの確認**であって、ブラウザで絵と音が出るところまでは別途（`todo.md`冒頭に整理した）


## v0.2.1
- 一部最新 SKYNovel コードを導入
## v0.2.0
- いったん SKYNovel をほとんど含まないシンプルな状態へ戻す。（スクリプト末尾エラーは出てる）
## v0.1.1
- electron-store は v8.2.0 止まりで。v9.0.0・v10.0.0 で「window.」が含まれており、アプリ版でエラーになる。
	- v1.53.13 の頃にも
## v0.1.0
- Initial commit
