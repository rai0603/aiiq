import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getTest } from '../data/tests'

function DifficultyStars({ level }: { level: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map(i => (
        <span key={i} className={`text-base ${i <= level ? 'text-yellow-400' : 'text-gray-700'}`}>★</span>
      ))}
    </div>
  )
}

export default function TestPage() {
  const { testId } = useParams<{ testId: string }>()
  const navigate = useNavigate()
  const [emailSubmitted, setEmailSubmitted] = useState(false)
  const [email, setEmail] = useState('')

  const test = testId ? getTest(testId) : undefined

  if (!test) {
    return (
      <div className="min-h-screen bg-[#05081a] text-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">404</div>
          <div className="text-gray-400 mb-6">找不到此測驗</div>
          <button onClick={() => navigate('/')} className="btn-primary px-6 py-3 rounded-xl font-semibold text-white">
            返回首頁
          </button>
        </div>
      </div>
    )
  }

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email.trim()) {
      setEmailSubmitted(true)
    }
  }

  return (
    <div className="min-h-screen bg-[#05081a] text-white">
      {/* NAV */}
      <nav className="flex items-center justify-between px-6 md:px-16 py-4 border-b border-white/5">
        <span className="font-black gradient-text text-xl">IQ Suite</span>
        <button
          onClick={() => navigate('/')}
          className="text-sm text-gray-400 hover:text-white transition-colors"
        >
          ← 返回首頁
        </button>
      </nav>

      <div className="max-w-3xl mx-auto px-4 py-12 space-y-8">

        {/* HERO */}
        <div className="card-glass rounded-3xl p-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 to-purple-900/10 pointer-events-none" />
          <div className="relative">
            {/* Category badge */}
            <span
              className="text-xs px-3 py-1 rounded-full font-medium"
              style={{ background: `${test.categoryColor}20`, color: test.categoryColor }}
            >
              {test.category}
            </span>

            <div className="flex items-center gap-4 mt-4 mb-3">
              <span className="text-5xl">{test.icon}</span>
              <div>
                <h1 className="text-3xl font-black">{test.name}</h1>
                <p className="text-gray-400 mt-1">{test.tagline}</p>
              </div>
            </div>

            <p className="text-gray-300 leading-relaxed">{test.description}</p>
          </div>
        </div>

        {/* PAIN POINTS */}
        {test.painPoints && (
          <div className="card-glass rounded-2xl p-6">
            <h2 className="font-bold text-lg mb-4">你是否有這些困擾？</h2>
            <div className="grid md:grid-cols-3 gap-4">
              {test.painPoints.map((p, i) => (
                <div key={i} className="flex flex-col items-center text-center gap-3 bg-white/5 rounded-xl px-4 py-5">
                  <span className="text-3xl">{p.icon}</span>
                  <span className="text-sm text-gray-300 leading-snug">{p.text}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* HOW IT WORKS */}
        {test.howItWorks && (
          <div className="card-glass rounded-2xl p-6">
            <h2 className="font-bold text-lg mb-4">測驗如何運作</h2>
            <div className="grid md:grid-cols-3 gap-4">
              {test.howItWorks.map((step, i) => (
                <div key={i} className="flex flex-col items-center text-center gap-2 bg-white/5 rounded-xl px-4 py-5">
                  <span className="text-3xl">{step.icon}</span>
                  <span className="font-semibold text-white text-sm">{step.title}</span>
                  <span className="text-xs text-gray-400 leading-snug">{step.desc}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* DIMENSIONS */}
        <div className="card-glass rounded-2xl p-6">
          <h2 className="font-bold text-lg mb-4">測驗維度</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {test.dimensions.map(d => (
              <div
                key={d.id}
                className="flex items-center gap-2 bg-white/5 rounded-xl px-3 py-2"
              >
                <span className="text-lg">{d.icon}</span>
                <span className="text-sm text-gray-300">{d.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: '題目數量', value: test.questions.length > 0 ? `${test.questions.length} 題` : '約 25 題' },
            { label: '測驗時間', value: `${test.timeLimitMinutes} 分鐘` },
            { label: '結果類型', value: `${test.personalityTypes.length} 種` },
            { label: '難度', value: <DifficultyStars level={test.difficulty} /> },
          ].map(s => (
            <div key={s.label} className="card-glass rounded-xl p-4 text-center">
              <div className="text-xs text-gray-500 mb-1">{s.label}</div>
              <div className="font-bold text-sm flex justify-center">{s.value}</div>
            </div>
          ))}
        </div>

        {/* WHAT YOU GET */}
        <div className="card-glass rounded-2xl p-6">
          <h2 className="font-bold text-lg mb-5">你將獲得什麼？</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Free */}
            <div>
              <div className="text-sm font-semibold text-gray-400 mb-3">免費版</div>
              <ul className="space-y-2.5">
                {[
                  `${test.scoreLabel} 指數分數`,
                  '全球百分位排名',
                  '人格類型與描述',
                  '分數分佈圖',
                ].map(t => (
                  <li key={t} className="flex items-center gap-2 text-sm text-gray-300">
                    <span className="text-green-400">✓</span> {t}
                  </li>
                ))}
              </ul>
            </div>
            {/* Paid */}
            <div>
              <div className="text-sm font-semibold text-purple-400 mb-3">
                完整報告 ${test.price} USD
              </div>
              <ul className="space-y-2.5">
                {[
                  '包含所有免費版內容',
                  '各維度深度分析',
                  'AI 個人化建議',
                  '職涯發展方向',
                ].map(t => (
                  <li key={t} className="flex items-center gap-2 text-sm text-gray-300">
                    <span className="text-purple-400">✦</span> {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* TARGET AUDIENCE */}
        <div className="card-glass rounded-2xl p-5">
          <div className="text-sm text-gray-500 mb-2">適合對象</div>
          <div className="flex flex-wrap gap-2">
            {test.targetAudience.map(a => (
              <span
                key={a}
                className="text-sm px-3 py-1 rounded-full bg-white/5 text-gray-300"
              >
                {a}
              </span>
            ))}
          </div>
        </div>

        {/* CTA */}
        {test.comingSoon ? (
          <div className="card-glass rounded-3xl p-8 text-center">
            <div className="text-4xl mb-4">🔔</div>
            <h2 className="text-2xl font-black mb-2">即將推出</h2>
            <p className="text-gray-400 text-sm mb-6">
              留下你的 Email，上線第一時間通知你
            </p>
            {emailSubmitted ? (
              <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4 text-green-400">
                感謝！我們會在上線時通知你 🎉
              </div>
            ) : (
              <form onSubmit={handleEmailSubmit} className="flex flex-col sm:flex-row gap-3 max-w-sm mx-auto">
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-purple-500"
                />
                <button
                  type="submit"
                  className="btn-primary px-6 py-3 rounded-xl font-semibold text-white text-sm shrink-0"
                >
                  通知我
                </button>
              </form>
            )}
            <button
              onClick={() => navigate('/')}
              className="mt-4 text-sm text-gray-500 hover:text-gray-300 transition-colors"
            >
              先試其他測驗 →
            </button>
          </div>
        ) : (
          <div className="rounded-3xl p-8 text-center" style={{ background: 'linear-gradient(135deg, rgba(59,130,246,0.12), rgba(139,92,246,0.12))', border: '1px solid rgba(139,92,246,0.4)' }}>
            <h2 className="text-2xl font-black mb-2">準備好了嗎？</h2>
            <p className="text-gray-400 text-sm mb-6">
              約 {test.timeLimitMinutes} 分鐘完成 · 免費查看基礎分數
            </p>
            <button
              onClick={() => navigate(`/${test.id}/quiz`)}
              className="btn-primary px-12 py-4 rounded-2xl text-lg font-bold text-white shadow-2xl"
            >
              開始測驗 →
            </button>
            <div className="mt-4 text-xs text-gray-600">
              完整報告僅需 ${test.price} USD · 一次性解鎖
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
