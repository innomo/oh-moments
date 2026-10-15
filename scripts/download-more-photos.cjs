const https = require('https');
const fs = require('fs');
const path = require('path');
const out = path.join(__dirname, '..', 'public', 'img', 'real');
fs.mkdirSync(out, { recursive: true });
// Candidates: first valid file wins per slot (verified as JPEG + size below)
const list = [
  ['care-shelf.jpg', 'https://images.unsplash.com/photo-1563453392212-326f5e854473?q=80&w=1200&auto=format&fit=crop'],
  ['care-spray.jpg', 'https://images.unsplash.com/photo-1528740561666-dc2479dc08ab?q=80&w=1200&auto=format&fit=crop'],
  ['care-disinfect.jpg', 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?q=80&w=1200&auto=format&fit=crop'],
  ['care-kitchen.jpg', 'https://images.unsplash.com/photo-1556911220-bff31c812dba?q=80&w=1200&auto=format&fit=crop'],
  ['care-laundry.jpg', 'https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?q=80&w=1200&auto=format&fit=crop'],
  ['bouquet-lux.jpg', 'https://images.unsplash.com/photo-1561181286-d3fee7d55342?q=80&w=1200&auto=format&fit=crop'],
  ['roses.jpg', 'https://images.unsplash.com/photo-1487530811176-3780de880c2d?q=80&w=1200&auto=format&fit=crop'],
  ['tulips.jpg', 'https://images.unsplash.com/photo-1520763185298-1b434c919102?q=80&w=1200&auto=format&fit=crop'],
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
  for (const [name, url] of list) {
    try {
      const buf = await get(url);
      const isJpg = buf[0] === 0xff && buf[1] === 0xd8;
      if (!isJpg || buf.length < 20000) throw new Error('not a valid photo');
      fs.writeFileSync(path.join(out, name), buf);
      console.log('OK ' + name + ' ' + buf.length);
    } catch (e) { console.log('FAIL ' + name + ' ' + e.message); }
  }
})();
