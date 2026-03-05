'use client';

import { useState, useEffect } from 'react';
import Preloader from '@/components/Preloader';
import Hero from '@/components/Hero';
import AudioPlayer from '@/components/AudioPlayer';
import Discography from '@/components/Discography';
import Footer from '@/components/Footer';
import { AnimatePresence, motion } from 'framer-motion';

export default function Home() {
    const [loadingComplete, setLoadingComplete] = useState(false);

    // We want to prevent scrolling while the preloader is active!
    useEffect(() => {
        if (!loadingComplete) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [loadingComplete]);

    return (
        <main className="relative min-h-screen bg-spBlack text-white selection:bg-spRed selection:text-white">
            <AnimatePresence mode="wait">
                {!loadingComplete && (
                    <Preloader key="preloader" onComplete={() => setLoadingComplete(true)} />
                )}
            </AnimatePresence>

            <div className={`transition-opacity duration-1000 ${loadingComplete ? 'opacity-100' : 'opacity-0'}`}>
                <Hero loadingComplete={loadingComplete} />
                <Discography />
                <Footer />
                <AudioPlayer />
            </div>
        </main>
    );
}
