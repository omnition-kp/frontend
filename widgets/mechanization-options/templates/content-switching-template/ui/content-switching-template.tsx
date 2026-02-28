"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import type { ContentSwitchingTemplateProps, Pages } from "../types";
import { cn } from "@/shared/utils";
import { Title } from "@/shared/ui";
import { BUTTON_CLASSES } from "../config/button_classes";
import { contentAnimationVariants } from "../config/content-animation-variants";

export const ContentSwitchingTemplate = ({
    firstButtonName,
    secondButtonName,
    thirdButtonName,
    firstContent,
    secondContent,
    thirdContent,
}: ContentSwitchingTemplateProps) => {
    const [activeButton, setActiveButton] = useState<Pages>("1");
    const [direction, setDirection] = useState(0);

    const content = useMemo(() => {
        switch (activeButton) {
            case "1":
                return firstContent;
            case "2":
                return secondContent;
            case "3":
                return thirdContent;
        }
    }, [activeButton, firstContent, secondContent, thirdContent]);

    const isActiveButton = (button: Pages) => activeButton === button;

    const handleTabChange = (page: Pages) => {
        const prevIndex =
            activeButton === "1" ? 1 : activeButton === "2" ? 2 : 3;
        const nextIndex = page === "1" ? 1 : page === "2" ? 2 : 3;
        setDirection(nextIndex > prevIndex ? 1 : -1);
        setActiveButton(page);
    };

    return (
        <div>
            <div className="bg-[#EDEDED] p-1.5 grid grid-cols-3">
                <button
                    className={cn(
                        BUTTON_CLASSES.base,
                        isActiveButton("1") ? BUTTON_CLASSES.active : "",
                    )}
                    onClick={() => handleTabChange("1")}
                >
                    <Title title={firstButtonName} />
                </button>
                <button
                    className={cn(
                        BUTTON_CLASSES.base,
                        isActiveButton("2") ? BUTTON_CLASSES.active : "",
                        isActiveButton("1") ? "border-r border-black/30" : "",
                        isActiveButton("3") ? "border-l border-black/30" : "",
                    )}
                    onClick={() => handleTabChange("2")}
                >
                    <Title title={secondButtonName} />
                </button>
                <button
                    className={cn(
                        BUTTON_CLASSES.base,
                        isActiveButton("3") ? BUTTON_CLASSES.active : "",
                    )}
                    onClick={() => handleTabChange("3")}
                >
                    <Title title={thirdButtonName} />
                </button>
            </div>
            <div className="px-8 py-15.5 bg-gray overflow-hidden relative min-h-[200px]">
                <AnimatePresence mode="wait" initial={false} custom={direction}>
                    <motion.div
                        key={activeButton}
                        custom={direction}
                        variants={contentAnimationVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        className="w-full"
                    >
                        {content}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
};
