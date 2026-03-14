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
