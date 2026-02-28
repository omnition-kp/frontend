import { NotRequiredBlockProps } from "@/shared/types";
import { Headline, MainText, NotRequiredBlockTemplate } from "@/shared/ui";
import Image from "next/image";

export const Stairs = ({ visible }: NotRequiredBlockProps) => {
    return (
        <NotRequiredBlockTemplate visible={visible}>
            <Headline className="text-black lg:mb-10 mob:mb-6 mb-5 lg:text-[56px] mob:text-[34px] text-[24px]">
                лестницы
            </Headline>

            <Image
                src={"/stairs/photo.png"}
                alt="stairs"
                width={1000}
                height={1000}
                className="w-full h-auto lg:mb-4 mob:mb-2.5 mb-1"
                unoptimized
                draggable={false}
            />

            <div className="w-full bg-[#EDEDED] border border-black/15 lg:p-7.5 mob:p-5 p-4">
                <MainText className="text-gray lg:text-[22px] text-[16px]">
                    Материал OMNITON обеспечивает эффективное и экономичное
                    решение, сохраняя целостность дизайн-кода всего комплекса.
                </MainText>
            </div>
        </NotRequiredBlockTemplate>
    );
};
