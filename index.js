import { Hono } from 'hono'
import { getConnInfo } from 'hono/bun'
import { Database } from "bun:sqlite";

const PORT = process.env.PORT || 8080;
const app = new Hono({
    port: PORT,
})

const db = new Database("./db/db.sqlite", { create: true });
await db.exec(`CREATE TABLE IF NOT EXISTS requests (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    ip_address TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`)

function createRequest(ipAddress) {
    return db.query(`INSERT INTO requests (ip_address) VALUES ($value)`).run({
        $value: ipAddress
    });
}

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
    const info = await getConnInfo(c)
    await createRequest(info.remote.address)
    return new Response(await Bun.file("./dist/index.html").bytes(), {
        headers: {
            "Content-Type": "text/html",
        },
    })
})

console.log(`BudgetPro server started http://localhost:${PORT}`);

export default app;