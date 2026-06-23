import { readFileSync } from 'node:fs';
const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const errs = [];
const tocIds = [...html.matchAll(/class="toc-link"[^>]*href="#(ch\d+)"/g)].map(m => m[1]);
const secIds = [...html.matchAll(/<section id="(ch\d+)"/g)].map(m => m[1]);
if (tocIds.join(',') !== secIds.join(',')) errs.push(`toc/section 不一致: toc=[${tocIds}] sec=[${secIds}]`);
// 空章节粗判：MIN 由 MIN_CHARS 控制（Task 1 阶段默认 0 允许空）。
// 增量构建期：用 ONLY=chN 只对当前这一章施加 MIN，未写的章节不误报。
const MIN = Number(process.env.MIN_CHARS ?? 0);
const ONLY = process.env.ONLY;
const blocks = html.split(/<section id="(ch\d+)"/).slice(1); // [id, block, id, block, ...]
for (let i = 0; i < blocks.length; i += 2) {
  const id = blocks[i];
  const b = blocks[i + 1];
  if (ONLY && id !== ONLY) continue;
  const body = b.slice(0, b.indexOf('</section>')).replace(/<[^>]+>/g, '').trim();
  if (body.length < MIN) errs.push(`${id} 正文过短(${body.length}<${MIN})`);
}
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
