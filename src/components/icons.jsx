/* Inline SVG icons — stroke inherits currentColor */
const base = {
  width: 24,
  height: 24,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

export const Icon = {
  phone: (p) => (
    <svg {...base} width={p?.s || 18} height={p?.s || 18}>
      <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.6A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.5 2.8.6a2 2 0 0 1 1.7 2.1z" />
    </svg>
  ),
  mail: (p) => (
    <svg {...base} width={p?.s || 24} height={p?.s || 24}>
      <rect x="2" y="4" width="20" height="16" rx="3" />
      <path d="m3 6 9 6 9-6" />
    </svg>
  ),
  pin: (p) => (
    <svg {...base} width={p?.s || 24} height={p?.s || 24}>
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  ),
  clock: (p) => (
    <svg {...base} width={p?.s || 20} height={p?.s || 20}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  ),
  check: (p) => (
    <svg {...base} width={p?.s || 16} height={p?.s || 16}>
      <path d="m20 6-11 11-5-5" />
    </svg>
  ),
  star: (p) => (
    <svg width={p?.s || 18} height={p?.s || 18} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2l2.9 6.3 6.9.7-5.1 4.6 1.4 6.8L12 17.8 5.9 20.4l1.4-6.8L2.2 9l6.9-.7L12 2z" />
    </svg>
  ),
  whatsapp: (p) => (
    <svg width={p?.s || 22} height={p?.s || 22} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2a10 10 0 0 0-8.6 15l-1.3 4.7 4.8-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-2.9.8.8-2.8-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.4-.7-1.7-.8-.2-.1-.4-.1-.5.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.1-.2 0-.4.1-.5l.4-.5c.1-.1.1-.3.2-.4 0-.2 0-.3 0-.4l-.7-1.7c-.2-.5-.4-.4-.5-.4h-.5a1 1 0 0 0-.7.3c-.2.3-.9.9-.9 2.2s.9 2.5 1 2.7c.1.2 1.8 2.8 4.4 3.9 1.6.7 2.2.7 3 .6.5 0 1.4-.6 1.6-1.1.2-.6.2-1 .1-1.1l-.3-.2z" />
    </svg>
  ),
  // service icons
  emergency: () => (
    <svg {...base} width={28} height={28}>
      <path d="M13 2 4.5 13.5h6L10 22l9-12h-6l1-8z" />
    </svg>
  ),
  install: () => (
    <svg {...base} width={28} height={28}>
      <path d="M14.7 6.3a4 4 0 0 0-5.4 5.4l-6 6a2 2 0 1 0 3 3l6-6a4 4 0 0 0 5.4-5.4l-2.5 2.5-2.5-.6-.6-2.5 2.6-2.4z" />
    </svg>
  ),
  drain: () => (
    <svg {...base} width={28} height={28}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 3v18M3 12h18M6 6l12 12M18 6 6 18" />
    </svg>
  ),
  heating: () => (
    <svg {...base} width={28} height={28}>
      <path d="M12 2c2 3 3 5 3 7a3 3 0 0 1-6 0c0-.8.3-1.6.7-2.3" />
      <path d="M12 22a6 6 0 0 0 6-6c0-2-1-4-2-5" />
      <path d="M12 22a6 6 0 0 1-6-6c0-1 .3-2 .7-2.8" />
    </svg>
  ),
  leak: () => (
    <svg {...base} width={28} height={28}>
      <path d="M12 3c-3 4-5 6.5-5 9.5a5 5 0 0 0 10 0C17 9.5 15 7 12 3z" />
      <path d="M9.5 13a2.5 2.5 0 0 0 2.5 2.5" />
    </svg>
  ),
  maintenance: () => (
    <svg {...base} width={28} height={28}>
      <path d="M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1" />
      <circle cx="12" cy="12" r="3.5" />
    </svg>
  ),
  arrow: (p) => (
    <svg {...base} width={p?.s || 18} height={p?.s || 18}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  ),
  play: (p) => (
    <svg width={p?.s || 40} height={p?.s || 40} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="10" />
      <path d="M10 8.5v7l6-3.5-6-3.5z" fill="currentColor" />
    </svg>
  ),
  instagram: (p) => (
    <svg {...base} width={p?.s || 20} height={p?.s || 20}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
    </svg>
  ),
  facebook: (p) => (
    <svg {...base} width={p?.s || 20} height={p?.s || 20}>
      <path d="M14 8h-2a2 2 0 0 0-2 2v12M8 13h6" />
      <path d="M18 2a10 10 0 1 1-12 0" opacity="0" />
      <path d="M10 22V10a2 2 0 0 1 2-2h2" />
    </svg>
  ),
  google: (p) => (
    <svg width={p?.s || 20} height={p?.s || 20} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 11v2.8h4a3.9 3.9 0 0 1-3.9 2.9 4.3 4.3 0 1 1 2.8-7.6l1.9-1.9A7 7 0 1 0 19 12.3c0-.4 0-.9-.1-1.3H12z" />
    </svg>
  ),
  shield: (p) => (
    <svg {...base} width={p?.s || 24} height={p?.s || 24}>
      <path d="M12 2 4 5v6c0 5 3.4 8.5 8 11 4.6-2.5 8-6 8-11V5l-8-3z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  ),
  drop: (p) => (
    <svg width={p?.s || 54} height={p?.s || 54} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2c-4 5-7 8.5-7 12.5a7 7 0 0 0 14 0C19 10.5 16 7 12 2z" />
    </svg>
  ),
}
