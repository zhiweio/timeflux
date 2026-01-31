import Image from 'next/image';
import { ThemeToggle } from '@/components/ThemeToggle';

export function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-zinc-200/50 dark:border-zinc-800/50 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-xl supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-zinc-950/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <a
            href="https://github.com/zhiweio/timeflux"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 group"
          >
            <div className="w-8 h-8 rounded-lg bg-zinc-900 dark:bg-zinc-50 flex items-center justify-center group-hover:scale-105 transition-transform overflow-hidden">
              <Image
                src="/timeflux.svg"
                alt="TimeFlux Logo"
                width={32}
                height={32}
                className="w-full h-full object-contain dark:invert"
              />
            </div>
            <span className="font-bold text-xl tracking-tight text-zinc-900 dark:text-zinc-50">
              TimeFlux
            </span>
          </a>
        </div>

        <nav className="flex items-center gap-2">
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
