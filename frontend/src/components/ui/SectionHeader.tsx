import React from 'react'

export interface SectionHeaderProps {
  chapterNumber?: string
  eyebrow?: string
  title: string
  description?: string
  align?: 'left' | 'center'
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  chapterNumber,
  eyebrow,
  title,
  description,
  align = 'left',
}) => {
  return (
    <div className={`mb-12 max-w-3xl ${align === 'center' ? 'mx-auto text-center' : ''}`}>
      <div className="flex items-center gap-2.5 mb-3">
        {chapterNumber && (
          <span className="text-[11px] font-sans font-bold px-2 py-0.5 rounded bg-[#E8EEE8] text-[#17352D] border border-[#D8E2D8]">
            {chapterNumber}
          </span>
        )}
        {eyebrow && (
          <span className="text-xs font-bold uppercase tracking-widest text-[#3D8068] font-sans">
            {eyebrow}
          </span>
        )}
      </div>

      <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#17352D] tracking-tight leading-tight">
        {title}
      </h2>

      {description && (
        <p className="mt-3 text-base sm:text-[17px] text-[#4A5550] leading-relaxed font-sans">
          {description}
        </p>
      )}
    </div>
  )
}
