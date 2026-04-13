'use client';

import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { useGSAP } from '@gsap/react';
import { useLenis } from 'lenis/react';
import {
    type MouseEventHandler,
    type TouchEventHandler,
    useEffect,
    useRef,
} from 'react';
import { ArrowUpRight } from 'lucide-react';

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
    hackathon: {
        badge: 'border-cyan-400/30 bg-cyan-400/10 text-cyan-300',
        glow: 'from-cyan-400/16 via-cyan-400/0',
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
    hackathon: 'Hackathon',
    pitch: 'Pitch',
    leadership: 'Leadership',
    community: 'Community',
};

function SideQuestCard({
    item,
    index,
    variant,
    reverse = false,
    onLinkClick,
}: {
    item: (typeof JOURNEY_ITEMS)[number];
    index: number;
    variant: 'mobile' | 'desktop';
    reverse?: boolean;
    onLinkClick?: MouseEventHandler<HTMLAnchorElement>;
}) {
    const tagStyle = TAG_STYLES[item.tag];
    const isDesktop = variant === 'desktop';

    return (
        <article
            className={cn(
                'group relative overflow-hidden bg-background/70 lg:bg-background/40 lg:backdrop-blur-sm',
                isDesktop
                    ? 'flex w-[90vw] max-w-[680px] shrink-0 flex-col justify-start gap-8 border-r border-border/70 px-6 py-8 transition-colors duration-300 lg:hover:bg-background-light/30 sm:w-[580px] sm:px-10 sm:py-10 lg:w-[680px] lg:max-w-none lg:gap-6 lg:px-12 lg:py-8'
                    : 'rounded-[26px] border border-border/70 p-5 sm:p-6',
                isDesktop && reverse && 'lg:flex-col-reverse',
            )}
        >
            <div
                className={cn(
                    'pointer-events-none absolute inset-0 bg-gradient-to-br to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100',
                    tagStyle.glow,
                )}
            />

            <div
                className={cn(
                    'relative z-[1] flex flex-col',
                    isDesktop ? 'gap-4' : 'gap-4',
                )}
            >
                <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-primary/85">
                    {String(index + 1).padStart(2, '0')}
                </p>

                {isDesktop ? (
                    <div className="flex items-start justify-between gap-4">
                        <h4 className="shrink-0 text-5xl font-anton uppercase leading-none tracking-[0.02em] text-foreground md:text-6xl">
                            {item.stat}
                        </h4>

                        <div className="max-w-[15rem] text-right">
                            <p className="font-mono text-[14px] leading-snug text-foreground md:text-[15px]">
                                {item.name}
                            </p>
                            <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.18em] text-primary/85">
                                {item.organization}
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-3">
                        <h4 className="text-4xl font-anton uppercase leading-none tracking-[0.02em] text-foreground sm:text-5xl">
                            {item.stat}
                        </h4>
                        <div>
                            <p className="font-mono text-sm leading-snug text-foreground">
                                {item.name}
                            </p>
                            <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.18em] text-primary/85">
                                {item.organization}
                            </p>
                        </div>
                    </div>
                )}

                <span
                    className={cn(
                        'inline-flex w-fit rounded-sm border px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.16em]',
                        tagStyle.badge,
                    )}
                >
                    {item.tagLabel ?? TAG_LABELS[item.tag]}
                </span>

                <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-muted-foreground/70">
                        Description
                    </p>
                    <p className="mt-3 max-w-[90%] font-mono text-xs font-light leading-[1.7] text-muted-foreground">
                        {item.description}
                    </p>
                </div>
            </div>

            <div className="relative z-[1] mt-5 flex w-full justify-center">
                <div
                    className={cn(
                        'relative w-full overflow-hidden border border-border/80 bg-black/30',
                        isDesktop
                            ? 'min-h-[290px] rounded-[26px] sm:min-h-[340px] lg:min-h-[min(42vh,360px)]'
                            : 'min-h-[220px] rounded-[22px] sm:min-h-[260px]',
                    )}
                >
                    <Image
                        src={item.imageUrl}
                        alt={item.name}
                        fill
                        draggable={false}
                        quality={isDesktop ? 72 : 68}
                        sizes={
                            isDesktop
                                ? '(max-width: 640px) 90vw, (max-width: 1024px) 580px, 680px'
                                : '(max-width: 640px) 86vw, (max-width: 1024px) 72vw, 540px'
                        }
                        className="select-none object-cover transition duration-500 lg:grayscale lg:group-hover:scale-[1.02] lg:group-hover:grayscale-0"
                    />

                    {item.link ? (
                        <a
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={onLinkClick}
                            className={cn(
                                'absolute bottom-4 right-4 inline-flex touch-manipulation items-center justify-center rounded-full border border-border/80 bg-background/90 text-foreground transition duration-300',
                                isDesktop
                                    ? 'h-11 w-11 opacity-100 lg:opacity-0 lg:group-hover:opacity-100'
                                    : 'h-10 w-10 opacity-100',
                            )}
                            aria-label={`Open ${item.name}`}
                        >
                            <ArrowUpRight className="h-4 w-4" />
                        </a>
                    ) : null}
                </div>
            </div>
        </article>
    );
}

export default function SideQuest() {
    const sectionRef = useRef<HTMLElement>(null);
    const stickyRef = useRef<HTMLDivElement>(null);
    const viewportRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const touchStartRef = useRef<{ x: number; y: number } | null>(null);
    const isSwipeGestureRef = useRef(false);
    const swipeResetTimeoutRef = useRef<number | null>(null);

    useLenis(() => {
        ScrollTrigger.update();
    }, []);

    useEffect(() => {
        return () => {
            if (swipeResetTimeoutRef.current !== null) {
                window.clearTimeout(swipeResetTimeoutRef.current);
            }
        };
    }, []);

    const clearSwipeResetTimeout = () => {
        if (swipeResetTimeoutRef.current !== null) {
            window.clearTimeout(swipeResetTimeoutRef.current);
            swipeResetTimeoutRef.current = null;
        }
    };

    const handleMobileTouchStart: TouchEventHandler<HTMLDivElement> = (
        event,
    ) => {
        const touch = event.touches[0];
        if (!touch) {
            return;
        }

        clearSwipeResetTimeout();
        touchStartRef.current = { x: touch.clientX, y: touch.clientY };
        isSwipeGestureRef.current = false;
    };

    const handleMobileTouchMove: TouchEventHandler<HTMLDivElement> = (event) => {
        const touchStart = touchStartRef.current;
        const touch = event.touches[0];

        if (!touchStart || !touch) {
            return;
        }

        if (
            Math.abs(touch.clientX - touchStart.x) > 8 ||
            Math.abs(touch.clientY - touchStart.y) > 8
        ) {
            isSwipeGestureRef.current = true;
        }
    };

    const handleMobileTouchEnd: TouchEventHandler<HTMLDivElement> = () => {
        touchStartRef.current = null;
        clearSwipeResetTimeout();
        swipeResetTimeoutRef.current = window.setTimeout(() => {
            isSwipeGestureRef.current = false;
        }, 160);
    };

    const handleJourneyLinkClick: MouseEventHandler<HTMLAnchorElement> = (
        event,
    ) => {
        if (!isSwipeGestureRef.current) {
            return;
        }

        event.preventDefault();
        event.stopPropagation();
    };

    useGSAP(
        () => {
            const section = sectionRef.current;
            if (!section) {
                return;
            }

            const mm = gsap.matchMedia();

            mm.add('(min-width: 1024px)', () => {
                const sticky = stickyRef.current;
                const viewport = viewportRef.current;
                const track = trackRef.current;

                if (!section || !sticky || !viewport || !track) {
                    return;
                }

                const getDistance = () => {
                    const lastCard = track.lastElementChild as
                        | HTMLElement
                        | null;

                    if (!lastCard) {
                        return Math.max(
                            track.scrollWidth - viewport.clientWidth,
                            0,
                        );
                    }

                    return Math.max(
                        lastCard.offsetLeft +
                            lastCard.offsetWidth -
                            viewport.clientWidth,
                        0,
                    );
                };

                const syncSectionHeight = () => {
                    const distance = getDistance();

                    if (distance <= 0) {
                        section.style.removeProperty('height');
                        return;
                    }

                    section.style.height = `${window.innerHeight + distance}px`;
                };

                const distance = getDistance();

                if (distance <= 0) {
                    section.style.removeProperty('height');
                    return;
                }

                syncSectionHeight();
                gsap.set(track, { x: 0 });

                ScrollTrigger.addEventListener('refreshInit', syncSectionHeight);

                const tween = gsap.to(track, {
                    x: () => -getDistance(),
                    ease: 'none',
                    scrollTrigger: {
                        id: 'journey-horizontal',
                        trigger: section,
                        start: 'top top',
                        end: () => `+=${getDistance()}`,
                        scrub: true,
                        fastScrollEnd: true,
                        invalidateOnRefresh: true,
                    },
                });

                return () => {
                    ScrollTrigger.removeEventListener(
                        'refreshInit',
                        syncSectionHeight,
                    );
                    section.style.removeProperty('height');
                    gsap.set(track, { x: 0 });
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
            className="relative py-14 lg:py-0"
        >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_12%,rgba(59,130,246,0.18),transparent_0,transparent_38%),radial-gradient(circle_at_85%_85%,rgba(125,211,252,0.08),transparent_0,transparent_32%)]" />

            <div
                ref={stickyRef}
                className="lg:sticky lg:top-0 lg:h-screen lg:overflow-hidden"
            >
                <div className="container relative flex h-full flex-col">
                    <div className="journey-intro shrink-0 pt-0 lg:pt-8">
                        <SectionTitle title="Side Quest" />
                    </div>

                    <div className="lg:hidden">
                        <div
                            data-lenis-prevent
                            onTouchStart={handleMobileTouchStart}
                            onTouchMove={handleMobileTouchMove}
                            onTouchEnd={handleMobileTouchEnd}
                            onTouchCancel={handleMobileTouchEnd}
                            className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 -mx-4 px-4 overscroll-contain [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch] [scrollbar-width:none] [touch-action:pan-x_pan-y] [&::-webkit-scrollbar]:hidden sm:-mx-6 sm:px-6"
                        >
                            {JOURNEY_ITEMS.map((item, index) => (
                                <div
                                    key={item.name}
                                    className="w-[86vw] max-w-[32rem] shrink-0 snap-start sm:w-[72vw]"
                                >
                                    <SideQuestCard
                                        item={item}
                                        index={index}
                                        variant="mobile"
                                        onLinkClick={handleJourneyLinkClick}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div
                        ref={viewportRef}
                        className="relative hidden lg:flex-1 lg:-mx-0 lg:block lg:overflow-hidden lg:px-0 lg:pb-0"
                    >
                        <div
                            ref={trackRef}
                            className="relative flex h-full min-w-max border-y border-border/70 bg-background/40 backdrop-blur-sm"
                        >
                            {JOURNEY_ITEMS.map((item, index) => {
                                return (
                                    <SideQuestCard
                                        key={item.name}
                                        item={item}
                                        index={index}
                                        variant="desktop"
                                        reverse={index % 2 === 1}
                                    />
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
