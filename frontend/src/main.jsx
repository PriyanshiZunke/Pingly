import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ClerkProvider } from '@clerk/react'
import { BrowserRouter } from 'react-router'
import AuthTokenSetter from './components/AuthTokenSetter'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ClerkProvider>
      <AuthTokenSetter />
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ClerkProvider>
  </StrictMode>,
)
