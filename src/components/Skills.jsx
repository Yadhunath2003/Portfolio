import SectionHeading from './SectionHeading'
import Reveal from './Reveal'

const DEVICON = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons'

const skillGroups = [
  {
    category: 'Languages',
    skills: [
      { name: 'Python',      icon: `${DEVICON}/python/python-original.svg` },
      { name: 'JavaScript',  icon: `${DEVICON}/javascript/javascript-original.svg` },
      { name: 'R',           icon: `${DEVICON}/r/r-original.svg` },
      { name: 'Bash',        icon: `${DEVICON}/bash/bash-original.svg` },
      { name: 'Solidity',    icon: `${DEVICON}/solidity/solidity-original.svg` },
    ],
  },
  {
    category: 'Frontend',
    skills: [
      { name: 'React',    icon: '/assets/react.svg' },
      { name: 'Next.js',  icon: `${DEVICON}/nextjs/nextjs-original.svg` },
      { name: 'Expo.js',  icon: `${DEVICON}/expo/expo-original.svg` },
      { name: 'HTML/CSS', icon: `${DEVICON}/html5/html5-original.svg` },
    ],
  },
  {
    category: 'Backend & Databases',
    skills: [
      { name: 'Django',       icon: `${DEVICON}/django/django-plain.svg` },
      { name: 'Node.js',      icon: `${DEVICON}/nodejs/nodejs-original.svg` },
      { name: 'PostgreSQL',   icon: `${DEVICON}/postgresql/postgresql-original.svg` },
      { name: 'MySQL',        icon: `${DEVICON}/mysql/mysql-original.svg` },
      { name: 'MongoDB',      icon: `${DEVICON}/mongodb/mongodb-original.svg` },
      { name: 'FileMaker Pro',icon: '/assets/filemaker.png' },
    ],
  },
  {
    category: 'Data Engineering',
    skills: [
      { name: 'Apache Airflow', icon: `${DEVICON}/apacheairflow/apacheairflow-original.svg` },
      { name: 'Kafka',          icon: `${DEVICON}/apachekafka/apachekafka-original.svg` },
      { name: 'Tableau',        icon: '/assets/tableau.svg' },
      { name: 'dbt',            icon: '/assets/dbt.svg' },
    ],
  },
  {
    category: 'ML / AI',
    skills: [
      { name: 'scikit-learn', icon: `${DEVICON}/scikitlearn/scikitlearn-original.svg` },
      { name: 'Pandas',       icon: `${DEVICON}/pandas/pandas-original.svg` },
      { name: 'NumPy',        icon: `${DEVICON}/numpy/numpy-original.svg` },
      { name: 'Gemini API',   icon: `${DEVICON}/google/google-original.svg` },
    ],
  },
  {
    category: 'Cloud & DevOps',
    skills: [
      { name: 'AWS',            icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg' },
      { name: 'Docker',         icon: `${DEVICON}/docker/docker-original.svg` },
      { name: 'Vercel',         icon: `${DEVICON}/vercel/vercel-original.svg` },
      { name: 'GitHub Actions', icon: `${DEVICON}/github/github-original.svg` },
      { name: 'Kali Linux',     icon: `${DEVICON}/linux/linux-original.svg` },
    ],
  },
]

export default function Skills() {
  return (
    <section id="skills" className="py-24 px-6 bg-surface">
      <div className="max-w-5xl mx-auto">
        <Reveal><SectionHeading index="04" title="Skills" /></Reveal>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {skillGroups.map((group, i) => (
            <Reveal key={group.category} delay={`delay-[${i * 75}ms]`}>
            <div
              className="bg-card border border-border rounded-xl p-5 hover:border-accent/40 transition-all duration-300 glow-hover"
            >
              <h3 className="text-xs font-semibold text-accent uppercase tracking-widest mb-4 font-mono">
                {group.category}
              </h3>
              <div className="flex flex-wrap gap-3 justify-center">
                {group.skills.map(({ name, icon }) => (
                  <div
                    key={name || icon}
                    className="relative group/skill cursor-default"
                  >
                    <div className="w-16 h-16 rounded-xl bg-zinc-100 border border-zinc-200 flex items-center justify-center hover:border-accent/40 hover:bg-zinc-200/70 hover:scale-110 transition-all duration-200">
                      <img
                        src={icon}
                        alt={name}
                        className="w-12 h-12 object-contain"
                        onError={(e) => { e.currentTarget.style.display = 'none' }}
                      />
                    </div>
                    {/* Tooltip */}
                    {name && (
                      <div className="absolute -top-9 left-1/2 -translate-x-1/2 px-2 py-1 bg-white dark:bg-zinc-800 border border-border text-zinc-800 dark:text-zinc-200 text-xs rounded whitespace-nowrap opacity-0 group-hover/skill:opacity-100 pointer-events-none transition-opacity duration-150 z-10 shadow-sm">
                        {name}
                        <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-white dark:border-t-zinc-800" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
