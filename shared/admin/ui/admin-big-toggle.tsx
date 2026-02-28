"use client";

import { motion } from "framer-motion";
import { cn } from "@/shared/utils";
import { AdminBigToggleProps } from "../types/admin-bit-toggle.props";
import { onest } from "@/shared/config";

export const AdminBigToggle = ({
    label,
    value,
    onChange,
    className,
}: AdminBigToggleProps) => {
    return (
        <button
            type="button"
            className={cn(
                onest.className,
                "bg-white rounded-[4px] p-4 text-[20px] leading-[90%] tracking-[0%] text-black flex items-center justify-between w-full cursor-pointer",
                className,
            )}
            onClick={() => onChange(!value)}
        >
            <p>{label}</p>

            {/* Трек: 44px на 24px */}
            <motion.div
                className="w-[44px] h-[24px] rounded-full p-[2px] flex items-center box-border"
                initial={false}
                animate={{
                    backgroundColor: value ? "#373737" : "#E5E5E5",
                }}
                transition={{ duration: 0.2 }}
            >
                {/* Кружок: 20px */}
                <motion.div
                    className="w-[20px] h-[20px] bg-white rounded-full shadow-sm"
                    animate={{
                        // 44 (ширина) - 4 (паддинги) - 20 (сам кружок) = 20px сдвиг
                        x: value ? 20 : 0,
                    }}
                    transition={{
                        type: "spring",
                        stiffness: 600,
                        damping: 30,
                    }}
                />
            </motion.div>
        </button>
    );
};
