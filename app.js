import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { Hono } from 'hono'
import { serveStatic } from '@hono/node-server/serve-static'

const root = fileURLToPath(new URL('./dist', import.meta.url))
// Fail startup if the production build is missing.
const index = readFileSync(`${root}/index.html`, 'utf8')
const app = new Hono()

app.get('/up', (c) => c.text('OK', 200, { 'Cache-Control': 'no-store' }))
app.use('*', async (c, next) => {
  c.header('X-Content-Type-Options', 'nosniff')
  await next()
})
app.use('*', serveStatic({ root }))
app.get('*', (c) => {
  // Missing assets must return 404 instead of an HTML document.
  if (c.req.path.startsWith('/assets/') || c.req.path.split('/').some((part) => part.includes('.'))) {
    return c.notFound()
  }
  c.header('Cache-Control', 'no-cache')
  return c.html(index)
})

export default app
