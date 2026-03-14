import type { TestConfig, Question } from '../data/tests'

export interface Answer {
  questionId: string
  selected: number
  correct: boolean
  points: number
}

export interface DimensionScore {
  dimension: string
  raw: number       // earned points
  max: number       // max possible points
  percent: number   // 0-100
}

export interface BiasAnalysis {
  label: string
  desc: string
  immediate: string[]
  future: string[]
}

export interface TestResult {
  answers: Answer[]
  dimensionScores: Record<string, DimensionScore>
  score: number      // 0–scoreMax weighted scale
  percentile: number // 0–100
  personalityType: { id: string; label: string; icon: string; desc: string; minScore: number; maxScore: number }
  biasAnalysis?: BiasAnalysis
  timeTaken: number  // seconds
}

/**
 * 加權計算公式：
 * 1. 各維度原始分 = Σ（答對題目的分值）
 * 2. 維度標準化分 = （維度原始分 ÷ 維度滿分）× 100
 * 3. 加權總分 = Σ（各維度標準化分 × 維度權重）
 * 4. score = round(weightedTotal × (scoreMax / 100))，最高 scoreMax
 */
function calcScore(dimScores: Record<string, DimensionScore>, testConfig: TestConfig): number {
  let weightedTotal = 0
  for (const dim of testConfig.dimensions) {
    const score = dimScores[dim.id]
    if (!score) continue
    weightedTotal += score.percent * dim.weight
  }
  const finalScore = Math.round(weightedTotal * (testConfig.scoreMax / 100))
  return Math.min(testConfig.scoreMax, Math.max(0, finalScore))
}

/**
 * 根據分數（0-scoreMax）估算百分位
 * 假設平均值 = scoreMax × 0.58，SD = scoreMax × 0.15
 */
export function scoreToPercentile(score: number, scoreMax: number): number {
  const mean = scoreMax * 0.58
  const sd = scoreMax * 0.15
  const z = (score - mean) / sd
  const p = 0.5 * (1 + erf(z / Math.sqrt(2)))
  return Math.round(Math.min(99, Math.max(1, p * 100)))
}

// Keep legacy export for backward compat
export function aiiqToPercentile(score: number): number {
  return scoreToPercentile(score, 130)
}

export function erf(x: number): number {
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

export function getPersonalityType(score: number, testConfig: TestConfig) {
  const found = testConfig.personalityTypes.find(t => score >= t.minScore && score <= t.maxScore)
  return found ?? testConfig.personalityTypes[testConfig.personalityTypes.length - 1]
}

export function calculateResult(
  questions: Question[],
  answers: Answer[],
  timeTaken: number,
  testConfig: TestConfig,
): TestResult {
  const dimScores: Record<string, DimensionScore> = {}

  for (const dim of testConfig.dimensions) {
    const dimQuestions = questions.filter(q => q.dimension === dim.id)
    const dimAnswers = answers.filter(a => {
      const q = questions.find(q => q.id === a.questionId)
      return q?.dimension === dim.id
    })
    const earned = dimAnswers.filter(a => a.correct).reduce((s, a) => s + a.points, 0)
    const max = dimQuestions.reduce((s, q) => s + q.points, 0)
    const percent = max > 0 ? Math.round((earned / max) * 100) : 0
    dimScores[dim.id] = { dimension: dim.id, raw: earned, max, percent }
  }

  const score = calcScore(dimScores, testConfig)
  const percentile = scoreToPercentile(score, testConfig.scoreMax)
  const personalityType = getPersonalityType(score, testConfig)

  let biasAnalysis: BiasAnalysis | undefined
  if (testConfig.getBiasAnalysis) {
    const scoreMap = Object.fromEntries(
      testConfig.dimensions.map(d => [d.id, dimScores[d.id]?.percent ?? 0])
    )
    biasAnalysis = testConfig.getBiasAnalysis(scoreMap)
  }

  return {
    answers,
    dimensionScores: dimScores,
    score,
    percentile,
    personalityType,
    biasAnalysis,
    timeTaken,
  }
}
