import { NotRequiredBlockProps } from "@/shared/types";
import { Headline, NotRequiredBlockTemplate } from "@/shared/ui";
import { SURFACE_DATA } from "../config/surface.data";
import { SurfaceBlock } from "./surface-block";

export const AnySurface = ({ visible }: NotRequiredBlockProps) => {
    return (
        <NotRequiredBlockTemplate visible={visible}>
            <Headline className="text-gray lg:mb-11.5 mob:mb-10 mb-6 lg:text-[56px] mob:text-[34px] text-[24px]">
                <span className="text-black">продукты</span> для любых
                поверхностей
            </Headline>

            <div className="grid grid-cols-1 mob:grid-cols-2 mob:gap-5 gap-6">
                {SURFACE_DATA.map((data) => (
                    <SurfaceBlock key={data.title} {...data} />
                ))}
            </div>
        </NotRequiredBlockTemplate>
    );
};
