"use client";

import { ReactNode } from "react";
import { AdminButton } from "./admin-button";

interface AdminConfirmModalProps {
    isOpen: boolean;
    title: string;
    description: ReactNode;
    confirmText?: string;
    cancelText?: string;
    isPending?: boolean;
    onConfirm: () => void;
    onCancel: () => void;
}

export const AdminConfirmModal = ({
    isOpen,
    title,
    description,
    confirmText = "Удалить",
    cancelText = "Отменить",
    isPending = false,
    onConfirm,
    onCancel,
}: AdminConfirmModalProps) => {
    if (!isOpen) {
        return null;
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/35 px-4 cursor-default">
            <div
                className="w-full max-w-[420px] rounded-[8px] bg-white p-6 text-center shadow-lg"
                onClick={(event) => event.stopPropagation()}
            >
                <p className="mb-2 text-[22px] leading-[112%] text-[#4C4C4C]">
                    {title}
                </p>
                <p className="mb-6 text-[16px] leading-[120%] text-[#4C4C4C]">
                    {description}
                </p>

                <div className="flex items-center justify-center gap-2">
                    <button
                        type="button"
                        onClick={onCancel}
                        disabled={isPending}
                        className="rounded-[4px] border border-[#4C4C4C] bg-white px-8 py-2 text-[16px] leading-[100%] text-[#4C4C4C] transition-colors hover:bg-[#F7F7F7] disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {cancelText}
                    </button>

                    <AdminButton
                        type="button"
                        onClick={onConfirm}
                        disabled={isPending}
                    >
                        {isPending ? "Удаление..." : confirmText}
                    </AdminButton>
                </div>
            </div>
        </div>
    );
};
