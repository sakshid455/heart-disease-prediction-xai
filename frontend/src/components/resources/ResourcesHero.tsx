import React from 'react'
import { BookOpen, Search, Sparkles, Filter, X } from 'lucide-react'
import { ResourceCategory } from './types'

interface ResourcesHeroProps {
  searchQuery: string
  onSearchChange: (q: string) => void
  selectedCategory: ResourceCategory
  onSelectCategory: (cat: ResourceCategory) => void
  totalCount: number
  filteredCount: number
}

const CATEGORIES: ResourceCategory[] = [
  'All',
  'Heart Health',
  'Machine Learning',
  'Synthetic Data',
  'Explainable AI',
  'Research',
]

export const ResourcesHero: React.FC<ResourcesHeroProps> = ({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onSelectCategory,
  totalCount,
  filteredCount,
}) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#FAF8F4] via-[#F7F4ED] to-[#EFEAE1] border-b border-[#D9C7A5]/40 py-16 lg:py-24">
      {/* Ambient background glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#3D8068]/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 left-10 w-80 h-80 bg-[#C87868]/8 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl space-y-6">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#17352D]/5 border border-[#17352D]/15 text-[#17352D] text-xs font-semibold uppercase tracking-wider font-mono">
            <BookOpen className="w-3.5 h-3.5 text-[#3D8068]" />
            <span>CardioAI Knowledge Hub &bull; Literature & Guidelines</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-[#17352D] tracking-tight leading-[1.12]">
            Evidence-Based Medical & AI Resources
          </h1>

          <p className="text-lg sm:text-xl text-[#4A5550] leading-relaxed max-w-2xl font-light">
            Explore peer-reviewed cardiology guidelines, machine learning publications, CTGAN synthetic data monographs, and clinical dataset documentation.
          </p>

          {/* Search Input Box */}
          <div className="relative max-w-xl">
            <Search className="w-5 h-5 text-[#5C6B64] absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by topic, keyword, author, or guideline..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-12 pr-10 py-3.5 bg-white rounded-2xl border border-[#D9C7A5] text-sm text-[#17352D] placeholder-[#5C6B64] shadow-subtle focus:outline-none focus:ring-2 focus:ring-[#3D8068]/30 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-[#5C6B64] hover:text-[#17352D]"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Category Filter Chips with Smooth Animations */}
          <div className="pt-2">
            <div className="flex items-center gap-2 mb-2.5 text-xs font-bold uppercase tracking-wider text-[#5C6B64]">
              <Filter className="w-3.5 h-3.5 text-[#3D8068]" />
              <span>Browse Categories:</span>
            </div>

            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => {
                const isSelected = selectedCategory === cat
                return (
                  <button
                    key={cat}
                    onClick={() => onSelectCategory(cat)}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 ${
                      isSelected
                        ? 'bg-[#17352D] text-[#F7F4ED] shadow-sm scale-102 ring-2 ring-[#3D8068]/30'
                        : 'bg-white/80 text-[#4A5550] border border-[#D9C7A5]/60 hover:bg-white hover:text-[#17352D]'
                    }`}
                  >
                    {cat}
                  </button>
                )
              })}
            </div>
          </div>

          <div className="pt-2 text-xs text-[#5C6B64] font-medium">
            Showing <strong className="text-[#17352D] font-mono">{filteredCount}</strong> of{' '}
            <strong className="text-[#17352D] font-mono">{totalCount}</strong> verified resources
          </div>

        </div>
      </div>
    </section>
  )
}
