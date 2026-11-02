/* =============================================================================
   MP PLUMBING SOLUTIONS — SITE CONFIG
   -----------------------------------------------------------------------------
   👉 EDIT EVERYTHING HERE. All text, contact details, services, stats and
   testimonials used across the site are read from this single file.
   Replace the PLACEHOLDER values marked with  // EDIT  with your real info.
   ========================================================================== */

export const business = {
  name: 'MP Plumbing Solutions',
  tagline: 'Premium Plumbing, Done Right',
  subheading:
    'Fast, reliable and fully certified plumbers. From 24/7 emergencies to flawless installations — we keep your water flowing and your home running.',

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

  // --- SOCIAL (EDIT or remove) ---------------------------------------------
  social: {
    facebook: '',    // EDIT — add your Facebook page URL (leave '' to hide)
    instagram: 'https://www.instagram.com/mpplumbingsolutionsgeelong/',
    google: '',      // EDIT — add Google Business profile URL (leave '' to hide)
  },

  // --- TRUST BADGES (EDIT to match your licences) ---------------------------
  badges: [
    'Licensed & Insured',
    'Victorian Plumbing Licence',
    'Fully Insured',
    'No Call-Out Fee',
  ],
}

/* -----------------------------------------------------------------------------
   SERVICES  — the "featured: true" one is highlighted in the grid.
   icon keys map to the inline SVG set in /components/icons.jsx
   -------------------------------------------------------------------------- */
export const services = [
  {
    icon: 'emergency',
    title: '24/7 Emergency Plumbing',
    featured: true,
    blurb:
      'Burst pipes, major leaks, no hot water? We answer day or night and are on our way — fast response, no panic.',
    points: ['Rapid call-out', 'Burst & leak repair', 'Water damage control'],
  },
  {
    icon: 'install',
    title: 'Installations & Fitting',
    blurb:
      'Taps, toilets, showers, radiators and full bathroom suites fitted to a flawless, long-lasting finish.',
    points: ['Bathrooms & kitchens', 'Taps & showers', 'Radiators & valves'],
  },
  {
    icon: 'drain',
    title: 'Drains & Blockages',
    blurb:
      'Blocked drains and slow waste cleared quickly with CCTV surveys to find the root cause — not just the symptom.',
    points: ['Drain unblocking', 'CCTV surveys', 'High-pressure jetting'],
  },
  {
    icon: 'heating',
    title: 'Heating & Boilers',
    blurb:
      'Boiler installs, servicing and repairs plus central heating care to keep your home warm and efficient.',
    points: ['Boiler install & repair', 'Central heating', 'Water heaters'],
  },
  {
    icon: 'leak',
    title: 'Leak Detection',
    blurb:
      'Non-invasive leak detection pinpoints hidden leaks behind walls and under floors before they cause damage.',
    points: ['Thermal detection', 'Pressure testing', 'Pipe repair'],
  },
  {
    icon: 'maintenance',
    title: 'Maintenance Plans',
    blurb:
      'Scheduled check-ups and priority support for homeowners and landlords who want total peace of mind.',
    points: ['Annual servicing', 'Priority booking', 'Landlord certificates'],
  },
]

/* --------------------------------- STATS --------------------------------- */
export const stats = [
  { value: 15, suffix: '+', label: 'Years experience' },
  { value: 4800, suffix: '+', label: 'Jobs completed' },
  { value: 60, suffix: 'min', label: 'Avg. emergency response' },
  { value: 100, suffix: '%', label: 'Satisfaction guarantee' },
]

/* ------------------------------- PROCESS --------------------------------- */
export const process = [
  {
    step: '01',
    title: 'Get in touch',
    text: 'Call or message us. We listen, give honest advice and book a time that suits you — often same day.',
  },
  {
    step: '02',
    title: 'Upfront quote',
    text: 'Clear, fixed pricing before any work starts. No surprises, no hidden call-out fees — ever.',
  },
  {
    step: '03',
    title: 'Expert work',
    text: 'Certified engineers arrive on time, treat your home with respect and get the job done properly.',
  },
  {
    step: '04',
    title: 'Guaranteed finish',
    text: 'We tidy up, test everything and back our workmanship with a solid guarantee for your peace of mind.',
  },
]

/* ----------------------------- TESTIMONIALS ------------------------------ */
export const testimonials = [
  {
    quote:
      'Burst pipe at 2am — they answered immediately and had it fixed before breakfast. Absolute lifesavers.',
    name: 'Sarah M.',
    role: 'Homeowner, Lovely Banks',
    rating: 5,
  },
  {
    quote:
      'Fitted our entire bathroom. Spotless work, fair price and genuinely lovely to deal with. Highly recommend.',
    name: 'James & Priya',
    role: 'Renovation, Geelong',
    rating: 5,
  },
  {
    quote:
      'As a landlord I use them for all my properties. Reliable, licensed and always on time. Can’t fault them.',
    name: 'David R.',
    role: 'Landlord, 6 properties',
    rating: 5,
  },
  {
    quote:
      'Sorted a leak two other plumbers couldn’t find. Used proper detection kit and fixed it same day.',
    name: 'Elaine T.',
    role: 'Homeowner, Bell Post Hill',
    rating: 5,
  },
]

/* ------------------------------- FAQ ------------------------------------- */
export const faqs = [
  {
    q: 'Do you really answer 24/7?',
    a: 'Yes. Plumbing emergencies don’t keep office hours and neither do we. Call any time, day or night, and a real person will help.',
  },
  {
    q: 'Is there a call-out fee?',
    a: 'No call-out fee. You get a clear, upfront quote before any work begins so you always know where you stand.',
  },
  {
    q: 'Are you licensed and insured?',
    a: 'Fully. We hold a Victorian plumbing licence and carry full public liability insurance on every job, so you’re always protected.',
  },
  {
    q: 'Which areas do you cover?',
    a: `We cover ${business.serviceArea}. Not sure if you’re in range? Just ask — we’ll let you know straight away.`,
  },
]
