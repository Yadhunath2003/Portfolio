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
      'Assist in teaching hands-on lab courses in Embedded Systems and C programming.',
      'Guide students in implementing projects using Arduino, Raspberry Pi, and other embedded devices.',
      'Foster a collaborative learning environment to enhance student engagement and understanding.',
    ],
  },
  {
    title: 'Database Editor',
    company: 'KU Physics & Astronomy Department',
    companyUrl: 'https://physics.ku.edu',
    period: 'Jul 2025 — Dec 2025',
    location: 'Lawrence, KS',
    bullets: [
      'Maintained and updated graduate program databases in FileMaker Pro to keep student records accurate and consistent.',
      'Developed scripts to automate course substitutions, grade tracking, and reporting, reducing manual workload.',
      'Partnered with faculty and staff to implement data management improvements that streamlined workflows.',
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
      'Documented workflows and built knowledge-sharing resources in TDX and ServiceNow to improve support consistency.',
      'Troubleshot hardware and software issues across organizational and personal machines, closing tickets efficiently.',
      'Provided secure, reliable support for Microsoft 365, KU services, and account access.',
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
              <Reveal key={i} delay={`delay-[${i * 100}ms]`}>
              <div
                className="group relative bg-card border border-border rounded-xl p-6 hover:border-accent/40 transition-all duration-300 glow-hover"
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-zinc-100">
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
                  <span className="font-mono text-xs text-zinc-500 whitespace-nowrap bg-zinc-800/60 px-3 py-1 rounded-full border border-border">
                    {job.period}
                  </span>
                </div>

                <ul className="space-y-2">
                  {job.bullets.map((b, j) => (
                    <li key={j} className="flex gap-3 text-sm text-zinc-400 leading-relaxed">
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
