export const onRequest: PagesFunction = (context) => {
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
  const description = `能力類型：${type}。你的分數會落在哪裡？免費測驗，即時獲得結果！`

  const html = `<!DOCTYPE html>
<html lang="zh-Hant">
<head>
  <meta charset="UTF-8" />
  <meta property="og:type" content="website" />
  <meta property="og:title" content="${escapeHtml(title)}" />
  <meta property="og:description" content="${escapeHtml(description)}" />
  <meta property="og:url" content="${testUrl}" />
  <meta property="og:image" content="${siteUrl}/og-image.png" />
  <meta property="og:locale" content="zh_TW" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${escapeHtml(title)}" />
  <meta name="twitter:description" content="${escapeHtml(description)}" />
  <meta name="twitter:image" content="${siteUrl}/og-image.png" />
  <meta http-equiv="refresh" content="0;url=${testUrl}" />
  <title>${escapeHtml(title)}</title>
</head>
<body>
  <p>正在跳轉...</p>
  <a href="${testUrl}">點此前往測驗</a>
</body>
</html>`

  return new Response(html, {
    headers: { 'content-type': 'text/html;charset=UTF-8' },
  })
}

function escapeHtml(s: string) {
  return s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}
