import { cn } from '@/lib/utils'

/**
 * Smooth-scroll in-page anchors (respects reduced motion).
 * External, mailto and file links fall through to default navigation.
 */
export function onAnchorClick(event, href) {
  if (!href?.startsWith('#') || href.length < 2) return
  const target = document.getElementById(href.slice(1))
  if (!target) return
  event.preventDefault()
  const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
  target.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })
}

/**
 * Pill link with a blue accent-gradient ring that fades in on hover.
 * Adapted from the Hirael portfolio template's RingLink (MIT).
 *
 * Props: href, children, target, rel, ariaLabel, outerClassName, innerClassName
 */
export default function RingLink({
  href,
  children,
  target,
  rel,
  ariaLabel,
  outerClassName,
  innerClassName,
}) {
  return (
    <a
      href={href}
      target={target}
      rel={rel ?? (target === '_blank' ? 'noopener noreferrer' : undefined)}
      aria-label={ariaLabel}
      onClick={(e) => onAnchorClick(e, href)}
      className={cn('group relative inline-flex shrink-0', outerClassName)}
    >
      <span
        aria-hidden="true"
        className="accent-gradient pointer-events-none absolute -inset-[2px] rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />
      <span
        className={cn(
          'relative inline-flex items-center justify-center gap-1.5 rounded-full transition-colors duration-300',
          innerClassName,
        )}
      >
        {children}
      </span>
    </a>
  )
}
