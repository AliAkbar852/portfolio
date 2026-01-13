import { Variants } from "framer-motion";

export const MotionConfig = {
    durations: {
        fast: 0.3,
        medium: 0.5,
        slow: 0.8,
        sluggish: 1.5,
    },
    easings: {
        default: [0.25, 0.1, 0.25, 1] as const, // easeInOut
        bounce: [0.175, 0.885, 0.32, 1.275] as const, // easeOutBack
        smooth: [0.4, 0, 0.2, 1] as const, // material standard
    },
    springs: {
        bounce: { type: "spring", stiffness: 300, damping: 10 },
        soft: { type: "spring", stiffness: 100, damping: 20 },
        stiff: { type: "spring", stiffness: 500, damping: 30 },
    },
    stagger: {
        fast: 0.05,
        medium: 0.1,
        slow: 0.2,
    },
};

// --- Standardized Variant Generators ---

// Opacity Fades
export const fadeIn: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { duration: MotionConfig.durations.medium, ease: MotionConfig.easings.default }
    },
};

// Section Reveal (Fade + Slide Up)
export const sectionReveal: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: MotionConfig.durations.medium, ease: MotionConfig.easings.smooth }
    },
};

// Text Reveal (Staggered Children)
export const staggerContainer: Variants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: MotionConfig.stagger.medium,
        },
    },
};

export const wordReveal: Variants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: MotionConfig.durations.fast, ease: MotionConfig.easings.default }
    },
};

// Interactive Elements
export const cardHover: Variants = {
    hover: {
        y: -8,
        scale: 1.02,
        transition: { type: "spring", stiffness: 400, damping: 20 }
    },
    tap: { scale: 0.98 }
};

export const buttonPress: Variants = {
    hover: { scale: 1.05, transition: { type: "spring", stiffness: 400, damping: 10 } },
    tap: { scale: 0.95 }
};

// Page Transitions
export const pageTransition: Variants = {
    initial: { opacity: 0, filter: "blur(10px)", scale: 0.98 },
    animate: {
        opacity: 1,
        filter: "blur(0px)",
        scale: 1,
        transition: { duration: MotionConfig.durations.medium, ease: MotionConfig.easings.smooth }
    },
    exit: {
        opacity: 0,
        filter: "blur(10px)",
        scale: 0.98,
        transition: { duration: MotionConfig.durations.fast, ease: MotionConfig.easings.default }
    },
};
