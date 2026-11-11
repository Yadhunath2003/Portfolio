import SectionHeading from './SectionHeading'
import Reveal from './Reveal'

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

export default function Experience() {
  return (
    <section id="experience" className="py-24 px-6 bg-surface">
      <div className="max-w-4xl mx-auto">
        <Reveal><SectionHeading index="02" title="Experience" /></Reveal>

        <div className="mt-12">
          <div className="space-y-6">
            {jobs.map((job, i) => (
              <Reveal key={i} delay={i * 100}>
              <div
                className="group relative bg-card border border-border rounded-xl p-6 hover:border-accent/40 transition-all duration-300 glow-hover"
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                      {job.title}{' '}
                      <span className="text-accent">
                        @{' '}
                        <a
                          href={job.companyUrl}
                          className="hover:underline underline-offset-2"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {job.company}
                        </a>
                      </span>
                    </h3>
                    <p className="text-sm text-zinc-500">{job.location}</p>
                  </div>
                  <span className="font-mono text-xs text-zinc-500 whitespace-nowrap bg-zinc-100 dark:bg-zinc-800/60 px-3 py-1 rounded-full border border-border">
                    {job.period}
                  </span>
                </div>

                <ul className="space-y-2">
                  {job.bullets.map((b, j) => (
                    <li key={j} className="flex gap-3 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                      <span className="text-accent mt-1 shrink-0">▹</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
