import { Headline } from "@/shared/ui";
import { CommercialProposalLineProps } from "../types/commercial-proposal-line.props";
import { cn } from "@/shared/utils";

export const CommercialProposalLine = ({
    title,
    value,
    className,
}: CommercialProposalLineProps) => {
    return (
        <div
            className={cn(
                "border-b border-dashed pb-2 flex items-center gap-4",
                className,
            )}
        >
            <Headline variant="4" className="normal-case text-gray">
                {title}:
            </Headline>
            <Headline variant="4" className="text-[#919191] normal-case">
                {value}
            </Headline>
        </div>
    );
};
