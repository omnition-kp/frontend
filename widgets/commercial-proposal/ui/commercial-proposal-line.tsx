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
                "border-b border-dashed pb-2 flex items-center gap-2.5 mob:gap-4",
                className,
            )}
        >
            <Headline
                variant="4"
                className="normal-case text-gray text-[14px] lg:text-[30px] mob:text-[22px]"
            >
                {title}:
            </Headline>
            <Headline
                variant="4"
                className="text-[#919191] normal-case text-[14px] lg:text-[30px] mob:text-[18px]"
            >
                {value}
            </Headline>
        </div>
    );
};
