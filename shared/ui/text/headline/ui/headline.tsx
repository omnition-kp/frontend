import { cn } from "@/shared/utils";
import { gtWalsheim } from "@/shared/config";
import { headlineClassNameVariants, headlineElements } from "../config";

import type { HeadlineProps } from "../types";

export const Headline = ({
    children,
    variant = "1",
    className,
    ...props
}: HeadlineProps) => {
    const Component = headlineElements[variant] as React.ElementType;

    return (
        <Component
            className={cn(
                gtWalsheim.className,
                "uppercase tracking-[0%] font-medium",
                headlineClassNameVariants[variant],
                className,
            )}
            {...props}
        >
            {children}
        </Component>
    );
};
