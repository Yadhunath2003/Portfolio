import SectionHeading from './SectionHeading'
import Reveal from './Reveal'

// Synced with public/assets/resume.pdf
const education = [
  {
    degree: "Master's in Computer Science",
    detail: 'Thesis track · Data Science & Engineering',
    school: 'University of Kansas',
    period: 'Jan 2026 — May 2027',
    gpa: '4.0 GPA',
  },
  {
    degree: "Bachelor's in Computer Science",
    detail: "Cybersecurity Certification · Dean's Honor Roll (Spring & Fall 2025)",
    school: 'University of Kansas',
    period: 'Aug 2023 — Dec 2025',
    gpa: '3.67 GPA',
  },
]

const focusAreas = [
  'Data Engineering',
  'Data Analytics',
  'Backend Development',
  'Machine Learning',
  'Cloud Integration',
]

export default function About() {
  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <Reveal><SectionHeading index="01" title="About" accent="me" /></Reveal>

        <div className="mt-12 grid md:grid-cols-5 gap-12 items-start">
          {/* Text */}
          <Reveal from="left" className="md:col-span-3 space-y-5 text-zinc-600 dark:text-zinc-400 text-base leading-relaxed">
            <p>
              I'm Yadhunath, a Computer Science Master's student at the{' '}
              <span className="text-zinc-800 dark:text-zinc-200 font-medium">University of Kansas</span>{' '}
              specializing in{' '}
              <span className="text-zinc-800 dark:text-zinc-200 font-medium">Data Science and Engineering</span>
              . I'm passionate about building scalable, data-driven systems and
              pursuing a career in Data Engineering, Data Science, Machine
              Learning, or Backend Development.
            </p>
            <p>
              My experience spans data pipelines, APIs, and ML applications,
              including FirstResponseAI, which earned{' '}
              <span className="text-zinc-800 dark:text-zinc-200 font-medium">Best Use of ElevenLabs at HackKU 2026</span>
              .
            </p>
            <p>
              I'm actively seeking internship and full-time opportunities to
              apply my skills and build impactful solutions.
            </p>

            {/* Focus areas */}
            <ul className="flex flex-wrap gap-2 pt-1">
              {focusAreas.map((area) => (
                <li
                  key={area}
                  className="font-mono text-xs text-zinc-600 dark:text-zinc-300 bg-card border border-border px-3 py-1 rounded-full"
                >
                  {area}
                </li>
              ))}
            </ul>

            {/* Education timeline */}
            <div className="pt-4">
              <h3 className="font-mono text-xs text-accent uppercase tracking-widest mb-4">Education</h3>
              <ol className="relative border-l border-border ml-1.5 space-y-6">
                {education.map((e) => (
                  <li key={e.degree} className="pl-6 relative">
                    <span className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-accent ring-4 ring-background" />
                    <p className="font-mono text-xs text-zinc-500">{e.period}</p>
                    <p className="text-zinc-900 dark:text-zinc-100 font-semibold text-sm mt-0.5">
                      <span className="font-display italic font-normal text-lg">{e.degree}</span>{' '}
                      <span className="text-accent font-medium">@ {e.school}</span>
                    </p>
                    <p className="text-sm text-zinc-500">
                      {e.detail} · <span className="text-zinc-700 dark:text-zinc-300 font-medium">{e.gpa}</span>
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>

          {/* Photo */}
          <Reveal from="right" delay={150} className="md:col-span-2 flex justify-center">
            <div className="relative group">
              <div className="w-64 h-64 rounded-2xl border border-border overflow-hidden">
                <img
                  src="/assets/yt_photo.jpg"
                  alt="Yadhunath Tharakeswaran"
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <div className="absolute -bottom-3 -right-3 w-64 h-64 rounded-2xl border border-accent/30 -z-10 group-hover:translate-x-1 group-hover:translate-y-1 transition-transform duration-300" />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
