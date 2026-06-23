import { FormEvent, useState } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { AuthLayout } from './AuthLayout'
import { useAuthActions } from './useAuthActions'
import { Input } from '../../components/ui/Input'
import { Button } from '../../components/ui/Button'

interface VerifyState {
  email?: string
  password?: string
}

export default function VerifyPage() {
  const location = useLocation()
  const state = (location.state ?? {}) as VerifyState
  const [code, setCode] = useState('')
  const [resent, setResent] = useState(false)
  const { confirm, resendCode, loading, error } = useAuthActions()

  // No context to verify against (e.g. page was opened directly).
  if (!state.email) {
    return <Navigate to="/register" replace />
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    confirm(state.email!, code.trim(), state.password)
  }

  const handleResend = async () => {
    await resendCode(state.email!)
    setResent(true)
  }

  return (
    <AuthLayout>
      <h2 className="text-2xl font-bold text-slate-900">Verify your email</h2>
      <p className="mt-1 text-sm text-slate-500">
        We sent a 6-digit code to{' '}
        <span className="font-medium text-slate-700">{state.email}</span>. Enter it below to finish
        setting up your account.
      </p>

      <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="label" htmlFor="code">
            Verification code
          </label>
          <Input
            id="code"
            inputMode="numeric"
            autoComplete="one-time-code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="123456"
            required
          />
        </div>
        {error && <p className="text-sm font-medium text-red-600">{error}</p>}
        <Button type="submit" className="w-full" isLoading={loading} disabled={code.trim().length < 6}>
          Verify and continue
        </Button>
      </form>

      <p className="mt-6 text-sm text-slate-500">
        Didn&apos;t get it?{' '}
        <button
          type="button"
          onClick={handleResend}
          className="font-semibold text-brand-600 hover:text-brand-700"
        >
          {resent ? 'Code resent' : 'Resend code'}
        </button>
      </p>
    </AuthLayout>
  )
}
