import { cn } from "@/shared/utils";
import { DotTextProps } from "../types/dot-text.props";
import { MainText } from "../../main-text";
import { DotIcon } from "../icons/dot.icon";

export const DotText = ({ title, className }: DotTextProps) => {
    return (
        <div className={cn("flex items-start gap-4", className)}>
            <DotIcon className="mt-1.5 shrink-0" />

            <MainText>{title}</MainText>
        </div>
    );
};
