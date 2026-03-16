export async function onRequest(context: any) {
  const url = new URL(context.request.url)
  const testId = url.searchParams.get('test') || 'aiiq'
  const testName = url.searchParams.get('name') || 'AI-IQ'
  const score = url.searchParams.get('score') || '?'
  const pct = url.searchParams.get('pct') || '?'
  const type = url.searchParams.get('type') || ''
  const icon = url.searchParams.get('icon') || '🧠'

  const siteUrl = 'https://iqai-5zv.pages.dev'
  const testUrl = `${siteUrl}/${testId}`

  const title = `${icon} 我的${testName}是 ${score} 分！超越了 ${pct}% 的受測者`
  const description = `能力類型：${type}。來測測你的分數會落在哪裡？免費測驗，即時獲得結果！`

  const html = `<!DOCTYPE html>
<html lang="zh-Hant">
<head>
  <meta charset="UTF-8" />
  <meta property="og:type" content="website" />
  <meta property="og:title" content="${esc(title)}" />
  <meta property="og:description" content="${esc(description)}" />
  <meta property="og:url" content="${testUrl}" />
  <meta property="og:locale" content="zh_TW" />
  <meta name="twitter:card" content="summary" />
  <meta name="twitter:title" content="${esc(title)}" />
  <meta name="twitter:description" content="${esc(description)}" />
  <title>${esc(title)}</title>
  <script>window.location.replace("${testUrl}")</script>
</head>
<body>
  <p>${esc(title)}</p>
  <p>${esc(description)}</p>
  <a href="${testUrl}">點此前往測驗 →</a>
</body>
</html>`

  return new Response(html, {
    headers: { 'content-type': 'text/html;charset=UTF-8' },
  })
}

function esc(s: string) {
  return s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}
