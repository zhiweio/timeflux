'use client';

import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import type { TimelineEvent } from '@/lib/types';
import { ImageStack } from '../ImageStack';
import { TimelineItemWrapper } from './TimelineItemWrapper';

interface StandardItemProps {
  event: TimelineEvent;
  index: number;
  isLeft: boolean;
}

export function StandardItem({ event, index, isLeft }: StandardItemProps) {
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

          <p className="text-xs md:text-sm text-zinc-600 dark:text-zinc-300 mb-2 leading-snug">
            {event.summary}
          </p>

          {event.images && event.images.length > 0 && (
            <div className="mt-2 mb-2" data-image-stack>
              {isExpanded ? (
                <ImageStack images={event.images} title={event.title} />
              ) : (
                <div className="relative group overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-800 h-32">
                  <Image
                    src={event.images[0]}
                    alt={event.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    unoptimized
                  />
                  {event.images.length > 1 && (
                    <div className="absolute bottom-2 right-2 bg-black/60 text-white text-[10px] px-1.5 py-0.5 rounded-md backdrop-blur-sm">
                      +{event.images.length - 1}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </>
      )}
    </TimelineItemWrapper>
  );
}
