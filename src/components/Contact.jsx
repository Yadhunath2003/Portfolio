import { Mail, Github, Linkedin } from 'lucide-react'
import SectionHeading from './SectionHeading'
import Reveal from './Reveal'

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
    href: 'mailto:yadhunath2003@gmail.com',
    handle: '',
  },
]

export default function Contact() {
  return (
    <section id="contact" className="py-24 px-6 bg-surface">
      <div className="max-w-2xl mx-auto text-center">
        <Reveal><SectionHeading index="06" title="Get In Touch" /></Reveal>

        <Reveal delay="delay-100"><p className="mt-8 text-zinc-600 dark:text-zinc-400 text-base leading-relaxed">
          I'm currently open to internship and full-time opportunities in data
          engineering and backend development. If you have a question, a project
          idea, or just want to connect — feel free to reach out!
        </p></Reveal>

        <Reveal delay="delay-200">
        <a
          href="mailto:yadhunath2003@gmail.com"
          className="inline-block mt-8 px-8 py-3 border border-accent text-accent hover:bg-accent hover:text-white font-semibold rounded-lg transition-all duration-200 shadow-lg shadow-accent/10 hover:shadow-accent/25"
        >
          Say Hello
        </a>
        </Reveal>

        {/* Divider */}
        <Reveal delay="delay-300"><div className="mt-14 h-px bg-border" /></Reveal>

        {/* Social links */}
        <div className="mt-10 grid grid-cols-3 gap-4">
          {socials.map(({ icon: Icon, label, href, handle }, i) => (
            <Reveal key={label} delay={`delay-[${i * 100 + 400}ms]`}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center gap-2 p-4 bg-card border border-border rounded-xl hover:border-accent/40 hover:-translate-y-1 transition-all duration-300"
              >
                <Icon size={20} className="text-zinc-500 group-hover:text-accent transition-colors" />
                <span className="text-xs font-semibold text-zinc-600 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-200 transition-colors">
                  {label}
                </span>
                <span className="text-xs text-zinc-400 dark:text-zinc-600 font-mono group-hover:text-zinc-500 dark:group-hover:text-zinc-400 transition-colors truncate max-w-full px-1">
                  {handle}
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
