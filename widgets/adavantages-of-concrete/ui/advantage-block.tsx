import { Headline, MainText } from "@/shared/ui";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { cn } from "@/shared/utils";
import { LINE_POSITION } from "../config/lines.config";
import { AdvantageBlockProps } from "../types/advantage-block.props";

const lineTransition = { duration: 1, ease: [0.22, 1, 0.36, 1] as const };

const blockVariants = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.06, delayChildren: 0.05 },
    },
};

const lineVariants = {
    hidden: ({ dir }: { dir: "x" | "y" }) =>
        dir === "x" ? { scaleX: 0 } : { scaleY: 0 },
    visible: ({ dir, delay }: { dir: "x" | "y"; delay: number }) =>
        dir === "x"
            ? { scaleX: 1, transition: { ...lineTransition, delay } }
            : { scaleY: 1, transition: { ...lineTransition, delay } },
};

const Line = ({
    position,
    direction,
    origin,
    isInView,
    delay = 0,
}: {
    position: string;
    direction: "x" | "y";
    origin: "left" | "top" | "right" | "bottom";
    isInView: boolean;
    delay?: number;
}) => (
    <div
        className={cn(position, "overflow-hidden bg-transparent!")}
        aria-hidden
    >
        <motion.div
            className="h-full w-full bg-black/30"
            style={{ transformOrigin: origin }}
            variants={lineVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            custom={{ dir: direction, delay: 0.05 + delay }}
        />
    </div>
);

export const AdvantageBlock = ({
    title,
    description,
    icon,
    children,
    leftBorder = false,
    rightBorder = false,
    topBorder = false,
    bottomBorder = false,
}: AdvantageBlockProps) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.2 });

    return (
        <motion.div
            ref={ref}
            className="relative aspect-square py-3.5 px-5.5"
            variants={blockVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
        >
            {leftBorder && (
                <Line
                    position={LINE_POSITION.left}
                    direction="y"
                    origin="top"
                    isInView={isInView}
                    delay={0}
                />
            )}
            {rightBorder && (
                <Line
                    position={LINE_POSITION.right}
                    direction="y"
                    origin="top"
                    isInView={isInView}
                    delay={0.06}
                />
            )}
            {topBorder && (
                <Line
                    position={LINE_POSITION.top}
                    direction="x"
                    origin="left"
                    isInView={isInView}
                    delay={0.12}
                />
            )}
            {bottomBorder && (
                <Line
                    position={LINE_POSITION.bottom}
                    direction="x"
                    origin="left"
                    isInView={isInView}
                    delay={0.18}
                />
            )}

            {icon && (
                <Image
                    src={icon}
                    alt={title}
                    width={100}
                    height={100}
                    draggable={false}
                    sizes="100px"
                    className="w-[100px] h-[100px] object-cover absolute top-6 right-6"
                    unoptimized
                />
            )}

            <div className="flex flex-col justify-between items-start h-full">
                <Headline
                    variant="5"
                    className="text-gray lg:text-[24px] text-[18px]"
                >
                    {title}
                </Headline>

                <div className="flex flex-col gap-5">
                    {children}

                    <MainText className="text-gray lg:text-[22px] mob:text-[16px] text-[14px]">
                        {description}
                    </MainText>
                </div>
            </div>
        </motion.div>
    );
};
