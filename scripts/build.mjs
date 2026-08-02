import { cpSync } from 'node:fs'

cpSync('index.html', 'dist/index.html')
cpSync('src/styles.css', 'dist/src/styles.css')
console.log('Production build created in dist/')
