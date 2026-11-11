import { useEffect, useRef, useState } from 'react'
import SectionHeading from './SectionHeading'
import Reveal from './Reveal'

// Scroll-drawn timeline adapted from "Scroll animated timeline" by ibrandify on 21st.dev (MIT).
const jobs = [
  {
    title: 'Graduate Teaching Assistant',
    company: 'University of Kansas',
    companyUrl: 'https://ku.edu',
    period: 'Jan 2026 — Present',
    location: 'Lawrence, KS',
    bullets: [
      'Lead lab sections and discussion sessions for Embedded Systems & Programming Paradigms courses.',
      'Collaborate with professors to design lecture content and lab assignments.',
      'Guide students through hands-on exercises while providing real-time debugging support.',
    ],
  },
  {
    title: 'Database Editor',
    company: 'KU Physics & Astronomy Department',
    companyUrl: 'https://physics.ku.edu',
    period: 'Jul 2025 — Dec 2025',
    location: 'Lawrence, KS',
    bullets: [
      'Automated course-substitution, grade-tracking, and reporting workflows using custom FileMaker Pro scripts.',
      'Reduced manual administrative effort by 30% through workflow automation.',
      'Maintained relational databases for 100+ graduate students, improving data accuracy.',
    ],
  },
  {
    title: 'Engineering Camp Assistant',
    company: 'University of Kansas',
    companyUrl: 'https://ku.edu',
    period: 'Jul 2024 & Jul 2025',
    location: 'Lawrence, KS',
    bullets: [
      'Facilitated a 2-week summer camp for middle school students to explore engineering concepts and careers.',
      'Led hands-on workshops covering Arduino, Python, and basic robotics — guiding campers through builds, debugging, and demos.',
      'Represented KU Engineering at camp-wide events, sharing college experience and answering student questions.',
    ],
  },
  {
    title: 'Information Technology Technician',
    company: 'University of Kansas',
    companyUrl: 'https://ku.edu',
    period: 'May 2024 — Jul 2025',
    location: 'Lawrence, KS',
    bullets: [
      'Diagnosed and resolved 50+ weekly hardware, software, and Microsoft 365 tickets.',
      'Sustained a 95%+ resolution rate across TDX and ServiceNow platforms.',
      'Delivered accurate documentation with minimal escalations to leadership.',
    ],
  },
]

function useTimelineProgress(ref) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setProgress(1)
      return
    }
    let frame = 0
    const update = () => {
      frame = 0
      const el = ref.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      // The line reaches a point when it crosses the middle of the screen.
      const p = (window.innerHeight / 2 - rect.top) / rect.height
      setProgress(Math.max(0, Math.min(1, p)))
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [ref])

  return progress
}

export default function Experience() {
  const timelineRef = useRef(null)
  const progress = useTimelineProgress(timelineRef)

  return (
    <section id="experience" className="py-24 px-6 bg-surface">
      <div className="max-w-5xl mx-auto">
        <Reveal><SectionHeading index="02" title="Where I've" accent="worked" /></Reveal>

        <div ref={timelineRef} className="relative mt-16">
          {/* Faded track */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border -translate-x-1/2" />
          {/* Line that draws as you scroll */}
          <div
            className="absolute left-4 md:left-1/2 top-0 w-[2px] -translate-x-1/2 bg-gradient-to-b from-accent to-accent-dim transition-[height] duration-100 ease-out"
            style={{ height: `${progress * 100}%` }}
          />

          <ol className="relative flex flex-col gap-14 md:gap-20">
            {jobs.map((job, i) => {
              const threshold = i / (jobs.length - 1 || 1)
              const active = progress >= threshold - 0.05
              const left = i % 2 === 0 // even items sit on the left (desktop)

              return (
                <li
                  key={job.title}
                  className={`relative flex flex-col md:flex-row ${left ? 'md:flex-row-reverse' : ''} items-start`}
                >
                  {/* Dot */}
                  <span
                    className={`absolute left-4 md:left-1/2 top-6 size-4 -translate-x-1/2 rounded-full border-2 transition-all duration-500 z-10 ${
                      active
                        ? 'border-accent bg-background scale-125 shadow-[0_0_12px_rgba(137,170,204,0.6)]'
                        : 'border-border bg-zinc-800 scale-100'
                    }`}
                  />

                  {/* Empty half pushes the card to one side on desktop */}
                  <div className="hidden md:block md:w-1/2" />

                  <div
                    className={`w-full md:w-1/2 pl-12 ${left ? 'md:pl-0 md:pr-12' : 'md:pl-12'} transition-all duration-700 ease-out ${
                      active ? 'opacity-100 translate-y-0' : 'opacity-30 translate-y-8'
                    }`}
                  >
                    <div className={`bg-card border border-border rounded-2xl p-6 transition-colors duration-500 ${active ? 'border-accent/30' : ''}`}>
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                        <span className="font-mono text-xs tracking-widest text-zinc-400 bg-zinc-900 border border-border px-3 py-1 rounded-full">
                          {job.period}
                        </span>
                        <span className="text-xs text-zinc-500">{job.location}</span>
                      </div>

                      <h3 className="font-display italic text-2xl sm:text-3xl leading-tight text-zinc-100">
                        {job.title}
                      </h3>
                      <a
                        href={job.companyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-1 inline-block text-sm font-medium text-accent hover:underline underline-offset-2"
                      >
                        @ {job.company}
                      </a>

                      <ul className="mt-4 space-y-2">
                        {job.bullets.map((b) => (
                          <li key={b} className="flex gap-3 text-sm text-zinc-400 leading-relaxed">
                            <span className="text-accent mt-0.5 shrink-0">▹</span>
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </li>
              )
            })}
          </ol>
        </div>
      </div>
    </section>
  )
}
