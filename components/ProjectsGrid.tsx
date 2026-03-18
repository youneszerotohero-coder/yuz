'use client';

import { useEffect, useRef, useState } from 'react';
import SplitText from '@/components/SplitText';
import ProjectCard from '@/components/ProjectCard';

const projects = [
    { title: 'Kinetic Visions', url: '/work1.jpg' },
    { title: 'Crimson Flow', url: '/work2.jpg' },
    { title: 'Earth Tones', url: '/work3.jpg' },
    { title: 'Verdant Pulse', url: '/work4.jpg' },
    { title: 'Amber Glow', url: '/work5.jpeg' },
    { title: 'Golden Hour', url: '/work6.jpg' },
];

export default function ProjectsGrid() {
    const [headerVisible, setHeaderVisible] = useState(false);
    const headerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setHeaderVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.2 }
        );

        if (headerRef.current) {
            observer.observe(headerRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <div className="w-full max-w-6xl mx-auto px-6 md:px-12 py-20 md:py-32">
            {/* Section Header */}
            <div ref={headerRef} className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 md:mb-16 gap-4">
                <div>
                    <SplitText
                        text="SELECTED PROJECTS"
                        className="text-4xl md:text-6xl font-semibold tracking-wide"
                        delay={40}
                        duration={1.5}
                        ease="power3.out"
                        splitType="chars"
                        from={{ opacity: 0, y: 40 }}
                        to={{ opacity: 1, y: 0 }}
                        threshold={0.3}
                        rootMargin="0px"
                    />
                    <p
                        className={`text-muted-foreground text-base md:text-lg mt-4 max-w-md leading-relaxed scroll-reveal ${headerVisible ? 'visible' : ''}`}
                        style={{ animationDelay: '300ms' }}
                    >
                        Explore a curated collection of mixed-media pieces blending motion, color, and creative storytelling.
                    </p>
                </div>
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                {projects.map((project, index) => (
                    <ProjectCard
                        key={project.title}
                        title={project.title}
                        url={project.url}
                        index={index}
                    />
                ))}
            </div>
        </div>
    );
}
