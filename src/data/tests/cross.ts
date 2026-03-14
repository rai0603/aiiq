import type { TestConfig } from './types'

const cross: TestConfig = {
  id: 'cross',
  name: '跨文化溝通力測驗',
  scoreLabel: '溝通指數',
  scoreMax: 100,
  tagline: '你的跨文化溝通力有幾分？',
  category: '語言 / 溝通力',
  categoryColor: '#06b6d4',
  icon: '🌍',
  description: '評估你在多語言、多文化環境中的溝通適應力與敏感度',
  dimensions: [
    { id: 'cultural_sensitivity', label: '文化敏感度', icon: '🌐', color: '#06b6d4', weight: 0.20 },
    { id: 'language_flex',        label: '語言靈活度', icon: '💬', color: '#0891b2', weight: 0.18 },
    { id: 'nonverbal',            label: '非語言解讀', icon: '👁️', color: '#22d3ee', weight: 0.17 },
    { id: 'mediation',            label: '衝突調解',  icon: '🕊️', color: '#67e8f9', weight: 0.15 },
    { id: 'empathy',              label: '換位思考',  icon: '❤️', color: '#a5f3fc', weight: 0.15 },
    { id: 'comm_style',           label: '溝通風格',  icon: '🎭', color: '#cffafe', weight: 0.15 },
  ],
  questions: [],
  personalityTypes: [
    { id: 'global_citizen', label: '全球化溝通者', icon: '🌟', desc: '能夠自如穿梭於不同文化環境，是天生的跨文化使者。', minScore: 85, maxScore: 100 },
    { id: 'adapter',        label: '高適應力者',   icon: '🦎', desc: '具備良好的跨文化敏感度，能有效適應新環境。',        minScore: 68, maxScore: 84  },
    { id: 'learner',        label: '積極學習者',   icon: '📚', desc: '有意願探索跨文化，持續強化溝通技能中。',            minScore: 50, maxScore: 67  },
    { id: 'observer',       label: '文化觀察者',   icon: '🔭', desc: '能觀察文化差異但適應速度較慢，需多主動參與。',      minScore: 30, maxScore: 49  },
    { id: 'beginner',       label: '跨文化新手',   icon: '🌱', desc: '建議多接觸不同文化背景的人，累積跨文化經驗。',      minScore: 0,  maxScore: 29  },
  ],
  timeLimitMinutes: 9,
  targetAudience: ['外貿業務', '海外工作者', '外語學習者'],
  difficulty: 3,
  price: 0.99,
  comingSoon: true,
}

export default cross
