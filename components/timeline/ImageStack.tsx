'use client';

import { AnimatePresence, motion, type PanInfo, useMotionValue, useTransform } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import NextImage from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';

interface ImageStackProps {
  images: string[];
  title: string;
}

export function ImageStack({ images, title }: ImageStackProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<'left' | 'right'>('right'); // Default to right for initial exit
  const [isExiting, setIsExiting] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isAnimating = useRef(false);

  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-18, 18]);

  // Preload next images
  useEffect(() => {
    const nextIndex = (currentIndex + 1) % images.length;
    const prevIndex = (currentIndex - 1 + images.length) % images.length;
    const img1 = new Image();
    const img2 = new Image();
    img1.src = images[nextIndex];
    img2.src = images[prevIndex];
  }, [currentIndex, images]);

  const changeCard = useCallback(
    (dir: 'left' | 'right') => {
      if (isAnimating.current) return;
      isAnimating.current = true;
      setIsExiting(true);

      // Set direction BEFORE updating index
      setDirection(dir);

      // Force a small delay to ensure direction state propagates to variants
      // before AnimatePresence triggers the exit animation
      requestAnimationFrame(() => {
        // Increment absolute index to ensure unique keys
        setCurrentIndex((prev) => {
          if (dir === 'right') return prev + 1;
          return prev - 1;
        });

        // Reset MotionValue x to 0 immediately so the new card starts at center
        if (x.get() !== 0) {
          x.set(0);
        }

        // Reset lock after animation
        setTimeout(() => {
          isAnimating.current = false;
          // direction state persists, no need to reset
        }, 400);
      });
    },
    [x],
  );

  const handleDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const threshold = 50;
    if (info.offset.x > threshold) {
      changeCard('right');
    } else if (info.offset.x < -threshold) {
      changeCard('left');
    } else {
      // If not swiped far enough, reset position smoothly
      // Since we don't change index, we just animate x back to 0
      // We can use x.set(0) but that's instant. Framer Motion handles dragSnapToOrigin automatically.
      // So we don't strictly need to do anything here if dragSnapToOrigin is true.
    }
  };

  // Determine which cards to show (up to 3)
  const cards = [0, 1, 2]
    .map((offset) => {
      const absIndex = currentIndex + offset;
      const modIndex = ((absIndex % images.length) + images.length) % images.length;
      return {
        index: modIndex,
        image: images[modIndex],
        offset,
        key: `${images[modIndex]}-${absIndex}`, // Unique key using absolute index
      };
    })
    .reverse();

  return (
    <div
      ref={containerRef}
      className="relative w-full h-64 md:h-80 flex items-center justify-center my-6 perspective-1000 touch-pan-y group/stack"
    >
      {/* Navigation Arrows */}
      <div className="absolute inset-y-0 left-0 z-10 flex items-center pl-2 opacity-0 group-hover/stack:opacity-100 transition-opacity duration-300">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            changeCard('left');
          }}
          className="bg-black/50 hover:bg-black/70 text-white p-2 rounded-full backdrop-blur-sm transition-colors"
          aria-label="Previous image"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
      </div>

      <div className="absolute inset-y-0 right-0 z-10 flex items-center pr-2 opacity-0 group-hover/stack:opacity-100 transition-opacity duration-300">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            changeCard('right');
          }}
          className="bg-black/50 hover:bg-black/70 text-white p-2 rounded-full backdrop-blur-sm transition-colors"
          aria-label="Next image"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      <AnimatePresence mode="popLayout" onExitComplete={() => setIsExiting(false)}>
        {cards.map((card) => {
          const isFront = card.offset === 0;

          // Define animation variants for cleaner state management
          const variants = {
            front: {
              zIndex: 3,
              scale: 1,
              y: 0,
              opacity: 1,
              filter: 'brightness(1)',
            },
            back: {
              zIndex: 3 - card.offset,
              scale: 1 - card.offset * 0.05,
              y: card.offset * 15,
              opacity: 1 - card.offset * 0.2,
              filter: `brightness(${1 - card.offset * 0.1})`,
            },
            exit: (dir: string) => ({
              zIndex: 100,
              x: dir === 'right' ? 200 : -200,
              opacity: 0,
              rotate: dir === 'right' ? 20 : -20,
              transition: { duration: 0.2 },
            }),
          };

          return (
            <motion.div
              key={card.key}
              layout
              custom={direction}
              className="absolute w-full h-full rounded-xl overflow-hidden shadow-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900"
              style={{
                x: isFront && !isExiting ? x : 0,
                rotate: isFront && !isExiting ? rotate : 0,
                cursor: isFront && !isExiting ? 'grab' : 'default',
              }}
              variants={variants}
              initial="back"
              animate={isFront ? 'front' : 'back'}
              exit="exit"
              drag={isFront && !isExiting ? 'x' : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragSnapToOrigin
              onDragEnd={isFront && !isExiting ? handleDragEnd : undefined}
              whileTap={isFront && !isExiting ? { cursor: 'grabbing' } : undefined}
              transition={{
                layout: { type: 'spring', stiffness: 300, damping: 30 },
                type: 'spring',
                stiffness: 300,
                damping: 20,
              }}
            >
              <NextImage
                src={card.image}
                alt={`${title} - ${card.index + 1}`}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover pointer-events-none select-none"
                draggable={false}
                unoptimized
              />

              <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-md font-medium">
                {card.index + 1} / {images.length}
              </div>

              {isFront && currentIndex === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: 1, duration: 0.5 }}
                  className="absolute inset-0 flex items-center justify-center pointer-events-none"
                >
                  <div className="bg-black/30 backdrop-blur-[1px] text-white/80 text-xs px-3 py-1.5 rounded-full border border-white/20">
                    Swipe or Drag
                  </div>
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
