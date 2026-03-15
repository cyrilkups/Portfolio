'use client';
import SectionTitle from '@/components/SectionTitle';
import { FEATURED_PROJECTS, HIDDEN_PROJECTS } from '@/lib/portfolio-content';
import { cn } from '@/lib/utils';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import Image from 'next/image';
import React, { useEffect, useRef, useState, MouseEvent } from 'react';
import Project from './Project';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const featuredProjects = FEATURED_PROJECTS;
const hiddenProjects = HIDDEN_PROJECTS;
const allDisplayed = [...featuredProjects, ...hiddenProjects];

const ProjectList = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const imageContainer = useRef<HTMLDivElement>(null);
    const hiddenRef = useRef<HTMLDivElement>(null);
    const [selectedProject, setSelectedProject] = useState<string | null>(
        featuredProjects[0]?.slug ?? null,
    );
    const [showMore, setShowMore] = useState(false);

    useEffect(() => {
        if (hiddenRef.current) {
            gsap.set(hiddenRef.current, { height: 0, opacity: 0 });
        }
    }, []);

    const toggleShowMore = () => {
        if (!hiddenRef.current) return;
        if (!showMore) {
            gsap.to(hiddenRef.current, {
                height: 'auto',
                opacity: 1,
                duration: 0.65,
                ease: 'power2.out',
            });
        } else {
            gsap.to(hiddenRef.current, {
                height: 0,
                opacity: 0,
                duration: 0.5,
                ease: 'power2.in',
            });
        }
        setShowMore((s) => !s);
    };

    useGSAP(
        (_, contextSafe) => {
            if (window.innerWidth < 768) {
                setSelectedProject(null);
                return;
            }

            const handleMouseMove = contextSafe?.((e: MouseEvent) => {
                if (!containerRef.current) return;
                if (!imageContainer.current) return;

                if (window.innerWidth < 768) {
                    setSelectedProject(null);
                    return;
                }

                const containerRect =
                    containerRef.current?.getBoundingClientRect();
                const imageRect =
                    imageContainer.current.getBoundingClientRect();
                const offsetTop = e.clientY - containerRect.y;

                if (
                    containerRect.y > e.clientY ||
                    containerRect.bottom < e.clientY ||
                    containerRect.x > e.clientX ||
                    containerRect.right < e.clientX
                ) {
                    return gsap.to(imageContainer.current, {
                        duration: 0.3,
                        opacity: 0,
                    });
                }

                gsap.to(imageContainer.current, {
                    y: offsetTop - imageRect.height / 2,
                    duration: 1,
                    opacity: 1,
                });
            }) as any;

            window.addEventListener('mousemove', handleMouseMove);

            return () => {
                window.removeEventListener('mousemove', handleMouseMove);
            };
        },
        { scope: containerRef, dependencies: [containerRef.current] },
    );

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

    const handleMouseEnter = (slug: string) => {
        if (window.innerWidth < 768) {
            setSelectedProject(null);
            return;
        }

        setSelectedProject(slug);
    };

    return (
        <section className="pb-section" id="selected-projects">
            <div className="container">
                <SectionTitle title="SELECTED PROJECTS" />

                <div className="group/projects relative" ref={containerRef}>
                    {selectedProject !== null && (
                        <div
                            className="max-md:hidden absolute right-0 top-0 z-[1] pointer-events-none w-[280px] md:w-[350px] lg:w-[420px] xl:w-[500px] aspect-[1699/984] overflow-hidden opacity-0"
                            ref={imageContainer}
                        >
                            {allDisplayed.map((project) => (
                                <Image
                                    src={project.thumbnail}
                                    alt="Project"
                                    width="400"
                                    height="500"
                                    className={cn(
                                        'absolute inset-0 transition-all duration-500 w-full h-full object-cover',
                                        {
                                            'opacity-0':
                                                project.slug !==
                                                selectedProject,
                                        },
                                    )}
                                    key={project.slug}
                                />
                            ))}
                        </div>
                    )}

                    <div className="flex flex-col max-md:gap-10">
                        {/* Featured projects — always visible */}
                        {featuredProjects.map((project, i) => (
                            <Project
                                key={project.slug}
                                index={allDisplayed.indexOf(project)}
                                project={project}
                                selectedProject={selectedProject}
                                onMouseEnter={handleMouseEnter}
                                badge={
                                    project.slug === 'braille-technology'
                                        ? 'Accessibility Feature'
                                        : undefined
                                }
                                isFirst={i === 0}
                                isLast={false}
                            />
                        ))}

                        {/* Hidden projects — animated expand/collapse */}
                        <div
                            ref={hiddenRef}
                            className="overflow-hidden flex flex-col max-md:gap-10"
                        >
                            {hiddenProjects.map((project, i) => (
                                <Project
                                    key={project.slug}
                                    index={allDisplayed.indexOf(project)}
                                    project={project}
                                    selectedProject={selectedProject}
                                    onMouseEnter={handleMouseEnter}
                                    isFirst={false}
                                    isLast={i === hiddenProjects.length - 1}
                                />
                            ))}
                        </div>

                        {/* View More / View Less toggle */}
                        <div
                            className={cn(
                                'pt-8 flex items-center gap-5',
                                !showMore && 'border-t border-border',
                            )}
                        >
                            <button
                                onClick={toggleShowMore}
                                className="group flex items-center gap-3 text-sm font-medium tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors duration-300"
                            >
                                <span
                                    className={cn(
                                        'inline-flex items-center justify-center size-8 rounded-full border border-border text-foreground transition-transform duration-500',
                                        { 'rotate-45': showMore },
                                    )}
                                >
                                    <svg
                                        width="12"
                                        height="12"
                                        viewBox="0 0 12 12"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <line
                                            x1="6"
                                            y1="0"
                                            x2="6"
                                            y2="12"
                                            stroke="currentColor"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                        />
                                        <line
                                            x1="0"
                                            y1="6"
                                            x2="12"
                                            y2="6"
                                            stroke="currentColor"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                        />
                                    </svg>
                                </span>
                                {showMore ? 'View Less' : 'View More'}
                            </button>
                            <span className="text-xs text-muted-foreground/50 tracking-wide">
                                {hiddenProjects.length} more project
                                {hiddenProjects.length !== 1 ? 's' : ''}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProjectList;
