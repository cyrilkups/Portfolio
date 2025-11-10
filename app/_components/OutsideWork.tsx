'use client';

import SectionTitle from '@/components/SectionTitle';
import InterestCard from '@/components/InterestCard';
import { Heart, BookOpen, Music, Cpu, Coffee, Plane } from 'lucide-react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import React from 'react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const interests = [
    {
        title: 'Volleyball',
        imageSrc: '/projects/gif/volleyball_6450964.gif',
        icon: Heart,
        isGif: true,
    },
    {
        title: 'Swimming',
        imageSrc: '/projects/gif/swimming_17091781.gif',
        icon: BookOpen,
        isGif: true,
    },
    {
        title: 'Beatboxing',
        imageSrc: '/projects/gif/singer_9538514.gif',
        icon: Music,
        isGif: true,
    },
    {
        title: 'Robotics',
        imageSrc: '/projects/gif/robot_9066225.gif',
        icon: Cpu,
        isGif: true,
    },
    {
        title: 'Sketching',
        imageSrc: '/projects/gif/drawing_13936733.gif',
        icon: Coffee,
        isGif: true,
    },
    {
        title: 'Traveling',
        imageSrc: '/projects/gif/travel_8112689.gif',
        icon: Plane,
        isGif: true,
    },
];

export default function OutsideWork() {
    const containerRef = React.useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top bottom',
                    end: 'top 80%',
                    toggleActions: 'restart none none reverse',
                    scrub: 1,
                },
            });

            tl.from(containerRef.current, {
                y: 150,
                opacity: 0,
            });
        },
        { scope: containerRef },
    );

    useGSAP(
        () => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top 80%',
                    end: 'top 40%',
                    scrub: 1,
                },
            });

            tl.from('.interest-card', {
                y: 100,
                opacity: 0,
                stagger: 0.1,
            });
        },
        { scope: containerRef },
    );

    return (
        <section
            className="pt-20 pb-section"
            id="outside-work"
            ref={containerRef}
        >
            <div className="container">
                <SectionTitle title="Cyril Outside Work" />

                <div className="mt-12">
                    <h3 className="text-2xl md:text-3xl font-anton mb-8">
                        Interests
                    </h3>

                    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8 max-w-2xl md:max-w-3xl lg:max-w-4xl mx-auto">
                        {interests.map((interest) => (
                            <div key={interest.title} className="interest-card">
                                <InterestCard
                                    title={interest.title}
                                    imageSrc={interest.imageSrc}
                                    footerIcon={interest.icon}
                                    isGif={interest.isGif}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
