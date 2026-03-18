'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

interface MotionCardProps {
  index: number;
  total: number;
  url: string;
}

const MotionCard = ({ index, total, url }: MotionCardProps) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isLargeMobile, setIsLargeMobile] = useState(false);
  const [fanDone, setFanDone] = useState(false);
  const [unfanProgress, setUnfanProgress] = useState(0);
  const [isPastHero, setIsPastHero] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsLargeMobile(width >= 390 && width < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const mid = (total - 1) / 2;
  const offset = index - mid;
  const rotate = offset * 1;
  const translateX = offset * (isMobile ? (isLargeMobile ? 85 : 65) : 110);
  const translateY = Math.abs(offset) * (isMobile ? 2 : 1);

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

      setUnfanProgress(Math.max(0, Math.min(1, scroll / viewportHeight)));
      setIsPastHero(scroll >= viewportHeight);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [fanDone]);

  // Interpolated values during scroll
  const currentRotate = rotate * (1 - unfanProgress);
  const currentTX = translateX * (1 - unfanProgress);
  const currentTY = translateY * (1 - unfanProgress);

  // --- Desktop: diagonal layout ---
  const diagMid = -1;
  const diagOffset = index - diagMid;
  const diagRotate = diagOffset * 1;
  const diagTX = diagOffset * 100;
  const diagTY = diagOffset * 30;

  // --- Mobile: 2-column grid layout ---
  const cols = 2;
  const cardSize = isLargeMobile ? 160 : 120;
  const gap = isLargeMobile ? 10 : 14;
  const col = index % cols;
  const row = Math.floor(index / cols);
  const gridCenterCol = (cols - 1) / 2; // 0.5
  const gridCenterRow = (Math.ceil(total / cols) - 1) / 2; // 1
  const gridTX = (col - gridCenterCol) * (cardSize + gap);
  // Push the grid down so it forms below the text/buttons
  const gridVerticalOffset = isLargeMobile ? 170 : 150;
  const gridTY = (row - gridCenterRow) * (cardSize + gap) + gridVerticalOffset;
  const gridRotate = 0;

  // Choose target based on mobile vs desktop
  let targetRotate: number, targetTX: number, targetTY: number;
  if (isMobile) {
    targetRotate = gridRotate;
    targetTX = gridTX;
    targetTY = gridTY;
  } else {
    targetRotate = diagRotate;
    targetTX = diagTX;
    targetTY = diagTY;
  }

  // Final values
  const finalRotate = isPastHero ? targetRotate : currentRotate;
  const finalTX = isPastHero ? targetTX : currentTX;
  const finalTY = isPastHero ? targetTY : currentTY;

  const transitionStyle = isPastHero
    ? 'transform 0.8s cubic-bezier(0.25, 1, 0.5, 1)'
    : 'none';

  return (
    <div
      className='absolute w-[7.5em] h-[7.5em] min-[390px]:w-[10em] min-[390px]:h-[10em] md:w-[12em] md:h-[12em] cursor-pointer'
      style={{
        zIndex: total - Math.abs(offset),
        transition: fanDone ? transitionStyle : 'all 0.3s ease-in-out',
        ...(fanDone
          ? {
            transform: `rotate(${finalRotate}deg) translateX(${finalTX}px) translateY(${finalTY}px)`,
          }
          : {
            animation: 'card-fan 0.8s ease-out 2.5s forwards',
            '--fan-rotate': `${rotate}deg`,
            '--fan-tx': `${translateX}px`,
            '--fan-ty': `${translateY}px`,
          }),
      } as React.CSSProperties & Record<string, any>}
    >
      <div 
        className='w-full h-full rounded-xl shadow-lg transition-transform duration-300 hover:scale-[1.15] group relative overflow-hidden'
        style={{
          backgroundImage: `url(${url})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transformOrigin: 'bottom center',
        }}
      >
        {/* Hover Gradient Overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        
        {/* See More Button */}
        <Link href={`/project/${index}`} className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 z-10 block">
          <div className="bg-foreground hover:bg-foreground/90 text-background text-[10px] md:text-xs px-2.5 py-1 md:px-3 md:py-1.5 rounded-full flex items-center gap-1 font-medium shadow-xl">
            See More <ArrowUpRight size={12} />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default MotionCard;