# TO DO・優先順位順

（セッション開始時のserena疎通確認・MCPタイムアウト時の注意は`CLAUDE.md`の「MCP pre-flight」へ移動）

- [ ] **`ScriptEngine.tokenize()`を`Grammar.resolveScript()`へ差し替え**（次の一手）
  - 現状 `src/ts/ScriptEngine.ts:46` の素朴な正規表現3種のままで、せっかく移植した`Grammar`を誰も使っていない
  - 差し替えると複数行タグ・文字列リテラル中の`[`/`]`/`;`・`[let_ml]`・エスケープ文字が一気に効くが、トークンの切れ方が変わる（タブが独立トークンになる、コメントが1トークンになる等）ため、`ScriptEngine.step()`のトークン走査とラベル収集の見直しが必要
  - `Grammar`は`T_Config`を要求するので、`ScriptEngine`へcfgを渡すか、ワイルドカード展開だけ切り離すかの判断も要る
- [ ] `ExprEval`の`getValAmpersand()`をタグ属性の評価経路（`ScriptEngine.#evalAmpArg`）へ統合する（現状は`[trace]`専用の簡易版が残っている）
- [ ] E2Eの拡充（未着手）：`[lay b_alpha=...]`の見た目、`[if]`/`[let]`分岐、マクロ呼び出し、`[trace]`のデバッグ表示
- [ ] マクロ関連の残課題
  - [ ] マクロ名の禁止文字チェック（本家`#REG_NG4MAC_NM`相当）
  - [ ] マクロの入れ子定義（マクロ内での`[macro]`定義）
  - [ ] `[call]`の`hMp`保存を「常時」行う設計にしたため、本家`CallStack.ts`の`ICallStackArg`との統合要否は引き続き先送り中
- [ ] `[return]`のfn/label指定による戻り先変更（本家`#return()`は対応、未対応のまま）
- [ ] `[call]`の`count`/`clear_local_event`属性（本家にあるが、既読処理・ローカルイベント予約が未実装のため対象外のまま）
- [ ] 複数ファイル（`jump fn=...`）対応、`ScriptMng`側でのファイル切替設計の具体化
  - `[button]`・`[call]`・マクロ呼び出しとも現状は同一ファイル内ラベルのみ対応
  - 設計方針（持ち越し）: `ScriptEngine`を「1ファイル分のパース結果保持」に縮小し、実行状態（`#idx`, `#aIfStk`, `#aCallStk`, `#hMacro`, 変数等）は`ScriptMng`または新設`Runtime`クラス側に一本化する
- [ ] グループ位置指定/移動（face合成した画像群を1つの単位として、デザインモードで位置調整・移動する仕様の検討）
  - face合成そのもの（`add_face`/`[lay fn=... face=...]`）は実装・テスト済み
  - デザインモードでのMoveableリサイズ時、差分画像（face）は`dx`/`dy`が絶対px指定のため、拡大縮小に追随しない（`GrpLayer.tsx`）。比率換算の要否を検討
  - 本家のように「`face`のみ指定して直前の`fn`を維持する」独立更新には未対応
- [ ] 実機（`tmp_blues`）で以下を確認
  - [ ] 読み戻り（PageUp/PageDown）から戻った際、既読部分が瞬時表示されない
  - [ ] `main.sn`へ`[lay layer=mes b_alpha=...]`を仕込んで、文字レイヤ背景の不透明度変更の見た目を確認（`main.sn`には`[lay layer=mes b_alpha=0.4]`が既にあることを今回確認済み。表示結果の目視確認は未実施）
- [ ] `b_alpha`の値域（0.0〜1.0）を超える値のバリデーション（クランプ）は未実装
- [ ] 型チェック（`tsc --noEmit`）がテスト実行フロー（`bun test`）に含まれていない。CI/pre-commit等への追加を検討（今回 `bunx tsc --noEmit` を実行したが、`node_modules`内の型定義由来のエラーのみでプロジェクトコード起因のエラーはなし）
- [ ] 動画・音声対応
- [ ] `SAMPLE_SN`フォールバック（`ScriptMng.ts`）と`GrpLayer.tsx`の`try/catch`を撤去し、正規のアセットパイプライン（`path.json`）を用意した上で正しいロードエラー処理に戻す
- [ ] 文字送り演出のパラメータ（`duration: 0.25`, `stagger: 0.035`）は仮値。実機（`tmp_blues`）で調整
- [ ] `title.sn`（本家形式）を実際に動かす場合は、対応タグの拡充（`img`/`clear_lay`/`event`/`trans`/`wt`/`bgm`等）が必要。`button`は対応済み
- [ ] npmリリース処理を`skynovel_esm`に合わせる（後々の対応・未着手）
- [ ] `package.json`から`store`, `socket.io-client`を除去（後々の対応・未着手）
- [ ] skynovel_esm側もGSAP化を検討中（bluesnovelの`@tweenjs/tween.js`は現状未使用のまま残置。撤去はnpmリリース処理整備と合わせて後日）
- [ ] `[button]`の見た目・レイアウト（現状は簡易スタイルのみ）は未検討
