"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { LayoutRouterContext } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useContext, useRef } from "react";
import { pageTransition } from "@/lib/motion";
import { useMotion } from "@/components/providers/motion-provider";

// This is a special wrapper to fix AnimatePresence with Next.js App Router
// Reference: https://github.com/vercel/next.js/issues/49279#issuecomment-1616709849 (Concept)
// Simplified approach: Just wrapping children with key

export function PageTransition({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const { shouldReduceMotion } = useMotion();

    // If we want true exit animations, we need to freeze the router context, 
    // but for now, let's just do a simple enter animation which is much safer and easier to maintain.
    // Exit animations in App Router are still experimental/tricky.

    return (
        <motion.div
            key={pathname}
            variants={shouldReduceMotion ? {
                initial: { opacity: 1 },
                animate: { opacity: 1 },
                exit: { opacity: 1 }
            } : pageTransition}
            initial="initial"
            animate="animate"
            exit="exit"
            className="flex-grow w-full"
        >
            {children}
        </motion.div>
    );
}
