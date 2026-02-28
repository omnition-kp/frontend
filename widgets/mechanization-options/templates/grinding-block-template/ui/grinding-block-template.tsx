import { Headline, MainText } from "@/shared/ui";
import Image from "next/image";
import { GrindingBlockTemplateProps } from "../types/grinding-block-template.props";

export const GrindingBlockTemplate = ({
    title,
    productivityPerShift,
    typeOfEquipment,
    photo,
}: GrindingBlockTemplateProps) => {
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
                    {productivityPerShift} м2
                </Headline>
            </div>

            <div className="flex flex-col items-start gap-0.5">
                <MainText className="text-white/60 lg:text-[22px] mob:text-[16px] text-[14px]">
                    Вид оборудования
                </MainText>
                <Headline
                    variant="4"
                    className="text-white lg:text-[30px] mob:text-[18px] text-[16px]"
                >
                    {typeOfEquipment}
                </Headline>
            </div>
        </>
    );

    return (
        <div className="flex flex-col lg:flex-row items-center justify-between w-full gap-1 lg:gap-4">
            {/* На мобиле: фото сверху, блок текста снизу с отступом 4px. На десктопе: текст слева, фото справа */}
            <div className="order-2 lg:order-1 w-full lg:flex-1 bg-gray lg:bg-transparent px-3 py-4 lg:px-0 lg:py-0">
                {textContent}
            </div>

            <div className="order-1 lg:order-2 w-full lg:w-auto">
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
