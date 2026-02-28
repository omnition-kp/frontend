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
            <Headline className="text-gray lg:mb-12.5 mob:mb-10 mb-6 lg:text-[56px] mob:text-[34px] text-[24px]">
                условия для производства работ
            </Headline>

            <Headline
                variant="4"
                className="text-gray lg:mb-10.5 mb-5.5 lg:text-[30px] mob:text-[20px] text-[16px] normal-case"
            >
                Мы с особым вниманием относимся к использованию нашего материала
                на финишных напольных покрытиях
            </Headline>

            <div className="flex lg:flex-row flex-col items-start lg:gap-10.5 gap-5">
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
                        className="ml-7 hidden lg:block"
                        unoptimized
                    />
                </div>
            </div>
        </section>
    );
};
