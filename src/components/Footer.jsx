export default function Footer() {
  return (
    <footer className="py-8 px-6 border-t border-border text-center">
      <p className="font-mono text-xs text-zinc-500 dark:text-zinc-600">
        Designed &amp; Built by{' '}
        <span className="text-zinc-500 dark:text-zinc-400">Yadhunath Tharakeswaran</span>
        {' · '}
        <span className="text-zinc-400 dark:text-zinc-600">{new Date().getFullYear()}</span>
      </p>
    </footer>
  )
}
