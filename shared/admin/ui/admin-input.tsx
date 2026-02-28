import { forwardRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/shared/utils";
import { onest } from "@/shared/config";
import type { AdminInputProps } from "../types";

export const AdminInput = forwardRef<HTMLInputElement, AdminInputProps>(
    (
        { className, error, icon, onIconClick, variant = "standard", ...props },
        ref,
    ) => {
        return (
            <div className="w-full">
                <div className="relative w-full">
                    <input
                        ref={ref}
                        className={cn(
                            onest.className,
                            "w-full outline-none focus:ring-0 transition-colors duration-200",
                            "text-[16px] leading-[100%] text-black caret-black placeholder:text-black/40",
                            "pl-4 py-3",
                            icon ? "pr-10" : "pr-4",
                            variant === "standard" && [
                                "bg-white border rounded-[4px]",
                                error
                                    ? "border-red-500 focus:border-red-500"
                                    : "border-black/4 focus:border-black/40",
                            ],
                            variant === "alternative" && [
                                "bg-[#F2F2F2] border border-transparent rounded-[6px]",
                                "hover:bg-[#EEEEEE] focus:bg-[#EEEEEE] focus:border-black/10",
                                error
                                    ? "border-red-500/60 bg-red-500/5 placeholder:text-red-500/40"
                                    : "",
                            ],
                            className,
                        )}
                        aria-invalid={!!error}
                        aria-describedby={error ? "input-error" : undefined}
                        {...props}
                    />

                    {icon && (
                        <div
                            onClick={onIconClick}
                            className={cn(
                                "absolute right-3 top-1/2 -translate-y-1/2 transition-colors",
                                "text-black/30",
                                onIconClick
                                    ? "cursor-pointer hover:text-black/60"
                                    : "pointer-events-none",
                            )}
                        >
                            {icon}
                        </div>
                    )}
                </div>

                <AnimatePresence>
                    {error && (
                        <motion.p
                            id="input-error"
                            role="alert"
                            initial={{ opacity: 0, y: -6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -4 }}
                            transition={{ duration: 0.2, ease: "easeOut" }}
                            className={cn(
                                onest.className,
                                "mt-1.5 text-[13px] leading-[120%] text-red-500",
                            )}
                        >
                            {error}
                        </motion.p>
                    )}
                </AnimatePresence>
            </div>
        );
    },
);

AdminInput.displayName = "AdminInput";
