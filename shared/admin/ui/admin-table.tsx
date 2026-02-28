"use client";

import { cn } from "@/shared/utils";
import { onest } from "@/shared/config";
import type { AdminTableProps } from "../types";

export const AdminTable = ({
    columns,
    gridClassName,
    isLoading = false,
    itemsCount,
    children,
    searchTerm = "",
    emptyMessage = "Список пуст",
    emptySearchMessage = "Ничего не найдено",
    minWidth = "900px",
}: AdminTableProps) => {
    const isEmpty = !isLoading && itemsCount === 0;
    const emptyText = searchTerm.trim() ? emptySearchMessage : emptyMessage;

    return (
        <div className="w-full overflow-x-auto pb-4">
            <div style={{ minWidth }}>
                <div
                    className={cn(
                        onest.className,
                        gridClassName,
                        "px-5 pb-2 text-[14px] leading-[112%] text-gray",
                    )}
                >
                    {columns.map((column) => (
                        <div
                            key={column.header}
                            className={
                                column.align === "right" ? "text-right" : ""
                            }
                        >
                            {column.header}
                        </div>
                    ))}
                </div>

                <div className="space-y-2">{children}</div>

                {isEmpty && (
                    <p
                        className={cn(
                            onest.className,
                            "py-10 text-center text-[14px] text-gray",
                        )}
                    >
                        {emptyText}
                    </p>
                )}
            </div>
        </div>
    );
};
