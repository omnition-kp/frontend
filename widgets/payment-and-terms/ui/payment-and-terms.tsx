import { cn } from "@/shared/utils";
import { PaymentAndTermsProps } from "../types/payment-and-terms.props";
import { PADDING_X_CLASS } from "@/shared/config";
import { DotText, Headline } from "@/shared/ui";
import { ParallelFlow } from "./parallel-flow";

export const PaymentAndTerms = ({ data }: PaymentAndTermsProps) => {
    return (
        <section className={cn(PADDING_X_CLASS)}>
            <Headline className="text-gray mob:mb-10 mb-6 lg:text-[56px] mob:text-[34px] text-[24px]">
                Оплата и сроки работ
            </Headline>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-7.5 lg:gap-y-3 mob:gap-y-4 gap-y-2 mb-12">
                {data.map((item, index) => (
                    <DotText key={index} title={item} />
                ))}
            </div>
            <div className="mt-8 lg:mt-0">
                <ParallelFlow />
            </div>
        </section>
    );
};
