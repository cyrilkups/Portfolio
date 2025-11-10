'use client';
import { useState, useEffect } from 'react';
import Preloader from './Preloader';

export default function PreloaderWrapper() {
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        // Simulate loading time - adjust as needed
        const timer = setTimeout(() => {
            setIsReady(true);
        }, 3500); // 3.5 seconds to see the full animation

        return () => clearTimeout(timer);
    }, []);

    return (
        <Preloader
            name="Cyril Ofori Kupualor"
            variant="ide" // Change to "boxes" to see the other animation
            isReady={isReady}
            // backgroundImageUrl="/path/to/your/background.jpg" // Optional custom background
        />
    );
}
