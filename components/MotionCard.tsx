'use client';
import { useEffect, useRef, useState } from 'react';

interface MotionCardProps {
  index: number;
  total: number;
  url: string;
}

const MotionCard = ({ index, total, url }: MotionCardProps) => {
  const mid = (total - 1) / 2;
  const offset = index - mid;
  const rotate = offset * 1;
  const translateX = offset * 110;
  const translateY = Math.abs(offset) * 1;

  const [fanDone, setFanDone] = useState(false);
  const [unfanProgress, setUnfanProgress] = useState(0);
  const [isPastHero, setIsPastHero] = useState(false);

  // Wait for card-fan animation to finish (2.5s delay + 0.8s duration)
  useEffect(() => {
    const timer = setTimeout(() => setFanDone(true), 3300);
    return () => clearTimeout(timer);
  }, []);

  // Listen to scroll and compute unfan progress
  useEffect(() => {
    if (!fanDone) return;

    const handleScroll = () => {
      const viewportHeight = window.innerHeight;
      const scroll = window.scrollY;

      // Unfan completes by the time we've scrolled past the hero (100vh)
      setUnfanProgress(Math.max(0, Math.min(1, scroll / viewportHeight)));

      // Trigger keyframe animation when passing 100vh
      setIsPastHero(scroll >= viewportHeight);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // run once immediately
    return () => window.removeEventListener('scroll', handleScroll);
  }, [fanDone]);

  // Interpolated values when scroll-controlling
  const currentRotate = rotate * (1 - unfanProgress);
  const currentTX = translateX * (1 - unfanProgress);
  const currentTY = translateY * (1 - unfanProgress);

  const diagRotate = offset * 1; // slight rotation fan
  const diagTX = offset * 100;  // X spread
  const diagTY = offset * 40;  // Y spread

  // Final transform values based on state
  const finalRotate = isPastHero ? diagRotate : currentRotate;
  const finalTX = isPastHero ? diagTX : currentTX;
  const finalTY = isPastHero ? diagTY : currentTY;

  // We only want a CSS transition when animating to/from the diagonal state
  // During the 0-100vh scroll phase, we want instant updates matching the scrollbar
  const transitionStyle = isPastHero
    ? 'transform 0.8s cubic-bezier(0.25, 1, 0.5, 1)'
    : 'none';

  return (
    <div
      className='absolute w-[12em] h-[12em] rounded-xl shadow-lg
      hover:scale-110 cursor-pointer'
      style={{
        backgroundImage: `url(${url})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        transformOrigin: 'bottom center',
        zIndex: total - Math.abs(offset),
        transition: fanDone ? transitionStyle : 'all 0.3s ease-in-out',
        ...(fanDone
          ? {
            transform: `rotate(${finalRotate}deg) translateX(${finalTX}px) translateY(${finalTY}px) scale(1)`,
          }
          : {
            animation: 'card-fan 0.8s ease-out 2.5s forwards',
            '--fan-rotate': `${rotate}deg`,
            '--fan-tx': `${translateX}px`,
            '--fan-ty': `${translateY}px`,
          }),
      } as React.CSSProperties & Record<string, any>}
    />
  );
};

export default MotionCard;