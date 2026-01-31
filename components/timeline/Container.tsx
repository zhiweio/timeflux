'use client';

import { LayoutGroup, motion } from 'framer-motion';
import { useState } from 'react';
import type { EventType, TimelineEvent } from '@/lib/types';
import { Filter } from './Filter';
import { Item } from './Item';
import { Line } from './Line';
import { TimelineAnimationProvider } from './TimelineContext';

interface ContainerProps {
  timeline: TimelineEvent[];
}

export function TimelineContainer({ timeline }: ContainerProps) {
  const [filter, setFilter] = useState<EventType | 'all'>('all');

  const filteredTimeline = timeline.filter((item) => filter === 'all' || item.type === filter);

  return (
    <TimelineAnimationProvider>
      <div className="relative py-12 px-4 md:px-0 min-h-[60vh]">
        {/* Background Decoration */}
        <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--color-border)_1px,transparent_1px)] [background-size:48px_48px] opacity-[0.1] dark:opacity-[0.15]" />
          <div className="absolute inset-0 bg-linear-to-b from-background via-transparent to-background" />
        </div>

        <Filter currentFilter={filter} onFilterChange={setFilter} />

        <div className="relative max-w-5xl mx-auto mt-12">
          <Line />

          <LayoutGroup>
            <motion.div layout className="space-y-0">
              {filteredTimeline.map((event, index) => (
                <Item
                  key={`${event.startDate}-${event.title}`}
                  event={event}
                  index={index}
                  isLeft={index % 2 === 0}
                />
              ))}
            </motion.div>
          </LayoutGroup>

          {filteredTimeline.length === 0 && (
            <div className="text-center py-20 text-muted-foreground">
              No events found for this category.
            </div>
          )}
        </div>
      </div>
    </TimelineAnimationProvider>
  );
}
