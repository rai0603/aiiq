export type Dimension = 'ai_cognition' | 'prompt' | 'critical' | 'knowledge_mgmt' | 'ethics'
export type Difficulty = 'easy' | 'medium' | 'hard'
export type QuestionType = 'single' | 'scenario'

export interface Question {
  id: string
  dimension: Dimension
  type: QuestionType
  difficulty: Difficulty
  isCore: boolean // core = always shown, non-core = random pool
  question: string
  options: string[]
  correct: number // 0-based index
  explanation: string
  points: number // easy=2, medium=2, hard=3
}

export const DIMENSION_LABELS: Record<Dimension, { label: string; icon: string; color: string }> = {
  ai_cognition:  { label: 'AI認知能力',      icon: '⚡', color: '#8b5cf6' },
  prompt:        { label: '提示工程能力',    icon: '🎯', color: '#10b981' },
  critical:      { label: '批判思維能力',    icon: '🔍', color: '#f59e0b' },
  knowledge_mgmt:{ label: '知識管理能力',    icon: '📚', color: '#f59e0b' },
  ethics:        { label: 'AI倫理與風險意識', icon: '🌐', color: '#ef4444' },
}

export const DIMENSION_WEIGHTS: Record<Dimension, number> = {
  ai_cognition:   0.20,
  prompt:         0.25,
  critical:       0.25,
  knowledge_mgmt: 0.15,
  ethics:         0.15,
}

export const QUESTIONS: Question[] = [

  // ─────────────────────────────────────────────
  // 維度一：AI認知能力（Q1-Q10）
  // ─────────────────────────────────────────────
  {
    id: 'Q1', dimension: 'ai_cognition', type: 'single', difficulty: 'easy', isCore: true,
    question: '下列哪一項最能描述「大型語言模型（LLM）」的核心運作原理？',
    options: [
      '根據預設規則庫逐條比對用戶輸入，依規則邏輯產生對應的文字回應',
      '透過深度理解人類語言的語義結構，以類似人腦神經元放電的方式進行邏輯推論',
      '基於大量文本訓練，預測在給定上下文中統計上最可能出現的下一個詞語',
      '即時連接到網際網路搜尋最新資料，再將多個來源的資訊整合成自然語言輸出',
    ],
    correct: 2, points: 2,
    explanation: 'LLM（如GPT、Claude）的本質是「預測下一個token（詞語）」的統計模型，並非真正的邏輯推論或即時搜尋。理解這點有助於掌握其優勢與局限。',
  },
  {
    id: 'Q2', dimension: 'ai_cognition', type: 'single', difficulty: 'easy', isCore: true,
    question: '「AI幻覺（Hallucination）」指的是什麼現象？',
    options: [
      'AI系統在運算過載時因資源不足而觸發的自動保護機制，導致輸出中斷',
      'AI以高度自信的語氣產生聽起來合理但實際上不正確或憑空捏造的資訊',
      'AI在理解圖像或影片時，因像素解析不足而產生的視覺誤判與識別錯誤',
      'AI程式碼在執行複雜指令時，因邏輯條件衝突而進入無限迴圈的系統錯誤',
    ],
    correct: 1, points: 2,
    explanation: '幻覺是LLM最重要的已知缺陷之一，指模型以高度自信的語氣輸出錯誤、不存在或捏造的資訊，使用者必須保持批判性查核的習慣。',
  },
  {
    id: 'Q3', dimension: 'ai_cognition', type: 'single', difficulty: 'medium', isCore: false,
    question: 'ChatGPT、Claude、Gemini 這三個工具最主要的共同點是什麼？',
    options: [
      '它們都由同一家公司（OpenAI）開發，只是針對不同市場推出的不同品牌版本',
      '它們都屬於基於 Transformer 架構訓練的大型語言模型，由不同公司各自開發',
      '它們都能即時存取最新網路資訊，且均沒有知識截止日期的限制',
      '它們都具備執行精確數學計算的能力，並能保證輸出結果的數學正確性',
    ],
    correct: 1, points: 2,
    explanation: 'ChatGPT（OpenAI）、Claude（Anthropic）、Gemini（Google）分屬不同公司，但都建立在 Transformer 架構之上。它們各有知識截止日期，數學計算也可能出錯。',
  },
  {
    id: 'Q4', dimension: 'ai_cognition', type: 'single', difficulty: 'hard', isCore: true,
    question: '以下哪個場景，使用 AI 最可能產生嚴重風險？',
    options: [
      '用AI幫你發想生日賀卡的祝福語，作為靈感參考後再親自修改措辭',
      '用AI草擬行銷企劃初稿，再由團隊成員審查修改後提交給主管',
      '不經任何人工審核，直接將AI輸出的法律合約條文原文交給客戶簽署',
      '用AI整理會議錄音並生成結構化摘要，再由參與者確認內容的準確性',
    ],
    correct: 2, points: 3,
    explanation: '法律文件要求高度精確性與責任歸屬，AI輸出可能含有幻覺或不符當地法規的條款。未經專業人員審核直接使用，可能造成法律糾紛與責任問題。',
  },
  {
    id: 'Q5', dimension: 'ai_cognition', type: 'single', difficulty: 'easy', isCore: false,
    question: '「知識截止日期（Knowledge Cutoff）」對AI工具的用戶意味著什麼？',
    options: [
      'AI工具每天可以使用的次數有上限，超過次數後需等到隔天才能繼續使用',
      'AI的訓練資料有時間截止點，對截止日期之後發生的事件可能無法準確回答',
      'AI無法回應超過特定字數的問題，過長的提問會被系統自動截斷拒絕處理',
      'AI的付費訂閱方案在特定日期後會自動到期失效，需要重新購買才能使用',
    ],
    correct: 1, points: 2,
    explanation: '大多數LLM的訓練資料有截止日期，詢問最近的新聞、股價、最新法規等時，AI可能給出過時甚至錯誤的答案。使用時需特別留意此限制。',
  },
  {
    id: 'Q6', dimension: 'ai_cognition', type: 'single', difficulty: 'medium', isCore: false,
    question: '「RAG（檢索增強生成）」技術主要解決了LLM的哪個核心問題？',
    options: [
      '讓AI能夠真正理解並分析圖像、影片等多媒體內容，而不只限於處理文字',
      '讓AI能在生成回應前即時檢索並引用外部知識庫或私有文件中的最新資訊',
      '讓AI能夠深度學習特定用戶的個人寫作風格，並在之後的對話中自動模仿',
      '讓AI的推理運算速度提高十倍以上，大幅縮短每次對話等待回應的時間',
    ],
    correct: 1, points: 2,
    explanation: 'RAG（Retrieval-Augmented Generation）讓模型在生成回應前先從外部資料庫中檢索相關文件，有效解決知識截止問題並降低幻覺，是企業導入AI的常見架構。',
  },
  {
    id: 'Q7', dimension: 'ai_cognition', type: 'single', difficulty: 'medium', isCore: false,
    question: '為什麼同樣的問題，在不同時間問同一個AI可能得到不同的答案？',
    options: [
      'AI系統具有情緒狀態感知功能，系統「心情」不好時輸出品質會明顯下降',
      '模型回應具有一定的隨機性（Temperature參數），加上對話上下文的差異，導致輸出不盡相同',
      'AI服務商每天都在悄悄更新底層模型，新版本的知識庫與舊版存在差異',
      '這是AI公司為了保護模型不被破解，刻意設計的防重複回答安全機制',
    ],
    correct: 1, points: 2,
    explanation: 'LLM使用「溫度（Temperature）」參數控制輸出的隨機性，數值越高越有創意但也越不穩定。同時，對話上下文也會影響回答方向，這些都是正常的技術特性。',
  },
  {
    id: 'Q8', dimension: 'ai_cognition', type: 'single', difficulty: 'hard', isCore: false,
    question: '「多模態AI（Multimodal AI）」指的是？',
    options: [
      '可同時在多台行動裝置和桌機上同步運行、共享對話記錄的跨平台AI系統',
      '能夠處理並整合文字、圖像、聲音等多種不同類型輸入與輸出的AI模型',
      '擁有多種自然語言互譯能力，可在超過100種語言之間進行精準翻譯的AI工具',
      '由多個獨立AI模型同時分析同一問題，再以投票機制決定最終答案的集成系統',
    ],
    correct: 1, points: 3,
    explanation: '多模態AI（如GPT-4V、Gemini Ultra）能同時理解並生成文字、圖片、聲音甚至影片，代表AI應用從純文字擴展到更豐富的感知維度，這是目前AI發展的重要方向。',
  },
  {
    id: 'Q9', dimension: 'ai_cognition', type: 'single', difficulty: 'medium', isCore: false,
    question: '「Fine-tuning（微調）」和「使用 Prompt 引導 AI」的主要差異是什麼？',
    options: [
      'Fine-tuning 是完全免費的開源技術，而使用 Prompt 則需要按字數向AI公司付費',
      'Fine-tuning 透過特定資料集修改模型本身的權重參數；Prompt則是不改變模型地引導輸出',
      'Fine-tuning 只適合處理純文字的NLP任務，而 Prompt 才能應用於圖像生成任務',
      'Fine-tuning 的回應速度比 Prompt 快十倍以上，因此在商業應用中更具優勢',
    ],
    correct: 1, points: 2,
    explanation: 'Fine-tuning 是用特定資料集重新訓練模型，改變其底層參數；而 Prompt Engineering 是在不改變模型的前提下，透過精心設計的指令引導輸出，門檻較低。',
  },
  {
    id: 'Q10', dimension: 'ai_cognition', type: 'single', difficulty: 'hard', isCore: false,
    question: '下列關於 AI 生成內容（AIGC）著作權的說法，哪個最符合目前多數國家的法律現況？',
    options: [
      'AI生成的內容著作權完全歸屬於AI系統本身，AI作為創作主體享有完整的智慧財產權保護',
      'AI生成的內容自動進入公共領域，世界各地任何人都可以完全自由商業使用而無需授權',
      'AI生成內容的著作權歸屬目前各國法規不一且存在爭議，商業使用前需謹慎確認當地規定',
      'AI生成內容的著作權依國際公約一律完整歸屬於提供Prompt的使用者，受完整著作權保護',
    ],
    correct: 2, points: 2,
    explanation: 'AI生成內容的著作權是全球尚未解決的法律議題。美國版權局已拒絕為純AI生成作品登記版權；各國對使用者是否享有著作權看法不一。商業使用前務必確認相關法規。',
  },

  // ─────────────────────────────────────────────
  // 維度二：提示工程能力（Q11-Q20）
  // ─────────────────────────────────────────────
  {
    id: 'Q11', dimension: 'prompt', type: 'single', difficulty: 'easy', isCore: true,
    question: '你需要 AI 幫你撰寫一封「向客戶道歉的商業信件」。以下哪個 Prompt 最可能得到高品質結果？',
    options: [
      '「幫我以正式語氣寫一封商業道歉信，大約250字，記得要提供補救方案給客戶」',
      '「請撰寫一封商業道歉信，向因配送延誤而感到不滿的客戶表達歉意，語氣要正式，並附上補償方案，約250字」',
      '「請以公司客服主任的口吻，撰寫一封向客戶道歉的正式商業信件。背景：產品昨日配送延誤2天，客戶非常不滿。請表達誠摯歉意、說明原因（供應鏈問題）、提供補救方案（9折優惠券），語氣正式溫暖但不卑微，約250字。」',
      '「我們的產品昨天配送延誤了2天，客戶很不滿意，請幫我寫一封道歉信，表達歉意並提供折扣補償，語氣要專業一點，大概250字左右」',
    ],
    correct: 2, points: 2,
    explanation: '優質的 Prompt 包含：角色（客服主任）、任務（道歉信）、背景（延誤原因）、具體要求（補救方案）、語氣與長度限制。越具體的指令，AI越能給出可直接使用的結果。',
  },
  {
    id: 'Q12', dimension: 'prompt', type: 'single', difficulty: 'hard', isCore: true,
    question: '「少樣本提示（Few-shot Prompting）」的核心策略是什麼？',
    options: [
      '只給AI非常少量的文字描述，讓模型以更少的資源和更短的時間完成生成任務',
      '在 Prompt 中提供幾個輸入→輸出的具體範例，讓AI學習並複製所需的格式與風格',
      '把一個複雜的大型任務拆解成幾個小問題，依序分開向AI提問以降低難度',
      '限制AI每次回答的字數在100字以內，逼使模型只輸出最關鍵的核心資訊',
    ],
    correct: 1, points: 3,
    explanation: 'Few-shot Prompting 是在指令中附上2-5個「輸入→期望輸出」的範例，讓AI學習到你想要的具體格式、語氣或推理模式，大幅提升回應品質。',
  },
  {
    id: 'Q13', dimension: 'prompt', type: 'single', difficulty: 'hard', isCore: false,
    question: '你請 AI 分析一段財報資料，但 AI 給了一個你認為不準確的結論。此時最有效的做法是？',
    options: [
      '關掉目前的對話視窗，重新開啟一個全新的對話，並把同樣的問題再問一遍',
      '直接輸入「你錯了，重新回答」，讓AI知道你不滿意並要求它給出新的答案',
      '在同一對話中，具體指出你認為有問題的部分，並補充更多資訊或明確說明判斷標準，請AI重新分析',
      '放棄這個AI工具，改換另一家的AI平台，再把相同的問題重新提問一次',
    ],
    correct: 2, points: 3,
    explanation: 'LLM的對話是有上下文記憶的，在同一對話中精確指出問題點比重新開始更有效。具體的糾錯指引能引導AI做出針對性的修正。',
  },
  {
    id: 'Q14', dimension: 'prompt', type: 'single', difficulty: 'medium', isCore: false,
    question: '「角色扮演（Role-playing）Prompting」主要的用途是什麼？',
    options: [
      '讓AI扮演電玩遊戲中的虛擬角色，為玩家提供沉浸式的互動敘事體驗',
      '透過要求AI扮演特定專家或角色，使其輸出更符合該領域的視角、知識深度與專業風格',
      '讓AI與用戶進行模擬對話練習，協助用戶準備面試、演講或業務談判情境',
      '測試AI是否具備足夠的自我意識，能通過圖靈測試被誤認為真實的人類',
    ],
    correct: 1, points: 2,
    explanation: '「請扮演一位有20年經驗的行銷總監，分析以下廣告策略的優劣」，這種角色設定能讓AI的輸出更聚焦於特定專業視角，通常能得到更有深度的回答。',
  },
  {
    id: 'Q15', dimension: 'prompt', type: 'single', difficulty: 'hard', isCore: true,
    question: '「思維鏈（Chain-of-Thought）Prompting」主要適用於哪類任務？',
    options: [
      '生成詩歌、小說、廣告文案等強調創意發想與文學美感的開放性寫作任務',
      '需要多步驟邏輯推理的複雜任務，透過要求AI逐步展示推理過程來提升輸出準確度',
      '需要快速翻譯大量短篇文字的任務，要求AI以最高效率完成多語言轉換工作',
      '希望AI提供更多元化創意想法的腦力激盪任務，讓AI跳脫慣性思維模式',
    ],
    correct: 1, points: 3,
    explanation: '在 Prompt 中加入「請一步一步思考」或「請說明你的推理過程」，能顯著提升AI在數學、邏輯推理、複雜分析等任務的準確性。',
  },
  {
    id: 'Q16', dimension: 'prompt', type: 'single', difficulty: 'medium', isCore: false,
    question: '你需要 AI 每次都以固定格式輸出競爭對手分析報告（包含：名稱、優勢、劣勢、市場定位）。最佳做法是？',
    options: [
      '每次提問時都用口語重新描述一遍你希望的格式，讓AI每次都重新理解你的需求',
      '在 Prompt 中直接提供完整的格式模板，並附上一個填寫範例，要求AI嚴格按照模板輸出',
      '讓AI完全自由發揮決定報告結構，等收到回應後再手動重新整理成你想要的格式',
      '只在Prompt末尾加上「請用表格呈現」四個字，讓AI自行判斷最合適的表格欄位設計',
    ],
    correct: 1, points: 2,
    explanation: '對於需要重複使用的固定格式輸出，最有效的方式是在Prompt中直接提供Markdown或JSON格式的模板，並填入一個範例，讓AI精確複製你的格式需求。',
  },
  {
    id: 'Q17', dimension: 'prompt', type: 'single', difficulty: 'medium', isCore: false,
    question: '使用 AI 進行腦力激盪時，以下哪個做法最能激發更多元的想法？',
    options: [
      '「給我一些關於這個主題的想法就好，數量不限，隨便列幾個你覺得不錯的」',
      '「請列出10個關於XXX的想法，盡量涵蓋保守、激進、跨界、反直覺等不同角度，並簡短說明每個想法的核心概念」',
      '「只給我你認為最好的那一個想法就夠了，不需要其他選項，給我最優質的答案」',
      '「幫我想想看有沒有什麼好點子，你覺得什麼方向比較有潛力可以深入發展」',
    ],
    correct: 1, points: 2,
    explanation: '指定數量（10個）、指定多元維度（保守/激進/跨界/反直覺）、要求簡短說明，能打破AI傾向輸出「最安全答案」的傾向，獲得真正多元的構想清單。',
  },
  {
    id: 'Q18', dimension: 'prompt', type: 'single', difficulty: 'hard', isCore: false,
    question: '你的 Prompt 發出後，AI 的回答偏離主題，充滿無關內容。最可能的原因是？',
    options: [
      '今天AI的伺服器負載過高，導致模型處理能力下降，輸出品質暫時不穩定',
      'Prompt中的核心任務描述不夠明確，且可能包含容易誤導方向的模糊措辭或歧義詞彙',
      'AI對這個特定主題「不感興趣」，所以刻意把話題帶向它更擅長或更熟悉的領域',
      '這個問題的難度超過了AI的能力上限，模型在無法回答時會自動切換到相關但偏離的話題',
    ],
    correct: 1, points: 3,
    explanation: 'AI偏題通常源於Prompt本身：任務描述模糊、存在歧義詞彙、上下文資訊不足，或同時要求太多不相關事項。解決方式是重新審視Prompt，刪除歧義，明確說明首要目標。',
  },
  {
    id: 'Q19', dimension: 'prompt', type: 'single', difficulty: 'medium', isCore: false,
    question: '你想用 AI 草擬一份給投資人的商業計畫書，最應該在 Prompt 中提供哪些資訊？',
    options: [
      '只說「幫我寫一份完整的商業計畫書」，讓AI自行決定所有內容的方向和架構',
      '提供：公司名稱、產業、商業模式、目標市場、競爭優勢、資金需求、目標讀者（投資人類型）、期望文件風格',
      '先問AI「一份好的商業計畫書應該包含哪些章節」，讓它規劃架構後再開始撰寫',
      '把一份現有競爭對手的商業計畫書貼給AI參考，要求它寫出類似風格的版本',
    ],
    correct: 1, points: 2,
    explanation: '越多背景資訊，AI能產出越貼近實際需求的內容。商業計畫書需要高度個人化，提供公司資訊、目標受眾、融資需求等關鍵背景是獲得高品質初稿的必要條件。',
  },
  {
    id: 'Q20', dimension: 'prompt', type: 'single', difficulty: 'medium', isCore: false,
    question: '「負面提示（Negative Prompt）」的主要作用是什麼？',
    options: [
      '用來表達對AI輸出的不滿，透過負面評價讓AI學習到用戶的偏好並調整未來回答',
      '明確告訴AI你「不希望」它做什麼或包含什麼內容，以縮小輸出範圍、排除不想要的元素',
      '在情緒低落或壓力大時使用的特殊指令，讓AI以更溫柔的語氣進行心理支持對話',
      '指示AI在分析時刻意輸出更悲觀的預測結果，以幫助用戶評估最壞情境的風險',
    ],
    correct: 1, points: 2,
    explanation: '負面提示如「請不要使用行話」、「不需要結論段落」，能有效排除不想要的元素，和正面指令搭配使用是精準控制AI輸出的關鍵技巧。',
  },

  // ─────────────────────────────────────────────
  // 維度三：批判思維能力（Q21-Q30）
  // ─────────────────────────────────────────────
  {
    id: 'Q21', dimension: 'critical', type: 'single', difficulty: 'hard', isCore: true,
    question: 'AI 自信地告訴你：「根據2024年的研究，每天喝3杯咖啡可以降低50%的阿茲海默症風險」。你應該如何處理這個資訊？',
    options: [
      '立刻把這個結論分享給家人和朋友，因為這是有益健康的重要資訊，越早知道越好',
      '先搜尋並查找原始研究論文，確認AI引用的數據是否真實且被正確呈現，再決定是否使用',
      '直接在自己的健康文章中引用，因為AI已整合了大量文獻，提供了具體的數字和年份',
      '完全不相信並忽略這個資訊，AI在健康醫療領域根本不可信，這類問題都不應該問AI',
    ],
    correct: 1, points: 3,
    explanation: '這是典型的AI幻覺風險案例。AI可能捏造不存在的研究、誇大實際數據。對於健康、科學、法律等高風險領域的資訊，務必追溯原始來源進行核實。',
  },
  {
    id: 'Q22', dimension: 'critical', type: 'single', difficulty: 'medium', isCore: false,
    question: '你請 AI 幫你整理「為什麼A產品比B產品好」的論點，AI 給了你一份詳細的清單。此時需要注意什麼？',
    options: [
      '這份清單一定是客觀公正的，因為AI不像人類有偏見，可以直接在提案中使用',
      'AI是在執行你的指令（找A優於B的論點），輸出存在確認偏誤，應同時請AI整理B優於A的觀點',
      'AI不具備評估產品優劣的能力，這類比較性問題根本不適合使用AI來協助分析',
      '要求AI再補充20個更詳細的理由，直到清單夠完整後才可以考慮拿來使用',
    ],
    correct: 1, points: 2,
    explanation: 'AI具有服從性——你要求它找某方向的論點，它就會傾力為那個方向辯護。有效的做法是請AI同時列出支持與反對的論點，或扮演魔鬼代言人（Devil\'s Advocate）。',
  },
  {
    id: 'Q23', dimension: 'critical', type: 'single', difficulty: 'hard', isCore: true,
    question: 'AI 在回答中引用了一篇具體的學術論文（包括作者名、期刊名、年份）。最恰當的做法是？',
    options: [
      '直接在報告中引用，因為AI提供了如此詳細的資訊，幾乎可以確認論文是真實存在的',
      '到學術資料庫（如Google Scholar、PubMed）搜尋該論文，確認其是否真實存在後再引用',
      '直接詢問AI「這篇論文是真的嗎」，如果AI確認是真的，就可以放心引用在報告中',
      '只引用論文的標題而省略作者姓名，這樣即使論文是假的，法律責任也不在自己身上',
    ],
    correct: 1, points: 3,
    explanation: 'AI非常擅長生成「看起來很真實」的偽造學術引用——包括真實的作者姓名、合理的期刊名稱、正確的年份格式，但論文本身可能根本不存在。永遠需要在原始資料庫中驗證。',
  },
  {
    id: 'Q24', dimension: 'critical', type: 'single', difficulty: 'medium', isCore: false,
    question: '以下哪個跡象「最可能」暗示 AI 的回答包含幻覺或不確定資訊？',
    options: [
      'AI的回答篇幅很長，超過500字，且使用了許多段落和條列式清單加以組織說明',
      'AI在回答中大量使用了專業術語，顯示它可能對這個領域的理解深度不足',
      'AI以高度確定的語氣陳述一個極為具體的事實，但這個事實無法在網路上輕易找到出處',
      'AI在回答開頭使用了「這是一個好問題」之類的客套話，暗示它其實沒有信心回答',
    ],
    correct: 2, points: 2,
    explanation: '當AI以高度確信的語氣陳述一個無法輕易查證的具體事實時，這是最需要警惕的信號。AI的自信程度與準確性並不成正比。',
  },
  {
    id: 'Q25', dimension: 'critical', type: 'single', difficulty: 'hard', isCore: false,
    question: '你正在寫一篇關於氣候變遷的文章，使用 AI 蒐集論點。你應該如何處理 AI 提供的資訊？',
    options: [
      '直接全部使用，AI已整合大量資料，可以節省大量查資料的時間，直接信任其輸出',
      '只選用AI提供的、支持你原本立場的論點，忽略其他觀點以保持文章論述的一致性',
      '將AI的輸出視為初稿，對重要論點逐一查核來源，並主動請AI提供反方論點以確保全面性',
      '詢問AI「你提供的資料可靠嗎」，如果AI說可靠就放心使用，如果說不確定就換AI再問',
    ],
    correct: 2, points: 3,
    explanation: 'AI輸出應視為起點而非終點。正確做法包括：對具體聲明追溯原始資料、主動要求AI呈現反方觀點、交叉比對多個可靠來源。',
  },
  {
    id: 'Q26', dimension: 'critical', type: 'single', difficulty: 'medium', isCore: false,
    question: '你問 AI：「全球最好的電動車品牌是哪個？」AI 給了一個明確的單一答案。這個回答存在什麼問題？',
    options: [
      'AI的回答太短，沒有附上足夠的品牌比較數據和市場份額統計來支撐它的結論',
      '這個問題有明確的客觀正確答案，AI應該直接引用最新的市場報告而不是給出主觀判斷',
      '「最好」的定義主觀且多維（價格、續航、安全、服務等），AI給出單一答案可能反映訓練資料偏見',
      'AI不應被允許評論特定商業品牌，因為這可能涉及廣告不當推薦或競爭業者利益衝突',
    ],
    correct: 2, points: 2,
    explanation: '主觀性問題沒有唯一正確答案。AI容易因為訓練資料中某品牌被提及更多次而產生偏好，給出看似權威但實為偏頗的答案。遇到此類問題，應要求AI說明評估標準並提供多選項比較。',
  },
  {
    id: 'Q27', dimension: 'critical', type: 'single', difficulty: 'medium', isCore: true,
    question: '同一個問題分別在 ChatGPT 和 Claude 上詢問，得到了不同的答案。最合理的處理方式是？',
    options: [
      '選擇你個人比較信任或習慣使用的那個AI平台的答案，因為兩個都可能正確',
      '認定兩個答案都是錯的，不同AI給出不同答案本身就證明AI根本不可靠，應停止使用',
      '分析兩個回答的差異點，對關鍵不同之處查核外部來源，理解產生差異的可能原因',
      '把兩個答案的內容合併取中間值，這樣得到的結論統計上最接近正確答案',
    ],
    correct: 2, points: 2,
    explanation: '不同AI在相同問題上的分歧本身就是有價值的信號，提示這可能是存在爭議、模糊或需要查核的地方。利用分歧點作為深入查核的導引，比盲目選擇其中一個答案更為明智。',
  },
  {
    id: 'Q28', dimension: 'critical', type: 'single', difficulty: 'hard', isCore: false,
    question: '你發現 AI 在回答中引用了一個「假新聞」網站的觀點。這說明了什麼？',
    options: [
      '這個AI產品品質低劣，應該立即停止使用並改用其他更可靠的AI工具品牌',
      'AI的訓練資料包含網路上的各類內容，包括不可靠的來源，無法像人一樣主動辨別來源可信度',
      '這只是偶然的技術偏差，大部分情況下AI都能準確識別並自動過濾不可靠的資訊來源',
      'AI公司的審核機制失效，這是企業疏失行為，用戶應向監管單位投訴並要求賠償',
    ],
    correct: 1, points: 3,
    explanation: 'LLM從大量網路文本學習，其中包括低品質甚至錯誤的內容。模型無法完美地區分哪些來源可信，這正是用戶必須具備批判性查核能力的根本原因。',
  },
  {
    id: 'Q29', dimension: 'critical', type: 'single', difficulty: 'medium', isCore: false,
    question: 'AI 對你的文章草稿給予全面正面的評價，說「非常出色，邏輯清晰，論點有力」。你應該？',
    options: [
      '感謝AI的肯定，將這份評價截圖留存，並直接以完成品的標準提交這篇文章',
      '懷疑AI可能在奉承你，主動要求它扮演嚴格評審，具體找出文章最弱的論點或最明顯的邏輯漏洞',
      '詢問AI「你說的評價是真實的嗎？你真的覺得這篇文章很好嗎？」確認AI的誠意',
      '換到另一個更嚴格、批判性更強的AI平台去重新評估，直到得到你認為夠嚴格的反饋',
    ],
    correct: 1, points: 2,
    explanation: 'AI有「奉承傾向（sycophancy）」——傾向給予用戶期待的正面回饋而非誠實評估。當你需要批判性反饋時，必須明確要求AI扮演嚴格評審或魔鬼代言人。',
  },
  {
    id: 'Q30', dimension: 'critical', type: 'single', difficulty: 'medium', isCore: false,
    question: '你在使用 AI 進行市場研究，AI 提供了一組「市場規模預測數字」。最關鍵的下一步是？',
    options: [
      '直接把AI提供的數字複製貼上到商業計畫書中，標注來源為「AI市場研究」即可',
      '追問AI這些數字的來源，並嘗試找到對應的原始研究報告或機構數據進行核實',
      '把AI給的數字乘以1.5到2倍，因為AI訓練資料較舊，通常會系統性地低估市場規模',
      '詢問AI「這個數字準確嗎，你有多大把握」，根據AI的自我評估決定是否引用',
    ],
    correct: 1, points: 2,
    explanation: 'AI生成的市場數據非常容易是捏造的或過時的。對於商業決策中使用的任何數字，必須要求AI說明來源，並直接查找原始報告確認。',
  },

  // ─────────────────────────────────────────────
  // 維度四：知識管理能力（Q31-Q40）
  // ─────────────────────────────────────────────
  {
    id: 'Q31', dimension: 'knowledge_mgmt', type: 'single', difficulty: 'medium', isCore: true,
    question: '你每天閱讀大量文章、報告，想用 AI 建立個人知識庫。最有效的工作流程是？',
    options: [
      '把所有讀過的文章內容全部貼給AI，請它記住這些資訊，並在日後的對話中主動提及',
      '使用支援RAG的AI工具（如NotebookLM），建立有標籤分類的文件庫，讓AI在查詢時能檢索相關內容',
      '在每次閱讀後把重點記在腦子裡，需要時直接問AI相關主題讓AI補充你可能遺忘的細節',
      '設定AI每天自動生成當日新聞摘要並推送給你，長期下來自然能累積紮實的知識基礎',
    ],
    correct: 1, points: 2,
    explanation: '標準LLM在對話結束後不會記憶你提供的資訊。建立個人知識庫需要使用RAG架構的工具，讓你的文件成為AI可以即時檢索的知識源，才能真正實現AI輔助的知識管理。',
  },
  {
    id: 'Q32', dimension: 'knowledge_mgmt', type: 'single', difficulty: 'medium', isCore: false,
    question: '使用 AI 閱讀一篇長篇學術論文時，最高效的策略是？',
    options: [
      '直接請AI告訴你論文的最終結論，跳過方法論和背景介紹，節省理解全文的時間',
      '先請AI提供摘要，再針對最關心的章節深入提問，最後請AI說明研究方法的限制與潛在問題',
      '把整篇論文貼給AI後，讓AI把所有專業術語轉換成一般大眾可以理解的白話文版本',
      '先把論文上傳給AI，然後靜待AI主動找出它認為最值得你關注的重要發現並告知',
    ],
    correct: 1, points: 2,
    explanation: '高效的AI輔助閱讀是分層策略：先宏觀（摘要了解全貌）→ 再聚焦（針對相關章節深問）→ 最後批判（請AI指出研究限制）。這比直接問結論能獲得更深刻的理解。',
  },
  {
    id: 'Q33', dimension: 'knowledge_mgmt', type: 'single', difficulty: 'hard', isCore: true,
    question: '你想用 AI 整理一個季度的客戶回饋資料（共200筆），以下哪個方法最能產出有行動價值的洞察？',
    options: [
      '讓AI生成一段流暢的文字摘要，概述本季度客戶的整體滿意度與主要意見方向',
      '提供結構化分析框架（按問題類型分類、按嚴重程度評分、找出重複模式），要求AI輸出帶統計的分類報告，並標記最需優先處理的問題群',
      '請AI從200筆回饋中隨機抽選10筆它認為最具代表性的樣本進行深入分析',
      '讓AI把200筆中文客戶回饋全部翻譯成英文，方便之後與外籍主管分享討論',
    ],
    correct: 1, points: 3,
    explanation: 'AI整理大量非結構化資料的能力強大，但你必須提供分析框架才能獲得有行動價值的輸出。定義好分類維度和輸出格式，是將原始資料轉化為可執行洞察的關鍵。',
  },
  {
    id: 'Q34', dimension: 'knowledge_mgmt', type: 'single', difficulty: 'medium', isCore: false,
    question: '你需要在會議前快速了解一個陌生領域（如「量子計算的商業應用」）。最有效的 AI 輔助學習路徑是？',
    options: [
      '只問AI「量子計算是什麼」，得到一個概括性的解釋後就去參加會議，避免花太多時間準備',
      '先請AI給出概覽與關鍵術語表→解釋核心概念（附比喻）→問AI這領域最常見的誤解→請AI推薦2-3個入門資源',
      '直接在Google上搜尋「量子計算商業應用」，閱讀排名前三的網頁文章作為會議前的背景知識',
      '只需要在會議中記住這個領域的名稱即可，實際參與討論後再自行查資料補充理解',
    ],
    correct: 1, points: 2,
    explanation: 'AI輔助快速學習的最佳路徑是漸進式：概覽建立框架→核心概念加深理解→了解常見誤解→取得延伸閱讀資源。這比單問「是什麼」的深度高出許多倍。',
  },
  {
    id: 'Q35', dimension: 'knowledge_mgmt', type: 'single', difficulty: 'medium', isCore: false,
    question: '你正在撰寫一份重要報告，想用 AI 幫你組織思路。哪個做法最能提升報告的邏輯結構？',
    options: [
      '把報告題目告訴AI，讓AI從頭到尾直接寫完整份報告，你再對整體品質做最終審查',
      '和AI討論報告的目標讀者和核心論點，讓AI生成大綱，你審核修改後逐節請AI擴展，最後請AI以挑剔讀者角色找出邏輯漏洞',
      '讓AI一次生成三種不同架構的報告完整版本，再從中挑選你認為最合適的那一份',
      '只在完成報告的最後一個步驟時，請AI協助幫你修改和潤飾結語段落的語氣措辭',
    ],
    correct: 1, points: 2,
    explanation: '最有效的AI輔助寫作是人機協作模式：你提供目標與論點方向，AI生成結構，你審核修正，再逐節填充，最後以批判性視角檢查。',
  },
  {
    id: 'Q36', dimension: 'knowledge_mgmt', type: 'single', difficulty: 'hard', isCore: false,
    question: '你在同一個 AI 對話中先後詢問了10個不相關的問題，發現後面的回答品質越來越差。最可能的原因是？',
    options: [
      'AI系統因為你在同一對話中問了太多問題，觸發了防止過度使用的自動限流保護機制',
      '長對話中，上下文窗口（Context Window）被過去的內容填滿，AI難以同時關注所有先前指令',
      'AI的伺服器在白天的使用尖峰時段通常比較繁忙，導致回應品質在下午明顯不如上午',
      '長時間使用同一對話會導致你的網路連線品質逐漸下降，影響AI接收完整指令的能力',
    ],
    correct: 1, points: 3,
    explanation: 'AI有「上下文窗口（Context Window）」限制，對話越長，模型越難同時關注所有先前內容。最佳實踐是：不同主題開新對話、在長對話開頭提供關鍵背景摘要。',
  },
  {
    id: 'Q37', dimension: 'knowledge_mgmt', type: 'single', difficulty: 'medium', isCore: false,
    question: '你想用 AI 將一本英文商業書籍的重點整合進你自己的工作方法論。最有深度的做法是？',
    options: [
      '讓AI生成一份完整的書籍摘要，存入筆記工具中，日後有空再慢慢回頭閱讀消化',
      '讓AI摘要書中核心概念後，針對你的實際工作情境提問，再要求AI找出書中概念與現有方法論的衝突點',
      '告訴AI書名和作者，讓AI根據書名推測內容，生成一份符合書籍精神的個人化讀後感',
      '讓AI把整本英文書籍翻譯成中文，方便你在通勤時直接閱讀原文的中文對照版本',
    ],
    correct: 1, points: 2,
    explanation: '真正的知識整合不是「保存摘要」，而是將新知與自身情境連結。要求AI將概念應用於你的具體場景，並主動找出與既有方法論的衝突點，是形成個人化、可執行知識的最佳路徑。',
  },
  {
    id: 'Q38', dimension: 'knowledge_mgmt', type: 'single', difficulty: 'medium', isCore: false,
    question: '你希望每週用 AI 幫助你做「個人知識複盤」。哪個流程設計最有效？',
    options: [
      '讓AI根據你的名字和職業，自動幫你生成一份符合身份的本週個人成長日記',
      '每週提供本週閱讀筆記、學習心得、遇到的問題，請AI找出跨來源的關聯主題、識別知識盲點、提出下週學習方向',
      '讓AI每週固定生成一組激勵性的名人名言，提醒你保持學習的動力和專注',
      '每週末問AI「我這週應該學了什麼」，根據AI的建議來回顧和評估自己的學習成果',
    ],
    correct: 1, points: 2,
    explanation: '有效的知識複盤需要你提供原材料，讓AI發揮連結不同資訊、識別模式的能力。找跨來源關聯、識別盲點是人腦最難自行完成但AI最擅長的任務。',
  },
  {
    id: 'Q39', dimension: 'knowledge_mgmt', type: 'single', difficulty: 'hard', isCore: true,
    question: '你的團隊想用 AI 建立「公司知識庫」，讓新員工能快速上手。最重要的前置作業是？',
    options: [
      '立刻購買市場上功能最完整、價格最昂貴的AI知識庫工具，以確保技術層面不會成為瓶頸',
      '先系統性整理現有文件（SOP、案例、政策），建立清晰的分類與標籤體系，確保知識品質後再導入AI',
      '讓AI自動爬取公司所有共享資料夾和信箱中的文件，再用機器學習自動分類建立知識庫',
      '聘請一位專職的AI知識庫管理員，由他負責所有文件的整理、上傳和持續維護工作',
    ],
    correct: 1, points: 3,
    explanation: '「垃圾進，垃圾出」是AI知識庫最大的風險。AI的品質完全取決於輸入資料的品質。在導入AI前，先整理好現有知識、建立分類體系，是成敗的關鍵。',
  },
  {
    id: 'Q40', dimension: 'knowledge_mgmt', type: 'single', difficulty: 'medium', isCore: false,
    question: '你每天使用 AI 工具，想建立「個人 Prompt 資料庫」以提升工作效率。應如何組織？',
    options: [
      '只把最常用的那一個Prompt記住，其他的用完就丟，保持簡單不增加管理負擔',
      '依照任務類型分類（文案撰寫、資料分析、研究摘要、創意發想），為每個Prompt附上使用情境說明和效果評估，並定期更新優化',
      '把所有用過的Prompt都貼在AI的對話視窗裡存著，需要時捲回去找之前用過的指令',
      '讓AI幫你自動記住每次對話中你使用過的Prompt，並在下次類似任務時主動建議套用',
    ],
    correct: 1, points: 2,
    explanation: '一個好的Prompt資料庫應具備：情境分類、使用說明、效果記錄、版本管理。這讓你的AI使用經驗成為可累積的資產，而不是每次都重新摸索。',
  },

  // ─────────────────────────────────────────────
  // 維度五：AI倫理與風險意識（Q41-Q50）
  // ─────────────────────────────────────────────
  {
    id: 'Q41', dimension: 'ethics', type: 'single', difficulty: 'hard', isCore: true,
    question: '你的公司要求你使用 AI 工具分析客戶資料，以提升服務個人化。你最先應確認什麼？',
    options: [
      '這個AI工具的月費是否在預算範圍內，以及是否有提供免費試用期可以先評估效果',
      '客戶資料是否已獲得用戶同意用於AI分析，以及AI服務商是否符合GDPR或個資法等隱私法規',
      'AI的資料分析速度和準確率是否達到公司的業務需求，以及運算時間是否在可接受範圍內',
      'AI工具的操作介面是否直覺易用，以及是否有提供中文版本和完整的繁體中文技術支援',
    ],
    correct: 1, points: 3,
    explanation: '在AI處理個人資料前，必須確認：數據蒐集時的使用者同意範圍是否包含AI分析，以及AI服務商的資料處理協議是否符合當地法規。違反規定可能面臨巨額罰款和信任危機。',
  },
  {
    id: 'Q42', dimension: 'ethics', type: 'single', difficulty: 'hard', isCore: false,
    question: '你使用 AI 生成了一篇看起來非常真實的新聞文章，計畫發布在社群媒體上。以下哪個考量最重要？',
    options: [
      '文章的SEO關鍵字布局是否優化，是否能在搜尋引擎獲得足夠的自然流量曝光',
      '是否需要標示「AI生成內容」，以及文章內容是否可能造成公眾誤導或散佈不實資訊',
      'AI生成的文章字數是否達到平台演算法偏好的長度，以獲得更多自然觸及',
      '是否需要向AI服務公司支付額外的商業使用授權費用，才可以將AI生成內容對外發布',
    ],
    correct: 1, points: 3,
    explanation: 'AI生成的逼真「假新聞」是當前最嚴重的社會危害之一。即使意圖是善意的，未標示的AI生成新聞也可能導致誤導、輿論操縱。多國已開始立法要求標示AI生成內容。',
  },
  {
    id: 'Q43', dimension: 'ethics', type: 'single', difficulty: 'medium', isCore: false,
    question: '你用 AI 寫了一篇文章並發布在網路上，但沒有說明這是 AI 生成的。讀者留言批評後，你說「這只是一個工具，和用 Word 打字沒什麼不同」。這個觀點的問題是？',
    options: [
      '這個觀點完全正確，AI不過是一種寫作輔助工具，和Word等文書處理軟體沒有本質差異',
      '這個觀點忽略了讀者對內容真實性和來源透明度的期待，以及AI生成內容在準確性與創意歸屬上的獨特議題',
      '這個觀點的主要問題在於：Word才是更好用的寫作工具，用AI寫文章本身就是一個錯誤選擇',
      '這個觀點沒有任何根本性的問題，用什麼工具寫作是個人選擇，不需要向讀者透露創作方式',
    ],
    correct: 1, points: 2,
    explanation: 'AI生成和文字處理器有本質差異：AI會生成全新內容（包含潛在錯誤和幻覺），其創意歸屬、準確性責任，都是讀者可能合理期待了解的資訊。透明度是數位時代的基本倫理要求。',
  },
  {
    id: 'Q44', dimension: 'ethics', type: 'single', difficulty: 'hard', isCore: true,
    question: '你的主管要求你用 AI 批量生成求職者的評估報告，以加速篩選過程。你注意到 AI 的評估對特定大學的畢業生評分偏低。你應該？',
    options: [
      '忽略這個評分差異，繼續使用AI系統，因為最終錄用決策還是由人類主管做出的',
      '立即停止使用並向主管反映，AI評估可能存在算法偏見，直接用於HR決策可能違反就業歧視相關法律',
      '手動微調AI的評分參數，讓那些來自特定大學的候選人評分略微提高以消除差距',
      '對AI評分偏低的候選人再加做一次人工複核，以確保不會因系統偏差而錯過優秀人才',
    ],
    correct: 1, points: 3,
    explanation: 'AI招募工具中的算法偏見（Algorithmic Bias）是已被記錄的重大問題。在高風險決策（就業、信貸、醫療）中發現偏見信號時，停止使用並上報是正確的倫理行動。',
  },
  {
    id: 'Q45', dimension: 'ethics', type: 'single', difficulty: 'medium', isCore: false,
    question: '你使用 AI 幫助你撰寫學術論文，並以自己的名義提交。這種行為的核心問題是什麼？',
    options: [
      'AI撰寫的論文在文字品質和論述深度上通常不足以達到學術發表的水準要求',
      '這可能違反學術誠信準則，因為隱瞞AI的實質貢獻是一種學術欺騙，也剝奪了自己真實學習的機會',
      'AI生成的學術內容可能產生著作權方面的複雜法律問題，使論文難以通過版權審查',
      '指導教授或審稿委員可能不喜歡AI的寫作風格，導致論文因文筆問題而被退稿',
    ],
    correct: 1, points: 2,
    explanation: '不同機構對AI輔助有不同規範，但隱瞞AI的實質貢獻普遍被視為學術不誠信。更根本的問題是：過度依賴AI代替思考剝奪了學習本身的價值。',
  },
  {
    id: 'Q46', dimension: 'ethics', type: 'single', difficulty: 'medium', isCore: false,
    question: '你的朋友分享了一段「名人說出驚人言論」的影片，看起來非常真實。你懷疑這可能是 AI 生成的 Deepfake。你應該？',
    options: [
      '立刻轉發給更多朋友，讓大家都看到這個驚人內容，並在留言中表達自己的震驚',
      '先不轉發，使用Deepfake偵測工具或查閱可靠新聞媒體核實真實性，確認後再決定是否分享',
      '詢問朋友「這影片是假的嗎」，若朋友說不知道就放棄追查，直接選擇不轉發了事',
      '立即告知所有你認識的人要小心這段可疑的影片，提醒他們不要相信網路上的任何影片',
    ],
    correct: 1, points: 2,
    explanation: 'Deepfake是當前數位環境最嚴重的誤信威脅之一。在轉發前先核實是每個公民的責任，可用工具包括：Deepfake偵測工具、反向圖片搜尋，以及查找可靠媒體是否有對應報導。',
  },
  {
    id: 'Q47', dimension: 'ethics', type: 'single', difficulty: 'medium', isCore: false,
    question: '你正在使用 AI 提升工作效率，但你的同事擔心 AI 可能取代他的工作。最有建設性的態度是？',
    options: [
      '告訴他完全不用擔心，AI目前的能力有限，在可見的未來不可能真正取代任何人類工作',
      '同意他的擔憂，告訴他AI確實將取代大部分工作，建議他盡快轉換跑道到AI暫時無法取代的行業',
      '承認AI確實會改變許多職位的工作內容，鼓勵他一起學習如何將AI作為工具，並發展AI難以複製的人際、創意和判斷力技能',
      '假裝你自己沒有在使用AI工具，避免讓同事感到焦慮，維持團隊目前的工作氣氛和諧',
    ],
    correct: 2, points: 2,
    explanation: 'AI對就業市場的衝擊是真實的，否認它既不誠實也無益。最有建設性的態度是：承認變化、積極學習、聚焦培養AI難以取代的能力。「與AI協作」是未來核心競爭力。',
  },
  {
    id: 'Q48', dimension: 'ethics', type: 'single', difficulty: 'hard', isCore: false,
    question: '你要使用 AI 生成產品評論，發布在電商平台上（實際上你沒有使用過這個產品）。這行為的問題是？',
    options: [
      'AI生成的評論文字可能不夠自然流暢，容易被平台的內容審核系統識別並自動過濾',
      '這構成消費者欺詐，違反多國消費者保護法規，可能面臨法律責任，同時損害消費者的知情決策權',
      '這可能侵犯AI服務公司對生成內容的著作權，在未獲授權的情況下商業使用可能面臨索賠',
      '這種方式生成評論的效率其實並不高，從長遠成本來看不如委託真人撰寫評論更划算',
    ],
    correct: 1, points: 3,
    explanation: '虛假評論（無論是人工還是AI生成）是明確的消費欺詐行為。美國FTC、歐盟等監管機構已明確規範並開始開罰，這從根本上破壞了消費評論系統對社會的信任功能。',
  },
  {
    id: 'Q49', dimension: 'ethics', type: 'single', difficulty: 'medium', isCore: false,
    question: '你對一個 AI 工具越來越依賴，發現如果沒有 AI 幫你，你開始難以獨立完成以前能輕鬆完成的分析工作。這個現象應如何看待？',
    options: [
      '這很正常，就像計算機讓我們不再需要心算一樣，工具進步本來就應該替代過去的手動技能',
      '這是一個值得注意的信號，應定期練習獨立完成核心工作，避免過度依賴讓判斷力和技能逐漸退化',
      '這說明你已完全掌握了AI協作的精髓，是AI時代頂尖工作者應有的高度工具依賴狀態',
      '應該立即停止使用所有AI工具，強迫自己回到純手工的工作方式以恢復獨立作業能力',
    ],
    correct: 1, points: 2,
    explanation: '「技能退化（Skill Erosion）」是AI時代的真實風險。平衡點是：用AI提升效率，但定期在沒有AI的情況下練習核心判斷和分析技能，確保你是在「增強」能力，而非「外包」能力。',
  },
  {
    id: 'Q50', dimension: 'ethics', type: 'single', difficulty: 'hard', isCore: true,
    question: '你在公司工作，需要將一份含有商業機密的財務報告貼入 ChatGPT 進行分析。你應該？',
    options: [
      '直接把完整報告貼入ChatGPT，分析完成後立刻刪除對話記錄，這樣就不會有資安疑慮',
      '先確認公司AI使用政策及ChatGPT的資料條款，確認機密是否允許輸入第三方AI；若有疑慮，應使用私有AI或先脫敏處理',
      '只把報告的前半部分貼入ChatGPT，後半部分另外用其他AI工具分析，這樣分散風險比較安全',
      '用ChatGPT完成分析後，確保不保存任何對話截圖和記錄，口頭告知同事分析結果即可',
    ],
    correct: 1, points: 3,
    explanation: '將公司機密輸入第三方AI服務存在資料洩漏風險——三星、蘋果等大公司已有員工因此造成機密外洩的案例。正確做法是：先確認AI工具的資料政策、遵守公司AI使用規定，必要時進行資料脫敏。',
  },
]

// 每維度的核心題與題池
export const DIMENSIONS: Dimension[] = ['ai_cognition', 'prompt', 'critical', 'knowledge_mgmt', 'ethics']

export function buildTestQuestions(): Question[] {
  const result: Question[] = []

  for (const dim of DIMENSIONS) {
    const dimQuestions = QUESTIONS.filter(q => q.dimension === dim)
    const core = dimQuestions.filter(q => q.isCore)            // 3 core
    const pool = dimQuestions.filter(q => !q.isCore)           // 7 pool
    // randomly pick 2 from pool
    const shuffledPool = [...pool].sort(() => Math.random() - 0.5).slice(0, 2)
    // combine and shuffle
    const combined = [...core, ...shuffledPool].sort(() => Math.random() - 0.5)
    result.push(...combined)
  }

  return result
}

export interface PersonalityType {
  id: string
  label: string
  icon: string
  desc: string
  minScore: number
  maxScore: number
}

export const PERSONALITY_TYPES: PersonalityType[] = [
  {
    id: 'native',
    label: 'AI 原住民',
    icon: '🧠',
    desc: '各維度均衡高分，天生適應AI時代。你不只懂得使用AI，更能批判性地駕馭它。',
    minScore: 115,
    maxScore: 130,
  },
  {
    id: 'promptmaster',
    label: '提示工程師',
    icon: '⚡',
    desc: '溝通與提示能力突出，擅長從AI榨取最大價值。進一步強化批判思維將讓你更如虎添翼。',
    minScore: 100,
    maxScore: 114,
  },
  {
    id: 'gatekeeper',
    label: '知識守門人',
    icon: '🔍',
    desc: '批判力強，對AI輸出保持健康懷疑。建議提升提示工程技巧以更高效地使用AI。',
    minScore: 88,
    maxScore: 99,
  },
  {
    id: 'builder',
    label: '知識建構者',
    icon: '📚',
    desc: '擅長用AI整理和組織知識，是優秀的學習者。進一步強化倫理意識將讓你的AI使用更負責任。',
    minScore: 75,
    maxScore: 87,
  },
  {
    id: 'explorer',
    label: 'AI 探索者',
    icon: '🌱',
    desc: '正在積極摸索AI工具，有很大的成長空間。建議從提示工程和批判思維開始系統性學習。',
    minScore: 60,
    maxScore: 74,
  },
  {
    id: 'immigrant',
    label: '數位移民',
    icon: '🗺️',
    desc: '對AI工具尚在熟悉中。這是一個好的起點！建議從認識基本概念開始，循序漸進地建立AI素養。',
    minScore: 0,
    maxScore: 59,
  },
]
