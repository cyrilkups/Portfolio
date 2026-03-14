'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Github,
    Twitter,
    Youtube,
    Linkedin,
    ChevronLeft,
    ChevronRight,
    Globe,
} from 'lucide-react';
import { SNAPSHOT_HIGHLIGHTS } from '@/lib/portfolio-content';
import { cn } from '@/lib/utils';

export interface TestimonialCarouselProps {
    className?: string;
}

export function TestimonialCarousel({ className }: TestimonialCarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleNext = () =>
        setCurrentIndex((index) => (index + 1) % SNAPSHOT_HIGHLIGHTS.length);
    const handlePrevious = () =>
        setCurrentIndex(
            (index) =>
                (index - 1 + SNAPSHOT_HIGHLIGHTS.length) %
                SNAPSHOT_HIGHLIGHTS.length,
        );

    // Auto-advance carousel every 5 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            handleNext();
        }, 5000);

        return () => clearInterval(interval);
    }, [currentIndex]);

    const currentTestimonial = SNAPSHOT_HIGHLIGHTS[currentIndex];

    const socialIcons = [
        { icon: Github, url: currentTestimonial.githubUrl, label: 'GitHub' },
        { icon: Twitter, url: currentTestimonial.twitterUrl, label: 'Twitter' },
        { icon: Youtube, url: currentTestimonial.youtubeUrl, label: 'YouTube' },
        {
            icon: Linkedin,
            url: currentTestimonial.linkedinUrl,
            label: 'LinkedIn',
        },
        {
            icon: Globe,
            url: currentTestimonial.websiteUrl,
            label: 'Website',
        },
    ].filter((social) => {
        // Remove GitHub and Twitter for the first carousel item (Strada Scholar)
        if (
            currentIndex === 0 &&
            (social.label === 'GitHub' ||
                social.label === 'Twitter' ||
                social.label === 'Website')
        ) {
            return false;
        }
        // Show only website icon for the second carousel item (TMCF Scholar)
        if (currentIndex === 1 && social.label !== 'Website') {
            return false;
        }
        // Remove all social icons for the third carousel item (Pitch Win)
        if (currentIndex === 2) {
            return false;
        }
        // Remove all social icons for the fourth carousel item (The Leader in Me)
        if (currentIndex === 3) {
            return false;
        }
        // Remove all social icons for the fifth carousel item (The Thunderbolt)
        if (currentIndex === 4) {
            return false;
        }
        // Show only LinkedIn icon for the sixth carousel item (ExposeToEmpower)
        if (currentIndex === 5 && social.label !== 'LinkedIn') {
            return false;
        }
        return true;
    });

    return (
        <div className={cn('w-full max-w-5xl mx-auto px-4', className)}>
            {/* Desktop layout */}
            <div className="hidden md:flex relative items-center">
                {/* Avatar */}
                <div className="w-[470px] h-[470px] rounded-3xl overflow-hidden bg-gray-200 dark:bg-neutral-800 flex-shrink-0">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentTestimonial.imageUrl}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.4, ease: 'easeInOut' }}
                            className="w-full h-full"
                        >
                            <Image
                                src={currentTestimonial.imageUrl}
                                alt={currentTestimonial.name}
                                width={470}
                                height={470}
                                className="w-full h-full object-cover"
                                draggable={false}
                                priority
                            />
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Card */}
                <div className="bg-[#212121] rounded-3xl shadow-2xl p-8 ml-[-80px] z-10 max-w-xl flex-1">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentTestimonial.name}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.4, ease: 'easeInOut' }}
                        >
                            <div className="mb-6">
                                <h2 className="text-2xl font-bold text-white mb-2">
                                    {currentTestimonial.name}
                                </h2>

                                <p className="text-sm font-medium text-gray-400">
                                    {currentTestimonial.title}
                                </p>
                            </div>

                            <p className="text-white text-base leading-relaxed mb-8">
                                {currentTestimonial.description}
                            </p>

                            <div className="flex space-x-4">
                                {socialIcons.map(
                                    ({ icon: IconComponent, url, label }) => (
                                        <Link
                                            key={label}
                                            href={url || '#'}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-12 h-12 bg-gray-900 dark:bg-gray-100 rounded-full flex items-center justify-center transition-colors hover:bg-gray-800 dark:hover:bg-gray-200 hover:scale-105 cursor-pointer"
                                            aria-label={label}
                                        >
                                            <IconComponent className="w-5 h-5 text-white dark:text-gray-900" />
                                        </Link>
                                    ),
                                )}
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>

            {/* Mobile layout */}
            <div className="md:hidden max-w-sm mx-auto text-center bg-transparent">
                {/* Avatar */}
                <div className="w-full aspect-square bg-gray-200 dark:bg-gray-700 rounded-3xl overflow-hidden mb-6">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentTestimonial.imageUrl}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.4, ease: 'easeInOut' }}
                            className="w-full h-full"
                        >
                            <Image
                                src={currentTestimonial.imageUrl}
                                alt={currentTestimonial.name}
                                width={400}
                                height={400}
                                className="w-full h-full object-cover"
                                draggable={false}
                                priority
                            />
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Card content */}
                <div className="px-4">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentTestimonial.name}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.4, ease: 'easeInOut' }}
                        >
                            <h2 className="text-xl font-bold text-white mb-2">
                                {currentTestimonial.name}
                            </h2>

                            <p className="text-sm font-medium text-gray-400 mb-4">
                                {currentTestimonial.title}
                            </p>

                            <p className="text-white text-sm leading-relaxed mb-6">
                                {currentTestimonial.description}
                            </p>

                            <div className="flex justify-center space-x-4">
                                {socialIcons.map(
                                    ({ icon: IconComponent, url, label }) => (
                                        <Link
                                            key={label}
                                            href={url || '#'}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-12 h-12 bg-gray-900 dark:bg-gray-100 rounded-full flex items-center justify-center transition-colors hover:bg-gray-800 dark:hover:bg-gray-200 cursor-pointer"
                                            aria-label={label}
                                        >
                                            <IconComponent className="w-5 h-5 text-white dark:text-gray-900" />
                                        </Link>
                                    ),
                                )}
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>

            {/* Bottom navigation */}
            <div className="flex justify-center items-center gap-6 mt-8">
                {/* Previous */}
                <button
                    onClick={handlePrevious}
                    aria-label="Previous testimonial"
                    className="w-12 h-12 rounded-full bg-[#212121] border border-gray-700 shadow-md flex items-center justify-center hover:bg-gray-800 transition-colors cursor-pointer"
                >
                    <ChevronLeft className="w-6 h-6 text-white" />
                </button>

                {/* Dots */}
                <div className="flex gap-2">
                    {SNAPSHOT_HIGHLIGHTS.map((_, testimonialIndex) => (
                        <button
                            key={testimonialIndex}
                            onClick={() => setCurrentIndex(testimonialIndex)}
                            className={cn(
                                'w-3 h-3 rounded-full transition-colors cursor-pointer',
                                testimonialIndex === currentIndex
                                    ? 'bg-white'
                                    : 'bg-gray-600',
                            )}
                            aria-label={`Go to testimonial ${
                                testimonialIndex + 1
                            }`}
                        />
                    ))}
                </div>

                {/* Next */}
                <button
                    onClick={handleNext}
                    aria-label="Next testimonial"
                    className="w-12 h-12 rounded-full bg-[#212121] border border-gray-700 shadow-md flex items-center justify-center hover:bg-gray-800 transition-colors cursor-pointer"
                >
                    <ChevronRight className="w-6 h-6 text-white" />
                </button>
            </div>
        </div>
    );
}
