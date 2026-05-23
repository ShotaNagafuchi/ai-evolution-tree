# AI Evolution Tree — デザインアイデア

## 背景・コンセプト

AIの能力進化を「理論・アーキテクチャの系統」と「ベンチマーク上昇の定量データ」を組み合わせて可視化するサイト。
単なる年表ではなく、「どの理論系統がどれだけ能力を引き上げたか、どの理論では伸び悩んだか」を一目で把握できる進化系統図を目指す。

---

<response>
<text>

## アイデア A: 「Scientific Dark Atlas」

**Design Movement**: ダークサイエンティフィック / Scientific Journal × Dark Mode

**Core Principles**:
1. 知識の重みを感じさせる「深い紺黒」ベース。情報密度が高くても圧迫感を与えない。
2. データ可視化を主役に据え、UIは黒子に徹する。チャートとグラフが「作品」として浮き上がる。
3. タイポグラフィで情報階層を厳格に制御。見出しは細身のモノスペース、本文はセリフ体。
4. インタラクションは「発見の喜び」を演出。ノードをホバーすると関連情報が展開する。

**Color Philosophy**:
- 背景: `oklch(0.10 0.02 260)` — 深い宇宙紺
- プライマリアクセント: `oklch(0.75 0.18 200)` — サイアン（電子回路のイメージ）
- 成功/上昇: `oklch(0.72 0.17 145)` — エメラルドグリーン
- 失速/停滞: `oklch(0.55 0.12 30)` — アンバー
- テキスト: `oklch(0.88 0.01 260)` — 冷たいオフホワイト

**Layout Paradigm**:
- 左サイドバー（理論系統ツリーナビ） + 右メインエリア（系統図 + ベンチマーク折れ線グラフ）
- 非対称2カラム。左20%、右80%。

**Signature Elements**:
1. SVGで描画されたフォースグラフ系統図。ノードは年代別に色分け。
2. 各理論ノードにホバーすると「能力上昇幅」のミニグラフがポップアップ。
3. 背景に微細なグリッドパターン（graph paper風）。

**Interaction Philosophy**:
- クリック: ノード詳細パネルがスライドイン
- フィルタ: 理論カテゴリ（Symbolic AI / Connectionist / Reinforcement / Transformer系）でハイライト
- タイムスライダー: 年代を絞り込んで系統図が動的に変化

**Animation**:
- ノード出現: `scale(0.9) opacity(0)` → `scale(1) opacity(1)` 200ms ease-out
- エッジ描画: SVG strokeDashoffset アニメーション 400ms
- パネルスライドイン: translateX(-100%) → translateX(0) 250ms cubic-bezier(0.23,1,0.32,1)

**Typography System**:
- 見出し: `JetBrains Mono` (モノスペース、技術感)
- 本文: `Source Serif 4` (可読性の高いセリフ体)
- データラベル: `JetBrains Mono` 小サイズ

</text>
<probability>0.07</probability>
</response>

---

<response>
<text>

## アイデア B: 「Evolutionary Cartography」

**Design Movement**: 科学的地図製作 × ナチュラルヒストリー博物館

**Core Principles**:
1. 生物の進化系統図（phylogenetic tree）の美学を借用。枝分かれが有機的に見える。
2. クリーム色の羊皮紙風背景に、インク描きのような線とノード。
3. 能力上昇は「高度計」のようなゲージで表現。失速した理論は枯れ枝として描画。
4. 学術論文の図表を思わせる厳密な情報設計。

**Color Philosophy**:
- 背景: `oklch(0.97 0.02 85)` — 温かいクリーム
- 主線色: `oklch(0.30 0.05 50)` — 深いセピア
- アクセント: `oklch(0.55 0.15 200)` — スレートブルー（重要ノード）
- 失速枝: `oklch(0.65 0.08 50)` — 薄いセピア
- 能力上昇: `oklch(0.50 0.18 145)` — フォレストグリーン

**Layout Paradigm**:
- 全画面スクロール型。縦軸=時間（上が古い、下が新しい）、横軸=理論系統の分岐。
- 上部にスティッキーヘッダー（フィルタ・検索）。
- 右下に「現在地」ミニマップ。

**Signature Elements**:
1. 枝の太さ = その理論系統の「影響力スコア」
2. ノードサイズ = ベンチマーク上昇幅
3. 枯れ枝（失速理論）は点線で表現

**Interaction Philosophy**:
- パン＆ズーム（d3-zoom）で系統図を自由に探索
- ノードクリックで詳細カード表示（論文リンク、ベンチマーク推移グラフ）
- 「比較モード」: 2つの理論系統を選んで能力上昇を並べて比較

**Animation**:
- 初期ロード: 根本から枝が伸びるアニメーション（SVG path length）
- ズーム: d3 smooth zoom transition 300ms
- カード展開: scale(0.95) opacity(0) → scale(1) opacity(1) 200ms

**Typography System**:
- 見出し: `Playfair Display` (エレガントなセリフ体)
- 本文: `Lora` (読みやすいセリフ体)
- データ: `IBM Plex Mono` (モノスペース)

</text>
<probability>0.09</probability>
</response>

---

<response>
<text>

## アイデア C: 「Terminal Intelligence」

**Design Movement**: モダンターミナル × データジャーナリズム

**Core Principles**:
1. ターミナル・コードエディタの美学をUIに昇華。プロフェッショナルな技術感。
2. 情報は「コマンド出力」のように段階的に表示される。
3. カラーコーディングで理論系統を即座に識別できる。
4. 能力上昇は折れ線グラフ（recharts）で精密に表示。

**Color Philosophy**:
- 背景: `oklch(0.13 0.015 270)` — ほぼ黒のネイビー
- ターミナルグリーン: `oklch(0.75 0.20 145)` — 鮮やかなグリーン（主要アクセント）
- Transformer系: `oklch(0.70 0.18 260)` — バイオレット
- Symbolic AI系: `oklch(0.72 0.15 30)` — アンバー
- Connectionist系: `oklch(0.68 0.18 200)` — サイアン
- RL系: `oklch(0.72 0.17 340)` — ピンク

**Layout Paradigm**:
- 3ペイン構成: 左ツリーナビ（20%）、中央系統図（50%）、右詳細パネル（30%）
- 各ペインはリサイズ可能（react-resizable-panels）

**Signature Elements**:
1. 系統図のノードはターミナルのプロンプト記号（`>`）で表現
2. 能力スコアはASCIIバーグラフ風に表示
3. ページ上部に「ライブ更新中」を示すブリンクカーソル

**Interaction Philosophy**:
- キーボードナビゲーション対応（j/k で上下移動）
- コマンドパレット（Cmd+K）で理論・モデルを検索
- 「diff モード」: 2つの理論系統の能力差分を可視化

**Animation**:
- テキスト入力アニメーション（タイピング効果）でノードラベル表示
- ペイン切り替え: slide + fade 200ms
- グラフ描画: 左から右へ線が伸びる 600ms

**Typography System**:
- 全体: `JetBrains Mono` (モノスペース統一)
- 見出しのみ: `Space Grotesk` (幾何学的サンセリフ)
- データ: `JetBrains Mono`

</text>
<probability>0.06</probability>
</response>

---

## 選択: アイデア B「Evolutionary Cartography」

生物の進化系統図の美学を借用し、AI理論の分岐・能力上昇・失速を有機的な樹形図として表現する。
クリーム×セピアの学術的な色調で、「発見の旅」を演出する。
枝の太さ=影響力、ノードサイズ=能力上昇幅、枯れ枝=失速理論という視覚的メタファーが直感的。
