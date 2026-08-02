type Question = { prompt: string; note: string; options?: string[]; placeholder?: string; encouragement?: string }
type Workshop = { title: string; focus: string; introduction: string; questions: Question[] }

const workshops: Workshop[] = [
  { title: 'Business Foundation', focus: 'Clarity & viability', introduction: 'I’m looking for the commercial truth beneath the idea: what you are really building, and what the market has shown you so far. There is no polished answer to perform here—just give me the honest founder’s view.', questions: [
    { prompt: 'Let’s start with the big picture: what are you really building here?', note: 'Talk to me as you would across a table. Go beyond the product and tell me who it helps, what changes for them, and why that matters to you.', placeholder: 'I’m building a business that…', encouragement: 'Don’t worry about making it sound like a pitch. Clarity matters more than polish.' },
    { prompt: 'Now, what has convinced you that people will actually pay for it?', note: 'I’m not looking for certainty. Choose the answer closest to the evidence you have today—from an informed hunch to customers buying repeatedly.', options: ['It’s still an informed hunch', 'People have shown real interest', 'Customers have already paid', 'Demand is proven and repeatable'], encouragement: 'Honesty here gives us something useful to build from.' },
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
const shell = (content: string, compact = false) => `<div class="app-shell"><header class="site-header"><a class="logo" data-home href="#">${mark}<span>Brand Blueprint</span></a><div class="founder-signoff"><span>Created and guided by</span><strong>Daniel Band</strong></div></header><main class="${compact ? 'session-main' : ''}">${content}</main><footer><div>${mark}<strong>Daniel Band</strong><span>Founder, Brand Blueprint</span></div><p>Think clearly. Build meaningfully. Grow commercially.</p><small>© 2026 Brand Blueprint</small></footer></div>`

function home() {
  root.innerHTML = shell(`<section class="hero"><div class="hero-copy reveal"><span class="eyebrow">FOUNDER-LED BUSINESS & BRAND STRATEGY</span><h1>Build the business<br><em>before the brand.</em></h1><p class="hero-lead">A private strategic review for ambitious founders who want a sharper proposition, a more valuable brand and the confidence to grow with intent.</p><div class="hero-actions"><button class="primary premium-cta" data-start><span>Start Your Blueprint</span><i>↗</i></button><span>Free · confidential · 12 minutes</span></div><a class="hero-scroll" href="#approach">Explore the approach <i>↓</i></a></div><aside class="hero-principle reveal"><div class="principle-top"><span class="principle-number">D / 01</span><span>Founder’s principle</span></div><p>“A beautiful identity cannot rescue an unclear business.”</p><div><span class="portrait">DB</span><span><strong>Daniel Band</strong><small>Founder & commercial strategist</small></span></div></aside></section>
  <section class="strategy-first"><div class="strategy-heading reveal"><span class="eyebrow">STRATEGY BEFORE BRANDING</span><h2>Your brand should be the<br>result of clear thinking.</h2></div><div class="strategy-copy reveal"><p>Most branding begins with how a business should look. I start with why it should exist, who it is for and how it will win.</p><p>When those answers are clear, naming becomes sharper, design becomes more meaningful and growth becomes far less dependent on guesswork.</p><strong>Clarity first. Expression second.</strong></div></section>
  <section class="about"><div class="about-label reveal"><span class="eyebrow">ABOUT DANIEL</span><div class="founder-monogram"><span>DB</span><small>Independent<br>since day one</small></div></div><div class="about-story reveal"><span class="chapter">02 / FOUNDER TO FOUNDER</span><h2>I’m not here to sell you a rebrand. I’m here to help you build a stronger business.</h2><div class="about-columns"><p><strong>I’m Daniel Band.</strong> I’ve spent my career building businesses, shaping propositions and turning ideas into commercial opportunities. I know the weight of the decisions founders face because I have made them myself.</p><p>Brand Blueprint distils that experience into a practical way to think. No agency theatre. No borrowed playbook. Just honest questions, commercial perspective and a clear route forward.</p></div><div class="founder-signature"><span class="signature">Daniel Band</span><small>Founder, Brand Blueprint</small></div></div></section>
  <section class="blueprint" id="approach"><div class="blueprint-intro reveal"><span class="eyebrow">THE BRAND BLUEPRINT</span><h2>Three disciplines.<br>One coherent business.</h2><p>A brand is not a layer added at the end. It is the connection between what you believe, what you build and how you grow.</p></div><div class="blueprint-steps">
    <article class="reveal"><span>01</span><div><small>THINK</small><h3>Find the truth worth building around.</h3><p>Clarify the opportunity, customer, position and commercial logic. Decide what the business stands for—and what it will not be.</p><b>Position · Proposition · Purpose</b></div></article>
    <article class="reveal"><span>02</span><div><small>IMPLEMENT</small><h3>Turn strategy into something real.</h3><p>Translate clear thinking into your name, message, offer, identity and customer experience so every choice works together.</p><b>Naming · Identity · Experience</b></div></article>
    <article class="reveal"><span>03</span><div><small>GROW</small><h3>Build momentum with intent.</h3><p>Use the brand to guide sales, partnerships, licensing and negotiation—creating value without losing what made the business matter.</p><b>Sales · Partnerships · Value</b></div></article>
  </div></section>
  <section class="experience"><div class="experience-heading reveal"><span class="eyebrow">FOUNDER EXPERIENCE</span><h2>Advice shaped by doing,<br>not just advising.</h2><p>My perspective comes from the practical work of moving businesses forward: finding the opportunity, making the case and getting the deal done.</p><blockquote>“The best strategy is commercially aware, creatively ambitious and simple enough to act on.”</blockquote></div><div class="experience-list reveal"><div><span>01</span><strong>Building businesses</strong><small>From first idea to commercial reality</small></div><div><span>02</span><strong>Creating value</strong><small>Positioning, naming and brand strategy</small></div><div><span>03</span><strong>Making deals</strong><small>Licensing, partnerships and negotiation</small></div><div><span>04</span><strong>Finding growth</strong><small>Propositions, sales and domain strategy</small></div></div></section>
  <section class="faq"><div class="faq-intro reveal"><span class="eyebrow">COMMON QUESTIONS</span><h2>Before you begin.</h2><p>A few straight answers about the Blueprint and what happens next.</p></div><div class="faq-list reveal">
    <details><summary><span>01</span>What is the Brand Blueprint?<i>+</i></summary><p>A guided strategic review built around the questions I use with founders. It helps you see the commercial foundations beneath your brand and identify where greater clarity will create value.</p></details>
    <details><summary><span>02</span>Is this really free?<i>+</i></summary><p>Yes. The review is free, private and designed to be useful in its own right. If there is a meaningful way I can help afterwards, I will explain it clearly—without a hard sell.</p></details>
    <details><summary><span>03</span>Who is it for?<i>+</i></summary><p>Founders, owner-operators and leadership teams building something ambitious: from an early proposition to an established business ready for its next stage.</p></details>
    <details><summary><span>04</span>How long will it take?<i>+</i></summary><p>Allow around 12 focused minutes. There are five short workshops covering your foundation, market, brand, commercial growth and direction.</p></details>
    <details><summary><span>05</span>What happens when I finish?<i>+</i></summary><p>You receive a clear strategic summary with immediate priorities and longer-term recommendations—a useful starting point for better decisions.</p></details>
  </div></section>
  <section class="final-cta"><div class="reveal"><span class="eyebrow">YOUR NEXT MOVE</span><h2>See your business<br>more clearly.</h2><p>Step back from the noise and answer the questions I would ask if we were sitting across the table. Leave with a sharper view of what matters now.</p><button class="primary premium-cta light" data-start><span>Start Your Blueprint</span><i>↗</i></button><small>Five focused workshops · free & confidential · 12 minutes</small></div></section>`)
  bindHome()
}

function bindHome() {
  document.querySelectorAll('[data-start]').forEach(el => el.addEventListener('click', start))
  document.querySelector('[data-home]')?.addEventListener('click', (e) => { e.preventDefault(); home() })
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target) }
  }), { threshold: 0.12 })
  document.querySelectorAll('.reveal').forEach(element => observer.observe(element))
  document.querySelectorAll<HTMLDetailsElement>('.faq details').forEach(item => item.addEventListener('toggle', () => {
    if (item.open) document.querySelectorAll<HTMLDetailsElement>('.faq details').forEach(other => { if (other !== item) other.open = false })
  }))
}

function start() { workshopIndex = 0; questionIndex = 0; answers = []; renderWorkshopOneIntroduction() }
function absoluteQuestion() { return workshops.slice(0, workshopIndex).reduce((n, w) => n + w.questions.length, 0) + questionIndex }

function renderWorkshopOneIntroduction() {
  const workshop = workshops[0]
  root.innerHTML = shell(`<div class="session-top workshop-one-top"><button class="back" data-home>← <span>Back</span></button><div class="session-progress intro-progress"><div><span>WORKSHOP 1 OF 5</span><strong>${workshop.title}</strong></div><div class="progress-track" aria-label="Workshop progress"><i style="width:0%"></i></div><small>Ready</small></div><button class="save" data-home>Exit review</button></div>
  <section class="workshop-one-welcome" aria-labelledby="workshop-one-title"><div class="welcome-number" aria-hidden="true">01</div><div class="welcome-content"><span class="eyebrow">A FOUNDER-TO-FOUNDER CONVERSATION</span><h1 id="workshop-one-title">Before we talk about your brand, let’s get clear on the business.</h1><p class="welcome-lead">If we were sitting together, this is where I would begin. Two focused questions will help me understand the ambition behind the idea and the evidence underneath it.</p><div class="welcome-note"><span class="mini-portrait">DB</span><div><p>“You don’t need perfect answers. I’d much rather hear what is true today—that is where useful strategy starts.”</p><small>Daniel Band · Founder</small></div></div><div class="welcome-action"><button class="primary workshop-button" data-begin>Begin the conversation <span>→</span></button><span>2 questions · about 2 minutes · your answers stay private</span></div></div></section>`, true)
  document.querySelector('[data-begin]')?.addEventListener('click', renderQuestion)
  document.querySelectorAll('[data-home]').forEach(element => element.addEventListener('click', home))
}

function renderQuestion() {
  const workshop = workshops[workshopIndex]
  const question = workshop.questions[questionIndex]
  const current = absoluteQuestion()
  const savedAnswer = answers[current] || ''
  const isWorkshopOne = workshopIndex === 0
  const field = question.options
    ? `<div class="options" role="radiogroup" aria-label="Choose the answer closest to your experience">${question.options.map((option, i) => `<button type="button" role="radio" aria-checked="${savedAnswer === option}" data-answer="${option}" class="${savedAnswer === option ? 'selected' : ''}"><span>${String.fromCharCode(65 + i)}</span>${option}</button>`).join('')}</div>`
    : `<div class="written-answer"><label class="sr-only" for="founder-answer">Your answer</label><textarea id="founder-answer" rows="4" maxlength="400" placeholder="${question.placeholder}">${escapeHtml(savedAnswer)}</textarea><span>${question.encouragement || 'Take your time. A few honest sentences are enough.'}</span></div>`
  const progress = isWorkshopOne ? ((questionIndex + 1) / workshop.questions.length) * 100 : ((current + 1) / totalQuestions) * 100
  root.innerHTML = shell(`<div class="session-top ${isWorkshopOne ? 'workshop-one-top' : ''}"><button class="back" data-back>← <span>Back</span></button><div class="session-progress"><div><span>WORKSHOP ${workshopIndex + 1} OF 5</span><strong>${workshop.title}</strong></div><div class="progress-track" role="progressbar" aria-label="${isWorkshopOne ? 'Business Foundation' : 'Review'} progress" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${progress}"><i style="width:${progress}%"></i></div><small>${isWorkshopOne ? `${questionIndex + 1} of ${workshop.questions.length}` : `${current + 1} / ${totalQuestions}`}</small></div><button class="save" data-home>Exit review</button></div>
  <section class="question-layout ${isWorkshopOne ? 'workshop-one-question' : ''}"><aside class="founder-intro"><span class="mini-portrait">DB</span><span class="eyebrow">DANIEL’S VIEW</span><p>${workshop.introduction}</p><small>Daniel Band · Founder</small></aside><div class="question-panel"><span class="question-count">${isWorkshopOne ? `OUR CONVERSATION · ${questionIndex + 1} OF ${workshop.questions.length}` : `QUESTION ${questionIndex + 1} · ${workshop.focus.toUpperCase()}`}</span><h1>${question.prompt}</h1><p class="strategist-note"><strong>${isWorkshopOne ? 'A useful way to think about it' : 'My perspective'}</strong>${question.note}</p>${field}${question.encouragement && question.options ? `<p class="encouragement">${question.encouragement}</p>` : ''}<button class="primary continue ${isWorkshopOne ? 'workshop-button' : ''}" data-next ${question.options && !isWorkshopOne ? 'hidden' : ''}>${questionIndex === workshop.questions.length - 1 && isWorkshopOne ? 'Complete foundation' : 'Continue'} <span>→</span></button></div></section>`, true)
  document.querySelectorAll<HTMLElement>('[data-answer]').forEach(button => button.addEventListener('click', () => { document.querySelectorAll<HTMLElement>('[data-answer]').forEach(x => { x.classList.remove('selected'); x.setAttribute('aria-checked', 'false') }); button.classList.add('selected'); button.setAttribute('aria-checked', 'true'); if (!isWorkshopOne) window.setTimeout(() => next(button.dataset.answer || ''), 220) }))
  document.querySelector('[data-next]')?.addEventListener('click', () => { const value = (document.querySelector<HTMLTextAreaElement>('textarea')?.value || document.querySelector<HTMLElement>('[data-answer].selected')?.dataset.answer || '').trim(); if (value) next(value); else { const field = document.querySelector('textarea') || document.querySelector('.options'); field?.classList.add('invalid'); field?.setAttribute('aria-invalid', 'true') } })
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
  else { renderWorkshopOneIntroduction(); return }
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
