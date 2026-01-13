"use client";

import { SITE_DATA } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ExternalLink, Github, ZoomIn } from "lucide-react";
import Link from "next/link";
import { notFound, usePathname } from "next/navigation";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Timeline } from "@/components/projects/timeline";
import { Lightbox } from "@/components/ui/lightbox";
import { ProjectCard } from "@/components/ui/project-card";
import { sectionReveal, fadeIn, staggerContainer } from "@/lib/motion";
import { useMotion } from "@/components/providers/motion-provider";

interface ProjectPageProps {
    params: {
        id: string;
    };
}

// Since we are now using client component features (hooks), we need to handle params carefully if it was server component.
// But we made the page "use client" so we can't use generateStaticParams *inside* here if it's the only file.
// Usually in App Router page.tsx is server. Let's make a wrapper logic or keep it simple.
// For now, let's assume valid ID is passed or handle client-side lookup. 
// Note: In Next 13/14, dynamic routes receive params as prop. 
// To keep static generation for standard pages, we might need to separate the client logic. 
// But "use client" at top makes the whole page client-rendered (after initial hydration).

export default function ProjectPage({ params }: ProjectPageProps) {
    const project = SITE_DATA.projects.find((p) => p.id === params.id);
    const [activeSection, setActiveSection] = useState("overview");
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [activeImageIndex, setActiveImageIndex] = useState(0);
    const { shouldReduceMotion } = useMotion();

    // Scroll spy logic
    useEffect(() => {
        const handleScroll = () => {
            const sections = ["overview", "challenge", "process", "solution", "results"];
            for (const section of sections) {
                const el = document.getElementById(section);
                if (el) {
                    const rect = el.getBoundingClientRect();
                    if (rect.top >= 0 && rect.top <= window.innerHeight / 2) {
                        setActiveSection(section);
                    }
                }
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    if (!project) {
        return <div className="min-h-screen flex items-center justify-center">Project Not Found</div>;
    }

    // Related projects logic
    const relatedProjects = SITE_DATA.projects
        .filter(p => p.id !== project.id && p.tags.some(t => project.tags.includes(t)))
        .slice(0, 2);

    // Mock images for gallery
    const galleryImages = [
        "Image 1", "Image 2", "Image 3", "Image 4"
    ];

    return (
        <article className="min-h-screen pb-20 relative">
            <Timeline activeSection={activeSection} />

            {/* Hero Section with Shared Element */}
            <motion.div
                className="relative h-[60vh] w-full overflow-hidden flex items-center justify-center bg-black/40"
                layoutId={`project-image-${project.id}`} // Shared layout ID
            >
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-background z-10" />

                {/* Background placeholder */}
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--blob-1)]/30 to-[var(--blob-2)]/30" />

                <div className="text-center z-20 px-4 mt-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="mb-6"
                    >
                        {project.featured && <Badge variant="neon" className="bg-black/50 backdrop-blur-md">Featured Case Study</Badge>}
                    </motion.div>
                    <motion.h1
                        className="text-4xl md:text-7xl font-bold mb-6 tracking-tighter"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        {project.title}
                    </motion.h1>
                    <motion.p
                        className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                    >
                        {project.description}
                    </motion.p>
                </div>
            </motion.div>

            <div className="container px-4 -mt-20 relative z-30">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Sidebar */}
                    <div className="lg:col-span-4 space-y-8 order-2 lg:order-1">
                        <div className="sticky top-24 space-y-8">
                            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 space-y-6">
                                <div>
                                    <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Tech Stack</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {project.tags.map(tag => (
                                            <Badge key={tag} variant="secondary" className="bg-white/10">{tag}</Badge>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex flex-col gap-3">
                                    <Button className="w-full" variant="neon" size="lg">
                                        <ExternalLink className="mr-2 h-4 w-4" /> Live Demo
                                    </Button>
                                    <Button className="w-full" variant="outline" size="lg">
                                        <Github className="mr-2 h-4 w-4" /> View Code
                                    </Button>
                                </div>
                            </div>

                            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6">
                                <Link href="/projects" className="inline-flex items-center text-muted-foreground hover:text-white transition-colors">
                                    <ArrowLeft className="mr-2 h-4 w-4" /> Back to Projects
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-8 space-y-24 order-1 lg:order-2 pb-24">
                        <section id="overview" className="prose prose-invert prose-lg max-w-none">
                            <h2 className="text-3xl font-bold text-white mb-6">Overview</h2>
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                {project.caseStudy}
                            </p>
                        </section>

                        {/* Gallery Grid */}
                        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {galleryImages.map((img, i) => (
                                <motion.div
                                    key={i}
                                    whileHover={{ scale: 1.02 }}
                                    className="aspect-video bg-white/5 rounded-xl border border-white/10 overflow-hidden relative group cursor-pointer"
                                    onClick={() => { setActiveImageIndex(i); setLightboxOpen(true); }}
                                >
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-4">
                                        <span className="text-sm font-medium">{img}</span>
                                        <ZoomIn className="h-5 w-5" />
                                    </div>
                                    <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/30">
                                        Placeholder Image {i + 1}
                                    </div>
                                </motion.div>
                            ))}
                        </section>

                        <section id="challenge" className="prose prose-invert prose-lg max-w-none">
                            <h2 className="text-3xl font-bold text-white mb-6">The Challenge</h2>
                            <p>
                                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.
                            </p>
                        </section>

                        <section id="process" className="prose prose-invert prose-lg max-w-none">
                            <h2 className="text-3xl font-bold text-white mb-6">Process</h2>
                            <p>
                                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.
                            </p>
                        </section>

                        <section id="solution" className="prose prose-invert prose-lg max-w-none">
                            <h2 className="text-3xl font-bold text-white mb-6">The Solution</h2>
                            <p>
                                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                            </p>
                        </section>

                        <section id="results" className="prose prose-invert prose-lg max-w-none">
                            <h2 className="text-3xl font-bold text-white mb-6">Results</h2>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 not-prose">
                                {[
                                    { label: "Performance", value: "98/100" },
                                    { label: "Conversion", value: "+45%" },
                                    { label: "Users", value: "10k+" }
                                ].map((stat, i) => (
                                    <div key={i} className="bg-white/5 p-6 rounded-xl border border-white/10 text-center">
                                        <div className="text-3xl font-bold text-[var(--blob-1)] mb-2">{stat.value}</div>
                                        <div className="text-sm text-muted-foreground uppercase tracking-wider">{stat.label}</div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>
                </div>

                {/* Related Projects */}
                {relatedProjects.length > 0 && (
                    <div className="mt-32 pt-16 border-t border-white/10">
                        <h2 className="text-3xl font-bold mb-12">Related Projects</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {relatedProjects.map(p => (
                                <ProjectCard key={p.id} project={p} />
                            ))}
                        </div>
                    </div>
                )}
            </div>

            <Lightbox
                isOpen={lightboxOpen}
                onClose={() => setLightboxOpen(false)}
                images={galleryImages}
                initialIndex={activeImageIndex}
            />
        </article>
    );
}
