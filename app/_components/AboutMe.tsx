'use client';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import React from 'react';
import Image from 'next/image';
import Button from '@/components/Button';
import {
    ABOUT_ME_CONTENT,
    GENERAL_INFO,
    PRODUCTS_WORKED_ON,
} from '@/lib/portfolio-content';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const AboutMe = () => {
    const container = React.useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    id: 'about-me-in',
                    trigger: container.current,
                    start: 'top 70%',
                    end: 'bottom bottom',
                    scrub: 0.5,
                },
            });

            tl.from('.slide-up-and-fade', {
                y: 150,
                opacity: 0,
                stagger: 0.05,
            });
        },
        { scope: container },
    );

    useGSAP(
        () => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    id: 'about-me-out',
                    trigger: container.current,
                    start: 'bottom 50%',
                    end: 'bottom 10%',
                    scrub: 0.5,
                },
            });

            tl.to('.slide-up-and-fade', {
                y: -150,
                opacity: 0,
                stagger: 0.02,
            });
        },
        { scope: container },
    );

    return (
        <section className="pb-section" id="about-me">
            <div className="container" ref={container}>
                <h2 className="text-4xl md:text-6xl font-thin mb-20 slide-up-and-fade">
                    {ABOUT_ME_CONTENT.heading}
                </h2>

                <p className="pb-3 border-b text-muted-foreground slide-up-and-fade">
                    Products Worked On
                </p>

                <div className="mt-12 md:mt-16 pt-9 md:pt-0">
                    <div className="flex items-start justify-between gap-3 sm:gap-6 md:justify-center md:gap-16">
                        {PRODUCTS_WORKED_ON.map((product, index) => {
                            let hoverColor = '#3B82F6'; // Campus Hustle - primary color (blue)
                            if (product.name === 'Georim') {
                                hoverColor = '#333577';
                            } else if (product.name === 'DocLink') {
                                hoverColor = '#F26631';
                            }

                            return (
                                <a
                                    key={product.name}
                                    href={product.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex min-w-0 flex-1 flex-col items-center gap-3 slide-up-and-fade group cursor-pointer md:flex-none md:gap-4"
                                    style={{
                                        animationDelay: `${index * 0.15}s`,
                                    }}
                                >
                                    <div
                                        className="h-20 w-20 rounded-2xl overflow-hidden bg-muted flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110 sm:h-24 sm:w-24 md:h-40 md:w-40 md:rounded-3xl"
                                        style={{
                                            boxShadow: `0px 0px 0px rgba(0, 0, 0, 0)`,
                                            transitionProperty:
                                                'transform, box-shadow',
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.boxShadow = `0px 20px 40px ${hoverColor}40`;
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.boxShadow = `0px 0px 0px rgba(0, 0, 0, 0)`;
                                        }}
                                    >
                                        <Image
                                            src={product.logo}
                                            alt={product.name}
                                            width={128}
                                            height={128}
                                            className="w-full h-full object-cover"
                                            priority
                                        />
                                    </div>
                                    <p
                                        className="text-center text-sm font-medium leading-tight transition-colors duration-300 sm:text-base md:text-lg"
                                        style={{ color: 'inherit' }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.color =
                                                hoverColor;
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.color =
                                                'inherit';
                                        }}
                                    >
                                        {product.name}
                                    </p>
                                </a>
                            );
                        })}
                    </div>
                </div>

                <p className="pb-3 border-b text-muted-foreground slide-up-and-fade mt-20 md:mt-24">
                    {ABOUT_ME_CONTENT.introLabel}
                </p>

                <div
                    className="grid md:grid-cols-12 mt-6 md:mt-6 pt-6 md:pt-0"
                    id="about-me-intro"
                >
                    <div className="md:col-span-5">
                        <p className="text-5xl slide-up-and-fade">
                            {ABOUT_ME_CONTENT.name}
                        </p>
                    </div>
                    <div className="md:col-span-7">
                        <div className="text-lg text-muted-foreground max-w-[450px]">
                            <p className="slide-up-and-fade">
                                {ABOUT_ME_CONTENT.summary}
                            </p>
                            <p className="mt-3 slide-up-and-fade">
                                {ABOUT_ME_CONTENT.approach}
                            </p>
                            <p className="mt-6 slide-up-and-fade">
                                {ABOUT_ME_CONTENT.contactLead}{' '}
                                <strong>let&apos;s get in touch.</strong>{' '}
                                <a
                                    href={`mailto:${GENERAL_INFO.email}`}
                                    className="underline hover:text-foreground transition-colors"
                                >
                                    {ABOUT_ME_CONTENT.contactLinkLabel}
                                </a>
                            </p>
                            <Button
                                as="link"
                                target="_blank"
                                rel="noopener noreferrer"
                                href={ABOUT_ME_CONTENT.hireMeUrl}
                                variant="primary"
                                className="mt-6 slide-up-and-fade"
                            >
                                Hire Me
                            </Button>
                            <p className="mt-8 slide-up-and-fade">
                                {ABOUT_ME_CONTENT.footer}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutMe;
