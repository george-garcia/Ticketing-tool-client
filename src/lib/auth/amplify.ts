/**
 * Configures Amplify Auth when running against real Cognito. No-op in dev mode.
 *
 * `aws-amplify` is imported dynamically so its ~700KB bundle is only fetched in cognito
 * mode; the dev build never pulls it in. Callers should await this before rendering so
 * the pool is configured before the first `fetchAuthSession`.
 */
export async function configureAmplify(): Promise<void> {
  if (import.meta.env.VITE_AUTH_MODE !== 'cognito') return

  const { Amplify } = await import('aws-amplify')
  Amplify.configure({
    Auth: {
      Cognito: {
        userPoolId: import.meta.env.VITE_COGNITO_USER_POOL_ID,
        userPoolClientId: import.meta.env.VITE_COGNITO_USER_POOL_CLIENT_ID,
      },
    },
  })
}
