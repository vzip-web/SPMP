'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursor() {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        const updateCursor = (e: MouseEvent) => {
            setPosition({ x: e.clientX, y: e.clientY });

            const target = e.target as HTMLElement;
            if (
                target.closest('button') ||
                target.closest('a') ||
                target.closest('.magnetic') ||
                target.tagName.toLowerCase() === 'img'
            ) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        window.addEventListener('mousemove', updateCursor);
        return () => window.removeEventListener('mousemove', updateCursor);
    }, []);

    return (
        <>
            <motion.div
                className="fixed top-0 left-0 w-3 h-3 bg-spRed rounded-full pointer-events-none z-[9999]"
                style={{ filter: 'drop-shadow(0 0 8px rgba(255, 0, 60, 0.8))' }}
                animate={{
                    x: position.x - 6,
                    y: position.y - 6,
                    scale: isHovering ? 0 : 1,
                }}
                transition={{ type: 'spring', mass: 0.1, stiffness: 800, damping: 20 }}
            />

            <motion.div
                className="fixed top-0 left-0 w-12 h-12 border-2 border-spGold rounded-full pointer-events-none z-[9998]"
                animate={{
                    x: position.x - 24,
                    y: position.y - 24,
                    scale: isHovering ? 1.5 : 0,
                    opacity: isHovering ? 1 : 0,
                }}
                transition={{ type: 'spring', mass: 0.2, stiffness: 200, damping: 15 }}
            />
        </>
    );
}
