"use client";

import Marquee from "@/components/ui/marquee";
import { Badge } from "@/components/ui/badge";
import { SITE_DATA } from "@/lib/data";
import { motion } from "framer-motion";
import { useMotion } from "@/components/providers/motion-provider";
import { fadeIn } from "@/lib/motion";

export function Skills() {
    const { shouldReduceMotion } = useMotion();

    // If reduced motion, just show a flex wrap list instead of marquee? 
    // Or just a static marquee. The Marquee component itself handles reduced motion (CSS-based) mostly, 
    // but let's wrap the section entrance.

    return (
        <motion.section
            className="py-12 border-y border-white/5 bg-white/5 backdrop-blur-sm"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
        >
            <div className="container px-4 mb-8 text-center md:text-left">
                <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">Tech Stack & Tools</h2>
            </div>

            <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
                <Marquee pauseOnHover className="[--duration:40s]">
                    {SITE_DATA.skills.map((skill) => (
                        <div key={skill} className="px-4">
                            <Badge variant="outline" className="text-lg py-2 px-6 border-white/10 bg-black/20 backdrop-blur-md">
                                {skill}
                            </Badge>
                        </div>
                    ))}
                </Marquee>

                <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-background to-transparent"></div>
                <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-background to-transparent"></div>
            </div>
        </motion.section>
    );
}
