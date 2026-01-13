"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue } from "framer-motion";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { SITE_DATA } from "@/lib/data";
import { Quote, ChevronLeft, ChevronRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useMotion } from "@/components/providers/motion-provider";

export function Testimonials() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const { shouldReduceMotion } = useMotion();

    // Auto-play logic
    useEffect(() => {
        if (isPaused || shouldReduceMotion) return;
        timeoutRef.current = setTimeout(() => {
            handleNext();
        }, 5000); // 5 seconds

        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, [currentIndex, isPaused, shouldReduceMotion]);

    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % SITE_DATA.testimonials.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev - 1 + SITE_DATA.testimonials.length) % SITE_DATA.testimonials.length);
    };

    const currentTestimonial = SITE_DATA.testimonials[currentIndex];

    // Swipe logic
    const dragX = useMotionValue(0);
    const onDragEnd = () => {
        const x = dragX.get();
        if (x <= -50) handleNext();
        if (x >= 50) handlePrev();
        dragX.set(0);
    };

    return (
        <section className="py-24 relative overflow-hidden border-t border-white/5">
            <div className="container px-4 text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-bold mb-4">Client Feedback</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                    What people are saying about working with me.
                </p>
            </div>

            <div
                className="max-w-4xl mx-auto px-4 relative"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
            >
                <div className="relative overflow-hidden min-h-[300px] flex items-center justify-center">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentIndex}
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                            transition={{ duration: 0.4, ease: "circOut" }}
                            drag="x"
                            dragConstraints={{ left: 0, right: 0 }}
                            dragElastic={0.2}
                            onDragEnd={onDragEnd}
                            style={{ x: dragX }}
                            className="w-full cursor-grab active:cursor-grabbing"
                        >
                            <Card className="bg-white/5 border-white/10 backdrop-blur-md p-8 md:p-12 text-center relative">
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-background border border-[var(--blob-1)] flex items-center justify-center text-[var(--blob-1)] shadow-[0_0_20px_-5px_var(--blob-1)] z-10">
                                    <Quote className="h-8 w-8 fill-current" />
                                </div>

                                <CardContent className="pt-8 pb-6">
                                    <p className="text-xl md:text-2xl italic leading-relaxed text-balance">
                                        &ldquo;{currentTestimonial.text}&rdquo;
                                    </p>
                                </CardContent>

                                <CardHeader className="p-0">
                                    <h4 className="font-bold text-lg text-white">{currentTestimonial.name}</h4>
                                    <p className="text-sm text-[var(--blob-1)] font-medium mb-2">{currentTestimonial.role}</p>
                                    <div className="flex justify-center gap-1">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <Star key={star} className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                                        ))}
                                    </div>
                                </CardHeader>
                            </Card>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Controls */}
                <div className="flex items-center justify-center gap-8 mt-8">
                    <Button variant="ghost" size="icon" onClick={handlePrev} className="rounded-full hover:bg-white/10">
                        <ChevronLeft className="h-6 w-6" />
                    </Button>

                    <div className="flex gap-2">
                        {SITE_DATA.testimonials.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setCurrentIndex(i)}
                                className={cn(
                                    "h-2 rounded-full transition-all duration-300",
                                    i === currentIndex ? "w-8 bg-[var(--blob-1)]" : "w-2 bg-white/20 hover:bg-white/40"
                                )}
                            />
                        ))}
                    </div>

                    <Button variant="ghost" size="icon" onClick={handleNext} className="rounded-full hover:bg-white/10">
                        <ChevronRight className="h-6 w-6" />
                    </Button>
                </div>
            </div>
        </section>
    );
}
