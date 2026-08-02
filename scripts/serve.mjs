import { createServer } from 'node:http'
import { readFile } from 'node:fs/promises'
import { extname, join, resolve, sep } from 'node:path'

const base = resolve(process.argv[2] || '.')
const types = { '.html':'text/html; charset=utf-8', '.js':'text/javascript; charset=utf-8', '.css':'text/css; charset=utf-8' }
const server = createServer(async (request, response) => {
  try {
    const pathname = decodeURIComponent(new URL(request.url || '/', 'http://localhost').pathname)
    if (pathname.startsWith('/api/')) {
      const name = pathname.slice(5).replace(/[^a-z]/g, '')
      const { default: handler } = await import(`../api/${name}.mjs`)
      let raw=''; for await (const chunk of request) raw+=chunk
      request.body=raw?JSON.parse(raw):{}
      response.status=(code)=>{ response.statusCode=code; return response }
      response.json=(value)=>{ response.setHeader('content-type','application/json'); response.end(JSON.stringify(value)) }
      response.send=(value)=>response.end(value)
      await handler(request,response); return
    }
    const requested = pathname === '/' ? 'index.html' : pathname.slice(1)
    const file = resolve(join(base, requested))
    if (file !== base && !file.startsWith(`${base}${sep}`)) throw new Error('Invalid path')
    const content = await readFile(file)
    response.writeHead(200, { 'Content-Type': types[extname(file)] || 'application/octet-stream', 'Cache-Control':'no-cache' }).end(content)
  } catch { response.writeHead(404, { 'Content-Type':'text/plain' }).end('Not found') }
})
const port = Number(process.env.PORT || 4173)
server.listen(port, '0.0.0.0', () => console.log(`Brand Blueprint running at http://localhost:${port}`))
