import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowUpRight } from 'lucide-react'
import SectionHeading from './SectionHeading'
import RingLink from './RingLink'
import ProjectDrawer from './ProjectDrawer'
import posthog, { isPosthogEnabled } from '../lib/posthog'

gsap.registerPlugin(ScrollTrigger)

// `rotate` tilts each card in the moving gallery (degrees).
const featured = [
  {
    title: 'FirstResponseAI',
    description:
      'A voice-first incident command app for emergency responders. A Next.js frontend and FastAPI backend use Gemini for AI-powered dispatch parsing and ElevenLabs for real-time voice synthesis across phone and operator views. Won Best Use of ElevenLabs at HackKU 2026.',
    image: '/assets/ccad.jpg',
    tags: ['Next.js', 'FastAPI', 'Gemini API', 'ElevenLabs API', 'WebSockets'],
    ribbon: 'Hackathon Winner',
    github: 'https://github.com/Yadhunath2003/FirstResponseAI',
    live: 'https://devpost.com/software/firstresponse-ai-4us081',
    rotate: -4,
  },
  {
    title: 'HawkLoop',
    description:
      'A capstone web and mobile application that helps University of Kansas students track campus buses in real time, improving accessibility and reducing wait times. Built a Django backend with live GPS data, a React web frontend, and an Expo.js mobile app — all backed by PostgreSQL.',
    image: '/assets/Hawkloop.png',
    tags: ['Django', 'React', 'PostgreSQL', 'Expo.js'],
    github: 'https://github.com/CaribTechProduction/EECS-582-HawkLoop',
    live: 'https://github.com/CaribTechProduction/EECS-582-HawkLoop',
    rotate: 3,
  },
  {
    title: 'Register Your Rep',
    description:
      'An AI-powered web app that generates personalized workout plans and lets users track their progress over time. Integrated Google Gemini API for plan generation, with a Next.js frontend, React components, and MongoDB for persistent user data. Deployed on Vercel.',
    image: '/assets/ryr.png',
    tags: ['Next.js', 'React', 'MongoDB', 'Gemini API', 'Vercel'],
    github: 'https://github.com/AyaanLakhani/RegisterYourRep',
    live: 'https://register-ur-rep.vercel.app/',
    rotate: -2,
  },
  {
    title: 'Cyclistic Data Analysis',
    description:
      'Cleaned and analyzed 800,000+ bike-share ride records with PostgreSQL and Excel, then built SQL queries, R visualizations, and a Tableau dashboard comparing casual riders and members to support subscriber-conversion strategy.',
    image: '/assets/cyclistic.png',
    tags: ['R', 'PostgreSQL', 'SQL', 'Tableau'],
    github: 'https://www.kaggle.com/code/yadhunath/cyclistic-dataset',
    rotate: 4,
  },
  {
    title: 'BlockBadge',
    description:
      'A hackathon project — tamper-proof credentialing system using blockchain to verify and authenticate educational and professional achievements.',
    image: '/assets/bbadge.jpg',
    tags: ['Node.js', 'React', 'XRP Ledger', 'Pinata', 'Vercel'],
    github: 'https://github.com/v4ms12004/BlockBadge',
    live: 'https://blockathon.vercel.app/',
    rotate: -3,
  },
]

const SPLIT = Math.ceil(featured.length / 2) // column 1 gets the extra card

function useMediaQuery(query) {
  const [matches, setMatches] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(query).matches,
  )
  useEffect(() => {
    const mq = window.matchMedia(query)
    const onChange = () => setMatches(mq.matches)
    onChange()
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [query])
  return matches
}

function ProjectCard({ project, onOpen, tilt = true }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={`Open details for ${project.title}`}
      style={tilt ? { rotate: `${project.rotate}deg` } : undefined}
      className="group block w-full max-w-[300px] cursor-pointer text-left"
    >
      <div className="relative overflow-hidden rounded-2xl border border-border bg-zinc-900">
        <img
          src={project.image}
          alt={project.title}
          loading="lazy"
          className="aspect-[3/4] w-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.03]"
        />
        <span className="absolute right-3 top-3 flex size-8 items-center justify-center rounded-full bg-black/60 text-zinc-100 opacity-0 backdrop-blur transition-opacity duration-300 group-hover:opacity-100">
          <ArrowUpRight size={14} />
        </span>
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-2 px-1">
        <span className="font-display italic text-xl sm:text-2xl text-zinc-100 group-hover:text-accent transition-colors">
          {project.title}
        </span>
        {project.ribbon && (
          <span className="rounded-full bg-amber-400 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.2em] text-zinc-950">
            {project.ribbon}
          </span>
        )}
      </div>
    </button>
  )
}

function GalleryHeader({ className = '' }) {
  return (
    <div className={`px-6 text-center ${className}`}>
      <SectionHeading index="03" title="Featured" accent="Projects" className="flex flex-col items-center" />
      <p className="mx-auto mt-4 max-w-sm text-sm text-zinc-500">
        Hackathon wins, capstones and data deep-dives. Click a project to see the details.
      </p>
      <div className="pointer-events-auto mt-7 flex justify-center">
        <RingLink
          href="https://github.com/Yadhunath2003"
          target="_blank"
          innerClassName="bg-card/80 border border-border px-5 py-2.5 text-sm text-zinc-100 backdrop-blur-md group-hover:border-transparent"
        >
          More on GitHub
          <ArrowUpRight size={14} />
        </RingLink>
      </div>
    </div>
  )
}

export default function Projects() {
  // Static list on phones (< md) and for reduced motion; moving gallery otherwise.
  const reduce = useMediaQuery('(prefers-reduced-motion: reduce)')
  const mobile = useMediaQuery('(max-width: 767px)')
  const simple = reduce || mobile
  const sectionRef = useRef(null)
  const pinRef = useRef(null)
  const col1Ref = useRef(null)
  const col2Ref = useRef(null)
  const [active, setActive] = useState(null)
  const openProject = useCallback((project) => {
    if (isPosthogEnabled) {
      posthog.capture('project_details_opened', { project_name: project.title })
      posthog.logger.info('portfolio project details opened', { project_name: project.title })
    }
    setActive(project)
  }, [])
  const close = useCallback(() => setActive(null), [])

  // Pin the header and drift the two columns at different speeds (template "Visual playground").
  useEffect(() => {
    if (simple) return
    const ctx = gsap.context(() => {
      const trigger = { trigger: sectionRef.current, start: 'top top', end: 'bottom bottom' }
      ScrollTrigger.create({ ...trigger, pin: pinRef.current, pinSpacing: false })
      gsap.to(col1Ref.current, { yPercent: -10, ease: 'none', scrollTrigger: { ...trigger, scrub: 1 } })
      gsap.to(col2Ref.current, { yPercent: -26, ease: 'none', scrollTrigger: { ...trigger, scrub: 1 } })
    }, sectionRef)
    return () => ctx.revert()
  }, [simple])

  const drawer = (
    <AnimatePresence>
      {active && <ProjectDrawer key={active.title} project={active} onClose={close} />}
    </AnimatePresence>
  )

  // Static grid with the same drawer.
  if (simple) {
    return (
      <section id="projects" className="py-24 px-6">
        <GalleryHeader />
        <div className="mx-auto mt-14 grid max-w-4xl gap-10 sm:grid-cols-2 justify-items-center">
          {featured.map((p) => (
            <ProjectCard key={p.title} project={p} tilt={false} onOpen={() => openProject(p)} />
          ))}
        </div>
        {drawer}
      </section>
    )
  }

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative min-h-[260vh] overflow-clip bg-background"
    >
      {/* Pinned center header */}
      <div ref={pinRef} className="pointer-events-none relative z-10 flex h-svh items-center justify-center">
        <GalleryHeader />
      </div>

      {/* Drifting project columns */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        <div className="mx-auto grid h-full max-w-[1400px] grid-cols-2 gap-6 px-4 sm:gap-12 sm:px-6 md:gap-40">
          <div ref={col1Ref} className="flex flex-col items-center gap-[28vh] pt-[36vh]">
            {featured.slice(0, SPLIT).map((p) => (
              <div key={p.title} className="pointer-events-auto w-full flex justify-center">
                <ProjectCard project={p} onOpen={() => openProject(p)} />
              </div>
            ))}
          </div>
          <div ref={col2Ref} className="flex flex-col items-center gap-[28vh] pt-[64vh]">
            {featured.slice(SPLIT).map((p) => (
              <div key={p.title} className="pointer-events-auto w-full flex justify-center">
                <ProjectCard project={p} onOpen={() => openProject(p)} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {drawer}
    </section>
  )
}
