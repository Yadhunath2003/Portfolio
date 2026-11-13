/**
 * PostHog analytics (US Cloud), proxied through /ingest (netlify.toml in
 * production, vite.config.js in dev) so fewer ad-blockers drop events.
 *
 * - Does nothing unless VITE_POSTHOG_KEY is set.
 * - posthog-js is loaded lazily after the page renders, so it never delays
 *   first paint; events fired before it loads are queued and sent once ready.
 * - Visit the site once with ?notrack to exclude your own browser from the
 *   stats (?track turns it back on).
 */
const KEY = import.meta.env.VITE_POSTHOG_KEY
const enabled = Boolean(KEY) && typeof window !== 'undefined'
let posthog = null
const queue = []

export function initAnalytics() {
  if (!enabled) return
  const load = () =>
    import('posthog-js').then(({ default: ph }) => {
      ph.init(KEY, {
        api_host: '/ingest',
        ui_host: 'https://us.posthog.com',
        person_profiles: 'identified_only',
        capture_pageview: true,
        capture_pageleave: true,
        autocapture: true,
        disable_session_recording: true,
      })
      const params = new URLSearchParams(window.location.search)
      if (params.has('notrack')) ph.opt_out_capturing()
      if (params.has('track')) ph.opt_in_capturing()

      posthog = ph
      queue.splice(0).forEach(([event, props]) => ph.capture(event, props))
    })

  if ('requestIdleCallback' in window) requestIdleCallback(load, { timeout: 3000 })
  else setTimeout(load, 1500)
}

/** Capture a custom event; a no-op when analytics is off. */
export function track(event, props) {
  if (!enabled) return
  if (posthog) posthog.capture(event, props)
  else queue.push([event, props])
}

/** Fire `section_viewed` once per section per page load. Returns a cleanup fn. */
export function trackSectionViews() {
  if (!enabled || typeof IntersectionObserver === 'undefined') return () => {}
  const seen = new Set()
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        const id = entry.target.id
        if (entry.isIntersecting && !seen.has(id)) {
          seen.add(id)
          track('section_viewed', { section: id })
          io.unobserve(entry.target)
        }
      }
    },
    { threshold: 0.3 },
  )
  document.querySelectorAll('section[id]').forEach((el) => io.observe(el))
  return () => io.disconnect()
}
