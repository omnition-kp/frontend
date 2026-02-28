"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { ContentSwitchingTemplateProps } from "../types/content-switching-template.props";
import { Pages } from "../types/pages";
import { Title } from "@/shared/ui";
import { cn } from "@/shared/utils";
import { BUTTON_CLASSES } from "../config/button-classes";
import { contentAnimationVariants } from "../config/content-animation-variants";

export const ContentSwitchingTemplate = ({
    firstButtonName,
    secondButtonName,
    firstContent,
    secondContent,
}: ContentSwitchingTemplateProps) => {
    const [activeButton, setActiveButton] = useState<Pages>("1");
    const [direction, setDirection] = useState(0);

    const content = useMemo(() => {
        switch (activeButton) {
            case "1":
                return firstContent;
            case "2":
                return secondContent;
        }
    }, [activeButton, firstContent, secondContent]);

    const isActiveButton = (button: Pages) => activeButton === button;

    const handleTabChange = (page: Pages) => {
        const prevIndex = activeButton === "1" ? 1 : 2;
        const nextIndex = page === "1" ? 1 : 2;
        setDirection(nextIndex > prevIndex ? 1 : -1);
        setActiveButton(page);
    };

    return (
        <div>
            <div className="grid grid-cols-2 gap-3">
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
                    )}
                    onClick={() => handleTabChange("2")}
                >
                    <Title title={secondButtonName} />
                </button>
            </div>

            <div className="p-10 bg-[#919191] overflow-hidden relative min-h-[200px]">
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
