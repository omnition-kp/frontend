import { cn } from "@/shared/utils";
import { PADDING_X_CLASS } from "@/shared/config";
import { NotRequiredBlockTemplateProps } from "../types/not-required-block.props";

export const NotRequiredBlockTemplate = ({
    visible,
    children,
}: NotRequiredBlockTemplateProps) => {
    if (!visible) return null;

    return <section className={cn(PADDING_X_CLASS)}>{children}</section>;
};
