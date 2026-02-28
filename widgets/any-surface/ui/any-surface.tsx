import { NotRequiredBlockProps } from "@/shared/types";
import { Headline, NotRequiredBlockTemplate } from "@/shared/ui";
import { SURFACE_DATA } from "../config/surface.data";
import { SurfaceBlock } from "./surface-block";

export const AnySurface = ({ visible }: NotRequiredBlockProps) => {
    return (
        <NotRequiredBlockTemplate visible={visible}>
            <Headline className="text-gray mb-11.5">
                <span className="text-black">продукты</span> для любых
                поверхностей
            </Headline>

            <div className="grid grid-cols-2 gap-5">
                {SURFACE_DATA.map((data) => (
                    <SurfaceBlock key={data.title} {...data} />
                ))}
            </div>
        </NotRequiredBlockTemplate>
    );
};
