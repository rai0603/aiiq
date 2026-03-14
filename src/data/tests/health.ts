import type { TestConfig } from './types'

const health: TestConfig = {
  id: 'health',
  name: '身心健康素養測驗',
  scoreLabel: '健康指數',
  scoreMax: 100,
  tagline: '你真的懂得照顧自己嗎？',
  category: '健康 / 身心素養',
  categoryColor: '#22c55e',
  icon: '💪',
  description: '評估你在現代高壓社會中的健康知識、心理韌性與自我照護能力',
  dimensions: [
    { id: 'exercise',  label: '運動知識', icon: '🏃', color: '#22c55e', weight: 0.18 },
    { id: 'nutrition', label: '營養素養', icon: '🥗', color: '#16a34a', weight: 0.18 },
    { id: 'sleep',     label: '睡眠管理', icon: '😴', color: '#4ade80', weight: 0.17 },
    { id: 'stress',    label: '壓力應對', icon: '🧘', color: '#86efac', weight: 0.17 },
    { id: 'mental',    label: '心理健康', icon: '🧠', color: '#bbf7d0', weight: 0.15 },
    { id: 'prevention',label: '預防保健', icon: '🩺', color: '#dcfce7', weight: 0.15 },
  ],
  questions: [],
  personalityTypes: [
    { id: 'wellness_master', label: '身心平衡達人', icon: '🌟', desc: '全方位健康意識優秀，是自我照護的典範。',      minScore: 85, maxScore: 100 },
    { id: 'active',          label: '積極健康者',   icon: '💚', desc: '具備良好健康習慣，持續優化自我照護中。',      minScore: 68, maxScore: 84  },
    { id: 'aware',           label: '健康意識者',   icon: '👁️', desc: '知道健康重要，部分習慣仍需調整。',           minScore: 50, maxScore: 67  },
    { id: 'improving',       label: '健康改善中',   icon: '🔄', desc: '正在建立更好的生活習慣，方向正確。',          minScore: 30, maxScore: 49  },
    { id: 'at_risk',         label: '高風險生活型態', icon: '⚠️', desc: '多項健康指標需要關注，建議尋求專業建議。', minScore: 0,  maxScore: 29  },
  ],
  timeLimitMinutes: 10,
  targetAudience: ['上班族', '家長', '運動愛好者'],
  difficulty: 4,
  price: 0.99,
  comingSoon: true,
}

export default health
