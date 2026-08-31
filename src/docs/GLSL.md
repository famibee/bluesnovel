# 使えそうな GLSL
	(重) ... 全画面にするとPCファンが動く・処理落ちする

- 加工系
	- rain
		- ★ 窓ガラスの雨 → sn_gallery `prj/add_fx/mat/ext_fx_rain_window.sn`（`[def_fx name=rain_window]`）で
		サンプル化済み（分家本体には置かない）。Heartfelt / Raining Blood / codrops を参考にした
		MIT 再実装。稲光・ホワイトアウトは外した。`color=` で血の雨アレンジ
		- Rain shader - 01 https://www.shadertoy.com/view/M3GfDV
			> 弱い雨
		- The Drive Home https://www.shadertoy.com/view/MdfBRX
			> 小雨の中、運転中の車
			-> 雨なしで運転中の車イメージ版・昼版も欲しくなる。夕方版は[add_filter]担当か
		- Heartfelt https://www.shadertoy.com/view/ltffzl
			> ガラス越しの雨、稲光付き
		- Rain drops combined https://www.shadertoy.com/view/llfczH
			> 窓ガラスの雨粒、よく見るとちょっと変
		- Raining Blood https://www.shadertoy.com/view/tdG3Rw
			> 赤い雨と稲光。ホラーぽさ
		- water droplets https://www.shadertoy.com/view/tddSD7
			> ガラス越しの水滴、雨というよりごくわずかな飛沫のような
		- Banished https://www.shadertoy.com/view/XsX3DB
			> 簡易な雨と濡れる犬小屋
	- snow
		- Simple Snow https://www.shadertoy.com/view/XtBfzw
			> シンプルな雪。軽い
		- Snow is falling https://www.shadertoy.com/view/4lfcz4
			> ふわっとした降雪
	- Fireworks
		- Fireworks - AT (sound) https://www.shadertoy.com/view/WtdBRj
			> 花火連発、軽い
		- (重) firework1 https://www.shadertoy.com/view/tfXSWr
			> 大玉一個ずつ
		- Fireworks (atz) https://www.shadertoy.com/view/wslcWN
			> 花火連発、バリエーションあり
		- (重) Fireworks Performance https://www.shadertoy.com/view/tfXcz8
			> なかなか本物っぽい
	- other
		- (重) 301's Fire Shader - Remix 2 https://www.shadertoy.com/view/MtcGD7
			> 燃え盛る炎
		- (重) REALISTIC SUB-PIXEL OLD CRT :::. https://www.shadertoy.com/view/ms2fDV
			> ブラウン管テレビ風
		- (激重) https://www.shadertoy.com/view/wdGSzw
			> 前出。砂と人物の動き。粒を大きくして減らしたら行けるかも。
		- Light Spectrum Therapy https://www.shadertoy.com/view/fsVBR1
			> 顔を避けて通り過ぎる光の流れ
		- 
			> 
		- 
			> 
		- 
			> 
		- 
			> 
		- 
			> 
		- 
			> 

- 背景系
	- rain
		- Like seawater or a mud pit https://www.shadertoy.com/view/fcGSW1
			> 海面
		- Base warp fBM https://www.shadertoy.com/view/tdG3Rd
			> マーブル模様
		- Digital Rain https://www.shadertoy.com/view/ldccW4
			> マトリックス
		- Matrix Code https://www.shadertoy.com/view/lsVBWy
			> マトリックス、はっきり文字が見えるタイプ
		- (重) Inside the Matrix https://www.shadertoy.com/view/4t3BWl
			> マトリックス風の雨の中を進む
		- [SH17A] Matrix rain https://www.shadertoy.com/view/ldjBW1
			> マトリックス風の部屋
		- Matrix Rain Shader https://www.shadertoy.com/view/lsXSDn
			> マトリックス風に画像やムービー表示？
		- (重) rain water ripple https://www.shadertoy.com/view/Mt33DH
			> 水面に雨
		- (重) [SH17A] Lake Drops https://www.shadertoy.com/view/MdjBDh
			> 斜めに見下ろす水面に水滴
	- snow
		- Simple parallax snow https://www.shadertoy.com/view/MdXcW8
			> シンプルな雪。軽い
		- (重) Just snow https://www.shadertoy.com/view/ldsGDn
			> 少ない雪
		- https://codepen.io/UstymUkhman/pen/jpZGZW
			> 多い雪、フルスクリーン不可サイト
		- Snowy https://www.shadertoy.com/view/4dl3R4
			> 横殴りの雪
		- (重) Snow (as shown in sweden) https://www.shadertoy.com/view/Mdt3Df
			> 軽すぎてちょっと浮く降雪
		- (重) Falling Snowflakes https://www.shadertoy.com/view/3sSXz1
			> 降りながら成長する結晶
		- (重) Snowy Woods https://www.shadertoy.com/view/ls2GDw
			> 雪の森を歩く
		- (重) Tamby's Snowflakes https://www.shadertoy.com/view/Ml3XWX
			> イメージ降雪、ポロポロと記号的な雪が降り注ぐ
		- (やや重) Snow-Jac https://www.shadertoy.com/view/4cXGDs
			> より自然な降雪
		- Frozen Waterfalls https://www.shadertoy.com/view/7tySDW
			> シャーベット水のシミュレーション
	- Fireworks
		- (重) [SH17A] Fireworks https://www.shadertoy.com/view/ldBfzw
			> ビル街の花火
		- (重) Lakeside https://www.shadertoy.com/view/MtsBRH
			> 湖面の大花火大会
		- (重) Happy Diwali 2019 https://www.shadertoy.com/view/Ws3SRS
			> 花火連発
		- (重) fireworks2 https://www.shadertoy.com/view/wdlGW4
			> 帯状連発
		- (重) Heart_Fireworks_remake https://www.shadertoy.com/view/wssfzr
			> ハートマーク花火
		- Fireworks Heart https://www.shadertoy.com/view/cdjSzK
			> ハートマーク花火
		- (重) firework2 https://www.shadertoy.com/view/wffSWr
			> 一箇所からほとばしるような
		- (重) Happy 4th 🧨 https://www.shadertoy.com/view/l3KSzy
			> ぼやっとした連発
		- (重) Happy 2026 https://www.shadertoy.com/view/wcVBRV
			> キラキライメージ
		- (重) Happy 2020! https://www.shadertoy.com/view/tt3GRN
			> ドット絵
		- (重) Fireworks 2016 https://www.shadertoy.com/view/lscGRl
			> 
		- (重) Deterministic Fireworks https://www.shadertoy.com/view/4fdGDl
			> ドット表現だが重い
		- (重) City Fireworks https://www.shadertoy.com/view/f3XSzH
			> イメージ、海沿い都市の花火大会、ドット表現だが重い
	- other
		- Simple magic glitters https://www.shadertoy.com/view/XtVBWV
			> 紙吹雪
		- (重) The Universe Within https://www.shadertoy.com/view/lscczl
			> 星空を進む。星座のように線がたくさん
		- Diffraction waves https://www.shadertoy.com/view/4t3GWX
			> RGBのたゆたうオビ
		- Satellite's eye https://www.shadertoy.com/view/4tX3Ws
			> 衛星軌道から見る地形
		- (重) Alien Waterworld https://www.shadertoy.com/view/WtXyW4
			> 謎の惑星の地形
		- (重) Rainbow Road [249 Chars] https://www.shadertoy.com/view/NlGfzz
			> 波打つ虹色ネオンの階段を昇っていく
		- (重) Dawn at a distant world II https://www.shadertoy.com/view/dltyWr
			> 月面
		- drain vortex marching-less -golf https://www.shadertoy.com/view/mslXWM
			> 白黒のすべてを飲み込む渦
		- dFdx terrain gen https://www.shadertoy.com/view/MtGfWK
			> 地形をゼビウス的にスクロール
		- Stars [173 Chars] https://www.shadertoy.com/view/7lyBRR
			> カラフルな光がゆったり斜めに降る
		- Bioscanner https://www.shadertoy.com/view/7ltXWf
			> 白黒、波形を分析するような
		- rings on water from rain https://www.shadertoy.com/view/XsKSRm
			> 水面に雨の波紋。ぼやけ気味だが軽い
		- Overcast https://www.shadertoy.com/view/XcKyzV
			> 雲から差し込む光
		- Oceanic Storm https://www.shadertoy.com/view/3lffWX
			> 白黒、荒天の海、ガラス越し
		- Hyperbolic billiard https://www.shadertoy.com/view/WXdSzl
			> 万華鏡
		- Sine Puke II https://www.shadertoy.com/view/4dXXzN
			> 油面みたいな
		- electric grid https://www.shadertoy.com/view/MdKyzw
			> 緑色のマス目、黒円がたくさんうごめく
		- Greek Sunset https://www.shadertoy.com/view/WsdXWr
			> 山越しの夕焼け
		- Shader try of Star of Bethlehem https://www.shadertoy.com/view/wldcWr
			> 雨というよりドットの粉雪
		- (重) AURORA https://www.shadertoy.com/view/ttScDc
			> オーロラ、雪がない
		- 
			> 
		- 
			> 
		- 
			> 
		- 
			> 
