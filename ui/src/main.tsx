import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { MainWindow } from './app'
import { LanguageProvider } from './contexts/LanguageContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LanguageProvider>
      <MainWindow />
    </LanguageProvider>
  </StrictMode>,
)
