import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getTest } from '../data/tests'
import type { DimensionConfig } from '../data/tests'
import type { TestResult } from '../utils/scoring'

/** 根據維度百分比（0-100）估算相對百分位，假設平均值 55，SD 20 */
function dimToPercentile(pct: number): number {
  const mean = 55, sd = 20
  const z = (pct - mean) / sd
  const erf = (x: number) => {
    const a1=0.254829592,a2=-0.284496736,a3=1.421413741,a4=-1.453152027,a5=1.061405429,p=0.3275911
    const sign = x < 0 ? -1 : 1
    const t = 1 / (1 + p * Math.abs(x))
    const y = 1 - (((((a5*t+a4)*t)+a3)*t+a2)*t+a1)*t*Math.exp(-x*x)
    return sign * y
  }
  const perc = 0.5 * (1 + erf(z / Math.sqrt(2)))
  return Math.round(Math.min(99, Math.max(1, perc * 100)))
}

const SITE_URL = 'https://aiiq.app'

function ShareButtons({ result, testName, scoreLabel }: { result: TestResult; testName: string; scoreLabel: string }) {
  const [copied, setCopied] = useState(false)

  const shareText = `🧠 我的 ${scoreLabel} 是 ${result.score} 分！超越全球 ${result.percentile}% 的受測者\n\n我的能力類型：${result.personalityType.icon} ${result.personalityType.label}\n「${result.personalityType.desc}」\n\n測測你的 ${scoreLabel} → ${SITE_URL}\n#${scoreLabel} #IQSuite #能力測驗`

  const shareToFacebook = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(SITE_URL)}&quote=${encodeURIComponent(`我的 ${scoreLabel} 是 ${result.score} 分！超越全球 ${result.percentile}% 的受測者 ${result.personalityType.icon} ${result.personalityType.label} — 測測你的 ${scoreLabel} → ${SITE_URL}`)}`,
      '_blank', 'width=600,height=500'
    )
  }

  const shareToThreads = () => {
    window.open(
      `https://www.threads.net/intent/post?text=${encodeURIComponent(shareText)}`,
      '_blank', 'width=600,height=700'
    )
  }

  const copyForInstagram = async () => {
    await navigator.clipboard.writeText(shareText)
    setCopied(true)
    setTimeout(() => setCopied(false), 3000)
    setTimeout(() => window.open('https://www.instagram.com/', '_blank'), 400)
  }

  return (
    <div className="card-glass rounded-2xl p-5">
      <div className="text-center mb-4">
        <div className="text-sm font-semibold text-gray-300 mb-1">分享你的結果</div>
        <div className="text-xs text-gray-500">讓朋友也來測測 {testName}</div>
      </div>
      <div className="grid grid-cols-3 gap-3">
        <button
          onClick={shareToFacebook}
          className="flex flex-col items-center gap-2 py-3 rounded-xl bg-[#1877F2]/15 border border-[#1877F2]/30 hover:bg-[#1877F2]/25 transition-all"
        >
          <svg viewBox="0 0 24 24" className="w-6 h-6 fill-[#1877F2]">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
          <span className="text-xs text-[#1877F2] font-medium">Facebook</span>
        </button>
        <button
          onClick={shareToThreads}
          className="flex flex-col items-center gap-2 py-3 rounded-xl bg-white/5 border border-white/15 hover:bg-white/10 transition-all"
        >
          <svg viewBox="0 0 192 192" className="w-6 h-6 fill-white">
            <path d="M141.537 88.9883C140.71 88.5919 139.87 88.2104 139.019 87.8451C137.537 60.5382 122.616 44.905 97.5619 44.745C97.4484 44.7443 97.3355 44.7443 97.222 44.7443C82.2364 44.7443 69.7731 51.1409 62.102 62.7807L75.881 72.2328C81.6116 63.5383 90.6052 61.6848 97.2286 61.6848C97.3051 61.6848 97.3819 61.6848 97.4576 61.6855C105.707 61.7381 111.932 64.1366 115.961 68.814C118.893 72.2193 120.854 76.925 121.825 82.8638C114.511 81.6207 106.601 81.2385 98.145 81.7233C74.3203 83.0954 59.0956 96.9879 60.1067 116.43C60.6484 126.687 65.9352 135.339 74.9173 141.27C82.5281 146.357 92.3507 148.8 102.539 148.317C115.959 147.67 126.469 142.487 133.745 132.913C139.231 125.607 142.61 116.96 143.938 106.744C148.716 109.474 152.264 113.157 154.386 117.704C157.977 125.383 158.171 138.279 148.434 148.017C140.003 156.449 129.6 160.14 113.395 160.26C95.5845 160.126 81.9484 154.626 72.8577 143.913C64.4601 133.983 60.1349 119.635 59.9869 101.4C60.1349 83.1645 64.4601 68.8168 72.8577 58.8872C81.9484 48.1742 95.5845 42.674 113.395 42.54C131.321 42.674 145.004 48.2017 154.138 59.0088C158.63 64.3361 161.994 71.1069 164.148 79.1602L181.208 74.4288C178.506 64.0681 174.136 55.0987 168.105 47.6553C155.949 32.6231 138.5 24.7662 116.312 24.622C96.7019 24.7439 80.3744 30.1764 68.8116 40.8284C57.8299 51.0131 51.1264 65.9743 50.3998 84.1024C50.3999 84.1044 50.4 84.1064 50.4 84.1084C50.4 84.1104 50.3999 84.1124 50.3998 84.1144C49.6742 102.282 56.3778 117.247 67.3586 127.376C78.9209 137.987 95.241 143.42 114.849 143.541C133.011 143.417 147.744 138.517 158.152 128.762C171.547 116.347 171.016 100.488 166.509 91.0902C162.94 83.7498 156.141 77.8587 147.415 74.2073C145.831 79.1427 143.876 83.7186 141.537 88.9883Z"/>
          </svg>
          <span className="text-xs text-gray-300 font-medium">Threads</span>
        </button>
        <button
          onClick={copyForInstagram}
          className="flex flex-col items-center gap-2 py-3 rounded-xl bg-gradient-to-br from-[#f09433]/15 via-[#e6683c]/10 to-[#dc2743]/15 border border-[#e6683c]/25 hover:from-[#f09433]/25 hover:to-[#dc2743]/25 transition-all"
        >
          {copied ? (
            <span className="text-lg">✓</span>
          ) : (
            <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none">
              <defs>
                <linearGradient id="ig-grad" x1="0" y1="1" x2="1" y2="0">
                  <stop offset="0%" stopColor="#f09433"/>
                  <stop offset="50%" stopColor="#e6683c"/>
                  <stop offset="100%" stopColor="#bc1888"/>
                </linearGradient>
              </defs>
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" fill="url(#ig-grad)"/>
            </svg>
          )}
          <span className="text-xs font-medium" style={{ background: 'linear-gradient(135deg, #f09433, #bc1888)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            {copied ? '已複製！' : 'Instagram'}
          </span>
        </button>
      </div>
      {copied && (
        <p className="text-center text-xs text-gray-400 mt-3">
          文字已複製到剪貼簿，請貼上到 Instagram 貼文或限時動態
        </p>
      )}
    </div>
  )
}

function RadarChart({ scores, dimensions }: { scores: Record<string, number>; dimensions: DimensionConfig[] }) {
  const cx = 150, cy = 150, r = 100
  const angles = dimensions.map((_, i) => (i * 2 * Math.PI) / dimensions.length - Math.PI / 2)

  const toXY = (angle: number, radius: number) => ({
    x: cx + radius * Math.cos(angle),
    y: cy + radius * Math.sin(angle),
  })

  const gridLevels = [20, 40, 60, 80, 100]

  const dataPoints = dimensions.map((dim, i) => {
    const pct = scores[dim.id] ?? 0
    return toXY(angles[i], (pct / 100) * r)
  })

  const dataPath = dataPoints.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ') + ' Z'

  return (
    <svg viewBox="0 0 300 300" className="w-full max-w-xs mx-auto">
      {gridLevels.map(lvl => (
        <polygon
          key={lvl}
          points={angles.map(a => {
            const p = toXY(a, (lvl / 100) * r)
            return `${p.x},${p.y}`
          }).join(' ')}
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="1"
        />
      ))}
      {angles.map((a, i) => {
        const end = toXY(a, r)
        return <line key={i} x1={cx} y1={cy} x2={end.x} y2={end.y} stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
      })}
      <path d={dataPath} fill="rgba(99,102,241,0.25)" stroke="#6366f1" strokeWidth="2" />
      {dataPoints.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r="4" fill={dimensions[i].color} />
      ))}
      {dimensions.map((dim, i) => {
        const offset = 18
        const p = toXY(angles[i], r + offset)
        return (
          <text key={dim.id} x={p.x} y={p.y} textAnchor="middle" dominantBaseline="middle" fontSize="10" fill="#9ca3af">
            {dim.icon} {dim.label}
          </text>
        )
      })}
    </svg>
  )
}

function NormalDistBar({ score, scoreMax }: { score: number; scoreMax: number }) {
  const pct = Math.min(100, Math.max(0, (score / scoreMax) * 100))
  return (
    <div className="relative w-full h-24">
      <svg viewBox="0 0 300 80" className="w-full h-full" preserveAspectRatio="none">
        <defs>
          <linearGradient id="ng" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.15" />
            <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.15" />
          </linearGradient>
        </defs>
        <path d="M0,76 C20,76 30,70 50,54 C70,36 80,6 100,3 C120,0 130,0 150,1.5 C170,3 180,0 200,3 C220,6 230,36 250,54 C270,70 280,76 300,76 Z"
          fill="url(#ng)" stroke="#6366f1" strokeWidth="1.5" />
        <line x1={pct * 3} y1="0" x2={pct * 3} y2="76" stroke="#facc15" strokeWidth="2" strokeDasharray="4,3" />
        <circle cx={pct * 3} cy="14" r="4" fill="#facc15" />
      </svg>
      <div className="absolute bottom-0 w-full flex justify-between text-xs text-gray-600 px-1">
        <span>0</span>
        <span>{Math.round(scoreMax * 0.25)}</span>
        <span>{Math.round(scoreMax * 0.5)}</span>
        <span>{Math.round(scoreMax * 0.75)}</span>
        <span>{scoreMax}</span>
      </div>
    </div>
  )
}

// AIIQ-specific paid report — dimension analysis cards
function AiiqPaidReport({ result, dimensions }: { result: TestResult; dimensions: DimensionConfig[] }) {
  return (
    <div className="card-glass rounded-3xl p-8 space-y-6">
      <h3 className="font-bold text-xl mb-2">🤖 AI 個人化分析</h3>

      {/* 偏態分析 */}
      {result.biasAnalysis && (
        <div className="bg-indigo-500/10 border border-indigo-500/30 rounded-2xl p-5 space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-lg">📊</span>
            <span className="font-semibold text-white">能力偏態分析</span>
            <span className="text-xs px-2 py-0.5 rounded-full ml-auto bg-indigo-500/20 text-indigo-300">
              {result.biasAnalysis.label}
            </span>
          </div>
          <p className="text-sm text-gray-300 leading-relaxed">{result.biasAnalysis.desc}</p>
          <div>
            <div className="flex items-center gap-1.5 mb-2">
              <span className="text-green-400">⚡</span>
              <span className="text-xs font-semibold text-green-400 uppercase tracking-wide">立即可行的行動</span>
            </div>
            <ol className="space-y-1.5">
              {result.biasAnalysis.immediate.map((item: string, idx: number) => (
                <li key={idx} className="flex gap-2 text-sm text-gray-300">
                  <span className="shrink-0 font-bold text-green-400">{idx + 1}.</span>
                  <span>{item}</span>
                </li>
              ))}
            </ol>
          </div>
          <div>
            <div className="flex items-center gap-1.5 mb-2">
              <span className="text-blue-400">🎯</span>
              <span className="text-xs font-semibold text-blue-400 uppercase tracking-wide">未來提升方向與目標</span>
            </div>
            <ol className="space-y-1.5">
              {result.biasAnalysis.future.map((item: string, idx: number) => (
                <li key={idx} className="flex gap-2 text-sm text-gray-300">
                  <span className="shrink-0 font-bold text-blue-400">{idx + 1}.</span>
                  <span>{item}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      )}

      {/* 各維度分析 */}
      <div className="space-y-4 text-sm text-gray-300 leading-relaxed">
        {dimensions.map(dim => {
          const pct = result.dimensionScores[dim.id]?.percent ?? 0
          const level = pct >= 80 ? '優秀' : pct >= 60 ? '良好' : '需要加強'

          type DimAnalysis = { analysis: string; tips: string[]; roles: string }
          const suggestion: Record<string, DimAnalysis> = {
            ai_cognition: pct >= 70 ? {
              analysis: '你對AI的核心運作機制有清晰的理解，能分辨不同AI工具的特性差異，並知道何時該使用何種工具。這種「知其然也知其所以然」的認知，讓你在使用AI時不容易被幻覺誤導，也能有效評估AI輸出的可靠性。',
              tips: [
                '深入研究RAG與Fine-tuning的實際應用場景，了解何時用哪種方案',
                '持續追蹤Arxiv、AI Alignment Forum等技術社群，掌握最新模型發展',
                '嘗試實際串接API，從工程視角更深刻理解模型的能力邊界',
              ],
              roles: 'AI產品經理、技術顧問、AI應用開發者、數位轉型專案負責人、科技媒體編輯',
            } : {
              analysis: '對AI工具的認知仍停留在表面使用層次，尚未建立對LLM運作原理的系統性理解。這可能導致你在AI給出自信但錯誤的答案時難以察覺，或在選擇AI工具時缺乏判斷依據。',
              tips: [
                '從閱讀《人工智能：一種現代方法》或Andrej Karpathy的YouTube教學開始，建立基礎概念',
                '親自嘗試ChatGPT、Claude、Gemini三款工具，比較它們在同一問題上的差異，培養工具敏感度',
                '訂閱INSIDE、科技新報等科技媒體，每週花10分鐘關注AI新聞，逐步累積背景知識',
              ],
              roles: '建議在目前職位中主動承擔AI工具導入的試驗性任務，以實踐帶動理解',
            },
            prompt: pct >= 70 ? {
              analysis: '你具備與AI高效溝通的核心能力，能精準表達需求、設定適當角色、控制輸出格式。這在AI工具普及的職場中是罕見的競爭優勢，能讓你從AI工具中榨取遠超一般用戶的價值。',
              tips: [
                '建立個人Prompt資料庫，按任務類型分類儲存，持續迭代優化',
                '學習「思維鏈提示（CoT）」與「少樣本提示（Few-shot）」的進階技術',
                '嘗試設計Multi-step Prompt工作流程，將複雜項目拆解為AI可逐步完成的子任務鏈',
              ],
              roles: 'AI提示工程師（Prompt Engineer）、AI內容策略師、行銷創意總監、教育訓練設計師',
            } : {
              analysis: '你對AI的使用仍停留在「問問題、收答案」的階段，尚未掌握主動引導AI輸出方向的技巧。這導致你獲得的AI回應往往是泛泛而談，難以直接應用。',
              tips: [
                '每次使用AI前，先明確3件事：角色（AI應扮演誰）、任務（具體要做什麼）、格式（希望如何呈現輸出）',
                '參考「CRISPE框架」練習結構化Prompt',
                '遇到不滿意的回答，在同一對話中給出具體的修改指令',
              ],
              roles: '任何需要大量文字產出的職位都能受益，尤其是文案、客服、教育、行政等領域',
            },
            critical: pct >= 70 ? {
              analysis: '你具備在AI時代最稀缺的能力之一——對AI輸出保持健康的批判態度，並有能力驗證其準確性。在資訊氾濫的時代，你不會輕易被AI自信的語氣所迷惑。',
              tips: [
                '建立「AI輸出查核清單」：數字是否有來源？引用是否可查？預測是否有假設前提？',
                '培養「要求AI扮演魔鬼代言人」的習慣，讓AI主動提出反方論點',
                '學習基本的資訊素養技能，如識別網站可信度、使用Google Scholar查驗學術引用',
              ],
              roles: '研究分析師、新聞查核員（Fact-checker）、法律／醫療／金融等高風險決策領域',
            } : {
              analysis: '你目前可能傾向相信AI提供的資訊，較少主動查核其準確性。在AI能夠以極高自信捏造細節的今天，這是一個需要優先強化的能力。',
              tips: [
                '建立「三不原則」：不直接引用AI數字、不相信AI提供的學術引用未驗證、不把AI的醫療／法律建議視為最終答案',
                '每週練習一次「反向驗證」：選一個AI給你的具體事實，花5分鐘找到原始資料確認',
                '閱讀《Calling Bullshit》或TED的資訊素養課程，系統性建立批判思維',
              ],
              roles: '提升此能力後，對醫療、法律、金融、新聞、教育等高度資訊準確性工作者尤為重要',
            },
            knowledge_mgmt: pct >= 70 ? {
              analysis: '你擅長利用AI作為知識管理的強大工具，能有效地整理、整合、應用大量資訊。你理解AI在知識管理中的角色——它是「知識加速器」而非「知識倉庫」。',
              tips: [
                '嘗試搭建個人RAG知識庫（如NotebookLM + Obsidian），讓你的知識資產可被AI即時檢索',
                '設計「知識飛輪」工作流程：閱讀→AI摘要→與既有知識連結→輸出應用→複盤迭代',
                '嘗試將AI知識管理系統導入團隊，建立共享知識庫',
              ],
              roles: '知識管理顧問、研發主管、教育課程設計師、智庫分析師、內容策略總監',
            } : {
              analysis: '你目前使用AI的方式較為零散，尚未建立系統性的AI輔助知識管理流程。大量閱讀和學習的成果，可能因為缺乏有效的整理方式而難以沉澱。',
              tips: [
                '從最簡單的「AI輔助摘要」開始：每讀完一篇文章，花1分鐘用AI生成3個重點，存入筆記工具',
                '嘗試NotebookLM（Google免費工具），上傳你常用的參考文件，體驗RAG式知識庫的威力',
                '建立「每週知識複盤」習慣：週五花15分鐘整理本週所學',
              ],
              roles: '任何需要持續學習的知識工作者都能從提升知識管理能力中受益',
            },
            ethics: pct >= 70 ? {
              analysis: '你對AI倫理的敏感度讓你成為組織中難得的「負責任AI使用者」。你知道在哪些場景下AI使用涉及法律風險（如個資、著作權），也能識別算法偏見。',
              tips: [
                '深入了解台灣《個人資料保護法》與歐盟《AI法案（EU AI Act）》的核心條文',
                '關注AI倫理研究機構（如AI Now Institute、中研院AI倫理研究）的最新報告',
                '在你的組織中倡導建立「AI使用指引」，將負責任AI的概念推廣給同事',
              ],
              roles: 'AI政策分析師、企業法務／合規顧問、CSR主管、AI倫理研究員',
            } : {
              analysis: '你對AI使用的倫理與風險面向尚缺乏系統性認識。不了解這些邊界可能讓你或你的組織面臨法律風險（如個資外洩、著作權爭議）或社會代價。',
              tips: [
                '立即行動：查看你常用AI服務的隱私政策，確認哪些資料會被用於訓練，避免輸入公司機密或個資',
                '學習辨識Deepfake的基本方法，並在社群媒體上養成「先核實再分享」的習慣',
                '閱讀《AI倫理》相關入門書籍（如凱特·克勞馥的《Atlas of AI》）',
              ],
              roles: '提升此能力後，能在任何職位上更安全、負責任地使用AI工具',
            },
          }

          const dimData = suggestion[dim.id] ?? {
            analysis: `你在${dim.label}方面的表現${pct >= 70 ? '良好' : '有提升空間'}。持續練習與學習，你將能進一步提升這個維度的能力。`,
            tips: ['持續實踐相關技能', '尋找相關學習資源', '在實際情境中應用'],
            roles: '根據你的行業，此能力有廣泛的應用場景',
          }

          return (
            <div key={dim.id} className="bg-white/5 rounded-xl p-4 space-y-3">
              <div className="flex items-center gap-2 flex-wrap">
                <span>{dim.icon}</span>
                <span className="font-semibold text-white">{dim.label}</span>
                <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: `${dim.color}20`, color: dim.color }}>
                  {level}
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-yellow-500/10 text-yellow-400 ml-auto">
                  超越 {dimToPercentile(pct)}% 受測者
                </span>
              </div>
              <p className="text-gray-300">{dimData.analysis}</p>
              <div>
                <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5">提升建議</div>
                <ol className="space-y-1 list-none">
                  {dimData.tips.map((tip, idx) => (
                    <li key={idx} className="flex gap-2">
                      <span className="shrink-0 font-bold" style={{ color: dim.color }}>{idx + 1}.</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ol>
              </div>
              <div className="bg-white/5 rounded-lg px-3 py-2">
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">適合職位　</span>
                <span className="text-gray-300 text-xs">{dimData.roles}</span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// EQ+-specific paid report
function EqPaidReport({ result, dimensions }: { result: TestResult; dimensions: DimensionConfig[] }) {
  type DimAnalysis = { analysis: string; tips: string[]; roles: string }

  const dimContent: Record<string, { high: DimAnalysis; low: DimAnalysis }> = {
    opportunity: {
      high: {
        analysis: '你的機會識別能力屬於頂尖水準。你能在日常對話和市場觀察中自動啟動「問題拆解模式」，評估問題規模、現有替代方案的缺口和支付意願。這種習慣性的市場嗅覺讓你能看到別人忽略的機會窗口。',
        tips: [
          '建立「機會日誌」：記錄每個你發現的市場缺口，每月回顧哪些已被驗證或否定',
          '深入學習Gartner技術成熟度曲線，系統追蹤新興技術進入「實用期」的時機',
          '研究10個你欽佩的創業案例，分析他們的機會識別框架和切入點選擇邏輯',
        ],
        roles: '產品策略師、風險投資人（VC Analyst）、創業顧問、商業模式創新負責人、企業創新部門主管',
      },
      low: {
        analysis: '機會識別是你最需要強化的創業核心能力。真正的機會不會自己跑來找你——它藏在用戶的抱怨中、市場的空白處、以及技術趨勢與人類需求的交匯點。培養機會識別的能力，從養成「問題拆解」的習慣開始。',
        tips: [
          '本週開始「問題日誌」：每天記錄3個讓你說「為什麼沒有更好的解決方案？」的時刻',
          '閱讀《Zero to One》（Peter Thiel）和《Jobs to be Done》（Clayton Christensen），建立系統性的機會框架',
          '加入你目標市場的用戶社群（Reddit/Facebook群組），每天花15分鐘閱讀真實的用戶痛點',
        ],
        roles: '建立機會識別能力後，對任何希望在職場中創新、或準備創業的人都有直接價值',
      },
    },
    risk_tolerance: {
      high: {
        analysis: '你的風險承受能力是創業者中的稀缺優勢。你能理性評估風險、設定決策截止日期，並在不確定性中果斷行動。你知道如何區分「必要的不確定性風險」和「可以降低的風險」，這讓你能在正確的時機採取大膽行動。',
        tips: [
          '建立「風險矩陣」習慣：對每個重大決策評估影響力×可能性，確保風險承受有系統依據',
          '研究反稀釋條款、清算優先權等融資條款，確保在融資談判中能做出有依據的決策',
          '練習「預驗屍（Pre-mortem）」：在行動前想像最壞情境，識別可以提前預防的風險',
        ],
        roles: '創業投資人、危機管理顧問、創業者（各階段）、企業戰略主管、新事業開發負責人',
      },
      low: {
        analysis: '風險承受能力是你最需要突破的創業瓶頸。過度謹慎在創業中是一種隱性成本——每次等待「更好的時機」，機會窗口都在關閉。你需要學習如何在「夠好的資訊」下做出決策，而非等待不可能出現的完全確定性。',
        tips: [
          '練習「70%原則」：有70%的資訊就行動，後30%在行動中獲取',
          '閱讀《Thinking in Bets》（Annie Duke），學習如何在不確定性下做出高品質決策',
          '做一個「可承受損失」的小實驗：投入你輸得起的時間/金錢，從行動中學習決策',
        ],
        roles: '強化風險承受能力後，對任何面對組織不確定性的管理者、或準備走出舒適圈的工作者都有直接幫助',
      },
    },
    validation: {
      high: {
        analysis: '你的快速驗證能力是精實創業的核心武器。你知道如何用最小成本測試最重要的假設，如何設計有效的用戶訪談，以及如何解讀真實的市場訊號。這讓你能在燒掉大量資源前就識別出哪些方向值得全力押注。',
        tips: [
          '建立「驗證工具箱」：熟練掌握假門測試、Wizard of Oz MVP、Concierge MVP等不同場景的驗證方法',
          '研究《The Lean Startup》的「創新核算（Innovation Accounting）」框架，建立可量化的驗證指標',
          '在每個新假設啟動前，先寫下「若此假設為真/假，我期望看到的具體指標是什麼」',
        ],
        roles: 'Product Manager（PM）、成長駭客（Growth Hacker）、UX研究員、精實創業顧問、產品策略師',
      },
      low: {
        analysis: '快速驗證能力是避免「建造無人問津的產品」的最重要防線。很多失敗的新創不是因為執行力差，而是因為在錯誤的假設上執行得太好。學會在行動前先用最小成本驗證假設，能讓你的每一步都走得更有把握。',
        tips: [
          '本週為你最重要的商業假設設計一個假門測試：建立登陸頁，設定轉換率目標，收集真實用戶回饋',
          '閱讀《The Mom Test》（Rob Fitzpatrick），學習如何做出能獲取真實訊號的用戶訪談',
          '設定「驗證優先」規則：每個需要超過2週開發的功能，先用紙原型或模擬方式驗證需求',
        ],
        roles: '培養快速驗證能力後，對Product Manager、創業者、企業內創業（Intrapreneurship）負責人都有直接價值',
      },
    },
    resources: {
      high: {
        analysis: '你的資源整合能力讓你能在資源匱乏的情況下取得超乎比例的成果。你知道如何識別手邊的資產（人脈、技能、信息），如何建立對雙方都有價值的合作關係，以及如何讓有限資源產生最大的槓桿效果。',
        tips: [
          '建立你的「資源地圖」：列出你的前50個最有價值的人脈，以及每個人能提供什麼幫助',
          '學習股份激勵機制的設計：顧問股份（0.1-0.5%）、員工股份、戰略合作股份的正確比例和結構',
          '研究「策略合作框架」：學習如何識別雙方的非對稱優勢，設計雙贏的合作結構',
        ],
        roles: '商業發展（BD）主管、創投合夥人、企業聯盟策略主管、創業加速器導師、企業創新主管',
      },
      low: {
        analysis: '資源整合能力是在資源有限時取得不對稱優勢的關鍵。很多創業者把「沒有資源」當成不行動的理由，但頂尖創業者知道：先行動，資源自然會被吸引而來。從你現在擁有的開始，而非等待你認為需要的。',
        tips: [
          '列出你現在真正擁有的資源：你的技能、你的人脈、你的知識、你的信用——這些都是資產',
          '本週主動找一個你需要的資源的持有者，思考你能提供什麼對他們有價值的東西，設計一個互利的合作提案',
          '閱讀《Effectuation》或相關創業效果邏輯研究，學習如何從已有資源出發創造機會',
        ],
        roles: '提升資源整合能力後，對任何需要在資源限制下達成目標的專案負責人、創業者、BD主管都有直接幫助',
      },
    },
    resilience: {
      high: {
        analysis: '你的心理韌性是創業長跑的核心引擎。你能在挫折中提取學習而非陷入自我否定，能在壓力下維持決策品質，也知道如何建立可持續的工作節奏。這種韌性讓你在別人放棄的時候仍然能繼續前進。',
        tips: [
          '建立「韌性日誌」：每週記錄一個本週最困難的時刻和你的應對方式，追蹤自己的成長模式',
          '研究頂尖創業者的心理管理策略：閱讀《Shoe Dog》（Phil Knight）或《The Hard Thing About Hard Things》（Ben Horowitz）',
          '建立「倦怠早期預警系統」：定義3個讓你知道自己快燃燒殆盡的個人信號，並設立恢復協議',
        ],
        roles: '連續創業者、危機領導者、組織韌性顧問、心理健康創業領域、高壓職位領導人（CEO/COO）',
      },
      low: {
        analysis: '韌性是創業馬拉松最被低估的核心能力。技術可以外包，資金可以融資，但心理韌性只能靠自己建立。在創業路上，挫折不是例外而是常態——建立系統性的心理韌性，才能在不可避免的低潮中繼續前進。',
        tips: [
          '立刻建立「生理基礎」：這週確保每天7小時睡眠和3次運動，這是所有其他韌性建設的前提',
          '閱讀Carol Dweck的《Mindset》，建立成長型思維框架，開始把挫折解讀為學習訊號而非失敗定義',
          '找一個可以坦誠分享困難的創業同伴或導師，建立定期交流的支持系統',
        ],
        roles: '提升韌性後，對任何高壓職業（創業者、管理者、醫療工作者、教師）都有直接且深遠的價值',
      },
    },
    market: {
      high: {
        analysis: '你的市場直覺讓你能看到市場中別人忽略的訊號。你知道如何定義精準的ICP、如何設計健康的定價策略、如何識別真正的PMF信號。這種能力讓你在進入市場時能做出更精準的戰略選擇。',
        tips: [
          '建立「市場情報系統」：定期追蹤你目標市場的3個核心指標，以及2個你認為是領先指標的觀察點',
          '深入研究你產品的單位經濟學（LTV/CAC/Churn Rate），找到讓整體指標最優化的槓桿點',
          '研究「網絡效應」的不同類型（直接/間接/數據/社交），評估你的產品是否有建立護城河的機會',
        ],
        roles: '市場策略主管、成長駭客（Growth Hacker）、商業模式顧問、VC市場分析師、品牌策略師',
      },
      low: {
        analysis: '市場直覺是把創業想法轉化為可持續商業模式的關鍵橋樑。很多好的想法之所以失敗，不是因為產品不好，而是因為沒有找到正確的市場切入點、定價策略和增長機制。培養市場直覺，從深入了解你的潛在用戶開始。',
        tips: [
          '立刻計算你的目標產品的LTV和CAC：若LTV/CAC<3，需要重新思考商業模式或降低獲客成本',
          '為你的產品定義一個極其具體的ICP：不是「中小企業」，而是「台北、50-200人、SaaS公司、有遠距工作需求的HR主管」',
          '研究一個你欽佩的B2C或B2B成功案例的GTM策略：他們的第一批客戶從哪裡來？如何轉換？如何保留？',
        ],
        roles: '提升市場直覺後，對Product Manager、業務主管、創業者、以及任何需要讓產品/服務找到市場的人都有直接價值',
      },
    },
  }

  return (
    <div className="card-glass rounded-3xl p-8 space-y-6">
      <h3 className="font-bold text-xl mb-2">🚀 創業思維個人化分析</h3>

      {/* 偏態分析 */}
      {result.biasAnalysis && (
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-5 space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-lg">📊</span>
            <span className="font-semibold text-white">創業思維偏態分析</span>
            <span className="text-xs px-2 py-0.5 rounded-full ml-auto bg-amber-500/20 text-amber-300">
              {result.biasAnalysis.label}
            </span>
          </div>
          <p className="text-sm text-gray-300 leading-relaxed">{result.biasAnalysis.desc}</p>
          <div>
            <div className="flex items-center gap-1.5 mb-2">
              <span className="text-green-400">⚡</span>
              <span className="text-xs font-semibold text-green-400 uppercase tracking-wide">立即可行的行動</span>
            </div>
            <ol className="space-y-1.5">
              {result.biasAnalysis.immediate.map((item: string, idx: number) => (
                <li key={idx} className="flex gap-2 text-sm text-gray-300">
                  <span className="shrink-0 font-bold text-green-400">{idx + 1}.</span>
                  <span>{item}</span>
                </li>
              ))}
            </ol>
          </div>
          <div>
            <div className="flex items-center gap-1.5 mb-2">
              <span className="text-blue-400">🎯</span>
              <span className="text-xs font-semibold text-blue-400 uppercase tracking-wide">未來提升方向與目標</span>
            </div>
            <ol className="space-y-1.5">
              {result.biasAnalysis.future.map((item: string, idx: number) => (
                <li key={idx} className="flex gap-2 text-sm text-gray-300">
                  <span className="shrink-0 font-bold text-blue-400">{idx + 1}.</span>
                  <span>{item}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      )}

      {/* 各維度分析 */}
      <div className="space-y-4 text-sm text-gray-300 leading-relaxed">
        {dimensions.map(dim => {
          const pct = result.dimensionScores[dim.id]?.percent ?? 0
          const isHigh = pct >= 70
          const level = pct >= 80 ? '優秀' : pct >= 60 ? '良好' : '需要加強'
          const content = dimContent[dim.id]
          const dimData: DimAnalysis = content
            ? (isHigh ? content.high : content.low)
            : {
                analysis: `你在${dim.label}方面的表現${isHigh ? '良好' : '有提升空間'}。持續練習與學習，你將能進一步提升這個維度的能力。`,
                tips: ['持續實踐相關技能', '尋找相關學習資源', '在實際情境中應用'],
                roles: '根據你的行業，此能力有廣泛的應用場景',
              }

          return (
            <div key={dim.id} className="bg-white/5 rounded-xl p-4 space-y-3">
              <div className="flex items-center gap-2 flex-wrap">
                <span>{dim.icon}</span>
                <span className="font-semibold text-white">{dim.label}</span>
                <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: `${dim.color}20`, color: dim.color }}>
                  {level}
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-yellow-500/10 text-yellow-400 ml-auto">
                  超越 {dimToPercentile(pct)}% 受測者
                </span>
              </div>
              <p className="text-gray-300">{dimData.analysis}</p>
              <div>
                <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5">提升建議</div>
                <ol className="space-y-1 list-none">
                  {dimData.tips.map((tip, idx) => (
                    <li key={idx} className="flex gap-2">
                      <span className="shrink-0 font-bold" style={{ color: dim.color }}>{idx + 1}.</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ol>
              </div>
              <div className="bg-white/5 rounded-lg px-3 py-2">
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">適合職位　</span>
                <span className="text-gray-300 text-xs">{dimData.roles}</span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// FQ-specific paid report
function FqPaidReport({ result, dimensions }: { result: TestResult; dimensions: DimensionConfig[] }) {
  type DimAnalysis = { analysis: string; tips: string[]; roles: string }

  const dimContent: Record<string, { high: DimAnalysis; low: DimAnalysis }> = {
    finance_basics: {
      high: {
        analysis: '你的理財基礎非常紮實，掌握了複利、緊急預備金、保險規劃等核心概念，這是所有進階財富管理的基石。相較於多數人在這個維度的模糊認知，你已建立了清晰的財務思維框架。',
        tips: [
          '建立個人資產負債表，每季更新一次，追蹤淨值成長',
          '計算你的「儲蓄率」（每月儲蓄÷月收入），目標維持在20%以上',
          '檢視你的保障型保險是否完整：壽險×10倍年薪+實支實付醫療險+失能險',
        ],
        roles: '個人理財顧問、財務教育工作者、任何需要指導他人建立財務基礎的角色',
      },
      low: {
        analysis: '理財基礎是你最需要補強的維度。許多人在沒有穩固基礎的情況下就急於投資，結果往往事倍功半。從複利原理到緊急預備金，這些概念看似簡單，卻是財富積累最重要的地基。',
        tips: [
          '本週讀完《富爸爸窮爸爸》前半部，建立資產與負債的清晰概念',
          '立即計算你現有的緊急預備金是否足夠3個月必要支出，不足請優先補足',
          '了解你的保險覆蓋範圍，確保有基本的壽險和醫療保障',
        ],
        roles: '提升理財基礎後，在任何職位上都能更有效管理個人財務，對負責家庭財務規劃的人尤為重要',
      },
    },
    investment: {
      high: {
        analysis: '你的投資邏輯在所有受測者中屬於頂尖水準。你理解指數基金的成本優勢、複利的威力，以及「在市場中的時間」遠比「判斷進出時機」重要。這些認知能讓你在大多數散戶犯錯時保持清醒。',
        tips: [
          '建立個人股票/基金的「投資備忘錄」，記錄買入理由和預期持有期限',
          '定期閱讀巴菲特的年度股東信，深化長期投資思維',
          '研究「因子投資」（Value/Quality/Momentum因子），探索指數投資的下一步',
        ],
        roles: '投資分析師、基金研究員、財富管理顧問、任何需要協助他人投資決策的專業人士',
      },
      low: {
        analysis: '投資邏輯是你最需要強化的核心能力。許多散戶虧損的根本原因不是選錯股票，而是對投資的基本原理不夠了解——包括費用的複利侵蝕、情緒決策的代價，以及長期持有的重要性。',
        tips: [
          '今天就查閱「台灣50 ETF（0050）」的歷史報酬率，感受長期持有指數的力量',
          '閱讀《投資最重要的事》（霍華·馬克斯）或《漫步華爾街》，建立系統性投資觀',
          '設定一個小額定期定額投資（每月1,000元）開始實際操作，從做中學',
        ],
        roles: '建立投資邏輯後，對理財規劃師、投資顧問、或任何希望讓資產持續增長的人都有直接價值',
      },
    },
    risk: {
      high: {
        analysis: '你的風險意識是保護財富的重要護盾。你能識別高報酬背後的真實風險，了解流動性的重要性，也知道如何避開常見的投資詐騙。這種清醒認識在市場狂熱時尤其珍貴。',
        tips: [
          '定期評估你投資組合的「最大可承受虧損」，確保不超過你的心理和財務底線',
          '了解你所持有每類資產的流動性：從可即時變現到需要數月的光譜',
          '設定「詐騙警報清單」：任何同時承諾高報酬、零風險、隨時提領的方案一律迴避',
        ],
        roles: '風險管理師、法遵專員、保險精算師、任何需要協助組織或個人識別和管理財務風險的角色',
      },
      low: {
        analysis: '風險意識是財富積累中最重要的防守能力。一次重大的投資失誤（詐騙、過度集中、槓桿失控）可能讓多年的積累毀於一旦。強化這個維度不是讓你更保守，而是讓你在追求高報酬的同時有更好的防護。',
        tips: [
          '了解「龐氏騙局」的完整識別清單：任何承諾穩定高報酬且本金保障的投資，都需要極度謹慎',
          '計算你的投資組合中流動性最差的資產占比，確保緊急資金需求有足夠的現金儲備',
          '研究台灣金管會的「投資人保護」資源，了解合法金融機構的辨識方法',
        ],
        roles: '提升風險意識後，對財務安全至關重要的職業（醫療、法律、教育）以及需要做重要財務決策的所有人都有直接幫助',
      },
    },
    tax: {
      high: {
        analysis: '你對稅務規劃的掌握讓你能保留更多辛苦賺來的投資報酬。在台灣，合理運用稅務工具（勞退自提、扣除額規劃、資本利得稅法規）能顯著提升你的實質報酬率，而你已走在正確的路上。',
        tips: [
          '計算你今年的所有可用扣除額：保險費、醫療費、房貸利息、捐贈等，確保沒有遺漏',
          '評估是否增加勞退自提比例：每多提1%，每年節稅金額 = 月薪 × 1% × 12 × 適用稅率',
          '開始規劃財富傳承：了解244萬年度贈與免稅額，思考如何透過多年規劃降低未來遺產稅',
        ],
        roles: '稅務顧問、會計師、財務規劃師、企業財務主管（CFO）、任何需要協助客戶進行稅務優化的專業人士',
      },
      low: {
        analysis: '稅務規劃是最常被忽略但回報最高的財務技能之一。不了解台灣稅法，可能讓你在不知不覺中多繳了許多不必要的稅，或錯過了政府提供的合法節稅工具。',
        tips: [
          '立即查看你是否已申請「勞退自提」：登入勞保局網站，6分鐘內可完成設定，每年節稅效果顯著',
          '下次報稅前，比較「標準扣除額」vs「列舉扣除額」哪個對你更有利，選較高的那個',
          '閱讀財政部「個人綜合所得稅試算」工具，理解你的實際稅率和各類收入的課稅方式',
        ],
        roles: '了解稅務規劃後，對每一位納稅人都有直接價值，尤其是收入較高、有投資收益或計畫傳承財富的人',
      },
    },
    psychology: {
      high: {
        analysis: '你對行為財務學偏誤的深入理解是你投資生涯的重要保護層。你能識別沉沒成本謬誤、確認偏誤、羊群效應等常見陷阱，這讓你在市場情緒最瘋狂的時刻，能保持理性決策。',
        tips: [
          '建立「投資決策日誌」：每次買賣都記錄決策理由，定期回顧自己是否有偏誤行為',
          '設定預先停損點：在買入時就決定「若跌X%，我將重新評估」，避免情緒性持有',
          '每次做重大投資決策前，主動尋找反方觀點——強制自己看看最看空這個投資的分析',
        ],
        roles: '行為財務顧問、投資組合經理、心理諮商師（財務方向）、任何需要協助他人克服情緒性投資決策的專業人士',
      },
      low: {
        analysis: '心理偏誤是散戶系統性虧損最重要的原因之一。不是因為缺乏知識，而是因為大腦在面對金錢時會產生情緒反應，影響理性判斷。了解並克服這些偏誤，能讓你的投資決策品質大幅提升。',
        tips: [
          '這週練習：當你想買入某支股票前，先花20分鐘搜尋「它的缺點/風險/看空理由」',
          '設定一個「24小時冷靜期」：任何>1萬元的投資決策，強制等24小時後再執行',
          '閱讀《快思慢想》（丹尼爾·康納曼），系統了解人類決策中的認知偏誤',
        ],
        roles: '克服心理偏誤後，對所有投資者都有直接價值；對財務顧問、教練和需要幫助他人做理性決策的專業人士尤其重要',
      },
    },
    allocation: {
      high: {
        analysis: '你對資產配置的理解讓你能構建更穩健的財富組合。你了解股債配置的對沖邏輯、再平衡的機制、生命週期投資法，以及不同資產類別在組合中的角色——這正是Brinson研究所顯示的，決定長期績效90%的核心因素。',
        tips: [
          '建立書面的「投資政策聲明（IPS）」：明確記錄目標配置比例、再平衡規則和投資原則',
          '研究加入REITs（台灣可買美國REIT ETF如VNQ）和黃金ETF（如GLD），進一步多元化',
          '每年1月執行再平衡：賣出超比例的資產，買入低比例的資產，保持風險水準一致',
        ],
        roles: '資產管理顧問、退休金規劃師、家族辦公室投資主管、任何需要協助設計長期財富管理策略的專業人士',
      },
      low: {
        analysis: '資產配置是決定你投資組合長期績效的最重要因素，但卻是最容易被忽略的。許多人花大量時間選股，卻從未認真思考「股票、債券、現金應該各佔多少比例」這個更根本的問題。',
        tips: [
          '今天就做決定：你的股債比例是多少？（參考法則：股票比例 ≈ 110 減你的年齡）',
          '開始了解台灣可買到的債券ETF：如00679B（美國30年期公債ETF），作為股票的平衡器',
          '設定每年再平衡提醒：每年1月花1小時檢視並調整投資組合比例回到目標',
        ],
        roles: '建立資產配置概念後，對所有長期投資者都有直接價值；尤其對距退休還有10年以上的人，現在開始配置的效果最大',
      },
    },
  }

  return (
    <div className="card-glass rounded-3xl p-8 space-y-6">
      <h3 className="font-bold text-xl mb-2">💰 財商個人化分析</h3>

      {/* 偏態分析 */}
      {result.biasAnalysis && (
        <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-5 space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-lg">📊</span>
            <span className="font-semibold text-white">財商偏態分析</span>
            <span className="text-xs px-2 py-0.5 rounded-full ml-auto bg-emerald-500/20 text-emerald-300">
              {result.biasAnalysis.label}
            </span>
          </div>
          <p className="text-sm text-gray-300 leading-relaxed">{result.biasAnalysis.desc}</p>
          <div>
            <div className="flex items-center gap-1.5 mb-2">
              <span className="text-green-400">⚡</span>
              <span className="text-xs font-semibold text-green-400 uppercase tracking-wide">立即可行的行動</span>
            </div>
            <ol className="space-y-1.5">
              {result.biasAnalysis.immediate.map((item: string, idx: number) => (
                <li key={idx} className="flex gap-2 text-sm text-gray-300">
                  <span className="shrink-0 font-bold text-green-400">{idx + 1}.</span>
                  <span>{item}</span>
                </li>
              ))}
            </ol>
          </div>
          <div>
            <div className="flex items-center gap-1.5 mb-2">
              <span className="text-blue-400">🎯</span>
              <span className="text-xs font-semibold text-blue-400 uppercase tracking-wide">未來提升方向與目標</span>
            </div>
            <ol className="space-y-1.5">
              {result.biasAnalysis.future.map((item: string, idx: number) => (
                <li key={idx} className="flex gap-2 text-sm text-gray-300">
                  <span className="shrink-0 font-bold text-blue-400">{idx + 1}.</span>
                  <span>{item}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      )}

      {/* 各維度分析 */}
      <div className="space-y-4 text-sm text-gray-300 leading-relaxed">
        {dimensions.map(dim => {
          const pct = result.dimensionScores[dim.id]?.percent ?? 0
          const isHigh = pct >= 70
          const level = pct >= 80 ? '優秀' : pct >= 60 ? '良好' : '需要加強'
          const content = dimContent[dim.id]
          const dimData: DimAnalysis = content
            ? (isHigh ? content.high : content.low)
            : {
                analysis: `你在${dim.label}方面的表現${isHigh ? '良好' : '有提升空間'}。持續練習與學習，你將能進一步提升這個維度的能力。`,
                tips: ['持續實踐相關技能', '尋找相關學習資源', '在實際情境中應用'],
                roles: '根據你的行業，此能力有廣泛的應用場景',
              }

          return (
            <div key={dim.id} className="bg-white/5 rounded-xl p-4 space-y-3">
              <div className="flex items-center gap-2 flex-wrap">
                <span>{dim.icon}</span>
                <span className="font-semibold text-white">{dim.label}</span>
                <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: `${dim.color}20`, color: dim.color }}>
                  {level}
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-yellow-500/10 text-yellow-400 ml-auto">
                  超越 {dimToPercentile(pct)}% 受測者
                </span>
              </div>
              <p className="text-gray-300">{dimData.analysis}</p>
              <div>
                <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5">提升建議</div>
                <ol className="space-y-1 list-none">
                  {dimData.tips.map((tip, idx) => (
                    <li key={idx} className="flex gap-2">
                      <span className="shrink-0 font-bold" style={{ color: dim.color }}>{idx + 1}.</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ol>
              </div>
              <div className="bg-white/5 rounded-lg px-3 py-2">
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">適合職位　</span>
                <span className="text-gray-300 text-xs">{dimData.roles}</span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// SMQ-specific paid report
function SmqPaidReport({ result, dimensions }: { result: TestResult; dimensions: DimensionConfig[] }) {
  type DimAnalysis = { analysis: string; tips: string[]; roles: string }

  const dimContent: Record<string, { high: DimAnalysis; low: DimAnalysis }> = {
    content_strategy: {
      high: {
        analysis: '你是內容策略的高手，能夠打造系統化的內容引擎。繼續精進可下載資源、郵件序列等高轉換內容形式，並學習AI輔助內容生產，把你的產量擴大10倍。',
        tips: [
          '建立「內容資產組合」：每季製作1份高品質可下載資源（白皮書/模板），作為Email獲取的誘因',
          '嘗試「內容拆解工作流」：一篇長文 → 5則短文 → 10則社群貼文 → 1支短影音，最大化每個創作的ROI',
          '導入AI輔助內容生產流程（如Claude + Notion），把高品質產出速度提升3-5倍',
        ],
        roles: '適合角色：內容行銷專員、品牌部落客、社群編輯',
      },
      low: {
        analysis: '內容策略是你需要優先強化的基礎。建議從建立「內容主題柱」開始，確定3個核心主題，每個主題製作5篇深度文章，建立你的第一個內容資產組合。',
        tips: [
          '本週完成一件事：為你的品牌定義3個「內容主題柱」，每個柱子涵蓋你最了解且受眾最需要的話題',
          '閱讀《Content Inc.》（Joe Pulizzi）或《他們，不是從零開始》，建立內容行銷的系統性思維',
          '選定1個平台，連續30天每天發布1則有價值的內容，從執行中建立節奏感和直覺',
        ],
        roles: '適合角色：內容行銷專員、品牌部落客、社群編輯',
      },
    },
    data_analysis: {
      high: {
        analysis: '你的數據分析能力讓你能做出有依據的行銷決策。進階目標：掌握多渠道歸因分析，學習用數據建立預測性行銷模型。',
        tips: [
          '建立「行銷儀表板」：在GA4或Looker Studio整合所有渠道數據，設定週報自動寄送，養成每週數據復盤習慣',
          '深入學習「多點觸控歸因」模型——了解線性、時間衰減、數據驅動歸因的差異，優化預算分配決策',
          '嘗試用Python或試算表建立「行銷預測模型」：根據歷史數據預測不同預算下的轉換量',
        ],
        roles: '適合角色：績效行銷專員、電商經理、行銷分析師',
      },
      low: {
        analysis: '數據分析是你最需要補強的技能。從最基礎開始：設定GA4追蹤、每週記錄3個關鍵指標，養成用數字驗證每個行銷決策的習慣。',
        tips: [
          '今天就做：登入你的平台後台，找到「分析」頁面，記錄這3個數字——觸及人數、互動率、連結點擊數',
          '安裝GA4並設定基本目標追蹤：至少追蹤「表單提交」或「加入購物車」等轉換事件',
          '訂閱《Marketing Examples》電子報，每期都有真實案例的數據解讀，從故事中學習數據思維',
        ],
        roles: '適合角色：績效行銷專員、電商經理、行銷分析師',
      },
    },
    platform_algo: {
      high: {
        analysis: '你深諳各平台算法邏輯，能系統性地擴大有機觸及。建議研究跨平台算法趨勢，成為你所在行業的算法研究專家。',
        tips: [
          '建立「算法更新追蹤系統」：追蹤各平台官方新聞中心和頂尖社群行銷KOL，第一時間掌握規則變化',
          '針對你最重要的1個平台，設計「算法實驗」：每月測試1個算法假設（例如：留言數量是否影響分發），記錄結果',
          '撰寫你的算法研究心得並公開分享——這本身就是建立Thought Leadership的最佳行動',
        ],
        roles: '適合角色：社群媒體管理員、成長駭客、內容創作者',
      },
      low: {
        analysis: '算法理解薄弱會讓你的內容事倍功半。立即行動：選定1個主要平台，深入研究其2025年最新算法變化，把算法知識直接應用到你的下一篇內容。',
        tips: [
          '選定你的主力平台（Instagram/LinkedIn/TikTok），花30分鐘閱讀該平台在2025年的算法更新說明',
          '針對你的下一篇貼文，刻意應用1個算法技巧（如Instagram：前3秒Hook + 引導留言的問句結尾）',
          '追蹤台灣社群行銷專家的帳號（找出在你目標平台有持續高互動的創作者），觀察他們的內容模式',
        ],
        roles: '適合角色：社群媒體管理員、成長駭客、內容創作者',
      },
    },
    audience_insight: {
      high: {
        analysis: '你對受眾有深刻理解，這是所有行銷策略的基礎。進一步建立詳細的Persona文件，並與銷售團隊共享受眾洞察，讓行銷和銷售真正協同。',
        tips: [
          '製作正式的「Persona文件」：包含人口統計、心理統計、常用平台、購買疑慮、決策觸發點，與整個團隊共享',
          '建立「客戶之聲（VoC）系統」：定期收集客戶評論、客服紀錄、銷售通話筆記，提取真實語言用於內容和廣告文案',
          '每季進行3-5次深度客戶訪談，持續更新你的受眾理解，確保不依賴過時的假設',
        ],
        roles: '適合角色：行銷策略師、CRM專員、市場研究員',
      },
      low: {
        analysis: '受眾理解不足會讓所有行銷努力方向偏差。今天就做：訪談3-5位現有客戶，記錄他們購買前的真實疑慮和決策過程——這比任何工具都有效。',
        tips: [
          '本週聯繫3位現有客戶或潛在用戶，問他們1個問題：「在選擇我們之前，你最大的疑慮是什麼？」',
          '進入你目標受眾聚集的線上社群（Facebook社團/Reddit/PTT），花20分鐘閱讀真實的討論，記錄他們使用的語言和表達的問題',
          '閱讀《The Mom Test》（Rob Fitzpatrick），學習如何問出真實答案而非社交性回應的用戶訪談技巧',
        ],
        roles: '適合角色：行銷策略師、CRM專員、市場研究員',
      },
    },
    brand_voice: {
      high: {
        analysis: '你建立了強大的品牌識別度。下一步：制定正式的品牌危機應對SOP，並開始建立Thought Leadership內容系列，讓品牌成為行業的聲音。',
        tips: [
          '制定正式的「品牌危機應對SOP」：定義危機等級、回應時間標準、發言人授權、以及各平台的應對腳本',
          '啟動「Thought Leadership內容計劃」：每月發布1篇深度行業觀察，建立品牌的專家形象和話語權',
          '建立「品牌聲音指南（Brand Voice Guide）」文件，詳細定義語氣、用詞偏好、禁忌，讓整個團隊的溝通保持高度一致',
        ],
        roles: '適合角色：品牌經理、公關專員、內容總監',
      },
      low: {
        analysis: '品牌聲量薄弱讓你的行銷缺乏辨識度。立即制定一份品牌聲音指南（一頁就夠），定義你的品牌個性、語氣和禁忌用語，讓所有內容保持一致。',
        tips: [
          '今天完成一頁「品牌聲音卡」：列出品牌個性3個形容詞、語氣（正式/輕鬆/專業/親切）、3個你喜歡的品牌參考範例',
          '回顧你過去30則社群貼文，評估語氣是否一致——找出最能代表你品牌形象的3則，作為未來的標準範本',
          '研究1個你欣賞的品牌的全渠道溝通，分析其在Instagram/LinkedIn/客服/官網上如何保持語氣一致但又適應各平台',
        ],
        roles: '適合角色：品牌經理、公關專員、內容總監',
      },
    },
    ad_placement: {
      high: {
        analysis: '你的廣告投放能力是你的最大商業武器。進階挑戰：掌握程序化廣告（DSP）和進階受眾建模，把你的廣告效益再提升一個層次。',
        tips: [
          '建立系統化的「創意測試框架」：每個廣告組同時跑3-5個素材變體，設定清晰的停損指標（CPM/CTR/CPA閾值），讓數據決定存活',
          '深入研究Meta Advantage+廣告活動和Google Performance Max，理解機器學習廣告的正確設定和優化方式',
          '學習「廣告歸因建模」：了解如何在iOS隱私政策後的環境中，結合Conversion API + MMM（媒體組合建模）衡量真實廣告效果',
        ],
        roles: '適合角色：廣告投放專員、代理商AM、電商行銷人',
      },
      low: {
        analysis: '廣告投放是把行銷知識直接轉化為商業結果的關鍵技能。建議從NT$5,000的小預算開始系統測試，重點學習：廣告架構設定、像素安裝、以及如何閱讀廣告後台的核心指標。',
        tips: [
          '申請Meta Business Manager帳號，完成基本設定：像素安裝 + 1個轉換事件追蹤（如：填寫表單）',
          '用NT$5,000做你的第一個廣告實驗：選定1個目標（流量或轉換）、1個受眾、2個不同素材，跑7天後比較結果',
          '完成Meta Blueprint免費課程的「廣告投放基礎」模組——有中文版，約3小時，是系統學習Meta廣告的最佳起點',
        ],
        roles: '適合角色：廣告投放專員、代理商AM、電商行銷人',
      },
    },
  }

  return (
    <div className="card-glass rounded-3xl p-8 space-y-6">
      <h3 className="font-bold text-xl mb-2">📱 社群行銷個人化分析</h3>

      {/* 偏態分析 */}
      {result.biasAnalysis && (
        <div className="bg-pink-500/10 border border-pink-500/30 rounded-2xl p-5 space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-lg">📊</span>
            <span className="font-semibold text-white">行銷能力偏態分析</span>
            <span className="text-xs px-2 py-0.5 rounded-full ml-auto bg-pink-500/20 text-pink-300">
              {result.biasAnalysis.label}
            </span>
          </div>
          <p className="text-sm text-gray-300 leading-relaxed">{result.biasAnalysis.desc}</p>
          <div>
            <div className="flex items-center gap-1.5 mb-2">
              <span className="text-green-400">⚡</span>
              <span className="text-xs font-semibold text-green-400 uppercase tracking-wide">立即可行的行動</span>
            </div>
            <ol className="space-y-1.5">
              {result.biasAnalysis.immediate.map((item: string, idx: number) => (
                <li key={idx} className="flex gap-2 text-sm text-gray-300">
                  <span className="shrink-0 font-bold text-green-400">{idx + 1}.</span>
                  <span>{item}</span>
                </li>
              ))}
            </ol>
          </div>
          <div>
            <div className="flex items-center gap-1.5 mb-2">
              <span className="text-purple-400">🎯</span>
              <span className="text-xs font-semibold text-purple-400 uppercase tracking-wide">未來提升方向與目標</span>
            </div>
            <ol className="space-y-1.5">
              {result.biasAnalysis.future.map((item: string, idx: number) => (
                <li key={idx} className="flex gap-2 text-sm text-gray-300">
                  <span className="shrink-0 font-bold text-purple-400">{idx + 1}.</span>
                  <span>{item}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      )}

      {/* 各維度分析 */}
      <div className="space-y-4 text-sm text-gray-300 leading-relaxed">
        {dimensions.map(dim => {
          const pct = result.dimensionScores[dim.id]?.percent ?? 0
          const isHigh = pct >= 70
          const level = pct >= 80 ? '優秀' : pct >= 60 ? '良好' : '需要加強'
          const content = dimContent[dim.id]
          const dimData: DimAnalysis = content
            ? (isHigh ? content.high : content.low)
            : {
                analysis: `你在${dim.label}方面的表現${isHigh ? '良好' : '有提升空間'}。持續練習與學習，你將能進一步提升這個維度的能力。`,
                tips: ['持續實踐相關技能', '尋找相關學習資源', '在實際情境中應用'],
                roles: '根據你的行業，此能力有廣泛的應用場景',
              }

          return (
            <div key={dim.id} className="bg-white/5 rounded-xl p-4 space-y-3">
              <div className="flex items-center gap-2 flex-wrap">
                <span>{dim.icon}</span>
                <span className="font-semibold text-white">{dim.label}</span>
                <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: `${dim.color}20`, color: dim.color }}>
                  {level}
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-yellow-500/10 text-yellow-400 ml-auto">
                  超越 {dimToPercentile(pct)}% 受測者
                </span>
              </div>
              <p className="text-gray-300">{dimData.analysis}</p>
              <div>
                <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5">提升建議</div>
                <ol className="space-y-1 list-none">
                  {dimData.tips.map((tip, idx) => (
                    <li key={idx} className="flex gap-2">
                      <span className="shrink-0 font-bold" style={{ color: dim.color }}>{idx + 1}.</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ol>
              </div>
              <div className="bg-white/5 rounded-lg px-3 py-2">
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">適合角色　</span>
                <span className="text-gray-300 text-xs">{dimData.roles}</span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default function ResultPage() {
  const { testId } = useParams<{ testId: string }>()
  const navigate = useNavigate()
  const [result, setResult] = useState<TestResult | null>(null)
  const [unlocked, setUnlocked] = useState(false)
  const [counting, setCounting] = useState(0)

  const testConfig = testId ? getTest(testId) : undefined

  useEffect(() => {
    if (!testId || !testConfig) {
      navigate('/')
      return
    }
    const raw = sessionStorage.getItem(`result_${testId}`)
    if (!raw) {
      navigate('/')
      return
    }
    const r: TestResult = JSON.parse(raw)
    setResult(r)

    const target = r.score
    let start = 0
    const step = Math.ceil((target - start) / 40)
    const timer = setInterval(() => {
      start = Math.min(start + step, target)
      setCounting(start)
      if (start >= target) clearInterval(timer)
    }, 30)
    return () => clearInterval(timer)
  }, [navigate, testId, testConfig])

  if (!result || !testConfig) return null

  const dimScores = result.dimensionScores
  const scoreMap = Object.fromEntries(
    testConfig.dimensions.map(d => [d.id, dimScores[d.id]?.percent ?? 0])
  )

  const minutes = Math.floor(result.timeTaken / 60)
  const seconds = result.timeTaken % 60

  return (
    <div className="min-h-screen bg-[#05081a] text-white">
      {/* NAV */}
      <nav className="flex items-center justify-between px-6 md:px-16 py-4 border-b border-white/5">
        <span className="font-black gradient-text text-xl">IQ Suite</span>
        <button onClick={() => navigate('/')} className="text-sm text-gray-400 hover:text-white transition-colors">
          ← 返回首頁
        </button>
      </nav>

      <div className="max-w-3xl mx-auto px-4 py-10 space-y-8">

        {/* SCORE HERO */}
        <div className="card-glass rounded-3xl p-8 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20 pointer-events-none" />
          <div className="relative">
            <div className="text-gray-400 text-sm mb-2">你的 {testConfig.scoreLabel} 指數</div>
            <div className="text-8xl font-black gradient-text mb-2">{counting}</div>
            <div className="text-gray-400 text-sm mb-4">
              超越全球 <span className="text-yellow-400 font-bold text-lg">{result.percentile}%</span> 的受測者
            </div>
            <NormalDistBar score={result.score} scoreMax={testConfig.scoreMax} />
            <div className="mt-4 flex items-center justify-center gap-2">
              <span className="text-3xl">{result.personalityType.icon}</span>
              <div className="text-left">
                <div className="font-bold text-lg">{result.personalityType.label}</div>
                <div className="text-gray-400 text-sm">{result.personalityType.desc}</div>
              </div>
            </div>
            <div className="text-xs text-gray-600 mt-4">
              完成時間 {minutes}:{seconds.toString().padStart(2, '0')} ·
              答對 {result.answers.filter((a: { correct: boolean }) => a.correct).length} / {result.answers.length} 題
            </div>
          </div>
        </div>

        {/* SHARE */}
        <ShareButtons result={result} testName={testConfig.name} scoreLabel={testConfig.scoreLabel} />

        {/* RADAR + DIM SCORES */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="card-glass rounded-2xl p-6">
            <h3 className="font-bold mb-4 text-center">{testConfig.dimensions.length} 大維度雷達圖</h3>
            <RadarChart
              scores={unlocked ? scoreMap : Object.fromEntries(testConfig.dimensions.map(d => [d.id, 0]))}
              dimensions={testConfig.dimensions}
            />
            {!unlocked && (
              <div className="text-center text-xs text-gray-500 mt-2">解鎖後顯示</div>
            )}
          </div>
          <div className="card-glass rounded-2xl p-6 space-y-4">
            <h3 className="font-bold mb-2">各維度分數</h3>
            {testConfig.dimensions.map(dim => {
              const score = dimScores[dim.id]
              const pct = score?.percent ?? 0
              const dimPerc = dimToPercentile(pct)
              return (
                <div key={dim.id}>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="flex items-center gap-1.5">
                      <span>{dim.icon}</span>
                      <span className="text-gray-300">{dim.label}</span>
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-500">超越 <span className="text-yellow-400 font-semibold">{dimPerc}%</span></span>
                      <span className="font-bold" style={{ color: dim.color }}>
                        {unlocked ? `${pct}%` : '🔒'}
                      </span>
                    </div>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-1000"
                      style={{
                        width: unlocked ? `${pct}%` : '0%',
                        background: dim.color,
                      }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* UNLOCK CTA or PAID REPORT */}
        {!unlocked ? (
          <div className="rounded-3xl p-8 text-center" style={{ background: 'linear-gradient(135deg, rgba(59,130,246,0.12), rgba(139,92,246,0.12))', border: '1px solid rgba(139,92,246,0.4)' }}>
            <div className="text-2xl mb-2">🔓 解鎖完整報告</div>
            <p className="text-gray-400 text-sm mb-6 max-w-sm mx-auto">
              AI 個人化深度分析、各維度改善建議、<br />可分享的精美成果卡片
            </p>
            <div className="text-4xl font-black mb-1">${testConfig.price} <span className="text-lg text-gray-400 font-normal">USD</span></div>
            <div className="text-gray-500 text-xs mb-6">一次性解鎖 · 永久保存</div>
            {/* TODO: Replace with Stripe checkout */}
            <button
              onClick={() => setUnlocked(true)}
              className="btn-primary px-10 py-3 rounded-xl font-bold text-white"
            >
              立即解鎖 →
            </button>
          </div>
        ) : (
          testId === 'aiiq' ? (
            <AiiqPaidReport result={result} dimensions={testConfig.dimensions} />
          ) : testId === 'fq' ? (
            <FqPaidReport result={result} dimensions={testConfig.dimensions} />
          ) : testId === 'eq' ? (
            <EqPaidReport result={result} dimensions={testConfig.dimensions} />
          ) : testId === 'smq' ? (
            <SmqPaidReport result={result} dimensions={testConfig.dimensions} />
          ) : (
            <div className="card-glass rounded-3xl p-8 text-center space-y-4">
              <div className="text-4xl">🚧</div>
              <h3 className="font-bold text-xl">完整分析即將推出</h3>
              <p className="text-gray-400 text-sm">
                我們正在為 {testConfig.name} 製作 AI 個人化深度分析報告，<br />
                敬請期待！已解鎖的使用者將自動獲得完整版。
              </p>
            </div>
          )
        )}

        {/* RETAKE */}
        <div className="text-center pb-8">
          <button
            onClick={() => {
              sessionStorage.removeItem(`result_${testId}`)
              navigate(`/${testId}/quiz`)
            }}
            className="text-gray-400 hover:text-white text-sm transition-colors underline"
          >
            重新測驗（題目將隨機更換）
          </button>
        </div>
      </div>
    </div>
  )
}
