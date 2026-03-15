import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { supabase } from '../lib/supabase'
import type { TestResultRow } from '../lib/supabase'
import { TEST_MAP } from '../data/tests'

export default function DashboardPage() {
  const { user, loading } = useAuth()
  const { signOut } = useAuth()
  const navigate = useNavigate()
  const [results, setResults] = useState<TestResultRow[]>([])
  const [fetching, setFetching] = useState(true)

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth')
    }
  }, [user, loading, navigate])

  useEffect(() => {
    if (!user) return
    const fetchResults = async () => {
      const { data } = await supabase
        .from('test_results')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
      setResults(data ?? [])
      setFetching(false)
    }
    fetchResults()
  }, [user])

  if (loading || !user) return null

  const handleSignOut = async () => {
    await signOut()
    navigate('/')
  }

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return ''
    const d = new Date(dateStr)
    return d.toLocaleDateString('zh-TW', { year: 'numeric', month: 'short', day: 'numeric' })
  }

  return (
    <div className="min-h-screen bg-[#05081a] text-white">
      {/* NAV */}
      <nav className="flex items-center justify-between px-6 md:px-16 py-4 border-b border-white/5 bg-[#05081a]/80 backdrop-blur-md sticky top-0 z-50">
        <button
          onClick={() => navigate('/')}
          className="text-2xl font-black gradient-text tracking-tight"
        >
          IQ Suite
        </button>
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/')}
            className="text-sm text-gray-400 hover:text-white transition-colors hidden md:block"
          >
            首頁
          </button>
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-xs">
              {user.email?.[0].toUpperCase() ?? 'U'}
            </div>
            <span className="hidden md:block">{user.email}</span>
          </div>
          <button
            onClick={handleSignOut}
            className="text-sm text-gray-500 hover:text-red-400 transition-colors"
          >
            登出
          </button>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 py-12 space-y-8">
        {/* Header */}
        <div className="fade-in-up">
          <h1 className="text-3xl font-black mb-2">我的報告</h1>
          <p className="text-gray-400">查看你的所有測驗歷史記錄</p>
        </div>

        {/* Results */}
        {fetching ? (
          <div className="flex items-center justify-center py-20 text-gray-500">
            <svg className="animate-spin w-6 h-6 mr-3" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
            </svg>
            載入中...
          </div>
        ) : results.length === 0 ? (
          <div className="card-glass rounded-3xl p-12 text-center space-y-4">
            <div className="text-5xl">📊</div>
            <h2 className="text-xl font-bold">還沒有測驗記錄</h2>
            <p className="text-gray-400 text-sm">完成測驗後，你的結果會自動儲存在這裡</p>
            <button
              onClick={() => navigate('/')}
              className="btn-primary px-8 py-3 rounded-xl text-sm font-semibold text-white mt-4"
            >
              開始第一個測驗 →
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {results.map(r => {
              const testConfig = r.test_id ? TEST_MAP[r.test_id] : undefined
              return (
                <div
                  key={r.id}
                  onClick={() => navigate(`/${r.test_id}/result?recordId=${r.id}`)}
                  className="card-glass rounded-2xl p-5 flex flex-col gap-3 hover:border-white/20 transition-all duration-300 cursor-pointer group"
                >
                  {/* Header row */}
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        {testConfig && (
                          <span className="text-xl">{testConfig.icon}</span>
                        )}
                        <span className="font-semibold text-sm">
                          {testConfig?.name ?? r.test_id}
                        </span>
                      </div>
                      <div className="text-xs text-gray-500">{formatDate(r.created_at)}</div>
                    </div>
                    {r.unlocked ? (
                      <span className="text-xs px-2 py-1 rounded-full bg-green-500/15 text-green-400 border border-green-500/25 shrink-0">
                        已解鎖
                      </span>
                    ) : (
                      <span className="text-xs px-2 py-1 rounded-full bg-white/5 text-gray-500 border border-white/10 shrink-0">
                        基礎版
                      </span>
                    )}
                  </div>

                  {/* Score row */}
                  <div className="flex items-end gap-4">
                    <div>
                      <div className="text-3xl font-black gradient-text">{r.score}</div>
                      <div className="text-xs text-gray-500">{testConfig?.scoreLabel ?? '分數'}</div>
                    </div>
                    <div className="text-right ml-auto">
                      <div className="text-lg font-bold text-yellow-400">Top {100 - r.percentile}%</div>
                      <div className="text-xs text-gray-500">超越 {r.percentile}% 受測者</div>
                    </div>
                  </div>

                  {/* Personality type */}
                  {r.personality_type_id && testConfig && (
                    <div className="text-xs text-gray-400 bg-white/5 rounded-lg px-3 py-2">
                      {testConfig.personalityTypes.find(p => p.id === r.personality_type_id)?.icon}{' '}
                      {testConfig.personalityTypes.find(p => p.id === r.personality_type_id)?.label ?? r.personality_type_id}
                    </div>
                  )}

                  <div className="text-xs text-gray-600 group-hover:text-gray-400 transition-colors mt-auto">
                    查看報告 →
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* Back to home */}
        <div className="text-center pt-4">
          <button
            onClick={() => navigate('/')}
            className="text-sm text-gray-500 hover:text-gray-300 transition-colors"
          >
            ← 返回首頁，探索更多測驗
          </button>
        </div>
      </div>
    </div>
  )
}
