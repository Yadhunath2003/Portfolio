export default function SectionHeading({ index, title }) {
  return (
    <div className="flex items-center gap-4">
      <span className="font-mono text-accent text-sm">{index}.</span>
      <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-zinc-100">{title}</h2>
      <div className="flex-1 h-px bg-border max-w-xs" />
    </div>
  )
}
