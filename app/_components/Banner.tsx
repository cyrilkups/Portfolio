'use client';
import ArrowAnimation from '@/components/ArrowAnimation';
import Button from '@/components/Button';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import React from 'react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const Banner = () => {
    const containerRef = React.useRef<HTMLDivElement>(null);

    // move the content a little up on scroll
    useGSAP(
        () => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'bottom 70%',
                    end: 'bottom 10%',
                    scrub: 1,
                },
            });

            tl.fromTo(
                '.slide-up-and-fade',
                { y: 0 },
                { y: -150, opacity: 0, stagger: 0.02 },
            );
        },
        { scope: containerRef },
    );

    return (
        <section className="relative overflow-hidden" id="banner">
            <ArrowAnimation />
            <div
                className="container h-[100svh] min-h-[530px] max-md:pb-10 flex justify-between items-center max-md:flex-col"
                ref={containerRef}
            >
                <div className="max-md:grow max-md:flex flex-col justify-center items-start max-w-[544px]">
                    <h1 className="banner-title slide-up-and-fade leading-[.95] text-6xl sm:text-[80px] font-anton">
                        <div className="flex md:flex-row flex-col md:items-start items-center gap-6 md:gap-10 md:whitespace-nowrap">
                            {/* Left block: Software / Developer (partial blue) */}
                            <div className="flex flex-col items-center md:items-start text-center md:text-left">
                                <span className="leading-none block">
                                    <span className="text-primary">Softw</span>
                                    <span className="text-foreground">are</span>
                                </span>
                                <span className="leading-none block">
                                    <span className="text-primary">Devel</span>
                                    <span className="text-foreground">
                                        oper
                                    </span>
                                </span>
                            </div>

                            {/* Plus sign */}
                            <div className="my-6 md:my-0 flex items-center text-primary text-5xl sm:text-[56px] md:text-[72px] leading-none">
                                +
                            </div>

                            {/* Right block: Technical / Product Manager */}
                            <div className="flex flex-col items-center md:items-start text-center md:text-left">
                                <span className="leading-none block text-primary">
                                    Technical
                                </span>
                                <span className="leading-none block">
                                    <span className="text-primary">
                                        Product
                                    </span>
                                    <span className="text-foreground">
                                        {' '}
                                        Manager
                                    </span>
                                </span>
                            </div>
                        </div>
                    </h1>
                    <p className="banner-description slide-up-and-fade mt-6 text-lg text-muted-foreground">
                        Hi! I&apos;m{' '}
                        <span className="font-medium text-foreground">
                            Cyril
                        </span>
                        . A creative Developer and Product Owner with 2+ years
                        of experience in building inclusive and scalable{' '}
                        <span className="text-primary">for all people</span>
                    </p>
                    <Button
                        as="link"
                        target="_blank"
                        rel="noopener noreferrer"
                        href="https://drive.google.com/drive/folders/1l4zOKYSkwJYpdMHJ-vSNvVbXOQHtiWYj"
                        variant="primary"
                        className="mt-9 banner-button slide-up-and-fade"
                    >
                        Hire Me
                    </Button>
                </div>

                <div className="md:absolute bottom-[10%] right-[4%] flex md:flex-col gap-4 md:gap-8 text-center md:text-right">
                    <div className="slide-up-and-fade">
                        <h5 className="text-3xl sm:text-4xl font-anton text-primary mb-1.5">
                            2+
                        </h5>
                        <p className="text-muted-foreground">
                            Years of Experience
                        </p>
                    </div>
                    <div className="slide-up-and-fade">
                        <h5 className="text-3xl sm:text-4xl font-anton text-primary mb-1.5">
                            7+
                        </h5>
                        <p className="text-muted-foreground">
                            Completed Projects
                        </p>
                    </div>
                    <div className="slide-up-and-fade">
                        <h5 className="text-3xl sm:text-4xl font-anton text-primary mb-1.5">
                            4K+
                        </h5>
                        <p className="text-muted-foreground">Hours Worked</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Banner;
