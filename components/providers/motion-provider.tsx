"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

export type MotionQuality = "low" | "standard" | "ultra";

interface MotionContextType {
    quality: MotionQuality;
    setQuality: (quality: MotionQuality) => void;
    shouldReduceMotion: boolean;
    isPaused: boolean;
    setPaused: (paused: boolean) => void;
}

const MotionContext = createContext<MotionContextType | undefined>(undefined);

export function MotionProvider({ children }: { children: React.ReactNode }) {
    const [quality, setQualityState] = useState<MotionQuality>("standard");
    const [isPaused, setIsPaused] = useState(false);
    const prefersReduced = useReducedMotion();

    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        const savedQuality = localStorage.getItem("motion-quality") as MotionQuality;
        const savedPaused = localStorage.getItem("motion-paused") === "true";

        if (savedQuality) setQualityState(savedQuality);
        if (savedPaused) setIsPaused(true);
    }, []);

    const setQuality = (q: MotionQuality) => {
        setQualityState(q);
        localStorage.setItem("motion-quality", q);
    };

    const setPaused = (paused: boolean) => {
        setIsPaused(paused);
        localStorage.setItem("motion-paused", String(paused));
    };

    // Prevent hydration mismatch by defaulting to false (server state) until mounted
    const shouldReduceMotion = isMounted ? (prefersReduced || quality === "low") : false;

    return (
        <MotionContext.Provider value={{ quality, setQuality, shouldReduceMotion, isPaused, setPaused }}>
            {children}
        </MotionContext.Provider>
    );
}

export function useMotion() {
    const context = useContext(MotionContext);
    if (context === undefined) {
        throw new Error("useMotion must be used within a MotionProvider");
    }
    return context;
}
