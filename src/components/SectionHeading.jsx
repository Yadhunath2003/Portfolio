/**
 * Section heading: a mono eyebrow ("── 01.") above a title whose optional
 * `accent` word is set in Instrument Serif italic.
 *
 *   <SectionHeading index="01" title="About" accent="me" />
 */
export default function SectionHeading({ index, title, accent, className = '' }) {
  return (
    <div className={className}>
      <div className="flex items-center gap-3">
        <span className="h-px w-8 bg-border" />
        <span className="font-mono text-xs uppercase tracking-[0.3em] text-zinc-500">
          {index}.
        </span>
      </div>
      <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-medium leading-[1.05] tracking-tight text-zinc-100">
        {title}
        {accent && (
          <>
            {' '}
            <span className="font-display italic font-normal text-accent">{accent}</span>
          </>
        )}
      </h2>
    </div>
  )
}
