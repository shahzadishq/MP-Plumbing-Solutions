import { useLayoutEffect, useRef } from 'react'

/**
 * Renders a heading with every word wrapped in a mask so it can rise into
 * view (animated in useScrollAnimations / Hero).
 * parts: array of strings or { t: 'text', grad: true } or { br: true }
 *
 * Highlighted (grad) words are separate elements, so on their own each word
 * would restart the gradient. We size/offset each word's background so one
 * continuous gradient runs across the whole highlighted phrase.
 */
export default function SplitHeading({ as: Tag = 'h2', className = 'section-title', parts }) {
  const ref = useRef(null)

  useLayoutEffect(() => {
    const h = ref.current
    if (!h) return
    const fit = () => {
      const words = [...h.querySelectorAll('.w-in.grad')]
      if (!words.length) return
      // measure the (untransformed) mask wrappers, not the animating words
      const boxes = words.map((w) => w.parentElement.getBoundingClientRect())
      const left = Math.min(...boxes.map((b) => b.left))
      const right = Math.max(...boxes.map((b) => b.right))
      const top = Math.min(...boxes.map((b) => b.top))
      const bottom = Math.max(...boxes.map((b) => b.bottom))
      words.forEach((w, i) => {
        w.style.backgroundSize = `${right - left}px ${bottom - top}px`
        w.style.backgroundPosition = `${left - boxes[i].left}px ${top - boxes[i].top}px`
      })
    }
    fit()
    const ro = new ResizeObserver(fit)
    ro.observe(h)
    document.fonts?.ready.then(fit)
    return () => ro.disconnect()
  }, [])

  let k = 0
  return (
    <Tag ref={ref} className={className} data-split>
      {parts.map((p) => {
        if (p.br) return <br key={k++} />
        const o = typeof p === 'string' ? { t: p } : p
        return o.t.split(/(\s+)/).map((w) =>
          /^\s+$/.test(w) || w === '' ? (
            w ? ' ' : null
          ) : (
            <span className="w" key={k++}>
              <span className={`w-in${o.grad ? ' grad' : ''}`}>{w}</span>
            </span>
          )
        )
      })}
    </Tag>
  )
}
