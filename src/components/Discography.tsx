'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const albums = [
    { id: 1, title: 'MAGAMPURA MINDSET', year: '2023', cover: 'https://images.unsplash.com/photo-1614613535308-eb51bd3d2c17?q=80&w=500&auto=format&fit=crop' },
    { id: 2, title: 'STREET POETRY', year: '2024', cover: 'https://images.unsplash.com/photo-1493225457124-a1a2a5f5f9af?q=80&w=500&auto=format&fit=crop' },
    { id: 3, title: 'ANTI GRAVITY', year: '2025', cover: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=500&auto=format&fit=crop' },
    { id: 4, title: 'RED NEON', year: '2026', cover: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=500&auto=format&fit=crop' }
];

export default function Discography() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const scrollRef = useRef<HTMLDivElement>(null);
    const [hoveredAlbum, setHoveredAlbum] = useState<number | null>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        // We check if it's mounted and refs are available
        if (!sectionRef.current || !scrollRef.current) return;

        const ctx = gsap.context(() => {
            const scrollWidth = scrollRef.current?.scrollWidth || 0;
            const clientWidth = scrollRef.current?.clientWidth || 0;

            const distance = scrollWidth - clientWidth;

            if (distance > 0) {
                gsap.to(scrollRef.current, {
                    x: -distance,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        pin: true,
                        scrub: 1,
                        start: 'top top',
                        end: () => `+=${distance}`,
                    }
                });
            }
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="relative h-screen bg-spBlack overflow-hidden z-20" id="music">
            <div className="absolute top-16 left-8 md:left-24 z-30 pointer-events-none">
                <h2 className="text-5xl md:text-[8rem] font-urban text-transparent bg-clip-text bg-gradient-to-r from-spRed to-white mix-blend-difference opacity-90 leading-none">
                    DISCOGRAPHY
                </h2>
            </div>

            <div
                className={`absolute inset-0 bg-black/80 z-10 transition-opacity duration-700 pointer-events-none ${hoveredAlbum !== null ? 'opacity-100' : 'opacity-0'}`}
            />

            <div className="absolute top-1/2 -translate-y-1/2 flex gap-12 md:gap-32 px-8 md:px-24 w-max z-20 perspective-1000" ref={scrollRef}>
                {albums.map((album) => (
                    <div
                        key={album.id}
                        className="relative group w-64 h-64 md:w-96 md:h-96 magnetic cursor-none"
                        onMouseEnter={() => setHoveredAlbum(album.id)}
                        onMouseLeave={() => setHoveredAlbum(null)}
                    >
                        {/* Anti-Gravity continuous float */}
                        <motion.div
                            animate={{ y: [0, -15, 0] }}
                            transition={{ duration: 4 + album.id, repeat: Infinity, ease: 'easeInOut' }}
                            className="w-full h-full relative"
                            style={{ transformStyle: 'preserve-3d' }}
                        >
                            {/* Inner container to hold hover transforms separately from Y-axis float */}
                            <div className="w-full h-full relative group-hover:rotate-y-[15deg] group-hover:rotate-x-[5deg] transition-transform duration-700 ease-out" style={{ transformStyle: 'preserve-3d' }}>

                                {/* Vinyl Record */}
                                <div className="absolute inset-0 rounded-full bg-[#050505] shadow-[0_0_50px_rgba(0,0,0,0.9)] border border-white/5 overflow-hidden transition-all duration-[800ms] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:translate-x-1/2 group-hover:rotate-180 z-0 flex items-center justify-center">
                                    {/* Vinyl Grooves generated with CSS */}
                                    <div className="absolute w-[95%] h-[95%] rounded-full border-[0.5px] border-white/5" />
                                    <div className="absolute w-[80%] h-[80%] rounded-full border-[0.5px] border-white/5" />
                                    <div className="absolute w-[60%] h-[60%] rounded-full border-[0.5px] border-white/5" />
                                    <div className="absolute w-[40%] h-[40%] rounded-full border-[0.5px] border-white/5" />

                                    {/* Vinyl Center Label */}
                                    <div className="absolute w-1/3 h-1/3 rounded-full overflow-hidden border border-black/50">
                                        <img src={album.cover} alt="Vinyl Label" className="w-full h-full object-cover opacity-80 saturate-0 group-hover:saturate-100 transition-all duration-700 pointer-events-none" />
                                    </div>
                                    {/* Vinyl Center Hole */}
                                    <div className="absolute w-3 h-3 rounded-full bg-spBlack border border-black shadow-inner" />
                                </div>

                                {/* Glossy Sleeve */}
                                <div className="absolute inset-0 bg-spBlack shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden z-10 border border-white/10 rounded-sm">
                                    <img src={album.cover} alt={album.title} className="w-full h-full object-cover mix-blend-luminosity brightness-75 group-hover:brightness-110 group-hover:mix-blend-normal transition-all duration-700 pointer-events-none" />
                                    {/* Glossy Glare effect */}
                                    <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transform -translate-x-full group-hover:translate-x-full transition-all duration-[1500ms] ease-in-out pointer-events-none" />
                                </div>
                            </div>
                        </motion.div>

                        {/* Typography metadata */}
                        <motion.div
                            className="absolute -bottom-20 left-0 text-white font-mono opacity-0 group-hover:opacity-100 transition-opacity duration-[800ms] transform translate-y-4 group-hover:translate-y-0"
                        >
                            <div className="text-xl md:text-3xl font-urban tracking-wider text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.4)] whitespace-nowrap">
                                {album.title}
                            </div>
                            <div className="text-sm text-spRed tracking-widest mt-1 border border-spRed/50 inline-block px-2 py-0.5 mt-2 shadow-[0_0_10px_rgba(255,0,60,0.5)] bg-spRed/10">
                                {album.year}
                            </div>
                        </motion.div>
                    </div>
                ))}
            </div>
        </section>
    );
}
