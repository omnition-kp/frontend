import Image from "next/image";
import { InteriorTemplateProps } from "../types/interior-template.props";
import { Headline } from "@/shared/ui";

export const InteriorTemplate = ({
    photo,
    title,
    children,
}: InteriorTemplateProps) => {
    return (
        <div className="w-full flex items-center gap-10">
            <div className="w-[30%] aspect-square">
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

            <div className="w-[70%]">
                <Headline className="text-white mb-5">{title}</Headline>

                {children}
            </div>
        </div>
    );
};
