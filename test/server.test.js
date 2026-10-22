import assert from 'node:assert/strict'
import { after, before, test } from 'node:test'
import { readFileSync } from 'node:fs'
import { serve } from '@hono/node-server'
import app from '../app.js'

let server
let base
before(async () => {
  await new Promise((resolve) => {
    server = serve({ fetch: app.fetch, hostname: '127.0.0.1', port: 0 }, (info) => {
      base = `http://127.0.0.1:${info.port}`
      resolve()
    })
  })
})
after(() => new Promise((resolve) => server.close(resolve)))

test('readiness is explicit and uncached', async () => {
  const response = await fetch(`${base}/up`)
  assert.equal(response.status, 200)
  assert.equal(await response.text(), 'OK')
  assert.equal(response.headers.get('cache-control'), 'no-store')
})

test('serves the app and Vue history routes', async () => {
  for (const path of ['/', '/memory', '/about', '/1']) {
    const response = await fetch(base + path)
    assert.equal(response.status, 200)
    assert.match(response.headers.get('content-type'), /text\/html/)
    assert.match(await response.text(), /id="app"/)
  }
})

test('serves built JS, CSS, SVG and PNG assets with correct types', async () => {
  const html = readFileSync(new URL('../dist/index.html', import.meta.url), 'utf8')
  const assets = [...html.matchAll(/(?:src|href)="(\/assets\/[^" ]+)"/g)].map((match) => match[1])
  assert.ok(assets.some((path) => path.endsWith('.js')))
  assert.ok(assets.some((path) => path.endsWith('.css')))
  for (const path of [...assets, '/favicon.svg', '/budgetpro.png', '/banknote.png']) {
    const response = await fetch(base + path)
    assert.equal(response.status, 200)
    assert.doesNotMatch(response.headers.get('content-type'), /text\/html/)
    assert.equal(response.headers.get('x-content-type-options'), 'nosniff')
    assert.ok((await response.arrayBuffer()).byteLength > 0)
  }
  const head = await fetch(`${base}/budgetpro.png`, { method: 'HEAD' })
  assert.equal(head.status, 200)
  assert.equal(await head.text(), '')
})

test('missing assets and sensitive paths never return app HTML', async () => {
  for (const path of ['/assets/missing.js', '/missing.png', '/.env', '/package.json', '/%2e%2e%2fpackage.json', '/%252e%252e%252fpackage.json']) {
    const response = await fetch(base + path)
    assert.equal(response.status, 404, path)
    assert.doesNotMatch(await response.text(), /id="app"/)
  }
  assert.equal((await fetch(`${base}/about`, { method: 'POST' })).status, 404)
})
