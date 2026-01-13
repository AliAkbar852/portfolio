"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Download, ArrowLeft, FileText } from "lucide-react";
import Link from "next/link";
import { BackgroundEngine } from "@/components/background/background-engine";

export default function ResumePage() {
    return (
        <div className="min-h-screen relative flex items-center justify-center p-4">
            {/* Background Reuse for consistency */}
            <BackgroundEngine />

            <div className="relative z-10 max-w-md w-full">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: "spring", duration: 0.8 }}
                    className="bg-black/40 backdrop-blur-xl border border-white/10 p-8 rounded-2xl text-center shadow-2xl"
                >
                    <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6 border border-white/10 shadow-[0_0_30px_-10px_var(--blob-1)]">
                        <FileText className="h-10 w-10 text-[var(--blob-1)]" />
                    </div>

                    <h1 className="text-3xl font-bold mb-2">Resume / CV</h1>
                    <p className="text-muted-foreground mb-8">
                        Ready to collaborate? Download my resume to see my full professional history.
                    </p>

                    <div className="flex flex-col gap-4">
                        <Button size="lg" variant="neon" className="w-full text-lg h-14" asChild>
                            {/* Assuming resume.pdf is in public folder. If not, this links to it conceptually. user needs to add it. */}
                            <a href="/resume.pdf" download="Ali_Akbar_Resume.pdf">
                                <Download className="mr-2 h-5 w-5" /> Download PDF
                            </a>
                        </Button>

                        <Button variant="ghost" className="w-full" asChild>
                            <Link href="/">
                                <ArrowLeft className="mr-2 h-4 w-4" /> Return Home
                            </Link>
                        </Button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
