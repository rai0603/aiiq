import type { TestConfig } from './types'

const eq: TestConfig = {
  id: 'eq',
  name: '創業者思維測驗',
  scoreLabel: 'EQ+',
  scoreMax: 130,
  tagline: '你有創業家的思維嗎？',
  category: '創業 / 商業思維',
  categoryColor: '#f59e0b',
  icon: '🚀',
  description: '測量你具備多少創業家的核心思維模式與決策能力',
  dimensions: [
    { id: 'opportunity',  label: '機會識別', icon: '🔭', color: '#f59e0b', weight: 0.18 },
    { id: 'risk_taking',  label: '風險承受', icon: '🎲', color: '#d97706', weight: 0.17 },
    { id: 'mvp',          label: '快速驗證', icon: '⚡', color: '#fbbf24', weight: 0.18 },
    { id: 'resources',    label: '資源整合', icon: '🔗', color: '#fcd34d', weight: 0.15 },
    { id: 'resilience',   label: '韌性指數', icon: '💪', color: '#fde68a', weight: 0.17 },
    { id: 'market',       label: '市場直覺', icon: '🎯', color: '#fef3c7', weight: 0.15 },
  ],
  questions: [],
  personalityTypes: [
    { id: 'visionary',    label: '連續創業家', icon: '🦁', desc: '具備全方位創業思維，敢於打破常規。',     minScore: 110, maxScore: 130 },
    { id: 'innovator',   label: '創新型思考者', icon: '💡', desc: '善於發現機會，具備強烈的創業精神。',  minScore: 90,  maxScore: 109 },
    { id: 'executor',    label: '執行力強者', icon: '⚙️', desc: '有想法並能落地，但需加強市場敏感度。', minScore: 70,  maxScore: 89  },
    { id: 'explorer',    label: '創業探索者', icon: '🧭', desc: '對創業充滿熱情，正在建立思維框架。',    minScore: 50,  maxScore: 69  },
    { id: 'employee',    label: '職場思維者', icon: '🏢', desc: '傾向穩定環境，可從副業開始探索創業。', minScore: 0,   maxScore: 49  },
  ],
  timeLimitMinutes: 15,
  targetAudience: ['創業者', '產品經理', '高管'],
  difficulty: 4,
  price: 1.99,
  comingSoon: true,
}

export default eq
