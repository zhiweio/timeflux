'use client';

import { createContext, useCallback, useContext, useMemo, useState } from 'react';

interface TimelineAnimationContextType {
  isLineHidden: boolean;
  setLineHidden: (id: string, hidden: boolean) => void;
  onAnimationStart: () => void;
  onAnimationComplete: () => void;
}

const TimelineAnimationContext = createContext<TimelineAnimationContextType | undefined>(undefined);

export function TimelineAnimationProvider({ children }: { children: React.ReactNode }) {
  const [animatingCount, setAnimatingCount] = useState(0);
  const [hiddenIds, setHiddenIds] = useState<Set<string>>(new Set());

  const onAnimationStart = useCallback(() => {
    setAnimatingCount((prev) => prev + 1);
  }, []);

  const onAnimationComplete = useCallback(() => {
    setAnimatingCount((prev) => Math.max(0, prev - 1));
  }, []);

  const setLineHidden = useCallback((id: string, hidden: boolean) => {
    setHiddenIds((prev) => {
      const next = new Set(prev);
      if (hidden) next.add(id);
      else next.delete(id);
      return next;
    });
  }, []);

  const value = useMemo(
    () => ({
      isLineHidden: animatingCount > 0 || hiddenIds.size > 0,
      setLineHidden,
      onAnimationStart,
      onAnimationComplete,
    }),
    [animatingCount, hiddenIds.size, setLineHidden, onAnimationStart, onAnimationComplete],
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
