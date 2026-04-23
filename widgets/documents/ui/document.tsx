"use client";

import { useCallback, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MainText } from "@/shared/ui";
import { ArrowRight, Download, Folder, Loader2 } from "lucide-react";
import { DocumentItem } from "../types";
import { $api, cn, getFileFormat } from "@/shared/utils";
import { golos } from "@/shared/config";

function downloadBlob(blob: Blob, filename: string) {
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
}

export const Document = ({ name, path }: DocumentItem) => {
    const [isDownloading, setIsDownloading] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const handleDownload = useCallback(async () => {
        if (isDownloading) return;
        setIsDownloading(true);

        try {
            const { data: blob } = await $api.get(`/get-document`, {
                params: { path },
                responseType: "blob",
            });
            const ext = path.includes(".")
                ? path.slice(path.lastIndexOf("."))
                : ".pdf";
            const filename = name.includes(".") ? name : `${name}${ext}`;
            downloadBlob(blob as Blob, filename);
        } catch {
            // TODO: показать уведомление об ошибке
        } finally {
            setIsDownloading(false);
        }
    }, [path, name, isDownloading]);

    return (
        <div
            role="button"
            tabIndex={0}
            className="p-5 w-full flex items-center justify-between border border-[#D6D6D6] bg-transparent transition duration-300 ease-in-out hover:bg-[#D6D6D6] cursor-pointer"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={handleDownload}
            onKeyDown={(e) => e.key === "Enter" && handleDownload()}
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

            <span className="relative w-6 h-6 flex items-center justify-center">
                <AnimatePresence mode="wait">
                    {isDownloading ? (
                        <motion.span
                            key="spinner"
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.5 }}
                            transition={{ duration: 0.2 }}
                            className="absolute"
                        >
                            <Loader2 width={16} className="animate-spin" />
                        </motion.span>
                    ) : isHovered ? (
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
            </span>
        </div>
    );
};
