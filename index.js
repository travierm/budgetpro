import { serve } from '@hono/node-server'
import app from './app.js'

const port = Number(process.env.PORT || 3000)
const server = serve({ fetch: app.fetch, hostname: '0.0.0.0', port }, () => {
  console.log(`BudgetPro listening on port ${port}`)
})

for (const signal of ['SIGINT', 'SIGTERM']) {
  process.once(signal, () => {
    server.close((error) => process.exit(error ? 1 : 0))
    setTimeout(() => process.exit(1), 10_000).unref()
  })
}
