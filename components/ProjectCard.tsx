'use client';

import { useEffect, useRef, useState } from 'react';

interface ProjectCardProps {
    title: string;
    url: string;
    index: number;
}

const ProjectCard = ({ title, url, index }: ProjectCardProps) => {
    const [isVisible, setIsVisible] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.15 }
        );

        if (cardRef.current) {
            observer.observe(cardRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <div
            ref={cardRef}
            className={`scroll-reveal ${isVisible ? 'visible' : ''} group relative aspect-[4/5] rounded-2xl overflow-hidden cursor-pointer`}
            style={{ animationDelay: `${index * 120}ms` }}
        >
            {/* Image */}
            <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-110"
                style={{ backgroundImage: `url(${url})` }}
            />

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent
        opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Title overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-4
        opacity-0 group-hover:opacity-100 group-hover:translate-y-0
        transition-all duration-500 ease-out">
                <p className="text-white text-sm font-medium tracking-wide">{title}</p>
            </div>

            {/* Subtle border glow */}
            <div className="absolute inset-0 rounded-2xl border border-white/10
        group-hover:border-white/25 transition-colors duration-500" />
        </div>
    );
};

export default ProjectCard;
