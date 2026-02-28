import { gtWalsheim } from "@/shared/config";
import { cn } from "@/shared/utils";
import type { AdminTableRowProps } from "../types";

export const AdminTableRow = ({
    gridClassName,
    children,
    className,
}: AdminTableRowProps) => {
    return (
        <div
            className={cn(
                gtWalsheim.className,
                gridClassName,
                "items-center px-5 py-4 text-[18px] leading-[112%] tracking-[0%]",
                "bg-[#F2F2F2] rounded-[4px] transition-colors hover:bg-[#ECECEC]",
                className,
            )}
        >
            {children}
        </div>
    );
};
