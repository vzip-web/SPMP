'use client';

import { motion } from 'framer-motion';

export default function Footer() {
    return (
        <footer className="relative w-full bg-[#050505] pt-40 pb-16 overflow-hidden z-20 border-t border-white/5">
            {/* Heavy noise overlay */}
            <div className="absolute inset-0 opacity-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none mix-blend-overlay" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-32 items-end">
                    <div className="max-w-xl">
                        <h3 className="text-5xl font-urban mb-8 text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">MAGAMPURA STATE OF MIND.</h3>
                        <p className="text-white/40 font-mono text-xs leading-loose max-w-sm">
                            This digital experience is an uncompromising vision of sound and motion. All elements are property of SPMP Magampura & VZiP DEVELOGENZ.
                        </p>
                    </div>
                    <div className="flex flex-col md:flex-row md:justify-end gap-8 font-mono text-sm tracking-[0.2em] font-bold">
                        {['YOUTUBE', 'SPOTIFY', 'INSTAGRAM', 'TWITTER'].map(link => (
                            <a key={link} href={`#${link.toLowerCase()}`} className="magnetic relative group py-2">
                                <span className="relative z-10 group-hover:text-spRed transition-colors duration-300">{link}</span>
                                <span className="absolute left-0 bottom-0 w-full h-[1px] bg-white/20" />
                                <motion.span
                                    className="absolute left-0 bottom-0 w-0 h-[1px] bg-spRed"
                                    whileHover={{ width: '100%' }}
                                    transition={{ duration: 0.3, ease: 'easeOut' }}
                                />
                            </a>
                        ))}
                    </div>
                </div>

                {/* The Ultimatum */}
                <div className="w-full flex-col items-center justify-center pt-24 border-t border-white/5 relative group cursor-pointer text-center">
                    <h2 className="text-sm md:text-xl font-mono text-white/50 tracking-[0.5em] mb-4 group-hover:text-white transition-colors duration-500">
                        DEVELOPED AND SPONSORED BY
                    </h2>

                    <div className="relative inline-block magnetic">
                        <h1 className="text-4xl md:text-7xl lg:text-[9rem] xl:text-[200px] font-urban text-transparent bg-clip-text bg-gradient-to-b from-spGold via-[#8a7300] to-[#1a1500] tracking-tighter leading-none relative z-10">
                            VZiP DEVELOGENZ
                        </h1>

                        {/* Liquid Metal / Gold Ripple Overlays hidden until hover */}
                        <motion.div
                            className="absolute inset-0 blur-3xl bg-spGold/30 mix-blend-screen -z-10 rounded-[100%] opacity-0 group-hover:opacity-100"
                            animate={{ scale: [1, 1.05, 1], opacity: [0, 0.8, 0] }}
                            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                        />

                        {/* Glare sweep wrapper */}
                        <div className="absolute inset-0 overflow-hidden pointer-events-none z-20 mask-linear opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                            <motion.div
                                className="w-[20%] h-full bg-gradient-to-r from-transparent via-white/80 to-transparent -skew-x-12 translate-x-[-200%]"
                                animate={{ translateX: ["-200%", "500%"] }}
                                transition={{ repeat: Infinity, duration: 2.5, ease: "linear" }}
                                style={{ filter: "drop-shadow(0 0 20px #fff)" }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
