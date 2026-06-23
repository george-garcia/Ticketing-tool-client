import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { authClient, type SignInInput, type SignUpInput } from '../../lib/auth/authClient'
import { useAppDispatch } from '../../store'
import { api } from '../../store/baseApi'

/** Auth actions with shared loading + error state. */
export function useAuthActions() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const enter = () => {
    dispatch(api.util.invalidateTags(['Me']))
    navigate('/dashboard')
  }

  const guarded = (fn: () => Promise<void>) => async () => {
    setLoading(true)
    setError('')
    try {
      await fn()
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return {
    loading,
    error,

    signIn: (input: SignInInput) =>
      guarded(async () => {
        try {
          await authClient.signIn(input)
          enter()
        } catch (e) {
          // Unconfirmed accounts get routed to the verification screen.
          if (e && typeof e === 'object' && (e as { name?: string }).name === 'UserNotConfirmedException') {
            navigate('/verify', { state: { email: input.email, password: input.password } })
            return
          }
          throw e
        }
      })(),

    signInDemo: () => guarded(async () => {
      await authClient.signInDemo()
      enter()
    })(),

    signUp: (input: SignUpInput) =>
      guarded(async () => {
        const { needsConfirmation } = await authClient.signUp(input)
        if (needsConfirmation) {
          navigate('/verify', { state: { email: input.email, password: input.password } })
        } else {
          enter()
        }
      })(),

    confirm: (email: string, code: string, password?: string) =>
      guarded(async () => {
        await authClient.confirmSignUp(email, code)
        if (password) {
          await authClient.signIn({ email, password })
          enter()
        } else {
          navigate('/login')
        }
      })(),

    resendCode: (email: string) => guarded(async () => {
      await authClient.resendCode(email)
    })(),
  }
}

/** Sign out and clear all cached data. */
export function useSignOut() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  return async () => {
    await authClient.signOut()
    dispatch(api.util.resetApiState())
    navigate('/login')
  }
}
