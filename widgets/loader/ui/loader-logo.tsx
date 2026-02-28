"use client";

import type { MotionValue } from "framer-motion";
import { motion } from "framer-motion";
import {
    LOGO_PATHS,
    LOADER_COLORS,
    LOADER_DIMENSIONS,
} from "../config/constants";

type LoaderLogoProps = {
    width: MotionValue<number>;
    x: MotionValue<number>;
    translateX: MotionValue<number>;
};

export function LoaderLogo({ width, x, translateX }: LoaderLogoProps) {
    const { width: w, height: h } = LOADER_DIMENSIONS;
    const viewBox = `0 0 ${w} ${h}`;

    return (
        <div
            className="mb-4 shrink-0 relative overflow-hidden"
            style={{ width: w, height: h }}
        >
            <svg
                width={w}
                height={h}
                viewBox={viewBox}
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute inset-0"
            >
                <g fill={LOADER_COLORS.base}>
                    {LOGO_PATHS.map((d, i) => (
                        <path key={`base-${i}`} d={d} />
                    ))}
                </g>
            </svg>
            <motion.div
                className="absolute top-0 left-0 overflow-hidden will-change-[transform,width]"
                style={{ height: h, width, x }}
            >
                <motion.svg
                    width={w}
                    height={h}
                    viewBox={viewBox}
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="block"
                    style={{ x: translateX }}
                >
                    <g fill={LOADER_COLORS.fill}>
                        {LOGO_PATHS.map((d, i) => (
                            <path key={`fill-${i}`} d={d} />
                        ))}
                    </g>
                </motion.svg>
            </motion.div>
        </div>
    );
}
