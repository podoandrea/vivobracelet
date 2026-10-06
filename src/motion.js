(() => {
// Scroll-driven motion: staggered groups, step timeline, count-up numbers and hero parallax.
const reduce = matchMedia('(prefers-reduced-motion: reduce)');

// Stagger siblings so groups cascade instead of appearing all at once.
document.querySelectorAll('.grid,.steps,.sec ul,.parts,[data-stagger]').forEach(group => {
  [...group.children].forEach((item, i) => item.style.setProperty('--reveal-delay', `${Math.min(i, 5) * 80}ms`));
});
document.querySelectorAll('.tech').forEach(group => {
  [...group.children].forEach((item, i) => item.style.setProperty('--reveal-delay', `${i * 70}ms`));
});

function once(selector, fn, threshold = .3) {
  const elements = document.querySelectorAll(selector);
  if (!elements.length) return;
  const io = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) { io.unobserve(entry.target); fn(entry.target); }
  }), { threshold });
  elements.forEach(el => io.observe(el));
}

// Timeline line draws through the five steps.
once('.steps', el => el.classList.add('run'), .3);

// Large numbers count up once; stops if the language switch rewrites the text.
function countUp(el) {
  const original = el.textContent;
  const match = original.match(/\d{1,3}(?:[.,]\d{3})+|\d{4,}/);
  if (!match || reduce.matches) return;
  const raw = match[0], sep = raw.match(/[.,]/)?.[0] || '';
  const target = Number(raw.replace(/[.,]/g, ''));
  const format = n => sep ? String(n).replace(/\B(?=(\d{3})+(?!\d))/g, sep) : String(n);
  const start = performance.now(), duration = 1700;
  let written = original;
  const step = now => {
    if (el.textContent !== written) return;
    const p = Math.min(1, (now - start) / duration), eased = 1 - Math.pow(1 - p, 4);
    written = p < 1 ? original.replace(raw, format(Math.round(target * eased))) : original;
    el.textContent = written;
    if (p < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}
once('[data-count]', countUp, .6);

// Hero: the bracelet drifts slightly faster than the page.
const hero = document.querySelector('.hero');
if (hero) {
  let pending = false;
  const update = () => { pending = false; hero.style.setProperty('--sy', Math.min(scrollY, innerHeight).toFixed(1)); };
  addEventListener('scroll', () => { if (!pending && !reduce.matches) { pending = true; requestAnimationFrame(update); } }, { passive: true });
}
})();
