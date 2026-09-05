import React, { useState, useEffect, useRef } from 'react'

const stats = [
  { value: 303, suffix: '', label: 'Clinical Records', sub: 'UCI Heart Disease Dataset' },
  { value: 14, suffix: '', label: 'Clinical Attributes', sub: 'Patient Feature Set' },
  { value: 200, suffix: '%', label: 'Maximum Augmentation', sub: 'Evaluated Scaling Ratio' },
  { value: 90.16, suffix: '%', label: 'Best Accuracy', sub: 'Experimental Result' },
]

function useCountUp(end: number, duration: number, trigger: boolean) {
  const [count, setCount] = useState(0)
  const frameRef = useRef<number | null>(null)
  
  useEffect(() => {
    if (!trigger) return
    
    const startTime = performance.now()
    const isDecimal = end % 1 !== 0
    
    const animate = (now: number) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = eased * end
      
      setCount(isDecimal ? parseFloat(current.toFixed(2)) : Math.floor(current))
      
      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate)
      }
    }
    
    frameRef.current = requestAnimationFrame(animate)
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current)
    }
  }, [trigger, end, duration])
  
  return count
}

/**
 * StatisticsSection — Animated statistics cards with count-up effect.
 */
export const StatisticsSection: React.FC = () => {
  const [visible, setVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="py-20 md:py-28 bg-[#FAF8F4] border-b border-[#D9C7A5]/40"
    >
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8EEE8] border border-[#D8E2D8] text-[11px] font-bold tracking-[0.15em] uppercase text-[#17352D] font-sans mb-4">
            Project Statistics
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-serif font-bold text-[#17352D] tracking-tight leading-tight">
            Research by the Numbers
          </h2>
          <p className="text-sm sm:text-base text-[#4A5550] mt-3 font-sans">
            Key dataset, experimental, and project-level statistics from our heart disease prediction research.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => (
            <StatCard key={idx} stat={stat} visible={visible} delay={idx * 150} />
          ))}
        </div>
      </div>
    </section>
  )
}

interface StatCardProps {
  stat: typeof stats[0]
  visible: boolean
  delay: number
}

const StatCard: React.FC<StatCardProps> = ({ stat, visible, delay }) => {
  const count = useCountUp(stat.value, 2000, visible)
  
  return (
    <div
      className="bg-white border border-[#D9C7A5]/50 rounded-2xl p-7 text-center shadow-subtle hover:shadow-elevated hover:border-[#3D8068]/40 hover:-translate-y-1.5 transition-all duration-300"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(24px)',
        transition: `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
      }}
    >
      <div className="font-serif text-4xl sm:text-5xl font-bold text-[#17352D] mb-2">
        {stat.value % 1 !== 0 ? count.toFixed(2) : count}
        <span className="text-[#3D8068]">{stat.suffix}</span>
      </div>
      <div className="text-sm font-bold text-[#17352D] font-sans">
        {stat.label}
      </div>
      <div className="text-xs text-[#4A5550] font-sans mt-1">
        {stat.sub}
      </div>
    </div>
  )
}
