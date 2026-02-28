"use client";

import { cn } from "@/shared/utils";
import { MainText } from "@/shared/ui";
import { motion } from "framer-motion";
import { ParallelItemProps } from "../types/parallel-item.props";
import { PARALLEL_FLOW_ANIMATION } from "../config/parallel-flow.config";

const BAR_ROUNDED = 4;
const DARK_BAR_COLOR = "#242426";

export const ParallelItemLabel = ({ title, icon }: ParallelItemProps) => (
    <div className="flex items-center gap-3 min-h-[32px]">
        <div className="w-9 h-9 border border-gray rounded-full flex items-center justify-center shrink-0">
            {icon}
        </div>
        <MainText variant="2" className="line-clamp-2">
            {title}
        </MainText>
    </div>
);

const SQUARE_PX = 32;

const barTransition = {
    duration: PARALLEL_FLOW_ANIMATION.lineDraw.duration,
    ease: PARALLEL_FLOW_ANIMATION.lineDraw.ease,
};

export const ParallelItemBar = ({
    widthSquares,
    variant = "default",
    animationDelay,
    isInView = true,
}: Pick<ParallelItemProps, "widthSquares" | "variant"> & {
    animationDelay?: number;
    isInView?: boolean;
}) => {
    const delay =
        animationDelay !== undefined
            ? PARALLEL_FLOW_ANIMATION.barDelay +
              animationDelay * PARALLEL_FLOW_ANIMATION.barStagger
            : 0;

    return (
        <motion.div
            className={cn(
                "shrink-0 origin-left",
                variant === "default" && "bg-blue",
            )}
            style={{
                height: SQUARE_PX,
                width: widthSquares * SQUARE_PX,
                borderRadius: BAR_ROUNDED,
                ...(variant === "dark" && { backgroundColor: DARK_BAR_COLOR }),
            }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: isInView ? 1 : 0 }}
            transition={{ ...barTransition, delay }}
        />
    );
};
