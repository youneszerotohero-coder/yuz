'use client';
import { useEffect, useState } from 'react';
import MotionCard from "@/components/MotionCard"
import SplitText from "@/components/SplitText"
import { Button } from "@/components/ui/button";

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

  useEffect(() => {
    const handleScroll = () => {
      // Once we scroll past the first section (100vh), stop being fixed
      setIsFixed(window.scrollY < window.innerHeight);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className='relative w-full h-screen mx-auto flex flex-col
    justify-around items-center'>
      <SplitText
        text="  HELLO YOU!, WELCOME TO MY PORTFOLIO"
        className="text-5xl w-[15em] font-semibold text-center mt-10"
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
          ? "fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
          : "absolute top-[150vh] left-1/2 -translate-x-1/2 -translate-y-1/2 z-10"}
      >
        <div className="relative flex justify-center 
          items-center right-0 bottom-0"
          style={{ animation: 'card-slide 2.5s ease-in-out forwards' }}>
          {data.map((item, index) => (
            <MotionCard key={index} index={index} total={data.length} url={item.url} />
          ))}
        </div>
      </div>

      <div className='flex flex-col items-center gap-5'>
        <h3
          style={{ animation: 'fade-in-up 3.4s ease-out forwards' }}
        >
          I am Yuzusii - a mixed-media specialist based out of Algeria.
        </h3>
        <Button
          className='rounded-full hover:scale-110 transition-all duration-300 ease-in-out '
          style={{ animation: 'fade-in-up 3.8s ease-out forwards' }}
        >
          <img src="/yuz.jpg" alt="yuz"
            className="w-6 h-6 rounded-full object-cover" />
          Contact me
        </Button>
      </div>
    </section>
  )
}

export default Hero