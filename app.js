const links = [...document.querySelectorAll('.toc-link')];
const map = new Map(links.map(a => [a.getAttribute('href').slice(1), a]));
const obs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      links.forEach(a => a.classList.remove('active'));
      map.get(e.target.id)?.classList.add('active');
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });
document.querySelectorAll('.chapter').forEach(s => obs.observe(s));

const toc = document.getElementById('toc');
document.getElementById('nav-toggle').addEventListener('click', () => toc.classList.toggle('open'));
toc.addEventListener('click', e => { if (e.target.classList.contains('toc-link')) toc.classList.remove('open'); });

// Theme toggle: default follows the system; a manual choice is stored and wins.
const root = document.documentElement;
const themeBtn = document.getElementById('theme-toggle');
const systemDark = window.matchMedia('(prefers-color-scheme: dark)');
const effectiveTheme = () => root.getAttribute('data-theme') || (systemDark.matches ? 'dark' : 'light');
const syncIcon = () => { themeBtn.textContent = effectiveTheme() === 'dark' ? '☀️' : '🌙'; };
syncIcon();
themeBtn.addEventListener('click', () => {
  const next = effectiveTheme() === 'dark' ? 'light' : 'dark';
  root.setAttribute('data-theme', next);
  try { localStorage.setItem('theme', next); } catch (e) {}
  syncIcon();
});
// If the user hasn't made a manual choice, track later system changes.
systemDark.addEventListener('change', () => { if (!root.getAttribute('data-theme')) syncIcon(); });
