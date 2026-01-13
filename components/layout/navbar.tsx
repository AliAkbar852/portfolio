"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { Sun, Moon, Sparkles, Menu, X, Settings } from "lucide-react";
import { useMotion, MotionQuality } from "@/components/providers/motion-provider";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";

const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Projects", path: "/projects" },
    { name: "Services", path: "/services" },
    { name: "Contact", path: "/contact" },
];

export function Navbar() {
    const { scrollY } = useScroll();
    const [hidden, setHidden] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();
    const { theme, setTheme } = useTheme();
    const { quality, setQuality, isPaused, setPaused } = useMotion();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious() || 0;
        if (latest > previous && latest > 150) {
            setHidden(true);
        } else {
            setHidden(false);
        }

        if (latest > 50) {
            setScrolled(true);
        } else {
            setScrolled(false);
        }
    });

    return (
        <motion.header
            variants={{
                visible: { y: 0 },
                hidden: { y: "-100%" },
            }}
            animate={hidden ? "hidden" : "visible"}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className={cn(
                "fixed top-0 left-0 right-0 z-50 flex items-center justify-center pt-6 px-4 pointer-events-none transition-all duration-300",
                scrolled && "pt-0"
            )}
        >
            <nav
                className={cn(
                    "pointer-events-auto flex items-center justify-between px-6 py-3 rounded-full transition-all duration-300 backdrop-blur-md border border-white/10 shadow-lg",
                    scrolled
                        ? "w-full max-w-6xl bg-black/50 rounded-none border-t-0 border-x-0 border-b border-white/5"
                        : "w-full max-w-4xl bg-white/5"
                )}
            >
                <Link href="/" className="text-xl font-bold tracking-tighter hover:text-primary transition-colors">
                    ALI<span className="text-primary">.DEV</span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-1">
                    {navItems.map((item) => {
                        const isActive = pathname === item.path;
                        return (
                            <Link
                                key={item.path}
                                href={item.path}
                                className="relative px-4 py-2 text-sm font-medium transition-colors hover:text-white text-muted-foreground"
                            >
                                {isActive && (
                                    <motion.div
                                        layoutId="navbar-indicator"
                                        className="absolute inset-0 rounded-full bg-white/10"
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                                <span className={cn("relative z-10", isActive && "text-white")}>{item.name}</span>
                            </Link>
                        )
                    })}
                </div>

                <div className="flex items-center gap-2 pointer-events-auto">
                    {/* Settings Dropdown */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="rounded-full">
                                <Settings className="h-5 w-5" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56 bg-black/90 backdrop-blur-xl border-white/10 text-white">
                            <DropdownMenuLabel>Theme</DropdownMenuLabel>
                            <DropdownMenuRadioGroup value={theme} onValueChange={setTheme}>
                                <DropdownMenuRadioItem value="dark">Dark</DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value="neon">Neon</DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value="aurora">Aurora</DropdownMenuRadioItem>
                            </DropdownMenuRadioGroup>
                            <DropdownMenuSeparator className="bg-white/10" />
                            <DropdownMenuLabel>Motion Quality</DropdownMenuLabel>
                            <DropdownMenuRadioGroup value={quality} onValueChange={(v) => setQuality(v as MotionQuality)}>
                                <DropdownMenuRadioItem value="low">Low (Reduced)</DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value="standard">Standard</DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value="ultra">Ultra (Experimental)</DropdownMenuRadioItem>
                            </DropdownMenuRadioGroup>
                            <DropdownMenuSeparator className="bg-white/10" />
                            <DropdownMenuItem onSelect={(e) => { e.preventDefault(); setPaused(!isPaused); }}>
                                <span className="flex items-center w-full cursor-pointer">
                                    {isPaused ? "Resume Animation" : "Pause Animation"}
                                </span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <Button className="hidden md:inline-flex" variant="glow" asChild>
                        <Link href="/resume">Resume</Link>
                    </Button>

                    {/* Mobile Menu Toggle */}
                    <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                        {isMobileMenuOpen ? <X /> : <Menu />}
                    </Button>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-20 left-4 right-4 bg-background/95 backdrop-blur-xl border border-white/10 rounded-2xl p-4 flex flex-col gap-2 md:hidden pointer-events-auto shadow-2xl origin-top"
                    >
                        {navItems.map((item) => (
                            <Link
                                key={item.path}
                                href={item.path}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className={cn(
                                    "px-4 py-3 rounded-lg text-sm font-medium transition-colors hover:bg-white/5",
                                    pathname === item.path ? "bg-white/10 text-white" : "text-muted-foreground"
                                )}
                            >
                                {item.name}
                            </Link>
                        ))}
                        <Button className="w-full mt-2" variant="glow" asChild onClick={() => setIsMobileMenuOpen(false)}>
                            <Link href="/resume">Download Resume</Link>
                        </Button>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.header>
    );
}
