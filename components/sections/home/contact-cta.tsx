"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function ContactCTA() {
    return (
        <section className="py-24 relative overflow-hidden">
            {/* Glow effect behind */}
            <div className="absolute inset-0 flex items-center justify-center -z-10">
                <div className="w-[500px] h-[500px] bg-[var(--blob-3)]/20 blur-[120px] rounded-full" />
            </div>

            <div className="container px-4 text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="max-w-3xl mx-auto space-y-8"
                >
                    <h2 className="text-4xl md:text-6xl font-bold tracking-tighter">
                        Ready to build something <span className="text-[var(--blob-1)] text-glow">amazing</span>?
                    </h2>
                    <p className="text-xl text-muted-foreground">
                        I'm currently available for freelance projects and open to full-time opportunities.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Button size="lg" variant="neon" className="px-8 text-lg h-14" asChild>
                            <Link href="/contact">
                                Let&apos;s Talk <ArrowRight className="ml-2" />
                            </Link>
                        </Button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
