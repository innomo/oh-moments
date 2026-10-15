const https = require('https');
const fs = require('fs');
const path = require('path');
const out = path.join(__dirname, '..', 'public', 'img', 'real');
fs.mkdirSync(out, { recursive: true });
const list = [
  ['hero.jpg', 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1600&auto=format&fit=crop'],
  ['tableware.jpg', 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1200&auto=format&fit=crop'],
  ['cleaning.jpg', 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=1200&auto=format&fit=crop'],
  ['curtains.jpg', 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1200&auto=format&fit=crop'],
  ['renovation.jpg', 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop'],
  ['solar.jpg', 'https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=1200&auto=format&fit=crop'],
  ['flowers.jpg', 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?q=80&w=1200&auto=format&fit=crop'],
  ['dining.jpg', 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=1200&auto=format&fit=crop'],
];
function get(url) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        get(res.headers.location).then(resolve, reject);
        return;
      }
      if (res.statusCode !== 200) { reject(new Error('HTTP ' + res.statusCode)); return; }
      const chunks = [];
      res.on('data', (c) => chunks.push(c));
      res.on('end', () => resolve(Buffer.concat(chunks)));
    });
    req.on('error', reject);
    req.setTimeout(60000, () => { req.destroy(new Error('timeout')); });
  });
}
(async () => {
  let ok = 0;
  for (const [name, url] of list) {
    try {
      const buf = await get(url);
      if (buf.length < 5000) throw new Error('too small');
      fs.writeFileSync(path.join(out, name), buf);
      console.log('OK ' + name + ' ' + buf.length);
      ok++;
    } catch (e) { console.log('FAIL ' + name + ' ' + e.message); }
  }
  console.log('downloaded ' + ok + ' of ' + list.length);
})();
