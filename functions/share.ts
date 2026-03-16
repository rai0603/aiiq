export async function onRequest(context: any) {
  try {
    const url = new URL(context.request.url)
    const testId = url.searchParams.get('test') || 'aiiq'
    const testName = url.searchParams.get('name') || 'AI-IQ'
    const score = url.searchParams.get('score') || '?'
    const pct = url.searchParams.get('pct') || '?'

    const siteUrl = 'https://iqai-5zv.pages.dev'
    const testUrl = `${siteUrl}/${testId}`
    const title = `我的${testName}是 ${score} 分！超越了 ${pct}% 的受測者`
    const description = `你的分數會落在哪裡？免費測驗，即時看結果！`

    const html = `<!DOCTYPE html>
<html lang="zh-Hant">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta property="og:type" content="website" />
  <meta property="og:title" content="${esc(title)}" />
  <meta property="og:description" content="${esc(description)}" />
  <meta property="og:locale" content="zh_TW" />
  <meta name="twitter:card" content="summary" />
  <meta name="twitter:title" content="${esc(title)}" />
  <meta name="twitter:description" content="${esc(description)}" />
  <title>${esc(title)}</title>
  <style>
    body { margin: 0; font-family: -apple-system, sans-serif; background: #05081a; color: white;
           display: flex; align-items: center; justify-content: center; min-height: 100vh; }
    .card { text-align: center; padding: 2rem; max-width: 480px; }
    h1 { font-size: 1.5rem; margin-bottom: 0.5rem; }
    p { color: #9ca3af; margin-bottom: 2rem; }
    a { display: inline-block; background: linear-gradient(135deg, #3b82f6, #8b5cf6);
        color: white; text-decoration: none; padding: 0.875rem 2rem;
        border-radius: 1rem; font-weight: 700; font-size: 1rem; }
  </style>
</head>
<body>
  <div class="card">
    <h1>${esc(title)}</h1>
    <p>${esc(description)}</p>
    <a href="${testUrl}">測測我的分數 →</a>
  </div>
</body>
</html>`

    return new Response(html, {
      headers: { 'content-type': 'text/html;charset=UTF-8' },
    })
  } catch {
    return new Response('Bad Request', { status: 400 })
  }
}

function esc(s: string) {
  return s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}
