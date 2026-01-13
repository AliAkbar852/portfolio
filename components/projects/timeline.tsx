"use client";

import { cn } from "@/lib/utils";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface TimelineProps {
    activeSection: string;
}

const steps = [
    { id: "overview", label: "Overview" },
    { id: "challenge", label: "Challenge" },
    { id: "process", label: "Process" },
    { id: "solution", label: "Solution" },
    { id: "results", label: "Results" },
];

export function Timeline({ activeSection }: TimelineProps) {
    return (
        <div className="fixed left-8 top-1/2 -translate-y-1/2 hidden xl:flex flex-col gap-8 z-40">
            <div className="absolute left-[7px] top-0 bottom-0 w-px bg-white/10" />

            {steps.map((step) => {
                const isActive = activeSection === step.id;
                return (
                    <motion.div
                        key={step.id}
                        className="relative flex items-center group cursor-pointer"
                        animate={{ opacity: isActive ? 1 : 0.4 }}
                        onClick={() => {
                            const el = document.getElementById(step.id);
                            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        }}
                    >
                        <motion.div
                            className={cn(
                                "w-4 h-4 rounded-full border-2 border-background z-10 transition-colors duration-300",
                                isActive ? "bg-[var(--blob-1)] border-[var(--blob-1)]" : "bg-white/20 border-white/20 group-hover:bg-white/40"
                            )}
                            layoutId={isActive ? "timeline-active" : undefined}
                        />
                        <span className={cn(
                            "ml-4 text-sm font-medium tracking-wider transition-all duration-300 origin-left",
                            isActive ? "text-[var(--blob-1)] scale-110" : "text-muted-foreground group-hover:text-white"
                        )}>
                            {step.label}
                        </span>
                    </motion.div>
                )
            })}
        </div>
    );
}
