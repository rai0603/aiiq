import { useState, useEffect, useRef, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { buildTestQuestions, DIMENSION_LABELS } from '../data/questions'
import type { Question } from '../data/questions'
import { calculateResult } from '../utils/scoring'
import type { Answer } from '../utils/scoring'

const TOTAL_TIME = 30 * 60 // 30 minutes in seconds

export default function QuizPage() {
  const navigate = useNavigate()
  const [questions] = useState<Question[]>(() => buildTestQuestions())
  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState<Answer[]>([])
  const [selected, setSelected] = useState<number | null>(null)
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME)
  const [startTime] = useState(Date.now())
  const [animating, setAnimating] = useState(false)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const submitTest = useCallback((finalAnswers: Answer[]) => {
    const timeTaken = Math.round((Date.now() - startTime) / 1000)
    const result = calculateResult(questions, finalAnswers, timeTaken)
    sessionStorage.setItem('aiiq_result', JSON.stringify(result))
    navigate('/result')
  }, [questions, startTime, navigate])

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          clearInterval(timerRef.current!)
          submitTest(answers)
          return 0
        }
        return t - 1
      })
    }, 1000)
    return () => clearInterval(timerRef.current!)
  }, [answers, submitTest])

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60)
    const sec = s % 60
    return `${m.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`
  }

  const q = questions[current]
  const dimInfo = DIMENSION_LABELS[q.dimension]
  const progress = ((current) / questions.length) * 100
  const timePercent = (timeLeft / TOTAL_TIME) * 100

  const handleSelect = (idx: number) => {
    if (animating) return
    setSelected(idx)
  }

  const handleNext = () => {
    if (selected === null || animating) return
    setAnimating(true)

    const answer: Answer = {
      questionId: q.id,
      selected,
      correct: selected === q.correct,
      points: selected === q.correct ? q.points : 0,
    }
    const newAnswers = [...answers, answer]

    setTimeout(() => {
      if (current + 1 >= questions.length) {
        submitTest(newAnswers)
      } else {
        setAnswers(newAnswers)
        setCurrent(c => c + 1)
        setSelected(null)
        setAnimating(false)
      }
    }, 400)
  }

  const difficultyColor = {
    easy: 'text-green-400 bg-green-400/10',
    medium: 'text-yellow-400 bg-yellow-400/10',
    hard: 'text-red-400 bg-red-400/10',
  }[q.difficulty]

  const difficultyLabel = { easy: '基礎', medium: '進階', hard: '挑戰' }[q.difficulty]

  return (
    <div className="min-h-screen bg-[#05081a] text-white flex flex-col">

      {/* TOP BAR */}
      <div className="sticky top-0 z-10 bg-[#05081a]/95 backdrop-blur border-b border-white/5 px-4 md:px-8 py-3">
        <div className="max-w-2xl mx-auto flex items-center justify-between gap-4">
          <span className="font-black gradient-text text-lg">AI-IQ</span>

          {/* Timer */}
          <div className={`flex items-center gap-2 text-sm font-mono font-bold ${timeLeft < 300 ? 'text-red-400' : 'text-white'}`}>
            <span className={`w-2 h-2 rounded-full ${timeLeft < 300 ? 'bg-red-400 animate-pulse' : 'bg-green-400'}`} />
            {formatTime(timeLeft)}
          </div>

          {/* Question count */}
          <span className="text-gray-400 text-sm">{current + 1} / {questions.length}</span>
        </div>

        {/* Progress bar */}
        <div className="max-w-2xl mx-auto mt-2">
          <div className="h-1 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{ width: `${progress}%`, background: 'linear-gradient(90deg, #3b82f6, #8b5cf6)' }}
            />
          </div>
          {/* Time bar */}
          <div className="h-0.5 bg-white/5 rounded-full overflow-hidden mt-1">
            <div
              className="h-full rounded-full transition-all duration-1000"
              style={{ width: `${timePercent}%`, background: timeLeft < 300 ? '#ef4444' : '#10b981' }}
            />
          </div>
        </div>
      </div>

      {/* MAIN */}
      <div className="flex-1 flex items-start justify-center px-4 py-8">
        <div className="w-full max-w-2xl">

          {/* Dimension badge */}
          <div className="flex items-center gap-3 mb-6">
            <span className="text-xl">{dimInfo.icon}</span>
            <span className="text-sm font-medium" style={{ color: dimInfo.color }}>{dimInfo.label}</span>
            <span className={`text-xs px-2 py-0.5 rounded-full ${difficultyColor}`}>{difficultyLabel}</span>
          </div>

          {/* Question */}
          <div className="card-glass rounded-2xl p-6 md:p-8 mb-6">
            <p className="text-lg md:text-xl font-medium leading-relaxed">{q.question}</p>
          </div>

          {/* Options */}
          <div className="space-y-3">
            {q.options.map((opt, idx) => {
              const isSelected = selected === idx
              return (
                <button
                  key={idx}
                  onClick={() => handleSelect(idx)}
                  className="w-full text-left p-4 rounded-2xl border transition-all duration-200 flex items-center gap-4"
                  style={{
                    background: isSelected ? 'rgba(99,102,241,0.15)' : 'rgba(255,255,255,0.03)',
                    borderColor: isSelected ? '#6366f1' : 'rgba(255,255,255,0.08)',
                    transform: isSelected ? 'scale(1.01)' : 'scale(1)',
                  }}
                >
                  <span
                    className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0 transition-all"
                    style={{
                      background: isSelected ? '#6366f1' : 'rgba(255,255,255,0.08)',
                      color: isSelected ? 'white' : '#9ca3af',
                    }}
                  >
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span className={`text-sm md:text-base leading-snug ${isSelected ? 'text-white' : 'text-gray-300'}`}>
                    {opt}
                  </span>
                </button>
              )
            })}
          </div>

          {/* Next button */}
          <div className="mt-8 flex justify-end">
            <button
              onClick={handleNext}
              disabled={selected === null || animating}
              className="btn-primary px-8 py-3 rounded-xl font-bold text-white disabled:opacity-30 disabled:cursor-not-allowed disabled:transform-none"
            >
              {current + 1 >= questions.length ? '提交測驗' : '下一題 →'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
