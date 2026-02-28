"use client";

import { useState, useEffect } from "react";
import { CopyIcon, Trash2Icon, CheckIcon } from "lucide-react";
import { gtWalsheim } from "@/shared/config";
import { cn } from "@/shared/utils";
import { AdminHighlightedText } from "@/shared/admin";
import type { ClientOfferRowProps } from "../types/client-offer-row.props";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { useQueryClient } from "@tanstack/react-query";
import {
    useKpControllerDelete,
    getClientControllerGetAllQueryKey,
} from "@/shared/queries";
import { AxiosError } from "axios";

export const ClientOfferRow = ({
    title,
    searchValue,
    numberKp,
    id,
    clientId,
}: ClientOfferRowProps) => {
    const router = useRouter();
    const queryClient = useQueryClient();
    const [isCopied, setIsCopied] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const { mutateAsync: deleteKp, isPending: isDeletePending } =
        useKpControllerDelete();

    const handleCopy = (id: string) => {
        navigator.clipboard.writeText(`${window.location.origin}/${id}`);
        toast.success("Ссылка скопирована в буфер обмена");
        setIsCopied(true);
    };

    useEffect(() => {
        if (isCopied) {
            const timer = setTimeout(() => {
                setIsCopied(false);
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [isCopied]);

    const handleDeleteConfirm = async () => {
        try {
            await deleteKp({ id });
            await queryClient.invalidateQueries({
                queryKey: getClientControllerGetAllQueryKey(),
            });
            setIsDeleteModalOpen(false);
        } catch (error) {
            let errorMessage = "Ошибка при удалении";
            if (error instanceof AxiosError && error.response?.data?.message) {
                const msg = error.response.data.message;
                errorMessage = Array.isArray(msg) ? msg[0] : msg;
            } else if (error instanceof Error) {
                errorMessage = error.message;
            }
            toast.error(errorMessage);
        }
    };

    return (
        <>
            <div
                className={cn(
                    gtWalsheim.className,
                    "grid grid-cols-[72px_1fr_180px_240px] items-center",
                    "px-5 py-4 text-[18px] leading-[112%]",
                    "border-b border-[#E4E4E4]",
                )}
            >
                <p>{numberKp}</p>
                <AdminHighlightedText text={title} highlight={searchValue} />
                <p />

                <div className="flex items-center justify-between gap-3">
                    <button
                        type="button"
                        className="text-[16px] underline underline-offset-2 hover:text-black transition-colors cursor-pointer"
                        onClick={() =>
                            router.push(`/admin/kp/${id}?clientId=${clientId}`)
                        }
                    >
                        ОТКРЫТЬ
                    </button>

                    <div className="flex items-center gap-2 text-[#4C4C4C]">
                        <button
                            type="button"
                            className="hover:text-black transition-colors cursor-pointer relative flex items-center justify-center w-[16px] h-[16px]"
                            onClick={() => handleCopy(id)}
                            disabled={isCopied}
                        >
                            <AnimatePresence mode="wait" initial={false}>
                                {isCopied ? (
                                    <motion.div
                                        key="check"
                                        initial={{ scale: 0.5, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        exit={{ scale: 0.5, opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <CheckIcon
                                            width={16}
                                            height={16}
                                            className="text-green-600"
                                        />
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="copy"
                                        initial={{ scale: 0.5, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        exit={{ scale: 0.5, opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <CopyIcon width={16} height={16} />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </button>

                        <button
                            type="button"
                            className="hover:text-black transition-colors cursor-pointer"
                            onClick={() => setIsDeleteModalOpen(true)}
                        >
                            <Trash2Icon width={16} height={16} />
                        </button>
                    </div>
                </div>
            </div>

            {isDeleteModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/35 px-4 cursor-default">
                    <div
                        className="w-full max-w-[420px] rounded-[8px] bg-white p-6 text-center shadow-lg"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <p className="mb-6 text-[22px] leading-[112%] text-[#4C4C4C]">
                            Вы действительно хотите удалить КП <br />
                            <span className="font-semibold">«{title}»?</span>
                        </p>

                        <div className="flex items-center justify-center gap-2">
                            <button
                                type="button"
                                onClick={handleDeleteConfirm}
                                disabled={isDeletePending}
                                className="rounded-[4px] border border-[#4C4C4C] bg-[#4C4C4C] px-8 py-2 text-[16px] leading-[100%] text-white transition-colors hover:bg-[#3E3E3E] disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {isDeletePending ? "Удаление..." : "Удалить"}
                            </button>

                            <button
                                type="button"
                                onClick={() => setIsDeleteModalOpen(false)}
                                disabled={isDeletePending}
                                className="rounded-[4px] border border-[#E4E4E4] px-8 py-2 text-[16px] leading-[100%] text-[#4C4C4C] transition-colors hover:bg-[#F7F7F7] disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                Отменить
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
