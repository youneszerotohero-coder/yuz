'use client';

import { useEffect, useRef, useState } from 'react';
import {
    Clapperboard,
    Compass,
    Laptop,
    Palette,
    Wand2,
    Volume2,
    LayoutTemplate,
    TerminalSquare
} from 'lucide-react';

const services = [
    {
        icon: <Clapperboard className="w-5 h-5 text-white" fill="currentColor" strokeWidth={1.5} />,
        name: 'Cinematography / Directing',
    },
    {
        icon: <Compass className="w-5 h-5 text-white" fill="currentColor" strokeWidth={1.5} />,
        name: 'Creative Direction & Shot Planning',
    },
    {
        icon: <Laptop className="w-5 h-5 text-white" fill="currentColor" strokeWidth={1.5} />,
        name: 'Video Editing & Motion Design',
    },
    {
        icon: <Palette className="w-5 h-5 text-white" fill="currentColor" strokeWidth={1.5} />,
        name: 'Color Grading & Lookbuilding',
    },
    {
        icon: <Wand2 className="w-5 h-5 text-white" fill="currentColor" strokeWidth={1.5} />,
        name: 'Photography & Retouching',
    },
    {
        icon: <Volume2 className="w-5 h-5 text-white" fill="currentColor" strokeWidth={1.5} />,
        name: 'Sound Design & Audio Polish',
    },
    {
        icon: <LayoutTemplate className="w-5 h-5 text-white" fill="currentColor" strokeWidth={1.5} />,
        name: 'Design & Layout for Print/Digital',
    },
];

const AdobeIcon = ({ label }: { label: string }) => (
    <div className="w-6 h-6 bg-foreground text-background flex items-center justify-center rounded-[4px] font-bold text-[10px] tracking-tighter">
        {label}
    </div>
);

const DavinciIcon = () => (
    <div className="w-6 h-6 flex items-center justify-center text-foreground">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="6" />
            <circle cx="12" cy="12" r="2" fill="currentColor" />
            <path d="M12 2v4" />
            <path d="M12 18v4" />
            <path d="M4.93 4.93l2.83 2.83" />
            <path d="M16.24 16.24l2.83 2.83" />
            <path d="M2 12h4" />
            <path d="M18 12h4" />
            <path d="M4.93 19.07l2.83-2.83" />
            <path d="M16.24 7.76l2.83-2.83" />
        </svg>
    </div>
);

const NotionIcon = () => (
    <div className="w-6 h-6 bg-foreground text-background flex items-center justify-center rounded-[4px] font-serif font-bold text-[12px]">
        N
    </div>
);

const toolbox = [
    <AdobeIcon key="pr" label="Pr" />,
    <AdobeIcon key="ae" label="Ae" />,
    <AdobeIcon key="ps" label="Ps" />,
    <DavinciIcon key="da" />,
    <AdobeIcon key="lr" label="Lr" />,
    <AdobeIcon key="id" label="Id" />,
    <NotionIcon key="no" />,
];

export default function SkillsSection() {
    const [visibleServices, setVisibleServices] = useState<Set<number>>(new Set());
    const [visibleToolbox, setVisibleToolbox] = useState<Set<number>>(new Set());
    const [isHeaderVisible, setIsHeaderVisible] = useState(false);

    const headerRef = useRef<HTMLDivElement>(null);
    const serviceRefs = useRef<(HTMLDivElement | null)[]>([]);
    const toolboxRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        if (entry.target === headerRef.current) {
                            setIsHeaderVisible(true);
                        } else {
                            const serviceIndex = serviceRefs.current.indexOf(entry.target as HTMLDivElement);
                            if (serviceIndex !== -1) {
                                setVisibleServices((prev) => new Set(prev).add(serviceIndex));
                            }

                            const toolboxIndex = toolboxRefs.current.indexOf(entry.target as HTMLDivElement);
                            if (toolboxIndex !== -1) {
                                setVisibleToolbox((prev) => new Set(prev).add(toolboxIndex));
                            }
                        }
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.15 }
        );

        if (headerRef.current) observer.observe(headerRef.current);

        serviceRefs.current.forEach((ref) => {
            if (ref) observer.observe(ref);
        });

        toolboxRefs.current.forEach((ref) => {
            if (ref) observer.observe(ref);
        });

        return () => observer.disconnect();
    }, []);

    return (
        <div className="w-full max-w-7xl mx-auto px-6 md:px-12 py-20 md:py-32 flex flex-col md:flex-row gap-16 md:gap-8 items-center md:items-start justify-between min-h-screen">
            {/* Left Column */}
            <div className="w-full md:w-1/2 flex flex-col justify-center h-full pt-10 md:pt-20">
                <div ref={headerRef} className={`scroll-reveal-left ${isHeaderVisible ? 'visible' : ''}`}>
                    <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter mb-4 leading-[1.1]">
                        <span className="text-muted-foreground/60">Services that</span>
                        <br />
                        <span className="text-foreground">shape your story.</span>
                    </h2>
                </div>

                <div className="mt-16 md:mt-24">
                    <p
                        className={`scroll-reveal-left ${isHeaderVisible ? 'visible' : ''} text-sm md:text-base font-medium mb-4 text-foreground/80`}
                        style={{ animationDelay: '200ms' }}
                    >
                        My creative toolbox
                    </p>
                    <div className="flex flex-wrap gap-3">
                        {toolbox.map((icon, i) => (
                            <div
                                key={i}
                                ref={(el) => { toolboxRefs.current[i] = el; }}
                                className={`scale-in ${visibleToolbox.has(i) ? 'visible' : ''} bg-background border border-border/40 shadow-sm shadow-black/5 dark:shadow-white/5 rounded-xl w-12 h-12 md:w-14 md:h-14 flex items-center justify-center transition-transform hover:scale-105`}
                                style={{ animationDelay: `${200 + i * 50}ms` }}
                            >
                                {icon}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Right Column */}
            <div className="w-full md:w-1/2 flex flex-col justify-center gap-6 md:gap-8 lg:pl-16">
                {services.map((service, index) => (
                    <div
                        key={service.name}
                        ref={(el) => { serviceRefs.current[index] = el; }}
                        className={`scroll-reveal ${visibleServices.has(index) ? 'visible' : ''} flex items-center gap-5 group cursor-default`}
                        style={{ animationDelay: `${index * 120}ms` }}
                    >
                        <div className="w-12 h-12 md:w-14 md:h-14 shrink-0 rounded-full bg-foreground flex items-center justify-center shadow-lg shadow-black/10 transition-transform duration-300 group-hover:scale-110">
                            <div className="text-background scale-110">
                                {service.icon}
                            </div>
                        </div>
                        <h3 className="text-lg md:text-xl font-medium tracking-tight text-foreground transition-colors duration-300 group-hover:text-foreground/70">
                            {service.name}
                        </h3>
                    </div>
                ))}
            </div>
        </div>
    );
}
