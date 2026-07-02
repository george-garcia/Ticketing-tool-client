import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store'
import App from './App'
import { configureAmplify } from './lib/auth/amplify'
import './index.css'

// Configure Amplify (cognito mode only) before rendering, so the first auth-session
// lookup finds a configured pool. In dev mode this resolves immediately without importing
// aws-amplify, keeping it out of the bundle.
configureAmplify().finally(() => {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </React.StrictMode>,
  )
})
