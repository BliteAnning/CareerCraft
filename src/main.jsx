import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter} from 'react-router'

import App from './App.jsx'
import { StoredProvider } from './context/StoredContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <StoredProvider>
        <App />
      </StoredProvider>
    </BrowserRouter>
  </StrictMode>,
)
