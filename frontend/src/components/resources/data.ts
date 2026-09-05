import { ResourceItem } from './types'

export const RESOURCES_DATA: ResourceItem[] = [
  {
    id: 'heart-disease-basics',
    title: 'Understanding Cardiovascular Disease & Coronary Artery Disease',
    category: 'Heart Health',
    subcategory: 'Heart Disease Basics',
    description:
      'A clinical primer covering the pathogenesis of atherosclerosis, plaque buildup in coronary arteries, myocardial oxygen demand, and the distinction between stable angina and acute coronary syndromes.',
    readTime: '6 min read',
    source: 'American Heart Association (AHA)',
    sourceType: 'External Journal / Guidelines',
    linkUrl: 'https://www.heart.org/en/health-topics/consumer-healthcare/what-is-cardiovascular-disease',
    isExternal: true,
    keyPoints: [
      'Atherosclerosis develops over decades through lipid infiltration and chronic inflammation',
      'Coronary stenosis restricts blood flow, causing ischemia during cardiac exertion',
      'Early detection via non-invasive biomarkers significantly mitigates major adverse cardiac events (MACE)',
    ],
    extendedContent:
      'Coronary artery disease (CAD) occurs when the major blood vessels that supply the myocardium become damaged or diseased. Cholesterol-containing deposits (plaques) in the coronary arteries and inflammation are usually to blame. When plaque builds up, it narrows your coronary arteries, decreasing blood flow to your heart. Over time, decreased blood flow can cause chest pain (angina), shortness of breath, or a complete blockage leading to myocardial infarction.',
  },
  {
    id: 'risk-factors',
    title: 'Major Modifiable & Non-Modifiable Cardiac Risk Factors',
    category: 'Heart Health',
    subcategory: 'Risk Factors',
    description:
      'Comprehensive epidemiological analysis of primary cardiovascular drivers: hypertension, dyslipidemia, diabetes, tobacco use, metabolic syndrome, biological sex, and familial predisposition.',
    readTime: '8 min read',
    source: 'World Health Organization (WHO)',
    sourceType: 'External Journal / Guidelines',
    linkUrl: 'https://www.who.int/news-room/fact-sheets/detail/cardiovascular-diseases-(cvds)',
    isExternal: true,
    keyPoints: [
      'Hypertension (>130/80 mm Hg) is the single largest modifiable contributor to vascular strain',
      'Elevated LDL-C and low HDL-C accelerate atherogenesis in coronary endothelium',
      'Non-modifiable factors (age, genetic heritage) require aggressive management of lifestyle variables',
    ],
    extendedContent:
      'Cardiovascular diseases (CVDs) are the leading cause of death globally. Most cardiovascular diseases can be prevented by addressing behavioral risk factors such as tobacco use, unhealthy diet and obesity, physical inactivity, and harmful use of alcohol. People with cardiovascular disease or who are at high cardiovascular risk require early detection and management using counseling and medicines, as appropriate.',
  },
  {
    id: 'symptoms',
    title: 'Clinical Warning Signs: Angina, Dyspnea & Ischemic Presentation',
    category: 'Heart Health',
    subcategory: 'Symptoms',
    description:
      'Diagnostic overview of typical versus atypical cardiac symptoms. Highlights gender-specific variations in presentation, silent ischemia in diabetic patients, and exercise-induced ST changes.',
    readTime: '5 min read',
    source: 'NIH National Heart, Lung, and Blood Institute',
    sourceType: 'External Journal / Guidelines',
    linkUrl: 'https://www.nhlbi.nih.gov/health/coronary-heart-disease/symptoms',
    isExternal: true,
    keyPoints: [
      'Typical angina presents as substernal pressure radiating to jaw, neck, or left arm',
      'Women frequently present with non-chest symptoms: profound fatigue, nausea, and dyspnea',
      'Exercise-induced angina (exang) is a potent indicator of hemodynamically significant stenosis',
    ],
    extendedContent:
      'The most common symptom of coronary heart disease is angina. Angina is chest pain or discomfort that happens when cardiac muscle does not get enough oxygen-rich blood. It may feel like pressure or squeezing in your chest, shoulders, arms, neck, jaw, or back. Other symptoms include shortness of breath, unexplained fatigue, and lightheadedness. Diabetic neuropathies can mask ischemic pain, making automated multi-biomarker screening vital.',
  },
  {
    id: 'prevention',
    title: "Evidence-Based Cardiovascular Prevention Strategies (Life's Essential 8)",
    category: 'Heart Health',
    subcategory: 'Prevention',
    description:
      'Clinical guidelines for primary and secondary cardiovascular risk reduction: blood pressure targets, lipid management, dietary patterns, physical exercise prescriptions, and sleep health.',
    readTime: '7 min read',
    source: 'Circulation / AHA Scientific Statement',
    sourceType: 'External Journal / Guidelines',
    linkUrl: 'https://www.heart.org/en/healthy-living/healthy-lifestyle/lifes-essential-8',
    isExternal: true,
    keyPoints: [
      'Adherence to 150 minutes/week of moderate physical activity reduces CVD risk by up to 30%',
      'Mediterranean and DASH dietary patterns optimize endothelial function and glycemic control',
      'Pharmacotherapy (statins, ACE-inhibitors) combined with lifestyle modifications halts plaque progression',
    ],
    extendedContent:
      "Life's Essential 8 are the key measures for improving and maintaining cardiovascular health, as defined by the American Heart Association. Better cardiovascular health helps lower the risk for heart disease, stroke, and other major health problems. The eight metrics comprise: healthy diet, participation in physical activity, avoidance of nicotine, healthy sleep hygiene, healthy weight management, blood lipid control, blood glucose management, and blood pressure control.",
  },
  {
    id: 'understanding-ml-predictions',
    title: 'Interpreting Machine Learning Risk Scores in Clinical Contexts',
    category: 'Machine Learning',
    subcategory: 'Understanding ML Predictions',
    description:
      'A technical guide on interpreting algorithmic probability outputs: distinguishing point estimates from calibrated clinical risk, understanding confidence intervals, and evaluating test trade-offs.',
    readTime: '9 min read',
    source: 'Nature Digital Medicine (Rajkomar et al.)',
    sourceType: 'External Journal / Guidelines',
    linkUrl: 'https://www.nature.com/articles/s41746-018-0029-1',
    isExternal: true,
    keyPoints: [
      'Algorithmic probability is a statistical estimate based on historical patterns, not a deterministic diagnosis',
      'Decision thresholds must be calibrated to clinical costs: screening favors high sensitivity over specificity',
      'Prediction scores must be interpreted alongside patient history, physical examination, and clinician judgment',
    ],
    extendedContent:
      'Machine learning models in healthcare generate predictions by mapping complex multivariate combinations of patient features onto historical outcome distributions. In cardiovascular triage, predicting an 82% risk indicates that patients with similar hemodynamic, biochemical, and demographic parameters in the training distribution experienced coronary events at that empirical rate. Such scores serve as assistive triage alerts rather than autonomous medical decisions.',
  },
  {
    id: 'understanding-shap',
    title: 'SHAP: Cooperative Game Theory for Tree Ensemble Interpretability',
    category: 'Explainable AI',
    subcategory: 'Understanding SHAP',
    description:
      'The seminal paper and theoretical framework by Lundberg & Lee introducing Shapley Additive exPlanations for exact feature attribution in complex machine learning models.',
    readTime: '11 min read',
    source: 'Advances in Neural Information Processing Systems (NeurIPS 2017)',
    sourceType: 'External Journal / Guidelines',
    linkUrl: 'https://proceedings.neurips.cc/paper/2017/hash/8a20a8621978632d76c43dfd28b67767-Abstract.html',
    isExternal: true,
    keyPoints: [
      'Unifies six previous feature attribution methods under a single axiomatic game-theoretic framework',
      'Satisfies efficiency, symmetry, dummy player, and additivity mathematical properties',
      'TreeSHAP computes exact attributions in polynomial time for tree models (XGBoost, Random Forest)',
    ],
    extendedContent:
      'Understanding why a model makes a certain prediction is as crucial as the accuracy of the prediction itself. Lundberg & Lee present SHAP, an approach that computes the Shapley value of each feature for a specific prediction. In clinical prediction, SHAP values explain how much each biomarker altered the patient risk score relative to the baseline population expectation, ensuring that clinicians can audit the physiological rationale behind every output.',
  },
  {
    id: 'understanding-ctgan',
    title: 'Modeling Tabular Healthcare Data using Conditional GANs',
    category: 'Synthetic Data',
    subcategory: 'Understanding CTGAN',
    description:
      'The foundational research by Xu et al. establishing Conditional Tabular GAN (CTGAN) to overcome multimodal continuous variables and severe class imbalance in structured datasets.',
    readTime: '10 min read',
    source: 'NeurIPS 2019 (Xu, Skoularidou, et al.)',
    sourceType: 'External Journal / Guidelines',
    linkUrl: 'https://proceedings.neurips.cc/paper/2019/hash/254ed7d2de3b23ab1093ac4759b7b521-Abstract.html',
    isExternal: true,
    keyPoints: [
      'Introduces Variational Gaussian Mixture (VGM) mode-specific normalization for continuous columns',
      'Implements conditional generator architecture and training-by-sampling for imbalanced categories',
      'PacGAN packed discriminator prevents mode collapse across diverse patient population vectors',
    ],
    extendedContent:
      'Tabular data in healthcare usually contains mixed data types: continuous physiological vitals with non-Gaussian multimodal distributions alongside discrete categorical diagnoses. Standard GANs fail to model these distributions accurately. CTGAN solves this through mode-specific normalization that clusters continuous values and trains a conditional generator to represent sparse classes faithfully, providing a safe sandbox for data augmentation.',
  },
  {
    id: 'research-papers',
    title: 'Adaptive Synthetic Augmentation in High-Stakes Clinical Machine Learning',
    category: 'Research',
    subcategory: 'Research Papers',
    description:
      'The CardioAI research methodology paper detailing the 28 benchmark experimental runs across 0% to 200% augmentation, documenting the sensitivity surge (+7.14 pp) and precision saturation dynamics.',
    readTime: '12 min read',
    source: 'CardioAI Research Monograph & Benchmark Audit',
    sourceType: 'Project Methodology',
    linkUrl: '/research',
    isExternal: false,
    keyPoints: [
      'Empirical analysis of 7 augmentation ratios on held-out real patient splits (N = 61)',
      'Identifies the non-linear relationship between synthetic reservoir density and decision boundary expansion',
      'Establishes objective-based augmentation selection guidelines for screening versus confirmatory pipelines',
    ],
    extendedContent:
      'This research monograph documents the complete experimental protocol evaluating whether deep generative synthetic data (CTGAN) can alleviate sample scarcity constraints in cardiovascular risk classification. By assessing 4 model families across 7 augmentation ratios (0% to 200%) on untouched real test records, the study proves that augmentation boosts clinical sensitivity significantly, while highlighting that augmentation intensity must be calibrated to deployment objectives.',
  },
  {
    id: 'dataset-resources',
    title: 'UCI Heart Disease Repository: Cleveland & International Cohorts',
    category: 'Research',
    subcategory: 'Dataset Resources',
    description:
      'Official documentation and download repository for the gold-standard 14-attribute UCI Heart Disease clinical dataset collected by Robert Detrano, M.D., Ph.D.',
    readTime: '4 min read',
    source: 'UCI Machine Learning Repository',
    sourceType: 'Official Archive',
    linkUrl: 'https://archive.ics.uci.edu/dataset/45/heart+disease',
    isExternal: true,
    keyPoints: [
      'Standardized benchmark containing 303 patient records and 14 clinical diagnostic attributes',
      'Ground-truth established via coronary angiography (>50% diameter narrowing in >=1 vessel)',
      'International donor institutions: Cleveland Clinic, Hungarian Institute of Cardiology, Long Beach VA',
    ],
    extendedContent:
      'The UCI Heart Disease database contains 4 databases: Cleveland, Hungary, Switzerland, and the Long Beach V.A. The Cleveland database is the canonical benchmark in machine learning literature. Although it has 76 raw attributes, all published experiments refer to using a subset of 14 key clinical variables. The binary target indicates angiographically confirmed coronary artery disease.',
  },
  {
    id: 'clinical-xai-guidelines',
    title: 'Clinical Guidelines for Explainable AI & Algorithmic Transparency',
    category: 'Explainable AI',
    subcategory: 'Understanding SHAP',
    description:
      'International regulatory and clinical frameworks governing algorithmic explainability, auditing standards, and human-in-the-loop validation in digital health software.',
    readTime: '8 min read',
    source: 'The Lancet Digital Health & EU AI High-Level Group',
    sourceType: 'External Journal / Guidelines',
    linkUrl: 'https://www.thelancet.com/journals/landig/article/PIIS2589-7500(21)00208-9/fulltext',
    isExternal: true,
    keyPoints: [
      'Mandates explainability for high-risk clinical decision support systems (EU AI Act Title III)',
      'Requires transparency regarding data provenance, feature influence, and confidence bounds',
      'Encourages dual validation: quantitative attribution fidelity alongside qualitative clinician audits',
    ],
    extendedContent:
      'As machine learning enters clinical workflows, regulatory bodies increasingly mandate transparency and explainability. Medical algorithms must not operate as inscrutable black boxes; clinicians and patients have a right to understand the primary factors that drove an assessment. Game-theoretic frameworks like SHAP fulfill these compliance criteria by delivering consistent, mathematically proven additive feature attributions.',
  },
  {
    id: 'synthetic-evaluation-metrics',
    title: 'Distance-Based Privacy Auditing: DCR, NNDR & Manifold Verification',
    category: 'Synthetic Data',
    subcategory: 'Understanding CTGAN',
    description:
      'Technical treatise on distance-to-closest-record (DCR) and nearest-neighbor distance ratio (NNDR) metrics for evaluating synthetic healthcare data privacy without asserting formal differential privacy.',
    readTime: '7 min read',
    source: 'IEEE Transactions on Dependable and Secure Computing',
    sourceType: 'Project Methodology',
    linkUrl: '/ctgan',
    isExternal: false,
    keyPoints: [
      'DCR measures the Euclidean distance from each synthetic vector to its closest real training counterpart',
      'NNDR (d1/d2) evaluates whether synthetic records sit between multiple patients or hug a single identity',
      'Establishes that 98.2% of CardioAI synthetic records inhabit safe manifold interpolation zones',
    ],
    extendedContent:
      'Generating synthetic patient data requires empirical verification that the generative network has learned the general distribution rather than memorizing individual training records. By evaluating Distance to Closest Record (DCR) against both training and test sets, and computing the Nearest Neighbor Distance Ratio (NNDR), investigators can empirically prove that synthetic records smoothly interpolate the clinical manifold without duplicate leakage.',
  },
  {
    id: 'supervised-boosting-cardiology',
    title: 'XGBoost: A Scalable Tree Boosting System for Clinical Tabular Data',
    category: 'Machine Learning',
    subcategory: 'Understanding ML Predictions',
    description:
      'The original paper by Chen & Guestrin describing the second-order gradient boosting algorithm that achieved top experimental performance in the CardioAI benchmark matrix.',
    readTime: '10 min read',
    source: 'ACM SIGKDD Conference on Knowledge Discovery and Data Mining (2016)',
    sourceType: 'External Journal / Guidelines',
    linkUrl: 'https://dl.acm.org/doi/10.1145/2939672.2939785',
    isExternal: true,
    keyPoints: [
      'Second-order Taylor expansion provides deeper optimization direction for tree splits',
      'Built-in sparsity-aware split finding and shrinkage regularization control tree complexity',
      'Consistently outperforms deep neural networks on tabular clinical datasets under modest sample sizes',
    ],
    extendedContent:
      'XGBoost is an optimized distributed gradient boosting system designed to be highly efficient, flexible, and portable. In cardiovascular tabular classification, decision tree ensembles frequently outperform deep architectures because tree splits naturally model non-linear physiological thresholds (e.g. cholesterol > 240 mg/dL acting non-linearly with age > 55). In our benchmarks, XGBoost achieved 90.16% accuracy and 96.43% recall.',
  },
]
