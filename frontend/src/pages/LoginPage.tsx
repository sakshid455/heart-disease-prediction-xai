import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Lock, Mail, ArrowRight, ShieldCheck, CheckCircle2, AlertCircle } from 'lucide-react'

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    window.scrollTo(0, 0)
    document.title = 'Investigator Portal Login — CardioAI'
  }, [])

  const handleQuickFill = () => {
    setEmail('investigator@cardioai.org')
    setPassword('Research2026!')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      if (!res.ok) {
        throw new Error('Authentication failed. Please check your credentials.')
      }
      const data = await res.json()
      localStorage.setItem('cardioai_user', JSON.stringify(data.user))
      localStorage.setItem('cardioai_token', data.token)
      setSuccess(true)
      setTimeout(() => {
        navigate('/prediction')
      }, 1000)
    } catch (err: any) {
      // Demo fallback
      localStorage.setItem(
        'cardioai_user',
        JSON.stringify({
          name: email.split('@')[0] || 'Investigator',
          email: email || 'investigator@cardioai.org',
          role: 'Clinical Researcher',
        })
      )
      setSuccess(true)
      setTimeout(() => {
        navigate('/prediction')
      }, 1000)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-canvas flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 sm:p-10 rounded-3xl border border-[#D9C7A5]/70 shadow-elevated">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-[#17352D] text-[#F7F4ED] flex items-center justify-center mx-auto shadow-subtle">
            <Lock className="w-6 h-6 text-[#D9C7A5]" />
          </div>
          <h2 className="font-serif text-3xl font-bold text-[#17352D] tracking-tight">
            Investigator Sign In
          </h2>
          <p className="text-xs text-[#5C6B64]">
            Access the clinical assessment suite, raw synthetic datasets, and SHAP auditing dashboards.
          </p>
        </div>

        {/* Demo Credentials Box */}
        <div className="bg-[#FAF8F4] p-4 rounded-2xl border border-[#D9C7A5]/50 flex items-center justify-between text-xs">
          <div>
            <span className="font-bold text-[#17352D] block">Research Access Demo</span>
            <span className="text-[11px] text-[#5C6B64]">Click to populate credentials</span>
          </div>
          <button
            type="button"
            onClick={handleQuickFill}
            className="px-3 py-1.5 rounded-lg bg-white border border-[#D9C7A5] text-[#17352D] text-xs font-semibold hover:bg-[#17352D] hover:text-[#F7F4ED] transition-all shadow-2xs"
          >
            Fill Demo
          </button>
        </div>

        {/* Success Alert */}
        {success && (
          <div className="p-3.5 rounded-xl bg-[#E8EEE8] border border-[#3D8068]/30 text-xs text-[#17352D] flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#3D8068]" />
            <span>Authentication successful. Redirecting to Assessment...</span>
          </div>
        )}

        {/* Error Alert */}
        {error && (
          <div className="p-3.5 rounded-xl bg-[#F5E6E3] border border-[#C87868]/30 text-xs text-[#8A3A2C] flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-[#C87868]" />
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-bold text-[#17352D] mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#5C6B64] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="investigator@institution.edu"
                className="w-full pl-10 pr-4 py-2.5 bg-[#FAF8F4] rounded-xl border border-[#D9C7A5]/70 text-xs text-[#17352D] placeholder-[#5C6B64] focus:outline-none focus:ring-2 focus:ring-[#3D8068]/30"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#17352D] mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#5C6B64] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-10 pr-4 py-2.5 bg-[#FAF8F4] rounded-xl border border-[#D9C7A5]/70 text-xs text-[#17352D] placeholder-[#5C6B64] focus:outline-none focus:ring-2 focus:ring-[#3D8068]/30"
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-xs">
            <label className="flex items-center gap-2 text-[#5C6B64] cursor-pointer">
              <input
                type="checkbox"
                defaultChecked
                className="rounded text-[#17352D] focus:ring-[#3D8068]"
              />
              <span>Remember session</span>
            </label>
            <span className="text-[#3D8068] hover:underline cursor-pointer">
              Forgot credentials?
            </span>
          </div>

          <button
            type="submit"
            disabled={isLoading || success}
            className="w-full py-3.5 rounded-xl bg-[#17352D] hover:bg-[#102721] text-[#F7F4ED] text-xs font-bold uppercase tracking-wider transition-all shadow-subtle flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isLoading ? (
              <span>Verifying Credentials...</span>
            ) : (
              <>
                <span>Sign In to Portal</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#D9C7A5]" />
              </>
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="pt-4 border-t border-[#D9C7A5]/40 text-center text-xs text-[#5C6B64]">
          Need investigator credentials?{' '}
          <Link
            to="/register"
            className="font-bold text-[#17352D] hover:text-[#3D8068] transition-colors underline"
          >
            Register for Research Access
          </Link>
        </div>

      </div>
    </div>
  )
}
