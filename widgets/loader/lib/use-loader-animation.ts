"use client";

import { animate, useMotionValue, useTransform } from "framer-motion";
import { useEffect } from "react";
import { FILL_TRANSITION, LOADER_DIMENSIONS } from "../config/constants";

const MAX_WIDTH = LOADER_DIMENSIONS.width;

export function useLoaderAnimation() {
    const progress = useMotionValue(0);

    const width = useTransform(progress, (p) => {
        if (p <= 0.5) return p * 2 * MAX_WIDTH;
        if (p >= 0.97) return 0;
        return ((0.97 - p) / 0.47) * MAX_WIDTH;
    });

    const x = useTransform(progress, (p) => {
        if (p <= 0.5) return 0;
        if (p >= 0.98) return (1 - (p - 0.98) / 0.02) * MAX_WIDTH;
        return ((p - 0.5) / 0.47) * MAX_WIDTH;
    });

    const translateX = useTransform(x, (v) => -v);

    useEffect(() => {
        const control = animate(progress, 1, {
            duration: FILL_TRANSITION.duration,
            repeat: Infinity,
            ease: FILL_TRANSITION.ease,
            from: 0,
        });
        return () => control.stop();
    }, [progress]);

    return { width, x, translateX };
}
