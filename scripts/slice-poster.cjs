// One-time asset prep: slices the OH Moments poster artwork into per-brand
// tile cutouts + closing flourish. Source: src/assets/poster.jpeg (1170x1167).
// Run: node scripts/slice-poster.cjs
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const SRC = path.join(__dirname, '..', 'src', 'assets', 'poster.jpeg');
const OUT = path.join(__dirname, '..', 'public', 'img', 'tiles');

fs.mkdirSync(OUT, { recursive: true });

// Product band y 868–1068; separators at x 253, 443, 681, 872
const TILES = [
  { slug: 'pretty-plate', left: 2, width: 246 },
  { slug: 'moments-touch', left: 258, width: 178 },
  { slug: 'legae', left: 448, width: 229 },
  { slug: 'shaded', left: 686, width: 181 },
  { slug: 'blooms', left: 878, width: 288 },
];
const BAND = { top: 868, height: 200 };

// Poster background is JPEG off-white (~253,251,252); push neutral near-whites
// to pure #fff so cutouts blend seamlessly with the page background.
async function sliceCutout(box, outName) {
  const { data } = await sharp(SRC)
    .extract(box)
    .raw()
    .toBuffer({ resolveWithObject: true });
  const channels = 3;
  const rgb = Buffer.alloc(data.length);
  for (let i = 0; i < data.length; i += channels) {
    const r = data[i], g = data[i + 1], b = data[i + 2];
    const min = Math.min(r, g, b), max = Math.max(r, g, b);
    if (min >= 238) {
      rgb[i] = rgb[i + 1] = rgb[i + 2] = 255;
    } else {
      rgb[i] = r; rgb[i + 1] = g; rgb[i + 2] = b;
    }
    void max;
  }
  await sharp(rgb, { raw: { width: box.width, height: box.height, channels } })
    .webp({ quality: 92 })
    .toFile(path.join(OUT, outName));
}

(async () => {
  for (const t of TILES) {
    await sliceCutout(
      { left: t.left, top: BAND.top, width: t.width, height: BAND.height },
      `${t.slug}.webp`
    );
    console.log(`${t.slug}.webp ${t.width}x${BAND.height}`);
  }
  await sharp(SRC)
    .extract({ left: 376, top: 1122, width: 408, height: 26 })
    .webp({ quality: 95 })
    .toFile(path.join(OUT, 'flourish.webp'));
  console.log('flourish.webp 408x26');

  console.log('done ->', OUT);
})();
