'use client';

import { AnimatePresence, motion } from 'framer-motion';
import {
  Briefcase,
  Building2,
  ChevronLeft,
  ChevronRight,
  FileBadge,
  FolderCode,
  GraduationCap,
  LayoutGrid,
  type LucideIcon,
  Microscope,
  Swords,
  Trophy,
} from 'lucide-react';
import { useState } from 'react';
import type { EventType } from '@/lib/types';
import { cn } from '@/lib/utils';

interface FilterProps {
  currentFilter: EventType | 'all';
  onFilterChange: (filter: EventType | 'all') => void;
}

const filters: { value: EventType | 'all'; label: string; icon: LucideIcon }[] = [
  { value: 'all', label: 'All', icon: LayoutGrid },
  { value: 'work', label: 'Work', icon: Briefcase },
  { value: 'internship', label: 'Internship', icon: Building2 },
  { value: 'project', label: 'Projects', icon: FolderCode },
  { value: 'research', label: 'Research', icon: Microscope },
  { value: 'education', label: 'Education', icon: GraduationCap },
  { value: 'competition', label: 'Compete', icon: Swords },
  { value: 'certificate', label: 'Certs', icon: FileBadge },
  { value: 'award', label: 'Awards', icon: Trophy },
];

export function Filter({ currentFilter, onFilterChange }: FilterProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div
      className={cn(
        'fixed z-50 transition-all duration-500 ease-in-out',
        // Mobile: pinned to left edge at bottom
        'bottom-24 left-0',
        // Desktop: floating in the middle right (keep original)
        'md:left-auto md:bottom-auto md:top-1/2 md:-translate-y-1/2 md:right-8',
        // If collapsed on desktop, move to right edge
        isCollapsed && 'md:right-0',
        // Use transform for mobile collapse (hide to the left)
        isCollapsed ? '-translate-x-[calc(100%-44px)] md:translate-x-0' : 'translate-x-0',
      )}
    >
      <div
        className={cn(
          'flex flex-col gap-1 p-1.5 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border border-zinc-200 dark:border-zinc-800 shadow-xl transition-all duration-500',
          // Mobile: always rounded on right, flat on left
          'rounded-r-2xl rounded-l-none border-l-0',
          // Desktop: rounded all around when expanded, flat on right when collapsed
          !isCollapsed && 'md:rounded-2xl md:border-l md:border-r',
          isCollapsed && 'md:rounded-l-2xl md:rounded-r-none md:border-r-0 md:border-l',
        )}
      >
        {/* Toggle Button */}
        <button
          type="button"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="flex items-center justify-center p-2 mb-1 text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
        >
          {/* Mobile: Left/Right icons based on left-side position */}
          <div className="md:hidden">
            {isCollapsed ? (
              <ChevronRight className="w-4 h-4" />
            ) : (
              <ChevronLeft className="w-4 h-4" />
            )}
          </div>
          {/* Desktop: Keep original icons for right-side position */}
          <div className="hidden md:block">
            {isCollapsed ? (
              <ChevronLeft className="w-4 h-4" />
            ) : (
              <ChevronRight className="w-4 h-4" />
            )}
          </div>
        </button>

        <div className="flex flex-col gap-1">
          {filters.map((filter) => {
            const Icon = filter.icon;
            return (
              <button
                type="button"
                key={filter.value}
                onClick={() => onFilterChange(filter.value)}
                className={cn(
                  'relative px-3 py-2 text-[11px] md:text-xs font-bold uppercase tracking-wider rounded-xl transition-all duration-200 text-left flex items-center gap-2.5',
                  isCollapsed ? 'min-w-0 justify-center' : 'min-w-[100px]',
                  currentFilter === filter.value
                    ? 'text-white dark:text-zinc-900'
                    : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800',
                )}
              >
                {currentFilter === filter.value && (
                  <motion.div
                    layoutId="activeFilter"
                    className="absolute inset-0 bg-zinc-900 dark:bg-zinc-50 rounded-xl"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
                <Icon className="relative z-10 w-3.5 h-3.5 shrink-0" />
                <AnimatePresence>
                  {!isCollapsed && (
                    <motion.span
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: 'auto' }}
                      exit={{ opacity: 0, width: 0 }}
                      className="relative z-10 overflow-hidden whitespace-nowrap"
                    >
                      {filter.label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
