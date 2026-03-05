'use client';

import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import gsap from 'gsap';
import VolumetricBackground from './VolumetricBackground';
import LanguageToggle from './LanguageToggle';

export default function Hero({ loadingComplete }: { loadingComplete: boolean }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);

    // Scroll parallax
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end start'],
    });

    const textY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
    const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '-20%']);

    // Mouse Parallax Effect
    useEffect(() => {
        if (!loadingComplete) return;

        const handleMouseMove = (e: MouseEvent) => {
            const { innerWidth, innerHeight } = window;
            const xPos = (e.clientX / innerWidth - 0.5) * 2; // -1 to 1
            const yPos = (e.clientY / innerHeight - 0.5) * 2; // -1 to 1

            // Move text opposite to mouse
            gsap.to(textRef.current, {
                x: -xPos * 40,
                y: -yPos * 40,
                duration: 2,
                ease: 'power3.out',
            });

            // Move image with mouse but faster
            gsap.to(imageRef.current, {
                x: xPos * 60,
                y: yPos * 60,
                rotationY: xPos * 10,
                rotationX: -yPos * 10,
                duration: 1.5,
                ease: 'power2.out',
                transformPerspective: 1000,
            });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [loadingComplete]);

    return (
        <section ref={containerRef} className="relative w-full h-screen overflow-hidden flex items-center justify-center">
            {/* 1. Deepest Layer: Volumetric Background */}
            <VolumetricBackground />

            {/* 2. Middle Layer: Massive Typography */}
            <motion.div
                ref={textRef}
                style={{ y: textY }}
                className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none"
            >
                <motion.h1
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={loadingComplete ? { opacity: 0.2, scale: 1 } : {}}
                    transition={{ duration: 2, ease: 'easeOut' }}
                    className="text-[12vw] font-urban text-transparent bg-clip-text bg-gradient-to-b from-spRed to-spBlack leading-none"
                >
                    SHAN PUTHA
                </motion.h1>
            </motion.div>

            {/* 3. Foreground Layer: Cutout Image */}
            <motion.div
                style={{ y: imageY }}
                className="absolute bottom-0 w-[80vw] md:w-[60vw] max-w-[800px] z-20 pointer-events-none"
            >
                {/* Anti-Gravity continuous float */}
                <motion.div
                    animate={{ y: [0, -20, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                >
                    <img
                        ref={imageRef}
                        src="https://images.unsplash.com/photo-1571249704250-b003a305f87b?q=80&w=1000&auto=format&fit=crop"
                        alt="Shan Putha"
                        className="w-full h-auto drop-shadow-2xl grayscale contrast-[1.2] brightness-110 sepia-[0.2] hue-rotate-[-30deg]"
                        style={{
                            filter: 'drop-shadow(0px 20px 50px rgba(255, 0, 60, 0.4))'
                        }}
                    />
                </motion.div>
            </motion.div>

            {/* Hero UI Overlays (Header/Nav) */}
            <motion.header
                initial={{ y: -100, opacity: 0 }}
                animate={loadingComplete ? { y: 0, opacity: 1 } : {}}
                transition={{ delay: 1, duration: 1 }}
                className="absolute top-0 w-full p-8 z-30 flex justify-between items-center mix-blend-difference"
            >
                <div className="text-2xl font-bold tracking-widest text-spGold">SPMP</div>
                <nav className="flex gap-8 uppercase text-sm tracking-widest">
                    {['Music', 'Tour', 'Shop'].map((item, i) => (
                        <motion.a
                            key={item}
                            href={`#${item.toLowerCase()}`}
                            className="magnetic hover:text-spRed transition-colors relative"
                            whileHover={{ y: -5 }}
                        >
                            {item}
                            <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-spRed transition-all duration-300 hover:w-full" />
                        </motion.a>
                    ))}
                </nav>
                {/* Real Language Toggle */}
                <LanguageToggle />
            </motion.header>

            {/* Scroll indicator - Anti-Gravity float */}
            <motion.div
                className="absolute bottom-10 z-30 flex flex-col items-center gap-2"
                initial={{ opacity: 0 }}
                animate={loadingComplete ? { opacity: 1 } : {}}
                transition={{ delay: 2 }}
            >
                <span className="text-[10px] tracking-[0.3em] uppercase opacity-50">Scroll</span>
                <motion.div
                    className="w-[1px] h-12 bg-gradient-to-b from-spRed to-transparent"
                    animate={{ scaleY: [0, 1, 0], originY: [0, 0, 1, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                />
            </motion.div>
        </section>
    );
}
