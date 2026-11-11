import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, Github, X } from 'lucide-react'
import RingLink from './RingLink'

export function Tag({ label }) {
  return (
    <span className="font-mono text-xs text-zinc-400 bg-zinc-800/60 border border-border px-2 py-0.5 rounded">
      {label}
    </span>
  )
}

/**
 * Right-hand side drawer showing a project's details.
 * Render inside <AnimatePresence> so the exit animation runs.
 */
export default function ProjectDrawer({ project, onClose }) {
  const closeRef = useRef(null)

  // Esc to close, lock page scroll, focus the close button.
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [onClose])

  return (
    <div className="fixed inset-0 z-[100]" role="dialog" aria-modal="true" aria-labelledby="project-drawer-title">
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        onClick={onClose}
      />

      {/* Panel */}
      <motion.aside
        className="absolute inset-y-0 right-0 flex w-full sm:w-[480px] flex-col bg-card border-l border-border shadow-2xl shadow-black/50"
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'tween', duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="flex items-center justify-between px-6 pt-6">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-zinc-500">Project</span>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close project details"
            className="flex size-10 items-center justify-center rounded-full border border-white/15 text-zinc-400 transition-colors hover:text-zinc-100 hover:border-white/30"
          >
            <X size={16} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 pb-10 pt-6">
          <div className="overflow-hidden rounded-2xl border border-border bg-zinc-900">
            <img
              src={project.image}
              alt={project.title}
              className="mx-auto w-full max-h-[55vh] object-contain"
            />
          </div>

          {project.ribbon && (
            <span className="mt-6 inline-flex items-center rounded-full bg-amber-400 text-zinc-950 text-[10px] font-semibold uppercase tracking-[0.25em] px-3 py-1">
              {project.ribbon}
            </span>
          )}

          <h3
            id="project-drawer-title"
            className="mt-4 font-display italic text-4xl sm:text-5xl leading-[1.05] text-zinc-100"
          >
            {project.title}
          </h3>

          <p className="mt-5 text-sm sm:text-base leading-relaxed text-zinc-400">{project.description}</p>

          <div className="mt-6 flex flex-wrap gap-2">
            {project.tags.map((t) => <Tag key={t} label={t} />)}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            {project.github && (
              <RingLink
                href={project.github}
                target="_blank"
                innerClassName="bg-zinc-100 px-5 py-2.5 text-sm font-medium text-background group-hover:bg-background group-hover:text-zinc-100"
              >
                {project.github.includes('github.com') ? (
                  <>
                    <Github size={15} />
                    GitHub
                  </>
                ) : (
                  <>
                    Kaggle
                    <ArrowUpRight size={14} />
                  </>
                )}
              </RingLink>
            )}
            {project.live && project.live !== project.github && (
              <RingLink
                href={project.live}
                target="_blank"
                innerClassName="border-2 border-border bg-background px-5 py-2.5 text-sm font-medium text-zinc-100 group-hover:border-transparent"
              >
                {project.live.includes('devpost.com') ? 'Devpost' : 'Live site'}
                <ArrowUpRight size={14} />
              </RingLink>
            )}
          </div>
        </div>
      </motion.aside>
    </div>
  )
}
