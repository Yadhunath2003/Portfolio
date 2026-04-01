import SectionHeading from './SectionHeading'
import Reveal from './Reveal'

export default function About() {
  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <Reveal><SectionHeading index="01" title="About Me" /></Reveal>

        <div className="mt-12 grid md:grid-cols-5 gap-12 items-start">
          {/* Text */}
          <Reveal from="left" className="md:col-span-3 space-y-5 text-zinc-400 text-base leading-relaxed">
            <p>
              Hi — I'm Yadhunath, a first-year Master's student in Computer
              Science at the{' '}
              <span className="text-zinc-200 font-medium">University of Kansas</span>
              , specializing in{' '}
              <span className="text-zinc-200 font-medium">Data Science and Engineering</span>
              . I'm currently seeking internship opportunities in data
              engineering and backend-focused roles.
            </p>
            <p>
              I have hands-on experience working across data pipelines, backend
              systems, and analytics workflows. I enjoy building systems that
              handle real data at scale and remain reliable in production —
              whether that's an ETL pipeline, a REST API, or a real-time
              streaming system.
            </p>
            <p>
              Outside of work, I contribute to open source, explore new tools,
              and occasionally mentor students through camps and TA sessions.
            </p>

            <ul className="grid grid-cols-2 gap-2 pt-2 font-mono text-sm text-zinc-400">
              {[
                'Python', 'JavaScript / R',
                'React / Next.js', 'Django / Node.js',
                'Apache Airflow / Kafka', 'PostgreSQL / MongoDB',
                'Docker / AWS', 'Tableau / dbt',
              ].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <span className="text-accent">▹</span>
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>

          {/* Photo */}
          <Reveal from="right" delay="delay-150" className="md:col-span-2 flex justify-center">
            <div className="relative group">
              <div className="w-64 h-64 rounded-2xl border border-border overflow-hidden">
                <img
                  src="/assets/Profile_pic.jpg"
                  alt="Yadhunath Tharakeswaran"
                  className="w-full h-full object-cover object-top"
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
