# MP Plumbing Solutions — Website

A modern, 3D animated marketing website for **MP Plumbing Solutions** (Geelong, VIC),
built with **React + Vite**, **three.js** (via @react-three/fiber), and **GSAP** scroll animations.

## ✨ Features

- Interactive 3D plumbing hero (glass pipes with flowing water, valve, gauge, dripping tap) that reacts to scroll
- Logo intro + curtain reveal, word-by-word headline animations
- Real job videos (autoplay loops + full clips with sound) and a pinned horizontal project gallery
- Buttery smooth scrolling (Lenis) synced with GSAP ScrollTrigger reveal animations
- Animated stat counters, hover-reactive service cards, FAQ accordion
- Fully responsive (desktop → mobile) with a mobile menu
- Accessible: respects `prefers-reduced-motion`
- Click-to-call / WhatsApp / email + a call-back form that opens a pre-filled email
- **One config file** for all business content — no code digging required

## 🚀 Getting started

```bash
npm install      # install dependencies
npm run dev      # start local dev server (http://localhost:5173)
npm run build    # production build -> /dist
npm run preview  # preview the production build
```

## 📝 Editing content

**Everything** — services, phone, email, address, hours, testimonials, FAQs,
stats, trust badges — lives in **one file**:

```
src/config/siteConfig.js
```

Open it, change the text, save. That's it.

## 🖼️ Photos, videos & logo

- Logo + favicons: `public/brand/` (cut from the client's logo file)
- Photos: `public/media/photos/` · Videos: `public/media/video/`
- Which photo/video appears where is set in `src/config/siteConfig.js`
  (`services[].image`, `videos`, `gallery`). See `public/media/README.txt`.

## 📨 Contact form

The call-back form currently opens the visitor's email app pre-filled (no server
needed). To collect submissions automatically instead, connect it to a service
like Formspree, Netlify Forms, or your own endpoint in
`src/components/Contact.jsx`.

## 🏗️ Project structure

```
src/
  config/siteConfig.js      <- EDIT ALL CONTENT HERE
  components/               <- UI sections + 3D scene
  hooks/                    <- smooth scroll + scroll animations
  styles/global.css         <- theme + all styling
public/
  media/                    <- your photos & videos
  favicon.svg
```

## 🎨 Theme

Brand colour is the logo blue `#2c489b`. Colours are CSS variables at the top of
`src/styles/global.css` (`:root`). Sections use `.sec-dark` / `.sec-light`
themes and alternate down the page.

## ☁️ Deploying

The `dist/` folder is a static site — deploy it to Netlify, Vercel, Cloudflare
Pages, or any static host. Build command: `npm run build`, output dir: `dist`.
