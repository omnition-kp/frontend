"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDownIcon } from "lucide-react";
import { AdminHeadlineField } from "@/shared/admin";
import { ClientLeftPanelFolderProps } from "../types/client-left-panel-folder.props";
import { cn } from "@/shared/utils";

export const ClientLeftPanelFolder = ({
    id,
    name,
    kps,
    activeKpId,
}: ClientLeftPanelFolderProps) => {
    const router = useRouter();

    const hasItems = kps && kps.length > 0;
    const hasActiveChild = hasItems && kps.some((kp) => kp.id === activeKpId);

    const [isOpen, setIsOpen] = useState(hasActiveChild || false);

    const handleHeaderClick = () => {
        if (hasItems) {
            setIsOpen(!isOpen);
        } else {
            router.push("/admin/clients");
        }
    };

    return (
        <div className="w-full bg-white">
            <div
                className="flex items-center justify-between px-2.5 py-3 cursor-pointer select-none hover:bg-gray-50 transition-colors"
                onClick={handleHeaderClick}
            >
                <div
                    onClick={(e) => e.stopPropagation()}
                    className="flex-1 mr-2"
                >
                    <AdminHeadlineField title={name} />
                </div>

                {hasItems && (
                    <motion.div
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                        className="text-gray-500"
                    >
                        <ChevronDownIcon width={16} />
                    </motion.div>
                )}
            </div>

            {hasItems && (
                <AnimatePresence initial={false}>
                    {isOpen && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="overflow-hidden"
                        >
                            <div className="flex flex-col pb-2">
                                {kps.map((kp) => {
                                    const isActive = kp.id === activeKpId;

                                    return (
                                        <button
                                            key={kp.id}
                                            onClick={() => {
                                                if (isActive) return;
                                                router.push(
                                                    `/admin/kp/${kp.id}?clientId=${id}`,
                                                );
                                            }}
                                            className={cn(
                                                "px-4 py-3 text-sm font-medium transition-colors cursor-pointer truncate text-left w-full",
                                                isActive
                                                    ? "bg-[#8485a8] text-white"
                                                    : "text-gray-900 hover:bg-gray-100",
                                            )}
                                        >
                                            {kp.name}
                                        </button>
                                    );
                                })}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            )}
        </div>
    );
};
