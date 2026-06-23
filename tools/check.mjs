import { readFileSync } from 'node:fs';
const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const errs = [];
const tocIds = [...html.matchAll(/class="toc-link"[^>]*href="#(ch\d+)"/g)].map(m => m[1]);
const secIds = [...html.matchAll(/<section id="(ch\d+)"/g)].map(m => m[1]);
if (tocIds.join(',') !== secIds.join(',')) errs.push(`toc/section 不一致: toc=[${tocIds}] sec=[${secIds}]`);
// 空章节粗判：相邻 section 之间正文 < 120 字符算空（Task 1 阶段允许空，故 MIN 由参数控制）
const MIN = Number(process.env.MIN_CHARS ?? 0);
const blocks = html.split(/<section id="ch\d+"/).slice(1);
blocks.forEach((b, i) => {
  const body = b.slice(0, b.indexOf('</section>')).replace(/<[^>]+>/g, '').trim();
  if (body.length < MIN) errs.push(`ch${i} 正文过短(${body.length}<${MIN})`);
});
for (const tag of ['div', 'section', 'pre']) {
  const open = (html.match(new RegExp(`<${tag}[\\s>]`, 'g')) || []).length;
  const close = (html.match(new RegExp(`</${tag}>`, 'g')) || []).length;
  if (open !== close) errs.push(`<${tag}> 开合不等: ${open} vs ${close}`);
}
const allowed = new Set(['box', 'box-do', 'box-warn', 'box-core', 'box-summary', 'box-title']);
for (const m of html.matchAll(/class="(box[^"]*)"/g))
  for (const c of m[1].split(/\s+/)) if (!allowed.has(c)) errs.push(`未知 box class: ${c}`);
if (errs.length) { console.error('CHECK FAIL:\n' + errs.join('\n')); process.exit(1); }
console.log('CHECK OK:', secIds.length, 'chapters');
