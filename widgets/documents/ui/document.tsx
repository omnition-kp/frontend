"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MainText } from "@/shared/ui";
import { ArrowRight, Download, Folder } from "lucide-react";
import { DocumentItem } from "../types";
import { cn, getFileFormat } from "@/shared/utils";
import { golos } from "@/shared/config";

export const Document = ({ name, path }: DocumentItem) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className="p-5 w-full flex items-center justify-between border border-[#D6D6D6] bg-transparent transition duration-300 ease-in-out hover:bg-[#D6D6D6] cursor-pointer"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="flex items-center gap-3">
                <div className="w-14 h-14 bg-[#EDEDED] flex items-center justify-center">
                    <Folder width={24} />
                </div>

                <div className="flex flex-col gap-2">
                    <MainText variant="2">{name}</MainText>

                    <p className={cn(golos.className, "text-gray uppercase")}>
                        {getFileFormat(path)}
                    </p>
                </div>
            </div>

            <button className="relative w-6 h-6 flex items-center justify-center">
                <AnimatePresence mode="wait">
                    {isHovered ? (
                        <motion.span
                            key="download"
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.5 }}
                            transition={{ duration: 0.2 }}
                            className="absolute"
                        >
                            <Download width={16} />
                        </motion.span>
                    ) : (
                        <motion.span
                            key="arrow"
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.5 }}
                            transition={{ duration: 0.2 }}
                            className="absolute"
                        >
                            <ArrowRight width={16} />
                        </motion.span>
                    )}
                </AnimatePresence>
            </button>
        </div>
    );
};
