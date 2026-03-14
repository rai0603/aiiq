import type { TestConfig } from './types'

const social: TestConfig = {
  id: 'social',
  name: '社群媒體行銷力測驗',
  scoreLabel: '行銷指數',
  scoreMax: 130,
  tagline: '你的行銷力能勝過算法嗎？',
  category: '社群媒體 / 行銷',
  categoryColor: '#8b5cf6',
  icon: '📱',
  description: '測評你在數位行銷時代的綜合能力，從內容策略到數據分析',
  dimensions: [
    { id: 'content',   label: '內容策略', icon: '✍️', color: '#8b5cf6', weight: 0.20 },
    { id: 'analytics', label: '數據分析', icon: '📊', color: '#7c3aed', weight: 0.18 },
    { id: 'algorithm', label: '平台算法', icon: '⚙️', color: '#a78bfa', weight: 0.17 },
    { id: 'audience',  label: '受眾洞察', icon: '👥', color: '#c4b5fd', weight: 0.15 },
    { id: 'brand',     label: '品牌聲量', icon: '📣', color: '#ddd6fe', weight: 0.15 },
    { id: 'ads',       label: '廣告投放', icon: '🎯', color: '#ede9fe', weight: 0.15 },
  ],
  questions: [],
  personalityTypes: [
    { id: 'guru',       label: '行銷大師',   icon: '🌟', desc: '洞悉平台算法，內容與數據並重，是頂尖的數位行銷人。',  minScore: 110, maxScore: 130 },
    { id: 'strategist', label: '策略型行銷人', icon: '♟️', desc: '具備完整行銷思維，善於整合多平台資源。',           minScore: 90,  maxScore: 109 },
    { id: 'creator',    label: '內容創作者', icon: '✨', desc: '內容產出能力強，可加強數據分析提升精準度。',         minScore: 70,  maxScore: 89  },
    { id: 'learner',    label: '行銷學習者', icon: '📖', desc: '正在建立行銷知識，持續實作是最快的成長路徑。',       minScore: 50,  maxScore: 69  },
    { id: 'beginner',   label: '行銷新手',   icon: '🌱', desc: '建議從一個平台深度經營開始，累積實戰經驗。',         minScore: 0,   maxScore: 49  },
  ],
  timeLimitMinutes: 12,
  targetAudience: ['行銷人', '創業者', 'SME'],
  difficulty: 4,
  price: 1.99,
  comingSoon: true,
}

export default social
