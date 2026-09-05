import React from 'react'
import { ExternalLink, BookOpen, Clock, ArrowRight, Sparkles } from 'lucide-react'
import { ResourceItem } from './types'

interface ResourceCardProps {
  item: ResourceItem
  onOpenModal: (item: ResourceItem) => void
}

export const ResourceCard: React.FC<ResourceCardProps> = ({ item, onOpenModal }) => {
  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case 'Heart Health':
        return 'bg-[#C87868]/15 text-[#8A3A2C] border-[#C87868]/30'
      case 'Machine Learning':
        return 'bg-[#17352D]/10 text-[#17352D] border-[#17352D]/20'
      case 'Synthetic Data':
        return 'bg-[#3D8068]/15 text-[#17352D] border-[#3D8068]/30'
      case 'Explainable AI':
        return 'bg-[#8B6534]/15 text-[#8B6534] border-[#8B6534]/30'
      case 'Research':
        return 'bg-[#17352D] text-[#D9C7A5] border-[#17352D]'
      default:
        return 'bg-[#FAF8F4] text-[#17352D] border-[#D9C7A5]'
    }
  }

  return (
    <div className="bg-white rounded-2xl p-6 sm:p-7 border border-[#D9C7A5]/60 shadow-subtle hover:shadow-elevated hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group">
      <div>
        {/* Top Badges */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span
            className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${getCategoryColor(
              item.category
            )}`}
          >
            {item.category}
          </span>
          <span className="text-[11px] font-mono text-[#5C6B64] flex items-center gap-1">
            <Clock className="w-3 h-3 text-[#3D8068]" />
            {item.readTime}
          </span>
        </div>

        {/* Subcategory */}
        <div className="text-[11px] font-semibold text-[#8B6534] uppercase tracking-wider mb-1.5">
          {item.subcategory}
        </div>

        {/* Title */}
        <h3 className="font-serif text-xl font-bold text-[#17352D] mb-3 leading-snug group-hover:text-[#3D8068] transition-colors">
          {item.title}
        </h3>

        {/* Description */}
        <p className="text-xs sm:text-[13px] text-[#4A5550] leading-relaxed mb-6 font-normal">
          {item.description}
        </p>
      </div>

      {/* Footer: Source + Read More CTA */}
      <div className="pt-4 border-t border-[#D9C7A5]/40 flex items-center justify-between gap-3">
        <span className="text-[11px] text-[#5C6B64] font-medium truncate max-w-[180px]">
          {item.source}
        </span>

        <button
          onClick={() => onOpenModal(item)}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#FAF8F4] hover:bg-[#17352D] text-[#17352D] hover:text-[#F7F4ED] border border-[#D9C7A5]/60 text-xs font-semibold transition-all duration-200 shadow-2xs group-hover:border-[#17352D]"
        >
          <span>Read More</span>
          {item.isExternal ? (
            <ExternalLink className="w-3 h-3" />
          ) : (
            <ArrowRight className="w-3 h-3" />
          )}
        </button>
      </div>
    </div>
  )
}
