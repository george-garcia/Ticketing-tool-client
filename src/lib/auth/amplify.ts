import { Amplify } from 'aws-amplify'

/** Configures Amplify Auth when running against real Cognito. No-op in dev mode. */
export function configureAmplify(): void {
  if (import.meta.env.VITE_AUTH_MODE !== 'cognito') return

  Amplify.configure({
    Auth: {
      Cognito: {
        userPoolId: import.meta.env.VITE_COGNITO_USER_POOL_ID,
        userPoolClientId: import.meta.env.VITE_COGNITO_USER_POOL_CLIENT_ID,
      },
    },
  })
}
