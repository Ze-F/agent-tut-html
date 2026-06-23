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
