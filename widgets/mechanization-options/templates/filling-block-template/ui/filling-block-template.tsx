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
    return (
        <div className="flex items-center justify-between w-full gap-4">
            <div className="">
                <Headline className="text-white mb-5">{title}</Headline>

                <div className="flex flex-col items-start gap-0.5 mb-6">
                    <MainText className="text-white/60">
                        Производительность в смену
                    </MainText>
                    <Headline variant="4" className="text-white">
                        {productivityPerShift} м3
                    </Headline>
                </div>

                <div className="flex flex-col items-start gap-0.5 mb-6">
                    <MainText className="text-white/60">
                        Логистика материала
                    </MainText>
                    <Headline variant="4" className="text-white">
                        {logisticMaterial}
                    </Headline>
                </div>

                <p
                    className={cn(
                        gtWalsheim.className,
                        "text-white text-[22px] leading-[120%] tracking-normal",
                    )}
                >
                    {description}
                </p>
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
