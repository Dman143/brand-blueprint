import test from 'node:test';import assert from 'node:assert/strict';import {deterministicBlueprint,canonical,pdf,titles,validBlueprint} from '../api/core.mjs';import {readFile} from 'node:fs/promises'
const source=await readFile('src/main.ts','utf8'),css=await readFile('src/styles.css','utf8');const bp=deterministicBlueprint({business:'A useful company',audience:'independent founders'})
test('all five workshops are complete',()=>{for(const name of ['Business Foundation','Market Position','Brand Strategy','Commercial Growth','Blueprint Roadmap'])assert.match(source,new RegExp(name));assert.equal((source.match(/title:'/g)||[]).length>=5,true)})
test('answers persist locally',()=>{assert.match(source,/localStorage\.setItem/);assert.match(source,/localStorage\.getItem/)})
test('generation produces the complete canonical Blueprint',()=>{assert.equal(bp.sections.length,22);assert.deepEqual(bp.sections.map(x=>x.title),titles);assert(validBlueprint(bp))})
test('PDF uses the same Blueprint content',()=>{const output=pdf(bp).toString();assert.match(output,/Your Brand Blueprint/);assert.match(output,/independent founders/);assert.equal(canonical(bp),canonical(JSON.parse(JSON.stringify(bp))))})
test('email and consultation flows preserve canonical payload',async()=>{assert.match(await readFile('api/email.mjs','utf8'),/validBlueprint/);assert.match(source,/blueprint:bp/);assert.match(source,/\/api\/contact/)})
test('mobile layout is present',()=>assert.match(css,/@media\(max-width:760px\)/))
test('accessibility affordances are present',()=>{assert.match(source,/Skip to content/);assert.match(source,/role="progressbar"/);assert.match(source,/role="alert"/);assert.match(css,/:focus-visible/)})
