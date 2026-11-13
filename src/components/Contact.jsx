import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { Mail, Github, Linkedin } from 'lucide-react'
import Reveal from './Reveal'
import Starfield from './Starfield'
import { track } from '../lib/analytics'

const EMAIL = 'yadhunath2003@gmail.com'

const socials = [
  {
    icon: Github,
    label: 'GitHub',
    href: 'https://github.com/Yadhunath2003',
    handle: '',
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/yadhunath-t',
    handle: '',
  },
  {
    icon: Mail,
    label: 'Email',
    href: `mailto:${EMAIL}`,
    handle: '',
  },
]

/**
 * Endless "Get in touch •" band, adapted from the Hirael portfolio template's
 * footer marquee (MIT). Two identical groups slide left by 50% and repeat, so
 * the loop is seamless. Stays still under prefers-reduced-motion.
 */
function Marquee({ text = 'Get in touch', repeat = 8 }) {
  const trackRef = useRef(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const ctx = gsap.context(() => {
      gsap.to(trackRef.current, { xPercent: -50, duration: 40, ease: 'none', repeat: -1 })
    })
    return () => ctx.revert()
  }, [])

  return (
    <div className="flex overflow-hidden" aria-hidden="true">
      <div ref={trackRef} className="flex w-max shrink-0">
        {[0, 1].map((group) => (
          <div key={group} className="flex shrink-0">
            {Array.from({ length: repeat }).map((_, i) => (
              <span
                key={i}
                className="whitespace-nowrap px-6 font-display italic text-5xl md:text-7xl lg:text-8xl leading-none tracking-tight text-zinc-100/90"
              >
                {text} <span className="text-accent">&bull;</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden py-24 bg-surface">
      {/* Orbiting starfield behind the content */}
      <Starfield starEscapeWidth={340} starCount={6000} />

      <div className="relative z-10">
        {/* Eyebrow, matching the other section headings */}
        <div className="mb-10 flex items-center justify-center gap-3 px-6">
          <span className="h-px w-8 bg-border" />
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-zinc-500">06.</span>
          <span className="h-px w-8 bg-border" />
        </div>

        {/* Visible to screen readers instead of the decorative marquee */}
        <h2 className="sr-only">Get in touch</h2>
        <Marquee />

        <div className="max-w-2xl mx-auto px-6 text-center">
          <Reveal delay={100}><p className="mt-14 text-zinc-400 text-base leading-relaxed">
            I'm currently open to internship and full-time opportunities in data
            engineering and backend development. If you have a question, a project
            idea, or just want to connect — feel free to reach out!
          </p></Reveal>

          {/* Social links */}
          <div className="mt-12 grid grid-cols-3 gap-4">
            {socials.map(({ icon: Icon, label, href, handle }, i) => (
              <Reveal key={label} delay={i * 100 + 200}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => track('contact_clicked', { channel: label.toLowerCase(), location: 'contact' })}
                  className="group flex flex-col items-center gap-2 p-4 bg-card/80 backdrop-blur border border-border rounded-xl hover:border-accent/40 hover:-translate-y-1 transition-all duration-300"
                >
                  <Icon size={20} className="text-zinc-500 group-hover:text-accent transition-colors" />
                  <span className="text-xs font-semibold text-zinc-400 group-hover:text-zinc-200 transition-colors">
                    {label}
                  </span>
                  {handle && (
                    <span className="text-xs text-zinc-600 font-mono group-hover:text-zinc-400 transition-colors truncate max-w-full px-1">
                      {handle}
                    </span>
                  )}
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
