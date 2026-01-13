"use client";

import { motion } from "framer-motion";
import { ServiceCard } from "@/components/ui/service-card";
import { SITE_DATA } from "@/lib/data";
import { Code, Zap, Layout, Search, PenTool, Hammer, Rocket } from "lucide-react";
import { useMotion } from "@/components/providers/motion-provider";

const icons = {
    Code,
    Zap,
    Layout
};

const processSteps = [
    { title: "Discover", icon: Search, desc: "Understanding goals & requirements" },
    { title: "Design", icon: PenTool, desc: "Visualizing the user experience" },
    { title: "Build", icon: Hammer, desc: "Clean, performant development" },
    { title: "Launch", icon: Rocket, desc: "Deploying to the world" },
];

export function Services() {
    const { shouldReduceMotion } = useMotion();

    return (
        <section className="py-24 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-1/4 -left-64 w-96 h-96 bg-[var(--blob-1)]/20 rounded-full blur-[100px]" />
            <div className="absolute bottom-1/4 -right-64 w-96 h-96 bg-[var(--blob-2)]/20 rounded-full blur-[100px]" />

            <div className="container px-4 relative z-10">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl font-bold mb-4"
                    >
                        Services
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-muted-foreground max-w-2xl mx-auto"
                    >
                        Specialized in crafting modern web experiences that combine aesthetics with performance.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
                    {SITE_DATA.services.map((service, index) => {
                        const Icon = icons[service.icon as keyof typeof icons] || Code;
                        return (
                            <ServiceCard
                                key={service.title}
                                title={service.title}
                                description={service.description}
                                icon={<Icon className="h-6 w-6" />}
                                index={index}
                            />
                        )
                    })}
                </div>

                {/* Process Timeline */}
                <div className="relative">
                    <div className="text-center mb-12">
                        <h3 className="text-2xl font-bold">The Process</h3>
                    </div>

                    {/* Connecting Line (Desktop) */}
                    <div className="hidden md:block absolute top-[5.5rem] left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[var(--blob-1)] to-transparent opacity-30" />

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        {processSteps.map((step, i) => (
                            <motion.div
                                key={step.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.2 }}
                                className="relative flex flex-col items-center text-center"
                            >
                                <div className="w-16 h-16 rounded-full bg-black border border-[var(--blob-1)] z-10 flex items-center justify-center mb-4 shadow-[0_0_20px_-5px_var(--blob-1)]">
                                    <step.icon className="h-6 w-6 text-white" />
                                </div>
                                <h4 className="text-lg font-semibold mb-2">{step.title}</h4>
                                <p className="text-sm text-muted-foreground">{step.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
