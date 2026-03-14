import type { TestConfig } from './types'

const outdoor: TestConfig = {
  id: 'outdoor',
  name: '戶外運動安全力測驗',
  scoreLabel: '安全指數',
  scoreMax: 100,
  tagline: '你的戶外安全意識達標了嗎？',
  category: '戶外 / 運動安全',
  categoryColor: '#ef4444',
  icon: '🏔️',
  description: '評估你在水上、登山、極限運動等戶外場景的安全判斷與技能素養',
  dimensions: [
    { id: 'risk_assess', label: '風險評估', icon: '⚠️', color: '#ef4444', weight: 0.20 },
    { id: 'first_aid',   label: '急救知識', icon: '🏥', color: '#dc2626', weight: 0.20 },
    { id: 'equipment',   label: '裝備判斷', icon: '🎒', color: '#f87171', weight: 0.17 },
    { id: 'weather',     label: '天氣判讀', icon: '🌤️', color: '#fca5a5', weight: 0.17 },
    { id: 'emergency',   label: '緊急處置', icon: '🆘', color: '#fee2e2', weight: 0.13 },
    { id: 'regulations', label: '法規常識', icon: '📋', color: '#fecaca', weight: 0.13 },
  ],
  questions: [],
  personalityTypes: [
    { id: 'expert',    label: '戶外安全達人', icon: '🏆', desc: '具備專業戶外安全知識，能有效應對各種危機。', minScore: 85, maxScore: 100 },
    { id: 'advanced',  label: '進階戶外者',   icon: '🧗', desc: '安全意識良好，仍有進步空間。',              minScore: 68, maxScore: 84  },
    { id: 'moderate',  label: '一般戶外愛好者', icon: '🥾', desc: '基礎知識具備，建議加強急救與緊急處置。', minScore: 50, maxScore: 67  },
    { id: 'beginner',  label: '初學者',       icon: '🌱', desc: '建議先系統學習戶外安全知識再出發。',        minScore: 30, maxScore: 49  },
    { id: 'risky',     label: '高風險使用者', icon: '🚨', desc: '安全意識需大幅提升，建議先接受正式訓練。', minScore: 0,  maxScore: 29  },
  ],
  timeLimitMinutes: 10,
  targetAudience: ['水上運動', '登山', '戶外教練'],
  difficulty: 5,
  price: 0.99,
  comingSoon: true,
}

export default outdoor
