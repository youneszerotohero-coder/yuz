'use client';

import { useEffect, useRef, useState } from 'react';
import SplitText from '@/components/SplitText';
import { Button } from '@/components/ui/button';

export default function ProjectsInfo() {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.3 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <div ref={sectionRef} className="w-full md:w-1/2 flex flex-col gap-4 md:gap-6 px-6 md:pl-20 z-20 items-center md:items-start text-center md:text-left">
            <SplitText
                text="FEATURED WORKS"
                className="text-4xl md:text-5xl font-bold tracking-tighter"
                delay={50}
                duration={1.5}
                ease="power3.out"
                splitType="chars"
                from={{ opacity: 0, y: 40 }}
                to={{ opacity: 1, y: 0 }}
                threshold={0.3}
                rootMargin="0px"
            />

            <p
                className="text-base md:text-xl text-muted-foreground max-w-md opacity-0"
                style={isVisible ? { animation: 'ani 1s ease-out 0.6s forwards' } : {}}
            >
                A curated selection of my latest mixed-media projects, exploring the boundary between physical and digital spaces through dynamic movements and vibrant colors.
            </p>

            <div
                className="flex flex-col sm:flex-row gap-3 md:gap-4 opacity-0 w-full sm:w-auto mt-2 md:mt-0"
                style={isVisible ? { animation: 'ani 1s ease-out 1.2s forwards' } : {}}
            >
                <Button className="rounded-full hover:scale-105 transition-all duration-300 ease-in-out px-6 md:px-8 py-5 md:py-6 text-base md:text-lg w-full sm:w-auto">
                    Explore Projects
                </Button>
                <Button variant="outline" className="rounded-full hover:scale-105 transition-all duration-300 ease-in-out px-6 md:px-8 py-5 md:py-6 text-base md:text-lg w-full sm:w-auto">
                    About Process
                </Button>
            </div>
        </div>
    );
}
