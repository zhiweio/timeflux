export function Footer() {
  return (
    <footer className="py-8 mt-20 border-t border-zinc-200/50 dark:border-zinc-800/50">
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-2">
          Built with <span className="text-red-500">❤️</span> for the open source community
        </p>
        <p className="text-xs text-zinc-400 dark:text-zinc-500">
          Powered by{' '}
          <a
            href="https://github.com/zhiweio/timeflux"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-zinc-900 dark:text-zinc-100 hover:underline underline-offset-4"
          >
            TimeFlux
          </a>
        </p>
      </div>
    </footer>
  );
}
