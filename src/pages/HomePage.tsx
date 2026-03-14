import { useNavigate } from 'react-router-dom'
import { ALL_TESTS } from '../data/tests'

function DifficultyStars({ level }: { level: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map(i => (
        <span key={i} className={`text-xs ${i <= level ? 'text-yellow-400' : 'text-gray-700'}`}>★</span>
      ))}
    </div>
  )
}

export default function HomePage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-[#05081a] text-white overflow-x-hidden">

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-16 py-4 border-b border-white/5 bg-[#05081a]/80 backdrop-blur-md">
        <span className="text-2xl font-black gradient-text tracking-tight">IQ Suite</span>
        <div className="hidden md:flex items-center gap-8 text-sm text-gray-400">
          <a href="#tests" className="hover:text-white transition-colors">所有測驗</a>
          <a href="#pricing" className="hover:text-white transition-colors">定價</a>
        </div>
        <button
          onClick={() => navigate('/aiiq')}
          className="btn-primary px-5 py-2 rounded-full text-sm font-semibold text-white"
        >
          免費開始 →
        </button>
      </nav>

      {/* HERO */}
      <section className="grid-bg relative pt-36 pb-24 px-6 md:px-16 flex flex-col items-center text-center overflow-hidden">
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-40 right-1/4 w-72 h-72 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 text-sm text-blue-300 mb-6">
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          9 種專業測驗，即時解鎖你的能力輪廓
        </div>

        <h1 className="text-5xl md:text-7xl font-black leading-tight mb-6 max-w-4xl">
          測出你的<br />
          <span className="gradient-text">真實智識水平</span>
        </h1>

        <p className="text-gray-400 text-lg md:text-xl max-w-xl mb-10 leading-relaxed">
          從 AI 素養到財商、領導力到身心健康，<br />
          科學設計的多維測驗，給你最真實的能力報告。
        </p>

        <div className="flex flex-col sm:flex-row gap-4 items-center mb-16">
          <button
            onClick={() => navigate('/aiiq')}
            className="btn-primary px-10 py-4 rounded-2xl text-lg font-bold text-white shadow-2xl"
          >
            先試 AI素養測驗 →
          </button>
          <a href="#tests" className="text-gray-500 text-sm hover:text-gray-300 transition-colors">
            查看全部 9 種測驗
          </a>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-8 text-center">
          {[
            { num: '9', label: '種測驗' },
            { num: '10', label: '分鐘完成' },
            { num: '即時', label: '報告' },
          ].map(s => (
            <div key={s.label}>
              <div className="text-3xl font-black gradient-text">{s.num}</div>
              <div className="text-xs text-gray-500 mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* TEST GRID */}
      <section id="tests" className="py-24 px-6 md:px-16 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black mb-4">選擇你的測驗</h2>
          <p className="text-gray-400">每項測驗皆有科學設計的多維度評估，完成即可查看基礎分數</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ALL_TESTS.map(test => (
            <div
              key={test.id}
              className="card-glass rounded-2xl p-6 flex flex-col gap-4 hover:border-white/20 transition-all duration-300 group"
            >
              {/* Header */}
              <div className="flex items-start justify-between">
                <div>
                  <span
                    className="text-xs px-2 py-0.5 rounded-full font-medium"
                    style={{ background: `${test.categoryColor}20`, color: test.categoryColor }}
                  >
                    {test.category}
                  </span>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-2xl">{test.icon}</span>
                    <h3 className="font-bold text-lg leading-tight">{test.name}</h3>
                  </div>
                </div>
                {test.comingSoon && (
                  <span className="text-xs bg-white/5 text-gray-500 px-2 py-1 rounded-full shrink-0">即將推出</span>
                )}
              </div>

              {/* Description */}
              <p className="text-gray-400 text-sm leading-relaxed">{test.description}</p>

              {/* Dimension tags */}
              <div className="flex flex-wrap gap-1.5">
                {test.dimensions.slice(0, 4).map(d => (
                  <span
                    key={d.id}
                    className="text-xs px-2 py-0.5 rounded-full bg-white/5 text-gray-400"
                  >
                    {d.icon} {d.label}
                  </span>
                ))}
                {test.dimensions.length > 4 && (
                  <span className="text-xs px-2 py-0.5 rounded-full bg-white/5 text-gray-500">
                    +{test.dimensions.length - 4}
                  </span>
                )}
              </div>

              {/* Stats row */}
              <div className="flex items-center gap-4 text-xs text-gray-500">
                <span>{test.questions.length > 0 ? `${test.questions.length}題` : '~25題'}</span>
                <span>·</span>
                <span>{test.timeLimitMinutes} 分鐘</span>
                <span>·</span>
                <span>{test.personalityTypes.length} 型結果</span>
                <span>·</span>
                <DifficultyStars level={test.difficulty} />
              </div>

              {/* Audience */}
              <div className="text-xs text-gray-600">
                適合：{test.targetAudience.join(' / ')}
              </div>

              {/* CTA */}
              <div className="mt-auto pt-2">
                {test.comingSoon ? (
                  <button
                    disabled
                    className="w-full py-2.5 rounded-xl text-sm font-semibold bg-white/5 text-gray-600 cursor-not-allowed"
                  >
                    即將推出
                  </button>
                ) : (
                  <button
                    onClick={() => navigate(`/${test.id}`)}
                    className="btn-primary w-full py-2.5 rounded-xl text-sm font-semibold text-white"
                  >
                    開始測驗 →
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* BUNDLE PRICING */}
      <section id="pricing" className="py-24 px-6 md:px-16 bg-white/[0.02] border-y border-white/5">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black mb-4">透明定價</h2>
            <p className="text-gray-400">測驗免費，付費解鎖完整深度報告</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Single */}
            <div className="card-glass rounded-3xl p-8 text-center">
              <div className="text-gray-400 text-sm mb-3">單項報告</div>
              <div className="text-4xl font-black mb-1">$0.99</div>
              <div className="text-gray-500 text-xs mb-6">$1.99 USD / 項</div>
              <ul className="space-y-2 text-sm text-gray-400 text-left">
                {['即時基礎分數', '人格類型解析', '完整維度分析', 'AI 個人化建議'].map(t => (
                  <li key={t} className="flex items-center gap-2">
                    <span className="text-green-400">✓</span> {t}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => navigate('/aiiq')}
                className="btn-primary w-full mt-6 py-3 rounded-xl text-sm font-semibold text-white"
              >
                先試 AI素養測驗
              </button>
            </div>

            {/* Bundle 3 */}
            <div className="card-glass rounded-3xl p-8 text-center relative" style={{ border: '1px solid rgba(139,92,246,0.4)' }}>
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs px-4 py-1 rounded-full font-semibold">
                最受歡迎
              </div>
              <div className="text-purple-300 text-sm mb-3">任選 3 項</div>
              <div className="text-4xl font-black mb-1">8 折</div>
              <div className="text-gray-500 text-xs mb-6">解鎖 3 份完整報告</div>
              <ul className="space-y-2 text-sm text-gray-300 text-left">
                {['包含所有單項功能', '跨測驗能力對比', '優先體驗新測驗', '可分享成就卡片'].map(t => (
                  <li key={t} className="flex items-center gap-2">
                    <span className="text-purple-400">✦</span> {t}
                  </li>
                ))}
              </ul>
              <button className="btn-primary w-full mt-6 py-3 rounded-xl text-sm font-semibold text-white opacity-60 cursor-not-allowed">
                即將推出
              </button>
            </div>

            {/* Full suite */}
            <div className="card-glass rounded-3xl p-8 text-center">
              <div className="text-yellow-400 text-sm mb-3">全套 9 項</div>
              <div className="text-4xl font-black mb-1">$9.99</div>
              <div className="text-gray-500 text-xs mb-6">
                <span className="line-through mr-1">$14+</span> 節省 30%
              </div>
              <ul className="space-y-2 text-sm text-gray-400 text-left">
                {['所有測驗完整報告', '能力全景雷達圖', '年度能力追蹤', 'PDF 下載'].map(t => (
                  <li key={t} className="flex items-center gap-2">
                    <span className="text-yellow-400">★</span> {t}
                  </li>
                ))}
              </ul>
              <button className="btn-primary w-full mt-6 py-3 rounded-xl text-sm font-semibold text-white opacity-60 cursor-not-allowed">
                即將推出
              </button>
            </div>
          </div>

          <p className="text-center text-xs text-gray-600 mt-8">
            免費可查看基礎分數與人格類型 · 付費解鎖維度分析、AI 建議與完整報告
          </p>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-24 px-6 md:px-16 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-900/10 to-purple-900/10 pointer-events-none" />
        <h2 className="text-4xl md:text-5xl font-black mb-4 relative">
          準備好了解自己了嗎？
        </h2>
        <p className="text-gray-400 mb-8 relative">從 AI 素養開始，10 分鐘掌握你的能力輪廓</p>
        <button
          onClick={() => navigate('/aiiq')}
          className="btn-primary px-12 py-4 rounded-2xl text-lg font-bold text-white shadow-2xl relative"
        >
          立即免費測驗 →
        </button>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/5 py-8 px-6 md:px-16 flex flex-col md:flex-row items-center justify-between text-sm text-gray-600 gap-4">
        <span className="font-black gradient-text text-base">IQ Suite</span>
        <div className="flex gap-6">
          <a href="#" className="hover:text-gray-400 transition-colors">隱私政策</a>
          <a href="#" className="hover:text-gray-400 transition-colors">服務條款</a>
          <a href="#" className="hover:text-gray-400 transition-colors">聯絡我們</a>
        </div>
        <span>© 2026 IQ Suite. All rights reserved.</span>
      </footer>
    </div>
  )
}
