'use client';

import Image from 'next/image';
import { useIcon } from '@/hooks/useIcon';
import { cn } from '@/lib/utils';

interface TechIconProps {
  tag: string;
  className?: string;
}

export function TechIcon({ tag, className }: TechIconProps) {
  const iconUrl = useIcon(tag);

  if (!iconUrl) return null;

  return (
    <div
      className={cn(
        'relative group flex items-center justify-center w-8 h-8 p-1.5 rounded-lg bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-800 transition-all duration-300 hover:scale-110 hover:bg-white dark:hover:bg-zinc-800 hover:shadow-sm hover:border-zinc-200 dark:hover:border-zinc-700',
        className,
      )}
      title={tag}
    >
      <Image
        src={iconUrl}
        alt={tag}
        width={32}
        height={32}
        className="w-full h-full object-contain filter grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
      />
    </div>
  );
}
