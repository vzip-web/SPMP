'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Preloader({ onComplete }: { onComplete: () => void }) {
    const [phase, setPhase] = useState<'ekg' | 'video' | 'text' | 'dissolve'>('ekg');

    useEffect(() => {
        // Phase 1: EKG Pulse (0 - 1.5s)
        const t1 = setTimeout(() => setPhase('video'), 1500);
        // Phase 2: Glitch Video (1.5s - 4.5s)
        const t2 = setTimeout(() => setPhase('text'), 4500);
        // Phase 3: Text Shatter (4.5s - 6s)
        const t3 = setTimeout(() => setPhase('dissolve'), 6000);
        // Final Phase: Dissolve & Complete (6s - 7s)
        const t4 = setTimeout(() => onComplete(), 7000);

        return () => {
            clearTimeout(t1);
            clearTimeout(t2);
            clearTimeout(t3);
            clearTimeout(t4);
        };
    }, [onComplete]);

    return (
        <motion.div
            className="fixed inset-0 z-50 bg-spBlack flex flex-col items-center justify-center overflow-hidden pointer-events-none"
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 1, ease: 'easeInOut' }}
        >
            <AnimatePresence>
                {phase === 'ekg' && (
                    <motion.div
                        key="ekg"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1, scale: [1, 1.2, 1] }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5, repeat: Infinity, ease: 'easeOut' }}
                        className="w-full max-w-lg h-24 flex items-center justify-center p-4 relative"
                    >
                        {/* simple heartbeat svg */}
                        <svg viewBox="0 0 100 20" className="w-full h-full stroke-spRed stroke-2 fill-none filter drop-shadow-[0_0_10px_rgba(255,0,60,0.8)]">
                            <path d="M0 10 L40 10 L45 5 L50 20 L55 0 L60 15 L65 10 L100 10" />
                        </svg>
                    </motion.div>
                )}

                {phase === 'video' && (
                    <motion.div
                        key="video"
                        initial={{ opacity: 0, filter: 'contrast(200%) brightness(150%) blur(10px)' }}
                        animate={{ opacity: 1, filter: 'contrast(100%) brightness(100%) blur(0px)' }}
                        exit={{ opacity: 0, filter: 'contrast(200%) brightness(50%) blur(5px)' }}
                        transition={{ duration: 0.1 }}
                        className="absolute inset-0 glitch-wrapper"
                    >
                        {/* Mock video placeholder utilizing CSS Glitch */}
                        <div className="glitch bg-spRed opacity-50 absolute inset-0 mix-blend-color-dodge" />
                        <div className="absolute inset-0 vhs-overlay mix-blend-overlay" />
                        <img
                            src="https://images.unsplash.com/photo-1598387181032-a310322ba58d?q=80&w=2000&auto=format&fit=crop"
                            alt="Glitched Video Element"
                            className="w-full h-full object-cover grayscale opacity-80 mix-blend-luminosity"
                        />
                    </motion.div>
                )}

                {(phase === 'text' || phase === 'dissolve') && (
                    <motion.div
                        key="text"
                        className="absolute flex flex-col items-center justify-center z-20 text-center uppercase font-urban leading-none"
                    >
                        <motion.h1
                            initial={{ scale: 2, opacity: 0, rotateX: 90 }}
                            animate={phase === 'dissolve' ? { y: -100, opacity: 0, scale: 1.5, filter: 'blur(10px)' } : { scale: 1, opacity: 1, rotateX: 0 }}
                            transition={{ duration: phase === 'dissolve' ? 1 : 0.8, type: phase === 'dissolve' ? 'tween' : 'spring', bounce: 0.5 }}
                            className="text-7xl md:text-[9rem] xl:text-[12rem] text-spRed drop-shadow-[0_0_20px_rgba(255,0,60,0.8)] tracking-tighter"
                        >
                            SHAN PUTHA
                        </motion.h1>
                        <motion.h2
                            initial={{ opacity: 0, y: 50 }}
                            animate={phase === 'dissolve' ? { y: -50, opacity: 0, filter: 'blur(5px)' } : { opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: phase === 'dissolve' ? 0.8 : 0.5 }}
                            className="text-2xl md:text-5xl text-white mt-4 tracking-tight"
                        >
                            SPMP MAGAMPURA
                        </motion.h2>

                        {/* Ember Dissolve Particles */}
                        {phase === 'dissolve' && (
                            <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
                                {[...Array(30)].map((_, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 1, y: 0, x: 0, scale: Math.random() * 2 }}
                                        animate={{
                                            opacity: 0,
                                            y: -200 - Math.random() * 300,
                                            x: (Math.random() - 0.5) * 400
                                        }}
                                        transition={{ duration: 1 + Math.random(), ease: 'easeOut' }}
                                        className="absolute w-2 h-2 bg-spGold rounded-full shadow-[0_0_10px_rgba(255,215,0,0.8)]"
                                    />
                                ))}
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
