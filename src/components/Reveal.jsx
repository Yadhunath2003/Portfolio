import { useInView } from '../hooks/useInView'

/**
 * Wraps children with a scroll-triggered reveal animation.
 *
 * Props:
 *   delay   – Tailwind delay class e.g. 'delay-100', 'delay-200' (default none)
 *   from    – 'bottom' (default) | 'left' | 'right' | 'fade'
 *   className – extra classes on the wrapper
 */
export default function Reveal({ children, delay = '', from = 'bottom', className = '' }) {
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
      className={`${base} ${delay} ${inView ? visible : hidden} ${className}`}
    >
      {children}
    </div>
  )
}
