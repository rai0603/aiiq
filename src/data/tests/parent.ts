import type { TestConfig } from './types'

const parent: TestConfig = {
  id: 'parent',
  name: '現代教養力測驗',
  scoreLabel: '教養指數',
  scoreMax: 100,
  tagline: '你是哪種教養風格的父母？',
  category: '親子 / 教養',
  categoryColor: '#ec4899',
  icon: '👨‍👩‍👧',
  description: '評估父母在科技時代的教養知識、親子溝通品質與數位素養引導能力',
  dimensions: [
    { id: 'communication', label: '親子溝通', icon: '💬', color: '#ec4899', weight: 0.20 },
    { id: 'digital',       label: '數位教養', icon: '📱', color: '#db2777', weight: 0.18 },
    { id: 'emotion',       label: '情緒引導', icon: '❤️', color: '#f472b6', weight: 0.17 },
    { id: 'learning',      label: '學習支援', icon: '📚', color: '#f9a8d4', weight: 0.15 },
    { id: 'autonomy',      label: '自主培養', icon: '🦋', color: '#fbcfe8', weight: 0.15 },
    { id: 'boundaries',    label: '邊界設定', icon: '🛡️', color: '#fce7f3', weight: 0.15 },
  ],
  questions: [],
  personalityTypes: [
    { id: 'nurturing',    label: '滋養型父母',   icon: '🌸', desc: '在支持與引導間取得完美平衡，培養出自信孩子。',    minScore: 85, maxScore: 100 },
    { id: 'authoritative', label: '民主型父母', icon: '🤝', desc: '有原則又溫暖，孩子在安全感中成長。',              minScore: 68, maxScore: 84  },
    { id: 'supportive',  label: '支持型父母',   icon: '💪', desc: '以支持為主，需加強適當的邊界設定。',              minScore: 50, maxScore: 67  },
    { id: 'learning',    label: '成長中的父母', icon: '🌱', desc: '在教養路上不斷學習，已具備關愛的初心。',           minScore: 30, maxScore: 49  },
    { id: 'struggling',  label: '需要支援的父母', icon: '🙏', desc: '面臨教養挑戰，建議尋求親職教育資源。',          minScore: 0,  maxScore: 29  },
  ],
  timeLimitMinutes: 10,
  targetAudience: ['家長', '教師', '幼教工作者'],
  difficulty: 4,
  price: 0.99,
  comingSoon: true,
}

export default parent
