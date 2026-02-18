import { AdminHeadlineProps } from "../types";
import { cn } from "@/shared/utils";
import { gtWalsheim } from "@/shared/config";

export const AdminHeadline = ({ title, className }: AdminHeadlineProps) => {
    return (
        <p
            className={cn(
                gtWalsheim.className,
                "text-[24px] font-medium leading-[100%] tracking-[0%] uppercase",
                className,
            )}
        >
            {title}
        </p>
    );
};
