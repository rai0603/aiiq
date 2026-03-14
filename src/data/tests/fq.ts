import type { TestConfig } from './types'

const fq: TestConfig = {
  id: 'fq',
  name: '財商智數測驗',
  scoreLabel: 'FQ',
  scoreMax: 130,
  tagline: '測出你的財務 IQ',
  category: '財商 / 個人理財',
  categoryColor: '#10b981',
  icon: '💰',
  description: '測量你的金融素養、投資判斷力與財務規劃能力',
  dimensions: [
    { id: 'basics',     label: '理財基礎', icon: '📖', color: '#10b981', weight: 0.18 },
    { id: 'investment', label: '投資邏輯', icon: '📈', color: '#059669', weight: 0.20 },
    { id: 'risk',       label: '風險意識', icon: '⚠️', color: '#34d399', weight: 0.17 },
    { id: 'tax',        label: '稅務規劃', icon: '🧾', color: '#6ee7b7', weight: 0.15 },
    { id: 'bias',       label: '心理偏誤', icon: '🧠', color: '#a7f3d0', weight: 0.15 },
    { id: 'allocation', label: '資產配置', icon: '🥧', color: '#d1fae5', weight: 0.15 },
  ],
  questions: [],
  personalityTypes: [
    { id: 'master',    label: '財務精英', icon: '💎', desc: '具備完整財務知識體系，能做出明智的投資決策。', minScore: 110, maxScore: 130 },
    { id: 'strategist',label: '財務策略家', icon: '♟️', desc: '擅長資產配置，具備風險管理意識。',          minScore: 90,  maxScore: 109 },
    { id: 'learner',   label: '進取型學習者', icon: '📚', desc: '有一定基礎，持續提升財務知識中。',       minScore: 70,  maxScore: 89  },
    { id: 'cautious',  label: '保守型理財者', icon: '🛡️', desc: '偏好低風險，但可能錯失成長機會。',       minScore: 50,  maxScore: 69  },
    { id: 'beginner',  label: '財務新手', icon: '🌱', desc: '正在建立財務觀念，需要系統性學習。',          minScore: 0,   maxScore: 49  },
  ],
  timeLimitMinutes: 10,
  targetAudience: ['上班族', '學生', '投資新手'],
  difficulty: 5,
  price: 1.99,
  comingSoon: true,
}

export default fq
