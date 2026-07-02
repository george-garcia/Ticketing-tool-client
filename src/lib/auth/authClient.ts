/**
 * Unified auth client. Two backends:
 *  - dev:     calls the server's /auth/dev-login seam and stores a token locally.
 *  - cognito: uses AWS Amplify (Cognito User Pool); the API is sent the ID token.
 *
 * Components/store only ever talk to this module, never to Amplify directly.
 */
const MODE = import.meta.env.VITE_AUTH_MODE
const API = import.meta.env.VITE_API_URL
const TOKEN_KEY = 'hdh_token'

/** Premade, low-friction demo account for recruiters (agent role). */
const DEMO = {
  email: import.meta.env.VITE_DEMO_EMAIL || 'demo@georgegarciadev.com',
  // No hardcoded fallback: in cognito mode a real password must be injected at build
  // time, otherwise the demo button is hidden (see `demoSignInAvailable`). In dev mode
  // the server ignores the password entirely.
  password: import.meta.env.VITE_DEMO_PASSWORD || '',
}

/**
 * Whether to surface the "Explore as demo" button. Dev mode ignores the password so it
 * always works; cognito mode needs a configured VITE_DEMO_PASSWORD to sign in for real.
 */
export const demoSignInAvailable = MODE !== 'cognito' || DEMO.password.length > 0

export interface SignInInput {
  email: string
  password: string
}

export interface SignUpInput extends SignInInput {
  firstName: string
  lastName: string
}

export interface SignUpResult {
  /** True when Cognito requires an emailed confirmation code before sign-in. */
  needsConfirmation: boolean
}

async function devLogin(body: Record<string, unknown>): Promise<string> {
  const res = await fetch(`${API}/auth/dev-login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  if (!res.ok) {
    throw new Error('Sign-in failed')
  }
  const json = await res.json()
  return json.data.token as string
}

export const authClient = {
  async signIn({ email, password }: SignInInput): Promise<void> {
    if (MODE === 'cognito') {
      const { signIn } = await import('aws-amplify/auth')
      const { isSignedIn, nextStep } = await signIn({ username: email, password })
      if (!isSignedIn) {
        throw new Error(`Sign-in incomplete (${nextStep.signInStep}).`)
      }
      return
    }
    const token = await devLogin({ email, groups: ['agent'] })
    localStorage.setItem(TOKEN_KEY, token)
  },

  async signInDemo(): Promise<void> {
    if (MODE === 'cognito') {
      if (!DEMO.password) throw new Error('Demo sign-in is not configured.')
      const { signIn } = await import('aws-amplify/auth')
      const { isSignedIn, nextStep } = await signIn({ username: DEMO.email, password: DEMO.password })
      if (!isSignedIn) {
        throw new Error(`Demo sign-in incomplete (${nextStep.signInStep}).`)
      }
      return
    }
    const token = await devLogin({
      email: DEMO.email,
      firstName: 'Demo',
      lastName: 'Recruiter',
      groups: ['agent'],
    })
    localStorage.setItem(TOKEN_KEY, token)
  },

  async signUp({ email, password, firstName, lastName }: SignUpInput): Promise<SignUpResult> {
    if (MODE === 'cognito') {
      const { signUp } = await import('aws-amplify/auth')
      const { nextStep } = await signUp({
        username: email,
        password,
        options: { userAttributes: { email, given_name: firstName, family_name: lastName } },
      })
      return { needsConfirmation: nextStep.signUpStep === 'CONFIRM_SIGN_UP' }
    }
    const token = await devLogin({ email, firstName, lastName, groups: ['agent'] })
    localStorage.setItem(TOKEN_KEY, token)
    return { needsConfirmation: false }
  },

  async confirmSignUp(email: string, code: string): Promise<void> {
    if (MODE === 'cognito') {
      const { confirmSignUp } = await import('aws-amplify/auth')
      await confirmSignUp({ username: email, confirmationCode: code })
    }
  },

  async resendCode(email: string): Promise<void> {
    if (MODE === 'cognito') {
      const { resendSignUpCode } = await import('aws-amplify/auth')
      await resendSignUpCode({ username: email })
    }
  },

  async signOut(): Promise<void> {
    if (MODE === 'cognito') {
      const { signOut } = await import('aws-amplify/auth')
      await signOut()
    }
    localStorage.removeItem(TOKEN_KEY)
  },

  async getToken(): Promise<string | null> {
    if (MODE === 'cognito') {
      const { fetchAuthSession } = await import('aws-amplify/auth')
      const session = await fetchAuthSession()
      return session.tokens?.idToken?.toString() ?? null
    }
    return localStorage.getItem(TOKEN_KEY)
  },
}
