import type { TestConfig } from './types'

const lq: TestConfig = {
  id: 'lq',
  name: '領導力指數測驗',
  scoreLabel: 'LQ',
  scoreMax: 130,
  tagline: '測出你的領導力 DNA',
  category: '領導力 / 職場',
  categoryColor: '#6366f1',
  icon: '👑',
  description: '多維度評估你的管理風格、團隊溝通、影響力與決策品質',
  dimensions: [
    { id: 'communication', label: '溝通風格', icon: '💬', color: '#6366f1', weight: 0.18 },
    { id: 'decision',      label: '決策品質', icon: '⚖️', color: '#8b5cf6', weight: 0.20 },
    { id: 'delegation',    label: '授權能力', icon: '🤝', color: '#a78bfa', weight: 0.17 },
    { id: 'conflict',      label: '衝突處理', icon: '🛡️', color: '#7c3aed', weight: 0.15 },
    { id: 'motivation',    label: '激勵技巧', icon: '🔥', color: '#c4b5fd', weight: 0.15 },
    { id: 'self_awareness',label: '自我認知', icon: '🪞', color: '#ddd6fe', weight: 0.15 },
  ],
  questions: [],
  personalityTypes: [
    { id: 'visionary',    label: '願景型領導者', icon: '🌟', desc: '以清晰願景激勵團隊，善於設定方向。', minScore: 110, maxScore: 130 },
    { id: 'coach',        label: '教練型領導者', icon: '🏆', desc: '以培育人才為核心，重視個人成長。',   minScore: 90,  maxScore: 109 },
    { id: 'democratic',   label: '民主型領導者', icon: '🗳️', desc: '重視集體參與，善於凝聚共識。',       minScore: 72,  maxScore: 89  },
    { id: 'pace_setter',  label: '節奏型領導者', icon: '⚡', desc: '以身作則，以高標準驅動績效。',       minScore: 55,  maxScore: 71  },
    { id: 'coordinator',  label: '協調型領導者', icon: '🧩', desc: '擅長整合資源，維護團隊和諧。',       minScore: 35,  maxScore: 54  },
    { id: 'developing',   label: '成長中的領導者', icon: '🌱', desc: '正在建立領導基礎，潛力可期。',    minScore: 0,   maxScore: 34  },
  ],
  timeLimitMinutes: 12,
  targetAudience: ['主管', '團隊leader', 'HR'],
  difficulty: 4,
  price: 1.99,
  comingSoon: true,
}

export default lq
