'use client';

import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { useTimelineAnimation } from './TimelineContext';

export function Line() {
  const ref = useRef<HTMLDivElement>(null);
  const { isLineHidden } = useTimelineAnimation();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end center'],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Calculate the position for the indicator
  const indicatorY = useTransform(scaleY, [0, 1], ['0%', '100%']);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 1 }}
      animate={{ opacity: isLineHidden ? 0 : 1 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="absolute left-4 md:left-1/2 top-0 bottom-0 w-8 -ml-4 group pointer-events-none z-10"
    >
      {/* Background Track with Mask */}
      <div className="absolute left-1/2 top-0 bottom-0 w-[1px] -ml-[0.5px] bg-zinc-100 dark:bg-zinc-800/30 [mask-image:linear-gradient(to_bottom,transparent,black_5%,black_95%,transparent)]" />

      {/* Tick Marks / Ruler Accents */}
      <div className="absolute left-1/2 top-0 bottom-0 w-4 -ml-2 flex flex-col justify-between py-24 opacity-10 dark:opacity-5">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            // biome-ignore lint/suspicious/noArrayIndexKey: Static decorative elements
            key={i}
            className="w-full h-[1px] bg-zinc-300 dark:bg-zinc-600"
            style={{ width: i % 5 === 0 ? '100%' : '40%', margin: '0 auto' }}
          />
        ))}
      </div>

      {/* Progress Line with Gradient (Golden Holy Light) */}
      <motion.div
        style={{ scaleY, transformOrigin: 'top' }}
        className="absolute left-1/2 top-0 bottom-0 w-[2px] -ml-[1px] bg-linear-to-b from-amber-100 via-amber-50 to-transparent dark:from-amber-200 dark:via-amber-100 dark:to-transparent z-10 shadow-[0_0_12px_rgba(251,191,36,0.4)]"
      />

      {/* Soft Glow following the progress */}
      <motion.div
        style={{ scaleY, transformOrigin: 'top' }}
        className="absolute left-1/2 top-0 bottom-0 w-[10px] -ml-[5px] bg-amber-200/20 blur-lg z-0"
      />

      {/* Glowing Runner (The active point - Golden Holy Light) */}
      <motion.div
        style={{ top: indicatorY }}
        className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 z-25"
      >
        {/* Outer pulse (Golden Light) */}
        <div className="absolute inset-0 rounded-full bg-amber-400 animate-ping opacity-40 shadow-[0_0_20px_rgba(251,191,36,0.6)]" />

        {/* Middle ring */}
        <div className="absolute inset-1 rounded-full border-2 border-amber-200/50 animate-pulse scale-125" />

        {/* Core Dot (Brilliant Warm White) */}
        <div className="absolute inset-[6px] rounded-full bg-amber-50 shadow-[0_0_25px_rgba(251,191,36,0.8),0_0_10px_white] border-2 border-white dark:border-amber-100" />
      </motion.div>

      {/* Background Ambient Glow (Warm Holy Light Bloom) */}
      <motion.div
        style={{ top: indicatorY }}
        className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 pointer-events-none z-0"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(252,211,77,0.15)_0%,transparent_70%)] blur-3xl" />
      </motion.div>

      {/* Side Decorative Elements (Ambient Dots) */}
      <div className="absolute inset-y-0 -left-48 -right-48 pointer-events-none opacity-[0.05] dark:opacity-[0.1]">
        <div className="h-full w-full bg-[radial-gradient(var(--color-muted)_1px,transparent_1px)] [background-size:32px_32px] [mask-image:linear-gradient(to_right,transparent,black_20%,black_80%,transparent)]" />
      </div>
    </motion.div>
  );
}
