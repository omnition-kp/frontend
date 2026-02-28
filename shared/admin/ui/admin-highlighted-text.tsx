import { Fragment } from "react";
import { cn } from "@/shared/utils";
import type { AdminHighlightedTextProps } from "../types";

const escapeRegExp = (value: string) =>
    value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

export const AdminHighlightedText = ({
    text,
    highlight,
    className,
    matchedClassName = "text-black",
    unmatchedClassName = "text-black/45",
}: AdminHighlightedTextProps) => {
    const normalizedHighlight = highlight.trim();

    if (!normalizedHighlight) {
        return <span className={className}>{text}</span>;
    }

    const parts = text.split(
        new RegExp(`(${escapeRegExp(normalizedHighlight)})`, "gi"),
    );

    return (
        <span className={className}>
            {parts.map((part, index) => {
                const isMatched =
                    part.toLowerCase() === normalizedHighlight.toLowerCase();

                return (
                    <Fragment key={`${part}-${index}`}>
                        <span
                            className={cn(
                                isMatched
                                    ? matchedClassName
                                    : unmatchedClassName,
                            )}
                        >
                            {part}
                        </span>
                    </Fragment>
                );
            })}
        </span>
    );
};
