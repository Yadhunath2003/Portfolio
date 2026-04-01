import { useEffect, useState } from 'react'
import { ArrowDown, Github, Linkedin, Mail } from 'lucide-react'

const roles = [
  'Data Engineer',
  'Full-Stack Developer',
  'ML / AI Developer',
  'CS Graduate Student @ KU',
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
      {/* Background glow blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl w-full text-center space-y-6 animate-fade-up">
        <p className="font-mono text-accent text-sm tracking-widest uppercase">
          &gt; Hello, world. I am
        </p>

        <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-tight">
          <span className="gradient-text">Yadhunath</span>
        </h1>

        <h2 className="text-xl sm:text-2xl md:text-3xl font-medium text-zinc-400 h-9 flex items-center justify-center gap-2">
          <span>{displayed}</span>
          <span className="w-0.5 h-7 bg-accent animate-blink" />
        </h2>

        <p className="max-w-xl mx-auto text-zinc-400 text-base sm:text-lg leading-relaxed">
          CS grad student at the University of Kansas, specializing in data
          engineering and machine learning. I build systems that handle real
          data at scale — from ETL pipelines to full-stack web apps.
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
            className="px-6 py-2.5 border border-border hover:border-accent text-zinc-300 hover:text-white text-sm font-semibold rounded-lg transition-all duration-200"
          >
            Get In Touch
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
        className="absolute bottom-10 text-zinc-600 hover:text-accent transition-colors animate-bounce"
        aria-label="Scroll down"
      >
        <ArrowDown size={22} />
      </a>
    </section>
  )
}
