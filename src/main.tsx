import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { IconContext } from 'react-icons'
import { BrowserRouter } from 'react-router'
import './styles/typography.css'
import './styles/global.css'
import './styles/highlight.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <IconContext.Provider value={{ size: '16px' }}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </IconContext.Provider>
  </StrictMode>,
)
