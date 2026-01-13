"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMotion } from "@/components/providers/motion-provider";

interface LightboxProps {
    images: string[];
    isOpen: boolean;
    onClose: () => void;
    initialIndex?: number;
}

export function Lightbox({ images, isOpen, onClose, initialIndex = 0 }: LightboxProps) {
    const [index, setIndex] = useState(initialIndex);
    const { shouldReduceMotion } = useMotion();

    useEffect(() => {
        if (isOpen) setIndex(initialIndex);
    }, [isOpen, initialIndex]);

    const handleNext = useCallback(() => {
        setIndex((prev) => (prev + 1) % images.length);
    }, [images.length]);

    const handlePrev = useCallback(() => {
        setIndex((prev) => (prev - 1 + images.length) % images.length);
    }, [images.length]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!isOpen) return;
            if (e.key === "Escape") onClose();
            if (e.key === "ArrowRight") handleNext();
            if (e.key === "ArrowLeft") handlePrev();
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, onClose, handleNext, handlePrev]);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="fixed inset-0 z-[60] bg-black/90 backdrop-blur-xl flex items-center justify-center p-4"
                >
                    <Button variant="ghost" size="icon" className="absolute top-4 right-4 z-50 rounded-full bg-black/50 hover:bg-white/20" onClick={onClose}>
                        <X className="h-6 w-6" />
                    </Button>

                    <Button variant="ghost" size="icon" className="absolute left-4 top-1/2 -translate-y-1/2 z-50 rounded-full bg-black/50 hover:bg-white/20 hidden md:flex" onClick={handlePrev}>
                        <ChevronLeft className="h-8 w-8" />
                    </Button>

                    <Button variant="ghost" size="icon" className="absolute right-4 top-1/2 -translate-y-1/2 z-50 rounded-full bg-black/50 hover:bg-white/20 hidden md:flex" onClick={handleNext}>
                        <ChevronRight className="h-8 w-8" />
                    </Button>

                    <motion.div
                        key={index}
                        initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 1.1 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="relative max-w-5xl w-full aspect-video bg-black rounded-lg overflow-hidden border border-white/10 shadow-2xl flex items-center justify-center"
                    >
                        {/* Image Placeholder */}
                        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black animate-pulse flex items-center justify-center text-muted-foreground">
                            Image {index + 1} / {images.length}
                            <br />
                            {images[index]}
                        </div>
                    </motion.div>

                    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2">
                        {images.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setIndex(i)}
                                className={`w-2 h-2 rounded-full transition-all ${i === index ? "bg-white w-4" : "bg-white/30 hover:bg-white/50"}`}
                            />
                        ))}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
