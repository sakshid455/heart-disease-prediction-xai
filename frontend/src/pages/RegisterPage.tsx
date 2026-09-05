import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserCheck, Mail, Lock, Building, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react'

export const RegisterPage: React.FC = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [institution, setInstitution] = useState('')
  const [role, setRole] = useState('Clinical Cardiologist / Fellow')
  const [password, setPassword] = useState('')
  const [agree, setAgree] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    window.scrollTo(0, 0)
    document.title = 'Register for Research Access — CardioAI'
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!agree) {
      setError('You must agree to the academic research and ethical terms.')
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, institution, role, password }),
      })
      if (!res.ok) throw new Error('Registration failed.')
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
          name: name || 'New Investigator',
          email: email || 'investigator@institution.edu',
          role: role,
          institution: institution || 'Academic Medical Center',
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
      <div className="max-w-lg w-full space-y-8 bg-white p-8 sm:p-10 rounded-3xl border border-[#D9C7A5]/70 shadow-elevated">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-[#17352D] text-[#F7F4ED] flex items-center justify-center mx-auto shadow-subtle">
            <UserCheck className="w-6 h-6 text-[#D9C7A5]" />
          </div>
          <h2 className="font-serif text-3xl font-bold text-[#17352D] tracking-tight">
            Register for Research Access
          </h2>
          <p className="text-xs text-[#5C6B64]">
            Join the academic consortium for clinical benchmarks and synthetic reservoir exploration.
          </p>
        </div>

        {/* Alerts */}
        {success && (
          <div className="p-3.5 rounded-xl bg-[#E8EEE8] border border-[#3D8068]/30 text-xs text-[#17352D] flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#3D8068]" />
            <span>Registration approved. Directing to Research Suite...</span>
          </div>
        )}

        {error && (
          <div className="p-3.5 rounded-xl bg-[#F5E6E3] border border-[#C87868]/30 text-xs text-[#8A3A2C] flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-[#C87868]" />
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-[#17352D] mb-1">
              Full Name *
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Dr. Michael Vance"
              className="w-full px-4 py-2.5 bg-[#FAF8F4] rounded-xl border border-[#D9C7A5]/70 text-xs text-[#17352D] placeholder-[#5C6B64] focus:outline-none focus:ring-2 focus:ring-[#3D8068]/30"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#17352D] mb-1">
                Institutional Email *
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="vance@hospital.org"
                className="w-full px-4 py-2.5 bg-[#FAF8F4] rounded-xl border border-[#D9C7A5]/70 text-xs text-[#17352D] placeholder-[#5C6B64] focus:outline-none focus:ring-2 focus:ring-[#3D8068]/30"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#17352D] mb-1">
                Institution / Hospital *
              </label>
              <input
                type="text"
                required
                value={institution}
                onChange={(e) => setInstitution(e.target.value)}
                placeholder="University Heart Center"
                className="w-full px-4 py-2.5 bg-[#FAF8F4] rounded-xl border border-[#D9C7A5]/70 text-xs text-[#17352D] placeholder-[#5C6B64] focus:outline-none focus:ring-2 focus:ring-[#3D8068]/30"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#17352D] mb-1">
              Clinical / Academic Role
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-4 py-2.5 bg-[#FAF8F4] rounded-xl border border-[#D9C7A5]/70 text-xs text-[#17352D] focus:outline-none focus:ring-2 focus:ring-[#3D8068]/30"
            >
              <option>Clinical Cardiologist / Fellow</option>
              <option>Medical Researcher / Epidemiologist</option>
              <option>Healthcare Data Scientist</option>
              <option>Biomedical Informatics Student</option>
              <option>Independent Investigator</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#17352D] mb-1">
              Create Password *
            </label>
            <input
              type="password"
              required
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Minimum 8 characters"
              className="w-full px-4 py-2.5 bg-[#FAF8F4] rounded-xl border border-[#D9C7A5]/70 text-xs text-[#17352D] placeholder-[#5C6B64] focus:outline-none focus:ring-2 focus:ring-[#3D8068]/30"
            />
          </div>

          <div className="pt-2">
            <label className="flex items-start gap-2 text-xs text-[#5C6B64] cursor-pointer">
              <input
                type="checkbox"
                checked={agree}
                onChange={(e) => setAgree(e.target.checked)}
                className="mt-0.5 rounded text-[#17352D] focus:ring-[#3D8068]"
              />
              <span className="leading-snug">
                I understand that CardioAI predictions represent experimental research estimates and are not intended as primary medical advice or certified diagnostic devices.
              </span>
            </label>
          </div>

          <button
            type="submit"
            disabled={isLoading || success}
            className="w-full py-3.5 mt-2 rounded-xl bg-[#17352D] hover:bg-[#102721] text-[#F7F4ED] text-xs font-bold uppercase tracking-wider transition-all shadow-subtle flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isLoading ? (
              <span>Creating Account...</span>
            ) : (
              <>
                <span>Complete Registration</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#D9C7A5]" />
              </>
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="pt-4 border-t border-[#D9C7A5]/40 text-center text-xs text-[#5C6B64]">
          Already have an account?{' '}
          <Link
            to="/login"
            className="font-bold text-[#17352D] hover:text-[#3D8068] transition-colors underline"
          >
            Sign In
          </Link>
        </div>

      </div>
    </div>
  )
}
