import { useEffect, useState } from 'react'
import { ArrowDown, FileText, Github, Linkedin, Mail } from 'lucide-react'

const roles = [
  'Data Engineer',
  'Machine Learning Engineer',
  'Backend Developer',
  'M.S. CS @ University of Kansas',
]

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = roles[roleIndex]
    let timeout

    if (!deleting && displayed.length < current.length) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 60)
    } else if (!deleting && displayed.length === current.length) {
      timeout = setTimeout(() => setDeleting(true), 2000)
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 35)
    } else if (deleting && displayed.length === 0) {
      setDeleting(false)
      setRoleIndex((i) => (i + 1) % roles.length)
    }

    return () => clearTimeout(timeout)
  }, [displayed, deleting, roleIndex])

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden"
    >
      {/* Dot grid — uses CSS variable so it adapts to light/dark */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, var(--dot-color) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
          maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)',
        }}
      />

      {/* Animated drifting orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl pointer-events-none animate-drift" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none animate-drift-slow" />

      {/* Radial accent glow behind text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-accent/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl w-full text-center space-y-6 animate-fade-up">
        <a
          href="#contact"
          className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 backdrop-blur px-3 py-1 text-xs font-medium text-zinc-600 dark:text-zinc-300 hover:border-accent/40 transition-colors"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          Open to internships &amp; full-time roles
        </a>

        <p className="font-mono text-accent text-sm tracking-widest uppercase">
          &gt; Hello, world. I am
        </p>

        <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-tight">
          <span className="gradient-text">Yadhunath</span>
        </h1>

        <h2 className="text-xl sm:text-2xl md:text-3xl font-medium text-zinc-600 dark:text-zinc-400 h-9 flex items-center justify-center gap-2">
          <span>{displayed}</span>
          <span className="w-0.5 h-7 bg-accent animate-blink" />
        </h2>

        <p className="max-w-xl mx-auto text-zinc-600 dark:text-zinc-400 text-base sm:text-lg leading-relaxed">
          Thesis-track Master&apos;s student in Computer Science at the University
          of Kansas, specializing in Data Science &amp; Engineering. I build data
          pipelines, machine learning models, and backend systems, from ETL
          workflows to a hackathon-winning, real-time AI app for first responders.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <a
            href="#projects"
            className="px-6 py-2.5 bg-accent hover:bg-accent-dim text-white text-sm font-semibold rounded-lg transition-all duration-200 shadow-lg shadow-accent/20 hover:shadow-accent/30"
          >
            View My Work
          </a>
          <a
            href="#contact"
            className="px-6 py-2.5 border border-border hover:border-accent text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white text-sm font-semibold rounded-lg transition-all duration-200"
          >
            Get In Touch
          </a>
          <a
            href="/assets/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-2.5 text-zinc-700 dark:text-zinc-300 hover:text-accent text-sm font-semibold rounded-lg transition-colors duration-200"
          >
            <FileText size={16} />
            Resume
          </a>
        </div>

        {/* Social icons */}
        <div className="flex items-center justify-center gap-5 pt-4">
          {[
            { icon: Github, href: 'https://github.com/Yadhunath2003', label: 'GitHub' },
            { icon: Linkedin, href: 'https://linkedin.com/in/yadhunath-t', label: 'LinkedIn' },
            { icon: Mail, href: 'mailto:yadhunath2003@gmail.com', label: 'Email' },
          ].map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
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
        className="absolute bottom-10 text-zinc-400 dark:text-zinc-600 hover:text-accent transition-colors animate-bounce"
        aria-label="Scroll down"
      >
        <ArrowDown size={22} />
      </a>
    </section>
  )
}
