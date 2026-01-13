"use client";

import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { MouseEvent } from "react";
import { cn } from "@/lib/utils";
import { useMotion } from "@/components/providers/motion-provider";

interface ServiceCardProps {
    title: string;
    description: string;
    icon: React.ReactNode;
    index: number;
}

export function ServiceCard({ title, description, icon, index }: ServiceCardProps) {
    const { shouldReduceMotion } = useMotion();
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const background = useMotionTemplate`
        radial-gradient(
            650px circle at ${mouseX}px ${mouseY}px,
            var(--blob-1),
            transparent 80%
        )
    `;

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        const { left, top } = e.currentTarget.getBoundingClientRect();
        mouseX.set(e.clientX - left);
        mouseY.set(e.clientY - top);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            onMouseMove={shouldReduceMotion ? undefined : handleMouseMove}
            className="group relative h-full"
        >
            {/* Animated Glow Border */}
            {!shouldReduceMotion && (
                <motion.div
                    className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
                    style={{ background }}
                />
            )}

            <Card className="relative h-full overflow-hidden border-white/10 bg-black/40 backdrop-blur-sm transition-colors hover:bg-black/60">
                {/* Gradient Sweep Overlay */}
                {!shouldReduceMotion && (
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                )}

                <CardHeader>
                    <div className="mb-4 w-12 h-12 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[var(--blob-1)] shadow-[0_0_15px_-3px_var(--blob-1)] transition-transform group-hover:scale-110 duration-500">
                        {icon}
                    </div>
                    <CardTitle className="text-xl group-hover:text-[var(--blob-1)] transition-colors">{title}</CardTitle>
                </CardHeader>
                <CardContent>
                    <CardDescription className="text-base leading-relaxed">
                        {description}
                    </CardDescription>

                    {/* Expandable Details on Hover (Simulated with height/opacity) */}
                    <div className="h-0 overflow-hidden opacity-0 transition-all duration-300 group-hover:h-auto group-hover:opacity-100 group-hover:mt-4">
                        <ul className="text-sm list-disc pl-4 text-muted-foreground/80 space-y-1">
                            <li>Strategy & Planning</li>
                            <li>Design & Prototyping</li>
                            <li>Implementation</li>
                        </ul>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
}
