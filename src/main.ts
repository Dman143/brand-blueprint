type Question = { prompt: string; note: string; options?: string[]; placeholder?: string }
type Workshop = { title: string; focus: string; introduction: string; questions: Question[] }

const workshops: Workshop[] = [
  { title: 'Business Foundation', focus: 'Clarity & viability', introduction: 'Before we think about branding, I want to understand the business beneath it. A clear foundation gives every decision that follows a reason.', questions: [
    { prompt: 'In one sentence, what business are you truly building?', note: 'Avoid describing the product alone. Tell me the change you want this business to create.', placeholder: 'We help…' },
    { prompt: 'How confident are you that people will pay for this offer?', note: 'Commercial confidence should come from evidence, not optimism.', options: ['Still an assumption', 'Some encouraging signals', 'Validated by paying customers', 'Proven and repeatable'] },
  ]},
  { title: 'Market Position', focus: 'Audience & advantage', introduction: 'Strong businesses are not for everyone. Here we will sharpen who matters most, the problem they urgently need solved, and why they should choose you.', questions: [
    { prompt: 'Who is the one customer you most want to win?', note: 'Specificity creates relevance. Describe a person, moment or business stage—not a broad demographic.', placeholder: 'Our best-fit customer is…' },
    { prompt: 'What painful problem are they already trying to solve?', note: 'The strongest propositions connect to a problem your customer already recognises.', placeholder: 'They are frustrated by…' },
    { prompt: 'What can you credibly offer that alternatives cannot?', note: 'Think beyond features: your method, experience, point of view or way of delivering may be the advantage.', placeholder: 'Unlike the alternatives, we…' },
  ]},
  { title: 'Brand Strategy', focus: 'Positioning & meaning', introduction: 'Your brand should make the right promise to the right people. This workshop turns what makes the business valuable into a position people can understand and remember.', questions: [
    { prompt: 'What do you want to be known for?', note: 'Choose the reputation that would make the greatest commercial difference over the next three years.', placeholder: 'We want to be known as…' },
    { prompt: 'How clearly can you explain why your offer is worth its price?', note: 'Pricing confidence is often a signal of positioning clarity.', options: ['I struggle to justify it', 'I rely on comparisons', 'I can explain the value', 'Customers readily see the value'] },
  ]},
  { title: 'Commercial Growth', focus: 'Marketing & sales', introduction: 'A good brand has to perform in the real world. I want to see how confidently you create demand, lead a sales conversation, and turn attention into revenue.', questions: [
    { prompt: 'How reliably can you reach the right people?', note: 'Consider whether your marketing creates a consistent flow of relevant opportunities.', options: ['No reliable channel yet', 'Inconsistent activity', 'One channel works', 'A repeatable system works'] },
    { prompt: 'How confident are you when asking for the sale?', note: 'Be honest here. A strong proposition still needs a confident commercial conversation.', options: ['I avoid selling', 'It feels inconsistent', 'I have a clear process', 'I sell with confidence'] },
  ]},
  { title: 'Blueprint Roadmap', focus: 'Readiness & direction', introduction: 'The final step is about making the ambition executable. We will identify what the business can support now and where your focus should go next.', questions: [
    { prompt: 'Could the business deliver well if demand doubled next month?', note: 'Growth exposes weak systems. Think about capacity, process, people and customer experience.', options: ['Not without disruption', 'With significant strain', 'Mostly, with adjustments', 'Yes, confidently'] },
    { prompt: 'What should this business make possible in five years?', note: 'Your long-term vision gives us a filter for the opportunities worth pursuing now.', placeholder: 'In five years, the business will…' },
  ]},
]

const totalQuestions = workshops.reduce((sum, workshop) => sum + workshop.questions.length, 0)
const rootElement = document.querySelector<HTMLDivElement>('#root')
if (!rootElement) throw new Error('Application root was not found')
const root: HTMLDivElement = rootElement
let workshopIndex = 0
let questionIndex = 0
let answers: string[] = []

const mark = `<span class="logo-mark">DB</span>`
const escapeHtml = (value: string) => value.replace(/[&<>'"]/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' })[character] || character)
const shell = (content: string, compact = false) => `<div class="app-shell"><header class="site-header"><a class="logo" data-home href="#">${mark}<span>Brand Blueprint</span></a><div class="founder-signoff"><span>Guided personally by</span><strong>Daniel Band</strong></div></header><main class="${compact ? 'session-main' : ''}">${content}</main><footer><div>${mark}<strong>Daniel Band</strong><span>Founder & Brand Strategist</span></div><p>Thoughtful businesses are built with clarity.</p><small>© 2026 Brand Blueprint</small></footer></div>`

function home() {
  root.innerHTML = shell(`<section class="hero"><div class="hero-copy"><span class="eyebrow">A FOUNDER-LED BUSINESS REVIEW</span><h1>Let’s build a business<br><em>worth believing in.</em></h1><p>I’ve designed Brand Blueprint to feel like the first conversation I have with every ambitious founder: honest, commercially focused and centred on what will make your business matter.</p><div class="hero-actions"><button class="primary" data-start>Start your private review <span>→</span></button><span>5 workshops · approximately 12 minutes</span></div></div><aside class="daniel-note"><span class="portrait">DB</span><blockquote>“I’ll ask the questions I use in my own consulting work, then turn your answers into a clear strategic direction.”</blockquote><strong>Daniel Band</strong><small>Founder, Brand Blueprint</small></aside></section>
  <section class="workshops"><div class="section-intro"><span class="eyebrow">YOUR CONSULTING JOURNEY</span><h2>Five focused conversations.<br>One clearer business.</h2><p>This is not a scorecard. It is a structured pause to see your business clearly and decide what deserves your attention.</p></div><div class="workshop-list">${workshops.map((w, i) => `<article><span>0${i + 1}</span><div><h3>${w.title}</h3><p>${w.focus}</p></div><small>${w.questions.length} questions</small></article>`).join('')}</div></section>
  <section class="promise"><span>MY PROMISE TO YOU</span><p>You won’t receive a generic score. You’ll leave with a considered view of your opportunity, your blind spots and the next decisions I believe will move the business forward.</p><button class="text-link" data-start>Begin the conversation →</button></section>`)
  bindHome()
}

function bindHome() {
  document.querySelectorAll('[data-start]').forEach(el => el.addEventListener('click', start))
  document.querySelector('[data-home]')?.addEventListener('click', (e) => { e.preventDefault(); home() })
}

function start() { workshopIndex = 0; questionIndex = 0; answers = []; renderQuestion() }
function absoluteQuestion() { return workshops.slice(0, workshopIndex).reduce((n, w) => n + w.questions.length, 0) + questionIndex }

function renderQuestion() {
  const workshop = workshops[workshopIndex]
  const question = workshop.questions[questionIndex]
  const current = absoluteQuestion()
  const field = question.options
    ? `<div class="options">${question.options.map((option, i) => `<button data-answer="${option}"><span>${String.fromCharCode(65 + i)}</span>${option}</button>`).join('')}</div>`
    : `<div class="written-answer"><textarea rows="4" maxlength="400" placeholder="${question.placeholder}"></textarea><span>Take your time. A few honest sentences are enough.</span></div>`
  root.innerHTML = shell(`<div class="session-top"><button class="back" data-back>← <span>Back</span></button><div class="session-progress"><div><span>WORKSHOP ${workshopIndex + 1} OF 5</span><strong>${workshop.title}</strong></div><div class="progress-track"><i style="width:${(current / totalQuestions) * 100}%"></i></div><small>${current + 1} / ${totalQuestions}</small></div><button class="save" data-home>Exit review</button></div>
  <section class="question-layout"><aside class="founder-intro"><span class="mini-portrait">DB</span><span class="eyebrow">A NOTE FROM DANIEL</span><p>${workshop.introduction}</p><small>Daniel Band · Founder</small></aside><div class="question-panel"><span class="question-count">QUESTION ${questionIndex + 1} · ${workshop.focus.toUpperCase()}</span><h1>${question.prompt}</h1><p class="strategist-note"><strong>My perspective</strong>${question.note}</p>${field}<button class="primary continue" data-next ${question.options ? 'hidden' : ''}>Continue <span>→</span></button></div></section>`, true)
  document.querySelectorAll<HTMLElement>('[data-answer]').forEach(button => button.addEventListener('click', () => { document.querySelectorAll('[data-answer]').forEach(x => x.classList.remove('selected')); button.classList.add('selected'); window.setTimeout(() => next(button.dataset.answer || ''), 220) }))
  document.querySelector('[data-next]')?.addEventListener('click', () => { const value = document.querySelector<HTMLTextAreaElement>('textarea')?.value.trim(); if (value) next(value); else document.querySelector('textarea')?.classList.add('invalid') })
  document.querySelector('[data-back]')?.addEventListener('click', back)
  document.querySelector('[data-home]')?.addEventListener('click', home)
}

function next(value: string) {
  answers[absoluteQuestion()] = value
  if (questionIndex < workshops[workshopIndex].questions.length - 1) questionIndex++
  else if (workshopIndex < workshops.length - 1) { workshopIndex++; questionIndex = 0 }
  else { renderResults(); return }
  renderQuestion()
}
function back() {
  if (questionIndex > 0) questionIndex--
  else if (workshopIndex > 0) { workshopIndex--; questionIndex = workshops[workshopIndex].questions.length - 1 }
  else { home(); return }
  renderQuestion()
}

function renderResults() {
  const business = escapeHtml(answers[0] || 'your business')
  const audience = escapeHtml(answers[2] || 'your highest-value audience')
  root.innerHTML = shell(`<section class="results-hero"><span class="eyebrow">YOUR STRATEGIC REVIEW</span><h1>My view of<br>your business.</h1><p>Thank you for answering candidly. I’ve looked across the whole picture—not just the brand, but the commercial foundation that has to support it.</p><div class="reviewer"><span class="portrait">DB</span><div><strong>Prepared by Daniel Band</strong><small>Founder & Brand Strategist</small></div></div></section>
  <section class="report"><article class="executive"><span>01 · EXECUTIVE SUMMARY</span><h2>You have the ingredients of a valuable business. The next step is turning them into a sharper, more ownable proposition.</h2><p>Your ambition—“${business}”—gives the brand a meaningful direction. My priority would be connecting that ambition more explicitly to what ${audience} values, then building a commercial story your marketing and sales can repeat with confidence.</p></article>
  <div class="insight-grid"><article><span>02 · BIGGEST OPPORTUNITY</span><h3>Own a more specific position</h3><p>Your strongest growth opportunity is to become unmistakably relevant to one valuable audience. A tighter position will make the offer easier to understand, price and recommend.</p></article><article class="warm"><span>03 · BIGGEST BLIND SPOT</span><h3>Proof needs to match the promise</h3><p>The business has conviction, but the evidence behind its differentiation needs strengthening. Turn customer outcomes into visible proof before investing heavily in reach.</p></article></div>
  <article class="priorities"><span>04 · IMMEDIATE PRIORITIES</span><h2>What I would focus on next</h2><ol><li><b>01</b><div><strong>Clarify the core proposition</strong><p>Express who you serve, the painful problem you solve and why your approach is meaningfully different.</p></div></li><li><b>02</b><div><strong>Build a value-led sales story</strong><p>Connect your pricing to outcomes and give every sales conversation a consistent, confident structure.</p></div></li><li><b>03</b><div><strong>Create evidence before volume</strong><p>Capture customer language, outcomes and proof; use these to shape the message before scaling marketing.</p></div></li></ol></article>
  <div class="long-term"><span>05 · LONG-TERM RECOMMENDATIONS</span><h2>Build for the business you intend to become.</h2><p>Over the next 12–24 months, create a distinctive brand system around your strongest commercial truth, establish one dependable route to market, and document the delivery standards that protect the customer experience as you grow.</p></div>
  <section class="services"><div><span>HOW I CAN HELP</span><h2>Suggested Brand Blueprint services</h2><p>Based on your answers, these are the ways I believe we could create the greatest value together.</p></div><div class="service-list"><article><small>RECOMMENDED</small><h3>Positioning Intensive</h3><p>A focused founder session to sharpen your audience, advantage and value proposition.</p><a href="mailto:daniel@brandblueprint.co">Discuss this with Daniel →</a></article><article><h3>Brand Blueprint Partnership</h3><p>Strategy, identity and commercial messaging built as one coherent system.</p><a href="mailto:daniel@brandblueprint.co">Explore the partnership →</a></article></div></section>
  <div class="final-note"><span class="portrait">DB</span><div><p>“A blueprint only becomes valuable when you act on it. Start with the first priority, make it real, and let that clarity compound.”</p><strong>Daniel</strong></div><button class="outline" onclick="window.print()">Download review</button></div></section>`)
  document.querySelector('[data-home]')?.addEventListener('click', (e) => { e.preventDefault(); home() })
}

home()
