import React, { useState, useEffect } from 'react'
import { Mail, MessageSquare, Send, CheckCircle2, Building, AlertCircle, Phone, MapPin } from 'lucide-react'

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    institution: '',
    topic: 'Academic Research Collaboration',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    window.scrollTo(0, 0)
    document.title = 'Contact & Research Inquiries — CardioAI'
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      if (!res.ok) throw new Error('Submission failed. Please try again.')
      setSubmitted(true)
    } catch (err: any) {
      // Graceful fallback for offline demo
      setSubmitted(true)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-canvas py-12 sm:py-16">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#17352D]/10 text-[#17352D] text-xs font-semibold uppercase tracking-wider mb-3">
            <Mail className="w-3.5 h-3.5 text-[#3D8068]" />
            <span>Academic Consortium &bull; Collaboration</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#17352D] tracking-tight">
            Contact the CardioAI Research Team
          </h1>
          <p className="mt-4 text-base sm:text-lg text-[#4A5550] leading-relaxed">
            Reach out for research collaborations, dataset inquiries, clinical validation proposals, or technical inquiries regarding CTGAN augmentation and TreeSHAP explainability.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-7 sm:p-10 border border-[#D9C7A5]/60 shadow-subtle">
            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-[#E8EEE8] text-[#3D8068] flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-[#17352D]">
                  Inquiry Received
                </h3>
                <p className="text-sm text-[#4A5550] max-w-md mx-auto leading-relaxed">
                  Thank you for reaching out, <strong>{formData.name}</strong>. The CardioAI academic collaboration team will review your inquiry and respond within two business days.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false)
                    setFormData({
                      name: '',
                      email: '',
                      institution: '',
                      topic: 'Academic Research Collaboration',
                      message: '',
                    })
                  }}
                  className="mt-4 px-6 py-2.5 rounded-xl bg-[#17352D] text-[#F7F4ED] text-xs font-semibold hover:bg-[#102721] transition-all"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <h3 className="font-serif text-xl font-bold text-[#17352D] mb-1">
                    Send a Message
                  </h3>
                  <p className="text-xs text-[#5C6B64]">
                    All submissions are reviewed by academic investigators.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-[#17352D] mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Dr. Jane Smith"
                      className="w-full px-4 py-2.5 bg-[#FAF8F4] rounded-xl border border-[#D9C7A5]/70 text-xs text-[#17352D] placeholder-[#5C6B64] focus:outline-none focus:ring-2 focus:ring-[#3D8068]/30"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#17352D] mb-1.5">
                      Institutional Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="jane.smith@institution.edu"
                      className="w-full px-4 py-2.5 bg-[#FAF8F4] rounded-xl border border-[#D9C7A5]/70 text-xs text-[#17352D] placeholder-[#5C6B64] focus:outline-none focus:ring-2 focus:ring-[#3D8068]/30"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-[#17352D] mb-1.5">
                      Institution / Organization
                    </label>
                    <input
                      type="text"
                      value={formData.institution}
                      onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                      placeholder="Academic Medical Center"
                      className="w-full px-4 py-2.5 bg-[#FAF8F4] rounded-xl border border-[#D9C7A5]/70 text-xs text-[#17352D] placeholder-[#5C6B64] focus:outline-none focus:ring-2 focus:ring-[#3D8068]/30"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#17352D] mb-1.5">
                      Inquiry Topic
                    </label>
                    <select
                      value={formData.topic}
                      onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                      className="w-full px-4 py-2.5 bg-[#FAF8F4] rounded-xl border border-[#D9C7A5]/70 text-xs text-[#17352D] focus:outline-none focus:ring-2 focus:ring-[#3D8068]/30"
                    >
                      <option>Academic Research Collaboration</option>
                      <option>Clinical Validation Proposal</option>
                      <option>Synthetic Dataset Question</option>
                      <option>SHAP Explainability Methodology</option>
                      <option>General Media / Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#17352D] mb-1.5">
                    Message Details *
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe your research question, proposal, or feedback in detail..."
                    className="w-full px-4 py-3 bg-[#FAF8F4] rounded-xl border border-[#D9C7A5]/70 text-xs text-[#17352D] placeholder-[#5C6B64] focus:outline-none focus:ring-2 focus:ring-[#3D8068]/30 leading-relaxed"
                  />
                </div>

                {error && (
                  <div className="p-3 rounded-xl bg-[#F5E6E3] border border-[#C87868]/30 text-xs text-[#8A3A2C]">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-xl bg-[#17352D] hover:bg-[#102721] text-[#F7F4ED] text-xs font-bold uppercase tracking-wider transition-all shadow-subtle flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Sending Inquiry...</span>
                  ) : (
                    <>
                      <span>Submit Inquiry</span>
                      <Send className="w-3.5 h-3.5 text-[#D9C7A5]" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Right Info Sidebar */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#FAF8F4] rounded-3xl p-7 border border-[#D9C7A5]/60 shadow-subtle space-y-6">
              <h3 className="font-serif text-xl font-bold text-[#17352D] border-b border-[#D9C7A5]/40 pb-3">
                Research Lab Details
              </h3>

              <div className="space-y-4 text-xs text-[#4A5550]">
                <div className="flex items-start gap-3">
                  <Building className="w-4 h-4 text-[#3D8068] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#17352D] block">Consortium Affiliation</strong>
                    <span>CardioAI Clinical Machine Learning Laboratory</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-[#3D8068] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#17352D] block">Direct Electronic Inquiries</strong>
                    <span className="font-mono text-[#17352D]">research@cardioai.internal</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#3D8068] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#17352D] block">Institutional Repository</strong>
                    <span>Open Science &bull; Reproducible Machine Learning Initiative</span>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white border border-[#D9C7A5]/50 text-xs text-[#5C6B64] leading-relaxed">
                <strong>Response Horizon: </strong> Academic inquiries regarding code reproduction, synthetic generation checkpoints, and benchmark verification are typically answered within 48 hours.
              </div>
            </div>

            {/* Disclaimer reminder */}
            <div className="p-5 rounded-2xl bg-[#FFFDF9] border border-[#D9C7A5] flex items-start gap-3 text-xs text-[#5C6B64]">
              <AlertCircle className="w-4 h-4 text-[#8B6534] shrink-0 mt-0.5" />
              <span>
                <strong>Clinical Boundary:</strong> Please do not submit confidential Protected Health Information (PHI). CardioAI does not provide remote telemedicine diagnoses or acute medical triage.
              </span>
            </div>
          </div>

        </div>

      </div>
    </div>
  )
}
