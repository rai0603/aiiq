import type { TestConfig } from './types'

export const lq: TestConfig = {
  id: 'lq',
  name: '領導力指數測驗',
  scoreLabel: 'LQ',
  scoreMax: 130,
  tagline: '你是哪種類型的領導者？',
  category: '領導能力',
  categoryColor: 'from-blue-700 to-teal-600',
  icon: '🎯',
  description: '45題 × 12分鐘，從溝通風格到決策品質，評測你的六大領導核心能力，獲得個人化的領導力成長藍圖',
  timeLimitMinutes: 15,
  targetAudience: ['一線主管', '部門主管', 'C-Level', 'HR', '未來主管'],
  difficulty: 4,
  price: 349,
  comingSoon: false,

  dimensions: [
    { id: 'communication',  label: '溝通風格', icon: '💬', color: '#1d4ed8', weight: 0.20 },
    { id: 'decision',       label: '決策品質', icon: '🧠', color: '#0d9488', weight: 0.22 },
    { id: 'delegation',     label: '授權能力', icon: '🤝', color: '#16a34a', weight: 0.18 },
    { id: 'conflict',       label: '衝突處理', icon: '⚖️', color: '#e11d48', weight: 0.17 },
    { id: 'motivation',     label: '激勵技巧', icon: '🔥', color: '#d97706', weight: 0.13 },
    { id: 'self_awareness', label: '自我認知', icon: '🪞', color: '#7c3aed', weight: 0.10 },
  ],

  questions: [
    // 溝通風格 Q1-Q8
    { id: 'lq_01', dimension: 'communication', text: '你的團隊成員小明提交了一份報告，品質遠低於你的預期。你最可能的第一反應是？', options: ['直接告訴他這份報告不合格，請他重做', '先詢問他完成這份報告時遇到了哪些困難，了解背景後再給予具體改善建議', '把報告退回但不解釋原因，讓他自己想', '在團隊會議上公開指出報告的問題，讓大家引以為戒'], answer: 1, points: 2, isCore: true },
    { id: 'lq_02', dimension: 'communication', text: '「非暴力溝通（NVC，Nonviolent Communication）」的四個核心要素是？', options: ['讚美、批評、建議、要求', '觀察（不帶評判的事實）、感受、需求、請求——這四個要素讓溝通從指責轉向理解', '命令、解釋、道歉、感謝', '問題、分析、解決方案、行動'], answer: 1, points: 2, isCore: true },
    { id: 'lq_03', dimension: 'communication', text: '「主動傾聽（Active Listening）」與普通傾聽最關鍵的差異是？', options: ['主動傾聽就是讓對方說完不打斷', '主動傾聽是指邊聽邊想自己的回應', '主動傾聽包含：保持眼神接觸、用語言和非語言確認理解（如點頭、複述）、暫停自己的評判、詢問澄清問題——目標是讓對方感到「被完全理解」，而非等待自己發言的機會', '主動傾聽就是重複對方說的最後一句話'], answer: 2, points: 3, isCore: true },
    { id: 'lq_04', dimension: 'communication', text: '給予「正向回饋（Positive Feedback）」時，最常見且最降低其效果的錯誤是？', options: ['回饋太及時', '回饋太具體', '給予模糊、泛泛的讚美（如「做得很好」），而非指出具體是什麼行為在什麼情境下產生了什麼影響——模糊讚美無法指導未來行為重複', '給太多正向回饋讓人習以為常'], answer: 2, points: 2, isCore: true },
    { id: 'lq_05', dimension: 'communication', text: '「向上管理（Managing Up）」對中層主管的核心意義是？', options: ['向上管理就是拍上司馬屁', '向上管理是讓自己的上司控制不了自己', '主動讓你的上司了解你的工作進度、挑戰和需要的支援，同時理解上司的優先事項和壓力——讓雙向的溝通流暢，而非等待上司詢問', '向上管理意味著對上司隱藏問題以免被認為能力不足'], answer: 2, points: 2, isCore: true },
    { id: 'lq_06', dimension: 'communication', text: '在一對一面談（1:1 Meeting）中，部屬沉默寡言、只說「還好」。最有效的突破策略是？', options: ['繼續問同樣的問題，等他自己開口', '告訴他沉默是不合作的表現', '用封閉式問題（是/否）讓他更容易回答', '改用開放性但具體的情境式問題（如：「上週你在跨部門會議中看起來有些猶豫，那個情況怎麼了？」），降低回答的心理門檻，同時顯示你有在觀察'], answer: 3, points: 3, isCore: true },
    { id: 'lq_07', dimension: 'communication', text: '「心理安全感（Psychological Safety）」對團隊溝通的影響，Amy Edmondson的研究最關鍵的發現是？', options: ['心理安全感讓團隊成員更少犯錯', '心理安全感讓人更容易服從主管指令', '心理安全感高的團隊報告更多錯誤——不是因為犯了更多錯，而是因為成員敢於提出和討論問題，最終學習和改進速度更快', '心理安全感讓所有人都感覺良好，但不一定提升工作表現'], answer: 2, points: 2, isCore: true },
    { id: 'lq_08', dimension: 'communication', text: '跨文化溝通中「高情境文化（High-Context Culture）」和「低情境文化（Low-Context Culture）」的差異，對領導者最重要的含義是？', options: ['高情境文化的人更聰明', '低情境文化更適合現代職場', '高情境文化（如台灣、日本）強調隱含的訊息、關係脈絡和非語言溝通；低情境文化（如美國、德國）重視直接明確的語言表達——跨文化領導需要識別你的溝通假設，調整風格', '文化差異在全球化時代已不重要'], answer: 2, points: 2, isCore: true },

    // 決策品質 Q9-Q16
    { id: 'lq_09', dimension: 'decision', text: '「第一性原理（First Principles Thinking）」在領導決策中的應用是？', options: ['只有科學家才使用第一性原理', '第一性原理就是憑直覺決策', '把問題分解到最基本的、無法再質疑的事實和假設，從這些基礎重新建構解決方案，而非照搬過去的做法或業界慣例', '先問別人怎麼做，然後跟著做'], answer: 2, points: 2, isCore: true },
    { id: 'lq_10', dimension: 'decision', text: '「決策疲勞（Decision Fatigue）」對領導效能的影響及應對方式是？', options: ['決策疲勞只影響體力工作者，腦力工作者不受影響', '越重要的決策越應該留到下午充分思考後再做', '大量的決策消耗認知資源，使後期決策品質下降（趨向默認選項或衝動）——應對策略包括：早上優先處理最重要的決策、建立標準化流程減少重複決策、刻意減少低重要性的選擇', '只要睡眠充足就能完全避免決策疲勞'], answer: 2, points: 3, isCore: true },
    { id: 'lq_11', dimension: 'decision', text: '「確認偏誤（Confirmation Bias）」在領導決策中的典型危害是？', options: ['確認偏誤讓領導者過於謙遜', '確認偏誤讓決策變得更快', '傾向搜尋和解讀支持自己既有觀點的資訊，忽視反面證據，導致在重大決策中忽略關鍵風險信號', '確認偏誤只影響個人決策，群體討論可以自動消除它'], answer: 2, points: 2, isCore: true },
    { id: 'lq_12', dimension: 'decision', text: '「可逆決策（Two-Way Door）」與「不可逆決策（One-Way Door）」的區分對領導者的意義？', options: ['所有決策都應該謹慎處理', '所有決策都應該快速做出', '可逆決策（可以輕易撤回）應該快速做出並授權執行；不可逆決策（難以撤回）值得更多分析和討論——混淆兩者會造成組織決策速度過慢或風險過高', '只有CEO才需要區分這兩類決策'], answer: 2, points: 2, isCore: true },
    { id: 'lq_13', dimension: 'decision', text: '「共識決策（Consensus Decision Making）」的最大風險是什麼？', options: ['共識決策是最民主的方式，沒有風險', '共識決策讓每個人都滿意', '群體迷思（Groupthink）和最低共同標準——為了維持表面和諧，成員壓抑異見，最終決策反映所有人都「勉強接受」的妥協方案，而非最佳選擇', '共識決策耗時太長，這是唯一的問題'], answer: 2, points: 3, isCore: true },
    { id: 'lq_14', dimension: 'decision', text: '「貝佐斯的14條領導原則」中，「Disagree and Commit（不同意但承諾）」的核心精神是？', options: ['不同意就應該持續反對直到改變決策', '沉默地接受你不同意的決策', '清晰地表達你的異議，讓決策者充分理解你的顧慮，但一旦決策做出，全力以赴執行，不消極應付、不說「我早說了」——既維護了智識誠信，也保持了執行一致性', '只有在不重要的決策上才能這樣做'], answer: 2, points: 2, isCore: true },
    { id: 'lq_15', dimension: 'decision', text: '「快思慢想（System 1 vs System 2，Kahneman）」對領導決策最重要的啟示是？', options: ['System 1（快思）永遠不可信賴', 'System 2（慢想）在所有決策中更有效率', 'System 1是快速、直覺、自動的思維（適合熟悉場景）；System 2是緩慢、刻意、分析的思維（適合複雜高風險場景）——高品質領導決策需要識別何時應激活System 2，而非讓直覺主導所有決策', '領導者應該只靠直覺，不需要刻意分析'], answer: 2, points: 2, isCore: true },
    { id: 'lq_16', dimension: 'decision', text: '數據驅動決策（Data-Driven Decision Making）的常見陷阱是？', options: ['使用數據讓決策更慢', '數據越多，決策品質一定越高', '「相關性不等於因果關係」和「確認偏誤的數據版」——選擇性呈現支持既有結論的數據、將相關關係錯誤解讀為因果，以及忽略數據盲點（無法量化的重要因素）', '數據驅動決策中，直覺完全沒有角色'], answer: 2, points: 3, isCore: true },

    // 授權能力 Q17-Q22
    { id: 'lq_17', dimension: 'delegation', text: '「微管理（Micromanagement）」對團隊的長期傷害是什麼？', options: ['微管理能確保每個細節都達到最高標準', '微管理讓主管感覺更有掌控力', '持續微管理會壓制成員的自主性和成長意願，傳遞「我不信任你」的訊號，導致人才流失、員工依賴性增加（凡事等待指令）以及主管本身的時間被低價值工作佔滿', '只有新員工需要微管理，資深員工不會受影響'], answer: 2, points: 2, isCore: true },
    { id: 'lq_18', dimension: 'delegation', text: '「授權（Delegation）」和「分配任務（Task Assignment）」的核心差異是？', options: ['兩者完全相同', '授權就是把所有工作都丟給別人做', '授權是將決策權力和完成工作的方法選擇一起轉移給被授權者，只要求結果和問責；分配任務是指定具體工作，但決策和方法仍由主管控制——真正的授權能培養能力，而任務分配只是使用能力', '授權只適合已經非常資深的員工'], answer: 2, points: 2, isCore: true },
    { id: 'lq_19', dimension: 'delegation', text: '「繼任計畫（Succession Planning）」對一線主管的重要性，最常被忽略的原因是？', options: ['繼任計畫只有CEO才需要考慮', '培養繼任者會讓自己的職位受到威脅', '主管往往擔心培養繼任者會讓自己「可被取代」，但實際上：無法被取代的主管反而被鎖在原位無法晉升；能培養接班人才是領導力成熟度的最高體現，也是組織願意給予更多責任的前提', '繼任計畫是HR部門的工作，主管不需要參與'], answer: 2, points: 3, isCore: true },
    { id: 'lq_20', dimension: 'delegation', text: '授權之後，成員做出了你不認同但不是錯誤的決策。最成熟的領導反應是？', options: ['立刻介入糾正，確保事情按自己的方式進行', '事後批評成員的決策方式', '接受不同的執行方式可能同樣有效甚至更好，除非有明確的錯誤或違反核心價值，否則讓結果說話——事後討論時聚焦在學習，而非告訴對方應該怎麼做', '完全忽視，等問題自己浮現'], answer: 2, points: 2, isCore: true },
    { id: 'lq_21', dimension: 'delegation', text: '「問責制（Accountability）」在健康的授權文化中，應如何運作？', options: ['問責就是在出問題時找人承擔責任', '問責讓成員不敢嘗試新事物', '問責是指在授權前共同清楚定義成功的樣子和追蹤機制，在過程中定期確認，在問題發生時共同解決——問責應是前瞻性的（防止問題）而非只是懲罰性的（問題後追責）', '問責應由HR系統自動處理，不是主管的日常工作'], answer: 2, points: 2, isCore: true },
    { id: 'lq_22', dimension: 'delegation', text: '團隊成員的「能力-意願矩陣（Skill-Will Matrix）」如何指導領導風格調整？', options: ['所有成員都應該用同樣的方式管理', '能力高的成員就不需要任何領導介入', '高能力高意願→授權（Delegate）；高能力低意願→激勵諮詢（Coach）；低能力高意願→指導教學（Guide）；低能力低意願→強力指示（Direct）——根據每個成員的當前狀態調整管理風格是情境式領導的核心', '能力矩陣只適合績效管理面談使用'], answer: 2, points: 3, isCore: true },

    // 衝突處理 Q23-Q28
    { id: 'lq_23', dimension: 'conflict', text: '「建設性衝突（Constructive Conflict）」和「破壞性衝突（Destructive Conflict）」的核心區別是？', options: ['建設性衝突不會讓人不舒服', '建設性衝突只在正式會議中發生', '建設性衝突聚焦在想法和方法的爭論，有助於更好的決策；破壞性衝突聚焦在人身攻擊和關係損害', '所有衝突都應該盡快平息，維持和諧'], answer: 2, points: 2, isCore: true },
    { id: 'lq_24', dimension: 'conflict', text: '兩位能力相當的資深成員因工作方式的根本差異長期衝突，已影響到團隊氛圍。最有效的主管介入策略是？', options: ['命令他們必須和解，否則其中一人必須離開', '偏向其中一方，讓另一方知道誰是對的', '完全不介入，成熟的人應該自己解決', '分別與兩人一對一深度了解各自的觀點和需求，找出衝突的根本原因（是方法差異、目標不一致還是過去的傷害？），再設計能讓雙方都能接受的共同工作架構，必要時引入中立的第三方調解'], answer: 3, points: 3, isCore: true },
    { id: 'lq_25', dimension: 'conflict', text: '「Thomas-Kilmann衝突模式（TKI）」的五種衝突應對方式中，哪種在長期最不利於組織健康？', options: ['競爭（Competing）——堅持自己的立場', '協作（Collaborating）——尋找雙贏解決方案', '迴避（Avoiding）——逃避衝突情境', '妥協（Compromising）——各退一步'], answer: 2, points: 2, isCore: true },
    { id: 'lq_26', dimension: 'conflict', text: '「困難對話（Difficult Conversation）」——如給予績效警告、告知裁員、處理嚴重錯誤——準備的核心原則是？', options: ['對話越快越簡短越好，避免情緒發酵', '困難對話應該通過Email進行，避免直接衝突', '準備具體的事實和行為記錄（非評斷），在私密安全的環境進行，開門見山說明目的（不拖延），給對方充分發言的機會，聚焦在未來行為而非人格評判', '先問HR部門可以說什麼，不可以說什麼，以法律保護自己'], answer: 2, points: 2, isCore: true },
    { id: 'lq_27', dimension: 'conflict', text: '你發現兩個部門之間存在長期的資源競爭和相互指責文化，作為他們的共同主管，最根本的解決策略是？', options: ['嚴厲懲罰兩邊的衝突當事人', '輪流給兩個部門更多資源', '重新設計激勵結構——確保兩個部門的關鍵績效指標（KPI）有共同的上層目標，讓他們的成功相互依賴，而非零和競爭；同時創造定期的跨部門協作機制', '讓兩個部門彼此競爭，用市場機制決定誰更有效率'], answer: 2, points: 3, isCore: true },
    { id: 'lq_28', dimension: 'conflict', text: '在衝突調解中「中立立場（Neutrality）」最重要的實踐要素是？', options: ['中立意味著主管不表達任何意見', '中立意味著平等分配時間給兩方', '中立意味著對過程負責（確保雙方能公平表達、不被打斷）而非對內容評判（不裁定誰對誰錯）——同時對自己的偏好有自我覺察，識別什麼情況讓自己傾向某一方', '中立意味著最終決定用投票'], answer: 2, points: 2, isCore: true },

    // 激勵技巧 Q29-Q34
    { id: 'lq_29', dimension: 'motivation', text: '「自我決定理論（Self-Determination Theory, Deci & Ryan）」識別的三個內在動機核心需求是？', options: ['薪資、福利、職位', '金錢、認可、晉升', '自主性（Autonomy）、勝任感（Competence）、歸屬感（Relatedness）——這三個心理需求的滿足是持續高品質工作動機的基礎，外在激勵（獎金）在長期可能反而削弱內在動機', '挑戰、規則、競爭'], answer: 2, points: 2, isCore: true },
    { id: 'lq_30', dimension: 'motivation', text: '「赫茨伯格雙因素理論（Two-Factor Theory）」對職場激勵最重要的洞察是？', options: ['薪資是最重要的激勵因素', '消除不滿意（衛生因素）不等於帶來滿意（激勵因素）', '好的工作環境就能激勵所有人', '晉升是唯一長效的激勵方式'], answer: 1, points: 2, isCore: true },
    { id: 'lq_31', dimension: 'motivation', text: '「個人化激勵（Individualized Motivation）」的核心挑戰和實踐方式是？', options: ['所有人對同樣的激勵方式都有相同的反應', '只需要了解每個人喜歡什麼食物和假日', '識別每個成員在不同時間點的核心需求和驅動力（有人被成長機會驅動、有人被工作生活平衡驅動、有人被認可驅動），並為其創造個人化的激勵環境——這需要持續的觀察和1:1的深入了解', '個人化激勵讓公平原則難以維持，不應採用'], answer: 2, points: 3, isCore: true },
    { id: 'lq_32', dimension: 'motivation', text: '「公開認可（Public Recognition）」的激勵效果，哪個了解最準確？', options: ['公開認可是最有效的激勵方式，應該對所有人使用', '公開認可只適合銷售型工作', '公開認可對多數人有強大激勵效果，但對部分人（特別是內向者或文化上不習慣被公開讚美的人）可能帶來壓力和尷尬——有效的認可需要了解個人偏好', '公開認可可能讓其他成員嫉妒，利多於弊'], answer: 2, points: 2, isCore: true },
    { id: 'lq_33', dimension: 'motivation', text: '「意義感（Meaning）」作為激勵來源，在現代職場中的實踐方式是？', options: ['意義感只在非營利或使命型組織中重要', '薪資夠高就能取代意義感', '幫助成員理解他們的工作如何連結到更大的目標（對客戶、對社會、對組織使命的影響），即使是看似重複的工作也可能有深刻的意義——這是領導者語言和框架的責任', '意義感是玄學，無法在職場中量化或應用'], answer: 2, points: 2, isCore: true },
    { id: 'lq_34', dimension: 'motivation', text: '「成長型思維（Growth Mindset, Carol Dweck）」的組織推廣，最有效的領導行為是？', options: ['要求所有成員閱讀Dweck的書', '在會議上宣告組織採用成長型思維', '公開分享自己的失敗和從中學到的東西，在他人犯錯時聚焦在「從這件事我們學到什麼」而非「是誰的錯」，並在績效評估中加入學習和嘗試新事物的維度', '每季給表現最好的成員更高的獎金'], answer: 2, points: 3, isCore: true },

    // 自我認知 Q35-Q41
    { id: 'lq_35', dimension: 'self_awareness', text: '「喬哈里窗（Johari Window）」對領導者自我認知的核心啟示是？', options: ['喬哈里窗顯示領導者需要隱藏更多資訊', '喬哈里窗說明領導者應該完全透明', '喬哈里窗的四個象限（開放區、盲點區、隱藏區、未知區）顯示：領導者的盲點區（自己看不見但他人看見的）是最重要的自我發展區域——需要主動建立回饋機制來照見盲點', '喬哈里窗是用來分析員工的工具，不適用於主管'], answer: 2, points: 2, isCore: true },
    { id: 'lq_36', dimension: 'self_awareness', text: '「情緒觸發器（Emotional Trigger）」在領導效能上的影響，最成熟的處理方式是？', options: ['壓抑所有情緒，在工作中保持完全理性', '展示情緒是展現真實性的重要方式，應完全表達', '識別自己的情緒觸發器（什麼情境讓你失去理性或過度反應），在被觸發前建立緩衝機制（如深呼吸、暫停、在回應前寫下初步反應而不發送），並事後對影響到的人承認', '完全依賴直覺，不需要管理情緒'], answer: 2, points: 3, isCore: true },
    { id: 'lq_37', dimension: 'self_awareness', text: '「過度自信（Overconfidence）」對高階領導者的特殊危害是？', options: ['過度自信讓領導者更有決斷力，是優點', '過度自信只影響技術能力較低的領導者', '職位越高，周圍的人越不願意指出錯誤，過度自信因此在高層更危險——領導者的過度自信可能讓整個組織走向錯誤的方向，且沒有人敢提出警示（「皇帝的新衣」效應）', '過度自信在競爭激烈的環境中是必要的生存技能'], answer: 2, points: 2, isCore: true },
    { id: 'lq_38', dimension: 'self_awareness', text: '「領導者的影響力盲點」——自己的行為對團隊造成的影響，哪個描述最準確？', options: ['領導者的行為只有在被大多數成員注意到時才有影響', '領導者的玩笑和評論在私下不影響團隊文化', '領導者的每個言行都被團隊放大解讀——一個隨口的評論可能被成員反覆回想、一個眼神可能影響一個人整天的心情——這種「放大效應」讓領導者必須比一般人更謹慎地管理自己的情緒表達', '只有正式宣告的決策才有影響力'], answer: 2, points: 2, isCore: true },
    { id: 'lq_39', dimension: 'self_awareness', text: '「執行教練（Executive Coaching）」在領導力發展中的獨特價值是什麼？', options: ['執行教練主要是心理諮商的替代品', '執行教練讓你不需要自己努力，讓教練告訴你怎麼做', '執行教練提供一個安全、保密的空間和一個不在你組織利益關係網絡中的視角，幫助你看見自己的模式和盲點——這是組織內的任何同事、下屬或上司都無法提供的', '執行教練只有在職業危機時才需要'], answer: 2, points: 3, isCore: true },
    { id: 'lq_40', dimension: 'self_awareness', text: '「領導疲勞（Leadership Fatigue）」和一般工作疲勞的核心差異是？', options: ['領導疲勞只是工作量太大的結果', '休假一週就能完全恢復領導疲勞', '領導疲勞往往源於持續地支撐他人的情緒（情緒勞動）、長期處於被觀察和判斷的壓力，以及做高難度決策的認知消耗——需要有意識地建立「回充（Recharge）」機制，而非只是減少工作量', '領導疲勞是性格軟弱的表現，應該被克服'], answer: 2, points: 2, isCore: true },
    { id: 'lq_41', dimension: 'self_awareness', text: '「領導力轉型（Leadership Identity Transition）」——從個人貢獻者晉升為管理者時，最困難的心理轉變是什麼？', options: ['學習管理預算和人事流程', '學習使用新的管理工具和系統', '從「靠自己的能力創造成果」轉型為「靠讓他人發揮能力創造成果」——這需要放棄用執行換取成就感，接受功勞屬於團隊，並在自己不會做某件事比下屬好的情況下仍能有效領導', '學會在公開場合做演講'], answer: 2, points: 3, isCore: true },
  ],

  personalityTypes: [
    { id: 'transformational', label: '變革型領導者',   icon: '🚀', desc: '你在六個維度上均保持高水準，且具備驅動組織文化轉型的能力。你不只解決眼前的問題，而是重新框架問題的定義。你最大的挑戰是確保改變的速度不超過組織的適應能力。這是測驗中頂端的10%。', minScore: 112, maxScore: 130 },
    { id: 'coaching',        label: '教練型領導者',   icon: '🎓', desc: '你最強的能力在於看見他人的潛能並幫助他們成長。你的團隊成員在你的帶領下通常表現超出自己的預期。持續加強決策的果斷性，讓你的教練能力有更強的組織影響力。', minScore: 95, maxScore: 111 },
    { id: 'achievement',     label: '成就導向型領導者', icon: '🏅', desc: '你有清晰的目標導向和執行力，能有效驅動團隊達成具體成果。你的挑戰在於確保「達成結果」的方式也創造了成員的長期成長，而非只是短期績效。', minScore: 78, maxScore: 94 },
    { id: 'relational',      label: '關係建構型領導者', icon: '🤝', desc: '你在建立信任和維護團隊關係上有天然的優勢。你的成員通常感到被支持。進一步加強決策果斷性和建設性衝突的管理能力，讓你的關係資本轉化為更強的執行力。', minScore: 62, maxScore: 77 },
    { id: 'directive',       label: '指令執行型領導者', icon: '📋', desc: '你擅長清晰地傳遞期望和確保任務的完成。進一步學習參與式領導和激勵技巧，能讓你從「讓人做事」進化到「讓人想做事」，大幅提升團隊的自主性和創新能力。', minScore: 46, maxScore: 61 },
    { id: 'learner',         label: '領導力學習者',   icon: '🌱', desc: '領導力是需要刻意練習的技能，不是天生的特質。你的自我認知和完成這份測驗的行動力，是成長的最佳起點。建議從溝通風格和授權能力開始，這兩個維度的改進能在最短時間內帶來最明顯的效果。', minScore: 0, maxScore: 45 },
  ],

  getBiasAnalysis: (scores) => {
    const comm = scores['communication']  ?? 0
    const dec  = scores['decision']       ?? 0
    const del  = scores['delegation']     ?? 0
    const conf = scores['conflict']       ?? 0
    const mot  = scores['motivation']     ?? 0
    const self = scores['self_awareness'] ?? 0
    const vals = [comm, dec, del, conf, mot, self]
    const minVal = Math.min(...vals)

    if (minVal >= 70) return {
      label: '全方位領導高手',
      desc: '你在六個領導維度都保持高水準，是罕見的全方位領導人才。你既能建立信任關係，又能做出高品質決策，並且具備深刻的自我認知。',
      immediate: ['建立正式的團隊發展計畫，讓成員也達到你的高標準', '主動接受更大範圍的組織挑戰，擴大你的影響力邊界', '開始建立你的領導力思想體系，分享你的洞察'],
      future: ['考慮成為其他主管的執行教練或導師', '帶領跨部門或跨組織的變革專案', '在行業中建立領導力思想領袖地位'],
    }

    if (comm >= 70 && del < 55) return {
      label: '溝通型領導者',
      desc: '你有強大的溝通和建立關係的能力，但在授權和放手讓團隊自主執行上還有很大的提升空間。你的溝通技巧是領導力的強大基礎，現在需要學習如何透過授權來乘以你的影響力。',
      immediate: ['本週選擇一件你一直親力親為的事，明確授權給一位有能力的成員', '與每位成員進行一次「能力意願」評估，識別可以立即授權的工作', '建立週報制度，讓你不需要直接介入也能掌握進度'],
      future: ['系統學習情境式領導理論（Hersey & Blanchard）', '培養至少一位能在你不在時獨立帶領團隊的人', '從微管理者轉型為策略導向的領導者'],
    }

    if (dec >= 70 && comm < 55) return {
      label: '分析型決策者',
      desc: '你有卓越的決策品質和分析能力，但在溝通和建立團隊關係上相對薄弱。強大的決策沒有有效的溝通是無法被執行的——你需要學習如何讓你的決策被理解和接受，而非只是被服從。',
      immediate: ['練習在宣布決策時說明「為什麼」，不只是「什麼」', '每天與一位成員進行非工作相關的簡短對話，建立關係資本', '下一次給回饋時，先詢問對方的感受和想法再表達你的觀點'],
      future: ['系統學習非暴力溝通（NVC）和教練式對話技巧', '建立定期1:1面談制度，深入了解每位成員的需求和挑戰', '學習如何在傳達困難決策時維護關係和心理安全感'],
    }

    if (del >= 70 && self < 55) return {
      label: '執行導向型主管',
      desc: '你擅長組織工作和授權執行，但在自我認知和反思上投入較少。缺乏自我認知的授權者可能在不知不覺中形成系統性的盲點，影響整個團隊的文化。',
      immediate: ['本月找一位你信任的同儕或上司，請他給你坦誠的360度回饋', '開始寫領導日記，每週記錄讓你情緒波動的事件和你的反應', '詢問你的團隊成員：「我有什麼習慣讓你們工作更困難了？」'],
      future: ['考慮與執行教練合作，建立有結構的自我反思系統', '進行正式的360度領導力評估，了解成員眼中的你', '培養冥想或正念練習，提升情緒自我覺察能力'],
    }

    if (conf >= 70 && mot < 55) return {
      label: '衝突調解型主管',
      desc: '你處理衝突的能力讓團隊在困難時期保持穩定，但在主動激勵和點燃成員熱情上還有很大的成長空間。能化解衝突是領導力的防守能力；激勵成員是進攻能力。',
      immediate: ['本週找出你團隊中動力最低的成員，進行一次深入的1:1了解其動機和期望', '開始使用SDT框架（自主性、勝任感、歸屬感）評估每位成員的需求', '為每位成員設計至少一個能讓他們感到「被看見」的認可方式'],
      future: ['深入學習內在激勵理論（Deci & Ryan）並應用到日常管理', '建立系統性的個人發展對話（IDP）制度', '學習如何把組織目標與個人意義感連結起來'],
    }

    return {
      label: '均衡發展中的領導者',
      desc: '你在各個維度都有一定的基礎，但尚未在任何一個領導能力上建立明顯的優勢。選擇對你當前角色最關鍵的1-2個維度深耕，往往比全面均衡提升帶來更大的實際效果。',
      immediate: ['找出你目前最常遇到的領導挑戰，聚焦從那個維度開始改善', '請你的直屬上司或一位信任的同儕給你一個「最需要改進的領導行為」的誠實回饋', '選定一個領導力書籍或課程，在接下來30天系統學習'],
      future: ['建立固定的領導力學習習慣（每週至少1小時）', '加入領導力社群或同儕學習圈，從他人的經驗中學習', '為自己設定明確的領導力發展目標，每季回顧進度'],
    }
  },

  painPoints: [
    { icon: '🤔', text: '你給了很多指示，但不確定團隊真的理解了你的期望嗎？' },
    { icon: '😟', text: '有成員表現持續不理想，但你不知道問題在他還是在你的管理方式？' },
    { icon: '🔍', text: '你知道自己有哪些領導盲點嗎？那些你不知道自己不知道的事？' },
  ],

  howItWorks: [
    { icon: '▶️', title: '選擇你的角色', desc: '一線主管、部門主管、C-Level 或 HR，測驗結果依角色個人化' },
    { icon: '📝', title: '完成六大維度測試', desc: '12分鐘，涵蓋溝通、決策、授權、衝突、激勵、自我認知六大核心領導能力' },
    { icon: '📊', title: '獲得個人化LQ領導力報告', desc: '即時獲得LQ指數與領導人格，解鎖12,000字個人化成長藍圖' },
  ],
}
