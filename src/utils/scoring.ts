import type { Dimension, Question } from '../data/questions'
import { PERSONALITY_TYPES, DIMENSION_WEIGHTS } from '../data/questions'

export interface Answer {
  questionId: string
  selected: number
  correct: boolean
  points: number
}

export interface DimensionScore {
  dimension: Dimension
  raw: number       // earned points
  max: number       // max possible points
  percent: number   // 0-100
}

export interface BiasAnalysis {
  label: string
  desc: string
  immediate: string[]   // 立即可執行的行動
  future: string[]      // 未來提升方向與目標
}

export interface TestResult {
  answers: Answer[]
  dimensionScores: Record<Dimension, DimensionScore>
  aiiqScore: number   // 0–130 weighted scale
  percentile: number  // 0–100
  personalityType: (typeof PERSONALITY_TYPES)[number]
  biasAnalysis: BiasAnalysis
  timeTaken: number   // seconds
}

const DIMENSIONS: Dimension[] = ['ai_cognition', 'prompt', 'critical', 'knowledge_mgmt', 'ethics']

/**
 * 加權計算公式：
 * 1. 各維度原始分 = Σ（答對題目的分值）
 * 2. 維度標準化分 = （維度原始分 ÷ 維度滿分）× 100
 * 3. 加權總分 = Σ（各維度標準化分 × 維度權重）
 * 4. AI-IQ = 加權總分 × 1.3（四捨五入，最高130）
 */
function calcAIIQ(dimScores: Record<string, DimensionScore>): number {
  let weightedTotal = 0
  for (const dim of DIMENSIONS) {
    const score = dimScores[dim]
    const weight = DIMENSION_WEIGHTS[dim as Dimension]
    weightedTotal += score.percent * weight
  }
  const aiiq = Math.round(weightedTotal * 1.3)
  return Math.min(130, Math.max(0, aiiq))
}

/**
 * 根據 AI-IQ 分數（0-130）估算百分位
 * 假設平均值 75，SD 20
 */
export function aiiqToPercentile(score: number): number {
  const mean = 75
  const sd = 20
  const z = (score - mean) / sd
  const p = 0.5 * (1 + erf(z / Math.sqrt(2)))
  return Math.round(Math.min(99, Math.max(1, p * 100)))
}

function erf(x: number): number {
  const a1 =  0.254829592
  const a2 = -0.284496736
  const a3 =  1.421413741
  const a4 = -1.453152027
  const a5 =  1.061405429
  const p  =  0.3275911
  const sign = x < 0 ? -1 : 1
  const t = 1 / (1 + p * Math.abs(x))
  const y = 1 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x)
  return sign * y
}

/**
 * 根據 AI-IQ 分數區間取得人格類型
 */
export function getPersonalityType(score: number): (typeof PERSONALITY_TYPES)[number] {
  const found = PERSONALITY_TYPES.find(t => score >= t.minScore && score <= t.maxScore)
  return found ?? PERSONALITY_TYPES[PERSONALITY_TYPES.length - 1]
}

/**
 * 偏態分析：根據各維度標準化分數（0-100）判斷使用者的偏態特徵
 */
export function getBiasAnalysis(scores: Record<Dimension, number>): BiasAnalysis {
  const { prompt, critical, ai_cognition, ethics } = scores
  const allHigh = Object.values(scores).every(s => s >= 75)

  if (allHigh) {
    return {
      label: '全方位AI素養者',
      desc: '各維度均衡高分，是AI時代的理想能力結構。你已具備驅動AI、辨別風險、管理知識的完整能力。',
      immediate: [
        '開始建立自己的 AI 工作流程模板，系統化整合日常任務',
        '嘗試擔任團隊的 AI 導師，帶領同事提升 AI 素養',
        '參與 AI 相關社群或論壇，分享你的實踐經驗',
        '挑戰更進階的提示工程技巧（如 Chain-of-Thought、Few-shot prompting）',
      ],
      future: [
        '朝向 AI 產品設計或顧問方向發展，成為組織內的 AI 轉型推手',
        '持續追蹤 AI 前沿研究（arXiv、AI Safety 領域），保持知識領先',
        '探索 AI 倫理治理領域，為未來的 AI 政策制定做好準備',
        '建立個人品牌，透過寫作或演講分享 AI 素養知識',
      ],
    }
  }
  if (prompt >= 80 && critical < 60) {
    return {
      label: '工具型使用者',
      desc: '高效但高風險——你擅長驅動AI，但容易被AI幻覺誤導，建議加強批判查核習慣。',
      immediate: [
        '養成「先懷疑，後使用」的習慣：每次 AI 輸出後，至少用一個外部來源交叉驗證',
        '學習辨識 AI 幻覺的常見模式：虛構引用、過度自信的數字、邏輯跳躍',
        '在重要決策前，對 AI 的回答主動追問「你的依據是什麼？」',
        '閱讀《人工智慧：現代方法》入門章節，了解 AI 的技術限制',
      ],
      future: [
        '系統學習批判性思維框架（如邏輯謬誤辨識、事實查核方法論）',
        '培養數據素養，能夠獨立評估統計資料與研究結論的可信度',
        '探索 AI 在你領域的失敗案例，建立對 AI 侷限的深層認識',
        '長期目標：成為兼具執行力與判斷力的「AI 智慧型使用者」',
      ],
    }
  }
  if (critical >= 80 && prompt < 60) {
    return {
      label: '懷疑型觀察者',
      desc: '你知道AI有缺陷，但尚未充分利用AI的潛力。學習提示工程將讓你的批判力如虎添翼。',
      immediate: [
        '從基礎開始：每天用 ChatGPT 或 Claude 完成一項日常工作任務，積累實操感',
        '學習結構化提示技巧：在提示中明確指定「角色、任務、格式、限制」四要素',
        '挑選你最熟悉的專業領域，嘗試讓 AI 成為你的研究助手',
        '參加線上提示工程課程（如 DeepLearning.AI 的免費課程）',
      ],
      future: [
        '將你的批判性思維優勢結合 AI 工具，發展為「AI 品質把關」的核心能力',
        '研究提示工程進階技術：RAG（檢索增強生成）、Fine-tuning 概念',
        '探索 AI Evaluation 領域，學習如何系統性評估 AI 輸出品質',
        '長期目標：成為能夠設計 AI 流程並監控其品質的「AI 工作流程架構師」',
      ],
    }
  }
  if (ai_cognition >= 80 && ethics < 60) {
    return {
      label: '技術先行者',
      desc: '你深度理解AI原理，但對社會影響考慮不足。強化倫理意識有助於做出更負責任的AI決策。',
      immediate: [
        '閱讀 AI 倫理入門資源：《AI 倫理》（Mark Coeckelbergh）或 MIT AI Ethics 公開課',
        '在下一個 AI 相關決策前，主動思考：這會對哪些人群產生不公平影響？',
        '了解 GDPR、台灣個資法對 AI 系統的規範要求',
        '加入 AI 倫理相關的社群討論（如 Partnership on AI、AI for Good）',
      ],
      future: [
        '深入研究 AI 公平性（Fairness）、可解釋性（Explainability）技術方法',
        '學習 AI 治理框架：EU AI Act、NIST AI Risk Management Framework',
        '結合你的技術背景，朝向「負責任 AI 開發」或「AI 稽核」領域發展',
        '長期目標：成為能夠設計兼顧效能與倫理的 AI 系統的「全方位 AI 工程師」',
      ],
    }
  }
  return {
    label: '均衡發展中',
    desc: '各維度尚在成長，持續學習將讓你全面提升AI素養。找到你最感興趣的切入點，從那裡開始加速突破。',
    immediate: [
      '完成本次測驗後，找出分數最低的維度，優先投入改善',
      '每週選擇一個 AI 工具深度體驗，記錄它的能力邊界與使用心得',
      '訂閱一個 AI 相關的中文 Newsletter（如「科技島讀」）保持資訊更新',
      '每天花 15 分鐘閱讀一篇 AI 相關文章，培養持續學習習慣',
    ],
    future: [
      '制定 3 個月的 AI 素養提升計畫：每月專攻一個維度，搭配實際任務練習',
      '尋找一個可以應用 AI 的真實專案，在實踐中整合多維度能力',
      '建立自己的 AI 學習筆記系統，累積個人知識資產',
      '長期目標：在 6 個月內讓每個維度分數提升至少 15 分，達到均衡高分的全方位素養者',
    ],
  }
}

export function calculateResult(
  questions: Question[],
  answers: Answer[],
  timeTaken: number,
): TestResult {
  const dimScores: Record<string, DimensionScore> = {}

  for (const dim of DIMENSIONS) {
    const dimQuestions = questions.filter(q => q.dimension === dim)
    const dimAnswers = answers.filter(a => {
      const q = questions.find(q => q.id === a.questionId)
      return q?.dimension === dim
    })
    const earned = dimAnswers.filter(a => a.correct).reduce((s, a) => s + a.points, 0)
    const max = dimQuestions.reduce((s, q) => s + q.points, 0)
    const percent = max > 0 ? Math.round((earned / max) * 100) : 0
    dimScores[dim] = { dimension: dim as Dimension, raw: earned, max, percent }
  }

  const aiiqScore = calcAIIQ(dimScores)
  const percentile = aiiqToPercentile(aiiqScore)

  const scoreMap = Object.fromEntries(
    DIMENSIONS.map(d => [d, dimScores[d].percent])
  ) as Record<Dimension, number>

  const personalityType = getPersonalityType(aiiqScore)
  const biasAnalysis = getBiasAnalysis(scoreMap)

  return {
    answers,
    dimensionScores: dimScores as Record<Dimension, DimensionScore>,
    aiiqScore,
    percentile,
    personalityType,
    biasAnalysis,
    timeTaken,
  }
}
