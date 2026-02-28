export const contentAnimationVariants = {
    enter: (direction: number) => ({
        opacity: 0,
        x: direction > 0 ? 24 : -24,
        filter: "blur(4px)",
    }),
    center: {
        opacity: 1,
        x: 0,
        filter: "blur(0px)",
        transition: {
            duration: 0.35,
            ease: [0.25, 0.46, 0.45, 0.94] as const,
        },
    },
    exit: (direction: number) => ({
        opacity: 0,
        x: direction > 0 ? -24 : 24,
        filter: "blur(4px)",
        transition: {
            duration: 0.25,
            ease: [0.25, 0.46, 0.45, 0.94] as const,
        },
    }),
};
