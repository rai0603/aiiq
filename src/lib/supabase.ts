import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
)

export interface TestResultRow {
  id?: string
  user_id?: string
  test_id: string
  score: number
  percentile: number
  dimension_scores: Record<string, { raw: number; max: number; percent: number }>
  answers: Array<{ questionId: string; selected: number; correct: boolean; points: number }>
  personality_type_id: string
  time_taken: number
  unlocked: boolean
  paid_at?: string | null
  payment_id?: string | null
  created_at?: string
}
