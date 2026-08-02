export const titles=['Business Model','Market Position','Offer & Pricing','Growth Decision','90-Day Focus']

const clean=value=>String(value||'').replace(/\s+/g,' ').trim().slice(0,650)
const answer=(answers,key,fallback)=>clean(answers[key])||fallback
const has=(answers,key,pattern)=>pattern.test(answer(answers,key,''))
const sentence=value=>{const v=clean(value);return v&&!/[.!?]$/.test(v)?`${v}.`:v}
const section=(title,observation,insight,recommendation,immediateAction)=>({title,observation,insight,recommendation,immediateAction})

const detectPatterns=answers=>{
 const patterns=[]
 const audience=answer(answers,'best_customer','')
 const trust=answer(answers,'reason_to_trust','')
 const limit=answer(answers,'growth_limit','')
 const premium=has(answers,'business_type',/premium|consult/i)||has(answers,'known_for',/premium|best|leading|luxury/i)
 if(audience.length<28||/everyone|anyone|businesses|people|founders and|companies and/i.test(audience))patterns.push('The intended market is broader than the business can credibly lead at once.')
 if(trust.length<35||/quality|passion|care|experience|trust/i.test(trust)&&!/[0-9]|result|case|client|award|certif/i.test(trust))patterns.push('Credibility is asserted, but the proof needed to reduce buying risk is still thin.')
 if(/time|capacity|operation|system|delivery|team|admin|process/i.test(limit))patterns.push('Growth is constrained by operating capacity before it is constrained by demand.')
 if(!patterns.length)patterns.push('The answers are directionally coherent; the commercial advantage now needs to be made visible and repeatable.')
 return patterns
}

const recommendServices=(answers,patterns)=>{
 const services=[]
 if(patterns.some(x=>/market|position|premium ambition|commercial advantage/i.test(x))||has(answers,'commercial_priority',/demand|conversion|growth/i))services.push({name:'Positioning Intensive',reason:'To choose the most valuable audience, problem and commercial territory before more messaging is produced.'})
 if(patterns.some(x=>/proof|language|visible/i.test(x))||has(answers,'blueprint_job',/message|brand|website|communicat|position/i))services.push({name:'Brand Messaging System',reason:'To turn the chosen position into a clear promise, proof structure and sales language.'})
 if(patterns.some(x=>/operating|capacity|delivery/i.test(x))||has(answers,'growth_constraint',/delivery|founder/i))services.push({name:'Commercial Systems Sprint',reason:'To remove the operational constraint and align delivery capacity with the brand promise.'})
 if(has(answers,'offer_problem',/offer|price|value/i)||has(answers,'commercial_priority',/price|margin|customer/i))services.push({name:'Offer & Growth Advisory',reason:'To sharpen the offer, economics and route to higher-quality revenue.'})
 return services.slice(0,2).length?services.slice(0,2):[{name:'Quarterly Strategic Advisory',reason:'To maintain decision discipline while the 90-day priorities are implemented and evidenced.'}]
}

export function deterministicBlueprint(answers={}){
 const a=(key,fallback)=>answer(answers,key,fallback)
 const priority=a('commercial_priority','focused commercial growth'),constraint=a('growth_constraint','the main growth constraint')
 const patterns=[`${a('business_model','The business model')} is at the ${a('business_stage','current')} stage, with ${priority.toLowerCase()} as the immediate commercial priority.`,`${a('target_customer','The target customer')} buys when ${a('buying_trigger','a clear need emerges').toLowerCase()}; the strategy should meet that moment directly.`]
 const sections=[
  section(titles[0],`Model: ${a('business_model','Not yet defined')}. Stage: ${a('business_stage','Not yet defined')}. Founder goal: ${a('founder_goal','Not yet defined')}.`,`The plan must support the founder goal without depending on ${a('founder_constraint','unlimited resources').toLowerCase()}.`,`Build the next phase around ${a('founder_goal','a clear founder outcome').toLowerCase()}, not growth for its own sake.`,`Set one operating rule this week that protects that outcome.`),
  section(titles[1],`Primary buyer: ${a('target_customer','Not yet defined')}. Trigger: ${a('buying_trigger','Not yet defined')}.`,`The strongest position leads with the buying trigger and the decision factor: ${a('customer_priority','commercial value').toLowerCase()}.`,`Position the business for ${a('target_customer','the chosen buyer').toLowerCase()} at the moment when ${a('buying_trigger','the need becomes urgent').toLowerCase()}.`,`Rewrite the lead sales message around that trigger and test it in five conversations.`),
  section(titles[2],`Lead offer: ${a('core_offer','Not yet defined')}. Pricing: ${a('pricing_position','Not yet defined')}.`,`The current friction is ${a('offer_problem','unclear offer value').toLowerCase()}. It must be resolved before adding more promotion.`,`Make the lead offer easier to understand, value and buy; use ${a('customer_priority','buyer value').toLowerCase()} as the proof standard.`,`Put the offer, outcome, price logic and proof on one page. Remove anything that does not help the buying decision.`),
  section(titles[3],`Constraint: ${constraint}. Opportunity: ${a('growth_opportunity','Not yet defined')}.`,`The opportunity only works if it addresses the constraint rather than adding another initiative.`,`Prioritise ${a('growth_opportunity','the clearest growth opportunity').toLowerCase()} specifically to improve ${priority.toLowerCase()}.`,`Choose one commercial measure and run the smallest live test within 14 days.`),
  section(titles[4],`90-day result: ${a('ninety_day_result','Define one measurable result')}.`,`The plan must stay inside the stated constraint: ${a('founder_constraint','available founder capacity').toLowerCase()}. ${a('strategy_context','No additional context changes the direction.')}`,`Make every 90-day activity earn its place against this result: ${a('ninety_day_result','one measurable commercial result')}.`,`Name the owner, weekly measure and first deadline before starting new work.`)
 ]
 const topPriorities=[`Resolve ${a('offer_problem','the main offer problem').toLowerCase()}.`,`Act on ${a('growth_opportunity','the clearest growth opportunity').toLowerCase()}.`,`Measure progress against ${a('ninety_day_result','one 90-day commercial result').toLowerCase()}.`,`Build proof around ${a('customer_priority','the buyer’s priority').toLowerCase()}.`,`Remove work that does not improve ${priority.toLowerCase()}.`]
 return {title:'Your Founder Strategy',sections,patterns,strategicSummary:[`The commercial priority is ${priority.toLowerCase()}.`,`${constraint} is the issue to solve first.`, `Keep the next 90 days centred on ${a('ninety_day_result','one measurable result').toLowerCase()}.`],topPriorities,actionPlan:{weeks1to2:[topPriorities[0],`Define the buyer, trigger, lead offer and measure on one page.`],weeks3to6:[topPriorities[1],`Test the position and offer in live sales conversations.`],weeks7to12:[topPriorities[2],`Review conversion, customer quality and margin; keep only what worked.`]},recommendedServices:recommendServices(answers,patterns)}
}

export const canonical=bp=>JSON.stringify(bp)
const fields=['observation','insight','recommendation','immediateAction']
export function validBlueprint(bp){return Boolean(bp&&bp.title==='Your Founder Strategy'&&bp.sections?.length===5&&titles.every((t,i)=>bp.sections[i]?.title===t&&fields.every(k=>typeof bp.sections[i][k]==='string'&&bp.sections[i][k].trim()))&&bp.patterns?.length&&bp.strategicSummary?.length===3&&bp.topPriorities?.length===5&&bp.actionPlan&&['weeks1to2','weeks3to6','weeks7to12'].every(k=>bp.actionPlan[k]?.length)&&bp.recommendedServices?.length>0&&bp.recommendedServices.length<=2)}

export async function generate(answers){
 const fallback=deterministicBlueprint(answers)
 if(process.env.OPENAI_API_KEY)try{const response=await fetch('https://api.openai.com/v1/responses',{method:'POST',headers:{authorization:`Bearer ${process.env.OPENAI_API_KEY}`,'content-type':'application/json'},signal:AbortSignal.timeout(25000),body:JSON.stringify({model:process.env.OPENAI_MODEL||'gpt-5-mini',input:`You are Daniel, a commercially rigorous founder strategist. Analyse all 15 answers together. Interpret; never repeat or praise them. Identify contradictions, assumptions, leverage, proof gaps and operating constraints. Write directly, naturally and specifically—never mention AI. Return JSON matching this exact fallback shape. Preserve titles, keep exactly five ranked priorities, three summary paragraphs, no more than two genuinely relevant services, and connect the action plan to the analysis. Answers: ${JSON.stringify(answers)}\nRequired shape and grounded fallback: ${JSON.stringify(fallback)}`,text:{format:{type:'json_schema',name:'strategy_blueprint',strict:true,schema:blueprintSchema}}})});if(response.ok){const candidate=JSON.parse((await response.json()).output_text);if(validBlueprint(candidate))return candidate}}catch{}
 return fallback
}

const string={type:'string',minLength:1},stringList={type:'array',minItems:1,items:string}
const blueprintSchema={type:'object',additionalProperties:false,required:['title','sections','patterns','strategicSummary','topPriorities','actionPlan','recommendedServices'],properties:{title:{type:'string',const:'Your Founder Strategy'},sections:{type:'array',minItems:5,maxItems:5,items:{type:'object',additionalProperties:false,required:['title',...fields],properties:{title:string,...Object.fromEntries(fields.map(k=>[k,string]))}}},patterns:stringList,strategicSummary:{type:'array',minItems:3,maxItems:3,items:string},topPriorities:{type:'array',minItems:5,maxItems:5,items:string},actionPlan:{type:'object',additionalProperties:false,required:['weeks1to2','weeks3to6','weeks7to12'],properties:{weeks1to2:stringList,weeks3to6:stringList,weeks7to12:stringList}},recommendedServices:{type:'array',minItems:1,maxItems:2,items:{type:'object',additionalProperties:false,required:['name','reason'],properties:{name:string,reason:string}}}}}

const pdfEscape=s=>String(s).replace(/[‘’]/g,"'").replace(/[–—]/g,'-').replace(/[\\()]/g,'\\$&').replace(/[^\x20-\x7E]/g,'')
const wrap=(value,width)=>{const lines=[];let line='';for(const word of pdfEscape(value).split(/\s+/)){if(`${line} ${word}`.trim().length>width&&line){lines.push(line);line=word}else line=`${line} ${word}`.trim()}if(line)lines.push(line);return lines}
export function pdf(bp){
 const pages=[],text=(font,size,x,y,value,color='0.12 0.16 0.14')=>`${color} rg BT /${font} ${size} Tf ${x} ${y} Td (${pdfEscape(value)}) Tj ET\n`,rule=y=>`.78 .75 .69 RG 48 ${y} m 564 ${y} l S\n`,page=(title,items)=>{let y=720,s=text('F2',27,48,y,title);y-=42;for(const [label,value] of items){s+=text('F1',8,48,y,label,'.62 .46 .27');y-=20;for(const line of wrap(value,82)){s+=text('F1',10,48,y,line,'.25 .30 .27');y-=15}y-=16}return s}
 pages.push('0.09 0.25 0.21 rg 0 0 612 792 re f\n'+text('F1',8,48,720,'BRAND BLUEPRINT / PRIVATE STRATEGY DOCUMENT','0.82 0.66 0.44')+text('F2',42,48,585,bp.title,'1 1 1')+text('F1',8,48,70,'DANIEL / 2026','0.82 0.66 0.44'))
 for(const s of bp.sections)pages.push(page(s.title,[['OBSERVATION',s.observation],['INSIGHT',s.insight],['RECOMMENDATION',s.recommendation],['IMMEDIATE ACTION',s.immediateAction]]))
 pages.push(page("Daniel's Strategic Summary",[['DANIEL',bp.strategicSummary.join(' ')],['TOP 5 PRIORITIES',bp.topPriorities.map((x,i)=>`${i+1}. ${x}`).join(' ')]]))
 pages.push(page('90-Day Action Plan',[['WEEKS 1-2',bp.actionPlan.weeks1to2.join(' ')],['WEEKS 3-6',bp.actionPlan.weeks3to6.join(' ')],['WEEKS 7-12',bp.actionPlan.weeks7to12.join(' ')],['RECOMMENDED SERVICES',bp.recommendedServices.map(x=>`${x.name}: ${x.reason}`).join(' ')]]))
 const pageStart=3,contentStart=pageStart+pages.length,fontRegular=contentStart+pages.length,fontDisplay=fontRegular+1,objects=[null,'<< /Type /Catalog /Pages 2 0 R >>',`<< /Type /Pages /Kids [${pages.map((_,i)=>`${pageStart+i} 0 R`).join(' ')}] /Count ${pages.length} >>`];for(let i=0;i<pages.length;i++)objects.push(`<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 ${fontRegular} 0 R /F2 ${fontDisplay} 0 R >> >> /Contents ${contentStart+i} 0 R >>`);for(const stream of pages)objects.push(`<< /Length ${Buffer.byteLength(stream)} >>\nstream\n${stream}endstream`);objects.push('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>','<< /Type /Font /Subtype /Type1 /BaseFont /Times-Roman >>');let out='%PDF-1.4\n',offset=[0];for(let i=1;i<objects.length;i++){offset[i]=Buffer.byteLength(out);out+=`${i} 0 obj\n${objects[i]}\nendobj\n`}const x=Buffer.byteLength(out);out+=`xref\n0 ${objects.length}\n0000000000 65535 f \n${offset.slice(1).map(n=>String(n).padStart(10,'0')+' 00000 n ').join('\n')}\ntrailer << /Size ${objects.length} /Root 1 0 R >>\nstartxref\n${x}\n%%EOF`;return Buffer.from(out)
}
