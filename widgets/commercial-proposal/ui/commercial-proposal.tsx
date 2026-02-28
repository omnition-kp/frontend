import { CommercialProposalProps } from "../types/commercial-proposal.props";
import { PADDING_X_CLASS } from "@/shared/config";
import { Headline } from "@/shared/ui";
import { cn } from "@/shared/utils";
import { generateCommerceArray } from "../utils/generate-commerce-array";
import { COMMERCE_ROWS } from "../config";
import { CommercialProposalLine } from "./commercial-proposal-line";

export const CommercialProposal = ({
    id,
    date,
    adress,
    client,
    contactPerson,
    numberOrder,
    details,
}: CommercialProposalProps) => {
    const commerceArray = generateCommerceArray(COMMERCE_ROWS, [
        adress,
        client,
        contactPerson,
        numberOrder,
        details,
    ]);

    return (
        <div className={cn(PADDING_X_CLASS)}>
            <Headline className="text-gray mb-11.5 text-[22px] lg:text-[56px] mob:text-[34px]">
                коммерческое предложение
                <br />№{id} от {date}
            </Headline>

            <div className="grid grid-cols-1 mob:grid-cols-2 gap-4.5">
                {commerceArray.map((item, idx) => (
                    <CommercialProposalLine
                        key={idx}
                        {...item}
                        className={idx === 0 ? "mob:col-span-2" : ""}
                    />
                ))}
            </div>
        </div>
    );
};
