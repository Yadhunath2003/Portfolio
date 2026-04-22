import { Trophy, ExternalLink } from 'lucide-react'
import SectionHeading from './SectionHeading'
import Reveal from './Reveal'

const certifications = [
  {
    title: 'IBM SQL, ETL Processing & Data Warehousing',
    issuer: 'IBM',
    date: 'Sep 2025',
    description:
      'Proficiency in SQL queries, ETL processes, and data warehousing concepts for effective data management and analysis.',
    logo: '/assets/ibm.svg',
    pdf: '/assets/IBM-Cert.pdf',
    accent: 'hover:border-blue-500/40',
    glow: 'from-blue-500/10 to-cyan-500/5',
  },
  {
    title: 'Google Analytics Professional Certification',
    issuer: 'Google',
    date: 'Aug 2025',
    description:
      'Advanced proficiency in data analysis, data cleaning, SQL query optimization, and creating impactful data visualizations.',
    logo: '/assets/google.svg',
    pdf: '/assets/Google_cert.pdf',
    accent: 'hover:border-green-500/40',
    glow: 'from-green-500/10 to-teal-500/5',
  },
]

const awards = [
  {
    title: 'University Excellence Award',
    org: 'KU School of Engineering',
    logo: '/assets/Ku-logo.svg',
    detail: 'Awarded for achieving a GPA of 3.75+ in Spring & Fall 2025 semesters.',
  },
  {
    title: 'Honors Roll for Academic Excellence',
    org: 'Johnson County Community College',
    logo: null,
    detail: 'Awarded for achieving a GPA of 3.5+ over 2 semesters while completing 30+ credit hours.',
  },
  {
    title: 'AMATY Mathematics Competition — 4th Place',
    org: 'Johnson County Community College',
    logo: null,
    detail: 'Placed 4th among 100+ participants in the AMATY Mathematics Competition.',
  },
  {
    title: 'HackKU 2026 — Best Use of ElevenLabs API',
    org: 'University of Kansas',
    logo: '/assets/Ku-logo.svg',
    detail: 'Won Best Use of ElevenLabs API for creating a real-time AI communication platform in a 36-hour hackathon.',
  },
]

export default function Certifications() {
  return (
    <section id="certifications" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <Reveal><SectionHeading index="05" title="Certifications & Awards" /></Reveal>

        {/* Certifications */}
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {certifications.map((cert, i) => (
            <Reveal key={cert.title} delay={`delay-[${i * 100}ms]`}>
            <div
              className={`group bg-gradient-to-br ${cert.glow} bg-card border border-border rounded-xl p-5 ${cert.accent} transition-all duration-300 glow-hover flex flex-col gap-3`}
            >
              {/* Header row: logo + date */}
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-lg bg-zinc-800/80 border border-border flex items-center justify-center p-1.5">
                  <img src={cert.logo} alt={cert.issuer} className="w-full h-full object-contain" />
                </div>
                <span className="font-mono text-xs text-zinc-500">{cert.date}</span>
              </div>

              {/* Content */}
              <div className="flex-1">
                <h3 className="font-semibold text-zinc-100 text-sm leading-snug mb-1">
                  {cert.title}
                </h3>
                <p className="text-xs text-accent font-medium mb-2">{cert.issuer}</p>
                <p className="text-xs text-zinc-500 leading-relaxed">{cert.description}</p>
              </div>

              {/* View cert link */}
              {cert.pdf && (
                <a
                  href={cert.pdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-zinc-500 hover:text-accent transition-colors mt-1"
                >
                  <ExternalLink size={12} />
                  View Certificate
                </a>
              )}
            </div>
            </Reveal>
          ))}
        </div>

        {/* Awards */}
        <div className="mt-10 space-y-4">
          {awards.map((award, i) => (
            <Reveal key={award.title} delay={`delay-[${i * 100}ms]`}>
            <div
              className="flex items-start gap-4 bg-card border border-border rounded-xl p-5 hover:border-accent/40 transition-all duration-300 glow-hover"
            >
              {award.logo ? (
                <div className="w-9 h-9 rounded-lg bg-zinc-800/80 border border-border flex items-center justify-center p-1.5 shrink-0">
                  <img src={award.logo} alt={award.org} className="w-full h-full object-contain" />
                </div>
              ) : (
                <Trophy size={18} className="text-accent shrink-0 mt-0.5" />
              )}
              <div>
                <h3 className="font-semibold text-zinc-100 text-sm">{award.title}</h3>
                <p className="text-xs text-accent mb-1">{award.org}</p>
                <p className="text-xs text-zinc-500 leading-relaxed">{award.detail}</p>
              </div>
            </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
