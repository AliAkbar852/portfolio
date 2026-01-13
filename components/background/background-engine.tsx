"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { useTheme } from "next-themes";
import { useMotion } from "@/components/providers/motion-provider";
import { cn } from "@/lib/utils";

export function BackgroundEngine() {
    const { theme } = useTheme();
    const { quality, shouldReduceMotion, isPaused } = useMotion();
    const [mounted, setMounted] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // Parallax Inputs
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth Parallax Outputs
    const springConfig = { damping: 50, stiffness: 200 };
    const moveX = useSpring(mouseX, springConfig);
    const moveY = useSpring(mouseY, springConfig);

    // Visibility Logic for Auto-Pause
    useEffect(() => {
        setMounted(true);

        const handleMouseMove = (e: MouseEvent) => {
            if (shouldReduceMotion || isPaused || quality === "low") return;
            // Normalize mouse position -1 to 1
            const x = (e.clientX / window.innerWidth) * 2 - 1;
            const y = (e.clientY / window.innerHeight) * 2 - 1;
            mouseX.set(x * 20); // Scale factor for movement
            mouseY.set(y * 20);
        };

        const handleVisibilityChange = () => {
            // Note: Actual animation pause is handled by Framer Motion automatically when tab is hidden usually, 
            // but we can enforce logic here if we were using rAF manually.
        };

        window.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("visibilitychange", handleVisibilityChange);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("visibilitychange", handleVisibilityChange);
        };
    }, [shouldReduceMotion, isPaused, quality, mouseX, mouseY]);

    // Blob Definitions
    const blobs = [
        { id: 1, color: "var(--blob-1)", width: "40vw", height: "40vw", initialX: "10%", initialY: "10%", duration: 25 },
        { id: 2, color: "var(--blob-2)", width: "35vw", height: "35vw", initialX: "60%", initialY: "20%", duration: 30 },
        { id: 3, color: "var(--blob-3)", width: "45vw", height: "45vw", initialX: "30%", initialY: "60%", duration: 28 },
    ];

    if (!mounted) return null;

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-0 overflow-hidden bg-background pointer-events-none"
        >
            {/* Noise Overlay */}
            <div className="absolute inset-0 opacity-[0.03] z-[1] contrast-150 brightness-100 noise-bg" />

            {/* Blobs Layer */}
            <div className={cn(
                "absolute inset-0 z-[0] filter blur-[60px] opacity-60 transition-opacity duration-1000",
                (isPaused || quality === "low") && "opacity-30" // Dim when paused/low quality
            )}>
                {blobs.map((blob, i) => (
                    <motion.div
                        key={blob.id}
                        className="absolute rounded-full mix-blend-screen opacity-70"
                        style={{
                            backgroundColor: blob.color,
                            width: blob.width,
                            height: blob.height,
                            left: blob.initialX,
                            top: blob.initialY,
                            x: moveX, // Parallax X
                            y: moveY, // Parallax Y
                        }}
                        animate={
                            // Only animate if NOT reduced motion, NOT paused, and NOT low quality
                            (!shouldReduceMotion && !isPaused && quality !== "low") ? {
                                x: [0, 50, -30, 0], // Subtle wander
                                y: [0, -40, 30, 0],
                                scale: [1, 1.1, 0.9, 1],
                            } : undefined
                        }
                        transition={{
                            duration: blob.duration,
                            repeat: Infinity,
                            repeatType: "reverse",
                            ease: "easeInOut",
                        }}
                    />
                ))}
            </div>

            {/* Scrim for readability */}
            <div className="absolute inset-0 z-[2] bg-gradient-to-b from-transparent via-background/20 to-background/80" />
        </div>
    );
}
