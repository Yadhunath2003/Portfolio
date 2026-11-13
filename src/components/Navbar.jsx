import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import posthog, { isPosthogEnabled } from '../lib/posthog'

const links = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Certifications', href: '#certifications' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-background/80 backdrop-blur-md border-b border-border'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a
          href="#"
          className="font-mono text-accent font-medium text-lg tracking-tight hover:text-accent-dim transition-colors"
        >
          &lt;Yadhunath Tharakeswaran /&gt;
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors font-medium"
              >
                {link.label}
              </a>
            </li>
          ))}

          <li>
            <a
              href="/assets/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => isPosthogEnabled && posthog.capture('resume_opened', { placement: 'desktop_navigation' })}
              className="text-sm border border-accent text-accent px-4 py-1.5 rounded hover:bg-accent hover:text-background transition-all duration-200"
            >
              Resume
            </a>
          </li>
        </ul>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center gap-3">
          <button
            className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-surface border-b border-border">
          <ul className="flex flex-col px-6 py-4 gap-4">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="/assets/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => isPosthogEnabled && posthog.capture('resume_opened', { placement: 'mobile_navigation' })}
                className="inline-block text-sm border border-accent text-accent px-4 py-1.5 rounded hover:bg-accent hover:text-background transition-all duration-200"
              >
                Resume
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}
