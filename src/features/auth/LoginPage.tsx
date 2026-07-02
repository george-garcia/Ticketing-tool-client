import { FormEvent, useState } from 'react'
import { Link } from 'react-router-dom'
import { Sparkles } from 'lucide-react'
import { AuthLayout } from './AuthLayout'
import { useAuthActions } from './useAuthActions'
import { demoSignInAvailable } from '../../lib/auth/authClient'
import { Input } from '../../components/ui/Input'
import { Button } from '../../components/ui/Button'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { signIn, signInDemo, loading, error } = useAuthActions()
  const isDev = import.meta.env.VITE_AUTH_MODE !== 'cognito'

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    signIn({ email, password })
  }

  return (
    <AuthLayout>
      <h2 className="text-2xl font-bold text-slate-900">Sign in</h2>
      <p className="mt-1 text-sm text-slate-500">Welcome back, sign in to your console.</p>

      {/* Friction-free path for recruiters. Hidden when no demo credentials are configured. */}
      {demoSignInAvailable && (
        <>
          <Button type="button" variant="secondary" className="mt-6 w-full" onClick={signInDemo} isLoading={loading}>
            <Sparkles className="h-4 w-4 text-brand-600" />
            Explore as a demo recruiter
          </Button>

          <div className="my-6 flex items-center gap-3 text-xs text-slate-400">
            <span className="h-px flex-1 bg-slate-200" />
            or sign in
            <span className="h-px flex-1 bg-slate-200" />
          </div>
        </>
      )}

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="label" htmlFor="email">
            Email
          </label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
            autoComplete="email"
          />
        </div>
        <div>
          <label className="label" htmlFor="password">
            Password
          </label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="********"
            required={!isDev}
            autoComplete="current-password"
          />
        </div>
        {error && <p className="text-sm font-medium text-red-600">{error}</p>}
        <Button type="submit" className="w-full" isLoading={loading}>
          Sign in
        </Button>
      </form>

      {isDev && (
        <p className="mt-4 rounded-lg bg-amber-50 px-3 py-2 text-xs text-amber-700">
          Dev mode, sign in with any email (the password is ignored).
        </p>
      )}

      <p className="mt-6 text-sm text-slate-500">
        No account?{' '}
        <Link to="/register" className="font-semibold text-brand-600 hover:text-brand-700">
          Create one
        </Link>
      </p>
    </AuthLayout>
  )
}
