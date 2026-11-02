/**
 * Renders a heading with every word wrapped in a mask so it can rise into
 * view (animated in useScrollAnimations / Hero).
 * parts: array of strings or { t: 'text', grad: true } or { br: true }
 */
export default function SplitHeading({ as: Tag = 'h2', className = 'section-title', parts }) {
  let k = 0
  return (
    <Tag className={className} data-split>
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
