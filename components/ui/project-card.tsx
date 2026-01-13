"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cardHover } from "@/lib/motion";
import { useMotion } from "@/components/providers/motion-provider";

interface ProjectCardProps {
    project: any;
    priority?: boolean;
}

export function ProjectCard({ project, priority = false }: ProjectCardProps) {
    const { shouldReduceMotion } = useMotion();

    return (
        <motion.div
            variants={shouldReduceMotion ? {} : cardHover}
            whileHover="hover"
            whileTap="tap"
            className="h-full"
        >
            <Card className="h-full overflow-hidden border-white/10 bg-black/20 backdrop-blur-sm hover:border-[var(--blob-1)] transition-colors duration-300 flex flex-col group">
                <motion.div
                    className="relative aspect-video overflow-hidden"
                    layoutId={`project-image-${project.id}`}
                >
                    {/* Placeholder for real image or gradient fallback */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[var(--blob-1)]/20 to-[var(--blob-2)]/20 group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/50">
                        [Project Image Placeholder]
                    </div>
                </motion.div>

                <CardHeader>
                    <div className="flex justify-between items-start mb-2">
                        <CardTitle className="text-xl group-hover:text-[var(--blob-1)] transition-colors">{project.title}</CardTitle>
                        {project.featured && (
                            <Badge variant="neon" className="text-xs">Featured</Badge>
                        )}
                    </div>
                    <CardDescription>{project.description}</CardDescription>
                </CardHeader>

                <CardContent className="flex-grow">
                    <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag: string) => (
                            <Badge key={tag} variant="secondary" className="bg-white/5 hover:bg-white/10">{tag}</Badge>
                        ))}
                    </div>
                </CardContent>

                <CardFooter>
                    <Button variant="ghost" className="w-full justify-between group/btn" asChild>
                        <Link href={`/projects/${project.id}`}>
                            View Details
                            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                        </Link>
                    </Button>
                </CardFooter>
            </Card>
        </motion.div>
    );
}
