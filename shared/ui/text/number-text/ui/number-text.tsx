import { cn } from "@/shared/utils";
import { numberTextClassNameVariants } from "../config";
import { NumberTextProps } from "../types";
import { gtWalsheim } from "@/shared/config";

export const NumberText = ({
    title,
    variant = "1",
    className,
    ...props
}: NumberTextProps) => {
    return (
        <p
            className={cn(
                gtWalsheim.className,
                "tracking-[0%]",
                numberTextClassNameVariants[variant],
                className,
            )}
            {...props}
        >
            {title}
        </p>
    );
};
