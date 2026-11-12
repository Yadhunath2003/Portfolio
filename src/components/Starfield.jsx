import { useEffect, useRef } from 'react'

/**
 * Orbiting starfield drawn on a canvas, adapted from "Starfield" by
 * designali-in on 21st.dev.
 *
 * Changes from the original:
 * - fills its positioned parent (absolute inset-0) and follows it with a ResizeObserver
 * - pauses when scrolled off-screen (IntersectionObserver) to save CPU/battery
 * - draws one still frame when the user prefers reduced motion
 * - color is passed as r/g/b numbers so the animation doesn't restart on re-render
 * - transparent between stars, so it layers over other backgrounds
 */
export default function Starfield({
  starCount = 8000,
  waveFrequency = 15,
  starEscapeWidth = 400, // roughly the ring's radius in px
  r = 137, // #89AACC (site accent)
  g = 170,
  b = 204,
  maxOpacity = 200,
  rotationSpeed = 0.0002,
  waveSpeed = 0.005,
  className = '',
}) {
  const containerRef = useRef(null)
  const canvasRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const size = { x: 0, y: 0 }
    let imagedata = null
    let data = null
    let stars = []
    let frame = 0
    let visible = false
    const start = Date.now()
    let t = 0

    const rotate = (cx, cy, x, y, rad) => {
      const cos = Math.cos(rad)
      const sin = Math.sin(rad)
      return { x: cos * (x - cx) + sin * (y - cy) + cx, y: cos * (y - cy) - sin * (x - cx) + cy }
    }

    const setSize = () => {
      size.x = Math.max(1, Math.floor(container.clientWidth))
      size.y = Math.max(1, Math.floor(container.clientHeight))
      canvas.width = size.x
      canvas.height = size.y
      imagedata = ctx.createImageData(size.x, size.y)
      data = new Uint32Array(imagedata.data.buffer)
      stars = []
    }

    const createStar = () => {
      const a = Math.random() * (starEscapeWidth / 2) + 1
      const c = Math.random() * (starEscapeWidth / 2) + starEscapeWidth
      const orbital = (a + c) / 2
      const origin = { x: size.x / 2, y: size.y / 2 + orbital }
      const rotation = Math.PI * Math.random() * 2
      const position = rotate(size.x / 2, size.y / 2, origin.x, origin.y, rotation)
      const opacity = Math.floor((1 - orbital / starEscapeWidth) * maxOpacity + Math.random() * 80)
      stars.push({
        orbital,
        position,
        realPosition: { ...position },
        rSpeed: Math.random() * rotationSpeed + opacity / 20000,
        waveSpeed1: Math.random() * waveSpeed,
        waveSpeed2: Math.random() * waveSpeed,
        wave1: 0,
        wave2: 0,
      })
    }

    const pixel = (s) =>
      Math.floor(s.realPosition.y + s.wave1) * size.x + Math.floor(s.realPosition.x + s.wave2)

    const drawStar = (s) => {
      const prev = pixel(s)
      if (prev >= 0 && prev < data.length) data[prev] = 0

      s.wave1 = Math.sin(t * s.waveSpeed1) * waveFrequency
      s.wave2 = Math.sin(t * s.waveSpeed2) * waveFrequency
      s.realPosition = rotate(size.x / 2, size.y / 2, s.position.x, s.position.y, s.rSpeed * t)
      const opacity = Math.max(
        0,
        Math.min(255, Math.floor((1 - s.orbital / starEscapeWidth) * maxOpacity + Math.random() * 80)),
      )

      const idx = pixel(s)
      if (idx >= 0 && idx < data.length) {
        data[idx] = (opacity << 24) | (b << 16) | (g << 8) | r // ABGR (little-endian)
      }
    }

    const render = () => {
      t = (Date.now() - start) / 10
      if (stars.length < starCount) {
        const n = reduce ? starCount - stars.length : Math.min(100, starCount - stars.length)
        for (let i = 0; i < n; i++) createStar()
      }
      for (const s of stars) drawStar(s)
      ctx.putImageData(imagedata, 0, 0)
    }

    const loop = () => {
      render()
      frame = requestAnimationFrame(loop)
    }
    const play = () => {
      if (reduce) return render() // one still frame
      if (!frame) frame = requestAnimationFrame(loop)
    }
    const pause = () => {
      cancelAnimationFrame(frame)
      frame = 0
    }

    setSize()
    const ro = new ResizeObserver(() => {
      setSize()
      if (visible) play()
    })
    ro.observe(container)

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      visible ? play() : pause()
    })
    io.observe(container)

    return () => {
      pause()
      ro.disconnect()
      io.disconnect()
    }
  }, [starCount, waveFrequency, starEscapeWidth, r, g, b, maxOpacity, rotationSpeed, waveSpeed])

  return (
    <div ref={containerRef} aria-hidden="true" className={`pointer-events-none absolute inset-0 ${className}`}>
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  )
}
