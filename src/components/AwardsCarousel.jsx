import { useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, Trophy } from 'lucide-react'

/**
 * Colorful awards slider, adapted from "Carousel" by alexander-rukin on 21st.dev.
 * Swipe/drag, arrows, dots and left/right arrow keys. Neighbouring slides peek
 * in from the sides so it's clear there is more to see; clicking one jumps to it.
 *
 * Each award: { title, org, detail, logo?, color, dark? }
 *   color – slide background; dark – use dark text (for light backgrounds)
 */
const SWIPE_THRESHOLD = 60 // px dragged past which release advances a slide

function useSlideWidth() {
  // Percentage of the viewport each slide takes (the rest is the peek).
  const get = () => (window.matchMedia('(min-width: 768px)').matches ? 64 : 86)
  const [w, setW] = useState(() => (typeof window === 'undefined' ? 86 : get()))
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)')
    const onChange = () => setW(get())
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])
  return w
}

const clamp = (i, count) => Math.max(0, Math.min(count - 1, i))

function AwardSlide({ award, index, count, active }) {
  const text = award.dark ? 'text-zinc-950' : 'text-white'
  const sub = award.dark ? 'text-zinc-900/75' : 'text-white/80'
  return (
    <div
      className={`h-full rounded-2xl p-6 sm:p-8 flex flex-col shadow-xl shadow-black/40 transition-all duration-300 ${
        active ? 'opacity-100 scale-100' : 'opacity-50 scale-[0.94]'
      }`}
      style={{ background: award.color }}
    >
      <div className="flex items-center justify-between gap-4">
        <div className="size-11 rounded-xl bg-white/90 flex items-center justify-center p-2 shrink-0">
          {award.logo ? (
            <img src={award.logo} alt="" className="w-full h-full object-contain" draggable={false} />
          ) : (
            <Trophy size={20} className="text-zinc-900" />
          )}
        </div>
        <span className={`font-mono text-xs tracking-widest ${sub}`}>
          {String(index + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}
        </span>
      </div>

      <h3 className={`mt-8 font-display italic text-3xl sm:text-4xl leading-[1.05] ${text}`}>
        {award.title}
      </h3>
      <p className={`mt-2 text-sm font-semibold ${sub}`}>{award.org}</p>
      <p className={`mt-4 text-sm sm:text-base leading-relaxed ${sub}`}>{award.detail}</p>
    </div>
  )
}

export default function AwardsCarousel({ awards }) {
  const count = awards.length
  const slideW = useSlideWidth()
  const [active, setActive] = useState(0)

  const viewportRef = useRef(null)
  const trackRef = useRef(null)
  const startX = useRef(null)
  const dragging = useRef(false)

  const go = (i) => setActive(clamp(i, count))
  // Center the active slide; translateX % is relative to the track (= viewport width).
  const offset = -active * slideW + (100 - slideW) / 2

  const onPointerDown = (e) => {
    if (count <= 1 || e.button !== 0) return
    startX.current = e.clientX
    dragging.current = false
    if (trackRef.current) trackRef.current.style.transition = 'none'
  }

  const onPointerMove = (e) => {
    const track = trackRef.current
    if (!track || startX.current === null) return
    const dx = e.clientX - startX.current
    if (!dragging.current && Math.abs(dx) > 4) {
      dragging.current = true
      viewportRef.current?.setPointerCapture?.(e.pointerId)
    }
    if (!dragging.current) return
    const vw = viewportRef.current?.clientWidth ?? 1
    // Resist dragging past the first/last slide.
    const resist = (active === 0 && dx > 0) || (active === count - 1 && dx < 0) ? 0.35 : 1
    track.style.transform = `translateX(${(offset / 100) * vw + dx * resist}px)`
  }

  const endDrag = (e) => {
    const track = trackRef.current
    if (track) {
      track.style.transition = ''
      track.style.transform = '' // let the state-driven transform take over again
    }
    if (startX.current !== null && dragging.current) {
      const dx = e.clientX - startX.current
      if (dx <= -SWIPE_THRESHOLD) go(active + 1)
      else if (dx >= SWIPE_THRESHOLD) go(active - 1)
    }
    startX.current = null
    // Keep `dragging` true until after the click event so a drag doesn't count as a click.
    setTimeout(() => { dragging.current = false }, 0)
  }

  const onKeyDown = (e) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); go(active + 1) }
    else if (e.key === 'ArrowLeft') { e.preventDefault(); go(active - 1) }
  }

  if (count === 0) return null

  const arrow =
    'absolute top-1/2 -translate-y-1/2 z-10 size-10 rounded-full bg-black/50 hover:bg-black/70 text-white backdrop-blur hidden sm:flex items-center justify-center transition-colors'

  return (
    <div
      role="group"
      aria-roledescription="carousel"
      aria-label="Awards"
      tabIndex={0}
      onKeyDown={onKeyDown}
      className="outline-none focus-visible:ring-2 focus-visible:ring-accent/60 rounded-2xl"
    >
      <div className="relative">
      <div
        ref={viewportRef}
        className="overflow-hidden py-2 cursor-grab active:cursor-grabbing select-none"
        style={{ touchAction: 'pan-y' }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
      >
        <div
          ref={trackRef}
          className="flex items-stretch"
          style={{
            transform: `translateX(${offset}%)`,
            transition: 'transform .45s cubic-bezier(0.3, 0.8, 0.3, 1)',
          }}
        >
          {awards.map((award, i) => (
            <div
              key={award.title}
              aria-hidden={i !== active}
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${count}`}
              className="shrink-0 px-2 sm:px-3"
              style={{ flexBasis: `${slideW}%` }}
              onClick={() => { if (!dragging.current && i !== active) go(i) }}
            >
              <AwardSlide award={award} index={i} count={count} active={i === active} />
            </div>
          ))}
        </div>
      </div>

      {count > 1 && active > 0 && (
        <button type="button" aria-label="Previous award" onClick={() => go(active - 1)} className={`${arrow} left-1 sm:left-3`}>
          <ChevronLeft size={20} />
        </button>
      )}
      {count > 1 && active < count - 1 && (
        <button type="button" aria-label="Next award" onClick={() => go(active + 1)} className={`${arrow} right-1 sm:right-3`}>
          <ChevronRight size={20} />
        </button>
      )}
      </div>

      {count > 1 && (
        <>
          <div className="mt-5 flex items-center justify-center gap-1.5">
            {awards.map((a, i) => (
              <button
                key={a.title}
                type="button"
                aria-label={`Go to award ${i + 1}`}
                aria-current={i === active}
                onClick={() => go(i)}
                className="h-2 rounded-full transition-all duration-200"
                style={{
                  width: i === active ? 22 : 8,
                  background: i === active ? a.color : 'rgba(255,255,255,.25)',
                }}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
