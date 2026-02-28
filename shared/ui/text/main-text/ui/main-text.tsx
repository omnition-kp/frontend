import { MainTextProps } from "../types";
import { mainTextClassNameVariants } from "../config";
import { cn } from "@/shared/utils";
import { gtWalsheim } from "@/shared/config";

export const MainText = ({
    children,
    variant = "1",
    className,
    ...props
}: MainTextProps) => {
    return (
        <p
            className={cn(
                gtWalsheim.className,
                "tracking-[0%]",
                mainTextClassNameVariants[variant],
                className,
            )}
            {...props}
        >
            {children}
        </p>
    );
};
