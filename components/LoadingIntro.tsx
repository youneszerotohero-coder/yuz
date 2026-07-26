'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLoader } from './LoaderContext';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function LoadingIntro() {
  const { isLoaded, setIsLoaded, hasIntroPlayed, setHasIntroPlayed } = useLoader();
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('INITIALIZING...');
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // If intro has already played in this session, immediately mark as loaded
    if (hasIntroPlayed) {
      setIsLoaded(true);
      return;
    }

    // Lock body scroll while loading
    document.body.style.overflow = 'hidden';

    const duration = 2200; // ~2.2s loading time
    const startTime = performance.now();

    const updateProgress = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const currentProgress = Math.min(Math.floor((elapsed / duration) * 100), 100);

      setProgress(currentProgress);

      if (currentProgress < 30) {
        setStatusText('INITIALIZING YUZUSII STUDIO...');
      } else if (currentProgress < 65) {
        setStatusText('LOADING MIXED MEDIA...');
      } else if (currentProgress < 95) {
        setStatusText('SYNCHRONIZING VISUALS...');
      } else {
        setStatusText('READY');
      }

      if (elapsed < duration) {
        requestAnimationFrame(updateProgress);
      } else {
        // Completed loading
        setTimeout(() => {
          setIsExiting(true);
          setTimeout(() => {
            setIsLoaded(true);
            setHasIntroPlayed(true);
            document.body.style.overflow = '';

            // Refresh ScrollTrigger so onscroll animations calculate correctly
            gsap.registerPlugin(ScrollTrigger);
            setTimeout(() => {
              ScrollTrigger.refresh();
            }, 100);
          }, 800);
        }, 300);
      }
    };

    const animFrame = requestAnimationFrame(updateProgress);

    return () => {
      cancelAnimationFrame(animFrame);
      document.body.style.overflow = '';
    };
  }, [hasIntroPlayed, setIsLoaded, setHasIntroPlayed]);

  if (isLoaded) return null;

  return (
    <AnimatePresence>
      {!isLoaded && (
        <div className="fixed inset-0 z-[99999] pointer-events-auto flex items-center justify-center select-none overflow-hidden bg-black text-white">
          {/* Top Curtain */}
          <motion.div
            initial={{ y: 0 }}
            animate={isExiting ? { y: '-100%' } : { y: 0 }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="absolute top-0 left-0 w-full h-[50.5vh] bg-black border-b border-white/10 shadow-2xl z-10"
          />

          {/* Bottom Curtain */}
          <motion.div
            initial={{ y: 0 }}
            animate={isExiting ? { y: '100%' } : { y: 0 }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="absolute bottom-0 left-0 w-full h-[50.5vh] bg-black border-t border-white/10 shadow-2xl z-10"
          />

          {/* Center Content Container */}
          <motion.div
            initial={{ opacity: 1, scale: 1 }}
            animate={isExiting ? { opacity: 0, scale: 1.08 } : { opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="relative z-20 flex flex-col items-center justify-center p-6 text-center max-w-md w-full"
          >
            {/* Animated Yuzusii Text */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="flex flex-col items-center mb-10"
            >
              <h1 className="text-4xl md:text-6xl font-black tracking-[0.35em] text-white uppercase drop-shadow-[0_0_25px_rgba(255,255,255,0.4)]">
                YUZUSII
              </h1>
              <p className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-zinc-400 font-mono mt-3">
                Mixed Media Specialist
              </p>
            </motion.div>

            {/* Black & White Minimalist Loading Bar */}
            <div className="w-full max-w-xs md:max-w-sm bg-zinc-900 p-0.5 rounded-full border border-white/15 overflow-hidden relative mb-4 shadow-[0_0_20px_rgba(255,255,255,0.08)]">
              <div
                className="h-1.5 md:h-2 rounded-full bg-white transition-all duration-100 ease-out relative shadow-[0_0_12px_rgba(255,255,255,0.9)]"
                style={{ width: `${progress}%` }}
              >
                {/* Light Sweep */}
                <div className="absolute inset-0 bg-white/40 animate-[shimmer_1.5s_infinite] bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.9),transparent)]" />
              </div>
            </div>

            {/* Monochrome Status & Counter */}
            <div className="w-full max-w-xs md:max-w-sm flex items-center justify-between text-xs font-mono px-1">
              <span className="text-zinc-500 tracking-widest uppercase truncate max-w-[200px]">
                {statusText}
              </span>
              <span className="text-white font-bold text-sm tracking-widest ml-2">
                {progress < 10 ? `0${progress}%` : `${progress}%`}
              </span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
