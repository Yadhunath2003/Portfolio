import { useInView } from '../hooks/useInView'

/**
 * Wraps children with a scroll-triggered reveal animation.
 *
 * Props:
 *   delay     – delay in milliseconds (number), e.g. 100 or i * 100 (default 0)
 *   from      – 'bottom' (default) | 'left' | 'right' | 'fade'
 *   className – extra classes on the wrapper
 *
 * The delay is applied as an inline style because Tailwind can't generate
 * classes that are built at runtime (e.g. `delay-[${i * 100}ms]`).
 */
export default function Reveal({ children, delay = 0, from = 'bottom', className = '' }) {
  const [ref, inView] = useInView()

  const base = 'transition-all duration-700 ease-out'

  const hidden = {
    bottom: 'opacity-0 translate-y-10',
    left:   'opacity-0 -translate-x-10',
    right:  'opacity-0 translate-x-10',
    fade:   'opacity-0',
  }[from]

  const visible = 'opacity-100 translate-x-0 translate-y-0'

  return (
    <div
      ref={ref}
      className={`${base} ${inView ? visible : hidden} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  )
}
