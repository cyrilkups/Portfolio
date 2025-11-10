'use client';
import SectionTitle from '@/components/SectionTitle';
import { MY_EXPERIENCE } from '@/lib/data';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { useRef } from 'react';
import Link from 'next/link';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const Experiences = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top 60%',
                    end: 'bottom 50%',
                    toggleActions: 'restart none none reverse',
                    scrub: 1,
                },
            });

            tl.from('.experience-item', {
                y: 50,
                opacity: 0,
                stagger: 0.3,
            });
        },
        { scope: containerRef },
    );

    useGSAP(
        () => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'bottom 50%',
                    end: 'bottom 20%',
                    scrub: 1,
                },
            });

            tl.to(containerRef.current, {
                y: -150,
                opacity: 0,
            });
        },
        { scope: containerRef },
    );

    return (
        <section className="py-section" id="my-experience">
            <div className="container" ref={containerRef}>
                <SectionTitle title="My Experience" />

                <div className="grid gap-14">
                    {MY_EXPERIENCE.map((item) => {
                        if (item.url) {
                            return (
                                <Link
                                    key={item.title}
                                    href={item.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group experience-item cursor-pointer"
                                >
                                    <p className="text-xl text-muted-foreground">
                                        {item.company}
                                    </p>
                                    <div className="flex gap-4 items-start">
                                        <p className="text-5xl font-anton leading-none mt-3.5 mb-2.5 transition-all duration-700 bg-gradient-to-r from-primary to-foreground from-[50%] to-[50%] bg-[length:200%] bg-right bg-clip-text text-transparent group-hover:bg-left">
                                            {item.title}
                                        </p>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="36"
                                            height="36"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="text-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex-shrink-0 mt-2"
                                        >
                                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                                            <path d="M10 14 21 3"></path>
                                            <path d="M15 3h6v6"></path>
                                        </svg>
                                    </div>
                                    <p className="text-lg text-muted-foreground">
                                        {item.duration}
                                    </p>
                                </Link>
                            );
                        }

                        return (
                            <div key={item.title} className="experience-item">
                                <p className="text-xl text-muted-foreground">
                                    {item.company}
                                </p>
                                <p className="text-5xl font-anton leading-none mt-3.5 mb-2.5">
                                    {item.title}
                                </p>
                                <p className="text-lg text-muted-foreground">
                                    {item.duration}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Experiences;
