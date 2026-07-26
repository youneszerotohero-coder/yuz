'use client';
import { useEffect, useState, forwardRef } from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { useLoader } from './LoaderContext';

interface MotionCardProps {
  index: number;
  total: number;
  url: string;
  isLoaded?: boolean;
}

const MotionCard = forwardRef<HTMLDivElement, MotionCardProps>(({ index, total, url, isLoaded: propIsLoaded }, ref) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isLargeMobile, setIsLargeMobile] = useState(false);
  const contextLoader = useLoader();
  const isLoaded = propIsLoaded ?? contextLoader.isLoaded;

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

  return (
    <div
      ref={ref}
      className='absolute w-[7.5em] h-[7.5em] min-[390px]:w-[10em] min-[390px]:h-[10em] md:w-[12em] md:h-[12em] cursor-pointer'
      data-fan-rotate={rotate}
      data-fan-tx={translateX}
      data-fan-ty={translateY}
      data-offset={offset}
      data-index={index}
      style={{
        zIndex: total - Math.abs(offset),
        animation: isLoaded ? 'card-fan 0.8s ease-out 2.5s forwards' : 'none',
        '--fan-rotate': `${rotate}deg`,
        '--fan-tx': `${translateX}px`,
        '--fan-ty': `${translateY}px`,
      } as React.CSSProperties & Record<string, any>}
    >
      <Link
        href={`/project/${index}`}
        className='w-full h-full rounded-xl shadow-lg transition-transform duration-300 hover:scale-[1.15] group relative overflow-hidden block'
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
        <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 z-10 block">
          <div className="bg-foreground hover:bg-foreground/90 text-background text-[10px] md:text-xs px-2.5 py-1 md:px-3 md:py-1.5 rounded-full flex items-center gap-1 font-medium shadow-xl">
            See More <ArrowUpRight size={12} />
          </div>
        </div>
      </Link>
    </div>
  );
});

MotionCard.displayName = 'MotionCard';

export default MotionCard;