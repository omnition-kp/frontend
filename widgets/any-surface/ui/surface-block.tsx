import Image from "next/image";
import { SurfaceBlockProps } from "../types/surface-block.props";
import { LINE_CLASS } from "../config";
import { DotText, Headline } from "@/shared/ui";

export const SurfaceBlock = ({ title, photo, data }: SurfaceBlockProps) => {
    return (
        <div>
            <div className="relative w-full aspect-square mb-8">
                <Image
                    src={photo}
                    alt={title}
                    width={648}
                    height={538}
                    draggable={false}
                    sizes="648px 538px"
                    className="w-full h-full object-cover"
                    unoptimized
                />

                <div className={LINE_CLASS.left} />
                <div className={LINE_CLASS.right} />

                <div className={LINE_CLASS.top} />
                <div className={LINE_CLASS.bottom} />

                <div className="absolute lg:top-8.5 top-5.5 lg:right-8.5 right-5.5 bg-white/70 backdrop-blur-[15.6px] lg:py-4 py-2.5 lg:px-7.5 px-4.5">
                    <Headline
                        variant="4"
                        className="text-gray lg:text-[30px] text-[14px]"
                    >
                        {title}
                    </Headline>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-3">
                {data.map((item) => (
                    <DotText key={item} title={item} />
                ))}
            </div>
        </div>
    );
};
