"use client";

import type { MotionValue } from "framer-motion";
import { motion } from "framer-motion";
import { LOADER_COLORS, LOADER_DIMENSIONS } from "../config/constants";

type LoaderProgressBarProps = {
    width: MotionValue<number>;
    x: MotionValue<number>;
};

export function LoaderProgressBar({ width, x }: LoaderProgressBarProps) {
    const { width: w, barHeight } = LOADER_DIMENSIONS;

    return (
        <div
            className="overflow-hidden shrink-0 relative"
            style={{
                width: w,
                height: barHeight,
                backgroundColor: LOADER_COLORS.base,
            }}
        >
            <motion.div
                className="absolute top-0 left-0 will-change-[transform,width]"
                style={{
                    width,
                    x,
                    height: barHeight,
                    backgroundColor: LOADER_COLORS.fill,
                }}
            />
        </div>
    );
}
