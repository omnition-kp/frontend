"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDownIcon } from "lucide-react";
import { onest } from "@/shared/config";
import { cn } from "@/shared/utils";
import type { AdminRowSelectProps } from "../types";

export const AdminRowSelect = ({
    value,
    options,
    onChange,
    className,
    disabled = false,
}: AdminRowSelectProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [coords, setCoords] = useState({ top: 0, left: 0, width: 0 });
    const [mounted, setMounted] = useState(false);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        queueMicrotask(() => setMounted(true));
    }, []);

    const currentOption = options.find(
        (option) => String(option.value) === String(value),
    );
    const availableOptions = options.filter(
        (option) => String(option.value) !== String(value),
    );

    const updatePosition = () => {
        if (!buttonRef.current) {
            return;
        }

        const rect = buttonRef.current.getBoundingClientRect();
        setCoords({
            top: rect.bottom + 4,
            left: rect.left,
            width: rect.width,
        });
    };

    const handleToggle = () => {
        if (disabled) {
            return;
        }

        const nextState = !isOpen;
        if (nextState) {
            updatePosition();
        }
        setIsOpen(nextState);
    };

    const handleSelect = (nextValue: string | number) => {
        onChange(nextValue);
        setIsOpen(false);
    };

    useEffect(() => {
        if (!isOpen) {
            return;
        }

        const handleScrollOrResize = () => {
            setIsOpen(false);
        };

        const handleOutsideClick = (event: MouseEvent) => {
            const targetNode = event.target as Node;
            if (
                buttonRef.current?.contains(targetNode) ||
                menuRef.current?.contains(targetNode)
            ) {
                return;
            }

            setIsOpen(false);
        };

        window.addEventListener("scroll", handleScrollOrResize, {
            capture: true,
        });
        window.addEventListener("resize", handleScrollOrResize);
        window.addEventListener("mousedown", handleOutsideClick);

        return () => {
            window.removeEventListener("scroll", handleScrollOrResize, {
                capture: true,
            });
            window.removeEventListener("resize", handleScrollOrResize);
            window.removeEventListener("mousedown", handleOutsideClick);
        };
    }, [isOpen]);

    return (
        <>
            <button
                ref={buttonRef}
                type="button"
                onClick={handleToggle}
                disabled={disabled}
                className={cn(
                    onest.className,
                    "w-full min-w-[140px] rounded-[4px] bg-white border border-[#EBEBEB]",
                    "h-9 px-3 flex items-center justify-between gap-2",
                    "text-[14px] leading-[100%] text-black transition-colors",
                    disabled
                        ? "opacity-60 cursor-not-allowed"
                        : "cursor-pointer hover:border-[#D8D8D8]",
                    className,
                )}
            >
                <span className="truncate text-left">
                    {currentOption?.label ?? String(value)}
                </span>
                <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="text-[#8C8C8C]"
                >
                    <ChevronDownIcon width={16} height={16} />
                </motion.span>
            </button>

            {mounted &&
                createPortal(
                    <AnimatePresence>
                        {isOpen && (
                            <motion.div
                                ref={menuRef}
                                initial={{ opacity: 0, y: -6 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -6 }}
                                transition={{ duration: 0.15, ease: "easeOut" }}
                                style={{
                                    position: "fixed",
                                    top: coords.top,
                                    left: coords.left,
                                    width: coords.width,
                                    zIndex: 99999,
                                }}
                                className="bg-white border border-[#EBEBEB] rounded-[4px] shadow-[0_8px_24px_rgba(0,0,0,0.08)] overflow-hidden"
                            >
                                <div className="py-1">
                                    {availableOptions.map((option) => (
                                        <button
                                            key={String(option.value)}
                                            type="button"
                                            onClick={() =>
                                                handleSelect(option.value)
                                            }
                                            className={cn(
                                                onest.className,
                                                "w-full text-left px-3 h-9",
                                                "text-[14px] leading-[100%] text-black hover:bg-[#F6F6F6] cursor-pointer transition-colors",
                                            )}
                                        >
                                            {option.label}
                                        </button>
                                    ))}

                                    {availableOptions.length === 0 && (
                                        <p
                                            className={cn(
                                                onest.className,
                                                "h-9 px-3 flex items-center text-[14px] text-[#8C8C8C]",
                                            )}
                                        >
                                            Нет вариантов
                                        </p>
                                    )}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>,
                    document.body,
                )}
        </>
    );
};
