import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import HomePage from './pages/HomePage'
import TestPage from './pages/TestPage'
import QuizPage from './pages/QuizPage.tsx'
import ResultPage from './pages/ResultPage.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/:testId" element={<TestPage />} />
        <Route path="/:testId/quiz" element={<QuizPage />} />
        <Route path="/:testId/result" element={<ResultPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
