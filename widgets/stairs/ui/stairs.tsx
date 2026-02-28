import { NotRequiredBlockProps } from "@/shared/types";
import { Headline, MainText, NotRequiredBlockTemplate } from "@/shared/ui";
import Image from "next/image";

export const Stairs = ({ visible }: NotRequiredBlockProps) => {
    return (
        <NotRequiredBlockTemplate visible={visible}>
            <Headline className="text-black mb-10">лестницы</Headline>

            <Image
                src={"/stairs/photo.png"}
                alt="stairs"
                width={1000}
                height={1000}
                className="w-full h-auto mb-4"
                unoptimized
                draggable={false}
            />

            <div className="w-full bg-[#EDEDED] border border-black/15 p-7.5">
                <MainText className="text-gray">
                    Материал OMNITON обеспечивает эффективное и экономичное
                    решение, сохраняя целостность дизайн-кода всего комплекса.
                </MainText>
            </div>
        </NotRequiredBlockTemplate>
    );
};
