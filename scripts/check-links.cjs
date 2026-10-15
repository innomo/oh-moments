const fs = require('fs');
const path = require('path');
const htmls = [];
(function walk(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) walk(p);
    else if (p.endsWith('.html')) htmls.push(p);
  }
})('dist');
const bad = [];
const imgs = new Set();
for (const f of htmls) {
  const s = fs.readFileSync(f, 'utf8');
  const re = /(href|src)="([^"]+)"/g;
  let m;
  while ((m = re.exec(s))) {
    const url = m[2];
    if (m[1] === 'src') imgs.add(url);
    if (/^(https?:|mailto:|tel:|#|data:)/.test(url)) continue;
    const clean = url.split('?')[0].split('#')[0];
    if (!clean || clean.includes('undefined')) { bad.push(f + ' => ' + url); continue; }
    const local = clean.startsWith('/') ? path.join('dist', clean.slice(1)) : path.join(path.dirname(f), clean);
    if (fs.existsSync(local)) continue;
    if (fs.existsSync(local + '.html')) continue;
    if (fs.existsSync(path.join(local, 'index.html'))) continue;
    bad.push(f + ' => ' + url);
  }
}
console.log('pages: ' + htmls.length);
console.log(bad.length ? 'BROKEN:\n' + bad.join('\n') : 'OK: no broken internal links');
console.log('local imgs: ' + Array.from(imgs).filter(u => u.startsWith('/')).join(', '));
const remote = Array.from(imgs).filter(u => /^(https?:|data:)/.test(u));
console.log(remote.length ? 'REMOTE IMGS (bad):\n' + remote.join('\n') : 'OK: zero remote images');
let missing = [];
for (const u of imgs) {
  if (/^(https?:|mailto:|tel:|#|data:)/.test(u)) continue;
  if (!fs.existsSync(path.join('dist', u.split('?')[0].slice(1)))) missing.push(u);
}
console.log(missing.length ? 'MISSING:\n' + missing.join('\n') : 'OK: all local images exist');
