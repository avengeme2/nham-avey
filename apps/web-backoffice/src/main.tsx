import { StrictMode } from 'react'

import * as ReactDOM from 'react-dom/client'

import { App } from './components/app'
import { AppProvider } from './components/app-provider'

import './styles/styles.css'

const element = document.getElementById('root') as HTMLElement
const root = ReactDOM.createRoot(element)

root.render(
  <StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </StrictMode>,
)
