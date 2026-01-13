"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ProjectCard } from "@/components/ui/project-card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SITE_DATA } from "@/lib/data";
import { Search, X } from "lucide-react";

export function ProjectList() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedTag, setSelectedTag] = useState<string | null>(null);

    // Extract all unique tags
    const allTags = Array.from(
        new Set(SITE_DATA.projects.flatMap((p) => p.tags))
    ).sort();

    const filteredProjects = SITE_DATA.projects.filter((project) => {
        const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            project.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesTag = selectedTag ? project.tags.includes(selectedTag) : true;
        return matchesSearch && matchesTag;
    });

    return (
        <div className="space-y-8">
            {/* Filters & Search */}
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between bg-white/5 p-6 rounded-xl border border-white/10 backdrop-blur-sm">
                <div className="relative w-full md:w-[300px]">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search projects..."
                        className="pl-9 bg-black/20 border-white/10 focus-visible:ring-[var(--blob-1)]"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="flex flex-wrap gap-2">
                    <Button
                        variant={selectedTag === null ? "neon" : "outline"}
                        size="sm"
                        onClick={() => setSelectedTag(null)}
                        className="text-xs"
                    >
                        All
                    </Button>
                    {allTags.map(tag => (
                        <Button
                            key={tag}
                            variant={selectedTag === tag ? "neon" : "outline"}
                            size="sm"
                            onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
                            className="text-xs"
                        >
                            {tag}
                        </Button>
                    ))}
                </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <AnimatePresence mode="popLayout">
                    {filteredProjects.map((project) => (
                        <motion.div
                            key={project.id}
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.3 }}
                        >
                            <ProjectCard project={project} />
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {filteredProjects.length === 0 && (
                <div className="text-center py-20">
                    <p className="text-muted-foreground text-lg">No projects found matching your criteria.</p>
                    <Button variant="link" onClick={() => { setSearchTerm(""); setSelectedTag(null); }}>
                        Clear filters
                    </Button>
                </div>
            )}
        </div>
    );
}
