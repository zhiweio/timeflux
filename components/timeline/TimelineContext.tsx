'use client';

import { createContext, useCallback, useContext, useMemo, useState } from 'react';

interface TimelineAnimationContextType {
  isLineHidden: boolean;
  expandedId: string | null;
  setExpandedId: (id: string | null) => void;
  onAnimationStart: () => void;
  onAnimationComplete: () => void;
}

const TimelineAnimationContext = createContext<TimelineAnimationContextType | undefined>(undefined);

export function TimelineAnimationProvider({ children }: { children: React.ReactNode }) {
  const [animatingCount, setAnimatingCount] = useState(0);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const onAnimationStart = useCallback(() => {
    setAnimatingCount((prev) => prev + 1);
  }, []);

  const onAnimationComplete = useCallback(() => {
    setAnimatingCount((prev) => Math.max(0, prev - 1));
  }, []);

  const value = useMemo(
    () => ({
      // Hide line if any animation is running OR if any card is expanded
      isLineHidden: animatingCount > 0 || expandedId !== null,
      expandedId,
      setExpandedId,
      onAnimationStart,
      onAnimationComplete,
    }),
    [animatingCount, expandedId, onAnimationStart, onAnimationComplete],
  );

  return (
    <TimelineAnimationContext.Provider value={value}>{children}</TimelineAnimationContext.Provider>
  );
}

export function useTimelineAnimation() {
  const context = useContext(TimelineAnimationContext);
  if (context === undefined) {
    throw new Error('useTimelineAnimation must be used within a TimelineAnimationProvider');
  }
  return context;
}
