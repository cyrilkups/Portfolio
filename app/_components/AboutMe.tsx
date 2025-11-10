'use client';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import React from 'react';
import Button from '@/components/Button';
import { GENERAL_INFO } from '@/lib/data';

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
                    I take a user-centered approach to design, making sure each
                    project is thoughtfully crafted around the real needs and
                    experiences of the people who will use it.
                </h2>

                <p className="pb-3 border-b text-muted-foreground slide-up-and-fade">
                    This is me.
                </p>

                <div className="grid md:grid-cols-12 mt-9">
                    <div className="md:col-span-5">
                        <p className="text-5xl slide-up-and-fade">
                            Hi, I&apos;m Cyril.
                        </p>
                    </div>
                    <div className="md:col-span-7">
                        <div className="text-lg text-muted-foreground max-w-[450px]">
                            <p className="slide-up-and-fade">
                                I&apos;m a software developer and technical
                                product manager focused on building thoughtful,
                                scalable solutions. I combine hands-on
                                engineering with product strategy to turn
                                complex problems into intuitive, high-impact
                                experiences.
                            </p>
                            <p className="mt-3 slide-up-and-fade">
                                My approach blends user-centered design,
                                technical execution, and business alignment. By
                                prioritizing performance, accessibility, and
                                clarity, I create solutions that are not only
                                seamless for users, but also meaningful for
                                stakeholders and sustainable for teams.
                            </p>
                            <p className="mt-6 slide-up-and-fade">
                                I guess you&apos;re already convinced -{' '}
                                <strong>let&apos;s get in touch.</strong>{' '}
                                <a
                                    href="mailto:cyrilkups95@gmail.com"
                                    className="underline hover:text-foreground transition-colors"
                                >
                                    Shoot me an email
                                </a>
                            </p>
                            <Button
                                as="link"
                                target="_blank"
                                rel="noopener noreferrer"
                                href="https://drive.google.com/drive/folders/1l4zOKYSkwJYpdMHJ-vSNvVbXOQHtiWYj"
                                variant="primary"
                                className="mt-6 slide-up-and-fade"
                            >
                                Hire Me
                            </Button>
                            <p className="mt-8 slide-up-and-fade">
                                Still wondering? Take a look through my
                                portfolio and see for yourself below 👇
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutMe;
