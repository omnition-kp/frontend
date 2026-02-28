import { cn } from "@/shared/utils";
import { PaymentAndTermsProps } from "../types/payment-and-terms.props";
import { PADDING_X_CLASS } from "@/shared/config";
import { DotText, Headline } from "@/shared/ui";
import { ParallelFlow } from "./parallel-flow";

export const PaymentAndTerms = ({ data }: PaymentAndTermsProps) => {
    return (
        <section className={cn(PADDING_X_CLASS)}>
            <Headline className="text-gray mb-10">
                Оплата и сроки работ
            </Headline>

            <div className="grid grid-cols-2 gap-x-7.5 gap-y-3 mb-12">
                {data.map((item, index) => (
                    <DotText key={index} title={item} />
                ))}
            </div>

            <ParallelFlow />
        </section>
    );
};
