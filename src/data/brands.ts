// SINGLE SOURCE OF TRUTH — brands, contact + site. Edit here, every page updates.

export const SITE = {
  name: 'OH Moments',
  tagline: 'Something your home needs',
  domain: 'https://ohmoments.co.za', // Replace with the live domain at launch
  email: 'ohmoments00@gmail.com',
  // Supplied 0837046206 → international format without + (drop 0, add 27)
  whatsapp: '27837046206',
  whatsappDisplay: '083 704 6206',
  location: 'Johannesburg, Gauteng, South Africa',
  web3formsKey: 'YOUR_WEB3FORMS_KEY', // Paste the live key here — see README
  socials: { instagram: '', facebook: '', tiktok: '' }, // blank = hidden, no broken links
};

export type BrandKind = 'catalogue' | 'showcase' | 'service';

export interface Brand {
  name: string;
  slug: string;
  tag: string;
  blurb: string;
  intro: string;
  kind: BrandKind;
  image: string;
  offers?: string[];
  galleryNote?: string;
  howTo?: string[];
}

export const BRANDS: Brand[] = [
  {
    name: 'Pretty Plate_Co',
    slug: 'pretty-plate',
    tag: 'Glassware & Tableware',
    blurb: 'For hosts who believe a table should whisper luxury — delicate crockery and glassware that turns weeknight dinners into candlelit occasions.',
    intro: 'Pretty Plate_Co is for the art of gathering. Each piece is hand-chosen for its finish, feel and quiet drama — glassware that catches the light, plates that frame your food like art. Set it once, and every meal feels like an event worth dressing for.',
    kind: 'catalogue',
    image: '/img/real/tableware.jpg',
  },
  {
    name: 'Moments Touch',
    slug: 'moments-touch',
    tag: 'Our bleach cleaner',
    blurb: 'The scent of a cared-for home. Our bleach cleaner and home-care essentials keep your space gleaming — effortlessly, affordably, beautifully.',
    intro: 'A beautiful home is a cared-for home. Moments Touch pairs our trusted bleach cleaner with everyday essentials that make the Sunday reset feel indulgent — gleaming surfaces, crisp linen air, and the quiet pride of a home that shines.',
    kind: 'catalogue',
    image: '/img/real/cleaning.jpg',
  },
  {
    name: 'Legae',
    slug: 'legae',
    tag: 'Home renovations and solar',
    blurb: 'Your home, reimagined — thoughtful renovations and solar guidance that add comfort, value and everyday ease.',
    intro: 'Legae means home — and we treat yours like our own. From refreshing tired rooms to guiding you toward reliable solar, every project begins with listening and ends with a written quotation, clear timelines and workmanship we stand behind. Solar solutions and installation enquiries are subject to confirmation.',
    kind: 'service',
    image: '/img/real/renovation.jpg',
    offers: [
      'Room refreshes — painting, finishes and fixtures that make spaces feel new',
      'Kitchen and bathroom updates planned around how you live',
      'Solar solutions and installation enquiries — subject to confirmation',
      'Site visit and clear written quotation before any work begins',
    ],
    galleryNote: 'Photographed interiors to inspire your project — share photos of your space for tailored guidance.',
    howTo: [
      'Send your project details via the quote form or WhatsApp.',
      'We confirm scope and arrange a site visit where needed.',
      'You receive a clear written quotation before any work.',
    ],
  },
  {
    name: 'Shaded',
    slug: 'shaded',
    tag: 'Curtains / blinds',
    blurb: 'Light, softened. Privacy, perfected. Made-to-measure curtains and blinds tailored to your windows and your mood.',
    intro: 'The right window dressing changes how a room feels at golden hour. Shaded measures, makes and installs curtains and blinds chosen for your light, your palette and your privacy — finished with the kind of detail guests notice without knowing why.',
    kind: 'showcase',
    image: '/img/real/curtains.jpg',
    offers: [
      'Made-to-measure curtains — sheer, blockout and linen-look weaves',
      'Roller, venetian and vertical blinds for light control',
      'Complimentary measure and quote anywhere in Johannesburg',
      'Professional installation and styling advice included',
    ],
    galleryNote: 'A glimpse of the textures and light our window dressings create.',
    howTo: [
      'Share window sizes and photos via WhatsApp or the form.',
      'We recommend fabrics and systems within your budget.',
      'Measure, make and install on agreed dates.',
    ],
  },
  {
    name: 'Blooms and Occasions',
    slug: 'blooms-and-occasion',
    tag: 'Intimate occasions and flowers',
    blurb: 'Say it with stems. Hand-tied bouquets and intimate styling for birthdays, anniversaries and just-because days.',
    intro: 'Some moments deserve flowers — and the small ones deserve them most. Blooms hand-ties seasonal bouquets and styles intimate tables so your celebration feels personal, considered and effortlessly beautiful. Availability follows the seasons, so enquire early for special dates.',
    kind: 'service',
    image: '/img/real/roses.jpg',
    offers: [
      'Hand-tied bouquets and floral gifts in seasonal stems',
      'Intimate table styling — birthdays, anniversaries, baby showers',
      'Johannesburg delivery on selected stems',
      'Custom colour palettes matched to your moment',
    ],
    galleryNote: 'Seasonal stems styled for real celebrations — tell us your colours.',
    howTo: [
      'Tell us the occasion, date and colours you love.',
      'We propose stems and styling within your budget.',
      'Delivery or setup confirmed for your moment.',
    ],
  },
];

export const brandBySlug = (slug: string) => BRANDS.find((b) => b.slug === slug);

export const whatsappLink = (message: string) =>
  `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(message)}`;

export const productEnquiry = (productName: string, brandName: string) =>
  whatsappLink(`Hello OH Moments! I'd like to enquire about "${productName}" (${brandName}). Is it available?`);
