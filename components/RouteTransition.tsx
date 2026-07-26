'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function RouteTransition({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Route Transition Black & White Curtain Wipe */}
      <motion.div
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 1 }}
        transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
        style={{ originY: 0 }}
        className="fixed inset-0 z-[9990] bg-black pointer-events-none flex items-center justify-center border-b border-white/20 shadow-2xl"
      >
        <motion.div
          initial={{ opacity: 1, scale: 1 }}
          animate={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-xl md:text-2xl font-black uppercase tracking-[0.35em] text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]">
            YUZUSII
          </span>
          <span className="w-8 h-[1px] bg-white/40" />
        </motion.div>
      </motion.div>

      {/* Main Page Content Entrance */}
      <motion.div
        initial={{ opacity: 0, y: 15, scale: 0.99 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -15, scale: 0.99 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
      >
        {children}
      </motion.div>
    </>
  );
}
