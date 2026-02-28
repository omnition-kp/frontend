"use client";

import {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
    type MouseEvent,
} from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDownIcon, Loader2Icon, SearchIcon, XIcon } from "lucide-react";
import { onest } from "@/shared/config";
import { cn } from "@/shared/utils";
import type { AdminSelectProps } from "../types";

export const AdminSelect = ({
    value,
    onChange,
    options,
    placeholder = "Выбрать",
    className,
    disabled = false,
    isLoading = false,
    isSearchable = false,
}: AdminSelectProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [coords, setCoords] = useState({ top: 0, left: 0, width: 0 });
    const buttonRef = useRef<HTMLButtonElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);
    const searchInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        queueMicrotask(() => setMounted(true));
    }, []);

    const closeDropdown = useCallback(() => {
        setIsOpen(false);
        setSearchQuery("");
    }, []);

    const selectedOption = options.find(
        (option) => String(option.value) === String(value),
    );
    const isDisabled = disabled || isLoading;

    const updatePosition = () => {
        if (!buttonRef.current) {
            return;
        }

        const rect = buttonRef.current.getBoundingClientRect();
        setCoords({
            top: rect.bottom - 1,
            left: rect.left,
            width: rect.width,
        });
    };

    const toggleOpen = () => {
        if (isDisabled) {
            return;
        }

        const next = !isOpen;
        if (next) {
            updatePosition();
        }
        setIsOpen(next);
    };

    useEffect(() => {
        if (!isOpen || isDisabled) {
            return;
        }

        const close = () => closeDropdown();

        const handleOutsideClick = (event: MouseEvent) => {
            const target = event.target as Node;

            if (
                buttonRef.current?.contains(target) ||
                menuRef.current?.contains(target)
            ) {
                return;
            }

            close();
        };

        window.addEventListener("scroll", close, { capture: true });
        window.addEventListener("resize", close);
        window.addEventListener("mousedown", handleOutsideClick);

        return () => {
            window.removeEventListener("scroll", close, { capture: true });
            window.removeEventListener("resize", close);
            window.removeEventListener("mousedown", handleOutsideClick);
        };
    }, [closeDropdown, isDisabled, isOpen]);

    useEffect(() => {
        if (!isOpen || !isSearchable) {
            return;
        }

        const timer = setTimeout(() => searchInputRef.current?.focus(), 40);
        return () => clearTimeout(timer);
    }, [isOpen, isSearchable]);

    const filteredOptions = useMemo(() => {
        const normalized = searchQuery.trim().toLowerCase();

        if (!normalized) {
            return options;
        }

        return options.filter((option) => {
            if (
                option.keywords &&
                option.keywords.toLowerCase().includes(normalized)
            ) {
                return true;
            }

            if (String(option.value).toLowerCase().includes(normalized)) {
                return true;
            }

            if (typeof option.label === "string") {
                return option.label.toLowerCase().includes(normalized);
            }

            return false;
        });
    }, [options, searchQuery]);

    const handleClearValue = (event: MouseEvent<HTMLDivElement>) => {
        event.stopPropagation();
        onChange(null);
    };

    return (
        <>
            <button
                ref={buttonRef}
                type="button"
                onClick={toggleOpen}
                disabled={isDisabled}
                className={cn(
                    onest.className,
                    "w-full h-[46px] bg-[#F2F2F2] px-4 border border-transparent",
                    "flex items-center justify-between gap-2",
                    "text-[14px] leading-[100%] transition-colors",
                    isDisabled
                        ? "opacity-60 cursor-not-allowed"
                        : "cursor-pointer hover:bg-[#EEEEEE]",
                    isOpen && !isDisabled ? "bg-[#EEEEEE]" : "",
                    isOpen
                        ? "rounded-t-[6px] rounded-b-none border-[#D8D8D8] border-b-transparent"
                        : "rounded-[6px]",
                    className,
                )}
            >
                <span
                    className={cn(
                        "truncate text-left",
                        selectedOption ? "text-black" : "text-black/40",
                    )}
                >
                    {selectedOption?.label ?? placeholder}
                </span>

                <div className="flex items-center gap-2 shrink-0">
                    {value !== null && value !== "" && !isDisabled && (
                        <div
                            role="button"
                            onClick={handleClearValue}
                            className="p-0.5 rounded-full text-[#8C8C8C] hover:text-black hover:bg-black/5 transition-colors cursor-pointer"
                            aria-label="Очистить выбранное значение"
                        >
                            <XIcon width={14} height={14} />
                        </div>
                    )}

                    {isLoading ? (
                        <Loader2Icon
                            width={16}
                            height={16}
                            className="text-[#8C8C8C] animate-spin"
                        />
                    ) : (
                        <motion.span
                            animate={{ rotate: isOpen ? 180 : 0 }}
                            transition={{ duration: 0.2, ease: "easeOut" }}
                            className="text-[#8C8C8C]"
                        >
                            <ChevronDownIcon width={16} height={16} />
                        </motion.span>
                    )}
                </div>
            </button>

            {mounted &&
                createPortal(
                    <AnimatePresence>
                        {isOpen && !isDisabled && (
                            <motion.div
                                ref={menuRef}
                                initial={{ opacity: 0, y: -4 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -4 }}
                                transition={{ duration: 0.15, ease: "easeOut" }}
                                style={{
                                    position: "fixed",
                                    top: coords.top,
                                    left: coords.left,
                                    width: coords.width,
                                    zIndex: 99999,
                                }}
                                className="overflow-hidden rounded-b-[14px] rounded-t-none border border-[#D8D8D8] border-t-0 bg-white shadow-[0_8px_24px_rgba(0,0,0,0.12)]"
                            >
                                {isSearchable && (
                                    <div className="px-3 py-2 border-b border-[#E8E8E8] flex items-center gap-2">
                                        <div className="relative flex-1">
                                            <SearchIcon
                                                width={14}
                                                height={14}
                                                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9E9E9E]"
                                            />
                                            <input
                                                ref={searchInputRef}
                                                type="text"
                                                value={searchQuery}
                                                onChange={(event) =>
                                                    setSearchQuery(
                                                        event.target.value,
                                                    )
                                                }
                                                placeholder="Поиск..."
                                                className={cn(
                                                    onest.className,
                                                    "h-8 w-full rounded-[6px] border border-[#E8E8E8] bg-[#F8F8F8]",
                                                    "pl-8 pr-2 text-[14px] leading-[100%] text-black placeholder:text-black/35 outline-none focus:border-[#D8D8D8]",
                                                )}
                                            />
                                        </div>

                                        <button
                                            type="button"
                                            onClick={() => {
                                                if (searchQuery.trim()) {
                                                    setSearchQuery("");
                                                    return;
                                                }
                                                closeDropdown();
                                            }}
                                            className={cn(
                                                onest.className,
                                                "text-[14px] leading-[100%] text-[#8C8C8C] hover:text-black transition-colors",
                                            )}
                                        >
                                            Отмена
                                        </button>
                                    </div>
                                )}

                                <div className="py-1 max-h-72 overflow-y-auto">
                                    {filteredOptions.map((option) => {
                                        const isSelected =
                                            String(option.value) ===
                                            String(value);

                                        return (
                                            <button
                                                key={String(option.value)}
                                                type="button"
                                                onClick={() => {
                                                    onChange(option.value);
                                                    closeDropdown();
                                                }}
                                                className={cn(
                                                    onest.className,
                                                    "h-11 w-full px-4 text-left text-[14px] leading-[100%] cursor-pointer transition-colors",
                                                    isSelected
                                                        ? "bg-[#4C4C4C] text-white"
                                                        : "text-black hover:bg-[#F5F5F5]",
                                                )}
                                            >
                                                {option.label}
                                            </button>
                                        );
                                    })}

                                    {filteredOptions.length === 0 && (
                                        <p
                                            className={cn(
                                                onest.className,
                                                "px-4 py-5 text-[14px] leading-[100%] text-[#8C8C8C] text-center",
                                            )}
                                        >
                                            Ничего не найдено
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
