import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/shared/utils";
import { onest } from "@/shared/config";
import type { AdminInputProps } from "../types";

export const AdminInput = ({ className, error, ...props }: AdminInputProps) => {
    return (
        <div className="w-full">
            <input
                className={cn(
                    onest.className,
                    "w-full bg-white border rounded-[4px] p-3",
                    "text-[16px] leading-[100%] text-black placeholder:text-black/40",
                    "transition-colors duration-200 outline-none focus:ring-0",
                    error
                        ? "border-red-500 focus:border-red-500"
                        : "border-black/4 focus:border-black/40",
                    className,
                )}
                aria-invalid={!!error}
                aria-describedby={error ? "input-error" : undefined}
                {...props}
            />
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
};
