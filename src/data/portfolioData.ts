export interface TimelineEntry {
  id: string;
  title: string;
  period: string;
  organization: string;
  description: string;
  side: 'left' | 'right';
  variant: 'accent' | 'light' | 'muted';
}

export interface SkillItem {
  name: string;
  iconKey:
    | 'python'
    | 'sql'
    | 'tensorflow'
    | 'pytorch'
    | 'pandas'
    | 'sklearn'
    | 'r'
    | 'git'
    | 'tableau'
    | 'nlp';
  colorClass: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  tag: string;
  desc: string;
  color: string;
  repoSlug: string;
  architecture: string;
  metrics: string[];
  stack: string[];
}

export interface CertificateItem {
  id: string;
  title: string;
  issuer: string;
  credentialId: string;
  issued: string;
  iconKey: 'certificate' | 'medal' | 'code';
  boxBgClass: string;
  iconColorClass: string;
  topics: string[];
}

export const TIMELINE_ENTRIES: TimelineEntry[] = [
  {
    id: 'joint-tech-head',
    title: 'Joint Technical Head',
    period: '2022 – 2024',
    organization: 'Novus Region Club, DYPSN',
    description:
      'Guided junior members in data preprocessing, machine learning model development, and troubleshooting. Provided structured technical support for AI/ML projects.',
    side: 'right',
    variant: 'accent',
  },
  {
    id: 'be-ai-ds',
    title: 'BSIT — Data & Business Analytics',
    period: '2022 – 2026',
    organization: 'Manila, Philippines',
    description:
      'Pursuing an IT degree specializing in Data & Business Analytics, with focus on Data Science, Machine Learning, and end-to-end AI workflows.',
    side: 'left',
    variant: 'accent',
  },
  {
    id: 'hsc-12',
    title: 'Higher Secondary (12th)',
    period: '2021 – 2023',
    organization: 'DYVSNM, Shiral, Satara',
    description:
      'Completed secondary education with a focus on Computer Science fundamentals and computational logic.',
    side: 'right',
    variant: 'light',
  },
  {
    id: 'ssc-10',
    title: 'Secondary School (10th)',
    period: '2021',
    organization: 'Shiral, Satara',
    description:
      'Finished foundational schooling with consistent academic performance across science and mathematics.',
    side: 'left',
    variant: 'muted',
  },
];

export const SKILLS: SkillItem[] = [
  { name: 'Python', iconKey: 'python', colorClass: 'text-white' },
  { name: 'SQL', iconKey: 'sql', colorClass: 'text-zinc-400' },
  { name: 'TensorFlow', iconKey: 'tensorflow', colorClass: 'text-[var(--lime-green)]' },
  { name: 'PyTorch', iconKey: 'pytorch', colorClass: 'text-white' },
  { name: 'Pandas', iconKey: 'pandas', colorClass: 'text-zinc-400' },
  { name: 'Scikit-Learn', iconKey: 'sklearn', colorClass: 'text-[var(--lime-green)]' },
  { name: 'R Lang', iconKey: 'r', colorClass: 'text-white' },
  { name: 'Git / GitHub', iconKey: 'git', colorClass: 'text-zinc-400' },
  { name: 'Tableau', iconKey: 'tableau', colorClass: 'text-[var(--lime-green)]' },
  { name: 'NLP / CV', iconKey: 'nlp', colorClass: 'text-white' },
];

export const PROJECTS: ProjectItem[] = [
  {
    id: 'sentiment-flow',
    title: 'Sentiment Flow Engine',
    tag: 'NLP / PYTHON',
    desc: 'Real-time analysis of streaming social data using BERT-based models.',
    color: 'var(--lime-green)',
    repoSlug: 'eldreiacero/sentiment-flow-engine',
    architecture:
      'Asynchronous Kafka-style token ingestion pipeline feeding a distilled Transformer classifier with sliding-window polarity aggregation.',
    metrics: ['93.4% Macro F1 on benchmark tweets', '18ms median inference latency', '3-class sentiment calibration'],
    stack: ['Python', 'PyTorch', 'Transformers', 'FastAPI'],
  },
  {
    id: 'neuroscan-vision',
    title: 'NeuroScan Vision',
    tag: 'DL / PYTORCH',
    desc: 'Binary classification system for medical imaging anomaly detection.',
    color: 'white',
    repoSlug: 'eldreiacero/neuroscan-vision',
    architecture:
      'ResNet-50 backbone with Grad-CAM saliency overlays and focal loss optimization to counter class imbalance across radiological slices.',
    metrics: ['0.96 AUC-ROC validation score', 'Grad-CAM heatmaps for interpretability', 'Automated DICOM preprocessing'],
    stack: ['PyTorch', 'TorchVision', 'OpenCV', 'NumPy'],
  },
  {
    id: 'predictive-markets',
    title: 'Predictive Markets',
    tag: 'ML / SKLEARN',
    desc: 'Time-series forecasting model for high-frequency trading simulations.',
    color: 'var(--lime-green)',
    repoSlug: 'eldreiacero/predictive-markets',
    architecture:
      'Walk-forward gradient boosted ensemble paired with rolling volatility features and regime-switching backtest harnesses.',
    metrics: ['Walk-forward cross-validation', 'Rolling Sharpe diagnostic suite', 'Zero look-ahead leakage'],
    stack: ['Scikit-Learn', 'Pandas', 'XGBoost', 'Python'],
  },
  {
    id: 'nexus-recommendation',
    title: 'Nexus Recommendation',
    tag: 'DATA SCIENCE',
    desc: 'Collaborative filtering engine for personalized content discovery.',
    color: 'white',
    repoSlug: 'eldreiacero/nexus-recommendation',
    architecture:
      'Hybrid matrix factorization (ALS) combined with cosine content embeddings to resolve cold-start items smoothly.',
    metrics: ['Top-10 Recall@K improvement +22%', 'Sub-15ms vector lookup', 'Cold-start fallback ranking'],
    stack: ['Python', 'Scikit-Learn', 'SQL', 'Pandas'],
  },
  {
    id: 'autonomous-path-ai',
    title: 'Autonomous Path-AI',
    tag: 'REINFORCE / ML',
    desc: 'Route optimization using custom reinforcement learning agents.',
    color: 'var(--lime-green)',
    repoSlug: 'eldreiacero/autonomous-path-ai',
    architecture:
      'Deep Q-Network (DQN) with experience replay buffer and epsilon-greedy curriculum over dynamic obstacle grids.',
    metrics: ['98.1% optimal path convergence', 'Dynamic obstacle re-routing', 'Episodic reward telemetry'],
    stack: ['PyTorch', 'Python', 'Gymnasium', 'NumPy'],
  },
  {
    id: 'dataviz-matrix',
    title: 'DataViz Matrix 1.0',
    tag: 'ANALYTICS',
    desc: 'Interactive dashboard for multidimensional data visualization.',
    color: 'white',
    repoSlug: 'eldreiacero/dataviz-matrix',
    architecture:
      'PCA and t-SNE dimensionality reduction pipeline paired with synchronized Tableau/Plotly exploratory views.',
    metrics: ['64-dim to 3-dim projection', 'Outlier cluster isolation', 'Exportable SVG & CSV snapshots'],
    stack: ['Tableau', 'Python', 'Pandas', 'R Lang'],
  },
];

export const CERTIFICATES: CertificateItem[] = [
  {
    id: 'ml-spec',
    title: 'Machine Learning Specialization',
    issuer: 'Coursera // DeepLearning.AI',
    credentialId: 'DLAI-MLS-2024-8914',
    issued: '2024',
    iconKey: 'certificate',
    boxBgClass: 'bg-[var(--lime-green)]',
    iconColorClass: 'text-black',
    topics: [
      'Supervised Machine Learning: Regression & Classification',
      'Advanced Learning Algorithms & Neural Networks',
      'Unsupervised Learning, Recommenders & Reinforcement Learning',
    ],
  },
  {
    id: 'ds-prof',
    title: 'Data Science Professional',
    issuer: 'IBM // Coursera',
    credentialId: 'IBM-DSPC-2024-4410',
    issued: '2024',
    iconKey: 'medal',
    boxBgClass: 'bg-white',
    iconColorClass: 'text-black',
    topics: [
      'Databases and SQL for Data Science with Python',
      'Exploratory Data Analysis & Visualization',
      'Applied Data Science Capstone',
    ],
  },
  {
    id: 'nndl-nptel',
    title: 'Neural Networks & Deep Learning',
    issuer: 'NPTEL // SWAYAM',
    credentialId: 'NPTEL24CS-7731',
    issued: '2024',
    iconKey: 'code',
    boxBgClass: 'bg-zinc-700',
    iconColorClass: 'text-white',
    topics: [
      'Backpropagation, Optimization & Regularization',
      'Convolutional Neural Networks & Visual Recognition',
      'Sequence Modeling with RNNs and Attention',
    ],
  },
];
