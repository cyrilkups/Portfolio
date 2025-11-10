'use client';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef, useEffect } from 'react';

gsap.registerPlugin(useGSAP);

const ParticleBackground = () => {
    const particlesRef = useRef<HTMLDivElement[]>([]);
    const initializedRef = useRef(false);

    useEffect(() => {
        if (initializedRef.current) return;
        initializedRef.current = true;

        particlesRef.current.forEach((particle) => {
            gsap.set(particle, {
                width: Math.random() * 3 + 1,
                height: Math.random() * 3 + 1,
                opacity: Math.random(),
                left: Math.random() * window.innerWidth,
                top: Math.random() * (window.innerHeight + 1),
            });

            gsap.to(particle, {
                y: window.innerHeight,
                duration: Math.random() * 10 + 10,
                opacity: 0,
                repeat: -1,
                ease: 'none',
            });
        });
    }, []);

    return (
        <div className="fixed inset-0 z-0 pointer-events-none">
            {[...Array(100)].map((_, i) => (
                <div
                    key={i}
                    ref={(el) => {
                        if (el && !particlesRef.current.includes(el)) {
                            particlesRef.current.push(el);
                        }
                    }}
                    className="absolute rounded-full bg-white"
                />
            ))}
        </div>
    );
};

export default ParticleBackground;
