import { cn } from "@/shared/utils";
import { MainTextProps } from "../types";
import { gtWalsheim } from "@/shared/config";

export const AdminMainText = ({
    children,
    variant = "1",
    className,
}: MainTextProps) => {
    return (
        <p
            className={cn(
                gtWalsheim.className,
                variant === "1"
                    ? "text-[20px] leading-[90%]"
                    : "text-[18px] leading-[112%]",
                "tracking-[0%] font-medium",
                className,
            )}
        >
            {children}
        </p>
    );
};
