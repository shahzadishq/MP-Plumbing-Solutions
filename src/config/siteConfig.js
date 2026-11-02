/* =============================================================================
   MP PLUMBING SOLUTIONS — SITE CONFIG
   -----------------------------------------------------------------------------
   👉 EDIT EVERYTHING HERE. All text, contact details, services, photos,
   videos, stats and testimonials used across the site come from this file.
   Image/video paths are relative to the /public folder.
   ========================================================================== */

// Resolves a /public file path so it works on GitHub Pages and any host.
export const asset = (p) => `${import.meta.env.BASE_URL}${p.replace(/^\//, '')}`

export const business = {
  name: 'MP Plumbing Solutions',
  shortName: 'MP Plumbing',
  logo: 'brand/logo.png',
  tagline: 'Premium Plumbing, Done Right',
  subheading:
    'Fast, reliable and fully licensed plumbers. From 24/7 emergencies to beautiful bathroom renovations — we keep Geelong’s water flowing.',

  // --- CONTACT DETAILS ------------------------------------------------------
  phone: '+61 449 812 244',
  phoneHref: 'tel:+61449812244',
  email: 'mp.plumbingsolutions@outlook.com',
  emailHref: 'mailto:mp.plumbingsolutions@outlook.com',
  whatsapp: '+61 449 812 244',
  whatsappHref: 'https://wa.me/61449812244',

  // --- SERVICE AREA & HOURS (EDIT hours if needed) --------------------------
  serviceArea: 'Geelong & surrounding areas, VIC',
  address: 'Thornton Close, Lovely Banks, VIC',
  hours: [
    { day: 'Mon – Fri', time: '7:00am – 6:00pm' },
    { day: 'Saturday', time: '8:00am – 4:00pm' },
    { day: 'Emergencies', time: '24 / 7 — always on call' },
  ],

  // --- SOCIAL (leave '' to hide) -------------------------------------------
  social: {
    facebook: '',
    instagram: 'https://www.instagram.com/mpplumbingsolutionsgeelong/',
    google: '',
  },

  // --- TRUST BADGES (EDIT to match your licences) ---------------------------
  badges: ['Licensed & Insured', 'Victorian Plumbing Licence', 'No Call-Out Fee'],
}

/* -----------------------------------------------------------------------------
   SERVICES — "featured: true" is highlighted. icon keys map to components/icons.jsx
   -------------------------------------------------------------------------- */
export const services = [
  {
    icon: 'emergency',
    title: '24/7 Emergency Plumbing',
    featured: true,
    image: 'media/photos/commercial-callout.webp',
    blurb:
      'Burst pipes, major leaks, no hot water? We pick up day or night and get to you fast across Geelong.',
    points: ['Rapid call-out', 'Burst & leak repair', 'Water damage control'],
  },
  {
    icon: 'drain',
    title: 'Blocked Drains & Sewer',
    image: 'media/photos/cctv-drain-inspection.webp',
    blurb:
      'High-pressure jetting and CCTV camera inspections to clear blockages and find the real cause.',
    points: ['High-pressure jetting', 'CCTV drain cameras', 'Sewer & stormwater'],
  },
  {
    icon: 'install',
    title: 'Bathroom & Kitchen Plumbing',
    image: 'media/photos/freestanding-bath.webp',
    blurb:
      'Renovation plumbing finished beautifully — freestanding baths, vanities, showers and kitchen mixers.',
    points: ['Rough-in & fit-off', 'Freestanding baths', 'Vanities & showers'],
  },
  {
    icon: 'heating',
    title: 'Hot Water Systems',
    image: 'media/photos/rinnai-hot-water.webp',
    blurb:
      'Repairs, replacements and new installs of continuous-flow and storage hot water systems.',
    points: ['Continuous flow', 'Storage units', 'Fast replacements'],
  },
  {
    icon: 'leak',
    title: 'Taps, Toilets & Leaks',
    image: 'media/photos/black-kitchen-mixer.webp',
    blurb:
      'Dripping taps, running toilets and hidden leaks fixed properly — plus new tapware installed.',
    points: ['Tap & mixer installs', 'Toilet repairs', 'Leak repairs'],
  },
  {
    icon: 'building',
    title: 'Commercial Plumbing',
    image: 'media/photos/commercial-kitchen-client.webp',
    blurb:
      'Dependable plumbing for cafés, restaurants, offices and rentals — with minimal disruption.',
    points: ['Commercial kitchens', 'Property managers', 'Planned maintenance'],
  },
]

/* ----------------------------- RECENT JOB VIDEOS ------------------------- */
export const videos = [
  {
    title: 'Basin blockage',
    caption: 'Cleared and flowing again in no time.',
    tag: 'Blocked drains',
    loop: 'media/video/basin-blockage-loop.mp4',
    full: 'media/video/basin-blockage-full.mp4',
    poster: 'media/video/basin-blockage-poster.webp',
  },
  {
    title: 'Bath tap set changeover',
    caption: 'Old tapware out, new set in — neat and leak-free.',
    tag: 'Taps & fixtures',
    loop: 'media/video/bath-tap-changeover-loop.mp4',
    full: 'media/video/bath-tap-changeover-full.mp4',
    poster: 'media/video/bath-tap-changeover-poster.webp',
  },
  {
    title: 'Commercial sewer blockage',
    caption: 'Jetted, CCTV-checked and confirmed clear.',
    tag: 'Commercial',
    loop: 'media/video/sewer-blockage-loop.mp4',
    full: 'media/video/sewer-blockage-full.mp4',
    poster: 'media/video/sewer-blockage-poster.webp',
  },
]

/* ------------------------------ PROJECT GALLERY -------------------------- */
export const gallery = [
  { src: 'media/photos/freestanding-bath.webp', title: 'Freestanding bath & wall mixer', tag: 'Bathroom' },
  { src: 'media/photos/brass-bath-filler.webp', title: 'Brushed brass bath filler', tag: 'Bathroom' },
  { src: 'media/photos/black-vanity-tapware.webp', title: 'Matte black vanity tapware', tag: 'Bathroom' },
  { src: 'media/photos/kitchen-island.webp', title: 'Kitchen island plumbing', tag: 'Kitchen' },
  { src: 'media/photos/rinnai-hot-water.webp', title: 'Continuous-flow hot water', tag: 'Hot water' },
  { src: 'media/photos/sewer-jetter.webp', title: 'High-pressure sewer jetting', tag: 'Drains' },
  { src: 'media/photos/vanity-toilet-install.webp', title: 'Vanity & toilet install', tag: 'Bathroom' },
  { src: 'media/photos/black-kitchen-mixer.webp', title: 'Black gooseneck kitchen mixer', tag: 'Kitchen' },
  { src: 'media/photos/cctv-drain-inspection.webp', title: 'CCTV drain inspection', tag: 'Drains' },
  { src: 'media/photos/hot-water-unit.webp', title: 'Hot water unit replacement', tag: 'Hot water' },
  { src: 'media/photos/kitchen-sink-mixer.webp', title: 'Kitchen sink & mixer', tag: 'Kitchen' },
]

/* --------------------------------- STATS ---------------------------------
   EDIT: replace with your real numbers. */
export const stats = [
  { value: 10, suffix: '+', label: 'Years experience' },
  { value: 2500, suffix: '+', label: 'Jobs completed' },
  { value: 60, suffix: 'min', label: 'Avg. emergency response' },
  { value: 100, suffix: '%', label: 'Satisfaction guarantee' },
]

/* ------------------------------- PROCESS --------------------------------- */
export const process = [
  { step: '01', title: 'Get in touch', text: 'Call or message us. We listen, give honest advice and book a time that suits — often same day.' },
  { step: '02', title: 'Upfront quote', text: 'Clear, fixed pricing before any work starts. No surprises and no call-out fee.' },
  { step: '03', title: 'Expert work', text: 'A licensed plumber arrives on time, protects your home and gets it done properly.' },
  { step: '04', title: 'Guaranteed finish', text: 'We tidy up, test everything and back our workmanship with a guarantee.' },
]

/* ----------------------------- TESTIMONIALS ------------------------------
   EDIT: these are SAMPLE reviews — replace with real Google/Facebook reviews. */
export const testimonials = [
  { quote: 'Burst pipe at 2am — they answered immediately and had it fixed before breakfast. Absolute lifesavers.', name: 'Sarah M.', role: 'Homeowner, Lovely Banks', rating: 5 },
  { quote: 'Plumbed our whole bathroom reno. Spotless work, fair price and genuinely lovely to deal with.', name: 'James & Priya', role: 'Renovation, Geelong', rating: 5 },
  { quote: 'As a landlord I use them for all my properties. Reliable, licensed and always on time.', name: 'David R.', role: 'Landlord, 6 properties', rating: 5 },
]

/* ------------------------------- FAQ ------------------------------------- */
export const faqs = [
  { q: 'Do you really answer 24/7?', a: 'Yes. Plumbing emergencies don’t keep office hours and neither do we. Call any time, day or night.' },
  { q: 'Is there a call-out fee?', a: 'No call-out fee. You get a clear, upfront quote before any work begins.' },
  { q: 'Are you licensed and insured?', a: 'Fully. We hold a Victorian plumbing licence and carry public liability insurance on every job.' },
  { q: 'Which areas do you cover?', a: `We cover ${business.serviceArea} — including Lovely Banks, Ocean Grove, Queenscliff and the Surf Coast. Not sure? Just ask.` },
]
