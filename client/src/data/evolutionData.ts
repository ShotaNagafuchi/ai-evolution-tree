// evolutionData.ts
// AI Breakthrough Evolution Data

export type ResearchLane =
  | "algorithm"
  | "architecture"
  | "hardware"
  | "data"
  | "optimization"
  | "alignment"
  | "evaluation";

export type EraId =
  | "symbolic"
  | "first_winter"
  | "connectionist"
  | "second_winter"
  | "statistical"
  | "deep_learning"
  | "transformer"
  | "foundation"
  | "reasoning";

export type NodeStatus =
  | "active"
  | "foundational"
  | "stalled"
  | "superseded";

export interface CapabilityMetric {
  domain: string;
  before: number;
  after: number;
  benchmark?: string;
}

export interface BreakthroughNode {
  id: string;
  label: string;
  shortLabel: string;
  year: number;
  lane: ResearchLane;
  era: EraId;
  status: NodeStatus;
  parentIds: string[];
  tagline: string;
  description: string;
  mechanism: string;
  inspiration: string;
  whyItWorked?: string;
  whyItFailed?: string;
  capabilityGain: number;
  influenceScore: number;
  computeCost: number;
  capabilityMetrics: CapabilityMetric[];
  keyPaper?: string;
  keyPaperUrl?: string;
  authors?: string;
  institution?: string;
  tags: string[];
}

export interface Era {
  id: EraId;
  label: string;
  yearStart: number;
  yearEnd: number;
  description: string;
  color: string;
}

export const LANE_COLORS: Record<ResearchLane, string> = {
  algorithm:    "#1B4F72",
  architecture: "#196F3D",
  hardware:     "#9A7D0A",
  data:         "#6C3483",
  optimization: "#1A5276",
  alignment:    "#922B21",
  evaluation:   "#566573",
};

export const laneLabels: Record<ResearchLane, string> = {
  algorithm:    "Algorithm",
  architecture: "Architecture",
  hardware:     "Hardware",
  data:         "Data / Scale",
  optimization: "Optimization",
  alignment:    "Alignment",
  evaluation:   "Evaluation",
};

export const statusLabels: Record<NodeStatus, string> = {
  active:       "Active",
  foundational: "Foundational",
  stalled:      "Stalled",
  superseded:   "Superseded",
};

export const eras: Era[] = [
  {
    id: "symbolic",
    label: "Symbolic AI",
    yearStart: 1956,
    yearEnd: 1973,
    description: "Rule-based AI. Attempted to realize intelligence by encoding human knowledge as logical rules.",
    color: "#D5D8DC",
  },
  {
    id: "first_winter",
    label: "1st AI Winter",
    yearStart: 1974,
    yearEnd: 1979,
    description: "Lighthill Report criticism and funding cuts. Combinatorial explosion problems were exposed.",
    color: "#AED6F1",
  },
  {
    id: "connectionist",
    label: "Connectionist Revival",
    yearStart: 1980,
    yearEnd: 1986,
    description: "Rediscovery of backpropagation and revival of neural network research.",
    color: "#A9DFBF",
  },
  {
    id: "second_winter",
    label: "2nd AI Winter",
    yearStart: 1987,
    yearEnd: 1992,
    description: "Expert system limitations exposed, LISP machine market collapse.",
    color: "#AED6F1",
  },
  {
    id: "statistical",
    label: "Statistical ML Era",
    yearStart: 1993,
    yearEnd: 2011,
    description: "Mathematically rigorous methods like SVMs and kernel methods became mainstream.",
    color: "#FAD7A0",
  },
  {
    id: "deep_learning",
    label: "Deep Learning Revolution",
    yearStart: 2012,
    yearEnd: 2016,
    description: "AlexNet's ImageNet win triggered explosive adoption of GPU + big data + deep nets.",
    color: "#F9E79F",
  },
  {
    id: "transformer",
    label: "Transformer Era",
    yearStart: 2017,
    yearEnd: 2019,
    description: "Attention Is All You Need unified language, vision, and audio. BERT and GPT established pretraining paradigm.",
    color: "#D2B4DE",
  },
  {
    id: "foundation",
    label: "Foundation Model Era",
    yearStart: 2020,
    yearEnd: 2022,
    description: "Massive models like GPT-3. Scaling laws showed predictable capability improvements.",
    color: "#A9CCE3",
  },
  {
    id: "reasoning",
    label: "Reasoning & Agent Era",
    yearStart: 2023,
    yearEnd: 2026,
    description: "Chain-of-Thought, RLHF, and test-time compute dramatically improved reasoning capabilities.",
    color: "#A9DFBF",
  },
];

export const nodes: BreakthroughNode[] = [
  {
    id: "logic_theorist",
    label: "Logic Theorist",
    shortLabel: "Logic Theorist",
    year: 1956,
    lane: "algorithm",
    era: "symbolic",
    status: "foundational",
    parentIds: [],
    tagline: "World's first AI program - automated theorem proving",
    description: "Developed by Newell, Simon, and Shaw. Automatically proved 38 theorems from Whitehead and Russell's Principia Mathematica.",
    mechanism: "Symbolic reasoning engine. Represents mathematical propositions as symbols and searches for proofs using heuristic search (means-ends analysis). Implemented in Information Processing Language (IPL).",
    inspiration: "Turing's computation theory and cognitive science observations of human problem-solving. Newell wanted to test the hypothesis that 'thinking is symbol manipulation'.",
    whyItWorked: "Symbolic manipulation is effective in well-defined domains like formal logic. The proof space is finite and searchable.",
    whyItFailed: "Cannot handle real-world ambiguity or uncertainty. Knowledge must be manually encoded by humans and does not scale.",
    capabilityGain: 30,
    influenceScore: 85,
    computeCost: 5,
    capabilityMetrics: [
      { domain: "Theorem Proving", before: 0, after: 40, benchmark: "Principia Mathematica proof rate" }
    ],
    keyPaper: "Logic Theory Machine (1956)",
    authors: "Newell, Simon, Shaw",
    institution: "Carnegie Mellon / RAND",
    tags: ["Symbolic AI", "Search", "Theorem Proving", "Heuristics"],
  },
  {
    id: "perceptron",
    label: "Perceptron",
    shortLabel: "Perceptron",
    year: 1958,
    lane: "architecture",
    era: "symbolic",
    status: "foundational",
    parentIds: [],
    tagline: "Origin of neural networks - mimicking biological neurons",
    description: "Single-layer neural network proposed by Rosenblatt. The first learnable model that passes a weighted sum of inputs through a threshold function.",
    mechanism: "Multiplies each input x by weight w, sums them, and outputs 1 if the sum exceeds threshold theta. Updates weights using the perceptron learning rule (w += eta*x*y) when misclassified. Guaranteed convergence for linearly separable problems.",
    inspiration: "McCulloch-Pitts neuron model (1943) and Hebb's learning rule (1949). Biological inspiration: 'electronic circuits can realize brain neural circuits'.",
    whyItWorked: "First machine that could automatically learn linearly separable pattern recognition problems.",
    whyItFailed: "Minsky and Papert's 'Perceptrons' (1969) proved it cannot solve XOR. Single layer cannot handle nonlinear problems.",
    capabilityGain: 35,
    influenceScore: 90,
    computeCost: 5,
    capabilityMetrics: [
      { domain: "Linear Classification", before: 0, after: 70, benchmark: "Linearly separable pattern recognition" }
    ],
    keyPaper: "The Perceptron: A Probabilistic Model (1958)",
    keyPaperUrl: "https://psycnet.apa.org/record/1959-09865-001",
    authors: "Frank Rosenblatt",
    institution: "Cornell Aeronautical Laboratory",
    tags: ["Neural Net", "Learning Rule", "Pattern Recognition", "Bio-inspired"],
  },
  {
    id: "expert_systems",
    label: "Expert Systems (MYCIN)",
    shortLabel: "Expert Systems",
    year: 1972,
    lane: "algorithm",
    era: "symbolic",
    status: "superseded",
    parentIds: ["logic_theorist"],
    tagline: "Encoding expert knowledge as rules - first commercial AI success",
    description: "Systems like MYCIN (medical diagnosis) and DENDRAL (chemical analysis) encoded large numbers of IF-THEN rules in specialized domains. Commercially successful in the 1980s.",
    mechanism: "Separated architecture of knowledge base (IF-THEN rules) and inference engine (forward/backward chaining). Certainty factors (CF) handle uncertainty. Knowledge acquisition done through expert interviews.",
    inspiration: "Physical Symbol System Hypothesis: 'If expert knowledge can be accurately encoded, machines can become experts'.",
    whyItFailed: "Knowledge acquisition bottleneck: enormous cost to formalize expert tacit knowledge. Difficult to handle rule conflicts. Rigid updates. Commercially failed with LISP machine market collapse in 1987.",
    capabilityGain: 45,
    influenceScore: 60,
    computeCost: 15,
    capabilityMetrics: [
      { domain: "Medical Diagnosis", before: 0, after: 65, benchmark: "MYCIN diagnostic accuracy" }
    ],
    keyPaper: "MYCIN: Computer-Based Medical Consultations (1976)",
    authors: "Shortliffe et al.",
    institution: "Stanford University",
    tags: ["Expert Systems", "Knowledge Base", "Inference Engine", "Commercial AI"],
  },
  {
    id: "backprop",
    label: "Backpropagation",
    shortLabel: "Backprop",
    year: 1986,
    lane: "optimization",
    era: "connectionist",
    status: "foundational",
    parentIds: ["perceptron"],
    tagline: "Error backpropagation - first efficient training of multilayer networks",
    description: "Rumelhart, Hinton, and Williams established efficient gradient computation for multilayer neural nets using the chain rule. Revived neural network research.",
    mechanism: "Propagates output error backward from output to input layer, computing partial derivatives (gradients) for each weight using the chain rule. Updates weights via gradient descent (w -= eta * dL/dw). Computation is O(N), same order as forward pass.",
    inspiration: "Werbos proposed it in his 1974 PhD thesis but it went unnoticed. Rumelhart and Hinton published in Nature in 1986, making it widely known. Inspired by sensitivity analysis in control theory combined with the chain rule.",
    whyItWorked: "First practical method to efficiently compute gradients for each layer of multilayer networks. Combined with nonlinear activation functions, solves the XOR problem.",
    whyItFailed: "Gradient vanishing/exploding problem remains in deep networks (10+ layers). Research stagnated again in the late 1990s.",
    capabilityGain: 55,
    influenceScore: 98,
    computeCost: 20,
    capabilityMetrics: [
      { domain: "XOR / Nonlinear Classification", before: 0, after: 95, benchmark: "Nonlinear pattern recognition" },
      { domain: "Speech Recognition", before: 20, after: 55, benchmark: "Phoneme recognition rate" }
    ],
    keyPaper: "Learning representations by back-propagating errors (1986)",
    keyPaperUrl: "https://www.nature.com/articles/323533a0",
    authors: "Rumelhart, Hinton, Williams",
    institution: "UCSD / CMU",
    tags: ["Optimization", "Gradient Descent", "Chain Rule", "Multilayer Net"],
  },
  {
    id: "cnn",
    label: "Convolutional Neural Network",
    shortLabel: "CNN (LeNet)",
    year: 1989,
    lane: "architecture",
    era: "connectionist",
    status: "foundational",
    parentIds: ["backprop"],
    tagline: "Convolutional layers - hierarchical learning of local image patterns",
    description: "Architecture proposed by LeCun with convolutional, pooling, and fully connected layers. First achieved practical performance on handwritten digit recognition.",
    mechanism: "Convolutional kernels with shared weights slide over images to extract local features. Pooling layers acquire translation invariance. Hierarchically learns low-level (edges) to high-level (objects) features. Dramatically reduces parameter count.",
    inspiration: "Hubel and Wiesel's visual cortex research (1959): discovered that cat primary visual cortex functions as edge detectors. Mimics the hierarchical structure of biological visual processing.",
    whyItWorked: "Encodes inductive biases of locality, translation invariance, and hierarchy into the architecture, achieving high generalization with fewer parameters.",
    capabilityGain: 60,
    influenceScore: 95,
    computeCost: 30,
    capabilityMetrics: [
      { domain: "Handwritten Digit Recognition", before: 5, after: 99, benchmark: "MNIST accuracy" }
    ],
    keyPaper: "Backpropagation Applied to Handwritten Zip Code Recognition (1989)",
    keyPaperUrl: "http://yann.lecun.com/exdb/publis/pdf/lecun-89e.pdf",
    authors: "Yann LeCun",
    institution: "AT&T Bell Labs",
    tags: ["CNN", "Image Recognition", "Convolution", "Local Features"],
  },
  {
    id: "lstm",
    label: "LSTM (Long Short-Term Memory)",
    shortLabel: "LSTM",
    year: 1997,
    lane: "architecture",
    era: "statistical",
    status: "superseded",
    parentIds: ["backprop"],
    tagline: "Gate mechanism - recurrent net that remembers long-term dependencies",
    description: "Gated recurrent neural network proposed by Hochreiter and Schmidhuber. Input, forget, and output gates solve the gradient vanishing problem, enabling learning of long sequence dependencies.",
    mechanism: "Combination of cell state (long-term memory) and gates (input, forget, output). Forget gate selectively erases unnecessary information, input gate adds new information. Gradients flow long distances through cell state.",
    inspiration: "Solution to the gradient vanishing problem in standard RNNs (Hochreiter's 1991 thesis). Also inspired by the concept of biological working memory.",
    whyItWorked: "Gate-based selective memory updates enable learning of long-term dependencies over 100+ steps. Dramatic performance improvements in speech, text, and time series.",
    whyItFailed: "Difficult to parallelize (sequential processing) - cannot leverage GPUs. Superseded by Transformer in 2017.",
    capabilityGain: 50,
    influenceScore: 80,
    computeCost: 35,
    capabilityMetrics: [
      { domain: "Speech Recognition", before: 55, after: 80, benchmark: "WSJ WER" },
      { domain: "Machine Translation", before: 20, after: 60, benchmark: "BLEU score" }
    ],
    keyPaper: "Long Short-Term Memory (1997)",
    keyPaperUrl: "https://www.bioinf.jku.at/publications/older/2604.pdf",
    authors: "Hochreiter, Schmidhuber",
    institution: "TU Munich",
    tags: ["RNN", "LSTM", "Sequence Model", "Gradient Vanishing Solution"],
  },
  {
    id: "svm",
    label: "Support Vector Machine",
    shortLabel: "SVM",
    year: 1995,
    lane: "algorithm",
    era: "statistical",
    status: "superseded",
    parentIds: ["perceptron"],
    tagline: "Maximum margin classification - rigorous learning based on generalization theory",
    description: "Developed by Vapnik and Cortes. Finds the hyperplane that separates training data with maximum margin. Kernel trick enables handling nonlinear problems.",
    mechanism: "Finds the maximum-margin separating hyperplane using quadratic programming. Kernel functions (RBF, polynomial, etc.) implicitly map to high-dimensional feature space for nonlinear separation. Theoretical generalization error bounds via VC dimension theory.",
    inspiration: "Vapnik's statistical learning theory (VC theory). Theoretical insight: 'generalization performance is determined by the balance between model complexity and data quantity'.",
    whyItWorked: "High generalization performance even with small data. Theoretical guarantees. Kernel trick converts nonlinear problems to linear ones.",
    whyItFailed: "Difficult to scale to large data (O(n^2) to O(n^3)). Requires feature engineering. Rapidly superseded by deep learning after 2012.",
    capabilityGain: 40,
    influenceScore: 70,
    computeCost: 25,
    capabilityMetrics: [
      { domain: "Text Classification", before: 70, after: 90, benchmark: "Reuters document classification" }
    ],
    keyPaper: "Support-Vector Networks (1995)",
    keyPaperUrl: "https://link.springer.com/article/10.1007/BF00994018",
    authors: "Cortes, Vapnik",
    institution: "AT&T Bell Labs",
    tags: ["SVM", "Kernel Methods", "Statistical Learning Theory", "Margin Maximization"],
  },
  {
    id: "gpu_computing",
    label: "GPU Parallel Computing (CUDA)",
    shortLabel: "GPU / CUDA",
    year: 2007,
    lane: "hardware",
    era: "statistical",
    status: "active",
    parentIds: [],
    tagline: "1000x speedup with GPUs - the compute revolution that made deep learning practical",
    description: "NVIDIA released CUDA, enabling GPUs for general-purpose parallel computing. Accelerated neural network matrix operations by hundreds to thousands of times.",
    mechanism: "GPUs execute matrix multiplications and convolutions in parallel with thousands of cores. Neural net forward/backward passes are almost entirely matrix operations, dramatically accelerating on GPU. Memory bandwidth 10x+ higher than CPU.",
    inspiration: "AI researchers repurposed gaming GPU parallel processing capabilities. Raina and Ng demonstrated large-scale experiments in 'Deep Learning on GPUs' (2009).",
    whyItWorked: "Deep learning's computational bottleneck is matrix operations. GPU's parallel architecture is a perfect match. Training time reduced from weeks to hours.",
    capabilityGain: 70,
    influenceScore: 95,
    computeCost: 40,
    capabilityMetrics: [
      { domain: "Training Speed", before: 10, after: 90, benchmark: "ImageNet training time (relative)" }
    ],
    keyPaper: "Large-scale Deep Unsupervised Learning using Graphics Processors (2009)",
    keyPaperUrl: "https://dl.acm.org/doi/10.1145/1553374.1553486",
    authors: "Raina, Madhavan, Ng",
    institution: "Stanford University",
    tags: ["GPU", "CUDA", "Parallel Computing", "Hardware Acceleration"],
  },
  {
    id: "imagenet_dataset",
    label: "ImageNet Dataset",
    shortLabel: "ImageNet",
    year: 2009,
    lane: "data",
    era: "statistical",
    status: "foundational",
    parentIds: [],
    tagline: "14 million images - large-scale benchmark accelerated AI competition",
    description: "Dataset of 14 million images across 1000 classes built by Fei-Fei Li et al. The ILSVRC competition became the stage for the Deep Learning revolution after AlexNet.",
    mechanism: "1000 categories based on WordNet concept hierarchy. Labeled by humans via Amazon Mechanical Turk. Hosted as ILSVRC (ImageNet Large Scale Visual Recognition Challenge) annual competition.",
    inspiration: "Hypothesis: 'AI will advance dramatically with large-scale data'. Inspired by the fact that human visual learning is based on vast visual experience.",
    whyItWorked: "Standardized benchmark enabled fair comparison between researchers, promoting competition. Large-scale data solved deep learning's overfitting problem.",
    capabilityGain: 65,
    influenceScore: 92,
    computeCost: 10,
    capabilityMetrics: [
      { domain: "Image Classification", before: 25, after: 95, benchmark: "ImageNet Top-5 accuracy" }
    ],
    keyPaper: "ImageNet: A Large-Scale Hierarchical Image Database (2009)",
    keyPaperUrl: "https://ieeexplore.ieee.org/document/5206848",
    authors: "Deng, Dong, Socher, Li, Li, Fei-Fei",
    institution: "Stanford University",
    tags: ["Dataset", "Benchmark", "Large-scale Data", "Competition"],
  },
  {
    id: "alexnet",
    label: "AlexNet (Deep CNN)",
    shortLabel: "AlexNet",
    year: 2012,
    lane: "architecture",
    era: "deep_learning",
    status: "foundational",
    parentIds: ["cnn", "gpu_computing", "imagenet_dataset"],
    tagline: "ImageNet victory - the moment Deep Learning changed the world",
    description: "Krizhevsky, Sutskever, and Hinton achieved 10%+ accuracy improvement at ILSVRC 2012. Deep CNN combining GPU, ReLU, and Dropout triggered the deep learning boom.",
    mechanism: "5 convolutional layers + 3 fully connected layers. ReLU activation (less gradient vanishing than sigmoid/tanh). Dropout regularization (randomly disabling neurons to prevent overfitting). Parallel training on 2 GTX 580 GPUs.",
    inspiration: "Hinton group's conviction that 'deep nets work with GPUs and large-scale data'. Large-scale GPU implementation of LeCun's CNN.",
    whyItWorked: "Combination of GPU parallelization + ReLU + Dropout first stabilized training of deep nets. Top-5 error rate 26% to 15% - an overwhelming performance gap that shocked the industry.",
    capabilityGain: 80,
    influenceScore: 99,
    computeCost: 55,
    capabilityMetrics: [
      { domain: "Image Classification", before: 74, after: 85, benchmark: "ImageNet Top-5 accuracy" }
    ],
    keyPaper: "ImageNet Classification with Deep Convolutional Neural Networks (2012)",
    keyPaperUrl: "https://papers.nips.cc/paper/2012/hash/c399862d3b9d6b76c8436e924a68c45b-Abstract.html",
    authors: "Krizhevsky, Sutskever, Hinton",
    institution: "University of Toronto",
    tags: ["CNN", "ReLU", "Dropout", "GPU Training", "ImageNet"],
  },
  {
    id: "resnet",
    label: "ResNet (Residual Networks)",
    shortLabel: "ResNet",
    year: 2015,
    lane: "architecture",
    era: "deep_learning",
    status: "foundational",
    parentIds: ["alexnet"],
    tagline: "Residual connections - skip connections enabling 152-layer ultra-deep networks",
    description: "Skip connections (residual connections) proposed by He et al. Solved gradient vanishing, first enabling stable training of 100+ layer ultra-deep networks.",
    mechanism: "Residual block: H(x) = F(x) + x. Shortcut connections form a 'highway' that directly passes gradients to earlier layers. Insight: learning residual F(x) is easier than learning identity mapping.",
    inspiration: "Question: 'Why does performance degrade when adding more layers?' Avoids the root cause of gradient vanishing with residual connections. Highway bypass analogy.",
    whyItWorked: "152 layers achieved ImageNet accuracy 3.57% (below human level). Residual connections guarantee gradient flow, making depth proportional to accuracy.",
    capabilityGain: 70,
    influenceScore: 97,
    computeCost: 60,
    capabilityMetrics: [
      { domain: "Image Classification", before: 85, after: 96, benchmark: "ImageNet Top-5 accuracy" }
    ],
    keyPaper: "Deep Residual Learning for Image Recognition (2015)",
    keyPaperUrl: "https://arxiv.org/abs/1512.03385",
    authors: "He, Zhang, Ren, Sun",
    institution: "Microsoft Research",
    tags: ["Residual Connections", "Skip Connections", "Ultra-deep Net", "Gradient Vanishing Solution"],
  },
  {
    id: "batch_norm",
    label: "Batch Normalization",
    shortLabel: "Batch Norm",
    year: 2015,
    lane: "optimization",
    era: "deep_learning",
    status: "active",
    parentIds: ["backprop", "alexnet"],
    tagline: "Eliminating internal covariate shift - normalization enabling 10x higher learning rates",
    description: "Proposed by Ioffe and Szegedy. Normalizes activation values for each mini-batch to stabilize learning. Enables larger learning rates and dramatically improves training speed.",
    mechanism: "Normalizes activations of each mini-batch to zero mean and unit variance, then restores with learnable scale and shift parameters gamma and beta. Suppresses internal covariate shift (changing input distribution per layer).",
    inspiration: "Hypothesis: 'The reason deep nets are hard to train is that each layer's input distribution keeps changing'. Applies whitening (input normalization) to each layer.",
    whyItWorked: "Can set learning rates 10x+ higher. Regularization effect without Dropout. Dramatically improved training stability. Combined with ResNet to make ultra-deep nets practical.",
    capabilityGain: 55,
    influenceScore: 90,
    computeCost: 10,
    capabilityMetrics: [
      { domain: "Training Stability", before: 40, after: 90, benchmark: "Training convergence speed (relative)" }
    ],
    keyPaper: "Batch Normalization: Accelerating Deep Network Training (2015)",
    keyPaperUrl: "https://arxiv.org/abs/1502.03167",
    authors: "Ioffe, Szegedy",
    institution: "Google",
    tags: ["Normalization", "Training Stability", "Optimization", "Batch Processing"],
  },
  {
    id: "deep_q",
    label: "Deep Q-Network (DQN)",
    shortLabel: "DQN",
    year: 2013,
    lane: "algorithm",
    era: "deep_learning",
    status: "foundational",
    parentIds: ["cnn"],
    tagline: "Learning Atari from raw pixels - birth of deep reinforcement learning",
    description: "DeepMind combined CNN with Q-learning to learn Atari games from raw pixel input at human level. Stabilized with experience replay and target networks.",
    mechanism: "CNN extracts features from state (game screen) -> outputs Q-values (expected reward) for each action. Experience replay buffer (random sampling of past experiences) breaks data correlation. Target network stabilizes learning.",
    inspiration: "Combination of Sutton and Barto's reinforcement learning theory (Q-learning) with CNN. Principle of reinforcement learning: 'can learn from reward signals alone'.",
    whyItWorked: "Two innovations - experience replay and target networks - solved deep reinforcement learning's instability problem. Same architecture learned 49 different Atari games.",
    capabilityGain: 65,
    influenceScore: 88,
    computeCost: 60,
    capabilityMetrics: [
      { domain: "Atari Games", before: 10, after: 75, benchmark: "Human score ratio" }
    ],
    keyPaper: "Playing Atari with Deep Reinforcement Learning (2013)",
    keyPaperUrl: "https://arxiv.org/abs/1312.5602",
    authors: "Mnih et al.",
    institution: "DeepMind",
    tags: ["Reinforcement Learning", "Q-Learning", "Game AI", "Experience Replay"],
  },
  {
    id: "gan",
    label: "GAN (Generative Adversarial Network)",
    shortLabel: "GAN",
    year: 2014,
    lane: "architecture",
    era: "deep_learning",
    status: "superseded",
    parentIds: ["backprop"],
    tagline: "Generator vs discriminator competition - revolution in realistic image generation",
    description: "Generative adversarial network proposed by Goodfellow. Generator and discriminator compete, enabling generation of realistic images close to training data.",
    mechanism: "Minimax game between generator G (random noise -> fake images) and discriminator D (real/fake judgment). Train until D cannot distinguish real from fake. Loss: min_G max_D E[log D(x)] + E[log(1-D(G(z)))]",
    inspiration: "Insight that 'competition creates creativity'. Goodfellow reportedly conceived the idea during a bar discussion with friends.",
    whyItWorked: "High-quality image generation possible without supervision. StyleGAN and BigGAN generate photo-quality faces and landscapes.",
    whyItFailed: "Unstable training (mode collapse). Superseded by Diffusion Models after 2021.",
    capabilityGain: 75,
    influenceScore: 85,
    computeCost: 65,
    capabilityMetrics: [
      { domain: "Image Generation Quality", before: 20, after: 80, benchmark: "FID score" }
    ],
    keyPaper: "Generative Adversarial Nets (2014)",
    keyPaperUrl: "https://arxiv.org/abs/1406.2661",
    authors: "Goodfellow et al.",
    institution: "Universite de Montreal",
    tags: ["Generative Model", "Adversarial Learning", "Image Generation", "Unsupervised Learning"],
  },
  {
    id: "alphago",
    label: "AlphaGo (Deep RL)",
    shortLabel: "AlphaGo",
    year: 2016,
    lane: "algorithm",
    era: "deep_learning",
    status: "foundational",
    parentIds: ["resnet", "deep_q"],
    tagline: "Defeating Go world champion - landmark of deep reinforcement learning",
    description: "DeepMind combined CNN + Monte Carlo Tree Search + reinforcement learning to defeat Go world champion Lee Sedol 4-1.",
    mechanism: "Two CNNs: policy network (predicts next move) and value network (evaluates position). Reinforcement learning through self-play improves policy. Monte Carlo Tree Search (MCTS) for lookahead.",
    inspiration: "Unlike Deep Blue's search-based approach, combines 'intuition' (neural network) and 'reading' (MCTS), mimicking human player's thought process.",
    whyItWorked: "Go's search space (10^170) cannot be exhaustively searched. Combination of neural network evaluation function and search exceeded human intuition.",
    capabilityGain: 85,
    influenceScore: 90,
    computeCost: 80,
    capabilityMetrics: [
      { domain: "Go", before: 30, after: 99, benchmark: "Win rate vs professional players" }
    ],
    keyPaper: "Mastering the game of Go with deep neural networks and tree search (2016)",
    keyPaperUrl: "https://www.nature.com/articles/nature16961",
    authors: "Silver et al.",
    institution: "DeepMind",
    tags: ["Reinforcement Learning", "MCTS", "Game AI", "Self-play"],
  },
  {
    id: "attention",
    label: "Attention Mechanism (Seq2Seq)",
    shortLabel: "Attention",
    year: 2015,
    lane: "architecture",
    era: "deep_learning",
    status: "foundational",
    parentIds: ["lstm"],
    tagline: "Attention mechanism - revolutionary approach referencing all positions simultaneously",
    description: "Bahdanau, Cho, and Bengio proposed Attention for machine translation. Decoder 'attends' to all input positions at each step, dramatically improving long sentence translation accuracy.",
    mechanism: "At each decoder step, computes scores for all encoder hidden states (e_ij = a(s_{i-1}, h_j)). Generates context vector as weighted sum normalized by softmax. Learns 'which input words to focus on'.",
    inspiration: "Mimics how human translators reference the entire sentence while selecting words. Idea to eliminate the 'bottleneck' of compressing all information into a fixed-length vector.",
    whyItWorked: "Solved the fixed-length context vector bottleneck that was limiting long sentence translation. Significant BLEU score improvements. Foundation for later Transformer.",
    capabilityGain: 60,
    influenceScore: 98,
    computeCost: 30,
    capabilityMetrics: [
      { domain: "Machine Translation", before: 60, after: 80, benchmark: "WMT BLEU score" }
    ],
    keyPaper: "Neural Machine Translation by Jointly Learning to Align and Translate (2015)",
    keyPaperUrl: "https://arxiv.org/abs/1409.0473",
    authors: "Bahdanau, Cho, Bengio",
    institution: "Universite de Montreal",
    tags: ["Attention", "Machine Translation", "Seq2Seq", "Context"],
  },
  {
    id: "transformer",
    label: "Transformer (Attention Is All You Need)",
    shortLabel: "Transformer",
    year: 2017,
    lane: "architecture",
    era: "transformer",
    status: "active",
    parentIds: ["attention", "batch_norm"],
    tagline: "Abolishing RNNs - Self-Attention alone unifies all tasks",
    description: "Vaswani et al. proposed Transformer in 'Attention Is All You Need', using no RNNs or CNNs. Only Multi-Head Self-Attention and FFN updated machine translation SOTA.",
    mechanism: "Self-Attention: each token computes relevance scores with all tokens (Q*K^T / sqrt(d_k)) and takes weighted sum of V (values). Multi-Head: multiple attention heads learn different relationships in parallel. Positional encoding adds order information.",
    inspiration: "Problem awareness: 'RNN's sequential processing prevents GPU parallelization'. Bold hypothesis that sequences can be processed with Attention alone.",
    whyItWorked: "Computes dependencies between all positions in O(1) steps (RNN requires O(n)). Fully leverages GPU parallelization. Performance improves as it scales.",
    capabilityGain: 90,
    influenceScore: 100,
    computeCost: 70,
    capabilityMetrics: [
      { domain: "Machine Translation", before: 80, after: 95, benchmark: "WMT BLEU score" }
    ],
    keyPaper: "Attention Is All You Need (2017)",
    keyPaperUrl: "https://arxiv.org/abs/1706.03762",
    authors: "Vaswani, Shazeer, Parmar, Uszkoreit, Jones, Gomez, Kaiser, Polosukhin",
    institution: "Google Brain / Google Research",
    tags: ["Transformer", "Self-Attention", "Multi-Head", "Parallelization"],
  },
  {
    id: "bert",
    label: "BERT (Pretraining + Fine-tuning)",
    shortLabel: "BERT",
    year: 2018,
    lane: "algorithm",
    era: "transformer",
    status: "foundational",
    parentIds: ["transformer"],
    tagline: "Masked language model - bidirectional context understanding updates 11 tasks simultaneously",
    description: "Bidirectional Transformer pretraining model proposed by Devlin et al. Pretrained on large corpus with Masked Language Modeling (MLM) and Next Sentence Prediction (NSP), then fine-tuned on downstream tasks.",
    mechanism: "Pretrain by masking 15% of input tokens and predicting from context (MLM task). Bidirectional Self-Attention references both left and right context simultaneously. Fine-tuning just adds a classification head to the final layer.",
    inspiration: "Insight: 'Language understanding requires bidirectional context'. Built on ELMo's success (bidirectional LSTM), realized end-to-end with Transformer.",
    whyItWorked: "Pretraining acquires general language representations, enabling fine-tuning with small labeled datasets. Simultaneously updated SOTA on 11 tasks including GLUE and SQuAD.",
    capabilityGain: 80,
    influenceScore: 97,
    computeCost: 75,
    capabilityMetrics: [
      { domain: "Natural Language Understanding", before: 70, after: 90, benchmark: "GLUE score" },
      { domain: "Question Answering", before: 75, after: 93, benchmark: "SQuAD F1" }
    ],
    keyPaper: "BERT: Pre-training of Deep Bidirectional Transformers (2018)",
    keyPaperUrl: "https://arxiv.org/abs/1810.04805",
    authors: "Devlin, Chang, Lee, Toutanova",
    institution: "Google AI Language",
    tags: ["Pretraining", "Fine-tuning", "Masked Language Model", "Bidirectional"],
  },
  {
    id: "gpt2",
    label: "GPT-2 (Autoregressive LM)",
    shortLabel: "GPT-2",
    year: 2019,
    lane: "architecture",
    era: "transformer",
    status: "foundational",
    parentIds: ["transformer"],
    tagline: "1.5B parameters - generative model 'too dangerous to release'",
    description: "OpenAI's 1.5B parameter autoregressive language model. Trained only on next-token prediction but discovered to perform zero-shot summarization, translation, and QA.",
    mechanism: "Decoder-only Transformer predicting next token (causal Self-Attention). Pretrained on WebText dataset (8M Reddit top-link documents). Executes various tasks just by providing a prompt.",
    inspiration: "Hypothesis: 'A sufficiently large language model can solve diverse tasks without task-specific training'. Discovery that scale generates capability.",
    whyItWorked: "Large-scale data + large-scale model combination produced emergent capabilities. First demonstrated the potential of in-context learning.",
    capabilityGain: 70,
    influenceScore: 93,
    computeCost: 80,
    capabilityMetrics: [
      { domain: "Text Generation", before: 40, after: 80, benchmark: "Human evaluation score" }
    ],
    keyPaper: "Language Models are Unsupervised Multitask Learners (2019)",
    keyPaperUrl: "https://cdn.openai.com/better-language-models/language_models_are_unsupervised_multitask_learners.pdf",
    authors: "Radford, Wu, Child, Luan, Amodei, Sutskever",
    institution: "OpenAI",
    tags: ["Autoregressive", "Zero-shot", "Scale", "Text Generation"],
  },
  {
    id: "scaling_laws",
    label: "Scaling Laws",
    shortLabel: "Scaling Laws",
    year: 2020,
    lane: "algorithm",
    era: "foundation",
    status: "active",
    parentIds: ["gpt2"],
    tagline: "Power laws - predicting optimal allocation of model, data, and compute",
    description: "Kaplan, McCandlish et al. discovered that the relationship between model size, data volume, compute, and loss follows power laws. Optimal resource allocation became calculable.",
    mechanism: "L(N) proportional to N^(-0.076) (loss L decreases as power law with parameter count N). Chinchilla scaling laws (2022) identified optimal ratio of model size to data volume (1:20).",
    inspiration: "Quantitative answer to 'Why do larger models always perform better?' Discovery that scaling laws from physics (power laws) also hold in machine learning.",
    whyItWorked: "Enabled predicting performance before model training. Optimal compute budget allocation became possible. Design guidelines for large-scale model development like GPT-4 and Gemini.",
    capabilityGain: 60,
    influenceScore: 95,
    computeCost: 5,
    capabilityMetrics: [
      { domain: "Language Model Loss", before: 50, after: 85, benchmark: "Scaling prediction accuracy" }
    ],
    keyPaper: "Scaling Laws for Neural Language Models (2020)",
    keyPaperUrl: "https://arxiv.org/abs/2001.08361",
    authors: "Kaplan, McCandlish, Henighan et al.",
    institution: "OpenAI",
    tags: ["Scaling Laws", "Power Laws", "Large Models", "Compute Optimization"],
  },
  {
    id: "gpt3",
    label: "GPT-3 (175B Parameters)",
    shortLabel: "GPT-3",
    year: 2020,
    lane: "data",
    era: "foundation",
    status: "foundational",
    parentIds: ["gpt2", "scaling_laws"],
    tagline: "Emergent few-shot learning - 175B parameters changed the world",
    description: "OpenAI's 175B parameter model. Emergent ability to solve diverse tasks with few-shot, one-shot, and zero-shot learning. Prompt engineering emerged as a new field.",
    mechanism: "Decoder-only Transformer with 96 layers. Pretrained on CommonCrawl, WebText, Books, Wikipedia. In-context learning: executes tasks without fine-tuning just by including examples in the prompt.",
    inspiration: "Confidence that capability improves as predicted by scaling laws. Testing the hypothesis that 'scale brings qualitative change'.",
    whyItWorked: "At 175B parameter scale, emergent generalization capabilities appeared for diverse tasks including programming, math, translation, and summarization.",
    capabilityGain: 88,
    influenceScore: 98,
    computeCost: 95,
    capabilityMetrics: [
      { domain: "Few-shot Learning", before: 50, after: 88, benchmark: "SuperGLUE" }
    ],
    keyPaper: "Language Models are Few-Shot Learners (2020)",
    keyPaperUrl: "https://arxiv.org/abs/2005.14165",
    authors: "Brown et al.",
    institution: "OpenAI",
    tags: ["Few-shot", "In-context Learning", "Emergence", "Large Language Model"],
  },
  {
    id: "diffusion",
    label: "Diffusion Models (DDPM)",
    shortLabel: "Diffusion",
    year: 2020,
    lane: "architecture",
    era: "foundation",
    status: "active",
    parentIds: ["gan"],
    tagline: "Iterative denoising - stable image generation surpassing GANs",
    description: "Denoising Diffusion Probabilistic Models proposed by Ho, Jain, and Abbeel. Generates higher quality images more stably than GANs. Foundation technology for Stable Diffusion and DALL-E 2.",
    mechanism: "Forward process: gradually adds Gaussian noise to images converting to random noise (T=1000 steps). Reverse process: trains UNet to restore images from noise. Text conditioning uses CLIP embeddings.",
    inspiration: "Thermodynamic non-equilibrium processes (diffusion equations). Physical insight: 'if we can reverse the process of adding noise, we can generate'.",
    whyItWorked: "Avoids GAN training instability (mode collapse). Can be trained with likelihood maximization, balancing diversity and quality. Works well with text conditioning.",
    capabilityGain: 85,
    influenceScore: 92,
    computeCost: 75,
    capabilityMetrics: [
      { domain: "Image Generation Quality", before: 80, after: 97, benchmark: "FID score (ImageNet)" }
    ],
    keyPaper: "Denoising Diffusion Probabilistic Models (2020)",
    keyPaperUrl: "https://arxiv.org/abs/2006.11239",
    authors: "Ho, Jain, Abbeel",
    institution: "UC Berkeley",
    tags: ["Diffusion Model", "Generative Model", "Denoising", "Image Generation"],
  },
  {
    id: "clip",
    label: "CLIP (Contrastive Language-Image)",
    shortLabel: "CLIP",
    year: 2021,
    lane: "data",
    era: "foundation",
    status: "active",
    parentIds: ["gpt3", "resnet"],
    tagline: "Unified text-image representation - zero-shot image recognition realized",
    description: "OpenAI trained on 400M image-text pairs with contrastive learning. Places text and images in the same embedding space, achieving 76% zero-shot ImageNet accuracy.",
    mechanism: "Image encoder (ViT/ResNet) and text encoder (Transformer) trained with contrastive loss. Maximizes similarity of positive examples (text for same image), minimizes negatives. At inference, classifies by similarity to text 'a photo of a {class}'.",
    inspiration: "Insight: 'Internet images and captions can be used as supervision signals, leveraging vast unlabeled data'.",
    whyItWorked: "Acquired general visual-language representations at scale of 400M pairs. Adopted for text conditioning in Stable Diffusion. Foundation for multimodal AI.",
    capabilityGain: 75,
    influenceScore: 93,
    computeCost: 80,
    capabilityMetrics: [
      { domain: "Zero-shot Image Classification", before: 0, after: 76, benchmark: "ImageNet Zero-shot accuracy" }
    ],
    keyPaper: "Learning Transferable Visual Models From Natural Language Supervision (2021)",
    keyPaperUrl: "https://arxiv.org/abs/2103.00020",
    authors: "Radford et al.",
    institution: "OpenAI",
    tags: ["Multimodal", "Contrastive Learning", "Zero-shot", "Vision-Language"],
  },
  {
    id: "rlhf",
    label: "RLHF (InstructGPT)",
    shortLabel: "RLHF",
    year: 2022,
    lane: "alignment",
    era: "foundation",
    status: "active",
    parentIds: ["gpt3"],
    tagline: "Reinforcement learning from human feedback - dramatically reducing harmful outputs",
    description: "Reinforcement Learning from Human Feedback proposed by Ouyang et al. Converted GPT-3 to InstructGPT, dramatically improving instruction following, safety, and helpfulness. Direct predecessor to ChatGPT.",
    mechanism: "1. SFT: Fine-tune on ideal responses written by humans. 2. Reward Model: Train reward model by having humans rank multiple responses. 3. PPO: Optimize policy using PPO algorithm with reward model.",
    inspiration: "Solving the reward design problem in reinforcement learning with 'human preferences'. Safety research insight: 'optimizing machines for things humans cannot evaluate is dangerous'.",
    whyItWorked: "Outperforms GPT-3 in human preferences even with 100x smaller model. Dramatically reduced harmful, false, and irrelevant outputs. Technical foundation for ChatGPT's explosive adoption.",
    capabilityGain: 70,
    influenceScore: 96,
    computeCost: 50,
    capabilityMetrics: [
      { domain: "Instruction Following", before: 50, after: 90, benchmark: "Human evaluation score" },
      { domain: "Safety", before: 40, after: 85, benchmark: "Harmful output rate (inverse)" }
    ],
    keyPaper: "Training language models to follow instructions with human feedback (2022)",
    keyPaperUrl: "https://arxiv.org/abs/2203.02155",
    authors: "Ouyang et al.",
    institution: "OpenAI",
    tags: ["RLHF", "Alignment", "PPO", "Instruction Following", "Safety"],
  },
  {
    id: "flash_attention",
    label: "FlashAttention (IO-Aware)",
    shortLabel: "FlashAttention",
    year: 2022,
    lane: "hardware",
    era: "foundation",
    status: "active",
    parentIds: ["transformer"],
    tagline: "Memory bandwidth optimization - 10x faster Attention computation",
    description: "IO-Aware memory-efficient Attention implementation proposed by Dao and Fu et al. Leverages GPU SRAM/HBM memory hierarchy for 2-4x faster and 5-20x less memory than standard Attention.",
    mechanism: "Standard Attention writes entire N x N Attention matrix to HBM (slow). FlashAttention uses tiling to complete computation within SRAM (fast), minimizing HBM reads/writes. Online Softmax ensures numerical stability.",
    inspiration: "Insight: 'AI's bottleneck is memory bandwidth, not GPU compute'. Applying computer architecture knowledge to Deep Learning implementation.",
    whyItWorked: "Transformer's computation is O(n^2) but dramatically improved effective speed by optimizing memory access. Made long contexts (128K+ tokens) practical.",
    capabilityGain: 50,
    influenceScore: 88,
    computeCost: -30,
    capabilityMetrics: [
      { domain: "Attention Computation Speed", before: 40, after: 90, benchmark: "GPT-2 training speed (relative)" }
    ],
    keyPaper: "FlashAttention: Fast and Memory-Efficient Exact Attention with IO-Awareness (2022)",
    keyPaperUrl: "https://arxiv.org/abs/2205.14135",
    authors: "Dao, Fu, Ermon, Rudra, Re",
    institution: "Stanford University",
    tags: ["Hardware Optimization", "Memory Efficiency", "Attention Speedup", "Long Context"],
  },
  {
    id: "lora",
    label: "LoRA (Low-Rank Adaptation)",
    shortLabel: "LoRA",
    year: 2021,
    lane: "optimization",
    era: "foundation",
    status: "active",
    parentIds: ["bert"],
    tagline: "Low-rank matrix decomposition - fine-tuning with 1% of parameters",
    description: "Efficient fine-tuning method for large models proposed by Hu et al. Approximates weight updates with low-rank matrix products, reducing trainable parameters by 100x or more.",
    mechanism: "Weight update delta_W approximated as BA (B is d x r, A is r x d, r << d). Freeze original weights W, train only BA portion. At inference, integrate W + BA with no overhead.",
    inspiration: "Hypothesis: 'Pretrained model weights exist in an intrinsically low-rank subspace'. Leverages mathematical properties of matrix decomposition.",
    whyItWorked: "Reduced GPU memory needed to fine-tune GPT-3 (175B) to less than 1/3. Made large model customization accessible to individuals and small organizations.",
    capabilityGain: 55,
    influenceScore: 90,
    computeCost: -60,
    capabilityMetrics: [
      { domain: "Fine-tuning Efficiency", before: 20, after: 90, benchmark: "Compute cost reduction rate" }
    ],
    keyPaper: "LoRA: Low-Rank Adaptation of Large Language Models (2021)",
    keyPaperUrl: "https://arxiv.org/abs/2106.09685",
    authors: "Hu, Shen, Wallis et al.",
    institution: "Microsoft",
    tags: ["Fine-tuning", "Low-rank Approximation", "Parameter Efficiency", "Adapter"],
  },
  {
    id: "moe",
    label: "Mixture of Experts (MoE)",
    shortLabel: "MoE",
    year: 2022,
    lane: "architecture",
    era: "foundation",
    status: "active",
    parentIds: ["transformer", "scaling_laws"],
    tagline: "Sparse activation - achieving 1.2T parameters with less compute",
    description: "MoE architecture adopted in Switch Transformer, Mixtral, etc. Routes each token to a small number of 'expert' FFNs, increasing parameter count while controlling compute.",
    mechanism: "Replaces FFN in each Transformer layer with multiple Experts. Gating network routes each token to Top-K experts. At inference, only a fraction of all parameters are activated (sparse computation).",
    inspiration: "Intuition: 'A team of specialists is more efficient than a generalist'. Applies Jacobs and Jordan's 1991 MoE to large-scale Transformers.",
    whyItWorked: "Adopted in Gemini 1.5, GPT-4, Mixtral, etc. Achieves larger capacity with same compute. Specialized experts for specific tasks form naturally.",
    capabilityGain: 72,
    influenceScore: 88,
    computeCost: 20,
    capabilityMetrics: [
      { domain: "Language Model Performance", before: 75, after: 90, benchmark: "MMLU accuracy" }
    ],
    keyPaper: "Switch Transformers: Scaling to Trillion Parameter Models (2022)",
    keyPaperUrl: "https://arxiv.org/abs/2101.03961",
    authors: "Fedus, Zoph, Shazeer",
    institution: "Google Brain",
    tags: ["MoE", "Sparse Activation", "Scaling", "Expert Models"],
  },
  {
    id: "cot",
    label: "Chain-of-Thought (CoT Prompting)",
    shortLabel: "Chain-of-Thought",
    year: 2022,
    lane: "algorithm",
    era: "reasoning",
    status: "active",
    parentIds: ["gpt3", "scaling_laws"],
    tagline: "Chain of thought - just writing intermediate steps solves math problems",
    description: "Discovered by Wei, Wang et al. Simply prompting 'let's think step by step' dramatically improves LLM performance on math and reasoning tasks.",
    mechanism: "Include examples with 'thought process + answer' rather than just 'answer' in few-shot prompts. Model generates intermediate reasoning steps, decomposing complex problems. Zero-shot CoT: just 'Let's think step by step' is effective.",
    inspiration: "Observation: 'Humans write calculation processes on paper when solving difficult problems'. Cognitive science insight that intermediate steps serve as computational scaffolding.",
    whyItWorked: "LLMs operate by predicting next tokens, so generating intermediate steps increases 'computation space'. GPT-3 accuracy on GSM8K math problems improved from 17% to 56%.",
    capabilityGain: 75,
    influenceScore: 92,
    computeCost: 15,
    capabilityMetrics: [
      { domain: "Math / Reasoning", before: 17, after: 56, benchmark: "GSM8K accuracy" }
    ],
    keyPaper: "Chain-of-Thought Prompting Elicits Reasoning in Large Language Models (2022)",
    keyPaperUrl: "https://arxiv.org/abs/2201.11903",
    authors: "Wei, Wang, Schuurmans et al.",
    institution: "Google Brain",
    tags: ["Chain-of-Thought", "Reasoning", "Prompting", "Math"],
  },
  {
    id: "gpt4",
    label: "GPT-4 (Multimodal LLM)",
    shortLabel: "GPT-4",
    year: 2023,
    lane: "data",
    era: "reasoning",
    status: "active",
    parentIds: ["rlhf", "cot", "moe"],
    tagline: "Multimodal reasoning - top 10% on bar exam and medical licensing",
    description: "OpenAI's largest multimodal model. Supports text and image input, achieving top 10% human performance on bar exam, medical licensing exam, and GRE.",
    mechanism: "Architecture details undisclosed but suspected MoE. Safety enhanced with RLHF + Constitutional AI. Multimodal design integrating image encoder with LLM.",
    inspiration: "OpenAI's research policy of 'combining scale and safety'. Large-scale expansion and safety enhancement building on GPT-3.5's success.",
    whyItWorked: "Combination of scale, RLHF, and multimodal integration surpassed humans on specialized knowledge tasks.",
    capabilityGain: 92,
    influenceScore: 97,
    computeCost: 100,
    capabilityMetrics: [
      { domain: "MMLU (Expert Knowledge)", before: 70, after: 86, benchmark: "MMLU accuracy" },
      { domain: "Bar Exam", before: 40, after: 90, benchmark: "Bar Exam percentile" }
    ],
    keyPaper: "GPT-4 Technical Report (2023)",
    keyPaperUrl: "https://arxiv.org/abs/2303.08774",
    authors: "OpenAI",
    institution: "OpenAI",
    tags: ["Multimodal", "Large Language Model", "RLHF", "Expert Knowledge"],
  },
  {
    id: "test_time_compute",
    label: "Test-Time Compute (o1 / DeepSeek-R1)",
    shortLabel: "Test-Time Compute",
    year: 2024,
    lane: "algorithm",
    era: "reasoning",
    status: "active",
    parentIds: ["cot", "rlhf"],
    tagline: "More compute at inference - thinking longer improves performance",
    description: "Demonstrated by OpenAI o1 and DeepSeek-R1. Increasing compute at inference time (long chains of thought) rather than training dramatically improves math, coding, and scientific reasoning.",
    mechanism: "Trained with reinforcement learning to generate long chains of thought (internal monologue). At inference, model generates many 'thinking' steps before answering. Process Reward Model (PRM) evaluates intermediate steps.",
    inspiration: "Observation: 'Humans also take time to think about difficult problems'. Extension of scaling laws from 'training compute' to 'inference compute'.",
    whyItWorked: "AIME math competition improved from GPT-4o's 13% to o1's 83%. Significant improvements in competitive programming. 'Thinking time' became a new dimension of scaling.",
    capabilityGain: 88,
    influenceScore: 95,
    computeCost: 60,
    capabilityMetrics: [
      { domain: "Math Competition (AIME)", before: 13, after: 83, benchmark: "AIME 2024 accuracy" },
      { domain: "Coding", before: 60, after: 89, benchmark: "Codeforces rating" }
    ],
    keyPaper: "OpenAI o1 System Card (2024)",
    keyPaperUrl: "https://openai.com/index/openai-o1-system-card/",
    authors: "OpenAI",
    institution: "OpenAI / DeepSeek",
    tags: ["Test-time Compute", "Reasoning", "Reinforcement Learning", "Chain-of-Thought"],
  },
  {
    id: "small_lm",
    label: "Small Language Models (Phi / Mistral)",
    shortLabel: "Small LMs",
    year: 2023,
    lane: "optimization",
    era: "reasoning",
    status: "active",
    parentIds: ["lora", "scaling_laws"],
    tagline: "High-quality data enables miniaturization - 7B outperforms 70B efficiently",
    description: "Demonstrated by Microsoft Phi and Mistral 7B. High-quality data curation (textbook quality) and efficient architectures achieve 70B-class performance with 7-13B parameters.",
    mechanism: "Phi-1: trained on 'textbook quality' code data. Mistral: Sliding Window Attention (efficiently processes long-range dependencies) + GQA (Grouped Query Attention) reduces memory. Knowledge distillation transfers knowledge from large to small models.",
    inspiration: "Hypothesis: 'Data quality is more important than data quantity'. Reinterpretation of Chinchilla scaling laws: optimal data volume is larger than previously estimated.",
    whyItWorked: "High-quality data + efficient architecture enables practical AI running on smartphones and edge devices.",
    capabilityGain: 65,
    influenceScore: 85,
    computeCost: -70,
    capabilityMetrics: [
      { domain: "Coding (HumanEval)", before: 50, after: 80, benchmark: "HumanEval Pass@1" }
    ],
    keyPaper: "Textbooks Are All You Need (2023)",
    keyPaperUrl: "https://arxiv.org/abs/2306.11644",
    authors: "Gunasekar et al.",
    institution: "Microsoft Research",
    tags: ["Small Models", "Data Curation", "Knowledge Distillation", "Edge AI"],
  },
  {
    id: "tpu",
    label: "TPU (Tensor Processing Unit)",
    shortLabel: "TPU",
    year: 2016,
    lane: "hardware",
    era: "deep_learning",
    status: "active",
    parentIds: ["gpu_computing"],
    tagline: "Matrix operation ASIC - 30x power efficiency over GPU for AI acceleration",
    description: "Google's ASIC designed specifically for Deep Learning inference and training. Matrix Multiply Unit (MXU) executes 256x256 matrix products in one clock. Used for GPT-4 and Gemini training.",
    mechanism: "Systolic Array: 256x256 MAC (multiply-accumulate) units pipeline matrix products. HBM (High Bandwidth Memory) ensures bandwidth. TPU v4 coordinates thousands of chips in pod configuration.",
    inspiration: "Design philosophy: 'Dedicated hardware is more efficient than general-purpose GPUs for specific workloads'. Response to rapidly increasing Deep Learning demand inside Google.",
    whyItWorked: "80x faster AlexNet inference than CPU. Dramatically reduced training costs, giving Google the foundation to lead large-scale model research.",
    capabilityGain: 65,
    influenceScore: 85,
    computeCost: 30,
    capabilityMetrics: [
      { domain: "Inference Throughput", before: 30, after: 95, benchmark: "TOPS (relative)" }
    ],
    keyPaper: "In-Datacenter Performance Analysis of a Tensor Processing Unit (2017)",
    keyPaperUrl: "https://arxiv.org/abs/1704.04760",
    authors: "Jouppi et al.",
    institution: "Google",
    tags: ["TPU", "ASIC", "Matrix Operations", "Dedicated Hardware"],
  },
  {
    id: "neuromorphic",
    label: "Neuromorphic Chips (Intel Loihi)",
    shortLabel: "Neuromorphic",
    year: 2017,
    lane: "hardware",
    era: "transformer",
    status: "stalled",
    parentIds: ["gpu_computing"],
    tagline: "Recreating the brain on silicon - 1000x power savings with spiking neural nets",
    description: "Intel's spiking neural network dedicated chip. Mimics biological neuron spikes (firing) to achieve AI inference at 1/1000 the power of conventional GPUs.",
    mechanism: "Spiking Neural Networks (SNN): neurons only fire spikes when exceeding threshold (sparse computation). Event-driven processing with near-zero power when inactive. Loihi 2 has 128 cores and 1 million neurons.",
    inspiration: "Human brain operates at 20W while GPUs use hundreds to thousands of watts. Insight: 'Reproducing brain computation principles in hardware could realize low-power AI'.",
    whyItFailed: "SNN training algorithms are immature (low compatibility with backpropagation). Cannot match GPU-based model accuracy. Limited ecosystem.",
    capabilityGain: 30,
    influenceScore: 45,
    computeCost: -80,
    capabilityMetrics: [
      { domain: "Energy Efficiency", before: 10, after: 70, benchmark: "TOPS/W (relative)" }
    ],
    keyPaper: "Loihi: A Neuromorphic Manycore Processor with On-Chip Learning (2018)",
    keyPaperUrl: "https://ieeexplore.ieee.org/document/8259423",
    authors: "Davies et al.",
    institution: "Intel Labs",
    tags: ["Neuromorphic", "Spiking NN", "Low Power", "Hardware"],
  },
];

export interface BenchmarkDataPoint {
  year: number;
  score: number;
  model: string;
}

export interface BenchmarkHistory {
  id: string;
  name: string;
  domain: string;
  introduced: number;
  humanBaseline: number;
  saturated?: number;
  dataPoints: BenchmarkDataPoint[];
}

export const benchmarkHistories: BenchmarkHistory[] = [
  {
    id: "mnist",
    name: "MNIST",
    domain: "Vision",
    introduced: 1998,
    humanBaseline: 98,
    saturated: 2003,
    dataPoints: [
      { year: 1998, score: 88, model: "LeNet-5" },
      { year: 2003, score: 99.3, model: "CNN+Distortion" },
      { year: 2012, score: 99.7, model: "Multi-column DNN" },
    ],
  },
  {
    id: "imagenet",
    name: "ImageNet Top-5",
    domain: "Vision",
    introduced: 2010,
    humanBaseline: 95,
    saturated: 2015,
    dataPoints: [
      { year: 2010, score: 72, model: "NEC-UIUC" },
      { year: 2012, score: 84, model: "AlexNet" },
      { year: 2014, score: 93, model: "VGGNet" },
      { year: 2015, score: 96.4, model: "ResNet-152" },
      { year: 2017, score: 97.7, model: "SENet" },
    ],
  },
  {
    id: "glue",
    name: "GLUE",
    domain: "Language",
    introduced: 2018,
    humanBaseline: 87,
    saturated: 2019,
    dataPoints: [
      { year: 2018, score: 72, model: "GPT" },
      { year: 2019, score: 80, model: "BERT-Large" },
      { year: 2019, score: 88, model: "XLNet" },
      { year: 2020, score: 90, model: "ALBERT" },
    ],
  },
  {
    id: "superglue",
    name: "SuperGLUE",
    domain: "Language",
    introduced: 2019,
    humanBaseline: 89.8,
    saturated: 2021,
    dataPoints: [
      { year: 2019, score: 71, model: "BERT-Large" },
      { year: 2020, score: 84, model: "T5-11B" },
      { year: 2021, score: 90.4, model: "ST-MoE-32B" },
    ],
  },
  {
    id: "gsm8k",
    name: "GSM8K (Elementary Math)",
    domain: "Reasoning",
    introduced: 2021,
    humanBaseline: 100,
    saturated: 2024,
    dataPoints: [
      { year: 2021, score: 17, model: "GPT-3 175B" },
      { year: 2022, score: 56, model: "GPT-3 + CoT" },
      { year: 2023, score: 87, model: "GPT-4" },
      { year: 2024, score: 97, model: "o1-preview" },
    ],
  },
  {
    id: "mmlu",
    name: "MMLU (Expert Knowledge)",
    domain: "Reasoning",
    introduced: 2020,
    humanBaseline: 89,
    saturated: 2024,
    dataPoints: [
      { year: 2020, score: 43, model: "GPT-3" },
      { year: 2022, score: 70, model: "Chinchilla" },
      { year: 2023, score: 86, model: "GPT-4" },
      { year: 2024, score: 92, model: "Gemini Ultra" },
    ],
  },
  {
    id: "humaneval",
    name: "HumanEval (Coding)",
    domain: "Coding",
    introduced: 2021,
    humanBaseline: 95,
    saturated: 2024,
    dataPoints: [
      { year: 2021, score: 28, model: "Codex" },
      { year: 2022, score: 47, model: "code-davinci-002" },
      { year: 2023, score: 67, model: "GPT-4" },
      { year: 2024, score: 90, model: "Claude 3.5 Sonnet" },
    ],
  },
  {
    id: "gpqa",
    name: "GPQA Diamond (PhD-level)",
    domain: "Reasoning",
    introduced: 2023,
    humanBaseline: 69,
    saturated: 2024,
    dataPoints: [
      { year: 2023, score: 35, model: "GPT-4" },
      { year: 2024, score: 53, model: "Claude 3 Opus" },
      { year: 2024, score: 72, model: "o1-preview" },
    ],
  },
  {
    id: "aime",
    name: "AIME (Math Competition)",
    domain: "Reasoning",
    introduced: 2024,
    humanBaseline: 85,
    dataPoints: [
      { year: 2024, score: 13, model: "GPT-4o" },
      { year: 2024, score: 74, model: "o1" },
      { year: 2025, score: 87, model: "o3" },
    ],
  },
  {
    id: "swe_bench",
    name: "SWE-bench (Real Code Fixes)",
    domain: "Coding",
    introduced: 2023,
    humanBaseline: 95,
    dataPoints: [
      { year: 2023, score: 1.7, model: "GPT-4" },
      { year: 2024, score: 13, model: "Claude 3.5 Sonnet" },
      { year: 2024, score: 49, model: "SWE-agent+Claude" },
      { year: 2025, score: 72, model: "o3 + Agentix" },
    ],
  },
];

export const ALL_LANES: ResearchLane[] = [
  "algorithm",
  "architecture",
  "hardware",
  "data",
  "optimization",
  "alignment",
  "evaluation",
];

export function getNodesByEra(eraId: EraId): BreakthroughNode[] {
  return nodes.filter((n) => n.era === eraId);
}

export function getChildren(nodeId: string): BreakthroughNode[] {
  return nodes.filter((n) => n.parentIds.includes(nodeId));
}

export function getParents(nodeId: string): BreakthroughNode[] {
  const node = nodes.find((n) => n.id === nodeId);
  if (!node) return [];
  return nodes.filter((n) => node.parentIds.includes(n.id));
}
