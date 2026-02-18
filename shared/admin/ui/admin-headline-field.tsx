import { cn } from "@/shared/utils";
import { AdminHeadlineProps } from "../types";
import { gtWalsheim } from "@/shared/config";

export const AdminHeadlineField = ({
    title,
    className,
}: AdminHeadlineProps) => {
    return (
        <p
            className={cn(
                gtWalsheim.className,
                "text-[16px] font-medium leading-[100%] tracking-[0%]",
                className,
            )}
        >
            {title}
        </p>
    );
};
