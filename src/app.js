(() => {
// ---------- English translations (Italian is read from the page itself) ----------
const EN = {
  skip:'Skip to content', navModel:'Explore the bracelet', menuLabel:'Open menu', heroModelAlt:'Three-dimensional model of the VIVO bracelet', heroCaption:'Peace of mind, on your wrist.', explore:'Explore in 3D', heroBottom:'A small gesture. A reassuring presence.', scrollHint:'Discover VIVO ↓', modelAlt:'3D bracelet: hover over the model or press Enter to explode and reassemble it', modelLoading:'Preparing your bracelet…', modelHint:'Hover over the bracelet to discover what is inside.', modelOpen:'Explode view', anatomyIntro:'Every component has a purpose. All in one bracelet.',
  nav1:'The problem', nav2:'The solution', nav3:'How it works', nav4:'The app', nav5:'Technology', navCta:'Try the demo',
  themeLbl:'Toggle theme', sosLbl:'SOS button',
  heroT:'The bracelet that calls for help <span class="teal">when your loved one can\'t</span>',
  heroP:'It detects falls in elderly people on its own and instantly alerts the family, right on their phone.',
  heroB1:'See how it works', heroB2:'View the app',
  pEy:'The problem', pT:'For an elderly person, a fall is an everyday emergency',
  s1n:'1 in 3', s1:'people over 65 fall at least once a year', s1f:'Source: WHO',
  s2n:'684,000', s2:'deaths every year worldwide from falls: the second leading cause of accidental death', s2f:'Source: WHO, 2021',
  s3n:'1 in 4', s3:'Italians is over 65, and the share grows every year', s3f:'Source: ISTAT',
  pNote:'The greatest danger isn\'t the fall: <span class="red">it\'s lying on the floor for hours, with nobody knowing.</span>',
  oEy:'Today\'s solutions', oT:'Why what exists isn\'t enough',
  o1t:'The button has to be pressed', o1:'The classic alarm pendant only works if the person is conscious and able to use it.',
  o2t:'Fees and call centres', o2:'Traditional telecare often requires a monthly subscription and an in-home installation.',
  o3t:'Smartwatches are too complicated', o3:'Designed for athletes and tech enthusiasts, not for someone who is 85.',
  oNote:'We need something that calls for help even when the person can\'t.', oNote2:'No buttons to remember, no subscriptions, no complicated apps.',
  solEy:'The solution', solT:'VIVO Bracelet: put it on and it takes care of the rest',
  f1t:'Detects falls on its own', f1:'Accelerometer and gyroscope analyse movement 100 times per second.',
  f2t:'SOS button', f2:'A single button to ask for help when needed, no menus or codes.',
  f3t:'Monitors heart rate', f3:'The wrist sensor measures heart rate and sends it with every alarm.',
  f4t:'Alerts the family', f4:'A notification on the phone, even when locked, plus a backup email.',
  aEy:'Inside the bracelet', aT:'Small on the outside, complete on the inside', aAlt:'Exploded view of the VIVO Bracelet components',
  a1:'Protective glass', a1d:'impact resistant', a2:'Round LCD display', a2d:'time, heart rate, SOS', a3d:'dual core, Wi-Fi',
  a4:'3.7V Li-Po battery', a4d:'rechargeable', a5:'Optical and proximity sensors', a5d:'wrist heart rate', a6:'Wireless charging', a6d:'module and coil',
  cEy:'How it works', cT:'From the fall to the family member\'s phone',
  c1t:'Fall', c1:'The bracelet detects impact and stillness',
  c2t:'10 seconds', c2:'On-screen countdown: if it\'s a false alarm, it can be cancelled',
  c3t:'Sent over Wi-Fi', c3:'The alarm goes out with heart rate, battery and impact force',
  c4:'Logs the event and finds the family members linked to that bracelet',
  c5t:'Family alerted', c5:'Push notification on the phone, even when locked, plus email',
  cNote:'Just over <span class="teal">10 seconds</span> from fall to notification. With the SOS button the countdown is only 5 seconds.',
  gEy:'The algorithm', gT:'How it tells a fall from a normal gesture',
  g1t:'Free fall', g1:'For at least 60 ms the wrist "loses weight": below 0.6 g.',
  g2t:'Impact', g2:'Right after, a peak above 2.6 g. Above 3.4 g is enough on its own.',
  g3t:'Stillness', g3:'For 1.8 s almost no movement: the person hasn\'t got up.',
  chY:'Acceleration (g)', chEx:'Illustrative example', chLbl:'Chart of acceleration during a fall',
  ch1:'3.4 g', ch2:'0.6 g', chA:'free fall', chB:'impact', chC:'stillness',
  gNote:'If the person moves, no alarm. And they always have 10 seconds to cancel it.',
  dEy:'The family app', dT:'Everything you need, at a glance',
  dP:'A web app that installs on your phone like a real app. It shows the bracelet status, heart rate and event history. Try the different states below.',
  t1:'All good', t1d:'The bracelet is active and checks in regularly',
  t2:'Fall detected', t2d:'Instant push notification with impact and heart rate',
  t3:'Abnormal heart rate', t3d:'Heart rate outside the normal range',
  t4:'Unreachable', t4d:'No sign of life for too long',
  sim:'Simulate a fall',
  push:'<b>FALL DETECTED</b> · VIVO<br><span style="color:#c9d1db">Maria Rossi: fall with 3.9 g impact · 97 bpm · battery 84%</span>',
  cnt1:'On the bracelet', cnt2:'Fall detected.<br>Sending alarm shortly…', cnt3:'Cancel, I\'m fine',
  rEy:'Reliability', rT:'When it matters, it has to work',
  r1t:'No alarm lost', r1:'If the network is down, the alarm stays in memory and the bracelet retries every 30 seconds until it gets through.',
  r2t:'Sign of life every 5 minutes', r2:'If the bracelet turns off or goes out of range, the family sees it right away on the site.',
  r3t:'Two Wi-Fi networks', r3:'Home and phone hotspot: if one doesn\'t respond, it switches to the other on its own.',
  r4t:'Two separate brains', r4:'One processor core handles only the network, the other only falls: neither blocks the other.',
  xEy:'Security and privacy', xT:'Health data treated as such',
  x1t:'Encrypted HTTPS connection', x1:'between bracelet, server and phones',
  x2t:'Authenticated bracelet', x2:'with a secret key: nobody can impersonate it',
  x3t:'Passwords never stored in plain text', x3:'only an encrypted hash (bcrypt)',
  x4t:'Lockout after 5 attempts', x4:'against password guessing',
  x5t:'Each family sees only its own data', x5:'isolated by serial number',
  x6t:'Browser protections enabled', x6:'against session theft and fake sites',
  xBig:'security checks passed in our automated tests', xBig2:'logins, attempt lockout, sessions, notifications and bracelet communication',
  kEy:'Technologies', kT:'Three pieces that talk to each other',
  k1t:'Bracelet', k1c:'C++ on Arduino and FreeRTOS', k1:'Fall and heart rate detection. Alarm queue and sign of life.',
  k2c:'PHP and MySQL', k2:'On standard web hosting. Accounts, history, sending notifications.',
  k3t:'Family app', k3c:'Installable web app (PWA)', k3:'Standard Web Push notifications. Italian and English, light and dark theme.',
  kNote:'No paid external services: notifications are sent directly from our own server.',
  gal1:'The prototype: electronics and wireless charging coil', gal1Alt:'The VIVO Bracelet electronic prototype with its charging coil',
  gal2:'On the wrist, with the app connected in real time', gal2Alt:'The bracelet on the wrist with the SOS button and the app open on a phone',
  nEy:'Next steps', nT:'Where we want to take it',
  n1:'Works outside the home too, without Wi-Fi.', n2:'The location arrives together with the alarm.',
  n3t:'Artificial intelligence', n3:'Fewer false alarms, by learning from movements.',
  n4t:'Waterproof case', n4:'Wear it in the shower too, where most falls happen.',
  n5t:'Field testing', n5:'With elderly people, families and care homes.',
  nNote:'The prototype already works: bracelet, server and app are online and connected.',
  ftT:'So that nobody is left on the floor alone.', ftP:'VIVO Bracelet is a project presented at HackerSGen 2026.', ftB:'Back to top'
};
const META = {
  it: { title: 'VIVO Bracelet', desc: document.querySelector('meta[name=description]').content },
  en: { title: 'VIVO Bracelet', desc: 'VIVO Bracelet: the bracelet that detects falls in elderly people on its own and instantly alerts the family on their phone.' }
};
// Snapshot the Italian content from the DOM so it can be restored
const IT = {};
document.querySelectorAll('[data-t]').forEach(el => IT[el.dataset.t] = el.innerHTML);
document.querySelectorAll('[data-ta]').forEach(el => IT[el.dataset.ta] = el.alt);
document.querySelectorAll('[data-tl]').forEach(el => IT[el.dataset.tl] = el.getAttribute('aria-label'));

// App demo state texts
const STATES = {
  it: { ok: ['Tutto bene', 'Il braccialetto è attivo e si fa vivo regolarmente.'], fall: ['CADUTA RILEVATA', 'Scattato ora. Se non risponde, chiama il 112.'], hr: ['BATTITO ANOMALO', 'Scattato ora. Se non risponde, chiama il 112.'], off: ['Non raggiungibile', 'Ultimo contatto 2 h fa. Potrebbe essere spento, scarico o fuori dalla rete Wi-Fi.'],
        tiles: ['Battito', 'Batteria', 'Ultimo contatto'], now: 'ora', ago: '2 h fa', notif: 'Notifiche attive su questo telefono', hist: 'Storico eventi', empty: 'Nessun evento registrato.', bat: 'batteria', imp: 'impatto', evFall: 'CADUTA RILEVATA', evHr: 'BATTITO ANOMALO' },
  en: { ok: ['All good', 'The bracelet is active and checks in regularly.'], fall: ['FALL DETECTED', 'Triggered just now. If there\'s no answer, call 112.'], hr: ['ABNORMAL HEART RATE', 'Triggered just now. If there\'s no answer, call 112.'], off: ['Unreachable', 'Last contact 2 h ago. It may be turned off, out of battery or out of Wi-Fi range.'],
        tiles: ['Heart rate', 'Battery', 'Last contact'], now: 'now', ago: '2 h ago', notif: 'Notifications on for this phone', hist: 'Event history', empty: 'No events recorded.', bat: 'battery', imp: 'impact', evFall: 'FALL DETECTED', evHr: 'ABNORMAL HEART RATE' }
};

let lang = document.documentElement.lang === 'en' ? 'en' : 'it';
let current = 'ok';

function setLang(l) {
  lang = l;
  const d = l === 'en' ? EN : IT;
  document.querySelectorAll('[data-t]').forEach(el => { const v = d[el.dataset.t]; if (v != null) el.innerHTML = v; });
  document.querySelectorAll('[data-ta]').forEach(el => { const v = d[el.dataset.ta]; if (v != null) el.alt = v; });
  document.querySelectorAll('[data-tl]').forEach(el => { const v = d[el.dataset.tl]; if (v != null) el.setAttribute('aria-label', v); });
  document.documentElement.lang = l;
  document.dispatchEvent(new CustomEvent('vivo:language', { detail: l }));
  document.title = META[l].title;
  document.querySelector('meta[name=description]').content = META[l].desc;
  document.querySelectorAll('.lang button').forEach(b => b.setAttribute('aria-pressed', b.dataset.lang === l));
  show(current, true);
  try { localStorage.setItem('vivo-lang', l); } catch (e) {}
}
document.querySelectorAll('.lang button').forEach(b => b.onclick = () => setLang(b.dataset.lang));

// ---------- Theme toggle ----------
const root = document.documentElement;
const reducedMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
const themeBtn = document.getElementById('themeBtn');
themeBtn.onclick = () => {
  const apply = () => {
    const dark = root.dataset.theme ? root.dataset.theme === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches;
    root.dataset.theme = dark ? 'light' : 'dark';
    try { localStorage.setItem('vivo-theme', root.dataset.theme); } catch (e) {}
  };
  if (!document.startViewTransition || reducedMotion()) return apply();
  // Circular reveal that grows from the toggle button
  const r = themeBtn.getBoundingClientRect(), x = r.left + r.width / 2, y = r.top + r.height / 2;
  root.style.setProperty('--vt-x', `${x}px`);
  root.style.setProperty('--vt-y', `${y}px`);
  root.style.setProperty('--vt-r', `${Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y))}px`);
  document.startViewTransition(apply);
};

// ---------- Reveal on scroll ----------
const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: .12 });
document.documentElement.classList.add('js-ready');
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// ---------- Watch: clock and bpm ----------
const pad = n => String(n).padStart(2, '0');
function tick() {
  const d = new Date();
  document.getElementById('clock').textContent = pad(d.getHours()) + ':' + pad(d.getMinutes());
  document.getElementById('bpm').textContent = 70 + Math.round(Math.random() * 5);
}
tick(); setInterval(tick, 3000);

// ---------- App demo ----------
const ecg = c => `<svg viewBox="0 0 260 34" preserveAspectRatio="none"><path d="M0 17 H70 l5 -12 l6 24 l5 -16 l4 4 H170 l5 -12 l6 24 l5 -16 l4 4 H260" fill="none" stroke="${c}" stroke-width="1.6"/></svg>`;
const flat = `<svg viewBox="0 0 260 34" preserveAspectRatio="none"><path d="M0 17 H260" stroke="#f2bb66" stroke-width="1.6" stroke-dasharray="6 6"/></svg>`;
const LOOK = {
  ok:   { cls: 'st-ok',   g: () => ecg('#86b0ff'), bpm: 88,  ago: false, ev: '' },
  fall: { cls: 'st-fall', g: () => ecg('#ff7377'), bpm: 97,  ago: false, ev: 'fall' },
  hr:   { cls: 'st-fall', g: () => ecg('#ff7377'), bpm: 132, ago: false, ev: 'hr' },
  off:  { cls: 'st-off',  g: () => flat,           bpm: 70,  ago: true,  ev: '' }
};
const screen = document.getElementById('screen'), push = document.getElementById('push');
function show(k, silent) {
  current = k;
  const s = LOOK[k], t = STATES[lang];
  const evFall = `<div class="ev"><b>● ${t.evFall}</b><br><span>97 bpm</span><span>${t.bat} 84%</span><span>${t.imp} ${lang === 'en' ? '3.9' : '3,9'} g</span></div>`;
  const evHr = `<div class="ev"><b>● ${t.evHr}</b><br><span>132 bpm</span><span>${t.bat} 84%</span></div>`;
  const ev = s.ev === 'fall' ? evFall : s.ev === 'hr' ? evHr + evFall : `<div class="empty">${t.empty}</div>`;
  screen.innerHTML = `
    <div class="status ${s.cls}"><small>Maria Rossi</small><h4>${t[k][0]}</h4>${s.g()}<p>${t[k][1]}</p></div>
    <div class="tiles">
      <div class="tile"><span style="color:var(--red)">♥</span><b>${s.bpm}</b><small>${t.tiles[0]}</small></div>
      <div class="tile"><span style="color:var(--muted)">▭</span><b>84%</b><small>${t.tiles[1]}</small></div>
      <div class="tile"><span style="color:var(--teal)">◷</span><b>${s.ago ? t.ago : t.now}</b><small>${t.tiles[2]}</small></div>
    </div>
    <div class="pill">${t.notif}</div>
    <div class="hist">${t.hist}${ev}</div>`;
  document.querySelectorAll('.tab').forEach(b => {
    const selected = b.dataset.s === k;
    b.classList.toggle('on', selected);
    b.setAttribute('aria-selected', selected);
    b.tabIndex = selected ? 0 : -1;
    b.id = `tab-${b.dataset.s}`;
    b.setAttribute('aria-controls', 'screen');
  });
  screen.setAttribute('aria-labelledby', `tab-${k}`);
  if (!matchMedia('(prefers-reduced-motion: reduce)').matches && !silent) screen.animate([{opacity:.3,transform:'translateY(7px)'},{opacity:1,transform:'translateY(0)'}],{duration:300,easing:'ease-out'});
  if (silent) return;
  push.classList.toggle('show', k === 'fall');
  if (k === 'fall') setTimeout(() => push.classList.remove('show'), 4000);
}
document.querySelectorAll('.tab').forEach(b => b.onclick = () => { stopCount(); show(b.dataset.s); });

// Fall simulation with 10-second countdown
const count = document.getElementById('count'), cn = document.getElementById('cn');
let timer = null;
function stopCount() { clearInterval(timer); timer = null; count.classList.remove('show'); }
document.getElementById('simulate').onclick = () => {
  stopCount(); show('ok');
  let n = 10; cn.textContent = n;
  void count.offsetWidth; // restart the ring animation
  count.classList.add('show');
  timer = setInterval(() => {
    n--; cn.textContent = n;
    if (!reducedMotion()) cn.animate([{ transform: 'scale(1.2)', opacity: .45 }, { transform: 'scale(1)', opacity: 1 }], { duration: 450, easing: 'cubic-bezier(.2,.8,.2,1)' });
    if (n <= 0) { stopCount(); show('fall'); }
  }, 1000);
};
document.getElementById('cancel').onclick = () => { stopCount(); show('ok'); };

if (lang === 'en') setLang('en'); else show('ok', true);
})();
