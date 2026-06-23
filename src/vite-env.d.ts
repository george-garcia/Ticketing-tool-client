/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string
  readonly VITE_AUTH_MODE: 'dev' | 'cognito'
  readonly VITE_AWS_REGION: string
  readonly VITE_COGNITO_USER_POOL_ID: string
  readonly VITE_COGNITO_USER_POOL_CLIENT_ID: string
  readonly VITE_DEMO_EMAIL: string
  readonly VITE_DEMO_PASSWORD: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
