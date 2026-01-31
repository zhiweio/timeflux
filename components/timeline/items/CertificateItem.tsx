'use client';

import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import type { TimelineEvent } from '@/lib/types';
import { cn } from '@/lib/utils';
import { TechIcon } from './TechIcon';
import { TimelineItemWrapper } from './TimelineItemWrapper';

interface CertificateItemProps {
  event: TimelineEvent;
  index: number;
  isLeft: boolean;
}

export function CertificateItem({ event, index, isLeft }: CertificateItemProps) {
  return (
    <TimelineItemWrapper event={event} index={index} isLeft={isLeft}>
      {(isExpanded) => (
        <>
          <div className="flex flex-wrap gap-1.5 mb-2">
            {event.tags?.map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="text-[10px] px-1.5 py-0 h-4 bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700"
              >
                {tag}
              </Badge>
            ))}
          </div>

          {/* Tech Stack Icons (Expanded) */}
          {isExpanded && event.tags && event.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-2">
              {event.tags.map((tag) => (
                <TechIcon key={tag} tag={tag} />
              ))}
            </div>
          )}

          <p className="text-xs md:text-sm text-zinc-600 dark:text-zinc-300 mb-2 leading-snug">
            {event.summary}
          </p>

          {event.images && event.images.length > 0 && (
            <div className="mt-2 mb-2" data-image-stack>
              <div
                className={cn(
                  'relative group overflow-hidden rounded-xl border border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950/50 p-4 flex items-center justify-center transition-all duration-500 mx-auto',
                  isExpanded
                    ? 'aspect-video max-h-80 w-full'
                    : 'aspect-video max-h-64 w-full md:w-5/6',
                )}
              >
                <div className="relative w-full h-full flex items-center justify-center">
                  <Image
                    src={event.images[0]}
                    alt={event.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-contain transition-transform duration-500 group-hover:scale-105 drop-shadow-xl"
                    unoptimized
                  />
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </TimelineItemWrapper>
  );
}
