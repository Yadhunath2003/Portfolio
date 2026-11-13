import { useEffect, useState } from 'react'
import { ArrowUpRight, FileText, Github, Linkedin, Mail } from 'lucide-react'
import RingLink from './RingLink'
import Starfield from './Starfield'
import posthog, { isPosthogEnabled } from '../lib/posthog'

// Hero layout and motion adapted from the Hirael portfolio template (MIT).
const roles = [
  'Data Engineer',
  'Machine Learning Engineer',
  'Backend Developer',
  'M.S. CS @ University of Kansas',
]

/** Original typewriter: type each role, hold, erase, move to the next. */
function useTypewriter(words, { type = 60, hold = 2000, erase = 35 } = {}) {
  const [index, setIndex] = useState(0)
  const [text, setText] = useState('')
  const [deleting, setDeleting] = useState(false)
  const reduce =
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  useEffect(() => {
    const word = words[index]
    let t
    if (reduce) {
      // No typing animation: show each whole role, swapping every few seconds.
      setText(word)
      t = setTimeout(() => setIndex((i) => (i + 1) % words.length), hold + 1000)
    } else if (!deleting && text.length < word.length) {
      t = setTimeout(() => setText(word.slice(0, text.length + 1)), type)
    } else if (!deleting) {
      t = setTimeout(() => setDeleting(true), hold)
    } else if (text.length > 0) {
      t = setTimeout(() => setText(text.slice(0, -1)), erase)
    } else {
      setDeleting(false)
      setIndex((i) => (i + 1) % words.length)
    }
    return () => clearTimeout(t)
  }, [text, deleting, index, words, reduce, type, hold, erase])

  return text
}

const socials = [
  { icon: Github, href: 'https://github.com/Yadhunath2003', label: 'GitHub' },
  { icon: Linkedin, href: 'https://linkedin.com/in/yadhunath-t', label: 'LinkedIn' },
  { icon: Mail, href: 'mailto:yadhunath2003@gmail.com', label: 'Email' },
]

/** Staggered blur-in entrance: each element waits a little longer. */
const stagger = (i) => ({ animationDelay: `${300 + i * 100}ms` })

export default function Hero() {
  const typed = useTypewriter(roles)

  return (
    <section
      id="home"
      className="relative min-h-dvh flex flex-col items-center justify-center px-6 pt-20 pb-28 overflow-hidden"
    >
      {/* Dot grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, var(--dot-color) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
          maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)',
        }}
      />

      {/* Orbiting starfield (designali-in, 21st.dev) */}
      <Starfield starEscapeWidth={420} />

      {/* Drifting orbs + center glow */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl pointer-events-none animate-drift" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent-dim/10 rounded-full blur-3xl pointer-events-none animate-drift-slow" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] max-w-full h-[300px] bg-white/[0.03] rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center text-center max-w-4xl w-full">
        <h1 className="animate-name-reveal mb-6 font-display italic text-6xl sm:text-7xl md:text-8xl lg:text-9xl leading-[0.9] tracking-tight text-zinc-100">
          Yadhunath
        </h1>

        {/* Typewriter roles in the coding font */}
        <p
          className="animate-blur-in mb-6 flex min-h-[2rem] items-center justify-center gap-1 font-mono text-base sm:text-xl md:text-2xl text-accent"
          style={stagger(1)}
          aria-label={roles.join(', ')}
        >
          <span aria-hidden="true">{typed}</span>
          <span aria-hidden="true" className="inline-block h-[1.1em] w-[0.55em] bg-accent/80 animate-blink" />
        </p>

        <p
          className="animate-blur-in mb-8 max-w-xl text-sm sm:text-base text-zinc-400 leading-relaxed"
          style={stagger(2)}
        >
          Master&apos;s student in Computer Science at the University
          of Kansas, specializing in Data Science &amp; Engineering. Love building data
          pipelines, machine learning models, and backend systems, ETL
          workflows, and personal products.
        </p>

        {/* Open to work */}
        <a
          href="#contact"
          className="animate-blur-in mb-8 inline-flex items-center gap-2 rounded-full border border-border bg-card/70 backdrop-blur px-3 py-1 text-xs font-medium text-zinc-300 hover:border-accent/40 transition-colors"
          style={stagger(3)}
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          Open to internships &amp; full-time roles
        </a>

        {/* CTAs */}
        <div
          className="animate-blur-in flex flex-wrap items-center justify-center gap-4"
          style={stagger(4)}
        >
          <RingLink
            href="#projects"
            outerClassName="transition-transform duration-300 hover:scale-105"
            innerClassName="bg-zinc-100 px-7 py-3.5 text-sm font-medium text-background group-hover:bg-background group-hover:text-zinc-100"
          >
            View My Work
          </RingLink>
          <RingLink
            href="#contact"
            outerClassName="transition-transform duration-300 hover:scale-105"
            innerClassName="border-2 border-border bg-background px-7 py-3.5 text-sm font-medium text-zinc-100 group-hover:border-transparent"
          >
            Get In Touch
          </RingLink>
          <RingLink
            href="/assets/resume.pdf"
            target="_blank"
            onClick={() => isPosthogEnabled && posthog.capture('resume_opened', { placement: 'hero' })}
            outerClassName="transition-transform duration-300 hover:scale-105"
            innerClassName="border-2 border-border bg-background px-7 py-3.5 text-sm font-medium text-zinc-100 group-hover:border-transparent"
          >
            <FileText size={15} />
            Resume
            <ArrowUpRight size={14} />
          </RingLink>
        </div>

        {/* Socials */}
        <div className="animate-blur-in flex items-center justify-center gap-5 pt-8" style={stagger(5)}>
          {socials.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              onClick={() => {
                if (isPosthogEnabled && label !== 'Email') {
                  posthog.capture('social_profile_opened', { platform: label.toLowerCase(), placement: 'hero' })
                }
              }}
              className="text-zinc-500 hover:text-accent transition-colors duration-200"
            >
              <Icon size={20} />
            </a>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#about"
        aria-label="Scroll down"
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 flex flex-col items-center gap-3 group"
      >
        <span className="text-xs uppercase tracking-[0.2em] text-zinc-500 group-hover:text-zinc-300 transition-colors">
          Scroll
        </span>
        <span className="relative block h-10 w-px overflow-hidden bg-border">
          <span className="accent-gradient animate-scroll-down absolute inset-x-0 top-0 block h-1/2 w-full" />
        </span>
      </a>
    </section>
  )
}
