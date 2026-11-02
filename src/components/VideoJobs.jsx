import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { videos, asset } from '../config/siteConfig'
import { Icon } from './icons'
import SplitHeading from './SplitHeading'
import Stats from './Stats'

/* Muted, sped-up loops autoplay only while on screen (saves data/battery).
   "Watch with sound" opens the full clip in a modal. */
function VideoCard({ v, onOpen }) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) el.play().catch(() => {})
        else el.pause()
      },
      { threshold: 0.25 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <article className="video-card">
      <video
        ref={ref}
        src={asset(v.loop)}
        poster={asset(v.poster)}
        muted
        loop
        playsInline
        preload="none"
        aria-label={v.title}
      />
      <span className="video-tag">{v.tag}</span>
      <span className="video-live"><i /> Real job</span>
      <div className="video-info">
        <h3>{v.title}</h3>
        <p>{v.caption}</p>
        <button className="video-play" onClick={() => onOpen(v)}>
          <span><Icon.playSolid s={14} /></span> Watch with sound
        </button>
      </div>
    </article>
  )
}

export default function VideoJobs() {
  const [open, setOpen] = useState(null)

  useEffect(() => {
    if (!open) return
    window.__lenis?.stop()
    const onKey = (e) => e.key === 'Escape' && setOpen(null)
    window.addEventListener('keydown', onKey)
    return () => {
      window.__lenis?.start()
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <section id="jobs" className="sec-dark sheet">
      <div className="container">
        <div className="section-head">
          <div>
            <span className="eyebrow reveal">Recent jobs</span>
            <SplitHeading parts={['Real work, ', { t: 'real results.', grad: true }]} />
          </div>
          <p className="section-lead reveal">
            A few recent call-outs from around Geelong — filmed on the job, start to finish.
          </p>
        </div>

        <div className="videos-grid" data-stagger="rise">
          {videos.map((v) => (
            <VideoCard key={v.title} v={v} onOpen={setOpen} />
          ))}
        </div>

        <div style={{ marginTop: 'clamp(60px, 8vw, 100px)' }}>
          <Stats />
        </div>
      </div>

      {open && createPortal(
        <div className="video-modal" onClick={() => setOpen(null)} data-lenis-prevent>
          <button className="video-modal-close" aria-label="Close video" onClick={() => setOpen(null)}>
            ×
          </button>
          <video
            src={asset(open.full)}
            poster={asset(open.poster)}
            controls
            autoPlay
            playsInline
            onClick={(e) => e.stopPropagation()}
          />
        </div>,
        document.body
      )}
    </section>
  )
}
