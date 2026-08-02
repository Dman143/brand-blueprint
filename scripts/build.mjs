import { execFileSync } from 'node:child_process'
import { cpSync, existsSync, mkdirSync, readFileSync, rmSync } from 'node:fs'

rmSync('dist', { recursive: true, force: true })
mkdirSync('dist/assets', { recursive: true })
execFileSync('tsc', ['--project', 'tsconfig.json'], { stdio: 'inherit' })
cpSync('index.html', 'dist/index.html')
cpSync('src/styles.css', 'dist/assets/styles.css')

const html = readFileSync('dist/index.html', 'utf8')
for (const asset of ['/assets/main.js', '/assets/styles.css']) {
  if (!html.includes(asset) || !existsSync(`dist${asset}`)) {
    throw new Error(`Production asset is missing or unreferenced: ${asset}`)
  }
}
console.log('Production build created in dist/')
