const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, '..', 'src', 'content', 'products');
fs.mkdirSync(dir, { recursive: true });
const T = '/img/real/tableware.jpg';
const D = '/img/real/dining.jpg';
const C = '/img/real/cleaning.jpg';
const SHELF = '/img/real/care-shelf.jpg';
const SPRAY = '/img/real/care-spray.jpg';
const DISINFECT = '/img/real/care-disinfect.jpg';
const KITCHEN = '/img/real/care-kitchen.jpg';
const LAUNDRY = '/img/real/care-laundry.jpg';
// No prices in V1 — every card shows "Enquire for price". Luxury copy, honest claims only.
const items = [
  ['gilded-rim-dinner-set', 'Gilded Rim Dinner Set - 12 Piece', 'pretty-plate', 'Tableware', 'Twelve pieces of quiet drama — cream stoneware kissed with gold, made for hosts whose dinners linger long after dessert.', 'Serve a table that glows. This twelve-piece set pairs soft cream stoneware with a fine gold rim, chosen for the way it catches candlelight. Made for slow dinners, gifting, and every occasion worth dressing for. Enquire for availability and gifting options.', 'PP-001', T],
  ['azure-coupe-bowls', 'Azure Coupe Bowls - Set of 4', 'pretty-plate', 'Tableware', 'Midnight navy outside, molten gold within — four coupe bowls for salads, desserts and delicious contrast.', 'Four coupe bowls in deep navy with a warm gold interior — beautiful against fresh salads, rich desserts and morning fruit. A small set with serious presence. Enquire for availability.', 'PP-002', T],
  ['heirloom-wine-glasses', 'Heirloom Wine Glasses - Set of 4', 'pretty-plate', 'Glassware', 'Feather-light stems that make Tuesday taste like anniversary — four glasses for toasts big and small.', 'Four delicate wine glasses with a fine, balanced stem — made for golden-hour pours and long conversations. The kind of glasses guests ask about. Enquire for availability.', 'PP-003', D],
  ['cream-serve-platter', 'Cream Serve Platter with Gold Edge', 'pretty-plate', 'Serveware', 'The centrepiece every table deserves — a generous oval platter with a gilded edge for roasts, spreads and showpieces.', 'A generous oval platter in soft cream with a gilded edge — made for Sunday roasts, generous spreads and celebratory centrepieces. Arrives ready for gifting. Enquire for availability.', 'PP-004', D],
  ['navy-tea-cups', 'Navy Tea Cups and Saucers - Pair', 'pretty-plate', 'Teaware', 'Slow mornings, poured beautifully — a pair of boutique navy cups for tea rituals worth savouring.', 'A pair of boutique navy tea cups on soft champagne saucers — made for slow mornings, afternoon rituals and thoughtful gifts. Enquire for availability.', 'PP-005', T],
  ['celebration-tumblers', 'Celebration Tumblers - Set of 6', 'pretty-plate', 'Glassware', 'Weighty, golden-banded, ready to clink — six tumblers for sundowners, celebrations and sparkling conversation.', 'Six weighty tumblers with a subtle gold band — made for sundowners, festive toasts and everyday sparkle. A set that turns drinks into occasions. Enquire for availability.', 'PP-006', D],
  ['moments-bleach-750', 'Moments Touch Bleach Cleaner 750ml', 'moments-touch', 'Home Care', 'Our signature bleach cleaner in a handy 750ml — the gleam behind kitchens and bathrooms that feel truly cared for.', 'Our trusted bleach cleaner in a handy 750ml bottle — made for gleaming kitchens, fresh bathrooms and the quiet satisfaction of a well-kept home. Always follow label directions, ventilate rooms and keep out of reach of children. Enquire for availability and bulk options.', 'MT-001', C],
  ['moments-bleach-2l', 'Moments Touch Bleach Cleaner 2L', 'moments-touch', 'Home Care', 'More of what works — a generous 2L of our bleach cleaner for homes that like to stay ahead of the mess.', 'A generous 2L of our signature bleach cleaner — made for households that value a standing routine of freshness. Always follow label directions and store safely away from children. Enquire for availability and bulk options.', 'MT-002', SHELF],
  ['citrus-surface-spray', 'Citrus Surface Spray 500ml', 'moments-touch', 'Home Care', 'Sunshine in a spray — a bright citrus lift for counters, touchpoints and quick daily resets.', 'A bright citrus surface spray made for daily resets — counters, touchpoints and little refreshes that keep the whole home feeling cared for. Enquire for availability.', 'MT-003', SPRAY],
  ['linen-floor-gel', 'Linen-Fresh Floor Gel 1L', 'moments-touch', 'Home Care', 'Walk into crisp-linen air — a floor gel that leaves rooms feeling freshly pressed and calm.', 'A floor gel with a soft linen-fresh scent — made for the finishing touch of the weekly reset, leaving rooms feeling calm and freshly pressed. Enquire for availability.', 'MT-004', LAUNDRY],
  ['homecare-trio', 'Home-Care Starter Trio', 'moments-touch', 'Bundles', 'The complete reset in one thoughtful set — bleach cleaner, surface spray and floor gel, ready to gift or begin.', 'Bleach cleaner, surface spray and floor gel in one thoughtful set — made for new homes, seasonal resets and gifts that genuinely help. Enquire for availability and gifting options.', 'MT-005', KITCHEN],
  ['refill-duo', 'Refill Duo - Value Pack', 'moments-touch', 'Bundles', 'Restock beautifully — a value duo of refills for homes that never run out of fresh.', 'A value pair of refills for your Moments Touch favourites — made for low-waste restocking and homes that like to stay ahead. Enquire for availability and bulk options.', 'MT-006', DISINFECT],
];
const feat = ['gilded-rim-dinner-set', 'azure-coupe-bowls', 'moments-bleach-750', 'homecare-trio'];
for (const [slug, name, brand, cat, short, desc, sku, img] of items) {
  const o = { name, brand, category: cat, shortDescription: short, description: desc, images: [img], featured: feat.includes(slug), inStock: true, tags: ['shop'], sku };
  fs.writeFileSync(path.join(dir, slug + '.json'), JSON.stringify(o, null, 2));
}
console.log('seeded ' + items.length + ' (no prices)');
