import { Hono } from 'hono'

const PORT = 3000;
const app = new Hono()

app.get('/up', async (c) => {
    return new Response('OK', {
        status: 200,
    })
})

app.get('/favicon.svg', async (c) => {
    return new Response(await Bun.file(`./dist/favicon.svg`).bytes(), {
        headers: {
            "Content-Type": "image/svg+xml",
        },
    })
})
app.get('/assets/*.js', async (c) => {
    return new Response(await Bun.file(`./dist/${c.req.path}`).bytes(), {
        headers: {
            "Content-Type": "application/javascript",
        },
    })
})

app.get('/assets/*.css', async (c) => {
    return new Response(await Bun.file(`./dist/${c.req.path}`).bytes(), {
        headers: {
            "Content-Type": "text/css",
        },
    })
})

app.get('/', async (c) => {
    return new Response(await Bun.file("./dist/index.html").bytes(), {
        headers: {
            "Content-Type": "text/html",
        },
    })
})

console.log(`BudgetPro server started http://localhost:${PORT}`);

export default {
    port: PORT,
    fetch: app.fetch,
} 