import Image from "next/image";
import { InteriorTemplateProps } from "../types/interior-template.props";
import { Headline } from "@/shared/ui";

export const InteriorTemplate = ({
    photo,
    title,
    children,
}: InteriorTemplateProps) => {
    return (
        <div className="w-full flex flex-col lg:flex-row items-center gap-1 lg:gap-10">
            <div className="w-full lg:w-[30%] aspect-4/3 lg:aspect-square overflow-hidden shrink-0">
                <Image
                    src={photo}
                    alt={title}
                    width={434}
                    height={388}
                    className="w-full h-full object-cover"
                    unoptimized
                    draggable={false}
                />
            </div>

            <div className="lg:w-[70%] bg-[#919191] py-4 px-3 lg:py-0 lg:px-0">
                <Headline className="text-white lg:mb-5 mb-4 lg:text-[56px] mob:text-[30px] text-[20px]">
                    {title}
                </Headline>

                {children}
            </div>
        </div>
    );
};
