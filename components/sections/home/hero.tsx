"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Download } from "lucide-react";
import Link from "next/link";
import { useMotion } from "@/components/providers/motion-provider";
import { staggerContainer, sectionReveal, wordReveal, fadeIn } from "@/lib/motion";

export function Hero() {
    const { shouldReduceMotion } = useMotion();

    // If reduced motion is preferred, use simplified variants
    const containerVariants = shouldReduceMotion ? fadeIn : staggerContainer;
    const itemVariants = shouldReduceMotion ? fadeIn : sectionReveal;

    return (
        <section className="min-h-[85vh] flex flex-col justify-center relative overflow-hidden pt-20">
            <motion.div
                className="container px-4 z-10"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <motion.div variants={itemVariants} className="mb-6">
                    <span className="inline-block py-1 px-3 rounded-full bg-white/10 border border-white/20 text-sm font-medium backdrop-blur-md text-primary animate-pulse">
                        Available for work
                    </span>
                </motion.div>

                <motion.h1
                    variants={itemVariants}
                    className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/50"
                >
                    Crafting Digital <br />
                    <span className="text-glow text-white">Experiences</span>
                </motion.h1>

                <motion.p
                    variants={itemVariants}
                    className="text-xl md:text-2xl text-muted-foreground max-w-2xl mb-10 leading-relaxed"
                >
                    I&apos;m a creative developer focused on building immersive, high-performance web applications that leave a lasting impression.
                </motion.p>

                <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
                    <Button size="lg" variant="neon" className="text-base h-12 px-8" asChild>
                        <Link href="/projects">
                            View Work <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>

                    <Button size="lg" variant="outline" className="text-base h-12 px-8 bg-transparent border-white/20 hover:bg-white/10" asChild>
                        <Link href="/resume">
                            <Download className="mr-2 h-4 w-4" /> Resume
                        </Link>
                    </Button>
                </motion.div>
            </motion.div>

            {/* Decorative Elements */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5, delay: 0.5 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent via-white/20 to-transparent"
            />
        </section>
    );
}
