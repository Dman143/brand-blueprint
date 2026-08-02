import { execFileSync } from 'node:child_process'
import { cpSync, mkdirSync, rmSync } from 'node:fs'

rmSync('dist', { recursive: true, force: true })
mkdirSync('dist/src', { recursive: true })
execFileSync('tsc', ['--project', 'tsconfig.json'], { stdio: 'inherit' })
cpSync('index.html', 'dist/index.html')
cpSync('src/styles.css', 'dist/src/styles.css')
console.log('Production build created in dist/')
