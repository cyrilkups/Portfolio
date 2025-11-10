'use client';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { MoveUpRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { GENERAL_INFO, SOCIAL_LINKS } from '@/lib/data';
import { Icon } from '@iconify/react';

const COLORS = [
    'bg-yellow-500 text-black',
    'bg-blue-500 text-white',
    'bg-teal-500 text-black',
    'bg-indigo-500 text-white',
    'bg-orange-500 text-black',
];

const MENU_LINKS = [
    {
        name: 'Home',
        url: '/',
    },
    {
        name: 'About Me',
        url: '/#about-me',
    },
    {
        name: 'Experience',
        url: '/#my-experience',
    },
    {
        name: 'Projects',
        url: '/#selected-projects',
    },
    {
        name: 'Interests',
        url: '/#outside-work',
    },
];

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const router = useRouter();

    return (
        <>
            <div className="sticky top-0 z-[4]">
                <button
                    className={cn(
                        'group size-12 absolute top-5 right-5 md:right-10 z-[2]',
                    )}
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    <span
                        className={cn(
                            'inline-block w-3/5 h-0.5 bg-foreground rounded-full absolute left-1/2 -translate-x-1/2 top-1/2 duration-300 -translate-y-[5px] ',
                            {
                                'rotate-45 -translate-y-1/2': isMenuOpen,
                                'md:group-hover:rotate-12': !isMenuOpen,
                            },
                        )}
                    ></span>
                    <span
                        className={cn(
                            'inline-block w-3/5 h-0.5 bg-foreground rounded-full absolute left-1/2 -translate-x-1/2 top-1/2 duration-300 translate-y-[5px] ',
                            {
                                '-rotate-45 -translate-y-1/2': isMenuOpen,
                                'md:group-hover:-rotate-12': !isMenuOpen,
                            },
                        )}
                    ></span>
                </button>
            </div>

            <div
                className={cn(
                    'overlay fixed inset-0 z-[2] bg-black/70 transition-all duration-150',
                    {
                        'opacity-0 invisible pointer-events-none': !isMenuOpen,
                    },
                )}
                onClick={() => setIsMenuOpen(false)}
            ></div>

            <div
                className={cn(
                    'fixed top-0 right-0 h-[100dvh] w-[500px] max-w-[calc(100vw-3rem)] transform translate-x-full transition-transform duration-700 z-[3] overflow-hidden gap-y-14',
                    'flex flex-col lg:justify-center py-10',
                    { 'translate-x-0': isMenuOpen },
                )}
            >
                <div
                    className={cn(
                        'fixed inset-0 scale-150 translate-x-1/2 rounded-[50%] bg-background-light duration-700 delay-150 z-[-1]',
                        {
                            'translate-x-0': isMenuOpen,
                        },
                    )}
                ></div>

                <div className="grow flex md:items-center w-full max-w-[300px] mx-8 sm:mx-auto">
                    <div className="flex gap-10 lg:justify-between max-lg:flex-col w-full">
                        <div className="max-lg:order-2">
                            <p className="text-muted-foreground mb-5 md:mb-8">
                                SOCIAL
                            </p>
                            <ul className="space-y-3">
                                {SOCIAL_LINKS.map((link) => (
                                    <li key={link.name}>
                                        <a
                                            href={link.url}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="text-lg hover:underline flex items-center gap-2"
                                        >
                                            {link.icon && (
                                                <Icon
                                                    icon={link.icon}
                                                    className="w-5 h-5"
                                                />
                                            )}
                                            {link.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="">
                            <p className="text-muted-foreground mb-5 md:mb-8">
                                MENU
                            </p>
                            <ul className="space-y-3">
                                {MENU_LINKS.map((link, idx) => (
                                    <li key={link.name}>
                                        <button
                                            onClick={() => {
                                                router.push(link.url);
                                                setIsMenuOpen(false);
                                            }}
                                            className="group text-xl flex items-center gap-3"
                                        >
                                            <span
                                                className={cn(
                                                    'size-3.5 bg-white/20 rounded-full flex items-center justify-center group-hover:scale-[200%] transition-all',
                                                    COLORS[idx],
                                                )}
                                            >
                                                <MoveUpRight
                                                    size={8}
                                                    className="scale-0 group-hover:scale-100 transition-all"
                                                />
                                            </span>
                                            {link.name}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="w-full max-w-[300px] mx-8 sm:mx-auto mt-8">
                    <a
                        href="https://drive.google.com/drive/folders/1l4zOKYSkwJYpdMHJ-vSNvVbXOQHtiWYj?usp=sharing"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 rounded-lg transition-all text-lg font-medium"
                    >
                        <Icon icon="mdi:file-document" className="w-5 h-5" />
                        My Resume
                    </a>
                </div>

                <div className="w-full max-w-[300px] mx-8 sm:mx-auto mt-8">
                    <p className="text-muted-foreground mb-4">GET IN TOUCH</p>
                    <a href={`mailto:${GENERAL_INFO.email}`}>
                        {GENERAL_INFO.email}
                    </a>
                </div>
            </div>
        </>
    );
};

export default Navbar;
