import aiiq from './aiiq'
import { lq } from './lq'
import fq from './fq'
import eq from './eq'
import smq from './smq'
import outdoor from './outdoor'
import cross from './cross'
import parent from './parent'
import social from './social'
import health from './health'
import type { TestConfig, Question, DimensionConfig } from './types'
import { buildAiiqQuestions } from './aiiq'

export type { TestConfig, Question, DimensionConfig }
export { buildAiiqQuestions }

export const ALL_TESTS: TestConfig[] = [aiiq, lq, fq, eq, smq, outdoor, cross, parent, social, health]
export const TEST_MAP: Record<string, TestConfig> = Object.fromEntries(ALL_TESTS.map(t => [t.id, t]))

export function getTest(id: string): TestConfig | undefined {
  return TEST_MAP[id]
}

export function buildQuizQuestions(testConfig: TestConfig): Question[] {
  if (testConfig.id === 'aiiq') {
    return buildAiiqQuestions(testConfig.questions, testConfig.dimensions.map(d => d.id))
  }
  return testConfig.questions
}
