"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function LiquidBackground() {
    const [isReducedMotion, setIsReducedMotion] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
        setIsReducedMotion(mediaQuery.matches);

        const handleChange = () => setIsReducedMotion(mediaQuery.matches);
        mediaQuery.addEventListener("change", handleChange);
        return () => mediaQuery.removeEventListener("change", handleChange);
    }, []);

    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 1000], [0, 200]);
    const y2 = useTransform(scrollY, [0, 1000], [0, -150]);
    const rotate = useTransform(scrollY, [0, 1000], [0, 90]);

    // Smooth out the scroll transform
    const smoothY1 = useSpring(y1, { stiffness: 50, damping: 20 });
    const smoothY2 = useSpring(y2, { stiffness: 50, damping: 20 });

    if (isReducedMotion) {
        return (
            <div className="fixed inset-0 -z-50 overflow-hidden pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-black" />
                <div className="absolute top-[20%] left-[20%] w-[500px] h-[500px] rounded-full bg-[var(--blob-1)] blur-[120px] opacity-20" />
                <div className="absolute bottom-[20%] right-[20%] w-[500px] h-[500px] rounded-full bg-[var(--blob-2)] blur-[120px] opacity-20" />
            </div>
        );
    }

    return (
        <div className="fixed inset-0 -z-50 overflow-hidden pointer-events-none">
            {/* Base Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-black" />

            {/* Noise Texture */}
            <div className="absolute inset-0 noise-bg opacity-[0.03]" />

            {/* Blob 1 - Primary */}
            <motion.div
                className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] min-w-[400px] min-h-[400px] rounded-full bg-[var(--blob-1)] blur-[100px] opacity-30 mix-blend-screen"
                animate={{
                    x: [0, 100, 0],
                    y: [0, 50, 0],
                    scale: [1, 1.1, 1],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut"
                }}
                style={{ y: smoothY1 }}
            />

            {/* Blob 2 - Secondary */}
            <motion.div
                className="absolute top-[40%] right-[-10%] w-[40vw] h-[40vw] min-w-[300px] min-h-[300px] rounded-full bg-[var(--blob-2)] blur-[100px] opacity-20 mix-blend-screen"
                animate={{
                    x: [0, -100, 0],
                    y: [0, 100, 0],
                    rotate: [0, 45, 0],
                }}
                transition={{
                    duration: 25,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut"
                }}
                style={{ y: smoothY2, rotate }}
            />

            {/* Blob 3 - Accent */}
            <motion.div
                className="absolute bottom-[-10%] left-[20%] w-[60vw] h-[60vw] min-w-[500px] min-h-[500px] rounded-full bg-[var(--blob-3)] blur-[120px] opacity-20 mix-blend-screen"
                animate={{
                    scale: [1, 1.2, 1],
                }}
                transition={{
                    duration: 30,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut"
                }}
            />
        </div>
    );
}
