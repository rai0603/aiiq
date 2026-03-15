import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import { AuthProvider } from './contexts/AuthContext'
import HomePage from './pages/HomePage'
import TestPage from './pages/TestPage'
import QuizPage from './pages/QuizPage.tsx'
import ResultPage from './pages/ResultPage.tsx'
import AuthPage from './pages/AuthPage'
import DashboardPage from './pages/DashboardPage'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/:testId" element={<TestPage />} />
          <Route path="/:testId/quiz" element={<QuizPage />} />
          <Route path="/:testId/result" element={<ResultPage />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
