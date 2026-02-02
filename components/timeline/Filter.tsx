'use client';

import { AnimatePresence, motion } from 'framer-motion';
import {
  Briefcase,
  Building2,
  ChevronLeft,
  ChevronRight,
  FileBadge,
  Filter as FilterIcon,
  FolderCode,
  GraduationCap,
  LayoutGrid,
  type LucideIcon,
  Microscope,
  Swords,
  Trophy,
  X,
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

/**
 * ViewState:
 * 0: Floating Button (Mobile default)
 * 1: Icon Only (Mobile Expanded 1) / Icon Only (Desktop collapsed)
 * 2: Full (Mobile Expanded 2) / Full (Desktop Expanded)
 */
type ViewState = 0 | 1 | 2;

export function Filter({ currentFilter, onFilterChange }: FilterProps) {
  // Default to 0 (Floating Button on mobile)
  const [viewState, setViewState] = useState<ViewState>(0);

  const isFull = viewState === 2;
  const isFloatingButton = viewState === 0;

  const handleMobileToggle = () => {
    // 0 (Button) -> 1 (Icons) -> 2 (Full) -> 1 (Icons) -> 0 (Button)
    // We can't distinguish 1->2 vs 1->0 with a single button click without state history or multiple buttons.
    // User request:
    // "悬浮按钮 -> 半展开（图标） -> 全展开（图标+文字）" (0 -> 1 -> 2)
    // "全展开 -> 半展开 -> 悬浮按钮" (2 -> 1 -> 0)

    // Implementation:
    // The top toggle button will handle 1 <-> 2.
    // We add a new "X" (Minimize) button in the footer (visible on mobile) to handle * -> 0.

    setViewState((prev) => {
      if (prev === 0) return 1;
      // If full (2), collapse to icons (1)
      if (prev === 2) return 1;
      // If icons (1), expand to full (2)
      if (prev === 1) return 2;
      return 0;
    });
  };

  const handleMobileMinimize = () => {
    setViewState(0);
  };

  const handleDesktopToggle = () => {
    // Toggle: 1 <-> 2 (Desktop treats 0 as 1/Collapsed)
    setViewState((prev) => (prev === 2 ? 1 : 2));
  };

  return (
    <>
      {/* Mobile Floating Button (Only visible in state 0) */}
      <AnimatePresence>
        {isFloatingButton && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, x: -20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.8, x: -20 }}
            onClick={handleMobileToggle}
            className="md:hidden fixed z-50 bottom-24 left-4 w-10 h-10 rounded-full bg-white/50 dark:bg-zinc-900/50 backdrop-blur-md border border-zinc-200/50 dark:border-zinc-800/50 shadow-lg flex items-center justify-center text-zinc-600 dark:text-zinc-300 active:scale-95 transition-transform"
          >
            <FilterIcon className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Main Filter Container */}
      <AnimatePresence>
        {(!isFloatingButton || (typeof window !== 'undefined' && window.innerWidth >= 768)) && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className={cn(
              'fixed z-50 transition-all duration-500 ease-in-out',
              // Mobile: pinned to left edge at bottom
              'bottom-24 left-0 md:left-auto md:bottom-auto md:top-1/2 md:-translate-y-1/2 md:right-8',
              // Desktop collapsed: pinned to right edge
              !isFull && 'md:right-0',
              // Desktop: always reset translate
              'md:translate-x-0',
              // Mobile: hidden logic handled by AnimatePresence conditionally rendering this block
              // But we need to handle the "Icon Only" vs "Full" width transition
            )}
          >
            <div
              className={cn(
                'flex flex-col gap-1 p-1.5 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border border-zinc-200 dark:border-zinc-800 shadow-xl transition-all duration-500',
                // Mobile: always rounded on right, flat on left
                'rounded-r-2xl rounded-l-none border-l-0',
                // Desktop Expanded: rounded all around
                isFull && 'md:rounded-2xl md:border-l md:border-r',
                // Desktop Collapsed: flat on right
                !isFull && 'md:rounded-l-2xl md:rounded-r-none md:border-r-0 md:border-l',
              )}
            >
              {/* Toggle Button */}
              <div className="flex flex-col gap-1 mb-1">
                {/* Mobile Header: Toggle (1<->2) */}
                <div className="flex md:hidden items-center justify-center gap-1">
                  {/* Expand/Collapse (1 <-> 2) */}
                  <button
                    type="button"
                    tabIndex={0}
                    className="flex-1 flex items-center justify-center p-2 text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors cursor-pointer bg-transparent border-none"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleMobileToggle();
                    }}
                  >
                    {isFull ? (
                      <ChevronLeft className="w-4 h-4" />
                    ) : (
                      <ChevronRight className="w-4 h-4" />
                    )}
                  </button>
                </div>

                {/* Desktop Toggle */}
                <button
                  type="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.stopPropagation();
                      handleDesktopToggle();
                    }
                  }}
                  className="hidden md:flex items-center justify-center p-2 mb-1 text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors cursor-pointer bg-transparent border-none"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDesktopToggle();
                  }}
                >
                  {isFull ? (
                    <ChevronRight className="w-4 h-4" />
                  ) : (
                    <ChevronLeft className="w-4 h-4" />
                  )}
                </button>
              </div>

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
                        !isFull ? 'min-w-0 justify-center' : 'min-w-[100px]',
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
                        {isFull && (
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

                {/* Mobile Minimize Button (Moved to bottom) */}
                {!isFloatingButton && (
                  <div className="flex md:hidden items-center justify-center pt-1 mt-1 border-t border-zinc-100 dark:border-zinc-800">
                    <button
                      type="button"
                      tabIndex={0}
                      className="flex items-center justify-center p-2 text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors cursor-pointer bg-transparent border-none"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleMobileMinimize();
                      }}
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
