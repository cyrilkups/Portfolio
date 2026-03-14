'use client';

import SectionTitle from '@/components/SectionTitle';
import { EDUCATION } from '@/lib/portfolio-content';
import { cn } from '@/lib/utils';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import Image from 'next/image';
import { useRef, useState } from 'react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Education() {
    const containerRef = useRef<HTMLDivElement>(null);
    const detailPanelRef = useRef<HTMLDivElement>(null);
    const [isExpanded, setIsExpanded] = useState(false);

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
            tl.from(containerRef.current, { y: 150, opacity: 0 });
        },
        { scope: containerRef },
    );

    useGSAP(
        () => {
            if (!isExpanded || !detailPanelRef.current) return;

            gsap.fromTo(
                '.education-detail-item',
                { y: 24, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.6,
                    stagger: 0.1,
                    ease: 'power2.out',
                },
            );
        },
        { scope: detailPanelRef, dependencies: [isExpanded] },
    );

    const toggle = (next: boolean) => {
        if (window.innerWidth >= 768) setIsExpanded(next);
    };

    const handleClick = () => {
        if (window.innerWidth < 768) setIsExpanded((s) => !s);
    };

    return (
        <section className="pb-section" id="education" ref={containerRef}>
            <div className="container">
                <SectionTitle title="EDUCATION" />

                {/* ── Fixed-height card — both states live inside ── */}
                <div
                    className="relative overflow-hidden rounded-2xl min-h-[250px] md:min-h-[330px] cursor-pointer"
                    onMouseEnter={() => toggle(true)}
                    onMouseLeave={() => toggle(false)}
                    onClick={handleClick}
                >
                    {/* ── State 1: Cinematic banner ─────────────────── */}
                    <div
                        className={cn(
                            'absolute inset-0 transition-opacity duration-500',
                            isExpanded
                                ? 'opacity-0 pointer-events-none'
                                : 'opacity-100',
                        )}
                    >
                        {/* Campus image */}
                        <Image
                            src={EDUCATION.campus}
                            alt="Grambling State University campus"
                            fill
                            className={cn(
                                'object-cover transition-transform duration-700',
                                isExpanded ? 'scale-100' : 'scale-105',
                            )}
                            priority
                        />
                        {/* Overlays */}
                        <div className="absolute inset-0 bg-gradient-to-r from-black/92 via-black/65 to-black/25" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

                        {/* Banner text */}
                        <div className="absolute inset-0 flex flex-col justify-end px-7 md:px-12 pt-7 md:pt-12 pb-2 md:pb-3 translate-y-0 md:translate-y-0">
                            <p className="text-[10px] uppercase tracking-[0.2em] text-white mb-5 flex items-center gap-2">
                                <span className="inline-block w-5 h-px bg-white/70" />
                                {EDUCATION.location}
                            </p>
                            <div className="flex items-start gap-5">
                                <Image
                                    src={EDUCATION.logo}
                                    alt="GSU logo"
                                    width={42}
                                    height={42}
                                    className="hidden sm:block mt-1 w-10 h-10 object-contain flex-shrink-0"
                                    onError={(e) => {
                                        (
                                            e.target as HTMLImageElement
                                        ).style.display = 'none';
                                    }}
                                />
                                <div>
                                    <h3 className="text-3xl sm:text-4xl md:text-5xl font-anton text-white leading-none tracking-tight">
                                        {EDUCATION.school}
                                    </h3>
                                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-3">
                                        <span className="text-white text-sm font-medium">
                                            {EDUCATION.degree}
                                        </span>
                                        <span className="size-1 rounded-full bg-white/70" />
                                        <span className="text-white text-sm">
                                            GPA{' '}
                                            <span className="text-white">
                                                {EDUCATION.gpa}
                                            </span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ── State 2: Detail panel ─────────────────────── */}
                    <div
                        ref={detailPanelRef}
                        className={cn(
                            'absolute inset-0 bg-background-light overflow-y-auto transition-opacity duration-500',
                            isExpanded
                                ? 'opacity-100'
                                : 'opacity-0 pointer-events-none',
                        )}
                    >
                        <div className="md:hidden p-5 sm:p-6 min-h-full">
                            <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                                {/* ─ Mobile Card: About ─ */}
                                <div className="education-detail-item min-w-[84%] sm:min-w-[72%] snap-start rounded-xl border border-border bg-background p-5">
                                    <p className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground pb-3 mb-5 border-b border-border">
                                        About
                                    </p>
                                    <dl className="space-y-4">
                                        {[
                                            {
                                                label: 'Degree',
                                                value: EDUCATION.degree,
                                            },
                                            {
                                                label: 'Minor',
                                                value: EDUCATION.minor,
                                            },
                                            {
                                                label: 'GPA',
                                                value: EDUCATION.gpa,
                                                highlight: true,
                                            },
                                            {
                                                label: 'Location',
                                                value: EDUCATION.location,
                                            },
                                        ].map(({ label, value, highlight }) => (
                                            <div key={label}>
                                                <dt className="text-[10px] text-muted-foreground/50 uppercase tracking-widest mb-0.5">
                                                    {label}
                                                </dt>
                                                <dd
                                                    className={cn(
                                                        'text-sm font-medium leading-snug',
                                                        highlight &&
                                                            'text-primary',
                                                    )}
                                                >
                                                    {value}
                                                </dd>
                                            </div>
                                        ))}
                                    </dl>
                                </div>

                                {/* ─ Mobile Card: Coursework ─ */}
                                <div className="education-detail-item min-w-[84%] sm:min-w-[72%] snap-start rounded-xl border border-border bg-background p-5">
                                    <p className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground pb-3 mb-5 border-b border-border">
                                        Coursework
                                    </p>
                                    <ul className="space-y-2">
                                        {EDUCATION.coursework.map((course) => (
                                            <li
                                                key={course}
                                                className="flex items-start gap-2 text-sm text-muted-foreground"
                                            >
                                                <span className="mt-[7px] size-1 rounded-full bg-primary flex-shrink-0" />
                                                {course}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* ─ Mobile Card: Awards ─ */}
                                <div className="education-detail-item min-w-[84%] sm:min-w-[72%] snap-start rounded-xl border border-border bg-background p-5">
                                    <p className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground pb-3 mb-5 border-b border-border">
                                        Scholarships & Awards
                                    </p>
                                    <ul className="space-y-3">
                                        {EDUCATION.awards.map((award) => (
                                            <li
                                                key={award}
                                                className="flex items-start gap-2 text-sm font-medium leading-snug"
                                            >
                                                <span className="mt-[7px] size-1 rounded-full bg-primary flex-shrink-0" />
                                                {award}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* ─ Mobile Card: Activities ─ */}
                                <div className="education-detail-item min-w-[84%] sm:min-w-[72%] snap-start rounded-xl border border-border bg-background p-5">
                                    <p className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground pb-3 mb-5 border-b border-border">
                                        Clubs & Activities
                                    </p>
                                    <ul className="space-y-4">
                                        {EDUCATION.activities.map((activity) => (
                                            <li key={activity.name}>
                                                <p className="text-sm font-medium leading-snug">
                                                    {activity.name}
                                                </p>
                                                {activity.role && (
                                                    <p className="text-xs text-muted-foreground mt-0.5">
                                                        {activity.role}
                                                    </p>
                                                )}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="hidden md:grid p-7 md:p-10 grid-cols-2 md:grid-cols-4 gap-7 md:gap-10 min-h-full">
                            {/* ─ Col 1: About ─ */}
                            <div className="education-detail-item">
                                <p className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground pb-3 mb-5 border-b border-border">
                                    About
                                </p>
                                <dl className="space-y-4">
                                    {[
                                        {
                                            label: 'Degree',
                                            value: EDUCATION.degree,
                                        },
                                        {
                                            label: 'Minor',
                                            value: EDUCATION.minor,
                                        },
                                        {
                                            label: 'GPA',
                                            value: EDUCATION.gpa,
                                            highlight: true,
                                        },
                                        {
                                            label: 'Location',
                                            value: EDUCATION.location,
                                        },
                                    ].map(({ label, value, highlight }) => (
                                        <div key={label}>
                                            <dt className="text-[10px] text-muted-foreground/50 uppercase tracking-widest mb-0.5">
                                                {label}
                                            </dt>
                                            <dd
                                                className={cn(
                                                    'text-sm font-medium leading-snug',
                                                    highlight && 'text-primary',
                                                )}
                                            >
                                                {value}
                                            </dd>
                                        </div>
                                    ))}
                                </dl>
                            </div>

                            {/* ─ Col 2: Coursework ─ */}
                            <div className="education-detail-item">
                                <p className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground pb-3 mb-5 border-b border-border">
                                    Coursework
                                </p>
                                <ul className="space-y-2">
                                    {EDUCATION.coursework.map((course) => (
                                        <li
                                            key={course}
                                            className="flex items-start gap-2 text-sm text-muted-foreground"
                                        >
                                            <span className="mt-[7px] size-1 rounded-full bg-primary flex-shrink-0" />
                                            {course}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* ─ Col 3: Awards ─ */}
                            <div className="education-detail-item">
                                <p className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground pb-3 mb-5 border-b border-border">
                                    Scholarships & Awards
                                </p>
                                <ul className="space-y-3">
                                    {EDUCATION.awards.map((award) => (
                                        <li
                                            key={award}
                                            className="flex items-start gap-2 text-sm font-medium leading-snug"
                                        >
                                            <span className="mt-[7px] size-1 rounded-full bg-primary flex-shrink-0" />
                                            {award}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* ─ Col 4: Activities ─ */}
                            <div className="education-detail-item">
                                <p className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground pb-3 mb-5 border-b border-border">
                                    Clubs & Activities
                                </p>
                                <ul className="space-y-4">
                                    {EDUCATION.activities.map((activity) => (
                                        <li key={activity.name}>
                                            <p className="text-sm font-medium leading-snug">
                                                {activity.name}
                                            </p>
                                            {activity.role && (
                                                <p className="text-xs text-muted-foreground mt-0.5">
                                                    {activity.role}
                                                </p>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
