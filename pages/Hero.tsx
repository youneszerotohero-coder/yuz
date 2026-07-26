'use client';
import { useEffect, useRef, useState, useCallback } from 'react';
import Link from 'next/link';
import MotionCard from "@/components/MotionCard"
import SplitText from "@/components/SplitText"
import { Button } from "@/components/ui/button";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLoader } from "@/components/LoaderContext";

gsap.registerPlugin(ScrollTrigger);

const data = [
  { title: "MotionCard", url: "/work1.jpg" },  // blue
  { title: "MotionCard", url: "/work2.jpg" },  // red
  { title: "MotionCard", url: "/work3.jpg" },  // brown/tan
  { title: "MotionCard", url: "/work4.jpg" },  // green
  { title: "MotionCard", url: "/work5.jpeg" },  // amber
  { title: "MotionCard", url: "/work6.jpg" },  // amber
];

const Hero = () => {
  const [isFixed, setIsFixed] = useState(true);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const gsapSetup = useRef(false);
  const { isLoaded } = useLoader();

  // Original isFixed scroll logic (unchanged)
  useEffect(() => {
    const handleScroll = () => {
      setIsFixed(window.scrollY < window.innerHeight);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Set up GSAP ScrollTrigger after the CSS card-fan animation finishes
  useEffect(() => {
    if (!isLoaded) return;
    if (gsapSetup.current) return;

    const timer = setTimeout(() => {
      gsapSetup.current = true;

      const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];
      if (cards.length === 0) return;

      const total = cards.length;
      const width = window.innerWidth;
      const isMobile = width < 768;
      const isLargeMobile = width >= 390 && width < 768;

      // Read the fanned positions from data attributes (set by MotionCard)
      const fanPositions = cards.map((card) => ({
        rotate: parseFloat(card.dataset.fanRotate || '0'),
        tx: parseFloat(card.dataset.fanTx || '0'),
        ty: parseFloat(card.dataset.fanTy || '0'),
      }));

      // Compute target positions (diagonal on desktop, grid on mobile)
      const targetPositions = cards.map((card) => {
        const index = parseInt(card.dataset.index || '0', 10);
        if (isMobile) {
          const cols = 2;
          const cardSize = isLargeMobile ? 160 : 120;
          const gap = isLargeMobile ? 10 : 14;
          const col = index % cols;
          const row = Math.floor(index / cols);
          const gridCenterCol = (cols - 1) / 2;
          const gridCenterRow = (Math.ceil(total / cols) - 1) / 2;
          const gridTX = (col - gridCenterCol) * (cardSize + gap);
          const gridVerticalOffset = isLargeMobile ? 260 : 250;
          const gridTY = (row - gridCenterRow) * (cardSize + gap) + gridVerticalOffset;
          return { rotate: 0, tx: gridTX, ty: gridTY };
        } else {
          const diagMid = -1;
          const diagOffset = index - diagMid;
          return {
            rotate: diagOffset * 1,
            tx: diagOffset * 100,
            ty: diagOffset * 30,
          };
        }
      });

      // Create a proxy object per card to interpolate, then apply as inline transform
      const proxies = cards.map((_, i) => ({
        rot: fanPositions[i].rotate,
        tx: fanPositions[i].tx,
        ty: fanPositions[i].ty,
      }));

      // Kill the CSS animation on each card and set GSAP starting transform
      cards.forEach((card, i) => {
        card.style.animation = 'none';
        card.style.transform = `rotate(${proxies[i].rot}deg) translateX(${proxies[i].tx}px) translateY(${proxies[i].ty}px)`;
      });

      // Build the scrub timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: document.documentElement,
          start: 'top top',
          endTrigger: '#section-2',
          end: 'center center',
          scrub: isMobile ? 0.8 : 1.2,
          invalidateOnRefresh: true,
        },
      });

      // Phase 1 (0 → 0.5): Fanned → Compacted in center
      cards.forEach((card, i) => {
        tl.to(
          proxies[i],
          {
            rot: 0,
            tx: 0,
            ty: 0,
            ease: 'power3.inOut',
            duration: 0.5,
            onUpdate: () => {
              card.style.transform = `rotate(${proxies[i].rot}deg) translateX(${proxies[i].tx}px) translateY(${proxies[i].ty}px)`;
            },
          },
          0
        );
      });

      // Phase 2 (0.5 → 1.0): Compacted → Grid on mobile / Diagonal on desktop
      cards.forEach((card, i) => {
        tl.to(
          proxies[i],
          {
            rot: targetPositions[i].rotate,
            tx: targetPositions[i].tx,
            ty: targetPositions[i].ty,
            ease: 'power3.inOut',
            duration: 0.5,
            onUpdate: () => {
              card.style.transform = `rotate(${proxies[i].rot}deg) translateX(${proxies[i].tx}px) translateY(${proxies[i].ty}px)`;
            },
          },
          0.5
        );
      });
    }, 3300); // Wait for card-fan CSS animation to finish

    return () => clearTimeout(timer);
  }, [isLoaded]);

  return (
    <section className='relative w-full h-screen mx-auto flex flex-col
    justify-around items-center gap-0 md:gap-20'>
      <SplitText
        key={isLoaded ? 'loaded' : 'loading'}
        text="  HELLO YOU!, WELCOME TO MY PORTFOLIO"
        className="text-3xl md:text-5xl w-[90%] md:w-[15em] font-bold tracking-tighter text-center mt-6 md:mt-10"
        delay={50}
        duration={2.5}
        ease="power3.out"
        splitType="chars"
        from={{ opacity: 0, y: 40 }}
        to={{ opacity: 1, y: 0 }}
        threshold={0.1}
        rootMargin="-100px"
        textAlign="center"
      />

      {/* Cards Container toggles from fixed center to absolute at 150vh */}
      <div
        className={isFixed
          ? "fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[5] mt-0 md:mt-5"
          : "absolute top-[150vh] left-1/2 -translate-x-1/2 -translate-y-1/2 z-[5]"}
        style={{
          opacity: isLoaded ? 1 : 0,
          transition: 'opacity 0.3s ease-out'
        }}
      >
        <div className="relative flex justify-center 
          items-center"
          style={{ animation: isLoaded ? 'card-slide 2.5s ease-in-out forwards' : 'none' }}>
          {data.map((item, index) => (
            <MotionCard
              key={index}
              ref={(el) => { cardRefs.current[index] = el; }}
              index={index}
              total={data.length}
              url={item.url}
              isLoaded={isLoaded}
            />
          ))}
        </div>
      </div>

      <div className='flex flex-col items-center gap-4 md:gap-5 px-4 text-center'>
        <h3
          className="text-sm md:text-base"
          style={{
            animation: isLoaded ? 'fade-in-up 3.4s ease-out forwards' : 'none',
            opacity: isLoaded ? undefined : 0
          }}
        >
          I am Yuzusii - a mixed-media specialist based out of Algeria.
        </h3>
        <Button
          asChild
          className='rounded-full hover:scale-110 transition-all duration-300 ease-in-out px-4 md:px-6'
          style={{
            animation: isLoaded ? 'fade-in-up 3.8s ease-out forwards' : 'none',
            opacity: isLoaded ? undefined : 0
          }}
        >
          <Link href="/#footer">
            <img src="/yuz.jpg" alt="yuz"
              className="w-5 h-5 md:w-6 md:h-6 rounded-full object-cover" />
            Contact me
          </Link>
        </Button>
      </div>
    </section>
  )
}

export default Hero