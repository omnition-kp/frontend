import { cn } from "@/shared/utils";
import { gtWalsheim } from "@/shared/config";
import { TitleProps } from "../types";
import { titleClassNameVariants, titleElements } from "../config";

export const Title = ({
    title,
    variant = "1",
    className,
    ...props
}: TitleProps) => {
    const Component = titleElements[variant] as React.ElementType;

    return (
        <Component
            className={cn(
                gtWalsheim.className,
                "tracking-[0%]",
                titleClassNameVariants[variant],
                className,
            )}
            {...props}
        >
            {title}
        </Component>
    );
};
