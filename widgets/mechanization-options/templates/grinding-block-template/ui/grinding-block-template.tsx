import { Headline, MainText } from "@/shared/ui";
import Image from "next/image";
import { GrindingBlockTemplateProps } from "../types/grinding-block-template.props";

export const GrindingBlockTemplate = ({
    title,
    productivityPerShift,
    typeOfEquipment,
    photo,
}: GrindingBlockTemplateProps) => {
    return (
        <div className="flex items-center justify-between w-full gap-4">
            <div className="">
                <Headline className="text-white mb-8">{title}</Headline>

                <div className="flex flex-col items-start gap-0.5 mb-4">
                    <MainText className="text-white/60">
                        Производительность в смену
                    </MainText>
                    <Headline variant="4" className="text-white">
                        {productivityPerShift} м2
                    </Headline>
                </div>

                <div className="flex flex-col items-start gap-0.5">
                    <MainText className="text-white/60">
                        Вид оборудования
                    </MainText>
                    <Headline variant="4" className="text-white">
                        {typeOfEquipment}
                    </Headline>
                </div>
            </div>

            <Image
                src={photo}
                alt={title}
                width={655}
                height={388}
                className="h-full w-auto"
                unoptimized
            />
        </div>
    );
};
