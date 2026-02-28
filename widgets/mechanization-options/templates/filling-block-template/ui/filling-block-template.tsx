import { Headline, MainText } from "@/shared/ui";
import { FillingBlockTemplateProps } from "../types/filling-block-template.props";
import Image from "next/image";
import { cn } from "@/shared/utils";
import { gtWalsheim } from "@/shared/config";

export const FillingBlockTemplate = ({
    title,
    description,
    productivityPerShift,
    logisticMaterial,
    photo,
}: FillingBlockTemplateProps) => {
    const textContent = (
        <>
            <Headline className="text-white mb-5 lg:text-[56px] mob:text-[30px] text-[20px]">
                {title}
            </Headline>

            <div className="flex flex-col items-start gap-0.5 mb-6">
                <MainText className="text-white/60 lg:text-[22px] mob:text-[16px] text-[14px]">
                    Производительность в смену
                </MainText>
                <Headline
                    variant="4"
                    className="text-white lg:text-[30px] mob:text-[18px] text-[16px]"
                >
                    {productivityPerShift} м3
                </Headline>
            </div>

            <div className="flex flex-col items-start gap-0.5 mb-6">
                <MainText className="text-white/60 lg:text-[22px] mob:text-[16px] text-[14px]">
                    Логистика материала
                </MainText>
                <Headline
                    variant="4"
                    className="text-white lg:text-[30px] mob:text-[18px] text-[16px]"
                >
                    {logisticMaterial}
                </Headline>
            </div>

            <p
                className={cn(
                    gtWalsheim.className,
                    "text-white lg:text-[22px] mob:text-[18px] text-[16px] leading-[120%] tracking-normal",
                )}
            >
                {description}
            </p>
        </>
    );

    return (
        <div className="flex flex-col lg:flex-row items-center justify-between w-full gap-1 lg:gap-4">
            {/* На мобиле: фото сверху (order-1), блок текста снизу (order-2). На десктопе: текст слева, фото справа */}
            <div className="order-2 lg:order-1 w-full lg:flex-1 bg-gray lg:bg-transparent px-3 py-4 lg:px-0 lg:py-0 mt-1 lg:mt-0 shrink-0">
                {textContent}
            </div>

            <div className="order-1 lg:order-2 w-full lg:w-auto overflow-hidden shrink-0">
                <Image
                    src={photo}
                    alt={title}
                    width={655}
                    height={388}
                    className="h-full w-full lg:w-auto object-cover"
                    unoptimized
                />
            </div>
        </div>
    );
};
