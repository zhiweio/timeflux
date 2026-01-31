'use client';

import { AnimatePresence, motion } from 'framer-motion';
import {
  Briefcase,
  Building2,
  ChevronDown,
  FileBadge,
  FolderCode,
  GraduationCap,
  type LucideIcon,
  Microscope,
  Swords,
  Trophy,
} from 'lucide-react';
import { type ReactNode, useCallback, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import type { TimelineEvent } from '@/lib/types';
import { cn } from '@/lib/utils';
import { useTimelineAnimation } from '../TimelineContext';

export const icons: Record<string, LucideIcon> = {
  work: Briefcase,
  internship: Building2,
  education: GraduationCap,
  project: FolderCode,
  research: Microscope,
  competition: Swords,
  certificate: FileBadge,
  award: Trophy,
};

interface TimelineItemWrapperProps {
  event: TimelineEvent;
  index: number;
  isLeft: boolean;
  children: (isExpanded: boolean) => ReactNode;
}

export function TimelineItemWrapper({ event, index, isLeft, children }: TimelineItemWrapperProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const { onAnimationStart, onAnimationComplete, setLineHidden } = useTimelineAnimation();
  const Icon = icons[event.type] || Briefcase;
  const itemId = `${event.startDate}-${event.title}`;

  const handleToggle = useCallback(() => {
    const nextState = !isExpanded;
    setIsExpanded(nextState);
    // If expanding, hide line immediately
    if (nextState) {
      setLineHidden(itemId, true);
    }
    // If collapsing, we wait for animation complete to show line
  }, [isExpanded, itemId, setLineHidden]);

  const handleAnimationComplete = useCallback(() => {
    onAnimationComplete();
    // If we just finished collapsing, show line
    if (!isExpanded) {
      setLineHidden(itemId, false);
    }
  }, [isExpanded, itemId, onAnimationComplete, setLineHidden]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={cn(
        'relative flex flex-col md:flex-row items-center w-full mb-8',
        isLeft ? 'md:flex-row-reverse' : 'md:flex-row',
      )}
    >
      {/* Spacer for desktop layout */}
      <div className="hidden md:block w-1/2" />

      {/* Connection Point (Platinum/Golden Light) */}
      <div className="absolute left-4 md:left-1/2 w-3 h-3 -ml-[5px] rounded-full bg-white dark:bg-zinc-950 border-2 border-amber-200 dark:border-amber-100/50 z-20 shadow-[0_0_8px_rgba(251,191,36,0.3)] dark:shadow-[0_0_8px_rgba(251,191,36,0.2)]" />

      {/* Content Card Wrapper */}
      <div className={cn('w-full md:w-1/2 pl-12 md:pl-0', isLeft ? 'md:pr-12' : 'md:pl-12')}>
        <motion.div
          layout
          initial={false}
          animate={{
            scale: isExpanded ? 1.05 : 1,
            width: isExpanded ? '120%' : '100%',
            x: isExpanded ? '-10%' : '0%',
            zIndex: isExpanded ? 30 : 1,
          }}
          transition={{
            layout: { duration: 0.4, ease: 'easeInOut' },
            scale: { duration: 0.4, ease: 'easeInOut' },
            width: { duration: 0.4, ease: 'easeInOut' },
            x: { duration: 0.4, ease: 'easeInOut' },
          }}
          onAnimationStart={onAnimationStart}
          onAnimationComplete={handleAnimationComplete}
          className="group cursor-pointer relative transform-gpu"
          onClick={(e) => {
            const target = e.target as HTMLElement;
            if (target.closest('[data-image-stack]')) {
              return;
            }
            handleToggle();
          }}
        >
          <Card
            className={cn(
              'overflow-hidden border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 transition-colors duration-300',
              isExpanded
                ? 'shadow-xl border-zinc-300 dark:border-zinc-700'
                : 'shadow-sm hover:shadow-md hover:border-zinc-300 dark:hover:border-zinc-700',
            )}
          >
            <CardHeader className="p-3 pb-1">
              <div className="flex justify-between items-start gap-2">
                <div className="flex gap-2 items-center">
                  <div className="p-1.5 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-100 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100">
                    <Icon className="w-4 h-4" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm md:text-base leading-none mb-1 text-zinc-900 dark:text-zinc-50">
                      {event.title}
                    </h3>
                    <p className="text-[10px] md:text-xs font-medium text-zinc-500 dark:text-zinc-400">
                      {event.org}
                    </p>
                  </div>
                </div>
                <Badge
                  variant="outline"
                  className="shrink-0 text-[10px] font-mono border-zinc-200 dark:border-zinc-800 text-zinc-500 dark:text-zinc-400 px-1.5 py-0"
                >
                  {event.startDate}
                  {event.endDate
                    ? event.endDate !== event.startDate && ` — ${event.endDate}`
                    : ['work', 'education', 'internship', 'research', 'project'].includes(
                        event.type,
                      ) && ' — Present'}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-3 pt-1">
              {children(isExpanded)}

              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    {event.description && (
                      <div className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed border-t border-zinc-100 dark:border-zinc-800 pt-2 mt-1 whitespace-pre-wrap">
                        {event.description}
                      </div>
                    )}
                    {event.link && (
                      <a
                        href={event.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-medium text-zinc-900 dark:text-zinc-100 mt-2 hover:underline underline-offset-4 decoration-zinc-300 dark:decoration-zinc-700"
                        onClick={(e) => e.stopPropagation()}
                      >
                        View More →
                      </a>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="flex justify-center mt-1 md:hidden group-hover:flex opacity-0 group-hover:opacity-100 transition-opacity">
                <ChevronDown
                  className={cn(
                    'w-4 h-4 text-zinc-400 transition-transform duration-300',
                    isExpanded ? 'rotate-180' : '',
                  )}
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}
