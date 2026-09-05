import React from 'react'
import { X, ExternalLink, BookOpen, Clock, ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { ResourceItem } from './types'

interface ResourceDetailsModalProps {
  resource: ResourceItem | null
  onClose: () => void
}

export const ResourceDetailsModal: React.FC<ResourceDetailsModalProps> = ({
  resource,
  onClose,
}) => {
  if (!resource) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-navy-950/60 backdrop-blur-sm animate-fadeIn">
      <div
        className="bg-white rounded-3xl max-w-2xl w-full border border-[#D9C7A5]/70 shadow-elevated overflow-hidden flex flex-col max-h-[90vh] animate-scaleUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-6 sm:p-8 bg-[#FAF8F4] border-b border-[#D9C7A5]/50 flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded bg-[#17352D] text-[#D9C7A5]">
                {resource.category}
              </span>
              <span className="text-xs text-[#5C6B64] font-medium">
                {resource.subcategory}
              </span>
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#17352D] leading-snug">
              {resource.title}
            </h3>

            <div className="flex items-center gap-4 text-xs text-[#5C6B64] mt-3">
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#3D8068]" />
                <span>{resource.readTime}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-[#8B6534]" />
                <span>{resource.source}</span>
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-[#5C6B64] hover:text-[#17352D] hover:bg-white transition-colors shrink-0"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-[#4A5550] text-sm leading-relaxed">
          {/* Extended Content */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-base text-[#17352D]">
              Overview & Clinical Significance
            </h4>
            <p>{resource.extendedContent}</p>
          </div>

          {/* Key Takeaways */}
          <div className="bg-[#FAF8F4] p-5 rounded-2xl border border-[#D9C7A5]/50 space-y-3">
            <h4 className="font-serif font-bold text-sm text-[#17352D]">
              Key Scientific & Clinical Takeaways
            </h4>
            <div className="space-y-2">
              {resource.keyPoints.map((pt, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-[#17352D]">
                  <CheckCircle2 className="w-4 h-4 text-[#3D8068] shrink-0 mt-0.5" />
                  <span>{pt}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Source Attribution Box */}
          <div className="bg-[#FAF8F4] p-4 rounded-xl border border-[#D9C7A5]/40 flex items-center justify-between text-xs">
            <div>
              <div className="font-bold text-[#17352D]">{resource.source}</div>
              <div className="text-[11px] text-[#5C6B64]">{resource.sourceType}</div>
            </div>
            <span className="text-[10px] font-bold text-[#3D8068] bg-[#E8EEE8] px-2 py-0.5 rounded">
              Verified Source
            </span>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="p-5 sm:px-8 bg-[#FAF8F4] border-t border-[#D9C7A5]/40 flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl border border-[#D9C7A5] text-[#17352D] text-xs font-semibold hover:bg-white transition-all"
          >
            Close
          </button>

          {resource.isExternal ? (
            <a
              href={resource.linkUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#17352D] text-[#F7F4ED] text-xs font-semibold hover:bg-[#102721] transition-all shadow-subtle"
            >
              <span>Visit Official Source / Full Paper</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#D9C7A5]" />
            </a>
          ) : (
            <Link
              to={resource.linkUrl}
              onClick={onClose}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#17352D] text-[#F7F4ED] text-xs font-semibold hover:bg-[#102721] transition-all shadow-subtle"
            >
              <span>Explore Interactive Project Module</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#D9C7A5]" />
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
