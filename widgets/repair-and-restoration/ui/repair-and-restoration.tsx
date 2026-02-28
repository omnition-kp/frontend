import { NotRequiredBlockProps } from "@/shared/types";
import { DotText, MainText, NotRequiredBlockTemplate } from "@/shared/ui";
import { Headline } from "@/shared/ui/text/headline";
import Image from "next/image";
import { REPAIR_AND_RESTORATION_DATA } from "../config/repair-and-restoration.data";

export const RepairAndRestoration = ({ visible }: NotRequiredBlockProps) => {
    return (
        <NotRequiredBlockTemplate visible={visible}>
            <Headline className="text-black lg:mb-10 mob:mb-6 mb-5 lg:text-[56px] mob:text-[34px] text-[24px]">
                РЕМОНТ И ВОССТАНОВЛЕНИЕ
            </Headline>

            <Image
                src={"/repair-and-restoration/photo.png"}
                alt="repair and restoration"
                width={1000}
                height={1000}
                className="lg:w-full lg:h-auto w-full h-auto object-contain lg:mb-4 mob:mb-2.5 mb-1"
                unoptimized
                draggable={false}
            />

            <div className="bg-[#EDEDED] border border-black/15 lg:p-7.5 mob:p-5 p-4">
                <MainText className="lg:mb-7 mb-4 lg:text-[22px] mob:text-[18px] text-[16px]">
                    Способы ремонта бетонных полов:{" "}
                </MainText>

                <div className="grid lg:grid-cols-2 grid-cols-1 lg:gap-x-11.5 mob:gap-x-2.5 gap-y-4">
                    {REPAIR_AND_RESTORATION_DATA.map((item) => (
                        <DotText key={item} title={item} />
                    ))}
                </div>
            </div>
        </NotRequiredBlockTemplate>
    );
};
