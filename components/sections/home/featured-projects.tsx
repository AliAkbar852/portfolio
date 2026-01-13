"use client";

import { SITE_DATA } from "@/lib/data";
import { ProjectCard } from "@/components/ui/project-card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useMotion } from "@/components/providers/motion-provider";
import { staggerContainer, sectionReveal, fadeIn } from "@/lib/motion";

export function FeaturedProjects() {
    const { shouldReduceMotion } = useMotion();
    const featuredProjects = SITE_DATA.projects.filter(p => p.featured).slice(0, 2);

    return (
        <section className="py-24 md:py-32 relative">
            <div className="container px-4">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={shouldReduceMotion ? fadeIn : staggerContainer}
                    className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6"
                >
                    <motion.div variants={shouldReduceMotion ? fadeIn : sectionReveal}>
                        <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-4">Featured Work</h2>
                        <p className="text-muted-foreground text-lg max-w-xl">
                            A selection of projects that showcase my passion for interaction design and engineering.
                        </p>
                    </motion.div>

                    <motion.div variants={shouldReduceMotion ? fadeIn : sectionReveal}>
                        <Button variant="link" className="text-lg gap-2" asChild>
                            <Link href="/projects">
                                See All Projects <ArrowRight className="h-4 w-4" />
                            </Link>
                        </Button>
                    </motion.div>
                </motion.div>

                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={shouldReduceMotion ? fadeIn : staggerContainer}
                >
                    {featuredProjects.map((project) => (
                        <motion.div key={project.id} variants={shouldReduceMotion ? fadeIn : sectionReveal}>
                            <ProjectCard project={project} priority />
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
