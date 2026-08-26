#TODO 優先順位順

> **済んだことは `CHANGELOG.md`**（作業ごとの経緯・判断つき）。
> このtodo.mdは**これからやること**だけを持つ（＝いずれ空になるのが正しい）。

## 進め方

対象は本家サンプル `tmp_esm_uc/doc/prj/` と、実テンプレ `tmp_blues/doc/prj/` の実行経路。
タグリファレンス：<https://famibee.github.io/skynovel_esm/tag.html>（ローカル実体は
`skynovel_esm/docs/tag.html`。全タグ一覧は `skynovel_esm/src/sn/Grammar.ts` の `T_HTag`）。
シナリオ中の `fg`/`img`/`sys_menu`/`txt_lay_*`/`ask_ync` 等は**プロジェクト側マクロ**なので、
実装が要るのはその中身のタグのみ。`[notice]` はプロジェクト側プラグインなので対象外。
表示アーキテクチャがpixi.js→Reactに変わるため、タグの変更・追加・削除・保留は随時判断する。
ギャラリー（<https://github.com/famibee/SKYNovel_gallery>）の `public/prj/<機能>/` が機能ごとの仕様。

## sn_gallery をbluesnovel駆動にする

`../sn_gallery`を本家（skynovel_esm）ではなくbluesnovelで動かし、本家ギャラリー
<https://famibee.github.io/SKYNovel_gallery/>（動作の正解）と突き合わせて未実装のタグ・機能を
洗い出す。runSN/stop（プロジェクト切替・停止。`data-prj`クリック導線含む）は2026-08-21に
SysBase/SysWeb/ScriptMng/storeへ実装・動作確認済み（`bluesnovel/src/sn/SysBase.ts`の`run()`/
`stop()`、`web.ts`の`SysWeb.runSN()`、`ScriptMng.destroy()`、`store/store.tsx`の`resetStore()`）。

`sn_gallery/public/prj/<機能>/`を本家ギャラリーの同名プロジェクトと1つずつ突き合わせるフェーズは
2026-08-23に完了（`simple_novel`はユーザー判断により対象外）。発見した不具合はすべて都度修正済み
（凍結・保留と判定したもの以外）。経緯・詳細は各修正コミットのメッセージを参照。

本家互換のプラグイン機構（`[add_lay class=…]`→`addLayCls`。3D/Live2D等のPixi前提プラグインを
sn_galleryから移植できるようにする土台）は2026-08-24に実装・実行時配線まで完了（下記参照）。

残りは以下：

- [ ] 依存の付け替え（`sn_gallery/package.json`の`"@famibee/skynovel_esm": "file:../bluesnovel"`
      という**本家のフリ**をどうするか）は本格移行時に改めて判断（2026-08-21時点は現状維持と決定）

### プラグイン機構（addLayCls）の実装メモ

`src/sn/LayCls.ts`（clsレジストリ）・`src/sn/Layer.ts`（本家Layer基底のDOM版。`ctn`は素のdiv）・
`src/ts/PlgLayMng.ts`（`[add_frame]`のFrameMngと同じ「store外・DOM側」でLayerインスタンスを
fore/back 2個持つ管理クラス）・`src/components/PlgLayer.tsx`（Reactの箱。中身はPlgLayMngが
`attachBox()`で出し入れ）で構成。`T_LAY`（`src/components/Lay.ts`）は`cls: 'grp'|'txt'|(string & {})`
へ拡張し、判別ユニオンの絞り込みは`isGrpLay`/`isTxtLay`/`isPlgLay`という型ガード関数を経由させる
（インライン比較`e.cls==='grp'`ではプラグイン型を絞り込めないため）。`SysBase.#initPlg()`が
`Config.generate()`の後・main.sn起動前にプラグインの`init()`を一括実行し、`addLayCls`を実際に
機能させる。E2E疎通確認は`test/e2e/plg.e2e.ts`（`prj_plg`＋`test/e2e/app/dmyPlg.ts`）。


## タグ・変数の残り

- [ ] **フィルターの残り**：本家22種のうち`noise`以外の21種に対応済み（`src/ts/Filter.ts`）。サンプル <https://github.com/famibee/SKYNovel_gallery/tree/master/public/prj/filter>
  - [ ] `predator`/`color_tone`は実機比較でやや色味に差が出た（優先度低）。2026-08-12に行列自体を
        再確認：`src/ts/Filter.ts`の数値は`@pixi/filter-color-matrix`の`predator()`/`colorTone()`と
        完全一致し、本家`Layer.ts`側の呼び出しも両方とも`multiply`既定`false`（＝オフセット列の
        `/255`変換は本家側もしていない）で揃っている。`Stage.tsx`の`colorInterpolationFilters="sRGB"`
        も設定済みで既定`linearRGB`への取り違えでもなく、素材画像のICCプロファイルも埋め込み無し／
        標準sRGBのみで色管理差という線も弱い。矛盾しない残りの可能性はpixiのGLSLシェーダが行う
        アルファのun-premultiply/premultiply（`c.a>0`時`c.rgb/=c.a`→行列適用→`rgb*=result.a`）と
        SVG `feColorMatrix`側のアルファ処理の違い、またはWebGLとSVGのラスタライズパイプライン差だが、
        これは実機でのピクセル値比較でしか切り分けられないため優先度低のまま保留
- [ ] `break_fixed`系。禁則文字の指定（`kinsoku_sol`/`kinsoku_eol`/`kinsoku_dns`/`kinsoku_bura`）は本家`Hyphenation.ts`を移植して対応済み（`src/ts/Hyphenation.ts`）。`break_fixed`系は`[l]`/`[p]`待ちマーカーの位置決め用だが、bluesnovelは待ちマーカーをReactの兄弟spanで別管理しているため用途が無く対象外。`r_size`（ルビサイズ）は本家にもない属性で、`r_style="font-size:…"`で代替できるため専用属性は追加しない
- [ ] `[add_filter]`の`quality`/`kernel_size`/`resolution`/`repeat_edge_pixels`（`blur`のpixi専用パラメータ）未対応。2026-08-20、`docs/tag.html`整理時に`noise`の陰に隠れていたのを発見（`noise`のみ上記フィルターの残りに記載済みだった）
- [ ] `[ch]`/`[span]`の`ch_in_style`/`ch_out_style`未対応（定義自体は`[ch_in_style]`/`[ch_out_style]`で受け付けるが、`[ch]`/`[span]`側の属性としては未接続）。`[span]`は`wait`/`r_align`も未対応。`[graph]`は`wait`（`id`属性はGrammar.tsにも本家にも見当たらず出自不明、対象外とする）、`[tcy]`は`wait`が未対応。いずれも2026-08-20、`docs/tag.html`整理時に理由未記載のまま放置されていたのを発見。実装要否・理由の調査はこれから
- [ ] `[tsy]`の`render`未対応（[trans]のように絵を合成してから不透明度を適用する機能。pixi前提の合成方式のため）。2026-08-20、`docs/tag.html`整理時に発見

## アセット・基盤

## 優先度低

- [ ] フィルターの`noise`はCSSにもSVGの単純な組合せにも無いので、対応するならcanvas等で別途。<https://ics.media/entry/241122/> が参考になるかも
- [ ] 【現状不使用・優先順位低】アニメpng（スプライトシート）：文字レイヤの枠画像（`[lay b_pic=…]`）でのシート再生。今はCSSの背景画像に直接URLを入れているので、.jsonが来ると絵が出ない
- [ ] フレーム内幅が本家960に対しこちら1024なので bootstrap の`row-cols`が1列多くなる（不具合ではない）。合わせるならステージ実寸とフレーム幅の関係を再検討
- [ ] sn_gallery側の3D/Live2D系プラグイン本体の移植（`cubism3_layer`/`emote_layer`）。
      `3d_layer`は2026-08-24にDOM版へ書き換え済み（`sn_gallery/src/plugin/3d_layer/ThreeDLayer.ts`。
      pixi.jsのSprite/Textureブリッジを外し、three.jsのWebGLRendererのcanvasを直接
      `this.ctn.appendChild()`する形に変更）。`3d_base`/`3d_gltf`で実機確認：グリッド表示・
      立方体の生成/移動/追加/個別削除、gltfモデルの表示・アニメ切替まで正常動作。本家(pixi版)との
      実機比較で見た目のスケールが完全一致することも画像diffで確認済み（同日、ユーザー実機の
      devicePixelRatio=2環境で「サイズが違う」報告を受けて追跡：原因は`this.ctn`（position:relative）
      にwidth/height未指定だったため、中身のcanvas（position:absolute）が通常のフロー計算に
      参加せず`ctn`の高さが0のままになり、canvasの`top:50%`中央寄せの基準がずれて実際より
      上にオフセットして描画されていたこと。`this.ctn.style.width/height = '100%'`を追加して解決。
      3D自体のカメラ・投影計算にバグは無かった＝dpr起因の疑いやthree.jsのsetSize/setPixelRatio
      呼び出し順序は無関係と確認済み）。ビルドは`sn_gallery`単体で`vite build`が通る。
      残るcubism3_layer/emote_layerも同じ方針（three.js/Live2D本体の依存はbluesnovel本体には
      追加しない方針＝ユーザー判断なので、sn_gallery側で個別にインストールし、DOM版へ書き換える）。
      なお`ThreeDLayer.ts`はDOM版へ書き換え済みのため、依存が本家`skynovel_esm`のまま（現状維持、
      上記「依存の付け替え」参照）だと`[add_lay layer=3d class=3d]`が`Cannot set properties of
      undefined (setting 'position')`で例外になる（本家`Layer.ctn`はpixi.jsのSprite、
      `ThreeDLayer.ts`は`this.ctn.style.position=…`とDOM前提でアクセスするため）。2026-08-24、`[add_lay]`例外報告を機に発覚・確認）
- [ ] `[lay]`のisWait対応（glTFロード待ち等でシナリオを止め、`pia.resume()`で再開する仕組み。
      本家 `Pages.lay()`の戻り値相当。現状は常にfalse扱いで進む）
- [ ] `[trans]`でプラグインレイヤーの中身が裏へコピーされない（本家 `Pages.transPage()`/
      `Layer.copy()`相当が未実装。`src/ts/PlgLayMng.ts`にコメントで場所だけ残してある）

## 要検証（出自不確か・追跡工数を投じない）

**縦書きグリフ描画不具合**：2026-08-17、上記の改行位置ズレ調査中に**Claude自身が実機比較の
スクリーンショット目視で発見・自己判定**した現象（禁則で次列へ送られた対の2文字目のグリフが
描画されない）。**ユーザーによる観測報告は一度もない**（本人へ確認したところ「今初めて聞いた」
とのこと）。根拠は目視1回のみで、以後の追試（手動3回・フォント読み込み遅延注入17回・実アプリ
自動周回80回、累計100試行超）は**すべて非再現**。観測アーティファクト（Claudeの誤認）である
可能性を排除できていないため、**ユーザーまたは第三者が実機で再現を確認するまで追跡工数を
投じない**。詳細はCHANGELOG.md 2026-08-17の該当エントリ群を参照。

対策として行ったGSAP→Web Animations API置換（コミット`3b7eeb2`）は**取り消さない**：動機は
誤っていたが、副次的に実バグ2件（`sty4Moveable`の恒等transform常時適用、ルビ`marginBlockStart`の
`getBoundingClientRect`誤用）を修正済みで、E2E・単体テストとも回帰なしを実機確認済みのため

`test/e2e/app/prj_vertglyph/`のフィクスチャ（`ipamjm.ttf`は46MBのため**未コミット・
`.gitignore`対象**、`tmp_blues/doc/prj/script/ipamjm.ttf`からローカルコピーすれば動く）は
再開時に再利用可能

## 保留

- [ ] `[dump_script]`（本家はVSCode拡張との連携）：sn_extension（VSCode拡張）は公開停止中で、
      再申請できるのは8月下旬（8/25頃）。それまで拡張機能側に手を入れられないため、連携先が
      無い状態での実装は着手しない
- [ ] `[link]`の残り：`onenter`/`onleave`（本家はラベルをコールし`[return]`で戻る仕様。素朴に`[button call=true]`と同じ経路（`callToLabel`→通常のstep実行継続）を流用すると、マウスが乗っただけで本編が読み進んでしまうバグになる——`[return]`後にそのまま次のトークンへ進む設計のため。正しく作るには「サブルーチンを`[return]`まで走らせたらそこで止め、読み進めには使わない」専用の実行経路をエンジンに新設する必要があり、`[button]`と共通の中規模な追加実装になる。`global`は対応済み（受理はするが効果を持たない扱いで決着。理由はdocs/tag.htmlの`[link]`欄）
- [ ] **デザインモードは無効化中**（`Stage.tsx`の`ENA_DESIGN_MODE = false`）。長押しで入れてしまうが、中で触れるのはレイヤの位置・サイズだけで、触った結果をシナリオへ書き戻す先が無い。本家機能の大部分（音声・履歴・文字演出）が揃い、「調整→保存」の行き先を決めてから戻す
  - [ ] グループ位置指定/移動（face合成した画像群を1つの単位として、デザインモードで位置調整・移動する仕様の検討）。再設計時、Moveableリサイズで差分画像（face）の`dx`/`dy`が絶対px指定のため拡大縮小に追随しない問題（`GrpLayer.tsx`）も併せて直す（書き戻し先が無いため今は保留。2026-08-10調査）
- [ ] **ESLintは塩漬け中**。`typescript-eslint`（8.65.0時点で最新）がTS 7非対応と明示的にthrowする（[issue #10940](https://github.com/typescript-eslint/typescript-eslint/issues/10940)）ため、`eslint.config.mts`を置いてもVSCode拡張は動かない。パーサが無いと`.ts`を解析できないので回避策も無し。TS 7.1対応が出たら復活する。`@typescript/typescript6`は`import ts6 from '@typescript/typescript6'`と明示的に書けるツールにしか効かず、`require('typescript')`決め打ちのtypescript-eslintには届かない（bunの`resolutions`によるネスト解決も無視される）
  - [ ] 復活したら`eslint-plugin-import`（2.32.0のまま更新停止、ESLint 10対応PRが未マージ）を`eslint-plugin-import-x`へ切替。peerDependencyがESLint 10を公式サポート済みで移行も軽微（このリポジトリの`import/no-unresolved: 'off'`1行だけ`import-x/`にプレフィックスを変える程度）。本家`skynovel_esm`もeslint関連が全く同じバージョン構成・同じ1行なので同時に対応可能
- [ ] **画像レイヤ、ロード中の途中経過が画面に見えてしまう**：`GrpLayer.tsx`は`<img src=…>`を
      DOMへ即座に挿入しブラウザのネイティブ非同期デコードへ任せているため、ダウンロード／
      デコードが終わる前の状態（画像の上半分だけ描画され下半分はまだ何も無い、等）がそのまま
      画面に出ることがある。加えて`width: max-content`（`GrpLayer.tsx:137`）は自然サイズが
      確定するまで箱ごと縮小されうる。本家はpixi(WebGL)のテクスチャとしてロードするため、
      完全ロードまで前の絵のまま止まり、この過渡状態は見えない。2026-08-23、sn_galleryの
      topプロジェクト実機比較でユーザーが発見（`localhost:8082`のスクショで背景画像が右下に
      小さく縮小＋黒帯／上半分だけ白いまま、という形で顕在化。`bluesnovel.png`参照）。
      ローカル環境ではほぼ発生しないため優先度低いが再現条件は明確：`Image()`で事前に
      デコード完了を待ってから`<img>`をDOMへ入れる（本家のテクスチャロードと同じ待ち方）か、
      少なくとも`opacity: 0→1`のフェードインで途中経過を隠す、のどちらかで直せる見込み

## 凍結

- [ ] `max_row`（最大行数を超えたら自動改ページ）：本家`skynovel_esm`でも`Grammar.ts`に
      `max_row?: string`の型定義があるだけで、`TxtLayer.ts`/`TxtStage.ts`のどちらでも消費して
      おらず、受理はするが黙って無視される死んだ属性と判明（2026-08-12調査。`docs/tag.html`にも
      記載無し、`test/argdef_parity.test.ts`にも既定値の記載無し）。`sys:sn.tagCh.canskip`と
      同じ構図で、本家自体が未接続のため bluesnovel 側で先行実装するのは移植の範囲を超えるとして
      見送り
- [ ] `[ch_out_style]`の適用（定義と`[lay out_style=]`・`[span ch_out_style=]`は受け付けるが、消去のアニメをまだ行なっていない＝本家の既定`wait=0`と同じ結果）。文字が消えるのはページ切替や`[er]`でReactが要素を捨てる場面なので、消えていく間だけ古い文字を生かす仕組みが要る。出現演出（`src/ts/ChStyle.ts`）とは別の作りになる
- [ ] `[trans]`の`delay=`・`ease=`（進度は常に等速）・`glsl=`（自前シェーダ）：現状使用していないため未実装のまま凍結。`glsl=`はWebGLを使わないため実現しようがないので対象外
- [ ] `[quake]`の`delay`/`repeat`/`ease`/`yoyo`は本家でも揺れ幅がランダムで効かないため見送り
- [ ] `sys:sn.tagCh.canskip`（クリック等でのテキストスキップ可否）：本家でも読み書きできる変数として
      定義されているだけで、実際のクリックスキップ処理（`TxtLayer.ts:816-818`の`click()`）はこの値を
      参照せず無条件にスキップする。`msecWait`等の兄弟変数のように起動時キャッシュへ読み込む処理も
      本家に無い（`Variable.ts:126-132`）。本家自体が未接続のため、bluesnovel側で先行接続するのは
      移植の範囲を超えるとして見送り（2026-08-10確認）
- [ ] **ルビ付き行の行間不揃い（縮小して残存）**：2026-08-18、`ss_000.sn:24`本題の修正
      （`margin-block-start`を「実際に列/行の先頭に来た表示単位」だけへ絞る変更）により、
      **行/列の途中にルビがある場合の不揃いは解消したと実機確認済み**（`ss_000.sn:24`の
      「安全｜剃刀《かみそり》」列で列内ピッチが完全に均一、marginTop常に0pxを実測。詳細は
      CHANGELOG.md 2026-08-18参照）。ただし**行/列の先頭にルビが来る場合は、直前との間隔が
      `<rt>`の高さぶん依然として広がる**（`test/e2e/app/prj_ruby`で実測：marginTop 11px、
      他行ピッチ約31.5pxに対し約48px）。これは「`<rt>`が1つ前の行/列に食い込むのを防ぐ」ため
      物理的に必要な余白で、削除すると`ss_000.sn:24`本題のバグへ逆戻りするため解消不可能。
      「ルビがある行だけ」を判別して全体を均等に広げる（`max_row`と同時実装の目算だったが、
      `max_row`は本家でも死んでいる属性と判明済みのため道連れの実装機会も無い）か、先頭に
      来るケース自体を折返し計算で避ける、といった対応が無い限りこれ以上は縮まらないため
      凍結継続（詳細はセッション2026-08-10・2026-08-12・2026-08-18のCHANGELOG.md参照）
- [ ] **縦書きで`〈`/`〉`（U+3008/3009）だけ90°回転しない（本家と異なる動作のまま凍結）**：
      2026-08-24、`line_breaking_rules`の本家比較で発覚・原因特定済み。**bluesnovelのコードの
      バグではなく、ブラウザ（Chromium）とHiragino Sans系フォントの組み合わせに起因する外部
      バグ**：`font-feature-settings: "pwid"`（プロポーショナル幅グリフ）を指定すると、
      Chromiumの縦書き自動回転（`text-orientation: mixed`のフォールバック回転）が`〈`/`〉`
      にだけ効かなくなる（`【`/`】`は影響されない）。bluesnovel非依存の最小HTML
      （`writing-mode: vertical-rl`＋`font-family: 'Hiragino Sans', …`のみ）で再現：`ffs`無し／
      `palt`→両方正しく回転、`pwid`→`〈〉`だけ回転しない。Unicode `VerticalOrientation.txt`では
      両コードポイントとも同じ`Tr`分類（unicode.orgのUCDで確認済み）なので分類差ではない。
      本家（skynovel_esm）で起きないのは、テキストをライブDOMとして直接ブラウザに描画せず、
      HTMLをSVGの`<foreignObject>`へ埋め込んで`<img>`として一度デコードしてから
      `canvas.drawImage()`でラスタライズし、pixi.jsのテクスチャにしているため
      （`htm2tx.ts:334-349`。同じChromiumでも「ライブDOMの描画パイプライン」と「SVG data URIを
      imgとして読み込むオフスクリーンのデコード経路」ではテキストシェイピングの内部コードパスが
      異なるらしく、後者はこのバグを踏まない）。本家ギャラリー（GitHub Pages、既定で縦書き・
      `pwid`）で`〈〈`/`〉`が正しく回転することを実機確認済み。bluesnovelはpixi.js非依存でテキストを
      ライブDOM描画する設計上の選択の副作用としてこのブラウザバグを直接踏む。**対応：この挙動を
      受け入れて凍結**（ユーザー判断、2026-08-24）。`line_breaking_rules`の画面にはffsを切り替える
      デフォルト/palt/pwidボタンがあり、触るユーザーには`pwid`由来の副作用と伝わる想定のため、
      「回転は付けない」という現行方針（`TxtLayer.tsx`のコメント参照）を崩してまで対症療法の
      個別回転を入れる必要は無いと判断。本家と異なる動作のまま完了
