'use client';

import { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipForward, Volume2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AudioPlayer() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [showVisualizer, setShowVisualizer] = useState(false);

    // Simulated toggle
    const togglePlay = () => {
        setIsPlaying(!isPlaying);
        setShowVisualizer(!isPlaying);
    };

    return (
        <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 3, type: 'spring', bounce: 0.4 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] glassmorphism rounded-full px-6 py-3 flex items-center gap-6 shadow-[0_0_20px_rgba(255,0,60,0.2)] border border-white/10"
        >
            {/* Visualizer bars */}
            <div className="flex items-end gap-[3px] h-6 w-16 opacity-80 mix-blend-screen">
                {[...Array(8)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="w-1.5 bg-spRed rounded-t-[1px]"
                        animate={{
                            height: isPlaying
                                ? [4, 20 + Math.random() * 10, 4]
                                : 4
                        }}
                        transition={{
                            duration: 0.2 + (Math.random() * 0.3),
                            repeat: Infinity,
                            ease: 'easeInOut',
                            delay: i * 0.05
                        }}
                        style={{ filter: isPlaying ? 'drop-shadow(0 0 5px #ff003c)' : 'none' }}
                    />
                ))}
            </div>

            {/* Marquee Track Title */}
            <div className="w-48 overflow-hidden relative flex items-center h-full mask-linear">
                <motion.div
                    initial={{ x: 0 }}
                    animate={{ x: isPlaying ? -150 : 0 }}
                    transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
                    className="whitespace-nowrap font-mono text-xs text-spGold tracking-[0.2em] w-[200%]"
                >
                    SHAN PUTHA - MAGAMPURA STATE OF MIND (PROD. DEVELOGENZ)
                </motion.div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-4 text-white">
                <button className="magnetic hover:text-spRed transition-colors">
                    <SkipForward className="rotate-180 w-5 h-5" />
                </button>
                <button
                    onClick={togglePlay}
                    className="magnetic w-10 h-10 rounded-full bg-spRed/20 flex items-center justify-center hover:bg-spRed/40 transition-colors border border-spRed/30"
                    style={{ filter: 'drop-shadow(0 0 10px rgba(255,0,60,0.5))' }}
                >
                    {isPlaying ? <Pause className="fill-white w-5 h-5" /> : <Play className="fill-white w-5 h-5 ml-1" />}
                </button>
                <button className="magnetic hover:text-spRed transition-colors">
                    <SkipForward className="w-5 h-5" />
                </button>
                <div className="w-[1px] h-6 bg-white/20 mx-2" />
                <button className="magnetic hover:text-spRed transition-colors group relative">
                    <Volume2 className="w-5 h-5" />
                    {/* Simple volume simulated bar on hover */}
                    <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-2 h-16 bg-white/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-spRed rounded-full shadow-[0_0_8px_#ff003c]"></div>
                    </div>
                </button>
            </div>
        </motion.div>
    );
}
