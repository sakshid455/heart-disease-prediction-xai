import React, { useState, useMemo } from 'react'
import { ArrowUpDown, Filter, Search, Award, CheckCircle2, Shield } from 'lucide-react'

interface ModelComparisonRecord {
  model: string
  ratio: string
  augmentationPct: number
  accuracy: number
  precision: number
  recall: number
  f1: number
  rocAuc: number
  category: string
  isTopPerformer?: boolean
}

const BENCHMARK_MODELS: ModelComparisonRecord[] = [
  {
    model: 'XGBoost',
    ratio: '200%',
    augmentationPct: 200,
    accuracy: 90.16,
    precision: 84.38,
    recall: 96.43,
    f1: 90.00,
    rocAuc: 93.72,
    category: 'Gradient Boosting',
    isTopPerformer: true,
  },
  {
    model: 'XGBoost',
    ratio: '100%',
    augmentationPct: 100,
    accuracy: 88.52,
    precision: 83.87,
    recall: 92.86,
    f1: 88.14,
    rocAuc: 92.45,
    category: 'Gradient Boosting',
  },
  {
    model: 'XGBoost',
    ratio: '0% (Baseline)',
    augmentationPct: 0,
    accuracy: 85.25,
    precision: 81.25,
    recall: 89.29,
    f1: 85.07,
    rocAuc: 90.15,
    category: 'Gradient Boosting',
  },
  {
    model: 'Random Forest',
    ratio: '100%',
    augmentationPct: 100,
    accuracy: 86.89,
    precision: 83.33,
    recall: 89.29,
    f1: 86.21,
    rocAuc: 93.99,
    category: 'Ensemble (Bagging)',
  },
  {
    model: 'Random Forest',
    ratio: '0% (Baseline)',
    augmentationPct: 0,
    accuracy: 85.25,
    precision: 80.65,
    recall: 89.29,
    f1: 84.75,
    rocAuc: 91.88,
    category: 'Ensemble (Bagging)',
  },
  {
    model: 'Random Forest',
    ratio: '200%',
    augmentationPct: 200,
    accuracy: 85.25,
    precision: 79.41,
    recall: 96.43,
    f1: 87.10,
    rocAuc: 92.12,
    category: 'Ensemble (Bagging)',
  },
  {
    model: 'Logistic Regression',
    ratio: '100%',
    augmentationPct: 100,
    accuracy: 85.25,
    precision: 81.25,
    recall: 89.29,
    f1: 85.07,
    rocAuc: 91.45,
    category: 'Linear Model',
  },
  {
    model: 'Logistic Regression',
    ratio: '200%',
    augmentationPct: 200,
    accuracy: 84.20,
    precision: 78.79,
    recall: 92.86,
    f1: 85.25,
    rocAuc: 89.50,
    category: 'Linear Model',
  },
  {
    model: 'Logistic Regression',
    ratio: '0% (Baseline)',
    augmentationPct: 0,
    accuracy: 84.15,
    precision: 80.00,
    recall: 85.71,
    f1: 82.76,
    rocAuc: 88.52,
    category: 'Linear Model',
  },
  {
    model: 'Support Vector Machine (SVM)',
    ratio: '100%',
    augmentationPct: 100,
    accuracy: 83.61,
    precision: 77.42,
    recall: 85.71,
    f1: 81.36,
    rocAuc: 87.45,
    category: 'Margin-Based',
  },
  {
    model: 'Support Vector Machine (SVM)',
    ratio: '0% (Baseline)',
    augmentationPct: 0,
    accuracy: 81.97,
    precision: 75.00,
    recall: 85.71,
    f1: 80.00,
    rocAuc: 85.60,
    category: 'Margin-Based',
  },
  {
    model: 'LightGBM',
    ratio: '100%',
    augmentationPct: 100,
    accuracy: 88.52,
    precision: 83.87,
    recall: 92.86,
    f1: 88.14,
    rocAuc: 92.80,
    category: 'Gradient Boosting',
  },
]

type SortField = 'model' | 'accuracy' | 'precision' | 'recall' | 'f1' | 'rocAuc'

export const ModelComparisonSection: React.FC = () => {
  const [selectedModel, setSelectedModel] = useState<string>('All')
  const [selectedRatio, setSelectedRatio] = useState<string>('All')
  const [sortField, setSortField] = useState<SortField>('f1')
  const [sortAsc, setSortAsc] = useState<boolean>(false)
  const [searchQuery, setSearchQuery] = useState<string>('')

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortAsc(!sortAsc)
    } else {
      setSortField(field)
      setSortAsc(false)
    }
  }

  const filteredRecords = useMemo(() => {
    return BENCHMARK_MODELS.filter((item) => {
      const matchModel = selectedModel === 'All' || item.model === selectedModel
      const matchRatio =
        selectedRatio === 'All' ||
        (selectedRatio === '0%' && item.augmentationPct === 0) ||
        (selectedRatio === '100%' && item.augmentationPct === 100) ||
        (selectedRatio === '200%' && item.augmentationPct === 200)
      const matchSearch =
        item.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase())
      return matchModel && matchRatio && matchSearch
    }).sort((a, b) => {
      let aVal = a[sortField]
      let bVal = b[sortField]
      if (typeof aVal === 'string') {
        return sortAsc
          ? (aVal as string).localeCompare(bVal as string)
          : (bVal as string).localeCompare(aVal as string)
      }
      return sortAsc ? (aVal as number) - (bVal as number) : (bVal as number) - (aVal as number)
    })
  }, [selectedModel, selectedRatio, sortField, sortAsc, searchQuery])

  return (
    <section id="model-comparison" className="py-16 sm:py-20 bg-[#FAF8F4] border-b border-[#D9C7A5]/40 scroll-mt-20">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#17352D]/10 text-[#17352D] text-xs font-semibold uppercase tracking-wider mb-3">
              <span>Section 2 &bull; Cross-Model Matrix</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#17352D] tracking-tight">
              Model Comparison Matrix
            </h2>
            <p className="mt-2 text-base text-[#4A5550] max-w-xl">
              Inspect verified classification benchmarks across Logistic Regression, Random Forest, XGBoost, LightGBM, and SVM under varying CTGAN augmentation ratios.
            </p>
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-[#5C6B64] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search model or type..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9.5 pr-4 py-2 bg-white rounded-xl border border-[#D9C7A5]/70 text-xs text-[#17352D] placeholder-[#5C6B64] focus:outline-none focus:ring-2 focus:ring-[#3D8068]/30"
            />
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 bg-white p-3.5 rounded-2xl border border-[#D9C7A5]/60 shadow-subtle">
          {/* Model Filter */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-[#5C6B64]">Architecture:</span>
            <div className="flex flex-wrap gap-1">
              {['All', 'XGBoost', 'Random Forest', 'Logistic Regression'].map((m) => (
                <button
                  key={m}
                  onClick={() => setSelectedModel(m)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    selectedModel === m
                      ? 'bg-[#17352D] text-[#F7F4ED]'
                      : 'text-[#5C6B64] hover:bg-[#FAF8F4] hover:text-[#17352D]'
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          {/* Ratio Filter */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-[#5C6B64]">Augmentation:</span>
            <div className="flex gap-1">
              {['All', '0%', '100%', '200%'].map((r) => (
                <button
                  key={r}
                  onClick={() => setSelectedRatio(r)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    selectedRatio === r
                      ? 'bg-[#3D8068] text-[#F7F4ED]'
                      : 'text-[#5C6B64] hover:bg-[#FAF8F4] hover:text-[#17352D]'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Interactive Comparison Table */}
        <div className="bg-white rounded-2xl border border-[#D9C7A5]/60 shadow-subtle overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-[#FAF8F4] border-b border-[#D9C7A5]/50 text-[#17352D] font-bold uppercase tracking-wider">
                  <th
                    onClick={() => handleSort('model')}
                    className="py-3.5 px-4 cursor-pointer hover:bg-[#F2ECE1] transition-colors"
                  >
                    <div className="flex items-center gap-1.5">
                      <span>Model & Category</span>
                      <ArrowUpDown className="w-3 h-3 text-[#5C6B64]" />
                    </div>
                  </th>
                  <th className="py-3.5 px-3">Augmentation</th>
                  <th
                    onClick={() => handleSort('accuracy')}
                    className="py-3.5 px-3 cursor-pointer hover:bg-[#F2ECE1] transition-colors"
                  >
                    <div className="flex items-center gap-1.5">
                      <span>Accuracy</span>
                      <ArrowUpDown className="w-3 h-3 text-[#5C6B64]" />
                    </div>
                  </th>
                  <th
                    onClick={() => handleSort('precision')}
                    className="py-3.5 px-3 cursor-pointer hover:bg-[#F2ECE1] transition-colors"
                  >
                    <div className="flex items-center gap-1.5">
                      <span>Precision</span>
                      <ArrowUpDown className="w-3 h-3 text-[#5C6B64]" />
                    </div>
                  </th>
                  <th
                    onClick={() => handleSort('recall')}
                    className="py-3.5 px-3 cursor-pointer hover:bg-[#F2ECE1] transition-colors"
                  >
                    <div className="flex items-center gap-1.5">
                      <span>Recall</span>
                      <ArrowUpDown className="w-3 h-3 text-[#5C6B64]" />
                    </div>
                  </th>
                  <th
                    onClick={() => handleSort('f1')}
                    className="py-3.5 px-3 cursor-pointer hover:bg-[#F2ECE1] transition-colors"
                  >
                    <div className="flex items-center gap-1.5">
                      <span>F1-Score</span>
                      <ArrowUpDown className="w-3 h-3 text-[#5C6B64]" />
                    </div>
                  </th>
                  <th
                    onClick={() => handleSort('rocAuc')}
                    className="py-3.5 px-4 text-right cursor-pointer hover:bg-[#F2ECE1] transition-colors"
                  >
                    <div className="flex items-center justify-end gap-1.5">
                      <span>ROC-AUC</span>
                      <ArrowUpDown className="w-3 h-3 text-[#5C6B64]" />
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#D9C7A5]/30">
                {filteredRecords.map((item, idx) => (
                  <tr
                    key={idx}
                    className={`transition-colors ${
                      item.isTopPerformer
                        ? 'bg-[#E8EEE8]/40 hover:bg-[#E8EEE8]/70'
                        : 'hover:bg-[#FAF8F4]'
                    }`}
                  >
                    {/* Model & Badge */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2">
                        {item.isTopPerformer && (
                          <Award className="w-4 h-4 text-[#8B6534] shrink-0" />
                        )}
                        <div>
                          <div className="font-bold text-[#17352D] text-xs">
                            {item.model}
                          </div>
                          <div className="text-[10px] text-[#5C6B64]">
                            {item.category}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Ratio */}
                    <td className="py-3.5 px-3">
                      <span className="font-mono text-[11px] px-2 py-0.5 rounded bg-[#FAF8F4] border border-[#D9C7A5]/50 text-[#17352D]">
                        {item.ratio}
                      </span>
                    </td>

                    {/* Accuracy */}
                    <td className="py-3.5 px-3 font-mono font-medium text-[#17352D]">
                      {item.accuracy.toFixed(2)}%
                    </td>

                    {/* Precision */}
                    <td className="py-3.5 px-3 font-mono text-[#4A5550]">
                      {item.precision.toFixed(2)}%
                    </td>

                    {/* Recall */}
                    <td className="py-3.5 px-3 font-mono font-bold text-[#3D8068]">
                      {item.recall.toFixed(2)}%
                    </td>

                    {/* F1 */}
                    <td className="py-3.5 px-3 font-mono font-bold text-[#17352D]">
                      {item.f1.toFixed(2)}%
                    </td>

                    {/* ROC-AUC */}
                    <td className="py-3.5 px-4 text-right font-mono font-bold text-[#8B6534]">
                      {item.rocAuc.toFixed(2)}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-[#FAF8F4] px-5 py-3 border-t border-[#D9C7A5]/40 flex flex-wrap items-center justify-between text-xs text-[#5C6B64]">
            <span>Showing {filteredRecords.length} experimental benchmark configurations.</span>
            <span>Click any column header to sort ascending / descending.</span>
          </div>
        </div>

      </div>
    </section>
  )
}
