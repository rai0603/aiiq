export interface Question {
  id: string
  dimension: string
  text: string
  options: string[]
  answer: number
  points: number
  isCore: boolean
}

export interface DimensionConfig {
  id: string
  label: string
  icon: string
  color: string
  weight: number
}

export interface PersonalityType {
  id: string
  label: string
  icon: string
  desc: string
  minScore: number
  maxScore: number
}

export interface BiasAnalysis {
  label: string
  desc: string
  immediate: string[]
  future: string[]
}

export interface TestConfig {
  id: string
  name: string
  scoreLabel: string
  scoreMax: number
  tagline: string
  category: string
  categoryColor: string
  icon: string
  description: string
  dimensions: DimensionConfig[]
  questions: Question[]
  personalityTypes: PersonalityType[]
  timeLimitMinutes: number
  targetAudience: string[]
  difficulty: number
  price: number
  comingSoon?: boolean
  getBiasAnalysis?: (scores: Record<string, number>) => BiasAnalysis
}
