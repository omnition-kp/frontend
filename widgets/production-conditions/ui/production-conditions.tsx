import { ProductionConditionsProps } from "../types/production-conditions.props";
import { cn } from "@/shared/utils";
import { PADDING_X_CLASS } from "@/shared/config";
import { DotText, Headline } from "@/shared/ui";
import Image from "next/image";

export const ProductionConditions = ({ data }: ProductionConditionsProps) => {
    const isMoreThan6 = data.length > 6;
    const first = isMoreThan6 ? data.slice(0, 6) : data;
    const second = isMoreThan6 ? data.slice(6, data.length) : [];

    return (
        <section className={cn(PADDING_X_CLASS)}>
            <Headline className="text-gray mb-12.5">
                условия для производства работ
            </Headline>

            <Headline variant="4" className="text-gray mb-10.5 normal-case">
                Мы с особым вниманием относимся к использованию нашего материала
                на финишных напольных покрытиях
            </Headline>

            <div className="flex items-start gap-10.5">
                <div className="flex flex-col gap-5">
                    {first.map((item, index) => (
                        <DotText key={index} title={item} />
                    ))}
                </div>

                <div className="flex flex-col gap-5">
                    {second.map((item, index) => (
                        <DotText key={index} title={item} />
                    ))}

                    <Image
                        src={"/production-conditions/qr.png"}
                        alt="qr code"
                        width={431}
                        height={129}
                        sizes="431px 129px"
                        className="ml-7"
                        unoptimized
                    />
                </div>
            </div>
        </section>
    );
};
