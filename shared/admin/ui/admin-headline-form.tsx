import { cn } from "@/shared/utils";
import { AdminHeadlineProps } from "../types";
import { onest } from "@/shared/config";

export const AdminHeadlineForm = ({ title, className }: AdminHeadlineProps) => {
    return (
        <p
            className={cn(
                onest.className,
                "text-[20px] font-normal leading-[112%] tracking-[0%]",
                className,
            )}
        >
            {title}
        </p>
    );
};
