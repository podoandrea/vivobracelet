// VIVO navbar: floating liquid-glass bar. Markup, styles and behaviour live here.
// Usage: <vivo-navbar></vivo-navbar> in index.html, then load this script before app.js.
(() => {

const logo = 'img/vivo-logo-clear.png';

const LINKS = [
  ['#anatomia', 'navModel', 'Esplora il bracciale'],
  ['#soluzione', 'nav2', 'La soluzione'],
  ['#come', 'nav3', 'Come funziona'],
  ['#demo', 'nav4', "L'app"],
  ['#tecnologia', 'nav5', 'Tecnologia']
];

const MOON = '<svg class="moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>';
const SUN = '<svg class="sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>';

const TEMPLATE = `
<nav class="vn" aria-label="Menu principale">
  <div class="vn-bar">
    <span class="vn-glass" aria-hidden="true"></span>
    <a class="brand" href="#top" aria-label="VIVO Bracelet"><img class="brand-logo" src="${logo}" width="692" height="791" alt="VIVO Bracelet"></a>
    <div class="vn-links" id="navLinks">
      <span class="vn-pill" aria-hidden="true"></span>
      ${LINKS.map(([href, key, label], i) => `<a href="${href}" data-t="${key}" style="--i:${i}">${label}</a>`).join('')}
    </div>
    <div class="vn-tools">
      <div class="lang" role="group" aria-label="Lingua / Language">
        <button type="button" data-lang="it" aria-pressed="true">IT</button><button type="button" data-lang="en" aria-pressed="false">EN</button>
      </div>
      <button class="theme" type="button" id="themeBtn" data-tl="themeLbl" aria-label="Cambia tema">${MOON}${SUN}</button>
      <a class="btn btn-primary nav-cta" href="#demo" data-t="navCta">Prova la demo</a>
      <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="navLinks" data-tl="menuLabel" aria-label="Apri il menu"><span></span><span></span></button>
    </div>
    <span class="vn-progress reading-progress" aria-hidden="true"></span>
  </div>
</nav>`;

const CSS = `
vivo-navbar{display:contents}
.vn{
  --vn-ease:cubic-bezier(.2,.8,.2,1);--vn-spring:cubic-bezier(.3,1.45,.45,1);
  --vn-fill:linear-gradient(180deg,rgba(255,255,255,.72) 0%,rgba(255,255,255,.42) 100%);
  --vn-edge:rgba(255,255,255,.85);--vn-edge2:rgba(255,255,255,.25);--vn-hi:rgba(255,255,255,1);
  --vn-tint:rgba(14,30,60,.06);--vn-sheen:rgba(255,255,255,.55);
  --vn-chip:linear-gradient(180deg,#fff,rgba(255,255,255,.72));
  --vn-drop:0 22px 44px -22px rgba(12,28,60,.38),0 2px 6px -2px rgba(12,28,60,.08);
  position:fixed;top:max(12px,env(safe-area-inset-top));left:0;right:0;z-index:60;
  display:flex;justify-content:center;padding:0 12px;pointer-events:none
}
:root[data-theme="dark"] .vn{
  --vn-fill:linear-gradient(180deg,rgba(44,56,84,.58) 0%,rgba(14,20,34,.46) 100%);
  --vn-edge:rgba(255,255,255,.22);--vn-edge2:rgba(255,255,255,.04);--vn-hi:rgba(255,255,255,.2);
  --vn-tint:rgba(255,255,255,.07);--vn-sheen:rgba(255,255,255,.14);
  --vn-chip:linear-gradient(180deg,rgba(255,255,255,.2),rgba(255,255,255,.07));
  --vn-drop:0 22px 44px -18px rgba(0,0,0,.7),0 2px 6px -2px rgba(0,0,0,.3)
}
.vn-bar{
  pointer-events:auto;position:relative;z-index:0;display:flex;align-items:center;gap:8px;
  width:100%;max-width:1200px;height:66px;padding:0 9px 0 18px;border-radius:999px;
  animation:vn-in 1.1s var(--vn-ease) .15s backwards;
  transition:height .5s var(--vn-ease),max-width .7s var(--vn-ease)
}
.vn.is-scrolled .vn-bar{height:58px;max-width:1140px}
@keyframes vn-in{from{translate:0 -150%}}
.vn-glass{
  position:absolute;inset:0;z-index:-1;border-radius:inherit;overflow:hidden;
  background:var(--vn-fill);
  -webkit-backdrop-filter:blur(22px) saturate(190%) brightness(1.03);backdrop-filter:blur(22px) saturate(190%) brightness(1.03);
  box-shadow:var(--vn-drop),inset 0 1px 1px var(--vn-hi),inset 0 -10px 18px -14px var(--vn-sheen);
  transition:box-shadow .5s
}
.vn-glass::before{
  content:"";position:absolute;inset:0;border-radius:inherit;padding:1px;pointer-events:none;
  background:linear-gradient(130deg,var(--vn-edge),var(--vn-edge2) 30%,var(--vn-edge2) 70%,var(--vn-edge));
  -webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);-webkit-mask-composite:xor;
  mask:linear-gradient(#000 0 0) content-box exclude,linear-gradient(#000 0 0)
}
.vn-glass::after{
  content:"";position:absolute;inset:0;pointer-events:none;opacity:0;transition:opacity .5s;
  background:radial-gradient(240px circle at var(--mx,50%) var(--my,-60px),var(--vn-sheen),transparent 62%)
}
.vn-bar:hover .vn-glass::after{opacity:1}
.vn .brand{flex:none;display:flex;align-items:center;height:100%;padding-right:4px}
.vn .brand-logo{width:auto;height:44px;transition:height .5s var(--vn-ease)}
.vn.is-scrolled .brand-logo{height:40px}
.vn-links{position:relative;display:flex;align-items:center;gap:2px;margin-inline:auto}
.vn-links a{position:relative;z-index:1;padding:10px 15px;border-radius:999px;font-size:14px;font-weight:500;letter-spacing:-.01em;color:var(--muted);white-space:nowrap;transition:color .3s}
.vn-links a:hover,.vn-links a.active{color:var(--text)}
.vn-pill{
  position:absolute;top:50%;left:0;z-index:0;width:var(--w,0px);height:38px;border-radius:999px;
  background:var(--vn-chip);box-shadow:inset 0 1px 0 var(--vn-hi),0 1px 2px rgba(12,28,60,.08),0 8px 16px -10px rgba(12,28,60,.4);
  transform:translate(var(--x,0px),-50%);opacity:0;
  transition:transform .65s var(--vn-spring),width .65s var(--vn-spring),opacity .3s
}
.vn-pill.is-on{opacity:1}
.vn-pill.no-anim{transition:opacity .3s}
.vn-tools{display:flex;align-items:center;gap:6px;flex:none}
.vn .lang{position:relative;display:flex;padding:3px;border-radius:999px;background:var(--vn-tint)}
.vn .lang::before{content:"";position:absolute;top:3px;bottom:3px;left:3px;width:calc(50% - 3px);border-radius:999px;background:var(--vn-chip);box-shadow:inset 0 1px 0 var(--vn-hi),0 3px 8px -3px rgba(12,28,60,.3);transition:translate .6s var(--vn-spring)}
.vn .lang:has([data-lang="en"][aria-pressed="true"])::before{translate:100% 0}
.vn .lang button{position:relative;z-index:1;width:38px;height:30px;border:0;border-radius:999px;background:none;font:600 11px/1 "Geist Mono",ui-monospace,monospace;letter-spacing:.06em;color:var(--muted);cursor:pointer;transition:color .3s}
.vn .lang button[aria-pressed="true"]{color:var(--text)}
.vn .theme{display:grid;place-items:center;width:42px;height:42px;border:0;border-radius:50%;background:transparent;color:var(--text);cursor:pointer;transition:background-color .3s}
.vn .theme:hover{background:var(--vn-tint)}
.vn .theme svg{grid-area:1/1;width:18px;height:18px;transition:transform .7s var(--vn-spring),opacity .35s}
.vn .theme .sun{opacity:0;transform:rotate(-120deg) scale(.4)}
:root[data-theme="dark"] .vn .theme .sun{opacity:1;transform:none}
:root[data-theme="dark"] .vn .theme .moon{opacity:0;transform:rotate(120deg) scale(.4)}
.vn .nav-cta{min-height:46px;padding:0 20px;font-size:13.5px}
.vn .menu-toggle{display:none;place-content:center;gap:6px;width:44px;height:44px;border:0;border-radius:50%;background:transparent;cursor:pointer}
.vn .menu-toggle:hover{background:var(--vn-tint)}
.vn .menu-toggle span{display:block;width:20px;height:1.5px;border-radius:2px;background:var(--text);transition:transform .5s var(--vn-spring)}
.vn .menu-toggle[aria-expanded="true"] span:first-child{transform:translateY(3.75px) rotate(45deg)}
.vn .menu-toggle[aria-expanded="true"] span:last-child{transform:translateY(-3.75px) rotate(-45deg)}
.vn-progress{position:absolute;left:34px;right:34px;bottom:0;height:2px;border-radius:2px;background:linear-gradient(90deg,var(--teal),var(--red));transform:scaleX(0);transform-origin:left;pointer-events:none}
@keyframes vn-item{from{opacity:0;translate:0 -6px}}
@media (max-width:1080px){
  .vn .menu-toggle{display:grid}
  .vn-tools{margin-left:auto}
  .vn-links{
    position:absolute;top:calc(100% + 10px);left:0;right:0;margin:0;flex-direction:column;align-items:stretch;gap:2px;padding:10px;border-radius:30px;
    background:var(--vn-fill);-webkit-backdrop-filter:blur(26px) saturate(190%);backdrop-filter:blur(26px) saturate(190%);
    box-shadow:var(--vn-drop),inset 0 1px 1px var(--vn-hi),inset 0 0 0 1px var(--vn-edge2);
    opacity:0;visibility:hidden;transform:translateY(-10px) scale(.97);transform-origin:50% 0;
    transition:opacity .3s var(--vn-ease),transform .5s var(--vn-spring),visibility 0s linear .5s
  }
  .vn-links.open{opacity:1;visibility:visible;transform:none;transition:opacity .3s var(--vn-ease),transform .5s var(--vn-spring),visibility 0s}
  .vn-links a{padding:15px 18px;font-size:17px;border-radius:20px}
  .vn-links a.active{background:var(--vn-tint)}
  .vn-links.open a{animation:vn-item .5s var(--vn-ease) both;animation-delay:calc(var(--i) * 45ms + 60ms)}
  .vn-pill{display:none}
}
@media (max-width:700px){
  .vn-bar,.vn.is-scrolled .vn-bar{height:60px;padding-left:14px}
  .vn .brand-logo,.vn.is-scrolled .brand-logo{height:40px}
  .vn .nav-cta{display:none}
  .vn-progress{left:28px;right:28px}
}
@media (max-width:360px){.vn .lang button{width:32px}.vn .theme{width:38px}}
@media (prefers-reduced-motion:reduce){.vn-bar{animation:none}.vn *{transition-duration:0s!important;animation:none!important}}
`;

function setup(root) {
  const nav = root.querySelector('.vn');
  const bar = root.querySelector('.vn-bar');
  const menu = root.querySelector('.menu-toggle');
  const list = root.querySelector('#navLinks');
  const pill = root.querySelector('.vn-pill');
  const progress = root.querySelector('.vn-progress');
  const links = [...list.querySelectorAll('a')];
  const desktop = matchMedia('(min-width: 1081px)');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  let active = null, hovered = null, shown = null;

  // Liquid indicator: glides between links with a soft squash.
  function placePill(target) {
    if (!desktop.matches || !target) { pill.classList.remove('is-on'); shown = null; return; }
    const first = !pill.classList.contains('is-on');
    if (first) pill.classList.add('no-anim');
    pill.style.setProperty('--x', `${target.offsetLeft}px`);
    pill.style.setProperty('--w', `${target.offsetWidth}px`);
    if (first) { void pill.offsetWidth; pill.classList.remove('no-anim'); }
    else if (shown !== target && !reduce.matches) pill.animate([{ scale: '1 1' }, { scale: '1.07 .86' }, { scale: '1 1' }], { duration: 560, easing: 'cubic-bezier(.3,.7,.3,1)' });
    pill.classList.add('is-on');
    shown = target;
  }
  const sync = () => placePill(hovered || active);
  links.forEach(a => a.addEventListener('pointerenter', () => { hovered = a; sync(); }));
  list.addEventListener('pointerleave', () => { hovered = null; sync(); });

  // Specular highlight that follows the pointer across the glass.
  bar.addEventListener('pointermove', e => {
    const r = bar.getBoundingClientRect();
    bar.style.setProperty('--mx', `${e.clientX - r.left}px`);
    bar.style.setProperty('--my', `${e.clientY - r.top}px`);
  });

  // Mobile menu
  const setMenu = open => {
    menu.setAttribute('aria-expanded', String(open));
    list.classList.toggle('open', open);
    nav.classList.toggle('menu-open', open);
  };
  menu.addEventListener('click', () => setMenu(menu.getAttribute('aria-expanded') !== 'true'));
  list.addEventListener('click', e => { if (e.target.closest('a')) setMenu(false); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && list.classList.contains('open')) { setMenu(false); menu.focus(); } });
  document.addEventListener('click', e => { if (!e.target.closest('.vn')) setMenu(false); });
  desktop.addEventListener('change', () => { setMenu(false); sync(); });

  // Scroll: reading progress, compact state, current section.
  let pending = false;
  function onScroll() {
    pending = false;
    const max = document.documentElement.scrollHeight - innerHeight;
    progress.style.transform = `scaleX(${max > 0 ? Math.min(1, scrollY / max) : 0})`;
    nav.classList.toggle('is-scrolled', scrollY > 24);
    let current = null, nearest = -Infinity;
    links.forEach(link => {
      const top = document.querySelector(link.hash)?.getBoundingClientRect().top;
      if (top < 200 && top > nearest) { current = link; nearest = top; }
    });
    if (current !== active) {
      active = current;
      links.forEach(link => {
        link.classList.toggle('active', link === active);
        if (link === active) link.setAttribute('aria-current', 'location'); else link.removeAttribute('aria-current');
      });
      sync();
    }
  }
  addEventListener('scroll', () => { if (!pending) { pending = true; requestAnimationFrame(onScroll); } }, { passive: true });
  addEventListener('resize', sync);
  document.addEventListener('vivo:language', () => requestAnimationFrame(sync));
  document.fonts?.ready.then(sync);
  onScroll();
}

class VivoNavbar extends HTMLElement {
  connectedCallback() {
    if (this.dataset.ready) return;
    this.dataset.ready = 'true';
    if (!document.getElementById('vivo-navbar-css')) {
      const style = document.createElement('style');
      style.id = 'vivo-navbar-css';
      style.textContent = CSS;
      document.head.append(style);
    }
    this.innerHTML = TEMPLATE;
    setup(this);
  }
}
if (!customElements.get('vivo-navbar')) customElements.define('vivo-navbar', VivoNavbar);
})();
