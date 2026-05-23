// AI Evolution Tree — Core Data
// Design: Evolutionary Cartography (Phylogenetic Tree × Natural History Museum)
// Branch thickness = influence score, Node size = capability gain, Dashed = stalled theory

export type TheoryCategory =
  | "symbolic"
  | "connectionist"
  | "reinforcement"
  | "transformer"
  | "diffusion"
  | "hybrid";

export type NodeStatus = "active" | "stalled" | "superseded" | "foundational";

export interface BenchmarkPoint {
  year: number;
  benchmark: string;
  score: number;       // 0–100 normalized
  humanBaseline: number; // human performance on same benchmark
}

export interface EvolutionNode {
  id: string;
  label: string;
  year: number;
  category: TheoryCategory;
  status: NodeStatus;
  parentIds: string[];
  description: string;
  keyPaper?: string;
  keyPaperUrl?: string;
  capabilityGain: number;    // 0–100: how much this node raised AI capability
  influenceScore: number;    // 0–100: how influential this theory/model was
  benchmarks: BenchmarkPoint[];
  whyStalledOrSucceeded?: string;
}

export const evolutionNodes: EvolutionNode[] = [
  // ─── SYMBOLIC AI ERA ───────────────────────────────────────────────────────
  {
    id: "logic_theorist",
    label: "Logic Theorist",
    year: 1956,
    category: "symbolic",
    status: "foundational",
    parentIds: [],
    description: "Newell & Simonによる最初の人工知能プログラム。数学的定理を論理規則で証明した。AI研究の出発点。",
    keyPaper: "The Logic Theory Machine (Newell & Simon, 1956)",
    capabilityGain: 15,
    influenceScore: 80,
    benchmarks: [],
    whyStalledOrSucceeded: "記号操作の可能性を示したが、知識の表現と獲得の困難さ（フレーム問題）に直面した。",
  },
  {
    id: "gps",
    label: "General Problem Solver",
    year: 1957,
    category: "symbolic",
    status: "foundational",
    parentIds: ["logic_theorist"],
    description: "手段-目的分析を用いた汎用問題解決プログラム。記号AIの中核的フレームワーク。",
    keyPaper: "Report on a General Problem-Solving Program (Newell & Simon, 1959)",
    capabilityGain: 20,
    influenceScore: 70,
    benchmarks: [],
  },
  {
    id: "expert_systems",
    label: "Expert Systems",
    year: 1970,
    category: "symbolic",
    status: "stalled",
    parentIds: ["gps"],
    description: "MYCIN、DENDRALなどのルールベース専門家システム。特定ドメインでは高性能を発揮したが、知識獲得のボトルネックと汎化の限界に直面した。",
    keyPaper: "MYCIN: Computer-Based Medical Consultations (Shortliffe, 1976)",
    capabilityGain: 35,
    influenceScore: 60,
    benchmarks: [
      { year: 1980, benchmark: "Medical Diagnosis (MYCIN)", score: 65, humanBaseline: 70 },
    ],
    whyStalledOrSucceeded: "知識獲得のボトルネック（知識工学者が必要）と、ルールの組み合わせ爆発により1980年代後半に「AIの冬」を招いた。",
  },
  {
    id: "prolog_logic",
    label: "Logic Programming (Prolog)",
    year: 1972,
    category: "symbolic",
    status: "superseded",
    parentIds: ["gps"],
    description: "述語論理に基づくプログラミングパラダイム。自然言語処理や知識表現に活用されたが、スケーラビリティに限界。",
    capabilityGain: 25,
    influenceScore: 45,
    benchmarks: [],
    whyStalledOrSucceeded: "論理的推論は得意だが、不確実性の扱いと大規模データへのスケーリングが困難だった。",
  },

  // ─── CONNECTIONIST ERA ─────────────────────────────────────────────────────
  {
    id: "perceptron",
    label: "Perceptron",
    year: 1958,
    category: "connectionist",
    status: "foundational",
    parentIds: [],
    description: "Rosenblattが提案した最初のニューラルネットワーク学習モデル。線形分類を実現したが、XOR問題を解けないことが指摘された。",
    keyPaper: "The Perceptron: A Probabilistic Model for Information Storage (Rosenblatt, 1958)",
    capabilityGain: 18,
    influenceScore: 75,
    benchmarks: [],
    whyStalledOrSucceeded: "Minsky & Papertの批判（1969）により研究が停滞。線形分離不可能な問題を解けなかった。",
  },
  {
    id: "backprop",
    label: "Backpropagation",
    year: 1986,
    category: "connectionist",
    status: "foundational",
    parentIds: ["perceptron"],
    description: "Rumelhart, Hinton, Williamsによる誤差逆伝播法の普及。多層ニューラルネットワークの学習を可能にした。",
    keyPaper: "Learning Representations by Back-propagating Errors (Rumelhart et al., 1986)",
    keyPaperUrl: "https://www.nature.com/articles/323533a0",
    capabilityGain: 40,
    influenceScore: 95,
    benchmarks: [],
  },
  {
    id: "cnn_lecun",
    label: "Convolutional Neural Networks",
    year: 1989,
    category: "connectionist",
    status: "active",
    parentIds: ["backprop"],
    description: "LeCunらが開発した畳み込みニューラルネットワーク。画像認識に革命をもたらした。LeNet-5はMNISTで人間レベルを達成。",
    keyPaper: "Handwritten Digit Recognition with a Back-Propagation Network (LeCun et al., 1989)",
    capabilityGain: 55,
    influenceScore: 90,
    benchmarks: [
      { year: 1998, benchmark: "MNIST (Handwriting)", score: 99.3, humanBaseline: 98 },
      { year: 2012, benchmark: "ImageNet Top-5 Error", score: 84.7, humanBaseline: 95 },
    ],
  },
  {
    id: "lstm",
    label: "LSTM (Long Short-Term Memory)",
    year: 1997,
    category: "connectionist",
    status: "superseded",
    parentIds: ["backprop"],
    description: "Hochreiter & Schmidhuberが提案した長期依存を学習できるRNN。系列データ処理の標準となったが、Transformerに置き換えられた。",
    keyPaper: "Long Short-Term Memory (Hochreiter & Schmidhuber, 1997)",
    keyPaperUrl: "https://www.bioinf.jku.at/publications/older/2604.pdf",
    capabilityGain: 50,
    influenceScore: 80,
    benchmarks: [
      { year: 2015, benchmark: "Speech Recognition (WER)", score: 78, humanBaseline: 95 },
    ],
    whyStalledOrSucceeded: "並列計算が困難で長い系列への対応に限界。Transformerのself-attentionに置き換えられた。",
  },

  // ─── DEEP LEARNING REVOLUTION ─────────────────────────────────────────────
  {
    id: "alexnet",
    label: "AlexNet (Deep CNN)",
    year: 2012,
    category: "connectionist",
    status: "foundational",
    parentIds: ["cnn_lecun"],
    description: "Krizhevsky, Sutskever, HintonによるGPU活用の深層CNN。ImageNet 2012で2位に10%以上の差をつけて優勝し、深層学習ブームの火付け役となった。",
    keyPaper: "ImageNet Classification with Deep Convolutional Neural Networks (Krizhevsky et al., 2012)",
    keyPaperUrl: "https://proceedings.neurips.cc/paper/2012/file/c399862d3b9d6b76c8436e924a68c45b-Paper.pdf",
    capabilityGain: 70,
    influenceScore: 98,
    benchmarks: [
      { year: 2012, benchmark: "ImageNet Top-5 Error", score: 84.7, humanBaseline: 95 },
      { year: 2015, benchmark: "ImageNet Top-5 Error", score: 96.4, humanBaseline: 95 },
    ],
  },
  {
    id: "resnet",
    label: "ResNet (Residual Networks)",
    year: 2015,
    category: "connectionist",
    status: "active",
    parentIds: ["alexnet"],
    description: "Heらが提案したスキップ接続による残差学習。152層の深いネットワークを安定して学習可能にし、ImageNetで人間を超えた。",
    keyPaper: "Deep Residual Learning for Image Recognition (He et al., 2015)",
    keyPaperUrl: "https://arxiv.org/abs/1512.03385",
    capabilityGain: 80,
    influenceScore: 92,
    benchmarks: [
      { year: 2015, benchmark: "ImageNet Top-5 Error", score: 96.4, humanBaseline: 95 },
    ],
  },

  // ─── REINFORCEMENT LEARNING ────────────────────────────────────────────────
  {
    id: "q_learning",
    label: "Q-Learning",
    year: 1989,
    category: "reinforcement",
    status: "foundational",
    parentIds: [],
    description: "Watkinsが提案したモデルフリー強化学習アルゴリズム。報酬を最大化する行動価値関数を学習する。",
    keyPaper: "Q-learning (Watkins & Dayan, 1992)",
    capabilityGain: 30,
    influenceScore: 75,
    benchmarks: [],
  },
  {
    id: "dqn",
    label: "Deep Q-Network (DQN)",
    year: 2013,
    category: "reinforcement",
    status: "active",
    parentIds: ["q_learning", "alexnet"],
    description: "DeepMindがAtariゲームで人間を超えた深層強化学習。Q学習とCNNを組み合わせ、生のピクセルから直接ゲームを学習した。",
    keyPaper: "Playing Atari with Deep Reinforcement Learning (Mnih et al., 2013)",
    keyPaperUrl: "https://arxiv.org/abs/1312.5602",
    capabilityGain: 72,
    influenceScore: 88,
    benchmarks: [
      { year: 2015, benchmark: "Atari Games (vs Human)", score: 75, humanBaseline: 100 },
    ],
  },
  {
    id: "alphago",
    label: "AlphaGo / AlphaZero",
    year: 2016,
    category: "reinforcement",
    status: "active",
    parentIds: ["dqn"],
    description: "DeepMindが開発した囲碁AIシステム。モンテカルロ木探索と深層強化学習を組み合わせ、世界チャンピオンを破った。AlphaZeroは自己対戦のみで将棋・チェス・囲碁を制覇。",
    keyPaper: "Mastering the Game of Go with Deep Neural Networks (Silver et al., 2016)",
    keyPaperUrl: "https://www.nature.com/articles/nature16961",
    capabilityGain: 90,
    influenceScore: 95,
    benchmarks: [
      { year: 2016, benchmark: "Go (vs World Champion)", score: 100, humanBaseline: 100 },
    ],
  },
  {
    id: "rlhf",
    label: "RLHF (Reinforcement Learning from Human Feedback)",
    year: 2020,
    category: "reinforcement",
    status: "active",
    parentIds: ["alphago"],
    description: "人間のフィードバックから報酬モデルを学習し、言語モデルを人間の意図に合わせる手法。InstructGPT、ChatGPTの中核技術。",
    keyPaper: "Learning to Summarize from Human Feedback (Stiennon et al., 2020)",
    keyPaperUrl: "https://arxiv.org/abs/2009.01325",
    capabilityGain: 85,
    influenceScore: 92,
    benchmarks: [
      { year: 2022, benchmark: "Human Preference (vs GPT-3)", score: 85, humanBaseline: 100 },
    ],
  },

  // ─── TRANSFORMER REVOLUTION ────────────────────────────────────────────────
  {
    id: "attention",
    label: "Attention Mechanism",
    year: 2015,
    category: "transformer",
    status: "foundational",
    parentIds: ["lstm"],
    description: "Bahdanauらが提案した注意機構。翻訳タスクで系列の任意の位置に注目できるようにした。Transformerの前身。",
    keyPaper: "Neural Machine Translation by Jointly Learning to Align and Translate (Bahdanau et al., 2015)",
    keyPaperUrl: "https://arxiv.org/abs/1409.0473",
    capabilityGain: 60,
    influenceScore: 88,
    benchmarks: [
      { year: 2015, benchmark: "Machine Translation (BLEU)", score: 72, humanBaseline: 90 },
    ],
  },
  {
    id: "transformer",
    label: "Transformer (Attention is All You Need)",
    year: 2017,
    category: "transformer",
    status: "foundational",
    parentIds: ["attention"],
    description: "Vaswaniらが提案したself-attentionのみで構成されたアーキテクチャ。RNNを廃し、並列計算を可能にした。現代AIの基盤。",
    keyPaper: "Attention Is All You Need (Vaswani et al., 2017)",
    keyPaperUrl: "https://arxiv.org/abs/1706.03762",
    capabilityGain: 85,
    influenceScore: 100,
    benchmarks: [
      { year: 2017, benchmark: "Machine Translation (BLEU)", score: 82, humanBaseline: 90 },
    ],
  },
  {
    id: "bert",
    label: "BERT (Bidirectional Encoder)",
    year: 2018,
    category: "transformer",
    status: "superseded",
    parentIds: ["transformer"],
    description: "Devlinらが提案した双方向Transformerの事前学習モデル。マスク言語モデリングで文脈理解を大幅に向上させ、NLPの標準を塗り替えた。",
    keyPaper: "BERT: Pre-training of Deep Bidirectional Transformers (Devlin et al., 2018)",
    keyPaperUrl: "https://arxiv.org/abs/1810.04805",
    capabilityGain: 88,
    influenceScore: 95,
    benchmarks: [
      { year: 2018, benchmark: "GLUE", score: 80, humanBaseline: 87 },
      { year: 2019, benchmark: "SQuAD 2.0 (Reading Comprehension)", score: 83, humanBaseline: 86 },
    ],
  },
  {
    id: "gpt2",
    label: "GPT-2 (Generative Pre-training)",
    year: 2019,
    category: "transformer",
    status: "superseded",
    parentIds: ["transformer"],
    description: "OpenAIが開発した15億パラメータの自己回帰言語モデル。ゼロショット学習の可能性を示した。当初は「危険すぎる」として全モデルの公開を控えた。",
    keyPaper: "Language Models are Unsupervised Multitask Learners (Radford et al., 2019)",
    keyPaperUrl: "https://cdn.openai.com/better-language-models/language_models_are_unsupervised_multitask_learners.pdf",
    capabilityGain: 75,
    influenceScore: 85,
    benchmarks: [
      { year: 2019, benchmark: "Language Modeling (Perplexity)", score: 70, humanBaseline: 90 },
    ],
  },
  {
    id: "gpt3",
    label: "GPT-3 (Few-Shot Learning)",
    year: 2020,
    category: "transformer",
    status: "superseded",
    parentIds: ["gpt2"],
    description: "1750億パラメータの大規模言語モデル。フューショット学習で多様なタスクをこなし、スケーリング則の重要性を実証した。",
    keyPaper: "Language Models are Few-Shot Learners (Brown et al., 2020)",
    keyPaperUrl: "https://arxiv.org/abs/2005.14165",
    capabilityGain: 88,
    influenceScore: 97,
    benchmarks: [
      { year: 2020, benchmark: "SuperGLUE", score: 71, humanBaseline: 89 },
      { year: 2020, benchmark: "HellaSwag", score: 79, humanBaseline: 95 },
    ],
  },
  {
    id: "scaling_laws",
    label: "Scaling Laws",
    year: 2020,
    category: "transformer",
    status: "active",
    parentIds: ["gpt3"],
    description: "KaplanらによるLLMのスケーリング則。モデルサイズ・データ量・計算量の増加が予測可能な形で性能を向上させることを示した。",
    keyPaper: "Scaling Laws for Neural Language Models (Kaplan et al., 2020)",
    keyPaperUrl: "https://arxiv.org/abs/2001.08361",
    capabilityGain: 82,
    influenceScore: 93,
    benchmarks: [],
  },
  {
    id: "instructgpt",
    label: "InstructGPT / ChatGPT",
    year: 2022,
    category: "transformer",
    status: "active",
    parentIds: ["gpt3", "rlhf"],
    description: "RLHFによってGPT-3を人間の指示に従うよう調整したモデル。ChatGPTとして一般公開され、AIの大衆化を牽引した。",
    keyPaper: "Training language models to follow instructions with human feedback (Ouyang et al., 2022)",
    keyPaperUrl: "https://arxiv.org/abs/2203.02155",
    capabilityGain: 90,
    influenceScore: 98,
    benchmarks: [
      { year: 2022, benchmark: "MMLU (General Knowledge)", score: 70, humanBaseline: 89 },
      { year: 2022, benchmark: "Human Preference (vs GPT-3)", score: 85, humanBaseline: 100 },
    ],
  },
  {
    id: "gpt4",
    label: "GPT-4 (Multimodal LLM)",
    year: 2023,
    category: "transformer",
    status: "active",
    parentIds: ["instructgpt", "scaling_laws"],
    description: "OpenAIの多モーダル大規模言語モデル。画像と文章を同時に処理し、司法試験・医師国家試験などで人間レベルを達成した。",
    keyPaper: "GPT-4 Technical Report (OpenAI, 2023)",
    keyPaperUrl: "https://arxiv.org/abs/2303.08774",
    capabilityGain: 95,
    influenceScore: 99,
    benchmarks: [
      { year: 2023, benchmark: "MMLU", score: 86, humanBaseline: 89 },
      { year: 2023, benchmark: "HumanEval (Coding)", score: 67, humanBaseline: 80 },
      { year: 2023, benchmark: "HellaSwag", score: 95, humanBaseline: 95 },
      { year: 2023, benchmark: "GSM8K (Math)", score: 92, humanBaseline: 100 },
    ],
  },
  {
    id: "chain_of_thought",
    label: "Chain-of-Thought Prompting",
    year: 2022,
    category: "transformer",
    status: "active",
    parentIds: ["gpt3"],
    description: "Weiらが提案した思考の連鎖を促すプロンプト手法。中間推論ステップを明示することで、数学・論理タスクの精度を大幅に向上させた。",
    keyPaper: "Chain-of-Thought Prompting Elicits Reasoning in Large Language Models (Wei et al., 2022)",
    keyPaperUrl: "https://arxiv.org/abs/2201.11903",
    capabilityGain: 78,
    influenceScore: 88,
    benchmarks: [
      { year: 2022, benchmark: "GSM8K (Math)", score: 57, humanBaseline: 100 },
    ],
  },
  {
    id: "o1_reasoning",
    label: "o1 / Reasoning Models",
    year: 2024,
    category: "transformer",
    status: "active",
    parentIds: ["gpt4", "chain_of_thought"],
    description: "OpenAIのo1シリーズ。テスト時計算（Test-Time Compute）を増やすことで推論能力を飛躍的に向上。数学オリンピック金メダルレベルを達成。",
    keyPaper: "OpenAI o1 System Card (OpenAI, 2024)",
    keyPaperUrl: "https://openai.com/research/learning-to-reason-with-llms",
    capabilityGain: 97,
    influenceScore: 97,
    benchmarks: [
      { year: 2024, benchmark: "GPQA Diamond (Science)", score: 78, humanBaseline: 69 },
      { year: 2024, benchmark: "AIME 2024 (Math Competition)", score: 83, humanBaseline: 100 },
      { year: 2024, benchmark: "HumanEval (Coding)", score: 92, humanBaseline: 80 },
    ],
  },

  // ─── DIFFUSION MODELS ─────────────────────────────────────────────────────
  {
    id: "vae",
    label: "Variational Autoencoder (VAE)",
    year: 2013,
    category: "diffusion",
    status: "superseded",
    parentIds: ["backprop"],
    description: "Kingma & Wellingが提案した変分自己符号化器。潜在空間から画像を生成する初期の生成モデル。",
    keyPaper: "Auto-Encoding Variational Bayes (Kingma & Welling, 2013)",
    keyPaperUrl: "https://arxiv.org/abs/1312.6114",
    capabilityGain: 40,
    influenceScore: 70,
    benchmarks: [],
  },
  {
    id: "gan",
    label: "GAN (Generative Adversarial Network)",
    year: 2014,
    category: "diffusion",
    status: "superseded",
    parentIds: ["backprop"],
    description: "Goodfellowらが提案した生成的敵対ネットワーク。生成器と識別器を競わせることで高品質な画像生成を実現した。",
    keyPaper: "Generative Adversarial Nets (Goodfellow et al., 2014)",
    keyPaperUrl: "https://arxiv.org/abs/1406.2661",
    capabilityGain: 65,
    influenceScore: 88,
    benchmarks: [
      { year: 2018, benchmark: "Image Generation (FID)", score: 60, humanBaseline: 100 },
    ],
    whyStalledOrSucceeded: "訓練の不安定性（モード崩壊）と評価の難しさが課題。拡散モデルに品質面で追い越された。",
  },
  {
    id: "diffusion",
    label: "Diffusion Models (DDPM)",
    year: 2020,
    category: "diffusion",
    status: "active",
    parentIds: ["vae"],
    description: "Ho et al.が提案したノイズ除去拡散確率モデル。GANを超える画像品質を達成し、Stable Diffusion、DALL-E 2の基盤となった。",
    keyPaper: "Denoising Diffusion Probabilistic Models (Ho et al., 2020)",
    keyPaperUrl: "https://arxiv.org/abs/2006.11239",
    capabilityGain: 85,
    influenceScore: 92,
    benchmarks: [
      { year: 2021, benchmark: "Image Generation (FID)", score: 88, humanBaseline: 100 },
      { year: 2022, benchmark: "Text-to-Image Quality", score: 90, humanBaseline: 100 },
    ],
  },
  {
    id: "latent_diffusion",
    label: "Latent Diffusion / Stable Diffusion",
    year: 2022,
    category: "diffusion",
    status: "active",
    parentIds: ["diffusion", "transformer"],
    description: "Rombachらが提案した潜在空間での拡散モデル。計算コストを大幅に削減しながら高品質な画像生成を実現。Stable Diffusionとして一般公開された。",
    keyPaper: "High-Resolution Image Synthesis with Latent Diffusion Models (Rombach et al., 2022)",
    keyPaperUrl: "https://arxiv.org/abs/2112.10752",
    capabilityGain: 88,
    influenceScore: 90,
    benchmarks: [
      { year: 2022, benchmark: "Text-to-Image Quality", score: 92, humanBaseline: 100 },
    ],
  },

  // ─── HYBRID / MULTIMODAL ──────────────────────────────────────────────────
  {
    id: "clip",
    label: "CLIP (Contrastive Language-Image)",
    year: 2021,
    category: "hybrid",
    status: "active",
    parentIds: ["transformer", "resnet"],
    description: "OpenAIが提案した画像とテキストを共通空間に埋め込むモデル。ゼロショット画像分類で従来の教師あり学習に匹敵する性能を達成。",
    keyPaper: "Learning Transferable Visual Models From Natural Language Supervision (Radford et al., 2021)",
    keyPaperUrl: "https://arxiv.org/abs/2103.00020",
    capabilityGain: 82,
    influenceScore: 90,
    benchmarks: [
      { year: 2021, benchmark: "ImageNet Zero-Shot", score: 76, humanBaseline: 95 },
    ],
  },
  {
    id: "alphafold",
    label: "AlphaFold 2",
    year: 2021,
    category: "hybrid",
    status: "active",
    parentIds: ["transformer", "resnet"],
    description: "DeepMindが開発したタンパク質構造予測AI。50年来の未解決問題を解決し、生物学・創薬に革命をもたらした。",
    keyPaper: "Highly accurate protein structure prediction with AlphaFold (Jumper et al., 2021)",
    keyPaperUrl: "https://www.nature.com/articles/s41586-021-03819-2",
    capabilityGain: 98,
    influenceScore: 98,
    benchmarks: [
      { year: 2021, benchmark: "CASP14 (Protein Structure)", score: 92, humanBaseline: 70 },
    ],
  },
  {
    id: "moe",
    label: "Mixture of Experts (MoE)",
    year: 2022,
    category: "hybrid",
    status: "active",
    parentIds: ["gpt3", "scaling_laws"],
    description: "スパースな専門家モジュールを組み合わせたアーキテクチャ。Mixtral、GPT-4（推定）、DeepSeekなどに採用され、計算効率と性能を両立した。",
    keyPaper: "Outrageously Large Neural Networks: The Sparsely-Gated MoE Layer (Shazeer et al., 2017)",
    keyPaperUrl: "https://arxiv.org/abs/1701.06538",
    capabilityGain: 88,
    influenceScore: 85,
    benchmarks: [
      { year: 2024, benchmark: "MMLU (Mixtral 8x7B)", score: 70, humanBaseline: 89 },
    ],
  },
  {
    id: "deepseek_r1",
    label: "DeepSeek-R1 / Open Reasoning",
    year: 2025,
    category: "hybrid",
    status: "active",
    parentIds: ["o1_reasoning", "moe"],
    description: "DeepSeekが開発したオープンソース推論モデル。強化学習のみでo1レベルの推論能力を達成し、オープンソースAIの可能性を示した。",
    keyPaper: "DeepSeek-R1: Incentivizing Reasoning Capability in LLMs via RL (DeepSeek, 2025)",
    keyPaperUrl: "https://arxiv.org/abs/2501.12948",
    capabilityGain: 96,
    influenceScore: 93,
    benchmarks: [
      { year: 2025, benchmark: "AIME 2024 (Math)", score: 79, humanBaseline: 100 },
      { year: 2025, benchmark: "GPQA Diamond", score: 71, humanBaseline: 69 },
      { year: 2025, benchmark: "Codeforces (Coding)", score: 96, humanBaseline: 100 },
    ],
  },
];

// ─── BENCHMARK HISTORY ────────────────────────────────────────────────────────
// Key benchmarks and their saturation over time
export interface BenchmarkHistory {
  id: string;
  name: string;
  domain: string;
  introduced: number;
  saturated?: number; // year when AI surpassed human baseline
  dataPoints: { year: number; score: number; model: string }[];
  humanBaseline: number;
}

export const benchmarkHistories: BenchmarkHistory[] = [
  {
    id: "mnist",
    name: "MNIST (Handwriting)",
    domain: "Vision",
    introduced: 1998,
    saturated: 2003,
    humanBaseline: 98,
    dataPoints: [
      { year: 1998, score: 88, model: "LeNet-5" },
      { year: 2003, score: 99.3, model: "CNN" },
      { year: 2012, score: 99.7, model: "Deep CNN" },
    ],
  },
  {
    id: "imagenet",
    name: "ImageNet (Top-5)",
    domain: "Vision",
    introduced: 2010,
    saturated: 2015,
    humanBaseline: 95,
    dataPoints: [
      { year: 2010, score: 72, model: "Traditional CV" },
      { year: 2012, score: 84.7, model: "AlexNet" },
      { year: 2014, score: 93.3, model: "VGGNet" },
      { year: 2015, score: 96.4, model: "ResNet" },
      { year: 2017, score: 97.7, model: "SENet" },
    ],
  },
  {
    id: "glue",
    name: "GLUE (Language Understanding)",
    domain: "Language",
    introduced: 2018,
    saturated: 2019,
    humanBaseline: 87,
    dataPoints: [
      { year: 2018, score: 70, model: "BERT" },
      { year: 2019, score: 88, model: "RoBERTa" },
      { year: 2020, score: 90, model: "ALBERT" },
    ],
  },
  {
    id: "superglue",
    name: "SuperGLUE",
    domain: "Language",
    introduced: 2019,
    saturated: 2021,
    humanBaseline: 89,
    dataPoints: [
      { year: 2019, score: 71, model: "BERT" },
      { year: 2020, score: 76, model: "T5" },
      { year: 2021, score: 90, model: "ST-MoE" },
    ],
  },
  {
    id: "hellaswag",
    name: "HellaSwag (Commonsense)",
    domain: "Language",
    introduced: 2019,
    saturated: 2023,
    humanBaseline: 95,
    dataPoints: [
      { year: 2019, score: 48, model: "BERT" },
      { year: 2020, score: 79, model: "GPT-3" },
      { year: 2022, score: 85, model: "PaLM" },
      { year: 2023, score: 95, model: "GPT-4" },
    ],
  },
  {
    id: "mmlu",
    name: "MMLU (General Knowledge)",
    domain: "Language",
    introduced: 2020,
    saturated: 2024,
    humanBaseline: 89,
    dataPoints: [
      { year: 2020, score: 43, model: "GPT-3" },
      { year: 2022, score: 70, model: "InstructGPT" },
      { year: 2023, score: 86, model: "GPT-4" },
      { year: 2024, score: 90, model: "Claude 3 Opus" },
    ],
  },
  {
    id: "gsm8k",
    name: "GSM8K (Math Word Problems)",
    domain: "Reasoning",
    introduced: 2021,
    saturated: 2023,
    humanBaseline: 100,
    dataPoints: [
      { year: 2021, score: 35, model: "GPT-3" },
      { year: 2022, score: 57, model: "Chain-of-Thought" },
      { year: 2023, score: 92, model: "GPT-4" },
      { year: 2024, score: 97, model: "o1" },
    ],
  },
  {
    id: "humaneval",
    name: "HumanEval (Coding)",
    domain: "Coding",
    introduced: 2021,
    saturated: 2024,
    humanBaseline: 80,
    dataPoints: [
      { year: 2021, score: 28, model: "Codex" },
      { year: 2023, score: 67, model: "GPT-4" },
      { year: 2024, score: 92, model: "o1" },
    ],
  },
  {
    id: "aime",
    name: "AIME (Math Competition)",
    domain: "Reasoning",
    introduced: 2024,
    humanBaseline: 100,
    dataPoints: [
      { year: 2024, score: 12, model: "GPT-4" },
      { year: 2024, score: 83, model: "o1" },
      { year: 2025, score: 79, model: "DeepSeek-R1" },
    ],
  },
  {
    id: "gpqa",
    name: "GPQA Diamond (Science PhD)",
    domain: "Reasoning",
    introduced: 2023,
    saturated: 2024,
    humanBaseline: 69,
    dataPoints: [
      { year: 2023, score: 35, model: "GPT-4" },
      { year: 2024, score: 78, model: "o1" },
      { year: 2025, score: 71, model: "DeepSeek-R1" },
    ],
  },
];

export const categoryColors: Record<TheoryCategory, string> = {
  symbolic: "#8B6914",       // warm amber
  connectionist: "#2D6A4F",  // forest green
  reinforcement: "#1B4F72",  // deep navy
  transformer: "#6B2D8B",    // deep violet
  diffusion: "#8B2252",      // burgundy
  hybrid: "#1A5276",         // steel blue
};

export const categoryLabels: Record<TheoryCategory, string> = {
  symbolic: "記号AI",
  connectionist: "コネクショニスト",
  reinforcement: "強化学習",
  transformer: "Transformer系",
  diffusion: "生成モデル",
  hybrid: "ハイブリッド・マルチモーダル",
};

export const statusLabels: Record<NodeStatus, string> = {
  active: "現役",
  stalled: "失速",
  superseded: "後継に置換",
  foundational: "基礎理論",
};
