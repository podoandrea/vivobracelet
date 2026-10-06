// Entry point: demo tab keyboard and 3D start-up. Load order in index.html: navbar, app, motion, model, main.
(() => {
const tabs = [...document.querySelectorAll('.tab')];
tabs.forEach((tab, index) => tab.addEventListener('keydown', event => {
  let next;
  if (event.key === 'ArrowDown' || event.key === 'ArrowRight') next = (index + 1) % tabs.length;
  if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') next = (index + tabs.length - 1) % tabs.length;
  if (event.key === 'Home') next = 0;
  if (event.key === 'End') next = tabs.length - 1;
  if (next !== undefined) { event.preventDefault(); tabs[next].click(); tabs[next].focus(); }
}));

// Keep the narrative and app demo usable even if WebGL or the connection is unavailable.
const fail = error => {
  console.error('VIVO 3D:', error);
  document.querySelector('.model-loading').textContent = document.documentElement.lang === 'en' ? '3D unavailable. Component details are listed alongside.' : '3D non disponibile. Trovi i componenti nell’elenco accanto.';
  const hero = document.querySelector('#heroModel');
  if (!hero.firstChild) hero.innerHTML = '<img src="img/componenti.jpg" alt="VIVO Bracelet" style="height:100%;width:100%;object-fit:contain;border-radius:32px">';
};
if (window.VIVO_initModels) window.VIVO_initModels().catch(fail); else fail(new Error('model.js not loaded'));
})();
