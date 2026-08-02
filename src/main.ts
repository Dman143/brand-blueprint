const icon = (name: string) => `<svg viewBox="0 0 24 24" aria-hidden="true"><use href="#${name}"/></svg>`

document.body.insertAdjacentHTML('afterbegin', `<svg class="svg-sprite" aria-hidden="true"><defs>
  <symbol id="arrow" viewBox="0 0 24 24"><path d="M5 12h14m-6-6 6 6-6 6"/></symbol>
  <symbol id="chevron" viewBox="0 0 24 24"><path d="m9 18 6-6-6-6"/></symbol>
  <symbol id="check" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="m8 12 2.5 2.5L16 9"/></symbol>
  <symbol id="search" viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></symbol>
  <symbol id="spark" viewBox="0 0 24 24"><path d="m12 3 1.6 4.7L18 10l-4.4 2.3L12 17l-1.6-4.7L6 10l4.4-2.3L12 3Z"/></symbol>
  <symbol id="menu" viewBox="0 0 24 24"><path d="M4 7h16M4 12h16M4 17h16"/></symbol>
  <symbol id="close" viewBox="0 0 24 24"><path d="m6 6 12 12M18 6 6 18"/></symbol>
  <symbol id="plus" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></symbol>
  <symbol id="download" viewBox="0 0 24 24"><path d="M12 3v12m-4-4 4 4 4-4M5 20h14"/></symbol>
</defs></svg>`)

const foundations = [
  ['◎', 'Purpose & vision', 'Define why you exist and where you’re headed.', 'Complete', 'coral'],
  ['♧', 'Audience', 'Understand the people you’re here to serve.', 'Complete', 'violet'],
  ['≋', 'Voice & messaging', 'Shape how your brand sounds and speaks.', 'In progress', 'blue'],
  ['◈', 'Visual identity', 'Bring your brand to life through design.', 'Not started', 'mint'],
]
const tools = [['Aa','Voice generator','Create on-brand copy in seconds','violet'],['◇','Logo studio','Explore and refine logo directions','coral'],['▤','Brand guidelines','Build your living brand playbook','blue']]

const root = document.querySelector<HTMLDivElement>('#root')
if (!root) throw new Error('Application root was not found')
root.innerHTML = `<div class="app-shell">
<header><a class="logo" href="#top" aria-label="Brand Blueprint home"><span class="logo-mark"><span></span></span><span>brand<span>blueprint</span></span></a>
<nav aria-label="Main navigation"><a class="active" href="#overview">Overview</a><a href="#foundations">Foundations</a><a href="#tools">Tools</a><button class="nav-close" aria-label="Close menu">${icon('close')}</button></nav>
<div class="header-actions"><button class="icon-button" aria-label="Search">${icon('search')}</button><button class="icon-button settings" aria-label="Settings">⚙</button><button class="avatar" aria-label="Open profile">JD</button><button class="menu-button" aria-label="Open menu">${icon('menu')}</button></div></header>
<main id="top"><section class="hero" id="overview"><div class="eyebrow">${icon('spark')} Your brand workspace</div><h1>Good morning, Jamie.</h1><p>Let’s keep building a brand people remember.</p>
<div class="progress-card"><div class="progress-copy"><span class="progress-number">68<small>%</small></span><div><strong>Your blueprint is taking shape</strong><span>Complete two more foundations to unlock your guidelines.</span></div></div><div class="progress-track" aria-label="Brand blueprint 68% complete"><span></span></div><button data-scroll="foundations">Continue building ${icon('arrow')}</button></div></section>
<section class="section" id="foundations"><div class="section-heading"><div><span class="kicker">THE FUNDAMENTALS</span><h2>Build your foundation</h2><p>Everything strong starts with clarity.</p></div><button class="text-button">View all ${icon('chevron')}</button></div><div class="foundation-grid">
${foundations.map(([symbol,title,description,status,color])=>`<button class="foundation-card" data-message="${title} opened"><span class="card-icon ${color}">${symbol}</span><span class="card-content"><strong>${title}</strong><span>${description}</span></span><span class="status ${status.toLowerCase().replace(' ','-')}">${status==='Complete'?icon('check'):''} ${status}</span>${icon('chevron')}</button>`).join('')}</div></section>
<section class="section tools-section" id="tools"><div class="section-heading"><div><span class="kicker">CREATE WITH CONFIDENCE</span><h2>Your brand toolkit</h2><p>Practical tools, powered by your unique blueprint.</p></div></div><div class="tool-grid">
${tools.map(([symbol,title,text,color])=>`<article class="tool-card"><span class="tool-icon ${color}">${symbol}</span><div><h3>${title}</h3><p>${text}</p></div><button data-message="${title} is ready" aria-label="Open ${title}">${icon('arrow')}</button></article>`).join('')}
<button class="new-tool" data-message="More tools are coming soon">${icon('plus')}<span><strong>More tools coming</strong><small>Your toolkit grows with you</small></span></button></div></section>
<section class="brand-kit section"><div class="brand-preview" aria-hidden="true"><div class="preview-paper"><span class="mini-mark"></span><b>NORTH & KIND</b><i>Thoughtful goods<br>for slower days.</i><div class="swatches"><span></span><span></span><span></span></div></div><div class="preview-card">Aa<span>DM Sans</span></div></div><div class="brand-kit-copy"><span class="kicker">YOUR BRAND, READY TO SHARE</span><h2>Everything in one beautiful place.</h2><p>Your brand guidelines update as your blueprint evolves—so your whole team can stay consistent, always.</p><button data-message="Your guidelines are being prepared">Preview guidelines ${icon('download')}</button></div></section></main>
<footer><a class="logo" href="#top"><span class="logo-mark"><span></span></span><span>brand<span>blueprint</span></span></a><span>Build something unforgettable.</span><small>© 2026 Brand Blueprint</small></footer><div class="toast" role="status" hidden></div></div>`

const nav = document.querySelector('nav')!
document.querySelector('.menu-button')?.addEventListener('click', () => nav.classList.add('open'))
document.querySelector('.nav-close')?.addEventListener('click', () => nav.classList.remove('open'))
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => nav.classList.remove('open')))
document.querySelector('[data-scroll]')?.addEventListener('click', () => document.querySelector('#foundations')?.scrollIntoView({behavior:'smooth'}))
let toastTimer = 0
document.querySelectorAll<HTMLElement>('[data-message]').forEach(button => button.addEventListener('click', () => {
  const toast = document.querySelector<HTMLDivElement>('.toast')!
  toast.innerHTML = `${icon('check')}${button.dataset.message}`
  toast.hidden = false
  window.clearTimeout(toastTimer)
  toastTimer = window.setTimeout(() => { toast.hidden = true }, 2400)
}))
