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
    icon,
}: Pick<ParallelItemProps, "widthSquares" | "variant" | "icon"> & {
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
                "shrink-0 origin-left relative flex items-center justify-center",
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
        >
            {icon && (
                <span className="absolute inset-0 flex items-center justify-center lg:hidden pointer-events-none">
                    <span
                        className={cn(
                            "flex items-center justify-center rounded-full bg-white shrink-0 w-[25px] h-[25px] [&_svg]:w-4 [&_svg]:h-4 [&_svg]:shrink-0 border",
                            // Меняем только цвет у элементов, у которых уже есть fill или stroke (не добавляем заливку/обводку там, где их не было)
                            variant === "default" &&
                                "border-[#6eafff] text-[#6eafff] [&_*[fill]:not([fill='none'])]:fill-current [&_*[stroke]:not([stroke='none'])]:stroke-current",
                            variant === "dark" &&
                                "border-gray text-gray [&_*[fill]:not([fill='none'])]:fill-current [&_*[stroke]:not([stroke='none'])]:stroke-current",
                        )}
                    >
                        {icon}
                    </span>
                </span>
            )}
        </motion.div>
    );
};
