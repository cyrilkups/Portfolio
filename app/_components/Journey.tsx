'use client';

import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { useGSAP } from '@gsap/react';
import React, { useRef } from 'react';
import { ArrowUpRight, Sparkles } from 'lucide-react';

import SectionTitle from '@/components/SectionTitle';
import { JOURNEY_ITEMS, JourneyTag } from '@/lib/portfolio-content';
import { cn } from '@/lib/utils';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const TAG_STYLES: Record<
    JourneyTag,
    {
        badge: string;
        glow: string;
    }
> = {
    fellowship: {
        badge: 'border-primary/40 bg-primary/10 text-primary',
        glow: 'from-primary/16 via-primary/0',
    },
    scholarship: {
        badge: 'border-sky-400/30 bg-sky-400/10 text-sky-300',
        glow: 'from-sky-400/14 via-sky-400/0',
    },
    pitch: {
        badge: 'border-fuchsia-400/30 bg-fuchsia-400/10 text-fuchsia-300',
        glow: 'from-fuchsia-400/14 via-fuchsia-400/0',
    },
    leadership: {
        badge: 'border-amber-400/30 bg-amber-400/10 text-amber-300',
        glow: 'from-amber-400/14 via-amber-400/0',
    },
    community: {
        badge: 'border-emerald-400/30 bg-emerald-400/10 text-emerald-300',
        glow: 'from-emerald-400/14 via-emerald-400/0',
    },
};

const TAG_LABELS: Record<JourneyTag, string> = {
    fellowship: 'Fellowship',
    scholarship: 'Scholarship',
    pitch: 'Pitch',
    leadership: 'Leadership',
    community: 'Community',
};

export default function Journey() {
    const sectionRef = useRef<HTMLElement>(null);
    const viewportRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            const section = sectionRef.current;
            if (!section) {
                return;
            }

            const mm = gsap.matchMedia();

            mm.add('(min-width: 1024px)', () => {
                const viewport = viewportRef.current;
                const track = trackRef.current;

                if (!viewport || !track) {
                    return;
                }

                const getDistance = () =>
                    Math.max(track.scrollWidth - viewport.clientWidth, 0);

                if (getDistance() <= 0) {
                    return;
                }

                const tween = gsap.to(track, {
                    x: () => -getDistance(),
                    ease: 'none',
                    scrollTrigger: {
                        id: 'journey-horizontal',
                        trigger: section,
                        start: 'top top',
                        end: () => `+=${getDistance()}`,
                        scrub: true,
                        pin: true,
                        anticipatePin: 1,
                        invalidateOnRefresh: true,
                    },
                });

                ScrollTrigger.refresh();

                return () => {
                    tween.scrollTrigger?.kill();
                    tween.kill();
                };
            });

            return () => {
                mm.revert();
                ScrollTrigger.getById('journey-horizontal')?.kill();
            };
        },
        { scope: sectionRef },
    );

    return (
        <section
            ref={sectionRef}
            id="journey"
            className="relative overflow-hidden py-16 lg:h-screen lg:py-0"
        >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_12%,rgba(59,130,246,0.18),transparent_0,transparent_38%),radial-gradient(circle_at_85%_85%,rgba(125,211,252,0.08),transparent_0,transparent_32%)]" />

            <div className="container relative flex h-full flex-col">
                <div className="journey-intro shrink-0 pb-8 lg:pb-10 lg:pt-24">
                    <SectionTitle
                        title="My Journey"
                        icon={<Sparkles size={22} className="text-primary" />}
                    />

                    <div className="max-w-5xl">
                        <h3 className="text-4xl font-anton uppercase leading-[0.92] text-foreground md:text-6xl xl:text-7xl">
                            The milestones behind
                            <span className="ml-3 font-roboto-flex text-primary italic normal-case">
                                how I build.
                            </span>
                        </h3>
                        <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground md:text-base">
                            I wanted the structure of the reference section, but
                            grounded in this portfolio. So this strip highlights
                            the scholarships, advocacy, pitching, and community
                            work that shaped how I approach products.
                        </p>
                    </div>
                </div>

                <div
                    ref={viewportRef}
                    data-lenis-prevent
                    className="relative -mx-4 overflow-x-auto overflow-y-visible overscroll-x-contain px-4 pb-4 md:-mx-6 md:px-6 lg:mx-0 lg:flex-1 lg:overflow-hidden lg:px-0 lg:pb-0"
                >
                    <div
                        ref={trackRef}
                        className="relative flex h-full min-w-max border-y border-border/70 bg-background/40 backdrop-blur-sm"
                    >
                        {JOURNEY_ITEMS.map((item, index) => {
                            const tagStyle = TAG_STYLES[item.tag];

                            return (
                                <article
                                    key={item.name}
                                    className={cn(
                                        'group relative flex w-[88vw] max-w-[430px] shrink-0 flex-col gap-8 border-r border-border/70 px-5 py-6 sm:w-[430px] sm:px-7 sm:py-8 lg:w-[520px] lg:max-w-none lg:gap-10 lg:px-10 lg:py-10',
                                        index % 2 === 1 &&
                                            'lg:flex-col-reverse',
                                    )}
                                >
                                    <div
                                        className={cn(
                                            'pointer-events-none absolute inset-0 bg-gradient-to-br to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100',
                                            tagStyle.glow,
                                        )}
                                    />

                                    <div className="relative z-[1] flex flex-col gap-4">
                                        <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-primary/85">
                                            {String(index + 1).padStart(2, '0')}
                                        </p>

                                        <div className="flex items-start justify-between gap-4">
                                            <h4 className="shrink-0 text-4xl font-anton uppercase leading-none text-foreground md:text-5xl">
                                                {item.stat}
                                            </h4>

                                            <div className="text-right">
                                                <p className="text-base font-medium text-foreground md:text-lg">
                                                    {item.name}
                                                </p>
                                                <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                                                    {item.organization}
                                                </p>
                                            </div>
                                        </div>

                                        <span
                                            className={cn(
                                                'inline-flex w-fit rounded-full border px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em]',
                                                tagStyle.badge,
                                            )}
                                        >
                                            {TAG_LABELS[item.tag]}
                                        </span>

                                        <div>
                                            <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-muted-foreground/70">
                                                Description
                                            </p>
                                            <p className="mt-3 max-w-[34ch] text-sm leading-7 text-muted-foreground md:text-[15px]">
                                                {item.description}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="relative z-[1]">
                                        <div className="relative overflow-hidden rounded-[26px] border border-border/80 bg-background-light/60">
                                            <Image
                                                src={item.imageUrl}
                                                alt={item.name}
                                                width={900}
                                                height={700}
                                                className="h-[260px] w-full object-cover grayscale transition duration-500 group-hover:scale-[1.02] group-hover:grayscale-0 sm:h-[310px] lg:h-[clamp(250px,34vh,360px)]"
                                            />

                                            {item.link ? (
                                                <a
                                                    href={item.link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="absolute bottom-4 right-4 inline-flex h-11 w-11 items-center justify-center rounded-full border border-border/80 bg-background/90 text-foreground opacity-100 transition duration-300 lg:opacity-0 lg:group-hover:opacity-100"
                                                    aria-label={`Open ${item.name}`}
                                                >
                                                    <ArrowUpRight className="h-4 w-4" />
                                                </a>
                                            ) : null}
                                        </div>
                                    </div>
                                </article>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
