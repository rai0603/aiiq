import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './index.css'

const NAV_LINKS = ['關於測驗', '測驗說明', '定價', 'FAQ']

const STEPS = [
  {
    num: '01',
    icon: '🧩',
    title: '完成 20 題測驗',
    desc: '涵蓋邏輯推理、空間思維、數字運算、語言理解等多元題型，難度循序漸進，限時 30 分鐘。',
  },
  {
    num: '02',
    icon: '📊',
    title: '即時獲得 IQ 分數',
    desc: '測驗結束立即顯示你的智商估計分數，以及在全球受測者中的常態分配位置與百分位排名。',
  },
  {
    num: '03',
    icon: '🤖',
    title: 'AI 深度分析報告',
    desc: '解鎖後，AI 針對你在各能力面向的表現，生成個人化分析與提升建議，完整了解你的智力輪廓。',
  },
]

const ABILITIES = [
  { label: '邏輯推理力', icon: '🧠' },
  { label: 'AI 認知力',  icon: '⚡' },
  { label: '提示工程力', icon: '🎯' },
  { label: '批判查核力', icon: '🔍' },
  { label: 'AI 倫理觀',  icon: '🌐' },
]

const FAQS = [
  {
    q: '這個 IQ 測驗準確嗎？',
    a: '本測驗參考標準智力測驗設計，涵蓋多元認知維度，結果可作為智力水準的合理估計參考，但非臨床診斷工具。',
  },
  {
    q: '測驗需要多長時間？',
    a: '共 20 題，總時限 30 分鐘。大多數受測者在 15–25 分鐘內完成。',
  },
  {
    q: '付費報告包含什麼？',
    a: 'AI 針對邏輯、空間、數字、語言、記憶、速度六大維度的詳細表現分析，以及個人化能力提升建議。',
  },
  {
    q: '我的資料會被保存嗎？',
    a: '我們僅保存匿名化測驗結果用於統計分析，不會儲存你的個人身份資訊。',
  },
]

function NormalDistChart({ score = 118 }: { score?: number }) {
  const pct = Math.min(100, Math.max(0, ((score - 70) / 60) * 100))
  return (
    <div className="relative w-full h-28">
      <svg viewBox="0 0 300 90" className="w-full h-full" preserveAspectRatio="none">
        <defs>
          <linearGradient id="cg" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.15" />
            <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.15" />
          </linearGradient>
        </defs>
        <path
          d="M0,88 C20,88 30,82 50,65 C70,45 80,8 100,4 C120,0 130,0 150,2 C170,4 180,0 200,4 C220,8 230,45 250,65 C270,82 280,88 300,88 Z"
          fill="url(#cg)" stroke="#6366f1" strokeWidth="1.5"
        />
        <line x1={pct * 3} y1="0" x2={pct * 3} y2="88" stroke="#facc15" strokeWidth="2" strokeDasharray="4,3" />
        <circle cx={pct * 3} cy="18" r="4" fill="#facc15" />
      </svg>
      <div className="absolute bottom-0 w-full flex justify-between text-xs text-gray-600 px-1">
        <span>70</span><span>85</span><span>100</span><span>115</span><span>130</span>
      </div>
    </div>
  )
}

export default function App() {
  const navigate = useNavigate()
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <div className="min-h-screen bg-[#05081a] text-white overflow-x-hidden">

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-16 py-4 border-b border-white/5 bg-[#05081a]/80 backdrop-blur-md">
        <span className="text-2xl font-black gradient-text tracking-tight">AI-IQ</span>
        <div className="hidden md:flex items-center gap-8 text-sm text-gray-400">
          {NAV_LINKS.map(l => (
            <a key={l} href="#" className="hover:text-white transition-colors">{l}</a>
          ))}
        </div>
        <button onClick={() => navigate('/quiz')} className="btn-primary px-5 py-2 rounded-full text-sm font-semibold text-white">
          開始測驗
        </button>
      </nav>

      {/* HERO */}
      <section className="grid-bg relative pt-36 pb-24 px-6 md:px-16 flex flex-col items-center text-center overflow-hidden">
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-40 right-1/4 w-72 h-72 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 text-sm text-blue-300 mb-6">
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          已有 142,831 人完成測驗
        </div>

        <h1 className="text-5xl md:text-7xl font-black leading-tight mb-6 max-w-4xl">
          你在 AI 時代<br />
          <span className="gradient-text">準備好了嗎？</span>
        </h1>

        <p className="text-gray-400 text-lg md:text-xl max-w-xl mb-10 leading-relaxed">
          25 題科學測驗，評估你的邏輯力、AI 認知力、提示工程力、批判查核力與 AI 倫理觀。<br />
          測出你的 <strong className="text-white">AI-IQ 指數</strong>，解鎖 AI 個人化深度報告。
        </p>

        <div className="flex flex-col sm:flex-row gap-4 items-center mb-16">
          <button onClick={() => navigate('/quiz')} className="btn-primary px-10 py-4 rounded-2xl text-lg font-bold text-white shadow-2xl">
            免費開始測驗 →
          </button>
          <span className="text-gray-500 text-sm">完整報告僅需 $0.99 美金</span>
        </div>

        {/* MOCK RESULT CARD */}
        <div className="float-anim card-glass rounded-3xl p-6 md:p-8 w-full max-w-md shadow-2xl text-left">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-gray-400">測驗結果預覽</span>
            <span className="bg-green-500/20 text-green-400 text-xs px-2 py-1 rounded-full">已完成</span>
          </div>
          <div className="flex items-end gap-3 mb-1">
            <span className="text-6xl font-black gradient-text">118</span>
            <span className="text-gray-400 pb-2">IQ 分數</span>
          </div>
          <p className="text-sm text-gray-400 mb-4">
            超越全球 <span className="text-yellow-400 font-semibold">88%</span> 的受測者
          </p>
          <NormalDistChart score={118} />
          <div className="mt-4 grid grid-cols-3 gap-2">
            {ABILITIES.slice(0, 3).map(a => (
              <div key={a.label} className="bg-white/5 rounded-xl p-2 text-center">
                <div className="text-lg mb-0.5">{a.icon}</div>
                <div className="text-xs text-gray-400">{a.label}</div>
                <div className="text-xs text-gray-600 mt-1">🔒 解鎖後</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-24 px-6 md:px-16 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black mb-4">三步驟了解你的智力輪廓</h2>
          <p className="text-gray-400">從測驗到深度報告，全程不超過 30 分鐘</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {STEPS.map((s, i) => (
            <div key={i} className="card-glass rounded-2xl p-6 relative overflow-hidden group hover:border-white/20 transition-all duration-300">
              <div className="absolute top-4 right-4 text-5xl font-black text-white/5 group-hover:text-white/10 transition-all">
                {s.num}
              </div>
              <div className="text-4xl mb-4">{s.icon}</div>
              <h3 className="text-lg font-bold mb-2">{s.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ABILITIES */}
      <section className="py-24 px-6 md:px-16 bg-white/[0.02] border-y border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black mb-4">五大維度，全面評估 AI 時代競爭力</h2>
            <p className="text-gray-400">不只是一個分數，而是你在 AI 時代的完整能力輪廓</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {ABILITIES.map((a, i) => (
              <div key={i} className="card-glass rounded-2xl p-5 flex items-center gap-4 hover:bg-white/[0.07] transition-all">
                <span className="text-3xl">{a.icon}</span>
                <div>
                  <div className="font-semibold">{a.label}</div>
                  <div className="text-xs text-gray-500 mt-0.5">完整報告解鎖</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="py-24 px-6 md:px-16 max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-black mb-4">透明定價</h2>
        <p className="text-gray-400 mb-12">測驗免費，深度報告一次性解鎖</p>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="card-glass rounded-3xl p-8 text-left">
            <div className="text-gray-400 text-sm mb-2">基本版</div>
            <div className="text-4xl font-black mb-1">免費</div>
            <div className="text-gray-500 text-sm mb-6">測驗完成後立即查看</div>
            <ul className="space-y-3 text-sm text-gray-300">
              {['IQ 估計分數', '全球百分位排名', '常態分配位置圖', '六大維度預覽（鎖定）'].map(t => (
                <li key={t} className="flex items-center gap-2">
                  <span className="text-green-400">✓</span> {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="relative rounded-3xl p-8 text-left overflow-hidden" style={{ background: 'linear-gradient(135deg, rgba(59,130,246,0.12), rgba(139,92,246,0.12))', border: '1px solid rgba(139,92,246,0.4)' }}>
            <div className="absolute top-4 right-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs px-3 py-1 rounded-full font-semibold">
              推薦
            </div>
            <div className="text-purple-300 text-sm mb-2">完整報告</div>
            <div className="text-4xl font-black mb-1">$0.99 <span className="text-lg text-gray-400 font-normal">USD</span></div>
            <div className="text-gray-500 text-sm mb-6">一次性解鎖，永久保存</div>
            <ul className="space-y-3 text-sm text-gray-300">
              {['包含所有免費版內容', '六大維度詳細分析', 'AI 個人化能力評估', '具體提升建議', '完整 PDF 報告下載'].map(t => (
                <li key={t} className="flex items-center gap-2">
                  <span className="text-purple-400">✦</span> {t}
                </li>
              ))}
            </ul>
            <button className="btn-primary w-full mt-6 py-3 rounded-xl font-bold text-white">
              立即解鎖報告
            </button>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-6 md:px-16 max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-black mb-12 text-center">常見問題</h2>
        <div className="space-y-3">
          {FAQS.map((f, i) => (
            <div key={i} className="card-glass rounded-2xl overflow-hidden">
              <button
                className="w-full text-left px-6 py-4 flex items-center justify-between hover:bg-white/5 transition-all"
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
              >
                <span className="font-medium">{f.q}</span>
                <span className={`text-gray-400 text-xl transition-transform duration-200 ${openFaq === i ? 'rotate-45' : ''}`}>+</span>
              </button>
              {openFaq === i && (
                <div className="px-6 pb-4 text-gray-400 text-sm leading-relaxed border-t border-white/5 pt-3">
                  {f.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-24 px-6 md:px-16 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-900/10 to-purple-900/10 pointer-events-none" />
        <h2 className="text-4xl md:text-5xl font-black mb-4 relative">
          準備好測量你的智商了嗎？
        </h2>
        <p className="text-gray-400 mb-8 relative">加入超過 14 萬人，只需 20 分鐘</p>
        <button onClick={() => navigate('/quiz')} className="btn-primary px-12 py-4 rounded-2xl text-lg font-bold text-white shadow-2xl relative">
          立即免費測驗 →
        </button>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/5 py-8 px-6 md:px-16 flex flex-col md:flex-row items-center justify-between text-sm text-gray-600 gap-4">
        <span className="font-black gradient-text text-base">AI-IQ</span>
        <div className="flex gap-6">
          <a href="#" className="hover:text-gray-400 transition-colors">隱私政策</a>
          <a href="#" className="hover:text-gray-400 transition-colors">服務條款</a>
          <a href="#" className="hover:text-gray-400 transition-colors">聯絡我們</a>
        </div>
        <span>© 2026 AI-IQ. All rights reserved.</span>
      </footer>
    </div>
  )
}
