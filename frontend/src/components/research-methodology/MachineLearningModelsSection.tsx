import React from 'react'
import { Cpu, Zap, GitBranch, Layers, ShieldCheck, CheckCircle } from 'lucide-react'

interface ModelCard {
  name: string
  family: string
  paradigm: string
  hyperparameters: string
  description: string
  pros: string
  cons: string
}

const EVALUATED_MODELS: ModelCard[] = [
  {
    name: 'Logistic Regression',
    family: 'Linear Model',
    paradigm: 'Log-Odds Hyperplane',
    hyperparameters: 'C = 1.0, L2 penalty, max_iter = 1000',
    description:
      'A foundational generalized linear model calculating the logistic transformation of weighted biomarker inputs. Establishes the standard baseline for linear separability.',
    pros: 'High clinical interpretability, fast convergence, probabilistic calibration.',
    cons: 'Cannot natively model complex non-linear feature interactions without explicit polynomial terms.',
  },
  {
    name: 'Random Forest',
    family: 'Ensemble (Bagging)',
    paradigm: 'Bootstrap Aggregated Decision Trees',
    hyperparameters: 'n_estimators = 100, max_depth = 8, min_samples_split = 4',
    description:
      'Constructs an ensemble of decorrelated decision trees using random feature subsampling. Aggregates predictions via majority voting to reduce variance.',
    pros: 'Robust against overfitting, resilient to monotonic feature scaling, handles non-linear interactions.',
    cons: 'Higher inference latency than linear models; ensemble voting lacks closed-form equation.',
  },
  {
    name: 'XGBoost',
    family: 'Gradient Boosting',
    paradigm: 'Second-Order Gradient Descent on Trees',
    hyperparameters: 'learning_rate = 0.05, max_depth = 4, subsample = 0.8, n_estimators = 150',
    description:
      'Sequentially fits decision trees to the negative gradient of the loss function using exact second-order Taylor expansions with built-in L1/L2 regularization.',
    pros: 'Highest overall experimental performance (90.16% accuracy, 96.43% recall), exceptional discriminative power.',
    cons: 'Requires careful regularization tuning to avoid fitting to synthetic generative noise.',
  },
  {
    name: 'LightGBM',
    family: 'Gradient Boosting',
    paradigm: 'Histogram-Based Leaf-Wise Growth',
    hyperparameters: 'num_leaves = 31, learning_rate = 0.05, feature_fraction = 0.8',
    description:
      'Implements Gradient-based One-Side Sampling (GOSS) and Exclusive Feature Bundling (EFB) for high-speed histogram tree construction.',
    pros: 'Rapid training speed, competitive accuracy (88.52%), memory-efficient binning.',
    cons: 'Leaf-wise tree growth can overfit on very small training sample sizes if unconstrained.',
  },
  {
    name: 'Support Vector Machine (SVM)',
    family: 'Kernel Machine',
    paradigm: 'Maximum Margin Hyperplane (RBF)',
    hyperparameters: 'C = 1.0, kernel = "rbf", gamma = "scale"',
    description:
      'Maps input clinical vectors into an infinite-dimensional Hilbert space via the Radial Basis Function kernel to identify the optimal separating hyperplane.',
    pros: 'Effective in high-dimensional spaces with clear margins of separation.',
    cons: 'Sensitive to probability calibration scaling; less stable under dense synthetic augmentations.',
  },
]

export const MachineLearningModelsSection: React.FC = () => {
  return (
    <section className="py-16 sm:py-20 bg-white border-b border-[#D9C7A5]/40">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#17352D]/10 text-[#17352D] text-xs font-semibold uppercase tracking-wider mb-3">
            <span>Section 5 &bull; Machine Learning Classifiers</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#17352D] tracking-tight">
            Evaluated Supervised Learning Architectures
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#4A5550] leading-relaxed">
            To assess the generalizability of CTGAN synthetic augmentation, we evaluated five structurally distinct machine learning paradigms ranging from linear models to gradient-boosted decision trees.
          </p>
        </div>

        {/* Model Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {EVALUATED_MODELS.map((m, idx) => (
            <div
              key={m.name}
              className={`rounded-2xl p-6 border transition-all flex flex-col justify-between ${
                m.name === 'XGBoost'
                  ? 'bg-[#FAF8F4] border-[#17352D] shadow-elevated ring-2 ring-[#3D8068]/20'
                  : 'bg-white border-[#D9C7A5]/60 shadow-subtle hover:-translate-y-1'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#E8EEE8] text-[#17352D]">
                    {m.family}
                  </span>
                  {m.name === 'XGBoost' && (
                    <span className="text-[10px] font-bold text-[#8B6534] bg-[#FFF2DE] px-2 py-0.5 rounded">
                      Top Performer
                    </span>
                  )}
                </div>

                <h3 className="font-serif text-xl font-bold text-[#17352D] mb-1">
                  {m.name}
                </h3>

                <div className="text-xs text-[#5C6B64] font-mono mb-3">
                  {m.paradigm}
                </div>

                <p className="text-xs text-[#4A5550] leading-relaxed mb-4">
                  {m.description}
                </p>
              </div>

              <div className="pt-3 border-t border-[#D9C7A5]/40 space-y-2 text-[11px]">
                <div>
                  <strong className="text-[#3D8068]">Strength: </strong>
                  <span className="text-[#5C6B64]">{m.pros}</span>
                </div>
                <div>
                  <strong className="text-[#8B6534]">Limitation: </strong>
                  <span className="text-[#5C6B64]">{m.cons}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
