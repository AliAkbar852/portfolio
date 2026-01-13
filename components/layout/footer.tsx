"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Github, Twitter, Linkedin, Mail, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

const socialLinks = [
    { name: "Github", icon: Github, href: "https://github.com" },
    { name: "Twitter", icon: Twitter, href: "https://twitter.com" },
    { name: "LinkedIn", icon: Linkedin, href: "https://linkedin.com" },
    { name: "Mail", icon: Mail, href: "mailto:hello@example.com" },
];

export function Footer() {
    return (
        <footer className="border-t border-white/10 bg-black/20 backdrop-blur-sm relative z-10">
            <div className="container px-4 py-12 md:py-16">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    <div className="md:col-span-2 flex flex-col items-center md:items-start gap-2">
                        <h3 className="text-xl font-bold tracking-tighter">ALI<span className="text-primary">.DEV</span></h3>
                        <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} Ali Akbar. All rights reserved.</p>
                        <p className="text-muted-foreground max-w-sm mt-4 mb-6 text-center md:text-left">
                            Building digital experiences that blend creativity with performance. Available for freelance opportunities.
                        </p>
                        <div className="flex gap-4">
                            {socialLinks.map((social) => (
                                <motion.a
                                    key={social.name}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ y: -3, color: "var(--blob-1)" }}
                                    className="p-2 rounded-full bg-white/5 border border-white/10 hover:border-[var(--blob-1)] transition-colors"
                                >
                                    <social.icon className="h-5 w-5" />
                                </motion.a>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-6">Sitemap</h4>
                        <ul className="space-y-3">
                            {["Home", "Projects", "Services", "About", "Contact"].map((item) => (
                                <li key={item}>
                                    <Link
                                        href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                                        className="text-muted-foreground hover:text-white transition-colors hover:translate-x-1 inline-block"
                                    >
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-6">Legal</h4>
                        <ul className="space-y-3">
                            <li><Link href="#" className="text-muted-foreground hover:text-white transition-colors">Privacy Policy</Link></li>
                            <li><Link href="#" className="text-muted-foreground hover:text-white transition-colors">Terms of Service</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
                    <p>&copy; {new Date().getFullYear()} Ali Akbar. All rights reserved.</p>
                    <p className="flex items-center">
                        Made with <Heart className="h-4 w-4 text-red-500 mx-1 animate-pulse" /> using Next.js & Motion
                    </p>
                </div>
            </div>
        </footer>
    );
}
