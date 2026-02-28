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

                <div className="absolute top-8.5 right-8.5 bg-white/70 backdrop-blur-[15.6px] py-4 px-7.5">
                    <Headline variant="4" className="text-gray">
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
