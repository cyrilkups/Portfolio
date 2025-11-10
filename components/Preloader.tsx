'use client';
import { motion, AnimatePresence } from 'framer-motion';
import React, { useState, useEffect } from 'react';

interface PreloaderProps {
    name?: string;
    variant?: 'ide' | 'boxes';
    isReady?: boolean;
    backgroundImageUrl?: string;
}

interface BlockStyle {
    width: number;
    height: number;
    left: string;
    top: string;
    duration: number;
    delay: number;
}

const Preloader: React.FC<PreloaderProps> = ({
    variant = 'ide',
    isReady = false,
    backgroundImageUrl,
}) => {
    const [currentLine, setCurrentLine] = useState(0);
    const [currentChar, setCurrentChar] = useState(0);
    const [showCursor, setShowCursor] = useState(true);
    const [blockStyles, setBlockStyles] = useState<BlockStyle[]>([]);
    const [mounted, setMounted] = useState(false);

    const codeLines = [
        '# python',
        'print("Hello, Cyril Ofori Kupualor")',
        '',
        '// java',
        'System.out.println("Hello, Cyril Ofori Kupualor");',
    ];

    // Initialize random block styles on client only
    useEffect(() => {
        setMounted(true);
        const styles: BlockStyle[] = [...Array(20)].map(() => ({
            width: Math.random() * 60 + 40,
            height: Math.random() * 60 + 40,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            duration: 3 + Math.random() * 2,
            delay: Math.random() * 2,
        }));
        setBlockStyles(styles);
    }, []);

    // Typing animation for IDE variant
    useEffect(() => {
        if (variant !== 'ide' || isReady) return;

        const typingInterval = setInterval(() => {
            if (currentLine < codeLines.length) {
                const currentLineText = codeLines[currentLine];
                if (currentChar < currentLineText.length) {
                    setCurrentChar(currentChar + 1);
                } else {
                    setCurrentLine(currentLine + 1);
                    setCurrentChar(0);
                }
            }
        }, 50);

        return () => clearInterval(typingInterval);
    }, [currentLine, currentChar, variant, isReady, codeLines]);

    // Blinking cursor
    useEffect(() => {
        const cursorInterval = setInterval(() => {
            setShowCursor((prev) => !prev);
        }, 530);

        return () => clearInterval(cursorInterval);
    }, []);

    // Prefers reduced motion check
    const prefersReducedMotion =
        typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const containerVariants = {
        hidden: { opacity: 1 },
        visible: { opacity: 1 },
    };

    const exitTransition = { duration: 0.6 };

    const boxVariants = {
        hidden: { scale: 0, opacity: 0, rotateZ: -180 },
        visible: (i: number) => ({
            scale: 1,
            opacity: 1,
            rotateZ: 0,
            transition: {
                delay: i * 0.15,
                duration: 0.6,
            },
        }),
    };

    const legoColors = [
        'bg-red-500',
        'bg-blue-500',
        'bg-yellow-400',
        'bg-green-500',
        'bg-orange-500',
        'bg-purple-500',
        'bg-pink-500',
        'bg-cyan-500',
        'bg-lime-500',
    ];

    return (
        <AnimatePresence>
            {!isReady && (
                <motion.div
                    className="fixed inset-0 z-50 flex items-center justify-start px-8 md:px-16 lg:px-24"
                    style={{
                        background: backgroundImageUrl
                            ? `linear-gradient(135deg, rgba(20,20,20,0.95) 0%, rgba(40,40,40,0.95) 100%), url(${backgroundImageUrl})`
                            : 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                    variants={prefersReducedMotion ? {} : containerVariants}
                    initial="hidden"
                    animate="visible"
                    exit={{ opacity: 0 }}
                    transition={exitTransition}
                    aria-label="Loading content"
                    role="status"
                >
                    {/* Animated Lego-style background elements */}
                    <div className="absolute inset-0 overflow-hidden">
                        {/* Floating Lego blocks - only render after mount to ensure hydration match */}
                        {mounted && blockStyles.length > 0 ? (
                            blockStyles.map((style, i) => (
                                <motion.div
                                    key={i}
                                    className={`absolute rounded-lg ${
                                        legoColors[i % legoColors.length]
                                    }`}
                                    style={{
                                        width: style.width,
                                        height: style.height,
                                        left: style.left,
                                        top: style.top,
                                        opacity: 0.1,
                                    }}
                                    animate={{
                                        y: [0, -20, 0],
                                        rotate: [0, 10, -10, 0],
                                    }}
                                    transition={{
                                        duration: style.duration,
                                        repeat: Infinity,
                                        delay: style.delay,
                                    }}
                                />
                            ))
                        ) : (
                            // Fallback stable render for SSR (no blocks shown initially)
                            <div />
                        )}
                    </div>

                    {/* Content */}
                    <div className="relative z-10 w-full h-full flex items-center justify-center gap-8 px-8 md:px-16">
                        {/* Headshot Image - positioned close to IDE */}
                        <motion.div
                            className="hidden md:block flex-shrink-0"
                            initial={{ x: -200, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{
                                duration: 1,
                                delay: 0.2,
                                ease: [0.68, -0.55, 0.265, 1.55],
                            }}
                        >
                            <div className="relative">
                                {/* Lego studs scattered around */}
                                <div className="absolute -inset-4 flex flex-wrap justify-center items-center gap-3">
                                    {[...Array(8)].map((_, i) => (
                                        <motion.div
                                            key={i}
                                            className={`w-4 h-4 ${
                                                legoColors[
                                                    i % legoColors.length
                                                ]
                                            } rounded-full shadow-lg opacity-30`}
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{
                                                delay: 1 + i * 0.05,
                                                type: 'spring',
                                                stiffness: 200,
                                            }}
                                        />
                                    ))}
                                </div>
                                <motion.img
                                    src="/projects/images/headshot.png"
                                    alt="Headshot"
                                    className="relative z-10 w-72 h-72 object-cover rounded-3xl border-8 border-blue-600 shadow-2xl"
                                    whileHover={{ scale: 1.05 }}
                                    transition={{
                                        type: 'spring',
                                        stiffness: 300,
                                    }}
                                />
                            </div>
                        </motion.div>

                        {/* Code Editor Section - slides in from right */}
                        <motion.div
                            className="flex-shrink-0 max-w-2xl"
                            initial={{ x: 200, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{
                                duration: 1,
                                delay: 0.2,
                                ease: [0.68, -0.55, 0.265, 1.55],
                            }}
                        >
                            {variant === 'ide' ? (
                                <div className="space-y-6">
                                    {/* Lego-style IDE Window */}
                                    <div className="relative">
                                        {/* Lego studs on top */}
                                        <div className="absolute -top-4 left-0 right-0 flex gap-3 px-6">
                                            {[...Array(8)].map((_, i) => (
                                                <motion.div
                                                    key={i}
                                                    className="w-6 h-6 bg-gray-700 rounded-full shadow-inner"
                                                    initial={{ scale: 0 }}
                                                    animate={{ scale: 1 }}
                                                    transition={{
                                                        delay: i * 0.1,
                                                        type: 'spring',
                                                        stiffness: 200,
                                                    }}
                                                />
                                            ))}
                                        </div>

                                        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-2xl border-8 border-gray-700 overflow-hidden">
                                            {/* Window Title Bar with Lego-style buttons */}
                                            <div className="bg-gradient-to-r from-gray-700 to-gray-800 px-6 py-4 flex items-center gap-3 border-b-4 border-gray-900">
                                                <div className="flex gap-2">
                                                    <motion.div
                                                        className="w-5 h-5 bg-red-500 rounded-sm shadow-lg border-2 border-red-600"
                                                        whileHover={{
                                                            scale: 1.2,
                                                        }}
                                                    />
                                                    <motion.div
                                                        className="w-5 h-5 bg-yellow-400 rounded-sm shadow-lg border-2 border-yellow-500"
                                                        whileHover={{
                                                            scale: 1.2,
                                                        }}
                                                    />
                                                    <motion.div
                                                        className="w-5 h-5 bg-green-500 rounded-sm shadow-lg border-2 border-green-600"
                                                        whileHover={{
                                                            scale: 1.2,
                                                        }}
                                                    />
                                                </div>
                                                <div className="flex-1 text-center">
                                                    <span className="text-white font-bold text-sm px-4 py-1 bg-blue-600 rounded-lg shadow-md">
                                                        welcome.py
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Code Editor with Lego-style line numbers */}
                                            <div className="p-8 font-mono text-base md:text-lg bg-gray-900">
                                                {codeLines.map(
                                                    (line, lineIndex) => (
                                                        <div
                                                            key={lineIndex}
                                                            className="flex gap-6 mb-2"
                                                        >
                                                            <span className="flex items-center gap-2">
                                                                <span className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-md flex items-center justify-center text-white font-bold text-sm shadow-lg border-2 border-blue-700">
                                                                    {lineIndex +
                                                                        1}
                                                                </span>
                                                            </span>
                                                            <span
                                                                className={
                                                                    line.startsWith(
                                                                        '#',
                                                                    )
                                                                        ? 'text-green-400 font-bold'
                                                                        : line.startsWith(
                                                                              '//',
                                                                          )
                                                                        ? 'text-green-400 font-bold'
                                                                        : line.includes(
                                                                              'print',
                                                                          )
                                                                        ? 'text-blue-400 font-bold'
                                                                        : line.includes(
                                                                              'System',
                                                                          )
                                                                        ? 'text-purple-400 font-bold'
                                                                        : 'text-gray-300'
                                                                }
                                                            >
                                                                {lineIndex <
                                                                currentLine
                                                                    ? line
                                                                    : lineIndex ===
                                                                      currentLine
                                                                    ? line.substring(
                                                                          0,
                                                                          currentChar,
                                                                      )
                                                                    : ''}
                                                                {lineIndex ===
                                                                    currentLine &&
                                                                    currentChar <=
                                                                        line.length && (
                                                                        <span
                                                                            className={`inline-block w-3 h-6 bg-yellow-400 ml-1 shadow-lg ${
                                                                                showCursor
                                                                                    ? 'opacity-100'
                                                                                    : 'opacity-0'
                                                                            }`}
                                                                        />
                                                                    )}
                                                            </span>
                                                        </div>
                                                    ),
                                                )}
                                            </div>

                                            {/* Bottom Lego studs */}
                                            <div className="bg-gradient-to-r from-gray-700 to-gray-800 px-6 py-2 flex gap-3 border-t-4 border-gray-900">
                                                {[...Array(12)].map((_, i) => (
                                                    <div
                                                        key={i}
                                                        className="w-3 h-3 bg-gray-600 rounded-full shadow-inner"
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="space-y-8">
                                    {/* Lego Brick Grid */}
                                    <div className="grid grid-cols-3 gap-6 max-w-xl">
                                        {Array.from({ length: 9 }).map(
                                            (_, i) => (
                                                <motion.div
                                                    key={i}
                                                    className="relative"
                                                    variants={
                                                        prefersReducedMotion
                                                            ? {}
                                                            : boxVariants
                                                    }
                                                    initial="hidden"
                                                    animate="visible"
                                                    custom={i}
                                                >
                                                    {/* Lego studs on top */}
                                                    <div className="absolute -top-3 left-0 right-0 flex justify-center gap-2 z-10">
                                                        <div className="w-6 h-6 bg-black/30 rounded-full shadow-inner" />
                                                        <div className="w-6 h-6 bg-black/30 rounded-full shadow-inner" />
                                                    </div>
                                                    <div
                                                        className={`aspect-square ${
                                                            legoColors[i]
                                                        } rounded-xl shadow-2xl border-4 ${legoColors[
                                                            i
                                                        ]
                                                            .replace(
                                                                'bg-',
                                                                'border-',
                                                            )
                                                            .replace(
                                                                '500',
                                                                '600',
                                                            )
                                                            .replace(
                                                                '400',
                                                                '500',
                                                            )} flex items-center justify-center`}
                                                    >
                                                        <div className="text-white font-bold text-4xl opacity-20">
                                                            {i + 1}
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            ),
                                        )}
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Preloader;
