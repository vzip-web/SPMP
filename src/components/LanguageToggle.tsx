'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';

export default function LanguageToggle() {
    const [lang, setLang] = useState<'EN' | 'SI'>('EN');
    const [displayLang, setDisplayLang] = useState('EN');
    const [isAnimating, setIsAnimating] = useState(false);

    const toggle = () => {
        if (isAnimating) return;
        const nextLang = lang === 'EN' ? 'SI' : 'EN';
        setLang(nextLang);
        setIsAnimating(true);

        let iterations = 0;
        const interval = setInterval(() => {
            setDisplayLang(
                nextLang
                    .split('')
                    .map((char, index) => {
                        if (index < iterations / 3) {
                            return nextLang[index];
                        }
                        return chars[Math.floor(Math.random() * chars.length)];
                    })
                    .join('')
            );

            if (iterations >= nextLang.length * 3) {
                clearInterval(interval);
                setDisplayLang(nextLang);
                setIsAnimating(false);
            }
            iterations += 1;
        }, 50);
    };

    return (
        <div
            className="flex gap-4 text-xs font-mono items-center border border-white/20 px-4 py-2 rounded-full backdrop-blur-md cursor-pointer magnetic hover:border-spRed group transition-colors shadow-[0_0_15px_rgba(255,255,255,0.05)] hover:shadow-[0_0_20px_rgba(255,0,60,0.5)]"
            onClick={toggle}
        >
            <div className="flex gap-2 min-w-[3.5rem] justify-between">
                <motion.span
                    className={`font-bold transition-colors ${lang === 'EN' ? 'text-spRed drop-shadow-[0_0_8px_#ff003c]' : 'text-white/30'}`}
                >
                    {lang === 'EN' ? displayLang : 'EN'}
                </motion.span>
                <span className="text-white/20">/</span>
                <motion.span
                    className={`font-bold transition-colors ${lang === 'SI' ? 'text-spRed drop-shadow-[0_0_8px_#ff003c]' : 'text-white/30'}`}
                >
                    {lang === 'SI' ? displayLang : 'SI'}
                </motion.span>
            </div>
        </div>
    );
}
