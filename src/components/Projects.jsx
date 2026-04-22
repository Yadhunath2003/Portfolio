import { ExternalLink, Github, Star } from 'lucide-react'
import SectionHeading from './SectionHeading'
import Reveal from './Reveal'

const featured = [
  {
    title: 'CCAD AI',
    description:
      'An award-winning AI project that turns every radio transmission into structured intelligence to provide live summaries, conflict alerts, and tactical maps, automatically, so commanders see the full picture instantly.',
    image: '/assets/ccad.png',
    tags: ['Next.js', 'Gemini API', 'ElevenLabs API', 'WebSockets', 'SQLlite', 'Hackathon winner'],
    ribbon: 'Hackathon winner',
    github: 'https://github.com/Yadhunath2003/FirstResponseAI',
    live: 'https://devpost.com/software/firstresponse-ai-4us081'
  },
  {
    title: 'HawkLoop',
    description:
      'A capstone web and mobile application that helps University of Kansas students track campus buses in real time, improving accessibility and reducing wait times. Built a Django backend with live GPS data, a React web frontend, and an Expo.js mobile app — all backed by PostgreSQL.',
    image: '/assets/Hawkloop.png',
    tags: ['Django', 'React', 'PostgreSQL', 'Expo.js'],
    github: 'https://github.com/CaribTechProduction/EECS-582-HawkLoop',
    live: 'https://github.com/CaribTechProduction/EECS-582-HawkLoop',
  },
  {
    title: 'Register Your Rep',
    description:
      'An AI-powered web app that generates personalized workout plans and lets users track their progress over time. Integrated Google Gemini API for plan generation, with a Next.js frontend, React components, and MongoDB for persistent user data. Deployed on Vercel.',
    image: '/assets/ryr.png',
    tags: ['Next.js', 'React', 'MongoDB', 'Gemini API', 'Vercel'],
    github: 'https://github.com/AyaanLakhani/RegisterYourRep',
    live: 'https://register-ur-rep.vercel.app/',
  },
  {
    title: 'Cyclistic Data Analysis',
    description:
      'A case study analyzing 1M+ bike-share rides to identify membership growth opportunities, using R, PostgreSQL, and Tableau for end-to-end analytics.',
    image: '/assets/cyclistic.png',
    tags: ['R', 'PostgreSQL', 'Tableau'],
    github: 'https://www.kaggle.com/code/yadhunath/cyclistic-dataset',
  },
  {
    title: 'BlockBadge',
    description:
      'A hackathon project — tamper-proof credentialing system using blockchain to verify and authenticate educational and professional achievements.',
    image: '/assets/bbadge.png',
    tags: ['Node.js', 'React', 'XRP Ledger', 'Pinata', 'Vercel'],
    github: 'https://github.com/v4ms12004/BlockBadge',
    live: 'https://blockathon.vercel.app/',
  },
]

const other = [
  
]

function Tag({ label }) {
  return (
    <span className="font-mono text-xs text-zinc-400 bg-zinc-800/60 border border-border px-2 py-0.5 rounded">
      {label}
    </span>
  )
}

export default function Projects() {
  return (
    <section id="projects" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <Reveal><SectionHeading index="03" title="Projects" /></Reveal>

        {/* Featured */}
        <div className="mt-12 space-y-8">
          {featured.map((p, i) => (
            <Reveal key={i} from={i % 2 === 0 ? 'left' : 'right'} delay={`delay-[${i * 100}ms]`}>
            <div
              className="group relative bg-card border border-border rounded-xl overflow-hidden hover:border-accent/40 transition-all duration-300 glow-hover flex flex-col sm:flex-row"
            >
              {/* Text — left side */}
              <div className="p-6 sm:p-8 flex flex-col justify-between flex-1">
                <div>
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div>
                      <p className="font-mono text-xs text-accent mb-1">Featured Project</p>
                      <div className="flex items-center gap-3">
                        <h3 className="text-xl font-bold text-zinc-100 group-hover:text-white">
                          {p.title}
                        </h3>
                        {p.ribbon && (
                          <span className="inline-flex items-center rounded-full bg-amber-400 text-zinc-950 text-[10px] font-semibold uppercase tracking-[0.25em] px-3 py-1">
                            {p.ribbon}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-3 text-zinc-500 shrink-0">
                      {p.github && (
                        <a href={p.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="hover:text-accent transition-colors">
                          <Github size={18} />
                        </a>
                      )}
                      {p.live && (
                        <a href={p.live} target="_blank" rel="noopener noreferrer" aria-label="Live demo" className="hover:text-accent transition-colors">
                          <ExternalLink size={18} />
                        </a>
                      )}
                    </div>
                  </div>
                  <p className="text-zinc-400 text-sm leading-relaxed mb-5">{p.description}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {p.tags.map((t) => <Tag key={t} label={t} />)}
                </div>
              </div>

              {/* Screenshot — right side */}
              <div className="sm:w-64 sm:shrink-0 h-48 sm:h-auto overflow-hidden bg-zinc-900 border-t sm:border-t-0 sm:border-l border-border">
                <img
                  src={p.image}
                  alt={p.title}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
            </Reveal>
          ))}
        </div>

        {/* Other projects grid */}
        {other.length > 0 && <>
        <Reveal><h3 className="text-center text-zinc-400 text-sm font-medium mt-16 mb-8">
          Other Noteworthy Projects
        </h3></Reveal>
        <div className="grid sm:grid-cols-2 gap-4">
          {other.map((p, i) => (
            <Reveal key={i} delay={`delay-[${i * 100}ms]`}>
            <div
              className="group flex flex-col bg-card border border-border rounded-xl overflow-hidden hover:border-accent/40 hover:-translate-y-1 transition-all duration-300 glow-hover"
            >
              {/* Thumbnail */}
              <div className="h-36 overflow-hidden bg-zinc-900 border-b border-border">
                <img
                  src={p.image}
                  alt={p.title}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="p-5 flex flex-col flex-1">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-semibold text-zinc-100 group-hover:text-white">{p.title}</h4>
                  <div className="flex gap-3 text-zinc-600 shrink-0 ml-2">
                    {p.github && (
                      <a href={p.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="hover:text-accent transition-colors">
                        <Github size={16} />
                      </a>
                    )}
                    {p.live && (
                      <a href={p.live} target="_blank" rel="noopener noreferrer" aria-label="Live demo" className="hover:text-accent transition-colors">
                        <ExternalLink size={16} />
                      </a>
                    )}
                  </div>
                </div>
                <p className="text-sm text-zinc-500 leading-relaxed flex-1">{p.description}</p>
                <div className="flex flex-wrap gap-1.5 mt-4">
                  {p.tags.map((t) => <Tag key={t} label={t} />)}
                </div>
              </div>
            </div>
            </Reveal>
          ))}
        </div>
        </>}
      </div>
    </section>
  )
}
