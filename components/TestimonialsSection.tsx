'use client'
import { useEffect, useRef, useState } from 'react';
import CountUp from '@/components/CountUp';
import TestPics from '@/components/testPics';

const stats = [
    { to: 50, suffix: '+', label: 'Creators Served' },
    { to: 200, suffix: '+', label: 'Projects Delivered' },
    { to: 98, suffix: '%', label: 'Client Satisfaction' },
    { to: 3, suffix: '+', label: 'Years Experience' },
];

export default function TestimonialsSection() {
    const [visibleStats, setVisibleStats] = useState<Set<number>>(new Set());
    const [visibleContent, setVisibleContent] = useState<Set<number>>(new Set());
    
    const statRefs = useRef<(HTMLDivElement | null)[]>([]);
    const contentRefs = useRef<(HTMLElement | null)[]>([]);

    useEffect(() => {
        const observers: IntersectionObserver[] = [];

        statRefs.current.forEach((ref, index) => {
            if (!ref) return;
            const observer = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) {
                        setVisibleStats((prev) => new Set(prev).add(index));
                        observer.disconnect();
                    }
                },
                { threshold: 0.2 }
            );
            observer.observe(ref);
            observers.push(observer);
        });

        contentRefs.current.forEach((ref, index) => {
            if (!ref) return;
            const observer = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) {
                        setVisibleContent((prev) => new Set(prev).add(index));
                        observer.disconnect();
                    }
                },
                { threshold: 0.15 }
            );
            observer.observe(ref);
            observers.push(observer);
        });

        return () => observers.forEach((o) => o.disconnect());
    }, []);

    return (
        <div className="w-full pb-20 md:pb-32 flex flex-col items-center justify-center relative overflow-hidden bg-background">
            {/* TestPics Section */}
            <div 
                ref={(el) => { contentRefs.current[0] = el as HTMLDivElement; }}
                className={`scroll-reveal ${visibleContent.has(0) ? 'visible' : ''} w-full overflow-hidden flex justify-center [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] mb-5 md:mb-0
                translate-y-0 md:translate-y-24`}
            >
                <TestPics />
            </div>

            {/* Text Section */}
            <div className="flex flex-col items-center px-6 text-center z-10 relative">
                <h2 
                    ref={(el) => { contentRefs.current[1] = el as HTMLHeadingElement; }}
                    className={`scroll-reveal ${visibleContent.has(1) ? 'visible' : ''} text-4xl md:text-6xl lg:text-[4.5rem] font-bold tracking-tighter mb-6 leading-[1.1] mt-8 md:mt-12`}
                    style={{ animationDelay: '100ms' }}
                >
                    Trusted by leaders <br className="hidden sm:block" />
                    <span className="text-muted-foreground">from various industries</span>
                </h2>
                
                <p 
                    ref={(el) => { contentRefs.current[2] = el as HTMLParagraphElement; }}
                    className={`scroll-reveal ${visibleContent.has(2) ? 'visible' : ''} text-muted-foreground text-lg md:text-xl max-w-xl mx-auto mb-10 leading-relaxed font-medium`}
                    style={{ animationDelay: '200ms' }}
                >
                    Learn why professionals trust our solutions to complete their customer journeys.
                </p>

                {/* <button 
                    ref={(el) => { contentRefs.current[3] = el as HTMLButtonElement; }}
                    className={`scroll-reveal ${visibleContent.has(3) ? 'visible' : ''} group bg-foreground text-background px-8 py-3.5 rounded-full font-medium flex items-center gap-2 hover:bg-foreground/90 transition-colors`}
                    style={{ animationDelay: '300ms' }}
                >
                    Read Success Stories 
                    <span className="text-xl leading-none transition-transform group-hover:translate-x-1">&rarr;</span>
                </button> */}
            </div>

            {/* Stats Row */}
            <div className="w-full max-w-6xl mx-auto px-6 md:px-12 mt-12 md:mt-12 relative z-10">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 pt-10">
                    {stats.map((stat, index) => (
                        <div
                            key={stat.label}
                            ref={(el) => { statRefs.current[index] = el; }}
                            className={`scale-in ${visibleStats.has(index) ? 'visible' : ''} text-center py-4`}
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            <div className="text-3xl md:text-5xl font-bold tracking-tight mb-2
                  bg-gradient-to-b from-foreground to-muted-foreground bg-clip-text text-transparent flex justify-center items-center">
                                <CountUp
                                    from={0}
                                    to={stat.to}
                                    separator=","
                                    direction="up"
                                    duration={1.5}
                                    className="count-up-text"
                                    startWhen={visibleStats.has(index)}
                                />
                                <span>{stat.suffix}</span>
                            </div>
                            <p className="text-xs md:text-sm text-muted-foreground uppercase tracking-widest font-medium">
                                {stat.label}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
